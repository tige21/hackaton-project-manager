import styles from "./AddTaskButton.module.scss";
import addTask from "../../assets/addTask.svg";
import {useState} from "react";
import CreateTaskModal from "../../modules/Dashboard/components/CustomTaskModal/CustomTaskModal.tsx";

export const AddTaskButton = () => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const toggleTaskModalOpen = () => {
        setIsTaskModalOpen(!isTaskModalOpen);
    };

    return (
        <>

        <button className={styles.customButton} onClick={toggleTaskModalOpen}>
            <img className={styles.addTaskImg} src={addTask}/>
            Создать задачу
        </button>
            <CreateTaskModal open={isTaskModalOpen} onClose={toggleTaskModalOpen}/>
            </>
    )
}