import React, {useState} from "react";
import {Dashboard} from "../components/Dashboard/Dashboard";
import SideBar from "../../../components/SideBar/SideBar";
import styles from "./DashboardPage.module.scss";
import PeopleModal from "../components/PeopleModal/PeopleModal";
import {ITask} from "../type";
import peoples from "../../../assets/peoples.svg"
import addTask from "../../../assets/addTask.svg"

const DashboardPage: React.FC = () => {
    const [isPeopleModalVisible, setIsPeopleModalVisible] = useState(false);

    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
    const handleTaskClick = (task: ITask) => {
        setSelectedTask(task);
    };

    const handleCloseTaskDetails = () => {
        setSelectedTask(null);
    };

    const toggleShowModal = () => {
        setIsPeopleModalVisible(!isPeopleModalVisible);
    }

    return (
        <div className={styles.dashboardPage}>
            <SideBar/>
            <div
                className={styles.dashboardContainer}
                onClick={() => {
                    if (selectedTask !== null) {
                        setSelectedTask(null);
                    }
                }}
                style={{display: "flex", flexDirection: "column"}}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "70px"
                    }}
                >
                    <h1 className={styles.dashboardTitle}>IT INNO HACK</h1>
                    <div className={styles.buttonsContainer}>
                        <button onClick={toggleShowModal} className={styles.customButton}>
                            <img className={styles.peoplesImg} src={peoples}/>
                            Люди
                        </button>
                        <button className={styles.customButton}>
                            <img className={styles.peoplesImg} src={addTask}/>
                            Создать задачу
                        </button>
                    </div>
                </div>

                <Dashboard
                    selectedTask={selectedTask}
                    handleTaskClick={handleTaskClick}
                    onClose={handleCloseTaskDetails}
                />
            </div>
            {isPeopleModalVisible && <PeopleModal onClose={toggleShowModal}/>}
        </div>
    );
};

export default DashboardPage;
