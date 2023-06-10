import { createStore, createEffect, sample, attach } from 'effector';
import { or } from 'patronum';

import { OpenAIService } from '@renderer/shared/api/openai';
import { audioToTextFx } from '@renderer/layouts/main';

import { GeneratedImage } from './types';

export const localAudioToTextFx = attach({ effect: audioToTextFx });

const $prompt = createStore('').on(
  localAudioToTextFx.doneData,
  (_, { data }) => data.text
);

export const imagesGenerationsFx = createEffect(async (prompt: string) => {
  return await OpenAIService.imagesGenerations({ prompt });
});

export const $images = createStore<GeneratedImage[]>([]).on(
  imagesGenerationsFx.doneData,
  (images, { data }) => {
    return [...images, { prompt: $prompt.getState(), url: data.data[0].url }];
  }
);

export const $pending = or(
  localAudioToTextFx.pending,
  imagesGenerationsFx.pending
);

sample({
  clock: localAudioToTextFx.doneData,
  source: $prompt,
  target: imagesGenerationsFx,
});
