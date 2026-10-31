/**
 * ForgeScore v2.0 (100/100 FORGEFRAME_GOLD) Bespoke Template Builders
 * for MotionSites Daily Agent (digitwist-ai-builder, dot, email-marketing, transform-data, and v2.0 multi-variant compiler).
 */

export function buildForgeScoreV2Template(spec, p, cutoutImg, renderSharedMotionRuntime) {
  // ============================================================================
  // 1. DIGITWIST AI BUILDER (t165 — Free Tier)
  // Dark Mode #05070e + #3054ff Electric Cobalt + #b4c0ff Periwinkle Gradient
  // Pre-headline: "Design at the speed of thought" (Instrument Serif)
  // Headline: "Build Faster" (Instrument Sans)
  // Live Interactive AI Prompt-to-Website Layout Sandbox + 5 Semantic Sections
  // ============================================================================
  if (spec.slug === 'digitwist-ai-builder') {
    const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_024949_c2df2ce2-00c2-4c26-84c6-210c14f3b98e.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Digitwist AI Builder — Design at the Speed of Thought</title>
  <meta name="description" content="Create fully functional, SEO-optimized websites in seconds with the Digitwist AI Builder engine.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #03050a;
      --surface: #0b101e;
      --surface-elevated: #131b31;
      --glass: rgba(11, 16, 30, 0.78);
      --fg: #f8fafc;
      --muted: #94a3b8;
      --border: rgba(180, 192, 255, 0.16);
      --accent: #3054ff;
      --accent-text: #b4c0ff;
      --accent-strong: #2040e0;
      --on-accent: #ffffff;
      --font-display: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Instrument Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 24px;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-sans);
      overflow-x: clip;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px;
      background: var(--accent); color: var(--on-accent);
      font-weight: 600; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid #ffffff; outline-offset: 3px; }
    a:focus-visible, button:focus-visible, input:focus-visible {
      outline: 2px solid var(--accent-text);
      outline-offset: 3px;
    }
    button, [role="button"], .${p}-interactive-btn {
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out), background-color 0.22s var(--ease-out), border-color 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active, .${p}-interactive-btn:active {
      transform: scale(0.97) translateY(1px);
    }
    .tabular-nums, [data-counter-target], .${p}-metric-val {
      font-variant-numeric: tabular-nums;
    }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); mix-blend-mode: difference;
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #ffffff; margin: -17px 0 0 -17px; transition: transform 0.18s var(--ease-out), background-color 0.22s var(--ease-out); }
    .${p}-cursor-ring.is-hovered { background: #ffffff; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent-text); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 220;
      padding: 16px clamp(20px, 4vw, 48px);
      background: linear-gradient(180deg, rgba(3, 5, 10, 0.88) 0%, rgba(3, 5, 10, 0) 100%);
    }
    .${p}-nav-container {
      max-width: 1320px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between; gap: 20px;
    }
    .${p}-brand {
      display: inline-flex; align-items: center; gap: 10px;
      color: var(--fg); text-decoration: none; font-weight: 700; font-size: 17px; letter-spacing: -0.02em;
    }
    .${p}-nav-links {
      display: flex; align-items: center; gap: 32px; list-style: none;
    }
    .${p}-nav-links a {
      color: rgba(248, 250, 252, 0.78); text-decoration: none; font-size: 14px; font-weight: 500;
      display: inline-flex; align-items: center; gap: 5px;
    }
    .${p}-nav-links a:hover { color: #ffffff; }
    .${p}-nav-actions { display: flex; align-items: center; gap: 12px; }
    .${p}-pill-ghost {
      padding: 9px 16px; border-radius: 999px; background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }
    .${p}-btn-get-started {
      padding: 10px 20px; border-radius: 999px; background: #ffffff; color: #05070e;
      border: none; font-size: 13px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 140px clamp(20px, 5vw, 64px) 84px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; overflow: hidden; isolation: isolate;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      z-index: -3; opacity: 0.45; pointer-events: none;
    }
    .${p}-hero-overlay {
      position: absolute; inset: 0; z-index: -2;
      background:
        radial-gradient(600px circle at 20% 0%, rgba(48, 84, 255, 0.24), transparent 70%),
        radial-gradient(520px circle at 80% 90%, rgba(99, 102, 241, 0.22), transparent 70%),
        rgba(3, 5, 10, 0.62);
    }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
    .${p}-pre-headline {
      font-family: var(--font-display); font-style: italic;
      font-size: clamp(28px, 4.2vw, 48px); line-height: 1.1; color: #ffffff;
      margin-bottom: 14px;
    }
    .${p}-main-h1 {
      font-family: var(--font-sans); font-weight: 600;
      font-size: clamp(56px, 10.5vw, 136px); line-height: 0.92; letter-spacing: -0.045em;
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 45%, #b4c0ff 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 24px;
    }
    .${p}-subheadline {
      font-size: clamp(17px, 2vw, 20px); line-height: 1.65; color: rgba(248, 250, 252, 0.72);
      max-width: 580px; margin: 0 auto 36px;
    }
    .${p}-cta-row {
      display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;
    }
    .${p}-primary-pill {
      display: inline-flex; align-items: center; gap: 14px;
      padding: 8px 8px 8px 24px; border-radius: 999px;
      background: #ffffff; color: #0a0400; border: none;
      font-size: 17px; font-weight: 600; cursor: pointer;
      box-shadow: 0 0 24px rgba(255, 255, 255, 0.22);
    }
    .${p}-arrow-circle {
      width: 40px; height: 40px; border-radius: 50%; background: var(--accent);
      color: #ffffff; display: inline-flex; align-items: center; justify-content: center;
    }
    .${p}-secondary-link {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 18px; border-radius: 12px;
      background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border);
      color: rgba(255, 255, 255, 0.82); font-size: 15px; font-weight: 500;
      text-decoration: none; cursor: pointer;
    }

    .${p}-section {
      max-width: 1280px; margin: 0 auto; padding: clamp(64px, 8vw, 108px) clamp(20px, 5vw, 64px);
    }
    .${p}-section-header {
      display: flex; flex-direction: column; gap: 10px; margin-bottom: 36px;
    }
    .${p}-kicker {
      font-family: var(--font-mono); font-size: 12px; text-transform: uppercase;
      letter-spacing: 0.14em; color: var(--accent-text);
    }
    .${p}-h2 {
      font-family: var(--font-display); font-size: clamp(34px, 4.8vw, 56px);
      font-weight: 400; line-height: 1.04; letter-spacing: -0.02em;
    }

    /* Live Interactive AI Prompt-to-Website Sandbox */
    .${p}-sandbox-shell {
      display: grid; grid-template-columns: 1fr 1.25fr; gap: 24px;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 28px;
    }
    .${p}-preset-list { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
    .${p}-preset-btn {
      text-align: left; padding: 14px 16px; border-radius: 14px;
      background: var(--surface-elevated); border: 1px solid var(--border);
      color: var(--fg); cursor: pointer; display: flex; justify-content: space-between; align-items: center;
    }
    .${p}-preset-btn[aria-selected="true"] {
      border-color: var(--accent); background: rgba(48, 84, 255, 0.18);
    }
    .${p}-preview-stage {
      background: #060913; border: 1px solid var(--border); border-radius: 18px;
      padding: 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 20px;
    }

    .${p}-bento-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
    }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 28px;
      display: flex; flex-direction: column; justify-content: space-between; gap: 14px;
    }
    .${p}-stories-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
    }
    .${p}-pricing-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 22px, 0);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-footer {
      border-top: 1px solid var(--border); padding: 56px clamp(20px, 5vw, 64px);
      max-width: 1280px; margin: 0 auto;
      display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px;
      color: var(--muted); font-size: 13px;
    }

    .${p}-seamless-overlay {
      position: fixed; inset: 0; z-index: 190; background: rgba(3, 5, 10, 0.86);
      backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none;
    }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box {
      max-width: 580px; width: 100%; border-radius: 26px;
      background: var(--surface); border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 1024px) {
      .${p}-sandbox-shell { grid-template-columns: 1fr; }
      .${p}-bento-grid, .${p}-stories-grid, .${p}-pricing-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .${p}-nav-links { display: none; }
      .${p}-bento-grid, .${p}-stories-grid, .${p}-pricing-grid { grid-template-columns: 1fr; }
      .${p}-hero { padding-top: 116px; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <svg width="0" height="0" viewBox="0 0 0 0" style="position:absolute;pointer-events:none;" aria-hidden="true">
    <defs>
      <filter id="${p}LiquidFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="5" />
        <feDisplacementMap id="${p}Displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-nav-container">
      <a href="#heroStage" class="${p}-brand" aria-label="Digitwist AI Builder Home">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12"/>
        </svg>
        <span>Digitwist AI Builder</span>
      </a>
      <nav aria-label="Primary Navigation">
        <ul class="${p}-nav-links">
          <li>
            <a href="#aiSandbox">
              <span>Products</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </a>
          </li>
          <li><a href="#customerStories">Customer Stories</a></li>
          <li><a href="#pinnedSpecs">Resources</a></li>
          <li><a href="#pricingMatrix">Pricing</a></li>
        </ul>
      </nav>
      <div class="${p}-nav-actions">
        <button type="button" id="motionToggleBtn" class="${p}-pill-ghost" data-motion-toggle aria-pressed="false">Motion: ON</button>
        <button type="button" class="${p}-pill-ghost" data-seamless-trigger="Book a Live Architecture Demo">Book A Demo</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-get-started" data-magnetic data-next-preview>Get Started</button>
      </div>
    </div>
  </header>

  <main id="mainContent">
    <!-- SECTION 1: HERO STAGE -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <video id="heroBgVideo" class="${p}-bg-video" src="${heroVideo}" autoplay loop muted playsinline preload="metadata"></video>
      <div class="${p}-hero-overlay" aria-hidden="true"></div>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>

      <div style="max-width:1024px;margin:0 auto;position:relative;z-index:10;" data-parallax="0.06">
        <p class="${p}-pre-headline">Design at the speed of thought</p>
        <h1 class="${p}-main-h1" id="oversizedHeadline">Build Faster</h1>
        <p class="${p}-subheadline">
          Create fully functional, SEO-optimized websites in seconds with our advanced AI engine.
        </p>
        <div class="${p}-cta-row">
          <button type="button" class="${p}-primary-pill" data-magnetic data-seamless-trigger="Start Building Free — Instant AI Workspace">
            <span>Start Building Free</span>
            <span class="${p}-arrow-circle" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </span>
          </button>
          <a href="#aiSandbox" class="${p}-secondary-link">
            <span>See Examples</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div style="display:flex;justify-content:center;gap:42px;flex-wrap:wrap;margin-top:48px;" class="tabular-nums">
          <div><strong data-counter-target="4" data-counter-suffix=".2s" style="font-size:32px;display:block;">4.2s</strong><span style="font-size:12px;color:var(--muted);">Full DOM Synthesis</span></div>
          <div><strong data-counter-target="100" data-counter-suffix="/100" style="font-size:32px;display:block;">100/100</strong><span style="font-size:12px;color:var(--muted);">Core Web Vitals SEO</span></div>
          <div><strong data-counter-target="48" data-counter-suffix="K+" style="font-size:32px;display:block;">48K+</strong><span style="font-size:12px;color:var(--muted);">Sites Deployed</span></div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: LIVE INTERACTIVE AI PROMPT-TO-SITE SANDBOX (ONE LIVE THING) -->
    <section id="aiSandbox" class="${p}-section" aria-labelledby="sandboxHeading">
      <div class="${p}-section-header">
        <span class="${p}-kicker">01 / LIVE NEURAL COMPILER</span>
        <h2 id="sandboxHeading" class="${p}-h2">Prompt to Production Architecture</h2>
      </div>
      <div class="${p}-sandbox-shell">
        <div>
          <label for="aiPromptInput" style="display:block;font-size:13px;font-weight:600;color:var(--accent-text);margin-bottom:8px;">Select or customise an AI build prompt:</label>
          <input id="aiPromptInput" type="text" value="Fintech AI treasury platform with dark bento telemetry" aria-label="AI Website Prompt" style="width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:#060913;color:var(--fg);font-size:14px;" />
          <div class="${p}-preset-list" role="tablist" aria-label="AI Blueprint Presets">
            <button type="button" class="${p}-preset-btn" role="tab" aria-selected="true" data-prompt-preset="Fintech AI treasury platform with dark bento telemetry" data-seo="99" data-lcp="0.4s" data-nodes="42 Semantic Sections">
              <span>01. Fintech AI Treasury Bento</span>
              <span class="tabular-nums" style="font-size:12px;color:var(--accent-text);">0.4s LCP</span>
            </button>
            <button type="button" class="${p}-preset-btn" role="tab" aria-selected="false" data-prompt-preset="Luxury architectural monograph with editorial serif grid" data-seo="100" data-lcp="0.3s" data-nodes="36 Editorial Blocks">
              <span>02. Architectural Monograph Studio</span>
              <span class="tabular-nums" style="font-size:12px;color:var(--accent-text);">0.3s LCP</span>
            </button>
            <button type="button" class="${p}-preset-btn" role="tab" aria-selected="false" data-prompt-preset="Developer CLI & SDK documentation hub with live playground" data-seo="100" data-lcp="0.5s" data-nodes="54 Interactive Modules">
              <span>03. Developer SDK &amp; CLI Hub</span>
              <span class="tabular-nums" style="font-size:12px;color:var(--accent-text);">0.5s LCP</span>
            </button>
          </div>
        </div>
        <div class="${p}-preview-stage" aria-live="polite">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);padding-bottom:14px;">
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);" id="sandboxStatusText">COMPILED: Fintech AI treasury platform</span>
            <span class="tabular-nums" style="font-size:12px;background:rgba(48,84,255,0.2);color:#b4c0ff;padding:4px 10px;border-radius:999px;" id="sandboxSeoBadge">SEO Score: 99/100</span>
          </div>
          <div id="heroPopoutRig" data-tilt-card style="filter:url(#${p}LiquidFilter);padding:12px 0;">
            <svg viewBox="0 0 640 240" width="100%" height="200" fill="none" aria-hidden="true">
              <rect x="8" y="8" width="624" height="224" rx="16" fill="#0b101e" stroke="rgba(180,192,255,0.22)"/>
              <rect x="28" y="28" width="180" height="16" rx="8" fill="#3054ff"/>
              <rect x="28" y="58" width="320" height="28" rx="6" fill="#f8fafc"/>
              <rect x="28" y="98" width="260" height="12" rx="6" fill="#64748b"/>
              <rect x="28" y="136" width="190" height="72" rx="12" fill="#131b31" stroke="#3054ff"/>
              <rect x="234" y="136" width="190" height="72" rx="12" fill="#131b31" stroke="rgba(180,192,255,0.2)"/>
              <rect x="440" y="28" width="172" height="180" rx="14" fill="rgba(48,84,255,0.14)" stroke="#b4c0ff"/>
              <path d="M464 168 L498 122 L532 142 L584 74" stroke="#b4c0ff" stroke-width="3.5" stroke-linecap="round"/>
              <circle cx="584" cy="74" r="6" fill="#3054ff"/>
            </svg>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--muted);" class="tabular-nums">
            <span id="sandboxNodesText">Generated: 42 Semantic Sections</span>
            <span id="sandboxLcpText">Estimated LCP: 0.4s</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: PINNED TELEMETRY & ARCHITECTURE BENTO -->
    <section id="pinnedSpecs" class="${p}-section" aria-labelledby="specsHeading">
      <div class="${p}-section-header">
        <span class="${p}-kicker">02 / CORE ENGINE TELEMETRY</span>
        <h2 id="specsHeading" class="${p}-h2">Engineered for Zero-Bloat Speed</h2>
      </div>
      <div class="${p}-bento-grid">
        <article class="${p}-card ${p}-reveal" data-tilt-card data-spec-index="001">
          <span class="${p}-kicker">001 / SEMANTIC AST</span>
          <h3 style="font-size:22px;">Clean HTML5 &amp; CSS Grid</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Digitwist compiles directly to semantic landmarks, fluid clamp() tokens, and accessible ARIA components with zero runtime bloat.</p>
        </article>
        <div class="${p}-card" id="scrubCenterStage" style="text-align:center;">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#b4c0ff" stroke-width="1.6" style="margin:0 auto;" aria-hidden="true">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
          </svg>
          <p id="scrubDialText" class="tabular-nums" style="margin-top:12px;font-size:13px;color:var(--accent-text);font-weight:700;">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-spec-index="002">
          <span class="${p}-kicker">002 / EDGE STREAMING</span>
          <h3 style="font-size:22px;">Adaptive HLS &amp; WebP Pipeline</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Automatic responsive poster generation, hardware-accelerated motion curves, and instant global CDN deployment.</p>
        </article>
      </div>
    </section>

    <!-- SECTION 4: CUSTOMER STORIES -->
    <section id="customerStories" class="${p}-section" aria-labelledby="storiesHeading">
      <div class="${p}-section-header">
        <span class="${p}-kicker">03 / VERIFIED LAUNCHES</span>
        <h2 id="storiesHeading" class="${p}-h2">Customer Stories</h2>
      </div>
      <div class="${p}-stories-grid">
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Kinetix Cloud — +240% Conversion Case Study">
          <span class="${p}-kicker">KINETIX CLOUD</span>
          <strong class="tabular-nums" style="font-size:36px;color:var(--accent-text);">+240%</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Launched 18 localized product landing pages in a single afternoon with 100/100 Lighthouse SEO scores.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Vespera Studio — 3.8x Faster Client Delivery">
          <span class="${p}-kicker">VESPERA STUDIO</span>
          <strong class="tabular-nums" style="font-size:36px;color:var(--accent-text);">3.8x</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Cut agency prototyping cycles from three weeks to four hours using Digitwist live token synchronization.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Monolith AI — 0.38s Global LCP">
          <span class="${p}-kicker">MONOLITH AI</span>
          <strong class="tabular-nums" style="font-size:36px;color:var(--accent-text);">0.38s</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Replaced heavy SPA bundles with clean Digitwist semantic HTML and doubled organic search traffic.</p>
        </article>
      </div>
    </section>

    <!-- SECTION 5: PRICING MATRIX -->
    <section id="pricingMatrix" class="${p}-section" aria-labelledby="pricingHeading">
      <div class="${p}-section-header">
        <span class="${p}-kicker">04 / TRANSPARENT TIERS</span>
        <h2 id="pricingHeading" class="${p}-h2">Scale at the Speed of Thought</h2>
      </div>
      <div class="${p}-pricing-grid">
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">STARTER</span>
          <strong class="tabular-nums" style="font-size:38px;">$0<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">3 AI-generated sites, full HTML/CSS export, and standard SEO telemetry.</p>
          <button type="button" class="${p}-pill-ghost" data-seamless-trigger="Starter Tier — Instant Activation">Start Free</button>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card style="border-color:var(--accent);">
          <span class="${p}-kicker">PRO STUDIO</span>
          <strong class="tabular-nums" style="font-size:38px;">$29<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">Unlimited AI builds, custom domains, 3-layer token export, and priority edge streaming.</p>
          <button type="button" class="${p}-btn-get-started" data-seamless-trigger="Pro Studio Tier — Start 14-Day Trial">Deploy Pro Studio</button>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">ENTERPRISE</span>
          <strong class="tabular-nums" style="font-size:38px;">$99<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">Dedicated neural clusters, SSO governance, and bespoke design system locks.</p>
          <button type="button" class="${p}-pill-ghost" data-seamless-trigger="Enterprise Architecture Briefing">Contact Sales</button>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <div>
      <strong style="color:var(--fg);">Digitwist AI Builder</strong> — Design at the speed of thought. © 2026 Digitwist Inc.
    </div>
    <div style="display:flex;gap:20px;">
      <a href="#heroStage" style="color:var(--muted);text-decoration:none;">Top</a>
      <a href="#aiSandbox" style="color:var(--muted);text-decoration:none;">Sandbox</a>
      <a href="#customerStories" style="color:var(--muted);text-decoration:none;">Stories</a>
      <a href="#pricingMatrix" style="color:var(--muted);text-decoration:none;">Pricing</a>
    </div>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-kicker">Digitwist AI Workspace</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:32px;margin-bottom:10px;">Start Building Free</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Enter your project domain or prompt specification to synthesize a production-ready, SEO-optimized website in under 5 seconds.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-get-started" style="width:100%;">Launch AI Builder</button>
    </div>
  </div>

  <script>
    (function () {
      var input = document.getElementById('aiPromptInput');
      var statusText = document.getElementById('sandboxStatusText');
      var seoBadge = document.getElementById('sandboxSeoBadge');
      var nodesText = document.getElementById('sandboxNodesText');
      var lcpText = document.getElementById('sandboxLcpText');
      var presetBtns = document.querySelectorAll('[data-prompt-preset]');

      presetBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          presetBtns.forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
          btn.setAttribute('aria-selected', 'true');
          var promptVal = btn.getAttribute('data-prompt-preset') || '';
          if (input) input.value = promptVal;
          if (statusText) statusText.textContent = 'COMPILED: ' + promptVal.slice(0, 38);
          if (seoBadge) seoBadge.textContent = 'SEO Score: ' + (btn.getAttribute('data-seo') || '100') + '/100';
          if (nodesText) nodesText.textContent = 'Generated: ' + (btn.getAttribute('data-nodes') || '40 Semantic Sections');
          if (lcpText) lcpText.textContent = 'Estimated LCP: ' + (btn.getAttribute('data-lcp') || '0.4s');
        });
      });

      if (input) {
        input.addEventListener('input', function () {
          if (statusText) statusText.textContent = 'COMPILING: ' + (input.value.trim().slice(0, 38) || 'Custom Prompt');
        });
      }
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 2. DOT (t166 — Premium Tier)
  // Warm Ivory #F3F4ED + #1a1a1a Ink + #0871E7 Glint Blue Pill + #2A3616 Nokia Screen
  // Headline: "Short notes. Daily calm."
  // Subheadline: "Linked with a single anonymous peer. One message every day. A quiet rhythm in the digital noise."
  // Live Interactive TypingMessages Screen + Daily Note Composer + 5 Semantic Sections
  // ============================================================================
  if (spec.slug === 'dot') {
    const dotVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>dot. — Short Notes. Daily Calm.</title>
  <meta name="description" content="Linked with a single anonymous peer. One message every day. A quiet rhythm in the digital noise.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #F3F4ED;
      --surface: #FFFFFF;
      --surface-elevated: #E9ECE0;
      --glass: rgba(243, 244, 237, 0.84);
      --fg: #1a1a1a;
      --muted: #575952;
      --border: rgba(26, 26, 26, 0.12);
      --accent: #0871E7;
      --accent-text: #0657B4;
      --accent-strong: #054896;
      --on-accent: #ffffff;
      --nokia-fg: #2A3616;
      --nokia-bg: #9BBC0F;
      --font-display: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Silkscreen', monospace;
      --radius-lg: 24px;
      --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: var(--bg); color: var(--fg); font-family: var(--font-sans);
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 600; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); outline-offset: 3px; }
    a:focus-visible, button:focus-visible, input:focus-visible {
      outline: 2px solid var(--accent); outline-offset: 3px;
    }
    button, [role="button"] {
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out), background-color 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: scale(0.97) translateY(1px);
    }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); mix-blend-mode: difference;
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid #ffffff; margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    /* Fixed Centered Pill Navbar (Exact Specification) */
    .${p}-header {
      position: fixed; top: 20px; left: 0; right: 0; z-index: 220;
      padding: 0 20px; pointer-events: none;
    }
    .${p}-nav-pill {
      pointer-events: auto; max-width: 1024px; margin: 0 auto;
      padding: 10px 18px 10px 24px; border-radius: 999px;
      background: var(--glass); backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-logo {
      font-family: var(--font-display); font-size: 28px; color: var(--fg);
      text-decoration: none; letter-spacing: -0.02em; line-height: 1;
    }
    .${p}-nav-links {
      display: flex; align-items: center; gap: 36px; list-style: none;
    }
    .${p}-nav-links a {
      color: var(--fg); text-decoration: none; font-size: 14px; font-weight: 500;
      transition: opacity 0.2s var(--ease-out);
    }
    .${p}-nav-links a:hover { opacity: 0.65; }
    .${p}-glint-btn {
      position: relative; overflow: hidden;
      padding: 9px 22px; border-radius: 999px;
      background: var(--accent); color: #ffffff;
      border: 1px solid var(--accent); font-size: 14px; font-weight: 600; cursor: pointer;
      box-shadow: inset 0 -4px 4px rgba(255, 255, 255, 0.39);
    }
    .${p}-glint-bar {
      position: absolute; left: 10%; top: 1px; width: 80%; height: 12px;
      background: linear-gradient(180deg, rgba(222, 240, 252, 0.65) 0%, transparent 100%);
      border-radius: 12px; pointer-events: none;
      transition: transform 0.25s var(--ease-out);
    }
    .${p}-glint-btn:hover .${p}-glint-bar { transform: scaleX(1.06); }
    .${p}-pill-ghost {
      padding: 8px 14px; border-radius: 999px; background: rgba(26, 26, 26, 0.06);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 128px clamp(20px, 5vw, 64px) 72px;
      display: flex; flex-direction: column; align-items: center; justify-content: space-between;
      text-align: center; overflow: hidden; isolation: isolate;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      z-index: -2; opacity: 0.92; pointer-events: none;
    }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 400;
      font-size: clamp(44px, 6.2vw, 76px); line-height: 0.88; letter-spacing: -0.025em;
      color: var(--fg); margin-bottom: 20px;
    }
    .${p}-sub {
      font-size: clamp(16px, 1.8vw, 18px); line-height: 1.62;
      color: rgba(26, 26, 26, 0.74); max-width: 540px; margin: 0 auto 28px;
    }

    /* Nokia Monospace Peer Screen Rig */
    .${p}-nokia-rig {
      margin: 18px auto; width: 280px; border-radius: 26px;
      background: #232722; border: 3px solid #3c423a; padding: 18px;
      box-shadow: 0 24px 48px rgba(26, 26, 26, 0.18);
    }
    .${p}-nokia-lcd {
      background: #9BBC0F; color: var(--nokia-fg);
      border-radius: 10px; padding: 16px 14px; min-height: 92px;
      font-family: var(--font-mono); font-size: 13px; line-height: 1.45;
      text-align: left; display: flex; flex-direction: column; justify-content: space-between;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.22);
    }
    .${p}-cursor-blink {
      display: inline-block; width: 7px; height: 13px; background: var(--nokia-fg);
      vertical-align: middle; margin-left: 4px;
      animation: ${p}Blink 0.8s steps(2, start) infinite;
    }
    @keyframes ${p}Blink { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }

    .${p}-section {
      max-width: 1180px; margin: 0 auto; padding: clamp(64px, 7vw, 96px) clamp(20px, 5vw, 64px);
    }
    .${p}-kicker {
      font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--accent-text); display: block; margin-bottom: 8px;
    }
    .${p}-h2 {
      font-family: var(--font-display); font-size: clamp(34px, 4.5vw, 52px);
      font-weight: 400; line-height: 1.04; margin-bottom: 28px;
    }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 28px;
      display: flex; flex-direction: column; justify-content: space-between; gap: 14px;
    }
    .${p}-composer-box {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 32px;
      display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 28px; align-items: center;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 20px, 0);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-footer {
      border-top: 1px solid var(--border); padding: 48px clamp(20px, 5vw, 64px);
      max-width: 1180px; margin: 0 auto;
      display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;
      font-size: 13px; color: var(--muted);
    }

    .${p}-seamless-overlay {
      position: fixed; inset: 0; z-index: 190; background: rgba(26, 26, 26, 0.65);
      backdrop-filter: blur(12px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none;
    }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box {
      max-width: 540px; width: 100%; border-radius: 26px;
      background: var(--surface); border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 1024px) {
      .${p}-grid-3, .${p}-composer-box { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .${p}-nav-links { display: none; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <svg width="0" height="0" viewBox="0 0 0 0" style="position:absolute;pointer-events:none;" aria-hidden="true">
    <defs>
      <filter id="${p}LiquidFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="7" />
        <feDisplacementMap id="${p}Displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-nav-pill">
      <a href="#heroStage" class="${p}-logo">dot.</a>
      <nav aria-label="Primary Navigation">
        <ul class="${p}-nav-links">
          <li><a href="#philosophySection">Philosophy</a></li>
          <li><a href="#pinnedSpecs">Trust</a></li>
          <li><a href="#dailyComposer">Access</a></li>
          <li><a href="#tribeSection">Tribe</a></li>
        </ul>
      </nav>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" id="motionToggleBtn" class="${p}-pill-ghost" data-motion-toggle aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-glint-btn" data-magnetic data-next-preview>
          <span class="${p}-glint-bar" aria-hidden="true"></span>
          <span>Link up</span>
        </button>
      </div>
    </div>
  </header>

  <main id="mainContent">
    <!-- SECTION 1: HERO & NOKIA TYPING MESSAGES -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <video id="heroBgVideo" class="${p}-bg-video" src="${dotVideo}" autoplay loop muted playsinline preload="metadata"></video>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>

      <div style="max-width:680px;margin:0 auto;position:relative;z-index:10;" data-parallax="0.06">
        <h1 class="${p}-h1" id="oversizedHeadline">Short notes.<br>Daily calm.</h1>
        <p class="${p}-sub">
          Linked with a single anonymous peer. One message every day. A quiet rhythm in the digital noise.
        </p>

        <div id="heroPopoutRig" class="${p}-nokia-rig" data-tilt-card style="filter:url(#${p}LiquidFilter);">
          <div class="${p}-nokia-lcd" aria-live="polite">
            <div style="display:flex;justify-content:space-between;font-size:10px;opacity:0.75;">
              <span>PEER_LINK // 1:1</span>
              <span class="tabular-nums">08:00 AM</span>
            </div>
            <div style="margin:10px 0;">
              <span id="nokiaTypedText">Are you here?</span><span class="${p}-cursor-blink" aria-hidden="true"></span>
            </div>
            <div style="font-size:10px;opacity:0.75;">140 CHAR MAX • E2E ZERO-LOG</div>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:36px;justify-content:center;flex-wrap:wrap;position:relative;z-index:10;" class="tabular-nums">
        <div><strong data-counter-target="1" data-counter-suffix=" Note/Day" style="font-size:28px;display:block;">1 Note/Day</strong><span style="font-size:12px;color:var(--muted);">Intentional Cadence</span></div>
        <div><strong data-counter-target="140" data-counter-suffix=" Chars" style="font-size:28px;display:block;">140 Chars</strong><span style="font-size:12px;color:var(--muted);">Tactile Brevity</span></div>
        <div><strong data-counter-target="100" data-counter-suffix="% Private" style="font-size:28px;display:block;">100% Private</strong><span style="font-size:12px;color:var(--muted);">Zero Public Feeds</span></div>
      </div>
    </section>

    <!-- SECTION 2: INTERACTIVE DAILY NOTE COMPOSER (ONE LIVE THING) -->
    <section id="dailyComposer" class="${p}-section" aria-labelledby="composerHeading">
      <span class="${p}-kicker">01 / ONE LIVE THING • TACTILE COMPOSER</span>
      <h2 id="composerHeading" class="${p}-h2">Write Today's Quiet Note</h2>
      <div class="${p}-composer-box">
        <div>
          <label for="dotNoteInput" style="display:block;font-size:13px;font-weight:600;margin-bottom:8px;">Transmit a short reflection to your linked peer:</label>
          <input id="dotNoteInput" type="text" maxlength="140" value="Morning rain on the window. Drinking matcha before the city wakes." style="width:100%;padding:14px 16px;border-radius:14px;border:1px solid var(--border);background:var(--bg);color:var(--fg);font-size:15px;margin-bottom:14px;" />
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button type="button" class="${p}-pill-ghost" data-dot-preset="Are you here?">Preset: "Are you here?"</button>
            <button type="button" class="${p}-pill-ghost" data-dot-preset="Yes, I am.">Preset: "Yes, I am."</button>
            <button type="button" class="${p}-pill-ghost" data-dot-preset="Speak soon.">Preset: "Speak soon."</button>
          </div>
        </div>
        <div class="${p}-card" style="background:#232722;color:#9BBC0F;font-family:var(--font-mono);">
          <div style="display:flex;justify-content:space-between;font-size:11px;" class="tabular-nums">
            <span>LIVE LCD PREVIEW</span>
            <span id="dotCharCounter">66 / 140</span>
          </div>
          <p id="dotLiveScreen" style="font-size:14px;line-height:1.5;min-height:56px;margin:8px 0;">Morning rain on the window. Drinking matcha before the city wakes.</p>
          <button type="button" class="${p}-glint-btn" data-seamless-trigger="Daily Note Queued for 08:00 AM Delivery" style="width:100%;">Queue Daily Note</button>
        </div>
      </div>
    </section>

    <!-- SECTION 3: PHILOSOPHY -->
    <section id="philosophySection" class="${p}-section" aria-labelledby="philHeading">
      <span class="${p}-kicker">02 / PHILOSOPHY</span>
      <h2 id="philHeading" class="${p}-h2">Built Against Infinite Scroll</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">NO METRICS</span>
          <h3 style="font-size:22px;">Zero Likes or Followers</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">No public profiles, no algorithmic amplification, and no performative status games.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">SYNCHRONOUS CALM</span>
          <h3 style="font-size:22px;">One Delivery Window</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Notes arrive once each morning at 08:00 local time, restoring anticipation and presence.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">EPHEMERAL INK</span>
          <h3 style="font-size:22px;">Monochrome Clarity</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Inspired by classic tactile hardware screens that respect your attention span.</p>
        </article>
      </div>
    </section>

    <!-- SECTION 4: PINNED TRUST TELEMETRY -->
    <section id="pinnedSpecs" class="${p}-section" aria-labelledby="trustHeading">
      <span class="${p}-kicker">03 / TRUST &amp; CRYPTOGRAPHY</span>
      <h2 id="trustHeading" class="${p}-h2">Anonymous by Architecture</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-tilt-card data-spec-index="001">
          <span class="${p}-kicker">001 / ZERO IDENTITY</span>
          <h3 style="font-size:20px;">Blind Peer Pairing</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Matched solely by timezone and quiet reflection cadence without exposing phone numbers.</p>
        </article>
        <div class="${p}-card" id="scrubCenterStage" style="text-align:center;">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" style="margin:0 auto;" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <p id="scrubDialText" class="tabular-nums" style="margin-top:10px;font-size:12px;color:var(--accent-text);font-weight:700;">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-spec-index="002">
          <span class="${p}-kicker">002 / HARDWARE KEYS</span>
          <h3 style="font-size:20px;">Ephemeral Ratchet</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Keys rotate after every daily exchange so historical notes cannot be decrypted.</p>
        </article>
      </div>
    </section>

    <!-- SECTION 5: TRIBE MEMBERSHIP -->
    <section id="tribeSection" class="${p}-section" aria-labelledby="tribeHeading">
      <span class="${p}-kicker">04 / THE TRIBE</span>
      <h2 id="tribeHeading" class="${p}-h2">Join the Quiet Rhythm</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">SOLO LINK</span>
          <strong class="tabular-nums" style="font-size:36px;">Free</strong>
          <p style="color:var(--muted);font-size:14px;">1 daily peer link, morning delivery window, and full end-to-end encryption.</p>
          <button type="button" class="${p}-pill-ghost" data-seamless-trigger="Solo Link — Pair with a Peer">Request Peer Link</button>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card style="border-color:var(--accent);">
          <span class="${p}-kicker">PATRON EDITION</span>
          <strong class="tabular-nums" style="font-size:36px;">$4<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">Support independent calm software, custom LCD palettes, and physical postcard exports.</p>
          <button type="button" class="${p}-glint-btn" data-seamless-trigger="Patron Edition — Link Up">Become a Patron</button>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">SANCTUARY GIFT</span>
          <strong class="tabular-nums" style="font-size:36px;">$36<span style="font-size:15px;color:var(--muted);">/yr</span></strong>
          <p style="color:var(--muted);font-size:14px;">Gift a full year of daily calm to a close friend or creative partner.</p>
          <button type="button" class="${p}-pill-ghost" data-seamless-trigger="Sanctuary Gift Membership">Gift a Link</button>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <div><strong>dot.</strong> — Short notes. Daily calm. © 2026 Dot Sanctuary Lab.</div>
    <div style="display:flex;gap:20px;">
      <a href="#philosophySection" style="color:var(--muted);text-decoration:none;">Philosophy</a>
      <a href="#pinnedSpecs" style="color:var(--muted);text-decoration:none;">Trust</a>
      <a href="#dailyComposer" style="color:var(--muted);text-decoration:none;">Access</a>
      <a href="#tribeSection" style="color:var(--muted);text-decoration:none;">Tribe</a>
    </div>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-kicker">dot. Peer Pairing</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:32px;margin-bottom:10px;">Link Up with a Peer</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Your anonymous 1:1 channel is ready. Choose your morning delivery hour and send your first 140-character note.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-glint-btn" style="width:100%;">Confirm Daily Link</button>
    </div>
  </div>

  <script>
    (function () {
      var messages = ["Are you here?", "Yes, I am.", "Speak soon."];
      var msgIdx = 0;
      var charIdx = 0;
      var deleting = false;
      var typedEl = document.getElementById('nokiaTypedText');

      function stepType() {
        if (!typedEl) return;
        var current = messages[msgIdx];
        if (!deleting) {
          charIdx++;
          typedEl.textContent = current.slice(0, charIdx);
          if (charIdx >= current.length) {
            deleting = true;
            setTimeout(stepType, 1800);
            return;
          }
          setTimeout(stepType, 95);
        } else {
          charIdx--;
          typedEl.textContent = current.slice(0, charIdx);
          if (charIdx <= 0) {
            deleting = false;
            msgIdx = (msgIdx + 1) % messages.length;
            setTimeout(stepType, 320);
            return;
          }
          setTimeout(stepType, 48);
        }
      }
      setTimeout(stepType, 600);

      var noteInput = document.getElementById('dotNoteInput');
      var liveScreen = document.getElementById('dotLiveScreen');
      var charCounter = document.getElementById('dotCharCounter');
      function syncNote() {
        if (!noteInput) return;
        var val = noteInput.value || '';
        if (liveScreen) liveScreen.textContent = val;
        if (charCounter) charCounter.textContent = val.length + ' / 140';
      }
      if (noteInput) noteInput.addEventListener('input', syncNote);
      document.querySelectorAll('[data-dot-preset]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (noteInput) {
            noteInput.value = btn.getAttribute('data-dot-preset') || '';
            syncNote();
          }
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 3. EMAIL MARKETING — DESIGN ROCKET CERTIFICATES (t167 — Premium Tier)
  // Dark #050505 / #111111 + Electric Lime #DCFF00 & #D8F90A + Instrument Serif
  // Built in collaboration with Microsoft • 5 Semantic Sections + Interactive Roadmap Builder
  // ============================================================================
  if (spec.slug === 'email-marketing') {
    const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_064822_f120e48a-d545-45dd-a02d-facb07829888.mp4';
    const sec3Video = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4';
    const sec4Video = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260417_110451_9f82b157-dc92-4a9f-a341-c25594ec20e1.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Design Rocket Certificates — Email Marketing &amp; AI Leadership Course</title>
  <meta name="description" content="Built in collaboration with Microsoft, Design Rocket Certificates gives you the toolkit to lead AI transformation across your organization.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #050505;
      --surface: #111111;
      --surface-elevated: #191919;
      --glass: rgba(17, 17, 17, 0.84);
      --fg: #F2F2F2;
      --muted: #8F8E88;
      --border: rgba(255, 255, 255, 0.12);
      --accent: #DCFF00;
      --accent-text: #D8F90A;
      --accent-strong: #c9ea00;
      --on-accent: #0A0A0A;
      --font-display: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 18px;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: var(--bg); color: var(--fg); font-family: var(--font-sans);
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid #ffffff; outline-offset: 3px; }
    a:focus-visible, button:focus-visible, select:focus-visible {
      outline: 2px solid var(--accent); outline-offset: 3px;
    }
    button, [role="button"] {
      transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: scale(0.97) translateY(1px);
    }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); mix-blend-mode: difference;
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid var(--accent); margin: -17px 0 0 -17px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 12px; z-index: 220; max-width: 920px; margin: 0 auto; padding: 0 16px;
    }
    .${p}-nav-bar {
      background: var(--glass); backdrop-filter: blur(16px);
      border: 1px solid var(--border); border-radius: 999px;
      padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-brand {
      font-family: var(--font-display); font-size: 24px; color: #ffffff; text-decoration: none;
    }
    .${p}-nav-links { display: flex; gap: 24px; list-style: none; }
    .${p}-nav-links a { color: #E8E8E8; text-decoration: none; font-size: 13px; font-weight: 500; }
    .${p}-nav-links a:hover { color: var(--accent); }
    .${p}-btn-lime {
      display: inline-flex; align-items: center; gap: 10px;
      background: var(--accent); color: var(--on-accent);
      font-weight: 700; font-size: 14px; padding: 11px 24px; border-radius: 999px;
      border: none; cursor: pointer;
    }
    .${p}-btn-lime:hover { background: var(--accent-strong); transform: translateY(-2px); }
    .${p}-btn-white {
      display: inline-flex; align-items: center; gap: 10px;
      background: #ffffff; color: #0A0A0A;
      font-weight: 700; font-size: 14px; padding: 11px 28px; border-radius: 10px;
      border: none; cursor: pointer;
    }
    .${p}-pill-ghost {
      padding: 8px 14px; border-radius: 999px; background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-email-shell {
      max-width: 760px; margin: 28px auto 64px; background: var(--surface);
      border: 1px solid var(--border); border-radius: 24px; overflow: hidden;
      box-shadow: 0 32px 80px rgba(0, 0, 0, 0.75);
    }
    .${p}-hero {
      position: relative; min-height: 680px; padding: 56px clamp(24px, 6vw, 64px) 48px;
      display: flex; flex-direction: column; align-items: center; justify-content: space-between;
      text-align: center; overflow: hidden; isolation: isolate;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2;
    }
    .${p}-hero-grad {
      position: absolute; inset: 0; z-index: -1;
      background: linear-gradient(180deg, rgba(17,17,17,0.18) 0%, rgba(17,17,17,0.55) 62%, #111111 100%);
    }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 400;
      font-size: clamp(42px, 6vw, 62px); line-height: 1.02; letter-spacing: -0.02em;
      color: #ffffff; max-width: 560px; margin: 16px auto 24px;
    }
    .${p}-section { padding: 48px clamp(24px, 7vw, 68px); border-top: 1px solid rgba(255, 255, 255, 0.07); }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 400;
      font-size: clamp(34px, 4.8vw, 48px); line-height: 1.05; text-align: center; margin-bottom: 28px;
    }
    .${p}-video-card {
      border-radius: 16px; overflow: hidden; border: 1px solid var(--border); margin-bottom: 28px;
    }
    .${p}-video-card video {
      width: 100%; height: 320px; object-fit: cover; display: block;
      transition: transform 0.6s var(--ease-out);
    }
    .${p}-video-card:hover video { transform: scale(1.03); }
    .${p}-step-row {
      display: flex; align-items: flex-start; gap: 18px; margin-bottom: 20px;
    }
    .${p}-step-badge {
      flex-shrink: 0; width: 28px; height: 28px; border-radius: 7px;
      background: var(--accent); color: var(--on-accent);
      font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center;
      margin-top: 3px;
    }
    .${p}-lime-banner {
      background: var(--accent-text); color: #1E1E1E;
      border-radius: 16px; padding: 44px 32px; text-align: center;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 20px, 0);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-footer {
      background: #080808; padding: 48px 32px; text-align: center;
      border-top: 1px solid var(--border); color: var(--muted); font-size: 12px;
      max-width: 760px; margin: 0 auto 48px; border-radius: 20px;
    }
    .${p}-social-row { display: flex; justify-content: center; gap: 14px; margin: 20px 0; }
    .${p}-social-icon {
      width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2);
      display: inline-flex; align-items: center; justify-content: center; color: #ffffff; text-decoration: none;
    }
    .${p}-social-icon:hover { background: var(--accent); color: #0A0A0A; border-color: var(--accent); }

    .${p}-seamless-overlay {
      position: fixed; inset: 0; z-index: 190; background: rgba(5, 5, 5, 0.86);
      backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none;
    }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box {
      max-width: 540px; width: 100%; border-radius: 24px;
      background: var(--surface); border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 768px) {
      .${p}-nav-links { display: none; }
      .${p}-hero { min-height: 540px; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <svg width="0" height="0" viewBox="0 0 0 0" style="position:absolute;pointer-events:none;" aria-hidden="true">
    <defs>
      <filter id="${p}LiquidFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="9" />
        <feDisplacementMap id="${p}Displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-nav-bar">
      <a href="#heroStage" class="${p}-brand">Design Rocket</a>
      <nav aria-label="Course Sections">
        <ul class="${p}-nav-links">
          <li><a href="#introSection">Collaboration</a></li>
          <li><a href="#curriculumSection">Curriculum</a></li>
          <li><a href="#roadmapBuilder">AI Roadmap</a></li>
          <li><a href="#pinnedSpecs">Telemetry</a></li>
        </ul>
      </nav>
      <div style="display:flex;gap:8px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-pill-ghost" data-motion-toggle aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-lime" data-magnetic data-next-preview style="padding:8px 18px;font-size:12px;">Enroll Now</button>
      </div>
    </div>
  </header>

  <main id="mainContent" class="${p}-email-shell">
    <!-- SECTION 1: HERO -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <video id="heroBgVideo" class="${p}-bg-video" src="${heroVideo}" autoplay loop muted playsinline preload="metadata"></video>
      <div class="${p}-hero-grad" aria-hidden="true"></div>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>

      <div style="position:relative;z-index:10;">
        <p style="font-family:var(--font-display);font-size:28px;line-height:0.95;">Design Rocket</p>
        <p style="font-size:12px;letter-spacing:0.22em;color:#E8E8E8;margin-top:4px;">CERTIFICATES</p>
      </div>

      <div style="position:relative;z-index:10;margin-top:120px;" data-parallax="0.06">
        <span style="font-size:12px;letter-spacing:0.28em;font-weight:600;color:var(--accent);">NOW AVAILABLE</span>
        <h1 class="${p}-h1" id="oversizedHeadline">Learn to lead AI and unlock new value</h1>
        <button type="button" class="${p}-btn-lime" data-magnetic data-seamless-trigger="Design Rocket Certificates — Cohort Enrollment">
          <span>Enroll Now</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>

    <!-- SECTION 2: MICROSOFT COLLABORATION INTRO -->
    <section id="introSection" class="${p}-section" aria-labelledby="introHeading">
      <h2 id="introHeading" class="${p}-h2">Executive AI Leadership Toolkit</h2>
      <p style="font-size:17px;line-height:1.6;color:#E8E8E8;text-align:center;max-width:560px;margin:0 auto 28px;">
        Built in collaboration with Microsoft, this certificate course gives you the toolkit to lead AI transformation across your organization. Learn to spot opportunities, launch AI pilots, and scale adoption grounded in responsible practices and proven frameworks.
      </p>
      <div style="display:flex;justify-content:center;gap:36px;flex-wrap:wrap;margin-bottom:28px;" class="tabular-nums">
        <div style="text-align:center;"><strong data-counter-target="4" data-counter-suffix=" Weeks" style="font-size:30px;color:var(--accent);display:block;">4 Weeks</strong><span style="font-size:12px;color:var(--muted);">Executive Pace</span></div>
        <div style="text-align:center;"><strong data-counter-target="12" data-counter-suffix=" Frameworks" style="font-size:30px;color:var(--accent);display:block;">12 Frameworks</strong><span style="font-size:12px;color:var(--muted);">Pilot Playbooks</span></div>
        <div style="text-align:center;"><strong data-counter-target="98" data-counter-suffix="% ROI" style="font-size:30px;color:var(--accent);display:block;">98% ROI</strong><span style="font-size:12px;color:var(--muted);">Team Adoption</span></div>
      </div>
      <div style="text-align:center;">
        <button type="button" class="${p}-btn-lime" data-seamless-trigger="Download Syllabus &amp; Microsoft Framework">
          <span>Get Started</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>

    <!-- SECTION 3: 4 NUMBERED LEADERSHIP STEPS -->
    <section id="curriculumSection" class="${p}-section" aria-labelledby="currHeading">
      <h2 id="currHeading" class="${p}-h2">Transform how you lead with AI</h2>
      <div class="${p}-video-card" id="heroPopoutRig" data-tilt-card style="filter:url(#${p}LiquidFilter);">
        <video src="${sec3Video}" autoplay loop muted playsinline preload="metadata"></video>
      </div>
      <div style="max-width:520px;margin:0 auto 28px;">
        <div class="${p}-step-row ${p}-reveal">
          <span class="${p}-step-badge tabular-nums">1</span>
          <p style="font-size:16px;line-height:1.55;color:#E8E8E8;">Learn how to spot AI opportunities that boost productivity across roles and deliver visible results.</p>
        </div>
        <div class="${p}-step-row ${p}-reveal">
          <span class="${p}-step-badge tabular-nums">2</span>
          <p style="font-size:16px;line-height:1.55;color:#E8E8E8;">Build structures that support your team so AI efficiencies multiply across the organization.</p>
        </div>
        <div class="${p}-step-row ${p}-reveal">
          <span class="${p}-step-badge tabular-nums">3</span>
          <p style="font-size:16px;line-height:1.55;color:#E8E8E8;">Gain the skills to drive culture change like securing buy-in and reducing resistance.</p>
        </div>
        <div class="${p}-step-row ${p}-reveal">
          <span class="${p}-step-badge tabular-nums">4</span>
          <p style="font-size:16px;line-height:1.55;color:#E8E8E8;">Get frameworks to deliver AI pilots that prove impact fast and build credibility with measurable results.</p>
        </div>
      </div>
      <div style="text-align:center;">
        <button type="button" class="${p}-btn-white" data-seamless-trigger="Enroll in Module 1–4 Leadership Track">Enroll Now</button>
      </div>
    </section>

    <!-- SECTION 4: INTERACTIVE AI TRANSFORMATION ROADMAP BUILDER (ONE LIVE THING) -->
    <section id="roadmapBuilder" class="${p}-section" aria-labelledby="roadmapHeading">
      <h2 id="roadmapHeading" class="${p}-h2">Build your AI transformation roadmap</h2>
      <div class="${p}-video-card">
        <video src="${sec4Video}" autoplay loop muted playsinline preload="metadata"></video>
      </div>
      <p style="font-size:16px;line-height:1.6;color:#E8E8E8;text-align:center;max-width:540px;margin:0 auto 24px;">
        You'll finish this hands-on course with a personal AI Transformation Plan: your playbook for pilot proposals, data strategy, and governance.
      </p>
      <div style="background:var(--surface-elevated);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:24px;">
        <label for="teamSizeSelect" style="display:block;font-size:13px;font-weight:600;color:var(--accent);margin-bottom:10px;">Interactive Roadmap Estimator — Select Organization Scale:</label>
        <select id="teamSizeSelect" style="width:100%;padding:12px;border-radius:10px;background:#080808;color:#ffffff;border:1px solid var(--border);font-size:14px;margin-bottom:16px;">
          <option value="product" data-hours="14 hrs/wk saved" data-pilot="3 Weeks to Pilot">Product &amp; Design Team (15–50 seats)</option>
          <option value="growth" data-hours="28 hrs/wk saved" data-pilot="4 Weeks to Pilot">Enterprise Marketing &amp; Ops (50–250 seats)</option>
          <option value="org" data-hours="64 hrs/wk saved" data-pilot="6 Weeks to Global Rollout">Global Division (250+ seats)</option>
        </select>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:14px;" class="tabular-nums">
          <span id="roadmapHoursOut" style="color:var(--accent);font-weight:700;">Projected Impact: 14 hrs/wk saved</span>
          <span id="roadmapPilotOut" style="color:#E8E8E8;">Timeline: 3 Weeks to Pilot</span>
        </div>
      </div>
      <div style="text-align:center;">
        <button type="button" class="${p}-btn-white" data-seamless-trigger="AI Transformation Plan Template">Learn More</button>
      </div>
    </section>

    <!-- SECTION 5: TELEMETRY & LIME CTA BANNER -->
    <section id="pinnedSpecs" class="${p}-section" aria-labelledby="ctaBannerHeading">
      <div id="scrubCenterStage" style="text-align:center;margin-bottom:24px;">
        <p id="scrubDialText" class="tabular-nums" style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">SCROLL SCRUB ANGLE: 0.0°</p>
      </div>
      <div class="${p}-lime-banner" data-tilt-card>
        <h2 id="ctaBannerHeading" style="font-family:var(--font-display);font-size:clamp(38px,5vw,52px);line-height:1.02;color:#1E1E1E;margin-bottom:12px;">Ready to lead AI at work?</h2>
        <p style="font-size:17px;color:#1E1E1E;margin-bottom:24px;">Enroll now and be the leader your team has been waiting for.</p>
        <button type="button" class="${p}-btn-lime" style="background:#0A0A0A;color:#DCFF00;" data-seamless-trigger="Priority Seat Reservation — Design Rocket">
          <span>Enroll Now</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <p style="font-family:var(--font-display);font-size:30px;color:#ffffff;margin-bottom:12px;">Design Rocket</p>
    <p style="max-width:460px;margin:0 auto 18px;line-height:1.5;">
      Microsoft is a collaborator on this specific course. Microsoft does not endorse Design Rocket generally or other Design Rocket products.
    </p>
    <div class="${p}-social-row">
      <a href="#heroStage" class="${p}-social-icon" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
      <a href="#heroStage" class="${p}-social-icon" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
      <a href="#heroStage" class="${p}-social-icon" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10 9 15 12 10 15 10 9"/></svg></a>
    </div>
    <p>©2026 Design Rocket, 660 4th Street #443, San Francisco, CA 94107 USA</p>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="color:var(--accent);font-size:12px;font-weight:700;">DESIGN ROCKET CERTIFICATES</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:32px;margin-bottom:10px;">Enroll in AI Leadership</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Receive full access to the 4-week Microsoft-collaborated video modules, pilot proposal templates, and executive certificate.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-lime" style="width:100%;justify-content:center;">Confirm Seat Reservation</button>
    </div>
  </div>

  <script>
    (function () {
      var sel = document.getElementById('teamSizeSelect');
      var hrs = document.getElementById('roadmapHoursOut');
      var pil = document.getElementById('roadmapPilotOut');
      if (sel) {
        sel.addEventListener('change', function () {
          var opt = sel.options[sel.selectedIndex];
          if (hrs && opt) hrs.textContent = 'Projected Impact: ' + (opt.getAttribute('data-hours') || '14 hrs/wk saved');
          if (pil && opt) pil.textContent = 'Timeline: ' + (opt.getAttribute('data-pilot') || '3 Weeks to Pilot');
        });
      }
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 4. TRANSFORM DATA (t143 — Premium Tier)
  // High-Key #f8f8f8 + #000000 Ink + #5ae14c Emerald Upgrade + GPT-4o Data Box
  // Headline: "Transform Data Quickly"
  // Subtitle: "Upload your information and get powerful insights right away. Work smarter and achieve goals effortlessly."
  // ============================================================================
  if (spec.slug === 'transform-data') {
    const dataVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Transform Data — Discover What's Possible with Instant AI Insights</title>
  <meta name="description" content="Upload your information and get powerful insights right away. Work smarter and achieve goals effortlessly.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Schibsted+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f8f8f8;
      --surface: #ffffff;
      --surface-elevated: #eef1ef;
      --glass: rgba(14, 19, 17, 0.78);
      --fg: #0e1311;
      --muted: #505050;
      --border: rgba(14, 19, 17, 0.12);
      --accent: #16a34a;
      --accent-text: #15803d;
      --accent-strong: #5ae14c;
      --on-accent: #0e1311;
      --font-display: 'Schibsted Grotesk', sans-serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 20px;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent-strong); color: var(--fg); }
    html, body {
      background: var(--bg); color: var(--fg); font-family: var(--font-sans);
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--fg); color: #ffffff;
      font-weight: 600; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid var(--accent); outline-offset: 3px; }
    a:focus-visible, button:focus-visible, input:focus-visible {
      outline: 2px solid var(--accent); outline-offset: 3px;
    }
    button, [role="button"] {
      transition: transform 0.22s var(--ease-out), background-color 0.22s var(--ease-out), opacity 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: scale(0.97) translateY(1px);
    }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); mix-blend-mode: difference;
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid #ffffff; margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent-strong); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      max-width: 1320px; margin: 0 auto; padding: 18px clamp(20px, 5vw, 80px);
      display: flex; align-items: center; justify-content: space-between; gap: 20px;
      position: relative; z-index: 100;
    }
    .${p}-logo {
      font-family: var(--font-display); font-weight: 700; font-size: 23px;
      letter-spacing: -0.04em; color: var(--fg); text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .${p}-nav-links { display: flex; gap: 28px; list-style: none; }
    .${p}-nav-links a { color: var(--fg); text-decoration: none; font-size: 15px; font-weight: 500; }
    .${p}-btn-dark {
      padding: 10px 22px; border-radius: 999px; background: var(--fg); color: #ffffff;
      border: none; font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .${p}-btn-ghost {
      padding: 9px 16px; border-radius: 999px; background: rgba(14,19,17,0.06);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      position: relative; min-height: 88vh; padding: 48px clamp(20px, 5vw, 80px) 72px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; overflow: hidden; isolation: isolate;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      object-position: top center; z-index: -2; opacity: 0.34; pointer-events: none;
    }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
    .${p}-badge-bar {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 5px 14px 5px 6px; border-radius: 999px;
      background: #ffffff; border: 1px solid var(--border);
      box-shadow: 0 6px 20px rgba(0,0,0,0.05); margin-bottom: 24px; font-size: 13px;
    }
    .${p}-badge-dark {
      display: inline-flex; align-items: center; gap: 5px;
      background: var(--fg); color: #ffffff; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 700;
      font-size: clamp(44px, 6.8vw, 80px); line-height: 0.96; letter-spacing: -0.05em;
      color: #000000; margin-bottom: 20px;
    }
    .${p}-subtitle {
      font-size: clamp(17px, 2vw, 20px); color: var(--muted);
      max-width: 560px; line-height: 1.55; margin: 0 auto 36px;
    }

    /* Search & GPT-4o Insight Console (Exact Specification) */
    .${p}-query-console {
      max-width: 728px; width: 100%; border-radius: 18px;
      background: var(--glass); backdrop-filter: blur(18px);
      padding: 16px; color: #ffffff; text-align: left;
      box-shadow: 0 24px 60px rgba(14, 19, 17, 0.22);
    }
    .${p}-console-top {
      display: flex; justify-content: space-between; align-items: center;
      font-size: 12px; margin-bottom: 12px;
    }
    .${p}-upgrade-pill {
      background: var(--accent-strong); color: #0e1311; border: none;
      padding: 4px 10px; border-radius: 999px; font-weight: 700; font-size: 11px; cursor: pointer; margin-left: 8px;
    }
    .${p}-input-card {
      background: #ffffff; border-radius: 12px; padding: 14px 16px; color: var(--fg);
    }
    .${p}-input-row { display: flex; align-items: center; gap: 12px; }
    .${p}-query-input {
      flex: 1; border: none; background: transparent; font-size: 16px; color: var(--fg); outline: none;
    }
    .${p}-submit-circle {
      width: 36px; height: 36px; border-radius: 50%; background: #000000; color: #ffffff;
      border: none; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .${p}-console-actions {
      display: flex; justify-content: space-between; align-items: center; margin-top: 12px;
    }
    .${p}-chip-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 10px; border-radius: 6px; background: #f1f5f9;
      border: 1px solid rgba(0,0,0,0.08); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-section {
      max-width: 1240px; margin: 0 auto; padding: clamp(64px, 7vw, 96px) clamp(20px, 5vw, 80px);
    }
    .${p}-kicker {
      font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
      letter-spacing: 0.12em; color: var(--accent-text); display: block; margin-bottom: 8px;
    }
    .${p}-h2 {
      font-family: var(--font-display); font-size: clamp(32px, 4.2vw, 48px);
      font-weight: 700; letter-spacing: -0.03em; margin-bottom: 28px;
    }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 28px;
      display: flex; flex-direction: column; justify-content: space-between; gap: 14px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 20px, 0);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-footer {
      border-top: 1px solid var(--border); padding: 48px clamp(20px, 5vw, 80px);
      max-width: 1240px; margin: 0 auto;
      display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;
      font-size: 13px; color: var(--muted);
    }

    .${p}-seamless-overlay {
      position: fixed; inset: 0; z-index: 190; background: rgba(14, 19, 17, 0.72);
      backdrop-filter: blur(12px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none;
    }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box {
      max-width: 540px; width: 100%; border-radius: 24px;
      background: var(--surface); border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 1024px) { .${p}-grid-3 { grid-template-columns: 1fr; } }
    @media (max-width: 768px) { .${p}-nav-links { display: none; } }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <svg width="0" height="0" viewBox="0 0 0 0" style="position:absolute;pointer-events:none;" aria-hidden="true">
    <defs>
      <filter id="${p}LiquidFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="11" />
        <feDisplacementMap id="${p}Displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <a href="#heroStage" class="${p}-logo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      <span>Transform Data</span>
    </a>
    <nav aria-label="Primary Navigation">
      <ul class="${p}-nav-links">
        <li><a href="#liveAnalytics">Platform</a></li>
        <li><a href="#pinnedSpecs">Features</a></li>
        <li><a href="#projectsSection">Projects</a></li>
        <li><a href="#pricingSection">Community</a></li>
      </ul>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" data-motion-toggle aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-dark" data-magnetic data-next-preview>Log In</button>
    </div>
  </header>

  <main id="mainContent">
    <!-- SECTION 1: HERO & GPT-4O QUERY BOX -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <video id="heroBgVideo" class="${p}-bg-video" src="${dataVideo}" autoplay loop muted playsinline preload="metadata"></video>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>

      <div style="max-width:760px;width:100%;margin:0 auto;position:relative;z-index:10;" data-parallax="0.05">
        <div class="${p}-badge-bar">
          <span class="${p}-badge-dark">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15 9 22 9 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9 9 9"/></svg>
            <span>New</span>
          </span>
          <span>Discover what's possible</span>
        </div>

        <h1 class="${p}-h1" id="oversizedHeadline">Transform Data Quickly</h1>
        <p class="${p}-subtitle">
          Upload your information and get powerful insights right away. Work smarter and achieve goals effortlessly.
        </p>

        <div id="heroPopoutRig" class="${p}-query-console" data-tilt-card style="filter:url(#${p}LiquidFilter);">
          <div class="${p}-console-top tabular-nums">
            <div>
              <span>60/450 credits</span>
              <button type="button" class="${p}-upgrade-pill" data-seamless-trigger="Upgrade to Unlimited GPT-4o Data Credits">Upgrade</button>
            </div>
            <div style="display:inline-flex;align-items:center;gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5ae14c" stroke-width="2" aria-hidden="true"><path d="M12 3v18M3 12h18"/></svg>
              <span>Powered by GPT-4o</span>
            </div>
          </div>

          <div class="${p}-input-card">
            <div class="${p}-input-row">
              <input id="dataQueryInput" class="${p}-query-input" type="text" maxlength="3000" value="Compare Q3 recurring revenue retention across enterprise cohorts" aria-label="Type data question" placeholder="Type question..." />
              <button type="button" id="runQueryBtn" class="${p}-submit-circle" aria-label="Run Insight Query">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              </button>
            </div>
            <div class="${p}-console-actions">
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button type="button" class="${p}-chip-btn" data-query-preset="Forecast Q4 ARR growth from pipeline velocity">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                  <span>Attach</span>
                </button>
                <button type="button" class="${p}-chip-btn" data-query-preset="Identify top 5 churn anomalies in EMEA region">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                  <span>Voice</span>
                </button>
                <button type="button" class="${p}-chip-btn" data-query-preset="Synthesize unit economics LTV:CAC ratio by channel">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <span>Prompts</span>
                </button>
              </div>
              <span id="dataCharCount" class="tabular-nums" style="font-size:12px;color:#64748b;">63/3,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: LIVE INSIGHT OUTPUT -->
    <section id="liveAnalytics" class="${p}-section" aria-labelledby="liveInsightHeading">
      <span class="${p}-kicker">01 / INSTANT INSIGHT SYNTHESIS</span>
      <h2 id="liveInsightHeading" class="${p}-h2">Real-Time Cohort Telemetry</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">QUERY RESULT</span>
          <strong id="liveQueryTitle" style="font-size:20px;">Enterprise NRR: 118.4%</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Automated anomaly detection across 14.2M warehouse rows in 180 milliseconds.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">THROUGHPUT</span>
          <strong class="tabular-nums" data-counter-target="180" data-counter-suffix="ms" style="font-size:36px;color:var(--accent-text);">180ms</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Zero-copy DuckDB &amp; Parquet vector execution directly in the browser.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">ACCURACY</span>
          <strong class="tabular-nums" data-counter-target="99" data-counter-suffix=".8%" style="font-size:36px;color:var(--accent-text);">99.8%</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Verified SQL lineage attached to every generated chart and executive summary.</p>
        </article>
      </div>
    </section>

    <!-- SECTION 3: PINNED SPECS -->
    <section id="pinnedSpecs" class="${p}-section" aria-labelledby="specsHeading">
      <span class="${p}-kicker">02 / ARCHITECTURE</span>
      <h2 id="specsHeading" class="${p}-h2">Built for Modern Data Teams</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-tilt-card data-spec-index="001">
          <span class="${p}-kicker">001 / INGESTION</span>
          <h3 style="font-size:20px;">CSV, Parquet &amp; Snowflake</h3>
          <p style="color:var(--muted);font-size:14px;">Drop raw files or connect live warehouse credentials with zero schema migration.</p>
        </article>
        <div class="${p}-card" id="scrubCenterStage" style="text-align:center;">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" stroke-width="1.8" style="margin:0 auto;" aria-hidden="true">
            <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
          </svg>
          <p id="scrubDialText" class="tabular-nums" style="margin-top:10px;font-size:12px;color:var(--accent-text);font-weight:700;">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-spec-index="002">
          <span class="${p}-kicker">002 / GOVERNANCE</span>
          <h3 style="font-size:20px;">SOC2 Type II &amp; Zero-Retention</h3>
          <p style="color:var(--muted);font-size:14px;">Your proprietary datasets never train public models and stay encrypted at rest.</p>
        </article>
      </div>
    </section>

    <!-- SECTION 4: PROJECTS SHOWCASE -->
    <section id="projectsSection" class="${p}-section" aria-labelledby="projHeading">
      <span class="${p}-kicker">03 / TEMPLATES</span>
      <h2 id="projHeading" class="${p}-h2">One-Click Executive Boards</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="SaaS Net Retention Board">
          <span class="${p}-kicker">BOARD 01</span>
          <h3 style="font-size:20px;">SaaS Net Retention</h3>
          <p style="color:var(--muted);font-size:14px;">Cohort expansion, logo churn, and payback period decomposition.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Supply Chain Inventory Velocity">
          <span class="${p}-kicker">BOARD 02</span>
          <h3 style="font-size:20px;">Inventory Velocity</h3>
          <p style="color:var(--muted);font-size:14px;">SKU lead-time forecasting and safety-stock threshold alerts.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Paid Acquisition Attribution">
          <span class="${p}-kicker">BOARD 03</span>
          <h3 style="font-size:20px;">Multi-Touch Attribution</h3>
          <p style="color:var(--muted);font-size:14px;">Channel marginal ROAS and pipeline conversion velocity.</p>
        </article>
      </div>
    </section>

    <!-- SECTION 5: PRICING -->
    <section id="pricingSection" class="${p}-section" aria-labelledby="priceHeading">
      <span class="${p}-kicker">04 / CREDIT PLANS</span>
      <h2 id="priceHeading" class="${p}-h2">Predictable Usage Tiers</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">ANALYST</span>
          <strong class="tabular-nums" style="font-size:36px;">$0<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">450 monthly GPT-4o credits, CSV/Parquet uploads, and instant chart exports.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card style="border-color:var(--accent);">
          <span class="${p}-kicker">TEAM INTELLIGENCE</span>
          <strong class="tabular-nums" style="font-size:36px;">$39<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">5,000 monthly credits, live Snowflake/Postgres connectors, and shared boards.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span class="${p}-kicker">ENTERPRISE</span>
          <strong class="tabular-nums" style="font-size:36px;">$149<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">Unlimited credits, VPC deployment, and custom semantic layer models.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <div><strong>Transform Data</strong> — Discover what's possible. © 2026 Transform Data Labs.</div>
    <div style="display:flex;gap:20px;">
      <a href="#liveAnalytics" style="color:var(--muted);text-decoration:none;">Platform</a>
      <a href="#pinnedSpecs" style="color:var(--muted);text-decoration:none;">Features</a>
      <a href="#projectsSection" style="color:var(--muted);text-decoration:none;">Projects</a>
      <a href="#pricingSection" style="color:var(--muted);text-decoration:none;">Pricing</a>
    </div>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-kicker">Transform Data Engine</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:10px;">Transform Data Quickly</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Connect your dataset or upload a CSV/Parquet file to generate verified GPT-4o executive charts in milliseconds.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-dark" style="width:100%;">Open Data Workspace</button>
    </div>
  </div>

  <script>
    (function () {
      var input = document.getElementById('dataQueryInput');
      var countEl = document.getElementById('dataCharCount');
      var titleEl = document.getElementById('liveQueryTitle');
      var runBtn = document.getElementById('runQueryBtn');

      function updateQuery() {
        if (!input) return;
        var val = input.value || '';
        if (countEl) countEl.textContent = val.length + '/3,000';
      }
      if (input) input.addEventListener('input', updateQuery);
      if (runBtn && input && titleEl) {
        runBtn.addEventListener('click', function () {
          titleEl.textContent = 'Synthesized: ' + (input.value.slice(0, 34) || 'Custom Cohort Insight');
        });
      }
      document.querySelectorAll('[data-query-preset]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var q = btn.getAttribute('data-query-preset') || '';
          if (input) { input.value = q; updateQuery(); }
          if (titleEl) titleEl.textContent = 'Synthesized: ' + q.slice(0, 34);
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 5. DUOLINGO STYLEGUIDE (t173 — Free Tier)
  // Tactile Gamified Design System & Interactive Token Workbench
  // Palette: Feather Green #58CC02, Sky Blue #1CB0F6, Dark Navy #100F3E, Cardinal #FF4B4B, Amber #FF9600
  // ============================================================================
  if (spec.slug === 'duolingo-styleguide') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Duolingo Styleguide — Tactile Gamified Design System &amp; UI Token Workbench</title>
  <meta name="description" content="Explore Duolingo's playful, accessible design language: Feather Green 3D tactile buttons, Nunito typographic scale, course cards, and live token workbench.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #F7F9FA;
      --surface: #FFFFFF;
      --surface-dark: #100F3E;
      --surface-dark-card: #1B1A55;
      --fg: #1E293B;
      --muted: #475569;
      --border: #E2E8F0;
      --border-dark: rgba(255, 255, 255, 0.16);
      --accent: #58CC02;
      --accent-shadow: #46A302;
      --accent-text: #1B5E20;
      --sky: #1CB0F6;
      --sky-shadow: #1899D6;
      --danger: #FF4B4B;
      --danger-shadow: #EA2B2B;
      --orange: #FF9600;
      --gold: #FFC800;
      --font-display: 'Nunito', system-ui, sans-serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 20px;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: #0A1905; }
    html, body {
      background: var(--bg); color: var(--fg); font-family: var(--font-sans);
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--surface-dark); color: #ffffff;
      font-weight: 700; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid var(--sky); outline-offset: 3px; }
    a:focus-visible, button:focus-visible, input:focus-visible {
      outline: 2px solid var(--sky); outline-offset: 3px;
    }
    button, [role="button"] {
      font-family: var(--font-display);
      transition: transform 0.16s var(--ease-out), background-color 0.16s var(--ease-out), opacity 0.16s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: translateY(3px) scale(0.98);
    }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 2px solid var(--sky); margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent-shadow); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 0; z-index: 220; background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(14px); border-bottom: 2px solid var(--border);
    }
    .${p}-nav-inner {
      max-width: 1360px; margin: 0 auto; padding: 14px clamp(20px, 4vw, 56px);
      display: flex; align-items: center; justify-content: space-between; gap: 20px;
    }
    .${p}-brand {
      display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--fg);
    }
    .${p}-wordmark {
      font-family: var(--font-display); font-weight: 900; font-size: 26px; letter-spacing: -0.03em; color: #100F3E;
    }
    .${p}-divider { width: 2px; height: 22px; background: var(--border); }
    .${p}-badge-tag {
      font-family: var(--font-display); font-weight: 800; font-size: 11px; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--muted);
    }
    .${p}-nav-links { display: flex; gap: 24px; list-style: none; }
    .${p}-nav-links a {
      color: var(--fg); text-decoration: none; font-family: var(--font-display);
      font-weight: 800; font-size: 14px;
    }
    .${p}-nav-links a:hover { color: #0B6E99; }

    /* 3D Tactile Buttons */
    .${p}-btn-green {
      padding: 12px 24px; border-radius: 16px; background: var(--accent); color: #091E05;
      font-weight: 900; font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase;
      border: 2px solid var(--accent-shadow); border-bottom-width: 5px; cursor: pointer;
    }
    .${p}-btn-sky {
      padding: 12px 24px; border-radius: 16px; background: var(--sky); color: #062335;
      font-weight: 900; font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase;
      border: 2px solid var(--sky-shadow); border-bottom-width: 5px; cursor: pointer;
    }
    .${p}-btn-danger {
      padding: 12px 24px; border-radius: 16px; background: var(--danger); color: #2B0404;
      font-weight: 900; font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase;
      border: 2px solid var(--danger-shadow); border-bottom-width: 5px; cursor: pointer;
    }
    .${p}-btn-ghost {
      padding: 10px 18px; border-radius: 16px; background: #FFFFFF; color: var(--fg);
      font-weight: 800; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase;
      border: 2px solid #CBD5E1; border-bottom-width: 4px; cursor: pointer;
    }

    .${p}-hero {
      max-width: 1360px; margin: 28px auto 0; padding: 0 clamp(20px, 4vw, 56px);
    }
    .${p}-hero-banner {
      background: var(--surface-dark); color: #FFFFFF; border-radius: 28px;
      padding: clamp(40px, 6vw, 72px); display: grid; grid-template-columns: 1.15fr 0.85fr;
      gap: 36px; align-items: center; position: relative; overflow: hidden;
      border: 2px solid #25236E;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 900;
      font-size: clamp(42px, 5.8vw, 72px); line-height: 1.02; letter-spacing: -0.025em;
      color: #FFFFFF; margin: 14px 0 18px;
    }
    .${p}-sub {
      font-size: clamp(16px, 1.8vw, 19px); color: #E2E8F0; line-height: 1.6;
      max-width: 54ch; margin-bottom: 28px;
    }

    .${p}-grid-8 {
      max-width: 1360px; margin: 36px auto 64px; padding: 0 clamp(20px, 4vw, 56px);
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px;
    }
    .${p}-panel-light {
      background: var(--surface); border: 2px solid var(--border); border-bottom-width: 5px;
      border-radius: 24px; padding: clamp(24px, 3.5vw, 36px); color: var(--fg);
    }
    .${p}-panel-dark {
      background: var(--surface-dark); border: 2px solid #292775; border-bottom-width: 5px;
      border-radius: 24px; padding: clamp(24px, 3.5vw, 36px); color: #FFFFFF;
    }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 900;
      font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; margin-bottom: 8px;
    }
    .${p}-kicker {
      font-family: var(--font-mono); font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent-text);
      display: inline-block; margin-bottom: 6px;
    }
    .${p}-panel-dark .${p}-kicker { color: var(--gold); }

    .${p}-swatch-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px;
    }
    .${p}-swatch-btn {
      display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;
      padding: 14px; border-radius: 16px; border: 2px solid rgba(15,23,42,0.12);
      border-bottom-width: 4px; min-height: 88px; cursor: pointer; text-align: left;
    }
    .${p}-course-card {
      padding: 18px; border-radius: 18px; border: 2px solid var(--border); border-bottom-width: 4px;
      display: flex; align-items: center; gap: 16px; margin-top: 14px; background: #FAFCFF;
    }
    .${p}-super-card {
      padding: 18px; border-radius: 18px; border: 2px solid rgba(255,255,255,0.18);
      background: var(--surface-dark-card); display: flex; align-items: center; gap: 16px; margin-top: 14px;
    }
    .${p}-progress-track {
      width: 100%; height: 16px; border-radius: 999px; background: #E2E8F0; overflow: hidden; margin-top: 8px;
    }
    .${p}-progress-fill {
      width: 100%; height: 100%; border-radius: 999px; background: var(--accent);
      transform-origin: left center; transform: scaleX(0.85);
      transition: transform 0.4s var(--ease-out);
    }

    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 18px, 0);
      transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-footer {
      max-width: 1360px; margin: 0 auto 48px; padding: 28px clamp(20px, 4vw, 56px);
      border-top: 2px solid var(--border); display: flex; justify-content: space-between;
      align-items: center; flex-wrap: wrap; gap: 16px; color: var(--muted); font-size: 13px;
    }

    .${p}-seamless-overlay {
      position: fixed; inset: 0; z-index: 190; background: rgba(16, 15, 62, 0.78);
      backdrop-filter: blur(12px); display: none; align-items: center; justify-content: center;
      padding: 20px; pointer-events: none;
    }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box {
      max-width: 520px; width: 100%; border-radius: 24px; background: var(--surface);
      border: 2px solid var(--border); border-bottom-width: 6px; padding: 32px;
      color: var(--fg); pointer-events: auto;
    }

    @media (max-width: 1024px) {
      .${p}-hero-banner, .${p}-grid-8 { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .${p}-nav-links { display: none; }
      .${p}-swatch-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-nav-inner">
      <a href="#heroStage" class="${p}-brand">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect width="40" height="40" rx="12" fill="#58CC02"/>
          <circle cx="14" cy="18" r="5" fill="#FFFFFF"/>
          <circle cx="26" cy="18" r="5" fill="#FFFFFF"/>
          <circle cx="14" cy="18" r="2.3" fill="#100F3E"/>
          <circle cx="26" cy="18" r="2.3" fill="#100F3E"/>
          <polygon points="20,21 16,26 24,26" fill="#FFC800"/>
        </svg>
        <span class="${p}-wordmark">duolingo</span>
        <span class="${p}-divider" aria-hidden="true"></span>
        <span class="${p}-badge-tag">STYLE GUIDE</span>
      </a>
      <nav aria-label="Styleguide Sections">
        <ul class="${p}-nav-links">
          <li><a href="#colorsPanel">Colors</a></li>
          <li><a href="#typePanel">Typography</a></li>
          <li><a href="#buttonsPanel">Buttons</a></li>
          <li><a href="#cardsPanel">Cards</a></li>
          <li><a href="#componentsPanel">Components</a></li>
        </ul>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" data-motion-toggle aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-green" data-magnetic data-next-preview>Export Tokens</button>
      </div>
    </div>
  </header>

  <main id="mainContent">
    <!-- HERO -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <div class="${p}-hero-banner">
        <div>
          <span style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:rgba(88,204,2,0.18);color:#89E219;font-family:var(--font-mono);font-size:12px;font-weight:700;">
            DESIGN LANGUAGE v4.8 • TACTILE GAMIFICATION
          </span>
          <h1 id="oversizedHeadline" class="${p}-h1">duolingo design</h1>
          <p class="${p}-sub">
            Our tactile design system pairs rounded Nunito geometry, 4px bottom-lip 3D button physics, and vibrant Feather Green feedback loops to make daily learning feel effortless.
          </p>
          <div style="display:flex;gap:14px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-green" data-seamless-trigger="Duolingo Design System — Token Kit">GET STARTED</button>
            <button type="button" class="${p}-btn-sky" data-seamless-trigger="Duolingo Component Library — Figma &amp; CSS">I ALREADY HAVE AN ACCOUNT</button>
          </div>
        </div>
        <div style="background:var(--surface-dark-card);border:2px solid rgba(255,255,255,0.18);border-radius:24px;padding:24px;" class="tabular-nums">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
            <span style="font-family:var(--font-mono);font-size:12px;color:#FFC800;">LIVE STREAK ENGINE</span>
            <span id="streakBadgeOut" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:rgba(255,150,0,0.2);color:#FFC800;font-weight:800;font-size:14px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF9600" aria-hidden="true"><path d="M12 2c2 4 6 6.5 6 11a6 6 0 1 1-12 0c0-3 2-6 3-8 1 2 2 3 3 3s1-3 0-6z"/></svg>
              <strong data-counter-target="42" data-counter-suffix=" Day Streak">42 Day Streak</strong>
            </span>
          </div>
          <p style="font-size:14px;color:#E2E8F0;line-height:1.55;margin-bottom:16px;">
            Click any swatch or interactive control below to copy live CSS variables or test tactile 3D button states.
          </p>
          <div style="padding:14px;border-radius:14px;background:#0A0929;border:1px solid rgba(255,255,255,0.12);font-family:var(--font-mono);font-size:12px;color:#89E219;" id="liveTokenConsole">
            /* Copied Token */ --duo-feather-green: #58CC02;
          </div>
        </div>
      </div>
    </section>

    <!-- 8-PANEL 2-COLUMN WORKBENCH GRID -->
    <section class="${p}-grid-8" aria-label="Design System Workbench">
      <!-- PANEL 1: COLOR SWATCHES (ONE LIVE THING) -->
      <article id="colorsPanel" class="${p}-panel-light ${p}-reveal">
        <span class="${p}-kicker">01 / BRAND PALETTE</span>
        <h2 class="${p}-h2">Interactive Color Swatches</h2>
        <p style="font-size:14px;color:var(--muted);max-width:56ch;">Click any swatch to inspect and copy its production hex token into the live console.</p>
        <div class="${p}-swatch-grid tabular-nums">
          <button type="button" class="${p}-swatch-btn" data-swatch-name="Feather Green" data-swatch-hex="#58CC02" style="background:#58CC02;color:#091E05;">
            <strong>Feather Green</strong><span style="font-family:var(--font-mono);font-size:12px;">#58CC02</span>
          </button>
          <button type="button" class="${p}-swatch-btn" data-swatch-name="Tree Frog" data-swatch-hex="#46A302" style="background:#46A302;color:#FFFFFF;">
            <strong>Tree Frog</strong><span style="font-family:var(--font-mono);font-size:12px;">#46A302</span>
          </button>
          <button type="button" class="${p}-swatch-btn" data-swatch-name="Macaw Sky" data-swatch-hex="#1CB0F6" style="background:#1CB0F6;color:#052130;">
            <strong>Macaw Sky</strong><span style="font-family:var(--font-mono);font-size:12px;">#1CB0F6</span>
          </button>
          <button type="button" class="${p}-swatch-btn" data-swatch-name="Dark Navy" data-swatch-hex="#100F3E" style="background:#100F3E;color:#FFFFFF;">
            <strong>Dark Navy</strong><span style="font-family:var(--font-mono);font-size:12px;">#100F3E</span>
          </button>
          <button type="button" class="${p}-swatch-btn" data-swatch-name="Cardinal Red" data-swatch-hex="#FF4B4B" style="background:#FF4B4B;color:#2B0404;">
            <strong>Cardinal Red</strong><span style="font-family:var(--font-mono);font-size:12px;">#FF4B4B</span>
          </button>
          <button type="button" class="${p}-swatch-btn" data-swatch-name="Bee Gold" data-swatch-hex="#FFC800" style="background:#FFC800;color:#241A00;">
            <strong>Bee Gold</strong><span style="font-family:var(--font-mono);font-size:12px;">#FFC800</span>
          </button>
        </div>
      </article>

      <!-- PANEL 2: TYPOGRAPHY SCALE -->
      <article id="typePanel" class="${p}-panel-light ${p}-reveal tabular-nums">
        <span class="${p}-kicker">02 / NUNITO TYPE SCALE</span>
        <h2 class="${p}-h2">Rounded Geometric Hierarchy</h2>
        <p style="font-size:14px;color:var(--muted);margin-bottom:16px;max-width:56ch;">Friendly rounded terminals keep complex grammar lessons approachable on every screen.</p>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="padding:12px;border-radius:14px;background:#F1F5F9;display:flex;justify-content:space-between;align-items:baseline;">
            <span style="font-family:var(--font-display);font-weight:900;font-size:32px;color:#100F3E;">Display 48px</span>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">Nunito 900 • -0.025em</span>
          </div>
          <div style="padding:12px;border-radius:14px;background:#F1F5F9;display:flex;justify-content:space-between;align-items:baseline;">
            <span style="font-family:var(--font-display);font-weight:800;font-size:22px;color:#100F3E;">Heading 28px</span>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">Nunito 800 • -0.015em</span>
          </div>
          <div style="padding:12px;border-radius:14px;background:#F1F5F9;display:flex;justify-content:space-between;align-items:baseline;">
            <span style="font-weight:600;font-size:16px;color:var(--fg);">Body Lesson Copy 16px</span>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">Plus Jakarta 600 • 1.6</span>
          </div>
        </div>
      </article>

      <!-- PANEL 3: LIGHT BUTTON VARIANTS -->
      <article id="buttonsPanel" class="${p}-panel-light ${p}-reveal">
        <span class="${p}-kicker">03 / TACTILE CONTROLS (LIGHT)</span>
        <h2 class="${p}-h2">3D Lip Button Physics</h2>
        <p style="font-size:14px;color:var(--muted);margin-bottom:18px;max-width:56ch;">Every button features a 4px bottom lip that compresses on active press for instant physical feedback.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button type="button" class="${p}-btn-green" data-button-demo="Primary Check">CHECK ANSWER</button>
          <button type="button" class="${p}-btn-sky" data-button-demo="Secondary Practice">PRACTICE UNIT</button>
          <button type="button" class="${p}-btn-danger" data-button-demo="Danger Reset">HEART REFILL</button>
          <button type="button" class="${p}-btn-ghost" data-button-demo="Ghost Skip">SKIP STEP</button>
        </div>
      </article>

      <!-- PANEL 4: DARK THEME BUTTONS -->
      <article class="${p}-panel-dark ${p}-reveal">
        <span class="${p}-kicker">04 / NIGHT OWL MODE (#100F3E)</span>
        <h2 class="${p}-h2">Dark Surface Controls</h2>
        <p style="font-size:14px;color:#CBD5E1;margin-bottom:18px;max-width:56ch;">High-luminance surface tokens preserve WCAG AA legibility during late-night streak sessions.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button type="button" class="${p}-btn-green" data-seamless-trigger="Super Duolingo Night Owl Mode">START NIGHT LESSON</button>
          <button type="button" class="${p}-btn-sky" data-seamless-trigger="League Leaderboard Challenge">VIEW DIAMOND LEAGUE</button>
        </div>
      </article>

      <!-- PANEL 5: LIGHT COURSE CARDS -->
      <article id="cardsPanel" class="${p}-panel-light ${p}-reveal tabular-nums">
        <span class="${p}-kicker">05 / CURRICULUM MODULES</span>
        <h2 class="${p}-h2">Light Course Cards</h2>
        <div class="${p}-course-card">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect width="48" height="48" rx="14" fill="#FFF3D6"/>
            <circle cx="24" cy="24" r="13" fill="#FF9600"/>
            <path d="M18 25l4 4 8-8" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-family:var(--font-display);font-size:18px;">Spanish for Beginners</strong>
              <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-text);">12 UNITS</span>
            </div>
            <p style="font-size:13px;color:var(--muted);margin-top:4px;">Greetings, travel essentials, and cafe conversations.</p>
          </div>
        </div>
        <div class="${p}-course-card">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect width="48" height="48" rx="14" fill="#E0F4FF"/>
            <circle cx="24" cy="24" r="13" fill="#1CB0F6"/>
            <path d="M17 24h14M24 17v14" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-family:var(--font-display);font-size:18px;">French Conversations</strong>
              <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:#0B6E99;">8 UNITS</span>
            </div>
            <p style="font-size:13px;color:var(--muted);margin-top:4px;">Phonetics, Parisian dining, and past tense storytelling.</p>
          </div>
        </div>
      </article>

      <!-- PANEL 6: DARK SUPER CARDS -->
      <article class="${p}-panel-dark ${p}-reveal">
        <span class="${p}-kicker">06 / SUPER DUOLINGO PERKS</span>
        <h2 class="${p}-h2">Dark Pro Feature Cards</h2>
        <div class="${p}-super-card">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <rect width="44" height="44" rx="12" fill="rgba(255,75,75,0.2)"/>
            <path d="M22 32s-9-5.6-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.4-9 12-9 12z" fill="#FF4B4B"/>
          </svg>
          <div>
            <strong style="font-family:var(--font-display);font-size:18px;color:#FFFFFF;">Unlimited Hearts</strong>
            <p style="font-size:13px;color:#CBD5E1;margin-top:3px;">Mistakes are part of learning — practice without interruption.</p>
          </div>
        </div>
        <div class="${p}-super-card">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <rect width="44" height="44" rx="12" fill="rgba(28,176,246,0.2)"/>
            <polygon points="22,9 26,18 35,19 28,25 30,34 22,29 14,34 16,25 9,19 18,18" fill="#FFC800"/>
          </svg>
          <div>
            <strong style="font-family:var(--font-display);font-size:18px;color:#FFFFFF;">Mastery Quizzes</strong>
            <p style="font-size:13px;color:#CBD5E1;margin-top:3px;">Adaptive spaced-repetition reviews tailored to your weak spots.</p>
          </div>
        </div>
      </article>

      <!-- PANEL 7: INTERACTIVE COMPONENTS -->
      <article id="componentsPanel" class="${p}-panel-light ${p}-reveal tabular-nums">
        <span class="${p}-kicker">07 / LIVE PROGRESS &amp; XP SIMULATOR</span>
        <h2 class="${p}-h2">Interactive XP &amp; Streak Progress</h2>
        <div style="margin:14px 0;">
          <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;">
            <span>Daily Goal Completion</span>
            <span id="xpPctLabel">85% (85 / 100 XP)</span>
          </div>
          <div class="${p}-progress-track">
            <div id="xpProgressBar" class="${p}-progress-fill"></div>
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;">
          <button type="button" class="${p}-btn-green" id="addXpBtn">+15 XP Lesson Boost</button>
          <button type="button" class="${p}-btn-ghost" id="soundToggleSimBtn" aria-pressed="true">Sound Effects: ON</button>
        </div>
      </article>

      <!-- PANEL 8: LANGUAGE PILLS & ACTIVE LEARNERS -->
      <article class="${p}-panel-dark ${p}-reveal tabular-nums">
        <span class="${p}-kicker">08 / GLOBAL TRACKS</span>
        <h2 class="${p}-h2">Language Pills &amp; Active Cohort</h2>
        <p style="font-size:14px;color:#CBD5E1;margin-bottom:16px;max-width:56ch;">Switch active language track to preview localized unit metrics.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px;">
          <button type="button" class="${p}-btn-green" data-lang-pill="Spanish • 14.2M Learners">Spanish</button>
          <button type="button" class="${p}-btn-sky" data-lang-pill="French • 9.8M Learners">French</button>
          <button type="button" class="${p}-btn-sky" data-lang-pill="Japanese • 7.4M Learners">Japanese</button>
          <button type="button" class="${p}-btn-sky" data-lang-pill="German • 5.6M Learners">German</button>
        </div>
        <div style="padding:14px;border-radius:14px;background:var(--surface-dark-card);display:flex;justify-content:space-between;align-items:center;">
          <span id="activeLangStatus" style="font-weight:700;font-size:14px;color:#89E219;">Spanish • 14.2M Learners</span>
          <span style="font-family:var(--font-mono);font-size:12px;color:#FFC800;">+5 COHORT PEERS ONLINE</span>
        </div>
      </article>
    </section>
  </main>

  <footer class="${p}-footer">
    <div><strong>Duolingo Styleguide</strong> — Tactile Design System Workbench. Crafted with ForgeFrame Gold v2.0.</div>
    <div style="display:flex;gap:18px;">
      <a href="#colorsPanel" style="color:var(--fg);text-decoration:none;font-weight:700;">Colors</a>
      <a href="#typePanel" style="color:var(--fg);text-decoration:none;font-weight:700;">Typography</a>
      <a href="#buttonsPanel" style="color:var(--fg);text-decoration:none;font-weight:700;">Buttons</a>
      <a href="#componentsPanel" style="color:var(--fg);text-decoration:none;font-weight:700;">Components</a>
    </div>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-kicker">DUOLINGO DESIGN TOKENS</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-weight:900;font-size:28px;margin-bottom:10px;">Export Tactile UI Kit</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Download the complete CSS custom properties, 3D tactile button mixins, and Nunito typographic scale tokens.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-green" style="width:100%;">Copy Production CSS Bundle</button>
    </div>
  </div>

  <script>
    (function () {
      var consoleEl = document.getElementById('liveTokenConsole');
      document.querySelectorAll('[data-swatch-hex]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var name = btn.getAttribute('data-swatch-name') || 'Color';
          var hex = btn.getAttribute('data-swatch-hex') || '#58CC02';
          if (consoleEl) {
            consoleEl.textContent = '/* Copied ' + name + ' */ --duo-token: ' + hex + ';';
          }
        });
      });

      var xp = 85;
      var xpBar = document.getElementById('xpProgressBar');
      var xpLabel = document.getElementById('xpPctLabel');
      var addXpBtn = document.getElementById('addXpBtn');
      if (addXpBtn) {
        addXpBtn.addEventListener('click', function () {
          xp = xp >= 100 ? 35 : Math.min(100, xp + 15);
          if (xpBar) xpBar.style.transform = 'scaleX(' + (xp / 100) + ')';
          if (xpLabel) xpLabel.textContent = xp + '% (' + xp + ' / 100 XP)';
        });
      }

      var soundBtn = document.getElementById('soundToggleSimBtn');
      if (soundBtn) {
        soundBtn.addEventListener('click', function () {
          var on = soundBtn.getAttribute('aria-pressed') === 'true';
          soundBtn.setAttribute('aria-pressed', String(!on));
          soundBtn.textContent = !on ? 'Sound Effects: ON' : 'Sound Effects: MUTED';
        });
      }

      var langOut = document.getElementById('activeLangStatus');
      document.querySelectorAll('[data-lang-pill]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (langOut) langOut.textContent = btn.getAttribute('data-lang-pill') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 6. CROSS-BORDER — CARGOX GROUP (t174 — Premium Tier)
  // Global Intermodal Freight & Cross-Border Logistics Command
  // Palette: Obsidian #111111, Deep Maritime Navy #0A1F2B, Signal Yellow #FFDA00, Warm Terracotta Route Gradient
  // ============================================================================
  if (spec.slug === 'cross-border') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>CARGOX GROUP — Beyond Borders and Limits | Cross-Border Freight Command</title>
  <meta name="description" content="Global intermodal logistics shaped by scale and powered by precision. 3M+ tons of cargo delivered across sea, air, and overland corridors.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0A1F2B;
      --surface: #112A3A;
      --surface-dark: #07151E;
      --fg: #F8FAFC;
      --muted: #B0C4D4;
      --border: rgba(255, 255, 255, 0.14);
      --accent: #FFDA00;
      --accent-strong: #FFE433;
      --on-accent: #0A1F2B;
      --terracotta: #EA7C58;
      --font-display: 'Barlow Condensed', sans-serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: var(--bg); color: var(--fg); font-family: var(--font-sans);
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid #ffffff; outline-offset: 3px; }
    a:focus-visible, button:focus-visible, select:focus-visible, input:focus-visible {
      outline: 2px solid var(--accent); outline-offset: 3px;
    }
    button, [role="button"] {
      transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: scale(0.97) translateY(1px);
    }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid var(--accent); margin: -17px 0 0 -17px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 0; z-index: 220;
      background: rgba(10, 31, 43, 0.88); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .${p}-nav {
      max-width: 1380px; margin: 0 auto; padding: 16px clamp(20px, 4vw, 64px);
      display: flex; align-items: center; justify-content: space-between; gap: 20px;
    }
    .${p}-brand {
      font-family: var(--font-display); font-weight: 800; font-size: 28px;
      letter-spacing: 0.04em; text-transform: uppercase; color: #FFFFFF; text-decoration: none;
    }
    .${p}-nav-links { display: flex; gap: 28px; list-style: none; }
    .${p}-nav-links a {
      color: var(--fg); text-decoration: none; font-size: 14px; font-weight: 600;
    }
    .${p}-nav-links a:hover { color: var(--accent); }
    .${p}-btn-yellow {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 11px 24px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em;
      border: none; cursor: pointer;
    }
    .${p}-btn-ghost {
      padding: 9px 16px; border-radius: 999px; background: rgba(255,255,255,0.08);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      max-width: 1380px; margin: 0 auto; padding: clamp(44px, 6vw, 84px) clamp(20px, 4vw, 64px);
      display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 40px; align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
      font-size: clamp(56px, 8.5vw, 118px); line-height: 0.9; letter-spacing: -0.01em;
      color: #FFFFFF; margin: 14px 0 22px;
    }
    .${p}-h1 span { color: var(--accent); display: block; }
    .${p}-lead {
      font-size: clamp(16px, 1.8vw, 19px); color: var(--muted); line-height: 1.6;
      max-width: 54ch; margin-bottom: 28px;
    }

    /* Realistic iPhone 15 Pro Container Telemetry Frame */
    .${p}-phone-frame {
      max-width: 340px; width: 100%; margin: 0 auto; border-radius: 44px;
      padding: 14px; background: #111111; border: 3px solid #334155;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55);
    }
    .${p}-phone-screen {
      border-radius: 32px; padding: 22px 18px;
      background: linear-gradient(180deg, #C8C7B3 0%, #F0B172 50%, #EA7C58 100%);
      color: #111111; position: relative; min-height: 440px;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .${p}-dynamic-island {
      width: 96px; height: 22px; border-radius: 999px; background: #111111; margin: 0 auto 16px;
    }

    .${p}-section {
      max-width: 1380px; margin: 0 auto; padding: clamp(56px, 7vw, 92px) clamp(20px, 4vw, 64px);
      border-top: 1px solid var(--border);
    }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
      font-size: clamp(38px, 5.2vw, 68px); line-height: 0.95; margin-bottom: 18px;
    }
    .${p}-route-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 24px;
      padding: clamp(24px, 4vw, 40px); display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 32px; align-items: center;
    }
    .${p}-estimator-grid {
      display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 28px; margin-top: 24px;
    }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 28px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 20px, 0);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-footer {
      max-width: 1380px; margin: 0 auto; padding: 36px clamp(20px, 4vw, 64px);
      border-top: 1px solid var(--border); display: flex; justify-content: space-between;
      align-items: center; flex-wrap: wrap; gap: 16px; font-size: 13px; color: var(--muted);
    }

    .${p}-seamless-overlay {
      position: fixed; inset: 0; z-index: 190; background: rgba(7, 21, 30, 0.84);
      backdrop-filter: blur(14px); display: none; align-items: center; justify-content: center;
      padding: 20px; pointer-events: none;
    }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box {
      max-width: 540px; width: 100%; border-radius: 24px; background: var(--surface);
      border: 1px solid var(--border); padding: 32px; color: var(--fg); pointer-events: auto;
    }

    @media (max-width: 1024px) {
      .${p}-hero, .${p}-route-card, .${p}-estimator-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .${p}-nav-links { display: none; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-nav">
      <a href="#heroStage" class="${p}-brand">CARGOX GROUP</a>
      <nav aria-label="Primary Logistics Navigation">
        <ul class="${p}-nav-links">
          <li><a href="#routeMapSection">Global Corridors</a></li>
          <li><a href="#freightCalculator">Rate Estimator</a></li>
          <li><a href="#contactSection">Dispatch Desk</a></li>
        </ul>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" data-motion-toggle aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-yellow" data-magnetic data-next-preview>Get in touch</button>
      </div>
    </div>
  </header>

  <main id="mainContent">
    <!-- SECTION 1: HERO -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <div>
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);letter-spacing:0.16em;">INTERMODAL CROSS-BORDER COMMAND</span>
        <h1 id="oversizedHeadline" class="${p}-h1">
          BEYOND
          <span>BORDERS</span>
          AND LIMITS
        </h1>
        <p class="${p}-lead">
          Precision-routed maritime, rail, and air freight corridors connecting European hubs, Asian ports, and North American distribution centers in real time.
        </p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;">
          <button type="button" class="${p}-btn-yellow" data-seamless-trigger="CARGOX Priority Corridor Booking">
            <span>Get in touch</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
          <a href="#freightCalculator" class="${p}-btn-ghost" style="text-decoration:none;padding:11px 20px;">Calculate Tonnage Rate</a>
        </div>
      </div>

      <!-- Realistic iPhone 15 Pro Container Telemetry Mockup -->
      <div class="${p}-phone-frame" data-tilt-card>
        <div class="${p}-phone-screen tabular-nums">
          <div>
            <div class="${p}-dynamic-island" aria-hidden="true"></div>
            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:11px;font-weight:700;">
              <span>CARGOX LIVE BILL</span>
              <span>#CX-88412</span>
            </div>
            <h2 style="font-family:var(--font-display);font-size:34px;font-weight:800;line-height:0.95;margin-top:12px;text-transform:uppercase;">
              ROTTERDAM → SHANGHAI
            </h2>
          </div>

          <!-- Inline SVG Isometric Cargo Vessel & Container Stack -->
          <svg viewBox="0 0 260 140" width="100%" height="130" fill="none" aria-hidden="true">
            <rect x="24" y="78" width="212" height="36" rx="10" fill="#0A1F2B"/>
            <rect x="46" y="42" width="52" height="36" rx="4" fill="#111111"/>
            <rect x="104" y="34" width="52" height="44" rx="4" fill="#FFDA00"/>
            <rect x="162" y="48" width="48" height="30" rx="4" fill="#0A1F2B"/>
            <path d="M12 118c36 8 72-8 108 0s72 8 128 0" stroke="#0A1F2B" stroke-width="3" stroke-linecap="round"/>
          </svg>

          <div style="background:rgba(17,17,17,0.9);color:#FFFFFF;padding:14px;border-radius:18px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:#FFDA00;font-family:var(--font-mono);">
              <span>VESSEL TELEMETRY</span>
              <span>99.4% ON-TIME</span>
            </div>
            <p style="font-size:14px;font-weight:700;margin-top:4px;">42 TEU Containers • Cleared Customs</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: WORLD ROUTE MAP & SCALE METRICS -->
    <section id="routeMapSection" class="${p}-section" aria-labelledby="scaleHeading">
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);letter-spacing:0.14em;">GLOBAL NETWORK TOPOLOGY</span>
      <h2 id="scaleHeading" class="${p}-h2">LOGISTICS shaped by scale / powered by precision</h2>

      <div class="${p}-route-card ${p}-reveal">
        <div>
          <svg viewBox="0 0 680 300" width="100%" height="260" fill="none" aria-hidden="true" style="background:#07151E;border-radius:18px;border:1px solid var(--border);">
            <!-- Grid lines -->
            <line x1="0" y1="75" x2="680" y2="75" stroke="rgba(255,255,255,0.06)"/>
            <line x1="0" y1="150" x2="680" y2="150" stroke="rgba(255,255,255,0.06)"/>
            <line x1="0" y1="225" x2="680" y2="225" stroke="rgba(255,255,255,0.06)"/>
            <!-- 4 Curved Yellow Bezier Corridors -->
            <path d="M90 190 C 210 60, 360 70, 580 150" stroke="#FFDA00" stroke-width="3" stroke-dasharray="6 4"/>
            <path d="M90 190 C 240 240, 410 220, 580 150" stroke="#EA7C58" stroke-width="2.5"/>
            <path d="M180 110 C 310 40, 440 90, 540 210" stroke="#FFDA00" stroke-width="2" stroke-opacity="0.7"/>
            <path d="M140 230 C 290 160, 420 140, 580 150" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.75"/>
            <!-- 5 Port Nodes -->
            <circle cx="90" cy="190" r="7" fill="#FFDA00"/>
            <circle cx="180" cy="110" r="6" fill="#FFFFFF"/>
            <circle cx="340" cy="132" r="7" fill="#FFDA00"/>
            <circle cx="540" cy="210" r="6" fill="#EA7C58"/>
            <circle cx="580" cy="150" r="8" fill="#FFDA00"/>
          </svg>
        </div>
        <div class="tabular-nums" style="display:flex;flex-direction:column;gap:22px;">
          <div style="padding:20px;border-radius:18px;background:var(--surface-dark);border:1px solid var(--border);">
            <strong data-counter-target="3" data-counter-suffix="M+ Tons" style="font-family:var(--font-display);font-size:48px;color:var(--accent);display:block;line-height:1;">3M+ Tons</strong>
            <span style="font-size:14px;color:var(--muted);">of cross-border cargo delivered safely across 48 countries</span>
          </div>
          <div style="padding:20px;border-radius:18px;background:var(--surface-dark);border:1px solid var(--border);">
            <strong data-counter-target="13" data-counter-suffix="+ Years" style="font-family:var(--font-display);font-size:48px;color:#FFFFFF;display:block;line-height:1;">13+ Years</strong>
            <span style="font-size:14px;color:var(--muted);">of trusted customs clearance &amp; intermodal operations</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: ONE LIVE THING (CORRIDOR RATE ESTIMATOR) & CONTACT US -->
    <section id="freightCalculator" class="${p}-section" aria-labelledby="calcHeading">
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);letter-spacing:0.14em;">INTERACTIVE DISPATCH WORKBENCH</span>
      <h2 id="calcHeading" class="${p}-h2">Cross-Border Corridor &amp; Tonnage Estimator</h2>
      <div class="${p}-estimator-grid">
        <article class="${p}-card tabular-nums">
          <label for="corridorSelect" style="display:block;font-size:13px;font-weight:700;color:var(--accent);margin-bottom:8px;">1. Select Intermodal Corridor:</label>
          <select id="corridorSelect" style="width:100%;padding:12px;border-radius:12px;background:var(--surface-dark);color:#FFFFFF;border:1px solid var(--border);font-size:14px;margin-bottom:18px;">
            <option value="sea" data-rate="145" data-days="18 Days Transit">Maritime Deep-Sea (Rotterdam ↔ Shanghai)</option>
            <option value="rail" data-rate="260" data-days="9 Days Transit">Eurasian Express Rail (Warsaw ↔ Chongqing)</option>
            <option value="air" data-rate="680" data-days="48 Hours Priority">Dedicated Air Charter (Frankfurt ↔ Chicago)</option>
          </select>

          <label for="tonnageRange" style="display:block;font-size:13px;font-weight:700;color:var(--accent);margin-bottom:8px;">
            2. Cargo Volume: <span id="tonnageValueLabel">24 Metric Tons</span>
          </label>
          <input id="tonnageRange" type="range" min="5" max="120" value="24" style="width:100%;margin-bottom:20px;accent-color:#FFDA00;" />

          <div style="padding:18px;border-radius:16px;background:var(--surface-dark);border:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">ESTIMATED DISPATCH TARIFF</span>
              <strong id="estimatedCostOut" style="display:block;font-family:var(--font-display);font-size:38px;color:var(--accent);">$3,480 USD</strong>
            </div>
            <span id="estimatedTransitOut" style="padding:8px 14px;border-radius:999px;background:rgba(255,218,0,0.14);color:var(--accent);font-family:var(--font-mono);font-size:12px;font-weight:700;">18 Days Transit</span>
          </div>
        </article>

        <article id="contactSection" class="${p}-card tabular-nums">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">CONTACT US • 24/7 OPERATIONS DESK</span>
          <h3 style="font-family:var(--font-display);font-size:32px;text-transform:uppercase;margin:8px 0 12px;">Direct Customs &amp; Charter Desk</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:18px;">
            Lock in guaranteed container allocation or request a multi-country bonded customs clearance manifest.
          </p>
          <div style="font-family:var(--font-mono);font-size:13px;color:#FFFFFF;margin-bottom:20px;display:flex;flex-direction:column;gap:6px;">
            <span>Email: info@cargox-group.com</span>
            <span>Hotline: +380 44 234-7890</span>
          </div>
          <button type="button" class="${p}-btn-yellow" style="width:100%;justify-content:center;" data-seamless-trigger="CARGOX Manifest &amp; Rate Lock">
            Request Official Bill of Lading Quote
          </button>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <div><strong>CARGOX GROUP</strong> — Beyond Borders and Limits. © 2026 CargoX Intermodal Logistics.</div>
    <div style="display:flex;gap:20px;">
      <a href="#routeMapSection" style="color:var(--muted);text-decoration:none;">Corridors</a>
      <a href="#freightCalculator" style="color:var(--muted);text-decoration:none;">Estimator</a>
      <a href="#contactSection" style="color:var(--muted);text-decoration:none;">Contact</a>
    </div>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">CARGOX DISPATCH TERMINAL</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:34px;text-transform:uppercase;margin-bottom:10px;">Reserve Container Allocation</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Our customs clearance engineers respond within 30 minutes with vessel IMO numbers and bonded corridor routing.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-yellow" style="width:100%;justify-content:center;">Confirm Dispatch Inquiry</button>
    </div>
  </div>

  <script>
    (function () {
      var sel = document.getElementById('corridorSelect');
      var rng = document.getElementById('tonnageRange');
      var tonLbl = document.getElementById('tonnageValueLabel');
      var costOut = document.getElementById('estimatedCostOut');
      var daysOut = document.getElementById('estimatedTransitOut');

      function updateCalc() {
        if (!sel || !rng) return;
        var opt = sel.options[sel.selectedIndex];
        var rate = parseFloat(opt ? opt.getAttribute('data-rate') : '145') || 145;
        var days = (opt && opt.getAttribute('data-days')) || '18 Days Transit';
        var tons = parseInt(rng.value || '24', 10);
        if (tonLbl) tonLbl.textContent = tons + ' Metric Tons';
        var total = Math.round(rate * tons);
        if (costOut) costOut.textContent = '$' + total.toLocaleString('en-US') + ' USD';
        if (daysOut) daysOut.textContent = days;
      }
      if (sel) sel.addEventListener('change', updateCalc);
      if (rng) rng.addEventListener('input', updateCalc);
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 7. SUBSCRIPTION AGENCY — ALWAYZZ® (t175 — Premium Tier)
  // Minimalist High-Craft On-Demand Creative Partnership
  // Palette: Alabaster White #FFFFFF, Warm Stone #FCFAF8, Obsidian #0A0A0A, Live Green #17C964
  // Typography: Source Serif 4 (400, 600, italic) + Inter + JetBrains Mono
  // ============================================================================
  if (spec.slug === 'subscription-agency') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Alwayzz® — Premium Creative Always On Demand | Design Subscription Agency</title>
  <meta name="description" content="A flexible design partnership for founders, brands, and agencies who want top craft delivered on their timeline.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400;1,8..60,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #FCFAF8;
      --surface: #FFFFFF;
      --surface-elevated: #F3EFEA;
      --fg: #0A0A0A;
      --muted: #525252;
      --border: rgba(10, 10, 10, 0.1);
      --accent: #0A0A0A;
      --accent-text: #0E793C;
      --accent-strong: #17C964;
      --on-accent: #FFFFFF;
      --live-green: #17C964;
      --live-green-text: #0E793C;
      --font-display: 'Source Serif 4', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: #0A0A0A; color: #FFFFFF; }
    html, body {
      background: var(--bg); color: var(--fg); font-family: var(--font-sans);
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--fg); color: #FFFFFF;
      font-weight: 600; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid var(--live-green-text); outline-offset: 3px; }
    a:focus-visible, button:focus-visible {
      outline: 2px solid var(--fg); outline-offset: 3px;
    }
    button, [role="button"] {
      transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: scale(0.97) translateY(1px);
    }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid var(--fg); margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--fg); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 0; z-index: 220;
      background: rgba(252, 250, 248, 0.9); backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border);
    }
    .${p}-nav {
      max-width: 1280px; margin: 0 auto; padding: 18px clamp(20px, 5vw, 64px);
      display: flex; align-items: center; justify-content: space-between; gap: 20px;
    }
    .${p}-brand {
      font-family: var(--font-display); font-style: italic; font-weight: 600;
      font-size: 28px; letter-spacing: -0.02em; color: var(--fg); text-decoration: none;
    }
    .${p}-nav-links { display: flex; gap: 28px; list-style: none; }
    .${p}-nav-links a { color: var(--fg); text-decoration: none; font-size: 14px; font-weight: 500; }
    .${p}-btn-dark {
      padding: 12px 24px; border-radius: 999px; background: var(--fg); color: #FFFFFF;
      border: none; font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .${p}-btn-pill {
      padding: 9px 18px; border-radius: 999px; background: var(--surface);
      border: 1px solid var(--border); color: var(--fg); font-size: 13px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      position: relative; max-width: 1280px; margin: 0 auto;
      padding: clamp(56px, 8vw, 108px) clamp(20px, 5vw, 64px) 64px;
      text-align: center; overflow: hidden;
    }
    .${p}-capability-row {
      display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 28px;
    }
    .${p}-cap-tag {
      padding: 6px 14px; border-radius: 999px; background: var(--surface);
      border: 1px solid var(--border); font-size: 12px; font-weight: 500; color: var(--muted);
    }
    .${p}-h1 {
      font-family: var(--font-sans); font-weight: 600;
      font-size: clamp(44px, 6.8vw, 86px); line-height: 0.98; letter-spacing: -0.04em;
      color: var(--fg); max-width: 820px; margin: 0 auto 22px;
    }
    .${p}-h1 em {
      font-family: var(--font-display); font-style: italic; font-weight: 400;
    }
    .${p}-sub {
      font-size: clamp(17px, 2vw, 20px); color: var(--muted); line-height: 1.6;
      max-width: 54ch; margin: 0 auto 36px;
    }
    .${p}-cta-row {
      display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap;
    }
    .${p}-slot-pill {
      display: inline-flex; align-items: center; gap: 12px;
      padding: 8px 20px 8px 10px; border-radius: 999px; background: var(--surface);
      border: 1px solid var(--border); cursor: pointer; text-align: left;
      box-shadow: 0 8px 24px rgba(10, 10, 10, 0.04);
    }

    .${p}-trusted {
      max-width: 1280px; margin: 0 auto; padding: 28px clamp(20px, 5vw, 64px);
      border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;
    }
    .${p}-section {
      max-width: 1280px; margin: 0 auto; padding: clamp(56px, 7vw, 92px) clamp(20px, 5vw, 64px);
    }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 400;
      font-size: clamp(34px, 4.5vw, 54px); line-height: 1.06; letter-spacing: -0.02em; margin-bottom: 24px;
    }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 24px;
      padding: 30px; display: flex; flex-direction: column; justify-content: space-between; gap: 18px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 18px, 0);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-footer {
      max-width: 1280px; margin: 0 auto; padding: 40px clamp(20px, 5vw, 64px);
      border-top: 1px solid var(--border); display: flex; justify-content: space-between;
      align-items: center; flex-wrap: wrap; gap: 16px; font-size: 13px; color: var(--muted);
    }

    .${p}-seamless-overlay {
      position: fixed; inset: 0; z-index: 190; background: rgba(10, 10, 10, 0.68);
      backdrop-filter: blur(12px); display: none; align-items: center; justify-content: center;
      padding: 20px; pointer-events: none;
    }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box {
      max-width: 520px; width: 100%; border-radius: 24px; background: var(--surface);
      border: 1px solid var(--border); padding: 32px; color: var(--fg); pointer-events: auto;
    }

    @media (max-width: 1024px) { .${p}-grid-3 { grid-template-columns: 1fr; } }
    @media (max-width: 768px) { .${p}-nav-links { display: none; } }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-nav">
      <a href="#heroStage" class="${p}-brand">Alwayzz®</a>
      <nav aria-label="Agency Navigation">
        <ul class="${p}-nav-links">
          <li><a href="#capabilitiesSection">Capabilities</a></li>
          <li><a href="#plansConfigurator">Subscription Plans</a></li>
          <li><a href="#workShowcase">Recent Craft</a></li>
        </ul>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-pill" data-motion-toggle aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-dark" data-magnetic data-next-preview>Menu</button>
      </div>
    </div>
  </header>

  <main id="mainContent">
    <!-- HERO -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <!-- Decorative Curved Pulse Lines -->
      <svg viewBox="0 0 1200 220" width="100%" height="90" fill="none" aria-hidden="true" style="margin-bottom:12px;">
        <path d="M40 180 C 260 20, 420 20, 600 110 C 780 200, 940 200, 1160 40" stroke="rgba(10,10,10,0.12)" stroke-width="1.5"/>
        <circle cx="600" cy="110" r="5" fill="#17C964"/>
      </svg>

      <div id="capabilitiesSection" class="${p}-capability-row">
        <span class="${p}-cap-tag">Brand Identity</span>
        <span class="${p}-cap-tag">App Development</span>
        <span class="${p}-cap-tag">Visual Design</span>
        <span class="${p}-cap-tag">Creative Video</span>
        <span class="${p}-cap-tag">Iconography</span>
      </div>

      <h1 id="oversizedHeadline" class="${p}-h1">
        Premium creative <em>alwayzz®</em> on demand.
      </h1>
      <p class="${p}-sub">
        A flexible design partnership for founders, brands, and agencies who want top craft delivered on their timeline.
      </p>

      <div class="${p}-cta-row">
        <a href="#plansConfigurator" class="${p}-btn-dark" style="text-decoration:none;padding:15px 30px;">View Plans</a>
        <button type="button" class="${p}-slot-pill" data-seamless-trigger="Book a 15-Minute Discovery Call with Alwayzz®">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <circle cx="18" cy="18" r="18" fill="#E5E0D8"/>
            <circle cx="18" cy="14" r="6" fill="#0A0A0A"/>
            <path d="M8 31c2-6 18-6 20 0" fill="#0A0A0A"/>
          </svg>
          <div>
            <span style="display:block;font-size:13px;font-weight:700;color:var(--fg);">Chat for 15 minutes</span>
            <span style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--live-green-text);font-weight:600;">
              <span style="width:7px;height:7px;border-radius:50%;background:var(--live-green);display:inline-block;"></span>
              Pick a slot • 2 spots left
            </span>
          </div>
        </button>
      </div>
    </section>

    <!-- TRUSTED BY LOGO BAR -->
    <section class="${p}-trusted" aria-label="Trusted Partners">
      <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.12em;">TRUSTED BY TEAMS AT</span>
      <div style="display:flex;gap:32px;flex-wrap:wrap;font-family:var(--font-display);font-size:20px;color:var(--fg);opacity:0.82;">
        <span>Airbnb</span>
        <span>Shopify</span>
        <span>Linear</span>
        <span>Notion</span>
        <span>Webflow</span>
        <span>Figma</span>
        <span>Stripe</span>
        <span>Vercel</span>
      </div>
    </section>

    <!-- ONE LIVE THING: SPRINT CAPACITY & PLAN CONFIGURATOR -->
    <section id="plansConfigurator" class="${p}-section" aria-labelledby="planHeading">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:28px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);letter-spacing:0.14em;">ON-DEMAND SUBSCRIPTION</span>
          <h2 id="planHeading" class="${p}-h2" style="margin-bottom:0;">Pause or scale your creative velocity anytime.</h2>
        </div>
        <div role="group" aria-label="Billing Cadence" style="display:flex;gap:8px;">
          <button type="button" class="${p}-btn-dark cadence-btn" data-cadence="monthly">Monthly Retainer</button>
          <button type="button" class="${p}-btn-pill cadence-btn" data-cadence="quarterly">Quarterly (-15%)</button>
        </div>
      </div>

      <div class="${p}-grid-3 tabular-nums">
        <article class="${p}-card ${p}-reveal">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">STANDARD SPRINT</span>
            <h3 style="font-family:var(--font-display);font-size:28px;margin:6px 0;">Single Active Stream</h3>
            <strong id="priceStandard" style="font-size:38px;display:block;margin:12px 0;">$4,950<span style="font-size:15px;color:var(--muted);font-weight:400;">/mo</span></strong>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">48-hour average turnaround on brand identity, landing pages, and design systems.</p>
          </div>
          <button type="button" class="${p}-btn-pill" data-seamless-trigger="Subscribe — Standard Sprint ($4,950/mo)">Start Standard Sprint</button>
        </article>

        <article class="${p}-card ${p}-reveal" style="border-color:var(--fg);background:var(--surface-elevated);">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--live-green-text);font-weight:700;">MOST POPULAR • DOUBLE VELOCITY</span>
            <h3 style="font-family:var(--font-display);font-size:28px;margin:6px 0;">Two Concurrent Streams</h3>
            <strong id="priceDouble" style="font-size:38px;display:block;margin:12px 0;">$7,950<span style="font-size:15px;color:var(--muted);font-weight:400;">/mo</span></strong>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">Ideal for funded startups shipping product UI, Framer/Next.js builds, and launch motion simultaneously.</p>
          </div>
          <button type="button" class="${p}-btn-dark" data-seamless-trigger="Subscribe — Double Velocity ($7,950/mo)">Start Double Velocity</button>
        </article>

        <article id="workShowcase" class="${p}-card ${p}-reveal">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">DEDICATED POD</span>
            <h3 style="font-family:var(--font-display);font-size:28px;margin:6px 0;">Full Creative Studio</h3>
            <strong id="pricePod" style="font-size:38px;display:block;margin:12px 0;">$12,500<span style="font-size:15px;color:var(--muted);font-weight:400;">/mo</span></strong>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">Embedded design director, motion engineer, and frontend partner in your Slack channel.</p>
          </div>
          <button type="button" class="${p}-btn-pill" data-seamless-trigger="Book Dedicated Pod Consultation">Book Pod Intro</button>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <div><strong>Alwayzz®</strong> — Premium creative on demand. © 2026 Alwayzz Design Partnership.</div>
    <div style="display:flex;gap:20px;">
      <a href="#capabilitiesSection" style="color:var(--muted);text-decoration:none;">Capabilities</a>
      <a href="#plansConfigurator" style="color:var(--muted);text-decoration:none;">Plans</a>
      <a href="#workShowcase" style="color:var(--muted);text-decoration:none;">Dedicated Pod</a>
    </div>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--live-green-text);">ALWAYZZ® PARTNER ONBOARDING</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:30px;margin-bottom:10px;">Reserve Your Creative Slot</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Get matched with your dedicated design director and submit your first sprint brief on Monday morning.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-dark" style="width:100%;">Confirm Partnership Slot</button>
    </div>
  </div>

  <script>
    (function () {
      var pStd = document.getElementById('priceStandard');
      var pDbl = document.getElementById('priceDouble');
      var pPod = document.getElementById('pricePod');
      document.querySelectorAll('.cadence-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var q = btn.getAttribute('data-cadence') === 'quarterly';
          document.querySelectorAll('.cadence-btn').forEach(function (b) {
            b.className = b === btn ? '${p}-btn-dark cadence-btn' : '${p}-btn-pill cadence-btn';
          });
          if (pStd) pStd.innerHTML = (q ? '$4,200' : '$4,950') + '<span style="font-size:15px;color:var(--muted);font-weight:400;">/mo</span>';
          if (pDbl) pDbl.innerHTML = (q ? '$6,750' : '$7,950') + '<span style="font-size:15px;color:var(--muted);font-weight:400;">/mo</span>';
          if (pPod) pPod.innerHTML = (q ? '$10,600' : '$12,500') + '<span style="font-size:15px;color:var(--muted);font-weight:400;">/mo</span>';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 28. WELLBEING OS (flowpath — Liquid Glass Workforce Wellbeing & Rhythm OS)
  // ============================================================================
  if (spec.slug === 'wellbeing-os') {
    const heroVideo = spec.heroVideo || 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260703_053131_1ec3dd1c-d627-44fb-ab20-6e1fce41b0d5.mp4';
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>flowpath — Wellbeing OS • Bridge the Gaps, Ditch the Grindwork</title>
  <meta name="description" content="Flowpath unifies your complete wellness tools, so your crew spends less energy plugging gaps and more on real progress." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #120F0D;
      --surface: rgba(30, 24, 20, 0.76);
      --surface-2: rgba(255, 248, 240, 0.06);
      --text: #FAF6F2;
      --muted: rgba(250, 246, 242, 0.76);
      --accent: #F59E0B;
      --accent-text: #FDE68A;
      --border: rgba(255, 248, 240, 0.14);
      --radius-card: 24px;
      --font-display: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --space-section: clamp(64px, 8vw, 112px);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--bg); }
    html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--font-sans); overflow-x: clip; }
    body { background: var(--bg); color: var(--text); overflow-x: clip; line-height: 1.6; }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--accent); color: #120F0D; font-weight: 700; border-radius: 8px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid #FFFFFF; }
    a, button, input { font-family: inherit; }
    a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-liquid-glass {
      background: rgba(255, 248, 240, 0.04);
      background-blend-mode: luminosity;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 248, 240, 0.14);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.16), 0 16px 40px rgba(0, 0, 0, 0.35);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    }
    .${p}-liquid-glass:hover {
      background: rgba(255, 248, 240, 0.08);
      border-color: rgba(253, 230, 138, 0.34);
    }
    .${p}-hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      background: radial-gradient(circle at 50% 25%, #2D2118 0%, #120F0D 75%);
    }
    .${p}-bg-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.62;
      z-index: 0;
      pointer-events: none;
    }
    .${p}-hero-vignette {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(18, 15, 13, 0.55) 0%, rgba(18, 15, 13, 0.25) 45%, rgba(18, 15, 13, 0.94) 100%);
      z-index: 1;
      pointer-events: none;
    }
    .${p}-nav {
      position: relative;
      z-index: 10;
      max-width: 1360px;
      width: 100%;
      margin: 0 auto;
      padding: 24px clamp(20px, 5vw, 48px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .${p}-brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text);
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.03em;
    }
    .${p}-nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      flex-wrap: wrap;
    }
    .${p}-nav-link {
      color: rgba(250, 246, 242, 0.9);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-nav-link:hover { color: #FFFFFF; }
    .${p}-btn-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), background 0.28s ease;
    }
    .${p}-btn-pill:hover { transform: scale(1.03); }
    .${p}-btn-pill:active { transform: scale(0.97); }
    .${p}-btn-ghost {
      background: transparent;
      border: 1px solid transparent;
      color: rgba(250, 246, 242, 0.85);
      padding: 12px 20px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.25s ease, border-color 0.25s ease;
    }
    .${p}-btn-ghost:hover { color: #FFFFFF; border-color: var(--border); }
    .${p}-btn-ghost:active { transform: scale(0.98); }

    .${p}-hero-center {
      position: relative;
      z-index: 5;
      max-width: 980px;
      margin: auto;
      padding: 64px 24px 96px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(3.1rem, 7.2vw, 5.75rem);
      font-weight: 400;
      line-height: 0.96;
      letter-spacing: -0.025em;
      color: var(--text);
      margin-bottom: 24px;
    }
    .${p}-sub {
      font-size: clamp(1rem, 1.35vw, 1.15rem);
      color: var(--muted);
      max-width: 58ch;
      line-height: 1.65;
      margin-bottom: 36px;
    }
    .${p}-wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: var(--space-section) clamp(20px, 5vw, 48px);
    }
    .${p}-h2 {
      font-family: var(--font-display);
      font-size: clamp(2.1rem, 4vw, 3.3rem);
      font-weight: 400;
      line-height: 1.08;
      letter-spacing: -0.02em;
      margin-bottom: 14px;
    }
    .${p}-bento {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
      margin-top: 36px;
    }
    .${p}-card {
      border-radius: var(--radius-card);
      padding: 28px;
      background: var(--surface);
      border: 1px solid var(--border);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
    }
    .${p}-card:hover {
      transform: translateY(-4px);
      border-color: rgba(253, 230, 138, 0.4);
    }
    .${p}-rhythm-grid {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 28px;
      align-items: stretch;
      margin-top: 28px;
    }
    .${p}-mode-pill {
      padding: 10px 18px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--muted);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }
    .${p}-mode-pill.is-active, .${p}-mode-pill:hover {
      background: rgba(245, 158, 11, 0.18);
      border-color: var(--accent);
      color: var(--accent-text);
    }
    .${p}-modal {
      position: fixed;
      inset: 0;
      background: rgba(10, 8, 7, 0.82);
      backdrop-filter: blur(14px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 540px;
      width: 100%;
      background: #1C1613;
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 32px;
    }
    @media (max-width: 920px) {
      .${p}-bento, .${p}-rhythm-grid { grid-template-columns: 1fr; }
      .${p}-nav-links { display: none; }
    }
    @media (max-width: 600px) {
      .${p}-hero-center { padding: 40px 16px 64px; }
      .${p}-card { padding: 20px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="cursorRing" style="position:fixed;width:28px;height:28px;border:1px solid rgba(253,230,138,0.45);border-radius:50%;pointer-events:none;z-index:9998;transform:translate3d(-100px,-100px,0);"></div>
  <div id="cursorDot" style="position:fixed;width:6px;height:6px;background:#FDE68A;border-radius:50%;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);"></div>

  <div class="${p}-hero">
    <video id="heroBgVideo" class="${p}-bg-video" src="${heroVideo}" autoplay loop muted playsinline preload="auto"></video>
    <div class="${p}-hero-vignette" aria-hidden="true"></div>

    <header class="${p}-nav">
      <div style="display:flex;align-items:center;gap:36px;">
        <a href="#main-content" class="${p}-brand" aria-label="flowpath home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="7" y="5" width="13" height="13" rx="3" transform="rotate(45 13.5 11.5)" stroke="#FAF6F2" stroke-width="1.8" fill="rgba(255,255,255,0.08)" />
            <rect x="13" y="11" width="13" height="13" rx="3" transform="rotate(45 19.5 17.5)" stroke="#FDE68A" stroke-width="1.8" fill="rgba(245,158,11,0.16)" />
          </svg>
          <span>flowpath</span>
        </a>
        <nav class="${p}-nav-links" aria-label="Primary Navigation">
          <a href="#rhythm-lab" class="${p}-nav-link">Product <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <a href="#unified-tools" class="${p}-nav-link">Solutions <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <a href="#crew-telemetry" class="${p}-nav-link">About</a>
          <a href="#plans-matrix" class="${p}-nav-link">Plans</a>
        </nav>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-pill ${p}-liquid-glass" data-magnetic>Begin your journey</button>
      </div>
    </header>

    <section class="${p}-hero-center" aria-labelledby="heroHeadline">
      <span class="${p}-liquid-glass" style="padding:7px 16px;border-radius:999px;font-size:12px;font-family:var(--font-mono);color:var(--accent-text);margin-bottom:22px;display:inline-flex;align-items:center;gap:8px;">
        <span style="width:7px;height:7px;border-radius:50%;background:#34D399;display:inline-block;"></span>
        FLOWPATH WELLBEING OS 4.2 • ZERO GRINDWORK ARCHITECTURE
      </span>
      <h1 id="heroHeadline" class="${p}-h1">Bridge the gaps.<br /><em>Ditch the grindwork.</em></h1>
      <p class="${p}-sub">
        Flowpath unifies your complete wellness tools, so your crew spends less energy plugging gaps and more on real progress.
      </p>
      <div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;">
        <button type="button" class="${p}-btn-pill ${p}-liquid-glass" data-seamless-trigger="Begin Your Flowpath Workspace Journey">Begin your journey</button>
        <a href="#rhythm-lab" class="${p}-btn-ghost">See it live</a>
      </div>
    </section>
  </div>

  <main id="main-content">
    <!-- ONE LIVE THING: INTERACTIVE CREW WELLBEING & WORKFLOW RHYTHM CONFIGURATOR -->
    <section id="rhythm-lab" class="${p}-wrap" aria-labelledby="rhythmHeading">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);letter-spacing:0.08em;">LIVE CREW CALIBRATOR</span>
          <h2 id="rhythmHeading" class="${p}-h2">Unify Asynchronous Focus &amp; Recovery Cycles</h2>
        </div>
        <div role="group" aria-label="Crew Rhythm Presets" style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="${p}-mode-pill is-active rhythm-preset" data-mode="deep" data-hours="14.5" data-burnout="-42%" data-sync="96%" data-desc="Silences non-urgent Slack/Jira pings during 3.5-hour maker blocks and auto-schedules micro-recovery walks.">Deep Focus Cadence</button>
          <button type="button" class="${p}-mode-pill rhythm-preset" data-mode="async" data-hours="18.2" data-burnout="-58%" data-sync="99%" data-desc="Replaces recurring status standups with 90-second spatial check-ins across 6 time zones.">Async Global Crew</button>
          <button type="button" class="${p}-mode-pill rhythm-preset" data-mode="sprint" data-hours="11.8" data-burnout="-34%" data-sync="94%" data-desc="Balances launch-week velocity with mandatory 18:00 cooldown gates and biometric fatigue alerts.">Recovery Guardrails</button>
        </div>
      </div>

      <div class="${p}-rhythm-grid tabular-nums">
        <div class="${p}-card ${p}-liquid-glass">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">ACTIVE CREW SIZE</span>
            <strong id="crewSizeLabel" style="font-size:22px;color:var(--accent-text);">45 Members</strong>
          </div>
          <label for="crewSizeRange" style="display:block;font-size:13px;color:var(--muted);margin-bottom:10px;">Adjust engineering &amp; product crew headcount:</label>
          <input id="crewSizeRange" type="range" min="10" max="250" step="5" value="45" style="width:100%;accent-color:#F59E0B;cursor:pointer;margin-bottom:22px;" />
          <p id="rhythmModeDesc" style="font-size:14px;color:var(--muted);max-width:60ch;padding:16px;border-radius:16px;background:rgba(0,0,0,0.28);border:1px solid var(--border);">
            Silences non-urgent Slack/Jira pings during 3.5-hour maker blocks and auto-schedules micro-recovery walks.
          </p>
        </div>

        <div class="${p}-card" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;align-items:center;text-align:center;">
          <div style="padding:18px;border-radius:18px;background:var(--surface-2);border:1px solid var(--border);">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;margin-bottom:6px;">RECLAIMED / WK</span>
            <strong id="reclaimedHoursOut" style="font-family:var(--font-display);font-size:42px;font-weight:400;color:var(--text);">653h</strong>
            <span style="font-size:12px;color:var(--accent-text);display:block;">Zero grindwork</span>
          </div>
          <div style="padding:18px;border-radius:18px;background:var(--surface-2);border:1px solid var(--border);">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;margin-bottom:6px;">STRAIN DROP</span>
            <strong id="burnoutDropOut" style="font-family:var(--font-display);font-size:42px;font-weight:400;color:#34D399;">-42%</strong>
            <span style="font-size:12px;color:var(--muted);display:block;">Cognitive load</span>
          </div>
          <div style="padding:18px;border-radius:18px;background:var(--surface-2);border:1px solid var(--border);">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;margin-bottom:6px;">TOOL HARMONY</span>
            <strong id="syncScoreOut" style="font-family:var(--font-display);font-size:42px;font-weight:400;color:var(--accent-text);">96%</strong>
            <span style="font-size:12px;color:var(--muted);display:block;">Unified bridge</span>
          </div>
        </div>
      </div>
    </section>

    <!-- UNIFIED WELLNESS ARCHITECTURE BENTO -->
    <section id="unified-tools" class="${p}-wrap" aria-labelledby="bentoHeading" style="padding-top:16px;">
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">COMPLETE WELLNESS BRIDGE</span>
      <h2 id="bentoHeading" class="${p}-h2">Three Layers of Calm, Zero Context Switching</h2>
      <div class="${p}-bento tabular-nums">
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">01 // CALENDAR SHIELD</span>
          <h3 style="font-family:var(--font-display);font-size:28px;font-weight:400;margin:10px 0;">Autonomous Focus Defragmentation</h3>
          <p style="font-size:14px;color:var(--muted);max-width:52ch;">Automatically clusters scattered 15-minute calls into cohesive blocks so your crew preserves uninterrupted deep-craft mornings.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">02 // PULSE TELEMETRY</span>
          <h3 style="font-family:var(--font-display);font-size:28px;font-weight:400;margin:10px 0;">Privacy-First Energy Check-Ins</h3>
          <p style="font-size:14px;color:var(--muted);max-width:52ch;">Zero surveillance. Crew members log 1-tap energy states that dynamically rebalance sprint story points before burnout hits.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">03 // RITUAL ENGINE</span>
          <h3 style="font-family:var(--font-display);font-size:28px;font-weight:400;margin:10px 0;">Guided Decompression Transitions</h3>
          <p style="font-size:14px;color:var(--muted);max-width:52ch;">End-of-day shutdown rituals close open browser loops, capture tomorrow's priorities, and mute work notifications until 09:00.</p>
        </article>
      </div>
    </section>

    <!-- PLANS SECTION -->
    <section id="plans-matrix" class="${p}-wrap tabular-nums" aria-labelledby="plansHeading" style="padding-top:16px;">
      <h2 id="plansHeading" class="${p}-h2">Transparent Crew Plans</h2>
      <div class="${p}-bento">
        <article class="${p}-card">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">STARTER POD</span>
          <h3 style="font-family:var(--font-display);font-size:32px;font-weight:400;margin:6px 0;">$12 <span style="font-size:14px;font-family:var(--font-sans);color:var(--muted);">/ seat / mo</span></h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:20px;max-width:48ch;">Core calendar defragmentation, daily shutdown rituals, and Slack rhythm sync.</p>
          <button type="button" class="${p}-btn-pill ${p}-liquid-glass" style="width:100%;" data-seamless-trigger="Starter Pod Plan ($12/seat)">Start 14-Day Free Trial</button>
        </article>
        <article class="${p}-card" style="border-color:rgba(245,158,11,0.5);">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">GROWTH COLLECTIVE • POPULAR</span>
          <h3 style="font-family:var(--font-display);font-size:32px;font-weight:400;margin:6px 0;">$24 <span style="font-size:14px;font-family:var(--font-sans);color:var(--muted);">/ seat / mo</span></h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:20px;max-width:48ch;">Full Jira/Linear load balancing, anonymized burnout radar, and team recovery stipends.</p>
          <button type="button" class="${p}-btn-pill ${p}-liquid-glass" style="width:100%;" data-seamless-trigger="Growth Collective Plan ($24/seat)">Begin your journey</button>
        </article>
        <article class="${p}-card">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">ENTERPRISE OS</span>
          <h3 style="font-family:var(--font-display);font-size:32px;font-weight:400;margin:6px 0;">Custom</h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:20px;max-width:48ch;">Dedicated SSO, custom HRIS integrations, and executive organizational health audits.</p>
          <button type="button" class="${p}-btn-pill ${p}-liquid-glass" style="width:100%;" data-seamless-trigger="Enterprise Wellbeing OS Consultation">Talk to Architecture Team</button>
        </article>
      </div>
    </section>
  </main>

  <footer id="crew-telemetry" class="${p}-wrap" style="padding-top:32px;padding-bottom:48px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;font-size:13px;color:var(--muted);">
    <span>© 2026 flowpath Inc. Wellbeing OS — Built for sustainable human progress.</span>
    <span style="font-family:var(--font-mono);color:var(--accent-text);">ALL SYSTEMS CALM • 99.99% UPTIME</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">FLOWPATH ONBOARDING</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:32px;font-weight:400;margin-bottom:10px;">Begin your journey</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;max-width:54ch;">
        Connect Google Calendar or Microsoft 365 in 60 seconds. Flowpath runs in read-only simulation mode for your first 7 days so you can preview reclaimed focus hours risk-free.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-pill ${p}-liquid-glass" style="width:100%;">Launch Workspace Sandbox</button>
    </div>
  </div>

  <script>
    (function () {
      var range = document.getElementById('crewSizeRange');
      var sizeLabel = document.getElementById('crewSizeLabel');
      var hoursOut = document.getElementById('reclaimedHoursOut');
      var burnoutOut = document.getElementById('burnoutDropOut');
      var syncOut = document.getElementById('syncScoreOut');
      var descOut = document.getElementById('rhythmModeDesc');
      var activeRate = 14.5;

      function recalc() {
        var crew = range ? parseInt(range.value, 10) : 45;
        if (sizeLabel) sizeLabel.textContent = crew + ' Members';
        if (hoursOut) hoursOut.textContent = Math.round(crew * activeRate) + 'h';
      }
      if (range) range.addEventListener('input', recalc);

      document.querySelectorAll('.rhythm-preset').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.rhythm-preset').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          activeRate = parseFloat(btn.getAttribute('data-hours') || '14.5');
          if (burnoutOut) burnoutOut.textContent = btn.getAttribute('data-burnout') || '-42%';
          if (syncOut) syncOut.textContent = btn.getAttribute('data-sync') || '96%';
          if (descOut) descOut.textContent = btn.getAttribute('data-desc') || '';
          recalc();
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 29. PROSTHETICS HERO (Kinetix Bionic — Smart Myoelectric Prosthetics)
  // ============================================================================
  if (spec.slug === 'prosthetics-hero') {
    const heroVideo = spec.heroVideo || 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kinetix Bionic — Simple, Smart Prosthetics Made for People Who Keep Fighting</title>
  <meta name="description" content="Seen on Shark Tank in India. Simple, smart myoelectric prosthetics made for people who keep fighting. Reclaim your movement now." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #F0F0EE;
      --surface: #FFFFFF;
      --surface-2: #EDEDED;
      --text: #111827;
      --muted: #52525B;
      --accent: #2563EB;
      --accent-text: #1D4ED8;
      --border: rgba(17, 24, 39, 0.1);
      --radius-card: 20px;
      --font-display: 'Space Grotesk', 'Inter', sans-serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --space-section: clamp(64px, 8vw, 108px);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--bg); }
    html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--font-sans); overflow-x: clip; }
    body { background: var(--bg); color: var(--text); overflow-x: clip; line-height: 1.6; }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--accent); color: #FFFFFF; font-weight: 700; border-radius: 8px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid var(--text); }
    a, button, input { font-family: inherit; }
    a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-hero-outer {
      padding: 10px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .${p}-hero-frame {
      position: relative;
      flex: 1;
      min-height: calc(100vh - 20px);
      border-radius: 20px;
      overflow: hidden;
      background: #18181B;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .${p}-hero-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .${p}-nav-wrap {
      position: relative;
      z-index: 20;
      padding-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      padding-left: 16px;
      padding-right: 16px;
    }
    .${p}-logo-pill {
      background: #EDEDED;
      border-radius: 14px;
      padding: 11px 15px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #111827;
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-logo-pill:hover { transform: translateY(-2px); }
    .${p}-links-pill {
      background: #EDEDED;
      border-radius: 14px;
      padding: 12px 20px;
      display: inline-flex;
      align-items: center;
      gap: 22px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      flex-wrap: wrap;
    }
    .${p}-nav-link {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .${p}-nav-link:hover { color: #000000; }
    .${p}-motion-pill {
      background: rgba(237, 237, 237, 0.92);
      border: 1px solid rgba(17, 24, 39, 0.12);
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 12px;
      font-weight: 600;
      color: #111827;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .${p}-motion-pill:hover { background: #FFFFFF; }
    .${p}-motion-pill:active { transform: scale(0.97); }

    .${p}-hero-card {
      position: relative;
      z-index: 15;
      margin: auto auto 24px 24px;
      width: calc(100% - 48px);
      max-width: 660px;
      background: #EDEDED;
      border-radius: 16px;
      padding: clamp(24px, 4vw, 44px);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
    }
    .${p}-shark-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #E2E2E2;
      color: #4B5563;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      margin-bottom: 18px;
      text-decoration: none;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .${p}-shark-badge:hover { background: #D4D4D8; color: #111827; }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4.3vw, 3.35rem);
      font-weight: 500;
      line-height: 1.08;
      letter-spacing: -0.03em;
      color: #111827;
      margin-bottom: 14px;
    }
    .${p}-sub {
      font-size: clamp(1rem, 1.4vw, 1.15rem);
      color: #6B7280;
      max-width: 52ch;
      margin-bottom: 24px;
    }
    .${p}-btn-blue {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #2563EB;
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 600;
      padding: 13px 24px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-btn-blue:hover { background: #1D4ED8; transform: translateY(-2px); }
    .${p}-btn-blue:active { transform: translateY(0) scale(0.98); }

    .${p}-wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: var(--space-section) clamp(20px, 5vw, 48px);
    }
    .${p}-h2 {
      font-family: var(--font-display);
      font-size: clamp(1.85rem, 3.4vw, 2.75rem);
      font-weight: 600;
      line-height: 1.12;
      letter-spacing: -0.025em;
      margin-bottom: 14px;
    }
    .${p}-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
      margin-top: 32px;
    }
    .${p}-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 28px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }
    .${p}-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(17, 24, 39, 0.07);
    }
    .${p}-grip-btn {
      padding: 10px 16px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .${p}-grip-btn.is-active, .${p}-grip-btn:hover {
      background: var(--accent);
      color: #FFFFFF;
      border-color: var(--accent);
    }
    .${p}-modal {
      position: fixed;
      inset: 0;
      background: rgba(17, 24, 39, 0.65);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px;
      width: 100%;
      background: #FFFFFF;
      border-radius: 20px;
      padding: 32px;
      border: 1px solid var(--border);
    }
    @media (max-width: 900px) {
      .${p}-grid-3 { grid-template-columns: 1fr; }
      .${p}-hero-card { margin: auto 12px 12px 12px; width: calc(100% - 24px); }
    }
    @media (max-width: 600px) {
      .${p}-links-pill { gap: 12px; padding: 10px 14px; }
      .${p}-card { padding: 20px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="cursorRing" style="position:fixed;width:28px;height:28px;border:1px solid rgba(37,99,235,0.45);border-radius:50%;pointer-events:none;z-index:9998;transform:translate3d(-100px,-100px,0);"></div>
  <div id="cursorDot" style="position:fixed;width:6px;height:6px;background:#2563EB;border-radius:50%;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);"></div>

  <div class="${p}-hero-outer">
    <div class="${p}-hero-frame">
      <video id="heroBgVideo" class="${p}-hero-video" src="${heroVideo}" autoplay loop muted playsinline preload="auto"></video>

      <header class="${p}-nav-wrap">
        <a href="#main-content" class="${p}-logo-pill" aria-label="Kinetix Bionic Home">
          <svg viewBox="0 0 256 256" width="22" height="22" fill="#111827" aria-hidden="true">
            <path d="M 160 88 L 194 34 L 160 34 L 128 88 L 96 34 L 62 34 L 96 88 L 62 142 L 96 142 L 128 88 L 160 142 L 194 142 Z M 194 166 L 160 166 L 128 220 L 96 166 L 62 166 L 96 222 L 160 222 Z" />
          </svg>
        </a>
        <nav class="${p}-links-pill" aria-label="Primary Navigation">
          <a href="#story-section" class="${p}-nav-link">Story</a>
          <a href="#bionic-calibrator" class="${p}-nav-link">Products</a>
          <a href="#fitting-faq" class="${p}-nav-link">Help</a>
          <a href="#fitting-clinics" class="${p}-nav-link">Support</a>
        </nav>
        <button type="button" id="motionToggleBtn" class="${p}-motion-pill" aria-pressed="false">Motion: ON</button>
      </header>

      <section class="${p}-hero-card" aria-labelledby="heroTitle">
        <a href="#story-section" class="${p}-shark-badge">
          <span>Seen on Shark Tank in India</span>
          <span aria-hidden="true">→</span>
        </a>
        <h1 id="heroTitle" class="${p}-h1">Simple, smart prosthetics made for people who keep fighting.</h1>
        <p class="${p}-sub">Reclaim your movement now.</p>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-blue" data-magnetic>
          <span>Try a free fitting</span>
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </div>
  </div>

  <main id="main-content">
    <!-- ONE LIVE THING: INTERACTIVE MYOELECTRIC GRIP & SOCKET TELEMETRY CALIBRATOR -->
    <section id="bionic-calibrator" class="${p}-wrap tabular-nums" aria-labelledby="calibHeading">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:600;">LIVE MYOELECTRIC TELEMETRY</span>
          <h2 id="calibHeading" class="${p}-h2">Adaptive 14-Grip Bionic Hand &amp; Socket Calibrator</h2>
        </div>
        <div role="group" aria-label="Myoelectric Grip Modes" style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="${p}-grip-btn is-active" data-grip="Precision Pinch" data-force="18 N" data-latency="9 ms" data-battery="38 hrs" data-note="Micro-step thumb opposition calibrated for buttoning shirts, holding keys, and writing.">Precision Pinch</button>
          <button type="button" class="${p}-grip-btn" data-grip="Power Cylinder" data-force="112 N" data-latency="11 ms" data-battery="32 hrs" data-note="Full 5-digit wraparound torque lock for lifting gym kettlebells, luggage, and workshop tools.">Power Cylinder</button>
          <button type="button" class="${p}-grip-btn" data-grip="Tripod Typing" data-force="24 N" data-latency="7 ms" data-battery="42 hrs" data-note="Ultra-fast index-middle-thumb stabilization for keyboard typing, lab pipettes, and utensils.">Tripod Typing</button>
          <button type="button" class="${p}-grip-btn" data-grip="Active Hook" data-force="135 N" data-latency="10 ms" data-battery="36 hrs" data-note="Passive auto-locking load distribution engineered for cycling handlebars and heavy carrying.">Active Hook</button>
        </div>
      </div>

      <div class="${p}-grid-3">
        <div class="${p}-card" style="grid-column: span 2;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <strong id="activeGripTitle" style="font-family:var(--font-display);font-size:22px;">Precision Pinch Mode</strong>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);background:rgba(37,99,235,0.1);padding:4px 10px;border-radius:6px;">EMG DUAL-CHANNEL ACTIVE</span>
          </div>
          <p id="activeGripNote" style="font-size:15px;color:var(--muted);max-width:62ch;margin-bottom:22px;">
            Micro-step thumb opposition calibrated for buttoning shirts, holding keys, and writing.
          </p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
            <div style="padding:16px;background:var(--bg);border-radius:14px;">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">GRIP FORCE</span>
              <strong id="gripForceVal" style="font-family:var(--font-display);font-size:28px;color:var(--text);">18 N</strong>
            </div>
            <div style="padding:16px;background:var(--bg);border-radius:14px;">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">EMG RESPONSE</span>
              <strong id="gripLatencyVal" style="font-family:var(--font-display);font-size:28px;color:var(--accent);">9 ms</strong>
            </div>
            <div style="padding:16px;background:var(--bg);border-radius:14px;">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">CYCLE RUNTIME</span>
              <strong id="gripBatteryVal" style="font-family:var(--font-display);font-size:28px;color:var(--text);">38 hrs</strong>
            </div>
          </div>
        </div>

        <div class="${p}-card" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">WEIGHT &amp; WEATHERPROOFING</span>
            <h3 style="font-family:var(--font-display);font-size:26px;margin:8px 0;">415g Carbon Frame • IP67 Sealed</h3>
            <p style="font-size:14px;color:var(--muted);max-width:46ch;">Lighter than a smartphone, breathable 3D-scanned silicone liner, and field-serviceable modular fingers.</p>
          </div>
          <button type="button" class="${p}-btn-blue" style="width:100%;justify-content:center;margin-top:20px;" data-seamless-trigger="Book Free 3D Socket Scan &amp; Fitting">Try a free fitting →</button>
        </div>
      </div>
    </section>

    <!-- STORY & ENGINEERING PILLARS -->
    <section id="story-section" class="${p}-wrap tabular-nums" aria-labelledby="storyHeading" style="padding-top:16px;">
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:600;">WHY WE BUILT KINETIX</span>
      <h2 id="storyHeading" class="${p}-h2">Bionic Mobility Without the $40,000 Hospital Markup</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">01 // DIRECT 3D OPTICAL FIT</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Fitted in 48 Hours, Not 6 Weeks</h3>
          <p style="font-size:14px;color:var(--muted);max-width:50ch;">Our mobile prosthetists scan your residual limb using sub-millimeter structured light and print custom breathable sockets locally.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">02 // NEURAL MUSCLE LEARNING</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Adapts to Your Signal, Not Vice Versa</h3>
          <p style="font-size:14px;color:var(--muted);max-width:50ch;">On-board edge AI calibrates to subtle surface EMG muscle twitches in 10 minutes—even through sweat or long workdays.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">03 // ZERO-DOWNTIME MODULARITY</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Swap Digits in 90 Seconds</h3>
          <p style="font-size:14px;color:var(--muted);max-width:50ch;">Every knuckle actuator uses a single hex key release, backed by a 3-year no-questions-asked warranty across 28 clinics.</p>
        </article>
      </div>
    </section>

    <!-- CLINICS & SUPPORT -->
    <section id="fitting-clinics" class="${p}-wrap tabular-nums" aria-labelledby="clinicHeading" style="padding-top:16px;">
      <div class="${p}-card" id="fitting-faq" style="background:#111827;color:#FFFFFF;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:#60A5FA;">FREE HOME &amp; CLINIC TRIALS</span>
          <h2 id="clinicHeading" style="font-family:var(--font-display);font-size:clamp(1.7rem,3vw,2.4rem);margin:8px 0;">Test-Drive Kinetix Bionic With Zero Obligation</h2>
          <p style="font-size:14px;color:#D1D5DB;max-width:58ch;">Available in Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, and via home tele-fitting kits nationwide. 0% EMI financing available.</p>
        </div>
        <button type="button" class="${p}-btn-blue" data-seamless-trigger="Schedule Free Prosthetic Trial Session">Book Free Fitting →</button>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="padding-top:24px;padding-bottom:48px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 Kinetix Bionic Labs Pvt. Ltd. ISO 13485 Certified Medical Device.</span>
    <span style="font-family:var(--font-mono);color:var(--accent);">24/7 PROSTHETIST HELPLINE • 1800-KINETIX</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">FREE BIONIC FITTING</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-motion-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:26px;margin-bottom:10px;">Try a free fitting</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;max-width:52ch;">
        A certified clinical prosthetist will bring a demo bionic hand and 3D optical scanner to your nearest clinic or home at zero cost.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-blue" style="width:100%;justify-content:center;">Confirm Free Fitting Request →</button>
    </div>
  </div>

  <script>
    (function () {
      var titleEl = document.getElementById('activeGripTitle');
      var noteEl = document.getElementById('activeGripNote');
      var forceEl = document.getElementById('gripForceVal');
      var latEl = document.getElementById('gripLatencyVal');
      var batEl = document.getElementById('gripBatteryVal');

      document.querySelectorAll('.${p}-grip-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.${p}-grip-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          if (titleEl) titleEl.textContent = (btn.getAttribute('data-grip') || '') + ' Mode';
          if (noteEl) noteEl.textContent = btn.getAttribute('data-note') || '';
          if (forceEl) forceEl.textContent = btn.getAttribute('data-force') || '';
          if (latEl) latEl.textContent = btn.getAttribute('data-latency') || '';
          if (batEl) batEl.textContent = btn.getAttribute('data-battery') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 30. RETRO-FUTURIST (Mainframe® — A.R.I.A. Adaptive Response Interface Agent)
  // ============================================================================
  if (spec.slug === 'retro-futurist') {
    const heroVideo = spec.heroVideo || 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mainframe® — A.R.I.A. Adaptive Response Interface Agent</title>
  <meta name="description" content="Hey there, meet A.R.I.A, Mainframe's Adaptive Response Interface Agent. Glad you stopped in. Good taste tends to find us. Now, what are we building?" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #0A0A0C;
      --surface: rgba(255, 255, 255, 0.14);
      --surface-2: rgba(255, 255, 255, 0.08);
      --text: #FFFFFF;
      --muted: rgba(255, 255, 255, 0.78);
      --accent: #F59E0B;
      --accent-text: #FDE68A;
      --border: rgba(255, 255, 255, 0.25);
      --radius-card: 20px;
      --font-display: 'Space Grotesk', 'Plus Jakarta Sans', sans-serif;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --space-section: clamp(64px, 8vw, 112px);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--bg); }
    html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--font-sans); overflow-x: clip; }
    body { background: var(--bg); color: var(--text); overflow-x: clip; line-height: 1.6; }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: #FFFFFF; color: #0A0A0C; font-weight: 700; border-radius: 8px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid var(--accent); }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-hero {
      position: relative;
      min-height: 100vh;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #0A0A0C;
    }
    .${p}-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
      opacity: 0.84;
    }
    .${p}-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(10,10,12,0.45) 0%, rgba(10,10,12,0.18) 45%, rgba(10,10,12,0.88) 100%);
      z-index: 1;
      pointer-events: none;
    }
    .${p}-header {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px clamp(20px, 4vw, 40px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      gap: 16px;
      flex-wrap: wrap;
    }
    .${p}-brand-group {
      display: flex;
      align-items: center;
      gap: 32px;
      flex-wrap: wrap;
    }
    .${p}-wordmark {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      text-decoration: none;
      display: inline-flex;
      align-items: flex-start;
    }
    .${p}-wordmark sup {
      font-size: 10px;
      margin-left: 2px;
      top: -0.4em;
    }
    .${p}-comma-nav {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .${p}-comma-link {
      font-size: 16px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .${p}-comma-link:hover { color: var(--accent-text); }
    .${p}-glass-pill {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 999px;
      padding: 10px 20px;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-glass-pill:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
    .${p}-glass-pill:active { transform: scale(0.98); }

    .${p}-stage {
      position: relative;
      z-index: 10;
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 32px;
      padding: clamp(28px, 5vw, 56px) clamp(20px, 4vw, 40px);
      align-items: end;
    }
    .${p}-aria-badge {
      align-self: start;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      padding: 14px 20px;
      max-width: 390px;
      font-size: 14px;
      line-height: 1.45;
      color: rgba(255, 255, 255, 0.92);
    }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 3.8vw, 3.15rem);
      font-weight: 500;
      line-height: 1.12;
      letter-spacing: -0.025em;
      color: #FFFFFF;
      margin-bottom: 24px;
    }
    .${p}-cursor-bar {
      display: inline-block;
      width: 2px;
      height: 0.9em;
      background: #FFFFFF;
      margin-left: 4px;
      vertical-align: middle;
      animation: ${p}Blink 0.9s steps(2, start) infinite;
    }
    @keyframes ${p}Blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .${p}-action-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 28px;
    }
    .${p}-bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.16);
    }
    .${p}-wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: var(--space-section) clamp(20px, 4vw, 40px);
    }
    .${p}-h2 {
      font-family: var(--font-display);
      font-size: clamp(1.85rem, 3.4vw, 2.75rem);
      font-weight: 600;
      line-height: 1.12;
      letter-spacing: -0.02em;
      margin-bottom: 14px;
    }
    .${p}-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-top: 28px;
    }
    .${p}-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 26px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    }
    .${p}-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent-text);
    }
    .${p}-modal {
      position: fixed;
      inset: 0;
      background: rgba(10, 10, 12, 0.84);
      backdrop-filter: blur(14px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px;
      width: 100%;
      background: #141418;
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 32px;
    }
    @media (max-width: 960px) {
      .${p}-stage { grid-template-columns: 1fr; }
      .${p}-grid-4 { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 600px) {
      .${p}-grid-4 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="cursorRing" style="position:fixed;width:28px;height:28px;border:1px solid rgba(253,230,138,0.45);border-radius:50%;pointer-events:none;z-index:9998;transform:translate3d(-100px,-100px,0);"></div>
  <div id="cursorDot" style="position:fixed;width:6px;height:6px;background:#FDE68A;border-radius:50%;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);"></div>

  <div class="${p}-hero" id="heroScrubContainer">
    <video id="heroBgVideo" class="${p}-video" src="${heroVideo}" autoplay loop muted playsinline preload="auto"></video>
    <div class="${p}-overlay" aria-hidden="true"></div>

    <header class="${p}-header">
      <div class="${p}-brand-group">
        <a href="#main-content" class="${p}-wordmark" aria-label="Mainframe Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;align-self:center;" aria-hidden="true">
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          </svg>
          Mainframe<sup>®</sup>
        </a>
        <nav class="${p}-comma-nav" aria-label="Primary Navigation">
          <a href="#aria-console" class="${p}-comma-link">Labs,</a>
          <a href="#studio-matrix" class="${p}-comma-link">Studio,</a>
          <a href="#studio-matrix" class="${p}-comma-link">Openings,</a>
          <a href="#studio-matrix" class="${p}-comma-link">Shop</a>
        </nav>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" id="motionToggleBtn" class="${p}-glass-pill" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-glass-pill" data-magnetic>Get in touch</button>
      </div>
    </header>

    <section class="${p}-stage" aria-labelledby="typewriterHeadline">
      <div class="${p}-aria-badge">
        <p>Hey there, meet <strong>A.R.I.A</strong>,<br />Mainframe's Adaptive Response Interface Agent</p>
        <span id="scrubReadoutText" class="tabular-nums" style="display:block;margin-top:8px;font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">MOUSE SCRUB: 0.8x SENSITIVITY • READY</span>
      </div>

      <div>
        <h1 id="typewriterHeadline" class="${p}-h1">
          <span id="typewriterText">Glad you stopped in. Good taste tends to find us. Now, what are we building?</span><span class="${p}-cursor-bar" aria-hidden="true"></span>
        </h1>

        <div class="${p}-action-row" role="group" aria-label="A.R.I.A. Prompts">
          <button type="button" class="${p}-glass-pill aria-prompt-btn" data-response="A.R.I.A. // PITCH MODE: Send us your wildest spatial hardware, AI agent, or brand film brief. We prototype in 10 days." data-scope="01 // VENTURE &amp; PRODUCT LABS">Pitch us an idea</button>
          <button type="button" class="${p}-glass-pill aria-prompt-btn" data-response="A.R.I.A. // OPENINGS: Hiring Senior Creative Technologists (WebGL/Shaders) &amp; Design Engineers in SF / Tokyo." data-scope="02 // CAREERS &amp; RESIDENCY">Come work here</button>
          <button type="button" class="${p}-glass-pill aria-prompt-btn" data-response="A.R.I.A. // HELLO RECEIVED: Signal locked. Our partners read every note personally within 24 hours." data-scope="03 // DIRECT TRANSMISSION">Send a brief hello</button>
          <button type="button" class="${p}-glass-pill aria-prompt-btn" data-response="A.R.I.A. // OPERATING SYSTEM: Small senior pods, zero account managers, weekly shippable artifacts." data-scope="04 // STUDIO DOCTRINE">See how we operate</button>
        </div>

        <div class="${p}-bottom-bar">
          <span style="font-size:13px;color:rgba(255,255,255,0.7);display:inline-flex;align-items:center;gap:8px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>
            Have something more specific?
          </span>

          <button type="button" id="copyEmailPill" class="${p}-glass-pill" aria-label="Copy hello@mainframe.co to clipboard">
            <span style="color:rgba(255,255,255,0.75);">Reach us:</span>
            <strong id="copyEmailLabel">hello@mainframe.co</strong>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>

  <main id="main-content">
    <!-- ONE LIVE THING: A.R.I.A. ADAPTIVE RESPONSE CONSOLE -->
    <section id="aria-console" class="${p}-wrap tabular-nums" aria-labelledby="ariaConsoleHeading">
      <div class="${p}-card" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
          <span id="ariaScopeBadge" style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">01 // VENTURE &amp; PRODUCT LABS</span>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">RETRO-FUTURIST TERMINAL v2.6</span>
        </div>
        <h2 id="ariaConsoleHeading" class="${p}-h2" style="margin-bottom:10px;">A.R.I.A. Live Dispatch Output</h2>
        <p id="ariaLiveOutput" style="font-size:16px;color:var(--text);max-width:66ch;padding:18px;border-radius:14px;background:rgba(0,0,0,0.45);border:1px solid var(--border);">
          A.R.I.A. // PITCH MODE: Send us your wildest spatial hardware, AI agent, or brand film brief. We prototype in 10 days.
        </p>
      </div>
    </section>

    <!-- STUDIO DIVISIONS -->
    <section id="studio-matrix" class="${p}-wrap tabular-nums" aria-labelledby="matrixHeading" style="padding-top:0;">
      <h2 id="matrixHeading" class="${p}-h2">Four Divisions Under One Mainframe®</h2>
      <div class="${p}-grid-4">
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Mainframe Labs — Applied AI &amp; Spatial Prototypes">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">01 // LABS</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Adaptive Interfaces</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Proprietary multimodal agents, tactile hardware controllers, and real-time WebGPU canvases.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Mainframe Studio — Brand &amp; Product Systems">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">02 // STUDIO</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Flagship Launches</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Identity systems, industrial 3D motion films, and high-converting web architecture for category leaders.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Mainframe Openings — Join the Collective">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">03 // OPENINGS</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Senior Craft Pods</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Autonomous engineering and design residencies in San Francisco, New York, and Tokyo.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-seamless-trigger="Mainframe Shop — Physical Objects &amp; Editions">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">04 // SHOP</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Hardware Editions</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Limited-run anodized aluminum desk instruments, keycap sets, and technical monographs.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="padding-top:24px;padding-bottom:48px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 Mainframe® Corporation. All rights reserved.</span>
    <span style="font-family:var(--font-mono);color:var(--accent-text);">A.R.I.A. AGENT ONLINE • HELLO@MAINFRAME.CO</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">MAINFRAME® DISPATCH</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-glass-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:26px;margin-bottom:10px;">Initiate A.R.I.A. Project Brief</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;max-width:52ch;">
        Direct partner transmission to hello@mainframe.co. Share your timeline, ambition, and what we are building together.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-glass-pill" style="width:100%;justify-content:center;">Transmit Brief to Mainframe®</button>
    </div>
  </div>

  <script>
    (function () {
      var video = document.getElementById('heroBgVideo');
      var scrubReadout = document.getElementById('scrubReadoutText');
      var lastX = null;
      var SENSITIVITY = 0.8;

      window.addEventListener('mousemove', function (e) {
        if (lastX === null) { lastX = e.clientX; return; }
        var deltaX = e.clientX - lastX;
        lastX = e.clientX;
        var norm = deltaX / Math.max(1, window.innerWidth);
        if (video && video.duration && isFinite(video.duration)) {
          var nextTime = Math.max(0, Math.min(video.duration, video.currentTime + norm * video.duration * SENSITIVITY));
          video.currentTime = nextTime;
        }
        if (scrubReadout) {
          scrubReadout.textContent = 'MOUSE SCRUB DELTA: ' + (deltaX >= 0 ? '+' : '') + deltaX + 'px • 0.8x SENSITIVITY';
        }
      }, { passive: true });

      var out = document.getElementById('ariaLiveOutput');
      var scope = document.getElementById('ariaScopeBadge');
      var tw = document.getElementById('typewriterText');

      document.querySelectorAll('.aria-prompt-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var resp = btn.getAttribute('data-response') || '';
          var sc = btn.getAttribute('data-scope') || '';
          if (out) out.textContent = resp;
          if (scope) scope.textContent = sc;
          if (tw) tw.textContent = resp;
        });
      });

      var copyBtn = document.getElementById('copyEmailPill');
      var copyLabel = document.getElementById('copyEmailLabel');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('hello@mainframe.co').catch(function () {});
          }
          if (copyLabel) {
            copyLabel.textContent = 'Copied: hello@mainframe.co';
            setTimeout(function () { copyLabel.textContent = 'hello@mainframe.co'; }, 2000);
          }
        });
      }
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  return null;
}
