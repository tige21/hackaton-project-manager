import { useSortable } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Task } from "../Task/Task.tsx";
import {TaskPriority, TaskType} from "../../../../utils/taskUtils.tsx";

interface SortableTaskProps {
  containerId: UniqueIdentifier;
  id: UniqueIdentifier;
  type: TaskType;
  priority: TaskPriority;
  index: number;
  handle: boolean;
  disabled?: boolean;
  title?: UniqueIdentifier;
  deadlineDate: string;
  style(args: unknown): React.CSSProperties;
  getIndex(id: UniqueIdentifier): number;   

  wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

export function SortableTask({
  disabled,
  id,
  type,
  priority,
  index,
  title,
  handle,
  style,
  containerId,
  getIndex,
  wrapperStyle,
  deadlineDate,
}: SortableTaskProps) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Task
      id={id}
      type={type}
      priority={priority}
      ref={disabled ? undefined : setNodeRef}
      title={title}
      deadlineDate={deadlineDate}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        title: title,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId,
      })}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
    />
  );
}

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}
