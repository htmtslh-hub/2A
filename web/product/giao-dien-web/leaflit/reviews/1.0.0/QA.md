# Leaflit 1.0.0 · QA phát hành

Ngày 14/10/2026, Windows. WEB-STATIC-1 v1.2.1 + ngoại lệ riêng được chủ sản phẩm duyệt: W01/W03/W06 ảnh WebP và gói 14 file; W05 tương tác cục bộ. Bản cuối được chủ sản phẩm duyệt và yêu cầu đóng gói/đưa store. Không claim fidelity >95% với ảnh ban đầu.

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS theo ngoại lệ | 14 file; sáu core + tám WebP, final-package.json |
| Q02 | PASS | Chromium/Firefox 1440×900, 820×1180, 375×812, 320×740; không overflow; release-final/checks.json. Bốn browser thực local-release.json |
| Q03 | PASS | Menu, Escape/link/resize; book descriptions, search/genre/saved, empty, profile validation/text escaping; local-checks.json và local-release.json |
| Q04 | PASS | Tab/focus/Escape và focus contrast trên bản giải nén, release-final/checks.json |
| Q05 | PASS | Một h1, landmarks, headings/IDs, tên/SVG; axe không lỗi, release-final/checks.json |
| Q06 | PASS | Automated contrast gồm pixel sampling nền phức tạp; supplemental.json. Tám bìa raster đã nhìn trực tiếp, nội dung tên sách/tác giả có HTML tương ứng; không coi axe là phép đo chữ raster |
| Q07 | PASS | No-JS/offline/file://, font fallback, zoom 200%, OS reduce; release-final/checks.json. Animation mặc định bật theo owner rules |
| Q08 | PASS | Chromium 153.0.8010.12, Firefox 155.0, Edge 155.0.4283.45, Cốc Cốc 152.0.7977.124. Safari/thiết bị thật NOT TESTED |
| Q09 | PASS | Không pageerror/missing asset ở clip và browser; finite reveal có terminal đúng, reverse scroll vẫn hiện; không request runtime ngoài; ZIP 1350006 byte |
| Q10 | PASS | 10 bước, 12 prompt, literal counts=đúng, unfilledMarkers=[]; giấy phép bảy mục giữ quyền/chính sách cũ, chỉ đồng bộ loại tài sản. Font hệ thống, không font bên thứ ba được phân phối |
| Q11 | PASS | Đóng bằng dong-goi --ngoai-le, giải nén đủ 14 file và so source từng byte. Runtime cuối trùng bản giải nén đã qua browser suite, README cuối cập nhật đúng release |
| Q12 | PASS phần tích hợp local | t32/entertainment; copy/specs/guide vi/en/zh; demo/WebP/MP4 khớp; detail/library/video pause và private download guards đã thử local. Online sẽ ghi online-release.json. Giao dịch mua và download qua tài khoản có quyền thật NOT TESTED; không tạo purchase/entitlement |
| Q13 | PASS theo brief đã duyệt | D01–D08: dashboard thư viện, 3 reading cards/5 releases/8 collection covers, token nhất quán, responsive, demo rõ, hai lựa chọn riêng bìa nhô khỏi card và sidebar tác giả |

ZIP SHA-256: `c1b36a3e65ac024ef4a44c2ceccfae187e35031815cedd8fcef62c47c06ecdf8`. Bộ tài sản 600×900 tự tạo; prompts/source/hash ở design/ASSETS.md và generated-covers.json. Package proof: final-package.json. Không sửa catalog/giá/DB ngoài entry Leaflit; giá chung $20 giữ nguyên.

Store build/typecheck và 32 video manifests PASS. vercel build local gặp Windows EPERM tạo symlink serverless; Next build riêng PASS, sẽ deploy source qua Linux builder Vercel. ZIP được Next trace vào /api/download; không đặt công khai.

Bằng chứng cũ tại checks.json/ACCEPTANCE.md mô tả candidate trước chủ sản phẩm duyệt bản cuối; RELEASE.md và QA.md này là trạng thái phát hành hiện tại. Online URL, deployment, commit và guard results bổ sung sau khi triển khai.

## Production verified

Runtime commit 3c03ecd; Vercel dpl_H6GPsJZt5j8ND9V3q3YaPZdrtUcC READY, alias https://forgezone.store. Product https://forgezone.store/?mau=t32; demo /demos/leaflit/index.html?v=1.0.0.

Online release suite PASS on Chromium/Firefox/Edge/CocCoc, title-author search, genre filters, save/profile reload, finite reveal/reverse scroll and 16 image placements. Three languages passed detail/library/video pause. Twelve store viewport-language combinations passed exact 14-file specs and no overflow. Every new public resource, plus unchanged Chronoform and Dualplay HTML, matched local bytes. Anonymous /api/download?id=t32 returned 401; direct ZIP path returned 404. Common 32-product preview autoplay suite passed all four browsers.

The protected download route includes leaflit.zip in Next output tracing. No entitlement, purchase or database records were changed. A real paid purchase/account-owned download was NOT TESTED; Safari/physical devices NOT TESTED. This does not claim full payment-system verification.

Release state: published owner-approved Leaflit 1.0.0 with recorded exceptions W01/W03/W05/W06. No other product runtime or price change. Prior candidate-only acceptance paragraphs are historical; this production record and RELEASE.md are authoritative for the final approved design.
