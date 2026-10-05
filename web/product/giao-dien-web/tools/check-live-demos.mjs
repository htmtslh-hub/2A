import { resolve } from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium } = await import('../../../../_design/.tooling/node_modules/playwright/index.mjs');

const origin = process.argv[2] || 'http://127.0.0.1:3100';
const templates = [
  ['t1', 'kinetiq'],
  ['t2', 'tidal'],
  ['t3', 'keystead'],
  ['t4', 'solenne'],
  ['t5', 'aeris'],
  ['t6', 'meridian'],
];

const browser = await chromium.launch({ headless: true });
const errors = [];

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addCookies([{ name: 'agentic-lang', value: 'vi', url: origin }]);
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));

  for (const [id, slug] of templates) {
    await page.goto(`${origin}/?mau=${id}`, { waitUntil: 'networkidle' });
    const iframe = page.locator(`iframe[src="/demos/${slug}/index.html"]`);
    await iframe.waitFor();
    const frame = page.frames().find((candidate) => candidate.url().includes(`/demos/${slug}/index.html`));
    if (!frame) throw new Error(`${slug}: interactive frame did not load`);

    const state = await frame.evaluate(() => ({
      title: document.title,
      text: document.body.innerText.trim().length,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      stylesheetCount: document.styleSheets.length,
    }));
    if (!state.title || state.text < 100 || state.stylesheetCount < 1 || state.scrollHeight <= state.clientHeight) {
      throw new Error(`${slug}: incomplete interactive document ${JSON.stringify(state)}`);
    }
    console.log(`${slug}: interactive (${state.scrollHeight}px page)`);
  }

  if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
  await context.close();
} finally {
  await browser.close();
}
