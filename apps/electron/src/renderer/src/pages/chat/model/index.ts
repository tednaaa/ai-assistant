import { createStore, createEffect, sample, attach } from 'effector';
import { or } from 'patronum';

import { Message, OpenAIService } from '@renderer/shared/api/openai';
import { audioToTextFx } from '@renderer/layouts/main';

export const localAudioToTextFx = attach({ effect: audioToTextFx });

export const chatCompletionsFx = createEffect(async (messages: Message[]) => {
  return await OpenAIService.chatCompletions({
    model: 'gpt-3.5-turbo',
    messages,
  });
});

export const $messages = createStore<Message[]>([])
  .on(localAudioToTextFx.doneData, (messages, { data }) => [
    ...messages,
    { role: 'user', content: data.text },
  ])
  .on(chatCompletionsFx.doneData, (messages, { data }) => [
    ...messages,
    data.choices[0].message,
  ]);

export const $pending = or(
  localAudioToTextFx.pending,
  chatCompletionsFx.pending
);

sample({
  clock: localAudioToTextFx.doneData,
  source: $messages,
  target: chatCompletionsFx,
});
