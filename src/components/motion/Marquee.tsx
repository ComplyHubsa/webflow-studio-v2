"use client";

import { useReducedMotion } from "framer-motion";

/* An endlessly scrolling row.

   The children are rendered twice and the track is translated by exactly -50%,
   so the moment the first copy leaves, the second is in precisely the position
   the first started from and the loop is invisible. Any other offset shows a
   jump every cycle.

   Pauses on hover, because everything in here is a link and chasing a moving
   target is a genuinely bad experience. Reduced-motion gets a plain scrollable
   row instead. */
export default function Marquee({
  children,
  speed = 46,
  className = "",
}: {
  children: React.ReactNode;
  /** Seconds for one full pass. Higher = slower. */
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex gap-5 overflow-x-auto pb-2 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        // Fade the ends so cards enter and leave instead of being cut off.
        maskImage:
          "linear-gradient(90deg, transparent 0, #000 90px, #000 calc(100% - 90px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, #000 90px, #000 calc(100% - 90px), transparent 100%)",
      }}
    >
      {/* No gap on the track itself — each copy carries its own trailing
          pr-5 so the spacing between the two copies matches the spacing
          inside them. With a gap here instead, the track is
          2*copy + gap wide and -50% lands half a gap short, which shows as a
          jump once per cycle. */}
      <div
        className="flex w-max marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex gap-5 pr-5 shrink-0">{children}</div>
        <div className="flex gap-5 pr-5 shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track {
          animation-name: marqueeScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
