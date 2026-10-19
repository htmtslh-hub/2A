# Halden (`halden`) — Hồ sơ Thiết kế & Ngoại lệ theo Yêu cầu Chủ Sản phẩm (v1.0.0)

- **Ngày lập:** 2026-10-19
- **Mã sản phẩm:** `t70` (`halden`)
- **Tên hiển thị:** Halden — Expeditions to the edge

## 1. Tóm tắt đặc tả kỹ thuật từ Prompt của Chủ sản phẩm

Chủ sản phẩm yêu cầu xây dựng một file `index.html` độc lập duy nhất (`<style>` và `<script>` nội tuyến, không dùng framework, không có bước build) cho thương hiệu du lịch thám hiểm **Halden** với các thông số kỹ thuật bắt buộc:
1. **Phông chữ & Biến toàn cục (`:root`):**
   - Nạp `Geist` (`400, 500`) từ Google Fonts; `<title>Halden — Expeditions to the edge</title>`.
   - Các biến CSS: `--ink: #0b1013`, `--panel: rgba(14, 19, 23, 0.84)`, `--line: rgba(255, 255, 255, 0.08)`, `--hover: rgba(255, 255, 255, 0.065)`, `--text: #ffffff`, `--soft: rgba(255, 255, 255, 0.74)`, `--muted: rgba(255, 255, 255, 0.60)`, `--ease: cubic-bezier(0.22, 1, 0.36, 1)`, `--morph: 0.5s`.
2. **Nền Hero & Chỉ báo cuộn:**
   - `<section class="hero" aria-label="Halden expeditions">` cao `100vh` / `100svh`, `min-height: 560px`, chứa `.hero-bg` với ảnh thung lũng sông băng từ CloudFront và hoạt ảnh `heroIn 2.4s var(--ease) both`, lớp phủ `.hero::after` hai tầng gradient, và `.scroll-cue` (`( scroll down )`) tại `left: 50%; top: 44%` (`fadeUp 1s var(--ease) 0.9s both`). Không có tiêu đề hay phụ đề khác trên Hero.
3. **Thanh Header & Hoạt ảnh vào (`backwards`):**
   - `.bar` cao `76px`, lưới `1fr auto 1fr` gồm `.logo` (`30×26px`, `fadeDown 0.9s var(--ease) 0.35s backwards`), `.desktop-nav` (`fadeIn 0.9s ease 0.45s backwards` — chỉ dùng `opacity` để không tạo containing block làm lệch tọa độ dropdown), và `.actions` (`fadeDown 0.9s var(--ease) 0.55s backwards`).
4. **Morphing Dropdown (`#dd`) & 3 Bảng nội dung:**
   - Một khung `#dd` duy nhất biến hình tọa độ `--x`, chiều rộng `--w` và chiều cao `--h` giữa 3 bảng:
     - **Panel A (`#p-discover`, `664×358px`):** Cột trái `.d-list` (`236px`) gồm 4 dòng (`Glaciers`, `Volcanoes`, `Dunes`, `Islands`), cột phải `.d-media` gồm 4 ảnh CloudFront chuyển mượt khi hover/focus từng dòng.
     - **Panel B (`#p-journeys`, `446×308px`):** 2 thẻ ảnh `.card` (`Small Group Treks`, `Solo Expeditions`).
     - **Panel C (`#p-regions`, `232×218px`):** 4 liên kết vùng (`The Nordics`, `Patagonia`, `Himalaya`, `Oceania`).
5. **Menu di động (`<= 860px`) & Trợ năng:**
   - Nút `.menu-btn` (`36×32px`) và bảng `#sheet` kính mờ chia 4 nhóm (`DISCOVER`, `JOURNEYS`, `REGIONS`, `HALDEN`).
   - Hỗ trợ phím `Escape`, trả focus về nút kích hoạt và `@media (prefers-reduced-motion: reduce)`.

## 2. Ghi nhận Ngoại lệ Hợp lệ (`--ngoai-le`)

Theo quy chuẩn tại `docs/product-standards.md` và `docs/instruction-product.txt`, khi yêu cầu của chủ sản phẩm chỉ định rõ cấu trúc file và URL tài nguyên cụ thể:
- **Gói 1 file `index.html` tự chứa (inline `<style>` + `<script>`):** Tuân thủ đúng yêu cầu `"Build a single standalone index.html file... Put the CSS in a <style> tag and the JS in a <script> tag, with no frameworks and no build step"`.
- **Tài nguyên phông chữ và 7 hình ảnh từ URL chỉ định:** Giữ nguyên liên kết Google Fonts (`Geist`) và 7 URL ảnh PNG từ CloudFront (`d8j0ntlcm91z4.cloudfront.net`) theo đúng đặc tả trong prompt.
