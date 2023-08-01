import React from 'react';

import { ButtonType } from '../types/button';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.FormEvent) => void;
  type: ButtonType;
}

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button 
        className={`${styles.btn} ${styles[type]}`} 
        onClick={onClick}
    >
        {children}
    </button>
  );
}

export default Button;