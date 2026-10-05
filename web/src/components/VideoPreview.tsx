'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

/** Lazy-load silent recordings only when a card is visible. A pause control is
 * always available; reduced-motion visitors get a still unless they press play. */
export default function VideoPreview({ src, poster, fit, label, controls = true }: {
  src: string; poster: string; fit: string; label: string; controls?: boolean;
}) {
  const box = useRef<HTMLSpanElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const optedOut = useRef(false);
  const optedIn = useRef(false);
  const visible = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    const element = video.current;
    const container = box.current;
    if (!element || !container) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const synchronise = () => {
      setLang(document.documentElement.lang);
      const allowed = visible.current && !document.hidden && !optedOut.current && (!reduced.matches || optedIn.current);
      if (allowed) {
        if (!element.getAttribute('src')) element.src = src;
        setLoaded(true);
        element.play().catch(() => setPlaying(false));
      } else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      synchronise();
    }, { threshold: 0.2 });
    observer.observe(container);
    document.addEventListener('visibilitychange', synchronise);
    reduced.addEventListener('change', synchronise);
    const htmlObserver = new MutationObserver(() => setLang(document.documentElement.lang));
    htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => {
      observer.disconnect(); htmlObserver.disconnect(); element.pause();
      document.removeEventListener('visibilitychange', synchronise);
      reduced.removeEventListener('change', synchronise);
    };
  }, [src]);

  const labels = lang === 'zh' ? ['播放预览', '暂停预览'] : lang === 'en' ? ['Play preview', 'Pause preview'] : ['Phát video preview', 'Tạm dừng video preview'];
  const mediaStyle: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit as CSSProperties['objectFit'] };
  return (
    <span ref={box} style={{ display: 'block', position: 'absolute', inset: 0 }}>
      {/* The image remains the accessible description and error fallback. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={label} style={mediaStyle} />
      <video ref={video} poster={poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
        style={{ ...mediaStyle, opacity: loaded ? 1 : 0, pointerEvents: 'none' }}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setLoaded(false); setPlaying(false); }} />
      {controls && <button type="button" aria-label={playing ? labels[1] : labels[0]} title={playing ? labels[1] : labels[0]}
        style={{ position: 'absolute', zIndex: 5, top: 48, right: 12, width: 44, height: 44, borderRadius: '50%', border: '1px solid #ffffff80', background: '#171a15e6', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'grid', placeItems: 'center' }}
        onClick={event => {
          event.stopPropagation();
          const element = video.current;
          if (!element) return;
          if (!element.paused) { optedOut.current = true; optedIn.current = false; element.pause(); }
          else {
            optedOut.current = false;
            optedIn.current = true;
            if (!element.getAttribute('src')) element.src = src;
            setLoaded(true);
            element.play().catch(() => setPlaying(false));
          }
        }}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
      </button>}
    </span>
  );
}
