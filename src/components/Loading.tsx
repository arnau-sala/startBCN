export function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="card animate-pulse">
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}
