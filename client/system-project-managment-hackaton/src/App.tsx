import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./modules/Auth/screens/LoginPage/LoginScreen";
import RegisterPage from "./modules/Auth/screens/RegisterScreen/RegisterScreen";
import CreateProjectPage from "./modules/Projects/screens/ProjectsPage";
import DashboardPage from "./modules/Dashboard/screens/DashboardPage";
import ProjectsPage from "./modules/Projects/screens/ProjectsPage";
// import Layout from "./components/Layout/Layout";
import TasksPage from "./modules/Tasks/screens/TasksPage";
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Незащищённые маршруты */}
        {/* <Route element={<Layout />}>
          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Route> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />

        <Route path="/projects" element={<ProjectsPage />} />
        {/* Защищённые маршруты */}
        {/* Добавляем маршрут */}

        {/* По умолчанию перенаправляем на логин, если не авторизованы */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
