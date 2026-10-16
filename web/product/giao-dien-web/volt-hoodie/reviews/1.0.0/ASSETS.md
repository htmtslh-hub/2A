# Volt Hoodie 1.0.0 — Assets & Font Provenance

## 1. Hình ảnh sản phẩm cục bộ (`source/assets/img/`)
Ba tệp ảnh WebP tách nền alpha trong suốt (660 × 1056 px, mỗi tệp < 120 KB) được tạo mới bằng công cụ `image-generator` nội bộ kết hợp xử lý tách nền khử răng cưa và cân chỉnh sắc độ từ ảnh thiết kế tham chiếu do chủ sản phẩm cung cấp (`media_1792157371150_e4ac8e45.jpg`):

- `hoodie-volt.webp`: Phối màu chính **Volt Yellow (`#FFD507`) & Matte Carbon (`#161616`)** với mũ áo vàng lòng đen, hai dây rút đen thẳng đứng, mảng ngực chữ V vàng sắc nét, tay áo đen họa tiết đa giác (low-poly constellation), viền túi chéo vàng, bo gấu vàng và cổ tay đen.
- `hoodie-mint.webp`: Phối màu thứ hai **Cyber Mint (`#3CE8B5`) & Matte Carbon (`#161616`)**, khớp với chấm màu thứ hai (`#5CEBC0`) trên bảng chọn `Color`.
- `hoodie-arctic.webp`: Phối màu thứ ba **Arctic White (`#F5F7FA`) & Matte Carbon (`#161616`)**, khớp với chấm màu thứ ba (`#F8F9FB`) trên bảng chọn `Color`.

Toàn bộ biểu tượng (logo áo hoodie nét trắng góc trái trên, kính lúp tìm kiếm, nút menu 3 gạch, icon mạng xã hội Facebook & Instagram) là **inline SVG** tự vẽ, có đầy đủ `viewBox`, `aria-hidden="true"`, `focusable="false"`. Không hotlink, không nhúng ảnh base64, không sử dụng lại nguyên tấm ảnh chụp màn hình tham chiếu làm trang web.

## 2. Nguồn gốc & Giấy phép Font chữ
- **Poppins** (Google Fonts tuỳ chọn, weights 400, 500, 600, 700, 800):
  - Nguồn chính thức: `https://fonts.google.com/specimen/Poppins` (`https://github.com/itfoundry/Poppins`)
  - Tác giả: Indian Type Foundry, Jonny Pinhorn, Ninad Kale
  - Giấy phép đã xác minh: **SIL Open Font License 1.1 (OFL-1.1)** — cho phép sử dụng thương mại và cá nhân.
- **Stack font hệ thống dự phòng khi ngoại tuyến**: `'Segoe UI', 'Helvetica Neue', Arial, sans-serif`. Trang web hoạt động và hiển thị đầy đủ khi không có kết nối mạng hoặc khi chặn Google Fonts.
