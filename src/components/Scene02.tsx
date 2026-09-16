"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Scene02() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const q = (n: string) => Array.from(root.querySelectorAll<HTMLElement>(`[data-el="${n}"]`));
    const e = (n: string) => root.querySelector<HTMLElement>(`[data-el="${n}"]`);

    const RED = "#7C1405";
    const IVORY = "#F3EEE6";
    const INK = "#171311";

    const bgRed = e("bgRed");
    const bgDark = e("bgDark");
    const line = e("line");
    const linePath = e("linePath") as SVGPathElement | null;
    const inks = q("ink");
    const chs = q("ch");
    const times = q("time");
    const mechs = q("mech");
    const envs = q("env");
    const ints = q("int");
    const prog = e("prog");

    if (!bgRed || !bgDark || !line || !linePath || !prog) return;

    bgRed.style.background = RED;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mob = vw < 760;

    const cx = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
    const cy = (el: HTMLElement) => el.offsetTop + el.offsetHeight / 2;
    const dx = (tx: number) => (_i: number, el: HTMLElement) => tx - cx(el);
    const dy = (ty: number) => (_i: number, el: HTMLElement) => ty - cy(el);

    if (mob) {
      const set = (n: string, s: Partial<CSSStyleDeclaration>) => {
        const el = e(n);
        if (el) Object.assign(el.style, s);
      };
      set("qWhat", { fontSize: "17vw", left: "6vw", top: "14vh" });
      set("qIs", { fontSize: "13vw", left: "40vw", top: "26vh" });
      set("qUnknown", { fontSize: "25vw", left: "-2vw", top: "38vh" });
      set("who", { fontSize: "34vw", top: "14vh", left: "4vw" });
      set("portraitA", { left: "22vw", top: "38vh", width: "78vw", height: "56vh" });
      set("where", { fontSize: "28vw", top: "22vh", left: "5vw" });
      set("when", { fontSize: "32vw", top: "12vh", left: "4vw" });
      set("seven", { fontSize: "24vw", top: "38vh" });
      set("how", { fontSize: "38vw", top: "22vh", left: "6vw" });
      set("notLike", { fontSize: "17vw", top: "34vh", left: "6vw", whiteSpace: "normal" });
      set("soWhat", { fontSize: "15vw", top: "34vh", left: "6vw", whiteSpace: "normal" });
      set("curate", { fontSize: "13vw", top: "20vh", left: "6vw" });
      const cu = e("curate");
      if (cu) {
        (cu.children[0] as HTMLElement).style.whiteSpace = "nowrap";
        Object.assign((cu.children[1] as HTMLElement).style, {
          paddingLeft: "0",
          fontSize: "1.1em",
          whiteSpace: "nowrap",
        });
      }
      set("manifesto", { top: "58vh" });
      set("whereL", { right: "5vw", bottom: "3vh", top: "auto", left: "auto", maxWidth: "76vw" });
      set("sysYou", { fontSize: "28vw" });
      set("sysVibe", { fontSize: "19vw" });
      set("sysCur", { fontSize: "15vw", whiteSpace: "normal" });
      set("sysSomeone", { fontSize: "20vw", left: "6vw" });
      set("sysPlace", { fontSize: "20vw", top: "34vh" });
      set("sysDate", { fontSize: "26vw" });
      set("portraitB", { left: "26vw", top: "40vh", width: "74vw", height: "52vh" });
      set("envB", { left: "4vw", top: "20vh", width: "84vw", height: "54vh" });
      set("dateB", { left: "10vw", top: "18vh", width: "80vw", height: "58vh" });
      set("fin1", { fontSize: "11vw", top: "30vh", left: "7vw", width: "86vw" });
      set("fin2", { fontSize: "12.5vw", top: "28vh", left: "7vw", width: "86vw" });
      set("thats", { fontSize: "14vw", top: "38vh", left: "7vw" });
      set("finSub", { left: "7vw", top: "56vh" });
      set("next", { left: "7vw" });
      const nx = e("next");
      if (nx && nx.children[1]) (nx.children[1] as HTMLElement).style.fontSize = "8vw";
      times.forEach((t) => {
        t.style.fontSize = `${parseFloat(t.style.fontSize || "4") * 1.8}vw`;
      });
      mechs.forEach((m) => {
        m.style.fontSize = `${parseFloat(m.style.fontSize || "3") * 1.7}vw`;
      });
      ints.forEach((w) => {
        w.style.fontSize = `${parseFloat(w.style.fontSize || "4") * 1.8}vw`;
      });
      envs.forEach((n) => {
        n.style.width = `${parseFloat(n.style.width || "20") * 1.7}vw`;
        n.style.height = `${parseFloat(n.style.height || "30") * 1.1}vh`;
      });
      envs.slice(3).forEach((n) => {
        n.style.display = "none";
      });
    }

    const liveEnvs = envs.filter((n) => n.style.display !== "none");
    const floor = mob ? 82 : 88;
    liveEnvs.forEach((n) => {
      const t = parseFloat(n.style.top);
      const h = parseFloat(n.style.height);
      if (t + h > floor) n.style.height = `${Math.max(20, floor - t)}vh`;
    });

    const k = mob ? 0.62 : 1;

    const lineLen = linePath.getTotalLength();
    linePath.style.strokeDasharray = `${lineLen}`;
    linePath.style.strokeDashoffset = `${lineLen * 0.34}`;
    gsap.set(line, { scale: 1, transformOrigin: "50% 50%" });

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

    tl.to(prog, { scaleX: 1, duration: 566, ease: "none" }, 0);

    // ——— bridge from Scene 01: line travels, ivory becomes red
    tl.to(line, { opacity: 1, duration: 5 }, 0);
    tl.to(linePath, { strokeDashoffset: 0, duration: 14, ease: "none" }, 0);
    tl.to(bgRed, { opacity: 1, duration: 14 }, 3);
    tl.to(linePath, { attr: { stroke: IVORY }, duration: 8 }, 6);
    tl.to(inks, { color: IVORY, duration: 8 }, 5);
    tl.to(line, { x: vw * 0.5, y: -vh * 0.34, scale: 1.7, opacity: 0, duration: 20, ease: "power1.inOut" }, 14);

    // ——— frame 01 / the question
    const qWhat = e("qWhat");
    const qIs = e("qIs");
    const qUnknown = e("qUnknown");
    const qSub = e("qSub");
    if (qWhat) tl.fromTo(qWhat, { y: vh * 0.14, opacity: 0 }, { y: 0, opacity: 1, duration: 10 }, 9);
    if (qIs) tl.fromTo(qIs, { y: vh * 0.12, opacity: 0 }, { y: 0, opacity: 1, duration: 10 }, 12);
    if (qUnknown) tl.fromTo(qUnknown, { y: vh * 0.16, scale: 1.16, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 14 }, 14);
    if (qSub) tl.fromTo(qSub, { opacity: 0 }, { opacity: 1, duration: 7 }, 20);
    if (qWhat && qIs) tl.to([qWhat, qIs], { y: -vh * 0.5 * k, opacity: 0, duration: 12, stagger: 1.2 }, 30);
    if (qSub) tl.to(qSub, { opacity: 0, duration: 6 }, 30);
    if (qUnknown) tl.to(qUnknown, { y: -vh * 0.62 * k, scale: 0.72, opacity: 0, duration: 14 }, 31);

    // ——— frame 02 / WHO
    const who = e("who");
    const portraitA = e("portraitA");
    const whoL1 = e("whoL1");
    const whoL2 = e("whoL2");
    if (chs[0]) tl.to(chs[0], { opacity: 0, duration: 4 }, 32);
    if (chs[1]) tl.to(chs[1], { opacity: 1, duration: 5 }, 38);
    if (who) tl.fromTo(who, { x: -vw * 0.55, opacity: 0 }, { x: 0, opacity: 1, duration: 16, ease: "power3.out" }, 38);
    if (portraitA) tl.fromTo(portraitA, { x: vw * 0.5, opacity: 0 }, { x: 0, opacity: 1, duration: 16, ease: "power3.out" }, 44);
    if (whoL1) tl.fromTo(whoL1, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 8 }, 52);
    if (whoL2) tl.fromTo(whoL2, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 8 }, 62);
    if (whoL1 && whoL2) tl.to([whoL1, whoL2], { opacity: 0, duration: 7, stagger: 0.8 }, 74);
    if (who) tl.to(who, { x: -vw * 0.7, opacity: 0, duration: 14 }, 74);
    if (portraitA) tl.to(portraitA, { x: vw * 0.45, scale: 1.08, opacity: 0, duration: 14 }, 76);

    // ——— frame 03 / WHERE
    const where = e("where");
    const whereL = e("whereL");
    if (chs[1]) tl.to(chs[1], { opacity: 0, duration: 4 }, 76);
    if (chs[2]) tl.to(chs[2], { opacity: 1, duration: 5 }, 84);
    if (where) tl.fromTo(where, { y: vh * 0.2, opacity: 0 }, { y: 0, opacity: 1, duration: 14 }, 84);
    const envDirs = [[-1, -0.5], [1, -0.6], [0, 1], [1, 0.5], [-1, 0.7]];
    liveEnvs.forEach((n, i) => {
      const d = envDirs[i % envDirs.length];
      tl.fromTo(
        n,
        { x: d[0] * vw * 0.5, y: d[1] * vh * 0.4, scale: 1.1, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 15, ease: "power2.out" },
        88 + i * 4
      );
    });
    if (whereL) tl.fromTo(whereL, { opacity: 0 }, { opacity: 1, duration: 8 }, 104);
    if (where) tl.to(where, { y: -vh * 0.16, opacity: 0, duration: 12 }, 118);
    if (whereL) tl.to(whereL, { opacity: 0, duration: 7 }, 118);
    liveEnvs.forEach((n, i) => {
      const d = envDirs[(i * 3 + 2) % envDirs.length];
      tl.to(
        n,
        { x: d[0] * vw * 0.6, y: d[1] * vh * 0.55, scale: 0.9, opacity: 0, duration: 14, ease: "power2.in" },
        116 + i * 2
      );
    });

    // ——— frame 04 / WHEN
    const when = e("when");
    const seven = e("seven");
    const whenL = e("whenL");
    if (chs[2]) tl.to(chs[2], { opacity: 0, duration: 4 }, 120);
    if (chs[3]) tl.to(chs[3], { opacity: 1, duration: 5 }, 128);
    if (when) tl.fromTo(when, { x: vw * 0.3, opacity: 0 }, { x: 0, opacity: 1, duration: 16, ease: "power3.out" }, 128);
    const speeds = [1.4, -0.9, 1.1, -1.5, 0.8, -1.1, 1.25, -0.7];
    times.forEach((t, i) => {
      tl.fromTo(t, { opacity: 0 }, { opacity: 1, duration: 8 }, 130 + i * 1.6);
      tl.to(t, { y: speeds[i % speeds.length] * vh * 0.55, duration: 34, ease: "none" }, 130 + i * 1.6);
    });
    tl.to(times, { opacity: 0, duration: 10, stagger: 0.9 }, 154);
    if (when) tl.to(when, { y: -vh * 0.24, opacity: 0, duration: 12 }, 158);
    if (seven) tl.fromTo(seven, { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, duration: 14, ease: "power2.out" }, 158);
    if (whenL) tl.fromTo(whenL, { opacity: 0 }, { opacity: 1, duration: 8 }, 170);
    if (seven && whenL) tl.to([seven, whenL], { opacity: 0, y: -vh * 0.1, duration: 10 }, 184);

    // ——— frame 05 / HOW
    const how = e("how");
    const notLike = e("notLike");
    const howL = e("howL");
    if (chs[3]) tl.to(chs[3], { opacity: 0, duration: 4 }, 184);
    if (chs[4]) tl.to(chs[4], { opacity: 1, duration: 5 }, 192);
    tl.to(bgDark, { opacity: 1, duration: 14 }, 186);
    if (how) tl.fromTo(how, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 14 }, 190);
    const mechDirs = [
      [-1, 0], [1, 0], [0, -1], [1, 0.4], [-1, -0.3], [0, 1],
      [1, -0.4], [-1, 0.5], [0, -1], [1, 0.6], [-1, 0], [0, 1],
    ];
    mechs.forEach((m, i) => {
      const d = mechDirs[i % mechDirs.length];
      tl.fromTo(
        m,
        { x: d[0] * vw * 0.45, y: d[1] * vh * 0.35, opacity: 0 },
        { x: 0, y: 0, opacity: 0.9, duration: 6, ease: "power1.out" },
        196 + i * 1.3
      );
      tl.to(m, { x: -d[0] * vw * 0.4, y: -d[1] * vh * 0.3, duration: 16, ease: "none" }, 202 + i * 1.3);
    });
    tl.to(mechs, { opacity: 0, duration: 4 }, 224);
    if (how) tl.to(how, { opacity: 0, scale: 0.9, duration: 8 }, 224);
    if (notLike) tl.fromTo(notLike, { opacity: 0, y: vh * 0.06 }, { opacity: 1, y: 0, duration: 12 }, 232);
    if (howL) tl.fromTo(howL, { opacity: 0 }, { opacity: 1, duration: 8 }, 248);
    if (notLike && howL) tl.to([notLike, howL], { opacity: 0, y: -vh * 0.08, duration: 10, stagger: 0.8 }, 262);

    // ——— frame 06 / the shift
    const soWhat = e("soWhat");
    const curate = e("curate");
    const manifesto = e("manifesto");
    if (chs[4]) tl.to(chs[4], { opacity: 0, duration: 4 }, 262);
    if (chs[5]) tl.to(chs[5], { opacity: 1, duration: 5 }, 272);
    tl.to(bgDark, { opacity: 0, duration: 16 }, 264);
    if (soWhat) {
      tl.fromTo(soWhat, { opacity: 0, y: vh * 0.1 }, { opacity: 1, y: 0, duration: 12 }, 270);
      tl.to(soWhat, { opacity: 0, y: -vh * 0.14, duration: 10 }, 286);
    }
    if (curate) tl.fromTo(curate, { opacity: 0, y: vh * 0.12 }, { opacity: 1, y: 0, duration: 14 }, 288);
    if (manifesto) tl.fromTo(manifesto, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 10 }, 302);
    if (curate && manifesto) tl.to([curate, manifesto], { opacity: 0, y: -vh * 0.12, duration: 12, stagger: 1 }, 318);

    // ——— frame 07 / the Unknwn system
    const sysYou = e("sysYou");
    const sysVibe = e("sysVibe");
    const sysCur = e("sysCur");
    const sysSomeone = e("sysSomeone");
    const portraitB = e("portraitB");
    const sysPlace = e("sysPlace");
    const envB = e("envB");
    const sysDate = e("sysDate");
    const dateB = e("dateB");

    if (sysYou) {
      tl.fromTo(sysYou, { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 12 }, 322);
      tl.to(sysYou, { opacity: 0, scale: 1.3, duration: 12 }, 336);
    }
    if (sysVibe) {
      tl.fromTo(sysVibe, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 12 }, 340);
      tl.to(sysVibe, { opacity: 0, scale: 1.22, duration: 12 }, 354);
    }
    ints.forEach((w, i) => {
      tl.fromTo(
        w,
        { opacity: 0, x: dx(vw * 0.5), y: dy(vh * 0.5), scale: 0.34 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 16, ease: "power2.out" },
        354 + i * 1.6
      );
    });
    ints.forEach((w) => {
      tl.to(w, { x: dx(vw * 0.5), y: dy(vh * 0.5), scale: 0.22, opacity: 0, duration: 16, ease: "power2.inOut" }, 380);
    });
    if (sysCur) {
      tl.fromTo(sysCur, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 12 }, 392);
      tl.to(sysCur, { opacity: 0, y: -vh * 0.12, duration: 10 }, 408);
    }
    if (sysSomeone) tl.fromTo(sysSomeone, { opacity: 0, x: -vw * 0.2 }, { opacity: 1, x: 0, duration: 14 }, 410);
    if (portraitB) tl.fromTo(portraitB, { opacity: 0, x: vw * 0.24, scale: 1.08 }, { opacity: 1, x: 0, scale: 1, duration: 16, ease: "power2.out" }, 412);
    if (sysSomeone) tl.to(sysSomeone, { opacity: 0, x: -vw * 0.3, duration: 12 }, 430);
    if (portraitB) tl.to(portraitB, { opacity: 0, scale: 1.12, duration: 14 }, 432);
    if (envB) tl.fromTo(envB, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 16, ease: "power2.out" }, 434);
    if (sysPlace) tl.fromTo(sysPlace, { opacity: 0, x: vw * 0.2 }, { opacity: 1, x: 0, duration: 14 }, 438);
    if (envB && sysPlace) tl.to([envB, sysPlace], { opacity: 0, duration: 12, stagger: 1 }, 456);
    if (dateB) tl.fromTo(dateB, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 16, ease: "power2.out" }, 458);
    if (sysDate) tl.fromTo(sysDate, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 14 }, 462);
    if (dateB && sysDate) tl.to([dateB, sysDate], { opacity: 0, duration: 14, stagger: 1.4 }, 482);

    // ——— frame 08 / final reveal back to ivory
    const fin1 = e("fin1");
    const fin2 = e("fin2");
    const thats = e("thats");
    const finSub = e("finSub");
    const next = e("next");

    if (chs[5]) tl.to(chs[5], { opacity: 0, duration: 5 }, 482);
    if (chs[0]) tl.to(chs[0], { opacity: 1, duration: 6 }, 492);
    tl.to(bgRed, { opacity: 0, duration: 18 }, 484);
    tl.to(inks, { color: INK, duration: 10 }, 490);
    if (fin1) {
      tl.fromTo(fin1, { opacity: 0, y: vh * 0.07 }, { opacity: 1, y: 0, duration: 12 }, 496);
      tl.to(fin1, { opacity: 0, y: -vh * 0.1, duration: 10 }, 512);
    }
    if (fin2) {
      tl.fromTo(fin2, { opacity: 0, y: vh * 0.09 }, { opacity: 1, y: 0, duration: 14 }, 514);
      tl.to(fin2, { opacity: 0, y: -vh * 0.1, duration: 10 }, 534);
    }
    if (thats) tl.fromTo(thats, { opacity: 0, y: vh * 0.06 }, { opacity: 1, y: 0, duration: 12 }, 536);
    if (finSub) tl.fromTo(finSub, { opacity: 0 }, { opacity: 1, duration: 8 }, 548);
    if (next) tl.fromTo(next, { opacity: 0, y: 30 }, { opacity: 0.9, y: 0, duration: 10 }, 556);

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener("resize", onResize);

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
      id="whatisunknown"
      style={{
        position: "relative",
        height: "1800vh",
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
        {/* Dynamic Backgrounds */}
        <div
          data-el="bgRed"
          style={{
            position: "absolute",
            inset: 0,
            background: "#7C1405",
            opacity: 0,
            zIndex: 1,
            willChange: "opacity",
          }}
        />
        <div
          data-el="bgDark"
          style={{
            position: "absolute",
            inset: 0,
            background: "#171311",
            opacity: 0,
            zIndex: 2,
            willChange: "opacity",
          }}
        />
        <div
          className="unknkn-grain"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 40,
            pointerEvents: "none",
            opacity: 0.26,
            mixBlendMode: "overlay",
          }}
        />

        {/* Transitioning SVG Line */}
        <svg
          data-el="line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 12,
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          <path
            data-el="linePath"
            d="M 18 30 C 30 18, 33 44, 42 47 C 51 50, 52 63, 62 61 C 71 59, 74 66, 82 72"
            fill="none"
            stroke="#7C1405"
            strokeWidth="1.1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Frame 01: WHAT IS UNKNOWN? */}
        <div
          data-el="qWhat"
          style={{
            position: "absolute",
            left: "5vw",
            top: "11vh",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(34px, 9vw, 125px)",
            lineHeight: 0.82,
            letterSpacing: "-0.02em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          WHAT
        </div>
        <div
          data-el="qIs"
          style={{
            position: "absolute",
            left: "clamp(30vw, 41vw, 45vw)",
            top: "27vh",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(28px, 7vw, 98px)",
            lineHeight: 0.82,
            letterSpacing: "-0.02em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          IS
        </div>
        <div
          data-el="qUnknown"
          style={{
            position: "absolute",
            left: "-4vw",
            top: "41vh",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(46px, 19vw, 260px)",
            lineHeight: 0.78,
            letterSpacing: "-0.045em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          UNKNWN?
        </div>
        <div
          data-el="qSub"
          style={{
            position: "absolute",
            right: "5vw",
            top: "33vh",
            zIndex: 21,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          More than a name.
        </div>

        {/* Frame 02: WHO */}
        <div
          data-el="who"
          style={{
            position: "absolute",
            left: "3vw",
            top: "22vh",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(54px, 22vw, 310px)",
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          WHO
        </div>
        <div
          data-el="portraitA"
          style={{
            position: "absolute",
            left: "52vw",
            top: "6vh",
            width: "40vw",
            height: "96vh",
            zIndex: 21,
            opacity: 0,
            overflow: "hidden",
            background: "url('/images/portrait-a.png') center / cover no-repeat",
            willChange: "transform, opacity",
          }}
        />
        <div
          data-el="whoL1"
          style={{
            position: "absolute",
            left: "4vw",
            bottom: "16vh",
            zIndex: 22,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          Someone you've never met.
        </div>
        <div
          data-el="whoL2"
          style={{
            position: "absolute",
            left: "4vw",
            bottom: "10vh",
            zIndex: 22,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          Someone you wouldn't have searched for.
        </div>

        {/* Frame 03: WHERE */}
        <div
          data-el="where"
          style={{
            position: "absolute",
            left: "6vw",
            top: "30vh",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(50px, 20vw, 280px)",
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          WHERE
        </div>
        <div data-el="env" style={{ position: "absolute", left: "-8vw", top: "4vh", width: "34vw", height: "52vh", zIndex: 18, opacity: 0, overflow: "hidden", background: "url('/images/env-01.png') center / cover no-repeat", willChange: "transform, opacity" }} />
        <div data-el="env" style={{ position: "absolute", left: "58vw", top: "-6vh", width: "26vw", height: "44vh", zIndex: 19, opacity: 0, overflow: "hidden", background: "url('/images/env-02.png') center / cover no-repeat", willChange: "transform, opacity" }} />
        <div data-el="env" style={{ position: "absolute", left: "30vw", top: "48vh", width: "30vw", height: "40vh", zIndex: 22, opacity: 0, overflow: "hidden", background: "url('/images/env-03.png') center / cover no-repeat", willChange: "transform, opacity" }} />
        <div data-el="env" style={{ position: "absolute", left: "74vw", top: "46vh", width: "32vw", height: "42vh", zIndex: 19, opacity: 0, overflow: "hidden", background: "url('/images/env-04.png') center / cover no-repeat", willChange: "transform, opacity" }} />
        <div data-el="env" style={{ position: "absolute", left: "8vw", top: "56vh", width: "20vw", height: "32vh", zIndex: 23, opacity: 0, overflow: "hidden", background: "url('/images/env-05.png') center / cover no-repeat", willChange: "transform, opacity" }} />
        <div
          data-el="whereL"
          style={{
            position: "absolute",
            right: "5vw",
            bottom: "5vh",
            maxWidth: "clamp(260px, 46vw, 600px)",
            textAlign: "right",
            zIndex: 24,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          Somewhere you wouldn't have thought to look.
        </div>

        {/* Frame 04: WHEN */}
        <div
          data-el="when"
          style={{
            position: "absolute",
            left: "4vw",
            top: "14vh",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(52px, 21vw, 290px)",
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          WHEN
        </div>
        <div data-el="time" style={{ position: "absolute", left: "8vw", top: "66vh", zIndex: 19, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(20px, 5vw, 68px)", letterSpacing: "-0.01em", color: "#F3EEE6", whiteSpace: "nowrap" }}>06:42 PM</div>
        <div data-el="time" style={{ position: "absolute", left: "62vw", top: "22vh", zIndex: 19, opacity: 0, fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(18px, 4vw, 56px)", letterSpacing: "-0.01em", color: "#F3EEE6", whiteSpace: "nowrap" }}>07:15 PM</div>
        <div data-el="time" style={{ position: "absolute", left: "33vw", top: "82vh", zIndex: 19, opacity: 0, fontFamily: "var(--font-archivo), sans-serif", fontWeight: 500, fontSize: "clamp(14px, 2.4vw, 36px)", letterSpacing: "0.16em", color: "#F3EEE6", whiteSpace: "nowrap" }}>SATURDAY</div>
        <div data-el="time" style={{ position: "absolute", left: "70vw", top: "58vh", zIndex: 19, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: "clamp(22px, 6vw, 84px)", letterSpacing: "-0.02em", color: "#F3EEE6", whiteSpace: "nowrap" }}>TONIGHT</div>
        <div data-el="time" style={{ position: "absolute", left: "12vw", top: "40vh", zIndex: 19, opacity: 0, fontFamily: "var(--font-archivo), sans-serif", fontWeight: 500, fontSize: "clamp(14px, 2.2vw, 32px)", letterSpacing: "0.16em", color: "#F3EEE6", whiteSpace: "nowrap" }}>NEXT WEEK</div>
        <div data-el="time" style={{ position: "absolute", left: "48vw", top: "8vh", zIndex: 19, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(18px, 4.4vw, 60px)", letterSpacing: "-0.01em", color: "#F3EEE6", whiteSpace: "nowrap" }}>08:30 PM</div>
        <div data-el="time" style={{ position: "absolute", left: "78vw", top: "82vh", zIndex: 19, opacity: 0, fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(20px, 5.2vw, 72px)", letterSpacing: "-0.01em", color: "#F3EEE6", whiteSpace: "nowrap" }}>FRIDAY</div>
        <div data-el="time" style={{ position: "absolute", left: "2vw", top: "86vh", zIndex: 19, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(18px, 4.6vw, 64px)", letterSpacing: "-0.01em", color: "#F3EEE6", whiteSpace: "nowrap" }}>7:00 PM</div>
        <div
          data-el="seven"
          style={{
            position: "absolute",
            left: 0,
            top: "34vh",
            width: "100%",
            textAlign: "center",
            zIndex: 25,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(42px, 15vw, 210px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          7:00 PM
        </div>
        <div
          data-el="whenL"
          style={{
            position: "absolute",
            left: 0,
            top: "62vh",
            width: "100%",
            textAlign: "center",
            zIndex: 25,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          The moment you actually meet.
        </div>

        {/* Frame 05: HOW */}
        <div
          data-el="how"
          style={{
            position: "absolute",
            left: "6vw",
            top: "26vh",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(56px, 24vw, 330px)",
            lineHeight: 0.8,
            letterSpacing: "-0.045em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          HOW
        </div>
        {["SWIPE", "LIKE", "MATCH", "CHAT", "WAIT", "REPEAT", "SWIPE", "MATCH", "LIKE", "WAIT", "CHAT", "REPEAT"].map((txt, i) => {
          const positions = [
            { left: "4vw", top: "10vh", fontSize: "clamp(18px, 4.4vw, 60px)" },
            { left: "54vw", top: "16vh", fontSize: "clamp(16px, 3.2vw, 44px)" },
            { left: "22vw", top: "30vh", fontSize: "clamp(20px, 5.2vw, 70px)" },
            { left: "68vw", top: "40vh", fontSize: "clamp(16px, 3.6vw, 48px)" },
            { left: "8vw", top: "52vh", fontSize: "clamp(18px, 4vw, 55px)" },
            { left: "40vw", top: "62vh", fontSize: "clamp(22px, 5.6vw, 78px)" },
            { left: "72vw", top: "72vh", fontSize: "clamp(15px, 3vw, 42px)" },
            { left: "14vw", top: "80vh", fontSize: "clamp(18px, 4.6vw, 62px)" },
            { left: "50vw", top: "88vh", fontSize: "clamp(16px, 3.4vw, 46px)" },
            { left: "84vw", top: "6vh", fontSize: "clamp(17px, 3.8vw, 50px)" },
            { left: "30vw", top: "46vh", fontSize: "clamp(14px, 2.8vw, 38px)" },
            { left: "60vw", top: "56vh", fontSize: "clamp(18px, 4.2vw, 58px)" },
          ];
          return (
            <div
              key={i}
              data-el="mech"
              style={{
                position: "absolute",
                ...positions[i],
                zIndex: 21,
                opacity: 0,
                fontFamily: "var(--font-archivo), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "#F3EEE6",
                whiteSpace: "nowrap",
                willChange: "transform, opacity",
              }}
            >
              {txt}
            </div>
          );
        })}
        <div
          data-el="notLike"
          style={{
            position: "absolute",
            left: "6vw",
            top: "38vh",
            maxWidth: "clamp(260px, 88vw, 1100px)",
            zIndex: 26,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(26px, 10vw, 150px)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "#F3EEE6",
            wordBreak: "break-word",
            willChange: "transform, opacity",
          }}
        >
          NOT LIKE THIS.
        </div>
        <div
          data-el="howL"
          style={{
            position: "absolute",
            left: "6vw",
            top: "60vh",
            maxWidth: "clamp(240px, 80vw, 600px)",
            zIndex: 26,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          You don't choose from a catalogue.
        </div>

        {/* Frame 06: SO WHAT DO WE DO? */}
        <div
          data-el="soWhat"
          style={{
            position: "absolute",
            left: "7vw",
            top: "38vh",
            maxWidth: "clamp(260px, 88vw, 1100px)",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(24px, 8.5vw, 125px)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "#F3EEE6",
            wordBreak: "break-word",
            willChange: "transform, opacity",
          }}
        >
          SO WHAT DO WE DO?
        </div>
        <div
          data-el="curate"
          style={{
            position: "absolute",
            left: "7vw",
            top: "20vh",
            maxWidth: "clamp(260px, 88vw, 1100px)",
            zIndex: 20,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(26px, 9vw, 130px)",
            lineHeight: 0.86,
            letterSpacing: "-0.035em",
            color: "#F3EEE6",
            wordBreak: "break-word",
            willChange: "transform, opacity",
          }}
        >
          <div>
            WE <span style={{ fontStyle: "italic", fontWeight: 500 }}>CURATE</span>
          </div>
          <div style={{ paddingLeft: "clamp(0.2em, 0.6em, 0.6em)", fontSize: "1.18em", lineHeight: 0.84 }}>
            THE UNKNOWN.
          </div>
        </div>
        <div
          data-el="manifesto"
          style={{
            position: "absolute",
            left: "7vw",
            top: "66vh",
            zIndex: 22,
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.75em",
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          <span>You tell us what matters to you.</span>
          <span style={{ paddingLeft: "clamp(1em, 3.2em, 3.2em)" }}>We find the connection.</span>
          <span style={{ paddingLeft: "clamp(2em, 6.4em, 6.4em)" }}>We take care of the meeting.</span>
        </div>

        {/* Frame 07: Unknwn System */}
        <div
          data-el="sysYou"
          style={{
            position: "absolute",
            left: 0,
            top: "36vh",
            width: "100%",
            textAlign: "center",
            zIndex: 24,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(48px, 17vw, 240px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          YOU
        </div>
        <div
          data-el="sysVibe"
          style={{
            position: "absolute",
            left: 0,
            top: "38vh",
            width: "100%",
            textAlign: "center",
            zIndex: 24,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(38px, 12vw, 170px)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          YOUR VIBE
        </div>
        <div data-el="int" style={{ position: "absolute", left: "6vw", top: "18vh", zIndex: 23, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(22px, 6vw, 84px)", color: "#F3EEE6", whiteSpace: "nowrap" }}>COFFEE</div>
        <div data-el="int" style={{ position: "absolute", left: "66vw", top: "12vh", zIndex: 23, opacity: 0, fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(20px, 5vw, 70px)", color: "#F3EEE6", whiteSpace: "nowrap" }}>MUSIC</div>
        <div data-el="int" style={{ position: "absolute", left: "14vw", top: "70vh", zIndex: 23, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(24px, 7vw, 98px)", color: "#F3EEE6", whiteSpace: "nowrap" }}>ART</div>
        <div data-el="int" style={{ position: "absolute", left: "70vw", top: "66vh", zIndex: 23, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(20px, 5.4vw, 76px)", color: "#F3EEE6", whiteSpace: "nowrap" }}>TRAVEL</div>
        <div data-el="int" style={{ position: "absolute", left: "40vw", top: "84vh", zIndex: 23, opacity: 0, fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(18px, 4.6vw, 64px)", color: "#F3EEE6", whiteSpace: "nowrap" }}>FOOD</div>
        <div data-el="int" style={{ position: "absolute", left: "42vw", top: "6vh", zIndex: 23, opacity: 0, fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(20px, 5.2vw, 72px)", color: "#F3EEE6", whiteSpace: "nowrap" }}>MOVIES</div>
        <div
          data-el="sysCur"
          style={{
            position: "absolute",
            left: 0,
            top: "40vh",
            width: "100%",
            textAlign: "center",
            zIndex: 24,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(30px, 10vw, 140px)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          OUR CURATION
        </div>
        <div
          data-el="sysSomeone"
          style={{
            position: "absolute",
            left: "5vw",
            top: "34vh",
            zIndex: 24,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(36px, 14vw, 200px)",
            lineHeight: 0.9,
            letterSpacing: "-0.035em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          SOMEONE
        </div>
        <div
          data-el="portraitB"
          style={{
            position: "absolute",
            left: "56vw",
            top: "8vh",
            width: "38vw",
            height: "88vh",
            zIndex: 18,
            opacity: 0,
            overflow: "hidden",
            background: "url('/images/portrait-b.png') center / cover no-repeat",
            willChange: "transform, opacity",
          }}
        />
        <div
          data-el="sysPlace"
          style={{
            position: "absolute",
            right: "5vw",
            top: "30vh",
            zIndex: 24,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(34px, 13vw, 180px)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#F3EEE6",
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          A PLACE
        </div>
        <div
          data-el="envB"
          style={{
            position: "absolute",
            left: "4vw",
            top: "14vh",
            width: "44vw",
            height: "76vh",
            zIndex: 18,
            opacity: 0,
            overflow: "hidden",
            background: "url('/images/env-b.png') center / cover no-repeat",
            willChange: "transform, opacity",
          }}
        />
        <div
          data-el="sysDate"
          style={{
            position: "absolute",
            left: 0,
            top: "38vh",
            width: "100%",
            textAlign: "center",
            zIndex: 25,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(44px, 18vw, 250px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#F3EEE6",
            willChange: "transform, opacity",
          }}
        >
          A DATE
        </div>
        <div
          data-el="dateB"
          style={{
            position: "absolute",
            left: "24vw",
            top: "10vh",
            width: "52vw",
            height: "84vh",
            zIndex: 17,
            opacity: 0,
            overflow: "hidden",
            background: "url('/images/date-b.png') center / cover no-repeat",
            willChange: "transform, opacity",
          }}
        />

        {/* Frame 08: Final Reveal back to Ivory */}
        <div
          data-el="fin1"
          style={{
            position: "absolute",
            left: "clamp(16px, 8vw, 10vw)",
            top: "32vh",
            width: "clamp(280px, 82vw, 1050px)",
            zIndex: 26,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 6vw, 84px)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            color: "#171311",
            willChange: "transform, opacity",
          }}
        >
          <div>THE BEST PART</div>
          <div style={{ paddingLeft: "clamp(0.2em, 0.5em, 0.5em)" }}>OF MEETING SOMEONE</div>
        </div>
        <div
          data-el="fin2"
          style={{
            position: "absolute",
            left: "clamp(16px, 8vw, 10vw)",
            top: "30vh",
            width: "clamp(280px, 84vw, 1100px)",
            zIndex: 26,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 7.2vw, 100px)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            color: "#171311",
            willChange: "transform, opacity",
          }}
        >
          <div>IS THAT YOU DIDN'T</div>
          <div style={{ paddingLeft: "clamp(0.3em, 0.7em, 0.7em)", fontStyle: "italic", fontWeight: 500 }}>
            KNOW THEM BEFORE.
          </div>
        </div>
        <div
          data-el="thats"
          style={{
            position: "absolute",
            left: "clamp(16px, 8vw, 10vw)",
            top: "40vh",
            maxWidth: "clamp(260px, 88vw, 1100px)",
            zIndex: 27,
            opacity: 0,
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 8.4vw, 118px)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            color: "#171311",
            wordBreak: "break-word",
            willChange: "transform, opacity",
          }}
        >
          THAT'S <span style={{ color: "#7C1405" }}>Unknwn.</span>
        </div>
        <div
          data-el="finSub"
          style={{
            position: "absolute",
            left: "clamp(16px, 8vw, 10vw)",
            top: "58vh",
            zIndex: 27,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#171311",
            willChange: "transform, opacity",
          }}
        >
          Curated connections. Real dates.
        </div>

        {/* Next Section Teaser */}
        <a
          href="#curation"
          data-el="next"
          style={{
            position: "absolute",
            left: "clamp(16px, 8vw, 10vw)",
            bottom: "14vh",
            zIndex: 28,
            opacity: 0,
            fontFamily: "var(--font-archivo), sans-serif",
            color: "#171311",
            display: "block",
            willChange: "transform, opacity",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.42 }}>
            03 / 05
          </div>
          <div
            style={{
              marginTop: "0.6em",
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(20px, 3.4vw, 48px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              textTransform: "none",
            }}
          >
            The Curation
          </div>
        </a>

        {/* Chapter Tracker */}
        <div
          data-el="ink"
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
            color: "#171311",
          }}
        >
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap" }}>
            <span style={{ opacity: 0.42 }}>02 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>What Is Unknown?</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>02 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>Who</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>02 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>Where</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>02 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>When</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>02 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>How</span>
          </div>
          <div data-el="ch" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ opacity: 0.42 }}>02 / 05</span>
            <span style={{ display: "block", marginTop: "0.7em" }}>We Curate The Unknown</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          data-el="ink"
          style={{
            position: "absolute",
            left: "clamp(16px, 2.2vw, 32px)",
            bottom: "4.5vh",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "1em",
            color: "#171311",
          }}
        >
          <div style={{ position: "relative", width: "clamp(80px, 14vw, 180px)", height: "1px" }}>
            <div style={{ position: "absolute", inset: 0, background: "currentColor", opacity: 0.24 }} />
            <div
              data-el="prog"
              style={{
                position: "absolute",
                inset: 0,
                background: "currentColor",
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
              opacity: 0.5,
            }}
          >
            Scene 02
          </span>
        </div>
      </div>
    </div>
  );
}
