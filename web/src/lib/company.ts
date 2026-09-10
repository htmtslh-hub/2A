/* ╔══════════════════════════════════════════════════════════════════════╗
   ║  THÔNG TIN DOANH NGHIỆP — SỬA Ở ĐÂY, MỌI TRANG TỰ CẬP NHẬT THEO      ║
   ╚══════════════════════════════════════════════════════════════════════╝

   Toàn bộ trang pháp lý, trang liên hệ và footer đều đọc từ file này.
   Đổi một lần ở đây là xong, không phải đi sửa từng trang.

   Những chỗ còn để trống hoặc ghi TẠM là chỗ Paddle sẽ soi khi duyệt
   website — cần điền đúng trước khi nộp hồ sơ. */

export const COMPANY = {
  /** Tên thương hiệu, dùng ở tiêu đề và nội dung chung. */
  brand: 'Agentic',

  /** TẠM — tên pháp nhân đầy đủ ghi trong Điều khoản.
   *  Là công ty  -> ghi đúng tên trên giấy đăng ký kinh doanh.
   *  Cá nhân kinh doanh -> ghi họ tên đầy đủ theo CCCD.
   *  Paddle bắt buộc phải thấy tên này trong Terms. */
  legalName: 'Đinh Văn Triển',

  /** TẠM — mã số thuế / mã số doanh nghiệp. Để trống nếu là cá nhân. */
  taxId: '',

  /** TẠM — địa chỉ đăng ký kinh doanh. */
  address: 'Phi Liet - Van Giang - Hung Yen',

  country: 'Việt Nam',

  /** Email liên hệ chính thức, hiện dùng chung cho hỗ trợ và pháp lý. */
  email: 'htmt.slh@gmail.com',

  /** TẠM — số điện thoại hỗ trợ. Để trống thì các trang tự ẩn dòng này. */
  phone: '',

  /** Tên miền chính thức. Đổi khi anh mua tên miền riêng. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://web-htmtslh-hubs-projects.vercel.app',

  /** Số ngày được hoàn tiền, phải khớp với FAQ trên trang chủ. */
  refundDays: 14,

  /** Ngày cập nhật gần nhất của các văn bản pháp lý. */
  legalUpdated: '2026-09-10',
} as const;

/** Có đủ thông tin pháp nhân chưa — dùng để cảnh báo khi còn placeholder. */
export const companyInfoComplete = () =>
  !COMPANY.legalName.includes('CHƯA ĐIỀN') && !COMPANY.address.includes('CHƯA ĐIỀN');
