"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ShoppingBag, MessageCircle, Star, ChevronRight, Sparkles, Droplets, Shirt } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldButton from "@/components/ui/GoldButton";

/* ─────────────────────────────────────────────
   Product data
───────────────────────────────────────────── */
interface Product {
  id: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  badge?: string;
  stars: number;
  reviews: number;
  gradient: string;
  icon: React.ReactNode;
  whatsappMsg: string;
}

const PRODUCTS: Product[] = [
  // ── Skincare / Creams ──
  {
    id: "p1",
    category: "Skincare",
    name: "24K Gold Radiance Cream",
    tagline: "Luminous skin, every day",
    description: "Infused with 24-karat gold particles and hyaluronic acid. Deeply hydrates, firms, and gives an unmistakable glow.",
    price: "Rs. 3,800",
    badge: "Best Seller",
    stars: 5,
    reviews: 128,
    gradient: "linear-gradient(135deg,#1a1206 0%,#5c2e00 50%,#c9a84c 100%)",
    icon: <Sparkles size={22} />,
    whatsappMsg: "Hi! I'd like to order the 24K Gold Radiance Cream.",
  },
  {
    id: "p2",
    category: "Skincare",
    name: "Rose & Saffron Serum",
    tagline: "Ancient luxury, modern science",
    description: "A potent blend of Persian saffron extract and Bulgarian rose oil. Brightens pigmentation and evens skin tone.",
    price: "Rs. 4,500",
    stars: 5,
    reviews: 84,
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#5c1a1a 50%,#c9a84c 100%)",
    icon: <Droplets size={22} />,
    whatsappMsg: "Hi! I'd like to order the Rose & Saffron Serum.",
  },
  {
    id: "p3",
    category: "Skincare",
    name: "Velvet Body Butter",
    tagline: "Silk-soft from head to toe",
    description: "Rich shea and mango butter blend enriched with vitamin E. Melts into skin instantly, leaving a silky, non-greasy finish.",
    price: "Rs. 2,200",
    badge: "New",
    stars: 4,
    reviews: 47,
    gradient: "linear-gradient(135deg,#181006 0%,#3d2b0a 55%,#f5d78e 100%)",
    icon: <Sparkles size={22} />,
    whatsappMsg: "Hi! I'd like to order the Velvet Body Butter.",
  },
  {
    id: "p4",
    category: "Skincare",
    name: "Charcoal Detox Mask",
    tagline: "Deep cleanse, deep glow",
    description: "Activated coconut charcoal and kaolin clay pull out impurities while green tea extract soothes and protects.",
    price: "Rs. 1,800",
    stars: 4,
    reviews: 62,
    gradient: "linear-gradient(135deg,#080806 0%,#1a1a10 50%,#c9a84c 100%)",
    icon: <Droplets size={22} />,
    whatsappMsg: "Hi! I'd like to order the Charcoal Detox Mask.",
  },
  // ── Fashion ──
  {
    id: "p5",
    category: "Fashion",
    name: "Silk Organza Saree",
    tagline: "Timeless elegance, reimagined",
    description: "Handwoven pure silk organza with delicate zari border. Available in 12 curated colours. Perfect for weddings and events.",
    price: "Rs. 28,000",
    badge: "Premium",
    stars: 5,
    reviews: 39,
    gradient: "linear-gradient(135deg,#0a0614 0%,#2d1460 55%,#c9a84c 100%)",
    icon: <Shirt size={22} />,
    whatsappMsg: "Hi! I'm interested in the Silk Organza Saree. Can you share available colours?",
  },
  {
    id: "p6",
    category: "Fashion",
    name: "Embroidered Blouse Set",
    tagline: "Heritage craft, modern fit",
    description: "Hand-embroidered blouse with matching underskirt. Crafted by artisans using traditional zardozi technique.",
    price: "Rs. 12,500",
    stars: 5,
    reviews: 27,
    gradient: "linear-gradient(135deg,#0a1006 0%,#1a3010 55%,#c9a84c 100%)",
    icon: <Shirt size={22} />,
    whatsappMsg: "Hi! I'd like to enquire about the Embroidered Blouse Set.",
  },
  {
    id: "p7",
    category: "Fashion",
    name: "Bridal Lehenga Collection",
    tagline: "Made for your most magical day",
    description: "Bespoke bridal lehengas in pure banarasi silk and georgette. Custom sizing, custom embroidery, your dream silhouette.",
    price: "From Rs. 85,000",
    badge: "Bespoke",
    stars: 5,
    reviews: 18,
    gradient: "linear-gradient(135deg,#140a06 0%,#5c1a00 50%,#f5d78e 100%)",
    icon: <Shirt size={22} />,
    whatsappMsg: "Hi! I'd like to discuss a Bridal Lehenga for my wedding. Can we schedule a consultation?",
  },
  {
    id: "p8",
    category: "Fashion",
    name: "Casual Linen Co-ord",
    tagline: "Effortless everyday luxury",
    description: "Breathable linen co-ord set with hand-block print. Easy to style, easy to love. Available in 6 seasonal colourways.",
    price: "Rs. 6,800",
    badge: "New",
    stars: 4,
    reviews: 53,
    gradient: "linear-gradient(135deg,#0a0e14 0%,#1a2840 55%,#c9a84c 100%)",
    icon: <Shirt size={22} />,
    whatsappMsg: "Hi! I'd like to order the Casual Linen Co-ord. Can you share the colourways?",
  },
];

const CATEGORIES = ["All", "Skincare", "Fashion"];

const WHATSAPP_NUMBER = "94771234567"; // ← replace with real number

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-secondary)",
        paddingBlock: "clamp(6rem, 12vw, 10rem)",
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px]"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(var(--accent-rgb),0.05) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          style={{
            background:
              "radial-gradient(circle at bottom left, rgba(var(--accent-rgb),0.04) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="container-salon relative z-10">
        {/* Header */}
        <SectionHeader
          label="Shop with Us"
          title={
            <>
              Our <span className="text-gold-gradient">Products</span>
            </>
          }
          subtitle="Luxury skincare and curated fashion — hand-picked to complement your beauty journey. Order directly via WhatsApp."
          isInView={isInView}
          spaceBelow="clamp(1.75rem, 4vw, 2.75rem)"
        />

        {/* WhatsApp banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 1.5rem",
            borderRadius: "10px",
            background: "rgba(37,211,102,0.06)",
            border: "1px solid rgba(37,211,102,0.2)",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
            flexWrap: "wrap",
          }}
        >
          <MessageCircle size={18} color="#25D366" style={{ flexShrink: 0 }} />
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              color: "var(--text-secondary)",
              flex: 1,
            }}
          >
            All products are available via{" "}
            <strong style={{ color: "#25D366" }}>WhatsApp order</strong>. Click
            &quot;Order Now&quot; on any product to chat with us directly.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.6rem 1.5rem",
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "100px",
                  border: `1px solid ${active ? "var(--accent)" : "var(--border-subtle)"}`,
                  background: active
                    ? "var(--accent)"
                    : "rgba(var(--accent-rgb),0.07)",
                  color: active ? "var(--bg-primary)" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: active ? "scale(1.05)" : "scale(1)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(1.25rem, 3vw, 2rem)",
            }}
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                isInView={isInView}
                whatsappNumber={WHATSAPP_NUMBER}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-6"
          style={{ marginTop: "clamp(3.5rem, 7vw, 6rem)" }}
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
            Looking for something specific? We source exclusive items on request.
          </p>
          <GoldButton
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'd like to enquire about your products.`}
            variant="filled"
            size="lg"
            icon={<MessageCircle size={16} />}
          >
            Chat on WhatsApp
          </GoldButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Product Card ── */
function ProductCard({
  product,
  index,
  isInView,
  whatsappNumber,
}: {
  product: Product;
  index: number;
  isInView: boolean;
  whatsappNumber: string;
}) {
  const [hovered, setHovered] = useState(false);

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(product.whatsappMsg)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        background: hovered
          ? "rgba(var(--accent-rgb),0.06)"
          : "var(--glass-bg)",
        border: `1px solid ${hovered ? "rgba(var(--accent-rgb),0.38)" : "var(--glass-border)"}`,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(var(--accent-rgb),0.1)"
          : "0 4px 16px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div
          style={{
            position: "absolute",
            top: "0.85rem",
            right: "0.85rem",
            zIndex: 5,
            padding: "0.2rem 0.7rem",
            borderRadius: "100px",
            background:
              product.badge === "Best Seller"
                ? "var(--accent)"
                : product.badge === "New"
                ? "rgba(37,211,102,0.85)"
                : product.badge === "Premium"
                ? "rgba(var(--accent-rgb),0.15)"
                : "rgba(var(--accent-rgb),0.15)",
            border:
              product.badge === "Best Seller" || product.badge === "New"
                ? "none"
                : "1px solid rgba(var(--accent-rgb),0.45)",
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.5rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:
              product.badge === "Best Seller"
                ? "var(--bg-primary)"
                : product.badge === "New"
                ? "#080806"
                : "var(--accent)",
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Visual panel */}
      <div
        style={{
          height: "180px",
          background: product.gradient,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Noise */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />

        {/* Category pill */}
        <div
          style={{
            position: "absolute",
            top: "0.85rem",
            left: "0.85rem",
            padding: "0.22rem 0.7rem",
            background: "rgba(8,8,6,0.65)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(var(--accent-rgb),0.25)",
            borderRadius: "100px",
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {product.category}
        </div>

        {/* Icon centred */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: "rgba(var(--accent-rgb),0.12)",
            border: "1px solid rgba(var(--accent-rgb),0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
            transform: hovered ? "rotate(-8deg) scale(1.1)" : "rotate(0) scale(1)",
            transition: "transform 0.38s ease",
          }}
        >
          {product.icon}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "1.25rem 1.4rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Tagline */}
        <span
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            opacity: 0.8,
            marginBottom: "0.4rem",
            display: "block",
          }}
        >
          {product.tagline}
        </span>

        {/* Name */}
        <h3
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.98rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "0.02em",
            lineHeight: 1.3,
            marginBottom: "0.65rem",
          }}
        >
          {product.name}
        </h3>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, rgba(var(--accent-rgb),${hovered ? 0.3 : 0.1}), transparent)`,
            marginBottom: "0.65rem",
            transition: "background 0.38s ease",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            lineHeight: 1.65,
            marginBottom: "1rem",
          }}
        >
          {product.description}
        </p>

        {/* Stars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            marginBottom: "1rem",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              color={i < product.stars ? "#C9A84C" : "rgba(160,160,136,0.3)"}
              fill={i < product.stars ? "#C9A84C" : "none"}
            />
          ))}
          <span
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              marginLeft: "0.2rem",
            }}
          >
            ({product.reviews})
          </span>
        </div>

        {/* Footer: price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--border-subtle)",
            marginTop: "auto",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "1.15rem",
              fontWeight: 800,
              letterSpacing: "0.02em",
              lineHeight: 1,
              color: hovered ? "var(--accent)" : "var(--text-primary)",
              transition: "color 0.3s ease",
            }}
          >
            {product.price}
          </p>

          {/* WhatsApp order button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 1rem",
              borderRadius: "2px",
              background: hovered
                ? "linear-gradient(135deg,#C9A84C 0%,#F5D78E 50%,#C9A84C 100%)"
                : "transparent",
              backgroundSize: "200% auto",
              border: `1px solid ${hovered ? "transparent" : "var(--accent)"}`,
              color: hovered ? "var(--bg-primary)" : "var(--accent)",
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "0 4px 16px rgba(201,168,76,0.4)";
              el.style.backgroundPosition = "right center";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <ShoppingBag size={11} />
            Order
            <ChevronRight size={10} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}