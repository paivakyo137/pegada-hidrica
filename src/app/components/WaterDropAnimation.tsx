"use client";

const DROPS = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 5.7) % 100}%`,
  delay: `${(index * 0.45) % 6}s`,
  duration: `${7 + (index % 5)}s`,
  size: 8 + (index % 7) * 2,
}));

export function WaterDropAnimation({ dense = false }: { dense?: boolean }) {
  const drops = dense ? DROPS : DROPS.slice(0, 12);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute top-1/3 left-1/2 size-64 -translate-x-1/2 rounded-full border border-sky-300/30 ripple" />
      <div className="absolute top-1/3 left-1/2 size-64 -translate-x-1/2 rounded-full border border-sky-400/20 ripple [animation-delay:1.1s]" />
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="drop absolute top-[-8%] rounded-b-full rounded-t-[45%] bg-gradient-to-b from-water-light to-water opacity-70"
          style={{
            left: drop.left,
            width: drop.size,
            height: drop.size * 1.35,
            animationDelay: drop.delay,
            animationDuration: drop.duration,
          }}
        />
      ))}
    </div>
  );
}
