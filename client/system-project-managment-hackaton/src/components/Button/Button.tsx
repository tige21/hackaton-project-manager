import React from "react";
import styles from "./Button.module.scss";

interface CustomButtonProps {
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
  indentation: number;
}

const Button: React.FC<CustomButtonProps> = ({
  text,
  icon,
  onClick,
  indentation,
}) => {
  return (
    <button
      className={styles.customButton}
      style={{ padding: indentation }}
      onClick={onClick}
    >
      <div>{icon}</div>

      <span>{text}</span>
    </button>
  );
};

export default Button;
