import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve('D:/3. Dự án/2A');

// Set Playwright browser path
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve(ROOT, '_design/.browsers');
const playwrightModule = resolve(ROOT, '_design/.tooling/node_modules/playwright/index.mjs');
const { chromium, firefox } = await import(pathToFileURL(playwrightModule).href);

const outDir = resolve(HERE, 'screenshots');
mkdirSync(outDir, { recursive: true });

const htmlUrl = pathToFileURL(resolve(HERE, '../../source/index.html')).href;

const browsers = [
  ['chromium', chromium, {}],
  ['firefox', firefox, {}],
  ['edge', chromium, { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' }],
  ['coccoc', chromium, { executablePath: 'C:/Program Files/CocCoc/Browser/Application/browser.exe' }],
];

const results = {};

for (const [name, engine, launchOpts] of browsers) {
  console.log(`Testing browser: ${name}...`);
  const browser = await engine.launch({ headless: true, ...launchOpts });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce', // Rule verification: motion must remain enabled by default even when system requests reduce
  });
  
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  await page.goto(htmlUrl);
  await page.waitForTimeout(2000);

  const browserVersion = browser.version();
  const browserReport = {
    version: browserVersion,
    errors,
    viewports: [],
    interactions: {},
  };

  // 1. Viewport & Overflow Tests
  const viewports = [
    [1440, 900],
    [820, 1180],
    [375, 812],
    [320, 740],
  ];

  for (const [w, h] of viewports) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(400);

    const metrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    // Verify horizontal overflow invariant: scrollWidth <= clientWidth
    assert(
      metrics.scrollWidth <= metrics.clientWidth + 1,
      `Horizontal overflow detected at ${w}x${h} on ${name}: scrollWidth=${metrics.scrollWidth}, clientWidth=${metrics.clientWidth}`
    );

    browserReport.viewports.push({ width: w, height: h, ...metrics });

    // Scroll through page to trigger all reveals before screenshot
    await page.evaluate(async () => {
      const scrollStep = 500;
      for (let y = 0; y < document.body.scrollHeight; y += scrollStep) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    // Capture screenshot
    await page.screenshot({
      path: resolve(outDir, `${name}-${w}x${h}.png`),
      fullPage: true,
    });
  }

  // Restore 1440x900 for interaction tests
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(300);

  // 2. Camera View Switching Test
  const initialThumb = await page.locator('.hero__thumb.is-active').getAttribute('data-view');
  assert.equal(initialThumb, 'front', 'Default active thumb should be front');

  // Click SIDE
  await page.locator('.hero__thumb[data-view="side"]').click();
  await page.waitForTimeout(300);
  const activeThumbAfterSide = await page.locator('.hero__thumb.is-active').getAttribute('data-view');
  assert.equal(activeThumbAfterSide, 'side', 'Active thumb should switch to side');

  // Click INSIDE
  await page.locator('.hero__thumb[data-view="inside"]').click();
  await page.waitForTimeout(300);
  const activeThumbAfterInside = await page.locator('.hero__thumb.is-active').getAttribute('data-view');
  assert.equal(activeThumbAfterInside, 'inside', 'Active thumb should switch to inside');

  browserReport.interactions.cameraSwitch = 'PASS';

  // 3. Motion Toggle Test
  const motionBtn = page.locator('#motion-toggle');
  const initialMotionText = await page.locator('#motion-label').textContent();
  assert(initialMotionText.includes('ON'), 'Motion must start ON by default');

  await motionBtn.click();
  await page.waitForTimeout(200);
  const pausedMotionText = await page.locator('#motion-label').textContent();
  assert(pausedMotionText.includes('PAUSED'), 'Motion label should show PAUSED after click');

  await motionBtn.click();
  await page.waitForTimeout(200);
  const resumedMotionText = await page.locator('#motion-label').textContent();
  assert(resumedMotionText.includes('ON'), 'Motion label should show ON after second click');
  browserReport.interactions.motionToggle = 'PASS';

  // 4. Tachometer Rev Test
  await page.locator('#btn-rev-engine').click();
  await page.waitForTimeout(300);
  const revText = await page.locator('#rpm-readout').textContent();
  assert(revText.includes('PEAK'), 'Tachometer readout should reflect rev state');
  browserReport.interactions.tachometer = 'PASS';

  // 5. VIP Form Validation & Submission Test
  await page.locator('#client-name').fill('Alexander Vance');
  await page.locator('#client-email').fill('alexander@example.com');
  await page.locator('#enquiry-form button[type="submit"]').click();
  await page.waitForTimeout(300);

  const isSuccessVisible = await page.locator('#form-success').isVisible();
  assert(isSuccessVisible, 'Success panel must be visible after valid submission');
  const refText = await page.locator('#success-ref').textContent();
  assert(refText.includes('TURBO-S-EXCL'), 'Confirmation reference must be generated');
  browserReport.interactions.formSubmission = 'PASS';

  assert.equal(errors.length, 0, `Page errors found in ${name}: ${errors.join(', ')}`);

  await browser.close();
  results[name] = browserReport;
  console.log(`✓ ${name} passed all checks.`);
}

writeFileSync(resolve(HERE, 'checks.json'), JSON.stringify(results, null, 2), 'utf8');
console.log('All browser checks completed successfully!');
