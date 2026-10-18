const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../source');
const productRoot = path.resolve(__dirname, '../..');

fs.writeFileSync(path.join(productRoot, 'README.md'), `# Backbest 800 1.0.0

Obsidian-and-crimson wireless headphone showcase template recreated from the supplied Plantronic Backbest 800 Series reference. Source in \`source/\`, final ZIP \`backbest-800.zip\` after acceptance. Nine files including three original generated headphone finish cutouts (\`headphone-black.webp\`, \`headphone-white.webp\`, \`headphone-red.webp\`); plain HTML/CSS/JS, no build/font network dependency/backend. Customer \`CUSTOMISE.md\` has ten steps, twelve prompts and counted edits.

QA, fixed reference/motion maps, asset provenance, visual comparisons, hashes and release evidence in \`reviews/1.0.0/\`. \`WEB-STATIC-1\` v1.2.1 with approved \`W01/W03/W05/W06\` exceptions for this image-led interactive brief. Local package only per Product Owner scope; enquiry bag and fit preferences are local to the page visit with no real retail sales, manufacturer affiliation or verified component/price/fit/shipping claim.
`);

fs.writeFileSync(path.join(root, 'README.md'), `# Backbest 800 1.0.0

An obsidian-and-crimson wireless headphone showroom inspired by the supplied Plantronic Backbest 800 Series reference. Read CUSTOMISE.md first: ten steps, twelve complete AI prompts and a counted edit map. Extract all nine files and open index.html beside assets/. No framework, build, external font, CDN, account or API.

## Included and working
Six core files plus three original generated WebP headphone photographs: headphone-black.webp, headphone-white.webp and headphone-red.webp. They depict one over-ear wireless studio headphone concept in three visual finishes (Stealth Black, Studio Alabaster White and Crimson Anodized Red). Previous/next buttons, colourway tabs, select dropdown, keyboard arrows and horizontal pointer swipes change finish with a finite directional transition. Six sample cushion-fit choices update the local summary. Four component hotspots open detail dialogs. Search filters the one model; no-result state works. Mobile menu closes on links, Escape and resize; dialogs restore focus. Add unique finish/fit pairs to a session-only enquiry bag, remove them, or prepare a purchase enquiry email in a mail application. No email is automatically sent. Sound preview plays a 4.2-second local colourway sequence, explicitly not audio/video stream footage. Replay and close work. Native specification accordions work without JavaScript. Engineering has a scroll-linked headphone image/rule plus finite reveals.

Motion defaults ON on every opening, including OS reduced motion and old saved-off values, per product policy. Pause motion applies to this visit only; reload enables motion. Finite requestAnimationFrame timelines work without CSS animations or Web Animations, cancel prior transitions and have no idle RAF loop. The preview sequence stops when closed or the document is hidden. NoJS retains the full hero, static finish images, specifications, navigation and email. Missing artwork leaves text/actions available. Relative paths support file:// and static hosting. System fonts only, no network font dependency.

## Demonstration scope
Backbest 800 is an independent interface study, not an operational Plantronics/Poly store or manufacturer listing. Brand/model/technology names and marks belong to their owners, with no endorsement or trademark rights supplied. Replace them for your own business. Generated imagery, Black/White/Red finishes, $199 ($239 compare-at), cushion-fit options and all component labels are illustrative, not verified factory colours, specifications, availability, fit advice or a live retail offer. No account, inventory, checkout, payments or backend. hello@backbest800.example is a demo email; no physical store is listed. The enquiry bag is in-memory only and resets after reload.

## Editing and compatibility
Keep all image alpha, exterior/interior arch transparency and complete silhouettes. The three images are separate generated variants, not CSS colour filters or a 3D model. CUSTOMISE.md names exact content/selector counts and explains changes. See the store QA for browsers actually tested; no universal browser or real-device guarantee. Read LICENCE.txt.
`);

let licence = fs.readFileSync('web/product/giao-dien-web/motora/source/LICENCE.txt', 'utf8')
  .replace('MOTORA', 'BACKBEST 800')
  .replace('automotive interface study', 'audio hardware showroom study')
  .replace('vehicle/cabin imagery', 'headphone imagery')
  .replace('dealer or manufacturer listing', 'retailer or manufacturer listing');
fs.writeFileSync(path.join(root, 'LICENCE.txt'), licence);

let guide = fs.readFileSync('web/product/giao-dien-web/docs/customer-guide.en.md', 'utf8')
  .replace('# Forge Zone customer guide', '# Backbest 800 customisation guide')
  .replace('and replace the information in square brackets', 'and let the AI ask for any missing information')
  .replace(/\[[A-Z][^\]\n]*\]/g, '(ask me for this information before editing)')
  .replaceAll('reduced motion support', 'the session-only Pause motion control')
  .replaceAll('reduced motion', 'the session-only Pause motion control')
  .replace('│   └── js/main.js', '│   ├── js/main.js\n│   └── img/headphone-black.webp, headphone-white.webp, headphone-red.webp');

guide += '\n\n## Backbest 800 editing map\n\nLiteral counts include accessible and hidden text. Keep selectors in HTML/CSS/JS synchronised.\n\n| File | Literal text or selector | Count | What to edit |\n|---|---|---:|---|\n';

for (const [file, literal, description] of [
  ['index.html', 'BackBest 800', 'Template metadata, product copy and footer disclosures'],
  ['index.html', 'BACKBEST 800 SERIES', 'Hero title, vertical watermark and engineering heading'],
  ['index.html', 'WIRELESS HEADPHONE', 'Hero uppercase category tagline'],
  ['index.html', '$199', 'Illustrative active price in hero, specifications and footer'],
  ['index.html', '$239', 'Illustrative compare-at price in hero and specifications'],
  ['index.html', 'hello@backbest800.example', 'Public email links and contact'],
  ['index.html', 'PURCHASE NOW', 'Hero CTA button and no-JS fallback link'],
  ['index.html', 'assets/img/headphone-black.webp', 'Default hero, engineering scene and preview sequence image'],
  ['index.html', 'id="size-select"', 'Six sample cushion-fit options'],
  ['assets/js/main.js', 'const finishes =', 'Three image paths, names and swatches; keep select order 0–2'],
  ['assets/js/main.js', 'const information =', 'Hotspot and edition/award component detail copy'],
  ['assets/js/main.js', 'hello@backbest800.example', 'Email recipient assembled from enquiry bag'],
  ['assets/js/main.js', '$199', 'Bag example prices'],
  ['assets/css/style.css', '--accent:', 'Crimson red accent colour'],
  ['assets/css/style.css', '--bg:', 'Page background'],
  ['assets/css/style.css', '--font-display:', 'System heading font stack'],
  ['assets/css/style.css', '.headphone-stage', 'Hero stage geometry across breakpoints']
]) {
  const count = fs.readFileSync(path.join(root, file), 'utf8').split(literal).length - 1;
  guide += `| \`${file}\` | \`${literal}\` | ${count} | ${description} |\n`;
}

guide += `\n### Headphone images and product data
Three separate generated photographs show the same wireless headphone in Stealth Black, Studio Alabaster White and Crimson Anodized Red. Keep the same 900×900 transparent canvas, full silhouette and three-quarter right-facing studio angle across all three. Preserve both exterior and interior arch alpha transparency and do not flatten onto white or black. Check the dark earcup contours on the obsidian background and all three at mobile widths. The engineering scene reuses the Black image in CSS, not a separate file. These are conceptual finishes, not verified factory options. Replace third-party marks/names for another business. No manufacturer affiliation is included.

One headphone model is available. Its search terms are the normalised string inside the model-search input handler. If adding real models, update search, finish data, price text and bag summary deliberately rather than claiming an inventory system. Prices in HTML, specification notes and renderBag must stay consistent. Cushion-fit options do not verify acoustic seal measurements or live stock. Bag state is only in memory and the mailto link opens an email app. Do not represent it as checkout.

### Motion, accessibility and fallbacks
Intro 900ms, finish 720ms, reveal 650ms and preview sequence 4200ms are finite requestAnimationFrame effects. Transform wrappers isolate transition from scroll and image rotation. Rapid changes cancel prior frames. Hotspots have 44px hit areas; selects use 44px native controls. Keep main-nav/menu ARIA and dialog focus/Escape behavior. Motion defaults ON including OS reduce and stale storage; Pause motion is session-only. Do not add an idle loop. Retest two-way wrap, rapid input, keyboard/swipe, preview close/replay, scroll progress/reverse/resize/mobile, all six fit options, 200% equivalent zoom, noJS, offline and blocked images.
`;

fs.writeFileSync(path.join(root, 'CUSTOMISE.md'), guide);
console.log('Backbest 800 docs: 9 files, 10 steps, 12 prompts, counted edit map.');
