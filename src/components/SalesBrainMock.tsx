"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

/* The actual working build, not an illustration of one.

   Plays only while on screen. A looping video decoding behind three screens of
   scroll is pure battery cost, and this one is the heaviest asset on the site.

   `poster` matters more than usual here: the first frame is near-black, so
   without it the panel is an empty dark rectangle until enough has buffered. */
export default function SalesBrainMock() {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrap, { margin: "120px" });

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView) {
      // Autoplay can reject (low-power mode, user setting) — a paused poster
      // is a fine outcome, an unhandled rejection in the console is not.
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <div ref={wrap} className="max-w-4xl mx-auto">
      <div
        className="rounded-[16px] overflow-hidden"
        style={{
          background: "#0b0b0d",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.28)",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 h-10"
          style={{ background: "#141417", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span
            className="text-[11px] tracking-[0.08em]"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            shared brain — live agent graph
          </span>
        </div>

        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full block"
          aria-label="The Sales Brain agent graph running: named agents connected to a shared memory, passing work between them."
        >
          <source src="/sales-brain.webm" type="video/webm" />
          <source src="/sales-brain.mp4" type="video/mp4" />
        </video>
      </div>

      <p
        className="text-[13px] leading-[1.7] text-center mt-5 max-w-xl mx-auto"
        style={{ color: "var(--muted)" }}
      >
        The build as it stands today — each agent is a node, and the lines are
        work passing between them and the shared memory they all read from.
        It runs; it isn&rsquo;t finished.
      </p>
    </div>
  );
}
