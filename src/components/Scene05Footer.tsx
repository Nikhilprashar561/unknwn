"use client";

import React, { useEffect, useRef } from "react";

export default function Scene05Footer() {
  const rootRef = useRef<HTMLElement | null>(null);
  const grainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const grain = grainRef.current;
    if (!root) return;

    let rafId: number;
    let t0: number | null = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (grain && !reduce) {
      const drift = (t: number) => {
        if (t0 === null) t0 = t;
        const s = (t - t0) / 1000;
        grain.style.transform = `translate3d(${Math.cos(s * 0.035) * 7}px,${Math.sin(s * 0.05) * 6}px,0)`;
        rafId = requestAnimationFrame(drift);
      };
      rafId = requestAnimationFrame(drift);
    }

    const reveal = Array.from(root.querySelectorAll<HTMLElement>('[data-el="rev"]'));
    if (!reduce) {
      reveal.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = `opacity 1000ms ease ${i * 140}ms, transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 140}ms`;
      });
    }

    const show = () =>
      reveal.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (ents) => {
          if (ents.some((x) => x.isIntersecting)) {
            show();
            io.disconnect();
          }
        },
        { threshold: 0.08 }
      );
      io.observe(root);
      return () => {
        cancelAnimationFrame(rafId);
        io.disconnect();
      };
    } else {
      show();
    }

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer
      ref={rootRef}
      id="theend"
      data-el="root"
      style={{
        position: "relative",
        width: "100%",
        background: "#7C1405",
        overflow: "hidden",
        padding: "0 0 3.5vh",
      }}
    >
      <div
        ref={grainRef}
        className="unknkn-grain"
        data-el="grain"
        style={{
          position: "absolute",
          inset: "-2%",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.2,
          mixBlendMode: "overlay",
          willChange: "transform",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1220px", margin: "0 auto", padding: "0 6vw" }}>
        {/* Top Tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2em",
            paddingTop: "7vh",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#E5D9CF" }}>The end</span>
        </div>

        {/* Grand Statement */}
        <h2
          data-el="rev"
          style={{
            margin: "9vh 0 0",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(44px, 9.2vw, 150px)",
            lineHeight: 0.94,
            letterSpacing: "-0.04em",
            color: "#F3EEE6",
          }}
        >
          THE UNKNOWN
          <br />
          <span style={{ display: "inline-block", paddingLeft: "0.34em", fontStyle: "italic", fontWeight: 500 }}>
            IS WORTH MEETING.
          </span>
        </h2>

        {/* Action Row */}
        <div
          data-el="rev"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "clamp(24px, 3vw, 56px)",
            margin: "8vh 0 0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#E5D9CF",
            }}
          >
            Ready to meet someone?
          </span>
          <a
            href="#passes"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1em",
              background: "#F3EEE6",
              color: "#7C1405",
              borderRadius: "2px",
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "1.45em 1.9em",
              transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1), background 280ms ease, gap 280ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.background = "#FFFBF4";
              e.currentTarget.style.gap = "1.7em";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "#F3EEE6";
              e.currentTarget.style.gap = "1em";
            }}
          >
            Reserve your pass <span style={{ fontSize: "14px" }}>→</span>
          </a>
        </div>

        <div style={{ height: "1px", background: "rgba(243, 238, 230, 0.28)", margin: "9vh 0 0" }} />

        {/* Nav Grid */}
        <nav
          data-el="rev"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: "clamp(28px, 4vw, 64px)",
            margin: "5vh 0 0",
            alignItems: "start",
          }}
        >
          <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, color: "#F3EEE6" }}>
            UNKNWN
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.15em", fontFamily: "var(--font-archivo), sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <a href="#whatisunknown" style={{ width: "fit-content", color: "#F3EEE6", transition: "transform 240ms ease, color 240ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.color = "#E5D9CF"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.color = "#F3EEE6"; }}>How it works</a>
            <a href="#theunknown" style={{ width: "fit-content", color: "#F3EEE6", transition: "transform 240ms ease, color 240ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.color = "#E5D9CF"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.color = "#F3EEE6"; }}>Our story</a>
            <a href="#theend" style={{ width: "fit-content", color: "#F3EEE6", transition: "transform 240ms ease, color 240ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.color = "#E5D9CF"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.color = "#F3EEE6"; }}>FAQs</a>
            <a href="#passes" style={{ width: "fit-content", color: "#F3EEE6", transition: "transform 240ms ease, color 240ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.color = "#E5D9CF"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.color = "#F3EEE6"; }}>Contact</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.15em", fontFamily: "var(--font-archivo), sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#E5D9CF" }}>
            <a href="#" style={{ width: "fit-content", color: "#E5D9CF", transition: "transform 240ms ease, color 240ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.color = "#F3EEE6"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.color = "#E5D9CF"; }}>Instagram</a>
            <a href="#" style={{ width: "fit-content", color: "#E5D9CF", transition: "transform 240ms ease, color 240ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.color = "#F3EEE6"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.color = "#E5D9CF"; }}>Privacy</a>
            <a href="#" style={{ width: "fit-content", color: "#E5D9CF", transition: "transform 240ms ease, color 240ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.color = "#F3EEE6"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.color = "#E5D9CF"; }}>Terms</a>
          </div>
          <div style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(19px, 1.9vw, 27px)", lineHeight: 1.2, letterSpacing: "-0.01em", color: "#F3EEE6" }}>
            Curated connections.
            <br />
            Real dates.
          </div>
        </nav>

        {/* Legal & Copyright */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "1.2em",
            margin: "9vh 0 0",
            paddingTop: "2.2vh",
            borderTop: "1px solid rgba(243, 238, 230, 0.18)",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#E5D9CF",
          }}
        >
          <span>Curated connections. Real dates.</span>
          <span>© 2026 UNKNKN</span>
        </div>
      </div>
    </footer>
  );
}
