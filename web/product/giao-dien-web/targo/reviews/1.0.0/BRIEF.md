# BRIEF — Targo (`targo` / `t92`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện một trang tự chứa trong một file HTML duy nhất (`index.html`) gồm đúng hai phân đoạn (**Section 1 — Hero** và **Section 2 — About**, không có phân đoạn phụ hay chân trang) cho nền tảng hạ tầng kiểm thử **Targo** (*"Scaling The Platform For Your Business"*), sử dụng phông chữ **Quantico** (`400` + `700`), tông nền `#F2F1F0` / `#F7F6F8`, điểm nhấn xanh `#15BCDF` (hover `#3fd0ef`, viền `#0fa3c2`), hai luồng video nền/minh họa tự động thử phát lại mỗi 1 giây kèm lớp phủ scrim bên trái trên desktop (Section 1) và lớp phủ nhuộm màu `#15BCDF` `mix-blend-mode: hue` sát mép phải màn hình (Section 2), cùng **15% sáng tạo bổ sung** (nhãn telemetry `#telemetryPill` và hộp thoại vát góc **Live QA Pipeline & Request QA Audit** `#targoModal`).

## Lý do sử dụng cờ `--ngoai-le` khi đóng gói
- Đề bài yêu cầu kiến trúc **Single-File HTML** (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) thuộc danh sách `INLINE_PRODUCTS` trong `dong-goi.mjs`.

## Nguồn tài nguyên bên ngoài theo đặc tả
- **Google Fonts (`Quantico` 400 + 700):** `https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap`
- **Section 1 — Hero Video (`MP4`):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_050407_500d0339-ab28-41c1-9688-132a74a3b5aa.mp4`
- **Section 2 — About Video (`MP4`):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_063501_2e2c8971-de1e-473a-8611-a0c9ae7ee186.mp4`
