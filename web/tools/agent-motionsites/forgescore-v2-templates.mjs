/**
 * ForgeScore v2.0 (100/100 FORGEFRAME_GOLD) Bespoke Template Builders
 * for MotionSites Daily Agent (digitwist-ai-builder, dot, email-marketing, transform-data, and v2.0 multi-variant compiler).
 */

export function buildForgeScoreV2Template(spec, p, cutoutImg, renderSharedMotionRuntime) {
  const slug = String(spec.slug || '').toLowerCase();

  // ============================================================================
  // NEWLY UPDATED MOTIONSITES PROMPT 1: DESIGN COLLAGE — "Orrin — Kinetic Art"
  // Scroll-scrubbed 3D WebGL/Canvas Gallery of 16 Live Website-Preview Videos
  // Opening sequence: Orrin wordmark rises -> "Kinetic" / "Art" split -> 150 cards
  // fly into a sine-wave ribbon -> burst into a 3-column 2-layer grid with a clear
  // center hole -> resting serif headline + Scroll down button + Credits popup.
  // ============================================================================
  if (slug === 'design-collage') {
    return `<!DOCTYPE html>
<html lang="en" class="locked" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Orrin — Kinetic Art</title>
  <meta name="description" content="Here's how the Orrin Motion Library is reshaping how web pages move, one frame at a time.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0a0b;
      --surface: #111113;
      --ink: #ece8e1;
      --mute: rgba(236, 232, 225, 0.55);
      --accent: #ece8e1;
      --accent-text: #ffffff;
      --accent-strong: #c9c5be;
      --on-accent: #0a0a0b;
      --glass-bg: rgba(28, 28, 31, 0.62);
      --border: rgba(236, 232, 225, 0.14);
      --font-display: "Newsreader", Georgia, serif;
      --font-sans: "Inter", system-ui, -apple-system, sans-serif;
      --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
      --progress: 0;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html {
      font-size: clamp(8.5px, 0.625vw, 12px);
      -webkit-font-smoothing: antialiased;
      font-synthesis: none;
      background: var(--bg);
      color: var(--ink);
      overflow-x: clip;
    }
    body {
      font-family: var(--font-sans);
      font-size: 1.5rem;
      background: var(--bg);
      color: var(--ink);
      touch-action: pan-y;
      overscroll-behavior: none;
      overflow-x: clip;
    }
    html.locked, html.locked body { overflow: hidden; }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px;
      background: var(--accent); color: var(--on-accent);
      font-weight: 600; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid #fff; outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 3px; }
    button:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums { font-variant-numeric: tabular-nums; }

    .${p}-track { height: 300lvh; position: relative; }
    .${p}-stage {
      position: fixed; inset: 0; height: 100lvh; overflow: hidden;
      background: radial-gradient(120% 90% at 50% 50%, #111113 0%, #0a0a0b 55%, #050506 100%);
    }
    .${p}-stage.hot canvas.${p}-gl { cursor: pointer; }
    canvas.${p}-gl { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }

    .textH1 {
      font-family: var(--font-display);
      font-weight: 400;
      font-variation-settings: "opsz" 72;
      letter-spacing: -0.03em;
      line-height: 1;
    }
    .textH2 {
      font-family: var(--font-display);
      font-weight: 400;
      font-variation-settings: "opsz" 72;
      font-size: clamp(3.2rem, 5.2vw, 6rem);
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    .textLabelS {
      font-family: var(--font-sans);
      font-weight: 400;
      font-size: 1.4rem;
      letter-spacing: -0.01em;
    }
    .blurredBg {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: var(--glass-bg);
      border-radius: 1.2rem;
      border: 1px solid var(--border);
    }

    .${p}-introTitle {
      position: absolute; left: 50%; top: 50%;
      transform: translate3d(-50%, -50%, 0) scale(0.8);
      display: flex; flex-direction: row; align-items: center; justify-content: center;
      white-space: nowrap; font-size: clamp(4rem, 7vw, 8rem);
      opacity: 0; pointer-events: none; z-index: 15; will-change: transform, opacity;
    }
    .${p}-introTitle .line1, .${p}-introTitle .line2 {
      display: inline-block; will-change: transform, opacity;
    }

    .${p}-breakoutWrap {
      position: absolute; inset: 0; width: 100%; height: 100lvh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      pointer-events: none; z-index: 20; will-change: transform;
    }
    .${p}-breakout {
      position: relative; top: -5%; width: min(90rem, 92%);
      display: flex; flex-direction: column; align-items: center; gap: 3rem;
      text-align: center; text-wrap: pretty; opacity: 0; transform: scale(0.8);
      will-change: transform, opacity;
    }
    .${p}-breakout__sub {
      font-weight: 500; width: min(44rem, 90%); color: var(--ink);
    }
    .${p}-breakout__text {
      color: var(--ink);
      text-shadow: 0 0 3rem rgba(10, 10, 11, 0.85);
    }
    .${p}-breakoutBtn {
      position: relative; z-index: 10; pointer-events: auto;
      display: inline-flex; flex-direction: row; align-items: center; gap: 1rem;
      padding: 1.5rem 2rem; margin-top: 3rem;
      font-family: var(--font-sans); font-weight: 500; font-size: 1.4rem;
      letter-spacing: -0.02em; color: var(--ink); background: transparent;
      border: none; cursor: pointer; visibility: hidden;
      transition: transform 0.35s var(--ease-out), opacity 0.35s var(--ease-out);
    }
    .${p}-breakoutBtn__bg {
      position: absolute; inset: 0; z-index: -1;
      border-radius: 1.2rem; background: var(--glass-bg);
      border: 1px solid var(--border);
      transition: transform 0.8s var(--ease-out);
    }
    .${p}-breakoutBtn:hover .${p}-breakoutBtn__bg { transform: scale(1.16); }

    .${p}-logos { position: fixed; inset: 0; pointer-events: none; z-index: 999; }
    .${p}-logoCenter, .${p}-logoLeft {
      position: fixed; pointer-events: auto; background: none; border: none;
      color: var(--ink); cursor: pointer; font-family: var(--font-display);
      font-variation-settings: "opsz" 72; letter-spacing: -0.02em;
      transition: opacity 0.8s var(--ease-out), transform 0.35s var(--ease-out);
    }
    .${p}-logoCenter {
      left: 50%; top: 50lvh;
      transform: translate3d(-50%, -50%, 0);
    }
    .${p}-logo__mark {
      display: flex; align-items: center; justify-content: center;
      width: 10rem; height: 4rem; font-size: 4.4rem;
    }
    .${p}-logoLeft {
      left: 2rem; top: 2rem; opacity: 0;
    }
    .${p}-logoLeft .${p}-logo__mark {
      width: 7.4rem; height: 3rem; font-size: 3.3rem; justify-content: flex-start;
    }
    .${p}-logos.showLeftLogo .${p}-logoCenter { opacity: 0; pointer-events: none; }
    .${p}-logos.showLeftLogo .${p}-logoLeft { opacity: 1; }

    .${p}-nav { position: fixed; inset: 0; z-index: 100; pointer-events: none; }
    .${p}-menuBtn {
      position: fixed; top: 2rem; right: 2rem; width: 4rem; height: 4rem;
      pointer-events: auto; border: none; background: transparent; cursor: pointer;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem;
    }
    .${p}-menuBtn::before {
      content: ""; position: absolute; inset: 0; border-radius: 1.2rem;
      background: var(--ink); z-index: -1;
      transition: transform 0.8s var(--ease-out), background-color 0.25s var(--ease-out);
    }
    .${p}-menuBtn:hover::before { transform: scale(1.1); }
    .${p}-menuBtn:active::before { background: var(--accent-strong); }
    .${p}-menuBtn span {
      display: block; width: 36%; height: 1.5px; background: var(--bg);
    }

    .${p}-dots {
      position: fixed; right: 2rem; top: 50%; transform: translateY(-50%);
      width: 4rem; height: 9rem; border-radius: 1rem;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem;
      pointer-events: auto;
    }
    .${p}-dot {
      width: 0.5rem; height: 0.5rem; border-radius: 0.25rem;
      background: rgba(236, 232, 225, 0.16); overflow: hidden; position: relative;
    }
    .${p}-dot.is-active { height: 3rem; }
    .${p}-dot__fill {
      position: absolute; inset: 0; background: var(--ink);
      transform-origin: top center;
      transform: scaleY(var(--progress));
    }

    .${p}-creditsPopup {
      position: fixed; right: 2rem; bottom: 2rem; z-index: 120;
      display: flex; align-items: flex-start; gap: 1.8rem;
      width: min(35.4rem, calc(100% - 3rem));
      padding: 1.6rem 3.4rem 1.6rem 1.6rem;
      opacity: 0; transform: scale(0.9); transform-origin: bottom right;
      pointer-events: none;
      transition: opacity 0.45s var(--ease-out), transform 0.65s var(--ease-out);
    }
    .${p}-creditsPopup.active {
      opacity: 1; transform: scale(1); pointer-events: auto;
    }
    .${p}-creditsPopup--tutorial {
      width: auto; padding: 1.8rem 3.2rem 1.8rem 2rem;
    }
    .${p}-creditsClose {
      position: absolute; top: 1.4rem; right: 1.4rem;
      width: 2.2rem; height: 2.2rem; border: none; background: transparent;
      color: var(--ink); cursor: pointer; display: grid; place-items: center;
    }
    .${p}-creditsThumb {
      width: 5.2rem; height: 5.2rem; border-radius: 0.6rem;
      overflow: hidden; flex-shrink: 0; background: #050506; border: 1px solid var(--border);
    }
    .${p}-creditsThumb video {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .${p}-creditsBody {
      font-size: 1.3rem; line-height: 1.35; color: var(--ink);
    }
    .${p}-creditsBody strong { display: block; font-weight: 500; font-size: 1.4rem; }
    .${p}-creditsBody .cat { color: var(--mute); margin-top: 0.2rem; display: block; }
    .${p}-creditsBody .desc { color: var(--mute); margin-top: 0.9rem; display: block; }
    .${p}-creditsBody a { color: var(--ink); text-decoration: underline; }

    .${p}-sr-sections {
      position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0);
    }

    @media (max-width: 900px) {
      html { font-size: 11px; }
      .${p}-introTitle { flex-direction: column; font-size: 4rem; }
      .${p}-breakout { width: min(30rem, 90%); gap: 2rem; }
      .${p}-breakout__sub { width: 18rem; }
      .${p}-breakout__text { font-size: 2.8rem; line-height: 1.05; }
      .${p}-menuBtn { right: 1rem; }
      .${p}-dots { right: 1rem; top: 45%; width: 2.4rem; height: 7rem; }
      .${p}-creditsPopup { left: 1.5rem; right: 1.5rem; bottom: 2.4rem; width: auto; transform-origin: bottom center; }
    }
    @media (max-width: 600px) {
      html { font-size: 10px; }
      .${p}-logo__mark { width: 6rem; height: 2.4rem; font-size: 2.4rem; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="${p}-logos" id="logoHeader">
    <button type="button" class="${p}-logoCenter" id="logoCenterBtn" aria-label="Orrin Home">
      <span class="${p}-logo__mark">Orrin</span>
    </button>
    <button type="button" class="${p}-logoLeft" id="logoLeftBtn" aria-label="Scroll to top">
      <span class="${p}-logo__mark">Orrin</span>
    </button>
    <nav class="${p}-nav" aria-label="Orrin Gallery Controls">
      <button type="button" class="${p}-menuBtn" id="motionToggleBtn" aria-label="Toggle motion playback" aria-pressed="false">
        <span></span>
        <span></span>
      </button>
      <div class="${p}-dots blurredBg" role="navigation" aria-label="Scroll progress">
        <div class="${p}-dot is-active"><div class="${p}-dot__fill" id="navDotFill"></div></div>
        <div class="${p}-dot"></div>
        <div class="${p}-dot"></div>
      </div>
    </nav>
  </header>

  <main id="main-content" class="${p}-track">
    <section class="${p}-stage" id="heroStage" aria-label="Orrin Kinetic Art 3D Video Collage">
      <canvas class="${p}-gl" id="orrinCanvas" aria-label="Interactive 3D video collage"></canvas>

      <h1 class="${p}-introTitle textH1" id="introTitle">
        <span class="line1" id="introLine1">Kinetic</span><span class="line2" id="introLine2">Art</span>
      </h1>

      <div class="${p}-breakoutWrap" id="breakoutWrap">
        <div class="${p}-breakout" id="breakoutBox">
          <p class="${p}-breakout__sub textLabelS">Hundreds of Designs, Rendered in Living Motion</p>
          <h2 class="${p}-breakout__text textH2">Here's how the Orrin Motion Library is reshaping how web pages move, one frame at a time.</h2>
        </div>
        <button type="button" class="${p}-breakoutBtn" id="scrollDownBtn" data-next-preview="true">
          <span class="${p}-breakoutBtn__bg"></span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
            <path d="M7.5 1.5v12M2.5 8.5l5 5 5-5"/>
          </svg>
          <span>Scroll down</span>
        </button>
      </div>

      <aside class="${p}-creditsPopup ${p}-creditsPopup--tutorial blurredBg" id="creditsPopup" aria-live="polite">
        <p class="textLabelS" id="tutorialText" style="color:var(--mute);">Click on any design to learn more.</p>
      </aside>
    </section>

    <section class="${p}-sr-sections" aria-label="Orrin Library Highlights">
      <article><h3>Card Stack — Portfolio</h3><p class="tabular-nums">01 / 16 Live WebGL Showcase</p></article>
      <article><h3>Flower Valley — 3D</h3><p class="tabular-nums">02 / 16 Interactive Scene</p></article>
      <article><h3>Robot Jellyfish — 3D</h3><p class="tabular-nums">03 / 16 Field Simulator</p></article>
      <article><h3>Runway Lookbook — Interactive</h3><p class="tabular-nums">09 / 16 Depth Lookbook</p></article>
    </section>
  </main>

  <footer class="${p}-sr-sections">
    <span class="tabular-nums">Orrin Motion Library — 150 Kinetic Video Plates · 60 FPS</span>
  </footer>

  <script>
    (function () {
      var CLIPS = [
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/card-stack-hero.mp4", title: "Card Stack", cat: "Portfolio", id: "card-stack" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/fernhollow.mp4", title: "Flower Valley", cat: "3D", id: "fernhollow" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/medusa-jellyfish-hero.mp4", title: "Robot Jellyfish", cat: "3D", id: "medusa-jellyfish-hero" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/halftone-recap.mp4", title: "Year Recap", cat: "Portfolio", id: "" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/lumen-roof-hero.mp4", title: "Solar Fog", cat: "Interactive", id: "lumen-roof-hero" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/living-portrait-hero.mp4", title: "Living Portrait", cat: "Portfolio", id: "living-portrait-hero" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/wyrmfall.mp4", title: "Dragon Knight", cat: "3D", id: "" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/found-spider.mp4", title: "Spider Web", cat: "Interactive", id: "found-spider" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vell-lookbook.mp4", title: "Runway Lookbook", cat: "Interactive", id: "vell-lookbook" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/nously-brain.mp4", title: "Particle Brain", cat: "3D", id: "" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vante-ribbon-hero.mp4", title: "Video Ribbon", cat: "Portfolio", id: "vante-ribbon-hero" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/mossline-hero.mp4", title: "Moss Island", cat: "SaaS", id: "moss-island" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/orbe-future-mode.mp4", title: "Future Fashion", cat: "Fashion", id: "future-fashion" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/driftlab-hero.mp4", title: "Jellyfish Scroll", cat: "Interactive", id: "driftlab-hero" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/aurelis-infinite-gallery.mp4", title: "Infinite Gallery", cat: "Interactive", id: "" },
        { url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vhs-arc-hero.mp4", title: "VHS Archive", cat: "Portfolio", id: "vhs-archive" }
      ];

      function mulberry32(a) {
        return function () {
          var t = a += 0x6D2B79F5;
          t = Math.imul(t ^ (t >>> 15), t | 1);
          t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
      }

      function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
      function lerp(a, b, k) { return a + (b - a) * k; }
      function p2Out(x) { var u = clamp(x, 0, 1); return 1 - Math.pow(1 - u, 3); }
      function p2InOut(x) { var u = clamp(x, 0, 1); return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; }
      function p3InOut(x) { var u = clamp(x, 0, 1); return u < 0.5 ? 8 * u * u * u * u : 1 - Math.pow(-2 * u + 2, 4) / 2; }
      function sineInOut(x) { var u = clamp(x, 0, 1); return -(Math.cos(Math.PI * u) - 1) / 2; }

      var videos = CLIPS.map(function (c, i) {
        var v = document.createElement("video");
        v.crossOrigin = "anonymous";
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("muted", "");
        v.preload = "auto";
        v.src = c.url;
        setTimeout(function () {
          v.play().catch(function () {});
        }, i * 60);
        return v;
      });

      var canvas = document.getElementById("orrinCanvas");
      var ctx = canvas.getContext("2d");
      var stage = document.getElementById("heroStage");
      var logoHeader = document.getElementById("logoHeader");
      var logoCenterBtn = document.getElementById("logoCenterBtn");
      var logoLeftBtn = document.getElementById("logoLeftBtn");
      var introTitle = document.getElementById("introTitle");
      var introLine1 = document.getElementById("introLine1");
      var introLine2 = document.getElementById("introLine2");
      var breakoutWrap = document.getElementById("breakoutWrap");
      var breakoutBox = document.getElementById("breakoutBox");
      var scrollDownBtn = document.getElementById("scrollDownBtn");
      var creditsPopup = document.getElementById("creditsPopup");
      var motionBtn = document.getElementById("motionToggleBtn");

      var W = window.innerWidth, H = window.innerHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
      var isMobile = W < 900;
      var cards = [];
      var motionPaused = false;
      var openedDesign = false;
      var tutorialShown = false;

      var params = new URLSearchParams(window.location.search);
      var frozenT = params.has("t") ? parseFloat(params.get("t")) : null;

      function buildCollage() {
        isMobile = W < 900;
        var rand = mulberry32(20261108);
        var cols = 3, rows = isMobile ? 30 : 25, layers = 2;
        var count = cols * rows * layers;
        var xSp = isMobile ? 1.7 : 2.8;
        var ySp = isMobile ? 1.5 : 1.3;
        var zSp = 1.0;
        var minSz = isMobile ? 0.5 : 0.7, maxSz = isMobile ? 0.8 : 1.0;
        var width = (cols - 1) * xSp;
        var gridHeight = (rows - 1) * ySp;
        var G = -width / 2 - xSp / 2;

        var clipOrder = [];
        for (var c = 0; c < 16; c++) clipOrder.push(c);
        for (var i = 15; i > 0; i--) {
          var r = Math.floor(rand() * (i + 1));
          var tmp = clipOrder[i]; clipOrder[i] = clipOrder[r]; clipOrder[r] = tmp;
        }

        var shuf = [];
        for (var j = 0; j < count; j++) shuf.push(j);
        for (var k = count - 1; k > 0; k--) {
          var rk = Math.floor(rand() * (k + 1));
          var tk = shuf[k]; shuf[k] = shuf[rk]; shuf[rk] = tk;
        }
        var shufRank = new Array(count);
        for (var s = 0; s < count; s++) shufRank[shuf[s]] = s;

        var mid = Math.floor(count / 2);
        cards = [];
        for (var idx = 0; idx < count; idx++) {
          var col = idx % cols;
          var row = Math.floor((idx % (cols * rows)) / cols);
          var layer = Math.floor(idx / (cols * rows));
          var gx = col * xSp + (row % 2 === 1 ? xSp / 2 : 0) + (layer % 2 === 1 ? xSp / 2 : 0) + G;
          var gy = -row * ySp + (col % 2 === 1 ? ySp * 0.3 : 0) + (layer % 2 === 1 ? ySp / 2 : 0) + (isMobile ? 0.7 : 0);
          var gz = -layer * zSp;

          var At = mid - Math.abs(idx - mid);
          var xe = idx / count;
          var rx = isMobile ? Math.sin(2 * Math.PI * xe) * 0.35 : lerp(-1.5, 1.5, xe) + 0.5;
          var ry = isMobile ? lerp(-1, 1, xe) + 0.05 : Math.sin(2 * Math.PI * xe) * 0.7;
          var rz = gz * 0.01 - At * 0.005;

          cards.push({
            idx: idx,
            clipIdx: clipOrder[idx % 16],
            layer: layer,
            gx: gx, gy: gy, gz: gz,
            rx: rx, ry: ry, rz: rz,
            holderScale: lerp(minSz, maxSz, rand()),
            hoverScale: 1,
            rollover: 0,
            d1: -0.1 + At * 0.008 + 0.2,
            d2: 2.1 + shufRank[idx] * 0.003,
            gridHeight: gridHeight,
            screenBox: null
          });
        }
      }

      function onResize() {
        var prevMobile = isMobile;
        W = window.innerWidth; H = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        if (!cards.length || (W < 900) !== prevMobile) buildCollage();
      }
      onResize();
      window.addEventListener("resize", onResize, { passive: true });

      var camX = 0, camY = 0, velX = 0, velY = 0, targetCamX = 0, targetCamY = 0;
      var pointerX = -9999, pointerY = -9999;
      var hoveredCard = null;
      var smoothScroll = 0, collageScroll = 0;

      window.addEventListener("pointermove", function (e) {
        pointerX = e.clientX;
        pointerY = e.clientY;
        if (!isMobile) {
          targetCamX = lerp(-0.25, 0.25, e.clientX / Math.max(1, W));
          targetCamY = lerp(0.25, -0.25, e.clientY / Math.max(1, H));
        }
      }, { passive: true });

      function showCreditCard(clipIdx) {
        var c = CLIPS[clipIdx];
        if (!c) return;
        openedDesign = true;
        var linkHref = c.id ? ("https://motionsites.ai/?prompt=" + encodeURIComponent(c.id)) : "https://motionsites.ai/";
        creditsPopup.classList.remove("${p}-creditsPopup--tutorial");
        creditsPopup.innerHTML =
          '<button type="button" class="${p}-creditsClose" id="closeCreditBtn" aria-label="Close credit card">' +
            '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11"/></svg>' +
          '</button>' +
          '<a class="${p}-creditsThumb" href="' + linkHref + '" target="_blank" rel="noopener noreferrer">' +
            '<video src="' + c.url + '" autoplay loop muted playsinline></video>' +
          '</a>' +
          '<div class="${p}-creditsBody">' +
            '<strong>' + c.title + '</strong>' +
            '<span class="cat">' + c.cat + ' · Orrin Motion Library</span>' +
            '<span class="desc"><a href="' + linkHref + '" target="_blank" rel="noopener noreferrer">Open the prompt</a>, a live motion design, free to remix</span>' +
          '</div>';
        creditsPopup.classList.add("active");
        var closeBtn = document.getElementById("closeCreditBtn");
        if (closeBtn) {
          closeBtn.addEventListener("click", function (ev) {
            ev.stopPropagation();
            creditsPopup.classList.remove("active");
          });
        }
      }

      canvas.addEventListener("click", function () {
        if (hoveredCard) {
          showCreditCard(hoveredCard.clipIdx);
        } else if (cards.length) {
          showCreditCard(cards[0].clipIdx);
        }
      });

      scrollDownBtn.addEventListener("click", function () {
        document.documentElement.classList.remove("locked");
        window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
        showCreditCard(0);
      });

      function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }
      logoCenterBtn.addEventListener("click", scrollToTop);
      logoLeftBtn.addEventListener("click", scrollToTop);

      motionBtn.addEventListener("click", function () {
        motionPaused = !motionPaused;
        document.documentElement.setAttribute("data-motion", motionPaused ? "paused" : "on");
        motionBtn.setAttribute("aria-pressed", String(motionPaused));
        videos.forEach(function (v) {
          if (motionPaused) v.pause();
          else v.play().catch(function () {});
        });
      });

      var startClock = performance.now();
      var lastFrame = startClock;

      function render(now) {
        var dt = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000));
        lastFrame = now;
        var t = frozenT !== null ? frozenT : (now - startClock) / 1000;

        if (t >= 4.5 && document.documentElement.classList.contains("locked")) {
          document.documentElement.classList.remove("locked");
        }
        if (t >= 6.5 && !tutorialShown && !openedDesign) {
          tutorialShown = true;
          creditsPopup.classList.add("active");
        }

        // Intro DOM choreography
        var logoProg = p2InOut(t / 1.5);
        logoCenterBtn.style.transform = "translate3d(-50%, calc(-50% - " + (logoProg * 45).toFixed(2) + "vh), 0)";

        var titleIn = p3InOut((t - 0.1) / 1.5);
        var titleOut = t >= 2.2 ? (1 - p2InOut((t - 2.2) / 0.5)) : 1;
        introTitle.style.opacity = (titleIn * titleOut).toFixed(3);
        introTitle.style.transform = "translate3d(-50%, -50%, 0) scale(" + lerp(0.8, 1, titleIn).toFixed(3) + ")";
        var splitProg = p2InOut(t / 1.5);
        if (isMobile) {
          introLine1.style.transform = "translate3d(0, " + (-30 * splitProg).toFixed(2) + "vh, 0)";
          introLine2.style.transform = "translate3d(0, " + (28 * splitProg).toFixed(2) + "vh, 0)";
        } else {
          introLine1.style.transform = "translate3d(" + (-41 * splitProg).toFixed(2) + "vh, 0, 0)";
          introLine2.style.transform = "translate3d(" + (50 * splitProg).toFixed(2) + "vh, 0, 0)";
        }

        if (t >= 3.5) {
          var brkIn = p2Out((t - 3.5) / 1.5);
          scrollDownBtn.style.visibility = "visible";
          var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          var rawP = document.documentElement.classList.contains("locked") ? 0 : clamp(window.scrollY / maxScroll, 0, 1);
          smoothScroll += (rawP - smoothScroll) * 0.1;
          var ST = smoothScroll * 4.5;
          var scrollFade = clamp(1 - ST, 0, 1);
          breakoutBox.style.opacity = Math.min(brkIn, scrollFade).toFixed(3);
          breakoutBox.style.transform = "scale(" + lerp(0.8, 1, brkIn).toFixed(3) + ")";
          breakoutWrap.style.transform = "translate3d(0, " + (-clamp(ST, 0, 1) * 75).toFixed(2) + "vh, 0)";
          document.documentElement.style.setProperty("--progress", smoothScroll.toFixed(3));
          logoHeader.classList.toggle("showLeftLogo", window.scrollY > 50);
        }

        var ST2 = smoothScroll * 4.5;
        var camZ = lerp(5, 4, p2Out(ST2 / 1.5));
        var dimFactor = sineInOut((ST2 - 1) / 1.0);
        var gridH = cards.length ? cards[0].gridHeight : 30;
        var secProg = clamp((ST2 / 18.8) / 0.7, 0, 1) * gridH;
        collageScroll += (secProg - collageScroll) * 0.3;

        var effTargetX = t >= 4.5 ? targetCamX : 0;
        var effTargetY = t >= 4.5 ? targetCamY : 0;
        var ax = -100 * (camX - effTargetX) - 30 * velX;
        var ay = -100 * (camY - effTargetY) - 30 * velY;
        velX += ax * dt; velY += ay * dt;
        camX += velX * dt; camY += velY * dt;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        var fovRad = (45 * Math.PI) / 180;
        var focal = (H * 0.5) / Math.tan(fovRad * 0.5);
        var startX = isMobile ? 0 : 0.5;
        var repelR = isMobile ? 0.46 : 1.0;
        var ribScale = isMobile ? 0.4 : 0.5;
        var dimThresh = isMobile ? 0.5 : 1.0;

        var drawList = [];
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          var k1 = p2InOut((t - card.d1) / 1.5);
          var k2 = p2InOut((t - card.d2) / 2.0);
          var introScale = lerp(lerp(0, ribScale, k1), 1, k2);
          if (introScale < 0.01) continue;

          var sx = card.gx;
          var sy = card.gy + collageScroll;
          var sz = card.gz;

          var fx = sx - 0;
          var fy = sy - (0.93 + collageScroll);
          if (Math.abs(fx) < 0.1) fx = 0.1;
          var flen = Math.hypot(fx, fy) || 1;
          var rxRest = sx + (fx / flen) * repelR;
          var ryRest = sy + (fy / flen) * repelR;

          var px = lerp(lerp(startX, card.rx, k1), rxRest, k2);
          var py = lerp(lerp(0, card.ry, k1), ryRest, k2);
          var pz = lerp(lerp(0, card.rz, k1), sz, k2);

          var relX = px - camX;
          var relY = py - camY;
          var relZ = camZ - pz;
          if (relZ <= 0.2) continue;

          var projScale = focal / relZ;
          var screenX = W * 0.5 + relX * projScale;
          var screenY = H * 0.5 - relY * projScale;

          var isHit = (hoveredCard === card);
          var targetHov = isHit ? 1.1 : 1.0;
          card.hoverScale += (targetHov - card.hoverScale) * 0.18;
          card.rollover += ((isHit ? 1 : 0) - card.rollover) * 0.22;

          var totalScale = introScale * card.holderScale * card.hoverScale;
          var cardW = projScale * totalScale;
          var cardH = cardW * (10 / 16);

          if (screenX + cardW < -40 || screenX - cardW > W + 40 || screenY + cardH < -40 || screenY - cardH > H + 40) {
            card.screenBox = null;
            continue;
          }

          card.screenBox = {
            x: screenX - cardW * 0.5,
            y: screenY - cardH * 0.5,
            w: cardW,
            h: cardH,
            pz: pz,
            dimmed: Math.abs(card.gx) <= dimThresh ? dimFactor : 0
          };
          drawList.push(card);
        }

        drawList.sort(function (a, b) {
          if (a === hoveredCard) return 1;
          if (b === hoveredCard) return -1;
          return a.screenBox.pz - b.screenBox.pz;
        });

        var nextHover = null;
        for (var d = 0; d < drawList.length; d++) {
          var c = drawList[d];
          var b = c.screenBox;
          var depthFactor = clamp((b.pz - (-1.0)) / 0.5, 0, 1);

          if (c.layer === 1 && depthFactor < 0.15) {
            ctx.fillStyle = "rgba(18, 18, 22, 0.72)";
            ctx.fillRect(b.x, b.y, b.w, b.h);
          } else {
            var vid = videos[c.clipIdx];
            if (vid && vid.readyState >= 2) {
              ctx.save();
              var alpha = clamp(0.25 + depthFactor * 0.75, 0, 1) * (1 - b.dimmed * 0.45 * (1 - c.rollover));
              ctx.globalAlpha = alpha;
              ctx.drawImage(vid, b.x, b.y, b.w, b.h);
              ctx.restore();
            } else {
              ctx.fillStyle = "rgba(32, 32, 38, 0.85)";
              ctx.fillRect(b.x, b.y, b.w, b.h);
            }
          }

          if (t >= 4.0 && c.layer === 0 && pointerX >= b.x && pointerX <= b.x + b.w && pointerY >= b.y && pointerY <= b.y + b.h) {
            nextHover = c;
          }
        }
        hoveredCard = nextHover;
        stage.classList.toggle("hot", Boolean(hoveredCard));

        if (!motionPaused) {
          requestAnimationFrame(render);
        }
      }
      requestAnimationFrame(render);
    })();
  </script>
</body>
</html>`;
  }

  // ============================================================================
  // NEWLY UPDATED MOTIONSITES PROMPT 2: PINK RIDER — "Mina Hwang-Seo — Pink Rider"
  // Baby-pink hero (#fdeef3) with dual opposing marquees ("Dream Ride Sparkle" &
  // "Ride Pretty Stay Bolder") behind a Korean woman figure. Pointer/auto-sweep
  // paints a multi-lobe organic brush trail that erases the FRONT image (white
  // ribbed top) and reveals the BACK image (pink motorcycle helmet & racing jacket).
  // ============================================================================
  if (slug === 'pink-rider') {
    const frontUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261103_152350_4fd91a2b-94c2-4b86-834f-3b7f9a716d5b.png';
    const backUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261103_152354_98c21034-6558-4210-a810-8232cf9d2557.png';
    return `<!DOCTYPE html>
<html lang="en" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Mina Hwang-Seo — Pink Rider</title>
  <meta name="description" content="Hover to reveal the pink rider.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #fdeef3;
      --bg-2: #fbe3eb;
      --ink: #141114;
      --muted: #7a6870;
      --ghost: #d6c3ca;
      --accent: #ff7fab;
      --accent-ink: #ffffff;
      --accent-text: #b8295c;
      --accent-strong: #ff6a9c;
      --on-accent: #ffffff;
      --font-sans: "Inter Tight", system-ui, -apple-system, "Segoe UI", sans-serif;
      --gutter: clamp(16px, 2.4vw, 32px);
      --ease: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--accent-ink); }
    html, body {
      height: 100%;
      background: var(--bg);
      color: var(--ink);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: clip;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px;
      background: var(--ink); color: #ffffff;
      font-weight: 600; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--accent); outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
    button:active, .links .cta:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums { font-variant-numeric: tabular-nums; }

    .nav {
      position: fixed; inset: 0 0 auto 0; z-index: 20;
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--gutter);
    }
    .brand {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; color: var(--ink);
      font-weight: 500; font-size: 15px; letter-spacing: -0.01em;
    }
    .brand-mark {
      width: 34px; height: 34px; border-radius: 9px;
      background: var(--accent); display: grid; place-items: center;
    }
    .brand-mark svg { width: 18px; height: 18px; }
    .links {
      display: flex; align-items: center; gap: clamp(14px, 2vw, 28px);
    }
    .links a {
      color: var(--muted); text-decoration: none; font-size: 14px;
      transition: color 0.2s var(--ease);
    }
    .links a:hover { color: var(--ink); }
    .links .cta {
      background: var(--accent); color: var(--accent-ink);
      font-weight: 500; padding: 10px 18px; border-radius: 10px;
      display: inline-flex; gap: 6px; align-items: center;
      border: none; cursor: pointer; font-family: inherit; font-size: 14px;
      transition: transform 0.2s var(--ease), background-color 0.2s var(--ease);
    }
    .links .cta:hover { color: #ffffff; background: var(--accent-strong); transform: translateY(-1px); }

    .hero {
      position: relative; height: 100vh; height: 100svh; min-height: 560px;
      overflow: hidden; touch-action: pan-y; cursor: none;
      background:
        radial-gradient(60% 55% at 50% 45%, #fff6f9 0%, rgba(255, 246, 249, 0) 70%),
        linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%);
    }

    .marquees {
      position: absolute; left: 0; right: 0; top: 50%;
      transform: translateY(-58%); z-index: 1;
      pointer-events: none; user-select: none;
      display: flex; flex-direction: column; gap: clamp(4px, 1.2vw, 18px);
    }
    .row {
      display: flex; width: max-content; white-space: nowrap; will-change: transform;
    }
    .row span {
      font-size: clamp(54px, 9.6vw, 168px); line-height: 1;
      letter-spacing: -0.035em; text-transform: uppercase; padding-right: 0.3em;
    }
    .row.ghost span { color: var(--ghost); font-weight: 400; }
    .row.solid span { color: var(--ink); font-weight: 500; }
    .row.ghost { animation: ${p}SlideL 38s linear infinite; }
    .row.solid { animation: ${p}SlideR 32s linear infinite; }
    @keyframes ${p}SlideL { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes ${p}SlideR { from { transform: translateX(-50%); } to { transform: translateX(0); } }

    .figure {
      position: absolute; left: 50%; bottom: 0; z-index: 2;
      height: min(94svh, 133vw); aspect-ratio: 3 / 4;
      transform: translateX(-50%); pointer-events: none;
    }
    .figure canvas {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; object-position: center bottom; display: block;
      opacity: 0; transition: opacity 0.8s var(--ease);
    }
    .figure canvas.ready { opacity: 1; }

    .cursor {
      position: fixed; left: 0; top: 0; z-index: 30;
      pointer-events: none; width: 14px; height: 14px;
      margin: -7px 0 0 -7px; border-radius: 50%;
      background: var(--accent); opacity: 0;
      transition: opacity 0.25s var(--ease), transform 0.2s var(--ease);
    }
    .hero:hover ~ .cursor, .cursor.on { opacity: 1; }

    .hint {
      position: absolute; left: var(--gutter); bottom: var(--gutter); z-index: 3;
      font-size: 13px; color: var(--muted);
      display: flex; align-items: center; gap: 8px;
    }
    .hint i {
      width: 8px; height: 8px; border-radius: 50%; background: var(--accent); display: inline-block;
    }
    .tag {
      position: absolute; right: var(--gutter); bottom: var(--gutter); z-index: 3;
      font-size: 12px; color: var(--ink);
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      padding: 8px 12px; border-radius: 999px;
      border: none; cursor: pointer; font-family: inherit;
      transition: transform 0.2s var(--ease);
    }

    .${p}-sr-only {
      position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);
    }

    @media (max-width: 900px) {
      .marquees { transform: translateY(-60%); }
    }
    @media (max-width: 720px) {
      .links a:not(.cta) { display: none; }
      .links .cta { padding: 9px 14px; font-size: 13px; }
      .brand { font-size: 14px; }
      .brand-mark { width: 30px; height: 30px; border-radius: 8px; }
      .hero { cursor: auto; }
      .marquees { transform: translateY(-62%); }
      .figure { height: auto; width: min(160%, 64svh); }
      .tag { display: none; }
      .hint {
        left: 50%; transform: translateX(-50%); bottom: 18px;
        background: rgba(255, 255, 255, 0.75); padding: 8px 12px;
        border-radius: 999px; color: var(--ink); white-space: nowrap;
      }
    }
    @media (hover: none) { .cursor { display: none; } }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="nav">
    <a class="brand" href="#hero">
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>
        </svg>
      </span>
      <span>Mina Hwang-Seo</span>
    </a>
    <nav class="links" aria-label="Primary Navigation">
      <a href="#hero">Rides</a>
      <a href="#hero">Lookbooks</a>
      <a href="#hero">Journal</a>
      <button type="button" class="cta" id="suitUpBtn" data-next-preview="true">
        <span>Say hi!</span>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 11L11 3M5 3h6v6"/>
        </svg>
      </button>
    </nav>
  </header>

  <main id="main-content">
    <section class="hero" id="hero" aria-label="Hover to reveal the pink rider">
      <h1 class="${p}-sr-only">Mina Hwang-Seo — Pink Rider Interactive Lookbook</h1>
      <div class="marquees" aria-hidden="true">
        <div class="row ghost">
          <span>Dream Ride Sparkle</span><span>Dream Ride Sparkle</span><span>Dream Ride Sparkle</span><span>Dream Ride Sparkle</span>
        </div>
        <div class="row solid">
          <span>Ride Pretty Stay Bolder</span><span>Ride Pretty Stay Bolder</span><span>Ride Pretty Stay Bolder</span><span>Ride Pretty Stay Bolder</span>
        </div>
      </div>
      <div class="figure" id="figure" role="img" aria-label="Korean rider in white ribbed top transforming into pink motorcycle helmet and racing jacket">
        <canvas id="reveal" aria-hidden="true"></canvas>
      </div>
      <p class="hint"><i></i><span id="hintText">Move your cursor to suit up</span></p>
      <button type="button" class="tag tabular-nums" id="motionToggleBtn" aria-pressed="false">Pink Rider · SS27</button>
    </section>

    <section class="${p}-sr-only" aria-label="Lookbook Specifications">
      <article><h2>01 / Helmet Shell</h2><p class="tabular-nums">Glossy Baby-Pink Polycarbonate · Iridescent Visor</p></article>
      <article><h2>02 / Racing Jacket</h2><p class="tabular-nums">SS27 Lambskin Leather · White Stripes &amp; Heart Patches</p></article>
      <article><h2>03 / Brush Trail Engine</h2><p class="tabular-nums">1100 ms Stamp Lifetime · Multi-Lobe Composite Mask</p></article>
      <article><h2>04 / Lookbook Edition</h2><p class="tabular-nums">Mina Hwang-Seo Archive · Seoul Studio</p></article>
    </section>
  </main>
  <div class="cursor" id="cursor" aria-hidden="true"></div>

  <footer class="${p}-sr-only">
    <span class="tabular-nums">© 2026 Mina Hwang-Seo · Pink Rider SS27</span>
  </footer>

  <script>
    (function () {
      var FRONT_URL = ${JSON.stringify(frontUrl)};
      var BACK_URL = ${JSON.stringify(backUrl)};
      var hero = document.getElementById("hero");
      var figure = document.getElementById("figure");
      var canvas = document.getElementById("reveal");
      var ctx = canvas.getContext("2d");
      var cursor = document.getElementById("cursor");
      var hintText = document.getElementById("hintText");
      var suitUpBtn = document.getElementById("suitUpBtn");
      var motionBtn = document.getElementById("motionToggleBtn");

      var mask = document.createElement("canvas");
      var mctx = mask.getContext("2d");
      var buf = document.createElement("canvas");
      var bctx = buf.getContext("2d");

      var touchMQ = window.matchMedia("(hover: none), (pointer: coarse)");
      var coarse = false;
      function syncTouch() {
        coarse = touchMQ.matches;
        if (hintText) {
          hintText.textContent = coarse ? "Drag to suit up" : "Move your cursor to suit up";
        }
      }
      syncTouch();
      if (touchMQ.addEventListener) touchMQ.addEventListener("change", syncTouch);

      var front = new Image();
      front.crossOrigin = "anonymous";
      var back = new Image();
      back.crossOrigin = "anonymous";
      var frontReady = false, backReady = false;

      front.onload = function () {
        frontReady = true;
        canvas.classList.add("ready");
      };
      back.onload = function () {
        backReady = true;
      };
      front.src = FRONT_URL;
      back.src = BACK_URL;

      var W = 400, H = 540, dpr = 1;
      function resize() {
        var r = figure.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = Math.max(1, r.width);
        H = Math.max(1, r.height);
        var cw = Math.round(W * dpr);
        var ch = Math.round(H * dpr);
        canvas.width = mask.width = buf.width = cw;
        canvas.height = mask.height = buf.height = ch;
      }
      resize();
      window.addEventListener("resize", resize, { passive: true });

      var LIFE = 1100;
      var stamps = [];
      var last = null;
      var lastMove = 0;
      var autoT = 0;
      var lastAutoPt = null;
      var motionPaused = false;

      function addStamp(x, y, now) {
        var base = Math.max(W, 260) * (coarse ? 0.15 : 0.12);
        var n = 3 + Math.floor(Math.random() * 3);
        var lobes = [];
        for (var i = 0; i < n; i++) {
          var ang = Math.random() * Math.PI * 2;
          var dist = Math.random() * base * 0.45;
          lobes.push({
            dx: Math.cos(ang) * dist,
            dy: Math.sin(ang) * dist,
            r: base * (0.45 + Math.random() * 0.55)
          });
        }
        stamps.push({ x: x, y: y, t: now, lobes: lobes });
      }

      function pointerTo(clientX, clientY, now) {
        var r = figure.getBoundingClientRect();
        var x = clientX - r.left;
        var y = clientY - r.top;
        if (last) {
          var dx = x - last.x, dy = y - last.y;
          var dist = Math.hypot(dx, dy);
          var step = Math.max(W, 260) * 0.04;
          var count = Math.min(40, Math.floor(dist / step));
          for (var i = 1; i <= count; i++) {
            var k = i / (count + 1);
            addStamp(last.x + dx * k, last.y + dy * k, now);
          }
        }
        addStamp(x, y, now);
        last = { x: x, y: y };
        lastMove = now;
      }

      hero.addEventListener("pointermove", function (e) {
        var now = performance.now();
        pointerTo(e.clientX, e.clientY, now);
        cursor.style.transform = "translate3d(" + e.clientX + "px, " + e.clientY + "px, 0)";
        cursor.classList.add("on");
      });
      hero.addEventListener("pointerleave", function () {
        last = null;
        cursor.classList.remove("on");
      });
      hero.addEventListener("pointerdown", function (e) {
        pointerTo(e.clientX, e.clientY, performance.now());
      });

      if (suitUpBtn) {
        suitUpBtn.addEventListener("click", function () {
          var now = performance.now();
          for (var i = 0; i < 9; i++) {
            var k = i / 8;
            addStamp(W * (0.35 + Math.sin(k * Math.PI) * 0.3), H * (0.22 + k * 0.52), now);
          }
        });
      }

      if (motionBtn) {
        motionBtn.addEventListener("click", function () {
          motionPaused = !motionPaused;
          document.documentElement.setAttribute("data-motion", motionPaused ? "paused" : "on");
          motionBtn.setAttribute("aria-pressed", String(motionPaused));
        });
      }

      function drawCover(c, img) {
        var cw = canvas.width, ch = canvas.height;
        var iw = img.naturalWidth || 1536, ih = img.naturalHeight || 2048;
        var scale = Math.max(cw / iw, ch / ih);
        var dw = iw * scale, dh = ih * scale;
        var dx = (cw - dw) * 0.5;
        var dy = ch - dh;
        c.drawImage(img, dx, dy, dw, dh);
      }

      function tick(now) {
        if (!motionPaused && (coarse || now - lastMove > 1400)) {
          autoT += 0.024;
          var ax = W * (0.5 + Math.sin(autoT * 1.3) * 0.24);
          var ay = H * (0.36 + Math.sin(autoT * 0.9 + 1) * 0.22);
          if (!lastAutoPt || Math.hypot(ax - lastAutoPt.x, ay - lastAutoPt.y) > W * 0.02) {
            addStamp(ax, ay, now);
            lastAutoPt = { x: ax, y: ay };
          }
        }

        while (stamps.length && now - stamps[0].t > LIFE) {
          stamps.shift();
        }

        mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        mctx.clearRect(0, 0, W, H);
        mctx.fillStyle = "#000000";
        for (var i = 0; i < stamps.length; i++) {
          var s = stamps[i];
          var age = now - s.t;
          var k = Math.max(0, 1 - age / LIFE);
          var sc = k < 0.75 ? k / 0.75 : 1;
          var rPow = Math.pow(sc, 0.8);
          for (var j = 0; j < s.lobes.length; j++) {
            var l = s.lobes[j];
            mctx.beginPath();
            mctx.arc(s.x + l.dx * sc, s.y + l.dy * sc, l.r * rPow, 0, Math.PI * 2);
            mctx.fill();
          }
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (frontReady) {
          drawCover(ctx, front);
        }

        if (stamps.length) {
          ctx.globalCompositeOperation = "destination-out";
          ctx.drawImage(mask, 0, 0);
          ctx.globalCompositeOperation = "source-over";
          if (backReady) {
            bctx.setTransform(1, 0, 0, 1, 0, 0);
            bctx.globalCompositeOperation = "source-over";
            bctx.clearRect(0, 0, buf.width, buf.height);
            bctx.drawImage(mask, 0, 0);
            bctx.globalCompositeOperation = "source-in";
            drawCover(bctx, back);
            ctx.drawImage(buf, 0, 0);
          }
        }

        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    })();
  </script>
</body>
</html>`;
  }

  // ============================================================================
  // NEWLY UPDATED MOTIONSITES PROMPT 3: VIRTUAL FITTING — "VirtualFit: Spatial Try-On Arc"
  // visionOS-style virtual try-on hero (#e9e4dc) with blurred Scandinavian living room,
  // ghosted FIT word, 10 frosted-glass garment cards curving in a 3D arc, horizontal
  // scan-line reveal over a 5-pose model sheet, and rolling bottom glass buy card.
  // ============================================================================
  if (slug === 'virtual-fitting') {
    const roomUrl = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_080623_c94c85a3-23d5-4a0c-afff-41be1b5b8191.png&w=2400&q=85';
    const modelUrl = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_080717_e02cb856-b812-4c9b-9b86-8a741c7f65eb.png&w=2688&q=85';
    const garmUrl = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_080719_f5a4cca2-cf42-4957-ab3b-ddec34d2b71a.png&w=2048&q=85';
    return `<!DOCTYPE html>
<html lang="en" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>VirtualFit: Spatial Try-On</title>
  <meta name="description" content="visionOS-style spatial virtual try-on arc with real-time garment scan reveal and interactive sizing.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #e9e4dc;
      --fg: #ffffff;
      --ink: #111111;
      --muted: rgba(30, 30, 32, 0.72);
      --accent: #ffffff;
      --accent-text: #111111;
      --accent-strong: #f4f2ee;
      --on-accent: #111111;
      --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
      --sans: "Inter", system-ui, -apple-system, sans-serif;
      --MH: min(78vh, 62vw);
      --CW: clamp(138px, 14.8vw, 240px);
      --room: url("${roomUrl}");
      --model: url("${modelUrl}");
      --garm: url("${garmUrl}");
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      height: 100%;
      background: var(--bg);
      color: var(--fg);
      font-family: var(--sans);
      overflow: hidden;
      overflow-x: clip;
      -webkit-font-smoothing: antialiased;
      user-select: none;
    }
    button {
      font: inherit; color: inherit; background: none; border: none; cursor: pointer;
      transition: transform 0.25s var(--ease), opacity 0.25s var(--ease), background-color 0.25s var(--ease);
    }
    button:active { transform: scale(0.95) translateY(1px); }
    button:focus-visible, a:focus-visible { outline: 2px solid #ffffff; outline-offset: 3px; }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px;
      background: #111111; color: #ffffff;
      font-weight: 600; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    @media (pointer: fine) {
      html, body, button { cursor: none; }
    }

    .room {
      position: fixed; inset: -3%; z-index: 1;
      background: var(--room) center / cover no-repeat;
      filter: blur(2.5px) saturate(1.05);
      transform: scale(1.08);
      will-change: transform;
    }
    .room::after {
      content: ""; position: absolute; inset: 0;
      background: radial-gradient(70% 60% at 50% 45%, rgba(255, 252, 246, 0.10), rgba(40, 30, 20, 0.16));
    }

    .ghost {
      position: fixed; left: 50%; top: calc(50% - var(--MH) * 0.42);
      transform: translate(-50%, 0); z-index: 2;
      font-weight: 900; font-size: calc(var(--MH) * 0.42);
      line-height: 0.8; letter-spacing: -0.04em;
      color: rgba(255, 255, 255, 0.30);
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.35);
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
      pointer-events: none; white-space: nowrap;
    }
    .ghost span { display: inline-block; will-change: transform; }

    .glass {
      background: linear-gradient(155deg, rgba(250, 248, 245, 0.30), rgba(150, 144, 136, 0.20) 48%, rgba(205, 200, 192, 0.24));
      backdrop-filter: blur(22px) saturate(1.5);
      -webkit-backdrop-filter: blur(22px) saturate(1.5);
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(255, 255, 255, 0.12), 0 20px 50px -24px rgba(40, 30, 20, 0.45);
    }

    .tabs {
      position: fixed; left: 50%; top: 4.2vh; transform: translateX(-50%);
      z-index: 30; padding: 5px; border-radius: 999px;
      display: flex; align-items: center; gap: 2px;
    }
    .tab-btn {
      position: relative; z-index: 2; height: 38px; padding: 0 22px;
      border-radius: 999px; font-weight: 500; font-size: 14px;
      color: var(--muted); white-space: nowrap;
    }
    .tab-btn.is-active {
      color: var(--ink);
      background: rgba(255, 255, 255, 0.92);
      box-shadow: 0 4px 14px -6px rgba(0, 0, 0, 0.3);
    }

    .rail {
      position: fixed; left: max(18px, 1.8vw); top: 50%; transform: translateY(-50%);
      z-index: 30; padding: 8px; border-radius: 999px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .rail-btn {
      width: 42px; height: 42px; border-radius: 50%;
      display: grid; place-items: center; color: rgba(30, 30, 32, 0.8);
    }
    .rail-btn.is-active {
      background: rgba(255, 255, 255, 0.9); color: #111111;
    }
    .rail-btn:hover:not(.is-active) {
      background: rgba(255, 255, 255, 0.35);
    }

    .stage {
      position: fixed; inset: 0; z-index: 10; touch-action: pan-y;
    }
    .arc {
      position: absolute; left: 50%; top: 46%; width: 0; height: 0;
    }
    .card {
      position: absolute; width: var(--CW); height: calc(var(--CW) * 1.42);
      left: calc(var(--CW) * -0.5); top: calc(var(--CW) * -0.71);
      border-radius: 22px; overflow: hidden; will-change: transform, opacity, filter;
    }
    .card .g {
      position: absolute; left: 8%; right: 8%; top: 5%; height: 66%;
      background-image: var(--garm);
      background-size: 320% 212.5%;
      background-repeat: no-repeat;
      filter: drop-shadow(0 14px 14px rgba(40, 30, 20, 0.22));
    }
    .card .cname {
      position: absolute; left: 12px; right: 12px; bottom: 17%;
      text-align: center; font-weight: 500;
      font-size: clamp(11px, calc(var(--CW) * 0.068), 16px);
      color: #ffffff; text-shadow: 0 1px 8px rgba(0, 0, 0, 0.18);
    }
    .card .cprice {
      position: absolute; left: 12px; right: 12px; bottom: 7%;
      text-align: center; font-weight: 700;
      font-size: clamp(13px, calc(var(--CW) * 0.095), 22px);
      color: #ffffff; text-shadow: 0 1px 8px rgba(0, 0, 0, 0.18);
    }
    .card .sheen {
      position: absolute; inset: -40%; pointer-events: none;
      background: linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.5) 50%, transparent 60%);
      transform: translateX(-120%);
      transition: transform 0.85s var(--ease);
    }
    .card:hover .sheen { transform: translateX(120%); }

    .model {
      position: fixed; left: 50%; bottom: 0; transform: translateX(-50%);
      height: var(--MH); aspect-ratio: 524 / 1360; z-index: 50;
      pointer-events: none;
    }
    .m-layer {
      position: absolute; inset: 0;
      background-image: var(--model);
      background-size: 513% 111.76%;
      background-position-y: 100%;
      background-repeat: no-repeat;
    }
    #mNext { clip-path: inset(0 0 100% 0); }
    .grid-scan {
      position: absolute; inset: 0;
      background: repeating-linear-gradient(0deg, transparent 0 5px, rgba(255, 255, 255, 0.22) 5px 6px);
      mix-blend-mode: screen;
      clip-path: inset(0 0 100% 0);
    }
    .scan-line {
      position: absolute; left: -14%; right: -14%; top: 0%; height: 2px;
      background: linear-gradient(90deg, transparent, #ffffff 18%, #ffffff 82%, transparent);
      box-shadow: 0 0 18px 4px rgba(255, 255, 255, 0.75), 0 0 60px 10px rgba(190, 225, 255, 0.45);
      opacity: 0; transform: scaleX(0.2);
    }
    .scan-line::after {
      content: ""; position: absolute; left: 0; right: 0; bottom: 100%;
      height: calc(var(--MH) * 0.12);
      background: linear-gradient(to top, rgba(220, 238, 255, 0.32), transparent);
    }

    .arrow-btn {
      position: fixed; top: 50%; transform: translateY(-50%);
      width: 46px; height: 46px; border-radius: 50%; z-index: 40;
      display: grid; place-items: center; color: #222222;
    }
    .arrow-prev { left: calc(max(18px, 1.8vw) + 76px); }
    .arrow-next { right: max(18px, 1.8vw); }

    .buy {
      position: fixed; left: 50%; bottom: 4.6vh; transform: translateX(-50%);
      z-index: 60; width: min(640px, calc(100% - 32px));
      display: flex; align-items: center; justify-content: space-between; gap: 18px;
      padding: 12px 22px 12px 12px; border-radius: 24px;
      color: #ffffff; text-shadow: 0 1px 6px rgba(0, 0, 0, 0.18);
    }
    .buy-left { display: flex; align-items: center; gap: 14px; }
    .buy-thumb {
      width: 64px; height: 64px; border-radius: 14px;
      background: rgba(255, 255, 255, 0.3); position: relative; overflow: hidden; flex-shrink: 0;
    }
    .buy-thumb-in {
      position: absolute; inset: 6px;
      background-image: var(--garm);
      background-size: 320% 212.5%;
      background-repeat: no-repeat;
    }
    .ln { height: 1.2em; overflow: hidden; display: block; }
    .buy-name { font-weight: 600; font-size: 16px; }
    .buy-price { font-weight: 500; font-size: 14px; opacity: 0.9; margin-top: 2px; }
    .buy-group { display: flex; flex-direction: column; gap: 6px; }
    .buy-label { font-weight: 500; font-size: 12px; opacity: 0.85; }
    .chips { display: flex; gap: 6px; }
    .chip {
      width: 30px; height: 30px; border-radius: 50%;
      background: rgba(255, 255, 255, 0.22); color: #ffffff;
      font-size: 12px; font-weight: 600; display: grid; place-items: center;
    }
    .chip.is-active { background: #ffffff; color: #111111; }
    .dots-row { display: flex; gap: 8px; align-items: center; }
    .color-dot {
      width: 18px; height: 18px; border-radius: 50%;
    }
    .color-dot.is-active {
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.95), 0 0 0 4px rgba(0, 0, 0, 0.12);
    }

    .cur {
      position: fixed; left: 0; top: 0; width: 58px; height: 58px;
      margin: -29px 0 0 -29px; z-index: 100; pointer-events: none;
      display: grid; place-items: center; will-change: transform;
    }
    .cur-ring {
      position: absolute; inset: 0; border-radius: 50%;
      border: 1.5px solid rgba(255, 255, 255, 0.95);
      background: rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
      box-shadow: 0 6px 20px -8px rgba(0, 0, 0, 0.35);
      transition: transform 0.5s var(--ease), background-color 0.4s var(--ease);
    }
    .cur-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #ffffff;
      transition: transform 0.4s var(--ease), opacity 0.4s var(--ease);
    }
    .cur-txt {
      position: absolute; font-weight: 700; font-size: 10px;
      letter-spacing: 0.12em; opacity: 0; transform: scale(0.6);
      transition: transform 0.45s var(--ease), opacity 0.45s var(--ease);
    }
    .cur.mode-try .cur-ring { transform: scale(1.45); background: rgba(255, 255, 255, 0.92); }
    .cur.mode-try .cur-dot { opacity: 0; }
    .cur.mode-try .cur-try { opacity: 1; transform: scale(1); color: #111111; }
    .cur.mode-drag .cur-ring { transform: scale(1.2); }
    .cur.mode-drag .cur-dot { opacity: 0; }
    .cur.mode-drag .cur-drag { opacity: 1; transform: scale(1); color: #ffffff; }
    .cur.mode-btn .cur-ring { transform: scale(0.6); }

    .${p}-sr-only {
      position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);
    }

    @media (max-width: 960px) {
      :root { --CW: min(22vw, 180px); }
    }
    @media (max-width: 767px) {
      :root { --MH: min(62vh, 128vw); --CW: min(30vw, 170px); }
      .tab-btn { height: 32px; padding: 0 13px; font-size: 12px; }
      .rail { left: 10px; top: auto; bottom: calc(4.6vh + 150px); transform: none; }
      .rail-btn { width: 34px; height: 34px; }
      .arrow-btn { display: none; }
      .buy { flex-wrap: wrap; gap: 12px; padding: 12px 16px; }
      .cur { display: none; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="room" id="roomBg" aria-hidden="true"></div>
  <div class="ghost" id="ghostWord" aria-hidden="true">
    <span>F</span><span>I</span><span>T</span>
  </div>

  <header>
    <nav class="tabs glass" aria-label="Garment Categories">
      <button type="button" class="tab-btn is-active" data-tab="0">Tops</button>
      <button type="button" class="tab-btn" data-tab="1">Bottoms</button>
      <button type="button" class="tab-btn" data-tab="2">Outerwear</button>
      <button type="button" class="tab-btn" data-tab="3">Shoes</button>
      <button type="button" class="tab-btn" data-tab="4">Accessories</button>
    </nav>
  </header>

  <aside class="rail glass" aria-label="Spatial Try-On Tools">
    <button type="button" class="rail-btn is-active" aria-label="Try-On Studio">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 3l5 4-3 4-2-1.5V21H8V9.5L6 11 3 7l5-4c1.2 1.4 2.5 2 4 2s2.8-.6 4-2z"/></svg>
    </button>
    <button type="button" class="rail-btn" aria-label="Shopping Bag">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
    </button>
    <button type="button" class="rail-btn" aria-label="Look Schedule">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>
    </button>
    <button type="button" class="rail-btn" id="motionToggleBtn" aria-label="Toggle Motion" aria-pressed="false">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.8-3.6 5-5.5 8-5.5s6.2 1.9 8 5.5"/></svg>
    </button>
  </aside>

  <main id="main-content">
    <h1 class="${p}-sr-only">VirtualFit: Spatial Try-On Arc</h1>

    <section class="stage" id="arcStage" aria-label="3D Garment Arc">
      <div class="arc" id="arcContainer"></div>
    </section>

    <section class="model" id="modelStage" aria-label="Virtual Model Preview">
      <div class="m-layer" id="mCur" style="background-position-x: 0.37%;"></div>
      <div class="m-layer" id="mNext" style="background-position-x: 0.37%;"></div>
      <div class="grid-scan" id="scanGrid"></div>
      <div class="scan-line" id="scanLine"></div>
    </section>

    <button type="button" class="arrow-btn arrow-prev glass" id="prevBtn" aria-label="Previous Garment">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
    </button>
    <button type="button" class="arrow-btn arrow-next glass" id="nextBtn" data-next-preview="true" aria-label="Next Garment">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
    </button>

    <section class="buy glass" aria-label="Selected Garment Details">
      <div class="buy-left">
        <div class="buy-thumb">
          <div class="buy-thumb-in" id="buyThumb" style="background-position: 1.14% 3.06%;"></div>
        </div>
        <div>
          <span class="ln"><strong class="buy-name" id="buyName">Basic T-shirt</strong></span>
          <span class="ln"><span class="buy-price tabular-nums" id="buyPrice">$45</span></span>
        </div>
      </div>

      <div class="buy-group">
        <span class="buy-label">Size</span>
        <div class="chips" role="radiogroup" aria-label="Select Size">
          <button type="button" class="chip">S</button>
          <button type="button" class="chip is-active">M</button>
          <button type="button" class="chip">L</button>
          <button type="button" class="chip">XL</button>
        </div>
      </div>

      <div class="buy-group">
        <span class="ln"><span class="buy-label" id="buyColorLabel">Color · White</span></span>
        <div class="dots-row" id="colorDots"></div>
      </div>
    </section>

    <section class="${p}-sr-only" aria-label="Catalog Inventory">
      <article><h2>Basic T-shirt</h2><p class="tabular-nums">$45 · 4 Colorways</p></article>
      <article><h2>Basic Sweater</h2><p class="tabular-nums">$105 · 4 Colorways</p></article>
      <article><h2>Linen Shirt</h2><p class="tabular-nums">$95 · 4 Colorways</p></article>
      <article><h2>Grey Hoodie</h2><p class="tabular-nums">$110 · 4 Colorways</p></article>
    </section>
  </main>

  <footer class="${p}-sr-only">
    <span class="tabular-nums">VirtualFit Spatial Commerce · 5 Garments · 60 FPS</span>
  </footer>

  <div class="cur mode-drag" id="customCur" aria-hidden="true">
    <div class="cur-ring"></div>
    <div class="cur-dot"></div>
    <span class="cur-txt cur-try">TRY ON</span>
    <span class="cur-txt cur-drag">DRAG</span>
  </div>

  <script>
    (function () {
      var ITEMS = [
        { n: "Basic T-shirt", p: 45,  g: [1.14, 3.06],  m: 0.37,  c: [["White", "#f4f2ee"], ["Ash", "#c9c7c2"], ["Charcoal", "#3b3c3f"], ["Navy", "#27324d"]] },
        { n: "Basic Sweater", p: 105, g: [49.7, 1.39],  m: 25.0,  c: [["White", "#f6f4ef"], ["Oat", "#ddd3c2"], ["Sage", "#b9c2ae"], ["Black", "#1f1f21"]] },
        { n: "Linen Shirt",   p: 95,  g: [98.2, 3.33],  m: 49.86, c: [["White", "#f7f6f1"], ["Sand", "#d9ccb4"], ["Sky", "#bcd0e2"], ["Olive", "#717556"]] },
        { n: "Grey Hoodie",   p: 110, g: [1.14, 93.3],  m: 74.77, c: [["Heather", "#a9a9a8"], ["Bone", "#e6e1d6"], ["Forest", "#33463a"], ["Black", "#1f1f21"]] },
        { n: "Ringer Tee",    p: 55,  g: [49.7, 95.3],  m: 99.35, c: [["White / Black", "#f4f2ee"], ["Cream / Navy", "#efe6d3"], ["Grey / Red", "#c9c7c2"], ["White / Green", "#e9efe8"]] }
      ];

      var arcContainer = document.getElementById("arcContainer");
      var arcStage = document.getElementById("arcStage");
      var roomBg = document.getElementById("roomBg");
      var ghostWord = document.getElementById("ghostWord");
      var ghostLetters = ghostWord.querySelectorAll("span");
      var mCur = document.getElementById("mCur");
      var mNext = document.getElementById("mNext");
      var scanGrid = document.getElementById("scanGrid");
      var scanLine = document.getElementById("scanLine");
      var buyThumb = document.getElementById("buyThumb");
      var buyName = document.getElementById("buyName");
      var buyPrice = document.getElementById("buyPrice");
      var buyColorLabel = document.getElementById("buyColorLabel");
      var colorDots = document.getElementById("colorDots");
      var customCur = document.getElementById("customCur");
      var motionBtn = document.getElementById("motionToggleBtn");

      var cardEls = [];
      for (var i = 0; i < 10; i++) {
        var it = ITEMS[i % 5];
        var el = document.createElement("article");
        el.className = "card glass";
        el.setAttribute("data-card-idx", String(i));
        el.innerHTML =
          '<div class="g" style="background-position:' + it.g[0] + '% ' + it.g[1] + '%;"></div>' +
          '<div class="cname">' + it.n + '</div>' +
          '<div class="cprice tabular-nums">$' + it.p + '</div>' +
          '<div class="sheen"></div>';
        arcContainer.appendChild(el);
        cardEls.push(el);
      }

      var pos = 0, target = 0, intro = 0;
      var dragging = false, dragStartX = 0, dragStartPos = 0, lastDragX = 0, lastDragT = 0, flickVel = 0;
      var sx = 0, sy = 0, targetSx = 0, targetSy = 0;
      var curX = window.innerWidth * 0.5, curY = window.innerHeight * 0.5;
      var targetCurX = curX, targetCurY = curY;
      var activeOutfit = -1;
      var motionPaused = false;

      function mod(n, m) { return ((n % m) + m) % m; }

      function updateBuyCard(idx) {
        var it = ITEMS[idx];
        buyName.textContent = it.n;
        buyPrice.textContent = "$" + it.p;
        buyThumb.style.backgroundPosition = it.g[0] + "% " + it.g[1] + "%";
        buyColorLabel.textContent = "Color · " + it.c[0][0];
        colorDots.innerHTML = "";
        it.c.forEach(function (pair, cIdx) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "color-dot" + (cIdx === 0 ? " is-active" : "");
          b.style.background = pair[1];
          b.setAttribute("aria-label", pair[0]);
          b.addEventListener("click", function () {
            colorDots.querySelectorAll(".color-dot").forEach(function (d) { d.classList.remove("is-active"); });
            b.classList.add("is-active");
            buyColorLabel.textContent = "Color · " + pair[0];
          });
          colorDots.appendChild(b);
        });
      }

      function runTryOn(idx) {
        activeOutfit = idx;
        var it = ITEMS[idx];
        updateBuyCard(idx);
        mNext.style.backgroundPositionX = it.m + "%";

        if (mNext.animate && !motionPaused) {
          var a1 = mNext.animate(
            [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }],
            { duration: 950, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" }
          );
          scanGrid.animate(
            [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", offset: 0.5 }, { clipPath: "inset(100% 0 0% 0)" }],
            { duration: 1092, easing: "cubic-bezier(0.65, 0, 0.35, 1)" }
          );
          scanLine.animate(
            [
              { top: "0%", transform: "scaleX(0.2)", opacity: 0 },
              { top: "6%", transform: "scaleX(1)", opacity: 1, offset: 0.08 },
              { top: "94%", transform: "scaleX(1)", opacity: 1, offset: 0.92 },
              { top: "100%", transform: "scaleX(0.2)", opacity: 0 }
            ],
            { duration: 950, easing: "cubic-bezier(0.65, 0, 0.35, 1)" }
          );
          a1.onfinish = function () {
            mCur.style.backgroundPositionX = it.m + "%";
          };
        } else {
          mCur.style.backgroundPositionX = it.m + "%";
          mNext.style.clipPath = "inset(0 0 0% 0)";
        }
      }

      runTryOn(0);

      function xAt(a, W) {
        var ratios = W <= 767 ? [0, 0.36, 0.5, 0.56, 0.6, 0.62] : [0, 0.215, 0.345, 0.432, 0.49, 0.52];
        var i = Math.min(4, Math.floor(a));
        var f = Math.min(1, Math.max(0, a - i));
        return (ratios[i] + (ratios[i + 1] - ratios[i]) * f) * W;
      }

      arcStage.addEventListener("pointerdown", function (e) {
        dragging = true;
        dragStartX = lastDragX = e.clientX;
        lastDragT = performance.now();
        dragStartPos = pos;
        flickVel = 0;
      });

      window.addEventListener("pointermove", function (e) {
        targetCurX = e.clientX;
        targetCurY = e.clientY;
        targetSx = (e.clientX / Math.max(1, window.innerWidth)) - 0.5;
        targetSy = (e.clientY / Math.max(1, window.innerHeight)) - 0.5;

        var tEl = e.target;
        if (tEl && tEl.closest && tEl.closest("button, .buy, .tabs, .rail")) {
          customCur.className = "cur mode-btn";
        } else if (tEl && tEl.closest && tEl.closest(".card")) {
          customCur.className = "cur mode-try";
        } else {
          customCur.className = "cur mode-drag";
        }

        if (dragging) {
          var stepW = Math.max(120, xAt(1, window.innerWidth));
          pos = dragStartPos - (e.clientX - dragStartX) / stepW;
          var now = performance.now();
          var dt = Math.max(1, now - lastDragT);
          flickVel = (e.clientX - lastDragX) / dt;
          lastDragX = e.clientX;
          lastDragT = now;
        }
      }, { passive: true });

      window.addEventListener("pointerup", function (e) {
        if (!dragging) return;
        dragging = false;
        if (Math.abs(e.clientX - dragStartX) < 6) {
          var card = e.target && e.target.closest ? e.target.closest(".card") : null;
          if (card) {
            var cIdx = parseInt(card.getAttribute("data-card-idx") || "0", 10);
            var u = mod(cIdx - pos + 5, 10) - 5;
            target = Math.round(pos + u);
            return;
          }
        }
        target = Math.round(pos - flickVel * 3.2);
      });

      var lastWheel = 0;
      window.addEventListener("wheel", function (e) {
        var now = performance.now();
        if (now - lastWheel < 260) return;
        var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(d) > 20) {
          target += d > 0 ? 1 : -1;
          lastWheel = now;
        }
      }, { passive: true });

      window.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") target += 1;
        else if (e.key === "ArrowLeft") target -= 1;
      });

      document.getElementById("prevBtn").addEventListener("click", function () { target -= 1; });
      document.getElementById("nextBtn").addEventListener("click", function () { target += 1; });

      document.querySelectorAll(".tab-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("is-active"); });
          btn.classList.add("is-active");
          target += 5;
        });
      });

      document.querySelectorAll(".chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
          chip.classList.add("is-active");
        });
      });

      motionBtn.addEventListener("click", function () {
        motionPaused = !motionPaused;
        document.documentElement.setAttribute("data-motion", motionPaused ? "paused" : "on");
        motionBtn.setAttribute("aria-pressed", String(motionPaused));
      });

      function tick(now) {
        var t = now / 1000;
        intro = Math.min(1, intro + 0.012);
        var ie = 1 - Math.pow(1 - intro, 3);

        if (!dragging) {
          pos += (target - pos) * 0.11;
          if (Math.abs(target - pos) < 0.02) {
            var nextIdx = mod(Math.round(target), 5);
            if (nextIdx !== activeOutfit) {
              runTryOn(nextIdx);
            }
          }
        }

        sx += (targetSx - sx) * 0.06;
        sy += (targetSy - sy) * 0.06;
        curX += (targetCurX - curX) * 0.22;
        curY += (targetCurY - curY) * 0.22;
        customCur.style.transform = "translate3d(" + curX.toFixed(1) + "px, " + curY.toFixed(1) + "px, 0)";

        var W = window.innerWidth, H = window.innerHeight;
        roomBg.style.transform = "translate3d(" + (-sx * 22).toFixed(1) + "px, " + (-sy * 14).toFixed(1) + "px, 0) scale(" + (1.08 - 0.03 * ie).toFixed(3) + ")";
        ghostWord.style.transform = "translate(calc(-50% - " + (sx * 40).toFixed(1) + "px), " + (-sy * 16).toFixed(1) + "px)";
        for (var g = 0; g < ghostLetters.length; g++) {
          ghostLetters[g].style.transform = "translateY(" + ((1 - ie) * (60 + 30 * g)).toFixed(1) + "px)";
        }

        for (var i = 0; i < 10; i++) {
          var u = mod(i - pos + 5, 10) - 5;
          var a = Math.abs(u);
          var sg = u < 0 ? -1 : (u > 0 ? 1 : 0);
          var x = sg * xAt(a, W) * ie;
          var s, z, op, ry, blurPx = 0;

          if (a < 1) {
            s = 0.55 + 0.45 * a;
            z = -260 * (1 - a);
            op = a;
            ry = -sg * 16 * a;
          } else {
            s = 1 / (1 + 0.3 * Math.pow(a - 1, 1.15));
            z = -110 * (a - 1);
            ry = -sg * (16 + 9 * Math.min(2, a - 1));
            blurPx = Math.max(0, a - 1.6) * 2.4;
            op = a > 3.4 ? Math.max(0, 1 - (a - 3.4) / 0.8) : 1;
          }

          var bob = motionPaused ? 0 : Math.sin(t * 1.1 + i * 1.3) * H * 0.006 * Math.min(1, a);
          var y = bob - (1 - s) * H * 0.04;
          ry += sx * 10;
          var finalOp = op * ie;
          var el = cardEls[i];

          if (finalOp < 0.01) {
            el.style.visibility = "hidden";
          } else {
            el.style.visibility = "visible";
            el.style.opacity = finalOp.toFixed(3);
            el.style.zIndex = String(a < 1 ? 1 : Math.round(100 - 10 * a));
            el.style.filter = blurPx > 0.05 ? ("blur(" + blurPx.toFixed(2) + "px)") : "none";
            el.style.transform =
              "translate3d(" + x.toFixed(1) + "px, " + y.toFixed(1) + "px, 0) " +
              "perspective(1300px) translateZ(" + z.toFixed(1) + "px) " +
              "rotateY(" + ry.toFixed(2) + "deg) rotateX(" + (-sy * 6).toFixed(2) + "deg) " +
              "scale(" + (s * (0.6 + 0.4 * ie)).toFixed(3) + ")";
          }
        }

        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    })();
  </script>
</body>
</html>`;
  }

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
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-get-started" data-next-preview>Get Started</button>
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
          <button type="button" class="${p}-primary-pill" data-seamless-trigger="Start Building Free — Instant AI Workspace">
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
          <div id="heroPopoutRig" style="filter:url(#${p}LiquidFilter);padding:12px 0;">
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
        <article class="${p}-card ${p}-reveal" data-spec-index="001">
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
        <article class="${p}-card ${p}-reveal" data-spec-index="002">
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
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Kinetix Cloud — +240% Conversion Case Study">
          <span class="${p}-kicker">KINETIX CLOUD</span>
          <strong class="tabular-nums" style="font-size:36px;color:var(--accent-text);">+240%</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Launched 18 localized product landing pages in a single afternoon with 100/100 Lighthouse SEO scores.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Vespera Studio — 3.8x Faster Client Delivery">
          <span class="${p}-kicker">VESPERA STUDIO</span>
          <strong class="tabular-nums" style="font-size:36px;color:var(--accent-text);">3.8x</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Cut agency prototyping cycles from three weeks to four hours using Digitwist live token synchronization.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Monolith AI — 0.38s Global LCP">
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
        <article class="${p}-card ${p}-reveal">
          <span class="${p}-kicker">STARTER</span>
          <strong class="tabular-nums" style="font-size:38px;">$0<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">3 AI-generated sites, full HTML/CSS export, and standard SEO telemetry.</p>
          <button type="button" class="${p}-pill-ghost" data-seamless-trigger="Starter Tier — Instant Activation">Start Free</button>
        </article>
        <article class="${p}-card ${p}-reveal" style="border-color:var(--accent);">
          <span class="${p}-kicker">PRO STUDIO</span>
          <strong class="tabular-nums" style="font-size:38px;">$29<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">Unlimited AI builds, custom domains, 3-layer token export, and priority edge streaming.</p>
          <button type="button" class="${p}-btn-get-started" data-seamless-trigger="Pro Studio Tier — Start 14-Day Trial">Deploy Pro Studio</button>
        </article>
        <article class="${p}-card ${p}-reveal">
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
        <button type="button" id="exploreMagneticBtn" class="${p}-glint-btn" data-next-preview>
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

        <div id="heroPopoutRig" class="${p}-nokia-rig" style="filter:url(#${p}LiquidFilter);">
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
        <article class="${p}-card ${p}-reveal">
          <span class="${p}-kicker">NO METRICS</span>
          <h3 style="font-size:22px;">Zero Likes or Followers</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">No public profiles, no algorithmic amplification, and no performative status games.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
          <span class="${p}-kicker">SYNCHRONOUS CALM</span>
          <h3 style="font-size:22px;">One Delivery Window</h3>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Notes arrive once each morning at 08:00 local time, restoring anticipation and presence.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
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
        <article class="${p}-card ${p}-reveal" data-spec-index="001">
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
        <article class="${p}-card ${p}-reveal" data-spec-index="002">
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
        <article class="${p}-card ${p}-reveal">
          <span class="${p}-kicker">SOLO LINK</span>
          <strong class="tabular-nums" style="font-size:36px;">Free</strong>
          <p style="color:var(--muted);font-size:14px;">1 daily peer link, morning delivery window, and full end-to-end encryption.</p>
          <button type="button" class="${p}-pill-ghost" data-seamless-trigger="Solo Link — Pair with a Peer">Request Peer Link</button>
        </article>
        <article class="${p}-card ${p}-reveal" style="border-color:var(--accent);">
          <span class="${p}-kicker">PATRON EDITION</span>
          <strong class="tabular-nums" style="font-size:36px;">$4<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">Support independent calm software, custom LCD palettes, and physical postcard exports.</p>
          <button type="button" class="${p}-glint-btn" data-seamless-trigger="Patron Edition — Link Up">Become a Patron</button>
        </article>
        <article class="${p}-card ${p}-reveal">
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
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-lime" data-next-preview style="padding:8px 18px;font-size:12px;">Enroll Now</button>
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
        <button type="button" class="${p}-btn-lime" data-seamless-trigger="Design Rocket Certificates — Cohort Enrollment">
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
      <div class="${p}-video-card" id="heroPopoutRig" style="filter:url(#${p}LiquidFilter);">
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
      <div class="${p}-lime-banner">
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
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-dark" data-next-preview>Log In</button>
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

        <div id="heroPopoutRig" class="${p}-query-console" style="filter:url(#${p}LiquidFilter);">
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
        <article class="${p}-card ${p}-reveal">
          <span class="${p}-kicker">QUERY RESULT</span>
          <strong id="liveQueryTitle" style="font-size:20px;">Enterprise NRR: 118.4%</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Automated anomaly detection across 14.2M warehouse rows in 180 milliseconds.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
          <span class="${p}-kicker">THROUGHPUT</span>
          <strong class="tabular-nums" data-counter-target="180" data-counter-suffix="ms" style="font-size:36px;color:var(--accent-text);">180ms</strong>
          <p style="color:var(--muted);font-size:14px;line-height:1.6;">Zero-copy DuckDB &amp; Parquet vector execution directly in the browser.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
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
        <article class="${p}-card ${p}-reveal" data-spec-index="001">
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
        <article class="${p}-card ${p}-reveal" data-spec-index="002">
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
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="SaaS Net Retention Board">
          <span class="${p}-kicker">BOARD 01</span>
          <h3 style="font-size:20px;">SaaS Net Retention</h3>
          <p style="color:var(--muted);font-size:14px;">Cohort expansion, logo churn, and payback period decomposition.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Supply Chain Inventory Velocity">
          <span class="${p}-kicker">BOARD 02</span>
          <h3 style="font-size:20px;">Inventory Velocity</h3>
          <p style="color:var(--muted);font-size:14px;">SKU lead-time forecasting and safety-stock threshold alerts.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Paid Acquisition Attribution">
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
        <article class="${p}-card ${p}-reveal">
          <span class="${p}-kicker">ANALYST</span>
          <strong class="tabular-nums" style="font-size:36px;">$0<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">450 monthly GPT-4o credits, CSV/Parquet uploads, and instant chart exports.</p>
        </article>
        <article class="${p}-card ${p}-reveal" style="border-color:var(--accent);">
          <span class="${p}-kicker">TEAM INTELLIGENCE</span>
          <strong class="tabular-nums" style="font-size:36px;">$39<span style="font-size:15px;color:var(--muted);">/mo</span></strong>
          <p style="color:var(--muted);font-size:14px;">5,000 monthly credits, live Snowflake/Postgres connectors, and shared boards.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
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
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-green" data-next-preview>Export Tokens</button>
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
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-yellow" data-next-preview>Get in touch</button>
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
      <div class="${p}-phone-frame">
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
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-dark" data-next-preview>Menu</button>
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
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-pill ${p}-liquid-glass">Begin your journey</button>
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
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">01 // CALENDAR SHIELD</span>
          <h3 style="font-family:var(--font-display);font-size:28px;font-weight:400;margin:10px 0;">Autonomous Focus Defragmentation</h3>
          <p style="font-size:14px;color:var(--muted);max-width:52ch;">Automatically clusters scattered 15-minute calls into cohesive blocks so your crew preserves uninterrupted deep-craft mornings.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">02 // PULSE TELEMETRY</span>
          <h3 style="font-family:var(--font-display);font-size:28px;font-weight:400;margin:10px 0;">Privacy-First Energy Check-Ins</h3>
          <p style="font-size:14px;color:var(--muted);max-width:52ch;">Zero surveillance. Crew members log 1-tap energy states that dynamically rebalance sprint story points before burnout hits.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
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
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-blue">
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
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">01 // DIRECT 3D OPTICAL FIT</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Fitted in 48 Hours, Not 6 Weeks</h3>
          <p style="font-size:14px;color:var(--muted);max-width:50ch;">Our mobile prosthetists scan your residual limb using sub-millimeter structured light and print custom breathable sockets locally.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">02 // NEURAL MUSCLE LEARNING</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Adapts to Your Signal, Not Vice Versa</h3>
          <p style="font-size:14px;color:var(--muted);max-width:50ch;">On-board edge AI calibrates to subtle surface EMG muscle twitches in 10 minutes—even through sweat or long workdays.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
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
        <button type="button" id="exploreMagneticBtn" class="${p}-glass-pill">Get in touch</button>
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
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Mainframe Labs — Applied AI &amp; Spatial Prototypes">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">01 // LABS</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Adaptive Interfaces</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Proprietary multimodal agents, tactile hardware controllers, and real-time WebGPU canvases.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Mainframe Studio — Brand &amp; Product Systems">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">02 // STUDIO</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Flagship Launches</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Identity systems, industrial 3D motion films, and high-converting web architecture for category leaders.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Mainframe Openings — Join the Collective">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">03 // OPENINGS</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Senior Craft Pods</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Autonomous engineering and design residencies in San Francisco, New York, and Tokyo.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Mainframe Shop — Physical Objects &amp; Editions">
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

  // ============================================================================
  // 14. CONTACT CYBERNETIC (t195 — Free Tier — Mainframe® Studio Interactive Inquiry)
  // Crisp White #FFFFFF + Forest Green #1C2E1E + Mouse-Scrubbed Video + Typewriter + Multi-Select Pills
  // ============================================================================
  if (spec.slug === 'contact-cybernetic') {
    const bgVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Mainframe® Studio — Cybernetic Contact &amp; Project Inquiry</title>
  <meta name="description" content="Mainframe® Studio interactive project inquiry terminal featuring mouse-scrubbed cybernetic video, typewriter headline, and multi-select scope pills.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #ffffff;
      --surface: rgba(255, 255, 255, 0.86);
      --text: #09090b;
      --muted: #52525b;
      --forest: #1C2E1E;
      --border: #e4e4e7;
      --font-display: 'Space Grotesk', sans-serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      overflow-x: clip;
      max-width: 100%;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--forest); color: #fff; font-weight: 700; border-radius: 999px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid var(--text); }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--forest); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }

    .${p}-hero {
      position: relative; min-height: 100vh; width: 100%; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between;
      background: #ffffff;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      pointer-events: none; z-index: 0; opacity: 0.92;
    }
    .${p}-top-overlay {
      position: relative; z-index: 10; padding: 28px clamp(20px, 4vw, 48px);
      display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap;
    }
    .${p}-brand {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--font-display); font-size: 28px; font-weight: 700; letter-spacing: -0.04em;
      color: var(--text); text-decoration: none;
    }
    .${p}-brand-asterisk {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 50%; background: var(--forest); color: #fff; font-size: 16px;
    }
    .${p}-nav-links {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
      background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px);
      padding: 8px 16px; border-radius: 999px; border: 1px solid var(--border);
    }
    .${p}-nav-link {
      color: var(--text); text-decoration: none; font-size: 15px; font-weight: 500;
      padding: 6px 10px; border-radius: 999px; transition: opacity 0.2s;
    }
    .${p}-nav-link:hover { opacity: 0.6; }
    .${p}-pill-btn {
      padding: 9px 18px; border-radius: 999px; border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.9); color: var(--text); font-size: 13px; font-weight: 600;
      cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.2s ease;
    }
    .${p}-pill-btn:hover, .${p}-pill-btn.is-active {
      background: var(--forest); color: #fff; border-color: var(--forest);
    }

    .${p}-bottom-overlay {
      position: relative; z-index: 10; padding: 24px clamp(20px, 4vw, 48px) 44px;
      max-width: 920px;
    }
    .${p}-card-shell {
      background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(22px);
      border: 1px solid rgba(24, 24, 27, 0.1); border-radius: 32px;
      padding: clamp(24px, 4vw, 42px);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
    }
    .${p}-h1 {
      font-family: var(--font-display); font-size: clamp(2.5rem, 5.6vw, 4.75rem);
      font-weight: 500; letter-spacing: -0.04em; line-height: 1.04; color: var(--text);
      margin-bottom: 24px;
    }
    .${p}-cursor-bar {
      display: inline-block; width: 3px; height: 0.85em; background: var(--forest);
      vertical-align: middle; margin-left: 4px; animation: ${p}Blink 0.9s step-end infinite;
    }
    @keyframes ${p}Blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

    .${p}-scope-pills {
      display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px;
    }
    .${p}-scope-pill {
      padding: 12px 24px; border-radius: 999px; font-size: 15px; font-weight: 600;
      border: 1px solid #d4d4d8; background: rgba(255, 255, 255, 0.82); color: var(--text);
      cursor: pointer; transition: all 0.2s ease;
    }
    .${p}-scope-pill.is-selected {
      background: var(--forest); color: #ffffff; border-color: var(--forest);
      box-shadow: 0 8px 20px rgba(28, 46, 30, 0.25);
    }
    .${p}-ready-bar {
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
      padding: 16px 22px; border-radius: 20px; background: #f4f4f5; border: 1px solid var(--border);
    }
    .${p}-section {
      max-width: 1280px; margin: 0 auto; padding: 72px clamp(20px, 4vw, 48px);
    }
    .${p}-grid-3 {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 28px;
    }
    .${p}-studio-card {
      padding: 28px; border-radius: 24px; background: #fafafa; border: 1px solid var(--border);
    }
    .${p}-modal {
      position: fixed; inset: 0; background: rgba(9, 9, 11, 0.65); backdrop-filter: blur(12px);
      display: none; align-items: center; justify-content: center; z-index: 999; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px; width: 100%; border-radius: 28px; padding: 32px;
      background: #fff; color: var(--text); border: 1px solid var(--border);
    }
    @media (max-width: 900px) {
      .${p}-grid-3 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <main id="main-content">
    <section class="${p}-hero tabular-nums" aria-labelledby="heroHeading">
      <video id="cyberContactVideo" class="${p}-bg-video" src="${bgVideo}" autoplay muted loop playsinline preload="auto"></video>

      <header class="${p}-top-overlay">
        <a href="#main-content" class="${p}-brand">
          <span>Mainframe<sup>®</sup></span>
          <span class="${p}-brand-asterisk" aria-hidden="true">✱</span>
        </a>

        <nav class="${p}-nav-links" aria-label="Primary Navigation">
          <a href="#studio-pods" class="${p}-nav-link">Labs,</a>
          <a href="#studio-pods" class="${p}-nav-link">Studio,</a>
          <a href="#studio-pods" class="${p}-nav-link">Openings,</a>
          <a href="#studio-pods" class="${p}-nav-link">Shop</a>
        </nav>

        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <button type="button" id="motionToggleBtn" class="${p}-pill-btn" aria-pressed="false">Motion: ON</button>
          <button type="button" id="exploreMagneticBtn" class="${p}-pill-btn is-active">
            <span>Get in touch</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </header>

      <div class="${p}-bottom-overlay">
        <div class="${p}-card-shell">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--forest);font-weight:600;">
              ● INTERACTIVE BRIEF TERMINAL • SCRUB VIDEO WITH CURSOR
            </span>
            <span id="scrubDeltaOut" style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">
              SCRUB READY • 0.5x SENSITIVITY
            </span>
          </div>

          <h1 id="heroHeading" class="${p}-h1">
            we'd love to<br />hear from you!<span class="${p}-cursor-bar" aria-hidden="true"></span>
          </h1>

          <p style="font-size:15px;font-weight:500;color:var(--muted);margin-bottom:14px;">
            I'm interested in... (Select one or multiple project scopes)
          </p>

          <div class="${p}-scope-pills" role="group" aria-label="Project Scope Selection">
            <button type="button" class="${p}-scope-pill is-selected scope-pill-btn" data-next-preview="true" data-scope="Brand">Brand</button>
            <button type="button" class="${p}-scope-pill is-selected scope-pill-btn" data-next-preview="true" data-scope="Digital">Digital</button>
            <button type="button" class="${p}-scope-pill scope-pill-btn" data-next-preview="true" data-scope="Campaign">Campaign</button>
            <button type="button" class="${p}-scope-pill scope-pill-btn" data-next-preview="true" data-scope="Other">Other</button>
          </div>

          <div class="${p}-ready-bar">
            <p style="font-size:14px;color:var(--muted);">
              Ready to inquire about: <strong id="selectedScopesOut" style="color:var(--text);">Brand, Digital</strong>
            </p>
            <button type="button" class="${p}-pill-btn is-active" data-seamless-trigger="Submit Inquiry for Brand &amp; Digital">
              <span>Let's Go</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section id="studio-pods" class="${p}-section tabular-nums" aria-labelledby="podsHeading">
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--forest);font-weight:600;">MAINFRAME® GLOBAL PRACTICE</span>
      <h2 id="podsHeading" style="font-family:var(--font-display);font-size:clamp(1.8rem,3.2vw,2.6rem);margin-top:8px;">Autonomous Design &amp; Cybernetic Systems</h2>

      <div class="${p}-grid-3">
        <article class="${p}-studio-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--forest);">01 // BRAND ARCHITECTURE</span>
          <h3 style="font-family:var(--font-display);font-size:21px;margin:10px 0;">Kinetic Identity Systems</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Typeface engineering, 3D industrial motion grammar, and design tokens built for category-defining ventures.</p>
        </article>
        <article class="${p}-studio-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--forest);">02 // DIGITAL PLATFORMS</span>
          <h3 style="font-family:var(--font-display);font-size:21px;margin:10px 0;">WebGL &amp; Spatial Flagships</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Sub-second Next.js commerce and interactive product configurators with 60fps hardware-accelerated motion.</p>
        </article>
        <article class="${p}-studio-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--forest);">03 // CAMPAIGN FILMS</span>
          <h3 style="font-family:var(--font-display);font-size:21px;margin:10px 0;">Launch Keynotes &amp; Reels</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Real-time Unreal and Houdini product films synchronized with interactive launch microsites.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-section" style="padding-top:24px;padding-bottom:40px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 Mainframe® Studio. All rights reserved.</span>
    <span style="font-family:var(--font-mono);color:var(--forest);">SAN FRANCISCO • NEW YORK • ZÜRICH</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--forest);">MAINFRAME® INQUIRY DESK</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-btn">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:24px;margin-bottom:10px;">Start Your Mainframe® Brief</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Our executive producers respond within 24 hours with a tailored pod allocation and sprint timeline.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill-btn is-active" style="width:100%;justify-content:center;">Dispatch Project Brief</button>
    </div>
  </div>

  <script>
    (function () {
      var video = document.getElementById('cyberContactVideo');
      var scrubOut = document.getElementById('scrubDeltaOut');
      var lastX = null;
      window.addEventListener('mousemove', function (e) {
        if (lastX === null) { lastX = e.clientX; return; }
        var dx = e.clientX - lastX;
        lastX = e.clientX;
        var norm = dx / Math.max(1, window.innerWidth);
        if (video && video.duration && isFinite(video.duration)) {
          video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + norm * video.duration * 0.5));
        }
        if (scrubOut) scrubOut.textContent = 'MOUSE SCRUB: ' + (dx >= 0 ? '+' : '') + dx + 'px • 0.5x';
      }, { passive: true });

      var out = document.getElementById('selectedScopesOut');
      function syncScopes() {
        var active = [];
        document.querySelectorAll('.scope-pill-btn.is-selected').forEach(function (b) {
          active.push(b.getAttribute('data-scope'));
        });
        if (out) out.textContent = active.length ? active.join(', ') : 'General Partnership';
      }
      document.querySelectorAll('.scope-pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          btn.classList.toggle('is-selected');
          syncScopes();
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 15. HEALTH PORTAL (t196 — Premium Tier — Dental Health Quality Healthcare)
  // Mosaic MaskedCard Hero + Smile Gallery Makeover + Implant Dentistry
  // ============================================================================
  if (spec.slug === 'health-portal') {
    const heroImg = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';
    const section2Img = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114411_a9bc9ab4-9bf8-4ac1-922d-9f4fdb20cef2.png&w=1280&q=85';
    const section3Img1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115106_0d53e042-a285-4ec4-9e7c-4afda82a6f87.png&w=1280&q=85';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Dental Health — Quality Healthcare &amp; Cosmetic Dentistry in West New York</title>
  <meta name="description" content="Trusted Dentist in West New York offering Dental Veneers, Dental Crowns, Teeth Whitening, and Implant Dentistry with free consultation.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #ffffff;
      --surface: #f4f6f9;
      --text: #111827;
      --muted: #4b5563;
      --blue: #0284c7;
      --navy: #0f172a;
      --border: rgba(15, 23, 42, 0.1);
      --font-display: 'Space Grotesk', 'Plus Jakarta Sans', sans-serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      overflow-x: clip;
      max-width: 100%;
      scroll-behavior: smooth;
    }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--blue); color: #fff; font-weight: 700; border-radius: 999px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid var(--navy); }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }

    .${p}-shell { max-width: 1360px; margin: 0 auto; padding: 18px clamp(16px, 3.5vw, 40px); }
    .${p}-navbar {
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
      padding: 12px 24px; border-radius: 999px; background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(18px); border: 1px solid var(--border);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06); margin-bottom: 24px;
    }
    .${p}-brand {
      display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text);
    }
    .${p}-pill {
      padding: 10px 20px; border-radius: 999px; border: 1px solid var(--border);
      background: #fff; color: var(--text); font-size: 13px; font-weight: 700;
      cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
      transition: all 0.22s ease;
    }
    .${p}-pill:hover, .${p}-pill.is-active {
      background: var(--navy); color: #fff; border-color: var(--navy);
    }

    .${p}-mosaic-hero {
      display: grid; grid-template-columns: 320px 1fr; gap: 18px; align-items: stretch;
    }
    .${p}-feature-bars {
      display: flex; flex-direction: column; gap: 14px;
    }
    .${p}-feature-bar {
      flex: 1; border-radius: 26px; padding: 24px; position: relative; overflow: hidden;
      background: linear-gradient(145deg, #0f172a, #1e293b); color: #fff;
      display: flex; flex-direction: column; justify-content: flex-end;
      min-height: 150px;
    }
    .${p}-main-card {
      position: relative; border-radius: 32px; overflow: hidden; min-height: 520px;
      background: #0f172a; color: #fff; padding: clamp(28px, 4.5vw, 52px);
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .${p}-main-card-bg {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      opacity: 0.58; z-index: 0;
    }
    .${p}-main-card-content { position: relative; z-index: 2; }
    .${p}-h1 {
      font-family: var(--font-display); font-size: clamp(2.4rem, 5vw, 4.4rem);
      font-weight: 700; line-height: 1.02; letter-spacing: -0.03em; margin: 10px 0 18px;
    }

    .${p}-makeover-grid {
      margin-top: 36px; display: grid; grid-template-columns: 1fr 1fr; gap: 22px; align-items: stretch;
    }
    .${p}-service-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    }
    .${p}-service-card {
      border-radius: 24px; padding: 24px; background: var(--surface); border: 1px solid var(--border);
      cursor: pointer; transition: all 0.22s ease; text-align: left;
    }
    .${p}-service-card.is-active, .${p}-service-card:hover {
      background: var(--navy); color: #fff; border-color: var(--navy);
      transform: translateY(-3px);
    }
    .${p}-implant-banner {
      margin-top: 36px; border-radius: 32px; padding: clamp(28px, 4vw, 48px);
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border: 1px solid rgba(2, 132, 199, 0.2);
      display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 28px; align-items: center;
    }
    .${p}-modal {
      position: fixed; inset: 0; background: rgba(15, 23, 42, 0.72); backdrop-filter: blur(12px);
      display: none; align-items: center; justify-content: center; z-index: 999; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 500px; width: 100%; border-radius: 28px; padding: 32px;
      background: #fff; color: var(--text); border: 1px solid var(--border);
    }
    @media (max-width: 960px) {
      .${p}-mosaic-hero, .${p}-makeover-grid, .${p}-implant-banner { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .${p}-service-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="${p}-shell">
    <header class="${p}-navbar">
      <a href="#main-content" class="${p}-brand">
        <span style="width:36px;height:36px;border-radius:50%;background:#0284c7;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800;">🦷</span>
        <div>
          <strong style="font-size:15px;display:block;line-height:1.1;">DENTAL HEALTH</strong>
          <span style="font-size:11px;color:var(--muted);">quality healthcare</span>
        </div>
      </a>

      <nav style="display:flex;gap:22px;flex-wrap:wrap;font-size:13px;font-weight:600;">
        <a href="#smile-gallery" style="color:var(--muted);text-decoration:none;">Smile Makeover</a>
        <a href="#smile-gallery" style="color:var(--muted);text-decoration:none;">Veneers &amp; Crowns</a>
        <a href="#implant-section" style="color:var(--muted);text-decoration:none;">Implant Dentistry</a>
      </nav>

      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <button type="button" id="motionToggleBtn" class="${p}-pill" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-pill is-active">📞 Dental Emergency</button>
      </div>
    </header>

    <main id="main-content">
      <section class="${p}-mosaic-hero tabular-nums" aria-labelledby="heroHeading">
        <div class="${p}-feature-bars">
          <article class="${p}-feature-bar">
            <span style="font-family:var(--font-mono);font-size:11px;color:#38bdf8;">01 // PRECISION</span>
            <h2 style="font-family:var(--font-display);font-size:22px;margin-top:6px;">Advanced Dentistry</h2>
            <p style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:4px;">3D CBCT digital scanning &amp; painless laser protocols.</p>
          </article>
          <article class="${p}-feature-bar">
            <span style="font-family:var(--font-mono);font-size:11px;color:#38bdf8;">02 // TECHNOLOGY</span>
            <h2 style="font-family:var(--font-display);font-size:22px;margin-top:6px;">High Quality Equipment</h2>
            <p style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:4px;">Same-day CAD/CAM porcelain restorations.</p>
          </article>
          <article class="${p}-feature-bar">
            <span style="font-family:var(--font-mono);font-size:11px;color:#38bdf8;">03 // PATIENT CARE</span>
            <h2 style="font-family:var(--font-display);font-size:22px;margin-top:6px;">Friendly Staff</h2>
            <p style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:4px;">Bilingual West New York care team &amp; 0% financing.</p>
          </article>
        </div>

        <div class="${p}-main-card">
          <img class="${p}-main-card-bg" src="${heroImg}" alt="Modern Dental Care Clinic in West New York" />
          <div class="${p}-main-card-content" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <span style="padding:8px 16px;border-radius:999px;background:rgba(255,255,255,0.18);backdrop-filter:blur(12px);font-size:12px;font-weight:600;">
              ✦ Complete Dental Care under One Roof
            </span>
            <span style="font-family:var(--font-mono);font-size:12px;color:#7dd3fc;">WEST NEW YORK, NJ</span>
          </div>

          <div class="${p}-main-card-content">
            <p style="font-size:18px;font-weight:500;color:rgba(255,255,255,0.9);">Trusted Dentist in West New York</p>
            <h1 id="heroHeading" class="${p}-h1">Dental Care</h1>
            <p style="font-size:15px;color:rgba(255,255,255,0.84);max-width:48ch;margin-bottom:22px;">
              Experience stress-free cosmetic, restorative, and implant dentistry backed by 3D digital smile design and transparent treatment plans.
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <button type="button" class="${p}-pill is-active" data-seamless-trigger="Book Free Dental Consultation">Free Consultation →</button>
              <a href="#smile-gallery" class="${p}-pill">Explore Smile Makeover</a>
            </div>
          </div>
        </div>
      </section>

      <section id="smile-gallery" class="${p}-makeover-grid tabular-nums" aria-labelledby="makeoverHeading">
        <div style="position:relative;border-radius:28px;overflow:hidden;min-height:380px;background:linear-gradient(145deg,#0f172a,#1e3a8a);color:#fff;padding:32px;display:flex;flex-direction:column;justify-content:space-between;">
          <img src="${heroImg}" alt="" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 25%;opacity:0.35;filter:saturate(1.15);" />
          <div style="position:relative;z-index:2;">
            <span style="font-family:var(--font-mono);font-size:11px;color:#7dd3fc;">COSMETIC EXCELLENCE</span>
            <h2 id="makeoverHeading" style="font-family:var(--font-display);font-size:32px;margin-top:6px;">Smile Gallery &amp; Smile Makeover</h2>
          </div>
          <div style="position:relative;z-index:2;background:rgba(15,23,42,0.84);backdrop-filter:blur(14px);padding:18px;border-radius:20px;">
            <strong id="activeDentalTitle" style="font-size:17px;display:block;margin-bottom:4px;">01 // Porcelain Dental Veneers</strong>
            <p id="activeDentalDesc" style="font-size:13px;color:rgba(255,255,255,0.8);">
              Ultra-thin custom ceramic shells crafted to close gaps, lengthen worn enamel, and deliver a permanent Hollywood shade.
            </p>
          </div>
        </div>

        <div class="${p}-service-grid" role="group" aria-label="Cosmetic Dental Treatments">
          <button type="button" class="${p}-service-card is-active dental-service-btn" data-next-preview="true" data-title="01 // Porcelain Dental Veneers" data-desc="Ultra-thin custom ceramic shells crafted to close gaps, lengthen worn enamel, and deliver a permanent Hollywood shade.">
            <span style="font-family:var(--font-mono);font-size:12px;color:#0284c7;display:block;margin-bottom:8px;">01</span>
            <h3 style="font-family:var(--font-display);font-size:21px;margin-bottom:6px;">Dental Veneers</h3>
            <p style="font-size:13px;opacity:0.8;">Custom stain-resistant porcelain veneers in 2 visits.</p>
          </button>

          <button type="button" class="${p}-service-card dental-service-btn" data-next-preview="true" data-title="02 // Zirconia &amp; E-Max Dental Crowns" data-desc="Full-coverage digital crowns milled with micron accuracy to restore fractured or root-canal treated teeth.">
            <span style="font-family:var(--font-mono);font-size:12px;color:#0284c7;display:block;margin-bottom:8px;">02</span>
            <h3 style="font-family:var(--font-display);font-size:21px;margin-bottom:6px;">Dental Crowns</h3>
            <p style="font-size:13px;opacity:0.8;">Biocompatible zirconia strength with natural translucency.</p>
          </button>

          <button type="button" class="${p}-service-card dental-service-btn" data-next-preview="true" data-title="03 // Clinical LED Teeth Whitening" data-desc="Up to 8 shades brighter in a single 60-minute chairside session with zero post-treatment sensitivity.">
            <span style="font-family:var(--font-mono);font-size:12px;color:#0284c7;display:block;margin-bottom:8px;">03</span>
            <h3 style="font-family:var(--font-display);font-size:21px;margin-bottom:6px;">Teeth Whitening</h3>
            <p style="font-size:13px;opacity:0.8;">Desensitizing enamel-safe whitening gel &amp; take-home trays.</p>
          </button>

          <button type="button" class="${p}-service-card dental-service-btn" data-next-preview="true" data-title="04 // Full-Arch Dental Implants" data-desc="Titanium and zirconia root replacements guided by 3D CBCT tomography for lifetime chewing stability.">
            <span style="font-family:var(--font-mono);font-size:12px;color:#0284c7;display:block;margin-bottom:8px;">04</span>
            <h3 style="font-family:var(--font-display);font-size:21px;margin-bottom:6px;">Dental Implants</h3>
            <p style="font-size:13px;opacity:0.8;">Permanent single-tooth &amp; All-on-4 implant restorations.</p>
          </button>
        </div>
      </section>

      <section id="implant-section" class="${p}-implant-banner" aria-labelledby="implantHeading">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:#0284c7;font-weight:700;">PERMANENT TOOTH REPLACEMENT</span>
          <h2 id="implantHeading" style="font-family:var(--font-display);font-size:clamp(1.8rem,3.4vw,2.7rem);margin:8px 0 12px;">Implant Dentistry — Restore Missing Teeth</h2>
          <p style="font-size:15px;color:var(--muted);max-width:52ch;margin-bottom:20px;">
            Look, feel, and function like natural teeth. Our computer-guided implant placement preserves jawbone density and restores 99% of natural bite force.
          </p>
          <button type="button" class="${p}-pill is-active" data-seamless-trigger="Schedule 3D Implant Scan &amp; Consultation">Book 3D CBCT Implant Scan →</button>
        </div>
        <div style="text-align:center;">
          <img src="${section3Img1}" alt="3D Dental Implant Restorations" style="width:100%;max-width:360px;height:240px;object-fit:cover;border-radius:24px;box-shadow:0 18px 40px rgba(2,132,199,0.18);" />
        </div>
      </section>
    </main>

    <footer style="margin-top:44px;padding:24px 0 36px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
      <span>© 2026 Dental Health Quality Healthcare — West New York, NJ.</span>
      <span style="font-family:var(--font-mono);color:#0284c7;">EMERGENCY LINE: (201) 555-0194</span>
    </footer>
  </div>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:#0284c7;">DENTAL HEALTH APPOINTMENT DESK</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:24px;margin-bottom:10px;">Book Your Free Consultation</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Includes complimentary digital X-rays, 3D intraoral scan, and a personalized cosmetic or implant treatment plan.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill is-active" style="width:100%;justify-content:center;">Confirm Patient Appointment</button>
    </div>
  </div>

  <script>
    (function () {
      var tOut = document.getElementById('activeDentalTitle');
      var dOut = document.getElementById('activeDentalDesc');
      document.querySelectorAll('.dental-service-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.dental-service-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          if (tOut) tOut.textContent = btn.getAttribute('data-title') || '';
          if (dOut) dOut.textContent = btn.getAttribute('data-desc') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 16. IMPACT VENTURES (t197 — Premium Tier — Atelier UX and App Design for Bold Ventures)
  // Fullscreen Video Hero + Instrument Serif Italic Typography + Interactive Case Studies
  // ============================================================================
  if (spec.slug === 'impact-ventures') {
    const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204103_f607742e-09da-4cf5-bb06-4e67b0a531de.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Atelier — UX and App Design for Bold Ventures</title>
  <meta name="description" content="We shape digital products that define brands and unlock exponential growth. UX and App Design for Bold Ventures.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #08080c;
      --surface: rgba(255, 255, 255, 0.06);
      --text: #ffffff;
      --muted: rgba(255, 255, 255, 0.68);
      --border: rgba(255, 255, 255, 0.16);
      --font-serif: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      overflow-x: clip;
      max-width: 100%;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: #fff; color: #000; font-weight: 700; border-radius: 999px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid #fff; }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }

    .${p}-hero {
      position: relative; min-height: 100vh; width: 100%; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 24px clamp(20px, 5vw, 56px) 56px;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      z-index: 0; opacity: 0.72; pointer-events: none;
    }
    .${p}-hero-scrim {
      position: absolute; inset: 0; z-index: 1;
      background: radial-gradient(circle at 50% 45%, rgba(8, 8, 12, 0.28) 0%, rgba(8, 8, 12, 0.82) 100%);
      pointer-events: none;
    }
    .${p}-nav {
      position: relative; z-index: 10; max-width: 1320px; width: 100%; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
    }
    .${p}-brand {
      font-family: var(--font-serif); font-size: 32px; color: #fff; text-decoration: none; letter-spacing: -0.02em;
    }
    .${p}-nav-links {
      display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
      padding: 10px 24px; border-radius: 999px; background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border); backdrop-filter: blur(16px);
    }
    .${p}-nav-link { color: rgba(255, 255, 255, 0.78); text-decoration: none; font-size: 14px; transition: color 0.2s; }
    .${p}-nav-link:hover { color: #fff; }
    .${p}-pill {
      padding: 10px 22px; border-radius: 999px; border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.1); color: #fff; font-size: 13px; font-weight: 600;
      cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
      backdrop-filter: blur(12px); transition: all 0.22s ease;
    }
    .${p}-pill:hover, .${p}-pill.is-active {
      background: #ffffff; color: #08080c; border-color: #ffffff;
    }

    .${p}-hero-center {
      position: relative; z-index: 10; max-width: 980px; margin: auto; text-align: center;
      padding: 64px 0;
    }
    .${p}-h1 {
      font-family: var(--font-serif); font-size: clamp(3.1rem, 7.6vw, 6.4rem);
      font-weight: 400; line-height: 0.96; letter-spacing: -0.02em; margin-bottom: 22px;
    }
    .${p}-h1 em { font-style: italic; font-weight: 400; color: rgba(255, 255, 255, 0.9); }

    .${p}-section {
      max-width: 1320px; margin: 0 auto; padding: 80px clamp(20px, 5vw, 56px);
    }
    .${p}-case-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 28px;
    }
    .${p}-case-card {
      border-radius: 26px; padding: 28px; background: var(--surface); border: 1px solid var(--border);
      cursor: pointer; transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .${p}-case-card:hover, .${p}-case-card.is-active {
      transform: translateY(-5px); border-color: #fff; background: rgba(255, 255, 255, 0.11);
    }
    .${p}-modal {
      position: fixed; inset: 0; background: rgba(8, 8, 12, 0.86); backdrop-filter: blur(16px);
      display: none; align-items: center; justify-content: center; z-index: 999; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px; width: 100%; border-radius: 28px; padding: 32px;
      background: #12121a; border: 1px solid var(--border);
    }
    @media (max-width: 920px) {
      .${p}-case-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <main id="main-content">
    <section class="${p}-hero tabular-nums" aria-labelledby="heroHeading">
      <video class="${p}-bg-video" src="${heroVideo}" autoplay muted loop playsinline preload="auto"></video>
      <div class="${p}-hero-scrim"></div>

      <header class="${p}-nav">
        <a href="#main-content" class="${p}-brand">Atelier</a>
        <nav class="${p}-nav-links" aria-label="Primary Navigation">
          <a href="#venture-cases" class="${p}-nav-link">Projects</a>
          <a href="#venture-cases" class="${p}-nav-link">Expertise</a>
          <a href="#venture-cases" class="${p}-nav-link">Studio</a>
          <a href="#venture-cases" class="${p}-nav-link">Insights</a>
        </nav>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <button type="button" id="motionToggleBtn" class="${p}-pill" aria-pressed="false">Motion: ON</button>
          <button type="button" id="exploreMagneticBtn" class="${p}-pill is-active">Let's Talk ↗</button>
        </div>
      </header>

      <div class="${p}-hero-center">
        <span style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;color:var(--muted);display:inline-block;margin-bottom:16px;">
          ATELIER VENTURE DESIGN PARTNER • SERIES A–C
        </span>
        <h1 id="heroHeading" class="${p}-h1">
          UX <em>and</em> APP DESIGN<br /><em>for</em> BOLD VENTURES
        </h1>
        <p style="font-size:clamp(1rem,1.4vw,1.2rem);color:var(--muted);max-width:46ch;margin:0 auto 28px;line-height:1.6;">
          We shape digital products that define brands and unlock exponential growth.
        </p>
        <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
          <a href="#venture-cases" class="${p}-pill is-active">See Cases →</a>
          <button type="button" class="${p}-pill" data-seamless-trigger="Atelier 2026 Product Design Showreel">Watch Reel ▶</button>
        </div>
      </div>

      <div style="position:relative;z-index:10;max-width:1320px;width:100%;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-family:var(--font-mono);font-size:12px;color:var(--muted);border-top:1px solid var(--border);padding-top:18px;">
        <span>$4.2B+ CLIENT VALUATION CREATED</span>
        <span id="activeVentureReadout" style="color:#fff;">FEATURED CASE: Veloce Autonomous Treasury (+310% Activation)</span>
        <span>LONDON • NEW YORK • BERLIN</span>
      </div>
    </section>

    <section id="venture-cases" class="${p}-section tabular-nums" aria-labelledby="casesHeading">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">SELECTED VENTURE OUTCOMES</span>
          <h2 id="casesHeading" style="font-family:var(--font-serif);font-size:clamp(2.2rem,4vw,3.4rem);font-weight:400;margin-top:6px;">
            Category-Defining <em>Product Launches</em>
          </h2>
        </div>
      </div>

      <div class="${p}-case-grid" role="group" aria-label="Interactive Venture Case Studies">
        <article class="${p}-case-card is-active venture-case-btn" tabindex="0" role="button" data-next-preview="true" data-readout="FEATURED CASE: Veloce Autonomous Treasury (+310% Activation)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">01 // FINTECH OS • SERIES B</span>
          <h3 style="font-family:var(--font-serif);font-size:28px;font-weight:400;margin:10px 0;">Veloce Treasury</h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:16px;">Redesigned multi-currency liquidity routing and iOS biometric approval workflows.</p>
          <strong style="font-family:var(--font-mono);font-size:13px;color:#fff;">+310% Enterprise Activation →</strong>
        </article>

        <article class="${p}-case-card venture-case-btn" tabindex="0" role="button" data-next-preview="true" data-readout="FEATURED CASE: Kinetix AI Health Companion (4.9★ App Store)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">02 // BIOHEALTH • SERIES A</span>
          <h3 style="font-family:var(--font-serif);font-size:28px;font-weight:400;margin:10px 0;">Kinetix Longevity</h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:16px;">Wearable biomarker synthesis and conversational AI coaching native mobile app.</p>
          <strong style="font-family:var(--font-mono);font-size:13px;color:#fff;">4.9★ App Store • 1.2M MAU →</strong>
        </article>

        <article class="${p}-case-card venture-case-btn" tabindex="0" role="button" data-next-preview="true" data-readout="FEATURED CASE: Orbital Spatial Workspace ($85M Series C)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">03 // SPATIAL SAAS • SERIES C</span>
          <h3 style="font-family:var(--font-serif);font-size:28px;font-weight:400;margin:10px 0;">Orbital Canvas</h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:16px;">Multiplayer WebGL product architecture and design system for 40,000 engineering teams.</p>
          <strong style="font-family:var(--font-mono);font-size:13px;color:#fff;">$85M Series C Raised →</strong>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-section" style="padding-top:24px;padding-bottom:44px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 Atelier Venture Design Partner.</span>
    <span style="font-family:var(--font-mono);">UX &amp; APP DESIGN FOR BOLD VENTURES</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">ATELIER PARTNER DESK</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-serif);font-size:30px;font-weight:400;margin-bottom:10px;">Shape Your Venture Flagship</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Book an executive product audit or partner sprint directly with Atelier's founding design directors.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill is-active" style="width:100%;justify-content:center;">Schedule Founder Session</button>
    </div>
  </div>

  <script>
    (function () {
      var out = document.getElementById('activeVentureReadout');
      document.querySelectorAll('.venture-case-btn').forEach(function (card) {
        card.addEventListener('click', function () {
          document.querySelectorAll('.venture-case-btn').forEach(function (c) { c.classList.remove('is-active'); });
          card.classList.add('is-active');
          if (out) out.textContent = card.getAttribute('data-readout') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 13. WANDERFUL HERO (wanderful-hero — Free Tier)
  // Full-Viewport Cinematic Travel Hero with CloudFront Video & .liquid-glass UI
  // ============================================================================
  if (slug === 'wanderful-hero') {
    const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4';
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Wanderful™ — Venture Without Edges • Uncover With Keen Instinct</title>
  <meta name="description" content="Smart bespoke travel itineraries that shape around your rhythm, your vibe, and your hunger for adventure — featuring liquid-glass navigation and parallax cinema." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #000000;
      --text: #FFFFFF;
      --muted: rgba(255, 255, 255, 0.55);
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-body: 'Barlow', sans-serif;
      --font-serif: 'Instrument Serif', Georgia, serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      overflow-x: clip;
      max-width: 100%;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: #fff; color: #000; font-weight: 700; border-radius: 999px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid #fff; }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    /* Official MotionSites .liquid-glass utility */
    .liquid-glass {
      background: rgba(255, 255, 255, 0.04);
      background-blend-mode: luminosity;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: none;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.14);
      position: relative;
      overflow: hidden;
    }
    .liquid-glass::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.4px;
      background: linear-gradient(180deg,
        rgba(255, 255, 255, 0.45) 0%,
        rgba(255, 255, 255, 0.15) 20%,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0) 60%,
        rgba(255, 255, 255, 0.15) 80%,
        rgba(255, 255, 255, 0.45) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .${p}-hero {
      position: relative;
      min-height: 100vh;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 32px clamp(20px, 4vw, 44px) 52px;
      background: radial-gradient(circle at 50% 38%, #1C2E38 0%, #091015 62%, #000000 100%);
    }
    .${p}-video-wrap {
      position: absolute;
      inset: 0;
      z-index: 0;
      transform: scale(1.08);
      transform-origin: center;
      pointer-events: none;
    }
    .${p}-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.86;
    }
    .${p}-scrim {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.16) 48%, rgba(0,0,0,0.74) 100%);
      pointer-events: none;
    }

    /* Header */
    .${p}-header {
      position: relative;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .${p}-wordmark {
      font-size: 17px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #fff;
      text-decoration: none;
    }
    .${p}-wordmark sup {
      font-size: 9px;
      letter-spacing: 0.04em;
      margin-left: 2px;
      opacity: 0.85;
    }
    .${p}-nav {
      border-radius: 999px;
      padding: 8px;
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
    .${p}-nav a {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.12em;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 6px 16px;
      border-radius: 999px;
      transition: color 0.2s ease, background 0.2s ease;
    }
    .${p}-nav a:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }
    .${p}-roam-btn {
      border-radius: 999px;
      padding: 10px 20px;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.12em;
      color: rgba(255, 255, 255, 0.92);
      cursor: pointer;
    }

    /* Centered Headline */
    .${p}-headline-wrap {
      position: relative;
      z-index: 10;
      text-align: center;
      margin: 48px auto 24px;
      max-width: 980px;
    }
    .${p}-h1 {
      font-family: var(--font-sans);
      font-weight: 400;
      font-size: clamp(2.5rem, 5.4vw, 4.5rem);
      line-height: 1.1;
      letter-spacing: -0.02em;
    }
    .${p}-h1-line1 { display: block; color: #FFFFFF; }
    .${p}-h1-line2 { display: block; color: rgba(255, 255, 255, 0.55); }

    /* Bottom Block */
    .${p}-bottom-block {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      text-align: center;
    }
    .${p}-lead {
      max-width: 620px;
      font-size: 15px;
      line-height: 1.65;
      color: #FFFFFF;
    }
    .${p}-lead span {
      color: rgba(255, 255, 255, 0.55);
    }
    .${p}-cta-white {
      background: #FFFFFF;
      color: #000000;
      font-size: 15px;
      font-weight: 500;
      border-radius: 999px;
      padding: 14px 32px;
      border: none;
      cursor: pointer;
      transition: transform 0.22s ease, box-shadow 0.22s ease;
    }
    .${p}-cta-white:hover {
      transform: scale(1.03);
      box-shadow: 0 0 32px 4px rgba(255, 255, 255, 0.24);
    }
    .${p}-lock-row {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.14em;
      color: rgba(255, 255, 255, 0.72);
    }

    /* Below-the-fold Smart Itinerary Section */
    .${p}-section {
      max-width: 1240px;
      margin: 0 auto;
      padding: 72px clamp(20px, 4vw, 44px);
    }
    .${p}-route-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 28px;
    }
    .${p}-route-card {
      border-radius: 24px;
      padding: 28px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      transition: all 0.24s ease;
    }
    .${p}-route-card.is-active, .${p}-route-card:hover {
      border-color: rgba(255, 255, 255, 0.55);
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-4px);
    }

    .${p}-modal {
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.82); backdrop-filter: blur(16px);
      display: none; align-items: center; justify-content: center; z-index: 999; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 480px; width: 100%; border-radius: 26px; padding: 32px;
      background: #0D1117; color: #fff; border: 1px solid rgba(255, 255, 255, 0.22);
    }

    @media (max-width: 860px) {
      .${p}-nav { display: none; }
      .${p}-route-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <main id="main-content" class="tabular-nums">
    <section class="${p}-hero" aria-labelledby="heroHeading">
      <div id="wanderVideoWrap" class="${p}-video-wrap">
        <video id="wanderHeroVideo" class="${p}-video" src="${heroVideo}" autoplay muted loop playsinline preload="auto"></video>
      </div>
      <div class="${p}-scrim"></div>

      <header class="${p}-header">
        <a href="#main-content" class="${p}-wordmark">Wanderful<sup>TM</sup></a>
        <nav class="${p}-nav liquid-glass" aria-label="Primary Navigation">
          <a href="#journey-section">JOURNEY</a>
          <a href="#journey-section">BENEFITS</a>
          <a href="#journey-section">JOURNAL</a>
          <a href="#journey-section">GUIDEBOOK</a>
        </nav>
        <div style="display:flex;align-items:center;gap:10px;">
          <button type="button" id="motionToggleBtn" class="liquid-glass ${p}-roam-btn" aria-pressed="false">MOTION: ON</button>
          <button type="button" id="exploreMagneticBtn" class="liquid-glass ${p}-roam-btn">GET ROAMING</button>
        </div>
      </header>

      <div class="${p}-headline-wrap">
        <h1 id="heroHeading" class="${p}-h1">
          <span class="${p}-h1-line1">Venture without edges.</span>
          <span class="${p}-h1-line2">Uncover with keen instinct.</span>
        </h1>
      </div>

      <div class="${p}-bottom-block">
        <p class="${p}-lead">
          Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure.<span> Each getaway is tailored, seamless, and wholly yours.</span>
        </p>
        <button type="button" class="${p}-cta-white" data-seamless-trigger="Plan Your Tailored Wanderful™ Escape">
          Plan my escape today
        </button>
        <div class="${p}-lock-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>SECURE BY DESIGN. ZERO DATA LEAKS.</span>
        </div>
      </div>
    </section>

    <!-- Below-the-Fold Interactive Rhythm & Vibe Itinerary Configurator -->
    <section id="journey-section" class="${p}-section" aria-labelledby="journeyHeading">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.14em;color:var(--muted);">SMART ITINERARY ENGINE // RHYTHM &amp; VIBE</span>
          <h2 id="journeyHeading" style="font-size:clamp(1.8rem,3.4vw,2.8rem);font-weight:400;margin-top:6px;">
            Tailored Getaways Built on Instinct
          </h2>
        </div>
        <span id="wanderRouteStatus" style="font-family:var(--font-mono);font-size:12px;color:#fff;">
          ACTIVE ESCAPE: Faroe Islands Coastal Ridge (7 Days • Solitude Rhythm)
        </span>
      </div>

      <div class="${p}-route-grid" role="group" aria-label="Select Tailored Expedition">
        <article class="${p}-route-card is-active wander-route-btn" tabindex="0" role="button" data-next-preview="true" data-status="ACTIVE ESCAPE: Faroe Islands Coastal Ridge (7 Days • Solitude Rhythm)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">01 // NORDIC INSTINCT</span>
          <h3 style="font-size:22px;font-weight:500;margin:10px 0;">Faroe Cliffs &amp; Fjords</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Private helicopter ridge transfers, sea-cliff glass cabins, and zero-crowd coastal trails.</p>
        </article>

        <article class="${p}-route-card wander-route-btn" tabindex="0" role="button" data-next-preview="true" data-status="ACTIVE ESCAPE: Kyoto Moss Sanctuary &amp; Naoshima Art (9 Days • Slow Vibe)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">02 // ZEN ARCHIPELAGO</span>
          <h3 style="font-size:22px;font-weight:500;margin:10px 0;">Kyoto &amp; Seto Inland Sea</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">After-hours temple gardens, private ryokan cedar baths, and architectural island hopping.</p>
        </article>

        <article class="${p}-route-card wander-route-btn" tabindex="0" role="button" data-next-preview="true" data-status="ACTIVE ESCAPE: Atacama Stargazer &amp; Patagonia Glaciers (11 Days • High Altitude)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">03 // SOUTHERN HORIZON</span>
          <h3 style="font-size:22px;font-weight:500;margin:10px 0;">Atacama to Torres del Paine</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">High-desert astronomical domes paired with private ice-field treks at the edge of the world.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);">WANDERFUL™ CONCIERGE</span>
        <button type="button" id="closeSeamlessBtn" class="liquid-glass ${p}-roam-btn">ESC</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;font-weight:500;margin-bottom:10px;">Plan My Escape Today</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Share your preferred pace, climate, and dates — our encrypted itinerary engine synthesizes a bespoke route in 90 seconds.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-cta-white" style="width:100%;">Generate Private Itinerary →</button>
    </div>
  </div>

  <script>
    (function () {
      var vid = document.getElementById('wanderHeroVideo');
      var wrap = document.getElementById('wanderVideoWrap');
      if (vid) {
        vid.addEventListener('loadedmetadata', function () {
          try { vid.playbackRate = 1.25; } catch (e) {}
        });
      }
      var targetX = 0, targetY = 0, currentX = 0, currentY = 0;
      window.addEventListener('mousemove', function (e) {
        var cx = window.innerWidth / 2 || 1;
        var cy = window.innerHeight / 2 || 1;
        targetX = ((e.clientX - cx) / cx) * 20;
        targetY = ((e.clientY - cy) / cy) * 20;
      });
      function tick() {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        if (wrap && !document.body.classList.contains('is-motion-paused')) {
          wrap.style.transform = 'scale(1.08) translate3d(' + currentX.toFixed(2) + 'px,' + currentY.toFixed(2) + 'px,0)';
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      var out = document.getElementById('wanderRouteStatus');
      document.querySelectorAll('.wander-route-btn').forEach(function (card) {
        card.addEventListener('click', function () {
          document.querySelectorAll('.wander-route-btn').forEach(function (c) { c.classList.remove('is-active'); });
          card.classList.add('is-active');
          if (out) out.textContent = card.getAttribute('data-status') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 14. WELLNESS COMPANION (wellness-companion — Premium Tier)
  // Vitaforge Daily Mobile Wellness Quiz Inside Realistic 375x780 Phone Frame
  // ============================================================================
  if (slug === 'wellness-companion') {
    const bgImg = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260704_143500_a76b8e64-2c69-4683-80e7-2bb060a921d6.png&w=1280&q=85';
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Vitaforge Daily — Personalized Mobile Wellness Companion</title>
  <meta name="description" content="Interactive mobile wellness companion quiz inside a realistic iPhone Dynamic Island frame featuring liquid-glass selection cards, voice biomarker input, and slide-to-confirm protocol." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --page-bg: #F4F6F8;
      --phone-bg: #8A9AAA;
      --text: #FFFFFF;
      --ink: #111827;
      --font-sans: 'Helvetica Now Var', 'Helvetica Neue', 'Inter', Helvetica, Arial, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: radial-gradient(circle at 50% 25%, #FFFFFF 0%, #E8EEF3 100%);
      color: var(--ink);
      font-family: var(--font-sans);
      overflow-x: clip;
      max-width: 100%;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: #1A1A1E; color: #fff; font-weight: 700; border-radius: 999px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid #1A1A1E; }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid #D4AF37; outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    /* Official Liquid Glass & Selected States */
    .liquid-glass {
      background: rgba(255, 255, 255, 0.04);
      background-blend-mode: luminosity;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.12);
      position: relative;
      overflow: hidden;
      border: none;
    }
    .liquid-glass::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.4px;
      background: linear-gradient(180deg,
        rgba(255, 255, 255, 0.45) 0%,
        rgba(255, 255, 255, 0.15) 20%,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0) 60%,
        rgba(255, 255, 255, 0.15) 80%,
        rgba(255, 255, 255, 0.45) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    .liquid-glass-selected {
      background: rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.25);
      position: relative;
      overflow: hidden;
      border: none;
    }
    .liquid-glass-selected::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.4px;
      background: linear-gradient(180deg,
        rgba(255, 255, 255, 0.65) 0%,
        rgba(255, 255, 255, 0.28) 20%,
        rgba(255, 255, 255, 0.05) 40%,
        rgba(255, 255, 255, 0.05) 60%,
        rgba(255, 255, 255, 0.28) 80%,
        rgba(255, 255, 255, 0.65) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .${p}-shell {
      max-width: 1280px;
      margin: 0 auto;
      padding: 20px clamp(16px, 4vw, 44px) 60px;
    }
    .${p}-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }
    .${p}-stage {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 36px;
      align-items: center;
    }
    .${p}-side-card {
      background: #FFFFFF;
      border-radius: 28px;
      padding: 26px;
      border: 1px solid rgba(17, 24, 39, 0.08);
      box-shadow: 0 20px 50px rgba(17, 24, 39, 0.06);
    }

    /* Realistic 375x780 Phone Frame Mockup */
    .${p}-phone-frame {
      width: 375px;
      height: 780px;
      border-radius: 52px;
      background: var(--phone-bg);
      box-shadow:
        inset 0 0 0 2px rgba(255, 255, 255, 0.08),
        0 0 0 1px rgba(0, 0, 0, 0.6),
        0 0 0 10px #1A1A1E,
        0 0 0 11px rgba(255, 255, 255, 0.06),
        0 24px 60px rgba(0, 0, 0, 0.45);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 56px 24px 24px;
      color: #FFFFFF;
      margin: 0 auto;
    }
    .${p}-dynamic-island {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 32px;
      border-radius: 999px;
      background: #000000;
      z-index: 50;
    }
    .${p}-phone-bg {
      position: absolute;
      inset: 0;
      background-image: url('${bgImg}');
      background-size: cover;
      background-position: center;
      filter: blur(12px);
      transform: scale(1.1);
      z-index: 0;
    }
    .${p}-phone-overlay {
      position: absolute;
      inset: 0;
      background: rgba(138, 154, 170, 0.32);
      z-index: 1;
    }

    .${p}-phone-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }
    .${p}-quiz-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 18px 0;
    }
    .${p}-quiz-card {
      border-radius: 32px;
      height: 100px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      color: #FFFFFF;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .${p}-quiz-card:hover { transform: translateY(-2px); }

    /* Voice Button with Yellow/Gold Radial Glow */
    .${p}-voice-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 16px 0;
    }
    .${p}-voice-glow {
      position: absolute;
      width: 150px;
      height: 150px;
      top: -36px;
      background: radial-gradient(ellipse at center, rgba(220, 200, 80, 0.52) 0%, rgba(180, 160, 40, 0.22) 40%, transparent 70%);
      pointer-events: none;
    }
    .${p}-voice-btn {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
      position: relative;
      z-index: 2;
    }

    /* Slide-to-Confirm Track */
    .${p}-slider-track {
      width: 100%;
      height: 56px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 18px 6px 6px;
      position: relative;
      cursor: pointer;
    }
    .${p}-slider-thumb {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #FFFFFF;
      color: #1F2937;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .${p}-modal {
      position: fixed; inset: 0; background: rgba(17, 24, 39, 0.72); backdrop-filter: blur(12px);
      display: none; align-items: center; justify-content: center; z-index: 999; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 460px; width: 100%; border-radius: 28px; padding: 30px;
      background: #fff; color: var(--ink);
    }

    @media (max-width: 1024px) {
      .${p}-stage { grid-template-columns: 1fr; }
    }
    @media (max-width: 420px) {
      .${p}-phone-frame { width: 100%; max-width: 358px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="${p}-shell tabular-nums">
    <header class="${p}-topbar">
      <div style="display:flex;align-items:center;gap:10px;font-weight:700;font-size:16px;">
        <span style="display:inline-flex;width:30px;height:30px;border-radius:50%;background:#1A1A1E;color:#fff;align-items:center;justify-content:center;font-size:13px;">⏱</span>
        <span>Vitaforge Daily • Wellness Companion</span>
      </div>
      <div style="display:flex;gap:10px;">
        <button type="button" id="motionToggleBtn" style="padding:8px 16px;border-radius:999px;border:1px solid rgba(17,24,39,0.15);background:#fff;font-size:12px;font-weight:600;cursor:pointer;" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" style="padding:8px 18px;border-radius:999px;border:none;background:#1A1A1E;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Sync Apple Health →</button>
      </div>
    </header>

    <main id="main-content">
      <section class="${p}-stage" aria-labelledby="quizHeading">
        <!-- Left Desktop Context Card -->
        <aside class="${p}-side-card">
          <span style="font-family:var(--font-mono);font-size:11px;color:#64748B;">BIOMETRIC INTAKE // STEP 01</span>
          <h2 style="font-size:22px;font-weight:600;margin:8px 0 12px;">Adaptive Daily Longevity Stack</h2>
          <p style="font-size:14px;color:#4B5563;line-height:1.6;margin-bottom:18px;">
            Tap any wellness pillar inside the iPhone frame or use voice biomarker analysis to calibrate your morning adaptogen &amp; circadian micronutrient stack.
          </p>
          <div id="vitaSelectedSummary" style="font-family:var(--font-mono);font-size:12px;background:#F1F5F9;padding:12px 14px;border-radius:14px;color:#0F172A;">
            ACTIVE FOCUS: Stress + Skin (2 pillars selected)
          </div>
        </aside>

        <!-- Center 375x780 Realistic Phone Frame Mockup -->
        <div class="${p}-phone-frame">
          <div class="${p}-dynamic-island" aria-hidden="true"></div>
          <div class="${p}-phone-bg" aria-hidden="true"></div>
          <div class="${p}-phone-overlay" aria-hidden="true"></div>

          <div class="${p}-phone-content">
            <!-- 1. Header Badge -->
            <div>
              <div class="liquid-glass" style="display:inline-flex;align-items:center;gap:6px;padding:10px 14px;border-radius:999px;margin-bottom:32px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/></svg>
                <span style="font-size:12px;font-weight:500;color:rgba(255,255,255,0.92);">Vitaforge Daily</span>
              </div>

              <!-- 2. Title Section -->
              <div style="margin-bottom:24px;">
                <p style="font-size:14px;color:rgba(255,255,255,0.62);margin-bottom:6px;">Choose all that apply</p>
                <h1 id="quizHeading" style="font-size:28px;font-weight:400;line-height:1.15;letter-spacing:-0.02em;color:#FFFFFF;">
                  What aspects of your wellness would you like to boost?
                </h1>
              </div>

              <!-- 3. 2x2 Selection Grid -->
              <div class="${p}-quiz-grid" role="group" aria-label="Wellness Focus Options">
                <button type="button" class="${p}-quiz-card liquid-glass vita-opt-btn" data-next-preview="true" data-label="Sleep quality" aria-pressed="false">
                  <span style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.5);">01</span>
                  <span style="font-size:16px;font-weight:500;">Sleep quality</span>
                </button>

                <button type="button" class="${p}-quiz-card liquid-glass-selected vita-opt-btn is-selected" data-next-preview="true" data-label="Stress" aria-pressed="true">
                  <span style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.5);">02</span>
                  <span style="font-size:16px;font-weight:500;">Stress</span>
                </button>

                <button type="button" class="${p}-quiz-card liquid-glass vita-opt-btn" data-next-preview="true" data-label="Weight" aria-pressed="false">
                  <span style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.5);">03</span>
                  <span style="font-size:16px;font-weight:500;">Weight</span>
                </button>

                <button type="button" class="${p}-quiz-card liquid-glass-selected vita-opt-btn is-selected" data-next-preview="true" data-label="Skin" aria-pressed="true">
                  <span style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.5);">04</span>
                  <span style="font-size:16px;font-weight:500;">Skin</span>
                </button>
              </div>
            </div>

            <!-- 4. Voice Button with Gold Radial Glow -->
            <div class="${p}-voice-wrap">
              <div class="${p}-voice-glow" aria-hidden="true"></div>
              <button type="button" id="vitaVoiceBtn" class="${p}-voice-btn liquid-glass" data-next-preview="true" aria-label="Voice Input">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round">
                  <line x1="4" y1="10" x2="4" y2="14" />
                  <line x1="8" y1="7" x2="8" y2="17" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                  <line x1="16" y1="8" x2="16" y2="16" />
                  <line x1="20" y1="11" x2="20" y2="13" />
                </svg>
              </button>
              <span id="vitaVoiceLabel" style="font-size:12px;color:rgba(255,255,255,0.72);margin-top:8px;">voice</span>
            </div>

            <!-- 5. Slide-to-Confirm Button -->
            <div id="vitaSliderTrack" class="${p}-slider-track liquid-glass" role="button" tabindex="0" aria-label="Slide to confirm Done">
              <div id="vitaSliderThumb" class="${p}-slider-thumb">→</div>
              <span id="vitaSliderText" style="font-size:14px;font-weight:500;color:rgba(255,255,255,0.68);">Done</span>
              <span style="font-size:13px;letter-spacing:2px;color:rgba(255,255,255,0.5);">›››</span>
            </div>
          </div>
        </div>

        <!-- Right Desktop Telemetry Card -->
        <aside class="${p}-side-card">
          <span style="font-family:var(--font-mono);font-size:11px;color:#64748B;">DAILY FORMULATION // VITAFORGE</span>
          <h2 style="font-size:22px;font-weight:600;margin:8px 0 12px;">Clinical Bio-Availability</h2>
          <ul style="list-style:none;display:grid;gap:12px;font-size:13.5px;color:#374151;">
            <li style="padding:10px 14px;background:#F8FAFC;border-radius:12px;"><strong>Ashwagandha KSM-66® (600mg):</strong> Reduces morning serum cortisol by 27.9%.</li>
            <li style="padding:10px 14px;background:#F8FAFC;border-radius:12px;"><strong>Marine Phytoceramides (350mg):</strong> Restores epidermal barrier hydration in 14 days.</li>
            <li style="padding:10px 14px;background:#F8FAFC;border-radius:12px;"><strong>Magnesium L-Threonate:</strong> Supports deep REM sleep architecture.</li>
          </ul>
        </aside>
      </section>
    </main>
  </div>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:11px;color:#64748B;">VITAFORGE DAILY // PROTOCOL READY</span>
        <button type="button" id="closeSeamlessBtn" style="border:1px solid #CBD5E1;background:#fff;padding:5px 12px;border-radius:999px;cursor:pointer;">ESC</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">Your Personalized Wellness Pack</h2>
      <p style="font-size:14px;color:#4B5563;line-height:1.6;margin-bottom:20px;">
        Your selected wellness pillars have been compiled into a 30-day precision sachet subscription synced with your circadian timer.
      </p>
      <button type="button" id="confirmSeamlessBtn" style="width:100%;padding:14px;border-radius:999px;border:none;background:#1A1A1E;color:#fff;font-weight:600;cursor:pointer;">Claim 30-Day Starter Kit →</button>
    </div>
  </div>

  <script>
    (function () {
      var summary = document.getElementById('vitaSelectedSummary');
      function updateSummary() {
        var active = [];
        document.querySelectorAll('.vita-opt-btn.is-selected').forEach(function (b) {
          active.push(b.getAttribute('data-label'));
        });
        if (summary) {
          summary.textContent = 'ACTIVE FOCUS: ' + (active.length ? active.join(' + ') : 'None') + ' (' + active.length + ' pillars selected)';
        }
      }
      document.querySelectorAll('.vita-opt-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var sel = btn.classList.toggle('is-selected');
          btn.setAttribute('aria-pressed', String(sel));
          btn.classList.toggle('liquid-glass-selected', sel);
          btn.classList.toggle('liquid-glass', !sel);
          updateSummary();
        });
      });

      var voiceBtn = document.getElementById('vitaVoiceBtn');
      var voiceLbl = document.getElementById('vitaVoiceLabel');
      if (voiceBtn && voiceLbl) {
        voiceBtn.addEventListener('click', function () {
          voiceLbl.textContent = 'listening • 98% vocal calm';
        });
      }

      var track = document.getElementById('vitaSliderTrack');
      var thumb = document.getElementById('vitaSliderThumb');
      var txt = document.getElementById('vitaSliderText');
      if (track && thumb && txt) {
        track.addEventListener('click', function () {
          thumb.style.transform = 'translateX(245px)';
          txt.textContent = 'Confirmed ✓';
          setTimeout(function () {
            thumb.style.transform = 'translateX(0)';
          }, 1600);
        });
      }
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 15. NIKE HOVER (nike-hover — Premium Tier)
  // Full-Viewport Nike SpotlightReveal SVG Mask + 78% Cushioning Telemetry Card
  // ============================================================================
  if (slug === 'nike-hover') {
    const videoSrc = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_024949_c2df2ce2-00c2-4c26-84c6-210c14f3b98e.mp4';
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NIKE IMPACT LAB — The Science of Impact Control &amp; Cushioning Architecture</title>
  <meta name="description" content="Bringing aerospace-grade infrastructure directly to your everyday urban exploration — featuring an interactive 6-trail SVG SpotlightReveal mask, 78% impact absorption telemetry, and Nike Air dynamics." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #050507;
      --nike-red: #DA3A16;
      --text: #FFFFFF;
      --muted: rgba(255, 255, 255, 0.6);
      --card-bg: rgba(10, 10, 14, 0.56);
      --card-border: rgba(255, 255, 255, 0.14);
      --font-sans: 'Manrope', system-ui, sans-serif;
      --font-serif: 'Instrument Serif', Georgia, serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      overflow-x: clip;
      max-width: 100%;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--nike-red); color: #fff; font-weight: 700; border-radius: 4px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid #fff; }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--nike-red); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-hero {
      position: relative;
      z-index: 10;
      width: 100%;
      min-height: 100vh;
      overflow: hidden;
      background:
        radial-gradient(circle at 60% 48%, rgba(218, 58, 22, 0.34) 0%, rgba(16, 18, 26, 0.92) 52%, #050507 100%);
      box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px clamp(20px, 6vw, 88px) 64px;
    }

    /* SpotlightReveal Layer */
    .${p}-spotlight-layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .${p}-spotlight-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.45;
      mix-blend-mode: screen;
    }
    .${p}-spotlight-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    /* Top Nav Bar */
    .${p}-nav {
      position: relative;
      z-index: 30;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .${p}-pill {
      padding: 8px 18px;
      border-radius: 2px;
      border: 1px solid var(--card-border);
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(20px);
      color: #fff;
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
    }
    .${p}-pill.is-red {
      background: var(--nike-red);
      border-color: var(--nike-red);
      font-weight: 700;
    }

    /* Element 3 — Stats Card (Top-Left Area) */
    .${p}-stats-card {
      position: relative;
      z-index: 25;
      width: 340px;
      max-width: 100%;
      margin-top: 32px;
      margin-left: clamp(0px, 10vw, 160px);
      background: var(--card-bg);
      backdrop-filter: blur(80px);
      -webkit-backdrop-filter: blur(80px);
      border: 1px solid var(--card-border);
      border-radius: 2px;
      padding: 24px 32px;
    }
    .${p}-stat-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }
    .${p}-stat-num {
      font-family: var(--font-serif);
      font-style: italic;
      font-weight: 400;
      font-size: 72px;
      line-height: 80px;
      letter-spacing: -0.03em;
      color: var(--nike-red);
    }
    .${p}-card-title {
      font-family: var(--font-serif);
      font-size: 15px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: #FFFFFF;
      margin-bottom: 6px;
      line-height: 1.25;
    }
    .${p}-card-sub {
      font-family: var(--font-serif);
      font-size: 13px;
      color: var(--muted);
    }

    /* Bottom Row: Element 4 (Headline) & Element 5 (Nike Branded CTA Block) */
    .${p}-bottom-row {
      position: relative;
      z-index: 25;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 32px;
      margin-top: 48px;
    }
    .${p}-headline {
      max-width: 520px;
      font-size: clamp(28px, 3.4vw, 44px);
      line-height: 1.05;
      letter-spacing: -0.02em;
      display: flex;
      flex-direction: column;
    }
    .${p}-nike-cta {
      width: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      border: none;
      background: none;
      padding: 0;
      transition: transform 0.22s ease;
    }
    .${p}-nike-cta:hover { transform: translateY(-4px); }
    .${p}-cta-top {
      width: 100%;
      background: #FFFFFF;
      color: #000000;
      padding: 6px 8px;
      text-align: center;
      font-family: var(--font-serif);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      line-height: 16px;
    }
    .${p}-cta-bottom {
      width: 100%;
      height: 100px;
      background: var(--nike-red);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 18px 45px rgba(218, 58, 22, 0.45);
    }

    /* Below-the-Fold Force-Plate Telemetry Lab */
    .${p}-lab-section {
      max-width: 1280px;
      margin: 0 auto;
      padding: 72px clamp(20px, 6vw, 88px);
      border-top: 1px solid var(--card-border);
    }
    .${p}-lab-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 28px;
    }
    .${p}-lab-card {
      padding: 28px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--card-border);
      border-radius: 2px;
      cursor: pointer;
      transition: border-color 0.2s ease, background 0.2s ease;
    }
    .${p}-lab-card.is-active, .${p}-lab-card:hover {
      border-color: var(--nike-red);
      background: rgba(218, 58, 22, 0.09);
    }

    .${p}-modal {
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(16px);
      display: none; align-items: center; justify-content: center; z-index: 999; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 480px; width: 100%; border-radius: 2px; padding: 32px;
      background: #0A0A0C; color: #fff; border: 1px solid var(--nike-red);
    }

    @media (max-width: 860px) {
      .${p}-stats-card { margin-left: 0; width: 100%; max-width: 320px; }
      .${p}-lab-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <main id="main-content" class="tabular-nums">
    <section id="nikeHeroStage" class="${p}-hero" aria-labelledby="heroHeading">
      <!-- Element 1: SpotlightReveal Background -->
      <div class="${p}-spotlight-layer" aria-hidden="true">
        <video id="nikeRevealVideo" class="${p}-spotlight-video" src="${videoSrc}" autoplay muted loop playsinline></video>
        <svg class="${p}-spotlight-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="holeGradient">
              <stop offset="0%" stop-color="black" stop-opacity="1" />
              <stop offset="60%" stop-color="black" stop-opacity="0.82" />
              <stop offset="100%" stop-color="black" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="xrayGlow" cx="58%" cy="50%" r="42%">
              <stop offset="0%" stop-color="#DA3A16" stop-opacity="0.55" />
              <stop offset="45%" stop-color="#7C2D12" stop-opacity="0.28" />
              <stop offset="100%" stop-color="#050507" stop-opacity="0" />
            </radialGradient>
            <linearGradient id="soleChrome" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#F8FAFC" />
              <stop offset="45%" stop-color="#94A3B8" />
              <stop offset="100%" stop-color="#1E293B" />
            </linearGradient>
            <mask id="spotlight-mask" maskContentUnits="userSpaceOnUse" x="0" y="0" width="1440" height="900">
              <rect width="1440" height="900" fill="white" />
              <circle id="trail-5" cx="840" cy="450" r="245" fill="url(#holeGradient)" opacity="0.25" />
              <circle id="trail-4" cx="840" cy="450" r="275" fill="url(#holeGradient)" opacity="0.4" />
              <circle id="trail-3" cx="840" cy="450" r="305" fill="url(#holeGradient)" opacity="0.55" />
              <circle id="trail-2" cx="840" cy="450" r="335" fill="url(#holeGradient)" opacity="0.7" />
              <circle id="trail-1" cx="840" cy="450" r="365" fill="url(#holeGradient)" opacity="0.85" />
              <circle id="trail-0" cx="840" cy="450" r="395" fill="url(#holeGradient)" opacity="1" />
            </mask>
          </defs>

          <!-- UNDERNEATH LAYER (Revealed inside the Spotlight Hole): Thermal X-Ray Air-Sole & Force-Plate Vectors -->
          <g>
            <rect width="1440" height="900" fill="#07070B" />
            <circle cx="840" cy="450" r="460" fill="url(#xrayGlow)" />
            <!-- Aerospace Telemetry Grid -->
            <path d="M0,180 L1440,180 M0,360 L1440,360 M0,540 L1440,540 M0,720 L1440,720 M288,0 L288,900 M576,0 L576,900 M864,0 L864,900 M1152,0 L1152,900" stroke="rgba(218,58,22,0.16)" stroke-width="1" />
            <!-- Glowing X-Ray Sneaker Silhouette & Multi-Chamber Air-Sole -->
            <path d="M470,490 C520,355 645,270 770,250 L865,335 C955,365 1075,395 1135,465 C1165,500 1150,555 1095,565 L485,565 C445,565 445,525 470,490 Z" fill="rgba(218,58,22,0.14)" stroke="#DA3A16" stroke-width="3" />
            <!-- Carbon Flyplate Spine -->
            <path d="M480,515 Q800,470 1120,515" stroke="#FF8A65" stroke-width="5" fill="none" stroke-dasharray="12 6" />
            <!-- 6 Pressurized Nitrogen Air Pods -->
            <rect x="505" y="528" width="84" height="28" rx="14" fill="rgba(218,58,22,0.45)" stroke="#FFF" stroke-width="2" />
            <rect x="605" y="528" width="84" height="28" rx="14" fill="rgba(218,58,22,0.45)" stroke="#FFF" stroke-width="2" />
            <rect x="705" y="528" width="84" height="28" rx="14" fill="rgba(218,58,22,0.45)" stroke="#FFF" stroke-width="2" />
            <rect x="805" y="528" width="84" height="28" rx="14" fill="rgba(218,58,22,0.45)" stroke="#FFF" stroke-width="2" />
            <rect x="905" y="528" width="84" height="28" rx="14" fill="rgba(218,58,22,0.45)" stroke="#FFF" stroke-width="2" />
            <rect x="1005" y="528" width="84" height="28" rx="14" fill="rgba(218,58,22,0.45)" stroke="#FFF" stroke-width="2" />
            <!-- X-Ray Swoosh -->
            <path d="M650,435 C705,468 825,445 985,380 C845,465 715,505 635,465 C615,452 622,425 650,435 Z" fill="#FFFFFF" />
          </g>

          <!-- TOP MASKED OVERLAY LAYER (Cut open where cursor spotlight moves): Architectural Silver/Obsidian Exterior -->
          <g mask="url(#spotlight-mask)">
            <rect width="1440" height="900" fill="#10131A" />
            <path d="M0,180 L1440,180 M0,360 L1440,360 M0,540 L1440,540 M0,720 L1440,720 M288,0 L288,900 M576,0 L576,900 M864,0 L864,900 M1152,0 L1152,900" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
            <!-- Sculpted Metallic Sneaker Exterior -->
            <path d="M470,490 C520,355 645,270 770,250 L865,335 C955,365 1075,395 1135,465 C1165,500 1150,555 1095,565 L485,565 C445,565 445,525 470,490 Z" fill="url(#soleChrome)" opacity="0.28" stroke="rgba(255,255,255,0.45)" stroke-width="2" />
            <path d="M650,435 C705,468 825,445 985,380 C845,465 715,505 635,465 C615,452 622,425 650,435 Z" fill="rgba(255,255,255,0.65)" />
          </g>
        </svg>
      </div>

      <!-- Top Navigation -->
      <header class="${p}-nav">
        <div style="display:flex;align-items:center;gap:12px;font-family:var(--font-mono);font-size:12px;letter-spacing:0.12em;">
          <span style="color:var(--nike-red);font-weight:700;">●</span>
          <span>NIKE IMPACT LAB // AEROSPACE CUSHIONING</span>
        </div>
        <div style="display:flex;gap:10px;">
          <button type="button" id="motionToggleBtn" class="${p}-pill" aria-pressed="false">Motion: ON</button>
          <button type="button" id="exploreMagneticBtn" class="${p}-pill is-red">Explore Lab Specs</button>
        </div>
      </header>

      <!-- Element 3: Glassmorphism Stats Card (Top-Left Area) -->
      <div class="${p}-stats-card">
        <div class="${p}-stat-row">
          <span id="nikeStatNum" class="${p}-stat-num">78%</span>
          <svg style="width:150px;height:76px;overflow:visible;" viewBox="0 0 289 138" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Impact Absorption Curve">
            <g filter="url(#filter0_d_878_28499)">
              <path d="M22.5 48.7306C39.7833 48.7306 49.34 54.94 63.1667 69.2965C76.9933 83.653 86.55 110.5 103.833 110.5C121.117 110.5 130.673 84.2876 144.5 59.2856C158.327 34.2837 167.883 19.5573 185.167 19.5573C202.45 19.5573 208.55 57.6673 225.833 57.6673C243.117 57.6673 249.217 19.5 266.5 19.5" stroke="#DA3A16" stroke-width="2.5" />
            </g>
            <defs>
              <filter id="filter0_d_878_28499" x="0" y="0" width="289" height="138" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="11.25" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.854902 0 0 0 0 0.227451 0 0 0 0 0.0862745 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_878_28499" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_878_28499" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
        <h2 id="nikeStatTitle" class="${p}-card-title">NEXT-GEN CUSHIONING ARCHITECTURE</h2>
        <p id="nikeStatSub" class="${p}-card-sub">Impact Absorption &amp; Energy Return Dynamics</p>
      </div>

      <!-- Bottom Row: Element 4 (Headline) & Element 5 (Nike Branded CTA Block) -->
      <div class="${p}-bottom-row">
        <h1 id="heroHeading" class="${p}-headline">
          <span style="font-family:var(--font-sans);font-weight:500;">Bringing Aerospace-</span>
          <span style="font-family:var(--font-sans);font-weight:500;">Grade Infrastructure</span>
          <span style="font-family:var(--font-serif);font-weight:400;padding-top:4px;">
            <span style="font-style:normal;">Directly To Your </span>
            <em style="font-style:italic;">Everyday</em>
          </span>
          <span style="font-family:var(--font-serif);font-style:italic;font-weight:400;">Urban Exploration</span>
        </h1>

        <button type="button" class="${p}-nike-cta" data-seamless-trigger="THE SCIENCE OF IMPACT CONTROL // Technical Dossier">
          <div class="${p}-cta-top">THE SCIENCE OF IMPACT CONTROL</div>
          <div class="${p}-cta-bottom">
            <svg width="86" viewBox="135.5 361.38 420.32 149.8" fill="white" xmlns="http://www.w3.org/2000/svg" aria-label="Nike Swoosh">
              <path d="m181.86 511.11c-12.524-0.49755-22.77-3.9244-30.782-10.289-1.529-1.2159-5.1725-4.8616-6.3949-6.3992-3.2489-4.0853-5.4578-8.0611-6.931-12.472-4.5334-13.579-2.2002-31.397 6.6737-50.953 7.5979-16.742 19.322-33.347 39.776-56.344 3.013-3.384 11.986-13.281 12.043-13.281 0.0216 0-0.46749 0.84706-1.083 1.8786-5.3183 8.9082-9.8689 19.401-12.348 28.485-3.9823 14.576-3.502 27.085 1.4068 36.784 3.3862 6.6822 9.1913 12.47 15.719 15.67 11.428 5.5993 28.159 6.0625 48.592 1.3554 1.4068-0.32599 71.116-18.831 154.91-41.123 83.794-22.294 152.36-40.52 152.37-40.505 0.0237 0.0193-194.68 83.333-295.75 126.56-16.007 6.8431-20.287 8.5715-27.812 11.214-19.236 6.7551-36.467 9.9783-50.396 9.4251z" />
            </svg>
          </div>
        </button>
      </div>
    </section>

    <!-- Below-the-Fold Interactive Cushioning Force-Plate Matrix -->
    <section class="${p}-lab-section" aria-labelledby="labHeading">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--nike-red);">AEROSPACE FORCE-PLATE TELEMETRY</span>
          <h2 id="labHeading" style="font-family:var(--font-serif);font-size:clamp(2rem,3.8vw,3.2rem);font-weight:400;margin-top:4px;">
            Interactive Impact Control Architecture
          </h2>
        </div>
      </div>

      <div class="${p}-lab-grid" role="group" aria-label="Select Cushioning Architecture">
        <article class="${p}-lab-card is-active nike-lab-btn" tabindex="0" role="button" data-next-preview="true" data-stat="78%" data-title="NEXT-GEN CUSHIONING ARCHITECTURE" data-sub="Impact Absorption &amp; Energy Return Dynamics">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--nike-red);">01 // DUAL-CHAMBER AIR</span>
          <h3 style="font-family:var(--font-serif);font-size:26px;font-weight:400;margin:8px 0;">78% Peak Impact Attenuation</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">Pressurized nitrogen pods distribute heel-strike kinetic loads across 14 articulated air channels.</p>
        </article>

        <article class="${p}-lab-card nike-lab-btn" tabindex="0" role="button" data-next-preview="true" data-stat="84%" data-title="REACTX AEROSPACE FOAM MATRIX" data-sub="Sub-Zero Thermal Stability &amp; Rebound">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--nike-red);">02 // REACTX COMPOUND</span>
          <h3 style="font-family:var(--font-serif);font-size:26px;font-weight:400;margin:8px 0;">84% Energy Return Ratio</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">Injection-molded supercritical elastomer delivers +13% greater rebound with 43% lower carbon footprint.</p>
        </article>

        <article class="${p}-lab-card nike-lab-btn" tabindex="0" role="button" data-next-preview="true" data-stat="92%" data-title="CARBON FIBER FLYPLATE TORSION" data-sub="Propulsive Forefoot Snap &amp; Lateral Lock">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--nike-red);">03 // CARBON FLYPLATE</span>
          <h3 style="font-family:var(--font-serif);font-size:26px;font-weight:400;margin:8px 0;">92% Torsional Rigidity</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">Aerospace-grade woven carbon spine stabilizes urban transitions over wet asphalt and uneven terrain.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--nike-red);">NIKE SPORT RESEARCH LAB</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill">ESC</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-serif);font-size:28px;font-weight:400;margin-bottom:10px;">The Science of Impact Control</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Explore full high-speed force-plate telemetry and reserve early access to the Aerospace Urban Exploration capsule.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill is-red" style="width:100%;padding:14px;">Unlock Lab Specification →</button>
    </div>
  </div>

  <script>
    (function () {
      var NUM_TRAILS = 6;
      var points = Array.from({ length: NUM_TRAILS }, function () {
        return { x: window.innerWidth * 0.55 || 720, y: window.innerHeight * 0.48 || 450 };
      });
      var targetX = window.innerWidth * 0.55 || 720;
      var targetY = window.innerHeight * 0.48 || 450;

      window.addEventListener('mousemove', function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
      });

      function animateSpotlight() {
        if (!document.body.classList.contains('is-motion-paused')) {
          points[0].x += (targetX - points[0].x) * 0.2;
          points[0].y += (targetY - points[0].y) * 0.2;
          for (var i = 1; i < points.length; i++) {
            points[i].x += (points[i - 1].x - points[i].x) * 0.35;
            points[i].y += (points[i - 1].y - points[i].y) * 0.35;
          }
          for (var j = 0; j < points.length; j++) {
            var c = document.getElementById('trail-' + j);
            if (c) {
              c.setAttribute('cx', points[j].x.toFixed(1));
              c.setAttribute('cy', points[j].y.toFixed(1));
            }
          }
        }
        requestAnimationFrame(animateSpotlight);
      }
      requestAnimationFrame(animateSpotlight);

      var statNum = document.getElementById('nikeStatNum');
      var statTitle = document.getElementById('nikeStatTitle');
      var statSub = document.getElementById('nikeStatSub');
      document.querySelectorAll('.nike-lab-btn').forEach(function (card) {
        card.addEventListener('click', function () {
          document.querySelectorAll('.nike-lab-btn').forEach(function (c) { c.classList.remove('is-active'); });
          card.classList.add('is-active');
          if (statNum) statNum.textContent = card.getAttribute('data-stat') || '78%';
          if (statTitle) statTitle.textContent = card.getAttribute('data-title') || '';
          if (statSub) statSub.textContent = card.getAttribute('data-sub') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 16. ORBIS HELLO (orbis-hello — Free Tier)
  // Deep Midnight Navy #010828 + Soft Cream #EFF4FF + Neon Green #6FFF00 Exclusion
  // ============================================================================
  if (slug === 'orbis-hello') {
    const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Orbis Hello — A Digital Object Fixed Beyond Time and Place</title>
  <meta name="description" content="An exploration of distance, form, and silence in space, where light and structure define presence — featuring exclusion blend-mode typography and live orbital telemetry.">
  <meta property="og:title" content="Orbis Hello — Spatial Digital Object">
  <meta property="og:description" content="HELLO! I'M Orbis — A digital object fixed beyond time and place.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#010828">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Condiment&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #010828;
      --surface: #06103a;
      --surface-elevated: #0c1b54;
      --glass: rgba(6, 16, 58, 0.78);
      --fg: #eff4ff;
      --muted: #9eb0d9;
      --border: rgba(239, 244, 255, 0.16);
      --accent: #6fff00;
      --accent-text: #8aff33;
      --accent-strong: #54cc00;
      --on-accent: #010828;
      --font-display: 'Anton', Impact, sans-serif;
      --font-script: 'Condiment', cursive;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 24px;
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
      font-weight: 700; text-decoration: none; transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    button, [role="button"] {
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out), background-color 0.22s var(--ease-out), border-color 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); mix-blend-mode: exclusion;
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid var(--accent); margin: -17px 0 0 -17px; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }
    @keyframes orbisFloat {
      0%, 100% { transform: rotate(-6deg) translateY(0); }
      50% { transform: rotate(-4deg) translateY(-6px); }
    }

    .${p}-header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 180;
      padding: 18px clamp(20px, 4vw, 48px);
      background: linear-gradient(180deg, rgba(1, 8, 40, 0.88) 0%, rgba(1, 8, 40, 0) 100%);
    }
    .${p}-nav {
      max-width: 1360px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-brand {
      font-family: var(--font-display); font-size: 20px; letter-spacing: 0.08em;
      color: var(--fg); text-decoration: none;
    }
    .${p}-brand span { color: var(--accent); }
    .${p}-nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
    .${p}-nav-links a {
      color: var(--muted); text-decoration: none; font-family: var(--font-mono);
      font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;
    }
    .${p}-nav-links a:hover { color: var(--accent); }
    .${p}-pill-btn {
      padding: 9px 18px; border-radius: 999px; border: 1px solid rgba(111, 255, 0, 0.45);
      background: rgba(111, 255, 0, 0.12); color: var(--accent);
      font-family: var(--font-mono); font-size: 11.5px; font-weight: 600;
      text-transform: uppercase; cursor: pointer;
    }

    .${p}-hero {
      position: relative; min-height: 100vh; width: 100%; overflow: hidden;
      background: var(--bg); display: flex; flex-direction: column; justify-content: space-between;
      padding: 110px clamp(20px, 4vw, 48px) 36px;
    }
    .${p}-video-layer {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      pointer-events: none; z-index: 1;
    }
    .${p}-video-layer video {
      width: 140%; height: 140%; object-fit: contain;
      transform: rotate(-180deg) scale(1.25);
      mix-blend-mode: exclusion; opacity: 0.92;
    }
    .${p}-hero-center {
      position: relative; z-index: 10; max-width: 1120px; margin: auto; text-align: center;
    }
    .${p}-hero-title {
      font-family: var(--font-display);
      font-size: clamp(4.2rem, 11vw, 9.6rem);
      font-weight: 400; line-height: 0.9; letter-spacing: -0.02em;
      text-transform: uppercase; color: var(--fg); position: relative;
    }
    .${p}-orbis-script {
      font-family: var(--font-script);
      font-size: clamp(4.8rem, 13.5vw, 12.2rem);
      color: var(--accent); text-transform: none;
      display: inline-block; margin-left: 12px;
      mix-blend-mode: exclusion;
      animation: orbisFloat 5.5s ease-in-out infinite;
    }
    .${p}-hero-lead {
      font-family: var(--font-mono);
      font-size: clamp(0.85rem, 1.35vw, 1.15rem);
      line-height: 1.5; letter-spacing: -0.02em; text-transform: uppercase;
      color: var(--fg); max-width: 660px; margin: 28px auto 0;
      mix-blend-mode: exclusion;
    }
    .${p}-ghost-columns {
      position: relative; z-index: 10; max-width: 1360px; width: 100%; margin: 36px auto 0;
      display: flex; justify-content: space-between; gap: 28px; flex-wrap: wrap;
    }
    .${p}-ghost-col {
      max-width: 420px; font-family: var(--font-mono); font-size: 11.5px;
      line-height: 1.55; text-transform: uppercase; color: var(--fg);
      opacity: 0.42; mix-blend-mode: exclusion;
    }

    .${p}-section {
      max-width: 1320px; margin: 0 auto; padding: 72px clamp(20px, 4vw, 48px);
      border-top: 1px solid var(--border);
    }
    .${p}-telemetry-grid {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 28px;
    }
    .${p}-orb-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 22px;
      padding: 26px; display: flex; flex-direction: column; justify-content: space-between; gap: 16px;
      cursor: pointer;
    }
    .${p}-orb-card.is-active, .${p}-orb-card:hover {
      border-color: var(--accent); box-shadow: 0 16px 40px rgba(111, 255, 0, 0.12);
    }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 5000; display: flex; align-items: center; justify-content: center;
      background: rgba(1, 8, 40, 0.84); padding: 20px; opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-out); backdrop-filter: blur(12px);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 480px; background: var(--surface); border: 1px solid var(--accent);
      border-radius: 24px; padding: 28px;
    }

    @media (max-width: 960px) {
      .${p}-telemetry-grid { grid-template-columns: 1fr; }
      .${p}-ghost-columns { flex-direction: column; }
    }
    @media (max-width: 640px) {
      .${p}-nav-links { display: none; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="${p}-header">
    <div class="${p}-nav">
      <a href="#top" class="${p}-brand">ORBIS <span>01</span></a>
      <nav aria-label="Primary">
        <ul class="${p}-nav-links">
          <li><a href="#top">Presence</a></li>
          <li><a href="#telemetry">Distance &amp; Form</a></li>
          <li><a href="#coordinates">Silence</a></li>
        </ul>
      </nav>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" id="motionToggleBtn" aria-pressed="false" class="${p}-pill-btn">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-pill-btn" style="background:var(--accent);color:var(--on-accent);">
          Inspect Object →
        </button>
      </div>
    </div>
  </header>

  <main id="main-content">
    <section id="top" class="${p}-hero" aria-label="Orbis Digital Object Hero">
      <div class="${p}-video-layer" aria-hidden="true">
        <video autoplay loop muted playsinline preload="auto" src="${heroVideo}"></video>
      </div>

      <div class="${p}-hero-center">
        <h1 class="${p}-hero-title">
          <span style="display:block;">HELLO!</span>
          <span style="display:block;">
            I'M <span class="${p}-orbis-script">Orbis</span>
          </span>
        </h1>
        <p class="${p}-hero-lead" id="orbisActiveStatement">
          A digital object fixed beyond time and place. An exploration of distance, form, and silence in space
        </p>
      </div>

      <div class="${p}-ghost-columns">
        <p class="${p}-ghost-col">
          A digital object fixed beyond time and place, existing in a quiet state of motion. An exploration of distance, form, and silence in space, where light and structure define presence.
        </p>
        <p class="${p}-ghost-col" style="text-align:right;">
          A digital object fixed beyond time and place, existing in a quiet state of motion. An exploration of distance, form, and silence in space, where light and structure define presence.
        </p>
      </div>
    </section>

    <section id="telemetry" class="${p}-section" aria-label="Spatial Distance and Form Telemetry">
      <div style="display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.1rem);letter-spacing:0.02em;">
          DISTANCE, FORM &amp; <span style="color:var(--accent);">SILENCE</span>
        </h2>
        <span class="tabular-nums" style="font-family:var(--font-mono);font-size:12px;color:var(--accent);" id="orbisCoordReadout">
          AXIS: -180.0 DEG • EXCLUSION FIELD
        </span>
      </div>

      <div class="${p}-telemetry-grid">
        <article class="${p}-orb-card is-active" data-orb-axis="AXIS: -180.0 DEG • DISTANCE 0.00 AU" data-orb-quote="A digital object fixed beyond time and place. An exploration of distance, form, and silence in space">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);" class="tabular-nums">01 / DISTANCE</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h3 style="font-family:var(--font-display);font-size:26px;letter-spacing:0.02em;">FIXED BEYOND TIME</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">
            Suspended in deep midnight navy (#010828), Orbis maintains zero-drift equilibrium across viewport transformations.
          </p>
        </article>

        <article class="${p}-orb-card" data-orb-axis="AXIS: -94.2 DEG • REFRACTION 1.48" data-orb-quote="Where light and structure define presence inside an exclusion-blended spatial field">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);" class="tabular-nums">02 / FORM</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" aria-hidden="true"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
          </div>
          <h3 style="font-family:var(--font-display);font-size:26px;letter-spacing:0.02em;">EXCLUSION OPTICS</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">
            Electric neon green (#6FFF00) script and video luminance invert against soft cream (#EFF4FF) display geometry.
          </p>
        </article>

        <article class="${p}-orb-card" data-orb-axis="AXIS: 0.0 DEG • SILENCE 99.8 DB" data-orb-quote="Existing in a quiet state of motion across deep orbital coordinates">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);" class="tabular-nums">03 / SILENCE</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" aria-hidden="true"><path d="M2 12h20"/><path d="M12 2v20"/></svg>
          </div>
          <h3 style="font-family:var(--font-display);font-size:26px;letter-spacing:0.02em;">QUIET MOTION</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">
            Continuous 180-degree inverted loop synthesis pairs monospace telemetry with monumental Anton display scale.
          </p>
        </article>
      </div>
    </section>

    <section id="coordinates" class="${p}-section" aria-label="Orbis Spatial Coordinates">
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;text-align:center;">
        <div style="padding:24px;border-radius:20px;background:var(--surface);border:1px solid var(--border);">
          <div class="tabular-nums" style="font-family:var(--font-display);font-size:42px;color:var(--accent);" data-counter-target="180" data-counter-suffix="°">180°</div>
          <div style="font-family:var(--font-mono);font-size:11.5px;color:var(--muted);margin-top:6px;">INVERTED ROTATION</div>
        </div>
        <div style="padding:24px;border-radius:20px;background:var(--surface);border:1px solid var(--border);">
          <div class="tabular-nums" style="font-family:var(--font-display);font-size:42px;color:var(--fg);" data-counter-target="140" data-counter-suffix="%">140%</div>
          <div style="font-family:var(--font-mono);font-size:11.5px;color:var(--muted);margin-top:6px;">FIELD SCALE</div>
        </div>
        <div style="padding:24px;border-radius:20px;background:var(--surface);border:1px solid var(--border);">
          <div class="tabular-nums" style="font-family:var(--font-display);font-size:42px;color:var(--accent);" data-counter-target="60" data-counter-suffix=" FPS">60 FPS</div>
          <div style="font-family:var(--font-mono);font-size:11.5px;color:var(--muted);margin-top:6px;">EXCLUSION COMPOSITE</div>
        </div>
      </div>
    </section>
  </main>

  <footer class="${p}-section" style="padding-top:28px;padding-bottom:40px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;font-family:var(--font-mono);font-size:12px;color:var(--muted);">
    <span>ORBIS — A DIGITAL OBJECT FIXED BEYOND TIME AND PLACE</span>
    <span class="tabular-nums">#010828 • #EFF4FF • #6FFF00</span>
  </footer>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--accent);">ORBIS TELEMETRY</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-btn" style="padding:4px 10px;">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;letter-spacing:0.03em;margin-bottom:10px;">ORBIS SPATIAL MANIFESTO</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        A digital object fixed beyond time and place, existing in a quiet state of motion. An exploration of distance, form, and silence in space, where light and structure define presence.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill-btn" style="width:100%;background:var(--accent);color:var(--on-accent);padding:12px;">
        Lock Spatial Coordinates →
      </button>
    </div>
  </div>

  <script>
    (function () {
      var coordEl = document.getElementById('orbisCoordReadout');
      var quoteEl = document.getElementById('orbisActiveStatement');
      document.querySelectorAll('.${p}-orb-card').forEach(function (card) {
        card.addEventListener('click', function () {
          document.querySelectorAll('.${p}-orb-card').forEach(function (c) { c.classList.remove('is-active'); });
          card.classList.add('is-active');
          if (coordEl) coordEl.textContent = card.getAttribute('data-orb-axis') || '';
          if (quoteEl) quoteEl.textContent = card.getAttribute('data-orb-quote') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 17. ORGANIC ODYSSEY (organic-odyssey — Premium Tier)
  // Bioluminescent Living Forms + Character-Staggered "WITNESS THE HIDDEN REALM"
  // ============================================================================
  if (slug === 'organic-odyssey') {
    const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Organic Visions — Witness the Hidden Realm</title>
  <meta name="description" content="An odyssey through delicate living forms, revealed by lens and curiosity — featuring full-bleed bioluminescent macro cinema, liquid-glass optics, and interactive specimen archive.">
  <meta property="og:title" content="Organic Visions — Witness the Hidden Realm">
  <meta property="og:description" content="An odyssey through delicate living forms, revealed by lens and curiosity.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#010101">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #010101;
      --surface: #080d0e;
      --surface-elevated: #0f191b;
      --glass: rgba(255, 255, 255, 0.08);
      --fg: #ffffff;
      --muted: rgba(255, 255, 255, 0.72);
      --border: rgba(255, 255, 255, 0.16);
      --accent: #5eead4;
      --accent-text: #99f6e4;
      --accent-strong: #2dd4bf;
      --on-accent: #021714;
      --font-display: 'EB Garamond', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 24px;
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
      font-weight: 700; text-decoration: none; transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 3px; }
    button, [role="button"] {
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out), background-color 0.22s var(--ease-out), border-color 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid var(--accent); margin: -17px 0 0 -17px; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent-text); margin: -3px 0 0 -3px; }

    @keyframes charRise {
      0% { opacity: 0; transform: translateY(18px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .liquid-glass {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.22);
    }

    .${p}-header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 190;
      padding: 20px clamp(20px, 4.5vw, 56px);
      background: linear-gradient(180deg, rgba(1, 1, 1, 0.78) 0%, rgba(1, 1, 1, 0) 100%);
    }
    .${p}-nav {
      max-width: 1360px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-brand {
      color: var(--fg); text-decoration: none; font-size: 13px; font-weight: 500;
      letter-spacing: 0.25em; text-transform: uppercase;
    }
    .${p}-nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
    .${p}-nav-links a {
      color: rgba(255, 255, 255, 0.8); text-decoration: none; font-size: 14px; font-weight: 300;
      letter-spacing: 0.04em;
    }
    .${p}-nav-links a:hover { color: #ffffff; }

    .${p}-hero {
      position: relative; min-height: 100vh; width: 100%; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      padding: 120px clamp(20px, 4vw, 48px) 80px;
    }
    .${p}-hero-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;
    }
    .${p}-hero-scrim {
      position: absolute; inset: 0; z-index: 2;
      background: radial-gradient(circle at 50% 50%, rgba(1, 1, 1, 0.25) 0%, rgba(1, 1, 1, 0.78) 100%);
    }
    .${p}-hero-content {
      position: relative; z-index: 10; text-align: center; max-width: 960px; margin: 0 auto;
    }
    .${p}-hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.85rem, 6.8vw, 5.6rem);
      font-weight: 400; line-height: 1.06; letter-spacing: 0.14em;
      text-transform: uppercase; color: #ffffff;
    }
    .${p}-char {
      display: inline-block; animation: charRise 0.8s var(--ease-out) both;
    }
    .${p}-hero-sub {
      font-weight: 300; font-size: clamp(1rem, 1.5vw, 1.22rem);
      color: rgba(255, 255, 255, 0.82); letter-spacing: 0.04em; line-height: 1.7;
      max-width: 580px; margin: 28px auto 40px;
    }
    .${p}-cta-btn {
      padding: 15px 38px; border-radius: 999px; color: #ffffff;
      font-size: 14px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase;
      cursor: pointer;
    }
    .${p}-cta-btn:hover { background: rgba(255, 255, 255, 0.14); border-color: rgba(153, 246, 228, 0.45); }

    .${p}-section {
      max-width: 1280px; margin: 0 auto; padding: 76px clamp(20px, 4vw, 48px);
      border-top: 1px solid var(--border);
    }
    .${p}-specimen-grid {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; margin-top: 32px;
    }
    .${p}-specimen-card {
      border-radius: 22px; padding: 28px; cursor: pointer;
      display: flex; flex-direction: column; justify-content: space-between; min-height: 240px;
    }
    .${p}-specimen-card.is-active, .${p}-specimen-card:hover {
      border-color: var(--accent);
    }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 5000; display: flex; align-items: center; justify-content: center;
      background: rgba(1, 1, 1, 0.82); padding: 20px; opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-out); backdrop-filter: blur(16px);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 480px; border-radius: 24px; padding: 30px;
    }

    @media (max-width: 960px) {
      .${p}-specimen-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .${p}-nav-links { display: none; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="${p}-header">
    <div class="${p}-nav">
      <a href="#wander" class="${p}-brand" style="display:inline-flex;align-items:center;gap:10px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" stroke-width="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/>
          <circle cx="12" cy="12" r="3.5"/>
        </svg>
        ORGANIC VISIONS
      </a>
      <nav aria-label="Primary">
        <ul class="${p}-nav-links">
          <li><a href="#wander">Wander</a></li>
          <li><a href="#archive">Archive</a></li>
          <li><a href="#story">Story</a></li>
          <li><a href="#connect">Connect</a></li>
        </ul>
      </nav>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" id="motionToggleBtn" aria-pressed="false" class="liquid-glass" style="padding:8px 16px;border-radius:999px;color:#ffffff;font-size:12px;cursor:pointer;">
          Motion: ON
        </button>
      </div>
    </div>
  </header>

  <main id="main-content">
    <section id="wander" class="${p}-hero" aria-label="Witness the Hidden Realm Hero">
      <video class="${p}-hero-video" autoplay loop muted playsinline preload="auto" src="${heroVideo}" aria-hidden="true"></video>
      <div class="${p}-hero-scrim" aria-hidden="true"></div>

      <div class="${p}-hero-content">
        <h1 class="${p}-hero-title">
          <span style="display:block;">WITNESS THE</span>
          <span style="display:block;color:var(--accent-text);">HIDDEN REALM</span>
        </h1>
        <p class="${p}-hero-sub" id="odysseyLensSub">
          An odyssey through delicate living forms, revealed by lens and curiosity.
        </p>
        <button type="button" id="exploreMagneticBtn" class="liquid-glass ${p}-cta-btn">
          Begin the Experience
        </button>
      </div>
    </section>

    <section id="archive" class="${p}-section" aria-label="Bioluminescent Specimen Archive">
      <div style="display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--accent-text);letter-spacing:0.16em;">MACRO LENS ARCHIVE</span>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,3.6vw,2.9rem);font-weight:400;margin-top:6px;">
            Delicate Living Forms Under Optical Magnification
          </h2>
        </div>
        <span class="tabular-nums" style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);" id="odysseyFocalReadout">
          FOCAL DEPTH: 85MM MACRO • F/1.4
        </span>
      </div>

      <div class="${p}-specimen-grid">
        <article class="liquid-glass ${p}-specimen-card is-active" data-lens-focal="FOCAL DEPTH: 85MM MACRO • F/1.4" data-lens-desc="Translucent pelagic cnidarian filaments captured at 400fps in abyssal dark.">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--accent-text);" class="tabular-nums">SPECIMEN 01</span>
            <span style="font-size:12px;color:var(--muted);" class="tabular-nums">1,200m Depth</span>
          </div>
          <div>
            <h3 style="font-family:var(--font-display);font-size:26px;font-weight:400;margin-bottom:8px;">Aurelia Biolumen</h3>
            <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">
              Rhythmic cyan-emerald pulses propagate along micro-cilia channels with zero thermal loss.
            </p>
          </div>
        </article>

        <article class="liquid-glass ${p}-specimen-card" data-lens-focal="FOCAL DEPTH: 120MM APO • F/2.0" data-lens-desc="Sub-surface mycelial networks exchanging photonic signals across damp forest strata.">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--accent-text);" class="tabular-nums">SPECIMEN 02</span>
            <span style="font-size:12px;color:var(--muted);" class="tabular-nums">4.2um Scale</span>
          </div>
          <div>
            <h3 style="font-family:var(--font-display);font-size:26px;font-weight:400;margin-bottom:8px;">Mycelia Nocturna</h3>
            <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">
              Delicate branching hyphae illuminated through cross-polarized darkfield microscopy.
            </p>
          </div>
        </article>

        <article class="liquid-glass ${p}-specimen-card" data-lens-focal="FOCAL DEPTH: 50MM PROBE • F/1.8" data-lens-desc="Crystalline diatom frustules refracting ambient twilight into spectral arcs.">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--accent-text);" class="tabular-nums">SPECIMEN 03</span>
            <span style="font-size:12px;color:var(--muted);" class="tabular-nums">98.4% Purity</span>
          </div>
          <div>
            <h3 style="font-family:var(--font-display);font-size:26px;font-weight:400;margin-bottom:8px;">Silica Flora</h3>
            <p style="font-size:13.5px;color:var(--muted);line-height:1.6;">
              Architectural symmetry formed naturally at the boundary of light and oceanic pressure.
            </p>
          </div>
        </article>
      </div>
    </section>

    <section id="story" class="${p}-section" aria-label="Optical Telemetry Metrics">
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;text-align:center;">
        <div class="liquid-glass" style="padding:26px;border-radius:20px;">
          <div class="tabular-nums" style="font-family:var(--font-display);font-size:42px;color:var(--accent-text);" data-counter-target="400" data-counter-suffix=" FPS">400 FPS</div>
          <div style="font-size:12px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-top:6px;">High-Speed Optical Capture</div>
        </div>
        <div class="liquid-glass" style="padding:26px;border-radius:20px;">
          <div class="tabular-nums" style="font-family:var(--font-display);font-size:42px;" data-counter-target="64" data-counter-suffix=" Specimens">64 Specimens</div>
          <div style="font-size:12px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-top:6px;">Cataloged Living Forms</div>
        </div>
        <div class="liquid-glass" style="padding:26px;border-radius:20px;">
          <div class="tabular-nums" style="font-family:var(--font-display);font-size:42px;color:var(--accent-text);" data-counter-target="8" data-counter-suffix="K RAW">8K RAW</div>
          <div style="font-size:12px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-top:6px;">Full-Bleed Macro Cinema</div>
        </div>
      </div>
    </section>
  </main>

  <footer id="connect" class="${p}-section" style="padding-top:28px;padding-bottom:44px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;color:var(--muted);font-size:12.5px;">
    <span style="letter-spacing:0.18em;text-transform:uppercase;">ORGANIC VISIONS — WITNESS THE HIDDEN REALM</span>
    <span class="tabular-nums">Wander • Archive • Story • Connect</span>
  </footer>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="liquid-glass ${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--accent-text);">ORGANIC VISIONS IMMERSION</span>
        <button type="button" id="closeSeamlessBtn" class="liquid-glass" style="width:32px;height:32px;border-radius:50%;color:#ffffff;cursor:pointer;">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;font-weight:400;margin-bottom:10px;">Enter the Hidden Realm</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        An odyssey through delicate living forms, revealed by lens and curiosity. Select any macro specimen to inspect live focal depth and bioluminescent spectrum telemetry.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="liquid-glass ${p}-cta-btn" style="width:100%;">
        Launch Specimen Lens →
      </button>
    </div>
  </div>

  <script>
    (function () {
      var focalEl = document.getElementById('odysseyFocalReadout');
      var subEl = document.getElementById('odysseyLensSub');
      document.querySelectorAll('.${p}-specimen-card').forEach(function (card) {
        card.addEventListener('click', function () {
          document.querySelectorAll('.${p}-specimen-card').forEach(function (c) { c.classList.remove('is-active'); });
          card.classList.add('is-active');
          if (focalEl) focalEl.textContent = card.getAttribute('data-lens-focal') || '';
          if (subEl) subEl.textContent = card.getAttribute('data-lens-desc') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 18. NEXACORE RESULTS (nexacore-results — Premium Tier)
  // Structured Delivery ("PrecisionSection") + 4-Pillar Rising Staircase
  // Scopes / Integrates / Certifies / Activates + Compounding Operational Value
  // ============================================================================
  if (slug === 'nexacore-results') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>NexaCore Results — Structured Delivery &amp; Compounding Operational Value</title>
  <meta name="description" content="One integrated, end-to-end system. Compounding operational value. NexaCore teams capture, align, validate and deliver across Scopes, Integrates, Certifies, and Activates.">
  <meta property="og:title" content="NexaCore Results — Structured Delivery System">
  <meta property="og:description" content="NexaCore teams capture, align, validate and deliver exactly what keeps your programs on track.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#F7F5FC">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f7f5fc;
      --surface: #ffffff;
      --surface-elevated: #efeaf9;
      --glass: rgba(255, 255, 255, 0.84);
      --fg: #1a0b54;
      --muted: #64588a;
      --border: rgba(169, 151, 206, 0.34);
      --accent: #7c3aed;
      --accent-text: #5b21b6;
      --accent-strong: #4c1d95;
      --on-accent: #ffffff;
      --line-grad: linear-gradient(180deg, rgba(169, 151, 206, 0.08) 0%, #a997ce 30%, #7c3aed 72%, rgba(169, 151, 206, 0.12) 100%);
      --font-display: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 24px;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background:
        radial-gradient(circle at 80% 12%, rgba(200, 111, 255, 0.16) 0%, rgba(169, 151, 206, 0.12) 38%, #f7f5fc 75%),
        #f7f5fc;
      color: var(--fg); font-family: var(--font-sans);
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--fg); color: #ffffff;
      font-weight: 700; text-decoration: none; transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--accent); outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    button, [role="button"] {
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out), background-color 0.22s var(--ease-out), border-color 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid var(--accent); margin: -16px 0 0 -16px; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--fg); margin: -3px 0 0 -3px; }
    @keyframes pulseCrosshair {
      0%, 100% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(90deg) scale(1.08); }
    }

    .${p}-wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px); }
    .${p}-header {
      position: sticky; top: 0; z-index: 160;
      background: rgba(247, 245, 252, 0.86); border-bottom: 1px solid var(--border);
      backdrop-filter: blur(14px);
    }
    .${p}-nav {
      display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 16px 0;
    }
    .${p}-brand {
      font-weight: 700; font-size: 18px; letter-spacing: -0.02em; color: var(--fg); text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .${p}-nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
    .${p}-nav-links a { color: var(--muted); text-decoration: none; font-size: 13.5px; font-weight: 500; }
    .${p}-nav-links a:hover { color: var(--fg); }
    .${p}-btn-indigo {
      padding: 10px 22px; border-radius: 999px; border: 0;
      background: var(--fg); color: #ffffff; font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .${p}-badge-pill {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 7px 16px; border-radius: 999px;
      background: rgba(200, 111, 255, 0.12); border: 1px solid rgba(200, 111, 255, 0.35);
      color: var(--fg); font-size: 13px; font-weight: 500;
    }

    .${p}-precision-hero { padding: 64px 0 48px; }
    .${p}-headline {
      font-size: clamp(2.35rem, 4.8vw, 3.85rem);
      font-weight: 500; line-height: 1.08; letter-spacing: -0.03em;
      color: var(--fg); max-width: 820px; margin: 18px 0 16px;
    }
    .${p}-grad-span {
      background: linear-gradient(90deg, #6b4eff 0%, #c86fff 52%, #ff7eb6 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      display: block;
    }
    .${p}-subtext {
      color: var(--muted); font-size: clamp(1rem, 1.35vw, 1.15rem);
      line-height: 1.65; max-width: 580px;
    }

    .${p}-staircase {
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
      align-items: end; gap: 0; margin-top: 44px;
      background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border);
      border-radius: 28px; padding: 32px 24px;
      box-shadow: 0 24px 60px rgba(26, 11, 84, 0.06);
    }
    .${p}-pillar {
      position: relative; padding: 24px 22px; display: flex; flex-direction: column;
      justify-content: space-between; cursor: pointer; border-radius: 18px;
    }
    .${p}-pillar::before {
      content: ''; position: absolute; left: 0; top: 8%; bottom: 8%; width: 1.5px;
      background: var(--line-grad);
    }
    .${p}-pillar:hover, .${p}-pillar.is-active {
      background: rgba(255, 255, 255, 0.92);
      box-shadow: 0 14px 34px rgba(26, 11, 84, 0.08);
    }
    .${p}-pillar-p1 { min-height: 240px; }
    .${p}-pillar-p2 { min-height: 300px; }
    .${p}-pillar-p3 { min-height: 360px; }
    .${p}-pillar-p4 { min-height: 420px; }

    .${p}-pillar-title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 3vw, 2.65rem);
      font-weight: 400; color: var(--fg); line-height: 1.05; margin-bottom: 10px;
    }
    .${p}-pillar-items {
      font-size: 14px; color: var(--muted); line-height: 1.55;
    }
    .${p}-pillar-num {
      font-family: var(--font-display);
      font-size: clamp(2.8rem, 4.5vw, 4.1rem);
      line-height: 0.95; color: #a997ce; margin-top: 28px;
    }

    .${p}-section { padding: 56px 0; border-top: 1px solid var(--border); }
    .${p}-sla-panel {
      background: #ffffff; border: 1px solid var(--border); border-radius: 24px;
      padding: 28px; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 24px; align-items: center;
    }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 5000; display: flex; align-items: center; justify-content: center;
      background: rgba(26, 11, 84, 0.56); padding: 20px; opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-out); backdrop-filter: blur(10px);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 480px; background: #ffffff; border: 1px solid var(--border);
      border-radius: 24px; padding: 28px;
    }

    @media (max-width: 980px) {
      .${p}-staircase { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
      .${p}-pillar-p1, .${p}-pillar-p2, .${p}-pillar-p3, .${p}-pillar-p4 { min-height: 230px; }
      .${p}-sla-panel { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .${p}-nav-links { display: none; }
      .${p}-staircase { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="${p}-header">
    <div class="${p}-wrap ${p}-nav">
      <a href="#precision" class="${p}-brand">
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 1V17M1 9H17" stroke="#c86fff" stroke-width="2" stroke-linecap="round"/>
          <circle cx="9" cy="9" r="4" stroke="#1a0b54" stroke-width="1.8"/>
        </svg>
        NexaCore
      </a>
      <nav aria-label="Primary">
        <ul class="${p}-nav-links">
          <li><a href="#precision">Structured Delivery</a></li>
          <li><a href="#pillars">01—04 Pillars</a></li>
          <li><a href="#telemetry">SLA Assurance</a></li>
        </ul>
      </nav>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" id="motionToggleBtn" aria-pressed="false" style="padding:8px 14px;border-radius:999px;border:1px solid var(--border);background:#ffffff;color:var(--fg);font-size:12px;font-weight:600;cursor:pointer;">
          Motion: ON
        </button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-indigo">Schedule Program Audit →</button>
      </div>
    </div>
  </header>

  <main id="main-content">
    <section id="precision" class="${p}-wrap ${p}-precision-hero" aria-label="Structured Delivery System">
      <div class="${p}-badge-pill">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="animation:pulseCrosshair 6s ease-in-out infinite;">
          <circle cx="8" cy="8" r="5.5" stroke="#c86fff" stroke-width="1.5"/>
          <path d="M8 0.5V15.5M0.5 8H15.5" stroke="#c86fff" stroke-width="1.5"/>
        </svg>
        <span>Structured Delivery</span>
      </div>

      <h1 class="${p}-headline">
        One integrated, end-to-end system.
        <span class="${p}-grad-span">Compounding operational value.</span>
      </h1>

      <p class="${p}-subtext">
        NexaCore teams capture, align, validate and deliver exactly what keeps your programs on track.
      </p>

      <div id="pillars" class="${p}-staircase" role="region" aria-label="Four-Pillar Rising Delivery Staircase">
        <article class="${p}-pillar ${p}-pillar-p1 is-active" data-pillar-stage="01 / SCOPES" data-pillar-detail="Site conditions, megawatt capacity envelopes, technical specs, and critical-path baselines locked prior to mobilization.">
          <div>
            <h2 class="${p}-pillar-title">Scopes</h2>
            <p class="${p}-pillar-items">conditions, capacity, specs, timelines</p>
          </div>
          <div class="${p}-pillar-num tabular-nums">01</div>
        </article>

        <article class="${p}-pillar ${p}-pillar-p2" data-pillar-stage="02 / INTEGRATES" data-pillar-detail="Cross-disciplinary synchronization across civil grading, mechanical cooling, high-voltage electrical, and EPMS/BMS controls.">
          <div>
            <h2 class="${p}-pillar-title">Integrates</h2>
            <p class="${p}-pillar-items">civil, mechanical, electrical, controls</p>
          </div>
          <div class="${p}-pillar-num tabular-nums">02</div>
        </article>

        <article class="${p}-pillar ${p}-pillar-p3" data-pillar-stage="03 / CERTIFIES" data-pillar-detail="Level 1–5 IST commissioning, N+1 fault-tolerance verification, regulatory compliance, and executive engineering sign-offs.">
          <div>
            <h2 class="${p}-pillar-title">Certifies</h2>
            <p class="${p}-pillar-items">redundancy, testing, compliance, sign-offs</p>
          </div>
          <div class="${p}-pillar-num tabular-nums">03</div>
        </article>

        <article class="${p}-pillar ${p}-pillar-p4" data-pillar-stage="04 / ACTIVATES" data-pillar-detail="Zero-downtime live cutover, digital twin runbooks, operations team handoff, and multi-year SLA telemetry.">
          <div>
            <h2 class="${p}-pillar-title">Activates</h2>
            <p class="${p}-pillar-items">cutover, runbooks, handoff, SLAs</p>
          </div>
          <div class="${p}-pillar-num tabular-nums">04</div>
        </article>
      </div>
    </section>

    <section id="telemetry" class="${p}-wrap ${p}-section" aria-label="Active Stage Telemetry and SLA">
      <div class="${p}-sla-panel">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:600;" id="nexaActiveStage">01 / SCOPES</span>
          <h2 style="font-family:var(--font-display);font-size:clamp(1.85rem,3vw,2.5rem);font-weight:400;margin:6px 0 10px;">
            Live Program Gate Verification
          </h2>
          <p style="color:var(--muted);font-size:14.5px;line-height:1.65;" id="nexaActiveDetail">
            Site conditions, megawatt capacity envelopes, technical specs, and critical-path baselines locked prior to mobilization.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;text-align:center;">
          <div style="padding:18px;border-radius:18px;background:var(--bg);border:1px solid var(--border);">
            <div class="tabular-nums" style="font-family:var(--font-display);font-size:36px;color:var(--fg);" data-counter-target="99" data-counter-suffix=".98%">99.98%</div>
            <div style="font-size:11.5px;color:var(--muted);margin-top:4px;">Cutover SLA Adherence</div>
          </div>
          <div style="padding:18px;border-radius:18px;background:var(--bg);border:1px solid var(--border);">
            <div class="tabular-nums" style="font-family:var(--font-display);font-size:36px;color:var(--accent);" data-counter-target="4" data-counter-suffix=" Gates">4 Gates</div>
            <div style="font-size:11.5px;color:var(--muted);margin-top:4px;">End-to-End Validation</div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="padding:28px 0 40px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;color:var(--muted);font-size:12.5px;">
    <span>NexaCore — Structured Delivery &amp; Compounding Operational Value</span>
    <span class="tabular-nums">Scopes (01) • Integrates (02) • Certifies (03) • Activates (04)</span>
  </footer>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span class="${p}-badge-pill" style="padding:4px 12px;font-size:11.5px;">NEXACORE DELIVERY GATE</span>
        <button type="button" id="closeSeamlessBtn" style="background:transparent;border:1px solid var(--border);width:32px;height:32px;border-radius:50%;cursor:pointer;">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;font-weight:400;margin-bottom:10px;">NexaCore Program Alignment</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Capture, align, validate, and deliver mission-critical infrastructure across all 4 rising pillars: Scopes, Integrates, Certifies, and Activates.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-indigo" style="width:100%;padding:12px;">
        Download Runbook Specification →
      </button>
    </div>
  </div>

  <script>
    (function () {
      var stageEl = document.getElementById('nexaActiveStage');
      var detailEl = document.getElementById('nexaActiveDetail');
      document.querySelectorAll('.${p}-pillar').forEach(function (pillar) {
        pillar.addEventListener('click', function () {
          document.querySelectorAll('.${p}-pillar').forEach(function (el) { el.classList.remove('is-active'); });
          pillar.classList.add('is-active');
          if (stageEl) stageEl.textContent = pillar.getAttribute('data-pillar-stage') || '';
          if (detailEl) detailEl.textContent = pillar.getAttribute('data-pillar-detail') || '';
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 25. TRAVEL JOURNAL (travel-journal — Free Tier)
  // iPhone Dynamic Island Mobile Travel App Mockup (Tokyo, Seoul, Bali, Rome)
  // ============================================================================
  if (slug === 'travel-journal') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Travel Journal — Liquid-Glass iOS Travel Moments (Tokyo, Seoul, Bali, Rome)</title>
  <meta name="description" content="Interactive mobile travel journal displayed inside a realistic iPhone Dynamic Island frame featuring liquid-glass destination cards for Tokyo (23 moments), Seoul (18 moments), Bali (29 moments), and Rome (15 moments).">
  <meta property="og:title" content="Travel Journal — iOS Liquid-Glass Trip Moments">
  <meta property="og:description" content="Explore curated travel moments across Tokyo, Seoul, Bali, and Rome with staggered entrance motion and liquid-glass UI.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#F8FAFC">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --fg: #0f172a;
      --muted: #475569;
      --border: rgba(15, 23, 42, 0.1);
      --accent: #0f172a;
      --on-accent: #ffffff;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    ::selection { background: #0f172a; color: #ffffff; }
    html, body {
      background: radial-gradient(circle at 50% 20%, #ffffff 0%, #f1f5f9 100%);
      color: var(--fg); overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; text-decoration: none;
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); }
    button:focus-visible, a:focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }
    button { transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out); }
    button:active { transform: scale(0.97); }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid rgba(15, 23, 42, 0.35); margin: -16px 0 0 -16px; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: #0f172a; margin: -3px 0 0 -3px; }

    .liquid-glass {
      background: rgba(255, 255, 255, 0.08);
      background-blend-mode: luminosity;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: none;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.18);
      position: relative;
      overflow: hidden;
    }
    .liquid-glass::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.4px;
      background: linear-gradient(180deg,
        rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
        rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
        rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

    .${p}-top-bar {
      max-width: 1240px; margin: 0 auto; padding: 18px clamp(18px, 3.5vw, 40px);
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-stage {
      max-width: 1240px; margin: 0 auto; padding: 10px clamp(18px, 3.5vw, 40px) 48px;
      display: grid; grid-template-columns: 1fr 375px 1fr; gap: 36px; align-items: center;
    }
    .${p}-side-note {
      background: #ffffff; border: 1px solid var(--border); border-radius: 24px; padding: 24px;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
    }

    .${p}-phone-frame {
      width: 375px; height: 780px; margin: 0 auto;
      background: #0a0a0c; border-radius: 52px; overflow: hidden;
      position: relative;
      box-shadow:
        inset 0 0 0 2px rgba(255, 255, 255, 0.08),
        0 0 0 1px rgba(0, 0, 0, 0.6),
        0 0 0 10px #1a1a1e,
        0 0 0 11px rgba(255, 255, 255, 0.06),
        0 24px 60px rgba(0, 0, 0, 0.42);
    }
    .${p}-notch {
      position: absolute; top: 0; left: 50%; transform: translateX(-50%);
      width: 120px; height: 28px; background: #000000;
      border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 50;
    }
    .${p}-phone-header {
      position: absolute; top: 0; left: 0; right: 0; z-index: 30;
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      background-color: rgba(10, 10, 12, 0.75);
      padding: 52px 24px 16px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-region-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: transparent; border: 0; color: #ffffff; font-size: 18px; font-weight: 600; cursor: pointer;
    }
    .${p}-cal-btn {
      background: transparent; border: 0; color: rgba(255, 255, 255, 0.72); cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
    }

    .${p}-phone-scroll {
      height: 100%; overflow-y: auto; padding: 108px 24px 96px;
      display: flex; flex-direction: column; gap: 16px;
    }
    .${p}-dest-card {
      width: 100%; height: 200px; min-height: 200px; border-radius: 16px; overflow: hidden;
      position: relative; cursor: pointer;
      transition: transform 0.5s var(--ease-out), opacity 0.5s var(--ease-out);
    }
    .${p}-dest-card img {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.55s var(--ease-out);
    }
    .${p}-dest-card:hover img { transform: scale(1.05); }
    .${p}-dest-grad {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.35), transparent);
    }
    .${p}-dest-top {
      position: relative; z-index: 2; padding: 12px 14px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-moments-pill {
      padding: 4px 12px; border-radius: 999px; color: rgba(255, 255, 255, 0.92);
      font-size: 12px; font-weight: 400;
    }
    .${p}-more-circle {
      width: 32px; height: 32px; border-radius: 50%; color: rgba(255, 255, 255, 0.85);
      display: inline-flex; align-items: center; justify-content: center;
    }
    .${p}-dest-name-clip {
      position: absolute; left: 0; right: 0; bottom: 0; height: 80px; overflow: hidden;
      display: flex; align-items: flex-start; justify-content: center; z-index: 2;
    }
    .${p}-dest-name {
      font-size: 92px; font-weight: 800; color: rgba(255, 255, 255, 0.55);
      letter-spacing: -0.04em; line-height: 1; margin-top: 2px; user-select: none;
    }

    .${p}-bottom-nav {
      position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 30;
      border-radius: 999px; display: flex; align-items: center; gap: 24px; padding: 8px 24px;
      background: rgba(15, 15, 20, 0.58);
    }
    .${p}-nav-item {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      background: transparent; border: 0; color: rgba(255, 255, 255, 0.5); cursor: pointer;
      font-size: 10px; font-weight: 500;
    }
    .${p}-nav-item.is-active { color: #ffffff; }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 5000; display: flex; align-items: center; justify-content: center;
      background: rgba(15, 23, 42, 0.62); padding: 20px; opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-out); backdrop-filter: blur(10px);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 460px; background: #ffffff; border: 1px solid var(--border);
      border-radius: 24px; padding: 28px; color: var(--fg);
    }

    @media (max-width: 1080px) {
      .${p}-stage { grid-template-columns: 1fr; justify-items: center; }
      .${p}-side-note { max-width: 460px; width: 100%; }
    }
    @media (max-width: 420px) {
      .${p}-phone-frame { width: 100%; border-radius: 36px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="${p}-top-bar">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:10px;height:10px;border-radius:50%;background:#0f172a;"></span>
      <strong style="font-size:15px;letter-spacing:-0.02em;">Travel Journal iOS</strong>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <button type="button" id="motionToggleBtn" aria-pressed="false" style="padding:8px 14px;border-radius:999px;border:1px solid var(--border);background:#ffffff;color:var(--fg);font-size:12px;font-weight:600;cursor:pointer;">
        Motion: ON
      </button>
      <button type="button" id="exploreMagneticBtn" style="padding:9px 18px;border-radius:999px;border:0;background:#0f172a;color:#ffffff;font-size:12.5px;font-weight:600;cursor:pointer;">
        New Trip Log +
      </button>
    </div>
  </header>

  <main id="main-content" class="${p}-stage">
    <aside class="${p}-side-note" aria-label="Travel Journal Overview">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#64748b;margin-bottom:8px;">LIQUID-GLASS MOBILE UI</div>
      <h1 style="font-size:28px;font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin-bottom:12px;">
        Asia &amp; Europe Moment Archive
      </h1>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Captured inside an authentic 375×780 iPhone Dynamic Island frame with specular liquid-glass pills, clipped 92px destination typography, and 85 curated photo moments.
      </p>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
        <div style="padding:14px;border-radius:16px;background:var(--bg);border:1px solid var(--border);">
          <div class="tabular-nums" style="font-size:24px;font-weight:800;" data-counter-target="85" data-counter-suffix=" Moments">85 Moments</div>
          <div style="font-size:11.5px;color:var(--muted);margin-top:2px;">Tokyo • Seoul • Bali • Rome</div>
        </div>
        <div style="padding:14px;border-radius:16px;background:var(--bg);border:1px solid var(--border);">
          <div class="tabular-nums" style="font-size:24px;font-weight:800;" id="activeDestinationStat">Tokyo (23)</div>
          <div style="font-size:11.5px;color:var(--muted);margin-top:2px;">Selected Journal</div>
        </div>
      </div>
    </aside>

    <section class="${p}-phone-frame" aria-label="iPhone Travel Journal Mockup">
      <div class="${p}-notch" aria-hidden="true"></div>

      <div class="${p}-phone-header">
        <button type="button" class="${p}-region-btn" data-next-preview="true" id="regionCycleBtn">
          <span id="regionLabel">Asia</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <button type="button" class="${p}-cal-btn" data-seamless-trigger="Travel Journal Calendar Timeline" aria-label="Open Calendar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        </button>
      </div>

      <div class="${p}-phone-scroll scrollbar-hide" id="phoneCardsList">
        <article class="${p}-dest-card" data-city="Tokyo (23)" data-seamless-trigger="Tokyo Journal — 23 Captured Moments">
          <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260704_101902_e8f0f37b-18b7-4c14-bb5c-99f0724d2646.png&w=1280&q=85" alt="Tokyo Travel Moments">
          <div class="${p}-dest-grad"></div>
          <div class="${p}-dest-top">
            <span class="liquid-glass ${p}-moments-pill tabular-nums">23 moments</span>
            <span class="liquid-glass ${p}-more-circle">•••</span>
          </div>
          <div class="${p}-dest-name-clip">
            <span class="${p}-dest-name">Tokyo</span>
          </div>
        </article>

        <article class="${p}-dest-card" data-city="Seoul (18)" data-seamless-trigger="Seoul Journal — 18 Captured Moments">
          <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260704_101935_4b17f250-8ddb-4ff2-b63d-dfd3497d4428.png&w=1280&q=85" alt="Seoul Travel Moments">
          <div class="${p}-dest-grad"></div>
          <div class="${p}-dest-top">
            <span class="liquid-glass ${p}-moments-pill tabular-nums">18 moments</span>
            <span class="liquid-glass ${p}-more-circle">•••</span>
          </div>
          <div class="${p}-dest-name-clip">
            <span class="${p}-dest-name">Seoul</span>
          </div>
        </article>

        <article class="${p}-dest-card" data-city="Bali (29)" data-seamless-trigger="Bali Journal — 29 Captured Moments">
          <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260704_101958_7116d6bf-fd6f-496f-b3cf-007688cd5123.png&w=1280&q=85" alt="Bali Travel Moments">
          <div class="${p}-dest-grad"></div>
          <div class="${p}-dest-top">
            <span class="liquid-glass ${p}-moments-pill tabular-nums">29 moments</span>
            <span class="liquid-glass ${p}-more-circle">•••</span>
          </div>
          <div class="${p}-dest-name-clip">
            <span class="${p}-dest-name">Bali</span>
          </div>
        </article>

        <article class="${p}-dest-card" data-city="Rome (15)" data-seamless-trigger="Rome Journal — 15 Captured Moments">
          <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260704_143008_72ee7299-04a8-474c-ae73-220d45b24a20.png&w=1280&q=85" alt="Rome Travel Moments">
          <div class="${p}-dest-grad"></div>
          <div class="${p}-dest-top">
            <span class="liquid-glass ${p}-moments-pill tabular-nums">15 moments</span>
            <span class="liquid-glass ${p}-more-circle">•••</span>
          </div>
          <div class="${p}-dest-name-clip">
            <span class="${p}-dest-name">Rome</span>
          </div>
        </article>
      </div>

      <nav class="liquid-glass ${p}-bottom-nav" aria-label="App Navigation">
        <button type="button" class="${p}-nav-item" data-tab-nav="Feed">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <span>Feed</span>
        </button>
        <button type="button" class="${p}-nav-item" data-tab-nav="Account">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          <span>Account</span>
        </button>
        <button type="button" class="${p}-nav-item is-active" data-tab-nav="Trips">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
          <span>Trips</span>
        </button>
      </nav>
    </section>

    <aside class="${p}-side-note" aria-label="Destination Telemetry">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#64748b;margin-bottom:8px;">ACTIVE ITINERARY</div>
      <h2 style="font-size:20px;font-weight:700;margin-bottom:10px;">4 Curated Chapters</h2>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:10px;font-size:13.5px;color:var(--muted);">
        <li style="display:flex;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid var(--border);"><span>01. Tokyo Shibuya Crossing</span><strong class="tabular-nums" style="color:var(--fg);">23 moments</strong></li>
        <li style="display:flex;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid var(--border);"><span>02. Seoul Bukchon Hanok</span><strong class="tabular-nums" style="color:var(--fg);">18 moments</strong></li>
        <li style="display:flex;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid var(--border);"><span>03. Bali Uluwatu Cliffs</span><strong class="tabular-nums" style="color:var(--fg);">29 moments</strong></li>
        <li style="display:flex;justify-content:space-between;"><span>04. Rome Trastevere Dusk</span><strong class="tabular-nums" style="color:var(--fg);">15 moments</strong></li>
      </ul>
    </aside>
  </main>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#64748b;">TRAVEL JOURNAL LOG</span>
        <button type="button" id="closeSeamlessBtn" style="background:transparent;border:1px solid var(--border);width:32px;height:32px;border-radius:50%;cursor:pointer;">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:22px;font-weight:800;margin-bottom:10px;">Tokyo — 23 Moments</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Sync your RAW camera roll, GPS pins, and voice notes into a shareable liquid-glass story reel.
      </p>
      <button type="button" id="confirmSeamlessBtn" style="width:100%;padding:12px;border-radius:999px;border:0;background:#0f172a;color:#ffffff;font-weight:700;cursor:pointer;">
        Open Story Reel →
      </button>
    </div>
  </div>

  <script>
    (function () {
      var regions = ['Asia', 'Asia & Europe', 'Favorites'];
      var rIdx = 0;
      var regionBtn = document.getElementById('regionCycleBtn');
      var regionLabel = document.getElementById('regionLabel');
      var statEl = document.getElementById('activeDestinationStat');
      var scrollBox = document.getElementById('phoneCardsList');
      if (regionBtn) {
        regionBtn.addEventListener('click', function () {
          rIdx = (rIdx + 1) % regions.length;
          if (regionLabel) regionLabel.textContent = regions[rIdx];
          if (statEl) statEl.textContent = rIdx === 1 ? 'Bali (29)' : rIdx === 2 ? 'Seoul (18)' : 'Tokyo (23)';
          if (scrollBox) scrollBox.scrollTo({ top: rIdx * 110, behavior: 'smooth' });
        });
      }
      document.querySelectorAll('[data-tab-nav]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('[data-tab-nav]').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 26. CELESTIAL RENEWAL — SERENE (celestial-renewal — Premium Tier)
  // Luxury Holistic Beauty & Wellness Video Hero + Parallax Rainbow & Cloud Quote
  // ============================================================================
  if (slug === 'celestial-renewal') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Serene — Gentle Touch. Radiant Presence. | Holistic Beauty &amp; Wellness</title>
  <meta name="description" content="Expert beauty and holistic wellness, delivered with warmth and intention. Founded by Dr. Mia Callahan.">
  <meta property="og:title" content="Serene — Gentle Touch. Radiant Presence.">
  <meta property="og:description" content="Serene was founded on a belief in beauty that honors your nature. Refined outcomes, considered approaches, and lasting vitality.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#0A0608">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0608;
      --fg: #ffffff;
      --muted: rgba(255, 255, 255, 0.76);
      --border: rgba(255, 255, 255, 0.18);
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: #ffffff; color: #0a0608; }
    html, body {
      background: var(--bg); color: var(--fg); font-family: 'Inter', sans-serif;
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: #ffffff; color: #0a0608;
      font-weight: 700; text-decoration: none;
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid #38bdf8; }
    a:focus-visible, button:focus-visible { outline: 2px solid #ffffff; outline-offset: 3px; }
    button { transition: transform 0.25s var(--ease-out), background-color 0.25s var(--ease-out); }
    button:active { transform: scale(0.97); }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid rgba(255, 255, 255, 0.45); margin: -17px 0 0 -17px; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: #ffffff; margin: -3px 0 0 -3px; }

    .text-glow {
      text-shadow: 0 0 40px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1);
    }
    .button-glow {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
    }

    .${p}-navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 150;
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px clamp(24px, 4.5vw, 48px);
      background: linear-gradient(180deg, rgba(10, 6, 8, 0.65) 0%, transparent 100%);
      backdrop-filter: blur(8px);
    }
    .${p}-logo {
      font-family: 'Dancing Script', cursive; font-size: clamp(26px, 3vw, 32px);
      font-weight: 600; color: #ffffff; text-decoration: none;
    }
    .${p}-nav-links { display: flex; align-items: center; gap: 44px; list-style: none; }
    .${p}-nav-links a {
      color: rgba(255, 255, 255, 0.8); text-decoration: none; font-size: 14px; letter-spacing: 0.02em;
    }
    .${p}-nav-links a:hover { color: #ffffff; }
    .${p}-btn-pill {
      background: #ffffff; color: #000000; padding: 13px 30px; border-radius: 999px; border: 0;
      font-weight: 500; font-size: 14px; letter-spacing: 0.02em; cursor: pointer;
    }

    .${p}-hero {
      position: relative; width: 100%; min-height: 100vh; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      background: radial-gradient(circle at 50% 45%, #3b1c2e 0%, #0a0608 75%);
    }
    .${p}-hero video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;
    }
    .${p}-hero-overlay {
      position: absolute; inset: 0; background: rgba(0, 0, 0, 0.22); z-index: 1;
    }
    .${p}-hero-center {
      position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 0 24px; margin-top: -40px;
    }
    .${p}-hero-h1 {
      font-family: 'Instrument Serif', Georgia, serif; font-weight: 400;
      font-size: clamp(3rem, 7.6vw, 6.8rem); line-height: 0.92; letter-spacing: -0.02em;
      color: #ffffff; max-width: 980px;
    }
    .${p}-hero-sub {
      color: rgba(255, 255, 255, 0.76); font-size: clamp(14px, 1.3vw, 16.5px);
      line-height: 1.6; max-width: 540px; margin: 24px 0 32px;
    }
    .${p}-sound-badge {
      position: absolute; bottom: 32px; left: 32px; z-index: 10;
      display: flex; align-items: center; gap: 12px; background: transparent; border: 0; color: rgba(255, 255, 255, 0.68); cursor: pointer;
      text-align: left; font-size: 12px; line-height: 1.35;
    }
    .${p}-sound-circle {
      width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.25);
      display: flex; align-items: center; justify-content: center;
    }

    .${p}-quote-sec {
      position: relative; width: 100%; min-height: 100vh; overflow: hidden;
      background: linear-gradient(180deg, #010a17 0%, #0a4267 30%, #20658e 60%, #6badc4 100%);
      display: flex; align-items: center; justify-content: center; padding: 80px 24px;
    }
    .${p}-rainbow-arc {
      position: absolute; inset: 0 0 auto 0; height: 340px; z-index: 5; pointer-events: none;
      background: radial-gradient(ellipse at 50% 0%, rgba(251, 146, 60, 0.22) 0%, rgba(168, 85, 247, 0.2) 32%, rgba(56, 189, 248, 0.22) 58%, transparent 78%);
      will-change: transform;
    }
    .${p}-cloud-left, .${p}-cloud-right {
      position: absolute; bottom: 10%; width: 520px; height: 220px; border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.24) 0%, rgba(186, 230, 253, 0.08) 55%, transparent 75%);
      filter: blur(18px); z-index: 6; pointer-events: none; will-change: transform;
    }
    .${p}-cloud-left { left: -120px; }
    .${p}-cloud-right { right: -120px; bottom: 15%; }
    .${p}-quote-box {
      position: relative; z-index: 20; max-width: 900px; text-align: center;
    }
    .${p}-quote-text {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: clamp(1.65rem, 3.4vw, 2.65rem); line-height: 1.46; color: #ffffff;
    }
    .${p}-quote-author {
      margin-top: 28px; color: rgba(255, 255, 255, 0.82); font-size: 15px; letter-spacing: 0.03em;
    }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 5000; display: flex; align-items: center; justify-content: center;
      background: rgba(10, 6, 8, 0.72); padding: 20px; opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-out); backdrop-filter: blur(12px);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 460px; background: #121824; border: 1px solid var(--border);
      border-radius: 24px; padding: 28px; color: #ffffff;
    }

    @media (max-width: 860px) {
      .${p}-nav-links { display: none; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="${p}-navbar">
    <a href="#top" class="${p}-logo">Serene</a>
    <nav aria-label="Primary">
      <ul class="${p}-nav-links">
        <li><a href="#quote">About</a></li>
        <li><a href="#quote">Services</a></li>
        <li><a href="#quote">Journal</a></li>
        <li><a href="#quote">Contact</a></li>
      </ul>
    </nav>
    <div style="display:flex;align-items:center;gap:10px;">
      <button type="button" id="motionToggleBtn" aria-pressed="false" style="padding:9px 16px;border-radius:999px;border:1px solid var(--border);background:rgba(255,255,255,0.08);color:#fff;font-size:12px;cursor:pointer;">
        Motion: ON
      </button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-pill button-glow">
        Book a consultation
      </button>
    </div>
  </header>

  <main id="main-content">
    <section id="top" class="${p}-hero" aria-label="Serene Celestial Renewal Hero">
      <video autoplay muted loop playsinline poster="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260715_015443_a695a5b2-dfbf-461e-acc6-a3f5e5d87e86.png&w=1280&q=85">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4" type="video/mp4">
      </video>
      <div class="${p}-hero-overlay" aria-hidden="true"></div>

      <div class="${p}-hero-center">
        <h1 class="${p}-hero-h1 text-glow" id="sereneHeroHeading">Gentle touch. Radiant presence.</h1>
        <p class="${p}-hero-sub" id="sereneHeroSub">
          Expert beauty and holistic wellness, delivered with warmth and intention.
        </p>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;">
          <button type="button" class="${p}-btn-pill button-glow" data-seamless-trigger="Begin Your Serene Holistic Renewal">
            Begin your renewal
          </button>
          <button type="button" data-next-preview="true" id="sereneRitualSwitchBtn" style="padding:13px 24px;border-radius:999px;border:1px solid rgba(255,255,255,0.35);background:rgba(255,255,255,0.1);color:#fff;font-size:13.5px;cursor:pointer;">
            Ritual: <span id="sereneRitualLabel">Celestial Facial</span>
          </button>
        </div>
      </div>

      <button type="button" class="${p}-sound-badge" id="soundToggleIndicator">
        <span class="${p}-sound-circle"><span style="width:14px;height:1.5px;background:#ffffff;display:block;"></span></span>
        <span>Experience<br><span id="soundStateLabel">with sound</span></span>
      </button>
    </section>

    <section id="quote" class="${p}-quote-sec" aria-label="Founder Philosophy">
      <div class="${p}-rainbow-arc" id="parallaxRainbow" aria-hidden="true"></div>
      <div class="${p}-cloud-left" id="parallaxCloudL" aria-hidden="true"></div>
      <div class="${p}-cloud-right" id="parallaxCloudR" aria-hidden="true"></div>

      <div class="${p}-quote-box">
        <blockquote class="${p}-quote-text">
          “Serene was founded on a belief in beauty that honors your nature. We pursue refined outcomes, considered approaches, and lasting vitality. We spend time learning what matters to you before deciding what serves you best. No rushing, no excess — just support that lets you feel radiant.”
        </blockquote>
        <div class="${p}-quote-author">Dr. Mia Callahan — Founder</div>
      </div>
    </section>
  </main>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-size:12px;letter-spacing:0.12em;color:rgba(255,255,255,0.7);">SERENE ATELIER</span>
        <button type="button" id="closeSeamlessBtn" style="background:transparent;border:1px solid var(--border);color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:'Instrument Serif',serif;font-size:30px;font-weight:400;margin-bottom:10px;">Private Wellness Consultation</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Schedule a bespoke skin and holistic longevity assessment with Dr. Mia Callahan's clinical sanctuary team.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-pill button-glow" style="width:100%;">
        Confirm Sanctuary Appointment →
      </button>
    </div>
  </div>

  <script>
    (function () {
      var rituals = [
        { name: 'Celestial Facial', head: 'Gentle touch. Radiant presence.' },
        { name: 'Lymphatic Sculpt', head: 'Restored balance. Luminous calm.' },
        { name: 'Botanical Longevity', head: 'Considered care. Lasting vitality.' }
      ];
      var rIdx = 0;
      var switchBtn = document.getElementById('sereneRitualSwitchBtn');
      var rLabel = document.getElementById('sereneRitualLabel');
      var hEl = document.getElementById('sereneHeroHeading');
      if (switchBtn) {
        switchBtn.addEventListener('click', function () {
          rIdx = (rIdx + 1) % rituals.length;
          if (rLabel) rLabel.textContent = rituals[rIdx].name;
          if (hEl) hEl.textContent = rituals[rIdx].head;
        });
      }

      var quoteSec = document.getElementById('quote');
      var rainbow = document.getElementById('parallaxRainbow');
      var cloudL = document.getElementById('parallaxCloudL');
      var cloudR = document.getElementById('parallaxCloudR');
      window.addEventListener('scroll', function () {
        if (!quoteSec) return;
        var rect = quoteSec.getBoundingClientRect();
        var vh = window.innerHeight || 900;
        var prog = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        if (rainbow) rainbow.style.transform = 'translate3d(0,' + Math.round(120 - prog * 240) + 'px,0)';
        if (cloudL) cloudL.style.transform = 'translate3d(' + Math.round(prog * 140) + 'px,' + Math.round(-prog * 45) + 'px,0)';
        if (cloudR) cloudR.style.transform = 'translate3d(' + Math.round(-prog * 140) + 'px,' + Math.round(-prog * 45) + 'px,0)';
      }, { passive: true });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 27. AI WORKFLOW AGENTS — AXON (ai-workflow-agents — Premium Tier)
  // Y Combinator Digital Workers for Mundane Workflows Hero & Agent Workbench
  // ============================================================================
  if (slug === 'ai-workflow-agents') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Axon — Digital Workers for Mundane Workflows</title>
  <meta name="description" content="Eliminate your tedious browser work and 10x your team's capacity. Put intelligent agents on every routine process so you grow faster and deliver more for clients — effortlessly.">
  <meta property="og:title" content="Axon — Deploy Digital Workers for Mundane Workflows">
  <meta property="og:description" content="Funded by Y Combinator — Autonomous browser agents for enterprise operations.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#F3EEFF">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f3eeff;
      --fg: #1b133c;
      --muted: rgba(27, 19, 60, 0.72);
      --border: rgba(27, 19, 60, 0.12);
      --accent: #f97316;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: #1b133c; color: #ffffff; }
    html, body {
      font-family: 'Inter', sans-serif; color: var(--fg);
      background: linear-gradient(180deg, #ede9fe 0%, #ddd6fe 50%, #f5f3ff 100%);
      overflow-x: clip; scroll-behavior: smooth; -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--fg); color: #ffffff;
      font-weight: 700; text-decoration: none;
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--accent); }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--fg); outline-offset: 3px; }
    button { transition: transform 0.22s var(--ease-out), box-shadow 0.22s var(--ease-out); }
    button:active { transform: scale(0.97); }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid rgba(27, 19, 60, 0.35); margin: -16px 0 0 -16px; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--fg); margin: -3px 0 0 -3px; }

    .${p}-hero {
      position: relative; width: 100%; min-height: 100vh; overflow: hidden;
      display: flex; flex-direction: column; align-items: center;
      padding: 24px 20px 64px;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 130%; object-fit: cover; object-position: top; z-index: 0;
    }
    .${p}-bg-scrim {
      position: absolute; inset: 0;
      background: radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.68) 0%, rgba(237, 233, 254, 0.38) 60%, rgba(27, 19, 60, 0.14) 100%);
      z-index: 1;
    }

    .${p}-nav-pill {
      position: relative; z-index: 10;
      background: rgba(255, 255, 255, 0.76); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border); border-radius: 14px;
      padding: 12px 24px; display: flex; align-items: center; gap: 32px;
      box-shadow: 0 4px 18px rgba(27, 19, 60, 0.06);
    }
    .${p}-nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
    .${p}-nav-links a {
      font-size: 14px; font-weight: 500; color: rgba(27, 19, 60, 0.8); text-decoration: none;
    }
    .${p}-nav-links a:hover { color: var(--fg); }

    .${p}-hero-content {
      position: relative; z-index: 10; margin-top: clamp(36px, 6vh, 64px);
      display: flex; flex-direction: column; align-items: center; text-align: center;
      max-width: 920px;
    }
    .${p}-yc-badge {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 8px 16px; border-radius: 12px;
      border: 1px solid rgba(27, 19, 60, 0.1);
      background: rgba(255, 255, 255, 0.78); backdrop-filter: blur(8px);
      font-size: 13.5px; font-weight: 500; color: var(--fg); margin-bottom: 24px;
    }
    .${p}-yc-square {
      width: 20px; height: 20px; border-radius: 4px; background: #f97316;
      color: #ffffff; font-weight: 700; font-size: 12px;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .${p}-heading {
      font-family: 'Instrument Serif', Georgia, serif; font-weight: 400;
      font-size: clamp(2.8rem, 6.8vw, 5.8rem); line-height: 0.95; letter-spacing: -0.02em;
      color: var(--fg);
    }
    .${p}-subtitle {
      margin-top: 22px; max-width: 680px;
      font-size: clamp(13.5px, 1.2vw, 16px); line-height: 1.62; color: var(--muted);
    }
    .${p}-cta-row {
      margin-top: 30px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;
    }
    .${p}-btn-early {
      padding: 14px 32px; border-radius: 12px; border: 0;
      background: #fefefe; color: var(--fg); font-size: 14px; font-weight: 600; cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .${p}-btn-early:hover { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22); }

    .${p}-agent-dock {
      position: relative; z-index: 10; margin-top: 44px; width: 100%; max-width: 960px;
      background: rgba(255, 255, 255, 0.84); backdrop-filter: blur(16px);
      border: 1px solid var(--border); border-radius: 22px; padding: 22px;
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px;
      box-shadow: 0 20px 50px rgba(27, 19, 60, 0.12);
    }
    .${p}-agent-card {
      background: rgba(255, 255, 255, 0.9); border: 1px solid var(--border);
      border-radius: 16px; padding: 18px; text-align: left; cursor: pointer;
    }
    .${p}-agent-card.is-active {
      border-color: var(--fg); box-shadow: 0 10px 24px rgba(27, 19, 60, 0.08);
    }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 5000; display: flex; align-items: center; justify-content: center;
      background: rgba(27, 19, 60, 0.56); padding: 20px; opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-out); backdrop-filter: blur(10px);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 460px; background: #ffffff; border: 1px solid var(--border);
      border-radius: 22px; padding: 28px; color: var(--fg);
    }

    @media (max-width: 860px) {
      .${p}-agent-dock { grid-template-columns: 1fr; }
      .${p}-nav-links { display: none; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <main id="main-content">
    <section class="${p}-hero" aria-label="Axon Digital Workers Hero">
      <video class="${p}-bg-video" autoplay muted loop playsinline poster="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260715_014544_2e2e15ee-0037-456c-b0d1-1c174ef0bc27.png&w=1280&q=85">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260714_113715_c7e0daa0-8bdd-4486-a2da-040901f8f0ea.mp4" type="video/mp4">
      </video>
      <div class="${p}-bg-scrim" aria-hidden="true"></div>

      <header class="${p}-nav-pill">
        <a href="#main-content" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:var(--fg);font-weight:700;font-size:15px;">
          <svg width="24" height="24" viewBox="0 0 256 256" fill="#1B133C" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z"/>
            <path d="M 256 128 L 128 128 L 0 0 L 128 0 Z"/>
          </svg>
          <span>Axon</span>
        </a>
        <nav aria-label="Primary">
          <ul class="${p}-nav-links">
            <li><a href="#agents">Features</a></li>
            <li><a href="#agents">Plans</a></li>
            <li><a href="#agents">Security</a></li>
            <li><a href="#agents">About</a></li>
          </ul>
        </nav>
        <button type="button" id="motionToggleBtn" aria-pressed="false" style="padding:6px 12px;border-radius:8px;border:1px solid var(--border);background:#ffffff;color:var(--fg);font-size:11.5px;font-weight:600;cursor:pointer;">
          Motion: ON
        </button>
      </header>

      <div class="${p}-hero-content">
        <div class="${p}-yc-badge">
          <span class="${p}-yc-square">Y</span>
          <span>Funded by Y Combinator</span>
        </div>

        <h1 class="${p}-heading">
          Deploy digital workers<br>for mundane workflows
        </h1>

        <p class="${p}-subtitle" id="axonActiveSubtitle">
          Eliminate your tedious browser work and 10x your team's capacity. Put intelligent agents on every routine process so you grow faster and deliver more for clients — effortlessly.
        </p>

        <div class="${p}-cta-row">
          <button type="button" id="exploreMagneticBtn" class="${p}-btn-early">
            Get Early Access
          </button>
          <button type="button" data-next-preview="true" id="cycleWorkerBtn" style="padding:14px 22px;border-radius:12px;border:1px solid var(--border);background:rgba(255,255,255,0.82);color:var(--fg);font-size:13.5px;font-weight:600;cursor:pointer;">
            Active Worker: <span id="activeWorkerName">CRM Sync Agent</span>
          </button>
        </div>
      </div>

      <div id="agents" class="${p}-agent-dock" role="region" aria-label="Digital Worker Fleet">
        <article class="${p}-agent-card is-active" data-worker="CRM Sync Agent" data-desc="Autonomous Salesforce &amp; HubSpot browser worker reconciling 1,400+ daily lead records with zero human clicks.">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#f97316;font-weight:600;">WORKER 01 • LIVE</div>
          <h2 style="font-size:16px;font-weight:700;margin:6px 0;">CRM &amp; Billing Reconciliation</h2>
          <p style="font-size:12.5px;color:var(--muted);line-height:1.5;">Extracts invoices, validates PO line items, and updates ERP portals 24/7.</p>
        </article>

        <article class="${p}-agent-card" data-worker="Claims Triage Agent" data-desc="Processes multi-portal insurance &amp; healthcare prior authorizations with full audit video replay.">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#1b133c;font-weight:600;">WORKER 02 • 10X SPEED</div>
          <h2 style="font-size:16px;font-weight:700;margin:6px 0;">Portal Claims &amp; Onboarding</h2>
          <p style="font-size:12.5px;color:var(--muted);line-height:1.5;">Navigates legacy web forms, MFA prompts, and PDF attachments autonomously.</p>
        </article>

        <article class="${p}-agent-card" data-worker="Compliance QA Agent" data-desc="SOC2 Type II isolated browser fleet verifying vendor KYC documents and sanctions lists in real time.">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#1b133c;font-weight:600;">WORKER 03 • SOC2</div>
          <h2 style="font-size:16px;font-weight:700;margin:6px 0;">KYC &amp; Vendor Verification</h2>
          <p style="font-size:12.5px;color:var(--muted);line-height:1.5;">Deterministic browser checkpoints with human-in-the-loop Slack approvals.</p>
        </article>
      </div>
    </section>
  </main>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span class="${p}-yc-badge" style="margin:0;padding:4px 10px;font-size:11.5px;"><span class="${p}-yc-square">Y</span> AXON EARLY ACCESS</span>
        <button type="button" id="closeSeamlessBtn" style="background:transparent;border:1px solid var(--border);width:32px;height:32px;border-radius:50%;cursor:pointer;">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:'Instrument Serif',serif;font-size:30px;font-weight:400;margin-bottom:10px;">Deploy Your First Digital Worker</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Connect Axon to your routine browser workflows in under 10 minutes. SOC2-compliant cloud sessions with full step-by-step telemetry.
      </p>
      <button type="button" id="confirmSeamlessBtn" style="width:100%;padding:13px;border-radius:12px;border:0;background:var(--fg);color:#ffffff;font-weight:600;cursor:pointer;">
        Request Workspace Invite →
      </button>
    </div>
  </div>

  <script>
    (function () {
      var cards = Array.prototype.slice.call(document.querySelectorAll('.${p}-agent-card'));
      var nameEl = document.getElementById('activeWorkerName');
      var subEl = document.getElementById('axonActiveSubtitle');
      var idx = 0;
      function selectCard(c) {
        cards.forEach(function (el) { el.classList.remove('is-active'); });
        c.classList.add('is-active');
        if (nameEl) nameEl.textContent = c.getAttribute('data-worker') || '';
        if (subEl) subEl.textContent = c.getAttribute('data-desc') || '';
      }
      cards.forEach(function (c, i) {
        c.addEventListener('click', function () {
          idx = i;
          selectCard(c);
        });
      });
      var cycleBtn = document.getElementById('cycleWorkerBtn');
      if (cycleBtn) {
        cycleBtn.addEventListener('click', function () {
          idx = (idx + 1) % cards.length;
          selectCard(cards[idx]);
        });
      }
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 26. F1 RACING HUB (f1-racing-hub — Free Tier)
  // Lewis Hamilton / Silverstone F1 Hero + Scuderia Ferrari SF-26 Triple-Phone Hub
  // ============================================================================
  if (slug === 'f1-racing-hub') {
    const pageBg = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_152331_bd312d1a-1f20-46b9-9b68-12bcdcf6d53e.png&w=1280&q=85';
    const f1Logo = 'https://framerusercontent.com/images/NZPITJ6zDBvxVT7rc1NH2sOU.png';
    const profileIcon = 'https://framerusercontent.com/images/JIl4japgQlMAQRvh1gDHszRvkUY.png?width=92&height=92';
    const ukFlag = 'https://framerusercontent.com/images/pqUTggaeyOivtzDImRzkBRdww.png';
    const hamiltonPhoto = 'https://framerusercontent.com/images/m5IyHuJeOQ5P0GOvWx1xv0IR9Y.png';
    const driverStrip = 'https://framerusercontent.com/images/dAAdqktZVxBDjPKk97YCjZjsE.png';
    const circuitImg = 'https://framerusercontent.com/images/raKAG2bJP9xeqi118VMniPLvbAA.png';
    const medalIcon = 'https://framerusercontent.com/images/pIXUcwyAF0xzCIaKjtNLahHpasQ.png';
    const ferrariIcon = 'https://framerusercontent.com/images/sUDhzMuxKIOvqjSH5U1fn0QSXqI.png';
    const chassisIcon = 'https://framerusercontent.com/images/zIA1tYDOAdZo3k6IXX9gBC5FGbY.png';
    const ferrariCar = 'https://framerusercontent.com/images/MzKCSYB4uVt9psQq4jRwQNRDjc.png';
    const leclercStats = 'https://framerusercontent.com/images/MJfqhcmEoIBnfimJNhKqoZpq0.png';
    const hamiltonStats = 'https://framerusercontent.com/images/3EwXxC1QutaGnlNDZMlAN66ZmTU.png';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>F1 Racing Hub — Lewis Hamilton Silverstone &amp; Scuderia Ferrari SF-26</title>
  <meta name="description" content="Interactive Formula 1 mobile telemetry hub featuring Lewis Hamilton at Silverstone, live season points count-up, and Scuderia Ferrari SF-26 driver lineup.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0e1c;
      --surface: #12172a;
      --surface-elevated: #192038;
      --fg: #ffffff;
      --muted: #b4bfd6;
      --border: rgba(255, 255, 255, 0.14);
      --accent: #edb40b;
      --accent-text: #f6c93e;
      --accent-strong: #e10600;
      --on-accent: #0a0e1c;
      --f1-red: #e10600;
      --f1-dark: #292929;
      --font-display: 'Albert Sans', sans-serif;
      --font-sans: 'Albert Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 42px;
      --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
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
      font-weight: 700; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid #ffffff; outline-offset: 3px; }
    a:focus-visible, button:focus-visible {
      outline: 2px solid var(--accent-text);
      outline-offset: 3px;
    }
    button, [role="button"] {
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out), background-color 0.22s var(--ease-out), border-color 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: scale(0.97) translateY(1px);
    }
    .tabular-nums { font-variant-numeric: tabular-nums; }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideLeft {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes speedReveal {
      0% { opacity: 0; transform: translateX(-100%) skewX(-8deg); filter: blur(8px); }
      60% { opacity: 1; transform: translateX(4%) skewX(-2deg); filter: blur(0); }
      100% { opacity: 1; transform: translateX(0) skewX(0); filter: blur(0); }
    }

    .${p}-top-bar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 120;
      padding: 14px clamp(16px, 4vw, 48px);
      display: flex; align-items: center; justify-content: space-between;
      background: linear-gradient(180deg, rgba(10, 14, 28, 0.9) 0%, rgba(10, 14, 28, 0) 100%);
    }
    .${p}-brand {
      display: inline-flex; align-items: center; gap: 12px;
      color: var(--fg); text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: -0.02em;
    }
    .${p}-logo-img {
      width: 68px; height: 24px;
      background-image: url('${f1Logo}');
      background-size: contain; background-repeat: no-repeat; background-position: left center;
    }
    .${p}-nav-links {
      display: flex; align-items: center; gap: 24px; list-style: none;
    }
    .${p}-nav-links a {
      color: var(--muted); text-decoration: none; font-size: 13.5px; font-weight: 600;
    }
    .${p}-nav-links a:hover { color: var(--accent-text); }
    .${p}-top-actions { display: flex; align-items: center; gap: 10px; }
    .${p}-btn-pill {
      padding: 8px 16px; border-radius: 999px; border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.08); color: var(--fg);
      font-size: 12px; font-weight: 600; cursor: pointer;
    }
    .${p}-btn-gold {
      padding: 9px 18px; border-radius: 999px; border: 0;
      background: var(--accent); color: var(--on-accent);
      font-size: 12.5px; font-weight: 700; cursor: pointer;
    }

    .${p}-hero {
      position: relative; width: 100%; min-height: 100vh; overflow: hidden;
      padding: 62px clamp(16px, 3vw, 40px) 18px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .${p}-hero-bg {
      position: absolute; inset: 0; z-index: 0;
      background-image: url('${pageBg}');
      background-size: cover; background-position: center;
    }
    .${p}-hero-overlay {
      position: absolute; inset: 0; z-index: 1;
      background: rgba(0, 0, 0, 0.7);
    }
    .${p}-phones-stage {
      position: relative; z-index: 2; width: 100%; max-width: 1120px;
      display: flex; align-items: flex-end; justify-content: center; gap: clamp(16px, 2vw, 28px);
    }
    .${p}-phone-wrap {
      display: flex; flex-direction: column; align-items: center;
      animation: fadeSlideUp 0.9s var(--ease-out) both;
    }
    .${p}-phone-wrap.is-center { margin-bottom: -14px; animation-delay: 0.2s; }
    .${p}-phone-wrap.is-right { animation-delay: 0.35s; }

    .${p}-phone-frame {
      position: relative;
      width: clamp(240px, 22.5vw, 304px);
      aspect-ratio: 390 / 800;
      border-radius: 42px;
      background: #000000;
      padding: 9px;
      box-shadow: 0 28px 64px rgba(0, 0, 0, 0.72), inset 0 0 0 1px rgba(255, 255, 255, 0.16);
    }
    .${p}-island {
      position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
      width: 28%; height: 24px; background: #000000; border-radius: 999px; z-index: 40;
    }
    .${p}-screen {
      position: relative; width: 100%; height: 100%;
      border-radius: 37px; overflow: hidden; background: var(--bg);
      display: flex; flex-direction: column;
    }
    .${p}-screen-bg {
      position: absolute; inset: 0; z-index: 0;
      background-image: url('${pageBg}');
      background-size: cover; background-position: center;
    }
    .${p}-screen-dim {
      position: absolute; inset: 0; z-index: 1;
      background: rgba(0, 0, 0, 0.6);
    }

    .${p}-phone-nav {
      position: relative; z-index: 30;
      display: flex; align-items: center; justify-content: space-between;
      padding: 26px 18px 0; height: 68px;
    }
    .${p}-phone-logo {
      width: 64px; height: 22px;
      background-image: url('${f1Logo}');
      background-size: contain; background-repeat: no-repeat; background-position: left center;
    }
    .${p}-phone-nav-btns { display: flex; align-items: center; }
    .${p}-sq-white {
      width: 42px; height: 42px; background: #ffffff; border: 0; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
    .${p}-sq-white-icon {
      width: 18px; height: 18px;
      background-image: url('${profileIcon}');
      background-size: contain; background-repeat: no-repeat; background-position: center;
    }
    .${p}-sq-glass {
      width: 42px; height: 42px; border: 0; cursor: pointer;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      display: flex; flex-direction: column; align-items: flex-end; justify-content: center;
      padding-right: 11px; gap: 5px;
    }
    .${p}-bar-long { width: 20px; height: 2px; background: #ffffff; border-radius: 99px; }
    .${p}-bar-short { width: 11px; height: 2px; background: #ffffff; border-radius: 99px; }

    .${p}-menu-overlay {
      position: absolute; inset: 0; z-index: 45;
      background: linear-gradient(160deg, #1a0000 0%, #8B0000 40%, #E10600 100%);
      padding: 88px 24px 28px;
      display: flex; flex-direction: column; justify-content: space-between;
      opacity: 0; pointer-events: none;
      transition: opacity 0.35s var(--ease-out);
    }
    .${p}-menu-overlay.is-open { opacity: 1; pointer-events: auto; }
    .${p}-menu-list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
    .${p}-menu-list button {
      background: none; border: 0; color: #ffffff;
      font-size: 28px; font-weight: 700; letter-spacing: -0.03em; cursor: pointer; text-align: left;
    }
    .${p}-menu-list button:hover { color: var(--accent); }

    .${p}-loc-block {
      position: relative; z-index: 10; padding: 14px 18px 0;
    }
    .${p}-loc-sub {
      display: flex; align-items: center; gap: 8px;
      color: rgba(255, 255, 255, 0.68); font-size: 13.5px; margin-bottom: 4px;
    }
    .${p}-flag {
      width: 20px; height: 20px;
      background-image: url('${ukFlag}');
      background-size: contain; background-repeat: no-repeat; background-position: center;
    }
    .${p}-loc-title {
      font-size: clamp(32px, 3.1vw, 42px); font-weight: 400; line-height: 0.94; letter-spacing: -0.05em;
    }

    .${p}-driver-photo-wrap {
      position: absolute; inset: 0; z-index: 5;
      display: flex; align-items: flex-end; justify-content: center; pointer-events: none;
    }
    .${p}-driver-photo {
      width: 132%; height: 74%;
      background-image: url('${hamiltonPhoto}');
      background-size: contain; background-repeat: no-repeat; background-position: bottom center;
      animation: scaleIn 1s var(--ease-out) 0.3s both;
    }
    .${p}-driver-blur {
      position: absolute; left: 0; right: 0; bottom: 0; height: 46%; z-index: 6;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      mask-image: linear-gradient(to bottom, transparent 0%, black 52%);
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 52%);
      pointer-events: none;
    }
    .${p}-s1-bottom {
      position: relative; z-index: 12; margin-top: auto; padding: 0 18px 20px;
    }
    .${p}-avatar-strip {
      width: 138px; height: 40px; margin-bottom: 10px;
      background-image: url('${driverStrip}');
      background-size: contain; background-repeat: no-repeat; background-position: left center;
    }
    .${p}-driver-name {
      font-size: clamp(44px, 4.2vw, 56px); font-weight: 600; line-height: 0.84; letter-spacing: -0.05em;
      animation: speedReveal 0.85s var(--ease-out) 0.45s both;
    }

    .${p}-circuit-box {
      position: relative; z-index: 10; flex: 1; margin: 6px 10px;
      background-image: url('${circuitImg}');
      background-size: contain; background-repeat: no-repeat; background-position: center;
      min-height: 150px;
    }
    .${p}-stats-stack {
      position: relative; z-index: 10; padding: 0 18px 22px;
    }
    .${p}-points-head {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 13px; color: rgba(255, 255, 255, 0.72); margin-bottom: 8px;
    }
    .${p}-medal {
      width: 20px; height: 20px;
      background-image: url('${medalIcon}');
      background-size: contain; background-repeat: no-repeat; background-position: center;
    }
    .${p}-stat-giant {
      font-size: clamp(54px, 4.8vw, 68px); font-weight: 600; line-height: 0.76; letter-spacing: -0.06em;
    }
    .${p}-stat-fade {
      background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.42) 55%, rgba(255, 255, 255, 0.08) 95%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .${p}-stat-gold { color: var(--accent); }

    .${p}-chassis-block {
      position: relative; z-index: 10; padding: 10px 18px 0;
    }
    .${p}-chassis-num {
      font-size: clamp(56px, 5vw, 72px); font-weight: 600; line-height: 0.8; letter-spacing: -0.08em;
      color: var(--accent); margin-top: 4px;
    }
    .${p}-car-stage {
      position: relative; z-index: 10; width: calc(100% - 16px); height: 122px; margin: 4px auto;
      background-image: url('${ferrariCar}');
      background-size: contain; background-repeat: no-repeat; background-position: center;
      animation: fadeSlideLeft 0.9s var(--ease-out) 0.4s both;
    }
    .${p}-driver-pair {
      position: relative; z-index: 10; margin-top: auto;
      display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 0 8px;
    }
    .${p}-driver-card {
      background: rgba(20, 20, 30, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-bottom: 0; border-radius: 16px 16px 0 0;
      padding: 10px 10px 12px;
      backdrop-filter: blur(16px);
      cursor: pointer;
    }
    .${p}-driver-card.is-selected {
      border-color: var(--accent);
      background: rgba(40, 30, 18, 0.86);
    }
    .${p}-driver-card-top {
      font-size: 11px; color: rgba(255, 255, 255, 0.72); margin-bottom: 4px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-mini-bars {
      width: 58px; height: 14px; margin-bottom: 6px;
      background-size: contain; background-repeat: no-repeat; background-position: left center;
    }
    .${p}-car-num {
      font-size: clamp(48px, 4.4vw, 62px); font-weight: 600; line-height: 0.8; letter-spacing: -0.08em;
    }

    .${p}-section {
      max-width: 1240px; margin: 0 auto; padding: 72px clamp(20px, 4vw, 48px);
    }
    .${p}-workbench {
      background: var(--surface); border: 1px solid var(--border); border-radius: 28px;
      padding: clamp(24px, 3.5vw, 40px);
    }
    .${p}-wb-head {
      display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 20px;
      margin-bottom: 28px;
    }
    .${p}-tire-tabs { display: flex; gap: 10px; flex-wrap: wrap; }
    .${p}-tire-btn {
      padding: 10px 18px; border-radius: 999px; border: 1px solid var(--border);
      background: var(--surface-elevated); color: var(--fg);
      font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .${p}-tire-btn.is-active {
      background: var(--accent); color: var(--on-accent); border-color: var(--accent);
    }
    .${p}-telemetry-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
    }
    .${p}-stat-card {
      background: var(--surface-elevated); border: 1px solid var(--border);
      border-radius: 20px; padding: 22px;
    }
    .${p}-footer {
      border-top: 1px solid var(--border); padding: 36px clamp(20px, 4vw, 48px);
      max-width: 1240px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
      color: var(--muted); font-size: 13px;
    }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 500;
      display: flex; align-items: center; justify-content: center;
      background: rgba(10, 14, 28, 0.76); padding: 20px;
      opacity: 0; pointer-events: none; transition: opacity 0.25s var(--ease-out);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 440px; background: var(--surface);
      border: 1px solid var(--border); border-radius: 24px; padding: 28px;
    }

    @media (max-width: 980px) {
      .${p}-phones-stage { flex-direction: column; align-items: center; gap: 36px; }
      .${p}-phone-wrap.is-center { margin-bottom: 0; }
      .${p}-telemetry-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .${p}-nav-links { display: none; }
      .${p}-phone-frame { width: min(88vw, 340px); }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="${p}-top-bar">
    <a href="#main-content" class="${p}-brand">
      <span class="${p}-logo-img" role="img" aria-label="F1 Logo"></span>
      <span>F1 Racing Hub • Silverstone GP</span>
    </a>
    <nav aria-label="Primary Telemetry Navigation">
      <ul class="${p}-nav-links">
        <li><a href="#screens">Mobile Hub</a></li>
        <li><a href="#telemetry">SF-26 Telemetry</a></li>
        <li><a href="#standings">Season Points</a></li>
      </ul>
    </nav>
    <div class="${p}-top-actions">
      <button type="button" id="motionToggleBtn" class="${p}-btn-pill" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-gold" style="display:inline-flex;align-items:center;gap:6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
        </svg>
        <span>Paddock Pass</span>
      </button>
    </div>
  </header>

  <main id="main-content">
    <section id="screens" class="${p}-hero" aria-label="Lewis Hamilton Silverstone F1 Triple-Screen Hub">
      <div class="${p}-hero-bg" role="img" aria-label="Silverstone Grand Prix circuit atmosphere"></div>
      <div class="${p}-hero-overlay" aria-hidden="true"></div>

      <div class="${p}-phones-stage">
        <!-- SCREEN 1: LEWIS HAMILTON HERO -->
        <article class="${p}-phone-wrap" aria-label="Screen 1: Lewis Hamilton Silverstone">
          <div class="${p}-phone-frame">
            <div class="${p}-island" aria-hidden="true"></div>
            <div class="${p}-screen">
              <div class="${p}-screen-bg" aria-hidden="true"></div>
              <div class="${p}-screen-dim" aria-hidden="true"></div>

              <div class="${p}-phone-nav">
                <div class="${p}-phone-logo" role="img" aria-label="Formula 1"></div>
                <div class="${p}-phone-nav-btns">
                  <button type="button" class="${p}-sq-white" data-seamless-trigger="Driver Profile: Lewis Hamilton #44" aria-label="Driver Profile">
                    <span class="${p}-sq-white-icon" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="${p}-sq-glass" data-phone-menu="menu1" aria-label="Toggle F1 Menu">
                    <span class="${p}-bar-long"></span>
                    <span class="${p}-bar-short"></span>
                  </button>
                </div>
              </div>

              <div id="menu1" class="${p}-menu-overlay" aria-hidden="true">
                <ul class="${p}-menu-list">
                  <li><button type="button" data-menu-close="menu1">Biography</button></li>
                  <li><button type="button" data-menu-close="menu1">Statistics</button></li>
                  <li><button type="button" data-menu-close="menu1">Career</button></li>
                </ul>
                <button type="button" class="${p}-btn-gold" style="background:#ffffff;color:#0a0e1c;width:100%;padding:12px;" data-seamless-trigger="F1 Paddock Sign In">Sign in</button>
              </div>

              <div class="${p}-loc-block">
                <div class="${p}-loc-sub">
                  <span>United Kingdom</span>
                  <span class="${p}-flag" role="img" aria-label="UK Flag"></span>
                </div>
                <h1 class="${p}-loc-title">Silverstone<br>England</h1>
              </div>

              <div class="${p}-driver-photo-wrap">
                <div class="${p}-driver-photo" role="img" aria-label="Lewis Hamilton Portrait"></div>
                <div class="${p}-driver-blur" aria-hidden="true"></div>
              </div>

              <div class="${p}-s1-bottom">
                <div class="${p}-avatar-strip" role="img" aria-label="Driver Selector Strip"></div>
                <div class="${p}-driver-name" id="heroDriverDisplay" style="font-size:clamp(38px,3.6vw,48px);">Lewis<br>Hamilton</div>
              </div>
            </div>
          </div>
        </article>

        <!-- SCREEN 2: SILVERSTONE CIRCUIT + SEASON POINTS -->
        <article class="${p}-phone-wrap is-center" aria-label="Screen 2: Silverstone Circuit and Season Points">
          <div class="${p}-phone-frame">
            <div class="${p}-island" aria-hidden="true"></div>
            <div class="${p}-screen">
              <div class="${p}-screen-bg" aria-hidden="true"></div>
              <div class="${p}-screen-dim" aria-hidden="true"></div>

              <div class="${p}-phone-nav">
                <div class="${p}-phone-logo" role="img" aria-label="Formula 1"></div>
                <div class="${p}-phone-nav-btns">
                  <button type="button" class="${p}-sq-white" data-next-preview="true" id="recountStatsBtn" aria-label="Replay Season Points Count-Up">
                    <span class="${p}-sq-white-icon" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="${p}-sq-glass" data-phone-menu="menu2" aria-label="Toggle Circuit Menu">
                    <span class="${p}-bar-long"></span>
                    <span class="${p}-bar-short"></span>
                  </button>
                </div>
              </div>

              <div id="menu2" class="${p}-menu-overlay" aria-hidden="true">
                <ul class="${p}-menu-list">
                  <li><button type="button" data-menu-close="menu2">Biography</button></li>
                  <li><button type="button" data-menu-close="menu2">Statistics</button></li>
                  <li><button type="button" data-menu-close="menu2">Career</button></li>
                </ul>
                <button type="button" class="${p}-btn-gold" style="background:#ffffff;color:#0a0e1c;width:100%;padding:12px;" data-seamless-trigger="F1 Telemetry Sign In">Sign in</button>
              </div>

              <div class="${p}-loc-block">
                <div class="${p}-loc-sub">
                  <span>United Kingdom</span>
                  <span class="${p}-flag" role="img" aria-label="UK Flag"></span>
                </div>
                <div class="${p}-loc-title">Silverstone<br>England</div>
              </div>

              <div class="${p}-circuit-box" role="img" aria-label="Silverstone Grand Prix Circuit Layout"></div>

              <div id="standings" class="${p}-stats-stack">
                <div class="${p}-points-head">
                  <span>Season Points</span>
                  <span class="${p}-medal" role="img" aria-label="Points Medal"></span>
                </div>
                <div class="${p}-stat-giant ${p}-stat-fade tabular-nums" data-f1-count="227">227</div>
                <div class="${p}-stat-giant ${p}-stat-fade tabular-nums" data-f1-count="374">374</div>
                <div class="${p}-stat-giant ${p}-stat-gold tabular-nums" data-f1-count="4987">4987</div>
              </div>
            </div>
          </div>
        </article>

        <!-- SCREEN 3: SCUDERIA FERRARI SF-26 TEAM -->
        <article class="${p}-phone-wrap is-right" aria-label="Screen 3: Scuderia Ferrari SF-26">
          <div class="${p}-phone-frame">
            <div class="${p}-island" aria-hidden="true"></div>
            <div class="${p}-screen">
              <div class="${p}-screen-bg" aria-hidden="true"></div>
              <div class="${p}-screen-dim" aria-hidden="true"></div>

              <div class="${p}-phone-nav">
                <div class="${p}-phone-logo" role="img" aria-label="Formula 1"></div>
                <div class="${p}-phone-nav-btns">
                  <button type="button" class="${p}-sq-white" data-seamless-trigger="Scuderia Ferrari Constructor Telemetry" aria-label="Scuderia Ferrari Profile">
                    <span class="${p}-sq-white-icon" aria-hidden="true"></span>
                  </button>
                  <button type="button" class="${p}-sq-glass" data-phone-menu="menu3" aria-label="Toggle Team Menu">
                    <span class="${p}-bar-long"></span>
                    <span class="${p}-bar-short"></span>
                  </button>
                </div>
              </div>

              <div id="menu3" class="${p}-menu-overlay" aria-hidden="true">
                <ul class="${p}-menu-list">
                  <li><button type="button" data-menu-close="menu3">Biography</button></li>
                  <li><button type="button" data-menu-close="menu3">Statistics</button></li>
                  <li><button type="button" data-menu-close="menu3">Career</button></li>
                </ul>
                <button type="button" class="${p}-btn-gold" style="background:#ffffff;color:#0a0e1c;width:100%;padding:12px;" data-seamless-trigger="Scuderia Ferrari Pass">Sign in</button>
              </div>

              <div class="${p}-loc-block">
                <div class="${p}-loc-sub">
                  <span>Team Name</span>
                  <span style="width:18px;height:18px;background-image:url('${ferrariIcon}');background-size:contain;background-repeat:no-repeat;display:inline-block;" role="img" aria-label="Scuderia Ferrari Shield"></span>
                </div>
                <div class="${p}-loc-title" style="letter-spacing:-0.07em;">Scuderia<br>Ferrari</div>
              </div>

              <div class="${p}-chassis-block">
                <div class="${p}-loc-sub">
                  <span style="width:18px;height:18px;background-image:url('${chassisIcon}');background-size:contain;background-repeat:no-repeat;display:inline-block;" aria-hidden="true"></span>
                  <span>Chassis</span>
                </div>
                <div class="${p}-chassis-num tabular-nums">SF-26</div>
              </div>

              <div class="${p}-car-stage" role="img" aria-label="Scuderia Ferrari SF-26 Formula 1 Car"></div>

              <div class="${p}-driver-pair">
                <div class="${p}-driver-card" data-driver-pick="Charles Leclerc" data-driver-num="16" data-lap="1:25.814">
                  <div class="${p}-driver-card-top">
                    <span>Charles Leclerc</span>
                  </div>
                  <div class="${p}-mini-bars" style="background-image:url('${leclercStats}');" aria-hidden="true"></div>
                  <div class="${p}-car-num tabular-nums">16</div>
                </div>
                <div class="${p}-driver-card is-selected" data-driver-pick="Lewis Hamilton" data-driver-num="44" data-lap="1:25.492">
                  <div class="${p}-driver-card-top">
                    <span>Lewis Hamilton</span>
                  </div>
                  <div class="${p}-mini-bars" style="background-image:url('${hamiltonStats}');" aria-hidden="true"></div>
                  <div class="${p}-car-num tabular-nums">44</div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="telemetry" class="${p}-section" aria-label="SF-26 Live Telemetry Workbench">
      <div class="${p}-workbench">
        <div class="${p}-wb-head">
          <div>
            <div style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);letter-spacing:0.14em;text-transform:uppercase;">SILVERSTONE PIT WALL • SF-26 TELEMETRY</div>
            <h2 style="font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;letter-spacing:-0.04em;margin-top:6px;">
              Tire Compound &amp; Sector Delta Simulator
            </h2>
          </div>
          <div class="${p}-tire-tabs" role="tablist" aria-label="Pirelli Tire Compounds">
            <button type="button" class="${p}-tire-btn is-active" data-compound="Soft C5" data-pace="1:25.492" data-top="342 km/h" data-deg="+0.08s / lap">Soft C5 (Quali)</button>
            <button type="button" class="${p}-tire-btn" data-compound="Medium C4" data-pace="1:26.110" data-top="339 km/h" data-deg="+0.04s / lap">Medium C4 (Stint 1)</button>
            <button type="button" class="${p}-tire-btn" data-compound="Hard C3" data-pace="1:26.680" data-top="337 km/h" data-deg="+0.02s / lap">Hard C3 (Endurance)</button>
          </div>
        </div>

        <div class="${p}-telemetry-grid">
          <article class="${p}-stat-card">
            <div style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;">Selected Driver &amp; Chassis</div>
            <div id="wbDriverLabel" style="font-size:26px;font-weight:700;margin-top:8px;">#44 Lewis Hamilton</div>
            <div style="font-size:13px;color:var(--accent-text);margin-top:6px;">Scuderia Ferrari SF-26 • Silverstone GP</div>
          </article>
          <article class="${p}-stat-card">
            <div style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;">Projected Qualifying Lap</div>
            <div id="wbPaceVal" class="tabular-nums" style="font-size:28px;font-weight:700;color:var(--accent);margin-top:8px;">1:25.492</div>
            <div id="wbCompoundLabel" style="font-size:13px;color:var(--muted);margin-top:6px;">Compound: Soft C5 • Peak Grip</div>
          </article>
          <article class="${p}-stat-card">
            <div style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;"> Wellington Straight Trap / Deg</div>
            <div id="wbTopSpeed" class="tabular-nums" style="font-size:28px;font-weight:700;margin-top:8px;">342 km/h</div>
            <div id="wbDegVal" class="tabular-nums" style="font-size:13px;color:var(--accent-text);margin-top:6px;">Thermal Degradation: +0.08s / lap</div>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <span>F1 Racing Hub — Silverstone Circuit &amp; Scuderia Ferrari SF-26</span>
    <span class="tabular-nums">Season Points: 227 • 374 • 4987 Career</span>
  </footer>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--accent-text);font-weight:600;">F1 PADDOCK TELEMETRY</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-pill">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;font-weight:700;margin-bottom:10px;">Unlock Live Pit Wall Feed</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Stream live Silverstone sector splits, onboard SF-26 ERS deployment, and career telemetry for #44 Lewis Hamilton and #16 Charles Leclerc.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-gold" style="width:100%;padding:13px;">Activate F1 Hub Access →</button>
    </div>
  </div>

  <script>
    (function () {
      function animateCounters() {
        var els = document.querySelectorAll('[data-f1-count]');
        els.forEach(function (el, idx) {
          var target = parseInt(el.getAttribute('data-f1-count') || '0', 10);
          var start = performance.now() + idx * 160;
          var dur = 1600;
          function tick(now) {
            if (now < start) {
              requestAnimationFrame(tick);
              return;
            }
            var t = Math.min(1, (now - start) / dur);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }
      animateCounters();

      var recountBtn = document.getElementById('recountStatsBtn');
      if (recountBtn) recountBtn.addEventListener('click', animateCounters);

      document.querySelectorAll('[data-phone-menu]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-phone-menu');
          var menu = id ? document.getElementById(id) : null;
          if (menu) menu.classList.toggle('is-open');
        });
      });
      document.querySelectorAll('[data-menu-close]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-menu-close');
          var menu = id ? document.getElementById(id) : null;
          if (menu) menu.classList.remove('is-open');
        });
      });

      var driverCards = document.querySelectorAll('[data-driver-pick]');
      var wbDriver = document.getElementById('wbDriverLabel');
      var wbPace = document.getElementById('wbPaceVal');
      driverCards.forEach(function (card) {
        card.addEventListener('click', function () {
          driverCards.forEach(function (c) { c.classList.remove('is-selected'); });
          card.classList.add('is-selected');
          var name = card.getAttribute('data-driver-pick') || 'Lewis Hamilton';
          var num = card.getAttribute('data-driver-num') || '44';
          var lap = card.getAttribute('data-lap') || '1:25.492';
          if (wbDriver) wbDriver.textContent = '#' + num + ' ' + name;
          if (wbPace) wbPace.textContent = lap;
        });
      });

      var tireBtns = document.querySelectorAll('[data-compound]');
      var wbCompound = document.getElementById('wbCompoundLabel');
      var wbTop = document.getElementById('wbTopSpeed');
      var wbDeg = document.getElementById('wbDegVal');
      tireBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          tireBtns.forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          if (wbPace) wbPace.textContent = btn.getAttribute('data-pace') || '1:25.492';
          if (wbCompound) wbCompound.textContent = 'Compound: ' + (btn.getAttribute('data-compound') || 'Soft C5');
          if (wbTop) wbTop.textContent = btn.getAttribute('data-top') || '342 km/h';
          if (wbDeg) wbDeg.textContent = 'Thermal Degradation: ' + (btn.getAttribute('data-deg') || '+0.08s / lap');
        });
      });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 27. AI WORKFLOW HERO (ai-workflow-hero — Premium Tier)
  // LinkFlow™ & FluxEngine™ — "Close the rift linking signals and action"
  // CloudFront Boomerang Video + Sage/Forest Green Editorial Palette
  // ============================================================================
  if (slug === 'ai-workflow-hero') {
    const bgVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';
    const posterImg = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260721_114043_a70b6aa4-73d7-4b38-9595-baa6a5bad2d3.png&w=1280&q=85';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>LinkFlow™ — Close the Rift Linking Signals and Action</title>
  <meta name="description" content="Shape scattered signals into meaningful outcomes via AI-driven workflows with LinkFlow and FluxEngine.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #eef3ec;
      --surface: #e3ece0;
      --surface-elevated: #ffffff;
      --fg: #1f2a1d;
      --muted: #3d5039;
      --border: rgba(31, 42, 29, 0.16);
      --accent: #1f2a1d;
      --accent-text: #274d33;
      --accent-soft: #85ab8b;
      --on-accent: #ffffff;
      --font-display: 'Plus Jakarta Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      --font-sans: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 28px;
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
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); outline-offset: 3px; }
    a:focus-visible, button:focus-visible {
      outline: 2px solid var(--accent-text);
      outline-offset: 3px;
    }
    button, [role="button"] {
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out), background-color 0.22s var(--ease-out), border-color 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: scale(0.97) translateY(1px);
    }
    .tabular-nums { font-variant-numeric: tabular-nums; }

    .${p}-hero {
      position: relative; width: 100%; min-height: 100vh; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 24px clamp(20px, 4vw, 44px) 36px;
    }
    .${p}-video-wrap {
      position: absolute; inset: 0; z-index: 0; overflow: hidden;
    }
    .${p}-video-wrap video, .${p}-video-wrap canvas {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }

    .${p}-nav {
      position: relative; z-index: 30;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-brand {
      font-family: var(--font-display); font-size: clamp(18px, 2vw, 24px);
      font-weight: 600; letter-spacing: -0.03em; color: #2d3a2a; text-decoration: none;
    }
    .${p}-brand sup { font-size: 11px; font-weight: 500; margin-left: 2px; }

    .${p}-pill-nav {
      display: flex; align-items: center; gap: 4px;
      background: rgba(255, 255, 255, 0.76);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.65);
      border-radius: 999px;
      padding: 4px 4px 4px 20px;
      box-shadow: 0 4px 20px rgba(31, 42, 29, 0.06);
      list-style: none;
    }
    .${p}-pill-nav a {
      text-decoration: none; font-size: 14px; font-weight: 500;
      color: #4b5b47; padding: 8px 12px; border-radius: 999px;
    }
    .${p}-pill-nav a.is-active, .${p}-pill-nav a:hover {
      color: #1f2a1d; font-weight: 600;
    }
    .${p}-btn-dark {
      background: #1f2a1d; color: #ffffff; border: 0; border-radius: 999px;
      padding: 10px 20px; font-size: 13.5px; font-weight: 500; cursor: pointer;
      margin-left: 8px;
    }
    .${p}-btn-dark:hover { background: #2a3827; }

    .${p}-auth-links {
      display: flex; align-items: center; gap: 20px; color: #2d3a2a;
    }
    .${p}-auth-link {
      display: inline-flex; align-items: center; gap: 7px;
      color: #2d3a2a; text-decoration: none; font-size: 14px; font-weight: 500;
      background: none; border: 0; cursor: pointer;
    }

    .${p}-hero-copy {
      position: relative; z-index: 10;
      display: flex; flex-direction: column; align-items: center; text-align: center;
      padding-top: clamp(36px, 6vh, 72px); margin-bottom: auto;
    }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 5.4vw, 5.25rem);
      font-weight: 400; line-height: 0.95; letter-spacing: -0.035em;
      color: #336443; max-width: 980px;
    }
    .${p}-h1-accent { color: #85AB8B; }
    .${p}-subtitle {
      margin-top: 26px; color: #4b5b47;
      font-size: clamp(15px, 1.25vw, 18px); line-height: 1.6;
      max-width: 440px;
    }

    .${p}-hero-bottom {
      position: relative; z-index: 10;
      display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
      flex-wrap: wrap; margin-top: 48px;
    }
    .${p}-flux-card {
      max-width: 360px;
      background: rgba(31, 42, 29, 0.42);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 22px; padding: 20px 22px; color: #ffffff;
    }
    .${p}-flux-tag {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 14px; font-weight: 600; color: #ffffff; margin-bottom: 10px;
    }
    .${p}-flux-desc {
      font-size: 12.5px; line-height: 1.6; color: rgba(255, 255, 255, 0.88);
      margin-bottom: 18px;
    }
    .${p}-flux-actions { display: flex; align-items: center; gap: 16px; }
    .${p}-btn-white {
      background: #ffffff; color: #1f2a1d; border: 0; border-radius: 999px;
      padding: 11px 22px; font-size: 13.5px; font-weight: 600; cursor: pointer;
    }
    .${p}-btn-text {
      background: none; border: 0; color: #ffffff;
      font-size: 13.5px; font-weight: 500; cursor: pointer;
    }

    .${p}-how-pill {
      display: inline-flex; align-items: center; gap: 10px;
      background: rgba(31, 42, 29, 0.48);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 999px; padding: 8px 16px 8px 10px;
      color: #ffffff; font-size: 13.5px; cursor: pointer;
    }
    .${p}-play-circle {
      width: 26px; height: 26px; border-radius: 50%;
      background: rgba(255, 255, 255, 0.24);
      display: inline-flex; align-items: center; justify-content: center;
    }

    .${p}-section {
      max-width: 1220px; margin: 0 auto; padding: 80px clamp(20px, 4vw, 44px);
    }
    .${p}-sim-box {
      background: var(--surface-elevated); border: 1px solid var(--border);
      border-radius: 28px; padding: clamp(24px, 3.5vw, 42px);
      box-shadow: 0 20px 50px rgba(31, 42, 29, 0.06);
    }
    .${p}-signal-pills { display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0 28px; }
    .${p}-sig-btn {
      padding: 10px 18px; border-radius: 999px; border: 1px solid var(--border);
      background: var(--bg); color: var(--fg); font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .${p}-sig-btn.is-active {
      background: var(--fg); color: var(--on-accent); border-color: var(--fg);
    }
    .${p}-grid-3 {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    }
    .${p}-card {
      background: var(--bg); border: 1px solid var(--border);
      border-radius: 20px; padding: 24px;
    }
    .${p}-footer {
      border-top: 1px solid var(--border); padding: 36px clamp(20px, 4vw, 44px);
      max-width: 1220px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
      color: var(--muted); font-size: 13.5px;
    }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 500;
      display: flex; align-items: center; justify-content: center;
      background: rgba(31, 42, 29, 0.55); padding: 20px;
      opacity: 0; pointer-events: none; transition: opacity 0.25s var(--ease-out);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 440px; background: #ffffff;
      border: 1px solid var(--border); border-radius: 24px; padding: 28px;
    }

    @media (max-width: 900px) {
      .${p}-grid-3 { grid-template-columns: 1fr; }
      .${p}-pill-nav { display: none; }
    }
    @media (max-width: 600px) {
      .${p}-auth-links .${p}-hide-sm { display: none; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <main id="main-content">
    <section class="${p}-hero" aria-label="LinkFlow AI Workflow Hero">
      <div class="${p}-video-wrap" aria-hidden="true">
        <video id="boomerangVideo" autoplay muted loop playsinline crossorigin="anonymous" poster="${posterImg}">
          <source src="${bgVideo}" type="video/mp4">
        </video>
        <canvas id="boomerangCanvas" style="display:none;"></canvas>
      </div>

      <header class="${p}-nav">
        <a href="#main-content" class="${p}-brand">LinkFlow<sup>TM</sup></a>

        <nav aria-label="Primary Navigation">
          <ul class="${p}-pill-nav">
            <li><a href="#mission" class="is-active">Purpose</a></li>
            <li><a href="#how">The Process</a></li>
            <li><a href="#pricing">Tariffs</a></li>
            <li>
              <button type="button" id="exploreMagneticBtn" class="${p}-btn-dark">Try it Live</button>
            </li>
          </ul>
        </nav>

        <div class="${p}-auth-links">
          <button type="button" class="${p}-auth-link ${p}-hide-sm" data-seamless-trigger="LinkFlow Workspace Sign Up">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            <span>Sign Me Up!</span>
          </button>
          <button type="button" class="${p}-auth-link ${p}-hide-sm" data-seamless-trigger="Enter LinkFlow Console">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <span>Enter</span>
          </button>
          <button type="button" id="motionToggleBtn" aria-pressed="false" class="${p}-auth-link" style="padding:7px 14px;border-radius:999px;background:rgba(255,255,255,0.75);border:1px solid var(--border);font-size:12px;font-weight:600;">
            Motion: ON
          </button>
        </div>
      </header>

      <div class="${p}-hero-copy">
        <h1 class="${p}-h1">
          Close the rift
          <span class="${p}-h1-accent">linking<br>signals and action</span>
        </h1>
        <p class="${p}-subtitle">
          Shape scattered signals into meaningful outcomes via AI-driven workflows.
        </p>
      </div>

      <div class="${p}-hero-bottom">
        <div class="${p}-flux-card">
          <div class="${p}-flux-tag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z"/>
            </svg>
            <span>FluxEngine<sup style="font-size:10px;">TM</sup></span>
          </div>
          <p class="${p}-flux-desc">
            LinkFlow smoothly unites your company systems, streamlining data paths between services without having to write custom scripts.
          </p>
          <div class="${p}-flux-actions">
            <button type="button" class="${p}-btn-white" data-seamless-trigger="Launch FluxEngine Live Sandbox">Try it Live</button>
            <button type="button" class="${p}-btn-text" data-next-preview="true" id="cycleSignalBtn">Know More.</button>
          </div>
        </div>

        <button type="button" class="${p}-how-pill" data-seamless-trigger="How We Build LinkFlow (1:35 Architecture Film)">
          <span class="${p}-play-circle" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
              <polygon points="6 4 20 12 6 20 6 4"/>
            </svg>
          </span>
          <span style="font-weight:500;">How we build?</span>
          <span class="tabular-nums" style="opacity:0.72;">1:35</span>
        </button>
      </div>
    </section>

    <section id="mission" class="${p}-section" aria-label="FluxEngine Signal-to-Action Pipeline Simulator">
      <div class="${p}-sim-box">
        <div style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);letter-spacing:0.12em;text-transform:uppercase;">PURPOSE &amp; THE PROCESS • FLUXENGINE™</div>
        <h2 style="font-family:var(--font-display);font-size:clamp(1.75rem,3vw,2.6rem);font-weight:600;letter-spacing:-0.03em;margin-top:8px;">
          Interactive Signal-to-Action Routing Bench
        </h2>

        <div class="${p}-signal-pills" role="tablist" aria-label="Signal Sources">
          <button type="button" class="${p}-sig-btn is-active" data-sig-title="CRM Lead Intent Spike" data-sig-route="HubSpot Webhook → FluxEngine Classifier → Slack Deal Desk + Automated Outbound" data-sig-lat="42 ms" data-sig-saved="18.5 hrs/wk">01 • CRM Intent Signal</button>
          <button type="button" class="${p}-sig-btn" data-sig-title="Billing Anomaly &amp; Churn Risk" data-sig-route="Stripe Metering → FluxEngine Risk Scorer → CS Playbook + Account Credit Trigger" data-sig-lat="38 ms" data-sig-saved="24.0 hrs/wk">02 • Stripe Telemetry</button>
          <button type="button" class="${p}-sig-btn" data-sig-title="Production Incident Triage" data-sig-route="Sentry Alert → FluxEngine Root-Cause Graph → Linear Issue + On-Call Patch Draft" data-sig-lat="51 ms" data-sig-saved="31.2 hrs/wk">03 • Incident Signal</button>
        </div>

        <div id="how" class="${p}-grid-3">
          <article class="${p}-card">
            <div style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;">Active Signal Stream</div>
            <h3 id="sigTitleOut" style="font-size:20px;font-weight:700;margin-top:8px;">CRM Lead Intent Spike</h3>
            <p id="sigRouteOut" style="font-size:13.5px;color:var(--muted);line-height:1.55;margin-top:8px;">
              HubSpot Webhook → FluxEngine Classifier → Slack Deal Desk + Automated Outbound
            </p>
          </article>
          <article class="${p}-card">
            <div style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;">Dispatch Latency</div>
            <div id="sigLatOut" class="tabular-nums" style="font-size:32px;font-weight:700;color:var(--accent-text);margin-top:8px;">42 ms</div>
            <p style="font-size:13px;color:var(--muted);margin-top:6px;">Zero custom glue scripts required</p>
          </article>
          <article id="pricing" class="${p}-card">
            <div style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;">Engineering Time Saved</div>
            <div id="sigSavedOut" class="tabular-nums" style="font-size:32px;font-weight:700;margin-top:8px;">18.5 hrs/wk</div>
            <p style="font-size:13px;color:var(--accent-text);margin-top:6px;">Tariffs: Starter $49 • Growth $149 • Enterprise</p>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <span>LinkFlow™ &amp; FluxEngine™ — AI-Driven Workflow Orchestration</span>
    <span class="tabular-nums">Purpose • The Process • Tariffs</span>
  </footer>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--accent-text);font-weight:600;">LINKFLOW™ WORKSPACE</span>
        <button type="button" id="closeSeamlessBtn" style="background:var(--bg);border:1px solid var(--border);width:32px;height:32px;border-radius:50%;cursor:pointer;">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:24px;font-weight:700;margin-bottom:10px;">Try FluxEngine™ Live</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Unite your company systems and streamline data paths between services without writing custom scripts.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-dark" style="width:100%;margin:0;padding:13px;">Create Free LinkFlow Account →</button>
    </div>
  </div>

  <script>
    (function () {
      var btns = Array.prototype.slice.call(document.querySelectorAll('[data-sig-title]'));
      var titleOut = document.getElementById('sigTitleOut');
      var routeOut = document.getElementById('sigRouteOut');
      var latOut = document.getElementById('sigLatOut');
      var savedOut = document.getElementById('sigSavedOut');
      var idx = 0;

      function activateSig(btn) {
        btns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (titleOut) titleOut.textContent = btn.getAttribute('data-sig-title') || '';
        if (routeOut) routeOut.textContent = btn.getAttribute('data-sig-route') || '';
        if (latOut) latOut.textContent = btn.getAttribute('data-sig-lat') || '';
        if (savedOut) savedOut.textContent = btn.getAttribute('data-sig-saved') || '';
      }
      btns.forEach(function (btn, i) {
        btn.addEventListener('click', function () {
          idx = i;
          activateSig(btn);
        });
      });
      var cycleBtn = document.getElementById('cycleSignalBtn');
      if (cycleBtn && btns.length) {
        cycleBtn.addEventListener('click', function () {
          idx = (idx + 1) % btns.length;
          activateSig(btns[idx]);
        });
      }
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 28. CYBERPUNK REVEAL (cyberpunk-reveal — Premium Tier)
  // "Gateway to your augmented self — A window of coming enhancements"
  // Dual-Layer Portrait Reveal + Concentric Fading Circular Arcs + JetBrains Mono
  // ============================================================================
  if (slug === 'cyberpunk-reveal') {
    const bgImage1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_125121_afb71ce9-9c64-4c54-90b5-c89c0764c052.png&w=1920&q=85';
    const bgImage2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_135737_0da59642-725b-451a-997b-b0283d95a42a.png&w=1280&q=85';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Cyberpunk Reveal — Gateway to Your Augmented Self</title>
  <meta name="description" content="A future where carbon fiber, titanium, and human instinct align. Interactive dual-layer biotech augmentation reveal and concentric telemetry arcs.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0c0709;
      --surface: #170d11;
      --surface-elevated: #231319;
      --fg: #ffffff;
      --muted: #e2c7ce;
      --border: rgba(255, 255, 255, 0.18);
      --accent: #ffffff;
      --accent-text: #ff8a9e;
      --accent-crimson: #e11d48;
      --on-accent: #111827;
      --font-display: 'JetBrains Mono', monospace;
      --font-sans: 'JetBrains Mono', monospace;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 24px;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
      --reveal-x: 54%;
      --reveal-y: 44%;
      --reveal-r: 250px;
    }
    *, *::before, *::after {
      box-sizing: border-box; margin: 0; padding: 0;
      font-family: 'JetBrains Mono', monospace;
    }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: var(--bg);
      color: var(--fg);
      letter-spacing: -0.02em;
      overflow-x: clip;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px;
      background: var(--accent); color: var(--on-accent);
      font-weight: 700; font-size: 12px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--accent-text); outline-offset: 3px; }
    a:focus-visible, button:focus-visible, input:focus-visible {
      outline: 2px solid var(--accent-text);
      outline-offset: 3px;
    }
    button, [role="button"] {
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out), background-color 0.22s var(--ease-out), border-color 0.22s var(--ease-out);
    }
    button:active, [role="button"]:active {
      transform: scale(0.96) translateY(1px);
    }
    .tabular-nums { font-variant-numeric: tabular-nums; }

    @keyframes kenBurns {
      from { transform: scale(1.12); }
      to { transform: scale(1); }
    }
    @keyframes heroRise {
      from { opacity: 0; transform: translateY(26px); filter: blur(8px); }
      to { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    @keyframes navDrop {
      from { opacity: 0; transform: translateY(-18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseRing {
      0%, 100% { transform: scale(1); opacity: 0.38; }
      50% { transform: scale(1.42); opacity: 0.08; }
    }

    .${p}-header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 60;
      display: flex; align-items: center; justify-content: center;
      padding: 16px 20px;
      animation: navDrop 0.8s var(--ease-out) 0.1s both;
    }
    .${p}-nav-pill {
      background: rgba(0, 0, 0, 0.62);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      padding: 8px 8px 8px 14px;
      display: flex; align-items: center; gap: 4px;
    }
    .${p}-nav-links {
      display: flex; align-items: center; gap: 4px; list-style: none;
    }
    .${p}-nav-links a {
      color: #d1d5db; text-decoration: none; font-size: 13px; font-weight: 500;
      padding: 6px 12px; border-radius: 999px;
    }
    .${p}-nav-links a.is-active, .${p}-nav-links a:hover {
      color: #ffffff; background: rgba(255, 255, 255, 0.1);
    }
    .${p}-btn-connect {
      background: #ffffff; color: #111827; border: 0; border-radius: 999px;
      padding: 7px 18px; font-size: 13px; font-weight: 600; cursor: pointer; margin-left: 4px;
    }
    .${p}-btn-motion {
      background: rgba(255, 255, 255, 0.1); color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 999px;
      padding: 6px 12px; font-size: 11.5px; font-weight: 600; cursor: pointer; margin-left: 4px;
    }

    .${p}-hero {
      position: relative; width: 100%; height: 100dvh; min-height: 680px; overflow: hidden;
      background: #1a080c;
    }
    .${p}-grid-svg {
      position: absolute; inset: 0; width: 100%; height: 100%; z-index: 5;
      opacity: 0.12; pointer-events: none;
    }
    .${p}-base-img {
      position: absolute; inset: 0; z-index: 10;
      background-image: url('${bgImage1}');
      background-size: cover; background-position: center;
      animation: kenBurns 2.4s var(--ease-out) forwards;
    }
    .${p}-reveal-img {
      position: absolute; inset: 0; z-index: 25;
      background-image: url('${bgImage2}');
      background-size: cover; background-position: center;
      mask-image: radial-gradient(circle var(--reveal-r) at var(--reveal-x) var(--reveal-y), rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0) 100%);
      -webkit-mask-image: radial-gradient(circle var(--reveal-r) at var(--reveal-x) var(--reveal-y), rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0) 100%);
    }
    .${p}-scrim {
      position: absolute; inset: 0; z-index: 30;
      background: linear-gradient(90deg, rgba(12, 7, 9, 0.72) 0%, rgba(12, 7, 9, 0.18) 52%, rgba(12, 7, 9, 0.64) 100%);
      pointer-events: none;
    }

    .${p}-arcs-wrap {
      position: absolute; top: 0; bottom: 0; right: 0; z-index: 45;
      pointer-events: none; display: flex; align-items: center;
    }
    .${p}-arcs-svg {
      height: 100%; width: auto; max-height: 760px;
    }
    .${p}-arc-ring {
      transform-box: fill-box; transform-origin: center;
      animation: pulseRing 2.8s ease-in-out infinite;
    }

    .${p}-hero-copy {
      position: absolute; left: clamp(20px, 4vw, 48px); bottom: clamp(44px, 8vh, 88px);
      z-index: 50; max-width: 470px;
    }
    .${p}-eyebrow {
      font-size: 12px; font-weight: 600; letter-spacing: 0.12em;
      color: rgba(255, 255, 255, 0.92); margin-bottom: 14px;
      animation: heroRise 0.95s var(--ease-out) 0.15s both;
    }
    .${p}-h1 {
      font-size: clamp(2.3rem, 4.4vw, 3.75rem);
      font-weight: 700; line-height: 1.05; letter-spacing: -0.07em;
      color: #ffffff; margin-bottom: 18px;
      animation: heroRise 0.95s var(--ease-out) 0.3s both;
    }
    .${p}-desc {
      font-size: clamp(13.5px, 1.05vw, 15.5px); line-height: 1.65;
      color: rgba(255, 255, 255, 0.9); margin-bottom: 26px;
      animation: heroRise 0.95s var(--ease-out) 0.5s both;
    }
    .${p}-cta-row {
      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
      animation: heroRise 0.95s var(--ease-out) 0.7s both;
    }
    .${p}-btn-reserve {
      position: relative; overflow: hidden;
      background: #ffffff; color: #111827; border: 0; border-radius: 999px;
      padding: 13px 30px; font-size: 13.5px; font-weight: 700; cursor: pointer;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
    }
    .${p}-btn-scan {
      background: rgba(0, 0, 0, 0.6); color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.28); border-radius: 999px;
      padding: 12px 20px; font-size: 12.5px; font-weight: 600; cursor: pointer;
    }

    .${p}-section {
      max-width: 1220px; margin: 0 auto; padding: 76px clamp(20px, 4vw, 48px);
    }
    .${p}-workbench {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 26px; padding: clamp(24px, 3.5vw, 40px);
    }
    .${p}-module-tabs { display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0 26px; }
    .${p}-mod-btn {
      padding: 10px 18px; border-radius: 999px; border: 1px solid var(--border);
      background: var(--surface-elevated); color: var(--fg);
      font-size: 12.5px; font-weight: 600; cursor: pointer;
    }
    .${p}-mod-btn.is-active {
      background: #ffffff; color: #111827; border-color: #ffffff;
    }
    .${p}-grid-3 {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
    }
    .${p}-card {
      background: var(--surface-elevated); border: 1px solid var(--border);
      border-radius: 18px; padding: 22px;
    }
    .${p}-footer {
      border-top: 1px solid var(--border); padding: 34px clamp(20px, 4vw, 48px);
      max-width: 1220px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;
      color: var(--muted); font-size: 12.5px;
    }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 500;
      display: flex; align-items: center; justify-content: center;
      background: rgba(12, 7, 9, 0.78); padding: 20px;
      opacity: 0; pointer-events: none; transition: opacity 0.25s var(--ease-out);
    }
    .${p}-modal.is-open { opacity: 1; pointer-events: auto; }
    .${p}-modal-box {
      width: 100%; max-width: 440px; background: var(--surface);
      border: 1px solid var(--border); border-radius: 22px; padding: 28px;
    }

    @media (max-width: 900px) {
      .${p}-grid-3 { grid-template-columns: 1fr; }
      .${p}-nav-links { display: none; }
    }
    @media (max-width: 640px) {
      .${p}-arcs-wrap { opacity: 0.35; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="${p}-header">
    <nav class="${p}-nav-pill" aria-label="Primary Biotech Navigation">
      <a href="#main-content" aria-label="Cyberpunk Reveal Home" style="display:inline-flex;align-items:center;padding-right:8px;">
        <svg width="22" height="22" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
          <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z"/>
        </svg>
      </a>
      <ul class="${p}-nav-links">
        <li><a href="#module" class="is-active">Module</a></li>
        <li><a href="#records">Case Records</a></li>
        <li><a href="#biotech">Biotech</a></li>
        <li><a href="#tiers">Tiers</a></li>
        <li><a href="#module">Live Demo</a></li>
      </ul>
      <button type="button" class="${p}-btn-connect" data-seamless-trigger="Connect Neural Interface">Connect</button>
      <button type="button" id="motionToggleBtn" aria-pressed="false" class="${p}-btn-motion">Motion: ON</button>
    </nav>
  </header>

  <main id="main-content">
    <section class="${p}-hero" id="heroStage" aria-label="Augmented Self Cyberpunk Reveal Hero">
      <svg class="${p}-grid-svg" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="cyberGridPattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" stroke-width="0.6"/>
          </pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#cyberGridPattern)"/>
      </svg>

      <div class="${p}-base-img" role="img" aria-label="Base crimson cyberpunk subject portrait"></div>
      <div class="${p}-reveal-img" id="revealLayer" role="img" aria-label="Augmented titanium endoskeleton reveal layer"></div>
      <div class="${p}-scrim" aria-hidden="true"></div>

      <!-- Concentric Fading Circular Arcs with Stats -->
      <div class="${p}-arcs-wrap" aria-hidden="true">
        <svg class="${p}-arcs-svg" viewBox="0 0 380 700" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="arcGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
              <stop offset="25%" stop-color="#ffffff" stop-opacity="0.55"/>
              <stop offset="70%" stop-color="#ffffff" stop-opacity="0.45"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <!-- Arc 1: r=330 -->
          <path d="M 119 62 A 330 330 0 0 1 207 391" fill="none" stroke="url(#arcGrad1)" stroke-width="1.2"/>
          <circle cx="119" cy="62" r="3.5" fill="#ffffff"/>
          <circle class="${p}-arc-ring" cx="119" cy="62" r="7.5" fill="none" stroke="#ffffff" stroke-width="1"/>
          <text x="136" y="66" fill="#ffffff" font-size="30" font-weight="700" class="tabular-nums">10<tspan dy="-10" font-size="18">+</tspan></text>
          <text x="138" y="84" fill="rgba(255,255,255,0.82)" font-size="8.5" font-weight="600" letter-spacing="2">YEARS REAL</text>

          <!-- Arc 2: r=395 -->
          <path d="M 111 10 A 395 395 0 0 1 285 314" fill="none" stroke="url(#arcGrad1)" stroke-width="1.2"/>
          <circle cx="284" cy="314" r="3.5" fill="#ffffff"/>
          <circle class="${p}-arc-ring" cx="284" cy="314" r="7.5" fill="none" stroke="#ffffff" stroke-width="1"/>
          <text x="300" y="318" fill="#ffffff" font-size="30" font-weight="700" class="tabular-nums">40<tspan dy="-10" font-size="18">+</tspan></text>
          <text x="302" y="336" fill="rgba(255,255,255,0.82)" font-size="8.5" font-weight="600" letter-spacing="2">USE FORMS</text>

          <!-- Arc 3: r=460 -->
          <path d="M 236 189 A 460 460 0 0 1 228 612" fill="none" stroke="url(#arcGrad1)" stroke-width="1.2"/>
          <circle cx="221" cy="620" r="3.5" fill="#ffffff"/>
          <circle class="${p}-arc-ring" cx="221" cy="620" r="7.5" fill="none" stroke="#ffffff" stroke-width="1"/>
          <text x="238" y="624" fill="#ffffff" font-size="30" font-weight="700" class="tabular-nums">95<tspan dy="-10" font-size="18">%</tspan></text>
          <text x="240" y="642" fill="rgba(255,255,255,0.82)" font-size="8.5" font-weight="600" letter-spacing="2">REPEAT MEMBERS</text>
        </svg>
      </div>

      <div class="${p}-hero-copy">
        <div class="${p}-eyebrow">Gateway to your <em>augmented self</em></div>
        <h1 class="${p}-h1">
          A window<br>of coming<br>enhancements
        </h1>
        <p class="${p}-desc">
          A future where carbon fiber, titanium, and human instinct align. Not machine. Not human. Something wonderfully poised between.
        </p>
        <div class="${p}-cta-row">
          <button type="button" id="exploreMagneticBtn" class="${p}-btn-reserve">Reserve Now</button>
          <button type="button" data-next-preview="true" id="scanPulseBtn" class="${p}-btn-scan">
            Scan Layer: <span id="scanLayerName">Optical X-Ray</span>
          </button>
        </div>
      </div>
    </section>

    <section id="module" class="${p}-section" aria-label="Biotech Augmentation Calibration Workbench">
      <div class="${p}-workbench">
        <div style="font-size:11.5px;color:var(--accent-text);letter-spacing:0.14em;text-transform:uppercase;">BIOTECH &amp; CASE RECORDS • AUGMENTATION SPEC</div>
        <h2 style="font-size:clamp(1.6rem,2.8vw,2.35rem);font-weight:700;letter-spacing:-0.05em;margin-top:8px;">
          Interactive Sub-Dermal Reveal &amp; Module Selector
        </h2>

        <div class="${p}-module-tabs" role="tablist" aria-label="Augmentation Modules">
          <button type="button" class="${p}-mod-btn is-active" data-mod-name="Optical X-Ray" data-mod-x="54%" data-mod-y="38%" data-mod-r="260px" data-mod-spec="Carbon-Titanium Cranial Weave • 0.14 ms Synaptic Bridge">Module 01 • Cranial Weave</button>
          <button type="button" class="${p}-mod-btn" data-mod-name="Ocular Telemetry" data-mod-x="48%" data-mod-y="30%" data-mod-r="310px" data-mod-spec="Multi-Spectrum Retinal HUD • 120 Hz Low-Light Array">Module 02 • Ocular HUD</button>
          <button type="button" class="${p}-mod-btn" data-mod-name="Full Exoskeleton" data-mod-x="50%" data-mod-y="50%" data-mod-r="480px" data-mod-spec="Sub-Dermal Myomer Mesh • 95% Repeat Member Biocompatibility">Module 03 • Full Reveal</button>
        </div>

        <div id="records" class="${p}-grid-3">
          <article class="${p}-card" id="biotech">
            <div style="font-size:11px;color:var(--muted);letter-spacing:0.1em;">ACTIVE MODULE</div>
            <h3 id="modTitleOut" style="font-size:19px;font-weight:700;margin-top:8px;">Optical X-Ray</h3>
            <p id="modSpecOut" style="font-size:13px;color:var(--muted);line-height:1.6;margin-top:8px;">
              Carbon-Titanium Cranial Weave • 0.14 ms Synaptic Bridge
            </p>
          </article>
          <article class="${p}-card">
            <div style="font-size:11px;color:var(--muted);letter-spacing:0.1em;">APERTURE RADIUS</div>
            <div id="modRadiusOut" class="tabular-nums" style="font-size:28px;font-weight:700;color:var(--accent-text);margin-top:8px;">260px</div>
            <p style="font-size:12.5px;color:var(--muted);margin-top:6px;">10+ Years Real • 40+ Use Forms</p>
          </article>
          <article class="${p}-card" id="tiers">
            <div style="font-size:11px;color:var(--muted);letter-spacing:0.1em;">BIOCOMPATIBILITY TIER</div>
            <div class="tabular-nums" style="font-size:28px;font-weight:700;margin-top:8px;">95%</div>
            <p style="font-size:12.5px;color:var(--accent-text);margin-top:6px;">Repeat Members • Grade-V Titanium</p>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <span>Cyberpunk Reveal — Carbon Fiber, Titanium &amp; Human Instinct</span>
    <span class="tabular-nums">10+ Years Real • 40+ Use Forms • 95% Repeat Members</span>
  </footer>

  <div class="${p}-modal" id="seamlessModal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-size:11.5px;color:var(--accent-text);font-weight:600;">AUGMENTATION RESERVATION</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-motion">×</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:22px;font-weight:700;margin-bottom:10px;">Reserve Your Enhancement Slot</h2>
      <p style="font-size:13.5px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Schedule a biometric scan for our next-generation carbon fiber and titanium neural modules.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-connect" style="width:100%;margin:0;padding:13px;">Confirm Biometric Booking →</button>
    </div>
  </div>

  <script>
    (function () {
      var root = document.documentElement;
      var modBtns = Array.prototype.slice.call(document.querySelectorAll('[data-mod-name]'));
      var scanName = document.getElementById('scanLayerName');
      var modTitle = document.getElementById('modTitleOut');
      var modSpec = document.getElementById('modSpecOut');
      var modRad = document.getElementById('modRadiusOut');
      var idx = 0;

      function applyMod(btn) {
        modBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var name = btn.getAttribute('data-mod-name') || 'Optical X-Ray';
        var rx = btn.getAttribute('data-mod-x') || '54%';
        var ry = btn.getAttribute('data-mod-y') || '38%';
        var rr = btn.getAttribute('data-mod-r') || '260px';
        var spec = btn.getAttribute('data-mod-spec') || '';
        root.style.setProperty('--reveal-x', rx);
        root.style.setProperty('--reveal-y', ry);
        root.style.setProperty('--reveal-r', rr);
        if (scanName) scanName.textContent = name;
        if (modTitle) modTitle.textContent = name;
        if (modSpec) modSpec.textContent = spec;
        if (modRad) modRad.textContent = rr;
      }

      modBtns.forEach(function (btn, i) {
        btn.addEventListener('click', function () {
          idx = i;
          applyMod(btn);
        });
      });

      var scanBtn = document.getElementById('scanPulseBtn');
      if (scanBtn && modBtns.length) {
        scanBtn.addEventListener('click', function () {
          idx = (idx + 1) % modBtns.length;
          applyMod(modBtns[idx]);
        });
      }

      // Autonomous gentle spotlight scan during hero entry (finite 8s loop)
      var start = performance.now();
      function autoScan(now) {
        var elapsed = (now - start) / 1000;
        if (elapsed > 8) return;
        if (document.documentElement.getAttribute('data-motion') !== 'paused') {
          var x = 50 + Math.sin(elapsed * 1.4) * 14;
          var y = 42 + Math.cos(elapsed * 1.1) * 10;
          root.style.setProperty('--reveal-x', x.toFixed(1) + '%');
          root.style.setProperty('--reveal-y', y.toFixed(1) + '%');
        }
        requestAnimationFrame(autoScan);
      }
      requestAnimationFrame(autoScan);
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  return null;
}
