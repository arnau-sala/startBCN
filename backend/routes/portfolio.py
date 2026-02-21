"""
Portfolio Routes — Endpoints for Pepe's portfolio and chart data.
"""

from fastapi import APIRouter, HTTPException
from typing import List

from models.portfolio import PortfolioResponse, ChartPoint
from services.portfolio import get_portfolio, get_chart_data

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio"])

VALID_PERIODS = {"1D", "1S", "1M", "1A", "MAX"}


@router.get("", response_model=PortfolioResponse)
async def portfolio():
    """Get Pepe's full portfolio: total balance and asset breakdown."""
    return get_portfolio()


@router.get("/chart/{period}", response_model=List[ChartPoint])
async def portfolio_chart(period: str):
    """
    Get simulated chart data for portfolio evolution.

    Supported periods: 1D, 1S, 1M, 1A, MAX
    """
    if period.upper() not in VALID_PERIODS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid period '{period}'. Use one of: {', '.join(sorted(VALID_PERIODS))}",
        )
    return get_chart_data(period)
