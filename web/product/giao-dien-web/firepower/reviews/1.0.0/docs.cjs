const fs = require('node:fs');
const path = require('node:path');
const source = path.resolve(__dirname, '../../source');
fs.writeFileSync(path.resolve(source, '../README.md'), '# Firepower 1.0.0\n\nReference-inspired charcoal/cyan gaming mouse landing page. Source: source/. Customer documents in English. WEB-STATIC-1 v1.2.1 with owner-approved local images, view-switching JS and ZIP size exceptions W01/W03/W05/W06. Publication on the existing Forge Zone store is in scope. See reviews/1.0.0 for reference mapping, asset provenance, acceptance, QA and release evidence.\n');
fs.writeFileSync(path.join(source, 'README.md'), `# Firepower 1.0.0

Read CUSTOMISE.md first: ten steps, twelve complete AI prompts and a counted edit map. Extract the complete folder and double-click index.html. Keep assets/ alongside it. Seven files: HTML, CSS, JS, one local WebP asset sheet and three documents. No framework, installation, build, API, font download or CDN.

## Working interactions
Five-view hero and component gallery with previous/next controls, state indicators, keyboard arrows and horizontal swipe. Finite directional transitions cancel earlier input. Mobile menu closes on a link, Escape and desktop resize. Native specification disclosure works without JS. Scroll-triggered finite reveals and a session-only Pause motion button. Reload enables motion, including under OS reduced-motion settings. No saved motion state. No idle animation loop.

PLAY ADVANCED leads to product details. BUY leads to an explicitly labelled email enquiry section; ENQUIRE BY EMAIL opens the visitor's email application. No order is placed and no email is automatically sent. The static page includes no account, inventory, payment, checkout, tracking or backend. Without JavaScript the content, navigation, email and specifications remain accessible; gallery shows static views.

## Content and images
An independent reference-inspired interface study, with no Logitech affiliation or endorsement. G604, Logitech, LIGHTSPEED, HERO and their marks remain with their owners. Replace third-party names and marks before publishing for a different business. Technical descriptions are illustrative reference content, not certified specifications. hello@firepower.example is a demo contact, not a real seller. Images are original AI-generated concept renders, not official photographs, a CAD model or a real 3D viewer. One 3×2 sheet contains six angles; CSS chooses cells. Preserve the grid and transparency when replacing it.

## Editing and compatibility
Change tokens at the top of assets/css/style.css, copy in index.html and view data in assets/js/main.js. All paths are relative and support file:// or static hosting. System font stacks only. Missing images preserve all text and links. See the included QA at the store for exact browser versions tested; Safari and physical mobile devices are not claimed as tested. Read LICENCE.txt for the seven-part commercial policy. No trademark rights are granted.
`);
const licence = fs.readFileSync('web/product/giao-dien-web/backbest-800/source/LICENCE.txt', 'utf8')
  .replace('BACKBEST 800', 'FIREPOWER')
  .replace('audio hardware showroom study', 'gaming mouse interface study')
  .replace('headphone imagery', 'mouse imagery');
fs.writeFileSync(path.join(source, 'LICENCE.txt'), licence);
let guide = fs.readFileSync('web/product/giao-dien-web/docs/customer-guide.en.md', 'utf8')
  .replace('# Forge Zone customer guide', '# Firepower customisation guide')
  .replace('and replace the information in square brackets', 'and let the AI ask you for any missing information')
  .replace(/\[[A-Z][^\]\n]*\]/g, '(ask me for this information before editing)')
  .replaceAll('reduced motion support', 'the session-only Pause motion control')
  .replaceAll('reduced motion', 'the session-only Pause motion control')
  .replace('│   └── js/main.js', '│   ├── js/main.js\n│   └── img/mouse-views.webp');
guide = guide.replace('Your template is a static website', 'Firepower is a static gaming mouse showcase. Its six product views are generated concept artwork; the page is not an official Logitech store. Replace third-party marks, demo specifications and email before publishing. Your template is a static website');
guide += '\n\n## Firepower editing map\n\nCounts are literal occurrences including accessible labels and metadata. Keep IDs and selectors synchronised.\n\n| File | Literal text or selector | Count | Edit |\n|---|---|---:|---|\n';
for (const [file, literal, purpose] of [
  ['index.html', 'Firepower', 'Metadata and concept footer brand'],
  ['index.html', 'logitech', 'Visible reference wordmark'],
  ['index.html', 'Logitech', 'Accessible brand and affiliation disclosure'],
  ['index.html', 'G604', 'Illustrative model name'],
  ['index.html', 'HERO 16K', 'Illustrative sensor copy'],
  ['index.html', 'LIGHTSPEED', 'Reference wireless technology copy'],
  ['index.html', 'hello@firepower.example', 'Replace the demo email recipient'],
  ['index.html', 'PLAY ADVANCED', 'Hero CTA label, preserve product target'],
  ['index.html', 'data-view=', 'Five gallery buttons, keep view order'],
  ['index.html', 'target="_blank"', 'Four external brand-channel links; replace for your business'],
  ['assets/css/style.css', '--accent:', 'Cyan controls and indicators'],
  ['assets/css/style.css', '--accent-text:', 'Accessible accent text'],
  ['assets/css/style.css', '--font-display:', 'Heading system-font stack'],
  ['assets/css/style.css', '../img/mouse-views.webp', 'Product sheet path relative to CSS'],
  ['assets/js/main.js', 'const views =', 'Five view labels and CSS suffixes'],
  ['assets/js/main.js', '520', 'View transition duration in milliseconds']
]) {
  const count = fs.readFileSync(path.join(source,file), 'utf8').split(literal).length - 1;
  guide += `| \`${file}\` | \`${literal}\` | ${count} | ${purpose} |\n`;
}
guide += `
### Product sheet and views
assets/img/mouse-views.webp is a transparent 3-column × 2-row product sheet. Row 1: top, angled, side controls. Row 2: circular control assembly, thin side profile, scroll-wheel assembly. Each cell is 512×512 with safe padding. CSS background-size 300% 200%, square aspect ratio and background-position select complete views. Preserve these boundaries and full silhouettes. The large angled showcase reuses row 1 centre. Five-view carousels use the remaining cells; this is image switching, not an interactive 3D model. Never replace the sheet with a single photo without also updating CSS. Replace reference marks and all specifications using verified product content. Do not imply factory accuracy for generated artwork.

### Motion and fallback policy
Finite requestAnimationFrame transitions 520–950ms change opacity and transform. Prior animation is cancelled on repeated input; no idle RAF loop. Scroll reveal uses IntersectionObserver and unobserves after completion. Motion defaults ON even under OS reduce; the visitor can pause for the current visit. Reload resets this choice. Without JS, controls that require it are hidden, navigation and content stay visible. Native details and email remain usable. Keep menu ARIA, 44px targets, visible focus, no-JS navigation and relative paths when editing. Retest both wraps, rapid input, arrow keys, swipe, all five states, mobile menu/Escape/resize, offline, missing images and 200% zoom.
`;
fs.writeFileSync(path.join(source,'CUSTOMISE.md'), guide);
console.log('Firepower docs generated: 10 steps, 12 prompts, literal edit map.');
