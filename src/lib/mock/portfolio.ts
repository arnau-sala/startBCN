export type Timeframe = "day" | "week" | "month" | "year" | "max";

export interface HoldingItem {
  id: string;
  name: string;
  ticker: string;
  valueEur: number;
  plEur: number;
  plPct: number;
  plEurToday: number;
  plPctToday: number;
}

/* ─── Final balance per timeframe ─────────────────────────────────────────── */
export const totalBalanceByRange: Record<Timeframe, number> = {
  day: 78910,
  week: 78020,
  month: 76380,
  year: 71420,
  max: 63000
};

/* ─── Opening balance per timeframe (used to compute delta) ──────────────── */
export const openingBalanceByRange: Record<Timeframe, number> = {
  day: 78360,
  week: 76570,
  month: 73800,
  year: 59850,
  max: 44200
};

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function linspace(start: number, end: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => start + ((end - start) * i) / (n - 1));
}

/** Add gentle random noise to an array of values */
function addNoise(values: number[], seed: number, amplitude = 0.4): number[] {
  let s = seed;
  return values.map((v) => {
    // cheap deterministic pseudo-random
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const rand = (s / 0x80000000 - 1) * amplitude;
    return Math.round((v + rand) * 100) / 100;
  });
}

/* ─── Chart series — 60 data points per range ────────────────────────────── */

/** Each point: { value: number (EUR k), ts: ISO string } */
export interface ChartPoint {
  value: number; // portfolio value in EUR
  ts: string;    // ISO timestamp
}

function buildSeries(
  timeframe: Timeframe,
  open: number,
  close: number,
  noiseAmp: number,
  n = 60
): ChartPoint[] {
  const now = new Date("2026-02-21T17:00:00+01:00");
  const msPerStep: Record<Timeframe, number> = {
    day: (8 * 3600 * 1000) / (n - 1),         // 8 h
    week: (5 * 24 * 3600 * 1000) / (n - 1),    // 5 d
    month: (30 * 24 * 3600 * 1000) / (n - 1),   // 30 d
    year: (365 * 24 * 3600 * 1000) / (n - 1),  // 1 y
    max: (5 * 365 * 24 * 3600 * 1000) / (n - 1) // 5 y
  };

  const base = linspace(open, close, n);
  const values = addNoise(base, timeframe.charCodeAt(0), noiseAmp);

  return values.map((v, i) => ({
    value: Math.round(v),
    ts: new Date(now.getTime() - msPerStep[timeframe] * (n - 1 - i)).toISOString()
  }));
}

export const chartSeriesByRange: Record<Timeframe, ChartPoint[]> = {
  day: buildSeries("day", 78360, 78910, 120),
  week: buildSeries("week", 76570, 78020, 250),
  month: buildSeries("month", 73800, 76380, 500),
  year: buildSeries("year", 59850, 71420, 1200),
  max: buildSeries("max", 44200, 63000, 2400)
};

/* ─── Holdings ────────────────────────────────────────────────────────────── */
export const holdings: HoldingItem[] = [
  { id: "h1", name: "Bitcoin", ticker: "BTC", valueEur: 32560, plEur: -920, plPct: -2.75, plEurToday: -380, plPctToday: -1.15 },
  { id: "h2", name: "Gold ETF", ticker: "GLD", valueEur: 18230, plEur: 860, plPct: 4.95, plEurToday: 55, plPctToday: 0.30 },
  { id: "h3", name: "S&P 500", ticker: "SPY", valueEur: 28120, plEur: 3120, plPct: 12.48, plEurToday: 210, plPctToday: 0.75 },
  { id: "h4", name: "NVIDIA", ticker: "NVDA", valueEur: 26400, plEur: 5240, plPct: 24.76, plEurToday: 490, plPctToday: 1.89 },
  { id: "h5", name: "Cash Reserve", ticker: "EUR", valueEur: 13850, plEur: 0, plPct: 0, plEurToday: 0, plPctToday: 0 }
];

export const totalInvested = 75850;

export const searchUniverse = [
  { symbol: "AAPL", name: "Apple", price: 211.23, changePct: 1.2 },
  { symbol: "TSLA", name: "Tesla", price: 182.6, changePct: -2.1 },
  { symbol: "BTC", name: "Bitcoin", price: 72100, changePct: -3.1 },
  { symbol: "ETH", name: "Ethereum", price: 3910, changePct: -1.5 },
  { symbol: "SPY", name: "S&P 500", price: 528.4, changePct: 0.6 }
];
