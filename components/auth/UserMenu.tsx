"use client";

// components/auth/UserMenu.tsx
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, Calendar, Settings, ChevronDown } from "lucide-react";
import { logout } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
  const { user, profile, isAdmin, isLoading } = useAuth();
  const router   = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef  = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleLogout() {
    setOpen(false);
    await logout();
    router.push("/");
  }

  if (isLoading) {
    return (
      <div style={{
        width: "34px", height: "34px", borderRadius: "50%",
        background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)",
        animation: "pulse 1.5s ease-in-out infinite",
      }} />
    );
  }

  if (!user) {
    return (
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Link
          href="/login"
          style={{
            fontFamily: "var(--font-cinzel)", fontSize: "0.68rem", fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--text-secondary)", textDecoration: "none",
            padding: "0.4rem 0.9rem",
            border: "1px solid var(--border-subtle)",
            borderRadius: "2px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-subtle)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
          }}
        >
          Sign In
        </Link>
        <Link href="/register" className="btn-gold" style={{ padding: "0.4rem 1rem", fontSize: "0.68rem" }}>
          Register
        </Link>
      </div>
    );
  }

  // Get initials for avatar
  const name     = profile?.displayName ?? user.displayName ?? user.email ?? "U";
  const initials = name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "4px 10px 4px 4px",
          background: open ? "rgba(201,168,76,0.1)" : "rgba(201,168,76,0.05)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: "100px", cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.5)")}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.2)"; }}
      >
        {/* Avatar */}
        <div style={{
          width: "30px", height: "30px", borderRadius: "50%",
          background: "linear-gradient(135deg, #b8860b, #c9a84c)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-cinzel)", fontSize: "0.65rem", fontWeight: 700,
          color: "#080806", flexShrink: 0,
        }}>
          {initials}
        </div>

        <span style={{
          fontFamily: "var(--font-cinzel)", fontSize: "0.65rem", fontWeight: 500,
          letterSpacing: "0.06em", color: "var(--text-secondary)",
          maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {name.split(" ")[0]}
        </span>

        <ChevronDown
          size={12} color="var(--text-muted)"
          style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>

      {/* Dropdown */}
      <div style={{
        position: "absolute", top: "calc(100% + 10px)", right: 0,
        width: "220px",
        background: "var(--bg-secondary)",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: "6px",
        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
        opacity:    open ? 1 : 0,
        transform:  open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
        pointerEvents: open ? "auto" : "none",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
        zIndex: 200,
      }}>
        {/* User info header */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
          <div style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.7rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>
            {profile?.displayName ?? user.displayName ?? "Guest"}
          </div>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {user.email}
          </div>
          {isAdmin && (
            <div style={{
              display: "inline-block", marginTop: "5px",
              padding: "2px 8px", borderRadius: "100px",
              background: "linear-gradient(90deg, #b8860b, #c9a84c)",
              fontFamily: "var(--font-cinzel)", fontSize: "0.5rem",
              fontWeight: 700, letterSpacing: "0.12em", color: "#080806",
            }}>
              ADMIN
            </div>
          )}
        </div>

        {/* Links */}
        <nav style={{ padding: "6px" }}>
          {[
            { href: "/profile",      icon: <User size={13} />,     label: "My Profile" },
            { href: "/appointments", icon: <Calendar size={13} />, label: "My Appointments" },
            ...(isAdmin ? [{ href: "/admin", icon: <Settings size={13} />, label: "Admin Panel" }] : []),
          ].map(item => (
            <Link
              key={item.href} href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 10px", borderRadius: "4px",
                fontFamily: "var(--font-cinzel)", fontSize: "0.65rem",
                fontWeight: 500, letterSpacing: "0.08em",
                color: "var(--text-secondary)", textDecoration: "none",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
              }}
            >
              <span style={{ color: "var(--accent)", opacity: 0.7 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "6px", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 10px", borderRadius: "4px",
              fontFamily: "var(--font-cinzel)", fontSize: "0.65rem",
              fontWeight: 500, letterSpacing: "0.08em",
              color: "#f87171", background: "none", border: "none",
              cursor: "pointer", transition: "background 0.18s ease",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </div>
  );
}