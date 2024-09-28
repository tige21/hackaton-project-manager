import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './ProjectsPage.module.scss';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import SideBar from '../../../components/SideBar/SideBar';

const projects = [
  {
    title: 'INNO HACK',
    participants: ['https://example.com/avatar1.jpg', 'https://example.com/avatar2.jpg'],
    creationDate: '12/10/24',
    admin: 'Ivanov@yandex.ru',
    adminName: 'Иванов Иван',
  },
  {
    title: 'IT-отдел',
    participants: ['https://example.com/avatar3.jpg', 'https://example.com/avatar4.jpg'],
    creationDate: '12/10/24',
    admin: 'Ivanov@yandex.ru',
    adminName: 'Иванов Иван',
  },
  {
    title: 'Проект 2',
    participants: ['https://example.com/avatar1.jpg', 'https://example.com/avatar2.jpg'],
    creationDate: '12/10/24',
    admin: 'Ivanov@yandex.ru',
    adminName: 'Иванов Иван',
  },
  {
    title: 'АмоГусы',
    participants: ['https://example.com/avatar3.jpg', 'https://example.com/avatar4.jpg'],
    creationDate: '12/10/24',
    admin: 'Ivanov@yandex.ru',
    adminName: 'Иванов Иван',
  },
];

const ProjectsPage: React.FC = () => {
  return (
    <div className={styles.projectsPageContainer}>
      {/* Отображение SideBar */}
      <SideBar />
      <div className={styles.projectsContent}>
        <div className={styles.header}>
          <h1>ВСЕ ПРОЕКТЫ</h1>
          <Button type="primary" icon={<PlusOutlined />}>
            Создать задачу
          </Button>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              participants={project.participants}
              creationDate={project.creationDate}
              admin={project.admin}
              adminName={project.adminName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
