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

/* Cắt vuông ÔM LẤY HÌNH, không cắt giữa khung.
   ---------------------------------------------------------------------------
   Ảnh logo thường có nhiều nền trống quanh hình. Cắt giữa khung thì ở cỡ 32px
   hình bé tí, nhìn không ra gì. Nên quét độ sáng tìm khung nhỏ nhất còn chứa
   hết hình, rồi cắt vuông quanh khung đó.
   Chỉ đúng với logo trên nền tối. Nền sáng thì phép đo trả về gần cả ảnh và
   tự rơi về cắt giữa — vẫn chạy, chỉ là không ôm sát.
   Ép cắt tay:  node _design/favicon.mjs anh.png 367:367:67:58 */
const NGUONG = 28;   // sáng hơn mức này thì coi là có hình
const LE = 1.06;     // chừa 6% viền cho hình không dính sát mép

console.log(`Nguồn: ${src}`);
const probe = execFileSync('ffprobe', [
  '-v', 'error', '-select_streams', 'v:0',
  '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', src,
]).toString().trim();
const [W, H] = probe.split('x').map(Number);
if (!W || !H) throw new Error(`Không đọc được kích thước ảnh: "${probe}"`);

function omLayHinh() {
  const g = execFileSync('ffmpeg', [
    '-v', 'error', '-i', src, '-vf', 'format=gray', '-f', 'rawvideo', '-',
  ], { maxBuffer: 1 << 28 });
  if (g.length !== W * H) throw new Error(`Ảnh xám dài ${g.length}, cần ${W * H}`);

  let x0 = W, x1 = -1, y0 = H, y1 = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (g[y * W + x] > NGUONG) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) return null;                       // ảnh đen thui
  const canh = Math.min(Math.round(Math.max(x1 - x0 + 1, y1 - y0 + 1) * LE), Math.min(W, H));
  const gx = (x0 + x1) >> 1, gy = (y0 + y1) >> 1;
  return {
    canh,
    px: Math.max(0, Math.min(W - canh, gx - (canh >> 1))),
    py: Math.max(0, Math.min(H - canh, gy - (canh >> 1))),
    hinh: `x ${x0}..${x1}, y ${y0}..${y1}`,
  };
}

let crop;
if (process.argv[3]) {
  crop = `crop=${process.argv[3]}`;
  console.log(`Kích thước: ${W}x${H} — cắt tay ${process.argv[3]}`);
} else {
  const k = omLayHinh();
  if (k) {
    crop = `crop=${k.canh}:${k.canh}:${k.px}:${k.py}`;
    console.log(`Kích thước: ${W}x${H} — hình nằm ở ${k.hinh}`);
    console.log(`Cắt ôm hình: ${k.canh}x${k.canh} tại (${k.px},${k.py})`);
  } else {
    const c = Math.min(W, H);
    crop = `crop=${c}:${c}:${(W - c) >> 1}:${(H - c) >> 1}`;
    console.log(`Kích thước: ${W}x${H} — không tìm thấy hình, cắt giữa ${c}x${c}`);
  }
}

/* Ở 32px, hình mảnh và tối bị thu nhỏ thành một vệt mờ không đọc ra gì. Nên
   riêng cỡ nhỏ thì kéo sáng, tăng tương phản và làm nét lại sau khi thu — làm
   TRƯỚC khi thu thì vô ích, vì chi tiết đã mất trong lúc thu rồi.
   Cỡ lớn giữ nguyên: chúng còn đủ điểm ảnh để tự rõ. */
const RO_NET = 'eq=brightness=0.10:contrast=1.55:saturation=1.35,unsharp=3:3:1.2';

const OUT = [
  { file: 'favicon.ico', size: 32, roNet: true },
  { file: 'icon.png', size: 512 },
  { file: 'apple-icon.png', size: 180 },
];

const kb = (p) => (statSync(p).size / 1024).toFixed(1);

for (const o of OUT) {
  const out = resolve(APP, o.file);
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', src,
    '-vf', `${crop},scale=${o.size}:${o.size}:flags=lanczos${o.roNet ? ',' + RO_NET : ''}`,
    '-frames:v', '1', out,
  ]);
  console.log(`  ${o.file.padEnd(16)} ${o.size}x${o.size}  ${kb(out)}KB`);
}
console.log('Xong. Chạy lại dev server để trình duyệt lấy biểu tượng mới.');
