import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');

export function getNextCatalogId() {
  const catalogPath = resolve(root, 'web/src/lib/real-templates.ts');
  const content = readFileSync(catalogPath, 'utf8');
  const matches = [...content.matchAll(/t(\d+):/g)].map(m => parseInt(m[1], 10));
  const maxId = Math.max(...matches);
  return `t${maxId + 1}`;
}

export function scaffoldTemplate(slug, options = {}) {
  const dataPath = resolve(__dirname, `data/${slug}.json`);
  if (!existsSync(dataPath)) {
    throw new Error(`Data file not found: ${dataPath}`);
  }

  const data = JSON.parse(readFileSync(dataPath, 'utf8'));
  const accessTier = options.tier || data.assignedTier || 'premium';
  const catalogId = getNextCatalogId();
  console.log(`Scaffolding template: ${data.title} (${slug}) with Catalog ID: ${catalogId} [tier=${accessTier}]`);

  const productDir = resolve(root, `web/product/giao-dien-web/${slug}`);
  const sourceDir = resolve(productDir, 'source');
  const reviewDir = resolve(productDir, 'reviews/1.0.0');

  mkdirSync(sourceDir, { recursive: true });
  mkdirSync(reviewDir, { recursive: true });

  // Extract video URLs from prompt
  const videoUrls = [...data.prompt_text.matchAll(/https?:\/\/[^\s"'`]+\.mp4/g)].map(m => m[0]);
  const uniqueVideos = [...new Set(videoUrls)];

  // 1. BRIEF.md
  const briefContent = `# BRIEF — ${data.title} (\`${slug}\` / \`${catalogId}\`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện Landing Page tự chứa trong một file HTML duy nhất (\`index.html\`) cho thương hiệu **${data.title}**, tuân thủ nghiêm ngặt hồ sơ **WEB-STATIC-1** (kèm ngoại lệ \`INLINE_PRODUCTS\` trong \`dong-goi.mjs\`).
- **Phân hạng truy cập:** \`${accessTier}\` (theo quy tắc 1 Miễn phí + 2 Premium mỗi ngày).

## 15-20% Sáng tạo mở rộng (Creative Enhancements)
1. **Interactive Chapter & Section Jump HUD**: Thanh định vị chương trực quan góc màn hình với số thứ tự và nút nhảy mượt giữa các phân đoạn.
2. **Audio Visualizer / Ambient Telemetry**: Mô phỏng sóng âm 7 cột tương tác trực tiếp với chế độ bật/tắt âm thanh không gian.
3. **Interactive Modal / Drawer**: Hộp thoại chi tiết (Specs & Inquiries) mở nhanh qua phím tắt hoặc nút bấm, hỗ trợ phím \`Escape\` và khóa focus.
4. **Responsive 7-Viewport Polish**: Tối ưu hiển thị tuyệt đối từ di động nhỏ 320px đến màn hình lớn 1440px+.

## Nguồn tài nguyên bên ngoài theo đặc tả
- **Video Assets:**
${uniqueVideos.map(v => `  - \`${v}\``).join('\n')}
- **Poster / Thumbnail:** \`${data.poster || data.image}\`
`;
  writeFileSync(resolve(reviewDir, 'BRIEF.md'), briefContent, 'utf8');

  // 2. README.md (root)
  writeFileSync(resolve(productDir, 'README.md'), `# ${data.title} (${catalogId})

Commercial web template built from MotionSites prompt specification with 15-20% creative enhancements.
`, 'utf8');

  // 3. source/README.md
  writeFileSync(resolve(sourceDir, 'README.md'), `# ${data.title} — Website Template

Welcome to your new website template for **${data.title}**.

## Quick Start
1. Double click \`index.html\` to open the website directly in any web browser.
2. No Node.js, build step, or external database required.
3. Read \`CUSTOMISE.md\` for a 10-step customization guide.
`, 'utf8');

  // 4. source/CUSTOMISE.md
  writeFileSync(resolve(sourceDir, 'CUSTOMISE.md'), `# Customisation Guide — ${data.title}

Follow these straightforward steps to customize text, colors, and assets:

1. **Brand Name & Titles**: Open \`index.html\` in any text editor and search for \`${data.title}\` to replace with your brand.
2. **Background Video / Images**: Search for video tags with \`src=\` to replace with your own MP4 files.
3. **Accent Colors**: Look for CSS variables or color values in the \`<style>\` block.
4. **Navigation Links**: Update anchor \`href\` links in the header section.
5. **Contact Actions**: Change email links or CTA buttons to your booking/contact URL.
`, 'utf8');

  // 5. source/LICENCE.txt
  writeFileSync(resolve(sourceDir, 'LICENCE.txt'), `COMMERCIAL TEMPLATE LICENSE

Copyright (c) 2026 Forge Zone (https://forgezone.store).
All rights reserved.

Permission is hereby granted to the purchaser of this template to use, modify,
and display the template for personal or commercial projects.
`, 'utf8');

  // 6. QA.md
  writeFileSync(resolve(reviewDir, 'QA.md'), `# QA Report — ${data.title} (\`${slug}\` / \`${catalogId}\`, v1.0.0)

- **Date:** ${new Date().toISOString().slice(0, 10)}
- **Product Slug:** \`${slug}\`
- **Catalog ID:** \`${catalogId}\`
- **Category:** \`${data.category.toLowerCase().includes('hero') ? 'portfolio' : 'commerce'}\`
- **Access Tier:** \`${accessTier}\`
- **Version:** \`1.0.0\`
`, 'utf8');

  // 7. Update INLINE_PRODUCTS in dong-goi.mjs
  const dongGoiPath = resolve(root, 'web/product/giao-dien-web/tools/dong-goi.mjs');
  let dongGoiCode = readFileSync(dongGoiPath, 'utf8');
  if (!dongGoiCode.includes(`'${slug}'`)) {
    dongGoiCode = dongGoiCode.replace(
      /const INLINE_PRODUCTS = new Set\(\[([^\]]+)\]\);/,
      (match, p1) => `const INLINE_PRODUCTS = new Set([${p1}, '${slug}']);`
    );
    writeFileSync(dongGoiPath, dongGoiCode, 'utf8');
    console.log(`[+] Added '${slug}' to INLINE_PRODUCTS in dong-goi.mjs.`);
  }

  console.log(`Scaffolding complete for ${slug}. Ready for HTML implementation.`);
  return { slug, catalogId, accessTier, productDir, sourceDir, reviewDir, data };
}

if (process.argv[1] && process.argv[1].endsWith('scaffold-template.mjs')) {
  const slug = process.argv[2];
  const tier = process.argv[3];
  if (!slug) {
    console.error('Usage: node scaffold-template.mjs <slug> [free|premium]');
    process.exit(1);
  }
  scaffoldTemplate(slug, { tier });
}
