import { LegalDigestItem } from "@/lib/mock/legalDocs";
import { holdings } from "@/lib/mock/portfolio";
import { supportedAssetTickers, SupportedAssetTicker } from "@/lib/mock/assets";

function getTickerStyle(ticker: string) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    BTC: { bg: "#FFF4E6", text: "#B45309", border: "#F59E0B" },
    ETH: { bg: "#EEF2FF", text: "#4338CA", border: "#818CF8" },
    NVDA: { bg: "#ECFDF3", text: "#166534", border: "#34D399" },
    MSFT: { bg: "#E0F2FE", text: "#075985", border: "#38BDF8" },
    TSLA: { bg: "#FEF2F2", text: "#991B1B", border: "#F87171" },
    GLD: { bg: "#FFFBEB", text: "#92400E", border: "#FBBF24" },
    EUR: { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" }
  };
  return map[ticker.toUpperCase()] ?? { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" };
}

function getPortfolioImpactForLegal(item: LegalDigestItem, affectedHeldAssets: string[]) {
  if (affectedHeldAssets.length > 0) {
    return `This update can directly impact your ${affectedHeldAssets.join(", ")} exposure through compliance, liquidity, or execution conditions.`;
  }
  if (item.severity === "high") {
    return "This can indirectly affect portfolio volatility and execution quality across related assets in the short term.";
  }
  if (item.severity === "medium") {
    return "This may have a moderate indirect effect on portfolio conditions, mainly through regulation and market structure changes.";
  }
  return "This is mostly contextual for now, but it can still influence sentiment and risk conditions over time.";
}

export function LegalDocModal({
  item,
  onOpenAsset,
  onClose
}: {
  item: LegalDigestItem | null;
  onOpenAsset?: (ticker: string) => void;
  onClose: () => void;
}) {
  if (!item) return null;
  const held = new Set(holdings.map((h) => h.ticker.toUpperCase()));
  const affectedHeldAssets = item.affectedAssets
    .map((asset) => asset.toUpperCase())
    .filter((asset) => held.has(asset));
  const portfolioImpact = getPortfolioImpactForLegal(item, affectedHeldAssets);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-teal-700">Regulatory Guardian</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.dummyTitle}</h3>
            <p className="mt-1 text-xs text-slate-500">
              {item.source} · Deadline {item.deadline} · {item.pages} pages
            </p>
          </div>
          <button
            type="button"
            aria-label="Close legal summary modal"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Key points (ELI10)</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
            {item.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </div>

        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Action required</p>
          <p className="mt-1 text-sm text-amber-800">{item.requiredAction}</p>
        </div>

        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">How it affects your portfolio</p>
          <p className="mt-1 text-sm text-slate-700">{portfolioImpact}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Affected assets</p>
            {affectedHeldAssets.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {affectedHeldAssets.map((asset) => (
                  (() => {
                    const style = getTickerStyle(asset);
                    const isSupported = supportedAssetTickers.includes(asset as SupportedAssetTicker);
                    return (
                      <button
                        key={`legal-affected-${item.id}-${asset}`}
                        type="button"
                        onClick={() => {
                          if (isSupported) onOpenAsset?.(asset);
                        }}
                        className="rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide"
                        style={{ background: style.bg, color: style.text, borderColor: style.border }}
                      >
                        {asset}
                      </button>
                    );
                  })()
                ))}
              </div>
            ) : (
              <p className="mt-1 text-xs text-slate-500">No direct asset impacted</p>
            )}
          </div>
          <a
            href={item.fullDocumentUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-teal-600 px-3 py-1.5 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
          >
            Open full document
          </a>
        </div>
      </div>
    </div>
  );
}
