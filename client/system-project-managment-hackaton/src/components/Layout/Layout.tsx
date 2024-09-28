import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import styles from "./Layout.module.scss";
const Layout = () => {
  return (
    <div className={styles.layout}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;
