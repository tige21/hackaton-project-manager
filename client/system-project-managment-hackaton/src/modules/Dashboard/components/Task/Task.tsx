import React, { useEffect } from "react";
import classNames from "classnames";
import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import typeTask from "../../../../assets/taskTypeIcons/typeTask.svg";
import typeEpic from "../../../../assets/taskTypeIcons/typeEpic.svg";
import typeBug from "../../../../assets/taskTypeIcons/typeBug.svg";
import typeStory from "../../../../assets/taskTypeIcons/typeStory.svg";
import typeSubtask from "../../../../assets/taskTypeIcons/typeSubtask.svg";
import styles from "./Task.module.scss";
import { Avatar } from "antd";

export enum TaskType {
  EPIC = "epic",
  BUG = "bug",
  TASK = "task",
  STORY = "story",
  SUBTASK = "subtask",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

const renderTaskType = (taskType: TaskType) => {
  let typeIcon;

  switch (taskType) {
    case TaskType.EPIC:
      typeIcon = typeEpic;
      break;
    case TaskType.BUG:
      typeIcon = typeBug;
      break;
    case TaskType.TASK:
      typeIcon = typeTask;
      break;
    case TaskType.STORY:
      typeIcon = typeStory;
      break;
    case TaskType.SUBTASK:
      typeIcon = typeSubtask;
      break;
    default:
      typeIcon = typeTask;
      break;
  }

  return (
    <div className={styles.TaskTypeContainer}>
      <img src={typeIcon} alt={"taskType"} className={styles.TaskTypeImg} />
    </div>
  );
};

const renderTaskPriority = (taskPriority: TaskPriority) => {
  let priorityColor;

  switch (taskPriority) {
    case TaskPriority.LOW:
      priorityColor = "#B7FFC2";
      break;
    case TaskPriority.MEDIUM:
      priorityColor = "#B7D6FF";
      break;
    case TaskPriority.HIGH:
      priorityColor = "#FEFFB7";
      break;
    case TaskPriority.CRITICAL:
      priorityColor = "#FFB2B2";
      break;
    default:
      priorityColor = "#8f8f8f";
      break;
  }

  return (
    <div
      className={styles.TaskPriority}
      style={{ backgroundColor: priorityColor }}
    />
  );
};

export interface TaskProps {
  dragOverlay?: boolean;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  title: React.ReactNode;
  id: UniqueIdentifier;
  type: TaskType;
  priority: TaskPriority;
  deadlineDate: string;
  onClick?: () => void;

}

export const Task = React.memo(
  React.forwardRef<HTMLLIElement, TaskProps>(
    (
      {
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        index,
        listeners,
        sorting,
        style,
        transition,
        transform,
        title,
        id,
        type,
        priority,
        deadlineDate,
        wrapperStyle,
        onClick,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return (
        <li
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Task,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled
            )}
            style={style}
            data-cypress="draggable-item"
            {...listeners}
            {...props}
            onClick={onClick}
            tabIndex={!handle ? 0 : undefined}
          >
            <div className={styles.TaskHeader}>
              <div className={styles.TaskID}>{id}</div>
              <div className={styles.TaskUsers}>
                <Avatar.Group>
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                </Avatar.Group>
              </div>
            </div>
            <div className={styles.TaskTitle}>{title}</div>
            <div className={styles.TaskDeadline}>Дедлайн: {deadlineDate}</div>
            <div className={styles.TaskFooter}>
              {renderTaskType(type)}
              {renderTaskPriority(priority)}
            </div>
          </div>
        </li>
      );
    }
  )
);
