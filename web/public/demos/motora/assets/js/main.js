/* Motora: local configuration and finite, event-driven motion. No backend. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const finishes = [
    { name: 'Silver', filter: 'grayscale(1) brightness(1.2)' },
    { name: 'Red', filter: 'hue-rotate(316deg) saturate(1.7) brightness(.84)' },
    { name: 'Blue', filter: 'hue-rotate(167deg) saturate(1.5) brightness(.82)' },
    { name: 'Champagne Gold', filter: 'none' },
    { name: 'Obsidian Black', filter: 'grayscale(1) brightness(.36) contrast(1.12)' },
  ];
  const categories = {
    design: 'A statement of beautifully considered proportions. An expressive silhouette, made unmistakable by the smallest details.',
    performance: 'A wide stance. A purposeful profile. Explore the V8 design study and the details that give it its character.',
    safety: 'See the driver-focused layout and visibility details. This concept does not represent verified safety equipment or ratings.',
    luxury: 'Sculpted seating and considered materials. Look inside a cabin designed around the experience of every journey.',
    multimedia: 'A connected cabin concept, with driver information close at hand. Explore the interface and configure your own perspective.',
  };
  const information = {
    model: ['The C63 S design study', 'An independently created showroom interface inspired by a performance coupé. Vehicle names and marks belong to their owners. The generated imagery and example specifications are not a manufacturer listing or an offer to sell a vehicle.'],
    collection: ['One car. Many perspectives.', 'This concept collection contains one coupé design study in five visual finishes. Explore the hotspots, read the details or save a configuration for this visit.'],
    performance: ['Uncompromised Power', 'A long bonnet, purposeful stance and sculpted bodywork frame this performance concept. The displayed 503 hp, 4.0-second 0–100 km/h and 3.7-second 0–60 mph figures are illustrative, not verified specifications or purchase advice.'],
    specifications: ['A note on specifications', 'All figures on this page are demonstration content for this template: four seats, 4.0L V8, 503 hp, 9-speed transmission, 0–100 km/h in 4.0 seconds and 0–60 mph in 3.7 seconds. Replace and verify all vehicle data before publishing.'],
    rear: ['AMG rear spoiler', 'A sculptural rear wing completes the silhouette of this design study. This is generated concept imagery, not a catalogue of orderable factory options.'],
    roof: ['Panoramic roof', 'A dark glass roof traces the curve of the coupé, contrasting with the selected exterior finish. Explore the colours to see that contrast change.'],
    body: ['AMG body styling', 'A low shoulder, deeply defined side skirts and expressive surfaces give this coupé its distinctive presence. The side view keeps each line in focus.'],
    wheel: ['Forged-wheel design', 'Dark multi-spoke wheels with contrasting brake details anchor the design. Wheel names in the configurator are illustrative preferences; changing the selection updates the enquiry summary, not the vehicle geometry.'],
    interior: ['A space for four', 'Sculpted sport seats, dark leather and precise contrast stitching set the tone. Scroll to Experience for a closer look at the generated cabin study.'],
    engine: ['AMG 4.0L V8 biturbo', 'The example engine card describes a 4.0-litre V8 concept. Specifications are illustrative template content. Confirm all technical data for your actual vehicle before publication.'],
    power: ['503 hp — concept power', 'A sample performance figure for the showroom design. Power, acceleration and equipment must be verified for the model, market and year before use in a real listing.'],
    transmission: ['AMG SPEEDSHIFT MCT 9G', 'An illustrative nine-speed automatic transmission label. No real vehicle, optional equipment or inventory is being offered by this template.'],
    acceleration: ['A different measure of pace', 'The 3.7-second figure illustrates 0–60 mph; the 4.0-second figure illustrates 0–100 km/h. These use different speed units and are sample data, not certified performance results.'],
  };
  let finishIndex = 3, wheel = 'Forged multi-spoke', motion = true, saved = false;
  let colourFrame = 0, scrollFrame = 0, toastTimer = 0;
  const frames = new Map(), openers = new WeakMap();
  const vehicle = $('.vehicle-motion'), car = $('#vehicle-image');
  function finite(element, duration, paint, done = () => {}) {
    cancelAnimationFrame(frames.get(element));
    if (!motion) { paint(1); done(); return; }
    const start = performance.now();
    const frame = now => {
      const p = Math.min(1,(now-start)/duration);
      paint(p);
      if (p < 1) frames.set(element,requestAnimationFrame(frame));
      else { frames.delete(element); done(); }
    };
    frames.set(element,requestAnimationFrame(frame));
  }
  function notify(message) {
    clearTimeout(toastTimer);
    $('#status-message').textContent = message;
    $('#status-message').classList.add('is-visible');
    toastTimer = setTimeout(() => $('#status-message').classList.remove('is-visible'),3200);
  }
  function summary() {
    const line = `${finishes[finishIndex].name} / ${wheel}`;
    $('#configuration-caption').textContent = line;
    $('#config-summary').textContent = line;
    $('#config-finish').value = String(finishIndex);
    $('.configuration-car').style.filter = finishes[finishIndex].filter;
    $('#enquiry-link').href = `mailto:hello@motora.example?subject=${encodeURIComponent('Motora concept enquiry')}&body=${encodeURIComponent('I would like to discuss this concept configuration:\nMercedes-Benz / AMG C63 S Coupé\n'+line+'\nThis is an enquiry, not an order.')}`;
  }
  function paintFinish() {
    car.style.filter = finishes[finishIndex].filter;
    $('#finish-name').textContent = finishes[finishIndex].name;
    $('.vehicle-stage').setAttribute('aria-label',`${finishes[finishIndex].name} coupé design preview`);
    car.alt = `${finishes[finishIndex].name} performance coupé viewed from its left side, facing right`;
    $$('[data-finish]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.finish) === finishIndex)));
    summary();
  }
  function setFinish(requested, direction = 1) {
    cancelAnimationFrame(colourFrame);
    cancelAnimationFrame(frames.get(vehicle)); frames.delete(vehicle);
    finishIndex = (requested + finishes.length) % finishes.length;
    saved = false; $('#save-configuration').setAttribute('aria-pressed','false');
    let changed = false;
    const start = performance.now();
    function step(now) {
      const p = motion ? Math.min(1,(now-start)/680) : 1;
      if (p < .42) {
        const t = p/.42;
        vehicle.style.transform = `translateX(${-direction*25*t}px)`;
        vehicle.style.opacity = String(1-t*.85);
      } else {
        if (!changed) { paintFinish(); changed = true; }
        const t = (p-.42)/.58, ease = 1-Math.pow(1-t,3);
        vehicle.style.transform = `translateX(${direction*25*(1-ease)}px)`;
        vehicle.style.opacity = String(.15+.85*ease);
      }
      if(p<1) colourFrame = requestAnimationFrame(step);
      else { colourFrame=0; vehicle.style.transform='none'; vehicle.style.opacity='1'; }
    }
    colourFrame=requestAnimationFrame(step);
  }
  $$('[data-finish]').forEach(button => button.addEventListener('click',()=>setFinish(Number(button.dataset.finish),Number(button.dataset.finish)>=finishIndex?1:-1)));
  $$('[data-step]').forEach(button=>button.addEventListener('click',()=>setFinish(finishIndex+Number(button.dataset.step),Number(button.dataset.step))));
  $('.finish-selector').addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();const direction=event.key==='ArrowRight'?1:-1;
    setFinish(finishIndex+direction,direction);
    $(`[data-finish="${finishIndex}"]`).focus();
  });
  $$('[data-category]').forEach(button=>button.addEventListener('click',()=>{
    $$('[data-category]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    $('#category-note').textContent=categories[button.dataset.category];
    $('.vehicle-stage').dataset.category=button.dataset.category;
    finite($('.design-note'),320,p=>{$('.design-note').style.opacity=String(.4+.6*p);});
    notify(`${button.textContent} details selected.`);
  }));
  function openDialog(dialog) {
    if(typeof dialog.showModal!=='function'){location.hash='contact';return;}
    const opener=document.activeElement;
    $$('dialog[open]').forEach(item=>item.close());
    openers.set(dialog,opener);dialog.showModal();
  }
  $$('[data-info],[data-part]').forEach(button=>button.addEventListener('click',()=>{
    const entry=information[button.dataset.info||button.dataset.part];
    $('#info-title').textContent=entry[0];$('#info-body').textContent=entry[1];openDialog($('#info-dialog'));
  }));
  $$('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  $$('dialog').forEach(dialog=>{
    dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();dialog.close();}});
    dialog.addEventListener('close',()=>requestAnimationFrame(()=>{if(!$('dialog[open]'))openers.get(dialog)?.focus();}));
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();});
  });
  $$('[data-configure]').forEach(button=>button.addEventListener('click',()=>{summary();openDialog($('#config-dialog'));}));
  $('#config-finish').addEventListener('change',event=>setFinish(Number(event.target.value)));
  $('#config-wheels').addEventListener('change',event=>{wheel=event.target.value;summary();saved=false;$('#save-configuration').setAttribute('aria-pressed','false');});
  function save() {saved=!saved;$('#save-configuration').setAttribute('aria-pressed',String(saved));notify(saved?'Configuration saved for this visit.':'Configuration removed from this visit.');}
  $('#save-configuration').addEventListener('click',save);
  $('#save-dialog-configuration').addEventListener('click',()=>{if(!saved)save();else notify('Configuration is already saved for this visit.');});
  $('#search-open').addEventListener('click',()=>openDialog($('#search-dialog')));
  $('#model-search').addEventListener('input',event=>{
    const query=event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
    const found='mercedes-benz amg c63 s coupe 2023'.includes(query);
    $('#search-result').hidden=!found;$('#search-empty').hidden=found;
  });
  $('#search-result').addEventListener('click',()=>$('#search-dialog').close());
  const toggle=$('.menu-toggle'),nav=$('#primary-nav');
  function closeMenu(focus=false){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');if(focus)toggle.focus();}
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
  nav.querySelectorAll('a,button').forEach(item=>item.addEventListener('click',()=>closeMenu()));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('is-open'))closeMenu(true);});
  const revealed=new WeakSet();
  const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting||revealed.has(entry.target))return;
    revealed.add(entry.target);observer.unobserve(entry.target);
    finite(entry.target,620,p=>{const eased=1-Math.pow(1-p,3);entry.target.style.opacity=String(eased);entry.target.style.transform=`translateY(${25*(1-eased)}px)`;});
  }),{threshold:.12}):null;
  function updateScroll(){scrollFrame=0;const box=$('.experience').getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight-box.top)/(innerHeight+box.height)));$('.experience').style.setProperty('--scroll',String(progress));$('.experience__image img').style.transform=`translateY(${-3-(motion?progress*9:0)}%)`;}
  function scheduleScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);}
  addEventListener('scroll',scheduleScroll,{passive:true});addEventListener('resize',()=>{closeMenu();scheduleScroll();});
  $('#motion-toggle').addEventListener('click',event=>{
    motion=!motion;event.currentTarget.textContent=motion?'Pause motion':'Resume motion';event.currentTarget.setAttribute('aria-pressed',String(!motion));
    if(!motion){cancelAnimationFrame(colourFrame);colourFrame=0;frames.forEach(id=>cancelAnimationFrame(id));frames.clear();paintFinish();vehicle.style.opacity='1';vehicle.style.transform='none';$$('[data-reveal]').forEach(element=>{element.style.opacity='1';element.style.transform='none';});}
    scheduleScroll();
  });
  document.body.classList.add('js');summary();
  $$('[data-reveal]').forEach(element=>observer?observer.observe(element):(element.style.opacity='1',element.style.transform='none'));
  finite(vehicle,850,p=>{const ease=1-Math.pow(1-p,3);vehicle.style.opacity=String(.25+.75*ease);vehicle.style.transform=`translateX(${45*(1-ease)}px)`;});
  scheduleScroll();
})();
