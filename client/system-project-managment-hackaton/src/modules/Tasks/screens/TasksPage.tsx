import React from "react";
// import { Select } from "antd";
import styles from "./TasksPage.module.scss";
import TaskCard from "../components/TaskCaed/TaskCard";
import SideBar from "../../../components/SideBar/SideBar";
import autoTaskDistribution from "../../../assets/autoTaskDistribution.svg"
import {AddTaskButton} from "../../../components/AddTaskButton/AddTaskButton.tsx";

// const { Option } = Select;

const tasksData = [
  {
    id: "U1453",
    name: "Задача 1 расписать",
    project: "IT INNO HACK",
    type: "TASK",
    priorityColor: "#B7FFC2",
    deadline: "15.10.2024",
    executor: "Ivanov@yandex.ru",
  },
  {
    id: "U1454",
    name: "Задача 2 расписать",
    project: "IT INNO HACK",
    type: "BUG",
    priorityColor: "#B7D6FF",
    deadline: "16.10.2024",
    executor: "Petrov@yandex.ru",
  },
  {
    id: "U1455",
    name: "Задача 3 расписать",
    project: "IT INNO HACK",
    type: "STORY",
    priorityColor: "#FF8686",
    deadline: "17.10.2024",
    executor: "Ivanov@yandex.ru",
  },
  {
    id: "U1456",
    name: "Задача 4 доработать",
    project: "IT INNO HACK",
    type: "EPIC",
    priorityColor: "#FEFFB7",
    deadline: "18.10.2024",
    executor: "Petrov@yandex.ru",
  },
  {
    id: "U1457",
    name: "Задача 5 исправить баг",
    project: "IT INNO HACK",
    type: "BUG",
    priorityColor: "#FFB2B2",
    deadline: "19.10.2024",
    executor: "Ivanov@yandex.ru",
  },
  {
    id: "U1458",
    name: "Задача 6 внедрить функционал",
    project: "IT INNO HACK",
    type: "TASK",
    priorityColor: "#B7D6FF",
    deadline: "20.10.2024",
    executor: "Petrov@yandex.ru",
  },
  {
    id: "U1459",
    name: "Задача 7 провести тесты",
    project: "IT INNO HACK",
    type: "STORY",
    priorityColor: "#B7FFC2",
    deadline: "21.10.2024",
    executor: "Ivanov@yandex.ru",
  },
  {
    id: "U1460",
    name: "Задача 8 исследовать баг",
    project: "IT INNO HACK",
    type: "BUG",
    priorityColor: "#FF8686",
    deadline: "22.10.2024",
    executor: "Petrov@yandex.ru",
  },
  {
    id: "U1461",
    name: "Задача 9 завершить фичу",
    project: "IT INNO HACK",
    type: "EPIC",
    priorityColor: "#FEFFB7",
    deadline: "23.10.2024",
    executor: "Ivanov@yandex.ru",
  },
  {
    id: "U1462",
    name: "Задача 10 планирование релиза",
    project: "IT INNO HACK",
    type: "STORY",
    priorityColor: "#FFB2B2",
    deadline: "24.10.2024",
    executor: "Petrov@yandex.ru",
  }
];

const TasksPage: React.FC = () => {
  const handleAutoDistribute = () => {
    console.log("Автоматическое распределение задач");
  };

  return (
    <div className={styles.taskPage}>
      {/* Заголовок и действия */}
      <SideBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div className={styles.title}>Все задачи</div>
            <div style={{display: "flex", flexDirection: "row", height: "100%", gap: 20}}>
              <button
                  className={styles.customButton}
                  onClick={handleAutoDistribute}
              >
                <img src={autoTaskDistribution}/>
                Автоматическое распределение задач
              </button>

              <AddTaskButton/>
            </div>
          </div>

          {/* <div className={styles.filters}>
            <Select
              defaultValue="date"
              style={{ width: 120 }}
              className={styles.sortSelect}
            >
              <Option value="date">Дата</Option>
              <Option value="name">Название</Option>
            </Select>
            <Button
              icon={<FilterOutlined />}
              text="Фильтровать"
              onClick={handleCreateTask} indentation={12}            />
          </div> */}
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
                type={task.type}
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
