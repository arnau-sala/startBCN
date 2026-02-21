"""
N26 AI Curator — API Backend de noticias financieras
====================================================

Punto de entrada. Registra routers y CORS.

Ejecutar:
    uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.portfolio import router as portfolio_router
from routes.news import router as news_router
from routes.daily_tip import router as daily_tip_router

# ── Configuración de la app ───────────────────────────────────────────────────

app = FastAPI(
    title="N26 AI Curator — API de noticias financieras",
    description="API backend para cartera, noticias y respuestas con IA. "
                "Reto N26 StartBCN.",
    version="1.0.0",
)

# ── CORS (permitir frontend) ─────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──────────────────────────────────────────────────────────────────

app.include_router(portfolio_router)
app.include_router(news_router)
app.include_router(daily_tip_router)


# ── Health check ─────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def root():
    """Comprueba que la API responde."""
    return {
        "status": "ok",
        "app": "N26 AI Curator",
        "version": "1.0.0",
        "endpoints": [
            "/api/portfolio",
            "/api/portfolio/chart/{period}",
            "/api/news",
            "/api/chat",
            "/api/daily-tip",
            "/docs",
        ],
    }
