import { UserProfile } from "@/lib/types";

export const profilePresets: UserProfile[] = [
  {
    id: "beginner-conservative",
    name: "Beginner Conservative (Savings focus)",
    interests: ["savings", "macro"],
    risk: "conservative",
    level: "beginner",
    watchlist: ["VWCE"],
    holdings: [{ ticker: "CASH", allocationPct: 80 }],
    alerts: ["ECB rates", "inflation", "savings"]
  },
  {
    id: "beginner-moderate",
    name: "Beginner Moderate (Index/ETFs)",
    interests: ["stocks", "savings", "macro"],
    risk: "moderate",
    level: "beginner",
    watchlist: ["VWCE", "SPY"],
    holdings: [{ ticker: "VWCE", allocationPct: 45 }],
    alerts: ["ETF", "Fed", "inflation"]
  },
  {
    id: "aggressive-crypto",
    name: "Aggressive Crypto",
    interests: ["crypto", "macro"],
    risk: "aggressive",
    level: "intermediate",
    watchlist: ["BTC", "ETH", "SOL"],
    holdings: [{ ticker: "BTC", allocationPct: 35 }],
    alerts: ["BTC", "crypto regulation", "ETH"]
  },
  {
    id: "stock-picker-ai-tech",
    name: "Stock picker AI/Tech",
    interests: ["stocks", "macro"],
    risk: "aggressive",
    level: "advanced",
    watchlist: ["NVDA", "TSLA", "AAPL"],
    holdings: [{ ticker: "NVDA", allocationPct: 20 }],
    alerts: ["TSLA earnings", "AI", "rates"]
  }
];

export const defaultProfile = profilePresets[1];

export type FrontRiskLevel = "conservative" | "moderate" | "aggressive";
export type FrontInterest = "crypto" | "stocks" | "savings" | "macro";

export interface FrontendProfileState {
  name: string;
  risk: FrontRiskLevel;
  interests: FrontInterest[];
}

export const defaultFrontendProfile: FrontendProfileState = {
  name: "Pepe",
  risk: "moderate",
  interests: ["stocks", "crypto"]
};

export function getWhyForYou(interests: FrontInterest[], tags: string[]) {
  if (interests.includes("crypto") && tags.some((tag) => ["crypto", "regulation", "volatility"].includes(tag))) {
    return "Because you follow crypto markets";
  }
  if (interests.includes("stocks") && tags.some((tag) => ["stocks", "ai", "tech", "earnings", "etf"].includes(tag))) {
    return "Because you like AI and stock opportunities";
  }
  if (interests.includes("savings") && tags.some((tag) => ["savings", "rates"].includes(tag))) {
    return "Because you prioritize stable savings ideas";
  }
  return "Because this could impact your financial goals";
}

export function getDailyTipForProfile(profile: FrontendProfileState) {
  if (profile.risk === "conservative") {
    return "Prioritise clarity over speed: compare 2 sources and note the main risk before acting.";
  }
  if (profile.risk === "aggressive") {
    return "On volatile days, set your loss limit before opening a position. Discipline avoids impulsive decisions.";
  }
  if (profile.interests.includes("crypto")) {
    return "If you follow crypto, check regulation and liquidity news first — they usually move markets more than social media noise.";
  }
  return "Block 10 minutes a day to review just 3 news items: macro context, your watchlist and one educational concept.";
}
