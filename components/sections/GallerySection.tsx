"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

/* ─────────────────────────────────────────────
   Gallery data — replace src values with real
   images. For now we use gradient placeholders.
───────────────────────────────────────────── */
interface GalleryItem {
  id: string;
  category: string;
  label: string;
  sublabel: string;
  /** CSS gradient used as placeholder until real images are added */
  gradient: string;
  /** span: "tall" | "wide" | "normal" controls grid placement */
  span: "tall" | "wide" | "normal";
}

const ITEMS: GalleryItem[] = [
  {
    id: "g1",
    category: "Hair",
    label: "Balayage Melt",
    sublabel: "Dimensional colour",
    gradient: "linear-gradient(135deg,#1a1206 0%,#3d2b0a 40%,#c9a84c 100%)",
    span: "tall",
  },
  {
    id: "g2",
    category: "Bridal",
    label: "Bridal Glam",
    sublabel: "Full makeup & updo",
    gradient: "linear-gradient(160deg,#0e0e0a 0%,#5c2e00 60%,#f5d78e 100%)",
    span: "normal",
  },
  {
    id: "g3",
    category: "Nails",
    label: "Nail Artistry",
    sublabel: "Custom gel design",
    gradient: "linear-gradient(120deg,#181810 0%,#78420a 50%,#c9a84c 100%)",
    span: "normal",
  },
  {
    id: "g4",
    category: "Skin",
    label: "Gold Facial",
    sublabel: "24K radiance ritual",
    gradient: "linear-gradient(150deg,#080806 0%,#b8860b 60%,#fdf6e3 100%)",
    span: "wide",
  },
  {
    id: "g5",
    category: "Hair",
    label: "Keratin Silk",
    sublabel: "Frizz-free smoothing",
    gradient: "linear-gradient(135deg,#282818 0%,#92640a 50%,#fcd34d 100%)",
    span: "normal",
  },
  {
    id: "g6",
    category: "Bridal",
    label: "Mehendi Art",
    sublabel: "Intricate bridal henna",
    gradient: "linear-gradient(160deg,#0e0e0a 0%,#3a3a28 50%,#c9a84c 100%)",
    span: "tall",
  },
  {
    id: "g7",
    category: "Wellness",
    label: "Spa Ritual",
    sublabel: "Hot stone therapy",
    gradient: "linear-gradient(120deg,#181810 0%,#585840 55%,#f5d78e 100%)",
    span: "normal",
  },
  {
    id: "g8",
    category: "Hair",
    label: "Editorial Cut",
    sublabel: "Precision styling",
    gradient: "linear-gradient(145deg,#080806 0%,#b8860b 45%,#fdfaf4 100%)",
    span: "normal",
  },
];

const CATEGORIES = ["All", "Hair", "Bridal", "Nails", "Skin", "Wellness"];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "All"
      ? ITEMS
      : ITEMS.filter((i) => i.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  const next = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-primary)",
        paddingBlock: "clamp(6rem, 12vw, 10rem)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(circle, rgba(var(--accent-rgb),0.04) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="container-salon relative z-10">
        {/* Header */}
        <SectionHeader
          label="Portfolio"
          title={
            <>
              Our <span className="text-gold-gradient">Gallery</span>
            </>
          }
          subtitle="A glimpse into the artistry that defines THE ONE. Every image is a story of transformation."
          isInView={isInView}
          spaceBelow="clamp(1.75rem, 4vw, 2.75rem)"
        />

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
                  padding: "0.5rem 1.3rem",
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: "100px",
                  border: `1px solid ${active ? "var(--accent)" : "var(--border-subtle)"}`,
                  background: active
                    ? "var(--accent)"
                    : "rgba(var(--accent-rgb),0.05)",
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

        {/* Masonry-style grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gridAutoRows: "220px",
              gap: "clamp(0.75rem, 2vw, 1.25rem)",
            }}
          >
            {filtered.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={idx}
                isInView={isInView}
                onOpen={() => openLightbox(idx)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            textAlign: "center",
            fontFamily: "var(--font-cormorant)",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "var(--text-muted)",
            marginTop: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          Follow us on Instagram{" "}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            @salonbhagya
          </a>{" "}
          for daily inspiration.
        </motion.p>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            item={filtered[lightboxIndex]}
            total={filtered.length}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Gallery Card ── */
function GalleryCard({
  item,
  index,
  isInView,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  isInView: boolean;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const gridStyle: React.CSSProperties =
    item.span === "tall"
      ? { gridRow: "span 2" }
      : item.span === "wide"
      ? { gridColumn: "span 2" }
      : {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{
        ...gridStyle,
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        background: item.gradient,
        border: `1px solid ${hovered ? "rgba(var(--accent-rgb),0.45)" : "rgba(var(--accent-rgb),0.12)"}`,
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.45), 0 0 30px rgba(var(--accent-rgb),0.15)"
          : "0 4px 16px rgba(0,0,0,0.25)",
      }}
    >
      {/* Noise overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.035,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Category pill */}
      <div
        style={{
          position: "absolute",
          top: "0.85rem",
          left: "0.85rem",
          zIndex: 3,
          padding: "0.25rem 0.75rem",
          background: "rgba(8,8,6,0.65)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(var(--accent-rgb),0.25)",
          borderRadius: "100px",
          fontFamily: "var(--font-cinzel)",
          fontSize: "0.52rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        {item.category}
      </div>

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: hovered
            ? "linear-gradient(180deg, transparent 30%, rgba(8,8,6,0.85) 100%)"
            : "linear-gradient(180deg, transparent 50%, rgba(8,8,6,0.6) 100%)",
          transition: "background 0.38s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.25rem",
        }}
      >
        {/* Zoom icon */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.6})`,
            opacity: hovered ? 1 : 0,
            transition: "all 0.3s ease",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "rgba(var(--accent-rgb),0.15)",
            border: "1px solid rgba(var(--accent-rgb),0.5)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
          }}
        >
          <ZoomIn size={18} />
        </div>

        {/* Label */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.88rem",
              fontWeight: 700,
              color: "#FDFAF4",
              letterSpacing: "0.04em",
              marginBottom: "0.2rem",
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              opacity: hovered ? 1 : 0.75,
              transition: "all 0.3s ease",
            }}
          >
            {item.label}
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.82rem",
              fontStyle: "italic",
              color: "rgba(var(--accent-rgb),0.85)",
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              opacity: hovered ? 1 : 0,
              transition: "all 0.35s ease 0.05s",
            }}
          >
            {item.sublabel}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Lightbox ── */
function Lightbox({
  item,
  total,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  total: number;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(8,8,6,0.92)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Image panel */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(680px, 90vw)",
          height: "min(520px, 75vh)",
          borderRadius: "16px",
          overflow: "hidden",
          background: item.gradient,
          border: "1px solid rgba(var(--accent-rgb),0.35)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(var(--accent-rgb),0.12)",
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

        {/* Info overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "2rem",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(8,8,6,0.88) 100%)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.58rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
              opacity: 0.8,
            }}
          >
            {item.category}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 700,
              color: "#FDFAF4",
              letterSpacing: "0.04em",
              marginTop: "0.25rem",
            }}
          >
            {item.label}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              fontStyle: "italic",
              color: "rgba(var(--accent-rgb),0.8)",
              marginTop: "0.2rem",
            }}
          >
            {item.sublabel}
          </p>
        </div>

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            fontFamily: "var(--font-cinzel)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(253,250,244,0.5)",
          }}
        >
          {index + 1} / {total}
        </div>
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(var(--accent-rgb),0.1)",
          border: "1px solid rgba(var(--accent-rgb),0.3)",
          color: "var(--accent)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          zIndex: 201,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(var(--accent-rgb),0.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(var(--accent-rgb),0.1)";
        }}
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "fixed",
          left: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(var(--accent-rgb),0.1)",
          border: "1px solid rgba(var(--accent-rgb),0.3)",
          color: "var(--accent)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          zIndex: 201,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(var(--accent-rgb),0.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(var(--accent-rgb),0.1)";
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "fixed",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(var(--accent-rgb),0.1)",
          border: "1px solid rgba(var(--accent-rgb),0.3)",
          color: "var(--accent)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          zIndex: 201,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(var(--accent-rgb),0.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(var(--accent-rgb),0.1)";
        }}
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}