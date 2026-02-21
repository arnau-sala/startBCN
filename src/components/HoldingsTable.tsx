"use client";

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
  onHoldingClick
}: {
  items: HoldingItem[];
  mode: HoldingsViewMode;
  onViewMore: () => void;
  onHoldingClick?: (item: HoldingItem) => void;
}) {
  return (
    <div>
      {/* ── Rows (clic en cada holding abre el modal de detalle) ───────────── */}
      <div className="space-y-1.5">
        {items.map((item) => {
          const pl = mode === "sinceBuy" ? item.plEur : item.plEurToday;
          const plPct = mode === "sinceBuy" ? item.plPct : item.plPctToday;
          const pos = pl >= 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onHoldingClick?.(item)}
              className="grid w-full grid-cols-4 items-center rounded-xl px-2.5 py-1.5 text-left text-xs transition hover:opacity-90 cursor-pointer focus:outline focus:ring-2 focus:ring-offset-1 focus:ring-[var(--accent-dark)]"
              style={{ background: "var(--surface-sunken)" }}
            >
              <div className="col-span-2">
                <p className="clamp-1 font-medium" style={{ color: "var(--text-primary)" }}>
                  {item.name}
                </p>
                <p style={{ color: "var(--text-tertiary)" }}>{item.ticker}</p>
              </div>
              <p className="text-right" style={{ color: "var(--text-secondary)" }}>
                {money(item.valueEur)}
              </p>
              <div className="text-right">
                <p style={{ color: pos ? "var(--positive)" : "var(--negative)" }}>
                  {pos ? "+" : ""}{money(pl)}
                </p>
                <p className="text-xs" style={{ color: pos ? "var(--positive)" : "var(--negative)" }}>
                  {pct(plPct)}
                </p>
              </div>
            </button>
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
