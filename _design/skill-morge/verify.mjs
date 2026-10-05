import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import(pathToFileURL(resolve('_design/.tooling/node_modules/playwright/index.mjs')).href);
const output = resolve('_design/skill-morge');
mkdirSync(output, { recursive: true });
const url = pathToFileURL(resolve('skill/skill-morge/assets/demo.html')).href;
const report = { url, cases: [], failures: [], errors: [] };
const check = (ok, message) => { if (!ok) report.failures.push(message); };
const launchers = [
  ['coccoc', chromium, 'C:/Program Files/CocCoc/Browser/Application/browser.exe'],
  ['edge', chromium, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],
  ['firefox', firefox, undefined]
];
for (const [name, launcher, executablePath] of launchers) {
  console.log(`Testing ${name}`);
  const browser = await launcher.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    const native = window.requestAnimationFrame;
    window.morgeRafRequests = 0;
    window.requestAnimationFrame = callback => { window.morgeRafRequests++; return native(callback); };
  });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(`${name}: ${error.message}`));
  await page.goto(`${url}?motion=on`);
  await page.waitForTimeout(120);
  let selected = 0;
  const transitions = [];
  for (const direction of [1, 1, 1, -1, -1, -1]) {
    const from = selected, to = (from + direction + 3) % 3, third = 3 - from - to;
    const result = await page.evaluate(async ({ from, to, third, direction }) => {
      const slides = [...document.querySelectorAll('[data-morge-slide]')];
      const pose = index => {
        const css = getComputedStyle(slides[index]);
        return { x: new DOMMatrixReadOnly(css.transform).m41, opacity: Number(css.opacity) };
      };
      const trace = [], started = performance.now();
      direction > 0 ? morgeDemo.next() : morgeDemo.previous();
      await new Promise(done => {
        const sample = () => {
          trace.push({ t: performance.now() - started, old: pose(from), incoming: pose(to), third: pose(third) });
          if (performance.now() - started < 1180) requestAnimationFrame(sample); else done();
        };
        requestAnimationFrame(sample);
      });
      return { trace, selected: document.querySelector('[data-morge]').dataset.morgeSelected, count: document.querySelector('[data-morge-count]').textContent };
    }, { from, to, third, direction });
    check(result.trace.some(frame => frame.t > 100 && frame.t < 850 && frame.old.x * direction < -10), `${name}: outgoing direction ${from}->${to}`);
    check(result.trace.some(frame => frame.t < 300 && frame.incoming.x * direction > 10), `${name}: incoming direction ${from}->${to}`);
    check(result.trace.every(frame => frame.third.opacity <= .47), `${name}: intermediate product hidden ${from}->${to}`);
    check(result.selected === String(to) && result.count === `0${to + 1} / 03`, `${name}: selected/counter ${from}->${to}`);
    transitions.push({ from, to, direction, samples: result.trace.length });
    selected = to;
  }
  await page.locator('[data-morge-next]').focus();
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(1180);
  check(await page.locator('[data-morge-count]').textContent() === '03 / 03', `${name}: keyboard reverse wrap`);
  await page.evaluate(() => { morgeDemo.select(0); morgeDemo.next(); morgeDemo.next(); morgeDemo.previous(); morgeDemo.next(); });
  await page.waitForTimeout(1200);
  check(await page.locator('[data-demo-caption]').textContent() === 'Pearl', `${name}: rapid selection content`);
  // CTA uses a finite tween and yields intermediate scene transforms.
  await page.evaluate(() => { const story = document.querySelector('[data-morge-story]'); scrollTo({ top: story.offsetTop, behavior: 'instant' }); });
  await page.waitForTimeout(150);
  await page.locator('[data-morge-scene-to="1"]').click();
  await page.waitForTimeout(240);
  const partial = await page.locator('[data-morge]').getAttribute('data-morge-progress');
  check(Number(partial) > 0 && Number(partial) < .5, `${name}: CTA intermediate frames`);
  await page.waitForTimeout(2200);
  check(await page.locator('[data-morge]').getAttribute('data-morge-active-scene') === '1', `${name}: CTA second scene`);
  await page.locator('[data-morge-scene-to="2"]').click();
  await page.waitForTimeout(2400);
  check(await page.locator('[data-morge]').getAttribute('data-morge-active-scene') === '2', `${name}: CTA third scene`);
  const idle = await page.evaluate(async () => {
    const before = morgeRafRequests;
    await new Promise(done => setTimeout(done, 200));
    return morgeRafRequests - before;
  });
  check(idle === 0, `${name}: RAF stops when idle (${idle})`);
  await page.evaluate(() => morgeDemo.goToScene(0));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.dispatchEvent(new WheelEvent('wheel', { deltaY: 50 })));
  const stopY = await page.evaluate(() => scrollY);
  await page.waitForTimeout(500);
  check(Math.abs(await page.evaluate(() => scrollY) - stopY) < 1, `${name}: wheel cancels scene tween`);
  await page.evaluate(() => { morgeDemo.next(); morgeDemo.setMotion(false); });
  check(await page.locator('[data-morge]').evaluate(root => !root.classList.contains('morge-motion') && [...root.querySelectorAll('[data-morge-scene]')].every(scene => !scene.inert)), `${name}: pause restores static scenes`);
  await page.reload();
  check(await page.locator('[data-morge]').evaluate(root => root.classList.contains('morge-paused')), `${name}: pause survives reload`);
  await page.evaluate(() => { morgeDemo.destroy(); window.morgeDemo = Morge.mount(document.querySelector('[data-morge]')); morgeDemo.setMotion(false); });
  await page.locator('[data-morge-next]').click();
  check(await page.locator('[data-morge-count]').textContent() === '02 / 03', `${name}: remount has only one listener`);
  await page.evaluate(() => morgeDemo.destroy());
  check(await page.locator('[data-morge-slide]').evaluateAll(slides => slides.every(slide => !slide.inert && !slide.getAttribute('aria-hidden') && !slide.style.transform)), `${name}: teardown restores slides`);
  report.cases.push({ name, version: browser.version(), transitions, idleRafRequests: idle });
  await context.close();
  if (name === 'coccoc') {
    for (const [width, height] of [[820,1180],[1180,820],[375,812],[414,582],[667,375]]) {
      const device = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: true });
      const mobile = await device.newPage();
      mobile.on('pageerror', error => report.errors.push(`${width}x${height}: ${error.message}`));
      await mobile.goto(`${url}?motion=on`); await mobile.waitForTimeout(80);
      const metrics = await mobile.evaluate(() => {
        const controls = document.querySelector('[data-morge-controls]').getBoundingClientRect();
        const prev = document.querySelector('[data-morge-prev]').getBoundingClientRect();
        const next = document.querySelector('[data-morge-next]').getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth > innerWidth, centerError: Math.abs((prev.left + next.right) / 2 - (controls.left + controls.width / 2)), minTarget: Math.min(prev.width, prev.height, next.width, next.height) };
      });
      check(!metrics.overflow && metrics.centerError < 1 && metrics.minTarget >= 44, `responsive ${width}x${height}: controls and overflow`);
      await mobile.locator('[data-morge-visual]').evaluate(element => {
        const start = new Touch({ identifier: 1, target: element, clientX: 270, clientY: 350 });
        const end = new Touch({ identifier: 1, target: element, clientX: 170, clientY: 350 });
        element.dispatchEvent(new TouchEvent('touchstart', { touches: [start], changedTouches: [start], bubbles: true }));
        element.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [end], bubbles: true }));
      });
      await mobile.waitForTimeout(1180);
      check(await mobile.locator('[data-morge-count]').textContent() === '02 / 03', `responsive ${width}x${height}: simulated swipe`);
      await mobile.screenshot({ path: resolve(output, `demo-${width}x${height}.png`) });
      await mobile.evaluate(() => localStorage.clear());
      // Fresh URL and cleared storage are required to test OS default.
      await mobile.goto(url);
      check(await mobile.locator('[data-morge]').evaluate(root => root.classList.contains('morge-paused')), `responsive ${width}x${height}: reduced default`);
      await device.close();
      const noJS = await browser.newContext({ viewport: { width, height }, javaScriptEnabled: false });
      const staticPage = await noJS.newPage(); await staticPage.goto(url);
      check(await staticPage.locator('[data-morge-scene]').count() === 3 && await staticPage.locator('[data-morge-slide]').count() === 3, `noJS ${width}x${height}: content retained`);
      check(await staticPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `noJS ${width}x${height}: no overflow`);
      await noJS.close();
      report.cases.push({ name: `responsive-${width}x${height}`, ...metrics, simulatedTouch: true, noJS: true });
    }
    const blocked = await browser.newContext({ reducedMotion: 'reduce' });
    await blocked.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } }));
    const offline = await blocked.newPage();
    offline.on('pageerror', error => report.errors.push(`storage-blocked: ${error.message}`));
    await offline.goto(`${url}?motion=off`);
    check(await offline.locator('[data-morge]').evaluate(root => root.classList.contains('morge-paused')), 'storage blocked: static');
    await offline.locator('[data-morge-motion]').click();
    check(await offline.locator('[data-morge]').evaluate(root => root.classList.contains('morge-motion')), 'storage blocked: explicit opt-in');
    await blocked.close();
  }
  await browser.close();
}
report.pass = !report.failures.length && !report.errors.length;
writeFileSync(resolve(output, 'verification.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
