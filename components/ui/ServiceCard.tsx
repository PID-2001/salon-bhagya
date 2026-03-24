"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex"
    >
      {/* Popular badge */}
      {service.popular && (
        <div
          className="absolute -top-3 left-[92px] z-20 px-3 py-[3px] rounded-full text-[10px] font-semibold tracking-widest uppercase"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
            fontFamily: "var(--font-cinzel)",
            boxShadow: "0 2px 16px rgba(var(--accent-rgb), 0.5)",
          }}
        >
          Popular
        </div>
      )}

      {/* Card shell */}
      <div
        className="relative flex w-full rounded-2xl overflow-hidden"
        style={{
          background: hovered ? "rgba(var(--accent-rgb), 0.06)" : "var(--glass-bg)",
          border: `1px solid ${hovered ? "rgba(var(--accent-rgb), 0.38)" : "var(--glass-border)"}`,
          boxShadow: hovered
            ? "0 16px 48px rgba(var(--accent-rgb), 0.12), 0 4px 24px rgba(0,0,0,0.3)"
            : "0 2px 12px rgba(0,0,0,0.2)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          className="flex flex-col items-center gap-4 flex-shrink-0"
          style={{
            width: "72px",
            padding: "1.5rem 0",
            background: hovered
              ? "rgba(var(--accent-rgb), 0.1)"
              : "rgba(var(--accent-rgb), 0.05)",
            borderRight: `1px solid ${hovered
              ? "rgba(var(--accent-rgb), 0.22)"
              : "rgba(var(--accent-rgb), 0.1)"}`,
            transition: "all 0.38s ease",
          }}
        >
          {/* Icon */}
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: "42px",
              height: "42px",
              background: hovered
                ? "rgba(var(--accent-rgb), 0.2)"
                : "rgba(var(--accent-rgb), 0.1)",
              border: `1px solid rgba(var(--accent-rgb), ${hovered ? 0.45 : 0.22})`,
              color: "var(--accent)",
              transform: hovered ? "scale(1.08) rotate(-5deg)" : "scale(1) rotate(0deg)",
              transition: "all 0.38s ease",
              boxShadow: hovered ? "0 4px 14px rgba(var(--accent-rgb), 0.28)" : "none",
            }}
          >
            {service.icon}
          </div>

          {/* Vertical duration */}
          <span
            className="select-none"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.48rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: `rgba(var(--accent-rgb), ${hovered ? 0.65 : 0.3})`,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              transition: "color 0.38s ease",
              whiteSpace: "nowrap",
            }}
          >
            {service.duration}
          </span>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div
          className="flex flex-col"
          style={{ padding: "1.25rem 1.5rem", flex: 1, minWidth: 0 }}
        >
          {/* Meta row: tagline + duration */}
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: "0.5rem" }}
          >
            <span
              style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: "0.54rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                opacity: 0.8,
              }}
            >
              {service.tagline}
            </span>
            <span
              className="flex items-center gap-1 flex-shrink-0"
              style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: "0.56rem",
                letterSpacing: "0.06em",
                color: "var(--text-muted)",
                marginLeft: "0.75rem",
              }}
            >
              <Clock size={10} style={{ color: "var(--accent)", opacity: 0.55, flexShrink: 0 }} />
              {service.duration}
            </span>
          </div>

          {/* Name */}
          <h3
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "0.025em",
              lineHeight: 1.25,
              marginBottom: "0.75rem",
            }}
          >
            {service.name}
          </h3>

          {/* Rule */}
          <div
            style={{
              height: "1px",
              background: `linear-gradient(90deg, rgba(var(--accent-rgb), ${hovered ? 0.28 : 0.1}), transparent)`,
              transition: "background 0.38s ease",
              marginBottom: "0.75rem",
              flexShrink: 0,
            }}
          />

          {/* Description — NOT flex-1, just natural height */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.96rem",
              color: "var(--text-muted)",
              lineHeight: 1.65,
              marginBottom: "1rem",
            }}
          >
            {service.description}
          </p>

          {/* Footer */}
          <div
            className="flex items-center justify-between gap-3"
            style={{
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <div>
              {service.priceNote && (
                <p
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    opacity: 0.65,
                    marginBottom: "2px",
                  }}
                >
                  {service.priceNote}
                </p>
              )}
              <p
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                  color: hovered ? "var(--accent)" : "var(--text-primary)",
                  transition: "color 0.3s ease",
                }}
              >
                {service.price}
              </p>
            </div>

            <GoldButton
              variant={hovered ? "filled" : "outline"}
              size="sm"
              icon={<ArrowRight size={12} />}
            >
              Book
            </GoldButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}