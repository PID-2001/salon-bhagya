"use client";

// app/(auth)/register/page.tsx
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone, Sparkles, CheckCircle2 } from "lucide-react";
import { registerWithEmail, loginWithGoogle } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

const GoogleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

/* ── Password strength ────────────────────────────────────────────────────── */
function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;
  const map = [
    { label: "",        color: "transparent" },
    { label: "Weak",    color: "#ef4444" },
    { label: "Fair",    color: "#f97316" },
    { label: "Good",    color: "#eab308" },
    { label: "Strong",  color: "#22c55e" },
  ];
  return { score, ...map[score] };
}

export default function RegisterPage() {
  const router   = useRouter();
  const { user } = useAuth();

  const [name,       setName]       = useState("");
  const [phone,      setPhone]      = useState("");
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [confirm,    setConfirm]    = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [showConf,   setShowConf]   = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [success,    setSuccess]    = useState(false);

  if (user) { router.replace("/"); return null; }

  const strength = getStrength(password);

  function parseError(err: unknown): string {
    const code = (err as { code?: string }).code ?? "";
    const map: Record<string, string> = {
      "auth/email-already-in-use": "An account with this email already exists.",
      "auth/weak-password":        "Password must be at least 6 characters.",
      "auth/invalid-email":        "Please enter a valid email address.",
    };
    return map[code] ?? "Something went wrong. Please try again.";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await registerWithEmail(email, password, name);
      setSuccess(true);
      setTimeout(() => router.replace("/"), 1800);
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setGoogleLoad(true);
    try {
      await loginWithGoogle();
      router.replace("/");
    } catch (err) {
      setError(parseError(err));
    } finally {
      setGoogleLoad(false);
    }
  }

  const inputBase: React.CSSProperties = {
    width: "100%", padding: "11px 14px 11px 42px",
    background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "4px", color: "var(--text-primary)",
    fontFamily: "var(--font-cormorant)", fontSize: "0.95rem",
    outline: "none", transition: "all 0.25s ease",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
  };

  if (success) return (
    <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
      <div style={{ textAlign: "center" }}>
        <CheckCircle2 size={56} color="#C9A84C" style={{ margin: "0 auto 1rem" }} />
        <h2 style={{ fontFamily: "var(--font-cinzel)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>Welcome to THE ONE!</h2>
        <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)", fontStyle: "italic" }}>Redirecting you now…</p>
      </div>
    </main>
  );

  return (
    <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", padding: "2rem 1rem", paddingTop: "6rem" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

      <div style={{ width: "100%", maxWidth: "480px", position: "relative", zIndex: 10 }}>
        <div style={{ background: "linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "clamp(1.75rem, 5vw, 2.75rem)", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 14px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "100px", marginBottom: "1rem" }}>
              <Sparkles size={11} color="#C9A84C" />
              <span style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)" }}>Join THE ONE</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>Create Account</h1>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--text-muted)" }}>Begin your luxury experience</p>
          </div>

          {/* Google */}
          <button onClick={handleGoogle} disabled={googleLoad || loading}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "10px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", cursor: "pointer", marginBottom: "1.25rem", color: "var(--text-secondary)", fontFamily: "var(--font-cinzel)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", transition: "all 0.25s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.5)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.2)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
          >
            {googleLoad ? <Loader2 size={16} /> : <GoogleIcon />}
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.15)" }} />
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.8rem", color: "var(--text-muted)" }}>or fill in your details</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.15)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>

            {/* Name + Phone row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
              <div style={{ position: "relative" }}>
                <User size={14} color="rgba(201,168,76,0.5)" style={iconStyle} />
                <input type="text" value={name} required placeholder="Full name" onChange={e => setName(e.target.value)} style={inputBase}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                />
              </div>
              <div style={{ position: "relative" }}>
                <Phone size={14} color="rgba(201,168,76,0.5)" style={iconStyle} />
                <input type="tel" value={phone} placeholder="+94 77…" onChange={e => setPhone(e.target.value)} style={inputBase}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ position: "relative" }}>
              <Mail size={14} color="rgba(201,168,76,0.5)" style={iconStyle} />
              <input type="email" value={email} required placeholder="your@email.com" onChange={e => setEmail(e.target.value)} style={inputBase}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ position: "relative" }}>
                <Lock size={14} color="rgba(201,168,76,0.5)" style={iconStyle} />
                <input type={showPass ? "text" : "password"} value={password} required placeholder="Password (min 8 chars)" onChange={e => setPassword(e.target.value)} style={{ ...inputBase, paddingRight: "44px" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Strength bar */}
              {password && (
                <div style={{ marginTop: "6px", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ flex: 1, height: "3px", borderRadius: "2px", background: i <= strength.score ? strength.color : "rgba(201,168,76,0.15)", transition: "background 0.3s ease" }} />
                  ))}
                  <span style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.55rem", letterSpacing: "0.1em", color: strength.color, minWidth: "38px", textAlign: "right" }}>{strength.label}</span>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div style={{ position: "relative" }}>
              <Lock size={14} color="rgba(201,168,76,0.5)" style={iconStyle} />
              <input type={showConf ? "text" : "password"} value={confirm} required placeholder="Confirm password" onChange={e => setConfirm(e.target.value)}
                style={{ ...inputBase, paddingRight: "44px", borderColor: confirm && confirm !== password ? "rgba(239,68,68,0.5)" : undefined }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
                onBlur={e  => (e.currentTarget.style.borderColor = confirm && confirm !== password ? "rgba(239,68,68,0.5)" : "rgba(201,168,76,0.2)")}
              />
              <button type="button" onClick={() => setShowConf(v => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "4px", fontFamily: "var(--font-cormorant)", fontSize: "0.88rem", color: "#f87171" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading || googleLoad} className="btn-gold" style={{ width: "100%", marginTop: "0.25rem", opacity: loading ? 0.7 : 1 }}>
              {loading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Creating account…</> : "Create Account"}
            </button>

            <p style={{ textAlign: "center", fontFamily: "var(--font-cormorant)", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              By registering you agree to our{" "}
              <Link href="/terms" style={{ color: "var(--accent)" }}>Terms</Link> and{" "}
              <Link href="/privacy" style={{ color: "var(--accent)" }}>Privacy Policy</Link>.
            </p>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.25rem", fontFamily: "var(--font-cormorant)", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}