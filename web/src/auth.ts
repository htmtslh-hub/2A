/* Cấu hình Auth.js: đăng nhập bằng email/mật khẩu và bằng Google. */
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import type { Provider } from 'next-auth/providers';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/db';

export const credentialsSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự'),
});

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Mật khẩu', type: 'password' },
    },
    async authorize(raw) {
      const parsed = credentialsSchema.safeParse(raw);
      if (!parsed.success) return null;

      const { email, password } = parsed.data;
      const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
      // Tài khoản tạo qua Google chưa đặt mật khẩu -> không cho đăng nhập lối này.
      if (!user?.passwordHash || user.suspendedAt) return null;

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return null;

      return { id: user.id, email: user.email, name: user.name, image: user.image };
    },
  }),
];

// Chỉ bật Google khi đã cấu hình khoá, để dự án chạy được ngay cả khi chưa có.
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Credentials bắt buộc dùng JWT chứ không dùng session lưu trong DB.
  session: { strategy: 'jwt' },
  trustHost: true,
  pages: { signIn: '/' },
  providers,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const stored = await prisma.user.findUnique({ where: { email: user.email.toLowerCase() }, select: { suspendedAt: true } });
      return !stored?.suspendedAt;
    },
    async jwt({ token, user }) {
      if (user?.id) token.uid = user.id;
      if (token.uid) {
        const stored = await prisma.user.findUnique({ where: { id: token.uid as string }, select: { suspendedAt: true, sessionVersion: true } });
        // Returning null invalidates the old JWT instead of leaving the browser
        // with an apparently authenticated but unusable session.
        if (!stored || stored.suspendedAt) return null;
        if (user) token.sessionVersion = stored.sessionVersion;
        // A lock increments the generation. Unlocking must not revive JWTs
        // from before the lock; only a fresh successful login gets the new one.
        if ((token.sessionVersion ?? 0) !== stored.sessionVersion) return null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.uid && session.user) {
        (session.user as { id?: string }).id = token.uid as string;
      }
      return session;
    },
  },
});
