"use client";

import { useState } from "react";
import type { AssetDetail, AdviceAction } from "@/lib/mock/assetDetail";
import { getRelatedNews } from "@/lib/mock/assetDetail";

const TIME_BTNS = ["1D", "1S", "1M", "1A", "MAX"] as const;

function SparklineMini({
  points,
  width = 200,
  height = 48,
  positive = true
}: {
  points: number[];
  width?: number;
  height?: number;
  /** false = línea con color negativo (bajada) */
  positive?: boolean;
}) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  const strokeColor = positive ? "var(--positive)" : "var(--negative)";
  const fillColor = "var(--accent-subtle)";
  const areaPath = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ") + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={areaPath} fill={fillColor} fillOpacity={0.6} />
      <path d={path} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AdviceBadge({ action }: { action: AdviceAction }) {
  const style =
    action === "COMPRAR"
      ? { bg: "#059669", text: "COMPRAR" }
      : action === "VENDER"
        ? { bg: "#dc2626", text: "VENDER" }
        : { bg: "#d97706", text: "MANTENER" };
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-xs font-bold text-white"
      style={{ background: style.bg }}
    >
      {action === "COMPRAR" && "🟢 "}
      {action === "VENDER" && "🔴 "}
      {action === "MANTENER" && "🟡 "}
      {style.text}
    </span>
  );
}

export function HoldingDetailModal({
  detail,
  onClose
}: {
  detail: AssetDetail;
  onClose: () => void;
}) {
  const [timeRange, setTimeRange] = useState(detail.timeRange);
  const [aboutOpen, setAboutOpen] = useState(false);

  const priceUsdFmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const eurFmt = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  });
  const pctFmt = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;

  const isPos = detail.plEurToday >= 0;
  const relatedNews = getRelatedNews(detail.ticker);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3" onClick={onClose}>
      <div
        className="grid h-[92vh] w-[94vw] max-w-6xl grid-cols-[minmax(320px,380px)_1fr] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Columna izquierda: gráfico + especificaciones (colores N26) ──────── */}
        <div
          className="flex flex-col overflow-hidden px-5 pt-5 pb-5"
          style={{
            background: "linear-gradient(180deg, var(--accent-subtle) 0%, var(--surface-raised) 100%)",
            color: "var(--text-primary)"
          }}
        >
          <div className="flex items-start justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-4xl" aria-hidden>{detail.icon}</span>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{detail.name}</h2>
                <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>{detail.ticker}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 transition hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          <p className="mt-2 text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{priceUsdFmt.format(detail.priceUsd)}</p>
          <p className="text-sm font-semibold" style={{ color: isPos ? "var(--positive)" : "var(--negative)" }}>
            {isPos ? "↑" : "↓"} {pctFmt(detail.plPctToday)} hoy
          </p>
          <div className="mt-4 flex flex-1 min-h-0 items-center justify-center rounded-xl p-2" style={{ background: "var(--surface-raised)", boxShadow: "var(--shadow-card)" }}>
            <SparklineMini points={detail.sparklinePoints} width={320} height={180} positive={isPos} />
          </div>
          <div className="mt-4 flex flex-wrap gap-1 shrink-0">
            {TIME_BTNS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeRange(t)}
                className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition ${
                  timeRange === t ? "text-white" : ""
                }`}
                style={{
                  background: timeRange === t ? "var(--accent)" : "var(--surface-sunken)",
                  color: timeRange === t ? "var(--text-inverse)" : "var(--text-secondary)"
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* ─── Tu posición (debajo del gráfico) ───────────────────────────── */}
          <section className="mt-4 shrink-0 rounded-xl p-3" style={{ background: "var(--surface-raised)", boxShadow: "var(--shadow-card)" }}>
            <h3 className="mb-2 text-xs font-bold" style={{ color: "var(--text-primary)" }}>Tu posición</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <div>
                <p style={{ color: "var(--text-tertiary)" }}>Cantidad</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {detail.quantity.toLocaleString("es-ES", { maximumFractionDigits: 6 })} {detail.ticker}
                </p>
              </div>
              <div>
                <p style={{ color: "var(--text-tertiary)" }}>Precio compra</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {detail.ticker === "EUR" ? eurFmt.format(detail.buyPrice) : priceUsdFmt.format(detail.buyPrice)}
                </p>
              </div>
              <div>
                <p style={{ color: "var(--text-tertiary)" }}>Invertido</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{eurFmt.format(detail.investedEur)}</p>
              </div>
              <div>
                <p style={{ color: "var(--text-tertiary)" }}>Valor actual</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{eurFmt.format(detail.valueEur)}</p>
              </div>
              <div>
                <p style={{ color: "var(--text-tertiary)" }}>Rendimiento</p>
                <p className="font-semibold" style={{ color: detail.plEur >= 0 ? "var(--positive)" : "var(--negative)" }}>
                  {detail.plEur >= 0 ? "+" : ""}{eurFmt.format(detail.plEur)}
                </p>
              </div>
              <div>
                <p style={{ color: "var(--text-tertiary)" }}>Rend. %</p>
                <p className="font-semibold" style={{ color: detail.plPct >= 0 ? "var(--positive)" : "var(--negative)" }}>
                  {pctFmt(detail.plPct)}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ─── Columna derecha: todo lo demás (scroll si hace falta) ────────── */}
        <div className="flex min-w-0 flex-col overflow-hidden bg-white">
          <div className="flex-1 overflow-y-auto">
          {/* ─── 3. Resumen IA del día (esquemático) ─────────────────────────────── */}
          <section className="border-b p-3" style={{ borderColor: "var(--border-subtle)" }}>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>Resumen IA hoy</h3>
            <ul className="space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {(() => {
                const bullets = detail.aiSummaryToday.split(/[.;]\s+/).filter(Boolean).slice(0, 4);
                const lines = bullets.length ? bullets : [detail.aiSummaryToday.slice(0, 100) + (detail.aiSummaryToday.length > 100 ? "…" : "")];
                return lines.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "var(--accent)" }}>•</span>
                    <span>{line.trim()}</span>
                  </li>
                ));
              })()}
            </ul>
          </section>

          {/* ─── 4. Consejo IA (esquemático) ───────────────────────────────── */}
          <section className="border-b p-3" style={{ borderColor: "var(--border-subtle)" }}>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>Consejo IA</h3>
            <div className="flex flex-wrap items-center gap-2">
              <AdviceBadge action={detail.aiAdvice.action} />
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{detail.aiAdvice.confidence}% confianza</span>
            </div>
            <div
              className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full"
              style={{ background: "var(--surface-sunken)" }}
              role="progressbar"
              aria-valuenow={detail.aiAdvice.confidence}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${detail.aiAdvice.confidence}%`, background: "var(--accent)" }}
              />
            </div>
            <p className="mt-1.5 text-xs line-clamp-2" style={{ color: "var(--text-secondary)" }}>{detail.aiAdvice.reasoning}</p>
          </section>

          {/* ─── 5. Noticias (esquemático) ─────────────────────────────────────── */}
          {relatedNews.length > 0 && (
            <section className="border-b p-3" style={{ borderColor: "var(--border-subtle)" }}>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>Noticias</h3>
              <ul className="space-y-1.5 max-h-20 overflow-y-auto">
                {relatedNews.map((n) => (
                  <li key={n.id} className="flex gap-2 border-l-2 pl-2" style={{ borderColor: "var(--accent-border)" }}>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase" style={{ color: "var(--text-tertiary)" }}>{n.source} · {n.timeAgo}</p>
                      <p className="text-xs font-medium line-clamp-1" style={{ color: "var(--text-primary)" }}>{n.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ─── 6. Sobre el activo (colapsable) ────────────────────────────── */}
          <section className="border-b p-3" style={{ borderColor: "var(--border-subtle)" }}>
            <button
              type="button"
              onClick={() => setAboutOpen((o) => !o)}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>Sobre el activo</h3>
              <span style={{ color: "var(--text-tertiary)" }}>{aboutOpen ? "▼" : "▶"}</span>
            </button>
            {aboutOpen && (
              <p className="mt-1.5 text-xs line-clamp-4" style={{ color: "var(--text-secondary)" }}>{detail.longDescription}</p>
            )}
          </section>

          {/* ─── 7. Alertas ─────────────────────────────────────────────── */}
          {detail.priceAlerts.length > 0 && (
            <section className="border-b p-3" style={{ borderColor: "var(--border-subtle)" }}>
              <h3 className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>Alertas</h3>
              <ul className="flex flex-wrap gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                {detail.priceAlerts.map((a, i) => (
                  <li key={i} className="rounded-full px-2 py-0.5" style={{ background: "var(--surface-sunken)" }}>
                    {a.label} {a.target}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ─── 8. Datos clave (esquemático) ────────────────────────────── */}
          {Object.keys(detail.keyMetrics).length > 0 && (
            <section className="border-b p-3" style={{ borderColor: "var(--border-subtle)" }}>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>Datos clave</h3>
              <div className="grid grid-cols-3 gap-x-3 gap-y-1.5 text-xs">
                {detail.keyMetrics.marketCap && (
                  <>
                    <span style={{ color: "var(--text-tertiary)" }}>Market Cap</span>
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{detail.keyMetrics.marketCap}</span>
                  </>
                )}
                {detail.keyMetrics.volume24h && (
                  <>
                    <span style={{ color: "var(--text-tertiary)" }}>Vol. 24h</span>
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{detail.keyMetrics.volume24h}</span>
                  </>
                )}
                {detail.keyMetrics.ath && (
                  <>
                    <span style={{ color: "var(--text-tertiary)" }}>ATH</span>
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{detail.keyMetrics.ath}</span>
                  </>
                )}
                {detail.keyMetrics.dominance && (
                  <>
                    <span style={{ color: "var(--text-tertiary)" }}>Dominancia</span>
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{detail.keyMetrics.dominance}</span>
                  </>
                )}
                {detail.keyMetrics.rsi14 != null && (
                  <>
                    <span style={{ color: "var(--text-tertiary)" }}>RSI</span>
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{detail.keyMetrics.rsi14}</span>
                  </>
                )}
                {detail.keyMetrics.ma50 && (
                  <>
                    <span style={{ color: "var(--text-tertiary)" }}>MA 50</span>
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{detail.keyMetrics.ma50}</span>
                  </>
                )}
                {detail.keyMetrics.ma200 && (
                  <>
                    <span style={{ color: "var(--text-tertiary)" }}>MA 200</span>
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{detail.keyMetrics.ma200}</span>
                  </>
                )}
              </div>
            </section>
          )}
          </div>

        {/* ─── 9. Botones de acción (sticky) ──────────────────────────────── */}
        {detail.ticker !== "EUR" && (
          <div className="shrink-0 flex gap-3 border-t p-3" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}>
            <button
              type="button"
              className="flex-1 rounded-xl py-3 font-semibold text-white transition hover:opacity-90"
              style={{ background: "var(--positive)" }}
            >
              Comprar
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl py-3 font-semibold text-white transition hover:opacity-90"
              style={{ background: "var(--negative)" }}
            >
              Vender
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
