import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');
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

function cleanPinTitle(rawTitle, keyword, pinId) {
  let t = String(rawTitle || '')
    .replace(/&#x27;|&apos;/gi, '')
    .replace(/&amp;/gi, ' ')
    .replace(/\s*\|\s*Pinterest.*$/i, '')
    .replace(/\s*—\s*[^|]+$/i, '')
    .split('|')[0]
    .split(' - ')[0]
    .replace(/[^\w\s]/g, ' ')
    .replace(/\b(pin|on|by|in|to|of|for|the|and|with|from|your|our|how|what|why|more|new|ideas|best|top|inspiration|templates?|layout|concept|design|website|websites|web|page|pages|ui|ux|home|landing|free|html|html5|css|bootstrap|wordpress|theme|themes|webflow|framer|pinterest|made|create|build|modern|simple|clean|responsive|\d+)\b/gi, ' ')
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

function collectExistingStoreIdentity() {
  const slugs = new Set();
  const names = new Set();

  for (const dirRel of ['web/product/giao-dien-web', 'web/public/demos']) {
    const full = resolve(root, dirRel);
    if (existsSync(full)) {
      for (const d of readdirSync(full, { withFileTypes: true })) {
        if (d.isDirectory()) slugs.add(d.name.toLowerCase());
      }
    }
  }

  const realTplPath = resolve(root, 'web/src/lib/real-templates.ts');
  if (existsSync(realTplPath)) {
    const content = readFileSync(realTplPath, 'utf8');
    for (const m of content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)) slugs.add(m[1].toLowerCase());
    for (const m of content.matchAll(/"slug":\s*"([^"]+)"/g)) slugs.add(m[1].toLowerCase());
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

const PINTEREST_WEB_DESIGN_BOARDS = [
  'Webflow/web-design-inspiration',
  'Webflow/webflow-templates',
  'Webflow/madeinwebflow',
  'framer/made-in-framer',
  'awwwards/ux-ui-mobile-design',
  'awwwards/visual-inspiration',
  'awwwards/the-annual-awards-2025',
  'siteinspire/websites',
  'landbook/featured-websites',
  'cssdesignawards/website-of-the-day-~-wotd',
  'onepagelove/one-page-websites',
  'onepagelove/one-page-website-templates',
  'templatemonster/landing-pages',
  'themewagon/html5-website-templates',
  'themewagon/free-html5-templates',
  'behance/interaction-design',
  'dribbble/design-inspiration',
  'codrops/codrops',
  'smashingmag/inspiration',
  'envato/design-trends'
];

let cachedBoardPins = null;
async function loadPinterestWebDesignBoardPool() {
  if (cachedBoardPins) return cachedBoardPins;
  cachedBoardPins = [];
  for (const board of PINTEREST_WEB_DESIGN_BOARDS) {
    try {
      const apiUrl = `https://widgets.pinterest.com/v3/pidgets/boards/${board}/pins/`;
      const res = await fetch(apiUrl, { headers: BROWSER_HEADERS });
      if (!res.ok) continue;
      const json = await res.json();
      const pins = json?.data?.pins || [];
      for (const p of pins) {
        if (p?.id) {
          cachedBoardPins.push({
            id: String(p.id),
            board,
            text: `${p.description || ''} ${p.board?.name || ''} ${board}`.toLowerCase()
          });
        }
      }
    } catch {}
  }
  return cachedBoardPins;
}

async function searchPinterestKeyword(keyword) {
  const foundIds = new Set();
  const tokens = String(keyword || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(t => t.length >= 2 && !['web', 'design', 'website'].includes(t));

  // 1. Official Pinterest Web Design Boards via widgets.pinterest.com/v3/pidgets/
  const pool = await loadPinterestWebDesignBoardPool();
  for (const item of pool) {
    if (tokens.length === 0 || tokens.some(t => item.text.includes(t))) {
      foundIds.add(item.id);
    }
  }
  // Ensure every keyword gets a rich slice of authentic web design pins across boards
  for (const item of pool) {
    if (foundIds.size >= 25) break;
    foundIds.add(item.id);
  }

  // 2. Fallback web search if needed
  if (foundIds.size < 10) {
    const queries = [
      `site:pinterest.com/pin/ "${keyword}"`,
      `site:pinterest.com/pin/ ${keyword} web design ui`
    ];
    for (const q of queries) {
      try {
        const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
        const res = await fetch(ddgUrl, { headers: BROWSER_HEADERS });
        if (res.ok) {
          const html = (await res.text()).replace(/%2F/gi, '/');
          for (const m of html.matchAll(/pinterest\.[a-z.]+\/pin\/(?:[a-zA-Z0-9_-]*--)?(\d{10,25})/gi)) {
            foundIds.add(m[1]);
          }
        }
      } catch {}
    }
  }

  return [...foundIds];
}

export async function resolvePublicPin(pinId) {
  const url = `https://www.pinterest.com/pin/${pinId}/`;
  const res = await fetch(url, { headers: BROWSER_HEADERS });
  if (!res.ok) throw new Error(`Pin ${pinId} returned HTTP ${res.status}`);
  const html = await res.text();

  const rawTitle =
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<title>([^<]+)<\/title>/i)?.[1] ||
    '';
  const rawDesc =
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    '';

  const ogImgTag = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i)?.[0] || '';
  const previewUrl = ogImgTag.match(/content=["']([^"']+)["']/i)?.[1] || '';
  if (!previewUrl || !previewUrl.includes('i.pinimg.com')) {
    throw new Error(`Pin ${pinId} has no valid i.pinimg.com og:image`);
  }

  const stem = previewUrl.split('/').pop()?.split('.')[0] || '';
  const allOrigs = [...html.matchAll(/https:\/\/i\.pinimg\.com\/originals\/[a-zA-Z0-9/_.-]+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]);
  const matchedOrig = allOrigs.find(u => stem && u.includes(stem));
  const highRes736 = previewUrl.replace(/\/\d+x\//, '/736x/');

  return {
    pinId: String(pinId),
    pageUrl: url,
    rawTitle: rawTitle.replace(/\s*\|\s*Pinterest.*$/i, '').trim(),
    rawDesc: rawDesc.trim(),
    imageUrl: matchedOrig || highRes736 || previewUrl,
    previewUrl
  };
}

async function downloadPinImage(imageUrl, pinId, dateStr) {
  const dir = resolve(__dirname, 'downloads', dateStr);
  mkdirSync(dir, { recursive: true });

  const res = await fetch(imageUrl, { headers: { 'User-Agent': BROWSER_HEADERS['User-Agent'] } });
  if (!res.ok) throw new Error(`Image download failed (${res.status}): ${imageUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 4096) throw new Error(`Image too small (${buf.length} bytes), skipping`);

  const contentType = res.headers.get('content-type') || '';
  let ext = '.jpg';
  if (contentType.includes('png')) ext = '.png';
  else if (contentType.includes('webp')) ext = '.webp';
  else {
    const parsedExt = extname(new URL(imageUrl).pathname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(parsedExt)) ext = parsedExt === '.jpeg' ? '.jpg' : parsedExt;
  }

  const filePath = resolve(dir, `pin-${pinId}${ext}`);
  writeFileSync(filePath, buf);
  const sha256 = createHash('sha256').update(buf).digest('hex');

  return {
    localPath: filePath,
    bytes: buf.length,
    sha256,
    ext
  };
}

export async function runPinterestFetchPipeline() {
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  const storeIdentity = collectExistingStoreIdentity();

  const processedPinIds = new Set(state.processedPinIds || []);
  const processedImageHashes = new Set(state.processedImageHashes || []);
  const processedSlugs = new Set([...(state.processedSlugs || []), ...storeIdentity.slugs]);

  const today = new Date().toLocaleDateString('sv-SE', { timeZone: config.timezone || 'Asia/Ho_Chi_Minh' });
  if (state.lastRunDate !== today) {
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
  state.keywordCursor = state.keywordCursor || 0;

  // Step 1: Connect to https://www.pinterest.com/homefeed/
  const feedPins = await checkPinterestHomefeed();

  // Step 2: Search web design keywords
  const keywords = config.keywords || ['website design', 'web UX UI design', 'portfolio design'];
  const candidateQueue = [];
  for (const id of feedPins) {
    if (!processedPinIds.has(id)) candidateQueue.push({ pinId: id, keyword: 'website design' });
  }

  let searchedKeywords = 0;
  while (candidateQueue.length < (config.dailyLimit * 3) && searchedKeywords < keywords.length) {
    const kw = keywords[state.keywordCursor % keywords.length];
    state.keywordCursor = (state.keywordCursor + 1) % keywords.length;
    searchedKeywords++;

    console.log(`[Step 2] Searching Pinterest keyword: "${kw}"...`);
    const ids = await searchPinterestKeyword(kw);
    console.log(`  -> Found ${ids.length} Pin IDs for "${kw}".`);
    for (const id of ids) {
      if (!processedPinIds.has(id) && !candidateQueue.some(c => c.pinId === id)) {
        candidateQueue.push({ pinId: id, keyword: kw });
      }
    }
  }

  // Step 3a: Resolve & Download up to 5 unique Pinterest Web Design Pins
  const fetchedList = [];
  for (const cand of candidateQueue) {
    if (state.todayCopiedCount >= config.dailyLimit) {
      console.log(`[!] Daily limit of ${config.dailyLimit} Pinterest templates reached for today (${today}).`);
      break;
    }

    if (processedPinIds.has(cand.pinId)) continue;

    try {
      const pinInfo = await resolvePublicPin(cand.pinId);
      const dl = await downloadPinImage(pinInfo.imageUrl, cand.pinId, today);

      // Deduplication check on image SHA-256
      if (processedImageHashes.has(dl.sha256)) {
        console.log(`[!] Duplicate Pinterest image hash detected for Pin ${cand.pinId}. Skipping.`);
        processedPinIds.add(cand.pinId);
        continue;
      }

      // Generate unique brand title & slug
      let title = cleanPinTitle(pinInfo.rawTitle, cand.keyword, cand.pinId);
      let slug = slugify(title);
      if (!slug || processedSlugs.has(slug) || storeIdentity.names.has(slug)) {
        title = `${title} ${String(cand.pinId).slice(-3)}`;
        slug = slugify(title);
      }

      // Quota allocation: 2 Free + 3 Premium per day
      const dailyFreeQuota = config.dailyFreeQuota ?? 2;
      const assignedTier = state.todayFreeCount < dailyFreeQuota ? 'free' : 'premium';

      const itemData = {
        pinId: cand.pinId,
        keyword: cand.keyword,
        title,
        slug,
        assignedTier,
        pageUrl: pinInfo.pageUrl,
        rawTitle: pinInfo.rawTitle,
        rawDesc: pinInfo.rawDesc,
        imageUrl: pinInfo.imageUrl,
        previewUrl: pinInfo.previewUrl,
        localImagePath: dl.localPath,
        imageBytes: dl.bytes,
        imageSha256: dl.sha256,
        fetchedAt: new Date().toISOString()
      };

      const dataOutPath = resolve(__dirname, `data/${slug}.json`);
      writeFileSync(dataOutPath, JSON.stringify(itemData, null, 2), 'utf8');
      console.log(`[Step 3] Downloaded Pin ${cand.pinId} -> "${title}" (${slug}, ${dl.bytes} bytes, tier=${assignedTier})`);

      fetchedList.push(itemData);
      state.todayCopiedCount++;
      state.todayCreatedCount = state.todayCopiedCount;
      if (assignedTier === 'free') state.todayFreeCount++;
      else state.todayPremiumCount++;

      processedPinIds.add(cand.pinId);
      processedImageHashes.add(dl.sha256);
      processedSlugs.add(slug);

      state.processedPinIds = [...processedPinIds];
      state.processedImageHashes = [...processedImageHashes];
      state.processedSlugs = [...processedSlugs].sort();
    } catch (err) {
      console.warn(`[-] Skipping Pin ${cand.pinId}: ${err.message}`);
      processedPinIds.add(cand.pinId);
      state.processedPinIds = [...processedPinIds];
    }
  }

  writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
  return fetchedList;
}

if (process.argv[1] && process.argv[1].endsWith('fetch-pinterest.mjs')) {
  runPinterestFetchPipeline().then(list => {
    console.log(`Done. Downloaded ${list.length} Pinterest web design references.`);
  }).catch(console.error);
}
