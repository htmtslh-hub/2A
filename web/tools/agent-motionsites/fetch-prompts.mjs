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
  const videos = new Set();
  const htmlCorpus = [];

  // 1. Check web/product/giao-dien-web directories + source HTML videos & text
  const prodRoot = resolve(root, 'web/product/giao-dien-web');
  if (existsSync(prodRoot)) {
    for (const d of readdirSync(prodRoot, { withFileTypes: true })) {
      if (!d.isDirectory()) continue;
      const s = d.name.toLowerCase();
      slugs.add(s);
      const srcHtml = resolve(prodRoot, d.name, 'source/index.html');
      if (existsSync(srcHtml)) {
        try {
          const html = readFileSync(srcHtml, 'utf8');
          htmlCorpus.push(html.toLowerCase());
          for (const vm of html.matchAll(/https?:\/\/[^\s"'`<>)]+\.mp4/gi)) {
            const fname = vm[0].split('/').pop()?.toLowerCase();
            if (fname) videos.add(fname);
          }
        } catch {}
      }
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

  return { slugs, names, videos, htmlCorpus };
}

export async function fetchMotionsitesPrompts(options = {}) {
  const includePremium = options.includePremium ?? false;
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

  // Resolve asset variable declarations at top of prompts-*.js (e.g. nr=`/assets/hero-shamoni-preview.gif`)
  const headerPart = promptsJs.slice(0, arrayStart);
  const varMap = {};
  for (const vm of headerPart.matchAll(/([a-zA-Z0-9_$]+)=`([^`]+)`/g)) {
    varMap[vm[1]] = vm[2].startsWith('/') ? `${config.motionsitesUrl}${vm[2]}` : vm[2];
  }

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
  const itemRegex = /\{id:`([^`]+)`,title:`([^`]+)`([\s\S]*?)(?=\},\{id:|\}\])/g;
  const items = [];
  const seenIdsInFeed = new Set();
  const seenSlugsInFeed = new Set();
  let itemMatch;

  while ((itemMatch = itemRegex.exec(arrayRaw)) !== null) {
    const [_, id, title, rest] = itemMatch;
    const isFree = rest.includes('free:!0') || rest.includes('free:true');
    if (!isFree && !includePremium) continue;

    const slug = slugify(title);
    if (seenIdsInFeed.has(id) || seenSlugsInFeed.has(slug)) continue;
    seenIdsInFeed.add(id);
    seenSlugsInFeed.add(slug);

    const imgRaw = rest.match(/image:(`[^`]+`|[a-zA-Z0-9_$]+)/)?.[1] || '';
    const posterRaw = rest.match(/poster:(`[^`]+`|[a-zA-Z0-9_$]+)/)?.[1] || '';
    const image = imgRaw.startsWith('`')
      ? (imgRaw.slice(1, -1).startsWith('/') ? `${config.motionsitesUrl}${imgRaw.slice(1, -1)}` : imgRaw.slice(1, -1))
      : (varMap[imgRaw] || null);
    const poster = posterRaw.startsWith('`')
      ? (posterRaw.slice(1, -1).startsWith('/') ? `${config.motionsitesUrl}${posterRaw.slice(1, -1)}` : posterRaw.slice(1, -1))
      : (varMap[posterRaw] || null);
    const muxPlaybackId = (image || poster || '').match(/image\.mux\.com\/([a-zA-Z0-9]+)\//)?.[1] || null;
    const muxStreamUrl = muxPlaybackId ? `https://stream.mux.com/${muxPlaybackId}.m3u8` : null;

    const catMatch = rest.match(/category:`([^`]+)`/);
    const typeMatch = rest.match(/type:`([^`]+)`/);

    items.push({
      id,
      title,
      slug,
      isFree,
      category: catMatch ? catMatch[1] : 'Hero Section',
      type: typeMatch ? typeMatch[1] : 'hero',
      image,
      poster,
      muxStreamUrl
    });
  }

  console.log(`[2/4] Discovered ${items.length} unique templates on motionsites.ai (includePremium=${includePremium}).`);
  return items;
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

export async function runFetchPipeline(options = {}) {
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  const allItems = await fetchMotionsitesPrompts({ includePremium: true });
  const storeIdentity = collectExistingStoreIdentity();

  const processedSlugs = new Set([...(state.processedSlugs || []), ...storeIdentity.slugs]);
  const processedPromptIds = new Set(state.processedPromptIds || []);
  const processedPromptHashes = new Set(state.processedPromptHashes || []);

  // Multi-layer deduplication filter: ID, slug, stripped-hero ID, and normalized store title
  // Order: unused Free items first, followed by unused Premium items (with preview video + poster)
  const sortedItems = [
    ...allItems.filter(i => i.isFree),
    ...allItems.filter(i => !i.isFree)
  ];

  const candidates = sortedItems.filter(item => {
    const idStripped = item.id.replace(/-(hero|landing|page|template|footer|features|cta|pricing)$/i, '');
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

  console.log(`Found ${candidates.length} candidate templates not yet built into 2A (${candidates.filter(c => c.isFree).length} Free + ${candidates.filter(c => !c.isFree).length} Premium with preview videos).`);
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

    console.log(`--> Checking candidate: "${candidate.title}" (${candidate.id}, free=${candidate.isFree})...`);
    try {
      let promptText = '';
      let sections = [];
      let dailyState = null;

      if (candidate.isFree) {
        const result = await fetchPromptContent(candidate.id);
        if (result.code === 'daily_limit_reached') {
          console.log(`[!] Motionsites returned daily_limit_reached for free prompt API; falling back to visual preview & poster spec.`);
        }
        promptText = result.prompt_text || '';
        sections = result.sections || [];
        dailyState = result.daily_state || null;
      }

      // If Premium (paid_only) or free API limit reached, synthesize spec from Motionsites preview video/GIF + high-res poster
      if (!promptText) {
        if (!candidate.image && !candidate.poster) {
          console.warn(`[?] No prompt_text and no preview/poster for ${candidate.id}. Skipping.`);
          continue;
        }
        promptText = [
          `Recreate ${candidate.title} (${candidate.category} / ${candidate.type}) from MotionSites Premium Preview.`,
          `Headline: "${candidate.title} — Next-Gen ${candidate.category} Experience"`,
          candidate.muxStreamUrl ? `Mux Stream: ${candidate.muxStreamUrl}` : '',
          candidate.image ? `Preview Video/Animation: ${candidate.image}` : '',
          candidate.poster ? `High-Res Poster: ${candidate.poster}` : ''
        ].filter(Boolean).join('\n');
      }

      // Layer 5 deduplication: SHA-256 of prompt content
      const promptHash = sha256Text(promptText);
      if (processedPromptHashes.has(promptHash)) {
        console.warn(`[!] Duplicate prompt content hash detected for ${candidate.id}. Marking processed & skipping.`);
        processedPromptIds.add(candidate.id);
        processedSlugs.add(candidate.slug);
        state.processedPromptIds = [...processedPromptIds];
        state.processedSlugs = [...processedSlugs].sort();
        continue;
      }

      // Layer 6 deduplication: Check if any .mp4 video in prompt was ALREADY used in any existing 2A template
      const promptVideos = [...new Set([...promptText.matchAll(/https?:\/\/[^\s"'`<>)]+\.mp4/gi)].map(m => m[0].split('/').pop()?.toLowerCase()))].filter(Boolean);
      const usedVideo = promptVideos.find(v => storeIdentity.videos.has(v));
      if (usedVideo) {
        console.warn(`[!] Video "${usedVideo}" from ${candidate.id} was ALREADY used in an existing 2A template! Marking processed & skipping.`);
        processedPromptIds.add(candidate.id);
        processedSlugs.add(candidate.slug);
        state.processedPromptIds = [...processedPromptIds];
        state.processedSlugs = [...processedSlugs].sort();
        continue;
      }

      // Layer 7 deduplication: Check if any distinctive quoted headline (>= 18 chars) in prompt was ALREADY used in any 2A template
      const distinctiveQuotes = [...promptText.matchAll(/"([^"\n]{18,80})"/g)]
        .map(m => m[1].trim().toLowerCase())
        .filter(s => !/https?:|flex|grid|rounded|padding|border|font-|text-|bg-|rgba|linear-gradient|instrument serif|helvetica|plus jakarta|inter|dm sans|enter your email|all rights reserved|preserveaspectratio|get started|learn more|contact us|privacy policy/i.test(s));
      const matchedExistingQuote = distinctiveQuotes.find(q => storeIdentity.htmlCorpus.some(html => html.includes(q)));
      if (matchedExistingQuote) {
        console.warn(`[!] Headline quote "${matchedExistingQuote}" from ${candidate.id} was ALREADY used in an existing 2A template! Marking processed & skipping.`);
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
        prompt_text: promptText,
        sections,
        daily_state: dailyState
      };

      const outPath = resolve(__dirname, `data/${candidate.slug}.json`);
      writeFileSync(outPath, JSON.stringify(itemData, null, 2), 'utf8');
      console.log(`[+] Saved spec to data/${candidate.slug}.json (${promptText.length} chars, source=${candidate.isFree ? 'free-prompt' : 'premium-preview'}, tier=${assignedTier})`);

      fetchedList.push(itemData);
      state.todayCopiedCount++;
      if (assignedTier === 'free') state.todayFreeCount++;
      else state.todayPremiumCount++;

      processedPromptIds.add(candidate.id);
      processedSlugs.add(candidate.slug);
      processedPromptHashes.add(promptHash);
      for (const v of promptVideos) storeIdentity.videos.add(v);
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
