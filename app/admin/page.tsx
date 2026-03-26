"use client";

import { useEffect, useState } from "react";
import { Calendar, Users, MessageSquare, Clock } from "lucide-react";
import { getAllAppointments } from "@/lib/admin";
import { getAllUsers } from "@/lib/admin";
import { getAllMessages } from "@/lib/admin";
import type { Appointment } from "@/lib/appointments";

interface Stats {
  totalAppointments: number;
  pending: number;
  confirmed: number;
  completed: number;
  totalUsers: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [recent,  setRecent]  = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [appointments, users, messages] = await Promise.all([
        getAllAppointments(),
        getAllUsers(),
        getAllMessages(),
      ]);

      setStats({
        totalAppointments: appointments.length,
        pending:           appointments.filter((a) => a.status === "pending").length,
        confirmed:         appointments.filter((a) => a.status === "confirmed").length,
        completed:         appointments.filter((a) => a.status === "completed").length,
        totalUsers:        users.length,
        unreadMessages:    messages.filter((m) => !m.read).length,
      });
      setRecent(appointments.slice(0, 5));
      setLoading(false);
    }
    load();
  }, []);

  const STAT_CARDS = stats ? [
    { icon: <Calendar size={20} />,     label: "Total Bookings",  value: stats.totalAppointments, sub: `${stats.pending} pending`   },
    { icon: <Clock size={20} />,        label: "Confirmed",       value: stats.confirmed,         sub: `${stats.completed} completed` },
    { icon: <Users size={20} />,        label: "Total Users",     value: stats.totalUsers,        sub: "registered accounts"         },
    { icon: <MessageSquare size={20} />,label: "Unread Messages", value: stats.unreadMessages,    sub: "awaiting reply"              },
  ] : [];

  const STATUS_COLOR: Record<string, string> = {
    pending:   "#C9A84C",
    confirmed: "#6fcf97",
    cancelled: "#ff6b6b",
    completed: "rgba(255,255,255,0.4)",
  };

  return (
    <div>
      {/* Page title */}
      <div style={{ marginBottom: "2rem" }}>
        <span className="section-label">Overview</span>
        <h1 style={{
          fontFamily: "var(--font-cinzel)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          color: "var(--text-primary)",
          marginTop: "0.4rem",
        }}>
          Dashboard <span className="text-gold-gradient">✦</span>
        </h1>
      </div>

      {loading ? (
        <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Loading…
        </p>
      ) : (
        <>
          {/* Stat cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}>
            {STAT_CARDS.map(({ icon, label, value, sub }) => (
              <div
                key={label}
                className="glass-card"
                style={{ borderRadius: "10px", padding: "1.5rem" }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}>
                  <p style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}>{label}</p>
                  <span style={{ color: "var(--accent)", opacity: 0.8 }}>{icon}</span>
                </div>
                <p style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "2.2rem",
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}>{value}</p>
                <p style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  margin: 0,
                }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* Recent appointments */}
          <div className="glass-card" style={{ borderRadius: "10px", padding: "1.75rem" }}>
            <h3 style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.8rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "1.25rem",
            }}>
              Recent Appointments
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {recent.map((a) => (
                <div key={a.id} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr auto",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.85rem 1rem",
                  borderRadius: "6px",
                  background: "rgba(var(--accent-rgb), 0.03)",
                  border: "1px solid var(--border-subtle)",
                }}>
                  <span style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.8rem", color: "var(--text-primary)" }}>
                    {a.userName}
                  </span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                    {a.service}
                  </span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                    {a.date} · {a.time}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: STATUS_COLOR[a.status] ?? "var(--text-muted)",
                    whiteSpace: "nowrap",
                  }}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}