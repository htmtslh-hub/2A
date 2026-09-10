/* Thông báo nổi, thay cho alert() của trình duyệt.
   Dùng đúng tông kính mờ + viền nhấn của bản thiết kế. */
'use client';
import { useEffect } from 'react';

export default function Toast({
  message,
  tone = 'error',
  onClose,
}: {
  message: string | null;
  tone?: 'error' | 'ok';
  onClose: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const t = window.setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  const accent = tone === 'ok' ? '#3dba74' : 'var(--acc, #e83a34)';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 'clamp(20px,4vh,40px)',
        transform: 'translateX(-50%)',
        zIndex: 9500,
        maxWidth: 'min(92vw, 460px)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: '15px 18px',
        borderRadius: 16,
        background: 'rgba(16,18,22,.92)',
        backdropFilter: 'blur(22px) saturate(160%)',
        WebkitBackdropFilter: 'blur(22px) saturate(160%)',
        border: '1px solid rgba(255,255,255,.14)',
        borderLeft: `3px solid ${accent}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14), 0 20px 50px rgba(0,0,0,.55)',
        color: '#eceef1',
        fontFamily: 'var(--body)',
        fontSize: 14,
        lineHeight: 1.55,
        animation: 'riseIn .35s cubic-bezier(.22,1,.36,1) both',
      }}
    >
      <span style={{ flex: 1, minWidth: 0 }}>{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng"
        style={{
          flex: 'none',
          width: 24,
          height: 24,
          marginTop: -1,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,.2)',
          background: 'transparent',
          color: '#c8ced6',
          fontSize: 14,
          lineHeight: 1,
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  );
}
