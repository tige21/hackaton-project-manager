import React from "react";
import styles from "./Logo.module.scss";
import logo from "../../../../assets/logo.svg";
interface LogoProps {
  size?: number;
}
const Logo: React.FC<LogoProps> = ({ size = 64 }) => {
  return (
    <div className={styles.logoContainer} style={{ width: size, height: size }}>
      <img
        src={logo}
        alt="Logo"
        className={styles.logo}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Logo;
