import { FC } from 'react';
import clsx from 'clsx';

import styles from './loader.module.scss';

interface Props {
  isActive: boolean;
  className?: string;
}

export const Loader: FC<Props> = ({ isActive, className }) => {
  return (
    <div
      className={clsx(
        styles.loader,
        className,
        isActive && styles.loaderActive
      )}
    />
  );
};
