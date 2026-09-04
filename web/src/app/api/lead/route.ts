/* Form CTA: lưu email và gửi mẫu miễn phí + mã giảm giá. */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendMail, leadEmail } from '@/lib/mail';

const schema = z.object({
  email: z.string().email(),
  lang: z.enum(['vi', 'en', 'zh']).default('vi'),
  source: z.string().max(40).default('cta'),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email không hợp lệ.' }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  // Gửi lại email lần nữa cũng không sao, nhưng chỉ lưu một bản ghi.
  await prisma.lead.upsert({
    where: { email },
    update: { lang: parsed.data.lang },
    create: { email, lang: parsed.data.lang, source: parsed.data.source },
  });

  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const mail = leadEmail(`${base}/api/download?free=1`, parsed.data.lang);

  try {
    await sendMail({ to: email, ...mail });
  } catch (err) {
    // Email hỏng không được làm hỏng trải nghiệm — đã lưu lead là đủ.
    console.error('[lead] gửi mail thất bại:', err);
  }

  return NextResponse.json({ ok: true });
}
