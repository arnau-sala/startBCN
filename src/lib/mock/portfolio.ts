export type Timeframe = "day" | "week" | "month" | "year" | "max";

export interface HoldingItem {
  id: string;
  name: string;
  ticker: string;
  valueEur: number;
  plEur: number;
  plPct: number;
}

export const totalBalanceByRange: Record<Timeframe, number> = {
  day: 128420,
  week: 126980,
  month: 124310,
  year: 116240,
  max: 102500
};

export const chartSeriesByRange: Record<Timeframe, number[]> = {
  day: [121, 122, 120, 124, 123, 126, 125, 128, 127, 129, 128, 130],
  week: [112, 113, 114, 113, 115, 116, 118, 117, 119, 120, 121, 122],
  month: [95, 97, 98, 97, 100, 102, 103, 104, 106, 107, 108, 110],
  year: [76, 77, 78, 80, 81, 83, 84, 86, 88, 90, 92, 94],
  max: [62, 65, 67, 70, 73, 76, 80, 84, 88, 92, 97, 100]
};

export const holdings: HoldingItem[] = [
  { id: "h1", name: "Bitcoin", ticker: "BTC", valueEur: 32560, plEur: -920, plPct: -2.75 },
  { id: "h2", name: "Microsoft", ticker: "MSFT", valueEur: 28120, plEur: 3120, plPct: 12.48 },
  { id: "h3", name: "Gold ETF", ticker: "GLD", valueEur: 18230, plEur: 860, plPct: 4.95 },
  { id: "h4", name: "NVIDIA", ticker: "NVDA", valueEur: 26400, plEur: 5240, plPct: 24.76 },
  { id: "h5", name: "Cash Reserve", ticker: "EUR", valueEur: 13850, plEur: 0, plPct: 0 }
];

export const totalInvested = 119900;

export const searchUniverse = [
  { symbol: "AAPL", name: "Apple", price: 211.23, changePct: 1.2 },
  { symbol: "TSLA", name: "Tesla", price: 182.6, changePct: -2.1 },
  { symbol: "BTC", name: "Bitcoin", price: 72100, changePct: -3.1 },
  { symbol: "ETH", name: "Ethereum", price: 3910, changePct: -1.5 },
  { symbol: "MSFT", name: "Microsoft", price: 468.8, changePct: 0.9 }
];
