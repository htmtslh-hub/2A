# Mellow Coffee — QA 2.0.3

Ngày 05/10/2026. Phạm vi: thay hiệu ứng sao/trail bằng nền hạt lấy cảm hứng từ https://antigravity.google/. Đã xem trang thật và tương tác ở mobile/desktop: hạt màu nhỏ, dạng vệt, bay lệch quanh chuột. Không sao chép tài sản hay mã nguồn trang tham chiếu.

Source JS và tài liệu khách, demo JS/HTML cache version, ZIP, preview/video, catalog t7 version được đồng bộ. CSS đặt canvas ở z-index0 phía sau nội dung và CTA, giữ pointer-transparent. Không sửa sản phẩm khác, backend, DB, cấu hình hay deploy. Nguồn canonical trong source/; ZIP 9 file theo ngoại lệ ảnh/JS/dung lượng đã được brief cho phép. LICENCE giữ nguyên.

## Hiệu ứng và bằng chứng

Trường jitter khoảng 34px, 1134 hạt ở 1440×900, palette amber/cream/blue/violet/coral. Trong bán kính 230px: lực đẩy hướng ra và lực tiếp tuyến làm hạt xoáy; spring .035, damping .8 đưa về home. Vệt dài theo tốc độ. Aura giảm xuống opacity .18. Input gia hạn 1500ms, pointerleave rút còn 550ms, hidden/pause reset. DPR tối đa 1.5, density co theo kích thước hero. Không phụ thuộc CSS transition/WAAPI hoặc thư viện.

particle-checks.json: Edge154.0.4258.53/Chromium153.0.8010.12/Firefox155.0 có 111–119 hạt lệch >1px sau350ms, độ lệch lớn nhất khoảng64–65px; sau hết input tất cả về đúng home. cosmic-idle.json: Edge có0 RAF callback trong250ms sau settle. motion-checks.json: hover/return/pause, menu/bag/filter/Escape/persistence, wrap hai chiều, rapid12click và reducedMotionreduce/stateoff đều PASS ở3browser; console0; 4viewports không overflow. Test copy/preview từ source khách nhận.

Generic phát hiện mẫu pixel CTA bị hạt canvas phủ lên. Đã hạ canvas xuống z-index0, phía sau copy z-index1; hạt không đi qua chữ/nút. Đồng thời giữ opacity copy=1 với animation translate hữu hạn khi vào/chuyển slide. Kiểm tra lại gói cuối. Nội dung/CTA/menu không thay đổi.

## Q01–Q13 và D01–D08

Q01 PASS: 6 file bắt buộc +3 WebP theo ngoại lệ; pack đọc lại khớp source.
Q02 PASS: 1440×900,820×1180,375×812,320×740 trên3browser, images đầy đủ, không overflow.
Q03/Q04/Q05 PASS: luồng thật và checks generic bản cuối; xem checks.json và motion-checks.json.
Q06 PASS: generic bản cuối failures=[], contrast/axe ở Chromium/Firefox PASS, đã nhìn preview desktop/mobile và ảnh active particles.
Q07 PASS: pause phiên hiện tại, mặc định motion bật theo owner override; file/noJS/offline được generic kiểm tra.
Q08 NOT TESTED: Cốc Cốc không tìm thấy executable; Safari/thiết bị vật lý chưa thử. 3browser trên đã thử thực.
Q09 PASS: JS syntax, console0, finite RAF, particle reset; không chạy lại Next build cho revision data-only.
Q10 FAIL: README/CUSTOMISE đã cập nhật hiệu ứng, 10bước/12prompt/editmap kiểm tra; LICENCE lịch sử Astra còn scope ảnh/font cũ, owner cần rà soát trước phát hành thương mại. Không tự sửa điều khoản.
Q11 PASS: ZIP cuối829005byte SHA256 e9b882f782d3c346f423fffad7daa83b8c1cc03b13f7e5d84f6ff59c0cf38383.
Q12 PASS (local): đồng bộ local source/demo/preview/video/ZIP/catalog2.0.3; production/paid-download chưa thử, không deploy.
Q13/D01–D08: kế thừa giao diện2.0.0, chỉ thay trường hạt trang trí; screenshot mới đã xem, headline/CTA rõ, bố cục và nội dung giữ nguyên.

Không tuyên bố phát hành đạt nguyên WEB-STATIC-1 hoặc mọi browser. Lệnh: node --check main.js; dong-goi/check-template --version2.0.3 --ngoai-le; check-motion/check-particles/check-cosmic-idle; render-preview.mjs. Preview converter ffmpeg lần đầu bị lỗi mở WebP, đã dùng Pillow từ screenshot source; video ghi tạm rồi copy file cuối.

Kết quả cuối: generic checker exit0, failures=[], sourceMatchesExtracted=true; preview/video đã render lại sau sửa z-index và copy. Source/demo CSS/JS khớp byte. git diff --check PASS. Không có thay đổi mới ngoài phạm vi kể trên; các thay đổi đã có từ lượt thay Astra được giữ nguyên.

## Deploy theo ủy quyền chủ sản phẩm

05/10/2026: user yêu cầu deploy. Vercel production dpl_HJMnz9S4SHAQY7MdPMfhgLtTqUQN READY, alias https://forgezone.store. npm run typecheck PASS, remote Next build PASS. Không đổi env, DB, domain hoặc cấu hình. deployment-checks.json: 10 tài nguyên HTML/CSS/JS/ảnh/preview/video trả200 và SHA256 khớp local; home cóMellowCoffee, khôngAstraInterior. Edge154.0.4258.53/Chromium153.0.8010.12/Firefox155.0: hover, canvas, wrap2chiều, midframeopacity, mobile375px khôngoverflow, console0. Anonymous download t7 trả401 đúng kiểm quyền; tải với tài khoản mua chưa thử. Ảnh deployed-edge/chromium/firefox.png, screenshotEdge đã nhìn. Deploy không giải quyết mục licence lịch sử Q10 hoặc browser chưa thử Q08. Các dòng “chưa deploy” ở tài liệu/bằng chứng local trước là trạng thái trước lầnủyquyền này.
