import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* File giao diện bán cho khách nằm ngoài public/ và chỉ được đọc lúc chạy,
     bằng đường dẫn ghép từ biến. Next dò phụ thuộc bằng cách đọc mã nguồn
     tĩnh nên không thấy chúng, và hàm /api/download sẽ được triển khai mà
     không có file nào — khách trả tiền xong bấm link tải là 404.
     Dòng dưới bắt Next mang theo cả thư mục. */
  outputFileTracingIncludes: {
    '/api/download': ['./private/templates/**'],
  },
};

export default nextConfig;
