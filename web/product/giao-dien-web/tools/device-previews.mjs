/* Derive real responsive preview stills from the final extracted-product QA
   screenshots. No concept images or desktop-as-mobile screenshots. */
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
const require = createRequire(import.meta.url);
const sharp = require('../../../../_design/.tooling/node_modules/sharp');
for (const slug of ['solenne', 'meridian']) {
  const images = resolve(`web/product/giao-dien-web/${slug}/reviews/1.0.0/screenshots`);
  await sharp(resolve(images, 'chromium-820.png')).extract({ left: 0, top: 0, width: 820, height: 1180 }).resize(410, 590).webp({ quality: 87 }).toFile(resolve(`web/public/previews/${slug}-tablet.webp`));
  await sharp(resolve(images, 'chromium-375.png')).extract({ left: 0, top: 0, width: 375, height: 812 }).webp({ quality: 87 }).toFile(resolve(`web/public/previews/${slug}-mobile.webp`));
  console.log(`${slug}: actual tablet and mobile preview stills generated`);
}
