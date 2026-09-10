/* TỰ ĐỘNG SINH từ _src/Agentic.dc.html — chạy `npm run convert` để tạo lại.
   Không sửa tay file này. */
/* eslint-disable @typescript-eslint/no-explicit-any -- biến vòng lặp của sc-for không suy được kiểu */
/* eslint-disable react-hooks/refs -- vm là object thường, quy tắc nhận nhầm mọi truy cập thuộc tính là ref */
'use client';
import React from 'react';
import ImageSlot from '@/components/ImageSlot';
import type { View } from '@/lib/view';

export default function AgenticMarkup({ vm }: { vm: View }) {
  return (
    <>
      <div style={{ minHeight: "100vh", color: "#ffffff", backgroundColor: "#16181c", backgroundImage: "radial-gradient(120% 46% at 50% 0%, #21252d 0%, rgba(33,37,45,0) 62%), radial-gradient(78% 34% at 88% 22%, var(--acc-a08), transparent 66%), radial-gradient(86% 32% at 8% 48%, rgba(240,166,60,.055), transparent 64%), radial-gradient(80% 30% at 92% 72%, var(--acc-a08), transparent 66%), linear-gradient(180deg, rgba(18,19,23,0) 62%, #131418 100%)", overflowX: "hidden" }}>
        <div style={{ position: "fixed", top: "0", left: "0", right: "0", height: "2px", zIndex: "60", pointerEvents: "none" }} aria-hidden="true">
          <div style={{ height: "100%", width: "100%", transform: "scaleX(0)", transformOrigin: "0 50%", background: "linear-gradient(90deg, rgba(255,255,255,.25) 0%, var(--acc) 55%, #ffffff 100%)", boxShadow: "0 0 12px -2px var(--acc)" }} id="scroll-progress" />
        </div>
        {/* ===== DYNAMIC ISLAND NAV ===== */}
        <header style={{ position: "fixed", top: "32px", left: "0", right: "0", zIndex: "50", display: "flex", justifyContent: "center", padding: "0 16px", pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "50%", top: "28px", transform: "translate(-120px,44px)", width: "52px", height: "52px", margin: "-26px 0 0 -26px", pointerEvents: "none", willChange: "transform", transition: "transform 2.4s cubic-bezier(.42,0,.35,1)" }} ref={vm.botRef} data-bot="" aria-hidden="true">
            <div style={{ width: "100%", height: "100%", transition: "transform .22s ease" }} data-bot-flip="">
              <div style={{ width: "100%", height: "100%", animation: "botBob 2.8s ease-in-out infinite", filter: "drop-shadow(0 6px 14px rgba(0,0,0,.45))" }}>
                <svg style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }} viewBox="0 0 100 100">
                  <ellipse cx="24" cy="62" rx="17" ry="8" transform="rotate(-24 24 62)" fill="#f2f5fb" stroke="#1b2a6b" strokeWidth="4" />
                  <ellipse cx="76" cy="58" rx="17" ry="8" transform="rotate(22 76 58)" fill="#f2f5fb" stroke="#1b2a6b" strokeWidth="4" />
                  <path d="M30 22 L26 8 L34 6 L38 20 Z" fill="#2fb8f5" stroke="#1b2a6b" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M70 22 L74 8 L66 6 L62 20 Z" fill="#2fb8f5" stroke="#1b2a6b" strokeWidth="4" strokeLinejoin="round" />
                  <rect x="42" y="52" width="16" height="34" rx="8" fill="#f2f5fb" stroke="#1b2a6b" strokeWidth="4" />
                  <ellipse cx="50" cy="66" rx="27" ry="24" fill="#ffffff" stroke="#1b2a6b" strokeWidth="4" />
                  <path d="M38 62 h24 a12 12 0 0 1 -24 0 z" fill="#2fb8f5" stroke="#1b2a6b" strokeWidth="4" strokeLinejoin="round" />
                  <ellipse cx="50" cy="36" rx="32" ry="28" fill="#ffffff" stroke="#1b2a6b" strokeWidth="4" />
                  <ellipse cx="50" cy="35" rx="23" ry="17" fill="#16267e" stroke="#1b2a6b" strokeWidth="3" />
                  <path d="M38 36 q4 -6 8 0" fill="none" stroke="#2fe0f5" strokeWidth="4" strokeLinecap="round" />
                  <path d="M54 36 q4 -6 8 0" fill="none" stroke="#2fe0f5" strokeWidth="4" strokeLinecap="round" />
                  <rect x="44" y="2" width="12" height="10" rx="5" fill="#ffffff" stroke="#1b2a6b" strokeWidth="4" />
                </svg>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", isolation: "isolate", pointerEvents: "auto", maxWidth: "min(100%,980px)", overflow: "hidden", borderRadius: "34px", background: "rgba(10,11,13,.82)", border: "1px solid rgba(255,255,255,.13)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.16), 0 18px 44px rgba(0,0,0,.5)", animation: "islandIn .5s cubic-bezier(.22,1,.36,1) both", transition: "max-height .9s cubic-bezier(.19,1,.22,1), border-radius .8s cubic-bezier(.19,1,.22,1), box-shadow .8s ease" }} data-island="" onMouseEnter={vm.openIsland} onMouseLeave={vm.closeIsland}>
            <span style={{ position: "absolute", inset: "0", zIndex: "3", borderRadius: "inherit", padding: "1.5px", overflow: "hidden", pointerEvents: "none", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" }} aria-hidden="true">
              <span style={{ position: "absolute", top: "50%", left: "50%", width: "130%", aspectRatio: "1", transform: "translate(-50%,-50%)", background: "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, var(--acc-a00) 300deg, var(--acc-a45) 340deg, var(--acc) 353deg, #ffffff 360deg)", animation: "islandLed 4.5s linear infinite" }} />
            </span>
            <span style={{ position: "absolute", inset: "0", zIndex: "0", borderRadius: "inherit", pointerEvents: "none", backdropFilter: "blur(26px) saturate(160%)", WebkitBackdropFilter: "blur(26px) saturate(160%)" }} aria-hidden="true" />
            <div style={{ position: "relative", zIndex: "2", display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "56px", padding: "0 20px", maxWidth: "340px", overflow: "hidden", whiteSpace: "nowrap", cursor: "pointer", transition: "max-width .95s cubic-bezier(.19,1,.22,1), opacity .5s cubic-bezier(.4,0,.2,1), padding .85s cubic-bezier(.19,1,.22,1)" }} data-island-mini="" onClick={vm.toggleIsland}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "var(--acc)", boxShadow: "0 0 12px var(--acc-a55)", display: "inline-block", flex: "none" }} />
                <span style={{ fontFamily: "var(--display)", fontWeight: "700", letterSpacing: ".13em", fontSize: "13px", color: "#ffffff" }}>
                  AGENTIC
                </span>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(236,238,241,.3)", flex: "none" }} />
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff", letterSpacing: ".02em" }}>
                  {vm.activeTabLabel}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 9px", height: "56px", maxWidth: "0", opacity: "0", overflow: "hidden", transition: "max-width 1s cubic-bezier(.19,1,.22,1), opacity .6s cubic-bezier(.4,0,.2,1) .12s, padding .85s cubic-bezier(.19,1,.22,1)" }} data-island-full="">
                <button style={{ display: "flex", alignItems: "center", gap: "9px", flex: "none", padding: "0 12px 0 8px", height: "42px", border: "none", background: "transparent", cursor: "pointer", color: "#ffffff", fontFamily: "inherit" }} onClick={vm.goHome} aria-label="Agentic">
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "var(--acc)", boxShadow: "0 0 12px var(--acc-a55)", display: "inline-block", flex: "none" }} />
                  <span style={{ fontFamily: "var(--display)", fontWeight: "700", letterSpacing: ".13em", fontSize: "14px" }}>
                    AGENTIC
                  </span>
                </button>
                <span style={{ width: "1px", height: "22px", background: "rgba(255,255,255,.14)", flex: "none" }} />
                <nav style={{ display: "flex", alignItems: "center", gap: "2px", minWidth: "0", overflow: "hidden" }} aria-label={vm.t.navAria} data-island-tabs="">
                  {(vm.tabs ?? []).map((tb: any, tb_i: number) => (
                        <button key={tb_i} style={{ flex: "none", padding: "0 15px", height: "42px", border: "1px solid transparent", borderRadius: "100px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", letterSpacing: ".01em", whiteSpace: "nowrap", background: "transparent", color: "#ffffff", transition: "background .32s cubic-bezier(.22,1,.36,1), color .28s ease, border-color .28s ease" }} onClick={tb.onSelect} data-tab-pill={tb.key}>
                          {tb.label}
                        </button>
                    ))}
                </nav>
                <div style={{ flex: "1", minWidth: "4px" }} />
                <button className="hv0" style={{ flex: "none", display: "inline-flex", alignItems: "center", height: "42px", padding: "0 20px", borderRadius: "100px", fontFamily: "inherit", fontSize: "13px", fontWeight: "700", letterSpacing: ".02em", whiteSpace: "nowrap", cursor: "pointer", background: "linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)", border: "1px solid rgba(255,255,255,.32)", color: "#fffdfa", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35), 0 10px 22px -8px rgba(255,244,230,.5)" }} onClick={vm.openAuth}>
                  {vm.t.navCta}
                </button>
                <button className="hv1" style={{ flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "42px", height: "42px", padding: "0 13px", border: "1px solid rgba(255,255,255,.2)", borderRadius: "100px", background: "rgba(255,255,255,.07)", cursor: "pointer", fontFamily: "inherit", fontSize: "11px", fontWeight: "700", letterSpacing: ".08em", color: "#c8ced6" }} onClick={vm.toggleIsland} aria-label="Language" data-island-lang="">
                  {vm.langCode}
                </button>
                <button className="hv2" style={{ flex: "none", display: "inline-flex", flexDirection: "column", gap: "5px", justifyContent: "center", alignItems: "center", width: "42px", height: "42px", border: "1px solid rgba(255,255,255,.2)", borderRadius: "50%", background: "rgba(255,255,255,.07)", cursor: "pointer" }} onClick={vm.toggleMenu} aria-label="Menu" data-island-burger="">
                  <span style={{ width: "15px", height: "1.5px", background: "#eceef1", display: "block" }} />
                  <span style={{ width: "15px", height: "1.5px", background: "#eceef1", display: "block" }} />
                </button>
              </div>
            </div>
            <div style={{ padding: "0 18px 14px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "14px", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.08)", margin: "0 9px" }} data-island-row2="">
              <span style={{ paddingTop: "12px", fontSize: "12px", color: "#ffffff", letterSpacing: ".04em" }}>
                {vm.t.tagline}
              </span>
              <div style={{ paddingTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <a className="hv3" style={{ fontSize: "12px", color: "#ffffff", letterSpacing: ".03em" }} href={`mailto:${vm.contactEmail}`}>
                  {vm.contactEmail}
                </a>
                <div style={{ display: "flex", alignItems: "center", gap: "2px", padding: "3px", border: "1px solid rgba(236,238,241,.14)", borderRadius: "100px", background: "rgba(255,255,255,.06)" }}>
                  {(vm.langOptions ?? []).map((lg: any, lg_i: number) => (
                        <button key={lg_i} style={{ padding: "6px 12px", border: "none", borderRadius: "100px", cursor: "pointer", fontFamily: "inherit", fontSize: "11px", fontWeight: "700", letterSpacing: ".08em", transition: "background .25s ease, color .25s ease" }} onClick={lg.onSelect} aria-label={lg.aria} data-lang-pill={lg.code}>
                          {lg.label}
                        </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* ===== FULLSCREEN MENU ===== */}
        {(vm.menuOpen) ? (
          <>
            <nav style={{ position: "fixed", inset: "0", zIndex: "60", display: "flex", flexDirection: "column", padding: "26px clamp(20px,4vw,56px)", animation: "riseIn .35s ease both" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--display)", fontWeight: "700", letterSpacing: ".14em", fontSize: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--acc)" }} />
                  AGENTIC
                </span>
                <button className="hv4" style={{ width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(236,238,241,.28)", background: "transparent", color: "#ffffff", fontSize: "22px", cursor: "pointer" }} onClick={vm.toggleMenu} aria-label="Close">
                  ×
                </button>
              </div>
              <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(4px,1.4vh,14px)" }}>
                {(vm.navLinks ?? []).map((link: any, link_i: number) => (
                      <button key={link_i} className="hv3" style={{ textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "0", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(30px,6.2vw,70px)", lineHeight: "1.1", color: "#ffffff", display: "flex", alignItems: "baseline", gap: "18px" }} onClick={link.onSelect}>
                        <span style={{ fontFamily: "var(--body)", fontSize: "14px", color: "#ffffff", letterSpacing: ".1em" }}>
                          {link.no}
                        </span>
                        {link.label} 
                      </button>
                  ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", justifyContent: "space-between", color: "#ffffff", fontSize: "13px", letterSpacing: ".04em", borderTop: "1px solid rgba(236,238,241,.12)", paddingTop: "20px" }}>
                <span>
                  {vm.contactEmail}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "2px", padding: "4px", border: "1px solid rgba(236,238,241,.16)", borderRadius: "100px", background: "rgba(255,255,255,.06)" }}>
                  {(vm.langOptions ?? []).map((lg: any, lg_i: number) => (
                        <button key={lg_i} style={{ padding: "8px 15px", border: "none", borderRadius: "100px", cursor: "pointer", fontFamily: "inherit", fontSize: "12px", fontWeight: "700", letterSpacing: ".08em", transition: "background .25s ease, color .25s ease" }} onClick={lg.onSelect} aria-label={lg.aria} data-lang-pill={lg.code}>
                          {lg.label}
                        </button>
                    ))}
                </div>
                <span>
                  {vm.t.tagline}
                </span>
              </div>
            </nav>
          </>
        ) : null}
        <main>
          <h1 className="sr-only">
            {vm.pageH1}
          </h1>
          {/* ===== TAB: HOME — hero only ===== */}
          {(vm.isHome) ? (
            <>
              <section style={{ position: "relative", zIndex: "5", minHeight: "100vh", padding: "clamp(96px,14vh,150px) clamp(20px,4vw,56px) clamp(36px,5vh,56px)" }} id="top">
                <div style={{ position: "absolute", inset: "0", overflow: "hidden", zIndex: "0" }}>
                  <div style={{ position: "absolute", top: "-14%", left: "-4%", right: "-4%", bottom: "-2%", zIndex: "0", willChange: "transform" }} id="hero-bg-wrap">
                    {(vm.heroBgs ?? []).map((bg: any, bg_i: number) => (
                          <video key={bg_i} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", transformOrigin: "center", transition: "opacity 1s ease, transform 1.6s cubic-bezier(.16,1,.3,1), filter 1.2s ease", willChange: "opacity, transform, filter" }} aria-hidden="true" data-hero-bg="" poster={bg.poster} muted loop playsInline preload="none" />
                      ))}
                    <div style={{ position: "absolute", inset: "0", background: "radial-gradient(90% 70% at 80% 30%, var(--acc-a14), transparent 62%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(18,20,24,.82) 0%, rgba(18,20,24,.62) 34%, rgba(18,20,24,.74) 72%, rgba(18,20,24,.96) 100%)", pointerEvents: "none", left: "3px", top: "-17px" }} />
                    <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(18,20,24,.9) 0%, rgba(18,20,24,.72) 32%, rgba(18,20,24,.18) 60%, transparent 78%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "26%", pointerEvents: "none", backdropFilter: "blur(22px) saturate(115%)", WebkitBackdropFilter: "blur(22px) saturate(115%)", maskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 46%, #000 100%)", WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 46%, #000 100%)" }} aria-hidden="true" />
                    <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "22%", pointerEvents: "none", background: "linear-gradient(180deg, rgba(19,21,25,0) 0%, rgba(19,21,25,.55) 55%, rgba(19,21,25,.92) 100%)" }} aria-hidden="true" />
                  </div>
                </div>
                <div style={{ position: "absolute", zIndex: "4", top: "clamp(14px,1.5vw,26px)", left: "clamp(14px,1.5vw,26px)", right: "clamp(14px,1.5vw,26px)", bottom: "0", borderRadius: "clamp(20px,2vw,32px)", border: "1px solid rgba(236,238,241,.16)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.14), inset 0 0 90px rgba(0,0,0,.34)", pointerEvents: "none" }} aria-hidden="true">
                  <span style={{ position: "absolute", top: "-1px", left: "-1px", width: "46px", height: "46px", borderTop: "2px solid var(--acc)", borderLeft: "2px solid var(--acc)", borderTopLeftRadius: "clamp(20px,2vw,32px)" }} />
                  <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "46px", height: "46px", borderTop: "2px solid var(--acc)", borderRight: "2px solid var(--acc)", borderTopRightRadius: "clamp(20px,2vw,32px)" }} />
                  <span style={{ position: "absolute", bottom: "-1px", left: "-1px", width: "46px", height: "46px", borderBottom: "2px solid var(--acc)", borderLeft: "2px solid var(--acc)", borderBottomLeftRadius: "clamp(20px,2vw,32px)" }} />
                  <span style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "46px", height: "46px", borderBottom: "2px solid var(--acc)", borderRight: "2px solid var(--acc)", borderBottomRightRadius: "clamp(20px,2vw,32px)" }} />
                  <span style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", width: "clamp(90px,16vw,190px)", height: "2px", background: "linear-gradient(90deg, transparent, var(--acc-soft), transparent)" }} />
                  <span style={{ position: "absolute", bottom: "26px", left: "-1px", width: "2px", height: "clamp(50px,9vh,110px)", background: "linear-gradient(180deg, transparent, var(--acc-a55))" }} />
                  <span style={{ position: "absolute", bottom: "26px", right: "-1px", width: "2px", height: "clamp(50px,9vh,110px)", background: "linear-gradient(180deg, transparent, var(--acc-a55))" }} />
                </div>
                <div style={{ position: "relative", zIndex: "2", maxWidth: "1440px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "flex-end", minHeight: "calc(100vh - 200px)" }}>
                  <div style={{ flex: "1 1 420px", minWidth: "min(100%,420px)", animation: "riseIn .7s ease both" }} ref={vm.copyRef}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
                      <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                      <span style={{ fontSize: "13px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                        {vm.t.heroEyebrow}
                      </span>
                    </div>
                    <p style={{ margin: "0 0 14px", fontSize: "clamp(15px,2vw,20px)", fontWeight: "500", color: "#ffffff", letterSpacing: ".02em" }}>
                      {vm.activeKicker}
                    </p>
                    <p style={{ margin: "0", paddingTop: ".06em", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.018em", fontSize: "clamp(44px,8.2vw,108px)", lineHeight: "1.02", textWrap: "balance" }}>
                      {vm.activeTitle}
                    </p>
                    <p style={{ maxWidth: "440px", margin: "26px 0 0", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: "1.65", color: "#ffffff" }}>
                      {vm.activeBlurb}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "18px", marginTop: "34px", flexWrap: "wrap" }}>
                      <button className="hv5" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 28px", borderRadius: "16px", fontFamily: "inherit", fontWeight: "700", fontSize: "14px", letterSpacing: ".03em", cursor: "pointer", background: "linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)", border: "1px solid rgba(255,255,255,.32)", color: "#fffdfa", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35), 0 10px 22px -6px rgba(255,244,230,.55), 0 18px 40px rgba(52,42,34,.34)" }} onClick={vm.heroCta}>
                        {vm.heroCtaLabel}
                      </button>
                      <button style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", color: "#ffffff", fontSize: "14px", fontWeight: "600" }} onClick={vm.goProcess}>
                        <span style={{ width: "52px", height: "52px", borderRadius: "50%", border: "1px solid rgba(236,238,241,.4)", display: "inline-flex", alignItems: "center", justifyContent: "center", animation: "pulseRing 2.6s infinite", flex: "none" }}>
                          ▶
                        </span>
                         {vm.t.heroCta2} 
                      </button>
                    </div>
                  </div>
                  <div style={{ flex: "1 1 480px", minWidth: "min(100%,320px)", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", gap: "10px", height: "clamp(300px,42vh,420px)", overflow: "hidden" }} data-herostrip="">
                      {(vm.cards ?? []).map((item: any, item_i: number) => (
                            <div key={item_i} className="hv6" style={{ position: "relative", minWidth: "0", borderRadius: "18px", overflow: "hidden", cursor: "pointer", transition: "flex-basis .6s cubic-bezier(.22,1,.36,1)", border: "1px solid rgba(236,238,241,.12)" }} onClick={item.onSelect} onMouseEnter={item.onSelect} data-hero-card="">
                              <video style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} aria-hidden="true" data-hero-cardvid="" poster={item.poster} muted loop playsInline preload="none" />
                              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(18,20,24,0) 0%, rgba(18,20,24,0) 45%, rgba(18,20,24,.82) 100%)", pointerEvents: "none" }} />
                              <span style={{ position: "absolute", top: "12px", right: "14px", fontFamily: "var(--display)", fontWeight: "700", fontSize: "20px", color: "#ffffff", pointerEvents: "none" }}>
                                {item.no}
                              </span>
                              <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "16px", pointerEvents: "none" }}>
                                <p style={{ margin: "0 0 5px", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "#ffffff", whiteSpace: "nowrap" }}>
                                  {item.kicker}
                                </p>
                                <p style={{ margin: "0", padding: ".08em 0", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.01em", fontSize: "clamp(16px,2.2vw,22px)", textTransform: "uppercase", lineHeight: "1.2", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {item.title}
                                </p>
                              </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button className="hv7" style={{ width: "52px", height: "52px", borderRadius: "50%", border: "1px solid rgba(255,255,255,.28)", background: "linear-gradient(180deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.08) 100%)", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.7), inset 0 1px 0 rgba(255,255,255,.26), 0 10px 24px rgba(52,42,34,.26)", color: "#fffdfa", fontSize: "18px", cursor: "pointer" }} onClick={vm.prev} aria-label="Prev">
                          ←
                        </button>
                        <button className="hv7" style={{ width: "52px", height: "52px", borderRadius: "50%", border: "1px solid rgba(255,255,255,.28)", background: "linear-gradient(180deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.08) 100%)", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.7), inset 0 1px 0 rgba(255,255,255,.26), 0 10px 24px rgba(52,42,34,.26)", color: "#fffdfa", fontSize: "18px", cursor: "pointer" }} onClick={vm.next} aria-label="Next">
                          →
                        </button>
                      </div>
                      <div style={{ fontFamily: "var(--display)", fontWeight: "700", fontSize: "clamp(40px,7vw,72px)", lineHeight: ".8", color: "#ffffff" }}>
                         {vm.indexLabel}
                        <span style={{ color: "#ffffff", fontSize: ".42em", verticalAlign: "top" }}>
                           / {vm.totalLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* HOME: product showcase (ảnh sản phẩm) */}
              <section style={{ position: "relative", marginTop: "-90px", padding: "clamp(48px,7vw,96px) clamp(20px,4vw,56px) clamp(64px,9vw,120px)", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-160px", left: "0", right: "0", height: "340px", zIndex: "2", pointerEvents: "none", background: "linear-gradient(180deg, rgba(19,21,25,0) 0%, rgba(19,21,25,.45) 34%, rgba(19,21,25,.72) 50%, rgba(19,21,25,.3) 76%, rgba(19,21,25,0) 100%)" }} aria-hidden="true">
                  <div style={{ position: "absolute", top: "177px", left: "-6px", height: "200px", zIndex: "3", pointerEvents: "none", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", maskImage: "linear-gradient(180deg, #000 0%, rgba(0,0,0,.6) 45%, rgba(0,0,0,0) 100%)", WebkitMaskImage: "linear-gradient(180deg, #000 0%, rgba(0,0,0,.6) 45%, rgba(0,0,0,0) 100%)" }} aria-hidden="true" />
                </div>
                <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "74%", height: "56%", borderRadius: "50%", background: "var(--acc-a14)", filter: "blur(140px)", pointerEvents: "none" }} aria-hidden="true" />
                <div style={{ position: "relative", zIndex: "1", maxWidth: "1280px", margin: "0 auto" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(24px,3vw,38px)" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                        <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                        <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                          {vm.homeThemeKicker}
                        </span>
                      </div>
                      <h2 style={{ margin: "0", paddingTop: ".06em", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(28px,3.6vw,46px)", lineHeight: "1.08", color: "#ffffff" }}>
                        {vm.homeThemeTitle}
                      </h2>
                    </div>
                    <button className="hv7" style={{ marginTop: "28px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "13px 24px", borderRadius: "14px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "700", background: "linear-gradient(180deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.06) 100%)", backdropFilter: "blur(22px) saturate(150%)", WebkitBackdropFilter: "blur(22px) saturate(150%)", border: "1px solid rgba(255,255,255,.5)", color: "#fffdfa", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.85), inset 0 1px 0 rgba(255,255,255,.45), 0 8px 26px -6px rgba(255,246,232,.5)", position: "relative", overflow: "hidden" }} onClick={vm.goLibrary}>
                      <span style={{ position: "absolute", top: "-20%", bottom: "-20%", left: "0", width: "55%", mixBlendMode: "screen", background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.9) 50%, rgba(255,255,255,0) 100%)", pointerEvents: "none" }} data-sheen="" />
                      <span style={{ position: "relative" }}>
                        {vm.t.tplAll}
                      </span>
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "22px" }}>
                    {(vm.homeTemplates ?? []).map((hp: any, hp_i: number) => (
                          <div key={hp_i} className="hv8" style={{ position: "relative", display: "flex", flexDirection: "column", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(152deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.045) 46%, rgba(255,255,255,.028) 100%)", border: "1px solid rgba(236,238,241,.14)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.20), inset 0 -1px 0 rgba(0,0,0,.18)", transition: "border-color .3s ease, transform .3s ease, box-shadow .3s ease" }} data-reveal="" onMouseEnter={vm.ledOn} onMouseLeave={vm.ledOff}>
                            <span style={{ position: "absolute", inset: "0", zIndex: "6", borderRadius: "24px", padding: "2px", opacity: "0", overflow: "hidden", pointerEvents: "none", transition: "opacity .35s ease", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" }} data-led="">
                              <span style={{ position: "absolute", top: "50%", left: "50%", width: "200%", aspectRatio: "1", background: "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 236deg, var(--acc-a55) 296deg, var(--acc-soft) 336deg, #fffdfa 352deg, rgba(255,255,255,0) 360deg)" }} data-led-spin="" />
                            </span>
                            <div style={{ position: "relative", aspectRatio: "16/11", overflow: "hidden" }}>
                              <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "100%", transform: "translateY(0)", willChange: "transform" }} data-scroller="">
                                <ImageSlot id={`agentic-home-${hp.id}`} shape="rect" fit="cover" placeholder="Ảnh preview giao diện" />
                              </div>
                              <span style={{ position: "absolute", zIndex: "3", top: "8px", right: "6px", bottom: "8px", width: "3px", borderRadius: "3px", background: "rgba(255,255,255,.28)", opacity: "0", transition: "opacity .3s ease", pointerEvents: "none" }} data-scrollbar="" aria-hidden="true" />
                              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(18,20,24,.1) 0%, rgba(18,20,24,.65) 100%)", pointerEvents: "none" }} />
                              <span style={{ position: "absolute", top: "12px", left: "12px", padding: "6px 12px", borderRadius: "100px", background: "rgba(255,255,255,.14)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.24)", fontSize: "11px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: "#ffffff" }}>
                                {hp.catLabel}
                              </span>
                              {(hp.badge) ? (
                                <>
                                  <span style={{ position: "absolute", top: "12px", right: "12px", padding: "6px 12px", borderRadius: "100px", background: "var(--acc)", color: "#ffffff", fontSize: "11px", fontWeight: "700", letterSpacing: ".08em", textTransform: "uppercase" }}>
                                    {hp.badge}
                                  </span>
                                </>
                              ) : null}
                              <button className="hv9" style={{ position: "absolute", left: "12px", right: "12px", bottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "14px", cursor: "pointer", fontFamily: "inherit", background: "linear-gradient(180deg, rgba(255,255,255,.34) 0%, rgba(255,255,255,.18) 100%)", border: "1px solid rgba(255,255,255,.36)", color: "#fffdfa", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.85), 0 8px 18px -6px rgba(255,244,230,.5)", fontSize: "13px", fontWeight: "700", opacity: "0", transition: "opacity .28s ease" }} onClick={hp.onDetail}>
                                {vm.t.tplPreview}
                              </button>
                            </div>
                            <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
                                <h3 style={{ margin: "0", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.01em", fontSize: "22px", lineHeight: "1.15" }}>
                                  {hp.name}
                                </h3>
                                <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--gold)", whiteSpace: "nowrap" }}>
                                  {hp.price}
                                </span>
                              </div>
                              <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.55", color: "#949ba4", flex: "1" }}>
                                {hp.desc}
                              </p>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "4px" }}>
                                {(hp.tags ?? []).map((tg: any, tg_i: number) => (
                                      <span key={tg_i} style={{ padding: "5px 11px", borderRadius: "100px", border: "1px solid rgba(236,238,241,.16)", fontSize: "11px", color: "#ffffff", letterSpacing: ".04em" }}>
                                        {tg}
                                      </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                      ))}
                  </div>
                </div>
              </section>
            </>
          ) : null}
          {/* ===== TAB: LIBRARY ===== */}
          {(vm.isLibrary) ? (
            <>
              <div>
                <div style={{ height: "clamp(84px,10vh,108px)" }} />
                <section style={{ padding: "26px 0", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "clamp(28px,5vw,64px)", width: "max-content", animation: "marquee 26s linear infinite" }}>
                    {(vm.marqueeItems ?? []).map((m: any, m_i: number) => (
                          <span key={m_i} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(28px,5vw,64px)", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: ".04em", fontSize: "clamp(18px,2.2vw,28px)", color: m.color, whiteSpace: "nowrap" }}>
                             {m.label}
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--acc)", display: "inline-block" }} />
                          </span>
                      ))}
                  </div>
                </section>
                <section style={{ position: "relative", padding: "clamp(72px,10vw,130px) clamp(20px,4vw,56px)", overflow: "hidden" }} id="templates">
                  <div style={{ position: "absolute", top: "-8%", left: "-6%", width: "52%", height: "62%", borderRadius: "50%", background: "var(--acc-a18)", filter: "blur(120px)", pointerEvents: "none" }} aria-hidden="true" />
                  <div style={{ position: "absolute", bottom: "-14%", right: "-8%", width: "48%", height: "58%", borderRadius: "50%", background: "rgba(240,166,60,.13)", filter: "blur(130px)", pointerEvents: "none" }} aria-hidden="true" />
                  <div style={{ position: "relative", zIndex: "1", maxWidth: "1280px", margin: "0 auto" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(30px,4vw,46px)" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                          <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                          <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                            {vm.t.tplLabel}
                          </span>
                        </div>
                        <h2 style={{ margin: "0", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(34px,5.5vw,72px)", lineHeight: "1.04", maxWidth: "16ch" }}>
                          {vm.t.tplTitle}
                        </h2>
                      </div>
                      <p style={{ maxWidth: "340px", margin: "0", color: "#949ba4", fontSize: "15px", lineHeight: "1.6" }}>
                        {vm.t.tplIntro}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "clamp(24px,3vw,36px)" }}>
                      {(vm.filters ?? []).map((f: any, f_i: number) => (
                            <button key={f_i} className="hv2" style={{ padding: "10px 18px", borderRadius: "100px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", letterSpacing: ".02em", borderWidth: "1px", borderStyle: "solid", transition: "all .22s ease" }} onClick={f.onSelect} data-filter-chip={f.key}>
                              {f.label}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "22px" }}>
                      {(vm.templates ?? []).map((tp: any, tp_i: number) => (
                            <div key={tp_i} className="hv8" style={{ position: "relative", display: "flex", flexDirection: "column", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(152deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.045) 46%, rgba(255,255,255,.028) 100%)", border: "1px solid rgba(236,238,241,.14)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.20), inset 0 -1px 0 rgba(0,0,0,.18)", transition: "border-color .3s ease, transform .3s ease, box-shadow .3s ease" }} data-reveal="" onMouseEnter={vm.ledOn} onMouseLeave={vm.ledOff}>
                              <span style={{ position: "absolute", inset: "0", zIndex: "6", borderRadius: "24px", padding: "2px", opacity: "0", overflow: "hidden", pointerEvents: "none", transition: "opacity .35s ease", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" }} data-led="">
                                <span style={{ position: "absolute", top: "50%", left: "50%", width: "200%", aspectRatio: "1", background: "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 236deg, var(--acc-a55) 296deg, var(--acc-soft) 336deg, #fffdfa 352deg, rgba(255,255,255,0) 360deg)" }} data-led-spin="" />
                              </span>
                              <div style={{ position: "relative", aspectRatio: "16/11", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "100%", transform: "translateY(0)", willChange: "transform" }} data-scroller="">
                                  <ImageSlot id={`agentic-tpl-${tp.id}`} shape="rect" fit="cover" placeholder="Ảnh preview giao diện" />
                                </div>
                                <span style={{ position: "absolute", zIndex: "3", top: "8px", right: "6px", bottom: "8px", width: "3px", borderRadius: "3px", background: "rgba(255,255,255,.28)", opacity: "0", transition: "opacity .3s ease", pointerEvents: "none" }} data-scrollbar="" aria-hidden="true" />
                                <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(18,20,24,.1) 0%, rgba(18,20,24,.65) 100%)", pointerEvents: "none" }} />
                                <span style={{ position: "absolute", top: "12px", left: "12px", padding: "6px 12px", borderRadius: "100px", background: "rgba(255,255,255,.14)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.24)", fontSize: "11px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: "#ffffff" }}>
                                  {tp.catLabel}
                                </span>
                                {(tp.badge) ? (
                                  <>
                                    <span style={{ position: "absolute", top: "12px", right: "12px", padding: "6px 12px", borderRadius: "100px", background: "var(--acc)", color: "#ffffff", fontSize: "11px", fontWeight: "700", letterSpacing: ".08em", textTransform: "uppercase" }}>
                                      {tp.badge}
                                    </span>
                                  </>
                                ) : null}
                                <button className="hv9" style={{ position: "absolute", left: "12px", right: "12px", bottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "14px", cursor: "pointer", fontFamily: "inherit", background: "linear-gradient(180deg, rgba(255,255,255,.34) 0%, rgba(255,255,255,.18) 100%)", border: "1px solid rgba(255,255,255,.36)", color: "#fffdfa", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.85), 0 8px 18px -6px rgba(255,244,230,.5)", fontSize: "13px", fontWeight: "700", opacity: "0", transition: "opacity .28s ease" }} onClick={tp.onDetail}>
                                  {vm.t.tplPreview}
                                </button>
                              </div>
                              <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
                                  <h3 style={{ margin: "0", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.01em", fontSize: "22px", lineHeight: "1.15" }}>
                                    {tp.name}
                                  </h3>
                                  <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--gold)", whiteSpace: "nowrap" }}>
                                    {tp.price}
                                  </span>
                                </div>
                                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.55", color: "#949ba4", flex: "1" }}>
                                  {tp.desc}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "4px" }}>
                                  {(tp.tags ?? []).map((tg: any, tg_i: number) => (
                                        <span key={tg_i} style={{ padding: "5px 11px", borderRadius: "100px", border: "1px solid rgba(236,238,241,.16)", fontSize: "11px", color: "#ffffff", letterSpacing: ".04em" }}>
                                          {tg}
                                        </span>
                                    ))}
                                </div>
                              </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(30px,4vw,48px)" }}>
                      <button className="hv7" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 28px", borderRadius: "16px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600", background: "linear-gradient(180deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.09) 100%)", border: "1px solid rgba(255,255,255,.26)", color: "#fffdfa", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.75), inset 0 1px 0 rgba(255,255,255,.28), 0 10px 22px -8px rgba(255,244,230,.45), 0 16px 34px rgba(52,42,34,.28)" }} onClick={vm.goPricing}>
                        {vm.t.tplAll}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : null}
          {/* ===== TAB: TEMPLATE DETAIL ===== */}
          {(vm.isDetail) ? (
            <>
              <div>
                <div style={{ height: "clamp(84px,10vh,108px)" }} />
                <section style={{ position: "relative", padding: "clamp(28px,4vw,44px) clamp(20px,4vw,56px) clamp(44px,6vw,72px)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "-14%", right: "-6%", width: "56%", height: "70%", borderRadius: "50%", background: "var(--acc-a14)", filter: "blur(150px)", pointerEvents: "none" }} aria-hidden="true" />
                  <div style={{ position: "relative", zIndex: "1", maxWidth: "1280px", margin: "0 auto" }}>
                    <button className="hv10" style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "clamp(22px,3vw,32px)", padding: "9px 16px 9px 12px", borderRadius: "100px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", color: "#ffffff", background: "rgba(255,255,255,.06)", border: "1px solid rgba(236,238,241,.16)", transition: "background .25s ease, border-color .25s ease" }} onClick={vm.closeDetail}>
                      ← {vm.t.dBack}
                    </button>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(28px,4vw,52px)", alignItems: "start" }}>
                      <div style={{ position: "relative", borderRadius: "26px", overflow: "hidden", border: "1px solid rgba(236,238,241,.16)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 30px 70px -30px rgba(0,0,0,.8)" }} data-reveal="">
                        <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "11px 14px", background: "rgba(255,255,255,.06)", borderBottom: "1px solid rgba(236,238,241,.12)" }}>
                          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,.22)" }} />
                          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,.22)" }} />
                          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,.22)" }} />
                          <span style={{ marginLeft: "10px", padding: "4px 14px", borderRadius: "100px", background: "rgba(0,0,0,.3)", fontSize: "11px", color: "#949ba4", letterSpacing: ".04em" }}>
                            agentic.vn/{vm.detail.id}
                          </span>
                        </div>
                        <div style={{ position: "relative", aspectRatio: "16/11", overflow: "hidden" }}>
                          <ImageSlot id={vm.detail.slotId} shape="rect" fit="cover" placeholder="Ảnh preview giao diện" />
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                          <span style={{ padding: "6px 13px", borderRadius: "100px", background: "rgba(255,255,255,.09)", border: "1px solid rgba(236,238,241,.14)", fontSize: "11px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: "#ffffff" }}>
                            {vm.detail.catLabel}
                          </span>
                          {(vm.detail.badge) ? (
                            <>
                              <span style={{ padding: "6px 13px", borderRadius: "100px", background: "var(--acc)", color: "#ffffff", fontSize: "11px", fontWeight: "700", letterSpacing: ".08em", textTransform: "uppercase" }}>
                                {vm.detail.badge}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <p style={{ margin: "0 0 14px", paddingTop: ".06em", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.025em", fontSize: "clamp(36px,5vw,60px)", lineHeight: "1.04" }}>
                          {vm.detail.name}
                        </p>
                        <p style={{ margin: "0 0 26px", fontSize: "clamp(15px,1.4vw,17px)", lineHeight: "1.65", color: "#949ba4", maxWidth: "46ch", textWrap: "pretty" }}>
                          {vm.detail.desc}
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "30px" }}>
                          {(vm.detail.tags ?? []).map((tg: any, tg_i: number) => (
                                <span key={tg_i} style={{ padding: "6px 13px", borderRadius: "100px", border: "1px solid rgba(236,238,241,.16)", fontSize: "12px", color: "#ffffff", letterSpacing: ".03em" }}>
                                  {tg}
                                </span>
                            ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "24px" }}>
                          <span style={{ fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(38px,4.4vw,52px)", color: "var(--gold)" }}>
                            {vm.detail.price}
                          </span>
                          <span style={{ fontSize: "13px", color: "#949ba4" }}>
                            {vm.t.pricingUnitOnce}
                          </span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          <button className="hv11" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "16px 30px", borderRadius: "16px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "700", letterSpacing: ".01em", color: "#fffdfa", background: "linear-gradient(180deg, rgba(255,255,255,.34) 0%, rgba(255,255,255,.18) 100%)", border: "1px solid rgba(255,255,255,.4)", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.95), inset 0 1px 0 rgba(255,255,255,.38), 0 10px 22px -6px rgba(255,244,230,.6), 0 18px 40px rgba(52,42,34,.34)", transition: "transform .25s ease" }} onClick={vm.buyDetail}>
                            {vm.t.dBuy} →
                          </button>
                          <button className="hv12" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "16px 26px", borderRadius: "16px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600", color: "#ffffff", background: "transparent", border: "1px solid rgba(236,238,241,.24)", transition: "border-color .25s ease, background .25s ease" }} onClick={vm.openAuth}>
                            {vm.t.dLive}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section style={{ position: "relative", padding: "clamp(44px,6vw,80px) clamp(20px,4vw,56px)", overflow: "hidden" }}>
                  <div style={{ position: "relative", zIndex: "1", maxWidth: "1280px", margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(24px,3vw,36px)" }}>
                      <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                      <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                        {vm.t.dViews}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "center", gap: "clamp(18px,3vw,34px)" }}>
                      {(vm.detail.views ?? []).map((v: any, v_i: number) => (
                            <div key={v_i} style={{ flex: "0 1 auto", width: v.w, minWidth: "180px", display: "flex", flexDirection: "column", gap: "12px" }} data-reveal="">
                              <div style={{ position: "relative", aspectRatio: v.ratio, borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(236,238,241,.16)", background: "rgba(255,255,255,.03)", boxShadow: "0 24px 60px -28px rgba(0,0,0,.85)" }}>
                                <div style={{ position: "absolute", top: "0", left: "0", width: "100%", aspectRatio: "16/11" }}>
                                  <ImageSlot id={v.slotId} shape="rect" fit="cover" placeholder="Preview" />
                                </div>
                              </div>
                              <span style={{ textAlign: "center", fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "#949ba4" }}>
                                {v.name}
                              </span>
                            </div>
                        ))}
                    </div>
                  </div>
                </section>
                <section style={{ position: "relative", padding: "clamp(44px,6vw,80px) clamp(20px,4vw,56px)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "0", left: "-8%", width: "52%", height: "76%", borderRadius: "50%", background: "var(--acc-a14)", filter: "blur(150px)", pointerEvents: "none" }} aria-hidden="true" />
                  <div style={{ position: "relative", zIndex: "1", maxWidth: "1280px", margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(24px,3vw,34px)" }}>
                      <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                      <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                        {vm.t.dSpecs}
                      </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1px", borderRadius: "24px", overflow: "hidden", background: "rgba(236,238,241,.12)", border: "1px solid rgba(236,238,241,.12)" }}>
                      {(vm.detail.specs ?? []).map((sp: any, sp_i: number) => (
                            <div key={sp_i} style={{ background: "#191b20", padding: "clamp(22px,2.6vw,30px)", display: "flex", flexDirection: "column", gap: "8px" }} data-reveal="">
                              <span style={{ fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "#949ba4" }}>
                                {sp.k}
                              </span>
                              <span style={{ fontSize: "17px", fontWeight: "600", color: "#ffffff" }}>
                                {sp.v}
                              </span>
                            </div>
                        ))}
                    </div>
                  </div>
                </section>
                <section style={{ position: "relative", padding: "clamp(44px,6vw,80px) clamp(20px,4vw,56px) clamp(64px,9vw,120px)", overflow: "hidden" }}>
                  <div style={{ position: "relative", zIndex: "1", maxWidth: "1280px", margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(24px,3vw,34px)" }}>
                      <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                      <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                        {vm.t.dRelated}
                      </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "22px" }}>
                      {(vm.detail.related ?? []).map((rp: any, rp_i: number) => (
                            <div key={rp_i} className="hv8" style={{ position: "relative", display: "flex", flexDirection: "column", borderRadius: "24px", overflow: "hidden", cursor: "pointer", background: "linear-gradient(152deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.045) 46%, rgba(255,255,255,.028) 100%)", border: "1px solid rgba(236,238,241,.14)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.20)", transition: "border-color .3s ease, transform .3s ease" }} data-reveal="" onClick={rp.onSelect} onMouseEnter={vm.ledOn} onMouseLeave={vm.ledOff}>
                              <span style={{ position: "absolute", inset: "0", zIndex: "6", borderRadius: "24px", padding: "2px", opacity: "0", overflow: "hidden", pointerEvents: "none", transition: "opacity .35s ease", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" }} data-led="">
                                <span style={{ position: "absolute", top: "50%", left: "50%", width: "200%", aspectRatio: "1", background: "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 236deg, var(--acc-a55) 296deg, var(--acc-soft) 336deg, #fffdfa 352deg, rgba(255,255,255,0) 360deg)" }} data-led-spin="" />
                              </span>
                              <div style={{ position: "relative", aspectRatio: "16/11", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "100%", transform: "translateY(0)", willChange: "transform" }} data-scroller="">
                                  <ImageSlot id={`agentic-tpl-${rp.id}`} shape="rect" fit="cover" placeholder="Ảnh preview giao diện" />
                                </div>
                                <span style={{ position: "absolute", zIndex: "3", top: "8px", right: "6px", bottom: "8px", width: "3px", borderRadius: "3px", background: "rgba(255,255,255,.28)", opacity: "0", transition: "opacity .3s ease", pointerEvents: "none" }} data-scrollbar="" aria-hidden="true" />
                                <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(18,20,24,.1) 0%, rgba(18,20,24,.65) 100%)", pointerEvents: "none" }} />
                              </div>
                              <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
                                  <h3 style={{ margin: "0", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.01em", fontSize: "20px", lineHeight: "1.15" }}>
                                    {rp.name}
                                  </h3>
                                  <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--gold)", whiteSpace: "nowrap" }}>
                                    {rp.price}
                                  </span>
                                </div>
                                <span style={{ fontSize: "11px", letterSpacing: ".12em", textTransform: "uppercase", color: "#949ba4" }}>
                                  {rp.catLabel}
                                </span>
                              </div>
                            </div>
                        ))}
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : null}
          {/* ===== TAB: PROCESS ===== */}
          {(vm.isProcess) ? (
            <>
              <div>
                <div style={{ height: "clamp(84px,10vh,108px)" }} />
                <section style={{ padding: "clamp(48px,7vw,110px) clamp(20px,4vw,56px)" }} id="how">
                  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,5vw,64px)", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(36px,5vw,64px)" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                          <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                          <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                            {vm.t.howLabel}
                          </span>
                        </div>
                        <h2 style={{ margin: "0", paddingTop: ".1em", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(34px,5vw,64px)", lineHeight: "1.08", color: "#ffffff", maxWidth: "14ch" }}>
                          {vm.t.howTitle}
                        </h2>
                      </div>
                      <p style={{ maxWidth: "340px", margin: "0", color: "#949ba4", fontSize: "15px", lineHeight: "1.65" }}>
                        {vm.t.howIntro}
                      </p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(20px,2.5vw,32px)" }}>
                      {(vm.steps ?? []).map((st: any, st_i: number) => (
                            <div key={st_i} style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "2px solid rgba(236,238,241,.28)" }} data-reveal="">
                              <span style={{ fontFamily: "var(--display)", fontWeight: "700", fontSize: "clamp(34px,4vw,48px)", lineHeight: "1", color: "var(--gold)" }}>
                                {st.no}
                              </span>
                              <h3 style={{ margin: "0", paddingTop: ".04em", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.01em", fontSize: "24px", lineHeight: "1.15", color: "#ffffff" }}>
                                {st.title}
                              </h3>
                              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.65", color: "#949ba4" }}>
                                {st.desc}
                              </p>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "24px", borderTop: "1px solid rgba(236,238,241,.13)", marginTop: "clamp(40px,5vw,64px)", paddingTop: "30px" }}>
                      {(vm.stats ?? []).map((s: any, s_i: number) => (
                            <div key={s_i}>
                              <div style={{ fontFamily: "var(--display)", fontWeight: "700", fontSize: "clamp(34px,4vw,52px)", lineHeight: "1", color: "#ffffff" }}>
                                {s.value}
                              </div>
                              <div style={{ fontSize: "13px", color: "#ffffff", marginTop: "6px", letterSpacing: ".02em" }}>
                                {s.label}
                              </div>
                            </div>
                        ))}
                    </div>
                  </div>
                </section>
                <section style={{ position: "relative", padding: "clamp(56px,8vw,120px) clamp(20px,4vw,56px)", overflow: "hidden" }} id="included">
                  <div style={{ position: "absolute", top: "12%", right: "-10%", width: "56%", height: "70%", borderRadius: "50%", background: "rgba(240,166,60,.12)", filter: "blur(140px)", pointerEvents: "none" }} aria-hidden="true" />
                  <div style={{ position: "relative", zIndex: "1", maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                      <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                      <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                        {vm.t.incLabel}
                      </span>
                    </div>
                    <h2 style={{ margin: "0 0 clamp(36px,5vw,56px)", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(34px,5vw,64px)", lineHeight: "1.06", maxWidth: "16ch" }}>
                      {vm.t.incTitle}
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1px", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(152deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.045) 46%, rgba(255,255,255,.028) 100%)", border: "1px solid rgba(236,238,241,.14)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.20), inset 0 -1px 0 rgba(0,0,0,.18)" }}>
                      {(vm.includes ?? []).map((inc: any, inc_i: number) => (
                            <div key={inc_i} className="hv13" style={{ background: "rgba(255,255,255,.012)", padding: "clamp(24px,3vw,34px)", display: "flex", flexDirection: "column", gap: "10px", transition: "background .3s ease" }} data-reveal="">
                              <span style={{ fontFamily: "var(--display)", fontWeight: "700", fontSize: "15px", color: "var(--gold)", letterSpacing: ".1em" }}>
                                {inc.no}
                              </span>
                              <h3 style={{ margin: "0", fontSize: "19px", fontWeight: "700", lineHeight: "1.25", color: "#ffffff" }}>
                                {inc.title}
                              </h3>
                              <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.6", color: "#949ba4" }}>
                                {inc.desc}
                              </p>
                            </div>
                        ))}
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : null}
          {/* ===== TAB: PRICING ===== */}
          {(vm.isPricing) ? (
            <>
              <div>
                <div style={{ height: "clamp(84px,10vh,108px)" }} />
                <section style={{ position: "relative", padding: "clamp(48px,7vw,110px) clamp(20px,4vw,56px)", overflow: "hidden" }} id="pricing">
                  <div style={{ position: "absolute", top: "6%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "66%", borderRadius: "50%", background: "var(--acc-a18)", filter: "blur(140px)", pointerEvents: "none" }} aria-hidden="true" />
                  <div style={{ position: "relative", zIndex: "1", maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,56px)" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                        <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                        <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                          {vm.t.pricingLabel}
                        </span>
                        <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                      </div>
                      <h2 style={{ margin: "0 auto", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(34px,5vw,64px)", lineHeight: "1.06", color: "#ffffff", maxWidth: "18ch" }}>
                        {vm.t.pricingTitle}
                      </h2>
                      <p style={{ margin: "18px auto 0", maxWidth: "520px", color: "#949ba4", fontSize: "15px", lineHeight: "1.65" }}>
                        {vm.t.pricingIntro}
                      </p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "22px", alignItems: "stretch" }}>
                      {(vm.tiers ?? []).map((tr: any, tr_i: number) => (
                            <div key={tr_i} className="hv14" style={{ position: "relative", display: "flex", flexDirection: "column", padding: "clamp(28px,3vw,40px)", borderRadius: "24px", background: tr.bg, color: tr.fg, border: `1px solid ${tr.border}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,.20), inset 0 -1px 0 rgba(0,0,0,.18)", transition: "border-color .3s ease, transform .3s ease", "--hv14-border-color": tr.ledHover } as React.CSSProperties} data-reveal="" onMouseEnter={vm.ledOn} onMouseLeave={vm.ledOff}>
                              <span style={{ position: "absolute", inset: "0", zIndex: "6", borderRadius: "24px", opacity: "0", pointerEvents: "none", transition: "opacity .4s ease" }} data-led="">
                                <span style={{ position: "absolute", inset: tr.glowInset, borderRadius: tr.glowRadius, padding: tr.glowPad, overflow: "hidden", animation: "ledGlowPulse 1.6s ease-in-out infinite", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" }} aria-hidden="true">
                                  <span style={{ position: "absolute", top: "50%", left: "50%", width: "200%", aspectRatio: "1", background: tr.ledGlow, filter: tr.glowBlur }} data-led-spin="" />
                                </span>
                                <span style={{ position: "absolute", inset: "0", borderRadius: "24px", padding: tr.coreW, overflow: "hidden", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" }} aria-hidden="true">
                                  <span style={{ position: "absolute", top: "50%", left: "50%", width: "200%", aspectRatio: "1", background: tr.led, animation: "ledSparkle .9s linear infinite" }} data-led-spin="" />
                                </span>
                                {(tr.mixRing) ? (
                                  <>
                                    <span style={{ position: "absolute", inset: "-3px", borderRadius: "27px", padding: "4px", overflow: "hidden", mixBlendMode: "screen", opacity: ".85", animation: "ledGlowPulse 2.3s ease-in-out infinite", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" }} aria-hidden="true">
                                      <span style={{ position: "absolute", top: "50%", left: "50%", width: "200%", aspectRatio: "1", background: tr.led2, filter: "blur(5px) saturate(1.8) brightness(1.4)" }} data-led-spin-rev="" />
                                    </span>
                                    <span style={{ position: "absolute", inset: "0", borderRadius: "24px", padding: ".4px", overflow: "hidden", mixBlendMode: "screen", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", maskComposite: "exclude" }} aria-hidden="true">
                                      <span style={{ position: "absolute", top: "50%", left: "50%", width: "200%", aspectRatio: "1", background: tr.led2 }} data-led-spin-rev="" />
                                    </span>
                                  </>
                                ) : null}
                              </span>
                              {(tr.featured) ? (
                                <>
                                  <span style={{ alignSelf: "flex-start", padding: "6px 14px", borderRadius: "100px", background: "var(--acc)", color: "#ffffff", fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "18px" }}>
                                    {vm.t.pricingPopular}
                                  </span>
                                </>
                              ) : null}
                              <h3 style={{ margin: "0 0 6px", paddingTop: ".06em", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.01em", fontSize: "26px", lineHeight: "1.1" }}>
                                {tr.name}
                              </h3>
                              <p style={{ margin: "0 0 20px", fontSize: "13px", opacity: ".7", lineHeight: "1.5" }}>
                                {tr.note}
                              </p>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "24px" }}>
                                <span style={{ fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(34px,4vw,46px)", color: tr.priceColor }}>
                                  {tr.price}
                                </span>
                                <span style={{ fontSize: "13px", opacity: ".65" }}>
                                  {tr.unit}
                                </span>
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px", flex: "1" }}>
                                {(tr.features ?? []).map((f: any, f_i: number) => (
                                      <div key={f_i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.45" }}>
                                        <span style={{ color: "#ffffff", fontWeight: "700" }}>
                                          ✓
                                        </span>
                                        <span>
                                          {f}
                                        </span>
                                      </div>
                                  ))}
                              </div>
                              <button className="hv15" style={{ display: "inline-flex", justifyContent: "center", padding: "15px", borderRadius: "16px", cursor: "pointer", fontFamily: "inherit", fontWeight: "700", fontSize: "14px", border: `1px solid ${tr.btnBorder}`, background: tr.btnBg, color: "#fffdfa", boxShadow: tr.btnShadow }} onClick={tr.onCta}>
                                {tr.cta}
                              </button>
                            </div>
                        ))}
                    </div>
                    <p style={{ margin: "26px auto 0", textAlign: "center", fontSize: "13px", color: "#868d97" }}>
                      {vm.t.pricingNote}
                    </p>
                  </div>
                </section>
                <section style={{ position: "relative", padding: "clamp(56px,8vw,120px) clamp(20px,4vw,56px)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "0", left: "-8%", width: "54%", height: "70%", borderRadius: "50%", background: "var(--acc-a14)", filter: "blur(140px)", pointerEvents: "none" }} aria-hidden="true" />
                  <div style={{ position: "relative", zIndex: "1", maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                      <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                      <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                        {vm.t.loveLabel}
                      </span>
                    </div>
                    <h2 style={{ margin: "0 0 clamp(32px,4vw,48px)", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(34px,5vw,64px)", lineHeight: "1.06", maxWidth: "14ch" }}>
                      {vm.t.loveTitle}
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
                      {(vm.quotes ?? []).map((q: any, q_i: number) => (
                            <div key={q_i} style={{ display: "flex", flexDirection: "column", gap: "18px", padding: "clamp(24px,3vw,32px)", borderRadius: "24px", background: "linear-gradient(152deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.045) 46%, rgba(255,255,255,.028) 100%)", border: "1px solid rgba(236,238,241,.14)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.20), inset 0 -1px 0 rgba(0,0,0,.18)" }} data-reveal="">
                              <span style={{ fontFamily: "var(--display)", fontWeight: "700", fontSize: "40px", lineHeight: ".6", color: "#ffffff" }}>
                                “
                              </span>
                              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#ffffff", flex: "1" }}>
                                {q.text}
                              </p>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px" }}>
                                <span style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#24272e", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px", color: "#ffffff", flex: "none" }}>
                                  {q.initial}
                                </span>
                                <div>
                                  <div style={{ fontSize: "14px", fontWeight: "600" }}>
                                    {q.name}
                                  </div>
                                  <div style={{ fontSize: "12px", color: "#ffffff" }}>
                                    {q.role}
                                  </div>
                                </div>
                              </div>
                            </div>
                        ))}
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : null}
          {/* ===== TAB: FAQ ===== */}
          {(vm.isFaq) ? (
            <>
              <div>
                <div style={{ height: "clamp(84px,10vh,108px)" }} />
                <section style={{ padding: "clamp(48px,7vw,96px) clamp(20px,4vw,56px) clamp(72px,10vw,120px)" }} id="faq">
                  <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                      <span style={{ width: "40px", height: "1px", background: "var(--acc)" }} />
                      <span style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                        {vm.t.faqLabel}
                      </span>
                    </div>
                    <h2 style={{ margin: "0 0 clamp(28px,4vw,44px)", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(32px,4.5vw,56px)", lineHeight: "1.08" }}>
                      {vm.t.faqTitle}
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {(vm.faqs ?? []).map((fq: any, fq_i: number) => (
                            <div key={fq_i} style={{ borderTop: "1px solid rgba(236,238,241,.13)" }}>
                              <button className="hv3" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", padding: "24px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", color: "#ffffff", fontSize: "clamp(16px,1.8vw,19px)", fontWeight: "600", lineHeight: "1.4" }} onClick={fq.onToggle}>
                                 {fq.q} 
                                <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "50%", border: "1px solid rgba(236,238,241,.28)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#ffffff", transition: "transform .3s ease" }} data-faq-icon="">
                                  +
                                </span>
                              </button>
                              <div style={{ overflow: "hidden", transition: "max-height .38s cubic-bezier(.22,1,.36,1), opacity .3s ease" }} data-faq-panel="">
                                <p style={{ margin: "0", padding: "0 0 26px", maxWidth: "70ch", fontSize: "15px", lineHeight: "1.7", color: "#949ba4" }}>
                                  {fq.a}
                                </p>
                              </div>
                            </div>
                        ))}
                      <div style={{ borderTop: "1px solid rgba(236,238,241,.13)" }} />
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : null}
          {/* ===== TAB: CTA ===== */}
          {(vm.isCta) ? (
            <>
              <div>
                <div style={{ height: "clamp(84px,10vh,108px)" }} />
                <section style={{ padding: "clamp(48px,7vw,96px) clamp(20px,4vw,56px) clamp(72px,10vw,120px)" }} id="cta">
                  <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", borderRadius: "32px", border: "1px solid rgba(236,238,241,.14)", padding: "clamp(40px,6vw,84px) clamp(24px,4vw,64px)", textAlign: "center", overflow: "hidden", background: "linear-gradient(152deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,.04) 50%, rgba(255,255,255,.025) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.20)" }}>
                    <div style={{ position: "absolute", inset: "0", background: "radial-gradient(120% 160% at 50% 0%, var(--acc-a18), transparent 62%)", pointerEvents: "none" }} aria-hidden="true" />
                    <h2 style={{ position: "relative", zIndex: "1", margin: "0 auto 18px", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "clamp(36px,6vw,84px)", lineHeight: "1.02", maxWidth: "16ch" }}>
                      {vm.t.ctaTitle}
                    </h2>
                    <p style={{ position: "relative", zIndex: "1", margin: "0 auto 32px", maxWidth: "520px", color: "#949ba4", fontSize: "16px", lineHeight: "1.65" }}>
                      {vm.t.ctaP}
                    </p>
                    <form style={{ position: "relative", zIndex: "1", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", maxWidth: "520px", margin: "0 auto" }} onSubmit={vm.onSubmit}>
                      <input style={{ flex: "1 1 240px", minWidth: "0", padding: "16px 22px", borderRadius: "16px", border: "1px solid rgba(255,255,255,.26)", background: "linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.12) 100%)", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.7), inset 0 1px 0 rgba(255,255,255,.3), 0 14px 30px rgba(52,42,34,.26)", color: "#ffffff", fontFamily: "inherit", fontSize: "15px" }} name="email" type="email" required placeholder={vm.t.formEmail} />
                      <button className="hv5" style={{ flex: "0 0 auto", padding: "16px 32px", borderRadius: "16px", fontWeight: "700", fontSize: "15px", cursor: "pointer", fontFamily: "inherit", background: "linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)", border: "1px solid rgba(255,255,255,.32)", color: "#fffdfa", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35), 0 10px 22px -6px rgba(255,244,230,.55), 0 18px 40px rgba(52,42,34,.34)" }} type="submit">
                        {vm.submitLabel}
                      </button>
                    </form>
                    <p style={{ position: "relative", zIndex: "1", margin: "18px 0 0", fontSize: "13px", color: "#868d97" }}>
                      {vm.t.ctaNote}
                    </p>
                  </div>
                </section>
              </div>
            </>
          ) : null}
        </main>
        {/* ===== FOOTER ===== */}
        {(vm.showFooter) ? (
          <>
            <footer style={{ padding: "clamp(40px,6vw,64px) clamp(20px,4vw,56px)" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--display)", fontWeight: "700", letterSpacing: ".02em", fontSize: "clamp(40px,8vw,88px)", lineHeight: ".9" }}>
                  AGENTIC
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "22px", fontSize: "13px", color: "#ffffff", letterSpacing: ".03em" }}>
                  {(vm.footerLinks ?? []).map((fl: any, fl_i: number) => (
                        <button key={fl_i} className="hv3" style={{ background: "transparent", border: "none", padding: "0", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", color: "#ffffff", letterSpacing: ".03em" }} onClick={fl.onSelect}>
                          {fl.label}
                        </button>
                    ))}
                  {(vm.legalLinks ?? []).map((lg2: any, lg2_i: number) => (
                        <a key={lg2_i} className="hv3" style={{ fontSize: "13px", color: "#949ba4", letterSpacing: ".03em" }} href={lg2.href}>
                          {lg2.label}
                        </a>
                    ))}
                </div>
              </div>
              <div style={{ maxWidth: "1200px", margin: "28px auto 0", paddingTop: "20px", borderTop: "1px solid rgba(236,238,241,.08)", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", fontSize: "12px", color: "#868d97" }}>
                <span>
                  {vm.t.copyright}
                </span>
                <a className="hv3" style={{ color: "#868d97" }} href={`mailto:${vm.contactEmail}`}>
                  {vm.contactEmail}
                </a>
              </div>
            </footer>
          </>
        ) : null}
      </div>
      {(vm.authOpen) ? (
        <>
          <div style={{ position: "fixed", inset: "0", zIndex: "9000", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "24px", background: "rgba(8,9,11,.72)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", animation: "fadeIn .28s ease" }} onClick={vm.closeAuth}>
            <div style={{ position: "relative", flex: "none", margin: "auto 0", width: "100%", maxWidth: "420px", padding: "clamp(30px,4vw,40px)", borderRadius: "26px", background: "linear-gradient(152deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,.05) 46%, rgba(255,255,255,.03) 100%)", backdropFilter: "blur(34px) saturate(160%)", WebkitBackdropFilter: "blur(34px) saturate(160%)", border: "1px solid rgba(236,238,241,.16)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.22), inset 0 -1px 0 rgba(0,0,0,.2), 0 40px 90px -30px rgba(0,0,0,.9)" }} onClick={vm.stopProp}>
              <button className="hv7" style={{ position: "absolute", top: "18px", right: "18px", width: "32px", height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.06)", color: "#c8ced6", fontSize: "15px", lineHeight: "1", cursor: "pointer", fontFamily: "inherit" }} onClick={vm.closeAuth} aria-label={vm.t.authClose}>
                ✕
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ width: "34px", height: "1px", background: "var(--acc)" }} />
                <span style={{ fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#ffffff" }}>
                  AGENTIC
                </span>
              </div>
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--display)", fontWeight: "700", letterSpacing: "-.02em", fontSize: "30px", lineHeight: "1.1", color: "#ffffff" }}>
                {vm.t.authTitle}
              </h3>
              <p style={{ margin: "0 0 26px", fontSize: "14px", lineHeight: "1.6", color: "#949ba4" }}>
                {vm.t.authSub}
              </p>
              {(vm.authError) ? (
                <>
                  <p style={{ margin: "-16px 0 18px", fontSize: "13px", lineHeight: "1.5", color: "var(--acc)" }} role="alert">
                    {vm.authError}
                  </p>
                </>
              ) : null}
              <form style={{ display: "flex", flexDirection: "column", gap: "14px" }} onSubmit={vm.onAuthSubmit}>
                <label style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase", color: "#949ba4" }}>
                  {vm.t.authEmail} 
                  <input className="fc16" style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.05)", color: "#ffffff", fontFamily: "inherit", fontSize: "14px", letterSpacing: "normal", textTransform: "none", outline: "none" }} type="email" required placeholder="you@studio.com" />
                </label>
                {(vm.showPassword) ? (
                  <>
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase", color: "#949ba4" }}>
                      {vm.t.authPass} 
                      <input className="fc16" style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.05)", color: "#ffffff", fontFamily: "inherit", fontSize: "14px", letterSpacing: "normal", textTransform: "none", outline: "none" }} type="password" required placeholder="••••••••" />
                    </label>
                  </>
                ) : null}
                {(vm.showForgotLink) ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-2px" }}>
                      <button className="hv3" style={{ padding: "0", border: "0", background: "none", fontFamily: "inherit", fontSize: "13px", color: "#c8ced6", cursor: "pointer" }} type="button" onClick={vm.startForgot}>
                        {vm.t.authForgot}
                      </button>
                    </div>
                  </>
                ) : null}
                <button className="hv17" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", marginTop: "4px", padding: "15px", borderRadius: "16px", cursor: "pointer", fontFamily: "inherit", fontWeight: "700", fontSize: "14px", border: "1px solid rgba(255,255,255,.4)", background: "linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.16) 100%)", color: "#fffdfa", boxShadow: "inset 0 -1.5px 0 rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.35), 0 10px 22px -8px rgba(255,244,230,.5)" }} type="submit">
                  {vm.authSubmitLabel}
                </button>
              </form>
              {(vm.googleEnabled) ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "22px 0" }}>
                    <span style={{ flex: "1", height: "1px", background: "rgba(255,255,255,.12)" }} />
                    <span style={{ fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "#868d97" }}>
                      {vm.t.authOr}
                    </span>
                    <span style={{ flex: "1", height: "1px", background: "rgba(255,255,255,.12)" }} />
                  </div>
                  <button className="hv2" style={{ width: "100%", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "10px", padding: "14px", borderRadius: "16px", cursor: "pointer", fontFamily: "inherit", fontWeight: "600", fontSize: "14px", border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.06)", color: "#ffffff" }} onClick={vm.onGoogleSignIn}>
                    {vm.t.authGoogle}
                  </button>
                </>
              ) : null}
              <p style={{ margin: "22px 0 0", textAlign: "center", fontSize: "13px", color: "#949ba4" }}>
                {vm.t.authNoAcc} 
                <button className="hv18" style={{ padding: "0", border: "0", background: "none", fontFamily: "inherit", fontSize: "13px", color: "#ffffff", fontWeight: "600", cursor: "pointer" }} type="button" onClick={vm.toggleAuthMode}>
                  {vm.t.authSignup}
                </button>
              </p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
