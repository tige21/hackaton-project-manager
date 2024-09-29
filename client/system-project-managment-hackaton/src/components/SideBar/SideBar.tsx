import React from "react";
import { Menu, Avatar } from "antd";
import {
  CheckCircleOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  FolderOutlined,
  SettingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom"; // Импортируем NavLink для навигации
import styles from "./SideBar.module.scss";
import Logo from "../../modules/Auth/components/Logo/Logo";

const SideBar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoSection}>
        <NavLink to="/" className={styles.logoLink}>
          <Logo size={80} />
        </NavLink>
      </div>

      <Menu mode="vertical" theme="dark" className={styles.menu}>
        <Menu.Item key="1" icon={<CheckCircleOutlined />}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Мои задачи
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Все задачи
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreOutlined />}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Доска
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<FolderOutlined />}>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Все проекты
          </NavLink>
        </Menu.Item>

        <Menu.Divider />

        <Menu.ItemGroup key="g1" title="Проекты">
          <Menu.Item key="5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Inno hack
            </NavLink>
          </Menu.Item>
          <Menu.Item key="6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Проект 2
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              АмоГусы
            </NavLink>
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.Item key="8" icon={<PlusCircleOutlined />}>
          <NavLink
            to="/create-project"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Создать проект
          </NavLink>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="9">
          <NavLink
            to="/account"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <Avatar size="small" src="https://example.com/user-avatar.jpg" />{" "}
            Учетная запись
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;
