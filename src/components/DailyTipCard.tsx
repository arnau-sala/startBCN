"use client";

import { useEffect, useState } from "react";
import { UserProfile } from "@/lib/types";

interface TipResponse {
  tip: string;
  fromFallback?: boolean;
}

export function DailyTipCard({
  profile,
  trendingTopics
}: {
  profile: UserProfile;
  trendingTopics: string[];
}) {
  const [tip, setTip] = useState<string>("Generating personalized tip...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTip() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile, trendingTopics })
        });
        const data = (await response.json()) as TipResponse;
        setTip(data.tip);
      } catch {
        setTip(
<<<<<<< HEAD
          "Fallback tip: review two high-relevance stories and note one key question before making decisions."
=======
          "Tip: review 2 high-relevance news items and note one key question before making decisions."
>>>>>>> aitor
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadTip();
  }, [profile, trendingTopics]);

  return (
    <section className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Daily tip</p>
<<<<<<< HEAD
      <h2 className="mt-1 text-lg font-semibold text-slate-900">Your daily tip</h2>
=======
      <h2 className="mt-1 text-lg font-semibold text-slate-900">Today's tip for you</h2>
>>>>>>> aitor
      <p className="mt-3 whitespace-pre-line text-sm text-slate-700">
        {isLoading ? "Loading..." : tip}
      </p>
    </section>
  );
}
