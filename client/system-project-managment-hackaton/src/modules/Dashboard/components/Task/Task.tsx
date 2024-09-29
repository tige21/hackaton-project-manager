import React, { useEffect } from "react";
import classNames from "classnames";
import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import styles from "./Task.module.scss";
import { Avatar } from "antd";
import {renderTaskPriority, renderTaskType, TaskPriority, TaskType} from "../../../../utils/taskUtils.tsx";
import {UserOutlined} from "@ant-design/icons";

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
                  <Avatar icon={<UserOutlined />} />
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
