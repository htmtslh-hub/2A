import { SubtitleCue } from './subtitle';

export interface ABRepeatConfig {
  pointA: number | null;
  pointB: number | null;
  isActive: boolean;
  maxLoops: number; // 0 = infinite, 3, 5, etc.
  currentLoop: number;
}

export interface ShadowingConfig {
  isEnabled: boolean;
  autoPauseDurationRatio: number; // e.g. 1.2x length of sentence
  autoContinue: boolean;
  isPausedForUser: boolean;
  remainingCountdown: number;
  userRecordingUrl: string | null;
  isRecording: boolean;
}

export type AppTheme = 'pink' | 'black' | 'white' | 'yellow-black';

export interface PlayerSettings {
  showSubtitles: boolean;
  dualSubtitles: boolean;
  blurVietnamese: boolean;
  subtitleFontSize: number; // in px
  autoPauseAfterSentence: boolean;
  theme: AppTheme;
}
