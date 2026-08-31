/* Thay cho custom element <image-slot> của Claude Design canvas.
   Ảnh preview thật được khai báo trong src/lib/previews.ts theo id của slot;
   chưa có ảnh thì hiện khung placeholder giống bản thiết kế. */
'use client';
import { PREVIEWS } from '@/lib/previews';

export default function ImageSlot({
  id,
  fit = 'cover',
  placeholder = 'Ảnh preview giao diện',
}: {
  id?: string;
  shape?: string;
  fit?: string;
  placeholder?: string;
}) {
  const src = id ? PREVIEWS[id] : undefined;

  if (src) {
    return (
      <span
        data-image-slot=""
        data-filled=""
        style={{ position: 'absolute', inset: 0, display: 'block', overflow: 'hidden' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={placeholder}
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit as React.CSSProperties['objectFit'],
            display: 'block',
          }}
        />
      </span>
    );
  }

  return (
    <span
      data-image-slot=""
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        background: 'rgba(127,127,127,.08)',
        border: '1px dashed rgba(236,238,241,.22)',
        borderRadius: 'inherit',
        color: '#eceef1',
        opacity: 0.75,
        font: '13px/1.3 system-ui, -apple-system, sans-serif',
        textAlign: 'center',
        padding: 12,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="M4 17l4.5-4.5a2 2 0 0 1 2.8 0L16 17" />
        <path d="M14 14.5l1.8-1.8a2 2 0 0 1 2.8 0L20 14.2" />
      </svg>
      <span>{placeholder}</span>
    </span>
  );
}
