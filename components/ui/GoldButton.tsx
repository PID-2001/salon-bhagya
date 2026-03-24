"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface GoldButtonProps {
  children: ReactNode;
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
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
  className = "",
  disabled = false,
  type = "button",
}: GoldButtonProps) {
  const baseClass = variant === "filled" ? "btn-gold" : "btn-outline";

  const sizeOverride: React.CSSProperties =
    size === "sm"
      ? { padding: "0.45rem 1.1rem", fontSize: "0.65rem" }
      : size === "lg"
      ? { padding: "0.9rem 2.5rem", fontSize: "0.72rem" }
      : {};

  const content = (
    <>
      {children}
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClass} ${className}`}
        style={{ opacity: disabled ? 0.5 : 1, ...sizeOverride }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className}`}
      style={{ opacity: disabled ? 0.5 : 1, ...sizeOverride }}
    >
      {content}
    </button>
  );
}