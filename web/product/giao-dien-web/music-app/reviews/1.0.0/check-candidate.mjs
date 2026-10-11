import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('_design/.browsers');
const { chromium, firefox } = await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../../../../../../_design/.tooling/node_modules/@axe-core/playwright/dist/index.mjs');
const product = resolve('web/product/giao-dien-web/music-app');
const site = resolve(product, 'source');
const evidence = resolve(product, 'reviews/1.0.0');
mkdirSync(resolve(evidence, 'screenshots'), { recursive: true });
const server = createServer((req, res) => {
  const file = resolve(site, '.' + decodeURIComponent((req.url || '/').split('?')[0] === '/' ? '/index.html' : (req.url || '/').split('?')[0]));
  if (!file.startsWith(site) || !existsSync(file)) { res.writeHead(404); res.end(); return; }
  const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp', '.wav':'audio/wav' };
  res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
  const body=readFileSync(file);
  res.setHeader('Accept-Ranges','bytes');
  const range=/bytes=(\d+)-(\d*)/.exec(req.headers.range||'');
  if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),body.length-1):body.length-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${body.length}`,'Content-Length':end-start+1});res.end(body.subarray(start,end+1));}
  else {res.setHeader('Content-Length',body.length);res.end(body);}
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const url = `http://127.0.0.1:${server.address().port}`;
const report = { date: new Date().toISOString(), browsers: {}, failures: [] };
for (const [name, engine, executablePath] of [['chromium',chromium], ['firefox',firefox], ['edge',chromium,'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'], ['coccoc',chromium,'C:/Program Files/CocCoc/Browser/Application/browser.exe']]) {
  const browser = await engine.launch({ headless:true, ...(executablePath ? {executablePath} : {}) });
  const result = { version:browser.version(), sizes:[], interactions:{}, errors:[], fallback:{} };
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', e => result.errors.push(e.message));
  page.on('response', r => { if(r.status() >= 400) result.errors.push(`${r.status()} ${r.url()}`); });
  for (const [width,height] of [[920,1288],[1440,900],[820,1180],[375,812],[320,740],[699,900],[701,900]]) {
    await page.setViewportSize({width,height}); await page.goto(url); await page.waitForTimeout(500);
    const metrics = await page.evaluate(() => ({ scrollWidth:document.documentElement.scrollWidth, clientWidth:document.documentElement.clientWidth, images:[...document.images].every(i=>i.complete&&i.naturalWidth>0), h1:document.querySelectorAll('h1').length, regions:[...document.querySelectorAll('.component')].map(e=>({id:e.id,x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})) }));
    await page.screenshot({ path:resolve(evidence,`screenshots/${name}-${width}.png`), fullPage:true });
    if(width===920) {
      await page.locator('#play').click();
      await page.waitForFunction(()=>document.querySelector('#audio').currentTime>.1);
      await page.locator('#seek').fill('105');
      await page.waitForFunction(()=>document.querySelector('#audio').currentTime>=105);
      await page.screenshot({path:resolve(evidence,`screenshots/${name}-reference-view.png`)});
      await page.locator('#play').click();
    }
    result.sizes.push({width,height,...metrics});
    if(metrics.scrollWidth>width) report.failures.push(`${name} overflow ${width}: ${metrics.scrollWidth}`);
  }
  await page.setViewportSize({width:920,height:700}); await page.goto(url);
  await page.locator('#play').click(); await page.waitForFunction(()=>document.querySelector('#audio').currentTime>.2);
  result.interactions.play = await page.locator('#audio').evaluate(a=>({paused:a.paused,time:a.currentTime}));
  await page.locator('#play').click(); result.interactions.pause = await page.locator('#audio').evaluate(a=>a.paused);
  await page.locator('#next').click(); result.interactions.next = await page.locator('#now-title').textContent();
  await page.locator('#previous').click(); result.interactions.previous = await page.locator('#now-title').textContent();
  await page.locator('#play').click();
  await page.locator('#follow').click(); result.interactions.follow = await page.locator('#follow').getAttribute('aria-pressed');
  await page.locator('.favourite').first().click(); result.interactions.favourite = await page.locator('.favourite').first().getAttribute('aria-pressed');
  await page.locator('#shuffle').click(); result.interactions.shuffle = await page.locator('#shuffle').getAttribute('aria-pressed');
  await page.locator('#repeat').click(); result.interactions.repeat = await page.locator('#audio').evaluate(a=>a.loop);
  await page.locator('#volume').fill('0.6'); result.interactions.volume = await page.locator('#audio').evaluate(a=>a.volume);
  await page.locator('#seek').fill('5'); await page.waitForTimeout(300); result.interactions.seek = await page.locator('#audio').evaluate(a=>a.currentTime);
  if(result.interactions.seek<4.9) report.failures.push(`${name} seek failed: ${result.interactions.seek}`);
  await page.locator('#search').fill('daylight'); result.interactions.search = await page.locator('[data-search]:visible').count();
  await page.locator('#search').fill('zzzz'); result.interactions.emptySearch = await page.locator('[data-search]:visible').count();
  await page.locator('#search').fill('');
  await page.locator('#settings').click(); result.interactions.dialog = await page.locator('dialog').evaluate(d=>d.open);
  await page.keyboard.press('Escape'); result.interactions.escape = await page.locator('dialog').evaluate(d=>!d.open);
  result.interactions.dialogFocusReturn = await page.locator('#settings').evaluate(e=>document.activeElement===e);
  await page.goto(url); await page.keyboard.press('Tab');
  result.interactions.skipFocus = await page.locator('.skip-link').evaluate(e=>({focused:document.activeElement===e,outline:getComputedStyle(e).outlineStyle}));
  const axe = await new AxeBuilder({page}).analyze();
  result.axe = axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
  // Real scroll event: sample the finite RAF in the middle and at completion.
  await page.goto(url); await page.evaluate(()=>window.scrollTo({top:450,behavior:'instant'}));
  await page.waitForTimeout(110);
  result.motionMiddle = await page.locator('#library').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
  await page.screenshot({path:resolve(evidence,`screenshots/${name}-motion-middle.png`)});
  await page.waitForTimeout(450);
  result.motionEnd = await page.locator('#library').evaluate(e=>({opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform}));
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  result.reverseScroll = await page.locator('#library').evaluate(e=>getComputedStyle(e).opacity);
  await page.emulateMedia({reducedMotion:'reduce'}); await page.goto(url); await page.evaluate(()=>window.scrollTo({top:450,behavior:'instant'})); await page.waitForTimeout(110);
  result.reducedMotionMiddle = await page.locator('#library').evaluate(e=>getComputedStyle(e).opacity);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(pathToFileURL(resolve(site,'index.html')).href); result.fallback.file = await page.locator('h1').textContent();
  await page.locator('#play').click(); await page.waitForFunction(()=>document.querySelector('#audio').currentTime>.1); result.fallback.fileAudio = await page.locator('#audio').evaluate(a=>!a.paused&&a.currentTime>0);
  await context.setOffline(true); await page.reload(); result.fallback.offlineFile = await page.locator('h1').textContent(); await context.setOffline(false);
  await page.setViewportSize({width:720,height:450}); await page.goto(url);
  result.fallback.zoomEquivalent = await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,method:'720 CSS px equivalent to 1440 physical px at 200%; native browser zoom not tested'}));
  await context.close();
  const nojs = await browser.newContext({javaScriptEnabled:false}); const staticPage = await nojs.newPage(); await staticPage.goto(url);
  result.fallback.nojs = {title:await staticPage.locator('h1').textContent(), audio:await staticPage.locator('audio').isVisible(), content:await staticPage.locator('#library').isVisible()};
  await nojs.close();
  report.browsers[name] = result;
  writeFileSync(resolve(evidence,'candidate-checks.json'),JSON.stringify(report,null,2));
  await browser.close();
}
server.close();
writeFileSync(resolve(evidence,'candidate-checks.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
