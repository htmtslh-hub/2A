# OceanPulse — Ocean-Conservation Nonprofit Hero (`v1.0.0`)

**OceanPulse** là mẫu giao diện Hero một trang tự chứa (`single self-contained HTML file`) dành cho tổ chức phi lợi nhuận bảo tồn đại dương, nghiên cứu hệ sinh thái biển và phục hồi rạn san hô ven bờ.

## Điểm nổi bật
- **Single-file HTML5 tự chứa (`index.html`)**: Không cần bước build, không phụ thuộc framework hay thư viện JS/CSS bên ngoài.
- **Bố cục 2 cột chuẩn biên tập hiện đại**:
  - Cột trái gồm thanh điều hướng (`OceanPulse`, `Mission`, `Programs`, `News`, `Help`, nút burger 3 thanh), tiêu đề lớn `Saving Oceans, Uniting The Coastline` với từ `Oceans,` được lồng ảnh mặt nước biển xanh sâu (`.hl`), đoạn văn sứ mệnh và nút hành động `Talk to us`.
  - Cột phải là thẻ video rạn san hô nhìn từ trên cao bo góc `26px`, kèm 2 điểm chú thích `Pure Waters` & `Coral Bed` với đường kẻ nối cắt viền tròn (`clip-path: inset(0 0 0 var(--dot-r))`) và cụm biểu tượng mạng xã hội khuyết góc dưới bên phải.
- **Ngăn kéo Menu trượt bất đối xứng (`#navSheet`)**: Mở ra theo đường cong `cubic-bezier(.16,1,.3,1)` (`680ms`) với hiệu ứng xuất hiện tuần tự từng mục và đóng nhanh theo `cubic-bezier(.7,0,.84,0)` (`440ms`). Tự động đo vị trí thực tế (`syncBurgerContrast()`) để đổi màu nút đóng `X` sang trắng hoặc đen tùy theo việc tấm nền tối có phủ tới vị trí nút burger hay không.
- **Đáp ứng trọn vẹn mọi khung nhìn (`100svh`, không thanh cuộn)**: Tối ưu từ màn hình lớn `1440px`, `1024px`, `900px`, điện thoại dọc `768px`, `420px`, `360px`/`320px` đến màn hình ngang thấp `740×360` và hỗ trợ `prefers-reduced-motion: reduce`.

## Cấu trúc gói bàn giao
- `index.html`: Toàn bộ mã HTML, CSS và JavaScript.
- `CUSTOMISE.md`: Hướng dẫn 10 bước tùy biến & triển khai + 12 prompt AI gợi ý.
- `README.md`: Tổng quan sản phẩm và hướng dẫn chạy nhanh.
- `LICENCE.txt`: Giấy phép sử dụng sản phẩm.
