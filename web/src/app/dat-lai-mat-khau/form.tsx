'use client';
import { useState } from 'react';
import Link from 'next/link';

const input: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '14px 16px',
  borderRadius: 14,
  border: '1px solid rgba(255,255,255,.16)',
  background: 'rgba(255,255,255,.05)',
  color: '#fff',
  fontFamily: 'inherit',
  fontSize: 15,
  outline: 'none',
};

const submitBtn: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: 16,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: 14,
  color: '#fffdfa',
  background: 'linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)',
  border: '1px solid rgba(255,255,255,.32)',
  boxShadow: 'inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35)',
};

export default function ResetForm({
  token,
  t,
}: {
  token: string;
  t: Record<string, string>;
}) {
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  if (state === 'done') {
    return (
      <>
        <p style={{ margin: '0 0 26px', fontSize: 15, lineHeight: 1.65, color: '#8fd6ab' }}>
          {t.done}
        </p>
        <Link href="/" style={{ ...submitBtn, display: 'block', textAlign: 'center' }}>
          {t.goHome}
        </Link>
      </>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password.length < 8) {
          setError(t.tooShort);
          return;
        }
        setError(null);
        setState('sending');
        fetch('/api/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, password }),
        })
          .then(async (r) => {
            if (r.ok) {
              setState('done');
              return;
            }
            const data = await r.json().catch(() => null);
            setError(data?.error || t.invalid);
            setState('idle');
          })
          .catch(() => {
            setError(t.invalid);
            setState('idle');
          });
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      {error ? (
        <p role="alert" style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#e83a34' }}>
          {error}
        </p>
      ) : null}

      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          fontSize: 12,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          color: '#949ba4',
        }}
      >
        {t.password}
        <input
          type="password"
          required
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />
      </label>

      <button type="submit" disabled={state === 'sending'} style={submitBtn}>
        {state === 'sending' ? '…' : t.submit}
      </button>
    </form>
  );
}
