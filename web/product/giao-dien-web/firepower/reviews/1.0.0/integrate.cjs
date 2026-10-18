const fs = require('node:fs');
const path = require('node:path');
const product = JSON.parse(fs.readFileSync(path.join(__dirname,'catalog.json')));
const catalog = 'web/src/lib/real-templates.ts';
let text = fs.readFileSync(catalog,'utf8');
if (!text.includes('"slug": "firepower"')) {
  if (/^  t39:/m.test(text)) throw Error('t39 occupied');
  text = text.replace('export const REAL_TEMPLATES: Record<string, RealTemplate> = {', 'export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n  t39: '+JSON.stringify(product,null,2)+',');
  fs.writeFileSync(catalog,text);
}
const guide = {
  vi: {intro:'Landing page chuột gaming theo ảnh tham chiếu Logitech, nền than đen và điểm nhấn cyan.',notes:'### Bắt đầu\nGiải nén đủ 7 file và mở index.html cạnh assets/. CUSTOMISE.md có 10 bước, 12 prompt AI và bảng sửa đã đếm. HTML/CSS/JS thuần, không build hay font mạng.\n\n### Nội dung và ảnh\nThay Firepower, tên/nhãn Logitech và G604, thông số minh họa, hello@firepower.example. mouse-views.webp là sheet 3×2 ảnh chuột concept tự tạo, không phải ảnh hãng hay mô hình 3D. Không có liên kết hoặc quyền thương hiệu Logitech.\n\n### Tương tác\nNăm góc xem ở hero và gallery; nút, phím mũi tên, vuốt và trạng thái hiện tại. Thông số dùng details; menu hỗ trợ Escape. Reveal hữu hạn khi cuộn, motion mặc định bật và Pause motion chỉ cho phiên hiện tại. BUY dẫn đến mục email, không đặt hàng.\n\n### Phạm vi\nKhông backend, tồn kho, tài khoản hoặc thanh toán. Email chỉ mở ứng dụng. Đọc LICENCE.txt trước khi dùng; không phân phối lại template hoặc bán ảnh riêng.'},
  en: {intro:'A reference-inspired gaming mouse landing page in charcoal and cyan.',notes:'### Start\nExtract all 7 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and counted edits. Plain HTML/CSS/JS, no build or network fonts.\n\n### Content and artwork\nReplace Firepower, Logitech/G604 references, illustrative specifications and hello@firepower.example. mouse-views.webp is a 3×2 sheet of original generated concept renders, not manufacturer photos or a 3D model. No manufacturer affiliation or trademark rights.\n\n### Interaction\nFive hero and gallery views with buttons, arrow keys, swipe and current state. Native specifications; mobile menu supports Escape. Finite scroll reveals, motion ON by default, session-only Pause motion. BUY leads to an email enquiry section without placing an order.\n\n### Scope\nNo backend, stock, accounts or checkout. Email only opens a mail app. Read LICENCE.txt; no template redistribution or standalone image resale.'},
  zh: {intro:'参考游戏鼠标展示页，采用炭黑与青色视觉。',notes:'### 开始\n完整解压7个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条完整AI提示词和精确修改表。原生HTML/CSS/JS，无需构建或网络字体。\n\n### 内容与图像\n替换Firepower、Logitech/G604名称、示例参数和hello@firepower.example。mouse-views.webp是3×2原创AI概念图，不是官方摄影或3D模型。无厂家关联或商标授权。\n\n### 交互\n主视觉与图集支持五个视角、按钮、方向键、滑动和当前状态。原生参数展开，移动菜单支持Escape。有限滚动渐显，动态默认开启，Pause motion仅用于本次访问。BUY前往邮件咨询区域，不会下单。\n\n### 范围\n无后端、库存、账户或支付。邮件仅打开应用。请阅读LICENCE.txt；不可重新分发模板或单独转售图像。'}
};
const guidePath = 'web/src/lib/template-guides.ts';
let guideText = fs.readFileSync(guidePath,'utf8');
if (!guideText.includes("'firepower':")) {
  guideText = guideText.replace('export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {',"export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {\n  'firepower': "+JSON.stringify(guide,null,2)+',');
  fs.writeFileSync(guidePath,guideText);
}
const viewPath = 'web/src/lib/view.ts';
let view = fs.readFileSync(viewPath,'utf8');
if (!view.includes("'backbest-800', 'firepower'")) {
  if (!view.includes("'airmax-plus', 'backbest-800']")) throw Error('Unexpected spec mapping; inspect before edit');
  view = view.replace("'airmax-plus', 'backbest-800']","'airmax-plus', 'backbest-800', 'firepower']");
  fs.writeFileSync(viewPath,view);
}
const demo = 'web/public/demos/firepower';
fs.mkdirSync(demo,{recursive:true});
let html = fs.readFileSync(path.join(__dirname,'../../source/index.html'),'utf8');
// Absolute demo asset paths keep anchors correct on Vercel's slashless routes.
html = html.replace(/\b(src|href)="assets\//g,'$1="/demos/firepower/assets/');
fs.writeFileSync(path.join(demo,'index.html'),html);
fs.cpSync(path.join(__dirname,'../../source/assets'),path.join(demo,'assets'),{recursive:true});
console.log('Firepower t39 catalog, guides, spec mapping and demo synced.');
