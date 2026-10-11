import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const product=resolve('web/product/giao-dien-web/music-app');
const source=resolve(product,'source');
const htmlPath=resolve(source,'index.html');
let html=readFileSync(htmlPath,'utf8').replace(/<button(?![^>]*\btype=)/g,'<button type="button"');
html=html.replace(/<svg\b([^>]*)>/g,(_tag,attrs)=>`<svg${attrs}${/\bviewBox=/.test(attrs)?'':' viewBox="0 0 24 24"'}${/\bfocusable=/.test(attrs)?'':' focusable="false"'}${/\baria-hidden=/.test(attrs)?'':' aria-hidden="true"'}>`);
// A dialog close button submits its method=dialog form locally.
html=html.replace('<button type="button" class="pill" value="close">','<button type="submit" class="pill" value="close">');
writeFileSync(htmlPath,html);
let guide=readFileSync('web/product/giao-dien-web/docs/customer-guide.en.md','utf8');
guide=guide.replace('# Forge Zone customer guide','# Music App — Customisation guide');
guide=guide.replaceAll('replace the information in square brackets','tell the AI your information in plain language; ask it to request anything missing');
guide=guide.replace(/\[[A-Z][^\]\n]*\]/g, 'ask me for this information before making the dependent change');
guide=guide.replaceAll('inline SVG','SVG icons and local WebP artwork');
guide=guide.replaceAll('reduced motion support','the approved default-on motion policy and optional pause controls');
guide=guide.replaceAll('reduced motion','the approved default-on motion policy');
guide=guide.replaceAll('Keep responsive\n  behaviour','Keep responsive\n  behaviour');
const needles=[['index.html','MUSIC APP'],['index.html','SOLARA'],['index.html','assets/img/aurora.webp'],['index.html','assets/audio/demo.wav'],['assets/css/style.css','--bg:'],['assets/css/style.css','--blue:'],['assets/css/style.css','--coral:'],['assets/css/style.css','--font-body:'],['assets/js/main.js',"title: 'AURORA'"],['assets/js/main.js',"artist: 'SOLARA'"]];
let map='\n## Music App editing map\n\nCounts below are literal occurrences in the exact file shown. Update them after editing.\n\n| File | Literal text | Count | Edit purpose |\n|---|---|---|---|\n';
for(const [file,needle] of needles){const count=readFileSync(resolve(source,file),'utf8').split(needle).length-1;map+=`| \`${file}\` | \`${needle}\` | ${count} | ${file.endsWith('.css')?'Theme token':file.endsWith('.js')?'Playback metadata':'Visible copy or asset path'} |\n`;}
map+='\nChange HTML track labels and the main.js tracks array together. The two AURORA rows are intentional reference content; they are not separate audio files. Every selection plays the same original 189-second sketch. Replace demo audio only with a recording you may use. Included generated artwork may be used in personal and client websites; standalone resale or redistribution is prohibited. See LICENCE.txt. Favourites and follow are session-only. Do not add account claims without implementing accounts.\n\nImages are in assets/img: aurora.webp, luna.webp, summer.webp and solara.webp. Keep aspect ratios and alt text. SVG symbols at the top of index.html are local icons. Navigation links use actual section IDs: home, playlist, album, artist, player, library and release. No contact email, price or verified testimonial is supplied.\n';
const preface='\nMusic App contains five local WebP images and a local WAV audio sketch in addition to the six base files shown below. Include all assets when attaching a working ZIP to AI or uploading to hosting. This product uses no web fonts and no backend. The player previews a local original demo; it is not a streaming service. Follow/favourites reset on reload.\n';
guide=guide.replace('## Before you begin',preface+'\n## Before you begin');
writeFileSync(resolve(source,'CUSTOMISE.md'),guide+map);
const brief=resolve(product,'reviews/1.0.0/BRIEF.md');
writeFileSync(brief,readFileSync(brief,'utf8').replace('W05/W06: đang chờ xác nhận tương tác ngoài menu/reveal và ZIP >20.480 byte.','W05/W06: chủ sản phẩm đã chọn “Cho phép cả hai” ngày 11/10/2026: tương tác cục bộ ngoài menu/reveal và ZIP >20.480 byte.'));
console.log('CUSTOMISE created: full 10-step / 12-prompt guide and measured edit map.');
