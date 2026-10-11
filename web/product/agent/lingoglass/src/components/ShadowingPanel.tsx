import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Mic, Square, Play, Volume2, ArrowRight, RefreshCw, X } from 'lucide-react';

export const ShadowingPanel: React.FC = () => {
  const {
    shadowing,
    toggleShadowing,
    currentCue,
    startRecording,
    stopRecording,
    clearRecording,
    togglePlay,
    repeatCurrentCue
  } = usePlayer();

  if (!shadowing.isEnabled) return null;

  return (
    <div className="absolute top-14 right-4 w-80 bg-[#FFFDF9] border-2 border-[#1E1E24] shadow-[5px_5px_0px_#1E1E24] rounded-2xl p-4 z-30 animate-in fade-in duration-150 select-none text-[#1E1E24]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#1E1E24]/10 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#FFE4E6] border border-[#1E1E24] flex items-center justify-center text-[#BE123C]">
            <Mic className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-extrabold text-[#1E1E24]">
            Luyện Nói Shadowing
          </h4>
        </div>

        <button
          onClick={toggleShadowing}
          className="retro-round-btn !w-6 !h-6"
          title="Đóng bảng luyện nói"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Auto-pause Countdown Status */}
      {shadowing.isPausedForUser ? (
        <div className="bg-[#FFE4E6] border-2 border-[#BE123C] rounded-xl p-3 text-center mb-3">
          <div className="text-2xl font-black text-[#BE123C] font-mono animate-pulse">
            {shadowing.remainingCountdown}s
          </div>
          <p className="text-xs text-[#BE123C] mt-1 font-bold">
            Nhại lại to rõ câu vừa nghe!
          </p>
        </div>
      ) : (
        <div className="bg-[#FAF7F2] border-[1.5px] border-[#1E1E24]/20 rounded-xl p-2.5 text-center mb-3">
          <span className="text-xs text-[#52525B] font-medium">
            Đang phát... App sẽ tự ngắt sau khi nhân vật nói xong.
          </span>
        </div>
      )}

      {/* Current sentence being shadowed */}
      {currentCue && (
        <div className="mb-3 p-2.5 rounded-xl bg-[#FAF7F2] border-[1.5px] border-[#1E1E24]/20 text-xs">
          <div className="text-[#71717A] text-[10px] mb-1 font-bold uppercase">Câu thoại mẫu:</div>
          <p className="text-[#1E1E24] font-bold italic">"{currentCue.textEn}"</p>
        </div>
      )}

      {/* Recording Tools */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {!shadowing.isRecording ? (
            <button
              onClick={startRecording}
              className="flex-1 py-2 rounded-full bg-[#BE123C] hover:bg-[#9F1239] text-white font-bold text-xs flex items-center justify-center gap-1.5 border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Ghi âm giọng của bạn</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex-1 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] animate-pulse transition-all cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>Dừng ghi âm</span>
            </button>
          )}

          <button
            onClick={repeatCurrentCue}
            className="retro-round-btn !w-9 !h-9 text-[#1E1E24]"
            title="Nghe lại câu thoại mẫu"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Playback recorded audio */}
        {shadowing.userRecordingUrl && (
          <div className="mt-1 p-2 rounded-xl bg-[#FAF7F2] border-[1.5px] border-[#1E1E24]/30 flex items-center justify-between">
            <span className="text-xs text-[#BE123C] font-bold flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              Giọng bạn vừa ghi
            </span>
            <div className="flex items-center gap-2">
              <audio src={shadowing.userRecordingUrl} controls className="h-6 w-36 accent-[#BE123C]" />
            </div>
          </div>
        )}
      </div>

      {/* Continue button if user is ready early */}
      {shadowing.isPausedForUser && (
        <button
          onClick={togglePlay}
          className="mt-3 w-full py-1.5 rounded-full bg-white hover:bg-[#FCE7F3] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-xs font-bold text-[#1E1E24] flex items-center justify-center gap-1 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          <span>Tiếp tục xem</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default ShadowingPanel;
