import { useEffect, useState } from 'react';
import {
  Search,
  ShoppingCart,
  Star,
  ArrowUpRight,
  Play,
  ArrowRight,
  Plus,
} from 'lucide-react';

const ASSETS = {
  logo: 'https://polo-pecan-73837341.figma.site/_assets/v11/0ae29d6d9628bede667f90d57bebe81b8f1ec2bf.svg',
  avatar:
    'https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128',
  productCard:
    'https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png',
  videoCard:
    'https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png',
  bottomLeft:
    'https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png',
  bottomCenter:
    'https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024',
  bottomRight:
    'https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png',
} as const;

const NAV_LINKS = [
  { label: 'Home', active: true },
  { label: 'Shop', active: false },
  { label: 'Delivery and payment', active: false },
  { label: 'Brands', active: false },
  { label: 'Blog', active: false },
] as const;

type ModalType = 'product' | 'video' | 'explore' | null;

export function App() {
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [favoritesCount, setFavoritesCount] = useState<number>(4);
  const [cartCount, setCartCount] = useState<number>(1);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#EFFDF0] text-[#1a3d1a]">
      {/* Header */}
      <header className="shrink-0 w-full px-4 sm:px-6 lg:px-12 py-4 relative z-30 flex items-center justify-between animate-fade-in delay-100">
        {/* Left: Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveModal(null);
          }}
          className="block shrink-0"
          aria-label="CozyPaws Home"
        >
          <img
            id="cozypaws-logo"
            src={ASSETS.logo}
            alt="CozyPaws"
            className="w-[130px] h-[33px] lg:w-[205px] lg:h-[52px] object-contain block"
          />
        </a>

        {/* Center Nav (hidden below md) */}
        <nav
          id="cozypaws-center-nav"
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-4 lg:gap-8 whitespace-nowrap animate-fade-in delay-200"
        >
          {NAV_LINKS.map((item) => {
            const isCurrent = activeNav === item.label;
            return (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(item.label);
                  if (item.label === 'Shop') {
                    setActiveModal('explore');
                  }
                }}
                className={`text-sm font-medium transition-colors ${
                  isCurrent ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 animate-fade-in delay-300">
          {/* Search Button (hidden below sm) */}
          <button
            type="button"
            id="cozypaws-search-btn"
            onClick={() => setActiveModal('explore')}
            aria-label="Search products"
            className="hidden sm:flex w-10 h-10 rounded-full border border-[#1a3d1a]/20 items-center justify-center text-[#1a3d1a] hover:bg-[#1a3d1a]/5 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites Button */}
          <button
            type="button"
            id="cozypaws-favorites-btn"
            onClick={() => setFavoritesCount((c) => (c === 4 ? 5 : 4))}
            aria-label="Favorites"
            className="relative w-10 h-10 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <Star className="w-4 h-4 fill-white text-white" />
            <span
              id="cozypaws-favorites-badge"
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[10px] font-bold flex items-center justify-center"
            >
              {favoritesCount}
            </span>
          </button>

          {/* Cart Button */}
          <button
            type="button"
            id="cozypaws-cart-btn"
            onClick={() => setActiveModal('product')}
            aria-label="Shopping cart"
            className="relative w-10 h-10 rounded-full border border-[#1a3d1a]/20 flex items-center justify-center text-[#1a3d1a] hover:bg-[#1a3d1a]/5 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span
              id="cozypaws-cart-badge"
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[10px] font-bold flex items-center justify-center"
            >
              {cartCount}
            </span>
          </button>

          {/* Avatar */}
          <img
            id="cozypaws-avatar"
            src={ASSETS.avatar}
            alt="Customer profile"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* =========================================================
            1. DESKTOP HERO LAYOUT (lg+)
           ========================================================= */}
        <section
          id="cozypaws-desktop-hero"
          aria-label="Desktop Hero"
          className="hidden lg:flex flex-1 flex-col relative overflow-hidden"
        >
          {/* Text layer (z-5) */}
          <div className="relative z-[5] text-center px-12 pt-[5.4rem]">
            <h1 className="font-serif-display text-[#1a3d1a] text-[clamp(60px,7.5vw,110px)] leading-[0.95] tracking-tight">
              <span className="block">
                <span className="inline-block animate-word-pop delay-200">
                  Everything
                </span>
              </span>
              <span className="block">
                <span className="inline-block animate-word-pop delay-300 mr-[0.22em]">
                  Your
                </span>
                <span className="inline-block animate-word-pop delay-400 mr-[0.22em]">
                  Pets
                </span>
                <span className="inline-block animate-word-pop delay-500">
                  Love
                </span>
              </span>
            </h1>
          </div>

          {/* Left product card */}
          <div
            id="cozypaws-desktop-product-card"
            className="absolute top-[50px] left-12 z-20 w-[clamp(160px,14vw,260px)] animate-slide-in-left delay-600"
          >
            <div
              onClick={() => setActiveModal('product')}
              className="relative aspect-[260/257] rounded-2xl overflow-hidden group cursor-pointer shadow-sm"
            >
              <img
                src={ASSETS.productCard}
                alt="Cozy Cat House"
                className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
              />
              <button
                type="button"
                id="cozypaws-cat-house-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModal('product');
                }}
                aria-label="Inspect Cozy Cat House"
                className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2.5 flex items-baseline justify-between gap-2">
              <span className="text-gray-700 font-medium text-[clamp(12px,1vw,15px)]">
                Cozy Cat House
              </span>
              <span className="text-[#1a3d1a] font-bold text-[clamp(13px,1.1vw,16px)]">
                $49.99
              </span>
            </div>
          </div>

          {/* Right video card */}
          <div
            id="cozypaws-desktop-video-card"
            className="absolute top-[50px] right-12 z-20 w-[clamp(120px,10vw,177px)] animate-slide-in-right delay-700"
          >
            <div
              onClick={() => setActiveModal('video')}
              className="relative aspect-[177/287] rounded-2xl overflow-hidden group cursor-pointer shadow-sm"
            >
              <img
                src={ASSETS.videoCard}
                alt="Watch Product Reviews on TikTok and YouTube"
                className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
              />
              <button
                type="button"
                id="cozypaws-video-play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModal('video');
                }}
                aria-label="Play Product Review Video"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              >
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              </button>
            </div>
            <p className="mt-2 text-center text-gray-700 font-medium text-[clamp(11px,0.85vw,13px)] leading-snug">
              Watch Product Reviews on TikTok and YouTube
            </p>
          </div>

          {/* Bottom 3 images */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end">
            {/* Left image */}
            <div className="flex-1 relative animate-photo-reveal delay-700">
              <img
                src={ASSETS.bottomLeft}
                alt="Happy pet companion left"
                style={{ maxHeight: 'min(70vh, 55vw)' }}
                className="w-full h-auto block object-cover object-top"
              />
              {/* Left Overlay: 98K+ stat with avatar stack */}
              <div
                style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
                className="absolute left-6 xl:left-10 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md animate-scale-in delay-1000"
              >
                <div className="flex -space-x-2">
                  <img
                    src={ASSETS.avatar}
                    alt="Pet parent"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <span className="w-8 h-8 rounded-full bg-[#1a3d1a] border-2 border-white text-white flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <div className="text-base font-bold text-[#1a3d1a] leading-none">
                    98K+
                  </div>
                  <div className="text-[11px] text-gray-600 leading-tight">
                    Happy Pets
                  </div>
                </div>
              </div>
            </div>

            {/* Center image (tallest) */}
            <div className="flex-[1.265] relative animate-photo-reveal delay-600">
              <img
                src={ASSETS.bottomCenter}
                alt="Featured pet centerpiece"
                style={{ maxHeight: 'min(85vh, 70vw)' }}
                className="w-full h-auto block object-cover object-top"
              />
              {/* Center Overlay: Heading + Explore Products button */}
              <div
                style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
                className="absolute inset-x-4 z-20 flex flex-col items-center text-center animate-fade-up delay-1100"
              >
                <p className="text-white font-semibold text-[clamp(16px,1.5vw,24px)] drop-shadow-md mb-3">
                  Best Products for Your Pet
                </p>
                <button
                  type="button"
                  id="cozypaws-explore-btn"
                  onClick={() => setActiveModal('explore')}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-medium text-sm px-6 py-3 shadow-lg transition-colors cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right image */}
            <div className="flex-1 relative animate-photo-reveal delay-800">
              <img
                src={ASSETS.bottomRight}
                alt="Happy pet companion right"
                style={{ maxHeight: 'min(70vh, 55vw)' }}
                className="w-full h-auto block object-cover object-top"
              />
              {/* Right Overlay: 4.6 rating with orange filled Star */}
              <div
                style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
                className="absolute right-6 xl:right-10 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md animate-scale-in delay-1200"
              >
                <Star className="w-5 h-5 fill-[#E86A10] text-[#E86A10]" />
                <div>
                  <span className="text-base font-bold text-[#1a3d1a]">4.6</span>
                  <span className="text-xs text-gray-600 ml-1">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            2. TABLET HERO LAYOUT (md to lg)
           ========================================================= */}
        <section
          id="cozypaws-tablet-hero"
          aria-label="Tablet Hero"
          className="hidden md:flex lg:hidden flex-1 flex-col relative overflow-hidden"
        >
          {/* Heading */}
          <div className="relative z-[5] text-center px-6 pt-8">
            <h2 className="font-serif-display text-[#1a3d1a] text-7xl leading-[0.95] tracking-tight">
              <span className="block">
                <span className="inline-block animate-word-pop delay-200">
                  Everything
                </span>
              </span>
              <span className="block">
                <span className="inline-block animate-word-pop delay-300 mr-[0.22em]">
                  Your
                </span>
                <span className="inline-block animate-word-pop delay-400 mr-[0.22em]">
                  Pets
                </span>
                <span className="inline-block animate-word-pop delay-500">
                  Love
                </span>
              </span>
            </h2>
          </div>

          {/* Left side card (160px) */}
          <div className="absolute top-[80px] left-4 z-20 w-[160px] animate-slide-in-left delay-600">
            <div
              onClick={() => setActiveModal('product')}
              className="relative aspect-[260/257] rounded-2xl overflow-hidden cursor-pointer shadow-sm"
            >
              <img
                src={ASSETS.productCard}
                alt="Cozy Cat House"
                className="w-full h-full object-cover block"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModal('product');
                }}
                aria-label="Inspect Cozy Cat House"
                className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex items-baseline justify-between text-xs">
              <span className="text-gray-700 font-medium">Cozy Cat House</span>
              <span className="text-[#1a3d1a] font-bold">$49.99</span>
            </div>
          </div>

          {/* Right side card (120px) */}
          <div className="absolute top-[80px] right-4 z-20 w-[120px] animate-slide-in-right delay-700">
            <div
              onClick={() => setActiveModal('video')}
              className="relative aspect-[177/287] rounded-2xl overflow-hidden cursor-pointer shadow-sm"
            >
              <img
                src={ASSETS.videoCard}
                alt="Watch Product Reviews"
                className="w-full h-full object-cover block"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModal('video');
                }}
                aria-label="Play Product Review Video"
                className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-gray-700 font-medium text-[11px] leading-snug">
              Watch Product Reviews on TikTok and YouTube
            </p>
          </div>

          {/* Bottom 3 images (60vh / 75vh / 60vh) */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end">
            <div className="flex-1 relative animate-photo-reveal delay-700">
              <img
                src={ASSETS.bottomLeft}
                alt="Happy pet left"
                style={{ maxHeight: '60vh' }}
                className="w-full h-auto block object-cover object-top"
              />
              <div
                style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
                className="absolute left-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md animate-scale-in delay-1000"
              >
                <div className="flex -space-x-2">
                  <img
                    src={ASSETS.avatar}
                    alt="Pet parent"
                    className="w-6 h-6 rounded-full border border-white object-cover"
                  />
                  <span className="w-6 h-6 rounded-full bg-[#1a3d1a] border border-white text-white flex items-center justify-center">
                    <Plus className="w-3 h-3" />
                  </span>
                </div>
                <span className="text-sm font-bold text-[#1a3d1a]">98K+</span>
              </div>
            </div>

            <div className="flex-[1.265] relative animate-photo-reveal delay-600">
              <img
                src={ASSETS.bottomCenter}
                alt="Featured pet center"
                style={{ maxHeight: '75vh' }}
                className="w-full h-auto block object-cover object-top"
              />
              <div
                style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
                className="absolute inset-x-2 z-20 flex flex-col items-center text-center animate-fade-up delay-1100"
              >
                <p className="text-white font-semibold text-base drop-shadow-md mb-2">
                  Best Products for Your Pet
                </p>
                <button
                  type="button"
                  onClick={() => setActiveModal('explore')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-medium text-xs px-4 py-2.5 shadow-lg transition-colors cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative animate-photo-reveal delay-800">
              <img
                src={ASSETS.bottomRight}
                alt="Happy pet right"
                style={{ maxHeight: '60vh' }}
                className="w-full h-auto block object-cover object-top"
              />
              <div
                style={{ bottom: 'clamp(20px, 4vh, 50px)' }}
                className="absolute right-3 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md animate-scale-in delay-1200"
              >
                <Star className="w-4 h-4 fill-[#E86A10] text-[#E86A10]" />
                <span className="text-sm font-bold text-[#1a3d1a]">4.6</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. MOBILE HERO LAYOUT (below md)
           ========================================================= */}
        <section
          id="cozypaws-mobile-hero"
          aria-label="Mobile Hero"
          className="flex md:hidden flex-1 flex-col justify-between overflow-hidden pt-1"
        >
          {/* Top section: centered title (36px), subtitle, Explore Products button */}
          <div className="px-4 text-center shrink-0">
            <h2 className="font-serif-display text-[#1a3d1a] text-[36px] leading-[0.98] tracking-tight">
              <span className="inline-block animate-word-pop delay-200 mr-1.5">
                Everything
              </span>
              <span className="inline-block animate-word-pop delay-300 mr-1.5">
                Your
              </span>
              <span className="inline-block animate-word-pop delay-400 mr-1.5">
                Pets
              </span>
              <span className="inline-block animate-word-pop delay-500">
                Love
              </span>
            </h2>
            <p className="mt-1 text-xs font-medium text-gray-700 animate-fade-up delay-500">
              Best Products for Your Pet
            </p>
            <div className="mt-2 animate-fade-up delay-600">
              <button
                type="button"
                onClick={() => setActiveModal('explore')}
                className="inline-flex items-center gap-2 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-medium text-xs px-5 py-2 shadow-md transition-colors cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Two cards side-by-side (flex, gap-3) */}
          <div className="px-4 flex items-start justify-center gap-3 shrink-0 animate-fade-up delay-700">
            {/* Product card (aspect-square) */}
            <div className="flex-1 max-w-[140px]">
              <div
                onClick={() => setActiveModal('product')}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm"
              >
                <img
                  src={ASSETS.productCard}
                  alt="Cozy Cat House"
                  className="w-full h-full object-cover block"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal('product');
                  }}
                  aria-label="Inspect Cozy Cat House"
                  className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-[11px]">
                <span className="text-gray-700 font-medium truncate">
                  Cozy Cat House
                </span>
                <span className="text-[#1a3d1a] font-bold shrink-0">$49.99</span>
              </div>
            </div>

            {/* Video card (aspect-3/4) */}
            <div className="flex-1 max-w-[125px]">
              <div
                onClick={() => setActiveModal('video')}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-sm"
              >
                <img
                  src={ASSETS.videoCard}
                  alt="Watch Product Reviews"
                  className="w-full h-full object-cover block"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal('video');
                  }}
                  aria-label="Play Product Review Video"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center"
                >
                  <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                </button>
              </div>
              <p className="mt-1 text-center text-gray-700 font-medium text-[10px] leading-tight">
                Watch Product Reviews on TikTok and YouTube
              </p>
            </div>
          </div>

          {/* Stats row: 98K+ with avatars left, divider, 4.6 star right */}
          <div className="px-4 flex items-center justify-center gap-4 shrink-0 animate-scale-in delay-900">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img
                  src={ASSETS.avatar}
                  alt="Pet parent"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
                <span className="w-6 h-6 rounded-full bg-[#1a3d1a] border border-white text-white flex items-center justify-center">
                  <Plus className="w-3 h-3" />
                </span>
              </div>
              <span className="text-sm font-bold text-[#1a3d1a]">98K+</span>
            </div>
            <span className="h-4 w-px bg-[#1a3d1a]/20" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#E86A10] text-[#E86A10]" />
              <span className="text-sm font-bold text-[#1a3d1a]">4.6</span>
            </div>
          </div>

          {/* Bottom images: 3-panel flex, no max-height constraint */}
          <div className="flex items-end w-full shrink-0">
            <div className="flex-1 animate-photo-reveal delay-700">
              <img
                src={ASSETS.bottomLeft}
                alt="Happy pet left"
                className="w-full h-auto block"
              />
            </div>
            <div className="flex-[1.265] animate-photo-reveal delay-600">
              <img
                src={ASSETS.bottomCenter}
                alt="Featured pet center"
                className="w-full h-auto block"
              />
            </div>
            <div className="flex-1 animate-photo-reveal delay-800">
              <img
                src={ASSETS.bottomRight}
                alt="Happy pet right"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Modal for Product / Video / Explore */}
      {activeModal !== null && (
        <div
          id="cozypaws-modal"
          role="dialog"
          aria-modal="true"
          aria-label="CozyPaws Store Dialog"
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a3d1a]/50 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-[#EFFDF0] border border-[#1a3d1a]/15 p-6 shadow-2xl text-[#1a3d1a]"
          >
            {activeModal === 'product' && (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#E86A10]">
                    Featured Pet Gear
                  </span>
                  <button
                    type="button"
                    id="cozypaws-modal-close"
                    onClick={() => setActiveModal(null)}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1 rounded-full bg-white cursor-pointer"
                  >
                    Close [Esc]
                  </button>
                </div>
                <div className="mt-4 flex gap-4 items-center">
                  <img
                    src={ASSETS.productCard}
                    alt="Cozy Cat House"
                    className="w-24 h-24 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#1a3d1a]">
                      Cozy Cat House
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Organic felted wool cave with machine-washable sherpa cushion.
                    </p>
                    <div className="mt-2 text-lg font-bold text-[#1a3d1a]">
                      $49.99
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    id="cozypaws-add-to-cart-btn"
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white text-sm font-medium px-5 py-2.5 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{addedFeedback ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'video' && (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#E86A10]">
                    Community Reviews
                  </span>
                  <button
                    type="button"
                    id="cozypaws-modal-close"
                    onClick={() => setActiveModal(null)}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1 rounded-full bg-white cursor-pointer"
                  >
                    Close [Esc]
                  </button>
                </div>
                <div className="mt-4 flex gap-4 items-center">
                  <img
                    src={ASSETS.videoCard}
                    alt="TikTok & YouTube Pet Reviews"
                    className="w-20 h-28 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#1a3d1a]">
                      TikTok & YouTube Reviews
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Tested by 98K+ cat and dog parents with a 4.6★ average satisfaction score.
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal('product')}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white text-sm font-medium px-5 py-2.5 transition-colors cursor-pointer"
                  >
                    <span>Shop Featured Cat House</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'explore' && (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#E86A10]">
                    Best Products for Your Pet
                  </span>
                  <button
                    type="button"
                    id="cozypaws-modal-close"
                    onClick={() => setActiveModal(null)}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1 rounded-full bg-white cursor-pointer"
                  >
                    Close [Esc]
                  </button>
                </div>
                <h3 className="mt-3 font-serif-display text-2xl text-[#1a3d1a]">
                  Curated CozyPaws Collection
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-3 border border-[#1a3d1a]/10">
                    <div className="font-semibold text-sm text-[#1a3d1a]">
                      Cozy Cat House
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">$49.99 · In stock</div>
                  </div>
                  <div className="rounded-2xl bg-white p-3 border border-[#1a3d1a]/10">
                    <div className="font-semibold text-sm text-[#1a3d1a]">
                      Orthopedic Dog Lounger
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">$74.00 · In stock</div>
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white text-sm font-medium px-5 py-2.5 transition-colors cursor-pointer"
                  >
                    <span>{addedFeedback ? 'Added!' : 'Quick Add Cat House ($49.99)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
