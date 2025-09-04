export interface PromptCategory {
  id: string;
  name: string;
  description: string;
  prompts: Prompt[];
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  popularity: number;
  imageUrl?: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
}

export interface GenerationRequest {
  prompt: string;
  model?: string;
  quality?: 'standard' | 'hd';
  style?: 'natural' | 'vivid';
}

export interface ApiConfig {
  apiKey: string;
  model: string;
}