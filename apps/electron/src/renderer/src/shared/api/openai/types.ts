export interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export interface Image {
  url: string;
}

export interface ChatCompletionsDto {
  model:
    | 'gpt-4'
    | 'gpt-4-0314'
    | 'gpt-4-32k'
    | 'gpt-4-32k-0314'
    | 'gpt-3.5-turbo'
    | 'gpt-3.5-turbo-0301';
  messages: Message[];
}

export interface ChatCompletionsResponse {
  id: string;
  object: 'chat.completion';
  created: number;
  choices: {
    index: number;
    message: Message;
    finish_reason: 'stop';
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AudioTranslationsDto {
  file: Blob;
  model: 'whisper-1';
}

export interface AudioTranslationsResponse {
  text: string;
}

export interface ImagesGenerationsDto {
  prompt: string;
}

export interface ImagesGenerationsResponse {
  created: number;
  data: Image[];
}
