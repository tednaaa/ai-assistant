import { Container } from '@/shared/ui/container';
import { useEffect, useState, useRef } from 'react';

export const ChatPage = () => {
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const audioContext = new AudioContext();

          const sourceNode = audioContext.createMediaStreamSource(stream);

          const mediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(mediaRecorder);

          mediaRecorder.addEventListener('dataavailable', (event) => {
            setChunks((prevChunks) => [...prevChunks, event.data]);
          });
        })
        .catch((error) => {
          console.error(`The following getUserMedia error occurred: ${error}`);
        });
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }, []);

  const startRecord = () => {
    if (!mediaRecorder) return;
    setChunks([]);
    mediaRecorder.start();

    console.log('recorder started...');
  };

  const stopRecord = () => {
    if (!audioRef.current || !mediaRecorder) return;

    mediaRecorder.stop();

    console.log('recorder stopped...');
    console.log(chunks);
    const blob = new Blob(chunks, { type: 'audio/webm' });

    const audioURL = window.URL.createObjectURL(blob);

    audioRef.current.src = audioURL;
  };

  return (
    <div>
      <Container>
        <audio ref={audioRef} controls />
        <button onClick={startRecord}>start record</button>
        <button onClick={stopRecord}>stop record</button>
      </Container>
    </div>
  );
};
