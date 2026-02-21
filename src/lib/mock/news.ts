import { NewsItem } from "@/lib/types";

export interface DashboardNewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  tags: string[];
  summary: string;
  detail: string;
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
  }
];

function toDashboardItem(item: NewsItem): DashboardNewsItem {
  return {
    id: item.id,
    title: item.title,
    source: item.source,
    timeAgo: "Today",
    tags: item.tags,
    summary: item.shortSummary,
    detail: `${item.shortSummary} ${item.keyNumbers?.length ? `Key numbers: ${item.keyNumbers.join(", ")}.` : ""}`.trim()
  };
}

export const globalNews: DashboardNewsItem[] = mockNews.slice(0, 8).map(toDashboardItem);

export const personalizedNewsSeed: DashboardNewsItem[] = [
  ...mockNews.filter((n) => n.tags.includes("crypto") || n.tags.includes("ai") || n.tags.includes("stocks")),
  ...mockNews.filter((n) => n.tags.includes("savings"))
]
  .slice(0, 8)
  .map(toDashboardItem);
