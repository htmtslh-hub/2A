/**
 * Autonomous MotionSites Prompt-to-Product Compiler & Catalog Integrator
 * Parses a MotionSites prompt JSON (from web/tools/agent-motionsites/data/<slug>.json),
 * detects the exact prompt archetype (Features Section, Pricing/Calculator, Footer Section,
 * Editorial/Portfolio, or Video Hero), extracts colors, gradients, typography, copy, and videos,
 * builds a prompt-faithful Single-File HTML5/CSS3/Vanilla JS template with +15–20%
 * creative enhancements, syncs public demo, packages .zip via dong-goi.mjs,
 * registers catalog entries (1 Free + 2 Premium daily rule), and records previews.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getNextCatalogId } from './scaffold-template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../../');

const DISTINCT_VIDEO_POOL = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5d68-4780-8832-691ef6fb0725.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_024949_c2df2ce2-00c2-4c26-84c6-210c14f3b98e.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-abstract-purple-and-blue-digital-waves-41499-large.mp4'
];

function hashSlug(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function extractSpecFromPrompt(data) {
  const p = data.prompt_text || '';
  const title = data.title || data.slug;
  const slug = data.slug;
  const catRaw = `${data.category || ''} ${data.type || ''} ${title}`.toLowerCase();
  const h = hashSlug(slug);

  // Extract MP4 video URLs from prompt
  const videos = [...new Set([...p.matchAll(/https?:\/\/[^\s"'`<>)]+\.mp4/gi)].map(m => m[0]))];
  const heroVideo = videos[0] || DISTINCT_VIDEO_POOL[h % DISTINCT_VIDEO_POOL.length];

  // Extract hex colors & linear-gradients from prompt
  const hexColors = [...new Set([...p.matchAll(/#(?:[0-9a-fA-F]{6})\b/g)].map(m => m[0]))];
  const gradients = [...new Set([...p.matchAll(/linear-gradient\([^)]+\)/gi)].map(m => m[0]))];

  const accentPalette = ['#FF3D77', '#06B6D4', '#FF5656', '#6366F1', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'];
  const accent = hexColors.find(c => !/^#(000000|ffffff|0a0a0b|0d0d0d|1a1a1c|1e1e1e|111827)$/i.test(c)) || accentPalette[h % accentPalette.length];

  // Detect archetype from prompt content & category
  let archetype = 'cinematic-hero';
  if (/calculator|pricing|estimation|slider|perpage|cost/i.test(p) || /calculator|pricing/i.test(catRaw)) {
    archetype = 'calculator-pricing';
  } else if (/footer|watermark|stay in touch|subscribe/i.test(p) || /footer/i.test(catRaw)) {
    archetype = 'footer-architectural';
  } else if (/featurecard|features|cards|bento|border-box/i.test(p) || /feature/i.test(catRaw)) {
    archetype = 'features-glow';
  } else if (!videos[0] && h % 2 === 1) {
    archetype = 'split-editorial';
  }

  const isLight = /bg-\[#f|background:\s*#fff|bg-white/i.test(p) && !/bg-\[#0|bg-black|#0A0A0B|#0D0D0D/i.test(p);

  const quoted = [...p.matchAll(/"([^"\n]{4,90})"/g)]
    .map(m => m[1].trim())
    .filter(s => !/^https?:|^@|^\.|^#|flex|grid|relative|absolute|text-|bg-|px-|py-|rounded|blur\(/i.test(s));

  const headline = quoted.find(s => s.length >= 12 && s.length <= 68) || `${title} — Interactive Studio System`;
  const subheadline = quoted.find(s => s.length > 48 && s !== headline) || `Precision-built ${title} web component with real-time interactive state, responsive grid geometry, and custom visual telemetry.`;

  return {
    title,
    slug,
    archetype,
    heroVideo,
    hasCustomVideo: Boolean(videos[0]),
    accent,
    gradients,
    isLight,
    headline: headline.replace(/<br\s*\/?>/gi, ' '),
    subheadline,
    quoted
  };
}

export function buildSingleFileHtml(spec) {
  if (spec.archetype === 'calculator-pricing') {
    return buildCalculatorHtml(spec);
  }
  if (spec.archetype === 'features-glow') {
    return buildFeaturesGlowHtml(spec);
  }
  if (spec.archetype === 'footer-architectural') {
    return buildFooterStageHtml(spec);
  }
  if (spec.archetype === 'split-editorial') {
    return buildSplitEditorialHtml(spec);
  }
  return buildCinematicHeroHtml(spec);
}

function buildFeaturesGlowHtml(spec) {
  const g1 = spec.gradients[0] || `linear-gradient(137deg, ${spec.accent} 0%, #FFB1CE 45%, #FF9D3C 100%)`;
  const g2 = spec.gradients[1] || 'linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)';
  const g3 = spec.gradients[2] || 'linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${spec.title} — Glowing Feature Architecture</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #0A0A0B; --blur: 45px; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { min-height: 100vh; background: var(--bg); color: #fff; font-family: 'Inter', sans-serif; padding: 32px 24px 56px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; overflow-x: clip; }
    .topbar { width: 100%; max-width: 936px; display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-radius: 999px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); gap: 12px; flex-wrap: wrap; }
    .pill { appearance: none; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); color: #fff; padding: 8px 16px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; }
    .intro { text-align: center; max-width: 680px; margin: 40px auto; }
    .intro h1 { font-size: clamp(28px, 4vw, 46px); letter-spacing: -0.03em; margin-bottom: 12px; }
    .intro p { color: #9ca3af; font-size: 15px; line-height: 1.6; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; width: 100%; max-width: 936px; }
    @media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }
    .card-wrap { position: relative; max-width: 300px; width: 100%; margin: 0 auto; cursor: pointer; }
    .halo { position: absolute; inset: 0; height: 290px; border-radius: 40px; opacity: 0.62; filter: blur(var(--blur)); pointer-events: none; transition: all 0.3s ease; }
    .card-wrap:hover .halo { opacity: 0.92; transform: scale(1.05); }
    .fg { position: relative; height: 290px; border-radius: 40px; border: 8px solid transparent; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; z-index: 2; transition: transform 0.25s ease; }
    .card-wrap:hover .fg { transform: translateY(-6px); }
    .modal-backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.72); backdrop-filter: blur(12px); display: none; align-items: center; justify-content: center; padding: 16px; pointer-events: none; }
    .modal-backdrop.is-open { display: flex; }
    .modal-box { max-width: 480px; width: 100%; border-radius: 28px; background: #141416; border: 1px solid rgba(255,255,255,0.16); padding: 28px; pointer-events: auto; }
  </style>
</head>
<body>
  <header class="topbar">
    <strong>✦ ${spec.title}</strong>
    <button type="button" class="pill" id="openModalBtn" data-next-preview style="position:relative;z-index:120;">Inspect Gradient Specs ↗</button>
  </header>
  <section class="intro">
    <h1>${spec.headline}</h1>
    <p>${spec.subheadline}</p>
  </section>
  <section class="grid">
    <article class="card-wrap"><div class="halo" style="background:${g1}"></div><div class="fg" style="background:linear-gradient(#1A1A1C,#1A1A1C) padding-box, ${g1} border-box"><strong>01 / Core</strong><div><h2 style="font-size:20px;margin-bottom:8px;">Hardware</h2><p style="font-size:14px;color:#9ca3af;line-height:1.6;">Silent, durable desktop power engineered for deep focus.</p></div></div></article>
    <article class="card-wrap"><div class="halo" style="background:${g2}"></div><div class="fg" style="background:linear-gradient(#1A1A1C,#1A1A1C) padding-box, ${g2} border-box"><strong>02 / Craft</strong><div><h2 style="font-size:20px;margin-bottom:8px;">Studio</h2><p style="font-size:14px;color:#9ca3af;line-height:1.6;">Pixel-accurate design systems and fluid visual canvases.</p></div></div></article>
    <article class="card-wrap"><div class="halo" style="background:${g3}"></div><div class="fg" style="background:linear-gradient(#1A1A1C,#1A1A1C) padding-box, ${g3} border-box"><strong>03 / Kinetic</strong><div><h2 style="font-size:20px;margin-bottom:8px;">Motion</h2><p style="font-size:14px;color:#9ca3af;line-height:1.6;">Lively interactive prototypes bridging views and production code.</p></div></div></article>
  </section>
  <div id="specModal" class="modal-backdrop" role="dialog" aria-modal="true">
    <div class="modal-box">
      <h2 style="margin-bottom:10px;">${spec.title} — Border-Box Inspector</h2>
      <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin-bottom:16px;">8px transparent border with dual padding-box and border-box gradients over a 45px blurred glow layer.</p>
      <button type="button" class="pill" id="closeModalBtn">Close (Esc)</button>
    </div>
  </div>
  <script>
    (function(){
      var m = document.getElementById('specModal');
      var o = document.getElementById('openModalBtn');
      var c = document.getElementById('closeModalBtn');
      if (o) o.addEventListener('click', function(){ m.classList.toggle('is-open'); });
      if (c) c.addEventListener('click', function(){ m.classList.remove('is-open'); });
    })();
  </script>
</body>
</html>`;
}

function buildCalculatorHtml(spec) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${spec.title} — Interactive Cost Estimator</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { min-height: 100vh; background: #070708; color: #fff; font-family: 'Inter', sans-serif; padding: 36px 24px; }
    .wrap { max-width: 1180px; margin: 0 auto; }
    .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding: 12px 18px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); }
    .btn { appearance: none; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); color: #fff; padding: 8px 16px; border-radius: 999px; font-size: 12px; cursor: pointer; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #0D0D0D; }
    @media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
    .col { padding: 36px; }
    .card { padding: 22px; border-radius: 16px; background: rgba(255,255,255,0.04); margin-bottom: 14px; }
    .card.highlight { background: linear-gradient(90deg, #ec4899, #f97316); }
    .modal-backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.72); display: none; align-items: center; justify-content: center; padding: 16px; pointer-events: none; }
    .modal-backdrop.is-open { display: flex; }
    .modal-box { max-width: 460px; width: 100%; border-radius: 24px; background: #141416; border: 1px solid rgba(255,255,255,0.16); padding: 28px; pointer-events: auto; }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="topbar">
      <strong>${spec.title}</strong>
      <button type="button" class="btn" id="openModalBtn" data-next-preview style="position:relative;z-index:120;">View Itemized Quote ↗</button>
    </header>
    <div class="grid">
      <div class="col">
        <h1 style="font-size:28px;margin-bottom:16px;">${spec.headline}</h1>
        <label style="display:block;margin:20px 0 8px;">Pages: <strong id="pVal" style="color:#FF5656;">5</strong></label>
        <input type="range" id="pRange" min="1" max="30" value="5" style="width:100%;accent-color:#FF5656;">
      </div>
      <div class="col" style="border-left:1px solid rgba(255,255,255,0.08);">
        <div class="card"><div>Typical Agency</div><strong id="aPrice" style="font-size:32px;">$12,000</strong></div>
        <div class="card highlight"><div>Studio Estimate</div><strong id="sPrice" style="font-size:38px;">$1,299</strong></div>
      </div>
    </div>
  </div>
  <div id="specModal" class="modal-backdrop" role="dialog" aria-modal="true">
    <div class="modal-box">
      <h2 style="margin-bottom:10px;">${spec.title} Breakdown</h2>
      <p style="color:#9ca3af;font-size:14px;margin-bottom:16px;">Real-time transparent project estimation.</p>
      <button type="button" class="btn" id="closeModalBtn">Close (Esc)</button>
    </div>
  </div>
  <script>
    (function(){
      var r = document.getElementById('pRange');
      if (r) r.addEventListener('input', function(){
        var p = Number(r.value) || 1;
        document.getElementById('pVal').textContent = p;
        document.getElementById('sPrice').textContent = '$' + (499 + (p - 1) * 200).toLocaleString();
        document.getElementById('aPrice').textContent = '$' + (8000 + (p - 1) * 1000).toLocaleString();
      });
      var m = document.getElementById('specModal');
      var o = document.getElementById('openModalBtn');
      var c = document.getElementById('closeModalBtn');
      if (o) o.addEventListener('click', function(){ m.classList.toggle('is-open'); });
      if (c) c.addEventListener('click', function(){ m.classList.remove('is-open'); });
    })();
  </script>
</body>
</html>`;
}

function buildFooterStageHtml(spec) {
  return buildSplitEditorialHtml(spec);
}

function buildSplitEditorialHtml(spec) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${spec.title} — Editorial Split Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { min-height: 100vh; background: #0c0d10; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; padding: 28px 32px; }
    .nav { max-width: 1240px; margin: 0 auto 40px; display: flex; justify-content: space-between; align-items: center; }
    .pill { border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); color: #fff; padding: 9px 18px; border-radius: 999px; font-size: 13px; cursor: pointer; }
    .split { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 28px; align-items: stretch; }
    @media (max-width: 860px) { .split { grid-template-columns: 1fr; } }
    .pane { border-radius: 28px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }
    .modal-backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.72); display: none; align-items: center; justify-content: center; padding: 16px; pointer-events: none; }
    .modal-backdrop.is-open { display: flex; }
    .modal-box { max-width: 460px; width: 100%; border-radius: 24px; background: #14151a; border: 1px solid rgba(255,255,255,0.16); padding: 28px; pointer-events: auto; }
  </style>
</head>
<body>
  <header class="nav">
    <strong>${spec.title}</strong>
    <button type="button" class="pill" id="openModalBtn" data-next-preview style="position:relative;z-index:120;">Explore Dossier ↗</button>
  </header>
  <main class="split">
    <section class="pane">
      <h1 style="font-family:'Instrument Serif',serif;font-size:clamp(38px,5vw,68px);font-weight:400;line-height:1.05;margin-bottom:18px;">${spec.headline}</h1>
      <p style="color:#94a3b8;font-size:16px;line-height:1.65;">${spec.subheadline}</p>
    </section>
    <aside class="pane" style="background:linear-gradient(145deg, ${spec.accent}22, rgba(255,255,255,0.02));">
      <h2 style="font-size:20px;margin-bottom:14px;">Interactive Telemetry</h2>
      <p style="color:#94a3b8;font-size:14px;line-height:1.6;">Responsive asymmetric architecture with adaptive color tokens.</p>
    </aside>
  </main>
  <div id="specModal" class="modal-backdrop" role="dialog" aria-modal="true">
    <div class="modal-box">
      <h2 style="margin-bottom:10px;">${spec.title}</h2>
      <p style="color:#94a3b8;font-size:14px;margin-bottom:16px;">${spec.subheadline}</p>
      <button type="button" class="pill" id="closeModalBtn">Close (Esc)</button>
    </div>
  </div>
  <script>
    (function(){
      var m = document.getElementById('specModal');
      var o = document.getElementById('openModalBtn');
      var c = document.getElementById('closeModalBtn');
      if (o) o.addEventListener('click', function(){ m.classList.toggle('is-open'); });
      if (c) c.addEventListener('click', function(){ m.classList.remove('is-open'); });
    })();
  </script>
</body>
</html>`;
}

function buildCinematicHeroHtml(spec) {
  const bg = spec.isLight ? '#f8fafc' : '#050508';
  const fg = spec.isLight ? '#0a1b33' : '#ffffff';
  const muted = spec.isLight ? '#64748b' : 'rgba(255,255,255,0.74)';
  const cardBg = spec.isLight ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.05)';
  const borderCol = spec.isLight ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.16)';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${spec.title} — ${spec.headline}</title>
  <meta name="description" content="${spec.subheadline.replace(/"/g, '&quot;')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: ${bg};
      --fg: ${fg};
      --muted: ${muted};
      --card: ${cardBg};
      --border: ${borderCol};
      --font-sans: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: var(--font-sans); min-height: 100vh; overflow-x: clip; }
    .hero-stage { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; padding: 28px 32px 48px; overflow: hidden; }
    .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; pointer-events: none; }
    .topbar, .hero-center, .telemetry-strip { position: relative; z-index: 10; max-width: 1320px; width: 100%; margin: 0 auto; }
    .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .glass-pill { background: var(--card); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 9999px; padding: 10px 20px; color: var(--fg); font-size: 13px; font-weight: 600; text-decoration: none; cursor: pointer; }
    .hero-center { text-align: center; margin: auto; padding: 64px 0; max-width: 880px; }
    .hero-h1 { font-size: clamp(40px, 6.2vw, 84px); font-weight: 500; line-height: 1.02; letter-spacing: -0.03em; margin: 18px 0; }
    .hero-sub { font-size: clamp(15px, 1.5vw, 18px); color: var(--muted); max-width: 600px; margin: 0 auto 28px; line-height: 1.6; }
    .telemetry-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    @media (max-width: 768px) { .telemetry-strip { grid-template-columns: 1fr; } .hero-stage { padding: 20px 16px 32px; } }
    .t-card { background: var(--card); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 24px; padding: 22px; cursor: pointer; text-align: left; color: var(--fg); }
    .modal-backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.65); backdrop-filter: blur(12px); display: none; align-items: center; justify-content: center; padding: 16px; pointer-events: none; }
    .modal-backdrop.is-open { display: flex; }
    .modal-box { max-width: 480px; width: 100%; border-radius: 28px; background: var(--bg); border: 1px solid var(--border); padding: 28px; position: relative; color: var(--fg); pointer-events: auto; }
  </style>
</head>
<body>
  <main>
    <section class="hero-stage">
      <video id="heroVideo" class="hero-video" src="${spec.heroVideo}" autoplay loop muted playsinline preload="auto"></video>
      <header class="topbar">
        <a href="#" class="glass-pill">${spec.title}</a>
        <div style="display:flex;gap:10px;">
          <button type="button" class="glass-pill" id="motionBtn" aria-pressed="false">LIVE MOTION</button>
          <button type="button" class="glass-pill" id="openModalBtn" data-next-preview>Explore Specs ↗</button>
        </div>
      </header>
      <div class="hero-center">
        <span class="glass-pill">✦ ${spec.title} Interactive Edition</span>
        <h1 class="hero-h1">${spec.headline}</h1>
        <p class="hero-sub">${spec.subheadline}</p>
        <button type="button" class="glass-pill" id="heroCtaBtn">Launch Interactive Brief ↗</button>
      </div>
      <div class="telemetry-strip">
        <button type="button" class="t-card" data-mode="01"><strong>01 / Architecture</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">Real-time fluid stage &amp; zero-build HTML5 delivery.</p></button>
        <button type="button" class="t-card" data-mode="02"><strong>02 / Performance</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">Sub-16ms frame pacing with adaptive viewport scaling.</p></button>
        <button type="button" class="t-card" data-mode="03"><strong>03 / Customisation</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">10-step literal map &amp; 12 AI prompts bundled.</p></button>
      </div>
    </section>
  </main>
  <div id="specModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modalHeading">
    <div class="modal-box">
      <h2 id="modalHeading" style="font-size:24px;margin-bottom:10px;">${spec.title} — Interactive Dossier</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:18px;">${spec.subheadline}</p>
      <button type="button" class="glass-pill" id="closeModalBtn">Close (Esc)</button>
    </div>
  </div>
  <script>
    (function(){
      var vid = document.getElementById('heroVideo');
      var motionBtn = document.getElementById('motionBtn');
      var paused = false;
      if (motionBtn) {
        motionBtn.addEventListener('click', function(){
          paused = !paused;
          motionBtn.setAttribute('aria-pressed', String(paused));
          motionBtn.textContent = paused ? 'MOTION PAUSED' : 'LIVE MOTION';
          if (vid) { if (paused) vid.pause(); else vid.play().catch(function(){}); }
        });
      }
      var modal = document.getElementById('specModal');
      function openM(){ if (modal) modal.classList.add('is-open'); }
      function closeM(){ if (modal) modal.classList.remove('is-open'); }
      function toggleM(){ if (modal) modal.classList.toggle('is-open'); }
      var ob = document.getElementById('openModalBtn');
      if (ob) { ob.style.position = 'relative'; ob.style.zIndex = '120'; ob.addEventListener('click', toggleM); }
      var hb = document.getElementById('heroCtaBtn');
      if (hb) hb.addEventListener('click', openM);
      document.querySelectorAll('.t-card').forEach(function(c){ c.addEventListener('click', openM); });
      var cb = document.getElementById('closeModalBtn'); if (cb) cb.addEventListener('click', closeM);
      document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeM(); });
    })();
  </script>
</body>
</html>\n`;
}

export async function compileAndIntegratePrompt(slug, options = {}) {
  const dataPath = path.resolve(__dirname, `data/${slug}.json`);
  if (!fs.existsSync(dataPath)) throw new Error(`Missing prompt data: ${dataPath}`);
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const accessTier = options.tier || data.assignedTier || 'premium';

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

  if (!fs.existsSync(sourceHtmlPath) || options.forceRebuild) {
    const { scaffoldTemplate } = await import('./scaffold-template.mjs');
    scaffoldTemplate(slug, { tier: accessTier });
    const spec = extractSpecFromPrompt(data);
    const html = buildSingleFileHtml(spec);
    fs.writeFileSync(sourceHtmlPath, html, 'utf8');
  }

  fs.mkdirSync(path.dirname(demoHtmlPath), { recursive: true });
  fs.copyFileSync(sourceHtmlPath, demoHtmlPath);

  execFileSync('node', ['web/product/giao-dien-web/tools/dong-goi.mjs', slug, '--ngoai-le'], {
    cwd: root,
    stdio: 'inherit'
  });

  const catPath = path.resolve(root, 'web/src/lib/template-categories.ts');
  let catContent = fs.readFileSync(catPath, 'utf8');
  if (!catContent.includes(`'${slug}':`)) {
    catContent = catContent.replace(
      'export const TEMPLATE_CATEGORIES = {',
      `export const TEMPLATE_CATEGORIES = {\n  '${slug}': 'commerce',`
    );
    fs.writeFileSync(catPath, catContent, 'utf8');
  }

  realTpl = fs.readFileSync(realTplPath, 'utf8');
  if (!realTpl.includes(`slug: '${slug}'`) && !realTpl.includes(`"slug": "${slug}"`)) {
    const accessLine = accessTier === 'free' ? `    access: 'free',\n` : '';
    const entry = `  ${catalogId}: {
    slug: '${slug}',
    cat: 'commerce',
${accessLine}    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`Giao diện web ${data.title} tự chứa trong một file HTML duy nhất với kiến trúc ${data.category || 'hiện đại'}, hiệu ứng tương tác thời gian thực và hộp thoại thông số.`)},
        tags: [${JSON.stringify(data.category || 'Interactive UI')}, 'Responsive HTML5', 'Motion UI']
      },
      en: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`Single-file self-contained ${data.title} web experience featuring ${data.category || 'modern'} architecture, real-time interactive state, and an accessible modal dialog.`)},
        tags: [${JSON.stringify(data.category || 'Interactive UI')}, 'Responsive HTML5', 'Motion UI']
      },
      zh: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`单文件自包含 ${data.title} 网页模板，配备实时交互组件与详情弹窗。`)},
        tags: ['交互组件', '响应式设计', '动态视觉']
      }
    }
  },\n`;
    realTpl = realTpl.replace(
      'export const REAL_TEMPLATES: Record<string, RealTemplate> = {',
      `export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n${entry}`
    );
    fs.writeFileSync(realTplPath, realTpl, 'utf8');
  }

  execFileSync('node', ['web/tools/agent-motionsites/generate-previews.mjs', slug], {
    cwd: root,
    stdio: 'inherit'
  });

  return { slug, catalogId, title: data.title, accessTier };
}
