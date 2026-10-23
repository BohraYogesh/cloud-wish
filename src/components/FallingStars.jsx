import { useMemo } from 'react';

const colors = ['#fbbf24', '#f9a8d4', '#ffffff', '#c4b5fd'];

export default function FallingStars({ count = 16 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 8, // chhote stars (6-14px)
        dur: 6 + Math.random() * 7,
        delay: -Math.random() * 12,
        dx: Math.random() * 40 - 20 + 'px',
        color: colors[i % colors.length],
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <svg
          key={s.id}
          viewBox="0 0 24 24"
          className="petal absolute"
          style={{
            left: s.left + '%',
            top: 0,
            width: s.size,
            height: s.size,
            fill: s.color,
            filter: 'drop-shadow(0 0 3px rgba(251,191,36,.6))',
            animation: `fall ${s.dur}s linear ${s.delay}s infinite`,
            '--dx': s.dx,
            willChange: 'transform',
          }}
        >
          <polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" />
        </svg>
      ))}
    </div>
  );
}