import sharp from '../../../../../node_modules/sharp/dist/index.mjs';
import { readFileSync, writeFileSync, mkdirSync, renameSync } from 'node:fs';
import { resolve } from 'node:path';
const product = resolve('web/product/giao-dien-web/music-app');
for (const name of ['aurora', 'luna', 'summer', 'solara']) {
  const image = resolve(product, 'source/assets/img', `${name}.png`);
  await sharp(image).resize({ width: name === 'luna' ? 640 : 512 }).webp({ quality: 86 }).toFile(resolve(product, 'source/assets/img', `${name}.webp`));
  renameSync(image, resolve(product, 'design', `${name}-original.png`));
}
// Original synthesized audio: four soft triads, generated locally, no external samples.
const rate = 22050;
const duration = 24;
const samples = rate * duration;
const wav = Buffer.alloc(44 + samples * 2);
wav.write('RIFF'); wav.writeUInt32LE(36 + samples * 2, 4); wav.write('WAVE', 8);
wav.write('fmt ', 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
wav.write('data', 36); wav.writeUInt32LE(samples * 2, 40);
const chords = [[261.63,329.63,392], [220,261.63,329.63], [174.61,220,261.63], [196,246.94,293.66]];
for (let n = 0; n < samples; n++) {
  const t = n / rate;
  const chord = chords[Math.floor(t / 6)];
  const beat = t % 0.75;
  const envelope = Math.min(1, beat / 0.03) * Math.exp(-beat * 3.8);
  const fade = Math.min(1, t / 0.5, (duration - t) / 1.2);
  const tone = chord.reduce((sum, hz, i) => sum + Math.sin(2 * Math.PI * hz * t) * (i === Math.floor(t / .75) % 3 ? .16 : .035), 0);
  wav.writeInt16LE(Math.round(tone * envelope * fade * 32767), 44 + n * 2);
}
mkdirSync(resolve(product, 'source/assets/audio'), { recursive: true });
writeFileSync(resolve(product, 'source/assets/audio/demo.wav'), wav);
console.log('Four WebP assets and original 24-second WAV prepared.');
