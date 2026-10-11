import { chromium } from '../../../../../../_design/.tooling/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, '../../source/index.html');
const shots = resolve(here, 'screenshots');
mkdirSync(shots, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const report = { browser: 'Microsoft Edge', version: browser.version(), date: new Date().toISOString(), viewports: [], errors: [] };
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', e => report.errors.push(e.message));
for (const [width, height] of [[1440,900],[820,1180],[375,812],[320,740]]) {
  await page.setViewportSize({ width, height });
  await page.goto(pathToFileURL(source).href);
  await page.waitForTimeout(900);
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(350);
  await page.evaluate(() => scrollTo(0, 0));
  const state = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, images: [...document.images].map(i => ({src:i.getAttribute('src'), loaded:i.complete && i.naturalWidth > 0})), headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>e.textContent.trim()), links:[...document.querySelectorAll('a')].map(e=>e.getAttribute('href')) }));
  if (width <= 950) {
    await page.locator('.nav-toggle').click();
    state.menuOpens = await page.locator('#site-menu').isVisible();
    await page.keyboard.press('Escape');
    state.escapeCloses = await page.locator('.nav-toggle').getAttribute('aria-expanded') === 'false';
    state.focusReturns = await page.locator('.nav-toggle').evaluate(e=>e===document.activeElement);
  }
  await page.screenshot({ path: resolve(shots, `edge-${width}.png`), fullPage: true });
  report.viewports.push(state);
}
// Prove the finite entrance still runs under reduced motion and ends.
report.motion = await page.evaluate(async () => {
  const e = document.querySelector('.edit__copy');
  e.classList.remove('is-visible');
  await new Promise(r=>setTimeout(r,350));
  const before=getComputedStyle(e).transform;
  e.classList.add('is-visible');
  await new Promise(r=>setTimeout(r,70));
  const during=getComputedStyle(e).transform;
  await new Promise(r=>setTimeout(r,350));
  return { reducedPreference: matchMedia('(prefers-reduced-motion: reduce)').matches, before, during, after:getComputedStyle(e).transform, running:document.getAnimations().filter(a=>a.playState==='running').length };
});
await page.route('**/assets/img/**', r=>r.abort());
await page.goto('http://127.0.0.1:4347');
report.missingImages = await page.evaluate(() => ({ width:innerWidth, scrollWidth:document.documentElement.scrollWidth, content:document.querySelector('main').textContent.includes('Your kind of beautiful.'), contact:document.querySelector('a[href^="mailto:"]').getAttribute('href') }));
await page.screenshot({path:resolve(shots,'edge-missing-images-320.png'),fullPage:true});
await browser.close();
report.failures = report.viewports.filter(v=>v.scrollWidth>v.width || v.images.some(i=>!i.loaded) || v.menuOpens===false || v.escapeCloses===false || v.focusReturns===false);
writeFileSync(resolve(here,'extra-checks.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({browser:report.browser,version:report.version,failures:report.failures,errors:report.errors,motion:report.motion,missingImages:report.missingImages},null,2));
