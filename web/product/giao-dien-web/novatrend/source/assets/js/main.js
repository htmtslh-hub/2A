/**
 * NovaTrend Storefront Interactive Engine
 * Web-Static E-Commerce Platform
 */

(() => {
  'use strict';

  // Mark JavaScript active for progressive enhancement and scroll animations
  document.documentElement.classList.add('js');

  /* ==========================================================================
     Catalog Data Source
     ========================================================================== */
  const PRODUCTS = {
    'essential-hoodie': {
      id: 'essential-hoodie',
      name: 'Essential Hoodie',
      price: 5999,
      category: 'fashion',
      image: 'assets/img/prod-hoodie.webp'
    },
    'air-max-270': {
      id: 'air-max-270',
      name: 'Air Max 270',
      price: 12999,
      originalPrice: 14900,
      category: 'fashion',
      image: 'assets/img/prod-sneaker.webp'
    },
    'wireless-headphones': {
      id: 'wireless-headphones',
      name: 'Wireless Headphones',
      price: 9999,
      category: 'electronics',
      image: 'assets/img/prod-headphones.webp'
    },
    'smart-watch-series-9': {
      id: 'smart-watch-series-9',
      name: 'Smart Watch Series 9',
      price: 19999,
      originalPrice: 23499,
      category: 'accessories',
      image: 'assets/img/prod-smartwatch.webp'
    },
    'stainless-steel-bottle': {
      id: 'stainless-steel-bottle',
      name: 'Stainless Steel Bottle',
      price: 2499,
      category: 'fitness',
      image: 'assets/img/prod-bottle.webp'
    },
    'aviator-sunglasses': {
      id: 'aviator-sunglasses',
      name: 'Aviator Sunglasses',
      price: 8999,
      originalPrice: 9900,
      category: 'accessories',
      image: 'assets/img/prod-sunglasses.webp'
    },
    'classic-hoodie': {
      id: 'classic-hoodie',
      name: 'Classic Hoodie',
      price: 5999,
      category: 'fashion',
      image: 'assets/img/prod-hoodie.webp'
    },
    'air-max-270-bestseller': {
      id: 'air-max-270-bestseller',
      name: 'Air Max 270',
      price: 12999,
      category: 'fashion',
      image: 'assets/img/prod-sneaker.webp'
    },
    'sony-headphones-bestseller': {
      id: 'sony-headphones-bestseller',
      name: 'Sony WH-1000XM5',
      price: 34999,
      category: 'electronics',
      image: 'assets/img/prod-headphones.webp'
    }
  };

  const FREE_SHIPPING_THRESHOLD = 5000; // $50.00 in cents
  const STANDARD_SHIPPING_FEE = 499;   // $4.99 in cents
  const CART_STORAGE_KEY = 'novatrend-cart-v1';
  const WISHLIST_STORAGE_KEY = 'novatrend-wishlist-v1';

  /* ==========================================================================
     Application State
     ========================================================================== */
  let cart = loadStorage(CART_STORAGE_KEY, {});
  let wishlist = new Set(loadStorage(WISHLIST_STORAGE_KEY, []));

  function loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      /* Fallback gracefully */
    }
  }

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 320);
    }, 2800);
  }

  /* ==========================================================================
     Mobile Menu & Sticky Header
     ========================================================================== */
  const toggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const header = document.querySelector('.header');

  if (toggle && mainNav) {
    const closeMenu = () => {
      mainNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const openMenu = () => {
      mainNav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mainNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });

    window.matchMedia('(max-width: 820px)').addEventListener('change', () => {
      closeMenu();
    });

    document.documentElement.classList.add('menu-ready');
  }

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('header--scrolled', window.scrollY > 20);
    }
  }, { passive: true });

  /* ==========================================================================
     Cart System
     ========================================================================== */
  const cartModal = document.getElementById('cart-modal');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartCountEl = document.getElementById('cart-count');
  const cartTitleCountEl = document.getElementById('cart-title-count');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartFooterEl = document.getElementById('cart-footer');
  const cartSubtotalEl = document.getElementById('cart-subtotal-val');
  const cartShippingEl = document.getElementById('cart-shipping-val');
  const cartTotalEl = document.getElementById('cart-total-val');
  const shippingTrackerText = document.getElementById('shipping-tracker-text');
  const shippingProgressFill = document.getElementById('shipping-progress-fill');
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutReviewView = document.getElementById('checkout-review-view');
  const checkoutSummaryBox = document.getElementById('checkout-summary-box');
  const backToCartBtn = document.getElementById('back-to-cart-btn');
  const cartStartShopping = document.getElementById('cart-start-shopping');

  function addToCart(productId, qty = 1) {
    const item = PRODUCTS[productId];
    if (!item) return;

    if (cart[productId]) {
      cart[productId].qty = Math.min(99, cart[productId].qty + qty);
    } else {
      cart[productId] = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: qty
      };
    }

    saveStorage(CART_STORAGE_KEY, cart);
    updateCartUI();
    showToast(`Added "${item.name}" to cart!`, 'success');
  }

  function removeFromCart(productId) {
    if (cart[productId]) {
      const name = cart[productId].name;
      delete cart[productId];
      saveStorage(CART_STORAGE_KEY, cart);
      updateCartUI();
      showToast(`Removed "${name}" from cart.`, 'info');
    }
  }

  function updateQty(productId, delta) {
    if (!cart[productId]) return;
    const newQty = cart[productId].qty + delta;
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      cart[productId].qty = Math.min(99, newQty);
      saveStorage(CART_STORAGE_KEY, cart);
      updateCartUI();
    }
  }

  function updateCartUI() {
    const items = Object.values(cart);
    const totalCount = items.reduce((acc, curr) => acc + curr.qty, 0);

    if (cartCountEl) {
      cartCountEl.textContent = totalCount;
      cartCountEl.classList.remove('badge--pop');
      void cartCountEl.offsetWidth;
      cartCountEl.classList.add('badge--pop');
      if (openCartBtn) {
        openCartBtn.setAttribute('aria-label', `Open cart, ${totalCount} items`);
      }
    }
    if (cartTitleCountEl) cartTitleCountEl.textContent = `(${totalCount})`;

    if (!cartItemsList) return;

    if (items.length === 0) {
      cartEmptyEl.style.display = 'flex';
      cartItemsList.innerHTML = '';
      if (cartFooterEl) cartFooterEl.hidden = true;
      if (checkoutReviewView) checkoutReviewView.hidden = true;
      if (shippingProgressFill) shippingProgressFill.style.width = '0%';
      if (shippingTrackerText) {
        shippingTrackerText.innerHTML = `Add <strong>$50.00</strong> more to unlock <strong>FREE SHIPPING</strong>!`;
      }
      return;
    }

    cartEmptyEl.style.display = 'none';
    if (cartFooterEl) cartFooterEl.hidden = false;

    // Render items
    cartItemsList.innerHTML = items.map(item => `
      <div class="cart-item" data-cart-item-id="${item.id}">
        <div class="cart-item__media">
          <img src="${item.image}" alt="${item.name}" width="68" height="68" loading="lazy">
        </div>
        <div class="cart-item__details">
          <span class="cart-item__title">${item.name}</span>
          <span class="cart-item__price">${formatMoney(item.price * item.qty)}</span>
          <div class="cart-item__qty">
            <button type="button" aria-label="Decrease quantity" data-qty-change="${item.id}" data-delta="-1">−</button>
            <span>${item.qty}</span>
            <button type="button" aria-label="Increase quantity" data-qty-change="${item.id}" data-delta="1">+</button>
          </div>
        </div>
        <button type="button" class="cart-item__remove" aria-label="Remove ${item.name} from cart" data-cart-remove="${item.id}">✕</button>
      </div>
    `).join('');

    // Totals & Shipping Calculation
    const subtotal = items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
    const grandTotal = subtotal + shippingFee;

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatMoney(subtotal);
    if (cartShippingEl) cartShippingEl.textContent = isFreeShipping ? 'FREE' : formatMoney(shippingFee);
    if (cartTotalEl) cartTotalEl.textContent = formatMoney(grandTotal);

    // Free Shipping Progress
    if (shippingProgressFill && shippingTrackerText) {
      if (isFreeShipping) {
        shippingProgressFill.style.width = '100%';
        shippingTrackerText.innerHTML = `🎉 You have unlocked <strong>FREE SHIPPING</strong>!`;
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingProgressFill.style.width = `${progress}%`;
        shippingTrackerText.innerHTML = `Add <strong>${formatMoney(remaining)}</strong> more to unlock <strong>FREE SHIPPING</strong>!`;
      }
    }
  }

  function openCart() {
    if (!cartModal) return;
    updateCartUI();
    if (typeof cartModal.showModal === 'function') {
      cartModal.showModal();
    } else {
      cartModal.setAttribute('open', '');
    }
    if (closeCartBtn) closeCartBtn.focus();
  }

  function closeCart() {
    if (!cartModal) return;
    if (typeof cartModal.close === 'function') {
      cartModal.close();
    } else {
      cartModal.removeAttribute('open');
    }
    if (openCartBtn) openCartBtn.focus();
  }

  /* ==========================================================================
     Wishlist System
     ========================================================================== */
  const wishlistModal = document.getElementById('wishlist-modal');
  const openWishlistBtn = document.getElementById('open-wishlist-btn');
  const closeWishlistBtn = document.getElementById('close-wishlist-btn');
  const wishlistCountEl = document.getElementById('wishlist-count');
  const wishlistTitleCountEl = document.getElementById('wishlist-title-count');
  const wishlistItemsList = document.getElementById('wishlist-items-list');
  const wishlistEmptyEl = document.getElementById('wishlist-empty');
  const wishlistStartShopping = document.getElementById('wishlist-start-shopping');

  function toggleWishlist(productId) {
    const item = PRODUCTS[productId];
    if (!item) return;

    if (wishlist.has(productId)) {
      wishlist.delete(productId);
      showToast(`Removed "${item.name}" from wishlist.`, 'info');
    } else {
      wishlist.add(productId);
      showToast(`Saved "${item.name}" to wishlist!`, 'success');
    }

    saveStorage(WISHLIST_STORAGE_KEY, Array.from(wishlist));
    updateWishlistUI();
  }

  function updateWishlistUI() {
    const count = wishlist.size;
    if (wishlistCountEl) {
      wishlistCountEl.textContent = count;
      wishlistCountEl.classList.remove('badge--pop');
      void wishlistCountEl.offsetWidth;
      wishlistCountEl.classList.add('badge--pop');
    }
    if (wishlistTitleCountEl) wishlistTitleCountEl.textContent = `(${count})`;
    if (openWishlistBtn) {
      openWishlistBtn.setAttribute('aria-label', `View wishlist, ${count} items`);
    }

    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.getAttribute('data-wishlist-id');
      const isSaved = wishlist.has(id);
      if (btn.classList.contains('wishlist-btn-pill')) {
        btn.classList.toggle('wishlist-btn-pill--active', isSaved);
      } else {
        btn.classList.toggle('wishlist-btn--active', isSaved);
      }
    });

    if (!wishlistItemsList) return;

    if (count === 0) {
      wishlistEmptyEl.style.display = 'flex';
      wishlistItemsList.innerHTML = '';
      return;
    }

    wishlistEmptyEl.style.display = 'none';
    const items = Array.from(wishlist).map(id => PRODUCTS[id]).filter(Boolean);

    wishlistItemsList.innerHTML = items.map(item => `
      <div class="cart-item" data-wishlist-item-id="${item.id}">
        <div class="cart-item__media">
          <img src="${item.image}" alt="${item.name}" width="68" height="68" loading="lazy">
        </div>
        <div class="cart-item__details">
          <span class="cart-item__title">${item.name}</span>
          <span class="cart-item__price">${formatMoney(item.price)}</span>
          <button type="button" class="btn btn--primary btn--sm" style="margin-top:0.35rem; align-self:flex-start;" data-wishlist-move-cart="${item.id}">
            Add to Cart
          </button>
        </div>
        <button type="button" class="cart-item__remove" aria-label="Remove ${item.name} from wishlist" data-wishlist-remove="${item.id}">✕</button>
      </div>
    `).join('');
  }

  function openWishlist() {
    if (!wishlistModal) return;
    updateWishlistUI();
    if (typeof wishlistModal.showModal === 'function') {
      wishlistModal.showModal();
    } else {
      wishlistModal.setAttribute('open', '');
    }
    if (closeWishlistBtn) closeWishlistBtn.focus();
  }

  function closeWishlist() {
    if (!wishlistModal) return;
    if (typeof wishlistModal.close === 'function') {
      wishlistModal.close();
    } else {
      wishlistModal.removeAttribute('open');
    }
    if (openWishlistBtn) openWishlistBtn.focus();
  }

  /* ==========================================================================
     Search Modal
     ========================================================================== */
  const searchModal = document.getElementById('search-modal');
  const openSearchBtn = document.getElementById('open-search-btn');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const productSearchInput = document.getElementById('product-search-input');
  const searchResultsList = document.getElementById('search-results-list');
  const searchClearBtn = document.getElementById('search-clear-btn');

  function openSearch() {
    if (!searchModal) return;
    if (typeof searchModal.showModal === 'function') {
      searchModal.showModal();
    } else {
      searchModal.setAttribute('open', '');
    }
    if (productSearchInput) {
      productSearchInput.value = '';
      productSearchInput.focus();
    }
    if (searchResultsList) searchResultsList.innerHTML = '';
  }

  function closeSearch() {
    if (!searchModal) return;
    if (typeof searchModal.close === 'function') {
      searchModal.close();
    } else {
      searchModal.removeAttribute('open');
    }
    if (openSearchBtn) openSearchBtn.focus();
  }

  function handleProductSearch(query) {
    if (!searchResultsList) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResultsList.innerHTML = '';
      if (searchClearBtn) searchClearBtn.hidden = true;
      return;
    }
    if (searchClearBtn) searchClearBtn.hidden = false;

    const matches = Object.values(PRODUCTS).filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResultsList.innerHTML = `
        <p style="padding:1.5rem; text-align:center; color:var(--gray-500); font-size:0.875rem;">
          No matching products found for "<strong>${query}</strong>".
        </p>
      `;
      return;
    }

    searchResultsList.innerHTML = matches.map(item => `
      <div class="cart-item" style="border-radius:var(--radius-sm); padding:0.75rem;">
        <div class="cart-item__media">
          <img src="${item.image}" alt="${item.name}" width="56" height="56" loading="lazy">
        </div>
        <div class="cart-item__details">
          <span class="cart-item__title">${item.name}</span>
          <span class="cart-item__price">${formatMoney(item.price)}</span>
        </div>
        <button type="button" class="btn btn--primary btn--sm" data-cart-add="${item.id}">
          Add
        </button>
      </div>
    `).join('');
  }

  /* ==========================================================================
     Category Filter System
     ========================================================================== */
  const activeFilterBadge = document.getElementById('active-filter-badge');
  const currentFilterName = document.getElementById('current-filter-name');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  function applyCategoryFilter(cat) {
    productCards.forEach(c => c.classList.add('product-card--filtering'));
    setTimeout(() => {
      if (!cat || cat === 'all') {
        productCards.forEach(c => {
          c.style.display = '';
          c.classList.remove('product-card--filtering');
        });
        if (activeFilterBadge) activeFilterBadge.hidden = true;
        return;
      }

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cardCat === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
        card.classList.remove('product-card--filtering');
      });

      if (activeFilterBadge && currentFilterName) {
        activeFilterBadge.hidden = false;
        currentFilterName.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      }
    }, 150);

    const newArrivalsSec = document.getElementById('new-arrivals');
    if (newArrivalsSec) {
      newArrivalsSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     Horizontal Product Slider Prev/Next
     ========================================================================== */
  const productSlider = document.getElementById('product-slider');
  const scrollPrevBtn = document.getElementById('scroll-prev-btn');
  const scrollNextBtn = document.getElementById('scroll-next-btn');

  if (scrollPrevBtn && productSlider) {
    scrollPrevBtn.addEventListener('click', () => {
      productSlider.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }

  if (scrollNextBtn && productSlider) {
    scrollNextBtn.addEventListener('click', () => {
      productSlider.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     Flash Sale Live Countdown Timer
     ========================================================================== */
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (daysEl && hoursEl && minsEl && secsEl) {
    let remainingSeconds = (2 * 86400) + (15 * 3600) + (45 * 60) + 30;

    function tickTimer() {
      if (remainingSeconds <= 0) {
        remainingSeconds = 86400;
      }
      remainingSeconds--;

      const d = Math.floor(remainingSeconds / 86400);
      const h = Math.floor((remainingSeconds % 86400) / 3600);
      const m = Math.floor((remainingSeconds % 3600) / 60);
      const s = remainingSeconds % 60;

      daysEl.textContent = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }

    setInterval(tickTimer, 1000);
  }

  /* ==========================================================================
     Hero Carousel Dots Interaction
     ========================================================================== */
  const heroDots = document.querySelectorAll('.hero__dot');
  const heroModels = document.querySelectorAll('.hero__model-img');
  let heroIndex = 0;
  let heroFrame = 0;
  function showLookbook(index) {
    if (index === heroIndex || !heroModels[index]) return;
    const direction = index > heroIndex ? 1 : -1;
    heroIndex = index;
    cancelAnimationFrame(heroFrame);
    // Capture current values so repeated clicks reverse smoothly, with one finite RAF.
    const starts = Array.from(heroModels, model => Number(getComputedStyle(model).opacity));
    heroDots.forEach((dot, i) => {
      dot.classList.toggle('hero__dot--active', i === index);
      dot.setAttribute('aria-pressed', String(i === index));
    });
    heroModels.forEach((model, i) => {
      model.classList.toggle('hero__model-img--active', i === index);
      model.setAttribute('aria-hidden', String(i !== index));
    });
    const started = performance.now();
    function frame(now) {
      const progress = Math.min(1, (now - started) / 620);
      const eased = 1 - Math.pow(1 - progress, 3);
      heroModels.forEach((model, i) => {
        const target = i === index ? 1 : 0;
        const opacity = starts[i] + (target - starts[i]) * eased;
        model.style.opacity = String(opacity);
        model.style.transform = `translateX(${(1 - opacity) * 22 * (i === index ? direction : -direction)}px)`;
      });
      if (progress < 1) heroFrame = requestAnimationFrame(frame);
      else heroModels.forEach(model => model.style.transform = '');
    }
    heroFrame = requestAnimationFrame(frame);
  }
  heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showLookbook(idx));
    dot.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? heroDots.length - 1 : (heroIndex + (event.key === 'ArrowRight' ? 1 : -1) + heroDots.length) % heroDots.length;
      showLookbook(next);
      heroDots[next].focus();
    });
  });

  /* ==========================================================================
     Newsletter Form
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        if (newsletterFeedback) {
          newsletterFeedback.textContent = `Demo only — newsletter received for ${emailInput.value}.`;
        }
        showToast('Subscribed successfully! Check your inbox for a discount code.', 'success');
        emailInput.value = '';
      }
    });
  }

  /* ==========================================================================
     Global Click Event Delegation
     ========================================================================== */
  document.addEventListener('click', (e) => {
    const target = e.target;

    // Cart Add Button
    const addBtn = target.closest('[data-cart-add]');
    if (addBtn) {
      e.preventDefault();
      const id = addBtn.getAttribute('data-cart-add');
      addToCart(id);
      return;
    }

    // Floating Badge Click in Hero
    const floatingBadge = target.closest('.floating-badge');
    if (floatingBadge) {
      const fid = floatingBadge.getAttribute('data-floating-id');
      const map = {
        'sneaker': 'air-max-270',
        'headphones': 'wireless-headphones',
        'smartwatch': 'smart-watch-series-9',
        'bottle': 'stainless-steel-bottle'
      };
      if (map[fid]) {
        addToCart(map[fid]);
      }
      return;
    }

    // Wishlist Toggle Button
    const wishBtn = target.closest('[data-wishlist-id]');
    if (wishBtn) {
      e.preventDefault();
      const id = wishBtn.getAttribute('data-wishlist-id');
      toggleWishlist(id);
      return;
    }

    // Category Card click
    const catCard = target.closest('[data-category]');
    if (catCard) {
      e.preventDefault();
      const cat = catCard.getAttribute('data-category');
      applyCategoryFilter(cat);
      return;
    }

    // Category Dropdown link click
    const catDrop = target.closest('[data-category-filter]');
    if (catDrop) {
      e.preventDefault();
      const cat = catDrop.getAttribute('data-category-filter');
      applyCategoryFilter(cat);
      return;
    }

    // Cart Qty +/-
    const qtyBtn = target.closest('[data-qty-change]');
    if (qtyBtn) {
      const id = qtyBtn.getAttribute('data-qty-change');
      const delta = parseInt(qtyBtn.getAttribute('data-delta'), 10);
      updateQty(id, delta);
      return;
    }

    // Cart Remove
    const removeBtn = target.closest('[data-cart-remove]');
    if (removeBtn) {
      const id = removeBtn.getAttribute('data-cart-remove');
      removeFromCart(id);
      return;
    }

    // Wishlist Remove
    const wishRemoveBtn = target.closest('[data-wishlist-remove]');
    if (wishRemoveBtn) {
      const id = wishRemoveBtn.getAttribute('data-wishlist-remove');
      toggleWishlist(id);
      return;
    }

    // Wishlist Move to Cart
    const wishMoveBtn = target.closest('[data-wishlist-move-cart]');
    if (wishMoveBtn) {
      const id = wishMoveBtn.getAttribute('data-wishlist-move-cart');
      addToCart(id);
      toggleWishlist(id);
      return;
    }

    // Search Tag Click
    const searchTag = target.closest('.search-tag');
    if (searchTag) {
      const term = searchTag.getAttribute('data-search-term');
      if (productSearchInput) {
        productSearchInput.value = term;
        handleProductSearch(term);
      }
      return;
    }
  });

  // Modal open/close bindings
  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartStartShopping) {
    cartStartShopping.addEventListener('click', () => {
      closeCart();
      const el = document.getElementById('new-arrivals');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (openWishlistBtn) openWishlistBtn.addEventListener('click', openWishlist);
  if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlist);
  if (wishlistStartShopping) {
    wishlistStartShopping.addEventListener('click', () => {
      closeWishlist();
      const el = document.getElementById('new-arrivals');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

  if (productSearchInput) {
    productSearchInput.addEventListener('input', (e) => {
      handleProductSearch(e.target.value);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (productSearchInput) productSearchInput.value = '';
      handleProductSearch('');
      if (productSearchInput) productSearchInput.focus();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      applyCategoryFilter('all');
    });
  }

  const viewAllProductsLink = document.getElementById('view-all-products-link');
  if (viewAllProductsLink) {
    viewAllProductsLink.addEventListener('click', (e) => {
      e.preventDefault();
      applyCategoryFilter('all');
    });
  }

  // Checkout Review Demo Action
  if (checkoutBtn && checkoutReviewView && checkoutSummaryBox) {
    checkoutBtn.addEventListener('click', () => {
      const items = Object.values(cart);
      if (items.length === 0) return;

      const subtotal = items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
      const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
      const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
      const grandTotal = subtotal + shippingFee;

      checkoutSummaryBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
          <span>Items (${items.reduce((a,c) => a + c.qty, 0)}):</span>
          <span>${formatMoney(subtotal)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
          <span>Shipping:</span>
          <span>${isFreeShipping ? 'FREE' : formatMoney(shippingFee)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.9375rem; border-top:1px solid var(--gray-200); padding-top:0.35rem; margin-top:0.35rem;">
          <span>Estimated Total:</span>
          <span style="color:var(--primary);">${formatMoney(grandTotal)}</span>
        </div>
      `;

      if (cartItemsList) cartItemsList.style.display = 'none';
      if (cartFooterEl) cartFooterEl.style.display = 'none';
      checkoutReviewView.hidden = false;
      checkoutReviewView.focus();
    });
  }

  if (backToCartBtn && checkoutReviewView) {
    backToCartBtn.addEventListener('click', () => {
      checkoutReviewView.hidden = true;
      if (cartItemsList) cartItemsList.style.display = '';
      if (cartFooterEl) cartFooterEl.style.display = '';
    });
  }

  /* ==========================================================================
     Scroll Reveal Observer
     ========================================================================== */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    if (!revealEls.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

    revealEls.forEach(el => observer.observe(el));
  }

  // Initial UI Render & Effects
  updateCartUI();
  updateWishlistUI();
  initScrollReveal();
})();
