import { useEffect, useState } from 'react';

interface NavItem {
  index: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { index: '01', label: 'Works', href: '#works' },
  { index: '02', label: 'Services', href: '#services' },
  { index: '03', label: 'About', href: '#about' },
  { index: '04', label: 'Contact', href: '#contact' },
];

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

function formatCurrentTime(): string {
  return timeFormatter.format(new Date());
}

export default function Navbar() {
  const [time, setTime] = useState<string>(() => formatCurrentTime());
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(formatCurrentTime());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full">
      <div className="mx-auto w-full max-w-[1340px] py-9 px-[15px] md-tablet:py-[30px] md-tablet:px-[18px] mobile:py-6 mobile:px-[18px]">
        <div className="flex items-center justify-between gap-4">
          {/* Desktop & Tablet Navigation */}
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-8 md-tablet:gap-4 mobile:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.index}
                href={item.href}
                onClick={(e) => e.preventDefault()}
                className="nav-link-underline text-white"
              >
                <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase">
                  {item.index}
                </span>
                <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">
                  / {item.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu / Close Toggle */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="hidden mobile:inline-flex items-center text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white cursor-pointer"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>

          {/* Right side: Email + Live 24h Clock */}
          <div className="flex items-center justify-end gap-8 md-tablet:gap-4 mobile:gap-4">
            <a
              href="mailto:Davies@gmail.com"
              className="nav-link-underline text-xs leading-4 tracking-[-0.12px] font-medium text-white"
            >
              Davies@gmail.com
            </a>
            <div
              id="live-clock"
              aria-label={`Current time CUP ${time}`}
              className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white tabular-nums"
            >
              CUP {time}
            </div>
          </div>
        </div>

        {/* Mobile Expandable Panel (CSS Grid 0fr / 1fr transition, 420ms spring ease) */}
        <div
          id="mobile-nav-panel"
          aria-hidden={!isMenuOpen}
          className={`hidden mobile:grid transition-[grid-template-rows,opacity,margin] duration-[420ms] ease-[var(--ease-spring)] ${
            isMenuOpen
              ? 'grid-rows-[1fr] opacity-100 mt-5'
              : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-3 border-t border-white/20 bg-black/85 backdrop-blur-md pt-5 pb-4"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.index}
                  href={item.href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-baseline gap-2.5 text-white hover:text-[#F598F2] transition-colors"
                >
                  <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase opacity-70">
                    {item.index} /
                  </span>
                  <span className="text-[28px] leading-8 tracking-[-0.84px] font-medium uppercase">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
