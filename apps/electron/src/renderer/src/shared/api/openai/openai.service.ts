import axios from 'axios';

import { constants } from '@renderer/shared/lib/constants';
import { AudioTranslationsDto, ChatCompletitionsDto } from './types';

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${constants.OPENAI_TOKEN}`,
  },
});

const routes = {
  chatCompletions: 'chat/completions',
  audioTranslations: 'audio/translations',
};

export class OpenAIService {
  static chatCompletitions(chatCompletitionsDto: ChatCompletitionsDto) {
    return instance.post(routes.chatCompletions, chatCompletitionsDto);
  }

  static audioTranslations(audioTranslationsDto: AudioTranslationsDto) {
    const formData = new FormData();

    formData.append('file', audioTranslationsDto.file, 'audio.webm');
    formData.append('model', audioTranslationsDto.model);

    return instance.post<{ text: string }>(routes.audioTranslations, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
