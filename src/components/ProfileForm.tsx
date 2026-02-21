"use client";

import { FormEvent, useEffect, useState } from "react";
import { defaultProfile, profilePresets } from "@/lib/mock/profile";
import { Interest, KnowledgeLevel, RiskLevel, UserProfile } from "@/lib/types";

const allInterests: Interest[] = ["crypto", "stocks", "savings", "macro"];

export function ProfileForm({
  initialProfile,
  onProfileChange
}: {
  initialProfile?: UserProfile;
  onProfileChange?: (profile: UserProfile) => void;
}) {
  const [profile, setProfile] = useState<UserProfile>(ensureProfileDefaults(initialProfile ?? defaultProfile));
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    if (initialProfile) {
      setProfile(ensureProfileDefaults(initialProfile));
    }
  }, [initialProfile]);

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile })
    });
    if (response.ok) {
      setSavedMessage("Profile saved in memory for this session.");
      onProfileChange?.(profile);
    } else {
      setSavedMessage("Profile could not be saved.");
    }
  }

  function toggleInterest(value: Interest) {
    setProfile((prev) => {
      const next = prev.interests.includes(value)
        ? prev.interests.filter((item) => item !== value)
        : [...prev.interests, value];
      return { ...prev, interests: next };
    });
  }

  return (
    <form className="card space-y-4" onSubmit={saveProfile}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Profile</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Personalization</h1>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Preset</label>
        <select
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          value={profile.id}
          onChange={(event) => {
            const preset = profilePresets.find((item) => item.id === event.target.value) ?? defaultProfile;
            const normalizedPreset = ensureProfileDefaults(preset);
            setProfile(normalizedPreset);
            onProfileChange?.(normalizedPreset);
          }}
        >
          {profilePresets.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <h2 className="text-sm font-semibold text-slate-900">Personal details</h2>
        <p className="mt-1 text-xs text-slate-500">
          You can change how you appear in the app at any time.
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-slate-700">Name</span>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              value={profile.name}
              onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="e.g. Arnau"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-slate-700">Username</span>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              value={profile.username ?? ""}
              onChange={(event) =>
                setProfile((prev) => ({
                  ...prev,
                  username: normalizeUsername(event.target.value)
                }))
              }
              placeholder="e.g. arnau.sala"
            />
          </label>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Interests</p>
        <div className="flex flex-wrap gap-2">
          {allInterests.map((interest) => {
            const active = profile.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`rounded-full px-3 py-1 text-sm ${active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Risk</span>
          <select
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
            value={profile.risk}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, risk: event.target.value as RiskLevel }))
            }
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Level</span>
          <select
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
            value={profile.level}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, level: event.target.value as KnowledgeLevel }))
            }
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Watchlist tickers</span>
        <input
          className="w-full rounded-xl border border-slate-300 px-3 py-2"
          value={profile.watchlist.join(", ")}
          onChange={(event) =>
            setProfile((prev) => ({
              ...prev,
              watchlist: event.target.value
                .split(",")
                .map((item) => item.trim().toUpperCase())
                .filter(Boolean)
            }))
          }
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Alerts</span>
        <input
          className="w-full rounded-xl border border-slate-300 px-3 py-2"
          value={profile.alerts.join(", ")}
          onChange={(event) =>
            setProfile((prev) => ({
              ...prev,
              alerts: event.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            }))
          }
        />
      </label>

      <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
        Save profile
      </button>
      {savedMessage && <p className="text-sm text-slate-600">{savedMessage}</p>}
    </form>
  );
}

function normalizeUsername(value: string) {
  const clean = value.trim().replace(/^@+/, "");
  return clean.toLowerCase().replace(/\s+/g, ".");
}

function ensureProfileDefaults(profile: UserProfile): UserProfile {
  return {
    ...profile,
    username: profile.username ?? normalizeUsername(profile.name)
  };
}
