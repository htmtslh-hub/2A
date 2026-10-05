
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const out=resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.3');
mkdirSync(out+'/screenshots',{recursive:true});
// Preview and video are rendered from the actual customer source, never a mockup.
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto(pathToFileURL(resolve('web/product/giao-dien-web/astra-interior/source/index.html')).href);await page.waitForTimeout(1600);
await page.mouse.move(0,0);
for(const [label,w,h] of [['',1440,900],['-tablet',820,1180],['-mobile',375,812]]) {
 await page.setViewportSize({width:w,height:h});await page.waitForTimeout(1000);
 const png=out+'/screenshots/preview'+label+'.png';await page.screenshot({path:png});
 execFileSync('python',['-c',"from PIL import Image; import sys; im=Image.open(sys.argv[1]); im.resize((1200,round(im.height*1200/im.width))).save(sys.argv[2],quality=88)",png,'web/public/previews/astra-interior'+label+'.webp']);
}
await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(1500);await page.screenshot({path:out+'/screenshots/full-page.png',fullPage:true});
mkdirSync(out+'/video-frames',{recursive:true});
for(let i=0;i<72;i++) {
 await page.mouse.move(720+Math.sin(i/8)*480,390+Math.cos(i/9)*150);
 if(i===8||i===30||i===52)await page.evaluate(()=>document.querySelector('[data-step="1"]').click());
 await page.screenshot({path:out+'/video-frames/'+String(i).padStart(3,'0')+'.png'});await page.waitForTimeout(45);
}
execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','12','-i',out+'/video-frames/%03d.png','-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',out+'/preview.mp4']);
await browser.close();

writeFileSync('web/public/previews/astra-interior.mp4',readFileSync(out+'/preview.mp4'));
