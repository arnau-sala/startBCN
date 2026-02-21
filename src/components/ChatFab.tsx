export function ChatFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Open assistant chat"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[var(--n26-teal)] p-3.5 text-lg text-white shadow-md transition hover:bg-[var(--n26-teal-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--n26-teal)]"
    >
      💬
    </button>
  );
}
