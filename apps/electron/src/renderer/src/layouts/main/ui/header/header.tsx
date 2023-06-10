import { FC, MouseEventHandler, useState } from 'react';

import { RecordButton } from '@renderer/shared/ui/record-button';
import { Loader } from '@renderer/shared/ui/loader';
import { Burger } from '@renderer/shared/ui/burger';
import { Navigation } from '@renderer/shared/ui/navigation';

import styles from './header.module.scss';

interface Props {
  isRecording: boolean;
  onRecordButtonClick: MouseEventHandler<HTMLButtonElement>;
  pending: boolean;
}

export const Header: FC<Props> = ({
  isRecording,
  onRecordButtonClick,
  pending,
}) => {
  const [isOpen, setOpen] = useState(false);

  const changeNav = () => setOpen((prevState) => !prevState);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Loader className={styles.loader} isActive={pending} />

        <RecordButton
          className={styles.recordButton}
          isRecording={isRecording}
          onClick={onRecordButtonClick}
          disabled={pending}
        />

        <Burger isOpen={isOpen} onClick={changeNav} />
        <Navigation isOpen={isOpen} />
      </div>
    </header>
  );
};
