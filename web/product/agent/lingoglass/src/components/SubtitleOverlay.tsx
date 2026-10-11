import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { getCueSourceText, getCueTargetText } from '../types/subtitle';
import { Repeat, Languages, EyeOff } from 'lucide-react';

export const SubtitleOverlay: React.FC = () => {
  const {
    currentCue,
    settings,
    languagePair,
    lookupWord,
    repeatCurrentCue,
    isAudioOnly,
    translateSingleCue,
    toggleSubtitles
  } = usePlayer();

  if (!settings.showSubtitles || !currentCue) {
    return null;
  }

  const sourceText = getCueSourceText(currentCue, languagePair.sourceLanguage);
  const targetText = getCueTargetText(currentCue, languagePair.targetLanguage);

  // Tokenize source text to allow 1-click word lookup
  const words = sourceText.split(/(\s+)/);

  return (
    <div className={`absolute left-1/2 -translate-x-1/2 max-w-4xl w-[92%] pointer-events-none flex flex-col items-center justify-center text-center z-30 transition-all duration-200 ${isAudioOnly ? 'bottom-52 sm:bottom-56' : 'bottom-52 sm:bottom-56'}`}>
      <div className="group relative inline-flex flex-col items-center px-6 py-3.5 rounded-2xl bg-[#FFFDF9]/95 backdrop-blur-md border-2 border-[#1E1E24] shadow-[4px_4px_0px_#1E1E24] pointer-events-auto">
        {/* Quick Hide Button on Subtitle Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSubtitles();
          }}
          className="absolute -top-3.5 left-4 opacity-0 group-hover:opacity-100 transition-all duration-150 px-2.5 py-0.5 rounded-full bg-white hover:bg-rose-50 text-[#1E1E24] hover:text-rose-600 border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[10px] font-mono font-bold flex items-center gap-1 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          title="Ẩn phụ đề (Phím C)"
        >
          <EyeOff className="w-3 h-3 text-rose-500" />
          <span>ẨN SUB (C)</span>
        </button>

        {/* Quick Repeat Button on Subtitle Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            repeatCurrentCue();
          }}
          className="absolute -top-3.5 right-4 opacity-0 group-hover:opacity-100 transition-all duration-150 px-2.5 py-0.5 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#BE185D] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[10px] font-mono font-bold flex items-center gap-1 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          title="Lặp lại câu này (Phím R)"
        >
          <Repeat className="w-3 h-3 text-[#BE185D]" />
          <span>LẶP CÂU (R)</span>
        </button>

        {/* Primary Learning Subtitle Line */}
        <div
          className="font-extrabold text-[#1E1E24] tracking-wide leading-relaxed"
          style={{ fontSize: `${settings.subtitleFontSize}px` }}
        >
          {words.map((chunk, index) => {
            if (/^\s+$/.test(chunk)) {
              return <span key={index}>{chunk}</span>;
            }
            return (
              <span
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  lookupWord(chunk, e.clientX, e.clientY);
                }}
                className="inline-block px-1.5 py-0.5 rounded-lg hover:bg-[#FCE7F3] hover:text-[#BE185D] cursor-pointer transition-all duration-150 active:scale-95"
                title="Bấm để tra từ điển"
              >
                {chunk}
              </span>
            );
          })}
        </div>

        {/* Secondary Translation Subtitle Line */}
        {settings.dualSubtitles && (
          targetText ? (
            <div className="mt-1">
              <span
                className={`text-sm md:text-base text-[#BE185D] font-semibold transition-all duration-200 ${
                  settings.blurVietnamese
                    ? 'blur-[4px] hover:blur-none select-none cursor-pointer px-3 py-0.5 rounded-lg bg-[#FAF7F2] border border-[#1E1E24]/20 text-[#52525B]'
                    : ''
                }`}
                title={settings.blurVietnamese ? "Rê chuột vào đây để hiển thị bản dịch" : ""}
              >
                {targetText}
              </span>
            </div>
          ) : (
            <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  translateSingleCue(currentCue.id);
                }}
                className="text-[11px] font-bold text-[#BE185D] hover:text-[#9D174D] px-2.5 py-0.5 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center gap-1 transition-all cursor-pointer"
                title="Dịch câu này bằng AI"
              >
                <Languages className="w-3 h-3 text-[#BE185D]" />
                <span>Dịch câu này (AI)</span>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SubtitleOverlay;
