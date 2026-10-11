import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { UploadCloud } from 'lucide-react';

export const FileDropzone: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loadVideoFile, loadSubtitleFile } = usePlayer();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const mediaExts = ['mp4', 'mkv', 'webm', 'mov', 'avi', 'mp3', 'm4a', 'aac', 'flac', 'wav', 'ogg', 'opus'];
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (mediaExts.includes(ext || '')) {
        loadVideoFile(file);
      } else if (['srt', 'vtt', 'ass', 'ssa', 'lrc', 'txt'].includes(ext || '')) {
        loadSubtitleFile(file);
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full h-full"
    >
      {children}

      {/* Drag & Drop Visual Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-[#FCEFEF]/95 backdrop-blur-md border-3 border-dashed border-[#BE185D] rounded-3xl flex flex-col items-center justify-center pointer-events-none animate-fade-in shadow-[8px_8px_0px_#1E1E24]">
          <div className="w-16 h-16 rounded-2xl bg-[#FCE7F3] border-2 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24] text-[#BE185D] mb-4 flex items-center justify-center animate-bounce">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-base font-extrabold text-[#1E1E24] mb-1 tracking-wide">
            Thả video, nhạc hoặc file phụ đề vào đây
          </h3>
          <p className="text-xs font-semibold text-[#1E1E24]/60">
            Hỗ trợ MP4, MKV, WebM, MP3, M4A, FLAC, SRT, VTT, LRC
          </p>
        </div>
      )}
    </div>
  );
};
