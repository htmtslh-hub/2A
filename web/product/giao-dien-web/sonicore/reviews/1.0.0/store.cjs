const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const { chromium, firefox } = require('../../../../../../_design/.tooling/node_modules/playwright');

const origin = process.env.SONICORE_STORE_URL || 'http://127.0.0.1:4398';
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const report = {
  origin,
  date: new Date().toISOString(),
  assets: [],
  locales: [],
  browsers: []
};

(async () => {
  for (const file of [
    'index.html',
    'assets/css/style.css',
    'assets/js/main.js',
    'assets/img/hero-headphone.webp',
    'assets/img/exploded-view.webp',
    'assets/img/spatial-bust.webp',
    'assets/img/design-closeup.webp'
  ]) {
    const r = await fetch(`${origin}/demos/sonicore/${file}`);
    assert.equal(r.status, 200);
    const bytes = Buffer.from(await r.arrayBuffer());
    assert.equal(hash(bytes), hash(fs.readFileSync(path.resolve(__dirname, '../../source', file))));
    report.assets.push({ file, bytes: bytes.length, sha256: hash(bytes) });
  }

  for (const file of ['sonicore.mp4', 'sonicore.webp']) {
    const r = await fetch(`${origin}/previews/${file}`);
    assert.equal(r.status, 200);
    const bytes = Buffer.from(await r.arrayBuffer());
    assert.equal(hash(bytes), hash(fs.readFileSync(path.resolve('web/public/previews', file))));
    report.assets.push({ file, bytes: bytes.length, sha256: hash(bytes) });
  }

  assert.equal((await fetch(origin + '/api/download?id=t40')).status, 401);
  assert.equal((await fetch(origin + '/product/giao-dien-web/sonicore/sonicore.zip')).status, 404);
  report.anonymous = 401;
  report.directZip = 404;

  for (const [id, slug] of [['t22', 'kinetiq'], ['t1', 'japan-trails']]) {
    const r = await fetch(origin + '/api/download?id=' + id);
    assert.equal(r.status, 200);
    assert.equal(hash(Buffer.from(await r.arrayBuffer())), hash(fs.readFileSync(`web/product/giao-dien-web/${slug}/${slug}.zip`)));
  }
  report.existingFree = 't22/t1 exact ZIP, anonymous 200';

  const b = await chromium.launch({ headless: true });
  try {
    for (const locale of ['vi-VN', 'en-US', 'zh-CN']) {
      for (const width of [1440, 375]) {
        const context = await b.newContext({ locale, viewport: { width, height: 900 } });
        const page = await context.newPage();
        await page.goto(origin + '/?mau=t40');
        await page.getByRole('heading', { name: /^Sonicore/ }).waitFor();
        await page.locator('button.hv10').waitFor();
        await page.getByText(/10 ?(files?|个)/).first().waitFor();
        const text = await page.locator('body').innerText();
        assert(text.includes('Premium'));
        assert(text.includes('10 file') || text.includes('10 files') || text.includes('10个'));
        assert.equal(await page.locator('.cart-detail-button').count(), 0);

        const [popup] = await Promise.all([
          page.waitForEvent('popup'),
          page.locator('button.hv10').click()
        ]);
        await popup.waitForLoadState();
        assert(popup.url().includes('/demos/sonicore/'));
        await popup.close();
        assert.equal((await page.locator('a[href*="template=sonicore"]').count()) > 0, true);

        await page.goto(origin + '/huong-dan?template=sonicore&view=template');
        assert((await page.locator('body').innerText()).includes('Sonicore'));

        await page.goto(origin + '/?tab=library');
        await page.waitForTimeout(1000);
        const card = page.locator('a.product-card[href="?mau=t40"]');
        await card.waitFor();
        await card.scrollIntoViewIfNeeded();
        assert((await card.innerText()).includes('Premium'));
        assert.equal(await card.locator('button').count(), 0);
        await card.click();
        await page.getByRole('heading', { name: /^Sonicore/ }).waitFor();
        report.locales.push({ locale, width, detail: true, guide: true, library: true });
        await context.close();
      }
    }
  } finally {
    await b.close();
  }

  for (const [name, engine, options] of [
    ['chromium', chromium, {}],
    ['firefox', firefox, {}],
    ['edge', chromium, { channel: 'msedge' }],
    ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }]
  ]) {
    const browser = await engine.launch({ headless: true, ...options });
    try {
      const p = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      await p.goto(origin + '/?tab=library');
      await p.waitForTimeout(1000);
      const card = p.locator('a.product-card[href="?mau=t40"]');
      await card.scrollIntoViewIfNeeded();
      await p.waitForTimeout(1400);
      const status = await card.locator('video').evaluate(e => ({
        paused: e.paused,
        time: e.currentTime,
        muted: e.muted,
        src: e.currentSrc
      }));
      assert(!status.paused && status.time > 0 && status.muted);
      assert(status.src.includes('sonicore.mp4'));
      report.browsers.push({ name, version: browser.version(), status });
      await p.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await p.waitForTimeout(500);
      report.browsers.at(-1).offscreenPaused = await card.locator('video').evaluate(e => e.paused);
      assert(report.browsers.at(-1).offscreenPaused);
    } finally {
      await browser.close();
    }
  }

  const outFile = process.env.SONICORE_STORE_URL ? 'online-store.json' : 'local-store.json';
  fs.writeFileSync(path.join(__dirname, outFile), JSON.stringify(report, null, 2));
  console.log('PASS store', report.locales.length, 'locale/viewports; 4 browsers; exact assets; download guards');
})().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
