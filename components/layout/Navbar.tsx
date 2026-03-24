"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Menu, Sun, Moon, Scissors } from "lucide-react";
import MobileDrawer from "./MobileDrawer";

const NAV_LINKS = [
  { label: "Home",          href: "/" },
  { label: "Services",      href: "/#services" },
  { label: "About",         href: "/#about" },
  { label: "Gallery",       href: "/#gallery" },
  { label: "Products",      href: "/#products" },
  { label: "Rentals",       href: "/#rentals" },
  { label: "Testimonials",  href: "/#testimonials" },
  { label: "Contact",       href: "/#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled]         = useState(false);
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [activeLink, setActiveLink]     = useState("/");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  // Detect scroll for glassmorphism effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Set active link based on pathname
  useEffect(() => {
    const updateActiveLink = () => {
      const { pathname, hash } = window.location;
      setActiveLink(hash ? `${pathname}${hash}` : pathname);
    };

    updateActiveLink();
    window.addEventListener("hashchange", updateActiveLink);
    window.addEventListener("popstate", updateActiveLink);
    return () => {
      window.removeEventListener("hashchange", updateActiveLink);
      window.removeEventListener("popstate", updateActiveLink);
    };
  }, []);

  // Animate the underline indicator
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const nav  = navRef.current;
    if (!nav) return;
    const navRect  = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicatorStyle({
      left:    linkRect.left - navRect.left,
      width:   linkRect.width,
      opacity: 1,
    });
  };

  const handleNavLeave = () => {
    setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      <header
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          50,
          height:          scrolled ? "68px" : "84px",
          transition:      "height 0.35s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          background:      scrolled
            ? "rgba(8, 8, 6, 0.88)"
            : "linear-gradient(180deg, rgba(8,8,6,0.9) 0%, transparent 100%)",
          backdropFilter:  scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom:    scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
          boxShadow:       scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Light mode overrides */}
        {!isDark && (
          <style>{`
            header {
              background: ${scrolled
                ? "rgba(253, 250, 244, 0.92) !important"
                : "linear-gradient(180deg, rgba(253,250,244,0.95) 0%, transparent 100%) !important"
              };
            }
          `}</style>
        )}

        <div
          className="container-salon"
          style={{
            height:          "100%",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
            gap:             "2rem",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{ display: "flex", flexDirection: "column", gap: "1px", textDecoration: "none", flexShrink: 0 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Scissor icon with gold glow */}
              <div style={{
                width:        "28px",
                height:       "28px",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                background:   "linear-gradient(135deg, #C9A84C, #F5D78E)",
                borderRadius: "50%",
                flexShrink:   0,
                boxShadow:    "0 0 12px rgba(201,168,76,0.4)",
              }}>
                <Scissors size={14} color="#080806" strokeWidth={2.5} />
              </div>

              <span
                style={{
                  fontFamily:     "var(--font-cinzel)",
                  fontSize:       "1.2rem",
                  fontWeight:     800,
                  letterSpacing:  "0.2em",
                  backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #F5D78E 50%, #C9A84C 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip:      "text",
                  WebkitTextFillColor: "transparent",
                  animation:      "shimmer 3s linear infinite",
                  lineHeight:     1,
                }}
              >
                THE ONE
              </span>
            </div>

            <span style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "0.58rem",
              letterSpacing: "0.38em",
              color:         "var(--text-muted)",
              textTransform: "uppercase",
              paddingLeft:   "36px",
              lineHeight:    1,
            }}>
              Salon Bhagya
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav
            ref={navRef}
            onMouseLeave={handleNavLeave}
            style={{
              display:        "none",
              alignItems:     "center",
              gap:            "0.25rem",
              position:       "relative",
            }}
            className="desktop-nav"
          >
            {/* Hover indicator bar */}
            <div
              aria-hidden
              style={{
                position:   "absolute",
                bottom:     "-4px",
                height:     "1px",
                background: "var(--accent)",
                transition: "left 0.25s cubic-bezier(0.4,0,0.2,1), width 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
                left:       `${indicatorStyle.left}px`,
                width:      `${indicatorStyle.width}px`,
                opacity:    indicatorStyle.opacity,
                boxShadow:  "0 0 8px rgba(201,168,76,0.6)",
                pointerEvents: "none",
              }}
            />

            {NAV_LINKS.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                onMouseEnter={handleLinkHover}
                style={{
                  fontFamily:    "var(--font-cinzel)",
                  fontSize:      "0.68rem",
                  fontWeight:    500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color:         activeLink === link.href ? "var(--accent)" : "var(--text-secondary)",
                  padding:       "0.5rem 0.85rem",
                  textDecoration: "none",
                  transition:    "color 0.2s ease",
                  whiteSpace:    "nowrap",
                }}
                onFocus={e => { (e.currentTarget).style.color = "var(--accent)"; }}
                onBlur={e  => { (e.currentTarget).style.color = activeLink === link.href ? "var(--accent)" : "var(--text-secondary)"; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                width:          "38px",
                height:         "38px",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                background:     "var(--glass-bg)",
                border:         "1px solid var(--border-subtle)",
                borderRadius:   "50%",
                cursor:         "pointer",
                color:          "var(--text-muted)",
                transition:     "all 0.25s ease",
                flexShrink:     0,
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = "var(--accent)";
                b.style.color       = "var(--accent)";
                b.style.boxShadow   = "0 0 12px rgba(201,168,76,0.25)";
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = "var(--border-subtle)";
                b.style.color       = "var(--text-muted)";
                b.style.boxShadow   = "none";
              }}
            >
              {isDark
                ? <Sun  size={16} strokeWidth={1.75} />
                : <Moon size={16} strokeWidth={1.75} />
              }
            </button>

            {/* Book CTA — hidden on small mobile */}
            <Link href="/#contact" className="btn-gold cta-desktop" style={{ padding: "0.6rem 1.4rem", fontSize: "0.68rem" }}>
              Book Now
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="hamburger-btn"
              style={{
                width:          "42px",
                height:         "42px",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                background:     "transparent",
                border:         "1px solid var(--border-subtle)",
                borderRadius:   "4px",
                cursor:         "pointer",
                color:          "var(--text-secondary)",
                transition:     "all 0.2s ease",
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = "var(--accent)";
                b.style.color       = "var(--accent)";
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = "var(--border-subtle)";
                b.style.color       = "var(--text-secondary)";
              }}
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive styles */}
      <style>{`
        .desktop-nav { display: none !important; }
        .cta-desktop  { display: none !important; }
        .hamburger-btn { display: flex !important; }

        @media (min-width: 768px) {
          .cta-desktop { display: inline-flex !important; }
        }

        @media (min-width: 1024px) {
          .desktop-nav   { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}