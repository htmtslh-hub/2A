'use client';

import { useRouter } from 'next/navigation';
import type { LangCode } from '@/generated/data';
import { HTML_LANG } from '@/lib/lang';
import styles from './guide.module.css';

const OPTIONS: Array<{ code: LangCode; label: string; name: string }> = [
  { code: 'vi', label: 'VI', name: 'Tiếng Việt' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh', label: '中', name: '简体中文' },
];

export default function GuideLanguageSwitcher({ lang }: { lang: LangCode }) {
  const router = useRouter();

  function select(code: LangCode) {
    if (code === lang) return;
    try {
      localStorage.setItem('agentic-lang', code);
      // Language choice must be visible to the server on the next render.
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `agentic-lang=${code}; path=/; max-age=31536000; samesite=lax`;
    } catch {}
    // Keep assistive technology in sync while the server refreshes.
    // eslint-disable-next-line react-hooks/immutability
    document.documentElement.lang = HTML_LANG[code];
    router.refresh();
  }

  return <div className={styles.languages} role="group" aria-label="Language / Ngôn ngữ / 语言">
    {OPTIONS.map(option => <button key={option.code} type="button" onClick={() => select(option.code)} aria-label={option.name} aria-pressed={option.code === lang}>{option.label}</button>)}
  </div>;
}
