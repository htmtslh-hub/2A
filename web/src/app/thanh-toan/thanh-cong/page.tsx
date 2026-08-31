import type { Metadata } from 'next';
import PaymentResult from '../_result';

export const metadata: Metadata = { title: 'Thanh toán thành công — Agentic' };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <PaymentResult
      tone="ok"
      title="Cảm ơn bạn!"
      body="Chúng tôi đã nhận được thanh toán. Link tải giao diện đang được gửi tới email của bạn — kiểm tra cả hộp thư rác nếu chưa thấy."
      orderCode={order}
      cta={{ href: '/', label: 'Về trang chủ' }}
    />
  );
}
