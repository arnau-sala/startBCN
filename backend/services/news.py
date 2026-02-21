"""
Servicio de noticias — Carga, filtra y enriquece noticias financieras.
"""

import json
import os
from typing import List

from models.news import NewsArticle, NewsResponse
from services.ai_engine import translateToELI10


# Intereses de Pepe para el filtrado personalizado

PEPE_INTERESTS = {"crypto", "stocks", "gold"}

# Ruta al archivo de noticias

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
NEWS_FILE = os.path.join(DATA_DIR, "noticias.json")


def _load_raw_news() -> List[dict]:
    """Carga las noticias desde el JSON."""
    with open(NEWS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _is_personalized(tags: List[str]) -> bool:
    """Comprueba si la noticia encaja con los intereses de Pepe."""
    return bool(set(tags) & PEPE_INTERESTS)


async def get_filtered_news() -> NewsResponse:
    """
    Carga noticias, las enriquece con ELI10 vía AIEngine y las separa en
    globales y personalizadas según los intereses de Pepe.
    """
    raw_articles = _load_raw_news()
    global_news: List[NewsArticle] = []
    personalized_news: List[NewsArticle] = []

    for article_data in raw_articles:
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
