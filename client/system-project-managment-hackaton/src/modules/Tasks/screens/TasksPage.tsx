import React from "react";
// import { Select } from "antd";
import { CheckSquareOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styles from "./TasksPage.module.scss";
import TaskCard from "../components/TaskCaed/TaskCard";
import SideBar from "../../../components/SideBar/SideBar";
import Button from "../../../components/Button/Button";

// const { Option } = Select;

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
  const handleAutoDistribute = () => {
    console.log("Автоматическое распределение задач");
  };

  const handleCreateTask = () => {
    console.log("Создать задачу");
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
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 60 }}>Все задачи</div>
            <div style={{ display: "flex", flexDirection: "row", height: "100%", gap:20 }}>
              <Button
                indentation={12}
                text="Автоматическое распределение задач"
                icon={
                  <CheckSquareOutlined />
                }
                onClick={handleAutoDistribute}
              />

              <Button
                text="Создать задачу"
                icon={<PlusCircleOutlined />}
                onClick={handleCreateTask} indentation={12}              />
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
