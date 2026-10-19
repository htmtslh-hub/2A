import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FigurineItem {
  src: string;
  bg: string;
  panel: string;
}

const IMAGES: FigurineItem[] = [
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
  },
];

type CarouselRole = 'center' | 'left' | 'right' | 'back';

const GRAIN_SVG_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E\")";

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const lockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
      }
    };
  }, []);

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4
      );
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
      }
      lockTimerRef.current = window.setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        navigate('next');
      } else if (event.key === 'ArrowLeft') {
        navigate('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const getRole = (index: number): CarouselRole => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  const getRoleStyle = (role: CarouselRole): CSSProperties => {
    const baseTransition =
      'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)';

    if (role === 'center') {
      return {
        position: 'absolute',
        aspectRatio: '0.6 / 1',
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : 0,
        transition: baseTransition,
        willChange: 'transform, filter, opacity',
      };
    }

    if (role === 'left') {
      return {
        position: 'absolute',
        aspectRatio: '0.6 / 1',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '20%' : '30%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
        transition: baseTransition,
        willChange: 'transform, filter, opacity',
      };
    }

    if (role === 'right') {
      return {
        position: 'absolute',
        aspectRatio: '0.6 / 1',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '80%' : '70%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
        transition: baseTransition,
        willChange: 'transform, filter, opacity',
      };
    }

    return {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(4px)',
      opacity: 1,
      zIndex: 5,
      left: '50%',
      height: isMobile ? '13%' : '22%',
      bottom: isMobile ? '32%' : '12%',
      transition: baseTransition,
      willChange: 'transform, filter, opacity',
    };
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      data-active-index={activeIndex}
      data-panel-color={IMAGES[activeIndex].panel}
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <main
        className="relative w-full"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        {/* 1. Grain overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: GRAIN_SVG_DATA_URI,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* 2. Giant ghost text "3D SHAPE" */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: '18%' }}
        >
          <h1
            className="m-0 uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              color: '#ffffff',
              opacity: 1,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            3D SHAPE
          </h1>
        </div>

        {/* 3. Top-left brand label "TOONHUB" */}
        <header
          className="absolute top-6 left-4 sm:left-8"
          style={{ zIndex: 60 }}
        >
          <span
            className="text-xs font-semibold uppercase text-white block"
            style={{ opacity: 0.9, letterSpacing: '0.18em' }}
          >
            TOONHUB
          </span>
        </header>

        {/* 4. Carousel */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 3 }}
          aria-live="polite"
        >
          {IMAGES.map((item, index) => {
            const role = getRole(index);
            return (
              <div
                key={item.src}
                data-carousel-item={index}
                data-role={role}
                style={getRoleStyle(role)}
              >
                <img
                  src={item.src}
                  alt={`TOONHUB 3D character figurine ${index + 1}`}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: '320px' }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white"
            style={{ opacity: 0.95, letterSpacing: '0.02em' }}
          >
            TOONHUB FIGURINES
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm text-white mb-4 sm:mb-5"
            style={{ opacity: 0.85, lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
          <nav
            aria-label="Carousel navigation"
            className="flex items-center gap-3 sm:gap-4"
          >
            <button
              type="button"
              id="prev"
              data-prev
              aria-label="Previous figurine"
              onClick={() => navigate('prev')}
              className="toonhub-nav-btn w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              id="next"
              data-next
              aria-label="Next figurine"
              onClick={() => navigate('next')}
              className="toonhub-nav-btn w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </nav>
        </div>

        {/* 6. Bottom-right link "DISCOVER IT" */}
        <a
          href="#discover"
          onClick={(e) => {
            e.preventDefault();
            navigate('next');
          }}
          className="toonhub-discover-link absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-1.5 sm:gap-2 no-underline text-white uppercase"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          <span>DISCOVER IT</span>
          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </a>
      </main>
    </div>
  );
}
