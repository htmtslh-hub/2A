/* Trang thanh toán của Paddle ("default payment link").

   Paddle không host sẵn trang thanh toán: `checkout.url` mà API trả về chính là
   URL này kèm `?_ptxn=<transaction id>`. Paddle.js đọc tham số đó rồi mở hộp
   thanh toán đè lên trang.

   Địa chỉ trang này phải khai trong Paddle > Checkout > Checkout settings >
   Default payment link, nếu không API sẽ từ chối tạo transaction. */
import type { Metadata } from 'next';
import Link from 'next/link';
import PaddleLoader from './loader';

export const metadata: Metadata = { title: 'Thanh toán — Agentic' };

const TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? '';

const shell: React.CSSProperties = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: '32px 20px',
  background: '#16181c',
  backgroundImage: 'radial-gradient(120% 46% at 50% 0%, #21252d 0%, rgba(33,37,45,0) 62%)',
  color: '#fff',
  fontFamily: 'var(--body)',
  textAlign: 'center',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ _ptxn?: string }>;
}) {
  const { _ptxn } = await searchParams;

  return (
    <main style={shell}>
      {TOKEN && _ptxn ? <PaddleLoader token={TOKEN} /> : null}

      <div style={{ maxWidth: 380 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            marginBottom: 22,
            fontFamily: 'var(--display)',
            fontWeight: 700,
            letterSpacing: '.13em',
            fontSize: 12,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#e83a34',
              display: 'inline-block',
            }}
          />
          AGENTIC
        </div>

        {!TOKEN ? (
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#e83a34' }}>
            Chưa cấu hình NEXT_PUBLIC_PADDLE_CLIENT_TOKEN nên không mở được cửa sổ thanh toán.
          </p>
        ) : _ptxn ? (
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#949ba4' }}>
            Đang mở cửa sổ thanh toán…
          </p>
        ) : (
          <>
            <p style={{ margin: '0 0 22px', fontSize: 15, lineHeight: 1.65, color: '#949ba4' }}>
              Trang này chỉ dùng để mở cửa sổ thanh toán. Hãy chọn giao diện bạn muốn mua trước.
            </p>
            <Link
              href="/?tab=pricing"
              style={{
                display: 'inline-block',
                padding: '13px 24px',
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 14,
                color: '#fffdfa',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)',
                border: '1px solid rgba(255,255,255,.32)',
              }}
            >
              Xem bảng giá
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
