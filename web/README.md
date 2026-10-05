# Forge Zone — website bán giao diện web

Dự án Next.js dựng từ bản thiết kế `2A.zip` (Claude Design canvas). Landing page
ba ngôn ngữ (Việt / English / 中文) kèm thư viện giao diện, trang chi tiết từng
mẫu, đăng nhập, thanh toán hai cổng (PayOS cho khách Việt, Paddle cho khách
quốc tế) và form thu email.

---

## Chạy trên máy

```bash
npm install
```

Tạo file `.env` từ mẫu rồi điền giá trị:

```bash
cp .env.example .env
```

Tối thiểu cần `DATABASE_URL` và `AUTH_SECRET` thì server mới khởi động được.
Sinh `AUTH_SECRET`:

```bash
npx auth secret
```

Tạo bảng trong cơ sở dữ liệu:

```bash
npx prisma migrate dev --name init
```

Chạy:

```bash
npm run dev
```

Mở http://localhost:3000

---

## Cấu trúc

```
_src/                        bản thiết kế gốc (chỉ để tham chiếu, không build)
web/
  tools/                     script chuyển thiết kế -> mã nguồn
    convert.mjs              markup .dc.html -> TSX + CSS
    extract-data.mjs         I18N và hằng số -> data.ts
    extract-slots.mjs        ảnh người thiết kế đã đặt -> public/previews
    media.mjs                nén video/ảnh -> public/media
  src/
    generated/               SINH TỰ ĐỘNG — đừng sửa tay
      markup.tsx             toàn bộ giao diện
      design.css             CSS gốc của thiết kế
      hover.css              các trạng thái :hover/:focus
      data.ts                nội dung ba ngôn ngữ + bảng dữ liệu
    components/
      AgenticSite.tsx        state, effect, nối API
      ImageSlot.tsx          ô ảnh preview
    lib/
      view.ts                dựng dữ liệu cho giao diện (port của renderVals)
      sync.ts                hiệu ứng: reveal, parallax, LED, video nền
      catalog.ts             bảng giá, chọn cổng theo thị trường
      fulfil.ts              xử lý chung sau khi đơn được trả tiền
      payments/              adapter từng cổng: payos.ts, paddle.ts
      i18n-extra.ts          chuỗi ngoài bản thiết kế (đăng ký, trang đơn hàng)
      db.ts / mail.ts / previews.ts
    app/
      api/                   register, lead, checkout, download,
                             payos/webhook, paddle/webhook
      don-hang/              trang đơn hàng của khách
      thanh-toan/            trang kết quả thanh toán
  product/
    giao-dien-web/
      <slug>/               thư mục riêng của từng sản phẩm
        source/             mã nguồn giao diện
        <slug>.zip          file giao cho khách
        reviews/, design/   hồ sơ và thiết kế riêng (khi có)
      docs/                 quy chuẩn và hướng dẫn sản phẩm
      tools/                công cụ đóng gói và kiểm tra
      reviews/              hồ sơ kiểm tra chung
      design/               tài sản thiết kế dùng chung
    skill-prompt/            sản phẩm skill và prompt
    agent/                   sản phẩm agent
    newsproduct 1/           nhóm sản phẩm tạm thời
    newsproduct 2/           nhóm sản phẩm tạm thời
```

### Sinh lại mã từ thiết kế

Sửa `_src/Agentic.dc.html` rồi chạy:

```bash
npm run convert
```

Script sẽ dừng và báo lỗi nếu không tìm thấy các nút mua cần nối vào thanh
toán — tránh việc âm thầm mất chức năng khi thiết kế thay đổi.

Nén lại media (cần ffmpeg trong PATH):

```bash
npm run media
```

---

## Những thứ cần chuẩn bị

| Việc | Nơi làm | Biến môi trường |
|---|---|---|
| Cơ sở dữ liệu | https://neon.tech | `DATABASE_URL` |
| Khoá phiên đăng nhập | `npx auth secret` | `AUTH_SECRET` |
| Đăng nhập Google (tuỳ chọn) | Google Cloud Console | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` |
| Thanh toán trong nước | https://payos.vn | `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY` |
| Thanh toán quốc tế | https://vendors.paddle.com | `PADDLE_API_KEY`, `PADDLE_WEBHOOK_SECRET` |
| Gửi email | https://resend.com | `RESEND_API_KEY`, `MAIL_FROM` |
| Địa chỉ site | — | `NEXT_PUBLIC_SITE_URL` |

Thiếu cổng thanh toán thì nút mua báo lỗi rõ ràng; thiếu Resend thì email chỉ
ghi ra log. Phần còn lại của trang vẫn chạy bình thường.

---

## Bảng giá và cổng thanh toán

Hai thị trường, hai cổng — chọn tự động theo ngôn ngữ khách đang xem:

| Khách | Ngôn ngữ | Cổng | Tiền | Một mẫu | Trọn bộ |
|---|---|---|---|---|---|
| Việt Nam | `vi` | PayOS (VietQR) | VNĐ | 1.900.000₫ | 9.900.000₫ |
| Quốc tế | `en`, `zh` | Paddle (thẻ quốc tế) | USD | $79 | $399 |

Vì sao hai cổng: PayOS chạy trên mô hình A2A — tiền chuyển thẳng giữa hai tài
khoản ngân hàng Việt Nam. Phí rất thấp nhưng khách nước ngoài không quét được
mã VietQR và không trả được ngoại tệ. Paddle bù vào chỗ đó: họ đứng tên bán
(merchant of record), tự tính và nộp thuế VAT/GST ở từng nước, rồi chuyển tiền
về qua wire transfer hoặc Payoneer — nên không cần lập pháp nhân nước ngoài.

Sửa giá trong `src/lib/catalog.ts`. Số tiền luôn tính bằng **đơn vị nhỏ nhất**
của loại tiền: VNĐ là đồng (`1_900_000`), USD là cent (`7_900` = $79). Muốn đặt
giá riêng cho từng mẫu thì khai trong `TEMPLATE_PRICE_OVERRIDE`.

Thiếu khoá của cổng nào thì chỉ khách thuộc thị trường đó gặp lỗi, phần còn lại
của trang vẫn chạy. Muốn ép một cổng cụ thể thì truyền `provider` vào
`/api/checkout`.

Thêm cổng thứ ba: viết một adapter trong `src/lib/payments/` theo interface
`PaymentProviderAdapter`, rồi khai vào bảng trong `src/lib/payments/index.ts`.
Phần ghi nhận thanh toán dùng chung ở `src/lib/fulfil.ts`, không phải viết lại.

## Giao file cho khách

Đóng gói từ `product/giao-dien-web/<slug>/source/` bằng
`node product/giao-dien-web/tools/dong-goi.mjs <slug>`. File tạo ra ở
`product/giao-dien-web/<slug>/<slug>.zip`; mẫu miễn phí dùng
`free-sample.zip`. Thư mục này nằm ngoài `public/` nên không ai tải trực tiếp
được; `/api/download` kiểm tra quyền sở hữu trước khi trả file có phí.

---

## Ảnh preview giao diện

Hiện mới có ảnh cho mẫu `t1` (lấy từ bản thiết kế). Thêm ảnh cho các mẫu khác:
bỏ file vào `public/previews/` rồi khai báo trong `PREVIEWS_EXTRA` ở
`src/lib/previews.ts` — phần này không bị `npm run convert` ghi đè.

---

## Deploy lên Vercel

```bash
npx vercel deploy          # bản xem trước
npx vercel deploy --prod   # bản chính thức
```

Khai báo biến môi trường trong **Project → Settings → Environment Variables**
trên Vercel (đúng các khoá trong `.env.example`). File `.env` cục bộ đã được
`.vercelignore` chặn nên không đi kèm mã nguồn.

Vài điểm đã xử lý sẵn, ghi lại để sau này khỏi mất công tìm:

- `postinstall: prisma generate` — Vercel chỉ chạy `npm install` rồi build, nếu
  không sinh client thì TypeScript báo `@prisma/client` thiếu `PrismaClient`.
- `prisma.config.ts` chỉ khai báo `datasource` khi có `DATABASE_URL`, vì
  `prisma generate` chạy lúc cài đặt — khi đó chưa chắc đã có biến này.
- `src/lib/db.ts` khởi tạo client trễ, nên thiếu `DATABASE_URL` chỉ làm hỏng
  route nào thật sự truy vấn, không sập cả trang.

**Link xem trước không mở công khai được**: Vercel mặc định bật Deployment
Protection, người ngoài mở sẽ bị chuyển sang trang đăng nhập. Muốn gửi link cho
người khác thì tắt ở **Settings → Deployment Protection**, hoặc deploy bản
chính thức bằng `--prod`.

---

## Sau khi deploy

1. Đặt `NEXT_PUBLIC_SITE_URL=https://forgezone.store` trong biến môi trường
   Vercel (cả Production lẫn Preview).
2. Khai báo webhook cho cả hai cổng. Webhook là nguồn xác nhận thanh toán duy
   nhất — trang "thanh toán thành công" chỉ là giao diện, không tự mở khoá file.
   - PayOS → `https://forgezone.store/api/payos/webhook`
   - Paddle → `https://forgezone.store/api/paddle/webhook` (bật sự kiện
     `transaction.completed`)
3. Thêm redirect URI của Google:
   `https://<tên-miền>/api/auth/callback/google`

---

## Lệnh

| Lệnh | Việc |
|---|---|
| `npm run dev` | chạy máy |
| `npm run build` | build production |
| `npm run convert` | sinh lại mã từ thiết kế |
| `npm run media` | nén lại video/ảnh |
| `npm run typecheck` | kiểm tra kiểu |
| `npm run lint` | kiểm tra lint |
