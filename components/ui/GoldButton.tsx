"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode, CSSProperties, MouseEvent } from "react";
import { useAuth } from "@/context/AuthContext";

interface GoldButtonProps {
  children: ReactNode;
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  style?: CSSProperties;
  /** Gate the action behind auth; redirect to login if not signed in */
  requiresAuth?: boolean;
  /** Override login destination when requiresAuth is enabled */
  loginPath?: string;
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
  style,
  requiresAuth = false,
  loginPath = "/login",
}: GoldButtonProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const baseClass = variant === "filled" ? "btn-gold" : "btn-outline";

  const sizeOverride: CSSProperties =
    size === "sm"
      ? { padding: "0.45rem 1.1rem", fontSize: "0.65rem" }
      : size === "lg"
      ? { padding: "0.9rem 2.5rem", fontSize: "0.72rem" }
      : {};

  const isAuthPending = requiresAuth && isLoading;
  const isDisabled = disabled || isAuthPending;

  const guardAndHandle = <T extends HTMLButtonElement | HTMLAnchorElement>(
    event: MouseEvent<T>,
  ) => {
    // Block navigation while disabled or while auth is still resolving.
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    if (requiresAuth && !user) {
      event.preventDefault();
      router.push(loginPath);
      return;
    }

    onClick?.(event);
  };

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
        onClick={guardAndHandle}
        aria-disabled={isDisabled ? true : undefined}
        style={{ opacity: isDisabled ? 0.5 : 1, ...sizeOverride, ...style }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={guardAndHandle}
      disabled={isDisabled}
      className={`${baseClass} ${className}`}
      style={{ opacity: isDisabled ? 0.5 : 1, ...sizeOverride, ...style }}
    >
      {content}
    </button>
  );
}