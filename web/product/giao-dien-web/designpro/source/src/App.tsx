import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, Menu, X } from 'lucide-react';
import ShinyText from './components/ShinyText';

export const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';

export interface NavItem {
  label: string;
  href: string;
  hasArrow?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Courses', href: '#courses' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact us', href: '#contact-us', hasArrow: true },
];

export const COHORT_TRACKS = [
  'AI-Native Product Systems (8 Weeks)',
  'Design Leadership & Strategy (6 Weeks)',
  'Zero-to-One Craft & Prototyping (8 Weeks)',
];

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(COHORT_TRACKS[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setEnrollOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (item.hasArrow) {
      setSubmitted(false);
      setEnrollOpen(true);
    }
  };

  const handleEnrollSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) return;
    setSubmitted(true);
  };

  return (
    <main
      id="hero-section"
      className="relative w-full h-screen min-h-[600px] bg-black text-white overflow-hidden select-none"
    >
      {/* Full-screen looping video background */}
      <video
        id="hero-video"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Main Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 flex flex-col justify-between">
        {/* Top Block: Navigation Bar + Two-Column Sub-Header */}
        <div className="w-full">
          <header className="relative flex items-center justify-between gap-4">
            {/* Circular Logo + DesignPro Brand Text */}
            <a
              id="brand-logo"
              href="#home"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2.5 text-white group focus:outline-none"
            >
              <span className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              </span>
              <span className="text-white font-semibold text-lg tracking-tight">DesignPro</span>
            </a>

            {/* Desktop Navigation Pill Container */}
            <nav
              id="desktop-nav"
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-6 xl:gap-8 rounded-full border border-gray-700 bg-black/40 backdrop-blur-md px-6 xl:px-7 py-2.5"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  <span>{item.label}</span>
                  {item.hasArrow && (
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger Button (< lg) */}
            <button
              id="mobile-menu-button"
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-black/60 backdrop-blur-md text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.nav
                  id="mobile-nav-drawer"
                  aria-label="Mobile Navigation"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden absolute top-14 left-0 right-0 z-30 rounded-2xl border border-gray-700 bg-black/95 backdrop-blur-xl p-4 shadow-2xl"
                >
                  <ul className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item)}
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200"
                        >
                          <span>{item.label}</span>
                          {item.hasArrow && (
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              )}
            </AnimatePresence>
          </header>

          {/* Top Section (below nav): Two-column layout on lg+, stacked on mobile */}
          <div
            id="top-info-section"
            className="mt-5 sm:mt-6 lg:mt-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2.5 sm:gap-4"
          >
            <p
              id="top-left-copy"
              className="max-w-xl text-white/80 text-sm lg:text-base leading-relaxed"
            >
              We deliver transformative programs that empower emerging product designers with
              cutting-edge expertise and vision to thrive globally.
            </p>
            <p
              id="top-right-stat"
              className="text-white/80 text-sm lg:text-base lg:text-right shrink-0"
            >
              8000+ Talented Designers Launched !
            </p>
          </div>
        </div>

        {/* Center Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="my-auto flex flex-col items-center text-center py-4"
        >
          <p
            id="hero-eyebrow"
            className="uppercase text-white/80 text-xs lg:text-sm tracking-tight mb-4 sm:mb-6"
          >
            Seats for Next Program Opening Soon
          </p>

          <h1
            id="hero-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] tracking-tighter mb-7 sm:mb-10"
          >
            <span className="block text-white font-medium">Become</span>
            <ShinyText
              text="Product Leader."
              className="block font-medium pb-2"
              baseColor="#64CEFB"
              shineColor="#ffffff"
              speed={3}
              spread={100}
            />
          </h1>

          <button
            id="hero-cta"
            type="button"
            onClick={() => {
              setSubmitted(false);
              setEnrollOpen(true);
            }}
            className="group inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white text-sm sm:text-base font-medium rounded-full px-6 md:px-8 py-3 md:py-4 border border-gray-800 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <span>Apply for Next Enrollment</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </section>

        {/* Bottom Spacer to keep Hero vertically balanced inside h-screen */}
        <div className="hidden sm:block h-4" aria-hidden="true" />
      </div>

      {/* Enrollment Application Modal */}
      <AnimatePresence>
        {enrollOpen && (
          <motion.div
            id="enrollment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enrollment-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setEnrollOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-gray-700 bg-black p-6 sm:p-8 text-left shadow-2xl"
            >
              <button
                id="enrollment-modal-close"
                type="button"
                aria-label="Close enrollment dialog"
                onClick={() => setEnrollOpen(false)}
                className="absolute top-5 right-5 inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-white/80 hover:text-white hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <div className="py-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#64CEFB] mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Application Reserved
                  </h2>
                  <p className="text-sm text-white/80 mb-6">
                    Thank you, <span className="text-white font-medium">{applicantName}</span>. Our
                    admissions team has sent the syllabus and interview schedule for{' '}
                    <span className="text-[#64CEFB]">{selectedTrack}</span> to{' '}
                    <span className="text-white font-medium">{applicantEmail}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEnrollOpen(false)}
                    className="inline-flex items-center justify-center rounded-full bg-white text-black font-medium text-sm px-6 py-2.5 hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    Back to DesignPro
                  </button>
                </div>
              ) : (
                <>
                  <p className="uppercase text-xs tracking-tight text-[#64CEFB] mb-1">
                    Seats for Next Program Opening Soon
                  </p>
                  <h2
                    id="enrollment-modal-title"
                    className="text-2xl font-semibold text-white tracking-tight mb-2"
                  >
                    Apply for Next Enrollment
                  </h2>
                  <p className="text-sm text-white/80 mb-6">
                    Join 8000+ product designers mentored by global design leaders.
                  </p>

                  <form onSubmit={handleEnrollSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="applicant-name"
                        className="block text-xs uppercase tracking-tight text-white/80 mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        id="applicant-name"
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#64CEFB] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="applicant-email"
                        className="block text-xs uppercase tracking-tight text-white/80 mb-1.5"
                      >
                        Work or Portfolio Email
                      </label>
                      <input
                        id="applicant-email"
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="alex@designpro.studio"
                        className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#64CEFB] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="applicant-track"
                        className="block text-xs uppercase tracking-tight text-white/80 mb-1.5"
                      >
                        Program Track
                      </label>
                      <select
                        id="applicant-track"
                        value={selectedTrack}
                        onChange={(e) => setSelectedTrack(e.target.value)}
                        className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white focus:border-[#64CEFB] focus:outline-none"
                      >
                        {COHORT_TRACKS.map((track) => (
                          <option key={track} value={track}>
                            {track}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#64CEFB] text-black font-medium text-sm px-6 py-3 hover:bg-white transition-colors duration-200 cursor-pointer mt-2"
                    >
                      <span>Submit Enrollment Request</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
