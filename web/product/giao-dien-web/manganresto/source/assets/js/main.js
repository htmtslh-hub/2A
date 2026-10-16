/**
 * MANGANRESTO — Modern Gourmet Dining & Culinary Artistry
 * Pure JavaScript, no external dependencies.
 * Conforms to WEB-STATIC-1 v1.2.1 and 05/10/2026 animation rule (enabled by default).
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  root.classList.add('js-ready');

  /* ------------------------------------------------------------------------
     1. Header Scroll State
     ------------------------------------------------------------------------ */
  const header = document.getElementById('header');
  function updateHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  /* ------------------------------------------------------------------------
     2. Mobile Navigation Toggle (Accessible & Breakpoint-Aware)
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle-btn');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMenu() {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    siteNav.classList.add('open');
    const firstLink = siteNav.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Reset menu on desktop breakpoint resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991) {
        closeMenu();
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     3. Active Nav Link on Scroll Spy
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id], footer[id]');
  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ------------------------------------------------------------------------
     4. Curated Menu Category Filtering
     ------------------------------------------------------------------------ */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      menuCards.forEach(card => {
        const cardCats = card.getAttribute('data-category') || '';
        if (cat === 'all' || cardCats.includes(cat)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     5. Interactive Search Modal
     ------------------------------------------------------------------------ */
  const searchOpenBtn = document.getElementById('search-open-btn');
  const searchModal = document.getElementById('search-modal');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('menu-search-input');
  const searchResults = document.getElementById('search-results');

  const menuData = [
    { name: 'Nero Tagliatelle Gamberi', category: 'Handcrafted Pasta & Seafood', price: '$28.00' },
    { name: 'Tuscan Harvest Morning', category: 'Breakfast & Avocado', price: '$16.50' },
    { name: 'Pugliese Burrata & Fig', category: 'Gourmet Appetizer', price: '$19.00' },
    { name: 'Umbrian Truffle Tagliolini', category: 'Pasta & Summer Truffle', price: '$32.00' },
    { name: 'Citrus Salmon Carpaccio', category: 'Gluten-Free Appetizer', price: '$22.50' },
    { name: 'Mangan Shakshuka Bowl', category: 'Mediterranean Breakfast', price: '$17.50' },
    { name: 'Chianti Braised Beef Cheek', category: 'Chef Special', price: '$36.00' },
    { name: 'Valrhona Dark Chocolate Soufflé', category: 'Artisanal Dessert', price: '$14.00' }
  ];

  function openSearchModal() {
    if (!searchModal) return;
    searchModal.hidden = false;
    searchOpenBtn.setAttribute('aria-expanded', 'true');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    renderSearchResults(menuData);
  }

  function closeSearchModal() {
    if (!searchModal) return;
    searchModal.hidden = true;
    searchOpenBtn.setAttribute('aria-expanded', 'false');
    if (searchOpenBtn) searchOpenBtn.focus();
  }

  function renderSearchResults(items) {
    if (!searchResults) return;
    if (items.length === 0) {
      searchResults.innerHTML = '<p class="search-hint">No culinary dishes matched your query. Try "pasta", "burrata", or "breakfast".</p>';
      return;
    }
    searchResults.innerHTML = items.map(item => `
      <div class="search-item" tabindex="0" role="button" data-dish="${item.name}">
        <div>
          <strong style="color: #ffffff; display: block; font-size: 0.95rem;">${item.name}</strong>
          <span style="color: #9da3b2; font-size: 0.8rem;">${item.category}</span>
        </div>
        <span style="color: #f8b417; font-weight: 700;">${item.price}</span>
      </div>
    `).join('');

    searchResults.querySelectorAll('.search-item').forEach(el => {
      el.addEventListener('click', () => {
        const dish = el.getAttribute('data-dish');
        closeSearchModal();
        showToast(dish, 'Selected from menu search');
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const dish = el.getAttribute('data-dish');
          closeSearchModal();
          showToast(dish, 'Selected from menu search');
        }
      });
    });
  }

  if (searchOpenBtn) {
    searchOpenBtn.addEventListener('click', openSearchModal);
  }
  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', closeSearchModal);
  }
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearchModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !searchModal.hidden) {
        closeSearchModal();
      }
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderSearchResults(menuData);
        return;
      }
      const filtered = menuData.filter(d => 
        d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
      );
      renderSearchResults(filtered);
    });
  }

  /* ------------------------------------------------------------------------
     6. Dish Order Toast Notice
     ------------------------------------------------------------------------ */
  const toast = document.getElementById('order-toast');
  const toastName = document.getElementById('toast-dish-name');
  const toastDesc = document.getElementById('toast-dish-desc');
  const toastCloseBtn = document.getElementById('toast-close-btn');
  let toastTimer = null;

  function showToast(name, desc) {
    if (!toast) return;
    if (toastName) toastName.textContent = name;
    if (toastDesc) toastDesc.textContent = desc || 'Added to your tasting request. Our team looks forward to serving you.';
    toast.hidden = false;

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 4500);
  }

  if (toastCloseBtn) {
    toastCloseBtn.addEventListener('click', () => {
      if (toast) toast.hidden = true;
      clearTimeout(toastTimer);
    });
  }

  document.querySelectorAll('.btn-card-order').forEach(btn => {
    btn.addEventListener('click', () => {
      const dish = btn.getAttribute('data-dish') || 'Culinary Creation';
      const price = btn.getAttribute('data-price') || '';
      showToast(dish, `Added to order summary (${price}). Confirmation sent to reservations.`);
    });
  });

  /* ------------------------------------------------------------------------
     7. Table Booking Reservation Form (Accessible Demo Handling)
     ------------------------------------------------------------------------ */
  const bookingForm = document.getElementById('booking-form');
  const bookingStatus = document.getElementById('booking-status');

  if (bookingForm) {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guest-name')?.value.trim();
      const email = document.getElementById('guest-email')?.value.trim();
      const phone = document.getElementById('guest-phone')?.value.trim();
      const date = document.getElementById('booking-date')?.value;
      const time = document.getElementById('booking-time')?.value;
      const guests = document.getElementById('guest-count')?.value;

      if (!name || !email || !phone || !date || !time) {
        if (bookingStatus) {
          bookingStatus.className = 'form-status error';
          bookingStatus.textContent = 'Please complete all required fields (*).';
        }
        return;
      }

      if (bookingStatus) {
        bookingStatus.className = 'form-status success';
        bookingStatus.textContent = `Thank you, ${name}! Your table request for ${guests} guest(s) on ${date} at ${time} has been recorded.`;
        showToast('Table Reserved', `${guests} guest(s) on ${date} at ${time}. Concierge will contact ${email}.`);
      }
    });
  }

  /* ------------------------------------------------------------------------
     8. Hero Plate Kinetic Tilt & Micro-motion
     ------------------------------------------------------------------------ */
  const plateWrap = document.getElementById('hero-plate-wrap');
  const plateImg = document.getElementById('hero-plate');

  if (plateWrap && plateImg) {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isTicking = false;

    function renderPlateMotion() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      plateImg.style.transform = `perspective(800px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
      
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        requestAnimationFrame(renderPlateMotion);
      } else {
        isTicking = false;
      }
    }

    window.addEventListener('mousemove', (e) => {
      const rect = plateWrap.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetX = Math.max(-12, Math.min(12, deltaX * 10));
      targetY = Math.max(-12, Math.min(12, -deltaY * 10));

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(renderPlateMotion);
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     9. Mini Category Dish Card Click Interactions
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.mini-dish-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.mini-dish-title')?.textContent.replace('•', '').trim();
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
        const targetTab = Array.from(tabButtons).find(btn => 
          btn.textContent.toLowerCase().includes(title.toLowerCase())
        );
        if (targetTab) targetTab.click();
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ------------------------------------------------------------------------
     10. Session-only Pause Motion Control
     ------------------------------------------------------------------------ */
  const motionButton = document.querySelector('.motion-toggle');
  let motionPaused = false;

  if (motionButton) {
    motionButton.addEventListener('click', () => {
      motionPaused = !motionPaused;
      motionButton.setAttribute('aria-pressed', String(motionPaused));
      motionButton.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
      if (motionPaused) {
        root.style.setProperty('--duration-normal', '0.001ms');
        document.querySelectorAll('*').forEach(el => {
          el.style.animation = 'none';
        });
      } else {
        root.style.removeProperty('--duration-normal');
      }
    });
  }
});
