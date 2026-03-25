"use client";

import Link from "next/link";

export default function BookingSection() {
  return (
    <section id="booking" style={{
      background: "var(--bg-secondary)",
      padding: "clamp(4rem,8vw,7rem) 0",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Decorative ring */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "520px", height: "520px",
        borderRadius: "50%",
        border: "1px solid var(--border-subtle)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "320px", height: "320px",
        borderRadius: "50%",
        border: "1px solid var(--border-subtle)",
        pointerEvents: "none",
      }} />

      <div className="container-salon" style={{ textAlign: "center", position: "relative" }}>

        <span className="section-label">Reserve Your Visit</span>

        <h2 style={{
          fontFamily: "var(--font-cinzel)",
          fontSize: "clamp(1.8rem,4vw,3rem)",
          color: "var(--text-primary)",
          marginTop: "0.6rem",
          marginBottom: "1rem",
        }}>
          Reserve Your{" "}
          <span className="text-gold-gradient">Luxury Experience</span>
        </h2>

        <div className="divider-gold" />

        <p style={{
          fontFamily: "var(--font-cormorant)",
          color: "var(--text-muted)",
          fontSize: "1.15rem",
          maxWidth: "500px",
          margin: "1.25rem auto 2.5rem",
          lineHeight: "1.75",
        }}>
          Every appointment at THE ONE is a curated experience. Book your session
          with our expert stylists and transform your look.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/appointments/book" className="btn-gold" style={{ textDecoration: "none" }}>
            Book an Appointment
          </Link>
          <Link href="/appointments/my-bookings" className="btn-outline" style={{ textDecoration: "none" }}>
            My Bookings
          </Link>
        </div>

        {/* Trust strip */}
        <div style={{
          display: "flex",
          gap: "clamp(1.5rem,4vw,3rem)",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border-subtle)",
        }}>
          {["Instant Confirmation", "Free Cancellation", "Expert Stylists"].map((text) => (
            <div key={text} style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}>
              <span style={{ color: "var(--accent)", fontSize: "0.6rem" }}>✦</span>
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}