import {resolve} from 'node:path';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base='https://forgezone.store';const report={base,date:new Date().toISOString(),resources:[],failures:[]};
for(const path of ['/demos/velora/index.html','/demos/velora/assets/css/style.css','/demos/velora/assets/js/main.js','/demos/velora/CUSTOMISE.md','/previews/velora.webp']){
 const r=await fetch(base+path+'?v=1.2.1');const bytes=Buffer.from(await r.arrayBuffer());const local=readFileSync(resolve('web/public'+path));const hash=b=>createHash('sha256').update(b).digest('hex');const entry={path,status:r.status,sha256:hash(bytes),matchesLocal:bytes.equals(local)};report.resources.push(entry);if(r.status!==200||!entry.matchesLocal)report.failures.push(path);
}
for(const path of ['/','/?mau=t19','/huong-dan?template=velora&view=template','/admin','/demos/watchroom/index.html','/demos/mint-atlas/index.html','/demos/melt-muse/index.html','/demos/apartment-flow/index.html']){const r=await fetch(base+path);report.resources.push({path,status:r.status});if(r.status!==200)report.failures.push(path+': '+r.status);}
const denied=await fetch(base+'/api/download?id=t19');report.anonymousDownload=denied.status;if(denied.status!==401)report.failures.push('anonymous download');
writeFileSync(resolve('web/product/giao-dien-web/velora/reviews/1.2.1/resources-online.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.failures.length)process.exitCode=1;
