# Astra Interior — nghiệm thu 1.0.0

Ngày: 2026-09-30. Hồ sơ: WEB-MOTION-24, dẫn xuất công khai từ WEB-STATIC-1. Môi trường: Windows, Playwright 1.63.0, Chromium 153.0.8010.12 và Firefox 155. Bản được kiểm tra là ZIP giải nén riêng tại `_design/.qa-astra-final2/astra-interior`.

## Trạng thái

**ĐÃ DEPLOY PRODUCTION.** Q01–Q11 và Q13 PASS. Q12 PASS cho catalog, preview, video, live demo, guide, lint, TypeScript, production build và kiểm tra công khai trên `https://forgezone.store`. Luồng tải bằng tài khoản có quyền mua vẫn là NOT TESTED; không tạo đơn hoặc thu tiền giả.

- Production deployment: `https://web-9l24e28ux-htmtslh-hubs-projects.vercel.app`
- Domain chính đã alias: `https://forgezone.store`
- Vercel inspect: `https://vercel.com/htmtslh-hubs-projects/web/EY1YFiqNR6Nt5N8hetYRh3a3xQEo`

## Gói cuối

- ZIP: `web/private/templates/astra-interior.zip`
- Dung lượng: 262.441 byte.
- SHA-256: `65c6ba2d9d17670a3f1a9821a87230c0876e57df095868839599b02de92c83f8`
- Sáu file: `CUSTOMISE.md`, `LICENCE.txt`, `README.md`, `assets/css/style.css`, `assets/js/main.js`, `index.html`.
- Source khớp byte với bản giải nén: true.
- Preview: `astra-interior.webp` 26.028 byte; tablet 37.996 byte; mobile 28.268 byte; MP4 950.434 byte.
- Preview và MP4 được chụp/quay từ chính bản ZIP giải nén, không dùng concept board làm ảnh sản phẩm.

## Ngoại lệ được yêu cầu rõ

Chủ sản phẩm yêu cầu video phải tách thành 24 frame và phối hợp với thành phần web, không dùng video làm nền hero. Do đó ba giới hạn của WEB-STATIC-1 được thay bằng WEB-MOTION-24:

- W03: một sprite WebP 6×4, gồm 24 frame 640×360, nhúng trong `index.html`.
- W05: JavaScript có canvas sequence, IntersectionObserver và requestAnimationFrame ngoài menu/reveal.
- W06: ZIP vượt 20.480 byte; dung lượng thực được công bố ở trên.

W01 vẫn đạt: gói khách nhận đúng sáu file, không framework, package manager, build step, CDN script, API, tracking hoặc secret.

## Q01–Q13

| Mã | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 Cấu trúc | PASS | Đúng sáu file; sprite nằm trong data URL để không sinh thư mục frame rời; không file tạm trong ZIP. |
| Q02 Responsive | PASS | Chromium và Firefox tại 1440×900, 820×1180, 375×812, 320×740 đều có scrollWidth = clientWidth; ảnh trong `screenshots/`; không target độc lập dưới 44px. |
| Q03 Tương tác | PASS | 24 frame ánh xạ đúng tiến trình; giữa sequence đều ra frame 14; menu mở/đóng, chọn link, Escape và focus return hoạt động. |
| Q04 Bàn phím | PASS | Skip link hiện khi Tab, Enter đưa focus vào main; focus ring hai lớp nhìn được trên nền sáng/tối; menu đóng không nhận Tab. |
| Q05 Cấu trúc trợ năng | PASS | `lang=en`, một h1, đủ header/nav/main/footer, không ID trùng, không heading jump, canvas có accessible label; Axe WCAG 2 A/AA/2.1AA không báo violation trong hai engine. Không tuyên bố chứng nhận bên ngoài. |
| Q06 Tương phản | PASS | Axe 0 violation sau sửa accent theo nền; bảng màu thực đo bên dưới. Header có nền đen 52% riêng và sequence có shade toàn khung; đã nhìn frame sáng/tối. |
| Q07 Dự phòng | PASS | Reduced motion khoá frame 01 và bỏ sequence dài; no-JS vẫn hiện hero copy, nav, sections, CTA và không tràn ngang; file:// hoạt động; zoom CSS 200% 1440/1440. |
| Q08 Trình duyệt | PASS | Chromium 153.0.8010.12 và Firefox 155 trên Windows, HTTP và file://. Safari, Edge và thiết bị vật lý NOT TESTED. |
| Q09 Kỹ thuật | PASS | Console 0 lỗi, request failure 0, frame sprite 3840×1440 load đúng; requestAnimationFrame chỉ chạy khi sequence giao viewport; không scroll listener. |
| Q10 Tài liệu/quyền | PASS | CUSTOMISE có 10 bước, 12 prompt, bảng literal count đã đối chiếu. README công bố demo/ngoại lệ. LICENCE giữ bảy mục. DM Sans và Instrument Serif đối chiếu OFL chính thức của Google Fonts. |
| Q11 Gói cuối | PASS | Byte/hash ghi ở trên; bản giải nén khớp source; QA, preview và video chạy từ bản giải nén. |
| Q12 Cửa hàng | PARTIAL PASS | Production và domain chính hoạt động; catalog `t7`, category `motion`, copy vi/en/zh, guide, demo, WebP desktop/tablet/mobile và MP4 đều HTTP 200. Anonymous download trả 401; đường private trực tiếp trả 404. Tải bằng tài khoản có quyền mua NOT TESTED. |
| Q13 Thiết kế | PASS | Hướng cinematic editorial riêng, hero 24-frame và project still cùng một thế giới hình ảnh; không thay homepage Forge Zone. |

## Browser và responsive

| Engine | 1440 | 820 | 375 | 320 | Axe | Console/request |
|---|---:|---:|---:|---:|---:|---:|
| Chromium 153.0.8010.12 | 1440/1440 | 820/820 | 375/375 | 320/320 | 0 | 0/0 |
| Firefox 155.0 | 1440/1440 | 820/820 | 375/375 | 320/320 | 0 | 0/0 |

Các ô viewport là scrollWidth/clientWidth. Mỗi viewport có `smallTargets=0`; frame tại 56% tiến trình là 14 ở cả hai engine.

## Tương phản token

| Cặp màu | Tỷ lệ | Dùng cho | Kết quả |
|---|---:|---|---|
| #ffffff / #171612 | 18.10:1 | chữ sáng trên ink | PASS |
| #171612 / #e9e4d9 | 14.28:1 | chữ ink trên paper | PASS |
| #ffffff / #8b4d32 | 6.55:1 | contact trên clay | PASS |
| #ffffff / #5f6755 | 5.90:1 | approach trên sage | PASS |
| #e3a17d / #171612 | 8.33:1 | accent project trên ink | PASS |
| #8b4d32 / #f3efe7 | 5.71:1 | accent trên paper-soft | PASS |
| #f6c867 / #171612 | 11.53:1 | focus trong trên nền tối | PASS |

Focus dùng thêm vòng ink 6px bên ngoài, nên vẫn phân biệt được khi vòng vàng nằm trên nền sáng.

## Bảng tương tác

| Nhãn / thành phần | Hành vi | Trạng thái |
|---|---|---|
| Skip to content | Tới `#main`, focus main | PASS |
| Brand / Back to top | Tới `#main` | PASS |
| Selected spaces / Studio / Approach | Anchor tới section thật | PASS |
| Explore selected spaces | Tới `#work` | PASS |
| Begin a project / Tell us / email | `mailto:hello@astraatelier.example`; email demo phải thay, không tự gửi | PASS |
| Menu | Mobile toggle, ARIA, Escape, resize, focus return | PASS |
| Sequence canvas | 24 frame, 4 chương copy HTML, reduced-motion still | PASS |
| Three project canvases | Vẽ frame 06, 14, 22 từ sprite | PASS |

Không gửi email thật và không mô phỏng form thành công.

## Thiết kế D01–D08

| Mã | Kết quả | Nhận xét |
|---|---|---|
| D01 | PASS | Hero nêu rõ interior architecture, giá trị và CTA. |
| D02 | PASS | Hai lựa chọn riêng: sticky 24-frame có chương HTML; project still tái sử dụng sprite trong bố cục editorial lệch nhịp. |
| D03 | PASS | Studio, work, approach, scope, contact trả lời các câu hỏi khác nhau. |
| D04 | PASS | Token đầu CSS, hai font, một accent clay, component nhất quán. |
| D05 | PASS | Full-page và viewport thực không cắt/chồng/tràn; zoom 200% PASS. |
| D06 | PASS | Copy tiếng Anh cụ thể, không lorem ipsum. |
| D07 | PASS | Studio và ba project được công bố là hư cấu; không testimonial, logo khách hoặc số liệu giả. |
| D08 | PASS | Tên, địa điểm, năm và email demo nhất quán; edit map nêu đúng literal count. |

## File bằng chứng

- `checks.json`: kết quả máy đọc từ hai engine.
- `screenshots/`: ảnh toàn trang bốn viewport, no-JS và các ca kiểm tra.
- `store-home.png`: storefront gốc vẫn là Forge Zone, Astra Interior xuất hiện như card sản phẩm thứ bảy.
- `deployment-home.png`: homepage production với card Astra Interior; không còn hero cinematic đặt nhầm.
- `deployment-demo.png`: live demo production tại frame 14; sprite 3840×1440 load đúng, không tràn ngang.
- `BRIEF.md`, `catalog-copy.md`: phạm vi, giả định, ngoại lệ và copy bán hàng.
