"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface NavLink {
  label: string;
  href: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileDrawer({ isOpen, onClose, links }: MobileDrawerProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(8, 8, 6, 0.85)",
          backdropFilter: "blur(4px)",
          zIndex: 90,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Drawer Panel */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100dvh",
          width: "min(360px, 85vw)",
          background: "var(--bg-secondary)",
          borderLeft: "1px solid var(--border-subtle)",
          zIndex: 100,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
          <div>
            <div style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--accent)",
            }}>
              THE ONE
            </div>
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              marginTop: "2px",
            }}>
              Salon Bhagya
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--glass-bg)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              cursor: "pointer",
              color: "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, var(--accent), transparent)", marginBottom: "2.5rem" }} />

        {/* Nav Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {links.map((link, i) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              onClick={onClose}
                style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                padding: "0.9rem 0",
                borderBottom: "1px solid var(--border-subtle)",
                transition: "color 0.2s ease, padding-left 0.2s ease",
                animationDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0.75rem";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              background: "var(--glass-bg)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "4px",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ fontSize: "1rem" }}>{isDark ? "☀️" : "🌙"}</span>
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          <Link href="/#contact" onClick={onClose}>
            <span className="btn-gold" style={{ width: "100%", display: "flex" }}>
              Book Appointment
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}