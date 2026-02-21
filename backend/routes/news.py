"""
News Routes — Endpoints for financial news and AI chat.
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
    Get financial news split into global and personalized categories
    based on Pepe's interests (crypto, stocks, gold).
    """
    return await get_filtered_news()


@router.post("/chat", response_model=ChatResponse)
async def chat(body: ChatMessage):
    """
    Send a message to the AI financial assistant.
    The AI Engine (Persona 2) will process the message with portfolio context.
    """
    # Build context with Pepe's portfolio for personalized responses
    portfolio = get_portfolio()
    context = {
        "total_balance": portfolio.total_balance,
        "assets": [a.model_dump() for a in portfolio.assets],
    }

    reply = await getChatResponse(body.message, context)
    return ChatResponse(reply=reply)
