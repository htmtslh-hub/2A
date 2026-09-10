/* Nhận yêu cầu đặt làm agent từ trang /dich-vu.
   Khác /api/lead: bên kia chỉ đổi email lấy mẫu miễn phí, còn đây là khách
   hỏi mua dịch vụ nên phải lưu đủ thông tin để gọi lại được, và phải báo
   cho chủ site biết ngay. */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendMail, enquiryReceiptEmail, enquiryAlertEmail } from '@/lib/mail';
import { COMPANY } from '@/lib/company';
import { SERVICE_KINDS } from '@/lib/service-content';

const schema = z.object({
  kind: z.enum(SERVICE_KINDS),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  budget: z.string().trim().max(60).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(4000),
  lang: z.enum(['vi', 'en', 'zh']).default('vi'),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }
  const d = parsed.data;
  const blank = (v?: string) => (v && v.length ? v : null);

  const row = await prisma.serviceEnquiry.create({
    data: {
      kind: d.kind,
      name: d.name,
      email: d.email.toLowerCase(),
      phone: blank(d.phone),
      company: blank(d.company),
      budget: blank(d.budget),
      message: d.message,
      lang: d.lang,
    },
  });

  // Đã lưu là coi như xong. Thư hỏng thì ghi log chứ không báo lỗi cho khách,
  // vì yêu cầu vẫn nằm trong cơ sở dữ liệu và vẫn xử lý được.
  try {
    await sendMail({ to: row.email, ...enquiryReceiptEmail(d.lang) });
  } catch (err) {
    console.error('[dich-vu] không gửi được thư xác nhận:', err);
  }
  try {
    await sendMail({ to: COMPANY.email, ...enquiryAlertEmail({ ...d, email: row.email }) });
  } catch (err) {
    console.error('[dich-vu] không gửi được thư báo cho chủ site:', err);
  }

  return NextResponse.json({ ok: true });
}
