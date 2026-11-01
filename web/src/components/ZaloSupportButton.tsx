import { COMPANY } from '@/lib/company';
import type { LangCode } from '@/generated/data';
import styles from './zalo-support.module.css';

const COPY: Record<LangCode, { kicker: string; label: string; aria: string }> = {
  vi: {
    kicker: 'Hỗ trợ 24/7',
    label: 'Nhóm CSKH Zalo',
    aria: 'Tham gia nhóm Chăm sóc khách hàng trên Zalo',
  },
  en: {
    kicker: '24/7 Support',
    label: 'Zalo CSKH Group',
    aria: 'Join our Zalo Customer Support Group',
  },
  zh: {
    kicker: '7×24 客服',
    label: 'Zalo 客服群',
    aria: '加入 Zalo 客户服务支持群',
  },
};

export function ZaloIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Speech Bubble */}
      <path
        d="M24 6C13.5066 6 5 13.6112 5 23C5 28.082 7.4938 32.6435 11.4512 35.758C11.9309 36.1355 12.1445 36.7594 11.9818 37.3496L10.6626 42.1339C10.3958 43.1014 11.332 43.9383 12.248 43.5249L17.4796 41.1642C17.9684 40.9436 18.5204 40.9102 19.0352 41.0598C20.619 41.52 22.2837 41.7692 24 41.7692C34.4934 41.7692 43 34.158 43 24.7692C43 15.3804 34.4934 6 24 6Z"
        fill="#FFFFFF"
      />
      {/* Stylized "Zalo" Z + dot mark inside bubble */}
      <path
        d="M15.2 19.2H24.6L15.0 28.8H24.8"
        stroke="#0068FF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="29.5" cy="25.5" r="3.1" stroke="#0068FF" strokeWidth="2.6" />
      <path d="M32.6 22.5V28.6" stroke="#0068FF" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M36.2 18.8V28.6" stroke="#0068FF" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export default function ZaloSupportButton({ lang = 'vi' }: { lang?: LangCode }) {
  const copy = COPY[lang] ?? COPY.vi;
  return (
    <a
      href={COMPANY.zaloGroupUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.zaloFab}
      aria-label={copy.aria}
      title={copy.aria}
    >
      <span className={styles.iconWrap}>
        <span className={styles.pulseRing} />
        <ZaloIcon size={21} />
      </span>
      <span className={styles.textGroup}>
        <span className={styles.kicker}>{copy.kicker}</span>
        <span className={styles.label}>{copy.label}</span>
      </span>
    </a>
  );
}
