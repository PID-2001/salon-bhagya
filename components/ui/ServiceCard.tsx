"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import GoldButton from "./GoldButton";

export interface ServiceCardData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceNote?: string;
  duration: string;
  popular?: boolean;
  icon: React.ReactNode;
}

interface ServiceCardProps {
  service: ServiceCardData;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full"
    >
      {/* Popular badge — outside card, top-right */}
      {service.popular && (
        <div
          className="absolute -top-3 right-4 z-20 px-3 py-[3px] rounded-full text-[10px] font-semibold tracking-widest uppercase"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
            fontFamily: "var(--font-cinzel)",
            boxShadow: "0 2px 12px rgba(var(--accent-rgb), 0.5)",
          }}
        >
          Popular
        </div>
      )}

      {/* Card body */}
      <div
        className="relative flex flex-col h-full rounded-2xl overflow-hidden"
        style={{
          background: hovered
            ? "rgba(var(--accent-rgb), 0.05)"
            : "var(--glass-bg)",
          border: `1px solid ${hovered ? "rgba(var(--accent-rgb), 0.35)" : "var(--glass-border)"}`,
          boxShadow: hovered
            ? "0 16px 48px rgba(var(--accent-rgb), 0.12), 0 4px 16px rgba(0,0,0,0.3)"
            : "0 2px 12px rgba(0,0,0,0.2)",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {/* Top shimmer line on hover */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Subtle top-right glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "120px",
            background: `radial-gradient(circle at top right, rgba(var(--accent-rgb), 0.08), transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />

        <div className="flex flex-col flex-1 p-6">
          {/* Top row: icon + name */}
          <div className="flex items-start gap-4 mb-4">
            {/* Icon box */}
            <div
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: hovered
                  ? "rgba(var(--accent-rgb), 0.18)"
                  : "rgba(var(--accent-rgb), 0.09)",
                border: `1px solid rgba(var(--accent-rgb), ${hovered ? 0.4 : 0.18})`,
                color: "var(--accent)",
                transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
                transition: "all 0.35s ease",
              }}
            >
              {service.icon}
            </div>

            {/* Name + tagline */}
            <div className="flex-1 min-w-0">
              <h3
                className="leading-tight mb-1"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {service.name}
              </h3>
              <p
                className="text-xs tracking-widest uppercase truncate"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  color: "var(--accent)",
                  opacity: 0.8,
                  fontSize: "0.62rem",
                }}
              >
                {service.tagline}
              </p>
            </div>
          </div>

          {/* Description — flex-1 pushes footer down */}
          <p
            className="flex-1 leading-relaxed"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.97rem",
              color: "var(--text-muted)",
              lineHeight: 1.65,
            }}
          >
            {service.description}
          </p>

          {/* Footer */}
          <div
            className="flex items-end justify-between gap-3 mt-5 pt-4"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            {/* Price + duration */}
            <div>
              {service.priceNote && (
                <p
                  className="uppercase tracking-wider mb-0.5"
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "0.6rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {service.priceNote}
                </p>
              )}
              <p
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: hovered ? "var(--accent)" : "var(--text-primary)",
                  transition: "color 0.3s ease",
                  lineHeight: 1,
                }}
              >
                {service.price}
              </p>
              <div
                className="flex items-center gap-1 mt-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                <Clock size={10} />
                <span
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {service.duration}
                </span>
              </div>
            </div>

            {/* Book CTA */}
            <GoldButton
              variant={hovered ? "filled" : "ghost"}
              size="sm"
              icon={<ChevronRight size={12} />}
            >
              Book
            </GoldButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}