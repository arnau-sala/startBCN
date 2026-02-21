export function Loading({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="card animate-pulse">
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}
