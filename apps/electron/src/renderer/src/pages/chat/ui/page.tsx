import { FC } from 'react';
import { useEvent, useStore } from 'effector-react';

import { MainLayout } from '@renderer/layouts/main';

import { $pending, localAudioToTextFx } from '../model';

import { Dialog } from './dialog/dialog';

export const ChatPage: FC = () => {
  const audioToText = useEvent(localAudioToTextFx);
  const pending = useStore($pending);

  return (
    <MainLayout audioToText={audioToText} pending={pending}>
      <Dialog />
    </MainLayout>
  );
};
