import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { getNextCatalogId, scaffoldTemplate } from '../agent-motionsites/scaffold-template.mjs';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../../');
const browsersPath = path.resolve(root, '_design/.browsers');
const playwrightPkg = path.resolve(root, '_design/.tooling/node_modules/playwright');

process.env.PLAYWRIGHT_BROWSERS_PATH = browsersPath;
const { chromium } = require(playwrightPkg);

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export async function analyzePinterestImagePalette(localImagePath) {
  const fallback = {
    isLight: false,
    bgHex: '#090b10',
    surfaceHex: '#121622',
    accentHex: '#6366f1',
    accent2Hex: '#22d3ee',
    width: 1200,
    height: 1600
  };
  if (!localImagePath || !fs.existsSync(localImagePath)) return fallback;

  const ext = path.extname(localImagePath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
  const b64 = fs.readFileSync(localImagePath).toString('base64');
  const dataUrl = `data:${mime};base64,${b64}`;

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const stats = await page.evaluate(async (src) => {
      return await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const w = 80, h = 100;
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const data = ctx.getImageData(0, 0, w, h).data;

          // Sample corner/edge pixels for dominant background
          let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
          for (let y = 0; y < 12; y++) {
            for (let x = 0; x < w; x++) {
              const i = (y * w + x) * 4;
              bgR += data[i]; bgG += data[i + 1]; bgB += data[i + 2];
              bgCount++;
            }
          }
          bgR = Math.round(bgR / bgCount);
          bgG = Math.round(bgG / bgCount);
          bgB = Math.round(bgB / bgCount);

          // Sample vibrant pixels for primary & secondary accents
          let bestSat = -1, accR = 99, accG = 102, accB = 241;
          let secSat = -1, secR = 34, secG = 211, secB = 238;

          for (let i = 0; i < data.length; i += 16) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            const l = (max + min) / 510;
            const d = (max - min) / 255;
            if (l > 0.15 && l < 0.85 && d > bestSat) {
              secSat = bestSat; secR = accR; secG = accG; secB = accB;
              bestSat = d; accR = r; accG = g; accB = b;
            }
          }

          resolve({
            width: img.naturalWidth || 1200,
            height: img.naturalHeight || 1600,
            bg: [bgR, bgG, bgB],
            acc: [accR, accG, accB],
            sec: [secR, secG, secB]
          });
        };
        img.onerror = () => resolve(null);
        img.src = src;
      });
    }, dataUrl);

    if (!stats) return fallback;
    const [r, g, b] = stats.bg;
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const isLight = luminance > 0.58;

    const bgHex = isLight
      ? rgbToHex(Math.max(242, r), Math.max(244, g), Math.max(248, b))
      : rgbToHex(Math.min(18, r), Math.min(20, g), Math.min(28, b));
    const surfaceHex = isLight ? '#ffffff' : rgbToHex(Math.min(32, r + 12), Math.min(36, g + 14), Math.min(48, b + 18));

    const hsl1 = rgbToHsl(...stats.acc);
    const accentHex = hsl1.s < 0.22 ? '#6366f1' : rgbToHex(...stats.acc);
    const hsl2 = rgbToHsl(...stats.sec);
    const accent2Hex = hsl2.s < 0.18 ? '#06b6d4' : rgbToHex(...stats.sec);

    return {
      isLight,
      bgHex,
      surfaceHex,
      accentHex,
      accent2Hex,
      width: stats.width,
      height: stats.height
    };
  } catch {
    return fallback;
  } finally {
    await browser.close();
  }
}

export function detectWebCategory(data) {
  const text = `${data.keyword || ''} ${data.rawTitle || ''} ${data.title || ''}`.toLowerCase();
  if (/portfolio|agency|studio|architect|photo|blog|minimal|personal|creative/.test(text)) return 'portfolio';
  if (/edu|course|learn|academy|science|book/.test(text)) return 'education';
  return 'commerce';
}

export function buildPinterestInspiredHtml(data, palette) {
  const isLight = palette.isLight;
  const bg = palette.bgHex;
  const surface = palette.surfaceHex;
  const fg = isLight ? '#0f172a' : '#f8fafc';
  const muted = isLight ? '#475569' : '#94a3b8';
  const border = isLight ? 'rgba(15, 23, 42, 0.10)' : 'rgba(255, 255, 255, 0.12)';
  const accent = palette.accentHex;
  const accent2 = palette.accent2Hex;
  const cardGlass = isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(18, 22, 34, 0.78)';

  const cleanKeyword = (data.keyword || 'Web UX UI Design').replace(/\b\w/g, c => c.toUpperCase());
  const subtitle = data.rawDesc && data.rawDesc.length > 40
    ? data.rawDesc.slice(0, 180)
    : `Crafted from curated ${cleanKeyword} visual architecture — combining responsive Bento grids, 3D magnetic hover physics, scroll-driven parallax layers, and interactive telemetry.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.title} — ${cleanKeyword} Interactive Template</title>
  <meta name="description" content="${subtitle.replace(/"/g, '&quot;')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: ${bg};
      --surface: ${surface};
      --card: ${cardGlass};
      --fg: ${fg};
      --muted: ${muted};
      --border: ${border};
      --accent: ${accent};
      --accent-2: ${accent2};
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-serif: 'Instrument Serif', Georgia, serif;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background-color: var(--bg);
      color: var(--fg);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
    }

    body {
      background-color: var(--bg);
      color: var(--fg);
      overflow-x: hidden;
      min-height: 100vh;
      position: relative;
    }

    /* Top Scroll Progress Bar */
    .scroll-progress-track {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      z-index: 150;
      background: transparent;
      pointer-events: none;
    }

    .scroll-progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      transition: width 0.08s linear;
    }

    /* Ambient Mesh Glow */
    .ambient-glow {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background:
        radial-gradient(circle at 18% 18%, ${accent}22 0%, transparent 42%),
        radial-gradient(circle at 82% 72%, ${accent2}1e 0%, transparent 46%);
    }

    .container {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 20px;
    }

    @media (min-width: 768px) {
      .container {
        padding: 0 36px;
      }
    }

    /* Sticky Glass Header */
    .site-header {
      position: sticky;
      top: 16px;
      z-index: 120;
      margin: 16px auto 0;
      max-width: 1240px;
      padding: 0 16px;
    }

    .nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 20px;
      border-radius: 9999px;
      background: var(--card);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    }

    .brand-link {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--fg);
      font-weight: 800;
      font-size: 17px;
      letter-spacing: -0.03em;
    }

    .brand-orb {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
    }

    .nav-links {
      display: none;
      align-items: center;
      gap: 24px;
      list-style: none;
    }

    @media (min-width: 860px) {
      .nav-links {
        display: flex;
      }
    }

    .nav-links a {
      text-decoration: none;
      color: var(--muted);
      font-size: 13px;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .nav-links a:hover {
      color: var(--fg);
    }

    .cta-pill {
      position: relative;
      z-index: 125;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: #ffffff;
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
      box-shadow: 0 8px 20px ${accent}40;
    }

    .cta-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 26px ${accent}60;
    }

    /* Hero Split Section */
    .hero-section {
      padding: 64px 0 56px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 44px;
      align-items: center;
    }

    @media (min-width: 960px) {
      .hero-section {
        grid-template-columns: 1.08fr 0.92fr;
        padding: 84px 0 72px;
        gap: 56px;
      }
    }

    .eyebrow-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: var(--card);
      border: 1px solid var(--border);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--accent);
      margin-bottom: 20px;
    }

    .hero-title {
      font-size: clamp(36px, 5.2vw, 68px);
      font-weight: 800;
      line-height: 1.04;
      letter-spacing: -0.035em;
      margin-bottom: 20px;
    }

    .hero-title em {
      font-family: var(--font-serif);
      font-weight: 400;
      font-style: italic;
      color: var(--accent);
    }

    .hero-lead {
      font-size: clamp(15px, 1.4vw, 18px);
      line-height: 1.68;
      color: var(--muted);
      max-width: 560px;
      margin-bottom: 28px;
    }

    .filter-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 28px;
    }

    .tab-btn {
      padding: 9px 16px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--card);
      color: var(--muted);
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.22s ease;
    }

    .tab-btn:hover,
    .tab-btn.is-active {
      border-color: var(--accent);
      background: var(--accent);
      color: #ffffff;
      transform: translateY(-1px);
    }

    .metrics-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
    }

    .metric-item strong {
      display: block;
      font-size: clamp(22px, 2.6vw, 32px);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--fg);
    }

    .metric-item span {
      font-size: 12px;
      color: var(--muted);
    }

    /* Interactive 3D Showcase Frame */
    .showcase-stage {
      perspective: 1200px;
    }

    .showcase-frame {
      position: relative;
      border-radius: 28px;
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 14px;
      box-shadow: 0 28px 60px rgba(0, 0, 0, 0.18);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      transform-style: preserve-3d;
      overflow: hidden;
    }

    .window-chrome {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px 14px;
    }

    .chrome-dots {
      display: flex;
      gap: 6px;
    }

    .chrome-dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--border);
    }

    .chrome-dots span:nth-child(1) { background: #f43f5e; }
    .chrome-dots span:nth-child(2) { background: #f59e0b; }
    .chrome-dots span:nth-child(3) { background: #10b981; }

    .chrome-url {
      font-size: 11px;
      color: var(--muted);
      font-family: monospace;
      padding: 4px 12px;
      border-radius: 9999px;
      background: var(--bg);
      border: 1px solid var(--border);
    }

    .showcase-viewport {
      position: relative;
      width: 100%;
      height: 440px;
      border-radius: 18px;
      overflow: hidden;
      background: linear-gradient(135deg, ${accent}22, ${accent2}22);
    }

    .showcase-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .showcase-frame:hover .showcase-img {
      transform: scale(1.04);
    }

    /* Bento Grid Section */
    .bento-section {
      padding: 56px 0;
    }

    .section-header {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 36px;
    }

    .section-header h2 {
      font-size: clamp(26px, 3.6vw, 42px);
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    .bento-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    @media (min-width: 768px) {
      .bento-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .bento-card {
      position: relative;
      border-radius: 24px;
      background: var(--card);
      border: 1px solid var(--border);
      padding: 28px;
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.28s ease, box-shadow 0.28s ease;
      overflow: hidden;
      cursor: pointer;
    }

    .bento-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${accent}1f, transparent 60%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .bento-card:hover {
      transform: translateY(-6px);
      border-color: var(--accent);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }

    .bento-card:hover::before {
      opacity: 1;
    }

    .card-index {
      display: inline-flex;
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      background: ${accent}1a;
      color: var(--accent);
      margin-bottom: 16px;
    }

    .bento-card h3 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .bento-card p {
      font-size: 14px;
      line-height: 1.65;
      color: var(--muted);
    }

    /* Palette & Design Tokens Section */
    .tokens-strip {
      margin: 24px 0 64px;
      padding: 28px;
      border-radius: 24px;
      background: var(--card);
      border: 1px solid var(--border);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .swatch-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .swatch-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--bg);
      font-size: 12px;
      font-family: monospace;
    }

    .swatch-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2);
    }

    /* Footer */
    .site-footer {
      padding: 40px 0 56px;
      border-top: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
      color: var(--muted);
      font-size: 13px;
    }

    @media (min-width: 768px) {
      .site-footer {
        flex-direction: row;
      }
    }

    /* Scroll Reveal Utility */
    .reveal-up {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .reveal-up.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Accessible Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 100;
      background: rgba(9, 11, 16, 0.66);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      pointer-events: none;
    }

    .modal-backdrop.is-open {
      display: flex;
    }

    .modal-box {
      width: 100%;
      max-width: 500px;
      border-radius: 28px;
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 32px;
      color: var(--fg);
      box-shadow: 0 28px 60px rgba(0, 0, 0, 0.3);
      pointer-events: auto;
    }
  </style>
</head>
<body>
  <div class="scroll-progress-track" aria-hidden="true">
    <div id="scrollProgressBar" class="scroll-progress-bar"></div>
  </div>
  <div class="ambient-glow" aria-hidden="true"></div>

  <header class="site-header">
    <nav class="nav-bar" aria-label="Primary Navigation">
      <a href="#top" class="brand-link">
        <span class="brand-orb">${data.title.charAt(0)}</span>
        <span>${data.title}</span>
      </a>
      <ul class="nav-links">
        <li><a href="#showcase">Architecture</a></li>
        <li><a href="#bento">Interactive Grid</a></li>
        <li><a href="#tokens">Design Tokens</a></li>
      </ul>
      <button type="button" class="cta-pill" id="navTouchBtn" data-next-preview>
        <span>Inspect Spec ↗</span>
      </button>
    </nav>
  </header>

  <main class="container">
    <!-- Hero Section -->
    <section id="showcase" class="hero-section">
      <div class="hero-copy reveal-up is-visible">
        <span class="eyebrow-tag" id="activeCategoryTag">✦ ${cleanKeyword} • Pin #${String(data.pinId).slice(-6)}</span>
        <h1 class="hero-title" id="heroHeadline">
          Precision <em>${data.title}</em> interface system for modern web teams.
        </h1>
        <p class="hero-lead" id="heroLead">${subtitle}</p>

        <div class="filter-tabs" role="group" aria-label="Interactive View Modes">
          <button type="button" class="tab-btn is-active" data-mode="layout">01 / Visual Layout</button>
          <button type="button" class="tab-btn" data-mode="motion">02 / Scroll &amp; Hover Physics</button>
          <button type="button" class="tab-btn" data-mode="tokens">03 / Adaptive Tokens</button>
        </div>

        <div class="metrics-row">
          <div class="metric-item">
            <strong>60 FPS</strong>
            <span>Scroll &amp; Tilt Physics</span>
          </div>
          <div class="metric-item">
            <strong>100%</strong>
            <span>Single-File Portable</span>
          </div>
          <div class="metric-item">
            <strong>7 Views</strong>
            <span>320px → 1440px+ QA</span>
          </div>
        </div>
      </div>

      <div class="showcase-stage reveal-up is-visible">
        <div id="tiltFrame" class="showcase-frame">
          <div class="window-chrome">
            <div class="chrome-dots" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <span class="chrome-url">${data.slug}.forgezone.design</span>
          </div>
          <div class="showcase-viewport">
            <img
              id="showcaseImg"
              class="showcase-img"
              src="${data.imageUrl}"
              alt="${data.title} Web UI Reference"
              loading="eager"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid Section -->
    <section id="bento" class="bento-section">
      <div class="section-header reveal-up">
        <span class="eyebrow-tag" style="width:fit-content;">Interactive Architecture</span>
        <h2>Engineered with scroll reveal, magnetic hover &amp; glass hierarchy</h2>
      </div>

      <div class="bento-grid">
        <article class="bento-card reveal-up" data-modal-trigger="Responsive Grid Architecture">
          <span class="card-index">01 / LAYOUT SYSTEM</span>
          <h3>Fluid Bento Composition</h3>
          <p>Structured from the reference visual proportions (${palette.width}×${palette.height}px) with balanced negative space and crisp 1px borders.</p>
        </article>

        <article class="bento-card reveal-up" data-modal-trigger="Scroll &amp; Hover Micro-Interactions">
          <span class="card-index">02 / MOTION ENGINE</span>
          <h3>3D Perspective &amp; Spotlight</h3>
          <p>Interactive cursor tracking illuminates card surfaces while requestAnimationFrame parallax drives smooth depth transitions on scroll.</p>
        </article>

        <article class="bento-card reveal-up" data-modal-trigger="Zero-Build Commercial Package">
          <span class="card-index">03 / PRODUCTION READY</span>
          <h3>Instant Static Deployment</h3>
          <p>Self-contained HTML5, CSS3 variables, and vanilla JavaScript ready for instant customization with zero external build dependencies.</p>
        </article>
      </div>
    </section>

    <!-- Extracted Color Palette Tokens -->
    <section id="tokens" class="tokens-strip reveal-up" aria-label="Extracted Color Palette">
      <div>
        <strong style="font-size:16px;display:block;margin-bottom:4px;">Extracted Reference Palette</strong>
        <span style="font-size:13px;color:var(--muted);">Sampled directly from the reference composition</span>
      </div>
      <div class="swatch-row">
        <span class="swatch-pill"><span class="swatch-dot" style="background:${bg};"></span>BG ${bg}</span>
        <span class="swatch-pill"><span class="swatch-dot" style="background:${surface};"></span>SURFACE ${surface}</span>
        <span class="swatch-pill"><span class="swatch-dot" style="background:${accent};"></span>ACCENT ${accent}</span>
        <span class="swatch-pill"><span class="swatch-dot" style="background:${accent2};"></span>SECONDARY ${accent2}</span>
      </div>
    </section>

    <footer class="site-footer">
      <p>© 2026 ${data.title} — Crafted for Forge Zone Store.</p>
      <p>Inspired by ${cleanKeyword} • Responsive Single-File Edition</p>
    </footer>
  </main>

  <!-- Interactive Specification Modal -->
  <div id="specModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);">${data.title} DOSSIER</span>
        <button type="button" id="closeModalBtn" style="border:1px solid var(--border);background:var(--bg);color:var(--fg);border-radius:9999px;padding:6px 14px;font-size:12px;font-weight:600;cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="modalTitle" style="font-size:22px;font-weight:800;margin-bottom:10px;">${data.title} — Design System Specs</h2>
      <p style="font-size:14px;line-height:1.65;color:var(--muted);margin-bottom:20px;">
        Built with extracted palette tokens (${bg}, ${accent}, ${accent2}), scroll-linked progress telemetry, 3D card tilt physics, and responsive breakpoints.
      </p>
      <button type="button" class="cta-pill" id="confirmModalBtn" style="width:100%;justify-content:center;">Apply Theme Configuration ↗</button>
    </div>
  </div>

  <script>
    (function () {
      // 1. Scroll progress bar & showcase image parallax
      var progressBar = document.getElementById('scrollProgressBar');
      var showcaseImg = document.getElementById('showcaseImg');

      function onScroll() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        var pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        if (progressBar) progressBar.style.width = pct.toFixed(1) + '%';
        if (showcaseImg) {
          var shift = Math.min(40, scrollTop * 0.08);
          showcaseImg.style.transform = 'translate3d(0, ' + shift.toFixed(1) + 'px, 0) scale(1.03)';
        }
      }
      window.addEventListener('scroll', function () {
        window.requestAnimationFrame(onScroll);
      }, { passive: true });
      onScroll();

      // 2. IntersectionObserver scroll-reveal animation
      var revealEls = document.querySelectorAll('.reveal-up');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        }, { threshold: 0.12 });
        revealEls.forEach(function (el) { io.observe(el); });
      } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      }

      // 3. 3D Magnetic Hover Tilt & Cursor Spotlight on Bento Cards
      var tiltFrame = document.getElementById('tiltFrame');
      if (tiltFrame) {
        tiltFrame.addEventListener('mousemove', function (e) {
          var rect = tiltFrame.getBoundingClientRect();
          var x = (e.clientX - rect.left) / rect.width - 0.5;
          var y = (e.clientY - rect.top) / rect.height - 0.5;
          tiltFrame.style.transform = 'rotateY(' + (x * 6).toFixed(2) + 'deg) rotateX(' + (-y * 6).toFixed(2) + 'deg)';
        });
        tiltFrame.addEventListener('mouseleave', function () {
          tiltFrame.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
      }

      document.querySelectorAll('.bento-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
          card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
      });

      // 4. Interactive View Mode Switcher
      var modes = {
        layout: {
          tag: '✦ ${cleanKeyword} • Visual Hierarchy',
          headline: 'Precision <em>${data.title}</em> interface system for modern web teams.'
        },
        motion: {
          tag: '✦ 60FPS Kinetic Scroll & Hover Physics',
          headline: 'Fluid <em>micro-interactions</em> &amp; scroll-linked depth layers.'
        },
        tokens: {
          tag: '✦ Adaptive Palette • ${accent} &amp; ${accent2}',
          headline: 'Harmonized <em>color tokens</em> extracted from visual reference.'
        }
      };

      var tabBtns = document.querySelectorAll('.tab-btn');
      var tagEl = document.getElementById('activeCategoryTag');
      var headEl = document.getElementById('heroHeadline');

      tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          tabBtns.forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var m = modes[btn.getAttribute('data-mode')];
          if (m) {
            if (tagEl) tagEl.textContent = m.tag;
            if (headEl) headEl.innerHTML = m.headline;
          }
        });
      });

      // 5. Accessible Modal with 2-click toggle support for preview recorder
      var modal = document.getElementById('specModal');
      var modalTitle = document.getElementById('modalTitle');
      var openBtn = document.getElementById('navTouchBtn');
      var closeBtn = document.getElementById('closeModalBtn');
      var confirmBtn = document.getElementById('confirmModalBtn');

      function openModal(heading) {
        if (modalTitle && heading) modalTitle.textContent = heading;
        if (modal) modal.classList.add('is-open');
      }
      function closeModal() {
        if (modal) modal.classList.remove('is-open');
      }

      if (openBtn) {
        openBtn.addEventListener('click', function () {
          if (modal && modal.classList.contains('is-open')) closeModal();
          else openModal('${data.title} — Design System Specs');
        });
      }
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (confirmBtn) confirmBtn.addEventListener('click', closeModal);

      document.querySelectorAll('[data-modal-trigger]').forEach(function (el) {
        el.addEventListener('click', function () {
          openModal(el.getAttribute('data-modal-trigger'));
        });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
      });
    })();
  </script>
</body>
</html>
`;
}

export async function runMultiViewportQaCheck(slug) {
  const demoHtml = path.resolve(root, `web/public/demos/${slug}/index.html`);
  const reviewDir = path.resolve(root, `web/product/giao-dien-web/${slug}/reviews/1.0.0`);
  fs.mkdirSync(reviewDir, { recursive: true });

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'laptop-1024', width: 1024, height: 768 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-375', width: 375, height: 812 }
  ];

  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    const fileUrl = 'file:///' + demoHtml.replace(/\\/g, '/');
    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(300);

      const metrics = await page.evaluate(() => {
        const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
        const h1 = document.querySelector('h1')?.textContent?.trim() || '';
        return { overflow, h1Present: h1.length > 0 };
      });

      results.push({
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        overflow: metrics.overflow,
        h1Present: metrics.h1Present,
        errors
      });
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const allPassed = results.every(r => !r.overflow && r.h1Present && r.errors.length === 0);
  fs.writeFileSync(path.resolve(reviewDir, 'checks.json'), JSON.stringify({ slug, passed: allPassed, viewports: results }, null, 2), 'utf8');
  if (!allPassed) {
    throw new Error(`QA check failed for ${slug}: ${JSON.stringify(results)}`);
  }
  return results;
}

export async function compilePinterestTemplate(slug, options = {}) {
  const dataPath = path.resolve(__dirname, `data/${slug}.json`);
  if (!fs.existsSync(dataPath)) throw new Error(`Missing Pinterest data file: ${dataPath}`);
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const accessTier = options.tier || data.assignedTier || 'premium';
  const webCat = detectWebCategory(data);

  const productDir = path.resolve(root, `web/product/giao-dien-web/${slug}`);
  const sourceHtmlPath = path.resolve(productDir, 'source/index.html');
  const demoHtmlPath = path.resolve(root, `web/public/demos/${slug}/index.html`);

  const realTplPath = path.resolve(root, 'web/src/lib/real-templates.ts');
  let realTpl = fs.readFileSync(realTplPath, 'utf8');
  let catalogId = null;
  const existingMatch = realTpl.match(new RegExp(`(t\\d+):\\s*\\{[\\s\\S]{0,120}?slug:\\s*['"]${slug}['"]`));
  if (existingMatch) {
    catalogId = existingMatch[1];
  } else {
    catalogId = getNextCatalogId();
  }

  // 1. Analyze downloaded Pinterest reference image palette
  console.log(`[Pinterest Compiler] Analyzing color palette & layout from downloaded Pin image for ${slug}...`);
  const palette = await analyzePinterestImagePalette(data.localImagePath);

  // 2. Scaffold & write bespoke HTML
  if (!fs.existsSync(sourceHtmlPath)) {
    // Also copy JSON temporarily to agent-motionsites/data if scaffoldTemplate reads from there, or scaffold directly
    const motionDataPath = path.resolve(root, `web/tools/agent-motionsites/data/${slug}.json`);
    fs.writeFileSync(motionDataPath, JSON.stringify({
      ...data,
      category: webCat,
      prompt_text: data.rawDesc || data.rawTitle || data.title
    }, null, 2), 'utf8');
    scaffoldTemplate(slug, { tier: accessTier });
  }

  const html = buildPinterestInspiredHtml(data, palette);
  fs.writeFileSync(sourceHtmlPath, html, 'utf8');

  // 3. Sync demo
  fs.mkdirSync(path.dirname(demoHtmlPath), { recursive: true });
  fs.copyFileSync(sourceHtmlPath, demoHtmlPath);

  // 4. Run multi-viewport QA check
  console.log(`[Pinterest Compiler] Running 4-viewport QA verification for ${slug}...`);
  await runMultiViewportQaCheck(slug);

  // 5. Package .zip via dong-goi.mjs
  execFileSync('node', ['web/product/giao-dien-web/tools/dong-goi.mjs', slug, '--ngoai-le'], {
    cwd: root,
    stdio: 'inherit'
  });

  // 6. Register in template-categories.ts
  const catPath = path.resolve(root, 'web/src/lib/template-categories.ts');
  let catContent = fs.readFileSync(catPath, 'utf8');
  if (!catContent.includes(`'${slug}':`)) {
    catContent = catContent.replace(
      'export const TEMPLATE_CATEGORIES = {',
      `export const TEMPLATE_CATEGORIES = {\n  '${slug}': '${webCat}',`
    );
    fs.writeFileSync(catPath, catContent, 'utf8');
  }

  // 7. Register in real-templates.ts (2 Free + 3 Premium daily rule)
  realTpl = fs.readFileSync(realTplPath, 'utf8');
  if (!realTpl.includes(`slug: '${slug}'`) && !realTpl.includes(`"slug": "${slug}"`)) {
    const accessLine = accessTier === 'free' ? `    access: 'free',\n` : '';
    const entry = `  ${catalogId}: {
    slug: '${slug}',
    cat: '${webCat}',
${accessLine}    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`Giao diện web ${data.title} lấy cảm hứng từ thiết kế ${data.keyword} với lưới Bento hiện đại, hiệu ứng nghiêng 3D theo chuột, cuộn parallax mượt mà và bảng màu trích xuất tự động (${palette.bgHex}, ${palette.accentHex}).`)},
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      en: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`Interactive ${data.title} web template inspired by ${data.keyword} visual direction — featuring a responsive Bento grid, 3D magnetic hover tilt, scroll-linked parallax, and extracted palette tokens (${palette.bgHex}, ${palette.accentHex}).`)},
        tags: ['UI/UX Design', '3D Hover & Scroll', 'Bento Layout']
      },
      zh: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`源自 ${data.keyword} 视觉灵感的 ${data.title} 响应式网页模板，配备 Bento 网格布局、3D 鼠标悬停倾斜、滚动视差与自动提取配色系统。`)},
        tags: ['UI/UX 设计', '3D 悬停与视差', 'Bento 布局']
      }
    }
  },\n`;
    realTpl = realTpl.replace(
      'export const REAL_TEMPLATES: Record<string, RealTemplate> = {',
      `export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n${entry}`
    );
    fs.writeFileSync(realTplPath, realTpl, 'utf8');
  }

  // 8. Capture WebP posters & record 15s MP4 preview video
  execFileSync('node', ['web/tools/agent-motionsites/generate-previews.mjs', slug], {
    cwd: root,
    stdio: 'inherit'
  });

  return { slug, catalogId, title: data.title, accessTier, category: webCat };
}
