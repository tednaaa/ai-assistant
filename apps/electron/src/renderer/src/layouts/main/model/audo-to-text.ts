import { createEffect } from 'effector';

import { OpenAIService } from '@renderer/shared/api/openai';

export const audioToTextFx = createEffect(async (audioBlob: Blob) => {
  return await OpenAIService.audioTranslations({
    model: 'whisper-1',
    file: audioBlob,
  });
});
