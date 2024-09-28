import React from "react";
import { Avatar } from "antd";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  title: string;
  participants: string[];
  creationDate: string;
  admin: string;
  adminName: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  participants,
  creationDate,
  admin,
  adminName,
}) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.container}>
        <div className={styles.projectTitle}>{title}</div>
        <div className={styles.participantsContainer}>
          <div>Участники:</div>
          <div className={styles.participants}>
            {participants.map((participant, index) => (
              <Avatar key={index} src={participant} size="small" />
            ))}
          </div>
        </div>
        <div className={styles.creationDateContainer}>
          <div>Дата создания: </div>
          <div>{creationDate}</div>
        </div>
        <div className={styles.adminContainer}>
          <div>Администратор:</div>
          <div className={styles.admin}>
            <div>{admin}</div>
            <div>{adminName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
