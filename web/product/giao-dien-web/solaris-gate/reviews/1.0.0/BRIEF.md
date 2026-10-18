# Solaris Gate 1.0.0 — Brief & Scope (18/10/2026)

- **Loại sản phẩm:** `web-template` (`solaris-gate`)
- **Tên sản phẩm:** Solaris Gate (đổi tên từ `"Planet Jumping"` và đổi tên thương hiệu `"Ubernatural"` thành `"Solaris Gate"` theo yêu cầu chủ sản phẩm: *"tạo sản phẩm giao diện web với prompt này, chú ý thay đổi tên gọi"*).
- **Phạm vi được phép thao tác:** Chỉ tạo mới trong `web/product/giao-dien-web/solaris-gate/` (`source/index.html`, `source/README.md`, `source/CUSTOMISE.md`, `source/LICENCE.txt`, `README.md`, `solaris-gate.zip` và `reviews/1.0.0/`). Không chỉnh sửa sản phẩm khác, không sửa `web/src/lib/real-templates.ts`, `web/public/`, cơ sở dữ liệu hay triển khai khi chưa có yêu cầu mở rộng.
- **Ngoại lệ so với `WEB-STATIC-1` do brief/prompt chủ sản phẩm chỉ định trực tiếp:**
  1. Một file runtime tự chứa `source/index.html` (inline `<style>` và `<script>`, không bước build, không thư viện ngoài) kèm 3 file tài liệu khách hàng (`README.md`, `CUSTOMISE.md`, `LICENCE.txt`) trong gói ZIP thay cho cấu trúc 6 file tách rời `assets/css/style.css` và `assets/js/main.js`.
  2. Sử dụng đúng 6 URL tài nguyên từ xa trên CloudFront (`MARS_BG`, `TO_EARTH`, `TO_VENUS`, `TO_MARS`, `MERCURY`, `LOGO`) theo yêu cầu *"use these EXACT URLs (do not substitute)"*.
  3. Khai báo 4 `@font-face` (`SF Pro` 400/700, `SF Pro Thin` 100, `Aalto` 400) từ `local(...)` kèm fallback `Arial, sans-serif` và `'Arial Narrow', sans-serif`.
  4. Cấu trúc DOM, CSS, custom cursor, preloader, canvas 3D portal mask và luồng chuyển cảnh `mars -> earth -> venus` giữ nguyên chính xác theo thông số kỹ thuật trong prompt.
