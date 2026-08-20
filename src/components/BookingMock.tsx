"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/* A browser frame cycling through the three screens a guest actually sees:
   pick dates, pick a room, pay. It mirrors the real widget flow (dates ->
   rooms -> name -> pay) rather than inventing features the build doesn't have.

   The address bar reads yourguesthouse.co.za on purpose — the whole point of
   the product is that this runs on their domain, not ours, and a made-up real
   business name in a mockup is a small lie that isn't worth telling.

   Only advances while on screen: a carousel that ran through its cycle before
   anyone scrolled to it has shown its best screen to nobody. */
const STEPS = ["Dates", "Rooms", "Pay"] as const;
const HOLD = 3200;

const rooms = [
  { name: "Garden Suite", sleeps: "Sleeps 2", price: "R1,450" },
  { name: "Family Cottage", sleeps: "Sleeps 4", price: "R2,100" },
  { name: "Loft Room", sleeps: "Sleeps 2", price: "R1,180" },
];

export default function BookingMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % STEPS.length), HOLD);
    return () => clearInterval(t);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      <div
        className="rounded-[16px] overflow-hidden"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.10)",
        }}
      >
        {/* browser chrome */}
        <div
          className="flex items-center gap-3 px-4 h-11"
          style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div
            className="flex-1 text-center text-[11px] rounded-md py-1 mx-8"
            style={{ background: "var(--bg)", color: "var(--muted)" }}
          >
            yourguesthouse.co.za
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* step rail */}
          <div className="flex items-center gap-2 mb-7">
            {STEPS.map((s, idx) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className="flex-1">
                  <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <motion.div
                      className="h-full origin-left"
                      style={{ background: "var(--accent)" }}
                      initial={false}
                      animate={{ scaleX: idx <= i ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.14em] mt-2"
                    style={{ color: idx === i ? "var(--accent)" : "var(--muted)" }}
                  >
                    {s}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="min-h-[188px]">
            <AnimatePresence mode="wait">
              {i === 0 && (
                <motion.div
                  key="dates"
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { l: "Arrive", v: "14 Mar" },
                      { l: "Leave", v: "17 Mar" },
                      { l: "Guests", v: "2" },
                    ].map((f) => (
                      <div
                        key={f.l}
                        className="rounded-lg px-3 py-2.5"
                        style={{ border: "1px solid var(--border)" }}
                      >
                        <div className="text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--muted)" }}>
                          {f.l}
                        </div>
                        <div className="text-[15px] font-medium" style={{ color: "var(--text)" }}>
                          {f.v}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 21 }).map((_, d) => {
                      const inRange = d >= 9 && d <= 11;
                      return (
                        <motion.div
                          key={d}
                          className="h-7 rounded-md flex items-center justify-center text-[11px]"
                          style={{
                            background: inRange ? "var(--accent)" : "var(--surface)",
                            color: inRange ? "var(--bg)" : "var(--muted)",
                          }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 + d * 0.012, duration: 0.3 }}
                        >
                          {d + 8}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {i === 1 && (
                <motion.div
                  key="rooms"
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2.5"
                >
                  {rooms.map((r, idx) => (
                    <motion.div
                      key={r.name}
                      className="flex items-center justify-between rounded-lg px-4 py-3.5"
                      style={{
                        border: `1px solid ${idx === 0 ? "var(--accent)" : "var(--border)"}`,
                        background: idx === 0 ? "var(--accent-soft)" : "transparent",
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.09, duration: 0.4 }}
                    >
                      <div>
                        <div className="text-[15px] font-medium" style={{ color: "var(--text)" }}>
                          {r.name}
                        </div>
                        <div className="text-[12px]" style={{ color: "var(--muted)" }}>
                          {r.sleeps}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[15px] font-semibold" style={{ color: "var(--text)" }}>
                          {r.price}
                        </div>
                        <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                          per night
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {i === 2 && (
                <motion.div
                  key="pay"
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-col gap-2.5 mb-6">
                    {[
                      ["Garden Suite · 3 nights", "R4,350"],
                      ["Booking sites' commission", "R0"],
                    ].map(([l, v], idx) => (
                      <motion.div
                        key={l}
                        className="flex items-center justify-between text-[14px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12 + idx * 0.1 }}
                      >
                        <span style={{ color: "var(--muted)" }}>{l}</span>
                        <span
                          className="font-medium"
                          style={{ color: idx === 1 ? "var(--accent)" : "var(--text)" }}
                        >
                          {v}
                        </span>
                      </motion.div>
                    ))}
                    <div style={{ borderTop: "1px solid var(--border)" }} className="pt-3 mt-1 flex items-center justify-between">
                      <span className="text-[14px]" style={{ color: "var(--text)" }}>
                        You receive
                      </span>
                      <span className="display text-[22px]" style={{ color: "var(--text)" }}>
                        R4,350
                      </span>
                    </div>
                  </div>
                  <motion.div
                    className="w-full text-center font-medium py-3 rounded-full text-[14px]"
                    style={{ background: "var(--text)", color: "var(--bg)" }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Pay with card
                  </motion.div>
                  <div className="text-[11px] text-center mt-3" style={{ color: "var(--muted)" }}>
                    Charged to your own Payfast account
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
