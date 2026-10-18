// Preserve production runtime bytes when Git autocrlf changes a clean checkout.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const mainRoot='D:/3. Dự án/2A',report=[];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
(async()=>{
 if(path.resolve('.')===path.resolve(mainRoot))throw Error('Run in release checkout only');
 const sample='web/public/demos/backbest-800/assets/css/style.css';
 const online=Buffer.from(await(await fetch('https://forgezone.store/demos/backbest-800/assets/css/style.css')).arrayBuffer());
 if(hash(online)!==hash(fs.readFileSync(path.join(mainRoot,sample))))throw Error('Primary baseline does not match online sample');
 const manifest=JSON.parse(fs.readFileSync('web/src/lib/preview-recordings.json'));
 for(const [slug,row]of Object.entries(manifest)){
  if(slug==='firepower')continue;
  const base=path.resolve('web/public/demos',slug);
  if(!fs.existsSync(base))continue;
  const files=walk(base);
  const original=files.map(file=>({file,bytes:fs.readFileSync(file)}));
  const digest=rows=>{const d=crypto.createHash('sha256');for(const item of rows){d.update(item.file.slice(base.length).replaceAll('\\','/'));d.update(item.bytes);}return d.digest('hex');};
  if(digest(original)===row.demoSha256)continue;
  let candidate=null;
  for(const newline of ['LF','CRLF']){
   const rows=original.map(item=>({file:item.file,bytes:/\.(html|css|js|md|txt|svg)$/.test(item.file)?Buffer.from(item.bytes.toString('utf8').replaceAll('\r\n','\n').replaceAll('\n',newline==='LF'?'\n':'\r\n')):item.bytes}));
   if(digest(rows)===row.demoSha256){candidate=rows;break;}
  }
  if(!candidate){
   const choices=original.map(item=>{
    if(!/\.(html|css|js|md|txt|svg)$/.test(item.file))return[item.bytes];
    const lf=Buffer.from(item.bytes.toString('utf8').replaceAll('\r\n','\n'));
    const variants=[item.bytes,lf,Buffer.from(lf.toString('utf8').replaceAll('\n','\r\n'))];
    const primaryPath=path.join(mainRoot,path.relative('.',item.file));
    if(fs.existsSync(primaryPath)){
     const primary=fs.readFileSync(primaryPath);
     if(Buffer.from(primary.toString('utf8').replaceAll('\r\n','\n')).equals(lf))variants.push(primary);
    }
    return [...new Map(variants.map(bytes=>[hash(bytes),bytes])).values()];
   });
   const search=(i,rows)=>{
    if(candidate)return;
    if(i===original.length){if(digest(rows)===row.demoSha256)candidate=rows.slice();return;}
    for(const bytes of choices[i])search(i+1,[...rows,{file:original[i].file,bytes}]);
   };
   search(0,[]);
  }
  if(!candidate)throw Error('No per-file newline-only candidate matches deployed manifest: '+slug);
  candidate.forEach((item,i)=>{if(!item.bytes.equals(original[i].bytes)){fs.writeFileSync(item.file,item.bytes);report.push({file:path.relative('.',item.file),from:hash(original[i].bytes),to:hash(item.bytes),reason:'Newline-only restoration to existing deployed manifest'});}});
 }
 fs.writeFileSync(path.join(__dirname,'baseline-normalization.json'),JSON.stringify({sampleOnlineSha256:hash(online),files:report},null,2));
 console.log('Restored production LF bytes for',report.length,'runtime text files; no semantic edits.');
})().catch(e=>{console.error(e);process.exitCode=1;});
