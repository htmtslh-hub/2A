/* Yêu cầu đặt lại mật khẩu: sinh token, gửi email.

   Luôn trả về ok dù email có tồn tại hay không — nếu phân biệt, kẻ xấu sẽ dò
   được email nào đã đăng ký trên hệ thống. */
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendMail, resetPasswordEmail } from '@/lib/mail';

const schema = z.object({
  email: z.string().email(),
  lang: z.enum(['vi', 'en', 'zh']).default('vi'),
});

const TTL_MS = 60 * 60 * 1000; // 1 giờ

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email không hợp lệ.' }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  // Tài khoản chỉ đăng nhập bằng Google (chưa đặt mật khẩu) thì không có gì để
  // đặt lại — vẫn im lặng trả ok để không lộ thông tin.
  if (user?.passwordHash) {
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Vô hiệu các token cũ chưa dùng, tránh việc còn nhiều link sống cùng lúc.
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    await prisma.passwordResetToken.create({
      data: { tokenHash, userId: user.id, expiresAt: new Date(Date.now() + TTL_MS) },
    });

    const base = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    try {
      await sendMail({
        to: email,
        ...resetPasswordEmail(`${base}/dat-lai-mat-khau?token=${token}`, parsed.data.lang),
      });
    } catch (err) {
      console.error('[forgot-password] gửi mail thất bại:', err);
    }
  }

  return NextResponse.json({ ok: true });
}
