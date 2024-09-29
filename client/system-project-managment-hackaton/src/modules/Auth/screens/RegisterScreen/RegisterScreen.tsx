import React from "react";
import styles from "./RegisterScreen.module.scss";
import Logo from "../../components/Logo/Logo";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className={styles.registerScreen}>
        <div className={styles.container}>
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeText}>Добро пожаловать в</h2>
            <Logo size={300} />
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
