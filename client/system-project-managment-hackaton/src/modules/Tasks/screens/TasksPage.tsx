import React from "react";
import { Button, Select } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import styles from "./TasksPage.module.scss";
import TaskCard from "../components/TaskCaed/TaskCard";
import SideBar from "../../../components/SideBar/SideBar";

const { Option } = Select;

const tasksData = [
  {
    id: "U1453",
    name: "Задача 1 расписать",
    project: "IT INNO HACK",
    typeIcon: <span>⚡</span>, // Условная иконка для типа
    priorityColor: "green",
    deadline: "15.10.2024",
    executor: "Ivanov@yandex.ru",
  },
  {
    id: "U1454",
    name: "Задача 2 расписать",
    project: "IT INNO HACK",
    typeIcon: <span>✔</span>,
    priorityColor: "blue",
    deadline: "16.10.2024",
    executor: "Petrov@yandex.ru",
  },
  {
    id: "U1455",
    name: "Задача 3 расписать",
    project: "IT INNO HACK",
    typeIcon: <span>⚡</span>,
    priorityColor: "red",
    deadline: "17.10.2024",
    executor: "Ivanov@yandex.ru",
  },
];

const TasksPage: React.FC = () => {
  return (
    <div className={styles.taskPage}>
      {/* Заголовок и действия */}
      <SideBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div style={{flex: 1}}>
            <div style={{ fontWeight: "bold", fontSize: 72 }}>Все задачи</div>
            <div className={styles.actions}>
              <Button type="primary" icon={<PlusOutlined />}>
                Создать задачу
              </Button>
              <Button>Автоматическое распределение задач</Button>
            </div>
          </div>

          <div>
            <Select
              defaultValue="date"
              style={{ width: 120 }}
              className={styles.sortSelect}
            >
              <Option value="date">Дата</Option>
              <Option value="name">Название</Option>
            </Select>
            <Button icon={<FilterOutlined />}>Фильтровать</Button>
          </div>
        </div>

        {/* Таблица задач */}
        <div className={styles.taskTable}>
          <div className={styles.tableHeader}>
            <div>№</div>
            <div>Наименование</div>
            <div>Проект</div>
            <div>Тип</div>
            <div>Приоритет</div>
            <div>Дедлайн</div>
            <div>Исполнитель</div>
          </div>
          <div className={styles.taskList}>
            {tasksData.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                name={task.name}
                project={task.project}
                typeIcon={task.typeIcon}
                priorityColor={task.priorityColor}
                deadline={task.deadline}
                executor={task.executor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
