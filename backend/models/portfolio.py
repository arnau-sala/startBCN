from pydantic import BaseModel
from typing import List, Optional


class Asset(BaseModel):
    """Un activo de la cartera de Pepe."""
    name: str
    symbol: str
    value: float  # Valor actual en EUR
    change_percent: float  # Variación %
    icon: str


class ChartPoint(BaseModel):
    """Un punto del gráfico de evolución de la cartera."""
    timestamp: str  # Fecha/hora en formato ISO
    value: float


class PortfolioResponse(BaseModel):
    """Respuesta completa de cartera: balance, activos y opcionalmente gráfico."""
    total_balance: float
    currency: str = "EUR"
    assets: List[Asset]
    chart: Optional[List[ChartPoint]] = None
