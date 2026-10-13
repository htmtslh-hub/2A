const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../../source');
fs.writeFileSync(path.join(root,'README.md'),`# Chronoform 1.0.0

An independent mechanical-watch showroom inspired by a cinematic watch website video. Original concept artwork and a dependency-free WebGL renderer give the watch a real case, crown, strap and back. This is a static template for editing, not a working watch shop.

Start with CUSTOMISE.md: exact edit locations, ten steps and twelve complete AI prompts. Extract all 24 files and open index.html beside assets/. No installation, build, account, API, CDN or font download is required.

## Package
Six core files: index.html, assets/css/style.css, assets/js/main.js, README.md, CUSTOMISE.md and LICENCE.txt. Also assets/js/watch3d.js and 17 original WebP images: five dial textures, one editorial triptych and eleven rendered watch thumbnails. The store preview video is outside this ZIP.

## Working
Four featured models with directional transitions, direct wrap and keyboard arrows; finite movement inspection; drag-to-rotate, front/back and turn controls; eleven models in four families; local filters/search/reset; session-only saved watches; detail views and related models; local enquiry bag with strap size/removal/sample totals; information dialog and email enquiry; native menu; scroll reveals and a sticky craft scene. Browser back returns between views.

Motion defaults ON even under OS reduced motion or an old saved-off setting. Pause motion applies only to the current open page; reload enables motion again. Finite animation frames stop when settled. There is no idle render loop.

## Local files and fallback
Direct file opening displays the complete layout and local images. Browsers may block WebGL texture uploads under file:// or disable WebGL. In that case a rendered photograph substitutes for the canvas and product transitions still work; it is a 2D fallback, not a full 360-degree model. For textured 3D, serve the extracted folder with any static HTTP server or static host. The native renderer needs no third-party library. Without JavaScript, the static collection, editorial content and contact links remain visible; dynamic filters, rotation and the enquiry bag are unavailable.

## Demonstration content
Chronoform is a fictional independent brand. No Chronoswiss endorsement or trademark licence is supplied. Names, prices, edition figures, dimensions, materials, VAT and specifications are illustrative and must be replaced or removed. EUR/USD are separate sample prices, not live exchange rates. The back texture is concept artwork, not a physically accurate watch movement. The workshop portrait is fictional AI-created artwork.

No payment, order, inventory, login, warranty service, tracking, persistent favourites or backend is included. The enquiry dialog offers a mailto link; no submission is simulated. hello@chronoform.example is a demonstration address. The EN pill labels the template language; it is not a translation switch.

## Editing and verification
Keep HTML cards and the PRODUCTS array in main.js consistent. CSS tokens control colour and system fonts. Update generated dial textures and corresponding rendered thumbnails together. Read CUSTOMISE before changing geometry or adding images. See the product QA report for exact browsers and fallback modes actually tested; no Safari or physical-device guarantee is implied.

## Licence
Read LICENCE.txt for use of the template and included images.
`);
let licence=fs.readFileSync(path.resolve(root,'../../orbit-academy/source/LICENCE.txt'),'utf8').replace('ORBIT ACADEMY','CHRONOFORM').replace('This independent educational concept includes an illustrative brand and imaginative artwork; linked science explanations are introductory, not a certified curriculum.','This independent watch-showroom concept includes a fictional brand, original artwork and illustrative product names, prices, taxes, edition figures and specifications; it is not an operational retailer.');
fs.writeFileSync(path.join(root,'LICENCE.txt'),licence);
let guide=fs.readFileSync('web/product/giao-dien-web/docs/customer-guide.en.md','utf8');
guide=guide.replace('# Forge Zone customer guide','# Chronoform customisation guide').replace(/\[[A-Z][^\]\n]*\]/g,'(ask me for this information before editing)').replaceAll('reduced motion support','the session-only Pause motion control').replaceAll('reduced motion','the session-only Pause motion control');
guide=guide.replaceAll('assets/js/main.js, CUSTOMISE.md','assets/js/main.js, assets/js/watch3d.js, the 17 WebP images, CUSTOMISE.md');
guide=guide.replace('│   └── js/main.js','│   ├── js/main.js and js/watch3d.js\n│   └── img/ (17 WebP images)');
guide+='\n\n## Chronoform-specific editing map\n\nCounts below are literal matches in the shipped file, including metadata and accessibility text. Replace related HTML and JS together.\n\n| File | Literal text or selector | Count | What to edit |\n|---|---|---:|---|\n';
const entries=[['index.html','Chronoform','Brand metadata and dialog'],['index.html','CHRONOFORM','Header and footer brand'],['index.html','hello@chronoform.example','Public email'],['index.html','Concept edition','Illustrative edition labels'],['index.html','CF-','Sample model codes'],['assets/js/main.js','const PRODUCTS =','All 11 product records: id, code, name, family, face, case, strap, size, price, usd, tone'],['assets/js/main.js','const FEATURED =','Four featured product IDs'],['assets/js/main.js','const headings =','Four matching hero line breaks'],['assets/js/main.js','1.19','Illustrative VAT arithmetic; replace tax labels in HTML too'],['assets/js/main.js','hello@chronoform.example','Enquiry email'],['assets/css/style.css','--accent:','Button accents by scene'],['assets/css/style.css','--accent-text:','Readable text accents'],['assets/css/style.css','--font-display:','System heading font'],['assets/js/watch3d.js','turn(duration','Finite rotation duration'],['index.html','assets/img/editorial.webp','Three equal-width editorial crops, including movement button']];
for(const [file,needle,description]of entries){const s=fs.readFileSync(path.join(root,file),'utf8');guide+=`| \`${file}\` | \`${needle}\` | ${s.split(needle).length-1} | ${description} |\n`}
guide+=`\n### Images and geometry
The five 1254×1254 textures are paraiba.webp, jupiter.webp, skeleton.webp, opus.webp and ice.webp. Keep the circular dial centred; the renderer maps it to the watch face. The 2172×724 editorial.webp contains three separate equal-width panels; CSS editorial-crop classes select one third. The eleven render-*.webp images are transparent snapshots of the corresponding native model. Keep these in sync with dial, case and strap changes; otherwise gallery and canvas will show different products. Replace thumbnails with your own transparent product images if preferred.

watch3d.js contains mesh construction, shader lighting, texture loading and pointer drag. The back uses the concept Jupiter texture. Altering geometry needs JavaScript/WebGL knowledge; ask AI to read that file rather than treating the model as a single replaceable photograph. Fallback photographs support file opening and disabled WebGL, but do not provide full 3D inspection. All assets use relative paths.

### Linked data and motion
The PRODUCTS array, FEATURED IDs, headings array, HTML card data-product/data-open/data-save attributes and render-* file names must agree. Adding a model requires a card and thumbnail; each family group must retain its heading. There is one shared watch-stage moved between hero/detail, not two independent renderers. Keep the loader and carousel cancellation, direct wrap, keyboard and finite animation lifecycle. Pause motion is session-only; the newer product brief requires ON at each opening regardless of OS preferences. Do not add an infinite idle requestAnimationFrame loop.

### Honest enquiry flow
The bag starts empty. Load video-style sample inserts two Opus models to demonstrate the recorded layout. Currency amounts and 19% tax are illustrative. Saved watches and strap choices last only until reload. Request a consultation opens an information dialog and mailto action, not payment. Connect a real commerce system separately before advertising checkout or inventory. Replace demo addresses and unsupported specifications before publication.

### Visual checks after edits
Inspect home, every filtered collection, detail/front/back, empty and populated bag at 1440, 820, 375 and 320 pixels. Try arrows, wrap, rapid clicks, drag, menu/Escape, dialog/Escape, Pause motion and reload. Test direct file opening as well as HTTP hosting, WebGL-disabled fallback, no JavaScript and offline content. Readability must remain at least 4.5:1 for small text. Avoid adding many blur layers; rendering and screenshot-based textures cost more than a basic static page. Preserve a known-good backup and restore the last change if these checks fail.
`;
fs.writeFileSync(path.join(root,'CUSTOMISE.md'),guide);
console.log('Buyer documents written');
