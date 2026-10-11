import sharp from '../../../../../node_modules/sharp/dist/index.mjs';
import { copyFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
const product=resolve('web/product/giao-dien-web/music-app');
const generated='C:/Users/Lenovo/.codex/generated_images/01a12857-0c94-7321-a387-4bde5caf3aa9/exec-00a48ab8-9595-47ed-b326-b60d201182e5.png';
copyFileSync(generated,resolve(product,'design/user-avatar-original.png'));
await sharp(generated).resize({width:128}).webp({quality:86}).toFile(resolve(product,'source/assets/img/user-avatar.webp'));
appendFileSync(resolve(product,'design/PROMPTS.md'),'\n## user-avatar.webp\nSquare profile avatar illustration only, no UI, no lettering. Friendly young adult man facing forward, short dark curly hair, navy beard, warm medium skin, navy blue crewneck shirt. Head-and-shoulders bust centered, flat cartoon editorial illustration with simple clean outlines, pale lavender solid background. Suitable for a 48px music-app user avatar. No border or circle crop, no watermark.\n');
