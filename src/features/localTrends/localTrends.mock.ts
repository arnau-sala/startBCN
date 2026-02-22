/**
 * LOCAL TRENDS — MOCK DATASET
 * All data is 100% local. No network requests are made.
 * Source of truth for demo & auditing: this file.
 */

import { LocalDataset, Topic } from "./types";

// ─── Shared article pool ──────────────────────────────────────────────────────

const ARTICLES = {
    crypto: [
        { source: "CoinDesk", title: "Bitcoin ETF inflows hit monthly record", timeAgo: "2h ago" },
        { source: "Bloomberg", title: "Altcoin volatility rises as leverage resets", timeAgo: "4h ago" },
        { source: "FT", title: "EU crypto framework: what traders need to know", timeAgo: "1d ago" }
    ],
    rates: [
        { source: "FT", title: "ECB signals data-dependent path ahead", timeAgo: "3h ago" },
        { source: "WSJ", title: "US payroll revisions cool cut expectations", timeAgo: "5h ago" },
        { source: "Reuters", title: "UK savings rates edge lower after bond rally", timeAgo: "1d ago" }
    ],
    etfs: [
        { source: "Morningstar", title: "ETF inflows rotate from mega-cap tech to broad market", timeAgo: "2h ago" },
        { source: "CNBC", title: "Dividend ETFs attract defensive flows", timeAgo: "6h ago" },
        { source: "Bloomberg", title: "Index funds now represent 56% of retail AUM", timeAgo: "2d ago" }
    ],
    housing: [
        { source: "Expansion", title: "Barcelona housing prices rise 8% year-on-year", timeAgo: "1h ago" },
        { source: "El País", title: "New rent regulation bill heads to parliament", timeAgo: "4h ago" },
        { source: "Reuters", title: "European housing affordability hits decade low", timeAgo: "1d ago" }
    ],
    ai: [
        { source: "Reuters", title: "NVIDIA suppliers gain on AI infrastructure demand", timeAgo: "3h ago" },
        { source: "Bloomberg", title: "AI capex cycle seen accelerating into 2027", timeAgo: "5h ago" },
        { source: "WSJ", title: "LLM costs fall 80%: the productivity bet", timeAgo: "2d ago" }
    ],
    savings: [
        { source: "Morningstar", title: "High-yield savings accounts still beat inflation", timeAgo: "2h ago" },
        { source: "FT", title: "Europeans shift to money-market funds amid uncertainty", timeAgo: "8h ago" },
        { source: "Bloomberg", title: "New savings product launches from neobanks", timeAgo: "1d ago" }
    ]
};

// ─── Barcelona ────────────────────────────────────────────────────────────────

const barcelonaTopicsToday: Topic[] = [
    {
        id: "housing",
        name: "Housing regulation",
        icon: "🏠",
        pct: 35,
        delta: 5,
        whatsGoingOn: [
            "Catalonia rent cap proposal approved for 2026 after 2025 housing protests.",
            "Large property owners restricted from acquiring homes in high-pressure areas."
        ],
        forInvestorsUpside: "Increased demand for inflation-linked REITs and rental property ETFs.",
        forInvestorsRisk: "Regulatory uncertainty for Spanish real estate exposure.",
        category: "Real estate",
        keyDriverArticle: { "source": "El País", "title": "Catalonia approves 5% rent cap for 2026", "timeAgo": "4h" },
        articles: ARTICLES.housing,
        fullBriefing: `Housing briefing · Barcelona\nMonday, February 22, 2026 · 8:02 AM CET\n\nKey developments\n• Catalonia approves 5% rent cap for 2026 after 2025 housing protests (El País)\n• Large property owners restricted from acquiring homes in high-pressure areas\n• Local investors shifting toward inflation-linked assets and REITs\n\nMarket implications\nRisk: Spanish real estate exposure faces regulatory uncertainty\nOpportunity: Rental property ETFs and inflation-linked funds likely to benefit\n\nRelated coverage\nEl País: "Catalonia approves 5% rent cap for 2026" (4h ago)\nBloomberg: "European property markets face new regulatory pressures" (6h ago)\n\nAction items\n• Review Spanish REIT exposure in your portfolio\n• Consider inflation-linked rental ETFs for diversification\n\nView all related news →`
    },
    {
        id: "rates",
        name: "Rates",
        icon: "📊",
        pct: 20,
        delta: -5,
        whatsGoingOn: [
            "ECB communication this week is being closely watched by mortgage holders.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Rates",
        keyDriverArticle: ARTICLES.rates[0],
        articles: ARTICLES.rates
    },
    {
        id: "etfs",
        name: "ETFs",
        icon: "📈",
        pct: 15,
        delta: 5,
        whatsGoingOn: [
            "Passive investing interest is surging as local investors look for simpler exposure.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Equity",
        keyDriverArticle: ARTICLES.etfs[0],
        articles: ARTICLES.etfs
    },
    {
        id: "ai",
        name: "AI Stocks",
        icon: "🤖",
        pct: 10,
        delta: 0,
        whatsGoingOn: [
            "Tech sector earnings are drawing attention to AI-linked equities among younger savers.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Equity",
        keyDriverArticle: ARTICLES.ai[0],
        articles: ARTICLES.ai
    }
];

const barcelonaTopicsWeek: Topic[] = [
    {
        id: "housing",
        name: "Housing regulation",
        icon: "🏠",
        pct: 35,
        delta: 5,
        whatsGoingOn: [
            "Catalonia rent cap proposal approved for 2026 after 2025 housing protests.",
            "Large property owners restricted from acquiring homes in high-pressure areas."
        ],
        forInvestorsUpside: "Increased demand for inflation-linked REITs and rental property ETFs.",
        forInvestorsRisk: "Regulatory uncertainty for Spanish real estate exposure.",
        category: "Real estate",
        keyDriverArticle: { "source": "El País", "title": "Catalonia approves 5% rent cap for 2026", "timeAgo": "4h" },
        articles: ARTICLES.housing,
        fullBriefing: `Housing briefing · Barcelona\nMonday, February 22, 2026 · 8:02 AM CET\n\nKey developments\n• Catalonia approves 5% rent cap for 2026 after 2025 housing protests (El País)\n• Large property owners restricted from acquiring homes in high-pressure areas\n• Local investors shifting toward inflation-linked assets and REITs\n\nMarket implications\nRisk: Spanish real estate exposure faces regulatory uncertainty\nOpportunity: Rental property ETFs and inflation-linked funds likely to benefit\n\nRelated coverage\nEl País: "Catalonia approves 5% rent cap for 2026" (4h ago)\nBloomberg: "European property markets face new regulatory pressures" (6h ago)\n\nAction items\n• Review Spanish REIT exposure in your portfolio\n• Consider inflation-linked rental ETFs for diversification\n\nView all related news →`
    },
    {
        id: "crypto",
        name: "Crypto",
        icon: "₿",
        pct: 25,
        delta: -5,
        whatsGoingOn: [
            "Crypto momentum cooled mid-week but remains highly read in Barcelona.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Crypto",
        keyDriverArticle: ARTICLES.crypto[1],
        articles: ARTICLES.crypto
    },
    {
        id: "savings",
        name: "Savings",
        icon: "💰",
        pct: 20,
        delta: 10,
        whatsGoingOn: [
            "With rates uncertain, readers are exploring alternative cash savings products.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Macro",
        keyDriverArticle: ARTICLES.savings[0],
        articles: ARTICLES.savings
    },
    {
        id: "rates",
        name: "Rates",
        icon: "📊",
        pct: 15,
        delta: 0,
        whatsGoingOn: [
            "ECB press conference drove sustained readership on rate-sensitive topics.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Rates",
        keyDriverArticle: ARTICLES.rates[1],
        articles: ARTICLES.rates
    },
    {
        id: "etfs",
        name: "ETFs",
        icon: "📈",
        pct: 5,
        delta: -5,
        whatsGoingOn: [
            "ETF coverage slowed after the rotation story peaked on Monday.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Equity",
        keyDriverArticle: ARTICLES.etfs[1],
        articles: ARTICLES.etfs
    }
];

// ─── Berlin ───────────────────────────────────────────────────────────────────

const berlinTopicsToday: Topic[] = [
    {
        id: "etfs",
        name: "ETFs",
        icon: "📈",
        pct: 40,
        delta: 15,
        whatsGoingOn: [
            "Sentix investor sentiment +4.2 (highest since July 2025).",
            "EU50 index up 1.29% to 6133 on Feb 20 amid ECB rate pause."
        ],
        forInvestorsUpside: "Small cap rotation potential as ECB holds deposit rate at 2.00%.",
        forInvestorsRisk: "Fragile liquidity; EU50 volatility persists post-rate pause.",
        category: "Equity",
        keyDriverArticle: { "source": "Bloomberg", "title": "ECB holds rates but signals deeper cuts ahead", "timeAgo": "2h" },
        articles: ARTICLES.etfs,
        fullBriefing: `ETFs briefing · Berlin\nMonday, February 22, 2026 · 8:02 AM CET\n\nKey developments\n• Sentix investor sentiment +4.2 (highest since July 2025)\n• EU50 index up 1.29% to 6133 amid ECB rate pause\n\nMarket implications\nRisk: Fragile liquidity persists in mid-cap segments\nOpportunity: Small cap rotation potential as rate certainty improves\n\nRelated coverage\nBloomberg: "ECB holds rates but signals deeper cuts ahead" (2h ago)\n\nAction items\n• Monitor small cap ETFs for rotation signals\n• Review broad market ETF allocations\n\nView all related news →`
    },
    {
        id: "rates",
        name: "Rates",
        icon: "📊",
        pct: 25,
        delta: -5,
        whatsGoingOn: [
            "ECB decisions directly shape local fixed-income and savings decisions in Germany.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Rates",
        keyDriverArticle: ARTICLES.rates[0],
        articles: ARTICLES.rates
    },
    {
        id: "savings",
        name: "Savings",
        icon: "💰",
        pct: 20,
        delta: 10,
        whatsGoingOn: [
            "Neobank savings products are trending among Berlin's young professional demographic.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Macro",
        keyDriverArticle: ARTICLES.savings[0],
        articles: ARTICLES.savings
    },
    {
        id: "ai",
        name: "AI Stocks",
        icon: "🤖",
        pct: 15,
        delta: 5,
        whatsGoingOn: [
            "Tech investment interest in Berlin is rising alongside broader equity market coverage.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Equity",
        keyDriverArticle: ARTICLES.ai[0],
        articles: ARTICLES.ai
    },
    {
        id: "crypto",
        name: "Crypto",
        icon: "₿",
        pct: 5,
        delta: -5,
        whatsGoingOn: [
            "Crypto remains a niche topic in Berlin's finance community despite global buzz.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Crypto",
        keyDriverArticle: ARTICLES.crypto[0],
        articles: ARTICLES.crypto
    }
];

const berlinTopicsWeek: Topic[] = [
    {
        id: "etfs",
        name: "ETFs",
        icon: "📈",
        pct: 40,
        delta: 15,
        whatsGoingOn: [
            "Sentix investor sentiment +4.2 (highest since July 2025).",
            "EU50 index up 1.29% to 6133 on Feb 20 amid ECB rate pause."
        ],
        forInvestorsUpside: "Small cap rotation potential as ECB holds deposit rate at 2.00%.",
        forInvestorsRisk: "Fragile liquidity; EU50 volatility persists post-rate pause.",
        category: "Equity",
        keyDriverArticle: { "source": "Bloomberg", "title": "ECB holds rates but signals deeper cuts ahead", "timeAgo": "2h" },
        articles: ARTICLES.etfs,
        fullBriefing: `ETFs briefing · Berlin\nMonday, February 22, 2026 · 8:02 AM CET\n\nKey developments\n• Sentix investor sentiment +4.2 (highest since July 2025)\n• EU50 index up 1.29% to 6133 amid ECB rate pause\n\nMarket implications\nRisk: Fragile liquidity persists in mid-cap segments\nOpportunity: Small cap rotation potential as rate certainty improves\n\nRelated coverage\nBloomberg: "ECB holds rates but signals deeper cuts ahead" (2h ago)\n\nAction items\n• Monitor small cap ETFs for rotation signals\n• Review broad market ETF allocations\n\nView all related news →`
    },
    {
        id: "savings",
        name: "Savings",
        icon: "💰",
        pct: 25,
        delta: 5,
        whatsGoingOn: [
            "Savings product launches drove consistent engagement throughout the week.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Macro",
        keyDriverArticle: ARTICLES.savings[1],
        articles: ARTICLES.savings
    },
    {
        id: "rates",
        name: "Rates",
        icon: "📊",
        pct: 20,
        delta: -5,
        whatsGoingOn: [
            "Rate expectations settled after ECB comments, reducing readership volatility.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Rates",
        keyDriverArticle: ARTICLES.rates[1],
        articles: ARTICLES.rates
    },
    {
        id: "ai",
        name: "AI Stocks",
        icon: "🤖",
        pct: 10,
        delta: 5,
        whatsGoingOn: [
            "AI infrastructure stories spiked Thursday with NVIDIA suppliers news.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Equity",
        keyDriverArticle: ARTICLES.ai[1],
        articles: ARTICLES.ai
    },
    {
        id: "housing",
        name: "Housing",
        icon: "🏠",
        pct: 5,
        delta: 0,
        whatsGoingOn: [
            "Berlin's housing market remains under pressure but coverage was flat this week.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Real estate",
        keyDriverArticle: ARTICLES.housing[0],
        articles: ARTICLES.housing
    }
];

// ─── Paris ────────────────────────────────────────────────────────────────────
// sampleSize: 80 → triggers fallback to Île-de-France (region, 340) → France (country)

const franceCityTopicsToday: Topic[] = [
    {
        id: "crypto",
        name: "Crypto",
        icon: "₿",
        pct: 30,
        delta: 8,
        whatsGoingOn: [
            "ECB digital euro pilot approved for March 2026 (€1.3B cost).",
            "European crypto ETF flows turned positive (€340M YTD inflows)."
        ],
        forInvestorsUpside: "Euro stablecoin opportunity as digital euro timeline clarifies.",
        forInvestorsRisk: "Regulatory uncertainty for BTC/ETH exposure in Europe.",
        category: "Crypto",
        keyDriverArticle: { "source": "FT", "title": "ECB launches digital euro pilot with €1.3B price tag", "timeAgo": "6h" },
        articles: ARTICLES.crypto,
        fullBriefing: `Crypto briefing · Paris\nMonday, February 22, 2026 · 8:02 AM CET\n\nKey developments\n• ECB digital euro pilot approved for March 2026 with €1.3B budget (FT)\n• European crypto ETF flows turned positive (€340M YTD inflows)\n• AMF (Autorité des Marchés Financiers) releases new guidelines for DeFi\n\nMarket implications\nRisk: Increased scrutiny on unregulated offshore exchanges\nOpportunity: Paris cementing status as Web3 hub, boosting local talent and regulated Euro stablecoin demand\n\nRelated coverage\nFT: "ECB launches digital euro pilot with €1.3B price tag" (6h ago)\nLes Echos: "Paris attire les géants du Web3" (1d ago)\n\nAction items\n• Review portfolio exposure to regulated EU crypto assets\n• Monitor upcoming ECB publications on digital euro\n\nView all related news →`
    },
    {
        id: "savings",
        name: "Savings",
        icon: "💰",
        pct: 25,
        delta: 5,
        whatsGoingOn: [
            "The Livret A rate debate is fueling savings topic engagement across France.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Macro",
        keyDriverArticle: ARTICLES.savings[0],
        articles: ARTICLES.savings
    },
    {
        id: "housing",
        name: "Housing",
        icon: "🏠",
        pct: 20,
        delta: 0,
        whatsGoingOn: [
            "Paris housing affordability stories resonate strongly across the Île-de-France region.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Real estate",
        keyDriverArticle: ARTICLES.housing[0],
        articles: ARTICLES.housing
    },
    {
        id: "etfs",
        name: "ETFs",
        icon: "📈",
        pct: 15,
        delta: 5,
        whatsGoingOn: [
            "ETF adoption among French retail investors is accelerating through PEA accounts.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Equity",
        keyDriverArticle: ARTICLES.etfs[0],
        articles: ARTICLES.etfs
    }
];

const franceCityTopicsWeek: Topic[] = [
    {
        id: "crypto",
        name: "Crypto",
        icon: "₿",
        pct: 30,
        delta: 8,
        whatsGoingOn: [
            "ECB digital euro pilot approved for March 2026 (€1.3B cost).",
            "European crypto ETF flows turned positive (€340M YTD inflows)."
        ],
        forInvestorsUpside: "Euro stablecoin opportunity as digital euro timeline clarifies.",
        forInvestorsRisk: "Regulatory uncertainty for BTC/ETH exposure in Europe.",
        category: "Crypto",
        keyDriverArticle: { "source": "FT", "title": "ECB launches digital euro pilot with €1.3B price tag", "timeAgo": "6h" },
        articles: ARTICLES.crypto,
        fullBriefing: `Crypto briefing · Paris\nMonday, February 22, 2026 · 8:02 AM CET\n\nKey developments\n• ECB digital euro pilot approved for March 2026 with €1.3B budget (FT)\n• European crypto ETF flows turned positive (€340M YTD inflows)\n• AMF (Autorité des Marchés Financiers) releases new guidelines for DeFi\n\nMarket implications\nRisk: Increased scrutiny on unregulated offshore exchanges\nOpportunity: Paris cementing status as Web3 hub, boosting local talent and regulated Euro stablecoin demand\n\nRelated coverage\nFT: "ECB launches digital euro pilot with €1.3B price tag" (6h ago)\nLes Echos: "Paris attire les géants du Web3" (1d ago)\n\nAction items\n• Review portfolio exposure to regulated EU crypto assets\n• Monitor upcoming ECB publications on digital euro\n\nView all related news →`
    },
    {
        id: "rates",
        name: "Rates",
        icon: "📊",
        pct: 30,
        delta: 0,
        whatsGoingOn: [
            "ECB rate path coverage sustained strong engagement through Thursday.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Rates",
        keyDriverArticle: ARTICLES.rates[1],
        articles: ARTICLES.rates
    },
    {
        id: "housing",
        name: "Housing",
        icon: "🏠",
        pct: 20,
        delta: 5,
        whatsGoingOn: [
            "Housing legislation readership peaked mid-week across French readers.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Real estate",
        keyDriverArticle: ARTICLES.housing[1],
        articles: ARTICLES.housing
    },
    {
        id: "etfs",
        name: "ETFs",
        icon: "📈",
        pct: 10,
        delta: -5,
        whatsGoingOn: [
            "ETF interest dipped slightly after Monday's equity market volatility.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Equity",
        keyDriverArticle: ARTICLES.etfs[1],
        articles: ARTICLES.etfs
    },
    {
        id: "ai",
        name: "AI Stocks",
        icon: "🤖",
        pct: 5,
        delta: -5,
        whatsGoingOn: [
            "AI stock coverage slowed in France after initial NVIDIA reaction faded.",
            "Local engagement with this topic remains elevated compared to the national average."
        ],
        forInvestorsUpside: "Potential opportunities in relevant sector ETFs.",
        forInvestorsRisk: "Regional volatility driven by recent local news.",
        category: "Equity",
        keyDriverArticle: ARTICLES.ai[1],
        articles: ARTICLES.ai
    }
];

// ─── Complete datasets ─────────────────────────────────────────────────────────

export const MOCK_DATASETS: Record<string, LocalDataset> = {
    barcelona: {
        cityId: "barcelona",
        cityName: "Barcelona",
        regionName: "Catalonia",
        countryName: "Spain",
        citySampleSize: 1400,
        regionSampleSize: 3800,
        countrySampleSize: 12000,
        today: barcelonaTopicsToday,
        week: barcelonaTopicsWeek
    },
    berlin: {
        cityId: "berlin",
        cityName: "Berlin",
        regionName: "Brandenburg",
        countryName: "Germany",
        citySampleSize: 900,
        regionSampleSize: 2100,
        countrySampleSize: 9500,
        today: berlinTopicsToday,
        week: berlinTopicsWeek
    },
    paris: {
        cityId: "paris",
        cityName: "Paris",
        regionName: "Île-de-France",
        countryName: "France",
        citySampleSize: 500,
        regionSampleSize: 840,
        countrySampleSize: 8200,
        today: franceCityTopicsToday,
        week: franceCityTopicsWeek
    }
};

/** Default city for the demo — change to "paris" or "berlin" to test other contexts */
export const DEFAULT_CITY_ID = "barcelona";
