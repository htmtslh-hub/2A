/* Đóng gói một mẫu trong web/product/giao-dien-web/<slug>/source/ thành .zip giao cho khách.
   Đầu ra đặt cạnh source trong thư mục sản phẩm — chỗ /api/download đọc file.

   Dùng:  node web/product/giao-dien-web/tools/dong-goi.mjs kinetiq
          node web/product/giao-dien-web/tools/dong-goi.mjs pinehaven --ngoai-le

   Source bị .vercelignore chặn; ZIP nằm ngoài public/ và được Next đưa theo
   riêng vào route tải file có kiểm tra quyền.

   Vì sao tự ghi ZIP: trước đây script gọi Compress-Archive của Windows
   PowerShell 5.1 (module Archive 1.0.1.0). Bản đó ghi đường dẫn trong ZIP bằng
   dấu "\" — giải nén trên macOS/Linux ra file phẳng tên "slug\assets\css\style.css"
   và trang mất CSS/JS. Ở đây ZIP được ghi trực tiếp bằng zlib của Node: đường dẫn
   luôn dùng "/", tên file UTF-8, chạy giống nhau trên mọi hệ điều hành.

   Trước khi ghi, script kiểm tra theo WEB-STATIC-1 (product-standards.md):
   - đủ sáu file bắt buộc; file thêm (ví dụ ảnh) chỉ được nhận khi có --ngoai-le
     và ngoại lệ đó phải được ghi trong hồ sơ reviews/ của mẫu;
   - không có file ẩn, file tạm hay thư mục rỗng lọt vào gói;
   - ZIP dưới 20.480 byte (W06), trừ khi có --ngoai-le.
   Sau khi ghi, script đọc lại ZIP, so từng file với source và in SHA-256 để ghi
   vào QA.md. */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { crc32, deflateRawSync, inflateRawSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const name = args.find(a => !a.startsWith('--'));
const allowException = args.includes('--ngoai-le');

const REQUIRED = ['index.html', 'assets/css/style.css', 'assets/js/main.js', 'CUSTOMISE.md', 'README.md', 'LICENCE.txt'];
const ZIP_LIMIT = 20480;

function fail(message) {
  console.error(`LỖI: ${message}`);
  process.exit(1);
}

if (!name) fail('Thiếu tên mẫu. Ví dụ: node web/product/giao-dien-web/tools/dong-goi.mjs kinetiq');
if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(name)) fail(`Slug "${name}" không hợp lệ (chỉ a-z, 0-9 và dấu -).`);

const src = resolve(HERE, '..', name, 'source');
if (!existsSync(src)) fail(`Không thấy ${src}`);

// ---- Thu thập file -------------------------------------------------------
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.name.startsWith('.') || /^(Thumbs\.db|desktop\.ini)$/i.test(entry.name) || entry.name.endsWith('~')) {
      fail(`File ẩn/tạm không được đóng gói: ${relative(src, full)}. Xoá hoặc chuyển ra khỏi source/.`);
    }
    if (entry.isDirectory()) {
      const inner = walk(full);
      if (!inner.length) fail(`Thư mục rỗng trong source/: ${relative(src, full)}`);
      out.push(...inner);
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(src)
  .map(full => ({ full, rel: relative(src, full).split(sep).join('/') }))
  .sort((a, b) => a.rel.localeCompare(b.rel));

const relSet = new Set(files.map(f => f.rel));
const missing = REQUIRED.filter(r => !relSet.has(r));
const extra = files.map(f => f.rel).filter(r => !REQUIRED.includes(r));
const isFreeSample = name === 'free-sample';

if (missing.length) {
  // Gói miễn phí chủ động không kèm CUSTOMISE/LICENCE thương mại.
  const freeOk = isFreeSample && missing.every(m => m === 'CUSTOMISE.md' || m === 'LICENCE.txt');
  if (!freeOk) fail(`Thiếu file bắt buộc: ${missing.join(', ')}`);
}
if (extra.length && !allowException) {
  fail(`Có file ngoài sáu file chuẩn: ${extra.join(', ')}.\n` +
    '      Nếu chủ sản phẩm đã duyệt ngoại lệ (ghi trong reviews/), chạy lại với --ngoai-le.');
}

// ---- Ghi ZIP -------------------------------------------------------------
function dosDateTime(date) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const day = ((Math.max(date.getFullYear(), 1980) - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, day };
}

const locals = [];
const centrals = [];
let offset = 0;

for (const f of files) {
  const data = readFileSync(f.full);
  const packed = deflateRawSync(data, { level: 9 });
  const useDeflate = packed.length < data.length;
  const body = useDeflate ? packed : data;
  const nameBuf = Buffer.from(`${name}/${f.rel}`, 'utf8');
  const crc = crc32(data);
  const { time, day } = dosDateTime(statSync(f.full).mtime);
  const method = useDeflate ? 8 : 0;

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);          // version needed
  local.writeUInt16LE(0x0800, 6);      // UTF-8 file names
  local.writeUInt16LE(method, 8);
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(day, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  local.writeUInt16LE(0, 28);
  locals.push(local, nameBuf, body);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);        // version made by
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x0800, 8);
  central.writeUInt16LE(method, 10);
  central.writeUInt16LE(time, 12);
  central.writeUInt16LE(day, 14);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(body.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(nameBuf.length, 28);
  central.writeUInt32LE(offset, 42);
  centrals.push(central, nameBuf);

  offset += local.length + nameBuf.length + body.length;
}

const centralBuf = Buffer.concat(centrals);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralBuf.length, 12);
end.writeUInt32LE(offset, 16);
const zip = Buffer.concat([...locals, centralBuf, end]);

if (zip.length >= ZIP_LIMIT && !allowException) {
  fail(`ZIP ${zip.length} byte, vượt ngưỡng W06 (< ${ZIP_LIMIT} byte). Không ghi file.\n` +
    '      Rút gọn nội dung (không minify) hoặc chạy với --ngoai-le nếu ngoại lệ đã được duyệt.');
}

const out = resolve(HERE, '..', name, `${name}.zip`);
if (existsSync(out)) rmSync(out);
writeFileSync(out, zip);

// ---- Đọc lại ZIP và so với source ---------------------------------------
const written = readFileSync(out);
const eocd = written.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
let p = written.readUInt32LE(eocd + 16);
const count = written.readUInt16LE(eocd + 10);
for (let i = 0; i < count; i++) {
  const method = written.readUInt16LE(p + 10);
  const csize = written.readUInt32LE(p + 20);
  const nlen = written.readUInt16LE(p + 28);
  const xlen = written.readUInt16LE(p + 30);
  const clen = written.readUInt16LE(p + 32);
  const lho = written.readUInt32LE(p + 42);
  const entry = written.subarray(p + 46, p + 46 + nlen).toString('utf8');
  if (entry.includes('\\')) fail(`Đường dẫn trong ZIP chứa dấu \\: ${entry}`);
  const dataStart = lho + 30 + written.readUInt16LE(lho + 26) + written.readUInt16LE(lho + 28);
  const raw = written.subarray(dataStart, dataStart + csize);
  const content = method === 8 ? inflateRawSync(raw) : raw;
  const original = readFileSync(join(src, entry.slice(name.length + 1)));
  if (!content.equals(original)) fail(`Nội dung trong ZIP khác source: ${entry}`);
  p += 46 + nlen + xlen + clen;
}

const sha = createHash('sha256').update(written).digest('hex');
console.log(`${name}.zip  ${written.length} byte  ->  ${out}`);
console.log(`SHA-256  ${sha}`);
console.log(`${files.length} file (đã đọc lại, khớp byte với source):`);
for (const f of files) console.log(`  ${name}/${f.rel}`);
if (extra.length) console.log(`Ngoại lệ (--ngoai-le): ${extra.join(', ')}`);
if (written.length >= ZIP_LIMIT) console.log(`Ngoại lệ W06: ZIP ${written.length} byte >= ${ZIP_LIMIT}.`);
