import { FC, MouseEventHandler, ReactNode } from 'react';
import styles from './button.module.scss';

export interface Props {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};
