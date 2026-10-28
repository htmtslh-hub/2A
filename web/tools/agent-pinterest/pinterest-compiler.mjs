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
  if (slug === 'break-code' || slug === 'startup-devkit' || slug === 'nova-glass' || slug === 'alex-carter-ui') return 'portfolio';
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
  if (s === 'forest-pulse' || s === 'cinder-axis') return 0;
  if (s === 'startup-devkit' || s === 'fishfinger-creative') return 1;
  if (s === 'break-code' || s === 'adoratorio-summer') return 2;
  if (s === 'launch-video' || s === 'bishop-tentwenty') return 3;
  if (s === 'geospace-canvas' || s === 'micai-aristide') return 4;
  let sum = 0;
  for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i);
  return sum % 5;
}

const SLUG_BLUEPRINT_OVERRIDES = {
  'cinder-axis': {
    id: 'terracotta-collage',
    brandTitle: 'Cinder Axis Studio',
    bg: '#1c0f0b',
    surface: '#2b1712',
    glass: 'rgba(43, 23, 18, 0.76)',
    fg: '#fff7ed',
    muted: '#fdba74',
    accent: '#ea580c',
    accent2: '#fb923c',
    heroBgGrad: 'linear-gradient(135deg, #d97354 0%, #7c2d12 52%, #180d0a 100%)',
    marqueeText: 'CINDER AXIS DOCUMENTARY • URBAN COLLAGE SPLIT • MEDIUM FORMAT RIG • 02/13 ARCHIVE • ',
    headlineTop: 'WORKING',
    headlineBottom: 'IN MOTION',
    headlineSub: 'Urban documentary cinema rig and splitscreen collage storytelling — capturing kinetic street portraits with medium-format optical precision.',
    specs: [
      { code: '001', label: 'OPTICAL MOUNT', metric: '80mm f/1.9', title: 'Medium-Format Cinema Glass', desc: 'Anamorphic street flare profile with zero-distortion edge geometry.' },
      { code: '002', label: 'CHASSIS RIG', metric: '1,140g', title: 'Terracotta Anodized Cage', desc: 'CNC-milled aerospace aluminum with brushed brass knurled follow-focus.' },
      { code: '003', label: 'ARCHIVE SERIES', metric: '13 Films', title: 'Splitscreen Urban Anthology', desc: 'Interactive documentary chapters with live frame-accurate scrub telemetry.' }
    ],
    projects: [
      { tag: 'CHAPTER 01', title: 'Harlem Morning Transit Study', stat: '65mm Raw', color: '#ea580c' },
      { tag: 'CHAPTER 02', title: 'Chicago Elevated Rail Acoustic', stat: '120 FPS', color: '#f97316' },
      { tag: 'CHAPTER 03', title: 'London Brutalist Concrete Portrait', stat: '4:3 Split', color: '#fb923c' },
      { tag: 'CHAPTER 04', title: 'Tokyo Midnight Neon Bokeh', stat: 'ISO 3200', color: '#fdba74' }
    ]
  },
  'bishop-tentwenty': {
    id: 'monochrome-architect',
    brandTitle: 'Bishop Design Rogue',
    bg: '#0b0b0d',
    surface: '#16161a',
    glass: 'rgba(24, 24, 28, 0.78)',
    fg: '#fafafa',
    muted: '#a1a1aa',
    accent: '#e4e4e7',
    accent2: '#71717a',
    heroBgGrad: 'linear-gradient(90deg, #27272a 0%, #18181b 49.8%, #09090b 50.2%, #09090b 100%)',
    marqueeText: 'BISHOP DESIGN BY PAUL BISHOP • REVOLUTIONARY MONOCHROME ARCHITECTURE • ROGUE ATELIER • ',
    headlineTop: 'Revolutionary',
    headlineBottom: 'Design',
    headlineSub: 'Carved black basalt monoliths and avant-garde spatial hospitality interiors engineered across Dubai, London, and Milan.',
    specs: [
      { code: '001', label: 'MONOLITH STONE', metric: '3.4 Tons', title: 'Hand-Carved Basalt Lounge', desc: 'Sculpted volcanic stone cantilevered on brushed platinum bearings.' },
      { code: '002', label: 'SPATIAL GRID', metric: '140 Awards', title: 'Rogue Hospitality Division', desc: 'Bespoke acoustic shadow-gap architecture with zero visible hardware.' },
      { code: '003', label: 'LIGHTING ENGINE', metric: '2700K CRI99', title: 'Chiaroscuro Rim Illumination', desc: 'Programmable linear grazing optics accentuating raw concrete grain.' }
    ],
    projects: [
      { tag: 'RESIDENCE 01', title: 'SLS Dubai Penthouse Atrium', stat: '4,800 m²', color: '#e4e4e7' },
      { tag: 'RESIDENCE 02', title: 'Torno Subito Monochrome Club', stat: 'Michelin Star', color: '#a1a1aa' },
      { tag: 'RESIDENCE 03', title: 'Rogue Basalt Pavilion', stat: 'Milan Salone', color: '#d4d4d8' },
      { tag: 'RESIDENCE 04', title: 'TenTwenty Digital Flagship', stat: 'WOTD Winner', color: '#fafafa' }
    ]
  },
  'fishfinger-creative': {
    id: 'kraken-odyssey',
    brandTitle: 'Fishfinger Creative',
    bg: '#160d29',
    surface: '#24153d',
    glass: 'rgba(38, 22, 66, 0.74)',
    fg: '#fef3c7',
    muted: '#d8b4fe',
    accent: '#f59e0b',
    accent2: '#c084fc',
    heroBgGrad: 'radial-gradient(circle at 50% 24%, rgba(245, 158, 11, 0.34) 0%, rgba(88, 28, 135, 0.78) 54%, #120924 100%)',
    marqueeText: 'FISHFINGER CREATIVE AGENCY • BESPOKE 3D ANIMATION & STORYTELLING • KRAKEN ODYSSEY • ',
    headlineTop: 'UNLEASH THE',
    headlineBottom: 'IMAGINATION',
    headlineSub: 'Award-winning interactive storytelling studio crafting 3D character worlds, WebGL ocean shaders, and cinematic brand campaigns.',
    specs: [
      { code: '001', label: '3D RIGGING', metric: '148 Bones', title: 'Procedural Kraken Tentacles', desc: 'Inverse-kinematic spline physics reacting in real time to cursor velocity.' },
      { code: '002', label: 'OCEAN SHADER', metric: '60 FPS WebGL', title: 'Gerstner Wave Crest Simulation', desc: 'Multi-layered sunset subsurface scattering across foam and golden sails.' },
      { code: '003', label: 'STORY ENGINE', metric: '100% WOTD', title: 'Interactive Brand Narratives', desc: 'Gamified scroll chapters built for global entertainment and lifestyle icons.' }
    ],
    projects: [
      { tag: 'VOYAGE 01', title: 'Kraken & Golden Galleon WebGL', stat: 'Site of the Day', color: '#f59e0b' },
      { tag: 'VOYAGE 02', title: 'Sunset Archipelago 3D Map', stat: '120FPS Shader', color: '#c084fc' },
      { tag: 'VOYAGE 03', title: 'Culinary Pirate Character Rig', stat: 'Octane Render', color: '#fbbf24' },
      { tag: 'VOYAGE 04', title: 'Bioluminescent Trench Soundscape', stat: 'Spatial Audio', color: '#a855f7' }
    ]
  },
  'adoratorio-summer': {
    id: 'retrofuture-club',
    brandTitle: 'Adoratorio Summer Club',
    bg: '#0c0c0e',
    surface: '#18181c',
    glass: 'rgba(28, 28, 34, 0.78)',
    fg: '#ffffff',
    muted: '#f472b6',
    accent: '#ff5522',
    accent2: '#ec4899',
    heroBgGrad: 'radial-gradient(circle at 50% 48%, rgba(236, 72, 153, 0.24) 0%, rgba(255, 85, 34, 0.16) 44%, #0c0c0e 100%)',
    marqueeText: 'ADORA SUMMER • TORIO CLUB • RETROFUTURE SOUND EXPERIMENT • PLAY NOW • ',
    headlineTop: 'ADORA SUMMER',
    headlineBottom: 'TORIO CLUB',
    headlineSub: 'Interactive retrofuture summer sound club — zero-gravity 3D pool inflatables, spatial synth bingo, and kinetic typography.',
    specs: [
      { code: '001', label: 'SYNTH ENGINE', metric: '128 BPM', title: 'WebAudio Retrofuture Sequencer', desc: 'Interactive spatial audio stems synchronized to 3D inflatable physics.' },
      { code: '002', label: 'SOFT-BODY 3D', metric: '240Hz Sim', title: 'Zero-G Vinyl Pool Floats', desc: 'Specular PVC shaders with real-time collision and depth-of-field bokeh.' },
      { code: '003', label: 'KINETIC TYPE', metric: '4x Stacked', title: 'Outline & Solid Strobe Header', desc: 'High-contrast brutalist club typography with magnetic cursor distortion.' }
    ],
    projects: [
      { tag: 'TRACK 01', title: 'Flamingo Poolside Synthwave', stat: 'Play Now ↗', color: '#ec4899' },
      { tag: 'TRACK 02', title: 'Inflatable Gator Bassline', stat: '128 BPM Live', color: '#ff5522' },
      { tag: 'TRACK 03', title: 'Frosted Donut Disco Dub', stat: '360° Visuals', color: '#f472b6' },
      { tag: 'TRACK 04', title: 'Italo-Disco Midnight Oasis', stat: 'VIP Pass', color: '#fb923c' }
    ]
  },
  'micai-aristide': {
    id: 'crypto-wealth-hud',
    brandTitle: 'MiCai Crypto Wealth',
    bg: '#070e22',
    surface: '#0f1b3d',
    glass: 'rgba(15, 27, 61, 0.78)',
    fg: '#f8fafc',
    muted: '#93c5fd',
    accent: '#2563eb',
    accent2: '#38bdf8',
    heroBgGrad: 'radial-gradient(circle at 30% 25%, rgba(37, 99, 235, 0.42) 0%, rgba(15, 23, 42, 0.92) 62%, #060b19 100%)',
    marqueeText: 'MICAI PRIVATE WEALTH • AI BLOCKCHAIN PORTFOLIO • REGISTER FOR ICO • 21D : 15H : 54M • ',
    headlineTop: 'CRYPTO WEALTH',
    headlineBottom: 'MANAGEMENT',
    headlineSub: 'MiCai is the world’s first private wealth management platform powered by AI and built on institutional quantum-resistant blockchain.',
    specs: [
      { code: '001', label: 'ROBO-ADVISORY', metric: '+34.8% APY', title: 'Autonomous AI Rebalancing', desc: 'Millisecond cross-chain liquidity routing and institutional risk hedging.' },
      { code: '002', label: 'ICO COUNTDOWN', metric: '21D : 15H', title: 'Tier-1 Token Allocation', desc: 'Audited smart-contract treasury with hardware multi-sig custody.' },
      { code: '003', label: 'QUANTUM VAULT', metric: '256-Bit ZK', title: 'Zero-Knowledge Wealth Privacy', desc: 'Private institutional portfolio verification without exposing wallet balances.' }
    ],
    projects: [
      { tag: 'VAULT 01', title: 'AI Robo-Advisory Alpha Fund', stat: '$420M TVL', color: '#2563eb' },
      { tag: 'VAULT 02', title: 'Zero-Knowledge Institutional Custody', stat: 'AAA Audited', color: '#38bdf8' },
      { tag: 'VAULT 03', title: 'Cross-Chain Treasury Yield Matrix', stat: '0.02s Finality', color: '#60a5fa' },
      { tag: 'VAULT 04', title: 'Private Family Office Token Desk', stat: '24/7 Concierge', color: '#93c5fd' }
    ]
  },
  'digital-kensei': {
    id: 'cyber-samurai-nft',
    brandTitle: 'Nexon Digital Kensei',
    headlineSub: 'Cyber-Samurai NFT showcase with crimson sun 3D warrior pop-out, overlapping rounded editorial card with inline pill imagery, and dark 4-card Bento legacy grid.'
  },
  'bame-esports': {
    id: 'esports-polygon-arena',
    brandTitle: 'Bame eSports Arena',
    headlineSub: 'Shaping the Future of eSports — neon-green polygon HUD, 3D Cyber-Wukong champion cutout, kinetic diagonal marquee, and inverted-corner tournament arena.'
  },
  'apex-upheaval': {
    id: 'tactical-legend-roster',
    brandTitle: 'Apex Upheaval Hub',
    headlineSub: 'Futuristic battle-royale landing page with diagonal crimson slash hero, 6-platform bar, 4-column squad directives, and interactive skewed parallelogram Legend roster.'
  },
  'nova-glass': {
    id: 'iridescent-crystal-portfolio',
    brandTitle: 'Nova Glass Studio',
    headlineSub: 'High-key pearl-ice glassmorphism UI/UX portfolio with 3D crystal visor bust cutout, animated skill progress bars, 3x3 tech stack matrix, and liquid refraction.'
  },
  'alex-carter-ui': {
    id: 'neon-cyan-glass-dev',
    brandTitle: 'Alex Carter UI/UX',
    headlineSub: 'Deep teal-obsidian and neon-cyan glassmorphic developer portfolio with zero-gravity 3D tesseract cube, hexagonal skill matrix, and interactive 01–05 process timeline.'
  },
  'tripg-ocean': {
    id: 'ocean-wave-curve',
    brandTitle: 'TripG Ocean Discovery',
    headlineSub: 'Clean white and turquoise ocean wave curve hero with 3D hydrofoil yacht cutout, straddling circular GO button, and interactive Paris–London–Dubaï–Phuket timeline.'
  },
  'apex-squad-light': {
    id: 'tactical-triangle-arena',
    brandTitle: 'Apex Legends Squad Hub',
    headlineSub: 'Light tactical bone-stone arena with glowing crimson-orange triangular emblem, 3D squad duo cutout, parallelogram navigation tabs, and squad loadout selector.'
  },
  'litera-bookstore': {
    id: 'bookstore-chat-concierge',
    brandTitle: 'Litera Bookstore & Chat',
    headlineSub: 'Warm cream editorial bookstore UI with 9 category icons, 5 hardcover ribbon cards, 3D floating collector book stack cutout, and live interactive Chat concierge sidebar.'
  },
  'fischer-motorsport': {
    id: 'diagonal-zigzag-atelier',
    brandTitle: 'Fischer KFZ-Meisterbetrieb',
    headlineSub: 'Carbon-black automotive master workshop with dramatic diagonal white & dark zig-zag geometric bands, 3D bronze executive coupe cutout, and 6-point TÜV inspection matrix.'
  },
  'japan-sunrise-tour': {
    id: 'fuji-sakura-expedition',
    brandTitle: 'Japan Sunrise Tours',
    headlineSub: '10-day Osaka, Kyoto & Tokyo expedition with masked JAPAN sunrise header, 3D vermilion pagoda & sakura cutout, 5 vertical glass cards, and vertical itinerary timeline.'
  },
  'industrix-engineering': {
    id: 'copper-ribbed-industrial',
    brandTitle: 'Industrix Engineering',
    headlineSub: 'Industrial automation & heavy engineering showcase with ribbed bronze-copper metallic columns, 3D brushed-copper arrow monument & turbine gear cutout, 4-stat telemetry, and 6-step commissioning grid.'
  },
  'aquarium-animals': {
    id: 'abyssal-popout-triptych',
    brandTitle: 'Aquarium Animals',
    headlineSub: 'Deep ocean marine sanctuary showcase featuring tall condensed ANIMALS typography and 3 out-of-bounds 3D pop-out cards (Sea Lions, Bioluminescent Jellyfish cutout, Manta Ray) with straddling yellow arrow buttons.'
  },
  'flash-rocky-mountain': {
    id: 'alpine-glacier-expedition',
    brandTitle: 'Flash Rocky Mountain',
    headlineSub: 'Moody alpine & turquoise glacial lake adventure portal with TIME TO TRAVEL cyan headline, 01–05 vertical slide rail, 3D Rocky Mountain diorama cutout, Popular Tours 4-card gallery, and staggered video grid.'
  },
  'steary-spatial-cinema': {
    id: 'visionos-spatial-streaming',
    brandTitle: 'Steary Spatial Cinema',
    headlineSub: 'Apple VisionOS spatial glassmorphic streaming app with floating steary.com address bar, vertical glass dock, New Trailer sidebar, 3D multiverse portal hero banner, and interactive 4-card movie row.'
  },
  'swatch-luxury-chronograph': {
    id: 'dual-circle-chronograph',
    brandTitle: "S'Watch Luxury Chronograph",
    headlineSub: 'Dark slate and warm cognac-terracotta dual-circle geometry framing a 3D stitched leather smartwatch cutout (12:38 OLED dial), interactive 01–04 strikethrough slide rail, and vertical WATCH stencil.'
  }
};

function getBlueprintForData(data) {
  const base = BLUEPRINTS[selectBlueprintIndex(data)];
  const s = String(data.slug || '').toLowerCase();
  const ov = SLUG_BLUEPRINT_OVERRIDES[s];
  if (!ov) return base;
  return { ...base, ...ov };
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
  const bp = getBlueprintForData(data);
  const evalScore = data.criteriaEvaluation?.totalScore || 98;
  const svgCenter = get3DCutoutMarkup(bp, p, data);

  // ============================================================================
  // BESPOKE PINTEREST DROP-FOLDER ARCHITECTURES (Curated Motion Recipes)
  // ============================================================================

  // 1. DIGITAL KENSEI (Cyber-Samurai NFT Showcase: Dark Crimson Hero + Overlapping Rounded White Card + Dark 4-Card Bento Legacy)
  // Motion Recipe: Parallax Crimson Sun & Samurai Depth + Animated Number Counters + 3D Bento Card Tilt
  if (data.slug === 'digital-kensei') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>NEXON — Digital Kensei Cyber-Samurai Collectible Showcase</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #08090c;
      --surface: #12141a;
      --white-card: #f5f5f7;
      --crimson: #dc2626;
      --crimson-glow: rgba(220, 38, 38, 0.45);
      --fg: #ffffff;
      --muted: #9ca3af;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .font-display { font-family: 'Anton', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.02em; }

    .${p}-nav {
      max-width: 1320px; margin: 0 auto; padding: 22px 24px;
      display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 30;
    }
    .${p}-btn-red {
      padding: 11px 24px; border-radius: 999px; background: var(--crimson); color: #fff;
      font-size: 13px; font-weight: 700; border: none; cursor: pointer;
      box-shadow: 0 8px 24px var(--crimson-glow); transition: transform 0.2s;
    }
    .${p}-btn-red:hover { transform: translateY(-2px); }

    .${p}-hero {
      max-width: 1320px; margin: 0 auto; padding: 28px 24px 110px;
      display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; position: relative;
    }
    @media (min-width: 980px) {
      .${p}-hero { grid-template-columns: 1.05fr 0.95fr; }
    }
    .${p}-h1 {
      font-size: clamp(54px, 8vw, 108px); line-height: 0.94; margin: 14px 0 20px;
    }
    .${p}-stage-right {
      position: relative; display: flex; align-items: center; justify-content: center; min-height: 440px;
    }
    .${p}-crimson-sun {
      position: absolute; width: clamp(280px, 34vw, 420px); height: clamp(280px, 34vw, 420px);
      border-radius: 50%; background: radial-gradient(circle, #ef4444 0%, #b91c1c 65%, rgba(185,28,28,0) 100%);
      box-shadow: 0 0 90px var(--crimson-glow); z-index: 1;
    }
    .${p}-samurai-cutout {
      position: relative; z-index: 3; width: 100%; max-width: 430px; height: auto;
      object-fit: contain; filter: drop-shadow(0 28px 44px rgba(0,0,0,0.85));
    }
    .${p}-nft-float-badge {
      position: absolute; bottom: 16px; right: 12px; z-index: 5;
      padding: 14px 18px; border-radius: 18px; background: rgba(18, 20, 26, 0.82);
      backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.14);
    }

    /* Overlapping White Rounded Editorial Card (#f5f5f7) */
    .${p}-white-sheet {
      max-width: 1320px; margin: -56px auto 0; position: relative; z-index: 10;
      background: var(--white-card); color: #090a0f; border-radius: 38px;
      padding: clamp(36px, 5vw, 72px); box-shadow: 0 32px 80px rgba(0,0,0,0.6);
    }
    .${p}-pillar-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 20px; margin: 32px 0 48px;
    }
    .${p}-pillar-card {
      background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; padding: 22px;
      transition: transform 0.25s;
    }
    .${p}-inline-pill {
      display: inline-flex; align-items: center; justify-content: center;
      width: 96px; height: 38px; border-radius: 999px; background: #090a0f; color: #fff;
      vertical-align: middle; margin: 0 8px; overflow: hidden; border: 2px solid var(--crimson);
    }
    .${p}-inline-pill img { width: 100%; height: 100%; object-fit: cover; }

    /* Dark 4-Card Bento Legacy Section */
    .${p}-bento-sec { max-width: 1320px; margin: 0 auto; padding: 88px 24px; }
    .${p}-bento-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-top: 36px;
    }
    .${p}-bento-card {
      background: var(--surface); border: 1px solid rgba(255,255,255,0.1); border-radius: 26px;
      padding: 30px; display: flex; flex-direction: column; justify-content: space-between; min-height: 230px;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .${p}-bento-card.crimson {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      border-color: rgba(255,255,255,0.25);
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(8,9,12,0.88); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <header class="${p}-nav">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:32px;height:32px;border-radius:8px;background:var(--crimson);display:inline-flex;align-items:center;justify-content:center;font-weight:800;">侍</span>
      <strong style="font-size:18px;letter-spacing:0.12em;">NEXON</strong>
    </div>
    <nav style="display:flex;gap:28px;" aria-label="Main Navigation">
      <a href="#warriorWay" style="color:var(--muted);text-decoration:none;font-size:13px;">Bushido Code</a>
      <a href="#kenseiLegacy" style="color:var(--muted);text-decoration:none;font-size:13px;">Bento Stats</a>
      <a href="#kenseiLegacy" style="color:var(--muted);text-decoration:none;font-size:13px;">Hall of Fame</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" style="padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);color:#fff;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-red">Connect Wallet</button>
    </div>
  </header>

  <main>
    <!-- SECTION 1: DARK CRIMSON SAMURAI HERO -->
    <section class="${p}-hero">
      <div data-parallax="0.06">
        <div style="display:inline-flex;align-items:center;gap:10px;padding:6px 14px;border-radius:999px;background:rgba(220,38,38,0.16);border:1px solid rgba(220,38,38,0.4);color:#fca5a5;font-size:12px;font-weight:700;">
          <span>サムライ • GENESIS RONIN PROTOCOL</span>
        </div>
        <h1 class="${p}-h1 font-display">
          DIGITAL<br><span style="color:var(--crimson);">KENSEI</span>
        </h1>
        <p style="font-size:16px;color:var(--muted);max-width:500px;line-height:1.65;margin-bottom:28px;">
          8,888 hand-forged cybernetic Ronin guardians living on Ethereum. Engineered with procedural carbon-weave armor, optical katana shaders, and on-chain Bushido governance.
        </p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:36px;">
          <button type="button" class="${p}-btn-red" data-modal-open="Mint Digital Kensei — Genesis Pass">Explore Collection ↗</button>
          <a href="#warriorWay" style="padding:11px 22px;border-radius:999px;border:1px solid rgba(255,255,255,0.2);color:#fff;text-decoration:none;font-size:13px;font-weight:600;">Read Bushido Lore</a>
        </div>
        <div style="display:flex;gap:36px;flex-wrap:wrap;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);">
          <div><strong style="font-size:28px;display:block;" data-counter="8888" data-suffix="">8,888</strong><span style="font-size:12px;color:var(--muted);">Ronin Supply</span></div>
          <div><strong style="font-size:28px;display:block;color:var(--crimson);" data-counter="180" data-suffix="+ ETH">180+ ETH</strong><span style="font-size:12px;color:var(--muted);">Trading Volume</span></div>
          <div><strong style="font-size:28px;display:block;" data-counter="4200" data-suffix="+">4,200+</strong><span style="font-size:12px;color:var(--muted);">Unique Holders</span></div>
        </div>
      </div>

      <div class="${p}-stage-right">
        <div class="${p}-crimson-sun" data-parallax="-0.05"></div>
        <img src="assets/cutout.webp" alt="Digital Kensei 3D Cyber Samurai" class="${p}-samurai-cutout" data-tilt-card />
        <div class="${p}-nft-float-badge">
          <span style="font-size:11px;color:#fca5a5;display:block;">KENSEI #0089 • MYTHIC TIER</span>
          <strong style="font-size:16px;">Current Bid: 2.85 ETH</strong>
        </div>
      </div>
    </section>

    <!-- SECTION 2: OVERLAPPING WHITE EDITORIAL SHEET WITH INLINE PILL IMAGERY -->
    <section id="warriorWay" class="${p}-white-sheet">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span style="font-size:12px;font-weight:800;color:var(--crimson);letter-spacing:0.14em;text-transform:uppercase;">01 // BUSHIDO CODEX</span>
          <h2 class="font-display" style="font-size:clamp(32px,4.5vw,56px);margin-top:6px;">THE WAY OF THE DIGITAL WARRIOR</h2>
        </div>
        <p style="font-size:14px;color:#4b5563;max-width:420px;">
          Merging Edo-period swordsmanship silhouettes with real-time Unreal Engine 5 metahuman rigging.
        </p>
      </div>

      <div class="${p}-pillar-grid">
        <article class="${p}-pillar-card" data-tilt-card>
          <span style="font-size:12px;font-weight:800;color:var(--crimson);">01 / HONOR</span>
          <h3 style="font-size:18px;margin:8px 0 6px;">On-Chain Lineage</h3>
          <p style="font-size:13px;color:#4b5563;line-height:1.55;">Every katana trait and armor patina is deterministically stored on Ethereum L1.</p>
        </article>
        <article class="${p}-pillar-card" data-tilt-card>
          <span style="font-size:12px;font-weight:800;color:var(--crimson);">02 / PRECISION</span>
          <h3 style="font-size:18px;margin:8px 0 6px;">4K GLTF Rigging</h3>
          <p style="font-size:13px;color:#4b5563;line-height:1.55;">Holders unlock full 3D blender &amp; Unreal files ready for virtual production.</p>
        </article>
        <article class="${p}-pillar-card" data-tilt-card>
          <span style="font-size:12px;font-weight:800;color:var(--crimson);">03 / CLAN DAO</span>
          <h3 style="font-size:18px;margin:8px 0 6px;">Shogunate Treasury</h3>
          <p style="font-size:13px;color:#4b5563;line-height:1.55;">100% of secondary royalties fund anime shorts and physical resin statues.</p>
        </article>
        <article class="${p}-pillar-card" data-tilt-card>
          <span style="font-size:12px;font-weight:800;color:var(--crimson);">04 / ASCENSION</span>
          <h3 style="font-size:18px;margin:8px 0 6px;">Soulbound Blades</h3>
          <p style="font-size:13px;color:#4b5563;line-height:1.55;">Stake your Ronin to forge elemental plasma katanas every seasonal equinox.</p>
        </article>
      </div>

      <!-- Editorial Statement with Inline Pill Cutouts -->
      <div style="padding:28px;border-radius:24px;background:#e5e7eb;text-align:center;">
        <p class="font-display" style="font-size:clamp(26px,3.8vw,48px);line-height:1.25;color:#111827;">
          CRAFTED BY MASTER ARTISTS <span class="${p}-inline-pill"><img src="assets/cutout.webp" alt="Kensei Pill"/></span>
          FORGED IN IMMUTABLE CODE <span class="${p}-inline-pill" style="background:var(--crimson);">侍 089</span>
          BUILT FOR THE METAVERSE
        </p>
      </div>
    </section>

    <!-- SECTION 3: DARK 4-CARD BENTO LEGACY GRID -->
    <section id="kenseiLegacy" class="${p}-bento-sec">
      <span style="font-size:12px;color:var(--crimson);font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">02 // ECOSYSTEM TELEMETRY</span>
      <h2 class="font-display" style="font-size:clamp(34px,4.5vw,58px);margin-top:6px;">THE KENSEI LEGACY</h2>

      <div class="${p}-bento-grid">
        <article class="${p}-bento-card crimson" data-tilt-card>
          <span style="font-size:12px;font-weight:700;opacity:0.85;">PRIMARY + SECONDARY VOLUME</span>
          <strong class="font-display" style="font-size:56px;line-height:1;" data-counter="180" data-suffix="+ ETH">180+ ETH</strong>
          <p style="font-size:13px;opacity:0.9;">Zero-sweep organic collector volume across OpenSea and Blur.</p>
        </article>
        <article class="${p}-bento-card" data-tilt-card>
          <span style="font-size:12px;color:var(--crimson);font-weight:700;">RARITY HIERARCHY</span>
          <strong class="font-display" style="font-size:56px;line-height:1;" data-counter="3" data-suffix=" TIERS">3 TIERS</strong>
          <p style="font-size:13px;color:var(--muted);">Ashigaru Vanguard, Cyber-Ronin, and 1-of-1 Celestial Shogun editions.</p>
        </article>
        <article class="${p}-bento-card" data-tilt-card>
          <span style="font-size:12px;color:var(--crimson);font-weight:700;">CUSTOM TRAITS</span>
          <strong class="font-display" style="font-size:56px;line-height:1;" data-counter="500" data-suffix="+">500+</strong>
          <p style="font-size:13px;color:var(--muted);">Hand-sculpted mempo masks, neon visors, and braided kasa hats.</p>
        </article>
        <article class="${p}-bento-card" data-tilt-card>
          <span style="font-size:12px;color:var(--crimson);font-weight:700;">DAO GUARDIANS</span>
          <strong class="font-display" style="font-size:56px;line-height:1;" data-counter="200" data-suffix="+">200+</strong>
          <p style="font-size:13px;color:var(--muted);">Genesis council members governing the Nexon Anime Incubator.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="kenseiModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="kenseiModalTitle">
    <div style="max-width:520px;width:100%;background:#12141a;border:1px solid rgba(220,38,38,0.4);border-radius:28px;padding:32px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="font-size:12px;color:var(--crimson);font-weight:700;">NEXON SHOGUNATE GATEWAY</span>
        <button type="button" id="closeModalBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 12px;border-radius:999px;cursor:pointer;">Close</button>
      </div>
      <h2 id="kenseiModalTitle" class="font-display" style="font-size:32px;margin-bottom:10px;">MINT GENESIS KENSEI</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:22px;">Connect your Ethereum wallet to inspect trait provenance or claim your physical 1/6 scale Ronin statue allocation.</p>
      <button type="button" class="${p}-btn-red" style="width:100%;" onclick="document.getElementById('kenseiModal').classList.remove('is-open')">Sign Bushido Message</button>
    </div>
  </div>

  <script>
    (function(){
      var paused = false;
      var btn = document.getElementById('motionToggleBtn');
      if (btn) btn.addEventListener('click', function(){
        paused = !paused;
        btn.textContent = paused ? 'Motion: PAUSED' : 'Motion: ON';
      });
      window.addEventListener('scroll', function(){
        if (paused) return;
        var y = window.scrollY || 0;
        document.querySelectorAll('[data-parallax]').forEach(function(el){
          var s = parseFloat(el.getAttribute('data-parallax') || '0.05');
          el.style.transform = 'translate3d(0,' + (y * s).toFixed(1) + 'px,0)';
        });
      }, { passive: true });
      document.querySelectorAll('[data-tilt-card]').forEach(function(card){
        card.addEventListener('mousemove', function(e){
          if (paused) return;
          var r = card.getBoundingClientRect();
          var nx = (e.clientX - r.left) / r.width - 0.5;
          var ny = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = 'perspective(900px) rotateX(' + (-ny * 9).toFixed(2) + 'deg) rotateY(' + (nx * 11).toFixed(2) + 'deg)';
        });
        card.addEventListener('mouseleave', function(){ card.style.transform = ''; });
      });
      var modal = document.getElementById('kenseiModal');
      var openBtns = document.querySelectorAll('#exploreMagneticBtn, [data-modal-open]');
      openBtns.forEach(function(b){ b.addEventListener('click', function(){ if (modal) modal.classList.add('is-open'); }); });
      var closeBtn = document.getElementById('closeModalBtn');
      if (closeBtn) closeBtn.addEventListener('click', function(){ modal.classList.remove('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 2. BAME ESPORTS (Neon-Green #45f882 & Gold #ffbe18 Polygon HUD + 3D Cyber-Wukong Champion + Diagonal Marquee + Inverted-Corner Arena)
  // Motion Recipe: Infinite Kinetic Marquee + Magnetic Chamfered Polygon Buttons + Interactive Tournament Filter
  if (data.slug === 'bame-esports') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>BAME — Shaping the Future of eSports &amp; Pro Gaming</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,600;0,700;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0e13;
      --surface: #141923;
      --neon: #45f882;
      --gold: #ffbe18;
      --fg: #ffffff;
      --muted: #94a3b8;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .esports-font { font-family: 'Chakra Petch', sans-serif; text-transform: uppercase; }

    .${p}-hud-nav {
      max-width: 1360px; margin: 0 auto; padding: 18px 24px;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid rgba(69,248,130,0.2); background: rgba(11,14,19,0.88); backdrop-filter: blur(14px);
    }
    .${p}-poly-btn {
      padding: 13px 28px; background: var(--neon); color: #07110b;
      font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 14px; text-transform: uppercase;
      letter-spacing: 0.06em; border: none; cursor: pointer;
      clip-path: polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
      transition: transform 0.2s, background 0.2s;
    }
    .${p}-poly-btn:hover { background: var(--gold); }
    .${p}-poly-outline {
      padding: 13px 26px; background: rgba(69,248,130,0.1); color: var(--neon);
      font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 14px; text-transform: uppercase;
      border: 1px solid var(--neon); cursor: pointer;
      clip-path: polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
    }

    .${p}-hero {
      max-width: 1360px; margin: 0 auto; padding: 48px 24px 64px;
      display: grid; grid-template-columns: 1fr; gap: 36px; align-items: center;
    }
    @media (min-width: 980px) {
      .${p}-hero { grid-template-columns: 1.05fr 0.95fr; }
    }
    .${p}-h1 {
      font-size: clamp(44px, 6.5vw, 84px); line-height: 0.96; margin: 14px 0 20px;
    }
    .${p}-arena-card {
      position: relative; background: radial-gradient(circle at 50% 35%, rgba(69,248,130,0.25), #141923 72%);
      border: 1px solid rgba(69,248,130,0.35); padding: 28px;
      clip-path: polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px);
      text-align: center;
    }
    .${p}-wukong-img {
      width: 100%; max-width: 410px; height: auto; object-fit: contain; margin: 0 auto; display: block;
      filter: drop-shadow(0 24px 36px rgba(0,0,0,0.85));
    }

    /* Kinetic Neon Marquee Strip */
    .${p}-marquee-bar {
      background: var(--neon); color: #06100a; padding: 14px 0; overflow: hidden;
      border-top: 2px solid var(--gold); border-bottom: 2px solid var(--gold);
    }
    .${p}-marquee-track {
      display: flex; gap: 32px; width: max-content; font-family: 'Chakra Petch', sans-serif;
      font-size: 18px; font-weight: 700; letter-spacing: 0.08em; animation: ${p}EsportsMarquee 20s linear infinite;
    }
    @keyframes ${p}EsportsMarquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }

    .${p}-sec { max-width: 1360px; margin: 0 auto; padding: 80px 24px; }
    .${p}-game-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 22px; margin-top: 36px; }
    .${p}-game-card {
      background: var(--surface); border: 1px solid rgba(255,255,255,0.1); padding: 26px;
      clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
      transition: border-color 0.25s, transform 0.25s;
    }
    .${p}-game-card:hover { border-color: var(--neon); transform: translateY(-5px); }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(11,14,19,0.9); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <header class="${p}-hud-nav">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:14px;height:14px;background:var(--neon);clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);"></span>
      <strong class="esports-font" style="font-size:24px;letter-spacing:0.08em;">BAME<span style="color:var(--neon);">.GG</span></strong>
    </div>
    <nav style="display:flex;gap:24px;" aria-label="Main Navigation">
      <a href="#forgingLegends" class="esports-font" style="color:var(--neon);text-decoration:none;font-size:14px;">Home</a>
      <a href="#forgingLegends" class="esports-font" style="color:var(--fg);text-decoration:none;font-size:14px;">About Us</a>
      <a href="#ourGames" class="esports-font" style="color:var(--fg);text-decoration:none;font-size:14px;">Tournament</a>
      <a href="#ourGames" class="esports-font" style="color:var(--fg);text-decoration:none;font-size:14px;">Games</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-poly-outline" style="padding:8px 16px;font-size:12px;" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-poly-btn" data-magnetic>JOIN TOURNAMENT ↗</button>
    </div>
  </header>

  <main>
    <section class="${p}-hero">
      <div>
        <span class="esports-font" style="color:var(--neon);font-size:14px;letter-spacing:0.16em;">✦ WORLD CYBER ARENA SEASON IX</span>
        <h1 class="${p}-h1 esports-font">
          SHAPING THE FUTURE OF <span style="color:var(--neon);">ESPORTS</span>
        </h1>
        <p style="font-size:16px;color:var(--muted);max-width:520px;line-height:1.65;margin-bottom:28px;">
          Enter high-stakes global brackets with real-time anti-cheat telemetry, instant smart-contract prize payouts, and 240Hz cloud spectator arenas.
        </p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <button type="button" class="${p}-poly-btn" data-magnetic onclick="document.getElementById('bameModal').classList.add('is-open')">EXPLORE MORE ↗</button>
          <a href="#ourGames" class="${p}-poly-outline" style="text-decoration:none;">VIEW BRACKETS</a>
        </div>
      </div>

      <div class="${p}-arena-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span class="esports-font" style="color:var(--gold);font-size:13px;">★ JOIN THE BIG TOURNAMENTS</span>
          <span class="esports-font" style="background:rgba(69,248,130,0.16);color:var(--neon);padding:4px 10px;font-size:12px;">PRIZE POOL: $250,000</span>
        </div>
        <img src="assets/cutout.webp" alt="Cyber-Wukong eSports Champion" class="${p}-wukong-img" />
      </div>
    </section>

    <!-- KINETIC MARQUEE -->
    <div class="${p}-marquee-bar" aria-label="eSports Highlights">
      <div class="${p}-marquee-track">
        <span>✦ GAMING SPANING</span><span>✦ ACTION - PACKED</span><span>✦ MIND - BENDING</span><span>✦ COLLECTION OG GAMES</span>
        <span>✦ GAMING SPANING</span><span>✦ ACTION - PACKED</span><span>✦ MIND - BENDING</span><span>✦ COLLECTION OG GAMES</span>
      </div>
    </div>

    <!-- ABOUT US: FORGING LEGENDS IN THE GAMING UNIVERSE -->
    <section id="forgingLegends" class="${p}-sec">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:36px;align-items:center;">
        <div>
          <span class="esports-font" style="color:var(--neon);font-size:13px;letter-spacing:0.14em;"># ABOUT OUR ARENA</span>
          <h2 class="esports-font" style="font-size:clamp(32px,4.2vw,52px);margin:10px 0 18px;">
            FORGING LEGENDS IN THE <span style="color:var(--gold);">GAMING UNIVERSE</span>
          </h2>
          <p style="font-size:15px;color:var(--muted);line-height:1.65;">
            From grassroots 5v5 qualifiers to stadium-packed Masters finals, Bame powers pro rosters with sub-millisecond server mesh and automated tournament operations.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
          <div class="${p}-game-card" style="text-align:center;">
            <strong class="esports-font" style="font-size:34px;color:var(--neon);">10K+</strong>
            <span style="display:block;font-size:12px;color:var(--muted);margin-top:4px;">Live Streams</span>
          </div>
          <div class="${p}-game-card" style="text-align:center;">
            <strong class="esports-font" style="font-size:34px;color:var(--gold);">50+</strong>
            <span style="display:block;font-size:12px;color:var(--muted);margin-top:4px;">Pro Leagues</span>
          </div>
          <div class="${p}-game-card" style="text-align:center;">
            <strong class="esports-font" style="font-size:34px;color:#fff;">99.9%</strong>
            <span style="display:block;font-size:12px;color:var(--muted);margin-top:4px;">Anti-Cheat</span>
          </div>
        </div>
      </div>
    </section>

    <!-- OUR GAME SHOWCASE -->
    <section id="ourGames" class="${p}-sec" style="padding-top:0;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <span class="esports-font" style="color:var(--neon);font-size:13px;"># OFFICIAL TITLES</span>
          <h2 class="esports-font" style="font-size:clamp(30px,3.8vw,46px);margin-top:6px;">OUR FEATURED GAMES</h2>
        </div>
      </div>
      <div class="${p}-game-grid">
        <article class="${p}-game-card">
          <span class="esports-font" style="color:var(--neon);font-size:12px;">ENTRY FEE: FREE • 5V5 ARENA</span>
          <h3 class="esports-font" style="font-size:24px;margin:10px 0;">THE HUNTER KILLER</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">Tactical cyber-assault bracket with $50,000 weekly prize pool.</p>
        </article>
        <article class="${p}-game-card">
          <span class="esports-font" style="color:var(--gold);font-size:12px;">ENTRY FEE: 10 USDT • CHAMPIONSHIP</span>
          <h3 class="esports-font" style="font-size:24px;margin:10px 0;">NETLAND CHAMPIONS</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">Mythic MOBA showdown featuring Cyber-Wukong division qualifiers.</p>
        </article>
        <article class="${p}-game-card">
          <span class="esports-font" style="color:var(--neon);font-size:12px;">ENTRY FEE: VIP PASS • BATTLE ROYALE</span>
          <h3 class="esports-font" style="font-size:24px;margin:10px 0;">CYBERPUNK ROYALE</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">60-squad neon drop-zone with live twitch telemetry overlays.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="bameModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="bameModalTitle">
    <div class="${p}-arena-card" style="max-width:520px;width:100%;text-align:left;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="esports-font" style="color:var(--neon);font-size:13px;">BAME TOURNAMENT LOBBY</span>
        <button type="button" class="${p}-poly-outline" style="padding:6px 12px;font-size:11px;" onclick="document.getElementById('bameModal').classList.remove('is-open')">CLOSE</button>
      </div>
      <h2 id="bameModalTitle" class="esports-font" style="font-size:28px;margin-bottom:10px;">REGISTER YOUR 5V5 ROSTER</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Lock in your team seed for the $250,000 World Cyber Arena qualifier.</p>
      <button type="button" class="${p}-poly-btn" style="width:100%;" onclick="document.getElementById('bameModal').classList.remove('is-open')">CONFIRM SQUAD SEED</button>
    </div>
  </div>

  <script>
    (function(){
      var paused = false;
      var btn = document.getElementById('motionToggleBtn');
      if (btn) btn.addEventListener('click', function(){
        paused = !paused;
        btn.textContent = paused ? 'Motion: PAUSED' : 'Motion: ON';
      });
      document.querySelectorAll('[data-magnetic]').forEach(function(el){
        el.addEventListener('mousemove', function(e){
          if (paused) return;
          var r = el.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
          var dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
          el.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)';
        });
        el.addEventListener('mouseleave', function(){ el.style.transform = ''; });
      });
      var expBtn = document.getElementById('exploreMagneticBtn');
      if (expBtn) expBtn.addEventListener('click', function(){ document.getElementById('bameModal').classList.add('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 3. APEX UPHEAVAL (Diagonal Crimson Slash Hero + 6-Platform Bar + 4-Col Squad Directives + Interactive Skewed Parallelogram Legend Roster)
  // Motion Recipe: Skewed Parallelogram Hover Accordion & Mask Reveal + Split-Text Headline + Seamless Legend Dossier Modal
  if (data.slug === 'apex-upheaval') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>APEX LEGENDS: UPHEAVAL — Tactical Legend Roster &amp; Season Hub</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Teko:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0d0d0f;
      --surface: #16171b;
      --crimson: #c92a2a;
      --crimson-bright: #ef4444;
      --fg: #ffffff;
      --muted: #9ca3af;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .font-teko { font-family: 'Teko', sans-serif; text-transform: uppercase; letter-spacing: 0.03em; }

    .${p}-nav {
      max-width: 1400px; margin: 0 auto; padding: 16px 24px;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 30;
    }
    .${p}-btn-apex {
      padding: 10px 26px; background: var(--crimson); color: #fff;
      font-family: 'Teko', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: 0.06em;
      border: none; cursor: pointer; transform: skewX(-10deg);
    }

    .${p}-hero {
      position: relative; overflow: hidden; padding: 48px 24px 64px;
      background: linear-gradient(125deg, #16171b 0%, #0d0d0f 52%, #7f1d1d 52.2%, #c92a2a 100%);
    }
    .${p}-hero-inner {
      max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center;
    }
    @media (min-width: 980px) {
      .${p}-hero-inner { grid-template-columns: 1.05fr 0.95fr; }
    }
    .${p}-h1 {
      font-size: clamp(58px, 8.5vw, 118px); line-height: 0.88; margin: 10px 0 16px;
    }
    .${p}-cutout-img {
      width: 100%; max-width: 420px; height: auto; object-fit: contain; margin: 0 auto; display: block;
      filter: drop-shadow(0 28px 48px rgba(0,0,0,0.85));
    }

    .${p}-platform-bar {
      background: #141519; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 16px 24px; display: flex; justify-content: center; gap: 36px; flex-wrap: wrap;
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
    }

    .${p}-sec { max-width: 1360px; margin: 0 auto; padding: 76px 24px; }
    .${p}-directives { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; margin-top: 28px; }
    .${p}-dir-card {
      background: var(--surface); border-left: 3px solid var(--crimson); padding: 24px;
    }

    /* Signature Skewed Parallelogram Legend Roster */
    .${p}-roster-strip {
      display: flex; gap: 10px; height: 340px; margin-top: 32px; overflow-x: auto; padding: 8px 18px;
    }
    .${p}-legend-slice {
      flex: 1; min-width: 120px; background: linear-gradient(180deg, #27272a 0%, #111215 100%);
      border: 1px solid rgba(255,255,255,0.14); transform: skewX(-10deg);
      padding: 22px 18px; display: flex; flex-direction: column; justify-content: flex-end;
      cursor: pointer; position: relative; overflow: hidden;
      transition: flex 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, background 0.3s;
    }
    .${p}-legend-slice:hover, .${p}-legend-slice.is-active {
      flex: 2.2; border-color: var(--crimson-bright);
      background: linear-gradient(180deg, rgba(201,42,42,0.55) 0%, #111215 100%);
    }
    .${p}-legend-slice > * { transform: skewX(10deg); }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(13,13,15,0.9); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <header class="${p}-nav">
    <strong class="font-teko" style="font-size:30px;color:#fff;">APEX <span style="color:var(--crimson-bright);">UPHEAVAL</span></strong>
    <nav style="display:flex;gap:24px;" aria-label="Main Navigation">
      <a href="#directives" style="color:var(--muted);text-decoration:none;font-size:13px;font-weight:600;">ABOUT</a>
      <a href="#legendRoster" style="color:#fff;text-decoration:none;font-size:13px;font-weight:600;">LEGENDS</a>
      <a href="#latestNews" style="color:var(--muted);text-decoration:none;font-size:13px;font-weight:600;">NEWS</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" style="padding:7px 14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:12px;cursor:pointer;" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-apex">PLAY FREE NOW</button>
    </div>
  </header>

  <main>
    <section class="${p}-hero">
      <div class="${p}-hero-inner">
        <div>
          <span style="display:inline-block;padding:4px 12px;background:var(--crimson);font-size:12px;font-weight:700;letter-spacing:0.12em;">SEASON 21 // OUTLANDS PROTOCOL</span>
          <h1 class="${p}-h1 font-teko">APEX LEGENDS<br><span style="color:#fca5a5;">UPHEAVAL</span></h1>
          <p style="font-size:15px;color:rgba(255,255,255,0.82);max-width:500px;line-height:1.6;margin-bottom:24px;">
            Conquer with character in Apex Legends, a free-to-play Hero shooter where legendary challengers with powerful abilities team up to battle for fame &amp; fortune on the fringes of the Frontier.
          </p>
          <div style="display:flex;gap:14px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-apex" onclick="document.getElementById('apexModal').classList.add('is-open')">PLAY FREE*</button>
            <a href="#legendRoster" class="${p}-btn-apex" style="background:rgba(255,255,255,0.12);text-decoration:none;">MEET THE LEGENDS</a>
          </div>
        </div>
        <div>
          <img src="assets/cutout.webp" alt="Apex Upheaval Legend Operative" class="${p}-cutout-img" />
        </div>
      </div>
    </section>

    <div class="${p}-platform-bar">
      <span>PlayStation 4</span><span>PlayStation 5</span><span>Xbox One</span><span>Xbox Series X|S</span><span>Nintendo Switch</span><span>PC via EA App &amp; Steam</span>
    </div>

    <!-- 4-COLUMN SQUAD DIRECTIVES -->
    <section id="directives" class="${p}-sec">
      <h2 class="font-teko" style="font-size:clamp(36px,4.5vw,56px);">BEYOND BATTLE ROYALE</h2>
      <div class="${p}-directives">
        <article class="${p}-dir-card">
          <span class="font-teko" style="font-size:22px;color:var(--crimson-bright);">01 // DROP IN</span>
          <h3 class="font-teko" style="font-size:30px;margin:4px 0;">CHOOSE YOUR LANDING ZONE</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.55;">Master verticality and jumpmaster trajectories across Broken Moon and World's Edge.</p>
        </article>
        <article class="${p}-dir-card">
          <span class="font-teko" style="font-size:22px;color:var(--crimson-bright);">02 // LOOT UP</span>
          <h3 class="font-teko" style="font-size:30px;margin:4px 0;">EVO ARMOR &amp; LOADOUTS</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.55;">Level up your Legend class perks mid-match through squad combat and tactical objectives.</p>
        </article>
        <article class="${p}-dir-card">
          <span class="font-teko" style="font-size:22px;color:var(--crimson-bright);">03 // SQUAD UP</span>
          <h3 class="font-teko" style="font-size:30px;margin:4px 0;">ULTIMATE SYNERGY</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.55;">Combine void portals, sonar scans, and orbital bombardments for decisive wipes.</p>
        </article>
        <article class="${p}-dir-card">
          <span class="font-teko" style="font-size:22px;color:var(--crimson-bright);">04 // BE THE LAST</span>
          <h3 class="font-teko" style="font-size:30px;margin:4px 0;">APEX PREDATOR RANKED</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.55;">Outlast 20 squads inside the closing ring to claim the Apex Champion crown.</p>
        </article>
      </div>
    </section>

    <!-- SKEWED PARALLELOGRAM LEGEND ROSTER -->
    <section id="legendRoster" class="${p}-sec" style="padding-top:0;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;">
        <div>
          <span style="font-size:12px;color:var(--crimson-bright);font-weight:700;letter-spacing:0.14em;">INTERACTIVE PARALLELOGRAM ROSTER</span>
          <h2 class="font-teko" style="font-size:clamp(38px,4.8vw,62px);">MEET THE LEGENDS</h2>
        </div>
        <p id="activeLegendReadout" style="font-size:14px;color:#fca5a5;font-weight:600;">ACTIVE DOSSIER: WRAITH — INTERDIMENSIONAL SKIRMISHER</p>
      </div>

      <div class="${p}-roster-strip">
        <div class="${p}-legend-slice is-active" data-legend="WRAITH — Interdimensional Skirmisher (Into the Void / Dimensional Rift)">
          <span style="font-size:11px;color:#fca5a5;font-weight:700;">SKIRMISHER</span>
          <strong class="font-teko" style="font-size:34px;">WRAITH</strong>
        </div>
        <div class="${p}-legend-slice" data-legend="PATHFINDER — Forward Scout (Grappling Hook / Zipline Gun)">
          <span style="font-size:11px;color:#fca5a5;font-weight:700;">SKIRMISHER</span>
          <strong class="font-teko" style="font-size:34px;">PATHFINDER</strong>
        </div>
        <div class="${p}-legend-slice" data-legend="BLOODHOUND — Technological Tracker (Eye of the Allfather / Beast of the Hunt)">
          <span style="font-size:11px;color:#fca5a5;font-weight:700;">RECON</span>
          <strong class="font-teko" style="font-size:34px;">BLOODHOUND</strong>
        </div>
        <div class="${p}-legend-slice" data-legend="LIFELINE — Combat Medic (D.O.C. Heal Drone / Care Package)">
          <span style="font-size:11px;color:#fca5a5;font-weight:700;">SUPPORT</span>
          <strong class="font-teko" style="font-size:34px;">LIFELINE</strong>
        </div>
        <div class="${p}-legend-slice" data-legend="BANGALORE — Professional Soldier (Smoke Launcher / Rolling Thunder)">
          <span style="font-size:11px;color:#fca5a5;font-weight:700;">ASSAULT</span>
          <strong class="font-teko" style="font-size:34px;">BANGALORE</strong>
        </div>
        <div class="${p}-legend-slice" data-legend="OCTANE — High-Speed Daredevil (Stim / Launch Pad)">
          <span style="font-size:11px;color:#fca5a5;font-weight:700;">SKIRMISHER</span>
          <strong class="font-teko" style="font-size:34px;">OCTANE</strong>
        </div>
      </div>
    </section>

    <section id="latestNews" class="${p}-sec" style="padding-top:0;">
      <h2 class="font-teko" style="font-size:clamp(34px,4vw,52px);">LATEST DISPATCHES</h2>
      <div class="${p}-directives">
        <article class="${p}-dir-card"><span style="font-size:11px;color:var(--crimson-bright);">PATCH NOTES</span><h3 class="font-teko" style="font-size:26px;margin-top:6px;">UPHEAVAL MID-SEASON BALANCE UPDATE</h3></article>
        <article class="${p}-dir-card"><span style="font-size:11px;color:var(--crimson-bright);">ALGS ESPORTS</span><h3 class="font-teko" style="font-size:26px;margin-top:6px;">SPLIT 2 PLAYOFFS BRACKET REVEALED</h3></article>
        <article class="${p}-dir-card"><span style="font-size:11px;color:var(--crimson-bright);">MAP ROTATION</span><h3 class="font-teko" style="font-size:26px;margin-top:6px;">BROKEN MOON QUARANTINE ZONE GUIDE</h3></article>
        <article class="${p}-dir-card"><span style="font-size:11px;color:var(--crimson-bright);">COLLECTION EVENT</span><h3 class="font-teko" style="font-size:26px;margin-top:6px;">VOID RECKONING PRESTIGE ARTIFACT</h3></article>
      </div>
    </section>
  </main>

  <div id="apexModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="apexModalTitle">
    <div style="max-width:520px;width:100%;background:#16171b;border-left:4px solid var(--crimson);padding:32px;">
      <h2 id="apexModalTitle" class="font-teko" style="font-size:38px;margin-bottom:8px;">DEPLOY TO THE OUTLANDS</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Select your platform to download Apex Legends: Upheaval free-to-play client.</p>
      <button type="button" class="${p}-btn-apex" style="width:100%;" onclick="document.getElementById('apexModal').classList.remove('is-open')">LAUNCH EA APP / STEAM</button>
    </div>
  </div>

  <script>
    (function(){
      var slices = document.querySelectorAll('.${p}-legend-slice');
      var readout = document.getElementById('activeLegendReadout');
      slices.forEach(function(s){
        s.addEventListener('mouseenter', function(){
          slices.forEach(function(x){ x.classList.remove('is-active'); });
          s.classList.add('is-active');
          if (readout) readout.textContent = 'ACTIVE DOSSIER: ' + s.getAttribute('data-legend');
        });
      });
      var expBtn = document.getElementById('exploreMagneticBtn');
      if (expBtn) expBtn.addEventListener('click', function(){ document.getElementById('apexModal').classList.add('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 4. NOVA GLASS (High-Key Pearl-Ice Iridescent Frosted Glass UI/UX Portfolio + 3D Crystal Visor Bust + Animated Skill Progress Bars + 3x3 Tech Matrix)
  // Motion Recipe: Scroll-Triggered Animated Progress Bars & Counters + 3D Specular Glass Card Tilt + Liquid SVG Iridescent Refraction
  if (data.slug === 'nova-glass') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>NOVA GLASS — Digital Designer &amp; Experience Architect</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-grad: linear-gradient(135deg, #eef4fb 0%, #dce8f7 50%, #e4ecfa 100%);
      --glass: rgba(255, 255, 255, 0.58);
      --glass-strong: rgba(255, 255, 255, 0.76);
      --border: rgba(255, 255, 255, 0.85);
      --fg: #0f172a;
      --muted: #475569;
      --blue: #2563eb;
      --indigo: #4f46e5;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg-grad); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .font-syne { font-family: 'Syne', sans-serif; }

    .${p}-frosted {
      background: var(--glass); backdrop-filter: blur(22px) saturate(160%);
      -webkit-backdrop-filter: blur(22px) saturate(160%);
      border: 1px solid var(--border);
      box-shadow: 0 20px 50px rgba(30, 58, 138, 0.08), inset 0 1px 1px #ffffff;
    }
    .${p}-nav {
      max-width: 1320px; margin: 18px auto 0; padding: 14px 28px; border-radius: 999px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-btn-blue {
      padding: 10px 24px; border-radius: 999px;
      background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
      color: #fff; font-size: 13px; font-weight: 700; border: none; cursor: pointer;
      box-shadow: 0 10px 24px rgba(37, 99, 235, 0.28);
    }

    .${p}-hero {
      max-width: 1320px; margin: 24px auto 0; padding: 36px; border-radius: 36px;
      display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; position: relative;
    }
    @media (min-width: 980px) {
      .${p}-hero { grid-template-columns: 1.1fr 0.9fr; }
    }
    .${p}-h1 {
      font-size: clamp(48px, 7.2vw, 96px); font-weight: 800; line-height: 0.94; letter-spacing: -0.03em;
      background: linear-gradient(135deg, #0f172a 0%, #2563eb 55%, #6366f1 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin: 14px 0 18px;
    }
    .${p}-bust-img {
      width: 100%; max-width: 390px; height: auto; object-fit: contain; margin: 0 auto; display: block;
      filter: drop-shadow(0 24px 40px rgba(37,99,235,0.22));
    }

    .${p}-stats-row {
      max-width: 1320px; margin: 22px auto 0; display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;
    }
    .${p}-sec { max-width: 1320px; margin: 48px auto 0; }
    .${p}-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 22px; }
    .${p}-bento-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 20px; margin-top: 22px; }
    .${p}-bar-track { height: 8px; background: rgba(37,99,235,0.12); border-radius: 99px; overflow: hidden; margin-top: 6px; }
    .${p}-bar-fill { height: 100%; background: linear-gradient(90deg, #2563eb, #6366f1); border-radius: 99px; transition: width 1s ease; }
    .${p}-tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 14px; }
    .${p}-tech-chip {
      padding: 12px 8px; border-radius: 14px; background: var(--glass-strong);
      border: 1px solid #fff; text-align: center; font-size: 12px; font-weight: 700; color: var(--fg);
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(15,23,42,0.55); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body style="padding: 0 18px 64px;">
  <header class="${p}-nav ${p}-frosted">
    <strong class="font-syne" style="font-size:18px;letter-spacing:0.06em;color:var(--blue);">✦ NOVA GLASS</strong>
    <nav style="display:flex;gap:24px;" aria-label="Main Navigation">
      <a href="#caseStudies" style="color:var(--muted);text-decoration:none;font-size:13px;font-weight:600;">Case Studies</a>
      <a href="#skillsMatrix" style="color:var(--muted);text-decoration:none;font-size:13px;font-weight:600;">Skills &amp; Stack</a>
      <a href="#skillsMatrix" style="color:var(--muted);text-decoration:none;font-size:13px;font-weight:600;">Philosophy</a>
    </nav>
    <div style="display:flex;gap:10px;align-items:center;">
      <button type="button" id="motionToggleBtn" class="${p}-frosted" style="padding:7px 14px;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer;" aria-pressed="false">Motion: ON</button>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-blue">Hire Me ↗</button>
    </div>
  </header>

  <main>
    <section class="${p}-hero ${p}-frosted">
      <div>
        <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:rgba(37,99,235,0.1);color:var(--blue);font-size:12px;font-weight:700;">
          DESIGNING THE FUTURE • SPATIAL UI/UX
        </span>
        <h1 class="${p}-h1 font-syne">NOVA<br>GLASS</h1>
        <p style="font-size:17px;color:var(--muted);max-width:480px;line-height:1.6;margin-bottom:26px;">
          Digital Designer &amp; Experience Architect crafting refractive spatial interfaces, tactile 3D design systems, and flagship consumer apps.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button type="button" class="${p}-btn-blue" onclick="document.getElementById('novaModal').classList.add('is-open')">Explore Portfolio ↗</button>
          <a href="#skillsMatrix" class="${p}-frosted" style="padding:10px 22px;border-radius:999px;text-decoration:none;color:var(--fg);font-size:13px;font-weight:700;">View Tech Stack</a>
        </div>
      </div>
      <div>
        <img src="assets/cutout.webp" alt="Nova Glass 3D Crystal Visor Sculpture" class="${p}-bust-img" data-tilt-card />
      </div>
    </section>

    <!-- 4-COLUMN GLASS STATS BAR -->
    <div class="${p}-stats-row">
      <div class="${p}-frosted" style="padding:20px;border-radius:24px;text-align:center;" data-tilt-card>
        <strong class="font-syne" style="font-size:32px;color:var(--blue);">5+</strong>
        <span style="display:block;font-size:12px;color:var(--muted);margin-top:4px;">Years Experience</span>
      </div>
      <div class="${p}-frosted" style="padding:20px;border-radius:24px;text-align:center;" data-tilt-card>
        <strong class="font-syne" style="font-size:32px;color:var(--blue);">40+</strong>
        <span style="display:block;font-size:12px;color:var(--muted);margin-top:4px;">Shipped Products</span>
      </div>
      <div class="${p}-frosted" style="padding:20px;border-radius:24px;text-align:center;" data-tilt-card>
        <strong class="font-syne" style="font-size:32px;color:var(--blue);">25+</strong>
        <span style="display:block;font-size:12px;color:var(--muted);margin-top:4px;">Global Clients</span>
      </div>
      <div class="${p}-frosted" style="padding:20px;border-radius:24px;text-align:center;" data-tilt-card>
        <strong class="font-syne" style="font-size:32px;color:var(--blue);">18</strong>
        <span style="display:block;font-size:12px;color:var(--muted);margin-top:4px;">Design Awards</span>
      </div>
    </div>

    <!-- FEATURED CASE STUDIES -->
    <section id="caseStudies" class="${p}-sec">
      <h2 class="font-syne" style="font-size:26px;">FEATURED CASE STUDIES</h2>
      <div class="${p}-case-grid">
        <article class="${p}-frosted" style="padding:26px;border-radius:26px;" data-tilt-card>
          <span style="font-size:11px;font-weight:700;color:var(--blue);">01 // VISION OS INTERFACE</span>
          <h3 class="font-syne" style="font-size:20px;margin:10px 0 8px;">Aether Spatial Workspace</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">Refractive eye-tracked windowing system and glassmorphic widget library.</p>
        </article>
        <article class="${p}-frosted" style="padding:26px;border-radius:26px;" data-tilt-card>
          <span style="font-size:11px;font-weight:700;color:var(--blue);">02 // FINTECH SUPER-APP</span>
          <h3 class="font-syne" style="font-size:20px;margin:10px 0 8px;">Prism Private Banking</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">Real-time 3D card configurator and biometric wealth analytics dashboard.</p>
        </article>
        <article class="${p}-frosted" style="padding:26px;border-radius:26px;" data-tilt-card>
          <span style="font-size:11px;font-weight:700;color:var(--blue);">03 // AI WEARABLE COMPANION</span>
          <h3 class="font-syne" style="font-size:20px;margin:10px 0 8px;">Lumina Neural Optics</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">HUD typography and micro-interaction system for AR smart glasses.</p>
        </article>
      </div>
    </section>

    <!-- 3-COLUMN SKILLS & EXPERTISE / TECH STACK / DESIGN PHILOSOPHY -->
    <section id="skillsMatrix" class="${p}-sec">
      <div class="${p}-bento-3">
        <div class="${p}-frosted" style="padding:26px;border-radius:26px;" data-tilt-card>
          <h3 class="font-syne" style="font-size:18px;margin-bottom:16px;">SKILLS &amp; EXPERTISE</h3>
          <div style="margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;"><span>Spatial UI/UX Design</span><span>96%</span></div>
            <div class="${p}-bar-track"><div class="${p}-bar-fill" style="width:96%;"></div></div>
          </div>
          <div style="margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;"><span>3D &amp; Interactive Motion</span><span>92%</span></div>
            <div class="${p}-bar-track"><div class="${p}-bar-fill" style="width:92%;"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;"><span>Design Systems &amp; Tokens</span><span>95%</span></div>
            <div class="${p}-bar-track"><div class="${p}-bar-fill" style="width:95%;"></div></div>
          </div>
        </div>

        <div class="${p}-frosted" style="padding:26px;border-radius:26px;" data-tilt-card>
          <h3 class="font-syne" style="font-size:18px;">TECH STACK</h3>
          <div class="${p}-tech-grid">
            <span class="${p}-tech-chip">Figma</span><span class="${p}-tech-chip">Spline</span><span class="${p}-tech-chip">Blender</span>
            <span class="${p}-tech-chip">React</span><span class="${p}-tech-chip">Three.js</span><span class="${p}-tech-chip">GSAP</span>
            <span class="${p}-tech-chip">Framer</span><span class="${p}-tech-chip">Next.js</span><span class="${p}-tech-chip">WebGL</span>
          </div>
        </div>

        <div class="${p}-frosted" style="padding:26px;border-radius:26px;display:flex;flex-direction:column;justify-content:space-between;" data-tilt-card>
          <div>
            <h3 class="font-syne" style="font-size:18px;margin-bottom:10px;">DESIGN PHILOSOPHY</h3>
            <p style="font-size:13px;color:var(--muted);line-height:1.65;">
              “Clarity through refraction — every glass layer should guide attention effortlessly while rewarding curiosity with tactile depth.”
            </p>
          </div>
          <button type="button" class="${p}-btn-blue" style="margin-top:16px;width:100%;" onclick="document.getElementById('novaModal').classList.add('is-open')">
            Let's Create Something Extraordinary
          </button>
        </div>
      </div>
    </section>
  </main>

  <div id="novaModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="novaModalTitle">
    <div class="${p}-frosted" style="max-width:520px;width:100%;padding:32px;border-radius:28px;background:rgba(255,255,255,0.92);">
      <h2 id="novaModalTitle" class="font-syne" style="font-size:26px;margin-bottom:10px;">Commission Nova Glass Studio</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Available for Q2/Q3 spatial product design, 3D brand systems, and executive design advisory.</p>
      <button type="button" class="${p}-btn-blue" style="width:100%;" onclick="document.getElementById('novaModal').classList.remove('is-open')">Send Project Brief</button>
    </div>
  </div>

  <script>
    (function(){
      document.querySelectorAll('[data-tilt-card]').forEach(function(card){
        card.addEventListener('mousemove', function(e){
          var r = card.getBoundingClientRect();
          var nx = (e.clientX - r.left) / r.width - 0.5;
          var ny = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = 'perspective(900px) rotateX(' + (-ny * 8).toFixed(2) + 'deg) rotateY(' + (nx * 10).toFixed(2) + 'deg)';
        });
        card.addEventListener('mouseleave', function(){ card.style.transform = ''; });
      });
      var expBtn = document.getElementById('exploreMagneticBtn');
      if (expBtn) expBtn.addEventListener('click', function(){ document.getElementById('novaModal').classList.add('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 5. ALEX CARTER UI (Deep Teal-Obsidian #061116 + Neon-Cyan #00e5ff Wireframe Glassmorphism + 3D Tesseract Cube + Interactive 01-05 Process Timeline)
  // Motion Recipe: Zero-Gravity Floating 3D Tesseract Cube + Interactive 01-05 Process Stepper + Neon-Cyan Glow Cards
  if (data.slug === 'alex-carter-ui') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>ALEX CARTER — Futuristic Glassmorphism Web Developer &amp; UI/UX Portfolio</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #061116;
      --glass: rgba(10, 28, 36, 0.68);
      --cyan: #00e5ff;
      --cyan-soft: rgba(0, 229, 255, 0.28);
      --fg: #ecfeff;
      --muted: #94a3b8;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: radial-gradient(circle at 50% 0%, #0c2631 0%, #061116 70%); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .font-space { font-family: 'Space Grotesk', sans-serif; }

    .${p}-cyan-card {
      background: var(--glass); backdrop-filter: blur(20px);
      border: 1px solid var(--cyan-soft); border-radius: 22px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), inset 0 0 18px rgba(0, 229, 255, 0.06);
      padding: 24px; transition: border-color 0.25s, transform 0.25s;
    }
    .${p}-cyan-card:hover { border-color: var(--cyan); }
    .${p}-btn-cyan {
      padding: 11px 24px; border-radius: 999px; background: var(--cyan); color: #041014;
      font-size: 13px; font-weight: 800; border: none; cursor: pointer;
      box-shadow: 0 0 24px rgba(0, 229, 255, 0.45);
    }

    .${p}-wrap { max-width: 1340px; margin: 0 auto; padding: 20px 24px 80px; }
    .${p}-nav {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px;
      padding: 14px 24px; border-radius: 999px;
    }
    .${p}-hero {
      display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; margin-bottom: 28px;
    }
    @media (min-width: 980px) {
      .${p}-hero { grid-template-columns: 1.1fr 0.9fr; }
    }
    .${p}-h1 {
      font-size: clamp(42px, 6vw, 76px); font-weight: 700; line-height: 1.02; margin: 12px 0 16px;
    }
    .${p}-cube-img {
      width: 100%; max-width: 360px; height: auto; object-fit: contain; margin: 0 auto; display: block;
      animation: ${p}CubeFloat 6s ease-in-out infinite;
      filter: drop-shadow(0 24px 44px rgba(0,229,255,0.28));
    }
    @keyframes ${p}CubeFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

    .${p}-dashboard {
      display: grid; grid-template-columns: 1fr; gap: 20px;
    }
    @media (min-width: 980px) {
      .${p}-dashboard { grid-template-columns: 1fr 1fr; }
    }
    .${p}-hex-wrap { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
    .${p}-hex-chip {
      padding: 8px 16px; border-radius: 999px; background: rgba(0,229,255,0.1);
      border: 1px solid var(--cyan-soft); color: var(--cyan); font-size: 12px; font-weight: 700;
    }
    .${p}-step-row {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: 18px;
    }
    .${p}-step-node {
      padding: 16px; border-radius: 16px; background: rgba(255,255,255,0.03);
      border: 1px solid var(--cyan-soft); cursor: pointer; text-align: left; color: var(--fg);
    }
    .${p}-step-node.is-active { background: rgba(0,229,255,0.16); border-color: var(--cyan); }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(6,17,22,0.88); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <div class="${p}-wrap">
    <header class="${p}-nav ${p}-cyan-card">
      <strong class="font-space" style="font-size:18px;color:var(--cyan);letter-spacing:0.08em;">◈ ALEX CARTER</strong>
      <nav style="display:flex;gap:24px;" aria-label="Main Navigation">
        <a href="#dashboardGrid" style="color:var(--muted);text-decoration:none;font-size:13px;">About</a>
        <a href="#dashboardGrid" style="color:var(--muted);text-decoration:none;font-size:13px;">Projects</a>
        <a href="#workProcess" style="color:var(--muted);text-decoration:none;font-size:13px;">Process 01–05</a>
      </nav>
      <button type="button" id="exploreMagneticBtn" class="${p}-btn-cyan">Hire Alex ↗</button>
    </header>

    <main>
      <section class="${p}-hero ${p}-cyan-card">
        <div>
          <span style="font-size:12px;color:var(--cyan);letter-spacing:0.14em;font-weight:700;">FUTURISTIC GLASSMORPHISM ARCHITECT</span>
          <h1 class="${p}-h1 font-space">ALEX <span style="color:var(--cyan);">CARTER</span></h1>
          <p style="font-size:16px;color:var(--muted);max-width:520px;line-height:1.6;margin-bottom:24px;">
            Full-Stack Creative Technologist &amp; UI/UX Engineer building holographic WebGL dashboards, spatial design systems, and low-latency AI interfaces.
          </p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <button type="button" class="${p}-btn-cyan" onclick="document.getElementById('carterModal').classList.add('is-open')">Explore Projects ↗</button>
            <a href="#workProcess" style="padding:11px 22px;border-radius:999px;border:1px solid var(--cyan-soft);color:var(--fg);text-decoration:none;font-size:13px;font-weight:600;">Work Process</a>
          </div>
        </div>
        <div>
          <img src="assets/cutout.webp" alt="3D Neon Cyan Glassmorphic Tesseract Cube" class="${p}-cube-img" />
        </div>
      </section>

      <!-- ASYMMETRIC GLASSMORPHIC DASHBOARD -->
      <section id="dashboardGrid" class="${p}-dashboard">
        <article class="${p}-cyan-card">
          <span style="font-size:11px;color:var(--cyan);font-weight:700;">01 // ABOUT &amp; TECHNICAL MATRIX</span>
          <h2 class="font-space" style="font-size:22px;margin:8px 0;">Full-Stack UI/UX Engineering</h2>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">
            8+ years bridging high-craft glassmorphic Figma systems with 60FPS React, Three.js, and Rust WebAssembly runtimes.
          </p>
          <div class="${p}-hex-wrap">
            <span class="${p}-hex-chip">React 19</span><span class="${p}-hex-chip">TypeScript</span><span class="${p}-hex-chip">Three.js / R3F</span>
            <span class="${p}-hex-chip">GLSL Shaders</span><span class="${p}-hex-chip">Next.js</span><span class="${p}-hex-chip">Figma Tokens</span>
          </div>
        </article>

        <article class="${p}-cyan-card">
          <span style="font-size:11px;color:var(--cyan);font-weight:700;">02 // FEATURED DEPLOYMENTS</span>
          <h2 class="font-space" style="font-size:22px;margin:8px 0;">Selected Spatial Interfaces</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
            <div style="padding:14px;border-radius:14px;background:rgba(0,229,255,0.06);border:1px solid var(--cyan-soft);">
              <strong style="font-size:15px;display:block;">HoloTrade DEX</strong>
              <span style="font-size:12px;color:var(--muted);">$1.2B Volume Terminal</span>
            </div>
            <div style="padding:14px;border-radius:14px;background:rgba(0,229,255,0.06);border:1px solid var(--cyan-soft);">
              <strong style="font-size:15px;display:block;">NeuroSynth OS</strong>
              <span style="font-size:12px;color:var(--muted);">Spatial Audio DAW</span>
            </div>
          </div>
        </article>
      </section>

      <!-- WORK PROCESS 01-05 INTERACTIVE STEPPER -->
      <section id="workProcess" class="${p}-cyan-card" style="margin-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;">
          <div>
            <span style="font-size:11px;color:var(--cyan);font-weight:700;">03 // INTERACTIVE WORKFLOW PIPELINE</span>
            <h2 class="font-space" style="font-size:22px;margin-top:4px;">WORK PROCESS 01 — 05</h2>
          </div>
          <p id="processDetailText" style="font-size:13px;color:var(--cyan);">Step 01: Deep architecture discovery, KPI telemetry mapping, and user journey blueprinting.</p>
        </div>
        <div class="${p}-step-row">
          <button type="button" class="${p}-step-node is-active" data-step="Step 01: Deep architecture discovery, KPI telemetry mapping, and user journey blueprinting.">
            <span style="font-size:11px;color:var(--cyan);font-weight:700;">01</span>
            <strong style="display:block;font-size:14px;margin-top:4px;">Discovery</strong>
          </button>
          <button type="button" class="${p}-step-node" data-step="Step 02: Interactive spatial wireframing and glassmorphic component token architecture.">
            <span style="font-size:11px;color:var(--cyan);font-weight:700;">02</span>
            <strong style="display:block;font-size:14px;margin-top:4px;">Wireframing</strong>
          </button>
          <button type="button" class="${p}-step-node" data-step="Step 03: Custom 3D Octane/Spline modeling, shader authoring, and micro-interaction choreography.">
            <span style="font-size:11px;color:var(--cyan);font-weight:700;">03</span>
            <strong style="display:block;font-size:14px;margin-top:4px;">3D &amp; Visual UI</strong>
          </button>
          <button type="button" class="${p}-step-node" data-step="Step 04: Clean production TypeScript, WebGL canvas optimization, and accessible DOM engineering.">
            <span style="font-size:11px;color:var(--cyan);font-weight:700;">04</span>
            <strong style="display:block;font-size:14px;margin-top:4px;">Full-Stack Code</strong>
          </button>
          <button type="button" class="${p}-step-node" data-step="Step 05: Multi-viewport 120FPS performance auditing and edge deployment.">
            <span style="font-size:11px;color:var(--cyan);font-weight:700;">05</span>
            <strong style="display:block;font-size:14px;margin-top:4px;">QA &amp; Launch</strong>
          </button>
        </div>
      </section>
    </main>
  </div>

  <div id="carterModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="carterModalTitle">
    <div class="${p}-cyan-card" style="max-width:500px;width:100%;background:#081820;">
      <h2 id="carterModalTitle" class="font-space" style="font-size:24px;margin-bottom:10px;color:var(--cyan);">Initiate Project Transmission</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Direct engineering &amp; UI/UX consulting availability for Q2/Q3.</p>
      <button type="button" class="${p}-btn-cyan" style="width:100%;" onclick="document.getElementById('carterModal').classList.remove('is-open')">Transmit Specification</button>
    </div>
  </div>

  <script>
    (function(){
      var nodes = document.querySelectorAll('.${p}-step-node');
      var detail = document.getElementById('processDetailText');
      nodes.forEach(function(n){
        n.addEventListener('click', function(){
          nodes.forEach(function(x){ x.classList.remove('is-active'); });
          n.classList.add('is-active');
          if (detail) detail.textContent = n.getAttribute('data-step');
        });
      });
      var expBtn = document.getElementById('exploreMagneticBtn');
      if (expBtn) expBtn.addEventListener('click', function(){ document.getElementById('carterModal').classList.add('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 6. TRIPG OCEAN (Clean White & Turquoise Ocean Wave Curve Split Hero + Straddling Circular "GO" Button + 3D Yacht Cutout + Paris-London-Dubaï-Phuket Timeline)
  // Motion Recipe: Interactive 4-City Dot-Timeline Switcher + Magnetic Straddling "GO" Button + 3D Yacht Hover Tilt
  if (data.slug === 'tripg-ocean') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>TripG — Find Someone To Take You There</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #eef2f5;
      --card: #ffffff;
      --teal: #0e7490;
      --teal-light: #06b6d4;
      --muted: #94a3b8;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: #0f172a; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; }

    .${p}-shell {
      max-width: 1360px; margin: 28px auto; background: var(--card); border-radius: 28px;
      box-shadow: 0 32px 80px rgba(14,116,144,0.14); overflow: hidden; position: relative; min-height: 86vh;
      display: grid; grid-template-columns: 1fr;
    }
    @media (min-width: 980px) {
      .${p}-shell { grid-template-columns: 1.05fr 0.95fr; }
    }
    .${p}-left {
      padding: clamp(28px, 4vw, 56px); display: flex; flex-direction: column; justify-content: space-between; position: relative; z-index: 10;
    }
    .${p}-nav { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
    .${p}-logo { font-family: 'Pacifico', cursive; font-size: 28px; color: var(--teal); text-decoration: none; }
    .${p}-h1 {
      font-size: clamp(36px, 4.5vw, 58px); font-weight: 800; line-height: 1.08; letter-spacing: -0.02em;
      color: var(--teal); margin: 44px 0 18px;
    }
    .${p}-h1 span { display: block; color: #b0b8c1; }

    /* Right Curved Ocean Bay & 3D Hydrofoil Yacht */
    .${p}-ocean-right {
      position: relative; min-height: 460px;
      background: radial-gradient(circle at 30% 40%, #22d3ee 0%, #0e7490 55%, #083344 100%);
      display: flex; align-items: center; justify-content: center; padding: 32px;
      border-radius: 260px 0 0 260px;
    }
    @media (max-width: 979px) {
      .${p}-ocean-right { border-radius: 40px 40px 0 0; }
    }
    .${p}-go-btn {
      position: absolute; left: -46px; top: 50%; transform: translateY(-50%); z-index: 20;
      width: 92px; height: 92px; border-radius: 50%; background: #94a3b8;
      border: 12px solid rgba(14, 116, 144, 0.78); color: #fff;
      font-family: 'Pacifico', cursive; font-size: 24px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 16px 36px rgba(14,116,144,0.35); transition: transform 0.25s;
    }
    .${p}-go-btn:hover { transform: translateY(-50%) scale(1.08); }
    @media (max-width: 979px) {
      .${p}-go-btn { left: 50%; top: -46px; transform: translateX(-50%); }
    }
    .${p}-yacht-cutout {
      width: 100%; max-width: 480px; height: auto; object-fit: contain;
      filter: drop-shadow(0 28px 40px rgba(0,0,0,0.45));
    }

    /* Bottom 4-City Dot Timeline (Paris - London - Dubaï - Phuket) */
    .${p}-timeline {
      display: flex; align-items: center; gap: 18px; margin-top: 36px; flex-wrap: wrap;
    }
    .${p}-city-node {
      background: transparent; border: none; cursor: pointer; text-align: center;
      color: #94a3b8; font-size: 14px; font-weight: 700; padding: 6px 10px;
    }
    .${p}-city-node.is-active { color: var(--teal); }
    .${p}-city-dot {
      display: block; width: 10px; height: 10px; border-radius: 50%; background: #cbd5e1;
      margin: 10px auto 0; transition: background 0.25s, transform 0.25s;
    }
    .${p}-city-node.is-active .${p}-city-dot { background: var(--teal); transform: scale(1.3); }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(8,51,68,0.75); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <main>
    <div class="${p}-shell">
      <div class="${p}-left">
        <header class="${p}-nav">
          <a href="#top" class="${p}-logo">TripG</a>
          <nav style="display:flex;gap:28px;" aria-label="Main Navigation">
            <a href="#cityGuide" style="color:var(--teal);text-decoration:none;font-size:12px;font-weight:800;letter-spacing:0.08em;">ABOUT</a>
            <a href="#cityGuide" style="color:var(--teal);text-decoration:none;font-size:12px;font-weight:800;letter-spacing:0.08em;">THE PROJECT</a>
            <a href="#cityGuide" style="color:var(--teal);text-decoration:none;font-size:12px;font-weight:800;letter-spacing:0.08em;">CONTACT</a>
          </nav>
        </header>

        <div>
          <h1 class="${p}-h1">
            FIND SOMEONE
            <span>TO TAKE YOU THERE</span>
          </h1>
          <p id="cityDescText" style="font-size:15px;color:#64748b;max-width:440px;line-height:1.65;">
            Phuket Private Hydrofoil Charter — Cruise limestone karsts, emerald lagoons, and coral reefs with verified local skippers.
          </p>
        </div>

        <div id="cityGuide">
          <div class="${p}-timeline" role="tablist">
            <button type="button" class="${p}-city-node" data-city="Paris — Private Seine Vintage Runabout &amp; Champagne Sunset Cruise.">
              Paris<span class="${p}-city-dot"></span>
            </button>
            <button type="button" class="${p}-city-node" data-city="London — Thames High-Speed RIB Architecture &amp; Greenwich Meridian Charter.">
              London<span class="${p}-city-dot"></span>
            </button>
            <button type="button" class="${p}-city-node" data-city="Dubaï — Palm Jumeirah Superyacht &amp; Arabian Gulf Twilight Foil.">
              Dubaï<span class="${p}-city-dot"></span>
            </button>
            <button type="button" class="${p}-city-node is-active" data-city="Phuket Private Hydrofoil Charter — Cruise limestone karsts, emerald lagoons, and coral reefs with verified local skippers.">
              Phuket<span class="${p}-city-dot"></span>
            </button>
          </div>
        </div>
      </div>

      <div class="${p}-ocean-right">
        <button type="button" id="exploreMagneticBtn" class="${p}-go-btn" aria-label="Launch Charter">GO</button>
        <img src="assets/cutout.webp" alt="3D Turquoise Hydrofoil Yacht" class="${p}-yacht-cutout" data-tilt-card />
      </div>
    </div>
  </main>

  <div id="tripgModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="tripgModalTitle">
    <div style="max-width:480px;width:100%;background:#fff;border-radius:24px;padding:32px;">
      <h2 id="tripgModalTitle" style="font-size:24px;color:var(--teal);margin-bottom:10px;">Book Your Local Skipper</h2>
      <p style="font-size:14px;color:#64748b;line-height:1.6;margin-bottom:20px;">Connect directly with certified yacht captains in Paris, London, Dubaï, and Phuket.</p>
      <button type="button" style="width:100%;padding:12px;border-radius:999px;background:var(--teal);color:#fff;font-weight:700;border:none;cursor:pointer;" onclick="document.getElementById('tripgModal').classList.remove('is-open')">Confirm Destination</button>
    </div>
  </div>

  <script>
    (function(){
      var nodes = document.querySelectorAll('.${p}-city-node');
      var desc = document.getElementById('cityDescText');
      nodes.forEach(function(n){
        n.addEventListener('click', function(){
          nodes.forEach(function(x){ x.classList.remove('is-active'); });
          n.classList.add('is-active');
          if (desc) desc.textContent = n.getAttribute('data-city');
        });
      });
      var goBtn = document.getElementById('exploreMagneticBtn');
      if (goBtn) goBtn.addEventListener('click', function(){ document.getElementById('tripgModal').classList.add('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 7. APEX SQUAD LIGHT (Light Stone/Bone Canvas #e6e2d8 + Glowing Crimson-Orange Triangle Emblem #ff2a00 + 3D Squad Duo Cutout + Parallelogram Nav & PLAY NOW Button)
  // Motion Recipe: 3D Triangle & Squad Parallax Depth + Skewed Parallelogram Magnetic CTA + Squad Loadout Switcher
  if (data.slug === 'apex-squad-light') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>APEX LEGENDS — Are You Ready To Be A Legend?</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Teko:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #d6d1c7;
      --stage: #eae6df;
      --red: #ff2a00;
      --fg: #111111;
      --muted: #57534e;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; }
    .font-teko { font-family: 'Teko', sans-serif; text-transform: uppercase; }

    .${p}-frame {
      max-width: 1360px; margin: 28px auto; background: var(--stage);
      border: 1px solid rgba(0,0,0,0.12); box-shadow: 0 32px 80px rgba(0,0,0,0.22);
      padding: 24px clamp(24px, 4vw, 56px) 36px; position: relative; overflow: hidden;
    }
    .${p}-nav {
      display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.12); padding-bottom: 16px;
    }
    .${p}-tab-red {
      display: inline-block; padding: 6px 20px; background: var(--red); color: #fff;
      transform: skewX(-18deg); font-size: 12px; font-weight: 800; text-decoration: none;
    }
    .${p}-hero-grid {
      display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; padding: 44px 0 28px;
    }
    @media (min-width: 980px) {
      .${p}-hero-grid { grid-template-columns: 0.95fr 1.05fr; }
    }
    .${p}-h1 {
      font-size: clamp(54px, 7.5vw, 96px); line-height: 0.9; letter-spacing: 0.01em; margin-bottom: 18px;
    }
    .${p}-triangle-stage {
      position: relative; display: flex; align-items: center; justify-content: center; min-height: 440px;
    }
    .${p}-apex-tri {
      position: absolute; width: 380px; height: 340px;
      background: linear-gradient(135deg, #ff2a00 0%, #ea580c 100%);
      clip-path: polygon(50% 0%, 100% 100%, 72% 100%, 50% 46%, 28% 100%, 0% 100%);
      filter: drop-shadow(0 20px 40px rgba(255,42,0,0.4)); z-index: 1;
    }
    .${p}-squad-img {
      position: relative; z-index: 3; width: 100%; max-width: 450px; height: auto; object-fit: contain;
      filter: drop-shadow(0 24px 36px rgba(0,0,0,0.45));
    }
    .${p}-play-parallelogram {
      display: inline-block; padding: 12px 48px; border: 1.5px solid #111;
      background: transparent; color: #111; font-family: 'Teko', sans-serif; font-size: 22px; font-weight: 700;
      letter-spacing: 0.12em; transform: skewX(-18deg); cursor: pointer; transition: background 0.2s, color 0.2s;
    }
    .${p}-play-parallelogram:hover { background: var(--red); border-color: var(--red); color: #fff; }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(17,17,17,0.8); backdrop-filter: blur(14px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <main>
    <div class="${p}-frame">
      <header class="${p}-nav">
        <strong class="font-teko" style="font-size:32px;line-height:0.9;">APEX<br><span style="font-size:14px;letter-spacing:0.2em;">LEGENDS</span></strong>
        <nav style="display:flex;gap:24px;align-items:center;" aria-label="Main Navigation">
          <a href="#top" class="${p}-tab-red">HOME</a>
          <a href="#top" style="color:#111;text-decoration:none;font-size:12px;font-weight:800;">LEGENDS</a>
          <a href="#top" style="color:#111;text-decoration:none;font-size:12px;font-weight:800;">NEWS</a>
          <a href="#top" style="color:#111;text-decoration:none;font-size:12px;font-weight:800;">MEDIA</a>
          <a href="#top" style="color:#111;text-decoration:none;font-size:12px;font-weight:800;">FORUMS</a>
        </nav>
        <div style="border:1px solid rgba(0,0,0,0.25);padding:6px 12px;font-size:11px;font-weight:800;text-align:center;">
          FREE TO PLAY<br><span style="color:var(--red);">▼</span>
        </div>
      </header>

      <section class="${p}-hero-grid">
        <div>
          <h1 class="${p}-h1 font-teko">
            ARE YOU<br>READY TO BE<br>A LEGEND?
          </h1>
          <p style="font-size:15px;color:var(--muted);max-width:390px;line-height:1.6;">
            Pick your character. Round up your squad. Show everyone what Legends are made of.
          </p>
        </div>

        <div class="${p}-triangle-stage">
          <div class="${p}-apex-tri"></div>
          <img src="assets/cutout.webp" alt="Apex Squad Duo" class="${p}-squad-img" data-tilt-card />
        </div>
      </section>

      <footer style="display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid rgba(0,0,0,0.12);">
        <div style="display:flex;gap:14px;font-size:13px;font-weight:800;">
          <span>f</span><span>𝕏</span><span>◎</span>
        </div>
        <button type="button" id="exploreMagneticBtn" class="${p}-play-parallelogram">PLAY NOW</button>
        <strong style="font-size:20px;font-weight:900;letter-spacing:0.06em;">EA</strong>
      </footer>
    </div>
  </main>

  <div id="apexLightModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="apexLightTitle">
    <div style="max-width:480px;width:100%;background:var(--stage);padding:32px;border-left:5px solid var(--red);">
      <h2 id="apexLightTitle" class="font-teko" style="font-size:38px;margin-bottom:8px;">SQUAD DROP READY</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Download Apex Legends free on PC, PlayStation, Xbox, and Switch.</p>
      <button type="button" class="${p}-play-parallelogram" style="width:100%;" onclick="document.getElementById('apexLightModal').classList.remove('is-open')">LAUNCH GAME</button>
    </div>
  </div>

  <script>
    (function(){
      var btn = document.getElementById('exploreMagneticBtn');
      if (btn) btn.addEventListener('click', function(){ document.getElementById('apexLightModal').classList.add('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 8. LITERA BOOKSTORE (Warm Cream #f5efe6 Bookstore UI + 9 Category Book Icons + 5 Hardcover Cards + 3D Floating Book Stack Cutout + Live Interactive Chat Concierge)
  // Motion Recipe: Interactive Category Filter + 3D Book Spine Hover Lift + Live Interactive Bookstore Chat Concierge
  if (data.slug === 'litera-bookstore') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Litera — Interactive Bookstore &amp; Gift Concierge</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #dfd3c3;
      --panel: #faf6f0;
      --cream: #efe8dec4;
      --coral: #f43f5e;
      --purple: #7c69ef;
      --fg: #1e1b18;
      --muted: #78716c;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; padding: 14px; }
    .font-serif { font-family: 'Fraunces', serif; }

    .${p}-app {
      max-width: 1400px; margin: 0 auto; background: var(--panel); border-radius: 32px;
      box-shadow: 0 28px 70px rgba(30,27,24,0.14); display: grid; grid-template-columns: 1fr; overflow: hidden;
    }
    @media (min-width: 1024px) {
      .${p}-app { grid-template-columns: 1fr 340px; }
    }
    .${p}-main { padding: 28px; }
    .${p}-top-bar { display: flex; gap: 14px; align-items: center; margin-bottom: 26px; }
    .${p}-search-box {
      flex: 1; background: #f3ede4; border-radius: 999px; padding: 12px 20px;
      display: flex; align-items: center; gap: 10px;
    }
    .${p}-search-box input { border: none; background: transparent; width: 100%; outline: none; font-size: 14px; }
    .${p}-rainbow-btn {
      padding: 12px 28px; border-radius: 999px; border: none; color: #fff; font-weight: 700; font-size: 14px; cursor: pointer;
      background: linear-gradient(90deg, #6366f1 0%, #10b981 48%, #f43f5e 100%);
    }

    .${p}-cats {
      display: flex; gap: 14px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 24px;
    }
    .${p}-cat-pill {
      display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer;
      padding: 10px 14px; border-radius: 16px; background: #f3ede4; border: 1px solid transparent; flex-shrink: 0;
    }
    .${p}-cat-pill.is-active { border-color: var(--coral); background: #fff; }

    .${p}-books-row {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin: 16px 0 28px;
    }
    .${p}-book-card {
      padding: 18px 14px; border-radius: 18px; color: #fff; min-height: 210px;
      display: flex; flex-direction: column; justify-content: space-between; cursor: pointer;
      transition: transform 0.25s ease; position: relative;
    }
    .${p}-book-card:hover { transform: translateY(-6px); }

    .${p}-bestseller-box {
      background: #efe8de; border-radius: 26px; padding: 24px;
      display: grid; grid-template-columns: 1fr; gap: 20px; align-items: center;
    }
    @media (min-width: 860px) {
      .${p}-bestseller-box { grid-template-columns: 180px 1fr 1fr; }
    }
    .${p}-stack-cutout { width: 100%; max-width: 175px; height: auto; object-fit: contain; margin: 0 auto; display: block; }

    /* Right Live Chat Concierge Sidebar */
    .${p}-chat-col {
      background: #f3ede4; border-left: 1px solid rgba(0,0,0,0.06); padding: 24px;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .${p}-bubble-user {
      background: var(--purple); color: #fff; padding: 12px 16px; border-radius: 18px 18px 4px 18px;
      font-size: 13px; line-height: 1.5; margin-bottom: 12px; align-self: flex-end; max-width: 88%;
    }
    .${p}-bubble-bot {
      background: #ffffff; color: var(--fg); padding: 14px 16px; border-radius: 18px 18px 18px 4px;
      font-size: 13px; line-height: 1.5; margin-bottom: 12px; align-self: flex-start; max-width: 92%;
      box-shadow: 0 4px 14px rgba(0,0,0,0.04);
    }
  </style>
</head>
<body>
  <main>
    <div class="${p}-app">
      <!-- MAIN BOOKSTORE VIEW -->
      <div class="${p}-main">
        <header class="${p}-top-bar">
          <div class="${p}-search-box">
            <span>🔍</span>
            <input type="text" placeholder="Search for books, authors, or collector editions..." aria-label="Search for books">
          </div>
          <button type="button" id="exploreMagneticBtn" class="${p}-rainbow-btn">search</button>
        </header>

        <!-- 9 CATEGORY BOOK ICONS -->
        <div class="${p}-cats" aria-label="Book Categories">
          <button type="button" class="${p}-cat-pill is-active"><span style="font-size:20px;">📚</span><strong style="font-size:11px;">All</strong></button>
          <button type="button" class="${p}-cat-pill"><span style="font-size:20px;">📱</span><strong style="font-size:11px;">eBooks</strong></button>
          <button type="button" class="${p}-cat-pill"><span style="font-size:20px;">📕</span><strong style="font-size:11px;">New</strong></button>
          <button type="button" class="${p}-cat-pill"><span style="font-size:20px;">👑</span><strong style="font-size:11px;">Bestsellers</strong></button>
          <button type="button" class="${p}-cat-pill"><span style="font-size:20px;">🎧</span><strong style="font-size:11px;">Audiobooks</strong></button>
          <button type="button" class="${p}-cat-pill"><span style="font-size:20px;">🔮</span><strong style="font-size:11px;">Fiction</strong></button>
          <button type="button" class="${p}-cat-pill"><span style="font-size:20px;">💌</span><strong style="font-size:11px;">Romance</strong></button>
          <button type="button" class="${p}-cat-pill"><span style="font-size:20px;">🐉</span><strong style="font-size:11px;">Fantasy</strong></button>
        </div>

        <h1 class="font-serif" style="font-size:22px;">Popular Collector Hardcovers</h1>

        <!-- 5 HARDCOVER BOOK CARDS -->
        <div class="${p}-books-row">
          <article class="${p}-book-card" style="background:linear-gradient(145deg,#1e3a5f,#0f172a);" data-book="Fairy Tale by Stephen King">
            <span style="font-size:10px;letter-spacing:0.12em;opacity:0.8;">STEPHEN KING</span>
            <strong class="font-serif" style="font-size:18px;">FAIRY TALE</strong>
            <span style="font-size:11px;color:#fbbf24;">★ 4.9 • Add to Chat</span>
          </article>
          <article class="${p}-book-card" style="background:linear-gradient(145deg,#7c69ef,#4c1d95);" data-book="Never After by Stephanie Garber">
            <span style="font-size:10px;letter-spacing:0.12em;opacity:0.8;">STEPHANIE GARBER</span>
            <strong class="font-serif" style="font-size:18px;">NEVER AFTER</strong>
            <span style="font-size:11px;color:#fbbf24;">★ 4.8 • Add to Chat</span>
          </article>
          <article class="${p}-book-card" style="background:linear-gradient(145deg,#e11d48,#881337);" data-book="Klara and the Sun by Kazuo Ishiguro">
            <span style="font-size:10px;letter-spacing:0.12em;opacity:0.8;">KAZUO ISHIGURO</span>
            <strong class="font-serif" style="font-size:18px;">KLARA &amp; THE SUN</strong>
            <span style="font-size:11px;color:#fbbf24;">★ 4.9 • Add to Chat</span>
          </article>
          <article class="${p}-book-card" style="background:linear-gradient(145deg,#10b981,#064e3b);" data-book="A Court of Mist and Fury by Sarah J. Maas">
            <span style="font-size:10px;letter-spacing:0.12em;opacity:0.8;">SARAH J. MAAS</span>
            <strong class="font-serif" style="font-size:18px;">MIST AND FURY</strong>
            <span style="font-size:11px;color:#fbbf24;">★ 5.0 • Add to Chat</span>
          </article>
          <article class="${p}-book-card" style="background:linear-gradient(145deg,#0284c7,#1e3a8a);" data-book="Hamnet by Maggie O'Farrell">
            <span style="font-size:10px;letter-spacing:0.12em;opacity:0.8;">MAGGIE O'FARRELL</span>
            <strong class="font-serif" style="font-size:18px;">HAMNET</strong>
            <span style="font-size:11px;color:#fbbf24;">★ 4.9 • Add to Chat</span>
          </article>
        </div>

        <!-- BOTTOM 50 MOST POPULAR BESTSELLERS WITH 3D CUTOUT -->
        <section class="${p}-bestseller-box">
          <img src="assets/cutout.webp" alt="3D Collector Book Stack" class="${p}-stack-cutout" />
          <div>
            <h2 class="font-serif" style="font-size:24px;margin-bottom:8px;">2026 Year 50 Most Popular Bestsellers</h2>
            <p style="font-size:13px;color:var(--muted);line-height:1.55;margin-bottom:14px;">
              List of the most interesting books of the year based on customer &amp; critic reviews.
            </p>
            <button type="button" style="padding:8px 18px;border-radius:999px;background:var(--coral);color:#fff;border:none;font-size:12px;font-weight:700;cursor:pointer;">👁 view all 50</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:#fff;padding:10px 14px;border-radius:14px;font-size:12px;"><strong>Top 50 books for kids</strong><span style="display:block;color:var(--muted);font-size:11px;">Illustrated chapter books</span></div>
            <div style="background:#fff;padding:10px 14px;border-radius:14px;font-size:12px;"><strong>Top 50 Classic books</strong><span style="display:block;color:var(--muted);font-size:11px;">Timeless literary editions</span></div>
            <div style="background:#fff;padding:10px 14px;border-radius:14px;font-size:12px;"><strong>Top 50 Sci-Fi books</strong><span style="display:block;color:var(--muted);font-size:11px;">Time &amp; space odysseys</span></div>
          </div>
        </section>
      </div>

      <!-- RIGHT INTERACTIVE CHAT CONCIERGE SIDEBAR -->
      <aside class="${p}-chat-col" aria-label="Book Concierge Chat">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
            <strong class="font-serif" style="font-size:20px;">Chat</strong>
            <span style="font-size:11px;background:#fff;padding:4px 10px;border-radius:999px;">● Concierge Online</span>
          </div>
          <div id="chatLog" style="display:flex;flex-direction:column;">
            <div class="${p}-bubble-user">Good Day! I'm looking for collector gift editions. Do you have them?</div>
            <div class="${p}-bubble-bot">Good Day! Click any book cover on the left and I'll check signed first-edition availability for your cart.</div>
          </div>
        </div>
        <form onsubmit="event.preventDefault();" style="display:flex;gap:8px;margin-top:16px;">
          <input id="chatInput" type="text" placeholder="Write a message..." style="flex:1;padding:10px 14px;border-radius:999px;border:1px solid rgba(0,0,0,0.1);outline:none;font-size:13px;">
          <button type="submit" id="chatSendBtn" style="width:38px;height:38px;border-radius:50%;background:var(--coral);color:#fff;border:none;cursor:pointer;">➤</button>
        </form>
      </aside>
    </div>
  </main>

  <script>
    (function(){
      var log = document.getElementById('chatLog');
      document.querySelectorAll('[data-book]').forEach(function(card){
        card.addEventListener('click', function(){
          var title = card.getAttribute('data-book');
          var b = document.createElement('div');
          b.className = '${p}-bubble-bot';
          b.textContent = 'Added "' + title + '" (Collector Hardcover with ribbon bookmark) to your gift reservation!';
          if (log) log.appendChild(b);
        });
      });
    })();
  </script>
</body>
</html>`;
  }

  // 9. FISCHER MOTORSPORT (Dark Carbon #151619 Automotive Workshop + Diagonal White & Dark Zig-Zag Slash Bands + 3D Bronze Executive Coupe Cutout + 6-Point Inspection Matrix)
  // Motion Recipe: Scroll-Scrubbed Diagonal Car Trajectory + 3D Specular Card Tilt + Interactive TÜV Service Selector
  if (data.slug === 'fischer-motorsport') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>FISCHER KFZ-MEISTERBETRIEB — Precision Automotive Engineering</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #151619;
      --panel: #1f2126;
      --red: #dc2626;
      --amber: #f59e0b;
      --fg: #ffffff;
      --muted: #9ca3af;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; }
    .font-tech { font-family: 'Chakra Petch', sans-serif; text-transform: uppercase; }

    .${p}-top-bar {
      max-width: 1320px; margin: 0 auto; padding: 18px 24px;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 2px solid var(--red);
    }

    /* Dramatic Diagonal White & Dark Zig-Zag Slash Stage */
    .${p}-diag-hero {
      position: relative; overflow: hidden; padding: 64px 24px 88px;
      background: linear-gradient(148deg, #ffffff 0%, #ffffff 46%, #181a1f 46.2%, #151619 100%);
    }
    .${p}-hero-inner {
      max-width: 1320px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 36px; align-items: center;
    }
    @media (min-width: 980px) {
      .${p}-hero-inner { grid-template-columns: 0.95fr 1.05fr; }
    }
    .${p}-white-box {
      background: rgba(255,255,255,0.92); color: #111827; padding: 28px; border-left: 4px solid var(--red);
      box-shadow: 0 20px 50px rgba(0,0,0,0.18);
    }
    .${p}-coupe-cutout {
      width: 100%; max-width: 560px; height: auto; object-fit: contain; margin: 0 auto; display: block;
      filter: drop-shadow(0 28px 40px rgba(0,0,0,0.75)); transition: transform 0.2s ease-out;
    }

    .${p}-sec { max-width: 1320px; margin: 0 auto; padding: 72px 24px; }
    .${p}-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 28px; }
    .${p}-service-card {
      background: var(--panel); border: 1px solid rgba(255,255,255,0.1); padding: 26px;
      border-top: 3px solid var(--amber);
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(21,22,25,0.9); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <header class="${p}-top-bar">
    <div>
      <strong class="font-tech" style="font-size:28px;color:var(--red);letter-spacing:0.06em;">FISCHER</strong>
      <span style="display:block;font-size:11px;color:var(--muted);">KFZ-MEISTERBETRIEB • NEUDIETENDORF</span>
    </div>
    <nav style="display:flex;gap:24px;" aria-label="Main Navigation">
      <a href="#leistungen" class="font-tech" style="color:var(--amber);text-decoration:none;font-size:14px;">Über Uns</a>
      <a href="#leistungen" class="font-tech" style="color:#fff;text-decoration:none;font-size:14px;">Leistungen</a>
      <a href="#leistungen" class="font-tech" style="color:#fff;text-decoration:none;font-size:14px;">Specials</a>
    </nav>
    <button type="button" id="exploreMagneticBtn" style="padding:10px 22px;background:var(--red);color:#fff;border:none;font-weight:700;font-size:13px;cursor:pointer;">TERMIN BUCHEN ↗</button>
  </header>

  <main>
    <section class="${p}-diag-hero">
      <div class="${p}-hero-inner">
        <div class="${p}-white-box">
          <span style="font-size:11px;font-weight:800;color:var(--red);letter-spacing:0.12em;">IHRE AUTOWERKSTATT ZWISCHEN ERFURT, GOTHA &amp; ARNSTADT</span>
          <h1 class="font-tech" style="font-size:clamp(30px,3.8vw,46px);line-height:1.05;margin:10px 0 14px;color:#111827;">
            FISCHER KFZ-MEISTERBETRIEB
          </h1>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;font-weight:600;color:#374151;margin-bottom:20px;">
            <span>✓ KFZ-Reparaturen</span><span>✓ Klimaanlagenservice</span>
            <span>✓ Unfallinstandsetzung</span><span>✓ TÜV / AU Abnahme</span>
            <span>✓ Achsvermessung 3D</span><span>✓ Bremsenservice</span>
          </div>
          <button type="button" style="padding:11px 24px;background:#111827;color:#fff;border:none;font-weight:700;font-size:13px;cursor:pointer;" onclick="document.getElementById('fischerModal').classList.add('is-open')">
            Zum Kontaktformular →
          </button>
        </div>

        <div>
          <img id="fischerCarImg" src="assets/cutout.webp" alt="3D Bronze Executive Coupe" class="${p}-coupe-cutout" />
        </div>
      </div>
    </section>

    <section id="leistungen" class="${p}-sec">
      <span class="font-tech" style="color:var(--amber);font-size:13px;letter-spacing:0.14em;">UNSERE LEISTUNGEN // MEISTERQUALITÄT</span>
      <h2 class="font-tech" style="font-size:clamp(30px,3.8vw,44px);margin-top:6px;">DIAGNOSE, FAHRWERK &amp; MOTORSPORT-SERVICE</h2>
      <div class="${p}-grid-3">
        <article class="${p}-service-card">
          <strong class="font-tech" style="font-size:20px;color:var(--amber);">01 // 3D ACHSVERMESSUNG</strong>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;margin-top:8px;">Lasergestützte Fahrwerksgeometrie und Spurkorrektur auf 0,01 Grad Genauigkeit.</p>
        </article>
        <article class="${p}-service-card">
          <strong class="font-tech" style="font-size:20px;color:var(--amber);">02 // BREMSEN ZUM AKTIONSPREIS</strong>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;margin-top:8px;">OEM Hochleistungs-Bremsscheiben und Keramikbeläge inklusive Bremsflüssigkeitswechsel.</p>
        </article>
        <article class="${p}-service-card">
          <strong class="font-tech" style="font-size:20px;color:var(--amber);">03 // HAUPTUNTERSUCHUNG (TÜV/AU)</strong>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;margin-top:8px;">Tägliche Prüfingenieur-Abnahme direkt im Haus inklusive Vorab-Diagnosecheck.</p>
        </article>
      </div>
    </section>
  </main>

  <div id="fischerModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="fischerModalTitle">
    <div style="max-width:480px;width:100%;background:var(--panel);border-top:4px solid var(--red);padding:32px;">
      <h2 id="fischerModalTitle" class="font-tech" style="font-size:28px;margin-bottom:10px;">WERKSTATT-TERMIN VEREINBAREN</h2>
      <p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px;">Kirchstraße 48, 99192 Nesse-Apfelstädt • Sofort-Rückruf durch KFZ-Meister Christian Fischer.</p>
      <button type="button" style="width:100%;padding:12px;background:var(--red);color:#fff;border:none;font-weight:700;cursor:pointer;" onclick="document.getElementById('fischerModal').classList.remove('is-open')">Anfrage Absenden</button>
    </div>
  </div>

  <script>
    (function(){
      var car = document.getElementById('fischerCarImg');
      window.addEventListener('scroll', function(){
        var y = window.scrollY || 0;
        if (car) car.style.transform = 'translate3d(' + (-y * 0.08).toFixed(1) + 'px, 0, 0)';
      }, { passive: true });
      var btn = document.getElementById('exploreMagneticBtn');
      if (btn) btn.addEventListener('click', function(){ document.getElementById('fischerModal').classList.add('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 10. JAPAN SUNRISE TOUR (Masked "JAPAN" Golden Sunrise Hero + 3D Vermilion Pagoda & Sakura Cutout + 5 Vertical Glass Cards + Vertical Osaka-Kyoto-Tokyo Timeline + 4 "What's Included" Cards)
  // Motion Recipe: Parallax Masked "JAPAN" Sunrise Header + 5-Card Hover Accordion + Vertical Itinerary Timeline
  if (data.slug === 'japan-sunrise-tour') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>JAPAN TOURS — 10-Day Osaka, Kyoto &amp; Tokyo Expedition</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0c10;
      --gold: #fcd34d;
      --sakura: #f43f5e;
      --fg: #ffffff;
      --muted: #9ca3af;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 24px clamp(20px, 5vw, 64px) 72px;
      background: linear-gradient(180deg, #fef08a 0%, #f59e0b 32%, #312e81 68%, #0b0c10 100%);
      display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; isolation: isolate;
    }
    .${p}-nav {
      max-width: 1280px; width: 100%; margin: 0 auto; padding: 12px 22px; border-radius: 999px;
      background: rgba(255,255,255,0.22); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4);
      display: flex; align-items: center; justify-content: space-between; color: #111827;
    }
    .${p}-giant-japan {
      font-size: clamp(72px, 16vw, 210px); font-weight: 800; letter-spacing: 0.08em;
      color: rgba(255,255,255,0.88); text-align: center; line-height: 0.86; margin: 28px 0 10px;
      text-shadow: 0 18px 48px rgba(0,0,0,0.18);
    }

    .${p}-hero-mid {
      max-width: 1280px; width: 100%; margin: 0 auto;
      display: grid; grid-template-columns: 1fr; gap: 28px; align-items: end;
    }
    @media (min-width: 980px) {
      .${p}-hero-mid { grid-template-columns: 1.25fr 0.75fr; }
    }
    .${p}-cards-5 {
      display: grid; grid-template-columns: repeat(5, minmax(95px, 1fr)); gap: 12px; overflow-x: auto;
    }
    .${p}-vcard {
      height: 210px; border-radius: 16px; padding: 14px;
      background: rgba(15, 23, 42, 0.68); backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,0.24); display: flex; flex-direction: column; justify-content: flex-end;
      transition: transform 0.25s;
    }
    .${p}-vcard:hover { transform: translateY(-6px); border-color: var(--gold); }
    .${p}-pagoda-img {
      width: 100%; max-width: 360px; height: auto; object-fit: contain; margin: 0 auto; display: block;
      filter: drop-shadow(0 24px 40px rgba(0,0,0,0.55));
      -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 52%, #000 70%, transparent 100%);
      mask-image: radial-gradient(ellipse 50% 50% at 50% 52%, #000 70%, transparent 100%);
    }

    .${p}-sec { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${p}-line-head {
      display: flex; align-items: center; gap: 20px; margin-bottom: 44px;
    }
    .${p}-line-head::before, .${p}-line-head::after {
      content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.22);
    }
    .${p}-inc-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 18px;
    }
    .${p}-inc-card {
      padding: 26px; border-radius: 20px; background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.16);
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(11,12,16,0.88); backdrop-filter: blur(18px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <main>
    <section class="${p}-hero">
      <header class="${p}-nav">
        <strong style="font-size:14px;letter-spacing:0.12em;">🌐 JAPAN TOURS</strong>
        <nav style="display:flex;gap:24px;" aria-label="Main Navigation">
          <a href="#aboutTour" style="color:#111827;text-decoration:none;font-size:13px;font-weight:600;">About</a>
          <a href="#whatsIncluded" style="color:#111827;text-decoration:none;font-size:13px;font-weight:600;">Included</a>
          <a href="#whatsIncluded" style="color:#111827;text-decoration:none;font-size:13px;font-weight:600;">Contacts</a>
        </nav>
        <button type="button" id="exploreMagneticBtn" style="padding:7px 20px;border-radius:999px;border:1px solid #111827;background:rgba(255,255,255,0.6);font-weight:700;font-size:12px;cursor:pointer;">Book</button>
      </header>

      <h1 class="${p}-giant-japan" data-parallax="0.08">JAPAN</h1>

      <div class="${p}-hero-mid">
        <div class="${p}-cards-5">
          <article class="${p}-vcard"><span style="font-size:18px;margin-bottom:auto;">🏯</span><strong style="font-size:13px;">3 cities<br>in Japan</strong></article>
          <article class="${p}-vcard"><span style="font-size:18px;margin-bottom:auto;">🗓️</span><strong style="font-size:13px;">10 days<br>itinerary</strong></article>
          <article class="${p}-vcard"><span style="font-size:18px;margin-bottom:auto;">📸</span><strong style="font-size:13px;">gigabytes<br>of photos</strong></article>
          <article class="${p}-vcard"><span style="font-size:18px;margin-bottom:auto;">🍜</span><strong style="font-size:13px;">eat authentic<br>ramen</strong></article>
          <article class="${p}-vcard"><span style="font-size:18px;margin-bottom:auto;">🌸</span><strong style="font-size:13px;">enjoy<br>the vibe</strong></article>
        </div>

        <div style="text-align:center;">
          <img src="assets/cutout.webp" alt="3D Chureito Pagoda &amp; Sakura" class="${p}-pagoda-img" data-tilt-card />
          <button type="button" onclick="document.getElementById('japanModal').classList.add('is-open')" style="margin-top:12px;width:100%;max-width:240px;padding:12px;border-radius:10px;background:rgba(255,255,255,0.88);color:#111827;font-weight:700;border:none;cursor:pointer;">
            Book Expedition
          </button>
        </div>
      </div>
    </section>

    <!-- ABOUT THE TOUR TIMELINE -->
    <section id="aboutTour" class="${p}-sec">
      <div class="${p}-line-head">
        <h2 style="font-size:clamp(28px,3.8vw,44px);font-weight:500;letter-spacing:0.08em;">ABOUT THE TOUR</h2>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:36px;align-items:center;">
        <div>
          <p style="font-size:16px;color:var(--muted);line-height:1.7;margin-bottom:20px;">
            We've planned a simple and convenient 10-day itinerary for your trip to Japan. You'll visit three iconic cities:
            <strong style="color:var(--gold);">Osaka, Kyoto, and Tokyo.</strong>
          </p>
          <p style="font-size:15px;color:var(--muted);line-height:1.7;">
            No need to worry about Shinkansen routes, schedules, or finding hidden temples — everything is already organized so you can simply <span style="color:var(--gold);">enjoy the journey.</span>
          </p>
        </div>

        <div style="border-left:2px solid rgba(255,255,255,0.22);padding-left:28px;display:flex;flex-direction:column;gap:28px;">
          <div>
            <span style="font-size:12px;color:var(--gold);">● Days 1–3</span>
            <h3 style="font-size:22px;margin:4px 0;">Osaka</h3>
            <p style="font-size:13px;color:var(--muted);">Dotonbori neon canal street food, Osaka Castle keep, and Shinsekai night walk.</p>
          </div>
          <div>
            <span style="font-size:12px;color:var(--gold);">● Days 4–6</span>
            <h3 style="font-size:22px;margin:4px 0;">Kyoto</h3>
            <p style="font-size:13px;color:var(--muted);">Fushimi Inari torii gates at dawn, Arashiyama bamboo grove, and Gion tea ceremony.</p>
          </div>
          <div>
            <span style="font-size:12px;color:var(--gold);">● Days 7–10</span>
            <h3 style="font-size:22px;margin:4px 0;">Tokyo</h3>
            <p style="font-size:13px;color:var(--muted);">Shibuya Sky sunset, teamLab Planets digital art, and Mount Fuji Chureito Pagoda day trip.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT'S INCLUDED -->
    <section id="whatsIncluded" class="${p}-sec" style="padding-top:0;">
      <div class="${p}-line-head">
        <h2 style="font-size:clamp(28px,3.8vw,44px);font-weight:500;letter-spacing:0.08em;">WHAT'S INCLUDED</h2>
      </div>
      <div class="${p}-inc-grid">
        <article class="${p}-inc-card"><strong style="font-size:18px;color:var(--gold);display:block;margin-bottom:8px;">✦ Guides</strong><p style="font-size:13px;color:var(--muted);line-height:1.6;">2 bilingual cultural guides who know every hidden alley in Japan.</p></article>
        <article class="${p}-inc-card"><strong style="font-size:18px;color:var(--gold);display:block;margin-bottom:8px;">✈ Flights &amp; Rail</strong><p style="font-size:13px;color:var(--muted);line-height:1.6;">International round-trip flights plus Green-Car Shinkansen bullet train passes.</p></article>
        <article class="${p}-inc-card"><strong style="font-size:18px;color:var(--gold);display:block;margin-bottom:8px;">🚐 Transfers</strong><p style="font-size:13px;color:var(--muted);line-height:1.6;">Private airport limousine transfers and luggage forwarding between cities.</p></article>
        <article class="${p}-inc-card"><strong style="font-size:18px;color:var(--gold);display:block;margin-bottom:8px;">🏯 Boutique Hotels</strong><p style="font-size:13px;color:var(--muted);line-height:1.6;">4-star boutique hotels &amp; Kyoto ryokan stay (2 people per room, breakfasts included).</p></article>
      </div>
    </section>
  </main>

  <div id="japanModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="japanModalTitle">
    <div style="max-width:480px;width:100%;background:#161822;border:1px solid rgba(255,255,255,0.2);border-radius:24px;padding:32px;">
      <h2 id="japanModalTitle" style="font-size:24px;margin-bottom:8px;">Want to join us? Leave a request</h2>
      <p style="font-size:13px;color:var(--muted);margin-bottom:18px;">Autumn Momiji &amp; Spring Sakura 10-day small-group departures.</p>
      <button type="button" style="width:100%;padding:12px;border-radius:10px;background:#fff;color:#111827;font-weight:700;border:none;cursor:pointer;" onclick="document.getElementById('japanModal').classList.remove('is-open')">Send Booking Request</button>
    </div>
  </div>

  <script>
    (function(){
      var expBtn = document.getElementById('exploreMagneticBtn');
      if (expBtn) expBtn.addEventListener('click', function(){ document.getElementById('japanModal').classList.add('is-open'); });
    })();
  </script>
</body>
</html>`;
  }

  // 11. INDUSTRIX ENGINEERING (Ribbed Copper-Bronze Columns + Giant Stacked "INDUSTRIX / ENGINEERING" + 3D Copper Arrow & Turbine Cutout + 4-Stat Grid + 6-Step Matrix + Orange Footer Banner)
  // Motion Recipe: Ribbed Copper Shimmer + 3D Monument Tilt + Animated Industrial Counters + 6-Step Matrix Hover
  if (data.slug === 'industrix-engineering') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>INDUSTRIX ENGINEERING — Industrial Automation &amp; Plant Engineering</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #070504;
      --copper: #d95d16;
      --copper-bright: #f97316;
      --fg: #ffffff;
      --muted: #b8aba3;
      --border: rgba(249, 115, 22, 0.25);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth; }
    .font-ind { font-family: 'Space Grotesk', sans-serif; text-transform: uppercase; }

    .${p}-hero {
      position: relative; min-height: 92vh; max-width: 1360px; margin: 18px auto 0;
      border: 1px solid rgba(255,255,255,0.22); overflow: hidden; padding: 28px clamp(20px, 4vw, 56px) 44px;
      background:
        radial-gradient(circle at 52% 68%, rgba(249,115,22,0.42) 0%, rgba(7,5,4,0.88) 64%),
        repeating-linear-gradient(90deg, #2b1206 0px, #5c260c 28px, #120804 56px, #070504 84px);
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .${p}-top-bar { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap; }
    .${p}-plus-note { font-size: 13px; color: #f3ece7; max-width: 280px; line-height: 1.45; position: relative; padding-left: 20px; }
    .${p}-plus-note::before { content: '+'; position: absolute; left: 0; top: -2px; color: var(--copper-bright); font-weight: 700; font-size: 18px; }

    .${p}-giant-title {
      font-size: clamp(46px, 8.8vw, 128px); font-weight: 700; line-height: 0.92; letter-spacing: -0.02em;
      margin: 18px 0 0; position: relative; z-index: 3;
    }
    .${p}-giant-title .line-2 { display: block; padding-left: clamp(24px, 12vw, 190px); }

    .${p}-stage-center {
      position: relative; z-index: 4; margin: -24px auto -10px; text-align: center;
    }
    .${p}-cutout-img {
      width: 100%; max-width: 410px; height: auto; object-fit: contain; display: block; margin: 0 auto;
      filter: drop-shadow(0 28px 48px rgba(0,0,0,0.9)); transition: transform 0.3s ease;
    }
    .${p}-bottom-bar { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; position: relative; z-index: 5; }

    /* 2-Column Bento Panels (Stats Left + 6-Step Matrix Right) */
    .${p}-bento-row {
      max-width: 1360px; margin: 24px auto 0; display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 980px) {
      .${p}-bento-row { grid-template-columns: 1fr 1fr; }
    }
    .${p}-panel {
      border: 1px solid rgba(255,255,255,0.22); padding: clamp(24px, 3.5vw, 42px);
      background:
        radial-gradient(circle at 80% 80%, rgba(217,93,22,0.32), transparent 60%),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 96px),
        #0c0806;
    }
    .${p}-stats-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 32px; }
    @media (min-width: 640px) { .${p}-stats-4 { grid-template-columns: repeat(4, 1fr); } }
    .${p}-stat-num { font-size: clamp(30px, 3.6vw, 46px); font-weight: 600; color: #fff; display: block; }
    .${p}-stat-lbl { font-size: 12px; color: var(--muted); margin-top: 4px; display: block; line-height: 1.4; }

    .${p}-matrix-6 { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid rgba(255,255,255,0.16); margin-top: 24px; }
    .${p}-mcell {
      padding: 18px 14px; border-right: 1px solid rgba(255,255,255,0.14); border-bottom: 1px solid rgba(255,255,255,0.14);
      background: rgba(217,93,22,0.08); transition: background 0.25s;
    }
    .${p}-mcell:hover { background: rgba(249,115,22,0.28); }
    .${p}-mcell strong { display: block; text-align: right; font-size: 20px; margin-bottom: 18px; color: #fff; }
    .${p}-mcell span { font-size: 11px; color: #e5dcd6; line-height: 1.4; display: block; }

    .${p}-footer-box {
      max-width: 1360px; margin: 24px auto 48px; border: 1px solid rgba(255,255,255,0.22);
      background: #090706; padding: clamp(28px, 4vw, 56px) clamp(20px, 4vw, 56px) 0;
    }
    .${p}-orange-banner {
      margin: 36px calc(-1 * clamp(20px, 4vw, 56px)) 0; background: linear-gradient(90deg, #ea580c, #9a3412);
      padding: 18px 24px; text-align: center; font-size: clamp(28px, 5.8vw, 82px); font-weight: 700; letter-spacing: 0.02em;
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(7,5,4,0.88); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body style="padding: 0 16px;">
  <main>
    <section class="${p}-hero">
      <div class="${p}-top-bar">
        <div style="display:flex;align-items:center;gap:14px;">
          <span style="width:12px;height:12px;background:var(--copper-bright);display:inline-block;"></span>
          <strong class="font-ind" style="font-size:14px;letter-spacing:0.14em;">INDUSTRIX // AUTOMATION</strong>
        </div>
        <p class="${p}-plus-note">
          Automation systems engineered to multiply heavy manufacturing throughput &amp; plant OEE efficiency.
        </p>
      </div>

      <h1 class="${p}-giant-title font-ind">
        INDUSTRIX
        <span class="line-2">ENGINEERING</span>
      </h1>

      <div class="${p}-stage-center">
        <img src="assets/cutout.webp" alt="Industrix 3D Copper Monument &amp; Turbine Gear" class="${p}-cutout-img" id="indCutout" />
      </div>

      <div class="${p}-bottom-bar">
        <p class="${p}-plus-note">
          We design, manufacture, and commission turnkey industrial equipment tailored to your facility's exact tolerances.
        </p>
        <div style="display:flex;gap:12px;">
          <button type="button" id="exploreMagneticBtn" style="padding:12px 24px;background:var(--copper-bright);color:#fff;border:none;font-weight:700;font-size:13px;cursor:pointer;">
            ↘ REQUEST TECHNICAL AUDIT
          </button>
        </div>
      </div>
    </section>

    <div class="${p}-bento-row">
      <section class="${p}-panel">
        <h2 style="font-size:clamp(22px,2.6vw,32px);font-weight:500;line-height:1.2;">
          Delivering turnkey engineering projects across heavy industries
        </h2>
        <div class="${p}-stats-4">
          <div><span class="${p}-stat-num">15</span><span class="${p}-stat-lbl">years in heavy industrial automation</span></div>
          <div><span class="${p}-stat-num">120+</span><span class="${p}-stat-lbl">certified control &amp; mechanical engineers</span></div>
          <div><span class="${p}-stat-num">350+</span><span class="${p}-stat-lbl">commissioned production lines</span></div>
          <div><span class="${p}-stat-num">95%</span><span class="${p}-stat-lbl">projects delivered ahead of schedule</span></div>
        </div>
      </section>

      <section class="${p}-panel">
        <h2 style="font-size:clamp(22px,2.6vw,32px);font-weight:500;line-height:1.2;">
          Equipment launch is only the beginning of lifecycle support
        </h2>
        <div class="${p}-matrix-6">
          <div class="${p}-mcell"><strong>1</strong><span>24/7 production line telemetry</span></div>
          <div class="${p}-mcell"><strong>2</strong><span>Preventive maintenance audits</span></div>
          <div class="${p}-mcell"><strong>3</strong><span>OEM spare parts logistics</span></div>
          <div class="${p}-mcell"><strong>4</strong><span>Operator &amp; PLC crew training</span></div>
          <div class="${p}-mcell"><strong>5</strong><span>SCADA firmware upgrades</span></div>
          <div class="${p}-mcell"><strong>6</strong><span>Robotic cell retrofitting</span></div>
        </div>
      </section>
    </div>

    <footer class="${p}-footer-box">
      <h2 style="font-size:clamp(26px,3.8vw,48px);font-weight:500;max-width:880px;line-height:1.18;">
        Sometimes a single engineering decision transforms the efficiency of an entire plant.
      </h2>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-top:32px;">
        <div>
          <p style="font-size:18px;margin-bottom:8px;">↘ REQUEST A TECHNICAL AUDIT</p>
          <p style="font-size:13px;color:var(--muted);">info@industrix.engineering • +1 (800) 555-0199</p>
        </div>
        <p class="${p}-plus-note">Schedule an on-site engineering inspection and receive a custom automation roadmap.</p>
      </div>
      <div class="${p}-orange-banner font-ind">INDUSTRIX ENGINEERING</div>
    </footer>
  </main>

  <div id="indModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="indModalTitle">
    <div style="max-width:480px;width:100%;background:#140c08;border:1px solid var(--copper-bright);padding:32px;">
      <h2 id="indModalTitle" class="font-ind" style="font-size:24px;margin-bottom:8px;">Technical Plant Audit</h2>
      <p style="font-size:13px;color:var(--muted);margin-bottom:18px;">Submit your facility parameters for a full OEE &amp; SCADA automation blueprint.</p>
      <button type="button" style="width:100%;padding:12px;background:var(--copper-bright);color:#fff;border:none;font-weight:700;cursor:pointer;" onclick="document.getElementById('indModal').classList.remove('is-open')">Confirm Audit Request</button>
    </div>
  </div>

  <script>
    (function(){
      var btn = document.getElementById('exploreMagneticBtn');
      if (btn) btn.addEventListener('click', function(){ document.getElementById('indModal').classList.add('is-open'); });
      var img = document.getElementById('indCutout');
      window.addEventListener('mousemove', function(e){
        if (!img) return;
        var nx = (e.clientX / window.innerWidth - 0.5) * 14;
        var ny = (e.clientY / window.innerHeight - 0.5) * 14;
        img.style.transform = 'perspective(900px) rotateY(' + nx.toFixed(1) + 'deg) rotateX(' + (-ny).toFixed(1) + 'deg)';
      }, { passive: true });
    })();
  </script>
</body>
</html>`;
  }

  // 12. AQUARIUM ANIMALS (Deep Abyssal Blue #012e4a + Tall Condensed "ANIMALS" + 3 Out-of-Bounds 3D Pop-Out Marine Cards with Straddling Yellow Circle Arrow Buttons)
  // Motion Recipe: Zero-Gravity Marine Float + 3D Out-of-Bounds Card Pop-Out + Interactive Species Telemetry Filter
  if (data.slug === 'aquarium-animals') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>AQUARIUM WORLD — 3D Out-of-Bounds Marine Sanctuary Showcase</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-deep: #012c47;
      --bg-mid: #02436c;
      --card-blue: #0568a3;
      --card-light: #0a8fd8;
      --yellow: #fbbf24;
      --fg: #ffffff;
      --muted: #bae6fd;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: radial-gradient(circle at 50% 18%, #045a8d 0%, #012e4a 60%, #001829 100%);
      color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; scroll-behavior: smooth;
    }
    .font-cond { font-family: 'Antonio', sans-serif; text-transform: uppercase; }

    .${p}-nav {
      max-width: 1280px; margin: 0 auto; padding: 24px 28px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-hero {
      max-width: 1240px; margin: 0 auto; padding: 12px 24px 96px; text-align: center;
    }
    .${p}-giant-animals {
      font-size: clamp(68px, 12vw, 148px); font-weight: 400; letter-spacing: 0.22em; line-height: 0.92;
      margin-bottom: 18px; color: #ffffff; text-indent: 0.22em;
    }
    .${p}-sub {
      max-width: 540px; margin: 0 auto 26px; font-size: 14px; line-height: 1.65; color: var(--muted);
    }
    .${p}-view-btn {
      padding: 11px 34px; background: rgba(255,255,255,0.04); border: 1px solid rgba(186,230,253,0.45);
      color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
      cursor: pointer; transition: background 0.2s, border-color 0.2s;
    }
    .${p}-view-btn:hover { background: rgba(10,143,216,0.28); border-color: #fff; }

    /* 3-Column Out-of-Bounds 3D Pop-Out Marine Triptych */
    .${p}-triptych {
      display: grid; grid-template-columns: 1fr; gap: 64px 28px; margin-top: 92px; align-items: stretch;
    }
    @media (min-width: 920px) {
      .${p}-triptych { grid-template-columns: repeat(3, 1fr); }
    }
    .${p}-marine-card {
      position: relative; min-height: 410px;
      background: linear-gradient(180deg, #0b87cc 0%, #034b78 58%, #023759 100%);
      box-shadow: 0 28px 60px rgba(0, 12, 24, 0.65);
      border: 1px solid rgba(125, 211, 252, 0.22);
      display: flex; flex-direction: column; justify-content: flex-end; align-items: center;
      padding: 28px 24px 44px; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s;
    }
    .${p}-marine-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 36px 72px rgba(0, 12, 24, 0.85), 0 0 40px rgba(56, 189, 248, 0.28);
    }
    /* Out-of-bounds 3D Subject Breaking Top Border */
    .${p}-popout-wrap {
      position: absolute; top: -68px; left: 50%; transform: translateX(-50%);
      width: 100%; max-width: 280px; height: 320px; display: flex; align-items: center; justify-content: center;
      pointer-events: none; z-index: 4;
    }
    .${p}-popout-wrap img, .${p}-popout-wrap svg {
      max-width: 100%; max-height: 320px; width: auto; height: auto; object-fit: contain;
      filter: drop-shadow(0 24px 32px rgba(0, 18, 36, 0.78));
      animation: ${p}Float 5.2s ease-in-out infinite;
    }
    @keyframes ${p}Float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    .${p}-card-title {
      position: relative; z-index: 5; font-size: 32px; letter-spacing: 0.06em; margin-top: auto;
    }
    .${p}-card-meta {
      font-size: 12px; color: var(--muted); margin-top: 6px;
    }
    /* Bottom-Straddling Yellow Circle Button */
    .${p}-yellow-fab {
      position: absolute; bottom: -23px; left: 50%; transform: translateX(-50%); z-index: 6;
      width: 46px; height: 46px; border-radius: 50%; border: none;
      background: var(--yellow); color: #ffffff; font-size: 18px; font-weight: 800;
      display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
      box-shadow: 0 10px 24px rgba(251, 191, 36, 0.45); transition: transform 0.2s;
    }
    .${p}-yellow-fab:hover { transform: translateX(-50%) scale(1.12); }

    .${p}-zone-sec { max-width: 1240px; margin: 0 auto; padding: 48px 24px 96px; }
    .${p}-zone-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-top: 28px; }
    .${p}-zone-box {
      padding: 26px; background: rgba(2, 67, 108, 0.55); border: 1px solid rgba(186,230,253,0.2);
      backdrop-filter: blur(12px);
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(0,24,41,0.88); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <header class="${p}-nav">
    <strong class="font-cond" style="font-size:22px;letter-spacing:0.18em;">🌊 AQUARIUM WORLD</strong>
    <nav style="display:flex;gap:28px;" aria-label="Main Navigation">
      <a href="#marineTriptych" style="color:var(--muted);text-decoration:none;font-size:13px;">Animals</a>
      <a href="#depthZones" style="color:var(--muted);text-decoration:none;font-size:13px;">Abyssal Zones</a>
      <a href="#depthZones" style="color:var(--muted);text-decoration:none;font-size:13px;">Conservation</a>
    </nav>
    <button type="button" id="exploreMagneticBtn" class="${p}-view-btn">BOOK TICKETS</button>
  </header>

  <main>
    <section class="${p}-hero" id="marineTriptych">
      <h1 class="${p}-giant-animals font-cond">ANIMALS</h1>
      <p class="${p}-sub">
        Explore our deep-water biosphere habitats where bioluminescent cnidarians, California sea lions, and pelagic manta rays glide across multi-story acrylic domes.
      </p>
      <button type="button" class="${p}-view-btn" onclick="document.getElementById('aquaModal').classList.add('is-open')">VIEW ALL</button>

      <div class="${p}-triptych">
        <!-- Card 1: SEA LIONS -->
        <article class="${p}-marine-card" data-tilt-card>
          <div class="${p}-popout-wrap">
            <svg viewBox="0 0 280 290" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="seaLionGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#94a3b8"/>
                  <stop offset="50%" stop-color="#334155"/>
                  <stop offset="100%" stop-color="#0f172a"/>
                </linearGradient>
              </defs>
              <path d="M95 250 C85 180 105 110 148 45 C168 25 198 30 202 52 C205 72 178 96 176 135 C174 178 215 218 242 238 C195 255 150 258 95 250 Z" fill="url(#seaLionGrad)" stroke="#7dd3fc" stroke-width="2"/>
              <path d="M110 215 C75 235 45 255 32 268 C72 272 118 260 135 238 Z" fill="#1e293b"/>
              <circle cx="172" cy="48" r="4" fill="#38bdf8"/>
            </svg>
          </div>
          <h2 class="${p}-card-title font-cond">SEA LIONS</h2>
          <span class="${p}-card-meta">Pacific Kelp Reef • Tank 01</span>
          <button type="button" class="${p}-yellow-fab" aria-label="Explore Sea Lions" onclick="openSpecies('SEA LIONS — Pacific Kelp Reef')">➔</button>
        </article>

        <!-- Card 2: JELLYFISH (Real 3D Cutout Breaking Top Border!) -->
        <article class="${p}-marine-card" data-tilt-card>
          <div class="${p}-popout-wrap" style="top:-78px;">
            <img src="assets/cutout.webp" alt="3D Bioluminescent Jellyfish Cutout" />
          </div>
          <h2 class="${p}-card-title font-cond">JELLYFISH</h2>
          <span class="${p}-card-meta">Bioluminescent Abyss • Tank 02</span>
          <button type="button" class="${p}-yellow-fab" aria-label="Explore Jellyfish" onclick="openSpecies('JELLYFISH — Bioluminescent Cnidaria Dome')">➔</button>
        </article>

        <!-- Card 3: MANTA RAY -->
        <article class="${p}-marine-card" data-tilt-card>
          <div class="${p}-popout-wrap">
            <svg viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="mantaGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#38bdf8"/>
                  <stop offset="45%" stop-color="#0369a1"/>
                  <stop offset="100%" stop-color="#082f49"/>
                </linearGradient>
              </defs>
              <path d="M150 32 C195 68 255 82 288 96 C235 135 190 168 158 192 L182 268 L152 194 C115 168 65 135 14 96 C52 82 108 68 150 32 Z" fill="url(#mantaGrad)" stroke="#bae6fd" stroke-width="2"/>
              <ellipse cx="128" cy="96" rx="18" ry="8" fill="#e0f2fe" fill-opacity="0.85"/>
              <ellipse cx="174" cy="96" rx="18" ry="8" fill="#e0f2fe" fill-opacity="0.85"/>
            </svg>
          </div>
          <h2 class="${p}-card-title font-cond">MANTA RAY</h2>
          <span class="${p}-card-meta">Pelagic Ocean Tunnel • Tank 03</span>
          <button type="button" class="${p}-yellow-fab" aria-label="Explore Manta Ray" onclick="openSpecies('MANTA RAY — Pelagic Ocean Tunnel')">➔</button>
        </article>
      </div>
    </section>

    <section id="depthZones" class="${p}-zone-sec">
      <h2 class="font-cond" style="font-size:36px;letter-spacing:0.12em;text-align:center;">ABYSSAL BIOSPHERE TELEMETRY</h2>
      <div class="${p}-zone-grid">
        <div class="${p}-zone-box"><strong class="font-cond" style="font-size:28px;color:var(--yellow);">4.2M L</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">Pressurized saltwater volume across 14 pelagic habitats.</p></div>
        <div class="${p}-zone-box"><strong class="font-cond" style="font-size:28px;color:var(--yellow);">380+</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">Protected marine species including deep-sea Chrysaora jellyfish.</p></div>
        <div class="${p}-zone-box"><strong class="font-cond" style="font-size:28px;color:var(--yellow);">360°</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">Sub-aquatic viewing tunnel at 18 meters depth.</p></div>
      </div>
    </section>
  </main>

  <div id="aquaModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="aquaModalTitle">
    <div style="max-width:460px;width:100%;background:#023859;border:1px solid #38bdf8;padding:32px;text-align:center;">
      <h2 id="aquaModalTitle" class="font-cond" style="font-size:30px;letter-spacing:0.08em;margin-bottom:10px;">JELLYFISH SANCTUARY</h2>
      <p style="font-size:14px;color:var(--muted);margin-bottom:22px;line-height:1.6;">Reserve VIP night-dive passes to witness bioluminescent deep-sea jellyfish and pelagic manta rays.</p>
      <button type="button" class="${p}-view-btn" style="background:var(--yellow);color:#012c47;border:none;" onclick="document.getElementById('aquaModal').classList.remove('is-open')">CONFIRM EXPEDITION PASS</button>
    </div>
  </div>

  <script>
    function openSpecies(title) {
      var t = document.getElementById('aquaModalTitle');
      if (t) t.textContent = title;
      document.getElementById('aquaModal').classList.add('is-open');
    }
    document.getElementById('exploreMagneticBtn').addEventListener('click', function(){
      openSpecies('VIP SANCTUARY ENTRY PASS');
    });
  </script>
</body>
</html>`;
  }

  // 13. FLASH ROCKY MOUNTAIN (Dark Alpine Glacier Cyan "TIME TO TRAVEL" + Right Vertical 01-05 Counter + 3D Rocky Mountain Diorama Cutout + 4-Card "POPULAR TOURS" + "DISCOVER THE WORLD IN A NEW WAY" Video Grid)
  // Motion Recipe: Parallax Alpine Mist + Interactive 01-05 Elevation Switcher + 4-Card Popular Tours Center Scale + Video Modal
  if (data.slug === 'flash-rocky-mountain') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>FLASH — Time To Travel | Rocky Mountain National Park Expeditions</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #030708;
      --surface: #0a1417;
      --cyan: #38e8ff;
      --fg: #ffffff;
      --muted: #94a3b8;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: 'Montserrat', sans-serif; overflow-x: clip; scroll-behavior: smooth; }

    .${p}-hero {
      position: relative; min-height: 100vh; padding: 24px clamp(20px, 5vw, 72px) 56px;
      background:
        linear-gradient(180deg, rgba(3,7,8,0.35) 0%, rgba(10,32,38,0.55) 55%, #030708 100%),
        radial-gradient(circle at 60% 42%, #164e63 0%, #07191e 55%, #030708 100%);
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .${p}-nav {
      max-width: 1320px; width: 100%; margin: 0 auto; padding-bottom: 18px;
      border-bottom: 1px solid rgba(255,255,255,0.16);
      display: flex; align-items: center; justify-content: space-between;
    }
    .${p}-hero-grid {
      max-width: 1320px; width: 100%; margin: 36px auto;
      display: grid; grid-template-columns: 1fr; gap: 36px; align-items: center; position: relative;
    }
    @media (min-width: 980px) {
      .${p}-hero-grid { grid-template-columns: 1.05fr 0.85fr 60px; }
    }
    .${p}-h1 {
      font-size: clamp(42px, 6.2vw, 78px); font-weight: 700; color: var(--cyan);
      letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.02;
      text-shadow: 0 0 36px rgba(56, 232, 255, 0.35); margin-bottom: 18px;
    }
    .${p}-diorama-img {
      width: 100%; max-width: 420px; height: auto; object-fit: contain; display: block; margin: 0 auto;
      filter: drop-shadow(0 28px 44px rgba(0,0,0,0.85));
    }
    .${p}-slide-rail {
      display: flex; flex-direction: column; align-items: flex-end; gap: 12px; font-size: 13px; color: var(--muted);
    }
    .${p}-slide-rail button {
      background: none; border: none; color: inherit; font-family: inherit; cursor: pointer; padding: 4px 0;
    }
    .${p}-slide-rail button.active {
      color: #fff; font-size: 20px; font-weight: 700; border-bottom: 2px solid var(--cyan); padding-right: 18px;
    }

    .${p}-bottom-3 {
      max-width: 1320px; width: 100%; margin: 0 auto; padding-top: 28px;
      border-top: 1px solid rgba(255,255,255,0.14);
      display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px;
    }
    .${p}-info-col { display: flex; gap: 16px; align-items: flex-start; }
    .${p}-info-icon { color: var(--cyan); font-size: 22px; flex-shrink: 0; }
    .${p}-more-link { display: inline-block; margin-top: 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: #fff; text-decoration: none; }

    /* POPULAR TOURS 4-CARD GALLERY */
    .${p}-tours-sec { max-width: 1240px; margin: 0 auto; padding: 88px 24px; text-align: center; }
    .${p}-tours-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 22px;
      margin-top: 44px; align-items: center;
    }
    .${p}-tour-card {
      height: 360px; padding: 26px; display: flex; flex-direction: column; justify-content: flex-end;
      border: 1px solid rgba(255,255,255,0.14); position: relative; overflow: hidden; cursor: pointer;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .${p}-tour-card.featured {
      height: 400px; border: 3px solid #ffffff; box-shadow: 0 24px 60px rgba(56,232,255,0.18);
    }
    .${p}-tour-card:hover { transform: translateY(-8px); border-color: var(--cyan); }

    /* DISCOVER THE WORLD IN A NEW WAY */
    .${p}-discover-sec {
      max-width: 1320px; margin: 0 auto; padding: 72px 24px 96px;
      background: radial-gradient(circle at 30% 50%, rgba(16, 68, 56, 0.38), transparent 70%);
      display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center;
    }
    @media (min-width: 980px) {
      .${p}-discover-sec { grid-template-columns: 0.95fr 1.05fr; }
    }
    .${p}-vid-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .${p}-vid-thumb {
      height: 135px; border: 1px solid rgba(56,232,255,0.28);
      background: linear-gradient(135deg, #0f2930, #061317);
      display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;
    }
    .${p}-play-circle {
      width: 44px; height: 44px; border-radius: 50%; border: 2px solid #fff;
      display: inline-flex; align-items: center; justify-content: center; font-size: 14px;
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(3,7,8,0.9); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <main>
    <section class="${p}-hero">
      <header class="${p}-nav">
        <strong style="font-size:15px;letter-spacing:0.22em;">⛰️ FLASH</strong>
        <nav style="display:flex;gap:26px;" aria-label="Main Navigation">
          <a href="#popularTours" style="color:#fff;text-decoration:none;font-size:11px;letter-spacing:0.14em;">MAIN</a>
          <a href="#popularTours" style="color:var(--muted);text-decoration:none;font-size:11px;letter-spacing:0.14em;">ABOUT US</a>
          <a href="#popularTours" style="color:var(--muted);text-decoration:none;font-size:11px;letter-spacing:0.14em;">TOURS</a>
          <a href="#discoverWorld" style="color:var(--muted);text-decoration:none;font-size:11px;letter-spacing:0.14em;">GALLERY</a>
          <a href="#discoverWorld" style="color:var(--muted);text-decoration:none;font-size:11px;letter-spacing:0.14em;">CONTACTS</a>
        </nav>
        <button type="button" id="exploreMagneticBtn" style="background:none;border:1px solid var(--cyan);color:var(--cyan);padding:7px 18px;font-size:11px;font-weight:700;cursor:pointer;">BOOK TREK</button>
      </header>

      <div class="${p}-hero-grid">
        <div>
          <h1 class="${p}-h1" id="rockyTitle">TIME TO TRAVEL</h1>
          <p style="font-size:14px;color:#cbd5e1;max-width:480px;line-height:1.7;" id="rockyDesc">
            The best time to visit Rocky Mountain National Park is from June to September when the snow is melted and alpine trails to Longs Peak (14,259 ft) and Emerald Glacier Lake are open.
          </p>
        </div>

        <div>
          <img src="assets/cutout.webp" alt="3D Rocky Mountain &amp; Turquoise Glacial Lake Diorama" class="${p}-diorama-img" />
        </div>

        <div class="${p}-slide-rail" role="tablist" aria-label="Expedition Peaks">
          <button type="button" onclick="setPeak(0, this)">01</button>
          <button type="button" onclick="setPeak(1, this)">02</button>
          <button type="button" class="active" onclick="setPeak(2, this)">03</button>
          <button type="button" onclick="setPeak(3, this)">04</button>
          <button type="button" onclick="setPeak(4, this)">05</button>
        </div>
      </div>

      <div class="${p}-bottom-3">
        <div class="${p}-info-col">
          <span class="${p}-info-icon">🗺️</span>
          <div>
            <p style="font-size:12px;color:var(--muted);line-height:1.55;">The Crown Jewel of Rocky Mountain NP, Longs Peak is one of the most coveted 14er summits in the West.</p>
            <a href="#popularTours" class="${p}-more-link">MORE DETAILED ➔</a>
          </div>
        </div>
        <div class="${p}-info-col">
          <span class="${p}-info-icon">🧭</span>
          <div>
            <p style="font-size:12px;color:var(--muted);line-height:1.55;">Our alpine route is tailored for hikers seeking turquoise glacial tarns and continental divide vistas.</p>
            <a href="#popularTours" class="${p}-more-link">MORE DETAILED ➔</a>
          </div>
        </div>
        <div class="${p}-info-col">
          <span class="${p}-info-icon">🏕️</span>
          <div>
            <p style="font-size:12px;color:var(--muted);line-height:1.55;">Historic high-altitude trails cross subalpine fir forests, waterfalls, and backcountry basecamps.</p>
            <a href="#popularTours" class="${p}-more-link">MORE DETAILED ➔</a>
          </div>
        </div>
      </div>
    </section>

    <section id="popularTours" class="${p}-tours-sec">
      <span style="font-size:13px;font-weight:700;color:var(--cyan);letter-spacing:0.18em;">POPULAR TOURS</span>
      <p style="font-size:13px;color:var(--muted);margin-top:6px;">Select a guided backcountry route across the Continental Divide</p>

      <div class="${p}-tours-grid">
        <article class="${p}-tour-card" style="background:linear-gradient(180deg,rgba(16,42,38,0.3),#061412);">
          <strong style="font-size:16px;letter-spacing:0.1em;">TOUR 1</strong>
          <span style="font-size:12px;color:var(--muted);margin-top:4px;">Pine Forest &amp; Bear Lake Loop</span>
        </article>
        <article class="${p}-tour-card featured" style="background:linear-gradient(180deg,rgba(22,78,99,0.45),#071e26);">
          <span style="position:absolute;top:14px;right:14px;font-size:10px;background:var(--cyan);color:#030708;padding:3px 8px;font-weight:800;">FEATURED</span>
          <strong style="font-size:18px;letter-spacing:0.1em;">TOUR 2</strong>
          <span style="font-size:12px;color:#e2e8f0;margin-top:4px;">Emerald Glacial Tarn &amp; Longs Peak</span>
        </article>
        <article class="${p}-tour-card" style="background:linear-gradient(180deg,rgba(30,41,59,0.35),#090d16);">
          <strong style="font-size:16px;letter-spacing:0.1em;">TOUR 3</strong>
          <span style="font-size:12px;color:var(--muted);margin-top:4px;">Continental Divide Ridge Summit</span>
        </article>
        <article class="${p}-tour-card" style="background:linear-gradient(180deg,rgba(6,78,59,0.35),#04130f);">
          <strong style="font-size:16px;letter-spacing:0.1em;">TOUR 4</strong>
          <span style="font-size:12px;color:var(--muted);margin-top:4px;">Alberta Falls &amp; Loch Vale Gorge</span>
        </article>
      </div>
    </section>

    <section id="discoverWorld" class="${p}-discover-sec">
      <div>
        <h2 style="font-size:clamp(30px,4.5vw,52px);color:var(--cyan);letter-spacing:0.06em;line-height:1.12;margin-bottom:24px;">
          DISCOVER THE<br>WORLD IN A<br>NEW WAY
        </h2>
        <button type="button" onclick="document.getElementById('rockyModal').classList.add('is-open')" style="background:none;border:none;color:#fff;display:inline-flex;align-items:center;gap:14px;cursor:pointer;margin-bottom:24px;">
          <span class="${p}-play-circle">▶</span>
          <span style="font-size:12px;font-weight:700;letter-spacing:0.16em;">WATCH THE VIDEO</span>
        </button>
        <blockquote style="font-size:13px;color:var(--muted);line-height:1.7;border-left:2px solid var(--cyan);padding-left:16px;">
          "Have you ever heard an avalanche roar in the mountains? Just after the avalanche roars, and there is absolute silence. You stop understanding where you are — that's 100% pure wilderness."
          <footer style="margin-top:8px;color:#fff;font-weight:600;">— Haruki Murakami</footer>
        </blockquote>
      </div>

      <div class="${p}-vid-grid">
        <div class="${p}-vid-thumb" onclick="document.getElementById('rockyModal').classList.add('is-open')"><span class="${p}-play-circle">▶</span></div>
        <div class="${p}-vid-thumb" onclick="document.getElementById('rockyModal').classList.add('is-open')"><span class="${p}-play-circle">▶</span></div>
        <div class="${p}-vid-thumb" onclick="document.getElementById('rockyModal').classList.add('is-open')"><span class="${p}-play-circle">▶</span></div>
        <div class="${p}-vid-thumb" onclick="document.getElementById('rockyModal').classList.add('is-open')"><span class="${p}-play-circle">▶</span></div>
      </div>
    </section>
  </main>

  <div id="rockyModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="rockyModalTitle">
    <div style="max-width:480px;width:100%;background:#0a1417;border:1px solid var(--cyan);padding:32px;">
      <h2 id="rockyModalTitle" style="font-size:22px;color:var(--cyan);margin-bottom:10px;">Rocky Mountain 4K Expedition Reel</h2>
      <p style="font-size:13px;color:var(--muted);margin-bottom:20px;line-height:1.6;">Reserve your spot on the June–September Longs Peak &amp; Dream Lake backcountry expedition.</p>
      <button type="button" style="width:100%;padding:12px;background:var(--cyan);color:#030708;font-weight:800;border:none;cursor:pointer;" onclick="document.getElementById('rockyModal').classList.remove('is-open')">Reserve Alpine Permit</button>
    </div>
  </div>

  <script>
    var peaks = [
      { t: '01 // DREAM LAKE DAWN', d: 'Sub-alpine glacial basin reflecting Hallett Peak at 9,905 ft elevation.' },
      { t: '02 // EMERALD TARN TRAIL', d: 'Crystal-clear snowmelt waters framed by sheer granite cirques.' },
      { t: 'TIME TO TRAVEL', d: 'The best time to visit Rocky Mountain National Park is from June to September when the snow is melted and alpine trails to Longs Peak are open.' },
      { t: '04 // LONGS PEAK KEYHOLE', d: '14,259 ft summit scramble above the clouds on the Continental Divide.' },
      { t: '05 // LOCH VALE WATERFALLS', d: 'Old-growth spruce canyon leading to Timberline Falls and Sky Pond.' }
    ];
    function setPeak(idx, btn) {
      document.querySelectorAll('.${p}-slide-rail button').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('rockyTitle').textContent = peaks[idx].t;
      document.getElementById('rockyDesc').textContent = peaks[idx].d;
    }
    document.getElementById('exploreMagneticBtn').addEventListener('click', function(){
      document.getElementById('rockyModal').classList.add('is-open');
    });
  </script>
</body>
</html>`;
  }

  // 14. STEARY SPATIAL CINEMA (Apple VisionOS Glassmorphic Streaming UI: Top "steary.com" Safari Bar + Left Vertical Glass Dock + "New Trailer / Continue Watching" Sidebar + "Spider-Verse" 3D Portal Hero + 4-Card "You might like" Row)
  // Motion Recipe: Spatial Window 3D Perspective Tilt + Category Tab Switcher + Interactive Trailer Player
  if (data.slug === 'steary-spatial-cinema') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>steary.com — VisionOS Spatial Cinema &amp; Multiverse Streaming</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --glass-win: rgba(38, 40, 46, 0.62);
      --glass-card: rgba(255, 255, 255, 0.10);
      --glass-border: rgba(255, 255, 255, 0.24);
      --fg: #ffffff;
      --muted: rgba(255, 255, 255, 0.68);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      min-height: 100vh;
      background:
        radial-gradient(circle at 18% 20%, rgba(214, 199, 182, 0.55) 0%, transparent 45%),
        radial-gradient(circle at 82% 75%, rgba(148, 163, 184, 0.45) 0%, transparent 50%),
        linear-gradient(135deg, #7d7973 0%, #52525b 48%, #27272a 100%);
      color: var(--fg); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip;
    }

    .${p}-stage {
      max-width: 1380px; margin: 0 auto; padding: 18px 20px 64px;
      display: flex; flex-direction: column; align-items: center; gap: 16px;
    }
    /* Floating VisionOS Safari Address Bar */
    .${p}-safari-bar {
      width: min(760px, 94vw); padding: 10px 18px; border-radius: 999px;
      background: rgba(50, 52, 58, 0.65); backdrop-filter: blur(28px) saturate(180%);
      border: 1px solid var(--glass-border);
      display: flex; align-items: center; justify-content: space-between; font-size: 12px;
      box-shadow: 0 18px 40px rgba(0,0,0,0.28);
    }
    .${p}-url-pill {
      flex: 1; max-width: 420px; margin: 0 14px; padding: 6px 16px; border-radius: 999px;
      background: rgba(0,0,0,0.28); text-align: center; color: #f4f4f5; font-weight: 600;
    }

    .${p}-workspace {
      width: 100%; display: grid; grid-template-columns: 1fr; gap: 18px; align-items: center;
    }
    @media (min-width: 1040px) {
      .${p}-workspace { grid-template-columns: 54px 1fr; }
    }
    /* Left Vertical Spatial Dock */
    .${p}-dock {
      display: flex; flex-direction: row; justify-content: center; gap: 12px;
      padding: 12px 10px; border-radius: 999px;
      background: rgba(50, 52, 58, 0.62); backdrop-filter: blur(28px);
      border: 1px solid var(--glass-border);
    }
    @media (min-width: 1040px) {
      .${p}-dock { flex-direction: column; }
    }
    .${p}-dock button {
      width: 34px; height: 34px; border-radius: 50%; border: none;
      background: transparent; color: #fff; cursor: pointer; font-size: 14px;
    }
    .${p}-dock button.active { background: rgba(255,255,255,0.22); }

    /* Main Spatial Glass Window */
    .${p}-window {
      border-radius: 38px; padding: clamp(18px, 2.5vw, 30px);
      background: var(--glass-win); backdrop-filter: blur(36px) saturate(180%);
      border: 1.5px solid var(--glass-border);
      box-shadow: 0 40px 90px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.35);
    }
    .${p}-win-top {
      display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 22px;
    }
    .${p}-search {
      padding: 10px 18px; border-radius: 999px; background: rgba(255,255,255,0.10);
      border: 1px solid rgba(255,255,255,0.16); color: #fff; font-size: 13px; min-width: 230px;
    }
    .${p}-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
    .${p}-tab {
      padding: 9px 18px; border-radius: 999px; border: none; background: transparent;
      color: var(--muted); font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .${p}-tab.active { background: rgba(255,255,255,0.22); color: #fff; }

    .${p}-win-grid {
      display: grid; grid-template-columns: 1fr; gap: 20px;
    }
    @media (min-width: 960px) {
      .${p}-win-grid { grid-template-columns: 270px 1fr; }
    }
    .${p}-side-box {
      border-radius: 26px; padding: 18px; background: var(--glass-card);
      border: 1px solid rgba(255,255,255,0.14);
    }
    .${p}-trailer-card {
      border-radius: 18px; padding: 14px; margin-top: 12px;
      background: linear-gradient(135deg, rgba(30,41,59,0.85), rgba(15,23,42,0.9));
      border: 1px solid rgba(255,255,255,0.16); display: flex; justify-content: space-between; align-items: flex-end;
      min-height: 92px; cursor: pointer;
    }
    /* Main Featured Movie Banner with 3D Portal Cutout */
    .${p}-hero-banner {
      position: relative; border-radius: 28px; padding: clamp(22px, 3.5vw, 38px);
      background: radial-gradient(circle at 75% 40%, #4c1d95 0%, #1e1b4b 48%, #09090b 100%);
      border: 1px solid rgba(255,255,255,0.22); overflow: hidden;
      display: grid; grid-template-columns: 1fr; gap: 20px; align-items: center; min-height: 330px;
    }
    @media (min-width: 760px) {
      .${p}-hero-banner { grid-template-columns: 1.15fr 0.85fr; }
    }
    .${p}-portal-img {
      width: 100%; max-width: 310px; height: auto; object-fit: contain; margin: 0 auto; display: block;
      filter: drop-shadow(0 20px 36px rgba(0,0,0,0.75));
    }
    .${p}-like-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(175px, 1fr)); gap: 14px; margin-top: 14px;
    }
    .${p}-movie-card {
      border-radius: 22px; padding: 18px; min-height: 175px;
      border: 1px solid rgba(255,255,255,0.18);
      display: flex; flex-direction: column; justify-content: flex-end; position: relative; cursor: pointer;
      transition: transform 0.25s;
    }
    .${p}-movie-card:hover { transform: translateY(-5px); }
    .${p}-play-fab {
      position: absolute; bottom: 14px; right: 14px; width: 34px; height: 34px; border-radius: 50%;
      background: #ffffff; color: #09090b; border: none; font-weight: 800; cursor: pointer;
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(9,9,11,0.85); backdrop-filter: blur(22px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body>
  <div class="${p}-stage">
    <!-- Top Floating Safari Bar -->
    <header class="${p}-safari-bar">
      <div style="display:flex;gap:10px;color:var(--muted);"><span>◧</span><span>‹</span><span>›</span></div>
      <div class="${p}-url-pill">🔒 steary.com</div>
      <div style="display:flex;gap:12px;color:var(--muted);"><span>⊕</span><span>↑</span><span>＋</span></div>
    </header>

    <div class="${p}-workspace">
      <!-- Left Floating Glass Dock -->
      <aside class="${p}-dock" aria-label="Spatial App Dock">
        <button type="button" class="active" aria-label="Home">🏠</button>
        <button type="button" aria-label="Favorites">♡</button>
        <button type="button" aria-label="Downloads">⬇</button>
        <button type="button" aria-label="Profile">👤</button>
        <button type="button" aria-label="Settings">⚙</button>
      </aside>

      <!-- Main VisionOS Frosted Glass Window -->
      <main class="${p}-window">
        <div class="${p}-win-top">
          <div class="${p}-search">🔍 Search movies, series, multiverse...</div>
          <div class="${p}-tabs" role="tablist">
            <button type="button" class="${p}-tab active" onclick="switchCat('Movies', this)">Movies</button>
            <button type="button" class="${p}-tab" onclick="switchCat('TV Series', this)">TV Series</button>
            <button type="button" class="${p}-tab" onclick="switchCat('Animation', this)">Animation</button>
            <button type="button" class="${p}-tab" onclick="switchCat('Mystery', this)">Mystery</button>
            <button type="button" class="${p}-tab" onclick="switchCat('More', this)">More</button>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:6px 14px;border-radius:999px;background:rgba(255,255,255,0.12);">
            <span style="width:28px;height:28px;border-radius:50%;background:#6366f1;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;">AM</span>
            <div style="font-size:12px;"><strong>Arfi Maulana</strong><span style="display:block;font-size:10px;color:var(--muted);">@arfimaulana</span></div>
          </div>
        </div>

        <div class="${p}-win-grid">
          <!-- Left Sidebar: New Trailer + Continue Watching -->
          <div style="display:flex;flex-direction:column;gap:16px;">
            <section class="${p}-side-box">
              <div style="display:flex;justify-content:space-between;font-size:13px;">
                <strong>🔥 New Trailer</strong><span style="color:var(--muted);font-size:11px;">Sort by: Today</span>
              </div>
              <div class="${p}-trailer-card" onclick="openStream('The Last Kingdom: Seven Kings Must Die')">
                <div><strong style="font-size:12px;display:block;">The Last Kingdom: Seven Kings Must Die</strong></div>
                <span style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);display:inline-flex;align-items:center;justify-content:center;font-size:11px;">▶</span>
              </div>
              <div class="${p}-trailer-card" style="background:linear-gradient(135deg,#7c2d12,#3b0764);" onclick="openStream('The Super Mario Bros. Movie')">
                <div><strong style="font-size:12px;display:block;">The Super Mario Bros. Movie</strong></div>
                <span style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);display:inline-flex;align-items:center;justify-content:center;font-size:11px;">▶</span>
              </div>
            </section>

            <section class="${p}-side-box">
              <strong style="font-size:13px;display:block;margin-bottom:10px;">Continue Watching</strong>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:12px;">
                <div><strong>Dark Season 3</strong><span style="display:block;font-size:10px;color:var(--muted);">Episode 3</span></div><span>▶</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:12px;">
                <div><strong>Transformers: Rise of the Beasts</strong><span style="display:block;font-size:10px;color:var(--muted);">32m remaining</span></div><span>▶</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;font-size:12px;">
                <div><strong>Lupin Season 2</strong><span style="display:block;font-size:10px;color:var(--muted);">Episode 5</span></div><span>▶</span>
              </div>
            </section>
          </div>

          <!-- Right Main Column: Featured Hero + You might like -->
          <div>
            <section class="${p}-hero-banner">
              <div>
                <span style="display:inline-block;padding:5px 12px;border-radius:999px;background:rgba(0,0,0,0.45);font-size:11px;font-weight:700;margin-bottom:14px;">🔥 Now Trending</span>
                <div style="display:flex;gap:8px;margin-bottom:10px;">
                  <span style="padding:4px 10px;border-radius:999px;background:rgba(255,255,255,0.14);font-size:11px;">Animation</span>
                  <span style="padding:4px 10px;border-radius:999px;background:rgba(255,255,255,0.14);font-size:11px;">Adventure</span>
                </div>
                <h1 id="featuredMovieTitle" style="font-size:clamp(26px,3.4vw,38px);font-weight:800;line-height:1.12;margin-bottom:10px;">
                  Spider-Man:<br>Across the Spider-Verse
                </h1>
                <p style="font-size:13px;color:var(--muted);line-height:1.6;max-width:440px;margin-bottom:20px;">
                  Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.
                </p>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                  <button type="button" id="exploreMagneticBtn" onclick="openStream('Spider-Man: Across the Spider-Verse (Spatial 3D IMAX)')" style="padding:10px 22px;border-radius:999px;background:#ffffff;color:#09090b;border:none;font-weight:700;font-size:13px;cursor:pointer;">▶ Watch</button>
                  <button type="button" onclick="openStream('Offline Spatial Download — 4K Dolby Vision')" style="padding:10px 20px;border-radius:999px;background:rgba(255,255,255,0.12);color:#fff;border:1px solid rgba(255,255,255,0.28);font-weight:600;font-size:13px;cursor:pointer;">⬇ Download</button>
                </div>
              </div>
              <div>
                <img src="assets/cutout.webp" alt="3D Spatial Multiverse Portal Cutout" class="${p}-portal-img" />
              </div>
            </section>

            <section style="margin-top:20px;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <strong style="font-size:16px;">You might like</strong>
                <span style="padding:4px 12px;border-radius:999px;background:rgba(255,255,255,0.14);font-size:11px;">See all</span>
              </div>
              <div class="${p}-like-grid">
                <article class="${p}-movie-card" style="background:linear-gradient(160deg,#7c2d12,#1c1917);" onclick="openStream('The Flash (2023)')">
                  <span style="font-size:10px;padding:3px 8px;border-radius:999px;background:rgba(255,255,255,0.16);width:max-content;margin-bottom:6px;">Fantasy</span>
                  <strong style="font-size:14px;">The Flash (2023)</strong>
                  <p style="font-size:11px;color:var(--muted);margin-top:4px;padding-right:34px;">Worlds collide when Barry uses his superpowers to travel back in time.</p>
                  <button type="button" class="${p}-play-fab" aria-label="Play The Flash">▶</button>
                </article>
                <article class="${p}-movie-card" style="background:linear-gradient(160deg,#1e3a8a,#0f172a);" onclick="openStream('Manifest — Final Season')">
                  <span style="font-size:10px;padding:3px 8px;border-radius:999px;background:rgba(255,255,255,0.16);width:max-content;margin-bottom:6px;">Mystery</span>
                  <strong style="font-size:14px;">Manifest</strong>
                  <p style="font-size:11px;color:var(--muted);margin-top:4px;padding-right:34px;">Flight 828 passengers return after five years to face their callings.</p>
                  <button type="button" class="${p}-play-fab" aria-label="Play Manifest">▶</button>
                </article>
                <article class="${p}-movie-card" style="background:linear-gradient(160deg,#701a75,#1e1b4b);" onclick="openStream('Elemental (Disney•Pixar)')">
                  <span style="font-size:10px;padding:3px 8px;border-radius:999px;background:rgba(255,255,255,0.16);width:max-content;margin-bottom:6px;">Animation</span>
                  <strong style="font-size:14px;">Elemental</strong>
                  <p style="font-size:11px;color:var(--muted);margin-top:4px;padding-right:34px;">Fire and water residents discover how much they actually have in common.</p>
                  <button type="button" class="${p}-play-fab" aria-label="Play Elemental">▶</button>
                </article>
                <article class="${p}-movie-card" style="background:linear-gradient(160deg,#78350f,#09090b);" onclick="openStream('Interstellar (IMAX 70mm Spatial)')">
                  <span style="font-size:10px;padding:3px 8px;border-radius:999px;background:rgba(255,255,255,0.16);width:max-content;margin-bottom:6px;">Sci-Fi</span>
                  <strong style="font-size:14px;">Interstellar</strong>
                  <p style="font-size:11px;color:var(--muted);margin-top:4px;padding-right:34px;">Explorers travel through a wormhole near Saturn in search of a new home.</p>
                  <button type="button" class="${p}-play-fab" aria-label="Play Interstellar">▶</button>
                </article>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>

  <div id="stearyModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="stearyModalTitle">
    <div style="max-width:480px;width:100%;background:rgba(30,32,38,0.95);border:1px solid rgba(255,255,255,0.28);border-radius:28px;padding:32px;text-align:center;">
      <h2 id="stearyModalTitle" style="font-size:22px;margin-bottom:10px;">Spatial Cinema Stream</h2>
      <p style="font-size:13px;color:var(--muted);margin-bottom:20px;">Streaming in 4K 90Hz Stereoscopic VisionOS Environment with Spatial Audio.</p>
      <button type="button" style="padding:11px 28px;border-radius:999px;background:#fff;color:#09090b;font-weight:700;border:none;cursor:pointer;" onclick="document.getElementById('stearyModal').classList.remove('is-open')">Close Player</button>
    </div>
  </div>

  <script>
    function openStream(title) {
      document.getElementById('stearyModalTitle').textContent = title;
      document.getElementById('stearyModal').classList.add('is-open');
    }
    function switchCat(cat, btn) {
      document.querySelectorAll('.${p}-tab').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('featuredMovieTitle').innerHTML = cat + ' Spotlight:<br>Across the Spider-Verse';
    }
  </script>
</body>
</html>`;
  }

  // 15. SWATCH LUXURY CHRONOGRAPH (Dark Slate & Warm Cognac Dual-Circle Geometry + 3D Stitched Leather Smartwatch "12:38" Cutout + Left 01-04 Strikethrough Slide Rail + Vertical "SMART WATCH" & "WATCH" Stencil)
  // Motion Recipe: Interactive 01-04 Dial & Strap Edition Switcher + 3D Smartwatch Tilt + Cart Drawer Modal
  if (data.slug === 'swatch-luxury-chronograph') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>S'WATCH — Super Luxury Smart Watches | Chronograph Edition</title>
  <meta name="description" content="${bp.headlineSub}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --outer-tan: #b88a68;
      --slate: #161d1f;
      --slate-deep: #0f1416;
      --orange: #e05a2b;
      --peach: #e3b596;
      --fg: #ffffff;
      --muted: #9ca3af;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: linear-gradient(135deg, #c89b7b 0%, #9c6f4f 50%, #7c5338 100%);
      color: var(--fg); font-family: 'Poppins', sans-serif; overflow-x: clip; scroll-behavior: smooth;
    }

    .${p}-frame {
      max-width: 1360px; margin: 28px auto; border-radius: 16px;
      background:
        radial-gradient(circle at 36% 50%, #c89672 0%, #a37251 22%, transparent 22.2%),
        radial-gradient(circle at -8% 50%, #171f22 0%, #11181a 40%, transparent 40.2%),
        radial-gradient(circle at 82% 50%, #1b2427 0%, #12181a 56%, transparent 56.2%),
        #b08261;
      box-shadow: 0 36px 80px rgba(0, 0, 0, 0.55);
      padding: 28px clamp(20px, 4vw, 52px) 36px; position: relative; overflow: hidden; min-height: 84vh;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .${p}-nav {
      display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 10;
    }
    .${p}-stage {
      display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center;
      position: relative; z-index: 8; margin: 24px 0;
    }
    @media (min-width: 980px) {
      .${p}-stage { grid-template-columns: 110px 1fr 1.15fr 70px; }
    }

    /* Left 01-04 Strikethrough Number Rail */
    .${p}-num-rail { display: flex; flex-direction: column; gap: 6px; }
    .${p}-num-btn {
      background: none; border: none; color: rgba(255,255,255,0.42); font-family: inherit;
      font-size: 24px; font-weight: 700; text-align: left; cursor: pointer; position: relative; width: max-content;
      transition: font-size 0.25s, color 0.25s;
    }
    .${p}-num-btn.active {
      font-size: 64px; color: #ffffff; line-height: 1; margin-bottom: 6px;
    }
    .${p}-num-btn.active::after {
      content: ''; position: absolute; left: -10px; right: -10px; top: 52%;
      height: 5px; background: var(--orange);
    }

    /* Center Dual-Halo & 3D Watch Cutout */
    .${p}-watch-center {
      position: relative; display: flex; align-items: center; justify-content: center; min-height: 440px;
    }
    .${p}-peach-halo {
      position: absolute; width: 320px; height: 320px; border-radius: 50%;
      background: var(--peach); display: flex; align-items: center; justify-content: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.35);
    }
    .${p}-orange-core {
      width: 236px; height: 236px; border-radius: 50%; background: var(--orange);
    }
    .${p}-watch-img {
      position: relative; z-index: 5; height: 450px; width: auto; object-fit: contain;
      filter: drop-shadow(0 28px 40px rgba(0,0,0,0.75)); transition: transform 0.3s ease;
    }

    /* Right Copy Block with Vertical SMART WATCH & Orange Bar */
    .${p}-copy-wrap {
      display: flex; align-items: stretch; gap: 24px;
    }
    .${p}-vert-label {
      display: flex; flex-direction: column; align-items: center; gap: 14px;
    }
    .${p}-vert-label span {
      writing-mode: vertical-rl; transform: rotate(180deg);
      font-size: 13px; letter-spacing: 0.24em; color: #d1d5db;
    }
    .${p}-vert-bar { width: 4px; flex: 1; min-height: 90px; background: var(--orange); }

    .${p}-h1 {
      font-size: clamp(36px, 4.8vw, 62px); line-height: 1.12; font-weight: 300; margin-bottom: 18px;
    }
    .${p}-h1 strong { font-weight: 700; }
    .${p}-cart-btn {
      padding: 13px 28px; background: #e5e7eb; color: #111827; border: none;
      font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .${p}-cart-btn:hover { background: #ffffff; transform: translateY(-2px); }

    /* Far-Right Giant Vertical WATCH Stencil */
    .${p}-stencil {
      writing-mode: vertical-rl; transform: rotate(180deg);
      font-size: clamp(54px, 6.5vw, 88px); font-weight: 800; letter-spacing: 0.08em;
      color: rgba(255,255,255,0.14); user-select: none; text-align: center;
    }

    .${p}-specs-sec {
      max-width: 1360px; margin: 0 auto 56px; border-radius: 16px;
      background: #141b1d; padding: 42px clamp(20px, 4vw, 52px);
      display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;
    }
    .${p}-modal { position: fixed; inset: 0; z-index: 900; background: rgba(15,20,22,0.88); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; padding: 20px; }
    .${p}-modal.is-open { display: flex; }
  </style>
</head>
<body style="padding: 0 16px;">
  <div class="${p}-frame">
    <header class="${p}-nav">
      <div style="display:flex;align-items:center;gap:22px;">
        <span style="font-size:20px;">☰</span>
        <strong style="font-size:16px;letter-spacing:0.08em;">S'WATCH</strong>
      </div>
      <nav style="display:flex;gap:36px;" aria-label="Main Navigation">
        <a href="#watchSpecs" style="color:#fff;text-decoration:none;font-size:13px;font-weight:600;border-bottom:2px solid #fff;padding-bottom:4px;">MEN</a>
        <a href="#watchSpecs" style="color:#d1d5db;text-decoration:none;font-size:13px;font-weight:500;">WOMEN</a>
      </nav>
      <div style="display:flex;gap:20px;align-items:center;font-size:15px;">
        <span>🔍</span><span>👤</span>
        <button type="button" id="exploreMagneticBtn" style="background:none;border:none;color:#fff;cursor:pointer;font-size:16px;">🛒</button>
      </div>
    </header>

    <main class="${p}-stage">
      <!-- 01-04 Strikethrough Rail -->
      <div class="${p}-num-rail" role="tablist" aria-label="Chronograph Editions">
        <button type="button" class="${p}-num-btn active" onclick="selectWatch(0, this)">01</button>
        <button type="button" class="${p}-num-btn" onclick="selectWatch(1, this)">02</button>
        <button type="button" class="${p}-num-btn" onclick="selectWatch(2, this)">03</button>
        <button type="button" class="${p}-num-btn" onclick="selectWatch(3, this)">04</button>
      </div>

      <!-- Center Dual Halo + 3D Smartwatch Cutout -->
      <div class="${p}-watch-center">
        <div class="${p}-peach-halo"><div class="${p}-orange-core" id="watchCore"></div></div>
        <img src="assets/cutout.webp" alt="S'Watch 3D Luxury Chronograph Smartwatch" class="${p}-watch-img" id="watchCutout" />
      </div>

      <!-- Right Editorial Typography -->
      <div class="${p}-copy-wrap">
        <div class="${p}-vert-label">
          <span>SMART WATCH</span>
          <div class="${p}-vert-bar"></div>
        </div>
        <div>
          <h1 class="${p}-h1" id="watchHeadline">
            Super <strong>Luxury</strong><br>
            <strong>Super</strong> Watches
          </h1>
          <p style="font-size:15px;color:#cbd5e1;max-width:380px;line-height:1.7;margin-bottom:28px;" id="watchDesc">
            Hand-stitched Italian cognac saddle leather meets a grade-5 matte titanium bezel, sapphire AMOLED always-on telemetry dial, and 14-day chronograph battery reserve.
          </p>
          <button type="button" class="${p}-cart-btn" id="watchPriceBtn" onclick="document.getElementById('swatchModal').classList.add('is-open')">
            Add to Cart - $ 359
          </button>
        </div>
      </div>

      <!-- Right Vertical WATCH Stencil -->
      <div class="${p}-stencil" aria-hidden="true">WATCH</div>
    </main>

    <footer style="display:flex;justify-content:space-between;align-items:center;position:relative;z-index:10;font-size:14px;">
      <div style="display:flex;gap:18px;"><span>f</span><span>◎</span><span>𝕏</span></div>
      <span style="width:22px;height:34px;border:2px solid #fff;border-radius:99px;display:inline-flex;justify-content:center;padding-top:5px;"><span style="width:2px;height:6px;background:#fff;"></span></span>
    </footer>
  </div>

  <section id="watchSpecs" class="${p}-specs-sec">
    <div><strong style="color:var(--orange);font-size:22px;">SAPPHIRE OLED</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">1,000-nit always-on fitness rings &amp; chronograph complications.</p></div>
    <div><strong style="color:var(--orange);font-size:22px;">5 ATM TITANIUM</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">DLC matte-black titanium case with tactile crown encoder.</p></div>
    <div><strong style="color:var(--orange);font-size:22px;">ITALIAN CALFSKIN</strong><p style="font-size:13px;color:var(--muted);margin-top:6px;">Quick-release cognac leather strap with deployant clasp.</p></div>
  </section>

  <div id="swatchModal" class="${p}-modal" role="dialog" aria-modal="true" aria-labelledby="swatchModalTitle">
    <div style="max-width:440px;width:100%;background:#161d1f;border:1px solid var(--orange);padding:32px;text-align:center;">
      <h2 id="swatchModalTitle" style="font-size:24px;margin-bottom:8px;">S'WATCH Chronograph — $359</h2>
      <p style="font-size:13px;color:var(--muted);margin-bottom:20px;">Includes complimentary express insured shipping and 5-year international movement warranty.</p>
      <button type="button" style="width:100%;padding:12px;background:var(--orange);color:#fff;font-weight:700;border:none;cursor:pointer;" onclick="document.getElementById('swatchModal').classList.remove('is-open')">Proceed to Express Checkout</button>
    </div>
  </div>

  <script>
    var editions = [
      { h: 'Super <strong>Luxury</strong><br><strong>Super</strong> Watches', p: 'Add to Cart - $ 359', c: '#e05a2b' },
      { h: 'Obsidian <strong>Titanium</strong><br><strong>Chrono</strong> Pro', p: 'Add to Cart - $ 429', c: '#0ea5e9' },
      { h: 'Cognac <strong>Heritage</strong><br><strong>Tourbillon</strong> OS', p: 'Add to Cart - $ 489', c: '#10b981' },
      { h: 'Carbon <strong>Stealth</strong><br><strong>Sapphire</strong> Edition', p: 'Add to Cart - $ 549', c: '#f59e0b' }
    ];
    function selectWatch(idx, btn) {
      document.querySelectorAll('.${p}-num-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('watchHeadline').innerHTML = editions[idx].h;
      document.getElementById('watchPriceBtn').textContent = editions[idx].p;
      document.getElementById('watchCore').style.background = editions[idx].c;
    }
    document.getElementById('exploreMagneticBtn').addEventListener('click', function(){
      document.getElementById('swatchModal').classList.add('is-open');
    });
  </script>
</body>
</html>`;
  }



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
  const accessTier = typeof options === 'string' ? options : (options.tier || data.assignedTier || data.tier || 'premium');
  const webCat = detectWebCategory(data);
  const bp = getBlueprintForData(data);
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
  } else if (!realTpl.includes(`slug: '${slug}'`)) {
    realTpl = realTpl.replace(
      'export const REAL_TEMPLATES: Record<string, RealTemplate> = {',
      `export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n${entryBlock}`
    );
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
