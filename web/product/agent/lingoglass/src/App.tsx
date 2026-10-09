import React from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { TitleBar } from './components/TitleBar';
import { VideoPlayer } from './components/VideoPlayer';
import { SubtitleSidebar } from './components/SubtitleSidebar';
import { ShortcutsModal } from './components/ShortcutsModal';

export const AppContent: React.FC = () => {
  const { isSidebarOpen, settings } = usePlayer();

  return (
    <div
      data-theme={settings.theme || 'pink'}
      className="flex h-screen w-screen bg-[#FAF7F2] overflow-hidden select-none font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200"
    >
      {/* Main Full-Bleed Application Viewport */}
      <div className="flex-1 flex flex-col h-full w-full bg-[#FAF7F2] overflow-hidden relative transition-colors duration-200">
        {/* 1. Retro Window Header */}
        <TitleBar />

        {/* 2. Main Viewport & Video / Audio Player */}
        <main className="flex-1 relative overflow-hidden flex flex-row min-h-0">
          <div className="flex-1 min-w-0 h-full relative flex flex-col">
            <VideoPlayer />
          </div>
          {isSidebarOpen && <SubtitleSidebar />}
        </main>
      </div>

      {/* 3. Keyboard Shortcuts Modal */}
      <ShortcutsModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
};

export default App;
