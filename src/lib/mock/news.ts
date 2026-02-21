import { NewsItem } from "@/lib/types";

export const mockNews: NewsItem[] = [
  {
    id: "n1",
    title: "Bitcoin supera los 72.000$ tras entradas récord en ETFs spot",
    source: "CoinDesk",
    publishedAt: "2026-02-21T08:10:00.000Z",
    tags: ["crypto", "etf flows", "market momentum"],
    tickers: ["BTC"],
    shortSummary: "Las entradas netas en ETFs de Bitcoin impulsan un nuevo tramo alcista.",
    keyNumbers: ["72.100$ BTC", "+1.4B$ entradas semanales"],
    difficulty: "complex"
  },
  {
    id: "n2",
    title: "La Fed mantiene tipos y reitera enfoque dependiente de datos",
    source: "Bloomberg",
    publishedAt: "2026-02-21T07:45:00.000Z",
    tags: ["rates", "macro", "fed"],
    tickers: [],
    shortSummary: "El banco central mantiene tipos y deja abierta la puerta a recortes graduales.",
    keyNumbers: ["Tipos: 5.00%-5.25%"],
    difficulty: "complex"
  },
  {
    id: "n3",
    title: "Nvidia vuelve a batir ingresos por demanda de chips de IA",
    source: "Reuters",
    publishedAt: "2026-02-20T22:15:00.000Z",
    tags: ["earnings", "ai", "stocks", "tech"],
    tickers: ["NVDA"],
    shortSummary: "Resultados trimestrales por encima de expectativas gracias a centros de datos.",
    keyNumbers: ["+38% ingresos YoY", "margen bruto 74%"],
    difficulty: "complex"
  },
  {
    id: "n4",
    title: "El BCE apunta a una inflación más cerca del objetivo en verano",
    source: "Financial Times",
    publishedAt: "2026-02-20T19:05:00.000Z",
    tags: ["ecb", "inflation", "macro", "rates"],
    tickers: [],
    shortSummary: "La desinflación avanza, pero el BCE insiste en cautela antes de relajar política.",
    keyNumbers: ["Inflación núcleo 2.6%"],
    difficulty: "complex"
  },
  {
    id: "n5",
    title: "Cuenta remunerada al 3.1% TAE vuelve al radar de ahorradores",
    source: "Expansión",
    publishedAt: "2026-02-20T16:00:00.000Z",
    tags: ["savings", "retail banking", "rates"],
    tickers: [],
    shortSummary: "La competencia bancaria reaviva ofertas de ahorro de bajo riesgo.",
    keyNumbers: ["3.1% TAE", "sin comisiones"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n6",
    title: "Tesla presenta márgenes más débiles por descuentos y costes logísticos",
    source: "CNBC",
    publishedAt: "2026-02-20T13:40:00.000Z",
    tags: ["earnings", "ev", "stocks"],
    tickers: ["TSLA"],
    shortSummary: "La presión en precios impacta márgenes pese al aumento de entregas.",
    keyNumbers: ["Margen operativo 8.9%"],
    difficulty: "complex"
  },
  {
    id: "n7",
    title: "EuroStoxx marca máximos en la semana apoyado por bancos",
    source: "Investing",
    publishedAt: "2026-02-20T11:20:00.000Z",
    tags: ["stocks", "europe", "macro"],
    tickers: [],
    shortSummary: "El sector financiero lidera las subidas por expectativas de tipos estables.",
    keyNumbers: ["EuroStoxx +1.7% semanal"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n8",
    title: "Regulación MiCA acelera requisitos para plataformas de cripto en la UE",
    source: "The Block",
    publishedAt: "2026-02-20T09:30:00.000Z",
    tags: ["crypto regulation", "crypto", "europe"],
    tickers: ["ETH", "BTC"],
    shortSummary: "Nuevos plazos de cumplimiento afectan operativa y costes de exchanges.",
    keyNumbers: ["Entrada en vigor fase 2: Q3 2026"],
    difficulty: "complex"
  },
  {
    id: "n9",
    title: "ETF global de bajo coste gana popularidad entre perfiles principiantes",
    source: "Morningstar",
    publishedAt: "2026-02-19T21:12:00.000Z",
    tags: ["etf", "stocks", "savings", "long-term"],
    tickers: ["VWCE"],
    shortSummary: "Aumenta el interés por productos diversificados para inversión periódica.",
    keyNumbers: ["TER 0.22%"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n10",
    title: "El oro corrige tras subida de rendimiento en bonos a 10 años",
    source: "MarketWatch",
    publishedAt: "2026-02-19T18:10:00.000Z",
    tags: ["macro", "rates", "commodities"],
    tickers: [],
    shortSummary: "Los movimientos en bonos reequilibran expectativas de activos refugio.",
    keyNumbers: ["US10Y: 4.32%"],
    difficulty: "complex"
  },
  {
    id: "n11",
    title: "Apple apuesta por IA on-device y mejora previsión de servicios",
    source: "WSJ",
    publishedAt: "2026-02-19T16:05:00.000Z",
    tags: ["ai", "earnings", "tech", "stocks"],
    tickers: ["AAPL"],
    shortSummary: "La compañía destaca crecimiento en servicios y estrategia de IA en producto.",
    keyNumbers: ["Servicios +14% YoY"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n12",
    title: "IPC de España sorprende a la baja y mejora expectativas de consumo",
    source: "El Economista",
    publishedAt: "2026-02-19T11:55:00.000Z",
    tags: ["inflation", "macro", "spain"],
    tickers: [],
    shortSummary: "Una inflación más moderada aliviaría presión en el gasto de los hogares.",
    keyNumbers: ["IPC anual: 2.3%"],
    difficulty: "beginner-friendly"
  },
  {
    id: "n13",
    title: "Solana sube tras aumento de actividad DeFi y volumen en DEX",
    source: "Decrypt",
    publishedAt: "2026-02-18T20:40:00.000Z",
    tags: ["crypto", "defi", "market momentum"],
    tickers: ["SOL"],
    shortSummary: "El ecosistema recupera tracción por mayor actividad de usuarios.",
    keyNumbers: ["TVL +9% semanal"],
    difficulty: "complex"
  },
  {
    id: "n14",
    title: "Guía rápida: qué mirar antes de contratar un depósito",
    source: "Rankia",
    publishedAt: "2026-02-18T09:15:00.000Z",
    tags: ["savings", "personal finance", "education"],
    tickers: [],
    shortSummary: "Tasa nominal, TAE y penalizaciones son claves para comparar productos.",
    difficulty: "beginner-friendly"
  }
];
