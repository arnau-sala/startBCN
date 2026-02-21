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
User profile:
- Interests: ${body.profile.interests.join(", ")}
- Risk: ${body.profile.risk}
- Level: ${body.profile.level}
- Watchlist: ${body.profile.watchlist.join(", ")}

News:
- Title: ${news.title}
- Source: ${news.source}
- Tags: ${news.tags.join(", ")}
- Tickers: ${news.tickers.join(", ")}
- Base summary: ${news.shortSummary}
- Key numbers: ${(news.keyNumbers ?? []).join(" | ")}

Return it using the required sections in a short bullet format.
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
