// Refresh only the ten explicitly authorised COD templates and their public demos.
import {readFileSync,writeFileSync as write,cpSync,mkdirSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url)), root=resolve(here,'../..'), web=resolve(root,'../..');
function writeFileSync(path,text) {
  if(readFileSync(path,'utf8')===text)return;
  for(let attempt=0;attempt<8;attempt++) {
    try { write(path,text);return; }
    catch(error) { if(attempt===7)throw error;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,200); }
  }
}
export const versions={shirtline:'1.2.0',novatrend:'1.2.0',diginest:'1.3.0',soniq:'1.1.0','astra-interior':'2.1.0',vybe:'1.1.0',solenne:'2.1.0',auralis:'1.3.0',aeris:'1.4.0',watchroom:'1.3.0',velora:'1.3.0'};
const guide=readFileSync(join(here,'SETUP.md'),'utf8');
for(const [slug,version] of Object.entries(versions)) {
  const source=join(root,slug,'source'),demo=join(web,'public/demos',slug);
  cpSync(join(here,'commerce.js'),join(source,'assets/js/commerce.js'));
  cpSync(join(here,'commerce.css'),join(source,'assets/css/commerce.css'));
  let html=readFileSync(join(source,'index.html'),'utf8');
  html=html.replace(/(assets\/(?:js\/main\.js|css\/style\.css))(?:\?v=[^"']*)?/g,`$1?v=${version}`);
  writeFileSync(join(source,'index.html'),html);
  const custom=join(source,'CUSTOMISE.md'),old=readFileSync(custom,'utf8');
  writeFileSync(custom,old.slice(0,old.lastIndexOf('## COD setup'))+guide);
  for(const file of ['assets/js/main.js','assets/js/shop-config.js','assets/js/commerce.js','assets/css/commerce.css','README.md','CUSTOMISE.md',...(slug==='shirtline'?['assets/css/controls.css']:[])]) {
    mkdirSync(dirname(join(demo,file)),{recursive:true});cpSync(join(source,file),join(demo,file));
  }
  if(slug==='auralis') html=html.replace(/(src|href)=(['"])assets\//g,`$1=$2/demos/${slug}/assets/`);
  else html=html.replace('<head>',`<head>\n<base href="/demos/${slug}/">`);
  writeFileSync(join(demo,'index.html'),html);
  console.log('Synced '+slug+' '+version);
}
