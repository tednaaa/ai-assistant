export interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export interface ChatCompletitionsDto {
  model:
    | 'gpt-4'
    | 'gpt-4-0314'
    | 'gpt-4-32k'
    | 'gpt-4-32k-0314'
    | 'gpt-3.5-turbo'
    | 'gpt-3.5-turbo-0301';
  messages: Message[];
}

export interface AudioTranslationsDto {
  file: Blob;
  model: 'whisper-1';
}
