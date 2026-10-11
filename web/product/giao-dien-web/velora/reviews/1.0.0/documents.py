from pathlib import Path
import re
root=Path(__file__).resolve().parents[2]
src=root/'source'
guide=(root.parent/'docs/customer-guide.en.md').read_text(encoding='utf-8')
# Keep all ten customer steps and twelve complete prompts, replacing fill-in fields
# with instructions to ask the customer in ordinary language.
guide=guide.replace('# Forge Zone customer guide','# Velora customisation guide')
guide=guide.replace('reduced motion support','the finite entrance animation, which defaults to on')
guide=guide.replace('and reduced motion.','and the default-on finite entrance animation.')
guide=guide.replace('and reduced motion work correctly.','and entrance motion work correctly.')
guide=guide.replace('reduced motion','entrance motion')
guide=re.sub(r'\[(?:BRAND|WHAT|PRODUCTS|TARGET|VERIFIED|FOR EXAMPLE|EMAIL|REAL|LANGUAGE|HEX|FONT|LOGO|DESCRIBE|HOSTING|DOMAIN|EXPECTED|ACTUAL|PAGE|LAST|EXACT|ADD)[^\]]*\]', 'ask me for this information before editing',guide)
guide=guide.replace('[HEADING FONT]','ask me which heading font to use')
guide=guide.replace('[BODY FONT]','ask me which body font to use')
guide=guide.replace('[PUBLIC CONTACT DETAILS]','ask me which contact details are public')
guide=guide.replace('[WHAT THE VISITOR SHOULD DO]','ask me what visitors should do')
guide=guide.replace('[TONE]','ask me which tone to use')
guide=re.sub(r'\[[A-Z][A-Z /,\'".-]+\]','ask me for the missing information',guide)
intro='''
Velora is a fictional folding-bike showroom. This version is a static presentation:
the wheel/frame/comfort links navigate to real detail sections; they do not change
the bicycle. Product Explore links return to the Metro presentation. There is no
carousel, cart, payment, inventory or order system. Replace the sample contact
address and all sample prices before publishing. The email action opens the
visitor's email client; it never sends an email automatically.

## Edit map

Counts below are literal occurrences in the final files. Replace metadata and
accessible labels as well as visible headings. The SVG VELORA wordmark is separate
from the ordinary brand name. Bike colours are stops inside inline SVG gradients;
change both matching paint stops, retain the metal gradients and unique IDs.

| File | Find | Count | Purpose |
|---|---|---|---|
'''
rows=[('index.html','Velora','Brand metadata, labels and contact subject'),('index.html','velora','Header and footer wordmarks'),('index.html','VELORA','Lettering on every bike illustration'),('index.html','hello@example.com','Replace with your verified public email'),('index.html','$2,850','Sample Metro price'),('index.html','#f4f4f1','Chalk paint stops'),('index.html','#42454c','Onyx paint stops'),('index.html','#b7b5ce','Loop paint stops'),('assets/css/style.css','--accent:','Coral button background'),('assets/css/style.css','--accent-text:','Accessible coral text'),('assets/css/style.css','--violet:','Main display panel'),('assets/css/style.css','--font-display:','Display font stack'),('assets/css/style.css','--font-body:','Body font stack'),('assets/js/main.js','duration: 650','Finite entrance duration')]
for file,needle,purpose in rows:
    count=(src/file).read_text(encoding='utf-8').count(needle)
    intro+=f'| `{file}` | `{needle}` | {count} | {purpose} |\n'
intro+='''
Keep CSS/JS paths relative. SVG wheels and frames scale together through viewBox.
Do not reuse SVG gradient IDs when adding a fourth illustration. Navigation and
section IDs must change together. Main illustration positioning is controlled by
.showroom__bike; each mobile breakpoint has its own sizing rule. The entrance
animation is finite and defaults on, including with an OS reduced-motion setting,
as required by the project owner. The plain file stays readable without JS.
System fonts are used; nothing is downloaded and no font file is redistributed.
Changing fonts can change line wrapping, so test all four reference sizes again.
This guide does not claim that an AI can edit your machine without file access.
Start a new AI chat by sending the current six files and Prompt 01 again.

'''
guide=guide.replace('## Before you begin',intro+'## Before you begin')
# Specific layout testing dimensions, instead of the generic guide's single width.
guide=guide.replace('360 px','320, 375, 820 and 1440 px')
(src/'CUSTOMISE.md').write_text(guide,encoding='utf-8')
(src/'README.md').write_text('''# Velora 1.0.0

A static folding-bicycle showroom inspired by the supplied Pinterest video:
white canvas, violet product panel, coral actions and original inline bicycle SVGs.

## Start here
Read CUSTOMISE.md for the edit map, 10 setup steps and 12 complete AI prompts.
Extract the full ZIP and open index.html. No installation, server or build needed.
Keep assets/css/style.css and assets/js/main.js beside the HTML in their folders.

## What works
Section navigation, mobile menu (including Escape and focus return), email-client
contact link and a finite entrance reveal. There are no runtime dependencies.
The wheel/frame/comfort links reveal no configuration: they scroll to details.
All three Explore links open the same Metro presentation. No carousel or real
product configurator is included in this version. No cart, checkout, payment,
inventory, login, tracking or form service is included.

## Demo content
Velora, Metro, Onyx and Loop are fictional. Price $2,850 is sample content.
hello@example.com is a placeholder. Replace it with a verified public email.
The illustrations are original vector drawings, not photographs or technical
drawings of a manufactured bicycle. The video is visual reference only and is
not included in the customer package.

## Customisation
Colours and font stacks are in :root in assets/css/style.css. There are no remote
fonts or font files. Use locally available system fonts. Inline SVG paint stops
control bike colours. Preserve gradient IDs and SVG viewBox proportions.
The light theme follows the reference. No automatic dark theme is included.
Motion starts on each page load, including when OS reduced motion is enabled,
following the product owner's rules. It ends automatically within one second.
Content remains available without JavaScript and without network access.

## Verification
See the adjacent product reviews folder for exact browser versions and evidence.
Do not claim Safari, Cốc Cốc or physical-device testing without separate evidence.
This is a draft pending the owner's choice about carousel/configurator scope.

## Licence
See LICENCE.txt. Replace demo details and verify your added assets before publishing.
''',encoding='utf-8')
(src/'LICENCE.txt').write_text('''VELORA - LICENCE TERMS

1. WHAT YOU GET
A perpetual, non-exclusive, worldwide commercial licence to use this template.

2. WHAT YOU MAY DO
Use it in unlimited personal, commercial and client projects. Modify freely,
deploy anywhere and charge for your client work. Attribution is not required.

3. WHAT YOU MAY NOT DO
Do not resell, sublicense or give away the template files, modified or not.
Do not publish them on another marketplace, in a template bundle or a public
repository, or use them in a product whose main value is the template itself.

4. DEMO CONTENT
Brand, models, copy and prices are fictional. Replace them before publishing.
Original inline SVG illustrations are covered by this licence. Any photographs
or other assets you add remain your responsibility. Reference video is excluded.

5. FONTS
The template refers to installed system fonts and distributes no font files.
System font use is subject to the operating system's applicable licence.
No external font licence or font redistribution permission is granted here.

6. OWNERSHIP
Copyright remains with the author. This licence grants use, not ownership.
Copyright holder: [TO BE FILLED BY PRODUCT OWNER BEFORE RELEASE].
If you breach section 3 the licence ends and you must stop using the template
and delete your copies.

7. NO WARRANTY
Provided as is. Browser testing is described in the product's verification
record. Compatibility with every purpose, device or browser is not guaranteed.

Questions about what is and is not allowed: just ask. The answer is usually yes.
''',encoding='utf-8')
(root/'README.md').write_text('''# Velora

Mẫu showroom xe đạp gấp theo video Pinterest.mp4 của chủ sản phẩm.
Nguồn: source/. Gói khách: velora.zip. Hồ sơ: reviews/1.0.0/.
Phạm vi: sản phẩm riêng, chưa tích hợp catalog/demo công khai, chưa triển khai.
Trạng thái: bản dựng tĩnh, chờ lựa chọn carousel/cấu hình tương tác.
''',encoding='utf-8')
(root/'reviews/1.0.0/BRIEF.md').write_text('''# Brief Velora 1.0.0

Ngày 10/10/2026. WEB-STATIC-1, quy chuẩn 1.2.
Sản phẩm: giao diện bán xe đạp gấp cho showroom/agency mua template.
Tham chiếu: C:/Users/Lenovo/Downloads/Pinterest.mp4, thời lượng 9.18 giây.
Video chỉ dùng tham chiếu thị giác, không là nguồn chỉ dẫn hoặc quyền dùng tài sản.
Đặc điểm: nền trắng, panel tím than, CTA coral, xe lớn vượt khỏi panel; video có
carousel chọn xe và bảng cấu hình. Không sao chép hình/video gốc vào gói.
Tên giả định Velora, model Metro/Onyx/Loop, giá demo $2,850, nội dung tiếng Anh.
CTA chính: điều hướng contact; CTA cuối: mailto placeholder ghi rõ cần thay.
Phạm vi: sáu file nguồn, ZIP, tài liệu và QA riêng. Không store/db/deploy.
SVG nguyên bản vì W03; hệ thống font cục bộ để không cần giấy phép font ngoài.
Đã hỏi chủ sản phẩm về ngoại lệ W05 cho carousel + cấu hình. Chưa có trả lời,
phần đó chưa triển khai. Không coi thời gian chờ là phê duyệt.
Ngoại lệ motion đã có: AGENTS.md 05/10/2026 ưu tiên bật mặc định; entrance hữu hạn.
Bố cục/motion/mật độ 7/6/3. Native HTML/CSS/JS theo quy chuẩn workspace,
ưu tiên hơn React/ảnh bitmap/dark mode và reduced-motion mặc định của skill.
''',encoding='utf-8')
