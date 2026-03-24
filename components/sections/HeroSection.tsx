"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";

const BRAND_LETTERS = ["T", "H", "E", " ", "O", "N", "E"];

const SERVICES_MARQUEE = [
  "Hair Styling",
  "Bridal Makeup",
  "Skin Care",
  "Nail Art",
  "Wedding Sarees",
  "Jewelry Rental",
  "Magulporu",
  "Facial Treatments",
];

export default function HeroSection() {
  const [lettersVisible, setLettersVisible] = useState<boolean[]>(
    new Array(BRAND_LETTERS.length).fill(false),
  );
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  // Staggered entrance sequence
  useEffect(() => {
    // Badge first
    const t0 = setTimeout(() => setBadgeVisible(true), 200);

    // Letters stagger
    BRAND_LETTERS.forEach((_, i) => {
      setTimeout(
        () => {
          setLettersVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
        500 + i * 90,
      );
    });

    // Subtitle after letters
    const t1 = setTimeout(
      () => setSubtitleVisible(true),
      500 + BRAND_LETTERS.length * 90 + 100,
    );

    // CTA after subtitle
    const t2 = setTimeout(
      () => setCtaVisible(true),
      500 + BRAND_LETTERS.length * 90 + 400,
    );

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Subtle parallax on mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
    >
      {/* ── Layer 1: Deep radial gradient ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(201,168,76,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 20%, rgba(201,168,76,0.03) 0%, transparent 55%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 2: Animated gold orbs ── */}
      <div
        ref={orb1Ref}
        aria-hidden
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 8s ease-in-out infinite",
          transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        }}
      />
      <div
        ref={orb2Ref}
        aria-hidden
        style={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
          width: "clamp(200px, 30vw, 450px)",
          height: "clamp(200px, 30vw, 450px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "float 10s ease-in-out infinite reverse",
          transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 3: Grid pattern ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
      linear-gradient(rgba(201,168,76,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.08) 1px, transparent 1px)
    `,
          backgroundSize: "120px 120px",
          transform: "perspective(800px) rotateX(60deg)",
          transformOrigin: "top",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* ── Decorative corner ornaments ── */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* ── Vertical side lines ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "clamp(1.5rem, 4vw, 3.5rem)",
          top: "20%",
          bottom: "20%",
          width: "1px",
          background:
            "linear-gradient(180deg, transparent, rgba(201,168,76,0.25), transparent)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "clamp(1.5rem, 4vw, 3.5rem)",
          top: "20%",
          bottom: "20%",
          width: "1px",
          background:
            "linear-gradient(180deg, transparent, rgba(201,168,76,0.25), transparent)",
        }}
      />

      {/* ── Main Content ── */}
      <div
        className="container-salon"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0",
          paddingTop: "84px",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1.25rem",
            background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "100px",
            marginBottom: "2rem",
            opacity: badgeVisible ? 1 : 0,
            transform: badgeVisible ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <Sparkles size={12} color="var(--accent)" />
          <span
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Premium Luxury Salon
          </span>
          <Sparkles size={12} color="var(--accent)" />
        </div>

        {/* Brand Name — letter by letter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.02em",
            marginBottom: "0.5rem",
            lineHeight: 1,
          }}
          aria-label="THE ONE"
        >
          {BRAND_LETTERS.map((letter, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                fontWeight: 800,
                letterSpacing: letter === " " ? "0.15em" : "0.08em",
                backgroundImage:
                  "linear-gradient(135deg, #C9A84C 0%, #F5D78E 40%, #C9A84C 70%, #92640A 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: lettersVisible[i]
                  ? "shimmer 4s linear infinite"
                  : "none",
                opacity: lettersVisible[i] ? 1 : 0,
                transform: lettersVisible[i]
                  ? "translateY(0) scale(1)"
                  : "translateY(40px) scale(0.85)",
                transition:
                  "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                display: "inline-block",
                minWidth: letter === " " ? "0.3em" : "auto",
                textShadow: "0 0 40px rgba(201,168,76,0.2)",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>

        {/* Salon Name */}
        <div
          style={{
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              fontWeight: 300,
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              lineHeight: 1,
            }}
          >
            Salon&nbsp;&nbsp;Bhagya
          </p>
        </div>

        {/* Divider with diamond */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
            opacity: subtitleVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--accent))",
            }}
          />
          <div
            style={{
              width: "6px",
              height: "6px",
              background: "var(--accent)",
              transform: "rotate(45deg)",
              boxShadow: "0 0 8px rgba(201,168,76,0.6)",
            }}
          />
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            lineHeight: 1.6,
            marginBottom: "2.75rem",
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          Where every detail is a masterpiece,
          <br />
          and every visit — a ritual of elegance.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <Link
            href="/#contact"
            className="btn-gold"
            style={{ fontSize: "0.72rem", padding: "0.9rem 2.5rem" }}
          >
            Book Appointment
          </Link>
          <Link
            href="/#services"
            className="btn-outline"
            style={{ fontSize: "0.72rem", padding: "0.9rem 2.5rem" }}
          >
            Explore Services
          </Link>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "flex",
            gap: "clamp(1.5rem, 4vw, 3.5rem)",
            marginTop: "4rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--border-subtle)",
            opacity: ctaVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { value: "10+", label: "Years of Excellence" },
            { value: "5K+", label: "Happy Clients" },
            { value: "50+", label: "Premium Services" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #C9A84C, #F5D78E)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginTop: "0.3rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee Strip ── */}
      <div
        style={{
          position: "absolute",
          bottom: "5rem",
          left: 0,
          right: 0,
          overflow: "hidden",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "3rem",
            animation: "marquee 25s linear infinite",
            width: "max-content",
          }}
        >
          {[...SERVICES_MARQUEE, ...SERVICES_MARQUEE, ...SERVICES_MARQUEE].map(
            (s, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "3rem",
                }}
              >
                {s}
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    background: "var(--accent)",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
              </span>
            ),
          )}
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.35rem",
          opacity: ctaVisible ? 0.5 : 0,
          transition: "opacity 1s ease 0.5s",
        }}
      >
            <span
              style={{
                fontFamily: "var(--font-cinzel)",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Scroll
        </span>
        <ChevronDown
          size={16}
          color="var(--accent)"
          style={{ animation: "bounce 2s ease-in-out infinite" }}
        />
      </div>

      {/* Marquee + bounce keyframes */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
}

/* ── Corner Ornament Component ── */
function CornerOrnament({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: isTop ? "clamp(5rem, 8vw, 7rem)" : "auto",
        bottom: !isTop ? "clamp(1.5rem, 4vw, 3rem)" : "auto",
        left: isLeft ? "clamp(1rem, 3vw, 2.5rem)" : "auto",
        right: !isLeft ? "clamp(1rem, 3vw, 2.5rem)" : "auto",
        width: "48px",
        height: "48px",
        opacity: 0.35,
        pointerEvents: "none",
      }}
    >
      {/* Two L-shaped lines forming a corner bracket */}
      <div
        style={{
          position: "absolute",
          top: isTop ? 0 : "auto",
          bottom: !isTop ? 0 : "auto",
          left: isLeft ? 0 : "auto",
          right: !isLeft ? 0 : "auto",
          width: "20px",
          height: "1px",
          background: "var(--accent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: isTop ? 0 : "auto",
          bottom: !isTop ? 0 : "auto",
          left: isLeft ? 0 : "auto",
          right: !isLeft ? 0 : "auto",
          width: "1px",
          height: "20px",
          background: "var(--accent)",
        }}
      />
    </div>
  );
}
