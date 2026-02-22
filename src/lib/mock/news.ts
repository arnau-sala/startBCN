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
  simpleTitle: string;
  simpleBullets: string[];
  fullArticle: { subtitle: string; paragraphs: string[] };
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
    title: "S&P 500 ETF flows accelerate as investors seek broad exposure",
    source: "Reuters",
    publishedAt: "2026-02-21T08:50:00.000Z",
    tags: ["stocks", "etf", "macro"],
    tickers: ["SPY"],
    shortSummary: "Channel data points to stable Azure spending in core accounts.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n17",
    title: "S&P 500 breadth improves as rally broadens beyond tech",
    source: "The Verge",
    publishedAt: "2026-02-21T07:25:00.000Z",
    tags: ["stocks", "macro"],
    tickers: ["SPY"],
    shortSummary: "New feature rollout broadens AI upsell potential in enterprise plans.",
    difficulty: "beginner-friendly"
  },
  {
    id: "n18",
    title: "Analysts see continued upside for S&P 500 on earnings momentum",
    source: "WSJ",
    publishedAt: "2026-02-20T20:10:00.000Z",
    tags: ["stocks", "earnings"],
    tickers: ["SPY"],
    shortSummary: "Street updates cite operating leverage and disciplined spending.",
    difficulty: "complex"
  },
  {
    id: "n19",
    title: "Options flow signals steady demand for SPY upside",
    source: "CNBC",
    publishedAt: "2026-02-20T18:35:00.000Z",
    tags: ["stocks", "etf"],
    tickers: ["SPY"],
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

const articleContentById: Record<string, { simpleTitle: string; simpleBullets: string[]; fullArticle: { subtitle: string; paragraphs: string[] } }> = {
  n1: {
    simpleTitle: "The ECB held rates steady — your savings returns may shift",
    simpleBullets: [
      "The European Central Bank kept its deposit rate at 3.25%, matching expectations.",
      "Core inflation remains at 2.8%, above the 2% target, keeping the ECB cautious.",
      "Fixed-rate savings products could see small adjustments in the coming weeks."
    ],
    fullArticle: {
      subtitle: "ECB holds at 3.25% while inflation debate intensifies",
      paragraphs: [
        "The European Central Bank kept its benchmark deposit rate unchanged at 3.25% on Thursday, in a widely anticipated decision that reflects the delicate balance policymakers face between slowing growth and persistent inflation pressures across the eurozone.",
        "President Christine Lagarde emphasized during the press conference that the path forward remains \"data-dependent and meeting-by-meeting,\" signaling no urgency to ease monetary policy despite mounting calls from southern European economies for relief. Core inflation, which strips out volatile food and energy prices, ticked down slightly to 2.8% but remains well above the bank's 2% target.",
        "Bond markets reacted calmly to the decision, with the German 10-year Bund yield holding steady near 2.38%. However, money-market pricing now implies fewer than two rate cuts for the remainder of 2026, down from nearly three just six weeks ago. For retail savers, the practical implication is that high-yield savings accounts and fixed-term deposits will likely maintain attractive rates for longer than many expected at the start of the year.",
        "Analysts at Deutsche Bank noted that the ECB appears comfortable allowing restrictive policy to work through the system, particularly as wage growth in Germany and France has only recently begun to moderate. The next key data point will be the March flash CPI reading, which could shift the consensus toward a June rate adjustment if disinflation accelerates."
      ]
    }
  },
  n2: {
    simpleTitle: "Bitcoin dropped after a strong week — traders are taking profits",
    simpleBullets: [
      "BTC fell 3.1% intraday after rising sharply over the past seven days.",
      "Leverage on exchanges decreased, signaling traders are reducing risk.",
      "Funding rates have normalized, which can reduce short-term volatility."
    ],
    fullArticle: {
      subtitle: "Bitcoin retraces weekly gains as leveraged positions unwind",
      paragraphs: [
        "Bitcoin slid more than 3% during European trading on Friday, giving back a portion of last week's rally that had pushed the cryptocurrency above $74,000 for the first time since early January. The pullback was accompanied by a significant reduction in open interest across major derivatives exchanges, suggesting that leveraged traders were locking in profits rather than initiating new short positions.",
        "Data from Coinglass showed that approximately $187 million in leveraged long positions were liquidated during a two-hour window around 10:00 UTC, triggering a cascade of stop-loss orders that accelerated the decline. Funding rates on perpetual futures contracts, which had turned sharply positive during the rally, have now reverted to neutral levels across Binance, Bybit, and OKX.",
        "On-chain analytics firm Glassnode noted that long-term holders — wallets that have not moved coins in over 155 days — continued to accumulate during the dip, adding roughly 12,400 BTC to their aggregate balances. This divergence between short-term de-risking and long-term accumulation is typically associated with healthy market corrections rather than structural trend reversals.",
        "The immediate technical picture shows support at the $69,800 level, which coincides with the 50-day moving average and a high-volume node from mid-January trading. Resistance sits at $74,200, the recent swing high. Analysts at Matrixport suggest that unless macro conditions deteriorate significantly, Bitcoin is likely to consolidate in the $70,000–$74,000 range before attempting another break higher."
      ]
    }
  },
  n3: {
    simpleTitle: "NVIDIA-related chip stocks are rising on AI demand",
    simpleBullets: [
      "Semiconductor companies supplying NVIDIA gained nearly 2% in early trading.",
      "AI infrastructure spending by big tech companies is increasing again.",
      "The chip sector tends to move together when AI spending expectations rise."
    ],
    fullArticle: {
      subtitle: "AI infrastructure boom lifts semiconductor supply chain",
      paragraphs: [
        "Shares of major semiconductor equipment and component suppliers rallied in pre-market trading on Friday after multiple industry channel checks pointed to renewed acceleration in AI-related capital expenditure from hyperscale cloud providers. ASML, Taiwan Semiconductor, and Broadcom all rose between 1.5% and 2.3%.",
        "The move comes as Meta, Microsoft, and Google have each publicly reaffirmed or increased their AI infrastructure budgets for 2026 during recent earnings calls. Combined planned AI capex from the top five US cloud providers is now estimated at over $220 billion for the current fiscal year, up roughly 35% from 2025 levels.",
        "NVIDIA, whose GPUs remain the backbone of most AI training clusters, has seen its forward order book extend to unprecedented lengths. Industry sources suggest that H200 and Blackwell-series chip deliveries are now booked through Q1 2027, creating a halo effect across the entire supply chain from advanced packaging firms like Amkor to memory producers like SK Hynix.",
        "Morgan Stanley's semiconductor analyst Joseph Moore raised his sector outlook from 'in-line' to 'attractive', noting that the current capex cycle appears more sustainable than previous hardware booms because it is driven by demonstrable revenue generation from AI products rather than speculative buildout."
      ]
    }
  },
  n4: {
    simpleTitle: "US jobs data pushed back expectations for rate cuts",
    simpleBullets: [
      "Revised payroll numbers show the US job market is stronger than estimated.",
      "Bond yields rose as markets now expect fewer interest rate cuts this year.",
      "A stronger dollar could affect international investments and crypto."
    ],
    fullArticle: {
      subtitle: "Labor market resilience reshapes Fed rate expectations",
      paragraphs: [
        "The Bureau of Labor Statistics released its annual benchmark revision of nonfarm payrolls on Thursday, revealing that the US economy added approximately 340,000 more jobs over the past twelve months than initially reported. The upward revision caught markets off guard and triggered an immediate repricing of Federal Reserve rate-cut expectations.",
        "The 2-year Treasury yield, which is particularly sensitive to near-term Fed policy expectations, jumped 9 basis points to 4.62%, its highest level since November. Fed funds futures now price in just one 25-basis-point cut before year-end, down from nearly two cuts priced in before the release.",
        "The resilient labor data complicates the narrative that the Fed would begin easing policy meaningfully in the second half of 2026. With unemployment holding at 3.9% and average hourly earnings growing at a 3.8% annualized pace, there is little urgency for the central bank to shift its stance.",
        "For investors, the practical implication is that cash and short-duration fixed-income instruments will continue to offer competitive yields, while longer-duration bonds and rate-sensitive equities may face headwinds until clear evidence of cooling emerges in subsequent employment reports."
      ]
    }
  },
  n5: {
    simpleTitle: "European banks reported strong results but remain cautious",
    simpleBullets: [
      "Major Spanish banks beat quarterly earnings estimates.",
      "However, management teams warned about future margin pressure.",
      "Bank stocks may react more to forward guidance than current results."
    ],
    fullArticle: {
      subtitle: "Santander and BBVA top expectations but flag margin headwinds",
      paragraphs: [
        "Spain's two largest banks, Santander and BBVA, each reported fourth-quarter earnings that exceeded analyst expectations, driven by strong net interest income and lower-than-expected provisions for bad loans. Santander posted a 14% year-over-year increase in net profit, while BBVA surprised with a 9% beat on the consensus estimate.",
        "Despite the strong headline numbers, both management teams struck a cautious tone during their respective analyst calls. Santander CEO Héctor Grisi warned that net interest margins are likely to compress by 15-20 basis points over the next two quarters as competition for deposits intensifies and the ECB's rate environment stabilizes.",
        "BBVA's CFO noted that while asset quality remains solid, early-stage delinquencies in consumer lending are beginning to tick upward in markets including Mexico and Turkey, warranting increased vigilance. The bank increased its general provision buffer by €280 million as a precautionary measure.",
        "European banking sector ETFs were roughly flat following the releases, reflecting the market's tendency to weigh forward guidance more heavily than backward-looking results. Citi analyst Azzurra Guelfi maintained her 'neutral' rating on the sector, arguing that investors should wait for greater clarity on the rate path before adding exposure."
      ]
    }
  },
  n6: {
    simpleTitle: "Investors are moving money from big tech into broader funds",
    simpleBullets: [
      "ETF flows shifted from concentrated tech funds into diversified products.",
      "Net weekly inflows into broad-market ETFs reached €4.2 billion.",
      "This rotation could mean markets are becoming less dependent on a few stocks."
    ],
    fullArticle: {
      subtitle: "Rotation from mega-cap tech into broad ETFs accelerates",
      paragraphs: [
        "Weekly ETF flow data published by Morningstar and Bloomberg revealed a notable shift in investor behavior: net outflows of €1.8 billion from technology-focused and concentrated Nasdaq-tracking funds were offset by €4.2 billion in inflows to broad-market products like SPY, VWCE, and regional equity ETFs.",
        "The rotation, which has now persisted for three consecutive weeks, suggests that institutional and retail investors alike are becoming more cautious about the concentration risk inherent in portfolios dominated by the 'Magnificent Seven' technology stocks. The equal-weight S&P 500 ETF saw its strongest inflow week since March 2025.",
        "BlackRock's head of global ETF strategy noted that the pattern is consistent with late-cycle behavior, where investors lock in gains from outperforming sectors and redistribute capital toward broader exposures that offer more balanced risk-reward. She emphasized that this type of rotation is generally healthy for markets and can extend rally breadth.",
        "For individual investors, the trend underscores the importance of diversification even when a narrow group of stocks is driving headline index returns. Advisors at Vanguard Europe recommend maintaining at least 60% of equity exposure in broad-market vehicles to mitigate single-sector drawdown risk."
      ]
    }
  },
  n7: {
    simpleTitle: "Oil prices fell despite geopolitical tensions",
    simpleBullets: [
      "Crude oil declined as US inventory data showed higher-than-expected stockpiles.",
      "Geopolitical supply risks were not enough to support current price levels.",
      "Energy-related investments may face near-term pressure."
    ],
    fullArticle: {
      subtitle: "Crude oil retreats as inventory surprise outweighs supply risk",
      paragraphs: [
        "Brent crude oil futures dropped 1.7% to $78.40 per barrel on Thursday after the US Energy Information Administration reported a larger-than-expected build in commercial crude inventories. Stockpiles rose by 4.2 million barrels, well above the 1.1-million-barrel increase that analysts had forecast.",
        "The inventory surprise overshadowed ongoing geopolitical concerns in the Middle East, where shipping disruptions in the Red Sea continue to force tankers onto longer routes around the Cape of Good Hope. While these diversions add approximately $1.5 million in additional shipping costs per voyage, the impact on actual supply volumes has been minimal.",
        "OPEC+ compliance with production cuts remained near 90% in January, according to secondary-source estimates, but the cartel faces growing pressure from members like Kazakhstan and Iraq that have been producing above their quotas. A scheduled technical committee meeting next week will review compliance and could introduce stricter monitoring mechanisms.",
        "Goldman Sachs maintained its year-end Brent forecast of $82 per barrel but acknowledged that near-term risks are skewed to the downside if US production continues to exceed expectations. The US is currently pumping approximately 13.4 million barrels per day, near its all-time high."
      ]
    }
  },
  n8: {
    simpleTitle: "UK savings rates are starting to come down",
    simpleBullets: [
      "Retail savings products saw rate reductions after a bond market rally.",
      "Best fixed-term rates dropped from 5.1% to around 4.85%.",
      "If you are considering locking in a rate, timing matters more now."
    ],
    fullArticle: {
      subtitle: "Savings rate downturn begins as gilt yields ease",
      paragraphs: [
        "The UK retail savings market is experiencing its first meaningful rate reductions since the Bank of England began its tightening cycle in late 2021. Several major high-street banks, including Barclays and NatWest, cut their best fixed-term deposit rates by 10 to 25 basis points this week, following a sustained rally in government bond markets.",
        "The 2-year gilt yield, which serves as a benchmark for retail fixed-rate products, has fallen approximately 40 basis points since its December peak, currently sitting near 4.15%. This decline reflects growing market confidence that the Bank of England will begin cutting its base rate in the second quarter of 2026.",
        "For savers, the practical consequence is that the window for locking in 5%+ fixed-term rates is narrowing. MoneySavingExpert's latest analysis shows that the best 1-year fixed savings rate has fallen from 5.1% to 4.85% over the past month, with further reductions expected if gilt yields continue to drift lower.",
        "Financial advisors recommend that savers with cash reserves consider splitting their deposits across different maturities — a strategy known as 'laddering' — to balance the benefits of current high rates with the flexibility to reinvest at potentially different levels in the future."
      ]
    }
  },
  n9: {
    simpleTitle: "Tesla suppliers are worried about profit margins",
    simpleBullets: [
      "Companies that supply parts to Tesla warned about tighter profitability.",
      "The next Tesla delivery report could move the stock significantly.",
      "Automotive supply chain pressures can ripple across related sectors."
    ],
    fullArticle: {
      subtitle: "Tesla supply chain braces for margin compression ahead of Q1 deliveries",
      paragraphs: [
        "Several major suppliers to Tesla's global manufacturing operations issued cautious guidance this week, flagging increasing cost pressures and uncertain demand visibility ahead of the electric vehicle maker's closely watched Q1 delivery report expected in early April.",
        "Aptiv, which supplies electrical architecture components for Model Y and Cybertruck, lowered its full-year margin guidance by 50 basis points, citing increased raw material costs and pressure from Tesla to reduce per-unit pricing. Similarly, battery cell supplier Panasonic cautioned that utilization rates at its Nevada facility have dipped below 80% as Tesla adjusts production schedules.",
        "The warnings come at a sensitive time for Tesla investors. The stock has declined roughly 18% from its January highs amid broader concerns about EV demand growth deceleration and increasing competition from Chinese manufacturers BYD and NIO in key European and Asian markets.",
        "Wall Street analysts remain divided on Tesla's near-term outlook. While bulls point to the upcoming launch of the more affordable Model Q as a potential catalyst, bears argue that margin erosion across the existing lineup will offset volume gains. The consensus delivery estimate for Q1 sits at 468,000 vehicles, which would represent a modest 5% year-over-year increase."
      ]
    }
  },
  n10: {
    simpleTitle: "The EU is updating crypto regulations for exchanges",
    simpleBullets: [
      "New draft rules focus on how crypto exchanges handle customer funds.",
      "Cross-border crypto transfers will face stricter compliance requirements.",
      "These changes could affect how and where you trade crypto in Europe."
    ],
    fullArticle: {
      subtitle: "Brussels proposes tighter custody and compliance rules for crypto platforms",
      paragraphs: [
        "The European Commission published a draft regulatory framework on Thursday that would impose significantly stricter custody and transparency requirements on cryptocurrency exchanges operating within the EU. The proposal, which builds on the existing Markets in Crypto-Assets (MiCA) regulation, is designed to close remaining gaps exposed by several exchange failures in 2024 and 2025.",
        "The key provisions include mandatory proof-of-reserves audits conducted by regulated third-party firms, segregation of customer assets from exchange operating funds, and real-time reporting of large cross-border crypto transfers to national financial intelligence units. Additionally, exchanges would be required to maintain a minimum capital buffer equivalent to 2% of total customer assets held.",
        "Industry reaction was mixed. Major regulated exchanges like Kraken and Bitstamp broadly welcomed the clarity, arguing that higher standards would level the playing field and increase institutional adoption. However, smaller platforms and DeFi advocates expressed concern that the compliance costs could be prohibitive and push innovation outside European jurisdiction.",
        "The draft will now enter a consultation period of 60 days before being reviewed by the European Parliament. If adopted, the new rules would take effect in January 2027, giving platforms 12 months to achieve full compliance."
      ]
    }
  },
  n11: {
    simpleTitle: "Defensive dividend funds are attracting more investment",
    simpleBullets: [
      "Income-focused ETFs outperformed as investors looked for stability.",
      "Dividend strategies tend to hold up better during uncertain periods.",
      "These funds can provide regular income but usually grow more slowly."
    ],
    fullArticle: {
      subtitle: "Dividend ETFs draw defensive flows as earnings uncertainty builds",
      paragraphs: [
        "Income-oriented exchange-traded funds experienced their strongest inflow week of 2026, as investors rotated toward lower-volatility strategies amid rising uncertainty about corporate earnings sustainability. The Vanguard Dividend Appreciation ETF (VIG) and Schwab US Dividend Equity ETF (SCHD) collectively attracted over $2.1 billion in net new assets.",
        "The shift toward dividend-paying equities reflects a growing preference for companies with proven cash-generation capabilities and histories of consistent shareholder returns. Sectors well-represented in these ETFs include healthcare, consumer staples, and utilities — areas that typically demonstrate more stable earnings profiles during economic slowdowns.",
        "Portfolio strategist Liz Ann Sonders at Charles Schwab noted that the current rotation toward quality and income is rational given the late stage of the economic cycle. She pointed out that dividend-paying stocks in the S&P 500 have historically outperformed non-payers by an average of 2.3 percentage points annually during periods of decelerating GDP growth.",
        "For retail investors, adding a dividend component to a growth-oriented portfolio can serve as a natural volatility dampener while providing a steady income stream that can help offset periodic capital losses in more aggressive holdings."
      ]
    }
  },
  n12: {
    simpleTitle: "A stronger US dollar is hurting emerging market stocks",
    simpleBullets: [
      "The dollar index rose, putting pressure on stocks in developing countries.",
      "Emerging market funds saw outflows as currency risk increased.",
      "If you hold international investments, currency movements affect your returns."
    ],
    fullArticle: {
      subtitle: "Dollar strength weighs on emerging market equities and flows",
      paragraphs: [
        "The US dollar index (DXY) extended its recent gains on Thursday, climbing 0.4% to 105.8 as resilient economic data reinforced expectations that the Federal Reserve will maintain higher rates for longer. The strengthening dollar weighed most heavily on emerging market assets, with the MSCI Emerging Markets Index falling 1.2% in its third consecutive daily decline.",
        "Country-specific impacts were particularly acute in currencies with high sensitivity to dollar movements. The Turkish lira fell 0.8% against the dollar, the South African rand weakened 1.1%, and the Brazilian real lost 0.6%. These currency moves amplify equity losses for euro-based investors holding unhedged positions in emerging market funds.",
        "Fund flow data from EPFR showed net outflows of $890 million from emerging market equity funds over the past week, the largest weekly redemption since October 2025. Bond funds fared somewhat better, with modest inflows into hard-currency (dollar-denominated) sovereign debt.",
        "JPMorgan's emerging market strategy team cautioned that until the US rate outlook becomes more dovish, EM equities are unlikely to sustain a meaningful rally. They recommend focusing on countries with strong current account positions and central banks that are ahead of the cutting cycle, such as Brazil and Indonesia."
      ]
    }
  },
  n13: {
    simpleTitle: "Bitcoin derivatives markets are cooling off after a volatile week",
    simpleBullets: [
      "Funding rates on crypto futures normalized after being extremely high.",
      "Lower leverage usually reduces the risk of sudden liquidation cascades.",
      "This cooldown could lead to more stable price action in the short term."
    ],
    fullArticle: {
      subtitle: "Funding rates normalize as Bitcoin leverage resets",
      paragraphs: [
        "Bitcoin's derivatives market underwent a significant reset this week as funding rates across major perpetual futures platforms returned to neutral territory after spending five consecutive days in deeply positive territory. The annualized funding rate on Binance's BTC-USDT perpetual contract dropped from 48% to approximately 8%, indicating that the overcrowded long positioning has largely unwound.",
        "The normalization follows what analysts at Kaiko Research described as a 'healthy deleveraging event,' during which roughly $420 million in aggregate open interest was removed from the system. Importantly, the reduction occurred across all major venues simultaneously, suggesting coordinated risk reduction rather than isolated exchange-specific stress.",
        "Implied volatility on Bitcoin options maturing in the next 7 days declined from 72% to 54%, further confirming that the market is transitioning from a high-volatility regime to a more measured environment. The term structure of volatility has also flattened, indicating less expectation of near-term explosive moves.",
        "Traders should interpret the funding reset as a clearing of speculative excess. Historical patterns show that periods of funding normalization following sharp rallies tend to precede 5-10 day consolidation phases before the next directional move. Monitoring spot exchange volumes and stablecoin inflows will be key to gauging whether buying interest remains robust."
      ]
    }
  },
  n14: {
    simpleTitle: "Large Bitcoin holders are buying during the price dip",
    simpleBullets: [
      "Wallets holding large amounts of BTC added to positions during the pullback.",
      "This pattern is often seen as a sign of confidence from experienced investors.",
      "However, large-holder behavior alone does not guarantee a price recovery."
    ],
    fullArticle: {
      subtitle: "Whale accumulation intensifies as Bitcoin retests key support",
      paragraphs: [
        "On-chain analytics platform Santiment reported a notable spike in accumulation activity among Bitcoin wallets holding between 100 and 10,000 BTC — commonly referred to as 'whale' and 'shark' addresses. These entities collectively added approximately 18,200 BTC to their holdings over the past 72 hours, representing the largest three-day accumulation event since September 2025.",
        "The buying activity occurred as Bitcoin's spot price tested the $70,000 support level, suggesting that large holders view current prices as attractive relative to their longer-term thesis. CryptoQuant's whale-to-exchange flow ratio dropped to its lowest reading in four months, indicating that these buyers are moving coins into cold storage rather than positioning for short-term trades.",
        "The divergence between whale accumulation and retail behavior is striking. Google Trends data for 'Bitcoin price' searches has declined 22% from its January peak, and Coinbase app store rankings have slipped out of the top 20 in both the US and UK. This pattern — large holders accumulating while retail interest wanes — is historically associated with bottoming processes in crypto markets.",
        "Analysts caution, however, that whale behavior is a supporting indicator rather than a standalone trading signal. Previous accumulation events have occasionally preceded extended consolidation periods of 4-8 weeks before resulting in sustained upside. The macro backdrop, particularly US monetary policy and risk appetite, remains the primary driver of crypto's medium-term trajectory."
      ]
    }
  },
  n15: {
    simpleTitle: "Options traders expect bigger Bitcoin price swings ahead",
    simpleBullets: [
      "Implied volatility on BTC options rose ahead of important macro events.",
      "Wider expected price ranges mean potential for both gains and losses.",
      "Using smaller position sizes can help manage risk during volatile periods."
    ],
    fullArticle: {
      subtitle: "Bitcoin options market prices wider range ahead of macro catalysts",
      paragraphs: [
        "The cost of hedging Bitcoin exposure through options contracts rose sharply this week as implied volatility climbed to its highest level since the post-ETF approval frenzy in early 2024. The at-the-money 30-day implied volatility for BTC options on Deribit reached 68%, up from 52% just two weeks ago.",
        "The increase is being driven by a confluence of upcoming macro events that traders expect to generate significant price action. The February US PCE inflation report, the Fed's March meeting minutes, and a large batch of Bitcoin options expiring on March 28 — worth approximately $6.8 billion in notional value — are all clustered within a tight timeframe.",
        "Derivatives data shows that the options market is pricing an expected move of approximately ±11% for Bitcoin over the next 30 days, compared to a ±7% expected range a month ago. This widened distribution reflects genuine uncertainty about direction rather than a one-sided bet on further upside.",
        "For portfolio management purposes, elevated implied volatility makes protective strategies (such as put spreads) more expensive but also increases the premium received from selling covered calls. Risk-conscious investors with existing Bitcoin positions may find this an opportune moment to collar their exposure — simultaneously buying downside protection and financing it by selling upside beyond their target price."
      ]
    }
  },
  n16: {
    simpleTitle: "More investors are buying S&P 500 ETFs for diversification",
    simpleBullets: [
      "Inflows into broad-market S&P 500 funds increased this week.",
      "Investors are seeking diversification beyond individual stock picks.",
      "Broad index exposure can reduce single-stock risk in a portfolio."
    ],
    fullArticle: {
      subtitle: "S&P 500 ETF flows surge as diversification trade gains traction",
      paragraphs: [
        "Exchange-traded funds tracking the S&P 500 index recorded their strongest weekly inflows of 2026, with SPY and IVV collectively attracting $8.3 billion in net new assets. The surge in flows comes as a growing number of institutional and retail investors pivot toward broad market exposure following a period of historically narrow market leadership.",
        "The rotation into index-level products reflects a pragmatic response to the difficulty of picking individual winners in an environment where sector leadership is shifting rapidly. After technology stocks dominated returns for much of 2024 and 2025, the rally has broadened to include financial, industrial, and healthcare sectors — a pattern that favors diversified exposure.",
        "Vanguard's head of portfolio construction noted that the S&P 500 remains one of the most efficient vehicles for gaining exposure to the US economy, offering automatic rebalancing as market capitalizations shift. The index's current composition provides meaningful exposure to AI growth through its technology holdings while maintaining ballast through defensive sectors.",
        "For European investors accessing US markets through UCITS-compliant vehicles, the current dollar environment adds an additional layer of return potential but also currency risk. Advisors recommend evaluating whether hedged or unhedged versions of S&P 500 ETFs best align with each investor's overall currency exposure and risk tolerance."
      ]
    }
  },
  n17: {
    simpleTitle: "The S&P 500 rally is broadening beyond just tech stocks",
    simpleBullets: [
      "Market participation is widening to sectors outside technology.",
      "A broader rally is generally considered healthier and more sustainable.",
      "This benefits diversified portfolios more than concentrated tech bets."
    ],
    fullArticle: {
      subtitle: "Market breadth improvement signals more sustainable S&P 500 advance",
      paragraphs: [
        "The S&P 500's advance over the past two weeks has been accompanied by a significant improvement in market breadth that analysts say makes the rally more durable than the narrow, tech-driven gains that characterized much of 2025. The percentage of S&P 500 stocks trading above their 50-day moving average rose from 58% to 71%, the highest reading since last August.",
        "The broadening participation is particularly evident in sectors that had lagged during the AI-driven rally. Financials are up 4.2% on the month, industrials have gained 3.8%, and healthcare has risen 2.9% — all outpacing the technology sector's 1.6% advance over the same period. The equal-weight S&P 500 index has outperformed the cap-weighted version for four consecutive weeks.",
        "Technical strategist Katie Stockton of Fairlead Strategies noted that the breadth improvement clears one of the major red flags that had concerned market analysts throughout 2025: 'When the generals are leading but the troops aren't following, rallies are vulnerable. What we're seeing now is the troops catching up.'",
        "For investors with concentrated positions in mega-cap technology names, the broadening provides an opportunity to diversify without necessarily reducing overall equity exposure. Rotating a portion of tech overweight into equally strong but less crowded areas like specialty industrials or mid-cap financials can maintain upside participation while reducing single-sector drawdown risk."
      ]
    }
  },
  n18: {
    simpleTitle: "Analysts see more room for the S&P 500 to climb",
    simpleBullets: [
      "Multiple Wall Street firms raised their year-end targets for the S&P 500.",
      "Earnings growth momentum is the main reason behind the optimism.",
      "Risks remain if inflation or interest rates surprise to the upside."
    ],
    fullArticle: {
      subtitle: "Wall Street raises S&P 500 targets on earnings resilience",
      paragraphs: [
        "Three major Wall Street firms — Goldman Sachs, Deutsche Bank, and BMO Capital Markets — raised their year-end S&P 500 price targets this week, citing stronger-than-expected corporate earnings and resilient profit margins. Goldman's new target of 5,800 represents approximately 10% upside from current levels, up from its previous forecast of 5,400.",
        "The upgrades are primarily driven by Q4 2025 earnings results, which showed 78% of S&P 500 companies beating consensus estimates — above the historical average of 73%. Aggregate earnings-per-share grew 9.2% year-over-year, with particularly strong contributions from technology, financials, and healthcare. Importantly, forward guidance was more positive than negative by a 1.8-to-1 ratio.",
        "Deutsche Bank strategist Bankim Chadha argued that the market is in the 'sweet spot' of the earnings cycle, where revenue growth is positive but cost pressures have stabilized, allowing margins to expand. He projects S&P 500 earnings per share of $268 for full-year 2026, up from the current consensus of $259.",
        "However, not all strategists are bullish. Morgan Stanley's Mike Wilson maintained his below-consensus target of 5,100, warning that elevated valuations — the forward P/E ratio stands at 21.5x, well above the 20-year average — leave little room for disappointment if growth expectations are not met."
      ]
    }
  },
  n19: {
    simpleTitle: "Options markets show investors betting on more S&P 500 gains",
    simpleBullets: [
      "Call option activity on SPY remained strong this week.",
      "Investors are positioning for further upside in the broad market.",
      "Options flows can indicate market confidence but also create risk clusters."
    ],
    fullArticle: {
      subtitle: "SPY upside call flow stays elevated as bulls remain in control",
      paragraphs: [
        "Options activity on SPDR S&P 500 ETF Trust (SPY) continued to skew heavily bullish this week, with the put-call ratio dropping to 0.62 — well below its 12-month average of 0.85. The skew indicates that traders are paying up to position for further gains rather than hedging against potential declines.",
        "The most actively traded contracts were March and April calls struck between $540 and $560, representing 3-6% upside from current levels. Open interest at the $550 strike expiring on April 18 reached over 180,000 contracts, making it the single largest options position across all US equity products.",
        "Derivatives strategists at Susquehanna noted that the persistent demand for upside exposure is partly mechanical: systematic volatility-targeting funds have been increasing their equity exposure as realized volatility continues to decline, creating a self-reinforcing feedback loop of buying pressure.",
        "While the bullish positioning is supportive of near-term price action, analysts warn that crowded one-directional options positioning can amplify moves in both directions. If an unexpected catalyst triggers a reversal, the unwinding of large call positions could accelerate selling through dealer hedging dynamics. Maintaining a core long position while setting clear stop-loss levels is recommended."
      ]
    }
  },
  n20: {
    simpleTitle: "Gold ETFs are seeing more investment as a safety measure",
    simpleBullets: [
      "Investors increased allocations to gold-linked ETFs as a defensive move.",
      "Real yields pausing gave gold a more favorable environment.",
      "Gold works best as a portfolio stabilizer, not a primary growth driver."
    ],
    fullArticle: {
      subtitle: "Gold ETF inflows accelerate as investors seek portfolio hedges",
      paragraphs: [
        "Physically-backed gold exchange-traded funds recorded their largest weekly inflows since October 2025, as investors sought defensive positioning amid mixed signals from equity and bond markets. The SPDR Gold Shares ETF (GLD) alone attracted $1.4 billion in net new assets, while the iShares Gold Trust (IAU) added $680 million.",
        "The renewed interest in gold coincides with a pause in the rise of real (inflation-adjusted) yields, which had been a headwind for the precious metal through much of late 2025. With the 10-year TIPS yield stabilizing near 2.05%, the opportunity cost of holding non-yielding gold has become less punitive for portfolio allocators.",
        "Central bank demand continues to provide a structural floor for gold prices. World Gold Council data shows that central banks purchased 286 tonnes of gold in Q4 2025, with the People's Bank of China, the Reserve Bank of India, and the Central Bank of Turkey among the most active buyers. This official sector demand is running at roughly double the average pace of the 2010-2019 decade.",
        "Portfolio construction experts at BlackRock recommend maintaining a 5-10% allocation to gold or gold ETFs as a portfolio diversifier, noting that gold's low correlation to both equities and fixed income makes it particularly valuable during periods of cross-asset volatility."
      ]
    }
  },
  n21: {
    simpleTitle: "More traders are using gold to protect their portfolios",
    simpleBullets: [
      "Trading volume in GLD increased as investors looked for hedges.",
      "Gold often performs well when stock market uncertainty rises.",
      "Adding gold can reduce overall portfolio volatility during turbulent times."
    ],
    fullArticle: {
      subtitle: "GLD volume surges as hedging demand rises across asset classes",
      paragraphs: [
        "Average daily trading volume in the SPDR Gold Shares ETF (GLD) surged 34% above its 20-day average this week, with the fund changing hands at a pace typically associated with periods of elevated market anxiety. The volume spike was concentrated in the options market, where demand for GLD call spreads reached its highest level since the regional banking stress of 2023.",
        "Institutional flow data from Goldman Sachs' prime brokerage division revealed that hedge funds have been steadily increasing their net long gold exposure over the past month, adding particularly through options structures that benefit from a gradual grind higher rather than a sharp spike. This positioning style suggests that fund managers view gold as a medium-term hedge rather than a short-term trade.",
        "The correlation between gold and the S&P 500 has turned negative again after briefly moving toward zero during the Q4 equity rally. A negative correlation — currently at -0.18 over a 60-day window — is precisely the characteristic that makes gold valuable in multi-asset portfolios: it tends to go up when stocks go down, providing natural shock absorption.",
        "For individual investors already holding gold ETFs, the current environment supports maintaining rather than increasing exposure unless total portfolio risk is above target levels. Those without gold exposure may consider a modest allocation through a cost-averaging approach over the next 2-3 months."
      ]
    }
  },
  n22: {
    simpleTitle: "Gold is holding firm despite mixed economic signals",
    simpleBullets: [
      "Gold prices maintained their level despite conflicting policy signals.",
      "Mixed economic data creates uncertainty that benefits gold as a safe haven.",
      "Gold tends to perform best when markets are unsure about the future direction."
    ],
    fullArticle: {
      subtitle: "Gold price resilience tested as policy signals remain ambiguous",
      paragraphs: [
        "Gold prices held above the $2,160 per ounce level on Thursday despite receiving contradictory signals from the major economic data releases and central bank communications of the past week. The metal's ability to maintain support amid a stronger dollar and rising short-term yields has been interpreted by analysts as a sign of underlying demand strength.",
        "The mixed macro backdrop includes stronger US employment data (which typically hurts gold by supporting higher rates) alongside weaker European manufacturing PMIs (which supports gold as a risk hedge). This tug-of-war has kept gold trading in a narrowing range, with the Bollinger Band width reaching its tightest reading since November — a pattern that often precedes a significant directional breakout.",
        "Physical demand from Asian markets remains robust, with premiums in Shanghai holding at $35-40 per ounce above the London benchmark, significantly above the historical average of $5-10. This premium persistence indicates that Chinese consumers and institutions continue to view gold as an attractive store of value amid domestic economic uncertainty.",
        "Technical analysis identifies $2,130 as the key support level for gold, representing the 200-day moving average and a cluster of previous swing lows. On the upside, a sustained break above $2,195 would clear the current resistance zone and open the path toward the all-time high of $2,250 set in 2024."
      ]
    }
  },
  n23: {
    simpleTitle: "Professional fund managers are keeping gold in their portfolios",
    simpleBullets: [
      "Institutional investors maintain a moderate overweight position in gold.",
      "Positioning is elevated but not crowded, leaving room for further buying.",
      "Professional allocation trends can influence market direction over time."
    ],
    fullArticle: {
      subtitle: "Macro fund gold positioning: elevated but not yet crowded",
      paragraphs: [
        "The latest CFTC Commitments of Traders report shows that managed money accounts hold a net long position of approximately 187,000 contracts in COMEX gold futures, placing positioning in the 72nd percentile of its 5-year range. While this is elevated relative to neutral, it is well below the 95th-percentile readings that have historically preceded sharp pullbacks.",
        "Macro hedge funds appear to be the primary drivers of the positioning, using gold as a portfolio-level hedge against both inflation re-acceleration and potential geopolitical escalation. Several prominent fund managers, including Paul Tudor Jones and Ray Dalio, have publicly reiterated their structural bullish view on gold in recent investor letters.",
        "The current positioning leaves room for further accumulation if any of several plausible catalysts materialize: a dovish shift in Fed communication, escalation in Middle Eastern or East Asian geopolitical tensions, or further evidence that central bank buying will continue at its elevated pace.",
        "From a portfolio allocation perspective, the positioning data suggests that gold is not yet in 'bubble territory' where crowded longs increase the risk of a sharp reversal. However, the elevated positioning does mean that gold may be more sensitive to negative catalysts than it would be from a lower base. Investors should size their gold allocation according to their overall portfolio risk budget rather than chasing momentum."
      ]
    }
  },
  n24: {
    simpleTitle: "Central banks are buying gold at twice the historical rate",
    simpleBullets: [
      "Central banks around the world purchased record amounts of gold in 2025.",
      "China, India, and Turkey were the biggest buyers.",
      "This structural demand supports gold prices over the long term."
    ],
    fullArticle: {
      subtitle: "Central bank gold purchases continue to drive structural demand",
      paragraphs: [
        "Central banks collectively purchased over 1,140 tonnes of gold in 2025, according to final data released by the World Gold Council this week, making it the third consecutive year of above-1,000-tonne official sector buying. The pace of accumulation is roughly double the average annual purchases recorded during the 2010-2019 decade and reflects a fundamental shift in how reserve managers view the metal.",
        "The People's Bank of China remained the largest buyer for the second straight year, officially adding 231 tonnes to its reserves, although analysts estimate that unreported purchases through the State Administration of Foreign Exchange may have added an additional 100-150 tonnes. The Reserve Bank of India was the second-largest buyer at 78 tonnes, followed by Turkey's central bank at 72 tonnes.",
        "The motivation behind the buying is primarily strategic rather than tactical. Reserve managers in emerging market countries are diversifying away from US dollar-denominated assets — particularly US Treasury bonds — as a way to reduce geopolitical risk and insulate their economies from potential sanctions or asset freezes. Gold, being a non-sovereign asset that cannot be frozen by any government, serves this purpose uniquely.",
        "For individual investors, the structural central bank bid provides a meaningful support mechanism for gold prices. Even if investment demand fluctuates with interest rate expectations, the consistent 1,000+ tonnes of annual official sector buying creates a reliable demand floor that limits downside risk during corrections."
      ]
    }
  }
};

function toDashboardItem(item: NewsItem): DashboardNewsItem {
  const content = articleContentById[item.id] ?? {
    simpleTitle: item.title,
    simpleBullets: [item.shortSummary],
    fullArticle: { subtitle: item.title, paragraphs: [item.shortSummary] }
  };
  return {
    id: item.id,
    title: item.title,
    source: item.source,
    timeAgo: "Today",
    tags: item.tags,
    tickers: item.tickers,
    summary: item.shortSummary,
    detail: `${item.shortSummary} ${item.keyNumbers?.length ? `Key numbers: ${item.keyNumbers.join(", ")}.` : ""}`.trim(),
    imageUrl: imageByNewsId[item.id],
    simpleTitle: content.simpleTitle,
    simpleBullets: content.simpleBullets,
    fullArticle: content.fullArticle
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
