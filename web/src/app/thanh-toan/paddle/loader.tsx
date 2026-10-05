/* Nạp Paddle.js và khởi tạo. Paddle.js tự phát hiện tham số `_ptxn` trên URL
   rồi mở hộp thanh toán đè lên trang — không cần gọi thêm gì. */
'use client';

import Script from 'next/script';

declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: string) => void };
      Initialize: (opts: {
        token: string;
        checkout?: { settings: { successUrl: string } };
        eventCallback?: (event: { name?: string }) => void;
      }) => void;
    };
  }
}

export default function PaddleLoader({ token, orderId }: { token: string; orderId?: string }) {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      onReady={() => {
        if (!window.Paddle) return;
        // Token sandbox bắt đầu bằng 'test_' — suy ra môi trường từ token để
        // khỏi phải thêm một biến cấu hình nữa.
        if (token.startsWith('test_')) window.Paddle.Environment.set('sandbox');

        const successUrl = orderId
          ? `${window.location.origin}/thanh-toan/thanh-cong?order=${encodeURIComponent(orderId)}`
          : null;

        window.Paddle.Initialize({
          token,
          ...(successUrl ? { checkout: { settings: { successUrl } } } : {}),
          eventCallback: (event) => {
            if (event.name === 'checkout.completed' && successUrl) {
              window.location.assign(successUrl);
            }
          },
        });
      }}
    />
  );
}
