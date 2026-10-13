/* Orbit Academy — local learning interactions, no services or tracking. */
(() => {
  'use strict';
  document.body.classList.add('js');
  const worlds = [
    { name: 'Earth, our shared home', image: 'assets/img/earth-world.webp', alt: 'Imaginative astronaut scene beneath a huge teal planet' },
    { name: 'Planets, worlds of possibility', image: 'assets/img/planet-world.webp', alt: 'Imaginative astronaut landscape beneath a ringed planet' },
    { name: 'Meteors, stories in the sky', image: 'assets/img/meteor-world.webp', alt: 'Imaginative astronaut observing a meteor shower' }
  ];
  const lessons = [
    { title: 'The blue planet', content: 'Earth’s ocean covers about 71% of its surface. This is why water is such a prominent feature when we view the whole planet. Land, water and atmosphere form connected systems. Observation is the starting point for asking how they interact.', question: 'About how much of Earth’s surface is covered by ocean?', answers: ['About 71%', 'About 10%', 'All of it'], correct: 0, explanation: 'The ocean covers about 71% of Earth’s surface, according to NASA.', source: 'https://science.nasa.gov/earth/facts/' },
    { title: 'A world with rings', content: 'Saturn’s rings are collections of separate particles: pieces of ice and rock of different sizes. From a distance they look like bands, but they are not one solid disc. A different scale of observation reveals a different kind of structure.', question: 'What are Saturn’s rings made of?', answers: ['One solid sheet of metal', 'Many pieces of ice and rock', 'Liquid oceans'], correct: 1, explanation: 'Saturn’s rings contain many pieces of ice and rock, rather than a single solid object.', source: 'https://science.nasa.gov/saturn/facts/' },
    { title: 'Rock, light, discovery', content: 'A meteoroid travels in space. The luminous phenomenon as it enters an atmosphere is called a meteor. A fragment that survives and reaches the ground is a meteorite. These related names tell us about different stages, not three unrelated objects.', question: 'What is a surviving piece that reaches the ground called?', answers: ['A meteor', 'A meteoroid', 'A meteorite'], correct: 2, explanation: 'A surviving piece on the ground is a meteorite. The streak of light is a meteor.', source: 'https://science.nasa.gov/solar-system/meteors-meteorites/facts/' }
  ];
  let selected = 0, activeLesson = 0, animation = 0, motion = true, opener;
  const completed = new Set();
  const image = document.querySelector('#hero-image');
  const scene = document.querySelector('.hero__scene');
  const status = document.querySelector('#world-status');
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => 1 - Math.pow(1 - value, 3);
  function renderWorld(index) {
    selected = index;
    image.src = worlds[index].image;
    image.alt = worlds[index].alt;
    document.querySelector('#world-caption').textContent = `0${index + 1} / ${worlds[index].name}`;
    document.querySelectorAll('.chapter-rail [data-world]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.world) === index)));
    status.textContent = `${worlds[index].name} selected.`;
  }
  function switchWorld(index, direction = 1) {
    const next = (index + worlds.length) % worlds.length;
    cancelAnimationFrame(animation);
    image.style.transform = 'none'; image.style.opacity = '1';
    if (!motion || next === selected) { renderWorld(next); return; }
    const start = performance.now(); let replaced = false;
    function frame(now) {
      const progress = clamp((now - start) / 900);
      if (progress < .45) {
        const t = ease(progress / .45);
        image.style.transform = `translateX(${-direction * 90 * t}px) scale(${1 + .07 * t})`;
        image.style.opacity = String(1 - t);
      } else {
        if (!replaced) { renderWorld(next); replaced = true; }
        const t = ease((progress - .45) / .55);
        image.style.transform = `translateX(${direction * 90 * (1 - t)}px) scale(${1.07 - .07 * t})`;
        image.style.opacity = String(t);
      }
      if (progress < 1) animation = requestAnimationFrame(frame);
      else { image.style.transform = 'none'; image.style.opacity = '1'; animation = 0; }
    }
    animation = requestAnimationFrame(frame);
  }
  document.querySelectorAll('[data-world]').forEach(button => button.addEventListener('click', () => switchWorld(Number(button.dataset.world), Number(button.dataset.world) >= selected ? 1 : -1)));
  document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => switchWorld(selected + Number(button.dataset.direction), Number(button.dataset.direction))));
  document.querySelector('.hero').addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); const d = event.key === 'ArrowRight' ? 1 : -1; switchWorld(selected + d, d); } });
  let touch = null;
  scene.addEventListener('dragstart', event => event.preventDefault());
  scene.addEventListener('pointerdown', event => { touch = { x: event.clientX, y: event.clientY }; if (scene.setPointerCapture) scene.setPointerCapture(event.pointerId); });
  scene.addEventListener('pointerup', event => { if (!touch) return; const dx = event.clientX - touch.x, dy = event.clientY - touch.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { const d = dx < 0 ? 1 : -1; switchWorld(selected + d, d); } touch = null; });
  scene.addEventListener('pointercancel', () => { touch = null; });
  const toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('#navigation');
  function closeMenu(focus = false) { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); if (focus) toggle.focus(); }
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true); });
  const dialog = document.querySelector('.lesson-dialog');
  function openDialog(button) { opener = button; if (typeof dialog.showModal === 'function') dialog.showModal(); else document.querySelector('#lessons').scrollIntoView(); }
  function updateProgress() { document.querySelector('#progress-label').textContent = `${completed.size} of 3 knowledge checks completed`; document.querySelector('#progress-fill').style.width = `${completed.size / 3 * 100}%`; }
  function openLesson(index, button) {
    activeLesson = index;
    const lesson = lessons[index];
    document.querySelector('#dialog-title').textContent = lesson.title;
    document.querySelector('#dialog-content').textContent = lesson.content;
    document.querySelector('#dialog-eyebrow').textContent = `Learning path 0${index + 1}`;
    document.querySelector('#dialog-source').href = lesson.source;
    document.querySelector('#dialog-source').hidden = false;
    document.querySelector('#quiz').hidden = false;
    document.querySelector('#quiz-question').textContent = lesson.question;
    document.querySelector('#quiz-feedback').textContent = '';
    const options = document.querySelector('.quiz-options'); options.replaceChildren();
    lesson.answers.forEach((answer, i) => {
      const option = document.createElement('button'); option.type = 'button'; option.textContent = answer; option.setAttribute('aria-pressed', 'false');
      option.addEventListener('click', () => {
        options.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === option)));
        const correct = i === lesson.correct;
        document.querySelector('#quiz-feedback').textContent = correct ? `Correct. ${lesson.explanation}` : `Try again. ${lesson.explanation}`;
        if (correct) { completed.add(activeLesson); updateProgress(); }
      }); options.append(option);
    });
    openDialog(button);
  }
  document.querySelectorAll('[data-lesson]').forEach(button => button.addEventListener('click', () => openLesson(Number(button.dataset.lesson), button)));
  document.querySelector('.guide-toggle').addEventListener('click', event => {
    document.querySelector('#dialog-title').textContent = 'Your curiosity, your pace';
    document.querySelector('#dialog-eyebrow').textContent = 'How to use Orbit Academy';
    document.querySelector('#dialog-content').textContent = 'Choose a world, read its learning path and try the knowledge check. Follow the NASA source to investigate further. Progress is kept only while this page is open: no account, tracking or certificate is involved. The scenes are imaginative concept art, not archival photographs or exact scientific scale models.';
    document.querySelector('#quiz').hidden = true; document.querySelector('#dialog-source').hidden = true; openDialog(event.currentTarget);
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  document.querySelector('#reset-progress').addEventListener('click', () => { completed.clear(); updateProgress(); });
  const query = document.querySelector('#topic-query');
  function search() {
    const text = query.value.trim().toLowerCase(); let count = 0;
    document.querySelectorAll('[data-topic]').forEach(card => { const match = !text || `${card.dataset.topic} ${card.textContent}`.toLowerCase().includes(text); card.hidden = !match; if (match) { count++; card.classList.add('is-visible'); } });
    document.querySelector('#search-status').textContent = text ? `${count} learning path${count === 1 ? '' : 's'} found for “${query.value.trim()}”. Clear the search to see all paths.` : 'All three learning paths are shown.';
    document.querySelector('#lessons').scrollIntoView({ behavior: motion ? 'smooth' : 'auto' });
  }
  document.querySelector('#search-button').addEventListener('click', search);
  query.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); search(); } });
  query.addEventListener('search', () => { if (!query.value) search(); });
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .1 }); reveals.forEach(element => observer.observe(element)); }
  else reveals.forEach(element => element.classList.add('is-visible'));
  const journey = document.querySelector('.journey'), journeyImage = document.querySelector('.journey__image'), meter = document.querySelector('.journey__meter');
  let scrollFrame = 0;
  function updateScroll() { scrollFrame = 0; if (!motion) return; const box = journey.getBoundingClientRect(); const p = clamp(-box.top / Math.max(1, journey.offsetHeight - innerHeight)); journeyImage.style.transform = `translateY(${-35 * p}px) scale(${1 + .12 * p})`; meter.style.transform = `scaleX(${p})`; }
  function scheduleScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', () => { closeMenu(); scheduleScroll(); });
  document.querySelector('.motion-toggle').addEventListener('click', event => { motion = !motion; document.body.classList.toggle('motion-paused', !motion); event.currentTarget.textContent = motion ? 'Pause motion' : 'Resume motion'; event.currentTarget.setAttribute('aria-pressed', String(!motion)); if (!motion) { cancelAnimationFrame(animation); image.style.transform = 'none'; image.style.opacity = '1'; journeyImage.style.transform = 'none'; reveals.forEach(element => element.classList.add('is-visible')); } else scheduleScroll(); });
  // Preload the two alternate local scenes without adding a network dependency.
  worlds.slice(1).forEach(world => { const preload = new Image(); preload.src = world.image; });
  updateProgress(); scheduleScroll();
})();
