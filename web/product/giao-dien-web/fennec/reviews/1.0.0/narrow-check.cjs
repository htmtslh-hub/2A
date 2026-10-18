const {chromium,firefox}=require(process.cwd()+'/_design/.tooling/node_modules/playwright');
const fs=require('fs');const out='web/product/giao-dien-web/fennec/reviews/1.0.0';
(async()=>{
 const result=[];
 for(const [name,engine] of [['chromium',chromium],['firefox',firefox]]){
  const b=await engine.launch();const p=await b.newPage({viewport:{width:320,height:740}});
  // This targeted layout check omits the GLB; model rendering is covered by checks.json.
  await p.route('**/*.glb',route=>route.abort());
  await p.goto('http://127.0.0.1:4389/',{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1800);
  result.push(await p.evaluate(name=>({browser:name,width:innerWidth,brandRight:document.querySelector('.brand').getBoundingClientRect().right,brandLeft:document.querySelector('.brand').getBoundingClientRect().left,linksRight:document.querySelector('.nav__links').getBoundingClientRect().right,scroll:document.documentElement.scrollWidth,videoError:document.querySelector('video').error?.message,hevc:document.querySelector('video').canPlayType('video/mp4; codecs="hvc1.1.6.L153.B0"')}),name));
  await b.close();
 }
 fs.writeFileSync(out+'/narrow-checks.json',JSON.stringify(result,null,2));console.log(result);
})();
