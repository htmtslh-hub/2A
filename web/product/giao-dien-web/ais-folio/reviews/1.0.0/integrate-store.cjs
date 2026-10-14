const fs=require('node:fs');const path=require('node:path');
const entry=JSON.parse(fs.readFileSync('web/product/giao-dien-web/ais-folio/reviews/1.0.0/catalog-entry.json','utf8'));
const file='web/src/lib/real-templates.ts';let catalog=fs.readFileSync(file,'utf8');
if(!catalog.includes("slug: 'ais-folio'")&&!catalog.includes('"slug": "ais-folio"')){
 if(/\bt33\s*:/.test(catalog))throw Error('t33 is already occupied');
 catalog=catalog.replace('export const REAL_TEMPLATES: Record<string, RealTemplate> = {','export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n  t33: '+JSON.stringify(entry,null,2)+',');fs.writeFileSync(file,catalog);
}
const guideFile='web/src/lib/template-guides.ts';let guide=fs.readFileSync(guideFile,'utf8');
if(!guide.includes("'ais-folio':")){
 const rows={
  vi:{intro:'Portfolio cyan và xanh đen với nhân vật anime tự tạo và sáu poster.',notes:'### Bắt đầu\nGiải nén đủ 8 file, mở index.html cạnh assets/. CUSTOMISE.md có bảng sửa, 10 bước và 12 prompt AI. Không framework, build hay font mạng.\n\n### Nội dung và ảnh\nThay tên Ais, các handle, mô tả và email hello@aisfolio.example. Nội dung cá nhân và dự án đều minh họa. character.webp là nhân vật nền trong suốt; projects.webp là ảnh 3 cột × 2 hàng, CSS chọn từng poster.\n\n### Tương tác\nMenu hỗ trợ Escape và bàn phím. Mô tả dự án dùng details, hoạt động khi tắt JS. Scroll reveal hữu hạn 620ms, mặc định bật kể cả OS giảm chuyển động. Email chỉ mở ứng dụng, không gửi tự động. Không backend.\n\n### Giấy phép\nĐọc LICENCE.txt. Ảnh dùng trong website hoàn chỉnh theo giấy phép; không bán lại template hoặc ảnh riêng lẻ.'},
  en:{intro:'A cyan and navy portfolio with an original anime character and six posters.',notes:'### Start\nExtract all 8 files and open index.html beside assets/. CUSTOMISE.md includes exact edits, 10 steps and 12 AI prompts. No framework, build or network fonts.\n\n### Content and images\nReplace Ais, handles, copy and hello@aisfolio.example. Persona and projects are illustrative. character.webp is transparent; projects.webp is a 3-column × 2-row sheet selected by CSS.\n\n### Interaction\nKeyboard menu and Escape. Native details descriptions work without JS. Finite 620ms scroll reveals default on under OS reduced motion. Email opens an app only, with no delivery service or backend.\n\n### Licence\nRead LICENCE.txt. Artwork is licensed for finished websites, not standalone stock resale or template redistribution.'},
  zh:{intro:'青色与深蓝作品集，含原创动漫角色和六张海报。',notes:'### 开始\n完整解压8个文件，在assets/旁打开index.html。CUSTOMISE.md包含修改表、10个步骤和12个AI提示词。无需框架、构建或网络字体。\n\n### 内容与图片\n替换Ais、昵称、文案和hello@aisfolio.example。人物与项目均为示例。character.webp为透明角色；projects.webp为3列×2行海报图，通过CSS显示各格。\n\n### 交互\n菜单支持键盘与Escape。原生details作品描述在禁用JS时可用。620毫秒有限滚动渐显默认开启，包括系统减少动态。邮件仅打开应用，不含发送服务或后端。\n\n### 授权\n阅读LICENCE.txt。图像可按授权用于成品网站，不得单独作为素材转售或重新分发模板。'}
 };
 const marker='export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {';
 if(!guide.includes(marker))throw Error('Guide declaration differs');
 guide=guide.replace(marker,marker+"\n  'ais-folio': "+JSON.stringify(rows,null,2)+',');fs.writeFileSync(guideFile,guide);
}
const source=path.resolve('web/product/giao-dien-web/ais-folio/source');const demo=path.resolve('web/public/demos/ais-folio');fs.mkdirSync(demo,{recursive:true});
const html=fs.readFileSync(path.join(source,'index.html'),'utf8').replace('<head>','<head><base href="/demos/ais-folio/">');
fs.writeFileSync(path.join(demo,'index.html'),html);fs.cpSync(path.join(source,'assets'),path.join(demo,'assets'),{recursive:true});
console.log('Added only AIS Folio t33, guide and its public demo.');
