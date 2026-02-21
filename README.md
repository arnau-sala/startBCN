# AI Curator for Financial News (N26 Case)

A demo-friendly Next.js MVP for the N26 challenge: **less noise, more clarity, and stronger personalization** for financial news.

The product is an **educational curator**, not a broker or a full portfolio tracker.

---

## Problem we solve

- Information overload: 100+ news items per day.
- News is often too complex for retail users.
- Low personalization (same feed for everyone).

---

## MVP Features

### 1) For You (core)
- Mock news feed (14 items) ranked by relevance.
- Profile personalization: interests, risk, level, and watchlist.
- Relevance labels: `High`, `Medium`, `Low`.
- Explanation example: "because you follow NVDA and like AI".
- `Simplify` button with real AI to turn complex into clear.
- Personalized daily tip (AI with fallback).

### 2) Alerts & Trends (core)
- Simple trend detection by tag frequency.
- Trending topics visible in the UI.
- Personalized alerts (BTC, TSLA earnings, ECB rates, etc).
- Related stories highlighted as `ALERT`.

### 3) Explain (core)
- Concept search: inflation, ETF, volatility, interest rate...
- `Explain like I'm 10` (ELI10).
- `Explain for my level` (beginner/intermediate/advanced).
- Structured response:
  - In one sentence
  - Simple example
  - What to watch
  - Common mistakes

### 4) Settings / Profile (core)
- Profile presets:
  - Beginner Conservative (Savings focus)
  - Beginner Moderate (Index/ETFs)
  - Aggressive Crypto
  - Stock picker AI/Tech
- Editing for interests, risk, level, watchlist, and alerts.

---

## What is real vs mock

### Real
- LLM calls in:
  - `POST /api/news/simplify`
  - `POST /api/explain`
  - `POST /api/tip`
- OpenAI-compatible integration via `fetch`.

### Mock
- News/profile dataset in `/src/lib/mock`.
- In-memory/localStorage profile (no real DB).
- Trends/alerts via simple heuristics.

---

## Tech Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- API routes in `src/app/api/*/route.ts`
- Mock data with no database
- OpenAI-compatible LLM through `.env`

---

## API Endpoints

### API unificada (Persona 1 + Persona 2)

- `GET /api/portfolio` — Cartera de Pepe (balance total + activos: Gold, Bitcoin, Microsoft).
- `GET /api/portfolio/chart/[period]` — Gráfico simulado: `1D`, `1S`, `1M`, `1A`, `MAX`.
- `GET /api/news/unified?enrich=eli10` — Noticias desde `noticias.json`, global/personalizadas, con ELI10 en las primeras.
- `GET /api/daily-tip` — Consejo del día fijo (misma estructura que backend Python).
- `POST /api/chat` — Chatbot con IA (contexto cartera/noticias). Body: `{ message, userName?, assetsSummary?, news? }`.
- `POST /api/eli10` — Convierte texto técnico en ELI10. Body: `{ title, technical_content, category }`. Para que el backend Python llame a la IA.
- `GET /api/daily-resume` — Resumen del día estático (Persona 2).
- `GET /api/trend-alerts` — Alertas de tendencia estáticas.

### Endpoints existentes (feed y perfil)

- `GET /api/news?profile=<preset-id>`
  - Returns news + `relevanceScore`, `relevanceLabel`, `reason`
- `POST /api/news/simplify`
  - Body: `{ newsId, profile }`
  - Response: `{ simplified }`
- `POST /api/explain`
  - Body: `{ concept, mode: "eli10" | "level", profile }`
  - Response: `{ explanation }`
- `POST /api/tip`
  - Body: `{ profile, trendingTopics }`
  - Response: `{ tip }` (fallback if LLM fails)
- `GET|POST /api/profile`
  - In-memory profile for demo

---

## Environment Variables

Copy `.env.example` to `.env.local` and add your key.

**Option 1 — Gemini (recommended):**

```bash
GEMINI_API_KEY=your_gemini_key
# Optional: LLM_MODEL=gemini-2.5-flash
```

Get the key at [Google AI Studio](https://aistudio.google.com/apikey). Models: `gemini-2.5-flash`, `gemini-2.5-flash-lite`, etc.

**Option 2 — OpenAI (or compatible):**

```bash
LLM_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=your_openai_key_here
LLM_MODEL=gpt-4o-mini
```

If no key is set (Gemini or OpenAI), AI endpoints return a friendly message and `tip` uses a fallback.

**Optional — Python backend:** To use the FastAPI backend (`backend/`) with Next.js AI, start Next.js first, then:

```bash
export NEXTJS_API_URL=http://localhost:3000
uvicorn main:app --reload --port 8000
```

---

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## How this matches judging criteria

- **Proof of Concept (40%)**: working feed, personalized ranking, trends/alerts, API endpoints, and real AI calls.
- **User Experience (30%)**: fintech navigation, clean cards, chips, loading/error states, and clear 4-tab flow.
- **AI Innovation (20%)**: contextual simplification by profile, ELI10 mode, level-based explanations, and personalized daily tip.
- **N26 Fit (10%)**: educational and contextual curation (not trading), easy to integrate as a module inside a banking app.

---

## Disclaimer

This project provides **educational information** and financial context.
**It is not financial advice and does not recommend buying/selling assets.**
