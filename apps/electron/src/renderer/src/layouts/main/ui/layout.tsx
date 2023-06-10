import { FC, ReactNode, useEffect, useState } from 'react';

import { Container } from '@renderer/shared/ui/container';
import { Header } from '@renderer/layouts/main/ui/header';

import styles from './layout.module.scss';
import { AxiosResponse } from 'axios';
import { AudioTranslationsResponse } from '@renderer/shared/api/openai/types';

interface Props {
  audioToText: (
    payload: Blob
  ) => Promise<AxiosResponse<AudioTranslationsResponse>>;
  children: ReactNode;
  pending: boolean;
}

export const MainLayout: FC<Props> = ({ children, pending, audioToText }) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isRecording, setRecording] = useState(false);

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
        <Header
          isRecording={isRecording}
          onRecordButtonClick={changeRecordState}
          pending={pending}
        />

        <div className={styles.container}>{children}</div>
      </Container>
    </div>
  );
};
