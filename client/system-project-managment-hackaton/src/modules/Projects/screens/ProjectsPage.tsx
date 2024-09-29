import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Input, Button as AntButton } from "antd"; // Импортируем Modal и Input из Ant Design
import styles from "./ProjectsPage.module.scss";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import SideBar from "../../../components/SideBar/SideBar";
import Button from "../../../components/Button/Button";
import { useAddProjectMutation, useGetUserProjectsQuery } from "../api";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Добавляем ведущий ноль, если нужно
  const day = String(date.getDate()).padStart(2, "0"); // Добавляем ведущий ноль, если нужно
  return `${year}-${month}-${day}`;
};

const ProjectsPage: React.FC = () => {
  const { data: projects, isFetching: isProjectsFetching, refetch } =
    useGetUserProjectsQuery();
  const [addProject] = useAddProjectMutation(); // Используем мутатор для добавления проекта

  const participants = [
    "https://example.com/avatar1.jpg",
    "https://example.com/avatar2.jpg",
  ];

  const handleOk = async () => {
    if (newProjectName) {
      const currentDate = new Date();
      const startDate = formatDate(currentDate); // Текущая дата
      const endDate = formatDate(
        new Date(currentDate.setMonth(currentDate.getMonth() + 1))
      ); // Добавляем месяц для конечной даты

      try {
        // Здесь вызываем мутатор для создания проекта
        await addProject({
          name: newProjectName,
          description: "This is a sample project", // Пример описания
          startDate: startDate, // Текущая дата
          endDate: endDate, // Конечная дата через месяц
        }).unwrap();
        refetch();
        console.log("Project created:", newProjectName);
      } catch (error) {
        console.error("Failed to create project:", error);
      }
    }
    setIsModalVisible(false); // Закрываем модальное окно
  };

  const admin = "Ivanov@yandex.ru";
  const adminName = "Иванов Иван";
  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для модального окна
  const [newProjectName, setNewProjectName] = useState("");

  const showModal = () => {
    setIsModalVisible(true); // Показываем модальное окно
  };

  // const handleOk = () => {
  //   console.log("New Project Name:", newProjectName);
  //   setIsModalVisible(false); // Закрываем модальное окно
  //   // Логика создания проекта может быть добавлена здесь
  // };

  const handleCancel = () => {
    setIsModalVisible(false); // Закрываем модальное окно
  };

  if (isProjectsFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.projectsPageContainer}>
      {/* Отображение SideBar */}
      <SideBar />
      <div className={styles.projectsContent}>
        <div className={styles.header}>
          <div style={{ fontWeight: "bold", fontSize: 60 }}>ВСЕ ПРОЕКТЫ</div>
          <Button
            text="Создать проект"
            icon={<PlusCircleOutlined />}
            indentation={12}
            onClick={showModal} // Открытие модального окна при клике на кнопку
          />
        </div>
        <div className={styles.projectGrid}>
          {projects?.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              participants={participants}
              creationDate={project.startDate}
              admin={admin}
              adminName={adminName}
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
          Создать проект
        </AntButton>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
