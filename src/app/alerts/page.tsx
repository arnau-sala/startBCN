"use client";

import { useEffect, useState } from "react";
import { AlertsPanel } from "@/components/AlertsPanel";
import { TrendingTopics } from "@/components/TrendingTopics";
import { getStoredProfile } from "@/lib/clientProfile";
import { defaultProfile } from "@/lib/mock/profile";
import { mockNews } from "@/lib/mock/news";
import { rankNewsForProfile } from "@/lib/rank";
import { detectTrendingTopics, getAlertMatches } from "@/lib/trends";
import { UserProfile } from "@/lib/types";

export default function AlertsPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const rankedNews = rankNewsForProfile(mockNews, profile);
  const trending = detectTrendingTopics(rankedNews, 8);
  const matches = getAlertMatches(rankedNews, profile.alerts);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <TrendingTopics topics={trending} />
      <AlertsPanel matches={matches} alerts={profile.alerts} />
    </div>
  );
}
