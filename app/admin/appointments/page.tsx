"use client";

import { useEffect, useState } from "react";
import { getAllAppointments, updateAppointmentStatus } from "@/lib/admin";
import type { Appointment, AppointmentStatus } from "@/lib/appointments";

const STATUS_OPTIONS: AppointmentStatus[] = ["pending", "confirmed", "completed", "cancelled"];

const STATUS_COLOR: Record<AppointmentStatus, { color: string; bg: string }> = {
  pending:   { color: "#C9A84C", bg: "rgba(201,168,76,0.10)"  },
  confirmed: { color: "#6fcf97", bg: "rgba(111,207,151,0.10)" },
  completed: { color: "rgba(255,255,255,0.45)", bg: "rgba(255,255,255,0.05)" },
  cancelled: { color: "#ff6b6b", bg: "rgba(255,107,107,0.10)" },
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [updating,     setUpdating]     = useState<string | null>(null);
  const [filter,       setFilter]       = useState<AppointmentStatus | "all">("all");

  useEffect(() => {
    getAllAppointments().then((data) => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  async function handleStatus(id: string, status: AppointmentStatus) {
    setUpdating(id);
    await updateAppointmentStatus(id, status);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    setUpdating(null);
  }

  const filtered = filter === "all"
    ? appointments
    : appointments.filter((a) => a.status === filter);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <span className="section-label">Admin</span>
          <h1 style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--text-primary)", marginTop: "0.4rem" }}>
            Appointments
          </h1>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {(["all", ...STATUS_OPTIONS] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "999px",
                fontFamily: "var(--font-cinzel)",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: `1px solid ${filter === f ? "var(--accent)" : "var(--border-subtle)"}`,
                background: filter === f ? "var(--accent)" : "transparent",
                color: filter === f ? "var(--bg-primary)" : "var(--text-muted)",
                transition: "all 0.2s ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)", fontSize: "1.1rem" }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ borderRadius: "10px", padding: "3rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)", fontSize: "1.1rem" }}>
            No appointments found.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {filtered.map((a) => {
            const s = STATUS_COLOR[a.status];
            return (
              <div
                key={a.id}
                className="glass-card"
                style={{
                  borderRadius: "10px",
                  padding: "1.25rem 1.5rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr auto auto",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* Client */}
                <div>
                  <p style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.8rem", color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                    {a.userName}
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                    {a.userPhone}
                  </p>
                </div>

                {/* Service */}
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0 }}>
                  {a.service}
                </p>

                {/* Date/Time */}
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "var(--text-muted)", margin: 0 }}>
                  {a.date} · {a.time}
                </p>

                {/* Status badge */}
                <span style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.25rem 0.7rem",
                  borderRadius: "999px",
                  color: s.color,
                  background: s.bg,
                  whiteSpace: "nowrap",
                }}>
                  {a.status}
                </span>

                {/* Status selector */}
                <select
                  value={a.status}
                  disabled={updating === a.id}
                  onChange={(e) => handleStatus(a.id!, e.target.value as AppointmentStatus)}
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "6px",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    padding: "0.4rem 0.6rem",
                    cursor: updating === a.id ? "not-allowed" : "pointer",
                    opacity: updating === a.id ? 0.5 : 1,
                  }}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}