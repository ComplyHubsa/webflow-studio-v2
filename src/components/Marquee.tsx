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
        borderTop: "1px solid rgba(108,99,255,0.18)",
        borderBottom: "1px solid rgba(108,99,255,0.18)",
        background: "linear-gradient(135deg, #f0f0ff 0%, #e8e4ff 40%, #f5f0ff 100%)",
      }}
    >
      <div className="marquee-track flex items-center gap-12 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#6b6890" }}
            >
              {item}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#6c63ff", opacity: 0.45 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
