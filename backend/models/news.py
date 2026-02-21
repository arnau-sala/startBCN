from pydantic import BaseModel
from typing import List, Optional


class NewsArticle(BaseModel):
    """Una noticia financiera."""
    id: int
    title: str
    summary: str
    source: str
    category: str
    tags: List[str]
    published_at: str
    image_url: Optional[str] = None
    eli10_summary: Optional[str] = None  # Rellenado por el motor de IA (Persona 2)


class NewsResponse(BaseModel):
    """Respuesta de noticias: globales y personalizadas."""
    global_news: List[NewsArticle]
    personalized_news: List[NewsArticle]


class ChatMessage(BaseModel):
    """Mensaje de chat del usuario."""
    message: str


class ChatResponse(BaseModel):
    """Respuesta del chat con IA."""
    reply: str
    source: str = "ai_engine"
