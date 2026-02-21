"""
Rutas de noticias — Endpoints de noticias y chat con IA.
"""

from fastapi import APIRouter

from models.news import NewsResponse, ChatMessage, ChatResponse
from services.news import get_filtered_news
from services.ai_engine import getChatResponse
from services.portfolio import get_portfolio

router = APIRouter(prefix="/api", tags=["News"])


@router.get("/news", response_model=NewsResponse)
async def news():
    """
    Noticias financieras: globales y personalizadas según intereses de Pepe (crypto, stocks, oro).
    """
    return await get_filtered_news()


@router.post("/chat", response_model=ChatResponse)
async def chat(body: ChatMessage):
    """
    Envía un mensaje al asistente financiero con IA.
    El motor de IA (Persona 2) responde con contexto de cartera.
    """
    portfolio = get_portfolio()
    context = {
        "total_balance": portfolio.total_balance,
        "assets": [a.model_dump() for a in portfolio.assets],
    }
    reply = await getChatResponse(body.message, context)
    return ChatResponse(reply=reply)
