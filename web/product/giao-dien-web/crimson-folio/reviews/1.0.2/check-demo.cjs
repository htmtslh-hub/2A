const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { chromium } = require('../../../../../../_design/.tooling/node_modules/playwright');
const origin = process.env.CRIMSON_STORE_URL || 'http://127.0.0.1:3007';
const online = new URL(origin).hostname !== '127.0.0.1';
const publicRoot = path.resolve(__dirname, '../../../../../public/demos/crimson-folio');
const hash = data => createHash('sha256').update(data).digest('hex');
const assert = (ok, message) => { if (!ok) throw new Error(message); };
(async () => {
  const report = { origin, date: new Date().toISOString(), resources: [], browsers: [] };
  for (const item of ['index.html', 'assets/css/style.css', 'assets/js/main.js', 'assets/img/mira-portrait.webp', 'assets/img/mira-avatar.webp']) {
    const response = await fetch(origin + '/demos/crimson-folio/' + item + '?v=1.0.2');
    const data = Buffer.from(await response.arrayBuffer());
    assert(response.ok && hash(data) === hash(fs.readFileSync(path.join(publicRoot, item))), 'asset bytes ' + item);
    report.resources.push({ item, status: response.status, sha256: hash(data) });
  }
  for (const [name, executablePath] of [['edge', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'], ['coccoc', 'C:/Program Files/CocCoc/Browser/Application/browser.exe']]) {
    const browser = await chromium.launch({ executablePath, headless: true });
    const state = { name, version: browser.version(), viewports: [], errors: [], motion: [] };
    try {
      const context = await browser.newContext({ reducedMotion: 'reduce' });
      await context.addInitScript(() => localStorage.setItem('motion', 'off'));
      const page = await context.newPage();
      page.on('pageerror', e => state.errors.push(e.message));
      for (const [width, height] of [[1440, 900], [820, 1180], [375, 812], [320, 740]]) {
        await page.setViewportSize({ width, height });
        await page.goto(origin + '/demos/crimson-folio/index.html?v=1.0.2');
        for (const img of await page.locator('img').all()) {
          await img.scrollIntoViewIfNeeded(); await img.evaluate(i => i.decode());
        }
        const screen = await page.evaluate(() => ({ client: innerWidth, scroll: document.documentElement.scrollWidth, images: [...document.images].every(i => i.complete && i.naturalWidth > 0) }));
        assert(screen.client === screen.scroll && screen.images, 'layout/images ' + name + '/' + width);
        if (width < 650) {
          await page.locator('.menu-toggle').click();
          await page.locator('.navigation a[href="#about"]').click();
          assert(await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'false', 'menu closes');
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(__dirname, `screenshots/${online ? 'online' : 'local'}-demo-${name}-${width}.png`), fullPage: true });
        state.viewports.push({ width, height, ...screen });
      }
      await page.goto(origin + '/demos/crimson-folio/index.html?v=1.0.2');
      await page.locator('.hero__portrait img').evaluate(img => img.decode());
      await page.waitForTimeout(650);
      await page.locator('#project-lumen').scrollIntoViewIfNeeded();
      for (let n = 0; n < 4; n++) {
        await page.waitForTimeout(80);
        state.motion.push(await page.locator('#project-lumen').evaluate(e => ({ opacity: getComputedStyle(e).opacity, transform: getComputedStyle(e).transform })));
      }
      assert(state.motion.some(frame => Number(frame.opacity) < 1), 'motion midframe under reduce and stale off');
      await page.waitForTimeout(650);
      assert(await page.locator('#project-lumen').evaluate(e => getComputedStyle(e).opacity) === '1', 'motion finishes');
      assert(!state.errors.length, 'page errors');
      report.browsers.push(state);
    } finally { await browser.close(); }
  }
  fs.writeFileSync(path.join(__dirname, online ? 'demo-online.json' : 'demo-local.json'), JSON.stringify(report, null, 2));
  console.log('Demo assets, Edge/Coc Coc four widths and motion: PASS');
})().catch(error => { console.error(error); process.exitCode = 1; });
