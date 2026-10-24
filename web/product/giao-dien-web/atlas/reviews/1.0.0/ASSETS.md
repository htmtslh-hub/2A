# Atlas 1.0.0 — Assets & Font Provenance

## 1. Hình ảnh minh hoạ cục bộ (`source/assets/img/`)
Bốn tệp ảnh WebP trong `source/assets/img/` (mỗi tệp < 200 KB, tổng cộng 497,310 byte) được tạo mới bằng công cụ `image-generator` nội bộ kết hợp xử lý màu sắc và làm sạch hoàn toàn chữ/nút/lớp phủ UI ứng dụng ngoài theo bố cục tham chiếu do chủ sản phẩm cung cấp (`media_1792803636533_6d1535b9.png`):

- `hero-ocean-01.webp` (`1880 × 1060` px, `148,648` byte): Cảnh chính **Log 01 · Crimson Leviathan & Red Sloop** — mặt cắt đại dương siêu thực với bầu trời mây xám ấm, mặt trăng tròn sáng góc trên phải, 6 cánh chim biển, đảo đá và ngọn hải đăng đỏ-trắng bên phải; cá voi lưng đỏ son nổi trên mặt nước mang theo chiếc thuyền buồm đỏ nhỏ có hai nhà thám hiểm; phần bụng cá voi xanh xám có rãnh dưới mặt nước cùng luồng tia nắng chiếu xuống đáy biển, rạn đá hai bên và đàn cá bơi lội. Hoàn toàn không chứa chữ hay nút UI trong ảnh.
- `hero-ocean-02.webp` (`1880 × 1060` px, `135,346` byte): Cảnh thứ hai **Log 02 · Twilight Ochre Finback & Lantern Skiff** — biến thể hoàng hôn hổ phách ấm cho băng chuyền chuyển cảnh hai chiều (`skill-morge`).
- `hero-ocean-03.webp` (`1880 × 1060` px, `198,190` byte): Cảnh thứ ba **Log 03 · Abyssal Pelagic Whale & Research Yawl** — minh hoạ hải trình tầng nước sâu phát quang sinh học độc lập cho băng chuyền `skill-morge`.
- `depth-sonar-thumb.webp` (`352 × 252` px, `15,126` byte): Ảnh thu nhỏ mặt cắt độ sâu đặt trong khung viền mảnh ở góc dưới bên trái vùng nước sâu (`25.2048° N / 55.2708° E`).

Toàn bộ biểu tượng (chấm tròn thương hiệu `ATLAS`, sóng âm 7 cột, mũi tên điều hướng, vòng tròn `EXPLORE MAP`, la bàn tọa độ, biểu tượng độ sâu) là **inline SVG** hoặc hình học CSS thuần, có đầy đủ `viewBox`, `aria-hidden="true"`, `focusable="false"`. Không hotlink ảnh ngoài, không nhúng ảnh base64, không sử dụng ảnh chụp màn hình gốc làm trang web.

## 2. Nguồn gốc & Giấy phép Font chữ
- **Cormorant Garamond** (Google Fonts tuỳ chọn, weights 600, 700, italic 600):
  - Nguồn chính thức: `https://fonts.google.com/specimen/Cormorant+Garamond` (`https://github.com/CatharsisFonts/Cormorant`)
  - Tác giả: Christian Thalmann (Catharsis Fonts)
  - Giấy phép đã xác minh: **SIL Open Font License 1.1 (OFL-1.1)** — cho phép sử dụng thương mại và cá nhân.
- **JetBrains Mono** (Google Fonts tuỳ chọn, weights 400, 500, 600):
  - Nguồn chính thức: `https://fonts.google.com/specimen/JetBrains+Mono` (`https://github.com/JetBrains/JetBrainsMono`)
  - Tác giả: JetBrains, Philipp Nurullin, Konstantin Bulenkov
  - Giấy phép đã xác minh: **SIL Open Font License 1.1 (OFL-1.1)** — cho phép sử dụng thương mại và cá nhân.
- **Stack font hệ thống dự phòng khi ngoại tuyến**:
  - Display Serif: `'Cormorant Garamond', Georgia, 'Times New Roman', Times, serif`
  - Technical Monospace / Body: `'JetBrains Mono', 'Consolas', 'Courier New', monospace`
  Trang web hoạt động và hiển thị đầy đủ khi không có kết nối mạng hoặc khi chặn Google Fonts.
