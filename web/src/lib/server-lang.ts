import { headers } from 'next/headers';
import type { LangCode } from '@/generated/data';
import { langFromAcceptLanguage } from '@/lib/lang';

/** Ngôn ngữ theo ưu tiên của trình duyệt/hệ thống. */
export async function readLang(): Promise<LangCode> {
  return langFromAcceptLanguage((await headers()).get('accept-language'));
}
