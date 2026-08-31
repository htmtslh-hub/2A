// Prisma 7 chuyển URL kết nối ra khỏi schema.prisma sang đây.
// Chỉ các lệnh CLI (migrate, db push, studio) đọc file này; lúc chạy thật
// PrismaClient dùng driver adapter trong src/lib/db.ts.
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
