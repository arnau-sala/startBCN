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
    return "Prioriza claridad sobre rapidez: compara 2 fuentes y anota el riesgo principal antes de actuar.";
  }
  if (profile.risk === "aggressive") {
    return "En dias volatilies, define tu limite de perdida antes de abrir una posicion. La disciplina evita decisiones impulsivas.";
  }
  if (profile.interests.includes("crypto")) {
    return "Si sigues cripto, revisa primero noticias de regulacion y liquidez: suelen mover mas que el ruido en redes.";
  }
  return "Bloquea 10 minutos al dia para revisar solo 3 noticias: contexto macro, tu watchlist y un concepto educativo.";
}
