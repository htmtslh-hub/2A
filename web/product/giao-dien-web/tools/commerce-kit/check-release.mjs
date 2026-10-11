import {spawn} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const versions={shirtline:'1.2.0',novatrend:'1.2.0',diginest:'1.3.0',soniq:'1.1.0','astra-interior':'2.1.0',vybe:'1.1.0',solenne:'2.1.0',auralis:'1.3.0',aeris:'1.4.0',watchroom:'1.3.0',velora:'1.3.0'};
function run(tool,args){return new Promise(done=>{let output='';const child=spawn(process.execPath,[`web/product/giao-dien-web/tools/${tool}.mjs`,...args],{stdio:['ignore','pipe','pipe'],env:{...process.env,TEMPLATE_QA_PORT:'0'}});child.stdout.on('data',data=>output+=data);child.stderr.on('data',data=>output+=data);child.on('close',code=>done({code,output}));});}
for(const [slug,version] of Object.entries(versions)){
  const pack=await run('dong-goi',[slug,'--ngoai-le']);writeFileSync(`web/product/giao-dien-web/${slug}/reviews/${version}/package.log`,pack.output);console.log(`Package ${slug}: ${pack.code}`);
  if(pack.code)throw Error(pack.output);
}
const entries=Object.entries(versions);let next=0;
if(process.argv.includes('--pack-only'))process.exit(0);
await Promise.all([0,1].map(async()=>{while(next<entries.length){const [slug,version]=entries[next++];const check=await run('check-template',[slug,'--version',version,'--ngoai-le']);writeFileSync(`web/product/giao-dien-web/${slug}/reviews/${version}/check.log`,check.output);console.log(`General checks ${slug}: ${check.code}\n${check.output.slice(-450)}`);}}));
