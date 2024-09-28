import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("abob");
    // Handle the registration form submission logic here.
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <h2 className={styles.title}>ЗАРЕГИСТРИРОВАТЬСЯ</h2>
        <p className={styles.signInText}>
          Уже есть аккаунт?{" "}
          <Link to="/login" className={styles.loginLink}>
            Войти
          </Link>
        </p>
      </div>

      <div className={styles.inputRow}>
        <Input
          label="Фамилия"
          type="text"
          placeholder="Иванов"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label="Имя"
          type="text"
          placeholder="Иван"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <Input
        label="E-mail"
        type="email"
        placeholder="Ivanov@yandex.ru"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className={styles.inputRow}>
        <Input
          label="Пароль"
          type="password"
          placeholder="Придумайте пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Пароль"
          type="password"
          placeholder="Пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button text="Продолжить" onClick={handleSubmit} />
    </form>
  );
};

export default RegisterForm;
