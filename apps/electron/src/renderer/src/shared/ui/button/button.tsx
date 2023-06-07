import { FC, MouseEventHandler, ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './button.module.scss';

interface Props {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const Button: FC<Props> = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
};
