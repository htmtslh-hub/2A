import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { SubtitleCue, DictionaryWord, SavedWord, LanguagePair } from '../types/subtitle';
import { ABRepeatConfig, ShadowingConfig, PlayerSettings } from '../types/player';
import { TranslationConfig, TranslationProgress, GpuStatus, AISubtitleProgress } from '../types/translation';
import { ShortcutItem, DEFAULT_SHORTCUTS } from '../types/shortcuts';
import { SAMPLE_SUBTITLES, DEFAULT_DEMO_VIDEO } from '../data/sampleData';
import { parseSRTorVTT } from '../utils/srtParser';
import { lookupWord as fetchWordInfo } from '../utils/dictionary';
import {
  translateAllSubtitleCues,
  translateBatch,
  exportSubtitlesToSRT
} from '../utils/translationService';
import { isShortcutTriggered } from '../utils/shortcutManager';

import { loadPersistentVocabulary, savePersistentVocabulary, loadPlaybackState, savePlaybackState } from '../security/storageClient';

interface PlayerContextType {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoSrc: string;
  videoFileName: string;
  subtitles: SubtitleCue[];
  currentCue: SubtitleCue | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  subtitleOffset: number; // in seconds (+0.1s, -0.5s etc.)
  languagePair: LanguagePair;
  abRepeat: ABRepeatConfig;
  shadowing: ShadowingConfig;
  settings: PlayerSettings;
  activeDictionaryWord: DictionaryWord | null;
  dictionaryPosition: { x: number; y: number } | null;
  savedWords: SavedWord[];
  isSidebarOpen: boolean;
  activeTab: 'subtitles' | 'vocabulary' | 'shadowing' | 'settings';
  showShortcuts: boolean;
  isAudioOnly: boolean;

  // GPU Local AI Subtitles & Speech-To-Text
  gpuStatus: GpuStatus | null;
  aiSubtitleProgress: AISubtitleProgress;
  generateSubtitlesWithGpu: (customFilePath?: string) => Promise<void>;
  cancelAiSubtitleGeneration: () => void;

  // Shortcuts Customization
  shortcuts: ShortcutItem[];
  updateShortcut: (id: string, newKeys: string[]) => void;
  resetShortcuts: () => void;
  getShortcutKeys: (id: string) => string[];

  // Translation (Auto-Translate API & Local GPU)
  translationConfig: TranslationConfig;
  translationProgress: TranslationProgress;
  updateTranslationConfig: (newConfig: Partial<TranslationConfig>) => void;
  translateAllSubtitles: () => Promise<void>;
  translateSingleCue: (cueId: number) => Promise<void>;
  cancelTranslation: () => void;
  exportTranslatedSRT: () => void;

  // Actions
  togglePlay: () => void;
  seek: (time: number) => void;
  jump: (seconds: number) => void;
  setPlaybackRate: (rate: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleSubtitles: () => void;
  
  // Subtitle offset (Sync)
  adjustSubtitleOffset: (delta: number) => void;
  resetSubtitleOffset: () => void;
  setLanguagePair: (pair: LanguagePair) => void;

  // A-B Repeat
  setPointA: (time?: number) => void;
  setPointB: (time?: number) => void;
  clearABRepeat: () => void;
  adjustPointA: (delta: number) => void;
  adjustPointB: (delta: number) => void;
  snapABToCurrentSentence: () => void;
  setMaxLoops: (loops: number) => void;

  // Subtitle navigation & management
  jumpToCue: (cue: SubtitleCue) => void;
  jumpToPrevCue: () => void;
  jumpToNextCue: () => void;
  repeatCurrentCue: () => void;
  clearSubtitles: () => void;
  loadDemoSubtitles: () => void;

  // File loading
  loadVideoFile: (file: File) => void;
  loadVideoFromPath: (filePath: string) => void;
  loadSubtitleFile: (file: File) => void;
  closeMedia: () => void;

  // Dictionary & Study
  lookupWord: (word: string, clientX?: number, clientY?: number) => Promise<void>;
  closeDictionary: () => void;
  saveWord: (word: DictionaryWord, contextSentence: string) => void;
  removeSavedWord: (word: string) => void;
  importVocabularyBackup: (jsonContent: string) => { success: boolean; count: number; error?: string };

  // UI state
  toggleSidebar: () => void;
  setActiveTab: (tab: 'subtitles' | 'vocabulary' | 'shadowing' | 'settings') => void;
  setShowShortcuts: (show: boolean) => void;
  updateSettings: (newSettings: Partial<PlayerSettings>) => void;

  // Shadowing & Recording
  toggleShadowing: () => void;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearRecording: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // State
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [videoFileName, setVideoFileName] = useState<string>('Chưa chọn media');

  const isAudioOnly = React.useMemo(() => {
    const audioExtensions = ['.mp3', '.m4a', '.aac', '.flac', '.wav', '.ogg', '.opus', '.weba'];
    return audioExtensions.some(ext => videoFileName.toLowerCase().endsWith(ext));
  }, [videoFileName]);
  const [subtitles, setSubtitles] = useState<SubtitleCue[]>([]);
  const [currentCue, setCurrentCue] = useState<SubtitleCue | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRateState] = useState<number>(1.0);
  const [volume, setVolumeState] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [subtitleOffset, setSubtitleOffset] = useState<number>(0); // in seconds
  const [languagePair, setLanguagePair] = useState<LanguagePair>({
    sourceLanguage: 'en',
    targetLanguage: 'vi'
  });

  // A-B Repeat
  const [abRepeat, setAbRepeat] = useState<ABRepeatConfig>({
    pointA: null,
    pointB: null,
    isActive: false,
    maxLoops: 0,
    currentLoop: 0
  });

  // Shadowing
  const [shadowing, setShadowing] = useState<ShadowingConfig>({
    isEnabled: false,
    autoPauseDurationRatio: 1.2,
    autoContinue: true,
    isPausedForUser: false,
    remainingCountdown: 0,
    userRecordingUrl: null,
    isRecording: false
  });

  // Settings
  const [settings, setSettings] = useState<PlayerSettings>(() => {
    try {
      const saved = localStorage.getItem('lingoglass_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        const validThemes = ['pink', 'black', 'white', 'yellow-black'];
        const theme = validThemes.includes(parsed.theme) ? parsed.theme : 'pink';
        return {
          showSubtitles: true,
          dualSubtitles: true,
          blurVietnamese: true,
          subtitleFontSize: 20,
          autoPauseAfterSentence: false,
          ...parsed,
          theme
        };
      }
    } catch {}
    return {
      showSubtitles: true,
      dualSubtitles: true,
      blurVietnamese: true,
      subtitleFontSize: 20,
      autoPauseAfterSentence: false,
      theme: 'pink'
    };
  });

  // Sync theme to document element
  useEffect(() => {
    const theme = settings.theme || 'pink';
    document.documentElement.setAttribute('data-theme', theme);
  }, [settings.theme]);

  // UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'subtitles' | 'vocabulary' | 'shadowing' | 'settings'>('subtitles');
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);

  // Dictionary & Saved Words (Plan v4.1 Section XXXIV, XXXV)
  const [activeDictionaryWord, setActiveDictionaryWord] = useState<DictionaryWord | null>(null);
  const [dictionaryPosition, setDictionaryPosition] = useState<{ x: number; y: number } | null>(null);
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);

  // Subtitle Auto-Translation State
  const [translationConfig, setTranslationConfigState] = useState<TranslationConfig>(() => {
    try {
      const saved = localStorage.getItem('lingoglass_translation_config');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      provider: 'local_gpu',
      targetLanguage: 'vi',
      model: 'deepseek-chat',
      autoGenerateOnUpload: true,
      whisperModel: 'base'
    };
  });

  // Local GPU AI States
  const currentFilePathRef = useRef<string>('');
  const [gpuStatus, setGpuStatus] = useState<GpuStatus | null>(null);
  const [aiSubtitleProgress, setAiSubtitleProgress] = useState<AISubtitleProgress>({
    isGenerating: false,
    percent: 0,
    message: '',
    error: null
  });

  // Check GPU status on boot
  useEffect(() => {
    if ((window as any).electronAPI?.ai?.checkGpuStatus) {
      (window as any).electronAPI.ai.checkGpuStatus().then((status: GpuStatus) => {
        setGpuStatus(status);
        if (status.cudaAvailable) {
          setTranslationConfigState(prev => ({
            ...prev,
            provider: 'local_gpu'
          }));
        }
      }).catch(console.error);
    }
  }, []);

  const updateTranslationConfig = (newConfig: Partial<TranslationConfig>) => {
    setTranslationConfigState(prev => {
      const updated = { ...prev, ...newConfig };
      try {
        localStorage.setItem('lingoglass_translation_config', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const [translationProgress, setTranslationProgress] = useState<TranslationProgress>({
    isTranslating: false,
    totalCues: 0,
    completedCues: 0,
    currentChunk: 0,
    totalChunks: 0,
    error: null
  });

  const translationAbortRef = useRef<AbortController | null>(null);

  // Customizable Keyboard Shortcuts State
  const [shortcuts, setShortcuts] = useState<ShortcutItem[]>(() => {
    try {
      const saved = localStorage.getItem('lingoglass_shortcuts');
      if (saved) {
        const parsed: { id: string; currentKeys: string[] }[] = JSON.parse(saved);
        return DEFAULT_SHORTCUTS.map(def => {
          const found = parsed.find(p => p.id === def.id);
          return found ? { ...def, currentKeys: found.currentKeys } : def;
        });
      }
    } catch {}
    return DEFAULT_SHORTCUTS;
  });

  const updateShortcut = (id: string, newKeys: string[]) => {
    setShortcuts(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, currentKeys: newKeys } : item
      );
      try {
        localStorage.setItem(
          'lingoglass_shortcuts',
          JSON.stringify(updated.map(u => ({ id: u.id, currentKeys: u.currentKeys })))
        );
      } catch {}
      return updated;
    });
  };

  const resetShortcuts = () => {
    setShortcuts(DEFAULT_SHORTCUTS);
    try {
      localStorage.removeItem('lingoglass_shortcuts');
    } catch {}
  };

  const getShortcutKeys = (id: string): string[] => {
    const found = shortcuts.find(s => s.id === id);
    return found ? found.currentKeys : [];
  };

  // Load from persistent native storage on startup
  useEffect(() => {
    loadPersistentVocabulary().then(items => {
      if (items && items.length > 0) {
        setSavedWords(items);
      }
    });
  }, []);

  // Save to persistent storage with atomic backup on changes
  useEffect(() => {
    if (savedWords.length > 0) {
      savePersistentVocabulary(savedWords);
    }
  }, [savedWords]);

  const pendingSeekRef = useRef<number | null>(null);

  // Synchronize duration if subtitles are present and media container lacks duration
  useEffect(() => {
    if (subtitles.length > 0 && (duration <= 0 || !isFinite(duration))) {
      const lastCue = subtitles[subtitles.length - 1];
      if (lastCue && lastCue.endTime > 0) {
        setDuration(lastCue.endTime + 1);
      }
    }
  }, [subtitles, duration]);

  // Video event listeners & time synchronization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleDurationChange = () => {
      let dur = video.duration;
      // Handle Infinity or NaN (common for MKV/WebM in Chromium)
      if (!isFinite(dur) || dur <= 0) {
        if (video.seekable && video.seekable.length > 0) {
          try {
            dur = video.seekable.end(video.seekable.length - 1);
          } catch {}
        }
      }
      if (!isFinite(dur) || dur <= 0) {
        if (subtitles.length > 0) {
          dur = subtitles[subtitles.length - 1].endTime + 1;
        }
      }
      if (isFinite(dur) && dur > 0) {
        setDuration(dur);
      }

      // If there is a pending seek waiting for video metadata/ready state
      if (pendingSeekRef.current !== null && video.readyState >= 1) {
        const target = pendingSeekRef.current;
        pendingSeekRef.current = null;
        try {
          video.currentTime = target;
          setCurrentTime(target);
        } catch {}
      }
    };

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      if (isFinite(time)) {
        setCurrentTime(time);
      }

      // If duration is not yet resolved, try resolving from seekable or duration
      if (duration <= 0 || !isFinite(duration)) {
        handleDurationChange();
      }

      // Find current subtitle cue with offset applied
      const adjustedTime = (isFinite(time) ? time : 0) + subtitleOffset;
      const active = subtitles.find(s => adjustedTime >= s.startTime && adjustedTime <= s.endTime) || null;
      setCurrentCue(active);

      // Check A-B Repeat loop condition
      if (abRepeat.isActive && abRepeat.pointA !== null && abRepeat.pointB !== null) {
        if (time >= abRepeat.pointB) {
          if (abRepeat.maxLoops > 0 && abRepeat.currentLoop + 1 >= abRepeat.maxLoops) {
            setAbRepeat(prev => ({ ...prev, isActive: false, currentLoop: 0 }));
          } else {
            video.currentTime = abRepeat.pointA;
            setAbRepeat(prev => ({ ...prev, currentLoop: prev.currentLoop + 1 }));
          }
        }
      }

      // Check Shadowing auto-pause
      if (shadowing.isEnabled && active && !shadowing.isPausedForUser) {
        if (Math.abs(adjustedTime - active.endTime) < 0.25) {
          video.pause();
          setIsPlaying(false);
          const durationToWait = Math.max(2, Math.round((active.endTime - active.startTime) * shadowing.autoPauseDurationRatio));
          setShadowing(prev => ({
            ...prev,
            isPausedForUser: true,
            remainingCountdown: durationToWait
          }));
        }
      }
    };

    // Immediately sync current state if video metadata already loaded
    handleDurationChange();
    if (isFinite(video.currentTime)) {
      setCurrentTime(video.currentTime);
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleError = () => {
      const err = video.error;
      console.error('[Video Error]:', err ? `code=${err.code}, message=${err.message}` : 'Unknown');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('loadedmetadata', handleDurationChange);
    video.addEventListener('loadeddata', handleDurationChange);
    video.addEventListener('canplay', handleDurationChange);
    video.addEventListener('canplaythrough', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('loadedmetadata', handleDurationChange);
      video.removeEventListener('loadeddata', handleDurationChange);
      video.removeEventListener('canplay', handleDurationChange);
      video.removeEventListener('canplaythrough', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [subtitles, abRepeat, shadowing, subtitleOffset, videoSrc, duration]);

  // Shadowing Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (shadowing.isEnabled && shadowing.isPausedForUser && shadowing.remainingCountdown > 0) {
      interval = setInterval(() => {
        setShadowing(prev => {
          if (prev.remainingCountdown <= 1) {
            clearInterval(interval);
            if (prev.autoContinue && videoRef.current) {
              videoRef.current.play().catch(console.error);
            }
            return {
              ...prev,
              isPausedForUser: false,
              remainingCountdown: 0
            };
          }
          return {
            ...prev,
            remainingCountdown: prev.remainingCountdown - 1
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [shadowing.isEnabled, shadowing.isPausedForUser, shadowing.remainingCountdown, shadowing.autoContinue]);

  // Actions
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (shadowing.isPausedForUser) {
        setShadowing(prev => ({ ...prev, isPausedForUser: false, remainingCountdown: 0 }));
      }
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  };

  const seek = (time: number) => {
    const video = videoRef.current;
    if (isNaN(time)) return;

    let maxDuration = duration;
    if (!isFinite(maxDuration) || maxDuration <= 0) {
      if (video && video.duration && isFinite(video.duration) && video.duration > 0) {
        maxDuration = video.duration;
      } else if (video && video.seekable && video.seekable.length > 0) {
        try {
          maxDuration = video.seekable.end(video.seekable.length - 1);
        } catch {}
      } else if (subtitles.length > 0) {
        maxDuration = subtitles[subtitles.length - 1].endTime + 10;
      } else {
        maxDuration = 86400; // 24h fallback
      }
    }

    const clamped = Math.max(0, Math.min(time, maxDuration));
    if (!video || video.readyState === 0) {
      pendingSeekRef.current = clamped;
      setCurrentTime(clamped);
      return;
    }

    try {
      video.currentTime = clamped;
      setCurrentTime(clamped);
    } catch (e) {
      console.error('[Seek error]:', e);
    }
  };

  const jump = (seconds: number) => {
    const video = videoRef.current;
    const baseTime = video && isFinite(video.currentTime) ? video.currentTime : currentTime;
    seek(baseTime + seconds);
  };

  const setPlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRateState(rate);
  };

  const setVolume = (vol: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(vol, 1));
    video.volume = clamped;
    video.muted = clamped === 0;
    setVolumeState(clamped);
    setIsMuted(clamped === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Subtitle offset adjustment
  const adjustSubtitleOffset = (delta: number) => {
    setSubtitleOffset(prev => parseFloat((prev + delta).toFixed(2)));
  };

  const resetSubtitleOffset = () => {
    setSubtitleOffset(0);
  };

  // A-B Repeat methods
  const setPointA = (time?: number) => {
    const target = time !== undefined ? time : currentTime;
    setAbRepeat(prev => {
      const nextB = prev.pointB !== null && prev.pointB > target ? prev.pointB : null;
      return {
        ...prev,
        pointA: target,
        pointB: nextB,
        isActive: nextB !== null,
        currentLoop: 0
      };
    });
  };

  const setPointB = (time?: number) => {
    const target = time !== undefined ? time : currentTime;
    setAbRepeat(prev => {
      if (prev.pointA === null || target <= prev.pointA) return prev;
      return {
        ...prev,
        pointB: target,
        isActive: true,
        currentLoop: 0
      };
    });
  };

  const clearABRepeat = () => {
    setAbRepeat({
      pointA: null,
      pointB: null,
      isActive: false,
      maxLoops: 0,
      currentLoop: 0
    });
  };

  const adjustPointA = (delta: number) => {
    setAbRepeat(prev => {
      if (prev.pointA === null) return prev;
      const newA = Math.max(0, prev.pointA + delta);
      if (prev.pointB !== null && newA >= prev.pointB) return prev;
      return { ...prev, pointA: newA };
    });
  };

  const adjustPointB = (delta: number) => {
    setAbRepeat(prev => {
      if (prev.pointB === null) return prev;
      const newB = Math.min(duration, prev.pointB + delta);
      if (prev.pointA !== null && newB <= prev.pointA) return prev;
      return { ...prev, pointB: newB };
    });
  };

  const snapABToCurrentSentence = () => {
    const targetCue = currentCue || subtitles.find(s => currentTime >= s.startTime - 1.5 && currentTime <= s.endTime + 1.5);
    if (targetCue) {
      setAbRepeat({
        pointA: Math.max(0, targetCue.startTime - 0.1),
        pointB: targetCue.endTime + 0.1,
        isActive: true,
        maxLoops: abRepeat.maxLoops,
        currentLoop: 0
      });
      seek(Math.max(0, targetCue.startTime - 0.1));
    }
  };

  const setMaxLoops = (loops: number) => {
    setAbRepeat(prev => ({ ...prev, maxLoops: loops }));
  };

  // Subtitle navigation
  const jumpToCue = (cue: SubtitleCue) => {
    seek(Math.max(0, cue.startTime - 0.05));
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(console.error);
    }
  };

  const jumpToPrevCue = () => {
    if (subtitles.length === 0) {
      jump(-5);
      return;
    }

    const video = videoRef.current;
    const currentT = video && isFinite(video.currentTime) ? video.currentTime : currentTime;
    const currentIdx = subtitles.findIndex(s => currentT >= s.startTime && currentT <= s.endTime);

    if (currentIdx !== -1) {
      const cue = subtitles[currentIdx];
      // If we are more than 0.8s into the cue, rewind to the start of this current cue
      if (currentT > cue.startTime + 0.8) {
        jumpToCue(cue);
      } else if (currentIdx > 0) {
        // Otherwise jump to previous cue
        jumpToCue(subtitles[currentIdx - 1]);
      } else {
        // At the very first cue, jump to 0:00
        seek(0);
      }
    } else {
      // In between cues
      const prevCues = subtitles.filter(s => s.endTime <= currentT);
      if (prevCues.length > 0) {
        jumpToCue(prevCues[prevCues.length - 1]);
      } else {
        seek(0);
      }
    }
  };

  const jumpToNextCue = () => {
    if (subtitles.length === 0) {
      jump(5);
      return;
    }

    const video = videoRef.current;
    const currentT = video && isFinite(video.currentTime) ? video.currentTime : currentTime;
    const currentIdx = subtitles.findIndex(s => currentT >= s.startTime && currentT <= s.endTime);

    if (currentIdx !== -1 && currentIdx < subtitles.length - 1) {
      jumpToCue(subtitles[currentIdx + 1]);
    } else {
      const nextCue = subtitles.find(s => s.startTime > currentT);
      if (nextCue) {
        jumpToCue(nextCue);
      } else {
        // At or after the last cue
        jump(5);
      }
    }
  };

  const repeatCurrentCue = () => {
    if (subtitles.length === 0) {
      jump(-5);
      return;
    }
    const video = videoRef.current;
    const currentT = video && isFinite(video.currentTime) ? video.currentTime : currentTime;
    const cue = currentCue || subtitles.find(s => currentT >= s.startTime - 1.5 && currentT <= s.endTime + 1.5);
    if (cue) {
      snapABToCurrentSentence();
    } else {
      jump(-5);
    }
  };

  const clearSubtitles = () => {
    setSubtitles([]);
    setCurrentCue(null);
    resetSubtitleOffset();
  };

  const loadDemoSubtitles = () => {
    setSubtitles(SAMPLE_SUBTITLES);
    resetSubtitleOffset();
    setActiveTab('subtitles');
  };

  // File loading
  const loadVideoFile = (file: File) => {
    // Extract real disk path on desktop
    let diskPath = '';
    try {
      if ((window as any).electronAPI?.getPathForFile) {
        diskPath = (window as any).electronAPI.getPathForFile(file);
      }
    } catch (e) {}
    if (!diskPath) {
      diskPath = (file as any).path || '';
    }

    if (diskPath) {
      loadVideoFromPath(diskPath);
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setVideoFileName(file.name);
    // Clear demo subtitles so custom media does not inherit unrelated sample script
    setSubtitles([]);
    setCurrentCue(null);
    clearABRepeat();

    // Check if there is previous playback state (resume position, offset, playback rate)
    loadPlaybackState(file.name).then(state => {
      if (state) {
        if (typeof state.subtitleOffset === 'number') {
          setSubtitleOffset(state.subtitleOffset);
        } else {
          resetSubtitleOffset();
        }
        if (typeof state.playbackRate === 'number' && state.playbackRate >= 0.5 && state.playbackRate <= 2.0) {
          setPlaybackRate(state.playbackRate);
        }
        if (typeof state.resumePosition === 'number' && state.resumePosition > 3) {
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.currentTime = state.resumePosition;
              setCurrentTime(state.resumePosition);
            }
          }, 350);
        } else {
          setCurrentTime(0);
        }
      } else {
        resetSubtitleOffset();
        setCurrentTime(0);
      }
    });
  };

  const loadVideoFromPath = (filePath: string) => {
    if (!filePath) return;
    const fileName = filePath.split(/[\\/]/).pop() || 'Media';
    currentFilePathRef.current = filePath;
    setVideoFileName(fileName);
    setSubtitles([]);
    setCurrentCue(null);
    clearABRepeat();

    // Use media:// stream protocol
    const mediaUrl = `media:///${filePath.replace(/\\/g, '/')}`;
    setVideoSrc(mediaUrl);
    setDuration(0);
    setCurrentTime(0);

    // Fast container duration retrieval via ffprobe
    if ((window as any).electronAPI?.getMediaDuration) {
      (window as any).electronAPI.getMediaDuration(filePath).then((dur: number | null) => {
        if (dur && isFinite(dur) && dur > 0) {
          setDuration(dur);
        }
      }).catch(() => {});
    }

    // Check playback state
    loadPlaybackState(fileName).then(state => {
      if (state) {
        if (typeof state.subtitleOffset === 'number') {
          setSubtitleOffset(state.subtitleOffset);
        } else {
          resetSubtitleOffset();
        }
        if (typeof state.playbackRate === 'number' && state.playbackRate >= 0.5 && state.playbackRate <= 2.0) {
          setPlaybackRate(state.playbackRate);
        }
        if (typeof state.resumePosition === 'number' && state.resumePosition > 3) {
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.currentTime = state.resumePosition;
              setCurrentTime(state.resumePosition);
            }
          }, 350);
        } else {
          setCurrentTime(0);
        }
      } else {
        resetSubtitleOffset();
        setCurrentTime(0);
      }
    });

    if (translationConfig.autoGenerateOnUpload !== false && (window as any).electronAPI?.ai) {
      generateSubtitlesWithGpu(filePath);
    }
  };

  const generateSubtitlesWithGpu = async (customFilePath?: string) => {
    let targetPath = customFilePath || currentFilePathRef.current;
    if (!targetPath) {
      if ((window as any).electronAPI?.openVideoDialog) {
        const picked = await (window as any).electronAPI.openVideoDialog();
        if (picked) {
          loadVideoFromPath(picked);
          return;
        }
      }
      alert('Vui lòng chọn hoặc kéo thả file video/audio từ máy tính vào ứng dụng.');
      return;
    }

    if (!(window as any).electronAPI?.ai) {
      alert('Tính năng Local GPU AI chỉ hoạt động trong ứng dụng Desktop LingoGlass.');
      return;
    }

    setAiSubtitleProgress({
      isGenerating: true,
      percent: 10,
      message: 'Đang chuẩn bị mô hình Whisper AI trên GPU...',
      error: null
    });

    const unsubscribe = (window as any).electronAPI.ai.onProgress((data: any) => {
      if (data.type === 'progress') {
        setAiSubtitleProgress(prev => ({
          ...prev,
          percent: data.percent,
          message: data.message
        }));
      } else if (data.type === 'info') {
        setAiSubtitleProgress(prev => ({
          ...prev,
          message: `Đã nhận diện: ${data.detectedLanguage?.toUpperCase()} (${Math.round((data.languageProbability || 0) * 100)}%)`
        }));
      }
    });

    try {
      const res = await (window as any).electronAPI.ai.generateSubtitles(targetPath, {
        model: translationConfig.whisperModel || 'base',
        targetLang: translationConfig.targetLanguage || 'vi',
        sourceLang: languagePair.sourceLanguage || 'auto',
        device: 'cuda'
      });

      if (res.success && res.cues && res.cues.length > 0) {
        setSubtitles(res.cues);
        setActiveTab('subtitles');
        setAiSubtitleProgress({
          isGenerating: false,
          percent: 100,
          message: `Đã tạo ${res.cues.length} câu phụ đề song ngữ thành công!`,
          error: null
        });

        // Tự động phát media khi phụ đề AI đã sẵn sàng
        const startPlayback = () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(err => {
              console.warn('Auto playback after subtitle generation:', err);
            });
          }
        };

        if (videoRef.current) {
          if (videoRef.current.readyState >= 2) {
            startPlayback();
          } else {
            videoRef.current.addEventListener('canplay', startPlayback, { once: true });
            setTimeout(startPlayback, 300);
          }
        }
      } else {
        const errMsg = res.error || 'Không nhận diện được giọng nói trong file media này.';
        setAiSubtitleProgress({
          isGenerating: false,
          percent: 0,
          message: '',
          error: errMsg
        });
        alert(`Thông báo GPU AI: ${errMsg}`);
      }
    } catch (err: any) {
      const errText = err.message || 'Lỗi xử lý GPU AI.';
      setAiSubtitleProgress({
        isGenerating: false,
        percent: 0,
        message: '',
        error: errText
      });
      alert(`Lỗi xử lý GPU AI: ${errText}`);
    } finally {
      if (unsubscribe) unsubscribe();
    }
  };

  const cancelAiSubtitleGeneration = () => {
    if ((window as any).electronAPI?.ai?.cancel) {
      (window as any).electronAPI.ai.cancel();
    }
    setAiSubtitleProgress({
      isGenerating: false,
      percent: 0,
      message: 'Đã hủy tiến trình AI.',
      error: null
    });
  };

  // Debounced auto-save playback state (resume position, subtitle offset, speed)
  useEffect(() => {
    if (!videoFileName || currentTime <= 0) return;
    const timer = setTimeout(() => {
      savePlaybackState(videoFileName, {
        resumePosition: Math.round(currentTime),
        subtitleOffset,
        playbackRate,
        duration: Math.round(duration)
      }).catch(() => {});
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentTime, videoFileName, subtitleOffset, playbackRate, duration]);

  const loadSubtitleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        const parsed = parseSRTorVTT(text);
        if (parsed.length > 0) {
          setSubtitles(parsed);
          resetSubtitleOffset();
          setActiveTab('subtitles');
          setIsSidebarOpen(true);
        } else {
          alert('Không tìm thấy câu thoại hoặc định dạng không hỗ trợ. Vui lòng chọn file kịch bản .srt, .vtt hoặc .lrc!');
        }
      }
    };
    reader.readAsText(file);
  };

  const closeMedia = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setVideoSrc('');
    setVideoFileName('Chưa chọn media');
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  // Subtitle Auto-Translation logic (Local GPU or Cloud APIs)
  const translateAllSubtitles = async () => {
    if (subtitles.length === 0) {
      alert('Chưa có kịch bản phụ đề để dịch!');
      return;
    }
    if (translationProgress.isTranslating) return;

    // Handle Local GPU translation via MarianMT
    if (translationConfig.provider === 'local_gpu' && (window as any).electronAPI?.ai) {
      setTranslationProgress({
        isTranslating: true,
        totalCues: subtitles.length,
        completedCues: 0,
        currentChunk: 1,
        totalChunks: 1,
        error: null
      });

      try {
        const res = await (window as any).electronAPI.ai.translateCues(subtitles, {
          sourceLang: languagePair.sourceLanguage,
          targetLang: translationConfig.targetLanguage || 'vi'
        });

        if (res.success && res.cues) {
          setSubtitles(res.cues);
          setTranslationProgress({
            isTranslating: false,
            totalCues: subtitles.length,
            completedCues: subtitles.length,
            currentChunk: 1,
            totalChunks: 1,
            error: null
          });
          return;
        } else {
          throw new Error(res.error || 'Lỗi dịch local GPU');
        }
      } catch (err: any) {
        setTranslationProgress({
          isTranslating: false,
          totalCues: subtitles.length,
          completedCues: 0,
          currentChunk: 0,
          totalChunks: 0,
          error: err.message || 'Lỗi khi dịch phụ đề bằng GPU'
        });
        return;
      }
    }

    const abortController = new AbortController();
    translationAbortRef.current = abortController;

    try {
      const updated = await translateAllSubtitleCues(
        subtitles,
        translationConfig,
        languagePair.sourceLanguage,
        translationConfig.targetLanguage || languagePair.targetLanguage,
        (progress) => {
          setTranslationProgress(progress);
        },
        abortController.signal
      );

      setSubtitles(updated);

      // Refresh active cue if currently set
      if (currentCue) {
        const activeUpdated = updated.find(c => c.id === currentCue.id);
        if (activeUpdated) {
          setCurrentCue(activeUpdated);
        }
      }
    } catch (err: any) {
      if (err.message === 'Translation aborted by user') {
        setTranslationProgress(prev => ({ ...prev, isTranslating: false }));
      } else {
        console.error('Translation error:', err);
        setTranslationProgress(prev => ({
          ...prev,
          isTranslating: false,
          error: err.message || 'Lỗi khi dịch phụ đề'
        }));
      }
    } finally {
      translationAbortRef.current = null;
    }
  };

  const translateSingleCue = async (cueId: number) => {
    const cue = subtitles.find(c => c.id === cueId);
    if (!cue || !cue.textEn) return;

    try {
      const targetLang = translationConfig.targetLanguage || languagePair.targetLanguage || 'vi';
      const translated = await translateBatch(
        [cue.textEn],
        translationConfig,
        languagePair.sourceLanguage,
        targetLang
      );

      const transText = translated[0] || '';
      setSubtitles(prev =>
        prev.map(c =>
          c.id === cueId
            ? {
                ...c,
                textVn: transText,
                tracks: [
                  { language: languagePair.sourceLanguage, text: c.textEn, isSource: true },
                  { language: targetLang, text: transText, isSource: false }
                ]
              }
            : c
        )
      );

      if (currentCue && currentCue.id === cueId) {
        setCurrentCue(prev => (prev ? { ...prev, textVn: transText } : null));
      }
    } catch (err) {
      console.error('Error translating single cue:', err);
    }
  };

  const cancelTranslation = () => {
    if (translationAbortRef.current) {
      translationAbortRef.current.abort();
      translationAbortRef.current = null;
    }
    setTranslationProgress(prev => ({ ...prev, isTranslating: false }));
  };

  const exportTranslatedSRT = () => {
    if (subtitles.length === 0) {
      alert('Không có phụ đề để xuất!');
      return;
    }
    const srtContent = exportSubtitlesToSRT(subtitles, true);
    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const baseName = videoFileName.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}_Dual_Subtitles.srt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Dictionary & Saved Words
  const lookupWord = async (rawWord: string, clientX?: number, clientY?: number) => {
    try {
      const info = await fetchWordInfo(rawWord);
      setActiveDictionaryWord(info);
      if (clientX !== undefined && clientY !== undefined) {
        setDictionaryPosition({ x: clientX, y: clientY });
      } else {
        setDictionaryPosition(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const closeDictionary = () => {
    setActiveDictionaryWord(null);
    setDictionaryPosition(null);
  };

  const saveWord = (word: DictionaryWord, contextSentence: string) => {
    setSavedWords(prev => {
      if (prev.some(w => w.cleanWord === word.cleanWord)) return prev;
      return [{ ...word, savedAt: Date.now(), contextSentence }, ...prev];
    });
  };

  const removeSavedWord = (wordClean: string) => {
    setSavedWords(prev => prev.filter(w => w.cleanWord !== wordClean));
  };

  const importVocabularyBackup = (jsonContent: string) => {
    try {
      const parsed = JSON.parse(jsonContent);
      const itemsToImport: SavedWord[] = Array.isArray(parsed) ? parsed : (parsed.items || []);
      if (!Array.isArray(itemsToImport) || itemsToImport.length === 0) {
        return { success: false, count: 0, error: 'File không chứa dữ liệu từ vựng hợp lệ.' };
      }

      setSavedWords(prev => {
        const existingCleanWords = new Set(prev.map(w => w.cleanWord));
        const newItems = itemsToImport.filter(item => item.cleanWord && !existingCleanWords.has(item.cleanWord));
        const merged = [...newItems, ...prev];
        savePersistentVocabulary(merged);
        return merged;
      });

      return { success: true, count: itemsToImport.length };
    } catch (e) {
      return { success: false, count: 0, error: 'Định dạng JSON không hợp lệ.' };
    }
  };

  // UI state
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const updateSettings = (newSettings: Partial<PlayerSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('lingoglass_settings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleSubtitles = () => {
    setSettings(prev => {
      const next = !prev.showSubtitles;
      const updated = { ...prev, showSubtitles: next };
      try {
        localStorage.setItem('lingoglass_settings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Shadowing & Recording
  const toggleShadowing = () => {
    setShadowing(prev => ({
      ...prev,
      isEnabled: !prev.isEnabled,
      isPausedForUser: false,
      remainingCountdown: 0
    }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setShadowing(prev => ({ ...prev, userRecordingUrl: audioUrl, isRecording: false }));
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setShadowing(prev => ({ ...prev, isRecording: true }));
    } catch (err) {
      console.error('Không thể truy cập microphone:', err);
      alert('Vui lòng cấp quyền Microphone để ghi âm luyện giọng.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const clearRecording = () => {
    setShadowing(prev => ({ ...prev, userRecordingUrl: null }));
  };

  // Global Keyboard Shortcuts (Plan v4.1 Section XV)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      // Check user configured shortcuts
      if (isShortcutTriggered(e, getShortcutKeys('playPause'))) {
        e.preventDefault();
        togglePlay();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('jumpBackward10s'))) {
        e.preventDefault();
        jump(-10);
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('jumpForward10s'))) {
        e.preventDefault();
        jump(10);
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('jumpBackward'))) {
        e.preventDefault();
        jump(-5);
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('jumpForward'))) {
        e.preventDefault();
        jump(5);
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('prevCue'))) {
        e.preventDefault();
        jumpToPrevCue();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('nextCue'))) {
        e.preventDefault();
        jumpToNextCue();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('repeatCue'))) {
        e.preventDefault();
        snapABToCurrentSentence();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('setPointA'))) {
        e.preventDefault();
        setPointA();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('setPointB'))) {
        e.preventDefault();
        setPointB();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('clearAB'))) {
        e.preventDefault();
        clearABRepeat();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('subEarlier'))) {
        e.preventDefault();
        adjustSubtitleOffset(e.shiftKey ? -0.5 : -0.1);
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('subLater'))) {
        e.preventDefault();
        adjustSubtitleOffset(e.shiftKey ? 0.5 : 0.1);
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('toggleShadowing'))) {
        e.preventDefault();
        toggleShadowing();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('toggleMute'))) {
        e.preventDefault();
        toggleMute();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('speedDown'))) {
        e.preventDefault();
        setPlaybackRate(Math.max(0.5, parseFloat((playbackRate - 0.1).toFixed(2))));
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('speedUp'))) {
        e.preventDefault();
        setPlaybackRate(Math.min(2.0, parseFloat((playbackRate + 0.1).toFixed(2))));
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('toggleSubtitles'))) {
        e.preventDefault();
        toggleSubtitles();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('toggleDualSub'))) {
        e.preventDefault();
        updateSettings({ dualSubtitles: !settings.dualSubtitles });
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('autoTranslate'))) {
        e.preventDefault();
        translateAllSubtitles();
        return;
      }
      if (isShortcutTriggered(e, getShortcutKeys('toggleShortcuts'))) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCue, currentTime, abRepeat, duration, isMuted, shadowing.isEnabled, playbackRate, subtitleOffset, shortcuts, settings.showSubtitles, settings.dualSubtitles]);

  return (
    <PlayerContext.Provider
      value={{
        videoRef,
        videoSrc,
        videoFileName,
        subtitles,
        currentCue,
        currentTime,
        duration,
        isPlaying,
        playbackRate,
        volume,
        isMuted,
        subtitleOffset,
        languagePair,
        abRepeat,
        shadowing,
        settings,
        activeDictionaryWord,
        dictionaryPosition,
        savedWords,
        isSidebarOpen,
        activeTab,
        isAudioOnly,

        // Local GPU AI
        gpuStatus,
        aiSubtitleProgress,
        generateSubtitlesWithGpu,
        cancelAiSubtitleGeneration,

        // Shortcuts
        shortcuts,
        updateShortcut,
        resetShortcuts,
        getShortcutKeys,

        togglePlay,
        seek,
        jump,
        setPlaybackRate,
        setVolume,
        toggleMute,
        toggleSubtitles,

        adjustSubtitleOffset,
        resetSubtitleOffset,
        setLanguagePair,

        setPointA,
        setPointB,
        clearABRepeat,
        adjustPointA,
        adjustPointB,
        snapABToCurrentSentence,
        setMaxLoops,

        jumpToCue,
        jumpToPrevCue,
        jumpToNextCue,
        repeatCurrentCue,
        clearSubtitles,
        loadDemoSubtitles,

        loadVideoFile,
        loadVideoFromPath,
        loadSubtitleFile,
        closeMedia,

        // Translation API
        translationConfig,
        translationProgress,
        updateTranslationConfig,
        translateAllSubtitles,
        translateSingleCue,
        cancelTranslation,
        exportTranslatedSRT,

        lookupWord,
        closeDictionary,
        saveWord,
        removeSavedWord,
        importVocabularyBackup,

        toggleSidebar,
        setActiveTab,
        showShortcuts,
        setShowShortcuts,
        updateSettings,

        toggleShadowing,
        startRecording,
        stopRecording,
        clearRecording
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
