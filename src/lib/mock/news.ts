import { NewsItem } from "@/lib/types";

export const mockNews: NewsItem[] = [
  {
    id: "n1",
<<<<<<< HEAD
    title: "Bitcoin climbs above $72,000 after record spot ETF inflows",
=======
    title: "Bitcoin surpasses $72,000 after record inflows into spot ETFs",
>>>>>>> aitor
    source: "CoinDesk",
    publishedAt: "2026-02-21T08:10:00.000Z",
    tags: ["crypto", "etf flows", "market momentum"],
    tickers: ["BTC"],
<<<<<<< HEAD
    shortSummary: "Net inflows into Bitcoin ETFs are driving a fresh upward move.",
    keyNumbers: ["BTC $72,100", "+$1.4B weekly inflows"],
=======
    shortSummary: "Net Bitcoin ETF inflows fuel a new upward leg for the price.",
    keyNumbers: ["$72,100 BTC", "+$1.4B weekly inflows"],
>>>>>>> aitor
    difficulty: "complex"
  },
  {
    id: "n2",
<<<<<<< HEAD
    title: "The Fed holds rates and reiterates a data-dependent approach",
=======
    title: "Fed holds rates and reiterates data-dependent approach",
>>>>>>> aitor
    source: "Bloomberg",
    publishedAt: "2026-02-21T07:45:00.000Z",
    tags: ["rates", "macro", "fed"],
    tickers: [],
<<<<<<< HEAD
    shortSummary: "The central bank keeps rates steady while leaving room for gradual cuts.",
=======
    shortSummary: "The central bank holds rates and leaves the door open to gradual cuts.",
>>>>>>> aitor
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
<<<<<<< HEAD
    shortSummary: "Quarterly results came in above expectations, led by data center demand.",
=======
    shortSummary: "Quarterly results topped expectations driven by data-center growth.",
>>>>>>> aitor
    keyNumbers: ["+38% revenue YoY", "74% gross margin"],
    difficulty: "complex"
  },
  {
    id: "n4",
<<<<<<< HEAD
    title: "The ECB points to inflation moving closer to target by summer",
=======
    title: "ECB signals inflation closer to target by summer",
>>>>>>> aitor
    source: "Financial Times",
    publishedAt: "2026-02-20T19:05:00.000Z",
    tags: ["ecb", "inflation", "macro", "rates"],
    tickers: [],
<<<<<<< HEAD
    shortSummary: "Disinflation continues, but the ECB remains cautious before easing policy.",
=======
    shortSummary: "Disinflation is progressing, but the ECB insists on caution before easing policy.",
>>>>>>> aitor
    keyNumbers: ["Core inflation 2.6%"],
    difficulty: "complex"
  },
  {
    id: "n5",
<<<<<<< HEAD
    title: "Savings accounts at 3.1% APY return to focus for cautious users",
    source: "Expansion",
    publishedAt: "2026-02-20T16:00:00.000Z",
    tags: ["savings", "retail banking", "rates"],
    tickers: [],
    shortSummary: "Bank competition is bringing back low-risk savings offers.",
    keyNumbers: ["3.1% APY", "no fees"],
=======
    title: "High-yield savings account at 3.1% APR back on savers' radar",
    source: "Expansión",
    publishedAt: "2026-02-20T16:00:00.000Z",
    tags: ["savings", "retail banking", "rates"],
    tickers: [],
    shortSummary: "Banking competition revives low-risk savings offers.",
    keyNumbers: ["3.1% APR", "no fees"],
>>>>>>> aitor
    difficulty: "beginner-friendly"
  },
  {
    id: "n6",
    title: "Tesla reports weaker margins due to discounts and logistics costs",
    source: "CNBC",
    publishedAt: "2026-02-20T13:40:00.000Z",
    tags: ["earnings", "ev", "stocks"],
    tickers: ["TSLA"],
<<<<<<< HEAD
    shortSummary: "Price pressure weighed on margins despite higher deliveries.",
=======
    shortSummary: "Pricing pressure hits margins despite delivery volume growth.",
>>>>>>> aitor
    keyNumbers: ["Operating margin 8.9%"],
    difficulty: "complex"
  },
  {
    id: "n7",
<<<<<<< HEAD
    title: "EuroStoxx hits weekly highs, led by bank stocks",
=======
    title: "EuroStoxx hits weekly highs led by banking sector",
>>>>>>> aitor
    source: "Investing",
    publishedAt: "2026-02-20T11:20:00.000Z",
    tags: ["stocks", "europe", "macro"],
    tickers: [],
<<<<<<< HEAD
    shortSummary: "Financials lead gains as markets expect rates to remain stable.",
=======
    shortSummary: "Financials lead gains on expectations of stable interest rates.",
>>>>>>> aitor
    keyNumbers: ["EuroStoxx +1.7% weekly"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n8",
<<<<<<< HEAD
    title: "MiCA regulation accelerates compliance requirements for EU crypto platforms",
=======
    title: "MiCA regulation accelerates requirements for EU crypto platforms",
>>>>>>> aitor
    source: "The Block",
    publishedAt: "2026-02-20T09:30:00.000Z",
    tags: ["crypto regulation", "crypto", "europe"],
    tickers: ["ETH", "BTC"],
<<<<<<< HEAD
    shortSummary: "New compliance deadlines are affecting operations and exchange costs.",
    keyNumbers: ["Phase 2 start: Q3 2026"],
=======
    shortSummary: "New compliance deadlines affect operations and costs for exchanges.",
    keyNumbers: ["Phase 2 effective: Q3 2026"],
>>>>>>> aitor
    difficulty: "complex"
  },
  {
    id: "n9",
<<<<<<< HEAD
    title: "Low-cost global ETFs gain popularity among beginner profiles",
=======
    title: "Low-cost global ETF gains popularity among beginner investors",
>>>>>>> aitor
    source: "Morningstar",
    publishedAt: "2026-02-19T21:12:00.000Z",
    tags: ["etf", "stocks", "savings", "long-term"],
    tickers: ["VWCE"],
<<<<<<< HEAD
    shortSummary: "Interest is rising in diversified products for recurring investing.",
=======
    shortSummary: "Interest in diversified products for periodic investing continues to grow.",
>>>>>>> aitor
    keyNumbers: ["TER 0.22%"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n10",
<<<<<<< HEAD
    title: "Gold pulls back after a rise in 10-year bond yields",
=======
    title: "Gold pulls back as 10-year bond yields rise",
>>>>>>> aitor
    source: "MarketWatch",
    publishedAt: "2026-02-19T18:10:00.000Z",
    tags: ["macro", "rates", "commodities"],
    tickers: [],
<<<<<<< HEAD
    shortSummary: "Bond moves are rebalancing expectations for safe-haven assets.",
=======
    shortSummary: "Bond market moves rebalance expectations for safe-haven assets.",
>>>>>>> aitor
    keyNumbers: ["US10Y: 4.32%"],
    difficulty: "complex"
  },
  {
    id: "n11",
<<<<<<< HEAD
    title: "Apple doubles down on on-device AI and raises services outlook",
=======
    title: "Apple bets on on-device AI and raises services guidance",
>>>>>>> aitor
    source: "WSJ",
    publishedAt: "2026-02-19T16:05:00.000Z",
    tags: ["ai", "earnings", "tech", "stocks"],
    tickers: ["AAPL"],
<<<<<<< HEAD
    shortSummary: "The company highlighted services growth and product AI strategy.",
=======
    shortSummary: "The company highlights services growth and its on-device AI strategy.",
>>>>>>> aitor
    keyNumbers: ["Services +14% YoY"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n12",
<<<<<<< HEAD
    title: "Spain CPI comes in softer, improving consumer outlook",
=======
    title: "Spain CPI surprises to the downside, improving consumer outlook",
>>>>>>> aitor
    source: "El Economista",
    publishedAt: "2026-02-19T11:55:00.000Z",
    tags: ["inflation", "macro", "spain"],
    tickers: [],
<<<<<<< HEAD
    shortSummary: "Lower inflation could ease pressure on household spending.",
=======
    shortSummary: "Lower-than-expected inflation would ease pressure on household spending.",
>>>>>>> aitor
    keyNumbers: ["Annual CPI: 2.3%"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n13",
<<<<<<< HEAD
    title: "Solana rises on stronger DeFi activity and DEX volumes",
=======
    title: "Solana rises on increased DeFi activity and DEX volume",
>>>>>>> aitor
    source: "Decrypt",
    publishedAt: "2026-02-18T20:40:00.000Z",
    tags: ["crypto", "defi", "market momentum"],
    tickers: ["SOL"],
<<<<<<< HEAD
    shortSummary: "The ecosystem is regaining traction as user activity increases.",
=======
    shortSummary: "The ecosystem regains momentum driven by higher user activity.",
>>>>>>> aitor
    keyNumbers: ["TVL +9% weekly"],
    difficulty: "complex"
  },
  {
    id: "n14",
<<<<<<< HEAD
    title: "Quick guide: what to check before opening a term deposit",
=======
    title: "Quick guide: what to check before opening a savings deposit",
>>>>>>> aitor
    source: "Rankia",
    publishedAt: "2026-02-18T09:15:00.000Z",
    tags: ["savings", "personal finance", "education"],
    tickers: [],
<<<<<<< HEAD
    shortSummary: "Nominal rate, APY, and penalties are key when comparing products.",
=======
    shortSummary: "Nominal rate, APR and early-withdrawal penalties are key for comparing products.",
>>>>>>> aitor
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
    source: "Expansion",
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
