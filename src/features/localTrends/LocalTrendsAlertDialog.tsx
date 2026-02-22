"use client";

import { useState } from "react";
import { AlertConfig } from "./types";
import { saveAlert } from "./storage";

const THRESHOLDS = [20, 30, 40, 50, 60, 70] as const;

interface Props {
    topicId: string;
    topicName: string;
    onClose: () => void;
    onSaved: () => void;
}

/**
 * Inline alert creation dialog within the sheet.
 * Saves to localStorage and calls onSaved to show a toast.
 */
export function LocalTrendsAlertDialog({ topicId, topicName, onClose, onSaved }: Props) {
    const [alertType, setAlertType] = useState<AlertConfig["type"]>("daily_digest");
    const [threshold, setThreshold] = useState<number>(30);

    function handleSave() {
        saveAlert({
            topicId,
            topicName,
            type: alertType,
            threshold: alertType === "threshold" ? threshold : undefined
        });
        onSaved();
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
                aria-modal="true"
                aria-label={`Create alert for ${topicName}`}
            >
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <p className="eyebrow">Alert</p>
                        <h3 className="mt-0.5 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                            {topicName}
                        </h3>
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
                <div className="space-y-3">
                    {/* Option 1 */}
                    <label
                        className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] p-3 transition"
                        style={{
                            background: alertType === "daily_digest" ? "var(--accent-subtle)" : "var(--surface-sunken)",
                            border: alertType === "daily_digest" ? "1px solid var(--accent-border)" : "1px solid transparent"
                        }}
                    >
                        <input
                            type="radio"
                            name="alertType"
                            value="daily_digest"
                            checked={alertType === "daily_digest"}
                            onChange={() => setAlertType("daily_digest")}
                            className="mt-0.5 accent-[var(--accent)]"
                        />
                        <div>
                            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                Daily digest on this topic
                            </p>
                            <p className="mt-0.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
                                Receive a morning summary when this topic trends
                            </p>
                        </div>
                    </label>

                    {/* Option 2 */}
                    <label
                        className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] p-3 transition"
                        style={{
                            background: alertType === "threshold" ? "var(--accent-subtle)" : "var(--surface-sunken)",
                            border: alertType === "threshold" ? "1px solid var(--accent-border)" : "1px solid transparent"
                        }}
                    >
                        <input
                            type="radio"
                            name="alertType"
                            value="threshold"
                            checked={alertType === "threshold"}
                            onChange={() => setAlertType("threshold")}
                            className="mt-0.5 accent-[var(--accent)]"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                Notify me if trend goes above X%
                            </p>
                            {alertType === "threshold" && (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>Threshold</span>
                                        <span className="text-sm font-semibold" style={{ color: "var(--accent-dark)" }}>
                                            {threshold}%
                                        </span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {THRESHOLDS.map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={(e) => { e.preventDefault(); setThreshold(t); }}
                                                className="rounded-full px-3 py-1 text-xs font-medium transition"
                                                style={{
                                                    background: threshold === t ? "var(--accent)" : "var(--surface-raised)",
                                                    color: threshold === t ? "var(--text-inverse)" : "var(--text-secondary)",
                                                    border: `1px solid ${threshold === t ? "var(--accent)" : "var(--border-subtle)"}`
                                                }}
                                            >
                                                {t}%
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </label>
                </div>

                {/* Action */}
                <button
                    type="button"
                    onClick={handleSave}
                    className="mt-5 w-full rounded-[var(--radius-md)] py-3 text-sm font-semibold transition hover:brightness-95"
                    style={{ background: "var(--accent)", color: "var(--text-inverse)" }}
                >
                    Save alert
                </button>
            </div>
        </div>
    );
}
