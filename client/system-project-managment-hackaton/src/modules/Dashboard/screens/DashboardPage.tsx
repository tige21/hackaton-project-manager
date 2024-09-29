import React, { useState } from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import SideBar from "../../../components/SideBar/SideBar";
import styles from "./DashboardPage.module.scss";
import PeopleModal from "../components/PeopleModal/PeopleModal";
import CustomTaskModal from "../components/CustomTaskModal/CustomTaskModal";
import CreateTaskModal from "../components/CustomTaskModal/CustomTaskModal";

const DashboardPage: React.FC = () => {
  const [isPeopleModalVisible, setIsPeopleModalVisible] = useState(false); // Modal state

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const handleTaskClick = (task: ITask) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  console.log(isModalVisible)
  const showModal = () => setIsPeopleModalVisible(true);
  const hideModal = () => setIsPeopleModalVisible(false);

  return (
    <div className={styles.dashboardPage}>
      <SideBar />
      <div
        className={styles.dashboardContainer}
        onClick={() => {
          if (selectedTask !== null || isModalVisible !== false) {
            setSelectedTask(null);
            setIsModalVisible(false);
            console.log("Close modal");
          }
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 30,
            marginLeft: 30,
          }}
        >
          <h1 className={styles.dashboardTitle}>IT INNO HACK</h1>
          <div className={styles.buttonsContainer}>
            <button onClick={showModal} className={styles.customButton}>
              <span role="img" aria-label="icon">
                👥
              </span>
              Люди
            </button>
            <button onClick={openModal} className={styles.customButton}>
              <span role="img" aria-label="icon">
                ➕
              </span>
              Создать задачу
            </button>
          </div>
        </div>

        <Dashboard
          selectedTask={selectedTask}
          handleTaskClick={handleTaskClick}
          onClose={handleCloseTaskDetails}
        />
      <CreateTaskModal visible={isModalVisible} onClose={closeModal} />
      {isPeopleModalVisible && <PeopleModal onClose={hideModal} />}{" "}

      </div>

    </div>
  );
};

export default DashboardPage;
