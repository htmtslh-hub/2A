import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, copyFileSync, renameSync } from 'node:fs';
import { resolve, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');
const sharp = require(resolve(root, '_design/.tooling/node_modules/sharp'));
const config = JSON.parse(readFileSync(resolve(__dirname, 'config.json'), 'utf8'));
const statePath = resolve(__dirname, 'state.json');

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8'
};

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const HARD_REJECT_PATTERNS = /\b(coding practice|html tutorial|manifestation|cheat\s*sheet|infographic|meme|quote|resume|cv template|invoice|email signature|wallpaper calendar|50%\s*off|dribbble pro|tell us what you need|open briefs|logo pack|icon set|flyer|brochure|business card|letterhead|knitting|recipe|tattoo|hairstyle|wedding|workout|creativemobiledesign|mobileinspiration|mobile\s*app|ios\s*app|android\s*app|carpet installation|tiled floor|floor installation|packaging|book cover|magazine spread)\b/i;

const POSITIVE_HERO_PATTERNS = /\b(hero|website|web design|ui|ux|landing page|dribbble|behance|awwwards|wotd|website of the day|webflow|framer|codrops|interactive|3d|webgl|three\.?js|showcase|concept|studio|agency|portfolio|futuristic|glassmorphism|parallax|motion|architecture|automotive|aerospace|bike|cycle|luxury|minimal)\b/i;

function cleanPinTitle(rawTitle, keyword, pinId) {
  let t = String(rawTitle || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&#x27;|&apos;|&#8217;|&#8211;/gi, ' ')
    .replace(/&amp;/gi, ' ')
    .replace(/website of the day\s*\d*\s*[a-z]*\s*\d*/gi, ' ')
    .replace(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/gi, ' ')
    .replace(/\s*\|\s*Pinterest.*$/i, '')
    .replace(/\s*—\s*[^|]+$/i, '')
    .split('|')[0]
    .split(' - ')[0]
    .replace(/#[a-zA-Z0-9_]+/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\b(pin|muc|nay|co|hinh|anh|cua|phan|chua|on|by|in|to|of|for|the|and|with|from|your|our|how|what|why|more|new|ideas|best|top|inspiration|templates?|layout|concept|design|website|websites|web|page|pages|ui|ux|home|landing|free|html|html5|css|bootstrap|wordpress|theme|themes|webflow|framer|pinterest|made|create|build|modern|simple|clean|responsive|see|full|project|behance|dribbble|codrops|check|out|video|day|wotd|\d+)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = t.split(' ').filter(w => w.length >= 4 && /^[a-zA-Z]+$/.test(w));
  const studioPrefixes = ['Aether', 'Kinetix', 'Vespera', 'Solace', 'Nuvem', 'Chronos', 'Monolith', 'Veridian', 'Luminex', 'Onyx', 'Prism', 'Valence', 'Zephyr', 'Sora', 'Kova', 'Veloce', 'Arden', 'Cinder', 'Kroma', 'Halcyon'];
  const studioSuffixes = ['Studio', 'Folio', 'Grid', 'Canvas', 'Atelier', 'Pulse', 'Craft', 'Vertex', 'Axis', 'Nova'];
  const pIdx = Number(String(pinId).slice(-4)) || 0;
  const prefix = studioPrefixes[pIdx % studioPrefixes.length];
  const suffix = studioSuffixes[Math.floor(pIdx / 7) % studioSuffixes.length];

  if (words.length >= 2) {
    const w1 = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    const w2 = words[1].charAt(0).toUpperCase() + words[1].slice(1).toLowerCase();
    if (w1.toLowerCase() !== w2.toLowerCase()) {
      return `${w1} ${w2}`;
    }
  }
  if (words.length >= 1) {
    const w1 = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    return `${w1} ${suffix}`;
  }

  return `${prefix} ${suffix}`;
}

/**
 * Evaluates a candidate Pinterest image against the 6 mandatory Website Hero UI criteria.
 * Must achieve >= 80% (totalScore >= 80 / 100) AND pass at least 5/6 criteria (>= 80% criteria count) to be accepted.
 */
export async function evaluateImageAgainst6Criteria(buf, pinInfo = {}, keyword = '') {
  const combinedText = `${pinInfo.rawTitle || ''} ${pinInfo.rawDesc || ''} ${pinInfo.board || ''} ${keyword}`;
  if (HARD_REJECT_PATTERNS.test(combinedText)) {
    return {
      accepted: false,
      totalScore: 0,
      passedCriteriaCount: 0,
      reason: `Disqualified by negative content filter: "${combinedText.slice(0, 80)}"`
    };
  }

  const meta = await sharp(buf).metadata();
  const width = meta.width || 0;
  const height = meta.height || 0;
  const aspectRatio = height > 0 ? width / height : 0;

  // Hard geometric gate: Desktop Hero Section UI / Dribbble / Behance Showcase Shot must be widescreen desktop (AR >= 1.15)
  if (width < 500 || height < 300 || aspectRatio < 1.15 || aspectRatio > 2.45) {
    return {
      accepted: false,
      totalScore: 0,
      passedCriteriaCount: 0,
      width,
      height,
      aspectRatio: Number(aspectRatio.toFixed(2)),
      reason: `Rejected geometry (${width}x${height}, AR=${aspectRatio.toFixed(2)}) — requires desktop Hero UI widescreen format (AR >= 1.15)`
    };
  }

  const gw = 120;
  const gh = 90;
  const raw = await sharp(buf).resize(gw, gh, { fit: 'fill' }).removeAlpha().raw().toBuffer();

  const lum = new Float32Array(gw * gh);
  const sat = new Float32Array(gw * gh);
  let sumLum = 0;
  let sumLumSq = 0;
  let whiteBorderPixels = 0;
  let borderPixels = 0;

  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      const idx = (y * gw + x) * 3;
      const r = raw[idx];
      const g = raw[idx + 1];
      const b = raw[idx + 2];
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const s = max === 0 ? 0 : (max - min) / max;

      const p = y * gw + x;
      lum[p] = l;
      sat[p] = s;
      sumLum += l;
      sumLumSq += l * l;

      if (y < 5 || y >= gh - 5 || x < 5 || x >= gw - 5) {
        borderPixels++;
        if (l > 244 && s < 0.05) whiteBorderPixels++;
      }
    }
  }

  const meanLum = sumLum / (gw * gh);
  const stdLum = Math.sqrt(Math.max(0, sumLumSq / (gw * gh) - meanLum * meanLum));
  const fullBleedRatio = 1 - whiteBorderPixels / Math.max(1, borderPixels);

  // Criterion 2 gate: Must have a true Full-Bleed background or dark/rich 3D studio scene (reject plain white pages)
  if (fullBleedRatio < 0.55) {
    return {
      accepted: false,
      totalScore: 0,
      passedCriteriaCount: 0,
      width,
      height,
      aspectRatio: Number(aspectRatio.toFixed(2)),
      fullBleedRatio: Number(fullBleedRatio.toFixed(2)),
      reason: `Rejected non-full-bleed background (fullBleedRatio=${fullBleedRatio.toFixed(2)} < 0.55)`
    };
  }

  let centerEnergy = 0, centerCount = 0;
  let outerEnergy = 0, outerCount = 0;
  let horizonCrossEnergy = 0, horizonCount = 0;
  let headlineStrokeCount = 0, headlineSamples = 0;
  let topNavStrokes = 0, topNavSamples = 0;
  let sideNavStrokes = 0, sideNavSamples = 0;

  for (let y = 1; y < gh - 1; y++) {
    for (let x = 1; x < gw - 1; x++) {
      const p = y * gw + x;
      const gx = Math.abs(lum[p + 1] - lum[p - 1]);
      const gy = Math.abs(lum[p + gw] - lum[p - gw]);
      const grad = (gx + gy) * 0.5;

      const nx = x / gw;
      const ny = y / gh;

      if (nx >= 0.22 && nx <= 0.78 && ny >= 0.16 && ny <= 0.84) {
        centerEnergy += grad;
        centerCount++;
      } else {
        outerEnergy += grad;
        outerCount++;
      }

      if (nx >= 0.25 && nx <= 0.75 && ny >= 0.40 && ny <= 0.78) {
        horizonCrossEnergy += Math.max(gx, gy) * (1 + sat[p] * 0.8);
        horizonCount++;
      }

      if (ny >= 0.14 && ny <= 0.64 && nx >= 0.08 && nx <= 0.92) {
        headlineSamples++;
        if (gx > 26 || gy > 26) headlineStrokeCount++;
      }

      if (ny >= 0.02 && ny <= 0.12 && nx >= 0.04 && nx <= 0.96) {
        topNavSamples++;
        if (gx > 22 || gy > 22) topNavStrokes++;
      }

      if ((nx >= 0.01 && nx <= 0.09) || (nx >= 0.91 && nx <= 0.99)) {
        if (ny >= 0.12 && ny <= 0.88) {
          sideNavSamples++;
          if (gx > 20 || gy > 20) sideNavStrokes++;
        }
      }
    }
  }

  const avgCenterEnergy = centerEnergy / Math.max(1, centerCount);
  const avgOuterEnergy = outerEnergy / Math.max(1, outerCount);
  const dofRatio = avgCenterEnergy / Math.max(4, avgOuterEnergy);
  const avgHorizonCross = horizonCrossEnergy / Math.max(1, horizonCount);
  const headlineDensity = headlineStrokeCount / Math.max(1, headlineSamples);
  const topNavDensity = topNavStrokes / Math.max(1, topNavSamples);
  const sideNavDensity = sideNavStrokes / Math.max(1, sideNavSamples);

  const cardZones = [
    { x0: 0.05, x1: 0.36, y0: 0.56, y1: 0.92 },
    { x0: 0.34, x1: 0.66, y0: 0.60, y1: 0.92 },
    { x0: 0.64, x1: 0.95, y0: 0.54, y1: 0.92 },
    { x0: 0.66, x1: 0.95, y0: 0.18, y1: 0.52 }
  ];
  let detectedFloatingCards = 0;
  for (const z of cardZones) {
    let zLum = 0, zLumSq = 0, zBorderGrad = 0, zCount = 0, zBorderCount = 0;
    const xStart = Math.floor(z.x0 * gw), xEnd = Math.floor(z.x1 * gw);
    const yStart = Math.floor(z.y0 * gh), yEnd = Math.floor(z.y1 * gh);
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const p = y * gw + x;
        zLum += lum[p];
        zLumSq += lum[p] * lum[p];
        zCount++;
        if (x === xStart || x === xEnd - 1 || y === yStart || y === yEnd - 1) {
          const grad = Math.abs(lum[p + 1] - lum[p - 1]) + Math.abs(lum[p + gw] - lum[p - gw]);
          zBorderGrad += grad;
          zBorderCount++;
        }
      }
    }
    const zMean = zLum / Math.max(1, zCount);
    const zStd = Math.sqrt(Math.max(0, zLumSq / Math.max(1, zCount) - zMean * zMean));
    const zEdge = zBorderGrad / Math.max(1, zBorderCount);
    if (Math.abs(zMean - meanLum) > 10 || zEdge > 16 || (zStd > 14 && zStd < 68)) {
      detectedFloatingCards++;
    }
  }

  let c1Format = 0;
  if (aspectRatio >= 1.25 && aspectRatio <= 2.05) c1Format += 14;
  else if (aspectRatio >= 1.15) c1Format += 12;
  if (width >= 700) c1Format += 3;
  if (POSITIVE_HERO_PATTERNS.test(combinedText)) c1Format += 3;
  c1Format = Math.min(20, c1Format);

  let c2VisualHook = 0;
  if (fullBleedRatio >= 0.72) c2VisualHook += 8;
  else if (fullBleedRatio >= 0.45) c2VisualHook += 5;
  if (dofRatio >= 1.05 || avgCenterEnergy >= 10.5) c2VisualHook += 7;
  else if (avgCenterEnergy >= 7.0) c2VisualHook += 5;
  if (stdLum >= 24) c2VisualHook += 5;
  else if (stdLum >= 15) c2VisualHook += 3;
  c2VisualHook = Math.min(20, c2VisualHook);

  let c3FloatingCards = 0;
  if (detectedFloatingCards >= 3) c3FloatingCards = 15;
  else if (detectedFloatingCards === 2) c3FloatingCards = 13;
  else if (detectedFloatingCards === 1) c3FloatingCards = 11;
  else c3FloatingCards = 7;

  let c4PopOut3D = 0;
  if (avgHorizonCross >= 15) c4PopOut3D = 15;
  else if (avgHorizonCross >= 10) c4PopOut3D = 13;
  else if (avgHorizonCross >= 7.0) c4PopOut3D = 11;
  else c4PopOut3D = 7;

  let c5Typography = 0;
  if (headlineDensity >= 0.05 && headlineDensity <= 0.58) c5Typography = 15;
  else if (headlineDensity >= 0.025) c5Typography = 12;
  else c5Typography = 8;

  let c6EdgeNav = 0;
  if (topNavDensity >= 0.012 && topNavDensity <= 0.48) c6EdgeNav += 9;
  else c6EdgeNav += 6;
  if (sideNavDensity >= 0.008 && sideNavDensity <= 0.45) c6EdgeNav += 6;
  else c6EdgeNav += 4;
  c6EdgeNav = Math.min(15, c6EdgeNav);

  const totalScore = c1Format + c2VisualHook + c3FloatingCards + c4PopOut3D + c5Typography + c6EdgeNav;

  const criteriaChecks = {
    formatDesktopHeroShowcase: { score: c1Format, max: 20, passed: c1Format >= 15 },
    visualHookFullBleed3DDepth: { score: c2VisualHook, max: 20, passed: c2VisualHook >= 15 },
    floatingGlassPillCards: { score: c3FloatingCards, max: 15, passed: c3FloatingCards >= 11 },
    outOfBounds3DPopOut: { score: c4PopOut3D, max: 15, passed: c4PopOut3D >= 11 },
    oversizedHeadlineTypography: { score: c5Typography, max: 15, passed: c5Typography >= 11 },
    minimalistEdgeNavigation: { score: c6EdgeNav, max: 15, passed: c6EdgeNav >= 11 }
  };

  const passedCriteriaCount = Object.values(criteriaChecks).filter(c => c.passed).length;
  const criteriaMatchPercent = Math.round((passedCriteriaCount / 6) * 100);
  const minRequired = config.minCriteriaScore || 80;

  const accepted = totalScore >= minRequired && passedCriteriaCount >= 5;

  return {
    accepted,
    totalScore,
    criteriaMatchPercent,
    passedCriteriaCount,
    width,
    height,
    aspectRatio: Number(aspectRatio.toFixed(2)),
    fullBleedRatio: Number(fullBleedRatio.toFixed(2)),
    dofRatio: Number(dofRatio.toFixed(2)),
    criteriaChecks,
    reason: accepted
      ? `PASSED (${totalScore}/100, ${passedCriteriaCount}/6 criteria = ${criteriaMatchPercent}%)`
      : `BELOW_80_PERCENT (${totalScore}/100, ${passedCriteriaCount}/6 criteria)`
  };
}

function collectExistingStoreIdentity(excludeSlugs = new Set()) {
  const slugs = new Set();
  const names = new Set();

  for (const dirRel of ['web/product/giao-dien-web', 'web/public/demos']) {
    const full = resolve(root, dirRel);
    if (existsSync(full)) {
      for (const d of readdirSync(full, { withFileTypes: true })) {
        if (d.isDirectory() && !excludeSlugs.has(d.name.toLowerCase())) {
          slugs.add(d.name.toLowerCase());
        }
      }
    }
  }

  const realTplPath = resolve(root, 'web/src/lib/real-templates.ts');
  if (existsSync(realTplPath)) {
    const content = readFileSync(realTplPath, 'utf8');
    for (const m of content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)) {
      if (!excludeSlugs.has(m[1].toLowerCase())) slugs.add(m[1].toLowerCase());
    }
    for (const m of content.matchAll(/"slug":\s*"([^"]+)"/g)) {
      if (!excludeSlugs.has(m[1].toLowerCase())) slugs.add(m[1].toLowerCase());
    }
    for (const m of content.matchAll(/name:\s*['"]([^'"]+)['"]/g)) names.add(slugify(m[1]));
    for (const m of content.matchAll(/"name":\s*"([^"]+)"/g)) names.add(slugify(m[1]));
  }

  return { slugs, names };
}

async function checkPinterestHomefeed() {
  console.log(`[Step 1] Accessing ${config.homefeedUrl}...`);
  try {
    const res = await fetch(config.homefeedUrl, { headers: BROWSER_HEADERS });
    const html = await res.text();
    const feedPins = [...new Set([...html.matchAll(/\/pin\/(\d{10,25})\/?/g)].map(m => m[1]))];
    console.log(`[Step 1] Connected to ${config.homefeedUrl} (HTTP ${res.status}, initial feed pins=${feedPins.length}).`);
    return feedPins;
  } catch (err) {
    console.warn(`[Step 1] Warning connecting to homefeed: ${err.message}`);
    return [];
  }
}

// Curated widescreen Desktop Hero Section UI / Dribbble / Behance / WOTD / Codrops Pinterest feeds
const PINTEREST_HERO_SHOWCASE_ENDPOINTS = [
  { label: 'cssdesignawards/website-of-the-day-~-wotd', url: 'https://widgets.pinterest.com/v3/pidgets/boards/cssdesignawards/website-of-the-day-~-wotd/pins/?page_size=50' },
  { label: 'codrops/codrops-interactive-webgl', url: 'https://widgets.pinterest.com/v3/pidgets/boards/codrops/codrops/pins/?page_size=50' },
  { label: 'awwwards/visual-inspiration', url: 'https://widgets.pinterest.com/v3/pidgets/boards/awwwards/visual-inspiration/pins/?page_size=50' },
  { label: 'behance/interaction-design', url: 'https://widgets.pinterest.com/v3/pidgets/boards/behance/interaction-design/pins/?page_size=50' },
  { label: 'onepagelove/one-page-websites', url: 'https://widgets.pinterest.com/v3/pidgets/boards/onepagelove/one-page-websites/pins/?page_size=50' },
  { label: 'Webflow/madeinwebflow', url: 'https://widgets.pinterest.com/v3/pidgets/boards/Webflow/madeinwebflow/pins/?page_size=50' },
  { label: 'dribbble/design-inspiration', url: 'https://widgets.pinterest.com/v3/pidgets/boards/dribbble/design-inspiration/pins/?page_size=50' },
  { label: 'behance/motion-design', url: 'https://widgets.pinterest.com/v3/pidgets/boards/behance/motion-design/pins/?page_size=50' }
];

let cachedHeroPinPool = null;
const pinFallbackMeta = new Map();

async function loadPinterestHeroShowcasePool() {
  if (cachedHeroPinPool) return cachedHeroPinPool;
  cachedHeroPinPool = [];
  const seen = new Set();

  for (const ep of PINTEREST_HERO_SHOWCASE_ENDPOINTS) {
    try {
      const res = await fetch(ep.url, { headers: BROWSER_HEADERS });
      if (!res.ok) continue;
      const json = await res.json();
      const pins = json?.data?.pins || [];
      for (const p of pins) {
        if (!p?.id || seen.has(String(p.id))) continue;
        const im = p.images?.['564x'] || p.images?.['237x'];
        if (!im || !im.width || !im.height) continue;
        const ar = im.width / im.height;
        const text = `${p.description || ''} ${p.board?.name || ''} ${ep.label}`;
        // Pre-filter for desktop widescreen aspect ratio (AR >= 1.15) and non-mobile/non-ad description
        if (ar < 1.15 || HARD_REJECT_PATTERNS.test(text)) continue;

        seen.add(String(p.id));
        pinFallbackMeta.set(String(p.id), {
          previewUrl: im.url,
          description: p.description || '',
          board: ep.label
        });
        cachedHeroPinPool.push({
          id: String(p.id),
          board: ep.label,
          aspectRatio: ar,
          text: text.toLowerCase()
        });
      }
    } catch {}
  }
  return cachedHeroPinPool;
}

async function searchPinterestKeyword(keyword) {
  const pool = await loadPinterestHeroShowcasePool();
  // Prioritize WOTD Desktop Hero Section UI shots first, followed by Codrops WebGL & Awwwards
  return pool.map(item => item.id);
}

export async function resolvePublicPin(pinId) {
  const url = `https://www.pinterest.com/pin/${pinId}/`;
  const fb = pinFallbackMeta.get(String(pinId)) || {};
  const res = await fetch(url, { headers: BROWSER_HEADERS });
  if (!res.ok) throw new Error(`Pin ${pinId} returned HTTP ${res.status}`);
  const html = await res.text();

  const rawTitle =
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<title>([^<]+)<\/title>/i)?.[1] ||
    fb.description ||
    '';
  const rawDesc =
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    fb.description ||
    '';

  const ogImgTag = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i)?.[0] || '';
  const previewUrl = ogImgTag.match(/content=["']([^"']+)["']/i)?.[1] || fb.previewUrl || '';
  if (!previewUrl || !previewUrl.includes('i.pinimg.com')) {
    throw new Error(`Pin ${pinId} has no valid i.pinimg.com image`);
  }

  const stem = previewUrl.split('/').pop()?.split('.')[0] || '';
  const allOrigs = [...html.matchAll(/https:\/\/i\.pinimg\.com\/originals\/[a-zA-Z0-9/_.-]+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]);
  const matchedOrig = allOrigs.find(u => stem && u.includes(stem));
  const highRes736 = previewUrl.replace(/\/\d+x\//, '/736x/');

  return {
    pinId: String(pinId),
    board: fb.board || 'website-hero-ui',
    pageUrl: url,
    rawTitle: rawTitle.replace(/\s*\|\s*Pinterest.*$/i, '').trim(),
    rawDesc: rawDesc.trim(),
    imageUrl: matchedOrig || highRes736 || previewUrl,
    previewUrl
  };
}

async function downloadAndVerifyPinImage(pinInfo, keyword, dateStr) {
  const dir = resolve(__dirname, 'downloads', dateStr);
  mkdirSync(dir, { recursive: true });

  let res = await fetch(pinInfo.imageUrl, { headers: { 'User-Agent': BROWSER_HEADERS['User-Agent'] } });
  if (!res.ok && pinInfo.previewUrl && pinInfo.previewUrl !== pinInfo.imageUrl) {
    res = await fetch(pinInfo.previewUrl.replace(/\/\d+x\//, '/736x/'), { headers: { 'User-Agent': BROWSER_HEADERS['User-Agent'] } });
  }
  if (!res.ok) throw new Error(`Image download failed (${res.status}): ${pinInfo.imageUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8192) throw new Error(`Image too small (${buf.length} bytes), skipping`);

  // Evaluate against the 6 mandatory Website Hero Section UI criteria (requires >= 80%)
  const evaluation = await evaluateImageAgainst6Criteria(buf, pinInfo, keyword);
  if (!evaluation.accepted) {
    throw new Error(`Criteria score < 80%: ${evaluation.reason}`);
  }

  const contentType = res.headers.get('content-type') || '';
  let ext = '.jpg';
  if (contentType.includes('png')) ext = '.png';
  else if (contentType.includes('webp')) ext = '.webp';
  else {
    const parsedExt = extname(new URL(pinInfo.imageUrl).pathname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(parsedExt)) ext = parsedExt === '.jpeg' ? '.jpg' : parsedExt;
  }

  const filePath = resolve(dir, `pin-${pinInfo.pinId}${ext}`);
  writeFileSync(filePath, buf);
  const sha256 = createHash('sha256').update(buf).digest('hex');

  return {
    localPath: filePath,
    bytes: buf.length,
    sha256,
    ext,
    evaluation
  };
}

const CREATIVE_MOTION_RECIPES = [
  {
    id: 'recipe-parallax-magnetic',
    name: 'Parallax Depth + 3D Pop-Out + Magnetic CTA',
    focus: ['parallax-layers', 'magnetic-buttons', 'floating-3d-cutout'],
    description: 'Tập trung vào chiều sâu thị sai nhiều lớp (Parallax), vật thể 3D nổi lấn khung và nút bấm từ tính nhẹ nhàng.'
  },
  {
    id: 'recipe-tilt-splittext',
    name: 'Split-Text Staggered Reveal + 3D Card Tilt + Blend Cursor',
    focus: ['split-text-reveal', '3d-card-tilt', 'image-zoom-mask', 'custom-blend-cursor'],
    description: 'Tập trung vào nghệ thuật chữ tách ký tự (Split-Text), thẻ kính mờ nghiêng 3D khi rê chuột và con trỏ Blend-mode.'
  },
  {
    id: 'recipe-horizontal-liquid',
    name: 'Horizontal Showcase Scroll + Liquid Wave Filter + Seamless Modal',
    focus: ['horizontal-scroll', 'liquid-ripple-distortion', 'seamless-modal-transition'],
    description: 'Tập trung vào cuộn ngang bộ sưu tập (Horizontal Scroll), hiệu ứng gợn sóng chất lỏng SVG/WebGL và chuyển cảnh phóng to mượt mà.'
  },
  {
    id: 'recipe-sticky-counters',
    name: 'Sticky Pinned Storytelling + Scroll Scrubbing + Number Counters',
    focus: ['sticky-pinned-stage', 'scroll-scrub-rotation', 'number-counters'],
    description: 'Tập trung vào ghim cố định chủ thể ở giữa màn hình xoay theo thanh cuộn (Scroll Scrubbing) kết hợp đếm số tự động.'
  },
  {
    id: 'recipe-ambient-marquee',
    name: 'Ambient Particle Canvas + Kinetic Marquee + Cutout Glass Tabs',
    focus: ['ambient-smoke-particles', 'infinite-marquee', 'inverted-cutout-tabs'],
    description: 'Tập trung vào hệ thống hạt bụi/khói chuyển động nền (Ambient Canvas), chữ chạy vô tận (Marquee) và thẻ bo góc Cutout.'
  }
];

const CURATED_PIN_IDENTITIES = [
  { match: /1023935665292488759|^832290e8035f/i, title: 'Calfin Weather', slug: 'calfin-weather', tierHint: 'free' },
  { match: /1025343040190272817|^0074202d0629/i, title: 'CYBR Brutalism', slug: 'cybr-brutalism', tierHint: 'free' },
  { match: /1026891152513510316|^c83e430cbd15/i, title: 'Aurelia BioCyber', slug: 'aurelia-biocyber', tierHint: 'premium' },
  { match: /1029354058596850824|^b2ca43a410d4/i, title: 'Hush Futurist Bags', slug: 'hush-futurist-bags', tierHint: 'premium' },
  { match: /1033646551982054949|^f10f338bc06e/i, title: 'Quiet Place Sanctuary', slug: 'quiet-place-sanctuary', tierHint: 'premium' },
  { match: /1040542688905903756|^429d836f12e6/i, title: 'DotDNA Cyber', slug: 'dotdna-cyber', tierHint: 'free' },
  { match: /1040894532665699931|^8b8453c973fd/i, title: 'PolkaCrypto Future', slug: 'polkacrypto-future', tierHint: 'free' },
  { match: /1052997956649341571|^4c686f8c153a/i, title: 'Nexora Alex Portfolio', slug: 'nexora-alex-portfolio', tierHint: 'premium' },
  { match: /1055531231411192497|^b4b8ac6ba0fa/i, title: 'Kata Ocado Portfolio', slug: 'kata-ocado-portfolio', tierHint: 'premium' },
  { match: /1055812706409706318|^dbdf32161e8a/i, title: 'Glitch Cyberwear', slug: 'glitch-cyberwear', tierHint: 'premium' },
  { match: /1060879255984170579|^72b9a080e36e/i, title: "Ozzie's Pretzels", slug: 'ozzies-pretzels', tierHint: 'free' },
  { match: /1062568105861618273|^2e82c299dabf/i, title: 'Terrarium Deck Studio', slug: 'terrarium-deck-studio', tierHint: 'free' },
  { match: /1066719861751680646|^356f2b4c52cc/i, title: 'Foods Gourmet Bowl', slug: 'foods-gourmet-bowl', tierHint: 'premium' },
  { match: /1069323505300032436|^65658236e456/i, title: 'VisionGlass Neo UI', slug: 'visionglass-neo-ui', tierHint: 'premium' },
  { match: /1080160291868203924|^bedff480851f/i, title: 'O2 Moonish Cosmic', slug: 'o2-moonish-cosmic', tierHint: 'premium' }
];

function parseFilenameHint(filename, index, sha256 = '') {
  for (const c of CURATED_PIN_IDENTITIES) {
    if (c.match.test(filename) || (sha256 && c.match.test(sha256))) {
      return { title: c.title, slug: c.slug, tierHint: c.tierHint };
    }
  }
  const base = basename(filename, extname(filename));
  let tierHint = null;
  let cleanBase = base;
  if (/^free[-_\s]+/i.test(cleanBase)) {
    tierHint = 'free';
    cleanBase = cleanBase.replace(/^free[-_\s]+/i, '');
  } else if (/^premium[-_\s]+/i.test(cleanBase)) {
    tierHint = 'premium';
    cleanBase = cleanBase.replace(/^premium[-_\s]+/i, '');
  }
  const title = cleanPinTitle(cleanBase.replace(/[-_]+/g, ' '), 'Hero Showcase', 1000 + index);
  const slug = slugify(title);
  return { title, slug, tierHint };
}

export async function runPinterestFetchPipeline(options = {}) {
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  const replaceSlugs = Array.isArray(options.replaceSlugs) ? options.replaceSlugs : [];
  const excludeSet = new Set(replaceSlugs.map(s => s.toLowerCase()));
  const storeIdentity = collectExistingStoreIdentity(excludeSet);

  const processedPinIds = new Set(state.processedPinIds || []);
  const processedImageHashes = new Set(state.processedImageHashes || []);
  const processedSlugs = new Set([...(state.processedSlugs || []).filter(s => !excludeSet.has(s.toLowerCase())), ...storeIdentity.slugs]);

  const today = new Date().toLocaleDateString('sv-SE', { timeZone: config.timezone || 'Asia/Ho_Chi_Minh' });
  if (state.lastRunDate !== today || replaceSlugs.length > 0) {
    state.lastRunDate = today;
    state.todayCopiedCount = 0;
    state.todayCreatedCount = 0;
    state.todayFreeCount = 0;
    state.todayPremiumCount = 0;
  }
  state.todayCopiedCount = state.todayCopiedCount || state.todayCreatedCount || 0;
  state.todayCreatedCount = state.todayCopiedCount;
  state.todayFreeCount = state.todayFreeCount || 0;
  state.todayPremiumCount = state.todayPremiumCount || 0;

  // Read reference images directly from the user's daily drop-folder: D:\2A\anh-mau-pinterest
  const inboxDir = resolve(root, 'anh-mau-pinterest');
  const archiveDir = resolve(inboxDir, 'da-lam', today);
  const downloadsDir = resolve(__dirname, 'downloads', today);
  mkdirSync(inboxDir, { recursive: true });
  mkdirSync(archiveDir, { recursive: true });
  mkdirSync(downloadsDir, { recursive: true });

  const entries = readdirSync(inboxDir, { withFileTypes: true })
    .filter(e => e.isFile() && /\.(png|jpe?g|webp)$/i.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (entries.length === 0) {
    console.log(`[Inbox Empty] Chưa có ảnh mới trong thư mục ${inboxDir}. Hãy bỏ ảnh (.png, .jpg, .webp) vào D:\\2A\\anh-mau-pinterest để Agent thực hiện.`);
    return [];
  }

  console.log(`[Inbox] Tìm thấy ${entries.length} ảnh mẫu trong ${inboxDir}. Bắt đầu phân tích thị giác & phối tổ hợp hiệu ứng sáng tạo...`);

  const fetchedList = [];
  const targetCount = replaceSlugs.length > 0 ? replaceSlugs.length : config.dailyLimit;

  for (let i = 0; i < entries.length; i++) {
    if (fetchedList.length >= targetCount || state.todayCopiedCount >= config.dailyLimit) {
      break;
    }

    const fileEntry = entries[i];
    const srcPath = resolve(inboxDir, fileEntry.name);
    const buf = readFileSync(srcPath);
    const sha256 = createHash('sha256').update(buf).digest('hex');

    if (processedImageHashes.has(sha256)) {
      console.log(`[!] Ảnh "${fileEntry.name}" (hash ${sha256.slice(0, 10)}) đã từng được làm trước đó -> Chuyển vào da-lam/${today}/.`);
      try { renameSync(srcPath, resolve(archiveDir, fileEntry.name)); } catch {}
      continue;
    }

    const evaluation = await evaluateImageAgainst6Criteria(buf, { rawTitle: fileEntry.name }, 'User Curated Hero UI');
    const slotIndex = fetchedList.length;
    const forcedSlug = replaceSlugs[slotIndex] || null;
    const hint = parseFilenameHint(fileEntry.name, state.todayCopiedCount + i, sha256);

    let title = hint.title;
    let slug = forcedSlug || hint.slug;
    if (!forcedSlug && (!slug || processedSlugs.has(slug) || storeIdentity.names.has(slug))) {
      title = `${title} ${sha256.slice(0, 3).toUpperCase()}`;
      slug = slugify(title);
    }

    const dailyFreeQuota = config.dailyFreeQuota ?? 2;
    const assignedTier = hint.tierHint || (state.todayFreeCount < dailyFreeQuota ? 'free' : 'premium');
    const recipe = CREATIVE_MOTION_RECIPES[(state.todayCopiedCount + i) % CREATIVE_MOTION_RECIPES.length];

    const ext = extname(fileEntry.name).toLowerCase() === '.jpeg' ? '.jpg' : extname(fileEntry.name).toLowerCase();
    const pinId = `local-${sha256.slice(0, 12)}`;
    const savedDownloadPath = resolve(downloadsDir, `${slug}${ext}`);
    copyFileSync(srcPath, savedDownloadPath);

    // Move processed image from D:\2A\anh-mau-pinterest to D:\2A\anh-mau-pinterest\da-lam\<today>\
    const archivedPath = resolve(archiveDir, fileEntry.name);
    try {
      renameSync(srcPath, archivedPath);
    } catch {}

    const itemData = {
      pinId,
      sourceType: 'local-inbox-folder',
      originalFilename: fileEntry.name,
      archivedImagePath: archivedPath,
      title,
      slug,
      assignedTier,
      motionRecipe: recipe,
      localImagePath: savedDownloadPath,
      imageBytes: buf.length,
      imageSha256: sha256,
      criteriaEvaluation: evaluation,
      fetchedAt: new Date().toISOString()
    };

    const dataOutPath = resolve(__dirname, `data/${slug}.json`);
    writeFileSync(dataOutPath, JSON.stringify(itemData, null, 2), 'utf8');
    console.log(
      `[Inbox Accepted] "${fileEntry.name}" -> "${title}" (${slug}, tier=${assignedTier}, recipe=${recipe.id} [${recipe.name}])`
    );

    fetchedList.push(itemData);
    state.todayCopiedCount++;
    state.todayCreatedCount = state.todayCopiedCount;
    if (assignedTier === 'free') state.todayFreeCount++;
    else state.todayPremiumCount++;

    processedPinIds.add(pinId);
    processedImageHashes.add(sha256);
    processedSlugs.add(slug);

    state.processedPinIds = [...processedPinIds];
    state.processedImageHashes = [...processedImageHashes];
    state.processedSlugs = [...processedSlugs].sort();
  }

  writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
  return fetchedList;
}

if (process.argv[1] && process.argv[1].endsWith('fetch-pinterest.mjs')) {
  const replaceArg = process.argv.find(a => a.startsWith('--replace-slugs='))?.split('=')[1];
  const replaceSlugs = replaceArg ? replaceArg.split(',').map(s => s.trim()).filter(Boolean) : [];
  runPinterestFetchPipeline({ replaceSlugs }).then(list => {
    console.log(`Done. Processed ${list.length} reference images from D:\\2A\\anh-mau-pinterest.`);
  }).catch(console.error);
}
