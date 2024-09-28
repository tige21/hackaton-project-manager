import React from "react";
import styles from "./LoginScreen.module.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import Logo from "../../components/Logo/Logo";

const LoginScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className={styles.loginScreen}>
        <div className={styles.container}>
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeText}>Добро пожаловать в</h2>
            <Logo />
            <h1 className={styles.title}>НАЗВАНИЕ</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
