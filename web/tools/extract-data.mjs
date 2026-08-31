// Trích I18N + các hằng số từ Agentic.dc.html -> src/generated/data.ts
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, '../../_src/Agentic.dc.html');
const OUT_DIR = resolve(HERE, '../src/generated');

const raw = readFileSync(SRC, 'utf8');

const start = raw.indexOf('const I18N = {');
const end = raw.indexOf('class Component extends DCLogic');
if (start < 0 || end < 0) throw new Error('không định vị được khối dữ liệu');

let block = raw.slice(start, end).trimEnd();

// thêm export cho mọi khai báo const ở cấp ngoài cùng (không thụt đầu dòng)
block = block.replace(/^const /gm, 'export const ');

// Chuẩn hoá đường dẫn media sang tên sạch trong /public/media.
// Bản gốc trỏ tới ./uploads/*.mp4 (tên có dấu cách + tiếng Việt) và ./assets/card-*.
// Script tools/media.mjs sẽ sinh đúng các tên dưới đây.
const IDS_ORDER = ['me', 'sales', 'ops', 'data', 'custom'];
block = block.replace(
  /export const IMAGES = \[[\s\S]*?\];/,
  'export const IMAGES = [\n' +
    IDS_ORDER.map((_, i) => `  '/media/hero-${i + 1}.mp4',`).join('\n') +
    '\n];'
);
block = block.replace(
  /export const POSTERS = \[[\s\S]*?\];/,
  'export const POSTERS = [\n' +
    IDS_ORDER.map((id) => `  '/media/card-${id}.jpg',`).join('\n') +
    '\n];'
);

const header = `/* TỰ ĐỘNG SINH từ _src/Agentic.dc.html — chạy \`npm run convert\` để tạo lại.
   Không sửa tay file này. */

`;

const footer = `
export type LangCode = 'vi' | 'en' | 'zh';
export type Dict = (typeof I18N)['vi'];
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(resolve(OUT_DIR, 'data.ts'), header + block + '\n' + footer, 'utf8');

const names = [...block.matchAll(/^export const (\w+)/gm)].map((m) => m[1]);
console.log('data.ts    :', block.split('\n').length, 'dòng');
console.log('xuất ra    :', names.join(', '));
