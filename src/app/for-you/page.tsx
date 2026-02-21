"use client";

import { useEffect, useMemo, useState } from "react";
import { DailyTipCard } from "@/components/DailyTipCard";
import { NewsList } from "@/components/NewsList";
import { getStoredProfile } from "@/lib/clientProfile";
import { defaultProfile } from "@/lib/mock/profile";
import { mockNews } from "@/lib/mock/news";
import { rankNewsForProfile } from "@/lib/rank";
import { detectTrendingTopics } from "@/lib/trends";
import { UserProfile } from "@/lib/types";

export default function ForYouPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const rankedNews = useMemo(() => rankNewsForProfile(mockNews, profile), [profile]);
  const trending = useMemo(() => detectTrendingTopics(rankedNews, 5), [rankedNews]);

  return (
    <div className="space-y-5">
      <header className="card">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">For You</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Feed personalizado</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ordenado por relevancia segun tus intereses ({profile.interests.join(", ")}), watchlist (
          {profile.watchlist.join(", ")}) y nivel ({profile.level}).
        </p>
      </header>

      <DailyTipCard profile={profile} trendingTopics={trending.map((item) => item.tag)} />
      <NewsList items={rankedNews} profile={profile} />
    </div>
  );
}
