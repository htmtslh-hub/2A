import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { REAL_TEMPLATES } from '@/lib/real-templates';

const noStore = { 'Cache-Control': 'no-store' };

async function currentUserId() {
  const session = await auth();
  return (session?.user as { id?: string } | undefined)?.id;
}

export async function GET() {
  const userId = await currentUserId();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: noStore });
  const items = await prisma.savedTemplate.findMany({
    where: { userId },
    select: { templateId: true },
    orderBy: { createdAt: 'desc' },
  });
  return Response.json({ ids: items.map((item) => item.templateId) }, { headers: noStore });
}

async function parseTemplateId(req: Request) {
  const body = await req.json().catch(() => null);
  const id = body?.templateId;
  return typeof id === 'string' && Object.hasOwn(REAL_TEMPLATES, id) ? id : null;
}

export async function PUT(req: Request) {
  const userId = await currentUserId();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: noStore });
  const templateId = await parseTemplateId(req);
  if (!templateId) return Response.json({ error: 'Invalid template' }, { status: 400, headers: noStore });
  await prisma.savedTemplate.upsert({
    where: { userId_templateId: { userId, templateId } },
    create: { userId, templateId },
    update: {},
  });
  const count = await prisma.savedTemplate.count({ where: { templateId } });
  return Response.json({ saved: true, count }, { headers: noStore });
}

export async function DELETE(req: Request) {
  const userId = await currentUserId();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: noStore });
  const templateId = await parseTemplateId(req);
  if (!templateId) return Response.json({ error: 'Invalid template' }, { status: 400, headers: noStore });
  await prisma.savedTemplate.deleteMany({ where: { userId, templateId } });
  const count = await prisma.savedTemplate.count({ where: { templateId } });
  return Response.json({ saved: false, count }, { headers: noStore });
}
