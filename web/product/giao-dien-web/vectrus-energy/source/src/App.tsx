import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ChevronUp, Info, X } from 'lucide-react';
import { useVideoScrub } from '@/useVideoScrub';

const DARK = '#1D3045';
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';

const NAV_LINKS = [
  'VECTRUS ENERGY',
  'VECTRUS UPSTREAM',
  'VECTRUS MARKETS',
  'VECTRUS SYSTEMS',
  'VECTRUS+',
] as const;

interface StaggerProps {
  visible: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

function Stagger({ visible, delay = 0, className = '', style, children }: StaggerProps) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(24px)',
        transition:
          'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const { containerRef, videoRef, canvasRef, scrollProgress, canvasLive } =
    useVideoScrub(VIDEO_SRC);

  const [navReady, setNavReady] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNavReady(true);
    }, 200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const p = scrollProgress;
  const isLight = p > 0.55;
  const navColor = isLight ? '#FFFFFF' : DARK;

  const s1Opacity = p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) / 0.08);
  const s2Opacity =
    p < 0.32
      ? 0
      : p < 0.4
      ? (p - 0.32) / 0.08
      : p < 0.55
      ? 1
      : Math.max(0, 1 - (p - 0.55) / 0.08);
  const s3Opacity = p < 0.67 ? 0 : p < 0.75 ? (p - 0.67) / 0.08 : 1;

  const s1Visible = s1Opacity > 0.3;
  const s2Visible = s2Opacity > 0.3;
  const s3Visible = s3Opacity > 0.3;

  const scrollToFraction = (fraction: number) => {
    const container = containerRef.current;
    if (!container) return;
    const span = Math.max(1, container.offsetHeight - window.innerHeight);
    window.scrollTo({ top: span * fraction, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[500vh]"
      data-scroll-progress={p.toFixed(3)}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* 1) <video> full cover */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />

        {/* 2) <canvas> full cover */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            canvasLive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 3) Overlay absolute inset-0 pointer-events-none */}
        <div className="absolute inset-0 pointer-events-none">
          {/* NAVBAR */}
          <header
            className="absolute top-0 inset-x-0 z-50 pointer-events-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-6 flex items-center justify-between transition-colors duration-500"
            style={{ color: navColor }}
          >
            {/* Desktop lg+: left cluster of 5 links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-8 xl:gap-10"
            >
              {NAV_LINKS.map((label, i) => {
                const isActive = i === 0;
                return (
                  <a
                    key={label}
                    href={`#${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToFraction(i === 0 ? 0 : i === 1 ? 0.45 : 0.85);
                    }}
                    className="relative text-xs tracking-[0.15em] uppercase font-medium hover:opacity-70"
                    style={{
                      color: 'inherit',
                      opacity: navReady ? 1 : 0,
                      transform: navReady ? 'translateY(0px)' : 'translateY(-12px)',
                      transition:
                        'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                      transitionDelay: `${i * 80 + 100}ms`,
                    }}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="absolute left-0 -bottom-3 w-full h-[2px] transition-colors duration-500"
                        style={{ backgroundColor: navColor }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile <lg: hamburger left, 3 bars */}
            <button
              type="button"
              id="mobile-menu-trigger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex flex-col gap-[5px] py-1 cursor-pointer"
              style={{
                opacity: navReady ? 1 : 0,
                transform: navReady ? 'translateY(0px)' : 'translateY(-12px)',
                transition:
                  'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '100ms',
              }}
            >
              <span
                className="block w-[24px] h-[2px] transition-colors duration-500"
                style={{ backgroundColor: navColor }}
              />
              <span
                className="block w-[24px] h-[2px] transition-colors duration-500"
                style={{ backgroundColor: navColor }}
              />
              <span
                className="block w-[16px] h-[2px] transition-colors duration-500"
                style={{ backgroundColor: navColor }}
              />
            </button>

            {/* Right cluster (hidden below sm) */}
            <div
              className="hidden sm:flex items-center gap-6"
              style={{
                opacity: navReady ? 1 : 0,
                transform: navReady ? 'translateY(0px)' : 'translateY(-12px)',
                transition:
                  'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '500ms',
              }}
            >
              <a
                href="#news"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToFraction(0.85);
                }}
                className="flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'inherit' }}
              >
                <span>NEWS</span>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500"
                  style={{
                    backgroundColor: navColor,
                    color: isLight ? DARK : '#FFFFFF',
                  }}
                >
                  <Info size={10} />
                </span>
              </a>

              <span className="hidden lg:inline text-xs tracking-[0.2em] uppercase font-medium">
                MENU
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="lg:hidden text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70 transition-opacity cursor-pointer"
                style={{ color: 'inherit' }}
              >
                MENU
              </button>
            </div>
          </header>

          {/* SECTION 1 (hero, left aligned, vertically centered) */}
          <section
            aria-label="Hero Section"
            className="absolute inset-0 flex items-center px-6 sm:px-8 md:px-20 lg:px-32"
            style={{
              opacity: s1Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s1Visible ? 'auto' : 'none',
            }}
          >
            <div className="max-w-4xl">
              <Stagger visible={s1Visible} delay={0}>
                <h1
                  className="font-light uppercase leading-[1.2] m-0"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 5rem)',
                    color: DARK,
                  }}
                >
                  Advancing resources for a cleaner future
                </h1>
              </Stagger>
              <Stagger visible={s1Visible} delay={150}>
                <p
                  className="mt-6 text-sm tracking-[0.3em] uppercase"
                  style={{ color: '#1D304590' }}
                >
                  Sustainable power with purpose
                </p>
              </Stagger>
            </div>

            <div className="absolute bottom-12 right-6 sm:right-8 md:right-12">
              <Stagger visible={s1Visible} delay={300}>
                <button
                  type="button"
                  id="hero-next"
                  data-next
                  aria-label="Scroll to partnerships section"
                  onClick={() => scrollToFraction(0.45)}
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
                  style={{
                    border: '1px solid #1D304580',
                    color: DARK,
                  }}
                >
                  <ArrowRight size={18} />
                </button>
              </Stagger>
            </div>
          </section>

          {/* SECTION 2 (center) */}
          <section
            aria-label="Partnerships Section"
            className="absolute inset-0 px-6 sm:px-8 flex items-center justify-center"
            style={{
              opacity: s2Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s2Visible ? 'auto' : 'none',
            }}
          >
            <div className="max-w-[900px]">
              <Stagger visible={s2Visible} delay={0}>
                <h2
                  className="font-extralight tracking-wide leading-[1.3] text-center uppercase m-0"
                  style={{
                    fontSize: 'clamp(1.5rem, 4.5vw, 4.5rem)',
                    color: DARK,
                  }}
                >
                  We build lasting partnerships with vision{' '}
                  <span style={{ color: 'rgba(29, 48, 69, 0.8)' }}>
                    and precision
                  </span>{' '}
                  <span style={{ color: 'rgba(29, 48, 69, 0.5)' }}>
                    across every frontier
                  </span>
                </h2>
              </Stagger>
            </div>

            <div className="absolute bottom-16 right-6 sm:right-8 md:right-12 flex flex-col items-center gap-4">
              <Stagger visible={s2Visible} delay={200}>
                <button
                  type="button"
                  aria-label="Scroll to next section"
                  onClick={() => scrollToFraction(0.85)}
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
                  style={{
                    border: '1px solid rgba(29, 48, 69, 0.4)',
                    color: DARK,
                  }}
                >
                  <ArrowDown size={18} />
                </button>
              </Stagger>

              <Stagger visible={s2Visible} delay={350}>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <span
                    className="block w-2 h-2 rounded-full"
                    style={{ backgroundColor: DARK }}
                  />
                  <span
                    className="block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(29, 48, 69, 0.4)' }}
                  />
                  <span
                    className="block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(29, 48, 69, 0.4)' }}
                  />
                </div>
              </Stagger>

              <Stagger visible={s2Visible} delay={500}>
                <button
                  type="button"
                  aria-label="Scroll to top"
                  onClick={() => scrollToFraction(0)}
                  className="mt-2 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
                  style={{
                    border: '1px solid rgba(29, 48, 69, 0.3)',
                    color: 'rgba(29, 48, 69, 0.8)',
                  }}
                >
                  <ChevronUp size={16} />
                </button>
              </Stagger>
            </div>
          </section>

          {/* SECTION 3 (right aligned, white type — video is dark here) */}
          <section
            aria-label="Nordvik Section"
            className="absolute inset-0 flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32"
            style={{
              opacity: s3Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s3Visible ? 'auto' : 'none',
            }}
          >
            <div className="max-w-2xl text-left">
              <Stagger visible={s3Visible} delay={0}>
                <p className="text-white/60 text-lg tracking-wide mb-4">
                  Halder | Nordvik
                </p>
              </Stagger>
              <Stagger visible={s3Visible} delay={150}>
                <h2
                  className="font-light text-white leading-[1.2] uppercase tracking-wide mb-8 m-0"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
                >
                  Fueling ambition,
                  <br />
                  shaping tomorrow.
                </h2>
              </Stagger>
              <Stagger visible={s3Visible} delay={300}>
                <div className="flex items-center gap-4">
                  <span className="text-sm tracking-[0.3em] text-white/80 uppercase">
                    Contact Nordvik
                  </span>
                  <button
                    type="button"
                    aria-label="Contact Nordvik"
                    onClick={() => scrollToFraction(0)}
                    className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Stagger>
            </div>
          </section>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        id="mobile-menu-overlay"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          backgroundColor: DARK,
          transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div
          className={`flex flex-col justify-between h-full transition-transform duration-500 ${
            menuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Close button */}
          <div className="px-6 sm:px-8 pt-8 sm:pt-12 flex justify-end">
            <button
              type="button"
              id="mobile-menu-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links centered vertically */}
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col justify-center px-8 sm:px-12"
          >
            {NAV_LINKS.map((label, i) => {
              const isActive = i === 0;
              return (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    scrollToFraction(i === 0 ? 0 : i === 1 ? 0.45 : 0.85);
                  }}
                  className={`py-3 text-2xl sm:text-3xl font-light tracking-wide uppercase transition-colors ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0px)' : 'translateY(20px)',
                    transition:
                      'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1), color 0.2s ease',
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Footer: NEWS and CONTACT */}
          <div className="px-8 sm:px-12 pb-10 flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-white/60">
            <a
              href="#news"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollToFraction(0.85);
              }}
              className="hover:text-white transition-colors"
            >
              NEWS
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollToFraction(0.85);
              }}
              className="hover:text-white transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
