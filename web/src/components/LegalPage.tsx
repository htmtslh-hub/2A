/* Khung hiển thị chung cho các trang pháp lý và trang nội dung tĩnh.
   Giữ đúng tông tối, chữ to dễ đọc, bề ngang hẹp cho dễ theo dõi. */
import Link from 'next/link';
import { COMPANY } from '@/lib/company';
import type { LegalSection } from '@/lib/legal';
import type { LangCode } from '@/generated/data';
import { HTML_LANG } from '@/lib/lang';

const BACK_LABEL: Record<LangCode, string> = {
  vi: 'Về trang chủ',
  en: 'Back to home',
  zh: '返回首页',
};

const UPDATED_LABEL: Record<LangCode, string> = {
  vi: 'Cập nhật lần cuối',
  en: 'Last updated',
  zh: '最后更新',
};

const DATE_LOCALE: Record<LangCode, string> = { vi: 'vi-VN', en: 'en-US', zh: 'zh-CN' };

export default function LegalPage({
  lang,
  title,
  intro,
  sections,
  showUpdated = true,
  homeHref = '/',
  children,
}: {
  /** Logo và link "Về trang chủ" dẫn về đâu. Trang ở web dịch vụ riêng truyền
   *  địa chỉ cửa hàng chính, vì "/" ở đó lại là chính trang dịch vụ. */
  homeHref?: string;
  lang: LangCode;
  title: string;
  intro?: string;
  sections?: LegalSection[];
  /** Trang giới thiệu / liên hệ không cần dòng ngày cập nhật. */
  showUpdated?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <main
      // Layout đặt <html lang> theo cookie, nhưng trang pháp lý có thể hiện
      // tiếng Anh khi chưa có cookie — khai lại để trình đọc màn hình đọc đúng.
      lang={HTML_LANG[lang]}
      style={{
        minHeight: '100vh',
        padding: 'clamp(28px,5vw,64px) clamp(20px,4vw,56px) 96px',
        background: '#16181c',
        backgroundImage:
          'radial-gradient(120% 46% at 50% 0%, #21252d 0%, rgba(33,37,45,0) 62%), radial-gradient(78% 34% at 88% 18%, rgba(232,58,52,.07), transparent 66%)',
        color: '#fff',
        fontFamily: 'var(--body)',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link
          href={homeHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 40,
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
        </Link>

        <h1
          style={{
            margin: '0 0 14px',
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 'clamp(30px,5.4vw,48px)',
            lineHeight: 1.08,
            letterSpacing: '-.025em',
          }}
        >
          {title}
        </h1>

        {intro ? (
          <p style={{ margin: '0 0 10px', fontSize: 16, lineHeight: 1.7, color: '#c3c9d1' }}>
            {intro}
          </p>
        ) : null}

        {showUpdated ? (
          <p style={{ margin: '0 0 44px', fontSize: 13, color: '#6f767f' }}>
            {UPDATED_LABEL[lang]}:{' '}
            {new Intl.DateTimeFormat(DATE_LOCALE[lang], { dateStyle: 'long' }).format(
              new Date(COMPANY.legalUpdated)
            )}
          </p>
        ) : (
          <div style={{ height: 30 }} />
        )}

        {sections?.map((s, i) => (
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
              {s.h}
            </h2>
            {s.p.map((para, j) => (
              <p
                key={j}
                style={{
                  margin: '0 0 12px',
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: '#a8afb8',
                }}
                // Nội dung là hằng số do mình viết trong src/lib/legal, không
                // phải dữ liệu người dùng nhập, nên nhúng HTML ở đây an toàn.
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
          </section>
        ))}

        {children}

        <p
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: '1px solid rgba(236,238,241,.1)',
          }}
        >
          <Link href={homeHref} style={{ fontSize: 14, color: '#949ba4' }}>
            ← {BACK_LABEL[lang]}
          </Link>
        </p>
      </div>
    </main>
  );
}
