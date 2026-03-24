"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scissors, Award, Users, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldButton from "@/components/ui/GoldButton";

const PILLARS = [
  {
    icon: <Scissors size={20} />,
    title: "Master Artisans",
    body: "Every stylist at THE ONE is a trained master of their craft — continually learning the latest global techniques.",
  },
  {
    icon: <Award size={20} />,
    title: "Premium Products",
    body: "We use only the finest salon-grade products: ammonia-free colours, organic treatments, and luxury skin care lines.",
  },
  {
    icon: <Users size={20} />,
    title: "Personal Attention",
    body: "No two clients are the same. We listen, consult, and customise every service to suit your unique beauty and lifestyle.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Ritual Experience",
    body: "A visit to Salon Bhagya is more than a service — it is a ritual. From the moment you arrive, you are treated as royalty.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-secondary)",
        paddingBlock: "clamp(6rem, 12vw, 10rem)",
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px]"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(var(--accent-rgb), 0.05) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px]"
          style={{
            background:
              "radial-gradient(circle at bottom right, rgba(var(--accent-rgb), 0.04) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="container-salon relative z-10">
        {/* Two-column layout: text left, visual right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "center",
          }}
        >
          {/* ── Left: Story copy ── */}
          <div>
            <SectionHeader
              label="Our Story"
              title={
                <>
                  More Than a Salon.{" "}
                  <span className="text-gold-gradient">A Legacy.</span>
                </>
              }
              subtitle="Founded over a decade ago, Salon Bhagya was born from a single belief — that every person deserves to feel extraordinary."
              align="left"
              isInView={isInView}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1rem, 2vw, 1.15rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  marginBottom: "1.5rem",
                }}
              >
                What began as a small neighbourhood studio has grown into one of
                the region&apos;s most celebrated luxury destinations. THE ONE is
                not just a brand — it is a promise. A promise of artistry,
                intimacy, and transformative beauty.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1rem, 2vw, 1.15rem)",
                  color: "var(--text-muted)",
                  lineHeight: 1.85,
                  marginBottom: "2.5rem",
                }}
              >
                From bridal transformations to everyday elegance, we bring
                together heritage craftsmanship and cutting-edge technique under
                one roof — infused with the warmth of Sri Lankan hospitality.
              </p>

              <div className="flex flex-wrap gap-4">
                <GoldButton href="/appointments" variant="filled" size="lg">
                  Book a Visit
                </GoldButton>
                <GoldButton href="/#services" variant="outline" size="lg">
                  View Services
                </GoldButton>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Pillars grid ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(1rem, 2.5vw, 1.5rem)",
            }}
          >
            {PILLARS.map((pillar, i) => (
              <PillarCard key={i} pillar={pillar} index={i} isInView={isInView} />
            ))}
          </motion.div>
        </div>

        {/* ── Bottom stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            marginTop: "clamp(4rem, 8vw, 7rem)",
            paddingTop: "clamp(2rem, 4vw, 3rem)",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(2rem, 5vw, 4rem)",
            justifyContent: "center",
          }}
        >
          {[
            { value: "10+", label: "Years of Excellence" },
            { value: "5,000+", label: "Happy Clients" },
            { value: "50+", label: "Premium Services" },
            { value: "3", label: "Award Wins" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #C9A84C, #F5D78E)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "0.4rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Pillar Card ── */
function PillarCard({
  pillar,
  index,
  isInView,
}: {
  pillar: { icon: React.ReactNode; title: string; body: string };
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      className="glass-card"
      style={{
        borderRadius: "12px",
        padding: "clamp(1.25rem, 3vw, 1.75rem)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          background: "rgba(var(--accent-rgb), 0.1)",
          border: "1px solid rgba(var(--accent-rgb), 0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          flexShrink: 0,
        }}
      >
        {pillar.icon}
      </div>

      <div>
        <h4
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {pillar.title}
        </h4>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            lineHeight: 1.65,
          }}
        >
          {pillar.body}
        </p>
      </div>
    </motion.div>
  );
}