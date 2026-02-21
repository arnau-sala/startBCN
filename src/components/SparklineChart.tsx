"use client";

import { useCallback, useRef, useState } from "react";
import { ChartPoint } from "@/lib/mock/portfolio";

/* ── Colour tokens ─────────────────────────────────────────────────────────
   Matches the dark petrol-teal visible in the reference image.
   Change CHART_COLOR here to affect all layers consistently.
────────────────────────────────────────────────────────────────────────── */
const CHART_COLOR = "#1d6e7a";   // dark petrol-teal (matches reference)
const FUTURE_OPACITY = 0.22;        // dimmed future segment
const DOT_R = 5;           // visible dot radius
const HIT_R = 16;          // accessible touch hit-area radius
const W = 640;
const H = 128;

interface Props {
  points: ChartPoint[];
  onScrub?: (index: number | null) => void;
}

export function SparklineChart({ points, onScrub }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* ── Geometry helpers ───────────────────────────────────────────────── */
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);

  const toX = (i: number) => (i / (points.length - 1)) * W;
  const toY = (v: number) => H - ((v - min) / range) * (H * 0.85) - H * 0.05;

  /* Full line (used for the dim "future" layer and fill) */
  const fullPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(2)},${toY(p.value).toFixed(2)}`)
    .join(" ");

  const fillPath = `${fullPath} L ${W},${H} L 0,${H} Z`;

  /* Past slice (index 0 → activeIdx, inclusive) */
  const cutIdx = activeIdx !== null ? activeIdx : points.length - 1;
  const pastPath = points
    .slice(0, cutIdx + 1)
    .map((p, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(2)},${toY(p.value).toFixed(2)}`)
    .join(" ");

  /* Active dot coords */
  const activeX = toX(cutIdx);
  const activeY = toY(points[cutIdx].value);

  /* ── Pointer → index mapping ────────────────────────────────────────── */
  const resolveIdx = useCallback(
    (clientX: number): number => {
      const svg = svgRef.current;
      if (!svg) return points.length - 1;
      const rect = svg.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(ratio * (points.length - 1));
    },
    [points.length]
  );

  const activate = (clientX: number) => {
    const idx = resolveIdx(clientX);
    setActiveIdx(idx);
    onScrub?.(idx);
  };

  const deactivate = () => {
    setActiveIdx(null);
    onScrub?.(null);
  };

  return (
    <div className="relative mt-4 select-none" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-28 w-full cursor-crosshair touch-none"
        role="img"
        aria-label="Portfolio trend chart"
        onMouseMove={(e) => activate(e.clientX)}
        onMouseLeave={deactivate}
        onTouchMove={(e) => { e.preventDefault(); activate(e.touches[0].clientX); }}
        onTouchEnd={deactivate}
      >
        {/* ── Area fill (subtle gradient, always full) ─────────────────── */}
        <defs>
          <linearGradient id="n26Fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLOR} stopOpacity="0.12" />
            <stop offset="100%" stopColor={CHART_COLOR} stopOpacity="0.00" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill="url(#n26Fill)" />

        {/* ── LAYER A: Future segment — dim ────────────────────────────── */}
        <path
          d={fullPath}
          fill="none"
          stroke={CHART_COLOR}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={FUTURE_OPACITY}
        />

        {/* ── LAYER B: Past segment — full opacity ─────────────────────── */}
        <path
          d={pastPath}
          fill="none"
          stroke={CHART_COLOR}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="1"
        />

        {/* ── Scrub active dot (always rendered at cutIdx) ─────────────── */}
        {/* Invisible large hit-area for accessibility */}
        <circle cx={activeX} cy={activeY} r={HIT_R} fill="transparent" />
        {/* Outer ring */}
        <circle
          cx={activeX}
          cy={activeY}
          r={DOT_R + 2.5}
          fill="white"
          stroke={CHART_COLOR}
          strokeWidth="2"
          style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,.16))" }}
        />
        {/* Inner filled dot */}
        <circle cx={activeX} cy={activeY} r={DOT_R - 1.5} fill={CHART_COLOR} />
      </svg>
    </div>
  );
}
