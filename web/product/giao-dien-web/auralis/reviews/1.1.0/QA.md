# Auralis 1.1.0 — animation correction / QA

Ngày 04/10/2026, Asia/Bangkok. WEB-STATIC-1 v1.2 với ngoại lệ ảnh/animation theo yêu cầu trực tiếp. Bản 1.0 chỉ xoay nhẹ hình tai nghe; bản 1.1 thực hiện chuyển đổi giữa sản phẩm khác nhau và chuyển bố cục theo video tham khảo. Không tuyên bố realtime 3D: đây là animation transform trên ảnh sản phẩm 3D tự tạo.

## Thay đổi cụ thể

- Hero có ba model: EvoBuds One (violet), StudioBuds Pro (graphite), AirBuds Lite (pearl). Mẫu chọn rõ/to, hai mẫu khác nhỏ và mờ 5px/10px. Chuyển bằng hai nút tròn, phím trái/phải và vuốt ngang; không có timer tự đổi sản phẩm.
- 230vh hero runway giữ khung. Cùng ảnh đang chọn chuyển từ tâm tại 68% màn hình desktop sang 25%, scale 1 xuống 0,8333. Chữ hero rời cảnh, detail đúng tên/thông số của mẫu chọn đi vào từ phải. Mobile dùng bố cục dọc và scale 0,76. Chuyển động chính chỉ dùng transform/opacity, không animation left/width.
- Story có ba hình thực sự khác nhau: tai nghe violet → graphite → tai nghe và hộp sạc. Hình cũ trượt/thu nhỏ rời cảnh, hình mới trượt/phóng vào cùng chapter.
- Giảm chuyển động giữ carousel chọn được nhưng không transition; story mở toàn bộ. Tắt JS vẫn đọc được mẫu đầu, section links và toàn bộ chapter. Pinning tắt trên viewport thấp hoặc phóng chữ.
- Source, docs, ZIP, demo, catalog vi/en/zh, hướng dẫn và video preview đã đồng bộ.

## Gói cuối và nguồn ảnh

ZIP **343.130 byte**, SHA-256 **dd341cdf5b61a9cabfb2cc6b8c71c838d0fde93e01ac3c51194bfc059d5e8596**. Mười file: sáu file chuẩn và bốn WebP cục bộ. Đóng gói đọc lại từng file so source; checker kiểm tra từ ZIP giải nén.

| Asset | Byte | Nguồn |
|---|---:|---|
| earbuds.webp | 86.356 | Built-in imagegen ở 1.0, violet/pearl cutout |
| studiobuds.webp | 106.004 | Built-in imagegen 04/10, compact graphite cutout |
| airbuds.webp | 52.792 | Built-in imagegen 04/10, pearl stem earbuds cutout |
| charging-kit.webp | 80.064 | Built-in imagegen 04/10, violet/pearl earbuds trên open case |

PNG gốc và công cụ nội bộ ở `_design/headphone-reference/`. Prompt yêu cầu ảnh commercial product render 3:2, alpha, silhouette đầy đủ, không logo/text/scenery; graphite có short rounded body, white có stems, kit có charging slots. Đã xem ảnh trong carousel/các chặng. WebP chuyển bằng ffmpeg, không hotlink/base64. Không phân phối video Sandhill hoặc tài sản thương hiệu tham khảo.

Ngoại lệ W01/W03/W06 (ảnh, mười file, vượt 20KiB) và W05 (carousel + scroll choreography) xuất phát từ yêu cầu người dùng. Không nâng chuẩn chung hay tự đổi các quyền thương mại; LICENCE kế thừa mẫu đang dùng và cập nhật mô tả demo/artwork. Font ngoài N/A, dùng font hệ thống.

## Q01–Q13

| Mã | Trạng thái | Bằng chứng / giới hạn |
|---|---|---|
| Q01 | PASS theo ngoại lệ | Mười file, HTML/CSS/JS thuần, không build/library/backend/CDN/secret. |
| Q02 | PASS | Chromium 153.0.8010.12 + Firefox 155.0; 1440×900, 820×1180, 375×812, 320×740. Không tràn; nút độc lập ≥44px theo checker. |
| Q03 | PASS | Section links, menu/Escape/link-close/resize; carousel 1→2→0, copy/detail đúng model; story thay đúng hình. |
| Q04 | PASS | Skip link, Tab/Shift+Tab, menu ẩn không nhận Tab, focus nhìn được; ArrowLeft chọn model trước. Copy/detail ẩn dùng inert để không giữ link vô hình trong thứ tự Tab. |
| Q05 | PASS nội bộ | Một h1, landmark/heading/ID tốt; axe không violations hai browser; hình không chọn aria-hidden. |
| Q06 | PASS nội bộ | Checker thường/hover/focus không báo fail. Đã xem chữ trên wash, detail, graphite/white scenes và mobile. Không chứng nhận bên ngoài. |
| Q07 | PASS trong phạm vi | Reduced motion: 0s transition, pinning off, chọn model vẫn đúng. no-JS, offline file:// và reflow 720×450@2x qua checker. Zoom bằng UI browser chưa thử riêng. |
| Q08 | PASS trong phạm vi | Chromium/Firefox Windows. Safari, Edge, thiết bị vật lý NOT TESTED. |
| Q09 | PASS | Console/network rỗng trong checker và motion test; không perpetual loop/timer autoplay; không animation tự chạy sau 5s. |
| Q10 | PASS | CUSTOMISE 10 bước/12 prompt, literal edit counts đúng; README 1.1 và demo claims đúng phạm vi. |
| Q11 | PASS | ZIP final so khớp source và chạy từ bản giải nén; byte/hash ở trên. |
| Q12 | PASS hiển thị; NOT TESTED giao dịch thực | t9/auralis, preview/video/demo/ZIP khớp; production checks riêng. Không thực hiện thanh toán thật hoặc tải bằng tài khoản có quyền. |
| Q13 | PASS | Xem hero default/graphite/white, hero-detail desktop/mobile, story kit và các khổ trong screenshots. |

## Bằng chứng bổ sung về animation

- `final/checks.json`: tất cả kiểm tra tự động PASS trên ZIP cuối.
- `motion-validation.json`: PASS. Nút tuần tự chọn 1/2/0, ArrowLeft chọn 2, swipe event chọn 1, reduced motion chọn 2 không transition; không pageerror. Swipe thử bằng touch event tổng hợp, chưa thử ngón tay trên thiết bị thật.
- 24 ảnh scene ở `screenshots/hero-*` và `story-*`: bốn viewport × ba mốc mỗi hero/story. Chờ 1200ms sau mỗi mốc. Mỗi story chỉ có một hình visible, detail không cắt/tràn.
- Desktop hero actor tâm từ 979,2px xuống 360px; detail opacity cuối 1. Mobile 320px detail nằm y66,6–363,1 trong viewport740px, actor scale0,76. Không coi screenshot toàn trang của sticky runway là các khoảng trống ở trải nghiệm cuộn.
- `carousel-checks.json`, `motion-checks.json`: capture thực từ source; video12s ở public/previews/auralis.mp4 có ba model, hero-to-detail và story. Ảnh preview chụp từ cùng source.

## D01–D08

D01 PASS: hero nêu model và wireless earbuds. D02 PASS: carousel foreground/blurred depth và persistent hero-to-detail actor; ba scene đổi sản phẩm. D03 PASS: mỗi section giữ mục đích sản phẩm/âm thanh/design/specs/enquiry. D04 PASS: palette/tokens/fonts/nút nhất quán; nút carousel tròn theo tham khảo, CTA3px. D05 PASS: chữ/detail và actor dùng được ở bốn khổ đã thử. D06 PASS: English copy cụ thể. D07 PASS: không testimonials/chứng nhận giả; hardware specs và ba model là concept. D08 PASS: model copy và detail đồng bộ qua models trong JS; specs/collection dưới trang dành cho EvoBuds One, giá149USD minh họa.

## Tương tác và phát hành

| Control | Hành vi |
|---|---|
| Previous/Next | Đổi model, title/detail/count/blurred queue |
| ArrowLeft/ArrowRight ở cụm nút | Chọn model trước/sau |
| Vuốt ngang trên ảnh | Chọn model; vuốt dọc vẫn cuộn |
| Discover / Scroll to explore | Có JS+motion: cuộn tới detail của hero; fallback: #sound |
| Explore the sound | #sound |
| Menu / Escape / resize | Mở đóng đúng ARIA và focus |
| Section links / email | Đích thật trong trang; email .example cần thay, không checkout |

`npm run typecheck` và `npm run build`: PASS. Production deployment **READY** `dpl_V1A9cdoc9b33XfKFAfffoQzNQuTJ`, alias `https://forgezone.store`. Chi tiết `/?mau=t9`, demo `/demos/auralis/index.html`. Giá mẫu giữ bảng chung. Xem `production-checks.json` và `production-motion.json` cho kiểm tra online cuối.

Giới hạn: chưa Safari/Edge/thiết bị thật và chưa mua/tải có quyền; không có checkout tai nghe. Không đưa asset thử nghiệm/công cụ vào ZIP.
