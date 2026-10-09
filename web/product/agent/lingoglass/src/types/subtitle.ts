export interface SubtitleTrack {
  language: string; // e.g. 'en', 'vi', 'ja', 'ko', 'fr', 'zh'
  text: string;
  isSource?: boolean; // Primary text for language learning
}

export interface SubtitleCue {
  id: number;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  tracks?: SubtitleTrack[];
  // Convenience accessors for backwards compatibility
  textEn: string;
  textVn?: string;
}

export interface LanguagePair {
  sourceLanguage: string; // Ngôn ngữ cần học (e.g. 'en')
  targetLanguage: string; // Ngôn ngữ giải nghĩa / bản dịch (e.g. 'vi')
}

export interface DictionaryWord {
  word: string;
  cleanWord: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  ipa: string;
  type: string;
  meaning: string;
  example?: string;
  audio?: string;
}

export interface SavedWord extends DictionaryWord {
  savedAt: number;
  contextSentence: string;
}

/**
 * Helper to get the primary learning subtitle text for a cue
 */
export function getCueSourceText(cue: SubtitleCue, sourceLang: string = 'en'): string {
  if (cue.tracks && cue.tracks.length > 0) {
    const track = cue.tracks.find(t => t.language === sourceLang || t.isSource);
    if (track) return track.text;
  }
  return cue.textEn || '';
}

/**
 * Helper to get the translation/target subtitle text for a cue
 */
export function getCueTargetText(cue: SubtitleCue, targetLang: string = 'vi'): string | undefined {
  if (cue.tracks && cue.tracks.length > 0) {
    const track = cue.tracks.find(t => t.language === targetLang && !t.isSource);
    if (track) return track.text;
  }
  return cue.textVn;
}
