import { chromium } from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const evidence = {};
for (const channel of ['chromium', 'msedge']) {
  try {
    const browser = await chromium.launch({ ...(channel === 'msedge' ? { channel } : {}), headless: true });
    evidence[channel] = { version: browser.version(), cases: [] };
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion });
      await page.addInitScript(() => {
        localStorage.setItem('motion', 'off');
        window.__frames = [];
        const sample = () => {
          const bike = document.querySelector('.showroom__bike');
          if (bike) window.__frames.push({ t: performance.now(), opacity: getComputedStyle(bike).opacity, transform: getComputedStyle(bike).transform });
          if (performance.now() < 1800) requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
      });
      await page.goto('http://127.0.0.1:4339');
      await page.waitForTimeout(1900);
      const frames = await page.evaluate(() => window.__frames);
      const partial = frames.filter(f => +f.opacity > 0.01 && +f.opacity < .99);
      evidence[channel].cases.push({ reducedMotion, oldMotionOff: true, intermediateFrames: partial.length, starts: frames.slice(0, 4), final: frames.at(-1), pass: partial.length > 2 && +frames.at(-1).opacity === 1 });
      await page.close();
    }
    const page = await browser.newPage();
    await page.addInitScript(() => { Element.prototype.animate = undefined; });
    await page.goto('http://127.0.0.1:4339');
    await page.waitForTimeout(900);
    evidence[channel].fallback = await page.locator('.showroom__bike').evaluate(el => ({ opacity: getComputedStyle(el).opacity, inlineStyle: el.getAttribute('style') }));
    await browser.close();
  } catch (error) { evidence[channel] = { status: 'NOT TESTED', reason: error.message }; }
}
writeFileSync(resolve('web/product/giao-dien-web/velora/reviews/1.0.0/motion.json'), JSON.stringify(evidence, null, 2));
console.log(JSON.stringify(evidence));
