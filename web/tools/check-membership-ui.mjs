// Local browser checks. Every API request is intercepted; no live writes/payments.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('../_design/.browsers');
const { chromium } = await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ headless: true });
const output = resolve('reviews/2026-10-15-premium');
await mkdir(output, { recursive: true });
let checks = 0;
const base = process.env.STORE_URL || 'http://127.0.0.1:4371';
try {
  for (const locale of ['vi-VN', 'en-US', 'zh-CN']) {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ locale, viewport: { width, height: 900 } });
      let signedIn = false, member = false, checkoutRequests = [];
      await context.route('**/api/**', async route => {
        const url = route.request().url();
        let body = {};
        if (url.includes('/api/auth/session')) body = signedIn ? { user: { id: 'test-user', name: 'Buyer', email: 'buyer@example.test' }, expires: '2099-01-01T00:00:00Z' } : null;
        else if (url.includes('/api/auth/providers')) body = {};
        else if (url.includes('/api/profile')) body = { name: 'Buyer', image: null, downloadIds: member ? ['t31'] : [] };
        else if (url.includes('/api/download')) {
          await route.fulfill({status:200,contentType:'application/zip',headers:{'Content-Disposition':'attachment; filename=test.zip'},body:'PKtest'});
          return;
        }
        else if (url.includes('/api/saved-templates/counts')) body = { counts: {} };
        else if (url.includes('/api/saved-templates')) body = { ids: [] };
        else if (url.includes('/api/checkout')) { checkoutRequests.push(route.request().postDataJSON()); body = { error: 'Offline test: payment request verified.' }; }
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
      });
      const page = await context.newPage();
      await page.goto(`${base}/?tab=pricing`);
      const cards = page.locator('.pricing-card');
      await cards.first().waitFor();
      assert.equal(await cards.count(), 2); checks++;
      assert.equal(await cards.nth(0).locator('h3').textContent(), 'Premium'); checks++;
      assert.equal(await cards.nth(1).locator('h3').textContent(), 'Ultra'); checks++;
      assert.match(await cards.nth(0).textContent(), /20/); checks++;
      assert.match(await cards.nth(1).textContent(), /200/); checks++;
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true); checks++;
      await page.screenshot({ path: resolve(output, `pricing-${locale}-${width}.png`), fullPage: true });
      await cards.first().locator('button').click();
      await page.locator('input[type="password"]').waitFor();
      assert.equal(checkoutRequests.length, 0); checks++;
      signedIn = true;
      await page.reload();
      await cards.first().waitFor();
      await page.getByText('Buyer', { exact: true }).waitFor();
      for (const [index, kind] of [[0, 'PRO'], [1, 'ULTRA']]) {
        await Promise.all([page.waitForResponse(response => response.url().includes('/api/checkout')), cards.nth(index).locator('button').click()]);
        await page.waitForFunction(() => document.body.textContent.includes('Offline test: payment request verified.'));
        assert.equal(checkoutRequests.at(-1).kind, kind); checks++;
        assert.equal(checkoutRequests.at(-1).email, 'buyer@example.test'); checks++;
      }
      await page.goto(`${base}/?tab=library`);
      await page.locator('.product-card').first().waitFor();
      assert.equal(await page.locator('.cart-template-button').count(), 0); checks++;
      await page.goto(`${base}/?mau=t31`);
      const explore = { 'vi-VN': 'Xem gói Premium', 'en-US': 'Explore Premium plans', 'zh-CN': '查看 Premium 套餐' }[locale];
      const download = { 'vi-VN': 'Tải sản phẩm', 'en-US': 'Download product', 'zh-CN': '下载产品' }[locale];
      await page.getByRole('button', {name:explore}).waitFor();
      assert.equal(await page.locator('.cart-detail-button').count(),0); checks++;
      await page.getByRole('button', {name:explore}).click();
      await page.waitForURL('**/?tab=pricing'); checks++;
      member = true;
      await page.goto(`${base}/?mau=t31`);
      await page.getByRole('button', {name:download,exact:false}).waitFor();
      const [file] = await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:download,exact:false}).click()]);
      assert.match(file.url(), /api\/download\?id=t31/); checks++;
      assert.equal(checkoutRequests.length,2); checks++;
      await context.close();
      console.log(`PASS pricing ${locale} at ${width}px: prices, layout, login gate, Premium/Ultra checkout requests.`);
    }
  }
  console.log(`PASS ${checks} browser checks (Chromium, mocked API). Screenshots: ${output}`);
} finally { await browser.close(); }
