"use client";

// app/(auth)/login/page.tsx
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock, Sparkles } from "lucide-react";
import { loginWithEmail, loginWithGoogle } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

/* ── Google SVG glyph ───────────────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function LoginPage() {
  const router            = useRouter();
  const { user, isLoading } = useAuth();

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [loading,     setLoading]     = useState(false);
  const [googleLoad,  setGoogleLoad]  = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [router, user]);

  if (isLoading || user) {
    return (
      <main
        style={{
          minHeight:       "100dvh",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          background:      "var(--bg-primary)",
          padding:         "2rem 1rem",
          paddingTop:      "6rem",
        }}
      >
        <Loader2 size={32} className="animate-spin" color="#C9A84C" />
      </main>
    );
  }

  /* ── Helpers ── */
  function parseError(err: unknown): string {
    const code = (err as { code?: string }).code ?? "";
    const map: Record<string, string> = {
      "auth/user-not-found":     "No account found with this email.",
      "auth/wrong-password":     "Incorrect password. Please try again.",
      "auth/invalid-credential": "Invalid email or password.",
      "auth/too-many-requests":  "Too many attempts. Please try again later.",
      "auth/invalid-email":      "Please enter a valid email address.",
    };
    return map[code] ?? "Something went wrong. Please try again.";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      router.replace("/");
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

  /* ── Shared input style ── */
  const inputBase: React.CSSProperties = {
    width:           "100%",
    padding:         "11px 14px 11px 42px",
    background:      "rgba(201,168,76,0.04)",
    border:          "1px solid rgba(201,168,76,0.2)",
    borderRadius:    "4px",
    color:           "var(--text-primary)",
    fontFamily:      "var(--font-cormorant)",
    fontSize:        "0.95rem",
    outline:         "none",
    transition:      "all 0.25s ease",
  };

  return (
    <main
      style={{
        minHeight:       "100dvh",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        background:      "var(--bg-primary)",
        padding:         "2rem 1rem",
        paddingTop:      "6rem",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)",
      }} />

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 10 }}>

        {/* ── Card ── */}
        <div style={{
          background:   "linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary))",
          border:       "1px solid rgba(201,168,76,0.2)",
          borderRadius: "8px",
          padding:      "clamp(1.75rem, 5vw, 2.75rem)",
          boxShadow:    "0 24px 80px rgba(0,0,0,0.5)",
        }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 14px",
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "100px", marginBottom: "1.25rem",
            }}>
              <Sparkles size={11} color="#C9A84C" />
              <span style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)" }}>
                Welcome Back
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-cinzel)", fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem",
            }}>Sign In</h1>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--text-muted)" }}>
              Access your Salon Bhagya account
            </p>
          </div>

          {/* ── Google button ── */}
          <button
            onClick={handleGoogle}
            disabled={googleLoad || loading}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              gap: "10px", padding: "10px 16px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "4px", cursor: "pointer", marginBottom: "1.25rem",
              color: "var(--text-secondary)", fontFamily: "var(--font-cinzel)",
              fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.5)";
              (e.currentTarget as HTMLButtonElement).style.background  = "rgba(201,168,76,0.06)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.2)";
              (e.currentTarget as HTMLButtonElement).style.background  = "rgba(255,255,255,0.05)";
            }}
          >
            {googleLoad ? <Loader2 size={16} className="animate-spin" /> : <GoogleIcon />}
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.15)" }} />
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.8rem", color: "var(--text-muted)" }}>or sign in with email</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.15)" }} />
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Email */}
            <div style={{ position: "relative" }}>
              <Mail size={14} color="rgba(201,168,76,0.5)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email" value={email} required
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={inputBase}
                onFocus={e  => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
                onBlur={e   => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative" }}>
              <Lock size={14} color="rgba(201,168,76,0.5)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPass ? "text" : "password"} value={password} required
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                style={{ ...inputBase, paddingRight: "44px" }}
                onFocus={e  => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)")}
                onBlur={e   => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
              />
              <button
                type="button" onClick={() => setShowPass(v => !v)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "2px" }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginTop: "-4px" }}>
              <Link href="/forgot-password" style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none" }}>
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: "10px 14px", background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)", borderRadius: "4px",
                fontFamily: "var(--font-cormorant)", fontSize: "0.88rem", color: "#f87171",
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading || googleLoad}
              className="btn-gold"
              style={{ width: "100%", marginTop: "0.25rem", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading
                ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Signing in…</>
                : "Sign In"
              }
            </button>
          </form>

          {/* Footer */}
          <p style={{
            textAlign: "center", marginTop: "1.5rem",
            fontFamily: "var(--font-cormorant)", fontSize: "0.9rem", color: "var(--text-muted)",
          }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
              Create one
            </Link>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}