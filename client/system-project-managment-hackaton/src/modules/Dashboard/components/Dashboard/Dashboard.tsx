import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  Modifiers,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DroppableContainer } from "../DroppableContainer/DroppableContainer.tsx";
import { SortableTask } from "../SortableTask/SortableTask.tsx";
import { Task } from "../Task/Task.tsx";
import TaskDetails from "../../../Tasks/components/TaskDetail/TaskDetail.tsx";
import PeopleModal from "../PeopleModal/PeopleModal.tsx";
import {useGetTasksQuery} from "../../api.ts";
import {ITask} from "../../type";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  itemCount?: number;
  items?: Items;
  handle?: boolean;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
  selectedTask: ITask | null;
  handleTaskClick: (task: ITask) => void;
  onClose: () => void;
}

export const TRASH_ID = "void";
const PLACEHOLDER_ID = "placeholder";

const containerNames = {
  backlog: "Запланировано",
  inProgress: "В работе",
  review: "На рассмотрении",
  testing: "На тестировании",
  ready: "Завершено",
} as Record<UniqueIdentifier, string>;

export function Dashboard({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  strategy = verticalListSortingStrategy,
  scrollable,
  handleTaskClick,
  selectedTask,
  onClose,
}: Props) {
  const tasks: ITask[] = [
    {
      id: "A1",
      title: "Task 1 расписать",
      project: "IT INNO HACK",
      description: "Описание задачи",
      deadlineDate: "15.10.2024",
      executor: "Ivanov@yandex.ru",
      type: "EPIC",
      priority: "MEDIUM",
      status: "В работе",
    },
    {
      id: "A2",
      title: "Task 2 расписать",
      project: "IT INNO HACK",
      description: "Описание задачи",
      deadlineDate: "16.10.2024",
      executor: "Petrov@yandex.ru",
      type: "TASK",
      priority: "MEDIUM",
      status: "Запланировано",
    },
    {
      id: "A3",
      title: "Task 3 расписать",
      project: "IT INNO HACK",
      description: "Описание задачи",
      deadlineDate: "16.10.2024",
      executor: "Petrov@yandex.ru",
      type: "BUG",
      priority: "CRITICAL",
      status: "Запланировано",
    },
  ];

  const [items, setItems] = useState<Items>(
    () =>
      initialItems ?? {
        backlog: ["A1", "A2", "A3"],
        inProgress: [],
        review: [],
        testing: [],
        ready: [],
      }
  );
  // const [selectedTask, setSelectedTask] = useState(null); // Новое состояние для выбранной задачи
  const [containers, setContainers] = useState(
    Object.keys(items) as UniqueIdentifier[]
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  // const { data, error } = useGetTasksQuery();
  fetch("http://localhost:8081/api/tasks")
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId === TRASH_ID) {
          return intersections;
        }

        if (overId in items) {
          const containerItems = items[overId];

          if (containerItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );

  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );


  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  // const handleTaskClick = (task) => {
  //   setSelectedTask(task); // Открываем TaskDetails при клике на задачу
  // };

  // const handleCloseTaskDetails = () => {
  //   setSelectedTask(null); // Закрываем TaskDetails
  // };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id;

        if (overId == null || overId === TRASH_ID || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (item) => item !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                ),
              ],
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        if (overId === TRASH_ID) {
          setItems((items) => ({
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (id) => id !== activeId
            ),
          }));
          setActiveId(null);
          return;
        }

        if (overId === PLACEHOLDER_ID) {
          const newContainerId = getNextContainerId();

          unstable_batchedUpdates(() => {
            setContainers((containers) => [...containers, newContainerId]);
            setItems((items) => ({
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (id) => id !== activeId
              ),
              [newContainerId]: [active.id],
            }));
            setActiveId(null);
          });
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems((items) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }));
          }
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <div
        style={{
          display: "inline-grid",
          boxSizing: "border-box",
          gridAutoFlow: "column",
          overflowX: "auto",
          height: "100%",
          width: "100%",
          padding: "0 70px 0 70px"
        }}
      >
        <SortableContext
          items={[...containers, PLACEHOLDER_ID]}
          strategy={horizontalListSortingStrategy}
        >
          {containers.map((containerId) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              label={minimal ? undefined : containerNames[containerId]}
              columns={columns}
              items={items[containerId]}
              scrollable={scrollable}
              style={containerStyle}
              unstyled={minimal}
            >
              <SortableContext items={items[containerId]} strategy={strategy}>
                {items[containerId].map((value, index) => {
                  const task = tasks.find((task) => task.id === value);

                  return (
                    <div
                      key={task?.id}
                      onClick={() => task && handleTaskClick(task)}
                    >
                      <SortableTask
                        type={task?.type || "TASK"}
                        priority={task?.priority || "MEDIUM"}
                        deadlineDate={task?.deadlineDate || "invalid date"}
                        disabled={isSortingContainer}
                        title={task?.title || value}
                        key={task?.id || value}
                        id={task?.id || value}
                        index={index}
                        handle={handle}
                        style={getItemStyles}
                        wrapperStyle={wrapperStyle}
                        containerId={containerId}
                        getIndex={getIndex}
                      />
                    </div>
                  );
                })}
              </SortableContext>
            </DroppableContainer>
          ))}
        </SortableContext>
      </div>
      {selectedTask && <TaskDetails task={selectedTask} onClose={onClose} />}
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId ? renderSortableItemDragOverlay(activeId) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    const task = tasks.find((task) => task.id === id);

    return (
      <Task
        id={id}
        type={task?.type || "TASK"}
        priority={task?.priority || "MEDIUM"}
        deadlineDate={task?.deadlineDate || "invalid date"}
        title={task?.title || id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id) as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(id),
          value: task?.title || id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        wrapperStyle={wrapperStyle({ index: 0 })}
        dragOverlay
      />
    );
  }

  function getNextContainerId() {
    const containerIds = Object.keys(items);
    const lastContainerId = containerIds[containerIds.length - 1];

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
  }
}
