/* Gửi email qua Resend. Chưa cấu hình RESEND_API_KEY thì ghi ra log thay vì
   gửi thật, để môi trường dev chạy được mà không cần tài khoản. */
import { Resend } from 'resend';
import type { Lang } from '@/lib/catalog';

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

/* ---------- khung thư ---------- */

const FOOTER: Record<Lang, string> = {
  vi: 'Agentic — Giao diện web cao cấp dựng sẵn. Bạn nhận thư này vì đã đăng ký trên agentic.vn.',
  en: 'Agentic — premium website templates. You are receiving this because you signed up at agentic.vn.',
  zh: 'Agentic — 高端网站模板。你收到这封邮件是因为你在 agentic.vn 注册过。',
};

const shell = (title: string, body: string, lang: Lang) => `
<div style="background:#16181c;padding:32px 0;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
  <div style="max-width:520px;margin:0 auto;background:#1b1e24;border:1px solid #2a2e36;border-radius:18px;padding:32px;color:#eceef1">
    <div style="font-weight:800;letter-spacing:.14em;font-size:13px;color:#e83a34;margin-bottom:22px">AGENTIC</div>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;color:#fff">${title}</h1>
    ${body}
    <p style="margin:28px 0 0;font-size:12px;color:#8b929b">${FOOTER[lang]}</p>
  </div>
</div>`;

const button = (href: string, label: string) => `
<a href="${href}" style="display:inline-block;margin-top:20px;padding:13px 24px;border-radius:12px;background:#e83a34;color:#fff;font-weight:700;font-size:14px;text-decoration:none">${label}</a>`;

const p = (text: string) =>
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#c3c9d1">${text}</p>`;

/* ---------- thư gửi mẫu miễn phí ---------- */

const LEAD: Record<Lang, { subject: string; title: string; body: string[]; cta: string }> = {
  vi: {
    subject: 'Mẫu miễn phí + mã giảm 20% từ Agentic',
    title: 'Mẫu miễn phí của bạn đây',
    body: [
      'Cảm ơn bạn đã quan tâm. Bấm nút bên dưới để tải mẫu miễn phí.',
      'Dùng mã <b style="color:#f0a63c">AGENTIC20</b> để giảm 20% khi mua trọn bộ thư viện.',
    ],
    cta: 'Tải mẫu miễn phí',
  },
  en: {
    subject: 'Your free template + 20% off from Agentic',
    title: 'Here is your free template',
    body: [
      'Thanks for your interest. Hit the button below to download your free template.',
      'Use code <b style="color:#f0a63c">AGENTIC20</b> for 20% off the full library.',
    ],
    cta: 'Download free template',
  },
  zh: {
    subject: '你的免费模板 + Agentic 八折优惠',
    title: '这是你的免费模板',
    body: [
      '感谢关注。点击下方按钮即可下载免费模板。',
      '使用优惠码 <b style="color:#f0a63c">AGENTIC20</b> 购买全套模板库可享 8 折。',
    ],
    cta: '下载免费模板',
  },
};

export function leadEmail(downloadUrl: string, lang: Lang = 'vi') {
  const t = LEAD[lang] ?? LEAD.vi;
  return {
    subject: t.subject,
    html: shell(t.title, t.body.map(p).join('') + button(downloadUrl, t.cta), lang),
  };
}

/* ---------- thư xác nhận đơn ---------- */

const PAID: Record<
  Lang,
  { subject: (n: string) => string; title: string; line1: (n: string, a: string) => string; line2: string; cta: string }
> = {
  vi: {
    subject: (n) => `Đã nhận thanh toán — ${n}`,
    title: 'Thanh toán thành công',
    line1: (n, a) => `Bạn đã mua <b style="color:#fff">${n}</b> với giá <b style="color:#f0a63c">${a}</b>.`,
    line2: 'Link tải bên dưới có hạn 7 ngày. Bạn cũng có thể tải lại bất cứ lúc nào trong tài khoản của mình.',
    cta: 'Tải giao diện',
  },
  en: {
    subject: (n) => `Payment received — ${n}`,
    title: 'Payment successful',
    line1: (n, a) => `You bought <b style="color:#fff">${n}</b> for <b style="color:#f0a63c">${a}</b>.`,
    line2: 'The link below is valid for 7 days. You can also re-download any time from your account.',
    cta: 'Download template',
  },
  zh: {
    subject: (n) => `已收到付款 — ${n}`,
    title: '支付成功',
    line1: (n, a) => `你已购买 <b style="color:#fff">${n}</b>，金额 <b style="color:#f0a63c">${a}</b>。`,
    line2: '下方链接 7 天内有效。你也可以随时在账号中重新下载。',
    cta: '下载模板',
  },
};

export function orderPaidEmail(opts: {
  productName: string;
  amountLabel: string;
  downloadUrl: string;
  lang?: Lang;
}) {
  const lang = opts.lang ?? 'vi';
  const t = PAID[lang] ?? PAID.vi;
  return {
    subject: t.subject(opts.productName),
    html: shell(
      t.title,
      p(t.line1(opts.productName, opts.amountLabel)) +
        p(t.line2) +
        button(opts.downloadUrl, t.cta),
      lang
    ),
  };
}
