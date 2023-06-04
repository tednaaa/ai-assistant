import { useEffect, useState, useRef } from 'react';
import { Container } from '@renderer/shared/ui/container';

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
    const audioBlob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
    const audioURL = window.URL.createObjectURL(audioBlob);
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
      console.log(mediaRecorder);
      console.log('Recorder started...');
    }
  };

  const stopRecord = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log('Recorder stopped...');
    }
  };

  console.log(chunks);

  return (
    <div>
      <Container>
        {chunks.length > 0 && (
          <audio ref={audioRef} src={createAudioURL()} controls />
        )}
        <button onClick={startRecord}>Start Record</button>
        <button onClick={stopRecord}>Stop Record</button>
      </Container>
    </div>
  );
};
