interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatCompletionInput {
  system: string;
  messages: ChatMessage[];
  temperature?: number;
}

export async function chatCompletion({
  system,
  messages,
  temperature = 0.4
}: ChatCompletionInput): Promise<string> {
  const baseUrl = process.env.LLM_BASE_URL ?? "https://api.openai.com/v1";
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL ?? "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("LLM not configured");
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature,
      messages: [{ role: "system", content: system }, ...messages]
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`LLM request failed: ${response.status} ${details}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("LLM response without content");
  }
  return content as string;
}
