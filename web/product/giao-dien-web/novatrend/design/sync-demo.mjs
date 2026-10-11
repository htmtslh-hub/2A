import { cpSync, readFileSync, writeFileSync } from 'node:fs';
const root = 'web/product/giao-dien-web/novatrend/source';
const demo = 'web/public/demos/novatrend';
cpSync(root, demo, { recursive: true });
writeFileSync(demo + '/index.html', readFileSync(root + '/index.html', 'utf8').replace('<head>', '<head><base href="/demos/novatrend/">'));
