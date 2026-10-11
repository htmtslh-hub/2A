import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import assert from 'node:assert/strict';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const root=resolve('web/product/giao-dien-web');
const versions={shirtline:'1.2.0',novatrend:'1.2.0',diginest:'1.3.0',soniq:'1.1.0','astra-interior':'2.1.0',vybe:'1.1.0',solenne:'2.1.0',auralis:'1.3.0',aeris:'1.4.0',watchroom:'1.3.0',velora:'1.3.0'};
const adds={shirtline:'.add',novatrend:'[data-cart-add]',diginest:'[data-add]',soniq:'[data-product]','astra-interior':'[data-product]',vybe:'[data-add]'};
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'};
const server=createServer((req,res)=>{try{const file=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://x').pathname));if(!file.startsWith(root+ '/'.replace('/',process.platform==='win32'?'\\':'/')))throw Error();res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');res.end(readFileSync(file));}catch{res.writeHead(404).end();}});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const base=`http://127.0.0.1:${server.address().port}`;
const engines=[['chromium',chromium,{}],['firefox',firefox,{}],['edge',chromium,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}],['coccoc',chromium,{executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe'}]];
const fill=async page=>{for(const [name,value] of Object.entries({name:'COD Test',email:'test@example.com',phone:'+12025550123',address:'1 Test Street',city:'Test City',country:'United States'})) await page.locator(`.fz-commerce-form [name="${name}"]`).fill(value);};
let failures=0;
try{for(const [browserName,engine,options] of engines){const browser=await engine.launch({headless:true,...options});for(const [slug,version] of Object.entries(versions)){
  if(process.argv[2] && slug!==process.argv[2])continue;
  const evidence=join(root,slug,'reviews',version);mkdirSync(join(evidence,'screenshots'),{recursive:true});const results=[];
  for(const [width,height] of [[1440,900],[820,1180],[375,812],[320,740]]){
    const context=await browser.newContext({viewport:{width,height}}),page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
    try{
      await page.goto(`${base}/${slug}/source/index.html`,{waitUntil:'domcontentloaded'});
      const add=page.locator(adds[slug]||'.fz-commerce-collection button').first();await add.click({timeout:10000,force:true});
      await page.evaluate(()=>window.ForgeCommerce.open());
      await page.locator('.fz-commerce-form').waitFor();
      assert(await page.locator('.fz-commerce-lines li').count()>0,'native cart adapter includes added product');
      await page.locator('.fz-commerce-form button[type=submit]').click();assert(await page.locator('.fz-commerce-form').count()===1,'invalid form remains');
      await fill(page);await page.screenshot({path:join(evidence,'screenshots',`checkout-${browserName}-${width}.png`)});await page.locator('.fz-commerce-form button[type=submit]').click();await page.getByRole('heading',{name:'Order preview',exact:true}).waitFor();
      assert((await page.locator('.fz-commerce-receipt').innerText()).includes(' USD'),'USD receipt');
      await page.locator('.fz-commerce-close').click();
      await page.evaluate(()=>{window.ForgeShopConfig.orderEndpoint='https://orders.example.test/cod';window.ForgeCommerce.open();});
      await page.locator('.fz-commerce-form').waitFor();await fill(page);
      let count=0,payload;await page.route('https://orders.example.test/cod',async route=>{count++;payload=route.request().postDataJSON();await route.fulfill({status:400,contentType:'application/json',body:'{"ok":false}'});});
      await page.locator('.fz-commerce-form button[type=submit]').click();await page.getByText(/We could not confirm your order/).waitFor();assert.equal(count,1);assert.equal(payload.currency,'USD');assert.equal(payload.paymentMethod,'COD');assert(payload.items.length>0);assert.equal(payload.total,payload.subtotal+payload.shipping);
      const reference=payload.orderId;await page.unroute('https://orders.example.test/cod');
      await page.route('https://orders.example.test/cod',async route=>{count++;payload=route.request().postDataJSON();await new Promise(done=>setTimeout(done,100));await route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});});
      await page.locator('.fz-commerce-form button[type=submit]').click();await page.getByRole('heading',{name:'Order received',exact:true}).waitFor();assert.equal(payload.orderId,reference,'retry keeps reference');assert.equal(count,2);assert.equal(payload.total,payload.items.reduce((sum,item)=>sum+item.price*item.quantity,0)+payload.shipping);
      await page.locator('.fz-commerce-close').click();await page.evaluate(()=>window.ForgeCommerce.open());await page.getByText('Your bag is empty. Choose something you love.').waitFor();
      await page.screenshot({path:join(evidence,'screenshots',`commerce-${browserName}-${width}.png`)});
      assert.deepEqual(errors,[],'no JS exceptions');results.push({width,height,status:'PASS',checks:['native add','invalid fields','preview preserves bag','rejected request preserves bag','retry reference','USD canonical total','acknowledged order clears bag'],errors});
    }catch(error){failures++;results.push({width,height,status:'FAIL',message:error.message,errors});console.log(`FAIL ${browserName} ${slug} ${width}: ${error.message.split('\n')[0]}`);}finally{await context.close();}
  }
  writeFileSync(join(evidence,`commerce-${browserName}.json`),JSON.stringify({browser:browserName,version:browser.version(),mockOnly:true,results},null,2));console.log(`${browserName} ${slug}: ${results.filter(r=>r.status==='PASS').length}/4`);
}await browser.close();}}finally{server.close();}
process.exitCode=failures?1:0;
