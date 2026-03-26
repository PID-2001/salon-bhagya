"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user || profile?.role !== "admin") router.replace("/");
  }, [user, profile, isLoading, router]);

  if (isLoading || !user || profile?.role !== "admin") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-cinzel)",
          color: "var(--accent)",
          fontSize: "0.8rem",
          letterSpacing: "0.2em",
        }}>
          VERIFYING ACCESS…
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <AdminSidebar />
      <main style={{
        marginLeft: "240px",
        flex: 1,
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        minHeight: "100vh",
      }}>
        {children}
      </main>
    </div>
  );
}