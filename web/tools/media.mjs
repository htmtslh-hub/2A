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

// Thứ tự khớp POSTERS / IDS
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

/* Video cho thẻ nhỏ ở dải hero.
   Thẻ rộng 240px trên desktop và 75px trên mobile, nên bản 1280px là thừa
   gấp nhiều lần. Trước đây thẻ dùng chung file với video nền, mà vì là hai
   thẻ <video> riêng nên trình duyệt tải cùng một file hai lượt — nửa dung
   lượng trang chủ là bản sao. */
console.log('== video thẻ (bản nhỏ) ==');
VIDEOS.forEach((rel, i) => {
  const src = resolve(SRC, rel);
  const dst = resolve(OUT, `hero-${i + 1}-sm.mp4`);
  if (!existsSync(src)) {
    console.warn('  THIẾU:', rel);
    return;
  }
  run([
    '-i', src,
    '-vf', "scale='min(480,iw)':-2",
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '32',
    '-pix_fmt', 'yuv420p',
    '-an',
    '-movflags', '+faststart',
    dst,
  ]);
  console.log(`  hero-${i + 1}-sm.mp4  -> ${mb(dst)}MB`);
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

/* Poster bản nhỏ cho thẻ, và bản WebP cho nền.
   WebP nhỏ hơn JPEG cùng chất lượng khoảng một phần ba. */
console.log('== poster bản nhỏ + WebP ==');
POSTERS.forEach(([rel, name]) => {
  const src = resolve(SRC, rel);
  if (!existsSync(src)) return;
  const base = name.replace(/\.jpg$/, '');

  const sm = resolve(OUT, `${base}-sm.webp`);
  run(['-i', src, '-vf', "scale='min(480,iw)':-2", '-quality', '72', sm]);
  console.log(`  ${base}-sm.webp   -> ${kb(sm)}KB`);

  const bg = resolve(OUT, `${base}-bg.webp`);
  run(['-i', src, '-vf', "scale='min(960,iw)':-2", '-quality', '76', bg]);
  console.log(`  ${base}-bg.webp   -> ${kb(bg)}KB`);
});

console.log('Xong. Đầu ra:', OUT);
