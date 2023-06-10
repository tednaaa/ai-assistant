import { FC } from 'react';
import { useEvent, useStore } from 'effector-react';

import { MainLayout } from '@renderer/layouts/main';

import { $pending, localAudioToTextFx } from '../model';

import { Images } from './images';

export const GenerateImagesPage: FC = () => {
  const audioToText = useEvent(localAudioToTextFx);
  const pending = useStore($pending);

  return (
    <MainLayout audioToText={audioToText} pending={pending}>
      <Images />
    </MainLayout>
  );
};
