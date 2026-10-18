import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import assets from './assets.json';
import './styles.css';

type Project = typeof assets.projects[number];
type DialogContent = { kind:'contact' } | { kind:'project'; project:Project } | null;
const FadeDiv=motion.create('div');

function FadeIn({children,delay=0,duration=.7,x=0,y=30,className=''}:{children:ReactNode;delay?:number;duration?:number;x?:number;y?:number;className?:string}) {
  const Component=FadeDiv;
  return <Component className={className} initial={{opacity:0,x,y}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,margin:'50px',amount:0}} transition={{delay,duration,ease:[.25,.1,.25,1]}}>{children}</Component>;
}

function ContactButton({onClick}:{onClick:()=>void}) {
  return <button type="button" onClick={onClick} className="contact-button rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest">Contact Me</button>;
}

function Magnet({children,padding=150,strength=3,activeTransition='transform 0.3s ease-out',inactiveTransition='transform 0.6s ease-in-out'}:{children:ReactNode;padding?:number;strength?:number;activeTransition?:string;inactiveTransition?:string}) {
  const ref=useRef<HTMLDivElement>(null);const frame=useRef(0);
  useEffect(()=>{
    const element=ref.current;if(!element)return;
    const move=(event:PointerEvent)=>{
      if(event.pointerType==='touch')return;
      cancelAnimationFrame(frame.current);
      frame.current=requestAnimationFrame(()=>{
        const bounds=element.parentElement!.getBoundingClientRect();
        const x=event.clientX-(bounds.left+bounds.width/2),y=event.clientY-(bounds.top+bounds.height/2);
        const active=Math.abs(x)<bounds.width/2+padding&&Math.abs(y)<bounds.height/2+padding;
        element.style.transition=active?activeTransition:inactiveTransition;
        element.style.transform=active?`translate3d(${x/strength}px,${y/strength}px,0)`:'translate3d(0,0,0)';
      });
    };
    const leave=()=>{element.style.transition=inactiveTransition;element.style.transform='translate3d(0,0,0)';};
    window.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('pointerleave',leave);
    return()=>{cancelAnimationFrame(frame.current);window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',leave);};
  },[padding,strength,activeTransition,inactiveTransition]);
  return <div ref={ref} className="magnet" style={{willChange:'transform'}}>{children}</div>;
}

function HeroSection({contact}:{contact:()=>void}) {
  return <section className="hero relative h-screen flex flex-col" style={{overflowX:'clip'}} aria-label="Jack, 3D Creator">
    <FadeIn delay={0} y={-20} className="relative z-30"><nav aria-label="Main navigation" className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA]">
      <a href="#about">About</a><a href="#services">Price</a><a href="#projects">Projects</a><a href="#contact" onClick={e=>{e.preventDefault();contact();}}>Contact</a>
    </nav></FadeIn>
    <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5"><FadeIn delay={.15} y={40}><h1 className="hero-heading w-full whitespace-nowrap font-black uppercase tracking-tight leading-none text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">Hi, i&apos;m jack</h1></FadeIn></div>
    <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
      <FadeIn delay={.35} y={20}><p className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(.75rem,1.4vw,1.5rem)]">a 3d creator driven by crafting striking and unforgettable projects</p></FadeIn>
      <FadeIn delay={.5} y={20}><ContactButton onClick={contact}/></FadeIn>
    </div>
    <div className="hero-portrait absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
      <FadeIn delay={.6} y={30}><Magnet><img src={assets.portrait} alt="Jack, 3D creator" className="block w-full h-auto" fetchPriority="high"/></Magnet></FadeIn>
    </div>
  </section>;
}

function StudyTile({src,index,hidden}:{src:string;index:number;hidden:boolean}) {
  const [failed,setFailed]=useState(false);
  return <div className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#17191c] grid place-items-center" aria-hidden={hidden||undefined}>{failed?<span className="text-sm uppercase tracking-widest text-[#D7E2EA]/50">Preview unavailable</span>:<img src={src} loading="lazy" decoding="async" onError={()=>setFailed(true)} alt={hidden?'':`Motion design study ${index}`} className="w-full h-full object-cover"/>}</div>;
}

function MarqueeSection() {
  const ref=useRef<HTMLElement>(null);const [offset,setOffset]=useState(0);
  useEffect(()=>{
    let frame=0;const update=()=>{frame=0;const element=ref.current;if(element)setOffset((window.scrollY-(element.getBoundingClientRect().top+window.scrollY)+window.innerHeight)*.3);};
    const tick=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener('scroll',tick,{passive:true});window.addEventListener('resize',tick);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',tick);window.removeEventListener('resize',tick);};
  },[]);
  return <section ref={ref} className="marquee overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-10" aria-label="Motion design inspiration">
    <div className="flex flex-col gap-3">{[assets.gifs.slice(0,11),assets.gifs.slice(11)].map((row,rowIndex)=><div key={rowIndex} className="marquee-track flex gap-3 w-max" style={{marginLeft:-(row.length*432),transform:`translateX(${rowIndex===0?offset-200:-(offset-200)}px)`,willChange:'transform'}}>
      {[...row,...row,...row].map((src,i)=><StudyTile key={i} src={src} index={rowIndex===0?i+1:i+12} hidden={i>=row.length}/>)}</div>)}</div>
  </section>;
}

function Character({char,index,length,progress}:{char:string;index:number;length:number;progress:MotionValue<number>}) {
  const opacity=useTransform(progress,[index/length,(index+1)/length],[.2,1]);
  return <span className="relative"><span className="invisible">{char}</span><motion.span aria-hidden="true" className="absolute left-0 top-0" style={{opacity}}>{char}</motion.span></span>;
}
const biography="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";
function AnimatedText() {
  const ref=useRef<HTMLParagraphElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start 0.8','end 0.2']});
  let index=0;
  return <p ref={ref} aria-label={biography} className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]">{biography.split(' ').map((word,i)=><React.Fragment key={i}><span className="inline-block whitespace-nowrap" aria-hidden="true">{[...word].map(char=>{const position=index++;return <Character key={position} char={char} index={position} length={biography.length} progress={scrollYProgress}/>;})}</span>{' '}{(index++,null)}</React.Fragment>)}</p>;
}

function AboutSection({contact}:{contact:()=>void}) {
  const positions=['top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]','bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]','top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]','bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]'];
  return <section id="about" className="about relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20">
    {assets.decor.map((src,i)=><FadeIn key={src} className={`absolute pointer-events-none ${positions[i]}`} delay={[.1,.25,.15,.3][i]} x={i<2?-80:80} y={0} duration={.9}><img src={src} alt="" className="w-full h-auto" loading="lazy"/></FadeIn>)}
    <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24"><div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16"><FadeIn y={40}><h2 className="hero-heading section-heading">About me</h2></FadeIn><AnimatedText/></div><ContactButton onClick={contact}/></div>
  </section>;
}

const services=[
  ['3D Modeling','Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.'],
  ['Rendering','High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.'],
  ['Motion Design','Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.'],
  ['Branding','Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.'],
  ['Web Design','Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.']];
function ServicesSection() {
  return <section id="services" className="services bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <FadeIn><h2 className="section-heading mb-16 sm:mb-20 md:mb-28">Services</h2></FadeIn>
    <div className="max-w-5xl mx-auto">{services.map(([title,description],i)=><FadeIn key={title} delay={i*.1}><article className="service-item flex gap-6 sm:gap-12 md:gap-24 py-8 sm:py-10 md:py-12 border-t border-[#0c0c0c26]"><span className="number shrink-0">{String(i+1).padStart(2,'0')}</span><div className="self-center"><h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)]">{title}</h3><p className="mt-3 font-light leading-relaxed max-w-2xl text-[clamp(.85rem,1.6vw,1.25rem)] opacity-60">{description}</p></div></article></FadeIn>)}</div>
  </section>;
}

function ProjectCard({project,index,total,open}:{project:Project;index:number;total:number;open:()=>void}) {
  const ref=useRef<HTMLDivElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start end','start start']});
  const targetScale=1-(total-1-index)*.03;const scale=useTransform(scrollYProgress,[0,1],[1,targetScale]);
  return <div ref={ref} className="project-container h-[85vh] relative"><motion.article className="project-card sticky top-24 md:top-32 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8" style={{scale,top:`calc(var(--stack-top) + ${index*28}px)`}}>
    <div className="project-meta flex flex-wrap items-center justify-between gap-x-5 gap-y-4 mb-6 md:mb-8"><span className="number">{String(index+1).padStart(2,'0')}</span><div className="project-label"><p className="uppercase font-light text-sm text-[#D7E2EA]/60 mb-1">{project.category}</p><h3 className="uppercase text-lg sm:text-2xl md:text-3xl font-medium">{project.name}</h3></div><button type="button" onClick={open} className="live-button rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors">Live Project</button></div>
    <div className="project-images grid grid-cols-[2fr_3fr] gap-3 sm:gap-4 md:gap-6"><div className="flex flex-col gap-3 sm:gap-4 md:gap-6"><img src={project.images[0]} alt={`${project.name} design detail`} loading="lazy" className="project-image h-[clamp(130px,16vw,230px)]"/><img src={project.images[1]} alt={`${project.name} composition`} loading="lazy" className="project-image h-[clamp(160px,22vw,340px)]"/></div><img src={project.images[2]} alt={`${project.name} full artwork`} loading="lazy" className="project-image h-full min-h-0"/></div>
  </motion.article></div>;
}
function ProjectsSection({open}:{open:(project:Project)=>void}) {
  return <section id="projects" className="projects relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24">
    <FadeIn><h2 className="hero-heading section-heading mb-16 sm:mb-20 md:mb-28">Project</h2></FadeIn>
    <div className="max-w-[1440px] mx-auto">{assets.projects.map((project,index)=><ProjectCard key={project.name} project={project} index={index} total={assets.projects.length} open={()=>open(project)}/>)}</div>
  </section>;
}

function App() {
  const [content,setContent]=useState<DialogContent>(null);const dialog=useRef<HTMLDialogElement>(null);const previous=useRef<HTMLElement|null>(null);
  const open=(value:DialogContent)=>{previous.current=document.activeElement as HTMLElement;setContent(value);};
  useEffect(()=>{if(content&&!dialog.current?.open)dialog.current?.showModal();},[content]);
  return <><main className="page" style={{overflowX:'clip'}}><HeroSection contact={()=>open({kind:'contact'})}/><MarqueeSection/><AboutSection contact={()=>open({kind:'contact'})}/><ServicesSection/><ProjectsSection open={project=>open({kind:'project',project})}/></main>
    <dialog ref={dialog} className="portfolio-dialog" aria-labelledby="dialog-title" onClose={()=>{if(!dialog.current?.open){setContent(null);previous.current?.focus();}}} onClick={event=>{if(event.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.current.close();}}}>
      <button className="dialog-close" type="button" aria-label="Close preview" onClick={()=>dialog.current?.close()}><X size={24}/></button>
      <p className="uppercase tracking-widest text-sm text-[#D7E2EA]/60 mb-4">{content?.kind==='project'?'Project preview':'Start a conversation'}</p>
      <h2 id="dialog-title" className="text-4xl sm:text-6xl uppercase font-medium mb-6">{content?.kind==='project'?content.project.name:"Let's build something incredible."}</h2>
      {content?.kind==='project'?<><p className="text-[#D7E2EA]/70 mb-6">Visual portfolio demo. An external live project URL has not been connected.</p><div className="grid gap-4">{content.project.images.map((src,i)=><img key={src} src={src} alt={`${content.project.name} preview ${i+1}`} className="w-full rounded-2xl"/>)}</div></>:<p className="text-lg text-[#D7E2EA]/70 max-w-xl">Jack is a fictional creator in this portfolio demo. Add your real email or booking URL to connect this contact action. No message is sent from this demo. <ArrowUpRight className="inline ml-2" size={20}/></p>}
    </dialog>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
