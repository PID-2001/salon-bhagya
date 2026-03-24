"use client";

// app/(auth)/forgot-password/page.tsx
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { resetPassword } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/user-not-found" || code === "auth/invalid-email") {
        // Don't reveal if email exists — just show success to prevent enumeration
        setSent(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg-primary)", padding: "2rem 1rem", paddingTop: "6rem",
    }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 10 }}>
        <div style={{ background: "linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "clamp(1.75rem, 5vw, 2.75rem)", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>

          {sent ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ width: "64px", height: "64px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <CheckCircle2 size={28} color="#C9A84C" />
              </div>
              <h2 style={{ fontFamily: "var(--font-cinzel)", fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>Check Your Inbox</h2>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
                If an account exists for <strong style={{ color: "var(--text-secondary)" }}>{email}</strong>, we've sent a password reset link.
              </p>
              <Link href="/login" className="btn-gold" style={{ display: "inline-flex" }}>
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-cinzel)", fontSize: "0.62rem", letterSpacing: "0.12em", color: "var(--text-muted)", textDecoration: "none", marginBottom: "1.5rem", transition: "color 0.2s ease" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
              >
                <ArrowLeft size={12} /> Back to login
              </Link>

              <div style={{ marginBottom: "1.75rem" }}>
                <h1 style={{ fontFamily: "var(--font-cinzel)", fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Reset Password</h1>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ position: "relative" }}>
                  <Mail size={14} color="rgba(201,168,76,0.5)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="email" value={email} required placeholder="your@email.com"
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "11px 14px 11px 42px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", color: "var(--text-primary)", fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", outline: "none", transition: "all 0.25s ease" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
                    onBlur={e  => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                  />
                </div>

                {error && (
                  <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "4px", fontFamily: "var(--font-cormorant)", fontSize: "0.88rem", color: "#f87171" }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-gold" style={{ width: "100%", opacity: loading ? 0.7 : 1 }}>
                  {loading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Sending…</> : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}