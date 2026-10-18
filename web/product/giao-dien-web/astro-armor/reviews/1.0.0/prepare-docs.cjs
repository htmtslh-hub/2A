const fs = require('fs');
const path = require('path');
const base = 'web/product/giao-dien-web/astro-armor';
const source = `${base}/source`;
let guide = fs.readFileSync('web/product/giao-dien-web/docs/customer-guide.en.md', 'utf8');
guide = guide.replace('# Forge Zone customer guide', '# ASTRO Armor customisation guide');
guide = guide.replace('replace the information in square brackets.', 'let the AI ask for missing business information in plain language.');
guide = guide.replaceAll('template-folder/', 'astro-armor/');
guide = guide.replace('│   └── js/main.js', '│   ├── js/main.js\n│   └── img/armor-reference.jpg, armor-beige.webp, armor-red.webp');
guide = guide.replace('Your template is a static website', 'ASTRO Armor is an independent fashion interface concept. The jacket artwork is AI reconstructed from the supplied reference; brand references, $560 price, garment measurements, fabrication locations and technical specifications are demonstration content. The beige hero, four colour swatches and construction thumbnails are CSS crops of the unchanged supplied reference JPEG. Red uses an AI-reconstructed cutout; black and white use CSS filters of a beige cutout. These are concept previews, not separately photographed products. Attach assets/img/armor-beige.webp and armor-red.webp when asking AI to change artwork. Your template is a static website');
guide = guide.replaceAll('reduced motion support', 'the session-only Pause motion control');
guide = guide.replaceAll('reduced motion', 'the session-only Pause motion control');
// Prompts are usable without requiring customers to fill technical placeholders.
guide = guide.replace(/```text\n([\s\S]*?)```/g, (_, body) => {
  body = body.replace(/\[[^\]\n]+\]/g, 'information you must ask me for before editing');
  return `\`\`\`text\n${body}\`\`\``;
});
guide = guide.replaceAll('360 px', '320 px');
guide += '\n\n## ASTRO editing map\n\nCounts are literal and include metadata and attributes. Keep anchors, JS selectors, alt text and the bag price in sync.\n\n| File | Literal text or selector | Count | Edit |\n|---|---|---:|---|\n';
const edits = [
  ['index.html','ASTRO','Brand in visible copy, metadata and labels'],
  ['index.html','Winter Armor II','Product name and search result'],
  ['index.html','$560','Display price; also update numeric unit price in JS'],
  ['index.html','hello@astro.example','Demo email: replace with a real inbox'],
  ['index.html','armor-reference.jpg','Unchanged reference asset; CSS crops expose only the jacket, swatches and detail images'],
  ['index.html','data-size=','Four garment sizes'],
  ['index.html','data-colour=','Four visual colour previews'],
  ['assets/css/style.css','--accent:','Orange button/background colour'],
  ['assets/css/style.css','--accent-text:','Dark orange text/focus colour'],
  ['assets/css/style.css','--bg:','Warm paper background'],
  ['assets/css/style.css','--font-display:','System display font stack; no font file is supplied'],
  ['assets/css/style.css','.jacket--reference','CSS crop and contour of the supplied JPEG; keep crop coordinates in sync'],
  ['assets/js/main.js','560','Numeric bag unit price and bag row display'],
  ['assets/js/main.js','const bag =','Page-session bag; not storage, checkout or inventory'],
];
for (const [file, needle, description] of edits) {
  const count = fs.readFileSync(`${source}/${file}`, 'utf8').split(needle).length - 1;
  guide += `| \`${file}\` | \`${needle}\` | ${count} | ${description} |\n`;
}
guide += '\n### Product behaviour and assets\n\nOpen index.html directly; all paths are relative and all artwork is local. Replace the 960×941 transparent WebP with your own permitted cutout of comparable proportions. No remote font or runtime library is loaded; the installed Helvetica Neue/Helvetica/sans-serif stack may vary by system. The SVG header icons are inline.\n\nThe mobile menu switches at 950px. Size and colour selectors update accessible pressed states. Colour filters affect both shell and trim; replace with separate licensed images for production-accurate colourways. Favourite and bag reset on reload. The bag shows a subtotal and removal buttons, with no checkout or order submission. Search only filters the single concept item. The account dialog explains that no authentication exists. All dialogs have Escape, backdrop and Close controls. Verify the illustrative size table and remove demo claims before using this commercially.\n\nFinite RAF motion runs by default, including OS reduced-motion mode under the supplied design policy. Pause motion applies only to the open page. Scroll moves the jacket by at most 20px; reveal animations run once and do not hide no-JS content. Do not add perpetual animation loops.\n\nIf a change breaks the page, restore your last working folder and retry one narrow change with Prompt 11. In a new chat attach the current nine files and repeat Prompt 01; the new AI cannot see earlier files or instructions.\n';
fs.writeFileSync(`${source}/CUSTOMISE.md`, guide);
fs.writeFileSync(`${source}/README.md`, `# ASTRO Armor 1.0.0\n\nStatic fashion product template. Unzip the whole folder and open index.html. No install, build, remote fonts or API is needed.\n\n## What is included\nRead CUSTOMISE.md first: ten setup steps, twelve complete AI prompts and a counted editing map. Nine files: index.html; assets/css/style.css; assets/js/main.js; assets/img/armor-beige.webp; assets/img/armor-red.webp; assets/img/armor-reference.jpg; CUSTOMISE.md; README.md; LICENCE.txt.\n\nThree-column ivory product stage, beige/orange jacket, four size choices, four colour previews, native size/search/account dialogs, favourite and local demo bag with removal/subtotal, mobile menu and finite scroll/entry motion. All state resets on reload. No authentication, stock, order processing or payments. The contact email is a reserved example address that must be replaced. No form sends data.\n\n## Editing\nColours and system fonts are declared at the start of CSS. Text, metadata, native details and size table are in HTML. Unit price and interaction labels are also in JS. The unchanged supplied JPEG is displayed through local CSS crops for the beige hero and construction details. Two local transparent WebPs supply red and filtered black/white colour previews; alternate swatches are not separate product photography. Replace with permitted assets for a live business.\n\n## Accessibility and verification\nSemantic landmarks, skip link, labelled SVG controls, pressed states, focus outlines, native dialogs and keyboard-aware menu. Pause motion is session-only; default finite motion runs regardless of OS reduce. No-JS content and section links remain visible, but interactive selectors, dialogs and bag require JS. Browser verification status is documented in the project QA record; do not infer Safari or physical-device testing from a screenshot.\n\n## Demo content and licence\nIndependent interface study; ASTRO, the garment drawings, $560 price, size table and fabrication locations are reference/demo content, not verified manufacturer information. No third-party endorsement or trademark rights are granted. Read LICENCE.txt and replace brand details before publishing.\n`);
let licence = fs.readFileSync('web/product/giao-dien-web/volt-hoodie/source/LICENCE.txt','utf8');
licence = licence.replace('VOLT HOODIE','ASTRO ARMOR').replace('included self-created images','included artwork');
licence = licence.replace(/4\. DEMO CONTENT[\s\S]*?5\. FONTS/, '4. DEMO CONTENT\nThis independent fashion interface study includes AI-reconstructed jacket artwork based on the user-supplied visual reference, illustrative specifications, sizing tables, a $560 price and fabrication locations. It is not an operational retailer or manufacturer listing. Third-party names, artwork and marks remain with their respective owners; this licence grants no trademark rights or endorsement. Replace brand references, prices, specifications and the reserved example email before publishing for a live business. The supplied artwork is for this interface concept; establish any necessary third-party permissions or replace it with your own permitted product imagery before commercial use. Do not sell or distribute images separately. Assets you add are your responsibility.\n\n5. FONTS');
licence = licence.replace(/5\. FONTS[\s\S]*?6\. OWNERSHIP/, '5. FONTS\nNo font files or remote font stylesheets are bundled. The CSS uses installed Helvetica Neue, Helvetica and generic sans-serif fallbacks under the user’s own operating-system font licences. No font redistribution rights are granted or required by this package.\n\n6. OWNERSHIP');
fs.writeFileSync(`${source}/LICENCE.txt`,licence);
fs.writeFileSync(`${base}/README.md`,'# ASTRO Armor 1.0.0\n\nSource: source/. Visual reference: user-supplied ASTRO puffer product page. Nine-file static template with local WebP and page-session selectors/bag. W01/W03/W05/W06 exceptions approved on 17 October 2026. Source and visual QA in reviews/1.0.0/. Publication pending acceptance; no live URL claimed.\n');
console.log('Prepared nine-file candidate documentation; literal counts recomputed.');
