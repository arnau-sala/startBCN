import { FrontendProfileState, FrontInterest, FrontRiskLevel } from "@/lib/mock/profile";
import { useEffect, useState } from "react";

const interests: FrontInterest[] = ["crypto", "stocks", "savings", "macro"];

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

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  if (!open) return null;

  return (
    <div className="absolute right-0 top-11 z-30 w-80 rounded-2xl border border-[var(--n26-border)] bg-white p-3.5 shadow-lg">
      <p className="text-sm font-semibold text-slate-900">{draft.name}</p>
      <p className="text-xs text-slate-500">Personalization</p>

      <label className="mt-4 block text-sm">
        <span className="mb-1 block text-slate-700">Risk level</span>
        <select
          value={draft.risk}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, risk: event.target.value as FrontRiskLevel }))
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--n26-teal)]"
        >
          <option value="conservative">Conservative</option>
          <option value="moderate">Moderate</option>
          <option value="aggressive">Aggressive</option>
        </select>
      </label>

      <div className="mt-4">
        <p className="mb-2 text-sm text-slate-700">Interests</p>
        <div className="flex flex-wrap gap-2">
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
                className={`rounded-full px-2.5 py-1 text-xs transition ${
                  active
                    ? "bg-[var(--n26-teal)] text-white"
                    : "bg-[var(--n26-chip-bg)] text-[var(--n26-chip-text)] hover:brightness-95"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onSave(draft);
            onClose();
          }}
          className="rounded-lg bg-[var(--n26-teal)] px-3 py-1.5 text-sm text-white hover:bg-[var(--n26-teal-dark)]"
        >
          Save
        </button>
      </div>
    </div>
  );
}
