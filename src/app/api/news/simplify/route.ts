import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/llm";
import { mockNews } from "@/lib/mock/news";
import { CURATOR_PROMPT } from "@/lib/prompts";
import { UserProfile } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { newsId?: string; profile?: UserProfile };
    const news = mockNews.find((item) => item.id === body.newsId);

    if (!news || !body.profile) {
      return NextResponse.json({ error: "Missing newsId or profile" }, { status: 400 });
    }

    const simplified = await chatCompletion({
      system: CURATOR_PROMPT,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: `
Perfil usuario:
- Intereses: ${body.profile.interests.join(", ")}
- Riesgo: ${body.profile.risk}
- Nivel: ${body.profile.level}
- Watchlist: ${body.profile.watchlist.join(", ")}

Noticia:
- Titulo: ${news.title}
- Fuente: ${news.source}
- Tags: ${news.tags.join(", ")}
- Tickers: ${news.tickers.join(", ")}
- Resumen base: ${news.shortSummary}
- Numeros clave: ${(news.keyNumbers ?? []).join(" | ")}

Devuelvelo con las secciones exigidas en formato corto y bullets.
          `.trim()
        }
      ]
    });

    return NextResponse.json({ simplified });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("LLM not configured") ? 500 : 500;
    return NextResponse.json({ error: message.includes("LLM not configured") ? "LLM not configured" : message }, { status });
  }
}
