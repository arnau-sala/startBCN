"""
Daily Tip Route — Serves a static financial tip of the day.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Daily Tip"])

DAILY_TIP = {
    "title": "💡 Consejo del día",
    "tip": "Diversifica tu cartera: no pongas todos los huevos en la misma cesta. "
           "Una buena regla es la del 60/30/10: 60% en activos estables (oro, bonos), "
           "30% en acciones de crecimiento y 10% en activos de alto riesgo como crypto.",
    "source": "N26 Financial Education",
    "category": "investment_basics",
}


@router.get("/daily-tip")
async def daily_tip():
    """Get today's financial tip. Always returns the same static tip."""
    return DAILY_TIP
