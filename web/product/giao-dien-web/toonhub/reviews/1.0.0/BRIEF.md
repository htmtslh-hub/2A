# TOONHUB (`toonhub`) — Hồ sơ Thiết kế & Ngoại lệ theo Yêu cầu Chủ Sản phẩm (v1.0.0)

- **Ngày lập:** 2026-10-19
- **Mã sản phẩm:** `t68` (`toonhub`)
- **Tên hiển thị:** TOONHUB — 3D Character Figurine Carousel Hero

## 1. Tóm tắt đặc tả kỹ thuật từ Prompt của Chủ sản phẩm

Chủ sản phẩm yêu cầu xây dựng một giao diện Hero toàn màn hình (`100vh`) mang tên **TOONHUB** với các thông số kỹ thuật bắt buộc:
1. **Công nghệ:** React + TypeScript + Vite + Tailwind CSS, sử dụng `lucide-react` cho biểu tượng (`ArrowLeft`, `ArrowRight`).
2. **Phông chữ (`index.html`):** Nạp `Anton` và `Inter` (`400, 500, 600, 700`) từ Google Fonts. Phông chữ thân trang: `'Inter', sans-serif`; phông chữ trưng bày (chữ nền khổng lồ `3D SHAPE` và liên kết `DISCOVER IT`): `'Anton', sans-serif`.
3. **Dữ liệu 4 nhân vật (`IMAGES`):**
   - Nhân vật 1: `1.02464a56.png`, `bg: '#F4845F'`, `panel: '#F79B7F'`
   - Nhân vật 2: `2.b977faab.png`, `bg: '#6BBF7A'`, `panel: '#85CC92'`
   - Nhân vật 3: `3.4df853b4.png`, `bg: '#E882B4'`, `panel: '#ED9DC4'`
   - Nhân vật 4: `4.4457fbce.png`, `bg: '#6EB5FF'`, `panel: '#8DC4FF'`
   - Tải trước (preload) cả 4 ảnh khi mount bằng `new Image()`.
4. **Trạng thái & Logic điều hướng:**
   - `activeIndex` (`0–3`), khóa `isAnimating` (`650ms`), `isMobile` (`window.innerWidth < 640`, cập nhật khi `resize`).
   - Vai trò 4 vị trí suy ra từ `activeIndex`: `center = activeIndex`, `left = (activeIndex + 3) % 4`, `right = (activeIndex + 1) % 4`, `back = (activeIndex + 2) % 4`.
5. **Cấu trúc 6 lớp hiển thị:**
   - Lớp 1: Grain overlay (`zIndex: 50`, `fractalNoise`, `baseFrequency=0.9`, `numOctaves=4`, `opacity: 0.4`, `200px × 200px`).
   - Lớp 2: Chữ nền khổng lồ `"3D SHAPE"` (`zIndex: 2`, `top: 18%`, `clamp(90px, 28vw, 380px)`, `Anton`, trắng).
   - Lớp 3: Nhãn thương hiệu `"TOONHUB"` (`zIndex: 60`, góc trên bên trái).
   - Lớp 4: Băng chuyền 4 nhân vật (`zIndex: 3`, `aspectRatio: '0.6 / 1'`), chuyển tiếp đồng thời `transform`, `filter`, `opacity`, `left`, `height`, `bottom` trong `650ms cubic-bezier(0.4,0,0.2,1)`.
   - Lớp 5: Khối văn bản `"TOONHUB FIGURINES"` + đoạn mô tả (`hidden sm:block`) + 2 nút tròn (`ArrowLeft`, `ArrowRight`, `size={26}`, `strokeWidth={2.25}`) ở góc dưới bên trái (`zIndex: 60`).
   - Lớp 6: Liên kết `"DISCOVER IT"` + `ArrowRight` ở góc dưới bên phải (`zIndex: 60`, `Anton`, `clamp(20px, 4vw, 56px)`).

## 2. Ghi nhận Ngoại lệ Hợp lệ (`--ngoai-le`)

Theo quy chuẩn tại `docs/product-standards.md` và `docs/instruction-product.txt`, khi yêu cầu của chủ sản phẩm chỉ định rõ công nghệ hoặc URL tài nguyên cụ thể:
- **Kiến trúc React + TypeScript + Vite + Tailwind CSS + `lucide-react`:** Được giữ nguyên trong `source/` kèm theo bản dựng tĩnh đã biên dịch tại `source/built/` (đồng bộ sang `web/public/demos/toonhub/`) để vừa đáp ứng đúng yêu cầu kỹ thuật của prompt, vừa cho phép khách hàng mở xem trực tiếp mà không bắt buộc chạy bước build.
- **Tài nguyên phông chữ và hình ảnh 3D từ URL chỉ định:** Giữ nguyên liên kết Google Fonts (`Anton`, `Inter`) trong `index.html` và 4 URL hình ảnh PNG nhân vật 3D từ `https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/...` theo đúng mã mẫu trong prompt.
