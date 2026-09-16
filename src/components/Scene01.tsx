"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Scene01() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    let tl: gsap.core.Timeline | null = null;
    let syncTicker: (() => void) | null = null;
    let resizeTimer: NodeJS.Timeout | null = null;
    let waitTimer: NodeJS.Timeout | null = null;
    let prevMob: boolean | null = null;

    const teardown = () => {
      if (tl) {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
        tl = null;
      }
    };

    const build = () => {
      if (!root) return;
      teardown();

      const e = (n: string) => root.querySelector<HTMLElement>(`[data-el="${n}"]`);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mob = vw < 760;
      prevMob = mob;

      root.style.height = "260vh";

      const accent = "#7C1405";
      const p1 = e("p1");
      const p2 = e("p2");
      const line = e("line");
      const path = e("linePath") as SVGPathElement | null;
      const t1 = e("t1");
      const t2 = e("t2");
      const t3 = e("t3");
      const t4 = e("t4");
      const t3b = e("t3b");
      const t4b = e("t4b");
      const prog = e("prog");
      const scrollcue = e("scrollcue");
      const chapter = e("chapter");

      if (!p1 || !p2 || !line || !path || !t1 || !t2 || !t3 || !t4 || !prog) {
        return;
      }

      path.style.stroke = accent;
      if (t3b) t3b.style.color = accent;
      if (t4b) t4b.style.color = accent;
      prog.style.background = accent;

      // Reset base desktop styles before conditionally applying mob overrides
      if (mob) {
        Object.assign(p1.style, { left: "-8vw", top: "6vh", width: "62vw", height: "30vh" });
        Object.assign(p2.style, { left: "46vw", top: "64vh", width: "62vw", height: "30vh" });
        Object.assign(t1.style, { left: "6vw", top: "40vh", width: "88vw", fontSize: "8.4vw" });
        Object.assign(t2.style, { right: "6vw", top: "42vh", width: "88vw", fontSize: "8.4vw" });
        Object.assign(t3.style, { left: "6vw", top: "39vh", width: "88vw", fontSize: "7.6vw" });
        Object.assign(t4.style, { left: "6vw", top: "40vh", width: "88vw", fontSize: "10.2vw" });
        path.setAttribute("d", "M 30 34 C 44 44, 38 56, 52 62 C 66 68, 60 74, 72 82");
        if (scrollcue && scrollcue.firstElementChild) {
          (scrollcue.firstElementChild as HTMLElement).style.display = "none";
        }
      } else {
        Object.assign(p1.style, { left: "-7vw", top: "22vh", width: "32vw", height: "64vh" });
        Object.assign(p2.style, { left: "78vw", top: "12vh", width: "28vw", height: "54vh" });
        Object.assign(t1.style, { left: "26.5vw", top: "34vh", width: "48vw", fontSize: "4.9vw" });
        Object.assign(t2.style, { right: "4vw", top: "54vh", width: "38vw", fontSize: "4.8vw" });
        Object.assign(t3.style, { left: "4vw", top: "27vh", width: "38vw", fontSize: "4.4vw" });
        Object.assign(t4.style, { left: "6vw", top: "37vh", width: "40vw", fontSize: "6vw" });
        path.setAttribute("d", "M 48 58 C 56 46, 60 64, 66 54 C 72 44, 76 50, 84 42");
        if (scrollcue && scrollcue.firstElementChild) {
          (scrollcue.firstElementChild as HTMLElement).style.display = "block";
        }
      }

      const L = path.getTotalLength();
      path.style.strokeDasharray = `${L}`;
      path.style.strokeDashoffset = `${L}`;

      // centre-delta helpers: land an element's box centre on a % of the viewport
      const cx = (pct: number) => (_i: number, el: HTMLElement) =>
        vw * pct - (el.offsetLeft + el.offsetWidth / 2);
      const cy = (pct: number) => (_i: number, el: HTMLElement) =>
        vh * pct - (el.offsetTop + el.offsetHeight / 2);

      gsap.set([p1, p2], { transformOrigin: "50% 50%" });
      gsap.set(p1, { rotate: -1.2 });
      gsap.set(p2, { rotate: 1.4 });
      gsap.set(line, { transformOrigin: "66% 50%" });

      // each beat parks the converging pair in a known band so the headline of
      // that beat always has clear ivory to sit on — desktop drifts horizontally,
      // mobile vertically
      const B = mob
        ? {
            b: { p1: [0.3, 0.24], p2: [0.7, 0.78], s: [1.04, 1.04] },
            c: { p1: [0.32, 0.2], p2: [0.68, 0.82], s: [1.1, 1.1] },
            d: { p1: [0.33, 0.17], p2: [0.67, 0.85], s: [1.16, 1.16] },
            line: { b: [-0.1, 0.9], c: [0, 1], d: [0.01, 1] },
          }
        : {
            b: { p1: [0.13, 0.54], p2: [0.39, 0.38], s: [1.1, 1.1] },
            c: { p1: [0.64, 0.52], p2: [0.88, 0.4], s: [1.2, 1.24] },
            d: { p1: [0.66, 0.5], p2: [0.82, 0.44], s: [1.12, 1.16] },
            line: { b: [-0.38, 0.85], c: [0.1, 1], d: [0.08, 0.95] },
          };

      tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 10 },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(prog, { scaleX: 1, duration: 100, ease: "none" }, 0);

      // — view 01 -> scroll 1: the statement lifts away, the pair drifts together
      if (scrollcue && scrollcue.firstElementChild) {
        tl.to(scrollcue.firstElementChild, { opacity: 0, duration: 8 }, 6);
      }
      tl.to(t1, { y: -vh * 0.4, opacity: 0, duration: 12, ease: "power2.in" }, 7);
      tl.to(
        p1,
        { x: cx(B.b.p1[0]), y: cy(B.b.p1[1]), scale: B.b.s[0], rotate: -0.8, duration: 28 },
        12
      );
      tl.to(
        p2,
        { x: cx(B.b.p2[0]), y: cy(B.b.p2[1]), scale: B.b.s[1], rotate: 1, duration: 28 },
        12
      );
      tl.fromTo(t2, { y: vh * 0.18, opacity: 0 }, { y: 0, opacity: 1, duration: 16 }, 24);

      // the red line begins between them
      tl.to(line, { opacity: 1, x: vw * B.line.b[0], scaleX: B.line.b[1], duration: 2 }, 22);
      tl.to(path, { strokeDashoffset: L * 0.45, duration: 24, ease: "none" }, 24);

      // — scroll 2: the possibility. The pair crosses to the other side of the
      // frame and the composition flips flush left
      tl.to(t2, { y: -vh * 0.3, opacity: 0, duration: 14 }, 44);
      tl.to(
        p1,
        { x: cx(B.c.p1[0]), y: cy(B.c.p1[1]), scale: B.c.s[0], rotate: -0.4, duration: 26 },
        42
      );
      tl.to(
        p2,
        { x: cx(B.c.p2[0]), y: cy(B.c.p2[1]), scale: B.c.s[1], rotate: 0.5, duration: 26 },
        42
      );
      tl.to(line, { x: vw * B.line.c[0], scaleX: B.line.c[1], duration: 26 }, 42);
      tl.fromTo(t3, { y: vh * 0.16, opacity: 0 }, { y: 0, opacity: 1, duration: 16 }, 52);
      tl.to(path, { strokeDashoffset: 0, duration: 24, ease: "none" }, 50);

      // — scroll 3: the reveal. The two settle into one overlapping pair
      tl.to(t3, { y: -vh * 0.26, opacity: 0, duration: 14 }, 72);
      tl.to(
        p1,
        { x: cx(B.d.p1[0]), y: cy(B.d.p1[1]), scale: B.d.s[0], rotate: 0, duration: 22 },
        70
      );
      tl.to(
        p2,
        { x: cx(B.d.p2[0]), y: cy(B.d.p2[1]), scale: B.d.s[1], rotate: 0, duration: 22 },
        70
      );
      tl.to(line, { x: vw * B.line.d[0], scaleX: B.line.d[1], duration: 22 }, 70);
      tl.fromTo(t4, { y: vh * 0.14, opacity: 0 }, { y: 0, opacity: 1, duration: 16 }, 78);
      if (chapter) tl.to(chapter, { opacity: 0, duration: 8 }, 88);
      if (scrollcue) tl.to(scrollcue, { opacity: 0, duration: 8 }, 88);


    };

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isMob = window.innerWidth < 760;
        if (prevMob !== null && isMob !== prevMob) {
          build();
        } else {
          ScrollTrigger.refresh();
        }
      }, 200);
    };

    const waitForGSAP = () => {
      if (typeof window !== "undefined" && gsap && ScrollTrigger) {
        build();

        if (!syncTicker) {
          let lastY = -1;
          syncTicker = () => {
            const y = window.scrollY || document.documentElement.scrollTop || 0;
            if (y !== lastY) {
              lastY = y;
              ScrollTrigger.update();
            }
          };
          gsap.ticker.add(syncTicker);

          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
          }
          [300, 900, 2000].forEach((d) => setTimeout(() => ScrollTrigger.refresh(), d));
        }

        window.addEventListener("resize", handleResize);
        ScrollTrigger.refresh();
      } else {
        waitTimer = setTimeout(waitForGSAP, 60);
      }
    };

    waitForGSAP();

    return () => {
      if (waitTimer) clearTimeout(waitTimer);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (syncTicker) gsap.ticker.remove(syncTicker);
      window.removeEventListener("resize", handleResize);
      teardown();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      id="theunknown"
      style={{
        position: "relative",
        height: "260vh",
        width: "100%",
        background: "#F3EEE6",
        overflow: "clip",
      }}
    >
      <div
        data-el="stage"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#F3EEE6",
        }}
      >
        {/* Person 01 Left */}
        <div
          data-el="p1"
          style={{
            position: "absolute",
            left: "-7vw",
            top: "22vh",
            width: "32vw",
            height: "64vh",
            zIndex: 12,
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url('/images/person-01.png')",
              backgroundPosition: "center 28%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              filter: "contrast(1.1) saturate(1.06) brightness(0.97)",
            }}
          />
        </div>

        {/* Person 02 Right */}
        <div
          data-el="p2"
          style={{
            position: "absolute",
            left: "78vw",
            top: "12vh",
            width: "28vw",
            height: "54vh",
            zIndex: 13,
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url('/images/person-02.png')",
              backgroundPosition: "center 22%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              filter: "contrast(1.1) saturate(1.06) brightness(0.97)",
            }}
          />
        </div>

        {/* Dynamic Curved Red Thread */}
        <svg
          data-el="line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 14,
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          <path
            data-el="linePath"
            d="M 48 58 C 56 46, 60 64, 66 54 C 72 44, 76 50, 84 42"
            fill="none"
            stroke="#7C1405"
            strokeWidth="1.6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Beat 1: YOU DON'T KNOW WHO YOU'LL MEET */}
        <div
          data-el="t1"
          style={{
            position: "absolute",
            left: "26.5vw",
            top: "34vh",
            width: "48vw",
            zIndex: 20,
            pointerEvents: "none",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "4.9vw",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#171311",
          }}
        >
          <div style={{ whiteSpace: "nowrap" }}>YOU DON&apos;T KNOW</div>
          <div style={{ whiteSpace: "nowrap", paddingLeft: "1.1em", fontStyle: "italic", fontWeight: 500 }}>
            WHO YOU&apos;LL MEET.
          </div>
        </div>

        {/* Beat 2: SOMEONE YOU'VE NEVER MET */}
        <div
          data-el="t2"
          style={{
            position: "absolute",
            right: "4vw",
            top: "54vh",
            width: "38vw",
            zIndex: 20,
            opacity: 0,
            pointerEvents: "none",
            textAlign: "right",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "4.8vw",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#171311",
          }}
        >
          <div style={{ whiteSpace: "nowrap" }}>SOMEONE YOU&apos;VE</div>
          <div style={{ whiteSpace: "nowrap", fontStyle: "italic", fontWeight: 500 }}>NEVER MET.</div>
        </div>

        {/* Beat 3: SOMEONE YOU WOULDN'T HAVE SEARCHED FOR */}
        <div
          data-el="t3"
          style={{
            position: "absolute",
            left: "4vw",
            top: "27vh",
            width: "38vw",
            zIndex: 20,
            opacity: 0,
            pointerEvents: "none",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "4.4vw",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "#171311",
          }}
        >
          <div style={{ whiteSpace: "nowrap" }}>SOMEONE YOU</div>
          <div style={{ whiteSpace: "nowrap", paddingLeft: "0.9em" }}>WOULDN&apos;T HAVE</div>
          <div
            data-el="t3b"
            style={{
              whiteSpace: "nowrap",
              paddingLeft: "1.2em",
              fontStyle: "italic",
              fontWeight: 500,
              color: "#7C1405",
            }}
          >
            SEARCHED FOR.
          </div>
        </div>

        {/* Beat 4: AND THAT'S THE POINT */}
        <div
          data-el="t4"
          style={{
            position: "absolute",
            left: "6vw",
            top: "37vh",
            width: "40vw",
            zIndex: 20,
            opacity: 0,
            pointerEvents: "none",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "6vw",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            color: "#171311",
          }}
        >
          <div style={{ whiteSpace: "nowrap" }}>AND THAT&apos;S</div>
          <div
            data-el="t4b"
            style={{
              whiteSpace: "nowrap",
              paddingLeft: "0.7em",
              fontStyle: "italic",
              fontWeight: 500,
              color: "#7C1405",
            }}
          >
            THE POINT.
          </div>
        </div>

        {/* Chapter 01 Label */}
        <div
          data-el="chapter"
          style={{
            position: "absolute",
            right: "6vw",
            bottom: "5vh",
            zIndex: 30,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: "1.1em",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#171311",
          }}
        >
          <span style={{ color: "#7C1405" }}>01 / 05</span>
          <span style={{ display: "block", width: "28px", height: "2px", background: "#7C1405" }} />
          <span>The Unknown</span>
        </div>

        {/* Scroll Cue & Progress Indicator */}
        <div
          data-el="scrollcue"
          style={{
            position: "absolute",
            left: "6vw",
            bottom: "5vh",
            zIndex: 30,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: "1em",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#171311",
          }}
        >
          <span>Scroll to discover</span>
          <span
            style={{
              display: "block",
              width: "84px",
              height: "2px",
              background: "rgba(23, 19, 17, 0.2)",
            }}
          >
            <span
              data-el="prog"
              style={{
                display: "block",
                width: "100%",
                height: "2px",
                background: "#7C1405",
                transform: "scaleX(0)",
                transformOrigin: "left center",
              }}
            />
          </span>
        </div>


      </div>
    </div>
  );
}
