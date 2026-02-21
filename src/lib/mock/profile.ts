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
