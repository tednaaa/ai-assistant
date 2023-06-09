import { MouseEventHandler } from 'react';
import { clsx } from 'clsx';

import styles from './record-button.module.scss';

interface Props {
  isRecording: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className: string;
  disabled?: boolean;
}

export function RecordButton({
  isRecording,
  onClick,
  className,
  disabled,
}: Props) {
  return (
    <button
      className={clsx(
        styles.recordButton,
        isRecording && styles.recordButtonActive,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        className={styles.recordButtonSvg}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M23 14v3a7 7 0 0 1-14 0v-3H7v3a9 9 0 0 0 8 8.94V28h-4v2h10v-2h-4v-2.06A9 9 0 0 0 25 17v-3Z"
        />
        <path
          fill="currentColor"
          d="M16 22a5 5 0 0 0 5-5V7a5 5 0 0 0-10 0v10a5 5 0 0 0 5 5Z"
        />
      </svg>
    </button>
  );
}
