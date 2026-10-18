const fs=require('node:fs'),path=require('node:path');
const sharp=require('../../../../../../_design/.tooling/node_modules/sharp');
const inputs=JSON.parse(fs.readFileSync(path.join(__dirname,'photo-inputs.json'),'utf8'));
async function run(){
  const rows=[];
  for(const [id,input] of Object.entries(inputs)){
    const {data,info}=await sharp(input).trim().resize({width:1080,height:950,fit:'inside'}).png().toBuffer({resolveWithObject:true});
    const output=path.resolve(__dirname,`../../source/assets/img/hero-${id}.webp`);
    await sharp({create:{width:1400,height:1190,channels:4,background:{r:0,g:0,b:0,alpha:0}}})
      .composite([{input:data,left:Math.round((1400-info.width)/2+30),top:Math.round((1190-info.height)/2+20)}])
      .webp({quality:93,alphaQuality:100,effort:6}).toFile(output);
    rows.push({id,input,file:`assets/img/hero-${id}.webp`,width:1400,height:1190,bytes:fs.statSync(output).size,origin:'OpenAI image generation using existing original concept render as design reference',alpha:true});
  }
  fs.writeFileSync(path.join(__dirname,'photo-assets.json'),JSON.stringify(rows,null,2));console.log(rows);
}
run().catch(e=>{console.error(e);process.exitCode=1;});
