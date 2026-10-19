import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', active: true },
  { label: 'Studio', href: '#studio', active: false },
  { label: 'About', href: '#about', active: false },
  { label: 'Journal', href: '#journal', active: false },
  { label: 'Reach Us', href: '#reach-us', active: false },
] as const;

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [motionSettled, setMotionSettled] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Guarantee entrance animations settle to opacity: 1 even if a browser throttles CSS keyframes
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setMotionSettled(true);
    }, 1400);
    return () => window.clearTimeout(timerId);
  }, []);

  // Custom fade-in / fade-out manual video loop using requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let restartTimeoutId: number | undefined;
    let isRestarting = false;

    const FADE_DURATION = 0.5;

    const updateOpacity = () => {
      if (video && !isRestarting) {
        const { currentTime, duration } = video;

        if (duration && Number.isFinite(duration) && duration > 0) {
          let nextOpacity = 1;

          if (currentTime < FADE_DURATION) {
            nextOpacity = Math.min(1, Math.max(0, currentTime / FADE_DURATION));
          } else if (duration - currentTime < FADE_DURATION) {
            nextOpacity = Math.min(1, Math.max(0, (duration - currentTime) / FADE_DURATION));
          }

          video.style.opacity = nextOpacity.toFixed(3);
        }
      }

      rafId = window.requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      isRestarting = true;
      video.style.opacity = '0';

      restartTimeoutId = window.setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        isRestarting = false;
        video.play().catch(() => {
          video.style.opacity = '1';
        });
      }, 100);
    };

    video.style.opacity = '0';
    video.addEventListener('ended', handleEnded);

    video.play().catch(() => {
      video.style.opacity = '1';
    });

    rafId = window.requestAnimationFrame(updateOpacity);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (restartTimeoutId !== undefined) {
        window.clearTimeout(restartTimeoutId);
      }
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Close interactive dialog on Escape
  useEffect(() => {
    if (!journeyOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setJourneyOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [journeyOpen]);

  const handleOpenJourney = () => {
    setSubmitted(false);
    setJourneyOpen(true);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      data-motion-settled={motionSettled ? 'true' : 'false'}
      className="relative min-h-screen w-full overflow-hidden bg-background text-foreground"
    >
      {/* Background Video Layer (z-0) */}
      <div
        aria-hidden="true"
        className="absolute z-0 pointer-events-none overflow-hidden"
        style={{
          inset: 'auto 0 0 0',
          top: '300px',
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover transition-opacity duration-75"
          style={{ opacity: 0 }}
        />
        {/* Gradient overlay over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Navigation Bar (z-10) */}
      <header className="relative z-10 w-full">
        <nav
          aria-label="Primary Navigation"
          className="flex flex-wrap md:flex-nowrap items-center justify-between px-5 sm:px-8 py-6 max-w-7xl mx-auto gap-y-4"
        >
          {/* Logo */}
          <a
            href="#home"
            aria-label="Aethera home"
            className="order-1 text-3xl tracking-tight font-serif text-[#000000] no-underline select-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Aethera<sup className="text-[0.55em] align-super">®</sup>
          </a>

          {/* Menu Items */}
          <div className="order-3 md:order-2 w-full md:w-auto flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 pt-3 md:pt-0 border-t border-black/5 md:border-t-0">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.label === 'Reach Us') {
                    e.preventDefault();
                    handleOpenJourney();
                  }
                }}
                className={`text-sm transition-colors duration-200 ${
                  item.active
                    ? 'text-[#000000] font-medium'
                    : 'text-[#6F6F6F] hover:text-[#000000]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Navbar CTA Button */}
          <button
            type="button"
            onClick={handleOpenJourney}
            className="order-2 md:order-3 rounded-full px-5 sm:px-6 py-2.5 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] active:scale-[0.99] transition-transform duration-200 cursor-pointer shadow-sm"
          >
            Begin Journey
          </button>
        </nav>
      </header>

      {/* Hero Section (z-10) */}
      <main
        id="home"
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
        style={{ paddingTop: 'calc(8rem - 75px)' }}
      >
        <h1
          className="text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal font-serif text-[#000000] animate-fade-rise"
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: 0.95,
            letterSpacing: '-2.46px',
          }}
        >
          Beyond <em className="italic text-[#6F6F6F]">silence,</em> we build{' '}
          <em className="italic text-[#6F6F6F]">the eternal.</em>
        </h1>

        <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through
          the noise, we craft digital havens for deep work and pure flows.
        </p>

        <button
          type="button"
          onClick={handleOpenJourney}
          className="rounded-full px-14 py-5 text-base mt-12 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] active:scale-[0.99] transition-transform duration-200 cursor-pointer shadow-md animate-fade-rise-delay-2"
        >
          Begin Journey
        </button>
      </main>

      {/* Glassmorphic Inquiry Dialog (opens on CTA click) */}
      {journeyOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="journey-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setJourneyOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-black/10 p-8 shadow-2xl text-left">
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => setJourneyOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-[#6F6F6F] hover:text-[#000000] hover:bg-black/5 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <h2
              id="journey-dialog-title"
              className="text-3xl font-normal font-serif text-[#000000] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Enter the sanctuary.
            </h2>
            <p className="mt-2 text-sm text-[#6F6F6F] leading-relaxed">
              Request early access or initiate a studio conversation with our architects.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl bg-black/5 p-5 text-sm text-[#000000]">
                <p className="font-medium">Your note has been received.</p>
                <p className="mt-1 text-[#6F6F6F]">
                  We review inquiries in quiet batches and will respond within two studio days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="journey-name" className="block text-xs font-medium text-[#000000] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="journey-name"
                    type="text"
                    required
                    placeholder="Clara Vance"
                    className="w-full rounded-xl border border-black/15 bg-white/80 px-4 py-2.5 text-sm text-[#000000] placeholder:text-[#6F6F6F]/60 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="journey-email" className="block text-xs font-medium text-[#000000] mb-1.5">
                    Work Email
                  </label>
                  <input
                    id="journey-email"
                    type="email"
                    required
                    placeholder="clara@studio.co"
                    className="w-full rounded-xl border border-black/15 bg-white/80 px-4 py-2.5 text-sm text-[#000000] placeholder:text-[#6F6F6F]/60 focus:outline-none focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full py-3.5 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                >
                  Request Invitation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
