export default function HomePage() {
  return (
    <main className="section-pad container-salon" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>

        <span className="section-label">Welcome to</span>

        <h1 className="text-gold-gradient" style={{ lineHeight: 1 }}>
          THE ONE
        </h1>

        <p style={{ fontFamily: "Cinzel, serif", letterSpacing: "0.35em", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
          Salon Bhagya
        </p>

        <div className="divider-gold" />

        <p style={{ maxWidth: "420px", color: "var(--text-muted)", fontSize: "1rem" }}>
          Where luxury meets artistry. Step 1 complete — foundation is live.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
          <button className="btn-gold">Book Appointment</button>
          <button className="btn-outline">Explore Services</button>
        </div>

      </div>
    </main>
  );
}