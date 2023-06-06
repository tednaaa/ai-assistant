import { OpenAIService } from '@renderer/shared/api/openai';
import { Message } from '@renderer/shared/api/openai/types';
import { createStore, createEffect } from 'effector';

export const audioToTextFx = createEffect(async (audioBlob: Blob) => {
  return await OpenAIService.audioTranslations({
    model: 'whisper-1',
    file: audioBlob,
  });
});

export const chatCompletionsFx = createEffect(
  async (messageContent: string) => {
    return await OpenAIService.chatCompletitions({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: messageContent }],
    });
  }
);

export const $messages = createStore<Message[]>([])
  .on(audioToTextFx.doneData, (messages, { data }) => [
    ...messages,
    {
      role: 'user',
      content: data.text,
    },
  ])
  .on(chatCompletionsFx.doneData, (messages, { data }) => [
    ...messages,
    data.choices[0].message,
  ]);
