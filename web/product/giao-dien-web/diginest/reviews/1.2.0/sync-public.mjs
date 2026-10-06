import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const source=resolve('web/product/giao-dien-web/diginest/source');
const target=resolve('web/public/demos/diginest');
await mkdir(target,{recursive:true});
await cp(source+'/assets',target+'/assets',{recursive:true});
const html=await readFile(source+'/index.html','utf8');
await writeFile(target+'/index.html',html.replace(/\b(src|href)="assets\//g,'$1="/demos/diginest/assets/').replace('assets/css/style.css"','assets/css/style.css?v=1.2.0"').replace('assets/js/main.js"','assets/js/main.js?v=1.2.0"'));
console.log('Synced only public/demos/diginest, with versioned CSS/JS.');
