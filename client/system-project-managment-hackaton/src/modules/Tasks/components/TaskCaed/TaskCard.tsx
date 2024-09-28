import React from 'react';
import styles from './TaskCard.module.scss';

interface TaskCardProps {
  id: string;
  name: string;
  project: string;
  typeIcon: JSX.Element;
  priorityColor: string;
  deadline: string;
  executor: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, name, project, typeIcon, priorityColor, deadline, executor }) => {
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskId}>{id}</div>
      <div className={styles.taskName}>{name}</div>
      <div className={styles.projectName}>{project}</div>
      <div className={styles.typeIcon}>{typeIcon}</div>
      <div className={styles.priority} style={{ backgroundColor: priorityColor }} />
      <div className={styles.deadline}>{deadline}</div>
      <div className={styles.executor}>{executor}</div>
    </div>
  );
};

export default TaskCard;
