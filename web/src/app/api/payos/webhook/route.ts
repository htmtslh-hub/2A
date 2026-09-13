/* Webhook PayOS.

   Đây là nguồn sự thật duy nhất về việc đã thanh toán — returnUrl mà khách được
   chuyển về chỉ là giao diện, không được dùng để mở khoá. */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { payos } from '@/lib/payments/payos';
import { fulfilOrder } from '@/lib/fulfil';

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

  // Chữ ký đúng chưa có nghĩa là đã thu được tiền: PayOS báo thành công bằng
  // mã '00' ở cả gói tin lẫn phần data. Mã khác thì không được giao hàng.
  if (body.code !== '00' || data.code !== '00') {
    console.log('[payos-webhook] bỏ qua, mã không phải thành công:', body.code, data.code, data.orderCode);
    return NextResponse.json({ received: true });
  }

  const order = await prisma.order.findUnique({
    where: { payosOrderCode: BigInt(data.orderCode) },
  });
  if (!order) {
    console.error('[payos-webhook] không tìm thấy đơn', data.orderCode);
    return NextResponse.json({ received: true });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  await fulfilOrder(order, { amount: Number(data.amount), currency: 'VND' }, baseUrl);

  return NextResponse.json({ received: true });
}
