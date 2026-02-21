"use client";

import { defaultProfile } from "@/lib/mock/profile";
import { UserProfile } from "@/lib/types";

const STORAGE_KEY = "n26-curator-profile";

export function getStoredProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultProfile;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return defaultProfile;
  }
}

export function storeProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
