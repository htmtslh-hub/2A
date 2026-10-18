/* Mostar City — finite, demand-driven scroll and pointer animation. */
(() => {
'use strict';
const section=document.querySelector('.cinema-scroll');
const root=document.documentElement;
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const track=document.querySelector('.sights-track');
const sightsControls=document.querySelector('.sights-controls');
const prev=document.querySelector('.sight-prev');
const next=document.querySelector('.sight-next');
const originals=[...document.querySelectorAll('.sight-card')];
const originalSightCount=originals.length;
let targetMouseX=0,targetMouseY=0,mouseX=0,mouseY=0,targetScroll=0,smoothScroll=0;
let initialized=false,rafPending=false,sightCards=[],activeSight=originalSightCount;
let normalizeTimer=0;
const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
const smoothstep=(e0,e1,v)=>{const x=clamp((v-e0)/(e1-e0));return x*x*(3-2*x);};
const lerp=(a,b,t)=>a+(b-a)*t;
const segmentInOut=(s,a,b,c,d)=>{const enter=smoothstep(a,b,s),exit=smoothstep(c,d,s);return {enter,exit,active:enter*(1-exit)};};
const getScrollDistance=()=>clamp(-section.getBoundingClientRect().top,0,section.offsetHeight-innerHeight);
const set=(key,value)=>root.style.setProperty(key,String(value));
function update(){
 rafPending=false;
targetScroll = getScrollDistance();
if (!initialized || reduceMotion.matches) { smoothScroll = targetScroll; initialized = true; }
else { smoothScroll = lerp(smoothScroll, targetScroll, 0.14); }
if (Math.abs(smoothScroll - targetScroll) < 0.08) smoothScroll = targetScroll;

mouseX = lerp(mouseX, targetMouseX, 0.12);
mouseY = lerp(mouseY, targetMouseY, 0.12);

const frame2 = segmentInOut(smoothScroll, 560, 900, 1300, 1620);
const frame3 = segmentInOut(smoothScroll, 1760, 2140, 2540, 2700);
const progress = clamp(smoothScroll / 2700);
const introExit = smoothstep(90, 650, smoothScroll);
const sightsEnterRaw = smoothstep(2760, 3560, smoothScroll);
const sightsEnter = Math.pow(sightsEnterRaw, 1.55);
const sightsControlsEnter = smoothstep(3360, 3660, smoothScroll);
const blurActive = clamp(frame2.active + frame3.active);
const frame2Opacity = frame2.active * (1 - frame3.enter);
const splitDrift = Math.pow(frame2.enter, 1.5);
const panel2Opacity = frame2.active * (1 - frame2.exit);
const panel3Opacity = frame3.active * (1 - frame3.exit);
const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
const sharedHeroY = progress * -74;
const sharedHeroScale = progress * 0.23;
const sightsScreenTop = Math.min(220, Math.max(112, window.innerHeight * 0.19)) - 50;
const sightsParentTop = window.innerHeight - (window.innerHeight - sightsScreenTop) / backScale;

set("--mx", (reduceMotion.matches ? 0 : mouseX).toFixed(4));
set("--my", (reduceMotion.matches ? 0 : mouseY).toFixed(4));
set("--back-opacity", (1 - frame2.active * 0.06));
set("--back-x", `${mouseX * -12}px`);
set("--back-y", `${mouseY * -4}px`);
set("--back-scale", backScale);
set("--four-y", `${10 + progress * 10}vh`);
set("--four-scale", 0.78 + progress * 0.16);
set("--bazaar-y", `${20 - progress * 8}vh`);
set("--blur-px", `${blurActive * 14}px`);
set("--back-brightness", 1 - blurActive * 0.255);
set("--bazaar-blur-px", `${frame2.active * 14}px`);
set("--bazaar-brightness", 1 - frame2.active * 0.255 - frame3.active * 0.06);
set("--bazaar-saturation", 1 + frame3.active * 0.18);
set("--shade-opacity", "1");
set("--shade-z", frame2.active > 0.02 ? "2" : "0");
set("--shade-top-alpha", blurActive * 0.465);
set("--shade-mid-alpha", blurActive * 0.42);
set("--shade-bottom-alpha", blurActive * 0.51);
set("--title-y", `${introExit * -210}px`);
set("--title-scale", 1 - introExit * 0.08);
set("--title-opacity", 1 - introExit);
set("--bridge-x", `calc(-50% + ${mouseX * 18}px)`);
set("--bridge-y", `${mouseY * 8 + sharedHeroY - frame2.exit * 760}px`);
set("--bridge-bottom", `${5 - frame2.enter * 13}vh`);
set("--bridge-width", `${67.2 + frame2.enter * 37.8}vw`);
set("--bridge-scale", 1.02 + sharedHeroScale + frame2.exit * 0.46);
set("--split-left-x", `calc(-50% + ${-splitDrift * 46}vw + ${mouseX * 22}px)`);
set("--split-left-y", `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`);
set("--split-left-scale", 1 + sharedHeroScale + frame2.enter * 0.74);
set("--split-right-x", `calc(-50% + ${ splitDrift * 46}vw + ${mouseX * 22}px)`);
set("--split-right-y", `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`);
set("--split-right-scale", 1 + sharedHeroScale + frame2.enter * 0.74);
set("--frame2-opacity", frame2Opacity);
set("--frame2-x", `calc(-50% + ${mouseX * 10}px)`);
set("--frame2-y", `calc(-50% + ${mouseY * 8 - frame2.exit * 150}px)`);
set("--frame2-scale", 1.06 + frame2.enter * 0.08 + frame2.exit * 0.08);
set("--intro-copy-y", `${introExit * 90}px`);
set("--intro-copy-opacity", 1 - introExit);
set("--panel2-opacity", panel2Opacity);
set("--panel2-y", `calc(-50% + ${-frame2.exit * 86 + (1 - frame2.enter) * 58}px)`);
set("--panel3-opacity", panel3Opacity);
set("--panel3-y", `calc(-50% + ${-frame3.exit * 86 + (1 - frame3.enter) * 58}px)`);
set("--sights-opacity", sightsEnter);
set("--sights-controls-opacity", sightsControlsEnter);
sightsControls.classList.toggle("is-ready", sightsControlsEnter > 0.98);
set("--sights-visibility", sightsEnter > 0.01 ? "visible" : "hidden");
set("--sights-y", "0px");
set("--sights-enter-x", `${(1 - sightsEnter) * 420}vw`);
set("--sights-scale", 1 / backScale);
set("--sights-top", `${sightsParentTop}px`);
set("--sights-screen-top", `${sightsScreenTop}px`);
 const visible=sightsEnter>.01;
 sightCards.forEach(card=>{card.tabIndex=visible?0:-1;});
 prev.tabIndex=next.tabIndex=sightsControlsEnter>.98?0:-1;
 const note=document.querySelector('.note-button');
 note.tabIndex=panel3Opacity>.1?0:-1;
 note.style.pointerEvents=panel3Opacity>.1?'auto':'none';
 if(Math.abs(smoothScroll-targetScroll)>.08 || Math.abs(mouseX-targetMouseX)>.001 || Math.abs(mouseY-targetMouseY)>.001)requestTick();
}
function requestTick(){if(!rafPending){rafPending=true;requestAnimationFrame(update);}}
function updateSightSlider(){
 if(!sightCards.length)return;
 const cardWidth=sightCards[0].offsetWidth;
 const gap=parseFloat(getComputedStyle(track).columnGap||'0');
 set('--sights-shift',`${-(cardWidth+gap)*activeSight}px`);
 sightCards.forEach((card,i)=>card.classList.toggle('is-active',i===activeSight));
}
function jumpSightSlider(i){
 track.classList.add('is-jumping');activeSight=i;updateSightSlider();
 requestAnimationFrame(()=>requestAnimationFrame(()=>track.classList.remove('is-jumping')));
}
function normalizeSightSlider(){
 clearTimeout(normalizeTimer);
 if(activeSight>=originalSightCount*2)jumpSightSlider(activeSight-originalSightCount);
 else if(activeSight<originalSightCount)jumpSightSlider(activeSight+originalSightCount);
}
function moveSightSlider(dir){
 // Keep rapid input inside the three cloned sets before transitionend arrives.
 if(activeSight<=0 || activeSight>=sightCards.length-1)normalizeSightSlider();
 activeSight+=dir;updateSightSlider();scheduleNormalize();
}
function scheduleNormalize(){clearTimeout(normalizeTimer);normalizeTimer=setTimeout(normalizeSightSlider,700);}
function selectSightCard(card){const i=Number(card.dataset.sightIndex);if(Number.isFinite(i)){activeSight=i;updateSightSlider();scheduleNormalize();}}
function setupSightSlider(){
 track.replaceChildren();
 for(let setIndex=0;setIndex<3;setIndex++)originals.forEach((card,cardIndex)=>{
  const clone=card.cloneNode(true);clone.dataset.sightIndex=setIndex*originalSightCount+cardIndex;track.append(clone);
 });
 sightCards=[...track.querySelectorAll('.sight-card')];activeSight=originalSightCount;
 sightCards.forEach(card=>{
  card.addEventListener('click',()=>selectSightCard(card));
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectSightCard(card);}});
 });
 track.addEventListener('transitionend',event=>{if(event.target===track&&event.propertyName==='transform')normalizeSightSlider();});
 updateSightSlider();
}
window.addEventListener('scroll',requestTick,{passive:true});
window.addEventListener('resize',()=>{updateSightSlider();requestTick();});
window.addEventListener('pointermove',event=>{
 targetMouseX=event.clientX/innerWidth-.5;targetMouseY=event.clientY/innerHeight-.5;
 if(reduceMotion.matches)targetMouseX=targetMouseY=0;
 requestTick();
},{passive:true});
reduceMotion.addEventListener('change',()=>{targetMouseX=targetMouseY=0;requestTick();});
prev.addEventListener('click',()=>moveSightSlider(-1));next.addEventListener('click',()=>moveSightSlider(1));
// Required hrefs map onto the continuous cinematic timeline.
const stops={'#cinema':0,'#bridge':1060,'#bazaar':2320,'#routes':3700};
function goTo(hash){const offset=stops[hash];if(offset===undefined)return;window.scrollTo({top:section.offsetTop+offset,behavior:reduceMotion.matches?'instant':'smooth'});}
document.querySelectorAll('.site-nav a,.site-logo').forEach(a=>a.addEventListener('click',event=>{event.preventDefault();history.replaceState(null,'',a.getAttribute('href'));goTo(a.getAttribute('href'));}));
const dialog=document.querySelector('.info-dialog');
function openInfo(title,copy){document.querySelector('#dialog-title').textContent=title;document.querySelector('.dialog-copy').textContent=copy;dialog.showModal();}
document.querySelector('.note-button').addEventListener('click',()=>openInfo('Old town notes',"Stone lanes, mosque courtyards, copper stalls, and riverside coffee stay within a short walk of Stari Most. Explore Kujundziluk, then return to the Neretva for the view of the bridge."));
document.querySelector('.language-switcher').addEventListener('click',()=>openInfo('Language: English','This demo is available in English. Additional translations have not been included.'));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
setupSightSlider();requestTick();
if(location.hash in stops)goTo(location.hash);
})();
