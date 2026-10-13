import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(await readFile('web/src/lib/preview-recordings.json','utf8'));
const queue=Object.entries(manifest),results=[];
async function worker(){
  while(queue.length){
    const [slug,row]=queue.shift();
    const response=await fetch(`https://forgezone.store/previews/${slug}.mp4?v=${row.revision}`);
    if(response.status!==200)throw Error(`${slug}: ${response.status}`);
    const bytes=Buffer.from(await response.arrayBuffer());
    const sha=createHash('sha256').update(bytes).digest('hex');
    if(sha!==row.sha256)throw Error(`${slug}: online bytes differ`);
    results.push({slug,status:response.status,bytes:bytes.length,sha256:sha,revision:row.revision});
  }
}
await Promise.all(Array.from({length:4},worker));
results.sort((a,b)=>a.slug.localeCompare(b.slug));
await writeFile('web/product/giao-dien-web/reviews/video-previews/online-assets.json',JSON.stringify({date:new Date().toISOString(),origin:'https://forgezone.store',results},null,2)+'\n');
console.log(`PASS ${results.length} online MP4s match release SHA-256`);
