import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { readLang } from '@/lib/server-lang';
import { COMPANY } from '@/lib/company';
import { CASE_STUDY } from '@/lib/case-study';
import { SERVICE_PATH } from '@/lib/service-content';

export async function generateMetadata(): Promise<Metadata> {
  const doc = CASE_STUDY[await readLang()];
  return { title: `${doc.title} — ${COMPANY.brand}`, description: doc.intro };
}

export default async function Page() {
  const lang = await readLang();
  const doc = CASE_STUDY[lang];

  return (
    <LegalPage lang={lang} title={doc.title} intro={doc.intro} showUpdated={false}>
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
          margin: '0 0 48px',
        }}
      >
        {doc.facts.map((f) => (
          <div
            key={f.k}
            style={{
              padding: '16px 16px 14px',
              borderRadius: 14,
              border: '1px solid rgba(236,238,241,.11)',
              background: 'rgba(255,255,255,.025)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 24,
                lineHeight: 1.1,
                color: '#fff',
              }}
            >
              {f.v}
            </div>
            <div style={{ marginTop: 6, fontSize: 12.5, letterSpacing: '.03em', color: '#8b929c' }}>
              {f.k}
            </div>
          </div>
        ))}
      </div>

      {doc.blocks.map((b, i) => (
        <section key={i} style={{ marginBottom: 38 }}>
          <h2
            style={{
              margin: '0 0 14px',
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: 19,
              lineHeight: 1.3,
              letterSpacing: '-.01em',
              color: '#fff',
            }}
          >
            {b.h}
          </h2>
          {b.p?.map((para, j) => (
            <p
              key={j}
              style={{ margin: '0 0 12px', fontSize: 15, lineHeight: 1.75, color: '#a8afb8' }}
              // Nội dung là hằng số trong src/lib/case-study.ts, không phải
              // dữ liệu người dùng nhập, nên nhúng HTML ở đây an toàn.
              dangerouslySetInnerHTML={{ __html: para }}
            />
          ))}
          {b.list ? (
            <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'grid', gap: 8 }}>
              {b.list.map((li, j) => (
                <li key={j} style={{ fontSize: 15, lineHeight: 1.7, color: '#a8afb8' }}>
                  {li}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <div
        style={{
          marginTop: 52,
          padding: '28px 26px',
          borderRadius: 18,
          border: '1px solid rgba(232,58,52,.35)',
          background: 'rgba(232,58,52,.06)',
        }}
      >
        <h2
          style={{
            margin: '0 0 10px',
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: '-.01em',
            color: '#fff',
          }}
        >
          {doc.ctaTitle}
        </h2>
        <p style={{ margin: '0 0 20px', fontSize: 15, lineHeight: 1.7, color: '#c3c9d1' }}>
          {doc.ctaText}
        </p>
        <Link
          href={SERVICE_PATH}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 26px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,.32)',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '.03em',
            color: '#fffdfa',
            background:
              'linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)',
            boxShadow: 'inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35)',
          }}
        >
          {doc.ctaButton}
        </Link>
      </div>
    </LegalPage>
  );
}
