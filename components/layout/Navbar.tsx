"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { Menu, Sun, Moon, ChevronDown } from "lucide-react";
import UserMenu from "@/components/auth/UserMenu";
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
  const [moreOpen, setMoreOpen]         = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
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

  const primaryLinks   = NAV_LINKS.slice(0, 3);
  const secondaryLinks = NAV_LINKS.slice(3);
  const secondaryActive = secondaryLinks.some((link) => link.href === activeLink);

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
            aria-label="THE ONE | Salon Bhagya"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <Image
              src="/Logo.webp"
              alt="THE ONE | Salon Bhagya"
              width={160}
              height={90}
              priority
              sizes="(max-width: 768px) 120px, 160px"
              style={{
                width: "clamp(120px, 10vw, 170px)",
                height: "auto",
                objectFit: "contain",
                filter: isDark ? "none" : "drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
              }}
            />
            <span style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0,
            }}>
              THE ONE | Salon Bhagya
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

            {primaryLinks.map((link) => (
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

            <div ref={moreRef} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                style={{
                  display:       "flex",
                  alignItems:    "center",
                  gap:           "6px",
                  fontFamily:    "var(--font-cinzel)",
                  fontSize:      "0.68rem",
                  fontWeight:    500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding:       "0.5rem 0.85rem",
                  border:        "none",
                  background:    "transparent",
                  color:         secondaryActive ? "var(--accent)" : moreOpen ? "var(--accent)" : "var(--text-secondary)",
                  cursor:        "pointer",
                  transition:    "color 0.2s ease",
                  whiteSpace:    "nowrap",
                }}
                onMouseEnter={() => setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))}
              >
                <span>More</span>
                <ChevronDown
                  size={12}
                  style={{
                    transition: "transform 0.25s ease",
                    transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  minWidth: "200px",
                  background: "var(--bg-secondary)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: "4px",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                  opacity: moreOpen ? 1 : 0,
                  transform: moreOpen ? "translateY(0)" : "translateY(-8px)",
                  pointerEvents: moreOpen ? "auto" : "none",
                  transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
                  zIndex: 100,
                  overflow: "hidden",
                }}
              >
                {secondaryLinks.map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.55rem 0.95rem",
                      fontFamily: "var(--font-cinzel)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: activeLink === link.href ? "var(--accent)" : "var(--text-secondary)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(201,168,76,0.08)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,0.08)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.color = activeLink === link.href ? "var(--accent)" : "var(--text-secondary)";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
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

            <div className="user-menu-desktop">
              <UserMenu />
            </div>

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
        .desktop-nav        { display: none !important; }
        .hamburger-btn      { display: flex !important; }
        .user-menu-desktop  { display: none !important; }

        @media (min-width: 1024px) {
          .desktop-nav        { display: flex !important; }
          .hamburger-btn      { display: none !important; }
          .user-menu-desktop  { display: block !important; }
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