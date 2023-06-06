import axios from 'axios';

import { AudioTranslationsDto, ChatCompletitionsDto } from './openai.dto';
import { constants } from '@renderer/shared/lib/constants';

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
  static chatCompletitions(
    chatCompletitionsDto: ChatCompletitionsDto
  ): Promise<object> {
    return instance.post(routes.chatCompletions, chatCompletitionsDto);
  }

  static audioTranslations(
    audioTranslationsDto: AudioTranslationsDto
  ): Promise<object> {
    const formData = new FormData();

    formData.append('file', audioTranslationsDto.file, 'audio.webm');
    formData.append('model', audioTranslationsDto.model);

    return instance.post(routes.audioTranslations, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
