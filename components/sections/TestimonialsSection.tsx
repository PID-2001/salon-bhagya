"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldButton from "@/components/ui/GoldButton";

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  review: string;
  service: string;
  initials: string;
  avatarGradient: string;
  featured?: boolean;
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Dilrukshi Perera",
    role: "Bride",
    location: "Colombo",
    rating: 5,
    review: "THE ONE made my wedding day absolutely unforgettable. The bridal makeup was flawless — exactly what I had envisioned but even more beautiful. The team's attention to detail and their calm, professional energy kept me relaxed throughout the morning. I've never felt so radiant in my life.",
    service: "Bridal Makeup & Hair",
    initials: "DP",
    avatarGradient: "linear-gradient(135deg,#3d2b0a,#c9a84c)",
    featured: true,
  },
  {
    id: 2,
    name: "Nimesha Fernando",
    role: "Regular Client",
    location: "Negombo",
    rating: 5,
    review: "I've been coming to Salon Bhagya for over three years now. Every single visit feels like a luxury ritual. My hair treatments have transformed my hair completely — it's healthier and shinier than ever. The ambience is just divine.",
    service: "Hair Treatment & Styling",
    initials: "NF",
    avatarGradient: "linear-gradient(135deg,#1a0a1a,#8b4a8b)",
    featured: true,
  },
  {
    id: 3,
    name: "Sanduni Wickramasinghe",
    role: "Event Guest",
    location: "Kandy",
    rating: 5,
    review: "Came in for a last-minute appointment before a formal gala and they fit me in without fuss. The nail art they did was intricate and gorgeous — everyone at the event was asking where I got it done. Highly recommend for any special occasion.",
    service: "Nail Art & Manicure",
    initials: "SW",
    avatarGradient: "linear-gradient(135deg,#0a1a0a,#3a7a3a)",
    featured: false,
  },
  {
    id: 4,
    name: "Kavindya Rathnayake",
    role: "Skincare Regular",
    location: "Gampaha",
    rating: 5,
    review: "The 24K gold facial changed my skin completely. I was sceptical at first but after just two sessions my complexion brightened noticeably. The therapist took time to understand my skin concerns before starting. Truly a premium experience worth every rupee.",
    service: "24K Gold Facial",
    initials: "KR",
    avatarGradient: "linear-gradient(135deg,#2a1a00,#b87c00)",
    featured: true,
  },
  {
    id: 5,
    name: "Tharushi Jayawardena",
    role: "Bridal Party",
    location: "Colombo",
    rating: 5,
    review: "Our entire bridal party of six was styled here and every single one of us looked stunning. The team managed the timing perfectly with no stress. The rental jewellery selection was exquisite too — saved us so much effort.",
    service: "Group Bridal Styling & Rentals",
    initials: "TJ",
    avatarGradient: "linear-gradient(135deg,#0a0a1a,#4a4a8b)",
    featured: false,
  },
  {
    id: 6,
    name: "Anuradha Silva",
    role: "Wellness Client",
    location: "Ja-Ela",
    rating: 5,
    review: "The hot stone massage was one of the most deeply relaxing experiences I've ever had. The therapist was skilled and intuitive. I left feeling completely restored. The entire salon has such a serene, luxurious atmosphere — you forget the world exists.",
    service: "Hot Stone Massage",
    initials: "AS",
    avatarGradient: "linear-gradient(135deg,#1a0a0a,#8b3a3a)",
    featured: false,
  },
  {
    id: 7,
    name: "Madhavi Dissanayake",
    role: "Monthly Regular",
    location: "Negombo",
    rating: 5,
    review: "I've tried many salons in the area but none match the consistency and quality of THE ONE. My monthly blowout and colour refresh always comes out exactly right. They remember my preferences without me having to repeat myself each time.",
    service: "Hair Colour & Blowout",
    initials: "MD",
    avatarGradient: "linear-gradient(135deg,#0a1a14,#1a7a5a)",
    featured: false,
  },
  {
    id: 8,
    name: "Priyanka Bandara",
    role: "Bride",
    location: "Kurunegala",
    rating: 5,
    review: "The magulporu rental was perfect and the delivery team was so careful and professional. Everything arrived in pristine condition. The brass oil lamps were exactly as pictured. Combined with their bridal package it was truly a seamless experience.",
    service: "Bridal Package & Magulporu Rental",
    initials: "PB",
    avatarGradient: "linear-gradient(135deg,#1a1400,#7a6a00)",
    featured: false,
  },
];

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= rating ? "#C9A84C" : "none"}
          color={s <= rating ? "#C9A84C" : "rgba(201,168,76,0.25)"}
        />
      ))}
    </div>
  );
}

// ─── FEATURED CARD (large) ───────────────────────────────────────────────────
function FeaturedCard({ t, isActive }: { t: Testimonial; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: "linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary))",
        border: "1px solid rgba(201,168,76,0.3)",
        borderRadius: "4px",
        padding: "clamp(1.8rem, 4vw, 3rem)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Decorative corner ornament */}
      <div style={{
        position: "absolute", top: "20px", right: "24px",
        opacity: 0.18, pointerEvents: "none",
      }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M4 4 L4 20 M4 4 L20 4" stroke="#C9A84C" strokeWidth="1.5" />
          <path d="M44 44 L44 28 M44 44 L28 44" stroke="#C9A84C" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Quote icon */}
      <div style={{
        width: "48px", height: "48px",
        background: "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))",
        border: "1px solid rgba(201,168,76,0.25)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1.5rem",
      }}>
        <Quote size={20} color="#C9A84C" />
      </div>

      {/* Review text */}
      <blockquote style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
        lineHeight: 1.75,
        color: "var(--text-secondary)",
        margin: "0 0 2rem 0",
        position: "relative",
        zIndex: 1,
      }}>
        "{t.review}"
      </blockquote>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg,var(--accent),transparent)",
        opacity: 0.3,
        marginBottom: "1.5rem",
      }} />

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Avatar */}
          <div style={{
            width: "50px", height: "50px",
            background: t.avatarGradient,
            borderRadius: "50%",
            border: "2px solid rgba(201,168,76,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#fcd34d",
            flexShrink: 0,
          }}>{t.initials}</div>

          <div>
            <div style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "3px",
            }}>{t.name}</div>
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
            }}>{t.role} · {t.location}</div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <StarRating rating={t.rating} size={14} />
          <div style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.72rem",
            color: "var(--accent)",
            marginTop: "5px",
            letterSpacing: "0.05em",
          }}>{t.service}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MINI CARD (sidebar) ─────────────────────────────────────────────────────
function MiniCard({
  t,
  isActive,
  onClick,
}: {
  t: Testimonial;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        background: isActive
          ? "linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04))"
          : "transparent",
        border: `1px solid ${isActive ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.1)"}`,
        borderRadius: "4px",
        padding: "14px 16px",
        cursor: "pointer",
        transition: "all 0.28s ease",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      {/* Avatar */}
      <div style={{
        width: "38px", height: "38px",
        background: t.avatarGradient,
        borderRadius: "50%",
        border: `1.5px solid ${isActive ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-cinzel)",
        fontSize: "0.62rem",
        fontWeight: 700,
        color: "#fcd34d",
        flexShrink: 0,
        transition: "border-color 0.28s ease",
      }}>{t.initials}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-cinzel)",
          fontSize: "0.68rem",
          fontWeight: 700,
          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
          marginBottom: "3px",
          transition: "color 0.28s ease",
        }}>{t.name}</div>
        <div style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.72rem",
          color: isActive ? "var(--accent)" : "var(--text-muted)",
          marginBottom: "6px",
          transition: "color 0.28s ease",
        }}>{t.service}</div>
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          margin: 0,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          lineHeight: 1.45,
        }}>"{t.review}"</p>
      </div>
    </button>
  );
}

// ─── COMPACT CARD (grid row) ──────────────────────────────────────────────────
function CompactCard({ t, delay }: { t: Testimonial; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(145deg,var(--bg-tertiary),rgba(201,168,76,0.06))"
          : "var(--bg-secondary)",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.35)" : "var(--border-subtle)"}`,
        borderRadius: "4px",
        padding: "1.25rem 1.4rem",
        transition: "all 0.32s cubic-bezier(0.25,0.46,0.45,0.94)",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Tiny quote watermark */}
      <div style={{
        position: "absolute", bottom: "10px", right: "14px",
        opacity: 0.04, pointerEvents: "none",
      }}>
        <Quote size={48} color="#C9A84C" />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <StarRating rating={t.rating} size={11} />
        <span style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.65rem",
          color: "var(--accent)",
          letterSpacing: "0.05em",
        }}>{t.service}</span>
      </div>

      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontSize: "0.88rem",
        lineHeight: 1.65,
        color: "var(--text-secondary)",
        margin: "0 0 14px 0",
      }}>
        "{t.review.length > 140 ? t.review.slice(0, 140) + "…" : t.review}"
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px",
          background: t.avatarGradient,
          borderRadius: "50%",
          border: "1.5px solid rgba(201,168,76,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-cinzel)",
          fontSize: "0.55rem",
          fontWeight: 700,
          color: "#fcd34d",
          flexShrink: 0,
        }}>{t.initials}</div>
        <div>
          <div style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}>{t.name}</div>
          <div style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.68rem",
            color: "var(--text-muted)",
          }}>{t.role} · {t.location}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN SECTION ────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const FEATURED = TESTIMONIALS.filter((t) => t.featured);
  const COMPACT  = TESTIMONIALS.filter((t) => !t.featured);

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + FEATURED.length) % FEATURED.length);
    setAutoPlay(false);
  }, [FEATURED.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % FEATURED.length);
    setAutoPlay(false);
  }, [FEATURED.length]);

  // Auto-advance featured carousel
  useEffect(() => {
    if (!autoPlay || !isInView) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % FEATURED.length);
    }, 6000);
    return () => clearInterval(t);
  }, [autoPlay, isInView, FEATURED.length]);

  // Summary stats
  const avgRating = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        background: "var(--bg-secondary)",
        paddingBlock: "clamp(6rem, 12vw, 10rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "5%", right: "-8%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(201,168,76,0.055) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-8%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(201,168,76,0.045) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Decorative top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "1px",
        background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)",
        pointerEvents: "none",
      }} />

      <div className="container-salon relative" style={{ zIndex: 10 }}>

        {/* Section header */}
        <SectionHeader
          label="Client Stories"
          title={
            <>
              Words From Our <span className="text-gold-gradient">Beloved Guests</span>
            </>
          }
          subtitle="Every story is a testament to the care, craft, and devotion we pour into each visit."
          align="center"
          animate
          isInView={isInView}
        />

        {/* ── Rating summary bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1.5rem, 5vw, 4rem)",
            flexWrap: "wrap",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            padding: "1.5rem clamp(1.5rem, 4vw, 3rem)",
            background: "linear-gradient(135deg,rgba(201,168,76,0.06),rgba(201,168,76,0.02))",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "4px",
          }}
        >
          {/* Average rating */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg,#b8860b,#fcd34d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              marginBottom: "6px",
            }}>{avgRating}</div>
            <StarRating rating={5} size={14} />
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "4px",
            }}>Average rating</div>
          </div>

          {/* Vertical divider */}
          <div style={{ width: "1px", height: "56px", background: "rgba(201,168,76,0.2)" }} />

          {/* Total reviews */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg,#b8860b,#fcd34d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              marginBottom: "6px",
            }}>500+</div>
            <div style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}>Happy Clients</div>
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "4px",
            }}>Verified reviews</div>
          </div>

          {/* Vertical divider */}
          <div style={{ width: "1px", height: "56px", background: "rgba(201,168,76,0.2)" }} />

          {/* 5-star percentage */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg,#b8860b,#fcd34d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              marginBottom: "6px",
            }}>98%</div>
            <div style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}>5-Star Rate</div>
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "4px",
            }}>Would recommend</div>
          </div>
        </motion.div>

        {/* ── Featured carousel + sidebar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
            marginBottom: "clamp(3rem, 6vw, 4rem)",
          }}
          className="testimonials-grid"
        >
          {/* Left: featured card + controls */}
          <div>
            <AnimatePresence mode="wait">
              <FeaturedCard
                key={FEATURED[activeIndex].id}
                t={FEATURED[activeIndex]}
                isActive={true}
              />
            </AnimatePresence>

            {/* Carousel controls */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
            }}>
              {/* Dot indicators */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {FEATURED.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveIndex(i); setAutoPlay(false); }}
                    style={{
                      width: i === activeIndex ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: i === activeIndex
                        ? "linear-gradient(90deg,#b8860b,#c9a84c)"
                        : "rgba(201,168,76,0.25)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.32s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { icon: <ChevronLeft size={16} />, action: prev, label: "Previous" },
                  { icon: <ChevronRight size={16} />, action: next, label: "Next" },
                ].map(({ icon, action, label }) => (
                  <button
                    key={label}
                    onClick={action}
                    aria-label={label}
                    style={{
                      width: "40px", height: "40px",
                      borderRadius: "50%",
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      color: "var(--accent)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.18)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.08)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.25)";
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: mini card list */}
          <div
            className="testimonials-sidebar"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {FEATURED.map((t, i) => (
              <MiniCard
                key={t.id}
                t={t}
                isActive={i === activeIndex}
                onClick={() => { setActiveIndex(i); setAutoPlay(false); }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Compact reviews grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.5 }}
          style={{ marginBottom: "clamp(3rem, 6vw, 4rem)" }}
        >
          {/* Sub-label */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}>
            <div style={{ height: "1px", flex: 1, background: "var(--border-subtle)" }} />
            <span style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--accent)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>More Guest Stories</span>
            <div style={{ height: "1px", flex: 1, background: "var(--border-subtle)" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
          }}>
            {COMPACT.map((t, i) => (
              <CompactCard key={t.id} t={t} delay={0.55 + i * 0.07} />
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{
            textAlign: "center",
            paddingTop: "clamp(2rem, 4vw, 3rem)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-muted)",
            marginBottom: "28px",
            maxWidth: "520px",
            margin: "0 auto 28px",
          }}>
            Ready to create your own story with us?
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <GoldButton variant="filled" size="md" href="/#contact" requiresAuth>
              Book Your Visit
            </GoldButton>
            <GoldButton
              variant="outline"
              size="md"
              icon={<MessageCircle size={15} />}
              href="https://g.page/r/review"
            >
              Leave a Review
            </GoldButton>
          </div>
        </motion.div>

      </div>

      {/* Responsive layout styles */}
      <style>{`
        @media (min-width: 900px) {
          .testimonials-grid {
            grid-template-columns: 3fr 2fr !important;
          }
          .testimonials-sidebar {
            max-height: none !important;
            overflow: visible !important;
          }
        }
      `}</style>
    </section>
  );
}