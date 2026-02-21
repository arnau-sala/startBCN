import type { HoldingItem } from "./portfolio";
import { mockNews } from "./news";

export type AdviceAction = "COMPRAR" | "MANTENER" | "VENDER";

export interface AssetDetail extends HoldingItem {
  icon: string;
  priceUsd: number;
  quantity: number;
  buyPrice: number;
  investedEur: number;
  /** Sparkline: valor en USD (o EUR para cash) por punto */
  sparklinePoints: number[];
  timeRange: "1D" | "1S" | "1M" | "1A" | "MAX";
  aiSummaryToday: string;
  aiAdvice: {
    action: AdviceAction;
    confidence: number;
    reasoning: string;
  };
  keyMetrics: {
    marketCap?: string;
    volume24h?: string;
    ath?: string;
    dominance?: string;
    rsi14?: number;
    ma50?: string;
    ma200?: string;
  };
  longDescription: string;
  priceAlerts: { label: string; target: string }[];
}

const spark = (base: number, n: number, trend: number, seed: number) => {
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * trend;
    const noise = ((seed * (i + 1) * 9301 + 49297) % 1000) / 1000 - 0.5;
    v = v + t * 0.5 + noise * base * 0.02;
    out.push(Math.round(v * 100) / 100);
  }
  return out;
};

const detailsById: Record<string, Omit<AssetDetail, keyof HoldingItem>> = {
  h1: {
    icon: "₿",
    priceUsd: 101250,
    quantity: 0.00919,
    buyPrice: 98500,
    investedEur: 33480,
    sparklinePoints: spark(101250, 60, -1500, 1),
    timeRange: "1D",
    aiSummaryToday:
      "Bitcoin ha retrocedido hoy tras el repunte semanal. Los traders han reducido riesgo y los funding rates se normalizan. El soporte técnico en 98.500$ se mantiene; un cierre por debajo podría abrir 95.000$. El contexto macro (tipos, dólar) sigue siendo el driver principal.",
    aiAdvice: {
      action: "MANTENER",
      confidence: 72,
      reasoning:
        "La corrección es sana tras el rally. Tu precio de compra está por debajo del soporte actual; no hay urgencia en vender. Esperar a ver si se defiende 100k antes de añadir. La confianza es media-alta por el contexto técnico, pero la volatilidad puede ampliarse en noticias regulatorias."
    },
    keyMetrics: {
      marketCap: "$2.01 T",
      volume24h: "$42.5 B",
      ath: "$108,200",
      dominance: "54.2%",
      rsi14: 48,
      ma50: "$99,100",
      ma200: "$82,400"
    },
    longDescription:
      "Bitcoin (BTC) es una criptomoneda descentralizada y una red de pagos peer-to-peer. Las transacciones se verifican por nodos mediante criptografía y se registran en un libro mayor público llamado blockchain. Bitcoin fue creado en 2009 por una persona o grupo bajo el seudónimo Satoshi Nakamoto. Su oferta está limitada a 21 millones de unidades. Se usa como reserva de valor, medio de pago y para diversificación de carteras.",
    priceAlerts: [
      { label: "Avisar si sube a", target: "110.000$" },
      { label: "Avisar si baja de", target: "95.000$" }
    ]
  },
  h2: {
    icon: "🪟",
    priceUsd: 468.8,
    quantity: 60,
    buyPrice: 418,
    investedEur: 25008,
    sparklinePoints: spark(465, 60, 4.2, 2),
    timeRange: "1D",
    aiSummaryToday:
      "Microsoft sube ligeramente en un día de consolidación. La demanda por IA en la nube (Azure) sigue siendo el motor; los inversores esperan la próxima guía de ingresos. El ratio PER está en máximos recientes; el valor depende de que se materialicen los beneficios de Copilot y Azure AI.",
    aiAdvice: {
      action: "MANTENER",
      confidence: 85,
      reasoning:
        "Título de calidad con tendencia alcista estructural. La posición está en beneficios; mantener reduce el impacto fiscal de una venta. La confianza es alta por el momentum de negocio y el balance sólido. Solo considerar toma de beneficios si se supera un objetivo personal (ej. +20%)."
    },
    keyMetrics: {
      marketCap: "$3.48 T",
      volume24h: "$18.2 B",
      ath: "$468.50",
      rsi14: 58,
      ma50: "$452",
      ma200: "$398"
    },
    longDescription:
      "Microsoft Corporation desarrolla y licencia software, dispositivos y servicios. Incluye Windows, Office, Azure (nube), LinkedIn, Xbox y la división de IA (Copilot). Es una de las mayores tecnológicas por capitalización y un referente en infraestructura cloud y herramientas de productividad.",
    priceAlerts: [
      { label: "Avisar si sube a", target: "480$" },
      { label: "Avisar si baja de", target: "450$" }
    ]
  },
  h3: {
    icon: "🥇",
    priceUsd: 218.5,
    quantity: 83.5,
    buyPrice: 208,
    investedEur: 17368,
    sparklinePoints: spark(217, 60, 1.8, 3),
    timeRange: "1D",
    aiSummaryToday:
      "El Gold ETF (GLD) avanza de forma contenida. El oro físico sigue siendo refugio ante incertidumbre geopolítica y expectativas de recortes de tipos. El dólar estable limita el alza. La demanda de bancos centrales sigue siendo un soporte estructural.",
    aiAdvice: {
      action: "MANTENER",
      confidence: 78,
      reasoning:
        "Exposición defensiva adecuada en la cartera. No hay señal de cambio de tendencia; mantener la posición aporta diversificación y cobertura ante shocks. La confianza es alta por el rol del oro como reserva de valor a largo plazo."
    },
    keyMetrics: {
      marketCap: "—",
      volume24h: "$1.2 B",
      ath: "$228",
      rsi14: 52,
      ma50: "$215",
      ma200: "$205"
    },
    longDescription:
      "El SPDR Gold Shares (GLD) es un ETF que replica el precio del oro físico. Cada participación representa una fracción de una onza de oro almacenada. Se usa para exposición al metal sin comprar oro físico, con liquidez y bajo coste. Suele usarse como cobertura ante inflación o volatilidad de mercados.",
    priceAlerts: [
      { label: "Avisar si sube a", target: "225$" }
    ]
  },
  h4: {
    icon: "🎮",
    priceUsd: 1128,
    quantity: 23.4,
    buyPrice: 902,
    investedEur: 21160,
    sparklinePoints: spark(1110, 60, 22, 4),
    timeRange: "1D",
    aiSummaryToday:
      "NVIDIA avanza con fuerza en línea con el sector de chips y IA. La demanda por GPUs para datacenters sigue impulsando resultados. Alguna toma de beneficios intraday no ha revertido la tendencia. Los inversores miran el próximo evento de producto.",
    aiAdvice: {
      action: "MANTENER",
      confidence: 82,
      reasoning:
        "Máximo exponente del tema IA; la posición tiene fuerte revalorización. Mantener es coherente con un horizonte de medio plazo si se asume la volatilidad. Reducir un pequeño porcentaje puede ser prudente para rebalancear; no hay urgencia en vender todo."
    },
    keyMetrics: {
      marketCap: "$2.78 T",
      volume24h: "$32.1 B",
      ath: "$1,150",
      rsi14: 62,
      ma50: "$1,050",
      ma200: "$892"
    },
    longDescription:
      "NVIDIA Corporation diseña GPUs y chips para gaming, datacenters, IA y automoción. Es líder en aceleradores para entrenamiento e inferencia de modelos de IA. Sus tarjetas gráficas (GeForce) y chips para datacenters (Hopper, Blackwell) dominan el mercado de IA. La valoración refleja expectativas muy altas de crecimiento.",
    priceAlerts: [
      { label: "Avisar si sube a", target: "1.200$" },
      { label: "Avisar si baja de", target: "1.050$" }
    ]
  },
  h5: {
    icon: "💶",
    priceUsd: 1.08,
    quantity: 13850,
    buyPrice: 1,
    investedEur: 13850,
    sparklinePoints: Array(60).fill(1.08),
    timeRange: "1D",
    aiSummaryToday:
      "El efectivo en euros no tiene variación diaria. Mantener liquidez permite aprovechar oportunidades de compra en correcciones o reforzar la renta fija si suben los tipos.",
    aiAdvice: {
      action: "MANTENER",
      confidence: 95,
      reasoning:
        "La reserva de liquidez es adecuada para tu perfil. No se recomienda invertir todo el efectivo de golpe; mantener una parte disponible reduce el estrés y permite actuar en momentos de volatilidad."
    },
    keyMetrics: {},
    longDescription:
      "Cash Reserve es la parte de tu cartera denominada en euros y disponible como liquidez. No genera rentabilidad por sí misma pero permite ejecutar operaciones sin desinvertir otros activos y actuar en oportunidades de mercado.",
    priceAlerts: []
  }
};

export function getAssetDetail(holding: HoldingItem): AssetDetail {
  const ext = detailsById[holding.id];
  if (!ext) {
    return {
      ...holding,
      icon: "📊",
      priceUsd: 0,
      quantity: 0,
      buyPrice: 0,
      investedEur: 0,
      sparklinePoints: [],
      timeRange: "1D",
      aiSummaryToday: "Sin resumen disponible.",
      aiAdvice: { action: "MANTENER", confidence: 50, reasoning: "Datos insuficientes." },
      keyMetrics: {},
      longDescription: "",
      priceAlerts: []
    };
  }
  return { ...holding, ...ext };
}

/** Noticias que mencionan el ticker del activo */
export function getRelatedNews(ticker: string): { id: string; title: string; source: string; timeAgo: string; summary: string }[] {
  const related = mockNews.filter((n) => n.tickers && n.tickers.includes(ticker));
  return related.slice(0, 5).map((n) => ({
    id: n.id,
    title: n.title,
    source: n.source,
    timeAgo: "Hoy",
    summary: n.shortSummary
  }));
}
