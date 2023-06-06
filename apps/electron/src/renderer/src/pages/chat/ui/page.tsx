import { useEffect, useState, useRef } from 'react';

import { Container } from '@renderer/shared/ui/container';
import { Button } from '@renderer/shared/ui/button';
import { OpenAIService } from '@renderer/shared/api/openai/openai.service';

import testMp3 from './test.mp3';

export const ChatPage = () => {
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let mediaRecorder: MediaRecorder | null = null;

    const initializeMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
        setMediaRecorder(mediaRecorder);
      } catch (error) {
        console.error(`The following getUserMedia error occurred: ${error}`);
      }
    };

    initializeMediaRecorder();

    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
        mediaRecorder.stop();
      }
    };
  }, []);

  const createAudioURL = () => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    const audioURL = window.URL.createObjectURL(audioBlob);

    OpenAIService.audioTranslations({ file: audioBlob, model: 'whisper-1' });

    return audioURL;
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };

  const startRecord = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      console.log('Recorder started...');
    }
  };

  const stopRecord = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log('Recorder stopped...');
    }
  };

  useEffect(() => {
    // OpenAIService.chatCompletitions({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     { role: 'user', content: 'what kind of variables in javascript?' },
    //   ],
    // });
  }, []);

  // interview-assistant
  return (
    <div>
      <Container>
        {chunks.length > 0 && (
          <audio ref={audioRef} src={createAudioURL()} controls />
        )}
        <Button onClick={startRecord}>Start Record</Button>
        <Button onClick={stopRecord}>Stop Record</Button>
      </Container>
    </div>
  );
};
