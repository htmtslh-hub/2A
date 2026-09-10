/* Trang đặt lại mật khẩu, mở từ link trong email. */
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { RESET_STRINGS } from '@/lib/i18n-extra';
import type { Lang } from '@/lib/catalog';
import ResetForm from './form';

export const dynamic = 'force-dynamic';

async function readLang(): Promise<Lang> {
  const v = (await cookies()).get('agentic-lang')?.value;
  return v === 'en' || v === 'zh' ? v : 'vi';
}

export async function generateMetadata(): Promise<Metadata> {
  const t = RESET_STRINGS[await readLang()];
  return { title: `${t.title} — Agentic` };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const t = RESET_STRINGS[await readLang()];

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '32px 20px',
        background: '#16181c',
        backgroundImage: 'radial-gradient(120% 46% at 50% 0%, #21252d 0%, rgba(33,37,45,0) 62%)',
        color: '#fff',
        fontFamily: 'var(--body)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          padding: 34,
          borderRadius: 24,
          background:
            'linear-gradient(152deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.045) 46%, rgba(255,255,255,.028) 100%)',
          border: '1px solid rgba(236,238,241,.14)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.20), 0 26px 60px rgba(0,0,0,.5)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            marginBottom: 24,
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

        <h1
          style={{
            margin: '0 0 8px',
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1.15,
            letterSpacing: '-.02em',
          }}
        >
          {t.title}
        </h1>

        {token ? (
          <>
            <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: 1.6, color: '#949ba4' }}>
              {t.sub}
            </p>
            <ResetForm token={token} t={t} />
          </>
        ) : (
          <>
            <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: 1.6, color: '#e83a34' }}>
              {t.invalid}
            </p>
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
              }}
            >
              {t.goHome}
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
