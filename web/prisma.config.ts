// Prisma 7 chuyển URL kết nối ra khỏi schema.prisma sang đây.
// Chỉ các lệnh CLI cần database (migrate, db push, studio) mới dùng tới URL;
// lúc chạy thật PrismaClient kết nối qua driver adapter trong src/lib/db.ts.
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// `prisma generate` chạy trong postinstall và không cần kết nối database, nên
// thiếu DATABASE_URL vẫn phải chạy được — nếu không thì `npm install` trên máy
// build (Vercel) sẽ hỏng. Chỉ khai báo datasource khi thật sự có URL.
//
// Migration phải đi bằng kết nối trực tiếp: qua pooler (PgBouncer) các lệnh
// DDL và advisory lock của Prisma sẽ hỏng. Neon cấp sẵn DATABASE_URL_UNPOOLED
// cho việc này; lúc chạy thật ứng dụng vẫn dùng bản pooled.
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  ...(url ? { datasource: { url } } : {}),
});
