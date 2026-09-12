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
      price.product = { name: 'Forge Zone — giao diện web', tax_category: 'standard' };
    }

    const payload = {
      items: [{ quantity: 1, price, ...(productId ? { product_id: productId } : {}) }],
      // Gửi kèm id đơn của mình để webhook đối chiếu chắc chắn.
      custom_data: { orderId: input.orderId },
      // Cố tình KHÔNG gửi `checkout.url`: Paddle chỉ chấp nhận domain đã được
      // duyệt, truyền tay vào sẽ bị từ chối (transaction_checkout_url_domain_
      // is_not_approved). Bỏ trống thì Paddle tự lấy Default payment link của
      // tài khoản — khai một lần trong dashboard, trỏ về /thanh-toan/paddle.
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
  //
  // SDK chính thức của Paddle để cửa sổ 5 GIÂY, quá chặt với serverless —
  // một lần khởi động nguội là đủ làm rớt webhook thật. Dùng 5 phút, vẫn chặn
  // được phát lại và bằng mức Stripe đang dùng.
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

  // Đối chiếu bằng ĐƠN GIÁ MÌNH GỬI LÊN, không dùng details.totals.
  //
  // Paddle là merchant of record nên cách nó tách thuế phụ thuộc cấu hình tài
  // khoản và nước của khách, khiến các trường trong totals không ổn định:
  //   - đơn nháp, chưa biết nước khách:  subtotal 39900 + tax 4433 = 44333
  //   - đơn thật, giá đã gồm thuế:       subtotal 33250 + tax 6650 = 39900
  // Cùng một đơn $399 mà subtotal lúc 39900 lúc 33250, grand_total lúc 44333
  // lúc 39900. Lấy trường nào trong đó cũng có lúc sai, và sai thì đơn đã trả
  // tiền bị đánh dấu FAILED — khách mất tiền, không nhận được hàng.
  //
  // `items[].price.unit_price.amount` chính là con số mình gửi khi tạo
  // transaction, nên luôn khớp với số tiền lưu trong đơn.
  const items: any[] = Array.isArray(data.items) ? data.items : []; // eslint-disable-line @typescript-eslint/no-explicit-any
  const itemsTotal = items.reduce(
    (sum, it) => sum + Number(it?.price?.unit_price?.amount ?? 0) * Number(it?.quantity ?? 1),
    0
  );

  return {
    eventType: payload.event_type ?? '',
    txnId: String(data.id ?? ''),
    orderId: (data.custom_data?.orderId as string | undefined) ?? null,
    // Dự phòng bằng `total` (số khách thật sự trả) nếu payload thiếu items.
    amount: itemsTotal || Number(totals.total ?? totals.grand_total ?? 0),
    currency: (totals.currency_code ?? data.currency_code ?? 'USD') as Currency,
    // Paddle báo hoàn tất bằng transaction.completed / status 'completed'.
    paid: payload.event_type === 'transaction.completed' || data.status === 'completed',
  };
}
