"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* A scroll-driven exploded view of the Sales Brain, in the spirit of the Ember
   product scroll: the object stays pinned while the page moves, separating
   into its parts with each one labelling itself as it comes forward.

   Ember explodes an earbud. This has no physical form, so what separates is
   the architecture — the four managers lifting off the shared memory they all
   read from. Inventing a fake device to explode would have been the dishonest
   version of this.

   Built from CSS 3D transforms rather than WebGL. For flat stacked layers that
   is the better tool: the plates stay vector-crisp at any zoom, the labels are
   real selectable text instead of a blurry texture, it adds no dependency to a
   site whose hero already runs a shader, and it costs nothing to load. A
   WebGL scene would win for an organic object; it loses for a layer diagram. */

const LAYERS = [
  {
    key: "chaser",
    no: "04",
    title: "The chaser",
    body: "Tracks who replied, who didn't, and when a follow-up is due — so nothing goes quietly cold.",
  },
  {
    key: "writer",
    no: "03",
    title: "The writer",
    body: "Writes one message about that business's actual situation, not a mail-merge with a name dropped in.",
  },
  {
    key: "checker",
    no: "02",
    title: "The checker",
    body: "Throws out the closed businesses and the numbers that won't reach a human. Most of a raw list dies here.",
  },
  {
    key: "finder",
    no: "01",
    title: "The finder",
    body: "Pulls businesses that match what you sell, each with a real contact number attached.",
  },
  {
    key: "memory",
    no: "—",
    title: "Shared memory",
    body: "Everything any of them learns, all of them can read. It's the part that makes them a team rather than four scripts.",
    base: true,
  },
];

const GAP = 132; // px of separation between plates when fully exploded

function Plate({
  layer,
  index,
  progress,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const total = LAYERS.length;
  // Plates lift in sequence rather than all at once, so you read them one at
  // a time instead of watching the whole stack fan out in a single beat.
  const start = 0.08 + index * 0.055;
  const lift = useTransform(progress, [start, start + 0.42], [0, 1], {
    clamp: true,
  });
  const z = useTransform(lift, (v) => v * (total - 1 - index) * GAP);
  const labelOpacity = useTransform(
    progress,
    [start + 0.1, start + 0.26],
    [0, 1],
    { clamp: true },
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 420,
        height: 260,
        marginLeft: -210,
        marginTop: -130,
        translateZ: z,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{
          background: layer.base
            ? "linear-gradient(135deg, rgba(138,106,47,0.16), rgba(138,106,47,0.05))"
            : "rgba(255,255,255,0.72)",
          border: `1px solid ${layer.base ? "rgba(138,106,47,0.42)" : "var(--border)"}`,
          boxShadow: layer.base
            ? "0 30px 60px rgba(138,106,47,0.14)"
            : "0 22px 44px rgba(0,0,0,0.07)",
          backdropFilter: "blur(6px)",
        }}
      />
      {/* Label rides on the plate in 3D, then is counter-rotated flat so the
          text reads straight instead of lying down with the surface. */}
      <motion.div
        className="absolute whitespace-nowrap"
        style={{
          left: 452,
          top: 96,
          opacity: labelOpacity,
          transform: "rotateZ(35deg) rotateX(-62deg)",
          transformOrigin: "left center",
        }}
      >
        <div
          className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-1"
          style={{ color: "var(--accent)" }}
        >
          {layer.no}
        </div>
        <div className="display text-[22px]" style={{ color: "var(--text)" }}>
          {layer.title}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SalesBrainExploded() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  const tilt = useTransform(progress, [0, 0.35], [72, 62], { clamp: true });
  const spin = useTransform(progress, [0, 1], [-24, -42]);

  if (reduce) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col gap-5">
        {[...LAYERS].reverse().map((l) => (
          <div key={l.key} className="card p-7">
            <div className="eyebrow mb-2">{l.no}</div>
            <h3 className="display text-[20px] mb-2" style={{ color: "var(--text)" }}>
              {l.title}
            </h3>
            <p className="text-[15px] leading-[1.75]" style={{ color: "var(--muted)" }}>
              {l.body}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Desktop: pinned stage, 3 screens of scroll drive the explosion. */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: "320vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 45%, var(--surface) 0%, var(--bg) 70%)",
            }}
          />
          <motion.div
            className="relative"
            style={{
              width: 900,
              height: 560,
              perspective: 1500,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                rotateX: tilt,
                rotateZ: spin,
              }}
            >
              {LAYERS.map((layer, i) => (
                <Plate key={layer.key} layer={layer} index={i} progress={progress} />
              ))}
            </motion.div>
          </motion.div>

          <div className="absolute bottom-14 left-0 right-0 px-6">
            <p
              className="text-[13px] text-center max-w-md mx-auto leading-[1.7]"
              style={{ color: "var(--muted)" }}
            >
              Four managers over one shared memory. Keep scrolling to pull them
              apart.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: the stack is unreadable at this width — plain cards instead. */}
      <div className="lg:hidden px-6 max-w-2xl mx-auto flex flex-col gap-4">
        {[...LAYERS].reverse().map((l) => (
          <div key={l.key} className="card p-6">
            <div className="eyebrow mb-2">{l.no}</div>
            <h3 className="display text-[19px] mb-2" style={{ color: "var(--text)" }}>
              {l.title}
            </h3>
            <p className="text-[15px] leading-[1.75]" style={{ color: "var(--muted)" }}>
              {l.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
