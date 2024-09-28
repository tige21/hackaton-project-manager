import React, { FC } from 'react';
import styles from './Button.module.scss';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
