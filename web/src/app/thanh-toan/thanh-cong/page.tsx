import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { COMPANY } from '@/lib/company';
import PaymentResult from '../_result';

export const metadata: Metadata = { title: 'Thanh toán — Forge Zone' };

// Đọc trạng thái đơn ở mỗi lần mở, không dựng sẵn.
export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  // Cổng chuyển khách về đây ngay khi họ bấm xong, thường TRƯỚC khi webhook tới
  // — trang này không phải bằng chứng đã thu tiền. Trước đây luôn báo "đã nhận
  // được thanh toán", kể cả khi tiền chưa về hay khách chuyển thiếu. Nay đọc
  // trạng thái thật của đơn; chỉ webhook mới đổi được trạng thái đó.
  const row = order
    ? await prisma.order.findUnique({ where: { id: order }, select: { status: true } })
    : null;

  if (row?.status === 'PAID') {
    return (
      <PaymentResult
        tone="ok"
        title="Cảm ơn bạn!"
        body="Chúng tôi đã nhận được thanh toán. Link tải giao diện đã được gửi tới email của bạn — kiểm tra cả hộp thư rác nếu chưa thấy."
        orderCode={order}
        cta={{ href: '/don-hang', label: 'Xem đơn hàng' }}
      />
    );
  }

  if (row?.status === 'FAILED') {
    return (
      <PaymentResult
        tone="warn"
        title="Chưa xác nhận được thanh toán"
        body={`Số tiền nhận được chưa khớp với đơn hàng. Nếu bạn đã chuyển khoản, hãy gửi mã đơn bên dưới tới ${COMPANY.email} để chúng tôi kiểm tra.`}
        orderCode={order}
        cta={{ href: '/lien-he', label: 'Liên hệ' }}
      />
    );
  }

  return (
    <PaymentResult
      tone="ok"
      title="Đang xác nhận thanh toán"
      body={`Ngân hàng thường báo về trong vài giây đến vài phút. Khi nhận được, link tải sẽ được gửi tới email của bạn. Nếu đã chuyển khoản mà sau 15 phút chưa thấy email, hãy gửi mã đơn bên dưới tới ${COMPANY.email}.`}
      orderCode={order}
      cta={{ href: '/', label: 'Về trang chủ' }}
    />
  );
}
