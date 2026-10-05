import {resolve} from 'node:path';
import {writeFileSync} from 'node:fs';
process.env.PLAYWRIGHT_BROWSERS_PATH=resolve('_design/.browsers');
const {chromium,firefox}=await import('../../../../../../_design/.tooling/node_modules/playwright/index.mjs');
const reports=[];
for(const [name,engine,options] of [['edge',chromium,{channel:'msedge'}],['chromium',chromium,{}],['firefox',firefox,{}]]) {
 const b=await engine.launch({headless:true,...options});const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await p.addInitScript(()=>{window.particlePositions=[];const clear=CanvasRenderingContext2D.prototype.clearRect;CanvasRenderingContext2D.prototype.clearRect=function(...args){if(this.canvas.className==='cosmic-stars')window.particlePositions=[];return clear.apply(this,args)};const original=CanvasRenderingContext2D.prototype.moveTo;CanvasRenderingContext2D.prototype.moveTo=function(x,y){if(this.canvas.className==='cosmic-stars'){window.particlePositions.push([x,y]);if(window.particlePositions.length>1400)window.particlePositions.shift()}return original.call(this,x,y)}});
 await p.goto('http://127.0.0.1:4330/demos/astra-interior/?v=2.0.3');await p.waitForTimeout(1600);
 const base=await p.evaluate(()=>window.particlePositions.slice());
 await p.mouse.move(420,420);await p.waitForTimeout(350);
 const active=await p.evaluate(()=>window.particlePositions.slice());
 await p.screenshot({path:resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.3/screenshots/'+name+'-antigravity.png')});
 await p.waitForTimeout(1500);
 const rest=await p.evaluate(()=>window.particlePositions.slice());
 const count=base.length;const moving=active.slice(-count);const resting=rest.slice(-count);
 const displacement=base.map((v,i)=>Math.hypot(v[0]-moving[i][0],v[1]-moving[i][1]));
 const reset=base.every((v,i)=>Math.hypot(v[0]-resting[i][0],v[1]-resting[i][1])<.01);
 reports.push({browser:name,version:b.version(),particles:count,moved:displacement.filter(v=>v>1).length,maxDisplacement:Math.max(...displacement),reset,pass:reset&&displacement.filter(v=>v>1).length>50});
 await b.close();
}
writeFileSync(resolve('web/product/giao-dien-web/astra-interior/reviews/2.0.3/particle-checks.json'),JSON.stringify(reports,null,2));console.log(reports);if(reports.some(r=>!r.pass))process.exitCode=1;
