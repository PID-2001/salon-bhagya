"use client";

// components/auth/ProtectedRoute.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If true, only admins can access this route */
  adminOnly?: boolean;
  /** Where to redirect unauthorized users (default: /login) */
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  adminOnly   = false,
  redirectTo  = "/login",
}: ProtectedRouteProps) {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user)              { router.replace(redirectTo); return; }
    if (adminOnly && !isAdmin) { router.replace("/"); return; }
  }, [user, isAdmin, isLoading, adminOnly, redirectTo, router]);

  if (isLoading || !user || (adminOnly && !isAdmin)) {
    return (
      <div style={{
        minHeight: "100dvh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "var(--bg-primary)", gap: "1rem",
      }}>
        <Loader2 size={32} color="#C9A84C" style={{ animation: "spin 1s linear infinite" }} />
        <p style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase" }}>
          Verifying access…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
}