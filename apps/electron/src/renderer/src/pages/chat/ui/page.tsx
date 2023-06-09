import { FC, useEffect, useState } from 'react';
import { useEvent, useStore } from 'effector-react';

import { Container } from '@renderer/shared/ui/container';
import { RecordButton } from '@renderer/shared/ui/record-button';
import { Loader } from '@renderer/shared/ui/loader';

import { $pending, audioToTextFx } from '../model';

import { Dialog } from './dialog/dialog';

import styles from './page.module.scss';

export const ChatPage: FC = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isRecording, setRecording] = useState(false);

  const pending = useStore($pending);
  const audioToText = useEvent(audioToTextFx);

  const handleDataAvailable = (event: BlobEvent) => audioToText(event.data);

  const changeRecordState = () => setRecording((prevState) => !prevState);

  useEffect(() => {
    let mediaRecorder: MediaRecorder;

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);

        mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
      })
      .catch(console.log);

    return () => {
      mediaRecorder?.removeEventListener('dataavailable', handleDataAvailable);
    };
  }, []);

  useEffect(() => {
    if (!mediaRecorder) return;

    if (isRecording) {
      mediaRecorder.start();
    } else {
      mediaRecorder.stop();
    }
  }, [isRecording]);

  useEffect(() => {
    scrollBy({ behavior: 'smooth', top: document.body.scrollHeight });
  }, [document.body.scrollHeight]);

  return (
    <div className={styles.wrapper}>
      <Container>
        <header className={styles.header}>
          <RecordButton
            isRecording={isRecording}
            onClick={changeRecordState}
            disabled={pending}
          />
          {pending && <Loader className={styles.loader} />}
        </header>

        <Dialog />
      </Container>
    </div>
  );
};
