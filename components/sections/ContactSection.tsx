"use client";

import { useRef, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Send, CheckCircle, AlertCircle,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldButton from "@/components/ui/GoldButton";

// ─── CONFIG — replace all placeholders ──────────────────────────────────────
const CONTACT = {
  phone:       "+94 77 296 2645",
  whatsapp:    "94772962645",
  email:       "hello@salonbhagya.lk",
  address:     "The One, Salon Bhagya, Kurunegala Road, Halmillawewa",
  mapUrl:      "https://maps.google.com/?q=The+One+Salon+Bhagya+Kurunegala+Road+Halmillawewa",
  instagram:   "https://instagram.com/salonbhagya",
  facebook:    "https://facebook.com/salonbhagya",
  hours: [
    { day: "Monday – Friday",  time: "9:00 AM – 7:00 PM" },
    { day: "Saturday",         time: "8:00 AM – 8:00 PM" },
    { day: "Sunday",           time: "10:00 AM – 5:00 PM" },
    { day: "Public Holidays",  time: "By Appointment Only" },
  ],
};

type SocialLink = {
  label: string;
  href: string;
  color: string;
  icon: ReactNode;
};

const InstagramGlyph = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x={3} y={3} width={18} height={18} rx={5} ry={5} />
    <path d="M16 11.37a4 4 0 1 1-3.63-3.63A4 4 0 0 1 16 11.37Z" />
    <circle cx={17.5} cy={6.5} r={0.8} fill="currentColor" stroke="none" />
  </svg>
);

const FacebookGlyph = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v9h4v-9h3l1-4h-4V6a1 1 0 0 1 1-1h3Z" />
  </svg>
);

const SOCIAL_LINKS: SocialLink[] = [
  { label: "@salonbhagya", href: CONTACT.instagram, color: "#e1306c", icon: <InstagramGlyph /> },
  { label: "Salon Bhagya", href: CONTACT.facebook, color: "#1877f2", icon: <FacebookGlyph /> },
];

// ─── TYPES ───────────────────────────────────────────────────────────────────
type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  name:    string;
  email:   string;
  phone:   string;
  service: string;
  message: string;
}

const SERVICES = [
  "Hair Services",
  "Skin & Facial",
  "Nail Services",
  "Bridal Package",
  "Wellness & Massage",
  "Product Enquiry",
  "Rental Services",
  "Other",
];

// ─── FIELD COMPONENT ────────────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label style={{
        fontFamily:    "var(--font-cinzel)",
        fontSize:      "0.6rem",
        fontWeight:    700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color:         "var(--accent)",
      }}>
        {label}{required && <span style={{ color: "#c9a84c", marginLeft: "3px" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = (focused: boolean): React.CSSProperties => ({
  width:         "100%",
  padding:       "11px 14px",
  backgroundColor: focused ? "rgba(201,168,76,0.06)" : "rgba(201,168,76,0.03)",
  border:        `1px solid ${focused ? "rgba(201,168,76,0.55)" : "rgba(201,168,76,0.18)"}`,
  borderRadius:  "2px",
  color:         "var(--text-primary)",
  fontFamily:    "var(--font-cormorant)",
  fontSize:      "0.95rem",
  outline:       "none",
  transition:    "all 0.25s ease",
  boxSizing:     "border-box",
  boxShadow:     focused ? "0 0 0 3px rgba(201,168,76,0.08)" : "none",
});

// ─── CONTACT INFO ITEM ───────────────────────────────────────────────────────
function InfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const content = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:    "flex",
        alignItems: "flex-start",
        gap:        "14px",
        padding:    "14px 16px",
        background: hovered ? "rgba(201,168,76,0.06)" : "transparent",
        border:     `1px solid ${hovered ? "rgba(201,168,76,0.25)" : "transparent"}`,
        borderRadius: "4px",
        transition: "all 0.28s ease",
        cursor:     href ? "pointer" : "default",
      }}
    >
      <div style={{
        width:         "38px",
        height:        "38px",
        background:    "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))",
        border:        "1px solid rgba(201,168,76,0.25)",
        borderRadius:  "50%",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"center",
        flexShrink:    0,
        transition:    "all 0.28s ease",
        transform:     hovered ? "scale(1.08)" : "scale(1)",
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontFamily:    "var(--font-cinzel)",
          fontSize:      "0.58rem",
          fontWeight:    600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          marginBottom:  "4px",
        }}>{label}</div>
        <div style={{
          fontFamily: "var(--font-cormorant)",
          fontSize:   "0.95rem",
          color:      hovered && href ? "var(--accent)" : "var(--text-secondary)",
          transition: "color 0.25s ease",
          lineHeight: 1.45,
        }}>{value}</div>
      </div>
    </div>
  );

  return href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{content}</a> : content;
}

// ─── MAIN SECTION ────────────────────────────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form,      setForm]      = useState<FormData>({ name: "", email: "", phone: "", service: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [focused,   setFocused]   = useState<string | null>(null);

  const update = (k: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setFormState("sending");

    // Simulate send — wire up to EmailJS / Formspree / Firebase in Step 12
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("success");

    // Reset after 4s
    setTimeout(() => {
      setFormState("idle");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }, 4000);
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I'd like to get in touch with THE ONE | Salon Bhagya.\n\nName: ${form.name || "—"}\nService: ${form.service || "—"}\nMessage: ${form.message || "—"}`;
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background:    "var(--bg-primary)",
        paddingBlock:  "clamp(6rem, 12vw, 10rem)",
        position:      "relative",
        overflow:      "hidden",
      }}
    >
      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "8%", left: "-6%",
        width: "480px", height: "480px",
        background: "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-6%",
        width: "360px", height: "360px",
        background: "radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-salon relative" style={{ zIndex: 10 }}>

        <SectionHeader
          label="Get In Touch"
          title={<>We'd Love to <span className="text-gold-gradient">Hear From You</span></>}
          subtitle="Reach out to book, enquire, or simply say hello — our team is always delighted to assist."
          align="center"
          animate
          isInView={isInView}
        />

        {/* ── Two-column layout ── */}
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(2rem, 4vw, 3.5rem)" }}>

          {/* ── LEFT: Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
          >
            {/* Info cards */}
            <InfoItem
              icon={<Phone size={16} color="#C9A84C" />}
              label="Phone"
              value={CONTACT.phone}
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            />
            <InfoItem
              icon={<MessageCircle size={16} color="#22c55e" />}
              label="WhatsApp"
              value={CONTACT.phone}
              href={`https://wa.me/${CONTACT.whatsapp}`}
            />
            <InfoItem
              icon={<Mail size={16} color="#C9A84C" />}
              label="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
            <InfoItem
              icon={<MapPin size={16} color="#C9A84C" />}
              label="Location"
              value={CONTACT.address}
              href={CONTACT.mapUrl}
            />

            {/* Hours block */}
            <div style={{
              marginTop:    "8px",
              padding:      "20px",
              background:   "linear-gradient(135deg,rgba(201,168,76,0.06),rgba(201,168,76,0.02))",
              border:       "1px solid rgba(201,168,76,0.15)",
              borderRadius: "4px",
            }}>
              <div style={{
                display:       "flex",
                alignItems:    "center",
                gap:           "8px",
                marginBottom:  "16px",
              }}>
                <Clock size={14} color="#C9A84C" />
                <span style={{
                  fontFamily:    "var(--font-cinzel)",
                  fontSize:      "0.6rem",
                  fontWeight:    700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:         "var(--accent)",
                }}>Opening Hours</span>
              </div>
              {CONTACT.hours.map((h) => (
                <div key={h.day} style={{
                  display:        "flex",
                  justifyContent: "space-between",
                  alignItems:     "center",
                  paddingBlock:   "6px",
                  borderBottom:   "1px solid rgba(201,168,76,0.08)",
                  gap:            "12px",
                }}>
                  <span style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize:   "0.85rem",
                    color:      "var(--text-secondary)",
                  }}>{h.day}</span>
                  <span style={{
                    fontFamily:  "var(--font-cormorant)",
                    fontSize:    "0.85rem",
                    color:       h.time.includes("Appointment") ? "var(--accent)" : "var(--text-muted)",
                    whiteSpace:  "nowrap",
                  }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{
              marginTop:  "8px",
              display:    "flex",
              gap:        "10px",
              flexWrap:   "wrap",
            }}>
              {SOCIAL_LINKS.map(({ icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    gap:            "8px",
                    padding:        "9px 16px",
                    background:     "rgba(201,168,76,0.04)",
                    border:         "1px solid rgba(201,168,76,0.15)",
                    borderRadius:   "2px",
                    color:          "var(--text-secondary)",
                    textDecoration: "none",
                    fontFamily:     "var(--font-cinzel)",
                    fontSize:       "0.62rem",
                    fontWeight:     600,
                    letterSpacing:  "0.1em",
                    transition:     "all 0.25s ease",
                  }}
                  onMouseEnter={(event: ReactMouseEvent<HTMLAnchorElement>) => {
                    const el = event.currentTarget;
                    el.style.borderColor = color;
                    el.style.color = color;
                    el.style.background = `${color}12`;
                  }}
                  onMouseLeave={(event: ReactMouseEvent<HTMLAnchorElement>) => {
                    const el = event.currentTarget;
                    el.style.borderColor = "rgba(201,168,76,0.15)";
                    el.style.color = "var(--text-secondary)";
                    el.style.background = "rgba(201,168,76,0.04)";
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.4 }}
          >
            <div style={{
              background:   "linear-gradient(145deg,var(--bg-secondary),var(--bg-tertiary))",
              border:       "1px solid rgba(201,168,76,0.18)",
              borderRadius: "4px",
              padding:      "clamp(1.5rem, 3.5vw, 2.5rem)",
              position:     "relative",
              overflow:     "hidden",
            }}>
              {/* Corner ornament */}
              <div style={{ position: "absolute", top: "18px", right: "22px", opacity: 0.15, pointerEvents: "none" }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M4 4 L4 16 M4 4 L16 4" stroke="#C9A84C" strokeWidth="1.5" />
                  <path d="M36 36 L36 24 M36 36 L24 36" stroke="#C9A84C" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Form header */}
              <div style={{ marginBottom: "1.75rem" }}>
                <div style={{
                  fontFamily:    "var(--font-cinzel)",
                  fontSize:      "0.6rem",
                  fontWeight:    700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color:         "var(--accent)",
                  marginBottom:  "8px",
                }}>Send a Message</div>
                <p style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle:  "italic",
                  fontSize:   "0.95rem",
                  color:      "var(--text-muted)",
                  margin:     0,
                }}>We'll respond within 24 hours, or reach us instantly via WhatsApp.</p>
              </div>

              {/* Success state */}
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    justifyContent: "center",
                    padding:        "3rem 1rem",
                    textAlign:      "center",
                    gap:            "16px",
                  }}
                >
                  <div style={{
                    width:         "64px",
                    height:        "64px",
                    background:    "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))",
                    border:        "1px solid rgba(201,168,76,0.35)",
                    borderRadius:  "50%",
                    display:       "flex",
                    alignItems:    "center",
                    justifyContent:"center",
                  }}>
                    <CheckCircle size={28} color="#C9A84C" />
                  </div>
                  <div>
                    <div style={{
                      fontFamily:   "var(--font-cinzel)",
                      fontSize:     "1rem",
                      fontWeight:   700,
                      color:        "var(--text-primary)",
                      marginBottom: "8px",
                    }}>Message Sent!</div>
                    <p style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle:  "italic",
                      fontSize:   "0.95rem",
                      color:      "var(--text-muted)",
                      margin:     0,
                    }}>Thank you — we'll be in touch with you shortly.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

                  {/* Name + Email row */}
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.1rem" }}>
                    <Field label="Full Name" required>
                      <input
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Your full name"
                        required
                        style={inputStyle(focused === "name")}
                      />
                    </Field>
                    <Field label="Email Address" required>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="you@email.com"
                        required
                        style={inputStyle(focused === "email")}
                      />
                    </Field>
                  </div>

                  {/* Phone + Service row */}
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.1rem" }}>
                    <Field label="Phone Number">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        placeholder="+94 77 000 0000"
                        style={inputStyle(focused === "phone")}
                      />
                    </Field>
                    <Field label="Service of Interest">
                      <select
                        value={form.service}
                        onChange={update("service")}
                        onFocus={() => setFocused("service")}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle(focused === "service"),
                          appearance: "none",
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          paddingRight: "40px",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" style={{ background: "#0e0e0a" }}>Select a service…</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s} style={{ background: "#0e0e0a" }}>{s}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="Your Message" required>
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell us about your requirements, preferred dates, or any questions…"
                      required
                      rows={4}
                      style={{
                        ...inputStyle(focused === "message"),
                        resize:    "vertical",
                        minHeight: "110px",
                      }}
                    />
                  </Field>

                  {/* Error state */}
                  {formState === "error" && (
                    <div style={{
                      display:      "flex",
                      alignItems:   "center",
                      gap:          "8px",
                      padding:      "10px 14px",
                      background:   "rgba(239,68,68,0.08)",
                      border:       "1px solid rgba(239,68,68,0.3)",
                      borderRadius: "2px",
                      color:        "#f87171",
                      fontFamily:   "var(--font-cormorant)",
                      fontSize:     "0.88rem",
                    }}>
                      <AlertCircle size={14} />
                      Something went wrong. Please try WhatsApp instead.
                    </div>
                  )}

                  {/* Submit buttons */}
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "4px" }}>
                    <GoldButton
                      variant="filled"
                      size="md"
                      type="submit"
                      disabled={formState === "sending"}
                      icon={formState === "sending" ? undefined : <Send size={14} />}
                    >
                      {formState === "sending" ? "Sending…" : "Send Message"}
                    </GoldButton>
                    <GoldButton
                      variant="outline"
                      size="md"
                      onClick={handleWhatsApp}
                      icon={<MessageCircle size={14} />}
                    >
                      WhatsApp Instead
                    </GoldButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Responsive: 2-col on ≥900px, 2-col form rows on ≥520px */}
      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 1fr 1.2fr !important; }
        }
        @media (min-width: 520px) {
          .form-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}