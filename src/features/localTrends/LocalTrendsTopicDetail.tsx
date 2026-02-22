"use client";

import { useState } from "react";
import { Topic } from "./types";
import { toggleFollowed } from "./storage";
import { LocalTrendsAlertDialog } from "./LocalTrendsAlertDialog";

interface Props {
    topic: Topic;
    locationName: string;
    followed: string[];
    onFollowChange: (ids: string[]) => void;
    onBack: () => void;
}

/**
 * Topic detail view pushed inside LocalTrendsSheet.
 * Contains: back nav, why-trending, top articles, follow CTA, create alert.
 */
export function LocalTrendsTopicDetail({
    topic,
    locationName,
    followed,
    onFollowChange,
    onBack
}: Props) {
    const [showAlert, setShowAlert] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const isFollowing = followed.includes(topic.id);

    function handleFollow() {
        const next = toggleFollowed(topic.id);
        onFollowChange(next);
    }

    function handleAlertSaved(type: string, topicName: string) {
        if (type === "daily_briefing") {
            setToast(`Daily briefing for ${topicName} activated. Your first briefing arrives tomorrow at 8AM CET.`);
        } else {
            setToast("Alert created ✓");
        }
        setTimeout(() => setToast(null), 3000);
    }

    return (
        <div className="relative flex flex-col h-full">
            {/* Back button */}
            <button
                type="button"
                onClick={onBack}
                className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium transition"
                style={{ color: "var(--accent-dark)" }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to trends
            </button>

            {/* Topic header */}
            <div className="mb-6 flex items-center gap-3">
                <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[24px]"
                    style={{ background: "var(--surface-sunken)" }}
                    aria-hidden
                >
                    {topic.icon}
                </span>
                <div>
                    <h3 className="text-[20px] font-bold tracking-tight leading-tight" style={{ color: "var(--text-primary)" }}>
                        {topic.name}
                    </h3>
                    <p className="text-[14px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                        {topic.pct}% of local readers today
                    </p>
                </div>
            </div>

            {/* Why it's trending */}
            <div className="mb-6">
                <h4 className="text-[14px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    Why it{"'"}s trending
                </h4>
                <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {topic.whatsGoingOn[0]}
                </p>
            </div>

            {/* Key driver news */}
            <div className="mb-6">
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
                    <p className="text-[12px] font-medium uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>
                        {topic.keyDriverArticle.source} · {topic.keyDriverArticle.timeAgo}
                    </p>
                    <p className="text-[15px] font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                        “{topic.keyDriverArticle.title}”
                    </p>
                    <button
                        type="button"
                        className="text-[14px] font-semibold self-start mt-1 hover:underline inline-flex items-center gap-1"
                        style={{ color: "var(--accent-dark)" }}
                    >
                        Open in your feed
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* For investors */}
            <div className="mb-8">
                <h4 className="text-[14px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    For investors
                </h4>
                <ul className="list-disc pl-5 space-y-2 marker:text-[var(--text-tertiary)] text-[14px] leading-relaxed">
                    <li style={{ color: "var(--text-secondary)" }}>
                        <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Upside: </strong>
                        {topic.forInvestorsUpside}
                    </li>
                    <li style={{ color: "var(--text-secondary)" }}>
                        <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Risk: </strong>
                        {topic.forInvestorsRisk}
                    </li>
                </ul>
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <button
                    type="button"
                    onClick={handleFollow}
                    className="flex-1 rounded-[var(--radius-md)] py-3 text-[14px] font-semibold transition hover:bg-black/5 active:scale-[0.98]"
                    style={
                        isFollowing
                            ? { background: "var(--surface-sunken)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }
                            : { background: "var(--text-primary)", color: "var(--surface-page)" }
                    }
                >
                    {isFollowing ? "✓ Following" : "Follow this theme"}
                </button>
                <button
                    type="button"
                    onClick={() => setShowAlert(true)}
                    className="flex-1 rounded-[var(--radius-md)] py-3 text-[14px] font-semibold transition hover:bg-black/5 active:scale-[0.98]"
                    style={{ border: "1px solid var(--border-medium)", color: "var(--text-primary)", background: "transparent" }}
                >
                    Create alert
                </button>
            </div>

            {/* Toast */}
            {toast && (
                <div
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-medium shadow-lg"
                    style={{
                        background: "var(--positive)",
                        color: "#fff",
                        zIndex: 60
                    }}
                    role="status"
                    aria-live="polite"
                >
                    {toast}
                </div>
            )}

            {/* Alert dialog overlay */}
            {showAlert && (
                <LocalTrendsAlertDialog
                    topic={topic}
                    locationName={locationName}
                    onClose={() => setShowAlert(false)}
                    onSaved={handleAlertSaved}
                />
            )}
        </div>
    );
}
