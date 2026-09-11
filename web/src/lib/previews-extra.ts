/* Ảnh preview khai bằng tay — KHÔNG bị `npm run convert` ghi đè.
   (Trước đây phần này nằm trong previews.ts, mà file đó tự sinh lại toàn bộ
   mỗi lần chạy convert, nên khai ở đó là mất.) */

/** Ảnh đã chụp sẵn cho các mẫu trong _design/templates/.
 *  Chụp lại toàn bộ:  node _design/anh-preview.mjs
 *  Chụp một mẫu:      node _design/anh-preview.mjs kinetiq */
export const TEMPLATE_PREVIEW = {
  kinetiq: '/previews/kinetiq.webp',
  'dune-pass': '/previews/dune-pass.webp',
  tidal: '/previews/tidal.webp',
  'free-sample': '/previews/free-sample.webp',
} as const;

/** Gắn ảnh vào ô hiển thị trong thư viện.
 *
 *  Khoá là id của ô trong markup: 'agentic-tpl-<mã danh mục>'.
 *  Ví dụ khi đã chốt mẫu Kinetiq nằm ở ô t3:
 *      'agentic-tpl-t3': TEMPLATE_PREVIEW.kinetiq,
 *
 *  Đang để trống vì mã danh mục t1…t18 chưa chốt trỏ vào mẫu nào. Bảng này
 *  phải khớp với TEMPLATE_FILE trong lib/catalog — một bên quyết định khách
 *  NHÌN thấy mẫu nào, một bên quyết định khách TẢI VỀ file nào. Lệch nhau là
 *  khách xem ảnh mẫu này mà tải về mẫu khác. */
export const PREVIEWS_EXTRA: Record<string, string> = {};
