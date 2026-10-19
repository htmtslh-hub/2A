import { useEffect, useRef, useState } from 'react';

interface VideoScene {
  index: string;
  label: string;
  url: string;
}

const VIDEOS: VideoScene[] = [
  {
    index: '01',
    label: 'WATER WAVE',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4',
  },
  {
    index: '02',
    label: 'GRIDWAVE',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4',
  },
  {
    index: '03',
    label: 'LIGHT TUNNEL',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4',
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [videoSources, setVideoSources] = useState<string[]>(() =>
    VIDEOS.map((v) => v.url)
  );
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const revealSectionRef = useRef<HTMLDivElement | null>(null);

  // Preload all 3 videos as blobs on mount and create object URLs, falling back to original URL on failure.
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const createdBlobUrls: string[] = [];

    VIDEOS.forEach((video, index) => {
      fetch(video.url, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          if (!isMounted) return;
          const objectUrl = URL.createObjectURL(blob);
          createdBlobUrls.push(objectUrl);
          const videoEl = videoRefs.current[index];
          // Only swap src if the element has not already started playing via range streaming
          if (!videoEl || videoEl.readyState < 2) {
            setVideoSources((prev) => {
              const next = [...prev];
              next[index] = objectUrl;
              return next;
            });
          }
        })
        .catch(() => {
          if (!isMounted) return;
          setVideoSources((prev) => {
            const next = [...prev];
            next[index] = video.url;
            return next;
          });
        });
    });

    return () => {
      isMounted = false;
      controller.abort();
      createdBlobUrls.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
    };
  }, []);

  // Ensure all stacked videos stay playing smoothly when switching scenes
  useEffect(() => {
    videoRefs.current.forEach((videoEl) => {
      if (videoEl && videoEl.paused) {
        videoEl.play().catch(() => {
          /* Autoplay policy handled silently */
        });
      }
    });
  }, [activeIndex, videoSources]);

  // Trigger revealUp / revealRight animations once via IntersectionObserver at 0.35 threshold
  useEffect(() => {
    const target = revealSectionRef.current;
    if (!target) {
      setIsRevealed(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const isSlideOne = activeIndex === 0;

  return (
    <main>
      <section
        aria-label="Viktor creative portfolio hero"
        className="relative min-h-screen w-full overflow-hidden bg-black text-white"
      >
        {/* Stacked Full-Screen Looping Videos with 1200ms Crossfade */}
        <div
          className="pointer-events-none absolute inset-0 z-0 animate-video-fade-in"
          aria-hidden="true"
        >
          {VIDEOS.map((video, idx) => (
            <video
              key={video.index}
              id={`hero-video-${idx}`}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={videoSources[idx]}
              muted
              autoPlay
              playsInline
              loop
              preload="auto"
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                activeIndex === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Subtle Dark Overlay at z-[1] */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/10"
          aria-hidden="true"
        />

        {/* Hero Foreground Content at z-[2] */}
        <div className="relative z-[2] mx-auto flex min-h-screen w-full max-w-[1340px] flex-col justify-end items-end gap-[150px] pt-[190px] px-[15px] mobile:justify-end mobile:items-start mobile:gap-[72px] mobile:pt-[140px] mobile:px-[18px]">
          {/* Section 1 - Video Switcher + Availability (upper area) */}
          <div className="flex w-full items-start justify-between mobile:flex-col mobile:items-start mobile:gap-7">
            {/* Left column (flex-[4]): Three video switcher buttons */}
            <div
              className="flex flex-[4] flex-col items-start gap-2.5"
              role="group"
              aria-label="Background video scene switcher"
            >
              {VIDEOS.map((video, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={video.index}
                    id={`switcher-btn-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-pressed={isActive}
                    className={`role-link flex items-baseline gap-1.5 text-left text-white uppercase cursor-pointer ${
                      isActive ? 'opacity-100' : 'opacity-55 hover:opacity-75'
                    }`}
                  >
                    <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium">
                      {video.index}
                    </span>
                    <span className="text-xs leading-4 tracking-[-0.12px] font-medium">
                      / {video.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right column (flex-1): Pulsing dot + "Available for work" */}
            <div
              className="flex flex-1 items-center gap-2.5 pl-[50px] md-tablet:pl-[24px] mobile:pl-0"
              role="status"
              aria-label="Availability status: Available for work"
            >
              <span
                id="availability-dot"
                aria-hidden="true"
                className={`h-[7px] w-[7px] shrink-0 rounded-full animate-dot-pulse transition-all duration-500 ${
                  isSlideOne
                    ? 'bg-[#F598F2] shadow-[0_0_10px_#F598F2,0_0_20px_rgba(245,152,242,0.75)]'
                    : 'bg-white shadow-[0_0_10px_#ffffff,0_0_20px_rgba(255,255,255,0.75)]'
                }`}
              />
              <span className="text-xs leading-4 tracking-[-0.12px] font-medium text-white">
                Available for work
              </span>
            </div>
          </div>

          {/* Section 2 - Name + CTA (bottom area, pb-[60px]) */}
          <div
            ref={revealSectionRef}
            className="flex w-full items-end justify-between pb-[60px] md-tablet:gap-[28px] md-tablet:pb-[52px] mobile:flex-col mobile:items-start mobile:gap-8 mobile:pb-11"
          >
            {/* Left column (flex-[2]): Giant name "Viktor." */}
            <div className="flex-[2]">
              <h1
                id="hero-title"
                className={`text-[200px] leading-[81%] tracking-[-6px] font-medium uppercase text-white select-none md-tablet:text-[129.6px] md-tablet:leading-[113.4px] md-tablet:tracking-[-7.7px] mobile:text-[clamp(68px,21vw,80px)] mobile:leading-[96px] mobile:tracking-[-4.8px] ${
                  isRevealed ? 'animate-reveal-up' : 'opacity-0 translate-y-[80px]'
                }`}
              >
                Viktor
                <span
                  id="hero-period"
                  className={`transition-colors duration-500 ${
                    isSlideOne ? 'text-[#F598F2]' : 'text-white'
                  }`}
                >
                  .
                </span>
              </h1>
            </div>

            {/* Right column (flex-1, pl-[50px]): Paragraph + "start a project" button */}
            <div className="flex flex-1 flex-col items-start gap-7 pl-[50px] md-tablet:pl-[24px] mobile:pl-0">
              <p
                id="hero-description"
                className={`text-base leading-6 tracking-[-0.16px] font-medium text-white mobile:max-w-[420px] ${
                  isRevealed
                    ? 'animate-reveal-right'
                    : 'opacity-0 translate-x-[100px]'
                }`}
              >
                I craft bold brands and modern websites with purpose — combining
                strategy, motion, and clean design to build memorable digital
                experiences.
              </p>

              <a
                id="start-project-btn"
                href="mailto:Davies@gmail.com?subject=Start%20a%20Project%20%E2%80%94%20Viktor."
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
                }}
                style={{ animationDelay: '0.08s' }}
                className={`cta-fill-btn inline-flex items-center justify-center px-6 py-3 text-sm leading-4 tracking-[-0.14px] font-medium lowercase cursor-pointer ${
                  isRevealed
                    ? 'animate-reveal-right'
                    : 'opacity-0 translate-x-[100px]'
                }`}
              >
                <span className="relative z-[1]">start a project</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
