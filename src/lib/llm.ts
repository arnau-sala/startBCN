interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatCompletionInput {
  system: string;
  messages: ChatMessage[];
  temperature?: number;
}

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

/** Llama a la API de Gemini (generateContent). Sistema inlined en el primer mensaje para máxima compatibilidad. */
async function geminiCompletion({
  system,
  messages,
  temperature = 0.4
}: ChatCompletionInput): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.LLM_MODEL?.trim() || "gemini-2.5-flash";

  if (!apiKey) {
    throw new Error("LLM not configured");
  }

  const lastUserContent = messages.filter((m) => m.role === "user").pop()?.content ?? "";
  const url = `${GEMINI_BASE}/models/${model}:generateContent?key=${apiKey}`;

  const userText = system ? `${system}\n\n---\n\n${lastUserContent}` : lastUserContent;

  const body = {
    contents: [{ role: "user", parts: [{ text: userText }] }],
    generationConfig: {
      temperature,
      maxOutputTokens: 8192
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const raw = await response.text();
  if (!response.ok) {
    throw new Error(`Gemini API error ${response.status}: ${raw.slice(0, 500)}`);
  }

  let data: { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> }; finishReason?: string }> };
  try {
    data = JSON.parse(raw) as typeof data;
  } catch {
    throw new Error(`Gemini invalid JSON: ${raw.slice(0, 200)}`);
  }

  const candidate = data?.candidates?.[0];
  if (!candidate?.content?.parts?.length) {
    const reason = candidate?.finishReason ?? "unknown";
    throw new Error(`Gemini no content (finishReason: ${reason})`);
  }
  const text = candidate.content.parts[0].text;
  if (!text) {
    throw new Error("LLM response without content");
  }
  return text.trim();
}

/** Llama a la API compatible con OpenAI (chat/completions). */
async function openAICompletion({
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

  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("LLM response without content");
  }
  return content as string;
}

/**
 * Envía una conversación al LLM y devuelve la respuesta en texto.
 * Usa Gemini si está definido GEMINI_API_KEY; si no, usa OpenAI (LLM_API_KEY).
 */
export async function chatCompletion(input: ChatCompletionInput): Promise<string> {
  if (process.env.GEMINI_API_KEY?.trim()) {
    return geminiCompletion(input);
  }
  if (process.env.LLM_API_KEY?.trim()) {
    return openAICompletion(input);
  }
  throw new Error("LLM not configured");
}
