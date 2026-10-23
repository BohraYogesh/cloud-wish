import { useMemo } from 'react';

const colors = ['#f472b6', '#fb7185', '#f9a8d4', '#fda4af'];

export default function FallingHearts({ count = 12 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 10, // 8-18px
        dur: 7 + Math.random() * 8,
        delay: -Math.random() * 14,
        dx: Math.random() * 50 - 25 + 'px',
        color: colors[i % colors.length],
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <svg
          key={h.id}
          viewBox="0 0 24 24"
          className="petal absolute"
          style={{
            left: h.left + '%',
            top: 0,
            width: h.size,
            height: h.size,
            fill: h.color,
            opacity: 0.85,
            filter: 'drop-shadow(0 0 3px rgba(244,114,182,.5))',
            animation: `fall ${h.dur}s linear ${h.delay}s infinite`,
            '--dx': h.dx,
            willChange: 'transform',
          }}
        >
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.3 4.5c2 0 3.8 1.1 5.7 3.3 1.9-2.2 3.7-3.3 5.7-3.3 3.6 0 5.4 3.9 3.9 7.3C19.5 16.4 12 21 12 21z" />
        </svg>
      ))}
    </div>
  );
}