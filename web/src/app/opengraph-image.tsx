/* Ảnh hiển thị khi chia sẻ link lên Facebook, Zalo, X…
   Sinh động bằng ImageResponse nên không cần thiết kế file ảnh riêng. */
import { ImageResponse } from 'next/og';
import { COMPANY } from '@/lib/company';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Agentic — Giao diện web cao cấp, dựng sẵn để bán';

export default function Image() {
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
              maxWidth: 900,
            }}
          >
            Giao diện web cao cấp, dựng sẵn để bán
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: '#9aa2ac', display: 'flex' }}>
            Tải về · Thay chữ · Lên sóng
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
          <div style={{ display: 'flex' }}>Giấy phép thương mại</div>
        </div>
      </div>
    ),
    size
  );
}
