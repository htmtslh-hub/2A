const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const demo = path.resolve(root, '../../../public/demos/crimson-folio');
fs.mkdirSync(demo, { recursive: true });
const html = fs.readFileSync(path.join(root, 'source/index.html'), 'utf8');
const publicHtml = html.replace(/\b(src|href)="assets\//g, '$1="/demos/crimson-folio/assets/')
  .replace('assets/css/style.css"', 'assets/css/style.css?v=1.0.2"')
  .replace('assets/js/main.js"', 'assets/js/main.js?v=1.0.2"');
fs.writeFileSync(path.join(demo, 'index.html'), publicHtml);
fs.cpSync(path.join(root, 'source/assets'), path.join(demo, 'assets'), { recursive: true });
console.log('Synced only Crimson Folio 1.0.2 demo');
