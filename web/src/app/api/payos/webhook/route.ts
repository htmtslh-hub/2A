/* Webhook PayOS: xác thực chữ ký, đánh dấu đơn đã trả, mở quyền tải và gửi mail.

   Đây là nguồn sự thật duy nhất về việc đã thanh toán — returnUrl mà khách được
   chuyển về chỉ là giao diện, không được dùng để mở khoá. */
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { prisma } from '@/lib/db';
import { payos } from '@/lib/payos';
import { sendMail, orderPaidEmail } from '@/lib/mail';
import { templateName, type Lang } from '@/lib/catalog';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'body không hợp lệ' }, { status: 400 });

  let data;
  try {
    // verify() kiểm tra chữ ký bằng checksum key; sai chữ ký sẽ ném lỗi.
    data = await payos().webhooks.verify(body);
  } catch (err) {
    console.error('[payos-webhook] chữ ký không hợp lệ:', err);
    return NextResponse.json({ error: 'chữ ký không hợp lệ' }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: { payosOrderCode: BigInt(data.orderCode) },
  });
  if (!order) {
    console.error('[payos-webhook] không tìm thấy đơn', data.orderCode);
    return NextResponse.json({ received: true });
  }

  // PayOS có thể gửi lại cùng một sự kiện — xử lý xong rồi thì thôi.
  if (order.status === 'PAID') return NextResponse.json({ received: true });

  // Đối chiếu số tiền để tránh đơn bị sửa giá.
  if (Number(data.amount) !== order.amount) {
    console.error('[payos-webhook] số tiền lệch', data.amount, '!=', order.amount);
    await prisma.order.update({ where: { id: order.id }, data: { status: 'FAILED' } });
    return NextResponse.json({ received: true });
  }

  // Gắn đơn vào tài khoản có cùng email, nếu có.
  const user =
    (order.userId ? await prisma.user.findUnique({ where: { id: order.userId } }) : null) ??
    (await prisma.user.findUnique({ where: { email: order.buyerEmail } }));

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: { status: 'PAID', paidAt: new Date(), userId: user?.id ?? order.userId },
    });

    if (user) {
      await tx.purchase.create({
        data: {
          userId: user.id,
          orderId: order.id,
          kind: order.kind,
          templateId: order.kind === 'BUNDLE' ? null : order.templateId,
        },
      });
    }
  });

  // Link tải: có tài khoản thì cấp token gắn với tài khoản đó.
  const base = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  let downloadUrl = `${base}/?tab=pricing`;

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    await prisma.downloadToken.create({
      data: {
        token,
        userId: user.id,
        templateId: order.templateId ?? 'bundle',
        expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
    });
    downloadUrl = `${base}/api/download?token=${token}`;
  }

  const productName =
    order.kind === 'BUNDLE'
      ? 'Trọn bộ thư viện'
      : templateName(order.templateId ?? '', order.lang as Lang);

  try {
    await sendMail({
      to: order.buyerEmail,
      ...orderPaidEmail({ productName, amount: order.amount, downloadUrl }),
    });
  } catch (err) {
    console.error('[payos-webhook] gửi mail thất bại:', err);
  }

  return NextResponse.json({ received: true });
}
