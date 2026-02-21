import { DashboardNewsItem } from "@/lib/mock/news";

export function NewsModal({
  item,
  onClose
}: {
  item: DashboardNewsItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30 px-4">
      <div className="w-full max-w-2xl scale-100 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl transition">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-teal-700">{item.source}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
          </div>
          <button
            type="button"
            aria-label="Close news detail modal"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-700">{item.detail}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={`${item.id}-${tag}`} className="rounded-full bg-teal-50 px-2.5 py-1 text-xs text-teal-700">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" className="rounded-lg bg-teal-600 px-3 py-2 text-sm text-white transition hover:bg-teal-700">
            Simplify
          </button>
          <button type="button" className="rounded-lg border border-teal-600 px-3 py-2 text-sm text-teal-700 transition hover:bg-teal-50">
            Explain terms
          </button>
        </div>
      </div>
    </div>
  );
}
