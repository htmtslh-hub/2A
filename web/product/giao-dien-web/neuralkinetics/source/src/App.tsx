import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';

export const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type DomainTag = 'Advanced Bionics' | 'Cognitive AI';
export type FooterTag = 'Neuromorphic' | 'AGI' | 'Cybernetics';

export interface TelemetrySpec {
  code: string;
  summary: string;
  latency: string;
}

export const TELEMETRY_BY_TAG: Record<FooterTag, TelemetrySpec> = {
  Neuromorphic: {
    code: 'NRM-01',
    summary: '0.38ms Synaptic Fraud Shield · 190+ Countries',
    latency: '0.38 ms',
  },
  AGI: {
    code: 'AGI-02',
    summary: 'Autonomous Multi-Currency Treasury & Zero-FX Routing',
    latency: '0.41 ms',
  },
  Cybernetics: {
    code: 'CYB-03',
    summary: 'Biometric Titanium Hardware Enclave · ISO/IEC 27001',
    latency: '0.29 ms',
  },
};

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number; rail: string }> = {
  EUR: { symbol: '€', rate: 0.92, rail: 'SEPA Instant Neural Rail · 0% Markup' },
  GBP: { symbol: '£', rate: 0.79, rail: 'Faster Payments Core · 0% Markup' },
  JPY: { symbol: '¥', rate: 151.4, rail: 'Tokyo Quantum Clearing · 0% Markup' },
  SGD: { symbol: 'S$', rate: 1.34, rail: 'FAST Asia-Pacific Mesh · 0% Markup' },
};

export const HOW_IT_WORKS_STEPS = [
  {
    index: '01',
    title: 'Biometric Neural Issuance',
    detail:
      'Pair your cryptographic identity in 45 seconds. An ephemeral virtual card activates immediately while your laser-milled titanium card dispatches worldwide.',
    metric: '45s issuance · Zero credit pull',
  },
  {
    index: '02',
    title: 'Cognitive Liquidity Routing',
    detail:
      'Every swipe is evaluated by our neuromorphic routing engine across 42 fiat and treasury rails, locking interbank spot rates with zero FX spread.',
    metric: '0.00% FX spread · 190+ countries',
  },
  {
    index: '03',
    title: 'Worldwide Zero-Limit Execution',
    detail:
      'Dynamic spending power adapts in real time to your verified treasury balance with hardware-isolated biometric approval for high-value settlements.',
    metric: 'No preset ceiling · 99.998% uptime',
  },
];

export function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeDomain, setActiveDomain] = useState<DomainTag>('Advanced Bionics');
  const [activeFooterTag, setActiveFooterTag] = useState<FooterTag>('Neuromorphic');
  const [menuOpen, setMenuOpen] = useState(false);
  const [systemsOpen, setSystemsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'features' | 'how' | null>(null);
  const [motionPaused, setMotionPaused] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<keyof typeof CURRENCY_RATES>('EUR');
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSystemsOpen(false);
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMotion = () => {
    setMotionPaused((prev) => {
      const next = !prev;
      const vid = videoRef.current;
      if (vid) {
        if (next) {
          vid.pause();
        } else {
          vid.play().catch(() => {});
        }
      }
      return next;
    });
  };

  const handleReserveSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reserveEmail.trim()) return;
    setReserved(true);
  };

  const currentTelemetry = TELEMETRY_BY_TAG[activeFooterTag];
  const currentRate = CURRENCY_RATES[selectedCurrency];
  const activeStep = HOW_IT_WORKS_STEPS[activeStepIdx];

  return (
    <div id="nk-hero-root" className="nk-hero">
      <a href="#nk-main-content" className="nk-skip-link">
        Skip to main content
      </a>

      {/* Fixed Top Navbar (z-index: 50, pointer-events: none on nav, auto on children) */}
      <motion.nav
        id="nk-navbar"
        className="nk-navbar"
        aria-label="Primary Navigation"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* Left Side: Logo + Menu Pill + Tags Pill */}
        <div className="nk-navbar-left">
          <a
            id="nk-brand-logo"
            href="#nk-hero-root"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setSystemsOpen(false);
            }}
            className="nk-logo-link"
            aria-label="NeuralKinetics Home"
          >
            {/* Custom SVG Icon: Two rotated rounded rectangles at -35deg, black fill */}
            <svg
              className="nk-logo-svg"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <rect
                x="4"
                y="6"
                width="13"
                height="6.5"
                rx="3.25"
                transform="rotate(-35 10.5 9.25)"
                fill="#000000"
              />
              <rect
                x="11"
                y="15.5"
                width="13"
                height="6.5"
                rx="3.25"
                transform="rotate(-35 17.5 18.75)"
                fill="#000000"
              />
            </svg>
            <span id="nk-brand-text" className="nk-brand-text">
              NeuralKinetics
            </span>
          </a>

          {/* Menu Button: black pill + white circle with Plus icon (lucide, size 12, strokeWidth 3) + "Menu" */}
          <button
            id="nk-menu-btn"
            type="button"
            className="nk-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="nk-menu-panel"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setSystemsOpen(false);
            }}
          >
            <span className="nk-circle-white" aria-hidden="true">
              <Plus size={12} strokeWidth={3} />
            </span>
            <span className="nk-menu-text">Menu</span>
          </button>

          {/* Tags Pill: light gray (#F4F4F6) rounded-full container with "Advanced Bionics" & "Cognitive AI" */}
          <div id="nk-nav-tags" className="nk-nav-tags" role="group" aria-label="Technology Domains">
            {(['Advanced Bionics', 'Cognitive AI'] as const).map((domain) => (
              <button
                key={domain}
                type="button"
                className={`nk-nav-tag-btn ${activeDomain === domain ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveDomain(domain);
                  setActiveFooterTag(domain === 'Advanced Bionics' ? 'Cybernetics' : 'AGI');
                }}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Light gray pill + black circle button (4-dot grid SVG) + "Adaptive Systems" */}
        <div className="nk-navbar-right">
          <button
            id="nk-adaptive-btn"
            type="button"
            className="nk-adaptive-pill"
            aria-label="Adaptive Systems"
            aria-expanded={systemsOpen}
            aria-controls="nk-systems-panel"
            onClick={() => {
              setSystemsOpen((prev) => !prev);
              setMenuOpen(false);
            }}
          >
            <span className="nk-circle-black" aria-hidden="true">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="3.5" cy="3.5" r="1.5" fill="#ffffff" />
                <circle cx="8.5" cy="3.5" r="1.5" fill="#ffffff" />
                <circle cx="3.5" cy="8.5" r="1.5" fill="#ffffff" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="#ffffff" />
              </svg>
            </span>
            <span id="nk-adaptive-label" className="nk-adaptive-label">
              Adaptive Systems
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Interactive Menu Drawer (+15% Creativity) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nk-menu-panel"
            className="nk-floating-panel nk-floating-panel--left"
            role="region"
            aria-label="NeuralKinetics Navigation Menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="nk-panel-header">
              <span className="nk-panel-eyebrow">NeuralKinetics Directory</span>
              <span className="nk-panel-badge">{activeDomain}</span>
            </div>
            <ul className="nk-menu-list">
              <li>
                <button
                  type="button"
                  className="nk-menu-item-btn"
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveModal('features');
                  }}
                >
                  <span className="nk-menu-item-left">
                    <span className="nk-menu-item-idx">01</span>
                    <span className="nk-menu-item-title">Zero-Limit Card Architecture</span>
                  </span>
                  <span className="nk-menu-item-meta">Specs →</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nk-menu-item-btn"
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveModal('how');
                  }}
                >
                  <span className="nk-menu-item-left">
                    <span className="nk-menu-item-idx">02</span>
                    <span className="nk-menu-item-title">How Synaptic Routing Works</span>
                  </span>
                  <span className="nk-menu-item-meta">3 Steps →</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nk-menu-item-btn"
                  onClick={() => {
                    setActiveFooterTag('Neuromorphic');
                    setMenuOpen(false);
                  }}
                >
                  <span className="nk-menu-item-left">
                    <span className="nk-menu-item-idx">03</span>
                    <span className="nk-menu-item-title">Neuromorphic Fraud Mesh</span>
                  </span>
                  <span className="nk-menu-item-meta">0.38 ms</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nk-menu-item-btn"
                  onClick={() => {
                    setActiveFooterTag('Cybernetics');
                    setMenuOpen(false);
                  }}
                >
                  <span className="nk-menu-item-left">
                    <span className="nk-menu-item-idx">04</span>
                    <span className="nk-menu-item-title">Biometric Titanium Core</span>
                  </span>
                  <span className="nk-menu-item-meta">v4.2</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Adaptive Systems Popover (+15% Creativity) */}
      <AnimatePresence>
        {systemsOpen && (
          <motion.div
            id="nk-systems-panel"
            className="nk-floating-panel nk-floating-panel--right"
            role="region"
            aria-label="Adaptive Systems Telemetry"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="nk-panel-header">
              <span className="nk-panel-eyebrow">Adaptive Systems Matrix</span>
              <span className="nk-panel-badge">{currentTelemetry.latency}</span>
            </div>
            <div className="nk-systems-list">
              <div className="nk-system-row">
                <span className="nk-system-name">Active Core Node</span>
                <span className="nk-system-val">{activeFooterTag}</span>
              </div>
              <div className="nk-system-row">
                <span className="nk-system-name">Global Settlement Rails</span>
                <span className="nk-system-val">190+ Countries · 0% FX</span>
              </div>
              <div className="nk-system-row">
                <span className="nk-system-name">Hardware Enclave Status</span>
                <span className="nk-system-val">99.998% Online</span>
              </div>
            </div>
            <button
              id="nk-motion-toggle"
              type="button"
              className="nk-motion-toggle-btn"
              onClick={handleToggleMotion}
            >
              {motionPaused ? 'Resume Background Video' : 'Pause Background Video'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Background Video Behind Everything (z-index: 0) */}
      <div className="nk-video-stage" aria-hidden="true">
        <motion.div
          id="nk-video-wrapper"
          className="nk-video-wrapper"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <video
            ref={videoRef}
            id="nk-bg-video"
            className="nk-video"
            src={VIDEO_URL}
            autoPlay
            muted
            playsInline
            loop
          />
        </motion.div>
      </div>

      {/* Footer Content Pinned to Bottom Over White Gradient (z-index: 30) */}
      <motion.main
        id="nk-main-content"
        className="nk-footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: EASE }}
      >
        <div className="nk-footer-inner">
          {/* Left Block: Subtitle + 2-Line Heading + Two Buttons */}
          <div className="nk-footer-left">
            <motion.div
              id="nk-subtitle"
              className="nk-subtitle"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            >
              <span className="nk-subtitle-dot" aria-hidden="true" />
              <span className="nk-subtitle-text">Best digital banking card 2026</span>
            </motion.div>

            <motion.h1
              id="nk-heading"
              className="nk-heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
            >
              <span className="nk-heading-line">One Card, Zero</span>
              <span className="nk-heading-line">Limits. Worldwide.</span>
            </motion.h1>

            <motion.div
              id="nk-cta-buttons"
              className="nk-cta-row"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
            >
              <button
                id="nk-see-features-btn"
                type="button"
                className="nk-btn-primary"
                onClick={() => setActiveModal('features')}
              >
                See Features
              </button>
              <button
                id="nk-how-it-works-btn"
                type="button"
                className="nk-btn-secondary"
                onClick={() => {
                  setReserved(false);
                  setActiveModal('how');
                }}
              >
                How It Works
              </button>
            </motion.div>
          </div>

          {/* Right Block: Live Spec Readout (+15% Creativity) + Three Tag Pills */}
          <div className="nk-footer-right">
            <div id="nk-telemetry-readout" className="nk-telemetry-pill" aria-live="polite">
              <span className="nk-telemetry-code">{currentTelemetry.code}</span>
              <span className="nk-telemetry-sep" aria-hidden="true" />
              <span>{currentTelemetry.summary}</span>
            </div>

            <div className="nk-tag-list" role="group" aria-label="Architecture Capabilities">
              {(['Neuromorphic', 'AGI', 'Cybernetics'] as const).map((tag) => (
                <button
                  key={tag}
                  id={`nk-tag-${tag.toLowerCase()}`}
                  type="button"
                  className={`nk-tag-pill ${activeFooterTag === tag ? 'is-active' : ''}`}
                  onClick={() => setActiveFooterTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.main>

      {/* Interactive Modal 1: "See Features" (+15% Creativity) */}
      <AnimatePresence>
        {activeModal === 'features' && (
          <motion.div
            id="nk-features-modal"
            className="nk-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nk-features-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="nk-modal-card"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nk-modal-top">
                <div>
                  <p className="nk-panel-eyebrow">NeuralKinetics Titanium v4.2</p>
                  <h2 id="nk-features-modal-title" className="nk-modal-title">
                    Engineered for Zero-Limit Global Autonomy
                  </h2>
                </div>
                <button
                  id="nk-modal-close-btn"
                  type="button"
                  className="nk-modal-close"
                  aria-label="Close features dialog"
                  onClick={() => setActiveModal(null)}
                >
                  ✕
                </button>
              </div>

              <div className="nk-feature-grid">
                <div className="nk-feature-box">
                  <h3 className="nk-feature-box-title">0% Global FX Markup</h3>
                  <p className="nk-feature-box-desc">
                    Direct interbank settlement across 190+ countries and 42 local clearing rails
                    with zero foreign exchange spread.
                  </p>
                </div>
                <div className="nk-feature-box">
                  <h3 className="nk-feature-box-title">Neuromorphic Fraud Shield</h3>
                  <p className="nk-feature-box-desc">
                    Sub-millisecond behavioral telemetry validates every transaction in 0.38ms
                    before authorization leaves the terminal.
                  </p>
                </div>
                <div className="nk-feature-box">
                  <h3 className="nk-feature-box-title">Adaptive Spending Power</h3>
                  <p className="nk-feature-box-desc">
                    No static credit ceiling—limits scale dynamically with your real-time multi-currency
                    treasury and liquidity reserves.
                  </p>
                </div>
                <div className="nk-feature-box">
                  <h3 className="nk-feature-box-title">Cybernetic Titanium Core</h3>
                  <p className="nk-feature-box-desc">
                    Precision-milled monochrome Grade-5 titanium with an isolated biometric NFC
                    cryptographic enclave.
                  </p>
                </div>
              </div>

              <div className="nk-fx-bar">
                <div className="nk-panel-header nk-panel-header--flush">
                  <span className="nk-panel-eyebrow">Live Interbank Spot Preview ($10,000 USD)</span>
                  <span className="nk-panel-badge">{currentRate.rail}</span>
                </div>
                <div className="nk-fx-controls">
                  {Object.keys(CURRENCY_RATES).map((code) => (
                    <button
                      key={code}
                      type="button"
                      className={`nk-fx-chip ${selectedCurrency === code ? 'is-active' : ''}`}
                      onClick={() => setSelectedCurrency(code)}
                    >
                      {code}
                    </button>
                  ))}
                </div>
                <p className="nk-fx-result">
                  $10,000 USD →{' '}
                  <strong>
                    {currentRate.symbol}
                    {(10000 * currentRate.rate).toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}{' '}
                    {selectedCurrency}
                  </strong>{' '}
                  <span className="nk-fx-note">(0.00% fee · Instant settlement)</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Modal 2: "How It Works" (+15% Creativity) */}
      <AnimatePresence>
        {activeModal === 'how' && (
          <motion.div
            id="nk-how-modal"
            className="nk-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nk-how-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="nk-modal-card"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nk-modal-top">
                <div>
                  <p className="nk-panel-eyebrow">3-Stage Architecture</p>
                  <h2 id="nk-how-modal-title" className="nk-modal-title">
                    How NeuralKinetics Works
                  </h2>
                </div>
                <button
                  id="nk-how-close-btn"
                  type="button"
                  className="nk-modal-close"
                  aria-label="Close how it works dialog"
                  onClick={() => setActiveModal(null)}
                >
                  ✕
                </button>
              </div>

              <div className="nk-step-tabs" role="tablist" aria-label="Onboarding Steps">
                {HOW_IT_WORKS_STEPS.map((step, idx) => (
                  <button
                    key={step.index}
                    type="button"
                    role="tab"
                    aria-selected={activeStepIdx === idx}
                    className={`nk-step-tab ${activeStepIdx === idx ? 'is-active' : ''}`}
                    onClick={() => setActiveStepIdx(idx)}
                  >
                    {step.index} · {step.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="nk-feature-box">
                <div className="nk-panel-header">
                  <span className="nk-panel-eyebrow">Stage {activeStep.index}</span>
                  <span className="nk-panel-badge">{activeStep.metric}</span>
                </div>
                <h3 className="nk-feature-box-title">{activeStep.title}</h3>
                <p className="nk-feature-box-desc">{activeStep.detail}</p>
              </div>

              {reserved ? (
                <div className="nk-feature-box nk-feature-box--spaced">
                  <h3 className="nk-feature-box-title">Priority Allocation Confirmed</h3>
                  <p className="nk-feature-box-desc">
                    Your NeuralKinetics Titanium dossier has been dispatched to{' '}
                    <strong>{reserveEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form className="nk-reserve-form" onSubmit={handleReserveSubmit}>
                  <label htmlFor="nk-reserve-email" className="nk-panel-eyebrow">
                    Request Priority Card Issuance
                  </label>
                  <input
                    id="nk-reserve-email"
                    type="email"
                    required
                    className="nk-input"
                    placeholder="founder@neuralkinetics.io"
                    value={reserveEmail}
                    onChange={(e) => setReserveEmail(e.target.value)}
                  />
                  <button type="submit" className="nk-btn-primary">
                    Reserve Titanium Card
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
