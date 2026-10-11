import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatters';
import { loadCachedWaveform, saveCachedWaveform } from '../security/storageClient';

export const AudioWaveformTimeline: React.FC = () => {
  const {
    videoFileName,
    currentTime,
    duration,
    seek,
    abRepeat,
    subtitles
  } = usePlayer();

  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);
  const [hoverPercent, setHoverPercent] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPercent, setDragPercent] = useState<number | null>(null);
  const [cachedPeaks, setCachedPeaks] = useState<number[] | null>(null);
  const seekRafRef = useRef<number | null>(null);

  const cacheKey = useMemo(() => {
    if (!videoFileName) return '';
    return `${videoFileName}_${Math.round(duration)}`;
  }, [videoFileName, duration]);

  useEffect(() => {
    let isCancelled = false;
    if (!cacheKey) {
      setCachedPeaks(null);
      return;
    }

    loadCachedWaveform(cacheKey).then(peaks => {
      if (!isCancelled && peaks && peaks.length > 0) {
        setCachedPeaks(peaks);
      } else {
        setCachedPeaks(null);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [cacheKey]);

  const effectiveDuration = useMemo(() => {
    if (duration > 0 && isFinite(duration)) return duration;
    if (subtitles.length > 0) {
      const lastCue = subtitles[subtitles.length - 1];
      if (lastCue && lastCue.endTime > 0) return lastCue.endTime + 1;
    }
    return 0;
  }, [duration, subtitles]);

  const waveformPeaks = useMemo(() => {
    if (cachedPeaks && cachedPeaks.length > 0) {
      return cachedPeaks;
    }

    const barsCount = 96;
    const peaks: number[] = [];
    const dur = effectiveDuration > 0 ? effectiveDuration : 30;

    for (let i = 0; i < barsCount; i++) {
      const barTime = (i / barsCount) * dur;
      const hasSpeech = subtitles.some(
        s => barTime >= s.startTime - 0.2 && barTime <= s.endTime + 0.2
      );
      if (hasSpeech) {
        const variation = 0.45 + Math.sin(i * 0.4) * 0.25 + Math.cos(i * 1.2) * 0.2 + (i % 2) * 0.1;
        peaks.push(Math.min(1, Math.max(0.35, variation)));
      } else {
        peaks.push(0.12 + Math.sin(i * 0.5) * 0.05 + (i % 2) * 0.05);
      }
    }

    if (cacheKey && (subtitles.length > 0 || effectiveDuration > 0)) {
      saveCachedWaveform(cacheKey, peaks).catch(() => {});
    }

    return peaks;
  }, [effectiveDuration, subtitles, cachedPeaks, cacheKey]);

  // Current visual percent (fluid during dragging)
  const currentPercent = effectiveDuration > 0 ? Math.min(100, Math.max(0, (currentTime / effectiveDuration) * 100)) : 0;
  const displayPercent = isDragging && dragPercent !== null ? dragPercent : currentPercent;

  const aPercent = abRepeat.pointA !== null && effectiveDuration > 0 ? (abRepeat.pointA / effectiveDuration) * 100 : null;
  const bPercent = abRepeat.pointB !== null && effectiveDuration > 0 ? (abRepeat.pointB / effectiveDuration) * 100 : null;

  // Find nearby subtitle cue for rich tooltip preview
  const activeCue = useMemo(() => {
    if (hoverTime === null || effectiveDuration <= 0) return null;
    return subtitles.find(s => hoverTime >= s.startTime && hoverTime <= s.endTime) || null;
  }, [hoverTime, subtitles, effectiveDuration]);

  // Calculate percentage from clientX
  const calcPercent = useCallback((clientX: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    return (offsetX / rect.width) * 100;
  }, []);

  const performSeek = useCallback((pct: number) => {
    const dur = effectiveDuration > 0 ? effectiveDuration : duration;
    if (dur <= 0) return;
    const targetTime = (pct / 100) * dur;
    seek(targetTime);
  }, [effectiveDuration, duration, seek]);

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const activeDur = effectiveDuration > 0 ? effectiveDuration : duration;
    if (activeDur <= 0) return;

    e.preventDefault();
    setIsDragging(true);
    const pct = calcPercent(e.clientX);
    setDragPercent(pct);
    performSeek(pct);

    let lastSeekTime = Date.now();
    let throttledPct: number | null = null;
    let throttleTimer: any = null;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newPct = calcPercent(moveEvent.clientX);
      setDragPercent(newPct);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setHoverX(Math.max(0, Math.min(rect.width, moveEvent.clientX - rect.left)));
      }
      setHoverPercent(newPct);
      if (activeDur > 0) {
        setHoverTime((newPct / 100) * activeDur);
      }

      // Throttle seeking during drag to ~80ms to avoid overwhelming video decoder
      throttledPct = newPct;
      const now = Date.now();
      if (now - lastSeekTime >= 80) {
        lastSeekTime = now;
        performSeek(newPct);
      } else if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          throttleTimer = null;
          if (throttledPct !== null) {
            lastSeekTime = Date.now();
            performSeek(throttledPct);
          }
        }, 80);
      }
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (throttleTimer) {
        clearTimeout(throttleTimer);
        throttleTimer = null;
      }
      const finalPct = calcPercent(upEvent.clientX);
      setIsDragging(false);
      setDragPercent(null);
      performSeek(finalPct);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const activeDur = effectiveDuration > 0 ? effectiveDuration : duration;
    if (!containerRef.current || activeDur <= 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const pct = (offsetX / rect.width) * 100;
    setHoverTime((pct / 100) * activeDur);
    setHoverX(offsetX);
    setHoverPercent(pct);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsHovering(false);
      setHoverTime(null);
    }
  };

  return (
    <div
      className="relative w-full py-2 cursor-pointer select-none group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
    >
      {/* Floating Tooltip */}
      {(isHovering || isDragging) && hoverTime !== null && (
        <div
          className="absolute -top-9 z-40 pointer-events-none transform -translate-x-1/2 flex flex-col items-center transition-all duration-75"
          style={{
            left: `${Math.max(28, Math.min(containerRef.current?.clientWidth ? containerRef.current.clientWidth - 28 : 0, hoverX))}px`
          }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1E1E24] text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-white/10 text-xs font-mono font-bold whitespace-nowrap">
            <span>{formatTime(hoverTime)}</span>
            {activeCue && (
              <span className="max-w-[160px] truncate text-xs font-sans font-medium text-pink-300 pl-1.5 border-l border-white/20">
                {activeCue.textEn}
              </span>
            )}
          </div>
          <div className="w-2 h-1 bg-[#1E1E24] -mt-[1px] rotate-180" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        </div>
      )}

      {/* Main Track Container: Compact, sleek pill geometry */}
      <div
        ref={containerRef}
        className="relative w-full h-4 sm:h-5 rounded-full bg-[#FAF7F2] border border-[#1E1E24]/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] group-hover:border-[#1E1E24]/40 transition-colors"
      >
        {/* Waveform & Background Fill Layer (Clipped cleanly to track border-radius) */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none flex items-center">
          {/* Subtitle Cue Regions (Delicate subtle tint) */}
          {subtitles.map(cue => {
            const trackDur = effectiveDuration > 0 ? effectiveDuration : duration;
            if (trackDur <= 0) return null;
            const startPct = (cue.startTime / trackDur) * 100;
            const widthPct = Math.max(0.3, ((cue.endTime - cue.startTime) / trackDur) * 100);
            return (
              <div
                key={cue.id}
                className="absolute top-0 bottom-0 bg-[#BE185D]/8 pointer-events-none"
                style={{ left: `${startPct}%`, width: `${widthPct}%` }}
              />
            );
          })}

          {/* Waveform Micro-Bars */}
          <div className="w-full h-full flex items-center justify-between gap-[1.5px] px-1.5 z-10">
            {waveformPeaks.map((peak, idx) => {
              const barPct = (idx / waveformPeaks.length) * 100;
              const isPlayed = barPct <= displayPercent;
              const isInAB =
                aPercent !== null &&
                bPercent !== null &&
                barPct >= aPercent &&
                barPct <= bPercent;

              return (
                <div
                  key={idx}
                  className={`w-[1.5px] sm:w-[2px] rounded-full transition-colors duration-100 ${
                    isInAB
                      ? 'bg-amber-500'
                      : isPlayed
                      ? 'bg-[#BE185D]'
                      : 'bg-[#1E1E24]/20'
                  }`}
                  style={{
                    height: `${Math.max(16, peak * 85)}%`
                  }}
                />
              );
            })}
          </div>

          {/* Played Progress Tint Fill */}
          <div
            className={`absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#F472B6]/25 to-[#BE185D]/25 pointer-events-none ${
              isDragging ? 'transition-none' : 'transition-[width] duration-100 ease-out'
            }`}
            style={{ width: `${displayPercent}%` }}
          />

          {/* A-B Highlight Overlay Band */}
          {aPercent !== null && (
            <div
              className="absolute top-0 bottom-0 bg-amber-400/25 border-x-2 border-amber-500 pointer-events-none z-20"
              style={{
                left: `${aPercent}%`,
                width: `${Math.max(0, (bPercent ?? displayPercent) - aPercent)}%`
              }}
            />
          )}

          {/* Ghost Cursor Hover Line */}
          {isHovering && !isDragging && (
            <div
              className="absolute top-0 bottom-0 w-[1.5px] bg-[#1E1E24]/30 pointer-events-none z-20"
              style={{ left: `${hoverPercent}%` }}
            />
          )}
        </div>

        {/* Subtitle Cue Markers (Delicate mini dots along bottom edge) */}
        <div className="absolute inset-x-0 -bottom-1 pointer-events-none">
          {subtitles.map(cue => {
            const trackDur = effectiveDuration > 0 ? effectiveDuration : duration;
            if (trackDur <= 0) return null;
            const startPct = (cue.startTime / trackDur) * 100;
            return (
              <div
                key={cue.id}
                className="absolute w-1 h-1 rounded-full bg-[#BE185D]/40 group-hover:bg-[#BE185D]/70 transition-colors"
                style={{ left: `${startPct}%`, transform: 'translateX(-50%)' }}
              />
            );
          })}
        </div>

        {/* Playhead Overlay Layer (OVERFLOW VISIBLE - The pearl thumb is NEVER clipped!) */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {/* A-B Marker Badges */}
          {aPercent !== null && (
            <div
              className="absolute -top-3 transform -translate-x-1/2 z-30 pointer-events-none"
              style={{ left: `${aPercent}%` }}
            >
              <span className="text-xs font-black leading-none text-white bg-amber-600 px-1 py-0.5 rounded shadow-sm">
                A
              </span>
            </div>
          )}
          {bPercent !== null && (
            <div
              className="absolute -top-3 transform -translate-x-1/2 z-30 pointer-events-none"
              style={{ left: `${bPercent}%` }}
            >
              <span className="text-xs font-black leading-none text-white bg-amber-600 px-1 py-0.5 rounded shadow-sm">
                B
              </span>
            </div>
          )}

          {/* Refined Glowing Scrubber Pearl / Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 flex items-center justify-center ${
              isDragging ? 'transition-none' : 'transition-[left] duration-100 ease-out'
            }`}
            style={{ left: `${displayPercent}%` }}
          >
            <div
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#BE185D] ring-2 ring-white shadow-[0_2px_6px_rgba(0,0,0,0.3)] flex items-center justify-center transition-transform duration-150 ${
                isDragging ? 'scale-125' : 'group-hover:scale-110'
              }`}
            >
              <div className="w-1 h-1 rounded-full bg-white/90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioWaveformTimeline;
