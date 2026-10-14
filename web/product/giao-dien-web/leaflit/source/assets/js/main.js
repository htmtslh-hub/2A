/* Leaflit: owner-approved browser-local library, navigation and finite reveal. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const storageKey = 'leaflit.library.v1';
  const feedback = document.querySelector('#local-feedback');
  const search = document.querySelector('#book-search');
  const genre = document.querySelector('#genre-filter');
  const view = document.querySelector('#view-filter');
  const grid = document.querySelector('#collection-grid');
  const savedLink = document.querySelector('[data-saved-view]');
  const collectionLink = document.querySelector('#library-nav a[href="#book-notes"]');
  savedLink.href = '#collections';
  if (collectionLink) {
    collectionLink.href = '#collections';
    collectionLink.addEventListener('click', () => {
      view.value = 'all';
      filterBooks();
    });
  }
  const books = [...document.querySelectorAll('.book-detail')].map(detail => {
    const summary = detail.querySelector('summary');
    const subtitle = summary.querySelector('span').textContent;
    const separator = subtitle.lastIndexOf(' · ');
    return {
      id: detail.id,
      title: [...summary.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').trim(),
      author: subtitle.slice(0, separator),
      genre: subtitle.slice(separator + 3),
      detail,
      cover: document.querySelector(`a[href="#${detail.id}"] .book-cover`)
    };
  });
  const validIds = new Set(books.map(book => book.id));
  const normalise = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const cleanState = value => ({
    saved: new Set(Array.isArray(value?.saved) ? value.saved.filter(id => validIds.has(id)) : []),
    name: typeof value?.name === 'string' && value.name.trim() ? value.name.trim().slice(0, 40) : 'Sarah'
  });
  let state = cleanState(null);
  let storageAvailable = true;
  try { state = cleanState(JSON.parse(localStorage.getItem(storageKey) || 'null')); }
  catch {
    storageAvailable = false;
    feedback.textContent = 'Browser storage is unavailable or unreadable. Changes will remain in this session unless storage becomes available.';
  }
  const persist = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ saved: [...state.saved], name: state.name }));
      storageAvailable = true;
    } catch { storageAvailable = false; }
  };
  const announce = message => {
    feedback.textContent = `${message}${storageAvailable ? '' : ' Browser storage is blocked; this change will last only for this session.'}`;
  };
  const saveButtons = [];
  const createSaveButton = book => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'save-book';
    button.dataset.bookId = book.id;
    button.addEventListener('click', () => {
      const wasSaved = state.saved.has(book.id);
      if (wasSaved) state.saved.delete(book.id);
      else state.saved.add(book.id);
      persist();
      renderState();
      announce(`${book.title} ${wasSaved ? 'removed from' : 'added to'} saved books.`);
      // When the filtered card disappears, keep keyboard focus on a visible control.
      if (button.closest('[hidden]')) view.focus();
    });
    saveButtons.push(button);
    return button;
  };
  books.forEach(book => {
    const card = document.createElement('article');
    card.className = 'collection-book';
    card.dataset.bookId = book.id;
    const link = document.createElement('a');
    link.className = 'shelf-book';
    link.href = `#${book.id}`;
    if (book.cover) {
      const cover = book.cover.cloneNode(true);
      if (cover.tagName === 'IMG') cover.loading = 'lazy';
      link.append(cover);
    }
    const title = document.createElement('h3');
    title.textContent = book.title;
    const author = document.createElement('p');
    author.textContent = book.author;
    const tag = document.createElement('span');
    tag.className = 'genre';
    tag.textContent = book.genre;
    link.append(title, author, tag);
    card.append(link, createSaveButton(book));
    grid.append(card);
    book.detail.append(createSaveButton(book));
    book.card = card;
  });
  const filterBooks = () => {
    const query = normalise(search.value);
    let count = 0;
    books.forEach(book => {
      const matchesSearch = normalise(`${book.title} ${book.author}`).includes(query);
      const matches = matchesSearch && (genre.value === 'all' || genre.value === book.genre) && (view.value === 'all' || state.saved.has(book.id));
      book.card.hidden = !matches;
      if (matches) count++;
      // Search applies to the original shelves too; genre/saved filters affect the collection only.
      document.querySelectorAll(`a.reading-card[href="#${book.id}"], a.shelf-book[href="#${book.id}"]`).forEach(link => {
        if (!link.closest('#collection-grid')) link.hidden = !matchesSearch;
      });
    });
    document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'book' : 'books'}${view.value === 'saved' ? ' saved' : ' in your collection'}${query ? ` matching “${search.value.trim()}”` : ''}.`;
    const empty = document.querySelector('#empty-results');
    empty.hidden = count !== 0;
    empty.textContent = view.value === 'saved' && !state.saved.size ? 'No saved books yet. Choose All books, then save a story you want to read.' : 'No books match. Try another title, author or genre.';
  };
  const renderState = () => {
    saveButtons.forEach(button => {
      const saved = state.saved.has(button.dataset.bookId);
      const book = books.find(item => item.id === button.dataset.bookId);
      button.textContent = saved ? 'Remove saved book' : 'Save book';
      button.setAttribute('aria-pressed', String(saved));
      button.setAttribute('aria-label', `${saved ? 'Remove' : 'Save'} ${book.title}${saved ? ' from saved books' : ''}`);
    });
    document.querySelectorAll('[data-saved-count]').forEach(node => node.textContent = String(state.saved.size));
    document.querySelectorAll('[data-profile-name]').forEach(node => node.textContent = state.name);
    document.querySelector('#profile-name').value = state.name;
    filterBooks();
  };
  search.addEventListener('input', filterBooks);
  genre.addEventListener('change', filterBooks);
  view.addEventListener('change', filterBooks);
  document.querySelector('#clear-filters').addEventListener('click', () => {
    search.value = '';
    genre.value = 'all';
    view.value = 'all';
    filterBooks();
    announce('Showing all books.');
  });
  savedLink.addEventListener('click', () => {
    search.value = '';
    genre.value = 'all';
    view.value = 'saved';
    filterBooks();
  });
  document.querySelector('#profile-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('#profile-name');
    const name = input.value.trim();
    if (!name) {
      input.setCustomValidity('Enter a display name, not just spaces.');
      input.reportValidity();
      return;
    }
    input.setCustomValidity('');
    state.name = name.slice(0, 40);
    persist();
    renderState();
    announce('Display name updated.');
  });
  document.querySelector('#profile-name').addEventListener('input', event => event.target.setCustomValidity(''));
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    try {
      state = cleanState(event.key === null ? null : JSON.parse(event.newValue || 'null'));
      renderState();
      announce('Your local library was updated in another tab.');
    } catch { announce('Another tab wrote unreadable library data. Your current library has been kept.'); }
  });
  renderState();
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#library-nav');
  if (toggle && nav) {
    root.classList.add('js');
    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });
    window.matchMedia('(max-width: 650px)').addEventListener('change', close);
  }
  if (!('IntersectionObserver' in window)) return;
  const reveal = element => {
    /* RAF fallback is finite and does not rely on CSS animation support. */
    const start = performance.now();
    const frame = time => {
      const progress = Math.min(1, (time - start) / 380);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.style.opacity = String(.4 + .6 * eased);
      element.style.transform = `translateY(${10 * (1 - eased)}px)`;
      if (progress < 1) requestAnimationFrame(frame);
      else {
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
      }
    };
    requestAnimationFrame(frame);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      reveal(entry.target);
    });
  }, { threshold: .08 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
})();
