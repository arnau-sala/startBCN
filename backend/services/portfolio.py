"""
Servicio de cartera — Gestiona la cartera de Pepe.
"""

import random
from datetime import datetime, timedelta
from typing import List

from models.portfolio import Asset, ChartPoint, PortfolioResponse


# Cartera fija de Pepe

PEPE_ASSETS: List[Asset] = [
    Asset(name="Gold", symbol="XAU", value=530.0, change_percent=1.2, icon="🥇"),
    Asset(name="Bitcoin", symbol="BTC", value=930.0, change_percent=3.5, icon="₿"),
    Asset(name="Microsoft", symbol="MSFT", value=300.0, change_percent=-0.8, icon="💻"),
]


def get_portfolio() -> PortfolioResponse:
    """Devuelve la cartera de Pepe con el balance total."""
    total = sum(asset.value for asset in PEPE_ASSETS)
    return PortfolioResponse(
        total_balance=total,
        currency="EUR",
        assets=PEPE_ASSETS,
    )


def get_chart_data(period: str) -> List[ChartPoint]:
    """
    Genera datos simulados para el gráfico de evolución de la cartera.

    Períodos:
        - 1D  → 24 puntos (horas)
        - 1S  → 7 puntos (días)
        - 1M  → 30 puntos (días)
        - 1A  → 12 puntos (meses)
        - MAX → 60 puntos (meses, 5 años)
    """
    now = datetime.utcnow()
    total_balance = sum(a.value for a in PEPE_ASSETS)
    period_config = {
        "1D": {"points": 24, "delta": timedelta(hours=1), "volatility": 0.002},
        "1S": {"points": 7, "delta": timedelta(days=1), "volatility": 0.008},
        "1M": {"points": 30, "delta": timedelta(days=1), "volatility": 0.012},
        "1A": {"points": 12, "delta": timedelta(days=30), "volatility": 0.04},
        "MAX": {"points": 60, "delta": timedelta(days=30), "volatility": 0.06},
    }
    config = period_config.get(period.upper())
    if not config:
        config = period_config["1M"]
    points: List[ChartPoint] = []
    value = total_balance * 0.85
    random.seed(42 + hash(period))
    for i in range(config["points"]):
        timestamp = now - config["delta"] * (config["points"] - 1 - i)
        change = random.uniform(-config["volatility"], config["volatility"] * 1.3)
        value = value * (1 + change)
        if i == config["points"] - 1:
            value = total_balance
        points.append(
            ChartPoint(
                timestamp=timestamp.isoformat() + "Z",
                value=round(value, 2),
            )
        )
    return points
