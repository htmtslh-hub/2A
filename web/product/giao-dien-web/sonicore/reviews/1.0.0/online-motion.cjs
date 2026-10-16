const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const { chromium, firefox } = require('../../../../../../_design/.tooling/node_modules/playwright');

const url = 'https://forgezone.store/demos/sonicore/index.html?v=1.0.0';

(async () => {
  const report = { url, date: new Date().toISOString(), browsers: [] };
  for (const [name, engine, options] of [
    ['chromium', chromium, {}],
    ['firefox', firefox, {}],
    ['edge', chromium, { channel: 'msedge' }],
    ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }]
  ]) {
    const b = await engine.launch({ headless: true, ...options });
    try {
      const context = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      await context.addInitScript(() => {
        localStorage.setItem('motion', 'off');
        localStorage.setItem('sonicore-motion', 'off');
      });
      const p = await context.newPage();
      await p.goto(url, { waitUntil: 'load' });
      await p.waitForTimeout(1000);
      const row = { name, version: b.version() };

      await p.locator('#hero-next').click();
      await p.waitForTimeout(90);
      row.mid = await p.locator('[data-hero-main]').evaluate(e => ({
        opacity: Number(getComputedStyle(e).opacity),
        transform: getComputedStyle(e).transform
      }));
      assert(row.mid.transform !== 'none' && row.mid.opacity < 1 && row.mid.opacity > 0.2);
      await p.waitForTimeout(450);

      await p.locator('[data-sound-step="1"]').last().click();
      await p.waitForTimeout(550);
      await p.locator('[data-sound-step="1"]').last().click();
      await p.waitForTimeout(550);
      row.forwardWrap = (await p.locator('[data-view-count]').textContent()).trim();
      assert.equal(row.forwardWrap, '01');

      await p.locator('[data-sound-step="-1"]').click();
      await p.waitForTimeout(550);
      row.reverseWrap = (await p.locator('[data-view-count]').textContent()).trim();
      assert.equal(row.reverseWrap, '03');

      await p.locator('[data-sound-step="1"]').last().click({ clickCount: 4, delay: 30 });
      await p.waitForTimeout(600);
      row.rapid = (await p.locator('[data-view-count]').textContent()).trim();
      assert.equal(row.rapid, '01');

      await p.locator('[data-part="3"]').click();
      await p.waitForTimeout(150);
      row.part3 = await p.locator('[data-part="3"]').getAttribute('aria-pressed');
      assert.equal(row.part3, 'true');

      await p.locator('[data-mode="2"]').click();
      await p.waitForTimeout(150);
      row.modeGaming = (await p.locator('[data-mode-name]').textContent()).trim();
      assert.equal(row.modeGaming, 'GAMING');

      for (const width of [820, 375, 320]) {
        await p.setViewportSize({ width, height: 900 });
        await p.waitForTimeout(120);
        assert(await p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth));
      }
      row.mobileOverflow = false;
      report.browsers.push(row);
      await context.close();
    } finally {
      await b.close();
    }
  }
  fs.writeFileSync(path.join(__dirname, 'online-motion.json'), JSON.stringify(report, null, 2));
  console.log('PASS live 4 browsers: reduce/stale-off, midframe, both wraps, rapid, exploded parts, spatial modes, mobile');
})().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
