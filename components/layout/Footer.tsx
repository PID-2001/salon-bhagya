"use client";

import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import {
  Scissors, MessageCircle,
  MapPin, Phone, Mail, Heart, ArrowUp,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Services: [
    { label: "Hair Services",      href: "/#services" },
    { label: "Skin & Facial",      href: "/#services" },
    { label: "Nail Services",      href: "/#services" },
    { label: "Bridal Packages",    href: "/#services" },
    { label: "Wellness & Massage", href: "/#services" },
  ],
  Explore: [
    { label: "About Us",     href: "/#about" },
    { label: "Gallery",      href: "/#gallery" },
    { label: "Products",     href: "/#products" },
    { label: "Rentals",      href: "/#rentals" },
    { label: "Appointments", href: "/#contact" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms" },
    { label: "Refund Policy",     href: "/refunds" },
  ],
};

const InstagramGlyph = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x={3} y={3} width={18} height={18} rx={5} ry={5} />
    <path d="M16 11.37a4 4 0 1 1-3.63-3.63 4 4 0 0 1 3.63 3.63Z" />
    <circle cx={17.5} cy={6.5} r={0.8} fill="currentColor" stroke="none" />
  </svg>
);

const FacebookGlyph = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v9h4v-9h3l1-4h-4V6a1 1 0 0 1 1-1h3Z" />
  </svg>
);

type SocialLink = {
  icon: ReactNode;
  href: string;
  label: string;
  color: string;
};

const SOCIALS: SocialLink[] = [
  { icon: <InstagramGlyph />, href: "https://instagram.com/salonbhagya", label: "Instagram", color: "#e1306c" },
  { icon: <FacebookGlyph />, href: "https://facebook.com/salonbhagya", label: "Facebook", color: "#1877f2" },
  { icon: <MessageCircle size={16} />, href: "https://wa.me/94771234567", label: "WhatsApp", color: "#22c55e" },
];

// ─── SCROLL TO TOP ───────────────────────────────────────────────────────────
function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      style={{
        position:        "fixed",
        bottom:          "28px",
        right:           "28px",
        zIndex:          50,
        width:           "44px",
        height:          "44px",
        background:      "linear-gradient(135deg,#b8860b,#c9a84c)",
        border:          "none",
        borderRadius:    "50%",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        cursor:          "pointer",
        boxShadow:       "0 4px 20px rgba(201,168,76,0.35)",
        transition:      "transform 0.25s ease, box-shadow 0.25s ease",
        color:           "#080806",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform   = "translateY(-3px) scale(1.08)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow  = "0 8px 28px rgba(201,168,76,0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform   = "translateY(0) scale(1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow  = "0 4px 20px rgba(201,168,76,0.35)";
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView  = useInView(footerRef, { once: true, margin: "-60px" });

  return (
    <>
      <ScrollToTop />

      <footer
        ref={footerRef}
        style={{
          background:   "var(--bg-secondary)",
          borderTop:    "1px solid rgba(201,168,76,0.12)",
          position:     "relative",
          overflow:     "hidden",
        }}
      >
        {/* Top gold gradient line */}
        <div style={{
          position:   "absolute",
          top:        0,
          left:       0,
          right:      0,
          height:     "2px",
          background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.6),rgba(201,168,76,0.9),rgba(201,168,76,0.6),transparent)",
          pointerEvents: "none",
        }} />

        {/* Ambient glow */}
        <div style={{
          position:      "absolute",
          bottom:        "0",
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "600px",
          height:        "300px",
          background:    "radial-gradient(ellipse,rgba(201,168,76,0.05) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container-salon" style={{ paddingBlock: "clamp(3.5rem,7vw,5.5rem)" }}>

          {/* ── Top row: brand + social ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display:        "flex",
              alignItems:     "flex-start",
              justifyContent: "space-between",
              flexWrap:       "wrap",
              gap:            "2rem",
              paddingBottom:  "clamp(2rem,4vw,3rem)",
              borderBottom:   "1px solid rgba(201,168,76,0.1)",
              marginBottom:   "clamp(2rem,4vw,3rem)",
            }}
          >
            {/* Brand block */}
            <div style={{ maxWidth: "340px" }}>
              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{
                  width:         "44px",
                  height:        "44px",
                  background:    "linear-gradient(135deg,#b8860b,#c9a84c)",
                  borderRadius:  "50%",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  boxShadow:     "0 0 20px rgba(201,168,76,0.3)",
                }}>
                  <Scissors size={20} color="#080806" />
                </div>
                <div>
                  <div style={{
                    fontFamily:    "var(--font-cinzel)",
                    fontSize:      "1rem",
                    fontWeight:    800,
                    background:    "linear-gradient(135deg,#b8860b,#fcd34d,#b8860b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor:  "transparent",
                    letterSpacing: "0.15em",
                  }}>THE ONE</div>
                  <div style={{
                    fontFamily:    "var(--font-cormorant)",
                    fontSize:      "0.7rem",
                    color:         "var(--text-muted)",
                    letterSpacing: "0.12em",
                  }}>Salon Bhagya</div>
                </div>
              </div>

              <p style={{
                fontFamily:  "var(--font-cormorant)",
                fontStyle:   "italic",
                fontSize:    "0.92rem",
                lineHeight:  1.7,
                color:       "var(--text-muted)",
                marginBottom:"20px",
              }}>
                Where luxury meets artistry. A sanctuary dedicated to celebrating your beauty with premium care, authentic craftsmanship, and an unwavering commitment to your experience.
              </p>

              {/* Mini contact */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { icon: <MapPin size={12} color="#C9A84C" />, text: "123 Main Street, Negombo, Sri Lanka" },
                  { icon: <Phone  size={12} color="#C9A84C" />, text: "+94 77 123 4567" },
                  { icon: <Mail   size={12} color="#C9A84C" />, text: "hello@salonbhagya.lk" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ marginTop: "2px", flexShrink: 0 }}>{icon}</span>
                    <span style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize:   "0.82rem",
                      color:      "var(--text-muted)",
                      lineHeight: 1.4,
                    }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <div style={{
                fontFamily:    "var(--font-cinzel)",
                fontSize:      "0.58rem",
                fontWeight:    700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "var(--accent)",
                marginBottom:  "14px",
              }}>Follow Us</div>
              <div style={{ display: "flex", gap: "10px" }}>
                {SOCIALS.map(({ icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "rgba(201,168,76,0.06)",
                      border: "1px solid rgba(201,168,76,0.18)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-muted)",
                      transition: "all 0.25s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(event: ReactMouseEvent<HTMLAnchorElement>) => {
                      const el = event.currentTarget;
                      el.style.background = `${color}18`;
                      el.style.borderColor = color;
                      el.style.color = color;
                      el.style.transform = "translateY(-3px)";
                      el.style.boxShadow = `0 6px 20px ${color}30`;
                    }}
                    onMouseLeave={(event: ReactMouseEvent<HTMLAnchorElement>) => {
                      const el = event.currentTarget;
                      el.style.background = "rgba(201,168,76,0.06)";
                      el.style.borderColor = "rgba(201,168,76,0.18)";
                      el.style.color = "var(--text-muted)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Link columns ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="footer-links"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap:                 "clamp(1.5rem,3vw,2.5rem)",
              paddingBottom:       "clamp(2rem,4vw,3rem)",
              borderBottom:        "1px solid rgba(201,168,76,0.1)",
              marginBottom:        "clamp(1.5rem,3vw,2.5rem)",
            }}
          >
            {Object.entries(FOOTER_LINKS).map(([col, links]) => (
              <div key={col}>
                <div style={{
                  fontFamily:    "var(--font-cinzel)",
                  fontSize:      "0.58rem",
                  fontWeight:    700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color:         "var(--accent)",
                  marginBottom:  "14px",
                }}>{col}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        style={{
                          fontFamily:     "var(--font-cormorant)",
                          fontSize:       "0.88rem",
                          color:          "var(--text-muted)",
                          textDecoration: "none",
                          transition:     "color 0.22s ease",
                          display:        "inline-block",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* ── Bottom bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              flexWrap:       "wrap",
              gap:            "12px",
            }}
          >
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize:   "0.78rem",
              color:      "var(--text-muted)",
              margin:     0,
            }}>
              © {new Date().getFullYear()} THE ONE | Salon Bhagya. All rights reserved.
            </p>
            <p style={{
              fontFamily:  "var(--font-cormorant)",
              fontStyle:   "italic",
              fontSize:    "0.78rem",
              color:       "var(--text-muted)",
              margin:      0,
              display:     "flex",
              alignItems:  "center",
              gap:         "5px",
            }}>
              Crafted with <Heart size={11} color="#C9A84C" fill="#C9A84C" /> in Sri Lanka
            </p>
          </motion.div>

        </div>
      </footer>
    </>
  );
}