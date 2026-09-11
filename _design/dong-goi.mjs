/* Đóng gói một mẫu trong _design/templates/ thành .zip giao cho khách.
   Đầu ra đặt thẳng vào web/private/templates/ — chỗ /api/download đọc file.

   Dùng:  node _design/dong-goi.mjs kinetiq

   Thư mục đó bị .gitignore và .vercelignore chặn, cố ý: file bán cho khách
   không đi kèm mã nguồn. Nghĩa là bản trên Vercel KHÔNG có file này, phải
   đưa lên kho lưu trữ riêng thì khách mới tải được. */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];

if (!name) {
  console.error('Thiếu tên mẫu. Ví dụ: node _design/dong-goi.mjs kinetiq');
  process.exit(1);
}

const src = resolve(HERE, 'templates', name);
if (!existsSync(src)) {
  console.error(`Không thấy ${src}`);
  process.exit(1);
}

const outDir = resolve(HERE, '../web/private/templates');
mkdirSync(outDir, { recursive: true });
const out = resolve(outDir, `${name}.zip`);
if (existsSync(out)) rmSync(out);

// Compress-Archive có sẵn trên Windows, không phải cài thêm gì.
execFileSync('powershell', [
  '-NoProfile', '-Command',
  `Compress-Archive -Path '${src}' -DestinationPath '${out}' -Force`,
], { stdio: 'inherit' });

console.log(`${name}.zip  ${Math.round(statSync(out).size / 1024)}KB  ->  ${out}`);
