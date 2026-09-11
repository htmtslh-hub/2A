// Trích ảnh mà người thiết kế đã đặt vào các ô <image-slot>
// (.image-slots.state.json) ra public/previews/ và sinh src/lib/previews.ts
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const STATE = resolve(HERE, '../../_src/.image-slots.state.json');
const OUT_IMG = resolve(HERE, '../public/previews');
const OUT_TS = resolve(HERE, '../src/lib/previews.ts');

const EXT = { 'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/avif': 'avif' };

let state;
try {
  state = JSON.parse(readFileSync(STATE, 'utf8'));
} catch {
  console.log('không có .image-slots.state.json — bỏ qua');
  process.exit(0);
}

mkdirSync(OUT_IMG, { recursive: true });
const entries = [];

for (const [slotId, val] of Object.entries(state)) {
  const url = val && typeof val === 'object' ? val.u : null;
  if (typeof url !== 'string' || !url.startsWith('data:')) continue;
  const m = /^data:([^;]+);base64,(.*)$/s.exec(url);
  if (!m) continue;
  const ext = EXT[m[1]] || 'bin';
  const file = `${slotId}.${ext}`;
  writeFileSync(resolve(OUT_IMG, file), Buffer.from(m[2], 'base64'));
  entries.push([slotId, `/previews/${file}`]);
  console.log('  ', file, (Buffer.from(m[2], 'base64').length / 1024).toFixed(0) + 'KB');
}

const body = entries.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n');

writeFileSync(
  OUT_TS,
  `/* TỰ ĐỘNG SINH từ _src/.image-slots.state.json — chạy \`npm run convert\` để tạo lại.
   Ảnh preview cho từng ô <ImageSlot>, khoá là id của slot trong markup
   ('agentic-tpl-t1' … 'agentic-tpl-t18', 'agentic-home-t1' …).
   Muốn thêm ảnh: bỏ file vào public/previews/ rồi khai báo trong
   src/lib/previews-extra.ts — file đó viết tay, không bị ghi đè. */
import { PREVIEWS_EXTRA } from './previews-extra';

const PREVIEWS_FROM_DESIGN: Record<string, string> = {
${body}
};

export const PREVIEWS: Record<string, string> = {
  ...PREVIEWS_FROM_DESIGN,
  ...PREVIEWS_EXTRA,
};
`,
  'utf8'
);

console.log('previews.ts:', entries.length, 'ảnh');
