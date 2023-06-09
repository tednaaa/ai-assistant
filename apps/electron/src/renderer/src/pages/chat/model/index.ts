import { createStore, createEffect, sample } from 'effector';
import { or } from 'patronum';

import { OpenAIService } from '@renderer/shared/api/openai';
import { Message } from '@renderer/shared/api/openai';

export const audioToTextFx = createEffect(async (audioBlob: Blob) => {
  return await OpenAIService.audioTranslations({
    model: 'whisper-1',
    file: audioBlob,
  });
});

export const chatCompletionsFx = createEffect(async (messages: Message[]) => {
  return await OpenAIService.chatCompletitions({
    model: 'gpt-3.5-turbo',
    messages,
  });
});

export const $messages = createStore<Message[]>([])
  .on(audioToTextFx.doneData, (messages, { data }) => [
    ...messages,
    { role: 'user', content: data.text },
  ])
  .on(chatCompletionsFx.doneData, (messages, { data }) => [
    ...messages,
    data.choices[0].message,
  ]);

export const $pending = or(audioToTextFx.pending, chatCompletionsFx.pending);

sample({
  clock: audioToTextFx.doneData,
  source: $messages,
  target: chatCompletionsFx,
});
