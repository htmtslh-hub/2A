import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { adminIdentity, sameOrigin } from '@/lib/admin-access';
import {
  generateLicenseKey,
  getUserLicenseEntitlement,
  LIFETIME_TIMESTAMP,
  listUserActivatedMachines,
  normalizeMachineId,
  type LicensePlanCode,
} from '@/lib/license-key';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Vui lòng đăng nhập để quản lý Mã Kích Hoạt.' }, { status: 401 });
    }

    const [entitlement, machines] = await Promise.all([
      getUserLicenseEntitlement(userId),
      listUserActivatedMachines(userId),
    ]);

    return NextResponse.json({
      ok: true,
      entitlement: {
        eligible: entitlement.eligible,
        plan: entitlement.plan,
        expiresAtTs: entitlement.expiresAtTs,
        maxMachines: entitlement.maxMachines,
        email: entitlement.email,
        reason: entitlement.reason,
      },
      machines,
    });
  } catch (err) {
    console.error('[api/license GET]', err);
    return NextResponse.json({ error: 'Không thể tải thông tin bản quyền.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!sameOrigin(req)) {
      return NextResponse.json({ error: 'Nguồn yêu cầu không hợp lệ.' }, { status: 403 });
    }

    const session = await auth();
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Vui lòng đăng nhập tài khoản trước khi lấy Mã Kích Hoạt.' }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as {
      action?: string;
      machineId?: string;
      plan?: string;
      days?: number;
      email?: string;
    };

    const normHwid = normalizeMachineId(body.machineId || '');
    if (!normHwid) {
      return NextResponse.json(
        {
          error:
            'Mã Máy không đúng định dạng! Vui lòng nhập đúng Mã Máy hiển thị trên phần mềm (Ví dụ: FS-A1B2-C3D4-E5F6-0789).',
        },
        { status: 400 }
      );
    }

    // Chế độ Quản trị viên cấp Mã Kích Hoạt tùy chọn thời hạn trong trang /admin
    if (body.action === 'admin-generate') {
      const admin = await adminIdentity();
      if (!admin) {
        return NextResponse.json({ error: 'Chỉ quản trị viên mới có quyền cấp key tùy chỉnh.' }, { status: 403 });
      }
      const reqPlan = (body.plan || 'ULTRA').toUpperCase() as LicensePlanCode;
      const days = Math.max(1, Math.min(36500, Number(body.days) || 365));
      const nowTs = Math.floor(Date.now() / 1000);
      const expTs = reqPlan === 'LIFETIME' ? LIFETIME_TIMESTAMP : nowTs + days * 86400;
      const targetEmail = (body.email || admin.email || 'vip@forgezone.store').trim().toLowerCase();

      const { licenseKey, licenseId } = generateLicenseKey({
        machineId: normHwid,
        plan: reqPlan,
        expiresAtTs: expTs,
        email: targetEmail,
        issuedAtTs: nowTs,
      });

      await prisma.adminAuditLog.create({
        data: {
          actorId: admin.id,
          action: 'license-activate',
          targetId: normHwid,
          detail: JSON.stringify({
            licenseId,
            licenseKey,
            plan: reqPlan,
            email: targetEmail,
            issuedAt: nowTs,
            expiresAt: expTs,
            issuedByAdmin: true,
          }),
        },
      });

      return NextResponse.json({
        ok: true,
        machineId: normHwid,
        licenseId,
        licenseKey,
        plan: reqPlan,
        expiresAt: expTs,
        email: targetEmail,
      });
    }

    // Chế độ Khách hàng tự lấy Mã Kích Hoạt theo gói đã mua trên Web
    const [entitlement, machines] = await Promise.all([
      getUserLicenseEntitlement(userId),
      listUserActivatedMachines(userId),
    ]);

    if (!entitlement.eligible || !entitlement.plan) {
      return NextResponse.json(
        {
          error:
            entitlement.reason ||
            'Tài khoản của bạn chưa có gói bản quyền đang hoạt động. Vui lòng mua gói Premium / Ultra trên Web trước khi lấy Mã Kích Hoạt.',
        },
        { status: 403 }
      );
    }

    const existingMachine = machines.find((m) => m.machineId === normHwid);
    if (!existingMachine && machines.length >= entitlement.maxMachines) {
      return NextResponse.json(
        {
          error: `Gói của bạn cho phép kích hoạt tối đa ${entitlement.maxMachines} máy tính. Bạn đã kích hoạt đủ ${machines.length}/${entitlement.maxMachines} máy — vui lòng bấm "Gỡ máy" ở thiết bị cũ bên dưới trước khi thêm máy mới.`,
        },
        { status: 409 }
      );
    }

    const nowTs = Math.floor(Date.now() / 1000);
    const { licenseKey, licenseId } = generateLicenseKey({
      machineId: normHwid,
      plan: entitlement.plan,
      expiresAtTs: entitlement.expiresAtTs,
      email: entitlement.email,
      issuedAtTs: nowTs,
    });

    await prisma.adminAuditLog.create({
      data: {
        actorId: userId,
        action: 'license-activate',
        targetId: normHwid,
        detail: JSON.stringify({
          licenseId,
          licenseKey,
          plan: entitlement.plan,
          email: entitlement.email,
          issuedAt: nowTs,
          expiresAt: entitlement.expiresAtTs,
        }),
      },
    });

    const updatedMachines = await listUserActivatedMachines(userId);

    return NextResponse.json({
      ok: true,
      machineId: normHwid,
      licenseId,
      licenseKey,
      plan: entitlement.plan,
      expiresAt: entitlement.expiresAtTs,
      email: entitlement.email,
      machines: updatedMachines,
    });
  } catch (err) {
    console.error('[api/license POST]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Không thể tạo Mã Kích Hoạt.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    if (!sameOrigin(req)) {
      return NextResponse.json({ error: 'Nguồn yêu cầu không hợp lệ.' }, { status: 403 });
    }

    const session = await auth();
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Vui lòng đăng nhập.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const normHwid = normalizeMachineId(searchParams.get('machineId') || '');
    if (!normHwid) {
      return NextResponse.json({ error: 'Mã Máy không hợp lệ.' }, { status: 400 });
    }

    await prisma.adminAuditLog.create({
      data: {
        actorId: userId,
        action: 'license-unbind',
        targetId: normHwid,
        detail: JSON.stringify({ unboundAt: Math.floor(Date.now() / 1000) }),
      },
    });

    const machines = await listUserActivatedMachines(userId);
    return NextResponse.json({ ok: true, machineId: normHwid, machines });
  } catch (err) {
    console.error('[api/license DELETE]', err);
    return NextResponse.json({ error: 'Không thể gỡ thiết bị.' }, { status: 500 });
  }
}
