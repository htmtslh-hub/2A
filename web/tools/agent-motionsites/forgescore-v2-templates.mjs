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

  return null;
}
