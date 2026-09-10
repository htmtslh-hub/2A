import { cookies } from 'next/headers';
import type { LangCode } from '@/generated/data';

/** Ngôn ngữ khách đang xem, do AgenticSite ghi vào cookie khi đổi ngôn ngữ.
 *  Server không đọc được localStorage nên phải đi qua cookie. */
export async function readLang(): Promise<LangCode> {
  const v = (await cookies()).get('agentic-lang')?.value;
  return v === 'en' || v === 'zh' ? v : 'vi';
}
