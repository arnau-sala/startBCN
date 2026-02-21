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
  const fillColor = positive ? "var(--positive-bg)" : "var(--negative-bg)";
  const areaPath = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ") + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={areaPath} fill={fillColor} fillOpacity={0.4} />
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
        {/* ─── Columna izquierda: gráfico + especificaciones ────────────────── */}
        <div
          className="flex flex-col overflow-hidden px-5 pt-5 pb-5"
          style={{
            background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
            color: "#fff"
          }}
        >
          <div className="flex items-start justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-4xl" aria-hidden>{detail.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{detail.name}</h2>
                <p className="text-sm opacity-80">{detail.ticker}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          <p className="mt-2 text-2xl font-bold">{priceUsdFmt.format(detail.priceUsd)}</p>
          <p className={`text-sm font-semibold ${isPos ? "text-emerald-400" : "text-red-400"}`}>
            {isPos ? "↑" : "↓"} {pctFmt(detail.plPctToday)} hoy
          </p>
          <div className="mt-4 flex flex-1 min-h-0 items-center justify-center">
            <SparklineMini points={detail.sparklinePoints} width={320} height={180} positive={isPos} />
          </div>
          <div className="mt-4 flex flex-wrap gap-1 shrink-0">
            {TIME_BTNS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeRange(t)}
                className={`rounded px-2.5 py-1.5 text-xs font-medium transition ${
                  timeRange === t ? "bg-white/25 text-white" : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {/* ─── Tu posición (debajo del gráfico) ───────────────────────────── */}
          <section className="mt-4 shrink-0 rounded-xl bg-white/10 p-3">
            <h3 className="mb-2 text-xs font-bold text-white/90">Tu posición</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <div>
                <p className="text-white/60">Cantidad</p>
                <p className="font-semibold text-white">
                  {detail.quantity.toLocaleString("es-ES", { maximumFractionDigits: 6 })} {detail.ticker}
                </p>
              </div>
              <div>
                <p className="text-white/60">Precio compra</p>
                <p className="font-semibold text-white">
                  {detail.ticker === "EUR" ? eurFmt.format(detail.buyPrice) : priceUsdFmt.format(detail.buyPrice)}
                </p>
              </div>
              <div>
                <p className="text-white/60">Invertido</p>
                <p className="font-semibold text-white">{eurFmt.format(detail.investedEur)}</p>
              </div>
              <div>
                <p className="text-white/60">Valor actual</p>
                <p className="font-semibold text-white">{eurFmt.format(detail.valueEur)}</p>
              </div>
              <div>
                <p className="text-white/60">Rendimiento</p>
                <p className={`font-semibold ${detail.plEur >= 0 ? "text-emerald-300" : "text-red-300"}`}>
                  {detail.plEur >= 0 ? "+" : ""}{eurFmt.format(detail.plEur)}
                </p>
              </div>
              <div>
                <p className="text-white/60">Rendimiento %</p>
                <p className={`font-semibold ${detail.plPct >= 0 ? "text-emerald-300" : "text-red-300"}`}>
                  {pctFmt(detail.plPct)}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ─── Columna derecha: todo lo demás (scroll si hace falta) ────────── */}
        <div className="flex min-w-0 flex-col overflow-hidden bg-white">
          <div className="flex-1 overflow-y-auto">
          {/* ─── 3. Resumen IA del día ─────────────────────────────────────── */}
          <section className="border-b border-slate-200 p-3">
            <h3 className="mb-1 text-sm font-bold text-slate-800">Resumen IA del día</h3>
            <p className="text-sm leading-relaxed text-slate-700">{detail.aiSummaryToday}</p>
          </section>

          {/* ─── 4. Consejo IA ────────────────────────────────────────────── */}
          <section className="border-b border-slate-200 p-3">
            <h3 className="mb-2 text-sm font-bold text-slate-800">Consejo IA</h3>
            <div className="flex flex-wrap items-center gap-2">
              <AdviceBadge action={detail.aiAdvice.action} />
              <span className="text-sm text-slate-600">Confianza: {detail.aiAdvice.confidence}%</span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={detail.aiAdvice.confidence}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-teal-600"
                style={{ width: `${detail.aiAdvice.confidence}%` }}
              />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{detail.aiAdvice.reasoning}</p>
          </section>

          {/* ─── 5. Noticias relacionadas ─────────────────────────────────── */}
          {relatedNews.length > 0 && (
            <section className="border-b border-slate-200 p-3">
              <h3 className="mb-2 text-sm font-bold text-slate-800">Noticias relacionadas</h3>
              <ul className="space-y-2 max-h-24 overflow-y-auto">
                {relatedNews.map((n) => (
                  <li key={n.id} className="flex gap-2 border-l-2 border-teal-200 pl-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500">{n.source} · {n.timeAgo}</p>
                      <p className="text-xs font-medium text-slate-900 line-clamp-1">{n.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ─── 6. Sobre el activo (colapsable) ────────────────────────────── */}
          <section className="border-b border-slate-200 p-3">
            <button
              type="button"
              onClick={() => setAboutOpen((o) => !o)}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-sm font-bold text-slate-800">Sobre el activo</h3>
              <span className="text-slate-500">{aboutOpen ? "▼" : "▶"}</span>
            </button>
            {aboutOpen && (
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{detail.longDescription}</p>
            )}
          </section>

          {/* ─── 7. Alertas de precio ────────────────────────────────────── */}
          {detail.priceAlerts.length > 0 && (
            <section className="border-b border-slate-200 p-3">
              <h3 className="mb-1 text-sm font-bold text-slate-800">Alertas de precio</h3>
              <ul className="space-y-1 text-sm text-slate-700">
                {detail.priceAlerts.map((a, i) => (
                  <li key={i}>
                    {a.label} {a.target}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ─── 8. Datos clave ───────────────────────────────────────────── */}
          {Object.keys(detail.keyMetrics).length > 0 && (
            <section className="border-b border-slate-200 p-3">
              <h3 className="mb-2 text-sm font-bold text-slate-800">Datos clave</h3>
              <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-sm">
                {detail.keyMetrics.marketCap && (
                  <>
                    <span className="text-slate-500">Market Cap</span>
                    <span className="font-medium text-slate-900">{detail.keyMetrics.marketCap}</span>
                  </>
                )}
                {detail.keyMetrics.volume24h && (
                  <>
                    <span className="text-slate-500">Volumen 24h</span>
                    <span className="font-medium text-slate-900">{detail.keyMetrics.volume24h}</span>
                  </>
                )}
                {detail.keyMetrics.ath && (
                  <>
                    <span className="text-slate-500">Máx. histórico</span>
                    <span className="font-medium text-slate-900">{detail.keyMetrics.ath}</span>
                  </>
                )}
                {detail.keyMetrics.dominance && (
                  <>
                    <span className="text-slate-500">Dominancia</span>
                    <span className="font-medium text-slate-900">{detail.keyMetrics.dominance}</span>
                  </>
                )}
                {detail.keyMetrics.rsi14 != null && (
                  <>
                    <span className="text-slate-500">RSI (14)</span>
                    <span className="font-medium text-slate-900">{detail.keyMetrics.rsi14}</span>
                  </>
                )}
                {detail.keyMetrics.ma50 && (
                  <>
                    <span className="text-slate-500">MA 50</span>
                    <span className="font-medium text-slate-900">{detail.keyMetrics.ma50}</span>
                  </>
                )}
                {detail.keyMetrics.ma200 && (
                  <>
                    <span className="text-slate-500">MA 200</span>
                    <span className="font-medium text-slate-900">{detail.keyMetrics.ma200}</span>
                  </>
                )}
              </div>
            </section>
          )}
          </div>

        {/* ─── 9. Botones de acción (sticky) ──────────────────────────────── */}
        {detail.ticker !== "EUR" && (
          <div className="shrink-0 flex gap-3 border-t border-slate-200 bg-white p-3">
            <button
              type="button"
              className="flex-1 rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Comprar
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
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
