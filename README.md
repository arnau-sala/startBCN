# AI Curator for Financial News (N26 Case)

MVP demo-friendly en Next.js para resolver el reto de N26: **menos ruido, mas claridad y mas personalizacion** en noticias financieras.

El producto es un **curator educativo**, no un broker ni un portfolio tracker completo.

---

## Problem we solve

- Information overload: 100+ noticias al dia.
- Noticias demasiado complejas para usuarios retail.
- Feed poco personalizado (misma experiencia para todos).

---

## MVP Features

### 1) For You (core)
- Feed de noticias mock (14 items) reordenado por relevancia.
- Personalizacion por perfil: intereses, riesgo, nivel y watchlist.
- Etiquetas de relevancia: `High`, `Medium`, `Low`.
- Justificacion tipo: "porque sigues NVDA y te interesa AI".
- Boton `Simplify` con IA real para convertir complejo -> claro.
- Tip del dia personalizado (IA con fallback).

### 2) Alerts & Trends (core)
- Deteccion simple de tendencias por frecuencia de tags.
- Topicos trending visibles en UI.
- Alertas personalizadas (BTC, TSLA earnings, ECB rates, etc).
- Noticias relacionadas destacadas como `ALERT`.

### 3) Explain (core)
- Buscador de conceptos: inflacion, ETF, volatilidad, tipo de interes...
- `Explain like I'm 10` (ELI10).
- `Explain for my level` (beginner/intermediate/advanced).
- Respuesta estructurada:
  - En una frase
  - Ejemplo sencillo
  - Que vigilar
  - Errores comunes

### 4) Settings / Profile (core)
- Presets de perfil:
  - Beginner Conservative (Savings focus)
  - Beginner Moderate (Index/ETFs)
  - Aggressive Crypto
  - Stock picker AI/Tech
- Edicion de intereses, riesgo, nivel, watchlist y alertas.

---

## What is real vs mock

### Real
- Llamadas LLM en:
  - `POST /api/news/simplify`
  - `POST /api/explain`
  - `POST /api/tip`
- Integracion OpenAI-compatible via `fetch`.

### Mock
- Dataset de noticias y perfiles (`/src/lib/mock`).
- Perfil en memoria/localStorage (sin DB real).
- Trends/alerts por heuristica simple.

---

## Tech Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- API routes en `src/app/api/*/route.ts`
- Datos mock sin base de datos
- LLM OpenAI-compatible por `.env`

---

## API Endpoints

- `GET /api/news?profile=<preset-id>`
  - Devuelve noticias + `relevanceScore`, `relevanceLabel`, `reason`
- `POST /api/news/simplify`
  - Body: `{ newsId, profile }`
  - Response: `{ simplified }`
- `POST /api/explain`
  - Body: `{ concept, mode: "eli10" | "level", profile }`
  - Response: `{ explanation }`
- `POST /api/tip`
  - Body: `{ profile, trendingTopics }`
  - Response: `{ tip }` (fallback si falla LLM)
- `GET|POST /api/profile`
  - Perfil en memoria para demo

---

## Environment Variables

Copia `.env.example` a `.env.local`:

```bash
LLM_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=your_api_key_here
LLM_MODEL=gpt-4o-mini
```

Si no hay clave, los endpoints IA devuelven `LLM not configured` (y `tip` usa fallback).

---

## Run locally

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

---

## How this matches judging criteria

- **Proof of Concept (40%)**: feed funcional, ranking personalizado, trends/alerts, endpoints API y llamadas IA reales.
- **User Experience (30%)**: navegacion lateral fintech, cards limpias, chips, estados de carga/error, flujo claro en 4 tabs.
- **AI Innovation (20%)**: simplificacion contextual por perfil, modo ELI10, explicacion por nivel, tip diario personalizado.
- **N26 Fit (10%)**: enfoque educativo y curacion de contexto (no trading), facil de integrar como modulo dentro de app bancaria.

---

## Disclaimer

Este proyecto ofrece **informacion educativa** y contexto financiero.
**No constituye asesoramiento financiero ni recomendacion de compra/venta.**
