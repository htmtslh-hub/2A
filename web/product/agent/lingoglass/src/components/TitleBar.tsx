import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { AppTheme } from '../types/player';
import { fetchLicenseStatus, LicenseStatus } from '../security/licenseClient';
import {
  Sparkles,
  HelpCircle,
  Mic,
  BookOpen,
  Upload,
  Eye,
  EyeOff,
  RotateCcw,
  Subtitles,
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Minus,
  Square,
  Copy,
  X,
  Palette,
  Check
} from 'lucide-react';
import { LicenseModal } from './LicenseModal';
import { AppLogo } from './AppLogo';

const THEMES: { id: AppTheme; label: string; swatch: string; desc: string }[] = [
  { id: 'pink', label: 'Hồng Retro', swatch: '#F472B6', desc: 'Deezer Pop' },
  { id: 'black', label: 'Đen Stealth', swatch: '#1E1E24', desc: 'Dark Mode' },
  { id: 'white', label: 'Trắng Clean', swatch: '#FFFFFF', desc: 'Minimalist' },
  { id: 'yellow-black', label: 'Vàng Đen', swatch: '#FACC15', desc: 'Bumblebee' }
];

export const TitleBar: React.FC = () => {
  const {
    videoSrc,
    videoFileName,
    closeMedia,
    isAudioOnly,
    showShortcuts,
    setShowShortcuts,
    toggleSidebar,
    activeTab,
    setActiveTab,
    isSidebarOpen,
    shadowing,
    toggleShadowing,
    settings,
    updateSettings,
    toggleSubtitles,
    loadVideoFile,
    loadVideoFromPath,
    loadSubtitleFile,
    subtitleOffset,
    resetSubtitleOffset
  } = usePlayer();

  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus | null>(null);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const loadStatus = async () => {
    const res = await fetchLicenseStatus();
    setLicenseStatus(res);
  };

  useEffect(() => {
    loadStatus();
    if (window.electronAPI?.windowControls?.isMaximized) {
      window.electronAPI.windowControls.isMaximized().then(setIsMaximized);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    if (isThemeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeOpen]);

  const handleMinimize = () => {
    window.electronAPI?.windowControls?.minimize();
  };

  const handleToggleMaximize = async () => {
    if (window.electronAPI?.windowControls?.maximize) {
      await window.electronAPI.windowControls.maximize();
      const maximized = await window.electronAPI.windowControls.isMaximized();
      setIsMaximized(maximized);
    }
  };

  const handleClose = () => {
    window.electronAPI?.windowControls?.close();
  };

  const mediaInputRef = useRef<HTMLInputElement>(null);
  const subInputRef = useRef<HTMLInputElement>(null);

  const handleOpenMedia = async () => {
    if ((window as any).electronAPI?.openVideoDialog) {
      const selected = await (window as any).electronAPI.openVideoDialog();
      if (selected) {
        loadVideoFromPath(selected);
      }
    } else {
      mediaInputRef.current?.click();
    }
  };

  const handleOpenSub = async () => {
    if ((window as any).electronAPI?.openSubtitleDialog) {
      const selected = await (window as any).electronAPI.openSubtitleDialog();
      if (selected) {
        const mediaUrl = `media:///${selected.replace(/\\/g, '/')}`;
        fetch(mediaUrl)
          .then(r => r.text())
          .then(text => {
            const fakeFile = new File([text], selected.split(/[\\/]/).pop() || 'sub.srt');
            loadSubtitleFile(fakeFile);
          })
          .catch(err => {
            console.warn('Failed to load sub from path:', err);
          });
      }
    } else {
      subInputRef.current?.click();
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadVideoFile(e.target.files[0]);
    }
  };

  const handleSubUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadSubtitleFile(e.target.files[0]);
    }
  };

  return (
    <>
      <header
        onDoubleClick={handleToggleMaximize}
        className="h-12 w-full bg-[#FAF7F2] border-b-2 border-[#1E1E24] flex items-center justify-between px-3 sm:px-4 select-none z-40 relative app-drag"
      >
        {/* Left: Retro Brand Logo & Navigation */}
        <div className="flex items-center gap-3 app-no-drag">
          {/* Brand Logo & Cute Tag */}
          <div className="flex items-center gap-2">
            <AppLogo size={26} variant="lens" />
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#1E1E24]">
              LingoGlass
            </span>
            <button
              onClick={() => setIsLicenseModalOpen(true)}
              className="text-[10px] font-bold text-[#BE185D] px-2 py-0.5 rounded-full bg-[#FCE7F3] border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] cursor-pointer hover:bg-[#FBCFE8] transition-all"
              title="Thông tin bản quyền LingoGlass"
            >
              PRO ♡
            </button>
          </div>

          {/* Retro Nav Arrows */}
          <div className="hidden md:flex items-center gap-1 text-[#1E1E24] ml-1">
            <button className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center justify-center hover:bg-[#FCE7F3] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center justify-center hover:bg-[#FCE7F3] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle: Retro Search & Media Capsule */}
        <div className="flex items-center gap-2 max-w-[35%] sm:max-w-[42%] app-no-drag">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] text-xs">
            <Search className="w-3.5 h-3.5 text-[#1E1E24] shrink-0" />
            <span className="font-semibold text-[#1E1E24] truncate max-w-[180px]" title={videoFileName}>
              {videoFileName !== 'Chưa chọn media' ? videoFileName : 'Tìm kiếm / Sẵn sàng...'}
            </span>

            {/* Subtitle Offset Reset Chip */}
            {subtitleOffset !== 0 && (
              <button
                onClick={resetSubtitleOffset}
                className="flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border-[1px] border-[#1E1E24] hover:bg-[#FDE68A]"
                title="Đặt lại lệch phụ đề về 0.0s"
              >
                <span>{subtitleOffset > 0 ? `+${subtitleOffset}` : subtitleOffset}s</span>
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Retro Action Buttons */}
        <div className="flex items-center gap-1.5 app-no-drag">
          {/* 1. Mở Media (Soft Pink Hero Button) */}
          <button
            type="button"
            onClick={handleOpenMedia}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#BE185D] border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            title="Mở Video hoặc file Âm thanh"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mở Media</span>
            <input
              ref={mediaInputRef}
              type="file"
              accept="video/*,audio/*,.mkv,.mp4,.webm,.mov,.avi,.mp3,.m4a,.aac,.flac,.wav,.ogg,.opus"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </button>

          {/* 2. Nạp Sub */}
          <button
            type="button"
            onClick={handleOpenSub}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-white hover:bg-[#FAF7F2] text-[#1E1E24] border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            title="Nạp file phụ đề (.srt, .vtt, .lrc)"
          >
            <span className="text-[#BE185D] font-mono text-[11px]">CC</span>
            <span className="hidden sm:inline">Nạp Sub</span>
            <input
              ref={subInputRef}
              type="file"
              accept=".srt,.vtt,.lrc,.ass,.ssa,.txt"
              className="hidden"
              onChange={handleSubUpload}
            />
          </button>

          {/* 3. Bật/Tắt Phụ đề (Phím C) */}
          <button
            type="button"
            onClick={toggleSubtitles}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              settings.showSubtitles
                ? 'bg-[#FDF2F8] text-[#BE185D]'
                : 'bg-white text-[#71717A]'
            }`}
            title={settings.showSubtitles ? "Ẩn phụ đề (Phím C)" : "Hiện phụ đề (Phím C)"}
          >
            <Subtitles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Phụ đề</span>
            <span className={`w-1.5 h-1.5 rounded-full ${settings.showSubtitles ? 'bg-[#BE185D]' : 'bg-[#D4D4D8]'}`} />
          </button>

          {/* 4. Làm Mờ Dịch */}
          <button
            type="button"
            onClick={() => updateSettings({ blurVietnamese: !settings.blurVietnamese })}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              settings.blurVietnamese
                ? 'bg-[#FEF3C7] text-[#B45309]'
                : 'bg-white text-[#71717A]'
            }`}
            title={settings.blurVietnamese ? "Làm mờ dịch: BẬT" : "Làm mờ dịch: TẮT"}
          >
            {settings.blurVietnamese ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">Mờ Dịch</span>
          </button>

          {/* 5. Shadowing Switch */}
          <button
            type="button"
            onClick={toggleShadowing}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border-[1.5px] border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              shadowing.isEnabled
                ? 'bg-[#FFE4E6] text-[#BE123C]'
                : 'bg-white text-[#71717A]'
            }`}
            title="Luyện nói nhại Shadowing"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Shadowing</span>
          </button>

          {/* 6. Vocabulary Book */}
          <button
            type="button"
            onClick={() => {
              if (!isSidebarOpen) toggleSidebar();
              setActiveTab('vocabulary');
            }}
            className={`retro-round-btn !w-8 !h-8 ${
              isSidebarOpen && activeTab === 'vocabulary' ? 'bg-[#FCE7F3] text-[#BE185D]' : ''
            }`}
            title="Mở Sổ từ vựng"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          {/* 7. Help / Shortcuts F1 */}
          <button
            type="button"
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="retro-round-btn !w-8 !h-8"
            title="Phím tắt nhanh (F1)"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* 8. Theme Palette Selector */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              type="button"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-white hover:bg-[#FCE7F3] text-[#1E1E24] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              title="Đổi màu chủ đề (Hồng, Đen, Trắng, Vàng Đen)"
            >
              <Palette className="w-3.5 h-3.5 text-[#BE185D]" />
              <span className="hidden xl:inline text-[11px]">Chủ đề</span>
              <span
                className="w-2.5 h-2.5 rounded-full border border-[#1E1E24]"
                style={{
                  backgroundColor:
                    settings.theme === 'black'
                      ? '#1E1E24'
                      : settings.theme === 'white'
                      ? '#FFFFFF'
                      : settings.theme === 'yellow-black'
                      ? '#FACC15'
                      : '#F472B6'
                }}
              />
            </button>

            {/* Theme Dropdown Menu */}
            {isThemeOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#FFFDF9] border-2 border-[#1E1E24] shadow-[4px_4px_0px_#1E1E24] rounded-2xl p-2 z-50 animate-fade-in">
                <div className="text-[10px] font-black uppercase text-[#1E1E24]/60 px-2.5 py-1 tracking-wider">
                  Chọn màu chủ đề
                </div>
                <div className="space-y-1">
                  {THEMES.map(th => {
                    const isActive = (settings.theme || 'pink') === th.id;
                    return (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => {
                          updateSettings({ theme: th.id });
                          setIsThemeOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-[#FCE7F3] text-[#BE185D] border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24]'
                            : 'hover:bg-[#FAF7F2] text-[#1E1E24] border-[1.5px] border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-[#1E1E24] shadow-xs shrink-0"
                            style={{ backgroundColor: th.swatch }}
                          />
                          <div>
                            <div className="leading-tight">{th.label}</div>
                            <div className="text-[9px] text-[#71717A] font-normal">{th.desc}</div>
                          </div>
                        </div>
                        {isActive && <Check className="w-3.5 h-3.5 text-[#BE185D]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 9. Window Controls: 3 Retro Window Dots (Thay thế nút vuông bằng 3 chấm tròn retro) */}
          <div className="flex items-center gap-1.5 ml-1.5 pl-2 border-l-2 border-[#1E1E24]/20 group">
            {/* Dot 1: Yellow - Thu nhỏ (Minimize) */}
            <button
              type="button"
              onClick={handleMinimize}
              style={{ backgroundColor: 'var(--dot-min)' }}
              className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center justify-center cursor-pointer hover:scale-110 active:translate-x-[1px] active:translate-y-[1px] transition-all"
              title="Thu nhỏ cửa sổ"
            >
              <Minus className="w-2 h-2 text-[#1E1E24] opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            </button>

            {/* Dot 2: Mint/Green - Phóng to / Khôi phục (Maximize) */}
            <button
              type="button"
              onClick={handleToggleMaximize}
              style={{ backgroundColor: 'var(--dot-max)' }}
              className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center justify-center cursor-pointer hover:scale-110 active:translate-x-[1px] active:translate-y-[1px] transition-all"
              title={isMaximized ? "Khôi phục kích thước" : "Phóng to tối đa"}
            >
              <Square className="w-1.5 h-1.5 text-[#1E1E24] opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            </button>

            {/* Dot 3: Pink/Red - Đóng ứng dụng (Close) */}
            <button
              type="button"
              onClick={handleClose}
              style={{ backgroundColor: 'var(--dot-close)' }}
              className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] flex items-center justify-center cursor-pointer hover:scale-110 active:translate-x-[1px] active:translate-y-[1px] transition-all"
              title="Đóng ứng dụng"
            >
              <X className="w-2 h-2 text-[#1E1E24] opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            </button>
          </div>
        </div>
      </header>

      {/* License Modal */}
      <LicenseModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        onLicenseChanged={loadStatus}
      />
    </>
  );
};

export default TitleBar;
