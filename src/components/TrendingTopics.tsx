export function TrendingTopics({ topics }: { topics: Array<{ tag: string; hits: number }> }) {
  return (
    <section className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Trends</p>
      <h2 className="mt-1 text-lg font-semibold text-slate-900">Trending topics</h2>
      <div className="mt-4 space-y-2">
        {topics.map((topic) => (
          <div
            key={topic.tag}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <span className="text-sm font-medium text-slate-700">#{topic.tag}</span>
            <span className="text-xs text-slate-500">{topic.hits} menciones</span>
          </div>
        ))}
      </div>
    </section>
  );
}
