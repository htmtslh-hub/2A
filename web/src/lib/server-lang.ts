import { cookies } from 'next/headers';
import type { LangCode } from '@/generated/data';

/** Ngôn ngữ khách đang xem, do AgenticSite ghi vào cookie khi đổi ngôn ngữ.
 *  Server không đọc được localStorage nên phải đi qua cookie. */
export async function readLang(): Promise<LangCode> {
  const v = (await cookies()).get('agentic-lang')?.value;
  return v === 'en' || v === 'zh' ? v : 'vi';
}

/** Ngôn ngữ cho trang pháp lý: khách chưa tự chọn thì hiện tiếng Anh.
 *
 *  Người duyệt tên miền của Paddle đọc tiếng Anh và vào không có cookie. Để
 *  mặc định tiếng Việt thì điều khoản, bảo mật, hoàn tiền đều đọc không hiểu —
 *  lý do trượt duyệt dễ tránh nhất. Cookie chỉ được ghi khi khách tự đổi ngôn
 *  ngữ (xem AgenticSite), nên người đã chọn tiếng Việt vẫn thấy tiếng Việt. */
export async function readLegalLang(): Promise<LangCode> {
  const v = (await cookies()).get('agentic-lang')?.value;
  return v === 'vi' || v === 'zh' ? v : 'en';
}
