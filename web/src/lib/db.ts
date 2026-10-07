/* PrismaClient dùng chung.

   Prisma 7 kết nối qua driver adapter. Dùng adapter `pg` (node-postgres) vì nó
   chạy được với mọi Postgres chuẩn — Neon ở production, và Postgres cài máy
   hoặc Docker khi phát triển. Với Neon, nên dùng chuỗi kết nối có `-pooler`.

   Client được khởi tạo trễ: thiếu DATABASE_URL thì chỉ route nào thật sự truy
   vấn mới báo lỗi, còn build và các trang tĩnh vẫn chạy bình thường. */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function realClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'Thiếu biến môi trường DATABASE_URL. Sao chép .env.example thành .env rồi điền chuỗi kết nối Postgres.'
    );
  }

  const client = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  // The lazy Proxy calls realClient for every property, so production must
  // also reuse its instance. A dashboard reads several models per request;
  // allocating a fresh pg pool for each one exhausts database connections.
  globalForPrisma.prisma = client;
  return client;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = realClient();
    const value = Reflect.get(client, prop);
    // Giữ đúng `this` cho các method như $transaction, $connect…
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

/** Có cấu hình cơ sở dữ liệu hay chưa — dùng để báo lỗi cho dễ hiểu. */
export const dbConfigured = () => Boolean(process.env.DATABASE_URL);
