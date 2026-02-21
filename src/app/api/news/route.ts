import { NextRequest, NextResponse } from "next/server";
import { defaultProfile, profilePresets } from "@/lib/mock/profile";
import { mockNews } from "@/lib/mock/news";
import { rankNewsForProfile } from "@/lib/rank";
import { UserProfile } from "@/lib/types";

function resolveProfile(request: NextRequest): UserProfile {
  const profileParam = request.nextUrl.searchParams.get("profile");
  if (!profileParam) return defaultProfile;
  const preset = profilePresets.find((item) => item.id === profileParam);
  return preset ?? defaultProfile;
}

export async function GET(request: NextRequest) {
  const profile = resolveProfile(request);
  const ranked = rankNewsForProfile(mockNews, profile);
  return NextResponse.json({ profile, news: ranked });
}
