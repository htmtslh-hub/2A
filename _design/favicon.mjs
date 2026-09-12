/* Sinh bộ biểu tượng cho web từ MỘT ảnh nguồn.
   ---------------------------------------------------------------------------
   Dùng:  node _design/favicon.mjs                      (đọc _design/logo.png)
          node _design/favicon.mjs duong/dan/anh.png    (ảnh khác)

   Ảnh nguồn nên là hình vuông, tối thiểu 512x512, nền tối cũng được — biểu
   tượng nhỏ trên thanh tab đứng trên nền sáng lẫn nền tối nên nền đen giúp
   hình nổi hơn là nền trong suốt.

   Đầu ra (Next.js tự nhận theo tên file, không phải khai gì trong layout):
     web/src/app/favicon.ico    32x32  — địa chỉ /favicon.ico
     web/src/app/icon.png      512x512 — trình duyệt hiện đại, PWA
     web/src/app/apple-icon.png 180x180 — iPhone/iPad lưu vào màn hình chính

   Cần ffmpeg trong PATH. */
import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP = resolve(HERE, '../web/src/app');
const src = resolve(process.argv[2] ?? resolve(HERE, 'logo.png'));

if (!existsSync(src)) {
  console.error(`Không thấy ảnh nguồn: ${src}`);
  console.error('Lưu ảnh logo vào _design/logo.png rồi chạy lại.');
  process.exit(1);
}

/* Ảnh nguồn không vuông thì cắt vuông ở giữa trước, không thì biểu tượng bị
   bóp méo. Đo kích thước bằng ffprobe rồi truyền số thật vào crop — viết
   min(iw,ih) thẳng vào bộ lọc thì dấu phẩy bị hiểu là ngăn cách bộ lọc. */
console.log(`Nguồn: ${src}`);
const probe = execFileSync('ffprobe', [
  '-v', 'error', '-select_streams', 'v:0',
  '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', src,
]).toString().trim();
const [W, H] = probe.split('x').map(Number);
if (!W || !H) throw new Error(`Không đọc được kích thước ảnh: "${probe}"`);
const side = Math.min(W, H);
const crop = `crop=${side}:${side}:${(W - side) >> 1}:${(H - side) >> 1}`;
console.log(`Kích thước: ${W}x${H} -> cắt vuông ${side}x${side}`);

const OUT = [
  { file: 'favicon.ico', size: 32 },
  { file: 'icon.png', size: 512 },
  { file: 'apple-icon.png', size: 180 },
];

const kb = (p) => (statSync(p).size / 1024).toFixed(1);

for (const o of OUT) {
  const out = resolve(APP, o.file);
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', src,
    '-vf', `${crop},scale=${o.size}:${o.size}:flags=lanczos`,
    '-frames:v', '1', out,
  ]);
  console.log(`  ${o.file.padEnd(16)} ${o.size}x${o.size}  ${kb(out)}KB`);
}
console.log('Xong. Chạy lại dev server để trình duyệt lấy biểu tượng mới.');
