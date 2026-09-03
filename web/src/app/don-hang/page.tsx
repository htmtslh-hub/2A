/* Trang "đơn hàng của tôi": liệt kê giao diện đã mua và cho tải lại. */
import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { templateName } from '@/lib/catalog';
import { ORDERS_STRINGS } from '@/lib/i18n-extra';
import { SignOutButton } from './actions';

export const metadata: Metadata = { title: 'Đơn hàng của tôi — Agentic' };

// Trang phụ thuộc phiên đăng nhập nên không được dựng sẵn.
export const dynamic = 'force-dynamic';

const shell: React.CSSProperties = {
  minHeight: '100vh',
  padding: 'clamp(28px,5vw,64px) clamp(20px,4vw,56px) 80px',
  background: '#16181c',
  backgroundImage: 'radial-gradient(120% 46% at 50% 0%, #21252d 0%, rgba(33,37,45,0) 62%)',
  color: '#fff',
  fontFamily: 'var(--body)',
};

const card: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 22px',
  borderRadius: 20,
  background:
    'linear-gradient(152deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.045) 46%, rgba(255,255,255,.028) 100%)',
  border: '1px solid rgba(236,238,241,.14)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.20)',
};

const primaryBtn: React.CSSProperties = {
  display: 'inline-block',
  padding: '12px 22px',
  borderRadius: 14,
  fontWeight: 700,
  fontSize: 13,
  color: '#fffdfa',
  whiteSpace: 'nowrap',
  background: 'linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)',
  border: '1px solid rgba(255,255,255,.32)',
  boxShadow: 'inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35)',
};

export default async function Page() {
  // Trang chỉ có tiếng Việt vì ngôn ngữ được lưu ở trình duyệt, server không
  // đọc được. Đổi sang ORDERS_STRINGS.en / .zh nếu sau này thêm i18n theo URL.
  const t = ORDERS_STRINGS.vi;
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return (
      <main style={{ ...shell, display: 'grid', placeItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 20px', fontSize: 16, color: '#c3c9d1' }}>{t.needLogin}</p>
          <Link href="/" style={primaryBtn}>
            {t.goHome}
          </Link>
        </div>
      </main>
    );
  }

  const purchases = await prisma.purchase.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { order: true },
  });

  return (
    <main style={shell}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 34,
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'var(--display)',
              fontWeight: 700,
              letterSpacing: '.13em',
              fontSize: 14,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--acc, #e83a34)',
                display: 'inline-block',
              }}
            />
            AGENTIC
          </Link>
          <SignOutButton label={t.signOut} />
        </header>

        <h1
          style={{
            margin: '0 0 10px',
            fontFamily: 'var(--display)',
            fontSize: 'clamp(30px,5vw,46px)',
            lineHeight: 1.1,
            letterSpacing: '-.02em',
          }}
        >
          {t.title}
        </h1>
        <p style={{ margin: '0 0 8px', fontSize: 15, lineHeight: 1.6, color: '#949ba4' }}>
          {t.intro}
        </p>
        <p style={{ margin: '0 0 32px', fontSize: 13, color: '#6f767f' }}>{session?.user?.email}</p>

        {purchases.length === 0 ? (
          <div style={{ ...card, flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
            <p style={{ margin: 0, fontSize: 15, color: '#c3c9d1' }}>{t.empty}</p>
            <Link href="/?tab=library" style={primaryBtn}>
              {t.emptyCta}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {purchases.map((p) => {
              const isBundle = p.templateId === null;
              const name = isBundle ? t.bundle : templateName(p.templateId!, 'vi');
              const note = isBundle ? t.bundleNote : p.order.description;
              return (
                <div key={p.id} style={card}>
                  <div style={{ minWidth: 0 }}>
                    <h2
                      style={{
                        margin: '0 0 6px',
                        fontFamily: 'var(--display)',
                        fontSize: 20,
                        lineHeight: 1.2,
                        letterSpacing: '-.01em',
                      }}
                    >
                      {name}
                    </h2>
                    <p style={{ margin: 0, fontSize: 13, color: '#949ba4' }}>{note}</p>
                    <p style={{ margin: '8px 0 0', fontSize: 12, color: '#6f767f' }}>
                      {t.boughtOn}{' '}
                      {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(p.createdAt)}
                      {' · '}
                      {p.order.amount.toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                  <a
                    href={`/api/download?id=${isBundle ? 'bundle' : p.templateId}`}
                    style={primaryBtn}
                  >
                    {t.download}
                  </a>
                </div>
              );
            })}
          </div>
        )}

        <p style={{ marginTop: 36 }}>
          <Link href="/" style={{ fontSize: 13, color: '#949ba4' }}>
            ← {t.back}
          </Link>
        </p>
      </div>
    </main>
  );
}
