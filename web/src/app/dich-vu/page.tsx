import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import ServiceForm from '@/components/ServiceForm';
import { readLang } from '@/lib/server-lang';
import { COMPANY } from '@/lib/company';
import { SERVICE, SERVICE_KINDS, type ServiceKind } from '@/lib/service-content';

export async function generateMetadata(): Promise<Metadata> {
  const doc = SERVICE[await readLang()];
  return { title: `${doc.title} — ${COMPANY.brand}`, description: doc.intro };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ loai?: string }>;
}) {
  const lang = await readLang();
  const doc = SERVICE[lang];
  const q = (await searchParams).loai;
  // ?loai= đến từ thẻ agent khách vừa bấm ở trang chủ, nên chọn sẵn đúng mục.
  const picked: ServiceKind = SERVICE_KINDS.includes(q as ServiceKind)
    ? (q as ServiceKind)
    : 'sales';

  return (
    <LegalPage
      lang={lang}
      title={doc.title}
      intro={doc.intro}
      showUpdated={false}
      homeHref={COMPANY.siteUrl}
    >
      <p
        style={{
          margin: '0 0 44px',
          padding: '14px 16px',
          borderRadius: 12,
          border: '1px solid rgba(236,238,241,.14)',
          background: 'rgba(255,255,255,.035)',
          fontSize: 14,
          lineHeight: 1.65,
          color: '#c3c9d1',
        }}
      >
        {doc.notice}
      </p>

      {doc.items.map((it) => (
        <section
          key={it.kind}
          id={it.kind}
          style={{
            marginBottom: 20,
            padding: '24px 24px 20px',
            borderRadius: 18,
            border:
              it.kind === picked
                ? '1px solid rgba(232,58,52,.45)'
                : '1px solid rgba(236,238,241,.11)',
            background: it.kind === picked ? 'rgba(232,58,52,.055)' : 'rgba(255,255,255,.025)',
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
            {it.title}
          </h2>
          <p style={{ margin: '0 0 16px', fontSize: 15, lineHeight: 1.7, color: '#a8afb8' }}>
            {it.blurb}
          </p>
          <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'grid', gap: 7 }}>
            {it.points.map((pt, i) => (
              <li key={i} style={{ fontSize: 14.5, lineHeight: 1.6, color: '#c3c9d1' }}>
                {pt}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2
        style={{
          margin: '52px 0 20px',
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: '-.015em',
          color: '#fff',
        }}
      >
        {doc.howTitle}
      </h2>
      <ol style={{ margin: '0 0 56px', padding: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
        {doc.how.map((s) => (
          <li key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span
              style={{
                flex: 'none',
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 15,
                color: '#e83a34',
              }}
            >
              {s.step}
            </span>
            <span style={{ fontSize: 15, lineHeight: 1.7, color: '#c3c9d1' }}>{s.text}</span>
          </li>
        ))}
      </ol>

      <h2
        style={{
          margin: '52px 0 10px',
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: '-.015em',
          color: '#fff',
        }}
      >
        {doc.deliverTitle}
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 15, lineHeight: 1.7, color: '#a8afb8' }}>
        {doc.deliverIntro}
      </p>

      {doc.deliverGroups.map((g) => (
        <section
          key={g.h}
          style={{
            marginBottom: 16,
            padding: '22px 24px',
            borderRadius: 18,
            border: '1px solid rgba(236,238,241,.11)',
            background: 'rgba(255,255,255,.025)',
          }}
        >
          <h3
            style={{
              margin: '0 0 14px',
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '.01em',
              color: '#fff',
            }}
          >
            {g.h}
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 11 }}>
            {g.items.map((it, i) => (
              <li key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  aria-hidden="true"
                  style={{ flex: 'none', marginTop: 4 }}
                >
                  <path
                    d="M3 9l3.6 3.6L14 5"
                    stroke="#e83a34"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{ fontSize: 14.5, lineHeight: 1.65, color: '#c3c9d1' }}
                  // Nội dung là hằng số trong src/lib/service-content.ts, không
                  // phải dữ liệu người dùng nhập, nên nhúng HTML ở đây an toàn.
                  dangerouslySetInnerHTML={{ __html: it }}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2
        id="gui-yeu-cau"
        style={{
          margin: '52px 0 10px',
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: '-.015em',
          color: '#fff',
        }}
      >
        {doc.formTitle}
      </h2>
      <p style={{ margin: '0 0 26px', fontSize: 15, lineHeight: 1.7, color: '#a8afb8' }}>
        {doc.formIntro}
      </p>
      <ServiceForm lang={lang} defaultKind={picked} />
    </LegalPage>
  );
}
