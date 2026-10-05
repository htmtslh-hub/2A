/* Storefront checks do not create accounts, orders or transactions. */
import { resolve } from 'node:path';
import { writeFileSync, mkdirSync } from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium } = await import('../../../../_design/.tooling/node_modules/playwright/index.mjs');
const origin = process.argv[2] || 'http://127.0.0.1:3007';
const output = resolve('web/product/giao-dien-web/reviews/store-three');
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { origin, date: new Date().toISOString(), languages: {}, media: [], anonymousDownloads: [], errors: [], failures: [] };
const templates = [['t4', 'solenne', 'Solenne'], ['t5', 'aeris', 'Aeris'], ['t6', 'meridian', 'Meridian']];
function assert(value, label) { if (!value) report.failures.push(label); }
try {
  for (const lang of ['vi', 'en', 'zh']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.addCookies([{ name: 'agentic-lang', value: lang, url: origin }]);
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push({ lang, message: error.message }));
    page.on('console', message => { if (message.type() === 'error') report.errors.push({ lang, message: message.text() }); });
    await page.goto(`${origin}/?tab=library`, { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: 'Solenne', exact: true }).waitFor();
    const content = report.languages[lang] = { cards: [], details: [], home: [], guide: false, videos: [] };
    for (const [id, slug, name] of templates) {
      const heading = page.getByRole('heading', { name, exact: true });
      const card = heading.locator('xpath=ancestor::div[contains(@class,"hv8")][1]');
      await card.scrollIntoViewIfNeeded();
      const text = await card.innerText();
      const price = lang === 'vi' ? '1.900.000₫' : '$79';
      assert(text.includes(price), `${lang}/${name}: price does not match ${price}`);
      content.cards.push({ id, name, priceMatched: text.includes(price) });
      const video = card.locator('video').first();
      await page.waitForTimeout(500);
      await video.waitFor({ state: 'attached' });
      await page.waitForFunction(() => [...document.querySelectorAll('[data-video-preview] video')].some(v => !v.paused && v.readyState >= 2));
      const data = await video.evaluate(el => ({ src: el.getAttribute('src'), width: el.videoWidth, height: el.videoHeight, muted: el.muted, paused: el.paused, preload: el.preload, currentTime: el.currentTime, parentHeight: el.closest('[data-scroller]')?.style.height }));
      assert(data.src?.includes(`${slug}.mp4`) && data.width === 1396 && data.height === 1048 && data.muted && data.parentHeight === '100%', `${lang}/${name}: video mapping or aspect ratio`);
      const pause = card.getByRole('button', { name: /Pause preview|Tạm dừng video|暂停预览/ }).first();
      await pause.click();
      const paused = await video.evaluate(el => el.paused);
      assert(paused, `${lang}/${name}: pause control`);
      await page.mouse.move(0, 0);
      await card.hover();
      const transform = await video.evaluate(el => el.closest('[data-scroller]')?.style.transform);
      assert(transform !== 'translateY(-45%)', `${lang}/${name}: old image scroll applied to video`);
      content.videos.push({ ...data, pausePassed: paused, hoverTransform: transform });
    }
    await page.screenshot({ path: resolve(output, `library-${lang}.png`), fullPage: true });
    for (const [id, slug, name] of templates) {
      await page.goto(`${origin}/?mau=${id}`, { waitUntil: 'networkidle' });
      const heading = page.getByText(name, { exact: true }).first();
      await heading.waitFor();
      const text = await page.locator('body').innerText();
      assert(text.includes(lang === 'vi' ? '1.900.000₫' : '$79'), `${lang}/${id}: detail price`);
      assert(await page.locator(`a[href*="template=${slug}"]`).count() > 0, `${lang}/${id}: guide link`);
      assert(await page.locator(`img[src="/previews/${slug}-tablet.webp"]`).count() > 0 && await page.locator(`img[src="/previews/${slug}-mobile.webp"]`).count() > 0, `${lang}/${id}: actual responsive view stills missing`);
      content.details.push({ id, name, guideLink: true });
    }
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
    for (const [, , name] of templates) { assert(await page.getByRole('heading', { name, exact: true }).count() > 0, `${lang}/${name}: missing home showcase`); content.home.push(name); }
    await page.goto(`${origin}/huong-dan?template=solenne&view=template`, { waitUntil: 'networkidle' });
    content.guide = await page.getByRole('heading', { name: /Solenne/ }).count() > 0;
    assert(content.guide, `${lang}: template guide missing`);
    console.log(`${lang}: cards, video controls, details, home showcase and guide checked`);
    await context.close();
  }
  const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await reduced.newPage();
  await page.goto(`${origin}/?tab=library`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Solenne', exact: true }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  report.reducedMotion = await page.locator('[data-video-preview] video').evaluateAll(items => items.every(el => el.paused && !el.getAttribute('src')));
  assert(report.reducedMotion, 'Reduced motion auto-loaded or played video');
  report.mobileWidth = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  assert(report.mobileWidth.scrollWidth <= report.mobileWidth.clientWidth, 'Store mobile overflow');
  await page.screenshot({ path: resolve(output, 'library-mobile-reduced.png'), fullPage: true });
  for (const [id, slug] of templates) {
    const anonymous = await page.request.get(`${origin}/api/download?id=${id}`);
    report.anonymousDownloads.push({ id, status: anonymous.status() });
    assert(anonymous.status() === 401, `${id}: private ZIP not protected`);
    const leaked = await page.request.get(`${origin}/product/giao-dien-web/${slug}/${slug}.zip`);
    assert(leaked.status() === 404, `${id}: ZIP publicly accessible`);
    for (const file of [`${slug}.webp`, `${slug}.mp4`, `${slug}-tablet.webp`, `${slug}-mobile.webp`]) {
      const response = await page.request.get(`${origin}/previews/${file}`);
      report.media.push({ slug, file, status: response.status(), bytes: (await response.body()).length, contentType: response.headers()['content-type'] });
      assert(response.ok(), `${file}: missing preview`);
    }
  }
  report.authorisedDownload = 'NOT TESTED: no authenticated purchaser account supplied. No purchase or payment was simulated.';
  await reduced.close();
  assert(!report.errors.length, 'Browser console/page errors');
  writeFileSync(resolve(output, origin.startsWith('http://127.') ? 'local-checks.json' : 'deployment-checks.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ origin, languages: Object.keys(report.languages), previewAssets: report.media.length, reducedMotion: report.reducedMotion, anonymousDownloads: report.anonymousDownloads, errors: report.errors, failures: report.failures, authorisedDownload: report.authorisedDownload }, null, 2));
  process.exitCode = report.failures.length ? 1 : 0;
} finally { await browser.close(); }
