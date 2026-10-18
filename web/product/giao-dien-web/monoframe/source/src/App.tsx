import React, { useEffect, useRef, useState } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const FALLBACK_H264_SRC = './assets/hero-h264.mp4';
const SENSITIVITY = 0.8;

const NAV_LINKS = [
  { label: 'Labs', href: '#labs' },
  { label: 'Studio', href: '#studio' },
  { label: 'Openings', href: '#openings' },
  { label: 'Shop', href: '#shop' },
] as const;

const ACTION_PILLS = [
  { label: 'Pitch us an idea', href: 'mailto:hello@monoframe.co?subject=Pitch%20an%20idea' },
  { label: 'Come work here', href: '#openings' },
  { label: 'Send a brief hello', href: 'mailto:hello@monoframe.co?subject=Hello%20Monoframe' },
  { label: 'See how we operate', href: '#studio' },
] as const;

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let index = 0;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId !== undefined) {
            window.clearInterval(intervalId);
          }
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);

  // Reveal action pill buttons 400ms after page load (independent of typewriter)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  // Ensure H.264 fallback on browsers without 10-bit HEVC hardware decode
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canPlayHevc10 = video.canPlayType('video/mp4; codecs="hvc1.2.4.L120.90"');
    if (canPlayHevc10 !== 'probably') {
      video.dataset.fallback = 'h264';
      video.src = FALLBACK_H264_SRC;
      video.load();
    }
  }, []);

  // Horizontal mouse-scrub video control
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration) || !Number.isFinite(duration)) {
        return;
      }

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;
      const nextTarget = Math.min(duration, Math.max(0, targetTimeRef.current + timeOffset));
      targetTimeRef.current = nextTarget;

      if (!isSeekingRef.current && Math.abs(nextTarget - video.currentTime) > 0.001) {
        isSeekingRef.current = true;
        try {
          video.currentTime = nextTarget;
        } catch {
          isSeekingRef.current = false;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime === 0) {
      try {
        video.currentTime = 0.001;
      } catch {
        // Ignore if not yet seekable
      }
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      isSeekingRef.current = false;
      return;
    }
    if (Math.abs(targetTimeRef.current - video.currentTime) > 0.005) {
      try {
        video.currentTime = targetTimeRef.current;
      } catch {
        isSeekingRef.current = false;
      }
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleVideoError = () => {
    const video = videoRef.current;
    if (!video) return;
    const mode = video.dataset.fallback;
    if (mode !== 'h264') {
      video.dataset.fallback = 'h264';
      video.src = FALLBACK_H264_SRC;
      video.load();
    } else {
      video.dataset.fallback = 'remote';
      video.src = VIDEO_SRC;
      video.load();
    }
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('hello@monoframe.co').catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* BACKGROUND VIDEO (mouse-scrub controlled) */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        onError={handleVideoError}
        aria-hidden="true"
        className="fixed inset-0 z-0 w-full h-full object-cover object-[70%_center] pointer-events-none"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: '70% center',
        }}
      />

      {/* NAVBAR (fixed, z-index: 10) */}
      <header
        className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center"
        style={{ zIndex: 10 }}
      >
        {/* Logo (left) */}
        <a
          href="#"
          aria-label="Monoframe home"
          className="flex flex-row items-center gap-3 text-white no-underline"
        >
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Monoframe®
          </span>
          <span
            aria-hidden="true"
            className="text-[25px] sm:text-[30px] text-white select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </a>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex flex-row items-center text-[23px] text-white"
        >
          {NAV_LINKS.map((item, idx) => (
            <React.Fragment key={item.label}>
              <a
                href={item.href}
                className="text-white hover:opacity-60 transition-opacity"
              >
                {item.label}
              </a>
              {idx < NAV_LINKS.length - 1 && (
                <span className="whitespace-pre">, </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <a
          href="mailto:hello@monoframe.co"
          className="hidden md:inline-block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-1 bg-transparent border-0 cursor-pointer"
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          zIndex: 9,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {NAV_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
          >
            {item.label}
          </a>
        ))}
        <a
          href="mailto:hello@monoframe.co"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
          className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>

      {/* HERO SECTION (z-index: 1) */}
      <main
        className="relative h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <div className="max-w-xl relative z-10">
          {/* 1. Blurred intro label */}
          <h1
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#fff',
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Monoframe&apos;s Adaptive Response Interface Agent
          </h1>

          {/* 2. Typewriter text */}
          <p
            aria-label={TYPEWRITER_TEXT}
            className="text-white mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px',
            }}
          >
            <span>{displayed}</span>
            {!done && (
              <span
                aria-hidden="true"
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px]"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            )}
          </p>

          {/* 3. Action pill buttons */}
          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {ACTION_PILLS.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {pill.label}
              </button>
            ))}

            {/* 1 outline pill button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <span>
                Reach us:{' '}
                <span className="underline underline-offset-1">hello@monoframe.co</span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect
                  x="4"
                  y="4"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <rect
                  x="1"
                  y="1"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
