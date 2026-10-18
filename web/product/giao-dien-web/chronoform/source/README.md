# Chronoform 1.0.1

An independent mechanical-watch showroom inspired by a cinematic watch website video. Original concept artwork and a dependency-free WebGL renderer give the watch a real case, crown, strap and back. This is a static template for editing, not a working watch shop.

Start with CUSTOMISE.md: exact edit locations, ten steps and twelve complete AI prompts. Extract all 28 files and open index.html beside assets/. No installation, build, account, API, CDN or font download is required.

## Package
Six core files: index.html, assets/css/style.css, assets/js/main.js, README.md, CUSTOMISE.md and LICENCE.txt. Also assets/js/watch3d.js and 21 original WebP images: five dial textures, one editorial triptych, eleven rendered watch thumbnails and four photographic hero cutouts. The store preview video is outside this ZIP.

## Working
Four featured models use original AI-generated photographic hero cutouts with directional transitions, direct wrap and keyboard arrows; finite movement inspection (switches to the native 3D concept model); drag-to-rotate, front/back and turn controls; eleven models in four families; local filters/search/reset; session-only saved watches; detail views and related models; local enquiry bag with strap size/removal/sample totals; information dialog and email enquiry; native menu; scroll reveals and a sticky craft scene. Browser back returns between views.

Motion defaults ON even under OS reduced motion or an old saved-off setting. Pause motion applies only to the current open page; reload enables motion again. Finite animation frames stop when settled. There is no idle render loop.

## Local files and fallback
Direct file opening displays the complete layout and local images. Browsers may block WebGL texture uploads under file:// or disable WebGL. In that case a rendered photograph substitutes for the canvas and product transitions still work; it is a 2D fallback, not a full 360-degree model. For textured 3D, serve the extracted folder with any static HTTP server or static host. The native renderer needs no third-party library. Without JavaScript, the static collection, editorial content and contact links remain visible; dynamic filters, rotation and the enquiry bag are unavailable.

## Demonstration content
Chronoform is a fictional independent brand. No Chronoswiss endorsement or trademark licence is supplied. Names, prices, edition figures, dimensions, materials, VAT and specifications are illustrative and must be replaced or removed. EUR/USD are separate sample prices, not live exchange rates. The back texture is concept artwork, not a physically accurate watch movement. The workshop portrait is fictional AI-created artwork.

No payment, order, inventory, login, warranty service, tracking, persistent favourites or backend is included. The enquiry dialog offers a mailto link; no submission is simulated. hello@chronoform.example is a demonstration address. The EN pill labels the template language; it is not a translation switch.

## Editing and verification
Keep HTML cards and the PRODUCTS array in main.js consistent. CSS tokens control colour and system fonts. Hero photographs are separate from geometry: hero-paraiba.webp, hero-jupiter.webp, hero-cowboy.webp and hero-opus-orange.webp. Dragging the hero or selecting View movement reveals the existing 3D concept; changing slides restores the photo. Detail inspection retains the original model. Update generated dial textures and corresponding rendered thumbnails together. Read CUSTOMISE before changing geometry or adding images. See the product QA report for exact browsers and fallback modes actually tested; no Safari or physical-device guarantee is implied.

## Licence
Read LICENCE.txt for use of the template and included images.
