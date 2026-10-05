# Solenne — nghiệm thu 1.0.0

Chuẩn: product-standards.md 1.2, WEB-STATIC-1. Ngày: 2026-09-28T02:56:09.360Z. Môi trường: Windows, Playwright 1.63.0; actual Chromium và Firefox. Mã kiểm tra: _design/check-three.mjs. Bản được thử: ZIP giải nén riêng, không phải chỉ mã trong thư mục thiết kế.

## Trạng thái

**CHỜ KIỂM TRA phát hành cửa hàng**: Q01–Q11 và Q13 PASS; Q12 chưa đủ vì chưa có tài khoản khách đã mua để thử luồng tải được cấp quyền trên deployment. Không tạo đơn giả, không thu tiền, không truy cập tài khoản khách khác. Bản kiểm tra đã deploy với --prod --skip-domain; forgezone.store chưa chuyển sang bản mới. Không có ngoại lệ chuẩn được chấp nhận.

## Gói cuối

- File: web/private/templates/solenne.zip
- Byte thực đo: 18560 (<20.480).
- SHA-256: 4bbbc2f333abd4797009839576e3aa76ecc6bb0f7baf25de27495f2461e1d53d
- Sáu file: CUSTOMISE.md; LICENCE.txt; README.md; assets/css/style.css; assets/js/main.js; index.html.
- File giải nén khớp byte với source: true.
- Source: _design/templates/solenne/. Preview: /previews/solenne.webp (698×524), /previews/solenne.mp4 (1396×1048); tablet/mobile chụp từ layout thật tại 820×1180 và 375×812, không dùng desktop làm mobile.
- Video: 478267 byte; ghi bằng Playwright từ trang chạy của chính ZIP, MP4 H.264 silent faststart. Không nằm trong ZIP khách nhận.

## Q01–Q13

| Mã | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 Cấu trúc | PASS | checks.json: files, sourceMatchesExtracted; đúng sáu file, không thư viện/secret/file tạm. |
| Q02 Responsive | PASS | 1440×900, 820×1180, 375×812, 320×740 trên cả hai engine; không tràn ngang, không target độc lập dưới 44 px; screenshots/*-1440/820/375/320.png và *-menu-open.png. Đã xem ảnh toàn trang cả bốn khổ. |
| Q03 Tương tác | PASS | Bảng dưới và checks.json: menu.open/escape/linkCloses/desktopReset/mobileReset đều true. Breakpoint 949/951 px, chờ event matchMedia trước đo. |
| Q04 Bàn phím | PASS | Tab tới skip link hiện rõ, Enter đưa focus main, Tab CTA hero; Tab bỏ qua nav đóng, Shift+Tab về toggle, Escape trả focus. checks.json keyboard. |
| Q05 Cấu trúc trợ năng | PASS | lang en, một h1, landmark header/nav/main/footer, heading không nhảy cấp; IDs không trùng; SVG có viewBox và tên hoặc aria-hidden/focusable=false. Axe WCAG2 A/AA + 2.1AA: không violation trong kiểm tra này, không tuyên bố chứng nhận. |
| Q06 Tương phản | PASS | Bảng cặp màu thực đo bên dưới; hover từng button/nav/footer/contact/ritual áp dụng; focus outline có số đo trong checks.json. Văn bản nằm trên nền solid, không đặt trên SVG/gradient; không cần đo nền phức tạp dưới chữ. |
| Q07 Dự phòng | PASS | Tắt JS + block Google Fonts: nav và nội dung còn dùng được, toggle không xuất hiện; reduced motion tất cả reveal visible; file:// offline vẫn đọc và không tràn; zoom layout 200% bằng CSS zoom=2 để đo reflow (không gọi là browser native zoom/thiết bị thật). Ảnh *-nojs-no-font-320 và *-zoom200. |
| Q08 Trình duyệt | PASS | Actual Chromium 153.0.8010.12, Firefox 155.0; HTTP và file:// bản giải nén. Safari/Edge/WebKit/thiết bị vật lý NOT TESTED và không quảng cáo đã thử. |
| Q09 Kỹ thuật | PASS | Console/network bình thường 0 lỗi; font abort chỉ trong ca dự phòng cố ý. Cuộn, menu, reveal không đổi layout; không loop JS/scroll listener, animation hero dừng ≤2 giây; fallback reveal bỏ class sau 4,5 giây. Google Fonts là request mạng tùy chọn duy nhất. Không bịa điểm Lighthouse. |
| Q10 Tài liệu/quyền | PASS | 10 bước, 12 prompt; số đếm literal kiểm lại trên source cuối, countErrors=0; đã đọc đủ prompt/input/output và thử các đường dẫn. Không gửi sang AI khác nên không tuyên bố đã thử AI khác. LICENCE bảy mục giữ chính sách; copyright Đinh Văn Triển; nguồn OFL Manrope và Barlow Condensed (nếu dùng) đối chiếu chính thức. Demo được nêu rõ. |
| Q11 Gói cuối | PASS | Byte/hash trên, sourceMatchesExtracted=true; tests từ bản giải nén HTTP và file://, cả hai browser. |
| Q12 Cửa hàng | NOT TESTED (phần tải có quyền) | Catalog t4/solenne/business, vi/en/zh, giá 1.900.000₫ hoặc $79; local/build/lint/TypeScript và deployment thẻ/video/guide đã thử. API anonymous 401, đường private trực tiếp 404; tracing có cả ZIP mới. Chưa thử stream tải bằng khách có quyền mua. Xem _design/product-reviews/store-three/deployment-checks.json. Không chuyển domain chính trước khi có quyền test hoặc ngoại lệ rõ ràng. |
| Q13 Thiết kế | PASS | D01–D08 dưới, screenshots; có hướng riêng, không đổi màu một mẫu cũ để lấp catalog. |

## Browser & responsive số đo

| Engine | viewport: scrollWidth/clientWidth | Axe violations | Console/network lỗi |
|---|---|---:|---|
| chromium 153.0.8010.12 | 1440: 1440/1440; 820: 820/820; 375: 375/375; 320: 320/320 | 0 | 0/0 |
| firefox 155.0 | 1440: 1440/1440; 820: 820/820; 375: 375/375; 320: 320/320 | 0 | 0/0 |

## Màu thực tế

Bảng trạng thái thường; hover và focus đầy đủ nằm trong checks.json (hoverContrast, contrast.focus). Ngưỡng text thường 4,5:1, text lớn 3:1, focus 3:1.

| Element | Foreground | Background RGB | Ratio | Ngưỡng | Kết quả |
|---|---|---|---|---|---|
| skip-link | rgb(248, 245, 248) | 48,39,56 | 13.18:1 | 4.5:1 | PASS |
| brand | rgb(48, 39, 56) | 248,245,248 | 13.18:1 | 3:1 | PASS |
| brand__point | rgb(109, 70, 125) | 248,245,248 | 6.88:1 | 3:1 | PASS |
| A | rgb(48, 39, 56) | 248,245,248 | 13.18:1 | 4.5:1 | PASS |
| button button--small | rgb(255, 255, 255) | 109,70,125 | 7.44:1 | 4.5:1 | PASS |
| eyebrow | rgb(103, 64, 115) | 248,245,248 | 7.59:1 | 4.5:1 | PASS |
| hero__intro | rgb(96, 86, 101) | 248,245,248 | 6.43:1 | 4.5:1 | PASS |
| eyebrow | rgb(96, 86, 101) | 238,231,240 | 5.74:1 | 4.5:1 | PASS |
| H2 | rgb(48, 39, 56) | 238,231,240 | 11.76:1 | 3:1 | PASS |

## Bảng tương tác

| Nhãn | Loại | Đích | Giới hạn/demo | Kết quả |
|---|---|---|---|---|
| Skip to content | anchor | #main | Đích section tồn tại | PASS |
| Solenne home | anchor | #main | Đích section tồn tại | PASS |
| Our rituals | anchor | #rituals | Đích section tồn tại | PASS |
| Our approach | anchor | #approach | Đích section tồn tại | PASS |
| Your visit | anchor | #visit | Đích section tồn tại | PASS |
| Enquire about a visit ↗ | anchor | #contact | Đích section tồn tại | PASS |
| Find your ritual ↗ | anchor | #rituals | Đích section tồn tại | PASS |
| Enquire about a visit for The Reset | anchor | #contact | Đích section tồn tại | PASS |
| Enquire about a visit for The Restore | anchor | #contact | Đích section tồn tại | PASS |
| Enquire about a visit for The Conversation | anchor | #contact | Đích section tồn tại | PASS |
| Email the studio ↗ | anchor | mailto:hello@example.com | Email demo, phải thay; mở ứng dụng email, không gửi tự động | PASS |
| solenne. | anchor | #main | Đích section tồn tại | PASS |
| hello@example.com | anchor | mailto:hello@example.com | Email demo, phải thay; mở ứng dụng email, không gửi tự động | PASS |
| Menu | button | nav site-nav | Chỉ hiện sau JS khởi tạo; Escape/resize/link đóng đúng | PASS |

Email chỉ kiểm tra liên kết/protocol và cách công bố hành vi; không gửi thư thật tới example.com.

## D01–D08

| Mã | Kết quả | Nhận xét |
|---|---|---|
| D01 | PASS | Hero nêu ngành, công việc cụ thể và CTA tới section/email. |
| D02 | PASS | Hướng minh họa, typography và bố cục ghi trong BRIEF, nhìn rõ trên desktop và phone. |
| D03 | PASS | Mỗi section trả lời một câu hỏi: cung cấp gì, lựa chọn/năng lực, quy trình, liên hệ. |
| D04 | PASS | Token :root; tối đa hai họ font; body16/caption14; font weight tải chỉ loại có dùng. |
| D05 | PASS | Đã xem full page bốn khổ, không chữ cắt/chồng; tablet cho phép tên dài wrap tự nhiên. |
| D06 | PASS | Copy English cụ thể theo ngành, không lorem ipsum. |
| D07 | PASS | Brand/case/category demo hư cấu; SVG tự tạo; không review/client logo/certification thật; README/LICENCE nêu rõ. |
| D08 | PASS | Dữ liệu demo nhất quán, email demo khai báo và exact edit map có số đếm. Không pricing trong trang demo gây nhầm giá bán template. |

## Giả định, điều chỉnh và lỗi còn lại

- Giả định: tự chọn tên doanh nghiệp hư cấu và ngành mẫu mới trong phạm vi bổ sung template. Không mở rộng backend.
- Design skill: variance/motion/density 7 / 4 / 3. Chuẩn người dùng ưu tiên: SVG nội tuyến thay ảnh sinh AI; JS native menu/reveal thay thư viện animation; palette cố định thay theme toggle. Đây là điều chỉnh skill theo chuẩn, không phải ngoại lệ WEB-STATIC-1.
- Ngoại lệ chuẩn: không đề xuất. Chỉ phát hành khi kiểm tra bắt buộc hoàn thành; luồng tải có quyền thật phải được ghi trung thực.

- Kỹ năng design-taste-frontend định hướng bố cục riêng, hierarchy và micro-motion; WEB-STATIC-1 ưu tiên nên dùng SVG/code native, không thư viện/ảnh sinh AI/theme toggle.
- Bổ sung hiển thị video tại cửa hàng, ngoài phạm vi JS của file template. Video lazy-load khi nhìn thấy, pause ngoài viewport, có nút phát/dừng và tôn trọng reduced motion; ảnh tĩnh fallback. Không áp hiệu ứng cuộn ảnh cũ lên video.
- Lỗi bắt buộc trong gói: không còn. Thiếu duy nhất ở phạm vi phát hành: kiểm tra tải có quyền trên deployment.
- First QA race: một lần đọc ARIA ngay khi resize trước event matchMedia làm kết quả false; đã sửa test chờ150ms. Firefox timer bị đọc trước reveal fallback: đã chuyển sang chờ điều kiện DOM thật. Bản kiểm tra cuối không còn failure.
