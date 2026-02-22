import { NewsItem } from "@/lib/types";

export interface DashboardNewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  tags: string[];
  tickers?: string[];
  summary: string;
  detail: string;
  imageUrl?: string;
}

export const mockNews: NewsItem[] = [
  {
    id: "n1",
    title: "ECB keeps rates unchanged and signals data-dependent path",
    source: "Financial Times",
    publishedAt: "2026-02-21T08:00:00.000Z",
    tags: ["macro", "rates", "savings"],
    tickers: ["EUR", "BUND"],
    shortSummary: "The ECB kept rates steady and stressed inflation progress remains uneven.",
    keyNumbers: ["Deposit rate 3.25%", "Core inflation 2.8%"],
    difficulty: "complex"
  },
  {
    id: "n2",
    title: "Bitcoin pulls back after weekly rally as traders de-risk",
    source: "Bloomberg",
    publishedAt: "2026-02-21T07:10:00.000Z",
    tags: ["crypto", "volatility", "macro"],
    tickers: ["BTC", "ETH"],
    shortSummary: "Crypto retraced after a sharp run as leverage cooled across major exchanges.",
    keyNumbers: ["BTC -3.1% intraday", "Funding rates normalized"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n3",
    title: "NVIDIA suppliers gain on renewed AI infrastructure demand",
    source: "Reuters",
    publishedAt: "2026-02-21T06:45:00.000Z",
    tags: ["stocks", "ai", "tech", "earnings"],
    tickers: ["NVDA", "ASML", "TSM"],
    shortSummary: "Chip ecosystem names rose on expectations of stronger AI capex.",
    keyNumbers: ["Sector +1.8% pre-market"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n4",
    title: "US payroll revisions cool rate-cut expectations",
    source: "WSJ",
    publishedAt: "2026-02-20T21:15:00.000Z",
    tags: ["macro", "rates"],
    tickers: ["DXY", "TLT"],
    shortSummary: "Labor revisions pointed to resilient employment, pushing cuts further out.",
    keyNumbers: ["2Y yield +9 bps"],
    difficulty: "complex"
  },
  {
    id: "n5",
    title: "European banks beat earnings but guidance remains cautious",
    source: "Expansion",
    publishedAt: "2026-02-20T18:25:00.000Z",
    tags: ["stocks", "earnings", "macro"],
    tickers: ["SAN", "BBVA"],
    shortSummary: "Banks exceeded quarterly estimates, but management warned on margin pressure.",
    difficulty: "complex"
  },
  {
    id: "n6",
    title: "ETF inflows rotate from mega-cap tech into broad market",
    source: "CNBC",
    publishedAt: "2026-02-20T17:00:00.000Z",
    tags: ["stocks", "etf", "savings"],
    tickers: ["SPY", "QQQ", "VWCE"],
    shortSummary: "Investors rebalanced toward diversified products after tech outperformance.",
    keyNumbers: ["Weekly ETF net inflows +€4.2B"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n7",
    title: "Oil retreats as inventory data offsets geopolitical risk",
    source: "MarketWatch",
    publishedAt: "2026-02-20T15:40:00.000Z",
    tags: ["macro", "commodities"],
    tickers: ["BRENT"],
    shortSummary: "Crude declined as US inventory surprise outweighed supply headlines.",
    difficulty: "complex"
  },
  {
    id: "n8",
    title: "UK savings rates edge lower after bond rally",
    source: "The Economist",
    publishedAt: "2026-02-20T14:20:00.000Z",
    tags: ["savings", "rates", "macro"],
    tickers: ["GILT"],
    shortSummary: "Retail savings products repriced lower as sovereign yields eased.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n9",
    title: "Tesla suppliers brace for margin pressure ahead of delivery update",
    source: "Reuters",
    publishedAt: "2026-02-20T13:10:00.000Z",
    tags: ["stocks", "earnings", "tech"],
    tickers: ["TSLA"],
    shortSummary: "Component makers guided for tighter profitability before next delivery release.",
    difficulty: "complex"
  },
  {
    id: "n10",
    title: "EU drafts updated crypto compliance framework for exchanges",
    source: "Politico",
    publishedAt: "2026-02-20T11:50:00.000Z",
    tags: ["crypto", "regulation", "macro"],
    tickers: ["BTC", "ETH"],
    shortSummary: "Draft guidance focuses on custody transparency and cross-border controls.",
    difficulty: "complex"
  },
  {
    id: "n11",
    title: "Dividend ETFs attract defensive flows amid earnings uncertainty",
    source: "Morningstar",
    publishedAt: "2026-02-20T10:00:00.000Z",
    tags: ["etf", "stocks", "savings"],
    tickers: ["VIG", "SCHD"],
    shortSummary: "Income-focused funds outperformed as investors sought lower-volatility exposure.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n12",
    title: "USD firming pressures emerging-market equities",
    source: "Bloomberg",
    publishedAt: "2026-02-19T19:30:00.000Z",
    tags: ["macro", "stocks", "rates"],
    tickers: ["EEM", "DXY"],
    shortSummary: "A stronger dollar weighed on risk assets across several EM markets.",
    difficulty: "complex"
  },
  {
    id: "n13",
    title: "Bitcoin derivatives funding cools after volatility spike",
    source: "CoinDesk",
    publishedAt: "2026-02-21T09:00:00.000Z",
    tags: ["crypto", "volatility"],
    tickers: ["BTC"],
    shortSummary: "Funding rates normalized as leverage reset across major venues.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n14",
    title: "Large wallets add to Bitcoin during intraday weakness",
    source: "The Block",
    publishedAt: "2026-02-21T08:20:00.000Z",
    tags: ["crypto", "flows"],
    tickers: ["BTC"],
    shortSummary: "On-chain data shows selective accumulation in pullbacks.",
    difficulty: "complex"
  },
  {
    id: "n15",
    title: "Options market prices wider short-term range for BTC",
    source: "Bloomberg",
    publishedAt: "2026-02-21T07:40:00.000Z",
    tags: ["crypto", "macro"],
    tickers: ["BTC"],
    shortSummary: "Implied volatility rose ahead of macro catalysts this week.",
    difficulty: "complex"
  },
  {
    id: "n16",
    title: "Microsoft cloud demand stays resilient in enterprise checks",
    source: "Reuters",
    publishedAt: "2026-02-21T08:50:00.000Z",
    tags: ["stocks", "tech", "earnings"],
    tickers: ["MSFT"],
    shortSummary: "Channel data points to stable Azure spending in core accounts.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n17",
    title: "Microsoft AI copilots expand across productivity suite",
    source: "The Verge",
    publishedAt: "2026-02-21T07:25:00.000Z",
    tags: ["stocks", "ai", "tech"],
    tickers: ["MSFT"],
    shortSummary: "New feature rollout broadens AI upsell potential in enterprise plans.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n18",
    title: "Analysts lift Microsoft targets on margin durability",
    source: "WSJ",
    publishedAt: "2026-02-20T20:10:00.000Z",
    tags: ["stocks", "earnings"],
    tickers: ["MSFT"],
    shortSummary: "Street updates cite operating leverage and disciplined spending.",
    difficulty: "complex"
  },
  {
    id: "n19",
    title: "Options flow signals steady demand for MSFT upside",
    source: "CNBC",
    publishedAt: "2026-02-20T18:35:00.000Z",
    tags: ["stocks", "tech"],
    tickers: ["MSFT"],
    shortSummary: "Call activity stayed firm as investors positioned for follow-through.",
    difficulty: "complex"
  },
  {
    id: "n20",
    title: "Gold ETF inflows pick up as real yields pause",
    source: "MarketWatch",
    publishedAt: "2026-02-21T08:10:00.000Z",
    tags: ["etf", "commodities", "macro"],
    tickers: ["GLD"],
    shortSummary: "Defensive allocation flows supported gold-linked products.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n21",
    title: "GLD volume rises amid demand for portfolio hedges",
    source: "Morningstar",
    publishedAt: "2026-02-21T07:05:00.000Z",
    tags: ["etf", "savings"],
    tickers: ["GLD"],
    shortSummary: "Investors rotated into hedging exposures after equity volatility.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n22",
    title: "Gold holds support as policy outlook remains mixed",
    source: "Financial Times",
    publishedAt: "2026-02-20T19:15:00.000Z",
    tags: ["macro", "commodities"],
    tickers: ["GLD"],
    shortSummary: "Mixed policy signals kept demand for defensive assets stable.",
    difficulty: "complex"
  },
  {
    id: "n23",
    title: "Macro funds keep moderate overweight in gold ETFs",
    source: "Reuters",
    publishedAt: "2026-02-20T16:00:00.000Z",
    tags: ["etf", "macro"],
    tickers: ["GLD"],
    shortSummary: "Positioning data shows sustained, but not crowded, gold exposure.",
    difficulty: "complex"
  },
  {
    id: "n24",
    title: "Central-bank reserve demand supports medium-term gold view",
    source: "Bloomberg",
    publishedAt: "2026-02-20T13:45:00.000Z",
    tags: ["macro", "commodities"],
    tickers: ["GLD"],
    shortSummary: "Reserve accumulation remains a structural support for bullion proxies.",
    difficulty: "complex"
  }
];

const imageByNewsId: Record<string, string> = {
  n1: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
  n2: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
  n3: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800",
  n4: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  n5: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800",
  n6: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  n7: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800",
  n8: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800",
  n9: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
  n10: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  n11: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
  n12: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  n13: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
  n14: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=800",
  n15: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
  n16: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  n17: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
  n18: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
  n19: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  n20: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800",
  n21: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800",
  n22: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800",
  n23: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  n24: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800"
};

function toDashboardItem(item: NewsItem): DashboardNewsItem {
  return {
    id: item.id,
    title: item.title,
    source: item.source,
    timeAgo: "Today",
    tags: item.tags,
    tickers: item.tickers,
    summary: item.shortSummary,
    detail: `${item.shortSummary} ${item.keyNumbers?.length ? `Key numbers: ${item.keyNumbers.join(", ")}.` : ""}`.trim(),
    imageUrl: imageByNewsId[item.id]
  };
}

export const globalNews: DashboardNewsItem[] = mockNews.slice(0, 8).map(toDashboardItem);

export const personalizedNewsSeed: DashboardNewsItem[] = [
  ...mockNews.filter((n) => n.tags.includes("crypto") || n.tags.includes("ai") || n.tags.includes("stocks")),
  ...mockNews.filter((n) => n.tags.includes("savings"))
]
  .slice(0, 8)
  .map(toDashboardItem);

export const allDashboardNews: DashboardNewsItem[] = mockNews.map(toDashboardItem);
