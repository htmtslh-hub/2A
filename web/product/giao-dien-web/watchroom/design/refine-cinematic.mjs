import { readFileSync, writeFileSync } from 'node:fs';
const base = 'web/product/giao-dien-web/watchroom/';
const path = base + 'source/assets/css/style.css';
const old = readFileSync(path, 'utf8');
const global = old.slice(0, old.indexOf('.showroom {'))
  .replace('--bg: #040f1e', '--bg: #060a0c')
  .replace('--surface: #0c192a', '--surface: #101619')
  .replace('--ink: #f5d8c5', '--ink: #f2f2ed')
  .replace('--ink-soft: #bfb9ba', '--ink-soft: #b6c0c4')
  .replace('--accent: #edbc9f', '--accent: #91d1e2')
  .replace('--accent-text: #f5d8c5', '--accent-text: #bde5ef')
  .replace("--font-display: 'Impact', 'Arial Narrow', sans-serif", "--font-display: 'Segoe UI', 'Helvetica Neue', sans-serif");
const lower = old.slice(old.indexOf('.details-section {'), old.indexOf('@media (max-width: 1100px)'))
  .replace('font: clamp(40px, 5vw, 76px)/1.05', 'font: 300 clamp(36px, 4vw, 60px)/1.1')
  .replace('background: radial-gradient(ellipse at 50% 35%, #5e555a44, transparent 60%), var(--surface); border: 1px solid #ffffff08;', 'background: radial-gradient(ellipse at 50% 25%, #24667b38, transparent 65%), var(--surface); border: 1px solid #ffffff12; border-radius: 12px;')
  .replace('.product:hover img { transform: translateY(-10px) rotate(-4deg); }', '.product img { transform: rotate(-14deg); }\n.product:hover img { transform: translateY(-10px) rotate(-20deg) scale(1.04); }');
const stage = `
/* Cinematic showroom: lighting is behind the product, never behind small copy. */
.showroom { --light-color: 57, 163, 193; position: relative; isolation: isolate; background: #060a0c; }
.showroom[data-tone="1"] { --light-color: 126, 127, 171; --accent: #c6c8e0; }
.showroom[data-tone="2"] { --light-color: 157, 130, 65; --accent: #e3cfa3; }
.showroom::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 25% -10%, rgba(var(--light-color), .52), transparent 58%), radial-gradient(ellipse at 63% 42%, rgba(var(--light-color), .13), transparent 45%); transition: background 1s; }
.site-header { position: absolute; z-index: 5; inset: 0 0 auto; height: 105px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0 5.2%; }
.brand { font: 600 20px/1 var(--font-body); letter-spacing: -.8px; min-height: 44px; display: inline-flex; align-items: center; }
.site-nav { display: flex; gap: 30px; }
.site-nav a { display: grid; place-items: center; min-width: 44px; min-height: 44px; font-size: 12px; letter-spacing: 1px; }
.site-nav a:hover { color: var(--accent); }
.site-nav a.is-selected { text-decoration: underline; text-underline-offset: 8px; }
.search-link { justify-self: start; margin-left: 50px; display: flex; gap: 8px; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; font-size: 12px; }
.search-link svg { width: 18px; }
.search-link span { display: none; }
.hero { position: relative; min-height: max(740px, 92dvh); display: grid; align-items: center; grid-template-columns: 27% 58% 15%; gap: 0; padding: 135px 5.2% 115px; overflow: clip; }
.hero__copy { position: relative; z-index: 3; padding-bottom: 20px; }
.hero__eyebrow { display: inline-flex; font-size: 11px; letter-spacing: 2px; padding: 7px 12px; border: 1px solid #ffffff28; border-radius: 30px; margin-bottom: 58px; }
.hero__model-code { color: var(--ink-soft); font-size: 12px; letter-spacing: 1.8px; }
h1 { font: 300 clamp(40px, 4.4vw, 66px)/1.03 var(--font-display); letter-spacing: -2.5px; margin: 15px 0 24px; max-width: 320px; }
.hero__description { max-width: 275px; color: var(--ink-soft); font-size: 15px; }
.hero__price { font-size: 18px; margin-top: 20px; }
.button { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 10px 20px; border-radius: 30px; background: var(--accent); color: var(--bg); border: 0; font-size: 12px; font-weight: 600; letter-spacing: .5px; transition: box-shadow .3s, transform .3s; }
.button:hover { box-shadow: 0 0 30px #91d1e230; transform: translateY(-3px); }
.hero__copy .button { margin-top: 26px; }
.stage { position: relative; width: 100%; aspect-ratio: 1; display: grid; place-items: center; perspective: 1100px; }
.stage__rings { position: absolute; inset: 0; pointer-events: none; transform: scale(var(--ring-pulse, 1)); }
/* Separate rims, highlights and shadows place four planes behind the watch. */
.depth-ring { position: absolute; left: 50%; top: 50%; width: var(--ring-size); aspect-ratio: 1; border-radius: 50%; border: 1px solid rgba(var(--light-color), .48); box-shadow: 0 2px 1px #0009, inset 0 1px 0 #ffffff18; transform: translate(-50%, -50%) rotateX(14deg); animation: ring-orbit var(--ring-duration) ease-in-out infinite; }
.depth-ring::before { content: ''; position: absolute; inset: -2px; border-radius: 50%; border: 1px solid transparent; border-top-color: #dbf2ee65; border-right-color: rgba(var(--light-color), .18); transform: rotate(var(--ring-angle)); }
.depth-ring--outer { --ring-size: 119%; --ring-duration: 24s; --ring-angle: 30deg; opacity: .45; }
.depth-ring--second { --ring-size: 100%; --ring-duration: 20s; --ring-angle: 145deg; opacity: .7; animation-direction: reverse; }
.depth-ring--third { --ring-size: 81%; --ring-duration: 16s; --ring-angle: 250deg; opacity: .85; }
.depth-ring--inner { --ring-size: 62%; --ring-duration: 28s; --ring-angle: 330deg; opacity: .65; animation-direction: reverse; }
@keyframes ring-orbit { 0%,100% { transform: translate(-50%, -50%) rotateX(14deg) rotateZ(-8deg); } 50% { transform: translate(-50%, -50%) rotateX(23deg) rotateZ(12deg); } }
.stage__light { position: absolute; inset: -12%; pointer-events: none; overflow: clip; border-radius: 50%; background: radial-gradient(ellipse, rgba(var(--light-color), .26), transparent 62%); }
.stage__light::before, .stage__light::after { content: ''; position: absolute; inset: 3%; border-radius: 50%; pointer-events: none; }
.stage__light::before { background: radial-gradient(ellipse at 45% 40%, rgba(var(--light-color), .48), transparent 64%); opacity: var(--glow-opacity, .65); transform: scale(var(--glow-scale, .94)); animation: center-breathe 7s ease-in-out infinite; }
.stage__light::after { background: radial-gradient(ellipse at 65% 30%, #ffffff18, transparent 54%); animation: center-drift 12s ease-in-out infinite; }
@keyframes center-breathe { 0%,100% { opacity: .45; transform: scale(.88); } 50% { opacity: .95; transform: scale(1.12); } }
@keyframes center-drift { 0%,100% { opacity: .35; transform: translate(-4%,3%) rotate(-12deg); } 50% { opacity: .75; transform: translate(5%,-3%) rotate(14deg); } }
.watch-wrap { position: relative; z-index: 2; width: 57%; transform-style: preserve-3d; }
.watch { display: block; width: 100%; height: auto; filter: drop-shadow(20px 36px 22px #000b); }
.watch-stack { position: relative; aspect-ratio: 2 / 3; }
.watch-stack .watch { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; visibility: hidden; transform: rotate(-18deg); }
.watch-stack .watch.is-active, .watch-stack .watch.is-moving { visibility: visible; }
.stage__shadow { position: absolute; width: 60%; height: 12%; bottom: 4%; background: radial-gradient(ellipse, #000b, transparent 70%); transform: rotate(-18deg); }
.hotspot { position: absolute; z-index: 4; width: 44px; height: 44px; padding: 0; border: 0; background: transparent; border-radius: 50%; }
.hotspot::before { content: '+'; display: grid; place-items: center; position: absolute; inset: 11px; border-radius: 50%; color: var(--ink); background: #101a20b0; border: 1px solid #ffffff60; font-size: 14px; }
.hotspot:hover::before, .hotspot[aria-expanded=true]::before { background: var(--accent); color: var(--bg); }
.hotspot--one { left: 45%; top: 8%; }
.hotspot--two { right: 23%; top: 47%; }
.hotspot--three { left: 25%; bottom: 12%; }
.callout { display: none; position: absolute; z-index: 5; max-width: 220px; padding: 16px; background: #101619f2; border: 1px solid #ffffff28; border-radius: 8px; color: var(--ink-soft); font-size: 14px; }
.callout.is-open { display: block; left: 3%; bottom: 10%; }
.callout strong { display: block; color: var(--ink); margin-bottom: 5px; font-weight: 500; }
.next-preview { position: relative; z-index: 3; display: grid; width: 100%; background: transparent; border: 0; text-align: left; padding: 0; align-self: center; margin-top: 90px; }
.next-preview > span:first-child { font-size: 10px; letter-spacing: 1.5px; color: var(--ink-soft); }
.next-preview img { width: 100%; height: 125px; object-fit: contain; margin: 18px 0; padding: 8px; background: radial-gradient(ellipse, rgba(var(--light-color), .25), #0d1418); border-radius: 8px; transform: rotate(7deg); transition: transform .6s var(--ease); }
.next-preview:hover img { transform: rotate(0) scale(1.05); }
.next-preview strong { font-weight: 400; font-size: 12px; letter-spacing: .8px; }
.next-preview__arrow { position: absolute; right: 0; bottom: -5px; font-size: 22px; }
.hero__finish { position: absolute; bottom: 72px; left: 5.2%; font-size: 11px; letter-spacing: 1.7px; color: var(--ink-soft); }
.hero__navigation { position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 14px; }
.icon-button { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid transparent; background: transparent; font-size: 28px; border-radius: 50%; }
.icon-button:hover { border-color: var(--line); background: #ffffff06; }
.hero__progress { width: 75px; height: 1px; background: var(--line); }
.hero__progress span { display: block; width: 33.333%; height: 1px; background: var(--accent); transition: transform .6s; }
.hero__count { font-size: 12px; }
.hero__index { position: absolute; bottom: 24px; left: 5.2%; font-size: 16px; }
.hero__index small { display: none; }
.hero__index span::after { content: ' — THE COLLECTION'; font-size: 10px; letter-spacing: 1px; margin-left: 12px; color: var(--ink-soft); }
.motion-toggle { position: absolute; bottom: 50px; right: 5.2%; min-height: 44px; background: transparent; border: 0; color: var(--ink-soft); font-size: 11px; }
.purchase-rail { position: absolute; z-index: 6; top: 30px; right: 5.2%; display: flex; align-items: center; gap: 12px; }
.rail-link { font-size: 11px; min-height: 44px; min-width: 44px; padding: 10px; background: transparent; border: 0; }
.rail-link[aria-pressed=true] { text-decoration: underline; text-underline-offset: 5px; }
.purchase-rail .button { background: #ffffff0d; color: var(--ink); border: 1px solid #ffffff28; font-size: 11px; }
.js-control { display: none; }
.js .js-control { display: inline-flex; }
.js .next-preview { display: grid; }
.js .hotspot, .js .icon-button { display: grid; }
`;
const responsive = `
@media (max-width: 1100px) {
  .site-header { padding-inline: 4%; }
  .site-nav { gap: 12px; }
  .search-link { margin-left: 15px; }
  .purchase-rail { right: 4%; gap: 5px; }
  .purchase-rail .button { padding-inline: 12px; }
  .hero { grid-template-columns: 29% 57% 14%; padding-inline: 4%; }
  h1 { font-size: 48px; }
  .next-preview > span:first-child { letter-spacing: .5px; }
  .product__art { --art-height: 240px; }
}
@media (max-width: 950px) {
  .site-header { grid-template-columns: 1fr auto; height: 90px; }
  .search-link { display: none; }
  .site-nav { padding-right: 200px; }
  .brand { font-size: 18px; }
  .purchase-rail { top: 23px; }
  .purchase-rail .rail-link { display: none; }
  .hero { min-height: 880px; grid-template-columns: 35% 65%; padding-top: 140px; }
  h1 { font-size: 46px; }
  .watch-wrap { width: 67%; }
  .next-preview { position: absolute; width: 115px; right: 5%; bottom: 145px; margin: 0; }
  .next-preview img { height: 95px; }
  .hero__navigation { bottom: 50px; }
  .hero__finish { bottom: 110px; }
  .specs { gap: 25px; }
  .collection-grid { gap: 14px; }
  .product { padding: 25px 18px; }
  .product__art { --art-height: 210px; }
}
@media (max-width: 650px) {
  .site-header { position: relative; height: auto; padding: 20px 24px 0; gap: 12px; grid-template-columns: 1fr auto; }
  .brand { font-size: 19px; }
  .site-nav { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start; padding: 0; gap: 25px; }
  .purchase-rail { top: 20px; right: 20px; gap: 4px; }
  .purchase-rail .button { padding: 8px 12px; font-size: 10px; }
  .hero { min-height: auto; display: flex; flex-direction: column; align-items: stretch; padding: 40px 24px 132px; }
  .hero__copy { padding: 0; }
  .hero__eyebrow { margin-bottom: 28px; font-size: 10px; }
  h1 { max-width: 100%; font-size: 44px; margin-bottom: 18px; }
  .hero__description { max-width: 100%; font-size: 14px; }
  .hero__price { font-size: 16px; margin-top: 12px; }
  .hero__copy .button { margin-top: 18px; }
  .stage { width: 100%; margin: 22px 0 30px; }
  .watch-wrap { width: 68%; }
  .stage__light { inset: -8%; }
  .next-preview { position: relative; width: 100%; align-self: auto; right: auto; bottom: auto; display: grid; grid-template-columns: 60px 1fr 30px; gap: 12px; align-items: center; text-align: left; padding: 12px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .next-preview img { grid-column: 1; grid-row: 1 / 3; width: 60px; height: 70px; margin: 0; }
  .next-preview > span:first-child { grid-column: 2; align-self: end; }
  .next-preview strong { grid-column: 2; align-self: start; }
  .next-preview__arrow { position: static; grid-column: 3; grid-row: 1 / 3; }
  .hero__finish { bottom: 92px; left: 24px; font-size: 9px; letter-spacing: 1px; }
  .hero__index { display: none; }
  .hero__navigation { bottom: 28px; left: 24px; transform: none; gap: 4px; }
  .hero__progress { width: 40px; }
  .motion-toggle { right: 18px; bottom: 28px; font-size: 9px; padding: 0; }
  .callout.is-open { left: 0; bottom: 0; }
  .details-section { padding: 60px 24px; }
  .specs { grid-template-columns: 1fr; gap: 25px; }
  .specs dd { font-size: 22px; }
  .collection { padding: 20px 24px 70px; }
  .collection-grid { grid-template-columns: 1fr; gap: 20px; }
  .product__art { --art-height: 290px; }
  .collection__tools { align-items: start; flex-direction: column; }
  .contact { grid-template-columns: 1fr; gap: 25px; padding: 60px 24px; }
  .site-footer { flex-direction: column; padding: 24px; gap: 10px; }
}
@media (max-width: 400px) {
  .site-header { padding-inline: 18px; }
  .brand { font-size: 17px; }
  .purchase-rail { right: 14px; }
  .hero { padding-inline: 20px; }
  h1 { font-size: 40px; }
  .hero__navigation { left: 16px; }
  .hero__count { font-size: 10px; }
  .hero__finish { left: 20px; }
  .motion-toggle { right: 12px; font-size: 8px; }
}
/* Motion defaults to on by owner request; Pause is session-only. */
@media print {
  .site-header, .purchase-rail, .hero__navigation, .motion-toggle, .skip-link, .next-preview { display: none !important; }
  body, .showroom { background: white; color: black; }
  .reveal { opacity: 1 !important; transform: none !important; }
  .product { break-inside: avoid; }
}
`;
writeFileSync(path, global + stage + lower + responsive);
const generatorPath = base + 'design/create-source.mjs';
let generator = readFileSync(generatorPath, 'utf8').replaceAll('1.1.1', '1.2.0')
  .replace('Impact/Arial Narrow display and Segoe UI body', 'Segoe UI/Helvetica Neue display and Segoe UI body')
  .replace('The finite requestAnimationFrame carousel is 850 ms;', 'The finite requestAnimationFrame carousel is 1250 ms with simultaneous outgoing/incoming photographs;')
  .replace('the carousel changes their active visibility without fetching at the transition midpoint', 'the carousel crossfades and tilts two preloaded images together, then settles the selected image without fetching')
  .replace('The central halo uses center-breathe', 'The stage lighting changes with the showroom data-tone attribute (blue, silver-purple, gold). The scroll-driven watch-stack gently scales and tilts using a finite tween. The central halo uses center-breathe');
writeFileSync(generatorPath, generator);
