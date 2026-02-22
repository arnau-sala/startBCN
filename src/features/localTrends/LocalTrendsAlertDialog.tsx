"use client";

import { useState } from "react";
import { AlertConfig, Topic } from "./types";
import { saveAlert, saveDailyBriefing } from "./storage";

const THRESHOLDS = [20, 30, 40, 50, 60, 70] as const;

interface Props {
    topic: Topic;
    locationName: string;
    onClose: () => void;
    onSaved: (type: string, topicName: string) => void;
}

/**
 * Inline alert creation dialog within the sheet.
 * Saves to localStorage and calls onSaved to show a toast.
 */
export function LocalTrendsAlertDialog({ topic, locationName, onClose, onSaved }: Props) {
    const [alertType, setAlertType] = useState<AlertConfig["type"]>("daily_briefing");
    const [threshold, setThreshold] = useState<number>(30);

    function handleSave() {
        if (alertType === "daily_briefing") {
            saveDailyBriefing(topic.id, locationName);
        } else {
            saveAlert({
                topicId: topic.id,
                topicName: topic.name,
                type: alertType,
                threshold
            });
        }
        onSaved(alertType, topic.name);
        onClose();
    }

    return (
        /* Backdrop overlay inside sheet */
        <div
            className="absolute inset-0 z-10 flex items-end justify-center"
            style={{ background: "rgba(15,23,42,0.35)" }}
            onClick={onClose}
        >
            <div
                className="w-full rounded-t-[var(--radius-lg)] p-6"
                style={{
                    background: "var(--surface-raised)",
                    boxShadow: "var(--shadow-modal)"
                }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label={`Create alert for ${topic.name}`}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-[20px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                            Create alert
                        </h2>
                        <p className="mt-1 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                            {topic.name}
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close alert dialog"
                        onClick={onClose}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full transition"
                        style={{ color: "var(--text-tertiary)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-sunken)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                        ✕
                    </button>
                </div>

                {/* Alert type choice */}
                <div
                    className="flex flex-col overflow-hidden rounded-[var(--radius-lg)]"
                    style={{ background: "var(--surface-page)", border: "1px solid var(--border-subtle)" }}
                >
                    {/* Option 1 */}
                    <div className="flex flex-col transition hover:bg-black/5" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <label className="flex cursor-pointer items-center justify-between p-4">
                            <div className="flex flex-col">
                                <span className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>Daily briefing</span>
                                <span className="text-[13px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>Morning market briefing focused on this topic. Delivered 8AM CET weekdays.</span>
                            </div>
                            <div className="flex shrink-0 ml-3 items-center justify-center w-5 h-5 rounded-full border" style={{ borderColor: alertType === "daily_briefing" ? "var(--accent)" : "var(--border-medium)", background: alertType === "daily_briefing" ? "var(--accent)" : "transparent" }}>
                                {alertType === "daily_briefing" && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <input
                                type="radio"
                                name="alertType"
                                value="daily_briefing"
                                checked={alertType === "daily_briefing"}
                                onChange={() => setAlertType("daily_briefing")}
                                className="hidden"
                            />
                        </label>

                        {/* Daily Briefing Preview Block */}
                        {alertType === "daily_briefing" && topic.briefingPreview && (
                            <div className="px-4 pb-4">
                                <div className="p-4 rounded-[var(--radius-md)] tabular-nums overflow-hidden" style={{ background: "var(--surface-sunken)", border: "1px solid var(--border-medium)" }}>
                                    {topic.briefingPreview.replace(/(^"|"$)/g, '').split('\n\n').map((block, i) => {
                                        const isStatus = block.startsWith('Status:');
                                        const isKeyDev = block.startsWith('Key developments');
                                        const isImplications = block.startsWith('Investor implications');
                                        const isHeader = isStatus || isKeyDev || isImplications;

                                        return (
                                            <div key={i} className={`mb-4 last:mb-0 ${i === 0 ? 'text-[11px] font-medium text-[var(--text-tertiary)]' : 'text-[12px] font-mono text-[var(--text-secondary)] whitespace-pre-wrap'}`}>
                                                {isHeader ? (
                                                    <>
                                                        <h4 className="text-[13px] font-bold font-sans tracking-tight mb-1" style={{ color: "var(--text-primary)" }}>
                                                            {block.split('\n')[0]}
                                                        </h4>
                                                        <div className="leading-loose">
                                                            {block.substring(block.indexOf('\n') + 1)}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="leading-relaxed">
                                                        {block}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Option 2 */}
                    <div className="flex flex-col px-4 py-4 transition hover:bg-black/5">
                        <label className="flex cursor-pointer items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>Notify if &gt; X%</span>
                                <span className="text-[13px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>Only when it peaks locally</span>
                            </div>
                            <div className="flex items-center justify-center w-5 h-5 rounded-full border" style={{ borderColor: alertType === "threshold" ? "var(--accent)" : "var(--border-medium)", background: alertType === "threshold" ? "var(--accent)" : "transparent" }}>
                                {alertType === "threshold" && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <input
                                type="radio"
                                name="alertType"
                                value="threshold"
                                checked={alertType === "threshold"}
                                onChange={() => setAlertType("threshold")}
                                className="hidden"
                            />
                        </label>

                        {/* Threshold Stepper */}
                        {alertType === "threshold" && (
                            <div className="mt-4 pt-4 flex gap-2 overflow-x-auto pb-1" style={{ borderTop: "1px solid var(--border-subtle)", msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                                {THRESHOLDS.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setThreshold(t); }}
                                        className="shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold transition"
                                        style={{
                                            background: threshold === t ? "var(--accent-subtle)" : "var(--surface-sunken)",
                                            color: threshold === t ? "var(--accent-dark)" : "var(--text-secondary)",
                                            border: `1px solid ${threshold === t ? "var(--accent-border)" : "transparent"}`
                                        }}
                                    >
                                        {t}%
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Action */}
                <button
                    type="button"
                    onClick={handleSave}
                    className="mt-6 w-full rounded-[var(--radius-lg)] py-3.5 text-[15px] font-bold tracking-tight transition active:scale-[0.98]"
                    style={{ background: "var(--accent)", color: "var(--text-inverse)", border: "none" }}
                >
                    Save alert
                </button>
            </div>
        </div>
    );
}
