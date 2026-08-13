"use client";

const lines = [
  "Stage worlds",
  "LED architecture",
  "Truss intelligence",
  "Expo gravity",
  "Power discipline",
  "Pan-India crews",
  "48-hour concepts",
  "Zero show failures",
];

export function ManifestoStrip() {
  const loop = [...lines, ...lines];
  return (
    <div className="overflow-hidden border-y border-line bg-sand py-4">
      <div className="marquee gap-10">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          </span>
        ))}
      </div>
    </div>
  );
}
