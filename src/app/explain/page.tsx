"use client";

import { useEffect, useState } from "react";
import { ExplainBox } from "@/components/ExplainBox";
import { getStoredProfile } from "@/lib/clientProfile";
import { defaultProfile } from "@/lib/mock/profile";
import { UserProfile } from "@/lib/types";

export default function ExplainPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  return <ExplainBox profile={profile} />;
}
