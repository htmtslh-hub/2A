// Product-specific adapter of the required shared release checker.
// No shared checker changes. Permanent journey replaces collapsible menu;
// settle the finite camera before screenshots, pause it for pixel contrast pairs.
/* Kiểm tra nghiệm thu trên trình duyệt thật cho MỘT mẫu, từ chính bản ZIP giải nén.
   Tổng quát hoá từ check-three.mjs (vốn gắn cứng 3 mẫu và selector riêng).

   Dùng (từ gốc dự án):
     node web/product/giao-dien-web/tools/check-template.mjs keystead --version 1.0.0 --ngoai-le
     node web/product/giao-dien-web/tools/check-template.mjs tidal --version 1.1.0 --ngoai-le

   --ngoai-le: mẫu có ngoại lệ đã duyệt (ảnh cục bộ, quá 6 file / 20.480 byte).
   Khi đó vẫn bắt buộc đủ sáu file chuẩn, chỉ bỏ qua giới hạn số file và byte.

   Đầu ra: web/product/giao-dien-web/<slug>/reviews/<version>/checks.json và
   screenshots/. Script chỉ ghi bằng chứng; QA.md vẫn do người kiểm tra viết. */
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { inflateRawSync } from 'node:zlib';

const args = process.argv.slice(2);
const valueOf = flag => args.includes(flag) ? args[args.indexOf(flag) + 1] : null;
const slug = args.find((a, i) => !a.startsWith('--') && !['--version', '--out'].includes(args[i - 1]));
const version = valueOf('--version');
const outDir = valueOf('--out'); // tuỳ chọn: thư mục con, tránh ghi đè bằng chứng cũ của cùng phiên bản
const allowException = args.includes('--ngoai-le');
if (!slug || !version) {
  console.error('Dùng: node web/product/giao-dien-web/tools/check-template.mjs <slug> --version <x.y.z> [--ngoai-le] [--out <thư-mục-con>]');
  process.exit(1);
}

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');

const SIX = ['index.html', 'assets/css/style.css', 'assets/js/main.js', 'CUSTOMISE.md', 'README.md', 'LICENCE.txt'].sort();
const SIZES = [[1440, 900], [820, 1180], [375, 812], [320, 740]];
const productDir = resolve('web/product/giao-dien-web', slug);
const zipPath = resolve(productDir, `${slug}.zip`);
const evidence = resolve(productDir, 'reviews', version, ...(outDir ? [outDir] : []));
const extractRoot = resolve('_design/.qa-extracted/apartment-flow-release');
const site = resolve(extractRoot, slug);

const failures = [];
const assert = (ok, message) => { if (!ok) failures.push(message); };

// ---- 1. Giải nén ZIP (tự đọc, không phụ thuộc công cụ hệ điều hành) --------
const zip = readFileSync(zipPath);
const report = {
  slug, version, date: new Date().toISOString(), os: process.platform,
  zipBytes: zip.length, sha256: createHash('sha256').update(zip).digest('hex'),
  exception: allowException, browsers: {},
};
rmSync(site, { recursive: true, force: true });
const eocd = zip.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
let p = zip.readUInt32LE(eocd + 16);
const entryNames = [];
for (let i = 0, n = zip.readUInt16LE(eocd + 10); i < n; i++) {
  const method = zip.readUInt16LE(p + 10), csize = zip.readUInt32LE(p + 20);
  const nlen = zip.readUInt16LE(p + 28), xlen = zip.readUInt16LE(p + 30), clen = zip.readUInt16LE(p + 32);
  const lho = zip.readUInt32LE(p + 42);
  const name = zip.subarray(p + 46, p + 46 + nlen).toString('utf8');
  entryNames.push(name);
  if (!name.endsWith('/')) {
    const start = lho + 30 + zip.readUInt16LE(lho + 26) + zip.readUInt16LE(lho + 28);
    const raw = zip.subarray(start, start + csize);
    const out = resolve(extractRoot, name.replaceAll('\\', '/'));
    if (!out.startsWith(extractRoot)) throw new Error(`Đường dẫn ZIP không an toàn: ${name}`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, method === 8 ? inflateRawSync(raw) : raw);
  }
  p += 46 + nlen + xlen + clen;
}
report.zipEntries = entryNames;
assert(entryNames.every(n => !n.includes('\\')), 'ZIP: đường dẫn chứa dấu \\ (hỏng khi giải nén trên macOS/Linux)');
assert(entryNames.every(n => n.startsWith(`${slug}/`)), `ZIP: mọi file phải nằm trong thư mục ${slug}/`);
assert(existsSync(site), `ZIP: không có thư mục ${slug}/ sau giải nén`);

// ---- 2. Cấu trúc, khớp source, tài liệu -----------------------------------
const walk = dir => readdirSync(dir, { recursive: true }).filter(f => statSync(resolve(dir, f)).isFile()).map(f => f.replaceAll('\\', '/')).sort();
report.files = walk(site);
const missing = SIX.filter(f => !report.files.includes(f));
assert(!missing.length, `Q01: thiếu file ${missing.join(', ')}`);
if (!allowException) {
  assert(JSON.stringify(report.files) === JSON.stringify(SIX), 'Q01/W01: không đúng sáu file');
  assert(zip.length < 20480, `W06: ZIP ${zip.length} byte >= 20480`);
}
report.sourceMatchesExtracted = report.files.every(f => {
  const src = resolve(productDir, 'source', f);
  return existsSync(src) && readFileSync(src).equals(readFileSync(resolve(site, f)));
}) && JSON.stringify(walk(resolve(productDir, 'source'))) === JSON.stringify(report.files);
assert(report.sourceMatchesExtracted, 'Q11: bản giải nén khác source');

const html = readFileSync(resolve(site, 'index.html'), 'utf8');
const css = readFileSync(resolve(site, 'assets/css/style.css'), 'utf8');
const custom = readFileSync(resolve(site, 'CUSTOMISE.md'), 'utf8');
report.docs = {
  steps: (custom.match(/^## Step \d+/gm) || []).length,
  prompts: (custom.match(/\*\*Prompt \d+/g) || []).length,
  // Chỉ xét trong khối prompt ```text: edit map được phép nhắc placeholder có chủ đích của template.
  unfilledMarkers: [...custom.matchAll(/```text\r?\n([\s\S]*?)```/g)].flatMap(b =>
    [...b[1].matchAll(/\[(?:YOUR|BRAND|HOSTING|LANGUAGE|HEX|FONT|DESCRIBE)[^\]]*\]/g)].map(m => m[0])),
  countErrors: [],
};
for (const row of custom.split('\n').filter(l => /^\| `(?:index\.html|assets\/)/.test(l))) {
  const cells = row.split('|').map(c => c.trim());
  const file = cells[1].replace(/^`|`$/g, ''), needle = cells[2].replace(/^`|`$/g, ''), expected = +cells[3];
  const target = resolve(site, file);
  const actual = existsSync(target) ? readFileSync(target, 'utf8').split(needle).length - 1 : -1;
  if (actual !== expected) report.docs.countErrors.push({ file, needle, expected, actual });
}
assert(report.docs.steps === 10, `Q10: CUSTOMISE có ${report.docs.steps}/10 bước`);
assert(report.docs.prompts === 12, `Q10: CUSTOMISE có ${report.docs.prompts}/12 prompt`);
assert(!report.docs.countErrors.length, `Q10: số đếm sai ${JSON.stringify(report.docs.countErrors)}`);
assert(!report.docs.unfilledMarkers.length, `Q10: prompt còn ô bắt khách tự điền ${report.docs.unfilledMarkers.join(', ')}`);
assert(!/href="#"/.test(html), 'Q03: còn href="#"');
const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
assert(!/(?:^|[\s,}])(?:html|body)\b[^{}]*\{[^}]*overflow-x:\s*hidden/.test(cssNoComments), 'Q02: overflow-x:hidden trên html/body');
assert(!/<form\b/i.test(html) || /Demo only/i.test(html), 'Q03: có <form> nhưng không ghi "Demo only"');

// ---- 3. Trình duyệt ------------------------------------------------------
mkdirSync(resolve(evidence, 'screenshots'), { recursive: true });
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  const file = resolve(extractRoot, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(extractRoot)) { res.writeHead(403).end(); return; }
  try { const body = readFileSync(file); res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' }); res.end(body); }
  catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(4329, '127.0.0.1', done));
const URL_HTTP = `http://127.0.0.1:4329/${slug}/index.html`;

const dims = page => page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
const allVisible = page => page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].every(el => Number(getComputedStyle(el).opacity) > .99));
const settle = async page => { await page.waitForLoadState('networkidle'); await page.waitForTimeout(400); };
// Reveal-on-scroll chỉ hiện khi cuộn tới; cuộn hết trang trước khi đo hiển thị/axe.
const revealAll = async page => {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 300) { await page.evaluate(t => scrollTo(0, t), y); await page.waitForTimeout(60); }
  await page.waitForTimeout(900); await page.evaluate(() => scrollTo(0, 0)); await page.waitForFunction(() => !document.querySelector('.apartment.is-enhanced') || document.querySelector('canvas').dataset.frame === '1', null, {timeout:15000}); await page.waitForTimeout(100);
};
const TOGGLE = '.nav-toggle, .menu-toggle';

async function structure(page) {
  return page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
    const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(el => +el.tagName[1]);
    return {
      lang: document.documentElement.lang, h1: document.querySelectorAll('h1').length,
      landmarks: { header: !!document.querySelector('header'), nav: !!document.querySelector('nav[aria-label]'), main: !!document.querySelector('main'), footer: !!document.querySelector('footer') },
      duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
      headingJumps: levels.filter((l, i) => i && l > levels[i - 1] + 1),
      badSvg: [...document.querySelectorAll('svg')].filter(el => !el.closest('svg:not(:scope)') && !(el.getAttribute('viewBox') && el.getAttribute('focusable') === 'false' && (el.getAttribute('aria-hidden') === 'true' || (el.getAttribute('role') === 'img' && (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')))))).length,
      links: [...document.querySelectorAll('a')].map(el => ({
        label: (el.getAttribute('aria-label') || el.textContent).trim().replace(/\s+/g, ' '),
        href: el.getAttribute('href'),
        ok: el.protocol === 'mailto:' || el.protocol === 'tel:' || (el.hash ? !!document.querySelector(el.hash) : null),
        sameOrigin: el.origin === location.origin, url: el.href,
      })),
    };
  });
}

const LUM = rgb => rgb.map(v => { const x = v / 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
const RATIO = (a, b) => (Math.max(LUM(a), LUM(b)) + .05) / (Math.min(LUM(a), LUM(b)) + .05);
const BLEND = (fg, bg) => { const a = fg[3] ?? 1; return fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a)); };

// scope: chỉ đo phần tử nằm trong selector này (dùng khi hover). pixels=false: bỏ bước chụp điểm ảnh.
async function contrast(page, { scope = null, pixels = true } = {}) {
  const { items, focus } = await page.evaluate(scope => {
    const parse = v => (v.match(/[\d.]+/g) || []).slice(0, 4).map(Number);
    const blend = (fg, bg) => { const a = fg[3] ?? 1; return fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a)); };
    const stopsOf = img => (img.match(/rgba?\([^)]*\)/g) || []).map(parse);
    const uniq = list => [...new Map(list.map(c => [c.map(Math.round).join(','), c])).values()];
    // Ước lượng từ CSS: nền gradient trả về mọi màu ứng viên. Chỉ chính xác với nền màu đặc;
    // nền có gradient/ảnh sẽ được đo lại bằng điểm ảnh ở phía Node.
    const bgOf = el => {
      if (!el) return [[255, 255, 255]];
      const s = getComputedStyle(el);
      let under = bgOf(el.parentElement);
      const own = parse(s.backgroundColor);
      if (own.length && (own[3] ?? 1) > 0) under = under.map(b => blend(own, b));
      if (s.backgroundImage.includes('gradient(')) {
        const stops = stopsOf(s.backgroundImage);
        const opaque = stops.filter(c => (c[3] ?? 1) >= 1).map(c => c.slice(0, 3));
        const base = opaque.length ? opaque : under;
        under = [...base, ...stops.filter(c => (c[3] ?? 1) > 0 && (c[3] ?? 1) < 1).flatMap(c => base.map(b => blend(c, b)))];
      }
      return uniq(under);
    };
    const lum = rgb => rgb.map(v => { const x = v / 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
    const ratio = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
    const layer = (node, kind) => ['', '::before', '::after'].some(p => getComputedStyle(node, p || null).backgroundImage.includes(kind));
    const items = [];
    for (const el of document.querySelectorAll('p,h1,h2,h3,a,button,small,span,strong,b,em,li,label,option,figcaption')) {
      if (scope && !el.closest(scope)) continue;
      if (el.closest('svg') || el.closest('[aria-hidden="true"]') || !el.getClientRects().length || ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
      // Ảnh nền raster (kể cả trên ::before/::after của tổ tiên): vẫn cần người kiểm tra thủ công.
      let image = false, gradient = false;
      for (let node = el; node; node = node.parentElement) { image ||= layer(node, 'url('); gradient ||= layer(node, 'gradient('); }
      const s = getComputedStyle(el);
      const clipText = [s.backgroundClip, s.webkitBackgroundClip].includes('text') && s.backgroundImage.includes('gradient(');
      const bgs = clipText ? bgOf(el.parentElement) : bgOf(el);
      const fgs = clipText ? stopsOf(s.backgroundImage) : [parse(s.color)];
      let score = Infinity, bg = bgs[0];
      for (const b of bgs) for (const f of fgs) { const r = ratio(blend(f, b), b); if (r < score) { score = r; bg = b; } }
      const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
      const id = items.length, uncertain = image || gradient;
      if (uncertain) el.setAttribute('data-qa-c', id);
      if (clipText) el.setAttribute('data-qa-clip', '');
      items.push({ id, element: String(el.className || el.tagName), text: el.textContent.trim().slice(0, 40), colour: clipText ? 'gradient text' : s.color, fgs, background: bg, score, threshold: large ? 3 : 4.5, overImage: image, uncertain, method: 'css' });
    }
    const focused = document.activeElement;
    let focus = null;
    if (focused && focused !== document.body && focused.matches(':focus-visible')) {
      const s = getComputedStyle(focused); const bgs = bgOf(focused.parentElement);
      focus = { element: focused.textContent.trim().slice(0, 30), colour: s.outlineColor, width: s.outlineWidth, ratio: +Math.min(...bgs.map(bg => ratio(blend(parse(s.outlineColor), bg), bg))).toFixed(2) };
    }
    return { items, focus };
  }, scope);

  const uncertain = items.filter(i => i.uncertain).slice(0, 150);
  if (pixels && uncertain.length) {
    // Chụp mỗi phần tử hai lần: có chữ, rồi ẩn chữ (không đổi bố cục). Điểm ảnh khác nhau là nét chữ;
    // màu nền thật là điểm ảnh của ảnh ẩn chữ tại đúng các vị trí đó (bỏ qua góc bo, phần tử lân cận).
    const shoot = async target => { try { return (await target.screenshot({ scale: 'css', animations: 'disabled', timeout: 5000 })).toString('base64'); } catch { return null; } };
    const shots = [];
    const still = await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important}html{scroll-behavior:auto!important}' });
    const HIDE = '*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important}[data-qa-clip]{background:none!important}';
    for (const it of uncertain) {
      const target = page.locator(`[data-qa-c="${it.id}"]`);
      const box = await target.boundingBox();
      if (!box || box.width < 2 || box.height < 2) continue;
      await target.scrollIntoViewIfNeeded().catch(() => {});
      const visible = await shoot(target);
      const hide = await page.addStyleTag({ content: HIDE });
      const hidden = await shoot(target);
      await hide.evaluate(n => n.remove());
      if (visible && hidden) shots.push({ id: it.id, visible, hidden });
    }
    await still.evaluate(n => n.remove());
    const samples = await page.evaluate(shots => Promise.all(shots.filter(s => s.hidden).map(async s => {
      const load = async b64 => {
        const bmp = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob());
        const cx = new OffscreenCanvas(bmp.width, bmp.height).getContext('2d'); cx.drawImage(bmp, 0, 0);
        return { w: bmp.width, h: bmp.height, d: cx.getImageData(0, 0, bmp.width, bmp.height).data };
      };
      const [a, b] = [await load(s.visible), await load(s.hidden)];
      if (a.w !== b.w || a.h !== b.h) return { id: s.id, extremes: null };
      const px = [];
      for (let i = 0; i < a.d.length; i += 4) {
        if (Math.abs(a.d[i] - b.d[i]) + Math.abs(a.d[i + 1] - b.d[i + 1]) + Math.abs(a.d[i + 2] - b.d[i + 2]) > 48) px.push([b.d[i], b.d[i + 1], b.d[i + 2]]);
      }
      if (px.length < 12) return { id: s.id, extremes: null }; // không thấy nét chữ: giữ kết quả CSS
      const l = c => .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
      px.sort((x, y) => l(x) - l(y));
      const at = q => px[Math.min(px.length - 1, Math.floor(q * px.length))];
      return { id: s.id, extremes: [at(.02), at(.98)], glyphPixels: px.length };
    })), shots);
    for (const s of samples.filter(s => s.extremes)) {
      const it = items.find(i => i.id === s.id); it.score = Infinity; it.method = 'pixels';
      for (const b of s.extremes) for (const f of it.fgs) { const r = RATIO(BLEND(f, b), b); if (r < it.score) { it.score = r; it.background = b; } }
    }
    await page.waitForTimeout(400); // chờ transition màu trở lại trạng thái thường
  }
  await page.evaluate(() => document.querySelectorAll('[data-qa-c],[data-qa-clip]').forEach(el => { el.removeAttribute('data-qa-c'); el.removeAttribute('data-qa-clip'); }));

  const pairs = new Map();
  for (const it of items) {
    const background = it.background.map(Math.round);
    const key = [it.colour, background.join(','), it.threshold, it.overImage, it.method].join('|');
    if (!pairs.has(key)) pairs.set(key, { element: it.element, text: it.text, colour: it.colour, background, ratio: +it.score.toFixed(2), threshold: it.threshold, overImage: it.overImage, method: it.method, pass: it.score >= it.threshold || (it.overImage && it.method !== 'pixels') });
  }
  return { pairs: [...pairs.values()], focus };
}
async function smallTargets(page) {
  // Link nằm trong câu văn được miễn (product-standards §7); chỉ đo điều khiển độc lập.
  return page.locator('a, button').evaluateAll(els => els.filter(el => el.getClientRects().length).map(el => {
    const r = el.getBoundingClientRect(); const parentText = (el.parentElement?.textContent || '').trim().length;
    return { text: (el.getAttribute('aria-label') || el.textContent).trim().replace(/\s+/g, ' ').slice(0, 40), width: Math.round(r.width), height: Math.round(r.height), inline: parentText > el.textContent.trim().length + 25 };
  }).filter(t => !t.inline && (t.width < 44 || t.height < 44)));
}

try {
  for (const [name, engine] of [['chromium', chromium], ['firefox', firefox]]) {
    const browser = await engine.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const errors = [], network = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) network.push({ url: r.url(), status: r.status() }); });
    await page.goto(URL_HTTP); await settle(page);
    const c = report.browsers[name] = { version: browser.version(), structure: await structure(page), viewports: [], menu: {}, keyboard: {}, fallbacks: {} };
    const s = c.structure;
    assert(s.h1 === 1 && s.lang && !s.duplicateIds.length && !s.headingJumps.length && Object.values(s.landmarks).every(Boolean), `Q05/${name}: cấu trúc ${JSON.stringify({ h1: s.h1, lang: s.lang, dup: s.duplicateIds, jumps: s.headingJumps, landmarks: s.landmarks })}`);
    assert(!s.badSvg, `Q05/${name}: ${s.badSvg} SVG thiếu aria-hidden/tên hoặc viewBox`);
    for (const link of s.links.filter(l => l.ok === null && l.sameOrigin)) link.ok = (await page.request.get(link.url)).ok();
    const bad = s.links.filter(l => !l.ok || !l.label);
    assert(!bad.length, `Q03/${name}: link hỏng/không tên ${JSON.stringify(bad.map(l => l.label + ' -> ' + l.href))}`);

    for (const [width, height] of SIZES) {
      await page.setViewportSize({ width, height }); await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(250);
      const d = await dims(page); const small = await smallTargets(page);
      c.viewports.push({ ...d, height, smallTargets: small });
      assert(d.scrollWidth <= d.clientWidth, `Q02/${name}/${width}: tràn ngang ${d.scrollWidth}`);
      assert(!small.length, `Q02/${name}/${width}: vùng chạm < 44px ${JSON.stringify(small)}`);
      await revealAll(page); // ảnh bằng chứng phải thấy cả phần reveal-on-scroll
      await page.screenshot({ path: resolve(evidence, `screenshots/${name}-${width}.png`), fullPage: true });
    }

    // Menu: tự tìm breakpoint là khổ lớn nhất mà nút menu hiện.
    let bp = null;
    for (let w = 1440; w >= 320; w -= 10) { await page.setViewportSize({ width: w, height: 900 }); if (await page.locator(TOGGLE).isVisible()) { bp = w; break; } }
    c.menu.breakpoint = bp;
    c.menu.design = 'Persistent four-chapter journey, no collapsible menu'; assert(await page.locator('.journey a').count() === 4, `Q03/${name}: missing chapter navigation`);
    if (bp) {
      await page.setViewportSize({ width: 375, height: 812 }); await page.evaluate(() => scrollTo(0, 0));
      const toggle = page.locator(TOGGLE).first(); const navSel = '#' + await toggle.getAttribute('aria-controls');
      const nav = page.locator(navSel);
      c.menu.ariaControls = navSel !== '#null' && await nav.count() === 1;
      await toggle.click();
      c.menu.open = await toggle.getAttribute('aria-expanded') === 'true' && await nav.isVisible();
      c.menu.openNoOverflow = (await dims(page)).scrollWidth <= 375;
      await page.screenshot({ path: resolve(evidence, `screenshots/${name}-menu-open.png`), fullPage: true });
      await page.keyboard.press('Escape');
      c.menu.escapeClosesAndFocuses = await toggle.evaluate(el => el === document.activeElement && el.getAttribute('aria-expanded') === 'false');
      await page.keyboard.press('Tab');
      c.keyboard.hiddenMenuSkipped = await page.evaluate(sel => !document.activeElement.closest(sel), navSel);
      await page.keyboard.press('Shift+Tab');
      c.keyboard.shiftTabBack = await toggle.evaluate(el => el === document.activeElement);
      await toggle.click(); await nav.locator('a').first().click(); await page.waitForTimeout(150);
      c.menu.linkCloses = await toggle.getAttribute('aria-expanded') === 'false' && !await nav.isVisible();
      await page.evaluate(() => scrollTo(0, 0)); await toggle.click();
      await page.setViewportSize({ width: bp + 10, height: 900 }); await page.waitForTimeout(200);
      c.menu.resetOnDesktop = await toggle.getAttribute('aria-expanded') === 'false' && await nav.isVisible();
      await page.setViewportSize({ width: bp, height: 900 }); await page.waitForTimeout(200);
      c.menu.closedBackOnMobile = !await nav.isVisible() && await toggle.getAttribute('aria-expanded') === 'false';
      const menuFail = Object.entries(c.menu).filter(([k, v]) => typeof v === 'boolean' && !v).map(([k]) => k);
      assert(!menuFail.length, `Q03/${name}: menu ${menuFail.join(', ')}`);
      assert(c.keyboard.hiddenMenuSkipped && c.keyboard.shiftTabBack, `Q04/${name}: Tab khi menu ẩn`);
    }

    // Bàn phím desktop: skip link hiện khi focus và đưa vào main.
    await page.setViewportSize({ width: 1440, height: 900 }); await page.goto(URL_HTTP); await settle(page);
    await page.keyboard.press('Tab'); await page.waitForTimeout(350); // skip link thường có transition
    c.keyboard.skipVisible = await page.evaluate(() => { const el = document.activeElement; const r = el.getBoundingClientRect(); return el.matches('.skip-link, [href="#main"]') && r.top >= 0 && r.height > 0; });
    await page.keyboard.press('Enter'); await page.keyboard.press('Tab');
    c.keyboard.skipLandsInMain = await page.evaluate(() => !!document.activeElement.closest('main'));
    c.contrast = await contrast(page, { pixels: false });
    assert(c.keyboard.skipVisible && c.keyboard.skipLandsInMain, `Q04/${name}: skip link ${JSON.stringify(c.keyboard)}`);
    assert(c.contrast.focus && c.contrast.focus.ratio >= 3 && parseFloat(c.contrast.focus.width) >= 2, `Q06/${name}: viền focus ${JSON.stringify(c.contrast.focus)}`);
    await revealAll(page);
    await page.locator('.apartment__pause').click(); c.contrast.pairs = (await contrast(page)).pairs;
    c.hover = [];
    for (const sel of ['.btn', '.button', '.site-nav a', '.link-quiet', '.site-footer a']) {
      const t = page.locator(sel).first();
      if (await t.count() && await t.isVisible()) {
        await t.hover(); await page.waitForTimeout(400); // chờ transition hover xong
        await t.evaluate(el => el.setAttribute('data-qa-hover', ''));
        c.hover.push({ selector: sel, failing: (await contrast(page, { scope: '[data-qa-hover]' })).pairs.filter(x => !x.pass) });
        await t.evaluate(el => el.removeAttribute('data-qa-hover'));
      }
    }
    const lowContrast = [...c.contrast.pairs.filter(x => !x.pass), ...c.hover.flatMap(h => h.failing)];
    assert(!lowContrast.length, `Q06/${name}: tương phản thấp ${JSON.stringify(lowContrast)}`);
    c.contrast.overImageNeedsManualCheck = c.contrast.pairs.filter(x => x.overImage).map(x => x.text);
    await page.locator('.apartment__pause').click(); await page.mouse.move(0, 0); await revealAll(page);
    c.axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) }));
    assert(!c.axe.length, `Q05/${name}: axe ${JSON.stringify(c.axe)}`);

    // Dự phòng: zoom 200%, giảm chuyển động, file://, tắt JS + mất font, offline.
    // Zoom 200% của trình duyệt ở cửa sổ 1440×900 = khung bố cục 720×450 CSS px, mật độ 2×.
    const zoomed = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
    const zp = await zoomed.newPage(); await zp.goto(URL_HTTP); await settle(zp); await revealAll(zp);
    c.fallbacks.zoom200 = await dims(zp);
    assert(c.fallbacks.zoom200.scrollWidth <= c.fallbacks.zoom200.clientWidth, `Q07/${name}: tràn khi zoom 200% ${JSON.stringify(c.fallbacks.zoom200)}`);
    await zp.screenshot({ path: resolve(evidence, `screenshots/${name}-zoom200.png`), fullPage: true });
    await zoomed.close();
    const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const rp = await reduced.newPage(); await rp.goto(URL_HTTP); await settle(rp);
    c.fallbacks.reducedMotion = { allVisible: await allVisible(rp), runningAnimations: await rp.evaluate(() => document.getAnimations().filter(a => a.playState === 'running' && (a.effect?.getTiming().duration || 0) > 1).length) };
    assert(c.fallbacks.reducedMotion.allVisible && !c.fallbacks.reducedMotion.runningAnimations, `Q07/${name}: giảm chuyển động ${JSON.stringify(c.fallbacks.reducedMotion)}`);
    await reduced.close();
    await page.waitForTimeout(5200);
    c.fallbacks.motionAfter5s = await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').map(a => a.animationName || a.transitionProperty || 'animation'));
    assert(!c.fallbacks.motionAfter5s.length, `Q07/${name}: chuyển động còn chạy sau 5 giây ${c.fallbacks.motionAfter5s}`);
    await page.goto(pathToFileURL(resolve(site, 'index.html')).href); await settle(page); await revealAll(page);
    c.fallbacks.file = { ...(await dims(page)), allVisible: await allVisible(page), styled: await page.evaluate(() => getComputedStyle(document.body).fontSize === '16px' || getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)') };
    assert(c.fallbacks.file.allVisible && c.fallbacks.file.styled, `Q07/${name}: file:// ${JSON.stringify(c.fallbacks.file)}`);
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 740 } });
    const np = await nojs.newPage(); await np.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    await np.goto(URL_HTTP, { waitUntil: 'load' });
    c.fallbacks.noJsNoFont320 = { ...(await dims(np)), allVisible: await allVisible(np), navLinksVisible: await np.locator('.journey a').first().isVisible() };
    assert(c.fallbacks.noJsNoFont320.allVisible && c.fallbacks.noJsNoFont320.navLinksVisible && c.fallbacks.noJsNoFont320.scrollWidth <= 320, `Q07/${name}: tắt JS/mất font ${JSON.stringify(c.fallbacks.noJsNoFont320)}`);
    await np.waitForTimeout(1200); // chờ hiệu ứng vào trang chạy xong
    await np.screenshot({ path: resolve(evidence, `screenshots/${name}-nojs-nofont-320.png`), fullPage: true });
    await nojs.close();
    const off = await browser.newContext({ offline: true, viewport: { width: 320, height: 740 } });
    const op = await off.newPage(); await op.goto(pathToFileURL(resolve(site, 'index.html')).href, { waitUntil: 'load' }); await op.waitForTimeout(600); await revealAll(op);
    c.fallbacks.offlineFile320 = { ...(await dims(op)), allVisible: await allVisible(op) };
    assert(c.fallbacks.offlineFile320.allVisible && c.fallbacks.offlineFile320.scrollWidth <= 320, `Q07/${name}: offline ${JSON.stringify(c.fallbacks.offlineFile320)}`);
    await off.close();

    c.console = errors; c.network = network.filter(n => !/fonts\.(googleapis|gstatic)\.com/.test(n.url));
    assert(!errors.length && !c.network.length, `Q09/${name}: lỗi console/network ${JSON.stringify([...errors, ...c.network])}`);
    await browser.close();
    console.log(`${name} ${c.version}: xong`);
  }
} finally {
  await new Promise(done => server.close(done));
}

report.failures = failures;
writeFileSync(resolve(evidence, 'checks.json'), JSON.stringify(report, null, 2));
console.log(`ZIP ${report.zipBytes} byte  SHA-256 ${report.sha256}`);
console.log(`Bằng chứng: ${resolve(evidence, 'checks.json')}`);
if (failures.length) { console.log(`\n${failures.length} mục FAIL:`); failures.forEach(f => console.log('  - ' + f)); process.exitCode = 1; }
else console.log('\nTất cả kiểm tra tự động PASS (vẫn cần nhìn ảnh chụp và ghi QA.md).');
