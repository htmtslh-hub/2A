import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out = resolve('web/product/giao-dien-web/watchroom/reviews/1.2.1');
mkdirSync(out + '/screenshots', { recursive: true });
const report = {};
for (const [name, executablePath] of [['edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],['coccoc','C:/Program Files/CocCoc/Browser/Application/browser.exe']]) {
  const browser = await chromium.launch({ headless: true, executablePath });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(pathToFileURL(resolve('web/product/giao-dien-web/watchroom/source/index.html')).href);
  assert.equal(await page.locator('.depth-ring').count(), 4);
  const sample = () => page.locator('.depth-ring').evaluateAll(nodes => nodes.map(e => ({ transform: getComputedStyle(e).transform, state: e.getAnimations().map(a => a.playState) })));
  const first = await sample(); await page.waitForTimeout(1000); const mid = await sample();
  assert.notDeepEqual(first, mid);
  const sizes = [];
  for (const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
    await page.setViewportSize({ width,height }); await page.waitForTimeout(100);
    const size = await page.evaluate(() => ({ width:innerWidth, scrollWidth:document.documentElement.scrollWidth }));
    assert.equal(size.width,size.scrollWidth); sizes.push(size);
  }
  await page.setViewportSize({ width:1440,height:900 });
  await page.screenshot({ path:out + '/screenshots/' + name + '-rings.png' });
  await page.locator('.motion-toggle').click(); await page.waitForTimeout(200);
  const paused = await sample(); assert(paused.every(e => e.state.every(s => s === 'paused')));
  await page.waitForTimeout(300); assert.deepEqual(await sample(),paused);
  await page.locator('.motion-toggle').click();
  await page.addStyleTag({ content:'*{animation:none!important;transition:none!important}' });
  await page.addStyleTag({ content:'.stage__light::before,.stage__light::after{animation:none!important;transition:none!important}' });
  await page.locator('[data-step="1"]').click(); await page.waitForTimeout(1000);
  const pulse = await page.locator('.stage__rings').evaluate(e => +e.style.getPropertyValue('--ring-pulse'));
  assert(pulse > 1);
  await page.waitForTimeout(500); assert.equal(await page.locator('h1').textContent(),'ONYX GMT');
  assert.equal(errors.length,0);
  report[name] = { version:browser.version(), first, mid, paused, sizes, pulse, errors };
  await browser.close(); console.log(name + ' PASS');
}
writeFileSync(out + '/rings.json',JSON.stringify(report,null,2));
