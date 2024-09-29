import React, {useState} from "react";
import {Dashboard} from "../components/Dashboard/Dashboard";
import SideBar from "../../../components/SideBar/SideBar";
import styles from "./DashboardPage.module.scss";
import PeopleModal from "../components/PeopleModal/PeopleModal";
import {ITask} from "../type";
import peoples from "../../../assets/peoples.svg"
import {AddTaskButton} from "../../../components/AddTaskButton/AddTaskButton.tsx";

const DashboardPage: React.FC = () => {
    const [isPeopleModalOpen, setIsPeopleModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

    const handleTaskClick = (task: ITask) => {
        setSelectedTask(task);
    };

    const handleCloseTaskDetails = () => {
        setSelectedTask(null);
    };

    const toggleShowPeopleModal = () => {
        setIsPeopleModalOpen(!isPeopleModalOpen);
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
                        <button onClick={toggleShowPeopleModal} className={styles.customButton}>
                            <img className={styles.peoplesImg} src={peoples}/>
                            Люди
                        </button>
                        <AddTaskButton/>
                    </div>
                </div>

                <Dashboard
                    selectedTask={selectedTask}
                    handleTaskClick={handleTaskClick}
                    onClose={handleCloseTaskDetails}
                />
            </div>
            <PeopleModal open={isPeopleModalOpen} onClose={toggleShowPeopleModal}/>
        </div>
    );
};

export default DashboardPage;
