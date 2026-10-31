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
  },
  'dotdna-cyber': {
    id: 'bioluminescent-cyber-mesh',
    brandTitle: 'DotDNA Cyber',
    category: 'commerce',
    headlineSub: 'Bioluminescent emerald #041A0E & acid-green #65E819 cyber-security architecture — defending the digital on the dot with interactive zero-trust posture scanning and 3D particle wave.'
  },
  'polkacrypto-future': {
    id: 'parachain-chartreuse-crypto',
    brandTitle: 'PolkaCrypto Future',
    category: 'commerce',
    headlineSub: 'Obsidian grid & neon chartreuse #B8FF01 Polkadot parachain investing platform featuring tilted 3D dual mobile terminals, 01–03 security cards, and live ETH/DOT staking simulator.'
  },
  'nexora-alex-portfolio': {
    id: 'cosmic-violet-creative-folio',
    brandTitle: 'Nexora Alex Portfolio',
    category: 'portfolio',
    headlineSub: 'Deep cosmic indigo #080711 & electric violet #8B5CF6 creative designer portfolio for Alex Carter with filterable case-study showcase, 4-pillar service matrix, and client testimonials.'
  },
  'kata-ocado-portfolio': {
    id: 'editorial-plum-art-direction',
    brandTitle: 'Kata Ocado Portfolio',
    category: 'portfolio',
    headlineSub: 'Editorial plum-violet #2A1B3D & warm amber-gold #F59E0B Art Director & Graphic Designer studio for Kathleen Anne "Kata" Ocado with interactive Adobe/Figma proficiency matrix.'
  },
  'glitch-cyberwear': {
    id: 'cutout-samurai-techwear',
    brandTitle: 'Glitch Cyberwear',
    category: 'commerce',
    headlineSub: 'Monochrome obsidian & pure white inverted cutout frame techwear store featuring cyber-samurai 3D operative callout pins (NeuroVibe MK-I, VoidBlade, Shadow Circuit Jacket, Crimson Phantom).'
  },
  'ozzies-pretzels': {
    id: 'artisan-bakery-crimson-cream',
    brandTitle: "Ozzie's Pretzels",
    category: 'commerce',
    headlineSub: "Denver's favorite hand-rolled Bavarian pretzels delivered fresh to your door — crimson-and-cream bakery showcase with interactive box builder, 4-step baking craft, and gift bundles."
  },
  'terrarium-deck-studio': {
    id: 'pastel-biodome-deck-bento',
    brandTitle: 'Terrarium Deck Studio',
    category: 'portfolio',
    headlineSub: 'Iridescent pastel glass biodome & architectural terrarium presentation system with 12-slide Bento storyboard, interactive biome light inspector, and botanical telemetry.'
  },
  'foods-gourmet-bowl': {
    id: 'saffron-charcoal-food-ordering',
    brandTitle: 'Foods Gourmet Bowl',
    category: 'commerce',
    headlineSub: 'Interactive gourmet bowl & street-food ordering showcase featuring live quantity stepper, real-time Total Order calculator, and instant Burger ($3.25), Cake ($2.25), and Salad ($5.25) switcher.'
  },
  'visionglass-neo-ui': {
    id: 'spatial-visionos-glass-workbench',
    brandTitle: 'VisionGlass Neo UI',
    category: 'portfolio',
    headlineSub: 'Neo-Apple Vision Pro spatial UI design system featuring pastel aurora 3D glass refraction, interactive rotary depth dial, tactile spatial toggles, and live CSS glass token generator.'
  },
  'o2-moonish-cosmic': {
    id: 'desert-glass-sphere-streetwear',
    brandTitle: 'O2 Moonish Cosmic',
    category: 'commerce',
    headlineSub: 'O2 Studio Moonish Cosmic Set 23 — Late 2050 desert-glass capsule collection featuring 01 Classic Hoodie encased in a 3D translucent sphere, Nike dune sneakers, and live fabric colorway switcher.'
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

  // ============================================================================
  // 6. DOTDNA CYBER (t176 — Free Tier)
  // Deep Bioluminescent Emerald #041A0E & Acid-Green #65E819 Cyber Security Architecture
  // ============================================================================
  if (slug === 'dotdna-cyber') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>DOTDNA — Defending the Digital on the Dot | Cyber Security by Design</title>
  <meta name="description" content="We assist our clients in integrating cyber security by design in their digital transformation.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #041A0E;
      --surface: #082917;
      --surface-glass: rgba(8, 41, 23, 0.82);
      --fg: #ECFDF5;
      --muted: #A7F3D0;
      --border: rgba(101, 232, 25, 0.24);
      --accent: #65E819;
      --accent-text: #86EFAC;
      --accent-strong: #79F72D;
      --on-accent: #041A0E;
      --font-display: 'Syne', sans-serif;
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
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid #FFFFFF; outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    button, [role="button"] {
      transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }
    button:active, [role="button"]:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid var(--accent); margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 0; z-index: 220;
      background: rgba(4, 26, 14, 0.88); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .${p}-wrap { max-width: 1340px; margin: 0 auto; padding: 20px clamp(20px, 4vw, 60px); }
    .${p}-nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    .${p}-brand {
      font-family: var(--font-display); font-weight: 800; font-size: 24px;
      letter-spacing: 0.08em; color: #FFFFFF; text-decoration: none;
      display: inline-flex; align-items: center; gap: 10px;
    }
    .${p}-dock {
      display: inline-flex; gap: 8px; padding: 6px 10px; border-radius: 999px;
      background: var(--surface-glass); border: 1px solid var(--border);
    }
    .${p}-dock a {
      color: var(--fg); text-decoration: none; font-size: 13px; font-weight: 600;
      padding: 6px 14px; border-radius: 999px;
    }
    .${p}-dock a:hover { background: rgba(101, 232, 25, 0.16); color: var(--accent); }
    .${p}-btn-acid {
      padding: 11px 22px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; font-size: 13px; border: none; cursor: pointer;
    }
    .${p}-btn-ghost {
      padding: 9px 16px; border-radius: 999px; background: rgba(255,255,255,0.06);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      position: relative; padding: clamp(48px, 7vw, 88px) 0;
      display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 800;
      font-size: clamp(44px, 6.2vw, 82px); line-height: 0.98; letter-spacing: -0.03em;
      margin: 14px 0 20px;
    }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 700;
      font-size: clamp(30px, 4vw, 48px); line-height: 1.06; margin-bottom: 16px;
    }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 24px; }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 22px; padding: 26px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 18px, 0);
      transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; background: rgba(4, 26, 14, 0.86);
      backdrop-filter: blur(14px); display: none; align-items: center; justify-content: center;
      padding: 20px; pointer-events: none;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px; width: 100%; border-radius: 24px; background: var(--surface);
      border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 1024px) { .${p}-hero, .${p}-grid-3 { grid-template-columns: 1fr; } }
    @media (max-width: 768px) { .${p}-dock { display: none; } }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-wrap ${p}-nav">
      <a href="#heroStage" class="${p}-brand">
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="11" stroke="#65E819" stroke-width="2.5" stroke-dasharray="4 3"/>
          <circle cx="14" cy="14" r="4" fill="#65E819"/>
        </svg>
        <span>DOTDNA</span>
      </a>
      <nav class="${p}-dock" aria-label="DotDNA Navigation">
        <a href="#heroStage">Home</a>
        <a href="#servicesGrid">Services +</a>
        <a href="#threatScanner">Product</a>
        <a href="#aboutPosture">About</a>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-acid" data-next-preview>Contact us ↗</button>
      </div>
    </div>
  </header>

  <main id="mainContent" class="${p}-wrap">
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <div>
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);letter-spacing:0.18em;">| CYBER SECURITY BY DESIGN</span>
        <h1 id="oversizedHeadline" class="${p}-h1">
          Defending the Digital <span style="color:var(--accent);">on the Dot.</span>
        </h1>
        <p style="font-size:17px;color:var(--muted);line-height:1.65;max-width:54ch;margin-bottom:28px;">
          We assist our clients in integrating cyber security by design in their digital transformation — securing cloud meshes, zero-trust APIs, and post-quantum telemetry.
        </p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <button type="button" class="${p}-btn-acid" data-seamless-trigger="DotDNA Zero-Trust Architecture Audit">Deploy DotDNA Shield</button>
          <a href="#threatScanner" class="${p}-btn-ghost" style="text-decoration:none;padding:11px 20px;">Run Posture Scan</a>
        </div>
      </div>

      <!-- Bioluminescent Particle Wave SVG Sculpture -->
      <div class="${p}-card tabular-nums" style="background:radial-gradient(circle at 50% 40%, rgba(101,232,25,0.22), rgba(8,41,23,0.95));">
        <svg viewBox="0 0 460 250" width="100%" height="220" fill="none" aria-hidden="true">
          <path d="M20 180 C 120 60, 220 220, 320 90 C 380 30, 420 140, 440 110" stroke="#65E819" stroke-width="3" stroke-dasharray="4 6"/>
          <path d="M20 140 C 130 210, 250 40, 360 160 C 400 190, 430 90, 440 130" stroke="#86EFAC" stroke-width="2" stroke-opacity="0.7"/>
          <circle cx="145" cy="126" r="6" fill="#65E819"/>
          <circle cx="268" cy="112" r="8" fill="#65E819"/>
          <circle cx="358" cy="158" r="6" fill="#ECFDF5"/>
        </svg>
        <div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:14px;margin-top:10px;font-family:var(--font-mono);font-size:12px;">
          <span>NODE INTEGRITY: <strong data-counter-target="99" data-counter-suffix=".98%">99.98%</strong></span>
          <span style="color:var(--accent);">DOT-MESH ACTIVE</span>
        </div>
      </div>
    </section>

    <!-- ONE LIVE THING: ZERO-TRUST POSTURE SCANNER -->
    <section id="threatScanner" style="padding:40px 0;" aria-labelledby="scanHeading">
      <div class="${p}-card tabular-nums">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:18px;">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">LIVE POSTURE TELEMETRY</span>
            <h2 id="scanHeading" class="${p}-h2" style="margin-bottom:4px;">Zero-Trust Surface Inspector</h2>
          </div>
          <div role="group" aria-label="Select Security Layer" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-acid scan-btn" data-layer="Edge API Gateway • 0 Open CVEs • TLS 1.3 Strict">Edge Gateway</button>
            <button type="button" class="${p}-btn-ghost scan-btn" data-layer="Kubernetes Mesh • mTLS Enforced • 412 Pods Verified">K8s Workload Mesh</button>
            <button type="button" class="${p}-btn-ghost scan-btn" data-layer="Identity Perimeter • FIDO2 Hardware Keys • 0 Anomalies">IAM Perimeter</button>
          </div>
        </div>
        <p id="scanLayerOutput" style="font-family:var(--font-mono);font-size:14px;color:var(--accent-text);padding:14px;border-radius:14px;background:var(--bg);border:1px solid var(--border);">
          Edge API Gateway • 0 Open CVEs • TLS 1.3 Strict
        </p>
      </div>
    </section>

    <section id="servicesGrid" style="padding:28px 0 64px;" aria-labelledby="srvHeading">
      <h2 id="srvHeading" class="${p}-h2">Security Architecture Pillars</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Zero-Trust Cloud Architecture">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">01 / CLOUD MESH</span>
          <h3 style="font-size:21px;margin:8px 0;">Security by Design</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Threat modeling embedded directly into CI/CD pipelines before code reaches production.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Continuous Red-Team Telemetry">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">02 / OFFENSIVE OPS</span>
          <h3 style="font-size:21px;margin:8px 0;">Automated Red Teaming</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Continuous breach simulation across hybrid cloud and enterprise identity graphs.</p>
        </article>
        <article id="aboutPosture" class="${p}-card ${p}-reveal" data-seamless-trigger="ISO 27001 &amp; NIS2 Compliance">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">03 / GOVERNANCE</span>
          <h3 style="font-size:21px;margin:8px 0;">NIS2 &amp; DORA Readiness</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Cryptographic audit logs and automated compliance evidence for regulated enterprises.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 DOTDNA Cyber Security Architecture. All rights reserved.</span>
    <span style="font-family:var(--font-mono);color:var(--accent);">SOC2 TYPE II • ISO 27001</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">DOTDNA ADVISORY</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:10px;">Schedule Security Architecture Review</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Connect with a principal DotDNA security architect to map your zero-trust transformation roadmap.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-acid" style="width:100%;">Confirm Encrypted Briefing</button>
    </div>
  </div>

  <script>
    (function () {
      var out = document.getElementById('scanLayerOutput');
      document.querySelectorAll('.scan-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.scan-btn').forEach(function (b) {
            b.className = b === btn ? '${p}-btn-acid scan-btn' : '${p}-btn-ghost scan-btn';
          });
          if (out) out.textContent = btn.getAttribute('data-layer');
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 7. POLKACRYPTO FUTURE (t177 — Free Tier)
  // Obsidian Grid #0B0D0E & Neon Chartreuse #B8FF01 Polkadot Parachain & Crypto Platform
  // ============================================================================
  if (slug === 'polkacrypto-future') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>CRYPTO. — Best Crypto Investing Platform for Your Future</title>
  <meta name="description" content="Keep your money safe. Your trusted partner of cryptocurrency with 168K+ realtime users, institutional custody, and Polkadot parachain staking.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0B0D0E;
      --surface: #14181B;
      --surface-elevated: #1D2328;
      --fg: #F8FAFC;
      --muted: #94A3B8;
      --border: rgba(255, 255, 255, 0.12);
      --accent: #B8FF01;
      --accent-text: #D9FF66;
      --accent-strong: #C9FF33;
      --on-accent: #0B0D0E;
      --font-display: 'Space Grotesk', sans-serif;
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
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid #FFFFFF; outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    button, [role="button"] {
      transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }
    button:active, [role="button"]:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid var(--accent); margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 0; z-index: 220;
      background: rgba(11, 13, 14, 0.88); backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border);
    }
    .${p}-wrap { max-width: 1340px; margin: 0 auto; padding: 20px clamp(20px, 4vw, 60px); }
    .${p}-nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    .${p}-brand {
      font-family: var(--font-display); font-weight: 700; font-size: 24px;
      color: #FFFFFF; text-decoration: none; letter-spacing: -0.03em;
    }
    .${p}-brand span { color: var(--accent); }
    .${p}-links { display: flex; gap: 26px; list-style: none; }
    .${p}-links a { color: var(--fg); text-decoration: none; font-size: 14px; font-weight: 500; }
    .${p}-links a:hover { color: var(--accent); }
    .${p}-btn-lime {
      padding: 11px 22px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; font-size: 13px; border: none; cursor: pointer;
    }
    .${p}-btn-ghost {
      padding: 9px 16px; border-radius: 999px; background: rgba(255,255,255,0.06);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      padding: clamp(44px, 6vw, 80px) 0;
      display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 700;
      font-size: clamp(42px, 6vw, 76px); line-height: 1.02; letter-spacing: -0.03em;
      margin: 12px 0 20px;
    }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 700;
      font-size: clamp(30px, 4.2vw, 48px); line-height: 1.06; margin-bottom: 18px;
    }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 28px;
    }
    .${p}-card-lime {
      background: var(--accent); color: var(--on-accent); border-radius: 24px; padding: 28px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 18px, 0);
      transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; background: rgba(11, 13, 14, 0.86);
      backdrop-filter: blur(14px); display: none; align-items: center; justify-content: center;
      padding: 20px; pointer-events: none;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px; width: 100%; border-radius: 24px; background: var(--surface);
      border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 1024px) { .${p}-hero, .${p}-grid-3 { grid-template-columns: 1fr; } }
    @media (max-width: 768px) { .${p}-links { display: none; } }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-wrap ${p}-nav">
      <a href="#heroStage" class="${p}-brand">CRYPTO<span>.</span></a>
      <nav aria-label="Crypto Platform Navigation">
        <ul class="${p}-links">
          <li><a href="#heroStage">Home</a></li>
          <li><a href="#partnerSection">Services</a></li>
          <li><a href="#stakingSimulator">About</a></li>
          <li><a href="#analyticsSpline">What's new?</a></li>
        </ul>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-lime" data-next-preview>Explore now</button>
      </div>
    </div>
  </header>

  <main id="mainContent" class="${p}-wrap">
    <!-- HERO -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <div>
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);letter-spacing:0.14em;">KEEP YOUR MONEY SAFE !</span>
        <h1 id="oversizedHeadline" class="${p}-h1">
          Best crypto investing platform for your future.
        </h1>
        <p style="font-size:16px;color:var(--muted);line-height:1.65;max-width:54ch;margin-bottom:24px;">
          Trade, stake, and secure Polkadot parachain assets and institutional-grade portfolios with real-time on-chain proof of reserves.
        </p>
        <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;" class="tabular-nums">
          <button type="button" class="${p}-btn-lime" data-seamless-trigger="CRYPTO. — Open Institutional Vault">Start Investing →</button>
          <div>
            <strong data-counter-target="168" data-counter-suffix="K+" style="font-family:var(--font-display);font-size:28px;color:var(--accent);display:block;">168K+</strong>
            <span style="font-size:12px;color:var(--muted);">Realtime Users</span>
          </div>
        </div>
      </div>

      <!-- Dual Tilted 3D Mobile Terminal Card -->
      <div class="${p}-card tabular-nums" style="background:linear-gradient(145deg, #181E22, #0F1315);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">POLKADOT PARACHAIN TERMINAL</span>
          <span style="padding:4px 10px;border-radius:999px;background:rgba(184,255,1,0.16);color:var(--accent);font-size:12px;font-weight:700;">+45.66% APY</span>
        </div>
        <strong style="font-family:var(--font-display);font-size:36px;display:block;margin-bottom:12px;">9.872098 ETH</strong>
        <svg viewBox="0 0 420 130" width="100%" height="120" fill="none" aria-hidden="true">
          <path d="M10 105 C 85 95, 120 40, 190 58 C 260 76, 310 18, 410 24" stroke="#B8FF01" stroke-width="3.5"/>
          <circle cx="190" cy="58" r="6" fill="#B8FF01"/>
          <circle cx="410" cy="24" r="7" fill="#FFFFFF"/>
        </svg>
        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px;color:var(--muted);margin-top:10px;">
          <span>$4,528 USD / ETH</span>
          <span>144,528 BTC VOL</span>
        </div>
      </div>
    </section>

    <!-- 01, 02, 03 PARTNER CARDS -->
    <section id="partnerSection" style="padding:36px 0;" aria-labelledby="partnerHeading">
      <h2 id="partnerHeading" class="${p}-h2">Your trusted partner of cryptocurrency.</h2>
      <div class="${p}-grid-3 tabular-nums">
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:14px;color:var(--accent);">01.</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Service for Any Level of Expertise.</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Guided parachain indexing for first-time allocators and FIX API execution for funds.</p>
        </article>
        <article class="${p}-card-lime ${p}-reveal" data-seamless-trigger="Industry Best Practices Security Whitepaper">
          <span style="font-family:var(--font-mono);font-size:14px;font-weight:700;">02.</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Industry best practices.</h3>
          <p style="font-size:14px;line-height:1.6;margin-bottom:14px;">Multi-party computation (MPC) cold storage and real-time Merkle-tree reserve audits.</p>
          <span style="font-weight:700;font-size:13px;">Learn More →</span>
        </article>
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:14px;color:var(--accent);">03.</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:10px 0;">Protected by insurance.</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">$250M Lloyd's syndicated custody coverage across all staked validator nodes.</p>
        </article>
      </div>
    </section>

    <!-- ONE LIVE THING: STAKING & YIELD SIMULATOR -->
    <section id="stakingSimulator" style="padding:36px 0 64px;" aria-labelledby="stakeHeading">
      <div id="analyticsSpline" class="${p}-card tabular-nums">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:18px;">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">TRUSTED PLATFORM ANYTIME &amp; ANYWHERE</span>
            <h2 id="stakeHeading" class="${p}-h2" style="margin-bottom:0;">Live Parachain Yield Simulator</h2>
          </div>
          <div role="group" aria-label="Select Crypto Asset" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-lime asset-btn" data-asset="Polkadot (DOT) • 14.8% APY •Est. Annual Yield: $6,701 USD">Polkadot (DOT)</button>
            <button type="button" class="${p}-btn-ghost asset-btn" data-asset="Ethereum (ETH) • 4.6% APY • Est. Annual Yield: $4,528 USD">Ethereum (ETH)</button>
            <button type="button" class="${p}-btn-ghost asset-btn" data-asset="Bitcoin Vault (wBTC) • 3.2% APY • Est. Annual Yield: $9,120 USD">Bitcoin (BTC)</button>
          </div>
        </div>
        <p id="stakeYieldOutput" style="font-family:var(--font-mono);font-size:14px;color:var(--accent-text);padding:16px;border-radius:14px;background:var(--bg);border:1px solid var(--border);">
          Polkadot (DOT) • 14.8% APY • Est. Annual Yield: $6,701 USD
        </p>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 CRYPTO. Parachain Financial Technologies.</span>
    <span style="font-family:var(--font-mono);color:var(--accent);">168K+ REALTIME USERS • MPC CUSTODY</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">CRYPTO. VAULT ONBOARDING</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:10px;">Connect Hardware Wallet</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Activate non-custodial Polkadot parachain staking and instant USD liquidity lines in under 60 seconds.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-lime" style="width:100%;">Launch Web3 Terminal</button>
    </div>
  </div>

  <script>
    (function () {
      var out = document.getElementById('stakeYieldOutput');
      document.querySelectorAll('.asset-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.asset-btn').forEach(function (b) {
            b.className = b === btn ? '${p}-btn-lime asset-btn' : '${p}-btn-ghost asset-btn';
          });
          if (out) out.textContent = btn.getAttribute('data-asset');
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 8. NEXORA ALEX PORTFOLIO (t178 — Premium Tier)
  // Deep Cosmic Indigo #080711 & Electric Violet #8B5CF6 Creative Designer Portfolio
  // ============================================================================
  if (slug === 'nexora-alex-portfolio') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Nexora — Alex Carter | Creative Designer &amp; Brand Architect</title>
  <meta name="description" content="Hi, I'm Alex Carter — Creative Designer turning ideas into beautiful UI/UX, brand identity, and web design systems.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #080711;
      --surface: #121024;
      --surface-elevated: #1B1836;
      --fg: #F8FAFC;
      --muted: #A5B4FC;
      --border: rgba(139, 92, 246, 0.25);
      --accent: #8B5CF6;
      --accent-text: #C4B5FD;
      --accent-strong: #A78BFA;
      --on-accent: #FFFFFF;
      --font-display: 'Outfit', sans-serif;
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
      padding: 10px 18px; border-radius: 999px; background: var(--accent); color: #FFFFFF;
      font-weight: 700; font-size: 13px; text-decoration: none;
      transition: transform 0.25s var(--ease-out);
    }
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid #FFFFFF; outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 3px; }
    button, [role="button"] {
      transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }
    button:active, [role="button"]:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid var(--accent-text); margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent-text); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 0; z-index: 220;
      background: rgba(8, 7, 17, 0.88); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .${p}-wrap { max-width: 1320px; margin: 0 auto; padding: 20px clamp(20px, 4vw, 60px); }
    .${p}-nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    .${p}-brand {
      font-family: var(--font-display); font-weight: 800; font-size: 24px;
      color: #FFFFFF; text-decoration: none; display: inline-flex; align-items: center; gap: 10px;
    }
    .${p}-links { display: flex; gap: 24px; list-style: none; }
    .${p}-links a { color: var(--fg); text-decoration: none; font-size: 14px; font-weight: 500; }
    .${p}-links a:hover { color: var(--accent-text); }
    .${p}-btn-violet {
      padding: 11px 22px; border-radius: 999px; background: var(--accent); color: #FFFFFF;
      font-weight: 700; font-size: 13px; border: none; cursor: pointer;
    }
    .${p}-btn-ghost {
      padding: 9px 16px; border-radius: 999px; background: rgba(255,255,255,0.06);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      padding: clamp(44px, 6vw, 80px) 0;
      display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 800;
      font-size: clamp(42px, 5.8vw, 74px); line-height: 1.02; letter-spacing: -0.03em;
      margin: 12px 0 18px;
    }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 700;
      font-size: clamp(30px, 4vw, 46px); line-height: 1.08; margin-bottom: 18px;
    }
    .${p}-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0 48px; }
    .${p}-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 22px; padding: 26px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 18px, 0);
      transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; background: rgba(8, 7, 17, 0.86);
      backdrop-filter: blur(14px); display: none; align-items: center; justify-content: center;
      padding: 20px; pointer-events: none;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px; width: 100%; border-radius: 24px; background: var(--surface);
      border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 1024px) {
      .${p}-hero, .${p}-stats-row, .${p}-grid-2, .${p}-grid-3 { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) { .${p}-links { display: none; } }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-wrap ${p}-nav">
      <a href="#heroStage" class="${p}-brand">
        <span style="width:28px;height:28px;border-radius:8px;background:var(--accent);display:inline-flex;align-items:center;justify-content:center;font-size:15px;">N</span>
        <span>Nexora</span>
      </a>
      <nav aria-label="Nexora Portfolio Navigation">
        <ul class="${p}-links">
          <li><a href="#heroStage">Home</a></li>
          <li><a href="#servicesSection">Services</a></li>
          <li><a href="#portfolioWorkbench">Portfolio</a></li>
          <li><a href="#testimonialsSection">Reviews</a></li>
        </ul>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-violet" data-next-preview>Let's Talk →</button>
      </div>
    </div>
  </header>

  <main id="mainContent" class="${p}-wrap">
    <!-- HERO -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <div>
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);letter-spacing:0.14em;">CREATIVE PORTFOLIO • ALEX CARTER</span>
        <h1 id="oversizedHeadline" class="${p}-h1">
          Hi, I'm Alex Carter — <span style="color:var(--accent-text);">Creative Designer</span>
        </h1>
        <p style="font-size:16px;color:var(--muted);line-height:1.65;max-width:54ch;margin-bottom:26px;">
          Turning complex product ideas into luminous digital experiences across UI/UX Design, Brand Identity, and interactive design systems.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="#portfolioWorkbench" class="${p}-btn-violet" style="text-decoration:none;">View My Work →</a>
          <button type="button" class="${p}-btn-ghost" data-seamless-trigger="Book Discovery Call with Alex Carter">Download CV</button>
        </div>
      </div>

      <div class="${p}-card" style="text-align:center;background:radial-gradient(circle at 50% 35%, rgba(139,92,246,0.32), rgba(18,16,36,0.96));">
        <svg viewBox="0 0 320 220" width="100%" height="200" fill="none" aria-hidden="true">
          <circle cx="160" cy="110" r="76" stroke="#8B5CF6" stroke-width="2.5" stroke-dasharray="6 4"/>
          <circle cx="160" cy="92" r="28" fill="#C4B5FD"/>
          <path d="M108 176c10-32 94-32 104 0" fill="#8B5CF6"/>
        </svg>
        <p style="font-family:var(--font-display);font-size:20px;color:var(--accent-text);margin-top:8px;">"Design Creates Value"</p>
      </div>
    </section>

    <!-- 4 METRIC CARDS -->
    <section class="${p}-stats-row tabular-nums" aria-label="Career Metrics">
      <div class="${p}-card"><strong data-counter-target="100" data-counter-suffix="+" style="font-family:var(--font-display);font-size:34px;color:var(--accent-text);display:block;">100+</strong><span style="font-size:13px;color:var(--muted);">Projects Completed</span></div>
      <div class="${p}-card"><strong data-counter-target="80" data-counter-suffix="+" style="font-family:var(--font-display);font-size:34px;color:var(--accent-text);display:block;">80+</strong><span style="font-size:13px;color:var(--muted);">Happy Clients</span></div>
      <div class="${p}-card"><strong style="font-family:var(--font-display);font-size:34px;color:var(--accent-text);display:block;">5.0</strong><span style="font-size:13px;color:var(--muted);">Client Ratings</span></div>
      <div class="${p}-card"><strong data-counter-target="3" data-counter-suffix="+ Years" style="font-family:var(--font-display);font-size:34px;color:var(--accent-text);display:block;">3+ Years</strong><span style="font-size:13px;color:var(--muted);">Design Experience</span></div>
    </section>

    <!-- ONE LIVE THING: FILTERABLE RECENT PROJECTS -->
    <section id="portfolioWorkbench" style="padding:24px 0 56px;" aria-labelledby="projHeading">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:22px;">
        <div>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">SELECTED CASE STUDIES</span>
          <h2 id="projHeading" class="${p}-h2" style="margin-bottom:0;">My Recent Projects</h2>
        </div>
        <div role="group" aria-label="Filter Projects by Discipline" style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="${p}-btn-violet filter-btn" data-cat="all">All</button>
          <button type="button" class="${p}-btn-ghost filter-btn" data-cat="branding">Branding</button>
          <button type="button" class="${p}-btn-ghost filter-btn" data-cat="web">Web Design</button>
          <button type="button" class="${p}-btn-ghost filter-btn" data-cat="graphics">Graphics</button>
        </div>
      </div>

      <div class="${p}-grid-2">
        <article class="${p}-card proj-item" data-proj-cat="web" data-seamless-trigger="Case Study — Nova Fintech SaaS Platform">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">WEB DESIGN • SAAS</span>
          <h3 style="font-size:22px;margin:8px 0;">Nova AI Financial Workspace</h3>
          <p style="font-size:14px;color:var(--muted);">Multi-currency treasury dashboard and design token library.</p>
        </article>
        <article class="${p}-card proj-item" data-proj-cat="branding" data-seamless-trigger="Case Study — Lumina Audio Brand Identity">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">BRANDING • PACKAGING</span>
          <h3 style="font-size:22px;margin:8px 0;">Lumina Spatial Acoustics</h3>
          <p style="font-size:14px;color:var(--muted);">Visual identity, custom wordmark, and 3D retail packaging system.</p>
        </article>
        <article class="${p}-card proj-item" data-proj-cat="web" data-seamless-trigger="Case Study — Veloce Web3 Exchange">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">WEB DESIGN • UI/UX</span>
          <h3 style="font-size:22px;margin:8px 0;">Veloce Perpetual DEX</h3>
          <p style="font-size:14px;color:var(--muted);">Low-latency orderbook interface and mobile companion wallet.</p>
        </article>
        <article class="${p}-card proj-item" data-proj-cat="graphics" data-seamless-trigger="Case Study — Kinetic 3D Poster Series">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">GRAPHICS • ART DIRECTION</span>
          <h3 style="font-size:22px;margin:8px 0;">Chroma 3D Editorial Type</h3>
          <p style="font-size:14px;color:var(--muted);">Custom procedural shaders and exhibition poster system.</p>
        </article>
      </div>
    </section>

    <!-- SERVICES & TESTIMONIALS -->
    <section id="servicesSection" style="padding:24px 0 64px;" aria-labelledby="testHeading">
      <h2 id="testHeading" class="${p}-h2">What My Clients Say</h2>
      <div id="testimonialsSection" class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal">
          <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:14px;">"Alex transformed our SaaS onboarding flow, lifting trial-to-paid conversion by 38% in six weeks."</p>
          <strong style="font-size:15px;">Sarah Mitchell — VP Product</strong>
        </article>
        <article class="${p}-card ${p}-reveal">
          <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:14px;">"Every Figma component and motion spec was production-ready on day one."</p>
          <strong style="font-size:15px;">James Walker — Founder</strong>
        </article>
        <article class="${p}-card ${p}-reveal">
          <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:14px;">"Our rebrand stood out immediately during our Series A pitch deck roadshow."</p>
          <strong style="font-size:15px;">Emily Carter — Creative Lead</strong>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 Nexora — Alex Carter Creative Studio. hello@nexora.com</span>
    <span style="font-family:var(--font-mono);color:var(--accent-text);">AVAILABLE FOR Q4 SPRINT</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">NEXORA PROJECT BRIEF</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:10px;">Let's Work Together</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Share your product timeline and scope to lock in a dedicated design sprint with Alex Carter.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-violet" style="width:100%;">Send Project Inquiry</button>
    </div>
  </div>

  <script>
    (function () {
      var items = document.querySelectorAll('.proj-item');
      document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var cat = btn.getAttribute('data-cat') || 'all';
          document.querySelectorAll('.filter-btn').forEach(function (b) {
            b.className = b === btn ? '${p}-btn-violet filter-btn' : '${p}-btn-ghost filter-btn';
          });
          items.forEach(function (el) {
            var match = cat === 'all' || el.getAttribute('data-proj-cat') === cat;
            el.style.display = match ? 'block' : 'none';
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
  // 9. KATA OCADO PORTFOLIO (t179 — Premium Tier)
  // Editorial Plum-Violet #2A1B3D, Warm Amber Gold #F59E0B, & Alabaster Cream Art Direction
  // ============================================================================
  if (slug === 'kata-ocado-portfolio') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Kathleen Anne "Kata" Ocado — Portfolio &amp; Resume | Art Director &amp; Graphic Designer</title>
  <meta name="description" content="Hello! I am Kathleen Anne Ocado, Kata for short — 7 years experience as Graphic Designer & Art Director across Brand Design, Print, Social Media, and Web UI.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #1F142E;
      --surface: #2C1D42;
      --surface-cream: #F5F2EB;
      --fg: #FAF8F5;
      --muted: #D8CBEB;
      --border: rgba(245, 158, 11, 0.28);
      --accent: #F59E0B;
      --accent-text: #FCD34D;
      --accent-strong: #FBBF24;
      --on-accent: #1F142E;
      --font-display: 'Fraunces', Georgia, serif;
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
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid #FFFFFF; outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 3px; }
    button, [role="button"] {
      transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }
    button:active, [role="button"]:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid var(--accent); margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 0; z-index: 220;
      background: rgba(31, 20, 46, 0.9); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .${p}-wrap { max-width: 1320px; margin: 0 auto; padding: 20px clamp(20px, 4vw, 60px); }
    .${p}-nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    .${p}-brand {
      font-family: var(--font-display); font-weight: 700; font-size: 24px;
      color: var(--fg); text-decoration: none;
    }
    .${p}-links { display: flex; gap: 24px; list-style: none; }
    .${p}-links a { color: var(--fg); text-decoration: none; font-size: 14px; font-weight: 500; }
    .${p}-links a:hover { color: var(--accent-text); }
    .${p}-btn-gold {
      padding: 11px 22px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 700; font-size: 13px; border: none; cursor: pointer;
    }
    .${p}-btn-ghost {
      padding: 9px 16px; border-radius: 999px; background: rgba(255,255,255,0.08);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-hero {
      padding: clamp(44px, 6vw, 80px) 0;
      display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 36px; align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 700;
      font-size: clamp(42px, 5.8vw, 72px); line-height: 1.02; letter-spacing: -0.02em;
      margin: 12px 0 18px;
    }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 700;
      font-size: clamp(28px, 4vw, 44px); line-height: 1.08; margin-bottom: 18px;
    }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 28px;
    }
    .${p}-pill-gold {
      display: inline-flex; padding: 8px 16px; border-radius: 999px;
      background: rgba(245, 158, 11, 0.16); border: 1px solid var(--border);
      color: var(--accent-text); font-weight: 600; font-size: 13px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 18px, 0);
      transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; background: rgba(31, 20, 46, 0.86);
      backdrop-filter: blur(14px); display: none; align-items: center; justify-content: center;
      padding: 20px; pointer-events: none;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px; width: 100%; border-radius: 24px; background: var(--surface);
      border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 1024px) { .${p}-hero, .${p}-grid-3 { grid-template-columns: 1fr; } }
    @media (max-width: 768px) { .${p}-links { display: none; } }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-wrap ${p}-nav">
      <a href="#heroStage" class="${p}-brand">Kata Ocado.</a>
      <nav aria-label="Kata Ocado Portfolio Navigation">
        <ul class="${p}-links">
          <li><a href="#heroStage">About Kata</a></li>
          <li><a href="#expertiseSection">Expertise</a></li>
          <li><a href="#softwareMatrix">Software Skills</a></li>
          <li><a href="#experienceTimeline">Education &amp; CV</a></li>
        </ul>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-gold" data-next-preview>Let's Talk!</button>
      </div>
    </div>
  </header>

  <main id="mainContent" class="${p}-wrap">
    <!-- HERO -->
    <section id="heroStage" class="${p}-hero" aria-labelledby="oversizedHeadline">
      <div>
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);letter-spacing:0.14em;">PORTFOLIO &amp; RESUME • ART DIRECTOR</span>
        <h1 id="oversizedHeadline" class="${p}-h1">
          Hello! I am Kathleen Anne <em style="color:var(--accent-text);">"Kata"</em> Ocado.
        </h1>
        <p style="font-size:16px;color:var(--muted);line-height:1.65;max-width:54ch;margin-bottom:24px;">
          Graphic Designer &amp; Art Director with 7+ years of experience crafting campaign storytelling, print advertisements, social media ecosystems, and brand identities.
        </p>
        <div id="expertiseSection" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:26px;">
          <span class="${p}-pill-gold">Art Direction</span>
          <span class="${p}-pill-gold">Social Media</span>
          <span class="${p}-pill-gold">Print Ads</span>
          <span class="${p}-pill-gold">Web Design</span>
          <span class="${p}-pill-gold">Video Editing</span>
          <span class="${p}-pill-gold">Brand Design</span>
        </div>
        <button type="button" class="${p}-btn-gold" data-seamless-trigger="Commission Art Direction — Kata Ocado">Download Full Dossier →</button>
      </div>

      <div class="${p}-card tabular-nums">
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">CREATIVE CREDENTIALS</span>
        <h2 style="font-family:var(--font-display);font-size:28px;margin:8px 0 14px;">BFA Advertising Arts</h2>
        <svg viewBox="0 0 320 120" width="100%" height="110" fill="none" aria-hidden="true" style="margin-bottom:12px;">
          <rect x="8" y="10" width="304" height="100" rx="18" fill="#1F142E" stroke="#F59E0B" stroke-width="1.5"/>
          <circle cx="64" cy="60" r="28" fill="#F59E0B"/>
          <circle cx="64" cy="52" r="10" fill="#1F142E"/>
          <path d="M44 82c4-14 36-14 40 0" fill="#1F142E"/>
          <rect x="112" y="36" width="140" height="10" rx="5" fill="#FCD34D"/>
          <rect x="112" y="56" width="176" height="8" rx="4" fill="#D8CBEB" fill-opacity="0.5"/>
          <rect x="112" y="74" width="116" height="8" rx="4" fill="#F59E0B" fill-opacity="0.7"/>
        </svg>
        <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:18px;">
          Far Eastern University • Magna Cum Laude Track in Visual Campaign Direction &amp; Integrated Media.
        </p>
        <div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:16px;">
          <div><strong data-counter-target="7" data-counter-suffix=" Years" style="font-size:28px;color:var(--accent-text);display:block;">7 Years</strong><span style="font-size:12px;color:var(--muted);">Agency &amp; Brand Lead</span></div>
          <div><strong data-counter-target="140" data-counter-suffix="+" style="font-size:28px;color:var(--accent-text);display:block;">140+</strong><span style="font-size:12px;color:var(--muted);">Campaigns Shipped</span></div>
        </div>
      </div>
    </section>

    <!-- ONE LIVE THING: INTERACTIVE SOFTWARE PROFICIENCY MATRIX -->
    <section id="softwareMatrix" style="padding:28px 0 56px;" aria-labelledby="softHeading">
      <div class="${p}-card tabular-nums">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:18px;">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">CREATIVE SUITE WORKBENCH</span>
            <h2 id="softHeading" class="${p}-h2" style="margin-bottom:0;">Interactive Software Proficiency Matrix</h2>
          </div>
          <div role="group" aria-label="Select Creative Tool" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-gold tool-btn" data-tool="Ps / Ai — Adobe Photoshop &amp; Illustrator • 98% Mastery (Key Visuals &amp; Vector Craft)">Ps + Ai</button>
            <button type="button" class="${p}-btn-ghost tool-btn" data-tool="Xd / Fg — Figma &amp; Adobe XD • 94% Mastery (Design Systems &amp; Interactive Prototypes)">Figma + Xd</button>
            <button type="button" class="${p}-btn-ghost tool-btn" data-tool="Ae / Pr — After Effects &amp; Premiere Pro • 90% Mastery (Motion Reels &amp; Social Video)">Ae + Pr</button>
          </div>
        </div>
        <p id="toolSpecOutput" style="font-family:var(--font-mono);font-size:14px;color:var(--accent-text);padding:16px;border-radius:14px;background:var(--bg);border:1px solid var(--border);">
          Ps / Ai — Adobe Photoshop &amp; Illustrator • 98% Mastery (Key Visuals &amp; Vector Craft)
        </p>
      </div>
    </section>

    <section id="experienceTimeline" style="padding:12px 0 64px;" aria-labelledby="expHeading">
      <h2 id="expHeading" class="${p}-h2">Career Milestones</h2>
      <div class="${p}-grid-3">
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">2023 — PRESENT</span>
          <h3 style="font-size:20px;margin:8px 0;">Senior Art Director</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Leading 360-degree brand launches, seasonal lookbooks, and digital design systems.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">2020 — 2023</span>
          <h3 style="font-size:20px;margin:8px 0;">Multimedia Graphic Designer</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Directed social motion campaigns, packaging suites, and high-converting web landing pages.</p>
        </article>
        <article class="${p}-card ${p}-reveal">
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">2018 — 2020</span>
          <h3 style="font-size:20px;margin:8px 0;">Junior Visual Designer</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Crafted print collateral, out-of-home billboards, and editorial illustration systems.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 Kathleen Anne "Kata" Ocado — Art Direction &amp; Graphic Design.</span>
    <span style="font-family:var(--font-mono);color:var(--accent-text);">MANILA • GLOBAL REMOTE</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">KATA OCADO STUDIO</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:10px;">Let's Create Together</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Available for creative direction, brand identity systems, and campaign key visuals.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-gold" style="width:100%;">Request Portfolio Deck</button>
    </div>
  </div>

  <script>
    (function () {
      var out = document.getElementById('toolSpecOutput');
      document.querySelectorAll('.tool-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.tool-btn').forEach(function (b) {
            b.className = b === btn ? '${p}-btn-gold tool-btn' : '${p}-btn-ghost tool-btn';
          });
          if (out) out.textContent = btn.getAttribute('data-tool');
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 10. GLITCH CYBERWEAR (t180 — Premium Tier)
  // Monochrome Obsidian #0B0C0E, Pure White Cutout Frame, & Molten Orange #FF6B00 Cyber-Samurai Techwear
  // ============================================================================
  if (slug === 'glitch-cyberwear') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>GLITCH — Future Fashion, Redefined | Cyber-Samurai Techwear Store</title>
  <meta name="description" content="Modular cyber-samurai streetwear featuring NeuroVibe MK-I visors, VoidBlade carbon accessories, Shadow Circuit Jackets, and Crimson Phantom shells.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0B0C0E;
      --surface: #14171C;
      --surface-cutout: #FFFFFF;
      --fg: #F8FAFC;
      --muted: #94A3B8;
      --border: rgba(255, 255, 255, 0.16);
      --accent: #FF6B00;
      --accent-text: #FF9E44;
      --accent-strong: #FF8524;
      --on-accent: #0B0C0E;
      --font-display: 'Chakra Petch', sans-serif;
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
    .skip-link:focus { transform: translate3d(0, 116px, 0); outline: 2px solid #FFFFFF; outline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    button, [role="button"] {
      transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }
    button:active, [role="button"]:active { transform: scale(0.97) translateY(1px); }
    .tabular-nums, [data-counter-target] { font-variant-numeric: tabular-nums; }

    .${p}-cursor-ring, .${p}-cursor-dot {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      border-radius: 50%; transform: translate3d(-100px, -100px, 0);
    }
    .${p}-cursor-ring { width: 32px; height: 32px; border: 1.5px solid var(--accent); margin: -16px 0 0 -16px; transition: transform 0.18s var(--ease-out); }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-header {
      position: sticky; top: 0; z-index: 220;
      background: rgba(11, 12, 14, 0.9); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .${p}-wrap { max-width: 1360px; margin: 0 auto; padding: 18px clamp(20px, 4vw, 56px); }
    .${p}-nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    .${p}-brand {
      font-family: var(--font-display); font-weight: 700; font-size: 26px;
      letter-spacing: 0.14em; color: #FFFFFF; text-decoration: none;
    }
    .${p}-links { display: flex; gap: 24px; list-style: none; }
    .${p}-links a { color: var(--fg); text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
    .${p}-links a:hover { color: var(--accent); }
    .${p}-btn-white {
      padding: 11px 24px; border-radius: 999px; background: #FFFFFF; color: #0B0C0E;
      font-weight: 800; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
      border: none; cursor: pointer;
    }
    .${p}-btn-orange {
      padding: 11px 24px; border-radius: 999px; background: var(--accent); color: var(--on-accent);
      font-weight: 800; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
      border: none; cursor: pointer;
    }
    .${p}-btn-ghost {
      padding: 9px 16px; border-radius: 999px; background: rgba(255,255,255,0.08);
      border: 1px solid var(--border); color: var(--fg); font-size: 12px; font-weight: 600; cursor: pointer;
    }

    .${p}-cutout-stage {
      border: 6px solid #FFFFFF; border-radius: 32px; padding: clamp(28px, 5vw, 56px);
      background: radial-gradient(circle at 55% 40%, rgba(255,107,0,0.18), #0B0C0E 70%);
      display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 36px; align-items: center;
      margin: 20px 0 44px;
    }
    .${p}-h1 {
      font-family: var(--font-display); font-weight: 700; text-transform: uppercase;
      font-size: clamp(44px, 6.4vw, 84px); line-height: 0.94; letter-spacing: -0.02em;
      margin: 14px 0 20px;
    }
    .${p}-h2 {
      font-family: var(--font-display); font-weight: 700; text-transform: uppercase;
      font-size: clamp(28px, 4vw, 46px); line-height: 1.02; margin-bottom: 18px;
    }
    .${p}-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
    .${p}-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 22px; padding: 24px;
    }
    .${p}-cutout-card {
      background: #FFFFFF; color: #0B0C0E; border-radius: 22px; padding: 24px;
    }
    .${p}-reveal {
      opacity: 0; transform: translate3d(0, 18px, 0);
      transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
    }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }

    .${p}-modal {
      position: fixed; inset: 0; z-index: 190; background: rgba(11, 12, 14, 0.86);
      backdrop-filter: blur(14px); display: none; align-items: center; justify-content: center;
      padding: 20px; pointer-events: none;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 520px; width: 100%; border-radius: 24px; background: var(--surface);
      border: 1px solid var(--border); padding: 32px; pointer-events: auto;
    }

    @media (max-width: 1024px) {
      .${p}-cutout-stage, .${p}-grid-4 { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) { .${p}-links { display: none; } }
  </style>
</head>
<body>
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-header">
    <div class="${p}-wrap ${p}-nav">
      <a href="#heroStage" class="${p}-brand">GLITCH</a>
      <nav aria-label="Glitch Techwear Navigation">
        <ul class="${p}-links">
          <li><a href="#heroStage">Operative Rig</a></li>
          <li><a href="#pinInspector">Callout Pins</a></li>
          <li><a href="#dropCatalog">Drop 04</a></li>
        </ul>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-ghost" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-white" data-next-preview>SHOP NOW</button>
      </div>
    </div>
  </header>

  <main id="mainContent" class="${p}-wrap">
    <!-- CUTOUT HERO STAGE -->
    <section id="heroStage" class="${p}-cutout-stage" aria-labelledby="oversizedHeadline">
      <div>
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);letter-spacing:0.16em;">DROP 04 // CYBER-SAMURAI OPERATIVE</span>
        <h1 id="oversizedHeadline" class="${p}-h1">
          FUTURE FASHION, <span style="color:var(--accent);">REDEFINED.</span>
        </h1>
        <p style="font-size:16px;color:var(--muted);line-height:1.6;max-width:52ch;margin-bottom:26px;">
          Ballistic 3-layer Gore-Tex shells, HUD-ready polycarbonate visors, and modular magnetic sling hardware engineered for urban night ops.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button type="button" class="${p}-btn-orange" data-seamless-trigger="Equip Full Cyber-Samurai Kit">EQUIP OPERATIVE KIT</button>
          <a href="#pinInspector" class="${p}-btn-ghost" style="text-decoration:none;padding:11px 20px;">INSPECT CALLOUT PINS</a>
        </div>
      </div>

      <!-- Cyber-Samurai Vector Operative & Cutout Card -->
      <div class="tabular-nums">
        <svg viewBox="0 0 420 230" width="100%" height="210" fill="none" aria-hidden="true">
          <!-- Twin Katana & Cyber Helmet Silhouette -->
          <line x1="65" y1="205" x2="355" y2="25" stroke="#FFFFFF" stroke-width="4"/>
          <line x1="355" y1="205" x2="65" y2="25" stroke="#FF6B00" stroke-width="4"/>
          <circle cx="210" cy="115" r="56" fill="#14171C" stroke="#FFFFFF" stroke-width="3"/>
          <rect x="172" y="102" width="76" height="18" rx="9" fill="#FF6B00"/>
          <circle cx="130" cy="68" r="8" fill="#FF6B00"/>
          <circle cx="295" cy="92" r="8" fill="#FFFFFF"/>
          <circle cx="210" cy="182" r="8" fill="#FF6B00"/>
        </svg>
        <div class="${p}-cutout-card" style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:#FF6B00;">FEATURED SHELL</span>
            <strong id="activeGearTitle" style="display:block;font-family:var(--font-display);font-size:22px;">CRIMSON PHANTOM — $450</strong>
          </div>
          <button type="button" class="${p}-btn-orange" data-seamless-trigger="Add to Bag — Crimson Phantom ($450)">ADD +</button>
        </div>
      </div>
    </section>

    <!-- ONE LIVE THING: CALLOUT PIN GEAR INSPECTOR -->
    <section id="pinInspector" style="padding:16px 0 56px;" aria-labelledby="pinHeading">
      <div class="${p}-card tabular-nums">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:18px;">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">INTERACTIVE TACTICAL CALLOUTS</span>
            <h2 id="pinHeading" class="${p}-h2" style="margin-bottom:0;">Select Operative Callout Pin</h2>
          </div>
          <div role="group" aria-label="Operative Gear Pins" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-orange pin-btn" data-gear="NEUROVIBE MK-I — $230 • Anti-Fog OLED HUD Visor with UV400 Ballistic Shield">NEUROVIBE MK-I ($230)</button>
            <button type="button" class="${p}-btn-ghost pin-btn" data-gear="VOIDBLADE — $120 • Forged Carbon-Fiber Tactical Umbrella &amp; Fidlock Back Sheath">VOIDBLADE ($120)</button>
            <button type="button" class="${p}-btn-ghost pin-btn" data-gear="SHADOW CIRCUIT JACKET — $450 • 3L Waterproof Membrane with 14 Concealed Cargo Pockets">SHADOW CIRCUIT ($450)</button>
            <button type="button" class="${p}-btn-ghost pin-btn" data-gear="CRIMSON PHANTOM — $450 • Anodized Articulated Shoulder Shell &amp; Thermal Liner">CRIMSON PHANTOM ($450)</button>
          </div>
        </div>
        <p id="pinSpecOutput" style="font-family:var(--font-mono);font-size:14px;color:var(--accent-text);padding:16px;border-radius:14px;background:var(--bg);border:1px solid var(--border);">
          NEUROVIBE MK-I — $230 • Anti-Fog OLED HUD Visor with UV400 Ballistic Shield
        </p>
      </div>
    </section>

    <!-- 4 PIECE DROP CATALOG -->
    <section id="dropCatalog" style="padding:12px 0 64px;" aria-labelledby="catHeading">
      <h2 id="catHeading" class="${p}-h2">Complete Operative Loadout</h2>
      <div class="${p}-grid-4 tabular-nums">
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Reserve — NeuroVibe MK-I ($230)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">PIN 01 // HEADGEAR</span>
          <h3 style="font-family:var(--font-display);font-size:20px;margin:8px 0;">NEUROVIBE MK-I</h3>
          <strong style="font-size:24px;color:var(--accent-text);">$230</strong>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Reserve — VoidBlade ($120)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">PIN 02 // HARDWARE</span>
          <h3 style="font-family:var(--font-display);font-size:20px;margin:8px 0;">VOIDBLADE</h3>
          <strong style="font-size:24px;color:var(--accent-text);">$120</strong>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Reserve — Shadow Circuit Jacket ($450)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">PIN 03 // OUTERWEAR</span>
          <h3 style="font-family:var(--font-display);font-size:20px;margin:8px 0;">SHADOW CIRCUIT JACKET</h3>
          <strong style="font-size:24px;color:var(--accent-text);">$450</strong>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Reserve — Crimson Phantom ($450)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">PIN 04 // EXOSHELL</span>
          <h3 style="font-family:var(--font-display);font-size:20px;margin:8px 0;">CRIMSON PHANTOM</h3>
          <strong style="font-size:24px;color:var(--accent-text);">$450</strong>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 GLITCH Cyberwear Division. Future Fashion, Redefined.</span>
    <span style="font-family:var(--font-mono);color:var(--accent);">WORLDWIDE EXPRESS DISPATCH</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">GLITCH ARMORY CHECKOUT</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-ghost">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:10px;">Lock Operative Sizing</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">
        Each Glitch shell includes serialized NFC authenticity tags and lifetime Fidlock hardware replacement.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-orange" style="width:100%;">Proceed to Encrypted Checkout</button>
    </div>
  </div>

  <script>
    (function () {
      var out = document.getElementById('pinSpecOutput');
      var titleOut = document.getElementById('activeGearTitle');
      document.querySelectorAll('.pin-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.pin-btn').forEach(function (b) {
            b.className = b === btn ? '${p}-btn-orange pin-btn' : '${p}-btn-ghost pin-btn';
          });
          var spec = btn.getAttribute('data-gear') || '';
          if (out) out.textContent = spec;
          if (titleOut) titleOut.textContent = spec.split('•')[0].trim();
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 11. OZZIE'S PRETZELS (Denver Artisan Bavarian Bakery & Box Builder)
  // ============================================================================
  if (slug === 'ozzies-pretzels') {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ozzie's Pretzels — Denver's Favorite Pretzels, Delivered Fresh to Your Door</title>
  <meta name="description" content="Ozzie's Pretzels bakes 100% hand-rolled Bavarian pretzels in Denver. Order original sea-salt twists, sweet cinnamon-sugar bites, and custom party gift boxes." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #FAF5EE;
      --surface: #FFFFFF;
      --surface-2: #F3EADF;
      --text: #1F120E;
      --muted: #68534B;
      --accent: #99140E;
      --accent-text: #7F100B;
      --border: rgba(153, 20, 14, 0.14);
      --radius-card: 22px;
      --font-display: 'Fraunces', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --space-section: clamp(64px, 8vw, 108px);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: #FFFFFF; }
    html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--font-sans); overflow-x: clip; max-width: 100%; }
    body { background: var(--bg); color: var(--text); overflow-x: clip; max-width: 100%; line-height: 1.6; }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--accent); color: #FFFFFF; font-weight: 700; border-radius: 8px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid var(--text); }
    a, button, input { font-family: inherit; }
    a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-crimson-hero {
      background: radial-gradient(circle at 72% 38%, #B51B14 0%, #8E110B 65%, #6E0C08 100%);
      color: #FAF5EE;
      position: relative;
      overflow: hidden;
    }
    .${p}-nav {
      max-width: 1280px;
      margin: 0 auto;
      padding: 20px clamp(20px, 5vw, 48px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .${p}-brand {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 800;
      color: #FAF5EE;
      text-decoration: none;
      letter-spacing: -0.02em;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .${p}-nav-links {
      display: flex;
      gap: 24px;
      align-items: center;
      flex-wrap: wrap;
    }
    .${p}-nav-link {
      color: rgba(250, 245, 238, 0.88);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    .${p}-nav-link:hover { color: #FDE68A; }
    .${p}-btn-cream {
      background: #FAF5EE;
      color: #8E110B;
      border: 1px solid #FAF5EE;
      padding: 12px 24px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease;
    }
    .${p}-btn-cream:hover { transform: translateY(-2px); background: #FFFFFF; }
    .${p}-btn-cream:active { transform: scale(0.97); }
    .${p}-btn-crimson {
      background: var(--accent);
      color: #FFFFFF;
      border: 1px solid var(--accent);
      padding: 12px 24px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease;
    }
    .${p}-btn-crimson:hover { transform: translateY(-2px); background: #7F100B; }
    .${p}-btn-crimson:active { transform: scale(0.97); }
    .${p}-btn-outline {
      background: rgba(250, 245, 238, 0.12);
      color: #FAF5EE;
      border: 1px solid rgba(250, 245, 238, 0.35);
      padding: 11px 20px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s ease;
    }
    .${p}-btn-outline:hover { background: rgba(250, 245, 238, 0.22); }
    .${p}-btn-outline:active { transform: scale(0.98); }

    .${p}-hero-grid {
      max-width: 1280px;
      margin: 0 auto;
      padding: 40px clamp(20px, 5vw, 48px) 76px;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 5.2vw, 4.35rem);
      font-weight: 800;
      line-height: 1.04;
      letter-spacing: -0.025em;
      color: #FAF5EE;
      margin-bottom: 18px;
    }
    .${p}-sub {
      font-size: clamp(1rem, 1.3vw, 1.14rem);
      color: rgba(250, 245, 238, 0.86);
      max-width: 54ch;
      margin-bottom: 28px;
    }
    .${p}-stats-strip {
      background: #7F100B;
      border-top: 1px solid rgba(250, 245, 238, 0.14);
      padding: 24px clamp(20px, 5vw, 48px);
    }
    .${p}-stats-inner {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      text-align: center;
      color: #FAF5EE;
    }
    .${p}-wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: var(--space-section) clamp(20px, 5vw, 48px);
    }
    .${p}-h2 {
      font-family: var(--font-display);
      font-size: clamp(1.95rem, 3.6vw, 2.95rem);
      font-weight: 700;
      line-height: 1.1;
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
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 26px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }
    .${p}-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 18px 36px rgba(153, 20, 14, 0.08);
    }
    .${p}-topping-btn {
      padding: 10px 16px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .${p}-topping-btn.is-active, .${p}-topping-btn:hover {
      background: var(--accent);
      color: #FFFFFF;
      border-color: var(--accent);
    }
    .${p}-modal {
      position: fixed;
      inset: 0;
      background: rgba(31, 18, 14, 0.72);
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
      background: var(--surface);
      border-radius: 24px;
      padding: 32px;
      border: 1px solid var(--border);
    }
    @media (max-width: 960px) {
      .${p}-hero-grid { grid-template-columns: 1fr; }
      .${p}-stats-inner, .${p}-grid-4 { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 580px) {
      .${p}-stats-inner, .${p}-grid-4 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="cursorRing" style="position:fixed;width:28px;height:28px;border:1px solid rgba(153,20,14,0.45);border-radius:50%;pointer-events:none;z-index:9998;transform:translate3d(-100px,-100px,0);"></div>
  <div id="cursorDot" style="position:fixed;width:6px;height:6px;background:#99140E;border-radius:50%;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);"></div>

  <div class="${p}-crimson-hero">
    <header class="${p}-nav">
      <a href="#main-content" class="${p}-brand">
        <svg width="28" height="28" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M16 26C10 16 20 8 32 16C44 8 54 16 48 26C42 36 22 44 18 52M48 26C42 36 22 36 16 26M32 16C38 24 38 40 46 52" stroke="#FBBF24" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Ozzie's Pretzels</span>
      </a>
      <nav class="${p}-nav-links" aria-label="Primary Navigation">
        <a href="#pretzel-categories" class="${p}-nav-link">Shop Pretzels</a>
        <a href="#box-builder" class="${p}-nav-link">Build a Box</a>
        <a href="#ozzies-craft" class="${p}-nav-link">How It's Made</a>
        <a href="#bakery-faq" class="${p}-nav-link">FAQ</a>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" class="${p}-btn-outline" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-cream">Order Now</button>
      </div>
    </header>

    <section class="${p}-hero-grid" aria-labelledby="heroHeading">
      <div>
        <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:rgba(251,191,36,0.18);color:#FDE68A;font-family:var(--font-mono);font-size:12px;margin-bottom:16px;">SMALL-BATCH DENVER BAKERY • HOT OUT OF THE OVEN</span>
        <h1 id="heroHeading" class="${p}-h1">Denver's Favorite Pretzels, Delivered Fresh to Your Door</h1>
        <p class="${p}-sub">
          Hand-twisted every morning with organic High Plains wheat, traditional Bavarian lye dip, and flaky Maldon sea salt. Warm, golden crust outside—pillow-soft inside.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button type="button" class="${p}-btn-cream" data-seamless-trigger="Order Warm Pretzel Delivery">Order Now</button>
          <a href="#pretzel-categories" class="${p}-btn-outline">View menu</a>
        </div>
      </div>

      <div style="background:rgba(250,245,238,0.1);border:1px solid rgba(250,245,238,0.22);border-radius:28px;padding:28px;text-align:center;">
        <svg viewBox="0 0 420 300" style="width:100%;max-width:380px;height:auto;filter:drop-shadow(0 20px 30px rgba(0,0,0,0.35));" role="img" aria-label="Artisan golden hand-rolled Bavarian pretzel with coarse sea salt">
          <defs>
            <linearGradient id="pretzelCrust" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F59E0B" />
              <stop offset="55%" stop-color="#B45309" />
              <stop offset="100%" stop-color="#78350F" />
            </linearGradient>
          </defs>
          <path d="M110 175 C55 95, 145 30, 210 95 C275 30, 365 95, 310 175 C270 230, 150 230, 110 175 Z" fill="none" stroke="url(#pretzelCrust)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M145 140 C185 190, 235 190, 275 140" fill="none" stroke="url(#pretzelCrust)" stroke-width="30" stroke-linecap="round" />
          <path d="M170 210 L135 265 M250 210 L285 265" stroke="url(#pretzelCrust)" stroke-width="26" stroke-linecap="round" />
          <circle cx="135" cy="95" r="4" fill="#FEF3C7" />
          <circle cx="165" cy="78" r="3.5" fill="#FEF3C7" />
          <circle cx="255" cy="82" r="4" fill="#FEF3C7" />
          <circle cx="288" cy="108" r="3.5" fill="#FEF3C7" />
          <circle cx="210" cy="168" r="4" fill="#FEF3C7" />
          <circle cx="185" cy="160" r="3" fill="#FEF3C7" />
          <circle cx="238" cy="158" r="3.5" fill="#FEF3C7" />
        </svg>
        <p class="tabular-nums" style="font-family:var(--font-mono);font-size:12px;color:#FDE68A;margin-top:12px;">BATCH #409 • BAKED AT 450°F • $3.99 / TWIST</p>
      </div>
    </section>

    <div class="${p}-stats-strip tabular-nums">
      <div class="${p}-stats-inner">
        <div>
          <strong style="font-family:var(--font-display);font-size:32px;display:block;">5,000+</strong>
          <span style="font-size:13px;color:rgba(250,245,238,0.8);">Pretzels Delivered</span>
        </div>
        <div>
          <strong style="font-family:var(--font-display);font-size:32px;display:block;">98%</strong>
          <span style="font-size:13px;color:rgba(250,245,238,0.8);">5-Star Reviews</span>
        </div>
        <div>
          <strong style="font-family:var(--font-display);font-size:32px;display:block;">6,300+</strong>
          <span style="font-size:13px;color:rgba(250,245,238,0.8);">Pretzels Baked</span>
        </div>
        <div>
          <strong style="font-family:var(--font-display);font-size:32px;display:block;">100%</strong>
          <span style="font-size:13px;color:rgba(250,245,238,0.8);">Hand-Rolled</span>
        </div>
      </div>
    </div>
  </div>

  <main id="main-content">
    <!-- ONE LIVE THING: INTERACTIVE PRETZEL BOX & DIP BUILDER -->
    <section id="box-builder" class="${p}-wrap tabular-nums" aria-labelledby="builderHeading">
      <div class="${p}-card" style="background:linear-gradient(135deg,#FFFFFF 0%,#F7EFE4 100%);">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:22px;">
          <div>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:700;">CUSTOM BAKERY BOX BUILDER</span>
            <h2 id="builderHeading" class="${p}-h2" style="margin-bottom:0;">Warm Golden Pretzels — $3.99 Each</h2>
          </div>
          <div role="group" aria-label="Pretzel Crust Toppings" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="${p}-topping-btn is-active" data-flavor="Classic Coarse Sea Salt" data-unit="3.99" data-dip="Whole-Grain Bavarian Beer Mustard">Coarse Sea Salt ($3.99)</button>
            <button type="button" class="${p}-topping-btn" data-flavor="Warm Cinnamon Sugar" data-unit="4.25" data-dip="Whipped Vanilla Bean Cream Cheese Glaze">Cinnamon Sugar ($4.25)</button>
            <button type="button" class="${p}-topping-btn" data-flavor="Aged Jalapeño Cheddar" data-unit="4.75" data-dip="Smoked Gouda &amp; Ale Fondue">Jalapeño Cheddar ($4.75)</button>
            <button type="button" class="${p}-topping-btn" data-flavor="Everything Bagel &amp; Garlic" data-unit="4.50" data-dip="Chive &amp; Roasted Shallot Schmear">Everything Spice ($4.50)</button>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:24px;align-items:center;">
          <div>
            <label for="pretzelCountRange" style="display:block;font-size:14px;font-weight:600;margin-bottom:8px;">
              Select Box Size: <strong id="pretzelCountOut" style="color:var(--accent);">6 Hand-Rolled Pretzels</strong>
            </label>
            <input id="pretzelCountRange" type="range" min="4" max="24" step="2" value="6" style="width:100%;accent-color:#99140E;cursor:pointer;margin-bottom:14px;" />
            <p id="pretzelPairingOut" style="font-size:14px;color:var(--muted);max-width:56ch;">
              Selected Glaze: <strong>Classic Coarse Sea Salt</strong> • Paired Dip: <strong>Whole-Grain Bavarian Beer Mustard</strong>
            </p>
          </div>
          <div style="background:var(--surface);padding:22px;border-radius:18px;border:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;">
            <div>
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">FRESH BOX TOTAL</span>
              <strong id="pretzelTotalOut" style="font-family:var(--font-display);font-size:34px;color:var(--accent);">$23.94</strong>
            </div>
            <button type="button" class="${p}-btn-crimson" data-seamless-trigger="Add Custom Pretzel Box to Oven Queue">Bake My Box →</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 CATEGORY CARDS -->
    <section id="pretzel-categories" class="${p}-wrap tabular-nums" aria-labelledby="catHeading" style="padding-top:0;">
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:700;">EXPLORE OUR PRETZELS</span>
      <h2 id="catHeading" class="${p}-h2">Baked Fresh for Every Craving</h2>
      <div class="${p}-grid-4">
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Original Pretzels ($3.99)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">01 // SAVORY TWISTS</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Original Pretzels</h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:14px;max-width:44ch;">Traditional Bavarian knots dipped in food-grade lye and finished with diamond-crystal sea salt.</p>
          <strong style="color:var(--accent);">From $3.99</strong>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Sweet Pretzels ($4.25)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">02 // DESSERT CRUST</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Sweet Pretzels</h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:14px;max-width:44ch;">Brushed with browned cultured butter and tossed in Ceylon cinnamon sugar or salted caramel drizzle.</p>
          <strong style="color:var(--accent);">From $4.25</strong>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Pretzel Bites &amp; Snacks ($8.50)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">03 // SHAREABLE NUGGETS</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Pretzel Bites &amp; Snacks</h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:14px;max-width:44ch;">Golden bite-sized pillows served with two warm house-made cheese and mustard dipping cups.</p>
          <strong style="color:var(--accent);">$8.50 / Tub</strong>
        </article>
        <article class="${p}-card ${p}-reveal" data-seamless-trigger="Gift Boxes &amp; Bundles ($36.00)">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);">04 // DENVER CATERING</span>
          <h3 style="font-family:var(--font-display);font-size:22px;margin:8px 0;">Gift Boxes &amp; Bundles</h3>
          <p style="font-size:14px;color:var(--muted);margin-bottom:14px;max-width:44ch;">Stamped crimson keepsake boxes with 12 assorted twists, 4 artisan dips, and reheating instructions.</p>
          <strong style="color:var(--accent);">$36.00 / Box</strong>
        </article>
      </div>
    </section>

    <!-- HOW IT'S MADE — THE OZZIE'S WAY -->
    <section id="ozzies-craft" class="${p}-wrap tabular-nums" aria-labelledby="craftHeading" style="padding-top:0;">
      <div class="${p}-card" id="bakery-faq" style="background:#8E110B;color:#FAF5EE;">
        <span style="font-family:var(--font-mono);font-size:12px;color:#FDE68A;">HOW IT'S MADE — THE OZZIE'S WAY</span>
        <h2 id="craftHeading" class="${p}-h2" style="color:#FAF5EE;margin-top:6px;">24-Hour Cold Ferment, 12-Minute Stone Bake</h2>
        <div class="${p}-grid-4" style="margin-top:20px;">
          <div style="padding:18px;border-radius:16px;background:rgba(250,245,238,0.08);border:1px solid rgba(250,245,238,0.18);">
            <strong style="font-family:var(--font-mono);font-size:12px;color:#FDE68A;">STEP 01</strong>
            <h3 style="font-family:var(--font-display);font-size:19px;margin:6px 0;">Colorado Flour</h3>
            <p style="font-size:13px;color:rgba(250,245,238,0.82);max-width:40ch;">Unbleached malted winter wheat mixed with pure Rocky Mountain spring water.</p>
          </div>
          <div style="padding:18px;border-radius:16px;background:rgba(250,245,238,0.08);border:1px solid rgba(250,245,238,0.18);">
            <strong style="font-family:var(--font-mono);font-size:12px;color:#FDE68A;">STEP 02</strong>
            <h3 style="font-family:var(--font-display);font-size:19px;margin:6px 0;">Hand-Twisted</h3>
            <p style="font-size:13px;color:rgba(250,245,238,0.82);max-width:40ch;">Rolled to a 28-inch tapered rope and snapped in mid-air for thick belly &amp; crispy arms.</p>
          </div>
          <div style="padding:18px;border-radius:16px;background:rgba(250,245,238,0.08);border:1px solid rgba(250,245,238,0.18);">
            <strong style="font-family:var(--font-mono);font-size:12px;color:#FDE68A;">STEP 03</strong>
            <h3 style="font-family:var(--font-display);font-size:19px;margin:6px 0;">Hearth Baked</h3>
            <p style="font-size:13px;color:rgba(250,245,238,0.82);max-width:40ch;">Scored on the belly and baked on deck stones for signature mahogany Maillard snap.</p>
          </div>
          <div style="padding:18px;border-radius:16px;background:rgba(250,245,238,0.08);border:1px solid rgba(250,245,238,0.18);">
            <strong style="font-family:var(--font-mono);font-size:12px;color:#FDE68A;">STEP 04</strong>
            <h3 style="font-family:var(--font-display);font-size:19px;margin:6px 0;">Courier Express</h3>
            <p style="font-size:13px;color:rgba(250,245,238,0.82);max-width:40ch;">Dispatched across Denver in insulated linen pouches within 35 minutes of baking.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="padding-top:24px;padding-bottom:48px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 Ozzie's Pretzels Bakery — 2418 Larimer St, Denver, CO.</span>
    <span style="font-family:var(--font-mono);color:var(--accent);">DAILY OVEN HOURS • 07:00 AM – 08:00 PM MT</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">OZZIE'S OVEN DISPATCH</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-topping-btn">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:10px;">Reserve Fresh Pretzel Batch</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;max-width:52ch;">
        Your pretzels are twisted to order and delivered warm across Metro Denver or shipped nationwide on overnight dry-ice packs.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-crimson" style="width:100%;justify-content:center;">Confirm Bakery Order</button>
    </div>
  </div>

  <script>
    (function () {
      var range = document.getElementById('pretzelCountRange');
      var countOut = document.getElementById('pretzelCountOut');
      var pairOut = document.getElementById('pretzelPairingOut');
      var totalOut = document.getElementById('pretzelTotalOut');
      var unitPrice = 3.99;
      var flavor = 'Classic Coarse Sea Salt';
      var dip = 'Whole-Grain Bavarian Beer Mustard';

      function updateBox() {
        var qty = range ? parseInt(range.value, 10) : 6;
        if (countOut) countOut.textContent = qty + ' Hand-Rolled Pretzels';
        if (totalOut) totalOut.textContent = '$' + (qty * unitPrice).toFixed(2);
        if (pairOut) pairOut.innerHTML = 'Selected Glaze: <strong>' + flavor + '</strong> • Paired Dip: <strong>' + dip + '</strong>';
      }
      if (range) range.addEventListener('input', updateBox);

      document.querySelectorAll('.${p}-topping-btn').forEach(function (btn) {
        if (btn.id === 'closeSeamlessBtn') return;
        btn.addEventListener('click', function () {
          document.querySelectorAll('.${p}-topping-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          unitPrice = parseFloat(btn.getAttribute('data-unit') || '3.99');
          flavor = btn.getAttribute('data-flavor') || 'Classic Coarse Sea Salt';
          dip = btn.getAttribute('data-dip') || 'Whole-Grain Bavarian Beer Mustard';
          updateBox();
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 12. TERRARIUM DECK STUDIO (Spatial Biodome & Glass Diorama Presentation System)
  // ============================================================================
  if (slug === 'terrarium-deck-studio') {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Terrarium Deck Studio — Spatial Biodome &amp; Architectural Diorama Presentation System</title>
  <meta name="description" content="High-impact 12-slide pastel glass biodome &amp; architectural terrarium presentation system with interactive biome lighting and ecological telemetry." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #F3F5FB;
      --surface: rgba(255, 255, 255, 0.86);
      --surface-2: #E8ECF7;
      --text: #0F172A;
      --muted: #475569;
      --accent: #0284C7;
      --accent-text: #0369A1;
      --border: rgba(15, 23, 42, 0.1);
      --radius-card: 24px;
      --font-display: 'Outfit', 'Plus Jakarta Sans', sans-serif;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --space-section: clamp(60px, 7.5vw, 104px);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: #FFFFFF; }
    html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--font-sans); overflow-x: clip; max-width: 100%; }
    body { background: radial-gradient(circle at 18% 12%, #FCE7F3 0%, #E0F2FE 42%, #F3F5FB 85%); color: var(--text); overflow-x: clip; max-width: 100%; line-height: 1.6; }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--accent); color: #FFFFFF; font-weight: 700; border-radius: 8px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid var(--text); }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-nav {
      max-width: 1320px;
      margin: 0 auto;
      padding: 22px clamp(20px, 5vw, 48px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .${p}-brand {
      font-family: var(--font-display);
      font-size: 21px;
      font-weight: 700;
      color: var(--text);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .${p}-pill-btn {
      padding: 10px 18px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      backdrop-filter: blur(12px);
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }
    .${p}-pill-btn:hover, .${p}-pill-btn.is-active {
      background: var(--accent);
      color: #FFFFFF;
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    .${p}-pill-btn:active { transform: scale(0.97); }
    .${p}-wrap {
      max-width: 1320px;
      margin: 0 auto;
      padding: var(--space-section) clamp(20px, 5vw, 48px);
    }
    .${p}-hero-grid {
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      gap: 36px;
      align-items: center;
      padding-top: 24px;
    }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 4.8vw, 4.1rem);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 18px;
    }
    .${p}-h2 {
      font-family: var(--font-display);
      font-size: clamp(1.85rem, 3.3vw, 2.75rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin-bottom: 14px;
    }
    .${p}-sub {
      font-size: clamp(1rem, 1.3vw, 1.14rem);
      color: var(--muted);
      max-width: 56ch;
      margin-bottom: 28px;
    }
    .${p}-slide-bento {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 28px;
    }
    .${p}-slide-card {
      background: var(--surface);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 24px;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    }
    .${p}-slide-card:hover {
      transform: translateY(-4px);
      border-color: rgba(2, 132, 199, 0.45);
    }
    .${p}-modal {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(10px);
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
      border-radius: 24px;
      padding: 32px;
      border: 1px solid var(--border);
    }
    .${p}-biome-grid {
      display: grid;
      grid-template-columns: 1.3fr 0.7fr;
      gap: 20px;
      align-items: center;
    }
    @media (max-width: 960px) {
      .${p}-hero-grid, .${p}-slide-bento, .${p}-biome-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .${p}-slide-card { padding: 18px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="cursorRing" style="position:fixed;width:28px;height:28px;border:1px solid rgba(2,132,199,0.45);border-radius:50%;pointer-events:none;z-index:9998;transform:translate3d(-100px,-100px,0);"></div>
  <div id="cursorDot" style="position:fixed;width:6px;height:6px;background:#0284C7;border-radius:50%;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);"></div>

  <header class="${p}-nav">
    <a href="#main-content" class="${p}-brand">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="13" stroke="#0284C7" stroke-width="2" fill="rgba(56,189,248,0.16)" />
        <path d="M9 21C12 14 20 14 23 21" stroke="#EC4899" stroke-width="2" stroke-linecap="round" />
        <circle cx="16" cy="12" r="3" fill="#0284C7" />
      </svg>
      <span>Terrarium Deck Studio</span>
    </a>
    <nav aria-label="Primary Navigation" style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
      <a href="#biome-inspector" style="color:var(--muted);text-decoration:none;font-size:14px;font-weight:600;">Biome Inspector</a>
      <a href="#slide-matrix" style="color:var(--muted);text-decoration:none;font-size:14px;font-weight:600;">12-Slide Bento</a>
      <button type="button" id="motionToggleBtn" class="${p}-pill-btn" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-pill-btn is-active">Export Keynote / Figma Deck</button>
    </nav>
  </header>

  <main id="main-content">
    <section class="${p}-wrap ${p}-hero-grid" aria-labelledby="heroHeading">
      <div>
        <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:rgba(2,132,199,0.1);color:var(--accent-text);font-family:var(--font-mono);font-size:12px;font-weight:600;margin-bottom:16px;">ARCHITECTURAL BIODOME DECK • 60+ GLASS DIORAMA SLIDES</span>
        <h1 id="heroHeading" class="${p}-h1">High-Impact Glass Terrarium &amp; Spatial Biodome Deck</h1>
        <p class="${p}-sub">
          Present ecological architecture, climate-tech roadmaps, and botanical urbanism inside translucent 3D glass vessels. Engineered with modular Bento grids and live telemetry callouts.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button type="button" class="${p}-pill-btn is-active" data-seamless-trigger="Download Full 60-Slide Terrarium Deck">Download Master Deck</button>
          <a href="#slide-matrix" class="${p}-pill-btn">Inspect Slide System</a>
        </div>
      </div>

      <div class="${p}-slide-card tabular-nums" style="text-align:center;background:linear-gradient(145deg,rgba(255,255,255,0.92),rgba(224,242,254,0.75));">
        <svg viewBox="0 0 420 300" style="width:100%;max-width:380px;height:auto;" role="img" aria-label="Translucent 3D glass biodome sphere housing coral botanicals and waterfalls">
          <defs>
            <radialGradient id="domeGlass" cx="35%" cy="28%" r="70%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
              <stop offset="55%" stop-color="#BAE6FD" stop-opacity="0.55" />
              <stop offset="100%" stop-color="#F472B6" stop-opacity="0.35" />
            </radialGradient>
          </defs>
          <ellipse cx="210" cy="248" rx="135" ry="24" fill="rgba(2,132,199,0.16)" />
          <circle cx="210" cy="150" r="108" fill="url(#domeGlass)" stroke="#FFFFFF" stroke-width="3" />
          <path d="M122 185 Q210 135 298 185 A108 108 0 0 1 122 185 Z" fill="#0EA5E9" fill-opacity="0.35" />
          <path d="M175 185 C175 130, 205 110, 210 82 C215 110, 245 130, 245 185 Z" fill="#EC4899" fill-opacity="0.65" />
          <circle cx="165" cy="115" r="16" fill="#FFFFFF" fill-opacity="0.7" />
        </svg>
        <div style="display:flex;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border);font-family:var(--font-mono);font-size:12px;color:var(--muted);">
          <span>SLIDE 01 // BIODOME SPHERE</span>
          <span style="color:var(--accent-text);">HUMIDITY 78% • PAR 420</span>
        </div>
      </div>
    </section>

    <!-- ONE LIVE THING: INTERACTIVE BIOME SLIDE & REFRACTION INSPECTOR -->
    <section id="biome-inspector" class="${p}-wrap tabular-nums" aria-labelledby="inspHeading" style="padding-top:0;">
      <div class="${p}-slide-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:20px;">
          <div>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);font-weight:600;">INTERACTIVE SLIDE LIGHTING SWITCHER</span>
            <h2 id="inspHeading" class="${p}-h2" style="margin-bottom:0;">Preview Ecological Diorama Moods</h2>
          </div>
          <div role="group" aria-label="Biodome Lighting Presets" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="${p}-pill-btn is-active biome-btn" data-title="Slide 04 // Solarpunk Hydro-Reef" data-lux="14,200 LUX" data-co2="310 ppm" data-summary="Suspended glass terrarium ring filtering rainwater through bioluminescent kelp and floating lotus decks.">Solarpunk Hydro-Reef</button>
            <button type="button" class="${p}-pill-btn biome-btn" data-title="Slide 08 // Alpine Cloud Conservatory" data-lux="9,800 LUX" data-co2="285 ppm" data-summary="High-altitude pressurized geodesic capsule cultivating rare Himalayan mosses and mist orchids.">Alpine Cloud Dome</button>
            <button type="button" class="${p}-pill-btn biome-btn" data-title="Slide 11 // Acoustic Desert Oasis" data-lux="22,400 LUX" data-co2="340 ppm" data-summary="Double-walled rose-quartz biosphere harvesting nocturnal dew for arid succulent amphitheaters.">Rose-Quartz Oasis</button>
          </div>
        </div>

        <div class="${p}-biome-grid">
          <div style="padding:18px;border-radius:16px;background:var(--bg);border:1px solid var(--border);">
            <strong id="biomeSlideTitle" style="font-family:var(--font-display);font-size:20px;display:block;margin-bottom:6px;">Slide 04 // Solarpunk Hydro-Reef</strong>
            <p id="biomeSlideDesc" style="font-size:14px;color:var(--muted);max-width:58ch;">
              Suspended glass terrarium ring filtering rainwater through bioluminescent kelp and floating lotus decks.
            </p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:center;">
            <div style="padding:16px;border-radius:16px;background:var(--bg);border:1px solid var(--border);">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">CANOPY LUX</span>
              <strong id="biomeLuxOut" style="font-family:var(--font-display);font-size:24px;color:var(--accent-text);">14,200 LUX</strong>
            </div>
            <div style="padding:16px;border-radius:16px;background:var(--bg);border:1px solid var(--border);">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">NET CARBON</span>
              <strong id="biomeCo2Out" style="font-family:var(--font-display);font-size:24px;color:#0D9488;">310 ppm</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6-CARD BENTO SLIDE SHOWCASE -->
    <section id="slide-matrix" class="${p}-wrap tabular-nums" aria-labelledby="matrixHeading" style="padding-top:0;">
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);font-weight:600;">MODULAR PRESENTATION ARCHITECTURE</span>
      <h2 id="matrixHeading" class="${p}-h2">Included Master Layouts</h2>
      <div class="${p}-slide-bento">
        <article class="${p}-slide-card ${p}-reveal" data-seamless-trigger="Inspect Layout 01 — Executive Thesis Dome">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">LAYOUT 01 // COVER</span>
          <h3 style="font-family:var(--font-display);font-size:21px;margin:8px 0;">Spherical Hero Title</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Full-bleed 3D glass orb centerpiece with oversized typographic callouts and chapter index.</p>
        </article>
        <article class="${p}-slide-card ${p}-reveal" data-seamless-trigger="Inspect Layout 02 — Ecological KPI Bento">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">LAYOUT 02 // METRICS</span>
          <h3 style="font-family:var(--font-display);font-size:21px;margin:8px 0;">4-Quadrant Biodiversity Grid</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Compare water recirculation, solar capture, and flora growth curves side by side.</p>
        </article>
        <article class="${p}-slide-card ${p}-reveal" data-seamless-trigger="Inspect Layout 03 — Cross-Section Cutaway">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">LAYOUT 03 // ANATOMY</span>
          <h3 style="font-family:var(--font-display);font-size:21px;margin:8px 0;">Layered Substrate Cutaway</h3>
          <p style="font-size:14px;color:var(--muted);max-width:46ch;">Exploded diagram pins for root aeration, mycorrhizal mesh, and smart misting nozzles.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-wrap" style="padding-top:24px;padding-bottom:48px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 Terrarium Deck Studio. Spatial Presentation System for Keynote, Figma &amp; WebGL.</span>
    <span style="font-family:var(--font-mono);color:var(--accent-text);">16:9 UHD • 4K GLASS ASSETS</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">TERRARIUM DECK EXPORT</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-btn">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:26px;margin-bottom:10px;">Download Terrarium Deck</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;max-width:52ch;">
        Includes 60 editable master slides, 24 transparent PNG/SVG 3D glass biodomes, and auto-layout Bento components.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill-btn is-active" style="width:100%;">Start Instant Download</button>
    </div>
  </div>

  <script>
    (function () {
      var tOut = document.getElementById('biomeSlideTitle');
      var dOut = document.getElementById('biomeSlideDesc');
      var lOut = document.getElementById('biomeLuxOut');
      var cOut = document.getElementById('biomeCo2Out');

      document.querySelectorAll('.biome-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.biome-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          if (tOut) tOut.textContent = btn.getAttribute('data-title') || '';
          if (dOut) dOut.textContent = btn.getAttribute('data-summary') || '';
          if (lOut) lOut.textContent = btn.getAttribute('data-lux') || '';
          if (cOut) cOut.textContent = btn.getAttribute('data-co2') || '';
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 13. FOODS GOURMET BOWL (FOODS — Order Your Favourite Foods Interactive Showcase)
  // ============================================================================
  if (slug === 'foods-gourmet-bowl') {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FOODS — Order Your Favourite Foods • Interactive Gourmet Bowl Showcase</title>
  <meta name="description" content="Order your favourite foods with live nutritional telemetry, instant Burger ($3.25), Cake ($2.25), and Salad ($5.25) dish switching, and 10–18 minute express dispatch." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #F8FAFC;
      --surface: #FFFFFF;
      --surface-2: #262930;
      --text: #1E2025;
      --muted: #64748B;
      --accent: #F59E0B;
      --accent-text: #B45309;
      --border: rgba(30, 32, 37, 0.1);
      --radius-card: 26px;
      --font-display: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --space-section: clamp(56px, 7vw, 96px);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: #FFFFFF; }
    html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--font-sans); overflow-x: clip; max-width: 100%; }
    body { background: var(--bg); color: var(--text); overflow-x: clip; max-width: 100%; line-height: 1.6; }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--surface-2); color: #FFFFFF; font-weight: 700; border-radius: 8px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid var(--accent); }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-stage-shell {
      max-width: 1320px;
      margin: 24px auto;
      background: var(--surface);
      border-radius: 36px;
      border: 1px solid var(--border);
      box-shadow: 0 28px 70px rgba(30, 32, 37, 0.08);
      position: relative;
      overflow: hidden;
    }
    .${p}-dark-wedge {
      position: absolute;
      top: 0;
      right: 0;
      width: 44%;
      height: 100%;
      background: #262930;
      border-top-left-radius: 320px;
      border-bottom-left-radius: 320px;
      z-index: 0;
      pointer-events: none;
    }
    .${p}-nav {
      position: relative;
      z-index: 10;
      padding: 28px clamp(24px, 4.5vw, 56px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .${p}-brand {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--text);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .${p}-nav-links {
      display: flex;
      gap: 32px;
      align-items: center;
      flex-wrap: wrap;
    }
    .${p}-nav-link {
      font-size: 14px;
      font-weight: 500;
      color: var(--muted);
      text-decoration: none;
      position: relative;
      transition: color 0.2s ease;
    }
    .${p}-nav-link.is-active, .${p}-nav-link:hover { color: var(--text); font-weight: 600; }
    .${p}-nav-link.is-active::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -8px;
      transform: translateX(-50%);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--accent);
    }
    .${p}-login-pill {
      background: var(--accent);
      color: #FFFFFF;
      border: none;
      padding: 10px 24px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    }
    .${p}-login-pill:hover { background: #D97706; transform: translateY(-2px); }
    .${p}-login-pill:active { transform: scale(0.97); }

    .${p}-hero-grid {
      position: relative;
      z-index: 10;
      padding: 24px clamp(24px, 4.5vw, 56px) 52px;
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 36px;
      align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 5vw, 4.2rem);
      font-weight: 300;
      line-height: 1.08;
      letter-spacing: -0.025em;
      margin-bottom: 16px;
    }
    .${p}-h1 strong { font-weight: 700; }
    .${p}-sub {
      font-size: 15px;
      color: var(--muted);
      max-width: 50ch;
      margin-bottom: 24px;
    }
    .${p}-total-line {
      font-size: 22px;
      color: var(--muted);
      margin-bottom: 24px;
    }
    .${p}-total-line strong {
      font-size: 28px;
      color: var(--text);
      font-weight: 700;
    }
    .${p}-order-controls {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
      margin-bottom: 42px;
    }
    .${p}-stepper {
      display: inline-flex;
      align-items: center;
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 6px 14px;
      gap: 14px;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
    }
    .${p}-step-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: #F1F5F9;
      color: var(--text);
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .${p}-step-btn:hover { background: var(--accent); color: #FFFFFF; }
    .${p}-buy-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: #262930;
      color: #FFFFFF;
      border: none;
      padding: 8px 24px 8px 8px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 16px 32px rgba(38, 41, 48, 0.25);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-buy-btn:hover { transform: translateY(-2px); }
    .${p}-buy-btn:active { transform: scale(0.97); }
    .${p}-buy-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--accent);
      color: #262930;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .${p}-dish-pills {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
    }
    .${p}-dish-pill {
      border: none;
      border-radius: 26px;
      padding: 16px 20px;
      min-width: 118px;
      text-align: center;
      color: #FFFFFF;
      cursor: pointer;
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
    }
    .${p}-dish-pill:hover, .${p}-dish-pill.is-active {
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 18px 34px rgba(0, 0, 0, 0.16);
    }
    .${p}-bowl-stage {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .${p}-orange-badge {
      margin-top: -22px;
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
      color: #FFFFFF;
      border-radius: 22px;
      padding: 18px 26px;
      min-width: 250px;
      box-shadow: 0 20px 40px rgba(245, 158, 11, 0.32);
    }
    .${p}-wrap {
      max-width: 1320px;
      margin: 0 auto;
      padding: var(--space-section) clamp(20px, 4.5vw, 48px);
    }
    .${p}-h2 {
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 3.2vw, 2.6rem);
      font-weight: 700;
      line-height: 1.12;
      letter-spacing: -0.02em;
      margin-bottom: 14px;
    }
    .${p}-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
      margin-top: 24px;
    }
    .${p}-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 26px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-card:hover { transform: translateY(-4px); }
    .${p}-modal {
      position: fixed;
      inset: 0;
      background: rgba(30, 32, 37, 0.72);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 500px;
      width: 100%;
      background: #FFFFFF;
      border-radius: 26px;
      padding: 32px;
      border: 1px solid var(--border);
    }
    @media (max-width: 960px) {
      .${p}-dark-wedge { display: none; }
      .${p}-hero-grid, .${p}-grid-3 { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .${p}-stage-shell { margin: 12px; border-radius: 24px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="cursorRing" style="position:fixed;width:28px;height:28px;border:1px solid rgba(245,158,11,0.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate3d(-100px,-100px,0);"></div>
  <div id="cursorDot" style="position:fixed;width:6px;height:6px;background:#F59E0B;border-radius:50%;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);"></div>

  <div class="${p}-stage-shell">
    <div class="${p}-dark-wedge" aria-hidden="true"></div>

    <header class="${p}-nav">
      <a href="#main-content" class="${p}-brand">
        <span>F</span>
        <span style="display:inline-block;width:16px;height:16px;border-radius:50%;border:3px solid #F59E0B;"></span>
        <span style="display:inline-block;width:16px;height:16px;border-radius:50%;border:3px solid #F59E0B;margin-left:-5px;"></span>
        <span>DS</span>
      </a>
      <nav class="${p}-nav-links" aria-label="Primary Navigation">
        <a href="#main-content" class="${p}-nav-link is-active">Home</a>
        <a href="#kitchen-telemetry" class="${p}-nav-link">Menu</a>
        <a href="#kitchen-telemetry" class="${p}-nav-link">Service</a>
        <a href="#kitchen-telemetry" class="${p}-nav-link">Shop</a>
      </nav>
      <div style="display:flex;align-items:center;gap:12px;">
        <button type="button" id="motionToggleBtn" class="${p}-step-btn" style="width:auto;padding:6px 14px;border-radius:999px;font-size:12px;" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-login-pill">Login</button>
      </div>
    </header>

    <main id="main-content">
      <!-- ONE LIVE THING: INTERACTIVE DISH SWITCHER & REAL-TIME ORDER CALCULATOR -->
      <section class="${p}-hero-grid tabular-nums" aria-labelledby="heroHeading">
        <div>
          <h1 id="heroHeading" class="${p}-h1">Order your<br /><strong>favourite Foods</strong></h1>
          <p id="activeDishDesc" class="${p}-sub">
            Char-grilled herb chicken breast, crisp baby romaine, heirloom cherry tomatoes, shaved parmesan, and cold-pressed lemon vinaigrette.
          </p>

          <p class="${p}-total-line">Total order : <strong id="totalOrderOut">$24.30</strong></p>

          <div class="${p}-order-controls">
            <div class="${p}-stepper" role="group" aria-label="Order Quantity">
              <button type="button" id="qtyMinusBtn" class="${p}-step-btn" aria-label="Decrease quantity">−</button>
              <strong id="qtyValueOut" style="font-size:15px;min-width:18px;text-align:center;">2</strong>
              <button type="button" id="qtyPlusBtn" class="${p}-step-btn" aria-label="Increase quantity">+</button>
            </div>

            <button type="button" class="${p}-buy-btn" data-seamless-trigger="Instant Checkout — FOODS Express">
              <span class="${p}-buy-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </span>
              <span>Buy Now</span>
            </button>
          </div>

          <div class="${p}-dish-pills" role="group" aria-label="Select Featured Dish">
            <button type="button" class="${p}-dish-pill dish-switch-btn" style="background:#84CC16;" data-name="Burger" data-price="12.15" data-pill="$3.25" data-rating="4.9" data-time="12-16 mins" data-desc="Double smashed Wagyu patty, aged sharp cheddar, house dill pickles, and toasted brioche bun.">
              <strong style="display:block;font-size:15px;">Burger</strong>
              <span style="font-size:13px;opacity:0.92;">$ 3.25</span>
            </button>
            <button type="button" class="${p}-dish-pill dish-switch-btn" style="background:#EC4899;" data-name="Cake" data-price="9.50" data-pill="$2.25" data-rating="4.8" data-time="8-12 mins" data-desc="Velvety Hokkaido strawberry shortcake layered with Madagascar vanilla chantilly cream.">
              <strong style="display:block;font-size:15px;">Cake</strong>
              <span style="font-size:13px;opacity:0.92;">$ 2.25</span>
            </button>
            <button type="button" class="${p}-dish-pill dish-switch-btn is-active" style="background:#F59E0B;" data-name="Salad" data-price="12.15" data-pill="$5.25" data-rating="4.7" data-time="10-18 mins" data-desc="Char-grilled herb chicken breast, crisp baby romaine, heirloom cherry tomatoes, shaved parmesan, and cold-pressed lemon vinaigrette.">
              <strong style="display:block;font-size:15px;">Salad</strong>
              <span style="font-size:13px;opacity:0.92;">$ 5.25</span>
            </button>
          </div>
        </div>

        <div class="${p}-bowl-stage">
          <svg viewBox="0 0 360 360" style="width:100%;max-width:330px;height:auto;filter:drop-shadow(0 28px 40px rgba(0,0,0,0.45));" role="img" aria-label="Top-down ceramic gourmet bowl with grilled chicken, greens, cherry tomatoes, and lime">
            <circle cx="180" cy="180" r="154" fill="#181A20" stroke="#3F4451" stroke-width="8" />
            <circle cx="180" cy="180" r="132" fill="#232730" />
            <!-- Fresh Greens -->
            <circle cx="135" cy="135" r="42" fill="#4D7C0F" />
            <circle cx="220" cy="128" r="38" fill="#65A30D" />
            <circle cx="128" cy="215" r="36" fill="#3F6212" />
            <!-- Grilled Chicken Slices -->
            <rect x="145" y="148" width="92" height="24" rx="12" transform="rotate(-14 145 148)" fill="#D97706" />
            <rect x="150" y="176" width="96" height="24" rx="12" transform="rotate(-14 150 176)" fill="#B45309" />
            <rect x="158" y="204" width="84" height="22" rx="11" transform="rotate(-14 158 204)" fill="#F59E0B" />
            <!-- Cherry Tomatoes & Seeds -->
            <circle cx="235" cy="215" r="18" fill="#DC2626" />
            <circle cx="195" cy="115" r="15" fill="#EF4444" />
            <circle cx="115" cy="175" r="14" fill="#FBBF24" />
          </svg>

          <div class="${p}-orange-badge">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <strong id="badgeDishName" style="font-size:20px;">Salad</strong>
              <span style="display:inline-flex;align-items:center;gap:4px;font-size:14px;font-weight:600;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span id="badgeDishRating">4.7</span>
              </span>
            </div>
            <span id="badgeDishTime" style="display:inline-block;background:#262930;color:#FFFFFF;font-size:12px;padding:5px 12px;border-radius:999px;">10 - 18 mins</span>
          </div>
        </div>
      </section>

      <!-- NUTRITIONAL & DISPATCH GUARANTEES -->
      <section id="kitchen-telemetry" class="${p}-wrap tabular-nums" aria-labelledby="telemetryHeading">
        <h2 id="telemetryHeading" class="${p}-h2">Precision Cloud Kitchen Standards</h2>
        <div class="${p}-grid-3">
          <article class="${p}-card ${p}-reveal">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">01 // MACRO VERIFIED</span>
            <h3 style="font-size:20px;margin:8px 0;">42g Lean Protein / Bowl</h3>
            <p style="font-size:14px;color:var(--muted);max-width:46ch;">Every portion is weighed on smart induction scales for exact calorie and macro consistency.</p>
          </article>
          <article class="${p}-card ${p}-reveal">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">02 // THERMAL SEAL</span>
            <h3 style="font-size:20px;margin:8px 0;">10–18 Minute Hot Dispatch</h3>
            <p style="font-size:14px;color:var(--muted);max-width:46ch;">Dual-zone compostable bowls keep grilled proteins piping hot and baby greens crisp at 4°C.</p>
          </article>
          <article class="${p}-card ${p}-reveal">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">03 // ZERO SEED OILS</span>
            <h3 style="font-size:20px;margin:8px 0;">100% Extra-Virgin Olive &amp; Avocado</h3>
            <p style="font-size:14px;color:var(--muted);max-width:46ch;">Cold-pressed dressings whisked fresh every morning with organic local micro-herbs.</p>
          </article>
        </div>
      </section>
    </main>
  </div>

  <footer class="${p}-wrap" style="padding-top:16px;padding-bottom:44px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
    <span>© 2026 FOODS Gourmet Cloud Kitchens. Freshly plated on demand.</span>
    <span style="font-family:var(--font-mono);color:var(--accent-text);">AVERAGE DELIVERY • 14 MINS</span>
  </footer>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">FOODS EXPRESS CHECKOUT</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-step-btn" style="width:auto;padding:6px 14px;border-radius:999px;">Close</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">Confirm Your Gourmet Order</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;max-width:48ch;">
        Your order is routed directly to our nearest culinary pod. Live courier GPS tracking starts the moment your bowl is sealed.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-login-pill" style="width:100%;padding:14px;">Place Order Now</button>
    </div>
  </div>

  <script>
    (function () {
      var qty = 2;
      var unitPrice = 12.15;
      var qtyOut = document.getElementById('qtyValueOut');
      var totalOut = document.getElementById('totalOrderOut');
      var minusBtn = document.getElementById('qtyMinusBtn');
      var plusBtn = document.getElementById('qtyPlusBtn');
      var descOut = document.getElementById('activeDishDesc');
      var nameOut = document.getElementById('badgeDishName');
      var rateOut = document.getElementById('badgeDishRating');
      var timeOut = document.getElementById('badgeDishTime');

      function renderTotal() {
        if (qtyOut) qtyOut.textContent = String(qty);
        if (totalOut) totalOut.textContent = '$' + (qty * unitPrice).toFixed(2);
      }
      if (minusBtn) {
        minusBtn.addEventListener('click', function () {
          qty = Math.max(1, qty - 1);
          renderTotal();
        });
      }
      if (plusBtn) {
        plusBtn.addEventListener('click', function () {
          qty = Math.min(12, qty + 1);
          renderTotal();
        });
      }

      document.querySelectorAll('.dish-switch-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.dish-switch-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          unitPrice = parseFloat(btn.getAttribute('data-price') || '12.15');
          if (descOut) descOut.textContent = btn.getAttribute('data-desc') || '';
          if (nameOut) nameOut.textContent = btn.getAttribute('data-name') || 'Salad';
          if (rateOut) rateOut.textContent = btn.getAttribute('data-rating') || '4.7';
          if (timeOut) timeOut.textContent = btn.getAttribute('data-time') || '10 - 18 mins';
          renderTotal();
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 14. VISIONGLASS NEO UI (Product Design Apple Vision Pro Spatial Workbench)
  // ============================================================================
  if (slug === 'visionglass-neo-ui') {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>VisionGlass Neo UI — Product Design Apple Vision Pro Spatial Component System</title>
  <meta name="description" content="Neo-Apple Vision Pro spatial UI kit featuring pastel aurora 3D glass refraction, tactile rotary dials, spatial toggle switches, and live CSS glass token export." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #DCE4EE;
      --surface: rgba(255, 255, 255, 0.78);
      --surface-2: rgba(255, 255, 255, 0.52);
      --text: #0F172A;
      --muted: #475569;
      --accent: #2563EB;
      --accent-text: #1D4ED8;
      --border: rgba(255, 255, 255, 0.75);
      --radius-card: 28px;
      --font-display: 'Space Grotesk', 'Inter', sans-serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --space-section: clamp(56px, 7vw, 96px);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: #FFFFFF; }
    html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--font-sans); overflow-x: clip; max-width: 100%; }
    body { background: linear-gradient(145deg, #D5DFEC 0%, #EBF0F7 50%, #D2DCE9 100%); color: var(--text); overflow-x: clip; max-width: 100%; line-height: 1.6; }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--accent); color: #FFFFFF; font-weight: 700; border-radius: 8px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid var(--text); }
    a, button, input { font-family: inherit; }
    a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-window {
      max-width: 1280px;
      margin: 28px auto;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: 36px;
      padding: clamp(20px, 3.5vw, 40px);
      box-shadow: 0 32px 80px rgba(15, 23, 42, 0.12), inset 0 1px 2px #FFFFFF;
    }
    .${p}-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .${p}-pill-btn {
      padding: 9px 18px;
      border-radius: 999px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      background: rgba(255, 255, 255, 0.88);
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }
    .${p}-pill-btn:hover, .${p}-pill-btn.is-active {
      background: var(--accent);
      color: #FFFFFF;
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .${p}-pill-btn:active { transform: scale(0.97); }

    .${p}-aurora-stage {
      border-radius: 28px;
      padding: clamp(28px, 5vw, 56px);
      background: radial-gradient(circle at 75% 30%, rgba(244, 114, 182, 0.45) 0%, rgba(56, 189, 248, 0.42) 45%, rgba(255, 255, 255, 0.88) 90%);
      border: 1px solid #FFFFFF;
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 32px;
      align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(2.35rem, 4.6vw, 3.85rem);
      font-weight: 700;
      line-height: 1.06;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
    }
    .${p}-h2 {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 3vw, 2.45rem);
      font-weight: 700;
      line-height: 1.12;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
    }
    .${p}-sub {
      font-size: 15px;
      color: var(--muted);
      max-width: 52ch;
      margin-bottom: 24px;
    }
    .${p}-workbench {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 24px;
      margin-top: 28px;
    }
    .${p}-glass-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 26px;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06), inset 0 1px 1px #FFFFFF;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-glass-card:hover { transform: translateY(-3px); }
    .${p}-modal {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(12px);
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
      border-radius: 28px;
      padding: 32px;
      border: 1px solid var(--border);
    }
    @media (max-width: 920px) {
      .${p}-aurora-stage, .${p}-workbench { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .${p}-window { margin: 12px; padding: 16px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="cursorRing" style="position:fixed;width:28px;height:28px;border:1px solid rgba(37,99,235,0.45);border-radius:50%;pointer-events:none;z-index:9998;transform:translate3d(-100px,-100px,0);"></div>
  <div id="cursorDot" style="position:fixed;width:6px;height:6px;background:#2563EB;border-radius:50%;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);"></div>

  <div class="${p}-window">
    <header class="${p}-top-bar">
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:12px;height:12px;border-radius:50%;background:#38BDF8;display:inline-block;"></span>
        <strong style="font-family:var(--font-display);font-size:18px;">VisionGlass Neo UI</strong>
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);padding:4px 10px;border-radius:999px;background:var(--surface-2);">visionOS 2.4 HIG</span>
      </div>
      <nav aria-label="Primary Navigation" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <a href="#spatial-workbench" class="${p}-pill-btn">Product Section</a>
        <a href="#token-exporter" class="${p}-pill-btn">Refraction Tokens</a>
        <button type="button" id="motionToggleBtn" class="${p}-pill-btn" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-pill-btn is-active">Copy Spatial Kit</button>
      </nav>
    </header>

    <main id="main-content">
      <section class="${p}-aurora-stage" aria-labelledby="heroHeading">
        <div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);font-weight:600;display:block;margin-bottom:10px;">SPATIAL COMPUTING INTERFACE SYSTEM</span>
          <h1 id="heroHeading" class="${p}-h1">Product Design<br />Apple Vision Pro</h1>
          <p class="${p}-sub">
            Tactile neumorphic rotary dials, iridescent glassmorphism windows, and eye-tracked specular highlights engineered for next-generation spatial web apps.
          </p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button type="button" class="${p}-pill-btn is-active" data-seamless-trigger="Download VisionGlass Neo Figma &amp; CSS Kit">Get UI Kit (v2.4)</button>
            <a href="#spatial-workbench" class="${p}-pill-btn">Test Live Widgets</a>
          </div>
        </div>

        <div style="text-align:center;">
          <svg viewBox="0 0 400 260" style="width:100%;max-width:360px;height:auto;" role="img" aria-label="Iridescent 3D spatial glass sculpture with floating visionOS control pills">
            <defs>
              <linearGradient id="auroraRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38BDF8" />
                <stop offset="50%" stop-color="#A855F7" />
                <stop offset="100%" stop-color="#F472B6" />
              </linearGradient>
            </defs>
            <rect x="30" y="25" width="340" height="210" rx="28" fill="rgba(255,255,255,0.65)" stroke="#FFFFFF" stroke-width="2" />
            <path d="M85 175 C115 65, 205 65, 235 165 C265 215, 315 95, 330 75" fill="none" stroke="url(#auroraRibbon)" stroke-width="28" stroke-linecap="round" />
            <circle cx="155" cy="115" r="34" fill="rgba(255,255,255,0.78)" stroke="#FFFFFF" stroke-width="2" />
          </svg>
        </div>
      </section>

      <!-- ONE LIVE THING: SPATIAL DEPTH & REFRACTION TOKEN WORKBENCH -->
      <section id="spatial-workbench" class="${p}-workbench tabular-nums" aria-labelledby="workHeading">
        <div class="${p}-glass-card" id="token-exporter">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);font-weight:600;">PRODUCT SECTION // LIVE TOKENS</span>
          <h2 id="workHeading" class="${p}-h2" style="margin-top:6px;">Spatial Glass Refraction Dial</h2>
          <p style="font-size:14px;color:var(--muted);max-width:48ch;margin-bottom:18px;">
            Adjust backdrop blur radius and specular Z-depth to preview real-time visionOS glass tokens:
          </p>
          <label for="blurRangeInput" style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;">
            Glass Blur Radius: <strong id="blurValOut" style="color:var(--accent);">28px</strong>
          </label>
          <input id="blurRangeInput" type="range" min="8" max="48" step="2" value="28" style="width:100%;accent-color:#2563EB;cursor:pointer;margin-bottom:18px;" />

          <div role="group" aria-label="Spatial Surface Tint" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="${p}-pill-btn is-active tint-btn" data-tint="Cyan Gaze (rgba(56, 189, 248, 0.24))" data-code="backdrop-filter: blur(28px) saturate(190%); background: rgba(56, 189, 248, 0.24);">Cyan Gaze</button>
            <button type="button" class="${p}-pill-btn tint-btn" data-tint="Aurora Rose (rgba(244, 114, 182, 0.24))" data-code="backdrop-filter: blur(28px) saturate(210%); background: rgba(244, 114, 182, 0.24);">Aurora Rose</button>
            <button type="button" class="${p}-pill-btn tint-btn" data-tint="Titanium Frost (rgba(255, 255, 255, 0.78))" data-code="backdrop-filter: blur(28px) saturate(160%); background: rgba(255, 255, 255, 0.78);">Titanium Frost</button>
          </div>
        </div>

        <div class="${p}-glass-card" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <strong id="activeTintLabel" style="font-family:var(--font-display);font-size:20px;">Cyan Gaze (rgba(56, 189, 248, 0.24))</strong>
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">60 FPS EYE-TRACKED</span>
            </div>
            <pre id="cssTokenOutput" style="font-family:var(--font-mono);font-size:13px;padding:18px;border-radius:18px;background:#0F172A;color:#E0F2FE;overflow-x:auto;margin-bottom:18px;">backdrop-filter: blur(28px) saturate(190%);
background: rgba(56, 189, 248, 0.24);
box-shadow: inset 0 1px 1px #FFFFFF;</pre>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center;">
            <article style="padding:12px;border-radius:16px;background:var(--surface-2);">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">SPECULAR</span>
              <strong style="font-size:18px;">1.5px Rim</strong>
            </article>
            <article style="padding:12px;border-radius:16px;background:var(--surface-2);">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">FOV SCALE</span>
              <strong style="font-size:18px;">1.04x Hover</strong>
            </article>
            <article style="padding:12px;border-radius:16px;background:var(--surface-2);">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);display:block;">COMPONENTS</span>
              <strong style="font-size:18px;">140+ Ready</strong>
            </article>
          </div>
        </div>
      </section>

      <section style="margin-top:24px;" aria-labelledby="spatialSpecsHeading">
        <div class="${p}-glass-card tabular-nums">
          <h2 id="spatialSpecsHeading" class="${p}-h2">Spatial HIG Component Architecture</h2>
          <p style="font-size:14px;color:var(--muted);max-width:60ch;">Every VisionGlass control respects 60pt minimum eye-gaze targets, dynamic specular edge lighting, and true Z-axis parallax elevation.</p>
        </div>
      </section>
    </main>

    <footer style="margin-top:36px;padding-top:20px;border-top:1px solid rgba(15,23,42,0.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
      <span>© 2026 VisionGlass Neo UI System. Designed for Spatial Web &amp; visionOS.</span>
      <span style="font-family:var(--font-mono);color:var(--accent-text);">SPATIAL HIG COMPLIANT</span>
    </footer>
  </div>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">VISIONGLASS NEO KIT</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-btn">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:26px;margin-bottom:10px;">Spatial Design Token Package</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;max-width:52ch;">
        Includes Figma variable collections, CSS/Tailwind glassmorphism tokens, and interactive 3D rotary dial components.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill-btn is-active" style="width:100%;">Download Spatial Package</button>
    </div>
  </div>

  <script>
    (function () {
      var blurRange = document.getElementById('blurRangeInput');
      var blurVal = document.getElementById('blurValOut');
      var tintLabel = document.getElementById('activeTintLabel');
      var codeOut = document.getElementById('cssTokenOutput');
      var activeBg = 'rgba(56, 189, 248, 0.24)';

      function updateToken() {
        var b = blurRange ? blurRange.value : '28';
        if (blurVal) blurVal.textContent = b + 'px';
        if (codeOut) {
          codeOut.textContent = 'backdrop-filter: blur(' + b + 'px) saturate(190%);\\nbackground: ' + activeBg + ';\\nbox-shadow: inset 0 1px 1px #FFFFFF;';
        }
      }
      if (blurRange) blurRange.addEventListener('input', updateToken);

      document.querySelectorAll('.tint-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.tint-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var t = btn.getAttribute('data-tint') || '';
          if (tintLabel) tintLabel.textContent = t;
          var m = t.match(/rgba\\([^)]+\\)/);
          if (m) activeBg = m[0];
          updateToken();
        });
      });
    })();
  </script>
  ${renderV2Runtime(p)}
</body>
</html>`;
  }

  // ============================================================================
  // 15. O2 MOONISH COSMIC (O2® Studio — Cosmic Set 23 / Late 2050 Glass Sphere Drop)
  // ============================================================================
  if (slug === 'o2-moonish-cosmic') {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>O2® Studio — Moonish Cosmic Set 23 • 01 Classic Hoodie The Late 2050</title>
  <meta name="description" content="01 Classic Hoodie by O2 Studio — The Late 2050. 53% Cotton 47% Polyester desert-glass streetwear capsule encased in a translucent 3D sphere." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #231F1E;
      --surface: rgba(214, 204, 194, 0.16);
      --surface-2: rgba(255, 255, 255, 0.08);
      --text: #F5F2EE;
      --muted: rgba(245, 242, 238, 0.74);
      --accent: #E5D5C5;
      --accent-text: #FDE68A;
      --border: rgba(245, 242, 238, 0.22);
      --radius-card: 28px;
      --font-display: 'Syne', 'Space Grotesk', sans-serif;
      --font-sans: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --space-section: clamp(56px, 7vw, 96px);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    ::selection { background: var(--accent); color: #1B1817; }
    html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: var(--font-sans); overflow-x: clip; max-width: 100%; }
    body {
      background: radial-gradient(circle at 50% 18%, #574E49 0%, #2E2927 52%, #1B1817 100%);
      color: var(--text);
      overflow-x: clip;
      max-width: 100%;
      line-height: 1.6;
    }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 9999; padding: 10px 18px; background: var(--accent); color: #1B1817; font-weight: 700; border-radius: 8px; text-decoration: none; }
    .skip-link:focus-visible { top: 16px; outline: 2px solid #FFFFFF; }
    a, button { font-family: inherit; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 3px; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .is-motion-paused *, .is-motion-paused *::before, .is-motion-paused *::after { animation-play-state: paused !important; transition-duration: 0.01ms !important; }

    .${p}-shell {
      max-width: 1320px;
      margin: 0 auto;
      padding: 22px clamp(18px, 4vw, 42px);
    }
    .${p}-glass-bar {
      background: rgba(214, 204, 194, 0.16);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .${p}-brand {
      font-family: var(--font-display);
      font-size: 22px;
      font-weight: 800;
      color: var(--text);
      text-decoration: none;
      letter-spacing: -0.03em;
    }
    .${p}-nav-links {
      display: flex;
      gap: 24px;
      align-items: center;
      flex-wrap: wrap;
    }
    .${p}-nav-link {
      color: var(--muted);
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    .${p}-nav-link:hover { color: #FFFFFF; }
    .${p}-pill {
      padding: 9px 18px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.1);
      color: var(--text);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }
    .${p}-pill:hover, .${p}-pill.is-active {
      background: #F5F2EE;
      color: #1B1817;
      border-color: #F5F2EE;
      transform: translateY(-1px);
    }
    .${p}-pill:active { transform: scale(0.97); }

    .${p}-main-frame {
      background: rgba(214, 204, 194, 0.14);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border);
      border-radius: 34px;
      padding: clamp(22px, 3.5vw, 40px);
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.38);
    }
    .${p}-meta-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      margin-bottom: 28px;
    }
    .${p}-stage-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 32px;
      align-items: center;
    }
    .${p}-h1 {
      font-family: var(--font-display);
      font-size: clamp(2.1rem, 4.2vw, 3.5rem);
      font-weight: 800;
      line-height: 1.04;
      letter-spacing: -0.03em;
      margin-bottom: 14px;
    }
    .${p}-h2 {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
    }
    .${p}-sneaker-card {
      background: rgba(28, 25, 23, 0.55);
      border: 1px solid var(--border);
      border-radius: 26px;
      padding: 24px;
      margin-top: 20px;
    }
    .${p}-sphere-card {
      background: radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.26) 0%, rgba(214, 199, 184, 0.12) 60%, rgba(28, 25, 23, 0.45) 100%);
      border: 1px solid var(--border);
      border-radius: 30px;
      padding: 28px;
      text-align: center;
      position: relative;
    }
    .${p}-bottom-bar {
      margin-top: 18px;
      background: rgba(214, 204, 194, 0.16);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 14px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      font-family: var(--font-mono);
      font-size: 12px;
    }
    .${p}-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 24px;
    }
    .${p}-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 24px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-card:hover { transform: translateY(-4px); }
    .${p}-modal {
      position: fixed;
      inset: 0;
      background: rgba(18, 16, 15, 0.82);
      backdrop-filter: blur(12px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 20px;
    }
    .${p}-modal.is-open { display: flex; }
    .${p}-modal-box {
      max-width: 500px;
      width: 100%;
      background: #262220;
      border-radius: 28px;
      padding: 32px;
      border: 1px solid var(--border);
    }
    @media (max-width: 920px) {
      .${p}-meta-row { grid-template-columns: 1fr 1fr; }
      .${p}-stage-grid, .${p}-grid-3 { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .${p}-meta-row { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="cursorRing" style="position:fixed;width:28px;height:28px;border:1px solid rgba(245,242,238,0.45);border-radius:50%;pointer-events:none;z-index:9998;transform:translate3d(-100px,-100px,0);"></div>
  <div id="cursorDot" style="position:fixed;width:6px;height:6px;background:#F5F2EE;border-radius:50%;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);"></div>

  <div class="${p}-shell">
    <header class="${p}-glass-bar">
      <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
        <a href="#main-content" class="${p}-brand">O2<sup>®</sup></a>
        <span style="font-size:13px;color:var(--muted);">Moonish</span>
        <nav class="${p}-nav-links" aria-label="Primary Navigation">
          <a href="#capsule-customizer" class="${p}-nav-link">New in</a>
          <a href="#capsule-customizer" class="${p}-nav-link">Hot drops</a>
          <a href="#cosmic-archive" class="${p}-nav-link">Collection</a>
        </nav>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" id="motionToggleBtn" class="${p}-pill" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-pill is-active">O2 SHOP NEW COLLECTION</button>
      </div>
    </header>

    <main id="main-content">
      <section class="${p}-main-frame tabular-nums" aria-labelledby="heroHeading">
        <div class="${p}-meta-row">
          <div><strong style="color:var(--text);">01</strong> CLASSIC HOODIE<br />BY O2 STUDIO</div>
          <div>THE LATE 2050<br />DESERT CAPSULE</div>
          <div>53% COTTON<br />47% POLYESTER</div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>3 COLORS</span>
            <button type="button" class="${p}-pill" data-seamless-trigger="O2 Studio Member Login">Log in</button>
          </div>
        </div>

        <div class="${p}-stage-grid">
          <div>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">MOONISH COSMIC SET 23</span>
            <h1 id="heroHeading" class="${p}-h1">O2 HOODIE • ENCASED IN GLASS</h1>
            <p style="font-size:14px;color:var(--muted);max-width:48ch;margin-bottom:18px;">
              Heavyweight 580GSM brushed fleece sculpted inside a zero-gravity desert biosphere. Engineered with drop-shoulder seams and garment-dyed dune patinas.
            </p>

            <!-- ONE LIVE THING: INTERACTIVE 2050 COLORWAY & BUNDLE SWITCHER -->
            <div id="capsule-customizer" role="group" aria-label="Select 2050 Capsule Colorway" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
              <button type="button" class="${p}-pill is-active color-btn" data-color="Dune Beige / Larger" data-price="119$" data-tint="#D6C7B8" data-note="Garment-washed Sahara sand fleece with raw-edge kangaroo pocket.">Dune Beige (119$)</button>
              <button type="button" class="${p}-pill color-btn" data-color="Lunar Obsidian / Oversized" data-price="129$" data-tint="#3F3A38" data-note="Carbon-dyed heavyweight loopback cotton with reflective 2050 chest seal.">Lunar Obsidian (129$)</button>
              <button type="button" class="${p}-pill color-btn" data-color="Martian Clay / Boxy" data-price="125$" data-tint="#B45309" data-note="Sun-baked terracotta pigment with double-layered storm hood.">Martian Clay (125$)</button>
            </div>
            <p id="colorwayNoteOut" style="font-size:13px;color:var(--muted);max-width:46ch;">
              Garment-washed Sahara sand fleece with raw-edge kangaroo pocket.
            </p>

            <div class="${p}-sneaker-card">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <strong style="font-family:var(--font-display);font-size:16px;">NIKE SNEAKERS • DUNE LOW</strong>
                <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">PAIR +89$</span>
              </div>
              <p style="font-size:13px;color:var(--muted);margin-bottom:12px;max-width:44ch;">Cordura ballistic mesh &amp; sculpted foam sole matched to Cosmic Set 23.</p>
              <button type="button" class="${p}-pill" data-seamless-trigger="Refresh Moonish Footwear Pairing">REFRESH Moonish</button>
            </div>
          </div>

          <div class="${p}-sphere-card">
            <svg viewBox="0 0 380 340" style="width:100%;max-width:340px;height:auto;" role="img" aria-label="O2 Studio oversized beige hoodie suspended inside a translucent 3D glass sphere">
              <defs>
                <radialGradient id="o2Sphere" cx="35%" cy="28%" r="70%">
                  <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55" />
                  <stop offset="65%" stop-color="#D6C7B8" stop-opacity="0.18" />
                  <stop offset="100%" stop-color="#1B1817" stop-opacity="0.45" />
                </radialGradient>
              </defs>
              <circle cx="190" cy="170" r="142" fill="url(#o2Sphere)" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
              <!-- Sculpted Hoodie Silhouette -->
              <path id="hoodieSvgPath" d="M135 110 C150 82, 230 82, 245 110 L285 155 L260 182 L240 155 L240 245 L140 245 L140 155 L120 182 L95 155 Z" fill="#D6C7B8" stroke="#F5F2EE" stroke-width="2.5" stroke-linejoin="round" />
              <ellipse cx="190" cy="108" rx="26" ry="18" fill="#231F1E" />
              <ellipse cx="165" cy="95" rx="45" ry="14" fill="rgba(255,255,255,0.35)" transform="rotate(-18 165 95)" />
            </svg>

            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-top:12px;padding-top:16px;border-top:1px solid var(--border);">
              <div style="text-align:left;">
                <span id="hoodieVariantLabel" style="font-size:13px;color:var(--muted);display:block;">HOODIE beige / larger</span>
                <strong id="hoodiePriceOut" style="font-family:var(--font-display);font-size:28px;">119$</strong>
              </div>
              <button type="button" id="addToCartSphereBtn" class="${p}-pill is-active" data-seamless-trigger="Add 01 Classic Hoodie (Cosmic Set 23) to Cart">
                <span>Add to cart</span>
                <span aria-hidden="true">+</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="${p}-bottom-bar" aria-label="Hot Drop Status">
        <span>NEW DROP</span>
        <span>COSMIC SET 23 ↗</span>
        <span style="color:var(--accent-text);">HOT DROP BY O2 STUDIO</span>
      </section>

      <!-- COSMIC ARCHIVE SPECIFICATIONS -->
      <section id="cosmic-archive" style="padding:var(--space-section) 0 24px;" aria-labelledby="archiveHeading">
        <h2 id="archiveHeading" class="${p}-h2">Late 2050 Textile Engineering</h2>
        <div class="${p}-grid-3 tabular-nums">
          <article class="${p}-card ${p}-reveal">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">01 // THERMO-FLEECE</span>
            <h3 style="font-family:var(--font-display);font-size:20px;margin:8px 0;">580 GSM Desert Weave</h3>
            <p style="font-size:14px;color:var(--muted);max-width:46ch;">53% organic long-staple cotton blended with 47% recycled technical polyester for architectural drape.</p>
          </article>
          <article class="${p}-card ${p}-reveal">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">02 // SPHERE PACKAGING</span>
            <h3 style="font-family:var(--font-display);font-size:20px;margin:8px 0;">Vacuum Orb Delivery</h3>
            <p style="font-size:14px;color:var(--muted);max-width:46ch;">Each Cosmic Set 23 piece ships inside a reusable polycarbonate display hemisphere with NFC serial authentication.</p>
          </article>
          <article class="${p}-card ${p}-reveal">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-text);">03 // ZERO RESTORATION</span>
            <h3 style="font-family:var(--font-display);font-size:20px;margin:8px 0;">300-Piece Numbered Edition</h3>
            <p style="font-size:14px;color:var(--muted);max-width:46ch;">Once Cosmic Set 23 sells out, the dye vats are retired permanently to preserve archival collector value.</p>
          </article>
        </div>
      </section>
    </main>

    <footer style="padding:24px 0 40px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--muted);">
      <span>© 2026 O2® Studio — Moonish Cosmic Set 23. All rights reserved.</span>
      <span style="font-family:var(--font-mono);color:var(--accent-text);">WORLDWIDE ORB DISPATCH</span>
    </footer>
  </div>

  <div id="seamlessModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent-text);">O2® STUDIO VAULT</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:26px;margin-bottom:10px;">Reserve Cosmic Set 23</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;max-width:48ch;">
        Includes serialized 01 Classic Hoodie in collector sphere packaging and priority access to Late 2050 footwear drops.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill is-active" style="width:100%;justify-content:center;">Proceed to Encrypted Bag</button>
    </div>
  </div>

  <script>
    (function () {
      var vLabel = document.getElementById('hoodieVariantLabel');
      var pOut = document.getElementById('hoodiePriceOut');
      var noteOut = document.getElementById('colorwayNoteOut');
      var svgPath = document.getElementById('hoodieSvgPath');

      document.querySelectorAll('.color-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.color-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          if (vLabel) vLabel.textContent = 'HOODIE ' + (btn.getAttribute('data-color') || '');
          if (pOut) pOut.textContent = btn.getAttribute('data-price') || '119$';
          if (noteOut) noteOut.textContent = btn.getAttribute('data-note') || '';
          if (svgPath) svgPath.setAttribute('fill', btn.getAttribute('data-tint') || '#D6C7B8');
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
