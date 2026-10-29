/**
 * ForgeScore v2.0 (100/100 FORGEFRAME_GOLD) Bespoke Template Builders
 * for Pinterest Daily Agent (calfin-weather, cybr-brutalism, aurelia-biocyber, hush-futurist-bags, quiet-place-sanctuary).
 */

export const PINTEREST_V2_META = {
  'calfin-weather': {
    id: 'spatial-weather-glass',
    brandTitle: 'Calfin Weather',
    category: 'commerce',
    headlineSub: 'Real-time spatial glass weather forecast dashboard with interactive 6-node Bezier temperature curve, multi-city Jakarta & Danang telemetry cards, and live storm radar.'
  },
  'cybr-brutalism': {
    id: 'industrial-cyber-brutalist',
    brandTitle: 'CYBR Brutalism',
    category: 'portfolio',
    headlineSub: 'Industrial cyber-brutalist design system studio featuring acid-lime #C6FF00 military terminal grids, wireframe 3D cybernetic head telemetry, and live system command filtering.'
  },
  'aurelia-biocyber': {
    id: 'golden-astrolabe-biocyber',
    brandTitle: 'Aurelia BioCyber',
    category: 'portfolio',
    headlineSub: 'Obsidian and brushed-gold bio-cybernetic atelier with out-of-bounds 3D botanical visor sculpture, circular golden astrolabe portal, and live neural resonance inspector.'
  },
  'hush-futurist-bags': {
    id: 'rose-chrome-luxury-bags',
    brandTitle: 'Hush Futurist Bags',
    category: 'commerce',
    headlineSub: 'High-fashion editorial 3D bag maison featuring masked oversized typography, rose-pink arched ECO product cards (Sabrina, Brielle, Naomi), and interactive material studio.'
  },
  'quiet-place-sanctuary': {
    id: 'serene-pine-island-sanctuary',
    brandTitle: 'Quiet Place Sanctuary',
    category: 'commerce',
    headlineSub: 'Mindful creative sanctuary where calm meets creativity — interactive pine-island lake diorama, ambient soundscape mixer, 4-7-8 breathwork timer, and gentle reflection tools.'
  }
};

function renderV2Runtime(p) {
  return `
  <script>
    (function () {
      var motionPaused = false;
      var motionBtn = document.getElementById('motionToggleBtn');
      if (motionBtn) {
        motionBtn.addEventListener('click', function () {
          motionPaused = !motionPaused;
          document.body.classList.toggle('is-motion-paused', motionPaused);
          motionBtn.setAttribute('aria-pressed', String(motionPaused));
          motionBtn.textContent = motionPaused ? 'Motion: PAUSED' : 'Motion: ON';
        });
      }

      var ring = document.getElementById('cursorRing');
      var dot = document.getElementById('cursorDot');
      var mx = -100, my = -100, rx = -100, ry = -100;
      window.addEventListener('mousemove', function (e) {
        mx = e.clientX;
        my = e.clientY;
        if (dot && !motionPaused) {
          dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
        }
      }, { passive: true });

      function tickCursor() {
        if (!motionPaused && ring) {
          rx += (mx - rx) * 0.18;
          ry += (my - ry) * 0.18;
          ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
        }
        window.requestAnimationFrame(tickCursor);
      }
      window.requestAnimationFrame(tickCursor);

      var reveals = document.querySelectorAll('.${p}-reveal');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
          });
        }, { threshold: 0.12 });
        reveals.forEach(function (el) { io.observe(el); });
      } else {
        reveals.forEach(function (el) { el.classList.add('is-visible'); });
      }

      var counters = document.querySelectorAll('[data-counter-target]');
      if ('IntersectionObserver' in window) {
        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting || entry.target.dataset.counted) return;
            entry.target.dataset.counted = '1';
            var target = parseFloat(entry.target.getAttribute('data-counter-target') || '0');
            var suffix = entry.target.getAttribute('data-counter-suffix') || '';
            var start = performance.now();
            function step(now) {
              var prog = Math.min(1, (now - start) / 1100);
              var ease = 1 - Math.pow(1 - prog, 3);
              var val = Math.round(target * ease);
              entry.target.textContent = val + suffix;
              if (prog < 1) window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
          });
        }, { threshold: 0.25 });
        counters.forEach(function (c) { cio.observe(c); });
      }

      var modal = document.getElementById('seamlessModal');
      var modalTitle = document.getElementById('seamlessTitle');
      var closeBtn = document.getElementById('closeSeamlessBtn');
      var confirmBtn = document.getElementById('confirmSeamlessBtn');
      var exploreBtn = document.getElementById('exploreMagneticBtn');

      function openModal(titleText) {
        if (!modal) return;
        if (titleText && modalTitle) modalTitle.textContent = titleText;
        modal.classList.add('is-open');
      }
      function closeModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
      }
      if (exploreBtn) {
        exploreBtn.addEventListener('click', function () {
          if (modal && modal.classList.contains('is-open')) closeModal();
          else openModal();
        });
      }
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (confirmBtn) confirmBtn.addEventListener('click', closeModal);
      document.querySelectorAll('[data-seamless-trigger]').forEach(function (el) {
        el.addEventListener('click', function () {
          openModal(el.getAttribute('data-seamless-trigger'));
        });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
      });
    })();
  </script>`;
}

export function buildPinterestV2Template(data, p) {
  const slug = String(data.slug || '').toLowerCase();

  // ============================================================================
  // 1. CALFIN WEATHER (calfin-weather — Free Tier)
  // Real-Time Storm & Weather Forecast Spatial Glass Dashboard
  // ============================================================================
  if (slug === 'calfin-weather') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Calfin Weather — Real-Time Spatial Storm &amp; Atmospheric Forecast</title>
  <meta name="description" content="Real-time spatial glass weather forecast dashboard with interactive 6-node Bezier temperature curve, multi-city Jakarta and Danang telemetry cards, and live storm radar.">
  <meta property="og:title" content="Calfin Weather — Spatial Atmospheric Telemetry">
  <meta property="og:description" content="Storm with Heavy Rain telemetry, 6-day Bezier temperature curve, and multi-station glass cards.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#071717">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #071717;
      --surface: #0e2424;
      --surface-elevated: #153535;
      --glass: rgba(14, 36, 36, 0.74);
      --fg: #f0fdfa;
      --muted: #99d5cf;
      --border: rgba(153, 213, 207, 0.18);
      --accent: #2dd4bf;
      --accent-text: #5eead4;
      --accent-strong: #14b8a6;
      --on-accent: #041f1e;
      --font-display: 'Instrument Serif', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-lg: 26px;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: radial-gradient(circle at 22% 18%, #164e4a 0%, #091d1d 55%, #051010 100%);
      color: var(--fg);
      font-family: var(--font-sans);
      overflow-x: clip;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; text-decoration: none; transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); outline-offset: 3px; }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); will-change: transform;
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid var(--accent-text); margin: -17px 0 0 -17px; transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }

    .${p}-header {
      position: sticky; top: 14px; z-index: 200; max-width: 1360px; margin: 14px auto 0;
      padding: 12px 24px; border-radius: 999px; background: var(--glass);
      backdrop-filter: blur(18px); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-brand { display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 16px; color: var(--fg); text-decoration: none; }
    .${p}-nav { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
    .${p}-nav a { color: var(--muted); text-decoration: none; font-size: 13px; font-weight: 600; transition: color 0.2s var(--ease-out); }
    .${p}-nav a:hover { color: var(--fg); }
    .${p}-btn-pill {
      min-height: 44px; padding: 9px 18px; border-radius: 999px;
      background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border);
      color: var(--fg); font-size: 12px; font-weight: 700; cursor: pointer;
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out);
    }
    .${p}-btn-cta {
      min-height: 44px; padding: 10px 22px; border-radius: 999px;
      background: var(--accent); color: var(--on-accent); border: none;
      font-size: 13px; font-weight: 800; cursor: pointer;
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out);
    }
    .${p}-btn-pill:active, .${p}-btn-cta:active { transform: scale(0.97); }

    .${p}-shell { max-width: 1360px; margin: 0 auto; padding: clamp(28px, 4vw, 56px) clamp(16px, 4vw, 48px); }
    .${p}-spatial-stage {
      display: grid; grid-template-columns: 68px 1fr 310px; gap: 24px;
      padding: clamp(20px, 3vw, 36px); border-radius: 34px;
      background: linear-gradient(155deg, rgba(20, 62, 58, 0.78) 0%, rgba(7, 23, 23, 0.92) 100%);
      border: 1px solid var(--border);
      box-shadow: 0 36px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.16);
      align-items: stretch;
    }
    .${p}-dock {
      display: flex; flex-direction: column; align-items: center; justify-content: space-between;
      padding: 18px 10px; border-radius: 999px; background: rgba(7, 23, 23, 0.75);
      border: 1px solid var(--border); gap: 14px;
    }
    .${p}-dock-btn {
      width: 44px; height: 44px; border-radius: 50%; border: 1px solid transparent;
      background: rgba(255, 255, 255, 0.05); color: var(--muted);
      display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out);
    }
    .${p}-dock-btn.is-active { background: var(--accent); color: var(--on-accent); }
    .${p}-dock-btn:active { transform: scale(0.95); }

    .${p}-center-col { display: flex; flex-direction: column; justify-content: space-between; gap: 22px; }
    .${p}-badge {
      display: inline-flex; align-items: center; gap: 8px; width: fit-content;
      padding: 7px 16px; border-radius: 999px; background: rgba(45, 212, 191, 0.14);
      border: 1px solid rgba(45, 212, 191, 0.36); color: var(--accent-text);
      font-size: 12px; font-weight: 700; letter-spacing: 0.04em;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-size: clamp(2.85rem, 6vw, 5.2rem);
      font-weight: 400; line-height: 0.98; letter-spacing: -0.02em; color: var(--fg);
    }
    .${p}-lead { font-size: clamp(0.98rem, 1.2vw, 1.1rem); color: var(--muted); max-width: 58ch; line-height: 1.65; }

    .${p}-curve-box {
      padding: 22px; border-radius: var(--radius-lg);
      background: rgba(7, 23, 23, 0.66); border: 1px solid var(--border);
    }
    .${p}-day-row {
      display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;
      margin-top: 12px; text-align: center; font-variant-numeric: tabular-nums;
    }
    .${p}-day-btn {
      min-height: 44px; padding: 8px 6px; border-radius: 14px;
      background: rgba(255, 255, 255, 0.04); border: 1px solid transparent;
      color: var(--muted); font-size: 12px; font-weight: 600; cursor: pointer;
      transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
    }
    .${p}-day-btn.is-active { background: rgba(45, 212, 191, 0.18); border-color: var(--accent); color: var(--fg); }

    .${p}-city-stack { display: flex; flex-direction: column; gap: 14px; font-variant-numeric: tabular-nums; }
    .${p}-city-card {
      padding: 16px 18px; border-radius: 22px; background: rgba(10, 31, 31, 0.78);
      border: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;
      cursor: pointer; transition: transform 0.25s var(--ease-out), opacity 0.25s var(--ease-out);
    }
    .${p}-city-card:hover { transform: translate3d(0, -3px, 0); }
    .${p}-city-card.is-selected { border-color: var(--accent); background: rgba(20, 62, 58, 0.9); }

    .${p}-bento-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 28px;
      font-variant-numeric: tabular-nums;
    }
    .${p}-card {
      padding: 26px; border-radius: var(--radius-lg); background: var(--surface);
      border: 1px solid var(--border); box-shadow: 0 20px 44px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08);
      transition: transform 0.3s var(--ease-out), opacity 0.3s var(--ease-out);
    }
    .${p}-card:hover { transform: translate3d(0, -4px, 0); }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out); }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; pointer-events: none; background: rgba(4, 15, 15, 0.84);
      backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box { pointer-events: auto;
      max-width: 580px; width: 100%; padding: 32px; border-radius: 28px;
      background: var(--surface-elevated); border: 1px solid var(--border);
    }

    @media (max-width: 1024px) {
      .${p}-spatial-stage { grid-template-columns: 1fr; }
      .${p}-dock { flex-direction: row; border-radius: 22px; justify-content: center; }
      .${p}-bento-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .${p}-bento-grid { grid-template-columns: 1fr; }
      .${p}-day-row { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 640px) {
      .${p}-header { border-radius: 20px; padding: 12px 16px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main weather telemetry</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <a href="#mainContent" class="${p}-brand">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
      <span>Calfin Weather <small style="color:var(--muted);font-weight:500;">/ Danang &amp; Jakarta</small></span>
    </a>
    <nav class="${p}-nav" aria-label="Primary Navigation">
      <a href="#forecastStage">Live Radar</a>
      <a href="#telemetryBento">Atmospheric Grid</a>
      <a href="#stationMatrix">Regional Stations</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="unitToggleBtn" class="${p}-btn-pill" aria-pressed="false">Unit: °C</button>
      <button type="button" id="motionToggleBtn" class="${p}-btn-pill" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-cta">Storm Alert Bulletin ↗</button>
    </div>
  </header>

  <main id="mainContent">
    <section id="forecastStage" class="${p}-shell">
      <div class="${p}-spatial-stage">
        <!-- Left Frosted Vertical Icon Dock -->
        <aside class="${p}-dock" aria-label="Spatial Weather Instruments">
          <button type="button" class="${p}-dock-btn is-active" aria-label="Precipitation Radar" data-seamless-trigger="Doppler Precipitation Radar — Calfin Danang">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>
          </button>
          <button type="button" class="${p}-dock-btn" aria-label="Wind Vector Telemetry" data-seamless-trigger="East Wind Vector Telemetry (11–21 mph)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>
          </button>
          <button type="button" class="${p}-dock-btn" aria-label="Barometric Isobars" data-seamless-trigger="Barometric Pressure — 1004.8 hPa">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z"/></svg>
          </button>
          <button type="button" class="${p}-dock-btn" aria-label="Lightning Strike Matrix" data-seamless-trigger="Lightning Discharge Tracker">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </button>
        </aside>

        <!-- Center Weather Forecast Hero & Interactive Bezier Curve -->
        <div class="${p}-center-col">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
              <span class="${p}-badge">Weather Forecast • Welcome Calfin Danang</span>
              <span id="liveStationCoords" style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">16.0544° N, 108.2022° E • LIVE</span>
            </div>
            <h1 id="oversizedHeadline" class="${p}-h1">Storm with Heavy Rain</h1>
            <p id="activeWeatherDesc" class="${p}-lead" style="margin-top:12px;">
              Partly cloudy with occasional snow showers and highland squalls. High around 50°F (10°C). Wind from the east 11 to 21 mph with 88% relative humidity.
            </p>
          </div>

          <div style="display:flex;gap:28px;flex-wrap:wrap;font-variant-numeric:tabular-nums;">
            <div>
              <strong id="mainTempReadout" data-counter-target="14" data-counter-suffix="°C" style="font-size:38px;font-family:var(--font-mono);color:var(--accent-text);">14°C</strong>
              <span style="display:block;font-size:12px;color:var(--muted);">Current Highland Temp</span>
            </div>
            <div>
              <strong data-counter-target="21" data-counter-suffix=" mph" style="font-size:38px;font-family:var(--font-mono);">21 mph</strong>
              <span style="display:block;font-size:12px;color:var(--muted);">East Wind Gusts</span>
            </div>
            <div>
              <strong data-counter-target="88" data-counter-suffix="%" style="font-size:38px;font-family:var(--font-mono);">88%</strong>
              <span style="display:block;font-size:12px;color:var(--muted);">Precipitation Probability</span>
            </div>
          </div>

          <!-- Interactive 6-Node SVG Bezier Temperature Curve (One Live Thing) -->
          <div class="${p}-curve-box">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <strong style="font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:var(--accent-text);">6-Day Atmospheric Temperature Curve</strong>
              <span id="selectedDaySummary" style="font-size:12px;font-family:var(--font-mono);color:var(--muted);">Thursday Peak: 19°C • Storm Front</span>
            </div>
            <svg viewBox="0 0 680 170" width="100%" height="160" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="${p}CurveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.38"/>
                  <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              <path d="M40 112 C 110 92, 145 88, 165 94 C 215 100, 250 75, 290 78 C 340 82, 375 124, 415 120 C 460 116, 495 36, 540 42 C 585 48, 615 98, 645 102 L 645 155 L 40 155 Z" fill="url(#${p}CurveFill)"/>
              <path id="bezierTempPath" d="M40 112 C 110 92, 145 88, 165 94 C 215 100, 250 75, 290 78 C 340 82, 375 124, 415 120 C 460 116, 495 36, 540 42 C 585 48, 615 98, 645 102" stroke="#5eead4" stroke-width="3" stroke-linecap="round"/>
              <circle cx="40" cy="112" r="6" fill="#071717" stroke="#5eead4" stroke-width="3"/>
              <text x="40" y="96" fill="#f0fdfa" font-size="13" font-weight="700" text-anchor="middle">11°</text>
              <circle cx="165" cy="94" r="6" fill="#071717" stroke="#5eead4" stroke-width="3"/>
              <text x="165" y="78" fill="#f0fdfa" font-size="13" font-weight="700" text-anchor="middle">13°</text>
              <circle cx="290" cy="78" r="6" fill="#071717" stroke="#5eead4" stroke-width="3"/>
              <text x="290" y="62" fill="#f0fdfa" font-size="13" font-weight="700" text-anchor="middle">14°</text>
              <circle cx="415" cy="120" r="6" fill="#071717" stroke="#5eead4" stroke-width="3"/>
              <text x="415" y="104" fill="#f0fdfa" font-size="13" font-weight="700" text-anchor="middle">10°</text>
              <circle cx="540" cy="42" r="8" fill="#2dd4bf" stroke="#f0fdfa" stroke-width="3"/>
              <text x="540" y="24" fill="#5eead4" font-size="14" font-weight="800" text-anchor="middle">19°</text>
              <circle cx="645" cy="102" r="6" fill="#071717" stroke="#5eead4" stroke-width="3"/>
              <text x="645" y="86" fill="#f0fdfa" font-size="13" font-weight="700" text-anchor="middle">12°</text>
            </svg>
            <div class="${p}-day-row" role="group" aria-label="Select Forecast Day">
              <button type="button" class="${p}-day-btn" data-day="Sunday" data-c="11" data-cond="Scattered Squalls • 14 mph E">Sunday · 11°</button>
              <button type="button" class="${p}-day-btn" data-day="Monday" data-c="13" data-cond="Mist &amp; Drizzle • 12 mph NE">Monday · 13°</button>
              <button type="button" class="${p}-day-btn" data-day="Tuesday" data-c="14" data-cond="Heavy Rainband • 19 mph E">Tuesday · 14°</button>
              <button type="button" class="${p}-day-btn" data-day="Wednesday" data-c="10" data-cond="Highland Frost • 21 mph E">Wednesday · 10°</button>
              <button type="button" class="${p}-day-btn is-active" data-day="Thursday" data-c="19" data-cond="Warm Break &amp; Cloud Deck • 11 mph SE">Thursday · 19°</button>
              <button type="button" class="${p}-day-btn" data-day="Friday" data-c="12" data-cond="Evening Monsoon • 17 mph E">Friday · 12°</button>
            </div>
          </div>
        </div>

        <!-- Right Stacked Regional Glass Cards -->
        <aside id="stationMatrix" class="${p}-city-stack" aria-label="Regional Weather Stations">
          <article class="${p}-city-card is-selected" data-city="Central Jakarta" data-temp-c="10" data-coords="06.1805° S, 106.8284° E" data-desc="Heavy monsoon cloud deck across Central Jakarta with 18 mph gusting winds.">
            <div>
              <span style="font-size:11px;font-family:var(--font-mono);color:var(--accent-text);">STATION 01 • ID-JK</span>
              <h2 style="font-size:17px;margin-top:2px;">Central Jakarta</h2>
              <span style="font-size:12px;color:var(--muted);">Storm with Heavy Rain</span>
            </div>
            <strong class="station-temp" data-c="10" style="font-size:26px;font-family:var(--font-mono);">10°C</strong>
          </article>
          <article class="${p}-city-card" data-city="North Jakarta" data-temp-c="12" data-coords="06.1384° S, 106.8639° E" data-desc="Coastal squalls along North Jakarta harbor with 15 mph onshore winds and 84% humidity.">
            <div>
              <span style="font-size:11px;font-family:var(--font-mono);color:var(--accent-text);">STATION 02 • COASTAL</span>
              <h2 style="font-size:17px;margin-top:2px;">North Jakarta</h2>
              <span style="font-size:12px;color:var(--muted);">Coastal Squalls</span>
            </div>
            <strong class="station-temp" data-c="12" style="font-size:26px;font-family:var(--font-mono);">12°C</strong>
          </article>
          <article class="${p}-city-card" data-city="Bandung" data-temp-c="10" data-coords="06.9175° S, 107.6191° E" data-desc="Dense volcanic highland fog and cold rain showers over Bandung basin.">
            <div>
              <span style="font-size:11px;font-family:var(--font-mono);color:var(--accent-text);">STATION 03 • HIGHLAND</span>
              <h2 style="font-size:17px;margin-top:2px;">Bandung</h2>
              <span style="font-size:12px;color:var(--muted);">Highland Mist</span>
            </div>
            <strong class="station-temp" data-c="10" style="font-size:26px;font-family:var(--font-mono);">10°C</strong>
          </article>
          <article class="${p}-city-card" data-city="South Jakarta" data-temp-c="14" data-coords="06.2615° S, 106.8106° E" data-desc="Scattered thunderstorm cells moving northeast across South Jakarta at 14 mph.">
            <div>
              <span style="font-size:11px;font-family:var(--font-mono);color:var(--accent-text);">STATION 04 • INLAND</span>
              <h2 style="font-size:17px;margin-top:2px;">South Jakarta</h2>
              <span style="font-size:12px;color:var(--muted);">Thunderstorm Cells</span>
            </div>
            <strong class="station-temp" data-c="14" style="font-size:26px;font-family:var(--font-mono);">14°C</strong>
          </article>
        </aside>
      </div>
    </section>

    <section id="telemetryBento" class="${p}-shell">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span class="${p}-badge">Atmospheric Telemetry</span>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.2rem);font-weight:400;margin-top:8px;">Precision Mesoscale Sensors</h2>
        </div>
        <p style="color:var(--muted);font-size:14px;max-width:46ch;">Synchronized every 30 seconds across 48 Doppler radar domes and barometric buoys in Southeast Asia.</p>
      </div>
      <div class="${p}-bento-grid">
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Doppler Precipitation Core">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">01 / PRECIPITATION CORE</span>
          <h3 style="font-size:20px;margin:8px 0;">42.8 mm/hr Peak</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Dual-polarization radar tracks rainband density across terraced mountain valleys in real time.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="East Wind Shear Profile">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">02 / ANEMOMETER ARRAY</span>
          <h3 style="font-size:20px;margin:8px 0;">11–21 mph East Vector</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Ultrasonic wind profilers measure boundary-layer shear and mountain-pass gust corridors.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Barometric Pressure Drop">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">03 / BAROMETRIC TENDENCY</span>
          <h3 style="font-size:20px;margin:8px 0;">1004.8 hPa Falling</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Automated micro-barographs trigger early flash-flood advisories 45 minutes ahead of squall arrival.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-shell" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
    <span style="font-size:13px;color:var(--muted);">© 2026 Calfin Weather Telemetry. Spatial Glass Edition.</span>
    <span style="font-size:12px;font-family:var(--font-mono);color:var(--accent-text);">RADAR SYNC: 99.98% • DANANG / JAKARTA</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-badge">Calfin Advisory Bulletin</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">Storm with Heavy Rain — Advisory</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Active mesoscale convective system detected over Calfin Danang and Central Jakarta stations. Winds from the east at 11 to 21 mph with localized heavy rainfall.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-cta" style="width:100%;">Acknowledge Telemetry</button>
    </div>
  </div>

  <script>
    (function () {
      var isFahrenheit = false;
      var unitBtn = document.getElementById('unitToggleBtn');
      var mainTemp = document.getElementById('mainTempReadout');
      var daySummary = document.getElementById('selectedDaySummary');
      var activeDesc = document.getElementById('activeWeatherDesc');
      var coordsEl = document.getElementById('liveStationCoords');
      var headlineEl = document.getElementById('oversizedHeadline');

      function formatTemp(c) {
        var val = isFahrenheit ? Math.round((c * 9) / 5 + 32) : c;
        return val + (isFahrenheit ? '°F' : '°C');
      }

      if (unitBtn) {
        unitBtn.addEventListener('click', function () {
          isFahrenheit = !isFahrenheit;
          unitBtn.setAttribute('aria-pressed', String(isFahrenheit));
          unitBtn.textContent = isFahrenheit ? 'Unit: °F' : 'Unit: °C';
          document.querySelectorAll('.station-temp').forEach(function (el) {
            var c = parseFloat(el.getAttribute('data-c') || '12');
            el.textContent = formatTemp(c);
          });
          var activeDay = document.querySelector('.${p}-day-btn.is-active');
          if (activeDay) {
            var dc = parseFloat(activeDay.getAttribute('data-c') || '19');
            if (mainTemp) mainTemp.textContent = formatTemp(dc);
          }
        });
      }

      document.querySelectorAll('.${p}-day-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.${p}-day-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var day = btn.getAttribute('data-day');
          var c = parseFloat(btn.getAttribute('data-c') || '14');
          var cond = btn.getAttribute('data-cond') || '';
          if (mainTemp) mainTemp.textContent = formatTemp(c);
          if (daySummary) daySummary.textContent = day + ' Forecast: ' + formatTemp(c) + ' • ' + cond;
        });
      });

      document.querySelectorAll('.${p}-city-card').forEach(function (card) {
        card.addEventListener('click', function () {
          document.querySelectorAll('.${p}-city-card').forEach(function (c) { c.classList.remove('is-selected'); });
          card.classList.add('is-selected');
          var city = card.getAttribute('data-city');
          var tc = parseFloat(card.getAttribute('data-temp-c') || '12');
          var coords = card.getAttribute('data-coords') || '';
          var desc = card.getAttribute('data-desc') || '';
          if (headlineEl) headlineEl.textContent = city + ' — Storm Watch';
          if (mainTemp) mainTemp.textContent = formatTemp(tc);
          if (coordsEl) coordsEl.textContent = coords + ' • LIVE';
          if (activeDesc) activeDesc.textContent = desc;
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 2. CYBR BRUTALISM (cybr-brutalism — Free Tier)
  // Industrial Cyber-Brutalist System Studio (CYBR_)
  // ============================================================================
  if (slug === 'cybr-brutalism') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>CYBR_ — Cyber Brutalism &amp; Systematic Digital Architecture</title>
  <meta name="description" content="Industrial cyber-brutalist design system studio featuring acid-lime #C6FF00 military terminal grids, wireframe 3D cybernetic head telemetry, and live system command filtering.">
  <meta property="og:title" content="CYBR_ — The Future Isn't Minimal. It's Systematic.">
  <meta property="og:description" content="Cyber Brutalism design systems, WebGL wireframe telemetry, and raw architectural interfaces.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#080908">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #080908;
      --surface: #111310;
      --surface-elevated: #181c16;
      --fg: #f4f7f0;
      --muted: #9aa392;
      --border: rgba(198, 255, 0, 0.24);
      --accent: #c6ff00;
      --accent-text: #d9ff4d;
      --accent-strong: #a3d900;
      --on-accent: #080908;
      --font-display: 'Space Grotesk', system-ui, sans-serif;
      --font-sans: 'Space Grotesk', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background-color: var(--bg);
      background-image: linear-gradient(rgba(198, 255, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(198, 255, 0, 0.05) 1px, transparent 1px);
      background-size: 48px 48px;
      color: var(--fg);
      font-family: var(--font-sans);
      overflow-x: clip;
      scroll-behavior: smooth;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; background: var(--accent); color: var(--on-accent);
      font-family: var(--font-mono); font-weight: 800; text-decoration: none;
      transition: transform 0.2s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      transform: translate3d(-100px, -100px, 0); will-change: transform;
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid var(--accent); margin: -16px 0 0 -16px; transition: transform 0.2s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }

    .${p}-topbar {
      position: sticky; top: 0; z-index: 200; background: rgba(8, 9, 8, 0.92);
      backdrop-filter: blur(12px); border-bottom: 1px solid var(--border);
      padding: 12px clamp(16px, 4vw, 48px); display: flex; align-items: center; justify-content: space-between; gap: 16px;
      font-family: var(--font-mono); font-size: 12px;
    }
    .${p}-nav { display: flex; gap: 20px; flex-wrap: wrap; }
    .${p}-nav a { color: var(--muted); text-decoration: none; font-weight: 700; transition: color 0.2s var(--ease-out); }
    .${p}-nav a:hover { color: var(--accent); }
    .${p}-btn {
      min-height: 44px; padding: 10px 18px; border: 1px solid var(--border);
      background: var(--surface); color: var(--fg); font-family: var(--font-mono);
      font-size: 12px; font-weight: 700; cursor: pointer;
      transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
    }
    .${p}-btn-acid {
      min-height: 44px; padding: 10px 20px; border: 1px solid var(--accent);
      background: var(--accent); color: var(--on-accent); font-family: var(--font-mono);
      font-size: 12px; font-weight: 800; cursor: pointer;
      transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
    }
    .${p}-btn:active, .${p}-btn-acid:active { transform: scale(0.97); }

    .${p}-wrap { max-width: 1360px; margin: 0 auto; padding: clamp(36px, 5vw, 72px) clamp(16px, 4vw, 48px); }
    .${p}-hero-grid {
      display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 28px;
      border: 1px solid var(--border); background: rgba(17, 19, 16, 0.86);
      padding: clamp(24px, 4vw, 48px); box-shadow: 0 28px 64px rgba(0,0,0,0.65);
    }
    .${p}-h1 {
      font-family: var(--font-display); font-size: clamp(2.75rem, 6.2vw, 5.4rem);
      line-height: 0.94; letter-spacing: -0.03em; text-transform: uppercase; margin: 14px 0 18px;
    }
    .${p}-wireframe-box {
      border: 1px solid var(--border); background: #0b0d0a; padding: 20px;
      display: flex; flex-direction: column; justify-content: space-between;
      font-family: var(--font-mono); font-variant-numeric: tabular-nums;
    }
    .${p}-principles {
      display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-top: 24px;
    }
    .${p}-p-card {
      padding: 20px; border: 1px solid var(--border); background: var(--surface);
      transition: transform 0.25s var(--ease-out), opacity 0.25s var(--ease-out);
    }
    .${p}-p-card:hover { transform: translate3d(0, -4px, 0); }
    .${p}-work-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 22px;
      font-variant-numeric: tabular-nums;
    }
    .${p}-work-card {
      padding: 26px; border: 1px solid var(--border); background: var(--surface);
      display: flex; flex-direction: column; justify-content: space-between; gap: 16px;
      cursor: pointer; transition: transform 0.25s var(--ease-out), opacity 0.25s var(--ease-out);
    }
    .${p}-work-card:hover { transform: translate3d(0, -4px, 0); }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 20px, 0); transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out); }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; pointer-events: none; background: rgba(8, 9, 8, 0.88);
      backdrop-filter: blur(14px); display: none; align-items: center; justify-content: center; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box { pointer-events: auto; max-width: 580px; width: 100%; padding: 32px; background: var(--surface-elevated); border: 2px solid var(--accent); }

    @media (max-width: 1024px) {
      .${p}-hero-grid { grid-template-columns: 1fr; }
      .${p}-principles { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .${p}-work-grid { grid-template-columns: 1fr; }
      .${p}-principles { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .${p}-topbar { flex-direction: column; align-items: flex-start; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">[SKIP_TO_MAIN_TERMINAL]</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-topbar">
    <strong style="font-size:16px;color:var(--accent);">CYBR_ // SYS_V2.0</strong>
    <nav class="${p}-nav" aria-label="Primary Navigation">
      <a href="#sec01">+ WORK</a>
      <a href="#sec02">+ PRINCIPLES</a>
      <a href="#sec03">+ ARCHIVE</a>
      <a href="#sec05">+ SYS_STATUS</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
      <span id="sysClockReadout" style="color:var(--accent-text);font-variant-numeric:tabular-nums;">SYS_TIME 23:47:12 UTC+0</span>
      <button type="button" id="motionToggleBtn" class="${p}-btn" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-acid">START A PROJECT ↗</button>
    </div>
  </header>

  <main id="mainContent">
    <section id="sec01" class="${p}-wrap">
      <div class="${p}-hero-grid">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:700;">/01 // SYSTEMATIC ARCHITECTURE</span>
          <h1 id="oversizedHeadline" class="${p}-h1">
            CYBER BRUTALISM<br>
            <span style="color:var(--accent);font-size:0.58em;display:block;margin-top:8px;">THE FUTURE ISN'T MINIMAL. IT'S SYSTEMATIC.</span>
          </h1>
          <p style="color:var(--muted);font-size:16px;line-height:1.65;max-width:56ch;margin-bottom:24px;">
            We engineer raw, exposed-grid digital products, high-frequency telemetry terminals, and unpolished industrial WebGL systems that reject sterile templates.
          </p>
          <div style="display:flex;gap:28px;flex-wrap:wrap;font-family:var(--font-mono);font-variant-numeric:tabular-nums;margin-bottom:24px;">
            <div><strong data-counter-target="87" data-counter-suffix="%" style="font-size:32px;color:var(--accent);">87%</strong><span style="display:block;font-size:11px;color:var(--muted);">MESH_RENDER_LOAD</span></div>
            <div><strong data-counter-target="73" data-counter-suffix="%" style="font-size:32px;">73%</strong><span style="display:block;font-size:11px;color:var(--muted);">CPU_USAGE_NOMINAL</span></div>
            <div><strong data-counter-target="120" data-counter-suffix="FPS" style="font-size:32px;">120FPS</strong><span style="display:block;font-size:11px;color:var(--muted);">FRAME_LOCK_RATE</span></div>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-acid" data-seamless-trigger="INITIALIZE_SYSTEM_AUDIT // SCN_01">INITIALIZE AUDIT ↗</button>
            <a href="#sec03" class="${p}-btn" style="text-decoration:none;display:inline-flex;align-items:center;">INSPECT SELECTED WORK</a>
          </div>
        </div>

        <div class="${p}-wireframe-box">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--accent);">
            <span>&gt;RENDERING... 87%</span>
            <span>//SCN_01</span>
          </div>
          <svg viewBox="0 0 420 300" width="100%" height="250" fill="none" aria-hidden="true">
            <rect x="16" y="16" width="388" height="268" stroke="#c6ff00" stroke-opacity="0.3" stroke-dasharray="4 4"/>
            <ellipse cx="210" cy="145" rx="86" ry="108" stroke="#c6ff00" stroke-width="1.5"/>
            <ellipse cx="210" cy="145" rx="52" ry="108" stroke="#c6ff00" stroke-width="1" stroke-opacity="0.6"/>
            <line x1="124" y1="115" x2="296" y2="115" stroke="#c6ff00" stroke-width="2"/>
            <line x1="132" y1="155" x2="288" y2="155" stroke="#c6ff00" stroke-width="1" stroke-opacity="0.7"/>
            <rect x="242" y="88" width="68" height="24" fill="#c6ff00"/>
            <text x="276" y="104" fill="#080908" font-family="monospace" font-size="11" font-weight="800" text-anchor="middle">GLITCH_01</text>
          </svg>
          <div id="coordTelemetry" style="font-size:11px;color:var(--muted);display:flex;justify-content:space-between;">
            <span>X_36.1749 Y_-86.7676 Z_46.6827</span>
            <span style="color:var(--accent);">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </section>

    <section id="sec02" class="${p}-wrap">
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:700;">/02 // CORE PRINCIPLES</span>
      <div class="${p}-principles">
        <article class="${p}-p-card ${p}-reveal"><strong style="font-family:var(--font-mono);color:var(--accent);font-size:12px;">01</strong><h2 style="font-size:16px;margin:6px 0;">FUNCTION OVER FORM</h2><p style="font-size:12px;color:var(--muted);">Zero decorative fluff. Every pixel reports live system state.</p></article>
        <article class="${p}-p-card ${p}-reveal"><strong style="font-family:var(--font-mono);color:var(--accent);font-size:12px;">02</strong><h2 style="font-size:16px;margin:6px 0;">SYSTEMS THINKING</h2><p style="font-size:12px;color:var(--muted);">Modular token architecture built for extreme scale.</p></article>
        <article class="${p}-p-card ${p}-reveal"><strong style="font-family:var(--font-mono);color:var(--accent);font-size:12px;">03</strong><h2 style="font-size:16px;margin:6px 0;">DIGITAL AESTHETICS</h2><p style="font-size:12px;color:var(--muted);">Exposed hairline borders and terminal-grade typography.</p></article>
        <article class="${p}-p-card ${p}-reveal"><strong style="font-family:var(--font-mono);color:var(--accent);font-size:12px;">04</strong><h2 style="font-size:16px;margin:6px 0;">BOLD CONTRAST</h2><p style="font-size:12px;color:var(--muted);">Acid lime #C6FF00 on obsidian #080908 for instant legibility.</p></article>
        <article class="${p}-p-card ${p}-reveal"><strong style="font-family:var(--font-mono);color:var(--accent);font-size:12px;">05</strong><h2 style="font-size:16px;margin:6px 0;">RAW &amp; AUTHENTIC</h2><p style="font-size:12px;color:var(--muted);">Honest HTML5/CSS3/JS materials without bloated runtime layers.</p></article>
      </div>
    </section>

    <!-- /03 SELECTED WORK + ONE LIVE THING FILTER -->
    <section id="sec03" class="${p}-wrap">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:700;">/03 // SELECTED WORK &amp; LIVE FILTER</span>
          <h2 style="font-size:clamp(1.8rem,3.5vw,2.8rem);margin-top:4px;">DEPLOYED BRUTALIST SYSTEMS</h2>
        </div>
        <div role="group" aria-label="Filter Deployed Systems" style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="${p}-btn-acid cybr-filter" data-filter="ALL">ALL_NODES (4)</button>
          <button type="button" class="${p}-btn cybr-filter" data-filter="TELEMETRY">TELEMETRY</button>
          <button type="button" class="${p}-btn cybr-filter" data-filter="AI_CORE">AI_CORE</button>
        </div>
      </div>

      <div class="${p}-work-grid">
        <article class="${p}-work-card" data-cat="TELEMETRY" data-seamless-trigger="DATA_PORTAL // High-Frequency Telemetry">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px;color:var(--accent);"><span>NODE_01 // TELEMETRY</span><span>99.98% UPTIME</span></div>
          <h3 style="font-size:24px;">DATA_PORTAL</h3>
          <p style="font-size:14px;color:var(--muted);">Sub-millisecond WebSocket observability matrix for distributed energy grids.</p>
        </article>
        <article class="${p}-work-card" data-cat="AI_CORE" data-seamless-trigger="NEURAL_NET // Synthetic Inference Cluster">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px;color:var(--accent);"><span>NODE_02 // AI_CORE</span><span>14.2 TFLOPS</span></div>
          <h3 style="font-size:24px;">NEURAL_NET</h3>
          <p style="font-size:14px;color:var(--muted);">Brutalist model-weights inspector and tensor routing console.</p>
        </article>
        <article class="${p}-work-card" data-cat="AI_CORE" data-seamless-trigger="VOID_SYSTEM // Zero-Knowledge Kernel">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px;color:var(--accent);"><span>NODE_03 // AI_CORE</span><span>ZK_SNARK_V4</span></div>
          <h3 style="font-size:24px;">VOID_SYSTEM</h3>
          <p style="font-size:14px;color:var(--muted);">Cryptographic proof generator with hardware-accelerated command shell.</p>
        </article>
        <article class="${p}-work-card" data-cat="TELEMETRY" data-seamless-trigger="GRIDLINE // Industrial Design Tokens">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px;color:var(--accent);"><span>NODE_04 // TELEMETRY</span><span>48PX_MODULAR</span></div>
          <h3 style="font-size:24px;">GRIDLINE</h3>
          <p style="font-size:14px;color:var(--muted);">Swiss-military typographic grid engine and tokens specification.</p>
        </article>
      </div>
    </section>

    <section id="sec05" class="${p}-wrap">
      <div style="padding:24px;border:1px solid var(--accent);background:var(--surface);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;font-family:var(--font-mono);font-variant-numeric:tabular-nums;">
        <span>/05 SYSTEM STATUS: <strong>CPU_USAGE 73%</strong> | <strong>MEMORY 8.6 GB / 16 GB</strong> | <strong>UPTIME 7D 14H 22M</strong></span>
        <span style="color:var(--accent);font-weight:800;">&gt; ACCESS GRANTED_</span>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="border-top:1px solid var(--border);font-family:var(--font-mono);font-size:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
    <span>© 2026 CYBR_ BRUTALIST STUDIO. ALL SYSTEMS OPERATIONAL.</span>
    <span style="color:var(--accent);">BUILD_REV: 2026.10.29 // FORGEFRAME_GOLD</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-family:var(--font-mono);">
        <span style="color:var(--accent);">// SYSTEM_DOSSIER</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn">ESC_CLOSE</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:22px;margin-bottom:10px;">CYBR_ SYSTEM SPECIFICATION</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Direct kernel telemetry verified. Exposed 48px CSS grid, high-contrast Acid Lime #C6FF00 tokens, and zero-bloat Vanilla JS execution.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-acid" style="width:100%;">EXECUTE_RETURN_</button>
    </div>
  </div>

  <script>
    (function () {
      var btns = document.querySelectorAll('.cybr-filter');
      var cards = document.querySelectorAll('.${p}-work-card');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var f = btn.getAttribute('data-filter');
          btns.forEach(function (b) { b.className = b === btn ? '${p}-btn-acid cybr-filter' : '${p}-btn cybr-filter'; });
          cards.forEach(function (c) {
            var match = f === 'ALL' || c.getAttribute('data-cat') === f;
            c.style.display = match ? 'flex' : 'none';
          });
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 3. AURELIA BIOCYBER (aurelia-biocyber — Premium Tier)
  // Dark Obsidian & Brushed-Gold / Bioluminescent Teal Bio-Cybernetic Atelier
  // ============================================================================
  if (slug === 'aurelia-biocyber') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Aurelia BioCyber — Golden Astrolabe &amp; Bio-Cybernetic Sculpture Atelier</title>
  <meta name="description" content="Obsidian and brushed-gold bio-cybernetic atelier with out-of-bounds 3D botanical visor sculpture, circular golden astrolabe portal, and live neural resonance inspector.">
  <meta property="og:title" content="Aurelia BioCyber — Botanical &amp; Cybernetic Couture">
  <meta property="og:description" content="Where golden alchemy meets bioluminescent neural optics.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#0d1112">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0d1112;
      --surface: #151c1e;
      --surface-elevated: #1d2629;
      --glass: rgba(21, 28, 30, 0.78);
      --fg: #f7f3eb;
      --muted: #b8afa0;
      --border: rgba(212, 163, 89, 0.24);
      --accent: #d4a359;
      --accent-text: #eac584;
      --accent-strong: #b8863b;
      --on-accent: #120e07;
      --font-display: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: radial-gradient(circle at 55% 28%, #1e2d2f 0%, #0d1112 65%);
      color: var(--fg); font-family: var(--font-sans); overflow-x: clip; scroll-behavior: smooth;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; text-decoration: none; transition: transform 0.2s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); will-change: transform;
    }
    .${p}-cursor-ring { width: 36px; height: 36px; border: 1.5px solid var(--accent-text); margin: -18px 0 0 -18px; transition: transform 0.22s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }

    .${p}-header {
      position: sticky; top: 14px; z-index: 200; max-width: 1340px; margin: 14px auto 0;
      padding: 12px 24px; border-radius: 999px; background: var(--glass);
      backdrop-filter: blur(16px); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-nav { display: flex; gap: 22px; flex-wrap: wrap; }
    .${p}-nav a { color: var(--muted); text-decoration: none; font-size: 13px; font-weight: 600; transition: color 0.2s var(--ease-out); }
    .${p}-nav a:hover { color: var(--accent-text); }
    .${p}-btn {
      min-height: 44px; padding: 9px 18px; border-radius: 999px;
      background: rgba(212, 163, 89, 0.12); border: 1px solid var(--border);
      color: var(--fg); font-size: 12px; font-weight: 700; cursor: pointer;
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out);
    }
    .${p}-btn-gold {
      min-height: 44px; padding: 10px 24px; border-radius: 999px;
      background: linear-gradient(135deg, #eac584 0%, #d4a359 100%);
      color: var(--on-accent); border: none; font-size: 13px; font-weight: 800; cursor: pointer;
      transition: transform 0.22s var(--ease-out), opacity 0.22s var(--ease-out);
    }
    .${p}-btn:active, .${p}-btn-gold:active { transform: scale(0.97); }

    .${p}-section { max-width: 1340px; margin: 0 auto; padding: clamp(32px, 5vw, 68px) clamp(16px, 4vw, 48px); }
    .${p}-hero-stage {
      display: grid; grid-template-columns: 280px 1fr 310px; gap: 24px; align-items: center;
      padding: clamp(24px, 4vw, 44px); border-radius: 36px;
      background: linear-gradient(145deg, rgba(25, 35, 38, 0.88) 0%, rgba(13, 17, 18, 0.96) 100%);
      border: 1px solid var(--border); box-shadow: 0 36px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(234, 197, 132, 0.2);
    }
    .${p}-inspector {
      padding: 22px; border-radius: 26px; background: rgba(13, 17, 18, 0.78);
      border: 1px solid var(--border); font-variant-numeric: tabular-nums;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-size: clamp(2.9rem, 6vw, 5.4rem);
      font-weight: 600; line-height: 0.96; letter-spacing: -0.02em; margin: 10px 0 16px;
    }
    .${p}-triptych {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 26px;
      font-variant-numeric: tabular-nums;
    }
    .${p}-tab-card {
      padding: 24px; border-radius: 26px; background: var(--surface);
      border: 1px solid var(--border); box-shadow: 0 20px 40px rgba(0,0,0,0.35);
      transition: transform 0.28s var(--ease-out), opacity 0.28s var(--ease-out);
    }
    .${p}-tab-card:hover { transform: translate3d(0, -4px, 0); }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out); }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; pointer-events: none; background: rgba(10, 14, 15, 0.86);
      backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box { pointer-events: auto; max-width: 560px; width: 100%; padding: 32px; border-radius: 28px; background: var(--surface-elevated); border: 1px solid var(--accent); }

    @media (max-width: 1024px) {
      .${p}-hero-stage { grid-template-columns: 1fr; }
      .${p}-triptych { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .${p}-triptych { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .${p}-header { border-radius: 20px; padding: 12px 16px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to BioCyber Atelier</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <strong style="font-family:var(--font-display);font-size:22px;letter-spacing:0.06em;color:var(--accent-text);">AURELIA BIOCYBER</strong>
    <nav class="${p}-nav" aria-label="Primary Navigation">
      <a href="#astrolabeStage">Astrolabe Portal</a>
      <a href="#botanicalTriptych">Alchemy Modules</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-btn" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-gold">Enter Atelier ↗</button>
    </div>
  </header>

  <main id="mainContent">
    <section id="astrolabeStage" class="${p}-section">
      <div class="${p}-hero-stage">
        <!-- Left Layer Inspector & Live Neural Tuner (One Live Thing) -->
        <aside class="${p}-inspector" aria-label="Bio-Neural Resonance Tuner">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">LAYER 01 // BIO-OPTIC TUNER</span>
          <h2 style="font-size:18px;margin:8px 0 12px;">Astrolabe Resonance</h2>
          <label for="harmonicRange" style="display:block;font-size:12px;color:var(--muted);margin-bottom:6px;">
            Golden Ratio Harmonics: <strong id="harmonicVal" style="color:var(--accent-text);">1.618 φ</strong>
          </label>
          <input id="harmonicRange" type="range" min="100" max="220" value="162" style="width:100%;accent-color:var(--accent);margin-bottom:16px;" />
          <div style="display:flex;flex-direction:column;gap:10px;font-size:12px;">
            <div style="display:flex;justify-content:space-between;"><span>Botanical Gold Leaf</span><strong data-counter-target="24" data-counter-suffix="K">24K</strong></div>
            <div style="display:flex;justify-content:space-between;"><span>Bioluminescent Flux</span><strong id="fluxReadout" data-counter-target="96" data-counter-suffix=".4%">96.4%</strong></div>
            <div style="display:flex;justify-content:space-between;"><span>Visor Refraction</span><strong data-counter-target="144" data-counter-suffix="Hz">144Hz</strong></div>
          </div>
        </aside>

        <!-- Center Golden Astrolabe Portal with Out-of-Bounds Botanical Visor SVG -->
        <div style="text-align:center;">
          <svg id="astrolabeSvg" viewBox="0 0 460 420" width="100%" height="360" fill="none" aria-hidden="true">
            <circle cx="230" cy="210" r="168" stroke="#d4a359" stroke-width="2" stroke-dasharray="8 6"/>
            <circle cx="230" cy="210" r="136" stroke="#38b2ac" stroke-width="1.5" stroke-opacity="0.55"/>
            <path d="M230 22 L248 92 L212 92 Z" fill="#d4a359"/>
            <ellipse cx="230" cy="215" rx="76" ry="96" fill="#151c1e" stroke="#eac584" stroke-width="2.5"/>
            <rect x="164" y="176" width="132" height="38" rx="19" fill="#38b2ac" fill-opacity="0.32" stroke="#eac584" stroke-width="2"/>
            <path d="M110 130 C 145 95, 185 110, 195 148" stroke="#eac584" stroke-width="4" stroke-linecap="round"/>
            <path d="M350 122 C 315 88, 275 108, 265 146" stroke="#eac584" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- Right Editorial Story & Action -->
        <div>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">ATELIER EDITION // 009</span>
          <h1 id="oversizedHeadline" class="${p}-h1">Organic Alchemy &amp; Cyber Visor</h1>
          <p style="font-size:15px;color:var(--muted);line-height:1.65;margin-bottom:22px;">
            Hand-sculpted 24K botanical filigree fused with bioluminescent teal neural optics — breaking out of the classical astrolabe frame.
          </p>
          <button type="button" class="${p}-btn-gold" data-seamless-trigger="Aurelia BioCyber — Bespoke Sculpture Commission">Commission Artifact ↗</button>
        </div>
      </div>

      <!-- 3 Bottom Rounded-Tab Botanical Cards -->
      <div id="botanicalTriptych" class="${p}-triptych">
        <article class="${p}-tab-card ${p}-reveal" data-seamless-trigger="01 / Astrolabe Halo Geometry">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">01 // ASTROLABE HALO</span>
          <h3 style="font-family:var(--font-display);font-size:26px;margin:6px 0;">Celestial Brass Ring</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">Precision-engraved orbital rings calibrated to golden-ratio harmonic intervals.</p>
        </article>
        <article class="${p}-tab-card ${p}-reveal" data-seamless-trigger="02 / Bioluminescent Visor Optics">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">02 // NEURAL OPTICS</span>
          <h3 style="font-family:var(--font-display);font-size:26px;margin:6px 0;">Teal Dichroic Visor</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">Subsurface-scattered sapphire glass projecting real-time botanical telemetry.</p>
        </article>
        <article class="${p}-tab-card ${p}-reveal" data-seamless-trigger="03 / Out-of-Bounds Gold Foliage">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">03 // POP-OUT FOLIAGE</span>
          <h3 style="font-family:var(--font-display);font-size:26px;margin:6px 0;">Botanical Filigree</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">Organic metallic leaves extending beyond the portal boundary for true 3D depth.</p>
        </article>
      </div>
    </section>

    <section id="alchemyProvenance" class="${p}-section" style="padding-top:0;">
      <article class="${p}-tab-card ${p}-reveal" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">04 // ON-CHAIN &amp; PHYSICAL PROVENANCE</span>
          <h2 style="font-family:var(--font-display);font-size:28px;margin-top:4px;"> Obsidian &amp; 24K Gold Edition Certificate</h2>
        </div>
        <button type="button" class="${p}-btn-gold" data-seamless-trigger="Aurelia Provenance Ledger">Verify Provenance ↗</button>
      </article>
    </section>
  </main>

  <footer class="${p}-section" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
    <span style="font-size:13px;color:var(--muted);">© 2026 Aurelia BioCyber Atelier. Crafted in Obsidian &amp; Gold.</span>
    <span style="font-size:12px;font-family:var(--font-mono);color:var(--accent-text);">RESONANCE: 1.618 φ • FORGEFRAME_GOLD</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">AURELIA DOSSIER</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:30px;margin-bottom:10px;">Aurelia BioCyber Specification</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Each Aurelia BioCyber piece combines 4K GLTF shader rigging with physical 24K brushed-gold botanical castings.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-gold" style="width:100%;">Return to Astrolabe Stage</button>
    </div>
  </div>

  <script>
    (function () {
      var range = document.getElementById('harmonicRange');
      var valEl = document.getElementById('harmonicVal');
      var svgEl = document.getElementById('astrolabeSvg');
      if (range) {
        range.addEventListener('input', function () {
          var v = (parseFloat(range.value) / 100).toFixed(3);
          if (valEl) valEl.textContent = v + ' φ';
          if (svgEl) svgEl.style.transform = 'rotate(' + ((range.value - 162) * 0.4).toFixed(1) + 'deg)';
        });
      }
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 4. HUSH FUTURIST BAGS (hush-futurist-bags — Premium Tier)
  // High-Fashion Rose-Pink & Liquid-Chrome 3D Luxury Bag Showcase (HUSH)
  // ============================================================================
  if (slug === 'hush-futurist-bags') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>HUSH — Your Choice Futurist 3D Luxury Bag Maison</title>
  <meta name="description" content="Each HUSH brand bag is the perfect combination of creativity and practicality. Explore NEW ARRIVALS: Sabrina, Brielle, and Naomi.">
  <meta property="og:title" content="HUSH — Futurist Chrome &amp; Rose-Pink Luxury Bags">
  <meta property="og:description" content="Explore Sabrina (220 USD), Brielle (200 USD), and Naomi (235 USD) in our interactive ECO collection.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#180b12">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #180b12;
      --surface: #26121d;
      --surface-elevated: #361a29;
      --glass: rgba(38, 18, 29, 0.8);
      --fg: #fdf2f8;
      --muted: #f4b8d1;
      --border: rgba(244, 184, 209, 0.22);
      --accent: #f472b6;
      --accent-text: #f9a8d4;
      --accent-strong: #ec4899;
      --on-accent: #180b12;
      --font-display: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: radial-gradient(circle at 50% 18%, #3b172b 0%, #180b12 68%);
      color: var(--fg); font-family: var(--font-sans); overflow-x: clip; scroll-behavior: smooth;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; text-decoration: none; transition: transform 0.2s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); will-change: transform;
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid var(--accent-text); margin: -17px 0 0 -17px; transition: transform 0.22s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }

    .${p}-header {
      position: sticky; top: 14px; z-index: 200; max-width: 1320px; margin: 14px auto 0;
      padding: 12px 24px; border-radius: 999px; background: var(--glass);
      backdrop-filter: blur(18px); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-nav { display: flex; gap: 22px; flex-wrap: wrap; }
    .${p}-nav a { color: var(--muted); text-decoration: none; font-size: 13px; font-weight: 600; transition: color 0.2s var(--ease-out); }
    .${p}-nav a:hover { color: var(--fg); }
    .${p}-pill {
      min-height: 44px; padding: 9px 18px; border-radius: 999px;
      background: rgba(255, 255, 255, 0.07); border: 1px solid var(--border);
      color: var(--fg); font-size: 12px; font-weight: 700; cursor: pointer;
      transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
    }
    .${p}-cta {
      min-height: 44px; padding: 10px 24px; border-radius: 999px;
      background: var(--accent); color: var(--on-accent); border: none;
      font-size: 13px; font-weight: 800; cursor: pointer;
      transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
    }
    .${p}-pill:active, .${p}-cta:active { transform: scale(0.97); }

    .${p}-wrap { max-width: 1320px; margin: 0 auto; padding: clamp(32px, 5vw, 68px) clamp(16px, 4vw, 48px); }
    .${p}-hero {
      display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 32px; align-items: center;
      padding: clamp(28px, 4vw, 52px); border-radius: 38px;
      background: linear-gradient(145deg, rgba(64, 26, 46, 0.85) 0%, rgba(24, 11, 18, 0.94) 100%);
      border: 1px solid var(--border); box-shadow: 0 32px 72px rgba(0,0,0,0.55);
    }
    .${p}-h1 {
      font-family: var(--font-display); font-size: clamp(3.1rem, 6.8vw, 5.8rem);
      font-weight: 600; line-height: 0.94; letter-spacing: -0.02em; margin: 12px 0 18px;
    }
    .${p}-arch-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 28px;
      font-variant-numeric: tabular-nums;
    }
    .${p}-arch-card {
      padding: 28px 24px; border-radius: 140px 140px 28px 28px;
      background: var(--surface); border: 1px solid var(--border);
      text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 14px;
      transition: transform 0.28s var(--ease-out), opacity 0.28s var(--ease-out);
    }
    .${p}-arch-card:hover { transform: translate3d(0, -5px, 0); }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out); }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; pointer-events: none; background: rgba(24, 11, 18, 0.86);
      backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box { pointer-events: auto; max-width: 560px; width: 100%; padding: 32px; border-radius: 28px; background: var(--surface-elevated); border: 1px solid var(--accent); }

    @media (max-width: 1024px) {
      .${p}-hero { grid-template-columns: 1fr; }
      .${p}-arch-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .${p}-arch-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .${p}-header { border-radius: 20px; padding: 12px 16px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to HUSH Bag Collection</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <strong style="font-size:20px;letter-spacing:0.14em;">HUSH</strong>
    <nav class="${p}-nav" aria-label="Primary Navigation">
      <a href="#heroChoice">Your Choice</a>
      <a href="#newArrivals">New Arrivals</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-pill" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-cta">Bag Concierge (<span id="bagCount">1</span>) ↗</button>
    </div>
  </header>

  <main id="mainContent">
    <section id="heroChoice" class="${p}-wrap">
      <div class="${p}-hero">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">HUSH MAISON // LIQUID CHROME &amp; ROSE</span>
          <h1 id="oversizedHeadline" class="${p}-h1">your choice.<br><em style="color:var(--accent-text);">Sculpted in Chrome.</em></h1>
          <p style="font-size:16px;color:var(--muted);line-height:1.65;max-width:52ch;margin-bottom:24px;">
            Each HUSH brand bag is the perfect combination of creativity and practicality — crafted from bio-based ECO vegan leather and mirror-polished liquid aluminum hardware.
          </p>
          <div style="display:flex;gap:28px;flex-wrap:wrap;font-variant-numeric:tabular-nums;margin-bottom:24px;">
            <div><strong data-counter-target="100" data-counter-suffix="% ECO" style="font-size:30px;color:var(--accent-text);">100% ECO</strong><span style="display:block;font-size:12px;color:var(--muted);">Bio-Polymer Shell</span></div>
            <div><strong data-counter-target="380" data-counter-suffix="g" style="font-size:30px;">380g</strong><span style="display:block;font-size:12px;color:var(--muted);">Featherweight Core</span></div>
          </div>
          <a href="#newArrivals" class="${p}-cta" style="text-decoration:none;display:inline-flex;align-items:center;">Learn more →</a>
        </div>

        <div style="text-align:center;">
          <svg viewBox="0 0 420 340" width="100%" height="300" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="${p}ChromePink" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fbcfe8"/>
                <stop offset="50%" stop-color="#f472b6"/>
                <stop offset="100%" stop-color="#831843"/>
              </linearGradient>
            </defs>
            <path d="M145 130 C 145 55, 275 55, 275 130" stroke="#fbcfe8" stroke-width="14" stroke-linecap="round"/>
            <rect x="95" y="120" width="230" height="165" rx="48" fill="url(#${p}ChromePink)" stroke="#fdf2f8" stroke-width="2"/>
            <circle cx="210" cy="195" r="22" fill="#180b12" stroke="#fbcfe8" stroke-width="3"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- NEW ARRIVALS ARCHED PILL CARDS + LIVE COLLECTION FILTER -->
    <section id="newArrivals" class="${p}-wrap">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">OUR COLLECTIONS</span>
          <h2 style="font-family:var(--font-display);font-size:clamp(2.2rem,4vw,3.4rem);">NEW ARRIVALS</h2>
        </div>
        <div role="group" aria-label="Filter HUSH Bag Tier" style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="${p}-cta hush-tab" data-tab="ALL">All Editions (3)</button>
          <button type="button" class="${p}-pill hush-tab" data-tab="CHROME">Bloggers' Choice</button>
          <button type="button" class="${p}-pill hush-tab" data-tab="PASTEL">Bestsellers</button>
        </div>
      </div>

      <div class="${p}-arch-grid">
        <article class="${p}-arch-card ${p}-reveal" data-tier="CHROME">
          <span style="padding:4px 12px;border-radius:999px;background:rgba(244,114,182,0.18);color:var(--accent-text);font-size:11px;font-weight:700;">ECO • LIQUID CHROME</span>
          <svg viewBox="0 0 180 140" width="140" height="110" fill="none" aria-hidden="true">
            <path d="M60 55 C 60 20, 120 20, 120 55" stroke="#f9a8d4" stroke-width="8" stroke-linecap="round"/>
            <rect x="38" y="50" width="104" height="72" rx="26" fill="#f472b6"/>
          </svg>
          <h3 style="font-family:var(--font-display);font-size:28px;">Sabrina</h3>
          <strong style="font-family:var(--font-mono);font-size:20px;color:var(--accent-text);">220 USD</strong>
          <button type="button" class="${p}-cta add-bag-btn" data-bag="Sabrina (220 USD)">Select Sabrina</button>
        </article>

        <article class="${p}-arch-card ${p}-reveal" data-tier="PASTEL">
          <span style="padding:4px 12px;border-radius:999px;background:rgba(244,114,182,0.18);color:var(--accent-text);font-size:11px;font-weight:700;">ECO • MATTE PEARL</span>
          <svg viewBox="0 0 180 140" width="140" height="110" fill="none" aria-hidden="true">
            <path d="M60 55 C 60 20, 120 20, 120 55" stroke="#fdf2f8" stroke-width="8" stroke-linecap="round"/>
            <rect x="38" y="50" width="104" height="72" rx="26" fill="#fbcfe8"/>
          </svg>
          <h3 style="font-family:var(--font-display);font-size:28px;">Brielle</h3>
          <strong style="font-family:var(--font-mono);font-size:20px;color:var(--accent-text);">200 USD</strong>
          <button type="button" class="${p}-cta add-bag-btn" data-bag="Brielle (200 USD)">Select Brielle</button>
        </article>

        <article class="${p}-arch-card ${p}-reveal" data-tier="CHROME">
          <span style="padding:4px 12px;border-radius:999px;background:rgba(244,114,182,0.18);color:var(--accent-text);font-size:11px;font-weight:700;">ECO • BLUSH ROSE</span>
          <svg viewBox="0 0 180 140" width="140" height="110" fill="none" aria-hidden="true">
            <path d="M60 55 C 60 20, 120 20, 120 55" stroke="#f472b6" stroke-width="8" stroke-linecap="round"/>
            <rect x="38" y="50" width="104" height="72" rx="26" fill="#ec4899"/>
          </svg>
          <h3 style="font-family:var(--font-display);font-size:28px;">Naomi</h3>
          <strong style="font-family:var(--font-mono);font-size:20px;color:var(--accent-text);">235 USD</strong>
          <button type="button" class="${p}-cta add-bag-btn" data-bag="Naomi (235 USD)">Select Naomi</button>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
    <span style="font-size:13px;color:var(--muted);">© 2026 HUSH Luxury Bag Maison. 100% ECO Sculpted Hardware.</span>
    <span style="font-size:12px;font-family:var(--font-mono);color:var(--accent-text);">SABRINA • BRIELLE • NAOMI</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">HUSH ATELIER BAG</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:30px;margin-bottom:10px;">Sabrina — 220 USD</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Added to your HUSH private concierge reservation. Crafted with mirror-chrome arches and sustainable ECO lining.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-cta" style="width:100%;">Continue Exploring HUSH</button>
    </div>
  </div>

  <script>
    (function () {
      var count = 1;
      var countEl = document.getElementById('bagCount');
      var modal = document.getElementById('seamlessModal');
      var titleEl = document.getElementById('seamlessTitle');

      document.querySelectorAll('.add-bag-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          count++;
          if (countEl) countEl.textContent = String(count);
          if (titleEl) titleEl.textContent = 'Reserved: ' + btn.getAttribute('data-bag');
          if (modal) modal.classList.add('is-open');
        });
      });

      document.querySelectorAll('.hush-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
          var t = tab.getAttribute('data-tab');
          document.querySelectorAll('.hush-tab').forEach(function (b) {
            b.className = b === tab ? '${p}-cta hush-tab' : '${p}-pill hush-tab';
          });
          document.querySelectorAll('.${p}-arch-card').forEach(function (card) {
            var show = t === 'ALL' || card.getAttribute('data-tier') === t;
            card.style.display = show ? 'flex' : 'none';
          });
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 5. QUIET PLACE SANCTUARY (quiet-place-sanctuary — Premium Tier)
  // Serene Forest-Sage & Pixel-Art Pine Island Sanctuary (Quiet Place)
  // ============================================================================
  if (slug === 'quiet-place-sanctuary') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Quiet Place — Where Calm Meets Creativity</title>
  <meta name="description" content="In the rush of life, imagine a space that feels like a deep breath — gentle and grounding. Mindful Tools, Creative Space, and Gentle Reminders.">
  <meta property="og:title" content="Quiet Place Sanctuary — Where Calm Meets Creativity">
  <meta property="og:description" content="Reconnect with your inner stillness beside the pixel-art pine island lake.">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#081815">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #081815;
      --surface: #102823;
      --surface-elevated: #173831;
      --glass: rgba(16, 40, 35, 0.8);
      --fg: #f0fdf4;
      --muted: #a7d7c5;
      --border: rgba(167, 215, 197, 0.22);
      --accent: #fb7185;
      --accent-text: #fda4af;
      --accent-strong: #f43f5e;
      --on-accent: #19070b;
      --font-display: 'Fraunces', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: var(--on-accent); }
    html, body {
      background: radial-gradient(circle at 50% 15%, #163b34 0%, #081815 70%);
      color: var(--fg); font-family: var(--font-sans); overflow-x: clip; scroll-behavior: smooth;
    }
    .skip-link {
      position: fixed; top: -100px; left: 16px; z-index: 10000;
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; text-decoration: none; transition: transform 0.2s var(--ease-out);
    }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--fg); }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0); will-change: transform;
    }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid var(--accent-text); margin: -17px 0 0 -17px; transition: transform 0.22s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }

    .${p}-header {
      position: sticky; top: 14px; z-index: 200; max-width: 1280px; margin: 14px auto 0;
      padding: 12px 24px; border-radius: 999px; background: var(--glass);
      backdrop-filter: blur(16px); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-nav { display: flex; gap: 22px; flex-wrap: wrap; }
    .${p}-nav a { color: var(--muted); text-decoration: none; font-size: 13px; font-weight: 600; transition: color 0.2s var(--ease-out); }
    .${p}-nav a:hover { color: var(--fg); }
    .${p}-btn-cream {
      min-height: 44px; padding: 9px 18px; border-radius: 999px;
      background: rgba(240, 253, 244, 0.08); border: 1px solid var(--border);
      color: var(--fg); font-size: 12px; font-weight: 700; cursor: pointer;
      transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
    }
    .${p}-btn-coral {
      min-height: 44px; padding: 10px 22px; border-radius: 999px;
      background: var(--accent); color: var(--on-accent); border: none;
      font-size: 13px; font-weight: 800; cursor: pointer;
      transition: transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out);
    }
    .${p}-btn-cream:active, .${p}-btn-coral:active { transform: scale(0.97); }

    .${p}-wrap { max-width: 1280px; margin: 0 auto; padding: clamp(32px, 5vw, 68px) clamp(16px, 4vw, 48px); }
    .${p}-hero-box {
      text-align: center; padding: clamp(28px, 4vw, 52px); border-radius: 36px;
      background: linear-gradient(180deg, rgba(23, 56, 49, 0.82) 0%, rgba(10, 27, 23, 0.94) 100%);
      border: 1px solid var(--border); box-shadow: 0 32px 70px rgba(0,0,0,0.45);
    }
    .${p}-h1 {
      font-family: var(--font-display); font-size: clamp(2.8rem, 6vw, 5.1rem);
      font-weight: 600; line-height: 1.02; letter-spacing: -0.02em; margin: 12px auto 16px; max-width: 18ch;
    }
    .${p}-pillars {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 28px 0; text-align: left;
      font-variant-numeric: tabular-nums;
    }
    .${p}-pillar {
      padding: 22px; border-radius: 24px; background: var(--surface); border: 1px solid var(--border);
      transition: transform 0.25s var(--ease-out), opacity 0.25s var(--ease-out);
    }
    .${p}-pillar:hover { transform: translate3d(0, -4px, 0); }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out); }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; pointer-events: none; background: rgba(8, 24, 21, 0.86);
      backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box { pointer-events: auto; max-width: 560px; width: 100%; padding: 32px; border-radius: 28px; background: var(--surface-elevated); border: 1px solid var(--accent); }

    @media (max-width: 1024px) {
      .${p}-pillars { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .${p}-pillars { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .${p}-header { border-radius: 20px; padding: 12px 16px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
    }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to Quiet Place Sanctuary</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <strong style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-size:19px;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12 3-7 9h4l-3 7h12l-3-7h4L12 3z"/></svg>
      Quiet Place
    </strong>
    <nav class="${p}-nav" aria-label="Primary Navigation">
      <a href="#calmHero">Features</a>
      <a href="#breathStudio">Breath Studio</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-btn-cream" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-coral">Start Your Journey →</button>
    </div>
  </header>

  <main id="mainContent">
    <section id="calmHero" class="${p}-wrap">
      <div class="${p}-hero-box">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">MINDFUL DIGITAL SANCTUARY</span>
        <h1 id="oversizedHeadline" class="${p}-h1">Where Calm Meets Creativity.</h1>
        <p style="font-size:16px;color:var(--muted);line-height:1.65;max-width:60ch;margin:0 auto 24px;">
          In the rush of life, imagine a space that feels like a deep breath — gentle and grounding. Here, you can reflect, create, or simply be, with tools to reconnect with your inner stillness.
        </p>

        <div class="${p}-pillars">
          <article class="${p}-pillar ${p}-reveal" data-seamless-trigger="Mindful Tools — Guided Stillness">
            <h2 style="font-family:var(--font-display);font-size:22px;margin-bottom:6px;color:var(--accent-text);">Mindful Tools</h2>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">Thoughtfully designed exercises to help you pause, breathe, and feel present.</p>
          </article>
          <article class="${p}-pillar ${p}-reveal" data-seamless-trigger="Creative Space — Distraction-Free Canvas">
            <h2 style="font-family:var(--font-display);font-size:22px;margin-bottom:6px;color:var(--accent-text);">Creative Space</h2>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">Journal, doodle, or compose ambient notes in a distraction-free forest environment.</p>
          </article>
          <article class="${p}-pillar ${p}-reveal" data-seamless-trigger="Gentle Reminders — Soft Daily Cadence">
            <h2 style="font-family:var(--font-display);font-size:22px;margin-bottom:6px;color:var(--accent-text);">Gentle Reminders</h2>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">Soft nudges that invite you back to stillness without streak anxiety.</p>
          </article>
        </div>

        <!-- Pixel-Art Inspired Pine Island & Fishing Bunny SVG Diorama -->
        <svg viewBox="0 0 760 230" width="100%" height="210" fill="none" aria-hidden="true">
          <ellipse cx="380" cy="188" rx="310" ry="28" fill="#173831"/>
          <ellipse cx="380" cy="175" rx="220" ry="20" fill="#2dd4bf" fill-opacity="0.22"/>
          <polygon points="220,48 185,145 255,145" fill="#34d399"/>
          <polygon points="280,34 240,148 320,148" fill="#10b981"/>
          <polygon points="490,42 452,146 528,146" fill="#34d399"/>
          <!-- Bunny in Red Sweater Fishing by the Lake -->
          <circle cx="375" cy="134" r="14" fill="#f0fdf4"/>
          <rect x="369" y="106" width="5" height="18" rx="2.5" fill="#f0fdf4"/>
          <rect x="377" y="106" width="5" height="18" rx="2.5" fill="#f0fdf4"/>
          <rect x="364" y="144" width="24" height="22" rx="8" fill="#fb7185"/>
          <line x1="388" y1="148" x2="445" y2="122" stroke="#fda4af" stroke-width="2.5"/>
          <line x1="445" y1="122" x2="445" y2="174" stroke="#f0fdf4" stroke-width="1.5" stroke-dasharray="3 3"/>
        </svg>

        <!-- One Live Thing: Interactive Soundscape & 4-7-8 Breath Cadence Studio -->
        <article id="breathStudio" style="margin-top:24px;padding:24px;border-radius:24px;background:var(--surface);border:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;font-variant-numeric:tabular-nums;">
          <div style="text-align:left;">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">LIVE SOUNDSCAPE &amp; BREATH CADENCE</span>
            <h3 id="soundStatusText" style="font-size:19px;margin-top:4px;">Pine Wind &amp; Lake Ripple • <span data-counter-target="432" data-counter-suffix="Hz">432Hz</span></h3>
          </div>
          <div role="group" aria-label="Select Ambient Soundscape" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-coral sound-btn" data-sound="Pine Wind &amp; Lake Ripple • 432Hz">Pine Wind</button>
            <button type="button" class="${p}-btn-cream sound-btn" data-sound="Evening Campfire &amp; Crickets • 528Hz">Evening Crickets</button>
            <button type="button" class="${p}-btn-cream sound-btn" data-sound="Gentle Mountain Rain • 396Hz">Mountain Rain</button>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
    <span style="font-size:13px;color:var(--muted);">© 2026 Quiet Place Sanctuary. Crafted for Inner Stillness.</span>
    <span style="font-size:12px;font-family:var(--font-mono);color:var(--accent-text);">4-7-8 BREATH • PINE ISLAND</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">SANCTUARY SESSION</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-cream">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:10px;">Begin Your Quiet Journey</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Take a slow 4-second inhale, hold gently for 7 seconds, and exhale for 8 seconds beside the pine island lake.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-coral" style="width:100%;">Return to Pine Island</button>
    </div>
  </div>

  <script>
    (function () {
      var statusEl = document.getElementById('soundStatusText');
      document.querySelectorAll('.sound-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.sound-btn').forEach(function (b) {
            b.className = b === btn ? '${p}-btn-coral sound-btn' : '${p}-btn-cream sound-btn';
          });
          if (statusEl) statusEl.textContent = btn.getAttribute('data-sound');
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  return null;
}
