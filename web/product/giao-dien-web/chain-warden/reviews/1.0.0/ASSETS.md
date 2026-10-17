# Hồ sơ tài sản hình ảnh (`ASSETS.md`)

## 1. Danh sách file ảnh trong gói thương mại (`source/assets/img/`)

| File | Định dạng | Kích thước (px) | Dung lượng (byte) | Nguồn & Quyền sử dụng |
|---|---|---:|---:|---|
| `assets/img/warden-classic.webp` | WebP | `838 × 458` | `67,248` | Tách lớp sân khấu nhân vật từ ảnh tham chiếu do chủ sản phẩm cung cấp (`design/reference-hero.png`), đã xoá nút xem ảnh ngoại lai và làm sạch vùng chữ/UI để dựng HTML/CSS thật; kèm minh họa đối ứng từ subagent `image-generator` (`design/warden-generated.jpg`). |
| `assets/img/warden-darkstar.webp` | WebP | `838 × 458` | `57,410` | Phối màu ngoại trang Dark Star (tím vũ trụ / magenta hư không) tạo cục bộ bằng script xử lý kênh phổ ánh sáng từ `warden-classic.webp`. |
| `assets/img/warden-highnoon.webp` | WebP | `838 × 458` | `60,674` | Phối màu ngoại trang High Noon / FPX (lửa hổ phách / vàng đỏ) tạo cục bộ bằng script xử lý kênh phổ ánh sáng từ `warden-classic.webp`. |
| `assets/img/warden-ui.webp` | WebP | `280 × 200` | `42,638` | Sprite chứa dãy 5 biểu tượng kỹ năng (`144×24`), 4 tượng ngoại trang (`275×74`) và khung cảnh thẻ tiêu điểm (`205×96`) trích xuất từ `design/reference-hero-clean.png`. |

- **Tổng số ảnh raster trong gói**: `4` file `.webp` (tuân thủ ngưỡng `I01 <= 8` ảnh).
- **Dung lượng từng ảnh**: mỗi ảnh `< 68 KB` (tuân thủ ngưỡng `I03 <= 300 KB/ảnh`).
- **Không hotlink, không base64**: mọi đường dẫn đều tương đối (`assets/img/warden-*.webp`).
- **Ghi chú bản quyền & nhãn hiệu (`D07`)**: `README.md`, `CUSTOMISE.md` và `LICENCE.txt` nêu rõ các danh xưng/nhãn hiệu trong bản demo (`LEAGUE OF LEGENDS`, `Thresh`, `Shadow Isles`, tên kỹ năng/ngoại trang) chỉ phục vụ minh họa bố cục theo ảnh mẫu; gói giao diện không cấp quyền sử dụng nhãn hiệu bên thứ ba và người mua phải thay bằng nhân vật/thương hiệu riêng trước khi xuất bản thương mại.
