import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const source = 'web/product/giao-dien-web/watchroom/source/';
const demo = 'web/public/demos/watchroom/';
for (const folder of ['assets/css', 'assets/js', 'assets/img']) mkdirSync(demo + folder, { recursive: true });
for (const file of ['assets/css/style.css','assets/js/main.js','assets/img/quantum-adg.webp','assets/img/onyx-gmt.webp','assets/img/solaris-38.webp']) copyFileSync(source + file, demo + file);
// Next/Vercel canonicalises /demos/watchroom/ to /demos/watchroom.
// Only the hosted demo uses absolute paths; the customer ZIP stays portable.
writeFileSync(demo + 'index.html', readFileSync(source + 'index.html', 'utf8').replaceAll('src="assets/', 'src="/demos/watchroom/assets/').replaceAll('href="assets/', 'href="/demos/watchroom/assets/'));
