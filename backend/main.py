"""
N26 AI Curator for Financial News — Backend API
================================================

Main entry point. Registers all routers and configures CORS.

Run with:
    uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.portfolio import router as portfolio_router
from routes.news import router as news_router
from routes.daily_tip import router as daily_tip_router

# ── App Setup ────────────────────────────────────────────────────────────────

app = FastAPI(
    title="N26 AI Curator — Financial News API",
    description="Backend API for portfolio management, financial news curation, "
                "and AI-powered insights. Built for the N26 StartBCN challenge.",
    version="1.0.0",
)

# ── CORS (allow frontend to connect) ────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register Routers ────────────────────────────────────────────────────────

app.include_router(portfolio_router)
app.include_router(news_router)
app.include_router(daily_tip_router)


# ── Health Check ─────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint."""
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
