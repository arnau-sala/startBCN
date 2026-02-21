"""
Rutas de cartera — Endpoints de la cartera de Pepe y datos del gráfico.
"""

from fastapi import APIRouter, HTTPException
from typing import List

from models.portfolio import PortfolioResponse, ChartPoint
from services.portfolio import get_portfolio, get_chart_data

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio"])

VALID_PERIODS = {"1D", "1S", "1M", "1A", "MAX"}


@router.get("", response_model=PortfolioResponse)
async def portfolio():
    """Obtiene la cartera de Pepe: balance total y desglose de activos."""
    return get_portfolio()


@router.get("/chart/{period}", response_model=List[ChartPoint])
async def portfolio_chart(period: str):
    """
    Datos simulados del gráfico de evolución.
    Períodos: 1D, 1S, 1M, 1A, MAX
    """
    if period.upper() not in VALID_PERIODS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid period '{period}'. Use one of: {', '.join(sorted(VALID_PERIODS))}",
        )
    return get_chart_data(period)
