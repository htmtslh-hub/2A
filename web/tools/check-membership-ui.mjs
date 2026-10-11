// Local browser checks. Every API request is intercepted; no live writes/payments.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('../_design/.browsers');
const { chromium } = await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ headless: true });
const output = resolve('reviews/2026-10-11-memberships');
await mkdir(output, { recursive: true });
let checks = 0;
try {
  for (const locale of ['vi-VN', 'en-US', 'zh-CN']) {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ locale, viewport: { width, height: 900 } });
      let signedIn = false, checkoutRequests = [];
      await context.route('**/api/**', async route => {
        const url = route.request().url();
        let body = {};
        if (url.includes('/api/auth/session')) body = signedIn ? { user: { id: 'test-user', name: 'Buyer', email: 'buyer@example.test' }, expires: '2099-01-01T00:00:00Z' } : null;
        else if (url.includes('/api/auth/providers')) body = {};
        else if (url.includes('/api/saved-templates/counts')) body = { counts: {} };
        else if (url.includes('/api/saved-templates')) body = { ids: [] };
        else if (url.includes('/api/checkout')) { checkoutRequests.push(route.request().postDataJSON()); body = { error: 'Offline test: payment request verified.' }; }
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
      });
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:4371/?tab=pricing');
      const cards = page.locator('.pricing-card');
      await cards.first().waitFor();
      assert.equal(await cards.count(), 2); checks++;
      assert.equal(await cards.nth(0).locator('h3').textContent(), 'Pro'); checks++;
      assert.equal(await cards.nth(1).locator('h3').textContent(), 'Ultra'); checks++;
      assert.match(await cards.nth(0).textContent(), /99/); checks++;
      assert.match(await cards.nth(1).textContent(), /299/); checks++;
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
      await context.close();
      console.log(`PASS pricing ${locale} at ${width}px: prices, layout, login gate, Pro/Ultra checkout requests.`);
    }
  }
  console.log(`PASS ${checks} browser checks (Chromium, mocked API). Screenshots: ${output}`);
} finally { await browser.close(); }
