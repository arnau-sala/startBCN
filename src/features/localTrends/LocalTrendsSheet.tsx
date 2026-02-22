"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Topic, TrendTimeframe } from "./types";
import { MOCK_DATASETS } from "./localTrends.mock";
import { resolveDataset } from "./privacy";
import { getFollowed, toggleFollowed } from "./storage";
import { EuropeMap, MapCity } from "./EuropeMap";
import { LocalTrendsAlertDialog } from "./LocalTrendsAlertDialog";
import { SectionHeader } from "@/components/SectionHeader";
import { Pill } from "@/components/Pill";
import { IconButton } from "@/components/IconButton";

// ─── Today / Week segmented control ──────────────────────────────────────────

function TrendSegmentedControl({
    value,
    onChange
}: {
    value: TrendTimeframe;
    onChange: (v: TrendTimeframe) => void;
}) {
    return (
        <div
            className="flex rounded-full p-[3px]"
            style={{ background: "var(--surface-sunken)" }}
            role="tablist"
        >
            {(["today", "week"] as TrendTimeframe[]).map((key) => {
                const active = value === key;
                return (
                    <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(key)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200"
                        style={{
                            background: active ? "var(--surface-raised)" : "transparent",
                            color: active ? "var(--accent-dark)" : "var(--text-tertiary)",
                            boxShadow: active ? "0 1px 3px rgba(0,0,0,.10)" : "none"
                        }}
                    >
                        {key === "today" ? "Today" : "Week"}
                    </button>
                );
            })}
        </div>
    );
}

// ─── City colour palette (matches EuropeMap.tsx) ──────────────────────────────

const CITY_COLORS: Record<string, { primary: string; bg: string; border: string }> = {
    barcelona: { primary: "var(--accent)", bg: "var(--accent-subtle)", border: "var(--accent-border)" },
    berlin: { primary: "var(--positive)", bg: "var(--positive-bg)", border: "#a7f3d0" },
    paris: { primary: "var(--warning)", bg: "var(--warning-bg)", border: "#fcd34d" }
};

// ─── Key Asset Briefing ───────────────────────────────────────────────────────

function KeyAssetBriefing({
    topic,
    city,
    timeframe,
    isFollowing,
    onFollow,
    onAlert
}: {
    topic: Topic;
    city: MapCity;
    timeframe: "today" | "week";
    isFollowing: boolean;
    onFollow: () => void;
    onAlert: () => void;
}) {
    const isUp = topic.delta > 0;
    const isDown = topic.delta < 0;

    return (
        <div className="flex flex-col h-full bg-[var(--surface-raised)] pb-4">

            {/* Header */}
            <div className="px-6 py-4 flex flex-col gap-1 border-b border-[var(--border-subtle)]">
                <h3 className="text-[17px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    Key asset now
                </h3>
                <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                    {city.displayName} · Top topic driving attention
                </p>
            </div>

            <div className="px-6 py-5 flex flex-col gap-6">

                {/* Metric Chip */}
                <div className="self-start">
                    <div
                        style={{
                            whiteSpace: "nowrap",
                            borderRadius: "100px",
                            padding: "6px 14px",
                            fontSize: "13px",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            background: isUp ? "var(--positive-bg)" : isDown ? "var(--negative-bg)" : "var(--surface-sunken)",
                            color: isUp ? "var(--positive)" : isDown ? "var(--negative)" : "var(--text-primary)",
                            border: isUp || isDown ? "none" : "1px solid var(--border-subtle)"
                        }}
                    >
                        <span style={{ fontWeight: 600 }}>{topic.name}</span>
                        <span style={{ opacity: 0.5 }}>·</span>
                        <span style={{ fontWeight: 600 }}>{topic.pct}%</span>
                        <span style={{ opacity: 0.5 }}>·</span>
                        <span style={{ fontWeight: 500 }}>
                            {isUp ? "↑" : isDown ? "↓" : ""}{Math.abs(topic.delta)}% {timeframe === "week" ? "vs last week" : "vs yesterday"}
                        </span>
                    </div>
                </div>

                {/* What's going on */}
                <div>
                    <h4 className="text-[13px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                        What{"'"}s going on
                    </h4>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--text-tertiary)]">
                        {topic.whatsGoingOn.map((point, idx) => (
                            <li key={idx} className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* For investors */}
                <div>
                    <h4 className="text-[13px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                        For investors
                    </h4>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--text-tertiary)] text-[14px] leading-relaxed">
                        <li style={{ color: "var(--text-secondary)" }}>
                            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Upside: </strong>
                            {topic.forInvestorsUpside}
                        </li>
                        <li style={{ color: "var(--text-secondary)" }}>
                            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Risk: </strong>
                            {topic.forInvestorsRisk}
                        </li>
                    </ul>
                </div>

                {/* Key driver news */}
                <div>
                    <span
                        className="inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider mb-2"
                        style={{ background: "var(--accent-subtle)", color: "var(--accent-dark)" }}
                    >
                        Key driver news
                    </span>
                    <div
                        className="p-4 rounded-[var(--radius-md)] flex flex-col gap-2"
                        style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)" }}
                    >
                        <p className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>
                            {topic.keyDriverArticle.source} · {topic.keyDriverArticle.timeAgo}
                        </p>
                        <p className="text-[14px] font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                            “{topic.keyDriverArticle.title}”
                        </p>
                        <button
                            type="button"
                            className="text-[13px] font-semibold self-start mt-1 hover:underline inline-flex items-center gap-1"
                            style={{ color: "var(--accent-dark)" }}
                        >
                            Open in your feed
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-2">
                    <button
                        type="button"
                        onClick={onFollow}
                        className="flex-1 rounded-[var(--radius-md)] py-3 text-[14px] font-semibold transition hover:opacity-90 active:scale-[0.98]"
                        style={
                            isFollowing
                                ? { background: "var(--surface-sunken)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }
                                : { background: "var(--text-primary)", color: "var(--surface-page)" }
                        }
                    >
                        {isFollowing ? "Following ✓" : "Follow this theme"}
                    </button>
                    <button
                        type="button"
                        onClick={onAlert}
                        className="flex-1 rounded-[var(--radius-md)] py-3 text-[14px] font-semibold transition hover:bg-black/5 active:scale-[0.98]"
                        style={{ border: "1px solid var(--border-medium)", color: "var(--text-primary)", background: "transparent" }}
                    >
                        Create alert
                    </button>
                </div>

            </div>
        </div>
    );
}

// ─── Main sheet ───────────────────────────────────────────────────────────────

interface LocalTrendsSheetProps {
    open: boolean;
    onClose: () => void;
    triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

const CITY_IDS = ["barcelona", "berlin", "paris"] as const;

export function LocalTrendsSheet({ open, onClose, triggerRef }: LocalTrendsSheetProps) {
    const [timeframe, setTimeframe] = useState<TrendTimeframe>("today");
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
    const [alertTopic, setAlertTopic] = useState<Topic | null>(null);
    const [alertCityId, setAlertCityId] = useState<string | null>(null);
    const [followed, setFollowed] = useState<string[]>([]);
    const [toast, setToast] = useState<string | null>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    // Load follows
    useEffect(() => { setFollowed(getFollowed()); }, []);

    // A11y: body scroll lock, ESC, focus trap, return focus
    useEffect(() => {
        if (!open) { triggerRef?.current?.focus(); return; }

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        requestAnimationFrame(() => closeRef.current?.focus());

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") { onClose(); return; }
            if (e.key === "Tab" && sheetRef.current) {
                const els = Array.from(
                    sheetRef.current.querySelectorAll<HTMLElement>(
                        'button,[href],input,select,[tabindex]:not([tabindex="-1"])'
                    )
                );
                if (!els.length) return;
                const first = els[0], last = els[els.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener("keydown", onKey);
        return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }, [open, onClose, triggerRef]);

    // Reset internal state when timeframe changes
    // (Timeframe changed so we don't need any complex topic clearing, it falls back to the top topic)

    const handleCityClick = useCallback((id: string) => {
        setSelectedCityId((prev) => (prev === id ? null : id));
        setAlertTopic(null);
    }, []);

    const handleFollow = useCallback((topicId: string) => {
        setFollowed(toggleFollowed(topicId));
    }, []);

    const handleAlertSaved = useCallback(() => {
        setToast("Alert created ✓");
        setAlertTopic(null);
        setAlertCityId(null);
        setTimeout(() => setToast(null), 2500);
    }, []);

    if (!open) return null;

    // Build map city data from resolved mock
    const mapCities: MapCity[] = CITY_IDS.map((id) => {
        const ds = MOCK_DATASETS[id];
        const res = ds ? resolveDataset(ds, timeframe) : null;
        const top = res?.topics[0];
        return {
            id,
            displayName: res?.locationName ?? id,
            topTopic: top?.name ?? "—",
            topIcon: top?.icon ?? "📊",
            pct: top?.pct ?? 0,
            delta: top?.delta ?? 0
        };
    });

    // Selected city data
    const selectedDs = selectedCityId ? MOCK_DATASETS[selectedCityId] : null;
    const selectedResolved = selectedDs ? resolveDataset(selectedDs, timeframe) : null;
    const panelCity = mapCities.find((c) => c.id === selectedCityId);
    const panelColor = selectedCityId ? (CITY_COLORS[selectedCityId] ?? CITY_COLORS.barcelona) : null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50"
                style={{ background: "rgba(15,23,42,0.5)" }}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={sheetRef}
                role="dialog"
                aria-modal="true"
                aria-label="Local trends map"
                className="fixed left-1/2 top-1/2 z-50 flex w-[95%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden"
                style={{
                    maxWidth: "920px",
                    height: "85vh",
                    background: "var(--surface-raised)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)",
                    border: "1px solid var(--border-subtle)",
                    animation: "lt-fadeInScale 240ms cubic-bezier(0.16, 1, 0.3, 1)"
                }}
            >

                <div
                    className="flex shrink-0 items-center justify-between px-6 pb-4 pt-4"
                    style={{ borderBottom: "1px solid var(--border-subtle)" }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-full"
                            style={{ background: "var(--accent-subtle)" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <circle cx="12" cy="12" r="2" />
                                <path d="M16.24 7.76a6 6 0 0 1 0 8.49" /><path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
                                <path d="M20.07 3.93a10 10 0 0 1 0 16.14" /><path d="M3.93 20.07a10 10 0 0 1 0-16.14" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-[17px] font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                                Local trends
                            </h2>
                            <p className="text-[13px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                                What Europe is reading · Tap a city
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <TrendSegmentedControl value={timeframe} onChange={setTimeframe} />
                        <button
                            ref={closeRef}
                            type="button"
                            aria-label="Close local trends"
                            onClick={onClose}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition"
                            style={{ color: "var(--text-tertiary)" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-sunken)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Map area — grows to fill available space */}
                <div className="relative flex-1 overflow-hidden flex items-center justify-center" style={{ minHeight: 0 }}>
                    <div className="w-full max-w-[700px] p-4 transition-all duration-300 relative z-0">
                        <EuropeMap
                            cities={mapCities}
                            selectedCityId={selectedCityId}
                            onCityClick={handleCityClick}
                            timeframe={timeframe}
                        />
                    </div>

                    {/* ── City detail panel (slides up from bottom of map area) ── */}
                    {selectedCityId && selectedResolved && panelCity && panelColor && (
                        <div
                            className="lt-panel-enter absolute bottom-0 left-0 right-0 flex flex-col overflow-y-auto z-10"
                            style={{
                                maxHeight: "62%",
                                background: "var(--surface-raised)",
                                borderTop: `2px solid ${selectedResolved.topics[0].delta > 0 ? "var(--positive)" : selectedResolved.topics[0].delta < 0 ? "var(--negative)" : panelColor.primary}`,
                                borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                                boxShadow: "0 -4px 24px rgba(0,0,0,.12)"
                            }}
                        >
                            {/* Panel header */}
                            <div
                                className="flex shrink-0 items-center justify-between px-6 py-4"
                                style={{ borderBottom: "1px solid var(--border-subtle)" }}
                            >
                                <div className="flex-1 flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="h-2 w-2 rounded-full"
                                            style={{ background: selectedResolved.topics[0].delta > 0 ? "var(--positive)" : selectedResolved.topics[0].delta < 0 ? "var(--negative)" : panelColor.primary }}
                                        />
                                        <h3 className="text-[17px] font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                                            {panelCity.displayName} · Investor briefing
                                        </h3>
                                        {selectedResolved.wasFallback && (
                                            <Pill label={`Showing ${selectedResolved.level} (low volume)`} variant="neutral" className="ml-2" />
                                        )}
                                    </div>
                                    <IconButton
                                        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>}
                                        ariaLabel="Close city panel"
                                        onClick={() => { setSelectedCityId(null); }}
                                    />
                                </div>
                            </div>

                            {/* Scrollable panel body */}
                            <div className="overflow-y-auto" style={{ overscrollBehavior: "contain", flex: 1 }}>
                                <KeyAssetBriefing
                                    topic={selectedResolved.topics[0]}
                                    city={panelCity}
                                    timeframe={timeframe}
                                    isFollowing={followed.includes(selectedResolved.topics[0].id)}
                                    onFollow={() => handleFollow(selectedResolved.topics[0].id)}
                                    onAlert={() => { setAlertTopic(selectedResolved.topics[0]); setAlertCityId(selectedCityId); }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer hint */}
                <div
                    className="shrink-0 flex flex-col items-center justify-center gap-1 px-6 py-4"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                >
                    <span className="text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>
                        Tap a city to explore its financial reading trends.
                    </span>
                    <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                        Aggregated &amp; anonymized reading activity. Not financial advice.
                    </span>
                </div>
            </div>

            {/* Alert dialog overlay */}
            {alertTopic && alertCityId && (
                <div
                    className="fixed inset-0 z-[60] flex items-end justify-center"
                    onClick={() => { setAlertTopic(null); setAlertCityId(null); }}
                >
                    <div
                        className="relative w-full rounded-t-[var(--radius-lg)] p-6"
                        style={{ maxWidth: "640px", background: "var(--surface-raised)", boxShadow: "var(--shadow-modal)" }}
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <LocalTrendsAlertDialog
                            topicId={alertTopic.id}
                            topicName={alertTopic.name}
                            onClose={() => { setAlertTopic(null); setAlertCityId(null); }}
                            onSaved={handleAlertSaved}
                        />
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div
                    className="fixed bottom-8 left-1/2 z-[70] -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg"
                    style={{ background: "var(--positive)", color: "#fff" }}
                    role="status"
                    aria-live="polite"
                >
                    {toast}
                </div>
            )}

            <style>{`
        @keyframes lt-fadeInScale {
          from { transform: translate(-50%, -50%) scale(0.96); opacity: 0; }
          to   { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
        }
      `}</style>
        </>
    );
}
