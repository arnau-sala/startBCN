export type Interest = "crypto" | "stocks" | "savings" | "macro";
export type RiskLevel = "conservative" | "moderate" | "aggressive";
export type KnowledgeLevel = "beginner" | "intermediate" | "advanced";

export type Difficulty = "beginner-friendly" | "complex";

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  tags: string[];
  tickers: string[];
  shortSummary: string;
  keyNumbers?: string[];
  difficulty: Difficulty;
}

export interface UserProfile {
  id: string;
  name: string;
  interests: Interest[];
  risk: RiskLevel;
  level: KnowledgeLevel;
  watchlist: string[];
  holdings?: Array<{ ticker: string; allocationPct: number }>;
  alerts: string[];
}

export type RelevanceLabel = "High" | "Medium" | "Low";

export interface RankedNewsItem extends NewsItem {
  relevanceScore: number;
  relevanceLabel: RelevanceLabel;
  reason: string;
}
