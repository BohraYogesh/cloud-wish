// Pure SVG cloud: koi image file nahi chahiye. tone: 'pink' | 'blue'
export default function Cloud({ tone = 'pink', className = '', style }) {
  const c = tone === 'pink' ? ['#fde2ea', '#f8bfd2'] : ['#f0f9ff', '#bfe3fb'];
  const id = `cloud-${tone}`;
  return (
    <svg
      viewBox="0 0 140 80"
      className={className}
      style={{ filter: 'drop-shadow(0 6px 8px rgba(236,120,160,.25))', ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c[0]} />
          <stop offset="1" stopColor={c[1]} />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <circle cx="38" cy="50" r="24" />
        <circle cx="68" cy="34" r="28" />
        <circle cx="100" cy="48" r="24" />
        <circle cx="20" cy="58" r="14" />
        <circle cx="120" cy="58" r="14" />
        <rect x="20" y="50" width="100" height="24" rx="12" />
      </g>
    </svg>
  );
}
