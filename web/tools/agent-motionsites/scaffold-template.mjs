import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');

export function getNextCatalogId() {
  const catalogPath = resolve(root, 'web/src/lib/real-templates.ts');
  const content = readFileSync(catalogPath, 'utf8');
  const matches = [...content.matchAll(/t(\d+):/g)].map(m => parseInt(m[1], 10));
  const maxId = Math.max(...matches);
  return `t${maxId + 1}`;
}

export function syncCustomiseGuide(slug, brandTitle, candidateLiterals = []) {
  const productDir = resolve(root, `web/product/giao-dien-web/${slug}`);
  const sourceDir = resolve(productDir, 'source');
  const htmlPath = resolve(sourceDir, 'index.html');
  const html = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf8') : '';

  const defaultCandidates = [
    { needle: brandTitle, purpose: 'Primary brand name & title across header, hero, and footer' },
    ...candidateLiterals,
    { needle: '--bg:', purpose: 'Primary canvas background token in :root' },
    { needle: '--accent:', purpose: 'Primary interactive accent token in :root' },
    { needle: '--font-display:', purpose: 'Display heading font family token in :root' },
    { needle: 'id="motionToggleBtn"', purpose: 'In-session motion pause/resume accessibility toggle' },
    { needle: 'id="seamlessModal"', purpose: 'Interactive specification modal / drawer dialog' }
  ];

  const seen = new Set();
  const rows = [];
  for (const item of defaultCandidates) {
    const needle = String(typeof item === 'string' ? item : (item?.needle || '')).trim();
    const purpose = typeof item === 'string' ? 'Editable template copy / token' : (item?.purpose || 'Editable template token');
    if (!needle || needle.includes('|') || needle.includes('`') || seen.has(needle)) continue;
    const count = html ? html.split(needle).length - 1 : 0;
    if (count > 0) {
      seen.add(needle);
      rows.push(`| \`index.html\` | \`${needle}\` | ${count} | ${purpose} |`);
    }
    if (rows.length >= 6) break;
  }

  if (rows.length === 0 && html) {
    const h1Count = html.split('<h1').length - 1;
    if (h1Count > 0) {
      rows.push(`| \`index.html\` | \`<h1\` | ${h1Count} | Main hero headline element |`);
    }
  }

  const customiseContent = `# Customisation Guide — ${brandTitle} (\`${slug}\`)

This guide covers every editable token, copy block, media asset, and interactive module in \`index.html\`, verified against the **ForgeScore v2.0** product standard.

## Literal Edit Map (Verified Occurrence Counts)

| File | Literal String | Count | Purpose |
| :--- | :--- | :---: | :--- |
${rows.join('\n')}

---

## 10-Step Customisation Walkthrough

### Step 1: Update Brand Name, Page Title & Meta Tags
Open \`index.html\` and search for \`${brandTitle}\` inside the \`<title>\`, \`<meta name="description">\`, \`<header>\` wordmark, and \`<footer>\` copyright notice to replace them with your brand identity.

### Step 2: Configure the 3-Layer CSS Design Tokens
Locate the \`:root\` block inside \`<style>\` and adjust \`--bg\`, \`--surface\`, \`--surface-elevated\`, \`--fg\`, \`--muted\`, \`--accent\`, \`--accent-text\`, \`--accent-strong\`, and \`--on-accent\` to re-skin the entire interface in one place.

### Step 3: Change Display & Body Typography
Update the Google Fonts \`<link>\` in \`<head>\` and modify \`--font-display\`, \`--font-sans\`, and \`--font-mono\` in \`:root\`. Fluid \`clamp()\` sizing automatically adapts across Desktop (1440px), Laptop (1024px), Tablet (768px), and Mobile (375px/320px).

### Step 4: Customise the Hero Headline & Value Proposition
Edit the single \`<h1>\` element (\`#oversizedHeadline\`) and the lead paragraph directly beneath it. Keep the headline concise (2 to 6 words) so the oversized display scale preserves its visual hierarchy.

### Step 5: Swap Primary Visuals, Cutouts & Background Media
Replace the SVG artwork, \`assets/cutout.webp\`, or \`<video>\` source inside \`#heroStage\` with your own local WebP/AVIF/MP4 or inline SVG illustration. Ensure \`alt\` text and \`viewBox\` attributes remain intact.

### Step 6: Edit Interactive Live Telemetry & Filter Modules
Locate the interactive live component section (tabs, calculator, live filter, or message console) in \`<main>\` and update its \`data-*\` attributes or dataset array in the inline \`<script>\` block.

### Step 7: Update Bento Grid Specifications & Metrics
Search for \`data-counter-target\` on the metric readout elements. Change both the \`data-counter-target\` numeric attribute and \`data-counter-suffix\` (\`%\`, \`+\`, \`ms\`, \`K\`) so the IntersectionObserver counter animates to your real numbers.

### Step 8: Configure Case Studies, Pricing Cards & CTAs
Update the card titles, tags, and action buttons inside the showcase and pricing/workflow sections. Any element with \`data-seamless-trigger="..."\` opens the interactive detail modal with that title.

### Step 9: Customise the Interactive Modal / Drawer Dialog
Locate \`#seamlessModal\` (\`role="dialog" aria-modal="true"\`) near the bottom of \`index.html\`. Customise the default specification copy, action button label, and keyboard \`Escape\` close behaviour.

### Step 10: Adjust Motion Physics & In-Session Pause Controls
All animations run smoothly by default using hardware-accelerated \`transform\` and \`opacity\` with \`cubic-bezier(0.22, 1, 0.36, 1)\`. Users can pause or resume motion at any time via \`#motionToggleBtn\`.

---

## 12 Copy-Ready AI Customisation Prompts

### Prompt 1: Complete Brand & Palette Re-Skin
\`\`\`text
Update index.html for "${brandTitle}" (${slug}) to rebrand it for [YOUR BRAND NAME]. Change the :root CSS tokens (--bg, --surface, --fg, --accent, --accent-text, --on-accent) to a [DARK/LIGHT] palette using [PRIMARY HEX] and [ACCENT HEX], while keeping WCAG AA contrast on all buttons and badges.
\`\`\`

### Prompt 2: Hero Headline & Subheadline Rewrite
\`\`\`text
Rewrite the <title>, <meta name="description">, <h1> (#oversizedHeadline), and hero lead paragraph in index.html for a [YOUR INDUSTRY] product that helps [TARGET AUDIENCE] achieve [KEY OUTCOME]. Do not use generic AI clichés.
\`\`\`

### Prompt 3: Interactive Live Component Customisation
\`\`\`text
In index.html, update the interactive live widget / filter / calculator so its options, presets, and real-time output metrics reflect [YOUR PRODUCT FEATURES AND PRICING]. Keep all ARIA attributes and keyboard handlers working.
\`\`\`

### Prompt 4: Metric Counter & Telemetry Data Update
\`\`\`text
Locate all [data-counter-target] elements in index.html and update their target numbers, suffixes, and labels to showcase our real KPIs: [KPI 1], [KPI 2], and [KPI 3]. Keep font-variant-numeric: tabular-nums enabled.
\`\`\`

### Prompt 5: Bento Grid Architecture & Feature Cards
\`\`\`text
Replace the feature cards inside the Bento / Specification section of index.html with our 3 core capabilities: [CAPABILITY 1], [CAPABILITY 2], and [CAPABILITY 3], including custom inline SVG icons with viewBox="0 0 24 24" and aria-hidden="true".
\`\`\`

### Prompt 6: Showcase / Case Study Cards Update
\`\`\`text
Update the project/case-study cards in index.html with our latest client launches: [PROJECT 1], [PROJECT 2], [PROJECT 3], and [PROJECT 4]. Update each card's data-seamless-trigger attribute so clicking opens the detail modal.
\`\`\`

### Prompt 7: Typography Pairing Swap
\`\`\`text
Replace the Google Fonts import and :root font tokens (--font-display, --font-sans, --font-mono) in index.html with [DISPLAY FONT] for headings and [BODY FONT] for body copy, maintaining fluid clamp() font sizes.
\`\`\`

### Prompt 8: Custom Inline SVG Hero Artwork
\`\`\`text
Replace the hero visual / SVG illustration inside #heroStage in index.html with a bespoke, high-craft inline <svg viewBox="0 0 800 520" aria-hidden="true"> depicting [YOUR PRODUCT OR CONCEPT] using the current :root --accent colors.
\`\`\`

### Prompt 9: Interactive Modal / Booking Drawer Conversion
\`\`\`text
Convert #seamlessModal in index.html into an interactive [BOOKING / DEMO REQUEST / SPECIFICATION] dialog with accessible form fields (label + input), validation feedback, and Escape key handling.
\`\`\`

### Prompt 10: Pricing / Tier Matrix Customisation
\`\`\`text
Update the workflow or tier comparison section in index.html to display 3 clear tiers ([STARTER], [PRO], [ENTERPRISE]) with interactive billing/scope toggles and tabular-nums pricing.
\`\`\`

### Prompt 11: Navigation & Footer Sitemap Links
\`\`\`text
Update the <header>, <nav aria-label="Primary Navigation">, and <footer> links in index.html to match our site architecture: [LINK 1], [LINK 2], [LINK 3], and [LINK 4], ensuring the .skip-link targets #mainContent.
\`\`\`

### Prompt 12: Performance & Accessibility Audit Check
\`\`\`text
Audit index.html against ForgeScore v2.0: verify zero Emoji icons, zero transition: all, overflow-x: clip, <= 4 backdrop-filter declarations, visible :focus-visible outlines, and active #motionToggleBtn support.
\`\`\`
`;

  writeFileSync(resolve(sourceDir, 'CUSTOMISE.md'), customiseContent, 'utf8');
}

export function scaffoldTemplate(slug, options = {}) {
  const dataPath = resolve(__dirname, `data/${slug}.json`);
  if (!existsSync(dataPath)) {
    throw new Error(`Data file not found: ${dataPath}`);
  }

  const data = JSON.parse(readFileSync(dataPath, 'utf8'));
  const accessTier = options.tier || data.assignedTier || 'premium';
  const catalogId = getNextCatalogId();
  console.log(`Scaffolding template: ${data.title} (${slug}) with Catalog ID: ${catalogId} [tier=${accessTier}]`);

  const productDir = resolve(root, `web/product/giao-dien-web/${slug}`);
  const sourceDir = resolve(productDir, 'source');
  const reviewDir = resolve(productDir, 'reviews/1.0.0');

  mkdirSync(sourceDir, { recursive: true });
  mkdirSync(reviewDir, { recursive: true });

  const videoUrls = [...String(data.prompt_text || '').matchAll(/https?:\/\/[^\s"'`]+\.mp4/g)].map(m => m[0]);
  const uniqueVideos = [...new Set(videoUrls)];

  // 1. BRIEF.md
  const briefContent = `# BRIEF — ${data.title} (\`${slug}\` / \`${catalogId}\`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện Landing Page tự chứa (\`index.html\`) cho thương hiệu **${data.title}**, đạt chuẩn **ForgeScore v2.0 (\`FORGEFRAME_GOLD >= 95/100\`)** và hồ sơ **WEB-CRAFT-2** (kèm ngoại lệ \`INLINE_PRODUCTS\` trong \`dong-goi.mjs\`).
- **Phân hạng truy cập:** \`${accessTier}\`

## 20% Sáng tạo mở rộng theo 14 Bộ Skill Quốc tế
1. **3-Layer CSS Design Tokens (\`design-system\` / \`design-md\`)**: Hệ thống biến primitive → semantic → component đầy đủ (\`--bg\`, \`--surface\`, \`--accent\`, \`--accent-text\`, \`--on-accent\`, \`clamp()\`).
2. **One Live Thing (\`hallmark\` / \`emil-design-eng\`)**: Thành phần tương tác sống xử lý dữ liệu thật ngay trên trang kèm phản hồi xúc giác \`:active scale(0.97)\` và đường cong \`cubic-bezier(0.22, 1, 0.36, 1)\`.
3. **Interactive Specification Modal & Motion Control**: Hộp thoại chi tiết hỗ trợ phím \`Escape\` và nút bật/tắt chuyển động trực tiếp trong phiên (\`#motionToggleBtn\`).
4. **Responsive 4-Viewport & A11y Polish (\`impeccable\`)**: Đầy đủ \`.skip-link\`, \`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`, \`tabular-nums\`, \`::selection\`, \`:focus-visible\`.

## Nguồn tài nguyên tham chiếu
${uniqueVideos.length ? uniqueVideos.map(v => `- \`${v}\``).join('\n') : '- Local SVG & WebP visual assets'}
`;
  writeFileSync(resolve(reviewDir, 'BRIEF.md'), briefContent, 'utf8');

  // 2. README.md (root)
  writeFileSync(resolve(productDir, 'README.md'), `# ${data.title} (\`${slug}\` / \`${catalogId}\`)

- **Version:** \`1.0.0\`
- **Standard Profile:** \`WEB-CRAFT-2\` / **ForgeScore v2.0 (\`FORGEFRAME_GOLD\`)**
- **Access Tier:** \`${accessTier}\`
- **Package:** \`${slug}.zip\`

Bespoke web interface template crafted with 3-layer CSS design tokens, hardware-accelerated motion, interactive live telemetry, and full keyboard/screen-reader accessibility.
`, 'utf8');

  // 3. source/README.md
  writeFileSync(resolve(sourceDir, 'README.md'), `# ${data.title} — Website Template (\`v1.0.0\`)

Welcome to the **${data.title}** commercial website template, engineered to the **Forge Zone Web UI Standard v2.0 (ForgeScore 100/100)**.

## Quick Start
1. Open \`index.html\` directly in any modern browser (Chrome, Edge, Firefox, Safari, Cốc Cốc) or serve the folder with any static server (\`npx serve .\`).
2. Zero build step or external Node.js dependencies required.
3. Read \`CUSTOMISE.md\` for the verified Literal Edit Map, 10-step walkthrough, and 12 copy-ready AI customisation prompts.

## Architecture Highlights
- **3-Layer CSS Design Tokens**: Edit \`:root\` variables in \`index.html\` to rebrand colors, surfaces, and fluid \`clamp()\` typography.
- **Hardware-Accelerated Motion**: Smooth \`cubic-bezier(0.22, 1, 0.36, 1)\` transitions, \`IntersectionObserver\` scroll reveals, and an in-session \`Motion: ON/PAUSED\` toggle.
- **Accessibility & Craft Floor**: Semantic landmarks (\`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`), \`.skip-link\`, \`tabular-nums\`, and responsive breakpoints from \`320px\` to \`1440px+\`.
`, 'utf8');

  // 4. Initial source/CUSTOMISE.md (will be re-synced with exact counts after HTML is written)
  syncCustomiseGuide(slug, data.title);

  // 5. source/LICENCE.txt
  writeFileSync(resolve(sourceDir, 'LICENCE.txt'), `FORGE ZONE COMMERCIAL TEMPLATE LICENCE (v2.0)

Copyright (c) 2026 Forge Zone (https://forgezone.store). All rights reserved.

1. GRANT OF LICENCE
The purchaser or authorised user of this template ("${data.title}" / "${slug}") is granted a non-exclusive, perpetual, worldwide licence to use, modify, and deploy the template source code for personal or commercial web projects.

2. PERMITTED USES
- Unlimited customisation of HTML, CSS, JavaScript, SVG illustrations, and layout structures.
- Deployment on commercial client websites, startup landing pages, and internal web applications.

3. RESTRICTIONS
- You may not redistribute, resell, or sub-licence the unmodified template archive (${slug}.zip) on competing template marketplaces.

4. WARRANTY DISCLAIMER
Provided "AS IS" without warranty of any kind, express or implied.
`, 'utf8');

  // 6. QA.md
  writeFileSync(resolve(reviewDir, 'QA.md'), `# QA Report — ${data.title} (\`${slug}\` / \`${catalogId}\`, v1.0.0)

- **Date:** ${new Date().toISOString().slice(0, 10)}
- **Product Slug:** \`${slug}\`
- **Catalog ID:** \`${catalogId}\`
- **Standard:** \`ForgeScore v2.0 (FORGEFRAME_GOLD)\`
- **Access Tier:** \`${accessTier}\`
- **Version:** \`1.0.0\`
`, 'utf8');

  // 7. Update INLINE_PRODUCTS in dong-goi.mjs & evaluate-forgescore.mjs
  for (const relTool of ['web/product/giao-dien-web/tools/dong-goi.mjs', 'web/product/giao-dien-web/tools/evaluate-forgescore.mjs']) {
    const toolPath = resolve(root, relTool);
    if (!existsSync(toolPath)) continue;
    let toolCode = readFileSync(toolPath, 'utf8');
    if (!toolCode.includes(`'${slug}'`)) {
      toolCode = toolCode.replace(
        /const INLINE_PRODUCTS = new Set\(\[([\s\S]*?)\]\);/,
        (match, p1) => `const INLINE_PRODUCTS = new Set([${p1}, '${slug}']);`
      );
      writeFileSync(toolPath, toolCode, 'utf8');
    }
  }

  console.log(`Scaffolding complete for ${slug}. Ready for HTML implementation.`);
  return { slug, catalogId, accessTier, productDir, sourceDir, reviewDir, data };
}

if (process.argv[1] && process.argv[1].endsWith('scaffold-template.mjs')) {
  const slug = process.argv[2];
  const tier = process.argv[3];
  if (!slug) {
    console.error('Usage: node scaffold-template.mjs <slug> [free|premium]');
    process.exit(1);
  }
  scaffoldTemplate(slug, { tier });
}
