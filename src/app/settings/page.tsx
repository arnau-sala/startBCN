"use client";

import { useEffect, useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { getStoredProfile, storeProfile } from "@/lib/clientProfile";
import { defaultProfile } from "@/lib/mock/profile";
import { UserProfile } from "@/lib/types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const stored = getStoredProfile();
    setProfile({
      ...stored,
      username: stored.username ?? stored.name.toLowerCase().replace(/\s+/g, ".")
    });
  }, []);

  return (
    <div className="space-y-5">
      <ProfileForm
        initialProfile={profile}
        onProfileChange={(nextProfile) => {
          setProfile(nextProfile);
          storeProfile(nextProfile);
        }}
      />

      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900">Active profile preview</h2>
        <p className="mt-2 text-sm text-slate-700">Name: {profile.name}</p>
        <p className="text-sm text-slate-700">Username: @{profile.username ?? "no-username"}</p>
        <p className="text-sm text-slate-700">Risk: {profile.risk}</p>
        <p className="text-sm text-slate-700">Level: {profile.level}</p>
        <p className="text-sm text-slate-700">Interests: {profile.interests.join(", ")}</p>
        <p className="text-sm text-slate-700">Watchlist: {profile.watchlist.join(", ")}</p>
      </section>
    </div>
  );
}
