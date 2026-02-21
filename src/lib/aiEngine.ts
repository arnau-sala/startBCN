/**
 * AIEngine — Motor de IA (ELI10 y chat). Usa FinancialNews de @/lib/constants.
 */

import { chatCompletion } from "@/lib/llm";
import { CHATBOT_SYSTEM_PROMPT, ELI10_SYSTEM_PROMPT } from "@/lib/prompts";
import type { FinancialNews } from "@/lib/constants";

export async function translateToELI10(news: FinancialNews): Promise<FinancialNews> {
  const hasLLM = !!process.env.GEMINI_API_KEY?.trim() || !!process.env.LLM_API_KEY?.trim();
  if (!hasLLM) {
    return {
      ...news,
      eli10_content: `[ELI10 not available without GEMINI_API_KEY or LLM_API_KEY] Summary: ${news.title}. ${news.technical_content.slice(0, 120)}...`
    };
  }

  try {
    const eli10_content = await chatCompletion({
      system: ELI10_SYSTEM_PROMPT,
      temperature: 0.4,
      messages: [
        {
          role: "user",
          content: `News (title): ${news.title}\n\nTechnical content:\n${news.technical_content}\n\nCategory: ${news.category}. Generate the ELI10 version following the structure indicated.`
        }
      ]
    });

    return { ...news, eli10_content: eli10_content.trim() };
  } catch (err) {
    const fallback =
      `In one sentence: ${news.title}. In simple terms: this news affects markets or your financial context. Check the original source for more detail. Educational information, not financial advice.`;
    return { ...news, eli10_content: fallback };
  }
}

export interface ChatContext {
  news?: FinancialNews[];
  userName?: string;
  assetsSummary?: string;
}

export async function getChatResponse(
  userMessage: string,
  context?: ChatContext
): Promise<string> {
  const hasLLM = !!process.env.GEMINI_API_KEY?.trim() || !!process.env.LLM_API_KEY?.trim();
  if (!hasLLM) {
    return "The assistant is not connected right now. You can check the news and daily tip in the meantime. Love your bank!";
  }

  const contextBlock = context
    ? [
        context.userName ? `User: ${context.userName}.` : "",
        context.assetsSummary ? `Portfolio summary: ${context.assetsSummary}.` : "",
        context.news?.length
          ? `Recent news context (use to enrich the answer):\n${context.news
              .slice(0, 5)
              .map((n) => `- ${n.title}: ${n.eli10_content ?? n.technical_content.slice(0, 150)}...`)
              .join("\n")}`
          : ""
      ]
          .filter(Boolean)
          .join("\n")
    : "";

  try {
    const userContent = contextBlock
      ? `[Context for this conversation]\n${contextBlock}\n\n---\nUser question: ${userMessage}`
      : userMessage;

    const reply = await chatCompletion({
      system: CHATBOT_SYSTEM_PROMPT,
      temperature: 0.5,
      messages: [{ role: "user", content: userContent }]
    });
    return reply.trim();
  } catch (err) {
    throw err;
  }
}
