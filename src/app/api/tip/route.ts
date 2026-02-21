import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/llm";
import { TIP_PROMPT } from "@/lib/prompts";
import { UserProfile } from "@/lib/types";

const fallbackTip =
  "Mini-habito: antes de reaccionar a una noticia, compara 2 fuentes y anota si el dato clave cambia. Accion educativa: crea tu checklist de 3 preguntas para entender contexto.\nInformacion educativa, no asesoramiento financiero.";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      profile?: UserProfile;
      trendingTopics?: string[];
    };

    if (!body.profile) {
      return NextResponse.json({ error: "Missing profile" }, { status: 400 });
    }

    const tip = await chatCompletion({
      system: TIP_PROMPT,
      temperature: 0.5,
      messages: [
        {
          role: "user",
          content: `
Perfil:
- Intereses: ${body.profile.interests.join(", ")}
- Riesgo: ${body.profile.risk}
- Nivel: ${body.profile.level}
- Watchlist: ${body.profile.watchlist.join(", ")}
Trending topics: ${(body.trendingTopics ?? []).join(", ")}
          `.trim()
        }
      ]
    });

    return NextResponse.json({ tip });
  } catch {
    return NextResponse.json({ tip: fallbackTip, fromFallback: true });
  }
}
