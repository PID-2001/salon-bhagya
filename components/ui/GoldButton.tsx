"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GoldButtonProps {
  children: ReactNode;
  variant?: "filled" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function GoldButton({
  children,
  variant = "filled",
  size = "md",
  href,
  onClick,
  icon,
  iconPosition = "right",
  className = "",
  disabled = false,
  type = "button",
}: GoldButtonProps) {
  const sizes = {
    sm: { padding: "0.45rem 1.1rem", fontSize: "0.65rem", gap: "0.35rem" },
    md: { padding: "0.65rem 1.6rem", fontSize: "0.72rem", gap: "0.45rem" },
    lg: { padding: "0.85rem 2.2rem", fontSize: "0.8rem", gap: "0.5rem" },
  };

  const variants = {
    filled: {
      background: "var(--accent)",
      color: "var(--bg-primary)",
      border: "1px solid var(--accent)",
      hoverBg: "var(--accent-light)",
      hoverShadow: "var(--shadow-gold-md)",
    },
    outline: {
      background: "transparent",
      color: "var(--accent)",
      border: "1px solid rgba(var(--accent-rgb), 0.5)",
      hoverBg: "rgba(var(--accent-rgb), 0.08)",
      hoverShadow: "var(--shadow-gold-sm)",
    },
    ghost: {
      background: "rgba(var(--accent-rgb), 0.08)",
      color: "var(--accent)",
      border: "1px solid rgba(var(--accent-rgb), 0.2)",
      hoverBg: "rgba(var(--accent-rgb), 0.14)",
      hoverShadow: "none",
    },
  };

  const v = variants[variant];
  const s = sizes[size];

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: s.gap,
    padding: s.padding,
    fontFamily: "var(--font-cinzel)",
    fontSize: s.fontSize,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    borderRadius: "0.5rem",
    border: v.border,
    background: v.background,
    color: v.color,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.3s ease",
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
    position: "relative" as const,
    overflow: "hidden",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && <span style={{ display: "flex" }}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span style={{ display: "flex" }}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        style={baseStyle}
        className={className}
        whileHover={
          !disabled
            ? {
                background: v.hoverBg,
                boxShadow: v.hoverShadow,
                y: -1,
              }
            : {}
        }
        whileTap={!disabled ? { scale: 0.97 } : {}}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      className={className}
      whileHover={
        !disabled
          ? {
              background: v.hoverBg,
              boxShadow: v.hoverShadow,
              y: -1,
            }
          : {}
      }
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {content}
    </motion.button>
  );
}