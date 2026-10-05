import { mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const require = createRequire(import.meta.url);
const sharp = require('../../../../../../_design/.tooling/node_modules/sharp');
const ffmpeg = require('../../../../../../_design/.tooling/node_modules/ffmpeg-static');
const url = process.argv[2] || 'http://127.0.0.1:4173/';
const evidence = resolve('web/product/giao-dien-web/astra-interior/reviews/1.0.0');
const recordingDir = resolve(evidence, 'recordings');

await mkdir(recordingDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const [name, width, height] of [['tablet', 820, 1180], ['mobile', 375, 812]]) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.getElementById('sequence-source')?.complete);
  await page.waitForTimeout(1800);
  const png = await page.screenshot();
  await sharp(png).webp({ quality: 87 }).toFile(resolve(`web/public/previews/astra-interior-${name}.webp`));
  await context.close();
}

const context = await browser.newContext({
  viewport: { width: 1396, height: 1048 },
  recordVideo: { dir: recordingDir, size: { width: 1396, height: 1048 } },
});
const page = await context.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => document.getElementById('sequence-source')?.complete);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1800);
const poster = await page.screenshot();
await sharp(poster).resize(698, 524).webp({ quality: 88 }).toFile(resolve('web/public/previews/astra-interior.webp'));

const sequenceEnd = await page.evaluate(() => document.getElementById('experience').offsetHeight - innerHeight);
for (let frame = 0; frame < 24; frame += 1) {
  await page.evaluate(([y, step]) => scrollTo(0, y * step / 23), [sequenceEnd, frame]);
  await page.waitForTimeout(145);
}

const sectionTargets = await page.locator('main > section').evaluateAll((sections) => sections.slice(1).map((section) => Math.min(section.offsetTop - 40, document.documentElement.scrollHeight - innerHeight)));
for (const target of sectionTargets) {
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'smooth' }), target);
  await page.waitForTimeout(850);
}
await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }));
await page.waitForTimeout(850);

const video = page.video();
await context.close();
const input = await video.path();
await browser.close();

const output = resolve('web/public/previews/astra-interior.mp4');
execFileSync(ffmpeg, ['-y', '-i', input, '-vf', 'fps=24,scale=1396:1048', '-c:v', 'libx264', '-preset', 'medium', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', output], { stdio: ['ignore', 'ignore', 'pipe'] });
console.log(`Astra previews ready. MP4: ${(await stat(output)).size} bytes`);
