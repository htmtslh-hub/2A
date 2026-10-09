import { SavedWord } from '../types/subtitle';

export async function loadPersistentVocabulary(): Promise<SavedWord[]> {
  if (typeof window !== 'undefined' && window.electronAPI?.storage) {
    try {
      const items = await window.electronAPI.storage.getVocabulary();
      if (Array.isArray(items)) return items;
    } catch (e) {
      console.error('Failed to load from native storage', e);
    }
  }

  // Web fallback (localStorage)
  try {
    const raw = localStorage.getItem('lingoglass_saved_words');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function savePersistentVocabulary(items: SavedWord[]): Promise<boolean> {
  if (typeof window !== 'undefined' && window.electronAPI?.storage) {
    try {
      return await window.electronAPI.storage.saveVocabulary(items);
    } catch (e) {
      console.error('Failed to save to native storage', e);
    }
  }

  // Web fallback
  try {
    localStorage.setItem('lingoglass_saved_words', JSON.stringify(items));
    return true;
  } catch (e) {
    return false;
  }
}

export async function loadCachedWaveform(mediaHash: string): Promise<number[] | null> {
  if (!mediaHash) return null;
  if (typeof window !== 'undefined' && window.electronAPI?.storage) {
    try {
      const res = await window.electronAPI.storage.getWaveformCache(mediaHash);
      if (res && Array.isArray(res.peaks)) return res.peaks;
    } catch (e) {}
  }
  return null;
}

export async function saveCachedWaveform(mediaHash: string, peaks: number[]): Promise<boolean> {
  if (!mediaHash || !peaks) return false;
  if (typeof window !== 'undefined' && window.electronAPI?.storage) {
    try {
      return await window.electronAPI.storage.saveWaveformCache(mediaHash, peaks);
    } catch (e) {}
  }
  return false;
}

export async function loadPlaybackState(mediaKey: string): Promise<any | null> {
  if (!mediaKey) return null;
  if (typeof window !== 'undefined' && window.electronAPI?.storage) {
    try {
      return await window.electronAPI.storage.getPlaybackState(mediaKey);
    } catch (e) {}
  }
  // Web fallback
  try {
    const raw = localStorage.getItem(`lingoglass_playback_${mediaKey}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export async function savePlaybackState(mediaKey: string, state: any): Promise<boolean> {
  if (!mediaKey || !state) return false;
  if (typeof window !== 'undefined' && window.electronAPI?.storage) {
    try {
      return await window.electronAPI.storage.savePlaybackState(mediaKey, state);
    } catch (e) {}
  }
  // Web fallback
  try {
    localStorage.setItem(`lingoglass_playback_${mediaKey}`, JSON.stringify(state));
    return true;
  } catch (e) {
    return false;
  }
}
