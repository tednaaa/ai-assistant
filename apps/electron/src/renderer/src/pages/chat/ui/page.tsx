import { FC, useEffect, useState } from 'react';

import { Container } from '@renderer/shared/ui/container';
import { Button } from '@renderer/shared/ui/button';

import { Dialog } from './dialog';
import { audioToTextFx, chatCompletionsFx } from '../model';
import { useEvent } from 'effector-react';

export const ChatPage: FC = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const audioToText = useEvent(audioToTextFx);
  const chatCompletions = useEvent(chatCompletionsFx);

  const handleDataAvailable = async (event: BlobEvent): Promise<void> => {
    if (event.data.size > 0) {
      const { data } = await audioToText(event.data);

      chatCompletions(data.text);
    }
  };

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

    return (): void => {
      mediaRecorder?.removeEventListener('dataavailable', handleDataAvailable);
    };
  }, []);

  const startRecord = (): void => {
    if (mediaRecorder) mediaRecorder.start();
  };

  const stopRecord = (): void => {
    if (mediaRecorder) mediaRecorder.stop();
  };

  return (
    <div>
      <Container>
        <Button onClick={startRecord}>Start Record</Button>
        <Button onClick={stopRecord}>Stop Record</Button>

        <Dialog />
      </Container>
    </div>
  );
};
