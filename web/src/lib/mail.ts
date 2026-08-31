/* Gửi email qua Resend. Chưa cấu hình RESEND_API_KEY thì ghi ra log thay vì
   gửi thật, để môi trường dev chạy được mà không cần tài khoản. */
import { Resend } from 'resend';

const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.MAIL_FROM || 'Agentic <hello@agentic.vn>';

const resend = KEY ? new Resend(KEY) : null;

export async function sendMail(opts: { to: string; subject: string; html: string }) {
  if (!resend) {
    console.warn('[mail] chưa có RESEND_API_KEY — bỏ qua gửi thật:', opts.subject, '->', opts.to);
    return { skipped: true as const };
  }
  const res = await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
  if (res.error) throw new Error(res.error.message);
  return { id: res.data?.id };
}

const shell = (title: string, body: string) => `
<div style="background:#16181c;padding:32px 0;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
  <div style="max-width:520px;margin:0 auto;background:#1b1e24;border:1px solid #2a2e36;border-radius:18px;padding:32px;color:#eceef1">
    <div style="font-weight:800;letter-spacing:.14em;font-size:13px;color:#e83a34;margin-bottom:22px">AGENTIC</div>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;color:#fff">${title}</h1>
    ${body}
    <p style="margin:28px 0 0;font-size:12px;color:#8b929b">
      Agentic — Giao diện web cao cấp dựng sẵn. Bạn nhận thư này vì đã đăng ký trên agentic.vn.
    </p>
  </div>
</div>`;

const button = (href: string, label: string) => `
<a href="${href}" style="display:inline-block;margin-top:20px;padding:13px 24px;border-radius:12px;background:#e83a34;color:#fff;font-weight:700;font-size:14px;text-decoration:none">${label}</a>`;

/** Thư gửi khi khách để lại email ở form CTA. */
export function leadEmail(downloadUrl: string) {
  return {
    subject: 'Mẫu miễn phí + mã giảm 20% từ Agentic',
    html: shell(
      'Mẫu miễn phí của bạn đây',
      `<p style="margin:0;font-size:15px;line-height:1.65;color:#c3c9d1">
         Cảm ơn bạn đã quan tâm. Bấm nút bên dưới để tải mẫu miễn phí.
       </p>
       <p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:#c3c9d1">
         Dùng mã <b style="color:#f0a63c">AGENTIC20</b> để giảm 20% khi mua trọn bộ thư viện.
       </p>
       ${button(downloadUrl, 'Tải mẫu miễn phí')}`
    ),
  };
}

/** Thư xác nhận sau khi thanh toán thành công. */
export function orderPaidEmail(opts: { productName: string; amount: number; downloadUrl: string }) {
  const amount = opts.amount.toLocaleString('vi-VN') + '₫';
  return {
    subject: `Đã nhận thanh toán — ${opts.productName}`,
    html: shell(
      'Thanh toán thành công',
      `<p style="margin:0;font-size:15px;line-height:1.65;color:#c3c9d1">
         Bạn đã mua <b style="color:#fff">${opts.productName}</b> với giá <b style="color:#f0a63c">${amount}</b>.
       </p>
       <p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:#c3c9d1">
         Link tải bên dưới có hạn 7 ngày. Bạn cũng có thể tải lại bất cứ lúc nào trong tài khoản của mình.
       </p>
       ${button(opts.downloadUrl, 'Tải giao diện')}`
    ),
  };
}
