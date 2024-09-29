import React, { useState } from "react";
import { Button, Avatar, Input, Select, DatePicker } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DeleteOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import styles from "./TaskDetail.module.scss";

const { TextArea } = Input;
const { Option } = Select;

const TaskDetails = ({
  task,
  onClose,
}: {
  task: ITask;
  onClose: () => void;
}) => {
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "В работе");

  return (
    <div className={styles.taskDetails} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <span className={styles.taskId}>{task.id}</span>
        <Button
          type="text"
          onClick={onClose}
          icon={<DeleteOutlined />}
          className={styles.deleteButton}
        >
          Удалить задачу
        </Button>
      </div>

      <h2 className={styles.taskTitle}>{task.title}</h2>

      <div className={styles.field}>
        <span className={styles.span}>Проект:</span>
        <span>{task.project}</span>
      </div>

      <div className={styles.field}>
        <span className={styles.span}>Описание проекта:</span>
        <Input
          placeholder="Введите описание задачи"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.span}>Дедлайн:</span>
        <DatePicker
          placeholder="Выбрать дату"
          defaultValue={task.deadline ? task.deadline : null}
          suffixIcon={<CalendarOutlined />}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.span}>Исполнители:</span>
        <Avatar.Group maxCount={2}>
          <Avatar src="https://example.com/user-avatar1.jpg" />
          <Avatar src="https://example.com/user-avatar2.jpg" />
          <Avatar icon={<UserOutlined />} />
        </Avatar.Group>
      </div>

      <div className={styles.field}>
        <span className={styles.span}>Тип:</span>
        <span>{task.type}</span>
      </div>

      <div className={styles.field}>
        <span className={styles.span}>Приоритет:</span>
        <span>{task.priority}</span>
      </div>

      <div className={styles.buttons}>
        <Button type="primary" icon={<CaretRightOutlined />}>
          Старт
        </Button>
        <Select
          defaultValue={status}
          onChange={(value) => setStatus(value)}
          className={styles.statusSelect}
        >
          <Option value="Запланировано">Запланировано</Option>
          <Option value="В работе">В работе</Option>
          <Option value="Завершено">Завершено</Option>
        </Select>
      </div>

      <TextArea
        placeholder="Комментарий"
        autoSize={{ minRows: 3, maxRows: 5 }}
        className={styles.commentInput}
      />
    </div>
  );
};

export default TaskDetails;
