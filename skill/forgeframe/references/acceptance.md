# Cửa nghiệm thu ForgeFrame

Đây là bước 7, áp chót. Phiên bản rubric 1.0. Không đóng ZIP giao, push, deploy hoặc công bố “đã hoàn thành” khi cửa chưa PASS. Có thể chụp/test candidate và chuẩn bị metadata trước cửa.

## Độ giống trên 95%

Không có một con số pixel có thể tự chứng minh “giống trên 95%” theo mọi cách cảm nhận. ForgeFrame dùng **điểm tương đồng theo rubric**, công khai cách chấm và bằng chứng; không giả gọi điểm này là pixel accuracy hay xác suất. Nếu chủ sản phẩm có phương pháp đo khác, áp dụng phương pháp đó trước phần phụ thuộc, không âm thầm đổi thang.

### Chuẩn hóa reference

1. Ghi tên/hash ảnh hoặc timestamp video, kích thước thật, viewport render, DPR/zoom và crop.
2. Chỉ bỏ UI ứng dụng/browser không thuộc web. Không bỏ hero, phần khó tái tạo, ảnh sai hoặc interaction để tăng điểm.
3. Nếu ảnh bị thu nhỏ từ screenshot gốc, ghi phép scale đồng nhất được suy ra, khóa nó trước khi chấm candidate. Không kéo méo, dịch chuyển riêng từng vùng, blur hoặc resize candidate để che lệch.
4. Screenshot candidate phải từ code được chạy thật tại cùng viewport/state/scroll. Với video, ghép đúng thời điểm/progress; lưu nhiều frame trung gian, không chỉ đầu/cuối.
5. Chia vùng: nav, hero, sản phẩm/ảnh chính, từng section, footer, các trạng thái quan trọng. Gán trọng số trước khi chấm, tổng 100%; không thay trọng số sau khi biết điểm.

### Rubric trong mỗi vùng

| Trục | Trọng số | Bằng chứng cần đọc/đo |
|---|---:|---|
| Bố cục và hình học | 25% | Vị trí/size phần tử, grid, alignment, hierarchy, crop |
| Typography | 20% | Họ font/weight/size/line-height, wrap, letter spacing, text hierarchy |
| Màu và bề mặt | 15% | Palette, nền, border, radius, shadow, gradient |
| Hình ảnh và icon | 25% | Hình dáng/chủ thể/pose/góc nhìn, kích thước, chi tiết icon và ảnh |
| Khoảng cách và mật độ | 15% | Padding/gap, nhịp section, whitespace và mức content |

Mỗi trục 0–100, có nhận xét và sai lệch cụ thể. 100 chỉ khi không phát hiện khác biệt trong vùng đó. 96–99 khi chỉ còn sai lệch nhỏ được chỉ rõ. 90–95 khi có khác biệt nhìn thấy rõ về type/spacing/image/layout: chưa đạt mốc yêu cầu. Các mức thấp hơn dùng khi sai cấu trúc/thiếu thành phần. Không cho 99 đồng loạt chỉ để qua cửa.

`regionScore = Σ(axisScore × axisWeight)`.
`viewScore = Σ(regionScore × regionWeight)`.

- **Mỗi view/state reference quan trọng** phải có viewScore **>95.00**, không chỉ trung bình toàn bộ các view.
- Mỗi vùng quan trọng nav/hero/ảnh sản phẩm hoặc trạng thái detail phải **>95.00**. Không lấy nền trắng hoặc footer để bù ảnh sai/hero lệch.
- Mỗi trục trong vùng quan trọng ít nhất 90; một lỗi lớn không được che bằng tổng điểm.
- Lệch chủ thể/pose quan trọng, thiếu section/control, cắt nội dung, dùng hình screenshot làm toàn bộ website, hoặc CTA chính giả là blocker kể cả điểm tổng cao.
- Những thay đổi chủ sản phẩm yêu cầu (tên/ảnh/màu khác) được ghi rõ trước khi chấm; vẫn kiểm composition/hình học tương ứng. Không tự đổi ảnh/nội dung rồi gọi chúng là ngoại lệ đã duyệt.
- Nếu reference không cung cấp mobile, kiểm responsive mobile theo usability; ghi rõ N/A cho “so mobile với reference”, không bịa screenshot mobile gốc.

scripts/compare_visual.py xuất overlay và heatmap cùng MAE/pixel diagnostic. Hai ảnh phải cùng size sau crop/scale đã ghi. Các số này hỗ trợ phát hiện lệch, **không tự điền rubric, không tự chứng nhận PASS**. Có thể dùng SSIM/perceptual metrics nếu có công cụ, ghi đúng tên/version/cấu hình và giới hạn; không tráo metric thành “95% giống” mà không giải thích.

## Animation, scroll và video

| Mục | Điều kiện PASS |
|---|---|
| Animation | Có motion thật đúng reference hoặc suy ra phù hợp ảnh tĩnh; đo frame giữa; đúng trạng thái cuối; fallback/cleanup hoạt động; không đóng băng hoặc loop bất tận |
| Scroll | Có ít nhất một hiệu ứng gắn với cuộn thật: reveal, progress transform, sticky scene hoặc tương đương; test đầu/giữa/cuối, cuộn ngược, resize và mobile; anchor smooth scroll đơn thuần không thay cho hiệu ứng scroll |
| Video coverage | Mọi scene/control/state/section thấy trong video có mapping sang source và bằng chứng hoạt động; frame trước/giữa/sau chuyển cảnh; timeline đúng hướng và model; không chỉ dựng frame đầu |
| Responsive | Bốn khổ và breakpoint không tràn/cắt/đè chữ, bàn phím/menu/focus, ảnh đầy đủ và tap target phù hợp |
| Fallback/technical | Không JS vẫn có nội dung/CTA/nav; offline nếu profile static; thiếu ảnh vẫn thao tác; browser/console/network, contrast, zoom và tests bắt buộc qua |
| Docs/assets | Nội dung demo đúng nghĩa, không claim giả; file/path/count/rights phù hợp; bản kiểm đúng candidate; không bí mật hoặc nguồn tải không rõ quyền |

Video input thì coverage bắt buộc PASS; image-only thì coverage=N/A, lý do “không có video”. Tương tác không được suy ra thành backend đã có: form/cart/contact cần đúng hành vi trong scope và mô tả thực tế. Khi video không cho thấy hậu quả của nút, ghi giả định và triển khai hành vi thật nhỏ nhất phù hợp.

## Báo cáo máy đọc được

acceptance.json phải chứa dữ liệu thật, ít nhất:

```json
{
  "workflow": "ForgeFrame",
  "rubricVersion": "1.0",
  "productVersion": "1.0.0",
  "candidateHash": "computed-source-manifest-hash",
  "references": [],
  "views": [],
  "fidelity": {"method": "weighted visual rubric", "strictMinimum": 95, "comparisonComplete": false, "status": "NOT TESTED"},
  "animation": {"status": "NOT TESTED", "evidence": []},
  "scroll": {"status": "NOT TESTED", "evidence": []},
  "videoCoverage": {"status": "NOT TESTED", "evidence": []},
  "technical": {"status": "NOT TESTED", "evidence": []},
  "blockers": [],
  "gate": "NOT TESTED"
}
```

Đây là schema trạng thái chưa kiểm tra, không phải báo cáo PASS để sao chép. references cần source/hash/crop/size; views cần viewport/state/reference/screenshot, region weights, từng axis score/reason và aggregate. Source manifest phải bỏ file test/báo cáo sinh ra, tính hash các file nguồn/assets đúng bản kiểm; thay nguồn làm mất hiệu lực gate.

ACCEPTANCE.md trình bày điểm từng view, sai lệch còn lại, minh họa side-by-side/overlay, browser/version, testcase/motion frame/progress và toàn bộ status. Chỉ ghi gate=PASS khi mọi điều kiện bắt buộc đạt. Khi không đủ bằng chứng, ghi NOT TESTED; không để AI tự “ước lượng 98%” thiếu ảnh so sánh. Lặp sửa và kiểm lại cho tới PASS hoặc một điều kiện thực sự cần người dùng/đổi môi trường.

Sau gate: kiểm ZIP giải nén khớp candidate, store integration và online là release verification. Nếu lỗi phát sinh hoặc source đổi, quay lại các kiểm tra/cửa bị ảnh hưởng trước bàn giao.
