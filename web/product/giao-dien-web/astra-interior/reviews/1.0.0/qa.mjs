import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../../../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');

const root = resolve(process.argv[2] || 'web/product/giao-dien-web/astra-interior/source');
const httpUrl = process.argv[3] || 'http://127.0.0.1:4173/';
const fileUrl = pathToFileURL(resolve(root, 'index.html')).href;
const evidence = resolve('web/product/giao-dien-web/astra-interior/reviews/1.0.0');
const shots = resolve(evidence, 'screenshots');
const sizes = [[1440, 900], [820, 1180], [375, 812], [320, 740]];
const report = { generatedAt: new Date().toISOString(), root, httpUrl, browsers: {}, failures: [] };

await mkdir(shots, { recursive: true });

function check(value, message) {
  if (!value) report.failures.push(message);
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((el) => Number(el.tagName.slice(1)));
    const source = document.getElementById('sequence-source');
    const canvas = document.getElementById('sequence-canvas');
    return {
      lang: document.documentElement.lang,
      h1: document.querySelectorAll('h1').length,
      landmarks: ['header', 'nav', 'main', 'footer'].every((selector) => document.querySelector(selector)),
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
      headingJumps: headings.filter((level, index) => index > 0 && level > headings[index - 1] + 1),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      sourceReady: Boolean(source && source.complete && source.naturalWidth === 3840 && source.naturalHeight === 1440),
      canvasReady: Boolean(canvas && canvas.width > 0 && canvas.height > 0),
      brokenInternalLinks: [...document.querySelectorAll('a[href^="#"]')].filter((link) => !document.querySelector(link.hash)).map((link) => link.getAttribute('href')),
      badLinks: [...document.querySelectorAll('a')].filter((link) => !link.getAttribute('href') || link.getAttribute('href') === '#').map((link) => link.textContent.trim()),
    };
  });
}

for (const [browserName, browserType] of [['chromium', chromium], ['firefox', firefox]]) {
  const browser = await browserType.launch({ headless: true });
  const browserResult = report.browsers[browserName] = { version: browser.version(), viewports: {}, consoleErrors: [], requestFailures: [], axe: [] };

  for (const [width, height] of sizes) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    page.on('console', (message) => { if (message.type() === 'error') browserResult.consoleErrors.push(message.text()); });
    page.on('requestfailed', (request) => { if (!request.url().includes('fonts.')) browserResult.requestFailures.push(request.url()); });
    await page.goto(httpUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.getElementById('sequence-source')?.complete, null, { timeout: 15000 });
    await page.waitForTimeout(1750);

    const initial = await inspectPage(page);
    const smallTargets = await page.locator('a,button').evaluateAll((elements) => elements
      .filter((element) => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden')
      .map((element) => ({ label: element.getAttribute('aria-label') || element.textContent.trim(), width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }))
      .filter((rect) => rect.width < 44 || rect.height < 44));
    const target = await page.evaluate(() => {
      const section = document.getElementById('experience');
      const distance = section.offsetHeight - innerHeight;
      scrollTo(0, section.offsetTop + distance * .56);
      return section.offsetTop + distance * .56;
    });
    await page.waitForTimeout(300);
    const frame = await page.locator('#frame-count').textContent();
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(150);

    if (width <= 900) {
      const toggle = page.locator('.nav-toggle');
      await toggle.click();
      const open = await toggle.getAttribute('aria-expanded');
      const menuVisible = await page.locator('#site-nav').isVisible();
      await page.keyboard.press('Escape');
      const closed = await toggle.getAttribute('aria-expanded');
      const focused = await toggle.evaluate((element) => document.activeElement === element);
      browserResult.viewports[`${width}x${height}`] = { initial, smallTargets, sequenceScrollTarget: target, frame, menu: { open, menuVisible, closed, focused } };
      check(open === 'true' && menuVisible && closed === 'false' && focused, `${browserName} ${width}: mobile menu behaviour`);
    } else {
      browserResult.viewports[`${width}x${height}`] = { initial, smallTargets, sequenceScrollTarget: target, frame };
    }

    check(initial.scrollWidth === initial.clientWidth, `${browserName} ${width}: horizontal overflow`);
    check(initial.lang === 'en' && initial.h1 === 1 && initial.landmarks, `${browserName} ${width}: document structure`);
    check(initial.sourceReady && initial.canvasReady, `${browserName} ${width}: sequence source/canvas`);
    check(initial.duplicateIds.length === 0 && initial.headingJumps.length === 0, `${browserName} ${width}: ids/headings`);
    check(initial.brokenInternalLinks.length === 0 && initial.badLinks.length === 0, `${browserName} ${width}: links`);
    check(Number(frame) >= 11 && Number(frame) <= 16, `${browserName} ${width}: scroll frame mapping (${frame})`);
    check(smallTargets.length === 0, `${browserName} ${width}: touch targets ${JSON.stringify(smallTargets)}`);

    if (width === 1440) {
      browserResult.axe = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.map((violation) => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map((node) => node.target) }));
      check(browserResult.axe.length === 0, `${browserName}: axe ${browserResult.axe.map((item) => item.id).join(',')}`);
    }

    await page.screenshot({ path: resolve(shots, `${browserName}-${width}.png`), fullPage: true });
    await context.close();
  }

  const reducedContext = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(httpUrl, { waitUntil: 'domcontentloaded' });
  await reducedPage.waitForTimeout(300);
  browserResult.reducedMotion = await reducedPage.evaluate(() => ({
    sequenceHeight: document.getElementById('experience').getBoundingClientRect().height,
    frame: document.getElementById('frame-count').textContent,
    heroVisible: getComputedStyle(document.querySelector('[data-stage="0"]')).opacity,
  }));
  check(Number(browserResult.reducedMotion.frame) === 1, `${browserName}: reduced motion frame`);
  await reducedContext.close();

  const noJsContext = await browser.newContext({ viewport: { width: 320, height: 740 }, javaScriptEnabled: false });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(httpUrl, { waitUntil: 'domcontentloaded' });
  browserResult.noJavaScript = await noJsPage.evaluate(() => ({
    navVisible: Boolean(document.querySelector('#site-nav')?.getClientRects().length),
    heroTextVisible: getComputedStyle(document.querySelector('[data-stage="0"]')).opacity,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyText: document.body.innerText.length,
  }));
  check(browserResult.noJavaScript.navVisible && Number(browserResult.noJavaScript.heroTextVisible) > .99 && browserResult.noJavaScript.bodyText > 1000 && browserResult.noJavaScript.scrollWidth <= browserResult.noJavaScript.clientWidth, `${browserName}: no-JS fallback`);
  await noJsPage.screenshot({ path: resolve(shots, `${browserName}-nojs-320.png`), fullPage: true });
  await noJsContext.close();

  const fileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const filePage = await fileContext.newPage();
  await filePage.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await filePage.waitForTimeout(500);
  browserResult.fileProtocol = await inspectPage(filePage);
  check(browserResult.fileProtocol.sourceReady && browserResult.fileProtocol.canvasReady, `${browserName}: file protocol sequence`);
  await fileContext.close();

  const keyboardContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const keyboardPage = await keyboardContext.newPage();
  await keyboardPage.goto(httpUrl, { waitUntil: 'domcontentloaded' });
  await keyboardPage.evaluate(() => document.fonts.ready);
  await keyboardPage.waitForTimeout(200);
  await keyboardPage.keyboard.press('Tab');
  const skipFocused = await keyboardPage.locator('.skip-link').evaluate((element) => document.activeElement === element && element.getBoundingClientRect().top >= 0);
  await keyboardPage.keyboard.press('Enter');
  const mainFocused = await keyboardPage.locator('main').evaluate((element) => document.activeElement === element);
  await keyboardPage.evaluate(() => { document.documentElement.style.zoom = '2'; });
  const zoom = await keyboardPage.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  browserResult.keyboard = { skipFocused, mainFocused };
  browserResult.zoom200 = zoom;
  check(skipFocused && mainFocused, `${browserName}: skip-link keyboard path`);
  check(zoom.scrollWidth <= zoom.clientWidth, `${browserName}: 200% zoom overflow`);
  await keyboardContext.close();
  await browser.close();
}

await writeFile(resolve(evidence, 'checks.json'), JSON.stringify(report, null, 2));
if (report.failures.length) {
  console.error(report.failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Astra Interior QA passed in Chromium and Firefox.');
}
