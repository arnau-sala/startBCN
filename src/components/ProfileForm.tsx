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
  const [profile, setProfile] = useState<UserProfile>(initialProfile ?? defaultProfile);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
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
      setSavedMessage("Perfil guardado en memoria para esta sesion.");
      onProfileChange?.(profile);
    } else {
      setSavedMessage("No se pudo guardar el perfil.");
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
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Personalizacion real</h1>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Preset</label>
        <select
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          value={profile.id}
          onChange={(event) => {
            const preset = profilePresets.find((item) => item.id === event.target.value) ?? defaultProfile;
            setProfile(preset);
            onProfileChange?.(preset);
          }}
        >
          {profilePresets.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Intereses</p>
        <div className="flex flex-wrap gap-2">
          {allInterests.map((interest) => {
            const active = profile.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`rounded-full px-3 py-1 text-sm ${
                  active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
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
          <span className="mb-1 block font-medium text-slate-700">Riesgo</span>
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
          <span className="mb-1 block font-medium text-slate-700">Nivel</span>
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
        <span className="mb-1 block font-medium text-slate-700">Alertas</span>
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
        Guardar perfil
      </button>
      {savedMessage && <p className="text-sm text-slate-600">{savedMessage}</p>}
    </form>
  );
}
