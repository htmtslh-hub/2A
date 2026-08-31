/* Tạo tài khoản bằng email + mật khẩu. */
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().trim().max(120).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Email hoặc mật khẩu không hợp lệ (mật khẩu tối thiểu 8 ký tự).' },
      { status: 400 }
    );
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing?.passwordHash) {
    return NextResponse.json({ error: 'Email này đã có tài khoản.' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  // Đã đăng nhập Google trước đó thì chỉ bổ sung mật khẩu, không tạo trùng.
  const user = existing
    ? await prisma.user.update({ where: { email }, data: { passwordHash } })
    : await prisma.user.create({
        data: { email, passwordHash, name: parsed.data.name ?? null },
      });

  return NextResponse.json({ ok: true, id: user.id });
}
