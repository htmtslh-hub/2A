import { headers } from 'next/headers';
import type { LangCode } from '@/generated/data';
import { langFromAcceptLanguage } from '@/lib/lang';

/** Ngôn ngữ theo tham số hreflang (?hl=vi|en|zh) nếu có, mặc định theo ưu tiên của trình duyệt/hệ thống. */
export async function readLang(): Promise<LangCode> {
  const h = await headers();
  const explicit = h.get('x-forge-lang');
  if (explicit === 'vi' || explicit === 'en' || explicit === 'zh') {
    return explicit;
  }
  return langFromAcceptLanguage(h.get('accept-language'));
}
