import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import assert from 'node:assert/strict';
const versions={shirtline:'1.2.0',novatrend:'1.2.0',diginest:'1.3.0',soniq:'1.1.0','astra-interior':'2.1.0',vybe:'1.1.0',solenne:'2.1.0',auralis:'1.3.0',aeris:'1.4.0',watchroom:'1.3.0',velora:'1.3.0'};
for(const [slug,version] of Object.entries(versions)){
  const source=resolve('web/product/giao-dien-web',slug,'source'),demo=resolve('web/public/demos',slug),custom=readFileSync(join(source,'CUSTOMISE.md'),'utf8');
  const errors=[];const steps=(custom.match(/^## Step \d+/gm)||[]).length,prompts=(custom.match(/\*\*Prompt \d+/g)||[]).length;
  if(steps!==10)errors.push('Steps: '+steps);if(prompts!==12)errors.push('Prompts: '+prompts);
  for(const row of custom.split('\n').filter(line=>/^\| `(?:index\.html|assets\/)/.test(line))){const cells=row.split('|').map(cell=>cell.trim()),file=cells[1].replace(/^`|`$/g,''),needle=cells[2].replace(/^`|`$/g,''),expected=+cells[3];const actual=readFileSync(join(source,file),'utf8').split(needle).length-1;if(actual!==expected)errors.push({file,needle,expected,actual});}
  for(const file of ['assets/js/main.js','assets/js/shop-config.js','assets/js/commerce.js','assets/css/commerce.css','CUSTOMISE.md','README.md'])if(!readFileSync(join(source,file)).equals(readFileSync(join(demo,file))))errors.push('Demo mismatch: '+file);
  let html=readFileSync(join(source,'index.html'),'utf8');html=slug==='auralis'?html.replace(/(src|href)=(['"])assets\//g,`$1=$2/demos/${slug}/assets/`):html.replace('<head>',`<head>\n<base href="/demos/${slug}/">`);
  if(html!==readFileSync(join(demo,'index.html'),'utf8'))errors.push('Demo HTML mismatch');
  const result={slug,version,date:new Date().toISOString(),steps,prompts,errors,status:errors.length?'FAIL':'PASS'};writeFileSync(resolve(source,'../reviews',version,'sync-checks.json'),JSON.stringify(result,null,2));console.log(slug+' '+result.status+(errors.length?' '+JSON.stringify(errors):''));assert.equal(errors.length,0);
}
