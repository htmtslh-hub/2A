# Reference Map — Atlas 1.0.0

## 1. Chuẩn hóa ảnh tham chiếu
- **File gốc**: `media_1792803636533_6d1535b9.png`
- **SHA-256**: `67bb01f9ae70d5cd1f794eb81f894f80c478c18ee35b1f3671adb5a03cfcbfb1`
- **Kích thước thật**: `940 × 530` px (tỷ lệ `1.7736:1`, ~16:9)
- **Viewport đối chiếu chuẩn**: `940 × 530` CSS px (DPR 1, scroll = 0) và `1440 × 900` CSS px (responsive desktop).
- **Lớp phủ ứng dụng ngoài bị loại trừ**:
  1. Góc dưới trái (`x: 20..362, y: 422..512`): Viên thuốc bán trong suốt `"Được sửa đổi bằng AI"` của trình xem ảnh bên ngoài (bên dưới lớp phủ này vẫn nhìn rõ khung ảnh thu nhỏ `x: 38..126, y: 438..501` và khối thông số `25.2048° N / 55.2708° E / DEPTH UNKNOWN / LIFE EVERYWHERE` tại `x: 146..235, y: 441..500` thuộc giao diện web thật — phần giao diện web thật này được khôi phục đầy đủ).
  2. Góc dưới phải trên (`x: 838..925, y: 317..404`): Nút vuông bo góc phóng to hai chiều (`↙↗`) của ứng dụng xem ảnh (bên dưới là trục đo độ sâu `0 m`, `EXPLORE / THE DEPTHS`, `200 m` — được khôi phục đầy đủ).
  3. Góc dưới phải dưới (`x: 583..925, y: 425..512`): Nút viên thuốc `"Tìm kiếm hình ảnh 🔍✨"` của ứng dụng xem ảnh (bên dưới là phần tiếp nối của thước đo độ sâu `1,000 m`, `4,000 m`, `10,000 m` — được khôi phục đầy đủ).

## 2. Bản đồ ánh xạ từng vùng (Reference → Thành phần HTML/CSS/JS)

| Vùng tham chiếu | Tọa độ trên ảnh 940×530 | Thành phần Web (`index.html` / `style.css`) | Hành vi / Đích đến |
|---|---|---|---|
| Logo `● ATLAS` & vạch ngang | `x: 38..145, y: 19..28` | `.brand` (`● ATLAS`) + `.site-header__rule` | Cuộn mượt về `#home` |
| Menu điều hướng chính | `x: 162..378, y: 20..28` (`JOURNEY`, `ARCHIVE`, `STORIES`, `ABOUT`) | `<nav id="site-nav" aria-label="Primary navigation">` với 4 liên kết `<a>` | Dẫn tới 4 section thật: `#journey`, `#archive`, `#stories`, `#about` |
| Cụm thông số & âm thanh góc trên phải | `x: 685..919, y: 18..30` (`25.2048° N  55.2708° E`, `|`, `ONLINE ●`, 7 vạch sóng âm) | `.header-telemetry` + nút `.status-pill` (`ONLINE ●`) + nút `.soundwave-btn` | Mở bảng thông số trạm phao tiêu hoặc bật/tắt sóng âm thị giác & chế độ chuyển động |
| Nhãn chương `01 / OCEAN LOG` | `x: 39..109, y: 63..70` | `.hero__eyebrow` (`[data-hero-eyebrow]`) | Cập nhật theo hải trình đang chọn (`01 / OCEAN LOG`, `02 / TWILIGHT DRIFT`, `03 / ABYSSAL SOUND`) |
| Tiêu đề chính `Small Stories / Vast Oceans` | `x: 40..375, y: 78..185` | `<h1 class="hero__title"><span>Small Stories</span><span>Vast Oceans</span></h1>` | Tiêu đề chính toàn trang (`Cormorant Garamond` 700, tỷ lệ dòng `0.92`) |
| Khổ thơ 4 dòng trên mặt nước | `x: 39..146, y: 202..247` (`A tiny boat.` / `A giant companion.` / `Different scales.` / `The same curiosity.`) | `.hero__stanza` (`[data-hero-stanza]`) | Hiển thị thông điệp biên tập và cập nhật mượt khi chuyển cảnh |
| Cụm 2 nút CTA chính & phụ | `x: 39..141, y: 260..279` (`BEGIN JOURNEY →`) và `x: 166..236, y: 263..274` (`EXPLORE MAP ○`) | `<a class="hero__cta-primary" href="#journey">` và `<button class="hero__cta-secondary" data-open-dialog="map-dialog">` | Cuộn tới `#journey` hoặc mở hộp thoại bản đồ hải trình `<dialog id="map-dialog">` |
| Cột chỉ mục góc trên phải | `x: 875..908, y: 70..131` (`—`, `PEOPLE`, `PLACES`, `OCEANS`, `IDEAS`) | `.hero__index` với 4 liên kết/nút `[data-index-topic]` | Lọc trực tiếp chủ đề tại `#stories` và cuộn mượt tới nội dung tương ứng |
| Cảnh minh hoạ Mặt cắt Đại dương & Cá voi đỏ | Toàn khung `940×530`; mặt nước tại `y=295` (`55.66%`); cá voi + thuyền buồm tại `x: 270..746, y: 129..430`; mặt trăng tại `x: 742..802, y: 68..128`; đảo hải đăng tại `x: 800..940, y: 225..295` | `.hero__canvas` + `<img class="hero__scene-img" data-hero-image src="assets/img/hero-ocean-01.webp">` + lớp SVG sóng nước/hạt sáng | Hình minh hoạ gốc tự tạo độ phân giải cao, hỗ trợ chuyển đổi 3 cảnh hải trình bằng `skill-morge` |
| Khổ thơ dưới mặt nước góc dưới trái | `x: 38..112, y: 342..410` (`— / BENEATH / THE SURFACE / A LARGER / KIND OF SILENCE / —`) | `.hero__underwater-poem` | Khổ thơ đối xứng bên dưới mặt nước |
| Khung ảnh thu nhỏ & thông số đáy biển | Khung ảnh `x: 38..126, y: 438..501`; chữ `x: 146..235, y: 441..500` (`25.2048° N / 55.2708° E / — / DEPTH UNKNOWN / LIFE EVERYWHERE`) | `.hero__sonar-card` gồm `<button class="hero__sonar-thumb" data-open-dialog="map-dialog">` (`assets/img/depth-sonar-thumb.webp`) + `.hero__sonar-meta` | Bấm vào khung thu nhỏ mở bản đồ mặt cắt độ sâu; thông số đồng bộ theo tầng nước đang chọn |
| Thước đo độ sâu góc dưới phải | `x: 855..926, y: 323..502` (`0 m`, `EXPLORE / THE DEPTHS`, `200 m`, `1,000 m`, `4,000 m`, `10,000 m`) | `.depth-ruler` với 5 nút `<button type="button" data-depth-stop="0|200|1000|4000|10000">` | Chọn tầng độ sâu, dịch chuyển con chạy bằng `requestAnimationFrame` hữu hạn và đồng bộ với `#journey` |
