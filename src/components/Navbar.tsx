"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    const onScroll = () => {
      if (mobileMenuOpen) return;
      const y = window.scrollY;
      const hide = y > 120 && y > lastScrollY.current;
      setIsHidden(hide);
      lastScrollY.current = y;
    };

    window.addEventListener("resize", onResize, { passive: true });
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
  }, [mobileMenuOpen]);

  // Lock background scroll when mobile drawer is open & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
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
          gap: "1.5em",
          padding: "clamp(0.85em, 2vh, 1.1em) clamp(16px, 5vw, 6vw)",
          background: "#171311",
          color: "#F3EEE6",
          transform: isHidden && !mobileMenuOpen ? "translateY(calc(-100% - 10px))" : "translateY(0)",
          transition: "transform 460ms cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Brand Logo */}
        <a
          href="#theunknown"
          onClick={closeMobileMenu}
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(17px, 2.2vw, 20px)",
            fontWeight: 600,
            letterSpacing: "0.03em",
            color: "#F3EEE6",
            transition: "color 200ms ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#E5D9CF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#F3EEE6")}
        >
          UNKNWN
        </a>

        {/* Desktop Navigation Links */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2.2vw, 36px)",
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
              padding: "0.9em 1.35em",
              transition: "background 240ms ease, transform 240ms ease",
              display: "inline-block",
              whiteSpace: "nowrap",
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

        {/* Mobile Header Right Items (Quick CTA + Hamburger) */}
        <div
          className="mobile-nav-controls"
          style={{
            display: "none",
            alignItems: "center",
            gap: "clamp(8px, 2.5vw, 14px)",
          }}
        >
          <a
            href="#passes"
            onClick={closeMobileMenu}
            style={{
              background: "#7C1405",
              color: "#F3EEE6",
              borderRadius: "2px",
              padding: "0.55em clamp(0.7em, 2vw, 0.9em)",
              fontSize: "10px",
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Passes
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "transparent",
              border: "1px solid rgba(243, 238, 230, 0.2)",
              borderRadius: "2px",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              width: "40px",
              height: "40px",
              touchAction: "manipulation",
            }}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "#F3EEE6",
                transition: "transform 260ms ease, opacity 260ms ease",
                transform: mobileMenuOpen ? "translateY(5.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "#F3EEE6",
                transition: "opacity 260ms ease",
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "#F3EEE6",
                transition: "transform 260ms ease",
                transform: mobileMenuOpen ? "translateY(-5.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 890,
          background: "rgba(23, 19, 17, 0.98)",
          backdropFilter: "blur(14px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "calc(var(--unknkn-nav-h, 60px) + 20px) clamp(18px, 6vw, 28px) clamp(24px, 5vh, 40px)",
          transform: mobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          maxHeight: "100dvh",
        }}
      >
        <div
          className="unknkn-grain"
          style={{ opacity: 0.15, mixBlendMode: "overlay" }}
        />

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "24px" }}>
          <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#7C1405" }}>
            Navigation
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <a
              href="#whatisunknown"
              onClick={closeMobileMenu}
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "#F3EEE6",
                textDecoration: "none",
              }}
            >
              How it works
            </a>
            <a
              href="#theunknown"
              onClick={closeMobileMenu}
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "#F3EEE6",
                textDecoration: "none",
              }}
            >
              Our story
            </a>
            <a
              href="#curation"
              onClick={closeMobileMenu}
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "#F3EEE6",
                textDecoration: "none",
              }}
            >
              The Curation
            </a>
            <a
              href="#theend"
              onClick={closeMobileMenu}
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "#F3EEE6",
                textDecoration: "none",
              }}
            >
              FAQs
            </a>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "16px" }}>
          <a
            href="#passes"
            onClick={closeMobileMenu}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              background: "#7C1405",
              color: "#F3EEE6",
              borderRadius: "2px",
              padding: "1.1em 1.4em",
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Reserve your pass →
          </a>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(243, 238, 230, 0.45)",
              paddingTop: "12px",
              borderTop: "1px solid rgba(243, 238, 230, 0.12)",
            }}
          >
            <span>The art of not knowing</span>
            <span>Unknwn</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-controls {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
