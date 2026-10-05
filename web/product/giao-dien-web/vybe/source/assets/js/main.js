/* VYBE: finite, directional Morge choreography. No automatic carousel. */
(() => {
  'use strict';
  const products = [
    {id:'edge',name:'Edge Hoodie',color:'Ivory / geometric',price:68},
    {id:'bloom',name:'Bloom Tee',color:'Ivory / botanical',price:38},
    {id:'noir',name:'Orbit Tee',color:'Washed black',price:42},
    {id:'wave',name:'Wave Crew',color:'Emerald green',price:58},
    {id:'solar',name:'Solar Tee',color:'Butter / cobalt',price:38}
  ];
  const $ = selector => document.querySelector(selector);
  const slides = [...document.querySelectorAll('[data-slide]')];
  const picks = [...document.querySelectorAll('[data-pick]')];
  const read = (key,fallback) => {try{return JSON.parse(localStorage.getItem(key)) ?? fallback;}catch{return fallback;}};
  const save = (key,value) => {try{localStorage.setItem(key,JSON.stringify(value));}catch{/* Storage is optional. */}};
  // Owner policy: enabled on every fresh visit, independent of OS/browser preferences.
  // Explicit pause remains available in this page; old saved off values are ignored.
  let motion = new URLSearchParams(location.search).get('motion') !== 'off';
  let selected = 0, animationFrame = 0, toastTimer;
  const stage = $('.model-stage');
  function stopAnimations(){
    cancelAnimationFrame(animationFrame);animationFrame=0;
    slides.forEach(slide=>{slide.style.removeProperty('transform');slide.style.removeProperty('opacity');});
    stage.dataset.motionState='idle';
  }
  function sync(){
    const p=products[selected];
    $('[data-name]').textContent=p.name;
    $('[data-selected-name]').textContent=p.name;
    $('[data-color]').textContent=p.color;
    $('[data-price]').textContent='$'+p.price;
    $('[data-counter]').textContent=String(selected+1).padStart(2,'0')+' / 05';
    const preview=$('.featured-model');
    preview.src='assets/img/'+p.id+'.webp';preview.alt='Model wearing the '+p.name;
    $('.featured-image').className='featured-image featured-image--'+p.id;
    picks.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
    slides.forEach((s,i)=>{s.classList.toggle('is-current',i===selected);s.setAttribute('aria-hidden',String(i!==selected));s.inert=i!==selected;});
  }
  function select(index,direction){
    index=((index%products.length)+products.length)%products.length;
    if(index===selected)return;
    const outgoing=slides[selected], incoming=slides[index];
    const oldStyle=getComputedStyle(outgoing);
    const matrix = oldStyle.transform === 'none' ? [1,0,0,1,0,0] : oldStyle.transform.slice(oldStyle.transform.indexOf('(')+1,-1).split(',').map(Number);
    const startX = matrix.length === 16 ? matrix[12] : matrix[4];
    const startScale = matrix[0];
    const startOpacity = Number(oldStyle.opacity);
    stopAnimations();selected=index;sync();
    if(!motion)return;
    const distance=stage.clientWidth*.65;
    const paint=(element,x,scale,opacity)=>{
      element.style.transform=`translate3d(${x}px,0,0) scale(${scale})`;
      element.style.opacity=String(opacity);
    };
    paint(outgoing,startX,startScale,startOpacity);
    paint(incoming,direction*distance,.88,0);
    stage.dataset.motionState='running';
    const started=performance.now();
    // Frame-driven transforms do not depend on browser CSS/WAAPI animation switches.
    function frame(now){
      const progress=Math.min(1,(now-started)/950);
      const eased=1-Math.pow(1-progress,3);
      paint(outgoing,startX+(-direction*distance-startX)*eased,startScale+(.86-startScale)*eased,startOpacity*(1-eased));
      paint(incoming,direction*distance*(1-eased),.88+.12*eased,eased);
      if(progress<1){animationFrame=requestAnimationFrame(frame);}else{stopAnimations();}
    }
    animationFrame=requestAnimationFrame(frame);
  }
  $('[data-prev]').addEventListener('click',()=>select(selected-1,-1));
  $('[data-next]').addEventListener('click',()=>select(selected+1,1));
  picks.forEach((b,i)=>b.addEventListener('click',()=>select(i,i>selected?1:-1)));
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.view);select(i,i>selected?1:-1);$('.hero').scrollIntoView({behavior:motion?'smooth':'instant'});}));
  $('.carousel-controls').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(selected+(e.key==='ArrowRight'?1:-1),e.key==='ArrowRight'?1:-1);}});
  let touch;
  $('.hero-panel').addEventListener('touchstart',e=>{touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
  $('.hero-panel').addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)select(selected+(dx<0?1:-1),dx<0?1:-1);touch=null;},{passive:true});
  function syncMotion(){ $('.motion-toggle').textContent=motion?'Pause motion':'Enable motion';$('.motion-toggle').setAttribute('aria-pressed',String(motion));if(!motion)stopAnimations(); }
  $('.motion-toggle').addEventListener('click',()=>{motion=!motion;const url=new URL(location.href);url.searchParams.delete('motion');try{history.replaceState(null,'',url);}catch{}syncMotion();});
  syncMotion();sync();
  const toggle=$('.menu-toggle'), nav=$('#site-nav');
  const closeMenu=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
  matchMedia('(max-width: 950px)').addEventListener('change',closeMenu);
  document.documentElement.classList.add('menu-ready');
  let bag=read('vybe-bag',[]);
  if(!Array.isArray(bag))bag=[];
  bag=bag.filter(x=>products.some(p=>p.id===x.id)&&['S','M','L','XL'].includes(x.size)&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<100);
  function renderBag(){
    $('[data-bag-count]').textContent=bag.reduce((n,x)=>n+x.quantity,0);
    const items=$('[data-bag-items]');items.replaceChildren();
    if(!bag.length){const p=document.createElement('p');p.textContent='Your next favourite is waiting in the collection.';items.append(p);}
    let total=0;
    bag.forEach((item,i)=>{const p=products.find(p=>p.id===item.id);total+=p.price*item.quantity;const row=document.createElement('div');row.className='bag-row';const img=document.createElement('img');img.src='assets/img/'+p.id+'.webp';img.alt=p.name;const text=document.createElement('div');const title=document.createElement('strong');title.textContent=p.name;const detail=document.createElement('p');detail.textContent=`Size ${item.size} · Qty ${item.quantity} · $${p.price*item.quantity}`;text.append(title,detail);const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+p.name+' size '+item.size);remove.addEventListener('click',()=>{bag.splice(i,1);save('vybe-bag',bag);renderBag();$('[data-close-bag]').focus();});row.append(img,text,remove);items.append(row);});
    $('[data-total]').textContent='$'+total;
    $('[data-enquire]').href='mailto:hello@example.com?subject='+encodeURIComponent('VYBE product enquiry')+'&body='+encodeURIComponent(bag.map(x=>`${products.find(p=>p.id===x.id).name} / ${x.size} / quantity ${x.quantity}`).join('\n')+'\nPlease confirm availability and final price.');
  }
  function add(index){const p=products[index],size=$('[data-size="'+index+'"]').value;const existing=bag.find(x=>x.id===p.id&&x.size===size);if(existing){existing.quantity=Math.min(existing.quantity+1,99);}else{bag.push({id:p.id,size,quantity:1});}save('vybe-bag',bag);renderBag();clearTimeout(toastTimer);$('.toast').textContent=p.name+' · '+size+' added to bag';$('.toast').classList.add('is-visible');toastTimer=setTimeout(()=>$('.toast').classList.remove('is-visible'),2500);}
  document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>add(Number(b.dataset.add))));
  $('[data-add-selected]').addEventListener('click',()=>add(selected));
  $('.bag-toggle').addEventListener('click',()=>$('#bag-dialog').showModal());
  $('[data-close-bag]').addEventListener('click',()=>$('#bag-dialog').close());
  $('#bag-dialog').addEventListener('click',e=>{if(e.target===$('#bag-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
  window.addEventListener('storage',e=>{if(e.key==='vybe-bag'){const value=read('vybe-bag',[]);if(Array.isArray(value)){bag=value.filter(x=>products.some(p=>p.id===x.id)&&['S','M','L','XL'].includes(x.size)&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<100);renderBag();}}});
  window.addEventListener('pagehide',()=>{stopAnimations();clearTimeout(toastTimer);},{once:true});
  renderBag();
})();
