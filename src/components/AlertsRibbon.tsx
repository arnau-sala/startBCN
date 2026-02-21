import { AlertBanner } from "@/lib/mock/alerts";

const toneStyles: Record<AlertBanner["tone"], string> = {
  negative: "border-rose-200 bg-rose-50 text-rose-700",
  positive: "border-emerald-200 bg-emerald-50 text-emerald-700",
  neutral: "border-indigo-200 bg-indigo-50 text-indigo-700"
};

export function AlertsRibbon({ alerts }: { alerts: AlertBanner[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`min-w-56 rounded-xl border px-3 py-2 text-sm ${toneStyles[alert.tone]} transition hover:shadow-sm`}
        >
          <p className="font-medium">
            <span className="mr-1">{alert.icon}</span>
            {alert.title}
          </p>
          <p className="mt-1 text-xs text-slate-600">{alert.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
