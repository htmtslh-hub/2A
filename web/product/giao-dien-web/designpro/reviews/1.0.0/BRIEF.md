# DesignPro (`designpro`) — Hồ sơ Thiết kế & Ngoại lệ Kỹ thuật (v1.0.0)

- **Ngày lập:** 2026-10-19
- **Tên sản phẩm:** DesignPro (`designpro`)
- **Mã danh mục cửa hàng:** `t72`
- **Ngách danh mục (`template-categories.ts`):** `education` (`Giáo dục - đào tạo` / `Education & training` / `教育与培训`)
- **Phân quyền truy cập:** `free`
- **Phiên bản:** `1.0.0`

## 1. Mục tiêu & Kiến trúc Giao diện

Trang Hero toàn màn hình (`h-screen`) cho nền tảng đào tạo thiết kế sản phẩm **DesignPro** với nền video lặp tự động trên nền đen `#000000`, kiểu chữ `Inter`, thanh điều hướng viên thuốc (`rounded-full border-gray-700`), bố cục nội dung hai cột bên dưới thanh điều hướng, tiêu đề trung tâm cỡ lớn (`text-5xl` → `xl:text-9xl`, `leading-[0.85]`, `tracking-tighter`) kết hợp component `ShinyText` (`framer-motion`, màu nền `#64CEFB`, ánh sáng quét `#ffffff`, góc `100deg`, chu kỳ `3s`) và nút CTA `"Apply for Next Enrollment"` (`rounded-full bg-black hover:bg-gray-900 px-6 md:px-8 py-3 md:py-4`) kèm biểu tượng mũi tên dịch phải khi hover (`group-hover:translate-x-1`).

### Bố cục chi tiết
1. **Nền Video (`Background`):**
   - Khung gốc: `relative w-full h-screen min-h-[640px] bg-black overflow-hidden select-none`.
   - `<video id="hero-video">`: `absolute inset-0 w-full h-full object-cover`, `autoPlay`, `loop`, `muted`, `playsInline`, nguồn MP4 từ CloudFront:
     `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4`
2. **Thanh Điều hướng (`Navigation Bar`):**
   - Container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
   - **Logo:** Vòng tròn viền trắng `2px` (`border-2 border-white`) chứa hình tròn trắng đặc bên trong, đi kèm chữ `"DesignPro"`.
   - **Menu Desktop (`lg+`):** Hộp viên thuốc `rounded-full border border-gray-700` chứa 7 liên kết `text-sm text-white/80 hover:text-white`: `Home`, `About Us`, `Courses`, `Instructors`, `Testimonials`, `Blog`, `Contact us` (kèm icon mũi tên `lucide-react`).
   - **Menu Mobile (`< lg`):** Nút hamburger (`Menu` / `X` từ `lucide-react`) mở ngăn kéo điều hướng di động chứa đầy đủ 7 mục.
3. **Khối Thông tin Phía trên (`Top Section — below nav`):**
   - Bố cục 2 cột trên màn hình lớn (`lg:flex-row lg:justify-between`), xếp chồng trên di động.
   - Cột trái: `"We deliver transformative programs that empower emerging product designers with cutting-edge expertise and vision to thrive globally."` (`text-white/80 text-sm lg:text-base`).
   - Cột phải (`lg:text-right`): `"8000+ Talented Designers Launched !"` (`text-white/80 text-sm lg:text-base`).
4. **Khối Hero Trung tâm (`Hero Section — center`):**
   - Nhãn phụ in hoa: `"Seats for Next Program Opening Soon"` (`uppercase text-white/80 text-xs lg:text-sm tracking-tight`).
   - Tiêu đề chính `<h1>` (`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] tracking-tighter`):
     - Dòng 1: `"Become"` (`text-white font-medium`).
     - Dòng 2: `<ShinyText text="Product Leader." />` (`framer-motion`, base `#64CEFB`, shine `#ffffff`, `100deg`, `3s` liên tục từ trái sang phải, `backgroundClip: 'text'`, `WebkitTextFillColor: 'transparent'`).
   - Nút CTA: `"Apply for Next Enrollment"` (`group bg-black hover:bg-gray-900 text-white rounded-full px-6 md:px-8 py-3 md:py-4`) kèm icon mũi tên dịch sang phải khi hover (`group-hover:translate-x-1`), mở hộp thoại đăng ký khóa học tương tác.

## 2. Ngoại lệ Kỹ thuật theo Yêu cầu Chủ Sản phẩm (`--ngoai-le`)

1. **Stack công nghệ (`W01` / `W06`):** Sử dụng `React 18 + TypeScript + Vite + Tailwind CSS + framer-motion + lucide-react` theo đúng yêu cầu kỹ thuật của prompt; đóng gói kèm bản dựng tĩnh trong `source/built/` để chạy trực tiếp qua HTTP server.
2. **Tài nguyên mạng (`W03`):**
   - Google Fonts: `Inter` (`weights 400;500;600;700`).
   - CloudFront MP4 Video: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4`.
