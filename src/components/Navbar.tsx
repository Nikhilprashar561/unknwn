"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateNavHeight = () => {
      const h = nav.offsetHeight;
      document.documentElement.style.setProperty("--unknkn-nav-h", `${h}px`);
    };

    updateNavHeight();
    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateNavHeight, 150);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > 120 && y > lastScrollY.current;
      setIsHidden(hide);
      lastScrollY.current = y;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const timer1 = setTimeout(updateNavHeight, 400);
    const timer2 = setTimeout(updateNavHeight, 1400);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(resizeTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2em",
        padding: "1.1em 6vw",
        background: "#171311",
        color: "#F3EEE6",
        transform: isHidden ? "translateY(calc(-100% - 10px))" : "translateY(0)",
        transition: "transform 460ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <a
        href="#theunknown"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "19px",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "#F3EEE6",
          transition: "color 200ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#E5D9CF")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#F3EEE6")}
      >
        UNKNWN
      </a>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(16px, 2.4vw, 38px)",
          fontFamily: "var(--font-archivo), sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        <a
          href="#whatisunknown"
          style={{
            color: "#E5D9CF",
            transition: "color 240ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F3EEE6")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#E5D9CF")}
        >
          How it works
        </a>
        <a
          href="#theunknown"
          style={{
            color: "#E5D9CF",
            transition: "color 240ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F3EEE6")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#E5D9CF")}
        >
          Our story
        </a>
        <a
          href="#theend"
          style={{
            color: "#E5D9CF",
            transition: "color 240ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F3EEE6")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#E5D9CF")}
        >
          FAQs
        </a>
        <a
          href="#passes"
          style={{
            background: "#7C1405",
            color: "#F3EEE6",
            borderRadius: "2px",
            padding: "1em 1.4em",
            transition: "background 240ms ease, transform 240ms ease",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#8E1A06";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#7C1405";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Reserve your pass
        </a>
      </div>
    </nav>
  );
}
