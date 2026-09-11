/* Chụp ảnh preview cho các mẫu trong _design/templates/.
   Đầu ra: web/public/previews/<tên mẫu>.webp, 698x524 khớp ảnh đã có sẵn.

   Dùng:  node _design/anh-preview.mjs              (tất cả các mẫu)
          node _design/anh-preview.mjs kinetiq      (một mẫu)

   Cần Chromium của Playwright. Chưa có thì chạy:
       npx playwright install chromium --only-shell

   Tự dựng máy chủ tĩnh trong tiến trình nên không phụ thuộc vào
   .claude/launch.json — chạy được ở bất cứ đâu. */
import { createServer } from 'node:http';
import { execFileSync, spawn } from 'node:child_process';
import { readFile, readdir, mkdir, rm, stat } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, 'templates');
const OUT = resolve(HERE, '../web/public/previews');
const TMP = resolve(HERE, '.anh-tam');

/** Bề rộng cửa sổ khi chụp. Gấp đôi ảnh đầu ra để chữ không bị rỗ. */
const SHOT = { w: 1396, h: 1047 };
const FINAL_W = 698;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

function serve(root) {
  return new Promise((ok) => {
    const s = createServer(async (req, res) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (p.endsWith('/')) p += 'index.html';
      const file = join(root, p);
      // Chặn đi ngược ra ngoài thư mục gốc.
      if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
      try {
        res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
        res.end(await readFile(file));
      } catch {
        res.writeHead(404).end('không thấy');
      }
    });
    s.listen(0, '127.0.0.1', () => ok({ port: s.address().port, close: () => s.close() }));
  });
}

const kb = (p) => Math.round(statSync(p).size / 1024);

async function shoot(name) {
  const dir = resolve(SRC, name);
  if (!existsSync(join(dir, 'index.html'))) {
    console.warn(`  bỏ qua ${name} — không có index.html`);
    return;
  }

  const srv = await serve(dir);
  const png = resolve(TMP, `${name}.png`);
  const webp = resolve(OUT, `${name}.webp`);

  try {
    // Phải chạy BẤT ĐỒNG BỘ. execFileSync chặn event loop, mà máy chủ tĩnh
    // ở trên chạy cùng tiến trình — chặn là nó không trả lời được request
    // nào và Playwright chờ đến hết giờ.
    //
    // shell:true trên Windows vì npx là tệp .cmd; qua shell thì đường dẫn có
    // dấu cách phải tự bọc nháy, mà thư mục dự án này có cả dấu cách lẫn dấu
    // tiếng Việt.
    const win = process.platform === 'win32';
    const q = (v) => (win ? `"${v}"` : v);
    await new Promise((ok, fail) => {
      const p = spawn('npx', [
        '--yes', 'playwright@1.63.0', 'screenshot',
        '--browser=chromium',
        `--viewport-size=${SHOT.w},${SHOT.h}`,
        // Chờ font Google tải xong, không thì ảnh ra bằng font dự phòng.
        '--wait-for-timeout=4000',
        `http://127.0.0.1:${srv.port}`,
        q(png),
      ], { stdio: 'ignore', shell: win });
      p.on('error', fail);
      p.on('close', (code) => (code === 0 ? ok() : fail(new Error(`playwright thoát với mã ${code}`))));
    });
  } finally {
    srv.close();
  }

  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', png,
    '-vf', `scale=${FINAL_W}:-2`,
    '-quality', '80',
    webp,
  ]);

  console.log(`  ${name}.webp  ${kb(webp)}KB`);
}

const only = process.argv[2];
const names = only
  ? [only]
  : (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);

await mkdir(OUT, { recursive: true });
await mkdir(TMP, { recursive: true });

console.log(`Chụp ${names.length} mẫu:`);
for (const n of names) await shoot(n);
await rm(TMP, { recursive: true, force: true });
console.log('Xong. Đầu ra:', OUT);
