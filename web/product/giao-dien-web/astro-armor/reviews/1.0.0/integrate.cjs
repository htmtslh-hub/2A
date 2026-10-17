const fs=require('fs'),path=require('path');
const review=__dirname, product=path.resolve(review,'../..');
const gate=JSON.parse(fs.readFileSync(path.join(review,'acceptance.json')));
if(gate.gate!=='PASS')throw Error('Acceptance gate must PASS before integration');
const crypto=require('crypto');
const digest=crypto.createHash('sha256');
for(const file of fs.readdirSync(path.join(product,'source'),{recursive:true}).filter(f=>fs.statSync(path.join(product,'source',f)).isFile()).map(f=>f.replaceAll('\\','/')).sort()){
  digest.update(file);digest.update(fs.readFileSync(path.join(product,'source',file)));
}
if(digest.digest('hex')!==gate.candidateHash)throw Error('Candidate changed after acceptance');
const target=path.resolve(process.argv[2]||process.cwd());
const entry=JSON.parse(fs.readFileSync(path.join(review,'catalog-entry.json')));
const {id,...record}=entry;
const catalog=path.join(target,'web/src/lib/real-templates.ts');
let text=fs.readFileSync(catalog,'utf8');
if(!text.includes("slug: 'astro-armor'")&&!text.includes('"slug": "astro-armor"')){
  if(new RegExp(`\\b${id}:`).test(text))throw Error('Occupied catalog slot '+id);
  const marker='export const REAL_TEMPLATES: Record<string, RealTemplate> = {';
  if(!text.includes(marker))throw Error('Missing catalog marker');
  text=text.replace(marker,marker+`\n  ${id}: ${JSON.stringify(record,null,2)},`);
  fs.writeFileSync(catalog,text);
}
const guidePath=path.join(target,'web/src/lib/template-guides.ts');
let guides=fs.readFileSync(guidePath,'utf8');
if(!guides.includes("'astro-armor':")&&!guides.includes('"astro-armor":')){
  const notes={
    vi:'Giải nén đủ 9 file rồi mở index.html cạnh assets/. CUSTOMISE.md gồm 10 bước, 12 prompt AI và bảng sửa đã đếm. Ảnh mẫu JPEG được giữ nguyên và hiển thị qua vùng cắt CSS; hai WebP dùng cho phối màu bổ sung. Độ nét ảnh beige/thumbnail giới hạn bởi ảnh tham chiếu. Có chọn size, màu, yêu thích và giỏ trong phiên với xóa/tổng tiền, bảng size, tìm một sản phẩm và hộp thông tin tài khoản. Không có đăng nhập, tồn kho, nhận đơn hay thanh toán thật. Thay thông tin demo, email và ảnh theo quyền của bạn; xem LICENCE.txt. Motion mặc định bật, có nút tạm dừng trong phiên.',
    en:'Extract all 9 files and open index.html beside assets/. CUSTOMISE.md includes ten steps, twelve AI prompts and counted edits. The unchanged supplied JPEG is shown through CSS image-region crops; two WebP files provide alternate colour concepts. Beige and thumbnail resolution is limited to the reference. Size/colour selection, favourite and session bag with removal/subtotal, size guide, single-item search and account information dialog work locally. No login, inventory, order processing or live checkout. Replace demo details, email and artwork with permitted content; read LICENCE.txt. Motion starts enabled with a session pause control.',
    zh:'解压全部9个文件，在assets/旁打开index.html。CUSTOMISE.md含10个步骤、12条AI提示词及精确修改表。原始JPEG通过CSS局部裁切显示，两个WebP用于额外配色概念。米色主图和缩略图清晰度受参考图限制。本地支持尺码/颜色选择、收藏、可删除并计算小计的会话购物袋、尺码表、单品搜索及账户说明。无登录、库存、订单处理或真实结账。请替换演示资料、邮箱及具有使用权限的图片，并阅读LICENCE.txt。动画默认开启，可在当前会话暂停。'
  };
  const guide=Object.fromEntries(['vi','en','zh'].map(lang=>[lang,{intro:record.copy[lang].desc,notes:notes[lang]}]));
  const marker='export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = {';
  if(!guides.includes(marker))throw Error('Missing guide marker');
  guides=guides.replace(marker,marker+`\n  'astro-armor': ${JSON.stringify(guide,null,2)},`);
  fs.writeFileSync(guidePath,guides);
}
const viewPath=path.join(target,'web/src/lib/view.ts');
let view=fs.readFileSync(viewPath,'utf8');
if(!view.includes("['astro-armor', 'galaxy-edge'")){
  if(!view.includes("['galaxy-edge', 'aerox-studio'"))throw Error('Missing per-product specs whitelist');
  view=view.replace("['galaxy-edge', 'aerox-studio'","['astro-armor', 'galaxy-edge', 'aerox-studio'");
  fs.writeFileSync(viewPath,view);
}
const dest=path.join(target,'web/product/giao-dien-web/astro-armor');
if(path.resolve(dest)!==path.resolve(product)){
  fs.mkdirSync(dest,{recursive:true});
  fs.cpSync(path.join(product,'source'),path.join(dest,'source'),{recursive:true});
  fs.copyFileSync(path.join(product,'README.md'),path.join(dest,'README.md'));
  if(fs.existsSync(path.join(product,'astro-armor.zip')))fs.copyFileSync(path.join(product,'astro-armor.zip'),path.join(dest,'astro-armor.zip'));
}
const demo=path.join(target,'web/public/demos/astro-armor');
fs.mkdirSync(demo,{recursive:true});
fs.cpSync(path.join(product,'source/assets'),path.join(demo,'assets'),{recursive:true});
const html=fs.readFileSync(path.join(product,'source/index.html'),'utf8').replace('<head>','<head>\n  <base href="/demos/astro-armor/index.html">');
fs.writeFileSync(path.join(demo,'index.html'),html);
console.log('Integrated only ASTRO Armor (t47): source/package, demo, catalog, guide and specs whitelist.');
