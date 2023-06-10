import axios from 'axios';

import { constants } from '@renderer/shared/lib/constants';
import {
  AudioTranslationsDto,
  AudioTranslationsResponse,
  ChatCompletionsDto,
  ChatCompletionsResponse,
  ImagesGenerationsDto,
  ImagesGenerationsResponse,
} from './types';

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${constants.OPENAI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const routes = {
  chatCompletions: 'chat/completions',
  audioTranslations: 'audio/translations',
  imagesGenerations: 'images/generations',
};

export class OpenAIService {
  static audioTranslations(audioTranslationsDto: AudioTranslationsDto) {
    const formData = new FormData();

    formData.append('file', audioTranslationsDto.file, 'audio.webm');
    formData.append('model', audioTranslationsDto.model);

    return instance.post<AudioTranslationsResponse>(
      routes.audioTranslations,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }

  static chatCompletions(chatCompletionsDto: ChatCompletionsDto) {
    return instance.post<ChatCompletionsResponse>(
      routes.chatCompletions,
      chatCompletionsDto
    );
  }

  static imagesGenerations(imagesGenerationsDto: ImagesGenerationsDto) {
    return instance.post<ImagesGenerationsResponse>(
      routes.imagesGenerations,
      imagesGenerationsDto
    );
  }
}
