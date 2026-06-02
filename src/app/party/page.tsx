"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, PartyPopper, Wine, Minus, Plus } from "lucide-react";

const PARTY = {
  title: "Aidan's 22nd",
  dateLabel: "Saturday, 13 June",
  timeLabel: "From 4 PM",
  address: "13 Mane Road, Midrand",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=13+Mane+Road+Midrand",
  // RSVPs are sent to this WhatsApp number (Aidan's). Change the digits if needed.
  // Format: country code + number, no +, no spaces. SA 073 127 5190 -> 27731275190
  hostWhatsApp: "27731275190",
};

function waLink(choice: "yes" | "no", name: string, plusOnes: number) {
  const msg =
    choice === "yes"
      ? `🎉 RSVP for ${PARTY.title}\n\nName: ${name}\nComing: Yes ✅\nPlus-ones: ${plusOnes}`
      : `RSVP for ${PARTY.title}\n\nName: ${name}\nComing: Sorry, can't make it ❌`;
  return `https://wa.me/${PARTY.hostWhatsApp}?text=${encodeURIComponent(msg)}`;
}

export default function PartyPage() {
  const [name, setName] = useState("");
  const [plusOnes, setPlusOnes] = useState(0);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [sentUrl, setSentUrl] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function rsvp(choice: "yes" | "no") {
    if (!name.trim()) {
      setError("Please pop your name in first 🙂");
      return;
    }
    setError("");
    const url = waLink(choice, name.trim(), choice === "yes" ? plusOnes : 0);
    setAttending(choice);
    setSentUrl(url);
    setDone(true);
    window.open(url, "_blank"); // opens WhatsApp with the message ready to send
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center px-5 py-16 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(108,99,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 80% 110%, rgba(167,139,250,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {done ? (
            <ThankYou key="done" attending={attending} name={name} sentUrl={sentUrl} />
          ) : (
            <motion.div
              key="invite"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-7 sm:p-9 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 glow"
                style={{ background: "linear-gradient(135deg, #6c63ff, #a78bfa)" }}
              >
                <PartyPopper className="text-white" size={30} />
              </motion.div>

              <p
                className="text-xs font-semibold uppercase tracking-[0.25em] mb-3"
                style={{ color: "var(--accent2)" }}
              >
                You&apos;re invited
              </p>

              <h1
                className="text-[clamp(2.4rem,9vw,3.4rem)] font-bold leading-[0.95] tracking-tight mb-3"
                style={{ fontFamily: "var(--font-space)" }}
              >
                <span className="gradient-text">{PARTY.title}</span>
                <br />
                Birthday
              </h1>

              <p className="text-sm sm:text-base mb-7" style={{ color: "var(--muted)" }}>
                Come celebrate with me — there&apos;ll be food &amp; drinks. 🥂
              </p>

              <div className="grid gap-3 mb-8 text-left">
                <Detail icon={<Calendar size={18} />} label={PARTY.dateLabel} />
                <Detail icon={<Clock size={18} />} label={PARTY.timeLabel} />
                <a
                  href={PARTY.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-[1.01]"
                >
                  <Detail
                    icon={<MapPin size={18} />}
                    label={PARTY.address}
                    sub="Tap for directions →"
                  />
                </a>
                <Detail
                  icon={<Wine size={18} />}
                  label="Food served + drinks"
                  sub="Some alcohol available"
                />
              </div>

              <div className="text-left">
                <label
                  className="text-xs font-semibold uppercase tracking-widest block mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Your name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g. Thabo M."
                  className="w-full rounded-xl px-4 py-3 mb-4 text-base outline-none transition-colors focus:border-[var(--accent)]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                />

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm font-medium">Bringing anyone?</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      Number of plus-ones
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPlusOnes((n) => Math.max(0, n - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                      style={{ border: "1px solid var(--border)" }}
                      aria-label="Fewer plus-ones"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center text-lg font-semibold tabular-nums">
                      {plusOnes}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPlusOnes((n) => Math.min(10, n + 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                      style={{ border: "1px solid var(--border)" }}
                      aria-label="More plus-ones"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm mb-3 text-center" style={{ color: "#ff7b87" }}>
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => rsvp("yes")}
                    className="w-full py-4 rounded-2xl text-base font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
                      boxShadow: "0 0 24px rgba(108,99,255,0.35)",
                    }}
                  >
                    I&apos;m coming 🎉
                  </button>
                  <button
                    type="button"
                    onClick={() => rsvp("no")}
                    className="w-full py-3.5 rounded-2xl text-sm font-medium transition-colors hover:bg-white/5"
                    style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                  >
                    Can&apos;t make it
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Detail({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
    >
      <span style={{ color: "var(--accent2)" }}>{icon}</span>
      <div>
        <p className="text-sm font-medium leading-tight">{label}</p>
        {sub && (
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

function ThankYou({
  attending,
  name,
  sentUrl,
}: {
  attending: "yes" | "no" | null;
  name: string;
  sentUrl: string;
}) {
  const coming = attending === "yes";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-3xl p-9 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 11 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 glow"
        style={{
          background: coming
            ? "linear-gradient(135deg, #6c63ff, #a78bfa)"
            : "rgba(255,255,255,0.05)",
          border: coming ? "none" : "1px solid var(--border)",
        }}
      >
        <span className="text-4xl">{coming ? "🥳" : "💜"}</span>
      </motion.div>

      <h2
        className="text-2xl font-bold mb-3 tracking-tight"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Almost done — hit send!
      </h2>

      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
        WhatsApp should have opened with your reply ready. Just press{" "}
        <span style={{ color: "var(--text)" }}>send</span> to lock in your RSVP.
      </p>

      <a
        href={sentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full py-3.5 rounded-2xl text-base font-semibold text-white transition-all hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, #25D366, #1da851)",
          boxShadow: "0 0 24px rgba(37,211,102,0.3)",
        }}
      >
        Open WhatsApp to send →
      </a>

      <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
        Thanks {name.split(" ")[0]}! {coming ? "See you on the 13th 🎉" : ""}
      </p>
    </motion.div>
  );
}
