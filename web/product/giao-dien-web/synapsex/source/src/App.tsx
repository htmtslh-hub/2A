import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const VIDEOS = {
  hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4',
  second:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4',
  metrics:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4',
  technology:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4',
  footer:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4',
} as const;

const SCRAMBLE_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

function randomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

/* =========================================================
   1. ScrambleIn -- entrance reveal animation
   ========================================================= */
interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

export function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [output, setOutput] = useState<string>('');
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!triggered) {
      setStarted(false);
      setOutput('');
      return;
    }

    let intervalId: number | null = null;
    const timeoutId = window.setTimeout(() => {
      setStarted(true);
      let cursor = 0;
      intervalId = window.setInterval(() => {
        cursor += 0.5;
        const revealedCount = Math.floor(cursor);
        if (revealedCount >= text.length) {
          setOutput(text);
          if (intervalId !== null) window.clearInterval(intervalId);
          return;
        }

        let nextStr = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            nextStr += i <= revealedCount + 3 ? ' ' : '';
          } else if (i < revealedCount) {
            nextStr += text[i];
          } else if (i < revealedCount + 3) {
            nextStr += randomChar();
          }
        }
        setOutput(nextStr);
      }, 25);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [text, delay, triggered]);

  if (!triggered || !started) {
    return <span>&nbsp;</span>;
  }

  return <span>{output || '\u00A0'}</span>;
}

/* =========================================================
   2. ScrambleText -- hover-driven scramble
   ========================================================= */
interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState<string>(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const intervalId = window.setInterval(() => {
      frame += 1;
      const revealedCount = Math.floor(frame / 4);
      if (revealedCount >= text.length) {
        setDisplay(text);
        window.clearInterval(intervalId);
        return;
      }

      let next = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          next += ' ';
        } else if (i < revealedCount) {
          next += text[i];
        } else {
          next += randomChar();
        }
      }
      setDisplay(next);
    }, 25);

    return () => window.clearInterval(intervalId);
  }, [text, isHovered]);

  return <span className={className}>{display}</span>;
}

/* =========================================================
   3. Custom SVG Logo (SynapseXLogo)
   ========================================================= */
const QUADRANT_PATH =
  'M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z';

export function SynapseXLogo({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={QUADRANT_PATH} transform="rotate(0)" />
      <path d={QUADRANT_PATH} transform="rotate(90)" />
      <path d={QUADRANT_PATH} transform="rotate(180)" />
      <path d={QUADRANT_PATH} transform="rotate(270)" />
    </svg>
  );
}

/* =========================================================
   4. Animated Hamburger (SquashHamburger)
   ========================================================= */
export function SquashHamburger({
  isOpen,
  mobile = false,
}: {
  isOpen: boolean;
  mobile?: boolean;
}) {
  const width = mobile ? 15 : 18;
  const height = mobile ? 10 : 12;
  const barHeight = mobile ? 1.2 : 1.5;
  const centerOffset = (height - barHeight) / 2;

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative flex items-center justify-center"
    >
      <motion.span
        style={{ height: `${barHeight}px` }}
        animate={
          isOpen
            ? { top: `${centerOffset}px`, rotate: 45 }
            : { top: '0px', rotate: 0 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute left-0 right-0 bg-white rounded-full block origin-center"
      />
      <motion.span
        style={{ height: `${barHeight}px`, top: `${centerOffset}px` }}
        animate={
          isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute left-0 right-0 bg-white rounded-full block origin-center"
      />
      <motion.span
        style={{ height: `${barHeight}px` }}
        animate={
          isOpen
            ? { bottom: `${centerOffset}px`, rotate: -45 }
            : { bottom: '0px', rotate: 0 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute left-0 right-0 bg-white rounded-full block origin-center"
      />
    </div>
  );
}

/* =========================================================
   Main Application
   ========================================================= */
const METRICS_DATA = [
  { value: '2.4ms', label: 'Synaptic Latency' },
  { value: '99.7%', label: 'Signal Accuracy' },
  { value: '140B', label: 'Neural Parameters' },
] as const;

const TECH_ITEMS = [
  {
    title: 'Cortical Mapping',
    desc: 'Real-time spatial reconstruction of active neural regions.',
  },
  {
    title: 'Signal Isolation',
    desc: 'Separates cognitive intent from biological noise.',
  },
  {
    title: 'State Prediction',
    desc: 'Anticipates cognitive transitions before they occur.',
  },
  {
    title: 'Loop Feedback',
    desc: 'Closed-loop adjustment based on outcome correlation.',
  },
] as const;

const ARCHITECTURE_LAYERS = [
  { layer: 'Layer 1', name: 'Capture' },
  { layer: 'Layer 2', name: 'Process' },
  { layer: 'Layer 3', name: 'Interface' },
] as const;

export function App() {
  const [entranceComplete, setEntranceComplete] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [downloadHovered, setDownloadHovered] = useState<boolean>(false);

  // Hero mouse-scrub video refs
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number | null>(null);

  // Section 2 scroll 3D perspective ref
  const section2Ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });
  const yScaleValue = useTransform(smoothScroll, [0, 1], [60, -120]);
  const textOpacity = useTransform(smoothScroll, [0.15, 0.3, 0.5], [0.25, 0.5, 1]);
  const textTransform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  // Entrance timer (800ms)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEntranceComplete(true);
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  // Hero video setup & chained seek handler
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.pause();

    const onLoadedMetadata = () => {
      video.pause();
      targetTimeRef.current = 0.05;
      try {
        video.currentTime = 0.05;
      } catch {
        // ignore initial seek error if unbuffered
      }
    };

    const onSeeked = () => {
      if (!video) return;
      const diff = Math.abs(video.currentTime - targetTimeRef.current);
      if (diff > 0.03) {
        try {
          video.currentTime = targetTimeRef.current;
        } catch {
          isSeekingRef.current = false;
        }
      } else {
        isSeekingRef.current = false;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  const handleHeroMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const video = heroVideoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    if (lastMouseXRef.current === null) {
      lastMouseXRef.current = event.clientX;
      return;
    }

    const deltaX = event.clientX - lastMouseXRef.current;
    lastMouseXRef.current = event.clientX;

    const viewportWidth = Math.max(window.innerWidth, 1);
    const timeDelta = (deltaX / viewportWidth) * video.duration * 0.8;
    const nextTime = Math.max(
      0,
      Math.min(video.duration - 0.05, targetTimeRef.current + timeDelta)
    );
    targetTimeRef.current = nextTime;

    if (!isSeekingRef.current) {
      isSeekingRef.current = true;
      try {
        video.currentTime = targetTimeRef.current;
      } catch {
        isSeekingRef.current = false;
      }
    }
  };

  const handleHeroMouseLeave = () => {
    lastMouseXRef.current = null;
  };

  const scrollToOffset = (top: number) => {
    window.scrollTo({ top, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div
      style={{ fontFamily: '"Space Mono", monospace' }}
      className="min-h-screen bg-black text-white selection:bg-white selection:text-black"
    >
      {/* =========================================================
          NAVBAR (fixed, z-50)
         ========================================================= */}
      <motion.header
        id="synapsex-navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 h-20 bg-transparent w-full px-4 sm:px-6 md:px-8 flex items-center justify-between"
      >
        {/* Desktop Navbar (hidden below sm) */}
        <div className="hidden sm:flex items-center justify-between w-full">
          {/* Left group: two pills side by side with gap-2 */}
          <div className="flex items-center gap-2">
            {/* Logo pill */}
            <motion.a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToOffset(0);
              }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.22)',
              }}
              whileTap={{ scale: 0.98 }}
              className={`h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] items-center gap-2.5 text-white cursor-pointer ${
                menuOpen ? 'hidden md:flex' : 'flex'
              }`}
            >
              <SynapseXLogo className="w-[18px] h-[18px] text-white shrink-0" />
              <span className="text-[16px] font-medium tracking-tight text-white">
                SynapseX
              </span>
            </motion.a>

            {/* Expanding menu pill */}
            <motion.div
              id="synapsex-desktop-menu-pill"
              animate={{ width: menuOpen ? 290 : 48 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
            >
              <button
                type="button"
                id="synapsex-desktop-menu-btn"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`shrink-0 flex items-center justify-center transition-colors cursor-pointer ${
                  menuOpen
                    ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5'
                    : 'w-12 h-12 rounded-[14px]'
                }`}
              >
                <SquashHamburger isOpen={menuOpen} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.nav
                    aria-label="Desktop Navigation"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-6 pl-5 pr-4 whitespace-nowrap"
                  >
                    <button
                      type="button"
                      id="synapsex-nav-about"
                      onMouseEnter={() => setHoveredLink('about')}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={() => scrollToOffset(window.innerHeight)}
                      className="text-[16px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer"
                    >
                      <ScrambleText
                        text="About"
                        isHovered={hoveredLink === 'about'}
                      />
                    </button>
                    <button
                      type="button"
                      id="synapsex-nav-metrics"
                      onMouseEnter={() => setHoveredLink('metrics')}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={() => scrollToOffset(window.innerHeight * 2)}
                      className="text-[16px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer"
                    >
                      <ScrambleText
                        text="Metrics"
                        isHovered={hoveredLink === 'metrics'}
                      />
                    </button>
                  </motion.nav>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: Download button */}
          <motion.a
            id="synapsex-download-btn"
            href="#architecture"
            onClick={(e) => {
              e.preventDefault();
              scrollToOffset(window.innerHeight * 3);
            }}
            onMouseEnter={() => setDownloadHovered(true)}
            onMouseLeave={() => setDownloadHovered(false)}
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            className="h-12 px-6 bg-white rounded-full text-black flex items-center gap-2.5 text-[15px] font-normal cursor-pointer"
          >
            <i className="bi bi-apple text-[17px] leading-none" aria-hidden="true" />
            <ScrambleText text="Download" isHovered={downloadHovered} />
          </motion.a>
        </div>

        {/* Mobile Navbar (visible below sm) */}
        <div className="flex sm:hidden items-center justify-between w-full gap-2">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <motion.a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToOffset(0);
              }}
              animate={{
                width: menuOpen ? 0 : 'auto',
                opacity: menuOpen ? 0 : 1,
                paddingLeft: menuOpen ? 0 : 12,
                paddingRight: menuOpen ? 0 : 12,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="h-9 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center gap-2 overflow-hidden shrink-0"
            >
              <SynapseXLogo className="w-4 h-4 text-white shrink-0" />
              <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
                SynapseX
              </span>
            </motion.a>

            <motion.div
              animate={{ width: menuOpen ? '100%' : 36 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
            >
              <button
                type="button"
                id="synapsex-mobile-menu-btn"
                aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`shrink-0 flex items-center justify-center cursor-pointer ${
                  menuOpen
                    ? 'w-7 h-7 rounded-[8px] bg-white/10 ml-1'
                    : 'w-9 h-9 rounded-[10px]'
                }`}
              >
                <SquashHamburger isOpen={menuOpen} mobile />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.nav
                    aria-label="Mobile Navigation"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-4 pl-3 pr-3 text-[13px] whitespace-nowrap"
                  >
                    <button
                      type="button"
                      onClick={() => scrollToOffset(window.innerHeight)}
                      className="text-white/85 hover:text-white cursor-pointer"
                    >
                      About
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToOffset(window.innerHeight * 2)}
                      className="text-white/85 hover:text-white cursor-pointer"
                    >
                      Metrics
                    </button>
                  </motion.nav>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <a
            href="#architecture"
            onClick={(e) => {
              e.preventDefault();
              scrollToOffset(window.innerHeight * 3);
            }}
            className="h-9 px-3.5 bg-white rounded-full text-black flex items-center gap-1.5 text-[13px] shrink-0"
          >
            <i className="bi bi-apple text-[14px] leading-none" aria-hidden="true" />
            <span>Download</span>
          </a>
        </div>
      </motion.header>

      {/* =========================================================
          SECTION 1: Hero (full viewport height)
         ========================================================= */}
      <section
        id="synapsex-hero"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
      >
        {/* Background Video #1 (mouse-scrubbed, NOT autoplay) */}
        <video
          id="synapsex-hero-video"
          ref={heroVideoRef}
          src={VIDEOS.hero}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Dot grid overlay */}
        <div
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          className="absolute inset-0 opacity-5 pointer-events-none"
        />

        {/* Large background watermark text: TRANSCENDENCE */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        >
          <span
            id="synapsex-watermark"
            style={{
              fontFamily: '"Anton SC", sans-serif',
              fontSize: 'clamp(120px, 30vw, 521px)',
              letterSpacing: '-4px',
              transform: 'translateY(50px)',
              backgroundImage:
                'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            className="uppercase opacity-10 leading-none whitespace-nowrap"
          >
            TRANSCENDENCE
          </span>
        </div>

        {/* Spacer pushes hero content to bottom */}
        <div className="flex-1" />

        {/* Hero Foreground Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1.0 }}
          className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn
                text="Brain"
                delay={200}
                triggered={entranceComplete}
              />
              <br />
              <ScrambleIn
                text="And Body"
                delay={500}
                triggered={entranceComplete}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={
                entranceComplete
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 25 }
              }
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
            >
              Built at the intersection of neuroscience and artificial
              intelligence. SynapseX continuously maps neural pathways,
              cognitive load, and physiological states into a single adaptive
              intelligence layer.
            </motion.p>
          </div>

          {/* Right h1 */}
          <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right">
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn
              text="Network"
              delay={1000}
              triggered={entranceComplete}
            />
          </h1>
        </motion.div>
      </section>

      {/* =========================================================
          SECTION 2: Cinematic Text (full viewport height)
         ========================================================= */}
      <section
        id="synapsex-cinematic"
        ref={section2Ref}
        className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center"
      >
        <video
          src={VIDEOS.second}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top gradient overlay (180px) */}
        <div
          aria-hidden="true"
          style={{
            background: 'linear-gradient(to bottom, #010103, transparent)',
          }}
          className="pointer-events-none absolute top-0 left-0 right-0 h-[180px] z-10"
        />

        {/* 3D Perspective Container */}
        <div
          style={{ perspective: '400px' }}
          className="relative z-20 max-w-5xl mx-auto flex items-center justify-center"
        >
          <motion.p
            style={{
              transform: textTransform,
              opacity: textOpacity,
            }}
            className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center"
          >
            A neural-AI interface built on the architecture of the human nervous
            system. SynapseX translates synaptic activity into computational
            intelligence. Every signal becomes measurable, structured, and
            visible. It continuously reconstructs internal state as a dynamic
            neural map. Biological noise is filtered into actionable cognitive
            patterns.
          </motion.p>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: Metrics (min-h-screen)
         ========================================================= */}
      <section
        id="synapsex-metrics"
        className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center"
      >
        <video
          src={VIDEOS.metrics}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 pb-32 px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
          >
            Performance Metrics
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
            {METRICS_DATA.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                  {item.value}
                </div>
                <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: Technology / Adaptive Intelligence
         ========================================================= */}
      <section
        id="synapsex-technology"
        className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black flex flex-col px-8 sm:px-12 md:px-16 py-12 sm:py-16"
      >
        <video
          src={VIDEOS.technology}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top area */}
        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
            className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
          >
            Adaptive
            <br />
            Intelligence
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
          >
            The system learns your neural baseline within 72 hours. From there,
            every cognitive state is mapped, predicted, and optimized in real
            time.
          </motion.p>
        </div>

        <div className="flex-1" />

        {/* Bottom grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        >
          {TECH_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                {item.title}
              </h3>
              <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =========================================================
          SECTION 5: Architecture (min-h-screen, pure black, no video)
         ========================================================= */}
      <section
        id="synapsex-architecture"
        className="relative min-h-screen w-full bg-black flex items-center justify-center px-6 py-32"
      >
        <div className="w-full max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.0 }}
          >
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              Architecture
            </p>
            <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
              Three layers. Zero friction.
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              Sensor layer captures raw bioelectric signals. Processing layer
              isolates intent. Interface layer delivers structured output to any
              connected system.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-20 flex flex-col items-center gap-4"
          >
            {ARCHITECTURE_LAYERS.map((item) => (
              <div
                key={item.layer}
                className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6"
              >
                <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                  {item.layer}
                </span>
                <span className="text-white text-[16px] sm:text-[18px] font-light">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
         ========================================================= */}
      <footer
        id="synapsex-footer"
        className="bg-black overflow-hidden flex flex-col md:flex-row min-h-[400px]"
      >
        {/* Left: Video #5 */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
          <video
            src={VIDEOS.footer}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <SynapseXLogo className="w-[18px] h-[18px] text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">
                SynapseX
              </span>
            </div>
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
              The next evolution of human-machine interaction. Built for those
              who refuse to be limited by biology alone.
            </p>
          </div>

          <p className="text-white/25 text-[12px] mt-12">
            (c) 2026 SynapseX Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
