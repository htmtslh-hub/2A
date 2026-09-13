/* Để lại email chờ sản phẩm sắp ra mắt (Agent, Masterprompt).

   Dùng lại bảng Lead, không thêm bảng mới: mỗi email một dòng, còn các sản phẩm
   khách đang chờ ghi nối vào cột `source` (vd "cta,notify-agent"). Email đã có
   từ form nhận mẫu miễn phí thì chỉ nối thêm nhãn, không ghi đè nguồn cũ.

   Không gửi thư xác nhận: gửi thư tới bất kỳ địa chỉ nào ai đó gõ vào là cho
   người lạ mượn tên miền đi spam. Khách thấy xác nhận ngay trên màn hình. */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const schema = z.object({
  email: z.string().trim().email().max(200),
  product: z.enum(['agent', 'masterprompt']),
  lang: z.enum(['vi', 'en', 'zh']).default('vi'),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const tag = `notify-${parsed.data.product}`;

  const existing = await prisma.lead.findUnique({ where: { email } });
  if (!existing) {
    try {
      await prisma.lead.create({ data: { email, lang: parsed.data.lang, source: tag } });
    } catch (err) {
      // Hai lần gửi cùng lúc: lần kia đã tạo dòng này rồi, coi như xong.
      if ((err as { code?: string }).code !== 'P2002') throw err;
    }
  } else if (!existing.source.split(',').includes(tag)) {
    await prisma.lead.update({
      where: { email },
      data: { source: `${existing.source},${tag}` },
    });
  }

  return NextResponse.json({ ok: true });
}
