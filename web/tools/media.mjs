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

console.log('Xong. Đầu ra:', OUT);
