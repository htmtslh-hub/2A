// Product-specific motion and interaction verification. Test data only; no account/order writes.
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out = resolve('web/product/giao-dien-web/apartment-flow/reviews/1.0.0/features');
mkdirSync(out, { recursive: true });
const base = process.env.APARTMENT_CHECK_URL || 'http://127.0.0.1:8772/';
const targets = [
  ['Chromium', chromium, undefined, [1440, 820, 375, 320]],
  ['Firefox', firefox, undefined, [1440, 820, 375, 320]],
  ['Edge', chromium, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [1440, 375]],
  ['CocCoc', chromium, 'C:/Program Files/CocCoc/Browser/Application/browser.exe', [1440, 375]],
];
const report = { base, date: new Date().toISOString(), browsers: [] };
for (const [name, engine, executablePath, widths] of targets) {
  if (executablePath && !existsSync(executablePath)) { report.browsers.push({name, status:'NOT TESTED', reason:'Executable missing'}); continue; }
  const browser = await engine.launch({ headless: true, executablePath });
  const entry = {name, version:browser.version(), viewports:[], status:'PASS'};
  report.browsers.push(entry);
  try {
    for (const width of widths) {
      const height = ({1440:900,820:1180,375:812,320:740})[width];
      const context = await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
      await context.addInitScript(() => localStorage.setItem('motion','off'));
      const page = await context.newPage(); const errors=[];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base); await page.waitForFunction(() => document.querySelector('canvas').dataset.frame === '1');
      const canvas = page.locator('canvas'); const pause=page.locator('.apartment__pause');
      assert.equal(await pause.getAttribute('aria-pressed'),'false');
      const screen={width,height,chapters:[]}; entry.viewports.push(screen);
      for (const [scene,link,frame] of [[0,'#entrance',1],[1,'#living',73],[2,'#bedroom',154],[3,'#contact',240]]) {
        await page.locator(`.journey a[href="${link}"]`).click();
        if (scene) {
          await page.waitForFunction(end=>{const f=Number(document.querySelector('canvas').dataset.frame);return f>1&&f<end;},frame);
          screen.chapters.push({scene,intermediateFrame:Number(await canvas.getAttribute('data-frame'))});
        }
        await page.waitForFunction(end=>Number(document.querySelector('canvas').dataset.frame)===end,frame,{timeout:15000});
        const state=await page.evaluate(()=>({active:[...document.querySelectorAll('.story-panel')].filter(p=>p.dataset.active==='true').map(p=>Number(p.dataset.scene)),inactiveInert:[...document.querySelectorAll('.story-panel')].filter(p=>p.dataset.active!=='true').every(p=>p.inert&&p.getAttribute('aria-hidden')==='true'),width:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
        assert.deepEqual(state.active,[scene]); assert.ok(state.inactiveInert); assert.ok(state.width<=state.client);
        await page.screenshot({path:resolve(out,`${name}-${width}-scene${scene}.png`)});
      }
      await page.locator('[data-open-contact]').click(); assert.equal(await page.locator('dialog').getAttribute('open'),'');
      await page.keyboard.press('Escape'); assert.equal(await page.locator('dialog').getAttribute('open'),null);
      assert.ok(await page.locator('[data-open-contact]').evaluate(el=>el===document.activeElement));
      await pause.click(); const frozen=await canvas.getAttribute('data-frame');
      await page.locator('.journey a[href="#entrance"]').click(); await page.waitForTimeout(400);
      assert.equal(await canvas.getAttribute('data-frame'),frozen);
      await pause.click(); await page.waitForFunction(()=>Number(document.querySelector('canvas').dataset.frame)<240);
      screen.reverseIntermediateFrame=Number(await canvas.getAttribute('data-frame'));
      await page.waitForFunction(()=>document.querySelector('canvas').dataset.frame==='1',{},{timeout:15000});
      await page.locator('.journey a[href="#contact"]').click();
      await page.locator('.journey a[href="#bedroom"]').click();
      await page.locator('.journey a[href="#living"]').click();
      await page.waitForFunction(()=>document.querySelector('canvas').dataset.frame==='73',{},{timeout:15000});
      await page.reload(); await page.waitForFunction(()=>document.querySelector('canvas').dataset.frame==='73');
      assert.equal(await pause.getAttribute('aria-pressed'),'false');
      screen.pauseResume=true; screen.dialogEscapeFocus=true; screen.rapidInput=true; screen.motionDefaultsOn=true;
      assert.equal(errors.length,0); screen.errors=errors;
      await context.close();
    }
  } catch (error) {entry.status='FAIL';entry.error=String(error);}
  finally {await browser.close();writeFileSync(resolve(out,'checks.json'),JSON.stringify(report,null,2));}
  console.log(`${name} ${entry.version}: ${entry.status}${entry.error ? ': '+entry.error : ''}`);
}
assert.ok(report.browsers.every(b=>b.status==='PASS'), 'Feature verification incomplete or failed');
