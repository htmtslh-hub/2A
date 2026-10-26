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
  const brandTokens = new Set();
  const videos = new Set();
  const htmlCorpus = [];

  const genericWords = new Set([
    'docs', 'tools', 'reviews', 'design', 'atlas', 'iris', 'tidal', 'verdant',
    'free-sample', 'music-app', 'Portfolio', 'agency', 'studio', 'landing', 'modern'
  ]);

  // 1. Check web/product/giao-dien-web directories + source HTML videos & text
  const prodRoot = resolve(root, 'web/product/giao-dien-web');
  if (existsSync(prodRoot)) {
    for (const d of readdirSync(prodRoot, { withFileTypes: true })) {
      if (!d.isDirectory()) continue;
      const s = d.name.toLowerCase();
      slugs.add(s);
      if (s.length >= 5 && !genericWords.has(s)) {
        brandTokens.add(s);
        brandTokens.add(s.replace(/-/g, ' '));
      }
      const srcHtml = resolve(prodRoot, d.name, 'source/index.html');
      if (existsSync(srcHtml)) {
        try {
          const html = readFileSync(srcHtml, 'utf8');
          htmlCorpus.push({ slug: s, html: html.toLowerCase() });
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
      const nSlug = slugify(m[1]);
      names.add(nSlug);
      if (m[1].length >= 5 && !genericWords.has(nSlug)) {
        brandTokens.add(m[1].toLowerCase());
      }
    }
    for (const m of content.matchAll(/"name":\s*"([^"]+)"/g)) {
      const nSlug = slugify(m[1]);
      names.add(nSlug);
      if (m[1].length >= 5 && !genericWords.has(nSlug)) {
        brandTokens.add(m[1].toLowerCase());
      }
    }
  }

  return { slugs, names, brandTokens, videos, htmlCorpus };
}

export async function fetchMotionsitesPrompts(options = {}) {
  const includePremium = options.includePremium ?? true;
  console.log(`[1/4] Querying live Supabase catalog & bundle on ${config.motionsitesUrl}...`);

  const mergedMap = new Map();

  // Source A: Live Supabase `prompts` table (665+ items: 244 Free + 421 Premium with video_preview_url & image_preview_url)
  try {
    const cols = 'id,title,category,sort_order,type,types,created_at,page_type,row_span,is_free,image_preview_url,video_preview_url,has_assets,natural_ratio,github_url';
    const supRes = await fetch(`${config.supabaseUrl}/rest/v1/prompts?select=${encodeURIComponent(cols)}&order=sort_order.asc&limit=1000`, {
      headers: {
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`
      }
    });
    if (supRes.ok) {
      const rows = await supRes.json();
      if (Array.isArray(rows)) {
        for (const r of rows) {
          const isFree = Boolean(r.is_free);
          if (!isFree && !includePremium) continue;
          const id = String(r.id);
          const title = String(r.title || r.id).trim();
          const slug = slugify(title);
          mergedMap.set(id, {
            id,
            title,
            slug,
            isFree,
            category: r.category || 'Hero Section',
            type: r.type || r.page_type || 'hero',
            image: r.video_preview_url || r.image_preview_url || null,
            poster: r.image_preview_url || null,
            videoPreviewUrl: r.video_preview_url || null,
            githubUrl: r.github_url || null
          });
        }
        console.log(`[1/4] Loaded ${rows.length} live templates from Supabase 'prompts' table (Free: ${rows.filter(x => x.is_free).length}, Premium: ${rows.filter(x => !x.is_free).length}).`);
      }
    }
  } catch (err) {
    console.warn(`[1/4] Warning querying live Supabase prompts table: ${err.message}`);
  }

  // Source B: Static prompts-*.js bundle fallback/enrichment
  try {
    const htmlRes = await fetch(config.motionsitesUrl);
    if (htmlRes.ok) {
      const html = await htmlRes.text();
      const scriptRegex = /src=["'](\/assets\/index-[^"']+\.js)["']/g;
      let match;
      let indexScriptUrl = null;
      while ((match = scriptRegex.exec(html)) !== null) {
        indexScriptUrl = `${config.motionsitesUrl}${match[1]}`;
      }
      if (indexScriptUrl) {
        const indexJs = await (await fetch(indexScriptUrl)).text();
        const promptBundleMatch = indexJs.match(/assets\/prompts-[a-zA-Z0-9_\-]+\.js/);
        if (promptBundleMatch) {
          const promptsJs = await (await fetch(`${config.motionsitesUrl}/${promptBundleMatch[0]}`)).text();
          const arrayStart = promptsJs.indexOf('[{id:');
          if (arrayStart !== -1) {
            const headerPart = promptsJs.slice(0, arrayStart);
            const varMap = {};
            for (const vm of headerPart.matchAll(/([a-zA-Z0-9_$]+)=`([^`]+)`/g)) {
              varMap[vm[1]] = vm[2].startsWith('/') ? `${config.motionsitesUrl}${vm[2]}` : vm[2];
            }
            let depth = 0, arrayEnd = -1;
            for (let i = arrayStart; i < promptsJs.length; i++) {
              if (promptsJs[i] === '[') depth++;
              else if (promptsJs[i] === ']') {
                depth--;
                if (depth === 0) { arrayEnd = i + 1; break; }
              }
            }
            const arrayRaw = promptsJs.slice(arrayStart, arrayEnd);
            const itemRegex = /\{id:`([^`]+)`,title:`([^`]+)`([\s\S]*?)(?=\},\{id:|\}\])/g;
            let itemMatch;
            while ((itemMatch = itemRegex.exec(arrayRaw)) !== null) {
              const [, id, title, rest] = itemMatch;
              const isFree = rest.includes('free:!0') || rest.includes('free:true');
              if (!isFree && !includePremium) continue;
              const imgRaw = rest.match(/image:(`[^`]+`|[a-zA-Z0-9_$]+)/)?.[1] || '';
              const posterRaw = rest.match(/poster:(`[^`]+`|[a-zA-Z0-9_$]+)/)?.[1] || '';
              const image = imgRaw.startsWith('`')
                ? (imgRaw.slice(1, -1).startsWith('/') ? `${config.motionsitesUrl}${imgRaw.slice(1, -1)}` : imgRaw.slice(1, -1))
                : (varMap[imgRaw] || null);
              const poster = posterRaw.startsWith('`')
                ? (posterRaw.slice(1, -1).startsWith('/') ? `${config.motionsitesUrl}${posterRaw.slice(1, -1)}` : posterRaw.slice(1, -1))
                : (varMap[posterRaw] || null);

              if (!mergedMap.has(id)) {
                mergedMap.set(id, {
                  id,
                  title,
                  slug: slugify(title),
                  isFree,
                  category: rest.match(/category:`([^`]+)`/)?.[1] || 'Hero Section',
                  type: rest.match(/type:`([^`]+)`/)?.[1] || 'hero',
                  image,
                  poster,
                  videoPreviewUrl: image,
                  githubUrl: null
                });
              } else {
                const existing = mergedMap.get(id);
                if (!existing.image && image) existing.image = image;
                if (!existing.poster && poster) existing.poster = poster;
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn(`[1/4] Warning reading static bundle: ${err.message}`);
  }

  const allItems = [...mergedMap.values()];
  console.log(`[2/4] Total merged templates on motionsites.ai: ${allItems.length} (Free: ${allItems.filter(i => i.isFree).length}, Premium: ${allItems.filter(i => !i.isFree).length}).`);
  return allItems;
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
  const bankPath = resolve(__dirname, 'motionsites-master-bank.json');
  const storeIdentity = collectExistingStoreIdentity();

  const processedSlugs = new Set([...(state.processedSlugs || []), ...storeIdentity.slugs]);
  const processedPromptIds = new Set(state.processedPromptIds || []);
  const processedPromptHashes = new Set(state.processedPromptHashes || []);

  // Load from pre-harvested local master bank (motionsites-master-bank.json) first, or fallback to live fetch
  let bankData = null;
  let allItems = [];
  if (existsSync(bankPath)) {
    bankData = JSON.parse(readFileSync(bankPath, 'utf8'));
    allItems = (bankData.items || []).map(it => ({
      ...it,
      isFree: it.isFreeOnMotionsites ?? it.isFree,
      image: it.videoPreviewUrl || it.imagePreviewUrl || null,
      poster: it.imagePreviewUrl || null
    }));
    console.log(`[Bank] Loaded ${allItems.length} templates from local motionsites-master-bank.json.`);
  } else {
    allItems = await fetchMotionsitesPrompts({ includePremium: true });
  }

  // Prioritize unused Free items (with pre-harvested prompt_text) first, then unused Premium items
  const sortedItems = [
    ...allItems.filter(i => i.isFree && i.status !== 'already_used_in_2A' && i.status !== 'built_in_2A'),
    ...allItems.filter(i => !i.isFree && i.status !== 'already_used_in_2A' && i.status !== 'built_in_2A')
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

  console.log(`Found ${candidates.length} candidate templates in master bank ready to build (${candidates.filter(c => c.isFree).length} Free with full prompt + ${candidates.filter(c => !c.isFree).length} Premium with preview videos).`);
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

    console.log(`--> Selecting from bank: "${candidate.title}" (${candidate.id}, free=${candidate.isFree})...`);
    try {
      let promptText = candidate.prompt_text || '';
      let sections = candidate.sections || [];
      let dailyState = null;

      if (!promptText && candidate.isFree) {
        const result = await fetchPromptContent(candidate.id);
        promptText = result.prompt_text || '';
        sections = result.sections || [];
        dailyState = result.daily_state || null;
      }

      if (!promptText) {
        if (!candidate.image && !candidate.poster && !candidate.videoPreviewUrl) {
          console.warn(`[?] No prompt_text and no preview/poster for ${candidate.id}. Skipping.`);
          continue;
        }
        promptText = [
          `Recreate ${candidate.title} (${candidate.category} / ${candidate.type}) from MotionSites Preview.`,
          `Headline: "${candidate.title} — Next-Gen ${candidate.category} Experience"`,
          candidate.videoPreviewUrl ? `Preview Video/Animation: ${candidate.videoPreviewUrl}` : '',
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

      // Layer 7 deduplication: Check if prompt mentions a brand name (`called "X"`, `brand "X"`, `for "X"`) that matches an existing 2A store product!
      const brandMentions = [
        ...promptText.matchAll(/(?:called|named|brand|agency|for|titled)\s+(?:\*\*|["'`])([a-zA-Z0-9 _.-]{4,32})(?:\*\*|["'`])/gi)
      ].map(m => slugify(m[1]));
      const matchedBrandSlug = brandMentions.find(b => b.length >= 4 && storeIdentity.slugs.has(b));
      if (matchedBrandSlug) {
        console.warn(`[!] Prompt ${candidate.id} ("${candidate.title}") is for brand "${matchedBrandSlug}" which ALREADY exists in 2A! Marking processed & skipping.`);
        processedPromptIds.add(candidate.id);
        processedSlugs.add(candidate.slug);
        state.processedPromptIds = [...processedPromptIds];
        state.processedSlugs = [...processedSlugs].sort();
        continue;
      }

      // Layer 8 deduplication: Check if any distinctive quoted headline (>= 22 chars) in prompt was ALREADY used in any 2A template
      const distinctiveQuotes = [...promptText.matchAll(/"([^"\n]{22,80})"/g)]
        .map(m => m[1].trim().toLowerCase())
        .filter(s =>
          /^[a-z0-9\s.,!?'"&—–-]+$/i.test(s) &&
          s.split(/\s+/).length >= 4 &&
          !/https?:|flex|grid|rounded|padding|border|font-|text-|bg-|rgba|linear-gradient|instrument serif|helvetica|plus jakarta|inter|dm sans|jetbrains|monospace|sans-serif|system-ui|blinkmacsystemfont|initial-scale|device-width|enter your email|all rights reserved|preserveaspectratio|get started|learn more|contact us|privacy policy|autoplay muted|open navigation|subscribe to our|start a conversation/i.test(s)
        );
      const matchedDoc = storeIdentity.htmlCorpus.find(doc => distinctiveQuotes.some(q => doc.html.includes(q)));
      if (matchedDoc) {
        console.warn(`[!] Headline quote from ${candidate.id} was ALREADY used in 2A template "${matchedDoc.slug}"! Marking processed & skipping.`);
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

      if (bankData && Array.isArray(bankData.items)) {
        const bItem = bankData.items.find(x => x.id === candidate.id);
        if (bItem) bItem.status = 'built_in_2A';
      }
    } catch (err) {
      console.error(`[-] Error fetching ${candidate.id}:`, err.message);
    }
  }

  if (bankData) {
    writeFileSync(bankPath, JSON.stringify(bankData, null, 2), 'utf8');
  }
  writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
  return fetchedList;
}

if (process.argv[1] && process.argv[1].endsWith('fetch-prompts.mjs')) {
  runFetchPipeline().then(list => {
    console.log(`Done. Successfully fetched ${list.length} prompts.`);
  }).catch(console.error);
}
