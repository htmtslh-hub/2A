// No database writes, credentials or external payments: catalogue/API/Paddle contract checks.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ts=require('../../../../node_modules/typescript');
function moduleFrom(path,mocks={}){const exports={};const code=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(code,{exports,require:name=>name in mocks?mocks[name]:require(name),Intl,URL,process:{env:{PADDLE_API_KEY:'test-only'}},fetch:async(url,options)=>{capture=JSON.parse(options.body);return{ok:true,json:async()=>({data:{id:'mock-transaction',checkout:{url:'https://shop.example.test/checkout'}}})};}});return exports;}
let capture;
const templates=moduleFrom('web/src/lib/real-templates.ts',{'./template-categories':{TEMPLATE_CATEGORIES:new Proxy({},{get:()=> 'commerce'})}});
const catalog=moduleFrom('web/src/lib/catalog.ts',{'./real-templates':templates});
for(const lang of ['vi','en','zh']){assert.equal(catalog.providerForLang(lang),'PADDLE');assert.equal(catalog.currencyForProvider(catalog.providerForLang(lang)),'USD');for(const id of Object.keys(templates.REAL_TEMPLATES))assert.equal(catalog.priceOf('TEMPLATE','USD',id),2000);}
assert.equal(catalog.priceOf('TEMPLATE','USD','t1')+catalog.priceOf('TEMPLATE','USD','t2'),4000);
const route=fs.readFileSync('web/src/app/api/checkout/route.ts','utf8');const z=require('../../../../node_modules/zod').z;
const schema=vm.runInNewContext(route.match(/const schema = ([\s\S]*?);\r?\n/)[1],{z});
assert.equal(schema.safeParse({kind:'TEMPLATE',templateId:'t1',email:'test@example.com',provider:'PAYOS'}).success,false);
assert.equal(schema.safeParse({kind:'TEMPLATE',templateId:'t1',email:'test@example.com',provider:'PADDLE'}).success,true);
const {paddleAdapter}=moduleFrom('web/src/lib/payments/paddle.ts');
(async()=>{await paddleAdapter.createCheckout({orderId:'mock-order',amount:4000,currency:'USD',productName:'Two templates',items:[{name:'A',amount:2000},{name:'B',amount:2000}]});assert.equal(capture.items.length,2);capture.items.forEach(item=>{assert.equal(item.price.unit_price.amount,'2000');assert.equal(item.price.unit_price.currency_code,'USD');});console.log('PASS: all templates/all languages $20 USD; two-template cart $40; VND checkout rejected; mocked Paddle payload USD 2000/item.');})().catch(error=>{console.error(error);process.exitCode=1;});
