/**
 * Batch 2026-11-11 (Part 1 of 3):
 *   1. halo-prism   (t320, free)    — Halo — The P3 Palette Kit
 *   2. halftone-faq (t321, premium) — Solace — AI Co-Pilot & Halftone Dot Field
 */

export function buildBatch20261111Part1(slug) {
  if (slug === 'halo-prism') {
    return `<!DOCTYPE html>
<html lang="en" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>halo — The P3 palette kit</title>
  <meta name="description" content="halo is the P3 palette kit, crafted for screens. Real-time Cauchy prism dispersion, wide-gamut OKLCH &amp; Display-P3 swatches, and zero-config CSS tokens.">
  <meta name="theme-color" content="#151517">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..600&family=Geist+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,300..500&display=swap" rel="stylesheet">
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
      }
    }
  </script>
  <style>
    :root {
      --bg: #151517;
      --bg-2: #1b1b1e;
      --surface: #202025;
      --ink: #ededed;
      --muted: #a1a1a1;
      --dim: #6e6e73;
      --line: rgba(255, 255, 255, 0.12);
      --line-strong: rgba(255, 255, 255, 0.22);
      --chip: rgba(255, 255, 255, 0.04);
      --accent: #60a5fa;
      --accent-text: #93c5fd;
      --accent-2: #f472b6;
      --on-accent: #0b0d12;
      --gutter: clamp(16px, 2.6vw, 28px);
      --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
      --font-display: "Newsreader", "Times New Roman", serif;
      --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
      --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);
      --ease-snappy: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: rgba(147, 197, 253, 0.28); color: #ffffff; }
    :focus-visible { outline: 2px solid #ffffff; outline-offset: 3px; border-radius: 6px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    html, body {
      background: var(--bg);
      color: var(--ink);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: clip;
    }
    a { color: inherit; text-decoration: none; }
    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      cursor: pointer;
      transition: transform 0.18s var(--ease-snappy), color 0.2s var(--ease-out), background-color 0.2s var(--ease-out), border-color 0.2s var(--ease-out);
    }
    button:active { transform: scale(0.97); }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 200;
      padding: 10px 16px; border-radius: 999px;
      background: var(--ink); color: var(--bg);
      font-size: 13px; font-weight: 500;
      transition: transform 0.25s var(--ease-snappy);
    }
    .skip-link:focus-visible { transform: translateY(116px); }

    /* Hero Stage */
    .hlp-hero {
      position: relative;
      min-height: 100vh;
      min-height: 100svh;
      isolation: isolate;
      overflow: hidden;
      background: var(--bg);
      border-bottom: 1px solid var(--line);
    }
    .hlp-stage {
      position: absolute;
      inset: 0;
      z-index: -1;
      touch-action: pan-y;
      opacity: 0;
      animation: hlpFade 1.2s 0.1s ease forwards;
    }
    html[data-motion="paused"] .hlp-stage,
    html[data-motion="paused"] .hlp-rise {
      opacity: 1;
      transform: none;
      animation: none;
    }
    .hlp-stage canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    #fx { mix-blend-mode: screen; }

    /* Top Navigation */
    .hlp-nav {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px var(--gutter);
      height: 64px;
    }
    .hlp-brand { display: flex; align-items: center; gap: 14px; }
    .hlp-brand-logo { display: inline-flex; align-items: center; }
    .hlp-brand-slash { color: var(--dim); font-size: 22px; font-weight: 300; transform: translateY(-1px); }
    .hlp-brand-name { font-family: var(--font-display); font-size: 24px; font-weight: 400; letter-spacing: -0.01em; line-height: 1; }
    .hlp-links { display: flex; gap: 20px; margin-left: 12px; }
    .hlp-links a { font-size: 14px; color: var(--muted); transition: color 0.2s var(--ease-out); }
    .hlp-links a:hover { color: var(--ink); }
    .hlp-right { display: flex; align-items: center; gap: 8px; }
    .hlp-search {
      display: flex; align-items: center; justify-content: space-between; gap: 24px;
      height: 36px; padding: 0 8px 0 12px; min-width: 168px;
      border: 1px solid var(--line); border-radius: 8px;
      background: var(--chip); font-size: 14px; color: var(--muted);
    }
    .hlp-search:hover { border-color: var(--line-strong); color: var(--ink); }
    .hlp-search kbd {
      font-family: var(--font-sans); font-size: 11px; color: var(--muted);
      border: 1px solid var(--line); border-radius: 5px; padding: 2px 5px;
      background: rgba(255, 255, 255, 0.03);
    }
    .hlp-ask, .hlp-motion-btn {
      height: 36px; padding: 0 12px;
      border: 1px solid var(--line); border-radius: 8px;
      font-size: 13px; font-weight: 500;
      background: var(--chip); color: var(--ink);
      display: inline-flex; align-items: center; gap: 6px;
    }
    .hlp-ask:hover, .hlp-motion-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--line-strong);
    }
    .hlp-icon-btn {
      width: 36px; height: 36px; display: grid; place-items: center; border-radius: 8px;
      color: var(--muted);
    }
    .hlp-icon-btn:hover { background: rgba(255, 255, 255, 0.06); color: var(--ink); }
    .hlp-menu { display: none; }

    /* Hero Copy */
    .hlp-copy {
      position: relative;
      z-index: 2;
      min-height: calc(100svh - 64px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 var(--gutter) 64px;
      max-width: 560px;
      pointer-events: none;
    }
    .hlp-copy > * { pointer-events: auto; }
    .hlp-wordmark {
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(72px, 8.6vw, 124px);
      line-height: 0.9;
      letter-spacing: -0.035em;
      font-variation-settings: "opsz" 72;
      margin-bottom: clamp(14px, 1.8vw, 22px);
    }
    .hlp-lede {
      font-size: clamp(28px, 3.05vw, 44px);
      line-height: 1.2;
      font-weight: 400;
      letter-spacing: -0.025em;
      margin-bottom: clamp(24px, 2.6vw, 36px);
    }
    .hlp-lede span { display: block; }
    .hlp-tabs {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
      font-size: 15px; margin-bottom: 14px;
    }
    .hlp-tab { color: var(--dim); padding: 3px 2px; }
    .hlp-tab:hover { color: var(--muted); }
    .hlp-tab[aria-selected="true"] { color: var(--ink); font-weight: 500; }
    .hlp-dot { color: var(--dim); font-size: 11px; }
    .hlp-cmd {
      position: relative;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      max-width: 440px; padding-top: 14px;
      font-size: 14px; font-family: var(--font-mono); line-height: 1.5;
    }
    .hlp-cmd::before {
      content: ""; position: absolute; left: 0; right: 0; top: 0; height: 1px;
      background: linear-gradient(90deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08) 70%, transparent);
    }
    .hlp-cmd-text {
      transition: opacity 0.18s var(--ease-out), transform 0.18s var(--ease-out);
      word-break: break-word;
    }
    .hlp-cmd-text.swap { opacity: 0; transform: translateY(3px); }
    .hlp-copy-btn {
      width: 30px; height: 30px; flex: none;
      display: grid; place-items: center;
      border-radius: 7px; color: var(--dim);
    }
    .hlp-copy-btn:hover { color: var(--ink); background: rgba(255, 255, 255, 0.06); }
    .hlp-copy-btn .ok { display: none; color: #34d399; }
    .hlp-copy-btn.done .cp { display: none; }
    .hlp-copy-btn.done .ok { display: block; }

    .hlp-beam-meta {
      margin-top: 22px;
      display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap;
      font-size: 12px; font-family: var(--font-mono); color: var(--muted);
    }
    .hlp-beam-pill {
      padding: 5px 10px; border-radius: 999px;
      border: 1px solid var(--line); background: rgba(255, 255, 255, 0.04);
      color: var(--accent-text);
    }

    .hlp-rise {
      opacity: 0;
      transform: translateY(12px);
      animation: hlpRise 0.9s var(--ease-out) forwards;
    }
    .hlp-rise:nth-child(2) { animation-delay: 0.08s; }
    .hlp-rise:nth-child(3) { animation-delay: 0.16s; }
    .hlp-rise:nth-child(4) { animation-delay: 0.24s; }
    .hlp-rise:nth-child(5) { animation-delay: 0.32s; }
    @keyframes hlpRise { to { opacity: 1; transform: none; } }
    @keyframes hlpFade { to { opacity: 1; } }

    /* +20% Below-the-Fold Sections: Display-P3 Gamut Matrix & Optical Specs */
    .hlp-section {
      max-width: 1220px;
      margin: 0 auto;
      padding: clamp(64px, 8vw, 112px) var(--gutter);
    }
    .hlp-sec-head {
      display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap;
      margin-bottom: 36px;
    }
    .hlp-eyebrow {
      font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--accent-text); display: block; margin-bottom: 10px;
    }
    .hlp-h2 {
      font-family: var(--font-display); font-weight: 400;
      font-size: clamp(32px, 4vw, 52px); line-height: 1.05; letter-spacing: -0.025em;
    }
    .hlp-sec-desc { max-width: 44ch; font-size: 15px; line-height: 1.6; color: var(--muted); }

    .hlp-swatch-bar {
      display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
    }
    .hlp-hue-btn {
      padding: 8px 14px; border-radius: 999px;
      border: 1px solid var(--line); background: var(--bg-2);
      font-size: 13px; color: var(--muted);
      display: inline-flex; align-items: center; gap: 8px;
    }
    .hlp-hue-btn[aria-pressed="true"] {
      border-color: var(--line-strong);
      background: rgba(255, 255, 255, 0.09);
      color: var(--ink);
    }
    .hlp-hue-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

    .hlp-ramp-grid {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 12px;
    }
    .hlp-swatch-card {
      background: var(--bg-2);
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 12px;
      display: flex; flex-direction: column; gap: 10px;
      transition: transform 0.25s var(--ease-snappy), border-color 0.25s var(--ease-out);
    }
    .hlp-swatch-card:hover { transform: translateY(-3px); border-color: var(--line-strong); }
    .hlp-swatch-chip {
      height: 76px; border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .hlp-swatch-meta {
      display: flex; justify-content: space-between; align-items: baseline;
      font-family: var(--font-mono); font-size: 12px;
    }
    .hlp-swatch-code {
      font-family: var(--font-mono); font-size: 11px; color: var(--muted);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .hlp-spec-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }
    .hlp-spec-card {
      background: var(--bg-2);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: clamp(22px, 2.6vw, 30px);
    }
    .hlp-spec-val {
      font-family: var(--font-display);
      font-size: clamp(36px, 4vw, 50px);
      line-height: 1;
      margin-bottom: 10px;
      color: var(--ink);
    }
    .hlp-spec-title { font-size: 16px; font-weight: 500; margin-bottom: 8px; }
    .hlp-spec-body { font-size: 14px; line-height: 1.6; color: var(--muted); }

    .js-ready .hlp-reveal {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.65s var(--ease-out), transform 0.65s var(--ease-out);
    }
    .js-ready .hlp-reveal.is-in { opacity: 1; transform: none; }

    .hlp-footer {
      border-top: 1px solid var(--line);
      padding: 36px var(--gutter) 48px;
      max-width: 1220px;
      margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
      font-size: 13px; color: var(--muted);
    }
    .hlp-footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
    .hlp-footer-links a:hover { color: var(--ink); }

    @media (max-width: 960px) {
      .hlp-search { min-width: 0; gap: 12px; }
      .hlp-ramp-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .hlp-spec-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 820px) {
      .hlp-links, .hlp-search { display: none; }
      .hlp-menu { display: grid; }
      .hlp-copy {
        justify-content: flex-start;
        min-height: 0;
        padding-top: clamp(28px, 7svh, 64px);
        padding-bottom: 340px;
        max-width: 100%;
      }
      .hlp-hero { min-height: max(100svh, 740px); }
    }
    @media (max-width: 480px) {
      .hlp-tabs { font-size: 14px; gap: 6px; }
      .hlp-cmd { font-size: 12.5px; }
      .hlp-ramp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .hlp-ask span { display: none; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#mainContent">Skip to main content</a>

  <header class="hlp-nav">
    <div class="hlp-brand">
      <a class="hlp-brand-logo" href="#mainContent" aria-label="halo home">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3 22 20H2z"></path>
        </svg>
      </a>
      <span class="hlp-brand-slash" aria-hidden="true">/</span>
      <a class="hlp-brand-name" href="#mainContent">halo</a>
      <nav class="hlp-links" aria-label="Primary">
        <a href="#palettes">Docs</a>
        <a href="#palettes">Palettes</a>
        <a href="#optics">Optics</a>
      </nav>
    </div>
    <div class="hlp-right">
      <button type="button" class="hlp-search" id="hlpSearchBtn" aria-label="Search palette tokens">
        <span>Search…</span>
        <kbd>⌘ K</kbd>
      </button>
      <button type="button" class="hlp-ask" id="hlpBeamPresetBtn" data-next-preview="true" aria-label="Cycle prism incidence preset">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8"></path>
        </svg>
        <span>Cycle Prism</span>
      </button>
      <button type="button" class="hlp-motion-btn" id="motionToggleBtn" aria-pressed="false">Motion: ON</button>
      <a class="hlp-icon-btn" href="#optics" aria-label="GitHub repository">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.67.42.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"></path>
        </svg>
      </a>
      <button type="button" class="hlp-icon-btn hlp-menu" id="hlpMenuBtn" aria-label="Open menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
          <path d="M4 8h16M4 16h16"></path>
        </svg>
      </button>
    </div>
  </header>

  <main id="mainContent">
    <section class="hlp-hero" aria-label="halo">
      <div class="hlp-stage" id="hlpStage" aria-hidden="true">
        <canvas id="gl"></canvas>
        <canvas id="fx"></canvas>
      </div>

      <div class="hlp-copy">
        <h1 class="hlp-wordmark hlp-rise">halo</h1>
        <p class="hlp-lede hlp-rise">
          <span>The P3 palette kit,</span>
          <span>crafted for screens.</span>
        </p>
        <div class="hlp-tabs hlp-rise" role="tablist" aria-label="Install method">
          <button type="button" class="hlp-tab" role="tab" aria-selected="true" data-cmd="Install halo in my site, then npx halo">Tokens</button>
          <span class="hlp-dot" aria-hidden="true">·</span>
          <button type="button" class="hlp-tab" role="tab" aria-selected="false" data-cmd='@import "halo/p3.css";'>CSS</button>
          <span class="hlp-dot" aria-hidden="true">·</span>
          <button type="button" class="hlp-tab" role="tab" aria-selected="false" data-cmd="Sync halo swatches into your Figma file">Figma</button>
          <span class="hlp-dot" aria-hidden="true">·</span>
          <button type="button" class="hlp-tab" role="tab" aria-selected="false" data-cmd="GET api.halo.dev/v1/palette?space=p3">API</button>
        </div>
        <div class="hlp-cmd hlp-rise">
          <span class="hlp-cmd-text" id="cmd">Install halo in my site, then npx halo</span>
          <button type="button" class="hlp-copy-btn" id="copy" aria-label="Copy command">
            <svg class="cp" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="2.5"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <svg class="ok" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5"></path>
            </svg>
          </button>
        </div>
        <div class="hlp-beam-meta hlp-rise tabular-nums">
          <span class="hlp-beam-pill" id="hlpAngleReadout">IOR 1.645 · 410–695 nm</span>
          <span id="hlpPresetLabel">Preset 01 / Crown Dispersion</span>
        </div>
      </div>
    </section>

    <section class="hlp-section hlp-reveal" id="palettes" aria-labelledby="hlpPalettesHeading">
      <div class="hlp-sec-head">
        <div>
          <span class="hlp-eyebrow">Display-P3 Perceptual Scales</span>
          <h2 class="hlp-h2" id="hlpPalettesHeading">25% wider chroma, zero clipped highlights</h2>
        </div>
        <p class="hlp-sec-desc">Every ramp is solved in OKLCH for uniform APCA contrast and exported with automatic sRGB fallbacks alongside native Display-P3 definitions.</p>
      </div>

      <div class="hlp-swatch-bar" role="group" aria-label="Select spectral hue scale">
        <button type="button" class="hlp-hue-btn" data-hue="cobalt" aria-pressed="true"><span class="hlp-hue-dot" style="background:#3b82f6"></span>Cobalt 470nm</button>
        <button type="button" class="hlp-hue-btn" data-hue="emerald" aria-pressed="false"><span class="hlp-hue-dot" style="background:#10b981"></span>Emerald 525nm</button>
        <button type="button" class="hlp-hue-btn" data-hue="amber" aria-pressed="false"><span class="hlp-hue-dot" style="background:#f59e0b"></span>Amber 585nm</button>
        <button type="button" class="hlp-hue-btn" data-hue="crimson" aria-pressed="false"><span class="hlp-hue-dot" style="background:#f43f5e"></span>Crimson 640nm</button>
      </div>

      <div class="hlp-ramp-grid tabular-nums" id="hlpRampGrid">
        <article class="hlp-swatch-card">
          <div class="hlp-swatch-chip" style="background:#dbeafe"></div>
          <div class="hlp-swatch-meta"><strong>cobalt-100</strong><span>L 93%</span></div>
          <div class="hlp-swatch-code">color(display-p3 0.87 0.92 1.00)</div>
        </article>
        <article class="hlp-swatch-card">
          <div class="hlp-swatch-chip" style="background:#93c5fd"></div>
          <div class="hlp-swatch-meta"><strong>cobalt-300</strong><span>L 80%</span></div>
          <div class="hlp-swatch-code">color(display-p3 0.59 0.78 1.00)</div>
        </article>
        <article class="hlp-swatch-card">
          <div class="hlp-swatch-chip" style="background:#60a5fa"></div>
          <div class="hlp-swatch-meta"><strong>cobalt-400</strong><span>L 70%</span></div>
          <div class="hlp-swatch-code">color(display-p3 0.39 0.65 0.99)</div>
        </article>
        <article class="hlp-swatch-card">
          <div class="hlp-swatch-chip" style="background:#3b82f6"></div>
          <div class="hlp-swatch-meta"><strong>cobalt-500</strong><span>L 61%</span></div>
          <div class="hlp-swatch-code">color(display-p3 0.24 0.51 0.98)</div>
        </article>
        <article class="hlp-swatch-card">
          <div class="hlp-swatch-chip" style="background:#1d4ed8"></div>
          <div class="hlp-swatch-meta"><strong>cobalt-700</strong><span>L 45%</span></div>
          <div class="hlp-swatch-code">color(display-p3 0.13 0.31 0.86)</div>
        </article>
        <article class="hlp-swatch-card">
          <div class="hlp-swatch-chip" style="background:#172554"></div>
          <div class="hlp-swatch-meta"><strong>cobalt-950</strong><span>L 21%</span></div>
          <div class="hlp-swatch-code">color(display-p3 0.09 0.15 0.34)</div>
        </article>
      </div>
    </section>

    <section class="hlp-section hlp-reveal" id="optics" aria-labelledby="hlpOpticsHeading">
      <div class="hlp-sec-head">
        <div>
          <span class="hlp-eyebrow">Cauchy Spectral Architecture</span>
          <h2 class="hlp-h2" id="hlpOpticsHeading">Calibrated from physical light transport</h2>
        </div>
        <p class="hlp-sec-desc">Ported from optical dispersion equations so dark UI surfaces, hairlines, and luminous accents hold crisp legibility across OLED and Liquid Retina panels.</p>
      </div>

      <div class="hlp-spec-grid tabular-nums">
        <article class="hlp-spec-card">
          <div class="hlp-spec-val">72 λ</div>
          <h3 class="hlp-spec-title">Continuous Spectral Bands</h3>
          <p class="hlp-spec-body">Sampled from 410 nm violet to 695 nm deep red using Cauchy index n(λ) = 1.2 + 0.1/λ² and unpolarised Fresnel energy conservation.</p>
        </article>
        <article class="hlp-spec-card">
          <div class="hlp-spec-val">12 Steps</div>
          <h3 class="hlp-spec-title">APCA-Locked Luminance</h3>
          <p class="hlp-spec-body">Steps 1–4 map to subtle backgrounds and chips, 5–8 to interactive borders and focus rings, and 9–12 to high-contrast editorial ink.</p>
        </article>
        <article class="hlp-spec-card">
          <div class="hlp-spec-val">1.8 KB</div>
          <h3 class="hlp-spec-title">Zero-Runtime CSS Output</h3>
          <p class="hlp-spec-body">Ships clean @supports (color: color(display-p3 1 1 1)) progressive layers with zero JavaScript overhead in production bundles.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="hlp-footer">
    <span>halo — The P3 palette kit, crafted for screens. Glass optics inspired by vercel-labs/vgpu (MIT).</span>
    <div class="hlp-footer-links">
      <a href="#mainContent">Top</a>
      <a href="#palettes">Swatches</a>
      <a href="#optics">Benchmarks</a>
    </div>
  </footer>

  <script>
    document.documentElement.classList.add('js-ready');
    (function () {
      /* Glass & Cauchy dispersion inspired by vercel-labs/vgpu (MIT License, Copyright (c) Vercel, Inc.) */
      var htmlEl = document.documentElement;
      var motionBtn = document.getElementById('motionToggleBtn');
      var motionPaused = false;

      if (motionBtn) {
        motionBtn.addEventListener('click', function () {
          motionPaused = !motionPaused;
          htmlEl.setAttribute('data-motion', motionPaused ? 'paused' : 'on');
          motionBtn.setAttribute('aria-pressed', String(motionPaused));
          motionBtn.textContent = motionPaused ? 'Motion: PAUSED' : 'Motion: ON';
        });
      }

      /* Tabs & Command Copy */
      var tabs = Array.prototype.slice.call(document.querySelectorAll('.hlp-tab'));
      var cmdEl = document.getElementById('cmd');
      var copyBtn = document.getElementById('copy');
      var copyTimer = 0;

      function activateTab(tab) {
        tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t === tab)); });
        if (!cmdEl) return;
        cmdEl.classList.add('swap');
        setTimeout(function () {
          cmdEl.textContent = tab.getAttribute('data-cmd') || '';
          cmdEl.classList.remove('swap');
        }, 160);
      }
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () { activateTab(tab); });
      });

      if (copyBtn && cmdEl) {
        copyBtn.addEventListener('click', function () {
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(cmdEl.textContent || '').catch(function () {});
            }
          } catch (e) {}
          copyBtn.classList.add('done');
          clearTimeout(copyTimer);
          copyTimer = setTimeout(function () { copyBtn.classList.remove('done'); }, 1400);
        });
      }

      /* Interactive P3 Swatch Scale Switcher */
      var SCALES = {
        cobalt: [
          ['cobalt-100', 'L 93%', '#dbeafe', 'color(display-p3 0.87 0.92 1.00)'],
          ['cobalt-300', 'L 80%', '#93c5fd', 'color(display-p3 0.59 0.78 1.00)'],
          ['cobalt-400', 'L 70%', '#60a5fa', 'color(display-p3 0.39 0.65 0.99)'],
          ['cobalt-500', 'L 61%', '#3b82f6', 'color(display-p3 0.24 0.51 0.98)'],
          ['cobalt-700', 'L 45%', '#1d4ed8', 'color(display-p3 0.13 0.31 0.86)'],
          ['cobalt-950', 'L 21%', '#172554', 'color(display-p3 0.09 0.15 0.34)']
        ],
        emerald: [
          ['emerald-100', 'L 94%', '#d1fae5', 'color(display-p3 0.83 0.98 0.90)'],
          ['emerald-300', 'L 82%', '#6ee7b7', 'color(display-p3 0.48 0.90 0.72)'],
          ['emerald-400', 'L 73%', '#34d399', 'color(display-p3 0.28 0.83 0.60)'],
          ['emerald-500', 'L 64%', '#10b981', 'color(display-p3 0.18 0.72 0.51)'],
          ['emerald-700', 'L 46%', '#047857', 'color(display-p3 0.08 0.47 0.35)'],
          ['emerald-950', 'L 20%', '#022c22', 'color(display-p3 0.02 0.17 0.13)']
        ],
        amber: [
          ['amber-100', 'L 95%', '#fef3c7', 'color(display-p3 0.99 0.95 0.79)'],
          ['amber-300', 'L 84%', '#fcd34d', 'color(display-p3 0.98 0.83 0.34)'],
          ['amber-400', 'L 77%', '#fbbf24', 'color(display-p3 0.97 0.75 0.20)'],
          ['amber-500', 'L 69%', '#f59e0b', 'color(display-p3 0.94 0.63 0.12)'],
          ['amber-700', 'L 50%', '#b45309', 'color(display-p3 0.68 0.34 0.07)'],
          ['amber-950', 'L 22%', '#451a03', 'color(display-p3 0.26 0.11 0.02)']
        ],
        crimson: [
          ['crimson-100', 'L 93%', '#ffe4e6', 'color(display-p3 0.99 0.89 0.90)'],
          ['crimson-300', 'L 79%', '#fda4af', 'color(display-p3 0.98 0.65 0.69)'],
          ['crimson-400', 'L 69%', '#fb7185', 'color(display-p3 0.96 0.45 0.53)'],
          ['crimson-500', 'L 60%', '#f43f5e', 'color(display-p3 0.92 0.27 0.38)'],
          ['crimson-700', 'L 44%', '#be123c', 'color(display-p3 0.71 0.11 0.24)'],
          ['crimson-950', 'L 20%', '#4c0519', 'color(display-p3 0.28 0.03 0.10)']
        ]
      };
      var hueBtns = Array.prototype.slice.call(document.querySelectorAll('.hlp-hue-btn'));
      var rampGrid = document.getElementById('hlpRampGrid');
      hueBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-hue') || 'cobalt';
          hueBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
          var rows = SCALES[key] || SCALES.cobalt;
          if (rampGrid) {
            rampGrid.innerHTML = rows.map(function (r) {
              return '<article class="hlp-swatch-card">' +
                '<div class="hlp-swatch-chip" style="background:' + r[2] + '"></div>' +
                '<div class="hlp-swatch-meta"><strong>' + r[0] + '</strong><span>' + r[1] + '</span></div>' +
                '<div class="hlp-swatch-code">' + r[3] + '</div>' +
              '</article>';
            }).join('');
          }
        });
      });

      /* Scroll Reveal */
      var reveals = document.querySelectorAll('.hlp-reveal');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
          });
        }, { threshold: 0.12 });
        reveals.forEach(function (el) { io.observe(el); });
      } else {
        reveals.forEach(function (el) { el.classList.add('is-in'); });
      }

      /* Real-Time Cauchy 72-Wavelength Dispersion Engine + Smoky Beveled Prism */
      var glCv = document.getElementById('gl');
      var fxCv = document.getElementById('fx');
      var stageEl = document.getElementById('hlpStage');
      var presetBtn = document.getElementById('hlpBeamPresetBtn');
      var presetLabel = document.getElementById('hlpPresetLabel');
      var angleReadout = document.getElementById('hlpAngleReadout');
      if (!glCv || !fxCv || !stageEl) return;

      var gCtx = glCv.getContext('2d');
      var fCtx = fxCv.getContext('2d');
      var offCv = document.createElement('canvas');
      var oCtx = offCv.getContext('2d');

      var W = 0, H = 0, dpr = 1, S = 320, cx = 0, cy = 0;
      var aimX = 0.52, aimY = 0.42, curX = 0.52, curY = 0.42;
      var lastMove = 0;
      var presetIdx = 0;
      var PRESETS = [
        { x: 0.52, y: 0.42, name: 'Preset 01 / Crown Dispersion', tab: 0 },
        { x: 0.28, y: 0.22, name: 'Preset 02 / High-Apex Fan', tab: 1 },
        { x: 0.76, y: 0.68, name: 'Preset 03 / Total Internal Split', tab: 2 },
        { x: 0.44, y: 0.56, name: 'Preset 04 / Grazing Spectrum', tab: 3 }
      ];

      if (presetBtn) {
        presetBtn.addEventListener('click', function () {
          presetIdx = (presetIdx + 1) % PRESETS.length;
          var p = PRESETS[presetIdx];
          aimX = p.x;
          aimY = p.y;
          lastMove = performance.now();
          if (presetLabel) presetLabel.textContent = p.name;
          if (tabs[p.tab]) activateTab(tabs[p.tab]);
        });
      }

      /* 72 Wavelengths from 410nm to 695nm */
      var WL_COUNT = 72;
      var WLS = [];
      var sumR = 0, sumG = 0, sumB = 0;
      function wavelengthToRGB(nm) {
        var r = 0, g = 0, b = 0;
        if (nm < 440) { r = -(nm - 440) / (440 - 380); b = 1; }
        else if (nm < 490) { g = (nm - 440) / (490 - 440); b = 1; }
        else if (nm < 510) { g = 1; b = -(nm - 510) / (510 - 490); }
        else if (nm < 580) { r = (nm - 510) / (580 - 510); g = 1; }
        else if (nm < 645) { r = 1; g = -(nm - 645) / (645 - 580); }
        else { r = 1; }
        var att = nm < 420 ? 0.35 + 0.65 * (nm - 380) / 40 : nm > 665 ? 0.35 + 0.65 * (700 - nm) / 35 : 1;
        return [Math.pow(r * att, 0.85), Math.pow(g * att, 0.85), Math.pow(b * att, 0.85)];
      }
      for (var i = 0; i < WL_COUNT; i++) {
        var nm = 410 + (695 - 410) * (i / (WL_COUNT - 1));
        var um = nm / 1000;
        var n = 1.48 + 0.042 / (um * um); /* Strong Cauchy crown-flint dispersion */
        var rgb = wavelengthToRGB(nm);
        sumR += rgb[0]; sumG += rgb[1]; sumB += rgb[2];
        WLS.push({ nm: nm, n: n, r: rgb[0], g: rgb[1], b: rgb[2] });
      }
      WLS.forEach(function (w) {
        w.wr = w.r / sumR * WL_COUNT * 0.34;
        w.wg = w.g / sumG * WL_COUNT * 0.34;
        w.wb = w.b / sumB * WL_COUNT * 0.34;
      });

      /* 70 Dust motes */
      var motes = [];
      for (var m = 0; m < 70; m++) {
        motes.push({
          u: Math.random(),
          v: (Math.random() - 0.5) * 2,
          r: 0.6 + Math.random() * 1.2,
          sp: 0.03 + Math.random() * 0.06,
          ph: Math.random() * 6.283
        });
      }

      function layout() {
        var rect = stageEl.getBoundingClientRect();
        W = Math.max(320, rect.width || window.innerWidth);
        H = Math.max(520, rect.height || window.innerHeight);
        var mobile = W < 820;
        dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
        glCv.width = Math.round(W * dpr);
        glCv.height = Math.round(H * dpr);
        fxCv.width = Math.round(W * dpr);
        fxCv.height = Math.round(H * dpr);
        offCv.width = Math.round(W * dpr);
        offCv.height = Math.round(H * dpr);
        if (mobile) {
          S = Math.min(W * 0.66, H * 0.36, 360);
          cx = W * 0.5;
          cy = H * 0.73;
        } else {
          S = Math.min(W * 0.35, H * 0.6);
          cx = W * 0.66;
          cy = H * 0.53;
        }
      }
      layout();
      window.addEventListener('resize', layout, { passive: true });

      window.addEventListener('pointermove', function (e) {
        var r = stageEl.getBoundingClientRect();
        if (e.clientY > r.bottom + 120) return;
        aimX = Math.min(1, Math.max(0, (e.clientX - r.left) / Math.max(1, r.width)));
        aimY = Math.min(1, Math.max(0, (e.clientY - r.top) / Math.max(1, r.height)));
        lastMove = performance.now();
      }, { passive: true });

      function traceRay(ox, oy, dx, dy, nIdx, verts, normals) {
        var segs = [];
        var inside = false;
        var px = ox, py = oy, rdx = dx, rdy = dy;
        var energy = 1;
        var key = '';
        for (var bounce = 0; bounce < 5; bounce++) {
          var bestT = 1e9, hitEdge = -1;
          for (var e = 0; e < 3; e++) {
            var ax = verts[e][0], ay = verts[e][1];
            var bx = verts[(e + 1) % 3][0], by = verts[(e + 1) % 3][1];
            var ex = bx - ax, ey = by - ay;
            var det = rdx * (-ey) - rdy * (-ex);
            if (Math.abs(det) < 1e-7) continue;
            var t = ((ax - px) * (-ey) - (ay - py) * (-ex)) / det;
            var u = (rdx * (ay - py) - rdy * (ax - px)) / det;
            if (t > 0.4 && u >= -0.001 && u <= 1.001 && t < bestT) {
              bestT = t;
              hitEdge = e;
            }
          }
          if (hitEdge < 0) {
            var far = Math.hypot(W, H) * 1.4;
            segs.push({ x1: px, y1: py, x2: px + rdx * far, y2: py + rdy * far, energy: energy, inside: inside, key: key + 'O' });
            break;
          }
          var hx = px + rdx * bestT, hy = py + rdy * bestT;
          if (bounce > 0) {
            segs.push({ x1: px, y1: py, x2: hx, y2: hy, energy: energy, inside: inside, key: key, edge: hitEdge });
          }
          var nx = normals[hitEdge][0], ny = normals[hitEdge][1];
          var n1 = inside ? nIdx : 1.0;
          var n2 = inside ? 1.0 : nIdx;
          if (inside) { nx = -nx; ny = -ny; }
          var cosI = -(rdx * nx + rdy * ny);
          if (cosI < 0) { nx = -nx; ny = -ny; cosI = -cosI; }
          var eta = n1 / n2;
          var k = 1 - eta * eta * (1 - cosI * cosI);
          if (k < 0) {
            /* Total Internal Reflection */
            rdx = rdx + 2 * cosI * nx;
            rdy = rdy + 2 * cosI * ny;
            px = hx + rdx * 0.5;
            py = hy + rdy * 0.5;
            key += 'R' + hitEdge;
          } else {
            var cosT = Math.sqrt(k);
            var rs = (n1 * cosI - n2 * cosT) / (n1 * cosI + n2 * cosT);
            var rp = (n1 * cosT - n2 * cosI) / (n1 * cosT + n2 * cosI);
            var F = 0.5 * (rs * rs + rp * rp);
            energy *= (1 - F * 0.65);
            rdx = eta * rdx + (eta * cosI - cosT) * nx;
            rdy = eta * rdy + (eta * cosI - cosT) * ny;
            var len = Math.hypot(rdx, rdy) || 1;
            rdx /= len; rdy /= len;
            inside = !inside;
            px = hx + rdx * 0.5;
            py = hy + rdy * 0.5;
            key += 'T' + hitEdge;
          }
          if (energy < 0.08) break;
        }
        return segs;
      }

      function render(now) {
        var t = now * 0.001;
        if (!motionPaused) {
          if (now - lastMove > 4500) {
            var ang = t * (Math.PI * 2 / 16);
            aimX = 0.5 + Math.cos(ang) * 0.28;
            aimY = 0.46 + Math.sin(ang) * 0.24;
          }
          curX += (aimX - curX) * 0.09;
          curY += (aimY - curY) * 0.09;
        }

        var tiltX = (curX - 0.5) * 14;
        var tiltY = (curY - 0.5) * 10;
        var pcx = cx + tiltX;
        var pcy = cy + tiltY;
        var R = S / Math.sqrt(3);

        var verts = [
          [pcx, pcy - R],
          [pcx + S * 0.5, pcy + R * 0.5],
          [pcx - S * 0.5, pcy + R * 0.5]
        ];
        var normals = [];
        for (var e = 0; e < 3; e++) {
          var a = verts[e], b = verts[(e + 1) % 3];
          var ex = b[0] - a[0], ey = b[1] - a[1];
          var l = Math.hypot(ex, ey) || 1;
          /* Clockwise in y-down -> outward normal is (ey/l, -ex/l) */
          var nx = ey / l, ny = -ex / l;
          var mx = (a[0] + b[0]) * 0.5 - pcx, my = (a[1] + b[1]) * 0.5 - pcy;
          if (nx * mx + ny * my < 0) { nx = -nx; ny = -ny; }
          normals.push([nx, ny]);
        }

        /* Lamp aimed from the RIGHT onto edge 0 (top -> right) */
        var entryT = 0.22 + curX * 0.52;
        var entryX = verts[0][0] + (verts[1][0] - verts[0][0]) * entryT;
        var entryY = verts[0][1] + (verts[1][1] - verts[0][1]) * entryT;
        var incDeg = -18 + curY * 56;
        if (angleReadout && !motionPaused) {
          angleReadout.textContent = 'IOR 1.645 · θ ' + incDeg.toFixed(1) + '°';
        }
        var inNx = -normals[0][0], inNy = -normals[0][1];
        var rad = incDeg * Math.PI / 180;
        var dirX = inNx * Math.cos(rad) - inNy * Math.sin(rad);
        var dirY = inNx * Math.sin(rad) + inNy * Math.cos(rad);
        var farSrc = Math.hypot(W, H) * 1.2;
        var srcX = entryX - dirX * farSrc;
        var srcY = entryY - dirY * farSrc;

        /* 1. Draw smoky 3D beveled glass prism on #gl */
        gCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        gCtx.clearRect(0, 0, W, H);

        var bgGlow = gCtx.createRadialGradient(pcx, pcy, S * 0.05, pcx, pcy, S * 1.05);
        bgGlow.addColorStop(0, 'rgba(120, 145, 195, 0.10)');
        bgGlow.addColorStop(0.5, 'rgba(40, 44, 62, 0.05)');
        bgGlow.addColorStop(1, 'rgba(21, 21, 23, 0)');
        gCtx.fillStyle = bgGlow;
        gCtx.fillRect(0, 0, W, H);

        /* Back depth bevel offset for 3D glass thickness */
        var depthDx = -14 - (curX - 0.5) * 16;
        var depthDy = 10 - (curY - 0.5) * 12;
        var backVerts = verts.map(function (v) { return [v[0] + depthDx, v[1] + depthDy]; });

        /* Side glass walls */
        for (var sIdx = 0; sIdx < 3; sIdx++) {
          var nIdx2 = (sIdx + 1) % 3;
          gCtx.beginPath();
          gCtx.moveTo(verts[sIdx][0], verts[sIdx][1]);
          gCtx.lineTo(verts[nIdx2][0], verts[nIdx2][1]);
          gCtx.lineTo(backVerts[nIdx2][0], backVerts[nIdx2][1]);
          gCtx.lineTo(backVerts[sIdx][0], backVerts[sIdx][1]);
          gCtx.closePath();
          gCtx.fillStyle = sIdx === 0 ? 'rgba(205, 225, 255, 0.07)' : 'rgba(255, 255, 255, 0.03)';
          gCtx.fill();
          gCtx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
          gCtx.lineWidth = 1;
          gCtx.stroke();
        }

        /* Main front smoky crystal face */
        var glassGrad = gCtx.createLinearGradient(verts[2][0], verts[0][1], verts[1][0], verts[1][1]);
        glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.11)');
        glassGrad.addColorStop(0.38, 'rgba(34, 36, 44, 0.46)');
        glassGrad.addColorStop(0.82, 'rgba(22, 23, 28, 0.62)');
        glassGrad.addColorStop(1, 'rgba(185, 215, 255, 0.16)');
        gCtx.beginPath();
        gCtx.moveTo(verts[0][0], verts[0][1]);
        gCtx.lineTo(verts[1][0], verts[1][1]);
        gCtx.lineTo(verts[2][0], verts[2][1]);
        gCtx.closePath();
        gCtx.fillStyle = glassGrad;
        gCtx.fill();

        /* Rounded fillet specular rim */
        gCtx.lineJoin = 'round';
        gCtx.lineWidth = 2.2;
        gCtx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
        gCtx.stroke();

        /* 2. Draw Cauchy spectral rays on offscreen canvas */
        oCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        oCtx.globalCompositeOperation = 'source-over';
        oCtx.clearRect(0, 0, W, H);
        oCtx.globalCompositeOperation = 'lighter';

        /* Incoming white light beam */
        oCtx.lineCap = 'round';
        oCtx.beginPath();
        oCtx.moveTo(srcX, srcY);
        oCtx.lineTo(entryX, entryY);
        oCtx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
        oCtx.lineWidth = 12;
        oCtx.stroke();
        oCtx.strokeStyle = 'rgba(255, 255, 255, 0.96)';
        oCtx.lineWidth = 4.2;
        oCtx.stroke();

        /* Entry glint */
        var glint = oCtx.createRadialGradient(entryX, entryY, 0, entryX, entryY, S * 0.18);
        glint.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        glint.addColorStop(0.35, 'rgba(210, 230, 255, 0.35)');
        glint.addColorStop(1, 'rgba(255, 255, 255, 0)');
        oCtx.fillStyle = glint;
        oCtx.beginPath();
        oCtx.arc(entryX, entryY, S * 0.18, 0, Math.PI * 2);
        oCtx.fill();

        /* Trace all 72 wavelengths and group by path key */
        var groups = {};
        for (var w = 0; w < WL_COUNT; w++) {
          var wl = WLS[w];
          var segs = traceRay(srcX, srcY, dirX, dirY, wl.n, verts, normals);
          for (var sg = 0; sg < segs.length; sg++) {
            var item = segs[sg];
            if (!groups[item.key]) groups[item.key] = [];
            groups[item.key].push({ wl: wl, seg: item });
          }
        }

        Object.keys(groups).forEach(function (k) {
          var list = groups[k];
          for (var i = 0; i < list.length; i++) {
            var cur = list[i];
            var s = cur.seg;
            var wl = cur.wl;
            if (i + 1 < list.length) {
              var nxt = list[i + 1].seg;
              var alpha = s.energy * (s.inside ? 0.22 : 0.34);
              oCtx.beginPath();
              oCtx.moveTo(s.x1, s.y1);
              oCtx.lineTo(s.x2, s.y2);
              oCtx.lineTo(nxt.x2, nxt.y2);
              oCtx.lineTo(nxt.x1, nxt.y1);
              oCtx.closePath();
              oCtx.fillStyle = 'rgba(' + Math.round(wl.r * 255) + ',' + Math.round(wl.g * 255) + ',' + Math.round(wl.b * 255) + ',' + alpha.toFixed(3) + ')';
              oCtx.fill();
            }
            oCtx.beginPath();
            oCtx.moveTo(s.x1, s.y1);
            oCtx.lineTo(s.x2, s.y2);
            var lineAlpha = Math.min(0.45, s.energy * 0.11);
            oCtx.strokeStyle = 'rgba(' + Math.round(wl.r * 255) + ',' + Math.round(wl.g * 255) + ',' + Math.round(wl.b * 255) + ',' + lineAlpha.toFixed(3) + ')';
            oCtx.lineWidth = s.inside ? 3.5 : 3.0;
            oCtx.stroke();
          }
        });

        /* 70 Dust motes along incoming beam */
        var perpX = -dirY, perpY = dirX;
        for (var d = 0; d < motes.length; d++) {
          var mt = motes[d];
          var u = (mt.u + (motionPaused ? 0 : t * mt.sp)) % 1;
          var dist = u * S * 1.45;
          var spread = (8 + u * 44) * mt.v;
          var mx = entryX - dirX * dist + perpX * spread;
          var my = entryY - dirY * dist + perpY * spread;
          var tw = (0.35 + 0.65 * Math.pow(Math.sin(t * 2.2 + mt.ph) * 0.5 + 0.5, 2)) * (1 - u * 0.65);
          oCtx.fillStyle = 'rgba(255,255,255,' + (tw * 0.72).toFixed(3) + ')';
          oCtx.beginPath();
          oCtx.arc(mx, my, mt.r, 0, Math.PI * 2);
          oCtx.fill();
        }

        /* 3. Soft multi-pass bloom into #fx */
        fCtx.setTransform(1, 0, 0, 1, 0, 0);
        fCtx.globalCompositeOperation = 'source-over';
        fCtx.clearRect(0, 0, fxCv.width, fxCv.height);
        fCtx.globalCompositeOperation = 'lighter';
        try {
          fCtx.filter = 'blur(26px)';
          fCtx.globalAlpha = 0.62;
          fCtx.drawImage(offCv, 0, 0);
          fCtx.filter = 'blur(9px)';
          fCtx.globalAlpha = 0.88;
          fCtx.drawImage(offCv, 0, 0);
          fCtx.filter = 'blur(2px)';
          fCtx.globalAlpha = 1;
          fCtx.drawImage(offCv, 0, 0);
          fCtx.filter = 'none';
        } catch (err) {
          fCtx.globalAlpha = 1;
          fCtx.drawImage(offCv, 0, 0);
        }
        fCtx.globalAlpha = 1;

        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    })();
  </script>
</body>
</html>`;
  }

  if (slug === 'halftone-faq') {
    return `<!DOCTYPE html>
<html lang="en" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Solace — AI Co-Pilot &amp; Priority Intelligence</title>
  <meta name="description" content="Questions, answered. Solace is your AI co-pilot for the work that matters: priorities, follow-ups and answers across every tool your team already uses.">
  <meta name="theme-color" content="#050302">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --u: min(calc(100svw / 1600), calc(100svh / 940));
      --bg: #050302;
      --surface: #140b06;
      --cream: #fbefe2;
      --mid: #d9c3ad;
      --muted: #a68c74;
      --line: rgba(255, 214, 170, 0.14);
      --line-strong: rgba(255, 190, 120, 0.28);
      --glass: rgba(34, 18, 8, 0.78);
      --accent: #f89640;
      --accent-text: #ffbe78;
      --accent-2: #e26a18;
      --on-accent: #180b04;
      --font-sans: "Geist", system-ui, -apple-system, sans-serif;
      --font-display: "Geist", system-ui, -apple-system, sans-serif;
      --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, monospace;
      --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: rgba(248, 150, 64, 0.32); color: #fbefe2; }
    :focus-visible { outline: 2px solid var(--cream); outline-offset: 3px; border-radius: 4px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    html, body {
      background: var(--bg);
      color: var(--cream);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: clip;
    }
    a { color: inherit; text-decoration: none; }
    button {
      font: inherit; color: inherit; background: none; border: 0; cursor: pointer; text-align: left;
      transition: transform 0.18s var(--ease-out), opacity 0.2s var(--ease-out), background-color 0.2s var(--ease-out), border-color 0.2s var(--ease-out);
    }
    button:active { transform: scale(0.97); }
    ul { list-style: none; }

    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 200;
      padding: 10px 16px; border-radius: 999px;
      background: var(--cream); color: var(--on-accent);
      font-size: 13px; font-weight: 600;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translateY(116px); }

    /* Top Bar */
    .slc-header {
      position: sticky; top: 0; z-index: 40;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      padding: 14px clamp(20px, 4vw, 56px);
      background: rgba(5, 3, 2, 0.84);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--line);
    }
    .slc-brand-top {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 18px; font-weight: 500; letter-spacing: -0.02em;
    }
    .slc-mark-sm {
      width: 28px; height: 28px; border-radius: 4px;
      background: var(--cream); display: grid; place-items: center;
    }
    .slc-mark-sm svg { width: 58%; height: 58%; fill: #1b0d05; }
    .slc-nav { display: flex; align-items: center; gap: 24px; }
    .slc-nav a { font-size: 14px; color: var(--mid); transition: color 0.2s var(--ease-out); }
    .slc-nav a:hover { color: var(--cream); }
    .slc-actions { display: flex; align-items: center; gap: 10px; }
    .slc-btn {
      padding: 8px 14px; border-radius: 6px;
      border: 1px solid var(--line);
      background: rgba(34, 18, 8, 0.7);
      font-size: 13px; font-weight: 500; color: var(--cream);
      display: inline-flex; align-items: center; gap: 7px;
    }
    .slc-btn:hover { border-color: var(--line-strong); background: rgba(56, 28, 12, 0.85); }
    .slc-btn-primary {
      background: var(--cream); color: var(--on-accent); border-color: var(--cream); font-weight: 600;
    }
    .slc-btn-primary:hover { background: #fff6ec; }

    /* Hero + Triage Workspace (+20% Creative Expansion) */
    .slc-hero {
      max-width: 1160px;
      margin: 0 auto;
      padding: clamp(56px, 7vw, 96px) clamp(20px, 4vw, 48px) clamp(36px, 5vw, 60px);
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: clamp(28px, 4vw, 56px);
      align-items: center;
    }
    .slc-badge {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--accent-text);
      padding: 6px 12px; border-radius: 999px;
      border: 1px solid var(--line); background: rgba(248, 150, 64, 0.08);
      margin-bottom: 18px;
    }
    .slc-badge-dot {
      width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
      animation: slcPulse 2.2s ease-in-out infinite;
    }
    @keyframes slcPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.55; }
    }
    .slc-h1 {
      font-size: clamp(36px, 4.6vw, 60px);
      font-weight: 600;
      line-height: 1.04;
      letter-spacing: -0.03em;
      margin-bottom: 18px;
    }
    .slc-lead {
      font-size: clamp(16px, 1.35vw, 18px);
      line-height: 1.6;
      color: var(--mid);
      max-width: 48ch;
      margin-bottom: 26px;
    }
    .slc-hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

    /* Interactive Priority Triage Card */
    .slc-triage-panel {
      background: linear-gradient(180deg, rgba(38, 20, 9, 0.88), rgba(20, 10, 5, 0.92));
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
    }
    .slc-triage-top {
      display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;
      padding-bottom: 14px; border-bottom: 1px solid var(--line); margin-bottom: 14px;
    }
    .slc-filter-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .slc-chip {
      padding: 5px 10px; border-radius: 5px;
      font-size: 12px; font-family: var(--font-mono); color: var(--mid);
      border: 1px solid transparent;
    }
    .slc-chip[aria-pressed="true"] {
      background: rgba(248, 150, 64, 0.16);
      border-color: var(--line-strong);
      color: var(--cream);
    }
    .slc-thread-list { display: grid; gap: 10px; }
    .slc-thread {
      padding: 12px 14px; border-radius: 7px;
      background: rgba(255, 214, 170, 0.03);
      border: 1px solid rgba(255, 214, 170, 0.09);
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
    }
    .slc-thread-tool {
      font-family: var(--font-mono); font-size: 11px; color: var(--accent-text);
      text-transform: uppercase; letter-spacing: 0.06em;
    }
    .slc-thread-title { font-size: 14px; font-weight: 500; margin-top: 3px; }
    .slc-thread-score {
      font-family: var(--font-mono); font-size: 12px; font-weight: 500;
      padding: 4px 8px; border-radius: 4px;
      background: rgba(226, 106, 24, 0.22); color: var(--cream);
      white-space: nowrap;
    }

    /* Telemetry Strip */
    .slc-metrics {
      max-width: 1160px; margin: 0 auto;
      padding: 12px clamp(20px, 4vw, 48px) clamp(40px, 5vw, 68px);
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px;
    }
    .slc-metric-card {
      padding: 22px 24px;
      border-radius: 8px;
      background: rgba(28, 15, 7, 0.66);
      border: 1px solid var(--line);
    }
    .slc-metric-num { font-size: clamp(28px, 3vw, 38px); font-weight: 600; letter-spacing: -0.02em; color: var(--cream); }
    .slc-metric-lbl { font-size: 14px; color: var(--mid); margin-top: 6px; line-height: 1.5; }

    /* Signature Halftone Dot FAQ + Footer Stage (Verbatim Core) */
    .slc-wrap {
      position: relative;
      min-height: 100svh;
      overflow: hidden;
      background: #050302;
    }
    #dots {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    .slc-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100svh;
      padding: calc(64 * var(--u)) calc(28 * var(--u)) calc(28 * var(--u));
    }
    .slc-faq-h2 {
      font-size: calc(40 * var(--u));
      font-weight: 600;
      letter-spacing: -0.02em;
      text-align: center;
    }
    .slc-faq {
      width: calc(688 * var(--u));
      margin-top: calc(22 * var(--u));
      margin-bottom: calc(56 * var(--u));
      padding: calc(4 * var(--u)) calc(21 * var(--u));
      background: var(--glass);
      border: 1px solid rgba(255, 190, 120, 0.14);
      border-radius: calc(6 * var(--u));
      backdrop-filter: blur(10px);
      box-shadow: 0 calc(20 * var(--u)) calc(60 * var(--u)) rgba(0, 0, 0, 0.45);
    }
    .slc-q { border-bottom: 1px solid var(--line); }
    .slc-q:last-child { border-bottom: 0; }
    .slc-q button {
      display: flex; align-items: center; justify-content: space-between; gap: calc(20 * var(--u));
      width: 100%; padding: calc(17 * var(--u)) 0;
      font-size: calc(17 * var(--u)); font-weight: 500; letter-spacing: -0.005em;
    }
    .slc-q svg {
      flex: none; width: calc(14 * var(--u)); height: calc(14 * var(--u));
      fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
      transition: transform 0.35s var(--ease-out);
    }
    .slc-q[data-open] svg { transform: rotate(180deg); }
    .slc-a {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.4s var(--ease-out);
    }
    .slc-q[data-open] .slc-a { grid-template-rows: 1fr; }
    .slc-a > div { overflow: hidden; }
    .slc-a p {
      padding: 0 calc(20 * var(--u)) calc(20 * var(--u)) 0;
      font-size: calc(15 * var(--u));
      line-height: 1.6;
      color: var(--mid);
    }

    .slc-footer {
      width: 100%;
      margin-top: auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: calc(40 * var(--u));
      padding: calc(46 * var(--u)) calc(64 * var(--u)) calc(44 * var(--u));
      background: linear-gradient(180deg, rgba(40, 20, 8, 0.86), rgba(84, 40, 14, 0.84));
      border: 1px solid rgba(255, 190, 120, 0.12);
      border-radius: calc(6 * var(--u));
      backdrop-filter: blur(12px);
    }
    .slc-brand {
      display: flex; align-items: center; gap: calc(14 * var(--u));
      font-size: calc(25 * var(--u)); font-weight: 500; letter-spacing: -0.02em;
    }
    .slc-mark {
      display: grid; place-items: center;
      width: calc(38 * var(--u)); height: calc(38 * var(--u));
      background: var(--cream); border-radius: calc(2 * var(--u));
    }
    .slc-mark svg { width: 56%; height: 56%; fill: #1b0d05; }
    .slc-tag {
      margin-top: calc(20 * var(--u));
      max-width: calc(440 * var(--u));
      font-size: calc(15 * var(--u));
      line-height: 1.6;
      color: #f0dcc6;
    }
    .slc-social { display: flex; gap: calc(16 * var(--u)); margin-top: calc(26 * var(--u)); }
    .slc-social a {
      display: grid; place-items: center;
      width: calc(26 * var(--u)); height: calc(26 * var(--u));
      opacity: 0.9; transition: opacity 0.2s var(--ease-out);
    }
    .slc-social a:hover { opacity: 0.6; }
    .slc-social svg {
      width: 100%; height: 100%; fill: none; stroke: currentColor;
      stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round;
    }
    .slc-copy { margin-top: calc(34 * var(--u)); font-size: calc(14 * var(--u)); color: #ecd8c2; }
    .slc-links {
      display: grid;
      grid-template-columns: repeat(3, calc(196 * var(--u)));
      gap: calc(8 * var(--u));
    }
    .slc-links h3 { font-size: calc(15 * var(--u)); font-weight: 600; margin-bottom: calc(16 * var(--u)); }
    .slc-links li { margin-bottom: calc(11 * var(--u)); font-size: calc(14.5 * var(--u)); color: #ead5be; }
    .slc-links a { transition: color 0.2s var(--ease-out); }
    .slc-links a:hover { color: #ffffff; }

    .js-ready .slc-reveal {
      opacity: 0; transform: translateY(16px);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .js-ready .slc-reveal.is-in { opacity: 1; transform: none; }

    @media (max-width: 960px) {
      .slc-hero { grid-template-columns: 1fr; }
      .slc-metrics { grid-template-columns: 1fr; }
    }
    @media (max-width: 820px) {
      :root { --u: 1px; }
      .slc-nav { display: none; }
      .slc-content { padding: 48px 16px 16px; }
      .slc-faq-h2 { font-size: 32px; }
      .slc-faq { width: 100%; margin-top: 20px; }
      .slc-footer { grid-template-columns: 1fr; padding: 32px 24px; margin-top: 48px; }
      .slc-links { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; }
    }
    @media (max-width: 480px) {
      .slc-actions .slc-btn-primary { display: none; }
      .slc-links { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#mainContent">Skip to main content</a>

  <header class="slc-header">
    <a class="slc-brand-top" href="#mainContent" aria-label="Solace home">
      <span class="slc-mark-sm">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="14" cy="6" r="3"></circle>
          <circle cx="6" cy="14" r="3"></circle>
          <circle cx="14" cy="14" r="3"></circle>
        </svg>
      </span>
      <span>Solace</span>
    </a>
    <nav class="slc-nav" aria-label="Primary">
      <a href="#priorities">Priorities</a>
      <a href="#telemetry">Security</a>
      <a href="#faqSection">FAQ</a>
    </nav>
    <div class="slc-actions">
      <button type="button" class="slc-btn" id="slcPulseBtn" data-next-preview="true" aria-label="Pulse halftone field and cycle priority">
        <span>Cycle Priority</span>
      </button>
      <button type="button" class="slc-btn" id="motionToggleBtn" aria-pressed="false">Motion: ON</button>
      <a class="slc-btn slc-btn-primary" href="#faqSection">Start 14-day trial</a>
    </div>
  </header>

  <main id="mainContent">
    <section class="slc-hero" id="priorities" aria-labelledby="slcHeroHeading">
      <div>
        <div class="slc-badge"><span class="slc-badge-dot" aria-hidden="true"></span>AI Co-Pilot · Unified Signal</div>
        <h1 class="slc-h1" id="slcHeroHeading">The one thing that cannot wait, surfaced automatically.</h1>
        <p class="slc-lead">Solace connects Outlook, Gmail, Slack, Zoom, Figma and Linear into one calm command layer—weighing deadlines, stakeholders and recurring threads so nothing slips between apps.</p>
        <div class="slc-hero-ctas">
          <a class="slc-btn slc-btn-primary" href="#faqSection">Explore 14-day free trial</a>
          <a class="slc-btn" href="#faqSection">Read FAQ ↓</a>
        </div>
      </div>

      <div class="slc-triage-panel tabular-nums" aria-label="Live priority triage queue">
        <div class="slc-triage-top">
          <span style="font-size:13px;font-weight:500;color:var(--cream);">Ranked Today · Morning Brief</span>
          <div class="slc-filter-row" role="group" aria-label="Filter connected tool">
            <button type="button" class="slc-chip" data-tool="all" aria-pressed="true">All</button>
            <button type="button" class="slc-chip" data-tool="Linear" aria-pressed="false">Linear</button>
            <button type="button" class="slc-chip" data-tool="Slack" aria-pressed="false">Slack</button>
            <button type="button" class="slc-chip" data-tool="Figma" aria-pressed="false">Figma</button>
          </div>
        </div>
        <div class="slc-thread-list" id="slcThreadList">
          <article class="slc-thread" data-item-tool="Linear">
            <div>
              <div class="slc-thread-tool">Linear · Blocker</div>
              <div class="slc-thread-title">SOC2 key rotation sign-off before 16:00 UTC</div>
            </div>
            <span class="slc-thread-score">P98</span>
          </article>
          <article class="slc-thread" data-item-tool="Slack">
            <div>
              <div class="slc-thread-tool">Slack · #exec-ship</div>
              <div class="slc-thread-title">VP Product asked twice on Q4 enterprise rollout</div>
            </div>
            <span class="slc-thread-score">P94</span>
          </article>
          <article class="slc-thread" data-item-tool="Figma">
            <div>
              <div class="slc-thread-tool">Figma · Design Review</div>
              <div class="slc-thread-title">Copilot side-sheet tokens awaiting final approval</div>
            </div>
            <span class="slc-thread-score">P89</span>
          </article>
        </div>
      </div>
    </section>

    <section class="slc-metrics slc-reveal tabular-nums" id="telemetry" aria-label="Workspace telemetry">
      <article class="slc-metric-card">
        <div class="slc-metric-num">6 Tools</div>
        <p class="slc-metric-lbl">Native bi-directional context across Outlook, Gmail, Slack, Zoom, Figma and Linear.</p>
      </article>
      <article class="slc-metric-card">
        <div class="slc-metric-num">0 Training</div>
        <p class="slc-metric-lbl">Encrypted in transit and at rest. Workspace threads never train external foundation models.</p>
      </article>
      <article class="slc-metric-card">
        <div class="slc-metric-num">14 Days</div>
        <p class="slc-metric-lbl">Full-feature team trial switched on from day one with instant history export or deletion.</p>
      </article>
    </section>

    <section class="slc-wrap" id="faqSection" aria-labelledby="slcFaqHeading">
      <canvas id="dots" aria-hidden="true"></canvas>
      <div class="slc-content">
        <h2 class="slc-faq-h2" id="slcFaqHeading">Questions, answered</h2>
        <div class="slc-faq" id="faq">
          <div class="slc-q" data-open>
            <button type="button" aria-expanded="true">
              <span>Which tools does Solace connect to?</span>
              <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4"></path></svg>
            </button>
            <div class="slc-a"><div><p>Solace works with Outlook, Gmail, Slack, Zoom, Figma and Linear, and pulls them into one place so nothing slips between apps.</p></div></div>
          </div>
          <div class="slc-q">
            <button type="button" aria-expanded="false">
              <span>How does Solace decide what is a priority?</span>
              <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4"></path></svg>
            </button>
            <div class="slc-a"><div><p>It weighs deadlines, who is asking and how often a thread comes back, then ranks your day so the one thing that can’t wait sits at the top.</p></div></div>
          </div>
          <div class="slc-q">
            <button type="button" aria-expanded="false">
              <span>Is my data and chat history secure?</span>
              <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4"></path></svg>
            </button>
            <div class="slc-a"><div><p>Everything is encrypted in transit and at rest, nothing is used to train models, and you can export or delete your history at any time.</p></div></div>
          </div>
          <div class="slc-q">
            <button type="button" aria-expanded="false">
              <span>Can I try Solace before I pay?</span>
              <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4"></path></svg>
            </button>
            <div class="slc-a"><div><p>Yes. Every workspace starts with a 14-day trial with every feature switched on, and no card needed.</p></div></div>
          </div>
        </div>

        <footer class="slc-footer">
          <div>
            <a class="slc-brand" href="#mainContent" aria-label="Solace">
              <span class="slc-mark">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="14" cy="6" r="3"></circle>
                  <circle cx="6" cy="14" r="3"></circle>
                  <circle cx="14" cy="14" r="3"></circle>
                </svg>
              </span>
              <span>Solace</span>
            </a>
            <p class="slc-tag">Your AI co-pilot for the work that matters: priorities, follow-ups and answers across every tool your team already uses.</p>
            <nav class="slc-social" aria-label="Social">
              <a href="#faqSection" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 10v6M8 7.5v.01M12 16v-3.5a2 2 0 0 1 4 0V16M12 10v6"></path></svg></a>
              <a href="#faqSection" aria-label="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"></path></svg></a>
              <a href="#faqSection" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><path d="M17 7v.01"></path></svg></a>
              <a href="#faqSection" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="4"></rect><path d="M10 9.5v5l4.5-2.5Z"></path></svg></a>
            </nav>
            <p class="slc-copy">© Solace 2026 · All rights reserved</p>
          </div>
          <div class="slc-links">
            <div><h3>Product</h3><ul><li><a href="#priorities">Overview</a></li><li><a href="#priorities">Copilot Chat</a></li><li><a href="#priorities">Priorities</a></li><li><a href="#telemetry">Integrations</a></li><li><a href="#faqSection">Pricing</a></li><li><a href="#telemetry">Security</a></li><li><a href="#faqSection">Changelog</a></li></ul></div>
            <div><h3>Resources</h3><ul><li><a href="#faqSection">Docs</a></li><li><a href="#faqSection">Guides</a></li><li><a href="#faqSection">API Reference</a></li><li><a href="#faqSection">Help Center</a></li><li><a href="#telemetry">Status</a></li></ul></div>
            <div><h3>Company</h3><ul><li><a href="#priorities">About</a></li><li><a href="#priorities">Customers</a></li><li><a href="#faqSection">Careers</a></li><li><a href="#faqSection">Contact</a></li><li><a href="#telemetry">Privacy</a></li><li><a href="#telemetry">Terms</a></li></ul></div>
          </div>
        </footer>
      </div>
    </section>
  </main>

  <script>
    document.documentElement.classList.add('js-ready');
    (function () {
      var htmlEl = document.documentElement;
      var motionBtn = document.getElementById('motionToggleBtn');
      var motionPaused = false;
      if (motionBtn) {
        motionBtn.addEventListener('click', function () {
          motionPaused = !motionPaused;
          htmlEl.setAttribute('data-motion', motionPaused ? 'paused' : 'on');
          motionBtn.setAttribute('aria-pressed', String(motionPaused));
          motionBtn.textContent = motionPaused ? 'Motion: PAUSED' : 'Motion: ON';
        });
      }

      /* Accordion: one answer open at a time */
      var qs = Array.prototype.slice.call(document.querySelectorAll('.slc-q'));
      function openFaqIndex(idx) {
        qs.forEach(function (o, i) {
          var btn = o.querySelector('button');
          if (i === idx) {
            o.setAttribute('data-open', '');
            if (btn) btn.setAttribute('aria-expanded', 'true');
          } else {
            o.removeAttribute('data-open');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          }
        });
      }
      qs.forEach(function (q) {
        var btn = q.querySelector('button');
        if (!btn) return;
        btn.addEventListener('click', function () {
          var isOpen = q.hasAttribute('data-open');
          qs.forEach(function (o) {
            o.removeAttribute('data-open');
            var b = o.querySelector('button');
            if (b) b.setAttribute('aria-expanded', 'false');
          });
          if (!isOpen) {
            q.setAttribute('data-open', '');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });

      /* Tool Filter in Triage Queue */
      var chips = Array.prototype.slice.call(document.querySelectorAll('.slc-chip'));
      var threads = Array.prototype.slice.call(document.querySelectorAll('.slc-thread'));
      function filterTool(tool) {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-tool') === tool)); });
        threads.forEach(function (th) {
          var match = tool === 'all' || th.getAttribute('data-item-tool') === tool;
          th.style.display = match ? 'flex' : 'none';
        });
      }
      chips.forEach(function (c) {
        c.addEventListener('click', function () { filterTool(c.getAttribute('data-tool') || 'all'); });
      });

      /* Preview / Interactive Cycler */
      var pulseBtn = document.getElementById('slcPulseBtn');
      var cycleStep = 0;
      var toolOrder = ['all', 'Linear', 'Slack', 'Figma'];
      var pulseBoost = 0;
      if (pulseBtn) {
        pulseBtn.addEventListener('click', function () {
          cycleStep = (cycleStep + 1) % 4;
          filterTool(toolOrder[cycleStep]);
          openFaqIndex(cycleStep % qs.length);
          pulseBoost = 1.0;
        });
      }

      /* Scroll Reveal */
      var reveals = document.querySelectorAll('.slc-reveal');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
          });
        }, { threshold: 0.14 });
        reveals.forEach(function (el) { io.observe(el); });
      } else {
        reveals.forEach(function (el) { el.classList.add('is-in'); });
      }

      /* Halftone Dot Audio-Meter Field (Verbatim Physics + Pulse Boost) */
      var cv = document.getElementById('dots');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 0, H = 0, dpr = 1, step = 18, cols = 0, rows = 0, seed = [];
      var mx = -9999, my = -9999, tmx = -9999, tmy = -9999;

      function hash(i, j) {
        var h = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
        return h - Math.floor(h);
      }
      function size() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = Math.max(320, cv.clientWidth || window.innerWidth);
        H = Math.max(540, cv.clientHeight || window.innerHeight);
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        step = Math.max(14, Math.min(W / 1600, H / 940) * 20.5);
        cols = Math.ceil(W / step) + 1;
        rows = Math.ceil(H / step) + 1;
        seed = [];
        for (var j = 0; j < rows; j++) {
          for (var i = 0; i < cols; i++) {
            seed.push([hash(i, j), hash(i + 71, j + 13), hash(i + 9, j + 97)]);
          }
        }
      }
      window.addEventListener('resize', size, { passive: true });
      size();

      window.addEventListener('pointermove', function (e) {
        var r = cv.getBoundingClientRect();
        tmx = e.clientX - r.left;
        tmy = e.clientY - r.top;
      }, { passive: true });
      document.addEventListener('pointerleave', function () { tmx = -9999; tmy = -9999; });

      var C0 = [226, 106, 24], C1 = [248, 150, 64], C2 = [255, 214, 170];
      function mix(a, b, t) {
        return [
          Math.round(a[0] + (b[0] - a[0]) * t),
          Math.round(a[1] + (b[1] - a[1]) * t),
          Math.round(a[2] + (b[2] - a[2]) * t)
        ];
      }

      function draw(t) {
        ctx.clearRect(0, 0, W, H);
        mx += (tmx - mx) * 0.12;
        my += (tmy - my) * 0.12;
        pulseBoost *= 0.94;
        var top = H * 0.1, full = H * 0.36, R = step * 0.37;
        for (var j = 0; j < rows; j++) {
          var y = j * step + step * 0.5;
          if (y < top - step * 2) continue;
          var v = Math.min(1, Math.max(0, (y - top) / (full - top)));
          var col = v < 0.55
            ? mix(C0, C1, v / 0.55)
            : mix(C1, C2, ((v - 0.55) / 0.45) * 0.85 + Math.max(0, (y - H * 0.9) / (H * 0.1)) * 0.15);
          ctx.fillStyle = 'rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')';
          for (var i = 0; i < cols; i++) {
            var x = i * step + step * 0.5;
            var sRow = seed[j * cols + i];
            var a = sRow[0], b = sRow[1], c = sRow[2];
            var wave = motionPaused
              ? 0.7
              : 0.5 + 0.5 * Math.sin(t * (1.6 + b * 2.6) + a * 6.283 + Math.sin(t * 0.7 + i * 0.21 + j * 0.13) * 1.4);
            var keep = Math.min(1, v * 1.6 + 0.12) - a * 0.6;
            if (keep <= 0 && c > 0.08) continue;
            var s = (0.42 + 0.58 * Math.pow(wave, 1.3)) * Math.min(1, 0.5 + v * 0.6) * (keep > 0 ? 1 : 0.8);
            var dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
            var hov = Math.exp(-d2 / (step * step * 22));
            s = Math.min(1.05, s + hov * 0.7 + pulseBoost * 0.22);
            var r = R * s;
            if (r < 0.6) continue;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 6.2832);
            ctx.fill();
          }
        }
      }
      function loop(ms) {
        draw(ms / 1000);
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    })();
  </script>
</body>
</html>`;
  }

  return null;
}
