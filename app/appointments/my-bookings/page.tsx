"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
  getUserAppointments,
  cancelAppointment,
  type Appointment,
  type AppointmentStatus,
} from "@/lib/appointments";

export default function MyBookingsPage() {
  return (
    <ProtectedRoute>
      <BookingsList />
    </ProtectedRoute>
  );
}

const STATUS: Record<AppointmentStatus, { label: string; color: string; bg: string; border: string }> = {
  pending:   { label: "Pending",   color: "#C9A84C", bg: "rgba(201,168,76,0.10)",  border: "rgba(201,168,76,0.30)"  },
  confirmed: { label: "Confirmed", color: "#6fcf97", bg: "rgba(111,207,151,0.10)", border: "rgba(111,207,151,0.30)" },
  cancelled: { label: "Cancelled", color: "#ff6b6b", bg: "rgba(255,107,107,0.10)", border: "rgba(255,107,107,0.30)" },
  completed: { label: "Completed", color: "rgba(255,255,255,0.45)", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.15)" },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

function BookingsList() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [cancelling,   setCancelling]   = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserAppointments(user.uid).then((data) => {
      setAppointments(data);
      setLoading(false);
    });
  }, [user]);

  async function handleCancel(id: string) {
    if (!confirm("Cancel this appointment?")) return;
    setCancelling(id);
    await cancelAppointment(id);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
    setCancelling(null);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      paddingTop: "110px",
      paddingBottom: "5rem",
    }}>
      <div className="container-salon">

        {/* Header row */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}>
          <div>
            <span className="section-label">My Account</span>
            <h1 style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
              color: "var(--text-primary)",
              marginTop: "0.4rem",
            }}>
              My <span className="text-gold-gradient">Bookings</span>
            </h1>
          </div>
          <Link href="/appointments/book" className="btn-gold" style={{ textDecoration: "none" }}>
            + New Appointment
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{
            textAlign: "center",
            padding: "5rem 2rem",
            fontFamily: "var(--font-cormorant)",
            color: "var(--text-muted)",
            fontSize: "1.15rem",
          }}>
            Loading your appointments…
          </div>
        )}

        {/* Empty state */}
        {!loading && appointments.length === 0 && (
          <div className="glass-card" style={{
            borderRadius: "12px",
            textAlign: "center",
            padding: "4rem 2rem",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📅</div>
            <h3 style={{
              fontFamily: "var(--font-cinzel)",
              color: "var(--accent)",
              fontSize: "1.1rem",
              marginBottom: "0.6rem",
            }}>No Appointments Yet</h3>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text-muted)",
              fontSize: "1.05rem",
              marginBottom: "1.75rem",
            }}>
              You haven't made any bookings yet. Let's change that.
            </p>
            <Link href="/appointments/book" className="btn-gold" style={{ textDecoration: "none" }}>
              Book Your First Appointment
            </Link>
          </div>
        )}

        {/* Appointments list */}
        {!loading && appointments.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {appointments.map((appt) => {
              const s = STATUS[appt.status] ?? STATUS.pending;
              const canCancel = appt.status === "pending" || appt.status === "confirmed";

              return (
                <div
                  key={appt.id}
                  className="glass-card"
                  style={{
                    borderRadius: "10px",
                    padding: "1.6rem 1.75rem",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "1.25rem",
                    alignItems: "start",
                  }}
                >
                  {/* Left */}
                  <div>
                    {/* Service + badge */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "0.65rem",
                      marginBottom: "0.85rem",
                    }}>
                      <h3 style={{
                        fontFamily: "var(--font-cinzel)",
                        fontSize: "0.95rem",
                        color: "var(--text-primary)",
                        margin: 0,
                      }}>
                        {appt.service}
                      </h3>
                      <span style={{
                        fontFamily: "var(--font-cinzel)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.22rem 0.7rem",
                        borderRadius: "999px",
                        color: s.color,
                        background: s.bg,
                        border: `1px solid ${s.border}`,
                      }}>
                        {s.label}
                      </span>
                    </div>

                    {/* Meta grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                      gap: "0.4rem 1.5rem",
                    }}>
                      {[
                        { icon: "📅", val: formatDate(appt.date) },
                        { icon: "🕐", val: appt.time },
                        { icon: "✂️", val: appt.stylist },
                        { icon: "📞", val: appt.userPhone },
                      ].map(({ icon, val }) => (
                        <span key={val} style={{
                          fontFamily: "var(--font-cormorant)",
                          fontSize: "0.95rem",
                          color: "var(--text-muted)",
                        }}>
                          {icon} {val}
                        </span>
                      ))}
                    </div>

                    {appt.notes && (
                      <p style={{
                        marginTop: "0.75rem",
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "0.9rem",
                        color: "var(--text-muted)",
                        fontStyle: "italic",
                        opacity: 0.7,
                      }}>
                        "{appt.notes}"
                      </p>
                    )}
                  </div>

                  {/* Right — cancel button */}
                  {canCancel && (
                    <button
                      onClick={() => handleCancel(appt.id!)}
                      disabled={cancelling === appt.id}
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255,107,107,0.25)",
                        borderRadius: "6px",
                        color: "#ff6b6b",
                        fontFamily: "var(--font-cinzel)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.45rem 0.9rem",
                        cursor: cancelling === appt.id ? "not-allowed" : "pointer",
                        whiteSpace: "nowrap",
                        opacity: cancelling === appt.id ? 0.5 : 1,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {cancelling === appt.id ? "Cancelling…" : "Cancel"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}