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
<<<<<<< HEAD
    <div className="inline-flex rounded-xl bg-slate-100 p-1">
      {labels.map((item) => (
        <button
          key={item.key}
          type="button"
          aria-label={`Set timeframe ${item.label}`}
          onClick={() => onChange(item.key)}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 ${
            value === item.key
              ? "bg-white text-teal-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {item.label}
        </button>
      ))}
=======
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
>>>>>>> aitor
    </div>
  );
}
