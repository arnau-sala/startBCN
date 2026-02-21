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

Copia `.env.example` a `.env.local` y rellena tu clave.

**Opción 1 — Gemini (recomendado):**

```bash
GEMINI_API_KEY=tu_clave_de_gemini
# Opcional: LLM_MODEL=gemini-2.0-flash
```

Obtén la key en [Google AI Studio](https://aistudio.google.com/apikey). Modelos válidos: `gemini-2.0-flash`, `gemini-2.0-flash-exp`, `gemini-1.5-flash`, etc.

**Opción 2 — OpenAI (o compatible):**

```bash
LLM_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=your_openai_key_here
LLM_MODEL=gpt-4o-mini
```

Si no hay ninguna clave (Gemini ni OpenAI), los endpoints de IA devuelven un mensaje amigable y `tip` usa fallback.

**Unificar con backend Python (opcional):** Si corres el backend FastAPI (`backend/`) y quieres que use la IA de Next.js, arranca primero Next.js y luego:

```bash
# En .env del backend o en la shell:
export NEXTJS_API_URL=http://localhost:3000
uvicorn main:app --reload --port 8000
```

Así el backend Python llama a `POST /api/chat` y `POST /api/eli10` para respuestas reales.

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
