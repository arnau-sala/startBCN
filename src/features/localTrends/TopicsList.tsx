import React from 'react';
import { Topic } from './types';
import { MapCity } from './EuropeMap';

interface Props {
    topics: Topic[];
    city: MapCity;
    timeframe: "today" | "week";
    followed: string[];
    onFollow: (id: string, e: React.MouseEvent) => void;
    onAlert: (topic: Topic, e: React.MouseEvent) => void;
    onTopicClick: (topicId: string) => void;
}

export function TopicsList({ topics, city, timeframe, followed, onFollow, onAlert, onTopicClick }: Props) {
    const maxPct = Math.max(...topics.map(t => t.pct), 1);

    return (
        <div className="flex flex-col pb-6 bg-[var(--surface-raised)] h-full">
            <div className="px-6 py-4 flex items-center justify-between border-b border-[var(--border-subtle)]">
                <h3 className="text-[17px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    Top topics
                </h3>
                <span className="text-[12px] font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--surface-sunken)", color: "var(--text-secondary)" }}>
                    {timeframe === "today" ? "Today" : "This week"}
                </span>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-3">
                {topics.map((topic, idx) => {
                    const isUp = topic.delta > 0;
                    const isDown = topic.delta < 0;
                    const isFollowing = followed.includes(topic.id);
                    const progress = (topic.pct / maxPct) * 100;

                    return (
                        <div
                            key={topic.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => onTopicClick(topic.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onTopicClick(topic.id);
                                }
                            }}
                            className="text-left relative w-full rounded-[var(--radius-lg)] p-4 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                            style={{
                                background: "var(--surface-page)",
                                border: "1px solid var(--border-subtle)",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                                cursor: "pointer"
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex shrink-0 items-center justify-center w-6 h-6 rounded-full text-[12px] font-semibold mt-0.5" style={{ background: "var(--surface-sunken)", color: "var(--text-tertiary)" }}>
                                    {idx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[17px] leading-none" aria-hidden>{topic.icon}</span>
                                            <span className="text-[15px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>{topic.name}</span>
                                            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide" style={{ background: "var(--surface-sunken)", color: "var(--text-secondary)" }}>
                                                {topic.category || "Topic"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>{topic.pct}%</span>
                                            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full" style={{ color: isUp ? "var(--positive)" : isDown ? "var(--negative)" : "var(--text-tertiary)", background: isUp ? "var(--positive-bg)" : isDown ? "var(--negative-bg)" : "var(--surface-sunken)" }}>
                                                {isUp ? "↑" : isDown ? "↓" : ""}{Math.abs(topic.delta)}% {timeframe === "week" ? "vs last week" : "vs yesterday"}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="w-full h-[3px] rounded-full mt-3 overflow-hidden" style={{ background: "var(--surface-sunken)" }}>
                                        <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%`, background: "var(--accent-teal)" }} />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 shrink-0 ml-2">
                                    <button
                                        type="button"
                                        onClick={(e) => onFollow(topic.id, e)}
                                        className="h-8 px-3 rounded-full text-[12px] font-semibold transition hover:bg-black/5"
                                        style={isFollowing ? { background: "var(--surface-sunken)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" } : { background: "transparent", border: "1px solid var(--border-medium)", color: "var(--text-primary)" }}
                                    >
                                        {isFollowing ? "✓ Following" : "Follow"}
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Create alert"
                                        onClick={(e) => onAlert(topic, e)}
                                        className="h-8 w-8 rounded-full flex items-center justify-center transition hover:bg-black/5"
                                        style={{ border: "1px solid var(--border-subtle)", background: "transparent", color: "var(--text-secondary)" }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
