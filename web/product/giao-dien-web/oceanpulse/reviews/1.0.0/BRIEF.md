# BRIEF — OceanPulse (`oceanpulse` / `t82`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện Hero toàn màn hình (`100svh`, không cuộn ngang/dọc) tự chứa trong một file HTML duy nhất (`index.html`) cho tổ chức phi lợi nhuận bảo tồn biển **OceanPulse** ("Saving Oceans, Uniting The Coastline").

## Lý do sử dụng cờ `--ngoai-le` khi đóng gói
- Đề bài yêu cầu kiến trúc **Single Self-Contained HTML File** (gồm inline `<style>` và inline `<script>` ngay trong `index.html`, không tách file CSS/JS rời) nên gói `source/` gồm đúng 4 file (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) thuộc danh sách `INLINE_PRODUCTS` trong `dong-goi.mjs`.

## Nguồn tài nguyên bên ngoài theo đặc tả
- **Google Fonts:** `Plus Jakarta Sans` (`400;500;600;700`).
- **Background Video (CloudFront MP4):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260831_231820_baf1d009-9cc2-4f94-a720-b04a94a8eab4.mp4`
- **Poster & Text Highlight Image (Higgs WebP):** `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260831_224622_4eeb9d43-9e46-4483-9530-1eb4ef4c942d.png&w=1920&q=85`
