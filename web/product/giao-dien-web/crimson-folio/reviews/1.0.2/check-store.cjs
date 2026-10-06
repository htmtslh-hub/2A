const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { chromium } = require('../../../../../../_design/.tooling/node_modules/playwright');
const base = process.env.CRIMSON_STORE_URL || 'http://127.0.0.1:3007';
const online = new URL(base).hostname !== '127.0.0.1';
const sizes = [[1440, 900], [820, 1180], [375, 812], [320, 740]];
const report = { base, date: new Date().toISOString(), views: [], assets: [], errors: [] };
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const hash = data => createHash('sha256').update(data).digest('hex');
const shots = path.join(__dirname, 'screenshots');
fs.mkdirSync(shots, { recursive: true });
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  report.browser = { name: 'Edge', version: browser.version() };
  try {
    for (const lang of ['vi', 'en', 'zh']) {
      const context = await browser.newContext({ locale: lang, viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      page.on('pageerror', e => report.errors.push(e.message));
      await page.goto(base, { waitUntil: 'domcontentloaded' });
      const card = page.locator('a.product-card').filter({ has: page.getByRole('heading', { name: 'Crimson Folio', exact: true }) });
      await card.waitFor();
      assert(await page.locator('a.product-card').count() === 13, 'all 13 real products');
      for (const name of ['DigiNest', 'NovaTrend']) {
        assert(await page.getByRole('heading', { name, exact: true }).count() === 1, 'preserve ' + name);
      }
      assert(await card.count() === 1, 'exactly one home card ' + lang);
      assert((await card.getAttribute('href')).includes('mau=t13'), 'home card URL');
      const image = card.locator('img[src*="crimson-folio.webp"]');
      await card.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
      assert(await image.evaluate(img => img.naturalWidth === 698 && img.naturalHeight === 524), 'real preview');
      const actions = card.locator('..').locator('.product-card-actions');
      assert(await actions.locator('button').count() === 2, 'save and cart controls');
      assert(await card.locator('button').count() === 0, 'no nested buttons');
      await card.screenshot({ path: path.join(shots, `${online ? 'online' : 'local'}-card-${lang}.png`) });
      for (const [width, height] of sizes) {
        await page.setViewportSize({ width, height });
        await card.scrollIntoViewIfNeeded();
        const rect = await card.boundingBox();
        assert(rect.x >= -1 && rect.x + rect.width <= width + 1, 'home card clipped ' + width);
      }
      for (const [width, height] of lang === 'vi' ? sizes : [sizes[0]]) {
        await page.setViewportSize({ width, height });
        await page.goto(base + '/?mau=t13', { waitUntil: 'domcontentloaded' });
        const preview = page.locator('img[src*="/previews/crimson-folio.webp"]').first();
        await preview.waitFor();
        await preview.evaluate(img => img.decode());
        const popupReady = page.waitForEvent('popup');
        await page.locator('button.hv10').click();
        const demo = await popupReady;
        await demo.waitForLoadState('domcontentloaded');
        assert(demo.url().includes('/demos/crimson-folio/index.html?v=1.0.2'), 'demo version');
        await demo.locator('.hero__portrait img').evaluate(img => img.decode());
        const demoUrl = demo.url();
        await demo.close();
        assert((await page.locator('body').innerText()).includes('Crimson Folio'), 'detail name');
        const guide = page.locator('a[href*="template=crimson-folio"]').first();
        assert(await guide.count() === 1, 'detail guide');
        const dims = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
        assert(dims.scroll <= dims.client, 'store overflow ' + width);
        const rect = await preview.boundingBox();
        assert(rect.x >= -1 && rect.x + rect.width <= width + 1, 'detail preview clipped ' + width);
        const heading = page.locator('p').filter({ hasText: /^Crimson Folio$/ }).first();
        const headingRect = await heading.boundingBox();
        assert(headingRect.x + headingRect.width <= width + 1, 'detail text clipped ' + width);
        for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 600) {
          await page.evaluate(y => scrollTo(0, y), y);
          await page.waitForTimeout(80);
        }
        await page.waitForTimeout(700);
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(shots, `${online ? 'online' : 'local'}-detail-${lang}-${width}.png`), fullPage: true });
        report.views.push({ lang, width, height, ...dims, detail: 'PASS', demo: demoUrl });
      }
      await page.goto(base + '/?tab=library', { waitUntil: 'domcontentloaded' });
      const libraryCard = page.locator('a.product-card').filter({ has: page.getByRole('heading', { name: 'Crimson Folio', exact: true }) });
      await libraryCard.waitFor();
      await libraryCard.scrollIntoViewIfNeeded();
      await libraryCard.locator('img').evaluate(img => img.decode());
      await libraryCard.locator('..').locator('.cart-template-button').click();
      await page.waitForFunction(() => JSON.parse(localStorage.getItem('forgezone-cart-v1') || '[]').includes('t13'));
      assert(await libraryCard.locator('..').locator('.cart-template-button').getAttribute('aria-pressed') === 'true', 'added to cart');
      await libraryCard.focus();
      await page.keyboard.press('Enter');
      await page.locator('button.hv10').waitFor();
      assert(new URL(page.url()).searchParams.get('mau') === 't13', 'keyboard card navigation');
      await page.goto(base + '/huong-dan?template=crimson-folio&view=template');
      assert((await page.locator('body').innerText()).includes('550'), 'specific guide');
      await context.close();
    }
    const request = await browser.newContext();
    for (const relative of ['/previews/crimson-folio.webp', '/demos/crimson-folio/index.html', '/demos/crimson-folio/assets/css/style.css', '/demos/crimson-folio/assets/js/main.js', '/demos/crimson-folio/assets/img/mira-avatar.webp', '/demos/crimson-folio/assets/img/mira-portrait.webp']) {
      const response = await request.request.get(base + relative);
      const body = await response.body();
      const local = path.resolve(__dirname, '../../../../../public', '.' + relative);
      assert(response.ok() && hash(body) === hash(fs.readFileSync(local)), 'asset bytes ' + relative);
      report.assets.push({ path: relative, status: response.status(), sha256: hash(body) });
    }
    const unauthorized = await request.request.get(base + '/api/download?id=t13');
    assert(unauthorized.status() === 401, 'anonymous download blocked');
    report.anonymousDownload = unauthorized.status();
    report.authorizedDownload = 'NOT TESTED: no purchase entitlement created';
    await request.close();
    assert(!report.errors.length, 'browser errors ' + report.errors.join(', '));
    report.result = 'PASS';
  } catch (error) { report.result = 'FAIL'; report.error = error.message; throw error; }
  finally {
    fs.writeFileSync(path.join(__dirname, online ? 'store-online.json' : 'store-local.json'), JSON.stringify(report, null, 2));
    await browser.close();
  }
  console.log(JSON.stringify({ result: report.result, views: report.views.length, assets: report.assets.length, browser: report.browser }));
})();
