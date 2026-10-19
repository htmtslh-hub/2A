# Vectrus Energy (`vectrus-energy`) — Hồ sơ Thiết kế & Ngoại lệ theo Yêu cầu Chủ Sản phẩm (v1.0.0)

- **Ngày lập:** 2026-10-19
- **Mã sản phẩm:** `t69` (`vectrus-energy`)
- **Tên hiển thị:** Vectrus Energy — Scroll-Tied Video Section

## 1. Tóm tắt đặc tả kỹ thuật từ Prompt của Chủ sản phẩm

Chủ sản phẩm yêu cầu tái tạo chính xác trang đơn điện ảnh điều khiển video theo vị trí cuộn (**"Scroll Tied Video Section"**) với các thông số kỹ thuật bắt buộc:
1. **Công nghệ:** Vite + React 18 + TypeScript + Tailwind CSS 3, `lucide-react` (`ArrowRight`, `ArrowDown`, `ChevronUp`, `Info`, `X`), `mp4box` (`^0.5.2`) cho giải mã khung hình WebCodecs, và alias `@` -> `src`.
2. **Nguồn video (`VIDEO_SRC`):**
   - `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4`
   - Không có poster, không có controls, `muted playsInline preload="auto"`, không bao giờ gọi `play()` mà điều khiển hoàn toàn bằng vị trí cuộn.
3. **Phông chữ & Màu sắc:**
   - Nạp `Helvetica Neue ME` từ `https://db.onlinewebfonts.com/c/95cecf452d3208890088a5b4c19c7ecf?family=Helvetica+Neue+ME`.
   - Màu chủ đạo `const DARK = '#1D3045'`; không phủ bất kỳ lớp màu/gradient nào lên video.
4. **Cấu trúc cuộn `500vh` & 3 phân cảnh tuần tự (`Sequential Sections`):**
   - Khung ngoài `relative h-[500vh]`, khung trong `sticky top-0 w-full h-screen overflow-hidden` chứa `<video>`, `<canvas width="1920" height="1080">` và lớp phủ 3 phân cảnh.
   - Độ mờ tuần tự theo `p = clamp(0, 1, window.scrollY / (container.offsetHeight - window.innerHeight))`:
     - `s1Opacity`: `p < 0.20 ? 1 : max(0, 1 - (p - 0.20) / 0.08)`
     - `s2Opacity`: `p < 0.32 ? 0 : p < 0.40 ? (p - 0.32) / 0.08 : p < 0.55 ? 1 : max(0, 1 - (p - 0.55) / 0.08)`
     - `s3Opacity`: `p < 0.67 ? 0 : p < 0.75 ? (p - 0.67) / 0.08 : 1`
   - Thành phần `Stagger` kích hoạt khi `sectionOpacity > 0.3` (`translateY(24px) -> 0`, `0.8s cubic-bezier(0.16,1,0.3,1)`).
   - Thanh điều hướng tự động đảo màu từ `#1D3045` sang `#FFFFFF` khi `p > 0.55`, kèm lớp phủ menu di động (`#mobile-menu-overlay`) nền `#1D3045`.
5. **Hook `useVideoScrub(videoSrc)`:**
   - Hằng số: `LERP_TAU = 8`, `SNAP = 0.002`, `LRU_MAX = 24`, `LEAD = 24`, `WATCHDOG = 60000`.
   - Tải MP4 qua `fetch`, phân tích bằng `MP4Box.createFile()`, giải mã qua `VideoDecoder` (thử lại với `prefer-software` nếu lỗi), lưu `Blob` WebP (`0.82`) kèm mốc thời gian `ts`, tìm kiếm nhị phân `nearestIndex` và quản lý bộ đệm `LRU` `ImageBitmap` để vẽ lên `<canvas>`, tự động dùng `<video>` (`video.currentTime`) làm dự phòng.

## 2. Ghi nhận Ngoại lệ Hợp lệ (`--ngoai-le`)

Theo quy chuẩn tại `docs/product-standards.md` và `docs/instruction-product.txt`, khi yêu cầu của chủ sản phẩm chỉ định rõ công nghệ hoặc URL tài nguyên cụ thể:
- **Kiến trúc Vite + React 18 + TypeScript + Tailwind CSS + `mp4box` + `lucide-react`:** Được giữ nguyên trong `source/` kèm theo bản dựng tĩnh đã biên dịch tại `source/built/` (đồng bộ sang `web/public/demos/vectrus-energy/`).
- **Tài nguyên phông chữ và video từ URL chỉ định:** Giữ nguyên liên kết phông chữ `Helvetica Neue ME` từ `db.onlinewebfonts.com` và URL video MP4 từ CloudFront (`d8j0ntlcm91z4.cloudfront.net`) theo đúng yêu cầu tuyệt đối trong prompt.
