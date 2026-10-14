const fs=require('node:fs');const path=require('node:path');
const entry=JSON.parse(fs.readFileSync('web/product/giao-dien-web/semaan/reviews/1.0.0/catalog-entry.json','utf8'));
const file='web/src/lib/real-templates.ts';let catalog=fs.readFileSync(file,'utf8');
if(!catalog.includes('"slug": "semaan"')){
 if(/\bt34\s*:/.test(catalog))throw Error('t34 occupied');
 const marker='export const REAL_TEMPLATES: Record<string, RealTemplate> = {';
 catalog=catalog.replace(marker,marker+'\n  t34: '+JSON.stringify(entry,null,2)+',');fs.writeFileSync(file,catalog);
}
const guideFile='web/src/lib/template-guides.ts';let guide=fs.readFileSync(guideFile,'utf8');
if(!guide.includes("'semaan':")){
 const rows={
  vi:{intro:'Portfolio designer với hero cam-trắng, chữ CREATE cao và chân dung tự tạo.',notes:'### Bắt đầu\nGiải nén đủ 9 file, mở index.html cạnh assets/. CUSTOMISE.md có bảng sửa chính xác, 10 bước và 12 prompt AI. Không framework, build hoặc font mạng.\n\n### Nội dung và ảnh\nThay Alexis Semaan, email hello@semaan.example, availability, ba tác phẩm concept và sample client note. Không bỏ nhãn mẫu mà giữ lời chứng thực hư cấu. portrait.webp là chân dung nền trong suốt; work.webp là sheet 3 cột; people.webp là sheet 2×2 nhân vật hư cấu.\n\n### Tương tác\nMenu mobile dùng bàn phím/Escape; desktop có liên kết Work. Chi tiết tác phẩm và dịch vụ dùng details, hoạt động không JS. Reveal hữu hạn 620ms mặc định bật kể cả OS giảm chuyển động. Email chỉ mở ứng dụng, không tự gửi. Không backend hoặc booking.\n\n### Giấy phép\nĐọc LICENCE.txt. Ảnh dùng trong website hoàn chỉnh theo giấy phép thương mại hiện có; không bán lại template hoặc ảnh riêng lẻ.'},
  en:{intro:'A designer portfolio with an orange/white hero, tall CREATE type and an original cinematic portrait.',notes:'### Start\nExtract all 9 files and open index.html beside assets/. CUSTOMISE.md includes counted edits, 10 steps and 12 complete AI prompts. No framework, build or network fonts.\n\n### Content and images\nReplace Alexis Semaan, hello@semaan.example, availability, three concept studies and the sample client note. Never remove only the sample disclosure while keeping invented claims. portrait.webp is transparent; work.webp is a 3-column sheet; people.webp contains a 2×2 sheet of fictional people.\n\n### Interaction\nMobile keyboard/Escape menu, desktop work shortcut. Native work/service details function without JS. Finite 620ms scroll reveals default ON under OS reduced motion. Email opens a mail app only; no delivery, booking or backend.\n\n### Licence\nRead LICENCE.txt. Existing commercial policy permits artwork in finished websites, not template redistribution or standalone stock resale.'},
  zh:{intro:'设计师作品集，含橙白主视觉、高挑CREATE字体与原创电影感肖像。',notes:'### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md含精确修改表、10个步骤与12个完整AI提示词。无需框架、构建或网络字体。\n\n### 内容与图像\n替换Alexis Semaan、hello@semaan.example、工作状态、三项概念作品与示例客户评价。不得仅删除示例标记却保留虚构评价。portrait.webp为透明肖像；work.webp为3列作品图；people.webp为2×2虚构人物图。\n\n### 交互\n移动菜单支持键盘与Escape，桌面有作品快捷链接。原生作品/服务details在禁用JS时仍可用。620毫秒有限渐显默认开启，包括系统减少动态。邮件仅打开应用，无自动发送、预约或后端。\n\n### 授权\n阅读LICENCE.txt。现有商业授权允许图像用于成品网站，不允许重新分发模板或单独作为素材转售。'}
 };
 const marker='export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {';
 if(!guide.includes(marker))throw Error('Guide declaration differs');guide=guide.replace(marker,marker+"\n  'semaan': "+JSON.stringify(rows,null,2)+',');fs.writeFileSync(guideFile,guide);
}
const viewFile='web/src/lib/view.ts';let view=fs.readFileSync(viewFile,'utf8');
if(!view.includes("'ais-folio', 'semaan'")){view=view.replace("'leaflit', 'ais-folio']","'leaflit', 'ais-folio', 'semaan']");fs.writeFileSync(viewFile,view);}
const source=path.resolve('web/product/giao-dien-web/semaan/source');const demo=path.resolve('web/public/demos/semaan');fs.mkdirSync(demo,{recursive:true});
fs.writeFileSync(path.join(demo,'index.html'),fs.readFileSync(path.join(source,'index.html'),'utf8').replace('<head>','<head><base href="/demos/semaan/index.html">'));
fs.cpSync(path.join(source,'assets'),path.join(demo,'assets'),{recursive:true});console.log('Synced only Semaan t34, guide, specs and demo.');
