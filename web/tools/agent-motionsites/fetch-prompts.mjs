import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');
const config = JSON.parse(readFileSync(resolve(__dirname, 'config.json'), 'utf8'));
const statePath = resolve(__dirname, 'state.json');

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function sha256Text(text) {
  return createHash('sha256').update(String(text || '').trim(), 'utf8').digest('hex');
}

function collectExistingStoreIdentity() {
  const slugs = new Set();
  const names = new Set();

  // 1. Check web/product/giao-dien-web directories
  const prodRoot = resolve(root, 'web/product/giao-dien-web');
  if (existsSync(prodRoot)) {
    for (const d of readdirSync(prodRoot, { withFileTypes: true })) {
      if (d.isDirectory()) slugs.add(d.name.toLowerCase());
    }
  }

  // 2. Check web/public/demos directories
  const demoRoot = resolve(root, 'web/public/demos');
  if (existsSync(demoRoot)) {
    for (const d of readdirSync(demoRoot, { withFileTypes: true })) {
      if (d.isDirectory()) slugs.add(d.name.toLowerCase());
    }
  }

  // 3. Check web/src/lib/real-templates.ts slugs & names
  const realTplPath = resolve(root, 'web/src/lib/real-templates.ts');
  if (existsSync(realTplPath)) {
    const content = readFileSync(realTplPath, 'utf8');
    for (const m of content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)) {
      slugs.add(m[1].toLowerCase());
    }
    for (const m of content.matchAll(/"slug":\s*"([^"]+)"/g)) {
      slugs.add(m[1].toLowerCase());
    }
    for (const m of content.matchAll(/name:\s*['"]([^'"]+)['"]/g)) {
      names.add(slugify(m[1]));
    }
    for (const m of content.matchAll(/"name":\s*"([^"]+)"/g)) {
      names.add(slugify(m[1]));
    }
  }

  return { slugs, names };
}

export async function fetchMotionsitesPrompts() {
  console.log(`[1/4] Connecting to ${config.motionsitesUrl}...`);
  const htmlRes = await fetch(config.motionsitesUrl);
  if (!htmlRes.ok) throw new Error(`Failed to load ${config.motionsitesUrl}: ${htmlRes.statusText}`);
  const html = await htmlRes.text();

  // Find index script
  const scriptRegex = /src=["'](\/assets\/index-[^"']+\.js)["']/g;
  let match;
  let indexScriptUrl = null;
  while ((match = scriptRegex.exec(html)) !== null) {
    indexScriptUrl = `${config.motionsitesUrl}${match[1]}`;
  }
  if (!indexScriptUrl) throw new Error('Could not find main bundle script on motionsites.ai');

  console.log(`[1/4] Found bundle: ${indexScriptUrl}`);
  const indexJsRes = await fetch(indexScriptUrl);
  const indexJs = await indexJsRes.text();

  // Find prompts-*.js bundle
  const promptBundleMatch = indexJs.match(/assets\/prompts-[a-zA-Z0-9_\-]+\.js/);
  if (!promptBundleMatch) throw new Error('Could not find prompts bundle in main script');
  const promptsUrl = `${config.motionsitesUrl}/${promptBundleMatch[0]}`;
  console.log(`[1/4] Found prompts data bundle: ${promptsUrl}`);

  const promptsRes = await fetch(promptsUrl);
  const promptsJs = await promptsRes.text();

  // Extract array: [{id:...}]
  const arrayStart = promptsJs.indexOf('[{id:');
  if (arrayStart === -1) throw new Error('Could not locate prompt items array');

  let depth = 0;
  let arrayEnd = -1;
  for (let i = arrayStart; i < promptsJs.length; i++) {
    if (promptsJs[i] === '[') depth++;
    else if (promptsJs[i] === ']') {
      depth--;
      if (depth === 0) {
        arrayEnd = i + 1;
        break;
      }
    }
  }

  const arrayRaw = promptsJs.slice(arrayStart, arrayEnd);
  const itemRegex = /\{id:`([^`]+)`,title:`([^`]+)`([^}]+)\}/g;
  const freeItems = [];
  const seenIdsInFeed = new Set();
  const seenSlugsInFeed = new Set();
  let itemMatch;

  while ((itemMatch = itemRegex.exec(arrayRaw)) !== null) {
    const [_, id, title, rest] = itemMatch;
    const isFree = rest.includes('free:!0') || rest.includes('free:true');
    if (!isFree) continue;

    const slug = slugify(title);
    if (seenIdsInFeed.has(id) || seenSlugsInFeed.has(slug)) continue;
    seenIdsInFeed.add(id);
    seenSlugsInFeed.add(slug);

    const imgMatch = rest.match(/image:([a-zA-Z0-9_`"'/.-]+)/);
    const posterMatch = rest.match(/poster:([a-zA-Z0-9_`"'/.-]+)/);
    const catMatch = rest.match(/category:`([^`]+)`/);
    const typeMatch = rest.match(/type:`([^`]+)`/);

    freeItems.push({
      id,
      title,
      slug,
      category: catMatch ? catMatch[1] : 'Hero Section',
      type: typeMatch ? typeMatch[1] : 'hero',
      image: imgMatch ? imgMatch[1].replace(/[`"']/g, '') : null,
      poster: posterMatch ? posterMatch[1].replace(/[`"']/g, '') : null
    });
  }

  console.log(`[2/4] Discovered ${freeItems.length} unique free templates on motionsites.ai.`);
  return freeItems;
}

export async function fetchPromptContent(promptId) {
  const url = `${config.supabaseUrl}/functions/v1/get-prompt`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': config.anonKey,
      'Authorization': `Bearer ${config.anonKey}`
    },
    body: JSON.stringify({
      prompt_id: promptId,
      consume: false
    })
  });

  if (!res.ok) {
    throw new Error(`Edge function error ${res.status}: ${res.statusText}`);
  }

  return await res.json();
}

export async function runFetchPipeline() {
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  const freeItems = await fetchMotionsitesPrompts();
  const storeIdentity = collectExistingStoreIdentity();

  const processedSlugs = new Set([...(state.processedSlugs || []), ...storeIdentity.slugs]);
  const processedPromptIds = new Set(state.processedPromptIds || []);
  const processedPromptHashes = new Set(state.processedPromptHashes || []);

  // Multi-layer deduplication filter: ID, slug, stripped-hero ID, and normalized store title
  const candidates = freeItems.filter(item => {
    const idStripped = item.id.replace(/-(hero|landing|page|template)$/i, '');
    const dataFileExists = existsSync(resolve(__dirname, `data/${item.slug}.json`));
    return (
      !processedPromptIds.has(item.id) &&
      !processedSlugs.has(item.slug) &&
      !processedSlugs.has(item.id) &&
      !processedSlugs.has(idStripped) &&
      !storeIdentity.names.has(item.slug) &&
      !dataFileExists
    );
  });

  console.log(`Found ${candidates.length} candidate free templates not yet built into 2A.`);
  const fetchedList = [];
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: config.timezone || 'Asia/Ho_Chi_Minh' });

  if (state.lastRunDate !== today) {
    state.lastRunDate = today;
    state.todayCopiedCount = 0;
    state.todayFreeCount = 0;
    state.todayPremiumCount = 0;
  }
  state.todayFreeCount = state.todayFreeCount || 0;
  state.todayPremiumCount = state.todayPremiumCount || 0;
  state.processedPromptHashes = state.processedPromptHashes || [];

  for (const candidate of candidates) {
    if (state.todayCopiedCount >= config.dailyLimit) {
      console.log(`[!] Daily limit of ${config.dailyLimit} prompts reached for today (${today}).`);
      break;
    }

    console.log(`--> Fetching prompt for: "${candidate.title}" (${candidate.id})...`);
    try {
      const result = await fetchPromptContent(candidate.id);
      if (result.code === 'daily_limit_reached') {
        console.log(`[!] Motionsites returned daily_limit_reached.`);
        break;
      }

      if (!result.prompt_text) {
        console.warn(`[?] No prompt_text returned for ${candidate.id} (${result.code || 'unknown'}). Skipping.`);
        continue;
      }

      // Layer 5 deduplication: SHA-256 of prompt content
      const promptHash = sha256Text(result.prompt_text);
      if (processedPromptHashes.has(promptHash)) {
        console.warn(`[!] Duplicate prompt content hash detected for ${candidate.id} (${promptHash.slice(0, 12)}). Marking processed & skipping.`);
        processedPromptIds.add(candidate.id);
        processedSlugs.add(candidate.slug);
        state.processedPromptIds = [...processedPromptIds];
        state.processedSlugs = [...processedSlugs].sort();
        continue;
      }

      // Quota allocation: 1 Free + 2 Premium per day
      const dailyFreeQuota = config.dailyFreeQuota ?? 1;
      const assignedTier = state.todayFreeCount < dailyFreeQuota ? 'free' : 'premium';

      const itemData = {
        ...candidate,
        assignedTier,
        promptHash,
        fetchedAt: new Date().toISOString(),
        prompt_text: result.prompt_text,
        sections: result.sections || [],
        daily_state: result.daily_state || null
      };

      const outPath = resolve(__dirname, `data/${candidate.slug}.json`);
      writeFileSync(outPath, JSON.stringify(itemData, null, 2), 'utf8');
      console.log(`[+] Saved prompt to data/${candidate.slug}.json (${result.prompt_text.length} chars, tier=${assignedTier})`);

      fetchedList.push(itemData);
      state.todayCopiedCount++;
      if (assignedTier === 'free') state.todayFreeCount++;
      else state.todayPremiumCount++;

      processedPromptIds.add(candidate.id);
      processedSlugs.add(candidate.slug);
      processedPromptHashes.add(promptHash);
      state.processedPromptIds = [...processedPromptIds];
      state.processedSlugs = [...processedSlugs].sort();
      state.processedPromptHashes = [...processedPromptHashes];
    } catch (err) {
      console.error(`[-] Error fetching ${candidate.id}:`, err.message);
    }
  }

  writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
  return fetchedList;
}

if (process.argv[1] && process.argv[1].endsWith('fetch-prompts.mjs')) {
  runFetchPipeline().then(list => {
    console.log(`Done. Successfully fetched ${list.length} prompts.`);
  }).catch(console.error);
}
