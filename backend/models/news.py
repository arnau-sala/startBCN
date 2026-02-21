from pydantic import BaseModel
from typing import List, Optional


class NewsArticle(BaseModel):
    """A single financial news article."""
    id: int
    title: str
    summary: str
    source: str
    category: str
    tags: List[str]
    published_at: str
    image_url: Optional[str] = None
    eli10_summary: Optional[str] = None  # Filled by AI Engine (Persona 2)


class NewsResponse(BaseModel):
    """Filtered news response split into global and personalized."""
    global_news: List[NewsArticle]
    personalized_news: List[NewsArticle]


class ChatMessage(BaseModel):
    """Incoming chat message from the user."""
    message: str


class ChatResponse(BaseModel):
    """Response from the AI Engine chat."""
    reply: str
    source: str = "ai_engine"
