# Hướng dẫn Tùy biến & Triển khai — OceanPulse (`v1.0.0`)

Tài liệu này hướng dẫn từng bước cách thay đổi nội dung thương hiệu **OceanPulse**, video rạn san hô từ trên cao, nhãn điểm nhấn (`Pure Waters`, `Coral Bed`), bảng menu trượt (`.navsheet`) và triển khai trang lên môi trường thực tế.

---

## 10 Bước Tùy biến & Triển khai

### Bước 1: Mở và xem trực tiếp `index.html`
**OceanPulse** được đóng gói tự chứa trong một file `index.html` duy nhất (inline `<style>` và `<script>`, không cần bước build hay thư viện bên ngoài). Bạn có thể mở trực tiếp `index.html` trong trình duyệt hoặc chạy `npx serve .` để xem trước.

### Bước 2: Đổi tiêu đề trang (`<title>`) và phông chữ (`Plus Jakarta Sans`)
Trong phần `<head>` của `index.html`, tìm:
```html
<title>OceanPulse — Saving Oceans, Uniting The Coastline</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```
Nếu muốn đổi phông chữ, hãy cập nhật liên kết Google Fonts và thuộc tính `font-family` trong bộ chọn `html, body`.

### Bước 3: Tinh chỉnh biến CSS toàn cục (`:root`)
Ở đầu thẻ `<style>`, khối `:root` quản lý toàn bộ màu sắc, độ bo góc, khoảng đệm và ảnh nền trong chữ `Oceans,`:
```css
:root {
  --ink: #111417;
  --muted: #6b7178;
  --bg: #ffffff;
  --radius-card: 26px;
  --pad: clamp(20px, 2.2vw, 34px);
  --ease-out: cubic-bezier(.16,1,.3,1);
  --ease-in: cubic-bezier(.7,0,.84,0);
  --stagger: 72ms;
  --nature-img: url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260831_224622_4eeb9d43-9e46-4483-9530-1eb4ef4c942d.png&w=1920&q=85");
}
```

### Bước 4: Đổi tên thương hiệu (`.brand__name`) và liên kết thanh điều hướng (`.nav__links`)
Trong `<nav class="nav" aria-label="Primary">`:
- Thay nội dung trong `<span class="brand__name anim" style="--d:2">OceanPulse</span>`.
- Cập nhật 4 mục điều hướng `Mission`, `Programs`, `News`, `Help` trong `<ul class="nav__links">`.

### Bước 5: Tùy biến tiêu đề Hero và hộp chữ phủ ảnh biển (`.hl`)
Trong `<h1 class="hero__title">`:
```html
<span class="hero__line anim" style="--d:9">Saving <span class="hl">Oceans,</span></span>
<span class="hero__line anim" style="--d:10">Uniting The Coastline</span>
```
Lớp `.hl` sử dụng `background-image: var(--nature-img)` và `background-position: 56% 14%` để lấy đúng vùng nước biển xanh thẳm làm nền cho từ `Oceans,`.

### Bước 6: Thay đổi đoạn văn sứ mệnh (`.hero__text`) và nút CTA (`.cta`)
- Chỉnh sửa nội dung trong `<p class="hero__text anim" style="--d:11">`.
- Thay đổi nhãn `Talk to us` và đích liên kết `href="#contact"` trên thẻ `<a class="cta" href="#contact">`.

### Bước 7: Thay video rạn san hô (`.hero__video`) và ảnh Poster
Trong `<div class="hero__media anim" style="--d:0">`, cập nhật thuộc tính `poster` trên thẻ `<video>` và `src` trên thẻ `<source type="video/mp4">`:
```html
<video class="hero__video anim" style="--d:1" autoplay muted loop playsinline preload="auto" poster="...">
  <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260831_231820_baf1d009-9cc2-4f94-a720-b04a94a8eab4.mp4" type="video/mp4">
</video>
```

### Bước 8: Điều chỉnh 2 điểm chú thích trên thẻ Video (`.marker--water` & `.marker--reef`)
Hai điểm chú thích `Pure Waters` (`left: 56%; top: 26%`) và `Coral Bed` (`left: 59%; top: 59%`) có thể đổi nhãn văn bản và tọa độ phần trăm trực tiếp trong CSS (`.marker--water`, `.marker--reef`).

### Bước 9: Cập nhật liên kết mạng xã hội và ngăn kéo menu trượt (`#navSheet`)
- Thay đường dẫn `href="#facebook"`, `href="#x"`, `href="#linkedin"` ở cả 3 nơi: `.socials` (góc dưới phải thẻ video), `.socials--mobile` (hiển thị ở màn hình `<= 768px`) và `.navsheet__socials` (bên trong menu trượt).
- Đồng bộ các mục menu trong `<ul class="navsheet__list">` với thanh điều hướng chính.

### Bước 10: Triển khai lên máy chủ (`Deploy`)
Tải trực tiếp `index.html` lên Cloudflare Pages, Vercel, Netlify, GitHub Pages hoặc máy chủ tĩnh bất kỳ. Lưu ý giữ nguyên thứ tự DOM `.hero__media` đứng trước `.hero__left` để nút `.burger` (`z-index: 70`) luôn nổi trên `.navsheet` (`z-index: 60`) mà không cần tạo stacking context trên `.hero__left`.

---

## 12 Prompt AI Gợi ý cho Khách hàng

1. **Thêm hộp thoại Liên hệ (`Talk to us Modal`) khi bấm nút CTA:**
   > "Trong `index.html`, khi người dùng nhấn vào `.cta` hoặc `.navsheet__cta` (`Talk to us`), hãy mở một hộp thoại kính mờ tối màu (`rgba(6, 22, 31, .92)`, `backdrop-filter: blur(24px)`) gồm Họ tên, Email, Chương trình quan tâm (`Reef Restoration`, `Coastal Cleanup`, `Marine Research`) và nút gửi, hỗ trợ đóng bằng phím `Escape`."
2. **Thêm điểm chú thích thứ 3 (`.marker--kelp`) trên thẻ video:**
   > "Trong `.hero__media` của `index.html`, thêm một điểm chú thích thứ 3 `<div class=\"marker marker--kelp\">` tại vị trí `left: 38%; top: 44%` với nhãn `Kelp Sanctuary` và hiệu ứng xuất hiện tiếp nối `--d:18`, `--d:19`, `--d:20`."
3. **Thêm bộ đếm số liệu bảo tồn biển trực tiếp dưới đoạn mô tả `.hero__text`:**
   > "Trong `.hero__content` của `index.html`, thêm một hàng 3 chỉ số nhỏ gọn bên cạnh nút `.cta` gồm `142+ Coastal Miles`, `38 Coral Nurseries`, `12K Volunteers` dùng phông `Plus Jakarta Sans` mà vẫn đảm bảo chiều cao trang vừa khít `100svh` không phát sinh thanh cuộn."
4. **Thêm nút bật/tắt âm thanh hoặc tạm dừng video ở góc trên bên phải `.hero__media`:**
   > "Trong `.hero__media` của `index.html`, thêm một nút tròn nhỏ `40x40px` nền kính mờ ở góc trên bên phải (`top: 20px; right: 20px; z-index: 4`) cho phép tạm dừng/phát tiếp video `.hero__video` kèm nhãn `aria-label` chuẩn trợ năng."
5. **Chuyển đổi tài nguyên video và ảnh sang thư mục nội bộ `./assets/`:**
   > "Trong `index.html`, thay thế đường dẫn video CloudFront và ảnh poster Higgs bằng đường dẫn tương đối `./assets/reef-aerial.mp4` và `./assets/reef-poster.webp` ở cả biến `:root --nature-img` lẫn thuộc tính `poster` của `<video>`."
6. **Thêm chế độ xem chi tiết từng chương trình khi bấm vào `Mission`, `Programs`, `News`, `Help`:**
   > "Trong `index.html`, khi nhấn vào từng liên kết `Mission`, `Programs`, `News`, `Help` trên `.nav__links` hoặc `.navsheet__list`, hãy mở bảng thông tin trượt từ bên phải hiển thị tóm tắt hoạt động, chỉ số tác động và nút đăng ký tình nguyện viên."
7. **Tùy biến bảng màu sang tông Xanh Đại Dương Sâu (`Deep Abyssal Dark Mode`):**
   > "Trong `:root` của `index.html`, chuyển giao diện desktop sang chế độ nền tối đại dương với `--bg: #05131c`, `--ink: #f2f8fb`, `--muted: #94aebc`, đồng thời điều chỉnh màu nền `.socials` góc dưới phải thẻ video cho hài hòa."
8. **Thêm chú thích tọa độ GPS trực tiếp vào nhãn `.marker__label`:**
   > "Trong `.hero__media` của `index.html`, bổ sung tọa độ địa lý nhỏ màu `--muted` bên cạnh nhãn `Pure Waters` (`18.2871° S`) và `Coral Bed` (`147.6992° E`) với chấm tròn xanh nhấp nháy nhẹ."
9. **Thêm thanh chọn ngôn ngữ (`EN / VI / FR`) trên thanh điều hướng `.nav`:**
   > "Trong `<nav class=\"nav\">` của `index.html`, thêm bộ chuyển đổi ngôn ngữ `EN | VI` nhỏ gọn phía trước nút `.burger` để chuyển đổi toàn bộ nội dung tiêu đề, đoạn văn, nhãn điểm nhấn và menu sang tiếng Việt không cần tải lại trang."
10. **Thêm hiệu ứng sóng nước nhẹ khi di chuột vào nút `.cta__icon`:**
    > "Trong `<style>` của `index.html`, bổ sung hiệu ứng vòng sóng lan tỏa (`ripple ring`) quanh `.cta__icon` khi người dùng di chuột hoặc focus vào nút `Talk to us`, và tự động tắt khi `prefers-reduced-motion: reduce` được bật."
11. **Tích hợp biểu mẫu quyên góp nhanh (`Quick Donate Pill`) vào chân `.navsheet__foot`:**
    > "Trong `.navsheet__foot` của `index.html`, thêm 3 nút chọn mức đóng góp nhanh (`$25`, `$50`, `$100`) nằm ngay phía trên nút `.navsheet__cta` để nhà hảo tâm chọn mức tài trợ trước khi bấm `Talk to us`."
12. **Mở rộng trang thành Landing Page nhiều phân đoạn khi người dùng cuộn xuống:**
    > "Giữ nguyên toàn bộ thiết kế `100svh` của `<section class=\"hero\">` trong `index.html`, và bổ sung thêm 3 phân đoạn bên dưới (`#mission`, `#programs`, `#contact`) trình bày bản đồ rạn san hô, báo cáo minh bạch tài chính và biểu mẫu liên hệ."
