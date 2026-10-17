# FitClub Food 1.0.0 — Assets & Font Provenance

## 1. Hình ảnh sản phẩm cục bộ (`source/assets/img/`)
Ba tệp ảnh WebP tách nền alpha trong suốt (`860 × 900` px, mỗi tệp < 110 KB) được tạo mới bằng công cụ `image-generator` nội bộ (`design/platter-generated.jpg`) kết hợp xử lý tách nền khử răng cưa và cân chỉnh bố cục/sắc độ từ ảnh thiết kế tham chiếu do chủ sản phẩm cung cấp (`media_1792199311495_de83b151.jpg`):

- `platter-club.webp`: Khay mặc định **Club Harvest Platter** gồm tô sứ trắng lớn (xà lách xanh tươi, dâu đen, việt quất, cà chua bi đỏ mọng, đậu gà rang, lát cam vàng và dưa leo), tô gốm nâu hạt óc chó & granola, chén sứ trắng hạt lựu đỏ, cùng 2 quả dâu tây tươi, nửa quả bơ sáp, việt quất và lá húng quế đặt đúng vị trí tham chiếu.
- `platter-protein.webp`: Khay thứ hai **Protein Macro Platter** với sắc độ xanh thảo mộc và hạt đậu gà rang vàng giàu đạm thực vật.
- `platter-berry.webp`: Khay thứ ba **Berry Vitality Platter** nhấn mạnh sắc đỏ ruby của hạt lựu, dâu tây và quả mọng chống oxy hóa.

Toàn bộ biểu tượng (vòng cung đồng tâm, lưới chấm hình thoi góc dưới trái, đường đứt nét góc phải trên và 4 biểu tượng nét mảnh trong thanh tính năng đáy) là **inline SVG** tự vẽ, có đầy đủ `viewBox`, `aria-hidden="true"`, `focusable="false"`. Không hotlink, không nhúng ảnh base64, không sử dụng lại nguyên tấm ảnh chụp màn hình tham chiếu làm trang web.

## 2. Nguồn gốc & Giấy phép Font chữ
- **Plus Jakarta Sans** (Google Fonts tuỳ chọn, weights 400, 500, 600, 700, 800):
  - Nguồn chính thức: `https://fonts.google.com/specimen/Plus+Jakarta+Sans` (`https://github.com/tokotype/PlusJakartaSans`)
  - Tác giả: Tokotype (Gumpita Rahayu)
  - Giấy phép đã xác minh: **SIL Open Font License 1.1 (OFL-1.1)** — cho phép sử dụng thương mại và cá nhân.
- **Stack font hệ thống dự phòng khi ngoại tuyến**: `'Segoe UI', 'Helvetica Neue', Arial, sans-serif`. Trang web hoạt động và hiển thị đầy đủ khi không có kết nối mạng hoặc khi chặn Google Fonts.
