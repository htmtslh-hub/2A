# SpaceEdu 1.0.0 — QA 18/10/2026

Trạng thái: bản hero theo prompt đã dựng và kiểm tra chức năng; CHỜ KIỂM TRA phát hành thương mại. Quy chuẩn tham chiếu 1.2.1, ngoại lệ nêu ở BRIEF.md. Không tích hợp catalog/deploy.

Bằng chứng: checks.json, additional.json, ảnh chromium-*.png, firefox-*.png, no-js.png. Windows; Chromium 153.0.8010.12 và Firefox 155.0, headless Playwright qua HTTP; no-JS qua file://. Đã nhìn ảnh desktop 1440 và mobile 375. Không gọi đây là thử thiết bị thật.

| Mục | Trạng thái | Bằng chứng / giới hạn |
|---|---|---|
| Q01 | PASS theo brief | ZIP một HTML; CSS và JS inline, không framework |
| Q02 | PASS | 1440×900, 820×1180, 375×812, 320×740, 1353×1163, 2560×1440, 844×390: scrollWidth=viewport trên cả hai engine |
| Q03 | PASS phần có chức năng | Hai nút vòng VENUS/MARS/EARTH, menu mở/đóng Escape. CTA và nút cuộn là demo theo markup prompt |
| Q04 | NOT TESTED đầy đủ | Escape được thử; chưa rà toàn bộ Tab/Shift+Tab và tương phản viền |
| Q05 | PASS phần brief | 1 h1; button semantic, nhãn dynamic, ảnh alt rỗng; không bổ sung footer/skip link ngoài markup brief |
| Q06 | NOT TESTED | Chưa đo tương phản từng frame video |
| Q07 | PASS một phần | Reduced motion: không class animation, video display:none trên 2 engine; no-JS hiển thị EARTH qua file://. Chưa thử offline lạnh và zoom 200% |
| Q08 | PASS phạm vi đã thử | Hai engine nêu trên. Chưa Edge/Cốc Cốc/Safari/điện thoại thật |
| Q09 | PASS một phần | Không pageerror ở 14 lượt viewport. 3 video readyState=4, clip active phát, clip khác pause. Lượt đầu ảnh chưa tải hết sau 3s; lượt sau tải được. Không khẳng định toàn bộ network không lỗi |
| Q10 | NOT TESTED thương mại | Có README, CUSTOMISE cùng 10 bước/12 prompt. Chưa xác minh licence tài sản/font; chưa cấp LICENCE thương mại |
| Q11 | PASS | ZIP đọc lại so khớp byte nguồn, 1 entry; ngoại lệ một HTML theo prompt |
| Q12 | N/A | Không tích hợp cửa hàng; chưa tạo preview video catalog |
| Q13 | PASS một phần | Hướng cinematic space với serif lớn, hai hành tinh cắt mép; chưa nghiệm thu thương mại |

## D01–D08
D01 PASS theo brief (PLANET, EARTH, mô tả học tập); D02 PASS (video full viewport, serif, hai slot hành tinh); D03 PASS (một hero); D04 PASS theo ngoại lệ 3 font và đơn vị --u; D05 PASS bốn viewport chính quan sát bằng ảnh và đo overflow, chưa zoom; D06 PASS nội dung tiếng Anh theo brief; D07 PASS không thêm chứng thực/chứng nhận; D08 PASS tên hành tinh đồng bộ qua từng vòng.

## Tương tác và thời gian
- Hai slot là button; img.src không đổi qua 15 lượt click nhanh (additional.json).
- Tổng click handler đo 0–2.4ms; 2 lượt 2.4ms, nên KHÔNG tuyên bố mọi lần dưới 2ms. Không có chờ tải ảnh trong show(); class đổi đồng bộ cùng event. Thời gian thực phụ thuộc media/browser/máy.
- Backdrop dùng opacity transition .22s theo prompt; chưa đo frame vật lý.
- Entrance đã hết .anim/.play sau 3s ở mọi lượt kiểm.
- Nav/CTA href="#" và scroll giữ nguyên brief: chưa có đích khoá học/section tiếp theo; cần nối trước sử dụng thật.

## Gói và phạm vi
ZIP: spaceedu.zip — 6843 byte. SHA-256: `1fe3487e7f1f740954d1a071157dee9eb586fb6528b6fac98ac4f3b093da50bf`.
Chỉ tạo file trong spaceedu/. Không thay cấu hình chung, DB, catalog hay sản phẩm khác. Không dùng dong-goi.mjs vì script bắt buộc sáu file trong khi brief mới yêu cầu duy nhất một HTML; dùng zipfile với đường dẫn / và đọc lại so khớp bytes. Không chạy check-template.mjs vốn dành cho WEB-STATIC-1 sáu file; kiểm Playwright riêng lưu bên cạnh.

Nguồn ảnh/video đúng URL người dùng cung cấp. Chưa xác minh quyền phân phối; không đưa file media vào ZIP. Gói cần mạng để tải ảnh/video/font. Đây không phải gói offline hoàn toàn.


## Sửa lỗi không thấy chuyển động — 18/10/2026
Bỏ gate reduced-motion trong CSS/JS theo yêu cầu mới nhất; bổ sung phục hồi autoplay và nút phát khi bị chặn. Nguyên nhân trong tab người dùng CHƯA xác minh: công cụ từ chối đọc file:// theo chính sách URL. Không thử đường vòng để đọc tab đó. Bằng chứng kiểm bản cũ phía trên không đại diện phát video bản sửa.
Kiểm mới: syntax của cả hai script; mô phỏng play() bị NotAllowedError hiện nút, phát thành công ẩn nút, muted trước play; xem motion-fix-checks.json. Playback thực của bản sửa: NOT TESTED.
ZIP hiện tại: 7129 byte; SHA-256 429b591be6aad205a2692799f35dfc28c076256813a3f23c85203b4392c14843. ZIP đọc lại khớp byte nguồn.
