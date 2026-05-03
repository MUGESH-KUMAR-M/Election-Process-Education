export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface EducationalModule {
  title: string;
  icon: React.ReactNode;
  content: string;
  tags: string[];
}

export interface TimelineStep {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

export interface GeminiConfig {
  model: string;
  safetySettings: SafetySetting[];
  generationConfig: GenerationConfig;
}

export interface SafetySetting {
  category: string;
  threshold: string;
}

export interface GenerationConfig {
  temperature: number;
  maxOutputTokens: number;
  topP: number;
  topK: number;
}
