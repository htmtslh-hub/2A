const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {chromium}=require('C:/Users/htmts/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../../../../../public');
const report=[];
const server=http.createServer((request,response)=>{
  let requestPath=new URL(request.url,'http://localhost').pathname;
  if(requestPath==='/demos/crimson-folio'||requestPath.endsWith('/'))requestPath=requestPath.replace(/\/$/,'')+'/index.html';
  const file=path.resolve(root,'.'+requestPath);
  if(!file.startsWith(root+path.sep)){response.writeHead(403).end();return;}
  if(!fs.existsSync(file)){response.writeHead(404).end();return;}
  const type={'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp'}[path.extname(file)];
  response.writeHead(200,{'Content-Type':type||'application/octet-stream'}).end(fs.readFileSync(file));
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch();
  for(const route of ['/demos/crimson-folio','/demos/crimson-folio/','/demos/crimson-folio/index.html']){
    const page=await browser.newPage({viewport:{width:375,height:812}});
    const errors=[];
    page.on('requestfailed',request=>errors.push(request.url()));
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(origin+route);
    const time=await page.evaluate(()=>performance.timeOrigin);
    await page.locator('.menu-toggle').click();
    await page.locator('.navigation a[href="#about"]').click();
    for(const img of await page.locator('img').all()){
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(i=>i.decode());
    }
    const state=await page.evaluate(()=>({images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),time:performance.timeOrigin,overflow:document.documentElement.scrollWidth>innerWidth,hash:location.hash}));
    state.sameDocument=state.time===time;
    if(!state.images||!state.sameDocument||state.overflow||state.hash!=='#about'||errors.length)throw new Error(JSON.stringify({route,state,errors}));
    report.push({route,state,errors});await page.close();
  }
  await browser.close();server.close();
  fs.writeFileSync(path.join(__dirname,'public-http-checks.json'),JSON.stringify(report,null,2));
  console.log('Public demo HTTP: all 3 routes, assets, same-document anchors PASS');
})().catch(error=>{console.error(error);server.close();process.exit(1)});
