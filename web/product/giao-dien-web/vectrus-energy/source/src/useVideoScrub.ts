import { useEffect, useRef, useState } from 'react';
import * as MP4Box from 'mp4box';

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 60000;

interface FrameEntry {
  ts: number; // microseconds
  blob: Blob;
}

function clamp(min: number, max: number, v: number): number {
  return Math.max(min, Math.min(max, v));
}

function nearestIndex(bank: FrameEntry[], targetMicros: number): number {
  const n = bank.length;
  if (n === 0) return -1;
  let lo = 0;
  let hi = n - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (bank[mid].ts < targetMicros) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  if (lo > 0 && Math.abs(bank[lo - 1].ts - targetMicros) <= Math.abs(bank[lo].ts - targetMicros)) {
    return lo - 1;
  }
  return lo;
}

function extractDescription(mp4file: MP4Box.ISOFile, trackId: number): Uint8Array | undefined {
  const trak = mp4file.getTrackById(trackId);
  const entries = trak?.mdia?.minf?.stbl?.stsd?.entries;
  if (!entries || entries.length === 0) return undefined;
  for (const entry of entries) {
    const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
    if (box) {
      const stream = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
      box.write(stream);
      return new Uint8Array(stream.buffer, 8, Math.max(0, stream.position - 8));
    }
  }
  return undefined;
}

export function useVideoScrub(videoSrc: string) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canvasLive, setCanvasLive] = useState<boolean>(false);

  const stateRef = useRef<{
    bank: FrameEntry[];
    lru: Map<number, ImageBitmap | null>;
    current: number;
    target: number;
    ready: boolean;
    reverted: boolean;
    painted: boolean;
    building: boolean;
    dur: number;
    span: number;
    lastProgress: number;
  }>({
    bank: [],
    lru: new Map(),
    current: 0,
    target: 0,
    ready: false,
    reverted: false,
    painted: false,
    building: false,
    dur: 0,
    span: 1,
    lastProgress: -1,
  });

  useEffect(() => {
    const st = stateRef.current;
    const video = videoRef.current;
    let cancelled = false;

    const updateSpan = () => {
      const container = containerRef.current;
      if (!container) return;
      st.span = Math.max(1, container.offsetHeight - window.innerHeight);
    };

    const getProgress = () => {
      if (st.span <= 1) updateSpan();
      return clamp(0, 1, window.scrollY / st.span);
    };

    const onLoadedMetadata = () => {
      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        st.dur = video.duration;
      }
    };

    if (video) {
      if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
        st.dur = video.duration;
      }
      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('durationchange', onLoadedMetadata);
    }

    window.addEventListener('resize', updateSpan, { passive: true });
    window.addEventListener('orientationchange', updateSpan, { passive: true });
    updateSpan();

    const evictIfNeeded = () => {
      while (st.lru.size > LRU_MAX) {
        const oldestKey = st.lru.keys().next().value;
        if (oldestKey === undefined) break;
        const bmp = st.lru.get(oldestKey);
        st.lru.delete(oldestKey);
        if (bmp) {
          try {
            bmp.close();
          } catch {}
        }
      }
    };

    const warmLRU = (centerIdx: number) => {
      const n = st.bank.length;
      if (n === 0) return;
      const start = Math.max(0, centerIdx - 1);
      const end = Math.min(n - 1, centerIdx + 2);
      for (let idx = start; idx <= end; idx++) {
        if (st.lru.has(idx)) {
          // Refresh key order
          const existing = st.lru.get(idx) ?? null;
          st.lru.delete(idx);
          st.lru.set(idx, existing);
          continue;
        }
        st.lru.set(idx, null);
        evictIfNeeded();
        const blob = st.bank[idx].blob;
        createImageBitmap(blob)
          .then((bmp) => {
            if (cancelled || st.reverted || !st.lru.has(idx)) {
              bmp.close();
              return;
            }
            st.lru.delete(idx);
            st.lru.set(idx, bmp);
            evictIfNeeded();
          })
          .catch(() => {
            st.lru.delete(idx);
          });
      }
    };

    const drawNearestFrame = (timeSec: number) => {
      const canvas = canvasRef.current;
      if (!canvas || st.bank.length === 0) return;
      const idx = nearestIndex(st.bank, timeSec * 1e6);
      if (idx < 0) return;
      warmLRU(idx);
      let bmp = st.lru.get(idx) ?? null;
      if (!bmp) {
        for (let offset = 1; offset <= 3; offset++) {
          const prevBmp = st.lru.get(idx - offset);
          if (prevBmp) {
            bmp = prevBmp;
            break;
          }
          const nextBmp = st.lru.get(idx + offset);
          if (nextBmp) {
            bmp = nextBmp;
            break;
          }
        }
      }
      if (bmp) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
          if (!st.painted) {
            st.painted = true;
            setCanvasLive(true);
          }
        }
      }
    };

    // rAF loop
    let rafId = 0;
    let lastTime = performance.now();
    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min(0.1, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const p = getProgress();
      if (Math.abs(p - st.lastProgress) > 0.0005) {
        st.lastProgress = p;
        setScrollProgress(p);
      }

      if (st.dur > 0) {
        st.target = p * st.dur;
        if (mediaReduced.matches) {
          st.current = st.target;
        } else {
          st.current += (st.target - st.current) * (1 - Math.exp(-dt * LERP_TAU));
          if (Math.abs(st.target - st.current) < SNAP) {
            st.current = st.target;
          }
        }

        if (st.ready && !st.reverted) {
          drawNearestFrame(st.current);
        } else if (video && !video.seeking && Math.abs(video.currentTime - st.current) > 0.01) {
          try {
            video.currentTime = st.current;
          } catch {}
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    // Frame bank builder
    let watchdogTimer: number | null = null;

    const revertToFallback = () => {
      if (st.reverted) return;
      st.reverted = true;
      st.ready = false;
      setCanvasLive(false);
      for (const bmp of st.lru.values()) {
        if (bmp) {
          try {
            bmp.close();
          } catch {}
        }
      }
      st.lru.clear();
    };

    const buildFrameBank = async () => {
      if (cancelled || st.building || st.ready || st.reverted) return;
      if (mediaReduced.matches || typeof window.VideoDecoder === 'undefined') {
        return;
      }
      st.building = true;

      watchdogTimer = window.setTimeout(() => {
        if (!st.ready) {
          revertToFallback();
        }
      }, WATCHDOG);

      try {
        const res = await fetch(videoSrc, { mode: 'cors' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = (await res.arrayBuffer()) as MP4Box.MP4ArrayBuffer;
        if (cancelled || st.reverted) return;

        const samples: MP4Box.MP4Sample[] = [];
        let trackInfo: MP4Box.MP4VideoTrack | null = null;
        let description: Uint8Array | undefined;

        const mp4file = MP4Box.createFile();
        await new Promise<void>((resolve, reject) => {
          mp4file.onReady = (info) => {
            const vTrack = info.videoTracks?.[0];
            if (!vTrack) {
              reject(new Error('No video track'));
              return;
            }
            trackInfo = vTrack;
            if (vTrack.duration && vTrack.timescale) {
              st.dur = vTrack.duration / vTrack.timescale;
            }
            description = extractDescription(mp4file, vTrack.id);
            mp4file.setExtractionOptions(vTrack.id, null, { nbSamples: 2000 });
            mp4file.start();
          };
          mp4file.onSamples = (_id, _user, batch) => {
            samples.push(...batch);
            if (trackInfo && samples.length >= trackInfo.nb_samples) {
              resolve();
            }
          };
          mp4file.onError = (e) => reject(new Error(e));
          buffer.fileStart = 0;
          mp4file.appendBuffer(buffer);
          mp4file.flush();
          if (trackInfo && samples.length > 0) {
            resolve();
          }
        });

        if (!trackInfo || samples.length === 0 || cancelled || st.reverted) {
          revertToFallback();
          return;
        }

        const vTrack: MP4Box.MP4VideoTrack = trackInfo;
        const width = vTrack.video?.width || 1920;
        const height = vTrack.video?.height || 1080;
        const offscreen = document.createElement('canvas');
        offscreen.width = width;
        offscreen.height = height;
        const offCtx = offscreen.getContext('2d');
        if (!offCtx) {
          revertToFallback();
          return;
        }

        const runDecodePass = async (preferSoftware: boolean): Promise<FrameEntry[]> => {
          const decodedFrames: FrameEntry[] = [];
          let inFlightBlobs = 0;
          const pendingPromises: Promise<void>[] = [];

          const baseConfig: VideoDecoderConfig = {
            codec: vTrack.codec,
            codedWidth: width,
            codedHeight: height,
            hardwareAcceleration: preferSoftware ? 'prefer-software' : 'no-preference',
          };
          if (description) {
            baseConfig.description = description;
          }

          const support = await VideoDecoder.isConfigSupported(baseConfig);
          if (!support.supported) {
            throw new Error('Unsupported VideoDecoder config');
          }

          let decoderError: Error | null = null;
          const decoder = new VideoDecoder({
            output: (frame: VideoFrame) => {
              const ts = frame.timestamp;
              offCtx.drawImage(frame, 0, 0, width, height);
              frame.close();
              inFlightBlobs++;
              const p = new Promise<void>((resolveBlob) => {
                offscreen.toBlob(
                  (blob) => {
                    inFlightBlobs--;
                    if (blob && !cancelled && !st.reverted) {
                      decodedFrames.push({ ts, blob });
                    }
                    resolveBlob();
                  },
                  'image/webp',
                  0.82
                );
              });
              pendingPromises.push(p);
            },
            error: (err) => {
              decoderError = err instanceof Error ? err : new Error(String(err));
            },
          });

          decoder.configure(baseConfig);

          for (let i = 0; i < samples.length; i++) {
            if (cancelled || st.reverted || decoderError) break;
            while (
              (decoder.decodeQueueSize + inFlightBlobs >= LEAD) &&
              !cancelled &&
              !st.reverted &&
              !decoderError
            ) {
              await new Promise((r) => window.setTimeout(r, 4));
            }
            if (cancelled || st.reverted || decoderError) break;
            const s = samples[i];
            const chunk = new EncodedVideoChunk({
              type: s.is_sync ? 'key' : 'delta',
              timestamp: Math.round((s.cts * 1e6) / s.timescale),
              duration: Math.round((s.duration * 1e6) / s.timescale),
              data: s.data,
            });
            decoder.decode(chunk);
          }

          if (decoderError) {
            try {
              decoder.close();
            } catch {}
            throw decoderError;
          }

          await decoder.flush();
          decoder.close();
          await Promise.all(pendingPromises);
          return decodedFrames;
        };

        let frames: FrameEntry[];
        try {
          frames = await runDecodePass(false);
        } catch {
          frames = await runDecodePass(true);
        }

        if (cancelled || st.reverted || frames.length === 0) {
          revertToFallback();
          return;
        }

        frames.sort((a, b) => a.ts - b.ts);
        st.bank = frames;
        st.ready = true;
        if (watchdogTimer !== null) {
          window.clearTimeout(watchdogTimer);
          watchdogTimer = null;
        }
        drawNearestFrame(st.current);
      } catch {
        revertToFallback();
      }
    };

    if (document.readyState === 'complete') {
      buildFrameBank();
    } else {
      window.addEventListener('load', buildFrameBank, { once: true });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      if (watchdogTimer !== null) {
        window.clearTimeout(watchdogTimer);
      }
      window.removeEventListener('resize', updateSpan);
      window.removeEventListener('orientationchange', updateSpan);
      window.removeEventListener('load', buildFrameBank);
      if (video) {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('durationchange', onLoadedMetadata);
      }
      for (const bmp of st.lru.values()) {
        if (bmp) {
          try {
            bmp.close();
          } catch {}
        }
      }
      st.lru.clear();
    };
  }, [videoSrc]);

  return {
    containerRef,
    videoRef,
    canvasRef,
    scrollProgress,
    canvasLive,
  };
}
