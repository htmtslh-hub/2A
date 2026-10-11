import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('../_design/.browsers');
const { chromium, firefox } = await import('../../_design/.tooling/node_modules/playwright/index.mjs');
const base = 'http://127.0.0.1:4360';
const results = [];
await mkdir('reviews/admin', { recursive: true });

const browsers = [
  ['Chromium', chromium, null, 375], ['Firefox', firefox, null, 820],
  ['Edge', chromium, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 1440],
  ['CocCoc', chromium, 'C:/Program Files/CocCoc/Browser/Application/browser.exe', 320],
];
for (const [name, engine, executablePath, width] of browsers) {
  const browser = await engine.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    localStorage.setItem('agentic-motion', 'off'); localStorage.setItem('forge-motion', 'off');
    const native = requestAnimationFrame.bind(window), cancel = cancelAnimationFrame.bind(window);
    window.__nativeRAF = native; window.__pendingRAF = new Set();
    window.requestAnimationFrame = cb => {
      let id; id = native(time => { window.__pendingRAF.delete(id); cb(time); });
      window.__pendingRAF.add(id); return id;
    };
    window.cancelAnimationFrame = id => { window.__pendingRAF.delete(id); cancel(id); };
    Element.prototype.animate = () => { throw new Error('WAAPI disabled for verification'); };
  });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto(`${base}/admin`);
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' });
    await page.getByLabel('Email', { exact: true }).fill('admin@example.test');
    await page.getByLabel('Mật khẩu', { exact: true }).fill('AdminTestOnly-2026');
    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
    await page.getByRole('heading', { name: 'Tổng quan', exact: true }).waitFor();
    await page.waitForFunction(() => document.querySelector('[data-chart-line]') && !document.querySelector('[data-chart-line]').style.strokeDashoffset);
    await page.getByRole('button', { name: 'Biểu đồ 7 ngày', exact: true }).click();
    await page.waitForFunction(() => parseFloat(document.querySelector('[data-chart-line]')?.style.strokeDashoffset) > 0);
    const drawSamples = await page.evaluate(() => new Promise(resolveSamples => {
      const values = []; const start = performance.now();
      function frame(time) {
        values.push({ offset: parseFloat(document.querySelector('[data-chart-line]').style.strokeDashoffset),
          count: Number(document.querySelector('section[class*="holding"] [class*="animatedValue"] span').textContent.replace(/\D/g, '')) });
        if (time - start < 200) window.__nativeRAF(frame); else resolveSamples(values);
      }
      window.__nativeRAF(frame);
    }));
    assert.ok(drawSamples.length > 2); assert.ok(drawSamples[0].offset > drawSamples.at(-1).offset);
    assert.ok(drawSamples.some(v => v.count > 0 && v.count <= 26));
    await page.waitForFunction(() => !document.querySelector('[data-chart-line]').style.strokeDashoffset && window.__pendingRAF.size === 0);
    const heading = page.getByRole('heading', { name: 'Tổng quan', exact: true });
    assert.equal(await heading.count(), 1);
    const pill = page.locator('nav[aria-label="Quản trị"] > span');
    const original = await pill.evaluate(e => e.style.transform);
    await page.getByRole('button', { name: 'Tài khoản', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('nav[aria-label="Quản trị"] button[aria-current="page"]').getAttribute('aria-label') === 'Tài khoản');
    const middle = await page.evaluate(() => new Promise(resolveFrame => {
      const start = performance.now();
      const frame = time => { if (time - start < 110) window.__nativeRAF(frame); else resolveFrame(document.querySelector('nav[aria-label="Quản trị"] > span').style.transform); };
      window.__nativeRAF(frame);
    }));
    await page.waitForTimeout(360); const end = await pill.evaluate(e => e.style.transform);
    assert.notEqual(middle, original); assert.notEqual(middle, end);
    await page.getByLabel('Tìm tài khoản', { exact: true }).fill('customer2@example.test');
    await page.getByRole('button', { name: 'Tìm kiếm', exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll('tbody tr').length === 1);
    await page.getByRole('button', { name: 'Quản lý customer2@example.test' }).click();
    await page.waitForFunction(() => document.querySelector('dialog').open && Number(document.querySelector('dialog').style.opacity) < 1);
    const openFrame = await page.evaluate(() => new Promise(resolveFrame => {
      const start = performance.now(); const frame = time => {
        if (time - start < 100) window.__nativeRAF(frame);
        else { const d = document.querySelector('dialog'); resolveFrame({ opacity: Number(d.style.opacity), transform: d.style.transform, backdrop: Number(d.style.getPropertyValue('--backdrop')) }); }
      }; window.__nativeRAF(frame);
    }));
    assert.ok(openFrame.opacity > 0 && openFrame.opacity < 1); assert.ok(openFrame.backdrop > 0 && openFrame.backdrop < .72);
    await page.waitForTimeout(380); await page.keyboard.press('Escape');
    const closeFrame = await page.evaluate(() => new Promise(resolveFrame => {
      const start = performance.now(); const frame = time => {
        if (time - start < 70) window.__nativeRAF(frame);
        else { const d = document.querySelector('dialog'); resolveFrame({ open: d.open, opacity: Number(d.style.opacity), backdrop: Number(d.style.getPropertyValue('--backdrop')) }); }
      }; window.__nativeRAF(frame);
    }));
    assert.ok(closeFrame.open && closeFrame.opacity > 0 && closeFrame.opacity < 1);
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    assert.ok(await page.getByRole('button', { name: 'Quản lý customer2@example.test' }).evaluate(e => e === document.activeElement));
    // Direct first->last and last->first, then rapid changes. No stale RAF jobs.
    await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Quản trị"]');
      for (const label of ['Tổng quan', 'Nhật ký', 'Tổng quan', 'Đơn hàng', 'Truy cập', 'Tài khoản', 'Truy cập']) nav.querySelector(`[aria-label="${label}"]`).click();
    });
    await page.getByRole('heading', { name: 'Truy cập', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Biểu đồ 30 ngày', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-chart-line]')?.getAttribute('d').split('C ').length === 30);
    await page.waitForFunction(() => document.querySelector('[data-chart-line]') && !document.querySelector('[data-chart-line]').style.strokeDashoffset && window.__pendingRAF.size === 0);
    const firstPoint = await page.locator('[data-chart-line]').evaluate(e => e.getAttribute('d'));
    await page.getByRole('button', { name: 'Biểu đồ 7 ngày', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-chart-line]')?.getAttribute('d').split('C ').length === 7);
    assert.notEqual(await page.locator('[data-chart-line]').getAttribute('d'), firstPoint);
    // Pause finishes current sequences immediately. A new visit resets to ON.
    await page.getByRole('button', { name: 'Tạm dừng animation', exact: true }).click();
    await page.getByRole('button', { name: 'Bật animation', exact: true }).waitFor();
    await page.waitForFunction(() => window.__pendingRAF.size === 0);
    await page.getByRole('button', { name: 'Tài khoản', exact: true }).click();
    await page.getByLabel('Tìm tài khoản', { exact: true }).fill('customer2@example.test');
    await page.getByRole('button', { name: 'Tìm kiếm', exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll('tbody tr').length === 1);
    await page.getByRole('button', { name: 'Quản lý customer2@example.test' }).click();
    await page.getByRole('dialog').waitFor(); assert.equal(await page.locator('dialog').evaluate(e => e.style.opacity), '');
    await page.keyboard.press('Escape'); await page.getByRole('dialog').waitFor({ state: 'hidden' });
    await page.reload(); await page.getByRole('button', { name: 'Tạm dừng animation', exact: true }).waitFor();
    await page.waitForFunction(() => document.querySelector('[data-chart-line]') && !document.querySelector('[data-chart-line]').style.strokeDashoffset && window.__pendingRAF.size === 0);
    assert.deepEqual(errors, []);
    results.push({ browser: name, version: browser.version(), width, reducedMotion: true, cssAndWaapiDisabled: true,
      lineFrames: drawSamples.length, firstOffset: drawSamples[0].offset, lastOffset: drawSamples.at(-1).offset, nav: { original, middle, end }, openFrame, closeFrame,
      result: 'PASS', checks: 'Chart/count midframes, nav movement, modal in/out/backdrop/focus, rapid first-last-first, finite cleanup, chart period, pause and fresh-visit reset' });
    console.log(`PASS ${name} ${browser.version()} ${width}px motion under forced fallbacks`);
  } finally { await browser.close(); }
}
await writeFile('reviews/admin/motion-checks.json', JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
