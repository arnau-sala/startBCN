import { NewsItem, RankedNewsItem } from "@/lib/types";

export function detectTrendingTopics(news: NewsItem[], limit = 6) {
  const counter = new Map<string, number>();

  news.forEach((item) => {
    item.tags.forEach((tag) => {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    });
  });

  return [...counter.entries()]
    .map(([tag, hits]) => ({ tag, hits }))
    .sort((a, b) => b.hits - a.hits)
    .slice(0, limit);
}

export function getAlertMatches(news: RankedNewsItem[], alerts: string[]) {
  return news.filter((item) =>
    alerts.some((alert) =>
      `${item.title} ${item.tags.join(" ")} ${item.tickers.join(" ")}`
        .toLowerCase()
        .includes(alert.toLowerCase())
    )
  );
}
