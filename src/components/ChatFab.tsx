export function ChatFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Open assistant chat"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-teal-600 p-3.5 text-lg text-white shadow-md transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
    >
      💬
    </button>
  );
}
