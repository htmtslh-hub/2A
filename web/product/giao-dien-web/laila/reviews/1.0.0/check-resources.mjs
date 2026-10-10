import {resolve} from 'node:path';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base='https://forgezone.store';
const report={base,date:new Date().toISOString(),resources:[],failures:[]};
const hash=b=>createHash('sha256').update(b).digest('hex');
for(const path of ['/demos/laila/index.html','/demos/laila/assets/css/style.css','/demos/laila/assets/js/main.js','/demos/laila/assets/img/portrait.webp','/demos/laila/CUSTOMISE.md','/demos/laila/README.md','/previews/laila.webp']){
 const response=await fetch(base+path+'?v=1.0.0');const bytes=Buffer.from(await response.arrayBuffer());const local=readFileSync(resolve('web/public'+path));
 const item={path,status:response.status,bytes:bytes.length,sha256:hash(bytes),matchesLocal:bytes.equals(local)};
 report.resources.push(item);if(response.status!==200||!item.matchesLocal)report.failures.push(path);
}
for(const path of ['/','/?mau=t20','/huong-dan?template=laila&view=template','/admin','/?mau=t19','/demos/velora/index.html?v=1.2.1','/demos/watchroom/index.html','/demos/mint-atlas/index.html','/demos/melt-muse/index.html','/demos/apartment-flow/index.html']){
 const response=await fetch(base+path);report.resources.push({path,status:response.status});if(response.status!==200)report.failures.push(path+': '+response.status);
}
const denied=await fetch(base+'/api/download?id=t20');report.anonymousDownload=denied.status;if(denied.status!==401)report.failures.push('Anonymous download');
const privateZip=await fetch(base+'/product/giao-dien-web/laila/laila.zip');report.directZip=privateZip.status;if(privateZip.status!==404)report.failures.push('Private ZIP publicly accessible');
const guide=await fetch(base+'/huong-dan?template=laila&view=template');report.guideContainsProduct=(await guide.text()).includes('Laila');if(!report.guideContainsProduct)report.failures.push('Guide missing');
writeFileSync(resolve('web/product/giao-dien-web/laila/reviews/1.0.0/resources-online.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.failures.length)process.exitCode=1;
