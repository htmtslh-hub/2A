'use client';
/* Form gửi yêu cầu đặt làm agent.
   Đây là đường vào duy nhất của dòng dịch vụ, nên ưu tiên gửi được hơn là
   gọn: chỉ tên, email và mô tả là bắt buộc, phần còn lại để trống cũng gửi. */
import { useState } from 'react';
import type { LangCode } from '@/generated/data';
import { SERVICE, type ServiceKind } from '@/lib/service-content';

const FIELD: React.CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  borderRadius: 12,
  border: '1px solid rgba(236,238,241,.16)',
  background: 'rgba(255,255,255,.04)',
  color: '#fff',
  fontFamily: 'inherit',
  fontSize: 15,
  lineHeight: 1.5,
};

const LABEL: React.CSSProperties = {
  display: 'block',
  margin: '0 0 7px',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '.02em',
  color: '#c3c9d1',
};

export default function ServiceForm({
  lang,
  defaultKind,
}: {
  lang: LangCode;
  /** Loại agent khách bấm vào ở trang chủ, truyền qua ?loai= */
  defaultKind: ServiceKind;
}) {
  const doc = SERVICE[lang];
  const f = doc.f;

  const [kind, setKind] = useState<ServiceKind>(defaultKind);
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '').trim();

    const name = get('name');
    const email = get('email');
    const message = get('message');
    if (!name || !email || message.length < 10) return setError(f.errRequired);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError(f.errEmail);
    setError('');
    setState('sending');

    try {
      const res = await fetch('/api/dich-vu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          name,
          email,
          phone: get('phone'),
          company: get('company'),
          budget: get('budget'),
          message,
          lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
    } catch {
      setState('idle');
      setError(f.errNetwork);
    }
  }

  if (state === 'sent') {
    return (
      <div
        role="status"
        style={{
          padding: '30px 26px',
          borderRadius: 18,
          border: '1px solid rgba(232,58,52,.35)',
          background: 'rgba(232,58,52,.07)',
        }}
      >
        <p
          style={{
            margin: '0 0 8px',
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 19,
            color: '#fff',
          }}
        >
          {f.sent}
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#c3c9d1' }}>{f.sentNote}</p>
      </div>
    );
  }

  const req = <span style={{ color: '#e83a34' }}> *</span>;
  const opt = <span style={{ fontWeight: 400, color: '#7d848e' }}> ({f.optional})</span>;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div style={{ display: 'grid', gap: 18 }}>
        <div>
          <label htmlFor="sf-kind" style={LABEL}>
            {f.kind}
            {req}
          </label>
          <select
            id="sf-kind"
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value as ServiceKind)}
            style={FIELD}
          >
            {doc.items.map((it) => (
              <option key={it.kind} value={it.kind} style={{ background: '#1b1e24' }}>
                {it.title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
          <div>
            <label htmlFor="sf-name" style={LABEL}>
              {f.name}
              {req}
            </label>
            <input id="sf-name" name="name" autoComplete="name" style={FIELD} />
          </div>
          <div>
            <label htmlFor="sf-email" style={LABEL}>
              {f.email}
              {req}
            </label>
            <input id="sf-email" name="email" type="email" autoComplete="email" style={FIELD} />
          </div>
          <div>
            <label htmlFor="sf-phone" style={LABEL}>
              {f.phone}
              {opt}
            </label>
            <input id="sf-phone" name="phone" type="tel" autoComplete="tel" style={FIELD} />
          </div>
          <div>
            <label htmlFor="sf-company" style={LABEL}>
              {f.company}
              {opt}
            </label>
            <input id="sf-company" name="company" autoComplete="organization" style={FIELD} />
          </div>
        </div>

        <div>
          <label htmlFor="sf-budget" style={LABEL}>
            {f.budget}
            {opt}
          </label>
          <select id="sf-budget" name="budget" defaultValue={doc.budgets[0]} style={FIELD}>
            {doc.budgets.map((b) => (
              <option key={b} value={b} style={{ background: '#1b1e24' }}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sf-message" style={LABEL}>
            {f.message}
            {req}
          </label>
          <textarea
            id="sf-message"
            name="message"
            rows={6}
            placeholder={f.messagePlaceholder}
            style={{ ...FIELD, resize: 'vertical' }}
          />
        </div>

        {error ? (
          <p role="alert" style={{ margin: 0, fontSize: 14, color: '#ff7b74' }}>
            {error}
          </p>
        ) : null}

        <div>
          <button
            type="submit"
            disabled={state === 'sending'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '15px 30px',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,.32)',
              cursor: state === 'sending' ? 'default' : 'pointer',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '.03em',
              color: '#fffdfa',
              opacity: state === 'sending' ? 0.6 : 1,
              background:
                'linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)',
              boxShadow: 'inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35)',
            }}
          >
            {state === 'sending' ? f.sending : f.submit}
          </button>
        </div>
      </div>
    </form>
  );
}
