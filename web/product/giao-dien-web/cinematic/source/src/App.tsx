import { useEffect, useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Menu,
  Play,
  Search,
  Star,
  User,
  X,
} from 'lucide-react';

export const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4';

export interface NavLinkItem {
  label: string;
  href: string;
  delay: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Movies', href: '#movies', delay: '100ms' },
  { label: 'TV Series', href: '#tv-series', delay: '150ms' },
  { label: "Editor's Pick", href: '#editors-pick', delay: '200ms' },
  { label: 'Interviews', href: '#interviews', delay: '250ms' },
  { label: 'User Reviews', href: '#user-reviews', delay: '300ms' },
];

export interface FeaturedSlide {
  rating: string;
  duration: string;
  releaseDate: string;
  title: string;
  description: string;
}

export const FEATURED_SLIDES: FeaturedSlide[] = [
  {
    rating: '8.7/10 IMDB',
    duration: '132 min',
    releaseDate: 'April, 2025',
    title: 'Step Through. Work Smarter.',
    description: 'A voyage through forgotten realms, where past and future intertwine.',
  },
  {
    rating: '9.1/10 IMDB',
    duration: '148 min',
    releaseDate: 'October, 2025',
    title: 'Beyond The Horizon Line.',
    description: 'An orbital expedition uncovers a silent civilization beneath frozen rings.',
  },
  {
    rating: '8.9/10 IMDB',
    duration: '118 min',
    releaseDate: 'January, 2026',
    title: 'Echoes Of Glass & Neon.',
    description: 'Two archivists race across a rain-lit metropolis to decode a lost signal.',
  },
];

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const currentSlide = FEATURED_SLIDES[slideIndex];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      } else if (e.key === 'ArrowRight') {
        setSlideIndex((prev) => (prev + 1) % FEATURED_SLIDES.length);
      } else if (e.key === 'ArrowLeft') {
        setSlideIndex((prev) => (prev - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % FEATURED_SLIDES.length);
  };

  return (
    <div
      id="hero-root"
      className="relative w-full h-screen overflow-hidden bg-black text-white flex flex-col select-none"
    >
      {/* Background Video (fixed at z-index 0) */}
      <video
        id="hero-video"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Bottom Blur Overlay (no gradient darkening, z-index 1) */}
      <div
        id="bottom-blur-overlay"
        className="fixed inset-0 z-[1] pointer-events-none backdrop-blur-xl bottom-blur-mask"
      />

      {/* Navbar (z-index 50, relative positioned) */}
      <header
        id="main-navbar"
        className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6"
      >
        {/* Left: Text Logo */}
        <a
          id="brand-logo"
          href="#home"
          onClick={(e) => e.preventDefault()}
          style={{ animationDelay: '0ms' }}
          className="h-8 md:h-10 flex items-center text-lg md:text-xl font-semibold tracking-[0.22em] uppercase text-white animate-blur-fade-up"
        >
          CINEMATIC
        </a>

        {/* Center: Desktop Navigation Links (hidden below lg) */}
        <nav
          id="desktop-nav"
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => e.preventDefault()}
              style={{ animationDelay: link.delay }}
              className="text-sm text-white hover:text-gray-300 transition-colors animate-blur-fade-up"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Search, Profile, and Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Search Button (visible on sm and up) */}
          <button
            id="desktop-search-btn"
            type="button"
            style={{ animationDelay: '350ms' }}
            className="hidden sm:inline-flex items-center gap-2 rounded-full liquid-glass px-4 md:px-6 py-2 text-sm text-white hover:text-gray-200 transition-colors cursor-pointer animate-blur-fade-up"
          >
            <Search size={18} />
            <span>Search</span>
          </button>

          {/* User/Profile Circle Button (visible on sm and up) */}
          <button
            id="desktop-user-btn"
            type="button"
            aria-label="User profile"
            style={{ animationDelay: '400ms' }}
            className="hidden sm:inline-flex w-10 h-10 rounded-full liquid-glass items-center justify-center text-white hover:text-gray-200 transition-colors cursor-pointer animate-blur-fade-up"
          >
            <User size={18} />
          </button>

          {/* Hamburger Menu Button (visible only below lg) */}
          <button
            id="mobile-menu-btn"
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{ animationDelay: '350ms' }}
            className="lg:hidden w-10 h-10 rounded-full liquid-glass inline-flex items-center justify-center text-white cursor-pointer animate-blur-fade-up"
          >
            <span className="relative w-[18px] h-[18px] flex items-center justify-center">
              <Menu
                size={18}
                className={`absolute transition-all duration-500 ease-out ${
                  mobileMenuOpen
                    ? 'rotate-180 opacity-0 scale-50'
                    : 'rotate-0 opacity-100 scale-100'
                }`}
              />
              <X
                size={18}
                className={`absolute transition-all duration-500 ease-out ${
                  mobileMenuOpen
                    ? 'rotate-0 opacity-100 scale-100'
                    : '-rotate-180 opacity-0 scale-50'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown (below lg breakpoint) */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden absolute top-[72px] left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl px-4 sm:px-6 py-4 transition-all duration-500 ease-out ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
              }}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`py-3 px-3 rounded-lg text-sm text-white hover:bg-gray-800/50 transition-all duration-300 ease-out ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Below sm: Search & Profile buttons in bordered bottom section */}
        <div className="sm:hidden mt-3 pt-3 border-t border-gray-800 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full liquid-glass px-4 py-2.5 text-sm text-white"
          >
            <Search size={18} />
            <span>Search</span>
          </button>
          <button
            type="button"
            aria-label="Mobile user profile"
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full liquid-glass inline-flex items-center justify-center text-white"
          >
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Hero Content (bottom of viewport, z-index 10) */}
      <main
        id="hero-content"
        className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Left Side (flex-1) */}
          <div className="flex-1">
            {/* Metadata Row (300ms) */}
            <div
              id="metadata-row"
              style={{ animationDelay: '300ms' }}
              className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm animate-blur-fade-up"
            >
              <span className="inline-flex items-center gap-2 font-medium">
                <Star size={16} className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                <span id="meta-rating">{currentSlide.rating}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16} />
                <span id="meta-duration">{currentSlide.duration}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} />
                <span id="meta-date">{currentSlide.releaseDate}</span>
              </span>
            </div>

            {/* Title (400ms) */}
            <h1
              id="hero-title"
              style={{ animationDelay: '400ms', letterSpacing: '-0.04em' }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6 animate-blur-fade-up"
            >
              {currentSlide.title}
            </h1>

            {/* Description (500ms) */}
            <p
              id="hero-description"
              style={{ animationDelay: '500ms' }}
              className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl animate-blur-fade-up"
            >
              {currentSlide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                id="watch-now-btn"
                type="button"
                style={{ animationDelay: '600ms' }}
                className="bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 inline-flex items-center gap-2.5 hover:bg-gray-200 transition-colors cursor-pointer animate-blur-fade-up"
              >
                <Play size={18} className="fill-black text-black" />
                <span>Watch Now</span>
              </button>

              <button
                id="learn-more-btn"
                type="button"
                style={{ animationDelay: '700ms' }}
                className="rounded-full font-medium liquid-glass px-6 sm:px-8 py-2.5 sm:py-3 text-white hover:text-gray-200 transition-colors cursor-pointer animate-blur-fade-up"
              >
                <span>Learn More</span>
              </button>
            </div>
          </div>

          {/* Right Side: Navigation Arrows (800ms & 900ms) */}
          <div className="w-full md:w-auto flex items-center justify-start md:justify-end gap-3 sm:gap-4">
            <button
              id="prev-btn"
              type="button"
              onClick={handlePrev}
              style={{ animationDelay: '800ms' }}
              className="rounded-full liquid-glass px-4 sm:px-6 py-2.5 sm:py-3 inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-gray-200 transition-colors cursor-pointer animate-blur-fade-up"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <button
              id="next-btn"
              type="button"
              onClick={handleNext}
              style={{ animationDelay: '900ms' }}
              className="rounded-full liquid-glass px-4 sm:px-6 py-2.5 sm:py-3 inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-gray-200 transition-colors cursor-pointer animate-blur-fade-up"
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
