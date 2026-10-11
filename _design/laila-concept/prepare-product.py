from pathlib import Path
from bs4 import BeautifulSoup
import shutil
import re

root = Path('web/product/giao-dien-web/laila')
source = root / 'source'
for folder in ['assets/css', 'assets/js', 'assets/img']:
    (source / folder).mkdir(parents=True, exist_ok=True)
(root / 'reviews/1.0.0').mkdir(parents=True, exist_ok=True)
html = Path('_design/laila-concept/index.html').read_text(encoding='utf-8')
html = html.replace('href="style.css"', 'href="assets/css/style.css?v=1.0.0"').replace('src="main.js"', 'src="assets/js/main.js?v=1.0.0"').replace('src="portrait.webp"', 'src="assets/img/portrait.webp?v=1.0.0"')
html = html.replace('class="menu"', 'class="menu nav-toggle"').replace('class="skip"', 'class="skip skip-link"')
html = html.replace('</head>', '<meta property="og:title" content="Laila Studio | Creative developer"><meta property="og:description" content="A playful creative developer portfolio in pink and navy."><meta property="og:type" content="website"></head>')
soup = BeautifulSoup(html, 'html.parser')
flower = '<svg class="icon" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 4v92M4 50h92M17 17l66 66M17 83l66-66" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>'
phone = '<svg class="icon" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M23 8c-7 2-13 12-11 24 4 26 29 51 55 57 12 3 24-3 26-11 1-4-2-7-6-10l-17-11c-4-2-7-1-10 2l-7 8C42 61 34 52 29 41l8-7c3-3 4-6 2-10L29 10c-2-3-4-3-6-2Z" fill="currentColor" stroke="#ffc4da" stroke-width="2"/></svg>'
for node in list(soup.find_all(string=lambda s: s and '✳' in s)):
    if str(node).strip() == '✳':
        node.replace_with(BeautifulSoup(flower, 'html.parser').svg)
for node in list(soup.find_all(string=lambda s: s and '☎' in s)):
    node.replace_with(BeautifulSoup(phone, 'html.parser').svg)
soup.select_one('.hero__portrait img')['fetchpriority'] = 'high'
(source / 'index.html').write_text(soup.prettify(), encoding='utf-8')
css = Path('_design/laila-concept/style.css').read_text(encoding='utf-8')
css = css.replace('font-size:13px', 'font-size:14px').replace('.hero__copy>p:not(.eyebrow):not(.hero__role){font-size:14px}', '.hero__copy>p:not(.eyebrow):not(.hero__role){font-size:16px}')
css = css.replace('.eyebrow{font-size:12px}', '.eyebrow{font-size:14px}').replace('.about .eyebrow{font-size:12px', '.about .eyebrow{font-size:14px')
css += '\n.icon { width: 1em; height: 1em; display: inline-block; vertical-align: -.1em; }\nfooter :focus-visible { outline-color: #68253e; }\n'
# Expand the prototype CSS into editable declarations, preserving every value.
level = 0
parts = []
buffer = ''
for char in css:
    if char == '{':
        parts.append('  ' * level + buffer.strip() + ' {')
        buffer = ''
        level += 1
    elif char == ';':
        if buffer.strip(): parts.append('  ' * level + buffer.strip() + ';')
        buffer = ''
    elif char == '}':
        if buffer.strip(): parts.append('  ' * level + buffer.strip() + ';')
        buffer = ''
        level -= 1
        parts.append('  ' * level + '}\n')
    else:
        buffer += char
(source / 'assets/css/style.css').write_text('\n'.join(parts) + '\n', encoding='utf-8')
js = Path('_design/laila-concept/main.js').read_text(encoding='utf-8').replace('Laila concept.', 'Laila 1.0.0.').replace("const button = document.querySelector('.menu');", "const button = document.querySelector('.nav-toggle');")
# Restoring a page from bfcache must not leave an interrupted reveal faded.
js = js.replace('frames.forEach(frame => cancelAnimationFrame(frame));', "frames.forEach(frame => cancelAnimationFrame(frame));\n    document.querySelectorAll('[data-reveal]').forEach(element => {\n      element.style.removeProperty('opacity');\n      element.style.removeProperty('transform');\n    });")
(source / 'assets/js/main.js').write_text(js, encoding='utf-8')
shutil.copy2('_design/laila-concept/portrait.webp', source / 'assets/img/portrait.webp')

custom = Path('web/product/giao-dien-web/melt-muse/source/CUSTOMISE.md').read_text(encoding='utf-8')
custom = custom[custom.index('## Step 1'):]
custom = custom.replace('Melt Muse', 'Laila').replace('melt-muse', 'laila').replace('three image files', 'portrait image').replace('three assets/img photographs', 'assets/img/portrait.webp').replace('all three photographs', 'the portrait').replace('all three image', 'the portrait image')
custom = custom.replace('the separate MELT and MUSE hero words', 'the LAILA header/footer and Laila hero name').replace('portrait captions, studio\nnote, personal story, services', 'personal story, learning topics, résumé, project concepts and skills').replace('the soft-focus portrait, rear photo, front photo or brand logo', 'the hero portrait or brand logo').replace('hero note', 'hero text').replace('photo stack', 'section grid').replace('demo studio', 'demo persona').replace('fictional studio copy', 'fictional portfolio copy').replace('photographs', 'portrait image').replace('photograph', 'portrait').replace('photo crops', 'portrait crop').replace('note overlap', 'text overlap')
rows = []
needles = {
    'index.html': [('Laila', 'Title, sharing metadata and hero name'), ('LAILA', 'Header and footer name'), ('hello@example.com', 'Real public contact email'), ('assets/img/portrait.webp', 'Portrait path'), ('Bloom journal', 'First project concept'), ('Noon studio', 'Second project concept'), ('Petal press', 'Third project concept')],
    'assets/css/style.css': [('--accent:', 'Pink text token'), ('--accent-button:', 'Pink button token'), ('--font-body:', 'System font stack'), ('950px', 'Menu breakpoint')],
    'assets/js/main.js': [('950px', 'Matching menu breakpoint'), ('620', 'Finite reveal duration in milliseconds')]
}
for file, items in needles.items():
    text = (source / file).read_text(encoding='utf-8')
    for needle, purpose in items:
        rows.append(f'| `{file}` | `{needle}` | {text.count(needle)} | {purpose} |')
intro = '''# Customise Laila

Laila is a static creative developer portfolio with one original AI-generated portrait. There is no backend, form submission or PDF CV download. The résumé button opens the journey section. Contact opens an email app and never confirms delivery. Edit source files directly or with AI; this is not a no-code builder. Read LICENCE.txt for permitted finished-website use of the portrait.

## Edit map

Counts are exact literal occurrences in the stated file. Brand names use two cases. Replace both and edit all metadata and accessible text.

| File | Literal text | Count | Change |
|---|---|---|---|
''' + '\n'.join(rows) + '''

Other locations and traps:

- Content: sections `#about`, `#learning`, `#education`, `#projects`, `#skills`, `#contact` in index.html. Learning topics are examples, not certifications. Supply verified credential links and real résumé dates before making claims. Three project covers are typographic concept artwork, not screenshots of shipped products.
- Hero: `.hero__copy` and `.hero__portrait`. Keep the name short or remove `white-space: nowrap` from h1 and recheck narrow screens. Never place long text over the face.
- Image: `assets/img/portrait.webp`, recommended 800x1200 WebP with alpha. The image is cropped by object-fit; inspect the whole face and bun at four widths. Update `src`, `width`, `height`, `alt`, and version query together. Keep the image below 300 KB. Do not leave the file only on your own computer outside the folder.
- Palette: opening `:root` in assets/css/style.css. Accent text and button background are separate. Button text is dark; retain at least 4.5:1 contrast. Font uses Consolas, Courier New and operating-system fallbacks without downloads.
- Decorations: inline `.icon` SVG, `.fan` folding fan and `.blossom` branch in HTML/CSS. SVG is decorative with viewBox, aria-hidden and focusable=false. No emoji assets are needed.
- Native details: each learning topic and `.project` contains summary plus real expanded content. Keep a summary and don't remove accessible titles. This works without JS.
- Menu: `.nav-toggle`, `#navigation`, aria-controls and the 950px CSS/JS breakpoint must agree. No-JS navigation stays visible. Escape closes and returns focus.
- Reveal: `[data-reveal]` uses a finite 620ms requestAnimationFrame entrance. Motion starts enabled even when the OS requests reduced motion; it does not consult saved motion settings. There is no carousel, infinite loop or typewriter. CSS smooth scrolling respects the OS preference.
- Links: all navigation is internal. Email `hello@example.com` is a documented sample and must be replaced. No social destinations were invented.
- Publication: update the 1.0.0 query on the three CSS/JS/image references whenever replacing assets, to prevent stale cache. Keep all seven files, including the portrait, in the same relative structure.

'''
(source / 'CUSTOMISE.md').write_text(intro + custom, encoding='utf-8')

licence = Path('web/product/giao-dien-web/velora/source/LICENCE.txt').read_text(encoding='utf-8').replace('VELORA', 'LAILA')
licence = licence.replace('A perpetual, non-exclusive, worldwide commercial licence to use this template.', 'A perpetual, non-exclusive, worldwide commercial licence to use this template\nand its included original AI-generated WebP portrait in finished websites.')
licence = licence.replace('Brand, models, copy and prices are fictional. Replace them before publishing.\nOriginal inline SVG illustrations are covered by this licence. Any photographs\nor other assets you add remain your responsibility. Reference video is excluded.', 'The persona, résumé, learning topics and projects are illustrative. Replace\nthem with verified information before publishing a personal portfolio. The\nportrait represents a fictional person, not a client or endorsement. Included\nSVG and the AI-generated portrait may be used and modified on finished\npersonal, commercial and client websites under this licence. Do not redistribute\nthe portrait as a standalone stock asset. Rights for replacement assets remain\nyour responsibility. The Pinterest reference screenshot is not included.')
(source / 'LICENCE.txt').write_text(licence, encoding='utf-8')
(source / 'README.md').write_text('''# Laila 1.0.0

A playful static portfolio for creative developers and designers: blush pink exterior, navy panels, monospaced type, original portrait, folding fan and blossom details. This is plain HTML, CSS and JavaScript. No installation, build, framework, tracking, external fonts or network is required to view the template.

## In the package

Read CUSTOMISE.md first: exact edit map, ten setup steps and twelve complete AI prompts. Seven files: index.html, assets/css/style.css, assets/js/main.js, assets/img/portrait.webp, CUSTOMISE.md, README.md and LICENCE.txt. Extract the entire ZIP and double-click index.html beside assets/. It also works on a static HTTP host.

## Working features

Internal section links; mobile menu with Escape, focus return and breakpoint reset; native expandable learning and project details; finite 620ms scroll entrances; email enquiry. View résumé opens the sample journey section, not a downloadable CV. Email opens the installed mail application and does not submit a form or confirm delivery. No backend, social integration, checkout or certificate verification is included.

Persona, résumé, learning topics, artwork concepts and contact email are demo content. Project covers are original graphic studies, not delivered client website screenshots. Replace sample content before using the template as your own portfolio. The portrait is an original AI-generated fictional adult, licensed for finished websites; read LICENCE.txt. Copyright holder: Forge Zone.

## Editing

Brand, metadata, section content, links and portrait alt text are in index.html. Colour and font tokens start assets/css/style.css. Replace assets/img/portrait.webp with a permitted 800x1200 WebP image, updating declared dimensions and alt. Preserve transparency and inspect the crop. CSS/JS and image URLs carry ?v=1.0.0; change together when publishing updates.

System fonts only (Consolas, Courier New, Segoe UI and operating-system fallbacks); no font binaries are distributed or fetched. The operating system supplies the fonts under its own terms.

## Accessibility and motion

One h1, named navigation, skip link, visible keyboard focus, semantic details/summary, decorative SVG and descriptive portrait alt. Navigation and content stay usable without JS and the portrait. Entrances use finite requestAnimationFrame rather than depending on CSS/WAAPI, and start enabled even with an OS reduced-motion preference, per the product brief. Each entrance ends in 620ms; there is no perpetual animation. Smooth scrolling respects the OS preference.

## Verified environment

Windows, Chromium 153.0.8010.12 and Firefox 155.0; Edge 155.0.4283.45 and Cốc Cốc 152.0.7977.124. Tested at 1440x900, 820x1180, 375x812 and 320x740 via file and HTTP with responsive menu, native detail expansion, keyboard, no-JS, offline, zoom-equivalent 200% and finite motion checks. Headless browser tests do not equal physical phone or Safari verification. Safari and physical devices were not tested. Review evidence is retained by Forge Zone outside the customer ZIP.

## Publication

Upload index.html and the complete assets folder to a static host. Keep the downloaded ZIP and an unchanged backup. Do not publish licence/private delivery ZIP as public downloadable files. This package has the owner's approved exception to WEB-STATIC-1: six core files plus one local WebP, and a ZIP above 20KB. No backend or library exception is needed.
''', encoding='utf-8')
print('Prepared', source)
