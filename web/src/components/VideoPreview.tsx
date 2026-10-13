'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';

/** Silent real recordings; controls live outside card links. Never preload a library. */
export default function VideoPreview({ src, poster, fit, label, controls = false }: {
  src: string; poster: string; fit: string; label: string; controls?: boolean;
}) {
  const box = useRef<HTMLSpanElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const sync = useRef<() => void>(() => {});
  const requested = useRef(false);
  const pausedByUser = useRef(false);
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    const element = video.current, container = box.current;
    if (!element || !container) return;
    const card = container.closest<HTMLElement>('.product-card-wrap');
    const trigger = card ?? container;
    setHost(card);
    let visible = false, hovering = false, focused = false, disposed = false, wantsPlay = false;
    const synchronise = () => {
      const allowed = visible && !document.hidden && !pausedByUser.current &&
        (requested.current || (!controls && (hovering || focused)));
      wantsPlay = allowed;
      if (allowed) {
        if (!element.getAttribute('src')) element.src = src;
        if (element.ended) element.currentTime = 0;
        window.dispatchEvent(new CustomEvent('forge-preview-play', { detail: element }));
        element.play().then(() => {
          if (disposed || !wantsPlay) element.pause();
        }).catch(() => { if (!disposed) setPlaying(false); });
      } else {
        element.pause();
        if (!requested.current) { setReady(false); element.currentTime = 0; }
      }
    };
    sync.current = synchronise;
    const enter = (event: PointerEvent) => { if (event.pointerType === 'mouse') { hovering = true; pausedByUser.current = false; synchronise(); } };
    const leave = () => { hovering = false; synchronise(); };
    const focus = () => { focused = true; synchronise(); };
    const blur = (event: FocusEvent) => { if (!trigger.contains(event.relatedTarget as Node | null)) { focused = false; synchronise(); } };
    const other = (event: Event) => {
      if ((event as CustomEvent).detail !== element) {
        requested.current = false; hovering = false; focused = false; wantsPlay = false; element.pause(); setReady(false);
      }
    };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) requested.current = false;
      synchronise();
    }, { threshold: 0.2 });
    if (observer) observer.observe(container); else visible = true;
    trigger.addEventListener('pointerenter', enter); trigger.addEventListener('pointerleave', leave);
    trigger.addEventListener('focusin', focus); trigger.addEventListener('focusout', blur);
    document.addEventListener('visibilitychange', synchronise);
    window.addEventListener('forge-preview-play', other);
    const fullscreenChanged = () => { const active = document.fullscreenElement === element; setFullscreen(active); element.controls = active; };
    document.addEventListener('fullscreenchange', fullscreenChanged);
    const htmlObserver = new MutationObserver(() => setLang(document.documentElement.lang));
    setLang(document.documentElement.lang);
    htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => {
      disposed = true; observer?.disconnect(); htmlObserver.disconnect(); element.pause();
      trigger.removeEventListener('pointerenter', enter); trigger.removeEventListener('pointerleave', leave);
      trigger.removeEventListener('focusin', focus); trigger.removeEventListener('focusout', blur);
      document.removeEventListener('visibilitychange', synchronise); window.removeEventListener('forge-preview-play', other);
      document.removeEventListener('fullscreenchange', fullscreenChanged);
      sync.current = () => {};
    };
  }, [src, controls]);

  const labels = lang === 'zh' ? ['播放预览', '暂停预览', '全屏', '视频不可用'] : lang === 'en' ? ['Play preview', 'Pause preview', 'Fullscreen', 'Video unavailable'] : ['Phát preview', 'Tạm dừng preview', 'Toàn màn hình', 'Video không tải được'];
  const mediaStyle: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit as CSSProperties['objectFit'] };
  const buttonStyle: CSSProperties = { width: 44, height: 44, borderRadius: '50%', border: '1px solid #ffffff80', background: '#171a15ed', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'grid', placeItems: 'center' };
  const actions = <span data-preview-actions="" style={{ position: 'absolute', zIndex: 9, top: host ? 60 : 12, right: 12, display: 'flex', gap: 8 }}>
    <button type="button" aria-label={`${failed ? labels[3] : playing ? labels[1] : labels[0]} — ${label}`} title={playing ? labels[1] : labels[0]} disabled={failed} style={buttonStyle}
      onClick={event => {
        event.preventDefault(); event.stopPropagation();
        if (playing) { pausedByUser.current = true; requested.current = false; }
        else { pausedByUser.current = false; requested.current = true; }
        sync.current();
      }}><span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span></button>
    {controls && <button type="button" aria-label={labels[2]} style={buttonStyle} onClick={() => {
      const element = video.current;
      if (!element) return;
      pausedByUser.current = false; requested.current = true; sync.current();
      element.controls = true;
      if (element.requestFullscreen) element.requestFullscreen().catch(() => { window.open(src, '_blank', 'noopener,noreferrer'); });
      else window.open(src, '_blank', 'noopener,noreferrer');
    }}><span aria-hidden="true">⛶</span></button>}
  </span>;
  return <span ref={box} data-recorded-preview="" style={{ display: 'block', position: 'absolute', inset: 0 }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className="product-stage__image" src={poster} alt={label} style={{ ...mediaStyle, objectFit: /\/(?:solenne|lingoglass)\.webp/.test(poster) ? 'contain' : mediaStyle.objectFit }} />
    <video ref={video} poster={poster} muted playsInline preload="none" aria-label={label} tabIndex={-1}
      style={{ ...mediaStyle, objectFit: 'contain', background: '#111', opacity: ready ? 1 : 0, pointerEvents: fullscreen ? 'auto' : 'none' }}
      onPlaying={() => { setReady(true); setPlaying(true); }} onPause={() => setPlaying(false)}
      onEnded={() => { pausedByUser.current = true; requested.current = false; setPlaying(false); }}
      onError={() => { setReady(false); setPlaying(false); setFailed(true); }} />
    {host ? createPortal(actions, host) : controls ? actions : null}
  </span>;
}
