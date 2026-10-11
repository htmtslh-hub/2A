import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Volume2, Heart, X, Check } from 'lucide-react';
import { speakEnglish } from '../utils/dictionary';

export const DictionaryPopup: React.FC = () => {
  const {
    activeDictionaryWord,
    closeDictionary,
    savedWords,
    saveWord,
    removeSavedWord,
    currentCue
  } = usePlayer();

  if (!activeDictionaryWord) return null;

  const isSaved = savedWords.some(w => w.cleanWord === activeDictionaryWord.cleanWord);

  const handleToggleSave = () => {
    if (isSaved) {
      removeSavedWord(activeDictionaryWord.cleanWord);
    } else {
      saveWord(activeDictionaryWord, currentCue?.textEn || '');
    }
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(activeDictionaryWord.cleanWord);
  };

  return (
    <div
      className="fixed z-50 bottom-36 left-1/2 -translate-x-1/2 w-80 sm:w-96 bg-[#FFFDF9] border-2 border-[#1E1E24] shadow-[5px_5px_0px_#1E1E24] rounded-2xl p-4 animate-in fade-in duration-150 select-none text-[#1E1E24]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#1E1E24]/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-[#1E1E24] tracking-tight">
            {activeDictionaryWord.cleanWord}
          </span>
          <button
            onClick={handleSpeak}
            className="retro-round-btn !w-7 !h-7 text-[#BE185D]"
            title="Nghe phát âm chuẩn"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono font-bold text-[#71717A] px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#1E1E24]/20">
            {activeDictionaryWord.ipa}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Heart / Save Button */}
          <button
            onClick={handleToggleSave}
            className={`retro-round-btn !w-7 !h-7 ${
              isSaved ? 'bg-[#FCE7F3] text-[#BE185D]' : 'text-[#8E8E93]'
            }`}
            title={isSaved ? "Đã lưu (Bấm để xóa)" : "Lưu vào sổ từ vựng"}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#BE185D]' : ''}`} />
          </button>

          {/* Close Button */}
          <button
            onClick={closeDictionary}
            className="retro-round-btn !w-7 !h-7 text-[#1E1E24]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Body: Part of speech & meaning */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#BE185D] border border-[#1E1E24] tracking-wider shrink-0 mt-0.5">
            {activeDictionaryWord.type}
          </span>
          <p className="text-sm text-[#1E1E24] font-bold leading-relaxed">
            {activeDictionaryWord.meaning}
          </p>
        </div>

        {/* Example sentence */}
        {activeDictionaryWord.example && (
          <div className="text-xs text-[#52525B] italic bg-[#FAF7F2] rounded-xl p-2.5 border-[1.5px] border-[#1E1E24]/15">
            "{activeDictionaryWord.example}"
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-[#1E1E24]/10 flex items-center justify-between text-[11px] font-bold text-[#71717A]">
        <span>Từ điển tích hợp</span>
        {isSaved ? (
          <span className="text-[#047857] flex items-center gap-1">
            <Check className="w-3 h-3" /> Đã lưu vào sổ tay
          </span>
        ) : (
          <span className="text-[#BE185D]">Bấm ♡ để lưu vào sổ từ</span>
        )}
      </div>
    </div>
  );
};

export default DictionaryPopup;
