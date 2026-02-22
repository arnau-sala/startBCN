import { useEffect, useState } from "react";
import { DashboardNewsItem } from "@/lib/mock/news";
import { holdings } from "@/lib/mock/portfolio";
import { supportedAssetTickers, SupportedAssetTicker } from "@/lib/mock/assets";

function getTickerStyle(ticker: string) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    BTC: { bg: "#FFF4E6", text: "#B45309", border: "#F59E0B" },
    ETH: { bg: "#EEF2FF", text: "#4338CA", border: "#818CF8" },
    NVDA: { bg: "#ECFDF3", text: "#166534", border: "#34D399" },
    SPY: { bg: "#E0F2FE", text: "#075985", border: "#38BDF8" },
    TSLA: { bg: "#FEF2F2", text: "#991B1B", border: "#F87171" },
    GLD: { bg: "#FFFBEB", text: "#92400E", border: "#FBBF24" },
    EUR: { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" }
  };
  return map[ticker.toUpperCase()] ?? { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" };
}



type Recommendation = "hold" | "wait" | "reduce";

function getAffectAndAction(item: DashboardNewsItem): {
  affect: string;
  action: string;
  recommendation: Recommendation;
} {
  const t = item.tags;
  if (t.includes("crypto")) {
    return {
      affect: "Your crypto bucket may stay more volatile than usual.",
      action: "Reduce risk on big spikes and avoid impulse entries.",
      recommendation: "reduce"
    };
  }
  if (t.includes("rates")) {
    return {
      affect: "Rate-sensitive assets can stay unstable in the short term.",
      action: "Wait for policy clarity before increasing risk.",
      recommendation: "wait"
    };
  }
  if (t.includes("earnings")) {
    return {
      affect: "Single-stock moves can be sharper after results.",
      action: "Wait for confirmation before increasing exposure.",
      recommendation: "wait"
    };
  }
  if (t.includes("ai") || t.includes("tech")) {
    return {
      affect: "AI/tech momentum can increase concentration risk in your portfolio.",
      action: "Hold quality names, but cap overweight positions.",
      recommendation: "hold"
    };
  }
  if (t.includes("macro")) {
    return {
      affect: "Macro shocks can move many positions together.",
      action: "Reduce leverage and keep liquidity buffer.",
      recommendation: "reduce"
    };
  }
  return {
    affect: "Short-term risk/reward can change quickly after this headline.",
    action: "Hold your plan and avoid reactive trading.",
    recommendation: "hold"
  };
}

function getAffectedHoldings(item: DashboardNewsItem) {
  const held = new Set(holdings.map((h) => h.ticker.toUpperCase()));
  return (item.tickers ?? [])
    .map((ticker) => ticker.toUpperCase())
    .filter((ticker) => held.has(ticker));
}

function getConfidence(item: DashboardNewsItem): "High" | "Medium" {
  if (item.tags.includes("crypto") || item.tags.includes("rates") || item.tags.includes("earnings")) {
    return "High";
  }
  return "Medium";
}

function getWhyMattersToYou(item: DashboardNewsItem, affectedHoldings: string[]) {
  if (affectedHoldings.length > 0) {
    return `Because you hold ${affectedHoldings.join(" & ")} and this topic can move those positions.`;
  }
  if (item.tags.includes("crypto")) return "Because you follow crypto themes in your feed.";
  if (item.tags.includes("ai") || item.tags.includes("tech")) return "Because you track AI/tech market moves.";
  if (item.tags.includes("rates")) return "Because rates can affect most portfolio allocations.";
  return "Because this headline can change short-term market risk conditions.";
}



export function NewsModal({
  item,
  onOpenAsset,
  onClose
}: {
  item: DashboardNewsItem | null;
  onOpenAsset?: (ticker: string) => void;
  onClose: () => void;
}) {
  const [showFullArticle, setShowFullArticle] = useState(false);

  useEffect(() => {
    if (!item) return;
    setShowFullArticle(false);
  }, [item?.id]);

  if (!item) return null;
  const portfolioView = getAffectAndAction(item);
  const affectedHoldings = getAffectedHoldings(item);
  const confidence = getConfidence(item);
  const whyMatters = getWhyMattersToYou(item, affectedHoldings);
  const technicalArticle = item.fullArticle;
  const actionTone = portfolioView.recommendation === "reduce"
    ? {
      wrapper: "border-red-100 bg-red-50",
      label: "text-red-700",
      text: "text-red-800",
      pill: "bg-red-100 text-red-700",
      pillText: "Reduce"
    }
    : portfolioView.recommendation === "wait"
      ? {
        wrapper: "border-amber-100 bg-amber-50",
        label: "text-amber-700",
        text: "text-amber-800",
        pill: "bg-amber-100 text-amber-700",
        pillText: "Wait"
      }
      : {
        wrapper: "border-emerald-100 bg-emerald-50",
        label: "text-emerald-700",
        text: "text-emerald-800",
        pill: "bg-emerald-100 text-emerald-700",
        pillText: "Hold"
      };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30 px-2 md:px-4">
      <div className="w-full max-w-4xl scale-100 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-xl transition md:max-h-[88vh] md:p-4">
        <button
          type="button"
          aria-label="Close news detail modal"
          onClick={onClose}
          className="ml-auto block rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
        >
          ✕
        </button>

        <div className="grid gap-3 md:grid-cols-[220px_1fr]">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full min-h-[130px] w-full object-cover"
              />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs text-slate-500">{item.source} · {item.timeAgo}</p>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                Confidence: {confidence}
              </span>
              <button
                type="button"
                onClick={() => setShowFullArticle((prev) => !prev)}
                className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[10px] font-semibold text-teal-700 transition hover:bg-teal-100"
              >
                {showFullArticle ? "Hide full article" : "Read full article"}
              </button>
            </div>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 clamp-1 text-sm text-teal-800">
              <span className="font-semibold text-teal-700">Why this matters to you:</span> {whyMatters}
            </p>
            <div className="mt-2 space-y-1.5 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold uppercase tracking-wide text-slate-500">Tags</span>
                {item.tags.map((tag) => (
                  <span key={`top-tag-${item.id}-${tag}`} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold uppercase tracking-wide text-slate-500">Affected assets</span>
                {affectedHoldings.length > 0 ? (
                  affectedHoldings.map((ticker) => (
                    (() => {
                      const style = getTickerStyle(ticker);
                      const isSupported = supportedAssetTickers.includes(ticker as SupportedAssetTicker);
                      return (
                        <button
                          key={`top-affected-asset-${item.id}-${ticker}`}
                          type="button"
                          onClick={() => {
                            if (isSupported) onOpenAsset?.(ticker);
                          }}
                          className="rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide"
                          style={{ background: style.bg, color: style.text, borderColor: style.border }}
                        >
                          {ticker}
                        </button>
                      );
                    })()
                  ))
                ) : (
                  <span className="text-slate-500">No direct asset impacted</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
          <div className="h-full p-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Simple explanation</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              {item.simpleBullets.map((bullet: string, index: number) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
                    {index + 1}
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full flex-col gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Impact on your portfolio</p>
              <p className="mt-1 text-sm text-slate-700">{portfolioView.affect}</p>
            </div>

            <div className={`rounded-lg border p-3 ${actionTone.wrapper}`}>
              <div className="flex items-center justify-between gap-2">
                <p className={`text-xs font-semibold uppercase tracking-wide ${actionTone.label}`}>What to do with my assets</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${actionTone.pill}`}>
                  {actionTone.pillText}
                </span>
              </div>
              <p className={`mt-1 text-sm ${actionTone.text}`}>{portfolioView.action}</p>
            </div>
          </div>
        </div>

        {showFullArticle && (
          <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Full article
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">{technicalArticle.subtitle}</p>
            <div className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
              {technicalArticle.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
