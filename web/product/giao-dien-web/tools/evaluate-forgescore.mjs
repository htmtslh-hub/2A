/* Công cụ kiểm toán và chấm điểm ForgeScore v2.0 (thang 100 điểm)
   cho các sản phẩm giao diện web trong web/product/giao-dien-web/<slug>/.

   Tích hợp tiêu chuẩn nền tảng của Forge Zone (WEB-STATIC-1, WEB-CRAFT-2,
   ForgeFrame, skill-morge, neon-orbit-border, Quy tắc Animation 05/10/2026)
   cùng 14 bộ Skill UI/UX & Motion quốc tế (hallmark, taste-skill, impeccable,
   emil-design-eng, ui-ux-pro-max, design-system, design-md, gsap-skills,
   dimensional-drawing, reference-design-contract, react-bits-canvas...).

   Cách dùng:
     node web/product/giao-dien-web/tools/evaluate-forgescore.mjs <slug>
     node web/product/giao-dien-web/tools/evaluate-forgescore.mjs <slug1> <slug2>
     node web/product/giao-dien-web/tools/evaluate-forgescore.mjs --all [--json <path>]
*/

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PRODUCT_ROOT = resolve(HERE, '..');
const WEB_ROOT = resolve(PRODUCT_ROOT, '..', '..');
const PREVIEWS_DIR = join(WEB_ROOT, 'public', 'previews');

const EXCLUDED_DIRS = new Set(['_design', 'design', 'docs', 'reviews', 'tools', 'free-sample']);

const INLINE_PRODUCTS = new Set([
  'spaceedu', 'fennec', 'riverine-ai', 'freight-axis', 'meridian', 'solaris-gate',
  'cyber-ronin', 'vertex-shops', 'aethera', 'nexlayer', 'toonhub', 'vectrus-energy',
  'halden', 'prmpt', 'designpro', 'cinematic', 'viktor', 'camper', 'sellix',
  'neuralkinetics', 'lumora', 'securify', 'cozypaws', 'synapsex', 'oceanpulse',
  'meadowbell', 'eclipsio', 'murmur', 'wander-far', 'iris', 'melli', 'reelmark',
  'cast-and-render', 'vanguard', 'targo', 'gridwork-co', 'vaultra', 'lauberhorn-ridge',
  'aetheris-voyage', 'digital-epoch', 'rivr', 'lumina', 'haul', 'vize-footer',
  'amazing-agency', 'glow-features', 'kresna-footer', 'price-calculator',
  'prisma-creative-studio', 'interactive-discovery', 'vex-ventures',
  'skyelite-private-jets', 'modern-agency', 'asme', 'cinder-axis', 'bishop-tentwenty',
  'fishfinger-creative', 'adoratorio-summer', 'micai-aristide', 'innovation',
  'orbis-nft', 'portfolio-cosmic', 'max-reed-portfolio', 'mindloop-landing',
  'codenest-coding-platform', 'digital-kensei', 'bame-esports', 'apex-upheaval',
  'nova-glass', 'alex-carter-ui', 'power-ai', 'bloom-ai', 'luminex',
  'transform-data', 'usd-halo', 'taskly', 'stellar-ai',
  'tripg-ocean', 'apex-squad-light', 'litera-bookstore', 'fischer-motorsport',
  'japan-sunrise-tour', 'datacore-booking', 'saas-software', 'neuralyn',
  'industrix-engineering', 'aquarium-animals',
  'flash-rocky-mountain', 'steary-spatial-cinema', 'swatch-luxury-chronograph',
  'digitwist-ai-builder', 'dot', 'email-marketing'
, 'calfin-weather', 'cybr-brutalism', 'aurelia-biocyber', 'hush-futurist-bags', 'quiet-place-sanctuary']);

const STATIC_ZIP_LIMIT = 20480;       // 20 KiB (WEB-STATIC-1)
const CRAFT_ZIP_LIMIT = 1048576;      // 1 MiB (WEB-CRAFT-2)

const EMOJI_ICON_RE = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
const SLOP_COPY_RE = /\b(Lorem ipsum|dolor sit amet|Unleash the power of|Elevate your digital|Revolutionize the way you|Seamless integration for modern)\b/i;

function readSafe(filePath) {
  try {
    return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
  } catch {
    return '';
  }
}

function walkFiles(dir, base = dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkFiles(full, base));
    } else if (entry.isFile()) {
      out.push(full.slice(base.length + 1).replace(/\\/g, '/'));
    }
  }
  return out.sort();
}

function extractInlineStyles(html) {
  const matches = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)];
  return matches.map(m => m[1]).join('\n');
}

function extractInlineScripts(html) {
  const matches = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
  return matches.map(m => m[1]).join('\n');
}

function computeDomShingles(html) {
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const target = mainMatch ? mainMatch[1] : html;
  const tagTokens = [];
  const tagRe = /<([a-z0-9]+)\b([^>]*)>/gi;
  let m;
  while ((m = tagRe.exec(target)) !== null) {
    const tag = m[1].toLowerCase();
    if (['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'defs', 'stop', 'lineargradient', 'radialgradient', 'clippath', 'tspan', 'br', 'wbr'].includes(tag)) {
      continue;
    }
    const clsMatch = m[2].match(/\bclass=["']([^"']+)["']/i);
    const firstClass = clsMatch ? clsMatch[1].trim().split(/\s+/)[0] : '';
    tagTokens.push(`${tag}${firstClass ? '.' + firstClass : ''}`);
  }
  const shingles = new Set();
  for (let i = 0; i < tagTokens.length - 2; i++) {
    shingles.add(`${tagTokens[i]}>${tagTokens[i + 1]}>${tagTokens[i + 2]}`);
  }
  return shingles;
}

function jaccardSimilarity(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let inter = 0;
  for (const item of setA) {
    if (setB.has(item)) inter++;
  }
  return inter / (setA.size + setB.size - inter);
}

function verifyCustomiseCounts(customiseMd, srcDir, html) {
  const issues = [];
  let checked = 0;
  for (const line of customiseMd.split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map(c => c.trim());
    if (cells.length < 3) continue;

    // Format 1 (check-template.mjs): | `index.html` | `needle` | 4 | ... |
    if (/^`(?:index\.html|assets\/[^`]+)`$/.test(cells[0]) && /^`[^`]+`$/.test(cells[1]) && /^\d+(?:\s*[×x])?$/i.test(cells[2])) {
      checked++;
      const relFile = cells[0].slice(1, -1);
      const needle = cells[1].slice(1, -1);
      const expected = parseInt(cells[2], 10);
      const content = readSafe(join(srcDir, relFile));
      const actual = content ? content.split(needle).length - 1 : -1;
      if (actual !== expected) issues.push(`${relFile} "${needle}": ghi ${expected} nhưng có ${actual}`);
      continue;
    }

    // Format 2 (watchroom): | `WATCHROOM` | 2 | `index.html` |
    if (/^`[^`]+`$/.test(cells[0]) && /^\d+(?:\s*[×x])?$/i.test(cells[1]) && /^`(?:index\.html|assets\/[^`]+)`$/.test(cells[2])) {
      checked++;
      const needle = cells[0].slice(1, -1);
      const expected = parseInt(cells[1], 10);
      const relFile = cells[2].slice(1, -1);
      const content = readSafe(join(srcDir, relFile));
      const actual = content ? content.split(needle).length - 1 : -1;
      if (actual !== expected) issues.push(`${relFile} "${needle}": ghi ${expected} nhưng có ${actual}`);
      continue;
    }

    // Format 3 (kinetiq): | `Kinetiq` | 6 | browser tab... |
    if (/^`[^`]+`$/.test(cells[0]) && /^\d+(?:\s*[×x])?$/i.test(cells[1])) {
      checked++;
      const needle = cells[0].slice(1, -1);
      const expected = parseInt(cells[1], 10);
      const actual = html.split(needle).length - 1;
      if (actual !== expected) issues.push(`index.html "${needle}": ghi ${expected} nhưng có ${actual}`);
      continue;
    }

    // Format 4: | Label | `needle` | 4× | ... |
    const countMatch = cells[2]?.match(/^(\d+)\s*[×x]?$/i);
    const litMatch = cells[1]?.match(/^`([^`]+)`$/);
    if (countMatch && litMatch && !/^`/.test(cells[0])) {
      checked++;
      const expected = Number(countMatch[1]);
      const literal = litMatch[1];
      const actual = html.split(literal).length - 1;
      if (actual !== expected) {
        issues.push(`"${literal}": ghi ${expected}× nhưng trong index.html có ${actual}×`);
      }
    }
  }
  return { checked, issues };
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

function evaluateProduct(slug, allShinglesMap) {
  const dir = join(PRODUCT_ROOT, slug);
  const srcDir = join(dir, 'source');
  const zipPath = join(dir, `${slug}.zip`);
  const htmlPath = join(srcDir, 'index.html');
  const cssPath = existsSync(join(srcDir, 'assets', 'css', 'style.css'))
    ? join(srcDir, 'assets', 'css', 'style.css')
    : join(srcDir, 'styles.css');
  const jsPath = existsSync(join(srcDir, 'assets', 'js', 'main.js'))
    ? join(srcDir, 'assets', 'js', 'main.js')
    : join(srcDir, 'script.js');

  const html = readSafe(htmlPath);
  const externalCss = readSafe(cssPath);
  const externalJs = readSafe(jsPath);
  const css = [externalCss, extractInlineStyles(html)].filter(Boolean).join('\n');
  const js = [externalJs, extractInlineScripts(html)].filter(Boolean).join('\n');
  const customise = readSafe(join(srcDir, 'CUSTOMISE.md'));
  const srcReadme = readSafe(join(srcDir, 'README.md'));
  const rootReadme = readSafe(join(dir, 'README.md'));
  const licence = readSafe(join(srcDir, 'LICENCE.txt'));
  const files = walkFiles(srcDir);
  const zipSize = existsSync(zipPath) ? statSync(zipPath).size : 0;

  const hasExtraMedia = files.some(f => /\.(webp|png|jpg|jpeg|avif|mp4|webm|woff2?)$/i.test(f));
  const isInlineBundle = INLINE_PRODUCTS.has(slug) || (!externalCss && css.length > 0);
  const profile = (!hasExtraMedia && !isInlineBundle && zipSize > 0 && zipSize < STATIC_ZIP_LIMIT)
    ? 'WEB-STATIC-1'
    : 'WEB-CRAFT-2';

  const hardFails = [];
  const warnings = [];
  const deductions = [];

  // ---- Hard Fail Checks ----------------------------------------------------
  if (!html) hardFails.push('HF02: Thiếu source/index.html');
  if (!zipSize) hardFails.push('HF02: Thiếu gói <slug>.zip');

  const extScripts = [...html.matchAll(/<script\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["']/gi)].map(m => m[1]);
  const extLinks = [...html.matchAll(/<link\b[^>]*\bhref=["'](https?:\/\/[^"']+)["']/gi)]
    .map(m => m[1])
    .filter(u => !/^https:\/\/fonts\.(googleapis|gstatic)\.com\b/i.test(u));
  const extImgs = [...html.matchAll(/<img\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["']/gi)].map(m => m[1]);
  if (extScripts.length || extLinks.length || extImgs.length) {
    hardFails.push(`HF01: Phụ thuộc CDN/tài nguyên ngoài trái phép (${[...extScripts, ...extLinks, ...extImgs].slice(0, 2).join(', ')})`);
  }
  if (/\bLorem ipsum\b/i.test(html)) {
    hardFails.push('HF03: Còn chữ giả "Lorem ipsum" trong index.html');
  }

  // ---- TRỤC 1: Kiến trúc, Ý tưởng & Chống AI-Slop (25 điểm) ----------------
  let axis1 = 0;

  // A1.1 No Emoji as UI Icons (4.0 pts)
  const htmlWithoutComments = html.replace(/<!--[\s\S]*?-->/g, '');
  const emojiMatches = [...new Set(htmlWithoutComments.match(EMOJI_ICON_RE) || [])];
  if (emojiMatches.length === 0) {
    axis1 += 4.0;
  } else {
    const pts = Math.max(0, 4.0 - emojiMatches.length * 1.5);
    axis1 += pts;
    deductions.push(`[A1.1 -${round1(4.0 - pts)}đ] Dùng ký tự Emoji/Unicode làm icon (${emojiMatches.slice(0, 5).join(' ')}) thay vì SVG (taste-skill / hallmark)`);
  }

  // A1.2 No transition: all (4.0 pts)
  const transitionAllCount = (css.match(/transition(?:-property)?\s*:\s*[^;{}]*\ball\b/gi) || []).length;
  if (transitionAllCount === 0) {
    axis1 += 4.0;
  } else {
    const pts = Math.max(0, 4.0 - transitionAllCount * 1.5);
    axis1 += pts;
    deductions.push(`[A1.2 -${round1(4.0 - pts)}đ] Dùng "transition: all" (${transitionAllCount} vị trí) gây layout thrashing (hallmark / animation-performance)`);
  }

  // A1.3 Viewport & Sticky Safety: no 100vw & no html/body overflow-x: hidden (4.0 pts)
  let a13 = 4.0;
  if (/\bwidth\s*:\s*100vw\b/i.test(css)) {
    a13 -= 2.0;
    deductions.push('[A1.3 -2.0đ] Dùng "width: 100vw" gây tràn thanh cuộn ngang trên Windows (hallmark Floor)');
  }
  if (/(?:html|body)\s*\{[^}]*\boverflow-x\s*:\s*hidden\b/i.test(css)) {
    a13 -= 2.0;
    deductions.push('[A1.3 -2.0đ] Dùng "overflow-x: hidden" trên html/body làm hỏng position: sticky; nên dùng "overflow-x: clip" (hallmark Floor)');
  }
  axis1 += Math.max(0, a13);

  // A1.4 Section Rhythm & Archetype Diversity (5.0 pts)
  const sectionCount = (html.match(/<(?:section|article)\b/gi) || []).length;
  if (sectionCount >= 5) {
    axis1 += 5.0;
  } else if (sectionCount >= 3) {
    axis1 += 3.5;
    deductions.push(`[A1.4 -1.5đ] Số phân đoạn nội dung (<section>/<article>) hơi ít (${sectionCount} < 5)`);
  } else {
    axis1 += 1.5;
    deductions.push(`[A1.4 -3.5đ] Cấu trúc trang quá ngắn (${sectionCount} <section>)`);
  }

  // A1.5 Anti-Clone DOM Uniqueness (< 45% Jaccard similarity) (4.0 pts)
  let maxSim = 0;
  let mostSimilarSlug = '';
  const myShingles = allShinglesMap.get(slug);
  if (myShingles && myShingles.size > 0) {
    for (const [otherSlug, otherShingles] of allShinglesMap.entries()) {
      if (otherSlug === slug) continue;
      const sim = jaccardSimilarity(myShingles, otherShingles);
      if (sim > maxSim) {
        maxSim = sim;
        mostSimilarSlug = otherSlug;
      }
    }
  }
  if (maxSim < 0.45) {
    axis1 += 4.0;
  } else {
    const pts = maxSim < 0.65 ? 2.0 : 0.0;
    axis1 += pts;
    deductions.push(`[A1.5 -${round1(4.0 - pts)}đ] Độ trùng lặp cấu trúc DOM cao (${Math.round(maxSim * 100)}% với "${mostSimilarSlug}", ngưỡng < 45%)`);
  }

  // A1.6 Authentic Copywriting & Domain Depth (4.0 pts)
  if (!SLOP_COPY_RE.test(html)) {
    axis1 += 4.0;
  } else {
    axis1 += 1.0;
    deductions.push('[A1.6 -3.0đ] Copywriting chứa cụm từ sáo rỗng AI-slop hoặc placeholder');
  }

  // ---- TRỤC 2: Hệ thống Token, Màu sắc & Chi tiết Bề mặt (20 điểm) ---------
  let axis2 = 0;

  // A2.1 3-Layer CSS Token Architecture in :root (5.0 pts)
  const rootCustomProps = new Set((css.match(/--[a-z0-9-]+\s*:/gi) || []).map(s => s.replace(/\s*:$/, '').toLowerCase()));
  if (rootCustomProps.size >= 10) {
    axis2 += 5.0;
  } else if (rootCustomProps.size >= 5) {
    axis2 += 3.0;
    deductions.push(`[A2.1 -2.0đ] Hệ thống CSS Custom Properties trong :root còn mỏng (${rootCustomProps.size} biến < 10)`);
  } else {
    deductions.push(`[A2.1 -5.0đ] Thiếu kiến trúc CSS Design Tokens trong :root (${rootCustomProps.size} biến)`);
  }

  // A2.2 Dual-Accent Contrast Separation (--accent + --accent-text / --accent-ink / --accent-hover / --accent-strong / --accent-2) (3.0 pts)
  const hasPrimaryAccent = [...rootCustomProps].some(p => p.includes('accent') || p.includes('primary') || p.includes('brand') || p.includes('gold') || p.includes('amber') || p.includes('crimson') || p.includes('emerald'));
  const hasSecondaryOrTextAccent = [...rootCustomProps].some(p =>
    p === '--accent-text' || p === '--accent-ink' || p === '--accent-fg' ||
    p === '--accent-strong' || p === '--accent-dark' || p === '--accent-light' ||
    p === '--accent-hover' || p === '--accent-2' || p === '--accent-secondary' ||
    p === '--on-accent' || p === '--primary-fg'
  );
  if (hasPrimaryAccent && hasSecondaryOrTextAccent) {
    axis2 += 3.0;
  } else if (hasPrimaryAccent) {
    axis2 += 1.5;
    deductions.push('[A2.2 -1.5đ] Có token màu nhấn nhưng chưa tách rõ --accent-text / --accent-strong / --on-accent bảo vệ tương phản chữ (hallmark Rule 4)');
  } else {
    deductions.push('[A2.2 -3.0đ] Thiếu token màu nhấn ngữ nghĩa (--accent / --accent-text)');
  }

  // A2.3 Expressive Typography & Fluid clamp() Scale (4.0 pts)
  const hasClamp = /\bclamp\s*\(/i.test(css);
  const hasFontTokens = [...rootCustomProps].some(p => p.includes('font') || p.includes('display') || p.includes('sans') || p.includes('serif') || p.includes('mono'));
  let a23 = 0;
  if (hasClamp) a23 += 2.5;
  else deductions.push('[A2.3 -2.5đ] Thiếu hàm clamp() cho cỡ chữ/khoảng cách linh hoạt (design-system)');
  if (hasFontTokens || /@import\s+url\(|fonts\.googleapis\.com/i.test(html + css)) a23 += 1.5;
  else deductions.push('[A2.3 -1.5đ] Chưa định nghĩa token phông chữ rõ ràng');
  axis2 += a23;

  // A2.4 Browser Surfaces: ::selection, :focus-visible, tabular-nums (4.0 pts)
  let a24 = 0;
  if (/::selection\b/i.test(css)) {
    a24 += 1.25;
  } else {
    deductions.push('[A2.4 -1.25đ] Thiếu tuỳ biến màu bôi đen chữ ::selection (impeccable craft-floor)');
  }
  if (/:focus-visible\b/i.test(css)) {
    a24 += 1.5;
  } else {
    deductions.push('[A2.4 -1.5đ] Thiếu kiểu :focus-visible rõ ràng cho điều hướng bàn phím (impeccable / a11y)');
  }
  if (/tabular-nums\b/i.test(css)) {
    a24 += 1.25;
  } else {
    deductions.push('[A2.4 -1.25đ] Thiếu font-variant-numeric: tabular-nums cho số liệu/giá/bộ đếm (impeccable / hallmark)');
  }
  axis2 += a24;

  // A2.5 Surface Depth & Blur Budget (4.0 pts)
  let a25 = 4.0;
  const blurCount = (css.match(/backdrop-filter\s*:\s*blur\(/gi) || []).length;
  if (blurCount > 4) {
    a25 -= 2.0;
    deductions.push(`[A2.5 -2.0đ] Lạm dụng backdrop-filter: blur() (${blurCount} nơi > 4) gây tụt FPS khi cuộn (animation-performance)`);
  }
  if (!/\bborder-radius\b/i.test(css) && !/\bborder\b/i.test(css)) {
    a25 -= 2.0;
  }
  axis2 += Math.max(0, a25);

  // ---- TRỤC 3: Chuyển động, Vật lý Tương tác & One Live Thing (20 điểm) ----
  let axis3 = 0;

  // A3.1 Owner Rule 05/10/2026: Animation Default ON + Motion Control (5.0 pts)
  // Check if @media (prefers-reduced-motion: reduce) unconditionally kills all animations/transitions
  const prmBlocks = [...css.matchAll(/@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{([\s\S]*?\})\s*\}/gi)].map(m => m[1]);
  const killsMotionOnOS = prmBlocks.some(b => /animation(?:-duration)?\s*:\s*(?:none|0(?:\.0+)?m?s)\s*!important/i.test(b));
  const jsSkipsOnOS = /matchMedia\s*\(\s*['"]\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)['"]\s*\)\.matches/i.test(js)
    && !/dataset\.motion|motionPaused|isMotionPaused|motion-toggle|data-motion/i.test(js);
  const hasExplicitMotionToggle = /data-motion|motion-toggle|motionPaused|pause-motion|toggleMotion/i.test(html + css + js);

  let a31 = 0;
  if (!killsMotionOnOS && !jsSkipsOnOS) {
    a31 += 3.5;
  } else {
    a31 += 1.0;
    deductions.push('[A3.1 -2.5đ] Đang tự động tắt animation theo prefers-reduced-motion của hệ điều hành (vi phạm Quy tắc Chủ sản phẩm 05/10/2026: Animation phải mặc định BẬT trên mọi trình duyệt)');
  }
  if (hasExplicitMotionToggle) {
    a31 += 1.5;
  } else {
    deductions.push('[A3.1 -1.5đ] Chưa có cơ chế/nút tạm dừng chuyển động chủ động trong phiên (data-motion / motion-toggle) theo Quy tắc 05/10/2026');
  }
  axis3 += a31;

  // A3.2 Emil Kowalski Easing & Tactile :active Press Feedback (4.0 pts)
  let a32 = 0;
  if (/cubic-bezier\s*\(/i.test(css)) {
    a32 += 2.0;
  } else {
    deductions.push('[A3.2 -2.0đ] Chưa dùng đường cong vật lý cubic-bezier() tuỳ chỉnh (emil-design-eng)');
  }
  if (/:active\b[^}]*(?:scale\s*\(|translateY\s*\()/i.test(css)) {
    a32 += 2.0;
  } else {
    deductions.push('[A3.2 -2.0đ] Nút bấm thiếu phản hồi xúc giác :active transform scale(0.97)/translateY(1px) (emil-design-eng)');
  }
  axis3 += a32;

  // A3.3 One Live Thing Interactive Component (5.0 pts)
  const eventListenerCount = (js.match(/\baddEventListener\s*\(/g) || []).length;
  const hasInteractiveLogic = /\b(?:dataset|classList\.(?:add|remove|toggle)|setAttribute\s*\(\s*['"]aria-|requestAnimationFrame|getContext\s*\(\s*['"]2d['"]\))/i.test(js);
  if (eventListenerCount >= 3 && hasInteractiveLogic) {
    axis3 += 5.0;
  } else if (eventListenerCount >= 1 && hasInteractiveLogic) {
    axis3 += 3.0;
    deductions.push(`[A3.3 -2.0đ] Mức độ tương tác JS (One Live Thing) còn đơn giản (${eventListenerCount} listener)`);
  } else {
    deductions.push('[A3.3 -5.0đ] Thiếu thành phần tương tác sống (One Live Thing) hoạt động thật bằng JS');
  }

  // A3.4 Finite requestAnimationFrame & Scroll Reveal Choreography (4.0 pts)
  const hasRaf = /\brequestAnimationFrame\b/.test(js);
  const hasIO = /\bIntersectionObserver\b/.test(js);
  const hasKeyframes = /@keyframes\b/i.test(css);
  if (hasRaf && (hasIO || hasKeyframes)) {
    axis3 += 4.0;
  } else if (hasIO || hasRaf || hasKeyframes) {
    axis3 += 2.5;
    if (!hasRaf) {
      deductions.push('[A3.4 -1.5đ] Chưa có đường chạy requestAnimationFrame hữu hạn dự phòng cho hiệu ứng quan trọng (Quy tắc 05/10/2026)');
    }
  } else {
    deductions.push('[A3.4 -4.0đ] Thiếu hoạt cảnh cuộn (IntersectionObserver) và requestAnimationFrame');
  }

  // A3.5 Composite-Only Performance Budget (2.0 pts)
  const badAnimProps = css.match(/transition(?:-property)?\s*:[^;{}]*\b(?:width|height|top|left|margin|padding)\b/gi) || [];
  if (badAnimProps.length === 0) {
    axis3 += 2.0;
  } else {
    const pts = Math.max(0, 2.0 - badAnimProps.length * 0.75);
    axis3 += pts;
    deductions.push(`[A3.5 -${round1(2.0 - pts)}đ] Transition trực tiếp thuộc tính gây reflow (${badAnimProps.length} nơi: width/height/top/left/margin/padding)`);
  }

  // ---- TRỤC 4: Đa thiết bị, Khả năng truy cập & Độ bền (20 điểm) ------------
  let axis4 = 0;

  // A4.1 Semantic HTML5 Landmarks & Single <h1> (5.0 pts)
  const hasHeader = /<header\b/i.test(html);
  const hasNav = /<nav\b/i.test(html);
  const hasMain = /<main\b/i.test(html);
  const hasFooter = /<footer\b/i.test(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  let a41 = 0;
  if (hasHeader && hasNav && hasMain && hasFooter) {
    a41 += 3.0;
  } else {
    const missingLandmarks = [
      !hasHeader && '<header>',
      !hasNav && '<nav>',
      !hasMain && '<main>',
      !hasFooter && '<footer>'
    ].filter(Boolean);
    a41 += Math.max(0, 3.0 - missingLandmarks.length * 1.0);
    deductions.push(`[A4.1 -${round1(3.0 - a41)}đ] Thiếu landmark ngữ nghĩa: ${missingLandmarks.join(', ')}`);
  }
  if (h1Count === 1) {
    a41 += 2.0;
  } else {
    deductions.push(`[A4.1 -2.0đ] Số lượng thẻ <h1> không chuẩn (hiện có ${h1Count}, chuẩn = 1)`);
  }
  axis4 += a41;

  // A4.2 Keyboard Skip-Link & ARIA Semantics (4.0 pts)
  let a42 = 0;
  const hasSkipLink = /class=["'][^"']*skip[-_]?link|href=["']#main/i.test(html);
  const hasAria = /\baria-(?:label|labelledby|expanded|controls|current|live|hidden)\b/i.test(html);
  if (hasSkipLink) {
    a42 += 2.0;
  } else {
    deductions.push('[A4.2 -2.0đ] Thiếu liên kết bỏ qua điều hướng (.skip-link / href="#main") cho bàn phím');
  }
  if (hasAria) {
    a42 += 2.0;
  } else {
    deductions.push('[A4.2 -2.0đ] Thiếu thuộc tính ARIA trên các điều khiển tương tác');
  }
  axis4 += a42;

  // A4.3 SVG Discipline: viewBox + A11y (4.0 pts)
  const svgTags = [...html.matchAll(/<svg\b([^>]*)>/gi)].map(m => m[1]);
  if (svgTags.length > 0) {
    const missingViewBox = svgTags.filter(attrs => !/\bviewBox\s*=/i.test(attrs)).length;
    const missingSvgA11y = svgTags.filter(attrs => !/\b(?:aria-hidden|aria-label|aria-labelledby|role)\s*=/i.test(attrs)).length;
    let a43 = 4.0;
    if (missingViewBox > 0) {
      a43 -= Math.min(2.0, missingViewBox * 0.5);
      deductions.push(`[A4.3] ${missingViewBox}/${svgTags.length} thẻ <svg> thiếu viewBox`);
    }
    if (missingSvgA11y > 0) {
      a43 -= Math.min(2.0, missingSvgA11y * 0.5);
      deductions.push(`[A4.3] ${missingSvgA11y}/${svgTags.length} thẻ <svg> thiếu aria-hidden="true" hoặc role="img"`);
    }
    axis4 += Math.max(0, a43);
  } else {
    axis4 += 1.0;
    deductions.push('[A4.3 -3.0đ] Không có đồ họa/icon inline <svg> nào trong HTML');
  }

  // A4.4 Multi-Viewport Responsive Design (4.0 pts)
  const mediaQueries = css.match(/@media\b[^{]+/gi) || [];
  const breakpointQueries = mediaQueries.filter(q => /\b(?:max-width|min-width)\b/i.test(q));
  if (breakpointQueries.length >= 2) {
    axis4 += 4.0;
  } else if (breakpointQueries.length === 1) {
    axis4 += 2.5;
    deductions.push('[A4.4 -1.5đ] Chỉ có 1 breakpoint @media; khuyến nghị tối thiểu 2 mốc (Tablet & Mobile)');
  } else {
    deductions.push('[A4.4 -4.0đ] Thiếu @media (max-width/min-width) cho đa thiết bị');
  }

  // A4.5 No-JS & Offline Resilience (3.0 pts)
  const hidesBodyWithoutJsGuard = /body\s*\{[^}]*\bopacity\s*:\s*0\b/i.test(css);
  if (!hidesBodyWithoutJsGuard && extScripts.length === 0 && extImgs.length === 0) {
    axis4 += 3.0;
  } else {
    axis4 += 1.0;
    deductions.push('[A4.5 -2.0đ] Trang có nguy cơ trắng nội dung khi tắt JS hoặc mất mạng');
  }

  // ---- TRỤC 5: Đóng gói, Tài liệu Khách hàng & Tài nguyên Cửa hàng (15 điểm)
  let axis5 = 0;

  // A5.1 Source & ZIP Integrity + Profile Byte Budget (5.0 pts)
  const hasCoreDocs = Boolean(html && customise && srcReadme && licence);
  let a51 = 0;
  if (hasCoreDocs) a51 += 2.5;
  else deductions.push('[A5.1 -2.5đ] Thiếu file bắt buộc trong source/ (index.html, CUSTOMISE.md, README.md, LICENCE.txt)');

  if (zipSize > 0) {
    if (profile === 'WEB-STATIC-1' && zipSize < STATIC_ZIP_LIMIT) {
      a51 += 2.5;
    } else if (profile === 'WEB-CRAFT-2' && zipSize <= CRAFT_ZIP_LIMIT) {
      a51 += 2.5;
    } else {
      a51 += 1.0;
      deductions.push(`[A5.1 -1.5đ] Dung lượng ZIP (${zipSize.toLocaleString('en-US')} B) vượt ngưỡng ${profile} (${CRAFT_ZIP_LIMIT.toLocaleString('en-US')} B)`);
    }
  } else {
    deductions.push('[A5.1 -2.5đ] Chưa đóng gói file <slug>.zip');
  }
  axis5 += a51;

  // A5.2 CUSTOMISE.md Structure (10 Steps, 12 Prompts, Exact Literal Counts) (5.0 pts)
  let a52 = 0;
  if (customise) {
    const stepMatches = customise.match(/^#{2,3}\s+(?:(?:Step|Bước|步骤)\s+\d+|\d+\.\s+)/gim) || [];
    const promptMatches = customise.match(/(?:\*\*Prompt\s+\d+|^#{2,4}\s*Prompt\s+\d+|^\d+\.\s+\*\*)/gim) || [];
    if (stepMatches.length >= 10) a52 += 1.5;
    else if (stepMatches.length >= 8) {
      a52 += 1.0;
      deductions.push(`[A5.2 -0.5đ] CUSTOMISE.md có ${stepMatches.length}/10 bước hướng dẫn`);
    } else {
      deductions.push(`[A5.2 -1.5đ] CUSTOMISE.md có ${stepMatches.length}/10 bước hướng dẫn`);
    }

    if (promptMatches.length >= 12) a52 += 1.5;
    else if (promptMatches.length >= 8) {
      a52 += 1.0;
      deductions.push(`[A5.2 -0.5đ] CUSTOMISE.md có ${promptMatches.length}/12 AI prompts`);
    } else {
      deductions.push(`[A5.2 -1.5đ] CUSTOMISE.md có ${promptMatches.length}/12 AI prompts`);
    }

    const countCheck = verifyCustomiseCounts(customise, srcDir, html);
    if (countCheck.checked > 0 && countCheck.issues.length === 0) {
      a52 += 2.0;
    } else if (countCheck.issues.length > 0) {
      const pts = Math.max(0, 2.0 - countCheck.issues.length * 0.5);
      a52 += pts;
      deductions.push(`[A5.2 -${round1(2.0 - pts)}đ] Sai lệch số đếm chuỗi trong CUSTOMISE.md: ${countCheck.issues.slice(0, 2).join('; ')}`);
    } else {
      a52 += 1.0;
      deductions.push('[A5.2 -1.0đ] CUSTOMISE.md thiếu bảng Edit Map có cột số lần xuất hiện');
    }
  } else {
    deductions.push('[A5.2 -5.0đ] Thiếu file source/CUSTOMISE.md');
  }
  axis5 += a52;

  // A5.3 README.md & LICENCE.txt Completeness (2.5 pts)
  let a53 = 0;
  if (srcReadme.length > 200 && licence.length > 200) a53 += 1.5;
  else deductions.push('[A5.3 -1.5đ] source/README.md hoặc LICENCE.txt quá ngắn/thiếu thông tin');
  if (rootReadme.length > 50) a53 += 1.0;
  else deductions.push('[A5.3 -1.0đ] Thiếu hồ sơ <slug>/README.md ở thư mục gốc sản phẩm');
  axis5 += a53;

  // A5.4 Store Preview Assets (<slug>.webp + <slug>.mp4) (2.5 pts)
  const webpPath = join(PREVIEWS_DIR, `${slug}.webp`);
  const mp4Path = join(PREVIEWS_DIR, `${slug}.mp4`);
  const hasWebp = existsSync(webpPath) && statSync(webpPath).size > 0;
  const hasMp4 = existsSync(mp4Path) && statSync(mp4Path).size > 0;
  if (hasWebp && hasMp4) {
    axis5 += 2.5;
  } else {
    if (hasWebp) axis5 += 1.25;
    else deductions.push(`[A5.4 -1.25đ] Thiếu ảnh bìa preview cửa hàng public/previews/${slug}.webp`);
    if (hasMp4) axis5 += 1.25;
    else deductions.push(`[A5.4 -1.25đ] Thiếu video preview cửa hàng public/previews/${slug}.mp4`);
  }

  axis1 = round1(axis1);
  axis2 = round1(axis2);
  axis3 = round1(axis3);
  axis4 = round1(axis4);
  axis5 = round1(axis5);

  const total = round1(axis1 + axis2 + axis3 + axis4 + axis5);
  let grade = 'NEEDS_REWORK';
  if (hardFails.length > 0) {
    grade = 'HARD_FAIL';
  } else if (total >= 95.0) {
    grade = 'FORGEFRAME_GOLD (>=95)';
  } else if (total >= 90.0) {
    grade = 'PASS_STANDARD (>=90)';
  } else if (total >= 80.0) {
    grade = 'NEAR_PASS (80-89.9)';
  }

  return {
    slug,
    profile,
    zipSize,
    fileCount: files.length,
    total,
    grade,
    axes: {
      axis1_architecture_antislop: axis1,
      axis2_tokens_surfaces: axis2,
      axis3_motion_live_thing: axis3,
      axis4_responsive_a11y: axis4,
      axis5_packaging_docs: axis5
    },
    maxSimilarity: round1(maxSim * 100),
    mostSimilarSlug,
    hardFails,
    deductions,
    warnings
  };
}

// ---- CLI Entrypoint --------------------------------------------------------
const args = process.argv.slice(2);
const runAll = args.includes('--all');
const jsonIdx = args.indexOf('--json');
const jsonOutPath = jsonIdx !== -1 ? args[jsonIdx + 1] : null;
const targetSlugs = args.filter((a, i) => !a.startsWith('--') && (jsonIdx === -1 || i !== jsonIdx + 1));

const allProductSlugs = readdirSync(PRODUCT_ROOT, { withFileTypes: true })
  .filter(d => d.isDirectory() && !EXCLUDED_DIRS.has(d.name) && existsSync(join(PRODUCT_ROOT, d.name, 'source')))
  .map(d => d.name)
  .sort();

const slugsToEvaluate = runAll ? allProductSlugs : targetSlugs;

if (slugsToEvaluate.length === 0) {
  console.error('Cách dùng: node web/product/giao-dien-web/tools/evaluate-forgescore.mjs <slug> | --all [--json <path>]');
  process.exit(1);
}

// Precompute DOM shingles across catalog for Anti-Clone check (A1.5)
const allShinglesMap = new Map();
for (const slug of allProductSlugs) {
  const html = readSafe(join(PRODUCT_ROOT, slug, 'source', 'index.html'));
  if (html) {
    allShinglesMap.set(slug, computeDomShingles(html));
  }
}

const results = slugsToEvaluate.map(slug => evaluateProduct(slug, allShinglesMap));

if (jsonOutPath) {
  const fullOut = resolve(process.cwd(), jsonOutPath);
  mkdirSync(dirname(fullOut), { recursive: true });
  const summary = {
    generatedAt: new Date().toISOString(),
    standardVersion: 'ForgeScore v2.0 (product-standards.md v2.0.0)',
    totalEvaluated: results.length,
    averageScore: round1(results.reduce((s, r) => s + r.total, 0) / results.length),
    countsByGrade: {
      FORGEFRAME_GOLD: results.filter(r => r.grade.startsWith('FORGEFRAME_GOLD')).length,
      PASS_STANDARD: results.filter(r => r.grade.startsWith('PASS_STANDARD')).length,
      NEAR_PASS: results.filter(r => r.grade.startsWith('NEAR_PASS')).length,
      NEEDS_REWORK: results.filter(r => r.grade === 'NEEDS_REWORK').length,
      HARD_FAIL: results.filter(r => r.grade === 'HARD_FAIL').length
    },
    countsByProfile: {
      'WEB-STATIC-1': results.filter(r => r.profile === 'WEB-STATIC-1').length,
      'WEB-CRAFT-2': results.filter(r => r.profile === 'WEB-CRAFT-2').length
    },
    results
  };
  writeFileSync(fullOut, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`Đã lưu báo cáo JSON tại: ${fullOut}`);
}

if (results.length <= 10) {
  for (const r of results) {
    console.log(`\n======================================================================`);
    console.log(`SẢN PHẨM: ${r.slug}  |  HỒ SƠ: ${r.profile}  |  ZIP: ${r.zipSize.toLocaleString('en-US')} B (${r.fileCount} files)`);
    console.log(`ĐIỂM FORGESCORE v2.0: ${r.total} / 100  ->  [${r.grade}]`);
    console.log(`----------------------------------------------------------------------`);
    console.log(`  1. Kiến trúc & Chống AI-Slop (25đ):    ${r.axes.axis1_architecture_antislop} / 25  (DOM sim max: ${r.maxSimilarity}% vs ${r.mostSimilarSlug || 'N/A'})`);
    console.log(`  2. Token, Màu sắc & Bề mặt (20đ):      ${r.axes.axis2_tokens_surfaces} / 20`);
    console.log(`  3. Motion & One Live Thing (20đ):      ${r.axes.axis3_motion_live_thing} / 20`);
    console.log(`  4. Responsive, A11y & Độ bền (20đ):    ${r.axes.axis4_responsive_a11y} / 20`);
    console.log(`  5. Đóng gói, Docs & Previews (15đ):    ${r.axes.axis5_packaging_docs} / 15`);
    if (r.hardFails.length) {
      console.log(`  [!] LỖI LOẠI TRỰC TIẾP (HARD FAIL):`);
      for (const hf of r.hardFails) console.log(`      - ${hf}`);
    }
    if (r.deductions.length) {
      console.log(`  [-] Điểm trừ & Hạng mục cần nâng cấp (${r.deductions.length}):`);
      for (const d of r.deductions) console.log(`      - ${d}`);
    } else {
      console.log(`  [+] Tuyệt đối 100/100 — Không có điểm trừ!`);
    }
  }
} else {
  const avg = round1(results.reduce((s, r) => s + r.total, 0) / results.length);
  const gold = results.filter(r => r.grade.startsWith('FORGEFRAME_GOLD')).length;
  const pass = results.filter(r => r.grade.startsWith('PASS_STANDARD')).length;
  const near = results.filter(r => r.grade.startsWith('NEAR_PASS')).length;
  const rework = results.filter(r => r.grade === 'NEEDS_REWORK').length;
  const fail = results.filter(r => r.grade === 'HARD_FAIL').length;

  console.log(`\n================ TỔNG KẾT KIỂM TOÁN FORGESCORE v2.0 ================`);
  console.log(`Tổng số sản phẩm đánh giá: ${results.length}`);
  console.log(`Điểm trung bình toàn kho:  ${avg} / 100`);
  console.log(`  - FORGEFRAME_GOLD (>=95đ): ${gold} sản phẩm`);
  console.log(`  - PASS_STANDARD (90-94.9đ): ${pass} sản phẩm`);
  console.log(`  - NEAR_PASS (80-89.9đ):     ${near} sản phẩm`);
  console.log(`  - NEEDS_REWORK (<80đ):      ${rework} sản phẩm`);
  console.log(`  - HARD_FAIL (Lỗi loại):     ${fail} sản phẩm`);
  console.log(`--------------------------------------------------------------------`);
  const sorted = [...results].sort((a, b) => b.total - a.total);
  console.log(`Top 15 sản phẩm điểm cao nhất:`);
  for (const r of sorted.slice(0, 15)) {
    console.log(`  ${r.slug.padEnd(28)} ${String(r.total).padStart(5)}/100  [${r.profile}]  (A1:${r.axes.axis1_architecture_antislop} A2:${r.axes.axis2_tokens_surfaces} A3:${r.axes.axis3_motion_live_thing} A4:${r.axes.axis4_responsive_a11y} A5:${r.axes.axis5_packaging_docs})`);
  }
}
