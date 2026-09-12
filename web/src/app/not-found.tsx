/* Trang 404 theo tông tối của bản thiết kế, thay cho bản mặc định nền trắng. */
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Không tìm thấy trang — Forge Zone' };

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '32px 20px',
        background: '#16181c',
        backgroundImage:
          'radial-gradient(120% 46% at 50% 0%, #21252d 0%, rgba(33,37,45,0) 62%), radial-gradient(78% 34% at 88% 22%, rgba(232,58,52,.08), transparent 66%)',
        color: '#fff',
        fontFamily: 'var(--body)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 460 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 30,
            fontFamily: 'var(--display)',
            fontWeight: 700,
            letterSpacing: '.13em',
            fontSize: 13,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: '#e83a34',
              boxShadow: '0 0 12px rgba(232,58,52,.55)',
              display: 'inline-block',
            }}
          />
          FORGE ZONE
        </div>

        <p
          style={{
            margin: '0 0 8px',
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 'clamp(64px,14vw,110px)',
            lineHeight: 1,
            letterSpacing: '-.03em',
            color: '#e83a34',
          }}
        >
          404
        </p>

        <h1
          style={{
            margin: '0 0 14px',
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 'clamp(22px,3.4vw,30px)',
            lineHeight: 1.15,
            letterSpacing: '-.02em',
          }}
        >
          Không tìm thấy trang này
        </h1>

        <p style={{ margin: '0 0 30px', fontSize: 15, lineHeight: 1.65, color: '#949ba4' }}>
          Có thể đường dẫn đã đổi, hoặc giao diện bạn tìm không còn trong thư viện.
        </p>

        <div
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/"
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
              boxShadow:
                'inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35)',
            }}
          >
            Về trang chủ
          </Link>
          <Link
            href="/?tab=library"
            style={{
              display: 'inline-block',
              padding: '13px 24px',
              borderRadius: 14,
              fontWeight: 600,
              fontSize: 14,
              color: '#c8ced6',
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.18)',
            }}
          >
            Xem thư viện
          </Link>
        </div>
      </div>
    </main>
  );
}
