import { NewsItem } from "@/lib/types";

export const mockNews: NewsItem[] = [
  {
    id: "n1",
    title: "Bitcoin surpasses $72,000 after record inflows into spot ETFs",
    source: "CoinDesk",
    publishedAt: "2026-02-21T08:10:00.000Z",
    tags: ["crypto", "etf flows", "market momentum"],
    tickers: ["BTC"],
    shortSummary: "Net Bitcoin ETF inflows fuel a new upward leg for the price.",
    keyNumbers: ["$72,100 BTC", "+$1.4B weekly inflows"],
    difficulty: "complex"
  },
  {
    id: "n2",
    title: "Fed holds rates and reiterates data-dependent approach",
    source: "Bloomberg",
    publishedAt: "2026-02-21T07:45:00.000Z",
    tags: ["rates", "macro", "fed"],
    tickers: [],
    shortSummary: "The central bank holds rates and leaves the door open to gradual cuts.",
    keyNumbers: ["Rates: 5.00%-5.25%"],
    difficulty: "complex"
  },
  {
    id: "n3",
    title: "Nvidia beats revenue again on strong AI chip demand",
    source: "Reuters",
    publishedAt: "2026-02-20T22:15:00.000Z",
    tags: ["earnings", "ai", "stocks", "tech"],
    tickers: ["NVDA"],
    shortSummary: "Quarterly results topped expectations driven by data-center growth.",
    keyNumbers: ["+38% revenue YoY", "74% gross margin"],
    difficulty: "complex"
  },
  {
    id: "n4",
    title: "ECB signals inflation closer to target by summer",
    source: "Financial Times",
    publishedAt: "2026-02-20T19:05:00.000Z",
    tags: ["ecb", "inflation", "macro", "rates"],
    tickers: [],
    shortSummary: "Disinflation is progressing, but the ECB insists on caution before easing policy.",
    keyNumbers: ["Core inflation 2.6%"],
    difficulty: "complex"
  },
  {
    id: "n5",
    title: "High-yield savings account at 3.1% APR back on savers' radar",
    source: "Expansión",
    publishedAt: "2026-02-20T16:00:00.000Z",
    tags: ["savings", "retail banking", "rates"],
    tickers: [],
    shortSummary: "Banking competition revives low-risk savings offers.",
    keyNumbers: ["3.1% APR", "no fees"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n6",
    title: "Tesla reports weaker margins due to discounts and logistics costs",
    source: "CNBC",
    publishedAt: "2026-02-20T13:40:00.000Z",
    tags: ["earnings", "ev", "stocks"],
    tickers: ["TSLA"],
    shortSummary: "Pricing pressure hits margins despite delivery volume growth.",
    keyNumbers: ["Operating margin 8.9%"],
    difficulty: "complex"
  },
  {
    id: "n7",
    title: "EuroStoxx hits weekly highs led by banking sector",
    source: "Investing",
    publishedAt: "2026-02-20T11:20:00.000Z",
    tags: ["stocks", "europe", "macro"],
    tickers: [],
    shortSummary: "Financials lead gains on expectations of stable interest rates.",
    keyNumbers: ["EuroStoxx +1.7% weekly"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n8",
    title: "MiCA regulation accelerates requirements for EU crypto platforms",
    source: "The Block",
    publishedAt: "2026-02-20T09:30:00.000Z",
    tags: ["crypto regulation", "crypto", "europe"],
    tickers: ["ETH", "BTC"],
    shortSummary: "New compliance deadlines affect operations and costs for exchanges.",
    keyNumbers: ["Phase 2 effective: Q3 2026"],
    difficulty: "complex"
  },
  {
    id: "n9",
    title: "Low-cost global ETF gains popularity among beginner investors",
    source: "Morningstar",
    publishedAt: "2026-02-19T21:12:00.000Z",
    tags: ["etf", "stocks", "savings", "long-term"],
    tickers: ["VWCE"],
    shortSummary: "Interest in diversified products for periodic investing continues to grow.",
    keyNumbers: ["TER 0.22%"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n10",
    title: "Gold pulls back as 10-year bond yields rise",
    source: "MarketWatch",
    publishedAt: "2026-02-19T18:10:00.000Z",
    tags: ["macro", "rates", "commodities"],
    tickers: [],
    shortSummary: "Bond market moves rebalance expectations for safe-haven assets.",
    keyNumbers: ["US10Y: 4.32%"],
    difficulty: "complex"
  },
  {
    id: "n11",
    title: "Apple bets on on-device AI and raises services guidance",
    source: "WSJ",
    publishedAt: "2026-02-19T16:05:00.000Z",
    tags: ["ai", "earnings", "tech", "stocks"],
    tickers: ["AAPL"],
    shortSummary: "The company highlights services growth and its on-device AI strategy.",
    keyNumbers: ["Services +14% YoY"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n12",
    title: "Spain CPI surprises to the downside, improving consumer outlook",
    source: "El Economista",
    publishedAt: "2026-02-19T11:55:00.000Z",
    tags: ["inflation", "macro", "spain"],
    tickers: [],
    shortSummary: "Lower-than-expected inflation would ease pressure on household spending.",
    keyNumbers: ["Annual CPI: 2.3%"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n13",
    title: "Solana rises on increased DeFi activity and DEX volume",
    source: "Decrypt",
    publishedAt: "2026-02-18T20:40:00.000Z",
    tags: ["crypto", "defi", "market momentum"],
    tickers: ["SOL"],
    shortSummary: "The ecosystem regains momentum driven by higher user activity.",
    keyNumbers: ["TVL +9% weekly"],
    difficulty: "complex"
  },
  {
    id: "n14",
    title: "Quick guide: what to check before opening a savings deposit",
    source: "Rankia",
    publishedAt: "2026-02-18T09:15:00.000Z",
    tags: ["savings", "personal finance", "education"],
    tickers: [],
    shortSummary: "Nominal rate, APR and early-withdrawal penalties are key for comparing products.",
    difficulty: "beginner-friendly"
  }
];

export interface DashboardNewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  tags: string[];
  summary: string;
  detail: string;
}

export const globalNews: DashboardNewsItem[] = [
  {
    id: "g1",
    title: "Fed holds rates and keeps data-dependent stance",
    source: "Bloomberg",
    timeAgo: "2h ago",
    tags: ["rates", "macro"],
    summary: "Markets price a slower path for cuts as inflation remains sticky.",
    detail: "The Fed maintained rates and signaled caution. Equity indexes were mixed while bond yields moved higher."
  },
  {
    id: "g2",
    title: "Bitcoin drops as leverage unwinds after ETF inflow streak",
    source: "CoinDesk",
    timeAgo: "3h ago",
    tags: ["crypto", "volatility"],
    summary: "BTC retraced after a sharp rally, with derivatives funding cooling down.",
    detail: "Traders reduced risk after a volatile week. Spot demand remains healthy but intraday swings increased."
  },
  {
    id: "g3",
    title: "NVIDIA beats estimates with strong AI data center demand",
    source: "Reuters",
    timeAgo: "5h ago",
    tags: ["earnings", "ai", "stocks"],
    summary: "Revenue growth remained robust, with guidance above consensus.",
    detail: "Management highlighted continued enterprise AI adoption. Valuation remains the key debate for investors."
  },
  {
    id: "g4",
    title: "Eurozone inflation softens ahead of ECB meeting",
    source: "FT",
    timeAgo: "7h ago",
    tags: ["inflation", "ecb", "macro"],
    summary: "Core inflation eased slightly, supporting cautious optimism in Europe.",
    detail: "Economists expect no immediate pivot, but tone changes could impact bank and growth stocks."
  },
  {
    id: "g5",
    title: "Global ETF inflows continue as retail participation rises",
    source: "Morningstar",
    timeAgo: "9h ago",
    tags: ["etf", "long-term", "savings"],
    summary: "Low-cost diversified products remain preferred by beginner investors.",
    detail: "Flows were broad-based across developed markets. Risk appetite remains selective."
  }
];

export const personalizedNewsSeed: DashboardNewsItem[] = [
  {
    id: "p1",
    title: "AI semiconductor momentum remains strong in US mega caps",
    source: "WSJ",
    timeAgo: "1h ago",
    tags: ["ai", "stocks", "tech"],
    summary: "Chip supply chains and cloud spend continue to drive AI names.",
    detail: "Analysts raised forecasts for selected chipmakers while warning about high expectations."
  },
  {
    id: "p2",
    title: "Crypto regulation timeline in EU enters key implementation phase",
    source: "The Block",
    timeAgo: "4h ago",
    tags: ["crypto", "regulation", "europe"],
    summary: "Platforms prepare for stricter compliance and reporting obligations.",
    detail: "Policy clarity may improve trust, but short-term compliance costs could pressure margins."
  },
  {
    id: "p3",
    title: "Savings products above 3% TAE gain traction among cautious profiles",
    source: "Expansión",
    timeAgo: "6h ago",
    tags: ["savings", "rates"],
    summary: "Households seek yield while preserving flexibility and lower volatility.",
    detail: "Banks are competing on simple savings offers, with terms and liquidity as main differentiators."
  },
  {
    id: "p4",
    title: "Diversified index ETFs remain top pick for passive allocations",
    source: "Investing",
    timeAgo: "10h ago",
    tags: ["stocks", "etf", "macro"],
    summary: "Broad exposure and lower fees keep index strategies attractive.",
    detail: "Experts recommend consistency and long-term discipline over short-term market timing."
  }
];
