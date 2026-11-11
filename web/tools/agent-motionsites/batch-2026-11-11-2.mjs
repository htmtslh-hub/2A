/**
 * Batch 2026-11-11 (Part 2 of 3):
 *   3. venture-fund (t322, premium) — Hale Moor — Frontier Venture Fund
 *   4. pixel-garden (t323, free)    — Dune Play · Grovekit
 */

export function buildBatch20261111Part2(slug) {
  if (slug === 'venture-fund') {
    return `<!DOCTYPE html>
<html lang="en" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Hale Moor — Build the world worth waking to</title>
  <meta name="description" content="At Hale Moor, we back only two kinds of technology: the kind that carries us toward the future worth having, and the kind that guards us from the one we fear.">
  <meta name="theme-color" content="#e7c0dc">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400&family=Geist+Mono:wght@300..600&display=swap" rel="stylesheet">
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js"
      }
    }
  </script>
  <style>
    :root {
      --u: max(calc(100svw / 1440), calc(100svh / 900));
      --n: clamp(0.8px, calc(100svw / 1440), 1.3px);
      --w: calc(100svw / 1440);
      --bg: #e7c0dc;
      --ink: #2d2934;
      --mark: #15121b;
      --muted: rgba(45, 41, 52, 0.68);
      --tab: #ead2f0;
      --chip: #f4c6da;
      --chip-border: #e9a9c4;
      --accent: #6d4cd6;
      --accent-text: #2a2858;
      --accent-2: #e57a8c;
      --on-accent: #ffffff;
      --font-sans: "Instrument Sans", -apple-system, BlinkMacSystemFont, sans-serif;
      --font-display: "Instrument Sans", -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, monospace;
      --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);
    }
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    ::selection { background: rgba(109, 76, 214, 0.22); color: var(--mark); }
    :focus-visible { outline: 2px solid var(--mark); outline-offset: 3px; }
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
      font: inherit; color: inherit; background: none; border: 0; cursor: pointer;
      transition: transform 0.22s var(--ease-out), background-color 0.25s var(--ease-out), color 0.25s var(--ease-out), opacity 0.25s var(--ease-out);
    }
    button:active { transform: scale(0.97); }
    .hmr-mono {
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.02em;
      font-size: clamp(11px, calc(12.5 * var(--w)), 14px);
      font-weight: 400;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 200;
      padding: 10px 16px; background: var(--mark); color: #ffffff;
      font-size: 12px; font-family: var(--font-mono);
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translateY(116px); }

    /* Fixed Pastel Stage & Live 3D Particle/Crystal Canvas */
    .hmr-stage {
      position: fixed;
      inset: 0;
      overflow: hidden;
      z-index: 0;
      pointer-events: none;
    }
    .hmr-frame {
      position: absolute;
      width: calc(1440 * var(--u));
      height: calc(900 * var(--u));
      left: 50%; top: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(180deg, #d3c6ef 0%, #d8c6eb 11%, #dcc3e5 33%, #e8c0dc 44%, #eebcd5 56%, #f1b7cc 67%, #f5b1c3 78%, #f6abbc 89%, #f7a6b3 100%);
    }
    .hmr-glow {
      position: absolute;
      width: calc(1500 * var(--u));
      height: calc(1500 * var(--u));
      left: calc(720 * var(--u) - 750 * var(--u));
      top: calc(890 * var(--u) - 750 * var(--u));
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,246,252,0.22) 25%, rgba(255,244,250,0.14) 34%, rgba(255,240,248,0.05) 46%, rgba(255,240,248,0) 58%);
    }
    .hmr-bg { position: absolute; inset: 0; opacity: 0; }
    .hmr-bg-manifesto { background: linear-gradient(160deg, #f3c9dc 0%, #f6b6c6 45%, #f59bab 100%); }
    .hmr-bg-focus {
      background:
        radial-gradient(32% 46% at 68% 48%, rgba(255,240,253,0.95) 0%, rgba(250,230,252,0.7) 34%, rgba(232,220,252,0) 100%),
        linear-gradient(180deg, #a993f5 0%, #ae9ff7 16%, #b4b2fa 30%, #bcd0fa 46%, #b6e6f6 62%, #a8ecf3 78%, #a4ecee 100%);
    }
    .hmr-bg-team {
      background:
        radial-gradient(60% 70% at 85% 0%, rgba(250,150,230,0.55) 0%, rgba(250,150,230,0) 70%),
        linear-gradient(180deg, #e6c6f2 0%, #efc8ef 50%, #e4b8f1 100%);
    }
    .hmr-scene { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }

    /* Fixed Nav */
    .hmr-nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 30;
      display: flex; align-items: flex-start; justify-content: space-between;
      padding: calc(28 * var(--n)) calc(24 * var(--n));
      pointer-events: none;
    }
    .hmr-nav > * { pointer-events: auto; }
    .hmr-wordmark {
      font-weight: 700;
      font-size: calc(26.1 * var(--n));
      line-height: calc(25 * var(--n));
      letter-spacing: -0.023em;
      color: var(--mark);
    }
    .hmr-wordmark span { display: block; }
    .hmr-nav-right {
      display: flex; align-items: center; gap: 8px;
    }
    .hmr-pill-ctrl {
      height: calc(47 * var(--n));
      padding: 0 14px;
      background: rgba(255, 255, 255, 0.86);
      color: var(--mark);
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .hmr-pill-ctrl:hover { background: #ffffff; }
    .hmr-menu {
      width: calc(47 * var(--n));
      height: calc(47 * var(--n));
      background: #ffffff;
      display: grid; place-items: center;
      transition: transform 0.3s var(--ease-out);
    }
    .hmr-menu:hover { transform: scale(1.06); }
    .hmr-menu svg { width: calc(17 * var(--n)); height: calc(13 * var(--n)); }

    /* Slide-down Quick Drawer */
    .hmr-drawer {
      position: fixed; top: calc(84 * var(--n)); right: calc(24 * var(--n)); z-index: 35;
      background: rgba(255, 255, 255, 0.96);
      padding: 18px 22px;
      border: 1px solid rgba(21, 18, 27, 0.12);
      display: grid; gap: 10px;
      opacity: 0; pointer-events: none; transform: translateY(-8px);
      transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
    }
    .hmr-drawer.is-open { opacity: 1; pointer-events: auto; transform: translateY(0); }
    .hmr-drawer a { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; padding: 4px 0; }
    .hmr-drawer a:hover { color: var(--accent); }

    /* Main Content */
    main { position: relative; z-index: 2; }

    /* 5.1 Hero */
    .hmr-hero {
      position: relative;
      height: 100vh;
      height: 100svh;
      pointer-events: none;
    }
    .hmr-headline {
      position: absolute;
      left: 50%;
      top: calc((100svh - 900 * var(--u)) / 2 + 177 * var(--u));
      transform: translateX(calc(-50% + 4.5 * var(--u)));
      font-weight: 400;
      font-size: clamp(32px, calc(52 * var(--u)), 68px);
      line-height: 1.1;
      letter-spacing: -0.005em;
      color: var(--ink);
      white-space: nowrap;
      animation: hmrHeroIn 1s 0.15s var(--ease-out) both;
    }
    @keyframes hmrHeroIn {
      from { opacity: 0; transform: translate(calc(-50% + 4.5 * var(--u)), 18px); }
      to { opacity: 1; transform: translate(calc(-50% + 4.5 * var(--u)), 0); }
    }

    /* 5.2 Manifesto */
    .hmr-manifesto {
      position: relative;
      min-height: 125vh;
      padding: 10vh 0;
    }
    .hmr-manifesto-copy {
      position: sticky;
      top: calc(50vh - 150 * var(--w));
      margin-left: calc(840 * var(--w));
      width: calc(490 * var(--w));
      font-size: clamp(19px, calc(25 * var(--w)), 28px);
      line-height: 1.26;
      letter-spacing: -0.005em;
    }
    .hmr-manifesto-copy p + p { margin-top: 1.05em; }
    .hmr-textlink {
      display: inline-block;
      margin-top: calc(30 * var(--w));
      position: relative;
      padding-bottom: 3px;
    }
    .hmr-textlink::after {
      content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px;
      background: currentColor; transform: scaleX(0.35); transform-origin: 0 50%;
      transition: transform 0.4s var(--ease-out);
    }
    .hmr-textlink:hover::after { transform: scaleX(1); }

    /* 5.3 Track Record */
    .hmr-track {
      padding: 16vh 0 20vh;
    }
    .hmr-track-head {
      margin: 0 calc(92 * var(--w)) calc(30 * var(--w)) calc(244 * var(--w));
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
    }
    .hmr-filters { display: flex; gap: 8px; flex-wrap: wrap; }
    .hmr-fbtn {
      padding: 6px 11px;
      font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
      background: rgba(255, 255, 255, 0.55);
      border: 1px solid rgba(45, 41, 52, 0.18);
    }
    .hmr-fbtn[aria-pressed="true"] {
      background: var(--mark); color: #ffffff; border-color: var(--mark);
    }

    .hmr-grid {
      display: grid;
      grid-template-columns: repeat(4, calc(226 * var(--w)));
      column-gap: calc(24 * var(--w));
      margin-left: calc(244 * var(--w));
      align-items: start;
    }
    .hmr-col { display: flex; flex-direction: column; gap: calc(22 * var(--w)); }
    .hmr-col:nth-of-type(2) { margin-top: calc(-46 * var(--w)); }
    .hmr-col:nth-of-type(3) { margin-top: calc(16 * var(--w)); }
    .hmr-col:nth-of-type(4) { margin-top: calc(-70 * var(--w)); }

    .hmr-card {
      position: relative;
      display: flex; align-items: center; justify-content: center;
      background: #ffffff;
      height: calc(165 * var(--w));
      min-height: 132px;
      border-radius: 0;
      transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out), opacity 0.35s var(--ease-out);
    }
    .hmr-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 40px rgba(120, 60, 120, 0.18);
    }
    .hmr-card.dim { background: rgba(255, 255, 255, 0.48); }
    .hmr-card.is-filtered-out { opacity: 0.2; }
    .hmr-tab {
      position: absolute; top: 0; right: 0;
      height: 20px; padding: 0 8px;
      display: inline-flex; align-items: center;
      background: var(--tab);
      font-family: var(--font-mono); font-size: 10px; text-transform: uppercase;
    }
    .hmr-logo {
      display: flex; align-items: center; gap: 9px;
      transition: opacity 0.35s var(--ease-out), transform 0.35s var(--ease-out);
    }
    .hmr-logo svg { width: 24px; height: 24px; flex: none; }
    .hmr-note {
      position: absolute; left: 16px; right: 16px; top: 38px;
      font-size: 13.5px; line-height: 1.28;
      opacity: 0; transform: translateY(8px);
      transition: opacity 0.35s var(--ease-out), transform 0.35s var(--ease-out);
    }
    .hmr-visit {
      position: absolute; right: 10px; bottom: 10px;
      font-family: var(--font-mono); font-size: 10px; text-transform: uppercase;
      opacity: 0; transform: translateY(6px);
      transition: opacity 0.35s var(--ease-out), transform 0.35s var(--ease-out);
    }
    .hmr-card:hover .hmr-logo { opacity: 0; transform: scale(0.96); }
    .hmr-card:hover .hmr-note, .hmr-card:hover .hmr-visit { opacity: 1; transform: translateY(0); }

    .hmr-chips {
      position: absolute; left: 8px; bottom: 8px;
      display: flex; gap: 4px; flex-wrap: wrap;
    }
    .hmr-chip {
      font-family: var(--font-mono); font-size: 9px; text-transform: uppercase;
      padding: 3px 6px; border: 1px solid rgba(45, 41, 52, 0.22);
    }
    .hmr-chip.exit { background: var(--chip); border-color: var(--chip-border); }

    .w-a { font-weight: 700; font-size: 14px; letter-spacing: 0.14em; text-transform: uppercase; }
    .w-b { font-weight: 500; font-size: 22px; letter-spacing: -0.03em; text-transform: lowercase; }
    .w-c { font-weight: 400; font-style: italic; font-size: 18px; letter-spacing: -0.02em; }
    .w-d { font-weight: 600; font-size: 16px; letter-spacing: 0.02em; text-transform: uppercase; }
    .w-e { font-family: var(--font-mono); font-weight: 500; font-size: 14px; letter-spacing: 0.06em; }

    .hmr-closing {
      margin: 16vh 0 0 calc(244 * var(--w));
      max-width: calc(780 * var(--w));
    }
    .hmr-closing h2 {
      font-weight: 400;
      font-size: clamp(32px, calc(58 * var(--w)), 64px);
      line-height: 1.04;
      letter-spacing: -0.02em;
    }
    .hmr-cta-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: #ffffff; color: var(--ink);
      padding: 14px 20px; margin-top: 28px;
      transition: background-color 0.25s var(--ease-out), color 0.25s var(--ease-out), transform 0.2s var(--ease-out);
    }
    .hmr-cta-btn:hover { background: var(--ink); color: #ffffff; }

    /* 5.4 Focus Area (Crystal) */
    .hmr-focus {
      position: relative;
      height: 150vh;
    }
    .hmr-focus-copy {
      position: sticky;
      top: calc(50vh - 220 * var(--w));
      margin-left: calc(104 * var(--w));
      width: calc(466 * var(--w));
      color: var(--accent-text);
    }
    .hmr-focus-lbl {
      display: block;
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: 0.13em;
      color: #33316a;
      margin-bottom: 15px;
      text-transform: uppercase;
    }
    .hmr-focus-p {
      font-size: clamp(20px, calc(27.6 * var(--w)), 31px);
      line-height: 1.18;
      letter-spacing: -0.008em;
    }

    /* Fixed Focus Pager */
    .hmr-pager {
      position: fixed;
      left: calc(22 * var(--n));
      bottom: calc(12 * var(--n));
      z-index: 25;
      display: flex;
      border: 1px solid rgba(40, 36, 83, 0.45);
      color: #282453;
      background: rgba(255, 255, 255, 0.36);
      backdrop-filter: blur(8px);
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      transition: opacity 0.45s var(--ease-out), transform 0.45s var(--ease-out);
    }
    .hmr-pager.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
    .hmr-pager-cnt {
      padding: 8px 12px;
      display: flex; align-items: baseline; gap: 6px;
    }
    .hmr-pager-num { font-size: 32px; font-weight: 300; letter-spacing: -0.02em; }
    .hmr-pager-tot { font-size: 11px; text-transform: none; }
    .hmr-pager-arrows {
      width: 32px; border-left: 1px solid rgba(40, 36, 83, 0.35);
      display: grid; grid-template-rows: 1fr 1fr;
    }
    .hmr-pager-arrows button { display: grid; place-items: center; }
    .hmr-pager-arrows button + button { border-top: 1px solid rgba(40, 36, 83, 0.35); }

    /* 5.5 Who We Are (Sticky Names Wheel) */
    .hmr-team { position: relative; height: 260vh; }
    .hmr-pin {
      position: sticky; top: 0; height: 100vh; overflow: hidden;
    }
    .hmr-team-intro {
      position: absolute;
      left: calc(92 * var(--w));
      top: calc(50vh - 110 * var(--w));
      width: calc(440 * var(--w));
      transition: opacity 0.3s var(--ease-out);
    }
    .hmr-team-intro p {
      font-size: clamp(19px, calc(24.5 * var(--w)), 27px);
      line-height: 1.24;
      margin-top: 10px;
    }
    .hmr-wheel { position: absolute; inset: 0; pointer-events: none; }
    .hmr-person {
      position: absolute; left: 0; top: 0;
      display: inline-flex; align-items: center; gap: 14px;
      font-size: clamp(24px, calc(44 * var(--w)), 48px);
      letter-spacing: -0.02em;
      white-space: nowrap;
      transform-origin: 0 50%;
    }
    .hmr-dot { width: 12px; height: 12px; border-radius: 50%; flex: none; }
    .hmr-rule {
      position: absolute; height: 1px; background: rgba(45, 41, 52, 0.65);
    }
    .hmr-role {
      position: absolute; right: 0; bottom: 8px;
      font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
    }

    /* 5.6 Footer */
    .hmr-foot {
      position: relative; z-index: 4;
      padding: 14vh calc(92 * var(--w)) 48px;
      display: flex; align-items: flex-end; justify-content: space-between; gap: 28px; flex-wrap: wrap;
    }
    .hmr-foot-cta {
      font-weight: 400;
      font-size: clamp(32px, calc(56 * var(--w)), 62px);
      line-height: 1.04;
      letter-spacing: -0.02em;
      max-width: calc(700 * var(--w));
    }
    .hmr-foot-meta {
      display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
    }

    .js-ready .hmr-reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.85s var(--ease-out), transform 0.85s var(--ease-out);
    }
    .js-ready .hmr-reveal.in { opacity: 1; transform: translateY(0); }

    @media (max-width: 960px) {
      .hmr-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin: 0 20px;
        gap: 14px;
      }
      .hmr-col:nth-of-type(2), .hmr-col:nth-of-type(3), .hmr-col:nth-of-type(4) { margin-top: 0; }
      .hmr-track-head, .hmr-closing { margin-left: 20px; margin-right: 20px; max-width: none; }
    }
    @media (max-width: 820px) {
      :root { --n: 0.88px; }
      .hmr-glow, .hmr-rule, .hmr-d-br { display: none; }
      .hmr-headline {
        top: 118px;
        transform: translateX(-50%);
        width: calc(100% - 32px);
        white-space: normal;
        text-align: center;
        font-size: clamp(34px, 10vw, 46px);
      }
      .hmr-manifesto-copy {
        top: 34vh; margin: 0 20px; width: auto; font-size: 21px;
      }
      .hmr-focus-copy {
        top: 40vh; margin: 0 20px; width: auto;
      }
      .hmr-team-intro { left: 20px; right: 20px; width: auto; top: 24vh; }
      .hmr-foot { flex-direction: column; align-items: flex-start; padding: 10vh 20px 32px; }
      .hmr-foot-cta { max-width: none; font-size: 34px; }
      .hmr-foot-meta { align-items: flex-start; }
    }
    @media (max-width: 480px) {
      .hmr-grid { grid-template-columns: 1fr; }
      .hmr-pill-ctrl span { display: none; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#mainContent">Skip to main content</a>

  <svg width="0" height="0" viewBox="0 0 24 24" style="position:absolute;pointer-events:none" aria-hidden="true">
    <defs>
      <symbol id="g1" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.4"></circle></symbol>
      <symbol id="g2" viewBox="0 0 24 24"><polygon points="12,2 20.6,7 20.6,17 12,22 3.4,17 3.4,7" fill="currentColor"></polygon><circle cx="12" cy="12" r="3.2" fill="#ffffff"></circle></symbol>
      <symbol id="g3" viewBox="0 0 24 24"><polygon points="12,3 21,19 3,19" fill="none" stroke="currentColor" stroke-width="2"></polygon><polygon points="12,10 16,17 8,17" fill="currentColor"></polygon></symbol>
      <symbol id="g4" viewBox="0 0 24 24"><circle cx="9.5" cy="12" r="6.5" fill="currentColor"></circle><circle cx="14.5" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="2"></circle></symbol>
      <symbol id="g5" viewBox="0 0 24 24"><polygon points="12,2.5 21.5,12 12,21.5 2.5,12" fill="currentColor"></polygon></symbol>
      <symbol id="g6" viewBox="0 0 24 24"><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="3" x2="12" y2="21"></line><line x1="4.2" y1="7.5" x2="19.8" y2="16.5"></line><line x1="19.8" y1="7.5" x2="4.2" y2="16.5"></line></g></symbol>
      <symbol id="g7" viewBox="0 0 24 24"><path d="M2 9c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5 0M2 15c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></symbol>
      <symbol id="g8" viewBox="0 0 24 24"><path d="M4 14a8 8 0 0 1 16 0Z" fill="currentColor"></path><rect x="4" y="16.5" width="16" height="3" fill="currentColor"></rect></symbol>
    </defs>
  </svg>

  <div class="hmr-stage" aria-hidden="true">
    <div class="hmr-frame">
      <div class="hmr-glow" id="hmrGlow"></div>
    </div>
    <div class="hmr-bg hmr-bg-manifesto" id="bgManifesto"></div>
    <div class="hmr-bg hmr-bg-focus" id="bgFocus"></div>
    <div class="hmr-bg hmr-bg-team" id="bgTeam"></div>
    <canvas class="hmr-scene" id="hmrCanvas"></canvas>
  </div>

  <header class="hmr-nav">
    <a class="hmr-wordmark" href="#mainContent" aria-label="Hale Moor home">
      <span>HALE</span>
      <span>MOOR</span>
    </a>
    <div class="hmr-nav-right">
      <button type="button" class="hmr-pill-ctrl" id="hmrStageJumpBtn" data-next-preview="true" aria-label="Cycle portfolio filter and crystal focus">
        <span>Thesis · Exits</span>
      </button>
      <button type="button" class="hmr-pill-ctrl" id="motionToggleBtn" aria-pressed="false">Motion: ON</button>
      <button type="button" class="hmr-menu" id="hmrMenuBtn" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 18 14" fill="none" stroke="#15121b" stroke-width="1.6" stroke-linecap="square" aria-hidden="true">
          <line x1="1" y1="2" x2="17" y2="2"></line>
          <line x1="5" y1="7" x2="17" y2="7"></line>
          <line x1="1" y1="12" x2="11" y2="12"></line>
          <line x1="15" y1="12" x2="17" y2="12"></line>
        </svg>
      </button>
    </div>
  </header>

  <nav class="hmr-drawer" id="hmrDrawer" aria-label="Section navigation">
    <a href="#manifesto">01 Manifesto</a>
    <a href="#track">02 Selected Track Record</a>
    <a href="#focus">03 Signal &amp; Systems</a>
    <a href="#team">04 Who We Are</a>
  </nav>

  <nav class="hmr-pager hmr-mono tabular-nums" id="hmrPager" aria-label="Focus areas">
    <div class="hmr-pager-cnt">
      <span class="hmr-pager-num">01</span>
      <span class="hmr-pager-tot" id="hmrPagerTot">/ 01</span>
    </div>
    <div class="hmr-pager-arrows">
      <button type="button" id="hmrPrevFocus" aria-label="Previous focus section">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M5 11V1M1.5 4.5 5 1l3.5 3.5"></path></svg>
      </button>
      <button type="button" id="hmrNextFocus" aria-label="Next focus section">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M5 1v10M1.5 7.5 5 11l3.5-3.5"></path></svg>
      </button>
    </div>
  </nav>

  <main id="mainContent">
    <section class="hmr-hero" aria-label="Hale Moor Hero">
      <h1 class="hmr-headline">Build the world worth waking to</h1>
    </section>

    <section class="hmr-manifesto" id="manifesto" aria-label="Manifesto">
      <div class="hmr-manifesto-copy hmr-reveal">
        <p>Everything feels within reach, and nothing feels steady. The range of possible futures has never been wider, and the room for error has never been thinner.</p>
        <p>At Hale Moor, we back only two kinds of technology: the kind that carries us toward the future worth having, and the kind that guards us from the one we fear.</p>
        <a class="hmr-textlink hmr-mono" href="#track">Read the manifesto</a>
      </div>
    </section>

    <section class="hmr-track" id="track" aria-labelledby="hmrTrackHeading">
      <div class="hmr-track-head">
        <span class="hmr-mono" id="hmrTrackHeading">SELECTED TRACK RECORD</span>
        <div class="hmr-filters tabular-nums" role="group" aria-label="Filter portfolio companies">
          <button type="button" class="hmr-fbtn" data-filter="all" aria-pressed="true">All (15)</button>
          <button type="button" class="hmr-fbtn" data-filter="exit" aria-pressed="false">Exits (5)</button>
          <button type="button" class="hmr-fbtn" data-filter="prior" aria-pressed="false">Prior Work (5)</button>
        </div>
      </div>

      <div class="hmr-grid">
        <div class="hmr-col">
          <article class="hmr-card hmr-reveal" data-tags="seed">
            <span class="hmr-tab">Kestrion</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g3"></use></svg><span class="w-a">KESTRION</span></div>
            <p class="hmr-note">Backed at pre-seed. Now flying autonomous survey fleets.</p>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="exit">
            <span class="hmr-tab">Mirefold</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g4"></use></svg><span class="w-b">mirefold</span></div>
            <p class="hmr-note">Backed at inception. Open storage network, live worldwide.</p>
            <div class="hmr-chips"><span class="hmr-chip exit">EXIT</span></div>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="seed">
            <span class="hmr-tab">Ondine Labs</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g7"></use></svg><span class="w-c">Ondine Labs</span></div>
            <p class="hmr-note">Backed at seed. Building compact fusion test cells.</p>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card dim hmr-reveal" data-tags="prior">
            <span class="hmr-tab">Velloria</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g1"></use></svg><span class="w-d">VELLORIA</span></div>
            <p class="hmr-note">Sensing systems that see through weather.</p>
            <div class="hmr-chips"><span class="hmr-chip">PRIOR WORK</span></div>
            <span class="hmr-visit">Visit site →</span>
          </article>
        </div>

        <div class="hmr-col">
          <article class="hmr-card hmr-reveal" data-tags="seed">
            <span class="hmr-tab">Thornquist</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g6"></use></svg><span class="w-e">THORNQUIST</span></div>
            <p class="hmr-note">Backed at seed. Programmable chemistry, made in a box.</p>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="exit prior">
            <span class="hmr-tab">Lattice Nine</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g2"></use></svg><span class="w-a">LATTICE NINE</span></div>
            <p class="hmr-note">Partners invested early from prior funds.</p>
            <div class="hmr-chips"><span class="hmr-chip exit">EXIT</span><span class="hmr-chip">PRIOR WORK</span></div>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="exit">
            <span class="hmr-tab">Brindle</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g8"></use></svg><span class="w-b">brindle</span></div>
            <p class="hmr-note">Acquired. Games played by millions every day.</p>
            <div class="hmr-chips"><span class="hmr-chip exit">EXIT</span></div>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="prior">
            <span class="hmr-tab">Quillon</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g5"></use></svg><span class="w-c">Quillon</span></div>
            <p class="hmr-note">Cooling for the hottest chips in the data centre.</p>
            <div class="hmr-chips"><span class="hmr-chip">PRIOR WORK</span></div>
            <span class="hmr-visit">Visit site →</span>
          </article>
        </div>

        <div class="hmr-col">
          <article class="hmr-card hmr-reveal" data-tags="seed">
            <span class="hmr-tab">Pellucid</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g1"></use></svg><span class="w-b">pellucid</span></div>
            <p class="hmr-note">Backed at seed, alongside close friends.</p>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="exit">
            <span class="hmr-tab">Orrery</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g4"></use></svg><span class="w-d">ORRERY</span></div>
            <p class="hmr-note">Backed at seed. Wallets that disappear into the app.</p>
            <div class="hmr-chips"><span class="hmr-chip exit">EXIT</span></div>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="seed">
            <span class="hmr-tab">Saltmarsh</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g7"></use></svg><span class="w-e">SALTMARSH</span></div>
            <p class="hmr-note">Resilient links for machines far from home.</p>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card dim hmr-reveal" data-tags="seed">
            <span class="hmr-tab">Wexley Bio</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g3"></use></svg><span class="w-c">Wexley Bio</span></div>
            <p class="hmr-note">Medicines that slow the ageing brain.</p>
            <span class="hmr-visit">Visit site →</span>
          </article>
        </div>

        <div class="hmr-col">
          <article class="hmr-card hmr-reveal" data-tags="exit prior">
            <span class="hmr-tab">Corvane</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g2"></use></svg><span class="w-d">CORVANE</span></div>
            <p class="hmr-note">Quantum hardware, from lab bench to public markets.</p>
            <div class="hmr-chips"><span class="hmr-chip exit">EXIT</span><span class="hmr-chip">PRIOR WORK</span></div>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="seed">
            <span class="hmr-tab">Fennix</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g6"></use></svg><span class="w-b">fennix</span></div>
            <p class="hmr-note">Insurance that prices risk at the speed of compute.</p>
            <span class="hmr-visit">Visit site →</span>
          </article>
          <article class="hmr-card hmr-reveal" data-tags="prior">
            <span class="hmr-tab">Hollis &amp; Vane</span>
            <div class="hmr-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#g8"></use></svg><span class="w-c">Hollis &amp; Vane</span></div>
            <p class="hmr-note">Co-led the seed. Tools for thinking, not scrolling.</p>
            <div class="hmr-chips"><span class="hmr-chip">PRIOR WORK</span></div>
            <span class="hmr-visit">Visit site →</span>
          </article>
        </div>
      </div>

      <div class="hmr-closing hmr-reveal">
        <h2>Unlikely bets for an age of outliers.</h2>
        <a class="hmr-cta-btn hmr-mono" href="#focus">View the full portfolio →</a>
      </div>
    </section>

    <section class="hmr-focus" id="focus" data-focus="1" aria-label="Signal and Systems">
      <div class="hmr-focus-copy hmr-reveal">
        <span class="hmr-focus-lbl">SIGNAL &amp; SYSTEMS</span>
        <p class="hmr-focus-p">We back the quiet machinery of<br class="hmr-d-br"> the next century: compute, networks and models that keep a fragile world steady, deep beneath the surface where few will ever look.</p>
      </div>
    </section>

    <section class="hmr-team" id="team" aria-label="Who we are">
      <div class="hmr-pin">
        <div class="hmr-team-intro" id="hmrTeamIntro">
          <span class="hmr-mono">WHO WE ARE</span>
          <p>We are a small partnership of equals across two continents, founded in 2017. We back founders from pre-seed to Series A, as a lead or co-lead investor.</p>
        </div>
        <div class="hmr-wheel" id="hmrWheel" aria-label="Team"></div>
        <div class="hmr-rule" id="hmrRule"><span class="hmr-role" id="hmrRole">Partner</span></div>
      </div>
    </section>
  </main>

  <footer class="hmr-foot">
    <p class="hmr-foot-cta hmr-reveal">Write to us while it still sounds impossible.</p>
    <div class="hmr-foot-meta">
      <button type="button" class="hmr-mono" id="hmrBackTopBtn">Back to top ↑</button>
      <span class="hmr-mono">© 2026 Hale Moor</span>
    </div>
  </footer>

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

      /* Menu Drawer */
      var menuBtn = document.getElementById('hmrMenuBtn');
      var drawer = document.getElementById('hmrDrawer');
      if (menuBtn && drawer) {
        menuBtn.addEventListener('click', function () {
          var open = drawer.classList.toggle('is-open');
          menuBtn.setAttribute('aria-expanded', String(open));
        });
      }

      /* Back to top */
      var backTopBtn = document.getElementById('hmrBackTopBtn');
      if (backTopBtn) {
        backTopBtn.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: motionPaused ? 'auto' : 'smooth' });
        });
      }

      /* Portfolio Filter + Preview Stage Button */
      var fbtns = Array.prototype.slice.call(document.querySelectorAll('.hmr-fbtn'));
      var cards = Array.prototype.slice.call(document.querySelectorAll('.hmr-card'));
      function applyFilter(tag) {
        fbtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === tag)); });
        cards.forEach(function (c) {
          var tags = (c.getAttribute('data-tags') || '');
          var ok = tag === 'all' || tags.indexOf(tag) >= 0;
          c.classList.toggle('is-filtered-out', !ok);
        });
      }
      fbtns.forEach(function (b) {
        b.addEventListener('click', function () { applyFilter(b.getAttribute('data-filter') || 'all'); });
      });

      var jumpBtn = document.getElementById('hmrStageJumpBtn');
      var jumpStep = 0;
      var pulseSpin = 0;
      if (jumpBtn) {
        jumpBtn.addEventListener('click', function () {
          jumpStep = (jumpStep + 1) % 3;
          var tags = ['all', 'exit', 'prior'];
          applyFilter(tags[jumpStep]);
          pulseSpin += 0.85;
        });
      }

      /* IntersectionObserver Reveals */
      var reveals = document.querySelectorAll('.hmr-reveal');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
          });
        }, { threshold: 0.12 });
        reveals.forEach(function (el, idx) {
          el.style.transitionDelay = ((idx % 4) * 65) + 'ms';
          io.observe(el);
        });
      } else {
        reveals.forEach(function (el) { el.classList.add('in'); });
      }

      /* Build 12-Partner Names Wheel */
      var PEOPLE = [
        ['Ada Lindqvist', 'Partner', '#7fcbe6'],
        ['Tomas Reyes', 'Partner', '#f0a35e'],
        ['Noor Haddad', 'Partner', '#7fc28f'],
        ['Felix Okafor', 'Partner', '#e57a8c'],
        ['Ines Marlowe', 'Venture partner', '#b49be8'],
        ['Jun Takeda', 'Principal', '#e9bf3f'],
        ['Priya Raman', 'Principal', '#6fa8f0'],
        ['Oskar Brandt', 'Investor', '#e48fd0'],
        ['Lena Fischer', 'Investor', '#86c9a8'],
        ['Mateo Duarte', 'Operations', '#f08a6b'],
        ['Saoirse Kane', 'Operations', '#8aa0f0'],
        ['Ravi Menon', 'Operations', '#c99ae8']
      ];
      var wheelEl = document.getElementById('hmrWheel');
      var roleEl = document.getElementById('hmrRole');
      var ruleEl = document.getElementById('hmrRule');
      var introEl = document.getElementById('hmrTeamIntro');
      var personEls = PEOPLE.map(function (p) {
        var d = document.createElement('div');
        d.className = 'hmr-person';
        d.innerHTML = '<span class="hmr-dot" style="background:' + p[2] + '"></span><span>' + p[0] + '</span>';
        if (wheelEl) wheelEl.appendChild(d);
        return d;
      });

      /* Live Iridescent Particle Sphere + 80-Facet Geodesic Crystal Engine */
      var cv = document.getElementById('hmrCanvas');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var bgMan = document.getElementById('bgManifesto');
      var bgFoc = document.getElementById('bgFocus');
      var bgTeam = document.getElementById('bgTeam');
      var glowEl = document.getElementById('hmrGlow');
      var pagerEl = document.getElementById('hmrPager');

      var secMan = document.getElementById('manifesto');
      var secTrk = document.getElementById('track');
      var secFoc = document.getElementById('focus');
      var secTeam = document.getElementById('team');

      var W = 0, H = 0, dpr = 1;
      var bounds = { mTop: 900, trTop: 2000, trBot: 3400, foTop: 3500, foBot: 4900, teTop: 5000, teBot: 7400 };
      function measure() {
        W = Math.max(320, window.innerWidth);
        H = Math.max(520, window.innerHeight);
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
        var sy = window.scrollY || 0;
        if (secMan) bounds.mTop = secMan.getBoundingClientRect().top + sy;
        if (secTrk) {
          var tr = secTrk.getBoundingClientRect();
          bounds.trTop = tr.top + sy;
          bounds.trBot = tr.bottom + sy;
        }
        if (secFoc) {
          var fo = secFoc.getBoundingClientRect();
          bounds.foTop = fo.top + sy;
          bounds.foBot = fo.bottom + sy;
        }
        if (secTeam) {
          var te = secTeam.getBoundingClientRect();
          bounds.teTop = te.top + sy;
          bounds.teBot = te.bottom + sy;
        }
      }
      measure();
      window.addEventListener('resize', measure, { passive: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

      /* Precompute 2,400 iridescent 3D sphere particles + rim spray */
      var PTS = [];
      for (var i = 0; i < 2400; i++) {
        var u = Math.random() * 2 - 1;
        var th = Math.random() * Math.PI * 2;
        var sq = Math.sqrt(1 - u * u);
        var isRim = i >= 1950;
        var rad = isRim ? (1.0 + Math.random() * 0.16) : (0.52 + 0.47 * Math.pow(Math.random(), 0.45));
        var ox = sq * Math.cos(th) * rad;
        var oy = u * rad;
        var oz = sq * Math.sin(th) * rad;
        /* Pastel iridescent tint: lower-left teal, right pink, core violet/lilac, 8% white sparkle */
        var spark = Math.random() > 0.92;
        var rC = 158, gC = 112, bC = 235;
        if (-ox * 0.8 - oy * 0.25 > 0.22) { rC = 108; gC = 219; bC = 214; }
        else if (ox > 0.22) { rC = 250; gC = 128; bC = 204; }
        else if (oy > 0.25) { rC = 189; gC = 142; bC = 244; }
        if (spark) { rC = 255; gC = 252; bC = 255; }
        PTS.push({
          ox: ox, oy: oy, oz: oz,
          r: rC, g: gC, b: bC,
          sz: spark ? 2.6 : (1.1 + Math.random() * 1.4),
          al: isRim ? 0.48 : (0.42 + Math.random() * 0.5),
          ph: Math.random() * 6.283
        });
      }

      /* Precompute subdivided Icosahedron (80 triangular facets) for Focus Crystal */
      var phi = (1 + Math.sqrt(5)) / 2;
      var rawV = [
        [-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],
        [0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],
        [phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]
      ].map(function (v) { var l = Math.hypot(v[0], v[1], v[2]); return [v[0]/l, v[1]/l, v[2]/l]; });
      var rawF = [
        [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
        [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
        [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
        [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]
      ];
      function midN(a, b) {
        var m = [(a[0]+b[0])*0.5, (a[1]+b[1])*0.5, (a[2]+b[2])*0.5];
        var l = Math.hypot(m[0], m[1], m[2]);
        return [m[0]/l, m[1]/l, m[2]/l];
      }
      var FACES = [];
      rawF.forEach(function (f) {
        var a = rawV[f[0]], b = rawV[f[1]], c = rawV[f[2]];
        var ab = midN(a, b), bc = midN(b, c), ca = midN(c, a);
        FACES.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
      });

      var mx = 0, my = 0, tmx = 0, tmy = 0;
      window.addEventListener('pointermove', function (e) {
        tmx = (e.clientX / Math.max(1, W)) * 2 - 1;
        tmy = (e.clientY / Math.max(1, H)) * 2 - 1;
      }, { passive: true });

      function clamp(x, a, b) { return Math.min(b, Math.max(a, x)); }
      function ramp(x, a, b) { return clamp((x - a) / Math.max(1, b - a), 0, 1); }
      function ss(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
      function interpKeys(s, keys) {
        if (s <= keys[0][0]) return keys[0].slice(1);
        var last = keys[keys.length - 1];
        if (s >= last[0]) return last.slice(1);
        for (var i = 0; i < keys.length - 1; i++) {
          if (s >= keys[i][0] && s <= keys[i + 1][0]) {
            var k = ss((s - keys[i][0]) / Math.max(1, keys[i + 1][0] - keys[i][0]));
            return [
              keys[i][1] + (keys[i + 1][1] - keys[i][1]) * k,
              keys[i][2] + (keys[i + 1][2] - keys[i][2]) * k,
              keys[i][3] + (keys[i + 1][3] - keys[i][3]) * k,
              keys[i][4] + (keys[i + 1][4] - keys[i][4]) * k
            ];
          }
        }
        return keys[0].slice(1);
      }

      var sS = window.scrollY || 0;
      function loop(ms) {
        var t = ms * 0.001;
        var rawS = window.scrollY || 0;
        sS += (rawS - sS) * 0.14;
        mx += (tmx - mx) * 0.08;
        my += (tmy - my) * 0.08;
        pulseSpin *= 0.94;

        /* Stage colour cross-fades */
        var manOp = ramp(sS, 0.35 * H, H) * (1 - ramp(sS, bounds.foTop - 0.9 * H, bounds.foTop - 0.2 * H));
        var focOp = ramp(sS, bounds.foTop - 0.9 * H, bounds.foTop - 0.2 * H) * (1 - ramp(sS, bounds.foBot - 0.8 * H, bounds.foBot - 0.2 * H));
        var teamOp = ramp(sS, bounds.foBot - 0.8 * H, bounds.foBot - 0.2 * H);
        if (bgMan) bgMan.style.opacity = manOp.toFixed(3);
        if (bgFoc) bgFoc.style.opacity = focOp.toFixed(3);
        if (bgTeam) bgTeam.style.opacity = teamOp.toFixed(3);
        if (glowEl) glowEl.style.opacity = (1 - ramp(sS, 0, 0.5 * H)).toFixed(3);
        if (pagerEl) pagerEl.classList.toggle('show', sS > bounds.foTop - 0.35 * H && sS < bounds.foBot - 0.55 * H);

        var wU = W / 1440;
        var uU = Math.max(W / 1440, H / 900);
        var mobile = W <= 820;

        var heroCx = W * 0.5;
        var heroR = mobile ? Math.min(0.76 * W, 0.42 * H) : 427 * uU;
        var heroCy = mobile ? (H - 0.22 * heroR) : ((H - 900 * uU) * 0.5 + 875 * uU);

        var sphKeys = mobile ? [
          [0, heroCx, heroCy, heroR, 1],
          [bounds.mTop, 0.16 * W, 0.24 * H, 0.54 * W, 0.92],
          [bounds.trTop + 0.3 * H, 0.14 * W, 0.28 * H, 0.54 * W, 0.72],
          [bounds.foTop - 0.3 * H, -0.5 * W, 0.15 * H, 0.5 * W, 0],
          [bounds.foBot - 0.45 * H, 0.5 * W, 1.2 * H, 0.4 * W, 0],
          [bounds.teTop, 0.5 * W, 0.3 * H, 0.4 * W, 1],
          [bounds.teBot, -0.1 * W, 0.45 * H, 0.45 * W, 0.7]
        ] : [
          [0, heroCx, heroCy, heroR, 1],
          [bounds.mTop, 330 * wU, 0.47 * H, 420 * wU, 1],
          [bounds.trTop + 0.2 * H, 290 * wU, 0.5 * H, 450 * wU, 0.95],
          [bounds.trBot - H, 250 * wU, 0.46 * H, 440 * wU, 0.85],
          [bounds.foTop - 0.15 * H, -380 * wU, 0.2 * H, 400 * wU, 0],
          [bounds.foBot - 0.45 * H, 1030 * wU, 1.25 * H, 310 * wU, 0],
          [bounds.teTop, 1030 * wU, 0.46 * H, 310 * wU, 1],
          [bounds.teTop + 0.9 * H, 160 * wU, 0.5 * H, 410 * wU, 1],
          [bounds.teBot - H, 160 * wU, 0.5 * H, 410 * wU, 1],
          [bounds.teBot, 160 * wU, -0.15 * H, 410 * wU, 0.5]
        ];
        var sp = interpKeys(sS, sphKeys);

        var cryKeys = mobile ? [
          [bounds.foTop - 0.7 * H, 0.65 * W, 1.05 * H, 0.28 * W, 0],
          [bounds.foTop, 0.5 * W, 0.26 * H, 0.34 * W, 1],
          [bounds.foBot - 0.6 * H, 0.5 * W, 0.26 * H, 0.34 * W, 1],
          [bounds.foBot - 0.15 * H, 0.5 * W, -0.05 * H, 0.28 * W, 0]
        ] : [
          [bounds.foTop - 0.75 * H, 1140 * wU, 1.02 * H, 220 * wU, 0],
          [bounds.foTop - 0.05 * H, 979 * wU, 0.482 * H, 285 * wU, 1],
          [bounds.foBot - 0.6 * H, 979 * wU, 0.482 * H, 285 * wU, 1],
          [bounds.foBot - 0.15 * H, 900 * wU, 0.12 * H, 230 * wU, 0]
        ];
        var cr = interpKeys(sS, cryKeys);

        /* Team Names Wheel Update */
        var tp = ramp(sS, bounds.teTop, Math.max(bounds.teTop + 200, bounds.teBot - H));
        if (introEl) introEl.style.opacity = (1 - ramp(tp, 0.1, 0.26)).toFixed(3);
        var wOp = ramp(tp, 0.18, 0.32);
        if (wheelEl) wheelEl.style.opacity = wOp.toFixed(3);
        var active = ramp(tp, 0.28, 0.96) * 11;
        var RR = sp[2] * 1.12;
        var stepRad = (mobile ? 13 : 11) * Math.PI / 180;
        personEls.forEach(function (el, idx) {
          var a = (idx - active) * stepRad;
          var near = Math.max(0, 1 - Math.abs(idx - active));
          var px = sp[0] + Math.cos(a) * RR;
          var py = sp[1] + Math.sin(a) * RR;
          var op = (0.35 + 0.65 * near) * Math.max(0, 1 - Math.abs(a) / 1.15);
          el.style.transform = 'translate(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px) rotate(' + a.toFixed(3) + 'rad) translateY(-50%) scale(' + (1 + 0.14 * near).toFixed(3) + ')';
          el.style.opacity = op.toFixed(3);
        });
        if (ruleEl && !mobile) {
          var rx = sp[0] + RR + 380 * wU;
          ruleEl.style.left = rx.toFixed(1) + 'px';
          ruleEl.style.right = (80 * wU).toFixed(1) + 'px';
          ruleEl.style.top = sp[1].toFixed(1) + 'px';
          ruleEl.style.opacity = (wOp * (1 - Math.min(1, Math.abs(active - Math.round(active)) * 1.6))).toFixed(3);
          if (roleEl) roleEl.textContent = PEOPLE[Math.round(active)][1];
        }

        /* Draw WebGL-equivalent Iridescent Sphere & Geodesic Crystal */
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        /* 1. Draw Iridescent Particle Sphere */
        if (sp[3] > 0.01) {
          var scx = sp[0] + mx * 18, scy = sp[1] + my * 12, sr = sp[2], sFade = sp[3];
          var shellGrad = ctx.createRadialGradient(scx - sr * 0.24, scy - sr * 0.22, sr * 0.1, scx, scy, sr * 1.06);
          shellGrad.addColorStop(0, 'rgba(255, 248, 255, ' + (0.28 * sFade).toFixed(3) + ')');
          shellGrad.addColorStop(0.58, 'rgba(186, 152, 246, ' + (0.24 * sFade).toFixed(3) + ')');
          shellGrad.addColorStop(0.86, 'rgba(130, 224, 226, ' + (0.32 * sFade).toFixed(3) + ')');
          shellGrad.addColorStop(0.98, 'rgba(255, 255, 255, ' + (0.55 * sFade).toFixed(3) + ')');
          shellGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = shellGrad;
          ctx.beginPath();
          ctx.arc(scx, scy, sr * 1.06, 0, Math.PI * 2);
          ctx.fill();

          var yaw = (motionPaused ? 0.4 : t * 0.16) + sS * 0.0005 + mx * 0.28 + pulseSpin;
          var pitch = -my * 0.18 + 0.14;
          var cyaw = Math.cos(yaw), syaw = Math.sin(yaw);
          var cp = Math.cos(pitch), spitch = Math.sin(pitch);

          for (var pIdx = 0; pIdx < PTS.length; pIdx++) {
            var pt = PTS[pIdx];
            var wob = motionPaused ? 0 : Math.sin(t * 1.1 + pt.ph) * 0.028;
            var x0 = pt.ox + wob, y0 = pt.oy + wob * 0.7, z0 = pt.oz;
            var x1 = x0 * cyaw + z0 * syaw;
            var z1 = -x0 * syaw + z0 * cyaw;
            var y2 = y0 * cp - z1 * spitch;
            var z2 = y0 * spitch + z1 * cp;
            var persp = 2.6 / (2.6 - z2 * 0.55);
            var px2 = scx + x1 * sr * 0.88 * persp;
            var py2 = scy + y2 * sr * 0.88 * persp;
            if (py2 < -20 || py2 > H + 20 || px2 < -20 || px2 > W + 20) continue;
            var alpha = pt.al * sFade * (0.45 + 0.55 * ((z2 + 1) * 0.5));
            ctx.fillStyle = 'rgba(' + pt.r + ',' + pt.g + ',' + pt.b + ',' + alpha.toFixed(3) + ')';
            ctx.fillRect(px2, py2, pt.sz * persp, pt.sz * persp);
          }
        }

        /* 2. Draw 80-Facet Geodesic Crystal in Focus Section */
        if (cr[3] > 0.01) {
          var ccx = cr[0] + mx * 14, ccy = cr[1] + my * 10, crR = cr[2], cFade = cr[3];
          var coreGlow = ctx.createRadialGradient(ccx, ccy, 0, ccx, ccy, crR * 1.35);
          coreGlow.addColorStop(0, 'rgba(255, 245, 254, ' + (0.85 * cFade).toFixed(3) + ')');
          coreGlow.addColorStop(0.5, 'rgba(225, 215, 255, ' + (0.35 * cFade).toFixed(3) + ')');
          coreGlow.addColorStop(1, 'rgba(255, 245, 254, 0)');
          ctx.fillStyle = coreGlow;
          ctx.beginPath();
          ctx.arc(ccx, ccy, crR * 1.35, 0, Math.PI * 2);
          ctx.fill();

          var ry = (motionPaused ? 0.5 : t * 0.22) + sS * 0.0007 + mx * 0.35;
          var rx = 0.32 + (motionPaused ? 0 : t * 0.07) - my * 0.22;
          var cry = Math.cos(ry), sry = Math.sin(ry), crx = Math.cos(rx), srx = Math.sin(rx);

          function projV(v) {
            var x1 = v[0] * cry + v[2] * sry;
            var z1 = -v[0] * sry + v[2] * cry;
            var y2 = v[1] * crx - z1 * srx;
            var z2 = v[1] * srx + z1 * crx;
            var k = 3.2 / (3.2 - z2 * 0.65);
            return [ccx + x1 * crR * 0.88 * k, ccy + y2 * crR * 0.88 * k, z2];
          }

          var projected = FACES.map(function (f, fi) {
            var p0 = projV(f[0]), p1 = projV(f[1]), p2 = projV(f[2]);
            var crossZ = (p1[0] - p0[0]) * (p2[1] - p0[1]) - (p1[1] - p0[1]) * (p2[0] - p0[0]);
            return { p0: p0, p1: p1, p2: p2, z: (p0[2] + p1[2] + p2[2]) / 3, front: crossZ > 0, fi: fi };
          }).sort(function (a, b) { return a.z - b.z; });

          projected.forEach(function (fc) {
            var hue = (fc.fi * 9 + t * 28) % 360;
            ctx.beginPath();
            ctx.moveTo(fc.p0[0], fc.p0[1]);
            ctx.lineTo(fc.p1[0], fc.p1[1]);
            ctx.lineTo(fc.p2[0], fc.p2[1]);
            ctx.closePath();
            var fillA = (fc.front ? 0.18 : 0.07) * cFade;
            ctx.fillStyle = 'hsla(' + hue.toFixed(0) + ', 82%, 88%, ' + fillA.toFixed(3) + ')';
            ctx.fill();
            ctx.lineWidth = fc.front ? 1.25 : 0.7;
            ctx.strokeStyle = 'rgba(255, 252, 255, ' + ((fc.front ? 0.78 : 0.28) * cFade).toFixed(3) + ')';
            ctx.stroke();
          });
        }

        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    })();
  </script>
</body>
</html>`;
  }

  if (slug === 'pixel-garden') {
    return `<!DOCTYPE html>
<html lang="en" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Dune Play · Grovekit</title>
  <meta name="description" content="Dune Play by Grovekit — interactive fat-pixel desert botanical playground. Brush plants to shake foliage loose, dial wind and gusts, inspect X-ray wood skeletons, and regrow.">
  <meta name="theme-color" content="#f2ebdf">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f2ebdf;
      --bg-alt: #eae1d2;
      --panel: #ffffff;
      --ink: #17140f;
      --mute: #6b6359;
      --line: rgba(23, 20, 15, 0.09);
      --seg: #ece5d9;
      --knob: #ffffff;
      --track: #ddd5c8;
      --on: #17140f;
      --accent: #2fb35a;
      --accent-text: #1f7a3d;
      --accent-2: #e8573b;
      --on-accent: #ffffff;
      --shadow: 0 10px 34px rgba(60, 44, 20, 0.07);
      --font-sans: "Inter", system-ui, -apple-system, sans-serif;
      --font-display: "Inter", system-ui, -apple-system, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
      --ease-spring: cubic-bezier(0.3, 1.4, 0.5, 1);
      --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    body.dark {
      --bg: #14110d;
      --bg-alt: #1a1611;
      --panel: #1f1b15;
      --ink: #f3ede2;
      --mute: #9b9284;
      --line: rgba(243, 237, 226, 0.09);
      --seg: #2b261e;
      --knob: #ffffff;
      --track: #3a342a;
      --on: #f3ede2;
      --accent: #2fb35a;
      --accent-text: #5cd684;
      --shadow: 0 10px 34px rgba(0, 0, 0, 0.35);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: rgba(47, 179, 90, 0.22); color: var(--ink); }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 8px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    html, body {
      background: var(--bg);
      color: var(--ink);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: clip;
      transition: background-color 0.5s var(--ease-out), color 0.3s var(--ease-out);
    }
    button {
      font: inherit; color: inherit; background: transparent; border: 0; cursor: pointer;
      transition: transform 0.18s var(--ease-out), background-color 0.3s var(--ease-out), color 0.3s var(--ease-out), opacity 0.25s var(--ease-out);
    }
    button:active { transform: scale(0.97); }
    a { color: inherit; text-decoration: none; }

    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 200;
      padding: 10px 16px; border-radius: 30px;
      background: var(--on); color: var(--bg); font-size: 13px; font-weight: 500;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translateY(116px); }

    .dnp-pill {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 30px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
      transition: background-color 0.5s var(--ease-out), border-color 0.5s var(--ease-out);
    }

    /* Full-Viewport Desert Playground Hero Stage */
    .dnp-stage {
      position: relative;
      height: 100vh;
      height: 100svh;
      min-height: 680px;
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
      border-bottom: 1px solid var(--line);
    }
    #scene {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      image-rendering: pixelated;
      touch-action: pan-y;
      display: block;
    }

    /* Floating Top Chrome */
    .dnp-header {
      position: absolute;
      top: 0; left: 0; right: 0;
      z-index: 10;
      pointer-events: none;
    }
    .dnp-header > * { pointer-events: auto; }

    .dnp-brand-row {
      position: absolute; left: 24px; top: 16px;
      display: flex; align-items: center; gap: 8px;
    }
    .dnp-brand {
      height: 44px; padding: 0 18px;
      display: grid; place-items: center;
      font-size: 14px; font-weight: 600;
    }
    .dnp-motion-pill {
      height: 44px; padding: 0 14px;
      font-size: 12.5px; font-weight: 500;
    }

    .dnp-title-wrap {
      position: absolute; left: 50%; top: 24px;
      transform: translateX(-50%);
      display: flex; align-items: center; gap: 8px;
    }
    .dnp-h1 { font-size: 17px; font-weight: 500; letter-spacing: -0.01em; }
    .dnp-beta {
      font-size: 8px; font-weight: 600; letter-spacing: 0.06em;
      background: var(--seg); color: var(--mute);
      padding: 3px 5px; border-radius: 5px;
      transform: translateY(-6px);
    }
    .dnp-info-btn {
      width: 20px; height: 20px; border-radius: 50%;
      border: 1.5px solid var(--ink);
      display: grid; place-items: center;
      font-size: 11px; font-weight: 600;
      margin-left: 10px; opacity: 0.85;
    }

    .dnp-tooltip {
      position: absolute; left: 50%; top: 60px;
      width: 290px; padding: 14px 16px;
      border-radius: 16px;
      font-size: 13px; line-height: 1.45;
      z-index: 15;
      opacity: 0; transform: translate(-50%, -6px); pointer-events: none;
      transition: opacity 0.25s var(--ease-out), transform 0.3s var(--ease-out);
    }
    body.tip .dnp-tooltip { opacity: 1; transform: translate(-50%, 0); pointer-events: auto; }

    .dnp-counter {
      position: absolute; left: 50%; top: 84px;
      transform: translateX(-50%);
      height: 34px; padding: 0 14px;
      display: flex; align-items: center; gap: 7px;
      font-size: 13.5px; color: var(--mute);
      z-index: 8;
    }
    .dnp-counter b { color: var(--ink); font-weight: 600; }

    .dnp-top-right {
      position: absolute; right: 24px; top: 16px;
      display: flex; align-items: center; gap: 8px;
    }
    .dnp-demo-btn {
      height: 46px; padding: 0 16px;
      font-size: 13px; font-weight: 500;
    }
    .dnp-view-toggle {
      height: 46px; padding: 4px;
      display: flex; gap: 2px;
    }
    .dnp-vbtn {
      width: 44px; height: 36px; border-radius: 24px;
      display: grid; place-items: center; color: var(--ink);
    }
    .dnp-vbtn.on { background: var(--on); color: var(--bg); }
    .dnp-moon {
      width: 46px; height: 46px; display: grid; place-items: center;
    }

    /* Grow back + Single-view carousel nav */
    .dnp-grow {
      position: absolute; left: 50%; bottom: calc(max(13vh, 96px) + 32px);
      height: 34px; padding: 0 16px; border-radius: 30px;
      background: var(--on); color: var(--bg);
      font-size: 12.5px; font-weight: 500; z-index: 8;
      opacity: 0; transform: translate(-50%, 10px); pointer-events: none;
      transition: opacity 0.3s var(--ease-out), transform 0.4s var(--ease-out);
    }
    body.bare .dnp-grow { opacity: 1; transform: translate(-50%, 0); pointer-events: auto; }

    .dnp-snav {
      position: absolute; left: calc(50% - 6px); bottom: calc(max(13vh, 96px) + 32px);
      transform: translateX(-100%);
      height: 34px; padding: 0 8px; gap: 10px;
      display: none; align-items: center; z-index: 8;
    }
    body.single .dnp-snav { display: flex; }
    body.single .dnp-grow { left: calc(50% + 6px); transform: translate(0, 10px); }
    body.single.bare .dnp-grow { transform: translate(0, 0); }
    .dnp-snav button { width: 26px; height: 26px; display: grid; place-items: center; font-size: 16px; }
    .dnp-dots { display: flex; gap: 6px; align-items: center; }
    .dnp-sdot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--mute); opacity: 0.45;
      transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
    }
    .dnp-sdot.on { opacity: 1; background: var(--ink); transform: scale(1.15); }

    /* Bottom Control Bar */
    .dnp-bar {
      position: absolute; left: 50%; bottom: 16px;
      transform: translateX(-50%);
      width: min(1240px, calc(100% - 32px));
      min-height: 96px;
      padding: 14px 26px;
      border-radius: 28px;
      box-shadow: var(--shadow);
      display: flex; align-items: center; justify-content: space-between; gap: 24px;
      z-index: 9;
    }
    #sock { width: 56px; height: 60px; image-rendering: pixelated; flex: none; }
    .dnp-div { width: 1px; align-self: stretch; margin: 8px 0; background: var(--line); flex: none; }
    .dnp-grp { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
    .dnp-lab {
      font-size: 13px; color: var(--mute);
      display: flex; justify-content: space-between; gap: 16px; white-space: nowrap;
    }
    .dnp-lab b { color: var(--ink); font-weight: 600; }
    .dnp-row { display: flex; align-items: center; gap: 12px; }
    .dnp-plain { font-size: 13.5px; }

    /* Switch */
    .dnp-sw {
      width: 50px; height: 30px; border-radius: 20px;
      background: var(--track); position: relative; flex: none;
    }
    .dnp-sw::after {
      content: ""; position: absolute; left: 3px; top: 3px;
      width: 24px; height: 24px; border-radius: 50%;
      background: var(--knob);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
      transition: transform 0.3s var(--ease-spring);
    }
    .dnp-sw.on { background: #2fb35a; }
    .dnp-sw.on::after { transform: translateX(20px); }

    /* Segmented control */
    .dnp-seg {
      display: flex; background: var(--seg); border-radius: 20px; padding: 3px;
      transition: opacity 0.3s var(--ease-out), background-color 0.5s var(--ease-out);
    }
    .dnp-seg.dim { opacity: 0.55; }
    .dnp-seg button {
      height: 32px; padding: 0 15px; border-radius: 16px;
      font-size: 13.5px; color: var(--mute);
    }
    .dnp-seg button.on {
      background: var(--panel); color: var(--ink);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    /* GPU Composite Custom Slider (scaleX + translateX — zero width/left reflow) */
    .dnp-rng {
      width: 156px; height: 22px; position: relative;
      touch-action: none; cursor: pointer;
    }
    .dnp-rng-track {
      position: absolute; left: 0; right: 0; top: 10px; height: 2px;
      background: var(--track); border-radius: 2px;
    }
    .dnp-rng-fill {
      position: absolute; left: 0; right: 0; top: 10px; height: 2px;
      background: var(--ink); border-radius: 2px;
      transform-origin: 0 50%; transform: scaleX(0);
    }
    .dnp-rng.anim .dnp-rng-fill,
    .dnp-rng.anim .dnp-rng-knob {
      transition: transform 0.7s var(--ease-out);
    }
    .dnp-tick {
      position: absolute; top: 9px; width: 4px; height: 4px; margin-left: -2px;
      border-radius: 50%; background: var(--mute); opacity: 0.6;
    }
    .dnp-rng-knob {
      position: absolute; left: 0; top: 1px; width: 20px; height: 20px; margin-left: -10px;
      border-radius: 50%; background: var(--knob);
      border: 1px solid var(--line);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    }

    /* +20% Below-the-Fold Grovekit Botanical Field Guide & Telemetry */
    .dnp-sec {
      max-width: 1200px;
      margin: 0 auto;
      padding: clamp(56px, 7vw, 96px) clamp(20px, 4vw, 40px);
    }
    .dnp-sec-head {
      display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap;
      margin-bottom: 32px;
    }
    .dnp-kicker {
      font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--accent-text); display: block; margin-bottom: 8px;
    }
    .dnp-h2 { font-size: clamp(26px, 3.2vw, 38px); font-weight: 600; letter-spacing: -0.025em; }
    .dnp-sub { max-width: 46ch; font-size: 14.5px; line-height: 1.6; color: var(--mute); }

    .dnp-cards {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;
    }
    .dnp-card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 22px;
      padding: 24px;
      box-shadow: var(--shadow);
    }
    .dnp-card-tag {
      display: inline-block; padding: 4px 10px; border-radius: 999px;
      background: var(--seg); font-size: 11px; font-weight: 600; color: var(--mute);
      margin-bottom: 14px;
    }
    .dnp-card h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .dnp-card p { font-size: 14px; line-height: 1.6; color: var(--mute); margin-bottom: 16px; }
    .dnp-spec-row {
      display: flex; justify-content: space-between; padding-top: 12px;
      border-top: 1px solid var(--line); font-size: 12.5px; font-family: var(--font-mono);
    }

    .dnp-footer {
      border-top: 1px solid var(--line);
      max-width: 1200px; margin: 0 auto;
      padding: 28px clamp(20px, 4vw, 40px) 44px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
      font-size: 13px; color: var(--mute);
    }

    .js-ready .dnp-reveal {
      opacity: 0; transform: translateY(16px);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .js-ready .dnp-reveal.in { opacity: 1; transform: none; }

    @keyframes dnpFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }

    @media (max-width: 960px) {
      .dnp-bar { overflow-x: auto; justify-content: flex-start; gap: 18px; }
      .dnp-title-wrap { top: 70px; }
      .dnp-counter { top: 108px; }
      .dnp-view-toggle { display: none; }
      .dnp-cards { grid-template-columns: 1fr; }
    }
    @media (max-width: 560px) {
      .dnp-brand-row { left: 14px; top: 12px; }
      .dnp-top-right { right: 14px; top: 12px; }
      .dnp-demo-btn span { display: none; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#mainContent">Skip to main content</a>

  <main id="mainContent">
    <section class="dnp-stage" aria-label="Dune Play Interactive Desert Playground">
      <canvas id="scene" aria-hidden="true"></canvas>

      <header class="dnp-header">
        <div class="dnp-brand-row">
          <a class="dnp-pill dnp-brand" href="#specimens">Grovekit</a>
          <button type="button" class="dnp-pill dnp-motion-pill" id="motionToggleBtn" aria-pressed="false">Motion: ON</button>
        </div>

        <div class="dnp-title-wrap">
          <h1 class="dnp-h1">Dune Play</h1>
          <span class="dnp-beta">BETA</span>
          <button type="button" class="dnp-info-btn" id="dnpInfoBtn" aria-label="About">i</button>
        </div>

        <div class="dnp-pill dnp-tooltip" id="dnpTooltip" role="status">
          Brush through the plants with your cursor to shake their leaves and petals loose. Turn on the weather and let the wind do it, or peek at the skeletons underneath.
        </div>

        <div class="dnp-pill dnp-counter tabular-nums">
          <svg width="14" height="14" viewBox="0 0 7 7" shape-rendering="crispEdges" aria-hidden="true">
            <path fill="#f06aa8" d="M2 0h3v1H2zM1 1h5v1H1zM0 2h7v3H0zM1 5h5v1H1zM2 6h3v1H2z"></path>
            <rect x="3" y="3" width="1" height="1" fill="#ffd24a"></rect>
          </svg>
          <span>Shaken</span>
          <b id="dnpShakeCount">4,812</b>
          <span>times</span>
        </div>

        <nav class="dnp-top-right" aria-label="Scene controls">
          <button type="button" class="dnp-pill dnp-demo-btn" id="dnpStormCycleBtn" data-next-preview="true" aria-label="Trigger wind gust and foliage shake">
            <span>Gust &amp; Shake</span>
          </button>
          <div class="dnp-pill dnp-view-toggle" role="group" aria-label="Plant layout mode">
            <button type="button" class="dnp-vbtn on" id="btnAllPlants" aria-label="All plants">
              <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
                <rect x="1" y="1" width="3.4" height="12" rx="1.2" fill="currentColor"></rect>
                <rect x="6.3" y="1" width="3.4" height="12" rx="1.2" fill="currentColor"></rect>
                <rect x="11.6" y="1" width="3.4" height="12" rx="1.2" fill="currentColor"></rect>
              </svg>
            </button>
            <button type="button" class="dnp-vbtn" id="btnOnePlant" aria-label="One plant">
              <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
                <rect x="6.3" y="1" width="3.4" height="12" rx="1.2" fill="currentColor"></rect>
              </svg>
            </button>
          </div>
          <button type="button" class="dnp-pill dnp-moon" id="dnpThemeBtn" aria-label="Dark mode">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"></path>
            </svg>
          </button>
        </nav>
      </header>

      <div class="dnp-pill dnp-snav" id="dnpSingleNav">
        <button type="button" id="dnpPrevPlant" aria-label="Previous plant">‹</button>
        <div class="dnp-dots">
          <span class="dnp-sdot" data-dot="0"></span>
          <span class="dnp-sdot on" data-dot="1"></span>
          <span class="dnp-sdot" data-dot="2"></span>
        </div>
        <button type="button" id="dnpNextPlant" aria-label="Next plant">›</button>
      </div>

      <button type="button" class="dnp-grow" id="dnpGrowBtn">Grow back</button>

      <div class="dnp-pill dnp-bar" role="region" aria-label="Weather and physics controls">
        <canvas id="sock" width="28" height="30" aria-hidden="true"></canvas>

        <div class="dnp-grp">
          <div class="dnp-lab"><span>Weather</span></div>
          <div class="dnp-row">
            <button type="button" class="dnp-sw" id="swWeather" aria-label="Toggle weather" aria-pressed="false"></button>
            <div class="dnp-seg dim" id="segWeather">
              <button type="button" class="on" data-mode="breezy">Breezy</button>
              <button type="button" data-mode="storm">Storm</button>
            </div>
          </div>
        </div>

        <div class="dnp-div" aria-hidden="true"></div>

        <div class="dnp-grp">
          <div class="dnp-lab"><span>Direction</span></div>
          <div class="dnp-seg" id="segDir">
            <button type="button" data-dir="-1">Left</button>
            <button type="button" class="on" data-dir="1">Right</button>
          </div>
        </div>

        <div class="dnp-grp">
          <div class="dnp-lab"><span>Wind speed</span><b id="lblSpeed">Calm</b></div>
          <div class="dnp-rng" id="rngSpeed" role="slider" tabindex="0" aria-label="Wind speed" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
            <div class="dnp-rng-track"></div>
            <div class="dnp-rng-fill" id="fillSpeed"></div>
            <span class="dnp-tick" style="left:25%"></span>
            <span class="dnp-tick" style="left:50%"></span>
            <span class="dnp-tick" style="left:75%"></span>
            <div class="dnp-rng-knob" id="knobSpeed"></div>
          </div>
        </div>

        <div class="dnp-grp">
          <div class="dnp-lab"><span>Gusts</span><b id="lblGust">Gusty</b></div>
          <div class="dnp-rng" id="rngGust" role="slider" tabindex="0" aria-label="Gust intensity" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45">
            <div class="dnp-rng-track"></div>
            <div class="dnp-rng-fill" id="fillGust"></div>
            <span class="dnp-tick" style="left:25%"></span>
            <span class="dnp-tick" style="left:50%"></span>
            <span class="dnp-tick" style="left:75%"></span>
            <div class="dnp-rng-knob" id="knobGust"></div>
          </div>
        </div>

        <div class="dnp-div" aria-hidden="true"></div>

        <div class="dnp-grp">
          <div class="dnp-lab"><span>Show</span></div>
          <div class="dnp-row">
            <span class="dnp-plain">Skeleton</span>
            <button type="button" class="dnp-sw" id="swSkeleton" aria-label="Show X-ray wood skeleton" aria-pressed="false"></button>
            <span class="dnp-plain" style="margin-left:8px">Sound</span>
            <button type="button" class="dnp-sw" id="swSound" aria-label="Toggle procedural wind audio" aria-pressed="false"></button>
          </div>
        </div>
      </div>
    </section>

    <section class="dnp-sec dnp-reveal" id="specimens" aria-labelledby="dnpSpecHeading">
      <div class="dnp-sec-head">
        <div>
          <span class="dnp-kicker">Grovekit Cellular Botany</span>
          <h2 class="dnp-h2" id="dnpSpecHeading">Three desert specimens, simulated cell by cell</h2>
        </div>
        <p class="dnp-sub">Every trunk, spine, frond, and blossom is quantized onto an integer fat-pixel grid with damped Hookean spring physics (k = 42, c = 3.4) and 5-cell sand-drift accumulation.</p>
      </div>

      <div class="dnp-cards tabular-nums">
        <article class="dnp-card">
          <span class="dnp-card-tag">Specimen 01 · Cocos nucifera</span>
          <h3>Coconut Palm</h3>
          <p>High-flexibility trunk (flex 1.15) crowned with arched emerald fronds that stream downwind and shed outer leaflets first in storm gusts.</p>
          <div class="dnp-spec-row"><span>Grid Height</span><strong>96 cells · Frond</strong></div>
        </article>
        <article class="dnp-card">
          <span class="dnp-card-tag">Specimen 02 · Echinocactus grusonii</span>
          <h3>Barrel Cactus</h3>
          <p>Stiff desert column (flex 0.12) crowned with a magenta-gold blossom. As green flesh and pale spines shed, internal ribs warm toward bare #b2875a wood.</p>
          <div class="dnp-spec-row"><span>Grid Height</span><strong>58 cells · Rib + Petal</strong></div>
        </article>
        <article class="dnp-card">
          <span class="dnp-card-tag">Specimen 03 · Jacaranda mimosifolia</span>
          <h3>Jacaranda Canopy</h3>
          <p>Branching hardwood armature (flex 0.60) supporting a cloud of buoyant violet blossoms (lifetime factor 1.5) that drift across the dunes.</p>
          <div class="dnp-spec-row"><span>Grid Height</span><strong>86 cells · Blossom</strong></div>
        </article>
      </div>
    </section>
  </main>

  <footer class="dnp-footer">
    <span>© 2026 Grovekit · Dune Play Cellular Foliage Sandbox</span>
    <span>Integer Fat-Pixel Engine · Web Audio Wind Synthesis</span>
  </footer>

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

      /* Reveal Observer */
      var reveals = document.querySelectorAll('.dnp-reveal');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.14 });
        reveals.forEach(function (el) { io.observe(el); });
      } else {
        reveals.forEach(function (el) { el.classList.add('in'); });
      }

      /* Tooltip & Dark Theme */
      var infoBtn = document.getElementById('dnpInfoBtn');
      if (infoBtn) {
        infoBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          document.body.classList.toggle('tip');
        });
      }
      window.addEventListener('click', function () { document.body.classList.remove('tip'); });

      var themeBtn = document.getElementById('dnpThemeBtn');
      if (themeBtn) {
        themeBtn.addEventListener('click', function () { document.body.classList.toggle('dark'); });
      }

      /* State */
      var state = {
        weather: false,
        mode: 'breezy',
        dir: 1,
        speed: 0,
        gust: 0.45,
        skeleton: false,
        sound: false,
        single: false,
        one: 1,
        shakes: 4812
      };

      var SPRITES = {
        palm: 'https://images.higgs.ai/?default=1&output=png&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_023150_cc5c0d10-d6fc-429d-9245-a05e69771f45.png&w=1024',
        cactus: 'https://images.higgs.ai/?default=1&output=png&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_023155_2d3af7db-5e50-423f-822f-fbbb8b599e76.png&w=1024',
        jac: 'https://images.higgs.ai/?default=1&output=png&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_023200_f11ab77e-4a73-43f2-971c-d77090c352ff.png&w=1024'
      };

      /* Immediate lush procedural fat-pixel plant generator (guarantees instant non-blank plants + offline support) */
      function makeProceduralPlant(key) {
        var cells = [], rows = key === 'palm' ? 96 : key === 'cactus' ? 58 : 86;
        var cols = key === 'palm' ? 76 : key === 'cactus' ? 44 : 84;
        var flex = key === 'palm' ? 1.15 : key === 'cactus' ? 0.12 : 0.60;
        var grid = {};
        function put(x, y, rgb, wood, kind, bare) {
          x = Math.round(x); y = Math.round(y);
          if (x < 0 || x >= cols || y < 0 || y >= rows) return;
          grid[x + ',' + y] = { hx: x, hy: y, col: rgb, origRgb: rgb, wood: wood, kind: kind, bare: bare || null, st: 0, sx: 0, sy: 0, x: 0, y: 0, vx: 0, vy: 0, ph: Math.random() * 6.28, seed: Math.random() * 6.28, loose: 0.4 };
        }
        if (key === 'palm') {
          var topX = 36, topY = 26;
          for (var y = 26; y < rows; y++) {
            var t = (y - 26) / (rows - 26);
            var cx = topX + Math.sin(t * 2.4) * 5;
            var w = Math.round(2.2 + t * 2.3);
            for (var dx = -w; dx <= w; dx++) {
              put(cx + dx, y, (y % 4 === 0) ? [120, 82, 48] : [148, 104, 62], true, 'frond');
            }
          }
          var angles = [-2.55, -2.05, -1.45, -0.75, -0.25, 0.25, 0.85, 1.55, 2.25];
          angles.forEach(function (ang, ai) {
            var len = 24 + (ai % 3) * 5;
            for (var s = 0; s <= len; s++) {
              var u = s / len;
              var fx = topX + Math.cos(ang) * s * 1.15;
              var fy = topY + Math.sin(ang) * s * 0.55 + u * u * 11;
              put(fx, fy, [92, 136, 56], s < 6, 'frond');
              var drop = Math.round(2 + (1 - Math.abs(u - 0.5) * 1.5) * 5);
              for (var d = 1; d <= drop; d++) {
                var shades = [[58, 132, 62], [78, 158, 72], [104, 178, 84], [46, 110, 52]];
                put(fx + (d % 2), fy + d, shades[(s + d) % 4], false, 'frond');
              }
            }
          });
        } else if (key === 'cactus') {
          for (var cy2 = 12; cy2 < rows; cy2++) {
            var v = (cy2 - 12) / (rows - 12);
            var rad = Math.round(Math.sin(Math.pow(v, 0.75) * Math.PI * 0.88 + 0.18) * 16);
            for (var dx2 = -rad; dx2 <= rad; dx2++) {
              var isRib = (dx2 + 30) % 5 === 0;
              var isSpine = !isRib && ((cy2 + dx2) % 9 === 0) && Math.abs(dx2) > 3;
              if (isRib) put(22 + dx2, cy2, [42, 86, 48], true, 'flesh', [178, 135, 90]);
              else if (isSpine) put(22 + dx2, cy2, [232, 224, 196], false, 'spine');
              else put(22 + dx2, cy2, dx2 < 0 ? [84, 156, 78] : [64, 134, 64], false, 'flesh');
            }
          }
          /* Pink & yellow crown blossom */
          for (var py = 3; py <= 13; py++) {
            var pr = py < 8 ? (py - 1) * 1.5 : (15 - py) * 1.6;
            for (var px = -Math.round(pr); px <= Math.round(pr); px++) {
              var isCore = py >= 6 && py <= 9 && Math.abs(px) <= 2;
              put(22 + px, py, isCore ? [255, 210, 72] : ((px + py) % 2 ? [240, 106, 168] : [222, 78, 146]), false, 'petal');
            }
          }
        } else {
          /* Jacaranda tree */
          for (var jy = 42; jy < rows; jy++) {
            var jt = (jy - 42) / (rows - 42);
            var jx = 42 + Math.sin(jt * 2.2) * 3;
            var jw = Math.round(2 + jt * 3);
            for (var jdx = -jw; jdx <= jw; jdx++) put(jx + jdx, jy, [108, 78, 56], true, 'petal');
          }
          var branches = [[-1, 26, 26], [1, 58, 28], [-0.5, 34, 20], [0.5, 50, 22]];
          branches.forEach(function (br) {
            for (var bs = 0; bs < 18; bs++) {
              var bx = 42 + (br[1] - 42) * (bs / 18);
              var by = 46 + (br[2] - 46) * (bs / 18);
              put(bx, by, [108, 78, 56], true, 'petal');
              put(bx + 1, by, [96, 68, 48], true, 'petal');
            }
          });
          var blobs = [[42, 22, 22, 14], [24, 30, 17, 12], [60, 31, 17, 12], [33, 16, 15, 10], [52, 18, 15, 10]];
          blobs.forEach(function (bl) {
            for (var by2 = -bl[3]; by2 <= bl[3]; by2++) {
              for (var bx2 = -bl[2]; bx2 <= bl[2]; bx2++) {
                var dist = (bx2 * bx2) / (bl[2] * bl[2]) + (by2 * by2) / (bl[3] * bl[3]);
                if (dist <= 1.05 && ((bx2 * 7 + by2 * 13) & 3) !== 0) {
                  var pTones = [[148, 108, 216], [168, 128, 232], [126, 88, 196], [190, 156, 242]];
                  var existing = grid[Math.round(bl[0] + bx2) + ',' + Math.round(bl[1] + by2)];
                  if (!existing || !existing.wood) {
                    put(bl[0] + bx2, bl[1] + by2, pTones[Math.abs(bx2 + by2) % 4], false, 'petal');
                  }
                }
              }
            }
          });
        }

        Object.keys(grid).forEach(function (k) { cells.push(grid[k]); });
        cells.forEach(function (c) {
          var n = 0;
          for (var oy = -3; oy <= 3; oy++) {
            for (var ox = -3; ox <= 3; ox++) {
              if (grid[(c.hx + ox) + ',' + (c.hy + oy)]) n++;
            }
          }
          c.loose = Math.min(1, Math.max(0, (1 - n / 49) * 1.8 + Math.random() * 0.25));
          c.colStr = 'rgb(' + c.col[0] + ',' + c.col[1] + ',' + c.col[2] + ')';
        });
        return { key: key, rows: rows, cols: cols, flex: flex, cells: cells, k: 0, kv: 0, bareK: 0, ox: 0, oy: 0, cx: 0 };
      }

      var plants = [makeProceduralPlant('palm'), makeProceduralPlant('cactus'), makeProceduralPlant('jac')];

      /* Optional async upgrade from verbatim Higgsfield PNG sprites when CORS permits */
      plants.forEach(function (pl) {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
          try {
            var tmp = document.createElement('canvas');
            tmp.width = img.naturalWidth; tmp.height = img.naturalHeight;
            var tctx = tmp.getContext('2d');
            tctx.drawImage(img, 0, 0);
            var id = tctx.getImageData(0, 0, tmp.width, tmp.height).data;
            var minX = tmp.width, minY = tmp.height, maxX = 0, maxY = 0;
            for (var y = 0; y < tmp.height; y++) {
              for (var x = 0; x < tmp.width; x++) {
                if (id[(y * tmp.width + x) * 4 + 3] > 60) {
                  if (x < minX) minX = x; if (x > maxX) maxX = x;
                  if (y < minY) minY = y; if (y > maxY) maxY = y;
                }
              }
            }
            if (maxX <= minX || maxY <= minY) return;
            var bw = maxX - minX + 1, bh = maxY - minY + 1;
            var rows = pl.rows, cols = Math.max(12, Math.round(rows * bw / bh));
            var ds = document.createElement('canvas');
            ds.width = cols; ds.height = rows;
            var dctx = ds.getContext('2d');
            dctx.drawImage(img, minX, minY, bw, bh, 0, 0, cols, rows);
            var dd = dctx.getImageData(0, 0, cols, rows).data;
            var occ = {}, nextCells = [];
            for (var r = 0; r < rows; r++) {
              for (var c = 0; c < cols; c++) {
                var o = (r * cols + c) * 4;
                if (dd[o + 3] < 120) continue;
                var R = Math.min(255, Math.round(dd[o] / 8) * 8);
                var G = Math.min(255, Math.round(dd[o + 1] / 8) * 8);
                var B = Math.min(255, Math.round(dd[o + 2] / 8) * 8);
                var rf = R / 255, gf = G / 255, bf = B / 255;
                var mx = Math.max(rf, gf, bf), mn = Math.min(rf, gf, bf), d = mx - mn;
                var h = 0;
                if (d > 0) {
                  if (mx === rf) h = ((gf - bf) / d) * 60;
                  else if (mx === gf) h = (2 + (bf - rf) / d) * 60;
                  else h = (4 + (rf - gf) / d) * 60;
                  if (h < 0) h += 360;
                }
                var s = mx === 0 ? 0 : d / mx, v = mx;
                var wood = false, kind = pl.key === 'palm' ? 'frond' : pl.key === 'jac' ? 'petal' : 'flesh', bare = null;
                if (pl.key === 'palm') wood = (h >= 12 && h <= 48 && s > 0.30 && v < 0.82);
                else if (pl.key === 'jac') wood = (h >= 8 && h <= 50 && s > 0.22 && v < 0.72);
                else {
                  if (h > 60 && h < 170 && v < 0.36) { wood = true; bare = [178, 135, 90]; }
                  else if (((h > 300 || h < 18) && s > 0.35) || (h >= 38 && h <= 62 && s > 0.6 && r < rows * 0.3)) kind = 'petal';
                  else if (s < 0.38 && v > 0.55) kind = 'spine';
                }
                var cell = { hx: c, hy: r, col: [R, G, B], colStr: 'rgb(' + R + ',' + G + ',' + B + ')', wood: wood, kind: kind, bare: bare, st: 0, sx: 0, sy: 0, x: 0, y: 0, vx: 0, vy: 0, ph: Math.random() * 6.28, seed: Math.random() * 6.28, loose: 0.4 };
                occ[c + ',' + r] = cell;
                nextCells.push(cell);
              }
            }
            if (nextCells.length > 80) {
              nextCells.forEach(function (cl) {
                var n = 0;
                for (var oy = -3; oy <= 3; oy++) for (var ox = -3; ox <= 3; ox++) if (occ[(cl.hx + ox) + ',' + (cl.hy + oy)]) n++;
                cl.loose = Math.min(1, Math.max(0, (1 - n / 49) * 1.8 + Math.random() * 0.25));
              });
              pl.cols = cols;
              pl.cells = nextCells;
              worldLayout();
            }
          } catch (e) {}
        };
        img.src = SPRITES[pl.key];
      });

      /* Canvas & World Layout */
      var cv = document.getElementById('scene');
      var ctx = cv.getContext('2d');
      var sockCv = document.getElementById('sock');
      var sockCtx = sockCv.getContext('2d');
      var DPR = 1, C = 5, CW = 0, CH = 0, GY = 80, gridCols = 200;
      var hm = [], floorMask = [], mounds = [];
      var TONES = ['#e4cfa6', '#d9c094', '#cdb282', '#efdcb8'];
      var growingUntil = 0;

      function worldLayout() {
        var rect = cv.parentElement.getBoundingClientRect();
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        CW = Math.max(320, Math.round((rect.width || window.innerWidth) * DPR));
        CH = Math.max(480, Math.round((rect.height || window.innerHeight) * DPR));
        cv.width = CW; cv.height = CH;
        C = Math.max(2, Math.round(CH * (state.single ? 0.0068 : 0.0054)));
        gridCols = Math.ceil(CW / C) + 4;
        GY = Math.round((CH * 0.68) / C);
        hm = new Array(gridCols).fill(0);
        floorMask = new Array(gridCols).fill(0);
        mounds = [];

        var fracs = [0.20, 0.48, 0.77];
        plants.forEach(function (pl, idx) {
          var vis = !state.single || idx === state.one;
          var fx = state.single ? 0.50 : fracs[idx];
          pl.cx = Math.round((CW * fx) / C);
          pl.ox = pl.cx - Math.round(pl.cols / 2);
          pl.oy = GY - pl.rows;
          pl.vis = vis;
          pl.cells.forEach(function (c) { c.st = 0; c.sx = 0; c.sy = 0; });
          if (vis) {
            var mw = Math.round(Math.max(pl.cols * 1.05, 40));
            var startX = pl.cx - Math.round(mw / 2);
            var mCells = [];
            for (var x = 0; x < mw; x++) {
              var t = x / Math.max(1, mw - 1);
              var hgt = Math.round(Math.pow(Math.sin(t * Math.PI), 0.6) * 3);
              for (var y = 0; y <= hgt; y++) {
                mCells.push({ x: startX + x, y: GY - y + 1, col: TONES[(x * 7 + y * 3) % 4] });
              }
            }
            mounds.push(mCells);
            var fw = Math.round(mw * 1.25);
            for (var fc = pl.cx - (fw >> 1); fc < pl.cx + (fw >> 1); fc++) {
              if (fc >= 0 && fc < gridCols) floorMask[fc] = 1;
            }
          }
        });
        document.body.classList.remove('bare');
        var dots = document.querySelectorAll('.dnp-sdot');
        dots.forEach(function (d, i) { d.classList.toggle('on', i === state.one); });
      }
      worldLayout();
      window.addEventListener('resize', worldLayout, { passive: true });

      /* Web Audio Procedural Wind + Foliage Rustle */
      var audioCtx = null, noiseBuf = null, windGain = null;
      function ensureAudio() {
        if (audioCtx) { if (audioCtx.state === 'suspended') audioCtx.resume(); return; }
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        audioCtx = new AC();
        var sr = audioCtx.sampleRate;
        noiseBuf = audioCtx.createBuffer(1, sr * 2, sr);
        var ch = noiseBuf.getChannelData(0), l = 0;
        for (var i = 0; i < ch.length; i++) {
          l = (l + 0.02 * (Math.random() * 2 - 1)) / 1.02;
          ch[i] = l * 3.5;
        }
        var src = audioCtx.createBufferSource();
        src.buffer = noiseBuf; src.loop = true;
        var bp = audioCtx.createBiquadFilter();
        bp.type = 'bandpass'; bp.frequency.value = 420; bp.Q.value = 0.6;
        windGain = audioCtx.createGain();
        windGain.gain.value = 0;
        src.connect(bp); bp.connect(windGain); windGain.connect(audioCtx.destination);
        src.start();
      }
      function playRustle(count) {
        if (!state.sound || !audioCtx || !noiseBuf || count <= 0) return;
        var now = audioCtx.currentTime;
        var src = audioCtx.createBufferSource();
        src.buffer = noiseBuf;
        var hp = audioCtx.createBiquadFilter();
        hp.type = 'highpass'; hp.frequency.value = 1800;
        var g = audioCtx.createGain();
        var peak = Math.min(0.22, 0.02 + count / 180);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(peak, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0005, now + 0.35);
        src.connect(hp); hp.connect(g); g.connect(audioCtx.destination);
        src.start(now, Math.random());
        src.stop(now + 0.4);
      }

      /* Shake Interaction */
      var shakeCountEl = document.getElementById('dnpShakeCount');
      function shakePlant(pl, dir, power) {
        var leaves = pl.cells.filter(function (c) { return !c.wood && c.st === 0; });
        pl.kv += dir * (5 + 4 * power);
        var n = Math.max(Math.min(leaves.length, 30), Math.min(Math.round(leaves.length * 0.13 * power), 170));
        leaves.sort(function (a, b) { return (b.loose + Math.random() * 0.9) - (a.loose + Math.random() * 0.9); });
        for (var i = 0; i < n && i < leaves.length; i++) {
          var lf = leaves[i];
          lf.st = 1;
          lf.x = pl.ox + lf.hx + lf.sx;
          lf.y = pl.oy + lf.hy + lf.sy;
          lf.vx = dir * (6 + Math.random() * 16) + state.dir * state.speed * 12;
          lf.vy = -(6 + Math.random() * 16);
        }
        state.shakes += 1;
        if (shakeCountEl) shakeCountEl.textContent = state.shakes.toLocaleString('en-US');
        playRustle(n);
      }

      function hitTest(clientX, clientY) {
        var r = cv.getBoundingClientRect();
        var gx = ((clientX - r.left) * DPR) / C;
        var gy = ((clientY - r.top) * DPR) / C;
        for (var i = 0; i < plants.length; i++) {
          var pl = plants[i];
          if (!pl.vis) continue;
          if (gx < pl.ox - 3 || gx > pl.ox + pl.cols + 3 || gy < pl.oy - 3 || gy > GY + 2) continue;
          for (var j = 0; j < pl.cells.length; j++) {
            var c = pl.cells[j];
            if (c.st === 0 && Math.abs(pl.ox + c.hx + c.sx - gx) < 3 && Math.abs(pl.oy + c.hy - gy) < 3) return pl;
          }
        }
        return null;
      }

      var dragRec = null;
      cv.addEventListener('pointermove', function (e) {
        if (dragRec) {
          var dx = e.clientX - dragRec.lastX;
          if (Math.abs(dx) > 28) {
            shakePlant(dragRec.plant, dx > 0 ? 1 : -1, 0.7);
            dragRec.lastX = e.clientX;
          }
        } else {
          cv.style.cursor = hitTest(e.clientX, e.clientY) ? 'pointer' : 'default';
        }
      });
      cv.addEventListener('pointerdown', function (e) {
        var pl = hitTest(e.clientX, e.clientY);
        if (pl) {
          dragRec = { plant: pl, lastX: e.clientX };
          shakePlant(pl, Math.random() > 0.5 ? 1 : -1, 1);
        }
      });
      window.addEventListener('pointerup', function () { dragRec = null; });

      /* Sliders & Controls */
      var SPEED_LBLS = ['Calm', 'Breeze', 'Windy', 'Strong', 'Gale'];
      var GUST_LBLS = ['Still', 'Light gusts', 'Gusty', 'Strong gusts', 'Wild gusts'];
      var rngSpeed = document.getElementById('rngSpeed'), fillSpeed = document.getElementById('fillSpeed'), knobSpeed = document.getElementById('knobSpeed'), lblSpeed = document.getElementById('lblSpeed');
      var rngGust = document.getElementById('rngGust'), fillGust = document.getElementById('fillGust'), knobGust = document.getElementById('knobGust'), lblGust = document.getElementById('lblGust');
      var swWeather = document.getElementById('swWeather'), segWeather = document.getElementById('segWeather');

      function setSliderUI(kind, val, animated) {
        val = Math.min(1, Math.max(0, val));
        var rng = kind === 'speed' ? rngSpeed : rngGust;
        var fill = kind === 'speed' ? fillSpeed : fillGust;
        var knob = kind === 'speed' ? knobSpeed : knobGust;
        var lbl = kind === 'speed' ? lblSpeed : lblGust;
        var names = kind === 'speed' ? SPEED_LBLS : GUST_LBLS;
        if (kind === 'speed') state.speed = val; else state.gust = val;
        if (rng) {
          rng.classList.toggle('anim', Boolean(animated));
          rng.setAttribute('aria-valuenow', String(Math.round(val * 100)));
        }
        var w = rng ? (rng.clientWidth || 156) : 156;
        if (fill) fill.style.transform = 'scaleX(' + val.toFixed(3) + ')';
        if (knob) knob.style.transform = 'translateX(' + (val * w).toFixed(1) + 'px)';
        if (lbl) lbl.textContent = names[Math.min(4, Math.round(val * 4))];
      }
      setSliderUI('speed', 0, false);
      setSliderUI('gust', 0.45, false);

      function syncWeatherUI() {
        if (swWeather) {
          swWeather.classList.toggle('on', state.weather);
          swWeather.setAttribute('aria-pressed', String(state.weather));
        }
        if (segWeather) {
          segWeather.classList.toggle('dim', !state.weather);
          Array.prototype.forEach.call(segWeather.querySelectorAll('button'), function (b) {
            b.classList.toggle('on', b.getAttribute('data-mode') === state.mode);
          });
        }
      }
      function applyWeatherPreset() {
        if (!state.weather) {
          setSliderUI('speed', 0, true);
          setSliderUI('gust', 0.45, true);
        } else if (state.mode === 'breezy') {
          setSliderUI('speed', 0.40, true);
          setSliderUI('gust', 0.45, true);
        } else {
          setSliderUI('speed', 0.95, true);
          setSliderUI('gust', 0.95, true);
        }
      }
      if (swWeather) {
        swWeather.addEventListener('click', function () {
          state.weather = !state.weather;
          syncWeatherUI();
          applyWeatherPreset();
        });
      }
      if (segWeather) {
        Array.prototype.forEach.call(segWeather.querySelectorAll('button'), function (b) {
          b.addEventListener('click', function () {
            state.mode = b.getAttribute('data-mode') || 'breezy';
            state.weather = true;
            syncWeatherUI();
            applyWeatherPreset();
          });
        });
      }

      function bindSlider(rng, kind) {
        if (!rng) return;
        var dragging = false;
        function updateFromEvent(e) {
          var rect = rng.getBoundingClientRect();
          var v = (e.clientX - rect.left) / Math.max(1, rect.width);
          if (state.weather) { state.weather = false; syncWeatherUI(); }
          setSliderUI(kind, v, false);
        }
        rng.addEventListener('pointerdown', function (e) { dragging = true; updateFromEvent(e); });
        window.addEventListener('pointermove', function (e) { if (dragging) updateFromEvent(e); });
        window.addEventListener('pointerup', function () { dragging = false; });
      }
      bindSlider(rngSpeed, 'speed');
      bindSlider(rngGust, 'gust');

      var segDir = document.getElementById('segDir');
      if (segDir) {
        Array.prototype.forEach.call(segDir.querySelectorAll('button'), function (b) {
          b.addEventListener('click', function () {
            state.dir = parseInt(b.getAttribute('data-dir') || '1', 10);
            Array.prototype.forEach.call(segDir.querySelectorAll('button'), function (x) { x.classList.toggle('on', x === b); });
          });
        });
      }

      var swSkeleton = document.getElementById('swSkeleton');
      if (swSkeleton) {
        swSkeleton.addEventListener('click', function () {
          state.skeleton = !state.skeleton;
          swSkeleton.classList.toggle('on', state.skeleton);
          swSkeleton.setAttribute('aria-pressed', String(state.skeleton));
        });
      }
      var swSound = document.getElementById('swSound');
      if (swSound) {
        swSound.addEventListener('click', function () {
          state.sound = !state.sound;
          swSound.classList.toggle('on', state.sound);
          swSound.setAttribute('aria-pressed', String(state.sound));
          if (state.sound) ensureAudio();
        });
      }

      var btnAll = document.getElementById('btnAllPlants'), btnOne = document.getElementById('btnOnePlant');
      function setSingle(flag) {
        state.single = flag;
        document.body.classList.toggle('single', flag);
        if (btnAll) btnAll.classList.toggle('on', !flag);
        if (btnOne) btnOne.classList.toggle('on', flag);
        worldLayout();
      }
      if (btnAll) btnAll.addEventListener('click', function () { setSingle(false); });
      if (btnOne) btnOne.addEventListener('click', function () { setSingle(true); });
      var prevPl = document.getElementById('dnpPrevPlant'), nextPl = document.getElementById('dnpNextPlant');
      if (prevPl) prevPl.addEventListener('click', function () { state.one = (state.one + 2) % 3; worldLayout(); });
      if (nextPl) nextPl.addEventListener('click', function () { state.one = (state.one + 1) % 3; worldLayout(); });

      /* Grow back */
      var growBtn = document.getElementById('dnpGrowBtn');
      function triggerGrowBack() {
        var now = performance.now() * 0.001;
        growingUntil = now + 1.8;
        hm.fill(0);
        document.body.classList.remove('bare');
        plants.forEach(function (pl) {
          if (!pl.vis) return;
          pl.cells.forEach(function (c) {
            if (!c.wood && c.st !== 0) {
              var hx = pl.ox + c.hx, hy = pl.oy + c.hy;
              if (c.st === 3) { c.x = hx + (Math.random() - 0.5) * 30; c.y = GY + 6; }
              c.fx = c.x; c.fy = c.y;
              var r = c.hy / pl.rows;
              c.t0 = now + (1 - r) * 0.65 + Math.random() * 0.35;
              c.du = 0.55 + Math.random() * 0.35;
              c.st = 4;
            }
          });
        });
      }
      if (growBtn) growBtn.addEventListener('click', triggerGrowBack);

      /* Preview Button Cycler (Storm Shake -> Skeleton + Breezy -> Grow Back) */
      var stormBtn = document.getElementById('dnpStormCycleBtn');
      var previewStep = 0;
      if (stormBtn) {
        stormBtn.addEventListener('click', function () {
          previewStep = (previewStep + 1) % 3;
          if (previewStep === 1) {
            state.mode = 'storm'; state.weather = true;
            syncWeatherUI(); applyWeatherPreset();
            plants.forEach(function (pl) { if (pl.vis) shakePlant(pl, 1, 1); });
          } else if (previewStep === 2) {
            state.skeleton = true;
            if (swSkeleton) { swSkeleton.classList.add('on'); swSkeleton.setAttribute('aria-pressed', 'true'); }
            state.mode = 'breezy'; state.weather = true;
            syncWeatherUI(); applyWeatherPreset();
          } else {
            state.skeleton = false;
            if (swSkeleton) { swSkeleton.classList.remove('on'); swSkeleton.setAttribute('aria-pressed', 'false'); }
            triggerGrowBack();
          }
        });
      }

      /* Gust noise + Windsock + Main Simulation Loop */
      function gustN(t) {
        return (Math.sin(1.31 * t) + Math.sin(2.17 * t + 1.3) + 0.8 * Math.sin(0.63 * t + 2.1) + 2.8) / 5.6;
      }

      function drawWindsock(t, w) {
        sockCtx.clearRect(0, 0, 28, 30);
        var isDark = document.body.classList.contains('dark');
        sockCtx.fillStyle = isDark ? '#9a8f80' : '#6b6258';
        sockCtx.fillRect(13, 1, 2, 29);
        sockCtx.fillRect(12, 28, 4, 2);
        var a = Math.min(1, Math.abs(w));
        var d = w < 0 ? -1 : 1;
        var ang = (1 - a) * 1.25;
        for (var i = 0; i < 5; i++) {
          var r = 2 + 2.4 * i;
          var fl = motionPaused ? 0 : Math.sin(10 * t - 1.2 * i) * a * 0.9;
          var dx = Math.cos(ang) * r;
          var y = 3 + Math.sin(ang) * r + fl;
          var h = Math.max(2, 4 - Math.floor(i / 2));
          sockCtx.fillStyle = (i % 2 === 0) ? '#e8573b' : '#f4efe6';
          var x = d > 0 ? 15 + dx : 9 - dx;
          sockCtx.fillRect(Math.round(x), Math.round(y - h / 2 + 1), 3, h);
        }
      }

      var lastT = performance.now() * 0.001;
      function frame(nowMs) {
        var now = nowMs * 0.001;
        var dt = Math.min(0.05, Math.max(0.001, now - lastT));
        lastT = now;

        ctx.fillStyle = getComputedStyle(document.body).backgroundColor || '#f2ebdf';
        ctx.fillRect(0, 0, CW, CH);

        var g = gustN(now);
        var w = motionPaused ? 0 : state.dir * (state.speed * 0.75 + state.speed * g * state.gust * 0.9 + state.gust * g * 0.12);
        var aw = Math.abs(w);
        var shedRate = (!motionPaused && state.speed > 0.15) ? Math.pow(state.speed, 2.4) * 0.045 * (0.35 + gustN(1.7 * now) * state.gust * 1.7) : 0;

        /* Sand mounds */
        mounds.forEach(function (mCells) {
          for (var i = 0; i < mCells.length; i++) {
            var mc = mCells[i];
            ctx.fillStyle = mc.col;
            ctx.fillRect(mc.x * C, mc.y * C, C, C);
          }
        });

        var anyBare = false, detachedThisFrame = 0;
        var isDark = document.body.classList.contains('dark');

        plants.forEach(function (pl) {
          if (!pl.vis) return;
          if (!motionPaused) {
            pl.kv += (-pl.k * 42 - pl.kv * 3.4) * dt;
            pl.k += pl.kv * dt;
          }
          var sway = motionPaused ? 0 : ((w * 0.55 + Math.sin(0.9 * now + pl.cx) * 0.05 + (aw > 0.05 ? Math.sin(3.1 * now + pl.cx) * aw * 0.12 : 0)) * pl.flex + pl.k * 0.55 * Math.max(0.25, pl.flex));
          var totalFol = 0, attFol = 0;

          for (var i = 0; i < pl.cells.length; i++) {
            var c = pl.cells[i];
            var hg = 1 - c.hy / pl.rows;
            if (!c.wood) totalFol++;

            if (c.st === 0) {
              if (!c.wood) {
                attFol++;
                var prob = shedRate * dt * (c.kind === 'spine' ? 0.25 : 1) * (0.2 + c.loose * 1.6) * (0.4 + hg);
                if (prob > 0 && Math.random() < prob) {
                  c.st = 1;
                  c.x = pl.ox + c.hx + c.sx;
                  c.y = pl.oy + c.hy + c.sy;
                  c.vx = w * 30 + (Math.random() - 0.5) * 8;
                  c.vy = -Math.random() * 6;
                  detachedThisFrame++;
                  continue;
                }
              }
              var ox = sway * Math.pow(hg, 1.7) * pl.rows * 0.14;
              var oy = 0;
              if (!c.wood && !motionPaused) {
                var arm = Math.pow(c.loose, 1.6) * (pl.flex > 0.3 ? 1 : 0.35);
                var rip = 0.65 + 0.35 * Math.sin(2.6 * now - c.hx * 0.18 + c.seed * 0.3);
                ox += w * aw * arm * pl.rows * 0.42 * rip + Math.sin(7 * now + c.seed) * arm * aw * 1.4;
                oy = -arm * aw * aw * 3 * rip;
              }
              c.sx = Math.round(ox); c.sy = Math.round(oy);
              if (c.bare && pl.bareK > 0.02) {
                var mr = Math.round(c.col[0] + (c.bare[0] - c.col[0]) * pl.bareK);
                var mg = Math.round(c.col[1] + (c.bare[1] - c.col[1]) * pl.bareK);
                var mb = Math.round(c.col[2] + (c.bare[2] - c.col[2]) * pl.bareK);
                ctx.fillStyle = 'rgb(' + mr + ',' + mg + ',' + mb + ')';
              } else {
                ctx.fillStyle = c.colStr;
              }
              ctx.fillRect((pl.ox + c.hx + c.sx) * C, (pl.oy + c.hy + c.sy) * C, C, C);
            } else if (c.st === 1) {
              if (!motionPaused) {
                var lt = c.kind === 'petal' ? 1.5 : c.kind === 'frond' ? 1.25 : c.kind === 'flesh' ? 0.95 : 0.6;
                var ax = w * 48 * lt + Math.sin(4.2 * now + c.ph) * 16 * lt;
                var ay = (c.kind === 'spine' ? 50 : 18) / lt;
                c.vx += (ax - c.vx * 1.6) * dt;
                c.vy += (ay - c.vy * 1.1) * dt;
                c.x += c.vx * dt + Math.sin(6 * now + c.ph) * 0.05 * lt;
                c.y += c.vy * dt;
                var colIdx = Math.round(c.x);
                if (c.x < -4 || c.x > gridCols + 4 || c.y > CH / C + 4) { c.st = 3; continue; }
                if (colIdx >= 0 && colIdx < gridCols && floorMask[colIdx] && c.y >= GY - hm[colIdx] && c.vy > 0) {
                  c.st = 2; c.x = colIdx; c.y = GY - hm[colIdx];
                  hm[colIdx] = Math.min(5, hm[colIdx] + 1);
                }
              }
              ctx.fillStyle = c.colStr;
              ctx.fillRect(Math.round(c.x) * C, Math.round(c.y) * C, C, C);
            } else if (c.st === 2) {
              if (!motionPaused && aw > 0.55 && Math.random() < (aw - 0.5) * dt * 1.4) {
                var lc = Math.round(c.x);
                if (lc >= 0 && lc < gridCols && hm[lc] > 0) hm[lc]--;
                c.st = 1; c.vx = w * 40; c.vy = -8 - Math.random() * 10;
              }
              ctx.fillStyle = c.colStr;
              ctx.fillRect(Math.round(c.x) * C, Math.round(c.y) * C, C, C);
            } else if (c.st === 4) {
              var hx2 = pl.ox + c.hx, hy2 = pl.oy + c.hy;
              if (now >= c.t0) {
                var e = Math.min(1, (now - c.t0) / c.du);
                var ez = 1 - Math.pow(1 - e, 3);
                c.x = c.fx + (hx2 - c.fx) * ez;
                c.y = c.fy + (hy2 - c.fy) * ez - Math.sin(e * Math.PI) * 8;
                if (e >= 1) { c.st = 0; c.sx = 0; c.sy = 0; }
              }
              ctx.fillStyle = c.colStr;
              ctx.fillRect(Math.round(c.x) * C, Math.round(c.y) * C, C, C);
            }
          }

          if (state.skeleton) {
            ctx.fillStyle = isDark ? '#ff6a4d' : '#c8382a';
            for (var k = 0; k < pl.cells.length; k++) {
              var wc = pl.cells[k];
              if (wc.wood && wc.st === 0) {
                ctx.fillRect((pl.ox + wc.hx + wc.sx) * C, (pl.oy + wc.hy) * C, C, C);
              }
            }
          }

          pl.bareK = totalFol ? (1 - attFol / totalFol) : 0;
          if (attFol < totalFol) anyBare = true;
        });

        if (now > growingUntil) {
          document.body.classList.toggle('bare', anyBare);
        }
        if (detachedThisFrame > 0) playRustle(detachedThisFrame);
        if (windGain && audioCtx) {
          var targetG = state.sound ? Math.min(0.5, aw * 0.45 + 0.01) : 0;
          windGain.gain.setTargetAtTime(targetG, audioCtx.currentTime, 0.25);
        }
        drawWindsock(now, w);
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    })();
  </script>
</body>
</html>`;
  }

  return null;
}
