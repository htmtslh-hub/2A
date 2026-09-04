/* Cổng Paddle — khách quốc tế, thẻ quốc tế, thu USD.

   Paddle là merchant of record: họ đứng tên bán, tự tính và nộp thuế VAT/GST ở
   từng nước, rồi chuyển tiền về cho mình theo kỳ (wire transfer hoặc Payoneer).
   Vì thế không cần pháp nhân nước ngoài.

   Luồng: tạo transaction qua API -> Paddle trả về link checkout -> chuyển khách
   sang đó -> Paddle gọi webhook khi thu tiền xong.

   Tài liệu: https://developer.paddle.com/api-reference/transactions/create-transaction */
import crypto from 'node:crypto';
import type { CreateCheckoutInput, CreateCheckoutResult, PaymentProviderAdapter } from './types';
import type { Currency } from '@/lib/catalog';

const LIVE = 'https://api.paddle.com';
const SANDBOX = 'https://sandbox-api.paddle.com';

function apiBase(): string {
  // Khoá sandbox của Paddle luôn bắt đầu bằng 'pdl_sdbx_'.
  const key = process.env.PADDLE_API_KEY ?? '';
  return key.startsWith('pdl_sdbx_') ? SANDBOX : LIVE;
}

export const paddleConfigured = () => Boolean(process.env.PADDLE_API_KEY);

/** Gọi API Paddle, ném lỗi kèm nội dung để log đọc được. */
async function paddleFetch(path: string, init: RequestInit) {
  const key = process.env.PADDLE_API_KEY;
  if (!key) throw new Error('Thiếu PADDLE_API_KEY — xem .env.example');

  const res = await fetch(apiBase() + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`Paddle ${path} lỗi ${res.status}: ${JSON.stringify(body?.error ?? body)}`);
  }
  return body;
}

export const paddleAdapter: PaymentProviderAdapter = {
  name: 'PADDLE',

  configured: paddleConfigured,

  async createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
    // Giá khai trực tiếp trong transaction (non-catalog), nên không phải tạo
    // sẵn sản phẩm trong dashboard Paddle. Nếu bạn đã có sản phẩm trong catalog
    // thì đặt PADDLE_PRODUCT_ID để gắn doanh thu vào đúng sản phẩm đó.
    const productId = process.env.PADDLE_PRODUCT_ID;

    const price: Record<string, unknown> = {
      name: input.productName,
      description: input.productName,
      tax_mode: 'account_setting',
      unit_price: {
        // Paddle nhận đơn vị nhỏ nhất, dạng chuỗi.
        amount: String(input.amount),
        currency_code: input.currency,
      },
    };

    if (productId) {
      // gắn vào sản phẩm có sẵn trong catalog
    } else {
      price.product = { name: 'Agentic — giao diện web', tax_category: 'standard' };
    }

    const payload = {
      items: [{ quantity: 1, price, ...(productId ? { product_id: productId } : {}) }],
      // Gửi kèm id đơn của mình để webhook đối chiếu chắc chắn.
      custom_data: { orderId: input.orderId },
      checkout: {
        url: `${input.baseUrl}/thanh-toan/thanh-cong?order=${input.orderId}`,
      },
    };

    const body = await paddleFetch('/transactions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const txnId: string | undefined = body?.data?.id;
    const url: string | undefined = body?.data?.checkout?.url;

    if (!txnId || !url) {
      throw new Error('Paddle không trả về transaction id hoặc link checkout');
    }

    return { checkoutUrl: url, reference: txnId };
  },
};

/* ===== xác thực webhook =====

   Paddle ký mỗi webhook bằng header:
     Paddle-Signature: ts=<unix>;h1=<hmac sha256 hex>
   Chuỗi được ký là `<ts>:<raw body>`, khoá là secret của endpoint webhook. */

export interface PaddleWebhookEvent {
  eventType: string;
  txnId: string;
  orderId: string | null;
  amount: number;
  currency: Currency;
  paid: boolean;
}

export function verifyPaddleWebhook(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) throw new Error('Thiếu PADDLE_WEBHOOK_SECRET — xem .env.example');
  if (!signatureHeader) throw new Error('Thiếu header Paddle-Signature');

  const parts = Object.fromEntries(
    signatureHeader.split(';').map((p) => {
      const i = p.indexOf('=');
      return [p.slice(0, i), p.slice(i + 1)];
    })
  );
  const ts = parts.ts;
  const h1 = parts.h1;
  if (!ts || !h1) throw new Error('Header Paddle-Signature sai định dạng');

  const expected = crypto.createHmac('sha256', secret).update(`${ts}:${rawBody}`).digest('hex');

  // So sánh theo thời gian cố định để không lộ thông tin qua thời gian phản hồi.
  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(h1, 'hex');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    throw new Error('Chữ ký Paddle không hợp lệ');
  }

  // Chặn tấn công phát lại: bỏ qua webhook quá cũ.
  const ageSeconds = Math.abs(Date.now() / 1000 - Number(ts));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 60 * 5) {
    throw new Error('Webhook Paddle quá hạn');
  }

  return JSON.parse(rawBody);
}

/** Rút những thông tin cần dùng từ payload webhook. */
export function readPaddleEvent(payload: {
  event_type?: string;
  data?: Record<string, unknown>;
}): PaddleWebhookEvent {
  const data = (payload.data ?? {}) as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  const totals = data.details?.totals ?? {};

  return {
    eventType: payload.event_type ?? '',
    txnId: String(data.id ?? ''),
    orderId: (data.custom_data?.orderId as string | undefined) ?? null,
    amount: Number(totals.grand_total ?? totals.total ?? 0),
    currency: (totals.currency_code ?? data.currency_code ?? 'USD') as Currency,
    // Paddle báo hoàn tất bằng transaction.completed / status 'completed'.
    paid: payload.event_type === 'transaction.completed' || data.status === 'completed',
  };
}
