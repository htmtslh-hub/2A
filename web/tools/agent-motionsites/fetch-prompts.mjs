import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(resolve(__dirname, 'config.json'), 'utf8'));
const statePath = resolve(__dirname, 'state.json');
let state = JSON.parse(readFileSync(statePath, 'utf8'));

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
  let itemMatch;

  while ((itemMatch = itemRegex.exec(arrayRaw)) !== null) {
    const [_, id, title, rest] = itemMatch;
    const isFree = rest.includes('free:!0') || rest.includes('free:true');
    if (!isFree) continue;

    const imgMatch = rest.match(/image:([a-zA-Z0-9_`"'/.-]+)/);
    const posterMatch = rest.match(/poster:([a-zA-Z0-9_`"'/.-]+)/);
    const catMatch = rest.match(/category:`([^`]+)`/);
    const typeMatch = rest.match(/type:`([^`]+)`/);

    freeItems.push({
      id,
      title,
      slug: slugify(title),
      category: catMatch ? catMatch[1] : 'Hero Section',
      type: typeMatch ? typeMatch[1] : 'hero',
      image: imgMatch ? imgMatch[1].replace(/[`"']/g, '') : null,
      poster: posterMatch ? posterMatch[1].replace(/[`"']/g, '') : null
    });
  }

  console.log(`[2/4] Discovered ${freeItems.length} free templates on motionsites.ai.`);
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

  const data = await res.json();
  return data;
}

export async function runFetchPipeline() {
  const freeItems = await fetchMotionsitesPrompts();
  const processedSlugs = new Set(state.processedSlugs || []);
  const processedPromptIds = new Set(state.processedPromptIds || []);

  const candidates = freeItems.filter(item => {
    return !processedSlugs.has(item.slug) && 
           !processedSlugs.has(item.id) && 
           !processedPromptIds.has(item.id);
  });

  console.log(`Found ${candidates.length} candidate free templates not yet built into 2A.`);
  const fetchedList = [];
  const today = new Date().toISOString().slice(0, 10);

  if (state.lastRunDate !== today) {
    state.lastRunDate = today;
    state.todayCopiedCount = 0;
  }

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

      const itemData = {
        ...candidate,
        fetchedAt: new Date().toISOString(),
        prompt_text: result.prompt_text,
        sections: result.sections || [],
        daily_state: result.daily_state || null
      };

      const outPath = resolve(__dirname, `data/${candidate.slug}.json`);
      writeFileSync(outPath, JSON.stringify(itemData, null, 2), 'utf8');
      console.log(`[+] Saved prompt to data/${candidate.slug}.json (${result.prompt_text.length} chars)`);

      fetchedList.push(itemData);
      state.todayCopiedCount++;
      state.processedPromptIds.push(candidate.id);
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
