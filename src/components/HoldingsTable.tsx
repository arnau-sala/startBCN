import { HoldingItem } from "@/lib/mock/portfolio";

function money(value: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

function pct(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function HoldingsTable({
  items,
  totalInvested,
  onViewMore
}: {
  items: HoldingItem[];
  totalInvested: number;
  onViewMore: () => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Total invested</p>
          <p className="text-base font-semibold text-slate-900">{money(totalInvested)}</p>
        </div>
        <p className="text-xs text-slate-500">Since buy</p>
      </div>

      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-4 items-center rounded-xl bg-slate-50 px-2.5 py-1.5 text-xs">
            <div className="col-span-2">
              <p className="font-medium text-slate-900 clamp-1">{item.name}</p>
              <p className="text-xs text-slate-500">{item.ticker}</p>
            </div>
            <p className="text-right text-slate-700">{money(item.valueEur)}</p>
            <div className="text-right">
              <p className={item.plEur >= 0 ? "text-emerald-600" : "text-rose-600"}>
                {item.plEur >= 0 ? "+" : ""}
                {money(item.plEur)}
              </p>
              <p className={`text-xs ${item.plPct >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{pct(item.plPct)}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="View more holdings"
        onClick={onViewMore}
        className="mt-3 rounded-lg border border-teal-600 px-3 py-1.5 text-xs text-teal-700 transition hover:bg-teal-50"
      >
        View more
      </button>
    </div>
  );
}
