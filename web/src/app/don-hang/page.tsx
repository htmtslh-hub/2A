/* Trang "đơn hàng của tôi": liệt kê giao diện đã mua và cho tải lại. */
import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { readLang } from '@/lib/server-lang';
import { prisma } from '@/lib/db';
import { formatMoney, templateName, type Currency, type Lang } from '@/lib/catalog';
import { ORDERS_STRINGS, type InstallGuideStrings } from '@/lib/i18n-extra';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { GUIDE_LABELS, guideHref } from '@/lib/guide-links';
import guideStyles from '@/components/guide/guide.module.css';
import { SignOutButton } from './actions';

const DATE_LOCALE: Record<Lang, string> = { vi: 'vi-VN', en: 'en-US', zh: 'zh-CN' };

export async function generateMetadata(): Promise<Metadata> {
  const t = ORDERS_STRINGS[await readLang()];
  return { title: `${t.title} — Forge Zone` };
}

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

const guideWrap: React.CSSProperties = {
  marginTop: 22,
  padding: '24px 22px',
  borderRadius: 20,
  background:
    'linear-gradient(152deg, rgba(232,58,52,.10) 0%, rgba(255,255,255,.055) 42%, rgba(255,255,255,.026) 100%)',
  border: '1px solid rgba(236,238,241,.13)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)',
};

const guidePanel: React.CSSProperties = {
  padding: 16,
  borderRadius: 16,
  background: 'rgba(255,255,255,.045)',
  border: '1px solid rgba(236,238,241,.10)',
};

function InstallGuide({ guide }: { guide: InstallGuideStrings }) {
  return (
    <section style={guideWrap}>
      <h2
        style={{
          margin: '0 0 8px',
          fontFamily: 'var(--display)',
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: '-.015em',
        }}
      >
        {guide.title}
      </h2>
      <p style={{ margin: '0 0 20px', fontSize: 14, lineHeight: 1.7, color: '#a8afb8' }}>
        {guide.intro}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        <div style={guidePanel}>
          <h3
            style={{
              margin: '0 0 12px',
              fontFamily: 'var(--display)',
              fontSize: 15,
              lineHeight: 1.25,
            }}
          >
            {guide.includedTitle}
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#c3c9d1', fontSize: 13, lineHeight: 1.7 }}>
            {guide.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={guidePanel}>
          <h3
            style={{
              margin: '0 0 12px',
              fontFamily: 'var(--display)',
              fontSize: 15,
              lineHeight: 1.25,
            }}
          >
            {guide.stepsTitle}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {guide.steps.map((step, idx) => (
              <div key={step.title} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fffdfa',
                    fontSize: 12,
                    fontWeight: 800,
                    background: 'rgba(232,58,52,.38)',
                    border: '1px solid rgba(255,255,255,.18)',
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ minWidth: 0 }}>
                  <strong style={{ display: 'block', marginBottom: 3, fontSize: 13, color: '#fff' }}>
                    {step.title}
                  </strong>
                  <span style={{ display: 'block', fontSize: 13, lineHeight: 1.65, color: '#a8afb8' }}>
                    {step.body}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p
        style={{
          margin: '16px 0 0',
          paddingTop: 14,
          borderTop: '1px solid rgba(236,238,241,.10)',
          fontSize: 13,
          lineHeight: 1.65,
          color: '#949ba4',
        }}
      >
        {guide.help}
      </p>
    </section>
  );
}

export default async function Page() {
  const lang = await readLang();
  const t = ORDERS_STRINGS[lang];
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
    include: { order: { include: { items: true } } },
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
            FORGE ZONE
          </Link>
          <div className={guideStyles.orderLinks}>
            <Link href={guideHref()} className={guideStyles.orderStart}>{GUIDE_LABELS[lang].guide}</Link>
            <SignOutButton label={t.signOut} />
          </div>
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
              const name = isBundle ? t.bundle : templateName(p.templateId!, lang);
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
                      {new Intl.DateTimeFormat(DATE_LOCALE[lang], { dateStyle: 'long' }).format(p.createdAt)}
                      {' · '}
                      {formatMoney(p.order.kind === 'CART' ? (p.order.items.find((item) => item.templateId === p.templateId)?.amount ?? p.order.amount) : p.order.amount, p.order.currency as Currency, lang)}
                    </p>
                  </div>
                  {isBundle ? (
                    // Trọn bộ không có một file chung: mỗi mẫu thật một nút tải.
                    // Trước đây nút trỏ tới 'bundle' — không có file đó, nên 404.
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
                      {Object.entries(REAL_TEMPLATES).map(([id, tpl]) => (
                        <div key={id} className={guideStyles.orderLinks}>
                          <a href={`/api/download?id=${id}`} style={primaryBtn}>
                            {t.download} {(tpl.copy[lang] ?? tpl.copy.vi).name}
                          </a>
                          <Link href={guideHref(tpl.slug, 'template')} className={guideStyles.orderStart} aria-label={`${GUIDE_LABELS[lang].start}: ${tpl.copy[lang].name}`}>
                            {GUIDE_LABELS[lang].start}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={guideStyles.orderLinks}>
                      <a href={`/api/download?id=${p.templateId}`} style={primaryBtn}>{t.download}</a>
                      <Link href={guideHref(REAL_TEMPLATES[p.templateId!]?.slug, 'template')} className={guideStyles.orderStart}>{GUIDE_LABELS[lang].start}</Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {purchases.length > 0 ? <InstallGuide guide={t.install} /> : null}

        <p style={{ marginTop: 36 }}>
          <Link href="/" style={{ fontSize: 13, color: '#949ba4' }}>
            ← {t.back}
          </Link>
        </p>
      </div>
    </main>
  );
}
