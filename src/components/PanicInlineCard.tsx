"use client";

import { HoldingItem } from "@/lib/mock/portfolio";
import { getPanicCopy } from "@/lib/panic";
import { assetDetailsByTicker } from "@/lib/mock/assets";

export function PanicInlineCard({
  holding,
  dayChangePct,
  relatedHeadline,
  onClose,
  onZoomOut,
  onOpenNews,
  onAskAssistant
}: {
  holding: HoldingItem;
  dayChangePct?: number;
  relatedHeadline?: string;
  onClose?: () => void;
  onZoomOut?: () => void;
  onOpenNews?: () => void;
  onAskAssistant?: () => void;
}) {
  const copy = getPanicCopy(
    { ticker: holding.ticker, name: holding.name, plPct: holding.plPct, dayChangePct },
    relatedHeadline
  );
  const ticker = holding.ticker.toUpperCase();
  const guidanceFromAsset = (assetDetailsByTicker as Record<string, { guidance: { label: "HOLD" | "WAIT" | "REDUCE" | "REVIEW" } } | undefined>)[ticker]?.guidance.label;
  const verdict: "HOLD" | "WAIT" | "REDUCE" | "REVIEW" =
    guidanceFromAsset ?? (holding.plPct <= -5 ? "REDUCE" : holding.plPct <= -2 ? "WAIT" : "REVIEW");
  const verdictTone = verdict === "HOLD"
    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
    : verdict === "WAIT"
      ? "bg-amber-100 text-amber-800 border-amber-300"
      : verdict === "REDUCE"
        ? "bg-rose-100 text-rose-800 border-rose-300"
        : "bg-slate-200 text-slate-800 border-slate-300";

  return (
    <div
      className="relative w-[420px] max-w-[calc(100vw-32px)] rounded-2xl border p-3 shadow-[0_12px_28px_rgba(15,23,42,0.16)]"
      style={{ borderColor: "var(--accent-border)", background: "var(--surface-raised)" }}
    >
      <span
        className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-l border-b"
        style={{ background: "var(--surface-raised)", borderColor: "var(--accent-border)" }}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
            From {holding.ticker}
          </span>
          <p className="mt-1 pr-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Why is my {holding.name} down?
          </p>
        </div>
        <button
          type="button"
          aria-label="Close panic panel"
          onClick={onClose}
          className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
        >
          ✕
        </button>
      </div>
      <div className="mt-1">
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
          {copy.volatilityLabel}
        </span>
      </div>

      <div className="mt-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">In plain English</p>
        <ul className="mt-1 space-y-1 text-[12px] text-slate-700">
          {copy.plainEnglishBullets.slice(0, 3).map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      </div>

      <div className="mt-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">What likely drove this move</p>
        <ul className="mt-1 space-y-1 text-[12px] text-slate-700">
          {copy.driversBullets.slice(0, 2).map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      </div>

      <div className="mt-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">What you can check next</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={onZoomOut}
            className="rounded-full border px-2 py-0.5 text-[11px] font-semibold text-slate-700 transition hover:bg-white"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            Zoom out to 1Y
          </button>
          <button
            type="button"
            onClick={onOpenNews}
            className="rounded-full border px-2 py-0.5 text-[11px] font-semibold text-slate-700 transition hover:bg-white"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            Open related news
          </button>
          <button
            type="button"
            onClick={onAskAssistant}
            className="rounded-full border px-2 py-0.5 text-[11px] font-semibold text-slate-700 transition hover:bg-white"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            Ask assistant
          </button>
        </div>
      </div>

      <div className="mt-2 rounded-lg border bg-white p-2" style={{ borderColor: "var(--border-subtle)" }}>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Recommendation</p>
        <div className="mt-1 flex items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${verdictTone}`}>
            {verdict}
          </span>
          <p className="text-[12px] text-slate-600">This fits the current risk setup for this asset.</p>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-slate-500">Educational info — not financial advice.</p>
    </div>
  );
}
