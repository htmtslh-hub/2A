/* Tích hợp Google Drive theo Phương án A (Hybrid):
   - Mẫu Miễn phí (Free): lưu trong thư mục Google Drive công khai, chuyển hướng (302) tới link tải trực tiếp.
   - Mẫu Premium / Mua lẻ: lưu trong thư mục Google Drive Private:
     + Khi khách bấm tải tại /api/download: kiểm tra quyền tài khoản và stream trực tiếp file từ Google Drive API.
     + Khi khách thanh toán thành công gói Premium/Ultra hoặc mua lẻ: tự động cấp quyền reader trên Google Drive
       (kèm expirationTime khớp đúng thời hạn gói đối với Premium/Ultra).
     + Khi đơn hàng bị hoàn tiền (Refund): tự động thu hồi quyền trên Google Drive. */
import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import driveManifestRaw from './drive-manifest.json';
import { templateFile } from './catalog';

export interface DriveFileEntry {
  fileId: string;
  tier: 'free' | 'premium' | 'individual';
  publicUrl?: string;
  webViewUrl?: string;
  sizeBytes?: number;
  sha256?: string;
  updatedAt?: string;
}

export interface DriveManifest {
  freeFolderId: string;
  premiumFolderId: string;
  updatedAt: string | null;
  files: Record<string, DriveFileEntry>;
}

const manifest = driveManifestRaw as DriveManifest;

let cachedAccessToken: { token: string; expiresAtMs: number } | null = null;

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

/**
 * Lấy OAuth2 Access Token cho Google Drive API v3 từ một trong 3 cơ chế:
 * 1. Biến môi trường GDRIVE_ACCESS_TOKEN hoặc GCLI_ACCESS_TOKEN
 * 2. OAuth2 Refresh Token (GDRIVE_CLIENT_ID + GDRIVE_CLIENT_SECRET + GDRIVE_REFRESH_TOKEN)
 * 3. Google Cloud Service Account JWT (GDRIVE_SERVICE_ACCOUNT_EMAIL + GDRIVE_PRIVATE_KEY)
 */
export async function getDriveAccessToken(): Promise<string | null> {
  const envDirect = process.env.GDRIVE_ACCESS_TOKEN || process.env.GCLI_ACCESS_TOKEN;
  if (envDirect) return envDirect;

  if (cachedAccessToken && cachedAccessToken.expiresAtMs > Date.now() + 30_000) {
    return cachedAccessToken.token;
  }

  // Cơ chế 2: OAuth2 Refresh Token
  const clientId = process.env.GDRIVE_CLIENT_ID;
  const clientSecret = process.env.GDRIVE_CLIENT_SECRET;
  const refreshToken = process.env.GDRIVE_REFRESH_TOKEN;
  if (clientId && clientSecret && refreshToken) {
    try {
      const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      });
      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        const data = (await res.json()) as { access_token?: string; expires_in?: number };
        if (data.access_token) {
          cachedAccessToken = {
            token: data.access_token,
            expiresAtMs: Date.now() + (data.expires_in ?? 3500) * 1000,
          };
          return data.access_token;
        }
      }
    } catch (err) {
      console.error('[gdrive] lỗi đổi refresh_token:', err);
    }
  }

  // Cơ chế 3: Service Account JWT
  const saEmail = process.env.GDRIVE_SERVICE_ACCOUNT_EMAIL;
  const saKeyRaw = process.env.GDRIVE_PRIVATE_KEY;
  if (saEmail && saKeyRaw) {
    try {
      const privateKey = saKeyRaw.replace(/\\n/g, '\n');
      const nowSec = Math.floor(Date.now() / 1000);
      const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
      const claim = base64UrlEncode(
        JSON.stringify({
          iss: saEmail,
          scope: 'https://www.googleapis.com/auth/drive',
          aud: 'https://oauth2.googleapis.com/token',
          iat: nowSec,
          exp: nowSec + 3600,
        })
      );
      const signingInput = `${header}.${claim}`;
      const signer = crypto.createSign('RSA-SHA256');
      signer.update(signingInput);
      const signature = base64UrlEncode(signer.sign(privateKey));
      const assertion = `${signingInput}.${signature}`;

      const body = new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      });
      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        const data = (await res.json()) as { access_token?: string; expires_in?: number };
        if (data.access_token) {
          cachedAccessToken = {
            token: data.access_token,
            expiresAtMs: Date.now() + (data.expires_in ?? 3500) * 1000,
          };
          return data.access_token;
        }
      }
    } catch (err) {
      console.error('[gdrive] lỗi ký JWT service account:', err);
    }
  }

  return null;
}

export function getDriveFileEntry(slug: string): DriveFileEntry | null {
  return manifest.files?.[slug] ?? null;
}

export function getDriveFolders(): { freeFolderId: string; premiumFolderId: string } {
  return {
    freeFolderId: process.env.GDRIVE_FREE_FOLDER_ID || manifest.freeFolderId || '',
    premiumFolderId: process.env.GDRIVE_PREMIUM_FOLDER_ID || manifest.premiumFolderId || '',
  };
}

export function buildPublicDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

/**
 * Quyết định có giao file qua Google Drive hay không:
 * - Bật khi đã có `fileId` trong `drive-manifest.json` VÀ (`GDRIVE_ENABLED === '1'` hoặc file cục bộ không còn trên Vercel).
 */
export function shouldServeFromDrive(slug: string, localFileExists: boolean): boolean {
  const entry = getDriveFileEntry(slug);
  if (!entry || !entry.fileId) return false;
  if (process.env.GDRIVE_ENABLED === '1') return true;
  return !localFileExists;
}

/**
 * Giao file từ Google Drive theo Phương án A:
 * - Mẫu Free: chuyển hướng 302 trực tiếp sang link công khai trên Google Drive.
 * - Mẫu Premium / Individual:
 *   + Nếu có Access Token của Google Drive API: tải luồng nhị phân (`alt=media`) và trả về trình duyệt khách với tên file chuẩn.
 *   + Nếu không cấu hình token riêng: chuyển hướng 302 tới link Google Drive của file (yêu cầu tài khoản khách đã được cấp quyền).
 */
export async function serveFromGoogleDrive(
  templateId: string,
  slug: string,
  isFree: boolean
): Promise<NextResponse | null> {
  const entry = getDriveFileEntry(slug);
  if (!entry || !entry.fileId) return null;

  const publicDownloadUrl = entry.publicUrl || buildPublicDriveDownloadUrl(entry.fileId);

  if (isFree || entry.tier === 'free') {
    return NextResponse.redirect(publicDownloadUrl, {
      status: 302,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  }

  const token = await getDriveAccessToken();
  if (token) {
    const driveRes = await fetch(
      `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(entry.fileId)}?alt=media&supportsAllDrives=true`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (driveRes.ok && driveRes.body) {
      const headers: Record<string, string> = {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="forgezone-${templateId}.zip"`,
        'Cache-Control': 'private, no-store',
      };
      const contentLength = driveRes.headers.get('content-length') || (entry.sizeBytes ? String(entry.sizeBytes) : '');
      if (contentLength) headers['Content-Length'] = contentLength;
      return new NextResponse(driveRes.body as ReadableStream, { status: 200, headers });
    }
  }

  return NextResponse.redirect(publicDownloadUrl, {
    status: 302,
    headers: { 'Cache-Control': 'private, no-store' },
  });
}

/**
 * Cấp quyền `reader` trên Google Drive cho email của khách khi mua gói Premium/Ultra hoặc mua lẻ sản phẩm.
 * Đối với gói thành viên (PRO/ULTRA), tự động gắn `expirationTime` bằng đúng ngày hết hạn gói.
 */
export async function grantDrivePermission(
  targetId: string,
  email: string,
  expiresAt?: Date
): Promise<string | null> {
  if (!targetId || !email) return null;
  const token = await getDriveAccessToken();
  if (!token) return null;

  const payload: Record<string, string> = {
    role: 'reader',
    type: 'user',
    emailAddress: email,
  };
  if (expiresAt) {
    payload.expirationTime = expiresAt.toISOString();
  }

  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(targetId)}/permissions?sendNotificationEmail=false&supportsAllDrives=true`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    // Nếu Google trả lỗi vì expirationTime trên thư mục (Google Drive chỉ hỗ trợ expirationTime trên file hoặc một số loại item),
    // thử cấp lại không kèm expirationTime để quyền thu hồi được quản lý qua revokeOrder / cron.
    if (expiresAt) {
      const fallbackRes = await fetch(
        `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(targetId)}/permissions?sendNotificationEmail=false&supportsAllDrives=true`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: 'reader', type: 'user', emailAddress: email }),
        }
      );
      if (fallbackRes.ok) {
        const data = (await fallbackRes.json()) as { id?: string };
        return data.id ?? null;
      }
    }
    return null;
  }

  const data = (await res.json()) as { id?: string };
  return data.id ?? null;
}

/**
 * Thu hồi quyền truy cập trên Google Drive của một email đối với file hoặc thư mục.
 */
export async function revokeDrivePermissionByEmail(targetId: string, email: string): Promise<boolean> {
  if (!targetId || !email) return false;
  const token = await getDriveAccessToken();
  if (!token) return false;

  const listRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(targetId)}/permissions?fields=permissions(id,emailAddress,role)&supportsAllDrives=true`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!listRes.ok) return false;

  const data = (await listRes.json()) as {
    permissions?: Array<{ id: string; emailAddress?: string; role?: string }>;
  };
  const normEmail = email.trim().toLowerCase();
  const matched = (data.permissions || []).filter(
    (p) => p.emailAddress?.toLowerCase() === normEmail && p.role !== 'owner'
  );

  for (const perm of matched) {
    await fetch(
      `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(targetId)}/permissions/${encodeURIComponent(perm.id)}?supportsAllDrives=true`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return matched.length > 0;
}

/**
 * Được gọi tự động trong `fulfilOrder` sau khi đơn hàng chuyển sang trạng thái `PAID`.
 */
export async function grantDriveAccessForOrder(params: {
  buyerEmail: string;
  kind: string;
  templateId?: string | null;
  itemTemplateIds?: string[];
  expiresAt?: Date;
}): Promise<void> {
  const { buyerEmail, kind, templateId, itemTemplateIds, expiresAt } = params;
  const { premiumFolderId } = getDriveFolders();

  if (kind === 'PRO' || kind === 'ULTRA' || kind === 'BUNDLE') {
    if (premiumFolderId) {
      await grantDrivePermission(premiumFolderId, buyerEmail, expiresAt);
    }
    return;
  }

  const ids = kind === 'CART' ? itemTemplateIds || [] : templateId ? [templateId] : [];
  for (const id of ids) {
    const slug = templateFile(id);
    const entry = getDriveFileEntry(slug);
    if (entry?.fileId) {
      await grantDrivePermission(entry.fileId, buyerEmail);
    }
  }
}

/**
 * Được gọi tự động trong `revokeOrder` khi đơn hàng bị hoàn tiền (`REFUNDED`).
 */
export async function revokeDriveAccessForOrder(params: {
  buyerEmail: string;
  kind: string;
  templateId?: string | null;
  itemTemplateIds?: string[];
}): Promise<void> {
  const { buyerEmail, kind, templateId, itemTemplateIds } = params;
  const { premiumFolderId } = getDriveFolders();

  if (kind === 'PRO' || kind === 'ULTRA' || kind === 'BUNDLE') {
    if (premiumFolderId) {
      await revokeDrivePermissionByEmail(premiumFolderId, buyerEmail);
    }
    return;
  }

  const ids = kind === 'CART' ? itemTemplateIds || [] : templateId ? [templateId] : [];
  for (const id of ids) {
    const slug = templateFile(id);
    const entry = getDriveFileEntry(slug);
    if (entry?.fileId) {
      await revokeDrivePermissionByEmail(entry.fileId, buyerEmail);
    }
  }
}
