import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LEFT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4';
const RIGHT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4';

const GALLERY_IMAGES = [
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85',
];

const CIRCLE_SYMBOLS = ['8', '$', '^^', '%', '/'] as const;
const ENTRY_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let imgIdx = 0;
  let r = 0;
  while (imgIdx < count) {
    const row = new Array<number>(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = imgIdx++;
    if (r % 3 === 0 && imgIdx < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = imgIdx++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

function getColsForWidth(width: number): number {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function App() {
  const [vw, setVw] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [isTouch, setIsTouch] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      : false
  );
  const [videosLoaded, setVideosLoaded] = useState(false);

  const spacerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const blackPanelRef = useRef<HTMLDivElement>(null);
  const innerWrapRef = useRef<HTMLDivElement>(null);
  const outroOverlayRef = useRef<HTMLDivElement>(null);
  const outroInfoRef = useRef<HTMLDivElement>(null);
  const outroBuyRef = useRef<HTMLDivElement>(null);
  const outroFooterRef = useRef<HTMLDivElement>(null);
  const circleSymbolRef = useRef<HTMLSpanElement>(null);

  const mouseXRef = useRef<number | null>(null);
  const activeSideRef = useRef<'left' | 'right'>('right');
  const maxScrollRef = useRef<number>(0);

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;
  const isDesktop = vw >= 1024;
  const cols = getColsForWidth(vw);

  const layoutRows = useMemo(
    () => buildLayout(GALLERY_IMAGES.length, cols),
    [cols]
  );

  // Track viewport size and touch capability
  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setIsTouch(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches
      );
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Track both videos loaded
  useEffect(() => {
    const leftVid = leftVideoRef.current;
    const rightVid = rightVideoRef.current;
    if (!leftVid || !rightVid) return;

    let leftReady = leftVid.readyState >= 2;
    let rightReady = rightVid.readyState >= 2;

    const checkBoth = () => {
      if (leftVid.readyState >= 2) leftReady = true;
      if (rightVid.readyState >= 2) rightReady = true;
      if (leftReady && rightReady) {
        setVideosLoaded(true);
      }
    };

    checkBoth();
    leftVid.addEventListener('loadeddata', checkBoth);
    leftVid.addEventListener('canplay', checkBoth);
    rightVid.addEventListener('loadeddata', checkBoth);
    rightVid.addEventListener('canplay', checkBoth);

    const fallbackTimer = window.setTimeout(() => {
      setVideosLoaded(true);
    }, 1500);

    return () => {
      leftVid.removeEventListener('loadeddata', checkBoth);
      leftVid.removeEventListener('canplay', checkBoth);
      rightVid.removeEventListener('loadeddata', checkBoth);
      rightVid.removeEventListener('canplay', checkBoth);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  // Custom cursor & desktop mouseX tracking
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Mobile/Tablet touch video alternate autoplay
  useEffect(() => {
    const leftVid = leftVideoRef.current;
    const rightVid = rightVideoRef.current;
    if (!leftVid || !rightVid) return;

    const useTouchPlayback = isTouch || !isDesktop;
    if (!useTouchPlayback) {
      leftVid.pause();
      rightVid.pause();
      if (activeSideRef.current === 'left') {
        leftVid.style.display = 'block';
        rightVid.style.display = 'none';
      } else {
        leftVid.style.display = 'none';
        rightVid.style.display = 'block';
      }
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    leftVid.style.display = 'block';
    rightVid.style.display = 'none';

    if (reducedMotion) {
      leftVid.pause();
      rightVid.pause();
      return;
    }

    const playSafe = (v: HTMLVideoElement) => {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    const onLeftEnded = () => {
      leftVid.style.display = 'none';
      rightVid.style.display = 'block';
      activeSideRef.current = 'right';
      playSafe(rightVid);
    };

    const onRightEnded = () => {
      rightVid.style.display = 'none';
      leftVid.style.display = 'block';
      activeSideRef.current = 'left';
      playSafe(leftVid);
    };

    leftVid.addEventListener('ended', onLeftEnded);
    rightVid.addEventListener('ended', onRightEnded);
    activeSideRef.current = 'left';
    playSafe(leftVid);

    return () => {
      leftVid.removeEventListener('ended', onLeftEnded);
      rightVid.removeEventListener('ended', onRightEnded);
      leftVid.pause();
      rightVid.pause();
    };
  }, [isTouch, isDesktop]);

  // GSAP ScrollTrigger for black panel slide-up & dynamic spacer height
  useGSAP(
    () => {
      const spacer = spacerRef.current;
      const panel = blackPanelRef.current;
      const wrap = innerWrapRef.current;
      if (!spacer || !panel || !wrap) return;

      const updateMeasurements = () => {
        const vh = window.innerHeight;
        const wrapScrollHeight = wrap.scrollHeight;
        const maxScroll = Math.max(0, wrapScrollHeight - vh);
        maxScrollRef.current = maxScroll;
        spacer.style.height = `${vh + maxScroll + 2 * vh}px`;
      };

      updateMeasurements();

      const tween = gsap.fromTo(
        panel,
        { y: () => window.innerHeight },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: spacer,
            start: 'top top',
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
            onRefreshInit: updateMeasurements,
          },
        }
      );

      const onResize = () => {
        updateMeasurements();
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [cols] }
  );

  // Unified RAF loop for desktop video scrubbing + gallery card scaling + outro phase + symbol randomization
  useEffect(() => {
    let rafId = 0;
    let lastScrollY = window.scrollY;
    let lastSymbolTime = 0;

    const tick = (now: number) => {
      const vh = window.innerHeight;
      const width = window.innerWidth;
      const scrollY = window.scrollY;
      const wrap = innerWrapRef.current;
      const panel = blackPanelRef.current;
      const spacer = spacerRef.current;

      // Recalculate maxScroll & spacer height if gallery layout settled
      if (wrap && spacer) {
        const wrapScrollHeight = wrap.scrollHeight;
        const computedMax = Math.max(0, wrapScrollHeight - vh);
        if (Math.abs(computedMax - maxScrollRef.current) > 1) {
          maxScrollRef.current = computedMax;
          spacer.style.height = `${vh + computedMax + 2 * vh}px`;
        }
      }
      const maxScroll = maxScrollRef.current;

      // Randomize circle symbol on scroll (throttled 80ms)
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        if (now - lastSymbolTime >= 80 && circleSymbolRef.current) {
          lastSymbolTime = now;
          const current = circleSymbolRef.current.textContent || '8';
          const candidates = CIRCLE_SYMBOLS.filter((s) => s !== current);
          const next =
            candidates[Math.floor(Math.random() * candidates.length)] ||
            CIRCLE_SYMBOLS[0];
          circleSymbolRef.current.textContent = next;
        }
      }

      // Hide video container once scroll passes first viewport height
      if (mainCanvasRef.current) {
        mainCanvasRef.current.style.visibility =
          scrollY >= vh ? 'hidden' : 'visible';
      }

      // Desktop cursor-driven video scrubbing with dead zone
      const useDesktopScrub = width >= 1024 && !isTouch;
      if (useDesktopScrub && scrollY < vh && mouseXRef.current !== null) {
        const leftVid = leftVideoRef.current;
        const rightVid = rightVideoRef.current;
        if (leftVid && rightVid) {
          const center = width / 2;
          const deadZone = Math.max(30, width * 0.05);
          const mx = mouseXRef.current;
          const distFromCenter = mx - center;

          if (Math.abs(distFromCenter) <= deadZone) {
            // Inside dead zone: keep both videos at currentTime = 0 and show whichever was last active
            if (!leftVid.seeking && leftVid.currentTime !== 0) {
              leftVid.currentTime = 0;
            }
            if (!rightVid.seeking && rightVid.currentTime !== 0) {
              rightVid.currentTime = 0;
            }
            if (activeSideRef.current === 'left') {
              leftVid.style.display = 'block';
              rightVid.style.display = 'none';
            } else {
              leftVid.style.display = 'none';
              rightVid.style.display = 'block';
            }
          } else if (distFromCenter < -deadZone) {
            // Left of dead zone: show RIGHT video, scrub from center-left-edge to left edge
            activeSideRef.current = 'right';
            rightVid.style.display = 'block';
            leftVid.style.display = 'none';
            const available = Math.max(1, center - deadZone);
            const distance = center - deadZone - mx;
            const progress = Math.min(1, Math.max(0, distance / available));
            if (
              rightVid.duration &&
              !Number.isNaN(rightVid.duration) &&
              !rightVid.seeking
            ) {
              rightVid.currentTime = progress * rightVid.duration;
            }
          } else {
            // Right of dead zone: show LEFT video, scrub from center+deadZone to right edge
            activeSideRef.current = 'left';
            leftVid.style.display = 'block';
            rightVid.style.display = 'none';
            const available = Math.max(1, width - (center + deadZone));
            const distance = mx - (center + deadZone);
            const progress = Math.min(1, Math.max(0, distance / available));
            if (
              leftVid.duration &&
              !Number.isNaN(leftVid.duration) &&
              !leftVid.seeking
            ) {
              leftVid.currentTime = progress * leftVid.duration;
            }
          }
        }
      }

      // Phase 1 & Phase 2: Black panel and inner wrapper transforms + card scaling
      if (panel && wrap) {
        const panelOffset = scrollY <= vh ? vh - scrollY : 0;
        panel.style.transform = `translateY(${panelOffset}px)`;

        const phase2Offset = scrollY > vh ? scrollY - vh : 0;
        wrap.style.transform = `translateY(${-phase2Offset}px)`;

        const cards = wrap.querySelectorAll<HTMLElement>('.bp-card');
        cards.forEach((card) => {
          const cardTopInWrap = card.offsetTop;
          const cardHeight = card.offsetHeight;
          const top =
            scrollY <= vh
              ? cardTopInWrap + panelOffset
              : cardTopInWrap - phase2Offset;
          const bottom = top + cardHeight;

          if (bottom <= 0 || top >= vh) {
            card.style.transform = 'scale(0)';
          } else {
            const enter = Math.min(1, (vh - top) / (vh * 0.6));
            const exit = Math.min(1, bottom / (vh * 0.4));
            const scale = Math.max(0, Math.min(enter, exit));
            card.style.transform = `scale(${scale})`;
          }
        });
      }

      // Outro phase (scrollY > vh + maxScroll)
      const outroStart = vh + maxScroll;
      const outroProgress =
        scrollY > outroStart
          ? Math.min(1, Math.max(0, (scrollY - outroStart) / Math.max(1, vh - 100)))
          : 0;

      if (outroOverlayRef.current) {
        outroOverlayRef.current.style.opacity = `${outroProgress}`;
      }
      if (outroInfoRef.current) {
        const offset = Number(outroInfoRef.current.dataset.outroOffset || 166);
        outroInfoRef.current.style.transform = `translateY(${-offset * outroProgress}px)`;
      }
      if (outroBuyRef.current) {
        outroBuyRef.current.style.transform = `scale(${outroProgress})`;
      }
      if (outroFooterRef.current) {
        outroFooterRef.current.style.opacity = `${outroProgress}`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isTouch, cols]);

  return (
    <div
      id="scroll-spacer"
      ref={spacerRef}
      className="relative bg-white select-none"
      style={{
        height: '500vh',
        cursor: isDesktop && !isTouch ? 'none' : 'auto',
      }}
    >
      <h1 className="sr-only">prmpt — ARCHIVE COLLECTION &quot;PROMPT&quot;</h1>

      {/* 1A. Custom Cursor (Desktop Only) */}
      {isDesktop && !isTouch && (
        <div
          id="custom-cursor"
          ref={cursorRef}
          className="fixed pointer-events-none z-50 mix-blend-exclusion"
          style={{
            left: '-100px',
            top: '-100px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="24"
              cy="24"
              r="22.75"
              stroke="white"
              strokeWidth="2.5"
            />
            <path
              d="M22.75 11.5H25.25V18.8L31.4 12.65L33.17 14.42L27.02 20.57H36.5V23.07H25.8V25.25H35.5V27.75H27.2L33.55 34.1L31.78 35.87L25.25 29.34V36.5H22.75V29.34L16.22 35.87L14.45 34.1L20.8 27.75H12.5V25.25H22.2V23.07H11.5V20.57H20.98L14.83 14.42L16.6 12.65L22.75 18.8V11.5Z"
              fill="white"
            />
          </svg>
        </div>
      )}

      {/* 1B. Logo (Top Left) */}
      <motion.div
        id="hero-logo"
        className="fixed pointer-events-none z-20 mix-blend-exclusion"
        style={{
          top: isMobile ? 16 : 32,
          left: isMobile ? 16 : 32,
          width: isMobile ? 124 : isTablet ? 266 : 355,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ENTRY_EASE, delay: 0 }}
      >
        <svg
          viewBox="0 0 355 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          role="img"
          aria-label="prmpt"
        >
          {/* p */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 22H16.5V29.8C20.2 24.1 26.8 20.5 35.2 20.5C51.4 20.5 62.5 33.4 62.5 52.5C62.5 71.6 51.4 84.5 35.2 84.5C26.8 84.5 20.2 80.9 16.5 75.2V108H0V22ZM31.2 34.2C22.4 34.2 16.2 41.4 16.2 52.5C16.2 63.6 22.4 70.8 31.2 70.8C40 70.8 46 63.6 46 52.5C46 41.4 40 34.2 31.2 34.2Z"
            fill="white"
          />
          {/* r */}
          <path
            d="M70 22H86V32.4C89.6 24.4 96.4 20.8 105.4 20.8C107.6 20.8 109.5 21 111 21.4V36.4C108.9 35.9 106.5 35.6 103.8 35.6C92.8 35.6 86.5 42.2 86.5 54.4V83H70V22Z"
            fill="white"
          />
          {/* m */}
          <path
            d="M116 22H132V29.6C135.8 23.6 142.2 20.5 150.4 20.5C158.9 20.5 165.4 24.1 168.8 30.8C173.1 24 180.2 20.5 189.2 20.5C202.8 20.5 211.5 29.2 211.5 44.2V83H195V46.8C195 38.2 190.4 34 183.4 34C176.1 34 171.2 39 171.2 47.6V83H154.8V46.8C154.8 38.2 150.2 34 143.2 34C135.9 34 132.5 39 132.5 47.6V83H116V22Z"
            fill="white"
          />
          {/* p */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M220 22H236.5V29.8C240.2 24.1 246.8 20.5 255.2 20.5C271.4 20.5 282.5 33.4 282.5 52.5C282.5 71.6 271.4 84.5 255.2 84.5C246.8 84.5 240.2 80.9 236.5 75.2V108H220V22ZM251.2 34.2C242.4 34.2 236.2 41.4 236.2 52.5C236.2 63.6 242.4 70.8 251.2 70.8C260 70.8 266 63.6 266 52.5C266 41.4 260 34.2 251.2 34.2Z"
            fill="white"
          />
          {/* t */}
          <path
            d="M296 4H312.5V22H325.5V34.8H312.5V62.4C312.5 68.2 315.2 70.4 320.8 70.4C322.6 70.4 324.2 70.2 325.5 69.9V83C322.8 83.7 319.5 84.2 315.8 84.2C302.4 84.2 296 77.6 296 64.2V34.8H286.5V22H296V4Z"
            fill="white"
          />
          {/* Circled R mark */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M341 6C333.268 6 327 12.268 327 20C327 27.732 333.268 34 341 34C348.732 34 355 27.732 355 20C355 12.268 348.732 6 341 6ZM341 8.6C334.704 8.6 329.6 13.704 329.6 20C329.6 26.296 334.704 31.4 341 31.4C347.296 31.4 352.4 26.296 352.4 20C352.4 13.704 347.296 8.6 341 8.6ZM336.5 13.2H341.8C344.7 13.2 346.5 14.8 346.5 17.3C346.5 19.2 345.4 20.6 343.6 21.1L346.8 26.8H343.9L341 21.5H339.1V26.8H336.5V13.2ZM339.1 15.4V19.4H341.5C343 19.4 343.9 18.6 343.9 17.4C343.9 16.2 343 15.4 341.5 15.4H339.1Z"
            fill="white"
          />
        </svg>
      </motion.div>

      {/* 1C. Caption (Below Logo, Left Side) */}
      <motion.p
        id="hero-caption"
        className="fixed pointer-events-none z-20 mix-blend-exclusion text-white font-medium"
        style={{
          left: isMobile ? 16 : 32,
          top: isMobile ? 118 : isTablet ? 180 : 244,
          width: isMobile
            ? 'calc(100vw - 32px)'
            : isTablet
              ? 'calc(50vw - 48px)'
              : 692,
          fontSize: 12,
          lineHeight: 1.4,
          letterSpacing: '-0.04em',
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ENTRY_EASE, delay: 0.3 }}
      >
        When switching between videos near the center, do not reset currentTime to
        0 abruptly. Add a small dead zone: if cursor is within +/-50px of center,
        keep both videos at currentTime = 0 and show whichever was last active.
      </motion.p>

      {/* 1D. Header Navigation (Top Right) */}
      <motion.header
        id="hero-nav"
        aria-label="Primary Navigation"
        className="fixed pointer-events-none z-20 mix-blend-exclusion flex flex-row justify-between items-center text-white"
        style={{
          top: isMobile ? 16 : 32,
          right: isMobile ? 16 : 32,
          width: isDesktop ? 330 : 'auto',
          height: 30,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ENTRY_EASE, delay: 0.15 }}
      >
        {!isMobile && (
          <span
            className="uppercase font-medium text-white"
            style={{ fontSize: 15, marginRight: isTablet ? 32 : 0 }}
          >
            ABOUT
          </span>
        )}
        <div
          className="flex flex-row items-center"
          style={{ gap: isDesktop ? 50 : 20 }}
        >
          <svg
            width={isDesktop ? 30 : 24}
            height={isDesktop ? 30 : 24}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M0 14H40" stroke="white" strokeWidth="2.5" />
            <path d="M0 26H40" stroke="white" strokeWidth="2.5" />
          </svg>
          <span
            className="font-medium text-white"
            style={{ fontSize: isDesktop ? 15 : 13 }}
          >
            [ CART ]
          </span>
        </div>
      </motion.header>

      {/* 1E. Product Info (Bottom Right) */}
      <motion.div
        id="outro-info"
        ref={outroInfoRef}
        data-outro-offset={isDesktop ? 166 : 132}
        className="fixed pointer-events-none z-20 mix-blend-exclusion flex flex-col items-center text-white"
        style={
          isDesktop
            ? { right: 32, bottom: 80, width: 330 }
            : { left: 0, right: 0, bottom: 48 }
        }
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ENTRY_EASE, delay: 0.45 }}
      >
        <div
          className="flex flex-col items-start"
          style={{
            width: isDesktop ? '100%' : 252,
            marginBottom: isDesktop ? 32 : 12,
          }}
        >
          <div
            className="relative flex items-center justify-center mb-2"
            style={{
              width: isDesktop ? 30 : 20,
              height: isDesktop ? 30 : 20,
            }}
          >
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                cx="20"
                cy="20"
                r="18.75"
                stroke="white"
                strokeWidth={isDesktop ? 2.5 : 2}
              />
            </svg>
            <span
              id="circle-symbol"
              ref={circleSymbolRef}
              className="absolute inset-0 flex items-center justify-center uppercase font-medium text-white"
              style={{
                fontSize: isDesktop ? 15 : 10,
                letterSpacing: '-0.04em',
              }}
            >
              8
            </span>
          </div>

          <div
            className="w-full text-center uppercase font-medium text-white"
            style={{
              fontSize: isDesktop ? 30 : 20,
              lineHeight: '100%',
              letterSpacing: '-0.04em',
            }}
          >
            ARCHIVE COLLECTION
            <br />
            &quot;PROMPT&quot;
          </div>
        </div>

        <div
          className="text-center font-medium text-white"
          style={{
            fontSize: isDesktop ? 80 : 60,
            lineHeight: '100%',
            letterSpacing: '-0.04em',
          }}
        >
          $97,33
        </div>
      </motion.div>

      {/* 1F. "View" Button (Bottom Right, Initially Hidden) */}
      <div
        id="outro-buy"
        ref={outroBuyRef}
        className="fixed pointer-events-none z-20 mix-blend-exclusion flex items-center justify-center bg-white"
        style={{
          ...(isDesktop
            ? { right: 32, bottom: 32, width: 330, height: 174 }
            : { left: 16, right: 16, bottom: 60, height: 100 }),
          borderRadius: 1335,
          transformOrigin: 'right bottom',
          transform: 'scale(0)',
        }}
      >
        <span
          className="font-medium text-white mix-blend-exclusion"
          style={{
            fontSize: isDesktop ? 110 : 72,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          view
        </span>
      </div>

      {/* 1G. Video Container */}
      <div
        id="main-canvas"
        ref={mainCanvasRef}
        className="fixed pointer-events-none z-0 overflow-hidden"
        style={{
          ...(isDesktop
            ? { inset: 0, width: '100%', height: '100%' }
            : {
                left: 0,
                top: 220,
                width: '100vw',
                height: 'calc(100vh - 220px)',
              }),
          opacity: videosLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <video
          id="left-video"
          ref={leftVideoRef}
          src={LEFT_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: 'none' }}
        />
        <video
          id="right-video"
          ref={rightVideoRef}
          src={RIGHT_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: 'block' }}
        />
      </div>

      {/* SECTION 2: Black Panel (Gallery) */}
      <section
        id="black-panel"
        ref={blackPanelRef}
        aria-label="Archive Collection Gallery"
        className="fixed inset-0 bg-black z-10 pointer-events-none overflow-hidden"
        style={{ transform: 'translateY(100vh)' }}
      >
        <div
          id="gallery-inner"
          ref={innerWrapRef}
          className="relative w-full"
          style={{ paddingTop: 'min(400px, 40vh)' }}
        >
          <div
            className="grid w-full"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {layoutRows.flatMap((row, rIdx) =>
              row.map((imgIdx, cIdx) => {
                const isLeftHalf = cIdx < cols / 2;
                const origin = isLeftHalf ? 'right bottom' : 'left bottom';
                if (imgIdx === -1) {
                  return (
                    <div
                      key={`spacer-${rIdx}-${cIdx}`}
                      className="aspect-[2/3] w-full"
                      aria-hidden="true"
                    />
                  );
                }
                return (
                  <div
                    key={`card-${rIdx}-${cIdx}-${imgIdx}`}
                    data-card-index={imgIdx}
                    className="bp-card aspect-[2/3] w-full overflow-hidden"
                    style={{
                      transform: 'scale(0)',
                      transformOrigin: origin,
                    }}
                  >
                    <img
                      src={GALLERY_IMAGES[imgIdx]}
                      alt={`prmpt archive piece ${imgIdx + 1}`}
                      className="w-full h-full object-cover block"
                      draggable={false}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* 1I. White Overlay */}
      <div
        id="outro-overlay"
        ref={outroOverlayRef}
        className="fixed inset-0 pointer-events-none z-12 bg-white"
        style={{ opacity: 0 }}
      />

      {/* 1J. Footer */}
      <footer
        id="outro-footer"
        ref={outroFooterRef}
        className="fixed pointer-events-none z-20 mix-blend-exclusion flex flex-row items-center uppercase font-medium text-white"
        style={{
          left: 16,
          right: isDesktop ? 'auto' : 16,
          bottom: isDesktop ? 32 : 24,
          gap: isDesktop ? 80 : undefined,
          justifyContent: isDesktop ? 'flex-start' : 'space-between',
          fontSize: isDesktop ? 13 : 11,
          letterSpacing: '-0.02em',
          opacity: 0,
        }}
      >
        <span>PRMPT (R) 2026</span>
        <span>PRIVACY POLICY</span>
      </footer>
    </div>
  );
}
