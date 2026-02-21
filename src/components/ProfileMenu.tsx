import { FrontendProfileState, FrontInterest, FrontRiskLevel } from "@/lib/mock/profile";
import { useEffect, useState } from "react";

const interests: FrontInterest[] = ["crypto", "stocks", "savings", "macro"];
const riskOptions: FrontRiskLevel[] = ["conservative", "moderate", "aggressive"];

export function ProfileMenu({
  open,
  profile,
  onClose,
  onSave
}: {
  open: boolean;
  profile: FrontendProfileState;
  onClose: () => void;
  onSave: (profile: FrontendProfileState) => void;
}) {
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  useEffect(() => {
    if (!open) return;
    setIsVisible(false);
    const tick = window.setTimeout(() => setIsVisible(true), 10);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.clearTimeout(tick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const feedBullets = buildFeedBullets(draft.interests);
  const riskTone = getRiskTone(draft.risk);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className={`w-[min(680px,92vw)] max-h-[88vh] overflow-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-xl transition-all duration-200 md:p-6 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xl font-semibold text-slate-900">Personalization</p>
            <p className="mt-1 text-sm text-slate-500">
              Used to tailor your news, explanations, and daily brief.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">
              {getInitials(draft.name)}
            </span>
            <div className="min-w-0 text-right">
              <p className="text-sm font-semibold text-slate-900">{draft.name || "Your profile"}</p>
              <p className="text-xs text-slate-500">@{draft.username || "username"}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-slate-200" />

        <div className="mt-4 grid items-stretch gap-3 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
              <input
                value={draft.name}
                onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500"
                placeholder="Your name"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-sm font-medium text-slate-700">Username</span>
              <input
                value={draft.username}
                onChange={(event) =>
                  setDraft((prev) => ({
                    ...prev,
                    username: normalizeUsername(event.target.value)
                  }))
                }
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500"
                placeholder="username.n26"
              />
            </label>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Risk level</p>
              <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                {riskOptions.map((risk) => {
                  const active = draft.risk === risk;
                  return (
                    <button
                      key={risk}
                      type="button"
                      onClick={() => setDraft((prev) => ({ ...prev, risk }))}
                      className={`w-full rounded-lg px-1 py-1.5 text-center text-xs font-medium transition ${
                        active
                          ? "bg-teal-600 text-white shadow-sm"
                          : "bg-transparent text-slate-600 hover:bg-white hover:text-slate-900"
                      }`}
                    >
                      {risk[0].toUpperCase() + risk.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Interests</p>
              <div className="grid w-full grid-cols-4 gap-2">
                {interests.map((interest) => {
                  const active = draft.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          interests: active
                            ? prev.interests.filter((item) => item !== interest)
                            : [...prev.interests, interest]
                        }))
                      }
                      className={`h-8 w-full rounded-full border px-2 text-center text-xs font-medium transition ${
                        active
                          ? "border-teal-600 bg-teal-600 text-white"
                          : "border-slate-300 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex h-full w-full flex-col gap-3">
            <div className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-800">Your AI profile</p>
              <ul className="mt-2.5 flex h-[calc(100%-1.5rem)] flex-col justify-evenly text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckItemIcon />
                  <span>Personalized news feed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckItemIcon />
                  <span>Daily brief</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckItemIcon />
                  <span>Simplified explanations (ELI10)</span>
                </li>
              </ul>
            </div>

            <div className="w-full flex-1 rounded-xl border border-slate-200 bg-teal-50/40 p-3">
              <p className="text-sm font-semibold text-slate-800">How this affects your feed</p>
              <ul className="mt-2.5 flex h-[calc(100%-3.75rem)] flex-col justify-evenly text-xs text-slate-700">
                {feedBullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
              <span className="mt-2.5 inline-flex rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-700">
                {riskTone}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          {saved && (
            <p className="mr-auto text-xs font-medium text-emerald-600">
              Saved ✓
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave({
                ...draft,
                name: draft.name.trim() || "Pepe",
                username: normalizeUsername(draft.username) || "pepe.n26"
              });
              setSaved(true);
              window.setTimeout(() => setSaved(false), 1500);
            }}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function normalizeUsername(value: string) {
  const clean = value.trim().replace(/^@+/, "");
  return clean.toLowerCase().replace(/\s+/g, ".");
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "U"
  );
}

function buildFeedBullets(selectedInterests: FrontInterest[]) {
  const bullets: string[] = [];
  if (selectedInterests.includes("crypto")) bullets.push("Crypto volatility and regulation updates");
  if (selectedInterests.includes("stocks")) bullets.push("Earnings and major company moves");
  if (selectedInterests.includes("savings")) bullets.push("Savings rates and low-risk products");
  if (selectedInterests.includes("macro")) bullets.push("Central bank decisions and inflation");

  if (bullets.length === 0) {
    return ["Select interests to personalize your feed."];
  }

  return bullets.slice(0, 4);
}

function getRiskTone(risk: FrontRiskLevel) {
  if (risk === "conservative") return "Tone: cautious, risk-first";
  if (risk === "aggressive") return "Tone: opportunity + risk highlights";
  return "Tone: balanced, context-first";
}

function CheckItemIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 10.5L8.2 13.5L15 6.5"
        stroke="#0f766e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
