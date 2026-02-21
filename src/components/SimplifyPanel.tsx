"use client";

import { useState } from "react";
import { NewsItem, UserProfile } from "@/lib/types";

export function SimplifyPanel({ news, profile }: { news: NewsItem; profile: UserProfile }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function simplify() {
    try {
      setLoading(true);
      setError(null);
      setOpen(true);

      const response = await fetch("/api/news/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsId: news.id, profile })
      });
      const data = (await response.json()) as { simplified?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo simplificar la noticia");
      }

      setContent(data.simplified ?? "No hubo respuesta.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void simplify()}
        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Simplify
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50/80 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-indigo-900">Simplified summary</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-indigo-700 hover:text-indigo-900"
            >
              Close
            </button>
          </div>

          {loading && <p className="mt-2 text-sm text-slate-600">Pensando...</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {!loading && !error && (
            <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">{content}</pre>
          )}
        </div>
      )}
    </div>
  );
}
