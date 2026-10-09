import React, { useRef, useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { ClyHealthAudioVisualizer } from './ClyHealthAudioVisualizer';
import { SubtitleOverlay } from './SubtitleOverlay';
import { FloatingControlBar } from './FloatingControlBar';
import { DictionaryPopup } from './DictionaryPopup';
import { ShadowingPanel } from './ShadowingPanel';
import { FileDropzone } from './FileDropzone';
import { AppLogo } from './AppLogo';
import { Sparkles, Mic, Cpu, X, UploadCloud, EyeOff } from 'lucide-react';

export const VideoPlayer: React.FC = () => {
  const {
    videoRef,
    videoSrc,
    videoFileName,
    isAudioOnly,
    togglePlay,
    isPlaying,
    shadowing,
    toggleShadowing,
    aiSubtitleProgress,
    gpuStatus,
    cancelAiSubtitleGeneration,
    loadVideoFromPath,
    settings,
    subtitles,
    toggleSubtitles
  } = usePlayer();

  const containerRef = useRef<HTMLDivElement>(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimeoutRef = useRef<any>(null);

  // Auto-hide controls after 3.5s of inactivity when video is playing
  const handleMouseMove = () => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (isPlaying) {
      hideTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3500);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setControlsVisible(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    }
  }, [isPlaying]);

  const handleVideoClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'VIDEO') {
      togglePlay();
    }
  };

  const handleDoubleClick = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    } else {
      containerRef.current.requestFullscreen().catch(console.error);
    }
  };

  return (
    <FileDropzone>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onDoubleClick={handleDoubleClick}
        className="relative w-full h-full bg-[#FAF7F2] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Retro Pop Audio-Only / Vinyl Listening Hub */}
        {isAudioOnly && videoSrc && <ClyHealthAudioVisualizer />}

        {/* Empty state / Welcome prompt if no video loaded */}
        {!videoSrc && (
          <div className="flex flex-col items-center justify-center text-center p-8 z-20 max-w-md bg-[#FFFDF9] border-2 border-[#1E1E24] shadow-[5px_5px_0px_#1E1E24] rounded-3xl animate-in fade-in duration-300">
            <AppLogo size={68} className="mb-4" />
            <h2 className="text-xl font-extrabold text-[#1E1E24] mb-2 tracking-tight">
              Sẵn sàng học ngoại ngữ
            </h2>
            <p className="text-xs text-[#52525B] font-medium mb-5 leading-relaxed max-w-xs">
              Mở hoặc kéo thả file Video / Audio vào đây để tạo phụ đề song ngữ tự động.
            </p>
            <button
              onClick={() => {
                if ((window as any).electronAPI?.openVideoDialog) {
                  (window as any).electronAPI.openVideoDialog().then((selected: string | null) => {
                    if (selected) loadVideoFromPath(selected);
                  });
                }
              }}
              className="px-5 py-2.5 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#BE185D] border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] font-bold text-xs active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#BE185D]" />
              <span>Mở Video / Audio từ máy tính</span>
            </button>
          </div>
        )}

        {/* Core Media Element (Always mounted for robust audio/video decoding) */}
        <video
          ref={videoRef}
          src={videoSrc || undefined}
          onClick={handleVideoClick}
          playsInline
          className={
            !videoSrc
              ? 'hidden'
              : isAudioOnly
              ? 'opacity-0 pointer-events-none absolute w-1 h-1 -z-10'
              : 'w-full h-full object-contain cursor-pointer bg-black'
          }
        />

        {/* Retro AI Subtitle Progress Banner */}
        {aiSubtitleProgress.isGenerating && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto min-w-[320px] px-4 py-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#1E1E24] shadow-[4px_4px_0px_#1E1E24] flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="w-9 h-9 rounded-xl bg-[#FCE7F3] border-[1.5px] border-[#1E1E24] flex items-center justify-center shrink-0 text-[#BE185D]">
              <Cpu className="w-4 h-4 animate-pulse" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-xs font-extrabold text-[#1E1E24]">
                  Đang tạo phụ đề AI
                </span>
                <span className="text-[11px] font-mono font-bold text-[#BE185D]">
                  {Math.round(aiSubtitleProgress.percent)}%
                </span>
              </div>

              <p className="text-[11px] text-[#52525B] font-medium truncate">
                {aiSubtitleProgress.message || 'Đang nhận diện giọng nói & dịch tự động...'}
              </p>

              <div className="w-full bg-[#FAF7F2] rounded-full h-2 mt-1.5 overflow-hidden border border-[#1E1E24]">
                <div
                  className="bg-[#BE185D] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, Math.min(100, aiSubtitleProgress.percent))}%` }}
                />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                cancelAiSubtitleGeneration();
              }}
              className="p-1 rounded-lg hover:bg-rose-50 text-[#52525B] hover:text-rose-600 border border-[#1E1E24] transition-colors shrink-0 cursor-pointer"
              title="Hủy tiến trình AI"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Subtitles Overlay */}
        {videoSrc && <SubtitleOverlay />}

        {/* Floating indicator when Subtitles are disabled */}
        {videoSrc && !settings.showSubtitles && subtitles.length > 0 && (
          <div className="absolute top-4 right-4 z-30 animate-in fade-in duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSubtitles();
              }}
              className="px-3 py-1.5 rounded-full bg-[#FFFDF9] hover:bg-[#FCE7F3] text-[#BE185D] border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] flex items-center gap-1.5 text-xs font-mono font-bold transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
              title="Bấm để bật lại phụ đề (Phím C)"
            >
              <EyeOff className="w-3.5 h-3.5 text-[#BE185D]" />
              <span>Phụ đề tắt (Bấm C)</span>
            </button>
          </div>
        )}

        {/* 1-Click Dictionary Popup Card */}
        {videoSrc && <DictionaryPopup />}

        {/* Shadowing Practice Floating Panel */}
        {videoSrc && <ShadowingPanel />}

        {/* Bottom Floating Control Island (Auto-hiding, only when video is loaded) */}
        {videoSrc && (
          <div
            className={`absolute bottom-3 left-0 right-0 z-40 transition-all duration-300 transform ${
              controlsVisible
                ? 'translate-y-0 opacity-100 pointer-events-auto'
                : 'translate-y-4 opacity-0 pointer-events-none'
            }`}
          >
            <FloatingControlBar />
          </div>
        )}
      </div>
    </FileDropzone>
  );
};

export default VideoPlayer;
