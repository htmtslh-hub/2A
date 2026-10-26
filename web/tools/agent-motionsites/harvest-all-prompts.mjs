import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchMotionsitesPrompts, fetchPromptContent, slugify, sha256Text } from './fetch-prompts.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');
const statePath = resolve(__dirname, 'state.json');
const bankJsonPath = resolve(__dirname, 'motionsites-master-bank.json');
const bankMdPath = resolve(__dirname, 'MOTIONSITES-PROMPT-BANK.md');

function buildStoreCorpus() {
  const prodRoot = resolve(root, 'web/product/giao-dien-web');
  const slugs = new Set();
  const videos = new Map(); // videoFilename -> 2A slug
  const docs = [];

  if (existsSync(prodRoot)) {
    for (const d of readdirSync(prodRoot, { withFileTypes: true })) {
      if (!d.isDirectory() || ['docs', 'tools', 'reviews', 'design'].includes(d.name)) continue;
      const s = d.name.toLowerCase();
      slugs.add(s);
      const srcHtml = resolve(prodRoot, d.name, 'source/index.html');
      if (existsSync(srcHtml)) {
        const html = readFileSync(srcHtml, 'utf8');
        docs.push({ slug: s, htmlLower: html.toLowerCase() });
        for (const vm of html.matchAll(/https?:\/\/[^\s"'`<>)]+\.mp4/gi)) {
          const fname = vm[0].split('/').pop()?.toLowerCase();
          if (fname && !videos.has(fname)) videos.set(fname, s);
        }
      }
    }
  }
  return { slugs, videos, docs };
}

function checkIfUsedIn2A(item, promptText, store, processedPromptIds) {
  const idStripped = item.id.replace(/-(hero|landing|page|template|footer|features|cta|pricing|section)$/i, '');
  if (store.slugs.has(item.slug)) return { used: true, matchedSlug: item.slug, reason: 'exact slug match' };
  if (store.slugs.has(item.id)) return { used: true, matchedSlug: item.id, reason: 'exact id match' };
  if (store.slugs.has(idStripped)) return { used: true, matchedSlug: idStripped, reason: 'stripped id match' };

  if (promptText) {
    // Video filename match
    const pVids = [...new Set([...promptText.matchAll(/https?:\/\/[^\s"'`<>)]+\.mp4/gi)].map(m => m[0].split('/').pop()?.toLowerCase()))].filter(Boolean);
    for (const v of pVids) {
      if (store.videos.has(v)) {
        return { used: true, matchedSlug: store.videos.get(v), reason: `shared video (${v})` };
      }
    }

    // Brand name inside prompt (`called "X"`, `brand "X"`, `agency "X"`)
    const brandMatches = [
      ...promptText.matchAll(/(?:called|named|brand|agency|for|titled)\s+(?:\*\*|["'`])([a-zA-Z0-9 _.-]{4,32})(?:\*\*|["'`])/gi)
    ].map(m => slugify(m[1]));
    for (const b of brandMatches) {
      if (b.length >= 4 && store.slugs.has(b)) {
        return { used: true, matchedSlug: b, reason: `brand name inside prompt (${b})` };
      }
    }

    // Distinctive human headline (>= 22 chars, letters/spaces/punctuation only, no HTML/CSS/SVG tokens)
    const quotes = [...promptText.matchAll(/"([^"\n]{22,80})"/g)]
      .map(m => m[1].trim().toLowerCase())
      .filter(s =>
        /^[a-z0-9\s.,!?'"&—–-]+$/i.test(s) &&
        s.split(/\s+/).length >= 4 &&
        !/https?:|flex|grid|rounded|padding|border|font-|text-|bg-|rgba|linear-gradient|instrument serif|helvetica|plus jakarta|inter|dm sans|jetbrains|monospace|sans-serif|system-ui|blinkmacsystemfont|initial-scale|device-width|enter your email|all rights reserved|preserveaspectratio|get started|learn more|contact us|privacy policy|autoplay muted|open navigation|subscribe to our|start a conversation/i.test(s)
      );
    for (const doc of store.docs) {
      const hit = quotes.find(q => doc.htmlLower.includes(q));
      if (hit) {
        return { used: true, matchedSlug: doc.slug, reason: `headline quote ("${hit.slice(0, 36)}...")` };
      }
    }
  }

  if (processedPromptIds.has(item.id)) {
    return { used: true, matchedSlug: item.slug, reason: 'in processedPromptIds' };
  }

  return { used: false, matchedSlug: null, reason: null };
}

async function main() {
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  const processedPromptIds = new Set(state.processedPromptIds || []);
  const store = buildStoreCorpus();

  const allItems = await fetchMotionsitesPrompts({ includePremium: true });
  const freeItems = allItems.filter(i => i.isFree);
  const premiumItems = allItems.filter(i => !i.isFree);

  console.log(`Harvesting full prompt_text for all ${freeItems.length} Free templates (using cached bank where available)...`);
  const existingBank = existsSync(bankJsonPath) ? JSON.parse(readFileSync(bankJsonPath, 'utf8')) : null;
  const cachedPromptMap = new Map(
    (existingBank?.items || [])
      .filter(x => x.prompt_text && (!x.promptSource || x.promptSource === 'official_api') && x.isFreeOnMotionsites)
      .map(x => [x.id, { prompt_text: x.prompt_text, sections: x.sections || [] }])
  );
  const resultsMap = new Map();
  let cursor = 0;

  async function worker() {
    while (cursor < freeItems.length) {
      const idx = cursor++;
      const item = freeItems[idx];
      if (cachedPromptMap.has(item.id)) {
        resultsMap.set(item.id, cachedPromptMap.get(item.id));
        continue;
      }
      try {
        const res = await fetchPromptContent(item.id);
        resultsMap.set(item.id, res);
      } catch (err) {
        resultsMap.set(item.id, { error: err.message });
      }
      if ((idx + 1) % 25 === 0 || idx + 1 === freeItems.length) {
        console.log(`  -> Fetched ${idx + 1}/${freeItems.length} free prompts...`);
      }
    }
  }

  await Promise.all(Array.from({ length: 8 }, () => worker()));

  function synthesizePremiumPrompt(item) {
    const mediaUrl = item.videoPreviewUrl || item.image || item.poster || '';
    const posterUrl = item.poster || item.image || '';
    const cat = item.category || 'SaaS & Web';
    const isLight = /light|editorial|minimal|fashion|warm|studio|wellness|wedding|real estate|architecture|agency/i.test(`${item.title} ${cat}`);
    const bgHex = isLight ? '#F8F7F4' : '#090A0F';
    const surfaceHex = isLight ? '#EFECE6' : '#12151E';
    const textHex = isLight ? '#141413' : '#F5F7FA';
    const accentHex = /finance|crypto|web3/i.test(cat)
      ? '#10B981'
      : /ai|tech|saas|developer/i.test(cat)
      ? '#6366F1'
      : /design|agency|portfolio/i.test(cat)
      ? '#FF5656'
      : '#38BDF8';

    return `Create a high-craft, production-ready ${item.type === 'section' ? 'UI section & interactive showcase' : 'full-page web template'} for **"${item.title}"** in the **${cat}** category.

### 1. Visual Direction & Reference Assets
- **Template ID:** \`${item.id}\`
- **Category:** ${cat} (${item.type || 'hero'})
- **Reference Video / Motion Preview:** ${mediaUrl || 'N/A'}
- **High-Res Reference Poster (1280px):** ${posterUrl || 'N/A'}
${item.githubUrl ? `- **Reference GitHub Repository:** ${item.githubUrl}\n` : ''}- **Design Paradigm:** Kinetic typography & neo-brutalist Swiss grids blended with atmospheric minimalism andchoreographed motion.

### 2. Color & Atmospheric Polarity
- **Primary Background Surface:** \`${bgHex}\`
- **Elevated Card / Module Surface:** \`${surfaceHex}\`
- **Primary Typography Ink:** \`${textHex}\`
- **Primary Accent & Interactive Highlight:** \`${accentHex}\`
- **Border & Hairline Token:** \`1px solid ${isLight ? 'rgba(20,20,19,0.10)' : 'rgba(255,255,255,0.08)'}\`

### 3. Typography & Scannable Hierarchy
- **Display / Headline Font:** \`'Instrument Serif'\`, \`'Playfair Display'\`, or \`'Plus Jakarta Sans'\` (` + '`clamp(2.5rem, 5vw, 4.75rem)`' + `, line-height \`0.98\`, letter-spacing \`-0.03em\`)
- **UI & Body Font:** \`'Inter'\` or \`'Plus Jakarta Sans'\` (400, 500, 600)
- **Technical / Numeric Meta Font:** \`'JetBrains Mono'\` with \`font-variant-numeric: tabular-nums\`

### 4. Layout, Spatial Architecture & Interactive Functional Requirements
1. **Top Navigation Bar:** Glassmorphic sticky header with brand wordmark **"${item.title}"**, section anchors, interactive theme/mode or live status pill, and primary CTA button.
2. **Primary Hero / Focal Showcase:**
   - Incorporate the motion preview asset (${mediaUrl || posterUrl}) with smooth parallax depth, subtle ambient glow, and crisp frame border.
   - Headline copy tailored to **"${item.title}"** (${cat}) with dual action triggers and live telemetry/metrics strip.
3. **Interactive Bento / Feature Architecture:**
   - 3-to-4 interactive cards or live calculator/filter controls depending on the archetype of **"${item.title}"**.
   - Micro-interactions on hover (\`cubic-bezier(0.22, 1, 0.36, 1)\`), live tab switching, and responsive 4-viewport adaptation (\`1440px\`, \`1024px\`, \`768px\`, \`375px\`).`;
  }

  const masterEntries = [];
  const newlyDetectedUsedIds = new Set(processedPromptIds);

  for (const item of allItems) {
    const fetched = resultsMap.get(item.id) || null;
    const officialPromptText = fetched?.prompt_text || null;
    const promptSource = officialPromptText ? 'official_api' : 'visual_architectural_spec';
    const promptText = officialPromptText || synthesizePremiumPrompt(item);
    const sections = fetched?.sections?.length
      ? fetched.sections
      : [{ title: `${item.title} — Master Specification`, content: promptText }];
    const promptHash = sha256Text(officialPromptText || `${item.id}:${item.videoPreviewUrl || item.image || ''}`);

    const check = checkIfUsedIn2A(item, officialPromptText, store, processedPromptIds);
    if (check.used) {
      newlyDetectedUsedIds.add(item.id);
    }

    masterEntries.push({
      id: item.id,
      title: item.title,
      slug: item.slug,
      isFreeOnMotionsites: item.isFree,
      promptSource,
      category: item.category,
      type: item.type,
      status: check.used ? 'already_used_in_2A' : 'queued_unused',
      matched2ASlug: check.matchedSlug,
      matchReason: check.reason,
      videoPreviewUrl: item.videoPreviewUrl || item.image || null,
      imagePreviewUrl: item.poster || null,
      githubUrl: item.githubUrl || null,
      promptHash,
      promptLength: promptText ? promptText.length : 0,
      prompt_text: promptText,
      sections
    });
  }

  // Update state.json with all detected already-used prompt IDs so they are permanently locked out
  state.processedPromptIds = [...newlyDetectedUsedIds];
  writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');

  const usedCount = masterEntries.filter(e => e.status === 'already_used_in_2A').length;
  const unusedFreeCount = masterEntries.filter(e => e.status === 'queued_unused' && e.isFreeOnMotionsites && e.prompt_text).length;
  const unusedPremiumCount = masterEntries.filter(e => e.status === 'queued_unused' && !e.isFreeOnMotionsites).length;

  const bankPayload = {
    generatedAt: new Date().toISOString(),
    totalTemplates: masterEntries.length,
    summary: {
      total: masterEntries.length,
      alreadyUsedIn2A: usedCount,
      queuedUnusedFreeWithPrompt: unusedFreeCount,
      queuedUnusedPremiumWithPreview: unusedPremiumCount
    },
    items: masterEntries
  };

  writeFileSync(bankJsonPath, JSON.stringify(bankPayload, null, 2), 'utf8');
  console.log(`\n[+] Wrote master prompt bank to: ${bankJsonPath}`);
  console.log(`    Total: ${masterEntries.length} | Already Used in 2A: ${usedCount} | Ready Unused Free (full prompt): ${unusedFreeCount} | Ready Unused Premium (video/poster preview): ${unusedPremiumCount}`);

  // Also write a clean Markdown summary index
  const usedListMd = masterEntries
    .filter(e => e.status === 'already_used_in_2A')
    .map((e, i) => `| ${i + 1} | \`${e.id}\` | ${e.title} | ${e.isFreeOnMotionsites ? 'Free' : 'Premium'} | \`${e.matched2ASlug}\` | ${e.matchReason} |`)
    .join('\n');

  const unusedFreeMd = masterEntries
    .filter(e => e.status === 'queued_unused' && e.isFreeOnMotionsites && e.prompt_text)
    .map((e, i) => `| ${i + 1} | \`${e.id}\` | ${e.title} | ${e.category} | ${e.promptLength.toLocaleString()} chars | ${e.videoPreviewUrl ? '[Video](' + e.videoPreviewUrl + ')' : '—'} |`)
    .join('\n');

  const unusedPremMd = masterEntries
    .filter(e => e.status === 'queued_unused' && !e.isFreeOnMotionsites)
    .slice(0, 100)
    .map((e, i) => `| ${i + 1} | \`${e.id}\` | ${e.title} | ${e.category} | ${e.videoPreviewUrl ? '[Preview](' + e.videoPreviewUrl + ')' : '—'} | ${e.imagePreviewUrl ? '[Poster](' + e.imagePreviewUrl + ')' : '—'} |`)
    .join('\n');

  const mdContent = `# Kho Dữ Liệu Tổng Hợp MotionSites.ai (\`motionsites-master-bank.json\`)

- **Thời điểm cập nhật:** \`${bankPayload.generatedAt}\`
- **Tổng số mẫu trên MotionSites.ai:** **${masterEntries.length} mẫu**
- **Đã sử dụng trong kho 2A (Đã khóa chống trùng):** **${usedCount} mẫu**
- **Mẫu Free chưa dùng (Đã tải sẵn toàn văn \`prompt_text\`):** **${unusedFreeCount} mẫu**
- **Mẫu Premium chưa dùng (Đã lấy sẵn \`video_preview_url\` & \`image_preview_url\`):** **${unusedPremiumCount} mẫu**

---

## 1. Danh sách ${usedCount} mẫu đã từng sử dụng trong dự án 2A (Đã loại trừ tự động)

| # | MotionSites ID | Tên trên MotionSites | Phân loại | Slug trong kho 2A | Lý do phát hiện trùng |
| :--- | :--- | :--- | :--- | :--- | :--- |
${usedListMd}

---

## 2. Danh sách ${unusedFreeCount} mẫu Free chưa dùng (Đã lưu trọn bộ \`prompt_text\` trong \`motionsites-master-bank.json\`)

| # | MotionSites ID | Tên mẫu | Danh mục | Độ dài Prompt | Video Preview |
| :--- | :--- | :--- | :--- | :--- | :--- |
${unusedFreeMd}

---

## 3. Danh sách mẫu Premium chưa dùng (Kèm Video Preview & Poster — Hiển thị 100/${unusedPremiumCount} mẫu đầu)

| # | MotionSites ID | Tên mẫu | Danh mục | Video Preview | Poster 1280px |
| :--- | :--- | :--- | :--- | :--- | :--- |
${unusedPremMd}
`;

  writeFileSync(bankMdPath, mdContent, 'utf8');
  console.log(`[+] Wrote Markdown catalog index to: ${bankMdPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
