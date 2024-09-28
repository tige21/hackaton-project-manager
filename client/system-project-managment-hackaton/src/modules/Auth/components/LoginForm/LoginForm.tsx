import React, { useState } from "react";

import styles from "./LoginForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    console.log("aboba");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <h2 className={styles.title}>ВОЙТИ В АККАУНТ</h2>
        <p className={styles.registerText}>
          Нет аккаунта?{" "}
          <Link to="/register" className={styles.registerLink}>
            Зарегистрироваться
          </Link>
        </p>
      </div>

      <Input
        label="E-mail"
        type="email"
        placeholder="Ivanov@yandex.ru"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Войти" onClick={() => navigate("/projects")} />
    </form>
  );
};

export default LoginForm;
