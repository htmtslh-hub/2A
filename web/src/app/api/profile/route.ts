import { auth } from '@/auth';
import { prisma } from '@/lib/db';

const noStore = { 'Cache-Control': 'private, no-store' };

async function currentUserId() {
  const session = await auth();
  return (session?.user as { id?: string } | undefined)?.id;
}

export async function GET() {
  const userId = await currentUserId();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: noStore });
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true, email: true, image: true } });
  if (!user) return Response.json({ error: 'Not found' }, { status: 404, headers: noStore });
  return Response.json({ name: user.name || user.email.split('@')[0], image: user.image }, { headers: noStore });
}

export async function PATCH(req: Request) {
  const userId = await currentUserId();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: noStore });
  const body = await req.json().catch(() => null);
  if (!body || typeof body.name !== 'string') return Response.json({ error: 'Invalid profile' }, { status: 400, headers: noStore });
  const name = body.name.trim().replace(/\s+/g, ' ');
  if (!name || name.length > 60 || /[\u0000-\u001f\u007f]/.test(name)) return Response.json({ error: 'Name must be 1–60 characters' }, { status: 400, headers: noStore });
  const data: { name: string; image?: string } = { name };
  if (body.image !== undefined) {
    if (typeof body.image !== 'string' || body.image.length > 240_000) return Response.json({ error: 'Invalid image' }, { status: 400, headers: noStore });
    const match = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(body.image);
    if (!match) return Response.json({ error: 'Invalid image' }, { status: 400, headers: noStore });
    const bytes = Buffer.from(match[2], 'base64');
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const webp = bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
    if (bytes.length > 170_000 || !((match[1] === 'jpeg' && jpeg) || (match[1] === 'png' && png) || (match[1] === 'webp' && webp))) {
      return Response.json({ error: 'Invalid image' }, { status: 400, headers: noStore });
    }
    data.image = body.image;
  }
  const user = await prisma.user.update({ where: { id: userId }, data, select: { name: true, image: true } });
  return Response.json(user, { headers: noStore });
}
