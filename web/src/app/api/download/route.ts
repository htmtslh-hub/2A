/* Giao file giao diện.

   Hai lối vào:
   - ?token=…  link dùng một lần gửi qua email sau khi thanh toán
   - đã đăng nhập + ?id=t5  tải lại mẫu đã mua bất cứ lúc nào

   File thật đặt trong thư mục product/giao-dien-web/<slug>/ (ngoài public/ để không ai tải
   trực tiếp được). Chưa có file thì trả 404 kèm lời nhắc. */
import { NextResponse } from 'next/server';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { Readable } from 'node:stream';
import path from 'node:path';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { templateExists, templateFile } from '@/lib/catalog';

const TEMPLATE_DIR = path.join(process.cwd(), 'product', 'giao-dien-web');

function fileFor(templateId: string) {
  // Qua templateFile() vì mã trong danh mục và tên file đóng gói có thể khác
  // nhau — xem TEMPLATE_FILE trong lib/catalog.
  const slug = templateFile(templateId);
  return path.join(TEMPLATE_DIR, slug, `${slug}.zip`);
}

function serve(templateId: string) {
  const file = fileFor(templateId);
  if (!existsSync(file)) {
    return NextResponse.json(
      {
        error: `Chưa có file cho "${templateId}". Đặt file tại product/giao-dien-web/${templateFile(templateId)}/${templateFile(templateId)}.zip`,
      },
      { status: 404 }
    );
  }
  const stream = Readable.toWeb(createReadStream(file)) as ReadableStream;
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Length': String(statSync(file).size),
      'Content-Disposition': `attachment; filename="forgezone-${templateId}.zip"`,
      'Cache-Control': 'private, no-store',
    },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const id = url.searchParams.get('id');

  /* --- mẫu miễn phí từ form thu email --- */
  if (url.searchParams.get('free') === '1') {
    return serve('free-sample');
  }

  /* --- link một lần từ email --- */
  if (token) {
    const row = await prisma.downloadToken.findUnique({ where: { token } });
    if (!row) return NextResponse.json({ error: 'Link không hợp lệ.' }, { status: 404 });
    // Link cũ cấp cho đơn trọn bộ trỏ tới 'bundle' — không có file đó. Đưa về
    // trang đơn hàng, nơi mỗi mẫu trong trọn bộ có nút tải riêng.
    if (row.templateId === 'bundle') {
      return NextResponse.redirect(new URL('/don-hang', req.url));
    }
    if (row.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Link đã hết hạn.' }, { status: 410 });
    }
    await prisma.downloadToken.update({
      where: { token },
      data: { usedAt: row.usedAt ?? new Date() },
    });
    return serve(row.templateId);
  }

  /* --- tải lại bằng tài khoản --- */
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Cần đăng nhập để tải.' }, { status: 401 });
  }
  if (!id) {
    return NextResponse.json({ error: 'Thiếu tham số id.' }, { status: 400 });
  }
  // Người mua trọn bộ được mở mọi mã, kể cả ô lấp chỗ chưa có file — chặn ở
  // đây để họ nhận câu báo rõ ràng thay vì lỗi thiếu file.
  if (!templateExists(id)) {
    return NextResponse.json({ error: 'Không tìm thấy giao diện này.' }, { status: 404 });
  }

  // Mua trọn bộ (templateId = null) thì mở khoá mọi mẫu.
  const owned = await prisma.purchase.findFirst({
    where: { userId, OR: [{ templateId: id }, { templateId: null }] },
  });
  if (!owned) {
    return NextResponse.json({ error: 'Bạn chưa mua giao diện này.' }, { status: 403 });
  }

  return serve(id);
}
