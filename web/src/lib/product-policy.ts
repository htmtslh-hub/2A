import { REAL_TEMPLATES, type RealTemplate } from './real-templates';

/** Web interfaces and Skill/Prompt products enter Premium by default. */
export function productAccessTier(product: Pick<RealTemplate, 'group' | 'access'>): 'free' | 'premium' | 'individual' {
  if (product.access === 'free') return 'free';
  return product.group === 'agent' ? 'individual' : 'premium';
}

export function isFreeProduct(id: string): boolean {
  return Boolean(REAL_TEMPLATES[id] && !REAL_TEMPLATES[id].previewOnly && productAccessTier(REAL_TEMPLATES[id]) === 'free');
}

export function canBuyIndividually(id: string): boolean {
  return Boolean(REAL_TEMPLATES[id] && !REAL_TEMPLATES[id].previewOnly && productAccessTier(REAL_TEMPLATES[id]) === 'individual');
}

export function requiresPremium(id: string): boolean {
  const product = REAL_TEMPLATES[id];
  return Boolean(product && productAccessTier(product) === 'premium');
}
