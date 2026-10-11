import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatters';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Repeat,
  Subtitles,
  SkipBack,
  SkipForward,
  Settings,
  Sparkles
} from 'lucide-react';
import { AudioWaveformTimeline } from './AudioWaveformTimeline';
import { ABRepeatControls } from './ABRepeatControls';

export const FloatingControlBar: React.FC = () => {
  const {
    isPlaying,
    togglePlay,
    jump,
    currentTime,
    duration,
    playbackRate,
    setPlaybackRate,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    jumpToPrevCue,
    jumpToNextCue,
    settings,
    toggleSubtitles,
    shadowing,
    toggleShadowing,
    abRepeat,
    toggleSidebar,
    isSidebarOpen,
    setActiveTab
  } = usePlayer();

  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showABToolbar, setShowABToolbar] = useState(true);

  const speedOptions = [0.75, 0.85, 1.0, 1.25, 1.5];

  return (
    <div className="w-[96%] max-w-4xl mx-auto flex flex-col gap-2 p-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#1E1E24] shadow-[4px_4px_0px_#1E1E24] text-[#1E1E24] transition-all duration-300 pointer-events-auto select-none">
      {/* 1. Retro Audio Waveform Seekbar */}
      <AudioWaveformTimeline />

      {/* 2. Optional A-B Repeat Sub-toolbar */}
      {showABToolbar && (
        <div className="pt-0.5">
          <ABRepeatControls />
        </div>
      )}

      {/* 3. Main Bottom Control Row */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 pt-1">
        {/* Left: Time and Volume */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Time Display */}
          <div className="text-xs font-mono text-[#1E1E24] font-bold tracking-wider min-w-[85px]">
            <span>{formatTime(currentTime)}</span>
            <span className="text-[#8E8E93] mx-1">/</span>
            <span className="text-[#52525B]">{formatTime(duration)}</span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5 group relative">
            <button
              onClick={toggleMute}
              className="retro-round-btn !w-8 !h-8 text-[#1E1E24]"
              title="Bật/Tắt âm thanh (M)"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-600" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#1E1E24]" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-14 sm:w-20 h-1.5 bg-[#D4D4D8] rounded-full appearance-none cursor-pointer accent-[#1E1E24]"
              title={`Âm lượng: ${Math.round(volume * 100)}%`}
            />
          </div>
        </div>

        {/* Center: Playback & Jump Controls (Retro Centerpiece) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Jump to Previous Sentence */}
          <button
            onClick={jumpToPrevCue}
            className="retro-round-btn !w-8 !h-8 sm:!w-9 sm:!h-9"
            title="Câu thoại trước (↑)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Jump Backward 5s */}
          <button
            onClick={() => jump(-5)}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FCE7F3] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[#1E1E24] text-xs font-bold font-mono flex items-center gap-1 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            title="Lùi 5 giây (← hoặc J)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#BE185D]" />
            <span>-5s</span>
          </button>

          {/* Big Solid Play / Pause Centerpiece Button */}
          <button
            onClick={togglePlay}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1E1E24] text-white shadow-[2.5px_2.5px_0px_#1E1E24] hover:bg-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center cursor-pointer"
            title={isPlaying ? "Tạm dừng (Space)" : "Phát (Space)"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white text-white" />
            ) : (
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            )}
          </button>

          {/* Jump Forward 5s */}
          <button
            onClick={() => jump(5)}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FCE7F3] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[#1E1E24] text-xs font-bold font-mono flex items-center gap-1 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            title="Tiến 5 giây (→ hoặc L)"
          >
            <span>+5s</span>
            <RotateCw className="w-3.5 h-3.5 text-[#BE185D]" />
          </button>

          {/* Jump to Next Sentence */}
          <button
            onClick={jumpToNextCue}
            className="retro-round-btn !w-8 !h-8 sm:!w-9 sm:!h-9"
            title="Câu thoại sau (↓)"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Learning Tools & Settings */}
        <div className="flex items-center gap-1.5">
          {/* A-B Bar Toggle */}
          <button
            onClick={() => setShowABToolbar(!showABToolbar)}
            className={`retro-round-btn !w-8 !h-8 ${
              abRepeat.isActive || showABToolbar ? 'bg-[#FEF3C7] text-[#B45309]' : ''
            }`}
            title="Bật/Tắt thanh lặp đoạn A-B"
          >
            <Repeat className="w-4 h-4" />
          </button>

          {/* Playback Speed Popover */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FCE7F3] text-xs font-mono font-bold text-[#1E1E24] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] transition-all cursor-pointer"
              title="Tốc độ phát âm thanh"
            >
              {playbackRate}x
            </button>
            {showSpeedMenu && (
              <div className="absolute bottom-12 right-0 p-1.5 rounded-xl bg-[#FFFDF9] flex flex-col gap-1 w-24 border-2 border-[#1E1E24] z-50 shadow-[4px_4px_0px_#1E1E24]">
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackRate(speed);
                      setShowSpeedMenu(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold text-left transition-colors cursor-pointer ${
                      playbackRate === speed
                        ? 'bg-[#1E1E24] text-white'
                        : 'text-[#1E1E24] hover:bg-[#FCE7F3]'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Toggle Subtitles (C) */}
          <button
            onClick={toggleSubtitles}
            className={`retro-round-btn !w-8 !h-8 ${
              settings.showSubtitles ? 'bg-[#FCE7F3] text-[#BE185D]' : 'text-[#8E8E93]'
            }`}
            title={settings.showSubtitles ? "Ẩn phụ đề (Phím C)" : "Hiện phụ đề (Phím C)"}
          >
            <Subtitles className="w-4 h-4" />
          </button>

          {/* Toggle Shadowing */}
          <button
            onClick={toggleShadowing}
            className={`retro-round-btn !w-8 !h-8 ${
              shadowing.isEnabled ? 'bg-[#FFE4E6] text-[#BE123C]' : 'text-[#52525B] hover:text-[#1E1E24]'
            }`}
            title={shadowing.isEnabled ? "Tắt Luyện nói Shadowing" : "Bật Luyện nói Shadowing"}
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Settings Drawer Toggle */}
          <button
            onClick={() => {
              if (!isSidebarOpen) toggleSidebar();
              setActiveTab('settings');
            }}
            className="retro-round-btn !w-8 !h-8 text-[#52525B] hover:text-[#1E1E24]"
            title="Cài đặt học tập"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingControlBar;
