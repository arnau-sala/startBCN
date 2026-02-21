"use client";

import { useState } from "react";
import { UserProfile } from "@/lib/types";

export function ExplainBox({ profile }: { profile: UserProfile }) {
  const [concept, setConcept] = useState("inflation");
  const [mode, setMode] = useState<"eli10" | "level">("eli10");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function requestExplanation(requestMode: "eli10" | "level") {
    try {
      setMode(requestMode);
      setLoading(true);
      setError(null);
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept, mode: requestMode, profile })
      });
      const data = (await response.json()) as { explanation?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Could not generate the explanation.");
      }
      setResult(data.explanation ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Explain</p>
      <h1 className="mt-1 text-2xl font-semibold text-slate-900">Understand concepts without jargon</h1>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <input
          value={concept}
          onChange={(event) => setConcept(event.target.value)}
          placeholder="E.g.: ETF, volatility, interest rate"
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
        <button
          className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          onClick={() => void requestExplanation("eli10")}
          type="button"
        >
          Explain like I&apos;m 10
        </button>
        <button
          className="rounded-xl bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          onClick={() => void requestExplanation("level")}
          type="button"
        >
          Explain for my level
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-500">Selected mode: {mode}</p>

      {loading && <p className="mt-3 text-sm text-slate-600">Generating explanation...</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {!loading && !error && result && (
        <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-800">
          {result}
        </pre>
      )}
    </section>
  );
}
