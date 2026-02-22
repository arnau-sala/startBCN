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

    function handleAlertSaved() {
        setToast("Alert created ✓");
        setTimeout(() => setToast(null), 2500);
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
            <div className="mb-5 flex items-center gap-3">
                <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl"
                    style={{ background: "var(--accent-subtle)" }}
                    aria-hidden
                >
                    {topic.icon}
                </span>
                <div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                        {topic.name}
                    </h3>
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                        {topic.pct}% of local readers today
                    </p>
                </div>
            </div>

            {/* Why it's trending */}
            <div
                className="mb-5 rounded-[var(--radius-md)] p-4"
                style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent-border)" }}
            >
                <p className="eyebrow mb-1">Why it{"'"}s trending</p>
                <p className="text-sm leading-6" style={{ color: "var(--text-primary)" }}>
                    {topic.whatsGoingOn.join(" ")}
                </p>
            </div>

            {/* Top coverage */}
            <div className="mb-5">
                <p className="eyebrow mb-3">Top coverage</p>
                <div className="space-y-2">
                    {topic.articles.map((article, i) => (
                        <div
                            key={i}
                            className="row-inset"
                        >
                            <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                                {article.source} · {article.timeAgo}
                            </p>
                            <p className="mt-0.5 text-sm font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
                                {article.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3">
                <button
                    type="button"
                    onClick={handleFollow}
                    className="flex-1 rounded-[var(--radius-md)] py-2.5 text-sm font-semibold transition"
                    style={
                        isFollowing
                            ? {
                                background: "var(--surface-sunken)",
                                color: "var(--text-secondary)",
                                border: "1px solid var(--border-subtle)"
                            }
                            : {
                                background: "var(--accent)",
                                color: "var(--text-inverse)"
                            }
                    }
                >
                    {isFollowing ? "Following ✓" : "Follow topic"}
                </button>
                <button
                    type="button"
                    onClick={() => setShowAlert(true)}
                    className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition"
                    style={{
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)",
                        background: "var(--surface-raised)"
                    }}
                >
                    🔔 Alert
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
                    topicId={topic.id}
                    topicName={topic.name}
                    onClose={() => setShowAlert(false)}
                    onSaved={handleAlertSaved}
                />
            )}
        </div>
    );
}
