"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { createAppointment, SERVICES, STYLISTS } from "@/lib/appointments";

export default function BookAppointmentPage() {
  return (
    <ProtectedRoute>
      <BookingForm />
    </ProtectedRoute>
  );
}

const TIME_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
];

function BookingForm() {
  const { user, profile } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    userPhone: profile?.phone ?? "",
    service:   "",
    stylist:   "Any Available",
    date:      "",
    time:      "",
    notes:     "",
  });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!form.service)   return setError("Please select a service.");
    if (!form.date)      return setError("Please select a date.");
    if (!form.time)      return setError("Please select a time slot.");
    if (!form.userPhone) return setError("Please enter your phone number.");

    setLoading(true);
    try {
      await createAppointment({
        userId:    user.uid,
        userName:  profile?.displayName ?? user.displayName ?? "Guest",
        userEmail: user.email ?? "",
        userPhone: form.userPhone,
        service:   form.service,
        stylist:   form.stylist,
        date:      form.date,
        time:      form.time,
        notes:     form.notes,
      });
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Success screen ─────────────────────────────────────── */
  if (success) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}>
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-accent)",
          borderRadius: "12px",
          padding: "3rem 2.5rem",
          textAlign: "center",
          maxWidth: "460px",
          width: "100%",
        }}>
          {/* Gold ring checkmark */}
          <div style={{
            width: "70px", height: "70px",
            borderRadius: "50%",
            border: "1px solid var(--accent)",
            background: "rgba(var(--accent-rgb),0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.75rem",
            fontSize: "1.75rem",
            color: "var(--accent)",
          }}>✓</div>

          <p className="section-label" style={{ marginBottom: "0.75rem" }}>
            Request Received
          </p>
          <h2 style={{
            fontFamily: "var(--font-cinzel)",
            color: "var(--text-primary)",
            fontSize: "clamp(1.4rem,3vw,1.9rem)",
            marginBottom: "1rem",
          }}>
            Appointment <span className="text-gold-gradient">Requested</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text-muted)",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            marginBottom: "2rem",
          }}>
            We've received your request and will confirm it shortly via phone or email.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/appointments/my-bookings" className="btn-gold" style={{ textDecoration: "none" }}>
              View My Bookings
            </Link>
            <button
              className="btn-outline"
              onClick={() => setSuccess(false)}
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Booking form ───────────────────────────────────────── */
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      paddingTop: "110px",
      paddingBottom: "5rem",
    }}>
      <div className="container-salon" style={{ maxWidth: "700px" }}>

        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-label">Reserve Your Visit</span>
          <h1 style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "clamp(1.8rem,4vw,2.6rem)",
            color: "var(--text-primary)",
            marginTop: "0.6rem",
            marginBottom: "0.75rem",
          }}>
            Book an <span className="text-gold-gradient">Appointment</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            maxWidth: "480px",
            margin: "0 auto",
          }}>
            Fill in the details below and we'll confirm your session within 24 hours.
          </p>
          <div className="divider-gold" style={{ marginTop: "1.5rem" }} />
        </div>

        {/* Card */}
        <div className="glass-card" style={{ borderRadius: "12px", padding: "clamp(1.5rem,4vw,2.5rem)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>

            {/* Name + Email (read-only) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  value={profile?.displayName ?? user?.displayName ?? ""}
                  readOnly
                  style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  value={user?.email ?? ""}
                  readOnly
                  style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input
                name="userPhone"
                type="tel"
                placeholder="+94 77 XXX XXXX"
                value={form.userPhone}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Service */}
            <div>
              <label style={labelStyle}>Service *</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="" style={selectOptionStyle}>— Select a Service —</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s} style={selectOptionStyle}>{s}</option>
                ))}
              </select>
            </div>

            {/* Stylist */}
            <div>
              <label style={labelStyle}>Preferred Stylist</label>
              <select
                name="stylist"
                value={form.stylist}
                onChange={handleChange}
                style={inputStyle}
              >
                {STYLISTS.map((s) => (
                  <option key={s} value={s} style={selectOptionStyle}>{s}</option>
                ))}
              </select>
            </div>

            {/* Date + Time */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Preferred Date *</label>
                <input
                  name="date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Preferred Time *</label>
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="" style={selectOptionStyle}>— Select —</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t} style={selectOptionStyle}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Additional Notes</label>
              <textarea
                name="notes"
                placeholder="Special requests, allergies, or anything we should know…"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                style={{ ...inputStyle, resize: "vertical", lineHeight: "1.65" }}
              />
            </div>

            {/* Error */}
            {error && (
              <p style={{
                fontFamily: "var(--font-cormorant)",
                color: "#ff6b6b",
                fontSize: "1rem",
                textAlign: "center",
              }}>{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                width: "100%",
                opacity: loading ? 0.65 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Submitting…" : "Request Appointment"}
            </button>

            <p style={{
              textAlign: "center",
              fontFamily: "var(--font-cormorant)",
              color: "var(--text-muted)",
              fontSize: "0.95rem",
            }}>
              Already booked?{" "}
              <Link href="/appointments/my-bookings" style={{ color: "var(--accent)" }}>
                View your appointments
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Shared input styles ────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-cinzel)",
  fontSize: "0.68rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--accent)",
  marginBottom: "0.45rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(var(--accent-rgb), 0.04)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "6px",
  padding: "0.75rem 1rem",
  color: "var(--text-primary)",
  fontFamily: "var(--font-cormorant)",
  fontSize: "1rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
};

const selectOptionStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-secondary)",
  color: "var(--text-primary)",
};