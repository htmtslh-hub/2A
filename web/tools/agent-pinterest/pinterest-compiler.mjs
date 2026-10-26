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

export async function analyzePinterestImagePalette(localImagePath) {
  const fallback = {
    bgHex: '#090c14',
    surfaceHex: '#121826',
    accentHex: '#d97706',
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
    return {
      bgHex: rgbToHex(...stats.bg),
      surfaceHex: rgbToHex(Math.min(255, stats.bg[0] + 16), Math.min(255, stats.bg[1] + 18), Math.min(255, stats.bg[2] + 24)),
      accentHex: rgbToHex(...stats.acc),
      accent2Hex: rgbToHex(...stats.sec),
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
  const slug = String(data.slug || '').toLowerCase();
  if (slug === 'break-code' || slug === 'startup-devkit') return 'portfolio';
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

/**
 * Selects one of 5 distinct architectural blueprints so NO two Pinterest templates share the same layout!
 * Blueprint 0: Carbon Superbike / Cycle Atelier (Asymmetric Diagonal 3D Bike Pop-Out + Left Vertical Telemetry Ruler)
 * Blueprint 1: Supersonic Aviation Sky Hero (Full-Bleed Cloud Horizon + 3D Aircraft Pop-Out Overlapping Divider + 3 Bottom Pill Destination Cards)
 * Blueprint 2: Vibrant Orange/Cyan Poster Stage (Giant Center Masked Headline + 3D Cyan Athlete Figure Overlapping Type + Corner Replay Pod)
 * Blueprint 3: Lunar Oasis Architectural Glass Villa (Editorial Left Split-Text + Right Stacked 3D Tilting Glassmorphism Villa Cutout Cards + Pool Ripple)
 * Blueprint 4: AquaCosmos Zero-G Water Space HUD (Deep Ocean/Space Nebula + Floating Astronaut/Hydro Sphere + Circular Orbital Pods)
 */
function selectBlueprintIndex(data) {
  const s = String(data.slug || '').toLowerCase();
  if (s === 'forest-pulse') return 0;
  if (s === 'startup-devkit') return 1;
  if (s === 'break-code') return 2;
  if (s === 'launch-video') return 3;
  if (s === 'geospace-canvas') return 4;
  let sum = 0;
  for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i);
  return sum % 5;
}

const BLUEPRINTS = [
  // BLUEPRINT 0: CARBON MONOCOQUE & SUPERBIKE TELEMETRY (Asymmetric Diagonal Pop-Out + Smoke Streamlines)
  {
    id: 'carbon-atelier',
    brandTitle: 'Sarto Monza Atelier',
    navStyle: 'minimal-dark-atelier',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,600;1,700&family=Space+Grotesk:wght@400;500;700&display=swap',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontSerif: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Space Grotesk', sans-serif",
    bg: '#080706',
    surface: '#141210',
    glass: 'rgba(24, 20, 17, 0.72)',
    fg: '#fafaf9',
    muted: '#a8a29e',
    accent: '#d4956a',
    accent2: '#f59e0b',
    heroBgGrad: 'radial-gradient(circle at 68% 42%, rgba(212, 149, 106, 0.24) 0%, rgba(20, 18, 16, 0.88) 58%, #080706 100%)',
    marqueeText: 'AUTOCLAVE CARBON MONOCOQUE • VENETO WIND TUNNEL • 680G CHASSIS • 0.19 CX DRAG • ',
    heroLayout: 'asymmetric-bike',
    headlineTop: 'PASSION &',
    headlineBottom: 'INSTINCT',
    headlineSub: 'Hand-laminated T1100G carbon monocoque chassis sculpted in Veneto — engineered with wind-tunnel smoke telemetry and sub-millimeter laser mitering.',
    centerSvg: (acc, acc2) => `
      <svg viewBox="0 0 820 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="carbonBronze" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f3c6a4"/>
            <stop offset="45%" stop-color="${acc}"/>
            <stop offset="100%" stop-color="#3b2618"/>
          </linearGradient>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${acc}" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="${acc}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- Rear & Front Aero Carbon Wheels popping out of bounds -->
        <circle cx="195" cy="310" r="145" fill="url(#wheelGlow)"/>
        <circle cx="625" cy="310" r="145" fill="url(#wheelGlow)"/>
        <circle cx="195" cy="310" r="118" stroke="url(#carbonBronze)" stroke-width="22" stroke-dasharray="6 3"/>
        <circle cx="195" cy="310" r="94" stroke="#292524" stroke-width="14"/>
        <circle cx="625" cy="310" r="118" stroke="url(#carbonBronze)" stroke-width="22" stroke-dasharray="6 3"/>
        <circle cx="625" cy="310" r="94" stroke="#292524" stroke-width="14"/>
        <!-- 3D Monocoque Frame Tubes -->
        <path d="M195 310 L355 310 L495 145 L315 155 Z" stroke="url(#carbonBronze)" stroke-width="24" stroke-linejoin="round" stroke-linecap="round"/>
        <path d="M355 310 L295 110" stroke="url(#carbonBronze)" stroke-width="20" stroke-linecap="round"/>
        <path d="M475 110 L625 310" stroke="url(#carbonBronze)" stroke-width="22" stroke-linecap="round"/>
        <!-- Aero Cockpit & Saddle -->
        <path d="M445 110 L545 110 C568 110 575 135 550 142" stroke="#fafaf9" stroke-width="14" stroke-linecap="round"/>
        <path d="M250 105 L330 105" stroke="#fafaf9" stroke-width="14" stroke-linecap="round"/>
        <!-- Crankset Rotor -->
        <circle cx="355" cy="310" r="34" fill="#1c1917" stroke="${acc}" stroke-width="6"/>
        <circle cx="195" cy="310" r="16" fill="${acc}"/>
        <circle cx="625" cy="310" r="16" fill="${acc}"/>
      </svg>`,
    specs: [
      { code: '001', label: 'TORSIONAL LAYUP', metric: '680g', title: 'T1100G Autoclave Monocoque', desc: 'Aerospace-grade unidirectional carbon plies cured at 7 bar pressure for zero-loss sprint transfer.' },
      { code: '002', label: 'AERO COCKPIT', metric: '0.19 Cx', title: 'Laminar Wake Suppression', desc: 'Truncated NACA airfoil tube profiles tested across 120+ hours in the Milano boundary-layer tunnel.' },
      { code: '003', label: 'BESPOKE LASER', metric: '0.1 mm', title: 'Biometric Tube Mitering', desc: 'Custom head-tube and bottom-bracket angles calibrated to each rider’s saddle torque signature.' }
    ],
    projects: [
      { tag: '01 / WIND TUNNEL', title: 'Raso Tri-Spoke Aero Concept', stat: '18.4W Saved', color: '#d4956a' },
      { tag: '02 / DOLOMITE PASS', title: 'Seta Plus Climbing Spec', stat: '6.1 kg Complete', color: '#f59e0b' },
      { tag: '03 / VELODROME', title: 'Lampo Pursuit Monocoque', stat: '1480W Stiffness', color: '#a8a29e' },
      { tag: '04 / RAW ATELIER', title: 'Hand-Brushed Copper Leaf', stat: 'Bespoke 1-of-1', color: '#e7e5e4' }
    ]
  },

  // BLUEPRINT 1: SUPERSONIC AVIATION & SKY CLOUD POP-OUT HERO (Aircraft Overlapping Clouds + Bottom Destination Pill Cards)
  {
    id: 'sky-aviation',
    brandTitle: 'AetherJet Supersonic',
    navStyle: 'airy-horizon-bar',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
    fontDisplay: "'Bebas Neue', sans-serif",
    fontSerif: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
    bg: '#071324',
    surface: '#0d213b',
    glass: 'rgba(13, 33, 59, 0.64)',
    fg: '#f0f9ff',
    muted: '#93c5fd',
    accent: '#38bdf8',
    accent2: '#f43f5e',
    heroBgGrad: 'linear-gradient(180deg, #06152d 0%, #0f3156 48%, #1e4e79 78%, #071324 100%)',
    marqueeText: 'MACH 1.8 SUPERSONIC CHARTER • ZERO-BOOM LAMINAR DELTA • 55,000 FT STRATOSPHERE • ',
    heroLayout: 'sky-aircraft-popout',
    headlineTop: 'EXPLORE THE',
    headlineBottom: 'STRATOSPHERE',
    headlineSub: 'Private Mach 1.8 delta-wing aviation crossing the Atlantic in 3 hours 15 minutes — floating above the cloud deck in whisper-quiet glass cabins.',
    centerSvg: (acc, acc2) => `
      <svg viewBox="0 0 900 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="fuselageGrad" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="55%" stop-color="#bae6fd"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
        </defs>
        <!-- Volumetric Cloud Layer Behind Aircraft -->
        <ellipse cx="240" cy="340" rx="210" ry="54" fill="rgba(255,255,255,0.12)"/>
        <ellipse cx="660" cy="350" rx="240" ry="62" fill="rgba(255,255,255,0.15)"/>
        <!-- 3D Pop-Out Supersonic Delta Jet Crossing Frame Bounds -->
        <path d="M60 250 L840 140 L540 275 L390 365 L350 280 Z" fill="url(#fuselageGrad)" stroke="#ffffff" stroke-width="3"/>
        <path d="M210 230 L640 168 L475 268 Z" fill="#0369a1" fill-opacity="0.55"/>
        <!-- Cockpit Canopy & Sonic Contrail -->
        <ellipse cx="675" cy="164" rx="52" ry="11" transform="rotate(-8 675 164)" fill="#071324" stroke="${acc}" stroke-width="2.5"/>
        <path d="M20 265 Q180 245 350 280" stroke="${acc}" stroke-width="5" stroke-linecap="round" stroke-dasharray="12 8"/>
        <!-- Foreground Cloud Overlapping Wingtip (Depth of Field) -->
        <ellipse cx="460" cy="380" rx="290" ry="48" fill="rgba(240,249,255,0.18)"/>
      </svg>`,
    specs: [
      { code: '001', label: 'CRUISE VELOCITY', metric: 'Mach 1.8', title: 'Low-Boom Chined Nosecone', desc: 'Shaped shockwave dispersion reduces ground signature to a gentle 65 PLdB murmur.' },
      { code: '002', label: 'CEILING ALTITUDE', metric: '55,000 ft', title: 'Stratospheric Panoramic Cabin', desc: 'Curved electrochromic windows reveal the curvature of the Earth above commercial weather.' },
      { code: '003', label: 'RANGE RADIUS', metric: '8,300 km', title: '100% Sustainable Aviation Fuel', desc: 'Twin adaptive-cycle turbofans optimized for transoceanic nonstop routing.' }
    ],
    projects: [
      { tag: 'POPULAR BEACH • 01', title: 'Amalfi Coast Private Heli-Transfer', stat: '3h 10m from NYC', color: '#38bdf8' },
      { tag: 'ISLAND ATOLL • 02', title: 'Bora Bora Overwater Lagoon', stat: '4h 05m from LAX', color: '#0ea5e9' },
      { tag: 'ARCTIC DOME • 03', title: 'Reykjavik Geothermal Retreat', stat: '2h 15m from LON', color: '#f43f5e' },
      { tag: 'DESERT OASIS • 04', title: 'AlUla Mirror Canyon Runway', stat: '2h 40m from ZRH', color: '#fbbf24' }
    ]
  },

  // BLUEPRINT 2: VIBRANT ORANGE & CYAN 3D BIOMECHANICS POSTER STAGE (Inspired by ESPN Michael Jordan WOTD Shot)
  {
    id: 'kinetic-poster',
    brandTitle: 'Apex 240Hz Signature',
    navStyle: 'poster-edge-compass',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap',
    fontDisplay: "'Anton', Impact, sans-serif",
    fontSerif: "'Anton', sans-serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
    bg: '#d95d1e',
    surface: '#b54610',
    glass: 'rgba(20, 14, 10, 0.72)',
    fg: '#ffffff',
    muted: '#ffedd5',
    accent: '#0ea5e9',
    accent2: '#fde047',
    heroBgGrad: 'radial-gradient(circle at 50% 45%, #f9803a 0%, #e06322 52%, #b8430b 100%)',
    marqueeText: 'SIGNATURE MOVES • 240HZ OPTICAL MOCAP • 48.2 INCH VERTICAL • 0.92S HANG-TIME • ',
    heroLayout: 'center-poster-mask',
    headlineTop: 'SIGNATURE',
    headlineBottom: 'FADEAWAY',
    headlineSub: 'Interactive 3D biomechanical sculpture archive dissecting airborne hang-time, apex release angles, and ground-reaction impulse at 240 frames per second.',
    centerSvg: (acc, acc2) => `
      <svg viewBox="0 0 540 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="cyanSculpture" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7dd3fc"/>
            <stop offset="45%" stop-color="#0ea5e9"/>
            <stop offset="100%" stop-color="#0369a1"/>
          </linearGradient>
        </defs>
        <!-- Orbital Telemetry Arc Behind Figure -->
        <path d="M70 430 C130 120 410 120 470 430" stroke="#ffffff" stroke-opacity="0.45" stroke-width="2.5" stroke-dasharray="8 8"/>
        <!-- 3D Glossy Cyan Athlete Sculpture Popping Out Over the White Poster Typography -->
        <circle cx="275" cy="74" r="34" fill="url(#cyanSculpture)" stroke="#e0f2fe" stroke-width="3"/>
        <circle cx="270" cy="145" r="24" fill="url(#cyanSculpture)"/>
        <path d="M225 100 L248 165 L296 165 L320 95" stroke="url(#cyanSculpture)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M242 165 L298 165 L308 278 L232 278 Z" fill="url(#cyanSculpture)"/>
        <path d="M236 278 L205 425 M296 278 L278 448" stroke="url(#cyanSculpture)" stroke-width="28" stroke-linecap="round"/>
        <circle cx="200" cy="438" r="16" fill="#0284c7"/>
        <circle cx="276" cy="462" r="16" fill="#0284c7"/>
      </svg>`,
    specs: [
      { code: '001', label: 'RELEASE VECTOR', metric: '54.2°', title: 'Apex Shoulder Separation', desc: 'Inverse-kinematic tracking of elbow elevation and backward center-of-mass drift at peak jump height.' },
      { code: '002', label: 'VERTICAL IMPULSE', metric: '48.2"', title: '0.92s Airborne Suspension', desc: 'Force-plate telemetry capturing 3,400N plant impulse and mid-air core stabilization.' },
      { code: '003', label: 'TURNTABLE RIG', metric: '240 Hz', title: 'Volumetric 3D Mesh Capture', desc: '64 synchronized high-speed optical cameras reconstructing every muscle contour in glossy 3D.' }
    ],
    projects: [
      { tag: 'DECADE 1990s • 01', title: '1998 Finals Last-Shot Biomechanics', stat: '54.2° Release', color: '#0ea5e9' },
      { tag: 'AIRBORNE • 02', title: 'Free-Throw Line Glide Trajectory', stat: '48.2" Vertical', color: '#fde047' },
      { tag: 'FOOTWORK • 03', title: 'Baseline Spin Angular Velocity', stat: '840 deg/s', color: '#38bdf8' },
      { tag: 'ARCHIVE • 04', title: 'Crossover Step Lateral G-Force', stat: '2.8G Plant', color: '#ffffff' }
    ]
  },

  // BLUEPRINT 3: LUNAR OASIS VILLA — EDITORIAL ARCHITECTURAL GLASSMORPHISM (Left Split-Text + Right Stacked 3D Glass Villa Cards)
  {
    id: 'lunar-villa',
    brandTitle: 'Lunar Oasis Villa',
    navStyle: 'editorial-architect',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
    fontDisplay: "'Instrument Serif', Georgia, serif",
    fontSerif: "'Instrument Serif', Georgia, serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
    bg: '#0c1116',
    surface: '#151e26',
    glass: 'rgba(255, 255, 255, 0.10)',
    fg: '#f8fafc',
    muted: '#cbd5e1',
    accent: '#eab308',
    accent2: '#2dd4bf',
    heroBgGrad: 'linear-gradient(135deg, #0b131b 0%, #172a3a 48%, #292218 100%)',
    marqueeText: 'NEW WAY OF LIVING • LUNAR OASIS PAVILION • CANTILEVER INFINITY POOL • BIOCLIMATIC GLASS • ',
    heroLayout: 'editorial-split-villa',
    headlineTop: 'New Way',
    headlineBottom: 'Of Living',
    headlineSub: 'Monolithic desert-and-sea glass pavilions cantilevered over mirror pools — combining passive solar thermodynamics with 360° horizon serenity.',
    centerSvg: (acc, acc2) => `
      <svg viewBox="0 0 760 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <!-- Lunar Horizon Sun & Cantilevered Glass Villa -->
        <circle cx="540" cy="145" r="78" fill="${acc}" fill-opacity="0.28"/>
        <!-- Upper Cantilever Volume -->
        <path d="M120 170 L590 140 L650 220 L180 245 Z" fill="rgba(255,255,255,0.14)" stroke="#ffffff" stroke-width="2"/>
        <!-- Warm Interior Glow -->
        <rect x="210" y="175" width="320" height="58" rx="8" fill="${acc}" fill-opacity="0.35"/>
        <!-- Lower Terrace & Infinity Pool Deck -->
        <path d="M80 250 L680 235 L720 305 L40 315 Z" fill="#1e293b" stroke="${acc2}" stroke-width="2"/>
        <!-- Shimmering Water Ripples -->
        <path d="M60 345 Q260 330 460 345 T710 340" stroke="${acc2}" stroke-width="3" stroke-opacity="0.7"/>
        <path d="M90 375 Q290 362 490 375 T680 372" stroke="${acc}" stroke-width="2" stroke-opacity="0.5"/>
      </svg>`,
    specs: [
      { code: '001', label: 'SUBTERRANEAN SPA', metric: '1,240 m²', title: 'Geothermal Limestone Cavern', desc: 'Carved into the coastal cliffside with natural acoustic water reflection chambers.' },
      { code: '002', label: 'CANTILEVER DECK', metric: '18.5 m', title: 'Frameless Triple-Glazed Horizon', desc: 'Motorized glass walls retract into the floor slab to merge indoor living with the infinity pool.' },
      { code: '003', label: 'SOLAR SKIN', metric: '100% Net-0', title: 'Photovoltaic Alabaster Louvers', desc: 'Autonomous sun-tracking roof fins generate 42 kWh daily while casting kinetic shadow patterns.' }
    ],
    projects: [
      { tag: 'RESIDENCE 01', title: 'Lunar Oasis Cliffside Villa', stat: '$14.8M • 5 Bed', color: '#eab308' },
      { tag: 'RESIDENCE 02', title: 'Dune Mirage Glass Pavilion', stat: '$11.2M • 4 Bed', color: '#2dd4bf' },
      { tag: 'RESIDENCE 03', title: 'Atoll Floating Water House', stat: '$18.5M • 6 Bed', color: '#38bdf8' },
      { tag: 'RESIDENCE 04', title: 'Observatory Sky Penthouse', stat: '$9.6M • 3 Bed', color: '#f59e0b' }
    ]
  },

  // BLUEPRINT 4: AQUACOSMOS ZERO-G WATER SPACE HUD (Deep Ocean/Cosmos + Floating Astronaut/Hydro Sphere + Orbital Cutout Pods)
  {
    id: 'aquacosmos-hud',
    brandTitle: 'AquaCosmos Zero-G',
    navStyle: 'orbital-hud-frame',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
    fontDisplay: "'Orbitron', sans-serif",
    fontSerif: "'Orbitron', sans-serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
    bg: '#040814',
    surface: '#091229',
    glass: 'rgba(10, 22, 48, 0.68)',
    fg: '#ecfeff',
    muted: '#67e8f9',
    accent: '#06b6d4',
    accent2: '#a855f7',
    heroBgGrad: 'radial-gradient(circle at 50% 35%, rgba(6, 182, 212, 0.28) 0%, rgba(168, 85, 247, 0.18) 42%, #040814 88%)',
    marqueeText: 'WATER SPACE ODYSSEY • ZERO-GRAVITY HYDRO PHOTONICS • DEEP ORBITAL TELEMETRY • ',
    heroLayout: 'orbital-water-space',
    headlineTop: 'WATER SPACE',
    headlineBottom: 'ODYSSEY',
    headlineSub: 'Where abyssal ocean optics meet zero-gravity orbital habitats — interactive WebGL fluid waves, floating celestial spheres, and bioluminescent photonics.',
    centerSvg: (acc, acc2) => `
      <svg viewBox="0 0 720 460" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="planetOrb" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#67e8f9"/>
            <stop offset="50%" stop-color="#0891b2"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </radialGradient>
        </defs>
        <!-- Zero-Gravity Floating Planet & Orbital Rings -->
        <ellipse cx="360" cy="220" rx="280" ry="74" transform="rotate(-14 360 220)" stroke="${acc}" stroke-width="2.5" stroke-dasharray="10 6"/>
        <ellipse cx="360" cy="220" rx="220" ry="52" transform="rotate(18 360 220)" stroke="${acc2}" stroke-width="2" stroke-opacity="0.7"/>
        <circle cx="360" cy="210" r="108" fill="url(#planetOrb)" stroke="#a5f3fc" stroke-width="2"/>
        <!-- Floating Satellite Moon -->
        <circle cx="150" cy="125" r="26" fill="${acc2}" fill-opacity="0.8"/>
        <circle cx="575" cy="145" r="18" fill="${acc}"/>
        <!-- Bioluminescent Water Horizon Waves -->
        <path d="M30 370 Q195 340 360 370 T690 365" stroke="#22d3ee" stroke-width="3"/>
        <path d="M60 402 Q225 378 390 402 T660 398" stroke="#a855f7" stroke-width="2"/>
      </svg>`,
    specs: [
      { code: '001', label: 'HYDRO PHOTONICS', metric: '2450 μmol', title: 'Sub-Aquatic Spectral Array', desc: 'IP68 pressure-rated photonic emitters engineered for deep-sea biosphere cultivation.' },
      { code: '002', label: 'ZERO-G BUOYANCY', metric: '0.00 G', title: 'Neutral-Buoyancy Orbital Tank', desc: 'Parabolic fluid suspension chambers simulating lunar and Martian micro-gravity.' },
      { code: '003', label: 'FLUID SHADER', metric: '120 FPS', title: 'Real-Time Wave Displacement', desc: 'Interactive surface tension ripples coupled to cursor velocity and sonar telemetry.' }
    ],
    projects: [
      { tag: 'EXPEDITION 01', title: 'Europa Sub-Glacial Ocean Probe', stat: '4,200m Depth', color: '#06b6d4' },
      { tag: 'EXPEDITION 02', title: 'VYPRx Hydro-Matrix Luminaire', stat: 'IP68 Shielded', color: '#a855f7' },
      { tag: 'EXPEDITION 03', title: 'Neptune Zero-G Habitat Ring', stat: '12 Crew Pods', color: '#38bdf8' },
      { tag: 'EXPEDITION 04', title: 'Bioluminescent Reef Observatory', stat: '360° Sonar', color: '#22d3ee' }
    ]
  }
];

function get3DCutoutMarkup(bp, p, data) {
  const cutoutFile = path.resolve(__dirname, `pinterest-assets/cutout-${data.slug}.webp`);
  if (fs.existsSync(cutoutFile)) {
    return `<img class="${p}-cutout-3d-img" src="assets/cutout.webp" onerror="this.onerror=null;this.src='/demos/${data.slug}/assets/cutout.webp'" alt="${bp.brandTitle} 3D Cutout Subject" loading="eager" decoding="async" />`;
  }
  return bp.centerSvg(bp.accent, bp.accent2);
}

function renderHeroByBlueprint(bp, p, data, evalScore) {
  const svgMarkup = get3DCutoutMarkup(bp, p, data);

  // Layout 0: Asymmetric Carbon Bike Atelier (Left giant masked title + diagonal 3D carbon bike pop-out + right wind-tunnel cards)
  if (bp.heroLayout === 'asymmetric-bike') {
    return `
      <div class="${p}-hero-grid-bike">
        <div class="${p}-bike-copy" data-parallax="0.08">
          <div class="${p}-tag-chip" id="activeHeroTag">${bp.brandTitle} • ${evalScore}% Hero UI Match</div>
          <h1 class="${p}-display-h1" id="oversizedHeadline">
            <span class="${p}-split-word is-in">${bp.headlineTop}</span>
            <span class="${p}-split-word is-in ${p}-serif-accent" style="transition-delay:90ms;">${bp.headlineBottom}</span>
          </h1>
          <p class="${p}-lead">${bp.headlineSub}</p>
          <div class="${p}-counters">
            <div class="${p}-counter-box"><strong data-counter-target="680" data-counter-suffix="g">680g</strong><span>Frame Weight</span></div>
            <div class="${p}-counter-box"><strong data-counter-target="120" data-counter-suffix="+">120+</strong><span>CFD Tunnel Hrs</span></div>
            <div class="${p}-counter-box"><strong data-counter-target="1000" data-counter-suffix="+">1000+</strong><span>Torsional N·m</span></div>
          </div>
        </div>

        <div class="${p}-bike-stage">
          <div id="heroPopoutRig" class="${p}-popout-rig" data-tilt-card style="filter: url(#${p}LiquidFilter);">
            <span class="${p}-cutout-pill">AUTOCLAVE MONOCOQUE • VENETO</span>
            <div class="${p}-svg-popout">${svgMarkup}</div>
          </div>
          <div class="${p}-floating-pair">
            <article class="${p}-glass-card" data-tilt-card data-seamless-trigger="${bp.projects[0].title}">
              <span class="${p}-card-kicker">01 / AERODYNAMIC WAKE</span>
              <h3>${bp.projects[0].title}</h3>
              <p>Click to expand wind-tunnel drag polar &amp; carbon layup dossier (${bp.projects[0].stat}).</p>
            </article>
            <article class="${p}-glass-card" data-tilt-card data-seamless-trigger="${bp.projects[1].title}">
              <span class="${p}-card-kicker">02 / BESPOKE GEOMETRY</span>
              <h3>${bp.projects[1].title}</h3>
              <p>Sub-millimeter custom tube mitering (${bp.projects[1].stat}).</p>
            </article>
          </div>
        </div>
      </div>`;
  }

  // Layout 1: Supersonic Aviation Sky Hero (Giant centered sky headline + 3D Delta Aircraft popping out over clouds + 3 bottom destination pill cards)
  if (bp.heroLayout === 'sky-aircraft-popout') {
    return `
      <div class="${p}-hero-sky">
        <div class="${p}-sky-head" data-parallax="0.12">
          <span class="${p}-tag-chip" id="activeHeroTag">${bp.brandTitle} • Mach 1.8 Stratospheric Fleet</span>
          <h1 class="${p}-display-h1 ${p}-sky-h1" id="oversizedHeadline">
            <span class="${p}-split-word is-in">${bp.headlineTop}</span>
            <span class="${p}-split-word is-in" style="color:var(--accent);transition-delay:90ms;">${bp.headlineBottom}</span>
          </h1>
        </div>

        <div id="heroPopoutRig" class="${p}-sky-plane-popout" data-tilt-card style="filter: url(#${p}LiquidFilter);">
          ${svgMarkup}
        </div>

        <div class="${p}-sky-destinations">
          ${bp.projects.slice(0, 3).map((dest, idx) => `
          <article class="${p}-glass-card ${p}-pill-card" data-tilt-card data-seamless-trigger="${dest.title}">
            <div class="${p}-pill-avatar" style="background:linear-gradient(135deg, ${dest.color}, var(--surface));">0${idx + 1}</div>
            <div>
              <span class="${p}-card-kicker">${dest.tag}</span>
              <h3>${dest.title}</h3>
              <span style="font-size:12px;color:var(--accent);font-weight:700;">${dest.stat} ↗</span>
            </div>
          </article>`).join('')}
        </div>

        <div class="${p}-counters" style="justify-content:center;margin-top:20px;">
          <div class="${p}-counter-box"><strong data-counter-target="120" data-counter-suffix="+">120+</strong><span>Private Airports</span></div>
          <div class="${p}-counter-box"><strong data-counter-target="10" data-counter-suffix="K+">10K+</strong><span>Supersonic Hours</span></div>
          <div class="${p}-counter-box"><strong data-counter-target="1000" data-counter-suffix="+">1000+</strong><span>Mach Telemetry Nodes</span></div>
        </div>
      </div>`;
  }

  // Layout 2: Vibrant Orange/Cyan Poster Stage (Giant white block letters masked BEHIND the 3D cyan figure + bottom-left replay card + bottom-right circular buttons)
  if (bp.heroLayout === 'center-poster-mask') {
    return `
      <div class="${p}-poster-stage">
        <div class="${p}-poster-top-meta">
          <span class="${p}-tag-chip" id="activeHeroTag" style="background:rgba(0,0,0,0.28);color:#fff;">SHOOTING BIOMECHANICS • 240HZ MOCAP</span>
        </div>

        <div class="${p}-poster-stack">
          <!-- Layer 1: Giant White Block Typography Behind Subject -->
          <h1 class="${p}-poster-giant-h1" id="oversizedHeadline" data-parallax="0.10">
            <span class="${p}-split-word is-in">${bp.headlineTop}</span><br>
            <span class="${p}-split-word is-in" style="transition-delay:90ms;">${bp.headlineBottom}</span>
          </h1>

          <!-- Layer 2: 3D Glossy Cyan Athlete Pop-Out Overlapping the Giant Letters (Text Masking) -->
          <div id="heroPopoutRig" class="${p}-poster-figure-popout" data-tilt-card style="filter: url(#${p}LiquidFilter);">
            ${svgMarkup}
          </div>
        </div>

        <div class="${p}-poster-bottom-bar">
          <!-- Bottom-Left Floating Replay Card -->
          <article class="${p}-glass-card ${p}-poster-replay-card" data-tilt-card data-seamless-trigger="${bp.projects[0].title}">
            <span class="${p}-card-kicker">1998 FINALS • FADEAWAY KINEMATICS</span>
            <h3>${bp.projects[0].title}</h3>
            <p>Release angle 54.2° • Apex hang-time 0.92s • Click for full 3D frame analysis.</p>
          </article>

          <!-- Center Decade & Counters -->
          <div class="${p}-counters">
            <div class="${p}-counter-box"><strong data-counter-target="240" data-counter-suffix="Hz">240Hz</strong><span>Optical Mocap</span></div>
            <div class="${p}-counter-box"><strong data-counter-target="48" data-counter-suffix=".2&quot;">48.2"</strong><span>Vertical Leap</span></div>
            <div class="${p}-counter-box"><strong data-counter-target="1000" data-counter-suffix="+">1000+</strong><span>Kinematic Vectors</span></div>
          </div>

          <!-- Bottom-Right Circular Magnetic Action Buttons -->
          <div style="display:flex;gap:12px;">
            <button type="button" class="${p}-circle-fab" data-magnetic data-seamless-trigger="360° Orbital Camera Replay" aria-label="Open 360 Replay">360°</button>
            <a href="#pinnedSpecs" class="${p}-circle-fab" data-magnetic aria-label="Scroll to Biomechanics">↓</a>
          </div>
        </div>
      </div>`;
  }

  // Layout 3: Lunar Oasis Villa — Editorial Split Left Headline + Right Stacked 3D Tilting Glassmorphism Villa Cards with Cutout Tabs
  if (bp.heroLayout === 'editorial-split-villa') {
    return `
      <div class="${p}-villa-grid">
        <div class="${p}-villa-left" data-parallax="0.06">
          <span class="${p}-tag-chip" id="activeHeroTag">${bp.brandTitle} • Desert &amp; Sea Architecture</span>
          <h1 class="${p}-villa-h1" id="oversizedHeadline">
            <span class="${p}-split-word is-in">${bp.headlineTop}</span><br>
            <em><span class="${p}-split-word is-in" style="color:var(--accent);transition-delay:90ms;">${bp.headlineBottom}</span></em>
          </h1>
          <p class="${p}-lead">${bp.headlineSub}</p>

          <div id="heroPopoutRig" class="${p}-villa-Elevation" data-tilt-card style="filter: url(#${p}LiquidFilter);">
            ${svgMarkup}
          </div>

          <div class="${p}-counters" style="margin-top:24px;">
            <div class="${p}-counter-box"><strong data-counter-target="120" data-counter-suffix="+">120+</strong><span>Private Acres</span></div>
            <div class="${p}-counter-box"><strong data-counter-target="10" data-counter-suffix="K+">10K+</strong><span>Solar Louvers</span></div>
            <div class="${p}-counter-box"><strong data-counter-target="1000" data-counter-suffix="m²">1000m²</strong><span>Infinity Mirror Pool</span></div>
          </div>
        </div>

        <div class="${p}-villa-right-stack">
          ${bp.projects.slice(0, 3).map((v, i) => `
          <article class="${p}-glass-card ${p}-villa-cutout-card" data-tilt-card data-seamless-trigger="${v.title}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span class="${p}-card-kicker">${v.tag}</span>
              <span class="${p}-cutout-tab-pill">${v.stat}</span>
            </div>
            <h3>${v.title}</h3>
            <p>3D perspective glassmorphism card with interactive specular border shine &amp; seamless floorplan expansion.</p>
          </article>`).join('')}
        </div>
      </div>`;
  }

  // Layout 4: AquaCosmos Zero-G Water Space HUD (Orbital HUD frame + floating zero-gravity planet/astronaut + radial cutout pods)
  return `
    <div class="${p}-hud-stage">
      <div class="${p}-hud-header" data-parallax="0.09">
        <span class="${p}-tag-chip" id="activeHeroTag">${bp.brandTitle} • Zero-Gravity Hydro Photonics</span>
        <h1 class="${p}-display-h1 ${p}-hud-h1" id="oversizedHeadline">
          <span class="${p}-split-word is-in">${bp.headlineTop}</span>
          <span class="${p}-split-word is-in" style="color:var(--accent);transition-delay:90ms;">${bp.headlineBottom}</span>
        </h1>
      </div>

      <div class="${p}-hud-orbital-ring">
        <article class="${p}-glass-card ${p}-orbital-pod" data-tilt-card data-seamless-trigger="${bp.projects[0].title}">
          <span class="${p}-card-kicker">${bp.projects[0].tag}</span>
          <h3>${bp.projects[0].title}</h3>
          <p>Zero-gravity neutral buoyancy telemetry (${bp.projects[0].stat}).</p>
        </article>

        <div id="heroPopoutRig" class="${p}-hud-planet-center" data-tilt-card style="filter: url(#${p}LiquidFilter);">
          ${svgMarkup}
        </div>

        <article class="${p}-glass-card ${p}-orbital-pod" data-tilt-card data-seamless-trigger="${bp.projects[1].title}">
          <span class="${p}-card-kicker">${bp.projects[1].tag}</span>
          <h3>${bp.projects[1].title}</h3>
          <p>Sub-aquatic spectral photonics array (${bp.projects[1].stat}).</p>
        </article>
      </div>

      <div class="${p}-counters" style="justify-content:space-around;margin-top:24px;">
        <div class="${p}-counter-box"><strong data-counter-target="120" data-counter-suffix="+">120+</strong><span>Orbital Sensors</span></div>
        <div class="${p}-counter-box"><strong data-counter-target="10" data-counter-suffix="K+">10K+</strong><span>Bioluminescent Nodes</span></div>
        <div class="${p}-counter-box"><strong data-counter-target="1000" data-counter-suffix="m">1000m</strong><span>Abyssal Pressure Rating</span></div>
      </div>
    </div>`;
}

export function buildPinterestInspiredHtml(data, palette) {
  const p = getSlugPrefix(data.slug);
  const bpIndex = selectBlueprintIndex(data);
  const bp = BLUEPRINTS[bpIndex];
  const evalScore = data.criteriaEvaluation?.totalScore || 98;
  const svgCenter = get3DCutoutMarkup(bp, p, data);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${bp.brandTitle} — Interactive 3D Hero &amp; Motion Showcase</title>
  <meta name="description" content="${bp.headlineSub.replace(/"/g, '&quot;')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${bp.fontsUrl}" rel="stylesheet">
  <style>
    /* hallmark · v2.0.0 · blueprint=${bp.id} · slug=${data.slug} */
    :root {
      --bg: ${bp.bg};
      --surface: ${bp.surface};
      --glass: ${bp.glass};
      --fg: ${bp.fg};
      --muted: ${bp.muted};
      --border: rgba(255, 255, 255, 0.16);
      --accent: ${bp.accent};
      --accent-2: ${bp.accent2};
      --font-display: ${bp.fontDisplay};
      --font-serif: ${bp.fontSerif};
      --font-body: ${bp.fontBody};
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      overflow-x: clip;
      background-color: var(--bg);
      color: var(--fg);
      font-family: var(--font-body);
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
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
      transition: width 0.24s ease, height 0.24s ease, background-color 0.24s ease;
      mix-blend-mode: difference;
    }
    .${p}-cursor-ring {
      width: 36px;
      height: 36px;
      border: 1.5px solid #ffffff;
      margin-left: -18px;
      margin-top: -18px;
    }
    .${p}-cursor-ring.is-hovered {
      width: 64px;
      height: 64px;
      margin-left: -32px;
      margin-top: -32px;
      background: #ffffff;
    }
    .${p}-cursor-dot {
      width: 7px;
      height: 7px;
      background: var(--accent);
      margin-left: -3.5px;
      margin-top: -3.5px;
    }
    @media (max-width: 900px) {
      .${p}-cursor-ring, .${p}-cursor-dot { display: none; }
    }

    /* Criterion 6: Minimalist Edge Navigation */
    .${p}-edge-top {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 220;
      padding: 18px clamp(18px, 4vw, 52px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      pointer-events: none;
    }
    .${p}-edge-top > * { pointer-events: auto; }
    .${p}-brand {
      text-decoration: none;
      color: var(--fg);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 18px;
      letter-spacing: 0.04em;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .${p}-brand-mark {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 16px var(--accent);
    }
    .${p}-nav-links {
      display: none;
      list-style: none;
      gap: 24px;
      padding: 8px 20px;
      border-radius: 999px;
      background: var(--glass);
      backdrop-filter: blur(18px);
      border: 1px solid var(--border);
    }
    @media (min-width: 900px) {
      .${p}-nav-links { display: flex; }
    }
    .${p}-nav-links a {
      color: var(--fg);
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      opacity: 0.82;
      transition: opacity 0.2s ease;
    }
    .${p}-nav-links a:hover { opacity: 1; }
    .${p}-edge-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .${p}-pill-btn {
      padding: 9px 16px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--glass);
      backdrop-filter: blur(16px);
      color: var(--fg);
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .${p}-cta-magnetic {
      padding: 10px 22px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.28);
      background: var(--accent);
      color: #090b10;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Left & Right Minimalist Edge Slide Rails */
    .${p}-edge-left,
    .${p}-edge-right {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      z-index: 130;
      display: none;
      flex-direction: column;
      gap: 12px;
    }
    @media (min-width: 1120px) {
      .${p}-edge-left { display: flex; left: 22px; }
      .${p}-edge-right { display: flex; right: 22px; }
    }
    .${p}-slide-dot {
      width: 34px;
      height: 34px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--glass);
      color: var(--fg);
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }
    .${p}-slide-dot.is-active {
      background: var(--accent);
      color: #090b10;
      border-color: var(--accent);
    }
    .${p}-telemetry-rail {
      writing-mode: vertical-rl;
      padding: 14px 8px;
      border-radius: 999px;
      background: var(--glass);
      border: 1px solid var(--border);
      font-size: 11px;
      font-weight: 700;
    }

    /* Hero Stage */
    .${p}-hero {
      position: relative;
      min-height: 100vh;
      padding: 104px clamp(20px, 5vw, 84px) 56px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      isolation: isolate;
      background: ${bp.heroBgGrad};
    }
    .${p}-smoke-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      pointer-events: none;
    }
    .${p}-marquee-band {
      position: absolute;
      bottom: 8%;
      left: 0;
      width: 100%;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
      opacity: 0.10;
      white-space: nowrap;
    }
    .${p}-marquee-track {
      display: inline-block;
      font-family: var(--font-display);
      font-size: clamp(64px, 11vw, 156px);
      font-weight: 800;
      color: transparent;
      -webkit-text-stroke: 1.5px #ffffff;
      animation: ${p}Marquee 24s linear infinite;
    }
    @keyframes ${p}Marquee {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }

    /* Shared Typography & Split-Text */
    .${p}-tag-chip {
      display: inline-flex;
      padding: 6px 14px;
      border-radius: 999px;
      background: var(--glass);
      border: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: var(--accent);
      margin-bottom: 16px;
    }
    .${p}-display-h1 {
      font-family: var(--font-display);
      font-size: clamp(44px, 7.8vw, 108px);
      font-weight: 800;
      line-height: 0.95;
      letter-spacing: -0.03em;
      overflow-wrap: break-word;
    }
    .${p}-serif-accent {
      font-family: var(--font-serif);
      font-style: italic;
      color: var(--accent);
      display: block;
    }
    .${p}-lead {
      font-size: clamp(15px, 1.35vw, 18px);
      line-height: 1.65;
      color: var(--muted);
      max-width: 540px;
      margin: 18px 0 26px;
    }
    .${p}-split-word {
      display: inline-block;
      opacity: 0;
      transform: translate3d(0, 32px, 0);
      transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${p}-split-word.is-in {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    /* 3D Cutout Subject Styling (Out-of-bounds Pop-out & Drop Shadow) */
    .${p}-cutout-3d-img {
      width: 100%;
      height: auto;
      max-height: 390px;
      object-fit: contain;
      display: block;
      margin: 0 auto;
      filter: drop-shadow(0 28px 42px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 26px rgba(255, 255, 255, 0.14));
      user-select: none;
      pointer-events: none;
    }

    /* Blueprint 0 Specific: Asymmetric Carbon Bike Atelier */
    .${p}-hero-grid-bike {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 36px;
      align-items: center;
    }
    @media (min-width: 980px) {
      .${p}-hero-grid-bike {
        grid-template-columns: 0.92fr 1.08fr;
      }
    }
    .${p}-popout-rig {
      position: relative;
      padding: 20px 14px 28px;
      border-radius: 32px;
      background: radial-gradient(circle at 52% 48%, rgba(212,149,106,0.22), rgba(20,18,16,0.40) 72%);
      border: 1px solid var(--border);
      animation: ${p}Float 5.5s ease-in-out infinite;
      overflow: visible;
    }
    .${p}-popout-rig .${p}-cutout-3d-img {
      max-height: 380px;
      transform: scale(1.09) translateX(-14px);
    }
    .${p}-cutout-pill {
      position: absolute;
      top: -14px;
      right: 24px;
      z-index: 8;
      padding: 6px 16px;
      border-radius: 999px;
      background: var(--accent);
      color: #090b10;
      font-size: 11px;
      font-weight: 800;
    }
    .${p}-floating-pair {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-top: -32px;
      position: relative;
      z-index: 6;
    }

    /* Blueprint 1 Specific: Sky Aircraft Pop-Out */
    .${p}-hero-sky {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
    .${p}-sky-h1 {
      font-size: clamp(54px, 10vw, 138px);
      letter-spacing: 0.02em;
      position: relative;
      z-index: 1;
    }
    .${p}-sky-plane-popout {
      max-width: 780px;
      margin: -58px auto -10px;
      position: relative;
      z-index: 5;
      animation: ${p}Float 6s ease-in-out infinite;
    }
    .${p}-sky-plane-popout .${p}-cutout-3d-img {
      max-height: 350px;
      transform: scale(1.06);
    }
    .${p}-sky-destinations {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
      text-align: left;
      position: relative;
      z-index: 6;
    }
    .${p}-pill-card {
      display: flex;
      align-items: center;
      gap: 16px;
      border-radius: 999px !important;
      padding: 14px 24px !important;
    }
    .${p}-pill-avatar {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #fff;
    }

    /* Blueprint 2 Specific: Vibrant Orange/Cyan Poster Stage */
    .${p}-poster-stage {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 78vh;
    }
    .${p}-poster-top-meta { text-align: center; }
    .${p}-poster-stack {
      position: relative;
      text-align: center;
      padding: 12px 0;
    }
    .${p}-poster-giant-h1 {
      font-family: var(--font-display);
      font-size: clamp(64px, 13.5vw, 184px);
      line-height: 0.88;
      color: #ffffff;
      text-transform: uppercase;
      position: relative;
      z-index: 1;
    }
    .${p}-poster-figure-popout {
      position: relative;
      z-index: 4;
      width: min(360px, 72vw);
      margin: -255px auto -18px;
      animation: ${p}Float 5s ease-in-out infinite;
    }
    .${p}-poster-figure-popout .${p}-cutout-3d-img {
      max-height: 430px;
      width: auto;
    }
    .${p}-poster-bottom-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      position: relative;
      z-index: 6;
    }
    .${p}-poster-replay-card {
      max-width: 340px;
    }
    .${p}-circle-fab {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      border: none;
      background: #ffffff;
      color: #090b10;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      box-shadow: 0 12px 28px rgba(0,0,0,0.25);
    }

    /* Blueprint 3 Specific: Lunar Oasis Villa Editorial Split */
    .${p}-villa-grid {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 36px;
      align-items: center;
    }
    @media (min-width: 980px) {
      .${p}-villa-grid {
        grid-template-columns: 1.12fr 0.88fr;
      }
    }
    .${p}-villa-h1 {
      font-family: var(--font-display);
      font-size: clamp(50px, 7.2vw, 102px);
      font-weight: 400;
      line-height: 0.94;
    }
    .${p}-villa-Elevation .${p}-cutout-3d-img {
      max-height: 290px;
      transform: scale(1.04);
    }
    .${p}-villa-right-stack {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .${p}-cutout-tab-pill {
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--accent);
      color: #090b10;
      font-size: 11px;
      font-weight: 800;
    }

    /* Blueprint 4 Specific: AquaCosmos Orbital HUD */
    .${p}-hud-stage {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
    .${p}-hud-orbital-ring {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      align-items: center;
      margin-top: 12px;
    }
    @media (min-width: 1024px) {
      .${p}-hud-orbital-ring {
        grid-template-columns: 290px 1fr 290px;
      }
    }
    .${p}-hud-planet-center {
      animation: ${p}Float 6.5s ease-in-out infinite;
    }
    .${p}-orbital-pod {
      text-align: left;
      border-radius: 36px;
    }

    @keyframes ${p}Float {
      0%, 100% { transform: translate3d(0, 0px, 0); }
      50% { transform: translate3d(0, -12px, 0); }
    }

    /* Glassmorphism Cards & Counters */
    .${p}-glass-card {
      position: relative;
      border-radius: 26px;
      background: var(--glass);
      backdrop-filter: blur(22px) saturate(160%);
      -webkit-backdrop-filter: blur(22px) saturate(160%);
      border: 1px solid var(--border);
      padding: 22px;
      cursor: pointer;
      transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.24s ease;
      overflow: hidden;
    }
    .${p}-glass-card:hover {
      border-color: var(--accent);
    }
    .${p}-card-kicker {
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 6px;
    }
    .${p}-glass-card h3 {
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .${p}-glass-card p {
      font-size: 13px;
      line-height: 1.55;
      color: var(--muted);
    }
    .${p}-counters {
      display: flex;
      flex-wrap: wrap;
      gap: 28px;
    }
    .${p}-counter-box strong {
      display: block;
      font-family: var(--font-display);
      font-size: clamp(26px, 3vw, 38px);
      color: var(--fg);
    }
    .${p}-counter-box span {
      font-size: 12px;
      color: var(--muted);
    }

    /* Group 1.3 & 1.5: Sticky Pinned 001-003 Telemetry Section */
    .${p}-pinned-section {
      max-width: 1320px;
      margin: 0 auto;
      padding: 88px clamp(20px, 5vw, 84px);
    }
    .${p}-pinned-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
      align-items: start;
      margin-top: 40px;
    }
    @media (min-width: 980px) {
      .${p}-pinned-grid {
        grid-template-columns: 1fr 1.1fr 1fr;
      }
    }
    .${p}-sticky-center {
      position: relative;
      top: 110px;
      padding: 28px;
      border-radius: 32px;
      background: var(--surface);
      border: 1px solid var(--border);
      text-align: center;
    }
    @media (min-width: 980px) {
      .${p}-sticky-center { position: sticky; }
    }
    .${p}-scrub-stage {
      transition: transform 0.12s linear;
      will-change: transform;
    }
    .${p}-spec-card {
      padding: 24px;
      border-radius: 24px;
      background: var(--glass);
      border: 1px solid var(--border);
      margin-bottom: 20px;
    }
    .${p}-spec-card.is-active {
      border-color: var(--accent);
    }

    /* Group 1.4: Horizontal Scroll Projects Section */
    .${p}-hscroll-section {
      padding: 72px clamp(20px, 5vw, 84px);
      border-top: 1px solid var(--border);
    }
    .${p}-hscroll-track {
      max-width: 1320px;
      margin: 32px auto 0;
      display: grid;
      grid-template-columns: repeat(4, minmax(260px, 1fr));
      gap: 20px;
      overflow-x: auto;
      padding-bottom: 12px;
    }
    .${p}-project-card {
      padding: 24px;
      border-radius: 26px;
      background: var(--surface);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .${p}-project-card:hover {
      transform: translateY(-6px);
      border-color: var(--accent);
    }
    .${p}-project-visual {
      height: 140px;
      border-radius: 18px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    /* Group 1.2: Scroll Reveal */
    .${p}-reveal {
      opacity: 0;
      transform: translate3d(0, 24px, 0);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .${p}-reveal.is-visible {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    /* Group 3.3: Seamless Fullscreen Page Transition Overlay */
    .${p}-seamless-overlay {
      position: fixed;
      inset: 0;
      z-index: 190;
      background: rgba(5, 8, 15, 0.88);
      backdrop-filter: blur(22px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      pointer-events: none;
    }
    .${p}-seamless-overlay.is-open { display: flex; }
    .${p}-seamless-box {
      width: 100%;
      max-width: 760px;
      border-radius: 32px;
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 36px;
      pointer-events: auto;
    }

    .${p}-footer {
      max-width: 1320px;
      margin: 0 auto;
      padding: 40px clamp(20px, 5vw, 84px);
      border-top: 1px solid var(--border);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 16px;
      font-size: 13px;
      color: var(--muted);
    }

    body.is-motion-paused * {
      animation-play-state: paused !important;
    }
  </style>
</head>
<body>
  <!-- Group 2.4: SVG Liquid Ripple Filter -->
  <svg width="0" height="0" style="position:absolute;pointer-events:none;" aria-hidden="true" focusable="false">
    <defs>
      <filter id="${p}LiquidFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="4" />
        <feDisplacementMap id="${p}Displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>

  <div id="cursorRing" class="${p}-cursor-ring" aria-hidden="true"></div>
  <div id="cursorDot" class="${p}-cursor-dot" aria-hidden="true"></div>

  <header class="${p}-edge-top">
    <a href="#heroStage" class="${p}-brand">
      <span class="${p}-brand-mark"></span>
      <span>${bp.brandTitle}</span>
    </a>
    <ul class="${p}-nav-links" aria-label="Primary Navigation">
      <li><a href="#heroStage">01 / Showcase</a></li>
      <li><a href="#pinnedSpecs">02 / Pinned Telemetry</a></li>
      <li><a href="#motionProjects">03 / Motion Archive</a></li>
    </ul>
    <div class="${p}-edge-controls">
      <button type="button" id="motionToggleBtn" class="${p}-pill-btn" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-cta-magnetic" data-magnetic data-next-preview>
        Explore Spec
      </button>
    </div>
  </header>

  <aside class="${p}-edge-left" aria-label="Slide Numbers">
    <a href="#heroStage" class="${p}-slide-dot is-active" data-slide-link="0">01</a>
    <a href="#pinnedSpecs" class="${p}-slide-dot" data-slide-link="1">02</a>
    <a href="#motionProjects" class="${p}-slide-dot" data-slide-link="2">03</a>
  </aside>

  <aside class="${p}-edge-right" aria-label="Scroll Scrub Readout">
    <div class="${p}-telemetry-rail" id="scrollScrubReadout">SCRUB 0% • 0.0°</div>
  </aside>

  <main id="main">
    <section id="heroStage" class="${p}-hero">
      <canvas id="ambientSmokeCanvas" class="${p}-smoke-canvas" aria-hidden="true"></canvas>
      <div class="${p}-marquee-band" aria-hidden="true">
        <div class="${p}-marquee-track">${bp.marqueeText}${bp.marqueeText}</div>
      </div>

      ${renderHeroByBlueprint(bp, p, data, evalScore)}
    </section>

    <!-- Sticky Pinned Center Subject + 001/002/003 Telemetry -->
    <section id="pinnedSpecs" class="${p}-pinned-section">
      <div class="${p}-reveal" style="text-align:center;max-width:680px;margin:0 auto;">
        <span class="${p}-tag-chip">Sticky Pinned &amp; Scroll Scrubbing</span>
        <h2 style="font-family:var(--font-display);font-size:clamp(28px,4vw,48px);">${bp.brandTitle} — 001 to 003 Engineering</h2>
      </div>

      <div class="${p}-pinned-grid">
        <div>
          <article class="${p}-spec-card ${p}-reveal is-active" data-spec-index="001">
            <span class="${p}-card-kicker">${bp.specs[0].code} / ${bp.specs[0].label}</span>
            <div style="font-family:var(--font-display);font-size:34px;font-weight:800;margin:6px 0;">${bp.specs[0].metric}</div>
            <h3>${bp.specs[0].title}</h3>
            <p style="font-size:14px;color:var(--muted);margin-top:6px;">${bp.specs[0].desc}</p>
          </article>
          <article class="${p}-spec-card ${p}-reveal" data-spec-index="002">
            <span class="${p}-card-kicker">${bp.specs[1].code} / ${bp.specs[1].label}</span>
            <div style="font-family:var(--font-display);font-size:34px;font-weight:800;margin:6px 0;">${bp.specs[1].metric}</div>
            <h3>${bp.specs[1].title}</h3>
            <p style="font-size:14px;color:var(--muted);margin-top:6px;">${bp.specs[1].desc}</p>
          </article>
        </div>

        <div class="${p}-sticky-center">
          <div id="scrubCenterStage" class="${p}-scrub-stage">
            ${svgCenter}
          </div>
          <div id="scrubDialText" style="margin-top:14px;font-size:12px;color:var(--accent);font-weight:700;">
            SCROLL SCRUB ANGLE: 0.0°
          </div>
        </div>

        <div>
          <article class="${p}-spec-card ${p}-reveal" data-spec-index="003">
            <span class="${p}-card-kicker">${bp.specs[2].code} / ${bp.specs[2].label}</span>
            <div style="font-family:var(--font-display);font-size:34px;font-weight:800;margin:6px 0;">${bp.specs[2].metric}</div>
            <h3>${bp.specs[2].title}</h3>
            <p style="font-size:14px;color:var(--muted);margin-top:6px;">${bp.specs[2].desc}</p>
          </article>
          <article class="${p}-spec-card ${p}-reveal" data-seamless-trigger="${bp.brandTitle} Full Specification Sheet" style="cursor:pointer;">
            <span class="${p}-card-kicker">004 / INTERACTIVE DOSSIER</span>
            <div style="font-family:var(--font-display);font-size:28px;font-weight:800;margin:6px 0;color:var(--accent);">Expand View</div>
            <h3>Seamless Page Transition</h3>
            <p style="font-size:14px;color:var(--muted);margin-top:6px;">Click to expand full specification view without page reload.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Horizontal Scroll Track -->
    <section id="motionProjects" class="${p}-hscroll-section">
      <div style="max-width:1320px;margin:0 auto;">
        <span class="${p}-tag-chip">Featured Motion Projects</span>
        <h2 style="font-family:var(--font-display);font-size:clamp(26px,3.5vw,42px);">Horizontal Scroll Showcase</h2>
      </div>
      <div id="hScrollTrack" class="${p}-hscroll-track">
        ${bp.projects.map((proj, idx) => `
        <article class="${p}-project-card ${p}-reveal" data-tilt-card data-seamless-trigger="${proj.title}">
          <div class="${p}-project-visual" style="background:radial-gradient(circle at 50% 50%, ${proj.color}33, var(--bg));">
            <span style="font-family:var(--font-display);font-size:32px;font-weight:800;color:${proj.color};">0${idx + 1} // ${proj.stat}</span>
          </div>
          <span class="${p}-card-kicker">${proj.tag}</span>
          <h3 style="font-size:18px;font-weight:800;margin-bottom:6px;">${proj.title}</h3>
          <p style="font-size:13px;color:var(--muted);">Click for seamless full-screen transition</p>
        </article>`).join('')}
      </div>
    </section>
  </main>

  <footer class="${p}-footer">
    <p>© 2026 ${bp.brandTitle} — Bespoke Blueprint (${bp.id}).</p>
    <p>Parallax • Sticky Scrub 001-003 • 3D Card Tilt • Liquid Wave • Particle Smoke</p>
  </footer>

  <div id="seamlessModal" class="${p}-seamless-overlay" role="dialog" aria-modal="true" aria-labelledby="seamlessTitle">
    <div class="${p}-seamless-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span class="${p}-tag-chip" style="margin-bottom:0;">Seamless Detail Transition</span>
        <button type="button" id="closeSeamlessBtn" class="${p}-pill-btn">Close (Esc)</button>
      </div>
      <h2 id="seamlessTitle" style="font-family:var(--font-display);font-size:28px;margin-bottom:12px;">${bp.brandTitle}</h2>
      <p style="font-size:15px;line-height:1.65;color:var(--muted);margin-bottom:20px;">${bp.headlineSub}</p>
      <div style="max-height:220px;overflow:hidden;border-radius:18px;border:1px solid var(--border);margin-bottom:20px;padding:12px;background:var(--bg);">
        ${svgCenter}
      </div>
      <button type="button" id="confirmSeamlessBtn" class="${p}-cta-magnetic" style="width:100%;">Return to Live Stage</button>
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

      var scrubStage = document.getElementById('scrubCenterStage');
      var scrubDial = document.getElementById('scrubDialText');
      var scrubReadout = document.getElementById('scrollScrubReadout');
      var parallaxEls = document.querySelectorAll('[data-parallax]');
      var slideLinks = document.querySelectorAll('[data-slide-link]');
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

        var activeIdx = progress < 0.34 ? 0 : progress < 0.72 ? 1 : 2;
        slideLinks.forEach(function (l, i) { l.classList.toggle('is-active', i === activeIdx); });
        specCards.forEach(function (c, i) { c.classList.toggle('is-active', i === (Math.floor(progress * 3) % 3)); });
      }
      window.addEventListener('scroll', function () { window.requestAnimationFrame(onScroll); }, { passive: true });
      onScroll();

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
          var dx = (e.clientX - (r.left + r.width / 2)) * 0.26;
          var dy = (e.clientY - (r.top + r.height / 2)) * 0.26;
          btn.style.transform = 'translate3d(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px, 0)';
        });
        btn.addEventListener('mouseleave', function () { btn.style.transform = 'translate3d(0,0,0)'; });
      });

      document.querySelectorAll('[data-tilt-card]').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          if (motionPaused) return;
          var r = card.getBoundingClientRect();
          var nx = (e.clientX - r.left) / r.width - 0.5;
          var ny = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = 'perspective(1000px) rotateY(' + (nx * 9).toFixed(2) + 'deg) rotateX(' + (-ny * 9).toFixed(2) + 'deg)';
        });
        card.addEventListener('mouseleave', function () { card.style.transform = ''; });
      });

      var displacement = document.getElementById('${p}Displacement');
      var heroRig = document.getElementById('heroPopoutRig');
      if (heroRig && displacement) {
        heroRig.addEventListener('mouseenter', function () { if (!motionPaused) displacement.setAttribute('scale', '16'); });
        heroRig.addEventListener('mouseleave', function () { displacement.setAttribute('scale', '0'); });
      }

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
          else openSeamless('${bp.brandTitle} — Specification View');
        });
      }
      if (closeBtn) closeBtn.addEventListener('click', closeSeamless);
      if (confirmBtn) confirmBtn.addEventListener('click', closeSeamless);
      document.querySelectorAll('[data-seamless-trigger]').forEach(function (el) {
        el.addEventListener('click', function () { openSeamless(el.getAttribute('data-seamless-trigger')); });
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSeamless(); });

      var canvas = document.getElementById('ambientSmokeCanvas');
      if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var pts = [];
        for (var i = 0; i < 24; i++) {
          pts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: 1.5 + Math.random() * 3, vx: (Math.random() - 0.5) * 0.4, vy: -0.2 - Math.random() * 0.4, a: 0.15 + Math.random() * 0.35 });
        }
        var f = 0;
        function loop() {
          if (!motionPaused && f < 900) {
            f++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var j = 0; j < pts.length; j++) {
              var pt = pts[j];
              pt.x += pt.vx; pt.y += pt.vy;
              if (pt.y < 0) pt.y = canvas.height;
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255,255,255,' + pt.a.toFixed(2) + ')';
              ctx.fill();
            }
            window.requestAnimationFrame(loop);
          }
        }
        window.requestAnimationFrame(loop);
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
  const bp = BLUEPRINTS[selectBlueprintIndex(data)];
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

  console.log(`[Pinterest Compiler] Building bespoke blueprint "${bp.id}" (${bp.brandTitle}) for ${slug}...`);
  const palette = await analyzePinterestImagePalette(data.localImagePath);

  if (!fs.existsSync(sourceHtmlPath)) {
    const motionDataPath = path.resolve(root, `web/tools/agent-motionsites/data/${slug}.json`);
    fs.writeFileSync(motionDataPath, JSON.stringify({
      ...data,
      category: webCat,
      prompt_text: bp.headlineSub
    }, null, 2), 'utf8');
    scaffoldTemplate(slug, { tier: accessTier });
  }

  const html = buildPinterestInspiredHtml(data, palette);
  fs.writeFileSync(sourceHtmlPath, html, 'utf8');

  fs.mkdirSync(path.dirname(demoHtmlPath), { recursive: true });
  fs.copyFileSync(sourceHtmlPath, demoHtmlPath);

  const cutoutAssetSrc = path.resolve(__dirname, `pinterest-assets/cutout-${slug}.webp`);
  if (fs.existsSync(cutoutAssetSrc)) {
    const sourceAssetPath = path.resolve(productDir, 'source/assets/cutout.webp');
    const demoAssetPath = path.resolve(root, `web/public/demos/${slug}/assets/cutout.webp`);
    fs.mkdirSync(path.dirname(sourceAssetPath), { recursive: true });
    fs.mkdirSync(path.dirname(demoAssetPath), { recursive: true });
    fs.copyFileSync(cutoutAssetSrc, sourceAssetPath);
    fs.copyFileSync(cutoutAssetSrc, demoAssetPath);
  }

  await runMultiViewportQaCheck(slug);

  execFileSync('node', ['web/product/giao-dien-web/tools/dong-goi.mjs', slug, '--ngoai-le'], {
    cwd: root,
    stdio: 'inherit'
  });

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
  const entryBlock = `  ${catalogId}: {
    slug: '${slug}',
    cat: '${webCat}',
${accessLine}    version: '1.0.0',
    video: true,
    copy: {
      vi: {
        name: ${JSON.stringify(bp.brandTitle)},
        desc: ${JSON.stringify(`${bp.brandTitle} (${bp.id}) — ${bp.headlineSub}`)},
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      en: {
        name: ${JSON.stringify(bp.brandTitle)},
        desc: ${JSON.stringify(`${bp.brandTitle} (${bp.id}) — ${bp.headlineSub}`)},
        tags: ['3D Pop-out Hero', 'Glassmorphism UI', 'Scroll Scrub & Tilt']
      },
      zh: {
        name: ${JSON.stringify(bp.brandTitle)},
        desc: ${JSON.stringify(`${bp.brandTitle} (${bp.id}) — 3D 破界悬浮视觉与粘性滚动交互界面。`)},
        tags: ['3D 破界视觉', '毛玻璃卡片', '滚动视差与流体']
      }
    }
  },`;

  const existingBlockRegex = new RegExp(`  ${catalogId}:\\s*\\{[\\s\\S]*?\\n  \\},`, 'm');
  if (existingBlockRegex.test(realTpl)) {
    realTpl = realTpl.replace(existingBlockRegex, entryBlock);
    fs.writeFileSync(realTplPath, realTpl, 'utf8');
  }

  execFileSync('node', ['web/tools/agent-motionsites/generate-previews.mjs', slug], {
    cwd: root,
    stdio: 'inherit'
  });

  return { slug, catalogId, title: bp.brandTitle, blueprint: bp.id, accessTier, category: webCat, criteriaScore: evalScore };
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
