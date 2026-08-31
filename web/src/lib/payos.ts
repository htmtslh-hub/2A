/* Client PayOS dùng chung. */
import { PayOS } from '@payos/node';

let client: PayOS | null = null;

export function payos(): PayOS {
  if (client) return client;

  const clientId = process.env.PAYOS_CLIENT_ID;
  const apiKey = process.env.PAYOS_API_KEY;
  const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

  if (!clientId || !apiKey || !checksumKey) {
    throw new Error(
      'Thiếu cấu hình PayOS (PAYOS_CLIENT_ID / PAYOS_API_KEY / PAYOS_CHECKSUM_KEY) — xem .env.example'
    );
  }

  client = new PayOS({ clientId, apiKey, checksumKey });
  return client;
}

export const payosConfigured = () =>
  Boolean(
    process.env.PAYOS_CLIENT_ID && process.env.PAYOS_API_KEY && process.env.PAYOS_CHECKSUM_KEY
  );
