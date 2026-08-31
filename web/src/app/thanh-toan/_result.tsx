/* Khung chung cho hai trang kết quả thanh toán, dùng lại tông màu của thiết kế. */
import Link from 'next/link';

export default function PaymentResult({
  tone,
  title,
  body,
  orderCode,
  cta,
}: {
  tone: 'ok' | 'warn';
  title: string;
  body: string;
  orderCode?: string;
  cta: { href: string; label: string };
}) {
  const accent = tone === 'ok' ? '#3dba74' : '#e83a34';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        background: '#16181c',
        backgroundImage:
          'radial-gradient(120% 46% at 50% 0%, #21252d 0%, rgba(33,37,45,0) 62%)',
        color: '#fff',
        fontFamily: 'var(--body)',
      }}
    >
      <div
        style={{
          maxWidth: 460,
          width: '100%',
          padding: 36,
          borderRadius: 24,
          background:
            'linear-gradient(152deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.045) 46%, rgba(255,255,255,.028) 100%)',
          border: '1px solid rgba(236,238,241,.14)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.20)',
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: accent,
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 22,
          }}
          aria-hidden="true"
        >
          {tone === 'ok' ? '✓' : '!'}
        </div>

        <h1
          style={{
            margin: '0 0 12px',
            fontFamily: 'var(--display)',
            fontSize: 28,
            lineHeight: 1.15,
            letterSpacing: '-.02em',
          }}
        >
          {title}
        </h1>

        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#c3c9d1' }}>{body}</p>

        {orderCode ? (
          <p style={{ margin: '16px 0 0', fontSize: 13, color: '#8b929b' }}>
            Mã đơn: <b style={{ color: '#f0a63c' }}>{orderCode}</b>
          </p>
        ) : null}

        <Link
          href={cta.href}
          style={{
            display: 'inline-block',
            marginTop: 26,
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
          {cta.label}
        </Link>
      </div>
    </main>
  );
}
