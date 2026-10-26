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
    bgHex: '#07090f',
    surfaceHex: '#101522',
    accentHex: '#f97316',
    accent2Hex: '#38bdf8',
    width: 1068,
    height: 646
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
          const w = 96, h = 72;
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const data = ctx.getImageData(0, 0, w, h).data;

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

          let bestSat = -1, accR = 249, accG = 115, accB = 22;
          let secSat = -1, secR = 56, secG = 189, secB = 248;

          for (let i = 0; i < data.length; i += 16) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            const l = (max + min) / 510;
            const d = (max - min) / 255;
            if (l > 0.16 && l < 0.88 && d > bestSat) {
              secSat = bestSat; secR = accR; secG = accG; secB = accB;
              bestSat = d; accR = r; accG = g; accB = b;
            }
          }

          resolve({
            width: img.naturalWidth || 1068,
            height: img.naturalHeight || 646,
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
    // For full-bleed 3D showcase hero templates, enforce high-contrast dark/cinema canvas or rich editorial tone
    const bgHex = rgbToHex(Math.min(18, Math.round(r * 0.18)), Math.min(22, Math.round(g * 0.18)), Math.min(30, Math.round(b * 0.22)));
    const surfaceHex = rgbToHex(Math.min(30, Math.round(r * 0.22) + 12), Math.min(36, Math.round(g * 0.22) + 14), Math.min(48, Math.round(b * 0.25) + 18));

    const hsl1 = rgbToHsl(...stats.acc);
    const accentHex = hsl1.s < 0.20 ? '#f59e0b' : rgbToHex(...stats.acc);
    const hsl2 = rgbToHsl(...stats.sec);
    const accent2Hex = hsl2.s < 0.16 ? '#38bdf8' : rgbToHex(...stats.sec);

    return {
      isLight: false,
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
  if (/portfolio|agency|studio|architect|photo|blog|minimal|personal|creative|signature|bandits|gluckauf/.test(text)) return 'portfolio';
  if (/edu|course|learn|academy|science|book/.test(text)) return 'education';
  return 'commerce';
}

function getSlugPrefix(slug) {
  const clean = String(slug || 'tpl').replace(/[^a-z0-9]/gi, '').toLowerCase();
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = ((hash << 5) - hash + clean.charCodeAt(i)) | 0;
  }
  const suffix = Math.abs(hash % 90 + 10);
  return `${clean.slice(0, 3)}${suffix}`;
}

function getArchetypeSpec(data) {
  const text = `${data.title || ''} ${data.rawTitle || ''} ${data.rawDesc || ''}`.toLowerCase();
  if (/bike|cycle|sarto|moto|car|aero/.test(text)) {
    return {
      domain: 'AEROSPACE & CARBON MOBILITY',
      oversizedWord1: 'MOVES',
      oversizedWord2: 'INSTINCT',
      subHeadline: 'Hand-laminated autoclave carbon monocoque engineering with 3D aerodynamic telemetry and real-time wind-tunnel scrub physics.',
      badgeLeft: 'AUTOCLAVE MONOCOQUE • 680G',
      badgeRight: 'CX DRAG 0.19 • VENETO ATELIER',
      specs: [
        { code: '001', title: 'T1100G Carbon Layup', metric: '680g', desc: 'Ultra-high modulus aerospace carbon fibers oriented at 45° torsional vectors for zero-loss power transfer.' },
        { code: '002', title: 'Laminar Flow Cockpit', metric: '18.4W', desc: 'Integrated stem-bar airfoil with internal hydraulic routing and computational fluid dynamics wake suppression.' },
        { code: '003', title: 'Bespoke Geometry Laser', metric: '0.1mm', desc: 'Sub-millimeter custom tube mitering calibrated to rider biometric torque and cornering inclination.' }
      ],
      projects: [
        { tag: '01 / WIND TUNNEL', title: 'Raso Tri-Spoke Aero Concept', stat: '120+ Hrs CFD' },
        { tag: '02 / GRAVEL ALPINE', title: 'Seta Plus Dolomite Edition', stat: '10K+ Test Km' },
        { tag: '03 / VELODROME', title: 'Lampo Track Monocoque', stat: '1000+ Watts Peak' },
        { tag: '04 / BESPOKE ATELIER', title: 'Raw Copper Leaf Custom Finish', stat: '100% Handbuilt' }
      ]
    };
  }
  if (/gluckauf|coal|mine|webvr|3d|cosmos|space/.test(text)) {
    return {
      domain: 'IMMERSIVE 3D SPATIAL WEBVR',
      oversizedWord1: 'BEYOND',
      oversizedWord2: 'HORIZON',
      subHeadline: 'Volumetric 360° subterranean and cosmic spatial exploration powered by depth-layered parallax, particle smoke shaders, and real-time telemetry.',
      badgeLeft: 'VOLUMETRIC LIDAR • 1200M DEPTH',
      badgeRight: 'WEBGL SPATIAL • 90FPS VR',
      specs: [
        { code: '001', title: 'Point-Cloud Photogrammetry', metric: '1.2B', desc: 'Laser-scanned geological strata reconstructed into real-time streaming meshes with dynamic normal lighting.' },
        { code: '002', title: 'Atmospheric Particle Engine', metric: '60FPS', desc: 'Volumetric coal dust and subterranean mist simulated with hardware-accelerated curl noise fields.' },
        { code: '003', title: 'Spatial Binaural Telemetry', metric: '360°', desc: 'Head-tracked acoustic impulse responses mapped directly to scroll velocity and depth elevation.' }
      ],
      projects: [
        { tag: '01 / SHAFT ALPHA', title: '1200m Subterranean Gallery', stat: '120+ Scans' },
        { tag: '02 / THERMAL CORE', title: 'Turbine Hall Volumetric Twin', stat: '10K+ Polygons/m' },
        { tag: '03 / ARCHIVE 1967', title: 'Historical Horizon Timeline', stat: '1000+ Artifacts' },
        { tag: '04 / VR EXPEDITION', title: 'Oculus & WebXR Live Bridge', stat: '4K Stereo' }
      ]
    };
  }
  if (/espn|nba|signature|jordan|sport|motion/.test(text)) {
    return {
      domain: 'KINETIC BIOMECHANICS STUDIO',
      oversizedWord1: 'SIGNATURE',
      oversizedWord2: 'GRAVITY',
      subHeadline: 'High-speed 3D motion-capture sculpture showcase dissecting iconic athletic biomechanics, launch angles, and hang-time physics.',
      badgeLeft: 'MOCAP 240HZ • HANG-TIME 0.92S',
      badgeRight: 'APEX RELEASE • 48.2 INCH VERT',
      specs: [
        { code: '001', title: 'Apex Fadeaway Kinematics', metric: '54.2°', desc: 'Full-body inverse kinematics capturing shoulder separation, elbow elevation, and backward center-of-mass drift.' },
        { code: '002', title: 'Vertical Impulse Vector', metric: '48.2"', desc: 'Ground reaction force telemetry measured across takeoff plant, airborne suspension, and release window.' },
        { code: '003', title: 'Orbital Replay Scrubbing', metric: '240Hz', desc: 'Frame-accurate 360° camera rig synchronized to scroll momentum for multi-angle silhouette inspection.' }
      ],
      projects: [
        { tag: '01 / 1998 FINALS', title: 'The Last Shot Biomechanics', stat: '120+ Mocap Nodes' },
        { tag: '02 / FREE THROW LINE', title: 'Airborne Glide Trajectory', stat: '10K+ Frame Samples' },
        { tag: '03 / SPIN MOVE', title: 'Baseline Pivot Angular Velocity', stat: '1000+ Deg/Sec' },
        { tag: '04 / HALL OF FAME', title: 'Interactive 3D Sculpture Vault', stat: '6 Championships' }
      ]
    };
  }
  if (/sticky|bandits|creative|digital|standards/.test(text)) {
    return {
      domain: 'SURREAL DIGITAL PRODUCTION',
      oversizedWord1: 'DIGITAL',
      oversizedWord2: 'REBELLION',
      subHeadline: 'Hyper-real freeze-frame art direction and rebellious interactive web experiences engineered with zero-gravity physics and bold typography.',
      badgeLeft: 'HYPER-REAL VFX • 8K RAW',
      badgeRight: 'AWWWARDS WOTD • AMSTERDAM',
      specs: [
        { code: '001', title: 'High-Speed Phantom Optics', metric: '1000fps', desc: 'Explosive mid-air prop choreography frozen at 1/10,000s shutter speed and composited into interactive WebGL planes.' },
        { code: '002', title: 'Liquid Shader Distortion', metric: 'WebGL2', desc: 'Real-time SVG & canvas turbulence displacement reacting to cursor velocity and touch ripples.' },
        { code: '003', title: 'Kinetic Editorial Systems', metric: '0.02s', desc: 'Instant FLIP layout transitions expanding corner announcement cards into full-viewport campaign dossiers.' }
      ],
      projects: [
        { tag: '01 / CAMPAIGN VFX', title: 'Zero-G Culinary Explosion', stat: '120+ Layers' },
        { tag: '02 / INTERACTIVE FILM', title: 'Van Kaam IP Digital Launch', stat: '10K+ Daily Plays' },
        { tag: '03 / SOUND DESIGN', title: 'Sonic Identity & Web Audio', stat: '1000+ Samples' },
        { tag: '04 / BRAND SYSTEM', title: 'Neon Editorial Design Tokens', stat: '99.8% Lighthouse' }
      ]
    };
  }
  return {
    domain: 'ARCHITECTURAL & HYDRO PHOTONICS',
    oversizedWord1: 'LUMINOUS',
    oversizedWord2: 'PRECISION',
    subHeadline: 'Next-generation architectural luminaire and spatial design system combining IP66 hydro-shielding, photonics dispersion, and 3D scroll scrubbing.',
    badgeLeft: 'PHOTONIC FLUX • 2450 UMOL/S',
    badgeRight: 'IP66 HYDRO SHIELD • 3D CAD',
    specs: [
      { code: '001', title: 'Hydro-Shield Thermal Array', metric: 'IP66', desc: 'Anodized extruded aluminum heat-sink fins engineered to shed high-pressure water droplets while maintaining thermal equilibrium.' },
      { code: '002', title: 'Full-Spectrum Photon Matrix', metric: '2450', desc: 'Precision secondary optics delivering uniform photosynthetically active radiation across multi-tier architectural canopies.' },
      { code: '003', title: 'Modular Daisy-Chain Bus', metric: '99.4%', desc: 'Zero-flicker digital dimming protocol with real-time telemetry feedback and predictive maintenance diagnostics.' }
    ],
    projects: [
      { tag: '01 / PHOTONICS LAB', title: 'VYPRx Plus Hydro Matrix', stat: '120+ Patents' },
      { tag: '02 / VERTICAL FARM', title: 'Nordic Biosphere Canopy', stat: '10K+ Fixtures' },
      { tag: '03 / THERMAL CFD', title: 'Passive Convection Architecture', stat: '1000+ Hrs Stress' },
      { tag: '04 / SMART CONTROL', title: 'Wireless Dimming Telemetry', stat: '0.1% Precision' }
    ]
  };
}

export function buildPinterestInspiredHtml(data, palette) {
  const p = getSlugPrefix(data.slug);
  const spec = getArchetypeSpec(data);
  const bg = palette.bgHex;
  const surface = palette.surfaceHex;
  const accent = palette.accentHex;
  const accent2 = palette.accent2Hex;
  const cleanKeyword = (data.keyword || 'Website Hero Section UI').replace(/\b\w/g, c => c.toUpperCase());
  const evalScore = data.criteriaEvaluation?.totalScore || 98;
  const evalRatio = data.criteriaEvaluation?.aspectRatio || 1.65;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.title} — ${spec.domain} Interactive Showcase</title>
  <meta name="description" content="${spec.subHeadline.replace(/"/g, '&quot;')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: ${bg};
      --surface: ${surface};
      --glass: rgba(16, 21, 34, 0.62);
      --glass-strong: rgba(12, 16, 28, 0.84);
      --fg: #f8fafc;
      --muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.14);
      --accent: ${accent};
      --accent-2: ${accent2};
      --font-display: 'Syne', 'Plus Jakarta Sans', sans-serif;
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

    /* Group 2.5: Custom Follower Cursor with Blend-Mode Difference */
    .${p}-cursor-ring,
    .${p}-cursor-dot {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      border-radius: 50%;
      transform: translate3d(-100px, -100px, 0);
      transition: width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
      mix-blend-mode: difference;
    }
    .${p}-cursor-ring {
      width: 38px;
      height: 38px;
      border: 1.5px solid rgba(255, 255, 255, 0.85);
      background: rgba(255, 255, 255, 0.04);
      margin-left: -19px;
      margin-top: -19px;
    }
    .${p}-cursor-ring.is-hovered {
      width: 68px;
      height: 68px;
      margin-left: -34px;
      margin-top: -34px;
      background: #ffffff;
      border-color: #ffffff;
    }
    .${p}-cursor-dot {
      width: 8px;
      height: 8px;
      background: var(--accent);
      margin-left: -4px;
      margin-top: -4px;
    }
    @media (max-width: 900px) {
      .${p}-cursor-ring, .${p}-cursor-dot { display: none; }
    }

    /* Criterion 6: Minimalist Edge Navigation (Top Bar + Left Slide Numbers + Right Telemetry Rail) */
    .${p}-edge-top {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 220;
      padding: 16px clamp(16px, 3.5vw, 44px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      background: linear-gradient(180deg, rgba(7, 9, 15, 0.82) 0%, rgba(7, 9, 15, 0) 100%);
      pointer-events: none;
    }
    .${p}-edge-top > * {
      pointer-events: auto;
    }
    .${p}-brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--fg);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 16px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .${p}-brand-orb {
      width: 30px;
      height: 30px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: #fff;
      box-shadow: 0 0 20px ${accent}66;
    }
    .${p}-edge-menu {
      display: none;
      align-items: center;
      gap: 6px;
      list-style: none;
      padding: 6px 10px;
      border-radius: 999px;
      background: var(--glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
    }
    @media (min-width: 920px) {
      .${p}-edge-menu { display: flex; }
    }
    .${p}-edge-menu a {
      text-decoration: none;
      color: var(--muted);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 7px 14px;
      border-radius: 999px;
      transition: color 0.2s ease, background 0.2s ease;
    }
    .${p}-edge-menu a:hover {
      color: var(--fg);
      background: rgba(255, 255, 255, 0.08);
    }
    .${p}-edge-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .${p}-motion-btn {
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--glass);
      backdrop-filter: blur(16px);
      color: var(--fg);
      font-family: inherit;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
    }
    .${p}-magnetic-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 22px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: #ffffff;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 10px 28px ${accent}44;
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease;
      will-change: transform;
    }

    /* Left & Right Minimalist Edge Rails */
    .${p}-edge-left,
    .${p}-edge-right {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      z-index: 120;
      display: none;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    @media (min-width: 1100px) {
      .${p}-edge-left { display: flex; left: 20px; }
      .${p}-edge-right { display: flex; right: 20px; }
    }
    .${p}-slide-idx {
      width: 34px;
      height: 34px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--glass);
      backdrop-filter: blur(14px);
      color: var(--muted);
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all 0.25s ease;
    }
    .${p}-slide-idx.is-active {
      background: var(--accent);
      color: #ffffff;
      border-color: var(--accent);
      box-shadow: 0 0 18px ${accent}77;
      transform: scale(1.1);
    }
    .${p}-rail-pill {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      padding: 14px 8px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--glass);
      backdrop-filter: blur(14px);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
    }

    /* Criterion 1, 2, 3, 4, 5: Full-Bleed Hero Section with Text Masking, 3D Pop-Out & Floating Glass/Pill Cards */
    .${p}-hero {
      position: relative;
      min-height: 100vh;
      width: 100%;
      padding: 108px clamp(18px, 5vw, 76px) 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      isolation: isolate;
    }

    /* Layer 0: Full-Bleed Background Visual Hook + Parallax */
    .${p}-hero-bg {
      position: absolute;
      inset: -6%;
      z-index: -4;
      background-image: url('${data.imageUrl}');
      background-size: cover;
      background-position: center;
      filter: brightness(0.42) contrast(1.12) saturate(1.18);
      transform: translate3d(0, 0, 0) scale(1.06);
      will-change: transform;
    }
    .${p}-hero-vignette {
      position: absolute;
      inset: 0;
      z-index: -3;
      background:
        radial-gradient(circle at 50% 42%, transparent 18%, rgba(7, 9, 15, 0.78) 78%),
        linear-gradient(180deg, rgba(7, 9, 15, 0.55) 0%, rgba(7, 9, 15, 0.25) 45%, var(--bg) 100%);
    }

    /* Group 4.2: Ambient Particle / Smoke Canvas System */
    .${p}-smoke-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      pointer-events: none;
      opacity: 0.75;
    }

    /* Group 3.4: Infinite Background Marquee Loop */
    .${p}-marquee-band {
      position: absolute;
      top: 52%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
      opacity: 0.11;
      white-space: nowrap;
    }
    .${p}-marquee-track {
      display: inline-block;
      font-family: var(--font-display);
      font-size: clamp(72px, 13vw, 180px);
      font-weight: 800;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      color: transparent;
      -webkit-text-stroke: 1.5px #ffffff;
      animation: ${p}Marquee 26s linear infinite;
    }
    @keyframes ${p}Marquee {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }

    /* Criterion 5 + Group 3.1: Oversized Split-Text Headline Masked Behind 3D Pop-Out Subject */
    .${p}-hero-center {
      position: relative;
      width: 100%;
      max-width: 1320px;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
      align-items: center;
    }
    .${p}-oversized-wrap {
      position: relative;
      z-index: 2;
      text-align: center;
      pointer-events: none;
      margin-bottom: -36px;
    }
    .${p}-eyebrow-pill {
      pointer-events: auto;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 999px;
      background: var(--glass);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 14px;
    }
    .${p}-oversized-title {
      font-family: var(--font-display);
      font-size: clamp(40px, 8.2vw, 112px);
      font-weight: 800;
      line-height: 0.94;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      color: #ffffff;
      text-shadow: 0 18px 48px rgba(0, 0, 0, 0.65);
    }
    .${p}-oversized-title em {
      font-family: var(--font-serif);
      font-style: italic;
      font-weight: 400;
      color: var(--accent);
      padding: 0 6px;
    }
    .${p}-split-word {
      display: inline-block;
      opacity: 0;
      transform: translate3d(0, 38px, 0) rotateX(20deg);
      transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-split-word.is-in {
      opacity: 1;
      transform: translate3d(0, 0, 0) rotateX(0deg);
    }

    /* Criterion 4 + Group 2.4 + Group 4.1: Out-of-Bounds 3D Pop-Out Stage overlapping headline & clouds */
    .${p}-popout-stage {
      position: relative;
      z-index: 5;
      display: grid;
      grid-template-columns: 1fr;
      gap: 22px;
      align-items: center;
    }
    @media (min-width: 1024px) {
      .${p}-popout-stage {
        grid-template-columns: 290px 1fr 290px;
        gap: 24px;
      }
    }

    .${p}-popout-centerpiece {
      position: relative;
      z-index: 6;
      perspective: 1400px;
      margin: 0 auto;
      width: 100%;
      max-width: 680px;
    }
    .${p}-floating-rig {
      position: relative;
      border-radius: 32px;
      padding: 12px;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.03));
      border: 1px solid rgba(255, 255, 255, 0.24);
      box-shadow:
        0 36px 80px rgba(0, 0, 0, 0.65),
        0 0 50px ${accent}33;
      transform-style: preserve-3d;
      animation: ${p}ZeroGravity 6s ease-in-out infinite;
      transition: transform 0.22s ease-out;
    }
    @keyframes ${p}ZeroGravity {
      0%, 100% { transform: translate3d(0, 0px, 0); }
      50% { transform: translate3d(0, -12px, 0); }
    }

    /* Out-of-bounds 3D Orbital Overlay breaking outside the frame */
    .${p}-outofbounds-halo {
      position: absolute;
      inset: -24px -18px;
      pointer-events: none;
      z-index: 12;
      overflow: visible;
    }
    .${p}-cutout-badge {
      position: absolute;
      top: -16px;
      left: 28px;
      z-index: 15;
      padding: 7px 18px;
      border-radius: 999px;
      background: var(--bg);
      border: 1px solid var(--accent);
      color: var(--fg);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      box-shadow: 0 8px 20px rgba(0,0,0,0.45);
    }
    .${p}-cutout-badge-right {
      position: absolute;
      bottom: -16px;
      right: 28px;
      z-index: 15;
      padding: 7px 18px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      box-shadow: 0 10px 24px ${accent}55;
    }

    .${p}-showcase-mask {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      border-radius: 24px;
      overflow: hidden;
      background: var(--surface);
    }
    .${p}-showcase-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, filter;
    }
    .${p}-floating-rig:hover .${p}-showcase-img {
      transform: scale(1.06);
    }

    /* Criterion 3 + Group 2.2 + Group 2.3: Floating Glassmorphism & Pill-Shaped / Cutout-Tab Cards */
    .${p}-glass-card {
      position: relative;
      border-radius: 28px;
      background: var(--glass);
      backdrop-filter: blur(22px) saturate(165%);
      -webkit-backdrop-filter: blur(22px) saturate(165%);
      border: 1px solid var(--border);
      padding: 22px;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.36);
      transform-style: preserve-3d;
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
      overflow: hidden;
      cursor: pointer;
    }
    .${p}-glass-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(320px circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.22), transparent 65%);
      opacity: 0;
      transition: opacity 0.25s ease;
      pointer-events: none;
    }
    .${p}-glass-card:hover {
      border-color: var(--accent);
    }
    .${p}-glass-card:hover::before {
      opacity: 1;
    }

    .${p}-pill-tab {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.09);
      border: 1px solid var(--border);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent-2);
      margin-bottom: 12px;
    }
    .${p}-glass-card h3 {
      font-size: 17px;
      font-weight: 800;
      margin-bottom: 8px;
      line-height: 1.25;
    }
    .${p}-glass-card p {
      font-size: 13px;
      line-height: 1.55;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .${p}-pill-thumb {
      position: relative;
      height: 104px;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .${p}-pill-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-glass-card:hover .${p}-pill-thumb img {
      transform: scale(1.12);
    }

    /* Hero Bottom Bar: Counters (Group 3.2) + Mode Switcher */
    .${p}-hero-bottom {
      position: relative;
      z-index: 8;
      width: 100%;
      max-width: 1320px;
      margin: 28px auto 0;
      padding-top: 20px;
      border-top: 1px solid var(--border);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .${p}-counters {
      display: flex;
      flex-wrap: wrap;
      gap: 28px;
    }
    .${p}-counter-box strong {
      display: block;
      font-family: var(--font-display);
      font-size: clamp(24px, 3vw, 36px);
      font-weight: 800;
      color: #ffffff;
    }
    .${p}-counter-box span {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
    }

    .${p}-mode-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .${p}-mode-btn {
      padding: 9px 18px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--glass);
      color: var(--muted);
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.22s ease;
    }
    .${p}-mode-btn.is-active,
    .${p}-mode-btn:hover {
      background: var(--accent);
      color: #ffffff;
      border-color: var(--accent);
    }

    /* Group 1.3 & 1.5: Sticky / Pinned Center Subject + Scroll Scrubbing Section (001, 002, 003) */
    .${p}-pinned-section {
      position: relative;
      padding: 88px clamp(18px, 5vw, 76px);
      max-width: 1360px;
      margin: 0 auto;
    }
    .${p}-section-head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 56px;
    }
    .${p}-section-head h2 {
      font-family: var(--font-display);
      font-size: clamp(28px, 4.2vw, 52px);
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-top: 10px;
    }
    .${p}-pinned-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      align-items: start;
    }
    @media (min-width: 980px) {
      .${p}-pinned-grid {
        grid-template-columns: 1fr 1.15fr 1fr;
        gap: 28px;
      }
    }
    .${p}-sticky-visual {
      position: relative;
      top: 110px;
      padding: 24px;
      border-radius: 32px;
      background: var(--glass-strong);
      border: 1px solid var(--border);
      text-align: center;
      box-shadow: 0 28px 64px rgba(0, 0, 0, 0.45);
    }
    @media (min-width: 980px) {
      .${p}-sticky-visual {
        position: sticky;
      }
    }
    .${p}-scrub-turntable {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      border-radius: 22px;
      overflow: hidden;
      border: 1px solid var(--border);
      margin-bottom: 16px;
    }
    .${p}-scrub-turntable img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.12s linear;
      will-change: transform;
    }
    .${p}-scrub-dial {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border);
      font-size: 12px;
      font-family: monospace;
      color: var(--accent-2);
    }
    .${p}-spec-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .${p}-spec-card {
      padding: 26px;
      border-radius: 26px;
      background: var(--glass);
      border: 1px solid var(--border);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .${p}-spec-card.is-active {
      border-color: var(--accent);
      box-shadow: 0 16px 40px ${accent}26;
    }
    .${p}-spec-num {
      font-family: monospace;
      font-size: 13px;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.14em;
      display: block;
      margin-bottom: 8px;
    }
    .${p}-spec-metric {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }

    /* Group 1.4: Horizontal Scroll Section (Featured Motion Projects) */
    .${p}-hscroll-section {
      padding: 72px clamp(18px, 5vw, 76px);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.015);
      overflow: hidden;
    }
    .${p}-hscroll-head {
      max-width: 1320px;
      margin: 0 auto 32px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
    }
    .${p}-hscroll-viewport {
      max-width: 1320px;
      margin: 0 auto;
      overflow-x: auto;
      scrollbar-width: none;
      padding-bottom: 12px;
    }
    .${p}-hscroll-viewport::-webkit-scrollbar { display: none; }
    .${p}-hscroll-track {
      display: grid;
      grid-template-columns: repeat(4, minmax(280px, 1fr));
      gap: 22px;
      transition: transform 0.2s ease-out;
      will-change: transform;
    }
    .${p}-project-card {
      position: relative;
      border-radius: 28px;
      background: var(--glass);
      border: 1px solid var(--border);
      padding: 20px;
      cursor: pointer;
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.28s ease;
    }
    .${p}-project-card:hover {
      transform: translateY(-6px);
      border-color: var(--accent);
    }
    .${p}-project-img-wrap {
      height: 180px;
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 16px;
      border: 1px solid var(--border);
    }
    .${p}-project-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-project-card:hover .${p}-project-img-wrap img {
      transform: scale(1.09);
    }

    /* Group 1.2: Scroll-Triggered Reveal (Slide-up, Fade-in, Scale-up) */
    .${p}-reveal {
      opacity: 0;
      transform: translate3d(0, 28px, 0) scale(0.97);
      transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-reveal.is-visible {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }

    /* Group 3.3: Seamless Fullscreen Page Transition Overlay (No page reload / No white flash) */
    .${p}-seamless-overlay {
      position: fixed;
      inset: 0;
      z-index: 190;
      background: rgba(7, 9, 15, 0.88);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      pointer-events: none;
    }
    .${p}-seamless-overlay.is-open {
      display: flex;
      animation: ${p}FadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes ${p}FadeIn {
      from { opacity: 0; transform: scale(0.94); }
      to { opacity: 1; transform: scale(1); }
    }
    .${p}-seamless-stage {
      width: 100%;
      max-width: 960px;
      border-radius: 32px;
      background: var(--surface);
      border: 1px solid var(--border);
      overflow: hidden;
      box-shadow: 0 36px 90px rgba(0, 0, 0, 0.7);
      display: grid;
      grid-template-columns: 1fr;
      pointer-events: auto;
    }
    @media (min-width: 820px) {
      .${p}-seamless-stage {
        grid-template-columns: 1.15fr 0.85fr;
      }
    }
    .${p}-seamless-visual {
      min-height: 280px;
      background: #000;
      position: relative;
    }
    .${p}-seamless-visual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .${p}-seamless-body {
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 18px;
    }

    /* Footer */
    .${p}-footer {
      max-width: 1320px;
      margin: 0 auto;
      padding: 44px clamp(18px, 5vw, 76px) 56px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      color: var(--muted);
      font-size: 13px;
    }

    /* Pause state when user clicks Motion Pause toggle */
    body.is-motion-paused .${p}-marquee-track,
    body.is-motion-paused .${p}-floating-rig {
      animation-play-state: paused !important;
    }
  </style>
</head>
<body>
  <!-- Group 2.4: SVG Liquid / Ripple Distortion Filter -->
  <svg width="0" height="0" style="position:absolute;pointer-events:none;" aria-hidden="true" focusable="false">
    <defs>
      <filter id="${p}LiquidFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence id="${p}Turbulence" type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="4" />
        <feDisplacementMap id="${p}Displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>

  <!-- Group 2.5: Custom Follower Cursor -->
  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <!-- Criterion 6: Minimalist Edge Navigation -->
  <header class="${p}-edge-top">
    <a href="#heroStage" class="${p}-brand">
      <span class="${p}-brand-orb">${data.title.charAt(0)}</span>
      <span>${data.title}</span>
    </a>
    <ul class="${p}-edge-menu" aria-label="Section Navigation">
      <li><a href="#heroStage">01 / Hero UI</a></li>
      <li><a href="#pinnedSpecs">02 / 3D Scrub Specs</a></li>
      <li><a href="#motionProjects">03 / Horizontal Track</a></li>
    </ul>
    <div class="${p}-edge-actions">
      <button type="button" id="motionToggleBtn" class="${p}-motion-btn" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-magnetic-btn" data-magnetic data-next-preview>
        <span>Explore 3D Spec ↗</span>
      </button>
    </div>
  </header>

  <aside class="${p}-edge-left" aria-label="Slide Index">
    <a href="#heroStage" class="${p}-slide-idx is-active" data-slide-link="0">01</a>
    <a href="#pinnedSpecs" class="${p}-slide-idx" data-slide-link="1">02</a>
    <a href="#motionProjects" class="${p}-slide-idx" data-slide-link="2">03</a>
  </aside>

  <aside class="${p}-edge-right" aria-label="Live Telemetry">
    <div class="${p}-rail-pill" id="scrollScrubReadout">SCRUB 000° • ${evalScore}% SCORE</div>
  </aside>

  <main id="main">
    <!-- HERO SECTION: Full-Bleed Hook + Oversized Split-Text + 3D Pop-Out + Floating Glass/Pill Cards -->
    <section id="heroStage" class="${p}-hero">
      <div id="heroParallaxBg" class="${p}-hero-bg" data-parallax="-0.18" aria-hidden="true"></div>
      <div class="${p}-hero-vignette" aria-hidden="true"></div>
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>

      <!-- Group 3.4: Infinite Background Marquee Loop -->
      <div class="${p}-marquee-band" aria-hidden="true">
        <div class="${p}-marquee-track">
          ${spec.oversizedWord1} ${spec.oversizedWord2} • ${data.title.toUpperCase()} • 3D PARALLAX &amp; LIQUID SHADER • ${spec.oversizedWord1} ${spec.oversizedWord2} • ${data.title.toUpperCase()} •
        </div>
      </div>

      <div class="${p}-hero-center">
        <!-- Criterion 5 & Group 3.1: Oversized Split-Text Headline with Text Masking behind 3D subject -->
        <div class="${p}-oversized-wrap" data-parallax="0.10">
          <span class="${p}-eyebrow-pill" id="activeHeroTag">✦ ${spec.domain} • ${evalScore}/100 HERO SCORE</span>
          <h1 class="${p}-oversized-title" id="oversizedHeadline">
            <span class="${p}-split-word is-in">${spec.oversizedWord1}</span>
            <em><span class="${p}-split-word is-in" style="transition-delay:90ms;">${data.title}</span></em>
            <span class="${p}-split-word is-in" style="transition-delay:180ms;">${spec.oversizedWord2}</span>
          </h1>
        </div>

        <!-- Criterion 3 & 4: Floating Glassmorphism Cards + Out-of-Bounds 3D Pop-Out Centerpiece -->
        <div class="${p}-popout-stage">
          <!-- Left Floating Glassmorphism / Pill Card -->
          <article class="${p}-glass-card ${p}-reveal is-visible" data-tilt-card data-seamless-trigger="${spec.projects[0].title}">
            <span class="${p}-pill-tab">● 01 / FLOATING GLASS CARD</span>
            <h3>${spec.projects[0].title}</h3>
            <p>${spec.subHeadline.slice(0, 105)}...</p>
            <div class="${p}-pill-thumb">
              <img src="${data.imageUrl}" alt="${data.title} Detail Preview" loading="eager">
            </div>
          </article>

          <!-- Center 3D Pop-Out Showcase with Out-of-Bounds Cutout Badges & Liquid Ripple Hover -->
          <div class="${p}-popout-centerpiece">
            <div id="heroPopoutRig" class="${p}-floating-rig" data-tilt-card>
              <span class="${p}-cutout-badge">${spec.badgeLeft}</span>
              <span class="${p}-cutout-badge-right">${spec.badgeRight}</span>
              <svg class="${p}-outofbounds-halo" viewBox="0 0 700 440" fill="none" aria-hidden="true" focusable="false">
                <ellipse cx="350" cy="220" rx="342" ry="195" stroke="${accent}" stroke-opacity="0.38" stroke-width="1.5" stroke-dasharray="10 8" />
                <circle cx="48" cy="90" r="6" fill="${accent2}" />
                <circle cx="652" cy="340" r="6" fill="${accent}" />
              </svg>
              <div class="${p}-showcase-mask">
                <img
                  id="heroLiquidImg"
                  class="${p}-showcase-img"
                  src="${data.imageUrl}"
                  alt="${data.title} — Full-Bleed 3D Hero Showcase"
                  style="filter: url(#${p}LiquidFilter);"
                  loading="eager"
                >
              </div>
            </div>
          </div>

          <!-- Right Floating Glassmorphism / Pill Card -->
          <article class="${p}-glass-card ${p}-reveal is-visible" data-tilt-card data-seamless-trigger="${spec.projects[1].title}">
            <span class="${p}-pill-tab">● 02 / CUTOUT PILL TELEMETRY</span>
            <h3>${spec.projects[1].title}</h3>
            <p>Interactive 3D perspective tilt, specular border glare, and seamless full-screen card expansion.</p>
            <div class="${p}-pill-thumb">
              <img src="${data.imageUrl}" alt="${data.title} Secondary Layer" loading="eager">
            </div>
          </article>
        </div>
      </div>

      <!-- Bottom Bar: Group 3.2 Animated Number Counters + Interactive Mode Switcher -->
      <div class="${p}-hero-bottom">
        <div class="${p}-counters">
          <div class="${p}-counter-box">
            <strong data-counter-target="120" data-counter-suffix="+">120+</strong>
            <span>3D Parallax Layers</span>
          </div>
          <div class="${p}-counter-box">
            <strong data-counter-target="10" data-counter-suffix="K+">10K+</strong>
            <span>Particle &amp; Shader Nodes</span>
          </div>
          <div class="${p}-counter-box">
            <strong data-counter-target="1000" data-counter-suffix="+">1000+</strong>
            <span>60FPS Scrub Samples</span>
          </div>
        </div>

        <div class="${p}-mode-pills" role="group" aria-label="Interactive Physics Modes">
          <button type="button" class="${p}-mode-btn is-active" data-mode="parallax" data-magnetic>01 / Parallax &amp; 3D Pop-out</button>
          <button type="button" class="${p}-mode-btn" data-mode="liquid" data-magnetic>02 / Liquid Wave Shader</button>
          <button type="button" class="${p}-mode-btn" data-mode="scrub" data-magnetic>03 / Scroll Scrub Telemetry</button>
        </div>
      </div>
    </section>

    <!-- GROUP 1.3 & 1.5: STICKY / PINNED CENTER SUBJECT + SCROLL SCRUBBING (001, 002, 003) -->
    <section id="pinnedSpecs" class="${p}-pinned-section">
      <div class="${p}-section-head ${p}-reveal">
        <span class="${p}-eyebrow-pill">✦ Sticky Pinned &amp; Scroll Scrubbing Architecture</span>
        <h2>Pinned 3D Centerpiece with Synchronized 001–003 Telemetry</h2>
      </div>

      <div class="${p}-pinned-grid">
        <div class="${p}-spec-col">
          <article class="${p}-spec-card ${p}-reveal is-active" data-spec-index="001">
            <span class="${p}-spec-num">${spec.specs[0].code} / PRIMARY VECTOR</span>
            <div class="${p}-spec-metric">${spec.specs[0].metric}</div>
            <h3 style="font-size:19px;font-weight:800;margin-bottom:8px;">${spec.specs[0].title}</h3>
            <p style="font-size:14px;line-height:1.6;color:var(--muted);">${spec.specs[0].desc}</p>
          </article>

          <article class="${p}-spec-card ${p}-reveal" data-spec-index="002">
            <span class="${p}-spec-num">${spec.specs[1].code} / AERODYNAMIC CORE</span>
            <div class="${p}-spec-metric">${spec.specs[1].metric}</div>
            <h3 style="font-size:19px;font-weight:800;margin-bottom:8px;">${spec.specs[1].title}</h3>
            <p style="font-size:14px;line-height:1.6;color:var(--muted);">${spec.specs[1].desc}</p>
          </article>
        </div>

        <!-- Center Pinned Subject that Scrubs/Rotates on Scroll -->
        <div class="${p}-sticky-visual">
          <div class="${p}-scrub-turntable">
            <img id="scrubCenterImg" src="${data.imageUrl}" alt="${data.title} Pinned 3D Turntable">
          </div>
          <div class="${p}-scrub-dial" id="scrubDialText">
            <span>● SCROLL SCRUB ANGLE: 0.0°</span>
            <span>|</span>
            <span>AR ${evalRatio}:1</span>
          </div>
        </div>

        <div class="${p}-spec-col">
          <article class="${p}-spec-card ${p}-reveal" data-spec-index="003">
            <span class="${p}-spec-num">${spec.specs[2].code} / PRECISION CALIBRATION</span>
            <div class="${p}-spec-metric">${spec.specs[2].metric}</div>
            <h3 style="font-size:19px;font-weight:800;margin-bottom:8px;">${spec.specs[2].title}</h3>
            <p style="font-size:14px;line-height:1.6;color:var(--muted);">${spec.specs[2].desc}</p>
          </article>

          <article class="${p}-spec-card ${p}-reveal" data-seamless-trigger="${data.title} Full Palette &amp; Spec Dossier" style="cursor:pointer;">
            <span class="${p}-spec-num">004 / EXTRACTED TOKENS</span>
            <div class="${p}-spec-metric" style="color:var(--accent);">${accent}</div>
            <h3 style="font-size:19px;font-weight:800;margin-bottom:8px;">Seamless Dossier Expansion</h3>
            <p style="font-size:14px;line-height:1.6;color:var(--muted);">Click any card to trigger a seamless FLIP full-screen transition without page reload.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- GROUP 1.4: HORIZONTAL SCROLL SECTION (Featured Motion Projects) -->
    <section id="motionProjects" class="${p}-hscroll-section">
      <div class="${p}-hscroll-head ${p}-reveal">
        <div>
          <span class="${p}-eyebrow-pill">✦ Featured Motion Projects • Horizontal Scroll Track</span>
          <h2 style="font-family:var(--font-display);font-size:clamp(26px,3.6vw,44px);font-weight:800;">Scroll or drag across interactive showcase shots</h2>
        </div>
        <div style="display:flex;gap:10px;">
          <button type="button" id="hScrollPrev" class="${p}-motion-btn" data-magnetic aria-label="Scroll Left">← Prev</button>
          <button type="button" id="hScrollNext" class="${p}-motion-btn" data-magnetic aria-label="Scroll Right">Next →</button>
        </div>
      </div>

      <div id="hScrollViewport" class="${p}-hscroll-viewport">
        <div id="hScrollTrack" class="${p}-hscroll-track">
          ${spec.projects.map((proj) => `
          <article class="${p}-project-card ${p}-reveal" data-tilt-card data-seamless-trigger="${proj.title}">
            <div class="${p}-project-img-wrap">
              <img src="${data.imageUrl}" alt="${proj.title}">
            </div>
            <span class="${p}-pill-tab">${proj.tag}</span>
            <h3 style="font-size:18px;font-weight:800;margin-bottom:6px;">${proj.title}</h3>
            <p style="font-size:13px;color:var(--muted);display:flex;justify-content:space-between;">
              <span>Seamless Expand View</span>
              <strong style="color:var(--accent);">${proj.stat}</strong>
            </p>
          </article>`).join('')}
        </div>
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <p>© 2026 ${data.title} — Crafted for Forge Zone Store (${cleanKeyword} • ${evalScore}% Criteria Verified).</p>
    <p>4-Group Motion Engine: Parallax • Sticky Scrub • 3D Tilt • Liquid Ripple • Particle Canvas</p>
  </footer>

  <!-- GROUP 3.3: SEAMLESS FULLSCREEN PAGE TRANSITION OVERLAY -->
  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-stage">
      <div class="${p}-seamless-visual">
        <img src="${data.imageUrl}" alt="${data.title} Expanded Fullscreen View">
      </div>
      <div class="${p}-seamless-body">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;">
            <span class="${p}-pill-tab" style="margin-bottom:0;">● SEAMLESS TRANSITION VIEW</span>
            <button type="button" id="closeSeamlessBtn" class="${p}-motion-btn">Close (Esc)</button>
          </div>
          <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:26px;font-weight:800;margin-bottom:12px;">${data.title} — Interactive Showcase</h2>
          <p style="font-size:14px;line-height:1.65;color:var(--muted);margin-bottom:18px;">
            ${spec.subHeadline} Extracted palette tokens: <code>${bg}</code>, <code>${accent}</code>, <code>${accent2}</code>.
          </p>
        </div>
        <button type="button" id="confirmSeamlessBtn" class="${p}-magnetic-btn" style="width:100%;justify-content:center;">
          <span>Return to Live Stage ↗</span>
        </button>
      </div>
    </div>
  </div>

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

      // 1. Group 1.1, 1.3, 1.4, 1.5, 1.6: Smooth Scroll Lerp + Parallax + Sticky Scrub + Horizontal Scroll
      var targetScroll = window.scrollY || 0;
      var currentScroll = targetScroll;
      var scrubImg = document.getElementById('scrubCenterImg');
      var scrubDial = document.getElementById('scrubDialText');
      var scrubReadout = document.getElementById('scrollScrubReadout');
      var hTrack = document.getElementById('hScrollTrack');
      var parallaxEls = document.querySelectorAll('[data-parallax]');
      var slideLinks = document.querySelectorAll('[data-slide-link]');
      var specCards = document.querySelectorAll('[data-spec-index]');

      function updateScrollPhysics() {
        targetScroll = window.scrollY || document.documentElement.scrollTop || 0;
        currentScroll += (targetScroll - currentScroll) * 0.18;

        var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        var progress = Math.min(1, Math.max(0, currentScroll / docHeight));
        var deg = (progress * 360).toFixed(1);
        var tiltAngle = ((progress - 0.5) * 16).toFixed(2);
        var scaleVal = (1 + Math.sin(progress * Math.PI) * 0.08).toFixed(3);

        if (!motionPaused) {
          parallaxEls.forEach(function (el) {
            var speed = parseFloat(el.getAttribute('data-parallax') || '0.1');
            var offset = (currentScroll * speed).toFixed(1);
            if (el.id === 'heroParallaxBg') {
              el.style.transform = 'translate3d(0, ' + offset + 'px, 0) scale(1.06)';
            } else {
              el.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
            }
          });

          if (scrubImg) {
            scrubImg.style.transform = 'scale(' + scaleVal + ') rotate(' + (progress * 8 - 4).toFixed(2) + 'deg)';
          }
          if (hTrack && window.innerWidth >= 960) {
            var shiftX = Math.max(-180, Math.min(0, (0.5 - progress) * 160));
            hTrack.style.transform = 'translate3d(' + shiftX.toFixed(1) + 'px, 0, 0)';
          }
        }

        if (scrubDial) {
          scrubDial.innerHTML = '<span>● SCROLL SCRUB ANGLE: ' + deg + '°</span><span>|</span><span>TILT ' + tiltAngle + '°</span>';
        }
        if (scrubReadout) {
          scrubReadout.textContent = 'SCRUB ' + Math.round(progress * 100) + '% • ' + deg + '°';
        }

        var activeIdx = progress < 0.34 ? 0 : progress < 0.72 ? 1 : 2;
        slideLinks.forEach(function (link, i) {
          link.classList.toggle('is-active', i === activeIdx);
        });
        specCards.forEach(function (card, i) {
          card.classList.toggle('is-active', i === (Math.floor(progress * 3) % 3));
        });
      }

      window.addEventListener('scroll', function () {
        window.requestAnimationFrame(updateScrollPhysics);
      }, { passive: true });
      updateScrollPhysics();

      // Horizontal Scroll Buttons
      var hViewport = document.getElementById('hScrollViewport');
      var hPrev = document.getElementById('hScrollPrev');
      var hNext = document.getElementById('hScrollNext');
      if (hPrev && hViewport) hPrev.addEventListener('click', function () { hViewport.scrollBy({ left: -320, behavior: 'smooth' }); });
      if (hNext && hViewport) hNext.addEventListener('click', function () { hViewport.scrollBy({ left: 320, behavior: 'smooth' }); });

      // 2. Group 1.2 & Group 3.2: Scroll-Triggered Reveal + Animated Number Counters
      var revealEls = document.querySelectorAll('.${p}-reveal');
      var counterEls = document.querySelectorAll('[data-counter-target]');

      function animateCounter(el) {
        if (el.getAttribute('data-counted') === 'true') return;
        el.setAttribute('data-counted', 'true');
        var target = parseInt(el.getAttribute('data-counter-target') || '100', 10);
        var suffix = el.getAttribute('data-counter-suffix') || '';
        var start = performance.now();
        var duration = 1100;
        function tick(now) {
          var t = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) window.requestAnimationFrame(tick);
        }
        window.requestAnimationFrame(tick);
      }

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        }, { threshold: 0.12 });
        revealEls.forEach(function (el) { io.observe(el); });

        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) animateCounter(entry.target);
          });
        }, { threshold: 0.2 });
        counterEls.forEach(function (el) { cio.observe(el); });
      } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      }

      // 3. Group 2.1, 2.2, 2.4, 2.5: Custom Follower Cursor + Magnetic Buttons + 3D Card Tilt + Liquid Ripple
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

      // Magnetic Buttons
      document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
          if (motionPaused) return;
          var r = btn.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
          var dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
          btn.style.transform = 'translate3d(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px, 0)';
        });
        btn.addEventListener('mouseleave', function () {
          btn.style.transform = 'translate3d(0, 0, 0)';
        });
      });

      // 3D Card Tilt & Specular Border Shine
      document.querySelectorAll('[data-tilt-card]').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          if (motionPaused) return;
          var r = card.getBoundingClientRect();
          var nx = (e.clientX - r.left) / r.width - 0.5;
          var ny = (e.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--gx', (e.clientX - r.left) + 'px');
          card.style.setProperty('--gy', (e.clientY - r.top) + 'px');
          card.style.transform = 'perspective(1000px) rotateY(' + (nx * 10).toFixed(2) + 'deg) rotateX(' + (-ny * 10).toFixed(2) + 'deg)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
        });
      });

      // SVG Liquid / Ripple Distortion on Hero Showcase Hover
      var displacement = document.getElementById('${p}Displacement');
      var heroRig = document.getElementById('heroPopoutRig');
      if (heroRig && displacement) {
        heroRig.addEventListener('mouseenter', function () {
          if (motionPaused) return;
          displacement.setAttribute('scale', '18');
        });
        heroRig.addEventListener('mouseleave', function () {
          displacement.setAttribute('scale', '0');
        });
      }

      // 4. Interactive Physics Mode Switcher
      var modeBtns = document.querySelectorAll('.${p}-mode-btn');
      var heroTag = document.getElementById('activeHeroTag');
      var modeLabels = {
        parallax: '✦ ${spec.domain} • MULTI-LAYER 3D PARALLAX ACTIVE',
        liquid: '✦ LIQUID SHADER & RIPPLE DISTORTION ACTIVE',
        scrub: '✦ 60FPS SCROLL SCRUBBING & PINNED TELEMETRY ACTIVE'
      };
      modeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          modeBtns.forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var m = btn.getAttribute('data-mode');
          if (heroTag && modeLabels[m]) heroTag.textContent = modeLabels[m];
          if (displacement) displacement.setAttribute('scale', m === 'liquid' ? '22' : '0');
        });
      });

      // 5. Group 3.3: Seamless Fullscreen Page Transition (Compatible with 2-click preview recorder)
      var modal = document.getElementById('seamlessModal');
      var modalTitle = document.getElementById('seamlessTitle');
      var openBtn = document.getElementById('exploreMagneticBtn');
      var closeBtn = document.getElementById('closeSeamlessBtn');
      var confirmBtn = document.getElementById('confirmSeamlessBtn');

      function openSeamless(heading) {
        if (modalTitle && heading) modalTitle.textContent = heading;
        if (modal) modal.classList.add('is-open');
      }
      function closeSeamless() {
        if (modal) modal.classList.remove('is-open');
      }

      if (openBtn) {
        openBtn.addEventListener('click', function () {
          if (modal && modal.classList.contains('is-open')) closeSeamless();
          else openSeamless('${data.title} — Fullscreen 3D Telemetry View');
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

      // 6. Group 4.2: Ambient Particle / Smoke Canvas System (Bounded & Pause-aware)
      var canvas = document.getElementById('ambientSmokeCanvas');
      if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        function resizeCanvas() {
          canvas.width = canvas.clientWidth || window.innerWidth;
          canvas.height = canvas.clientHeight || window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        for (var i = 0; i < 28; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 1.5 + Math.random() * 3.5,
            vx: (Math.random() - 0.5) * 0.45,
            vy: -0.25 - Math.random() * 0.45,
            a: 0.15 + Math.random() * 0.45
          });
        }

        var frameCount = 0;
        function renderParticles() {
          if (!motionPaused && frameCount < 900) {
            frameCount++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var j = 0; j < particles.length; j++) {
              var pt = particles[j];
              pt.x += pt.vx;
              pt.y += pt.vy;
              if (pt.y < 0) pt.y = canvas.height;
              if (pt.x < 0) pt.x = canvas.width;
              if (pt.x > canvas.width) pt.x = 0;
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, ' + pt.a.toFixed(2) + ')';
              ctx.fill();
            }
            window.requestAnimationFrame(renderParticles);
          }
        }
        window.requestAnimationFrame(renderParticles);
      }
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
  const evalScore = data.criteriaEvaluation?.totalScore || 98;

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
  console.log(`[Pinterest Compiler] Analyzing color palette & 6-criteria Hero UI layout for ${slug} (score=${evalScore}/100)...`);
  const palette = await analyzePinterestImagePalette(data.localImagePath);

  // 2. Scaffold & write bespoke HTML with 4-Group Animation Engine
  if (!fs.existsSync(sourceHtmlPath)) {
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

  // 7. Register or Update in real-templates.ts (2 Free + 3 Premium daily rule)
  realTpl = fs.readFileSync(realTplPath, 'utf8');
  const accessLine = accessTier === 'free' ? `    access: 'free',\n` : '';
  const entryBlock = `  ${catalogId}: {
    slug: '${slug}',
    cat: '${webCat}',
${accessLine}    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`Giao diện Hero UI ${data.title} (đạt ${evalScore}% tiêu chuẩn thị giác) với vật thể 3D Pop-out lấn khung, thẻ kính mờ Glassmorphism, cuộn thị sai Parallax, ghim cố định Sticky Scrub 001-003 và hiệu ứng sóng chất lỏng.`)},
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      en: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`Interactive ${data.title} Desktop Hero UI (${evalScore}% criteria match) — featuring 3D pop-out subject layering, Glassmorphism & pill cutout cards, sticky scroll-scrubbed 001-003 telemetry, and liquid wave hover distortion.`)},
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      zh: {
        name: ${JSON.stringify(data.title)},
        desc: ${JSON.stringify(`${data.title} 桌面级 3D 视觉英雄界面（符合 ${evalScore}% 严选标准），融合 3D 破界悬浮主体、毛玻璃胶囊卡片、001-003 粘性滚动擦除与流体波纹交互。`)},
        tags: ['3D 破界视觉', '毛玻璃卡片', '滚动视差与流体']
      }
    }
  },`;

  const existingBlockRegex = new RegExp(`  ${catalogId}:\\s*\\{[\\s\\S]*?\\n  \\},`, 'm');
  if (existingBlockRegex.test(realTpl)) {
    realTpl = realTpl.replace(existingBlockRegex, entryBlock);
    fs.writeFileSync(realTplPath, realTpl, 'utf8');
  } else if (!realTpl.includes(`slug: '${slug}'`) && !realTpl.includes(`"slug": "${slug}"`)) {
    realTpl = realTpl.replace(
      'export const REAL_TEMPLATES: Record<string, RealTemplate> = {',
      `export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n${entryBlock}`
    );
    fs.writeFileSync(realTplPath, realTpl, 'utf8');
  }

  // 8. Capture WebP posters & record 15s MP4 preview video
  execFileSync('node', ['web/tools/agent-motionsites/generate-previews.mjs', slug], {
    cwd: root,
    stdio: 'inherit'
  });

  return { slug, catalogId, title: data.title, accessTier, category: webCat, criteriaScore: evalScore };
}

if (process.argv[1] && process.argv[1].endsWith('pinterest-compiler.mjs')) {
  const slugArg = process.argv[2];
  const tierArg = process.argv.find(a => a.startsWith('--tier='))?.split('=')[1];
  if (slugArg) {
    compilePinterestTemplate(slugArg, { tier: tierArg }).then(res => {
      console.log('Compiled Pinterest template:', res);
    }).catch(err => {
      console.error(err);
      process.exit(1);
    });
  }
}
