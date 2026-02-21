"""
Ruta del consejo del día — Sirve un consejo financiero estático.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Daily Tip"])

DAILY_TIP = {
    "title": "💡 Daily tip",
    "tip": "Diversify your portfolio: don't put all your eggs in one basket. "
           "A simple rule is 60/30/10: 60% in stable assets (gold, bonds), "
           "30% in growth stocks and 10% in higher-risk assets like crypto.",
    "source": "N26 Financial Education",
    "category": "investment_basics",
}


@router.get("/daily-tip")
async def daily_tip():
    """Devuelve el consejo del día (siempre el mismo contenido estático)."""
    return DAILY_TIP
