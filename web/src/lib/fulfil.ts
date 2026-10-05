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
  // Đơn đã hoàn tiền cũng dừng ở đây: sau khi hoàn, giao dịch bên cổng vẫn ở
  // trạng thái completed, một webhook báo lại không được mở khoá file lần nữa.
  if (order.status === 'PAID' || order.status === 'REFUNDED') return 'already-paid';

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
  const items = order.kind === 'CART'
    ? await prisma.orderItem.findMany({ where: { orderId: order.id } })
    : [];
  if (order.kind === 'CART' && items.length === 0) {
    console.error('[fulfil] đơn giỏ hàng không có sản phẩm:', order.id);
    return 'amount-mismatch';
  }

  // Chốt đơn bằng một phép cập nhật có điều kiện, không dựa vào `order.status`
  // đọc từ trước. Cổng gửi lại webhook khi phản hồi chậm, và hai lần gửi chạy
  // song song đều thấy đơn chưa PAID — kiểm tra kiểu đọc-rồi-ghi sẽ cho cả hai
  // đi tiếp: tạo trùng quyền sở hữu, gửi hai email, hai link tải.
  const claimed = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const { count } = await tx.order.updateMany({
      where: { id: order.id, status: { notIn: ['PAID', 'REFUNDED'] } },
      data: { status: 'PAID', paidAt: new Date(), userId: user?.id ?? order.userId },
    });
    if (count === 0) return false;

    if (user && order.kind === 'CART') {
      await tx.purchase.createMany({
        data: items.map((item) => ({ userId: user.id, orderId: order.id, kind: 'TEMPLATE', templateId: item.templateId })),
      });
    } else if (user) {
      await tx.purchase.create({
        data: {
          userId: user.id,
          orderId: order.id,
          kind: order.kind,
          templateId: order.kind === 'BUNDLE' ? null : order.templateId,
        },
      });
    }
    return true;
  });

  if (!claimed) return 'already-paid';

  // Có tài khoản thì cấp link tải gắn với tài khoản đó; không thì dẫn về trang chủ.
  let downloadUrl = `${baseUrl}/?tab=pricing`;
  if (user && (order.kind === 'BUNDLE' || order.kind === 'CART')) {
    // Trọn bộ không có một file chung: trang đơn hàng liệt kê từng mẫu với nút
    // tải riêng. Trước đây cấp link tới 'bundle' — file không tồn tại, nên khách
    // trả tiền trọn bộ xong bấm link trong email nhận 404.
    downloadUrl = `${baseUrl}/don-hang`;
  } else if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    await prisma.downloadToken.create({
      data: {
        token,
        userId: user.id,
        templateId: order.templateId!,
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
        productName: order.kind === 'CART' ? items.map((item) => productName('TEMPLATE', item.templateId, lang)).join(', ') : productName(order.kind as 'TEMPLATE' | 'BUNDLE', order.templateId, lang),
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

/** Thu lại quyền tải khi đơn bị hoàn tiền hoặc bị khách đòi tiền qua ngân hàng.
 *
 *  'not-paid' nghĩa là đơn không ở trạng thái PAID — chưa từng giao, hoặc đã
 *  thu hồi rồi (cổng báo một lần hoàn tiền bằng nhiều sự kiện). */
export async function revokeOrder(order: Order): Promise<'ok' | 'not-paid'> {
  const cartItems = order.kind === 'CART'
    ? await prisma.orderItem.findMany({ where: { orderId: order.id }, select: { templateId: true } })
    : [];
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const { count } = await tx.order.updateMany({
      where: { id: order.id, status: 'PAID' },
      data: { status: 'REFUNDED' },
    });
    if (count === 0) return 'not-paid';

    // Quyền tải lại bằng tài khoản.
    await tx.purchase.deleteMany({ where: { orderId: order.id } });

    // Link tải trong email không gắn với đơn, chỉ gắn người mua + mẫu, nên cho
    // hết hạn mọi link còn dùng được của cặp đó. Nếu khách còn đơn khác mua
    // cùng mẫu thì vẫn tải lại được qua tài khoản, vì purchase của đơn kia còn.
    if (order.userId && order.kind !== 'BUNDLE') {
      const now = new Date();
      await tx.downloadToken.updateMany({
        where: {
          userId: order.userId,
          templateId: { in: order.kind === 'CART' ? cartItems.map((item) => item.templateId) : [order.templateId!] },
          expiresAt: { gt: now },
        },
        data: { expiresAt: now },
      });
    }
    return 'ok';
  });
}
