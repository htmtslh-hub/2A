/* TỰ ĐỘNG SINH từ _src/.image-slots.state.json — chạy `npm run convert` để tạo lại.
   Ảnh preview cho từng ô <ImageSlot>, khoá là id của slot trong markup
   ('agentic-tpl-t1' … 'agentic-tpl-t18', 'agentic-home-t1' …).
   Muốn thêm ảnh: bỏ file vào public/previews/ rồi khai báo trong
   src/lib/previews-extra.ts — file đó viết tay, không bị ghi đè. */
import { PREVIEWS_EXTRA } from './previews-extra';

const PREVIEWS_FROM_DESIGN: Record<string, string> = {
  "agentic-tpl-t1": "/previews/agentic-tpl-t1.webp",
};

export const PREVIEWS: Record<string, string> = {
  ...PREVIEWS_FROM_DESIGN,
  ...PREVIEWS_EXTRA,
};
