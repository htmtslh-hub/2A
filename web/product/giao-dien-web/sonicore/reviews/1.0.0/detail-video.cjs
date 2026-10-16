const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('_design/.browsers');
const { chromium } = require('../../../../../../_design/.tooling/node_modules/playwright');

(async () => {
  const b = await chromium.launch({ headless: true });
  try {
    const p = await b.newPage({ locale: 'en-US', viewport: { width: 1440, height: 900 } });
    await p.goto('https://forgezone.store/?mau=t40');
    await p.waitForTimeout(1000);
    const v = p.locator('video').first();
    await v.scrollIntoViewIfNeeded();
    await p.waitForFunction(() => {
      const el = document.querySelector('video');
      return el && !el.paused && el.currentTime > 0;
    });
    await p.getByRole('button', { name: /^Pause preview/ }).click();
    const before = await v.evaluate(e => e.currentTime);
    await p.waitForTimeout(650);
    const row = {
      browser: b.version(),
      paused: await v.evaluate(e => e.paused),
      drift: (await v.evaluate(e => e.currentTime)) - before
    };
    assert(row.paused && row.drift < 0.05);
    await p.getByRole('button', { name: /^Play preview/ }).click();
    await p.waitForTimeout(300);
    assert(!(await v.evaluate(e => e.paused)));
    row.resumed = true;
    await p.getByRole('button', { name: 'Fullscreen', exact: true }).click();
    await p.waitForTimeout(300);
    row.fullscreen = await p.evaluate(() => !!document.fullscreenElement);
    assert(row.fullscreen);
    await p.evaluate(() => document.exitFullscreen());
    fs.writeFileSync(path.join(__dirname, 'detail-video.json'), JSON.stringify(row, null, 2));
    console.log('PASS live detail pause/resume/fullscreen', row);
  } finally {
    await b.close();
  }
})().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
