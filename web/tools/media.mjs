// Tối ưu media từ _src/{uploads,assets} -> public/media
// Video: H.264 1280px, không tiếng, faststart. Ảnh: JPEG 1000px.
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, '../../_src');
const OUT = resolve(HERE, '../public/media');
mkdirSync(OUT, { recursive: true });

// Thứ tự khớp IMAGES trong Agentic.dc.html
const VIDEOS = [
  'uploads/Creating_cyber_character_idle_an..._202608060919.mp4',
  'uploads/Character_idle_animation_creation_1080p_202608060916.mp4',
  'uploads/Animate_artwork_with_idle_breathing_202608060918.mp4',
  'uploads/Create_seamless_idle_animation_1080p_202608060919.mp4',
  'uploads/Character_idle_animation_creation_1080p_202608060956.mp4',
];

// Chỉ là bảng nguồn -> tên file đầu ra; thứ tự ở đây không quan trọng.
// Thứ tự thẻ nào dùng ảnh nào nằm ở POSTERS trong _src/Agentic.dc.html.
const POSTERS = [
  ['assets/card-me.jpeg', 'card-me.jpg'],
  ['assets/card-sales.jpg', 'card-sales.jpg'],
  ['assets/card-ops.jpg', 'card-ops.jpg'],
  ['assets/card-data.png', 'card-data.jpg'],
  ['assets/card-custom.jpg', 'card-custom.jpg'],
];

const mb = (p) => (statSync(p).size / 1048576).toFixed(1);
const kb = (p) => Math.round(statSync(p).size / 1024);

function run(args) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
}

console.log('== video ==');
VIDEOS.forEach((rel, i) => {
  const src = resolve(SRC, rel);
  const dst = resolve(OUT, `hero-${i + 1}.mp4`);
  if (!existsSync(src)) {
    console.warn('  THIẾU:', rel);
    return;
  }
  run([
    '-i', src,
    '-vf', "scale='min(1280,iw)':-2",
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '30',
    '-pix_fmt', 'yuv420p',
    '-an',
    '-movflags', '+faststart',
    dst,
  ]);
  console.log(`  hero-${i + 1}.mp4  ${mb(src)}MB -> ${mb(dst)}MB`);
});

/* Video nền cho điện thoại dọc.
   Màn hình dọc cắt video ngang còn một dải hẹp ở giữa rồi phóng to lên, nên
   bản 1280px ngang vừa nặng vừa mờ. Cắt sẵn khung 9:16 ở đúng độ phân giải
   màn hình thì nét hơn hẳn mà file lại nhỏ hơn.

   VỊ TRÍ CẮT phải đặt tay. Khung 9:16 chỉ rộng 608 trên khung hình 1920, tức
   chưa tới một phần ba, nên cắt đúng giữa là mất đầu hoặc mất tay nhân vật.
   Các số dưới đây chọn bằng cách xuất khung hình ra xem từng cái một; nhân
   vật trong mấy tranh này không đứng giữa. Đổi video thì phải xem lại. */
const MOB_X = [468, 656, 656, 656, 748];

console.log('== video nền cho điện thoại dọc ==');
VIDEOS.forEach((rel, i) => {
  const src = resolve(SRC, rel);
  const dst = resolve(OUT, `hero-${i + 1}-mob.mp4`);
  if (!existsSync(src)) {
    console.warn('  THIẾU:', rel);
    return;
  }
  run([
    '-i', src,
    '-vf', `crop=608:1080:${MOB_X[i]}:0,scale=480:854`,
    '-c:v', 'libx264',
    '-preset', 'slow',
    // Màn hình nhỏ giấu được nhiễu nén tốt hơn nhiều so với màn hình lớn;
    // so ba mức 30/32/34 thì 32 không phân biệt được với 30 nhưng nhẹ hơn 25%.
    '-crf', '32',
    '-pix_fmt', 'yuv420p',
    '-an',
    '-movflags', '+faststart',
    dst,
  ]);
  console.log(`  hero-${i + 1}-mob.mp4  -> ${kb(dst)}KB`);
});

console.log('== ảnh poster ==');
POSTERS.forEach(([rel, name]) => {
  const src = resolve(SRC, rel);
  const dst = resolve(OUT, name);
  if (!existsSync(src)) {
    console.warn('  THIẾU:', rel);
    return;
  }
  run(['-i', src, '-vf', "scale='min(1000,iw)':-2", '-q:v', '4', dst]);
  console.log(`  ${name}  ${mb(src)}MB -> ${mb(dst)}MB`);
});

/* Poster dạng WebP, nhỏ hơn JPEG cùng chất lượng khoảng một phần ba.
   Một bản 960px dùng chung cho cả video nền lẫn thẻ. */
console.log('== poster WebP ==');
POSTERS.forEach(([rel, name]) => {
  const src = resolve(SRC, rel);
  if (!existsSync(src)) return;
  const base = name.replace(/\.jpg$/, '');

  const bg = resolve(OUT, `${base}-bg.webp`);
  run(['-i', src, '-vf', "scale='min(960,iw)':-2", '-quality', '76', bg]);
  console.log(`  ${base}-bg.webp   -> ${kb(bg)}KB`);
});

console.log('Xong. Đầu ra:', OUT);
