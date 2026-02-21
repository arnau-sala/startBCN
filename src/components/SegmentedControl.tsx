import { Timeframe } from "@/lib/mock/portfolio";

const labels: Array<{ key: Timeframe; label: string }> = [
  { key: "day", label: "1D" },
  { key: "week", label: "1W" },
  { key: "month", label: "1M" },
  { key: "year", label: "1Y" },
  { key: "max", label: "5Y" }
];

export function SegmentedControl({
  value,
  onChange
}: {
  value: Timeframe;
  onChange: (value: Timeframe) => void;
}) {
  return (
    <div
      className="flex w-full rounded-full p-[3px]"
      style={{ background: "var(--surface-sunken)" }}
      role="tablist"
      aria-label="Time range"
    >
      {labels.map((item) => {
        const isActive = value === item.key;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Timeframe ${item.label}`}
            onClick={() => onChange(item.key)}
            className="flex-1 rounded-full py-1.5 text-xs font-semibold transition-all duration-200"
            style={{
              background: isActive ? "var(--surface-raised)" : "transparent",
              color: isActive ? "var(--accent-dark)" : "var(--text-tertiary)",
              boxShadow: isActive ? "0 1px 3px rgba(0,0,0,.10)" : "none"
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
