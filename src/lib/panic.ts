export type PanicAssetType = "crypto" | "stock" | "etf";

export interface PanicHoldingInput {
  ticker: string;
  name: string;
  plPct: number;
  dayChangePct?: number;
}

function getAssetType(ticker: string): PanicAssetType {
  const t = ticker.toUpperCase();
  if (t === "BTC" || t === "ETH") return "crypto";
  if (t === "GLD" || t === "SPY" || t === "QQQ" || t === "VWCE") return "etf";
  return "stock";
}

export function getPanicCopy(holding: PanicHoldingInput, relatedHeadline?: string) {
  const type = getAssetType(holding.ticker);
  const move = Math.max(Math.abs(holding.plPct), Math.abs(holding.dayChangePct ?? 0), 0.5);
  const volatility = Math.min(99, Math.round(move * 4 + 6));

  const plainEnglishBullets =
    type === "crypto"
      ? [
        "Crypto moves fast.",
        "Risk-off days hit crypto first.",
        "Short red moves are common."
      ]
      : type === "etf"
        ? [
          "ETFs follow macro trends.",
          "Rates can move this quickly.",
          "Small pullbacks are normal."
        ]
        : [
          "Stocks react to sentiment.",
          "Good companies can still drop.",
          "One red day is not a full trend."
        ];

  const driversBullets: string[] = [];
  if (relatedHeadline) {
    driversBullets.push(`Reaction to: ${relatedHeadline}`);
  }
  if (type === "crypto") {
    driversBullets.push("Risk-off + leverage reset.");
  } else if (type === "etf") {
    driversBullets.push("Rates + macro positioning.");
  } else {
    driversBullets.push("Sector mood + guidance risk.");
  }

  return {
    plainEnglishBullets,
    driversBullets,
    volatilityLabel: `Volatility: ${volatility}%`
  };
}
