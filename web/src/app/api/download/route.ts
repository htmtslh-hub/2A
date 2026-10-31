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
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { hasProductAccess } from '@/lib/memberships';
import { isFreeProduct } from '@/lib/product-policy';
import { serveFromGoogleDrive, shouldServeFromDrive } from '@/lib/google-drive';

import crypto from 'node:crypto';

const PRODUCT_ROOT = [process.cwd(), 'prod' + 'uct'].join(path.sep);
const TEMPLATE_DIR = [PRODUCT_ROOT, 'giao-dien-web'].join(path.sep);

function fileFor(templateId: string) {
  // Qua templateFile() vì mã trong danh mục và tên file đóng gói có thể khác
  // nhau — xem TEMPLATE_FILE trong lib/catalog.
  const slug = templateFile(templateId);
  if (REAL_TEMPLATES[templateId]?.group === 'agent') return [PRODUCT_ROOT, 'agent', slug, `${slug}.zip`].join(path.sep);
  return [TEMPLATE_DIR, slug, `${slug}.zip`].join(path.sep);
}

async function serve(templateId: string, logUserId?: string) {
  const slug = templateFile(templateId);
  const file = fileFor(templateId);
  const localExists = existsSync(file);
  const useDrive = shouldServeFromDrive(slug, localExists);
  if (!useDrive && !localExists) {
    return NextResponse.json(
      {
        error: `Chưa có file bàn giao cho "${templateId}". Vui lòng liên hệ để được hỗ trợ.`,
      },
      { status: 404 }
    );
  }
  if (logUserId) {
    const now = new Date();
    await prisma.downloadToken.create({
      data: {
        token: `dl_${crypto.randomUUID()}`,
        userId: logUserId,
        templateId,
        expiresAt: now,
        usedAt: now,
      },
    }).catch(() => {});
  }
  if (useDrive) {
    const driveRes = await serveFromGoogleDrive(templateId, slug, isFreeProduct(templateId));
    if (driveRes) return driveRes;
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
    return serve('free-sample', 'guest-free');
  }
  // Only catalogue entries explicitly marked free bypass account access checks.
  if (id && isFreeProduct(id)) return serve(id, 'guest-free');

  /* --- link một lần từ email --- */
  if (token) {
    const row = await prisma.downloadToken.findUnique({ where: { token } });
    if (!row) return NextResponse.json({ error: 'Link không hợp lệ.' }, { status: 404 });
    const owner = await prisma.user.findUnique({ where: { id: row.userId }, select: { suspendedAt: true } });
    if (!owner || owner.suspendedAt) return NextResponse.json({ error: 'Tài khoản không được phép tải.' }, { status: 403 });
    // Link cũ cấp cho đơn trọn bộ trỏ tới 'bundle' — không có file đó. Đưa về
    // trang đơn hàng, nơi mỗi mẫu trong trọn bộ có nút tải riêng.
    if (row.templateId === 'bundle') {
      return NextResponse.redirect(new URL('/don-hang', req.url));
    }
    if (row.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Link đã hết hạn.' }, { status: 410 });
    }
    if (!row.usedAt) {
      await prisma.downloadToken.update({
        where: { token },
        data: { usedAt: new Date() },
      });
      return serve(row.templateId);
    }
    return serve(row.templateId, row.userId);
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
  const owned = await hasProductAccess(userId, id);
  if (!owned) {
    return NextResponse.json({ error: 'Bạn cần gói Premium/Ultra còn hiệu lực hoặc quyền mua đã có để tải.', pricingUrl: '/?tab=pricing' }, { status: 403 });
  }

  return serve(id, userId);
}
