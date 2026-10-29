/**
 * Autonomous MotionSites Prompt-to-Product Compiler & Catalog Integrator (v2.0 Hallmark + 4 Motion Groups + 3D Cutout)
 * Parses a MotionSites prompt JSON (from web/tools/agent-motionsites/data/<slug>.json),
 * builds a bespoke, prompt-faithful Single-File HTML5/CSS3/Vanilla JS template with:
 *   - 3D Studio Product/Subject Cutout (Out-of-bounds Pop-out & Text Masking when cutout-<slug>.webp is present)
 *   - Group 1 (Scroll): Parallax layers, Scroll-Triggered Reveal, Sticky 001-003 Pinned Telemetry + Scroll Scrubbing, Horizontal Scroll Track
 *   - Group 2 (Hover & Cursor): Magnetic Buttons, 3D Card Tilt with Specular Glare, Liquid Ripple SVG Filter, Custom Blend-Mode Follower Cursor
 *   - Group 3 (Text & Transitions): Split-Text Staggered Reveal, Animated Number Counters, Seamless Fullscreen Modal, Infinite Marquee
 *   - Group 4 (Ambient): Zero-gravity Floating + Canvas Particle/Smoke System
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getNextCatalogId, syncCustomiseGuide } from './scaffold-template.mjs';
import { buildForgeScoreV2Template } from './forgescore-v2-templates.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../../');

const DISTINCT_VIDEO_POOL = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5d68-4780-8832-691ef6fb0725.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_024949_c2df2ce2-00c2-4c26-84c6-210c14f3b98e.mp4'
];

function hashSlug(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getSlugPrefix(slug) {
  const clean = String(slug || 'ms').replace(/[^a-z0-9]/gi, '').toLowerCase();
  const h = hashSlug(clean);
  return `${clean.slice(0, 3)}${(h % 89) + 10}`;
}

export function extractSpecFromPrompt(data) {
  const p = data.prompt_text || '';
  const title = data.title || data.slug;
  const slug = data.slug;
  const catRaw = `${data.category || ''} ${data.type || ''} ${title}`.toLowerCase();
  const h = hashSlug(slug);

  const videos = [...new Set([...p.matchAll(/https?:\/\/[^\s"'`<>)]+\.mp4/gi)].map(m => m[0]))];
  const heroVideo = videos[0] || DISTINCT_VIDEO_POOL[h % DISTINCT_VIDEO_POOL.length];

  const hexColors = [...new Set([...p.matchAll(/#(?:[0-9a-fA-F]{6})\b/g)].map(m => m[0]))];
  const gradients = [...new Set([...p.matchAll(/linear-gradient\([^)]+\)/gi)].map(m => m[0]))];

  const accentPalette = ['#F26522', '#38bdf8', '#f59e0b', '#a855f7', '#10b981', '#ec4899', '#6366f1'];
  const accent = hexColors.find(c => !/^#(000000|ffffff|efefef|f5f5f5|0a0a0b|0d0d0d|1a1a1c|1e1e1e|111827)$/i.test(c)) || accentPalette[h % accentPalette.length];

  const isLight = (slug === 'skyelite-private-jets' || slug === 'modern-agency') ||
    (/bg-gray-50|bg-\[#EFEFEF\]|bg-white/i.test(p) && !/bg-black|bg-\[#0/i.test(p));

  const quoted = [...p.matchAll(/"([^"\n]{4,95})"/g)]
    .map(m => m[1].trim())
    .filter(s => !/^https?:|^@|^\.|^#|flex|grid|relative|absolute|text-|bg-|px-|py-|rounded|blur\(|Instrument Serif|Inter/i.test(s));

  const headline = quoted.find(s => s.length >= 14 && s.length <= 76) || `${title} — Next-Gen Interactive System`;
  const subheadline = quoted.find(s => s.length > 42 && s !== headline) || `Precision-engineered ${title} web experience combining real-time scroll telemetry, 3D perspective cards, and liquid glass interactions.`;

  const cutoutPath = path.resolve(root, `web/tools/agent-pinterest/pinterest-assets/cutout-${slug}.webp`);
  const hasCutout = fs.existsSync(cutoutPath);

  return {
    title,
    slug,
    catRaw,
    heroVideo,
    secondaryVideos: videos.slice(1),
    hasCustomVideo: Boolean(videos[0]),
    previewMedia: data.image || data.poster || null,
    accent,
    gradients,
    isLight,
    headline: headline.replace(/<br\s*\/?>/gi, ' '),
    subheadline,
    quoted,
    hasCutout,
    promptText: p
  };
}

function renderSharedMotionRuntime(p) {
  return `
  <script>
    (function () {
      var motionPaused = false;
      var motionBtn = document.getElementById('motionToggleBtn');
      var heroVid = document.getElementById('heroBgVideo');
      if (motionBtn) {
        motionBtn.addEventListener('click', function () {
          motionPaused = !motionPaused;
          document.body.classList.toggle('is-motion-paused', motionPaused);
          motionBtn.setAttribute('aria-pressed', String(motionPaused));
          motionBtn.textContent = motionPaused ? 'Motion: PAUSED' : 'Motion: ON';
          if (heroVid) {
            if (motionPaused) heroVid.pause();
            else heroVid.play().catch(function(){});
          }
        });
      }

      // Live London Clock (if #londonClock exists)
      var clockEl = document.getElementById('londonClock');
      function updateLondonClock() {
        if (!clockEl) return;
        try {
          var now = new Date();
          var t = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false });
          clockEl.textContent = t + ' in London';
        } catch (e) {
          clockEl.textContent = '14:30 in London';
        }
      }
      updateLondonClock();
      setInterval(updateLondonClock, 10000);

      // Group 1.1, 1.3 & 1.5: Parallax + Sticky Pinned 001-003 + Scroll Scrubbing
      var scrubStage = document.getElementById('scrubCenterStage');
      var scrubDial = document.getElementById('scrubDialText');
      var scrubReadout = document.getElementById('scrollScrubReadout');
      var parallaxEls = document.querySelectorAll('[data-parallax]');
      var specCards = document.querySelectorAll('[data-spec-index]');

      function onScroll() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        var progress = Math.min(1, Math.max(0, scrollTop / docHeight));
        var deg = (progress * 360).toFixed(1);

        if (!motionPaused) {
          parallaxEls.forEach(function (el) {
            var speed = parseFloat(el.getAttribute('data-parallax') || '0.08');
            el.style.transform = 'translate3d(0, ' + (scrollTop * speed).toFixed(1) + 'px, 0)';
          });
          if (scrubStage) {
            scrubStage.style.transform = 'rotate(' + (progress * 14 - 7).toFixed(2) + 'deg) scale(' + (1 + Math.sin(progress * Math.PI) * 0.06).toFixed(3) + ')';
          }
        }
        if (scrubDial) scrubDial.textContent = 'SCROLL SCRUB ANGLE: ' + deg + '°';
        if (scrubReadout) scrubReadout.textContent = 'SCRUB ' + Math.round(progress * 100) + '% • ' + deg + '°';
        specCards.forEach(function (c, i) { c.classList.toggle('is-active', i === (Math.floor(progress * 3) % 3)); });
      }
      window.addEventListener('scroll', function () { window.requestAnimationFrame(onScroll); }, { passive: true });
      onScroll();

      // Group 1.2 & 3.2: Scroll Reveal + Animated Number Counters
      var revealEls = document.querySelectorAll('.${p}-reveal');
      var counterEls = document.querySelectorAll('[data-counter-target]');
      function animateCounter(el) {
        if (el.getAttribute('data-counted') === 'true') return;
        el.setAttribute('data-counted', 'true');
        var target = parseInt(el.getAttribute('data-counter-target') || '100', 10);
        var suffix = el.getAttribute('data-counter-suffix') || '';
        var start = performance.now();
        function tick(now) {
          var t = Math.min(1, (now - start) / 1000);
          el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
          if (t < 1) window.requestAnimationFrame(tick);
        }
        window.requestAnimationFrame(tick);
      }
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('is-visible'); });
        }, { threshold: 0.12 });
        revealEls.forEach(function (el) { io.observe(el); });
        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) animateCounter(e.target); });
        }, { threshold: 0.2 });
        counterEls.forEach(function (el) { cio.observe(el); });
      } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      }

      // Group 2.1, 2.2, 2.4 & 2.5: Custom Blend Cursor + Magnetic Buttons + 3D Card Tilt + Liquid Wave Filter
      var cursorRing = document.getElementById('cursorRing');
      var cursorDot = document.getElementById('cursorDot');
      window.addEventListener('mousemove', function (e) {
        if (motionPaused) return;
        if (cursorRing) cursorRing.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
        if (cursorDot) cursorDot.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
      }, { passive: true });

      document.querySelectorAll('a, button, [data-tilt-card], h1').forEach(function (el) {
        el.addEventListener('mouseenter', function () { if (cursorRing) cursorRing.classList.add('is-hovered'); });
        el.addEventListener('mouseleave', function () { if (cursorRing) cursorRing.classList.remove('is-hovered'); });
      });

      document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
          if (motionPaused) return;
          var r = btn.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) * 0.24;
          var dy = (e.clientY - (r.top + r.height / 2)) * 0.24;
          btn.style.transform = 'translate3d(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px, 0)';
        });
        btn.addEventListener('mouseleave', function () { btn.style.transform = 'translate3d(0,0,0)'; });
      });

      var dispMap = document.getElementById('${p}Displacement');
      document.querySelectorAll('[data-tilt-card]').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          if (motionPaused) return;
          var r = card.getBoundingClientRect();
          var nx = (e.clientX - r.left) / Math.max(1, r.width) - 0.5;
          var ny = (e.clientY - r.top) / Math.max(1, r.height) - 0.5;
          card.style.transform = 'perspective(1000px) rotateX(' + (-ny * 10).toFixed(2) + 'deg) rotateY(' + (nx * 12).toFixed(2) + 'deg) translateZ(6px)';
          if (dispMap && card.id === 'heroPopoutRig') dispMap.setAttribute('scale', '12');
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
          if (dispMap && card.id === 'heroPopoutRig') dispMap.setAttribute('scale', '0');
        });
      });

      // Group 3.3: Seamless Fullscreen Modal Transition
      var modal = document.getElementById('seamlessModal');
      var modalTitle = document.getElementById('seamlessTitle');
      var exploreBtn = document.getElementById('exploreMagneticBtn');
      var closeBtn = document.getElementById('closeSeamlessBtn');
      var confirmBtn = document.getElementById('confirmSeamlessBtn');

      function openSeamless(titleText) {
        if (!modal) return;
        if (titleText && modalTitle) modalTitle.textContent = titleText;
        modal.classList.add('is-open');
      }
      function closeSeamless() {
        if (!modal) return;
        modal.classList.remove('is-open');
      }
      if (exploreBtn) {
        exploreBtn.addEventListener('click', function () {
          if (modal && modal.classList.contains('is-open')) closeSeamless();
          else openSeamless();
        });
      }
      if (closeBtn) closeBtn.addEventListener('click', closeSeamless);
      if (confirmBtn) confirmBtn.addEventListener('click', closeSeamless);
      document.querySelectorAll('[data-seamless-trigger]').forEach(function (el) {
        el.addEventListener('click', function () {
          openSeamless(el.getAttribute('data-seamless-trigger'));
        });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSeamless();
      });

      // Group 4.2: Ambient Particle / Smoke Canvas
      var canvas = document.getElementById('ambientSmokeCanvas');
      if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = 0, h = 0;
        function resize() {
          w = canvas.width = canvas.offsetWidth || window.innerWidth;
          h = canvas.height = canvas.offsetHeight || window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });
        var pts = [];
        for (var i = 0; i < 34; i++) {
          pts.push({
            x: Math.random() * 1400,
            y: Math.random() * 900,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.45 - 0.1,
            r: Math.random() * 2.5 + 1,
            a: Math.random() * 0.4 + 0.12
          });
        }
        function draw() {
          if (!motionPaused && ctx) {
            ctx.clearRect(0, 0, w, h);
            for (var j = 0; j < pts.length; j++) {
              var p = pts[j];
              p.x += p.vx; p.y += p.vy;
              if (p.y < -10) p.y = h + 10;
              if (p.x < -10) p.x = w + 10;
              if (p.x > w + 10) p.x = -10;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(148,163,184,' + p.a + ')';
              ctx.fill();
            }
          }
          window.requestAnimationFrame(draw);
        }
        window.requestAnimationFrame(draw);
      }
    })();
  </script>`;
}

export function buildSingleFileHtml(spec) {
  const p = getSlugPrefix(spec.slug);
  const cutoutImg = spec.hasCutout
    ? `<img class="${p}-cutout-3d" src="assets/cutout.webp" onerror="this.onerror=null;this.src='/demos/${spec.slug}/assets/cutout.webp'" alt="${spec.title} 3D Cutout" loading="eager" decoding="async" />`
    : `<svg viewBox="0 0 680 340" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-height:280px;"><defs><radialGradient id="gOrb" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${spec.accent}" stop-opacity="0.75"/><stop offset="100%" stop-color="${spec.accent}" stop-opacity="0"/></radialGradient></defs><circle cx="340" cy="170" r="135" fill="url(#gOrb)"/><ellipse cx="340" cy="170" rx="250" ry="68" transform="rotate(-14 340 170)" stroke="${spec.accent}" stroke-width="3" stroke-dasharray="10 6"/><circle cx="340" cy="170" r="76" stroke="#ffffff" stroke-width="2.5"/></svg>`;

  // SPECIAL BESPOKE TEMPLATE 1: SkyElite Private Jets (Light Sky-Slate Aviation + Video Hero + 3D Private Jet Cutout Pop-Out)
  if (spec.slug === 'skyelite-private-jets') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>SkyElite Private Jets — Premium Accessible Aviation</title>
  <meta name="description" content="Your dedication deserves recognition. Private jet charter and fractional ownership engineered for effortless global mobility.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --glass: rgba(255, 255, 255, 0.78);
      --fg: #202A36;
      --muted: #64748b;
      --border: rgba(32, 42, 54, 0.12);
      --accent: #202A36;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Inter', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .${p}-cursor-ring, .${p}-cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate3d(-100px,-100px,0); mix-blend-mode: difference; }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #fff; margin: -17px 0 0 -17px; transition: width 0.22s, height 0.22s, background 0.22s; }
    .${p}-cursor-ring.is-hovered { width: 58px; height: 58px; margin: -29px 0 0 -29px; background: #fff; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: #38bdf8; margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 220;
      max-width: 1280px; margin: 14px auto 0; padding: 14px 28px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      border-radius: 999px; background: rgba(255,255,255,0.86); backdrop-filter: blur(20px);
      border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(32,42,54,0.06);
    }
    .${p}-brand { font-size: 22px; font-weight: 700; color: #111827; text-decoration: none; letter-spacing: -0.03em; }
    .${p}-nav-links { display: none; list-style: none; gap: 28px; }
    @media (min-width: 768px) { .${p}-nav-links { display: flex; } }
    .${p}-nav-links a { color: #111827; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
    .${p}-nav-links a:hover { color: #4b5563; }
    .${p}-btn-discover { padding: 9px 18px; border-radius: 999px; background: #d1d5db; color: #1f2937; font-size: 13px; font-weight: 600; border: none; cursor: pointer; }
    .${p}-btn-book { padding: 9px 20px; border-radius: 999px; background: #202A36; color: #ffffff; font-size: 13px; font-weight: 600; border: none; cursor: pointer; }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 112px 24px 56px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; overflow: hidden; isolation: isolate;
    }
    .${p}-hero-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      z-index: -3; opacity: 0.34; pointer-events: none;
    }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none; }
    .${p}-marquee { position: absolute; bottom: 6%; left: 0; width: 100%; z-index: -1; overflow: hidden; opacity: 0.08; white-space: nowrap; pointer-events: none; }
    .${p}-marquee-track { display: inline-block; font-size: clamp(64px,11vw,140px); font-weight: 800; color: #202A36; animation: ${p}Marq 24s linear infinite; }
    @keyframes ${p}Marq { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }

    .${p}-kicker { font-size: 13px; font-weight: 700; color: #4b5563; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 12px; }
    .${p}-h1-line1 { display: block; font-size: clamp(52px, 8.5vw, 104px); font-weight: 400; color: #6b7280; line-height: 0.96; letter-spacing: -0.04em; }
    .${p}-h1-line2 { display: block; font-size: clamp(52px, 8.5vw, 104px); font-weight: 600; color: #202A36; line-height: 0.96; letter-spacing: -0.04em; margin-top: -12px; }
    .${p}-subtitle { font-size: clamp(16px, 1.6vw, 20px); color: #4b5563; max-width: 580px; margin: 16px auto 22px; }

    .${p}-jet-popout {
      position: relative; z-index: 5; max-width: 780px; width: 100%;
      margin: -22px auto 12px; animation: ${p}Float 6s ease-in-out infinite;
    }
    .${p}-cutout-3d {
      width: 100%; height: auto; max-height: 330px; object-fit: contain; display: block; margin: 0 auto;
      filter: drop-shadow(0 28px 38px rgba(32, 42, 54, 0.32));
    }
    @keyframes ${p}Float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-12px,0); } }

    .${p}-counters { display: flex; flex-wrap: wrap; justify-content: center; gap: 36px; margin-top: 18px; }
    .${p}-counter strong { display: block; font-size: 32px; font-weight: 800; color: #202A36; }
    .${p}-counter span { font-size: 12px; color: #64748b; font-weight: 600; }

    .${p}-section { max-width: 1240px; margin: 0 auto; padding: 80px 24px; }
    .${p}-pinned-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: start; margin-top: 36px; }
    @media (min-width: 960px) { .${p}-pinned-grid { grid-template-columns: 1fr 1.15fr 1fr; } }
    .${p}-sticky-box { position: sticky; top: 100px; padding: 28px; border-radius: 28px; background: #fff; border: 1px solid var(--border); box-shadow: 0 20px 40px rgba(32,42,54,0.06); text-align: center; }
    .${p}-spec-card { padding: 24px; border-radius: 24px; background: var(--glass); border: 1px solid var(--border); margin-bottom: 18px; }
    .${p}-spec-card.is-active { border-color: #202A36; box-shadow: 0 12px 28px rgba(32,42,54,0.08); }
    .${p}-hscroll-track { display: grid; grid-template-columns: repeat(4, minmax(260px, 1fr)); gap: 20px; overflow-x: auto; padding-bottom: 12px; margin-top: 28px; }
    .${p}-route-card { padding: 24px; border-radius: 24px; background: #fff; border: 1px solid var(--border); cursor: pointer; transition: transform 0.25s; }
    .${p}-route-card:hover { transform: translateY(-6px); }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 190; background: rgba(15,23,42,0.76); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 680px; width: 100%; border-radius: 28px; background: #ffffff; color: #202A36; padding: 32px; pointer-events: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.25); }
    body.is-motion-paused * { animation-play-state: paused !important; }
  </style>
</head>
<body>
  <svg width="0" height="0" viewBox="0 0 0 0" style="position:absolute;pointer-events:none;" aria-hidden="true">
    <defs>
      <filter id="${p}LiquidFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="3" />
        <feDisplacementMap id="${p}Displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-navbar">
    <a href="#heroStage" class="${p}-brand">SkyElite</a>
    <ul class="${p}-nav-links">
      <li><a href="#heroStage">Start</a></li>
      <li><a href="#pinnedSpecs">Story</a></li>
      <li><a href="#pinnedSpecs">Rates</a></li>
      <li><a href="#motionProjects">Benefits</a></li>
      <li><a href="#motionProjects">FAQ</a></li>
    </ul>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-btn-discover" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-book" data-magnetic data-next-preview>Book Now</button>
    </div>
  </header>

  <main>
    <section id="heroStage" class="${p}-hero">
      <video id="heroBgVideo" class="${p}-hero-video" src="${spec.heroVideo}" autoplay loop muted playsinline preload="auto"></video>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>
      <div class="${p}-marquee" aria-hidden="true">
        <div class="${p}-marquee-track">SKYELITE PRIVATE JETS • GLOBAL ULTRA-LONG RANGE • MACH 0.925 • </div>
      </div>

      <div data-parallax="0.08">
        <p class="${p}-kicker">PRIVATE JETS</p>
        <h1 id="oversizedHeadline">
          <span class="${p}-h1-line1">Premium.</span>
          <span class="${p}-h1-line2">Accessible.</span>
        </h1>
        <p class="${p}-subtitle">Your dedication deserves recognition.</p>
        <div style="display:flex;gap:12px;justify-content:center;margin-bottom:10px;">
          <button type="button" class="${p}-btn-discover" data-magnetic data-seamless-trigger="Discover SkyElite Fleet">Discover</button>
          <button type="button" class="${p}-btn-book" data-magnetic data-seamless-trigger="Instant Private Jet Charter Quote">Book Now</button>
        </div>
      </div>

      <div id="heroPopoutRig" class="${p}-jet-popout" data-tilt-card style="filter:url(#${p}LiquidFilter);">
        ${cutoutImg}
      </div>

      <div class="${p}-counters">
        <div class="${p}-counter"><strong data-counter-target="8000" data-counter-suffix=" NM">8000 NM</strong><span>Nonstop Range</span></div>
        <div class="${p}-counter"><strong data-counter-target="120" data-counter-suffix="+">120+</strong><span>FBO Terminals</span></div>
        <div class="${p}-counter"><strong data-counter-target="15" data-counter-suffix=" Min">15 Min</strong><span>Boarding Ramp</span></div>
      </div>
    </section>

    <section id="pinnedSpecs" class="${p}-section">
      <div class="${p}-reveal" style="text-align:center;max-width:640px;margin:0 auto;">
        <p class="${p}-kicker">001 — 003 FLEET TELEMETRY</p>
        <h2 style="font-size:clamp(28px,4vw,44px);">Flagship Aviation Specifications</h2>
      </div>
      <div class="${p}-pinned-grid">
        <div>
          <article class="${p}-spec-card ${p}-reveal is-active" data-spec-index="001">
            <span class="${p}-kicker">001 / PROPULSION</span>
            <h3 style="font-size:22px;margin:6px 0;">Mach 0.925 Cruise</h3>
            <p style="font-size:14px;color:var(--muted);">Twin Pearl 700 high-bypass turbofans delivering whisper-quiet transoceanic speed.</p>
          </article>
          <article class="${p}-spec-card ${p}-reveal" data-spec-index="002">
            <span class="${p}-kicker">002 / PRESSURIZATION</span>
            <h3 style="font-size:22px;margin:6px 0;">2,916 ft Cabin Altitude</h3>
            <p style="font-size:14px;color:var(--muted);">100% fresh plasma-ionized air renewal every two minutes at FL510.</p>
          </article>
        </div>
        <div class="${p}-sticky-box">
          <div id="scrubCenterStage">${cutoutImg}</div>
          <p id="scrubDialText" style="margin-top:12px;font-size:12px;font-weight:700;color:#202A36;">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <div>
          <article class="${p}-spec-card ${p}-reveal" data-spec-index="003">
            <span class="${p}-kicker">003 / TRANSPARENT RATES</span>
            <h3 style="font-size:22px;margin:6px 0;">$6,400 / Flight Hr</h3>
            <p style="font-size:14px;color:var(--muted);">Zero hidden positioning fees across 120+ executive terminals worldwide.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="motionProjects" class="${p}-section">
      <h2 style="font-size:clamp(26px,3.5vw,38px);">Popular Private Corridors</h2>
      <div class="${p}-hscroll-track">
        <article class="${p}-route-card ${p}-reveal" data-tilt-card data-seamless-trigger="Geneva to Teterboro Corridor">
          <span class="${p}-kicker">CORRIDOR 01</span>
          <h3 style="margin:8px 0;">Geneva ✈ Teterboro</h3>
          <p style="font-size:13px;color:var(--muted);">7h 40m Nonstop • Gulfstream G800</p>
        </article>
        <article class="${p}-route-card ${p}-reveal" data-tilt-card data-seamless-trigger="London Farnborough to Dubai">
          <span class="${p}-kicker">CORRIDOR 02</span>
          <h3 style="margin:8px 0;">London ✈ Dubai DWC</h3>
          <p style="font-size:13px;color:var(--muted);">6h 15m Nonstop • Global 7500</p>
        </article>
        <article class="${p}-route-card ${p}-reveal" data-tilt-card data-seamless-trigger="Tokyo Haneda to Singapore">
          <span class="${p}-kicker">CORRIDOR 03</span>
          <h3 style="margin:8px 0;">Tokyo ✈ Singapore</h3>
          <p style="font-size:13px;color:var(--muted);">6h 30m Nonstop • Praetor 600</p>
        </article>
        <article class="${p}-route-card ${p}-reveal" data-tilt-card data-seamless-trigger="Miami Opa-Locka to Aspen">
          <span class="${p}-kicker">CORRIDOR 04</span>
          <h3 style="margin:8px 0;">Miami ✈ Aspen</h3>
          <p style="font-size:13px;color:var(--muted);">3h 55m Nonstop • Challenger 3500</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-kicker" style="margin:0;">SkyElite Charter Dossier</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-discover">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:26px;margin-bottom:10px;">SkyElite Private Jets</h2>
      <p style="color:var(--muted);font-size:14px;line-height:1.6;margin-bottom:16px;">Your dedication deserves recognition. Instant tail-number assignment and private ramp clearance in 15 minutes.</p>
      <div style="margin-bottom:16px;">${cutoutImg}</div>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-book" style="width:100%;">Confirm Flight Brief</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // SPECIAL BESPOKE TEMPLATE 2: Modern Agency (Axion Studio — Light Gray #EFEFEF + Orange #F26522 Text-Roll Hover + Live London Clock + 3 Sections)
  if (spec.slug === 'modern-agency') {
    const imgSmall = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85';
    const imgLarge = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85';
    const vidNarrativ = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4';
    const vidLuminar = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Axion Studio — Modern Agency &amp; Digital Experiences</title>
  <meta name="description" content="We craft digital experiences for brands ready to dominate their category online.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #EFEFEF;
      --fg: #111827;
      --muted: #4b5563;
      --accent: #F26522;
      --border: rgba(17, 24, 39, 0.12);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', system-ui, sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .${p}-cursor-ring, .${p}-cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate3d(-100px,-100px,0); mix-blend-mode: difference; }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #fff; margin: -17px 0 0 -17px; transition: width 0.22s, height 0.22s, background 0.22s; }
    .${p}-cursor-ring.is-hovered { width: 58px; height: 58px; margin: -29px 0 0 -29px; background: #fff; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: #F26522; margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    /* Pill White Navbar */
    .${p}-nav-wrap { position: fixed; top: 12px; left: 0; right: 0; z-index: 220; max-width: 1440px; margin: 0 auto; padding: 0 16px; }
    .${p}-navbar {
      background: #ffffff; border-radius: 999px; padding: 6px 10px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    .${p}-logo-circle {
      width: 38px; height: 38px; border-radius: 50%; background: #111827; color: #fff;
      font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;
    }
    .${p}-nav-links { display: none; list-style: none; gap: 24px; }
    @media (min-width: 768px) { .${p}-nav-links { display: flex; } }
    .${p}-nav-links a { font-size: 14px; color: #111827; text-decoration: none; font-weight: 500; }
    .${p}-nav-right { display: flex; align-items: center; gap: 14px; }
    .${p}-meta-text { display: none; font-size: 13px; color: #4b5563; }
    @media (min-width: 1024px) { .${p}-meta-text { display: inline-flex; align-items: center; gap: 6px; } }

    /* Text-Roll Button */
    .${p}-roll-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: #111827; color: #fff; border: none; border-radius: 999px;
      padding: 7px 8px 7px 18px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none;
    }
    .${p}-roll-btn.orange { background: #F26522; padding: 9px 10px 9px 22px; font-size: 14px; }
    .${p}-roll-window { height: 20px; overflow: hidden; display: inline-block; }
    .${p}-roll-track { display: flex; flex-direction: column; transition: transform 0.5s cubic-bezier(0.25,0.1,0.25,1); }
    .${p}-roll-btn:hover .${p}-roll-track { transform: translateY(-50%); }
    .${p}-roll-arrow {
      width: 26px; height: 26px; border-radius: 50%; background: #fff; color: #111827;
      display: inline-flex; align-items: center; justify-content: center;
      transition: transform 0.5s cubic-bezier(0.25,0.1,0.25,1);
    }
    .${p}-roll-btn.orange .${p}-roll-arrow { color: #F26522; }
    .${p}-roll-btn:hover .${p}-roll-arrow { transform: rotate(-45deg); }

    /* Section 1: Hero with ChromaFlow Orange Shader Gradient */
    .${p}-hero {
      position: relative; min-height: 100vh; padding: 110px clamp(20px,4vw,48px) 64px;
      display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; isolation: isolate;
      background:
        radial-gradient(circle at 72% 28%, rgba(255, 95, 3, 0.34) 0%, rgba(255, 95, 3, 0.08) 38%, transparent 68%),
        radial-gradient(circle at 24% 62%, rgba(255, 255, 255, 0.9) 0%, transparent 55%),
        #EFEFEF;
    }
    .${p}-fluted-overlay {
      position: absolute; inset: 0; z-index: -1; pointer-events: none;
      background: repeating-linear-gradient(121deg, rgba(255,255,255,0.24) 0px, rgba(255,255,255,0.24) 12px, rgba(0,0,0,0.02) 12px, rgba(0,0,0,0.02) 24px);
    }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
    .${p}-hero-inner { max-width: 1440px; width: 100%; margin: 0 auto; }
    .${p}-hero-h1 {
      font-size: clamp(36px, 5.2vw, 68px); font-weight: 500; line-height: 1.08;
      letter-spacing: -0.03em; color: #111827; max-width: 980px;
    }
    .${p}-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-top: 32px; }
    .${p}-partner-badge {
      display: inline-flex; align-items: center; gap: 10px;
      background: #ffffff; padding: 10px 16px; border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08); font-size: 13px; font-weight: 600;
    }

    /* Section 2: About (White Background, 3-Column Asymmetric Grid) */
    .${p}-about { background: #ffffff; padding: 96px clamp(20px,4vw,48px); }
    .${p}-container { max-width: 1440px; margin: 0 auto; }
    .${p}-badge-row { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .${p}-num-circle { width: 28px; height: 28px; border-radius: 50%; background: #111827; color: #fff; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
    .${p}-pill-label { padding: 5px 14px; border-radius: 999px; border: 1px solid #e5e7eb; font-size: 13px; font-weight: 500; }
    .${p}-about-h2 { font-size: clamp(28px, 4vw, 52px); font-weight: 500; line-height: 1.12; letter-spacing: -0.02em; margin-bottom: 56px; max-width: 780px; }
    .${p}-about-grid { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: end; }
    @media (min-width: 1024px) { .${p}-about-grid { grid-template-columns: 26% 1fr 48%; } }
    .${p}-about-img { width: 100%; border-radius: 18px; object-fit: cover; display: block; }

    /* Section 3: Case Studies (#F5F5F5 Background, 2-Column Video Cards) */
    .${p}-cases { background: #F5F5F5; padding: 96px clamp(20px,4vw,48px); }
    .${p}-cases-grid { display: grid; grid-template-columns: 1fr; gap: 28px; margin-top: 40px; }
    @media (min-width: 768px) { .${p}-cases-grid { grid-template-columns: 1fr 1fr; } }
    .${p}-case-media { position: relative; border-radius: 20px; overflow: hidden; background: #1a1d2e; aspect-ratio: 4/3; cursor: pointer; }
    .${p}-case-media video { width: 100%; height: 100%; object-fit: cover; display: block; }
    .${p}-case-fab {
      position: absolute; bottom: 16px; left: 16px; padding: 8px 16px;
      border-radius: 999px; background: #ffffff; color: #111827; font-size: 13px; font-weight: 600;
    }

    /* Sticky 001-003 Telemetry Section */
    .${p}-pinned-sec { background: #ffffff; padding: 80px clamp(20px,4vw,48px); border-top: 1px solid var(--border); }
    .${p}-pinned-grid { max-width: 1440px; margin: 32px auto 0; display: grid; grid-template-columns: 1fr; gap: 24px; }
    @media (min-width: 960px) { .${p}-pinned-grid { grid-template-columns: 1fr 1fr 1fr; } }
    .${p}-spec-card { padding: 24px; border-radius: 20px; background: #F5F5F5; border: 1px solid var(--border); }
    .${p}-spec-card.is-active { border-color: #F26522; }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 190; background: rgba(17,24,39,0.72); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 640px; width: 100%; border-radius: 24px; background: #ffffff; color: #111827; padding: 32px; pointer-events: auto; }
  </style>
</head>
<body>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <div class="${p}-nav-wrap">
    <header class="${p}-navbar">
      <div style="display:flex;align-items:center;gap:24px;">
        <a href="#heroStage" class="${p}-logo-circle">AX</a>
        <ul class="${p}-nav-links">
          <li><a href="#caseStudies">Projects</a></li>
          <li><a href="#aboutStudio">Studio</a></li>
          <li><a href="#pinnedSpecs">Journal</a></li>
          <li><a href="#caseStudies">Connect</a></li>
        </ul>
      </div>
      <div class="${p}-nav-right">
        <span class="${p}-meta-text">Taking on projects for Q1 2026</span>
        <span class="${p}-meta-text">🕒 <span id="londonClock">14:30 in London</span></span>
        <button type="button" id="motionToggleBtn" class="${p}-pill-label" style="background:#fff;cursor:pointer;" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-roll-btn" data-magnetic data-next-preview>
          <span class="${p}-roll-window"><span class="${p}-roll-track"><span>Book a strategy call</span><span>Book a strategy call</span></span></span>
          <span class="${p}-roll-arrow">↗</span>
        </button>
      </div>
    </header>
  </div>

  <main>
    <section id="heroStage" class="${p}-hero">
      <div class="${p}-fluted-overlay" aria-hidden="true"></div>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>
      <div class="${p}-hero-inner" data-parallax="0.06">
        <p style="font-size:14px;font-weight:600;margin-bottom:20px;">Axion Studio</p>
        <h1 class="${p}-hero-h1" id="oversizedHeadline">
          We craft digital experiences for brands ready to dominate their category online.
        </h1>
        <div class="${p}-cta-row">
          <button type="button" class="${p}-roll-btn orange" data-magnetic data-seamless-trigger="Start a Project with Axion Studio">
            <span class="${p}-roll-window"><span class="${p}-roll-track"><span>Start a project</span><span>Start a project</span></span></span>
            <span class="${p}-roll-arrow">→</span>
          </button>
          <div class="${p}-partner-badge" data-tilt-card>
            <span style="color:#E8704E;font-size:18px;">✦</span>
            <span>Certified Partner</span>
            <span style="background:#111827;color:#fff;font-size:11px;padding:2px 8px;border-radius:4px;">Featured</span>
          </div>
        </div>
      </div>
    </section>

    <section id="aboutStudio" class="${p}-about">
      <div class="${p}-container">
        <div class="${p}-badge-row">
          <span class="${p}-num-circle">1</span>
          <span class="${p}-pill-label">Introducing Axion</span>
        </div>
        <h2 class="${p}-about-h2">Strategy-led creatives, delivering results in digital and beyond.</h2>
        <div class="${p}-about-grid">
          <img src="${imgSmall}" alt="Axion Studio Craft" class="${p}-about-img" style="aspect-ratio:438/346;" loading="lazy" />
          <div style="padding:12px 0;">
            <p style="font-size:17px;line-height:1.65;font-weight:500;margin-bottom:24px;">Through research, creative thinking and iteration we help growing brands realize their digital full potential.</p>
            <button type="button" class="${p}-roll-btn orange" data-magnetic data-seamless-trigger="About Axion Studio">
              <span class="${p}-roll-window"><span class="${p}-roll-track"><span>About our studio</span><span>About our studio</span></span></span>
              <span class="${p}-roll-arrow">→</span>
            </button>
          </div>
          <img src="${imgLarge}" alt="Axion Studio Direction" class="${p}-about-img" style="aspect-ratio:3/2;" loading="lazy" />
        </div>
      </div>
    </section>

    <section id="caseStudies" class="${p}-cases">
      <div class="${p}-container">
        <div class="${p}-badge-row">
          <span class="${p}-num-circle">2</span>
          <span class="${p}-pill-label">Featured client work</span>
        </div>
        <h2 class="${p}-about-h2" style="margin-bottom:16px;">Our projects</h2>
        <div class="${p}-cases-grid">
          <article class="${p}-reveal" data-tilt-card data-seamless-trigger="Narrativ — Site of the Month 2025">
            <div class="${p}-case-media">
              <video src="${vidNarrativ}" autoplay muted loop playsinline preload="metadata"></video>
              <span class="${p}-case-fab">🔗 Learn more</span>
            </div>
            <p style="font-size:14px;color:#4b5563;margin-top:14px;">Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement</p>
            <h3 style="font-size:16px;font-weight:700;margin-top:4px;">Narrativ</h3>
          </article>
          <article class="${p}-reveal" data-tilt-card data-seamless-trigger="Luminar — Brand Conversion Platform">
            <div class="${p}-case-media">
              <video src="${vidLuminar}" autoplay muted loop playsinline preload="metadata"></video>
              <span class="${p}-case-fab" style="background:#111827;color:#fff;">View case study →</span>
            </div>
            <p style="font-size:14px;color:#4b5563;margin-top:14px;">Transforming a dated platform into a conversion-focused brand experience</p>
            <h3 style="font-size:16px;font-weight:700;margin-top:4px;">Luminar</h3>
          </article>
        </div>
      </div>
    </section>

    <section id="pinnedSpecs" class="${p}-pinned-sec">
      <div class="${p}-container">
        <div class="${p}-pinned-grid">
          <div class="${p}-spec-card is-active" data-spec-index="001">
            <strong data-counter-target="120" data-counter-suffix="+" style="font-size:36px;color:#F26522;">120+</strong>
            <h3 style="margin:6px 0;">001 / Category Leaders</h3>
            <p style="font-size:14px;color:#4b5563;">Global design systems and WebGL shader experiences shipped since 2021.</p>
          </div>
          <div class="${p}-spec-card" id="scrubCenterStage" data-spec-index="002">
            <strong data-counter-target="98" data-counter-suffix="%" style="font-size:36px;color:#111827;">98%</strong>
            <h3 style="margin:6px 0;">002 / Conversion Uplift</h3>
            <p id="scrubDialText" style="font-size:13px;color:#F26522;font-weight:700;">SCROLL SCRUB ANGLE: 0.0°</p>
          </div>
          <div class="${p}-spec-card" data-spec-index="003">
            <strong data-counter-target="14" data-counter-suffix=" SOTD" style="font-size:36px;color:#111827;">14 SOTD</strong>
            <h3 style="margin:6px 0;">003 / Awwwards &amp; FWA</h3>
            <p style="font-size:14px;color:#4b5563;">Recognized for real-time ChromaFlow shaders and tactile micro-interactions.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-pill-label">Axion Studio Strategy Call</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-label" style="background:#fff;cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:26px;margin-bottom:10px;">Book a Q1 2026 Strategy Call</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;margin-bottom:18px;">We partner with ambitious founders and marketing teams to design category-defining websites and design systems.</p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-roll-btn orange">Confirm Discovery Slot →</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // SPECIAL BESPOKE TEMPLATE 3: Asme ("Built for the curious" — Dark Cinematic Video + Liquid Glass Mask-Composite Border + 3D Curiosity Core Cutout)
  if (spec.slug === 'asme') {
    const asmeVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Asme — Built for the Curious</title>
  <meta name="description" content="Stay updated with the latest news and insights. Liquid glass spatial interface built for the curious.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #000000;
      --fg: #ffffff;
      --muted: rgba(255, 255, 255, 0.72);
      --accent: #f59e0b;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: #000; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .${p}-cursor-ring, .${p}-cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate3d(-100px,-100px,0); mix-blend-mode: difference; }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #fff; margin: -17px 0 0 -17px; transition: width 0.22s, height 0.22s, background 0.22s; }
    .${p}-cursor-ring.is-hovered { width: 58px; height: 58px; margin: -29px 0 0 -29px; background: #fff; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: #f59e0b; margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    /* Authentic Liquid Glass CSS from Asme Specification */
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
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.4px;
      background: linear-gradient(180deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.48) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .${p}-hero {
      position: relative; min-height: 100vh; display: flex; flex-direction: column;
      justify-content: space-between; overflow: hidden; isolation: isolate; padding: 24px;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      transform: translateY(17%); z-index: -3; pointer-events: none; opacity: 0.72;
    }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none; }

    .${p}-nav {
      position: relative; z-index: 220; width: 100%; max-width: 1024px; margin: 0 auto;
      border-radius: 999px; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-nav-links { display: none; list-style: none; gap: 32px; }
    @media (min-width: 768px) { .${p}-nav-links { display: flex; } }
    .${p}-nav-links a { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; font-weight: 500; }
    .${p}-nav-links a:hover { color: #fff; }

    .${p}-center {
      position: relative; z-index: 10; max-width: 680px; width: 100%; margin: auto;
      text-align: center; padding: 28px 0;
    }
    .${p}-serif-h1 {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(48px, 7.5vw, 86px);
      font-weight: 400;
      letter-spacing: -0.02em;
      line-height: 1.02;
      margin-bottom: 18px;
    }
    .${p}-cutout-wrap {
      max-width: 280px; margin: -18px auto 16px;
      animation: ${p}Float 5.5s ease-in-out infinite;
    }
    .${p}-cutout-3d {
      width: 100%; height: auto; max-height: 240px; object-fit: contain; display: block; margin: 0 auto;
      filter: drop-shadow(0 24px 36px rgba(0,0,0,0.75)) drop-shadow(0 0 24px rgba(245,158,11,0.28));
    }
    @keyframes ${p}Float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-10px,0); } }

    .${p}-email-bar {
      border-radius: 999px; padding: 8px 8px 8px 24px;
      display: flex; align-items: center; gap: 12px; max-width: 540px; margin: 0 auto 14px;
    }
    .${p}-email-input {
      flex: 1; background: transparent; border: none; color: #fff; font-size: 15px; outline: none;
    }
    .${p}-email-submit {
      width: 42px; height: 42px; border-radius: 50%; background: #ffffff; color: #000000;
      border: none; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
    }

    .${p}-section { max-width: 1180px; margin: 0 auto; padding: 80px 24px; }
    .${p}-pinned-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: center; margin-top: 32px; }
    @media (min-width: 960px) { .${p}-pinned-grid { grid-template-columns: 1fr 1fr 1fr; } }
    .${p}-card { padding: 24px; border-radius: 28px; }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 190; background: rgba(0,0,0,0.84); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 620px; width: 100%; border-radius: 32px; background: #0c0c0e; border: 1px solid rgba(255,255,255,0.18); padding: 36px; pointer-events: auto; }
  </style>
</head>
<body>
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

  <main>
    <section id="heroStage" class="${p}-hero">
      <video id="heroBgVideo" class="${p}-bg-video" src="${asmeVideo}" autoplay loop muted playsinline preload="auto"></video>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>

      <header class="${p}-nav liquid-glass">
        <div style="display:flex;align-items:center;gap:28px;">
          <a href="#heroStage" style="color:#fff;text-decoration:none;font-weight:600;font-size:18px;display:inline-flex;align-items:center;gap:8px;">🌐 Asme</a>
          <ul class="${p}-nav-links">
            <li><a href="#pinnedSpecs">Features</a></li>
            <li><a href="#pinnedSpecs">Pricing</a></li>
            <li><a href="#motionProjects">About</a></li>
          </ul>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <button type="button" id="motionToggleBtn" class="liquid-glass" style="color:#fff;padding:8px 16px;border-radius:999px;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
          <button type="button" id="exploreMagneticBtn" class="liquid-glass" style="color:#fff;padding:9px 22px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;" data-magnetic data-next-preview>Login</button>
        </div>
      </header>

      <div class="${p}-center" data-parallax="0.07">
        <h1 class="${p}-serif-h1" id="oversizedHeadline">Built for the curious</h1>
        <div id="heroPopoutRig" class="${p}-cutout-wrap" data-tilt-card style="filter:url(#${p}LiquidFilter);">
          ${cutoutImg}
        </div>
        <form class="${p}-email-bar liquid-glass" onsubmit="event.preventDefault();">
          <input type="email" class="${p}-email-input" placeholder="Enter your email" aria-label="Enter your email" />
          <button type="submit" class="${p}-email-submit" data-magnetic data-seamless-trigger="Subscribed to Asme Curiosity Dispatch" aria-label="Subscribe">→</button>
        </form>
        <p style="font-size:14px;color:var(--muted);line-height:1.6;max-width:480px;margin:0 auto 18px;">
          Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
        </p>
        <button type="button" class="liquid-glass" style="color:#fff;padding:12px 32px;border-radius:999px;font-size:14px;font-weight:500;cursor:pointer;" data-magnetic data-seamless-trigger="The Asme Curiosity Manifesto">
          Manifesto
        </button>
      </div>

      <div style="position:relative;z-index:10;display:flex;justify-content:center;gap:16px;padding-bottom:8px;">
        <button type="button" class="liquid-glass" style="width:48px;height:48px;border-radius:50%;color:#fff;cursor:pointer;" aria-label="Instagram" data-magnetic>IG</button>
        <button type="button" class="liquid-glass" style="width:48px;height:48px;border-radius:50%;color:#fff;cursor:pointer;" aria-label="Twitter" data-magnetic>𝕏</button>
        <button type="button" class="liquid-glass" style="width:48px;height:48px;border-radius:50%;color:#fff;cursor:pointer;" aria-label="Globe" data-magnetic>🌐</button>
      </div>
    </section>

    <section id="pinnedSpecs" class="${p}-section">
      <div class="${p}-pinned-grid">
        <article class="${p}-card liquid-glass ${p}-reveal" data-tilt-card data-spec-index="001">
          <span style="font-size:11px;color:#f59e0b;font-weight:700;">001 / LIQUID GLASS OPTICS</span>
          <strong data-counter-target="120" data-counter-suffix="Hz" style="display:block;font-size:34px;margin:6px 0;">120Hz</strong>
          <p style="font-size:13px;color:var(--muted);">Luminosity blend-mode refraction with 1.4px mask-composite specular border.</p>
        </article>
        <div class="${p}-card liquid-glass" id="scrubCenterStage" style="text-align:center;">
          ${cutoutImg}
          <p id="scrubDialText" style="margin-top:10px;font-size:12px;color:#f59e0b;font-weight:700;">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <article class="${p}-card liquid-glass ${p}-reveal" data-tilt-card data-spec-index="003">
          <span style="font-size:11px;color:#f59e0b;font-weight:700;">002 / CURIOSITY NETWORK</span>
          <strong data-counter-target="50" data-counter-suffix="K+" style="display:block;font-size:34px;margin:6px 0;">50K+</strong>
          <p style="font-size:13px;color:var(--muted);">Researchers, engineers, and designers receiving weekly spatial dispatches.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-size:12px;color:#f59e0b;font-weight:700;">ASME MANIFESTO</span>
        <button type="button" id="closeSeamlessBtn" class="liquid-glass" style="color:#fff;padding:6px 14px;border-radius:999px;cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:'Instrument Serif',serif;font-size:36px;font-weight:400;margin-bottom:12px;">Built for the curious</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:18px;">We believe software should feel like physical optics — responsive to light, curiosity, and human intuition.</p>
      <div style="margin-bottom:18px;">${cutoutImg}</div>
      <button type="button" id="confirmSeamlessBtn" class="liquid-glass" style="width:100%;color:#fff;padding:12px;border-radius:999px;cursor:pointer;">Return to Experience</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // SPECIAL BESPOKE TEMPLATE 4: Innovation ("Know it all." — Liquid Glass Dark Optical Prism + Two-Tier Header + 5 Partner Strip)
  if (spec.slug === 'innovation') {
    const innoVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091829_e74072b4-b466-4919-835f-f9ac2c0ef8ef.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>INNOVATION — Know it all.</title>
  <meta name="description" content="Precision optical intelligence and liquid-glass enterprise telemetry.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #000000; --fg: #ffffff; --muted: rgba(255,255,255,0.68); --accent: #38bdf8; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: #000; color: #fff; font-family: 'Inter', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .${p}-cursor-ring, .${p}-cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate3d(-100px,-100px,0); mix-blend-mode: difference; }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #fff; margin: -17px 0 0 -17px; transition: width 0.22s, height 0.22s, background 0.22s; }
    .${p}-cursor-ring.is-hovered { width: 58px; height: 58px; margin: -29px 0 0 -29px; background: #fff; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: #38bdf8; margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .liquid-glass {
      background: rgba(255, 255, 255, 0.015);
      background-blend-mode: luminosity;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: none;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.12);
      position: relative;
      overflow: hidden;
    }
    .liquid-glass::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.4px;
      background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    .${p}-hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; padding: 24px clamp(18px,4vw,48px); overflow: hidden; isolation: isolate; }
    .${p}-bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -3; opacity: 0.72; pointer-events: none; }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none; }
    .${p}-header { position: relative; z-index: 220; max-width: 1280px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
    .${p}-top-bar { display: flex; align-items: center; justify-content: space-between; }
    .${p}-pill-bar { border-radius: 999px; padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .${p}-nav-links { display: none; gap: 28px; list-style: none; }
    @media (min-width: 768px) { .${p}-nav-links { display: flex; } }
    .${p}-nav-links a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; }
    .${p}-center { position: relative; z-index: 10; text-align: center; max-width: 760px; margin: auto; padding: 24px 0; }
    .${p}-h1 { font-family: 'Instrument Serif', serif; font-size: clamp(56px, 9vw, 118px); font-weight: 400; letter-spacing: -0.03em; line-height: 0.96; }
    .${p}-cutout-3d { width: 100%; max-width: 310px; max-height: 245px; object-fit: contain; display: block; margin: -12px auto 12px; filter: drop-shadow(0 24px 40px rgba(0,0,0,0.8)) drop-shadow(0 0 28px rgba(56,189,248,0.34)); animation: ${p}Float 5.5s ease-in-out infinite; }
    @keyframes ${p}Float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-12px,0); } }
    .${p}-partners { position: relative; z-index: 10; max-width: 1120px; width: 100%; margin: 0 auto; padding-top: 20px; text-align: center; }
    .${p}-partner-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 36px; margin-top: 14px; color: rgba(255,255,255,0.82); font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
    .${p}-section { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${p}-pinned-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: center; }
    @media (min-width: 960px) { .${p}-pinned-grid { grid-template-columns: 1fr 1fr 1fr; } }
    .${p}-card { padding: 26px; border-radius: 28px; }
    .${p}-reveal { opacity: 0; transform: translate3d(0,22px,0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }
    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 190; background: rgba(0,0,0,0.86); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 600px; width: 100%; border-radius: 30px; background: #0b0d13; border: 1px solid rgba(255,255,255,0.16); padding: 34px; pointer-events: auto; }
  </style>
</head>
<body>
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

  <main>
    <section id="heroStage" class="${p}-hero">
      <video id="heroBgVideo" class="${p}-bg-video" src="${innoVideo}" autoplay loop muted playsinline preload="auto"></video>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>

      <header class="${p}-header">
        <div class="${p}-top-bar">
          <strong style="font-size:22px;letter-spacing:-0.04em;">INNOVATION</strong>
          <div style="display:flex;gap:10px;align-items:center;">
            <button type="button" id="motionToggleBtn" class="liquid-glass" style="color:#fff;padding:8px 16px;border-radius:999px;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
            <button type="button" class="liquid-glass" style="width:40px;height:40px;border-radius:50%;color:#fff;cursor:pointer;" data-magnetic>𝕏</button>
            <button type="button" class="liquid-glass" style="width:40px;height:40px;border-radius:50%;color:#fff;cursor:pointer;" data-magnetic>in</button>
          </div>
        </div>
        <nav class="${p}-pill-bar liquid-glass" aria-label="Primary">
          <ul class="${p}-nav-links">
            <li><a href="#heroStage">Home</a></li>
            <li><a href="#pinnedSpecs">Services</a></li>
            <li><a href="#pinnedSpecs">Why Us</a></li>
            <li><a href="#pinnedSpecs">Reviews</a></li>
            <li><a href="#pinnedSpecs">Contact Us</a></li>
          </ul>
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="font-size:13px;color:var(--muted);">1(800)234-23-34</span>
            <button type="button" id="exploreMagneticBtn" class="liquid-glass" style="color:#fff;padding:8px 20px;border-radius:999px;font-size:13px;cursor:pointer;" data-magnetic data-next-preview>Call Me Back</button>
          </div>
        </nav>
      </header>

      <div class="${p}-center" data-parallax="0.07">
        <h1 class="${p}-h1" id="oversizedHeadline">Know it all.</h1>
        <div id="heroPopoutRig" data-tilt-card style="filter:url(#${p}LiquidFilter);">
          ${cutoutImg}
        </div>
        <button type="button" class="liquid-glass" style="color:#fff;padding:15px 44px;border-radius:999px;font-size:16px;cursor:pointer;margin-top:8px;" data-magnetic data-seamless-trigger="Innovation Optical Telemetry Dossier">
          Book a Free Call
        </button>
      </div>

      <div class="${p}-partners">
        <span style="font-size:12px;color:rgba(255,255,255,0.5);">Relied on by brands framing the future</span>
        <div class="${p}-partner-row">
          <span>Vortex</span><span>Nimbus</span><span>Prysma</span><span>Kinetix</span><span>Stratum</span>
        </div>
      </div>
    </section>

    <section id="pinnedSpecs" class="${p}-section">
      <div class="${p}-pinned-grid">
        <article class="${p}-card liquid-glass ${p}-reveal" data-tilt-card data-spec-index="001">
          <span style="font-size:11px;color:#38bdf8;font-weight:700;">001 / REFRACTIVE CORE</span>
          <strong data-counter-target="99" data-counter-suffix=".9%" style="display:block;font-size:34px;margin:6px 0;">99.9%</strong>
          <p style="font-size:13px;color:var(--muted);">Real-time optical synthesis and neural decision telemetry.</p>
        </article>
        <div class="${p}-card liquid-glass" id="scrubCenterStage" style="text-align:center;">
          ${cutoutImg}
          <p id="scrubDialText" style="margin-top:10px;font-size:12px;color:#38bdf8;font-weight:700;">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <article class="${p}-card liquid-glass ${p}-reveal" data-tilt-card data-spec-index="003">
          <span style="font-size:11px;color:#38bdf8;font-weight:700;">002 / GLOBAL ENTERPRISE</span>
          <strong data-counter-target="240" data-counter-suffix="+" style="display:block;font-size:34px;margin:6px 0;">240+</strong>
          <p style="font-size:13px;color:var(--muted);">Category-leading teams powered by Innovation spatial analytics.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-size:12px;color:#38bdf8;font-weight:700;">INNOVATION DOSSIER</span>
        <button type="button" id="closeSeamlessBtn" class="liquid-glass" style="color:#fff;padding:6px 14px;border-radius:999px;cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:'Instrument Serif',serif;font-size:36px;font-weight:400;margin-bottom:10px;">Know it all.</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:18px;">Schedule a direct executive briefing with our optical intelligence architects.</p>
      <div style="margin-bottom:18px;">${cutoutImg}</div>
      <button type="button" id="confirmSeamlessBtn" class="liquid-glass" style="width:100%;color:#fff;padding:12px;border-radius:999px;cursor:pointer;">Confirm Executive Call</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // SPECIAL BESPOKE TEMPLATE 5: Orbis NFT (#010828 Deep Space + #6FFF00 Neon Green Anton + Condiment Script + 3-Col NFT Video Showcase + 3D Space Object Cutout)
  if (spec.slug === 'orbis-nft') {
    const vidLeft = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5d68-4780-8832-691ef6fb0725.mp4';
    const vidCenter = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170938_066feb72-6fd3-4ed9-a0c9-a6dc83dc1f2f.mp4';
    const vidRight = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171656_8364784d-0d1f-4c76-ac59-4f7c1fb4f4e4.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>ORBIS NFT — Next-Gen Space Artifacts</title>
  <meta name="description" content="ORBIS NFT Creation — Web3 space artifacts, interactive 3D chrome-iridescent collectibles, and live on-chain auctions.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Condiment&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #010828; --fg: #ffffff; --neon: #6FFF00; --pink: #FF36AB; --cyan: #08FDFD; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: #010828; color: #fff; font-family: 'Space Grotesk', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .${p}-cursor-ring, .${p}-cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate3d(-100px,-100px,0); mix-blend-mode: difference; }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #6FFF00; margin: -17px 0 0 -17px; transition: width 0.22s, height 0.22s, background 0.22s; }
    .${p}-cursor-ring.is-hovered { width: 58px; height: 58px; margin: -29px 0 0 -29px; background: #6FFF00; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: #FF36AB; margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 20px clamp(16px,4vw,44px) 48px;
      display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; isolation: isolate;
      background:
        radial-gradient(circle at 22% 45%, rgba(255,54,171,0.22) 0%, transparent 45%),
        radial-gradient(circle at 78% 45%, rgba(8,253,253,0.22) 0%, transparent 45%),
        radial-gradient(circle at 50% 35%, rgba(111,255,0,0.16) 0%, transparent 50%),
        #010828;
    }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
    .${p}-nav { position: relative; z-index: 220; max-width: 1400px; width: 100%; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
    .${p}-nav-links { display: none; gap: 36px; list-style: none; }
    @media (min-width: 768px) { .${p}-nav-links { display: flex; } }
    .${p}-nav-links a { color: #fff; text-decoration: none; font-size: 15px; font-weight: 500; }
    .${p}-nav-links a.active { color: #6FFF00; font-weight: 700; }
    .${p}-neon-btn { background: #6FFF00; color: #010828; border: none; border-radius: 999px; padding: 10px 24px; font-weight: 700; font-size: 14px; cursor: pointer; box-shadow: 0 0 24px rgba(111,255,0,0.45); }

    .${p}-title-stage { position: relative; text-align: center; margin: 12px auto 18px; }
    .${p}-anton { font-family: 'Anton', sans-serif; font-size: clamp(64px, 11vw, 152px); line-height: 0.92; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; }
    .${p}-anton .neon { color: #6FFF00; }
    .${p}-script {
      font-family: 'Condiment', cursive; font-size: clamp(46px, 7.5vw, 108px); color: #fff;
      position: absolute; left: 50%; bottom: -26px; transform: translateX(-50%) rotate(-3deg);
      text-shadow: 0 4px 24px rgba(255,54,171,0.9), 0 0 45px rgba(255,54,171,0.55); pointer-events: none; white-space: nowrap;
    }

    .${p}-showcase-grid {
      max-width: 1360px; width: 100%; margin: 18px auto 0;
      display: grid; grid-template-columns: 1fr; gap: 24px; align-items: center;
    }
    @media (min-width: 1024px) { .${p}-showcase-grid { grid-template-columns: 1fr 1.15fr 1fr; } }

    .${p}-nft-card {
      background: rgba(255,255,255,0.08); backdrop-filter: blur(22px);
      border: 1.5px solid rgba(255,255,255,0.28); border-radius: 24px; padding: 18px;
    }
    .${p}-nft-media { position: relative; border-radius: 16px; overflow: hidden; height: 210px; background: #060f3a; margin-bottom: 14px; }
    .${p}-nft-media video { width: 100%; height: 100%; object-fit: cover; display: block; }
    .${p}-center-portal { text-align: center; position: relative; }
    .${p}-cutout-3d {
      width: 100%; max-width: 310px; max-height: 270px; object-fit: contain; display: block; margin: 0 auto 12px;
      filter: drop-shadow(0 24px 36px rgba(0,0,0,0.75)) drop-shadow(0 0 28px rgba(111,255,0,0.35));
      animation: ${p}Float 5.4s ease-in-out infinite;
    }
    @keyframes ${p}Float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-12px,0); } }
    .${p}-section { max-width: 1320px; margin: 0 auto; padding: 72px 24px; }
    .${p}-pinned-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: center; }
    @media (min-width: 960px) { .${p}-pinned-grid { grid-template-columns: 1fr 1fr 1fr; } }
    .${p}-reveal { opacity: 0; transform: translate3d(0,22px,0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }
    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 190; background: rgba(1,8,40,0.88); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 600px; width: 100%; border-radius: 28px; background: #050f38; border: 1.5px solid #6FFF00; padding: 32px; pointer-events: auto; }
  </style>
</head>
<body>
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

  <main>
    <section id="heroStage" class="${p}-hero">
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>
      <header class="${p}-nav">
        <strong style="font-size:24px;letter-spacing:0.06em;">✦ ORBIS</strong>
        <ul class="${p}-nav-links">
          <li><a href="#heroStage" class="active">Home</a></li>
          <li><a href="#pinnedSpecs">About</a></li>
          <li><a href="#pinnedSpecs">Creation</a></li>
          <li><a href="#pinnedSpecs"> Price</a></li>
        </ul>
        <div style="display:flex;gap:10px;align-items:center;">
          <button type="button" id="motionToggleBtn" style="background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.25);padding:8px 14px;border-radius:999px;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
          <button type="button" id="exploreMagneticBtn" class="${p}-neon-btn" data-magnetic data-next-preview>Sign Up</button>
        </div>
      </header>

      <div class="${p}-title-stage" data-parallax="0.06">
        <h1 class="${p}-anton" id="oversizedHeadline">ORBIS <span class="neon">NFT</span></h1>
        <span class="${p}-script">Creation</span>
      </div>

      <div class="${p}-showcase-grid">
        <article class="${p}-nft-card ${p}-reveal" data-tilt-card data-seamless-trigger="NFT #2419 — Orbis Genesis Artifact">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <strong>NFT #2419</strong>
            <span style="font-size:13px;color:#FF36AB;">♥ 206</span>
          </div>
          <div class="${p}-nft-media">
            <video id="heroBgVideo" src="${vidLeft}" autoplay loop muted playsinline preload="metadata"></video>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:18px;font-weight:700;color:#6FFF00;">◆ 10 ETH</span>
            <button type="button" class="${p}-neon-btn" style="padding:7px 18px;font-size:12px;">Buy Now</button>
          </div>
        </article>

        <div class="${p}-center-portal" id="heroPopoutRig" data-tilt-card style="filter:url(#${p}LiquidFilter);">
          ${cutoutImg}
          <button type="button" class="${p}-neon-btn" style="padding:13px 34px;font-size:15px;" data-magnetic data-seamless-trigger="Orbis Live Genesis Drop">
            Explore Now ↗
          </button>
        </div>

        <article class="${p}-nft-card ${p}-reveal" data-tilt-card data-seamless-trigger="NFT #1079 — Cyber Chrome Helmet">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <strong>NFT #1079</strong>
            <span style="font-size:13px;color:#08FDFD;">♥ 165</span>
          </div>
          <div class="${p}-nft-media">
            <video src="${vidRight}" autoplay loop muted playsinline preload="metadata"></video>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:18px;font-weight:700;color:#6FFF00;">◆ 8 ETH</span>
            <button type="button" class="${p}-neon-btn" style="padding:7px 18px;font-size:12px;">Buy Now</button>
          </div>
        </article>
      </div>
    </section>

    <section id="pinnedSpecs" class="${p}-section">
      <div class="${p}-pinned-grid">
        <article class="${p}-nft-card ${p}-reveal" data-tilt-card data-spec-index="001">
          <span style="font-size:11px;color:#6FFF00;font-weight:700;">001 / TOTAL VOLUME</span>
          <strong data-counter-target="42" data-counter-suffix="K ETH" style="display:block;font-size:34px;margin:6px 0;">42K ETH</strong>
          <p style="font-size:13px;color:rgba(255,255,255,0.72);">Zero-gas Layer-2 minting with instant royalty settlement.</p>
        </article>
        <div class="${p}-nft-card" id="scrubCenterStage" style="text-align:center;">
          ${cutoutImg}
          <p id="scrubDialText" style="margin-top:8px;font-size:12px;color:#6FFF00;font-weight:700;">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <article class="${p}-nft-card ${p}-reveal" data-tilt-card data-spec-index="003">
          <span style="font-size:11px;color:#08FDFD;font-weight:700;">002 / HOLDERS</span>
          <strong data-counter-target="12" data-counter-suffix=".4K" style="display:block;font-size:34px;margin:6px 0;">12.4K</strong>
          <p style="font-size:13px;color:rgba(255,255,255,0.72);">Verified collectors governing the Orbis Spatial DAO.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="color:#6FFF00;font-size:12px;font-weight:700;">ORBIS MINT PORTAL</span>
        <button type="button" id="closeSeamlessBtn" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.3);padding:6px 14px;border-radius:999px;cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:'Anton',sans-serif;font-size:32px;letter-spacing:0.04em;margin-bottom:10px;">ORBIS NFT GENESIS</h2>
      <p style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:16px;">Each Orbis space artifact includes full 4K GLTF/USDZ geometry and on-chain provenance.</p>
      <div style="margin-bottom:16px;">${cutoutImg}</div>
      <button type="button" id="confirmSeamlessBtn" class="${p}-neon-btn" style="width:100%;">Place Bid in ETH</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // SPECIAL BESPOKE TEMPLATE 6: Portfolio Cosmic ("Michael Smith" — #0a0a0a Dark + #89AACC Steel-Blue Cosmic Glow + Bento Grid + Bottom Floating Pill Nav + 3D Cosmic Astrolabe Cutout)
  if (spec.slug === 'portfolio-cosmic') {
    const cosmicVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_024949_c2df2ce2-00c2-4c26-84c6-210c14f3b98e.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Michael Smith — Web3 Product Designer &amp; Cosmic Portfolio</title>
  <meta name="description" content="Web3 Product Designer crafting atmospheric digital products, Bento design systems, and spatial interfaces.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #0a0a0a; --fg: #f0f4f8; --muted: rgba(240,244,248,0.62); --steel: #89AACC; --blue: #4E85BF; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: #0a0a0a; color: var(--fg); font-family: 'Inter', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .${p}-cursor-ring, .${p}-cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate3d(-100px,-100px,0); mix-blend-mode: difference; }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #89AACC; margin: -17px 0 0 -17px; transition: width 0.22s, height 0.22s, background 0.22s; }
    .${p}-cursor-ring.is-hovered { width: 58px; height: 58px; margin: -29px 0 0 -29px; background: #89AACC; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: #89AACC; margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 28px clamp(20px,5vw,64px) 96px;
      display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; isolation: isolate;
      background:
        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(137,170,204,0.22) 0%, rgba(78,133,191,0.06) 55%, transparent 80%),
        #0a0a0a;
    }
    .${p}-bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -3; opacity: 0.28; pointer-events: none; }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none; }

    .${p}-top-bar { display: flex; justify-content: space-between; align-items: center; max-width: 1280px; width: 100%; margin: 0 auto; z-index: 20; }
    .${p}-pill-tag { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: 999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(137,170,204,0.24); font-size: 12px; color: #89AACC; }
    .${p}-hero-grid { max-width: 1280px; width: 100%; margin: auto; display: grid; grid-template-columns: 1fr; gap: 36px; align-items: center; padding: 36px 0; }
    @media (min-width: 960px) { .${p}-hero-grid { grid-template-columns: 1.15fr 0.85fr; } }

    .${p}-syne-h1 {
      font-family: 'Syne', sans-serif; font-size: clamp(46px, 7.2vw, 94px); font-weight: 700;
      line-height: 0.96; letter-spacing: -0.03em; margin: 14px 0 18px;
      background: linear-gradient(135deg, #ffffff 25%, #89AACC 70%, #4E85BF 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .${p}-cta-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(135deg, #89AACC 0%, #4E85BF 100%);
      color: #06090e; border: none; border-radius: 999px; padding: 12px 28px;
      font-weight: 600; font-size: 14px; cursor: pointer;
    }
    .${p}-cutout-3d {
      width: 100%; max-width: 340px; max-height: 310px; object-fit: contain; display: block; margin: 0 auto;
      filter: drop-shadow(0 28px 44px rgba(0,0,0,0.85)) drop-shadow(0 0 28px rgba(137,170,204,0.34));
      animation: ${p}Float 5.8s ease-in-out infinite;
    }
    @keyframes ${p}Float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-12px,0); } }

    /* Fixed Bottom Floating Glass Pill Navbar (Signature Cosmic Portfolio UI) */
    .${p}-bottom-nav {
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 220;
      background: rgba(14,18,26,0.82); backdrop-filter: blur(20px);
      border: 1px solid rgba(137,170,204,0.28); border-radius: 999px;
      padding: 6px 8px 6px 20px; display: flex; align-items: center; gap: 20px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.65);
    }
    .${p}-bottom-nav a { color: rgba(240,244,248,0.78); text-decoration: none; font-size: 13px; font-weight: 500; }
    .${p}-bottom-nav a:hover { color: #fff; }

    /* Bento Grid Section */
    .${p}-section { max-width: 1280px; margin: 0 auto; padding: 80px clamp(20px,5vw,64px) 120px; }
    .${p}-bento-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 32px; }
    @media (min-width: 960px) { .${p}-bento-grid { grid-template-columns: 1.2fr 1fr 1fr; } }
    .${p}-bento-card {
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%);
      border: 1px solid rgba(137,170,204,0.18); border-radius: 26px; padding: 28px;
      backdrop-filter: blur(16px);
    }
    .${p}-stat-big { font-family: 'Syne', sans-serif; font-size: clamp(38px, 4.5vw, 56px); font-weight: 700; color: #89AACC; display: block; }
    .${p}-reveal { opacity: 0; transform: translate3d(0,22px,0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }
    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 240; background: rgba(6,8,12,0.88); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 600px; width: 100%; border-radius: 28px; background: #10151f; border: 1px solid rgba(137,170,204,0.32); padding: 32px; pointer-events: auto; }
  </style>
</head>
<body>
  <svg width="0" height="0" viewBox="0 0 0 0" style="position:absolute;pointer-events:none;" aria-hidden="true">
    <defs>
      <filter id="${p}LiquidFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="14" />
        <feDisplacementMap id="${p}Displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <nav class="${p}-bottom-nav" aria-label="Floating Cosmic Navigation">
    <a href="#heroStage">Home</a>
    <a href="#pinnedSpecs">Work</a>
    <a href="#pinnedSpecs">About</a>
    <button type="button" id="exploreMagneticBtn" class="${p}-cta-btn" style="padding:8px 18px;font-size:12px;" data-magnetic data-next-preview>Contact for work</button>
  </nav>

  <main>
    <section id="heroStage" class="${p}-hero">
      <video id="heroBgVideo" class="${p}-bg-video" src="${cosmicVideo}" autoplay loop muted playsinline preload="auto"></video>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>

      <header class="${p}-top-bar">
        <span class="${p}-pill-tag">✦ Web3 Product Designer</span>
        <button type="button" id="motionToggleBtn" class="${p}-pill-tag" style="cursor:pointer;" aria-pressed="false">Motion: ON</button>
      </header>

      <div class="${p}-hero-grid">
        <div data-parallax="0.07">
          <span style="font-size:13px;color:#89AACC;letter-spacing:0.08em;text-transform:uppercase;">Available for Q2 Select Commissions</span>
          <h1 class="${p}-syne-h1" id="oversizedHeadline">Michael Smith</h1>
          <p style="font-size:16px;color:var(--muted);line-height:1.65;max-width:520px;margin-bottom:26px;">
            Principal Web3 Product Designer architecting spatial interfaces, token ecosystems, and high-converting interactive Webflow systems.
          </p>
          <div style="display:flex;gap:14px;flex-wrap:wrap;">
            <button type="button" class="${p}-cta-btn" data-magnetic data-seamless-trigger="001 / Nova Relay Case Study">Explore Selected Works ↗</button>
          </div>
        </div>
        <div id="heroPopoutRig" data-tilt-card style="filter:url(#${p}LiquidFilter);">
          ${cutoutImg}
        </div>
      </div>
    </section>

    <section id="pinnedSpecs" class="${p}-section">
      <h2 style="font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,44px);">Cosmic Bento Telemetry</h2>
      <div class="${p}-bento-grid">
        <article class="${p}-bento-card ${p}-reveal" data-tilt-card data-spec-index="001" data-seamless-trigger="001 / Nova Relay Protocol">
          <span style="font-size:12px;color:#89AACC;">001 /CAPITAL ASSISTED</span>
          <strong class="${p}-stat-big" data-counter-target="23" data-counter-suffix="M+">$23M+</strong>
          <p style="font-size:14px;color:var(--muted);margin-top:8px;">Seed &amp; Series A funding raised by Web3 protocols launched with bespoke interactive design systems.</p>
        </article>
        <div class="${p}-bento-card" id="scrubCenterStage" style="text-align:center;">
          ${cutoutImg}
          <p id="scrubDialText" style="margin-top:10px;font-size:12px;color:#89AACC;font-weight:700;">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <article class="${p}-bento-card ${p}-reveal" data-tilt-card data-spec-index="003" data-seamless-trigger="002 / Pulse Board Analytics">
          <span style="font-size:12px;color:#89AACC;">002 / CLIENT SATISFACTION</span>
          <strong class="${p}-stat-big" data-counter-target="97" data-counter-suffix="%">97%</strong>
          <p style="font-size:14px;color:var(--muted);margin-top:8px;">17+ international design awards across Webflow, Awwwards, and FWA showcases.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-pill-tag">Michael Smith • Case Study</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-tag" style="cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:'Syne',sans-serif;font-size:28px;margin-bottom:10px;">001 / Nova Relay</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:18px;">Complete spatial brand architecture, 3D astrolabe telemetry, and interactive WebGL design system.</p>
      <div style="margin-bottom:18px;">${cutoutImg}</div>
      <button type="button" id="confirmSeamlessBtn" class="${p}-cta-btn" style="width:100%;justify-content:center;">Book Commission Slot</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 12. MAX REED PORTFOLIO (Dark 3-Column Bento Grid + #324444 Teal-Slate Cards + Dual Software Icon Marquee + 10M+ Raised)
  if (spec.slug === 'max-reed-portfolio') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>MAX REED — Interactive UI/UX Designer Portfolio</title>
  <meta name="description" content="Max Reed — UI/UX Designer based in LA with 6+ years of experience, 12+ design awards, and $10M+ raised for startups.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0a0a;
      --card: #131313;
      --teal: #324444;
      --fg: #ffffff;
      --muted: #8a8a8a;
      --border: #262626;
      --green: #51c72b;
      --gold: #f5c518;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .${p}-cursor-ring, .${p}-cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate3d(-100px,-100px,0); mix-blend-mode: difference; }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #fff; margin: -17px 0 0 -17px; transition: width 0.22s, height 0.22s, background 0.22s; }
    .${p}-cursor-ring.is-hovered { width: 56px; height: 56px; margin: -28px 0 0 -28px; background: #fff; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--green); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-bento-stage {
      max-width: 1440px; width: 100%; margin: 0 auto; padding: 14px; min-height: 100vh;
      display: grid; grid-template-columns: 1fr; gap: 12px;
    }
    @media (min-width: 1024px) {
      .${p}-bento-stage { grid-template-columns: minmax(0, 28fr) minmax(0, 44fr) minmax(0, 28fr); height: 100vh; max-height: 960px; }
    }
    .${p}-col { display: flex; flex-direction: column; gap: 12px; min-height: 0; min-width: 0; }
    .${p}-card-dark {
      background: var(--card); border: 1px solid var(--border); border-radius: 18px;
      padding: 24px; display: flex; flex-direction: column; justify-content: space-between;
      position: relative; overflow: hidden; transition: border-color 0.25s, transform 0.3s;
    }
    .${p}-card-teal {
      background: var(--teal); border: 1px solid rgba(255,255,255,0.14); border-radius: 18px;
      padding: 24px; display: flex; flex-direction: column; justify-content: space-between;
      position: relative; overflow: hidden; transition: transform 0.3s;
    }
    .${p}-pill {
      display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px;
      border-radius: 999px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
      color: var(--fg); font-size: 12px; font-weight: 600; text-decoration: none; cursor: pointer;
    }
    .${p}-marquee-box { overflow: hidden; display: flex; flex-direction: column; gap: 10px; margin-top: 16px; mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
    .${p}-marquee-track { display: flex; gap: 10px; width: max-content; animation: ${p}MarqueeR 22s linear infinite; }
    .${p}-marquee-track.rev { animation: ${p}MarqueeL 22s linear infinite; }
    @keyframes ${p}MarqueeR { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
    @keyframes ${p}MarqueeL { 0% { transform: translate3d(-50%,0,0); } 100% { transform: translate3d(0,0,0); } }
    .${p}-app-icon {
      width: 48px; height: 48px; border-radius: 12px; background: #1c1c1c; border: 1px solid var(--border);
      display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #d4d4d4;
      flex-shrink: 0;
    }
    .${p}-portrait-card {
      flex: 1; min-height: 420px; border-radius: 18px; border: 1px solid var(--border);
      position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 28px;
      background: #161818;
    }
    .${p}-portrait-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.68;
      filter: contrast(1.06) grayscale(0.15); transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
    }
    .${p}-portrait-card:hover .${p}-portrait-video { transform: scale(1.04); }
    .${p}-portrait-grad {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.92) 100%);
    }
    .${p}-work-preview {
      flex: 1; min-height: 220px; border-radius: 12px; background: radial-gradient(circle at 30% 20%, #324444, #0d1111 75%);
      border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between; padding: 18px; margin-top: 14px;
    }
    .${p}-avatar-stack { display: flex; align-items: center; }
    .${p}-avatar {
      width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--teal);
      margin-left: -10px; display: inline-flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 800; color: #fff;
    }
    .${p}-avatar:first-child { margin-left: 0; }
    .${p}-case-section { max-width: 1440px; margin: 0 auto; padding: 56px 14px 80px; }
    .${p}-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 24px; }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 20px, 0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(10,10,10,0.86); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 620px; width: 100%; border-radius: 22px; background: #131313; border: 1px solid var(--border); padding: 32px; }
  </style>
</head>
<body>
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <main>
    <section class="${p}-bento-stage" aria-label="Max Reed Bento Portfolio">
      <!-- LEFT COLUMN (28%) -->
      <div class="${p}-col">
        <article class="${p}-card-teal" style="flex: 0 0 42%;" data-tilt-card>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="${p}-pill">✦ 12+ Design Awards</span>
            <button type="button" id="motionToggleBtn" class="${p}-pill" aria-pressed="false">Motion: ON</button>
          </div>
          <div style="margin: 18px 0;">
            <h2 style="font-size: clamp(22px, 2vw, 28px); font-weight: 500; line-height: 1.2; letter-spacing: -0.02em;">
              UI/UX Designer with 6+ years of experience.
            </h2>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid rgba(255,255,255,0.14);">
            <span style="font-size:13px;color:rgba(255,255,255,0.85);">max@studio.com</span>
            <button type="button" class="${p}-pill" data-seamless-trigger="Contact Max Reed — Direct Studio Inquiry" data-magnetic>Copy Email ↗</button>
          </div>
        </article>

        <article class="${p}-card-dark" style="flex: 1;" data-tilt-card>
          <div>
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);">Interactive Craft &amp; Stack</span>
            <p style="font-size: 16px; font-weight: 500; line-height: 1.45; color: #ededed; margin-top: 10px;">
              Over a decade of experience in interactive design and working with some of the most talented people in the business
            </p>
          </div>
          <div class="${p}-marquee-box" aria-label="Design and Engineering Stack">
            <div class="${p}-marquee-track">
              <span class="${p}-app-icon">Figma</span><span class="${p}-app-icon">Framer</span><span class="${p}-app-icon">Spline</span><span class="${p}-app-icon">WebGL</span><span class="${p}-app-icon">React</span><span class="${p}-app-icon">GSAP</span><span class="${p}-app-icon">Three</span>
              <span class="${p}-app-icon">Figma</span><span class="${p}-app-icon">Framer</span><span class="${p}-app-icon">Spline</span><span class="${p}-app-icon">WebGL</span><span class="${p}-app-icon">React</span><span class="${p}-app-icon">GSAP</span><span class="${p}-app-icon">Three</span>
            </div>
            <div class="${p}-marquee-track rev">
              <span class="${p}-app-icon">AE</span><span class="${p}-app-icon">C4D</span><span class="${p}-app-icon">Next</span><span class="${p}-app-icon">Lenis</span><span class="${p}-app-icon">Rive</span><span class="${p}-app-icon">Shader</span><span class="${p}-app-icon">Node</span>
              <span class="${p}-app-icon">AE</span><span class="${p}-app-icon">C4D</span><span class="${p}-app-icon">Next</span><span class="${p}-app-icon">Lenis</span><span class="${p}-app-icon">Rive</span><span class="${p}-app-icon">Shader</span><span class="${p}-app-icon">Node</span>
            </div>
          </div>
        </article>
      </div>

      <!-- CENTER COLUMN (44%) -->
      <div class="${p}-col">
        <header class="${p}-card-dark" style="flex: 0 0 auto; padding: 18px 24px; flex-direction: row; align-items: center;">
          <strong style="font-size: 16px; font-weight: 800; letter-spacing: 0.04em;">MAX REED</strong>
          <nav style="display:flex;gap:22px;align-items:center;" aria-label="Primary Navigation">
            <a href="#workShowcase" style="color:var(--fg);text-decoration:none;font-size:14px;font-weight:500;">Work</a>
            <a href="#workShowcase" style="color:var(--muted);text-decoration:none;font-size:14px;font-weight:500;">About</a>
            <a href="#workShowcase" data-seamless-trigger="Book a Discovery Call with Max Reed" style="color:var(--muted);text-decoration:none;font-size:14px;font-weight:500;">Contact</a>
          </nav>
        </header>

        <div class="${p}-portrait-card" data-tilt-card>
          <video id="heroBgVideo" class="${p}-portrait-video" src="${spec.heroVideo}" autoplay loop muted playsinline preload="auto"></video>
          <div class="${p}-portrait-grad"></div>
          <div style="position:relative;z-index:2;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;">
            <div>
              <h1 style="font-size: clamp(34px, 3.6vw, 44px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.05;">
                Max Reed
                <span style="display:block;font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;font-size:clamp(24px,2.4vw,30px);color:#d4d4d4;margin-top:4px;">
                  Based in LA
                </span>
              </h1>
            </div>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:rgba(19,19,19,0.82);border:1px solid var(--border);backdrop-filter:blur(12px);">
              <span style="width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 10px var(--green);"></span>
              <span style="font-size:13px;color:var(--muted);font-weight:500;">Available for full-time</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN (28%) -->
      <div class="${p}-col">
        <article class="${p}-card-dark" style="flex: 1;" data-tilt-card>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:16px;font-weight:600;">Work</span>
            <a href="#workShowcase" style="font-size:13px;color:var(--muted);text-decoration:none;">Show more ↗</a>
          </div>
          <div class="${p}-work-preview">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="${p}-pill" style="background:rgba(0,0,0,0.45);">Interactive Web Design</span>
              <span style="font-size:11px;color:rgba(255,255,255,0.6);">2026</span>
            </div>
            <div style="text-align:center;margin:18px 0;">
              <span style="font-family:'Instrument Serif',serif;font-style:italic;font-size:46px;letter-spacing:-0.02em;">Nola</span>
            </div>
            <div style="display:flex;justify-content:flex-end;">
              <button type="button" id="exploreMagneticBtn" class="${p}-pill" data-magnetic data-seamless-trigger="Nola — Interactive Web Design Case Study">
                View Project ↗
              </button>
            </div>
          </div>
        </article>

        <article class="${p}-card-teal" style="flex: 0 0 38%;" data-tilt-card>
          <div>
            <strong style="font-size: clamp(40px, 3.8vw, 52px); font-weight: 700; line-height: 1; display: block;" data-counter-target="10" data-counter-suffix="M+">10M+</strong>
            <span style="font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 6px; display: block;">Raised for startups</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:18px;">
            <div class="${p}-avatar-stack">
              <span class="${p}-avatar" style="background:#1f2937;">AK</span>
              <span class="${p}-avatar" style="background:#0f766e;">SL</span>
              <span class="${p}-avatar" style="background:#4338ca;">MR</span>
              <span class="${p}-avatar" style="background:#b45309;">JD</span>
            </div>
            <div style="text-align:right;">
              <div style="color:var(--gold);font-size:13px;letter-spacing:1px;">★★★★★</div>
              <span style="font-size:11px;color:rgba(255,255,255,0.75);">38+ Founder Reviews</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- BELOW THE FOLD: INTERACTIVE CASE ARCHIVE -->
    <section id="workShowcase" class="${p}-case-section">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;">
        <div>
          <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:var(--muted);">Selected Index (2023–2026)</span>
          <h2 style="font-size:clamp(28px,3.2vw,40px);font-weight:600;margin-top:6px;">Featured Product &amp; Brand Systems</h2>
        </div>
        <span id="scrollScrubReadout" class="${p}-pill">SCRUB 0% • 0.0°</span>
      </div>
      <div class="${p}-case-grid">
        <article class="${p}-card-dark ${p}-reveal" data-tilt-card data-spec-index="001" data-seamless-trigger="01 / Nola Spatial Commerce">
          <span style="font-size:12px;color:var(--green);">001 / SPATIAL COMMERCE</span>
          <h3 style="font-size:22px;margin:10px 0 6px;">Nola Interactive Flagship</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.55;">Led design systems and WebGL product storytelling, lifting checkout conversion by 41%.</p>
        </article>
        <article class="${p}-card-dark ${p}-reveal" data-tilt-card data-spec-index="002" data-seamless-trigger="02 / Kinetix AI OS">
          <span style="font-size:12px;color:var(--green);">002 / SERIES A FINTECH</span>
          <h3 style="font-size:22px;margin:10px 0 6px;">Kinetix Treasury OS</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.55;">Zero-latency bento workspace that helped secure $6.4M seed-to-Series-A institutional backing.</p>
        </article>
        <article class="${p}-card-dark ${p}-reveal" data-tilt-card data-spec-index="003" data-seamless-trigger="03 / Vespera Audio Synth">
          <span style="font-size:12px;color:var(--green);">003 / HARDWARE INTERFACE</span>
          <h3 style="font-size:22px;margin:10px 0 6px;">Vespera Spatial Synth</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.55;">Tactile browser companion app recognized with FWA &amp; Awwwards Site of the Day.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span class="${p}-pill">Max Reed Studio — LA</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:26px;margin-bottom:10px;">Nola — Interactive Web Design</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Full case study breakdown including interactive Figma prototypes, motion token choreography, and startup fundraising metrics.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill" style="background:var(--teal);width:100%;justify-content:center;padding:12px;">
        Send Direct Message to max@studio.com
      </button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 13. MINDLOOP LANDING (Pure Monochrome #000 Newsletter Growth Platform + AI Search SVG Cards + Word-by-Word Scroll Reveal)
  if (spec.slug === 'mindloop-landing') {
    const mlVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>MindLoop — Turn Your Expertise Into a Newsletter That Runs Itself</title>
  <meta name="description" content="Get Inspired with Us. Turn your expertise into a newsletter written in your voice, building authority in AI search and converting readers into clients.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #000000;
      --card: #0f0f0f;
      --fg: #ffffff;
      --muted: rgba(255,255,255,0.62);
      --border: rgba(255,255,255,0.12);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Inter', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .serif-italic { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; }

    .${p}-nav {
      position: fixed; top: 16px; left: 0; right: 0; z-index: 200;
      max-width: 1180px; margin: 0 auto; padding: 12px 24px;
      border-radius: 999px; background: rgba(10,10,10,0.72); backdrop-filter: blur(18px);
      border: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-btn-white {
      padding: 10px 22px; border-radius: 999px; background: #ffffff; color: #000000;
      font-size: 13px; font-weight: 600; border: none; cursor: pointer; transition: transform 0.2s, opacity 0.2s;
    }
    .${p}-btn-white:hover { opacity: 0.92; transform: translateY(-1px); }
    .${p}-badge {
      display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px;
      border-radius: 999px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
      backdrop-filter: blur(12px); font-size: 12px; color: rgba(255,255,255,0.85);
    }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 140px 20px 64px;
      display: flex; flex-direction: column; align-items: center; justify-content: space-between;
      text-align: center; overflow: hidden; isolation: isolate;
    }
    .${p}-hero-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; opacity: 0.55;
    }
    .${p}-hero-overlay {
      position: absolute; inset: 0; z-index: -1;
      background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.68) 65%, #000000 100%);
    }
    .${p}-h1 {
      font-size: clamp(46px, 7vw, 84px); font-weight: 500; letter-spacing: -0.04em; line-height: 1.04;
      max-width: 820px; margin: 20px auto 18px;
    }
    .${p}-email-bar {
      display: flex; align-items: center; gap: 8px; max-width: 460px; width: 100%;
      margin: 28px auto 18px; padding: 6px 6px 6px 20px; border-radius: 999px;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); backdrop-filter: blur(12px);
    }
    .${p}-email-bar input {
      flex: 1; background: transparent; border: none; color: #fff; font-size: 14px; outline: none;
    }
    .${p}-section { max-width: 1200px; margin: 0 auto; padding: 96px 20px; }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px; margin-top: 48px; }
    .${p}-grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 48px; }
    .${p}-card {
      background: var(--card); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;
      padding: 28px; display: flex; flex-direction: column; justify-content: space-between;
      transition: border-color 0.25s, transform 0.3s;
    }
    .${p}-card:hover { border-color: rgba(255,255,255,0.22); }
    .${p}-mission-word { opacity: 0.22; transition: opacity 0.35s ease; }
    .${p}-mission-word.is-lit { opacity: 1; }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(0,0,0,0.88); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 560px; width: 100%; border-radius: 24px; background: #0f0f0f; border: 1px solid var(--border); padding: 32px; }
  </style>
</head>
<body>
  <header class="${p}-nav">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:10px;height:10px;border-radius:50%;background:#fff;display:inline-block;"></span>
      <strong style="font-size:16px;letter-spacing:-0.02em;">MindLoop</strong>
    </div>
    <nav style="display:flex;gap:24px;align-items:center;" aria-label="Main Navigation">
      <a href="#whyMindloop" style="color:var(--muted);text-decoration:none;font-size:13px;">How It Works</a>
      <a href="#missionStatement" style="color:var(--muted);text-decoration:none;font-size:13px;">Mission</a>
      <a href="#solutionGrid" style="color:var(--muted);text-decoration:none;font-size:13px;">Solutions</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-badge" style="cursor:pointer;" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-white" data-magnetic>Book A Call</button>
    </div>
  </header>

  <main>
    <!-- SECTION 1: HERO -->
    <section class="${p}-hero">
      <video id="heroBgVideo" class="${p}-hero-video" src="${mlVideo}" autoplay loop muted playsinline preload="auto"></video>
      <div class="${p}-hero-overlay"></div>

      <div style="max-width:860px;margin:auto 0;" data-parallax="0.06">
        <span class="${p}-badge">✦ Stay Ahead. Always.</span>
        <h1 class="${p}-h1">Get <span class="serif-italic">Inspired</span> with Us</h1>
        <p style="font-size:clamp(16px,1.4vw,18px);color:rgba(255,255,255,0.72);max-width:600px;margin:0 auto;line-height:1.6;">
          Turn your expertise into a newsletter that runs itself — written in your voice, sent on your schedule, growing your business every week.
        </p>
        <form class="${p}-email-bar" onsubmit="event.preventDefault();document.getElementById('exploreMagneticBtn').click();">
          <input type="email" placeholder="Enter your founder email..." aria-label="Email address">
          <button type="submit" class="${p}-btn-white">Subscribe Now</button>
        </form>
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;font-size:13px;color:rgba(255,255,255,0.65);">
          <span style="letter-spacing:2px;color:#fff;">★★★★★</span>
          <span>Trusted by <strong style="color:#fff;" data-counter-target="2400" data-counter-suffix="+">2,400+</strong> creators &amp; founders</span>
        </div>
      </div>

      <div style="width:100%;max-width:1040px;padding-top:28px;border-top:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-around;flex-wrap:wrap;gap:20px;opacity:0.45;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
        <span>Substack</span><span>Beehiiv</span><span>ConvertKit</span><span>Ghost</span><span>Mailchimp</span><span>Notion</span>
      </div>
    </section>

    <!-- SECTION 2: WHY MINDLOOP (3 AI & SEARCH CARDS) -->
    <section id="whyMindloop" class="${p}-section">
      <div style="text-align:center;">
        <span class="${p}-badge">Why MindLoop</span>
        <h2 style="font-size:clamp(34px,4.5vw,56px);font-weight:500;letter-spacing:-0.03em;margin-top:16px;">
          Search has changed. <span class="serif-italic">Have you?</span>
        </h2>
      </div>

      <div class="${p}-grid-3">
        <!-- Card 1: Bar Chart -->
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <div style="height:170px;display:flex;align-items:flex-end;justify-content:space-around;padding:20px 16px;background:rgba(255,255,255,0.03);border-radius:14px;margin-bottom:22px;">
            <div style="text-align:center;width:24%;">
              <div style="height:110px;background:rgba(255,255,255,0.85);border-radius:6px 6px 0 0;"></div>
              <span style="font-size:11px;color:var(--muted);display:block;margin-top:6px;">2024 • 100%</span>
            </div>
            <div style="text-align:center;width:24%;">
              <div style="height:64px;background:rgba(255,255,255,0.45);border-radius:6px 6px 0 0;"></div>
              <span style="font-size:11px;color:var(--muted);display:block;margin-top:6px;">2025 • 58%</span>
            </div>
            <div style="text-align:center;width:24%;">
              <div style="height:30px;background:rgba(255,255,255,0.2);border-radius:6px 6px 0 0;"></div>
              <span style="font-size:11px;color:var(--muted);display:block;margin-top:6px;">2026 • 27%</span>
            </div>
          </div>
          <div>
            <h3 style="font-size:20px;font-weight:600;margin-bottom:8px;">Organic Reach Is Collapsing</h3>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">Zero-click AI answers now intercept traditional search traffic before prospects ever visit a blog.</p>
          </div>
        </article>

        <!-- Card 2: AI Platform Nodes -->
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <div style="height:170px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px;background:rgba(255,255,255,0.03);border-radius:14px;margin-bottom:22px;padding:16px;">
            <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
              <span class="${p}-badge">ChatGPT</span><span class="${p}-badge">Perplexity</span><span class="${p}-badge">Claude</span><span class="${p}-badge">Gemini</span>
            </div>
            <div style="width:1px;height:22px;background:rgba(255,255,255,0.3);"></div>
            <span class="${p}-btn-white" style="padding:6px 16px;font-size:12px;">Your Brand Authority</span>
          </div>
          <div>
            <h3 style="font-size:20px;font-weight:600;margin-bottom:8px;">AI Recommends Who It Knows</h3>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">Consistent long-form citations train LLMs to surface your name when buyers ask for category leaders.</p>
          </div>
        </article>

        <!-- Card 3: Channel Comparison -->
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <div style="height:170px;display:flex;flex-direction:column;justify-content:center;gap:10px;background:rgba(255,255,255,0.03);border-radius:14px;margin-bottom:22px;padding:18px;">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span>Email Newsletter</span><strong>42.0%</strong></div>
              <div style="height:8px;background:rgba(255,255,255,0.1);border-radius:99px;"><div style="width:88%;height:100%;background:#fff;border-radius:99px;"></div></div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:4px;"><span>Social Feed</span><span>3.2%</span></div>
              <div style="height:6px;background:rgba(255,255,255,0.1);border-radius:99px;"><div style="width:14%;height:100%;background:rgba(255,255,255,0.35);border-radius:99px;"></div></div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:4px;"><span>Cold Outreach</span><span>0.9%</span></div>
              <div style="height:6px;background:rgba(255,255,255,0.1);border-radius:99px;"><div style="width:6%;height:100%;background:rgba(255,255,255,0.2);border-radius:99px;"></div></div>
            </div>
          </div>
          <div>
            <h3 style="font-size:20px;font-weight:600;margin-bottom:8px;">Newsletters Build Direct Trust</h3>
            <p style="font-size:14px;color:var(--muted);line-height:1.6;">Own your distribution outright with an inbox relationship no algorithm update can throttle.</p>
          </div>
        </article>
      </div>
    </section>

    <!-- SECTION 3: SCROLL WORD-BY-WORD REVEAL MISSION STATEMENT -->
    <section id="missionStatement" class="${p}-section" style="text-align:center;">
      <span class="${p}-badge">Our Philosophy</span>
      <p id="mindloopWordReveal" style="font-size:clamp(26px,3.8vw,46px);font-weight:500;line-height:1.32;letter-spacing:-0.025em;max-width:960px;margin:28px auto 0;">
        You didn't build your expertise to spend hours staring at a blank page. We capture your best thinking in a single 20-minute conversation each month — then turn it into <span class="serif-italic" style="color:#fff;">weekly newsletters</span> that sound unmistakably like you, build authority in AI search, and turn quiet readers into paying clients.
      </p>
    </section>

    <!-- SECTION 4: 4-COLUMN SOLUTION GRID -->
    <section id="solutionGrid" class="${p}-section">
      <div style="text-align:center;">
        <span class="${p}-badge">The Solution</span>
        <h2 style="font-size:clamp(32px,4.2vw,52px);font-weight:500;letter-spacing:-0.03em;margin-top:16px;">
          How We Turn Your <span class="serif-italic">Voice</span> Into Growth
        </h2>
      </div>
      <div class="${p}-grid-4">
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-size:12px;color:var(--muted);">01 / EXTRACTION</span>
          <h3 style="font-size:19px;margin:14px 0 8px;">Voice Capture Call</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">One 20-minute recorded interview per month extracts your contrarian stories, frameworks, and client wins.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-size:12px;color:var(--muted);">02 / SYNTHESIS</span>
          <h3 style="font-size:19px;margin:14px 0 8px;">Voice-Matched Drafting</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Editorial strategists + custom style models craft 4 deep-dive issues calibrated to your exact cadence.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-size:12px;color:var(--muted);">03 / CITATION</span>
          <h3 style="font-size:19px;margin:14px 0 8px;">AI Search Indexing</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Structured schema and cross-syndication ensure ChatGPT and Perplexity cite your domain first.</p>
        </article>
        <article class="${p}-card ${p}-reveal" data-tilt-card>
          <span style="font-size:12px;color:var(--muted);">04 / MONETIZATION</span>
          <h3 style="font-size:19px;margin:14px 0 8px;">Pipeline Conversion</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Soft-CTA conversion loops route high-intent subscribers straight onto your calendar.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span class="${p}-badge">MindLoop Onboarding</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-badge" style="cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:26px;margin-bottom:10px;">Book Your 20-Minute Voice Audit</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:22px;">
        We'll analyze your current AI search visibility and draft your first sample newsletter issue free of charge.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-white" style="width:100%;padding:13px;">Confirm Strategy Session</button>
    </div>
  </div>
  <script>
    (function(){
      var pEl = document.getElementById('mindloopWordReveal');
      if (pEl) {
        var words = pEl.innerText.split(/\\s+/);
        pEl.innerHTML = words.map(function(w){ return '<span class="${p}-mission-word">' + w + '</span>'; }).join(' ');
        var spans = pEl.querySelectorAll('.${p}-mission-word');
        window.addEventListener('scroll', function(){
          var rect = pEl.getBoundingClientRect();
          var vh = window.innerHeight || 800;
          var prog = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)));
          var litCount = Math.floor(prog * spans.length);
          spans.forEach(function(s, idx){ s.classList.toggle('is-lit', idx <= litCount); });
        }, { passive: true });
      }
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 14. CODENEST CODING PLATFORM (#070b0a Forest Dark + #5ed29c Emerald + 3 Vertical Grid Lines at 25/50/75% + Floating 200x200 Glass Card)
  if (spec.slug === 'codenest-coding-platform') {
    const cnVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1de2b27-process-f325-44c7-a636-0f63b7d31f2e.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>CODENEST — Launch Your Coding Career</title>
  <meta name="description" content="Master modern software engineering through real-world projects, live code reviews, and direct mentorship from engineers at top tech companies.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #070b0a;
      --emerald: #5ed29c;
      --fg: #ffffff;
      --muted: rgba(255,255,255,0.72);
      --line: rgba(255,255,255,0.07);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }

    /* Signature 3 Vertical Structural Grid Lines at 25%, 50%, 75% */
    .${p}-grid-lines { position: fixed; inset: 0; pointer-events: none; z-index: 5; }
    .${p}-vline { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--line); }
    .${p}-vline.l25 { left: 25%; }
    .${p}-vline.l50 { left: 50%; }
    .${p}-vline.l75 { left: 75%; }

    .${p}-hero {
      position: relative; min-height: 100vh; width: 100%; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 28px clamp(20px, 4vw, 56px) 52px; isolation: isolate;
    }
    .${p}-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; opacity: 0.58;
    }
    .${p}-overlay {
      position: absolute; inset: 0; z-index: -1;
      background: linear-gradient(180deg, rgba(7,11,10,0.4) 0%, rgba(7,11,10,0.55) 55%, rgba(7,11,10,0.94) 100%);
    }

    .${p}-nav {
      position: relative; z-index: 20; display: flex; justify-content: space-between; align-items: flex-start;
    }
    .${p}-logo { font-size: 20px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; }
    .${p}-nav-links {
      display: flex; flex-direction: column; gap: 6px;
    }
    @media (min-width: 1024px) {
      .${p}-nav-links { position: absolute; left: 75%; transform: translateX(-50%); }
    }
    .${p}-nav-links a { color: rgba(255,255,255,0.82); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
    .${p}-nav-links a:hover { color: var(--emerald); }

    /* Floating 200x200px Liquid Glass Card at 75% Grid Line */
    .${p}-glass-square {
      width: 200px; height: 200px; border-radius: 18px; padding: 18px;
      background: rgba(255,255,255,0.06); backdrop-filter: blur(22px);
      border: 1px solid rgba(255,255,255,0.16);
      display: flex; flex-direction: column; justify-content: space-between;
      margin: 36px auto; position: relative; z-index: 15;
    }
    @media (min-width: 1024px) {
      .${p}-glass-square { margin: 0; position: absolute; top: 30%; left: 75%; transform: translateX(-50%); }
    }
    .${p}-play-circle {
      width: 44px; height: 44px; border-radius: 50%; background: rgba(94,210,156,0.18);
      border: 1px solid var(--emerald); display: flex; align-items: center; justify-content: center;
      margin: 0 auto; cursor: pointer; transition: transform 0.25s;
    }
    .${p}-play-circle:hover { transform: scale(1.1); }

    .${p}-bottom-grid {
      position: relative; z-index: 15; display: grid; grid-template-columns: 1fr; gap: 28px; align-items: flex-end;
      margin-top: auto;
    }
    @media (min-width: 1024px) {
      .${p}-bottom-grid { grid-template-columns: 72fr 28fr; }
    }
    .${p}-h1 {
      font-size: clamp(2.6rem, 6.2vw, 6.4rem); font-weight: 800; text-transform: uppercase;
      line-height: 0.96; letter-spacing: -0.03em;
    }
    .${p}-cta-emerald {
      display: inline-flex; align-items: center; gap: 14px; padding: 8px 8px 8px 24px;
      border-radius: 999px; background: var(--emerald); color: #070b0a;
      font-size: 15px; font-weight: 700; border: none; cursor: pointer; margin-top: 22px;
    }
    .${p}-cta-circle {
      width: 38px; height: 38px; border-radius: 50%; background: #070b0a; color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
    }

    .${p}-tracks { position: relative; z-index: 15; max-width: 1360px; margin: 0 auto; padding: 88px clamp(20px,4vw,56px); }
    .${p}-track-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; margin-top: 36px; }
    .${p}-track-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px; padding: 28px; backdrop-filter: blur(14px);
    }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(7,11,10,0.88); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 580px; width: 100%; border-radius: 24px; background: #0d1512; border: 1px solid rgba(94,210,156,0.3); padding: 32px; }
  </style>
</head>
<body>
  <div class="${p}-grid-lines" aria-hidden="true">
    <div class="${p}-vline l25"></div>
    <div class="${p}-vline l50"></div>
    <div class="${p}-vline l75"></div>
  </div>

  <main>
    <section class="${p}-hero">
      <video id="heroBgVideo" class="${p}-video" src="${cnVideo}" autoplay loop muted playsinline preload="auto"></video>
      <div class="${p}-overlay"></div>

      <header class="${p}-nav">
        <div class="${p}-logo">CODENEST</div>
        <nav class="${p}-nav-links" aria-label="Primary Navigation">
          <a href="#engineeringTracks">Courses</a>
          <a href="#engineeringTracks">Mentors</a>
          <a href="#engineeringTracks">Pricing</a>
          <a href="#engineeringTracks" data-seamless-trigger="Sign In to CodeNest IDE">Sign In</a>
        </nav>
        <button type="button" id="motionToggleBtn" style="padding:7px 14px;border-radius:999px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);color:#fff;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
      </header>

      <!-- Floating 200x200px Liquid Glass Card at 75% Grid Line -->
      <aside class="${p}-glass-square" data-tilt-card>
        <span style="font-size:12px;color:rgba(255,255,255,0.65);font-family:monospace;">[ 2025 ]</span>
        <button type="button" class="${p}-play-circle" data-seamless-trigger="Watch Cohort Live Code Review Demo" aria-label="Play Demo Video">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#5ed29c"><polygon points="6,4 20,12 6,20"/></svg>
        </button>
        <p style="font-size:13px;font-weight:600;line-height:1.35;text-align:center;">Taught by Industry Professionals</p>
      </aside>

      <!-- Bottom-Anchored Hero Content -->
      <div class="${p}-bottom-grid">
        <div data-parallax="0.05">
          <h1 class="${p}-h1">LAUNCH YOUR<br>CODING CAREER.</h1>
        </div>
        <div>
          <p style="font-size:15px;color:var(--muted);line-height:1.65;">
            Master modern software engineering through real-world projects, live code reviews, and direct mentorship from engineers at top tech companies.
          </p>
          <button type="button" id="exploreMagneticBtn" class="${p}-cta-emerald" data-magnetic>
            <span>Explore Courses</span>
            <span class="${p}-cta-circle">↗</span>
          </button>
        </div>
      </div>
    </section>

    <section id="engineeringTracks" class="${p}-tracks">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-size:12px;color:var(--emerald);letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">Production Engineering Tracks</span>
          <h2 style="font-size:clamp(28px,3.6vw,44px);font-weight:800;margin-top:8px;">Ship Real Systems. Get Hired.</h2>
        </div>
        <div style="display:flex;gap:28px;">
          <div><strong style="font-size:28px;color:var(--emerald);" data-counter-target="94" data-counter-suffix="%">94%</strong><span style="display:block;font-size:12px;color:var(--muted);">Placement Rate</span></div>
          <div><strong style="font-size:28px;color:var(--emerald);" data-counter-target="148" data-counter-suffix="K">$148K</strong><span style="display:block;font-size:12px;color:var(--muted);">Avg Base Offer</span></div>
        </div>
      </div>

      <div class="${p}-track-grid">
        <article class="${p}-track-card ${p}-reveal" data-tilt-card>
          <span style="font-size:12px;color:var(--emerald);font-family:monospace;">[ TRACK 01 • 16 WEEKS ]</span>
          <h3 style="font-size:22px;margin:12px 0 8px;">Distributed Cloud &amp; Go</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Build high-throughput Raft consensus clusters, eBPF observability agents, and multi-region Kubernetes engines.</p>
        </article>
        <article class="${p}-track-card ${p}-reveal" data-tilt-card>
          <span style="font-size:12px;color:var(--emerald);font-family:monospace;">[ TRACK 02 • 14 WEEKS ]</span>
          <h3 style="font-size:22px;margin:12px 0 8px;">AI Systems &amp; CUDA Kernels</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Architect low-latency LLM inference servers, vector retrieval pipelines, and multi-agent production harnesses.</p>
        </article>
        <article class="${p}-track-card ${p}-reveal" data-tilt-card>
          <span style="font-size:12px;color:var(--emerald);font-family:monospace;">[ TRACK 03 • 12 WEEKS ]</span>
          <h3 style="font-size:22px;margin:12px 0 8px;">Full-Stack TypeScript &amp; Edge</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Ship real-time collaborative canvases, WebGL interfaces, and zero-downtime Postgres replication.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="font-size:12px;color:var(--emerald);font-family:monospace;">[ CODENEST SYLLABUS 2025 ]</span>
        <button type="button" id="closeSeamlessBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 12px;border-radius:999px;cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:26px;margin-bottom:10px;">Explore Cohort Curriculum</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:22px;">
        Every module is reviewed line-by-line by Senior Staff Engineers from Stripe, Vercel, and Linear.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-cta-emerald" style="width:100%;justify-content:center;margin-top:0;">
        <span>Download Full Syllabus PDF</span>
      </button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 15. POWER AI (Deep Indigo Void hsl(260,87%,3%) + Gradient "AI" Headline + Flipped Video + Liquid Glass Marquee)
  if (spec.slug === 'power-ai') {
    const paiVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Power AI — Next-Gen Talent Intelligence</title>
  <meta name="description" content="The most powerful AI ever deployed in talent acquisition. Autonomous sourcing, neural skill graphs, and predictive hiring.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: hsl(260, 87%, 3%);
      --indigo: #6366f1;
      --purple: #a855f7;
      --amber: #fcd34d;
      --fg: #ffffff;
      --muted: rgba(255,255,255,0.7);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }

    .${p}-liquid-glass {
      background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
      backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12);
    }
    .${p}-nav {
      position: fixed; top: 20px; left: 16px; right: 16px; z-index: 200;
      max-width: 780px; margin: 0 auto; padding: 10px 18px; border-radius: 999px;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
    }
    .${p}-btn-indigo {
      padding: 10px 22px; border-radius: 999px; background: var(--indigo); color: #fff;
      font-size: 13px; font-weight: 700; border: none; cursor: pointer;
      box-shadow: 0 0 24px rgba(99,102,241,0.45); transition: transform 0.2s, background 0.2s;
    }
    .${p}-btn-indigo:hover { background: #818cf8; transform: translateY(-1px); }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 132px 20px 44px;
      display: flex; flex-direction: column; align-items: center; justify-content: space-between;
      text-align: center; overflow: hidden; isolation: isolate;
    }
    .${p}-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      transform: scaleY(-1); z-index: -2; opacity: 0.62;
    }
    .${p}-vignette {
      position: absolute; inset: 0; z-index: -1;
      background: radial-gradient(ellipse at center, rgba(5,1,14,0.25) 0%, rgba(5,1,14,0.88) 78%, hsl(260,87%,3%) 100%);
    }
    .${p}-h1 {
      font-size: clamp(3.5rem, 9vw, 7.2rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1;
      margin: 22px 0 16px;
    }
    .${p}-ai-grad {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #fcd34d 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .${p}-marquee-wrap {
      width: 100%; max-width: 960px; overflow: hidden; margin-top: 36px;
      mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
    }
    .${p}-marquee-track {
      display: flex; gap: 14px; width: max-content; animation: ${p}Scroll 25s linear infinite;
    }
    @keyframes ${p}Scroll { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }

    .${p}-section { max-width: 1200px; margin: 0 auto; padding: 88px 20px; }
    .${p}-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; margin-top: 36px; }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(5,1,14,0.88); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 560px; width: 100%; border-radius: 24px; padding: 32px; }
  </style>
</head>
<body>
  <header class="${p}-nav ${p}-liquid-glass">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="color:#818cf8;font-size:18px;">✦</span>
      <strong style="font-size:15px;letter-spacing:-0.02em;">Power AI</strong>
    </div>
    <nav style="display:flex;gap:20px;" aria-label="Main Navigation">
      <a href="#talentEngine" style="color:var(--muted);text-decoration:none;font-size:13px;">Features</a>
      <a href="#talentEngine" style="color:var(--muted);text-decoration:none;font-size:13px;">Solutions</a>
      <a href="#talentEngine" style="color:var(--muted);text-decoration:none;font-size:13px;">Pricing</a>
      <a href="#talentEngine" style="color:var(--muted);text-decoration:none;font-size:13px;">Docs</a>
    </nav>
    <div style="display:flex;gap:8px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-liquid-glass" style="padding:7px 12px;border-radius:999px;color:#fff;font-size:11px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
      <button type="button" class="${p}-btn-indigo" data-seamless-trigger="Get Started with Power AI">Get Started</button>
    </div>
  </header>

  <main>
    <section class="${p}-hero">
      <video id="heroBgVideo" class="${p}-video" src="${paiVideo}" autoplay loop muted playsinline preload="auto"></video>
      <div class="${p}-vignette"></div>

      <div style="max-width:820px;margin:auto 0;" data-parallax="0.06">
        <div class="${p}-liquid-glass" style="display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:999px;font-size:12px;color:rgba(255,255,255,0.85);">
          <span style="width:8px;height:8px;border-radius:50%;background:#818cf8;box-shadow:0 0 10px #818cf8;"></span>
          <span>Next-Gen Talent Intelligence</span>
        </div>

        <h1 class="${p}-h1">Power <span class="${p}-ai-grad">AI</span></h1>
        <p style="font-size:clamp(17px,2.2vw,22px);color:var(--muted);max-width:600px;margin:0 auto 30px;line-height:1.5;">
          The most powerful AI ever deployed in talent acquisition
        </p>

        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <button type="button" id="exploreMagneticBtn" class="${p}-btn-indigo" style="padding:14px 28px;font-size:14px;" data-magnetic>
            Schedule a Consult →
          </button>
          <button type="button" class="${p}-liquid-glass" style="padding:14px 26px;border-radius:999px;color:#fff;font-size:14px;font-weight:600;cursor:pointer;" data-seamless-trigger="Power AI Live Neural Sourcing Demo">
            ▶ Watch Demo
          </button>
        </div>
      </div>

      <div style="width:100%;display:flex;flex-direction:column;align-items:center;">
        <span style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.4);">Trusted by industry leaders</span>
        <div class="${p}-marquee-wrap">
          <div class="${p}-marquee-track">
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Vortex</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Nimbus</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Prysma</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Cirrus</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Kynder</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Halcyn</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Vortex</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Nimbus</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Prysma</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Cirrus</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Kynder</span>
            <span class="${p}-liquid-glass" style="padding:8px 22px;border-radius:999px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.65);">Halcyn</span>
          </div>
        </div>
      </div>
    </section>

    <section id="talentEngine" class="${p}-section">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-size:12px;color:#818cf8;text-transform:uppercase;letter-spacing:0.14em;font-weight:700;">Neural Recruiting Engine</span>
          <h2 style="font-size:clamp(28px,3.6vw,44px);font-weight:700;margin-top:8px;">Autonomous Talent Precision</h2>
        </div>
        <div style="display:flex;gap:28px;">
          <div><strong style="font-size:28px;color:#fcd34d;" data-counter-target="14" data-counter-suffix="x">14x</strong><span style="display:block;font-size:12px;color:var(--muted);">Faster Shortlisting</span></div>
          <div><strong style="font-size:28px;color:#a855f7;" data-counter-target="96" data-counter-suffix="%">96%</strong><span style="display:block;font-size:12px;color:var(--muted);">12-Month Retention</span></div>
        </div>
      </div>

      <div class="${p}-grid">
        <article class="${p}-liquid-glass ${p}-reveal" style="padding:28px;border-radius:22px;" data-tilt-card>
          <span style="font-size:12px;color:#818cf8;font-weight:700;">01 / DEEP GRAPH SOURCING</span>
          <h3 style="font-size:20px;margin:12px 0 8px;">240M+ Verified Builder Profiles</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Evaluates open-source commits, architectural patents, and production impact beyond static resumes.</p>
        </article>
        <article class="${p}-liquid-glass ${p}-reveal" style="padding:28px;border-radius:22px;" data-tilt-card>
          <span style="font-size:12px;color:#a855f7;font-weight:700;">02 / AUTONOMOUS OUTREACH</span>
          <h3 style="font-size:20px;margin:12px 0 8px;">Hyper-Contextual Calibration</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Crafts technical outreach referencing each candidate's actual repositories, achieving 64% reply rates.</p>
        </article>
        <article class="${p}-liquid-glass ${p}-reveal" style="padding:28px;border-radius:22px;" data-tilt-card>
          <span style="font-size:12px;color:#fcd34d;font-weight:700;">03 / PREDICTIVE FIT</span>
          <h3 style="font-size:20px;margin:12px 0 8px;">Team Velocity Simulation</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Models how prospective hires complement your engineering org's existing skill topology.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box ${p}-liquid-glass">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="font-size:12px;color:#818cf8;font-weight:700;">Power AI Enterprise</span>
        <button type="button" id="closeSeamlessBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 12px;border-radius:999px;cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:26px;margin-bottom:10px;">Schedule Your Talent Intelligence Consult</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:22px;">
        Deploy custom sourcing agents calibrated to your open engineering and executive roles in under 15 minutes.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-indigo" style="width:100%;padding:13px;">Launch Live Workspace</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 16. BLOOM AI (Two-Panel Split [52% / 48%] Monochrome Liquid Glass + "Innovating the spirit of bloom AI" + "Advanced Plant Sculpting")
  if (spec.slug === 'bloom-ai') {
    const bloomVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>bloom — Innovating the Spirit of Bloom AI</title>
  <meta name="description" content="Explore the algorithmic synthesis of organic forms through neural networks, bridging natural morphology and digital precision.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@1,8..60,400;1,8..60,600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #080808;
      --fg: #ffffff;
      --muted: rgba(255,255,255,0.68);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Poppins', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .serif-em { font-family: 'Source Serif 4', serif; font-style: italic; font-weight: 400; }

    .${p}-liquid {
      background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
      backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
      border: 1px solid rgba(255,255,255,0.18);
      box-shadow: 0 16px 40px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.22);
    }
    .${p}-pill {
      display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
      border-radius: 999px; color: #fff; font-size: 12px; font-weight: 500;
      text-decoration: none; cursor: pointer;
    }

    .${p}-stage {
      position: relative; min-height: 100vh; width: 100%; overflow: hidden;
      display: grid; grid-template-columns: 1fr; gap: 20px; padding: 18px; isolation: isolate;
    }
    @media (min-width: 1024px) {
      .${p}-stage { grid-template-columns: 52fr 48fr; min-height: 100vh; padding: 24px; }
    }
    .${p}-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      filter: saturate(0) contrast(1.08); z-index: -2; opacity: 0.58;
    }
    .${p}-overlay {
      position: absolute; inset: 0; z-index: -1; background: rgba(0,0,0,0.38);
    }

    .${p}-left-panel {
      border-radius: 28px; padding: clamp(24px, 3.5vw, 44px);
      display: flex; flex-direction: column; justify-content: space-between; gap: 36px;
    }
    .${p}-right-panel {
      display: flex; flex-direction: column; justify-content: space-between; gap: 16px;
    }
    .${p}-feature-strip {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
      padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.16);
    }
    .${p}-avatar {
      width: 42px; height: 42px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.5);
      margin-left: -12px; background: rgba(255,255,255,0.16); display: inline-flex;
      align-items: center; justify-content: center; font-size: 11px; font-weight: 600;
    }
    .${p}-avatar:first-child { margin-left: 0; }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(0,0,0,0.86); backdrop-filter: blur(22px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 560px; width: 100%; border-radius: 28px; padding: 32px; }
  </style>
</head>
<body>
  <main>
    <section class="${p}-stage">
      <video id="heroBgVideo" class="${p}-video" src="${bloomVideo}" autoplay loop muted playsinline preload="auto"></video>
      <div class="${p}-overlay"></div>

      <!-- LEFT PANEL (52%) -->
      <div class="${p}-left-panel ${p}-liquid" data-tilt-card>
        <header style="display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:20px;">✿</span>
            <strong style="font-size:22px;font-weight:600;letter-spacing:-0.03em;">bloom</strong>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <button type="button" id="motionToggleBtn" class="${p}-pill ${p}-liquid" aria-pressed="false">Motion: ON</button>
            <button type="button" id="exploreMagneticBtn" class="${p}-pill ${p}-liquid" data-magnetic>
              <span>Get started</span>
              <span style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.18);display:inline-flex;align-items:center;justify-content:center;">↗</span>
            </button>
          </div>
        </header>

        <div style="my:auto;" data-parallax="0.05">
          <p class="serif-em" style="font-size:17px;color:rgba(255,255,255,0.82);">“A design isn't finished until someone is using it.”</p>
          <span style="display:block;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin:6px 0 22px;">MARCUS AURELIO</span>
          <h1 style="font-size:clamp(34px,4.2vw,60px);font-weight:500;line-height:1.08;letter-spacing:-0.03em;">
            Innovating the <span class="serif-em">spirit</span> of <span class="serif-em">bloom</span> AI
          </h1>
        </div>

        <div class="${p}-feature-strip">
          <div>
            <span style="font-size:11px;color:rgba(255,255,255,0.5);">01</span>
            <h2 style="font-size:14px;font-weight:600;margin-top:4px;">Raw Generation</h2>
            <p style="font-size:12px;color:var(--muted);margin-top:2px;">Algorithmic botanical seeds</p>
          </div>
          <div style="border-left:1px solid rgba(255,255,255,0.14);padding-left:14px;">
            <span style="font-size:11px;color:rgba(255,255,255,0.5);">02</span>
            <h2 style="font-size:14px;font-weight:600;margin-top:4px;">Contextual Twist</h2>
            <p style="font-size:12px;color:var(--muted);margin-top:2px;">Morphological refraction</p>
          </div>
          <div style="border-left:1px solid rgba(255,255,255,0.14);padding-left:14px;">
            <span style="font-size:11px;color:rgba(255,255,255,0.5);">03</span>
            <h2 style="font-size:14px;font-weight:600;margin-top:4px;">Natural Adaptation</h2>
            <p style="font-size:12px;color:var(--muted);margin-top:2px;">Cellular surface shaders</p>
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL (48%) -->
      <div class="${p}-right-panel">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
          <div class="${p}-pill ${p}-liquid">
            <span>@bloom_design</span>
            <span style="padding:4px 10px;border-radius:999px;background:#fff;color:#000;font-weight:600;font-size:11px;">Follow Us</span>
          </div>
          <div class="${p}-pill ${p}-liquid" style="cursor:pointer;" data-seamless-trigger="Enter the Bloom AI Botanical Ecosystem">
            <span>Enter our ecosystem</span>
            <span>→</span>
          </div>
        </div>

        <!-- Processing Pill -->
        <div class="${p}-liquid" style="padding:14px 20px;border-radius:999px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:14px;">✦</span>
            <span style="font-size:13px;font-weight:500;">Processing Neural Flora</span>
          </div>
          <span style="font-size:12px;color:var(--muted);"><strong style="color:#fff;" data-counter-target="2650" data-counter-suffix="">2650</strong> / 3000 • 75%</span>
        </div>

        <!-- Main Feature Card: Growth Archive / Advanced Plant Sculpting -->
        <article class="${p}-liquid" style="border-radius:28px;padding:28px;flex:1;display:flex;flex-direction:column;justify-content:space-between;" data-tilt-card>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="${p}-pill ${p}-liquid">✦ Growth Archive</span>
            <span style="font-size:12px;color:var(--muted);">VOL. 04</span>
          </div>

          <div style="margin:24px 0;">
            <h2 style="font-size:26px;font-weight:500;letter-spacing:-0.02em;margin-bottom:10px;">Advanced Plant Sculpting</h2>
            <p style="font-size:14px;color:var(--muted);line-height:1.65;">
              Explore the algorithmic synthesis of organic forms through neural networks, bridging natural morphology and digital precision.
            </p>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid rgba(255,255,255,0.14);">
            <div style="display:flex;align-items:center;">
              <span class="${p}-avatar">❀</span>
              <span class="${p}-avatar">❁</span>
              <span class="${p}-avatar">❃</span>
            </div>
            <button type="button" class="${p}-pill ${p}-liquid" data-seamless-trigger="Advanced Plant Sculpting — Research Paper">
              Read more ↗
            </button>
          </div>
        </article>

        <!-- Bottom Bar -->
        <div class="${p}-liquid" style="padding:14px 20px;border-radius:999px;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;color:var(--muted);">Morphology Synthesis</span>
          <div style="flex:1;max-width:220px;height:6px;background:rgba(255,255,255,0.14);border-radius:99px;margin:0 14px;overflow:hidden;">
            <div style="width:88%;height:100%;background:#fff;border-radius:99px;"></div>
          </div>
          <span style="font-size:12px;font-weight:600;">Sculpting • 88%</span>
        </div>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box ${p}-liquid">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span class="${p}-pill ${p}-liquid">✿ Bloom AI Lab</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill ${p}-liquid">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">Advanced Plant Sculpting</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Interactive monochrome botanical synthesis powered by cellular automata and real-time surface displacement.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-pill ${p}-liquid" style="width:100%;justify-content:center;padding:12px;background:#fff;color:#000;font-weight:600;">
        Launch Generative Studio
      </button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 17. LUMINEX (Full-Screen Video Background + Glassmorphic Header + Bottom-Left Positioned Editorial Hero Content)
  if (spec.slug === 'luminex') {
    const lumVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>LUMINEX — Spatial Photonics &amp; Architectural Light</title>
  <meta name="description" content="Modern architectural photonics platform with full-screen cinematic video background, glassmorphic navigation header, and bottom-left anchored hero showcase.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #050608;
      --fg: #ffffff;
      --muted: rgba(255,255,255,0.7);
      --accent: #38bdf8;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .serif-italic { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; }

    .${p}-glass {
      background: rgba(12, 16, 24, 0.58);
      backdrop-filter: blur(20px) saturate(160%);
      -webkit-backdrop-filter: blur(20px) saturate(160%);
      border: 1px solid rgba(255,255,255,0.14);
    }
    .${p}-nav {
      position: fixed; top: 20px; left: 24px; right: 24px; z-index: 200;
      max-width: 1360px; margin: 0 auto; padding: 14px 28px; border-radius: 999px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-hero {
      position: relative; min-height: 100vh; width: 100%; overflow: hidden;
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 120px clamp(24px, 5vw, 72px) clamp(44px, 6vh, 72px); isolation: isolate;
    }
    .${p}-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; opacity: 0.78;
    }
    .${p}-grad {
      position: absolute; inset: 0; z-index: -1;
      background: linear-gradient(180deg, rgba(5,6,8,0.25) 0%, rgba(5,6,8,0.4) 50%, rgba(5,6,8,0.92) 100%);
    }
    .${p}-bottom-wrap {
      max-width: 1360px; width: 100%; margin: 0 auto;
      display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 32px;
    }
    .${p}-bottom-left { max-width: 720px; }
    .${p}-h1 {
      font-size: clamp(44px, 6.4vw, 88px); font-weight: 600; line-height: 0.98; letter-spacing: -0.03em;
      margin: 16px 0 18px;
    }
    .${p}-btn-primary {
      display: inline-flex; align-items: center; gap: 10px; padding: 13px 26px;
      border-radius: 999px; background: #ffffff; color: #050608;
      font-size: 14px; font-weight: 700; border: none; cursor: pointer;
    }
    .${p}-section { max-width: 1360px; margin: 0 auto; padding: 88px clamp(24px,5vw,72px); }
    .${p}-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; margin-top: 36px; }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s, transform 0.6s; }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(5,6,8,0.88); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 560px; width: 100%; border-radius: 24px; padding: 32px; }
  </style>
</head>
<body>
  <header class="${p}-nav ${p}-glass">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 12px var(--accent);"></span>
      <strong style="font-size:16px;letter-spacing:0.14em;">LUMINEX</strong>
    </div>
    <nav style="display:flex;gap:28px;" aria-label="Main Navigation">
      <a href="#installations" style="color:var(--muted);text-decoration:none;font-size:13px;">Architecture</a>
      <a href="#installations" style="color:var(--muted);text-decoration:none;font-size:13px;">Optical Systems</a>
      <a href="#installations" style="color:var(--muted);text-decoration:none;font-size:13px;">Installations</a>
      <a href="#installations" style="color:var(--muted);text-decoration:none;font-size:13px;">Studio</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-glass" style="padding:8px 14px;border-radius:999px;color:#fff;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
      <button type="button" class="${p}-btn-primary" style="padding:9px 20px;font-size:12px;" data-seamless-trigger="Request Luminex Optical Specification">Request Spec ↗</button>
    </div>
  </header>

  <main>
    <section class="${p}-hero">
      <video id="heroBgVideo" class="${p}-video" src="${lumVideo}" autoplay loop muted playsinline preload="auto"></video>
      <div class="${p}-grad"></div>

      <div class="${p}-bottom-wrap">
        <!-- Bottom-Left Positioned Hero Content -->
        <div class="${p}-bottom-left" data-parallax="0.05">
          <span class="${p}-glass" style="display:inline-block;padding:6px 14px;border-radius:999px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);">
            VOL. 09 — ARCHITECTURAL PHOTONICS
          </span>
          <h1 class="${p}-h1">
            Sculpting <span class="serif-italic">Living Light</span> in Spatial Form
          </h1>
          <p style="font-size:16px;color:var(--muted);max-width:540px;line-height:1.65;margin-bottom:26px;">
            Precision kinetic luminaires and real-time HLS projection fields engineered for landmark museums, aviation terminals, and flagship pavilions.
          </p>
          <div style="display:flex;gap:14px;flex-wrap:wrap;">
            <button type="button" id="exploreMagneticBtn" class="${p}-btn-primary" data-magnetic>
              Explore Installations ↗
            </button>
            <button type="button" class="${p}-glass" style="padding:13px 24px;border-radius:999px;color:#fff;font-size:14px;font-weight:600;cursor:pointer;" data-seamless-trigger="Luminex Spectral Showreel 2026">
              ▶ Watch Showreel
            </button>
          </div>
        </div>

        <!-- Bottom-Right Glass Telemetry Card -->
        <aside class="${p}-glass" style="padding:22px 26px;border-radius:22px;display:flex;gap:28px;" data-tilt-card>
          <div>
            <strong style="font-size:26px;display:block;" data-counter-target="99" data-counter-suffix=".4%">99.4%</strong>
            <span style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;">CRI Spectral Fidelity</span>
          </div>
          <div style="border-left:1px solid rgba(255,255,255,0.14);padding-left:24px;">
            <strong style="font-size:26px;display:block;color:var(--accent);" data-counter-target="140" data-counter-suffix="+">140+</strong>
            <span style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;">Global Commissions</span>
          </div>
        </aside>
      </div>
    </section>

    <section id="installations" class="${p}-section">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-size:12px;color:var(--accent);text-transform:uppercase;letter-spacing:0.14em;">Selected Commissions</span>
          <h2 style="font-size:clamp(28px,3.6vw,44px);font-weight:600;margin-top:6px;">Kinetic Light Installations</h2>
        </div>
      </div>
      <div class="${p}-grid">
        <article class="${p}-glass ${p}-reveal" style="padding:28px;border-radius:22px;" data-tilt-card>
          <span style="font-size:11px;color:var(--accent);letter-spacing:0.1em;">01 / ZURICH KUNSTHALLE</span>
          <h3 style="font-size:21px;margin:10px 0 8px;">Helios Refraction Canopy</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">4,800 motorizeddichroic prisms synchronized to solar telemetry and visitor movement.</p>
        </article>
        <article class="${p}-glass ${p}-reveal" style="padding:28px;border-radius:22px;" data-tilt-card>
          <span style="font-size:11px;color:var(--accent);letter-spacing:0.1em;">02 / TOKYO GINZA ATRIUM</span>
          <h3 style="font-size:21px;margin:10px 0 8px;">Monolith Pulse Façade</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">12-story micro-LED acoustic membrane reacting in real time to urban wind harmonics.</p>
        </article>
        <article class="${p}-glass ${p}-reveal" style="padding:28px;border-radius:22px;" data-tilt-card>
          <span style="font-size:11px;color:var(--accent);letter-spacing:0.1em;">03 / REYKJAVIK PAVILION</span>
          <h3 style="font-size:21px;margin:10px 0 8px;">Aurora Borealis Chamber</h3>
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">Volumetric laser-phosphor mist projection recreating geomagnetic solar storms indoors.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box ${p}-glass">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="font-size:12px;color:var(--accent);">LUMINEX ARCHITECTURAL DESK</span>
        <button type="button" id="closeSeamlessBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 12px;border-radius:999px;cursor:pointer;">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">Request Luminex Optical Specification</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;">
        Download IES photometric files, CAD/BIM families, and DMX/Art-Net control schematics.
      </p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-primary" style="width:100%;justify-content:center;">Download Architectural Pack</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 18. USD HALO (#F5F5F5 Fintech Stablecoin Platform + Interlocking Halo SVG Logo + Rounded-2XL Video Hero + Dual Marquees + #2B2644 Bento Cards + Commerce Video Section)
  if (spec.slug === 'usd-halo') {
    const haloVid1 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4';
    const haloVid2 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Halo / USD Halo — Your Wealth Works</title>
  <meta name="description" content="An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #F5F5F5;
      --fg: #0a0a0a;
      --muted: rgba(0,0,0,0.65);
      --plum: #2B2644;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; overflow-x: clip; scroll-behavior: smooth; }

    .${p}-top-frame { min-height: 100vh; display: flex; flex-direction: column; padding: 0 24px 24px; max-width: 1408px; margin: 0 auto; position: relative; }
    .${p}-nav {
      display: flex; align-items: center; justify-content: space-between; padding: 20px 0; z-index: 20;
    }
    .${p}-btn-black {
      display: inline-flex; align-items: center; gap: 12px; background: #000; color: #fff;
      font-size: 15px; font-weight: 500; padding: 10px 26px; border-radius: 999px; border: none; cursor: pointer;
      transition: background 0.2s;
    }
    .${p}-btn-black:hover { background: #262626; }
    .${p}-btn-join {
      display: inline-flex; align-items: center; gap: 12px; background: #000; color: #fff;
      font-size: 16px; font-weight: 500; padding: 8px 8px 8px 28px; border-radius: 999px; border: none; cursor: pointer;
    }
    .${p}-arrow-circle {
      width: 36px; height: 36px; border-radius: 50%; background: #fff; color: #000;
      display: inline-flex; align-items: center; justify-content: center; font-weight: 700;
    }

    .${p}-hero-card {
      position: relative; flex: 1; min-height: calc(100vh - 96px); border-radius: 24px;
      overflow: hidden; display: flex; flex-direction: column; justify-content: flex-start;
      padding: clamp(32px, 5vw, 56px); padding-top: clamp(72px, 11vh, 136px); isolation: isolate;
      background: #e2e8f0;
    }
    .${p}-hero-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;
    }
    .${p}-h1 {
      font-size: clamp(44px, 5.5vw, 64px); font-weight: 600; line-height: 1.06; letter-spacing: -0.04em;
      max-width: 520px; margin-bottom: 16px; color: #000;
    }
    .${p}-marquee-wrap {
      margin-top: auto; padding-top: 48px; width: 100%; max-width: 460px; overflow: hidden;
      mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
    }
    .${p}-marquee-track { display: flex; width: max-content; animation: ${p}Marquee 22s linear infinite; }
    @keyframes ${p}Marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }

    .${p}-sec { max-width: 1408px; margin: 0 auto; padding: 88px 24px; }
    .${p}-bento-4 {
      display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 48px;
    }
    @media (min-width: 1024px) {
      .${p}-bento-4 { grid-template-columns: 2fr 1fr 1fr; }
    }
    .${p}-card-bloom {
      min-height: 320px; border-radius: 20px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;
      background: radial-gradient(circle at 75% 30%, #c7d2fe 0%, #e0e7ff 45%, #dbeafe 100%);
      border: 1px solid rgba(0,0,0,0.06);
    }
    .${p}-card-plum {
      min-height: 320px; border-radius: 20px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;
      background: var(--plum); color: #ffffff;
    }
    .${p}-use-grid {
      display: grid; grid-template-columns: 1fr; gap: 32px; align-items: start;
    }
    @media (min-width: 980px) {
      .${p}-use-grid { grid-template-columns: 1fr 1.15fr; }
    }
    .${p}-commerce-card {
      position: relative; min-height: 540px; border-radius: 28px; overflow: hidden;
      padding: 44px; display: flex; flex-direction: column; justify-content: flex-start; isolation: isolate;
      background: #cbd5e1;
    }
    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(0,0,0,0.65); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 520px; width: 100%; border-radius: 24px; background: #fff; padding: 32px; color: #000; }
  </style>
</head>
<body>
  <div class="${p}-top-frame">
    <!-- 1. NAVBAR -->
    <header class="${p}-nav">
      <div style="display:flex;align-items:center;gap:10px;">
        <svg width="28" height="28" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z"/>
        </svg>
        <strong style="font-size:24px;font-weight:600;letter-spacing:-0.03em;">Halo</strong>
      </div>
      <nav style="display:flex;gap:32px;" aria-label="Main Navigation">
        <a href="#meetHalo" style="color:#374151;text-decoration:none;font-size:15px;font-weight:500;">Network</a>
        <a href="#meetHalo" style="color:#374151;text-decoration:none;font-size:15px;font-weight:500;">Ecosystem</a>
        <a href="#useModes" style="color:#374151;text-decoration:none;font-size:15px;font-weight:500;">Rewards</a>
        <a href="#useModes" style="color:#374151;text-decoration:none;font-size:15px;font-weight:500;">Help</a>
        <a href="#useModes" style="color:#374151;text-decoration:none;font-size:15px;font-weight:500;">News</a>
      </nav>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" id="motionToggleBtn" style="padding:8px 14px;border-radius:999px;background:rgba(0,0,0,0.06);border:1px solid rgba(0,0,0,0.12);font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-black" data-magnetic>Open Wallet</button>
      </div>
    </header>

    <!-- 2. HERO SECTION -->
    <section class="${p}-hero-card">
      <video id="heroBgVideo" class="${p}-hero-video" src="${haloVid1}" autoplay muted loop playsinline preload="auto"></video>
      <div data-parallax="0.05">
        <h1 class="${p}-h1">Your Wealth<br>Works</h1>
        <p style="font-size:17px;color:rgba(0,0,0,0.72);max-width:420px;line-height:1.6;margin-bottom:28px;">
          An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi.
        </p>
        <button type="button" class="${p}-btn-join" data-seamless-trigger="Mint USD Halo — Native Yield Stablecoin" data-magnetic>
          <span>Join us</span>
          <span class="${p}-arrow-circle">→</span>
        </button>
      </div>

      <div class="${p}-marquee-wrap" aria-label="Ecosystem Partners">
        <div class="${p}-marquee-track">
          <span style="margin:0 24px;font-family:Georgia,serif;font-weight:700;font-size:15px;color:rgba(0,0,0,0.6);">Stripe</span>
          <span style="margin:0 24px;font-weight:900;letter-spacing:0.08em;font-size:13px;color:rgba(0,0,0,0.6);">COINBASE</span>
          <span style="margin:0 24px;font-style:italic;font-weight:600;font-size:15px;color:rgba(0,0,0,0.6);">Uniswap</span>
          <span style="margin:0 24px;font-family:monospace;font-weight:700;letter-spacing:0.12em;font-size:13px;color:rgba(0,0,0,0.6);">AAVE</span>
          <span style="margin:0 24px;font-family:Georgia,serif;font-size:16px;color:rgba(0,0,0,0.6);">Compound</span>
          <span style="margin:0 24px;font-weight:700;letter-spacing:0.04em;font-size:14px;color:rgba(0,0,0,0.6);">MakerDAO</span>
          <span style="margin:0 24px;font-weight:700;font-size:13px;color:rgba(0,0,0,0.6);">Chainlink</span>
          <span style="margin:0 24px;font-family:Georgia,serif;font-weight:700;font-size:15px;color:rgba(0,0,0,0.6);">Stripe</span>
          <span style="margin:0 24px;font-weight:900;letter-spacing:0.08em;font-size:13px;color:rgba(0,0,0,0.6);">COINBASE</span>
          <span style="margin:0 24px;font-style:italic;font-weight:600;font-size:15px;color:rgba(0,0,0,0.6);">Uniswap</span>
          <span style="margin:0 24px;font-family:monospace;font-weight:700;letter-spacing:0.12em;font-size:13px;color:rgba(0,0,0,0.6);">AAVE</span>
        </div>
      </div>
    </section>
  </div>

  <main>
    <!-- 3. INFO SECTION ("Meet USD Halo.") -->
    <section id="meetHalo" class="${p}-sec">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:36px;align-items:start;">
        <div>
          <h2 style="font-size:clamp(36px,4vw,52px);font-weight:600;letter-spacing:-0.03em;margin-bottom:24px;">Meet USD Halo.</h2>
          <button type="button" class="${p}-btn-join" data-seamless-trigger="Discover USD Halo Architecture">
            <span>Discover it</span>
            <span class="${p}-arrow-circle">→</span>
          </button>
        </div>
        <p style="font-size:clamp(22px,2.4vw,30px);color:rgba(0,0,0,0.72);line-height:1.45;">
          USD Halo is a reward-earning dollar coin that lets your savings grow while remaining tied to the U.S. dollar.
        </p>
      </div>

      <div class="${p}-bento-4">
        <article class="${p}-card-bloom" data-tilt-card>
          <h3 style="font-size:26px;font-weight:600;letter-spacing:-0.02em;">Savings that bloom</h3>
          <p style="font-size:16px;color:rgba(0,0,0,0.72);max-width:340px;line-height:1.55;">
            Gain steady returns as your dollar tokens are routed into top-performing DeFi strategies.
          </p>
        </article>
        <article class="${p}-card-plum" data-tilt-card>
          <h3 style="font-size:24px;font-weight:500;line-height:1.2;">Always fluid,<br>always pegged.</h3>
          <p style="font-size:15px;color:rgba(255,255,255,0.65);line-height:1.55;">
            Keep fully dollar-anchored with on-demand access to funds — no lockups or waits.
          </p>
        </article>
        <article class="${p}-card-plum" data-tilt-card>
          <h3 style="font-size:24px;font-weight:500;line-height:1.2;">Fully<br>automated</h3>
          <p style="font-size:15px;color:rgba(255,255,255,0.65);line-height:1.55;">
            Skip the task of tuning positions yourself. USD Halo runs in the background for you.
          </p>
        </article>
      </div>
    </section>

    <!-- 5. USE CASES SECTION -->
    <section id="useModes" class="${p}-sec" style="padding-top:0;">
      <div class="${p}-use-grid">
        <div>
          <span style="font-size:13px;color:rgba(0,0,0,0.6);display:block;margin-bottom:8px;">USD Halo in Practice</span>
          <h2 style="font-size:clamp(42px,5vw,64px);font-weight:600;letter-spacing:-0.04em;line-height:1;margin-bottom:22px;">Use modes</h2>
          <p style="font-size:16px;color:rgba(0,0,0,0.62);line-height:1.65;max-width:380px;">
            USD Halo powers a wide range of modes for builders, companies and treasuries wanting safe and rewarding stablecoin integrations plus more.
          </p>
        </div>
        <div class="${p}-commerce-card" data-tilt-card>
          <video class="${p}-hero-video" src="${haloVid2}" autoplay muted loop playsinline preload="auto"></video>
          <h3 style="font-size:clamp(34px,3.8vw,48px);font-weight:600;letter-spacing:-0.03em;margin-bottom:16px;color:#000;">Commerce</h3>
          <p style="font-size:16px;color:rgba(0,0,0,0.74);max-width:420px;line-height:1.6;margin-bottom:28px;">
            Lift customer retention by offering USD Halo, a trusted dollar-backed stablecoin with strong yields, letting your patrons earn with zero effort on your platform.
          </p>
          <div style="display:inline-flex;align-items:center;gap:12px;cursor:pointer;" data-seamless-trigger="USD Halo Commerce SDK">
            <span style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,0.85);display:inline-flex;align-items:center;justify-content:center;">→</span>
            <strong style="font-size:15px;">Know more</strong>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <strong style="font-size:14px;">USD Halo Treasury Gateway</strong>
        <button type="button" id="closeSeamlessBtn" style="padding:6px 12px;border-radius:999px;border:1px solid rgba(0,0,0,0.15);background:transparent;cursor:pointer;">Close</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:26px;margin-bottom:10px;">Connect Institutional Wallet</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:22px;">Mint USD Halo 1:1 with USDC/USD and begin earning automated DeFi treasury yield immediately.</p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-black" style="width:100%;justify-content:center;">Launch Halo Vault</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 19. TASKLY (High-Fidelity "Liquid Glass" Hero Section on Pure White + #60B1FF/#319AFF Glow Ellipses + Sticky Blur-50px Navbar + Electric Blue Glassy Orb)
  if (spec.slug === 'taskly') {
    const tasklyOrb = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Taskly — Work Smarter, Achieve Faster</title>
  <meta name="description" content="Effortlessly manage your projects, collaborate with your team, and achieve your goals with our intuitive Liquid Glass task management tool.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fustat:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #ffffff;
      --fg: #0b1120;
      --muted: #475569;
      --blue: #0084ff;
      --star: #FF801E;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Inter', sans-serif; overflow-x: clip; -webkit-font-smoothing: antialiased; }
    .font-fustat { font-family: 'Fustat', sans-serif; }

    /* Top-left layered blue glow ellipses (#60B1FF and #319AFF) */
    .${p}-glow-1 {
      position: fixed; top: -140px; left: -120px; width: 560px; height: 560px; border-radius: 50%;
      background: radial-gradient(circle, rgba(96,177,255,0.42) 0%, rgba(49,154,255,0.18) 50%, transparent 72%);
      filter: blur(50px); pointer-events: none; z-index: 0;
    }
    .${p}-glow-2 {
      position: fixed; top: 80px; right: -100px; width: 520px; height: 520px; border-radius: 50%;
      background: radial-gradient(circle, rgba(49,154,255,0.28) 0%, transparent 70%);
      filter: blur(60px); pointer-events: none; z-index: 0;
    }

    /* Sticky "Strong Liquid Glass" Navbar */
    .${p}-glass-nav {
      position: sticky; top: 26px; z-index: 100; width: fit-content; max-width: 94vw; margin: 24px auto 0;
      padding: 12px 24px; border-radius: 16px;
      background: rgba(255, 255, 255, 0.38); backdrop-filter: blur(50px); -webkit-backdrop-filter: blur(50px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06), inset 0px 4px 4px 0px rgba(255, 255, 255, 0.45);
      display: flex; align-items: center; gap: 32px; flex-wrap: wrap;
    }
    .${p}-signup-glass {
      display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 12px;
      background: rgba(255,255,255,0.65); border: 1px solid rgba(0,0,0,0.1);
      font-size: 13px; font-weight: 600; color: var(--fg); cursor: pointer;
    }

    .${p}-hero {
      position: relative; z-index: 10; max-width: 1440px; margin: 0 auto; padding: 48px clamp(24px, 5vw, 72px) 64px;
      display: grid; grid-template-columns: 1fr; gap: 44px; align-items: center;
    }
    @media (min-width: 980px) {
      .${p}-hero { grid-template-columns: 1.08fr 0.92fr; }
    }
    .${p}-h1 {
      font-family: 'Fustat', sans-serif; font-size: clamp(46px, 5.5vw, 75px); font-weight: 700;
      line-height: 1.05; letter-spacing: -2px; margin: 18px 0 20px; color: #0b1120;
    }
    .${p}-cta-blue {
      display: inline-flex; align-items: center; gap: 14px; padding: 14px 26px; border-radius: 16px;
      background: rgba(0, 132, 255, 0.86); backdrop-filter: blur(4px); color: #fff;
      font-size: 16px; font-weight: 600; border: 1px solid rgba(255,255,255,0.35);
      box-shadow: 0 16px 36px rgba(0,132,255,0.28), inset 0px 4px 4px 0px rgba(255,255,255,0.35);
      cursor: pointer; transition: transform 0.25s ease;
    }
    .${p}-cta-blue:hover { transform: scale(1.02); }

    /* Electric Blue Glassy Orb Stage */
    .${p}-orb-stage {
      position: relative; min-height: 440px; border-radius: 32px; overflow: hidden;
      background: radial-gradient(circle at 50% 50%, #e0f2fe 0%, #eff6ff 60%, #ffffff 100%);
      border: 1px solid rgba(0,132,255,0.16); display: flex; align-items: center; justify-content: center;
      box-shadow: 0 24px 60px rgba(0,132,255,0.12);
    }
    .${p}-orb-video {
      width: 118%; height: 118%; object-fit: cover;
      filter: hue-rotate(-55deg) saturate(250%) brightness(1.15) contrast(1.1);
      opacity: 0.85;
    }
    .${p}-float-task {
      position: absolute; padding: 14px 18px; border-radius: 16px;
      background: rgba(255,255,255,0.78); backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.9); box-shadow: 0 16px 32px rgba(15,23,42,0.08);
    }

    .${p}-logos {
      max-width: 1280px; margin: 24px auto 80px; padding: 28px 24px; text-align: center;
      border-top: 1px solid rgba(15,23,42,0.08);
    }
    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(15,23,42,0.45); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 520px; width: 100%; border-radius: 24px; background: #fff; padding: 32px; box-shadow: 0 24px 60px rgba(0,0,0,0.18); }
  </style>
</head>
<body>
  <div class="${p}-glow-1" aria-hidden="true"></div>
  <div class="${p}-glow-2" aria-hidden="true"></div>

  <!-- STICKY STRONG LIQUID GLASS NAVBAR -->
  <header class="${p}-glass-nav">
    <strong class="font-fustat" style="font-size:20px;letter-spacing:-0.03em;">Taskly</strong>
    <nav style="display:flex;gap:24px;" aria-label="Main Navigation">
      <a href="#heroStage" style="color:var(--fg);text-decoration:none;font-size:14px;font-weight:500;">Home</a>
      <a href="#trustedLogos" style="color:var(--muted);text-decoration:none;font-size:14px;font-weight:500;">Features</a>
      <a href="#trustedLogos" style="color:var(--muted);text-decoration:none;font-size:14px;font-weight:500;">Company</a>
      <a href="#trustedLogos" style="color:var(--muted);text-decoration:none;font-size:14px;font-weight:500;">Pricing</a>
    </nav>
    <div style="display:flex;gap:8px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-signup-glass" aria-pressed="false">Motion: ON</button>
      <button type="button" class="${p}-signup-glass" data-seamless-trigger="Create Your Taskly Workspace">
        <span>SignUp</span>
        <span>↗</span>
      </button>
    </div>
  </header>

  <main>
    <section id="heroStage" class="${p}-hero">
      <div data-parallax="0.05">
        <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,0.75);border:1px solid rgba(0,0,0,0.08);box-shadow:0 4px 12px rgba(0,0,0,0.03);">
          <span style="color:var(--star);letter-spacing:2px;font-size:14px;">★★★★★</span>
          <span style="font-size:13px;font-weight:600;color:var(--fg);">Rated 4.9/5 by 2700+ customers</span>
        </div>

        <h1 class="${p}-h1">Work smarter,<br>achieve faster</h1>
        <p style="font-size:18px;color:var(--muted);letter-spacing:-0.5px;line-height:1.6;max-width:520px;margin-bottom:32px;">
          Effortlessly manage your projects, collaborate with your team, and achieve your goals with our intuitive task management tool.
        </p>

        <button type="button" id="exploreMagneticBtn" class="${p}-cta-blue" data-magnetic>
          <span>Get Started Now</span>
          <span style="width:28px;height:28px;border-radius:50%;background:#fff;color:var(--blue);display:inline-flex;align-items:center;justify-content:center;font-weight:700;">→</span>
        </button>
      </div>

      <!-- ELECTRIC BLUE GLASSY ORB (HERO RIGHT) -->
      <div class="${p}-orb-stage" data-tilt-card>
        <video id="heroBgVideo" class="${p}-orb-video" src="${tasklyOrb}" autoplay loop muted playsinline preload="auto"></video>
        <div class="${p}-float-task" style="top:22px;left:22px;">
          <span style="font-size:11px;font-weight:700;color:var(--blue);display:block;">SPRINT VELOCITY</span>
          <strong style="font-size:18px;">+42% Faster Delivery</strong>
        </div>
        <div class="${p}-float-task" style="bottom:22px;right:22px;">
          <span style="font-size:11px;font-weight:700;color:#10b981;display:block;">● AUTO-TRIAGE ACTIVE</span>
          <strong style="font-size:15px;">18 Tasks Assigned</strong>
        </div>
      </div>
    </section>

    <section id="trustedLogos" class="${p}-logos">
      <p style="font-size:13px;color:var(--muted);font-weight:500;margin-bottom:24px;">Trusted by Top-tier product companies</p>
      <div style="display:flex;justify-content:center;align-items:center;gap:clamp(32px,6vw,96px);flex-wrap:wrap;opacity:0.55;font-family:'Fustat',sans-serif;font-size:18px;font-weight:700;">
        <span>LINEAR</span><span>VERCEL</span><span>RAYCAST</span><span>NOTION</span><span>FIGMA</span>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <strong class="font-fustat" style="color:var(--blue);">Taskly Liquid Workspace</strong>
        <button type="button" id="closeSeamlessBtn" class="${p}-signup-glass">Close</button>
      </div>
      <h2 id="seamlessTitle" class="font-fustat" style="font-size:26px;margin-bottom:10px;">Start Your Free 14-Day Trial</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Import your boards from Jira, Linear, or Notion in one click.</p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-cta-blue" style="width:100%;justify-content:center;">Launch Taskly Board</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 20. STELLAR AI (White Centered Hero + "Work Smarter. Move Faster. AI Powers You Up." + Interactive 4-Tab Bar Analyse/Train/Testing/Deploy Over Video Stage)
  if (spec.slug === 'stellar-ai') {
    const stellarVid = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Stellar.ai — Work Smarter. Move Faster. AI Powers You Up.</title>
  <meta name="description" content="Intelligent automation syncs with the tools you love to streamline tasks, boost output, and save time.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #ffffff;
      --fg: #0a0a0a;
      --muted: #52525b;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Inter', sans-serif; overflow-x: clip; }

    .${p}-nav {
      max-width: 1280px; margin: 0 auto; padding: 18px 24px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-btn-black {
      background: #000; color: #fff; padding: 11px 24px; border-radius: 999px;
      font-size: 14px; font-weight: 500; border: none; cursor: pointer;
    }
    .${p}-hero {
      max-width: 1280px; margin: 0 auto; padding: 56px 24px 80px; text-align: center;
    }
    .${p}-h1 {
      font-size: clamp(44px, 6.2vw, 78px); font-weight: 500; line-height: 1.08;
      letter-spacing: -0.03em; margin: 22px auto 18px; max-width: 920px;
    }
    .${p}-grad-line {
      background: linear-gradient(90deg, #000000 0%, #6b7280 55%, #9ca3af 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    /* 4-Tab Bar (Analyse | Train | Testing | Deploy) */
    .${p}-tab-bar {
      display: inline-flex; align-items: center; gap: 6px; padding: 6px;
      background: #f4f4f5; border-radius: 12px; margin: 32px auto 24px; flex-wrap: wrap; justify-content: center;
    }
    .${p}-tab-btn {
      padding: 10px 22px; border-radius: 8px; border: none; background: transparent;
      color: #52525b; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    }
    .${p}-tab-btn.is-active {
      background: #ffffff; color: #000000; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    /* Video + Conditional Overlay Stage */
    .${p}-video-stage {
      position: relative; max-width: 1120px; margin: 0 auto; height: 460px;
      border-radius: 28px; overflow: hidden; background: #18181b;
      display: flex; align-items: center; justify-content: center; padding: 24px;
    }
    .${p}-video-bg {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.82;
    }
    .${p}-overlay-card {
      position: relative; z-index: 10; max-width: 460px; width: 100%;
      background: rgba(255,255,255,0.94); backdrop-filter: blur(20px);
      border-radius: 22px; padding: 28px; text-align: left; color: #09090b;
      box-shadow: 0 24px 60px rgba(0,0,0,0.28);
    }
    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(0,0,0,0.55); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 500px; width: 100%; border-radius: 24px; background: #fff; padding: 32px; }
  </style>
</head>
<body>
  <header class="${p}-nav">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:18px;">★</span>
      <strong style="font-size:18px;font-weight:600;">Stellar.ai</strong>
    </div>
    <nav style="display:flex;gap:28px;" aria-label="Main Navigation">
      <a href="#stellarStage" style="color:var(--muted);text-decoration:none;font-size:14px;">Solutions ▾</a>
      <a href="#stellarStage" style="color:var(--muted);text-decoration:none;font-size:14px;">For Teams ▾</a>
      <a href="#stellarStage" style="color:var(--muted);text-decoration:none;font-size:14px;">About Us</a>
      <a href="#stellarStage" style="color:var(--muted);text-decoration:none;font-size:14px;">Learn Hub</a>
    </nav>
    <div style="display:flex;gap:12px;align-items:center;">
      <button type="button" id="motionToggleBtn" style="padding:8px 14px;border-radius:999px;background:#f4f4f5;border:none;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-black" data-magnetic>Get started free</button>
    </div>
  </header>

  <main>
    <section class="${p}-hero">
      <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:8px;border:1px solid #e4e4e7;font-size:13px;font-weight:500;">
        <span style="width:22px;height:22px;border-radius:4px;border:1px solid #d4d4d8;display:inline-flex;align-items:center;justify-content:center;">★</span>
        <span>4.9 rating from 18.3K+ users</span>
      </div>

      <h1 class="${p}-h1">
        Work Smarter. Move Faster.<br>
        <span class="${p}-grad-line">AI Powers You Up.</span>
      </h1>

      <p style="font-size:18px;color:var(--muted);max-width:640px;margin:0 auto 28px;line-height:1.6;">
        Intelligent automation syncs with the tools you love to streamline tasks, boost output, and save time.
      </p>

      <div>
        <button type="button" class="${p}-btn-black" style="padding:14px 32px;font-size:15px;" data-seamless-trigger="Begin Stellar.ai Free Trial">
          Begin Free Trial
        </button>
      </div>

      <!-- INTERACTIVE 4-TAB BAR -->
      <div class="${p}-tab-bar" role="tablist">
        <button type="button" class="${p}-tab-btn is-active" data-tab-title="Set Up Your AI Workspace" data-tab-bar="25%" data-tab-color="#7c3aed" data-tab-desc="Step 1 of 4: Connecting workspace repositories, Slack channels, and automated workflow triggers.">📊 Analyse</button>
        <button type="button" class="${p}-tab-btn" data-tab-title="AI Model Training" data-tab-bar="67%" data-tab-color="#f97316" data-tab-desc="Epoch 14/20 • 67% Complete • Fine-tuning custom context weights with zero data retention.">📖 Train</button>
        <button type="button" class="${p}-tab-btn" data-tab-title="Test Suite Results" data-tab-bar="100%" data-tab-color="#10b981" data-tab-desc="127 / 127 Automated Evaluation Benchmarks Passed • 99.8% Hallucination Guardrail Score.">👥 Testing</button>
        <button type="button" class="${p}-tab-btn" data-tab-title="Deploy to Production" data-tab-bar="92%" data-tab-color="#2563eb" data-tab-desc="Multi-region edge inference ready • SOC2 Type II verified • One-click production rollout.">🚀 Deploy</button>
      </div>

      <!-- VIDEO + CONDITIONAL OVERLAY STAGE -->
      <div id="stellarStage" class="${p}-video-stage">
        <video id="heroBgVideo" class="${p}-video-bg" src="${stellarVid}" autoplay loop muted playsinline preload="auto"></video>
        <div class="${p}-overlay-card" data-tilt-card>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <strong id="stellarCardTitle" style="font-size:19px;">Set Up Your AI Workspace</strong>
            <span id="stellarCardPct" style="font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;background:#f3e8ff;color:#7c3aed;">25%</span>
          </div>
          <div style="height:8px;background:#e4e4e7;border-radius:99px;overflow:hidden;margin-bottom:14px;">
            <div id="stellarCardBar" style="width:25%;height:100%;background:#7c3aed;border-radius:99px;transition:width 0.4s ease, background 0.4s ease;"></div>
          </div>
          <p id="stellarCardDesc" style="font-size:13px;color:#52525b;line-height:1.6;">
            Step 1 of 4: Connecting workspace repositories, Slack channels, and automated workflow triggers.
          </p>
        </div>
      </div>

      <!-- PARTNER LOGOS -->
      <div style="margin-top:64px;display:flex;justify-content:center;gap:clamp(28px,5vw,72px);flex-wrap:wrap;color:#71717a;font-weight:700;font-size:15px;letter-spacing:0.06em;">
        <span>INTERSCOPE</span><span>SPOTIFY</span><span>Nexera</span><span style="font-family:Georgia,serif;font-style:italic;">M3</span><span>LAURA COLE</span><span>vertex</span>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <strong>★ Stellar.ai Onboarding</strong>
        <button type="button" id="closeSeamlessBtn" style="padding:6px 12px;border-radius:999px;border:1px solid #d4d4d8;background:#fff;cursor:pointer;">Close</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">Begin Your 14-Day Free Trial</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Connect your team tools and deploy your first AI workflow in under 3 minutes.</p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-black" style="width:100%;">Create Workspace</button>
    </div>
  </div>

  <script>
    (function(){
      var tabs = document.querySelectorAll('.${p}-tab-btn');
      var tTitle = document.getElementById('stellarCardTitle');
      var tPct = document.getElementById('stellarCardPct');
      var tBar = document.getElementById('stellarCardBar');
      var tDesc = document.getElementById('stellarCardDesc');
      function activate(btn) {
        tabs.forEach(function(b){ b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var bw = btn.getAttribute('data-tab-bar');
        var col = btn.getAttribute('data-tab-color');
        if (tTitle) tTitle.textContent = btn.getAttribute('data-tab-title');
        if (tPct) { tPct.textContent = bw; tPct.style.color = col; }
        if (tBar) { tBar.style.width = bw; tBar.style.background = col; }
        if (tDesc) tDesc.textContent = btn.getAttribute('data-tab-desc');
      }
      tabs.forEach(function(b){ b.addEventListener('click', function(){ activate(b); }); });
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 21. DATACORE BOOKING (Full-Screen Opaque Video Hero + Purple #7b39fc & #2b2344 + "Say Hello to Datacore v3.2" + "Book your perfect stay instantly and hassle-free")
  if (spec.slug === 'datacore-booking') {
    const dcVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Datacore v3.2 — Book Your Perfect Stay Instantly and Hassle-Free</title>
  <meta name="description" content="Discover handpicked hotels, resorts, and stays across your favorite destinations. Enjoy exclusive deals, fast booking, and 24/7 support.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@500;600&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&family=Manrope:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0c0918;
      --purple: #7b39fc;
      --dark-purple: #2b2344;
      --fg: #ffffff;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Inter', sans-serif; overflow-x: clip; scroll-behavior: smooth; }

    .${p}-hero {
      position: relative; min-height: 100vh; width: 100%; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between; isolation: isolate;
    }
    .${p}-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;
    }
    .${p}-nav {
      max-width: 1400px; width: 100%; margin: 0 auto; padding: 18px clamp(24px, 6vw, 100px);
      display: flex; align-items: center; justify-content: space-between; font-family: 'Manrope', sans-serif;
    }
    .${p}-btn-signin {
      background: #ffffff; color: #171717; border: 1px solid #d4d4d4; border-radius: 8px;
      padding: 9px 18px; font-family: 'Manrope', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .${p}-btn-purple {
      background: var(--purple); color: #fafafa; border: none; border-radius: 10px;
      padding: 13px 26px; font-family: 'Cabin', sans-serif; font-size: 16px; font-weight: 500; cursor: pointer;
      box-shadow: 0 10px 28px rgba(123,57,252,0.38);
    }
    .${p}-btn-dark {
      background: var(--dark-purple); color: #f6f7f9; border: 1px solid rgba(164,132,215,0.35); border-radius: 10px;
      padding: 13px 26px; font-family: 'Cabin', sans-serif; font-size: 16px; font-weight: 500; cursor: pointer;
    }

    .${p}-center {
      max-width: 960px; margin: auto; padding: 64px 20px 96px; text-align: center;
      display: flex; flex-direction: column; align-items: center;
    }
    .${p}-tag-pill {
      display: inline-flex; align-items: center; gap: 10px; height: 38px; padding: 0 14px 0 8px;
      border-radius: 10px; background: rgba(85, 80, 110, 0.45); backdrop-filter: blur(14px);
      border: 1px solid rgba(164, 132, 215, 0.5); font-family: 'Cabin', sans-serif; font-size: 14px;
    }
    .${p}-h1 {
      font-family: 'Instrument Serif', serif; font-weight: 400;
      font-size: clamp(48px, 7vw, 92px); line-height: 1.08; margin: 22px 0 18px;
    }

    .${p}-stays { max-width: 1280px; margin: 0 auto; padding: 80px 24px; }
    .${p}-stay-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 22px; margin-top: 32px; }
    .${p}-stay-card {
      background: rgba(43,35,68,0.55); border: 1px solid rgba(164,132,215,0.25);
      border-radius: 20px; padding: 26px; backdrop-filter: blur(14px);
    }
    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(12,9,24,0.86); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 520px; width: 100%; border-radius: 20px; background: #1a142c; border: 1px solid rgba(164,132,215,0.4); padding: 32px; }
  </style>
</head>
<body>
  <main>
    <section class="${p}-hero">
      <video id="heroBgVideo" class="${p}-video" src="${dcVideo}" autoplay loop muted playsinline preload="auto"></video>

      <header class="${p}-nav">
        <div style="display:flex;align-items:center;gap:10px;">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="#ffffff"><path d="M2 7L14 1L26 7V21L14 27L2 21V7Z"/></svg>
          <strong style="font-size:18px;letter-spacing:-0.02em;">Datacore</strong>
        </div>
        <nav style="display:flex;gap:28px;" aria-label="Main Navigation">
          <a href="#featuredStays" style="color:#fff;text-decoration:none;font-size:14px;font-weight:500;">Home</a>
          <a href="#featuredStays" style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;font-weight:500;">Services ▾</a>
          <a href="#featuredStays" style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;font-weight:500;">Reviews</a>
          <a href="#featuredStays" style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;font-weight:500;">Contact us</a>
        </nav>
        <div style="display:flex;gap:10px;align-items:center;">
          <button type="button" id="motionToggleBtn" class="${p}-btn-dark" style="padding:8px 14px;font-size:12px;" aria-pressed="false">Motion: ON</button>
          <button type="button" class="${p}-btn-signin" data-seamless-trigger="Sign In to Datacore">Sign In</button>
          <button type="button" class="${p}-btn-purple" style="padding:9px 18px;font-size:14px;" data-seamless-trigger="Get Started with Datacore v3.2">Get Started</button>
        </div>
      </header>

      <div class="${p}-center" data-parallax="0.06">
        <div class="${p}-tag-pill">
          <span style="background:var(--purple);padding:2px 8px;border-radius:6px;font-size:12px;font-weight:600;">New</span>
          <span>Say Hello to Datacore v3.2</span>
        </div>

        <h1 class="${p}-h1">
          Book your perfect stay<br>instantly <em style="font-style:italic;padding:0 6px;">and</em> hassle-free
        </h1>

        <p style="font-size:18px;color:rgba(255,255,255,0.75);max-width:662px;line-height:1.6;margin-bottom:32px;">
          Discover handpicked hotels, resorts, and stays across your favorite destinations. Enjoy exclusive deals, fast booking, and 24/7 support.
        </p>

        <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;">
          <button type="button" id="exploreMagneticBtn" class="${p}-btn-purple" data-magnetic>Book a Free Demo</button>
          <button type="button" class="${p}-btn-dark" data-seamless-trigger="Explore Instant Stays">Get Started Now</button>
        </div>
      </div>
    </section>

    <section id="featuredStays" class="${p}-stays">
      <h2 style="font-family:'Instrument Serif',serif;font-size:clamp(34px,4vw,52px);font-weight:400;">Handpicked Luxury Destinations</h2>
      <div class="${p}-stay-grid">
        <article class="${p}-stay-card" data-tilt-card>
          <span style="font-size:12px;color:#c084fc;">AMALFI COAST • ITALY</span>
          <h3 style="font-size:20px;margin:8px 0;">Villa Miramare Cliffside</h3>
          <p style="font-size:14px;color:rgba(255,255,255,0.7);line-height:1.6;">Instant confirmation • Private infinity terrace • $480 / night.</p>
        </article>
        <article class="${p}-stay-card" data-tilt-card>
          <span style="font-size:12px;color:#c084fc;">KYOTO • JAPAN</span>
          <h3 style="font-size:20px;margin:8px 0;">Arashiyama Cedar Ryokan</h3>
          <p style="font-size:14px;color:rgba(255,255,255,0.7);line-height:1.6;">Private thermal onsen • Kaiseki dining included • $620 / night.</p>
        </article>
        <article class="${p}-stay-card" data-tilt-card>
          <span style="font-size:12px;color:#c084fc;">ZERMATT • SWITZERLAND</span>
          <h3 style="font-size:20px;margin:8px 0;">Matterhorn Glass Chalet</h3>
          <p style="font-size:14px;color:rgba(255,255,255,0.7);line-height:1.6;">Ski-in panoramic dome • 24/7 concierge • $790 / night.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-size:12px;color:#c084fc;">DATACORE V3.2 CONCIERGE</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-btn-dark" style="padding:6px 12px;font-size:12px;">Close</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:'Instrument Serif',serif;font-size:32px;font-weight:400;margin-bottom:10px;">Book Your Perfect Stay</h2>
      <p style="font-size:14px;color:rgba(255,255,255,0.72);line-height:1.6;margin-bottom:20px;">Zero booking fees and instant room key provisioning across 14,000+ luxury properties.</p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-purple" style="width:100%;">Confirm Instant Reservation</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 22. SAAS SOFTWARE ("Convix Software" PR-Agency SaaS: #ededed Outer Frame + #ef4d23 Orange Flower Pill Nav + "Shaping Agencies of tomorrow" + 3-Col Dashboard Tray with 40-Tick 180° Arc Gauges)
  if (spec.slug === 'saas-software') {
    const convixVid = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4';
    const makeTicks = (pct, activeCol) => {
      const activeCount = Math.round((pct / 100) * 40);
      let lines = '';
      for (let i = 0; i < 40; i++) {
        const angle = Math.PI + (i / 39) * Math.PI;
        const x1 = (100 + 68 * Math.cos(angle)).toFixed(1);
        const y1 = (100 + 68 * Math.sin(angle)).toFixed(1);
        const x2 = (100 + 80 * Math.cos(angle)).toFixed(1);
        const y2 = (100 + 80 * Math.sin(angle)).toFixed(1);
        const col = i < activeCount ? activeCol : '#d4d4d8';
        lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>`;
      }
      return `<svg viewBox="0 0 200 120" style="width:100%;max-width:220px;margin:0 auto;display:block;">${lines}<text x="100" y="102" text-anchor="middle" font-size="22" font-weight="600" fill="#0b0f1a">${pct}%</text></svg>`;
    };
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Convix Software — Shaping Agencies of Tomorrow</title>
  <meta name="description" content="The All-In-One Software Powering the Future of PR Agencies.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --outer: #ededed;
      --orange: #ef4d23;
      --dark: #0b0f1a;
      --tray: #f5f2ee;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--outer); color: var(--dark); font-family: 'Inter', sans-serif; overflow-x: clip; padding: 8px; }
    .serif-it { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; }

    .${p}-hero-frame {
      position: relative; width: 100%; min-height: calc(100vh - 16px); border-radius: 26px;
      overflow: hidden; background: #d9d9d9; padding: 20px 16px 40px;
      display: flex; flex-direction: column; justify-content: space-between; isolation: isolate;
    }
    .${p}-bg-video {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; pointer-events: none;
    }
    .${p}-bg-tint {
      position: absolute; inset: 0; background: rgba(255,255,255,0.12); z-index: -1; pointer-events: none;
    }

    .${p}-pill-nav {
      max-width: 760px; width: 100%; margin: 0 auto; padding: 8px 10px 8px 14px;
      border-radius: 999px; background: #ffffff; border: 1px solid #e5e5e5;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-btn-orange {
      display: inline-flex; align-items: center; gap: 10px; background: var(--orange); color: #fff;
      border: none; border-radius: 999px; padding: 8px 10px 8px 18px; font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .${p}-btn-dark {
      display: inline-flex; align-items: center; gap: 12px; background: var(--dark); color: #fff;
      border: none; border-radius: 999px; padding: 10px 10px 10px 26px; font-size: 14px; font-weight: 500; cursor: pointer;
    }

    .${p}-center-copy { text-align: center; max-width: 820px; margin: 28px auto 24px; }
    .${p}-h1 {
      font-size: clamp(36px, 6.5vw, 72px); line-height: 1.04; font-weight: 500; letter-spacing: -0.02em; margin: 16px 0 12px;
    }

    /* 3-Column Dashboard Preview Tray (#f5f2ee) */
    .${p}-tray {
      max-width: 920px; width: 100%; margin: 0 auto; background: var(--tray);
      border-radius: 26px; padding: 20px; display: grid; grid-template-columns: 1fr; gap: 16px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.12);
    }
    @media (min-width: 900px) {
      .${p}-tray { grid-template-columns: repeat(3, 1fr); }
    }
    .${p}-dcard {
      background: #ffffff; border-radius: 18px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;
    }
    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(11,15,26,0.6); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 500px; width: 100%; border-radius: 24px; background: #fff; padding: 32px; }
  </style>
</head>
<body>
  <main>
    <section class="${p}-hero-frame">
      <video id="heroBgVideo" class="${p}-bg-video" src="${convixVid}" autoplay loop muted playsinline preload="auto"></video>
      <div class="${p}-bg-tint"></div>

      <!-- FLOATING PILL NAVBAR -->
      <header class="${p}-pill-nav">
        <div style="display:flex;align-items:center;gap:10px;">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="#ef4d23" aria-hidden="true">
            <circle cx="16" cy="16" r="3.5"/><circle cx="26" cy="16" r="3.5"/><circle cx="6" cy="16" r="3.5"/>
            <circle cx="16" cy="26" r="3.5"/><circle cx="16" cy="6" r="3.5"/><circle cx="23" cy="23" r="3.5"/>
            <circle cx="9" cy="9" r="3.5"/><circle cx="23" cy="9" r="3.5"/><circle cx="9" cy="23" r="3.5"/>
          </svg>
          <strong style="font-size:14px;">Convix</strong>
        </div>
        <nav style="display:flex;gap:22px;align-items:center;" aria-label="Main Navigation">
          <a href="#dashboardTray" style="color:var(--dark);text-decoration:none;font-size:13px;font-weight:600;">• Home</a>
          <a href="#dashboardTray" style="color:#52525b;text-decoration:none;font-size:13px;">Features</a>
          <a href="#dashboardTray" style="color:#52525b;text-decoration:none;font-size:13px;">About</a>
          <a href="#dashboardTray" style="color:var(--orange);text-decoration:none;font-size:13px;font-weight:600;">Pages ▾</a>
        </nav>
        <div style="display:flex;gap:8px;align-items:center;">
          <button type="button" id="motionToggleBtn" style="padding:6px 10px;border-radius:999px;border:1px solid #e5e5e5;background:#fff;font-size:11px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
          <button type="button" class="${p}-btn-orange" data-seamless-trigger="Get Early Access to Convix PR OS">
            <span>Get early access</span>
            <span style="width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,0.22);display:inline-flex;align-items:center;justify-content:center;">›</span>
          </button>
        </div>
      </header>

      <!-- HERO CENTER CONTENT -->
      <div class="${p}-center-copy">
        <div style="display:inline-flex;align-items:center;gap:8px;background:#fff;padding:6px 16px;border-radius:999px;font-size:13px;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
          <span style="width:8px;height:8px;border-radius:50%;background:var(--orange);"></span>
          <span>Convix Software</span>
        </div>
        <h1 class="${p}-h1">
          Shaping <span class="serif-it">Agencies</span><br>of tomorrow
        </h1>
        <p style="font-size:15px;color:#404040;margin-bottom:22px;">
          The All-In-One Software Powering the Future of PR Agencies
        </p>
        <button type="button" id="exploreMagneticBtn" class="${p}-btn-dark" data-magnetic>
          <span>Get Started</span>
          <span style="width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,0.16);display:inline-flex;align-items:center;justify-content:center;">›</span>
        </button>
      </div>

      <!-- 3-COLUMN DASHBOARD PREVIEW TRAY -->
      <div id="dashboardTray" class="${p}-tray">
        <!-- Card 1: Clicks + 92% Gauge -->
        <article class="${p}-dcard" data-tilt-card>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;">
              <span style="color:var(--orange);">Clicks</span>
              <span style="color:#737373;">This Month</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
              <strong style="font-size:28px;">6,896</strong>
              <span style="background:#fef2f2;color:#dc2626;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;">↘ -3,382 (33%)</span>
            </div>
            <span style="font-size:11px;color:#737373;">Compared to yesterday</span>
          </div>
          <div style="margin:10px 0;">
            <p style="text-align:center;font-size:11px;color:#52525b;margin-bottom:4px;">Month Target achieved</p>
            ${makeTicks(92, '#ef4d23')}
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#737373;padding:0 12px;"><span>389K</span><span>425K</span></div>
          </div>
          <div style="background:#f5f5f5;border-radius:999px;padding:4px;display:flex;font-size:12px;font-weight:600;">
            <span style="flex:1;text-align:center;background:#fff;padding:5px;border-radius:999px;box-shadow:0 1px 4px rgba(0,0,0,0.06);">Impressions</span>
            <span style="flex:1;text-align:center;padding:5px;color:#737373;">Clicks</span>
          </div>
        </article>

        <!-- Card 2: Target Configuration Form -->
        <article class="${p}-dcard" data-tilt-card>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div>
              <label style="font-size:11px;color:#52525b;display:block;margin-bottom:4px;">Show figures for</label>
              <div style="border:1px solid #e5e5e5;border-radius:8px;padding:7px 10px;font-size:12px;display:flex;justify-content:space-between;"><span>This month</span><span>▾</span></div>
            </div>
            <div>
              <label style="font-size:11px;color:#52525b;display:block;margin-bottom:4px;">Compare period by</label>
              <div style="border:1px solid #e5e5e5;border-radius:8px;padding:7px 10px;font-size:12px;display:flex;justify-content:space-between;"><span>Month-to-date (MTD)</span><span>▾</span></div>
            </div>
            <div>
              <label style="font-size:11px;color:#52525b;display:block;margin-bottom:4px;">Site targets (This month)</label>
              <div style="border:1px solid #e5e5e5;border-radius:8px;padding:7px 10px;font-size:12px;"># 10</div>
            </div>
            <div>
              <label style="font-size:11px;color:#52525b;display:block;margin-bottom:4px;">Site targets (This year)</label>
              <div style="border:1px solid #e5e5e5;border-radius:8px;padding:7px 10px;font-size:12px;"># 100</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-top:12px;">
            <button type="button" style="background:var(--orange);color:#fff;border:none;border-radius:8px;padding:8px 18px;font-size:12px;font-weight:600;cursor:pointer;" data-seamless-trigger="Targets Saved">Save</button>
            <span style="font-size:12px;text-decoration:underline;color:#52525b;cursor:pointer;">Cancel</span>
            <span style="margin-left:auto;color:#737373;">✕</span>
          </div>
        </article>

        <!-- Card 3: Video Starts + 68% Gauge -->
        <article class="${p}-dcard" data-tilt-card>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;">
              <span style="color:var(--orange);">Video Starts</span>
              <span style="color:#737373;">today</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
              <strong style="font-size:28px;">1,420</strong>
              <span style="background:#f5f5f5;color:#404040;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;">↗ +18%</span>
            </div>
            <span style="font-size:11px;color:#737373;">Compared to yesterday</span>
          </div>
          <div style="margin:10px 0;">
            ${makeTicks(68, '#9ca3af')}
          </div>
          <div style="background:#f5f5f5;border-radius:999px;padding:4px;display:flex;font-size:12px;font-weight:600;">
            <span style="flex:1;text-align:center;background:#fff;padding:5px;border-radius:999px;box-shadow:0 1px 4px rgba(0,0,0,0.06);">Video Clicks</span>
            <span style="flex:1;text-align:center;padding:5px;color:#737373;">Video Starts</span>
          </div>
        </article>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <strong style="color:var(--orange);">Convix PR Agency OS</strong>
        <button type="button" id="closeSeamlessBtn" style="padding:6px 12px;border-radius:999px;border:1px solid #d4d4d8;background:#fff;cursor:pointer;">Close</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">Launch Your Agency Workspace</h2>
      <p style="font-size:14px;color:#52525b;line-height:1.6;margin-bottom:20px;">Real-time PR campaign attribution, media placement gauges, and automated client reporting.</p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-orange" style="width:100%;justify-content:center;padding:12px;">Activate Early Access</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  // 23. NEURALYN (Pure #000000 Dark Analytics SaaS + "Say Hello to Corewave v3.2" Liquid Glass Pill + "Your Insights. One Clear Overview." + Luminosity Video Dashboard + Scroll Word-by-Word Reveal Testimonial)
  if (spec.slug === 'neuralyn') {
    const neuVid = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Neuralyn — Your Insights. One Clear Overview.</title>
  <meta name="description" content="Neuralyn helps teams track metrics, goals, and progress with precision.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #000000;
      --fg: #ffffff;
      --muted: hsl(0, 0%, 65%);
      --card: hsl(0, 0%, 6%);
      --border: hsl(0, 0%, 20%);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Inter', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .serif-italic { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; }

    .${p}-liquid-glass {
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.22);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.14);
    }
    .${p}-nav {
      max-width: 1360px; margin: 0 auto; padding: 18px clamp(24px, 6vw, 96px);
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-btn-white {
      background: #ffffff; color: #000000; border: none; border-radius: 999px;
      padding: 13px 30px; font-size: 15px; font-weight: 500; cursor: pointer;
    }

    .${p}-hero {
      text-align: center; padding: 56px 20px 0;
    }
    .${p}-h1 {
      font-size: clamp(44px, 6.2vw, 72px); font-weight: 500; letter-spacing: -2px;
      line-height: 1.12; margin: 22px auto 14px; max-width: 820px;
    }
    .${p}-video-band {
      position: relative; width: 100%; min-height: 520px; margin-top: 44px;
      display: flex; align-items: center; justify-content: center; padding: 36px 20px 80px; overflow: hidden;
    }
    .${p}-video-bg {
      position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0.78;
    }
    .${p}-dash-mock {
      position: relative; z-index: 2; max-width: 1024px; width: 100%;
      background: rgba(12, 12, 14, 0.86); backdrop-filter: blur(22px);
      border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 28px;
      mix-blend-mode: luminosity; box-shadow: 0 32px 80px rgba(0,0,0,0.85);
      text-align: left;
    }
    .${p}-fade-bottom {
      position: absolute; left: 0; right: 0; bottom: 0; height: 140px;
      background: linear-gradient(0deg, #000000 0%, transparent 100%); z-index: 3; pointer-events: none;
    }

    /* Section 2: Scroll-Driven Word Reveal Testimonial */
    .${p}-testi {
      max-width: 920px; margin: 0 auto; padding: 110px 24px;
    }
    .${p}-word {
      color: hsl(0, 0%, 32%); transition: color 0.3s ease;
    }
    .${p}-word.is-lit { color: #ffffff; }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(0,0,0,0.86); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 500px; width: 100%; border-radius: 20px; background: #111; border: 1px solid var(--border); padding: 32px; }
  </style>
</head>
<body>
  <header class="${p}-nav">
    <div style="display:flex;align-items:center;gap:48px;">
      <strong style="font-size:20px;letter-spacing:-0.03em;">◈ Neuralyn</strong>
      <nav style="display:flex;gap:24px;" aria-label="Main Navigation">
        <a href="#dashArea" style="color:#fff;text-decoration:none;font-size:14px;">Home</a>
        <a href="#dashArea" style="color:var(--muted);text-decoration:none;font-size:14px;">Services ▾</a>
        <a href="#testimonialSec" style="color:var(--muted);text-decoration:none;font-size:14px;">Reviews</a>
        <a href="#testimonialSec" style="color:var(--muted);text-decoration:none;font-size:14px;">Contact us</a>
      </nav>
    </div>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-liquid-glass" style="padding:7px 14px;border-radius:8px;color:#fff;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
      <button type="button" class="${p}-btn-white" style="padding:8px 18px;border-radius:8px;font-size:13px;font-weight:600;" data-seamless-trigger="Sign In to Neuralyn Corewave">Sign In</button>
    </div>
  </header>

  <main>
    <section class="${p}-hero">
      <div class="${p}-liquid-glass" style="display:inline-flex;align-items:center;gap:10px;padding:6px 14px 6px 8px;border-radius:10px;">
        <span style="background:#fff;color:#000;padding:2px 8px;border-radius:6px;font-size:12px;font-weight:600;">New</span>
        <span style="font-size:13px;color:var(--muted);font-weight:500;">Say Hello to Corewave v3.2</span>
      </div>

      <h1 class="${p}-h1">
        Your Insights.<br>
        One Clear <span class="serif-italic">Overview.</span>
      </h1>

      <p style="font-size:17px;color:#edf2f7;opacity:0.9;line-height:1.55;margin-bottom:28px;">
        Neuralyn helps teams track metrics, goals,<br>and progress with precision.
      </p>

      <button type="button" id="exploreMagneticBtn" class="${p}-btn-white" data-magnetic>
        Get Started for Free
      </button>

      <!-- FULL-WIDTH VIDEO + LUMINOSITY DASHBOARD AREA -->
      <div id="dashArea" class="${p}-video-band">
        <video id="heroBgVideo" class="${p}-video-bg" src="${neuVid}" autoplay loop muted playsinline preload="auto"></video>
        <div class="${p}-dash-mock" data-parallax="-0.08" data-tilt-card>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,0.12);">
            <div>
              <span style="font-size:11px;color:var(--muted);letter-spacing:0.1em;">COREWAVE V3.2 TELEMETRY</span>
              <h2 style="font-size:20px;margin-top:4px;">Executive Revenue &amp; Retention Matrix</h2>
            </div>
            <span class="${p}-liquid-glass" style="padding:6px 12px;border-radius:999px;font-size:12px;">● Live Sync</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:20px;">
            <div style="padding:18px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);">
              <span style="font-size:12px;color:var(--muted);">Net Recurring ARR</span>
              <strong style="display:block;font-size:28px;margin-top:6px;" data-counter-target="48" data-counter-suffix=".6M">$48.6M</strong>
            </div>
            <div style="padding:18px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);">
              <span style="font-size:12px;color:var(--muted);">Net Dollar Retention</span>
              <strong style="display:block;font-size:28px;margin-top:6px;" data-counter-target="138" data-counter-suffix="%">138%</strong>
            </div>
            <div style="padding:18px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);">
              <span style="font-size:12px;color:var(--muted);">Query P99 Latency</span>
              <strong style="display:block;font-size:28px;margin-top:6px;" data-counter-target="12" data-counter-suffix="ms">12ms</strong>
            </div>
          </div>
        </div>
        <div class="${p}-fade-bottom"></div>
      </div>
    </section>

    <!-- SECTION 2: SCROLL-DRIVEN WORD REVEAL TESTIMONIAL -->
    <section id="testimonialSec" class="${p}-testi">
      <div style="font-size:48px;line-height:1;color:var(--muted);margin-bottom:18px;">“</div>
      <p id="neuralynQuote" style="font-size:clamp(28px,4vw,46px);font-weight:500;line-height:1.25;">
        Neuralyn revolutionized how we handle financial insights using smart analytics. We are now driving better outcomes quicker than we ever imagined!
      </p>
      <div style="display:flex;align-items:center;gap:16px;margin-top:36px;">
        <div style="width:54px;height:54px;border-radius:50%;border:3px solid #fff;background:#262626;display:flex;align-items:center;justify-content:center;font-weight:700;">BS</div>
        <div>
          <strong style="display:block;font-size:16px;">Brooklyn Simmons</strong>
          <span style="font-size:14px;color:var(--muted);">Product Manager</span>
        </div>
      </div>
    </section>
  </main>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <strong>◈ Neuralyn Corewave v3.2</strong>
        <button type="button" id="closeSeamlessBtn" style="padding:6px 12px;border-radius:8px;border:1px solid var(--border);background:transparent;color:#fff;cursor:pointer;">Close</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">Get Started with Neuralyn</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Connect Snowflake, BigQuery, or Postgres and generate executive overview boards in seconds.</p>
      <button type="button" id="confirmSeamlessBtn" class="${p}-btn-white" style="width:100%;">Create Free Account</button>
    </div>
  </div>

  <script>
    (function(){
      var qEl = document.getElementById('neuralynQuote');
      if (qEl) {
        var words = qEl.innerText.split(/\\s+/);
        qEl.innerHTML = words.map(function(w){ return '<span class="${p}-word">' + w + '</span>'; }).join(' ');
        var spans = qEl.querySelectorAll('.${p}-word');
        window.addEventListener('scroll', function(){
          var r = qEl.getBoundingClientRect();
          var vh = window.innerHeight || 800;
          var prog = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
          var lit = Math.floor(prog * spans.length);
          spans.forEach(function(s, i){ s.classList.toggle('is-lit', i <= lit); });
        }, { passive: true });
      }
    })();
  </script>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
  }

  const v2Html = buildForgeScoreV2Template(spec, p, cutoutImg, renderSharedMotionRuntime);
  if (v2Html) {
    return v2Html;
  }

  // GENERAL BESPOKE HALLMARK COMPILER FOR ALL OTHER MOTIONSITES TEMPLATES (with 3D Cutout + 4 Mandatory Motion Groups + ForgeScore v2.0)
  const bg = spec.isLight ? '#f8fafc' : '#06070b';
  const surface = spec.isLight ? '#ffffff' : '#10131c';
  const glass = spec.isLight ? 'rgba(255,255,255,0.82)' : 'rgba(16,19,28,0.72)';
  const fg = spec.isLight ? '#0f172a' : '#f8fafc';
  const muted = spec.isLight ? '#475569' : '#94a3b8';
  const borderCol = spec.isLight ? 'rgba(15,23,42,0.12)' : 'rgba(255,255,255,0.14)';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${spec.title} — ${spec.headline}</title>
  <meta name="description" content="${spec.subheadline.replace(/"/g, '&quot;')}">
  <meta property="og:title" content="${spec.title} — ${spec.headline}">
  <meta property="og:description" content="${spec.subheadline.replace(/"/g, '&quot;')}">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="${bg}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: ${bg};
      --bg-surface: ${surface};
      --bg-glass: ${glass};
      --text-primary: ${fg};
      --text-secondary: ${muted};
      --text-muted: ${muted};
      --accent-primary: ${spec.accent};
      --accent-secondary: #38bdf8;
      --border-hairline: ${borderCol};
      --font-display: 'Instrument Serif', serif;
      --font-sans: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
      --radius-card: 24px;
      --radius-pill: 9999px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); overflow-x: clip; scroll-behavior: smooth; }
    .skip-link { position: fixed; top: -100px; left: 16px; z-index: 10000; padding: 10px 18px; border-radius: var(--radius-pill); background: var(--accent-primary); color: #090b10; font-weight: 700; text-decoration: none; transition: transform 0.2s var(--ease-out-expo); }
    .skip-link:focus-visible { transform: translate3d(0, 116px, 0); outline: 2px solid var(--text-primary); outline-offset: 3px; }
    :focus-visible { outline: 2px solid var(--accent-primary); outline-offset: 3px; }
    .${p}-cursor-ring, .${p}-cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; transform: translate3d(-100px,-100px,0); mix-blend-mode: difference; will-change: transform; }
    .${p}-cursor-ring { width: 34px; height: 34px; border: 1.5px solid #fff; margin: -17px 0 0 -17px; transition: transform 0.22s var(--ease-out-expo), opacity 0.22s var(--ease-out-expo); }
    .${p}-cursor-ring.is-hovered { transform: translate3d(-100px,-100px,0) scale(1.65); background: #fff; }
    .${p}-cursor-dot { width: 6px; height: 6px; background: var(--accent-primary); margin: -3px 0 0 -3px; }
    @media (max-width: 900px) { .${p}-cursor-ring, .${p}-cursor-dot { display: none; } }

    .${p}-navbar {
      position: fixed; top: 14px; left: 0; right: 0; z-index: 220;
      max-width: 1280px; margin: 0 auto; padding: 12px 24px;
      border-radius: var(--radius-pill); background: var(--bg-glass); backdrop-filter: blur(20px);
      border: 1px solid var(--border-hairline); display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .${p}-pill-btn { min-height: 44px; padding: 8px 18px; border-radius: var(--radius-pill); background: var(--bg-glass); border: 1px solid var(--border-hairline); color: var(--text-primary); font-size: 12px; font-weight: 700; cursor: pointer; transition: transform 0.25s var(--ease-spring), opacity 0.25s var(--ease-out-expo); }
    .${p}-cta-btn { min-height: 44px; padding: 10px 22px; border-radius: var(--radius-pill); background: var(--accent-primary); color: #090b10; border: none; font-size: 13px; font-weight: 800; cursor: pointer; transition: transform 0.25s var(--ease-spring), opacity 0.25s var(--ease-out-expo); }
    .${p}-pill-btn:active, .${p}-cta-btn:active { transform: scale(0.97); }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: clamp(112px, 12vw, 148px) clamp(20px,5vw,72px) clamp(56px, 7vw, 88px);
      display: flex; flex-direction: column; justify-content: center; overflow: hidden; isolation: isolate;
    }
    .${p}-bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -3; opacity: 0.36; pointer-events: none; }
    .${p}-smoke-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none; }
    .${p}-hero-grid { max-width: 1280px; width: 100%; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: clamp(24px, 4vw, 44px); align-items: center; }
    .${p}-h1 { font-family: var(--font-display); font-size: clamp(2.75rem, 6.5vw, 5.75rem); font-weight: 400; line-height: 0.96; letter-spacing: -0.03em; margin: 14px 0 18px; }
    .${p}-cutout-3d { width: 100%; height: auto; max-height: 360px; object-fit: contain; display: block; margin: 0 auto; filter: drop-shadow(0 26px 40px rgba(0,0,0,0.55)); }
    .${p}-popout-wrap { animation: ${p}Float 5.8s ease-in-out infinite; will-change: transform; }
    @keyframes ${p}Float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-12px,0); } }

    .${p}-section { max-width: 1280px; margin: 0 auto; padding: clamp(56px, 8vw, 96px) clamp(20px,5vw,72px); }
    .${p}-pinned-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 32px; align-items: center; }
    .${p}-card { padding: clamp(20px, 3vw, 28px); border-radius: var(--radius-card); background: var(--bg-glass); border: 1px solid var(--border-hairline); backdrop-filter: blur(18px); box-shadow: 0 24px 48px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12); transition: transform 0.35s var(--ease-out-expo), opacity 0.35s var(--ease-out-expo); }
    .${p}-hscroll-track { display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 20px; overflow-x: auto; margin-top: 28px; }
    .${p}-reveal { opacity: 0; transform: translate3d(0, 22px, 0); transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo); }
    .${p}-reveal.is-visible { opacity: 1; transform: translate3d(0,0,0); }

    .${p}-seamless-overlay { position: fixed; inset: 0; z-index: 190; background: rgba(5,8,15,0.84); backdrop-filter: blur(20px); display: none; align-items: center; justify-content: center; padding: 20px; pointer-events: none; }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box { max-width: 640px; width: 100%; border-radius: 28px; background: var(--bg-surface); border: 1px solid var(--border-hairline); padding: 32px; pointer-events: auto; }
    @media (max-width: 640px) { .${p}-navbar { padding: 10px 16px; } }
    @media (max-width: 768px) { .${p}-hscroll-track { grid-template-columns: 1fr; } }
    @media (min-width: 960px) { .${p}-hero-grid { grid-template-columns: 1.05fr 0.95fr; } .${p}-pinned-grid { grid-template-columns: 1fr 1.1fr 1fr; } }
    @media (min-width: 1024px) { .${p}-section { padding-inline: 64px; } }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
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

  <header class="${p}-navbar">
    <strong style="font-size:17px;">✦ ${spec.title}</strong>
    <nav aria-label="Primary Navigation" style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-pill-btn" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-cta-btn" data-magnetic data-next-preview>Explore ${spec.title} ↗</button>
    </nav>
  </header>

  <main id="main-content">
    <section id="heroStage" class="${p}-hero">
      <video id="heroBgVideo" class="${p}-bg-video" src="${spec.heroVideo}" autoplay loop muted playsinline preload="auto"></video>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>
      <div class="${p}-hero-grid">
        <div data-parallax="0.08">
          <span class="${p}-pill-btn" style="color:var(--accent-primary);display:inline-flex;align-items:center;">${spec.title} • Interactive Edition</span>
          <h1 class="${p}-h1" id="oversizedHeadline">${spec.headline}</h1>
          <p style="font-size:16px;color:var(--text-secondary);line-height:1.65;max-width:60ch;margin-bottom:24px;">${spec.subheadline}</p>
          <div style="display:flex;gap:28px;flex-wrap:wrap;font-variant-numeric:tabular-nums;">
            <div><strong data-counter-target="120" data-counter-suffix="FPS" style="font-size:30px;font-family:var(--font-mono);">120FPS</strong><span style="display:block;font-size:12px;color:var(--text-secondary);">Motion Pipeline</span></div>
            <div><strong data-counter-target="10" data-counter-suffix="K+" style="font-size:30px;font-family:var(--font-mono);">10K+</strong><span style="display:block;font-size:12px;color:var(--text-secondary);">Active Nodes</span></div>
            <div><strong data-counter-target="99" data-counter-suffix="%" style="font-size:30px;font-family:var(--font-mono);">99%</strong><span style="display:block;font-size:12px;color:var(--text-secondary);">Visual Fidelity</span></div>
          </div>
        </div>
        <div id="heroPopoutRig" class="${p}-popout-wrap" data-tilt-card style="filter:url(#${p}LiquidFilter);">
          ${cutoutImg}
        </div>
      </div>
    </section>

    <section id="pinnedSpecs" class="${p}-section">
      <div class="${p}-pinned-grid">
        <article class="${p}-card ${p}-reveal" data-tilt-card data-spec-index="001">
          <span style="font-size:11px;color:var(--accent-primary);font-weight:700;font-family:var(--font-mono);">001 / ${spec.title.toUpperCase()}</span>
          <h2 style="font-size:20px;margin:8px 0;">${spec.headline}</h2>
          <p style="font-size:13px;color:var(--text-secondary);">${spec.subheadline}</p>
        </article>
        <div class="${p}-card" id="scrubCenterStage" style="text-align:center;">
          ${cutoutImg}
          <p id="scrubDialText" style="margin-top:10px;font-size:12px;color:var(--accent-primary);font-weight:700;font-family:var(--font-mono);">SCROLL SCRUB ANGLE: 0.0°</p>
        </div>
        <article class="${p}-card ${p}-reveal" data-tilt-card data-spec-index="002">
          <span style="font-size:11px;color:var(--accent-primary);font-weight:700;font-family:var(--font-mono);">002 / TELEMETRY</span>
          <h2 style="font-size:20px;margin:8px 0;">3D Tilt &amp; Liquid Wave</h2>
          <p style="font-size:13px;color:var(--text-secondary);">Interactive perspective cards and SVG displacement filters tuned for ${spec.title}.</p>
        </article>
      </div>
    </section>
  </main>

  <footer class="${p}-section" style="padding-top:24px;padding-bottom:40px;border-top:1px solid var(--border-hairline);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
    <span style="font-size:13px;color:var(--text-secondary);">© ${new Date().getFullYear()} ${spec.title}. Crafted with ForgeFrame Gold v2.0.</span>
    <span style="font-size:12px;font-family:var(--font-mono);color:var(--accent-primary);">STATUS: NOMINAL • 60FPS</span>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="${p}-pill-btn">${spec.title} Specification</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-btn">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-size:24px;margin-bottom:10px;">${spec.title}</h2>
      <p style="font-size:14px;color:var(--text-secondary);line-height:1.6;margin-bottom:18px;">${spec.subheadline}</p>
      <div style="margin-bottom:18px;">${cutoutImg}</div>
      <button type="button" id="confirmSeamlessBtn" class="${p}-cta-btn" style="width:100%;">Return to Live Stage</button>
    </div>
  </div>
  ${renderSharedMotionRuntime(p)}
</body>
</html>`;
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

  const { scaffoldTemplate } = await import('./scaffold-template.mjs');
  if (!fs.existsSync(sourceHtmlPath) || options.forceRebuild) {
    scaffoldTemplate(slug, { tier: accessTier });
  }

  const spec = extractSpecFromPrompt(data);
  const html = buildSingleFileHtml(spec);
  fs.writeFileSync(sourceHtmlPath, html, 'utf8');
  syncCustomiseGuide(slug, data.title, [data.title, spec.headline, spec.subheadline]);

  fs.mkdirSync(path.dirname(demoHtmlPath), { recursive: true });
  fs.copyFileSync(sourceHtmlPath, demoHtmlPath);

  const cutoutAssetSrc = path.resolve(root, `web/tools/agent-pinterest/pinterest-assets/cutout-${slug}.webp`);
  if (fs.existsSync(cutoutAssetSrc)) {
    const sourceAssetPath = path.resolve(productDir, 'source/assets/cutout.webp');
    const demoAssetPath = path.resolve(root, `web/public/demos/${slug}/assets/cutout.webp`);
    fs.mkdirSync(path.dirname(sourceAssetPath), { recursive: true });
    fs.mkdirSync(path.dirname(demoAssetPath), { recursive: true });
    fs.copyFileSync(cutoutAssetSrc, sourceAssetPath);
    fs.copyFileSync(cutoutAssetSrc, demoAssetPath);
  }

  execFileSync('node', ['web/product/giao-dien-web/tools/dong-goi.mjs', slug, '--ngoai-le'], {
    cwd: root,
    stdio: 'inherit'
  });

  const webCat = /portfolio|agency|hero/i.test(data.category || '') ? 'portfolio' : 'commerce';
  const catPath = path.resolve(root, 'web/src/lib/template-categories.ts');
  let catContent = fs.readFileSync(catPath, 'utf8');
  if (!catContent.includes(`'${slug}':`)) {
    catContent = catContent.replace(
      'export const TEMPLATE_CATEGORIES = {',
      `export const TEMPLATE_CATEGORIES = {\n  '${slug}': '${webCat}',`
    );
    fs.writeFileSync(catPath, catContent, 'utf8');
  }

  realTpl = fs.readFileSync(realTplPath, 'utf8');
  const accessLine = accessTier === 'free' ? `    access: 'free',\n` : '';
  const entry = `  ${catalogId}: {
    slug: '${slug}',
    cat: '${webCat}',
${accessLine}    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`Giao diện web ${data.title} với đầy đủ 4 nhóm hiệu ứng (Scroll Parallax/Scrub, 3D Card Tilt & Liquid Wave, Split-Text & Seamless Modal, Particle Smoke).`)},
        tags: [${JSON.stringify(data.category || 'Interactive UI')}, '3D Pop-Out & Motion', 'Hallmark UI']
      },
      en: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`Bespoke ${data.title} web experience featuring all 4 interactive motion groups (Scroll Scrubbing, 3D Tilt & Liquid Filter, Split-Text, and Ambient Smoke).`)},
        tags: [${JSON.stringify(data.category || 'Interactive UI')}, '3D Pop-Out & Motion', 'Hallmark UI']
      },
      zh: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`单文件自包含 ${data.title} 网页模板，配备 3D 悬浮视觉与四组动态交互。`)},
        tags: ['交互组件', '3D 破界视觉', '动态视差']
      }
    }
  },`;

  if (!realTpl.includes(`slug: '${slug}'`) && !realTpl.includes(`"slug": "${slug}"`)) {
    realTpl = realTpl.replace(
      'export const REAL_TEMPLATES: Record<string, RealTemplate> = {',
      `export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n${entry}\n`
    );
    fs.writeFileSync(realTplPath, realTpl, 'utf8');
  } else {
    const existingBlockRegex = new RegExp(`  ${catalogId}:\\s*\\{[\\s\\S]*?\\n  \\},`, 'm');
    if (existingBlockRegex.test(realTpl)) {
      realTpl = realTpl.replace(existingBlockRegex, entry);
      fs.writeFileSync(realTplPath, realTpl, 'utf8');
    }
  }

  execFileSync('node', ['web/tools/agent-motionsites/generate-previews.mjs', slug], {
    cwd: root,
    stdio: 'inherit'
  });

  return { slug, catalogId, title: data.title, accessTier };
}
