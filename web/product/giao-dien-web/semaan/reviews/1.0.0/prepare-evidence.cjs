const fs=require('node:fs');const path=require('node:path');
const previous='web/product/giao-dien-web/ais-folio/reviews/1.0.0';const next='web/product/giao-dien-web/semaan/reviews/1.0.0';
for(const name of ['check-source.cjs','check-motion.cjs','check-store.cjs','check-video-online.cjs','verify-online.cjs']){
 let code=fs.readFileSync(path.join(previous,name),'utf8').replaceAll('ais-folio','semaan').replaceAll('t33','t34').replaceAll('AIS Folio','Semaan').replaceAll('hello@aisfolio.example','hello@semaan.example').replaceAll('.menu-toggle','.nav-toggle').replaceAll('character.webp','portrait.webp').replaceAll('projects.webp','work.webp').replaceAll('[720,1278]','[838,634]');
 code=code.replaceAll('8 file · nhân vật và 6 poster tự tạo','9 file · 3 ảnh WebP tự tạo').replaceAll('8 files · original character and 6 posters','9 files · 3 original WebP images').replaceAll('8 个文件 · 原创角色与6张海报','9 个文件 · 3 张原创 WebP');
 if(name==='verify-online.cjs')code=code.replace("'demos/semaan/assets/img/work.webp',","'demos/semaan/assets/img/work.webp','demos/semaan/assets/img/people.webp',");
 fs.writeFileSync(path.join(next,name),code);
}
fs.mkdirSync(path.join(next,'candidate'),{recursive:true});
