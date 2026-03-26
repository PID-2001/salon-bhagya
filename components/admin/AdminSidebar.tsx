"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Users, MessageSquare, LogOut } from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const NAV = [
  { href: "/admin",              icon: <LayoutDashboard size={16} />, label: "Dashboard"    },
  { href: "/admin/appointments", icon: <Calendar        size={16} />, label: "Appointments" },
  { href: "/admin/users",        icon: <Users           size={16} />, label: "Users"        },
  { href: "/admin/messages",     icon: <MessageSquare   size={16} />, label: "Messages"     },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <aside style={{
      width: "240px",
      minHeight: "100vh",
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 50,
    }}>
      <div style={{ padding: "2rem 1.5rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
        <p className="section-label" style={{ marginBottom: "0.25rem" }}>Admin Panel</p>
        <h2 style={{ fontFamily: "var(--font-cinzel)", fontSize: "1rem", color: "var(--text-primary)", lineHeight: 1.3 }}>
          THE ONE <span style={{ color: "var(--accent)" }}>✦</span> Salon
        </h2>
      </div>

      <nav style={{ flex: 1, padding: "1.25rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {NAV.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem",
              borderRadius: "8px", fontFamily: "var(--font-cinzel)", fontSize: "0.7rem", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
              color: active ? "var(--bg-primary)" : "var(--text-muted)",
              background: active ? "var(--accent)" : "transparent",
              border: `1px solid ${active ? "var(--accent)" : "transparent"}`,
              transition: "all 0.2s ease",
            }}>
              <span style={{ opacity: active ? 1 : 0.7 }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: "0.75rem", width: "100%",
          padding: "0.7rem 1rem", borderRadius: "8px", background: "transparent",
          border: "1px solid transparent", color: "var(--text-muted)",
          fontFamily: "var(--font-cinzel)", fontSize: "0.7rem", fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          transition: "all 0.2s ease",
        }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}