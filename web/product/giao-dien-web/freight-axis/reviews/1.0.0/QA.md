# Freight Axis 1.0.0 — QA 18/10/2026

Windows; Chromium 153.0.8010.12 và Firefox 155.0 headless qua HTTP4391. Bằng chứng checks.json và 14 ảnh. Đã nhìn ảnh Chromium 1280/375/820. Chưa push/deploy. HTML SHA-256: `366cc8f9074d7128d90657aad240a5e85b12c513c0283e8581a1508135c60213`.

| Mục | Kết quả |
|---|---|
| Q01 | PASS theo brief: một HTML, CSS inline, không JS/framework/font mạng/local media |
| Q02 | PASS: 1280×800,1440×900,820×1180,768×1024,375×812,320×740,844×390; scrollWidth/Height bằng viewport trên hai engine |
| Q03/Q04 | N/A: không control tương tác theo brief |
| Q05 | PASS phần brief: một h1, main, hai section/h2, SVG decorative và video aria-label |
| Q06 | NOT TESTED: chưa đo tương phản mọi frame video |
| Q07 | PASS một phần: reduced motion không animation; không phụ thuộc JS. Chưa offline/zoom200%/file:// |
| Q08 | PASS phạm vi hai engine trên; chưa Edge/Cốc Cốc/Safari/thiết bị thật |
| Q09 | PASS: không pageerror, video readyState4 và currentTime tăng trên cả hai engine; font check true |
| Q10 | NOT TESTED thương mại: quyền video/font và tài liệu bán hàng chưa nghiệm thu |
| Q11 | N/A: đầu ra một HTML, không ZIP theo brief |
| Q12 | N/A: không tích hợp cửa hàng hoặc preview catalog |
| Q13 | PASS phần đo/ảnh; không có ảnh reference/font gốc để pixel compare tuyệt đối |

D01 PASS copy logistics; D02 PASS trục rail và feature mirrored; D03 PASS hero-only; D04 PASS tokens/metrics theo brief, font phụ thuộc máy; D05 PASS bố cục cơ bản, chưa zoom; D06 PASS copy và typo giữ nguyên; D07 PASS không thêm claims; D08 PASS nội dung nhất quán.

Mọi feature giữ text-align right/left. Mọi CSS animation iterations=1, playState=finished sau2s. Authored final transform:none; computed style trả identity matrix trên hai engine (tương đương không biến đổi). Chỉ video có loop. Không camera transform trên video. Không download video. Chưa đo frame giữa entrance hoặc hiệu năng trên thiết bị thật.

Chỉ tạo freight-axis/, không sửa mẫu khác/cấu hình chung. Trạng thái mẫu local đã kiểm cơ bản; chưa đạt nguyên chuẩn phát hành thương mại do các mục NOT TESTED và ngoại lệ brief.
