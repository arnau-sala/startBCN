// ─── Local Trends — Type definitions ──────────────────────────────────────────

export type LocationLevel = "city" | "region" | "country";

export type TrendTimeframe = "today" | "week";

export interface MockArticle {
    source: string;
    title: string;
    timeAgo: string;
}

export interface Topic {
    id: string;
    /** Display name */
    name: string;
    /** Emoji icon */
    icon: string;
    /** The macro category for styling badges */
    category: "Macro" | "Equity" | "Crypto" | "Real estate" | "Rates" | "Other";
    /** Reading share %, already a multiple of 5 in mock */
    pct: number;
    /** Delta vs yesterday, multiple of 5. Positive = up, negative = down */
    delta: number;
    /** List of bullet points explaining the trend */
    whatsGoingOn: string[];
    /** Upside copy for investors */
    forInvestorsUpside: string;
    /** Risk copy for investors */
    forInvestorsRisk: string;
    /** The primary news piece driving the trend */
    keyDriverArticle: MockArticle;
    articles: MockArticle[];
}

export interface LocalDataset {
    /** City identifier (slug) */
    cityId: string;
    cityName: string;
    regionName: string;
    countryName: string;
    /** If city sampleSize < kMin, regionSampleSize is checked */
    citySampleSize: number;
    regionSampleSize: number;
    countrySampleSize: number;
    today: Topic[];
    week: Topic[];
}

// ─── Privacy resolution result ────────────────────────────────────────────────

export interface ResolvedData {
    topics: Topic[];
    level: LocationLevel;
    locationName: string;
    wasFallback: boolean;
}

// ─── Storage types ────────────────────────────────────────────────────────────

export interface AlertConfig {
    topicId: string;
    topicName: string;
    type: "daily_digest" | "threshold";
    threshold?: number; // 20 | 30 | 40 | 50 | 60 | 70
    createdAt: string; // ISO
}
