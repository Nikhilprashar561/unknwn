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

    const q = (n: string) => Array.from(root.querySelectorAll<HTMLElement>(`[data-el="${n}"]`));
    const e = (n: string) => root.querySelector<HTMLElement>(`[data-el="${n}"]`);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mob = vw < 760;
    const k = mob ? 0.6 : 1;

    const l1 = e("l1");
    const l2 = e("l2");
    const p1 = e("p1");
    const p2 = e("p2");
    const words = q("word");
    const chs = q("ch");
    const noise = q("noise");
    const linePath = e("linePath") as SVGPathElement | null;
    const line = e("line");
    const prog = e("prog");
    const point = e("point");
    const tooMany = e("tooMany");
    const tooNoise = e("tooNoise");
    const removed = e("removed");
    const final = e("final");
    const sub = e("sub");

    if (!l1 || !l2 || !p1 || !p2 || !linePath || !line || !prog) return;

    const w1 = Array.from(l1.children) as HTMLElement[];
    const w2 = Array.from(l2.children) as HTMLElement[];

    const dx = (tx: number) => (_i: number, el: HTMLElement) =>
      tx - (el.offsetLeft + el.offsetWidth / 2);
    const dy = (ty: number) => (_i: number, el: HTMLElement) =>
      ty - (el.offsetTop + el.offsetHeight / 2);

    if (mob) {
      Object.assign(l1.style, {
        fontSize: "14vw",
        flexWrap: "wrap",
        whiteSpace: "normal",
        width: "92vw",
        top: "14vh",
        left: "4vw",
      });
      w1.forEach((span) => {
        span.style.left = "0";
      });
      Object.assign(l2.style, {
        fontSize: "13vw",
        flexWrap: "wrap",
        whiteSpace: "normal",
        width: "92vw",
        top: "42vh",
        left: "4vw",
      });
      if (tooMany) Object.assign(tooMany.style, { fontSize: "13.5vw", top: "20vh", left: "5vw", maxWidth: "90vw" });
      if (tooNoise) Object.assign(tooNoise.style, { fontSize: "14.5vw", top: "42vh", left: "6vw", maxWidth: "90vw" });
      if (removed) {
        Object.assign(removed.style, { fontSize: "10.5vw", top: "28vh", left: "5vw", maxWidth: "90vw" });
        const r1 = removed.children[0] as HTMLElement;
        const r2 = removed.children[1] as HTMLElement;
        if (r1) {
          r1.style.left = "0";
          r1.style.top = "0";
        }
        if (r2) {
          r2.style.paddingLeft = "0.4em";
          r2.style.top = "0";
        }
      }
      if (final) {
        Object.assign(final.style, { fontSize: "8vw", top: "28vh", left: "5vw", width: "90vw" });
        const f3 = final.children[2] as HTMLElement;
        if (f3) f3.style.left = "0";
      }
      if (sub) Object.assign(sub.style, { left: "5vw", top: "72vh", maxWidth: "90vw" });
      Object.assign(p1.style, { left: "-8vw", width: "62vw", height: "52vh", top: "12vh" });
      Object.assign(p2.style, { left: "48vw", width: "56vw", height: "40vh", top: "50vh" });
      noise.forEach((n) => {
        const curW = parseFloat(n.style.width || "20");
        const curH = parseFloat(n.style.height || "20");
        if (!isNaN(curW)) n.style.width = `${curW * 1.5}vw`;
        if (!isNaN(curH)) n.style.height = `${curH * 1.1}vh`;
      });
    }

    const dirs = [
      [-1, -0.7],
      [0, -1],
      [0.6, -1],
      [1, -0.5],
      [1, 0],
      [-1, 0.3],
      [0, 1],
      [1, 0.6],
      [1, 1],
      [-1, 0.8],
      [-0.7, 1],
      [0.3, 1],
      [1, 0.4],
      [-0.4, -1],
    ];

    noise.forEach((n, i) => {
      const d = dirs[i % dirs.length];
      gsap.set(n, { x: d[0] * vw * 0.85, y: d[1] * vh * 0.8, scale: 0.86 });
    });
    gsap.set(p1, { x: -vw * 0.75 });
    gsap.set(p2, { x: vw * 0.8 });

    const len = linePath.getTotalLength();
    linePath.style.strokeDasharray = `${len}`;
    linePath.style.strokeDashoffset = `${len}`;
    gsap.set(line, { scale: 0.55, transformOrigin: "50% 50%" });

    words.forEach((w, i) => {
      const d = dirs[(i * 3 + 1) % dirs.length];
      gsap.set(w, { x: d[0] * vw * 0.5, y: d[1] * vh * 0.45 });
    });

    const ease = "power2.inOut";
    const tl = gsap.timeline({
      defaults: { ease, duration: 8 },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9,
        invalidateOnRefresh: true,
      },
    });

    tl.to(prog, { scaleX: 1, duration: 100, ease: "none" }, 0);

    // — transformation 01: statement breaks apart and travels
    tl.to(
      w1,
      {
        y: -vh * 0.95 * k,
        x: (i: number) => [-vw * 0.2, vw * 0.08, -vw * 0.34][i] * k,
        duration: 10,
        stagger: 0.7,
      },
      12
    );
    tl.to(
      w2,
      {
        y: vh * 0.9 * k,
        x: (i: number) => [vw * 0.26, -vw * 0.14, vw * 0.38][i] * k,
        scale: (i: number) => [1.35, 0.78, 1.18][i],
        duration: 10,
        stagger: 0.7,
      },
      13
    );
    if (point) tl.to(point, { y: vh * 0.2, opacity: 0, duration: 6 }, 12);
    if (chs[0]) tl.to(chs[0], { opacity: 0, duration: 4 }, 18);

    // — 02 / the people
    tl.to(p1, { x: 0, opacity: 1, duration: 10, ease: "power3.out" }, 21);
    tl.to(p2, { x: 0, opacity: 1, duration: 10, ease: "power3.out" }, 24);
    if (chs[1]) tl.to(chs[1], { opacity: 1, duration: 4 }, 25);

    // — 03 / too many choices
    if (chs[1]) tl.to(chs[1], { opacity: 0, duration: 3 }, 38);
    if (chs[2]) tl.to(chs[2], { opacity: 1, duration: 4 }, 40);
    tl.set(p1, { zIndex: 6 }, 38);
    tl.set(p2, { zIndex: 6 }, 38);
    tl.to(p1, { scale: 0.46, x: vw * 0.14, y: vh * 0.08, duration: 12 }, 38);
    tl.to(p2, { scale: 0.5, x: -vw * 0.16, y: -vh * 0.06, duration: 12 }, 38);
    tl.to(
      noise,
      { x: 0, y: 0, scale: 1, opacity: 1, duration: 11, stagger: 0.55, ease: "power2.out" },
      38
    );
    if (tooMany) {
      tl.fromTo(tooMany, { y: vh * 0.16, opacity: 0 }, { y: 0, opacity: 1, duration: 8 }, 43);
      tl.to(tooMany, { y: -vh * 0.22, opacity: 0, duration: 8 }, 51);
    }
    if (tooNoise) {
      tl.fromTo(tooNoise, { y: vh * 0.2, opacity: 0 }, { y: 0, opacity: 1, duration: 8 }, 49);
      tl.to(tooNoise, { y: -vh * 0.18, opacity: 0, duration: 7 }, 57);
    }

    // — 04 / remove the noise
    if (chs[2]) tl.to(chs[2], { opacity: 0, duration: 3 }, 57);
    if (chs[3]) tl.to(chs[3], { opacity: 1, duration: 4 }, 60);
    noise.forEach((n, i) => {
      const d = dirs[(i * 5 + 3) % dirs.length];
      tl.to(
        n,
        {
          x: d[0] * vw * 0.9,
          y: d[1] * vh * 0.9,
          scale: i % 3 === 0 ? 0.4 : 1.12,
          opacity: 0,
          duration: 10,
          ease: "power2.in",
        },
        56 + i * 0.75
      );
    });
    tl.set(p1, { zIndex: 12 }, 66);
    tl.set(p2, { zIndex: 13 }, 66);
    tl.to(p1, { scale: 1, x: 0, y: 0, duration: 12 }, 60);
    tl.to(p2, { scale: 1, x: 0, y: 0, duration: 12 }, 60);
    if (removed) {
      tl.fromTo(removed, { y: vh * 0.12, opacity: 0 }, { y: 0, opacity: 1, duration: 8 }, 64);
      tl.to(removed, { y: -vh * 0.1, opacity: 0, duration: 6 }, 74);
    }

    // — 05 / the connection
    if (chs[3]) tl.to(chs[3], { opacity: 0, duration: 3 }, 72);
    if (chs[4]) tl.to(chs[4], { opacity: 1, duration: 4 }, 74);
    tl.to(
      p1,
      {
        scale: mob ? 0.44 : 0.6,
        x: dx(vw * (mob ? 0.32 : 0.4)),
        y: dy(vh * (mob ? 0.34 : 0.44)),
        duration: 12,
      },
      72
    );
    tl.to(
      p2,
      {
        scale: mob ? 0.5 : 0.74,
        x: dx(vw * (mob ? 0.7 : 0.62)),
        y: dy(vh * (mob ? 0.66 : 0.58)),
        duration: 12,
      },
      72
    );
    tl.to(words, { x: 0, y: 0, opacity: 1, duration: 9, stagger: 0.6, ease: "power2.out" }, 74);
    tl.to(
      [words[1], words[4], words[5]],
      {
        y: (i: number) => [-vh * 0.4, vh * 0.4, -vh * 0.45][i],
        opacity: 0,
        duration: 8,
        ease: "power2.in",
      },
      81
    );
    tl.to(
      [words[0], words[2], words[3]],
      {
        x: (_i: number, el: HTMLElement) => (vw * 0.5 - (el.offsetLeft + el.offsetWidth / 2)) * 0.86,
        y: (_i: number, el: HTMLElement) => (vh * 0.5 - (el.offsetTop + el.offsetHeight / 2)) * 0.86,
        scale: 0.3,
        duration: 10,
      },
      83
    );
    tl.to(line, { opacity: 1, duration: 4 }, 79);
    tl.to(linePath, { strokeDashoffset: 0, duration: 13, ease: "none" }, 80);

    // — final reveal
    tl.to([words[0], words[2], words[3]], { opacity: 0, duration: 6 }, 89);
    tl.to(line, { scale: 1, duration: 12 }, 88);
    tl.to(
      p1,
      {
        scale: mob ? 0.26 : 0.34,
        x: dx(vw * (mob ? 0.2 : 0.135)),
        y: dy(vh * (mob ? 0.14 : 0.2)),
        duration: 12,
      },
      88
    );
    tl.to(
      p2,
      {
        scale: mob ? 0.3 : 0.5,
        x: dx(vw * (mob ? 0.8 : 0.875)),
        y: dy(vh * (mob ? 0.87 : 0.79)),
        duration: 12,
      },
      88
    );
    if (final) tl.fromTo(final, { y: vh * 0.08, opacity: 0 }, { y: 0, opacity: 1, duration: 9 }, 90);
    if (sub) tl.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: 5 }, 95);

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      id="theunknown"
      style={{
        position: "relative",
        height: "700vh",
        width: "100%",
        background: "#F3EEE6",
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
        {/* Animated Connecting Curved Line */}
        <svg
          data-el="line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 11,
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          <path
            data-el="linePath"
            d="M 18 30 C 30 18, 33 44, 42 47 C 51 50, 52 63, 62 61 C 71 59, 74 66, 82 72"
            fill="none"
            stroke="#C0614C"
            strokeWidth="1.1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Person 01 (Left) */}
        <div
          data-el="p1"
          style={{
            position: "absolute",
            left: "-6vw",
            top: "9vh",
            width: "34vw",
            height: "78vh",
            zIndex: 12,
            opacity: 0,
            overflow: "hidden",
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "url('/images/person-01.png') center / cover no-repeat",
              position: "relative",
              top: "24px",
            }}
          />
        </div>

        {/* Person 02 (Right) */}
        <div
          data-el="p2"
          style={{
            position: "absolute",
            left: "72vw",
            top: "44vh",
            width: "24vw",
            height: "48vh",
            zIndex: 13,
            opacity: 0,
            overflow: "hidden",
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "url('/images/person-02.png') center / cover no-repeat",
            }}
          />
        </div>

        {/* Swarm / Candidate Noise Faces */}
        <div data-el="noise" style={{ position: "absolute", left: "-9vw", top: "-7vh", width: "27vw", height: "41vh", zIndex: 6, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-01.webp') center / cover no-repeat" }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "22vw", top: "7vh", width: "14vw", height: "27vh", zIndex: 7, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-02.png') center / cover no-repeat", opacity: 0.8 }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "43vw", top: "-5vh", width: "21vw", height: "35vh", zIndex: 6, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-03.png') center / cover no-repeat" }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "69vw", top: "3vh", width: "18vw", height: "33vh", zIndex: 8, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-04.png') center / cover no-repeat" }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "88vw", top: "25vh", width: "21vw", height: "31vh", zIndex: 6, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-05.jpg') center / cover no-repeat" }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "5vw", top: "39vh", width: "12vw", height: "23vh", zIndex: 9, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-06.jpg') center / cover no-repeat" }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "78vw", top: "57vh", width: "23vw", height: "37vh", zIndex: 7, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-09.png') center / cover no-repeat", opacity: 0.8 }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "-7vw", top: "55vh", width: "17vw", height: "31vh", zIndex: 6, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-10.png') center / cover no-repeat" }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "15vw", top: "73vh", width: "25vw", height: "35vh", zIndex: 7, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-11.png') center / cover no-repeat" }} />
        </div>
        <div data-el="noise" style={{ position: "absolute", left: "45vw", top: "81vh", width: "15vw", height: "25vh", zIndex: 9, opacity: 0, overflow: "hidden", willChange: "transform, opacity" }}>
          <div style={{ width: "100%", height: "100%", background: "url('/images/noise-12.png') center / cover no-repeat" }} />
        </div>

        {/* Text 1: YOU DON'T KNOW */}
        <div
          data-el="l1"
          style={{
            position: "absolute",
            left: "clamp(-2.8vw, 2vw, 4vw)",
            top: "16vh",
            zIndex: 20,
            display: "flex",
            gap: "0.2em",
            flexWrap: "nowrap",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(48px, 10.6vw, 160px)",
            lineHeight: 0.84,
            letterSpacing: "-0.02em",
            color: "#1B1512",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          <span style={{ display: "inline-block", position: "relative", left: "clamp(0px, 4vw, 71px)" }}>YOU</span>
          <span style={{ display: "inline-block", position: "relative", left: "clamp(0px, 4vw, 71px)", color: "#7c1405" }}>DON'T</span>
          <span style={{ display: "inline-block", position: "relative", left: "clamp(0px, 4vw, 71px)" }}>KNOW</span>
        </div>

        {/* Text 2: WHO YOU'LL MEET. */}
        <div
          data-el="l2"
          style={{
            position: "absolute",
            left: "clamp(4vw, 7.5vw, 10vw)",
            top: "41vh",
            zIndex: 20,
            display: "flex",
            gap: "0.2em",
            flexWrap: "nowrap",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(42px, 9.4vw, 140px)",
            lineHeight: 0.84,
            letterSpacing: "-0.02em",
            color: "#1B1512",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          <span style={{ display: "inline-block" }}>WHO</span>
          <span style={{ display: "inline-block" }}>YOU'LL</span>
          <span style={{ display: "inline-block", color: "#7c1405" }}>MEET.</span>
        </div>

        {/* And that's the point. */}
        <div
          data-el="point"
          style={{
            position: "absolute",
            right: "clamp(16px, 7vw, 9vw)",
            bottom: "clamp(24px, 10vh, 80px)",
            zIndex: 21,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(13px, 2.2vw, 34px)",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#1B1512",
            willChange: "transform, opacity",
          }}
        >
          And that's the point.
        </div>

        {/* TOO MANY CHOICES */}
        <div
          data-el="tooMany"
          style={{
            position: "absolute",
            left: "clamp(16px, 6vw, 8vw)",
            top: "26vh",
            maxWidth: "clamp(260px, 90vw, 1100px)",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(34px, 12.5vw, 180px)",
            lineHeight: 0.86,
            letterSpacing: "-0.025em",
            color: "#1B1512",
            wordBreak: "break-word",
            willChange: "transform, opacity",
          }}
        >
          <div style={{ padding: "4px 2px", position: "relative" }}>TOO MANY</div>
          <div style={{ padding: "4px 2px", position: "relative", color: "#7c1405", fontStyle: "italic" }}>
            CHOICES.
          </div>
        </div>

        {/* TOO MUCH NOISE */}
        <div
          data-el="tooNoise"
          style={{
            position: "absolute",
            left: "clamp(20px, 32vw, 36vw)",
            top: "48vh",
            maxWidth: "clamp(260px, 90vw, 1100px)",
            zIndex: 7,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(36px, 13.5vw, 190px)",
            lineHeight: 0.84,
            letterSpacing: "-0.02em",
            color: "#1B1512",
            wordBreak: "break-word",
            willChange: "transform, opacity",
          }}
        >
          <div style={{ position: "relative" }}>TOO MUCH</div>
          <div style={{ paddingLeft: "clamp(0.2em, 2vw, 0.5em)", position: "relative", color: "#7c1405" }}>
            NOISE.
          </div>
        </div>

        {/* SO WE REMOVED THE NOISE */}
        <div
          data-el="removed"
          style={{
            position: "absolute",
            left: "clamp(16px, 8vw, 10vw)",
            top: "36vh",
            maxWidth: "clamp(260px, 90vw, 1100px)",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(30px, 8.2vw, 120px)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "#1B1512",
            wordBreak: "break-word",
            willChange: "transform, opacity",
          }}
        >
          <div style={{ padding: "4px 2px", position: "relative" }}>
            SO WE REMOVED
          </div>
          <div style={{ paddingLeft: "clamp(0.4em, 2.42em, 2.42em)", fontStyle: "italic", fontWeight: 400, color: "#7c1405", position: "relative" }}>
            THE NOISE.
          </div>
        </div>

        {/* Floating Interleaved Interest Words */}
        <div data-el="word" style={{ position: "absolute", left: "4vw", top: "21vh", zIndex: 18, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(22px, 6.4vw, 90px)", letterSpacing: "-0.01em", color: "#1B1512" }}>COFFEE</div>
        <div data-el="word" style={{ position: "absolute", left: "65vw", top: "11vh", zIndex: 18, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(20px, 5.2vw, 75px)", letterSpacing: "-0.01em", color: "#1B1512" }}>TRAVEL</div>
        <div data-el="word" style={{ position: "absolute", left: "72vw", top: "67vh", zIndex: 18, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(24px, 7vw, 100px)", letterSpacing: "-0.01em", color: "#1B1512" }}>MUSIC</div>
        <div data-el="word" style={{ position: "absolute", left: "11vw", top: "72vh", zIndex: 18, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(26px, 8vw, 115px)", letterSpacing: "-0.01em", color: "#1B1512" }}>ART</div>
        <div data-el="word" style={{ position: "absolute", left: "39vw", top: "85vh", zIndex: 18, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(18px, 5vw, 72px)", letterSpacing: "-0.01em", color: "#1B1512" }}>FOOD</div>
        <div data-el="word" style={{ position: "absolute", left: "43vw", top: "5vh", zIndex: 18, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 400, fontSize: "clamp(20px, 5.6vw, 80px)", letterSpacing: "-0.01em", color: "#1B1512" }}>MOVIES</div>

        {/* Final Scene 01 Message */}
        <div
          data-el="final"
          style={{
            position: "absolute",
            left: "clamp(16px, 16vw, 20vw)",
            top: "36vh",
            width: "clamp(260px, 75vw, 900px)",
            maxWidth: "90vw",
            zIndex: 22,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(24px, 5.6vw, 78px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            color: "#1B1512",
            wordBreak: "break-word",
            willChange: "transform, opacity",
          }}
        >
          <div>MEET SOMEONE</div>
          <div style={{ paddingLeft: "clamp(0.2em, 0.6em, 0.6em)" }}>YOU DIDN'T HAVE</div>
          <div style={{ paddingLeft: "clamp(0.4em, 1.4em, 1.4em)" }}>
            TO <span style={{ fontStyle: "italic", fontWeight: 500, color: "#7c1405" }}>CHOOSE.</span>
          </div>
        </div>

        <div
          data-el="sub"
          style={{
            position: "absolute",
            left: "clamp(16px, 16vw, 20vw)",
            top: "74vh",
            zIndex: 22,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1B1512",
            willChange: "transform, opacity",
          }}
        >
          Curated connections. Real dates.
        </div>

        {/* Chapter Indicator */}
        <div
          style={{
            position: "absolute",
            left: "clamp(16px, 2.2vw, 32px)",
            top: "calc(var(--unknkn-nav-h, 60px) + 16px)",
            zIndex: 30,
            height: "3.4em",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(10px, 1vw, 12px)",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#1B1512",
          }}
        >
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap" }}>
            <span style={{ opacity: 0.42 }}>01 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>The Unknown</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>02 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>The People</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>03 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>Too Many Choices</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>04 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>Remove The Noise</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>05 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>The Connection</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            position: "absolute",
            left: "clamp(16px, 2.2vw, 32px)",
            bottom: "4.5vh",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <div style={{ width: "clamp(80px, 14vw, 180px)", height: "1px", background: "rgba(27, 21, 18, 0.22)" }}>
            <div
              data-el="prog"
              style={{
                width: "100%",
                height: "1px",
                background: "#1B1512",
                transform: "scaleX(0)",
                transformOrigin: "left center",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(27, 21, 18, 0.45)",
            }}
          >
            Scene 01
          </span>
        </div>
      </div>
    </div>
  );
}
