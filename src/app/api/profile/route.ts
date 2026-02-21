import { NextRequest, NextResponse } from "next/server";
import { defaultProfile } from "@/lib/mock/profile";
import { UserProfile } from "@/lib/types";

let inMemoryProfile: UserProfile = defaultProfile;

export async function GET() {
  return NextResponse.json({ profile: inMemoryProfile });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { profile?: UserProfile };
  if (!body.profile) {
    return NextResponse.json({ error: "Missing profile" }, { status: 400 });
  }
  inMemoryProfile = body.profile;
  return NextResponse.json({ profile: inMemoryProfile });
}
