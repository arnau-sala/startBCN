"use client";

import { useState } from "react";
import type { PanicCardContent } from "@/lib/mock/assetDetail";
import { getGainCard, getPanicCard } from "@/lib/mock/assetDetail";
import { HoldingItem } from "@/lib/mock/portfolio";

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

/** Card with message + ELI10; reference name inside text links to full news. */
function ContextCard({
  content,
  onClose,
  onOpenNews
}: {
  content: PanicCardContent;
  onClose: () => void;
  onOpenNews?: (newsId: string) => void;
}) {
  const [showEli10, setShowEli10] = useState(false);
  const text = showEli10 ? content.eli10 : content.explanation;
  const sourceLink = onOpenNews ? (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenNews(content.newsId);
      }}
      className="font-semibold underline transition hover:opacity-80"
      style={{ color: "var(--accent-dark)" }}
      title="Open full story"
    >
      {content.sourceName}
    </button>
  ) : (
    <span>{content.sourceName}</span>
  );

  return (
    <div
      className="animate-in fade-in slide-in-from-top-1 rounded-b-xl border-t px-3 py-3 text-left"
      style={{
        background: "var(--accent-subtle)",
        borderColor: "var(--accent-border)"
      }}
      role="region"
      aria-label="Context for this move"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>
            Source: {sourceLink}
          </p>
          <h4 className="mt-0.5 text-sm font-bold" style={{ color: "var(--accent-dark)" }}>
            {content.headline}
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {text}
          </p>
          <p className="mt-1.5 text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>
            {content.technical}
          </p>
          <button
            type="button"
            onClick={() => setShowEli10((v) => !v)}
            className="mt-2 rounded-full px-2.5 py-1 text-[11px] font-semibold transition hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "var(--text-inverse)"
            }}
          >
            {showEli10 ? "Full explanation" : "ELI10"}
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full p-1 transition hover:opacity-70"
          style={{ color: "var(--accent-dark)" }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
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
  onHoldingClick,
  onOpenNews
}: {
  items: HoldingItem[];
  mode: HoldingsViewMode;
  onViewMore: () => void;
  onHoldingClick?: (item: HoldingItem) => void;
  /** Open full news story for the move (up/down). No recuadro. */
  onOpenNews?: (newsId: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      {/* ── Rows: clic en número verde/rojo = card con mensaje + ELI10; dentro, la referencia enlaza a la noticia ─ */}
      <div className="space-y-1.5">
        {items.map((item) => {
          const pl = mode === "sinceBuy" ? item.plEur : item.plEurToday;
          const plPct = mode === "sinceBuy" ? item.plPct : item.plPctToday;
          const pos = pl >= 0;
          const panicContent = getPanicCard(item);
          const gainContent = getGainCard(item);
          const contextContent = pos ? gainContent : panicContent;
          const showContextButton = (pos && gainContent != null) || (!pos && panicContent != null);
          const isOpen = expandedId === item.id;

          return (
            <div key={item.id} className="rounded-xl overflow-hidden" style={{ background: "var(--surface-sunken)" }}>
              <div className="grid grid-cols-4 items-center px-2.5 py-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => onHoldingClick?.(item)}
                  className="col-span-2 text-left transition hover:opacity-90 cursor-pointer focus:outline-none rounded-l-xl"
                >
                  <p className="clamp-1 font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.name}
                  </p>
                  <p style={{ color: "var(--text-tertiary)" }}>{item.ticker}</p>
                </button>
                <button
                  type="button"
                  onClick={() => onHoldingClick?.(item)}
                  className="text-right transition hover:opacity-90 cursor-pointer focus:outline-none"
                >
                  <span style={{ color: "var(--text-secondary)" }}>{money(item.valueEur)}</span>
                </button>
                {showContextButton ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId((id) => (id === item.id ? null : item.id));
                    }}
                    className="flex flex-col items-end gap-0.5 text-right transition hover:opacity-90 cursor-pointer focus:outline-none rounded-r-xl py-0.5 bg-transparent border-0"
                    style={{ color: pos ? "var(--positive)" : "var(--negative)" }}
                    aria-label={pos ? "See why it's up" : "See why it's down"}
                  >
                    <span className="inline-flex items-center gap-1">
                      <span aria-hidden>{pos ? "📈" : "⚡"}</span>
                      <span>{pos ? "+" : ""}{money(pl)}</span>
                    </span>
                    <span className="text-xs">{pct(plPct)}</span>
                  </button>
                ) : (
                  <div className="text-right">
                    <p style={{ color: pos ? "var(--positive)" : "var(--negative)" }}>
                      {pos ? "+" : ""}{money(pl)}
                    </p>
                    <p className="text-xs" style={{ color: pos ? "var(--positive)" : "var(--negative)" }}>
                      {pct(plPct)}
                    </p>
                  </div>
                )}
              </div>
              {isOpen && contextContent && (
                <ContextCard
                  content={contextContent}
                  onClose={() => setExpandedId(null)}
                  onOpenNews={onOpenNews}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── View more ────────────────────────────────────────────────────── */}
      <button
        type="button"
        aria-label="View more holdings"
        onClick={onViewMore}
        className="mt-3 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition hover:opacity-75"
        style={{ borderColor: "var(--accent-border)", color: "var(--accent-dark)" }}
      >
        View more
      </button>
    </div>
  );
}
