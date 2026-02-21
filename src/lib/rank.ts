import { NewsItem, RankedNewsItem, RelevanceLabel, UserProfile } from "@/lib/types";

const interestTagMap: Record<string, string[]> = {
  crypto: ["crypto", "defi", "crypto regulation", "etf flows"],
  stocks: ["stocks", "earnings", "tech", "etf", "ai"],
  savings: ["savings", "personal finance", "retail banking", "education"],
  macro: ["macro", "rates", "inflation", "fed", "ecb", "spain", "europe"]
};

const riskBoost: Record<UserProfile["risk"], number> = {
  conservative: -6,
  moderate: 0,
  aggressive: 6
};

const levelPenalty: Record<UserProfile["level"], number> = {
  beginner: 8,
  intermediate: 3,
  advanced: 0
};

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(value, max));
}

function labelFromScore(score: number): RelevanceLabel {
  if (score >= 70) return "High";
  if (score >= 45) return "Medium";
  return "Low";
}

export function rankNewsForProfile(news: NewsItem[], profile: UserProfile): RankedNewsItem[] {
  return [...news]
    .map((item) => {
      let score = 30;
      const reasons: string[] = [];

      profile.interests.forEach((interest) => {
        const matchingTag = interestTagMap[interest].find((tag) => item.tags.includes(tag));
        if (matchingTag) {
          score += 14;
          reasons.push(`te interesa ${interest}`);
        }
      });

      const matchedWatchlist = profile.watchlist.filter((ticker) => item.tickers.includes(ticker));
      if (matchedWatchlist.length > 0) {
        score += 24;
        reasons.push(`sigues ${matchedWatchlist.join(", ")}`);
      }

      const matchedAlerts = profile.alerts.filter((alert) =>
        `${item.title} ${item.tags.join(" ")}`.toLowerCase().includes(alert.toLowerCase())
      );
      if (matchedAlerts.length > 0) {
        score += 10;
        reasons.push(`coincide con alerta: ${matchedAlerts[0]}`);
      }

      if (profile.risk === "aggressive" && item.tags.includes("market momentum")) {
        score += riskBoost[profile.risk];
      } else if (profile.risk === "conservative" && item.tags.includes("savings")) {
        score += 12;
      } else {
        score += riskBoost[profile.risk];
      }

      if (profile.level === "beginner" && item.difficulty === "complex") {
        score -= levelPenalty.beginner;
      }

      score = clamp(score);

      return {
        ...item,
        relevanceScore: score,
        relevanceLabel: labelFromScore(score),
        reason: reasons[0] ?? "alineado con tu perfil general"
      };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}
