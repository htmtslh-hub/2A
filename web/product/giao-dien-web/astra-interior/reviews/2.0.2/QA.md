# Mellow Coffee thay Astra Interior - QA 2.0.2

Ngày 05/10/2026. WEB-STATIC-1 v1.2 + ngoại lệ ảnh/JS/dung lượng theo brief. Giao diện local hoàn thành; chưa deploy. Phát hành thương mại: CHỜ RÀ SOÁT LICENCE và browser chưa thử, không tuyên bố đạt nguyên chuẩn.

## Gói và phạm vi

ZIP: astra-interior.zip, 828.682 byte. SHA-256: `dfb995c3fb2d268b73f352be730d2236358d5f452dd17bd89c251edc54f4f5e7`.
Đủ sáu file bắt buộc + ba WebP local, tổng 9 file; bản giải nén khớp byte source. Không framework, CDN, hotlink, base64, tracking, web font hoặc secret. Font Segoe UI/sans-serif hệ thống.

Thay active source/demo/ZIP/preview và slot t7/guide vi/en/zh. Giữ slug tương thích URL. Không sửa sản phẩm khác, DB, thanh toán, cấu hình chung hoặc deploy. Design/review cũ và cinematic là lịch sử; active source không tham chiếu chúng.

## Q01-Q13

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS | Sáu file chuẩn + ba asset theo ngoại lệ, không file tạm trong ZIP. |
| Q02 | PASS | Chromium/Firefox/Edge ở 1440x900, 820x1180, 375x812, 320x740: scrollWidth=clientWidth; images tải đủ. Ảnh desktop/mobile/full-page đã nhìn. |
| Q03 | PASS | Menu/Escape/focus/filter đúng; Matcha filter có1món. Bag 4.50+6.00=10.50, tăng espresso=15.00, bỏ matcha=9.00; reload giữ2món. Mailto chỉ enquiry. |
| Q04 | PASS | Checker skip/Tab/focus/menu; dialog và mobile Escape trảfocus về nút mở. |
| Q05 | PASS | Một h1, đủ landmark, không ID trùng hoặc heading jump; axe0violation trong Chromium/Firefox. Không chứng nhận bên ngoài. |
| Q06 | PASS | Bảng contrast CSS/pixel trong checks.json và axe0; header có shade riêng; nhìn screenshot thực tế. |
| Q07 | PASS | File://, noJS, offline/fontfallback, zoom200 checker PASS; motion luôn bật khi reduced-motion theo rules mới, pause chỉ phiên hiện tại. |
| Q08 | NOT TESTED | Chromium153.0.8010.12, Firefox155.0 và Edge154.0.4258.53 PASS. Cốc Cốc executable không tìm thấy (chỉ có profile); Safari và thiết bị vật lý chưa thử. |
| Q09 | PASS | Console/network0; finite RAF, rapid12click chỉ1ảnh visible sau ổn định ở3browser. Typecheck/lint/build bản2.0.0 PASS; bảnhover2.0.2 JSsyntax/browser/ZIPchecks PASS, không chạy lại build; không scrolllistener hoặc RAF vô hạn. |
| Q10 | FAIL | CUSTOMISE10bước/12prompt/editmap chính xác, README khớp tính năng. LICENCE giữ nguyên theo giới hạn AGENTS, còn factual scope Astra/sequence/font cũ: chủ sản phẩm cần rà soát quyền ảnh mới trước phát hành thương mại. Không tự đổi điều khoản. |
| Q11 | PASS | Script đóng --ngoai-le, đọc lại/source khớp; giải nén test HTTP và file://. Hash/byte ở trên. |
| Q12 | PASS | Catalog MellowCoffee/shop/revision2.0.2; demo/3preview/MP4 đồng bộ. Next production local home đã xác minh bản2.0.0 có Mellow và không Astra; sourcecatalog nay revision2.0.2, chưa build/retest cửa hàng cho revision-only change. Deploy/tải bằng tài khoản mua không trong phạm vi, chưa thử. |
| Q13 | PASS | D01-D08 bên dưới. Chữ/nút HTML thật, ảnh chỉ là cutout. |

## Motion và tương tác

motion-checks.json đo sau120ms: opacity giữa frame khoảng0.25-0.50, matrix còn trượt/xoay, cuối vềopacity1. Có2→0 và0→2 trực tiếp, rapid12click, CSS animation/transition bị tắt nhưng RAF vẫn hoạt động. Thử reducedMotion=reduce, state motion=off cũ, reload sau pause mặc định aria-pressed=false. Bag/filter/menu/Escape/rapid PASS ở Edge/Chromium/Firefox. Giỏ lưu localStorage, fallback memory khi storage không có; không checkout/stock/order backend.

Screenshot fullpage có cảnh matcha do autoplay; preview và MP4 render từ source khách nhận, không concept. Ba ảnh AI tự tạo bằng built-in imagegen, chuyển WebP giữ alpha bằng Pillow. Nguồn/prompt và hướng thiết kế trong BRIEF.md. Không claim quyền ảnh hoặc thương mại mới vượt giấy phép cũ.

## D01-D08

| Mục | Trạng thái | Nhận xét |
|---|---|---|
| D01 | PASS | Hero coffee và CTA menu rõ ngành. |
| D02 | PASS | Cutout/splash amber và chuyển cảảnh/chữ có hướng. |
| D03 | PASS | Hero khám phá, menu chọn món, story thương hiệu, contact enquiry. |
| D04 | PASS | Token đầuCSS, font hệ thống, amber xuyên suốt, nút tròn/ảnh14px. |
| D05 | PASS | Nhìn desktop/mobile/fullpage; không tràn/cắtchữ; mobile ảnh thu110% để giữ chủ thể. |
| D06 | PASS | Copy tiếngAnh cụ thể, không lorem. |
| D07 | PASS | Café/giá demo công bố hưcấu, không testimonial hoặc chứng nhận giả. |
| D08 | PASS | Món/giá HTML khớp catalogue cent và bag. |

## Phần chưa thử và bàn giao

Cốc Cốc, Safari, thiết bị vật lý, production deployment và paid-download không được tuyên bố đã thử. Không gửi email thật hoặc thu tiền. LICENCE cần chủ sản phẩm rà soát factual scope/quyền tài sản mới trước phát hành thương mại; không tự sửa chính sách thương mại.

Bằng chứng: checks.json, motion-checks.json, store-check.json, screenshots/, video-frames/, check-motion.mjs, check-store-slot.mjs, BRIEF.md. Lệnh: dong-goi/check-template --version2.0.0 --ngoai-le; node check-motion; npm run typecheck; eslint2file; npm run build. Các file thay đổi chỉ thuộc sản phẩm này và2file dữ liệu cửa hàng.

## Bản2.0.2: hover không gian vũ trụ

Chủ sản phẩm chọn ánh sao/hạt sáng/quầng sáng theo chuột thay vì yêu cầu góc nhìn3D. Thêm canvas decorative75sao ổn định, sao gầncon trỏ sáng/twinkle/cross, spark trail tốiđa90hạt có lifespan1100ms, quầngvàng360px theo pointer. Paletteamber giữnguyên. Lớp pointer-eventsnone, aria-hidden, không ảnh/tài sản ngoài; canvas khởi tạoJS, noJS vẫn có UI đầyđủ. Hover2.0.1 ly/bánh/beans tiếp tục hoạt động độc lập carousel.

Cosmic RAF hữu hạn: input gia hạn1500ms, pointerleave giảm xuống550ms, pause cleartrail/quầng, tabhidden stop. Canvas DPRmax1.5 và resize theohero. Không loop vôhạn khiidle. Edge instrumentation sau hếttrail: idleCallbacks=0 trong250ms; xem cosmic-idle.json. CSS/WAAPI không cần cho hiệuứngcanvas/aura.

Check-motion2.0.2 ở3browser đo auraopacity0.7, translate1050px320px, pointer-eventsnone. Sauidle vàpauseopacity0. Hoverrest/pause, rapid12click,2chiềuwrap, bag/filter/menu/Escape/reload vẫnPASS. ReducedMotionreduce và CSSanimation/transitionnone vẫnchạy. Genericchecks từZIP bản2.0.2:4viewports, axe,contrast,file/offline/noJS/zoom vàeditmap. Screenshotcosmic đã nhìn; các control không bị lớp sao che thao tác. Preview/video rendertừsource mới, cóđường rê chuột.

Phạm vi thay đổi: sourceCSS/JS/docs, demoCSS/JS/HTMLcacheversion, ZIP,preview và t7revision. KhôngDB/backend/deploy/đổi sản phẩm khác. Không sửaLICENCE; vấn đềlicence lịch sử vẫn được ghiQ10. CốcCốc/Safari/thiết bị vật lý chưa thử. Bằngchứngbảnnày:checks.json,motion-checks.json,cosmic-idle.json,screenshots/,video-frames/,check-motion.mjs,check-cosmic-idle.mjs. JSsyntaxcheck, đónggói --ngoai-le vàcheck-template --version2.0.2 --ngoai-le.
