/* Tạo đơn hàng + link thanh toán PayOS. */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { payos, payosConfigured } from '@/lib/payos';
import {
  newOrderCode,
  priceOf,
  shortDescription,
  templateExists,
  templateName,
  type Lang,
} from '@/lib/catalog';

const schema = z.object({
  kind: z.enum(['TEMPLATE', 'BUNDLE']),
  templateId: z.string().max(10).optional(),
  email: z.string().email(),
  name: z.string().trim().max(120).optional(),
  lang: z.enum(['vi', 'en', 'zh']).default('vi'),
});

export async function POST(req: Request) {
  if (!payosConfigured()) {
    return NextResponse.json(
      { error: 'Cổng thanh toán chưa được cấu hình. Xem hướng dẫn trong .env.example.' },
      { status: 503 }
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dữ liệu đơn hàng không hợp lệ.' }, { status: 400 });
  }

  const { kind, templateId, email, name, lang } = parsed.data;

  if (kind === 'TEMPLATE' && (!templateId || !templateExists(templateId))) {
    return NextResponse.json({ error: 'Không tìm thấy giao diện này.' }, { status: 400 });
  }

  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id ?? null;

  const amount = priceOf(kind, templateId);
  const orderCode = newOrderCode();
  const base = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

  const productName =
    kind === 'BUNDLE'
      ? 'Trọn bộ thư viện'
      : templateName(templateId!, lang as Lang);

  // Lưu đơn trước khi gọi PayOS: webhook về mà chưa có đơn thì không đối soát được.
  const order = await prisma.order.create({
    data: {
      payosOrderCode: BigInt(orderCode),
      kind,
      templateId: kind === 'TEMPLATE' ? templateId! : null,
      amount,
      description: productName,
      lang,
      buyerEmail: email.toLowerCase(),
      buyerName: name ?? null,
      userId,
    },
  });

  try {
    const link = await payos().paymentRequests.create({
      orderCode,
      amount,
      description: shortDescription(kind, templateId),
      returnUrl: `${base}/thanh-toan/thanh-cong?order=${orderCode}`,
      cancelUrl: `${base}/thanh-toan/huy?order=${orderCode}`,
      buyerEmail: email,
      buyerName: name,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { checkoutUrl: link.checkoutUrl },
    });

    return NextResponse.json({ checkoutUrl: link.checkoutUrl, orderCode });
  } catch (err) {
    await prisma.order.update({ where: { id: order.id }, data: { status: 'FAILED' } });
    console.error('[checkout] PayOS lỗi:', err);
    return NextResponse.json(
      { error: 'Không tạo được link thanh toán. Vui lòng thử lại.' },
      { status: 502 }
    );
  }
}
