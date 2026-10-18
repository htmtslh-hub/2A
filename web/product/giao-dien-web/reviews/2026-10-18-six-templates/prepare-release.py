from pathlib import Path
import json,re,shutil
root=Path('web/product/giao-dien-web')
items=[
 ('t54','spaceedu','SpaceEdu','education',
  'Hero thiên văn với video Earth/Venus/Mars, chuyển hành tinh bằng hai nút cạnh và menu mobile. Một HTML có CSS/JS nội tuyến; tài nguyên hành tinh tải qua mạng. CTA khoá học là demo, chưa có đăng ký hay backend.',
  'A planetary video hero featuring Earth, Venus and Mars, side-planet switching and a mobile menu. One HTML with inline CSS/JS; planetary media requires a network connection. Course links are demo placeholders; no enrolment backend.',
  'Earth、Venus、Mars 行星视频首屏，支持两侧切换与移动菜单。单个 HTML 内嵌 CSS/JS，行星素材需要联网。课程入口为演示，不含报名后台。'),
 ('t55','mostar-city','Mostar City','portfolio',
  'Trang kể chuyện Mostar theo cuộn: cầu Stari Most, phố cổ và slider địa danh lặp hai chiều. PNG nhiều lớp, font Ogg đi kèm và ba file HTML/CSS/JS. Nội dung du lịch demo; không có đặt tour.',
  'A layered Mostar scroll story with Stari Most, the old town and an infinite sights slider. Includes the Ogg font and separate HTML/CSS/JS. Travel presentation only; no booking backend.',
  'Mostar 多层图片滚动叙事，展示古桥、老城与无限景点滑块。附 Ogg 字体及独立 HTML/CSS/JS。旅游展示模板，不含预订后台。'),
 ('t56','fennec','FENNEC','commerce',
  'Hero AI automation tông cam với cáo GLB 3D, parallax theo chuột và menu clip-path từ pill thương hiệu. Video H.264 đi kèm; Three.js và GLB cần mạng. Liên kết mở thông tin demo; chưa có dịch vụ AI hay billing.',
  'A warm AI automation hero with a GLB fox, pointer parallax and a pill-origin clip-path menu. Includes H.264 video; Three.js and the model require a network connection. Links show demo information; no AI service or billing backend.',
  '暖橙色 AI 自动化首屏，含 GLB 狐狸、鼠标视差与胶囊展开菜单。附 H.264 视频；Three.js 与模型需要联网。链接展示演示信息，不含 AI 服务或计费后台。'),
 ('t57','riverine-ai','riverine.ai','education',
  'Hero regenerative AI trên nền video dòng sông, logo cây và bướm SVG, menu responsive và entrance WAAPI một lượt. Một HTML; font RV chưa cung cấp nên dùng fallback. Các liên kết neo là demo, không có section đích hoặc âm thanh thật.',
  'A regenerative AI river-video hero with tree-and-moth SVG branding, responsive navigation and a single WAAPI entrance. One HTML; RV fonts are not included and use the specified fallbacks. Anchor links and sound control are visual demo elements.',
  '河流视频上的再生 AI 首屏，树与蝴蝶 SVG 标识、响应式导航和一次性 WAAPI 入场。单个 HTML；未附 RV 字体，使用指定后备字体。锚点与声音按钮为视觉演示。'),
 ('t58','freight-axis','Freight Axis','commerce',
  'Hero logistics video tàu hàng từ trên cao, headline condensed và hai khối nội dung căn đối xứng qua trục đường ray. Một HTML không JS, entrance CSS một lượt, reflow portrait/phone. Font condensed dùng local(), cần mạng cho video.',
  'An aerial freight-video hero with condensed headlines and two rail-axis feature blocks. One HTML without JavaScript, a single CSS entrance and portrait/phone reflow. Uses locally installed condensed fonts and remote video.',
  '货运列车航拍视频首屏，窄体标题与沿铁轨轴对称的信息区。单个 HTML、无 JavaScript、一次 CSS 入场和竖屏重排。使用本机窄体字体，视频需要联网。'),
 ('t59','meridian','Meridian','communication',
  'Footer một viewport màu sage với la bàn SVG, Fraunces/Inter và video cầu cạn khắc nét có xe ngựa chạy qua. Video H.264 đi kèm, blend multiply, nav desktop/tablet/mobile và năm tự cập nhật. Các liên kết # chưa nối trang thật.',
  'A sage viewport footer with a compass SVG, Fraunces/Inter and an engraved viaduct coach video. Includes H.264 video, multiply blending, responsive footer navigation and the current year. Hash links are not connected to full pages.',
  '鼠尾草色全屏页脚，含罗盘 SVG、Fraunces/Inter 与马车驶过高架桥的版画视频。附 H.264 视频、正片叠底、响应式导航及动态年份。# 链接尚未连接实际页面。')]

replacements={
 'fennec':('https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261016_125941_6c5f1180-2f4e-44ec-b90c-aa0b05e5109b.mp4','assets/video/forest-h264.mp4'),
 'meridian':('https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144832_2b6b23aa-4416-4fcb-9df4-132349c59edc.mp4','assets/video/viaduct-h264.mp4'),
 'mostar-city':('https://dcym8fthxf5uu.cloudfront.net/fonts/247a073c-29f5-4a89-aa3a-741020f346fc/OggText-Medium.woff2','assets/fonts/OggText-Medium.woff2')}
for slug,(old,new) in replacements.items():
 f=root/slug/'source'/('styles.css' if slug=='mostar-city' else 'index.html');text=f.read_text(encoding='utf-8');f.write_text(text.replace(old,new),encoding='utf-8')

prompts=[
 ('Set up my editing assistant','Read every file in the latest ZIP, README, CUSTOMISE and LICENCE first. Name missing files without guessing. Explain working controls, demo-only links and dependencies. Ask for missing brand, audience, contact, language and goals in small groups; do not edit yet.'),
 ('Personalise the copy','Use only my verified business information. Ask for missing facts, then replace brand, metadata, headings, copy and accessible labels while preserving the layout and animation. Remove unsupported claims; never invent statistics, reviews, prices or URLs.'),
 ('Connect links and actions','Audit every link and button with its current destination. Ask for real destinations if missing; connect only URLs, mailto or tel I provide. Preserve actual interactions. Do not simulate sign-up, booking, payment or form success. Return a click-test table.'),
 ('Colours and fonts','Ask for my palette and font preference if missing. Inspect the actual CSS tokens and JavaScript-written values. Preserve layout, responsive rules and animation, test contrast on the real media and font fallbacks, and document font licensing. Do not introduce dependencies.'),
 ('Replace imagery or logo','Inspect the files and the assets I attach; ask which image goes where if unclear. Preserve aspect ratio, transparent scene layers and object positioning. Provide exact relative destinations, sensible alt text and desktop/mobile checks. Do not download replacement assets without my instruction.'),
 ('Translate the page','Ask which language if I have not specified it. Translate visible copy, metadata, lang and accessible labels naturally. Preserve proper names, URLs and figures. Check long titles and buttons at320/375/820/1440px. Do not add language switching unless requested.'),
 ('Add or remove a section','Ask what section/item and verified content I want if missing. Find its complete HTML/CSS/JS dependencies, preserve the existing visual system, update navigation and any slider counts or scroll stops, and test responsive behaviour. Do not add a framework or backend.'),
 ('Audit before publishing','Inspect the latest files and run browsers if available. Test1440x900,820x1180,375x812,320x740, keyboard/focus, menu Escape, animation, overflow, zoom200%, noJS, offline, reduced motion, font fallback, console/network, demo content and all links. Report PASS/FAIL/NOT TESTED with evidence, never claim a code read was a browser test.'),
 ('Publish the static site','Ask which host, upload method and current screen if missing. Use current official documentation, explain which runtime files to upload and verify the resulting URL/mobile/HTTPS. I keep my passwords and tokens private. Do not publish or change DNS without my explicit request.'),
 ('Connect a domain','Ask for hosting, domain provider, existing website/email and the exact DNS instructions if missing. Never invent IPs or remove MX/TXT records. Explain a backup and each required record using actual provider instructions; I perform account changes. Check root/www/HTTPS/email.'),
 ('Update one part','Read the latest files and ask for the exact scope if unclear. Change only that part and necessary dependencies, preserve approved content and behaviour, return complete changed files with local tests and rollback steps. Do not overwrite the live site or create a new hosting project automatically.'),
 ('Diagnose a problem','Ask what failed, expected result, browser/device, recent changes and local-versus-online context if missing. Read actual files, check paths, media codecs, console and dependencies. Fix the smallest verified cause without rewriting the design. Distinguish evidence from hypotheses and provide complete changed files plus a confirmation test.')]

for id,slug,name,cat,vi,en,zh in items:
 src=root/slug/'source';files=[f for f in src.rglob('*') if f.is_file() and f.suffix not in ['.md','.txt']]
 runtime=', '.join('`'+str(f.relative_to(src)).replace('\\','/')+'`' for f in files)
 note=''
 if slug=='mostar-city':note='Ogg is loaded from assets/fonts/OggText-Medium.woff2 to avoid cross-origin font failures. Its separate font licence is not replaced by the template licence.'
 if slug in ['fennec','meridian']:note='The bundled H.264/yuv420p video replaces the original HEVC clip with the owner\'s explicit approval on18Oct2026. Keep assets/video beside the HTML.'
 if slug=='riverine-ai':note='RV fonts were not supplied. The requested @font-face declarations intentionally remain; the specified system fallbacks are used. Missing RV requests are documented, not bundled as fake fonts.'
 if slug=='freight-axis':note='Display/UI fonts use local() candidates (Oswald/Bebas/Impact and Oswald/Barlow/Arial Narrow). Appearance depends on installed, separately licensed fonts. No font files are distributed.'
 readme=f'# {name} — 1.0.1\n\nRead CUSTOMISE.md first for the editing map,10steps and12AI prompts.\n\n{en}\n\n## Open\nExtract the entire ZIP, then open index.html. Keep all relative files beside it. No build or framework is required. Runtime files: {runtime}.\n\n{note}\n\n## What is included\nA static interface and its documented local interactions. Demo anchors/dialogs do not provide enrolment, AI services, billing, booking, forms or payment. External media, fonts, and the FENNEC model/Three.js require a network connection.\n\n## Verification\nWindows headless Chromium153 and Firefox155 were used for layout checks; production verification is recorded separately. Safari, physical phones and every accessibility condition have not been certified. Read the product description before choosing this design.\n\n## Editing\nBrand, copy and links are in index.html; inline styles/scripts remain inside it except Mostar\'s styles.css/script.js. Keep all scene layers, breakpoint rules and SVG paths unless intentionally redesigning. Restore a backup if a change breaks the page.\n\n## Terms\nSee LICENCE.txt. Remote third-party media and proprietary font rights are not granted by the template code licence.\n'
 (src/'README.md').write_text(readme,encoding='utf-8')
 custom=f'# Customise {name}\n\n## Editing map\n\n| File | Literal | Count | What it controls |\n|---|---|---:|---|\n'
 html=(src/'index.html').read_text(encoding='utf-8')
 for literal,label in [('<title>','Browser title'),('href="#','Demo/section links'),('<video','Background media'),('aria-label=','Accessible names'),(name,'Brand occurrences')]:custom+=f'| index.html | `{literal}` | {html.count(literal)} | {label} |\n'
 custom+='\nCSS tokens are in :root. The original brief keeps inline code except Mostar (styles.css/script.js). Changing only a starting CSS custom property may not affect values later written by JavaScript. '+note+'\n\n'
 steps=[('Unzip and open','Extract the whole ZIP and open index.html. Confirm the interface and keep all relative assets.'),('Make a backup','Keep the original ZIP untouched; copy the whole extracted folder before editing. Work only in that copy.'),('Prepare your information','Collect verified brand, audience, copy, real contact/link targets and licensed assets. Mark undecided facts; do not invent them.'),('Work with AI','Send the latest runtime files, README, CUSTOMISE and LICENCE; use Prompt01. If the AI cannot edit directly, replace files with its complete returned versions. Start a new chat by resending current files.'),('Replace demo content','Use Prompts02/03. Replace or clearly retain demo information and connect real destinations. Refresh and click each action.'),('Adjust the appearance','Use Prompts04–07 for colour, fonts, imagery, language or sections. Preserve responsive behaviour and update the editing map.'),('Test the final version','Use Prompt08; check desktop/tablet/phone, keyboard, video, menu, zoom, offline and motion. Record actual tests and unresolved problems.'),('Publish when authorised','Use Prompt09 and current host documentation. Upload only runtime files and required licence notices, not ZIP backups or private notes. Verify the public URL.'),('Optional custom domain','Use Prompt10, actual DNS values and a backup of records. Preserve email records and verify HTTPS/www.'),('Update and recover','Use Prompts11/12. Keep all changed files on the same version, test locally and update the same hosting project. Restore the known-good backup if necessary.')]
 for i,(title,body) in enumerate(steps,1):custom+=f'## Step {i} — {title}\n\n{body}\n\n'
 for i,(title,body) in enumerate(prompts,1):custom+=f'### Prompt {i:02d} — {title}\n\n```text\nI am editing {name}. Use the current files I provide, not a remembered old version. {body} Return complete changed files with exact destination paths, no ellipses, and state what you did and did not test. Preserve the existing plain HTML/CSS/JS structure and do not publish without my explicit instruction.\n```\n\n'
 custom+='## Final checklist\n\nKeep a backup. Check real copy/links, licensed imagery/fonts, responsive layout, video playback, keyboard focus and all documented demo limitations before publication. Do not send passwords, OTPs or API keys to an AI chat.\n'
 (src/'CUSTOMISE.md').write_text(custom,encoding='utf-8')
 licence=f'''{name} — LICENCE TERMS

1. WHAT YOU GET
A perpetual, non-exclusive, worldwide commercial licence to the template source code, subject to the terms below.

2. WHAT YOU MAY DO
Use and modify this code for unlimited personal or client projects, deploy the resulting websites, and charge for your work. No attribution is required for the template code.

3. WHAT YOU MAY NOT DO
Do not resell, sublicense, give away, publish on another marketplace/public repository, or bundle the template files as another template product. Do not use the files to build a product whose main value is the template itself.

4. DEMO CONTENT AND MEDIA
Demo names, sample copy and interface flows must be reviewed before publication. Third-party video, photos, models and fonts keep their own rights. The code licence does not grant rights to these assets. The source URLs came from the project brief; verify your intended media/font use separately. Do not treat a demo interface as a connected booking, payment, AI or enrolment service.

5. FONTS AND LIBRARIES
Google Fonts Prata, Hanken Grotesk, Poppins, Questrial, Urbanist, Fraunces and Inter use the SIL Open Font License; the relevant licence files were verified in the official google/fonts repository on18Oct2026: https://github.com/google/fonts/tree/main/ofl . Each product uses only its declared fonts. Ogg and locally installed system fonts have separate terms; no blanket font rights are granted here. Three.js (FENNEC only) is MIT licensed: https://github.com/mrdoob/three.js/blob/r160/LICENSE . CDN dependencies are referenced, not bundled.

6. OWNERSHIP
Copyright in the template design and code remains with its original author. This licence grants permission to use the code, not ownership. Breach of section3 terminates this licence; stop using the template and delete your copies.

7. NO WARRANTY
Provided as is, without a guarantee for every purpose or browser. Actual checks and limitations are documented in README and the product description. No untested browser or accessibility certification is promised.

Questions about what is and is not allowed: just ask. The answer is usually yes.
'''
 (src/'LICENCE.txt').write_text(licence,encoding='utf-8')
 demo=Path('web/public/demos')/slug
 if demo.exists():raise RuntimeError('Refusing existing demo '+slug)
 demo.mkdir(parents=True)
 for f in files:
  target=demo/f.relative_to(src);target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(f,target)
 # Anchor relative files even when Vercel removes directory trailing slashes.
 demohtml=demo/'index.html';text=demohtml.read_text(encoding='utf-8');text=re.sub(r'<head>',f'<head>\n  <base href="/demos/{slug}/">',text,count=1);demohtml.write_text(text,encoding='utf-8')
 qa=root/slug/'reviews/1.0.1';qa.mkdir(parents=True,exist_ok=True)
 (qa/'QA.md').write_text(f'# {name} 1.0.1 — release integration\n\n18/10/2026: user authorised Forge Zone catalog/demo/ZIP deployment and video/font compatibility fixes. Source runtime structure retained under original brief exception; README/CUSTOMISE/LICENCE added for delivery. H.264 media and local Ogg are specifically authorised. Existing1.0.0QA remains historical; final checks and deployment evidence are in the shared six-template release folder. No blanket accessibility or all-browser certification.\n',encoding='utf-8')

catalog=Path('web/src/lib/real-templates.ts');text=catalog.read_text(encoding='utf-8');blocks=[]
for id,slug,name,cat,vi,en,zh in items:
 obj={'slug':slug,'cat':cat,'version':'1.0.1','video':True,'specs':{},'copy':{}}
 for lang,desc in [('vi',vi),('en',en),('zh',zh)]:
  obj['copy'][lang]={'name':name,'desc':desc,'tags':['HTML/CSS/JS','Responsive','Video' if slug!='mostar-city' else 'Scroll story']}
  obj['specs'][lang]=[['Format','HTML/CSS/JS · no build'],['Version','1.0.1'],['Assets','Bundled H.264' if slug in ['fennec','meridian'] else 'Local Ogg + remote PNG' if slug=='mostar-city' else 'Remote media'],['Scope',desc]]
 blocks.append('  '+id+': '+json.dumps(obj,ensure_ascii=False,indent=2).replace('\n','\n  ')+',\n')
text=text.replace('export const REAL_TEMPLATES: Record<string, RealTemplate> = {','export const REAL_TEMPLATES: Record<string, RealTemplate> = {\n'+''.join(blocks),1);catalog.write_text(text,encoding='utf-8')
view=Path('web/src/lib/view.ts');text=view.read_text(encoding='utf-8');text=text.replace("['vesper-ai', 'astro-armor'","['spaceedu', 'mostar-city', 'fennec', 'riverine-ai', 'freight-axis', 'meridian', 'vesper-ai', 'astro-armor'",1);view.write_text(text,encoding='utf-8')
(root/'reviews/2026-10-18-six-templates/catalog.json').write_text(json.dumps([{'id':i[0],'slug':i[1],'name':i[2]} for i in items],indent=2),encoding='utf-8')
print('Prepared six source packages, demos and additive catalog entries t54–t59.')
