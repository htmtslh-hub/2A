/* Actual-browser release checks and recordings from the extracted customer ZIP.
   Run: node web/product/giao-dien-web/tools/check-three.mjs [--record]. Evidence is generated output. */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, statSync, readdirSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../_design/.tooling/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const require = createRequire(import.meta.url);
const sharp = require('../../../../_design/.tooling/node_modules/sharp');
const ffmpeg = require('../../../../_design/.tooling/node_modules/ffmpeg-static');
const root = resolve('_design/.qa-extracted');
const slugs = ['solenne', 'meridian'];
const sizes = [[1440, 900], [820, 1180], [375, 812], [320, 740]];
const server = createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = resolve(root, '.' + pathname);
  if (!file.startsWith(root + '/') && !file.startsWith(root + '\\')) { res.writeHead(403); res.end(); return; }
  try {
    const body = readFileSync(file);
    res.writeHead(200, { 'Content-Type': ({ '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript' })[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(done => server.listen(4327, '127.0.0.1', done));
const results = {};
const failures = [];
function assert(value, message) { if (!value) failures.push(message); }
async function settled(page) {
  await page.waitForFunction(() => !document.documentElement.classList.contains('reveal-ready'), undefined, { timeout: 10000 });
}
async function dimensions(page) {
  return page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, height: document.documentElement.scrollHeight }));
}
async function allVisible(page) {
  return page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].every(el => Number(getComputedStyle(el).opacity) > .99));
}
async function structure(page) {
  return page.evaluate(() => {
    const elements = [...document.querySelectorAll('[id]')];
    const ids = elements.map(el => el.id);
    const headingLevels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(el => +el.tagName.slice(1));
    return {
      lang: document.documentElement.lang, h1: document.querySelectorAll('h1').length,
      header: !!document.querySelector('header'), nav: !!document.querySelector('nav[aria-label]'), main: !!document.querySelector('main'), footer: !!document.querySelector('footer'),
      duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
      headingJumps: headingLevels.filter((level, i) => i && level > headingLevels[i - 1] + 1),
      svg: [...document.querySelectorAll('svg')].map(el => ({
        name: el.getAttribute('aria-label') || (el.getAttribute('aria-labelledby') || '').split(' ').map(id => document.getElementById(id)?.textContent || '').join(' '),
        role: el.getAttribute('role'), hidden: el.getAttribute('aria-hidden'), focusable: el.getAttribute('focusable'), viewBox: el.getAttribute('viewBox'),
      })),
      links: [...document.querySelectorAll('a')].map(el => ({ label: el.getAttribute('aria-label') || el.textContent.trim(), href: el.getAttribute('href'), exists: el.hash ? !!document.querySelector(el.hash) : el.protocol === 'mailto:', rect: { width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height }, visible: !!el.getClientRects().length })),
      requests: [...document.querySelectorAll('link[href],script[src]')].map(el => el.getAttribute('href') || el.getAttribute('src')),
    };
  });
}
async function contrast(page) {
  return page.evaluate(() => {
    const parse = value => (value.match(/[\d.]+/g) || []).slice(0, 4).map(Number);
    const blend = (fg, bg) => { const a = fg[3] ?? 1; return fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a)); };
    const background = el => {
      if (!el) return [255, 255, 255];
      const value = parse(getComputedStyle(el).backgroundColor);
      return blend(value.length ? value : [0, 0, 0, 0], background(el.parentElement));
    };
    const lum = rgb => rgb.map(v => { const x = v / 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const ratio = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
    const pairs = new Map();
    for (const el of document.querySelectorAll('p,h1,h2,h3,a,button,small,span,strong,li,figcaption')) {
      if (el.closest('svg') || !el.getClientRects().length || ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
      const css = getComputedStyle(el);
      const bg = background(el); const fg = blend(parse(css.color), bg);
      const large = parseFloat(css.fontSize) >= 24 || (parseFloat(css.fontSize) >= 18.66 && +css.fontWeight >= 700);
      const threshold = large ? 3 : 4.5;
      const key = [css.color, bg.map(Math.round).join(','), threshold].join('|');
      const score = ratio(fg, bg);
      if (!pairs.has(key)) pairs.set(key, { element: el.className || el.tagName, text: el.textContent.trim().slice(0, 45), foreground: css.color, background: bg.map(Math.round), ratio: +score.toFixed(2), threshold, pass: score >= threshold });
    }
    const focus = [...document.querySelectorAll('a,button')].filter(el => el.matches(':focus-visible')).map(el => {
      const css = getComputedStyle(el); const bg = background(el.parentElement);
      return { element: el.textContent.trim(), colour: css.outlineColor, width: css.outlineWidth, ratio: +ratio(blend(parse(css.outlineColor), bg), bg).toFixed(2) };
    });
    return { pairs: [...pairs.values()], focus };
  });
}

try {
  for (const slug of slugs) {
    const evidence = resolve(`web/product/giao-dien-web/${slug}/reviews/1.0.0`);
    mkdirSync(resolve(evidence, 'screenshots'), { recursive: true });
    const zip = readFileSync(resolve(`web/product/giao-dien-web/${slug}/${slug}.zip`));
    const report = results[slug] = { date: new Date().toISOString(), os: process.platform, zipBytes: zip.length, sha256: createHash('sha256').update(zip).digest('hex'), browsers: {}, errors: [] };
    assert(zip.length < 20480, `${slug}: ZIP >= 20480 bytes`);
    report.files = readdirSync(resolve(root, slug), { recursive: true }).filter(file => statSync(resolve(root, slug, file)).isFile()).map(file => file.replaceAll('\\', '/')).sort();
    const expectedFiles = ['index.html', 'assets/css/style.css', 'assets/js/main.js', 'CUSTOMISE.md', 'README.md', 'LICENCE.txt'].sort();
    assert(JSON.stringify(report.files) === JSON.stringify(expectedFiles), `${slug}: not exactly six files`);
    report.sourceMatchesExtracted = report.files.every(file => readFileSync(resolve(root, slug, file)).equals(readFileSync(resolve('web/product/giao-dien-web', slug, 'source', file))));
    assert(report.sourceMatchesExtracted, `${slug}: extracted files differ from source`);
    const html = readFileSync(resolve(root, slug, 'index.html'), 'utf8');
    const css = readFileSync(resolve(root, slug, 'assets/css/style.css'), 'utf8');
    const custom = readFileSync(resolve(root, slug, 'CUSTOMISE.md'), 'utf8');
    report.docs = { steps: (custom.match(/^## Step \d+/gm) || []).length, prompts: (custom.match(/\*\*Prompt \d+/g) || []).length, unknownInputMarkers: [...custom.matchAll(/\[(?:YOUR|BRAND|HOSTING|LANGUAGE|HEX|FONT)[^\]]*\]/g)].map(m => m[0]), countErrors: [] };
    for (const row of custom.split('\n').filter(line => /^\| `(?:index.html|assets\/)/.test(line))) {
      const [, file, needle, expected] = row.split('|').map(cell => cell.trim().replace(/^`|`$/g, ''));
      const source = readFileSync(resolve(root, slug, file), 'utf8');
      const actual = source.split(needle).length - 1;
      if (actual !== +expected) report.docs.countErrors.push({ file, needle, expected, actual });
    }
    assert(report.docs.steps === 10 && report.docs.prompts === 12 && !report.docs.countErrors.length && !report.docs.unknownInputMarkers.length, `${slug}: documentation check failed`);
    assert(!/overflow-x:\s*hidden/.test(css) && !/href="#"/.test(html), `${slug}: forbidden layout/anchor hack`);

    for (const [name, engine] of [['chromium', chromium], ['firefox', firefox]]) {
      const browser = await engine.launch({ headless: true });
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      const errors = [], network = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('response', response => { if (response.status() >= 400) network.push({ url: response.url(), status: response.status() }); });
      await page.goto(`http://127.0.0.1:4327/${slug}/index.html`, { waitUntil: 'networkidle' });
      await settled(page);
      const checks = report.browsers[name] = { version: browser.version(), viewports: [], fallbacks: {}, keyboard: {}, menu: {}, structure: await structure(page), console: errors, network };
      assert(checks.structure.h1 === 1 && checks.structure.lang === 'en' && !checks.structure.duplicateIds.length && !checks.structure.headingJumps.length && checks.structure.header && checks.structure.nav && checks.structure.main && checks.structure.footer, `${slug}/${name}: semantic structure`);
      assert(checks.structure.svg.every(svg => svg.viewBox && svg.focusable === 'false' && (svg.hidden === 'true' || (svg.role === 'img' && svg.name))), `${slug}/${name}: unnamed SVG`);
      assert(checks.structure.links.every(link => link.exists && link.label), `${slug}/${name}: broken/unnamed link`);
      for (const [width, height] of sizes) {
        await page.setViewportSize({ width, height });
        await page.evaluate(() => scrollTo(0, 0));
        await page.waitForTimeout(250);
        const size = await dimensions(page);
        const touch = await page.locator('a,button').evaluateAll(elements => elements.filter(el => el.getClientRects().length).map(el => ({ text: el.textContent.trim(), width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height })).filter(rect => rect.width < 44 || rect.height < 44));
        checks.viewports.push({ ...size, viewportHeight: height, smallTargets: touch });
        assert(size.scrollWidth <= size.clientWidth, `${slug}/${name}/${width}: horizontal overflow ${size.scrollWidth}`);
        assert(!touch.length, `${slug}/${name}/${width}: small standalone targets`);
        await page.screenshot({ path: resolve(evidence, `screenshots/${name}-${width}.png`), fullPage: true });
      }
      await page.setViewportSize({ width: 375, height: 812 });
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator('.menu-toggle').click();
      checks.menu.open = await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'true' && await page.locator('#site-nav').isVisible();
      checks.menu.openDimensions = await dimensions(page);
      assert(checks.menu.open && checks.menu.openDimensions.scrollWidth <= 375, `${slug}/${name}: menu open failed`);
      await page.screenshot({ path: resolve(evidence, `screenshots/${name}-menu-open.png`), fullPage: true });
      await page.keyboard.press('Escape');
      checks.menu.escape = await page.locator('.menu-toggle').evaluate(el => el === document.activeElement && el.getAttribute('aria-expanded') === 'false');
      await page.keyboard.press('Tab');
      checks.keyboard.hiddenMenuSkipped = await page.evaluate(() => !document.activeElement.closest('#site-nav'));
      await page.keyboard.press('Shift+Tab');
      checks.keyboard.reverseTab = await page.locator('.menu-toggle').evaluate(el => el === document.activeElement);
      await page.locator('.menu-toggle').click();
      await page.locator('#site-nav a').first().click();
      checks.menu.linkCloses = await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'false' && !await page.locator('#site-nav').isVisible();
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator('.menu-toggle').click();
      await page.setViewportSize({ width: 951, height: 900 });
      await page.waitForTimeout(150);
      checks.menu.desktopReset = await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'false' && await page.locator('#site-nav').isVisible();
      await page.setViewportSize({ width: 949, height: 900 });
      await page.waitForTimeout(150);
      checks.menu.mobileReset = !await page.locator('#site-nav').isVisible();
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`http://127.0.0.1:4327/${slug}/index.html`, { waitUntil: 'networkidle' });
      await settled(page);
      await page.keyboard.press('Tab');
      checks.keyboard.skipFocused = await page.locator('.skip-link').evaluate(el => el === document.activeElement && el.getBoundingClientRect().top >= 0);
      await page.keyboard.press('Enter');
      checks.keyboard.skipDestination = await page.locator('main').evaluate(el => el === document.activeElement);
      await page.keyboard.press('Tab');
      checks.keyboard.nextLink = await page.evaluate(() => ({ tag: document.activeElement.tagName, label: document.activeElement.textContent.trim() }));
      checks.contrast = await contrast(page);
      checks.hoverContrast = [];
      for (const selector of ['.button', '.site-nav a', '.site-footer > a', '.contact a', '.ritual a', '.contact__link']) {
        const target = page.locator(selector).first();
        if (await target.count()) { await target.hover(); checks.hoverContrast.push({ selector, ...(await contrast(page)) }); }
      }
      assert(checks.contrast.pairs.every(pair => pair.pass) && checks.hoverContrast.every(group => group.pairs.every(pair => pair.pass)) && checks.contrast.focus.every(pair => pair.ratio >= 3 && parseFloat(pair.width) >= 2), `${slug}/${name}: contrast`);
      assert(Object.values(checks.menu).filter(value => typeof value === 'boolean').every(Boolean) && checks.keyboard.hiddenMenuSkipped && checks.keyboard.reverseTab && checks.keyboard.skipFocused && checks.keyboard.skipDestination, `${slug}/${name}: menu/keyboard`);
      checks.axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.map(violation => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }));
      assert(!checks.axe.length, `${slug}/${name}: axe violations ${checks.axe.map(v => v.id).join(',')}`);

      // Layout zoom reproduces CSS reflow at 200%, not merely a high-DPI screenshot.
      await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
      checks.fallbacks.zoom200 = await dimensions(page);
      assert(checks.fallbacks.zoom200.scrollWidth <= checks.fallbacks.zoom200.clientWidth, `${slug}/${name}: zoom overflow`);
      await page.screenshot({ path: resolve(evidence, `screenshots/${name}-zoom200.png`), fullPage: true });
      await page.evaluate(() => { document.documentElement.style.zoom = ''; });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      checks.fallbacks.reduced = await allVisible(page);
      assert(checks.fallbacks.reduced, `${slug}/${name}: reduced motion hidden content`);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(pathToFileURL(resolve(root, slug, 'index.html')).href, { waitUntil: 'networkidle' });
      await settled(page);
      checks.fallbacks.file = { ...await dimensions(page), visible: await allVisible(page), styled: await page.locator('body').evaluate(el => getComputedStyle(el).fontSize === '16px') };
      assert(checks.fallbacks.file.visible && checks.fallbacks.file.styled, `${slug}/${name}: file:// failure`);
      const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 740 } });
      const nojsPage = await nojs.newPage();
      await nojsPage.route('https://fonts.**/*', route => route.abort());
      await nojsPage.goto(`http://127.0.0.1:4327/${slug}/index.html`, { waitUntil: 'load' });
      checks.fallbacks.noJSAndFonts = { ...await dimensions(nojsPage), content: await allVisible(nojsPage), nav: await nojsPage.locator('#site-nav').isVisible() };
      assert(checks.fallbacks.noJSAndFonts.content && checks.fallbacks.noJSAndFonts.nav && checks.fallbacks.noJSAndFonts.scrollWidth <= 320, `${slug}/${name}: noJS/font fallback`);
      await nojsPage.screenshot({ path: resolve(evidence, `screenshots/${name}-nojs-no-font-320.png`), fullPage: true });
      await nojs.close();
      const offline = await browser.newContext({ offline: true, viewport: { width: 320, height: 740 } });
      const offlinePage = await offline.newPage();
      await offlinePage.goto(pathToFileURL(resolve(root, slug, 'index.html')).href, { waitUntil: 'load' });
      await settled(offlinePage);
      checks.fallbacks.offlineFile = { ...await dimensions(offlinePage), visible: await allVisible(offlinePage) };
      assert(checks.fallbacks.offlineFile.visible && checks.fallbacks.offlineFile.scrollWidth <= 320, `${slug}/${name}: offline file`);
      await offline.close();
      assert(!errors.length && !network.length, `${slug}/${name}: console/network errors`);
      await context.close();
      await browser.close();
      console.log(`${slug}/${name} ${checks.version}: viewport, keyboard, menu, fallbacks and axe checks finished`);
    }
    writeFileSync(resolve(evidence, 'checks.json'), JSON.stringify(report, null, 2));
  }

  if (process.argv.includes('--record') && !failures.length) {
    for (const slug of slugs) {
      const evidence = resolve(`web/product/giao-dien-web/${slug}/reviews/1.0.0`);
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({ viewport: { width: 1396, height: 1048 }, deviceScaleFactor: 1, recordVideo: { dir: resolve(evidence, 'recordings'), size: { width: 1396, height: 1048 } } });
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:4327/${slug}/index.html`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(2200);
      const preview = await page.screenshot();
      await sharp(preview).resize(698, 524).webp({ quality: 87 }).toFile(resolve(`web/public/previews/${slug}.webp`));
      const start = Date.now();
      const targets = await page.locator('main > section').evaluateAll(items => items.slice(1).map(item => Math.min(item.getBoundingClientRect().top + scrollY - 45, document.documentElement.scrollHeight - innerHeight)));
      for (const y of targets) {
        await page.evaluate(target => scrollTo({ top: target, behavior: 'smooth' }), y);
        await page.waitForTimeout(1850);
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }));
      await page.waitForTimeout(1800);
      const video = page.video();
      await context.close();
      const input = await video.path();
      await browser.close();
      const output = resolve(`web/public/previews/${slug}.mp4`);
      execFileSync(ffmpeg, ['-y', '-i', input, '-vf', 'fps=24,scale=1396:1048', '-c:v', 'libx264', '-preset', 'medium', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', output], { stdio: ['ignore', 'ignore', 'pipe'] });
      results[slug].media = { viewport: '1396x1048', poster: '698x524 WebP', durationApproxSeconds: Math.round((Date.now() - start) / 1000), bytes: statSync(output).size, video: `/previews/${slug}.mp4`, source: input };
      writeFileSync(resolve(evidence, 'checks.json'), JSON.stringify(results[slug], null, 2));
      console.log(`${slug}: recorded ${statSync(output).size} bytes MP4 from extracted product`);
    }
  }
  console.log(JSON.stringify({ failures }, null, 2));
  process.exitCode = failures.length ? 1 : 0;
} finally { await new Promise(done => server.close(done)); }
