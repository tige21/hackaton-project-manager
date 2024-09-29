import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './ProjectsPage.module.scss';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import SideBar from '../../../components/SideBar/SideBar';
import Button from '../../../components/Button/Button';
import { useGetUserProjectsQuery } from '../api';

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

  // const { data: projects, error, isLoading } = useGetUserProjectsQuery();

  // if (isLoading) return <p>Loading projects...</p>;
  // if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className={styles.projectsPageContainer}>
      {/* Отображение SideBar */}
      <SideBar />
      <div className={styles.projectsContent}>
        <div className={styles.header}>
          <div style={{ fontWeight: "bold", fontSize: 60 }}>ВСЕ ПРОЕКТЫ</div>
          <Button
                text="Создать задачу"
                icon={<PlusCircleOutlined />}
               indentation={12}/>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.title}
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
