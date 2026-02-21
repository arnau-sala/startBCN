import { DashboardNewsItem } from "@/lib/mock/news";

const fallbackBullets = [
  "This news summarizes a market shift that can affect multiple asset categories.",
  "The key is to understand whether this is a one-off move or part of a broader trend.",
  "Check the context (rates, earnings, or regulation) before reacting."
];

const eli10ById: Record<string, string[]> = {
  g1: [
    "The central bank has not changed the rules yet.",
    "When that happens, markets usually move more cautiously.",
    "For you: expect fewer positive surprises in the short term."
  ],
  g2: [
    "Bitcoin rose very quickly and is now correcting, like sprinting and then braking.",
    "Many traders closed positions to reduce risk.",
    "High volatility means sharp moves in a short time."
  ],
  p1: [
    "Chip companies sell the 'picks and shovels' for the AI gold rush.",
    "If demand keeps rising, revenue grows and markets stay optimistic.",
    "But when expectations are too high, even a small miss can hurt."
  ]
};

export function ExplainModal({
  item,
  onClose
}: {
  item: DashboardNewsItem | null;
  onClose: () => void;
}) {
  if (!item) return null;
  const bullets = eli10ById[item.id] ?? fallbackBullets;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">ELI10</p>
          <button
            type="button"
            aria-label="Close ELI10 modal"
            onClick={onClose}
            className="rounded-md px-1.5 py-0.5 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <h4 className="mt-1 clamp-2 text-sm font-semibold text-slate-900">{item.title}</h4>
        <ul className="mt-3 list-disc space-y-1 pl-4 text-xs leading-5 text-slate-700">
          {bullets.slice(0, 4).map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
