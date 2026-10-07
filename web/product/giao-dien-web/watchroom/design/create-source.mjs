import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve('web/product/giao-dien-web/watchroom/source');
mkdirSync(root + '/assets/js', { recursive: true });
function watch(id, strap, dial, metal, hero = false) {
  const images = ['quantum-adg', 'onyx-gmt', 'solaris-38'];
  const names = ['Rose-gold chronograph with midnight blue dial and navy strap', 'Silver steel chronograph with onyx dial and black strap', 'Champagne-gold chronograph with forest green dial and strap'];
  const image = (i) => '<img class="watch' + (hero && i === 0 ? ' is-active' : '') + '" src="assets/img/' + images[i] + '.webp" width="1024" height="1536" alt="' + names[i] + '"' + (hero ? ' data-watch="' + i + '" aria-hidden="' + (i !== 0) + '" loading="eager" fetchpriority="' + (i === 0 ? 'high' : 'low') + '"' : ' loading="lazy"') + ' decoding="async">';
  return hero ? '<div class="watch-stack">' + images.map((_, i) => image(i)).join('\n') + '</div>' : image(Number(id.replace('product-', '')));
}
const products = [
  { name: 'QUANTUM ADG', price: 899, finish: 'Rose gold / Midnight blue', strap: '#112c48', dial: '#163452', metal: '#e7b89b' },
  { name: 'ONYX GMT', price: 749, finish: 'Brushed steel / Onyx black', strap: '#191d24', dial: '#1c242d', metal: '#bfc6cd' },
  { name: 'SOLARIS 38', price: 829, finish: 'Champagne gold / Forest green', strap: '#123b33', dial: '#163d34', metal: '#dfc295' },
];
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#040f1e">
<title>Watchroom | Time, in a different light</title>
<meta name="description" content="An intimate watch showroom. Discover three sculptural chronographs, explore their details and enquire about your favourite finish.">
<meta property="og:title" content="Watchroom | Time, in a different light">
<meta property="og:description" content="Explore a collection of sculptural chronographs in an immersive watch showroom.">
<meta property="og:type" content="website">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="showroom" data-tone="0">
<header class="site-header">
<a class="brand" href="#main" aria-label="Watchroom home">WATCHROOM</a>
<nav class="site-nav" aria-label="Watch collections"><a href="#collection" data-filter="all" class="is-selected">ALL</a><a href="#collection" data-filter="women">WOMEN</a><a href="#collection" data-filter="men">MEN</a></nav>
<a class="search-link" href="#search" aria-label="Search the collection"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m15 15 5 5" stroke="currentColor" stroke-width="1.5"/></svg><span>SEARCH</span></a>
</header>
<main id="main" tabindex="-1">
<section class="hero" aria-labelledby="hero-title">
<div class="hero__copy"><p class="hero__eyebrow">THE ART OF TIME</p><p class="hero__model-code">WR — 001 / CHRONOGRAPH</p><h1 id="hero-title">QUANTUM ADG</h1><p class="hero__description">A sculptural chronograph. Midnight blue meets the warmth of rose gold.</p><p class="hero__price">899 €</p><a class="button" href="#craft">DISCOVER THE DETAILS ↗</a></div>
<div class="stage" aria-label="Interactive watch details">
<div class="stage__light" aria-hidden="true"></div><div class="stage__rings" aria-hidden="true"><i class="depth-ring depth-ring--outer"></i><i class="depth-ring depth-ring--second"></i><i class="depth-ring depth-ring--third"></i><i class="depth-ring depth-ring--inner"></i></div><div class="stage__shadow" aria-hidden="true"></div>
<div class="watch-wrap">${watch('hero', undefined, undefined, undefined, true)}</div>
<button class="hotspot hotspot--one js-control" type="button" aria-label="Explore the strap" aria-controls="strap-detail" aria-expanded="false"></button>
<p class="callout callout--one" id="strap-detail"><strong>A softer kind of strength.</strong>A sculpted strap, shaped around your wrist.</p>
<button class="hotspot hotspot--two js-control" type="button" aria-label="Explore the dial" aria-controls="dial-detail" aria-expanded="false"></button>
<p class="callout callout--two" id="dial-detail"><strong>Every second, considered.</strong>Three subdials. One clear point of view.</p>
<button class="hotspot hotspot--three js-control" type="button" aria-label="Explore the case" aria-controls="case-detail" aria-expanded="false"></button>
<p class="callout callout--three" id="case-detail"><strong>Light, caught in metal.</strong>Polished edges. A warm rose-gold finish.</p>
</div>
<button class="next-preview js-control" type="button" data-next-preview aria-label="Show next watch"><span>NEXT EXPRESSION</span><img src="assets/img/onyx-gmt.webp" width="1024" height="1536" alt="" decoding="async"><strong>ONYX GMT</strong><span class="next-preview__arrow" aria-hidden="true">↗</span></button>
<p class="hero__finish">ROSE GOLD / MIDNIGHT BLUE</p>
<div class="hero__index" aria-hidden="true"><small>THE COLLECTION</small><span>01</span></div>
<div class="hero__navigation js-control"><button class="icon-button" type="button" data-step="-1" aria-label="Previous watch">‹</button><button class="icon-button" type="button" data-step="1" aria-label="Next watch">›</button><div class="hero__progress" aria-hidden="true"><span></span></div><span class="hero__count">01 / 03</span></div>
<button class="motion-toggle js-control" type="button" aria-pressed="false">PAUSE MOTION Ⅱ</button>
<p class="sr-only" id="slide-status" role="status" aria-live="polite"></p>
</section>
<aside class="purchase-rail" aria-label="Watch actions"><button class="icon-button bag-icon js-control" type="button" data-open-saved aria-label="Open saved watches"><svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true" focusable="false"><path d="M4 10H22L20 26H6Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button><button type="button" class="rail-link js-control" data-save aria-pressed="false">DESIRED</button><a class="button current-enquiry" href="mailto:hello@watchroom.example?subject=Enquiry%20about%20Quantum%20ADG">ENQUIRE ↗</a></aside>
</main>
</div>
<section class="details-section" id="craft" aria-labelledby="craft-title"><h2 class="reveal" id="craft-title">Time, in a different light.</h2><p class="details-section__intro reveal">A watch is more than its face. Explore the interplay of polished metal, layered dials and a strap with its own character.</p><dl class="specs reveal"><div><dt>The face</dt><dd>Layered chronograph dial</dd></div><div><dt>The finish</dt><dd>Three distinct expressions</dd></div><div><dt>The fit</dt><dd>A sculpted everyday strap</dd></div></dl></section>
<section class="collection" id="collection" aria-labelledby="collection-title"><h2 class="reveal" id="collection-title">Find your own time.</h2><p class="collection__intro reveal">Three expressions of the same obsession with detail.</p><div class="collection__tools"><label class="search js-control" id="search">Find a watch<input type="search" placeholder="Name or finish" autocomplete="off"></label><p class="collection__results" aria-live="polite">3 watches</p></div><div class="collection-grid">
${products.map((p, i) => `<article class="product reveal" data-category="${i === 2 ? 'women' : 'men'}" data-name="${p.name.toLowerCase()} ${p.finish.toLowerCase()}"><div class="product__art">${watch('product-' + i, p.strap, p.dial, p.metal)}</div><h3>${p.name}</h3><p>${p.finish}<br>${p.price} €</p><a class="product__link" href="mailto:hello@watchroom.example?subject=${encodeURIComponent('Enquiry about ' + p.name)}">Enquire about this watch ↗</a></article>`).join('\n')}
</div><p class="empty-state" hidden>No watches match. Try a different name or choose All.</p></section>
<section class="contact" id="contact" aria-labelledby="contact-title"><div><h2 id="contact-title" class="reveal">A closer look?</h2><p>Ask about a finish, a fit or your favourite model. Your email app opens an enquiry for you to review.</p><a class="button" href="mailto:hello@watchroom.example">CONTACT THE SHOWROOM</a></div><div><details><summary>Can I buy a watch here?</summary><p>This is a static showroom template. Enquiry links open your email app. There is no online checkout or payment processing.</p></details><details><summary>What does Desired do?</summary><p>It saves a watch to your shortlist in this browser. The bag icon opens your shortlist. Your choices are stored only on this device.</p></details><details><summary>Are these real products?</summary><p>Watchroom, its watches, finishes and prices are fictional demonstration content. Replace them with verified product information before publishing.</p></details></div></section>
<footer class="site-footer"><a class="brand" href="#main">WATCHROOM</a><p>A fictional watch showroom. All prices are illustrative.</p><a href="#main">BACK TO TOP ↑</a></footer>
<dialog id="saved" aria-labelledby="saved-title"><div class="dialog__header"><h2 id="saved-title">Your desired watches.</h2><button class="icon-button" type="button" data-close-saved aria-label="Close saved watches">×</button></div><p class="saved-note">Saved on this device. No orders or payments are submitted.</p><ul class="saved-items"></ul><p class="saved-empty">Your shortlist is empty. Choose Desired to save the watch on display.</p></dialog>
<script src="assets/js/main.js"></script>
</body>
</html>`;
writeFileSync(root + '/index.html', html);
const guide = `# Ten steps from ZIP to website

## Step 1 - Unzip and open
Extract the entire ZIP and open index.html in a browser. Keep assets next to it. The showroom must appear, including the illustrated watches.
## Step 2 - Make a working copy
Keep the original ZIP and copy the extracted folder to website-working-copy. Save UTF-8 files without changing their names. Back up before each major edit; refresh the browser after saving.
## Step 3 - Prepare verified information
Collect your brand, audience, products, verified prices, finishes, public contact email, intended action and permitted assets. Do not present the fictional watches as verified hardware.
## Step 4 - Start with AI
Attach the working ZIP, or all six core files plus the three WebP images. Identify CSS as assets/css/style.css and JS as assets/js/main.js. In a new chat, attach the current files again and use Prompt 01. A screenshot does not replace source files.
## Step 5 - Replace content and contacts
Use Prompts 02 and 03. Accept complete replacement files, save them to the stated paths, then refresh. If AI has folder access, restrict edits to the working copy. Check names in both initial HTML and JS model data.
## Step 6 - Adjust visuals and sections
Use Prompts 04-07, one change at a time. Keep matching image paths and aspect ratios, aspect ratios, responsive layout and the pause control. Expect the correct watch and copy to remain paired in both carousel directions.
## Step 7 - Test before publishing
Use Prompt 08. Test 320, 375, 820 and 1440 px, keyboard focus, search, category filters, shortlist, empty results, swipe, carousel wrap and pause. Disable JS and disconnect the network to confirm content and email links remain available.
## Step 8 - Publish the complete folder
Use Prompt 09 for a static host. Upload index.html and assets together with index.html at the public root. Confirm the public URL matches the local copy and loads over HTTPS.
## Step 9 - Connect an optional domain
Use Prompt 10 only after the temporary hosting URL works. Use the host's actual DNS values and preserve mail records. Verify root, www, HTTPS and redirects.
## Step 10 - Update and recover
Keep a known-good source backup for each publication. Use Prompt 11 for a narrow edit or Prompt 12 for a problem. Restore the last backup if needed, retest locally and then upload the corrected files.

## Twelve copy-ready AI prompts
For every editing prompt, return complete changed files with exact destination paths, a change summary and a manual test checklist. Ask for missing information rather than inventing it. Do not publish unless separately requested.

**Prompt 01 - Start my editing assistant**
\`\`\`text
I bought the Watchroom static template. Read the six core files and three WebP images I attach: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Identify any missing file and do not guess its contents. Summarise sections, working actions and fictional content before editing. Ask for my brand, audience, products, contacts, language and website goal in small groups. Keep plain HTML/CSS/JS, relative paths, file:// operation, image paths, responsive behaviour, visible focus and the session-only pause control. Preserve motion enabled by default unless I explicitly change that requirement. Do not introduce dependencies, tracking, backend, fake orders or payment processing. Work only in my working copy; if you cannot edit it, return complete replacement files with exact paths. Never omit code. Report what changed and what you actually tested after each edit. Do not publish or change domain settings.
\`\`\`
**Prompt 02 - Personalise content**
\`\`\`text
Read the latest Watchroom files I attach. Ask me for verified brand, products, prices, finishes, audience, language and benefit. Replace fictional content throughout metadata, header, hero, all three cards, JS products data, enquiries, saved-watch messages and footer. Keep initial HTML and carousel data consistent. Remove unsupported claims rather than inventing them. Preserve layout and all working interactions. Return complete changed files with their paths and a content-check checklist.
\`\`\`
**Prompt 03 - Replace contact actions**
\`\`\`text
Read the latest attached HTML and JS. Ask for my public email and any verified external contact URLs. Replace every enquiry link including links generated by JS and saved-watch links. Use mailto, tel or HTTPS appropriately. Preserve existing section anchors. Do not simulate ordering or submission. Return complete changed files and a checklist to click every contact action.
\`\`\`
**Prompt 04 - Apply colours and fonts**
\`\`\`text
Read the attached Watchroom HTML, CSS and JS. Ask for my page palette, three watch palettes and heading/body font preferences. Update existing root tokens, image assets and any matching JS product data consistently. Check contrast on navy and peach, focus, hover and mobile. Use system fallbacks; ask before adding a paid font. Return complete changed files and list any contrast pair still needing review.
\`\`\`
**Prompt 05 - Replace artwork**
\`\`\`text
Read the current attached source and the image I provide with permission to use. Ask where it belongs. Inspect the image container and tell me an exact relative file name, format, dimensions and folder. Replace the correct artwork while preserving aspect ratio, layout stability, meaningful alt text and responsive sizing. Do not crop important details without explaining it. Preserve the other watches and motion. Return complete changed files and asset placement instructions.
\`\`\`
**Prompt 06 - Translate**
\`\`\`text
Read all current attached files and ask for my target language. Translate metadata, navigation, copy, labels, aria labels, JS product strings, status messages, dialog, search empty state and footer naturally. Preserve brand/product names, contact URLs, selectors, IDs and behaviour unless I request otherwise. Check narrow-screen overflow. Return complete changed files and any ambiguous phrase for my review.
\`\`\`
**Prompt 07 - Add or remove a section**
\`\`\`text
Read the current Watchroom files. Ask which section or product I want added or removed and collect verified content. Identify the complete HTML block and dependent CSS/JS before editing. Make the smallest safe change; leave no empty wrappers, broken anchors, duplicated image paths or incorrect model indexes. Keep category filters, shortlist and carousel correct. Return complete changed files and desktop/mobile tests.
\`\`\`
**Prompt 08 - Audit before publication**
\`\`\`text
Audit the latest files I attach without editing first. Check missing assets, relative paths, fictional content, metadata, heading order, image alt text, focus, keyboard, contrast, overflow, filters, empty search, saved items, both carousel wrap directions, rapid input, pause, offline, no JS, email links and console errors. Group findings as Blocker, Should fix and Optional with exact selectors/files. After I approve findings, fix the required items and return complete changed files and tests. Do not publish.
\`\`\`
**Prompt 09 - Guide publishing**
\`\`\`text
Help me publish the current attached static Watchroom files. Ask which host I use, what its dashboard shows and whether I upload manually, use Git or a CLI. Give one small step at a time using verified screen labels. Explain uploading the complete folder with index.html at the root and assets beside it. Do not ask for passwords or private keys. Do not alter domains yet. Finish by checking the public URL, CSS, JS, images, links, mobile and HTTPS.
\`\`\`
**Prompt 10 - Connect my domain**
\`\`\`text
Help connect my domain to my already-working static website. Ask for my host, DNS provider and the host's exact record instructions: type, name, value and www requirement. Ask me to hide private identifiers. Compare existing records and explain one change at a time. Never invent DNS values; warn before replacing a record and preserve MX and mail TXT records. Verify root, www, HTTPS and redirects.
\`\`\`
**Prompt 11 - Make a narrow update**
\`\`\`text
Read my latest attached published-source files. Ask exactly what I want changed. Identify the smallest file/block before editing and preserve every other approved part, including palette, copy, contacts, image paths, layout, carousel, filters and shortlist. Return complete changed files, exact differences and a local verification checklist. Do not publish or alter DNS.
\`\`\`
**Prompt 12 - Diagnose a problem**
\`\`\`text
Read the latest attached Watchroom files. Ask what I expected, what happened, where and when it happens, last change and exact console error if present. Identify the likely cause using source evidence and make the smallest fix while preserving the design and other interactions. If evidence is insufficient, ask for one specific screenshot, error or file. Return complete changed files and a test confirming the fix. Do not add dependencies or publish.
\`\`\`

## Final checklist and recovery
Replace the fictional brand, prices, product data and .example email. Verify metadata, all contacts, local storage fallback, both carousel wraps, 320px layout and visible focus. Keep the original ZIP, current source and a known-good backup. If styling is missing, check assets/css/style.css; if motion fails, check assets/js/main.js and console. Save the correct file and refresh. Restore your last backup if a change breaks the page.
`;
const map = [['WATCHROOM', 'index.html'], ['Watchroom', 'index.html'], ['hello@watchroom.example', 'index.html'], ['QUANTUM ADG', 'index.html'], ['--accent:', 'assets/css/style.css'], ['--bg:', 'assets/css/style.css']];
const counts = map.map(([s, f]) => `| \`${s}\` | ${readFileSync(root + '/' + f, 'utf8').split(s).length - 1} | \`${f}\` |`).join('\n');
writeFileSync(root + '/CUSTOMISE.md', `# Customise Watchroom\n\n## Edit map\n\n| Find exact text | Literal count | File |\n|---|---:|---|\n${counts}\n\nChange product names, prices and descriptions in both index.html and the products array in assets/js/main.js. The hero contains three photographs in .watch-stack, with data-watch indexes 0, 1 and 2. Only .is-active is visible. The same files appear in the three collection cards. Replace quantum-adg.webp, onyx-gmt.webp or solaris-38.webp in assets/img/ with a matching portrait image to change that model. Preserve a 2:3 aspect ratio, transparent background and a consistent upright camera view. Each supplied image is 1024 by 1536 pixels. Update image alt text when replacing it. The finite requestAnimationFrame carousel is 1250 ms with simultaneous outgoing/incoming photographs; pointer tilt and the introductory motion stop after five seconds. Motion starts enabled each visit, including reduced-motion environments, per the owner's request. The pause control affects the current session only. The stage lighting changes with the showroom data-tone attribute (blue, silver-purple, gold). The scroll-driven watch-stack gently scales and tilts using a finite tween. Four depth-ring elements add concentric depth planes with 16–28s CSS motion; edit their --ring-size, border and duration in style.css. The central halo uses center-breathe (7s) and center-drift (12s) in style.css; adjust their opacity and radial colour stops to tune brightness. Three local images are included; no framework, remote image host, downloaded font or network service is required. If images are unavailable, product names, prices and enquiry links remain readable. Replace the fictional email before publishing. All enquiries open an email client, and Desired is a device-only shortlist, not an order.\n\nFor every prompt below, preserve Watchroom's scoped, plain HTML/CSS/JS implementation and its working filters, shortlist, two-way carousel and session-only pause. Do not add payment processing.\n\n${guide.replace('# Forge Zone customer guide', '# Watchroom customer guide').replaceAll('reduced motion support', 'visible pause control and owner-approved default motion').replaceAll('reduced motion', 'the visible pause control')}`);
writeFileSync(root + '/README.md', `# Watchroom 1.2.1\n\nAn immersive, static watch showroom for independent watch brands and studios.\n\n## Open\nExtract the ZIP and open index.html. It works through file:// and static HTTP without a build or dependencies.\n\n## Included\nRead CUSTOMISE.md for the edit map, 10 steps and 12 complete prompts. The six core files are index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Three original AI-generated transparent WebP photographs are included in assets/img/. Nine files are delivered in total. No remote image service is needed. Only system fonts are used; Segoe UI/Helvetica Neue display and Segoe UI body may vary by platform.\n\n## Working interactions\nThree-model directional carousel, mouse parallax, interactive detail points, category filters, local text search, device shortlist, native dialog, real mailto enquiry links, reveal and a session-only motion pause. Motion starts enabled each visit, including reduced-motion systems, by the product owner's explicit requirement. Introductory product movement stops after five seconds. The brighter central halo breathes and drifts continuously using CSS animations; Pause motion stops both layers and the four concentric depth rings. If CSS animation is unavailable, a finite 4.8-second light pulse runs on open, model changes and resume. No backend, checkout, automatic order submission, inventory or tracking. Storage may be unavailable in private or local-file contexts; the shortlist then works in memory for the session.\n\n## Customise\nUse CSS root tokens for page colours and fonts. Replace the matching WebP files in assets/img/ to change watch imagery. Three eager-loaded hero images share one frame; the carousel crossfades and tilts two preloaded images together, then settles the selected image without fetching. Update both the initial HTML and products array when changing model content. All prices, specifications and the Watchroom brand are fictional. Email addresses use the reserved .example domain and must be replaced.\n\n## Testing and release\nSee the external reviews/1.2.1/QA.md for exact tested engines and remaining checks. A rendered browser screenshot does not certify all browsers. No third-party font files or network fonts are supplied.\n\n## Licence\nSee LICENCE.txt. Preserve its commercial terms. Its reference to original SVG artwork describes the earlier version. The image source and commercial licensing review are recorded in reviews/1.2.1/QA.md; the commercial terms have not been revised by this upgrade.\n`);


