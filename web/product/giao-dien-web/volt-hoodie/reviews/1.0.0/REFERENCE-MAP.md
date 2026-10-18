# Reference Map — Volt Hoodie 1.0.0

## 1. Chuẩn hóa ảnh tham chiếu
- **File gốc**: `media_1792157371150_e4ac8e45.jpg`
- **SHA-256**: `2686fcb29be1012ad6b1b8cfcb7ebb6061c1cd9e52b898a5b76836b5a3066338`
- **Kích thước thật**: `930 × 602` px (tỷ lệ ~1.545:1)
- **Viewport đối chiếu chuẩn**: `930 × 602` CSS px (DPR 1, scroll = 0) và `1440 × 900` CSS px (responsive desktop).
- **Lớp phủ ứng dụng ngoài bị loại trừ**: Hai nút vuông bo góc màu vàng nhạt ở góc dưới bên phải (`x: 825..922, y: 390..590`) gồm nút phóng to 2 chiều (`↙↗`) và nút tìm kiếm hình ảnh có ngôi sao (`🔍✨`) là UI của trình xem ảnh / Pinterest, không thuộc giao diện web nên được loại bỏ khỏi mã nguồn và vùng chấm điểm tương đồng.

## 2. Bản đồ ánh xạ từng vùng (Reference → Thành phần HTML/CSS/JS)

| Vùng tham chiếu | Tọa độ trên ảnh 930×602 | Thành phần Web (`index.html` / `style.css`) | Hành vi / Đích đến |
|---|---|---|---|
| Nền chia chéo Đen – Vàng | Trái `#272727` (`x: 0..157` ở `y=0` tới `x: 0..356` ở `y=601`); Phải `#FFD507` | `.hero` (`background: var(--yellow)`), `.hero__dark-panel` (`clip-path: polygon(0 0, 16.88% 0, 38.28% 100%, 0 100%)`) | Giữ đúng góc nghiêng 16.88% → 38.28% trên desktop |
| Logo Hoodie góc trái trên | `x: 45..72, y: 40..67` (28×28 px) | `.brand` chứa inline SVG áo hoodie nét trắng `aria-hidden="true"` + nhãn `aria-label="Volt Hoodie — Home"` | Cuộn mượt về `#home` |
| Menu điều hướng chính | `x: 335..547, y: 44..64` (`Shop`, `Kid's`, `Sport's`, `Support`) | `<nav id="navigation" aria-label="Primary navigation">` với 4 liên kết `<a>` | Dẫn tới 4 section thật: `#shop`, `#kids`, `#sports`, `#support` |
| Nút kính lúp tìm kiếm | `x: 573..583, y: 49..59` | `<button class="icon-btn" type="button" data-open-dialog="search-dialog">` | Mở hộp thoại `<dialog id="search-dialog">` tra cứu nhanh kích cỡ & tính năng |
| Cụm nút `Log In` / `Sing Up` | `x: 715..763` (`Log In`), `x: 775..831` (`Sing Up`), `y: 44..64`, viền đen bo tròn | `.auth-pill` (`button type="button" data-open-dialog="account-dialog"`) giữ nguyên chữ `Log In` và `Sing Up` | Mở hộp thoại `<dialog id="account-dialog">` thông báo rõ bản mẫu tĩnh (Demo only) và liên hệ email |
| Nút menu 3 gạch bên phải | `x: 876..887, y: 46..61` | `.menu-toggle` (`aria-expanded`, `aria-controls="navigation"`) + phím tắt mở ngăn điều hướng | Trên mobile đóng/mở menu chính (`Escape` trả focus); trên desktop cuộn tới `#shop` hoặc mở bảng điều hướng nhanh |
| Chữ dọc `2 0 2 4` | `x: 46..54, y: 275..331` | `.hero__year` (`2 0 2 4` xếp dọc theo chiều dưới lên) | Nhãn bộ sưu tập năm 2024 |
| Cụm `Color` & 3 chấm màu | `x: 108..136, y: 256..334` (`#FAD81D`, `#5CEBC0`, `#F8F9FB`) | `.color-picker` với 3 nút `<button type="button" data-color-index="0|1|2" aria-pressed="true|false">` | Đổi trực tiếp giữa 3 phối màu áo (`Volt Yellow`, `Cyber Mint`, `Arctic White`) kèm chuyển cảnh RAF hữu hạn |
| Áo Hoodie trung tâm | `x: 146..364, y: 120..471` (219×351 px) | `.hero__product-stage` + `<img class="hero__product" data-hero-image src="assets/img/hoodie-volt.webp">` | Hỗ trợ đổi phối màu, phím mũi tên trái/phải, vuốt ngang và hiệu ứng nghiêng/nổi hữu hạn |
| Cụm `Size` (`S`, `M`, `L`) | `x: 379..398, y: 256..326` | `.size-picker` với 3 nút `<button type="button" data-size="S|M|L" aria-pressed="true|false">` | Chọn kích cỡ `S`, `M`, `L` và đồng bộ xuống bảng đặt hàng `#order` |
| Khối tiêu đề & CTA phải | `Hoodie` (`x: 558..842, y: 171..236`), đoạn mô tả (`x: 559..831, y: 251..290`), giá `Rs. 1559/-` (`x: 751..842, y: 295..317`), nút `Buy Now` (`x: 723..843, y: 329..366`) | `.hero__copy` gồm `<h1>Hoodie</h1>`, `.hero__lead`, `.hero__price`, `<a class="buy-button" href="#order">Buy Now</a>` | Nút `Buy Now` dẫn thẳng tới khu vực đặt mua `#order` |
| Thanh trượt dọc bên phải | `x: 883..888, y: 160..324` | `.hero__rail` với vạch chỉ báo `.hero__rail-thumb` | Dịch chuyển vạch đậm theo phối màu đang chọn (1/3, 2/3, 3/3) |
| Chữ chìm `HOODIE` | `x: 370..930, y: 380..525`, màu `#F1CC17` | `.hero__watermark` (`aria-hidden="true"`) | Chữ trang trí khổ lớn phía sau, dịch chuyển nhẹ theo cuộn/chuyển mẫu |
| Icon mạng xã hội góc dưới trái | `x: 46..67, y: 486..554` (Facebook, Instagram tròn trắng) | `.social-links` với 2 liên kết `<a>` tới `#support` | Dẫn tới khu vực kênh liên hệ chính thức tại `#support` |
| 3 chấm phân trang đáy | `x: 424..505, y: 560..573` (`○ ● ●`) | `.hero__dots` với 3 nút `<button type="button" data-view="0|1|2">` và nút chuyển tiếp `[data-step="1"]` | Chuyển đổi 2 chiều giữa 3 phối màu áo hoodie |
