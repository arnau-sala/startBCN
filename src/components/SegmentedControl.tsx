import { Timeframe } from "@/lib/mock/portfolio";

const labels: Array<{ key: Timeframe; label: string }> = [
  { key: "day", label: "Day" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
  { key: "max", label: "Max" }
];

export function SegmentedControl({
  value,
  onChange
}: {
  value: Timeframe;
  onChange: (value: Timeframe) => void;
}) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1">
      {labels.map((item) => (
        <button
          key={item.key}
          type="button"
          aria-label={`Set timeframe ${item.label}`}
          onClick={() => onChange(item.key)}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 ${
            value === item.key
              ? "bg-white text-[var(--n26-teal-dark)] shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
