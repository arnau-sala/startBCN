from pydantic import BaseModel
from typing import List, Optional


class Asset(BaseModel):
    """Represents a single asset in Pepe's portfolio."""
    name: str
    symbol: str
    value: float  # Current value in EUR
    change_percent: float  # % change
    icon: str  # Emoji or icon identifier


class ChartPoint(BaseModel):
    """A single data point for the portfolio evolution chart."""
    timestamp: str  # ISO format datetime string
    value: float


class PortfolioResponse(BaseModel):
    """Full portfolio response including balance, assets, and chart data."""
    total_balance: float
    currency: str = "EUR"
    assets: List[Asset]
    chart: Optional[List[ChartPoint]] = None
