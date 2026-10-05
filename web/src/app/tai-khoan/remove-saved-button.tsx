'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { LangCode } from '@/generated/data';

const labels = {
  vi: { remove: 'Bỏ lưu', error: 'Không thể bỏ lưu. Vui lòng thử lại.' },
  en: { remove: 'Remove', error: 'Could not remove. Please try again.' },
  zh: { remove: '取消收藏', error: '无法取消收藏，请重试。' },
};

export function RemoveSavedButton({ templateId, lang }: { templateId: string; lang: LangCode }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function remove() {
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/saved-templates', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ templateId }),
      });
      if (!response.ok) throw new Error('remove failed');
      router.refresh();
    } catch {
      setError(labels[lang].error);
      setBusy(false);
    }
  }

  return <div><button className="account-remove-saved" type="button" disabled={busy} onClick={remove}>{labels[lang].remove}</button>{error ? <span role="alert" style={{ display: 'block', marginTop: 6, color: '#ff7771', fontSize: 12 }}>{error}</span> : null}</div>;
}
