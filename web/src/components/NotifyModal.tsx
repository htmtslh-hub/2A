/* Hộp để lại email chờ sản phẩm sắp ra mắt (Agent, Masterprompt).
   Mở từ nút chính ở hero khi khách đang xem thẻ 2 hoặc 3. */
'use client';

import { useEffect, useState } from 'react';
import type { LangCode } from '@/generated/data';
import { NOTIFY, type NotifyProduct } from '@/lib/i18n-extra';

export default function NotifyModal({
  product,
  lang,
  onClose,
  onDone,
}: {
  product: NotifyProduct | null;
  lang: LangCode;
  onClose: () => void;
  /** Gửi xong: đóng hộp và báo bằng toast. */
  onDone: (message: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;
  const t = NOTIFY[lang] ?? NOTIFY.vi;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError(t.invalid);
      return;
    }
    setSending(true);
    setError(null);
    try {
      const r = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, product, lang }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setEmail('');
      onDone(t.done);
    } catch {
      setError(t.network);
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: 'rgba(10,11,13,.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notify-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 440,
          padding: 'clamp(26px,5vw,36px)',
          borderRadius: 26,
          color: '#fff',
          fontFamily: 'var(--body)',
          background: 'linear-gradient(152deg, #24272e 0%, #1a1c21 60%, #16181c 100%)',
          border: '1px solid rgba(236,238,241,.16)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14), 0 30px 80px -20px rgba(0,0,0,.7)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(236,238,241,.24)',
            background: 'transparent',
            color: '#fff',
            fontSize: 18,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <p
          style={{
            margin: '0 0 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 12,
            letterSpacing: '.24em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 32, height: 1, background: 'var(--acc, #e83a34)' }} />
          Forge Zone
        </p>
        <h2
          id="notify-title"
          style={{
            margin: '0 0 10px',
            paddingRight: 40,
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 'clamp(24px,4vw,30px)',
            lineHeight: 1.15,
            letterSpacing: '-.02em',
          }}
        >
          {t.title[product]}
        </h2>
        <p style={{ margin: '0 0 22px', fontSize: 14, lineHeight: 1.6, color: '#a8afb8' }}>{t.sub}</p>

        <form onSubmit={submit} noValidate>
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            aria-label="Email"
            aria-invalid={Boolean(error)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '15px 16px',
              borderRadius: 14,
              border: `1px solid ${error ? 'rgba(232,58,52,.7)' : 'rgba(236,238,241,.18)'}`,
              background: 'rgba(255,255,255,.05)',
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: 15,
              outline: 'none',
            }}
          />
          {error ? (
            <p role="alert" style={{ margin: '8px 0 0', fontSize: 13, color: '#f26a63' }}>
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={sending}
            style={{
              width: '100%',
              marginTop: 16,
              padding: 15,
              borderRadius: 16,
              cursor: sending ? 'wait' : 'pointer',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 14,
              color: '#fffdfa',
              background: 'linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)',
              border: '1px solid rgba(255,255,255,.32)',
              boxShadow: 'inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35)',
              opacity: sending ? 0.7 : 1,
            }}
          >
            {sending ? t.sending : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
