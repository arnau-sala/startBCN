import { RankedNewsItem, UserProfile } from "@/lib/types";
import { SimplifyPanel } from "@/components/SimplifyPanel";
import { supportedAssetTickers, SupportedAssetTicker } from "@/lib/mock/assets";

const relevanceStyles = {
  High: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-slate-100 text-slate-600"
};

export function NewsCard({
  item,
  profile,
  onOpenAsset
}: {
  item: RankedNewsItem;
  profile: UserProfile;
  onOpenAsset?: (ticker: string) => void;
}) {
  const isAlert = profile.alerts.some((alert) =>
    `${item.title} ${item.tags.join(" ")} ${item.tickers.join(" ")}`
      .toLowerCase()
      .includes(alert.toLowerCase())
  );

  return (
    <article className="card space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${relevanceStyles[item.relevanceLabel]}`}>
          {item.relevanceLabel} relevance ({item.relevanceScore})
        </span>
        {isAlert && <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">ALERT</span>}
        <span className="chip">{item.source}</span>
        <span className="chip">{item.difficulty}</span>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{item.shortSummary}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={`${item.id}-${tag}`} className="chip">
            #{tag}
          </span>
        ))}
        {item.tickers.map((ticker) => (
          <button
            key={`${item.id}-${ticker}`}
            type="button"
            onClick={() => {
              if (supportedAssetTickers.includes(ticker.toUpperCase() as SupportedAssetTicker)) onOpenAsset?.(ticker);
            }}
            className="chip bg-indigo-100 text-indigo-700"
          >
            {ticker}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-700">
        <span className="font-semibold">Why for you:</span> {item.reason}
      </p>

      <SimplifyPanel news={item} profile={profile} />
    </article>
  );
}
