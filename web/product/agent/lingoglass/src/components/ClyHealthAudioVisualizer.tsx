import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatters';
import { Disc3, Music, Sparkles, Heart } from 'lucide-react';

export const ClyHealthAudioVisualizer: React.FC = () => {
  const {
    currentTime,
    duration,
    isPlaying,
    togglePlay,
    videoFileName,
    currentCue,
    playbackRate,
    subtitles,
    shadowing,
    toggleShadowing
  } = usePlayer();

  const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
  const percent = Math.round(progress * 100);

  return (
    <div
      onClick={togglePlay}
      className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer select-none group pb-48 px-4"
    >
      {/* Main Retro Music Hub Card (Deezer / BTS Pop Aesthetic) */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Top Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] text-xs font-bold text-[#1E1E24]">
            <span className="w-2 h-2 rounded-full bg-[#BE185D] animate-pulse" />
            <span>PHÁT ÂM THANH</span>
            <span className="text-[#8E8E93]">•</span>
            <span className="text-[#BE185D]">{playbackRate}x</span>
          </div>
        </div>

        {/* Center Hero Card */}
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#1E1E24] shadow-[5px_5px_0px_#1E1E24] relative overflow-hidden transition-transform duration-200 group-hover:scale-[1.01]">
          {/* Vinyl Disc Centerpiece with Concentric Rings */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#FCE7F3] border-2 border-[#1E1E24] shadow-[4px_4px_0px_#1E1E24] flex items-center justify-center mb-4">
            {/* Concentric Vinyl Grooves */}
            <div className="absolute inset-3 rounded-full border border-[#1E1E24]/15 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-[#1E1E24]/15 pointer-events-none" />
            <div className="absolute inset-9 rounded-full border border-[#1E1E24]/20 pointer-events-none" />

            {/* Center Label Disc */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#BE185D] text-white border-2 border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] flex items-center justify-center ${
                isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
              }`}
            >
              <Music className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            {/* Subtle Cute Heart Badge */}
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] flex items-center justify-center text-[#BE185D]">
              <Heart className="w-4 h-4 fill-[#BE185D]" />
            </div>
          </div>

          {/* Track Title */}
          <div className="text-center max-w-[90%] mb-3">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1E24] tracking-tight truncate" title={videoFileName}>
              {videoFileName !== 'Chưa chọn media' ? videoFileName : 'LingoGlass Player'}
            </h3>
            <p className="text-xs text-[#71717A] font-semibold mt-0.5">
              {subtitles.length > 0 ? `${subtitles.length} câu thoại kịch bản` : 'Sẵn sàng học tập'}
            </p>
          </div>

          {/* Time & Progress Info */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono font-bold text-[#1E1E24]">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs text-[#8E8E93]">/</span>
            <span className="text-xs font-mono text-[#52525B]">
              {formatTime(duration)}
            </span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#BE185D] border border-[#1E1E24] ml-1">
              {percent}%
            </span>
          </div>

          {/* Frequency Dancing Rhythm Bars */}
          <div className="flex items-center gap-1.5 h-6">
            {[0.3, 0.7, 0.45, 0.9, 0.6, 0.85, 0.4, 0.75, 0.35, 0.65, 0.5].map((factor, idx) => (
              <div
                key={idx}
                className={`w-1.5 rounded-full bg-[#BE185D] transition-all duration-200 ${
                  isPlaying ? 'animate-pulse' : 'opacity-25'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(30, factor * 100)}%` : '25%',
                  animationDelay: `${idx * 0.12}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClyHealthAudioVisualizer;
