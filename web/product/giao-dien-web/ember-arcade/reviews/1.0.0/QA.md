# Ember Arcade — QA 1.0.0

09/10/2026. WEB-STATIC-1 v1.2 + ngoại lệ riêng W01/W03/W05/W06 theo dashboard ảnh được yêu cầu. **Đạt gói thương mại local theo ngoại lệ**, không gọi đạt nguyên chuẩn sáu file/20.480byte. Không đăng bán/deploy trong phạm vi yêu cầu mới này.

## Phạm vi, gói và quyền

Chỉ tạo thư mục ember-arcade, demo/preview tương ứng; không sửa catalog, backend, schema, config hoặc sản phẩm khác. Brief độc lập ở BRIEF.md. Mục tiêu UI gaming dashboard; game/profile/friends/playtime giả định được ghi rõ trên trang và tài liệu. Không lấy ảnh franchise screenshot để đóng gói.

- Sáu file bắt buộc + ba WebP,9 file. PNG concept/nguồn và QA không trong ZIP.
- Rift1440×960,174646byte; Moon800×1200,216634byte; Ash800×1200,149022byte.
- ZIP559126byte (<1MiB mục tiêu riêng); SHA-256 `65eb7a90bdb0407c9de303298d9d804e1bf889bfc662c02ad42676d536afe2ad`.
- W05: search/filter hai discovery cards, favourite localStorage và hash mở native details. Không thêm service hoặc dependencies. JS thuần, không loop/timer nền/tracking.
- Giấy phép thương mại bảy mục theo chính sách đã dùng ở Melt Muse, copyright Văn Triển, quyền dùng code/ba ảnh trên website cá nhân/thương mại/khách hàng; không bán lại template/stock riêng. Không font binaries/CDN; systemfonts nên không có giấy phép font bên ngoài cần fetch.
- Motion finite280ms/reveal,350ms/hover mặc định bật theo rules05/10, kể cả OS reduced motion. Không carousel/motion sản phẩm hoặc wrap nên yêu cầu test wrap N/A.

## Bằng chứng cuối

accepted/checks.json áp dụng ZIP cuối: **failures:[]**, sourceMatchesExtracted=true,10 steps/12 prompts/countErrors[]/markers[]. Chromium153.0.8010.12,Firefox155.0; headless Windows Playwright. interactions.json Edge155.0.4283.45,6 widths và kiểm chức năng thật. Screenshots cuối Edge ở screenshots/; ảnh giải nén hai engine ở accepted/screenshots/.

Các lượt first/final/release trước đó là lịch sử lỗi: count brand6→5, SVG thiếuviewBox, màu navcontrast4.25→6.54 và genrecontrast Firefox4.22→15.35 với nền chữ đặc. Không dùng lượt cóFAIL để bàn giao. Crop artwork đã chỉnh để giữ đầu nhân vật, moon và citadel; nhìn ảnh cuối320/375/768/1024/1440, bản preview1396×1047, không cắt chữ. Ảnh gốc không chứa typography.

## Q01–Q13

| Mục | Kết quả | Bằng chứng/giới hạn |
|---|---|---|
| Q01 Cấu trúc | PASS ngoại lệ |9 file, đúngsource, không libs/secrets/temporary files. |
| Q02 Responsive | PASS | Chromium/Firefox1440×900,820×1180,375×812,320×740,scrollWidth=width,smallTargets[]. Edge thêm768/1024,không tràn. |
| Q03 Tương tác | PASS |Menu950px,Escape focus,linkclose,resizeARIA; search có/không kết quả,Escapeclear; favourites save/reload/remove và blockedstorage; native notes/hash. |
| Q04 Bàn phím | PASS | Skip visible/main,Tab bỏ menuẩn,ShiftTab,focus; / focussearch,summary keyboardnative. |
| Q05 Trợ năng nội bộ | PASS |Một h1,landmarks,SVGhidden/viewBox,labels,alt;axe0violationshai engine. Không chứng nhận bên ngoài. |
| Q06 Tương phản | PASS |Body7.39:1,navactive6.54:1,herocopy7.67:1,genre15.35:1; titlecard9.01–9.54,bodycard13.98–15.52 theo pixel/engine. Hover khôngfail. Focus cream/page9.06:1. Đã nhìn chữ trên ảnh cuối320/768/1024/1440. |
| Q07 Dự phòng | PASS theo motionrule | file://,offline,khôngJS/font,zoom mô phỏng200%720×450, reducedpref contentfull/noanimation sau5s. Edgeblockedimages giữheadline/contact;blockedstorage dùngsessionnotice. Search disabled/savehidden khi noJS,native notes vẫn mở. |
| Q08 Browsers | PASS phạm vi tối thiểu |Chromium153.0.8010.12,Firefox155.0,Edge155.0.4283.45 Windowsheadless. Safari/Cốc Cốc NOT TESTED,không quảng cáo đã thử. |
| Q09 Kỹ thuật | PASS |Localconsole/network0 trên finalchecker;Edgeruntime0;cuộn/menu/search/favourites được thử. Không benchmarkLighthouse hoặc dự đoán chịu tải. |
| Q10 Tài liệu/quyền | PASS |10 bước/12prompt;editmapđếm literal;licencebảy mục/owner/ảnh;systemfonts khôngbundled. Đọc từngprompt có đầu vào/thiếu thông tin/đầu ra đầy đủ. AIkhác NOT TESTED. |
| Q11 ZIP | PASS |Scriptđọc lại khớp source; accepted thử chính bản giải nénHTTP/file:// vàhashởtrên. |
| Q12 Store | N/A tích hợp/live |Tạo localdemo+previewkhớpsource,proposalvi/en/zh. Không sửacatalog/checkout/download,khôngproductiondeploy hoặc thử mua. |
| Q13 Thiết kế | PASS nội bộ |D01–D08 phía dưới; ảnhreference chỉ làm mood/layout,artoriginal. |

## D01–D08

D01: CTAExploregame mở notes, demoCTAkhôngcài đặt. D02: hai rail và banner nhân vật + sculpturalorbit thống kê là các lựa chọn riêng. D03: greeting/search→feature→discovery→activity/stats→notes; mỗi phần có vai trò. D04: rootpalette/font và44pxactions thống nhất. D05: xem crop/faces/text/breakpoints, không overflow. D06: copy Anh cho thư việnfictional nhất quán. D07: không clientlogos/testimonials/gamefranchise hoặc stats giả làm real;disclosuresrõ. D08:32.5=18+9.5+5;sampleactivity2h15m làsessionkhác, tên/links ổn. Tất cảPASSnội bộ.

## Bảng tương tác

| UI | Hành vi | Kết quả |
|---|---|---|
| Logo/rail/backtop | Anchors hợp lệ | PASS |
| Hero/quick/card arrows/activityarrow | Trỏgame/notes;JS mởdetails/native clickfallback | PASS |
| Search | Tên/tags hai cards,empty,Escape,/ | PASS |
| Hearts | Localdevicefavourites;labels/pressed/reload/blockedstorage | PASS |
| Notification | Đếnactivity,khôngnotificationservicegiả | PASS |
| Profiles/friends/plus | Đếndemo explanation,khôngchat/presence service | PASS |
| Contactplus | mailto:hello@example.com | PASShref,không gửi emailthử |
| Native summaries | Mở/đóngnotes | PASS cảnoJS |
| Statistics/orbits | Staticgraph+dữ liệu mẫu | PASSkhớptotal,khôngcontrolgiả |

Lệnh: dong-goi.mjs ember-arcade --ngoai-le; check-template.mjs ember-arcade --version1.0.0 --ngoai-le --outaccepted; verify-interactions.mjs. Preview698×524 từcode1396×1047,53464byte;source/demoassetbytes vàHTML sau bỏbasetagkhớpPASS. Bản xemcục bộport4350 phục vụpublicdemo,không đưa ZIP/documents ra public. Không lỗi đang biết trong phạm vi đã thử; các giới hạn browser/AI/live được công khai.
