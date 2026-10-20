import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

export interface VideoScene {
  label: string;
  url: string;
}

export const VIDEOS: VideoScene[] = [
  {
    label: 'Golden Hour',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
  },
  {
    label: 'Still Water',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
  },
  {
    label: 'Deep Woods',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
  },
  {
    label: 'Quiet Dawn',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
  },
];

export const OVERLAY_PNG_URL =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';

export const NAV_LINKS = ['How It Works', 'Features', 'Pricing', 'Community'] as const;

export const STATS = [
  '60+ Deep Sessions',
  '12,000+ Creators',
  '4.8 User Satisfaction',
  'Intentional-First Design',
] as const;

const MOBILE_DELAY_CLASSES = [
  'delay-[100ms]',
  'delay-[150ms]',
  'delay-[200ms]',
  'delay-[250ms]',
] as const;

export function App() {
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const cooldownRef = useRef<number | null>(null);

  const isDeepWoods = activeVideo === 2;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (cooldownRef.current !== null) {
        window.clearTimeout(cooldownRef.current);
      }
    };
  }, []);

  const handleVideoSwitch = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setActiveVideo(index);
    setIsTransitioning(true);
    if (cooldownRef.current !== null) {
      window.clearTimeout(cooldownRef.current);
    }
    cooldownRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      cooldownRef.current = null;
    }, 1000);
  };

  const handleEarlyAccessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubmittedEmail(trimmed);
    setEmail('');
  };

  return (
    <section
      id="lumora-hero"
      className="relative w-full h-screen overflow-hidden bg-black select-none"
    >
      {/* Background Video Layer (z-0): 4 stacked fullscreen looping videos */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {VIDEOS.map((video, index) => (
          <video
            key={video.label}
            id={`lumora-video-${index}`}
            src={video.url}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Transparent PNG Overlay (z-index 1) with continuous train-bob animation */}
      <img
        id="lumora-png-overlay"
        src={OVERLAY_PNG_URL}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-[1] w-full h-full object-cover pointer-events-none animate-train-bob"
      />

      {/* Content Layer (z-index 2) - Flex Column Full Height */}
      <div className="relative z-[2] flex flex-col h-full w-full px-5 sm:px-8 md:px-12 lg:px-16 py-5 sm:py-7">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full shrink-0">
          <a
            id="lumora-logo"
            href="#lumora-hero"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
            }}
            className="italic text-white text-xl sm:text-2xl tracking-tight leading-none"
          >
            Lumora
          </a>

          {/* Desktop Navigation Pill (md+) */}
          <nav
            id="lumora-desktop-nav"
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-7 liquid-glass rounded-full pl-6 pr-2 py-1.5 font-system"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => e.preventDefault()}
                className="text-sm text-white/90 hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
            <button
              id="lumora-nav-cta"
              type="button"
              onClick={() => {
                const input = document.getElementById('lumora-email-input');
                input?.focus();
              }}
              className="bg-white text-black text-sm font-medium rounded-full px-4 py-2 hover:bg-white/90 transition-colors duration-200 cursor-pointer"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Hamburger Button (< md) */}
          <button
            id="lumora-mobile-toggle"
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="lumora-mobile-overlay"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden relative z-[60] w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white cursor-pointer"
          >
            <span className="relative w-5 h-5 flex items-center justify-center">
              <Menu
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  mobileMenuOpen
                    ? 'rotate-90 scale-75 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
              />
              <X
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  mobileMenuOpen
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-75 opacity-0'
                }`}
              />
            </span>
          </button>
        </header>

        {/* Hero Content (centered below nav) */}
        <main className="flex flex-col items-center text-center mt-8 sm:mt-12 md:mt-14 lg:mt-16 px-2">
          {/* Badge */}
          <div
            id="lumora-badge"
            className={`liquid-glass rounded-full px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-system transition-colors duration-700 mb-4 sm:mb-5 ${
              isDeepWoods ? 'text-[#182C41]' : 'text-white'
            }`}
          >
            Over 10,000 minds already finding their clarity
          </div>

          {/* Heading */}
          <h1
            id="lumora-heading"
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl font-normal transition-colors duration-700 mb-4 sm:mb-5 ${
              isDeepWoods ? 'text-[#182C41]' : 'text-white'
            }`}
          >
            Clarity in an Endlessly
            <br />
            Noisy Universe
          </h1>

          {/* Subtext */}
          <p
            id="lumora-subtext"
            className={`max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-system transition-colors duration-700 mb-5 sm:mb-7 ${
              isDeepWoods ? 'text-[#182C41]/85' : 'text-white/85'
            }`}
          >
            Rise above the chaos of pings, infinite scrolling, and relentless demands. Discover
            how to protect your presence and create with intention.
          </p>

          {/* Email Input Pill */}
          <form
            id="lumora-email-form"
            onSubmit={handleEarlyAccessSubmit}
            className="liquid-glass rounded-full p-1.5 pl-4 flex items-center justify-between w-full max-w-[320px] sm:max-w-sm font-system mb-5 sm:mb-7"
          >
            <label htmlFor="lumora-email-input" className="sr-only">
              Your Best Email
            </label>
            <input
              id="lumora-email-input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (submittedEmail) setSubmittedEmail(null);
              }}
              placeholder={submittedEmail ? 'Early access reserved ✓' : 'Your Best Email'}
              className={`bg-transparent border-none outline-none text-xs sm:text-sm flex-1 min-w-0 pr-2 transition-colors duration-700 ${
                isDeepWoods
                  ? 'text-[#182C41] placeholder-[#182C41]/65'
                  : 'text-white placeholder-white/65'
              }`}
            />
            <button
              id="lumora-early-access-btn"
              type="submit"
              className="bg-white text-black text-xs sm:text-sm font-medium rounded-full px-4 py-2 shrink-0 hover:bg-white/90 transition-colors duration-200 cursor-pointer"
            >
              {submittedEmail ? 'Joined' : 'Get Early Access'}
            </button>
          </form>

          {/* Video Switcher */}
          <div
            id="lumora-video-switcher"
            role="tablist"
            aria-label="Ambient Scene Switcher"
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-system"
          >
            {VIDEOS.map((video, index) => {
              const isActive = activeVideo === index;
              return (
                <button
                  key={video.label}
                  id={`lumora-scene-btn-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleVideoSwitch(index)}
                  className={`text-xs sm:text-sm pb-1 border-b-2 transition-all duration-700 cursor-pointer ${
                    isDeepWoods
                      ? isActive
                        ? 'text-[#182C41] border-[#182C41] opacity-100 font-medium'
                        : 'text-[#182C41] border-transparent opacity-50 hover:opacity-80'
                      : isActive
                        ? 'text-white border-white opacity-100 font-medium'
                        : 'text-white border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  {video.label}
                </button>
              );
            })}
          </div>
        </main>

        {/* Flex-1 Spacer pushing Bottom Stats to bottom */}
        <div className="flex-1" aria-hidden="true" />

        {/* Bottom Stats (always white) */}
        <footer
          id="lumora-bottom-stats"
          className="w-full flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-white/70 text-xs sm:text-sm font-system shrink-0 pb-1"
        >
          {STATS.map((stat, index) => (
            <React.Fragment key={stat}>
              <span>{stat}</span>
              {index < STATS.length - 1 && (
                <span className="hidden sm:inline text-white/40" aria-hidden="true">
                  |
                </span>
              )}
            </React.Fragment>
          ))}
        </footer>
      </div>

      {/* Mobile Menu Overlay (fixed, z-50) */}
      <div
        id="lumora-mobile-overlay"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center px-6 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
              }}
              className={`text-white text-3xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                MOBILE_DELAY_CLASSES[index]
              } ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {link}
            </a>
          ))}
          <button
            id="lumora-mobile-cta"
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              const input = document.getElementById('lumora-email-input');
              input?.focus();
            }}
            className={`mt-4 bg-white text-black text-base font-medium rounded-full px-8 py-3 font-system transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] delay-[300ms] cursor-pointer ${
              mobileMenuOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-4 opacity-0'
            }`}
          >
            Get Started
          </button>
        </nav>
      </div>
    </section>
  );
}

export default App;
