"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const INDUSTRIES = [
  "Restaurant",
  "Beauty & Salon",
  "Construction",
  "Spa & Wellness",
  "Accounting & Finance",
  "Plumbing & Trades",
  "Retail",
  "Other",
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    hasWebsite: "",
    websiteUrl: "",
    industry: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", hasWebsite: "", websiteUrl: "", industry: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    color: "var(--text)",
    padding: "14px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const focusProps = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      (e.target.style.borderColor = "rgba(108,99,255,0.5)"),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      (e.target.style.borderColor = "var(--border)"),
  };

  const labelStyle = "text-xs uppercase tracking-widest block mb-2";

  return (
    <section className="py-18 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn direction="left">
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-4 block"
                style={{ color: "var(--accent2)" }}
              >
                Contact
              </span>
              <h2
                className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Let&apos;s Build{" "}
                <span className="gradient-text">Together</span>
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
                Got a project in mind? Fill in the form and I&apos;ll get back to you within a few
                hours. Or reach out directly — I&apos;m always happy to chat.
              </p>

              <div className="flex flex-col gap-5">
                <a href="mailto:webflowstudiosa@gmail.com" className="flex items-center gap-4 group">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
                  >
                    <Mail size={18} style={{ color: "var(--accent2)" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--muted)" }}>Email</div>
                    <div className="text-sm font-medium text-white group-hover:text-[#a78bfa] transition-colors">
                      webflowstudiosa@gmail.com
                    </div>
                  </div>
                </a>

                <a href="tel:0731275190" className="flex items-center gap-4 group">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
                  >
                    <Phone size={18} style={{ color: "var(--accent2)" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--muted)" }}>Phone / WhatsApp</div>
                    <div className="text-sm font-medium text-white group-hover:text-[#a78bfa] transition-colors">
                      073 127 5190
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-10">
                <a
                  href="https://wa.me/27731275190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-white text-sm transition-all duration-300 hover:scale-105"
                  style={{ background: "#25D366", boxShadow: "0 0 20px rgba(37,211,102,0.3)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="glass rounded-3xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle size={56} className="mb-6" style={{ color: "#6c63ff" }} />
                  <h3 className="text-2xl font-bold mb-3 text-white" style={{ fontFamily: "var(--font-space)" }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    Thanks for reaching out. I&apos;ll get back to you within a few hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm font-medium transition-colors"
                    style={{ color: "var(--accent2)" }}
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass rounded-3xl p-8 flex flex-col gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyle} style={{ color: "var(--muted)" }}>
                        Full Name <span style={{ color: "var(--accent2)" }}>*</span>
                      </label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required style={inputStyle} {...focusProps} />
                    </div>
                    <div>
                      <label className={labelStyle} style={{ color: "var(--muted)" }}>
                        Phone Number <span style={{ color: "var(--accent2)" }}>*</span>
                      </label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="073 000 0000" required style={inputStyle} {...focusProps} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelStyle} style={{ color: "var(--muted)" }}>
                      Email Address <span style={{ color: "var(--accent2)" }}>*</span>
                    </label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required style={inputStyle} {...focusProps} />
                  </div>

                  {/* Website toggle */}
                  <div>
                    <label className={labelStyle} style={{ color: "var(--muted)" }}>
                      Do you have a website already? <span style={{ color: "var(--accent2)" }}>*</span>
                    </label>
                    <div className="flex gap-3">
                      {[
                        { value: "yes", label: "Yes, I have a website" },
                        { value: "no", label: "No, I don't have one" },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, hasWebsite: value, websiteUrl: "" }))}
                          className="flex-1 py-3 px-3 rounded-xl text-xs font-semibold transition-all duration-200"
                          style={{
                            background: form.hasWebsite === value ? "rgba(108,99,255,0.2)" : "rgba(255,255,255,0.03)",
                            border: form.hasWebsite === value ? "1px solid rgba(108,99,255,0.6)" : "1px solid var(--border)",
                            color: form.hasWebsite === value ? "var(--accent2)" : "var(--muted)",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* URL field — animated */}
                  <AnimatePresence>
                    {form.hasWebsite === "yes" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden" }}
                      >
                        <label className={labelStyle} style={{ color: "var(--muted)" }}>Your website URL</label>
                        <input name="websiteUrl" value={form.websiteUrl} onChange={handleChange} placeholder="https://yourwebsite.co.za" style={inputStyle} {...focusProps} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Industry */}
                  <div>
                    <label className={labelStyle} style={{ color: "var(--muted)" }}>
                      Industry / Business Type <span style={{ color: "var(--accent2)" }}>*</span>
                    </label>
                    <select name="industry" value={form.industry} onChange={handleChange} required style={{ ...inputStyle, cursor: "pointer" }} {...focusProps}>
                      <option value="" disabled style={{ background: "#0d0d12" }}>Select your industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind} style={{ background: "#0d0d12" }}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelStyle} style={{ color: "var(--muted)" }}>
                      Tell us about your business{" "}
                      <span style={{ color: "var(--muted)", opacity: 0.5 }}>(optional)</span>
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="What do you need? Any specific features, pages, or goals?" rows={4} style={{ ...inputStyle, resize: "vertical" }} {...focusProps} />
                  </div>

                  {status === "error" && (
                    <p className="text-sm" style={{ color: "#f87171" }}>
                      Something went wrong. Please try WhatsApp or email directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-2xl text-white text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                      boxShadow: "0 0 30px rgba(108,99,255,0.3)",
                    }}
                  >
                    <Send size={15} />
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
