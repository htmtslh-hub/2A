import type { LangCode } from '@/generated/data';

/** Mã cho thuộc tính <html lang>. Khác mã nội bộ ở chỗ tiếng Trung cần nói
 *  rõ là giản thể — trình đọc màn hình chọn giọng theo đó.
 *
 *  Nằm riêng ở đây vì cả layout (server) lẫn AgenticSite (client) đều dùng,
 *  mà server-lang.ts thì nạp next/headers nên client không nhập được. */
export const HTML_LANG: Record<LangCode, string> = { vi: 'vi', en: 'en', zh: 'zh-CN' };

/** Chọn ngôn ngữ từ header Accept-Language, cho khách chưa tự chọn.
 *
 *  Đi theo thứ tự ưu tiên (q) của trình duyệt và lấy thứ tiếng đầu tiên site
 *  có. Không khớp thứ tiếng nào, hoặc không có header (bot, công cụ kiểm tra),
 *  thì tiếng Anh — người duyệt của Paddle và khách quốc tế đọc được, còn khách
 *  Việt dùng trình duyệt tiếng Việt vẫn gửi 'vi' nên không bị ảnh hưởng.
 *
 *  VD: "vi-VN,vi;q=0.9,en;q=0.8" -> vi · "fr-FR,zh;q=0.5" -> zh · "ko" -> en */
export function langFromAcceptLanguage(header: string | null | undefined): LangCode {
  if (!header) return 'en';

  const ranked = header
    .split(',')
    .map((part, i) => {
      const [tag = '', ...params] = part.trim().split(';');
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const q = qParam ? Number(qParam.slice(2)) : 1;
      return { base: tag.trim().toLowerCase().split('-')[0], q, i };
    })
    .filter((x) => x.base && Number.isFinite(x.q) && x.q > 0)
    // Cùng q thì giữ thứ tự trình duyệt gửi.
    .sort((a, b) => b.q - a.q || a.i - b.i);

  for (const { base } of ranked) {
    if (base === 'vi' || base === 'en' || base === 'zh') return base;
  }
  return 'en';
}

/** Browser language list uses the same priority order as Accept-Language.
 *  `language` covers browsers that do not expose `languages`. */
export function langFromBrowser(languages: readonly string[] | undefined, language?: string): LangCode {
  const preferences = languages?.length ? languages : language ? [language] : [];
  return langFromAcceptLanguage(preferences.join(','));
}
