import type { Metadata } from 'next';
import PaymentResult from '../_result';

export const metadata: Metadata = { title: 'Đã huỷ thanh toán — Forge Zone' };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <PaymentResult
      tone="warn"
      title="Đơn hàng chưa hoàn tất"
      body="Bạn đã huỷ ở bước thanh toán nên chưa bị trừ tiền. Quay lại bảng giá bất cứ lúc nào để tiếp tục."
      orderCode={order}
      cta={{ href: '/?tab=pricing', label: 'Xem lại bảng giá' }}
    />
  );
}
