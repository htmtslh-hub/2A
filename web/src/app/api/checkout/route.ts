/* Tạo đơn hàng + link thanh toán.

   Cổng nào là do thị trường quyết định: khách xem tiếng Việt trả VNĐ qua PayOS,
   khách quốc tế trả USD qua Paddle. Khách vẫn ép được cổng khác bằng tham số
   `provider` nếu sau này muốn cho chọn. */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { adapterFor } from '@/lib/payments';
import { COMPANY } from '@/lib/company';
import {
  currencyForProvider,
  priceOf,
  productName,
  providerForLang,
  templateExists,
  type Lang,
  type Provider,
} from '@/lib/catalog';

const PADDLE_PAUSED: Record<Lang, string> = {
  vi: `Thanh toán thẻ quốc tế đang tạm ngưng. Vui lòng liên hệ ${COMPANY.email} để mua.`,
  en: `Card payments are temporarily unavailable. Please contact ${COMPANY.email} to purchase.`,
  zh: `国际银行卡支付暂时不可用。如需购买，请联系 ${COMPANY.email}。`,
};

/** Hai URL có cùng tên miền không (coi www. là một). */
function sameSite(a: string, b: string): boolean {
  const host = (u: string) => {
    try {
      return new URL(u).hostname.replace(/^www\./, '');
    } catch {
      return null;
    }
  };
  const ha = host(a);
  return ha !== null && ha === host(b);
}

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

    // Trang thanh toán Paddle phải nằm trên chính web này. Tài khoản Paddle
    // dùng chung với Habit Mastery, và khi chưa đặt PADDLE_CHECKOUT_URL thì
    // Paddle trả về Default payment link của tài khoản — đang là
    // habit-mastery.com. Chuyển khách sang đó thì họ rơi vào trang đăng nhập
    // của một sản phẩm khác, không có hộp thanh toán nào mở ra (đã thử thật
    // ngày 13/09/2026). Thà báo tạm ngưng còn hơn đẩy khách đi lạc.
    if (provider === 'PADDLE' && !sameSite(result.checkoutUrl, baseUrl)) {
      console.error(
        '[checkout] Paddle trả link ngoài web, đã chặn:',
        result.checkoutUrl,
        '— duyệt tên miền rồi đặt PADDLE_CHECKOUT_URL'
      );
      await prisma.order.update({ where: { id: order.id }, data: { status: 'FAILED' } });
      return NextResponse.json({ error: PADDLE_PAUSED[lang as Lang] }, { status: 503 });
    }

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
