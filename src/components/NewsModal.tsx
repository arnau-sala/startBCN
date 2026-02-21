import { DashboardNewsItem } from "@/lib/mock/news";
import { holdings } from "@/lib/mock/portfolio";

function getDummyBullets(item: DashboardNewsItem) {
  const t = item.tags;
  if (t.includes("crypto")) {
    return [
      "Crypto moved fast after traders reduced risk.",
      "Short-term volatility is higher than usual."
    ];
  }
  if (t.includes("rates")) {
    return [
      "Rate expectations changed market pricing.",
      "Risky assets may cool while savings can improve."
    ];
  }
  if (t.includes("earnings")) {
    return [
      "Quarterly results beat/missed expectations.",
      "Price moves depend on guidance, not only results."
    ];
  }
  if (t.includes("ai") || t.includes("tech")) {
    return [
      "AI/tech momentum remains a market driver.",
      "Related stocks often move together."
    ];
  }
  if (t.includes("macro")) {
    return [
      "Macro headlines can move many assets at once.",
      "Expectation shifts drive most of the reaction."
    ];
  }
  return [
    "This headline can shift short-term sentiment.",
    "Expect temporary volatility around the news."
  ];
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

function getAffectedCryptoHoldings(assets: string[]) {
  const crypto = new Set(["BTC", "ETH", "SOL", "ADA", "XRP", "DOGE", "AVAX", "DOT", "MATIC"]);
  return assets.filter((asset) => crypto.has(asset));
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
  onClose
}: {
  item: DashboardNewsItem | null;
  onClose: () => void;
}) {
  if (!item) return null;
  const portfolioView = getAffectAndAction(item);
  const affectedHoldings = getAffectedHoldings(item);
  const affectedCrypto = getAffectedCryptoHoldings(affectedHoldings);
  const confidence = getConfidence(item);
  const whyMatters = getWhyMattersToYou(item, affectedHoldings);
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
            </div>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
            <div className="mt-2 rounded-lg border border-teal-100 bg-teal-50 px-3 py-2">
              <p className="clamp-1 text-sm text-teal-800">
                <span className="font-semibold text-teal-700">Why this matters to you:</span> {whyMatters}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold uppercase tracking-wide text-slate-500">Tags</span>
                {item.tags.map((tag) => (
                  <span key={`top-tag-${item.id}-${tag}`} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold uppercase tracking-wide text-slate-500">Affected crypto</span>
                {affectedCrypto.length > 0 ? (
                  affectedCrypto.map((ticker) => (
                    <span
                      key={`top-affected-crypto-${item.id}-${ticker}`}
                      className="rounded-md border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-700"
                    >
                      {ticker}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500">No direct crypto impacted</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
          <div className="h-full rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">TL;DR (30 sec explanation)</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              {getDummyBullets(item).map((bullet, index) => (
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
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className={`inline-flex items-center gap-1 rounded-full border border-current/30 bg-white/60 px-2 py-0.5 text-[11px] ${actionTone.text}`}>
                  📈 Longer timeframe
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full border border-current/30 bg-white/60 px-2 py-0.5 text-[11px] ${actionTone.text}`}>
                  📰 Related news
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full border border-current/30 bg-white/60 px-2 py-0.5 text-[11px] ${actionTone.text}`}>
                  🤖 Ask assistant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
