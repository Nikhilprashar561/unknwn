"use client";

import React, { useEffect, useRef, useState } from "react";

interface CurtainOpeningProps {
  onComplete?: () => void;
}

export default function CurtainOpening({ onComplete }: CurtainOpeningProps) {
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const tagRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll during intro
    window.scrollTo(0, 0);
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mob = window.innerWidth < 760;
    const spread = mob
      ? [-30, -18, -6, 6, 18, 30]
      : [-26, -15.5, -5, 5, 15.5, 26];

    // Initial positioning
    letterRefs.current.forEach((l, i) => {
      if (l) {
        l.style.opacity = "0";
        l.style.transform = `translate3d(${spread[i]}vw, 16px, 0)`;
      }
    });

    const timers: NodeJS.Timeout[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, reduce ? Math.min(ms, 120) : ms));
    };

    // 0.5s — letters arrive, still spread
    at(500, () => {
      letterRefs.current.forEach((l, i) => {
        if (!l) return;
        l.style.transition = `opacity 900ms ease ${i * 70}ms, transform 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms`;
        l.style.opacity = "1";
        l.style.transform = `translate3d(${spread[i]}vw, 0, 0)`;
      });
    });

    // 1.5s — they close into Unknwn
    at(1500, () => {
      letterRefs.current.forEach((l, i) => {
        if (!l) return;
        l.style.transition = `transform 1000ms cubic-bezier(0.62, 0.02, 0.2, 1) ${i * 26}ms`;
        l.style.transform = "translate3d(0, 0, 0)";
      });
    });

    // 2.3s — the line beneath
    at(2300, () => {
      if (tagRef.current) {
        tagRef.current.style.transition =
          "opacity 900ms ease, letter-spacing 1400ms cubic-bezier(0.22, 1, 0.36, 1)";
        tagRef.current.style.letterSpacing = "0.28em";
        tagRef.current.style.opacity = "1";
      }
    });

    // 3.2s — the word leaves, the red field is pulled away
    at(3200, () => {
      if (wordRef.current) {
        wordRef.current.style.transition =
          "transform 1250ms cubic-bezier(0.5, 0, 0.2, 1), opacity 1050ms ease 200ms";
        wordRef.current.style.transform = "translate3d(0, -22vh, 0) scale(0.94)";
        wordRef.current.style.opacity = "0";
      }
      if (tagRef.current) {
        tagRef.current.style.transition =
          "opacity 620ms ease, transform 900ms ease";
        tagRef.current.style.transform = "translate3d(0, -14px, 0)";
        tagRef.current.style.opacity = "0";
      }
    });

    // 3.7s — curtain lifts
    at(3700, () => {
      if (curtainRef.current) {
        curtainRef.current.style.transform = "translate3d(0, -100%, 0)";
      }
    });

    // 4.95s — curtain completely finishes, unlock scrolling
    at(4950, () => {
      document.documentElement.style.overflow = prevHtmlOverflow || "";
      document.body.style.overflow = prevBodyOverflow || "";
      setIsDone(true);
      if (onComplete) onComplete();
    });

    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = prevHtmlOverflow || "";
      document.body.style.overflow = prevBodyOverflow || "";
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={curtainRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#7C1405",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        willChange: "transform",
        transition: "transform 1150ms cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div
        className="unknkn-grain"
        style={{ opacity: 0.2, mixBlendMode: "overlay" }}
      />

      <div
        ref={wordRef}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          width: "100%",
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 600,
          fontSize: "clamp(52px, 15vw, 240px)",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          color: "#F3EEE6",
          willChange: "transform",
        }}
      >
        {["U", "N", "K", "N", "W", "N"].map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            style={{
              display: "inline-block",
              willChange: "transform",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div
        ref={tagRef}
        style={{
          marginTop: "clamp(20px, 3.4vh, 44px)",
          fontFamily: "var(--font-archivo), sans-serif",
          fontSize: "clamp(10px, 1.05vw, 13px)",
          fontWeight: 500,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: "#F3EEE6",
          opacity: 0,
        }}
      >
        The art of not knowing
      </div>
    </div>
  );
}
