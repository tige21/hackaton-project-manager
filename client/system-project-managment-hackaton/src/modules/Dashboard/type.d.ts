import {TaskPriority, TaskType} from "../../utils/taskUtils.tsx";

declare interface ITask {
    id: string;
    title: string;
    project: string;
    description: string;
    deadlineDate: string;
    executor: string;
    type: TaskType;
    priority: TaskPriority;
    status: "Запланировано" | "В работе" | "На рассмотрении" | "Завершено";
}

declare interface ITasksByStatuses {
    backlog: string[];
    inProgress: string[];
    review: string[],
    testing: string[],
    ready: string[],
}
  