import { RankedNewsItem } from "@/lib/types";

export function AlertsPanel({ matches, alerts }: { matches: RankedNewsItem[]; alerts: string[] }) {
  return (
    <section className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Alerts</p>
      <h2 className="mt-1 text-lg font-semibold text-slate-900">Alert matches</h2>
      <p className="mt-1 text-sm text-slate-600">Alertas activas: {alerts.join(", ")}</p>

      <div className="mt-4 space-y-2">
        {matches.length === 0 && (
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
            No hay alertas activadas por ahora.
          </p>
        )}
        {matches.map((item) => (
          <div key={item.id} className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
            <p className="text-sm font-semibold text-rose-800">{item.title}</p>
            <p className="mt-1 text-xs text-rose-700">
              Match por tags/tickers: {item.tags.join(", ")} {item.tickers.join(" ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
