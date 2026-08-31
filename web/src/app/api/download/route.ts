/* Giao file giao diện.

   Hai lối vào:
   - ?token=…  link dùng một lần gửi qua email sau khi thanh toán
   - đã đăng nhập + ?id=t5  tải lại mẫu đã mua bất cứ lúc nào

   File thật đặt trong thư mục private/templates/ (ngoài public/ để không ai tải
   trực tiếp được). Chưa có file thì trả 404 kèm lời nhắc. */
import { NextResponse } from 'next/server';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { Readable } from 'node:stream';
import path from 'node:path';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

const TEMPLATE_DIR = path.join(process.cwd(), 'private', 'templates');

function fileFor(templateId: string) {
  return path.join(TEMPLATE_DIR, `${templateId}.zip`);
}

function serve(templateId: string) {
  const file = fileFor(templateId);
  if (!existsSync(file)) {
    return NextResponse.json(
      {
        error: `Chưa có file cho "${templateId}". Đặt file tại private/templates/${templateId}.zip`,
      },
      { status: 404 }
    );
  }
  const stream = Readable.toWeb(createReadStream(file)) as ReadableStream;
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Length': String(statSync(file).size),
      'Content-Disposition': `attachment; filename="agentic-${templateId}.zip"`,
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

  // Mua trọn bộ (templateId = null) thì mở khoá mọi mẫu.
  const owned = await prisma.purchase.findFirst({
    where: { userId, OR: [{ templateId: id }, { templateId: null }] },
  });
  if (!owned) {
    return NextResponse.json({ error: 'Bạn chưa mua giao diện này.' }, { status: 403 });
  }

  return serve(id);
}
