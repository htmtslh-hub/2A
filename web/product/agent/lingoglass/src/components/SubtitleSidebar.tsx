import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatters';
import { speakEnglish } from '../utils/dictionary';
import { getCueSourceText, getCueTargetText } from '../types/subtitle';
import { SUPPORTED_TARGET_LANGUAGES } from '../types/translation';
import { testTranslationConnection } from '../utils/translationService';
import {
  X,
  FileText,
  BookMarked,
  Search,
  Volume2,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Languages,
  ScrollText,
  Sparkles,
  Play,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Keyboard,
  Subtitles,
  Heart,
  Palette
} from 'lucide-react';

export const SubtitleSidebar: React.FC = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    activeTab,
    setActiveTab,
    subtitles,
    currentCue,
    jumpToCue,
    clearSubtitles,
    loadDemoSubtitles,
    loadSubtitleFile,
    isAudioOnly,
    savedWords,
    removeSavedWord,
    saveWord,
    importVocabularyBackup,
    settings,
    updateSettings,
    toggleSubtitles,
    subtitleOffset,
    adjustSubtitleOffset,
    resetSubtitleOffset,
    languagePair,
    setLanguagePair,
    translationConfig,
    translationProgress,
    updateTranslationConfig,
    translateAllSubtitles,
    translateSingleCue,
    cancelTranslation,
    exportTranslatedSRT,
    setShowShortcuts,
    gpuStatus,
    aiSubtitleProgress,
    generateSubtitlesWithGpu,
    cancelAiSubtitleGeneration
  } = usePlayer();

  const [searchQuery, setSearchQuery] = useState('');
  const [vocabSearch, setVocabSearch] = useState('');
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [testingConnection, setTestingConnection] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; sample?: string } | null>(null);
  const activeCueRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the active subtitle cue smoothly into view
  useEffect(() => {
    if (autoScroll && activeCueRef.current) {
      activeCueRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentCue?.id, autoScroll]);

  if (!isSidebarOpen) return null;

  const handleSubtitleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadSubtitleFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  const filteredSubtitles = subtitles.filter(cue => {
    const sText = getCueSourceText(cue, languagePair.sourceLanguage);
    const tText = getCueTargetText(cue, languagePair.targetLanguage) || '';
    return (
      sText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tText.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredVocab = savedWords.filter(word =>
    word.cleanWord.toLowerCase().includes(vocabSearch.toLowerCase()) ||
    word.meaning.toLowerCase().includes(vocabSearch.toLowerCase())
  );

  const exportWordsToCSV = () => {
    if (savedWords.length === 0) {
      alert('Sổ từ vựng đang trống!');
      return;
    }
    const header = 'Word,Phonetic,Part of Speech,Meaning,Example Context\n';
    const rows = savedWords.map(w =>
      `"${w.cleanWord}","${w.ipa || ''}","${w.type || ''}","${w.meaning.replace(/"/g, '""')}","${(w.contextSentence || '').replace(/"/g, '""')}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lingoglass_vocab_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportWordsToJSON = () => {
    if (savedWords.length === 0) {
      alert('Sổ từ vựng đang trống!');
      return;
    }
    const jsonStr = JSON.stringify(savedWords, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lingoglass_vocab_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importVocabularyBackup(content);
        if (res.success) {
          alert(`Đã khôi phục thành công ${res.count} từ vựng vào sổ tay!`);
        } else {
          alert(`Lỗi khôi phục: ${res.error || 'File không hợp lệ'}`);
        }
      }
    };
    reader.readAsText(e.target.files[0]);
    e.target.value = '';
  };

  return (
    <aside className="relative h-full w-80 sm:w-96 bg-[#FAF7F2] border-l-2 border-[#1E1E24] z-30 flex flex-col shadow-[-4px_0px_0px_#1E1E24] flex-shrink-0 select-none animate-in fade-in duration-200">
      {/* Sidebar Header Tabs (Deezer Retro Pop Aesthetic) */}
      <div className="flex items-center justify-between border-b-2 border-[#1E1E24] px-3.5 py-2.5 bg-[#FAF7F2]">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24]">
          <button
            onClick={() => setActiveTab('subtitles')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'subtitles'
                ? 'bg-[#1E1E24] text-white shadow-[1px_1px_0px_#1E1E24]'
                : 'text-[#52525B] hover:text-[#1E1E24]'
            }`}
          >
            <span>Kịch bản</span>
            {subtitles.length > 0 && <span className="ml-1 opacity-80 font-mono">({subtitles.length})</span>}
          </button>

          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'vocabulary'
                ? 'bg-[#1E1E24] text-white shadow-[1px_1px_0px_#1E1E24]'
                : 'text-[#52525B] hover:text-[#1E1E24]'
            }`}
          >
            <span>Sổ từ</span>
            {savedWords.length > 0 && <span className="ml-1 opacity-80 font-mono">({savedWords.length})</span>}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#1E1E24] text-white shadow-[1px_1px_0px_#1E1E24]'
                : 'text-[#52525B] hover:text-[#1E1E24]'
            }`}
          >
            <span>Cài đặt</span>
          </button>
        </div>

        <button
          onClick={toggleSidebar}
          className="retro-round-btn !w-7 !h-7"
          title="Đóng thanh bên"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tab 1: Subtitle Script List (The "Top canciones" list aesthetic) */}
      {activeTab === 'subtitles' && (
        <div className="flex-1 flex flex-col min-h-0 bg-[#FAF7F2]">
          {/* Subtitle Action Toolbar */}
          <div className="p-3 border-b border-[#1E1E24]/10 space-y-2.5">
            {/* Top Toolbar: Upload, Auto-scroll, Toggle, Clear */}
            <div className="flex items-center justify-between gap-1">
              <label
                className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#BE185D] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] flex items-center gap-1 cursor-pointer transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                title="Nạp file phụ đề (.srt, .vtt, .lrc)"
              >
                <Upload className="w-3 h-3" />
                <span>Nạp Sub</span>
                <input
                  type="file"
                  accept=".srt,.vtt,.lrc,.ass,.ssa,.txt"
                  onChange={handleSubtitleUpload}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setAutoScroll(!autoScroll)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] transition-all cursor-pointer ${
                    autoScroll
                      ? 'bg-[#1E1E24] text-white'
                      : 'bg-white text-[#71717A]'
                  }`}
                  title={autoScroll ? "Tự động cuộn theo phát: BẬT" : "Tự động cuộn theo phát: TẮT"}
                >
                  <ScrollText className="w-3 h-3" />
                  <span>Auto-cuộn</span>
                </button>

                <button
                  onClick={toggleSubtitles}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] transition-all cursor-pointer ${
                    settings.showSubtitles
                      ? 'bg-[#FCE7F3] text-[#BE185D]'
                      : 'bg-white text-[#71717A]'
                  }`}
                  title={settings.showSubtitles ? "Ẩn phụ đề trên màn hình (Phím C)" : "Hiện phụ đề trên màn hình (Phím C)"}
                >
                  <Subtitles className="w-3 h-3" />
                  <span>{settings.showSubtitles ? 'Hiện Sub' : 'Ẩn Sub'}</span>
                </button>

                {subtitles.length > 0 && (
                  <button
                    onClick={clearSubtitles}
                    className="retro-round-btn !w-7 !h-7 text-rose-600 hover:bg-rose-50"
                    title="Xóa phụ đề"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Subtitles */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm câu thoại trong bài..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[#1E1E24] placeholder-[#8E8E93] outline-none"
              />
            </div>

            {/* Auto-Translate Action Toolbar */}
            {subtitles.length > 0 && (
              aiSubtitleProgress.isGenerating ? (
                <div className="p-2.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1E1E24] truncate">
                      {aiSubtitleProgress.message || 'GPU đang nhận diện giọng nói...'}
                    </span>
                    <button
                      onClick={cancelAiSubtitleGeneration}
                      className="text-[10px] font-bold text-rose-600 px-2 py-0.5 rounded-full border border-[#1E1E24] bg-white hover:bg-rose-50"
                    >
                      Hủy
                    </button>
                  </div>
                  <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#1E1E24]">
                    <div
                      className="bg-[#BE185D] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(5, Math.min(100, aiSubtitleProgress.percent))}%` }}
                    />
                  </div>
                </div>
              ) : translationProgress.isTranslating ? (
                <div className="p-2.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#1E1E24]">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#BE185D]" />
                      <span>Đang dịch ({translationProgress.completedCues}/{translationProgress.totalCues})</span>
                    </div>
                    <button
                      onClick={cancelTranslation}
                      className="text-[10px] font-bold text-rose-600 px-2 py-0.5 rounded-full border border-[#1E1E24] bg-white hover:bg-rose-50"
                    >
                      Hủy
                    </button>
                  </div>
                  <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#1E1E24]">
                    <div
                      className="bg-[#BE185D] h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round(
                          (translationProgress.completedCues / Math.max(1, translationProgress.totalCues)) * 100
                        )}%`
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 pt-0.5">
                  <button
                    onClick={translateAllSubtitles}
                    className="flex-1 py-1.5 px-3 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[#BE185D] text-xs font-bold flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                    title="Dịch tự động toàn bộ phụ đề"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dịch Phụ Đề AI</span>
                  </button>

                  <button
                    onClick={exportTranslatedSRT}
                    className="px-2.5 py-1.5 rounded-full bg-white hover:bg-[#FAF7F2] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[#1E1E24] font-bold text-xs flex items-center gap-1 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    title="Xuất file phụ đề song ngữ (.srt)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono">.SRT</span>
                  </button>
                </div>
              )
            )}
          </div>

          {/* Subtitle List or Empty State */}
          {filteredSubtitles.length === 0 ? (
            subtitles.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#FCE7F3] border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] flex items-center justify-center mb-3 text-[#BE185D]">
                  <FileText className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-[#1E1E24] mb-3">
                  Chưa có kịch bản phụ đề
                </h4>

                <button
                  onClick={() => generateSubtitlesWithGpu()}
                  className="w-full max-w-xs px-4 py-2 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] text-[#BE185D] text-xs font-bold flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all mb-2 cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Tự tạo phụ đề bằng AI</span>
                </button>

                <label className="w-full max-w-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#FAF7F2] border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] text-[#1E1E24] text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all mb-2">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Nạp file (.srt / .vtt)</span>
                  <input
                    type="file"
                    accept=".srt,.vtt,.lrc,.ass,.ssa,.txt"
                    onChange={handleSubtitleUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={loadDemoSubtitles}
                  className="text-xs font-bold text-[#BE185D] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Xem kịch bản mẫu (Demo)</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-[#71717A] text-xs">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>Không tìm thấy câu thoại khớp với "{searchQuery}".</p>
              </div>
            )
          ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {filteredSubtitles.map((cue, idx) => {
                const isCurrent = currentCue?.id === cue.id;
                const sourceText = getCueSourceText(cue, languagePair.sourceLanguage);
                const targetText = getCueTargetText(cue, languagePair.targetLanguage);

                return (
                  <div
                    key={cue.id}
                    ref={isCurrent ? activeCueRef : null}
                    onClick={() => jumpToCue(cue)}
                    className={`p-3 rounded-xl border-[1.5px] border-[#1E1E24] text-xs cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-[#FDF2F8] shadow-[2.5px_2.5px_0px_#1E1E24] border-[#BE185D]'
                        : 'bg-white hover:bg-[#FAF7F2] shadow-[1.5px_1.5px_0px_#1E1E24]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A] mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-[#1E1E24] px-1.5 py-0.2 rounded bg-[#FAF7F2] border border-[#1E1E24]/30">
                          {idx + 1}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#BE185D] font-bold border border-[#1E1E24] flex items-center gap-1 animate-pulse">
                            <Play className="w-2.5 h-2.5 fill-[#BE185D]" />
                            <span>ĐANG PHÁT</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakEnglish(sourceText);
                          }}
                          className="p-1 hover:text-[#BE185D] rounded transition-colors"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <span className={`font-mono text-[10px] ${isCurrent ? 'text-[#BE185D] font-bold' : ''}`}>
                          {formatTime(cue.startTime)}
                        </span>
                      </div>
                    </div>

                    <p className="font-bold text-[#1E1E24] leading-relaxed">
                      {sourceText}
                    </p>

                    {targetText ? (
                      <p className="text-[11px] text-[#BE185D] font-medium mt-0.5">
                        {targetText}
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            translateSingleCue(cue.id);
                          }}
                          className="text-[10px] font-bold text-[#BE185D] px-2 py-0.5 rounded-full bg-[#FCE7F3] border border-[#1E1E24] hover:bg-[#FBCFE8]"
                        >
                          Dịch
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Vocabulary Book */}
      {activeTab === 'vocabulary' && (
        <div className="flex-1 flex flex-col min-h-0 bg-[#FAF7F2]">
          <div className="p-3 border-b border-[#1E1E24]/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E1E24]">
                Đã lưu <span className="text-[#BE185D]">{savedWords.length}</span> từ vựng
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={exportWordsToCSV}
                  className="px-2.5 py-1 rounded-full text-xs font-bold bg-white hover:bg-[#FAF7F2] text-[#1E1E24] border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center gap-1 cursor-pointer"
                  title="Xuất file CSV / Anki"
                >
                  <Download className="w-3 h-3" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={exportWordsToJSON}
                  className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#BE185D] border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center gap-1 cursor-pointer"
                  title="Sao lưu JSON"
                >
                  <Download className="w-3 h-3" />
                  <span>Backup</span>
                </button>
                <label className="px-2.5 py-1 rounded-full text-xs font-bold bg-white hover:bg-[#FAF7F2] text-[#1E1E24] border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center gap-1 cursor-pointer" title="Khôi phục JSON">
                  <Upload className="w-3 h-3" />
                  <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                </label>
              </div>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
              <input
                type="text"
                value={vocabSearch}
                onChange={e => setVocabSearch(e.target.value)}
                placeholder="Tìm từ trong sổ..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[#1E1E24] placeholder-[#8E8E93] outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            {filteredVocab.length === 0 ? (
              <div className="text-center py-12 text-[#71717A] text-xs">
                <BookMarked className="w-9 h-9 mx-auto mb-2 text-[#BE185D] opacity-40" />
                <p>{savedWords.length === 0 ? 'Chưa có từ vựng nào trong sổ.' : 'Không tìm thấy từ phù hợp.'}</p>
              </div>
            ) : (
              filteredVocab.map(word => (
                <div
                  key={word.cleanWord}
                  className="p-3 rounded-xl bg-white border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[#1E1E24] text-sm">
                        {word.cleanWord}
                      </span>
                      <button
                        onClick={() => speakEnglish(word.cleanWord)}
                        className="p-1 text-[#1E1E24] hover:text-[#BE185D] transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeSavedWord(word.cleanWord)}
                      className="p-1 text-[#8E8E93] hover:text-rose-600 rounded transition-colors"
                      title="Xóa từ này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-mono text-[#BE185D] bg-[#FCE7F3] border border-[#1E1E24]/20 px-1.5 py-0.5 rounded-md font-bold">
                      {word.ipa}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#1E1E24] bg-[#FAF7F2] border border-[#1E1E24]/20 px-1.5 py-0.5 rounded-md">
                      {word.type}
                    </span>
                  </div>

                  <p className="text-xs text-[#1E1E24] font-medium leading-relaxed">
                    {word.meaning}
                  </p>

                  {word.contextSentence && (
                    <p className="text-[11px] text-[#71717A] italic mt-1.5 pt-1.5 border-t border-[#1E1E24]/10">
                      "{word.contextSentence}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 space-y-3.5 text-xs text-[#1E1E24] bg-[#FAF7F2]">
          {/* Card 0: Chế độ màu chủ đề (Theme Selector) */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#BE185D]" />
                <span className="font-extrabold text-xs">Chủ đề màu ứng dụng</span>
              </div>
              <span className="text-[10px] font-bold text-[#BE185D] px-2 py-0.5 rounded-full bg-[#FCE7F3] border border-[#1E1E24]">
                {settings.theme === 'black'
                  ? 'Đen Stealth'
                  : settings.theme === 'white'
                  ? 'Trắng Clean'
                  : settings.theme === 'yellow-black'
                  ? 'Vàng Đen'
                  : 'Hồng Retro'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'pink', label: 'Hồng Retro', swatch: '#F472B6', desc: 'Deezer Pop' },
                { id: 'black', label: 'Đen Stealth', swatch: '#1E1E24', desc: 'Dark Mode' },
                { id: 'white', label: 'Trắng Clean', swatch: '#FFFFFF', desc: 'Minimalist' },
                { id: 'yellow-black', label: 'Vàng Đen', swatch: '#FACC15', desc: 'Bumblebee' }
              ].map(th => {
                const isActive = (settings.theme || 'pink') === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => updateSettings({ theme: th.id as any })}
                    className={`p-2 rounded-xl border-1.5 flex items-center gap-2 transition-all text-left cursor-pointer ${
                      isActive
                        ? 'border-[#1E1E24] bg-[#FCE7F3] shadow-[2px_2px_0px_#1E1E24]'
                        : 'border-[#1E1E24]/20 hover:border-[#1E1E24] bg-[#FAF7F2]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-[#1E1E24] shadow-xs shrink-0"
                      style={{ backgroundColor: th.swatch }}
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-black leading-tight truncate">{th.label}</div>
                      <div className="text-[9px] text-[#71717A] truncate">{th.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 1: Keyboard Shortcuts */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-[#BE185D]" />
              <span className="font-extrabold text-xs">Phím tắt nhanh</span>
            </div>
            <button
              onClick={() => setShowShortcuts(true)}
              className="px-3 py-1 rounded-full bg-[#1E1E24] text-white font-bold text-xs shadow-[1.5px_1.5px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              F1 Cài đặt
            </button>
          </div>

          {/* Card 2: Subtitle Sync Offset */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs">Khớp lệch phụ đề</span>
              <span className="font-mono text-[#BE185D] font-bold px-2 py-0.5 rounded-full bg-[#FCE7F3] border border-[#1E1E24] text-[10px]">
                {subtitleOffset > 0 ? `+${subtitleOffset}` : subtitleOffset}s
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1 pt-0.5">
              <button
                onClick={() => adjustSubtitleOffset(-0.5)}
                className="py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#FCE7F3] border border-[#1E1E24] text-[#1E1E24] font-mono text-[10px] font-bold cursor-pointer"
              >
                -0.5s
              </button>
              <button
                onClick={() => adjustSubtitleOffset(-0.1)}
                className="py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#FCE7F3] border border-[#1E1E24] text-[#1E1E24] font-mono text-[10px] font-bold cursor-pointer"
              >
                -0.1s
              </button>
              <button
                onClick={resetSubtitleOffset}
                className="py-1 rounded-lg bg-[#1E1E24] text-white border border-[#1E1E24] font-mono text-[10px] font-bold cursor-pointer"
              >
                0.0s
              </button>
              <button
                onClick={() => adjustSubtitleOffset(0.1)}
                className="py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#FCE7F3] border border-[#1E1E24] text-[#1E1E24] font-mono text-[10px] font-bold cursor-pointer"
              >
                +0.1s
              </button>
              <button
                onClick={() => adjustSubtitleOffset(0.5)}
                className="py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#FCE7F3] border border-[#1E1E24] text-[#1E1E24] font-mono text-[10px] font-bold cursor-pointer"
              >
                +0.5s
              </button>
            </div>
          </div>

          {/* Card 3: Subtitle Font Size */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs">Cỡ chữ phụ đề</span>
              <span className="font-mono text-[#BE185D] font-bold">{settings.subtitleFontSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="32"
              value={settings.subtitleFontSize}
              onChange={e => updateSettings({ subtitleFontSize: parseInt(e.target.value) })}
              className="w-full accent-[#1E1E24] h-1.5 bg-[#E4E4E7] rounded-full cursor-pointer"
            />
          </div>

          {/* Card 4: Subtitle Display Toggles */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-extrabold text-xs block">Hiển thị phụ đề</span>
                <span className="text-[10px] text-[#71717A]">Bật/tắt trên màn hình (Phím C)</span>
              </div>
              <div
                onClick={toggleSubtitles}
                className={`w-10 h-5 rounded-full p-0.5 border-[1.5px] border-[#1E1E24] transition-colors cursor-pointer flex items-center ${
                  settings.showSubtitles ? 'bg-[#F472B6]' : 'bg-[#E4E4E7]'
                }`}
                title={settings.showSubtitles ? "Ẩn phụ đề (Phím C)" : "Hiện phụ đề (Phím C)"}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white border border-[#1E1E24] shadow-sm transform transition-transform duration-150 ${
                    settings.showSubtitles ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1E1E24]/10">
              <span className="font-extrabold text-xs">Phụ đề song ngữ</span>
              <div
                onClick={() => updateSettings({ dualSubtitles: !settings.dualSubtitles })}
                className={`w-10 h-5 rounded-full p-0.5 border-[1.5px] border-[#1E1E24] transition-colors cursor-pointer flex items-center ${
                  settings.dualSubtitles ? 'bg-[#F472B6]' : 'bg-[#E4E4E7]'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white border border-[#1E1E24] shadow-sm transform transition-transform duration-150 ${
                    settings.dualSubtitles ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1E1E24]/10">
              <span className="font-extrabold text-xs">Làm mờ bản dịch</span>
              <div
                onClick={() => updateSettings({ blurVietnamese: !settings.blurVietnamese })}
                className={`w-10 h-5 rounded-full p-0.5 border-[1.5px] border-[#1E1E24] transition-colors cursor-pointer flex items-center ${
                  settings.blurVietnamese ? 'bg-[#FCD34D]' : 'bg-[#E4E4E7]'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white border border-[#1E1E24] shadow-sm transform transition-transform duration-150 ${
                    settings.blurVietnamese ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Card 5: Language Pair */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] space-y-2">
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              <Languages className="w-3.5 h-3.5 text-[#BE185D]" />
              <span>Cặp ngôn ngữ</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-[#71717A] block mb-1 font-bold">Học:</label>
                <select
                  value={languagePair.sourceLanguage}
                  onChange={e => setLanguagePair({ ...languagePair, sourceLanguage: e.target.value })}
                  className="w-full bg-[#FAF7F2] border-[1.5px] border-[#1E1E24] rounded-lg px-2 py-1 text-xs font-bold outline-none"
                >
                  <option value="en">English (Anh)</option>
                  <option value="ja">Japanese (Nhật)</option>
                  <option value="ko">Korean (Hàn)</option>
                  <option value="zh">Chinese (Trung)</option>
                  <option value="fr">French (Pháp)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] block mb-1 font-bold">Dịch:</label>
                <select
                  value={languagePair.targetLanguage}
                  onChange={e => {
                    const newTarget = e.target.value;
                    setLanguagePair({ ...languagePair, targetLanguage: newTarget });
                    updateTranslationConfig({ targetLanguage: newTarget });
                  }}
                  className="w-full bg-[#FAF7F2] border-[1.5px] border-[#1E1E24] rounded-lg px-2 py-1 text-xs font-bold outline-none"
                >
                  {SUPPORTED_TARGET_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Card 6: AI Engine Configuration */}
          <div className="p-3.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#BE185D]" />
                <span className="font-extrabold text-xs">Mô hình AI</span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#047857] font-bold border border-[#1E1E24]">
                {gpuStatus?.gpuName ? 'RTX 3060 CUDA' : 'AI READY'}
              </span>
            </div>

            <div>
              <label className="text-[10px] text-[#71717A] font-bold block mb-1">
                Bộ máy dịch thuật:
              </label>
              <select
                value={translationConfig.provider}
                onChange={e => updateTranslationConfig({ provider: e.target.value as any })}
                className="w-full bg-[#FAF7F2] border-[1.5px] border-[#1E1E24] rounded-lg px-2.5 py-1 text-xs font-bold outline-none"
              >
                <option value="local_gpu">Local GPU RTX 3060 (MarianMT Offline)</option>
                <option value="google">Google Dịch (Miễn phí)</option>
                <option value="deepseek">DeepSeek API</option>
                <option value="openai">OpenAI API</option>
                <option value="gemini">Google Gemini API</option>
                <option value="custom">Endpoint tùy chỉnh</option>
              </select>
            </div>

            {translationConfig.provider === 'local_gpu' && (
              <div className="space-y-2 pt-1 border-t border-[#1E1E24]/10">
                <div>
                  <label className="text-[10px] text-[#71717A] font-bold block mb-1">
                    Mô hình Whisper AI:
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['tiny', 'base', 'small'] as const).map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => updateTranslationConfig({ whisperModel: m })}
                        className={`py-1 rounded-lg text-xs font-mono font-bold border-[1.5px] border-[#1E1E24] transition-all cursor-pointer ${
                          (translationConfig.whisperModel || 'base') === m
                            ? 'bg-[#1E1E24] text-white shadow-[1px_1px_0px_#1E1E24]'
                            : 'bg-white text-[#1E1E24] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => generateSubtitlesWithGpu()}
                  disabled={aiSubtitleProgress.isGenerating}
                  className="w-full py-1.5 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#BE185D] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] font-bold text-xs flex items-center justify-center gap-1.5 mt-1 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Tạo lại phụ đề cho video hiện tại</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default SubtitleSidebar;
