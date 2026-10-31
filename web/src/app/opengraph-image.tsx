/* Ảnh hiển thị khi chia sẻ link lên Facebook, Zalo, X, LinkedIn, Discord…
   Sinh động bằng ImageResponse và tự thích ứng theo ngôn ngữ (vi/en). */
import { ImageResponse } from 'next/og';
import { COMPANY } from '@/lib/company';
import { readLang } from '@/lib/server-lang';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Forge Zone — Premium ready-made website templates';

export default async function Image() {
  const lang = await readLang();
  const isVi = lang === 'vi';

  const headline = isVi
    ? 'Giao diện web cao cấp, dựng sẵn để bán'
    : 'Premium Ready-Made Website Templates';
  const subline = isVi
    ? 'Tải về · Thay chữ · Lên sóng'
    : 'Download · Customize · Launch';
  const rightBadge = isVi ? 'Giấy phép thương mại' : 'Commercial Licence';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#16181c',
          backgroundImage:
            'radial-gradient(120% 60% at 50% 0%, #23272f 0%, rgba(33,37,45,0) 62%), radial-gradient(70% 50% at 90% 20%, rgba(232,58,52,.22), transparent 70%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: '#e83a34',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, display: 'flex' }}>
            {COMPANY.brand.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: 'flex',
              maxWidth: 940,
            }}
          >
            {headline}
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: '#9aa2ac', display: 'flex' }}>
            {subline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            color: '#6f767f',
          }}
        >
          <div style={{ display: 'flex' }}>HTML · CSS · JS</div>
          <div style={{ display: 'flex' }}>{rightBadge}</div>
        </div>
      </div>
    ),
    size
  );
}
