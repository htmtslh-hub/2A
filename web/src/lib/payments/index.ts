/* Chọn cổng thanh toán. */
import type { Provider } from '@/lib/catalog';
import type { PaymentProviderAdapter } from './types';
import { payosAdapter } from './payos';
import { paddleAdapter } from './paddle';

const ADAPTERS: Record<Provider, PaymentProviderAdapter> = {
  PAYOS: payosAdapter,
  PADDLE: paddleAdapter,
};

export function adapterFor(provider: Provider): PaymentProviderAdapter {
  return ADAPTERS[provider];
}

export * from './types';
