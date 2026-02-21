import { DashboardNewsItem } from "@/lib/mock/news";

const fallbackBullets = [
<<<<<<< HEAD
  "This news summarizes a market shift that can affect multiple asset categories.",
  "The key is to understand whether this is a one-off move or part of a broader trend.",
  "Check the context (rates, earnings, or regulation) before reacting."
=======
  "This news summarises a market shift that may affect several asset categories.",
  "The key is understanding whether the move is short-lived or part of a longer trend.",
  "Look at context (rates, earnings or regulation) before reacting."
>>>>>>> aitor
];

const eli10ById: Record<string, string[]> = {
  g1: [
<<<<<<< HEAD
    "The central bank has not changed the rules yet.",
    "When that happens, markets usually move more cautiously.",
    "For you: expect fewer positive surprises in the short term."
  ],
  g2: [
    "Bitcoin rose very quickly and is now correcting, like sprinting and then braking.",
=======
    "The central bank hasn't changed the rules of the game yet.",
    "When that happens, markets move more cautiously.",
    "For you it means: expect fewer positive surprises in the short term."
  ],
  g2: [
    "Bitcoin rallied fast and is now pulling back — like sprinting and then braking.",
>>>>>>> aitor
    "Many traders closed positions to reduce risk.",
    "High volatility means sharp moves in a short time."
  ],
  p1: [
<<<<<<< HEAD
    "Chip companies sell the 'picks and shovels' for the AI gold rush.",
    "If demand keeps rising, revenue grows and markets stay optimistic.",
    "But when expectations are too high, even a small miss can hurt."
=======
    "Chip companies sell 'shovels' for the AI gold rush.",
    "If they keep selling a lot, revenues rise and the market gets excited.",
    "But if expectations are too high, a small disappointment weighs heavily."
>>>>>>> aitor
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
