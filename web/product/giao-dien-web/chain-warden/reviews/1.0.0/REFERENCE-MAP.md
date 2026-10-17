# Bản đồ đối chiếu ảnh tham chiếu (`REFERENCE-MAP.md`)

## 1. Thông tin ảnh tham chiếu

- **File nguồn**: `C:/Users/Lenovo/.gemini/antigravity/brain/2f29ff2f-b383-475c-8657-dcea83d91517/.user_uploaded/media_1792205010995_4526fbbb.png` (bản lưu tại `design/reference-hero.png`)
- **SHA-256 gốc**: `2586e0cef408e918b9bd9bde1b887da00cc5dc692047a0c1f37964fd42345dee`
- **Kích thước gốc**: `838 × 458` px (`PNG`, RGBA)
- **Chuẩn hóa vùng ngoại lai (`design/reference-hero-clean.png`)**: Loại bỏ nút mở rộng màu xám của ứng dụng xem ảnh/Pinterest ở góc dưới bên phải (`x: 775..837, y: 384..457`) để đối chiếu đúng 100% giao diện web.

## 2. Ánh xạ từng vùng tham chiếu sang thành phần HTML/CSS

| Vùng tham chiếu | Tọa độ trên ảnh `838×458` | Phần tử HTML / Selector | Trạng thái & Hành vi |
|---|---|---|---|
| **R1. Thanh điều hướng trên (Header & Nav)** | `x: 0..838, y: 0..46` | `.site-header`, `.brand`, `.site-nav`, `.btn-play` | Logo 2 dòng vàng kim `LEAGUE OF / LEGENDS` (`x: 4..55, y: 18..38`), 5 liên kết `GAMEPLAY`, `CHAMPIONS`, `NEWS`, `COLLECTION`, `ESPORTS` (`x: 260..565, y: 22..32`), nút bình hành vàng `PLAY NOW` (`x: 748..819, y: 18..38`) dẫn tới `#play`. |
| **R2. Cột thông tin tướng, Kỹ năng & Ngoại trang bên trái** | `x: 0..275, y: 55..452` | `.hero__left`, `.hero__eyebrow`, `.hero__title`, `.hero__lore`, `.abilities-panel`, `.skins-panel` | Eyebrow `THE CHAIN WARDEN` (`#5bc8af`), `<h1>` `Thresh` (`56px`, trắng sáng), đoạn cốt truyện 3 dòng + nút `Read more` mở `<dialog>`, dãy 5 nút kỹ năng (`P, Q, W, E, R` tại `y: 231..253`), thông số `Death Sentence (Q)` + sát thương + hồi chiêu + mô tả, dãy 4 nút ngoại trang (`Classic, Dark Star, High Noon, FPX` tại `y: 365..448`). |
| **R3. Sân khấu nhân vật trung tâm (Hero Character Stage)** | `x: 185..775, y: 0..458` | `.hero__stage`, `#hero-stage-img`, `[data-step="1"]` | Nhân vật cai ngục xiềng xích với lưỡi hái trăng khuyết phát sáng lục bảo bên trái và lồng đèn linh hồn treo trên vòng xích bên phải; đồng bộ đổi ảnh WebP (`warden-classic.webp`, `warden-darkstar.webp`, `warden-highnoon.webp`) khi chọn ngoại trang hoặc bấm nút chuyển cảnh. |
| **R4. Cột thuộc tính vai trò bên phải (Right Role Rail)** | `x: 775..834, y: 98..290` | `.hero__rail`, `.rail-item` | 4 mục xếp dọc: `Support` (biểu tượng hộ vệ có cánh), `Moderate` (thanh độ khó 3 vạch nghiêng: 2 sáng, 1 tối), `Ranged` (biểu tượng tâm ngắm tên), `Bottom` (biểu tượng đường dưới). Mỗi mục là nút lọc/nhảy xuống bảng thông số chiến thuật. |
| **R5. Thẻ video tiêu điểm góc dưới phải (Spotlight Card)** | `x: 618..820, y: 356..450` | `.spotlight-card` | Khung hình bình hành nghiêng chứa cảnh `Shadow Isles: None Escape`, nút tròn Play ở tâm và dải tiêu đề dưới đáy; bấm mở `<dialog>` trình chiếu hoạt cảnh tiêu điểm. |
