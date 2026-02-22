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

// ---------------------------------------------------------------------------
// GENERAL NEWS (Macroeconomic, Central Banks, European Focus)
// ---------------------------------------------------------------------------
export const mockGeneralNews: NewsItem[] = [
  {
    id: "g1",
    title: "Central Bank holds rates steady as inflation path is evaluated",
    source: "Financial Times",
    publishedAt: "2026-02-21T08:00:00.000Z",
    tags: ["macro", "rates", "savings"],
    tickers: ["EUR", "BUND"],
    shortSummary: "The ECB kept rates steady and stressed inflation progress remains uneven.",
    keyNumbers: ["Deposit rate 3.25%", "Core inflation 2.8%"],
    difficulty: "complex"
  },
  {
    id: "g2",
    title: "Euro area inflation reading reveals unexpected underlying strength",
    source: "Bloomberg",
    publishedAt: "2026-02-21T07:15:00.000Z",
    tags: ["macro", "inflation"],
    tickers: ["EUR"],
    shortSummary: "Services sector pricing power kept core inflation above the central bank's target.",
    keyNumbers: ["Services CPI +3.9% y/y"],
    difficulty: "complex"
  },
  {
    id: "g3",
    title: "Elite European lenders top estimates but project tighter margins",
    source: "Expansion",
    publishedAt: "2026-02-20T18:25:00.000Z",
    tags: ["stocks", "earnings", "macro"],
    tickers: ["SAN", "BBVA"],
    shortSummary: "Banks exceeded quarterly estimates, but management warned on margin pressure from falling rates.",
    difficulty: "complex"
  },
  {
    id: "g4",
    title: "Bond markets regain footing after intense sovereign debt selloff",
    source: "WSJ",
    publishedAt: "2026-02-20T16:40:00.000Z",
    tags: ["macro", "rates"],
    tickers: ["BUND"],
    shortSummary: "European government bond markets found a floor as dip buyers emerged following the recent yield spike.",
    keyNumbers: ["10Y Bund yield 2.55%"],
    difficulty: "beginner-friendly"
  },
  {
    id: "g5",
    title: "Brussels publishes strict transparency mandate for big tech platforms",
    source: "Politico",
    publishedAt: "2026-02-20T11:50:00.000Z",
    tags: ["regulation", "macro", "tech"],
    tickers: ["EUR"],
    shortSummary: "New regulatory draft focuses on transparency and structural controls for large platforms operating in Europe.",
    difficulty: "beginner-friendly"
  },
  {
    id: "g6",
    title: "Retail funds shift from technology stocks to broader European indices",
    source: "CNBC",
    publishedAt: "2026-02-20T09:30:00.000Z",
    tags: ["stocks", "etf", "macro"],
    tickers: ["VWCE", "EXSA"],
    shortSummary: "Retail and institutional investors rebalanced toward diversified pan-European products amid tech valuation concerns.",
    keyNumbers: ["Weekly ETF net inflows +€4.2B"],
    difficulty: "beginner-friendly"
  },
  {
    id: "g7",
    title: "BOE hints at cautious rate cuts as labor market moderates",
    source: "The Economist",
    publishedAt: "2026-02-19T14:20:00.000Z",
    tags: ["savings", "rates", "macro"],
    tickers: ["GBP"],
    shortSummary: "Retail fixed-term savings products repriced lower as money markets adjusted to a dovish tilt from policymakers.",
    difficulty: "beginner-friendly"
  },
  {
    id: "g8",
    title: "Manufacturing data points to sluggish start for Europe this year",
    source: "Reuters",
    publishedAt: "2026-02-19T10:10:00.000Z",
    tags: ["macro", "economy"],
    tickers: ["EUR"],
    shortSummary: "Manufacturing PMI indicates a prolonged contraction phase, driving calls for further structural fiscal stimulus.",
    difficulty: "complex"
  }
];

// ---------------------------------------------------------------------------
// PERSONALIZED NEWS (Portfolio matches: BTC, GLD, MSFT + Targets: AAPL, ETH)
// ---------------------------------------------------------------------------
export const mockPersonalizedNews: NewsItem[] = [
  {
    id: "p1",
    title: "Surging Bitcoin spot volumes hint at massive institutional adoption",
    source: "Bloomberg",
    publishedAt: "2026-02-21T07:10:00.000Z",
    tags: ["crypto", "volatility"],
    tickers: ["BTC"],
    shortSummary: "Crypto retraced after a sharp run as leverage cooled across major exchanges following recent spot ETF inflows.",
    keyNumbers: ["BTC -3.1% intraday", "Record ETF volumes"],
    difficulty: "beginner-friendly"
  },
  {
    id: "p2",
    title: "Microsoft unveils next-generation AI agents for enterprise workflow",
    source: "Reuters",
    publishedAt: "2026-02-21T08:50:00.000Z",
    tags: ["stocks", "tech", "earnings"],
    tickers: ["MSFT"],
    shortSummary: "Channel data points to stable Azure spending in core accounts, easing concerns over IT budget cuts.",
    difficulty: "beginner-friendly"
  },
  {
    id: "p3",
    title: "Gold prices climb as investors pile into safe-haven ETFs",
    source: "MarketWatch",
    publishedAt: "2026-02-21T08:10:00.000Z",
    tags: ["etf", "commodities", "macro"],
    tickers: ["GLD"],
    shortSummary: "Defensive allocation flows supported gold-linked products amid persistent macro uncertainty and central bank buying.",
    difficulty: "beginner-friendly"
  },
  {
    id: "p4",
    title: "Apple supply chain gears up for transformative AI-driven supercycle",
    source: "WSJ",
    publishedAt: "2026-02-20T16:15:00.000Z",
    tags: ["stocks", "tech", "ai"],
    tickers: ["AAPL"],
    shortSummary: "Supply chain sources indicate higher component orders for upcoming AI-enabled models, matching tech expansion profiles.",
    difficulty: "beginner-friendly"
  },
  {
    id: "p5",
    title: "Crypto whales accelerate BTC accumulation amid weekend dip",
    source: "The Block",
    publishedAt: "2026-02-20T14:20:00.000Z",
    tags: ["crypto", "flows", "savings"],
    tickers: ["BTC"],
    shortSummary: "On-chain data shows selective accumulation by long-term holders taking advantage of the sub-$70k pullback.",
    difficulty: "complex"
  },
  {
    id: "p6",
    title: "Copilot enterprise rollout exceeds Wall Street adoption forecasts",
    source: "The Verge",
    publishedAt: "2026-02-20T11:25:00.000Z",
    tags: ["stocks", "ai", "tech"],
    tickers: ["MSFT"],
    shortSummary: "A new feature rollout broadens AI upsell potential in enterprise plans, boosting average revenue per user.",
    difficulty: "complex"
  },
  {
    id: "p7",
    title: "Ethereum institutional staking offerings attract massive inflows",
    source: "CoinDesk",
    publishedAt: "2026-02-19T09:40:00.000Z",
    tags: ["crypto", "etf", "yield"],
    tickers: ["ETH"],
    shortSummary: "Firms looking for yield-generating smart contract platforms increasingly view Ethereum as a complementary portfolio asset.",
    difficulty: "complex"
  },
  {
    id: "p8",
    title: "Options market positions for major breakout in gold mining sector",
    source: "Financial Times",
    publishedAt: "2026-02-19T08:15:00.000Z",
    tags: ["macro", "commodities"],
    tickers: ["GLD"],
    shortSummary: "Mixed central bank policy signals and sticky inflation fears kept structural floor intact for defensive proxy assets.",
    difficulty: "complex"
  }
];

// Combine them to be able to export all if needed
export const mockNews: NewsItem[] = [...mockGeneralNews, ...mockPersonalizedNews];

const imageByNewsId: Record<string, string> = {
  // GENERAL
  g1: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
  g2: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  g3: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800",
  g4: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800",
  g5: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  g6: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800",
  g7: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
  g8: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",

  // PERSONALIZED
  p1: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
  p2: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800",
  p3: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
  p4: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=800",
  p5: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
  p6: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  p7: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
  p8: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"
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

export const globalNews: DashboardNewsItem[] = mockGeneralNews.map(toDashboardItem);

export const personalizedNewsSeed: DashboardNewsItem[] = mockPersonalizedNews.map(toDashboardItem);

export const allDashboardNews: DashboardNewsItem[] = mockNews.map(toDashboardItem);
