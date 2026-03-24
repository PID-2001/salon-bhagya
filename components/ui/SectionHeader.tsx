"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  animate?: boolean;
  isInView?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  animate = true,
  isInView = true,
}: SectionHeaderProps) {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 30 } : false}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col ${alignClass} mb-14`}
    >
      <span className="section-label">{label}</span>

      <h2
        className="mt-4 mb-5"
        style={{
          fontFamily: "var(--font-cinzel)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: "580px",
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        className={`mt-8 ${align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""}`}
        style={{
          height: "1px",
          width: "200px",
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />
    </motion.div>
  );
}