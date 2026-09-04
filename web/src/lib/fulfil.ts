/* Xử lý sau khi một đơn được xác nhận đã thanh toán.

   Dùng chung cho cả PayOS lẫn Paddle: đánh dấu đơn, mở quyền tải, cấp link tải
   một lần và gửi email. Viết một chỗ để hai cổng không lệch hành vi. */
import crypto from 'node:crypto';
import type { Order, Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { sendMail, orderPaidEmail } from '@/lib/mail';
import { formatMoney, productName, type Currency, type Lang } from '@/lib/catalog';

/** Kết quả để route webhook biết trả gì về cho cổng thanh toán. */
export type FulfilResult = 'ok' | 'already-paid' | 'amount-mismatch';

export async function fulfilOrder(
  order: Order,
  reported: { amount: number; currency: Currency },
  baseUrl: string
): Promise<FulfilResult> {
  // Cổng có thể gửi lại cùng một sự kiện — xử lý xong rồi thì thôi.
  if (order.status === 'PAID') return 'already-paid';

  // Đối chiếu số tiền và loại tiền để chặn đơn bị sửa giá.
  if (reported.amount !== order.amount || reported.currency !== order.currency) {
    console.error(
      '[fulfil] số tiền lệch:',
      reported.amount,
      reported.currency,
      '!=',
      order.amount,
      order.currency
    );
    await prisma.order.update({ where: { id: order.id }, data: { status: 'FAILED' } });
    return 'amount-mismatch';
  }

  // Gắn đơn vào tài khoản có cùng email, nếu có.
  const user =
    (order.userId ? await prisma.user.findUnique({ where: { id: order.userId } }) : null) ??
    (await prisma.user.findUnique({ where: { email: order.buyerEmail } }));

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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

  // Có tài khoản thì cấp link tải gắn với tài khoản đó; không thì dẫn về trang chủ.
  let downloadUrl = `${baseUrl}/?tab=pricing`;
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
    downloadUrl = `${baseUrl}/api/download?token=${token}`;
  }

  const lang = order.lang as Lang;
  try {
    await sendMail({
      to: order.buyerEmail,
      ...orderPaidEmail({
        productName: productName(order.kind as 'TEMPLATE' | 'BUNDLE', order.templateId, lang),
        amountLabel: formatMoney(order.amount, order.currency as Currency, lang),
        downloadUrl,
        lang,
      }),
    });
  } catch (err) {
    // Email hỏng không được làm hỏng việc ghi nhận thanh toán.
    console.error('[fulfil] gửi mail thất bại:', err);
  }

  return 'ok';
}
