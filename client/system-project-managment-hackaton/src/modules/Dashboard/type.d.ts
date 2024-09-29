import {TaskPriority, TaskType} from "../../utils/taskUtils.tsx";
import {UniqueIdentifier} from "@dnd-kit/core";

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
    backlog: UniqueIdentifier[];
    inProgress: UniqueIdentifier[];
    review: UniqueIdentifier[],
    testing: UniqueIdentifier[],
    ready: UniqueIdentifier[],
}
  