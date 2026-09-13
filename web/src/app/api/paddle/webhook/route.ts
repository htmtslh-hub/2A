/* Webhook Paddle.

   Giống PayOS: đây là nguồn xác nhận thanh toán duy nhất. Chữ ký được tính trên
   RAW body nên phải đọc bằng req.text(), không được req.json() rồi stringify
   lại — thứ tự khoá và khoảng trắng đổi là chữ ký sai ngay. */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  readPaddleAdjustment,
  readPaddleEvent,
  verifyPaddleWebhook,
} from '@/lib/payments/paddle';
import { fulfilOrder, revokeOrder } from '@/lib/fulfil';

/** Hoàn tiền / chargeback -> thu lại quyền tải. */
async function handleAdjustment(payload: { data?: Record<string, unknown> }) {
  const adj = readPaddleAdjustment(payload);

  if (!adj.revoke) {
    console.log('[paddle-webhook] adjustment không cần thu hồi:', adj.adjustmentId, adj.note);
    return NextResponse.json({ received: true });
  }

  const order = adj.txnId
    ? await prisma.order.findUnique({ where: { paddleTxnId: adj.txnId } })
    : null;

  if (!order) {
    // Adjustment không có custom_data nên không tách được bằng orderId như
    // transaction. Không khớp đơn nào thì gần như chắc là của dự án dùng
    // chung tài khoản Paddle.
    console.log('[paddle-webhook] hoàn tiền không khớp đơn nào (có thể của dự án khác):', adj.txnId);
    return NextResponse.json({ received: true });
  }

  const result = await revokeOrder(order);
  console.log('[paddle-webhook] thu hồi đơn', order.id, adj.note, '->', result);
  return NextResponse.json({ received: true });
}

export async function POST(req: Request) {
  const raw = await req.text();

  let payload;
  try {
    payload = verifyPaddleWebhook(raw, req.headers.get('paddle-signature'));
  } catch (err) {
    console.error('[paddle-webhook] xác thực thất bại:', err);
    return NextResponse.json({ error: 'chữ ký không hợp lệ' }, { status: 401 });
  }

  if (String(payload?.event_type ?? '').startsWith('adjustment.')) {
    return handleAdjustment(payload);
  }

  const event = readPaddleEvent(payload);

  // Paddle gửi nhiều loại sự kiện; chỉ quan tâm giao dịch đã hoàn tất.
  if (!event.paid) return NextResponse.json({ received: true });

  // Ưu tiên đối chiếu bằng id đơn của mình (gửi kèm trong custom_data), rồi mới
  // đến transaction id — phòng khi transaction bị tạo lại.
  const order =
    (event.orderId ? await prisma.order.findUnique({ where: { id: event.orderId } }) : null) ??
    (event.txnId ? await prisma.order.findUnique({ where: { paddleTxnId: event.txnId } }) : null);

  if (!order) {
    // Tài khoản Paddle này dùng chung với dự án khác (Habit Mastery), nên
    // webhook nhận cả giao dịch của bên đó. Mọi đơn của mình đều gửi kèm
    // `custom_data.orderId`; thiếu nó thì là của dự án khác, không phải lỗi.
    // Ghi ở mức log để lỗi thật (có orderId mà không thấy đơn) không bị chìm.
    if (!event.orderId) {
      console.log('[paddle-webhook] bỏ qua giao dịch của dự án khác:', event.txnId);
    } else {
      console.error('[paddle-webhook] không tìm thấy đơn', event.orderId, event.txnId);
    }
    return NextResponse.json({ received: true });
  }

  // Ghi lại transaction id nếu lúc tạo đơn chưa kịp lưu.
  if (event.txnId && order.paddleTxnId !== event.txnId) {
    await prisma.order
      .update({ where: { id: order.id }, data: { paddleTxnId: event.txnId } })
      .catch(() => {});
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  await fulfilOrder(order, { amount: event.amount, currency: event.currency }, baseUrl);

  return NextResponse.json({ received: true });
}
