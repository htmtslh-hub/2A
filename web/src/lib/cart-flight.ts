type Point = { x: number; y: number };

/** Fly a small preview of the selected product into the floating cart. */
export function flyProductToCart(origin: Point | undefined, slug: string, onArrival: () => void) {
  const target = document.querySelector<HTMLElement>('[data-cart-fab]');
  if (!origin || !target || !Element.prototype.animate) {
    onArrival();
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = target.querySelector('svg') ?? target;
  const targetRect = icon.getBoundingClientRect();
  const dx = targetRect.left + targetRect.width / 2 - origin.x;
  const dy = targetRect.top + targetRect.height / 2 - origin.y;
  const lift = reducedMotion ? 0 : Math.min(110, Math.max(42, Math.abs(dx) * .1));
  const card = document.createElement('div');
  card.className = 'cart-flight-card';
  card.dataset.cartFlight = '';
  card.setAttribute('aria-hidden', 'true');
  card.style.left = `${origin.x - 38}px`;
  card.style.top = `${origin.y - 26}px`;
  card.style.backgroundImage = `url("/previews/${slug}.webp")`;
  document.body.appendChild(card);

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    card.remove();
    onArrival();
  };
  const animation = card.animate([
    { offset: 0, transform: 'translate3d(0, 0, 0) scale(.8) rotate(-7deg)', opacity: .8 },
    { offset: .12, transform: 'translate3d(0, -14px, 0) scale(1.08) rotate(-4deg)', opacity: 1 },
    { offset: .45, transform: `translate3d(${dx * .38}px, ${dy * .25 - lift}px, 0) scale(1.05) rotate(4deg)`, opacity: 1 },
    { offset: .78, transform: `translate3d(${dx * .78}px, ${dy * .72 - lift * .25}px, 0) scale(.82) rotate(8deg)`, opacity: 1 },
    { offset: 1, transform: `translate3d(${dx}px, ${dy}px, 0) scale(.16) rotate(12deg)`, opacity: .2 },
  ], { duration: reducedMotion ? 620 : 1150, easing: 'linear', fill: 'forwards' });
  void animation.finished.then(finish, finish);
}
