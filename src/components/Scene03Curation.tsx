"use client";

import React, { useEffect, useRef } from "react";

export default function Scene03Curation() {
  const rootRef = useRef<HTMLElement | null>(null);
  const linePathRef = useRef<SVGPathElement | null>(null);
  const bridgePathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const path = linePathRef.current;
    const bridgePath = bridgePathRef.current;

    const q = (n: string) => Array.from(root.querySelectorAll<HTMLElement>(`[data-el="${n}"]`));

    const screenLen = (p: SVGPathElement) => {
      const m = p.getScreenCTM();
      const ul = p.getTotalLength();
      if (!m || !ul) return ul || 200;
      const N = 32;
      let total = 0;
      let prev: DOMPoint | null = null;
      for (let i = 0; i <= N; i++) {
        const u = p.getPointAtLength((i / N) * ul).matrixTransform(m);
        if (prev) total += Math.hypot(u.x - prev.x, u.y - prev.y);
        prev = u;
      }
      return total || ul;
    };

    const lines: [SVGPathElement | null, number][] = [
      [path, 1600],
      [bridgePath, 900],
    ];

    const measure = () => {
      lines.forEach(([p, ms]) => {
        if (!p) return;
        const len = Math.ceil(screenLen(p) * 1.06) + 6;
        p.style.strokeDasharray = `${len}`;
        p.style.transition = `stroke-dashoffset ${ms}ms cubic-bezier(0.4, 0, 0.2, 1) 260ms`;
        p.style.strokeDashoffset = `${len}`;
      });
    };

    measure();

    const reveal = [...q("rev"), ...q("step")];
    reveal.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity 820ms ease ${i * 100}ms, transform 820ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 100}ms`;
    });

    const show = () => {
      reveal.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
      lines.forEach(([p]) => {
        if (p) p.style.strokeDashoffset = "0";
      });
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (ents) => {
          if (ents.some((x) => x.isIntersecting)) {
            show();
            io.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      io.observe(root);
      return () => io.disconnect();
    } else {
      show();
    }
  }, []);

  return (
    <section
      ref={rootRef}
      id="curation"
      style={{
        position: "relative",
        width: "100%",
        background: "#F3EEE6",
        overflow: "hidden",
        padding: "0 0 9vh",
      }}
    >
      <div
        className="unknkn-grain"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.14,
          mixBlendMode: "multiply",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1180px", margin: "0 auto", padding: "0 6vw" }}>
        {/* Chapter Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2em",
            paddingTop: "6vh",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <div>
            <span style={{ color: "#7C1405" }}>03 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>The Curation</span>
          </div>
          <span>Unknwn</span>
        </div>

        <div style={{ height: "1px", background: "rgba(23, 19, 17, 0.18)", margin: "4.5vh 0 0" }} />

        {/* 2-Column Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))",
            gap: "clamp(32px, 4.5vw, 88px)",
            margin: "7vh 0 0",
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <div>
            <h2
              data-el="rev"
              style={{
                margin: 0,
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 600,
                fontSize: "clamp(30px, 4.8vw, 68px)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                wordBreak: "break-word",
              }}
            >
              WE FIND THE
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 500, color: "#7C1405" }}>
                ONE WORTH MEETING.
              </span>
            </h2>

            <div
              data-el="rev"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.9em",
                marginTop: "3em",
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(23, 19, 17, 0.82)",
              }}
            >
              <span>You tell us what matters.</span>
              <span style={{ paddingLeft: "clamp(0.8em, 2.6vw, 2.6em)" }}>We find the connection.</span>
              <span style={{ paddingLeft: "clamp(1.6em, 5.2vw, 5.2em)" }}>We take care of the date.</span>
            </div>

            <a
              data-el="rev"
              href="#passes"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.9em",
                marginTop: "4em",
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(124, 20, 5, 0.4)",
                paddingBottom: "0.5em",
                transition: "gap 320ms ease, border-color 320ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = "1.6em";
                e.currentTarget.style.borderColor = "#7C1405";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = "0.9em";
                e.currentTarget.style.borderColor = "rgba(124, 20, 5, 0.4)";
              }}
            >
              See how it works <span style={{ fontSize: "14px" }}>→</span>
            </a>
          </div>

          {/* Right Column: Steps with Animated SVG Line */}
          <div data-el="steps" style={{ position: "relative", paddingLeft: "clamp(34px, 4vw, 58px)" }}>
            <svg
              data-el="lineSvg"
              viewBox="0 0 40 100"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                left: 0,
                top: "8px",
                width: "clamp(34px, 4vw, 58px)",
                height: "100%",
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <path
                ref={linePathRef}
                data-el="linePath"
                d="M 30 0 C 8 16, 34 34, 16 50 C 0 66, 30 80, 22 100"
                fill="none"
                stroke="#7C1405"
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Step 01 */}
            <div
              data-el="step"
              style={{
                position: "relative",
                padding: "0 0 clamp(34px, 4.5vh, 52px)",
                transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "1.1em" }}>
                <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", color: "#7C1405" }}>
                  01
                </span>
                <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  YOUR VIBE
                </span>
              </div>
              <p style={{ margin: "0.9em 0 0", fontFamily: "var(--font-archivo), sans-serif", fontSize: "13px", letterSpacing: "0.02em", color: "rgba(23, 19, 17, 0.72)" }}>
                Tell us what matters to you.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0 1.6em", marginTop: "1.3em", fontFamily: "var(--font-playfair), serif", fontSize: "clamp(17px, 1.7vw, 23px)", fontWeight: 500, letterSpacing: "-0.01em" }}>
                <span>COFFEE</span>
                <span style={{ fontStyle: "italic", fontWeight: 500 }}>MUSIC</span>
                <span>TRAVEL</span>
                <span style={{ fontStyle: "italic", fontWeight: 500 }}>ART</span>
              </div>
            </div>

            {/* Step 02 */}
            <div
              data-el="step"
              style={{
                position: "relative",
                padding: "0 0 clamp(34px, 4.5vh, 52px)",
                transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "1.1em" }}>
                <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", color: "#7C1405" }}>
                  02
                </span>
                <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  OUR MATCH
                </span>
              </div>
              <p style={{ margin: "0.9em 0 0", fontFamily: "var(--font-archivo), sans-serif", fontSize: "13px", letterSpacing: "0.02em", color: "rgba(23, 19, 17, 0.72)" }}>
                We find the connection.
              </p>
              <div
                style={{
                  width: "clamp(140px, 16vw, 200px)",
                  height: "clamp(170px, 19vw, 240px)",
                  marginTop: "1.4em",
                  overflow: "hidden",
                  background: "url('/images/curation-match.png') center / cover no-repeat",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Step 03 */}
            <div
              data-el="step"
              style={{
                position: "relative",
                padding: 0,
                transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "1.1em" }}>
                <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", color: "#7C1405" }}>
                  03
                </span>
                <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  YOUR DATE
                </span>
              </div>
              <p style={{ margin: "0.9em 0 0", fontFamily: "var(--font-archivo), sans-serif", fontSize: "13px", letterSpacing: "0.02em", color: "rgba(23, 19, 17, 0.72)" }}>
                We take care of the rest.
              </p>
              <div style={{ marginTop: "1.4em", display: "flex", flexDirection: "column", gap: "0.35em" }}>
                <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 2.8vw, 38px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  SATURDAY
                </span>
                <span style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 38px)", letterSpacing: "-0.02em", lineHeight: 1.05, color: "#7C1405" }}>
                  7:00 PM
                </span>
                <span style={{ marginTop: "0.7em", fontFamily: "var(--font-archivo), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(23, 19, 17, 0.68)" }}>
                  A place to be revealed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bridge to Passes */}
        <div
          data-el="bridge"
          style={{
            position: "relative",
            margin: "8vh 0 0",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "1.4em",
          }}
        >
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ flex: "1 1 auto", height: "20px", overflow: "visible" }}>
            <path
              ref={bridgePathRef}
              data-el="bridgePath"
              d="M 0 4 C 26 4, 40 16, 66 16 C 84 16, 92 10, 100 10"
              fill="none"
              stroke="#7C1405"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <a
            href="#passes"
            style={{
              flex: "0 0 auto",
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textAlign: "right",
              color: "#171311",
            }}
          >
            <span style={{ color: "#7C1405" }}>04 / 05</span>
            <span style={{ display: "block", marginTop: "0.6em" }}>The Unknwn Passes</span>
          </a>
        </div>
      </div>
    </section>
  );
}
