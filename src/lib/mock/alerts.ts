export interface AlertBanner {
  id: string;
  title: string;
  subtitle: string;
  tone: "negative" | "positive" | "neutral";
  icon: string;
}

export const alertBanners: AlertBanner[] = [
  {
    id: "a1",
    title: "BTC -3.1% today",
    subtitle: "Volatility spike after ETF flow update",
    tone: "negative",
    icon: "↘"
  },
  {
    id: "a2",
    title: "Earnings this week",
    subtitle: "NVDA, TSLA and AAPL report soon",
    tone: "neutral",
    icon: "📅"
  },
  {
    id: "a3",
    title: "ECB meeting in 3 days",
    subtitle: "Rates outlook may move EUR assets",
    tone: "neutral",
    icon: "🏦"
  },
  {
    id: "a4",
    title: "Savings accounts improving",
    subtitle: "Top offers near 3% TAE in EU",
    tone: "positive",
    icon: "💡"
  }
];
