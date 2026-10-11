import sharp from '../../../../../node_modules/sharp/dist/index.mjs';
import { copyFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
const product=resolve('web/product/giao-dien-web/music-app');
const generated='C:/Users/Lenovo/.codex/generated_images/01a12857-0c94-7321-a387-4bde5caf3aa9/exec-a26e983c-5492-42be-ae93-b2e66e11c5c6.png';
copyFileSync(generated,resolve(product,'design/aurora-v2-original.png'));
await sharp(generated).resize({width:512}).webp({quality:86}).toFile(resolve(product,'source/assets/img/aurora.webp'));
appendFileSync(resolve(product,'design/PROMPTS.md'),'\n## Aurora v2 — selected final\nSquare music album artwork, flat simplified anime editorial illustration with clean painted shapes, no text. A silver platinum short-bob-haired young woman in left-facing profile in a coral orange long-sleeve top. Show upper body down to waist, slim shoulders, woman positioned slightly right of center with her face left of center, head occupying approximately 48 percent of canvas width and 55 percent of canvas height. Large gray-blue eye, tiny pink mouth, long lock of silver hair flowing down the front shoulder, bob curves behind ear. Head starts 12 percent below top. Deep blue navy background with just 7 tiny four-point pale stars. Restrained hand-drawn outlines, low detail, smooth flat blue-gray and peach shading, no painterly heavy texture, no letters, no UI.\n');
