/* Đổi mật khẩu bằng token nhận qua email. */
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const schema = z.object({
  token: z.string().min(32).max(200),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dữ liệu không hợp lệ. Mật khẩu cần tối thiểu 8 ký tự.' },
      { status: 400 }
    );
  }

  const tokenHash = crypto.createHash('sha256').update(parsed.data.token).digest('hex');
  const row = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  if (!row || row.usedAt || row.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Link không hợp lệ hoặc đã hết hạn.' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.$transaction([
    prisma.user.update({ where: { id: row.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { tokenHash }, data: { usedAt: new Date() } }),
    // Đăng xuất mọi phiên cũ: đổi mật khẩu thì thiết bị khác phải đăng nhập lại.
    prisma.session.deleteMany({ where: { userId: row.userId } }),
  ]);

  return NextResponse.json({ ok: true });
}
