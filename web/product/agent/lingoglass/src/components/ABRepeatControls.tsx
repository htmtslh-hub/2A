import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatDetailedTime } from '../utils/formatters';
import { Repeat, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

export const ABRepeatControls: React.FC = () => {
  const {
    abRepeat,
    setPointA,
    setPointB,
    clearABRepeat,
    adjustPointA,
    adjustPointB,
    snapABToCurrentSentence,
    setMaxLoops
  } = usePlayer();

  return (
    <div className="flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] text-xs text-[#1E1E24]">
      {/* Snap to Sentence quick action */}
      <button
        onClick={snapABToCurrentSentence}
        className="px-2.5 py-1 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#BE185D] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] font-bold flex items-center gap-1.5 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
        title="Lặp lại câu hiện tại (Phím R)"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#BE185D]" />
        <span>Lặp câu (R)</span>
      </button>

      <div className="h-4 w-[1.5px] bg-[#1E1E24]/20 mx-0.5 hidden sm:block" />

      {/* Point A Controls */}
      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24]">
        <button
          onClick={() => setPointA()}
          className={`font-mono font-bold px-1.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
            abRepeat.pointA !== null
              ? 'bg-[#FEF3C7] text-[#B45309]'
              : 'text-[#1E1E24] hover:bg-[#FAF7F2]'
          }`}
          title="Đặt mốc A (Phím A)"
        >
          [A]
        </button>
        <span className="font-mono text-xs font-bold text-[#1E1E24] min-w-[48px] text-center">
          {abRepeat.pointA !== null ? formatDetailedTime(abRepeat.pointA) : '--:--'}
        </span>
        {abRepeat.pointA !== null && (
          <div className="flex items-center">
            <button
              onClick={() => adjustPointA(-0.2)}
              className="p-0.5 hover:text-[#BE185D] rounded cursor-pointer"
              title="Lùi mốc A -0.2s"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => adjustPointA(0.2)}
              className="p-0.5 hover:text-[#BE185D] rounded cursor-pointer"
              title="Tiến mốc A +0.2s"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Point B Controls */}
      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24]">
        <button
          onClick={() => setPointB()}
          className={`font-mono font-bold px-1.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
            abRepeat.pointB !== null
              ? 'bg-[#FEF3C7] text-[#B45309]'
              : 'text-[#1E1E24] hover:bg-[#FAF7F2]'
          }`}
          title="Đặt mốc B (Phím B)"
        >
          [B]
        </button>
        <span className="font-mono text-xs font-bold text-[#1E1E24] min-w-[48px] text-center">
          {abRepeat.pointB !== null ? formatDetailedTime(abRepeat.pointB) : '--:--'}
        </span>
        {abRepeat.pointB !== null && (
          <div className="flex items-center">
            <button
              onClick={() => adjustPointB(-0.2)}
              className="p-0.5 hover:text-[#BE185D] rounded cursor-pointer"
              title="Lùi mốc B -0.2s"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => adjustPointB(0.2)}
              className="p-0.5 hover:text-[#BE185D] rounded cursor-pointer"
              title="Tiến mốc B +0.2s"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Loop Count Selector */}
      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24]">
        <span className="text-[11px] font-bold text-[#71717A]">Lặp:</span>
        {[0, 3, 5].map(loop => (
          <button
            key={loop}
            onClick={() => setMaxLoops(loop)}
            className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
              abRepeat.maxLoops === loop
                ? 'bg-[#1E1E24] text-white'
                : 'text-[#1E1E24] hover:bg-[#FAF7F2]'
            }`}
            title={loop === 0 ? "Lặp vô hạn" : `Lặp ${loop} lần`}
          >
            {loop === 0 ? '∞' : `${loop}x`}
          </button>
        ))}
      </div>

      {/* Clear Button */}
      {(abRepeat.pointA !== null || abRepeat.pointB !== null) && (
        <button
          onClick={clearABRepeat}
          className="p-1 rounded-full bg-white hover:bg-rose-50 text-rose-600 border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] transition-all ml-auto cursor-pointer"
          title="Hủy lặp A-B (Phím Esc)"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default ABRepeatControls;
