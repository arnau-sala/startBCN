"""
News Service — Reads, filters, and enriches financial news.
"""

import json
import os
from typing import List

from models.news import NewsArticle, NewsResponse
from services.ai_engine import translateToELI10


# ── Pepe's interests (used for personalized filtering) ──────────────────────

PEPE_INTERESTS = {"crypto", "stocks", "gold"}

# ── Path to news data file ──────────────────────────────────────────────────

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
NEWS_FILE = os.path.join(DATA_DIR, "noticias.json")


def _load_raw_news() -> List[dict]:
    """Load news articles from the JSON file."""
    with open(NEWS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _is_personalized(tags: List[str]) -> bool:
    """Check if a news article matches Pepe's interests."""
    return bool(set(tags) & PEPE_INTERESTS)


async def get_filtered_news() -> NewsResponse:
    """
    Load news, enrich with ELI10 summaries via AIEngine, and split into
    global vs personalized based on Pepe's interests.
    """
    raw_articles = _load_raw_news()

    global_news: List[NewsArticle] = []
    personalized_news: List[NewsArticle] = []

    for article_data in raw_articles:
        # Call AIEngine placeholder to generate ELI10 summary
        eli10 = await translateToELI10(article_data["summary"])
        article = NewsArticle(**article_data, eli10_summary=eli10)

        if _is_personalized(article.tags):
            personalized_news.append(article)
        else:
            global_news.append(article)

    return NewsResponse(
        global_news=global_news,
        personalized_news=personalized_news,
    )
