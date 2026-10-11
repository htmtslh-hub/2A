from pathlib import Path
root=Path(__file__).resolve().parents[2]
src=root/'source'
steps=[
('Unzip and open','Extract the entire Velora ZIP. Open the folder until index.html is beside assets, then open index.html in a browser. CSS is assets/css/style.css; JS is assets/js/main.js. Read this guide and README.md. Result: the gallery appears without installing anything.'),
('Make a working copy','Keep the original ZIP unchanged. Copy the extracted folder to website-working-copy and edit only that copy. Before major edits, copy all six files into a dated backup outside it. Save UTF-8 with real extensions, never index.html.txt. Result: one original, one editable copy and a recovery copy.'),
('Prepare verified information','Collect your brand, audience, bike models, descriptions, specifications, prices, public contact email and desired action. Prepare only assets you may use. Decide the language and colours. Demo models and measurements are fictional; replace them before publication. Result: your information is ready, with unknown facts explicitly identified.'),
('Start a fresh AI conversation','Attach the latest six files or their ZIP. Tell AI the CSS/JS paths above. Use Prompt 01. A screenshot helps describe layout but cannot replace source files. In a new chat, send the current files and Prompt 01 again. AI without file access must return complete replacement files for you to save; refresh the browser afterward.'),
('Replace copy and destinations','Use Prompts 02 and 03 with verified information. Update static HTML and the models array in JS together. Replace the email in HTML and JS. Preview each model and its Specifications tab; all three Explore links must open their own bike. Result: metadata, labels, prices, specifications and enquiry messages agree.'),
('Change the visual system','Use Prompts 04 through 07 one change at a time. Colours/font stacks are CSS :root tokens; bike finishes are JS finishes and HTML SVG paint stops. Adding a model requires a slide, collection card, unique SVG IDs, model data and default setup. Test desktop/mobile after each edit. Result: the design remains consistent and configuration choices remain visible.'),
('Test the final folder','Use Prompt 08. Test 1440×900, 820×1180, 375×812 and 320×740, zoom 200%, menu, Tab/Shift+Tab, arrows, Escape, both carousel wrap directions and rapid clicks. Open each model, change every configuration group, read specifications, return and revisit. Try no JS and offline file opening. Pause must stop motion; reload starts on. Result: document what actually passed and what remains untested.'),
('Publish a clean website folder','Copy index.html and its assets folder into website-publish, with index.html directly at the root. Exclude backups, the purchase ZIP and private notes; retain licence notices when distribution requires them. Open this folder locally again. Use Prompt 09 to get current instructions for your chosen static host. Publishing requires your explicit request; it does not create checkout or an order service.'),
('Connect a domain if needed','First verify the temporary hosted URL. If you own a domain, use Prompt 10 with the host\'s exact DNS instructions. Save the current records and preserve email MX/TXT records. Do not invent IPs or change unrelated records. Result: verify root/www, redirects and HTTPS after propagation; this step is optional.'),
('Update and recover','Save a dated known-good backup. Use Prompt 11 for a bounded update or Prompt 12 for a fault. Test the working copy, rebuild website-publish, then update the same hosting project. Restore all related files from a good backup if a change fails; never mix incompatible old CSS/JS with new HTML. Result: the published source and backup describe the same version.')]
prompts=[
('Set up my Velora editing assistant','Read the six Velora files I attach: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Name any missing files and do not guess their contents. Summarise the current gallery, product details, configurations, working actions and fictional information. Ask for my brand, bikes, public contact, language and goal in small groups; allow undecided answers. Do not edit yet. Keep plain HTML/CSS/JS, relative paths, offline opening and six-file structure. Preserve keyboard access, responsive layout and default-on finite motion. Never invent claims or add tracking, backend, checkout or dependencies. Edit only the working copy, or return complete replacement files and exact paths. Do not publish.'),
('Personalise all content','Use the latest six Velora files. Ask me for missing verified brand, bike models, descriptions, specifications, prices, audience, public contact details, tone and language. Ask which facts are undecided before editing dependent content. Replace metadata, navigation, headings, accessible labels, collection cards, the JS models array and demo specifications consistently. Remove unsupported claims instead of inventing them. Preserve approved layout, configurations, source paths and keyboard behaviour. Return complete changed files with destinations, a list of remaining demo items, and checks actually performed. Update this guide\'s literal edit counts. Do not publish.'),
('Connect the actions','Read the current HTML and JS. List each menu, product selector, Explore link, enquiry action and current destination. Ask me for the verified public email and other real destinations, or whether to remove an action. Update both mailto locations and retain the selected model/configuration in the enquiry body. Keep internal links and model-specific Explore behaviours. Do not simulate sending, payments or a successful order. Return complete changed files and a click-test checklist for every model; identify destinations not tested. Keep source paths and do not publish.'),
('Apply colours and fonts','Read the current HTML, CSS and JS. Ask for desired accent, panel, background and text colours and heading/body fonts if I have not supplied them. Reuse :root tokens and finishes data; preserve layout and existing interactions. Check normal, hover and focus contrast and labels on the violet panel. Keep sensible font fallbacks; do not add paid fonts without my licence confirmation or a new dependency. Return complete changed files, exact paths, measured contrast when tools allow, and a four-size visual checklist. Update the edit map and state untested font or licence details.'),
('Replace a visual asset','Read the current files and the asset I provide. Ask where it belongs and confirm its intended use if unclear. Inspect the bike wrappers before editing. Tell me the exact relative filename/folder, dimensions and aspect ratio. Preserve the same selected visual node through gallery/detail animation and keep configuration state meaningful; do not pretend a flat photo can change wheel geometry. Explain any feature loss before making that dependent change. Preserve alt text, reserved space and responsive behaviour. Return complete changed files, asset placement instructions and desktop/mobile checks. Do not hotlink assets or add dependencies.'),
('Translate every visitor string','Read the latest six files and ask for the target language if missing. Translate metadata, navigation, product descriptions, model state labels, specification labels, tabs, configuration choices, enquiry text, accessible names and footer. Keep model names, verified contact details, URLs, IDs, selectors and paths unless I request replacements. Translate naturally and preserve the carousel and tab interactions. Check long labels at all four reference widths and update html lang. Return complete changed files and list wording needing confirmation; distinguish source inspection from browser tests and update the guide.'),
('Add or remove a model or section','Ask what I want added or removed and request missing verified content. Read the latest HTML/CSS/JS first. Identify the slide/card/data/setup/tab or navigation dependencies, then make the smallest consistent change. Keep SVG IDs unique and modulo direction correct; remove broken anchors and empty wrappers. Preserve offline operation, readable static fallback, focus, touch controls, scene continuity and finite animation. Do not add libraries or backend features. Return complete changed files, updated edit counts and a checklist including direct wrap, rapid input and every model\'s detail data.'),
('Audit the final website','Read the latest six files and inspect them before testing. Check actual behaviour for previous/next, direct wrap both ways, rapid clicks, bike-to-detail continuity, model names/prices/specifications, all configuration choices, per-bike state, enquiry body, menu, focus, tabs, Escape and swipe. Check 1440×900, 820×1180, 375×812, 320×740, zoom 200%, no JS, offline, default-on motion with OS reduce and old off states, and pause/resume. Check contrast, IDs, headings, console/network and documentation counts. Fix confirmed small faults within the approved scope. Return complete files and a PASS/FAIL/NOT TESTED table with evidence; never claim engines or devices you did not run. Do not publish.'),
('Guide me through publishing','Read the current template folder and ask which hosting provider I have chosen, whether I have an account, and what screen or workflow I see. Use current official provider documentation and link it; do not guess button labels or DNS values. Guide me in small steps to publish the clean website-publish folder containing index.html and assets. Do not upload backups, private notes or the purchase ZIP. I handle login, secrets and payment choices. Publish only after my explicit request. Confirm the returned URL and test CSS, JS, bike configuration, mobile layout, mailto and HTTPS. State any publishing checks you could not perform.'),
('Connect my domain','Ask for my host, DNS provider, domain, existing website/email use and the exact records instructed by the host. Read current official documents and my provided records; do not invent IPs or targets. Explain the smallest necessary record changes and verification steps using the actual values. Preserve unrelated records, especially email MX/TXT. I perform login and DNS changes; do not ask for credentials or OTPs. Verify root/www, redirects, HTTPS and email after propagation, reporting unavailable checks. Do not change a live domain merely because I requested an explanation.'),
('Update one part safely','Read the latest published-source six files and ask which part I want changed if unclear. Name the exact file and dependencies before editing. Preserve every other approved model, setup, price, specification, label, link, layout, responsive rule and keyboard behaviour. Keep native HTML/CSS/JS and relative paths. Return complete changed files with destinations and a precise difference summary. Update this guide and literal counts when needed. Explain how to test the change and rebuild website-publish for the same hosting project. Do not publish, reset my content to demo data or alter domain settings.'),
('Find and fix a fault','Read the current six files. Ask what I expected, what happened, which action/browser/device causes it, the last edit, and whether I open file or HTTP if missing. Use code and actual runtime evidence to identify the cause; request one specific missing file, screenshot or console message when needed. Prefer the smallest fix and preserve design, model data, configurations and finite animation. Check relative paths, duplicate IDs, hidden/inert states, stale assets and cancelled animation frames. Return complete changed files, exact paths, diagnosis and a reproducible test. State what remains unverified and how to restore the known-good backup. Do not publish.')]
# Each prompt remains self-contained; avoid repeating the whole technical manual
# inside every prompt while keeping inputs, missing-data questions and outputs.
compact=[
'''Read my current six Velora files: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Report missing files; do not guess or edit yet. Summarise working interactions and fictional data. Ask for my brand, bikes, contact, language and goal in small groups. Preserve plain HTML/CSS/JS, relative paths, keyboard access, offline operation and finite default-on motion. Never invent facts or add dependencies, tracking or checkout. Edit only my working copy, or return complete files with exact destinations and real verification. Do not publish.''',
'''Read my latest Velora files. Ask for missing verified brand, bike descriptions, prices, specifications, public contact and language before changing dependent content. Update metadata, visible copy, accessible labels, collection cards and the JS models array consistently. Remove unsupported claims rather than inventing them. Keep layout and interaction behaviour. Return complete changed files with paths, remaining demo items and actual checks. Update documentation and literal edit counts. Do not publish.''',
'''Read the latest HTML/JS and list every action and destination. Ask for verified public email and real URLs, or whether to remove an action. Update both email locations and preserve the selected bike/configuration in its enquiry body. Keep internal anchors and model-specific Explore links. Never simulate sending mail, payment or order success. Return complete changed files with paths and a click checklist for all models. State untested destinations and do not publish.''',
'''Read current HTML/CSS/JS. Ask for missing brand colours and desired fonts. Reuse :root and finishes data; preserve layout and interaction. Check text, controls, hover and focus contrast, including the violet panel. Keep fallback fonts; request licence confirmation before using paid fonts. Return complete changed files, paths, measured contrast where possible and desktop/mobile checks. Update the edit map. Do not add dependencies or publish.''',
'''Read current files and my supplied image; ask which placement I intend and confirm permission if unclear. Inspect the existing wrapper, then specify relative filename, folder, dimensions and aspect ratio. Keep the same selected visual through gallery/detail, responsive sizing, reserved space and alt text. Explain configuration features that a flat photo cannot retain before changing them. Return complete changed files, placement instructions and visual checks. No hotlinks or dependencies.''',
'''Read my latest files and ask for the target language if missing. Translate all visitor strings in HTML and JS, including metadata, accessible names, tabs, choices, specifications, summaries and enquiry body. Keep verified names, contacts, URLs, IDs and paths unless I request replacements. Preserve carousel behaviour and update html lang. Check text at 320, 375, 820 and 1440 pixels. Return complete changed files and wording needing confirmation; state actual tests and update the guide.''',
'''Read current files and ask which model/section I want added or removed, with missing verified content. Update slide/card/model/setup data and matching links together. Preserve unique SVG IDs, modulo direction, same-bike scene continuity, keyboard/touch controls and static fallback. Remove empty blocks and broken links. Return complete changed files, paths and updated counts. Test both wraps, rapid clicks and every model's detail data. No libraries, backend or publication.''',
'''Audit the current six files. Check carousel directions, direct wrap, rapid input, scene continuity, matching model/price/specs, all configuration tabs, per-bike state and enquiry text. Check menu, focus, tabs, Escape, swipe, contrast, IDs and console/network. Test 1440×900, 820×1180, 375×812, 320×740, zoom 200%, no JS, offline, default-on motion with OS reduce/old off settings, and pause/resume. Fix confirmed small faults within scope. Return complete files and PASS/FAIL/NOT TESTED evidence; name actual browsers/devices. Do not publish.''',
'''Read my website folder. Ask which host, account and upload workflow/screen I use. Use current official documentation and link it; do not guess labels. Guide small steps for website-publish containing index.html and assets. Exclude backups, private notes and the purchase ZIP. I handle credentials and payments. Publish only after my explicit request. Verify the returned URL, CSS/JS, configuration, mobile layout, enquiry and HTTPS; report checks you could not run.''',
'''Ask for host, DNS provider, domain, existing website/email use and the host's exact record instructions. Read current official documents and my records; invent no IPs or targets. Explain necessary changes and how to verify them. Preserve unrelated records, especially email MX/TXT. I handle login and DNS changes; request no secrets. Verify root/www, redirects, HTTPS and email after propagation, reporting unavailable checks. Do not change a live domain without my explicit request.''',
'''Read my latest six published-source files. Ask which bounded change I want if unclear. Identify its files/dependencies and preserve other approved content, setup, layout, interactions and paths. Return complete changed files with destinations, exact differences, updated guide/counts and a local verification checklist. Explain rebuilding website-publish for the same host project. Never restore demo data over my content, publish or alter DNS without a request.''',
'''Read my current files. Ask for expected/actual behaviour, action, browser/device, last edit and file/HTTP context if missing. Diagnose from code/runtime evidence; request one specific missing file, screenshot or console message when needed. Check paths, IDs, hidden/inert state, cached assets and cancelled rAF. Prefer the smallest repair preserving design/data/interactions. Return complete changed files, exact paths, cause, reproducible verification and untested items. Explain restoring a known-good backup. Do not publish.'''
]
prompts=[(title,compact[i]) for i,(title,_) in enumerate(prompts)]
short_steps=[
 'Extract the whole ZIP. Open index.html beside assets in your browser; read README and this guide. Keep CSS at assets/css/style.css and JS at assets/js/main.js. Result: the gallery works without installation.',
 'Keep the original ZIP unchanged. Copy the extracted folder to website-working-copy and edit only it. Make dated full-folder backups outside it. Save UTF-8 with real extensions, never .html.txt. Result: a recoverable working copy.',
 'Collect verified brand, audience, models, descriptions, specifications, prices, email, language and assets you may use. Identify unknown facts; all demo data must be replaced. Result: usable business information without invented claims.',
 'Attach the current six files or ZIP and use Prompt 01. Screenshots explain appearance but do not replace files. Start new chats by resending files and Prompt 01. Without file access, save complete returned files to their exact paths and refresh. Result: AI works from your current copy.',
 'Use Prompts 02 and 03. Update HTML and the JS models array together; replace email in both. Open every model and Specifications, and test each Explore link. Result: metadata, prices, details and enquiry agree.',
 'Use Prompts 04–07 one change at a time. CSS :root has colours/fonts; JS finishes and SVG stops set bike paint. Adding models requires slide/card/data/setup and unique SVG IDs. Result: consistent visuals and working configurations.',
 'Use Prompt 08. Test four reference sizes, menu, keyboard, wrap both ways, rapid clicks, every model/configuration, zoom 200%, no JS and offline opening. Pause stops motion; reload starts on. Result: record actual passes and untested cases.',
 'Copy index.html and assets into website-publish, with HTML at its root; exclude ZIP, backups and private notes. Preserve required licence notices. Open locally, then use Prompt 09 for current host instructions. Result: a clean folder; publish only on your explicit request.',
 'Verify the temporary hosted URL first. If you own a domain, use Prompt 10 with exact host records. Back up DNS and preserve email records. Result: verify root/www, redirects and HTTPS after propagation; this step is optional.',
 'Back up the known-good folder. Use Prompt 11 for a bounded update or Prompt 12 for a fault. Test and update the same host project. Restore related files together, not mixed versions. Result: recoverable source and published files.'
]
steps=[(title,short_steps[i]) for i,(title,_) in enumerate(steps)]
text='''# Velora 1.1.0 customisation guide

Velora is a fictional bicycle showroom with a working browser-local carousel,
product details and visual configuration. It has no cart, checkout, inventory,
login, order service or tracking. Enquiry opens an email client; it sends nothing
automatically. All prices/specifications are illustrative and must be replaced.
Source has six files and no build step or external runtime dependency.

## Edit map

Counts are literal in the final file named below, not across the whole folder.
Update static HTML and JS data together. Preserve unique SVG gradient IDs.

| File | Find | Count | Purpose |
|---|---|---|---|
'''
rows=[('index.html','Velora','Metadata and initial enquiry'),('index.html','velora','Header/footer'),('index.html','VELORA','SVG bike wordmarks'),('index.html','hello@example.com','Static and initial email destinations'),('assets/js/main.js','hello@example.com','Configured enquiry destination'),('assets/js/main.js','const models =','Model names, sample prices and specifications'),('assets/js/main.js','const finishes =','Finish names and SVG paint colours'),('assets/js/main.js','const labels =','Configuration names in summaries and email'),('assets/js/main.js','const duration = 850','Product transition duration in milliseconds'),('assets/js/main.js','progress(now, began, 950)','Gallery/detail transition duration'),('assets/css/style.css','--accent:','Button colour'),('assets/css/style.css','--accent-text:','Accent text'),('assets/css/style.css','--violet:','Display panel'),('assets/css/style.css','--font-display:','Heading system-font stack'),('assets/css/style.css','--font-body:','Body system-font stack')]
for file,needle,purpose in rows:
    text+=f'| `{file}` | `{needle}` | {(src/file).read_text(encoding="utf-8").count(needle)} | {purpose} |\n'
text+='''
The models array follows slide/card order: Metro, Onyx, Loop. Each setup is
independent and stays in memory while this page is open; reload resets defaults.
Price belongs to the model; configuration adds no surcharge. Static card colours
show defaults, while the hero reflects custom choices. A SVG is an illustration,
not a manufacturer\'s engineering drawing. Replacing geometry with photos may
require redesigning the configurator. No font files are redistributed.

Carousel and scene use separate transform layers. Do not animate the same
wrapper from two controllers. Motion is default on, including OS reduced motion
and old saved off preferences; Pause stops immediately for the current page only.
Finite requestAnimationFrame transitions end when complete. No infinite loop.
Keep aria-selected, aria-controls, tabindex, hidden and inert state consistent
when changing tabs. Active SVG identity is retained when opening details.

'''
prompt_map={3:[0],4:[1,2],5:[3,4,5,6],6:[7],7:[8],8:[9],9:[10,11]}
for i,(name,instruction) in enumerate(steps):
    text+=f'## Step {i+1} - {name}\n\n{instruction}\n\n'
    for k in prompt_map.get(i,[]):
        title,prompt=prompts[k]
        text+=f'**Prompt {k+1:02} - {title}**\n\n```text\n{prompt}\n```\n\n'
text+='''## Final checklist

- Keep the original ZIP and a known-good backup outside the publish folder.
- Replace every demo name, specification, price and example.com email.
- Check both wrap directions, every model detail and configuration group.
- Verify active image, text, counter, selected tab and enquiry body agree.
- Test keyboard focus, Escape, menu, no JS/offline and all four viewport sizes.
- Read the licence and validate rights to assets or fonts you add.
- Verify published assets and HTTPS only after explicitly requesting publication.

If CSS disappears, check assets/css/style.css beside index.html. If switching
fails, check assets/js/main.js and console errors. If changes do not appear,
save the correct working copy and reload. Restore the complete backup before
trying unrelated fixes. A file:/// path works only on your own computer; share a
hosted URL when publication has been requested and completed.
'''
(src/'CUSTOMISE.md').write_text(text,encoding='utf-8')
(src/'README.md').write_text('''# Velora 1.1.0

A folding-bike showroom with violet cards, coral actions and original inline SVG.

## Start
Read CUSTOMISE.md for the edit map, 10 steps and 12 complete AI prompts.
Extract six files and open index.html. No build, dependencies or network needed.
Keep assets/css/style.css and assets/js/main.js at their relative paths.

## Working interactions
Previous/next and direct wraps, arrow keys, swipe and clickable bike previews.
View bike moves the same SVG into details; Back/Escape returns. Explore opens
its own model. Overview/Specifications show selected-model data. Wheels, Frame,
Saddle and Handlebar radio choices alter the SVG. Per-bike setup lasts this visit;
reload resets it. Price is model-specific with no option surcharge. Enquiry
opens an email client containing the current configuration; it sends nothing.

No cart, checkout, backend, order service or tracking. No-JS shows all models
and contact links, with interactive controls unavailable. System fonts work offline.

## Demo data and customisation
Names, prices and specifications are fictional; replace them and hello@example.com.
SVG is illustrative, not an engineering drawing. Reference video is excluded.
JS models/finishes/labels and HTML cards must agree. CSS :root contains colours
and font stacks; preserve SVG IDs/viewBox. No font files are distributed.

Motion defaults on despite OS reduce/old off settings, per owner instructions.
Pause stops it for this visit; reload starts on. Finite rAF works without CSS
transitions/WAAPI. Light theme follows the reference; no automatic dark theme.

## Verification and licence
See QA for exact browser scope; emulated touch is not a physical-device test.
See LICENCE.txt; the owner must fill the copyright holder before release.
''',encoding='utf-8')
(root/'README.md').write_text('''# Velora 1.1.0

Showroom xe đạp có carousel hai chiều, chuyển cảnh gallery/detail, thông số đúng
model, cấu hình wheel/frame/saddle/handlebar và email enquiry theo lựa chọn.
Nguồn: source/. ZIP: velora.zip. Hồ sơ mới: reviews/1.1.0/.
Ngoại lệ W05 đã được xác nhận qua yêu cầu bổ sung ngày 10/10/2026.
Sáu file, không thư viện/backend; chưa sửa catalog hoặc triển khai.
''',encoding='utf-8')
(root/'reviews/1.1.0/BRIEF.md').write_text('''# Velora 1.1.0

Ngày 10/10/2026. WEB-STATIC-1 quy chuẩn 1.2 + ngoại lệ W05.
Chủ sản phẩm yêu cầu bổ sung chuyển sản phẩm, animation và kiểm tra thông tin
khi xem sản phẩm như video. Đây là ủy quyền tương tác cần thiết, ưu tiên hơn W05.
Phạm vi: Velora source/index.html, assets/css/style.css, assets/js/main.js,
README/CUSTOMISE, ZIP và reviews riêng. Không đổi LICENCE, cửa hàng, DB, deploy.
Giữ sáu file, ZIP <20480 byte, không JS library, offline/file://, SVG nội tuyến.
Luồng: carousel gallery → selected bike details → overview/specifications →
configure Wheels/Frame/Saddle/Handlebar → quay lại hoặc enquiry đúng cấu hình.
Giữ cùng SVG qua chuyển cảnh. Next cũ thoát trái, mới vào phải; Previous đảo chiều.
Wrap cuối→đầu trực tiếp, không đưa model thứ ba qua giữa; cancel rAF khi bấm nhanh.
Phím, swipe, pause, resize, no-JS fallback đầy đủ. Motion mặc định bật theo AGENTS.
Tên/giá/thông số đều demo, không là sản phẩm thật hoặc xác nhận của nhà sản xuất.
Không checkout/cart, không giả gửi mail. Skill-morge được dùng làm choreography;
rAF hữu hạn là đường chính nên không phụ thuộc CSS/WAAPI.
''',encoding='utf-8')
print('CUSTOMISE bytes', (src/'CUSTOMISE.md').stat().st_size)
