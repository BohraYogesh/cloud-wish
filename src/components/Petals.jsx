import { useMemo } from 'react';

const colors = ['#f9a8c9', '#f4b6d2', '#e9a8d8', '#fcd5b0'];

export default function Petals({ count = 18 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        dur: 9 + Math.random() * 9,
        delay: -Math.random() * 15,
        dx: Math.random() * 80 - 40 + 'px',
        color: colors[i % colors.length],
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className="petal absolute"
          style={{
            left: p.left + '%',
            top: 0,
            width: p.size,
            height: p.size * 0.65,
            background: p.color,
            opacity: 0.7,
            borderRadius: '60% 40% 60% 40%',
            animation: `fall ${p.dur}s linear ${p.delay}s infinite`,
            '--dx': p.dx,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}