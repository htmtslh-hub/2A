# Japan Trails 1.0.0 — Xác minh giấy phép font (bổ sung 03/10/2026)

Bổ sung cho mục "Barlow Condensed license audit pending" trong `QA.md`. Không đổi ZIP, mã nguồn hay `LICENCE.txt`.

| Font | Cách tải trong sản phẩm | Nguồn chính thức đã đọc | Kết quả |
|---|---|---|---|
| Barlow Condensed | Google Fonts (`index.html`) | https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/METADATA.pb (`license: "OFL"`, designer Jeremy Tribby) và https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/OFL.txt ("Copyright 2017 The Barlow Project Authors (https://github.com/jpt/barlow) … SIL Open Font License, Version 1.1") | **Đã xác minh: SIL OFL 1.1** |
| Manrope | Google Fonts | Đã ghi sẵn trong `LICENCE.txt` mục 5 | Đã xác minh từ trước |

## Việc còn lại — cần chủ sản phẩm quyết

- `LICENCE.txt` mục 5 (FONTS) hiện chỉ nêu Manrope, chưa nêu Barlow Condensed. Quy chuẩn §8 yêu cầu ghi tên và nguồn từng font. Đây là dòng thông tin, không phải điều khoản thương mại, nhưng theo `AGENTS.md` agent không tự sửa `LICENCE.txt`. Đề xuất thêm câu:
  > Barlow Condensed is loaded from Google Fonts and licensed separately under the SIL Open Font License 1.1. Verified official source: https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/OFL.txt
- Nếu duyệt: sửa `source/LICENCE.txt`, nâng bản lên 1.0.1, đóng lại ZIP (`dong-goi.mjs japan-trails --ngoai-le`), chạy `check-template.mjs` và cập nhật QA.
- Ghi chú khác phát hiện khi rà: `source/index.html` chỉ có 7 dòng (mã bị dồn dòng), trái W08 "không minify". Cần định dạng lại trước bản phát hành tiếp theo.
