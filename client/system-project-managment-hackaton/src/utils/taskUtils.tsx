import typeEpic from "../assets/taskTypeIcons/typeEpic.svg";
import typeBug from "../assets/taskTypeIcons/typeBug.svg";
import typeTask from "../assets/taskTypeIcons/typeTask.svg";
import typeStory from "../assets/taskTypeIcons/typeStory.svg";
import typeSubtask from "../assets/taskTypeIcons/typeSubtask.svg";
import styles from "../modules/Dashboard/components/Task/Task.module.scss";

export enum TaskType {
    EPIC = "EPIC",
    BUG = "BUG",
    TASK = "TASK",
    STORY = "STORY",
    SUBTASK = "SUBTASK",
}

export enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL",
}

export const renderTaskType = (taskType: TaskType) => {
    let typeIcon;

    switch (taskType) {
        case TaskType.EPIC:
            typeIcon = typeEpic;
            break;
        case TaskType.BUG:
            typeIcon = typeBug;
            break;
        case TaskType.TASK:
            typeIcon = typeTask;
            break;
        case TaskType.STORY:
            typeIcon = typeStory;
            break;
        case TaskType.SUBTASK:
            typeIcon = typeSubtask;
            break;
        default:
            typeIcon = typeTask;
            break;
    }

    return (
        <div className={styles.TaskTypeContainer}>
            <img src={typeIcon} alt={"taskType"} className={styles.TaskTypeImg} />
        </div>
    );
};

export const renderTaskPriority = (taskPriority: TaskPriority) => {
    let priorityColor;

    switch (taskPriority) {
        case TaskPriority.LOW:
            priorityColor = "#B7FFC2";
            break;
        case TaskPriority.MEDIUM:
            priorityColor = "#B7D6FF";
            break;
        case TaskPriority.HIGH:
            priorityColor = "#FEFFB7";
            break;
        case TaskPriority.CRITICAL:
            priorityColor = "#FFB2B2";
            break;
        default:
            priorityColor = "#8f8f8f";
            break;
    }

    return (
        <div
            className={styles.TaskPriority}
            style={{ backgroundColor: priorityColor }}
        />
    );
};