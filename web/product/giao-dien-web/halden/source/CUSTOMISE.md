# Hướng dẫn Tùy biến & Triển khai — Halden (`v1.0.0`)

Tài liệu này hướng dẫn từng bước cách thay đổi hình ảnh nền thung lũng sông băng, danh mục trong Morphing Dropdown (`Discover`, `Journeys`, `Regions`), bảng màu, kiểu chữ và cách triển khai mẫu **Halden** lên môi trường thật.

---

## 10 Bước Tùy biến & Triển khai

### Bước 1: Mở và kiểm tra trực tiếp `index.html`
Vì **Halden** được thiết kế tự chứa hoàn toàn trong một file `index.html` duy nhất (inline `<style>` + `<script>`), bạn có thể mở trực tiếp file này trong trình duyệt hoặc chạy lệnh `npx serve .` để xem thay đổi tức thì.

### Bước 2: Đổi tiêu đề trang (`<title>`) và phông chữ (`Geist`)
Trong phần `<head>` của `index.html`, tìm:
```html
<title>Halden — Expeditions to the edge</title>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap" rel="stylesheet">
```
Nếu thay đổi phông chữ, hãy cập nhật liên kết Google Fonts và thuộc tính `font-family` trong bộ chọn `html, body`.

### Bước 3: Tinh chỉnh bảng màu và tốc độ biến hình Dropdown (`:root`)
Tìm khối `:root` ở đầu thẻ `<style>`:
```css
:root {
  --ink:   #0b1013;
  --panel: rgba(14, 19, 23, 0.84);
  --line:  rgba(255, 255, 255, 0.08);
  --hover: rgba(255, 255, 255, 0.065);
  --text:  #ffffff;
  --soft:  rgba(255, 255, 255, 0.74);
  --muted: rgba(255, 255, 255, 0.60);
  --ease:  cubic-bezier(0.22, 1, 0.36, 1);
  --morph: 0.5s;
}
```
- `--panel`: Độ trong suốt và màu nền kính mờ của Dropdown và Mobile Sheet.
- `--morph`: Thời gian chuyển tiếp chiều rộng, chiều cao và vị trí ngang của Dropdown.

### Bước 4: Đổi ảnh nền Hero (`.hero-bg`) và dòng chữ nhắc cuộn (`.scroll-cue`)
Tìm lớp `.hero-bg` trong `<style>`:
```css
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  background: #1b2a30 url("https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144652_9eaf1d6a-3e8d-4460-bd5b-0ec7221685a0.png") center 45% / cover no-repeat;
  animation: heroIn 2.4s var(--ease) both;
}
```
Và khối `.scroll-cue` ở cuối `<section class="hero">`:
```html
<div class="scroll-cue" aria-hidden="true">
  <span>(</span>
  <span>scroll down</span>
  <span>)</span>
</div>
```

### Bước 5: Đổi biểu trưng SVG (`.logo`) và nút hành động (`.cta`)
Trong `<div class="bar">`:
- Thay thẻ `<svg viewBox="0 0 30 26">` bên trong `<a class="logo" href="#" aria-label="Halden home">` bằng logo thương hiệu của bạn.
- Đổi chữ và liên kết của nút `<a class="cta" href="#contact">Enquire</a>`.

### Bước 6: Tùy biến Bảng A — `DISCOVER` (`#p-discover`, `664 × 358px`)
Trong `<div class="panel" id="p-discover" data-panel="discover">`:
- Cột trái (`.d-list`) gồm 4 thẻ `<a class="d-item" data-img="0..3">` tương ứng với 4 địa hình: **Glaciers**, **Volcanoes**, **Dunes**, **Islands**.
- Cột phải (`.d-media`) gồm 4 thẻ `<img>` xếp chồng theo đúng thứ tự `0..3`. Khi rê chuột hoặc focus vào dòng nào, ảnh tương ứng sẽ chuyển sang `.is-active`.

### Bước 7: Tùy biến Bảng B — `JOURNEYS` (`#p-journeys`, `446 × 308px`)
Trong `<div class="panel" id="p-journeys" data-panel="journeys">`:
- Gồm 2 thẻ ảnh `<a class="card">`: **Small Group Treks** và **Solo Expeditions**.
- Thay đổi đường dẫn `src` của `<img>`, tiêu đề `<strong>`, mô tả `<span>` và thuộc tính `href`.

### Bước 8: Tùy biến Bảng C — `REGIONS` (`#p-regions`, `232 × 218px`)
Trong `<div class="panel" id="p-regions" data-panel="regions">`:
- Gồm 4 liên kết vùng thám hiểm (`.r-link`): **The Nordics**, **Patagonia**, **Himalaya**, **Oceania**.
- Nếu thêm hoặc bớt dòng, bạn có thể điều chỉnh `#p-regions { height: 218px; }` trong `<style>` — hàm `place(id)` sẽ tự động đọc `panel.offsetHeight` mới để biến hình khung `#dd`.

### Bước 9: Đồng bộ nội dung bảng menu di động (`#sheet`)
Khi cập nhật các liên kết trong `#dd`, hãy cập nhật tương ứng trong `<div class="sheet" id="sheet">` để trải nghiệm trên màn hình `<= 860px` đồng nhất hoàn toàn với máy tính.

### Bước 10: Triển khai lên máy chủ (`Deploy`)
Tải trực tiếp `index.html` lên Cloudflare Pages, Vercel, Netlify, GitHub Pages, Amazon S3 hoặc bất kỳ dịch vụ web hosting nào.

---

## 12 Prompt AI Gợi ý cho Khách hàng

1. **Thêm tiêu đề biên tập lớn ở góc dưới bên trái Hero:**
   > "Trong `index.html`, hãy giữ nguyên thanh điều hướng và Morphing Dropdown nhưng thêm một khối tiêu đề biên tập ở góc dưới bên trái (`bottom: 48px; left: clamp(20px, 3.4vw, 52px)`) với dòng chữ `Beyond the Arctic Circle` cỡ `clamp(36px, 5vw, 68px)`."
2. **Mở hộp thoại Đặt lịch tư vấn (`Enquire Modal`) khi bấm nút `Enquire`:**
   > "Trong `index.html`, khi bấm vào nút `.cta` (`Enquire`), hãy mở một hộp thoại kính mờ cùng phong cách với `.dd` (`background: var(--panel)`, `backdrop-filter: blur(22px)`) gồm các trường Họ tên, Email, Vùng muốn đi (`The Nordics`, `Patagonia`, `Himalaya`, `Oceania`) và nút Gửi, đóng bằng phím `Escape`."
3. **Thêm bảng Dropdown thứ 4 cho mục `Our story` (`#p-story`):**
   > "Trong `index.html`, biến liên kết `Our story` thành nút `.trigger` (`data-menu=\"story\"`), thêm `'story'` vào mảng `ORDER` trong `<script>`, và tạo thêm `<div class=\"panel\" id=\"p-story\" data-panel=\"story\">` kích thước `380 × 260px` giới thiệu triết lý thám hiểm của Halden."
4. **Thêm số lượng chỗ trống còn lại (Availability Badge) vào các thẻ `Journeys`:**
   > "Trong `#p-journeys` ở `index.html`, thêm một nhãn nhỏ ở góc trên bên phải mỗi `.card` hiển thị `4 spots left — Oct` và `Custom dates` với nền kính mờ `rgba(14, 19, 23, 0.72)`."
5. **Thêm bản đồ tọa độ nhỏ và nhiệt độ thời tiết vào từng dòng `Regions`:**
   > "Trong `#p-regions` ở `index.html`, mở rộng chiều rộng `#p-regions` lên `310px` và hiển thị tọa độ vĩ độ cùng nhiệt độ trung bình bên phải mỗi vùng (`78°N · -4°C`, `51°S · 6°C`, `28°N · -12°C`, `44°S · 14°C`)."
6. **Chuyển đổi tài nguyên ảnh từ CloudFront về thư mục nội bộ `assets/images/`:**
   > "Trong `index.html`, đổi toàn bộ 7 đường dẫn ảnh CloudFront sang đường dẫn tương đối `./assets/images/hero.png`, `./assets/images/discover-1.png`..`4.png` và `./assets/images/journey-1.png`..`2.png`."
7. **Thêm phần nội dung bên dưới Hero khi cuộn xuống (`#story`, `#glaciers`):**
   > "Trong `index.html`, khi người dùng bấm vào `.scroll-cue` hoặc cuộn xuống dưới `.hero`, hãy thêm 3 phân đoạn nội dung trên nền `--ink` (`#0b1013`) giới thiệu chi tiết các hành trình và câu chuyện thương hiệu."
8. **Tự động ghim cố định (Sticky Glass Header) thanh điều hướng khi cuộn trang:**
   > "Trong `index.html`, chuyển `.header` sang `position: fixed` và tự động thêm nền kính mờ `rgba(11, 16, 19, 0.75)` khi `window.scrollY > 40`."
9. **Thêm hiệu ứng parallax nhẹ cho lớp nền `.hero-bg` khi di chuyển chuột:**
   > "Trong `<script>` của `index.html`, sau khi hoạt ảnh `heroIn` kết thúc (`2.4s`), hãy dịch chuyển nhẹ `.hero-bg` khoảng `±8px` ngược hướng con trỏ chuột trên màn hình desktop."
10. **Thêm bộ chuyển đổi tiền tệ / ngôn ngữ (`EN · USD` / `NO · NOK`) trên thanh Header:**
    > "Trong `.actions` của `index.html`, thêm một nút nhỏ `EN` đặt trước nút `Enquire` cho phép chuyển đổi toàn bộ nhãn điều hướng và nội dung Dropdown giữa tiếng Anh và tiếng Na Uy."
11. **Tùy biến sang thương hiệu Du thuyền Thám hiểm vùng Cực (Polar Yacht Charters):**
    > "Trong `index.html`, đổi tên thương hiệu và tiêu đề sang `Vardø — Polar Yacht Charters`, đổi 4 mục trong `Discover` thành `Icebreakers`, `Fjords`, `Archipelagos`, `Midnight Sun` và cập nhật các mô tả tương ứng."
12. **Thêm điều hướng phím mũi tên Trái/Phải/Lên/Xuống bên trong Dropdown:**
    > "Trong `<script>` của `index.html`, bổ sung xử lý phím `ArrowDown` / `ArrowUp` để di chuyển focus giữa các liên kết bên trong panel đang mở (`data-state=\"active\"`), và phím `ArrowLeft` / `ArrowRight` trên các nút `.trigger` để chuyển nhanh giữa 3 panel."

---

## Bảng Đối chiếu Chuỗi Literal (Literal Edit Map)

Mọi chuỗi dưới đây đã được kiểm tra khớp chính xác số lần xuất hiện thực tế trong `source/index.html`:

| Chuỗi cần tìm (Literal String) | File chứa chuỗi | Số lần xuất hiện | Mục đích chỉnh sửa |
|---|---|---:|---|
| `Halden — Expeditions to the edge` | `index.html` | `1` | Tiêu đề trang (`<title>`) |
| `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144652_9eaf1d6a-3e8d-4460-bd5b-0ec7221685a0.png` | `index.html` | `1` | Ảnh nền Hero thung lũng sông băng |
| `Ancient ice fields carved into blue crevasses.` | `index.html` | `1` | Mô tả mục Glaciers (Bảng Discover) |
| `Walk the rim where the earth is still forming.` | `index.html` | `1` | Mô tả mục Volcanoes (Bảng Discover) |
| `Sand seas shaped by wind and long shadows.` | `index.html` | `1` | Mô tả mục Dunes (Bảng Discover) |
| `Remote shores where the ocean sets the pace.` | `index.html` | `1` | Mô tả mục Islands (Bảng Discover) |
| `Six travellers, one guide, no crowds.` | `index.html` | `1` | Mô tả thẻ Small Group Treks (Bảng Journeys) |
| `Planned end to end around your pace.` | `index.html` | `1` | Mô tả thẻ Solo Expeditions (Bảng Journeys) |
| `Enquire` | `index.html` | `1` | Nút CTA góc trên bên phải |
| `scroll down` | `index.html` | `1` | Chỉ báo cuộn ở giữa màn hình Hero |
| `Our story` | `index.html` | `2` | Liên kết câu chuyện thương hiệu (Desktop + Mobile Sheet) |
