export function SparklineChart({ points }: { points: number[] }) {
  const width = 640;
  const height = 130;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(max - min, 1);

  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-2">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-28 w-full" role="img" aria-label="Portfolio trend chart">
        <defs>
          <linearGradient id="sparklineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1aa7a1" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1aa7a1" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <path d={`${path} L ${width},${height} L 0,${height} Z`} fill="url(#sparklineFill)" />
        <path d={path} fill="none" stroke="#1aa7a1" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
