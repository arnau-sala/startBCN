import { Timeframe } from "@/lib/mock/portfolio";

export type SupportedAssetTicker = "BTC" | "MSFT" | "GLD";
export type AssetType = "crypto" | "stock" | "etf";
export type GuidanceLabel = "HOLD" | "WAIT" | "REDUCE" | "REVIEW";

export interface AssetDetailMock {
  ticker: SupportedAssetTicker;
  name: string;
  type: AssetType;
  iconText: string;
  price: number;
  dayChangePct: number;
  descriptionShort: string;
  descriptionLong: string;
  aiBrief: string;
  guidance: {
    label: GuidanceLabel;
    confidencePct: number;
    summary: string;
    upside: string;
    downside: string;
  };
  position: {
    qty: number;
    avgBuy: number;
    invested: number;
    currentValue: number;
    pnlEur: number;
    pnlPct: number;
  };
  chartSeries: Record<Timeframe, number[]>;
}

const btcSeries: Record<Timeframe, number[]> = {
  day: [71200, 71410, 70980, 71120, 71600, 71920, 71740, 72110, 71980, 72340, 72190, 72460],
  week: [68200, 68900, 69420, 70110, 69740, 70520, 71100, 71780, 71440, 71920, 72310, 72190],
  month: [64100, 64820, 65210, 66040, 66800, 67590, 68240, 69110, 69920, 70680, 71410, 72190],
  year: [39800, 42500, 45100, 47800, 50600, 53700, 56900, 60300, 63600, 66800, 69500, 72190],
  max: [21000, 23800, 27400, 31200, 35100, 39500, 44800, 51100, 57900, 64200, 68800, 72190]
};

const msftSeries: Record<Timeframe, number[]> = {
  day: [463, 464, 462, 463, 465, 466, 465, 467, 468, 467, 469, 468],
  week: [451, 453, 454, 456, 457, 458, 460, 462, 463, 465, 467, 468],
  month: [432, 435, 437, 440, 442, 445, 448, 451, 455, 459, 463, 468],
  year: [345, 352, 360, 371, 382, 394, 407, 421, 434, 447, 458, 468],
  max: [248, 262, 277, 294, 313, 333, 355, 378, 401, 426, 448, 468]
};

const gldSeries: Record<Timeframe, number[]> = {
  day: [188.4, 188.8, 188.1, 188.5, 188.9, 189.2, 189.1, 189.4, 189.6, 189.5, 189.8, 189.7],
  week: [186.2, 186.8, 187.1, 187.4, 187.9, 188.2, 188.6, 188.9, 189.1, 189.3, 189.6, 189.7],
  month: [181.4, 182.0, 182.9, 183.8, 184.7, 185.6, 186.2, 187.1, 187.9, 188.6, 189.1, 189.7],
  year: [165.3, 167.1, 169.2, 171.1, 173.5, 175.8, 178.2, 180.6, 183.1, 185.7, 187.8, 189.7],
  max: [148.2, 151.0, 154.5, 158.1, 162.0, 166.4, 171.1, 176.3, 181.5, 185.0, 187.2, 189.7]
};

export const assetDetailsByTicker: Record<SupportedAssetTicker, AssetDetailMock> = {
  BTC: {
    ticker: "BTC",
    name: "Bitcoin",
    type: "crypto",
    iconText: "₿",
    price: 72190,
    dayChangePct: -1.15,
    descriptionShort: "Bitcoin is a decentralized digital asset used as a store of value and liquidity proxy for crypto markets.",
    descriptionLong: "Bitcoin is the largest crypto asset by market value. It is commonly used by investors as a long-term allocation, but it can also move sharply in short windows when macro liquidity, regulation, or derivatives positioning changes.",
    aiBrief: "Bitcoin is moving up and down a lot these days. That means your portfolio value can change quickly in a few hours. If you already hold it, staying calm and avoiding impulsive moves is usually safer. Think of it as a high-risk part of your portfolio that needs extra attention.",
    guidance: {
      label: "WAIT",
      confidencePct: 68,
      summary: "Momentum is positive, but volatility is high. Better to stay patient than chase moves.",
      upside: "If risk mood improves, BTC can revisit recent highs.",
      downside: "If macro turns risk-off, BTC can drop fast."
    },
    position: {
      qty: 0.45,
      avgBuy: 74320,
      invested: 33444,
      currentValue: 32560,
      pnlEur: -884,
      pnlPct: -2.64
    },
    chartSeries: btcSeries
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft",
    type: "stock",
    iconText: "MS",
    price: 468.8,
    dayChangePct: 0.75,
    descriptionShort: "Microsoft is a global software and cloud leader with strong enterprise and AI-related revenue drivers.",
    descriptionLong: "Microsoft combines resilient recurring revenue from enterprise software with growth from cloud and AI products. The stock is often treated as a quality large-cap anchor, but valuation and guidance changes can still create sharp repricing after key updates.",
    aiBrief: "Microsoft is one of the more stable big companies in the market, but its price can still swing after company updates. Right now the trend is generally positive. For most people, it works better as a long-term position than as a short-term trade. Keep your position size reasonable so one stock does not dominate your portfolio.",
    guidance: {
      label: "HOLD",
      confidencePct: 74,
      summary: "Trend is solid and fundamentals are healthy. Keep position size balanced.",
      upside: "Strong cloud updates can push the stock higher.",
      downside: "A soft outlook can trigger a quick pullback."
    },
    position: {
      qty: 60,
      avgBuy: 416.7,
      invested: 25000,
      currentValue: 28120,
      pnlEur: 3120,
      pnlPct: 12.48
    },
    chartSeries: msftSeries
  },
  GLD: {
    ticker: "GLD",
    name: "Gold ETF",
    type: "etf",
    iconText: "Au",
    price: 189.7,
    dayChangePct: 0.3,
    descriptionShort: "GLD is an exchange-traded fund designed to track the price of gold.",
    descriptionLong: "GLD gives investors liquid exposure to gold without holding physical bars directly. It is often used as a portfolio diversifier when inflation uncertainty, rate volatility, or geopolitical risk increases.",
    aiBrief: "Gold usually moves more calmly than many stocks or crypto. In a portfolio, it can help reduce stress when other assets are volatile. It is not normally the asset with the biggest growth, but it can add balance and protection. Use it as a stabilizer, not as your main return engine.",
    guidance: {
      label: "REVIEW",
      confidencePct: 62,
      summary: "Gold still helps diversification. Review sizing versus your current risk budget.",
      upside: "If real yields ease, gold can keep climbing.",
      downside: "If yields jump, gold can lag for a while."
    },
    position: {
      qty: 96,
      avgBuy: 180.9,
      invested: 17370,
      currentValue: 18230,
      pnlEur: 860,
      pnlPct: 4.95
    },
    chartSeries: gldSeries
  }
};

export const supportedAssetTickers: SupportedAssetTicker[] = ["BTC", "MSFT", "GLD"];
