"use client";

import { HoldingItem } from "@/lib/mock/portfolio";
import { allDashboardNews } from "@/lib/mock/news";
import { PanicInlineCard } from "@/components/PanicInlineCard";
import { useEffect, useRef, useState } from "react";

export type HoldingsViewMode = "sinceBuy" | "today";

function money(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function pct(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function HoldingsModeToggle({
  mode,
  onChange
}: {
  mode: HoldingsViewMode;
  onChange: (m: HoldingsViewMode) => void;
}) {
  return (
    <div
      className="flex rounded-full p-[3px]"
      style={{ background: "var(--surface-sunken)" }}
      role="tablist"
      aria-label="Performance period"
    >
      {(["sinceBuy", "today"] as HoldingsViewMode[]).map((m) => {
        const isActive = mode === m;
        return (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(m)}
            className="rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-150"
            style={{
              background: isActive ? "var(--surface-raised)" : "transparent",
              color: isActive ? "var(--accent-dark)" : "var(--text-tertiary)",
              boxShadow: isActive ? "0 1px 3px rgba(0,0,0,.10)" : "none"
            }}
          >
            {m === "sinceBuy" ? "Since buy" : "Today"}
          </button>
        );
      })}
    </div>
  );
}

export function HoldingsTable({
  items,
  mode,
  onViewMore,
  onOpenAssetDetails,
  enabledDetailTickers = [],
  onOpenRelatedNews,
  onAskAssistant,
  onZoomOutToYear
}: {
  items: HoldingItem[];
  mode: HoldingsViewMode;
  onViewMore: () => void;
  onOpenAssetDetails?: (ticker: string) => void;
  enabledDetailTickers?: string[];
  onOpenRelatedNews?: (ticker: string) => void;
  onAskAssistant?: (holding: HoldingItem) => void;
  onZoomOutToYear?: (ticker: string) => void;
}) {
  const [expandedTicker, setExpandedTicker] = useState<string | null>(null);
  const [anchorCenterY, setAnchorCenterY] = useState<number | null>(null);
  const [panelTop, setPanelTop] = useState(0);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const expandedHolding = expandedTicker
    ? items.find((item) => item.ticker.toUpperCase() === expandedTicker.toUpperCase()) ?? null
    : null;
  const expandedHeadline = expandedHolding
    ? allDashboardNews.find((news) =>
      (news.tickers ?? []).map((ticker) => ticker.toUpperCase()).includes(expandedHolding.ticker.toUpperCase())
    )?.title
    : undefined;

  const togglePanicPanel = (ticker: string, target: HTMLElement) => {
    if (expandedTicker === ticker) {
      setExpandedTicker(null);
      setAnchorCenterY(null);
      return;
    }
    const containerRect = tableRef.current?.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    if (containerRect) {
      setAnchorCenterY(targetRect.top - containerRect.top + targetRect.height / 2);
    }
    setExpandedTicker(ticker);
  };

  useEffect(() => {
    if (!expandedTicker || anchorCenterY === null) return;
    const panelHeight = panelRef.current?.offsetHeight ?? 360;
    const containerHeight = tableRef.current?.offsetHeight ?? 0;
    const unclampedTop = anchorCenterY - panelHeight / 2;
    const minTop = -panelHeight + 48;
    const maxTop = Math.max(0, containerHeight - 48);
    setPanelTop(Math.max(minTop, Math.min(unclampedTop, maxTop)));
  }, [expandedTicker, anchorCenterY, expandedHolding?.ticker]);

  return (
    <div className="relative overflow-visible">
      {/* ── Rows ─────────────────────────────────────────────────────────── */}
      <div ref={tableRef} className="space-y-1.5">
        {items.map((item) => {
          const pl = mode === "sinceBuy" ? item.plEur : item.plEurToday;
          const plPct = mode === "sinceBuy" ? item.plPct : item.plPctToday;
          const pos = pl >= 0;
          const isNegative = pl < 0 || plPct < 0;
          const detailsEnabled = enabledDetailTickers.includes(item.ticker.toUpperCase());
          return (
            <div key={item.id}>
              <div
                className={`grid grid-cols-4 items-center rounded-xl px-2.5 py-1.5 text-xs transition ${detailsEnabled ? "cursor-pointer hover:opacity-85" : "cursor-not-allowed opacity-70"
                  }`}
                style={{ background: "var(--surface-sunken)" }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${item.ticker} details`}
                onClick={() => detailsEnabled && onOpenAssetDetails?.(item.ticker)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && detailsEnabled) {
                    onOpenAssetDetails?.(item.ticker);
                  }
                }}
              >
                <div className="col-span-2 min-w-0 flex items-center gap-2">
                  <div className="min-w-0">
                    <p className="clamp-1 font-medium" style={{ color: "var(--text-primary)" }}>
                      {item.name}
                    </p>
                    <p style={{ color: "var(--text-tertiary)" }}>{item.ticker}</p>
                  </div>
                  {isNegative && (
                    <button
                      type="button"
                      aria-label="Panic mode"
                      title="Panic mode"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePanicPanel(item.ticker, e.currentTarget);
                      }}
                      className="inline-flex h-6 min-w-[56px] shrink-0 items-center justify-center rounded-full border bg-white px-2 text-[10px] font-semibold text-red-600 transition hover:bg-red-50"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      Panic
                    </button>
                  )}
                </div>
                <p className="text-right tabular-nums" style={{ color: "var(--text-secondary)" }}>
                  {money(item.valueEur)}
                </p>
                <div className="text-right tabular-nums">
                  {isNegative ? (
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePanicPanel(item.ticker, e.currentTarget);
                        }}
                        className="text-right"
                      >
                        <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--negative)" }}>
                          {money(pl)} ({pct(plPct)})
                        </span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs font-semibold tabular-nums" style={{ color: pos ? "var(--positive)" : "var(--negative)" }}>
                      {pos ? "+" : ""}{money(pl)} ({pct(plPct)})
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {expandedHolding && (
        <div
          ref={panelRef}
          className="pointer-events-auto absolute left-[calc(100%+12px)] z-30 hidden lg:block"
          style={{ top: panelTop }}
        >
          <PanicInlineCard
            holding={expandedHolding}
            relatedHeadline={expandedHeadline}
            onClose={() => setExpandedTicker(null)}
            onZoomOut={() => {
              onZoomOutToYear?.(expandedHolding.ticker);
              setExpandedTicker(null);
              setAnchorCenterY(null);
            }}
            onOpenNews={() => {
              onOpenRelatedNews?.(expandedHolding.ticker);
              setExpandedTicker(null);
              setAnchorCenterY(null);
            }}
            onAskAssistant={() => {
              onAskAssistant?.(expandedHolding);
              setExpandedTicker(null);
              setAnchorCenterY(null);
            }}
          />
        </div>
      )}

      {/* ── View more ────────────────────────────────────────────────────── */}
      <button
        type="button"
        aria-label="View more holdings"
        onClick={onViewMore}
        className="mt-3 block rounded-full border px-3.5 py-1.5 text-xs font-semibold transition hover:opacity-75 mx-auto"
        style={{ borderColor: "var(--accent-border)", color: "var(--accent-dark)" }}
      >
        View more
      </button>
    </div>
  );
}
