"use client";

import { useEffect, useState } from "react";
import { getAllMessages, markMessageRead, type ContactMessage } from "@/lib/admin";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    getAllMessages().then((data) => {
      setMessages(data);
      setLoading(false);
    });
  }, []);

  async function handleRead(id: string) {
    await markMessageRead(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <span className="section-label">Admin</span>
        <h1 style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--text-primary)", marginTop: "0.4rem" }}>
          Messages{" "}
          {unread > 0 && (
            <span style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "0.75rem",
              color: "var(--bg-primary)",
              background: "var(--accent)",
              borderRadius: "999px",
              padding: "0.15rem 0.6rem",
              marginLeft: "0.5rem",
              verticalAlign: "middle",
            }}>
              {unread}
            </span>
          )}
        </h1>
      </div>

      {loading ? (
        <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)", fontSize: "1.1rem" }}>Loading…</p>
      ) : messages.length === 0 ? (
        <div className="glass-card" style={{ borderRadius: "10px", padding: "3rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)", fontSize: "1.1rem" }}>
            No messages yet.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {messages.map((m) => (
            <div
              key={m.id}
              className="glass-card"
              style={{
                borderRadius: "10px",
                padding: "1.25rem 1.5rem",
                borderLeft: `3px solid ${m.read ? "var(--border-subtle)" : "var(--accent)"}`,
                opacity: m.read ? 0.7 : 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => setExpanded(expanded === m.id ? null : m.id!)}
            >
              {/* Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", alignItems: "center", gap: "1rem" }}>
                <p style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.8rem", color: "var(--text-primary)", margin: 0 }}>
                  {m.name}
                </p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", color: "var(--text-muted)", margin: 0 }}>
                  {m.email}
                </p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.88rem", color: "var(--text-muted)", margin: 0, fontStyle: "italic" }}>
                  {m.message.slice(0, 50)}{m.message.length > 50 ? "…" : ""}
                </p>
                {!m.read && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRead(m.id!); }}
                    style={{
                      background: "transparent",
                      border: "1px solid var(--border-accent)",
                      borderRadius: "6px",
                      color: "var(--accent)",
                      fontFamily: "var(--font-cinzel)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.35rem 0.7rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Mark Read
                  </button>
                )}
              </div>

              {/* Expanded message */}
              {expanded === m.id && (
                <div style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--border-subtle)",
                }}>
                  <p style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.05rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.7",
                    margin: 0,
                  }}>
                    {m.message}
                  </p>
                  {m.phone && (
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                      📞 {m.phone}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
