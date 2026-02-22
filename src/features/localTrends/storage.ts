/**
 * LOCAL TRENDS — LOCAL STORAGE PERSISTENCE
 *
 * Key versioning: using `lt_v1_` prefix so future schema changes
 * can introduce `lt_v2_` without breaking existing stored data.
 *
 * Keys:
 *  - lt_v1_followed  → string[]  (topic IDs the user is following)
 *  - lt_v1_alerts    → AlertConfig[]
 */

import { AlertConfig } from "./types";

const KEYS = {
    followed: "lt_v1_followed",
    alerts: "lt_v1_alerts"
} as const;

// ─── Followed topics ──────────────────────────────────────────────────────────

export function getFollowed(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(KEYS.followed);
        return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
        return [];
    }
}

export function setFollowed(ids: string[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(KEYS.followed, JSON.stringify(ids));
    } catch {
        // ignore storage errors
    }
}

export function toggleFollowed(topicId: string): string[] {
    const current = getFollowed();
    const next = current.includes(topicId)
        ? current.filter((id) => id !== topicId)
        : [...current, topicId];
    setFollowed(next);
    return next;
}

// ─── Alerts ───────────────────────────────────────────────────────────────────

export function getAlerts(): AlertConfig[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(KEYS.alerts);
        return raw ? (JSON.parse(raw) as AlertConfig[]) : [];
    } catch {
        return [];
    }
}

export function saveAlert(config: Omit<AlertConfig, "createdAt">): AlertConfig {
    const full: AlertConfig = { ...config, createdAt: new Date().toISOString() };
    const current = getAlerts();

    // Replace existing alert for same topic if one exists
    const filtered = current.filter(
        (a) => !(a.topicId === config.topicId && a.type === config.type)
    );
    const next = [...filtered, full];

    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(KEYS.alerts, JSON.stringify(next));
        } catch {
            // ignore storage errors
        }
    }

    return full;
}
