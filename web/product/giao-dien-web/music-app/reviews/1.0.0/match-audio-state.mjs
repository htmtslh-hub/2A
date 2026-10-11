import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const product=resolve('web/product/giao-dien-web/music-app');
const rate=16000,duration=189,samples=rate*duration;
const wav=Buffer.alloc(44+samples*2);
wav.write('RIFF');wav.writeUInt32LE(36+samples*2,4);wav.write('WAVE',8);wav.write('fmt ',12);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(rate,24);wav.writeUInt32LE(rate*2,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(samples*2,40);
const chords=[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]];
for(let n=0;n<samples;n++){
 const t=n/rate,chord=chords[Math.floor(t/6)%4],beat=t%.75;
 const envelope=Math.min(1,beat/.03)*Math.exp(-beat*3.8),fade=Math.min(1,t/.5,(duration-t)/1.2);
 const tone=chord.reduce((sum,hz,i)=>sum+Math.sin(2*Math.PI*hz*t)*(i===Math.floor(t/.75)%3?.16:.035),0);
 wav.writeInt16LE(Math.round(tone*envelope*fade*32767),44+n*2);
}
writeFileSync(resolve(product,'source/assets/audio/demo.wav'),wav);
for(const file of ['source/index.html','source/README.md','source/assets/js/main.js','reviews/1.0.0/prepare-docs.mjs']){
 const path=resolve(product,file);let text=readFileSync(path,'utf8').replaceAll('24-second','189-second').replaceAll('24 giây','189 giây');
 if(file==='source/index.html')text=text.replace('max="24"','max="189"');
 writeFileSync(path,text);
}
console.log('Original 189-second audio lets the reference 01:45 playback state be tested truthfully.');
