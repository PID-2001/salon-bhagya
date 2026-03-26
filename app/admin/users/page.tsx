"use client";

import { useEffect, useState } from "react";
import { getAllUsers, setUserRole } from "@/lib/admin";
import type { UserProfile } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users,    setUsers]   = useState<UserProfile[]>([]);
  const [loading,  setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  async function handleRoleToggle(uid: string, currentRole: "user" | "admin") {
    if (uid === currentUser?.uid) return;
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!confirm(`Change this user's role to "${newRole}"?`)) return;
    setUpdating(uid);
    await setUserRole(uid, newRole);
    setUsers((prev) =>
      prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
    );
    setUpdating(null);
  }

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <span className="section-label">Admin</span>
        <h1 style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--text-primary)", marginTop: "0.4rem" }}>
          Users
        </h1>
      </div>

      {loading ? (
        <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)", fontSize: "1.1rem" }}>Loading…</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {users.map((u) => (
            <div
              key={u.uid}
              className="glass-card"
              style={{
                borderRadius: "10px",
                padding: "1.25rem 1.5rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto auto",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {/* Name */}
              <div>
                <p style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.8rem", color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                  {u.displayName ?? "—"}
                </p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                  {u.email}
                </p>
              </div>

              {/* Phone */}
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "var(--text-muted)", margin: 0 }}>
                {u.phone ?? "—"}
              </p>

              {/* Role badge */}
              <span style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.25rem 0.7rem",
                borderRadius: "999px",
                color:      u.role === "admin" ? "#C9A84C"                 : "rgba(255,255,255,0.45)",
                background: u.role === "admin" ? "rgba(201,168,76,0.12)"   : "rgba(255,255,255,0.05)",
                border:     u.role === "admin" ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(255,255,255,0.1)",
              }}>
                {u.role}
              </span>

              {/* Toggle button */}
              <button
                onClick={() => handleRoleToggle(u.uid, u.role)}
                disabled={updating === u.uid || u.uid === currentUser?.uid}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "6px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.4rem 0.8rem",
                  cursor: (updating === u.uid || u.uid === currentUser?.uid) ? "not-allowed" : "pointer",
                  opacity: u.uid === currentUser?.uid ? 0.3 : updating === u.uid ? 0.5 : 1,
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {updating === u.uid ? "Saving…" : u.role === "admin" ? "Make User" : "Make Admin"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}