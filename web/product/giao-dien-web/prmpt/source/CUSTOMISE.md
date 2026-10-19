# Hướng dẫn Tùy biến & Triển khai — prmpt (`v1.0.0`)

Tài liệu này hướng dẫn từng bước cách thay đổi hai video tương tác ở Hero, 10 ảnh lookbook trong bảng đen (`#black-panel`), thuật toán lưới `buildLayout`, thông tin bộ sưu tập, giá bán và cách xuất bản mẫu giao diện **prmpt** lên môi trường thật.

---

## 10 Bước Tùy biến & Triển khai

### Bước 1: Chọn chế độ làm việc (Chỉnh sửa mã nguồn React 19 hoặc dùng bản dựng sẵn)
- **Cách A (Tùy biến mã nguồn React 19 + TypeScript + Vite 6):** Cài đặt Node.js `>= 18`, chạy `npm install` và `npm run dev` trong thư mục `source/`, chỉnh sửa `src/App.tsx` hoặc `src/index.css` rồi chạy `npm run build` để xuất bản dựng vào `dist/`.
- **Cách B (Chạy ngay không cần Node.js):** Thư mục `built/` đã chứa sẵn bản biên dịch tĩnh hoàn chỉnh (`built/index.html` và `built/assets/*`), có thể mở qua máy chủ tĩnh bất kỳ (`npx serve built`).

### Bước 2: Đổi tiêu đề trang (`<title>`) và phông chữ (`Inter Tight`)
Mở `index.html`, tìm thẻ `<title>` và liên kết Google Fonts:
```html
<title>prmpt — ARCHIVE COLLECTION &quot;PROMPT&quot;</title>
<link
  href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500&display=swap"
  rel="stylesheet"
/>
```
Nếu thay đổi sang phông chữ khác, hãy cập nhật liên kết trong `index.html` và thuộc tính `font-family` trong `src/index.css`.

### Bước 3: Thay đổi 2 luồng video ở Hero (`LEFT_VIDEO_URL` và `RIGHT_VIDEO_URL`)
Mở `src/App.tsx`, tìm hai hằng số ở đầu file:
```ts
const LEFT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4';
const RIGHT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4';
```
- Để tua mượt theo vị trí chuột trên Desktop, nên dùng video MP4 (H.264) có khoảng cách keyframe ngắn (GOP nhỏ, thời lượng 3–8 giây).

### Bước 4: Thay đổi danh sách 10 ảnh bộ sưu tập (`GALLERY_IMAGES`)
Trong `src/App.tsx`, mảng `GALLERY_IMAGES` chứa 10 đường dẫn ảnh sản phẩm hiển thị trong `#black-panel`. Bạn có thể thay bằng đường dẫn ảnh nội bộ (ví dụ `./assets/look-01.webp`) hoặc CDN của thương hiệu, cũng như tăng/giảm số lượng ảnh — hàm `buildLayout(GALLERY_IMAGES.length, cols)` sẽ tự động sinh thêm hoặc bớt hàng tương ứng.

### Bước 5: Tùy biến Logo SVG (`#hero-logo`) và Con trỏ tùy chỉnh (`#custom-cursor`)
Trong `src/App.tsx`:
- Khối `#hero-logo` chứa SVG `viewBox="0 0 355 110"` với chữ `"prmpt"` và dấu `®` màu trắng (`fill="white"`).
- Khối `#custom-cursor` chứa SVG `48×48` hiển thị trên màn hình Desktop (`>= 1024px`, không cảm ứng).
- Cả hai đều dùng `mix-blend-exclusion` nên phải giữ màu vẽ là `#FFFFFF` (`white`) để tự động đảo màu trên nền sáng/tối.

### Bước 6: Tùy biến dòng mô tả kỹ thuật/lookbook (`#hero-caption`) và Thanh điều hướng (`#hero-nav`)
Trong `src/App.tsx`:
- Chỉnh sửa nội dung đoạn văn trong `#hero-caption` (bên dưới logo ở góc trái).
- Chỉnh sửa nhãn `ABOUT` và `[ CART ]` trong `#hero-nav` (góc trên phải). Nếu muốn gắn sự kiện bấm mở giỏ hàng hoặc ngăn kéo giới thiệu, hãy đổi `pointer-events-none` trên phần tử con thành `pointer-events-auto`.

### Bước 7: Tùy biến tên bộ sưu tập, giá bán (`#outro-info`) và bộ ký tự xoay vòng (`CIRCLE_SYMBOLS`)
Trong `src/App.tsx`:
- Mảng `const CIRCLE_SYMBOLS = ['8', '$', '^^', '%', '/'] as const;` điều khiển ký tự nhảy ngẫu nhiên trong vòng tròn `#circle-symbol` mỗi `80ms` khi cuộn.
- Thay đổi tên bộ sưu tập `ARCHIVE COLLECTION` / `"PROMPT"` và mức giá `$97,33` trong khối `#outro-info`.

### Bước 8: Tùy biến nút hành động cuối trang (`#outro-buy`) và Chân trang (`#outro-footer`)
Trong `src/App.tsx`:
- Khối `#outro-buy` hiển thị nút viên thuốc trắng (`borderRadius: 1335`) mang chữ `"view"` phóng to từ `scale(0)` lên `scale(1)` khi cuộn vào giai đoạn Outro (`scrollY > vh + maxScroll`).
- Khối `#outro-footer` hiển thị `PRMPT (R) 2026` và `PRIVACY POLICY` ở góc dưới trái.

### Bước 9: Tinh chỉnh thuật toán lưới `buildLayout` và công thức phóng ảnh `.bp-card`
Trong `src/App.tsx`:
- Hàm `buildLayout(count, cols)` đặt 1 ảnh ở mỗi hàng (`a = (r * 2 + (r % 2)) % cols`), và cứ mỗi 3 hàng (`r % 3 === 0`) lại đặt thêm ảnh thứ hai ở cột `b = (a + 2) % cols`.
- Tỷ lệ phóng của mỗi thẻ `.bp-card` trong vòng lặp `requestAnimationFrame` được tính bằng:
  - `enter = Math.min(1, (vh - top) / (vh * 0.6))`
  - `exit = Math.min(1, bottom / (vh * 0.4))`
  - `scale = Math.max(0, Math.min(enter, exit))`

### Bước 10: Biên dịch kiểm tra và triển khai (`Deploy`)
Chạy lệnh kiểm tra TypeScript và đóng gói sản phẩm:
```bash
npm run build
```
Sau khi hoàn tất (`✓ built`), tải nội dung thư mục `dist/` (hoặc `built/`) lên Vercel, Netlify, Cloudflare Pages hoặc máy chủ tĩnh bất kỳ.

---

## 12 Prompt AI Gợi ý cho Khách hàng

1. **Thay đổi thương hiệu, tên bộ sưu tập và giá bán:**
   > "Đọc file `src/App.tsx` và `index.html` đính kèm. Hãy đổi tên thương hiệu thành `[TÊN THƯƠNG HIỆU]`, tên bộ sưu tập từ `ARCHIVE COLLECTION / \"PROMPT\"` thành `[TÊN BỘ SƯU TẬP]`, giá từ `$97,33` thành `[GIÁ MỚI]` và dòng bản quyền từ `PRMPT (R) 2026` thành `[BẢN QUYỀN MỚI]`. Giữ nguyên bố cục `mix-blend-exclusion` và trả về đầy đủ file đã sửa."
2. **Thay thế 2 video Hero và 10 ảnh bộ sưu tập bằng tài nguyên mới:**
   > "Trong `src/App.tsx`, hãy thay `LEFT_VIDEO_URL`, `RIGHT_VIDEO_URL` và mảng `GALLERY_IMAGES` bằng danh sách URL video/ảnh tôi cung cấp dưới đây. Giữ nguyên cơ chế dead zone, `!video.seeking` và thuật toán `buildLayout`."
3. **Kích hoạt sự kiện bấm vào nút `view` (`#outro-buy`) để mở trang sản phẩm:**
   > "Trong `src/App.tsx`, hãy đổi khối `#outro-buy` thành thẻ `<a href=\"[URL SẢN PHẨM]\">` có `pointer-events-auto` khi `outroProgress > 0.5`, để người dùng có thể bấm vào nút `view` ở cuối trang."
4. **Mở ngăn kéo Giỏ hàng (`Cart Drawer`) khi bấm vào `[ CART ]`:**
   > "Trong `src/App.tsx`, hãy bật `pointer-events-auto` cho nút `[ CART ]` ở `#hero-nav` và tạo một ngăn kéo giỏ hàng trượt từ bên phải hiển thị sản phẩm `ARCHIVE COLLECTION \"PROMPT\" — $97,33`, hỗ trợ đóng bằng phím `Escape`."
5. **Mở hộp thoại Giới thiệu (`About Modal`) khi bấm vào `ABOUT` hoặc biểu tượng Hamburger:**
   > "Trong `src/App.tsx`, hãy thêm trạng thái mở lớp phủ `ABOUT` toàn màn hình khi người dùng bấm vào chữ `ABOUT` hoặc biểu tượng 2 vạch ngang trên `#hero-nav`, hiển thị câu chuyện thương hiệu và đóng bằng phím `Escape`."
6. **Thêm hộp thoại xem ảnh phóng to (`Lightbox`) khi bấm vào từng thẻ `.bp-card`:**
   > "Trong `src/App.tsx`, hãy bật `pointer-events-auto` cho các thẻ `.bp-card` trong `#black-panel` để khi bấm vào một ảnh, trang mở chế độ xem toàn màn hình kèm số thứ tự `01 / 10` và nút đóng."
7. **Tùy chỉnh bộ ký tự nhảy ngẫu nhiên trong vòng tròn `#circle-symbol`:**
   > "Trong `src/App.tsx`, hãy đổi mảng `CIRCLE_SYMBOLS` từ `['8', '$', '^^', '%', '/']` sang bộ ký tự riêng của thương hiệu tôi: `[DANH SÁCH KÝ TỰ]`, đồng thời chỉnh tốc độ throttle từ `80ms` sang `120ms`."
8. **Điều chỉnh mật độ lưới ảnh trong `#black-panel`:**
   > "Trong `src/App.tsx`, hãy chỉnh sửa hàm `buildLayout(count, cols)` để cứ mỗi 2 hàng (`r % 2 === 0`) sẽ hiển thị 2 ảnh thay vì mỗi 3 hàng (`r % 3 === 0`), giúp chiều dài cuộn gọn hơn."
9. **Thay đổi SVG Logo ở góc trên bên trái (`#hero-logo`):**
   > "Trong `src/App.tsx`, hãy thay thế thẻ `<svg>` bên trong `#hero-logo` bằng mã SVG wordmark màu trắng (`fill=\"white\"`) của thương hiệu tôi, giữ nguyên kích thước đáp ứng `124px / 266px / 355px`."
10. **Bổ sung âm thanh nền tùy chọn có nút Bật/Tắt (`Mute / Unmute`):**
    > "Trong `src/App.tsx`, hãy thêm một nút `[ SOUND OFF / ON ]` nhỏ cạnh `ABOUT` trên `#hero-nav` để người dùng chủ động bật/tắt âm thanh của video đang hiển thị."
11. **Chuyển đổi ngôn ngữ giao diện sang Tiếng Việt / Tiếng Nhật / Tiếng Pháp:**
    > "Trong `src/App.tsx` và `index.html`, hãy dịch toàn bộ các chuỗi hiển thị (`ABOUT`, `[ CART ]`, `#hero-caption`, `ARCHIVE COLLECTION`, `view`, `PRIVACY POLICY`) sang `[NGÔN NGỮ MỤC TIÊU]`, giữ nguyên kiểu chữ `Inter Tight`."
12. **Kiểm tra toàn diện trước khi xuất bản (`Pre-publish Audit`):**
    > "Hãy kiểm tra toàn bộ `index.html`, `src/App.tsx` và `src/index.css` xem còn đường dẫn mẫu, chữ mẫu hay lỗi TypeScript nào không, và liệt kê danh sách kiểm tra trên Desktop (`1440px`), Tablet (`820px`) và Mobile (`375px`)."

---

## Bảng Đối chiếu Chuỗi Literal (Literal Edit Map)

Mọi chuỗi dưới đây đã được kiểm tra khớp chính xác số lần xuất hiện thực tế trong mã nguồn `source/`:

| Chuỗi cần tìm (Literal String) | File chứa chuỗi | Số lần xuất hiện | Mục đích chỉnh sửa |
|---|---|---:|---|
| `prmpt — ARCHIVE COLLECTION &quot;PROMPT&quot;` | `index.html`, `src/App.tsx` | `2` (`index.html`), `1` (`src/App.tsx`) | Tiêu đề trang, thẻ OG và thẻ `<h1>` ẩn cho trình đọc màn hình |
| `hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4` | `src/App.tsx` | `1` | Đường dẫn video bên trái (`LEFT_VIDEO_URL`) |
| `hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4` | `src/App.tsx` | `1` | Đường dẫn video bên phải (`RIGHT_VIDEO_URL`) |
| `const CIRCLE_SYMBOLS = ['8', '$', '^^', '%', '/'] as const;` | `src/App.tsx` | `1` | Danh sách ký tự nhảy ngẫu nhiên khi cuộn |
| `When switching between videos near the center` | `src/App.tsx` | `1` | Nội dung đoạn chú thích `#hero-caption` |
| `[ CART ]` | `src/App.tsx` | `1` | Nhãn giỏ hàng góc trên bên phải |
| `ARCHIVE COLLECTION` | `src/App.tsx` | `1` | Nhãn bộ sưu tập ở `#outro-info` |
| `$97,33` | `src/App.tsx` | `1` | Giá hiển thị ở `#outro-info` |
| `PRMPT (R) 2026` | `src/App.tsx` | `1` | Bản quyền ở chân trang `#outro-footer` |
| `PRIVACY POLICY` | `src/App.tsx` | `1` | Liên kết chính sách ở chân trang `#outro-footer` |
