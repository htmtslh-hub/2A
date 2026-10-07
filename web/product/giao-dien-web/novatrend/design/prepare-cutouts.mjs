import sharp from 'sharp';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
const root = resolve('web/product/giao-dien-web/novatrend');
for (const name of ['fashion', 'casual']) {
  const input = `${root}/design/${name}-cutout.png`;
  const output = `${root}/source/assets/img/hero-${name}.webp`;
  await sharp(input).trim().resize(900, 1350, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 88, alphaQuality: 100 }).toFile(output);
  const meta = await sharp(output).metadata();
  const stats = await sharp(output).stats();
  if (!meta.hasAlpha || stats.channels[3].min !== 0 || stats.channels[3].max !== 255) throw new Error('Transparent alpha missing');
  console.log(name, meta.width, meta.height, readFileSync(output).length, 'alpha PASS');
}
for (const file of ['README.md', 'source/README.md', 'source/CUSTOMISE.md']) {
  const path = `${root}/${file}`;
  let text = readFileSync(path, 'utf8').replaceAll('1.0.0', '1.1.0');
  if (file === 'source/README.md') text = text.replace('15 optimized WebP image assets', '16 optimized WebP image assets').replace('hero model, 6', 'two transparent hero models, 6');
  if (file === 'source/CUSTOMISE.md') text = text.replace('- `hero-model.webp`: Hero lookbook model', '- `hero-fashion.webp` and `hero-casual.webp`: transparent hero lookbook models. Keep alpha transparency; the orange backdrop and floating product cards are separate HTML/CSS layers. Both images use a 900×1350 canvas. The two hero buttons switch images with a finite 620ms animation and support Left/Right/Home/End keys.');
  writeFileSync(path, text);
}
