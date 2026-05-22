"use client";

const items = [
  "Custom Design",
  "Mobile First",
  "SEO Ready",
  "Fast Loading",
  "South African",
  "Premium Quality",
  "Conversion Focused",
  "Modern Tech",
  "100% Custom",
  "Built to Impress",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-6"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="marquee-track flex items-center gap-12 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              {item}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "var(--accent)", opacity: 0.5 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
