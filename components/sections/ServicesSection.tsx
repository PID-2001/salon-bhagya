"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Gem,
  Heart,
  Flower2,
  Crown,
  Star,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard, { type ServiceCardData } from "@/components/ui/ServiceCard";
import GoldButton from "@/components/ui/GoldButton";

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  services: ServiceCardData[];
}

const CATEGORIES: Category[] = [
  {
    id: "hair",
    label: "Hair",
    icon: <Scissors size={15} />,
    services: [
      {
        id: "h1",
        name: "Signature Cut & Style",
        tagline: "Precision crafted for you",
        description:
          "Expert consultation, wash, precision cut, and blowout styled to perfection by our master stylists.",
        price: "Rs. 2,500",
        priceNote: "Starting from",
        duration: "60–90 min",
        popular: true,
        icon: <Scissors size={22} />,
      },
      {
        id: "h2",
        name: "Luxury Colour",
        tagline: "Dimensional, lived-in tones",
        description:
          "Full colour, balayage, ombré, or highlights using premium ammonia-free colour lines.",
        price: "Rs. 6,500",
        priceNote: "Starting from",
        duration: "2–4 hrs",
        icon: <Sparkles size={22} />,
      },
      {
        id: "h3",
        name: "Keratin Treatment",
        tagline: "Smooth. Frizz-free. Luminous.",
        description:
          "Brazilian keratin smoothing treatment for sleek, manageable hair lasting up to 5 months.",
        price: "Rs. 9,000",
        priceNote: "Starting from",
        duration: "3–4 hrs",
        icon: <Star size={22} />,
      },
      {
        id: "h4",
        name: "Deep Conditioning Ritual",
        tagline: "Restore & replenish",
        description:
          "Intensive moisture infusion mask treatment with scalp massage for damaged, dry, or colour-treated hair.",
        price: "Rs. 3,200",
        duration: "45 min",
        popular: true,
        icon: <Flower2 size={22} />,
      },
    ],
  },
  {
    id: "skin",
    label: "Skin",
    icon: <Sparkles size={15} />,
    services: [
      {
        id: "s1",
        name: "Gold Facial",
        tagline: "24K radiance treatment",
        description:
          "Luxurious 24-karat gold-infused facial that brightens, firms, and gives an unmatched luminous glow.",
        price: "Rs. 5,500",
        duration: "75 min",
        popular: true,
        icon: <Gem size={22} />,
      },
      {
        id: "s2",
        name: "Hydra Glow Facial",
        tagline: "Quench & illuminate",
        description:
          "Deep hydration facial with hyaluronic serum infusion, jade roller massage, and collagen sheet mask.",
        price: "Rs. 4,200",
        duration: "60 min",
        icon: <Flower2 size={22} />,
      },
      {
        id: "s3",
        name: "Full Body Scrub",
        tagline: "Exfoliate. Renew. Glow.",
        description:
          "Head-to-toe exfoliation with botanical coffee or Himalayan salt scrub, followed by nourishing oil wrap.",
        price: "Rs. 7,000",
        duration: "90 min",
        icon: <Sparkles size={22} />,
      },
      {
        id: "s4",
        name: "Eyebrow Architecture",
        tagline: "Perfectly sculpted arches",
        description:
          "Precision brow mapping, shaping, tinting, and lamination for flawlessly defined brows.",
        price: "Rs. 1,800",
        duration: "45 min",
        icon: <Star size={22} />,
      },
    ],
  },
  {
    id: "nails",
    label: "Nails",
    icon: <Gem size={15} />,
    services: [
      {
        id: "n1",
        name: "Gel Manicure",
        tagline: "Chip-free for weeks",
        description:
          "Soak off gel manicure with cuticle care, shaping, and your choice from 200+ gel shades.",
        price: "Rs. 2,200",
        duration: "60 min",
        popular: true,
        icon: <Gem size={22} />,
      },
      {
        id: "n2",
        name: "Luxury Spa Pedicure",
        tagline: "Soak in the ritual",
        description:
          "45-minute foot soak, callus removal, exfoliation, paraffin wax treatment, and gel polish finish.",
        price: "Rs. 3,500",
        duration: "75 min",
        icon: <Flower2 size={22} />,
      },
      {
        id: "n3",
        name: "Nail Art Design",
        tagline: "Wearable art at your tips",
        description:
          "Custom nail art from minimalist linework to intricate 3D designs by our specialist nail artists.",
        price: "Rs. 1,500",
        priceNote: "Per design, from",
        duration: "30–90 min",
        icon: <Sparkles size={22} />,
      },
      {
        id: "n4",
        name: "Acrylic Extensions",
        tagline: "Length. Strength. Drama.",
        description:
          "Full set of sculpted acrylic extensions with your choice of shape, length, and finish.",
        price: "Rs. 4,800",
        duration: "90 min",
        icon: <Star size={22} />,
      },
    ],
  },
  {
    id: "bridal",
    label: "Bridal",
    icon: <Crown size={15} />,
    services: [
      {
        id: "b1",
        name: "Bridal Makeup",
        tagline: "Your most radiant day",
        description:
          "Full bridal makeup using premium airbrush and HD techniques for a flawless, long-lasting finish.",
        price: "Rs. 18,000",
        priceNote: "Starting from",
        duration: "3–4 hrs",
        popular: true,
        icon: <Crown size={22} />,
      },
      {
        id: "b2",
        name: "Bridal Hair Styling",
        tagline: "Updos, waves & beyond",
        description:
          "Bridal updo or half-up style with extensions, braids, floral accessories, and setting spray.",
        price: "Rs. 8,500",
        priceNote: "Starting from",
        duration: "2–3 hrs",
        icon: <Scissors size={22} />,
      },
      {
        id: "b3",
        name: "Pre-Bridal Package",
        tagline: "The complete glow-up",
        description:
          "3-session prep package: facial, waxing, manicure + pedicure, threading, and body polish.",
        price: "Rs. 25,000",
        duration: "3 sessions",
        icon: <Heart size={22} />,
      },
      {
        id: "b4",
        name: "Bridal Mehendi",
        tagline: "Intricate artistry",
        description:
          "Full hand and feet mehendi with premium organic henna, bridal motifs, and design consultation.",
        price: "Rs. 12,000",
        priceNote: "Starting from",
        duration: "4–6 hrs",
        icon: <Flower2 size={22} />,
      },
    ],
  },
  {
    id: "wellness",
    label: "Wellness",
    icon: <Heart size={15} />,
    services: [
      {
        id: "w1",
        name: "Aromatherapy Massage",
        tagline: "Melt into serenity",
        description:
          "Full-body Swedish massage with warm essential oil blends to relieve tension and restore calm.",
        price: "Rs. 6,500",
        duration: "60 min",
        popular: true,
        icon: <Flower2 size={22} />,
      },
      {
        id: "w2",
        name: "Hot Stone Therapy",
        tagline: "Ancient warmth, modern luxury",
        description:
          "Basalt lava stone massage that melts deep muscle tension with heat-conducted pressure.",
        price: "Rs. 8,000",
        duration: "75 min",
        icon: <Sparkles size={22} />,
      },
      {
        id: "w3",
        name: "Head Spa",
        tagline: "Scalp bliss ritual",
        description:
          "Japanese-inspired head spa: scalp diagnosis, cleanse, steam, massage, and strengthening treatment.",
        price: "Rs. 4,500",
        duration: "60 min",
        icon: <Heart size={22} />,
      },
      {
        id: "w4",
        name: "Full Body Waxing",
        tagline: "Silky smooth, head to toe",
        description:
          "Full body waxing with soothing aloe gel finish using premium low-temperature stripless wax.",
        price: "Rs. 5,500",
        duration: "90 min",
        icon: <Star size={22} />,
      },
    ],
  },
];

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("hair");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const current = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-primary)",
        paddingBlock: "clamp(6rem, 12vw, 10rem)", // ← more generous than section-pad
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "900px",
            height: "900px",
            background:
              "radial-gradient(circle, rgba(var(--accent-rgb), 0.04) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0"
          style={{
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle at bottom right, rgba(var(--accent-rgb), 0.05) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="container-salon relative z-10">
        {/* ── Section header ── */}
        <SectionHeader
          label="What We Offer"
          title={
            <>
              Our <span className="text-gold-gradient">Services</span>
            </>
          }
          subtitle="From transformative hair artistry to indulgent wellness rituals — every service at THE ONE is a curated experience in luxury."
          isInView={isInView}
          spaceBelow="clamp(1.75rem, 4vw, 2.75rem)"
        />

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }} // ← breathing room below tabs
        >
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 rounded-full transition-all duration-300"
                  style={{
                    padding: "0.6rem 1.5rem",
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: isActive
                      ? "var(--accent)"
                      : "rgba(var(--accent-rgb), 0.07)",
                    color: isActive
                      ? "var(--bg-primary)"
                      : "var(--text-secondary)",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--border-subtle)"}`,
                    boxShadow: isActive ? "var(--shadow-gold-sm)" : "none",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <span style={{ opacity: isActive ? 1 : 0.65 }}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Services grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 440px), 1fr))",
              gap: "clamp(1.25rem, 3vw, 2rem)", // ← responsive gap
            }}
          >
            {current.services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-6"
          style={{ marginTop: "clamp(3.5rem, 7vw, 6rem)" }} // ← generous top margin
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Can't find what you're looking for? We offer custom packages too.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton href="/#contact" variant="filled" size="lg" requiresAuth>
              Book an Appointment
            </GoldButton>
            <GoldButton href="/#contact" variant="outline" size="lg" requiresAuth>
              Ask Us Anything
            </GoldButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
