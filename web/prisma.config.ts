// Prisma 7 chuyển URL kết nối ra khỏi schema.prisma sang đây.
// Chỉ các lệnh CLI cần database (migrate, db push, studio) mới dùng tới URL;
// lúc chạy thật PrismaClient kết nối qua driver adapter trong src/lib/db.ts.
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// `prisma generate` chạy trong postinstall và không cần kết nối database, nên
// thiếu DATABASE_URL vẫn phải chạy được — nếu không thì `npm install` trên máy
// build (Vercel) sẽ hỏng. Chỉ khai báo datasource khi thật sự có URL.
const url = process.env.DATABASE_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  ...(url ? { datasource: { url } } : {}),
});
