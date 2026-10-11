import { SavedWord } from './subtitle';
import { LicenseStatus } from '../security/licenseClient';

declare global {
  interface Window {
    electronAPI?: {
      openVideoDialog: () => Promise<string | null>;
      openSubtitleDialog: () => Promise<string | null>;
      license?: {
        getStatus: () => Promise<LicenseStatus>;
        activate: (key: string) => Promise<{ success: boolean; license?: LicenseStatus; error?: string }>;
        deactivate: () => Promise<{ success: boolean }>;
      };
      storage?: {
        getVocabulary: () => Promise<SavedWord[]>;
        saveVocabulary: (items: SavedWord[]) => Promise<boolean>;
        getWaveformCache: (mediaHash: string) => Promise<{ peaks: number[] } | null>;
        saveWaveformCache: (mediaHash: string, peaks: number[]) => Promise<boolean>;
        getPlaybackState: (mediaKey: string) => Promise<any | null>;
        savePlaybackState: (mediaKey: string, state: any) => Promise<boolean>;
      };
      windowControls?: {
        minimize: () => Promise<void>;
        maximize: () => Promise<void>;
        close: () => Promise<void>;
        isMaximized: () => Promise<boolean>;
      };
      isDesktop?: boolean;
    };
  }
}

export {};
