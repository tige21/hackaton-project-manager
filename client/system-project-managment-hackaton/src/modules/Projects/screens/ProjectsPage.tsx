import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Input, Button as AntButton } from "antd"; // Импортируем Modal и Input из Ant Design
import styles from "./ProjectsPage.module.scss";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import SideBar from "../../../components/SideBar/SideBar";
import Button from "../../../components/Button/Button";

const projects = [
  {
    title: "INNO HACK",
    participants: [
      "https://example.com/avatar1.jpg",
      "https://example.com/avatar2.jpg",
    ],
    creationDate: "12/10/24",
    admin: "Ivanov@yandex.ru",
    adminName: "Иванов Иван",
  },
  {
    title: "IT-отдел",
    participants: [
      "https://example.com/avatar3.jpg",
      "https://example.com/avatar4.jpg",
    ],
    creationDate: "12/10/24",
    admin: "Ivanov@yandex.ru",
    adminName: "Иванов Иван",
  },
  {
    title: "Проект 2",
    participants: [
      "https://example.com/avatar1.jpg",
      "https://example.com/avatar2.jpg",
    ],
    creationDate: "12/10/24",
    admin: "Ivanov@yandex.ru",
    adminName: "Иванов Иван",
  },
  {
    title: "АмоГусы",
    participants: [
      "https://example.com/avatar3.jpg",
      "https://example.com/avatar4.jpg",
    ],
    creationDate: "12/10/24",
    admin: "Ivanov@yandex.ru",
    adminName: "Иванов Иван",
  },
];

const ProjectsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для модального окна
  const [newProjectName, setNewProjectName] = useState("");

  const showModal = () => {
    setIsModalVisible(true); // Показываем модальное окно
  };

  const handleOk = () => {
    console.log("New Project Name:", newProjectName);
    setIsModalVisible(false); // Закрываем модальное окно
    // Логика создания проекта может быть добавлена здесь
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Закрываем модальное окно
  };

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
            indentation={12}
            onClick={showModal} // Открытие модального окна при клике на кнопку
          />
        </div>
        <div className={styles.projectGrid}>
          {projects?.map((project, index) => (
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

      {/* Модальное окно для создания новой задачи */}
      <Modal
      className={styles.modal}
        title="Введите название проекта"
        visible={isModalVisible}
        onOk={handleOk} // Обработка кнопки OK
        onCancel={handleCancel} // Обработка кнопки Cancel
        footer={null} // Убираем стандартные кнопки футера для кастомных кнопок
        centered // Центрируем модальное окно
      >
        <Input
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Введите название проекта"
          style={{
            backgroundColor: "transparent",
            border: "none",
            borderBottom: "1px solid #aad3ff",
            color: "#aad3ff",
            marginBottom: "24px",
            padding: "8px 0",
            width: "100%",
          }}
        />
        <AntButton type="primary" onClick={handleOk} style={{ width: "100%" }}>
          Создать
        </AntButton>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
