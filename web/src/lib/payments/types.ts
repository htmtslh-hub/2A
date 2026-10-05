/* Giao diện chung cho các cổng thanh toán.

   Mỗi cổng chỉ cần làm hai việc: tạo link thanh toán, và xác thực webhook báo
   về. Phần còn lại (ghi đơn, mở quyền tải, gửi mail) dùng chung. */
import type { Currency, Kind, Lang } from '@/lib/catalog';

export interface CreateCheckoutInput {
  /** Id đơn trong database của mình — dùng để đối chiếu khi webhook về. */
  orderId: string;
  kind: Kind | 'CART';
  templateId: string | null;
  /** Đơn vị nhỏ nhất của loại tiền: VNĐ là đồng, USD là cent. */
  amount: number;
  currency: Currency;
  /** Tên hàng hiển thị cho khách. */
  productName: string;
  /** Các dòng hàng trong giỏ; Paddle hiển thị từng giao diện, PayOS thu tổng. */
  items?: { name: string; amount: number }[];
  buyerEmail: string;
  buyerName?: string | null;
  lang: Lang;
  /** Gốc URL của site, để dựng returnUrl / cancelUrl. */
  baseUrl: string;
}

export interface CreateCheckoutResult {
  checkoutUrl: string;
  /** Mã tham chiếu bên cổng thanh toán, lưu lại để đối chiếu webhook. */
  reference: string;
}

/** Kết quả sau khi xác thực chữ ký webhook. */
export interface VerifiedPayment {
  /** Mã tham chiếu bên cổng, khớp với `reference` lúc tạo. */
  reference: string;
  /** Số tiền cổng báo đã thu, để đối chiếu chống sửa giá. */
  amount: number;
  currency: Currency;
  /** true khi đơn đã thanh toán xong. */
  paid: boolean;
}

export interface PaymentProviderAdapter {
  readonly name: 'PAYOS' | 'PADDLE';
  /** Đã cấu hình đủ khoá chưa. */
  configured(): boolean;
  createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult>;
}
