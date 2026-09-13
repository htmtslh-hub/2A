import { cookies, headers } from 'next/headers';
import type { LangCode } from '@/generated/data';
import { langFromAcceptLanguage } from '@/lib/lang';

/** Ngôn ngữ khách đang xem.
 *
 *  1. Cookie — AgenticSite ghi khi khách tự đổi ngôn ngữ. Server không đọc được
 *     localStorage nên phải đi qua cookie.
 *  2. Chưa chọn thì theo ngôn ngữ trình duyệt. Trước đây mặc định tiếng Việt,
 *     nên người duyệt tên miền của Paddle mở trang giá chỉ thấy "1.9tr" bằng
 *     tiếng Việt, trong khi Paddle bán bằng USD. */
export async function readLang(): Promise<LangCode> {
  const v = (await cookies()).get('agentic-lang')?.value;
  if (v === 'vi' || v === 'en' || v === 'zh') return v;
  return langFromAcceptLanguage((await headers()).get('accept-language'));
}
