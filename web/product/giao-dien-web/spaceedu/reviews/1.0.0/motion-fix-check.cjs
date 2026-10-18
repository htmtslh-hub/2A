const fs=require('fs'),vm=require('vm'),assert=require('assert');
const base='web/product/giao-dien-web/spaceedu';const html=fs.readFileSync(base+'/source/index.html','utf8').replaceAll('\r\n','\n');
for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
assert(!html.includes('prefers-reduced-motion'));
const f=html.match(/function playActive\(\)\{([\s\S]*?)\n\}\nmotionPlay/)[1];
(async()=>{
 const control={hidden:true};let blocked=true;let calls=0;const clip={classList:{contains:()=>true},play:()=>{calls++;return blocked?Promise.reject({name:'NotAllowedError'}):Promise.resolve();}};
 const ctx=vm.createContext({clips:[clip],motionPlay:control});vm.runInContext('let playAttempt=0;function playActive(){'+f+'}',ctx);
 vm.runInContext('playActive()',ctx);await new Promise(r=>setImmediate(r));assert.equal(control.hidden,false);
 blocked=false;vm.runInContext('playActive()',ctx);await new Promise(r=>setImmediate(r));assert.equal(control.hidden,true);assert.equal(clip.muted,true);
 const result={syntax:'PASS',defaultMotionWithoutSystemGate:'PASS',autoplayRejectionShowsButton:'PASS',successfulRetryHidesButton:'PASS',mutedBeforePlay:'PASS',playCalls:calls,browserPlayback:'NOT TESTED: file URL browser inspection was blocked; no alternate browser path attempted'};
 fs.writeFileSync(base+'/reviews/1.0.0/motion-fix-checks.json',JSON.stringify(result,null,2));console.log(result);
})();

