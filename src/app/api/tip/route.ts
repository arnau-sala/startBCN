import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/llm";
import { TIP_PROMPT } from "@/lib/prompts";
import { UserProfile } from "@/lib/types";

const fallbackTip =
  "Micro habit: before reacting to a headline, compare two sources and note whether the key metric changes. Educational action: create a 3-question checklist to understand context.\nEducational information, not financial advice.";

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
Profile:
- Interests: ${body.profile.interests.join(", ")}
- Risk: ${body.profile.risk}
- Level: ${body.profile.level}
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
