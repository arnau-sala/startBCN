import { DashboardNewsItem } from "@/lib/mock/news";

export function NewsCarousel({
  title,
  items,
  index,
  onPrev,
  onNext,
  onOpen,
  onEli10,
  whyForYou
}: {
  title: string;
  items: DashboardNewsItem[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onOpen: (item: DashboardNewsItem) => void;
  onEli10: (item: DashboardNewsItem) => void;
  whyForYou?: (item: DashboardNewsItem) => string;
}) {
  const current = items[index % items.length];
  const visibleTags = current.tags.slice(0, 2);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous news" onClick={onPrev} className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50">
            {"<"}
          </button>
          <button type="button" aria-label="Next news" onClick={onNext} className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50">
            {">"}
          </button>
          <button type="button" className="n26-link text-xs">
            See all
          </button>
        </div>
      </div>

      <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:bg-slate-100">
        <p className="text-[11px] text-slate-500">
          {current.source} · {current.timeAgo}
        </p>
        <button type="button" onClick={() => onOpen(current)} className="mt-1 w-full text-left">
          <p className="clamp-2 text-sm font-semibold text-slate-900">{current.title}</p>
        </button>
        {whyForYou && <p className="mt-1 clamp-1 text-[11px] text-teal-700">{whyForYou(current)}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {visibleTags.map((tag) => (
            <span key={`${current.id}-${tag}`} className="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] text-teal-700">
              #{tag}
            </span>
          ))}
          <button
            type="button"
            onClick={() => onEli10(current)}
            className="ml-auto rounded-md border border-teal-600 px-2 py-0.5 text-[11px] text-teal-700 hover:bg-teal-50"
          >
            ELI10
          </button>
        </div>
      </div>
    </div>
  );
}
