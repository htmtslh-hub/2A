const fs = require('node:fs');
const path = require('node:path');
const product = JSON.parse(fs.readFileSync(path.join(__dirname,'catalog.json')));
const catalog = 'web/src/lib/real-templates.ts';
let text = fs.readFileSync(catalog,'utf8');
if (!text.includes('"slug": "beetbuh"')) {
  if (/^  t41:/m.test(text)) throw Error('t41 occupied');
  text = text.replace('export const REAL_TEMPLATES: Record<string, RealTemplate> = {', 'export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n  t41: '+JSON.stringify(product,null,2)+',');
  fs.writeFileSync(catalog,text);
}
const guide = {
  "vi": {
    "intro": "Landing page tai nghe concept màu cam trên nền ivory theo ảnh tham chiếu.",
    "notes": "### Bắt đầu\nGiải nén đủ 9 file và mở index.html cạnh assets/. CUSTOMISE.md gồm 10 bước, 12 prompt AI và bảng sửa chính xác. Không cần build.\n\n### Ảnh và nội dung\nBa ảnh WebP tự tạo: hai góc tai nghe và người mẫu giả định. Thay BeetBuh, hello@beetbuh.example và thông số minh họa. Google Fonts tùy chọn; font hệ thống hoạt động offline nhưng khác hình thức.\n\n### Tương tác\nBa trạng thái gồm hai góc và một crop chi tiết, không phải 3D. Nút/phím/vuốt, hộp phóng to ảnh, menu Escape, thông số native và reveal khi cuộn. Pause motion chỉ trong phiên. Shop Now dẫn tới email, không đặt hàng.\n\n### Phạm vi\nKhông backend, âm thanh, tồn kho, tài khoản hay thanh toán. Đọc LICENCE.txt; không phân phối lại template hoặc bán ảnh riêng."
  },
  "en": {
    "intro": "An ivory-and-orange sculptural headphone concept landing page.",
    "notes": "### Start\nExtract all 9 files and open index.html beside assets/. CUSTOMISE.md contains 10 steps, 12 complete AI prompts and counted edits. No build required.\n\n### Artwork and content\nThree original WebP images: two headphone angles and a fictional campaign model. Replace BeetBuh, hello@beetbuh.example and illustrative specifications. Google Fonts are optional; offline system fonts differ visually.\n\n### Interaction\nThree states are two angles and an earcup crop, not 3D. Buttons/keys/swipe, image dialog, Escape menu, native specifications and scroll reveals. Pause motion is session-only. Shop Now leads to email enquiry without ordering.\n\n### Scope\nNo backend, audio engine, stock, accounts or checkout. Read LICENCE.txt; no template redistribution or standalone image resale."
  },
  "zh": {
    "intro": "象牙白与橙色的雕塑感耳机概念展示页。",
    "notes": "### 开始\n完整解压9个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条完整AI提示词和精确修改表。无需构建。\n\n### 图像与内容\n三张原创WebP图像：两个耳机角度和虚构模特。替换BeetBuh、hello@beetbuh.example和示例参数。Google Fonts可选，离线系统字体外观不同。\n\n### 交互\n三种视图为两个角度及耳罩裁剪细节，并非3D。支持按钮、方向键、滑动、放大对话框、Escape菜单、原生参数和滚动渐显。Pause motion仅用于本次访问。Shop Now前往邮件咨询，不下单。\n\n### 范围\n无后端、音频、库存、账户或支付。请阅读LICENCE.txt；不可重新分发模板或单独转售图像。"
  }
};
const guidePath = 'web/src/lib/template-guides.ts';
let guideText = fs.readFileSync(guidePath,'utf8');
if (!guideText.includes("'beetbuh':")) {
  guideText = guideText.replace('export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {',"export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {\n  'beetbuh': "+JSON.stringify(guide,null,2)+',');
  fs.writeFileSync(guidePath,guideText);
}
const viewPath = 'web/src/lib/view.ts';
let view = fs.readFileSync(viewPath,'utf8');
if (!view.includes("'beetbuh'")) {
 if (!view.includes("'firepower'")) throw Error('Missing prior product');
 view=view.replace("'firepower'","'firepower', 'beetbuh'");fs.writeFileSync(viewPath,view);
}
const demo = 'web/public/demos/beetbuh';
fs.mkdirSync(demo,{recursive:true});
let html = fs.readFileSync(path.join(__dirname,'../../source/index.html'),'utf8');
// Absolute demo asset paths keep anchors correct on Vercel's slashless routes.
html = html.replace(/\b(src|href)="assets\//g,'$1="/demos/beetbuh/assets/');
fs.writeFileSync(path.join(demo,'index.html'),html);
fs.cpSync(path.join(__dirname,'../../source/assets'),path.join(demo,'assets'),{recursive:true});
console.log('BeetBuh t41 catalog, guides, spec mapping and demo synced.');
