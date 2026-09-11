/* Ảnh preview khai bằng tay — KHÔNG bị `npm run convert` ghi đè.
   (Trước đây phần này nằm trong previews.ts, mà file đó tự sinh lại toàn bộ
   mỗi lần chạy convert, nên khai ở đó là mất.) */
import { REAL_TEMPLATE_PREVIEWS } from './real-templates';

/** Khoá là id ô trong markup ('agentic-tpl-t1'), giá trị là đường dẫn ảnh.
 *
 *  Không liệt kê tay ở đây: ảnh suy thẳng từ bảng REAL_TEMPLATES, cùng nguồn
 *  với tên hiển thị và file tải về. Một bảng nên không lệch được.
 *
 *  Chụp lại ảnh:  node _design/anh-preview.mjs [tên mẫu] */
export const PREVIEWS_EXTRA: Record<string, string> = {
  ...REAL_TEMPLATE_PREVIEWS,
};
