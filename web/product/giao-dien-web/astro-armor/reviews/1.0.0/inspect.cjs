const fs = require('fs');
const path = require('path');
const http = require('http');
const root = process.cwd();
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '_design/.browsers');
const { chromium } = require(path.join(root, '_design/.tooling/node_modules/playwright'));
const base = path.join(root, 'web/product/giao-dien-web/astro-armor/source');
const out = path.join(root, 'web/product/giao-dien-web/astro-armor/reviews/1.0.0');
(async () => {
  const server = http.createServer((req, res) => {
    const file = path.join(base, decodeURIComponent(req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0]));
    try { res.setHeader('Content-Type', ({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp'})[path.extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); }
    catch { res.writeHead(404).end(); }
  }).listen(0, '127.0.0.1');
  await new Promise(resolve => server.on('listening', resolve));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const report=[];
  for (const [width,height] of [[1440,1310],[820,746],[1440,900],[1101,900],[1100,900],[951,900],[950,900],[375,812],[320,740]]) {
    await page.setViewportSize({width,height});
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForTimeout(900);
    await page.screenshot({path:path.join(out,`candidate-${width}x${height}.png`),fullPage:width<400||width===820});
    const frame=await page.locator('.jacket-frame').boundingBox();
    const details=await page.locator('.detail-image').evaluateAll(els=>els.map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
    report.push({width,height,frame,details,ratio:frame.width/frame.height,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
    console.log({width, dimensions:await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth})), jacket:await page.locator('#jacket').boundingBox()});
  }
  fs.writeFileSync(path.join(out,'responsive.json'),JSON.stringify({cssSha256:require('crypto').createHash('sha256').update(fs.readFileSync(path.join(base,'assets/css/style.css'))).digest('hex'),viewports:report},null,2));
  if(report.some(r=>r.overflow||Math.abs(r.ratio-448/470)>.002||r.details.some(d=>Math.abs(d.width-d.height)>1)))throw Error('Responsive aspect/overflow regression');
  await browser.close(); server.close();
})();
