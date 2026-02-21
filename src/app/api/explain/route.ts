import { NextRequest, NextResponse } from "next/server";
import { chatCompletion } from "@/lib/llm";
import { EXPLAIN_PROMPT } from "@/lib/prompts";
import { UserProfile } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      concept?: string;
      mode?: "eli10" | "level";
      profile?: UserProfile;
    };

    if (!body.concept || !body.mode || !body.profile) {
      return NextResponse.json({ error: "Missing concept, mode or profile" }, { status: 400 });
    }

    const explanation = await chatCompletion({
      system: EXPLAIN_PROMPT,
      messages: [
        {
          role: "user",
          content: `
Concept: ${body.concept}
Mode: ${body.mode}
User level: ${body.profile.level}
Interests: ${body.profile.interests.join(", ")}

Reminder format:
- In one sentence
- Simple example
- What to watch
- Common mistakes
          `.trim()
        }
      ]
    });

    return NextResponse.json({ explanation });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: message.includes("LLM not configured") ? "LLM not configured" : message },
      { status: 500 }
    );
  }
}
