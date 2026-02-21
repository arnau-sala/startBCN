import { NextRequest, NextResponse } from "next/server";
import { getChatResponse } from "@/lib/aiEngine";
import type { FinancialNews } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message: string;
      userName?: string;
      assetsSummary?: string;
      news?: FinancialNews[];
    };

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "Missing or invalid message" }, { status: 400 });
    }

    const reply = await getChatResponse(body.message.trim(), {
      userName: body.userName,
      assetsSummary: body.assetsSummary,
      news: body.news
    });

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
