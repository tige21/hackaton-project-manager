import React from 'react';
import {Dashboard} from "../components/Dashboard/Dashboard.tsx";
import SideBar from '../../../components/SideBar/SideBar.tsx';
import styles from './DashboardPage.module.scss'
const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboardPage}>
       <SideBar />
      <Dashboard/>
    </div>
  );
};

export default DashboardPage;
