import { useEffect, useState, FormEvent } from 'react';
import { ArrowUpRight, Award, Crown, X } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4';

const NAV_LINKS = ['Projects', 'Studio', 'Offerings', 'Inquire'] as const;

const CASE_STUDIES = [
  {
    code: '01 / FLAGSHIP',
    client: 'KINETIC LABS',
    category: 'Brand Architecture & 3D WebGL',
    metric: '+340% Conversion Lift',
    summary: 'Re-engineered a global robotics identity with real-time shader telemetry and modular typography.',
  },
  {
    code: '02 / IDENTITY',
    client: 'OBSIDIAN AUDIO',
    category: 'Industrial Design & Sonic Branding',
    metric: 'Red Dot Best of the Best',
    summary: 'Crafted a brutalist hardware packaging system and spatial product launch film.',
  },
  {
    code: '03 / PLATFORM',
    client: 'AETHER CAPITAL',
    category: 'Digital Flagship & Design System',
    metric: '$1.8B AUM Onboarded',
    summary: 'Built a high-contrast institutional design language and interactive portfolio terminal.',
  },
] as const;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState<'work' | 'inquire' | null>(null);
  const [selectedScope, setSelectedScope] = useState('Brand Identity & Strategy');
  const [clientEmail, setClientEmail] = useState('');
  const [submittedBrief, setSubmittedBrief] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setActiveSheet(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleBriefSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedBrief(true);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white font-inter">
      {/* Fullscreen Background Video */}
      <video
        id="vanguard-bg-video"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle directional contrast veil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"
      />

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between">
        {/* Navbar */}
        <header className="w-full px-6 sm:px-10 lg:px-16 py-5 lg:py-7">
          <nav aria-label="Primary Navigation" className="flex items-center justify-between">
            {/* Left: Brand Name */}
            <a
              href="#top"
              className="font-podium text-white font-bold uppercase text-2xl sm:text-3xl tracking-wider"
            >
              VANGUARD
            </a>

            {/* Center: Nav Links (hidden below md) */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {NAV_LINKS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSheet(item === 'Inquire' ? 'inquire' : 'work');
                  }}
                  className="font-inter text-sm text-white/80 tracking-widest uppercase hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right: GET IN TOUCH bordered button (hidden below md) */}
            <a
              href="#inquire"
              id="desktop-inquire-btn"
              onClick={(e) => {
                e.preventDefault();
                setActiveSheet('inquire');
              }}
              className="hidden md:inline-flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-3 text-xs font-inter tracking-widest uppercase text-white hover:bg-white/10 transition-all"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Right: Hamburger button (visible below md) */}
            <button
              type="button"
              id="mobile-menu-trigger"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col items-end justify-center space-y-1.5 p-2 -mr-2 cursor-pointer"
            >
              <div className="w-6 h-0.5 bg-white" />
              <div className="w-6 h-0.5 bg-white" />
              <div className="w-4 h-0.5 bg-white" />
            </button>
          </nav>
        </header>

        {/* Hero Content (vertically centered, left-aligned) */}
        <main className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pb-6 sm:pb-8">
          {/* 1. Tagline */}
          <div className="animate-fade-up flex items-center gap-2.5 mb-6 lg:mb-8">
            <Crown className="w-4 h-4 text-white/70 shrink-0" />
            <span className="text-white/70 text-xs sm:text-sm font-inter tracking-[0.3em] uppercase">
              World-Class Digital Collective
            </span>
          </div>

          {/* 2. Main Heading */}
          <h1 className="animate-fade-up-delay-1 font-podium text-white font-bold uppercase leading-[0.92] tracking-tight text-[clamp(2.8rem,8vw,7rem)]">
            <span className="block">Design.</span>
            <span className="block">Disrupt.</span>
            <span className="block">Conquer.</span>
          </h1>

          {/* 3. Subtext */}
          <p className="animate-fade-up-delay-2 mt-6 lg:mt-8 text-white/70 text-sm sm:text-base font-inter leading-relaxed max-w-md">
            We build fierce brand identities
            <br />
            that don&apos;t just turn heads --{' '}
            <span className="font-bold text-white">they lead.</span>
          </p>

          {/* 4. CTA Row */}
          <div className="animate-fade-up-delay-3 mt-8 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#projects"
              id="see-our-work-btn"
              onClick={(e) => {
                e.preventDefault();
                setActiveSheet('work');
              }}
              className="group inline-flex items-center gap-2.5 bg-black hover:bg-neutral-900 text-white font-inter px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase transition-colors"
            >
              <span>SEE OUR WORK</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="hidden sm:flex items-center gap-3">
              <Award className="w-8 h-8 text-white/50 shrink-0" />
              <div className="text-white/60 text-xs font-inter tracking-wider uppercase leading-snug">
                <div>Top-Rated</div>
                <div>Brand Studio</div>
              </div>
            </div>
          </div>

          {/* 5. Stats Row */}
          <div className="animate-fade-up-delay-4 mt-8 sm:mt-10 lg:mt-14 flex flex-wrap gap-6 sm:gap-12 lg:gap-16">
            <div>
              <div className="font-inter text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                250+
              </div>
              <div className="font-inter text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1">
                Brands Transformed
              </div>
            </div>

            <div>
              <div className="font-inter text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                95%
              </div>
              <div className="font-inter text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1">
                Client Retention
              </div>
            </div>

            <div>
              <div className="font-inter text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                10+
              </div>
              <div className="font-inter text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1">
                Years in the Game
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay (below md only) */}
      <div
        id="mobile-menu-overlay"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-50 md:hidden bg-black/95 backdrop-blur-sm flex flex-col justify-between transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Header row matching navbar */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5">
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="font-podium text-white font-bold uppercase text-2xl sm:text-3xl tracking-wider"
          >
            VANGUARD
          </a>
          <button
            type="button"
            id="mobile-menu-close"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="p-2 -mr-2 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Centered vertically: 4 nav links + GET IN TOUCH button */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          {NAV_LINKS.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                transitionDelay: `${i * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
              className="font-podium text-4xl sm:text-5xl text-white uppercase tracking-wider hover:text-white/75 transition-all duration-500"
            >
              {item}
            </a>
          ))}

          <a
            href="#inquire"
            onClick={() => setMenuOpen(false)}
            style={{
              transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
            className="mt-4 inline-flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-3 text-xs font-inter tracking-widest uppercase text-white hover:bg-white/10 transition-all duration-500"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="px-6 sm:px-10 py-6 text-center text-[11px] font-inter tracking-[0.25em] uppercase text-white/40">
          World-Class Digital Collective
        </div>
      </div>

      {/* 15% Creative Agency Dossier & Inquiry Drawer */}
      {activeSheet && (
        <div
          id="vanguard-dossier-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vanguard-dossier-title"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveSheet(null);
          }}
        >
          <div className="relative w-full max-w-2xl border border-white/20 bg-neutral-950/95 p-6 sm:p-8 text-white shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-white/70" />
                <span
                  id="vanguard-dossier-title"
                  className="font-inter text-xs tracking-[0.28em] uppercase text-white/70"
                >
                  {activeSheet === 'work' ? 'Selected Works & Capabilities' : 'Initiate a Project Brief'}
                </span>
              </div>
              <button
                type="button"
                id="close-dossier-btn"
                aria-label="Close modal"
                onClick={() => setActiveSheet(null)}
                className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 flex gap-3 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => setActiveSheet('work')}
                className={`px-4 py-2 text-xs font-inter tracking-widest uppercase transition-colors cursor-pointer ${
                  activeSheet === 'work'
                    ? 'bg-white text-black font-semibold'
                    : 'border border-white/25 text-white/70 hover:text-white'
                }`}
              >
                Selected Works
              </button>
              <button
                type="button"
                id="switch-inquire-tab"
                onClick={() => setActiveSheet('inquire')}
                className={`px-4 py-2 text-xs font-inter tracking-widest uppercase transition-colors cursor-pointer ${
                  activeSheet === 'inquire'
                    ? 'bg-white text-black font-semibold'
                    : 'border border-white/25 text-white/70 hover:text-white'
                }`}
              >
                Start a Brief
              </button>
            </div>

            {activeSheet === 'work' ? (
              <div className="mt-6 space-y-4">
                {CASE_STUDIES.map((study) => (
                  <div
                    key={study.client}
                    className="group border border-white/15 bg-white/[0.02] hover:bg-white/[0.05] p-4 sm:p-5 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-inter tracking-[0.25em] uppercase text-white/50">
                        {study.code}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-inter tracking-wider uppercase text-white/80">
                        <Award className="w-3.5 h-3.5 text-white/60" />
                        {study.metric}
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-4">
                      <h3 className="font-podium text-2xl sm:text-3xl uppercase tracking-wide text-white">
                        {study.client}
                      </h3>
                      <span className="text-xs font-inter uppercase tracking-widest text-white/60">
                        {study.category}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm font-inter text-white/70 leading-relaxed">
                      {study.summary}
                    </p>
                  </div>
                ))}

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveSheet('inquire')}
                    className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-3 text-xs font-inter tracking-widest uppercase text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <span>commission vanguard</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBriefSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="block text-xs font-inter tracking-widest uppercase text-white/60 mb-2">
                    Discipline & Scope
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Brand Identity & Strategy',
                      'Disruptive WebGL Flagship',
                      'Full-Scale Product Launch',
                    ].map((scope) => (
                      <button
                        key={scope}
                        type="button"
                        onClick={() => {
                          setSelectedScope(scope);
                          setSubmittedBrief(false);
                        }}
                        className={`px-3.5 py-2 text-xs font-inter tracking-wider uppercase border transition-colors cursor-pointer ${
                          selectedScope === scope
                            ? 'border-white bg-white text-black font-semibold'
                            : 'border-white/25 text-white/70 hover:border-white/60'
                        }`}
                      >
                        {scope}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="vanguard-email-input"
                    className="block text-xs font-inter tracking-widest uppercase text-white/60 mb-2"
                  >
                    Executive Contact Email
                  </label>
                  <input
                    id="vanguard-email-input"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      setSubmittedBrief(false);
                    }}
                    placeholder="founder@organization.com"
                    className="w-full border border-white/25 bg-black/60 px-4 py-3 text-sm font-inter text-white placeholder:text-white/35 focus:border-white focus:outline-none"
                  />
                </div>

                {submittedBrief && (
                  <div
                    id="vanguard-brief-confirmation"
                    className="border border-white/30 bg-white/10 px-4 py-3 text-xs font-inter tracking-wider uppercase text-white"
                  >
                    Dossier Dispatched — Producer assigned for {selectedScope}.
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-inter tracking-widest uppercase text-white/50">
                    Q4 / Q1 Partner Allocation Open
                  </span>
                  <button
                    type="submit"
                    id="submit-brief-btn"
                    className="group inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 px-6 py-3 text-xs font-inter font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    <span>TRANSMIT BRIEF</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
