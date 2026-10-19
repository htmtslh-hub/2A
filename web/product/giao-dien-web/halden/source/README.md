# Halden — Expeditions to the Edge (`v1.0.0`)

**Halden** là mẫu giao diện hero toàn màn hình (`100svh`) tự chứa trong **1 file `index.html` duy nhất** (inline CSS + vanilla JS, không cần cài đặt hay biên dịch) dành cho thương hiệu du lịch thám hiểm, lữ hành cao cấp, nhiếp ảnh thiên nhiên hoặc cổng đặt tour cá nhân hóa.

## Điểm nổi bật

- **Morphing Dropdown đặc trưng (`#dd`):**
  - Một khung chứa duy nhất (`#dd`) biến hình mượt mà (`--morph: 0.5s`, `cubic-bezier(0.22, 1, 0.36, 1)`) theo cả tọa độ ngang `--x`, chiều rộng `--w` và chiều cao `--h` khi di chuột hoặc nhấn chuyển giữa 3 mục **Discover** (`664×358px`), **Journeys** (`446×308px`) và **Regions** (`232×218px`).
  - Lần mở đầu tiên áp dụng `.instant` + `.snap` để hiện ngay tại vị trí mục được chọn (`scale(0.97) → scale(1)`), sau đó khi chuyển ngang giữa các mục sẽ trượt theo hướng di chuyển (`exit-left` / `exit-right` `±56px`) kèm hiệu ứng làm mờ chuyển giao (`blur(8px) → blur(0)`).
- **Bảng Discover tương tác 4 cảnh quan (`#p-discover`):** Rê chuột hoặc focus bàn phím qua 4 dòng (**Glaciers**, **Volcanoes**, **Dunes**, **Islands**) tự động làm mờ chồng ảnh (`scale(1.06) blur(10px) → scale(1) blur(0)`) ở cột bên phải.
- **Sân khấu Hero tối giản giàu cảm xúc:** Ảnh thung lũng sông băng xanh ngọc (`heroIn 2.4s`), lớp phủ hai tầng gradient và chỉ báo `( scroll down )` căn giữa tinh tế ở `top: 44%`.
- **Tương thích di động (`<= 860px`) & Trợ năng:** Tự động chuyển sang nút menu kính mờ (`.menu-btn`) và bảng trượt `#sheet` chia 4 nhóm rõ ràng; hỗ trợ đóng bằng phím `Escape`, trả focus về nút mở và tôn trọng `@media (prefers-reduced-motion: reduce)`.

## Cấu trúc gói bàn giao

```text
source/
├── index.html      # Toàn bộ giao diện, CSS và JavaScript tự chứa trong 1 file
├── CUSTOMISE.md    # Hướng dẫn tùy biến 10 bước + 12 prompt AI + bảng chuỗi literal
├── README.md       # Tài liệu giới thiệu & hướng dẫn chạy nhanh
└── LICENCE.txt     # Giấy phép sử dụng thương mại
```

## Cách chạy nhanh

Mở trực tiếp `index.html` bằng trình duyệt hiện đại hoặc chạy qua máy chủ tĩnh bất kỳ:
```bash
npx serve .
```
