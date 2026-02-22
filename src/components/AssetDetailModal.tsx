"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { NewsModal } from "@/components/NewsModal";
import { SegmentedControl } from "@/components/SegmentedControl";
import { SparklineChart } from "@/components/SparklineChart";
import { DashboardNewsItem, allDashboardNews } from "@/lib/mock/news";
import { assetDetailsByTicker, supportedAssetTickers, SupportedAssetTicker } from "@/lib/mock/assets";
import { ChartPoint, Timeframe } from "@/lib/mock/portfolio";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function toChartPoints(series: number[], timeframe: Timeframe): ChartPoint[] {
  const now = new Date("2026-02-21T17:00:00+01:00");
  const stepByTf: Record<Timeframe, number> = {
    day: (8 * 3600 * 1000) / Math.max(series.length - 1, 1),
    week: (5 * 24 * 3600 * 1000) / Math.max(series.length - 1, 1),
    month: (30 * 24 * 3600 * 1000) / Math.max(series.length - 1, 1),
    year: (365 * 24 * 3600 * 1000) / Math.max(series.length - 1, 1),
    max: (5 * 365 * 24 * 3600 * 1000) / Math.max(series.length - 1, 1)
  };
  return series.map((value, i) => ({
    value,
    ts: new Date(now.getTime() - stepByTf[timeframe] * (series.length - 1 - i)).toISOString()
  }));
}

export function AssetDetailModal({
  ticker,
  initialTimeframe = "day",
  onOpenAsset,
  onClose
}: {
  ticker: SupportedAssetTicker | null;
  initialTimeframe?: Timeframe;
  onOpenAsset?: (ticker: string) => void;
  onClose: () => void;
}) {
  const [timeframe, setTimeframe] = useState<Timeframe>(initialTimeframe);
  const [scrubIdx, setScrubIdx] = useState<number | null>(null);
  const [starred, setStarred] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);
  const [newsPrevIndex, setNewsPrevIndex] = useState<number | null>(null);
  const [newsAnimationKey, setNewsAnimationKey] = useState(0);
  const [newsDirection, setNewsDirection] = useState<"next" | "prev">("next");
  const [newsAnimating, setNewsAnimating] = useState(false);
  const [newsHovering, setNewsHovering] = useState(false);
  const [newsAutoPlay, setNewsAutoPlay] = useState(true);
  const [selectedNews, setSelectedNews] = useState<DashboardNewsItem | null>(null);

  const asset = ticker ? assetDetailsByTicker[ticker] : null;

  useEffect(() => {
    if (!asset) return;
    setTimeframe(initialTimeframe);
    setScrubIdx(null);
    setNewsIndex(0);
    setNewsPrevIndex(null);
    setNewsAnimationKey(0);
    setNewsDirection("next");
    setNewsAnimating(false);
    setNewsHovering(false);
    setNewsAutoPlay(true);
    setSelectedNews(null);
  }, [asset?.ticker, initialTimeframe]);

  useEffect(() => {
    if (newsPrevIndex === null) return;
    setNewsAnimating(true);
    const timer = window.setTimeout(() => {
      setNewsAnimating(false);
      setNewsPrevIndex(null);
    }, 380);
    return () => window.clearTimeout(timer);
  }, [newsAnimationKey, newsPrevIndex]);

  useEffect(() => {
    if (!asset) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [asset, onClose]);

  const chartPoints = useMemo(() => {
    if (!asset) return [];
    return toChartPoints(asset.chartSeries[timeframe], timeframe);
  }, [asset, timeframe]);

  const currentPoint = chartPoints[scrubIdx ?? chartPoints.length - 1];

  const assetNews = useMemo(() => {
    if (!asset) return [];
    return allDashboardNews.filter((item) => (item.tickers ?? []).includes(asset.ticker)).slice(0, 8);
  }, [asset]);

  useEffect(() => {
    if (!asset || !newsAutoPlay || newsHovering || assetNews.length <= 1) return;
    const timer = window.setInterval(() => {
      setNewsPrevIndex(newsIndex);
      setNewsDirection("next");
      setNewsIndex((prev) => (prev + 1) % assetNews.length);
      setNewsAnimationKey((k) => k + 1);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [asset, newsAutoPlay, newsHovering, assetNews.length, newsIndex]);

  if (!asset) return null;

  const safeNewsIndex = assetNews.length > 0 ? ((newsIndex % assetNews.length) + assetNews.length) % assetNews.length : 0;
  const activeNews: DashboardNewsItem | null = assetNews.length > 0 ? assetNews[safeNewsIndex] : null;
  const isPosDay = asset.dayChangePct >= 0;
  const tickerStyle: Record<string, { bg: string; text: string; border: string }> = {
    BTC: { bg: "#FFF4E6", text: "#B45309", border: "#F59E0B" },
    ETH: { bg: "#EEF2FF", text: "#4338CA", border: "#818CF8" },
    NVDA: { bg: "#ECFDF3", text: "#166534", border: "#34D399" },
    SPY: { bg: "#E0F2FE", text: "#075985", border: "#38BDF8" },
    TSLA: { bg: "#FEF2F2", text: "#991B1B", border: "#F87171" },
    GLD: { bg: "#FFFBEB", text: "#92400E", border: "#FBBF24" },
    EUR: { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" }
  };
  const getDummyTitle = (item: DashboardNewsItem) => {
    const t = item.tags;
    if (t.includes("crypto")) return "Crypto moved a lot today";
    if (t.includes("rates")) return "Interest rates may affect your money";
    if (t.includes("earnings")) return "A big company shared its results";
    if (t.includes("ai") || t.includes("tech")) return "AI and tech stocks are in focus";
    if (t.includes("savings")) return "Savings products may change returns";
    if (t.includes("macro")) return "The economy could move markets this week";
    return "A market update that may affect your portfolio";
  };
  const guidanceTone = asset.guidance.label === "HOLD"
    ? { pill: "bg-emerald-100 text-emerald-800 border-emerald-300", bar: "bg-emerald-500", dot: "bg-emerald-500" }
    : asset.guidance.label === "WAIT"
      ? { pill: "bg-amber-100 text-amber-800 border-amber-300", bar: "bg-amber-500", dot: "bg-amber-500" }
      : asset.guidance.label === "REDUCE"
        ? { pill: "bg-rose-100 text-rose-800 border-rose-300", bar: "bg-rose-500", dot: "bg-rose-500" }
        : { pill: "bg-slate-200 text-slate-800 border-slate-400", bar: "bg-slate-500", dot: "bg-slate-500" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-3 py-4 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border bg-white p-3 shadow-xl md:p-4" style={{ borderColor: "var(--border-subtle)" }}>
        <button
          type="button"
          aria-label="Close asset detail"
          onClick={onClose}
          className="ml-auto block rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
        >
          ✕
        </button>

        <div className="grid gap-3 md:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-3">
            <Card className="p-4" variant="flat">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">
                    {asset.iconText}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{asset.type}</p>
                    <h3 className="text-lg font-semibold text-slate-900">{asset.name} ({asset.ticker})</h3>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Toggle watchlist"
                  onClick={() => setStarred((prev) => !prev)}
                  className="rounded-full border px-2 py-1 text-xs font-semibold transition hover:bg-slate-50"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
                >
                  {starred ? "★ Watchlist" : "☆ Watchlist"}
                </button>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <p className="text-2xl font-semibold text-slate-900">{money(currentPoint?.value ?? asset.price)}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${isPosDay ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                  {isPosDay ? "+" : ""}{asset.dayChangePct.toFixed(2)}%
                </span>
              </div>

              <div className="mt-3">
                <SegmentedControl value={timeframe} onChange={(value) => { setTimeframe(value); setScrubIdx(null); }} />
                <SparklineChart points={chartPoints} onScrub={setScrubIdx} />
              </div>
            </Card>

            <Card className="p-4" variant="flat">
              <h4 className="text-sm font-semibold text-slate-900">Your position</h4>
              <div className="mt-3 grid grid-cols-4 gap-2">
                <div className="rounded-lg border bg-slate-50 p-2" style={{ borderColor: "var(--border-subtle)" }}>
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">Buy price</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">{money(asset.position.avgBuy)}</p>
                </div>
                <div className="rounded-lg border bg-slate-50 p-2" style={{ borderColor: "var(--border-subtle)" }}>
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">Invested</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">{money(asset.position.invested)}</p>
                </div>
                <div className="rounded-lg border bg-slate-50 p-2" style={{ borderColor: "var(--border-subtle)" }}>
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">Quantity</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">{asset.position.qty}</p>
                </div>
                <div className="rounded-lg border bg-slate-50 p-2" style={{ borderColor: "var(--border-subtle)" }}>
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">Current value</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">{money(asset.position.currentValue)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4" variant="flat">
              <h4 className="text-sm font-semibold text-slate-900">About</h4>
              <p className="mt-2 text-sm leading-6 text-slate-700">{asset.descriptionLong}</p>
            </Card>
          </div>

          <div className="space-y-3">
            <Card className="p-4" variant="flat">
              <h4 className="text-sm font-semibold text-slate-900">AI brief</h4>
              <p className="mt-2 rounded-lg border bg-slate-50 p-3 text-sm leading-6 text-slate-700" style={{ borderColor: "var(--border-subtle)" }}>
                {asset.aiBrief}
              </p>
            </Card>

            <Card className="p-4" variant="flat">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-slate-900">Guidance</h4>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wide shadow-sm ${guidanceTone.pill}`}>
                  <span className={`h-2 w-2 rounded-full ${guidanceTone.dot}`} />
                  {asset.guidance.label}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  Confidence: {asset.guidance.confidencePct}%
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full ${guidanceTone.bar}`} style={{ width: `${asset.guidance.confidencePct}%` }} />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-700">{asset.guidance.summary}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                <li><span className="font-semibold text-slate-800">Upside scenario:</span> {asset.guidance.upside}</li>
                <li><span className="font-semibold text-slate-800">Downside scenario:</span> {asset.guidance.downside}</li>
              </ul>
              <p className="mt-2 text-[11px] text-slate-500">Educational guidance only, not financial advice.</p>
            </Card>

            <Card className="p-4" variant="flat">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-slate-900">Key news</h4>
                {assetNews.length > 1 ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {assetNews.map((_, index) => {
                        const active = index === ((newsIndex % assetNews.length) + assetNews.length) % assetNews.length;
                        return (
                          <button
                            key={`asset-news-dot-${index}`}
                            type="button"
                            aria-label={`Go to asset news ${index + 1}`}
                            onClick={() => {
                              setNewsPrevIndex(newsIndex);
                              setNewsDirection(index >= newsIndex ? "next" : "prev");
                              setNewsIndex(index);
                              setNewsAnimationKey((k) => k + 1);
                            }}
                            className="h-2 w-2 rounded-full transition"
                            style={{ background: active ? "var(--accent)" : "var(--border-subtle)" }}
                          />
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      aria-label="Previous asset news"
                      onClick={() => {
                        setNewsPrevIndex(newsIndex);
                        setNewsDirection("prev");
                        setNewsIndex((prev) => (prev - 1 + assetNews.length) % assetNews.length);
                        setNewsAnimationKey((k) => k + 1);
                      }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next asset news"
                      onClick={() => {
                        setNewsPrevIndex(newsIndex);
                        setNewsDirection("next");
                        setNewsIndex((prev) => (prev + 1) % assetNews.length);
                        setNewsAnimationKey((k) => k + 1);
                      }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      ›
                    </button>
                  </div>
                ) : null}
              </div>

              {activeNews ? (
                <div
                  key={`${activeNews.id}-${newsAnimationKey}`}
                  className="relative mt-2 h-[108px] overflow-hidden"
                  onMouseEnter={() => setNewsHovering(true)}
                  onMouseLeave={() => setNewsHovering(false)}
                  onClick={() => setSelectedNews(activeNews)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedNews(activeNews)}
                >
                  {newsAnimating && newsPrevIndex !== null && (
                    <div
                      className={`pointer-events-none absolute inset-0 row-inset ${newsDirection === "next"
                          ? "animate-[news-out-left_.38s_ease_forwards]"
                          : "animate-[news-out-right_.38s_ease_forwards]"
                        }`}
                    >
                      {(() => {
                        const prev = assetNews[((newsPrevIndex % assetNews.length) + assetNews.length) % assetNews.length];
                        return (
                          <div className="grid grid-cols-[1fr_auto] gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p style={{ color: "var(--text-tertiary)" }} className="text-[11px]">
                                  {prev.source} · {prev.timeAgo}
                                </p>
                              </div>
                              <p className="mt-1 clamp-2 text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                                {getDummyTitle(prev)}
                              </p>
                              <div className="mt-2 flex flex-wrap items-center gap-1">
                                {(prev.tickers ?? []).slice(0, 2).map((ticker) => {
                                  const t = ticker.toUpperCase();
                                  const style = tickerStyle[t] ?? { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" };
                                  const isSupported = supportedAssetTickers.includes(t as SupportedAssetTicker);
                                  return (
                                    <button
                                      key={`${prev.id}-${t}`}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isSupported) onOpenAsset?.(t);
                                      }}
                                      className="rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide"
                                      style={{ background: style.bg, color: style.text, borderColor: style.border }}
                                    >
                                      {t}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                            {prev.imageUrl && (
                              <div
                                className="flex h-[76px] w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-lg border"
                                style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}
                              >
                                <img src={prev.imageUrl} alt={prev.title} className="h-full w-full object-contain" loading="lazy" />
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  <div
                    className={`row-inset h-full ${newsAnimating && newsPrevIndex !== null
                        ? `absolute inset-0 ${newsDirection === "next"
                          ? "animate-[news-in-right_.38s_ease_forwards]"
                          : "animate-[news-in-left_.38s_ease_forwards]"
                        }`
                        : ""
                      }`}
                  >
                    <div className="grid grid-cols-[1fr_auto] gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p style={{ color: "var(--text-tertiary)" }} className="text-[11px]">
                            {activeNews.source} · {activeNews.timeAgo}
                          </p>
                        </div>
                        <p className="mt-1 clamp-2 text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                          {getDummyTitle(activeNews)}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          {(activeNews.tickers ?? []).slice(0, 2).map((ticker) => {
                            const t = ticker.toUpperCase();
                            const style = tickerStyle[t] ?? { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" };
                            const isSupported = supportedAssetTickers.includes(t as SupportedAssetTicker);
                            return (
                              <button
                                key={`${activeNews.id}-${t}`}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isSupported) onOpenAsset?.(t);
                                }}
                                className="rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide"
                                style={{ background: style.bg, color: style.text, borderColor: style.border }}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {activeNews.imageUrl && (
                        <div
                          className="flex h-[76px] w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-lg border"
                          style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}
                        >
                          <img src={activeNews.imageUrl} alt={activeNews.title} className="h-full w-full object-contain" loading="lazy" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">No related news available.</p>
              )}
            </Card>

          </div>
        </div>
      </div>
      <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} onOpenAsset={onOpenAsset} />
    </div>
  );
}
