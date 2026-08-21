"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Magnetic from "./motion/Magnetic";
import Blob from "./motion/Blob";

const EASE = [0.22, 1, 0.36, 1] as const;
function fadeUp(delay: number, y = 24) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  } as const;
}

/* The WebGL silk shader that used to live here is gone — two shaders on one
   page is two contexts fighting for the same frame budget, and the blobs are
   the better centrepiece. Both blobs share ONE canvas and one context; they are
   two meshes in the same scene, not two <Blob> mounts.

   Positions are not scripted at all any more — they come out of a collision
   simulation, so the arrangement never repeats and there is nothing to time. */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const dissolve = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const shrink = useTransform(scrollYProgress, [0, 1], [1, 0.955]);

  // Memoised so the effect that builds the WebGL scene isn't torn down and
  // rebuilt on every render of the hero.
  /* Six bodies, free-floating — no orbits and no centre attractor, so they
     wander the whole hero and bounce off each other and all four edges.

     Only the two existing colour pairs are used, alternating. Six different
     palettes would turn the hero into a fruit bowl; two repeating reads as one
     family. Sizes are deliberately spread so collisions are visibly unequal —
     a small one ricocheting off a big one is far more convincing than two
     equal spheres swapping velocities.

     Total blob area is roughly a third of the frustum. Much past that and they
     jam into a permanent scrum instead of drifting. */
  /* Four, and free to cross the whole hero including behind the type — no
     exclusion zone. Twelve was tried and dropped: at that count you stop
     seeing individual collisions and the mush turns into moving texture. Four
     stay big enough to read as objects, so a contact is an event you notice.
     It is also about a third of the geometry — ~120k triangles, not ~370k. */
  const blobs = useMemo(
    () => [
      { size: 1.15, seed: 3.1,  amp: 0.32, freq: 0.74, tintLow: "#63cbe8", tintHigh: "#f0a8dc", spin:  0.042 },
      { size: 0.95, seed: 11.7, amp: 0.35, freq: 0.82, tintLow: "#8ad6c9", tintHigh: "#c8b6f2", spin: -0.036 },
      { size: 0.78, seed: 24.3, amp: 0.31, freq: 0.88, tintLow: "#63cbe8", tintHigh: "#f0a8dc", spin:  0.050 },
      { size: 0.66, seed: 37.9, amp: 0.37, freq: 0.94, tintLow: "#8ad6c9", tintHigh: "#c8b6f2", spin: -0.045 },
    ],
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-12"
    >
      <div className="absolute inset-0" style={{ background: "var(--bg)" }} />

      {/* Desktop only: ~180k triangles is not a mobile expense. */}
      <Blob className="absolute inset-0 hidden lg:block" blobs={blobs} />

      {/* Mobile gets a still wash in the same palette. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "radial-gradient(60% 45% at 22% 30%, rgba(240,168,220,0.30) 0%, transparent 70%), radial-gradient(55% 45% at 82% 68%, rgba(99,203,232,0.28) 0%, transparent 72%)",
        }}
      />

      {/* Readability wash. They are free to drift behind the headline, so this
          has to carry the contrast on its own — but it fades out well before
          the edges so the corners keep their colour. Strong enough to read
          over, light enough that a blob passing behind still shows through. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 42% at 50% 44%, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.5) 58%, rgba(255,255,255,0) 100%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        style={reduce ? undefined : { y: driftY, opacity: dissolve, scale: shrink }}
      >
        <motion.p {...fadeUp(0.05, 10)} className="eyebrow mb-7">
          O&apos;Gorman Studio
        </motion.p>

        <motion.h1
          {...fadeUp(0.16)}
          className="display text-[clamp(2.9rem,7.2vw,5.4rem)] mb-7"
          style={{ color: "var(--text)" }}
        >
          Software for the jobs
          <br className="hidden sm:block" /> you&apos;re still doing by hand.
        </motion.h1>

        <motion.p {...fadeUp(0.3, 12)} className="lede max-w-2xl mx-auto mb-10">
          A direct booking system that keeps the agent&apos;s commission in your
          pocket, sales automation that works the pipeline for you, and the
          websites they run on.
        </motion.p>

        <motion.div
          {...fadeUp(0.42, 12)}
          className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4"
        >
          <Magnetic>
            <Link
              href="/bookdirect"
              className="inline-flex items-center justify-center font-medium px-7 py-3 rounded-full text-[15px] transition-opacity duration-300 hover:opacity-85"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Explore BookDirect
            </Link>
          </Magnetic>
          <Link
            href="/websites"
            className="group inline-flex items-center gap-1 text-[15px] font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            See the websites
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              ›
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.28), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
