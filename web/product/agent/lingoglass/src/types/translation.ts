export type TranslationProvider = 'local_gpu' | 'google' | 'deepseek' | 'openai' | 'gemini' | 'custom';

export interface GpuStatus {
  cudaAvailable: boolean;
  cudaDeviceCount: number;
  gpuName: string;
}

export interface AISubtitleProgress {
  isGenerating: boolean;
  percent: number;
  message: string;
  error?: string | null;
}

export interface TranslationConfig {
  provider: TranslationProvider;
  targetLanguage: string; // 'vi', 'en', 'ja', 'ko', 'zh', 'fr', 'es', 'de'
  apiKey?: string;
  customEndpoint?: string;
  model?: string;
  autoGenerateOnUpload?: boolean;
  whisperModel?: string; // 'tiny', 'base', 'small', 'medium'
}

export interface TranslationProgress {
  isTranslating: boolean;
  totalCues: number;
  completedCues: number;
  currentChunk: number;
  totalChunks: number;
  error?: string | null;
}

export const SUPPORTED_TARGET_LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt (Vietnamese)' },
  { code: 'en', label: 'Tiếng Anh (English)' },
  { code: 'ja', label: 'Tiếng Nhật (Japanese)' },
  { code: 'ko', label: 'Tiếng Hàn (Korean)' },
  { code: 'zh', label: 'Tiếng Trung (Chinese)' },
  { code: 'fr', label: 'Tiếng Pháp (French)' },
  { code: 'es', label: 'Tiếng Tây Ban Nha (Spanish)' },
  { code: 'de', label: 'Tiếng Đức (German)' }
];
