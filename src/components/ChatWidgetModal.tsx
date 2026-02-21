import { useEffect, useRef } from "react";

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

export function ChatWidgetModal({
  open,
  expanded,
  messages,
  inputValue,
  onChangeInput,
  onSend,
  onClose,
  onToggleExpand,
  onQuickPrompt
}: {
  open: boolean;
  expanded: boolean;
  messages: ChatMessage[];
  inputValue: string;
  onChangeInput: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
  onToggleExpand: () => void;
  onQuickPrompt: (value: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  if (!open) return null;

  return (
    <div
      className={`fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition ${
        expanded ? "h-[80vh] w-[min(900px,92vw)]" : "h-[500px] w-[min(400px,92vw)]"
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="font-semibold text-slate-900">Assistant</h3>
        <div className="flex gap-2">
            <button type="button" aria-label="Expand chat widget" onClick={onToggleExpand} className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100">
            {expanded ? "Shrink" : "Expand"}
          </button>
          <button type="button" aria-label="Close chat widget" onClick={onClose} className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100">
            Close
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line ${
                message.role === "user" ? "bg-[var(--n26-teal)] text-white" : "bg-white text-slate-700"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {["Explain my portfolio", "What happened today?", "What is diversification?"].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onQuickPrompt(prompt)}
              className="rounded-full bg-[var(--n26-chip-bg)] px-2.5 py-1 text-xs text-[var(--n26-chip-text)] hover:brightness-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            aria-label="Chat message input"
            value={inputValue}
            onChange={(event) => onChangeInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSend();
            }}
            placeholder="Ask me about your portfolio..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--n26-teal)]"
          />
          <button type="button" aria-label="Send chat message" onClick={onSend} className="rounded-lg bg-[var(--n26-teal)] px-3 py-2 text-sm text-white hover:bg-[var(--n26-teal-dark)]">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
