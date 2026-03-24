"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, MessageCircle, ChevronRight, Star, Package, Clock, Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldButton from "@/components/ui/GoldButton";
import { tr } from "framer-motion/client";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "94771234567"; // ← REPLACE with real number

// ─── TYPES ─────────────────────────────────────────────────────────────────
type Category = "All" | "Magulporu" | "Sarees" | "Jewelry";

interface RentalItem {
  id: number;
  category: Exclude<Category, "All">;
  name: string;
  tagline: string;
  description: string;
  pricePerDay: string;
  deposit: string;
  duration: string;
  badge?: string;
  badgeType?: "gold" | "onyx" | "outline";
  features: string[];
  accentColor: string;
  iconBg: string;
  popular?: boolean;
  whatsappMsg: string;
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const RENTALS: RentalItem[] = [
  // MAGULPORU
  {
    id: 1,
    category: "Magulporu",
    name: "Grand Bridal Magulporu Set",
    tagline: "Complete Ceremony Collection",
    description: "Full traditional bridal set including gold-plated tray, ornate oil lamp, arecanut stand, betel leaf holder, and ceremonial brass items.",
    pricePerDay: "Rs. 8,500",
    deposit: "Rs. 15,000",
    duration: "1–3 days",
    badge: "Most Popular",
    badgeType: "gold",
    popular: true,
    features: ["Gold-plated tray set", "Ornate oil lamp (pahana)", "Arecanut & betel set", "Ceremonial brass items", "Delivery available"],
    accentColor: "rgba(201,168,76,0.15)",
    iconBg: "linear-gradient(135deg,#3d2b0a,#c9a84c)",
    whatsappMsg: "Hi! I'd like to enquire about renting the Grand Bridal Magulporu Set from THE ONE | Salon Bhagya.",
  },
  {
    id: 2,
    category: "Magulporu",
    name: "Traditional Oil Lamp Set",
    tagline: "Pahana & Ceremony Lights",
    description: "Intricately crafted brass oil lamps of varying heights. Ideal for poruwa ceremony, homecomings, and traditional celebrations.",
    pricePerDay: "Rs. 3,200",
    deposit: "Rs. 6,000",
    duration: "1–2 days",
    badge: "New",
    badgeType: "onyx",
    features: ["3 brass lamp sizes", "Polished brass finish", "Wicks & oil included", "Setup guidance"],
    accentColor: "rgba(201,168,76,0.10)",
    iconBg: "linear-gradient(135deg,#1a1206,#8b6914)",
    whatsappMsg: "Hi! I'd like to enquire about renting the Traditional Oil Lamp Set from THE ONE | Salon Bhagya.",
  },
  {
    id: 3,
    category: "Magulporu",
    name: "Poruwa Ceremony Package",
    tagline: "Complete Poruwa Essentials",
    description: "Everything needed for the sacred poruwa ceremony. Includes decorated poruwa tray, white cloth, flower arrangement holders, and brass accessories.",
    pricePerDay: "Rs. 5,800",
    deposit: "Rs. 10,000",
    duration: "1 day",
    features: ["Decorated poruwa tray", "Flower arrangement holders", "White ceremony cloth", "Brass accessories", "Checklist included"],
    accentColor: "rgba(201,168,76,0.10)",
    iconBg: "linear-gradient(135deg,#2a1f04,#a07828)",
    whatsappMsg: "Hi! I'd like to enquire about renting the Poruwa Ceremony Package from THE ONE | Salon Bhagya.",
  },
  // SAREES
  {
    id: 4,
    category: "Sarees",
    name: "Kandyan Bridal Osariya",
    tagline: "Traditional Bridal Drape",
    description: "Authentic Kandyan-style bridal osariya in ivory and gold. Hand-woven silk with intricate golden border work. Perfect for the wedding day.",
    pricePerDay: "Rs. 12,000",
    deposit: "Rs. 25,000",
    duration: "1–2 days",
    badge: "Premium",
    badgeType: "gold",
    popular: true,
    features: ["Authentic Kandyan weave", "Ivory & gold silk", "Matching blouse included", "Professional draping service", "Dry-cleaned before rental"],
    accentColor: "rgba(201,168,76,0.15)",
    iconBg: "linear-gradient(135deg,#3d2b0a,#c9a84c)",
    whatsappMsg: "Hi! I'd like to enquire about renting the Kandyan Bridal Osariya from THE ONE | Salon Bhagya.",
  },
  {
    id: 5,
    category: "Sarees",
    name: "Designer Georgette Saree",
    tagline: "Elegant Evening Drape",
    description: "Flowing georgette saree with hand-embroidered sequin work. Available in deep burgundy, midnight navy, and emerald green.",
    pricePerDay: "Rs. 4,500",
    deposit: "Rs. 8,000",
    duration: "1–3 days",
    features: ["3 colour options", "Sequin embroidery", "Matching petticoat", "Blouse piece included"],
    accentColor: "rgba(201,168,76,0.10)",
    iconBg: "linear-gradient(135deg,#1a0a1a,#8b4a8b)",
    whatsappMsg: "Hi! I'd like to enquire about renting the Designer Georgette Saree from THE ONE | Salon Bhagya.",
  },
  {
    id: 6,
    category: "Sarees",
    name: "Batik Silk Saree Collection",
    tagline: "Sri Lankan Artisan Craft",
    description: "Hand-batik printed pure silk sarees by local artisans. Each piece is unique with traditional Sri Lankan motifs and vibrant colour palettes.",
    pricePerDay: "Rs. 3,800",
    deposit: "Rs. 7,000",
    duration: "1–3 days",
    badge: "Local Craft",
    badgeType: "outline",
    features: ["Pure silk fabric", "Handmade batik print", "Unique each piece", "Certificate of authenticity"],
    accentColor: "rgba(201,168,76,0.10)",
    iconBg: "linear-gradient(135deg,#0a1a0a,#3a7a3a)",
    whatsappMsg: "Hi! I'd like to enquire about renting a Batik Silk Saree from THE ONE | Salon Bhagya.",
  },
  // JEWELRY
  {
    id: 7,
    category: "Jewelry",
    name: "Bridal Gold Jewellery Set",
    tagline: "22K Gold-Plated Bridal",
    description: "Complete bridal jewellery ensemble including necklace, earrings, bangles, maang tikka, and nose ring. Inspired by traditional Kandyan bridal jewellery.",
    pricePerDay: "Rs. 18,500",
    deposit: "Rs. 40,000",
    duration: "1–2 days",
    badge: "Signature",
    badgeType: "gold",
    popular: true,
    features: ["22K gold-plated", "Necklace + earrings", "Bangles set (x6)", "Maang tikka", "Insured rental"],
    accentColor: "rgba(201,168,76,0.18)",
    iconBg: "linear-gradient(135deg,#3d2b0a,#c9a84c)",
    whatsappMsg: "Hi! I'd like to enquire about renting the Bridal Gold Jewellery Set from THE ONE | Salon Bhagya.",
  },
  {
    id: 8,
    category: "Jewelry",
    name: "Pearl & Gem Necklace Set",
    tagline: "Elegant Statement Piece",
    description: "Layered freshwater pearl necklace with gemstone accents. Pairs beautifully with both western gowns and traditional sarees.",
    pricePerDay: "Rs. 6,200",
    deposit: "Rs. 12,000",
    duration: "1–3 days",
    features: ["Freshwater pearls", "Gemstone accents", "Matching earrings", "Velvet gift box"],
    accentColor: "rgba(201,168,76,0.10)",
    iconBg: "linear-gradient(135deg,#0a0a1a,#4a4a8b)",
    whatsappMsg: "Hi! I'd like to enquire about renting the Pearl & Gem Necklace Set from THE ONE | Salon Bhagya.",
  },
  {
    id: 9,
    category: "Jewelry",
    name: "Antique Temple Jewellery",
    tagline: "Heritage Piece Collection",
    description: "South Indian-inspired antique gold-tone temple jewellery. Features deity motifs and intricate filigree work. A showstopper for bharatanatyam, classical events, or bridal.",
    pricePerDay: "Rs. 9,000",
    deposit: "Rs. 20,000",
    duration: "1–2 days",
    badge: "Rare",
    badgeType: "outline",
    features: ["Temple gold-tone", "Deity motif details", "Full set available", "Certified pieces"],
    accentColor: "rgba(201,168,76,0.12)",
    iconBg: "linear-gradient(135deg,#2a1a00,#b87c00)",
    whatsappMsg: "Hi! I'd like to enquire about renting Antique Temple Jewellery from THE ONE | Salon Bhagya.",
  },
];

const CATEGORIES: Category[] = ["All", "Magulporu", "Sarees", "Jewelry"];

const CATEGORY_ICONS: Record<string, string> = {
  Magulporu: "🪔",
  Sarees: "🥻",
  Jewelry: "💎",
};

// ─── RENTAL CARD ────────────────────────────────────────────────────────────
function RentalCard({ item, index }: { item: RentalItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(item.whatsappMsg)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(145deg, var(--bg-tertiary), ${item.accentColor})`
          : "var(--bg-secondary)",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.45)" : "var(--border-subtle)"}`,
        borderRadius: "4px",
        transition: "all 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
        boxShadow: hovered
          ? "0 12px 48px rgba(201,168,76,0.18), 0 2px 8px rgba(0,0,0,0.4)"
          : "0 2px 12px rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Popular badge */}
      {item.popular && (
        <div style={{
          position: "absolute",
          top: "-1px",
          right: "20px",
          background: "linear-gradient(90deg,#b8860b,#c9a84c,#b8860b)",
          color: "#080806",
          fontSize: "0.6rem",
          fontFamily: "var(--font-cinzel)",
          fontWeight: 700,
          letterSpacing: "0.12em",
          padding: "4px 12px",
          borderRadius: "0 0 6px 6px",
          zIndex: 10,
        }}>
          ★ POPULAR
        </div>
      )}

      {/* Visual header panel */}
      <div style={{
        height: "160px",
        background: item.iconBg,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Noise overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
          opacity: 0.5,
        }} />

        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% 120%, rgba(201,168,76,0.25) 0%, transparent 65%)",
        }} />

        {/* Category emoji + label */}
        <div style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(8,8,6,0.55)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: "20px",
          padding: "4px 10px",
        }}>
          <span style={{ fontSize: "0.85rem" }}>{CATEGORY_ICONS[item.category]}</span>
          <span style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.6rem",
            fontWeight: 600,
            color: "var(--accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>{item.category}</span>
        </div>

        {/* Badge */}
        {item.badge && (
          <div style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: item.badgeType === "gold"
              ? "linear-gradient(90deg,#b8860b,#c9a84c)"
              : item.badgeType === "onyx"
                ? "#080806"
                : "transparent",
            border: item.badgeType === "outline" ? "1px solid var(--accent)" : "none",
            color: item.badgeType === "onyx" ? "#c9a84c" : item.badgeType === "outline" ? "var(--accent)" : "#080806",
            fontSize: "0.58rem",
            fontFamily: "var(--font-cinzel)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "3px 10px",
            borderRadius: "2px",
          }}>{item.badge}</div>
        )}

        {/* Price tag in header */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          textAlign: "right",
        }}>
          <div style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: hovered ? "#fcd34d" : "var(--accent)",
            transition: "color 0.3s ease",
            textShadow: "0 2px 12px rgba(201,168,76,0.4)",
          }}>{item.pricePerDay}</div>
          <div style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.08em",
          }}>per day</div>
        </div>

        {/* Duration bottom-left */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}>
          <Clock size={11} color="rgba(201,168,76,0.7)" />
          <span style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.55)",
          }}>{item.duration}</span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.25rem 1.4rem 1.4rem" }}>
        {/* Tagline */}
        <div style={{
          fontFamily: "var(--font-cinzel)",
          fontSize: "0.58rem",
          fontWeight: 600,
          color: "var(--accent)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}>{item.tagline}</div>

        {/* Name */}
        <h3 style={{
          fontFamily: "var(--font-cinzel)",
          fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}>{item.name}</h3>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg,var(--accent),transparent)",
          marginBottom: "12px",
          opacity: 0.35,
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.92rem",
          lineHeight: 1.65,
          color: "var(--text-muted)",
          marginBottom: "14px",
        }}>{item.description}</p>

        {/* Features list */}
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 16px 0",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}>
          {item.features.map((f, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Check size={11} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
              }}>{f}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}>
          {/* Deposit info */}
          <div>
            <div style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
              marginBottom: "2px",
            }}>Refundable deposit</div>
            <div style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
            }}>{item.deposit}</div>
          </div>

          {/* WhatsApp CTA */}
          <button
            onClick={handleWhatsApp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 16px",
              background: hovered
                ? "linear-gradient(135deg,#b8860b,#c9a84c)"
                : "transparent",
              border: `1px solid ${hovered ? "transparent" : "rgba(201,168,76,0.4)"}`,
              borderRadius: "2px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              color: hovered ? "#080806" : "var(--accent)",
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <MessageCircle size={13} />
            Enquire
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN SECTION ───────────────────────────────────────────────────────────
export default function RentalsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = activeCategory === "All"
    ? RENTALS
    : RENTALS.filter((r) => r.category === activeCategory);

  const handleGeneralEnquiry = () => {
    const msg = "Hi! I'd like to enquire about the rental services at THE ONE | Salon Bhagya. Could you share the available items and pricing?";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="rentals"
      style={{
        background: "var(--bg-primary)",
        paddingBlock: "clamp(6rem, 12vw, 10rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "10%", left: "-5%", width: "420px", height: "420px",
        background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "-5%", width: "380px", height: "380px",
        background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-salon relative" style={{ zIndex: 10 }}>

        {/* Section Header */}
        <SectionHeader
          label="Rental Services"
          title={
            <>
              Dress Your <span className="text-gold-gradient">Special Moment</span>
            </>
          }
          subtitle="Authentic magulporu, handcrafted sarees & fine jewellery — available to rent for your most treasured celebrations."
          align="center"
          animate
          isInView={isInView}
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.35 }}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 20px",
                borderRadius: "2px",
                border: `1px solid ${activeCategory === cat ? "transparent" : "rgba(201,168,76,0.25)"}`,
                background: activeCategory === cat
                  ? "linear-gradient(135deg,#b8860b,#c9a84c)"
                  : "transparent",
                color: activeCategory === cat ? "#080806" : "var(--text-muted)",
                fontFamily: "var(--font-cinzel)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.28s ease",
              }}
            >
              {cat !== "All" && <span style={{ fontSize: "0.85rem" }}>{CATEGORY_ICONS[cat]}</span>}
              {cat}
            </button>
          ))}

          {/* Item count */}
          <div style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            gap: "4px",
          }}>
            <Package size={13} color="var(--accent)" />
            <span>{filtered.length} items available</span>
          </div>
        </motion.div>

        {/* Rental grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: "clamp(1rem, 2vw, 1.5rem)",
              marginBottom: "clamp(3rem, 6vw, 5rem)",
            }}
          >
            {filtered.map((item, i) => (
              <RentalCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
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
            maxWidth: "560px",
            margin: "0 auto 28px",
          }}>
            Looking for something specific? We source custom rental items on request — just reach out.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <GoldButton
              variant="filled"
              size="md"
              icon={<MessageCircle size={15} />}
              onClick={handleGeneralEnquiry}
            >
              WhatsApp Enquiry
            </GoldButton>
            <GoldButton
              variant="outline"
              size="md"
              href="/#contact"
              icon={<ChevronRight size={15} />}
            >
              Book an Appointment
            </GoldButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}