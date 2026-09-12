"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Scene04Passes() {
  const [mode, setMode] = useState<"cinema" | "cafe">("cinema");
  const [venueFade, setVenueFade] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const bg1Ref = useRef<HTMLDivElement | null>(null);
  const bg2Ref = useRef<HTMLDivElement | null>(null);

  const handleModeChange = (newMode: "cinema" | "cafe") => {
    if (newMode === mode) return;
    setVenueFade(true);
    setTimeout(() => {
      setMode(newMode);
      setVenueFade(false);
    }, 280);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Ambient background drift
    let t0: number | null = null;
    let rafId: number;
    const bgs = [bg1Ref.current, bg2Ref.current];

    const drift = (t: number) => {
      if (t0 === null) t0 = t;
      const s = (t - t0) / 1000;
      const y = Math.sin(s * 0.06) * 12;
      const x = Math.cos(s * 0.042) * 10;
      bgs.forEach((b) => {
        if (b) b.style.transform = `translate3d(${x}px,${y}px,0) scale(1.04)`;
      });
      rafId = requestAnimationFrame(drift);
    };

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rafId = requestAnimationFrame(drift);
    }

    // Gentle scroll reveal
    const q = (n: string) => Array.from(root.querySelectorAll<HTMLElement>(`[data-el="${n}"]`));
    const reveal = [
      root.querySelector<HTMLElement>('[data-el="head"]'),
      root.querySelector<HTMLElement>('[data-el="sub"]'),
      root.querySelector<HTMLElement>('[data-el="toggle"]'),
      ...q("card"),
    ];

    reveal.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = `opacity 900ms ease ${i * 110}ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 110}ms`;
    });

    const show = () =>
      reveal.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (ents) => {
          if (ents.some((x) => x.isIntersecting)) {
            show();
            io.disconnect();
          }
        },
        { threshold: 0.12 }
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

  const isCinema = mode === "cinema";
  const venueA = isCinema ? "Reserved seats" : "Reserved table";
  const venueB = isCinema ? "Evening show" : "Afternoon sitting";

  return (
    <section
      ref={rootRef}
      id="passes"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#171311",
        overflow: "hidden",
        padding: "0 0 11vh",
      }}
    >
      {/* Background Ambience with drifting transforms */}
      <div
        ref={bg1Ref}
        data-el="bg"
        style={{
          position: "absolute",
          inset: "-4% -2%",
          zIndex: 0,
          opacity: isCinema ? 0.22 : 0,
          transition: "opacity 460ms ease",
          willChange: "transform",
          background: "url('/images/pass-cinema.png') center / cover no-repeat",
        }}
      />
      <div
        ref={bg2Ref}
        data-el="bg2"
        style={{
          position: "absolute",
          inset: "-4% -2%",
          zIndex: 0,
          opacity: !isCinema ? 0.22 : 0,
          transition: "opacity 460ms ease",
          willChange: "transform",
          background: "url('/images/pass-cafe.png') center / cover no-repeat",
        }}
      />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "#171311", opacity: 0.52 }} />
      <div
        className="unknkn-grain"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          opacity: 0.22,
          mixBlendMode: "overlay",
        }}
      />

      <div style={{ position: "relative", zIndex: 3, maxWidth: "1180px", margin: "0 auto", padding: "0 6vw" }}>
        {/* Chapter Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2em",
            paddingTop: "calc(var(--unknkn-nav-h, 0px) + 6vh)",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#F3EEE6",
          }}
        >
          <div>
            <span style={{ opacity: 0.62 }}>04 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>The UNKNKN Passes</span>
          </div>
        </div>

        <div style={{ height: "1px", background: "#F3EEE6", opacity: 0.16, margin: "4.5vh 0 0" }} />

        {/* Title */}
        <h2
          data-el="head"
          style={{
            margin: "7vh 0 0",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(38px, 6.4vw, 96px)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            color: "#F3EEE6",
          }}
        >
          YOUR FIRST DATE
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 500 }}>STARTS HERE.</span>
        </h2>

        <p
          data-el="sub"
          style={{
            margin: "2.6em 0 0",
            maxWidth: "34ch",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            lineHeight: 1.9,
            textTransform: "uppercase",
            color: "rgba(243, 238, 230, 0.72)",
          }}
        >
          Choose how you want your UNKNKN experience to begin.
        </p>

        {/* Experience Mode Toggle */}
        <div
          data-el="toggle"
          style={{
            display: "flex",
            gap: 0,
            margin: "5.5vh 0 0",
            border: "1px solid rgba(243, 238, 230, 0.24)",
            width: "fit-content",
          }}
        >
          <button
            type="button"
            onClick={() => handleModeChange("cinema")}
            aria-pressed={isCinema}
            style={{
              appearance: "none",
              border: 0,
              borderRight: "1px solid rgba(243, 238, 230, 0.24)",
              background: isCinema ? "#7C1405" : "transparent",
              color: isCinema ? "#F3EEE6" : "rgba(243, 238, 230, 0.62)",
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "1.25em 2.2em",
              cursor: "pointer",
              transition: "background 380ms ease, color 380ms ease",
            }}
          >
            Cinema Pass
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("cafe")}
            aria-pressed={!isCinema}
            style={{
              appearance: "none",
              border: 0,
              background: !isCinema ? "#7C1405" : "transparent",
              color: !isCinema ? "#F3EEE6" : "rgba(243, 238, 230, 0.62)",
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "1.25em 2.2em",
              cursor: "pointer",
              transition: "background 380ms ease, color 380ms ease",
            }}
          >
            Café Pass
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div
          data-el="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "28px",
            margin: "7vh 0 0",
          }}
        >
          {/* Card 1: Ladies Pass */}
          <article
            data-el="card"
            style={{
              position: "relative",
              background: "#F3EEE6",
              border: "1px solid rgba(23, 19, 17, 0.16)",
              borderRadius: "3px",
              padding: "3.4em 2.6em 2.6em",
              color: "#171311",
              transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms ease, box-shadow 420ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = "rgba(124, 20, 5, 0.55)";
              e.currentTarget.style.boxShadow = "0 18px 40px rgba(23, 19, 17, 0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(23, 19, 17, 0.16)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1.5em", fontFamily: "var(--font-archivo), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              <span>Ladies Pass</span>
              <span
                style={{
                  color: "#7C1405",
                  transition: "opacity 320ms ease",
                  opacity: venueFade ? 0 : 1,
                }}
              >
                {venueA}
              </span>
            </div>
            <div style={{ marginTop: "1.1em", fontFamily: "var(--font-playfair), serif", fontSize: "clamp(46px, 5vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
              ₹399
            </div>
            <div style={{ height: "1px", background: "rgba(23, 19, 17, 0.14)", margin: "2.4em 0 0" }} />
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 0 }}>
              <li style={{ padding: "1.15em 0", borderBottom: "1px solid rgba(23, 19, 17, 0.14)", fontFamily: "var(--font-archivo), sans-serif", fontSize: "14px", letterSpacing: "0.02em" }}>
                Curated Match Profile
              </li>
              <li style={{ padding: "1.15em 0", borderBottom: "1px solid rgba(23, 19, 17, 0.14)", fontFamily: "var(--font-archivo), sans-serif", fontSize: "14px", letterSpacing: "0.02em" }}>
                Priority Matching Access
              </li>
              <li style={{ padding: "1.15em 0", borderBottom: "1px solid rgba(23, 19, 17, 0.14)", fontFamily: "var(--font-archivo), sans-serif", fontSize: "14px", letterSpacing: "0.02em" }}>
                Reserved Date Slot
              </li>
              <li style={{ padding: "1.15em 0", fontFamily: "var(--font-archivo), sans-serif", fontSize: "14px", letterSpacing: "0.02em" }}>
                SOS Safety Support
              </li>
            </ul>
            <button
              type="button"
              style={{
                appearance: "none",
                display: "block",
                width: "100%",
                marginTop: "2.8em",
                border: 0,
                borderRadius: "2px",
                background: "#7C1405",
                color: "#F3EEE6",
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textAlign: "left",
                padding: "1.4em 1.6em",
                cursor: "pointer",
                transition: "transform 260ms ease, background 260ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "#6A1104";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "#7C1405";
              }}
            >
              Select Ladies Pass
            </button>
          </article>

          {/* Card 2: Gentlemen Pass */}
          <article
            data-el="card"
            style={{
              position: "relative",
              background: "#F3EEE6",
              border: "1px solid rgba(23, 19, 17, 0.16)",
              borderRadius: "3px",
              padding: "3.4em 2.6em 2.6em",
              color: "#171311",
              transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms ease, box-shadow 420ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = "rgba(124, 20, 5, 0.55)";
              e.currentTarget.style.boxShadow = "0 18px 40px rgba(23, 19, 17, 0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(23, 19, 17, 0.16)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1.5em", fontFamily: "var(--font-archivo), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              <span>Gentlemen Pass</span>
              <span
                style={{
                  color: "#7C1405",
                  transition: "opacity 320ms ease",
                  opacity: venueFade ? 0 : 1,
                }}
              >
                {venueB}
              </span>
            </div>
            <div style={{ marginTop: "1.1em", fontFamily: "var(--font-playfair), serif", fontSize: "clamp(46px, 5vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
              ₹1499
            </div>
            <div style={{ height: "1px", background: "rgba(23, 19, 17, 0.14)", margin: "2.4em 0 0" }} />
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 0 }}>
              <li style={{ padding: "1.15em 0", borderBottom: "1px solid rgba(23, 19, 17, 0.14)", fontFamily: "var(--font-archivo), sans-serif", fontSize: "14px", letterSpacing: "0.02em" }}>
                Full Compatibility Match
              </li>
              <li style={{ padding: "1.15em 0", borderBottom: "1px solid rgba(23, 19, 17, 0.14)", fontFamily: "var(--font-archivo), sans-serif", fontSize: "14px", letterSpacing: "0.02em" }}>
                Priority Matching Queue
              </li>
              <li style={{ padding: "1.15em 0", borderBottom: "1px solid rgba(23, 19, 17, 0.14)", fontFamily: "var(--font-archivo), sans-serif", fontSize: "14px", letterSpacing: "0.02em" }}>
                Confirmed Date Booking
              </li>
              <li style={{ padding: "1.15em 0", fontFamily: "var(--font-archivo), sans-serif", fontSize: "14px", letterSpacing: "0.02em" }}>
                Compatibility Insights
              </li>
            </ul>
            <button
              type="button"
              style={{
                appearance: "none",
                display: "block",
                width: "100%",
                marginTop: "2.8em",
                border: 0,
                borderRadius: "2px",
                background: "#7C1405",
                color: "#F3EEE6",
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textAlign: "left",
                padding: "1.4em 1.6em",
                cursor: "pointer",
                transition: "transform 260ms ease, background 260ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "#6A1104";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "#7C1405";
              }}
            >
              Select Gentlemen Pass
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
