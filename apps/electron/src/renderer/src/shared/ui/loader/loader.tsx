import { FC } from 'react';
import clsx from 'clsx';

import styles from './loader.module.scss';

interface Props {
  className?: string;
}

export const Loader: FC<Props> = ({ className }) => {
  return <div className={clsx(styles.loader, className)} />;
};
