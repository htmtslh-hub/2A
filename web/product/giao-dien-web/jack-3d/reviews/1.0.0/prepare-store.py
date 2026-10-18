from pathlib import Path
import json, shutil, zipfile, hashlib

root=Path(__file__).resolve().parents[6]
product=root/'web/product/giao-dien-web/jack-3d'
src=product/'source'
descriptions={
 'vi':'Portfolio 3D nền tối với chân dung magnetic, hai hàng GIF chuyển động theo cuộn, giới thiệu hiện từng ký tự, năm dịch vụ và ba project card xếp chồng. React + TypeScript, cần Node.js và build. Contact/Live Project mở hộp demo; chưa nối email hay website thật. Tài nguyên tải qua mạng; một GIF Celestia nguồn bị 404 có ô thay thế.',
 'en':'A dark 3D creator portfolio with a magnetic portrait, two scroll-driven GIF rows, character-reveal biography, five services and three stacking project cards. React + TypeScript; Node.js and a build required. Contact/Live Project open demo dialogs, with no real email or project destinations. Media requires internet; one unavailable Celestia GIF has a fallback tile.',
 'zh':'深色3D创作者作品集，包含磁吸人像、双行滚动GIF、逐字显现介绍、五项服务及三张叠放项目卡。React + TypeScript，需要Node.js和构建。Contact/Live Project仅打开演示弹窗，未连接真实邮箱或项目地址。素材需联网；一个Celestia GIF源返回404，显示替代状态。'
}
entry={'slug':'jack-3d','cat':'portfolio','version':'1.0.0','video':True,
 'copy':{lang:{'name':'Jack — 3D Creator','desc':desc,'tags':['React + TypeScript','Framer Motion','3D Portfolio']} for lang,desc in descriptions.items()},
 'specs':{lang:[['Format','React 18 · TypeScript · Vite'],['Version','1.0.0'],['Dependencies','Tailwind CSS · Framer Motion · Lucide'],['Setup','Node.js · npm ci · npm run build'],['Scope',desc]] for lang,desc in descriptions.items()}}
p=root/'web/src/lib/real-templates.ts'
s=p.read_text(encoding='utf-8')
if 'slug: \'jack-3d\'' not in s and '"slug": "jack-3d"' not in s:
 s=s.replace('export const REAL_TEMPLATES: Record<string, RealTemplate> = {','export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n  t60: '+json.dumps(entry,ensure_ascii=False,indent=2)+',',1)
 p.write_text(s,encoding='utf-8')
p=root/'web/src/lib/view.ts';s=p.read_text(encoding='utf-8');s=s.replace("['spaceedu', 'mostar-city'","['jack-3d', 'spaceedu', 'mostar-city'",1);p.write_text(s,encoding='utf-8')
notes={
 'vi':'### Bắt đầu\nGiải nén ZIP, đọc CUSTOMISE.md và README.md. Cài Node.js 20.19+ hoặc 22.12+, chạy npm ci rồi npm run dev. Chạy npm run build và upload nội dung dist/ để xuất bản. Không mở trực tiếp file://.\n\n### Gói giao\nMã nguồn React/TypeScript, package-lock.json, cấu hình Vite/Tailwind và bản build sẵn trong built/. Không kèm node_modules.\n\n### Tuỳ chỉnh\nsrc/main.tsx chứa nội dung và hành vi; src/assets.json chứa URL ảnh/GIF; src/styles.css chứa giao diện. CUSTOMISE.md có10bước và12prompt AI.\n\n### Giới hạn\nCần JavaScript và mạng cho media/font. Contact và Live Project là demo, không gửi dữ liệu. Một GIF Celestia nguồn404 có trạng thái thay thế. Kiểm tra quyền media riêng trước khi xuất bản.',
 'en':'### Start\nExtract the ZIP and read CUSTOMISE.md and README.md. Install Node.js20.19+ or22.12+, run npm ci and npm run dev. Run npm run build and publish dist/. Direct file:// opening is unsupported.\n\n### Package\nEditable React/TypeScript source, package-lock.json, Vite/Tailwind configuration and a prebuilt site in built/. node_modules is excluded.\n\n### Edit\nsrc/main.tsx contains content and behavior; src/assets.json contains media URLs; src/styles.css contains styling. CUSTOMISE.md has10steps and12AI prompts.\n\n### Limits\nJavaScript and internet for media/fonts are required. Contact/Live Project are demo dialogs and send no data. One404Celestia GIF has a fallback tile. Verify separate media rights before publishing.',
 'zh':'### 开始\n解压ZIP，阅读CUSTOMISE.md和README.md。安装Node.js20.19+或22.12+，运行npm ci、npm run dev。运行npm run build并发布dist/。不支持直接通过file://打开。\n\n### 文件\n可编辑React/TypeScript源码、锁文件、Vite/Tailwind配置及built/预构建网站。不含node_modules。\n\n### 修改\nsrc/main.tsx为内容和交互；src/assets.json为素材URL；src/styles.css为样式。CUSTOMISE.md含10步和12条AI提示词。\n\n### 范围\n需JavaScript和联网媒体/字体。联系和项目按钮为演示弹窗，不发送数据。Celestia GIF源404，显示替代状态。发布前确认素材独立授权。'
}
p=root/'web/src/lib/template-guides.ts';s=p.read_text(encoding='utf-8')
if '"jack-3d"' not in s:
 s+='\nObject.assign(TEMPLATE_GUIDES, '+json.dumps({'jack-3d':{lang:{'intro':desc,'notes':notes[lang]} for lang,desc in descriptions.items()}},ensure_ascii=False,indent=2)+');\n'
 p.write_text(s,encoding='utf-8')
demo=root/'web/public/demos/jack-3d'
shutil.copytree(src/'dist',demo,dirs_exist_ok=True)
p=demo/'index.html';s=p.read_text(encoding='utf-8');s=s.replace('<head>','<head><base href="/demos/jack-3d/">',1);p.write_text(s,encoding='utf-8')
files=[f for f in src.rglob('*') if f.is_file() and not any(x in ('node_modules','dist') or x.startswith('.') for x in f.relative_to(src).parts)]
zip_path=product/'jack-3d.zip'
with zipfile.ZipFile(zip_path,'w',zipfile.ZIP_DEFLATED) as z:
 for f in files:z.write(f,'jack-3d/'+f.relative_to(src).as_posix())
 for f in (src/'dist').rglob('*'):
  if f.is_file():z.write(f,'jack-3d/built/'+f.relative_to(src/'dist').as_posix())
with zipfile.ZipFile(zip_path) as z:
 assert z.testzip() is None
 for f in files:assert z.read('jack-3d/'+f.relative_to(src).as_posix())==f.read_bytes()
info={'id':'t60','slug':'jack-3d','name':'Jack — 3D Creator','zipBytes':zip_path.stat().st_size,'sha256':hashlib.sha256(zip_path.read_bytes()).hexdigest()}
(product/'reviews/1.0.0/package.json').write_text(json.dumps(info,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(info,ensure_ascii=False))
