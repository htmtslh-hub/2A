import React, { useEffect, useState } from 'react';

type NavKey = 'platform' | 'solutions' | 'company' | 'support';

interface NavDetail {
  key: NavKey;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  bullets: string[];
}

const NAV_ITEMS: NavDetail[] = [
  {
    key: 'platform',
    title: 'zero-knowledge data vault platform',
    summary:
      'end-to-end client-side encryption, hardware-backed key shards, and deterministic audit trails built for modern cloud workloads.',
    metrics: [
      { value: '< 1.4ms', label: 'edge encryption latency' },
      { value: '99.999%', label: 'vault SLA uptime' },
    ],
    bullets: [
      'envelope encryption with customer-managed root keys',
      'automated pii tokenization across postgres, s3, and event streams',
      'real-time anomaly quarantine before exfiltration occurs',
    ],
  },
  {
    key: 'solutions',
    title: 'privacy infrastructure for every stack',
    summary:
      'drop-in sdks and proxy gateways that guard sensitive payloads across fintech, healthcare, and ai training pipelines.',
    metrics: [
      { value: '+65k', label: 'startups use' },
      { value: '+1.5b', label: 'gb data was protected' },
    ],
    bullets: [
      'compliant vaulting for hipaa, soc 2 type ii, and gdpr',
      'redacted vector embeddings and confidential llm inference',
      'cross-region sovereign storage with zero plaintext exposure',
    ],
  },
  {
    key: 'company',
    title: 'engineered for uncompromising privacy',
    summary:
      'founded by distributed systems cryptographers dedicated to making zero-trust data custody effortless for every engineering team.',
    metrics: [
      { value: '42', label: 'global edge regions' },
      { value: '+300k', label: 'downloads' },
    ],
    bullets: [
      'independent quarterly cryptographic audits published openly',
      'open-source cli and verifiable client builds',
      '24/7 distributed security operations across 4 continents',
    ],
  },
  {
    key: 'support',
    title: 'direct cryptographic engineering support',
    summary:
      'work directly with security architects for threat modeling, key rotation drills, and zero-downtime migration.',
    metrics: [
      { value: '< 8min', label: 'median response time' },
      { value: '24/7', label: 'incident response desk' },
    ],
    bullets: [
      'dedicated slack connect channel with core vault engineers',
      'automated compliance evidence packs and key attestation logs',
      'step-by-step migration blueprints for legacy databases',
    ],
  },
];

export function App() {
  const [activeModal, setActiveModal] = useState<NavKey | 'get-started' | null>(null);
  const [workspaceEmail, setWorkspaceEmail] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'eu-central' | 'us-east' | 'ap-northeast'>('eu-central');
  const [provisioned, setProvisioned] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const currentNavDetail = NAV_ITEMS.find((item) => item.key === activeModal);

  const handleProvisionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!workspaceEmail.trim()) return;
    setProvisioned(true);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />

      {/* Navbar */}
      <nav
        className="absolute z-20 px-6 md:px-10 pt-6 top-0 left-0 right-0 flex items-center justify-between gap-4"
        aria-label="primary navigation"
      >
        {/* Left pill */}
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            setActiveModal(null);
          }}
          className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3"
        >
          <svg
            viewBox="0 0 256 256"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z"
              fill="#ffffff"
            />
          </svg>
          <span className="text-white text-sm font-normal tracking-tight">
            securify
          </span>
        </a>

        {/* Center pill (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              id={`securify-nav-${item.key}`}
              href={`#${item.key}`}
              onClick={(event) => {
                event.preventDefault();
                setActiveModal((prev) => (prev === item.key ? null : item.key));
              }}
              className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"
            >
              {item.key}
            </a>
          ))}
        </div>

        {/* Right button */}
        <button
          type="button"
          id="securify-get-started-btn"
          onClick={() => {
            setProvisioned(false);
            setActiveModal((prev) => (prev === 'get-started' ? null : 'get-started'));
          }}
          className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          get started
        </button>
      </nav>

      {/* Foreground content wrapper */}
      <div className="relative h-full w-full">
        {/* Three giant staggered headline words */}
        <h1 className="hero-title absolute left-4 md:left-10 top-[18%] text-white font-medium text-[14vw] md:text-[13vw]">
          protect
        </h1>
        <h1 className="hero-title absolute right-4 md:right-10 top-[38%] text-white font-medium text-[14vw] md:text-[13vw]">
          your
        </h1>
        <h1 className="hero-title absolute left-[18%] md:left-[28%] top-[58%] text-white font-medium text-[14vw] md:text-[13vw]">
          data
        </h1>

        {/* Description paragraph */}
        <p className="absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90">
          we can guarding your data with utmost care, empowering you with privacy everywhere
        </p>

        {/* Stat block — top-right */}
        <div className="absolute right-6 md:right-24 top-[14%]">
          <div className="flex items-center gap-3 justify-end">
            <span
              className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]"
              aria-hidden="true"
            />
            <span className="text-4xl md:text-5xl font-medium tracking-tight">
              +65k
            </span>
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 text-right">
            startups use
          </p>
        </div>

        {/* Bottom gradient overlay */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black"
          aria-hidden="true"
        />

        {/* Stat block — bottom-left */}
        <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl font-medium tracking-tight">
              +1.5b
            </span>
            <span
              className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]"
              aria-hidden="true"
            />
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1">
            gb data was protected
          </p>
        </div>

        {/* Stat block — bottom-right */}
        <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20">
          <div className="flex items-center gap-3 justify-end">
            <span
              className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]"
              aria-hidden="true"
            />
            <span className="text-4xl md:text-5xl font-medium tracking-tight">
              +300k
            </span>
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 text-right">
            downloads
          </p>
        </div>
      </div>

      {/* Monochrome Modal Overlay for Nav Links & Get Started */}
      {activeModal !== null && (
        <div
          id="securify-modal"
          role="dialog"
          aria-modal="true"
          aria-label={
            activeModal === 'get-started'
              ? 'get started with securify'
              : currentNavDetail?.title ?? 'securify details'
          }
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur px-6"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-neutral-900/90 backdrop-blur p-6 md:p-8 text-white border border-white/15"
          >
            {currentNavDetail && (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-white/70 px-3 py-1 rounded-full bg-black/60">
                    securify / {currentNavDetail.key}
                  </span>
                  <button
                    type="button"
                    id="securify-modal-close"
                    onClick={() => setActiveModal(null)}
                    className="text-xs text-neutral-300 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-black/60 cursor-pointer"
                  >
                    close [esc]
                  </button>
                </div>

                <h2 className="mt-4 text-2xl md:text-3xl font-medium tracking-tight">
                  {currentNavDetail.title}
                </h2>
                <p className="mt-2 text-sm text-white/90 leading-relaxed">
                  {currentNavDetail.summary}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {currentNavDetail.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl bg-black/60 p-4 border border-white/10"
                    >
                      <div className="text-2xl font-medium tracking-tight text-white">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-xs text-white/70">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="mt-5 space-y-2 text-sm text-white/90">
                  {currentNavDetail.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    {NAV_ITEMS.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveModal(tab.key)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                          tab.key === currentNavDetail.key
                            ? 'bg-white text-black'
                            : 'text-neutral-300 hover:text-white bg-black/50'
                        }`}
                      >
                        {tab.key}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setProvisioned(false);
                      setActiveModal('get-started');
                    }}
                    className="bg-white text-black text-xs font-normal rounded-full px-4 py-2 hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    get started
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'get-started' && (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-white/70 px-3 py-1 rounded-full bg-black/60">
                    securify / vault initialization
                  </span>
                  <button
                    type="button"
                    id="securify-modal-close"
                    onClick={() => setActiveModal(null)}
                    className="text-xs text-neutral-300 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-black/60 cursor-pointer"
                  >
                    close [esc]
                  </button>
                </div>

                <h2 className="mt-4 text-2xl md:text-3xl font-medium tracking-tight">
                  deploy your zero-knowledge vault
                </h2>
                <p className="mt-2 text-sm text-white/90 leading-relaxed">
                  initialize an isolated encryption cluster with hardware-backed keys in under 60 seconds.
                </p>

                {!provisioned ? (
                  <form onSubmit={handleProvisionSubmit} className="mt-5 space-y-4">
                    <div>
                      <label
                        htmlFor="securify-email-input"
                        className="block text-xs text-white/70 mb-1.5"
                      >
                        work email
                      </label>
                      <input
                        id="securify-email-input"
                        type="email"
                        required
                        value={workspaceEmail}
                        onChange={(event) => setWorkspaceEmail(event.target.value)}
                        placeholder="security@company.com"
                        className="w-full rounded-full bg-black/70 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <span className="block text-xs text-white/70 mb-1.5">
                        sovereign key region
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['eu-central', 'us-east', 'ap-northeast'] as const).map((region) => (
                          <button
                            key={region}
                            type="button"
                            onClick={() => setSelectedRegion(region)}
                            className={`rounded-full py-2 px-3 text-xs transition-colors cursor-pointer ${
                              selectedRegion === region
                                ? 'bg-white text-black'
                                : 'bg-black/60 text-neutral-300 hover:text-white border border-white/15'
                            }`}
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="text-neutral-300 hover:text-white transition-colors text-sm px-4 py-2.5 rounded-full cursor-pointer"
                      >
                        cancel
                      </button>
                      <button
                        type="submit"
                        id="securify-provision-submit"
                        className="bg-white text-black text-sm font-normal rounded-full px-6 py-2.5 hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        initialize vault
                      </button>
                    </div>
                  </form>
                ) : (
                  <div
                    id="securify-provision-success"
                    className="mt-5 rounded-2xl bg-black/70 border border-white/20 p-5"
                  >
                    <div className="text-sm font-medium text-white">
                      vault cluster ready in {selectedRegion}
                    </div>
                    <p className="mt-1 text-xs text-white/70 leading-relaxed">
                      attestation bundle and cli bootstrap token dispatched to {workspaceEmail}.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="bg-white text-black text-xs font-normal rounded-full px-5 py-2 hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
