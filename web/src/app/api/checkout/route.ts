/* Tạo đơn hàng + link thanh toán.

   Cổng nào là do thị trường quyết định: khách xem tiếng Việt trả VNĐ qua PayOS,
   khách quốc tế trả USD qua Paddle. Khách vẫn ép được cổng khác bằng tham số
   `provider` nếu sau này muốn cho chọn. */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { adapterFor } from '@/lib/payments';
import {
  currencyForProvider,
  priceOf,
  productName,
  providerForLang,
  templateExists,
  type Lang,
  type Provider,
} from '@/lib/catalog';

const schema = z.object({
  kind: z.enum(['TEMPLATE', 'BUNDLE']),
  templateId: z.string().max(10).optional(),
  email: z.string().email(),
  name: z.string().trim().max(120).optional(),
  lang: z.enum(['vi', 'en', 'zh']).default('vi'),
  /** Bỏ trống thì tự chọn theo ngôn ngữ. */
  provider: z.enum(['PAYOS', 'PADDLE']).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dữ liệu đơn hàng không hợp lệ.' }, { status: 400 });
  }

  const { kind, templateId, email, name, lang } = parsed.data;

  if (kind === 'TEMPLATE' && (!templateId || !templateExists(templateId))) {
    return NextResponse.json({ error: 'Không tìm thấy giao diện này.' }, { status: 400 });
  }

  const provider: Provider = parsed.data.provider ?? providerForLang(lang as Lang);
  const adapter = adapterFor(provider);

  if (!adapter.configured()) {
    const which = provider === 'PAYOS' ? 'PayOS' : 'Paddle';
    return NextResponse.json(
      { error: `Cổng thanh toán ${which} chưa được cấu hình. Xem hướng dẫn trong .env.example.` },
      { status: 503 }
    );
  }

  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id ?? null;

  const currency = currencyForProvider(provider);
  const amount = priceOf(kind, currency, templateId);
  const label = productName(kind, templateId ?? null, lang as Lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

  // Lưu đơn trước khi gọi cổng: webhook về mà chưa có đơn thì không đối soát được.
  const order = await prisma.order.create({
    data: {
      provider,
      kind,
      templateId: kind === 'TEMPLATE' ? templateId! : null,
      amount,
      currency,
      description: label,
      lang,
      buyerEmail: email.toLowerCase(),
      buyerName: name ?? null,
      userId,
    },
  });

  try {
    const result = await adapter.createCheckout({
      orderId: order.id,
      kind,
      templateId: order.templateId,
      amount,
      currency,
      productName: label,
      buyerEmail: email,
      buyerName: name,
      lang: lang as Lang,
      baseUrl,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        checkoutUrl: result.checkoutUrl,
        ...(provider === 'PAYOS'
          ? { payosOrderCode: BigInt(result.reference) }
          : { paddleTxnId: result.reference }),
      },
    });

    return NextResponse.json({ checkoutUrl: result.checkoutUrl, orderId: order.id, provider });
  } catch (err) {
    await prisma.order.update({ where: { id: order.id }, data: { status: 'FAILED' } });
    console.error(`[checkout] ${provider} lỗi:`, err);
    return NextResponse.json(
      { error: 'Không tạo được link thanh toán. Vui lòng thử lại.' },
      { status: 502 }
    );
  }
}
