import type { LangCode } from '@/generated/data';

/** Mã cho thuộc tính <html lang>. Khác mã nội bộ ở chỗ tiếng Trung cần nói
 *  rõ là giản thể — trình đọc màn hình chọn giọng theo đó.
 *
 *  Nằm riêng ở đây vì cả layout (server) lẫn AgenticSite (client) đều dùng,
 *  mà server-lang.ts thì nạp next/headers nên client không nhập được. */
export const HTML_LANG: Record<LangCode, string> = { vi: 'vi', en: 'en', zh: 'zh-CN' };
