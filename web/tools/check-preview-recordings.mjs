/** Dependency-light release gate; works on Vercel without browser/FFmpeg. */
import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import ts from 'typescript';
const web = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = ts.createSourceFile('catalog.ts', await readFile(resolve(web,'src/lib/real-templates.ts'),'utf8'), ts.ScriptTarget.Latest, true);
let catalog;
function visit(node) { if (ts.isVariableDeclaration(node) && node.name.getText(source)==='REAL_TEMPLATES') catalog=node.initializer; ts.forEachChild(node,visit); }
visit(source);
if (!catalog || !ts.isObjectLiteralExpression(catalog)) throw Error('Cannot read catalog');
const manifest = JSON.parse(await readFile(resolve(web,'src/lib/preview-recordings.json'),'utf8'));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
export async function demoHash(base) {
  const digest=createHash('sha256');
  async function walk(dir) {
    const entries=(await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name));
    for (const entry of entries) {
      const path=resolve(dir,entry.name);
      if(entry.isDirectory()) await walk(path);
      else {digest.update(path.slice(base.length).replaceAll('\\','/'));digest.update(await readFile(path));}
    }
  }
  await walk(base);return digest.digest('hex');
}
let count=0,total=0;
for(const item of catalog.properties) {
  if(!ts.isPropertyAssignment(item)||!ts.isObjectLiteralExpression(item.initializer))throw Error('Unsupported catalog entry');
  const props=Object.fromEntries(item.initializer.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.getText(source).replaceAll('"','').replaceAll("'",''),p.initializer]));
  const slug=props.slug?.text,version=props.version?.text??'unversioned';
  const row=manifest[slug];
  if(!row||row.productVersion!==version||row.status!=='recorded')throw Error(`${slug}: missing/stale/failed recording`);
  const file=await readFile(resolve(web,`public/previews/${slug}.mp4`));
  if(sha(file)!==row.sha256||row.revision!==row.sha256.slice(0,12)||file.length!==row.bytes)throw Error(`${slug}: video hash/revision/bytes differ`);
  if(row.duration<12||row.duration>18||row.width!==960||row.height!==600||row.audio!==false)throw Error(`${slug}: invalid recording metadata`);
  if(file.subarray(4,8).toString()!=='ftyp')throw Error(`${slug}: not MP4`);
  await readFile(resolve(web,`public/previews/${slug}.webp`));
  const base=resolve(web,`public/demos/${slug}`);
  if(await demoHash(base)!==row.demoSha256)throw Error(`${slug}: demo changed; re-record preview`);
  count++;total+=file.length;
}
console.log(`PASS ${count} real product recordings; ${(total/1048576).toFixed(2)} MiB; demo/video hashes and revisions match`);
