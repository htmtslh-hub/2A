/* Cổng PayOS — khách Việt Nam, chuyển khoản VietQR, thu VNĐ. */
import { PayOS } from '@payos/node';
import { newOrderCode, shortDescription } from '@/lib/catalog';
import type { CreateCheckoutInput, CreateCheckoutResult, PaymentProviderAdapter } from './types';

let client: PayOS | null = null;

export function payos(): PayOS {
  if (client) return client;

  const clientId = process.env.PAYOS_CLIENT_ID;
  const apiKey = process.env.PAYOS_API_KEY;
  const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

  if (!clientId || !apiKey || !checksumKey) {
    throw new Error(
      'Thiếu cấu hình PayOS (PAYOS_CLIENT_ID / PAYOS_API_KEY / PAYOS_CHECKSUM_KEY) — xem .env.example'
    );
  }

  client = new PayOS({ clientId, apiKey, checksumKey });
  return client;
}

export const payosAdapter: PaymentProviderAdapter = {
  name: 'PAYOS',

  configured: () =>
    Boolean(
      process.env.PAYOS_CLIENT_ID && process.env.PAYOS_API_KEY && process.env.PAYOS_CHECKSUM_KEY
    ),

  async createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
    // PayOS định danh đơn bằng một số nguyên do mình sinh, không phải id chuỗi.
    const orderCode = newOrderCode();

    const link = await payos().paymentRequests.create({
      orderCode,
      amount: input.amount, // VNĐ, đơn vị đồng
      description: shortDescription(input.kind, input.templateId),
      returnUrl: `${input.baseUrl}/thanh-toan/thanh-cong?order=${input.orderId}`,
      cancelUrl: `${input.baseUrl}/thanh-toan/huy?order=${input.orderId}`,
      buyerEmail: input.buyerEmail,
      buyerName: input.buyerName ?? undefined,
    });

    return { checkoutUrl: link.checkoutUrl, reference: String(orderCode) };
  },
};
