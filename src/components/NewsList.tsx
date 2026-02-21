import { NewsCard } from "@/components/NewsCard";
import { RankedNewsItem, UserProfile } from "@/lib/types";

export function NewsList({ items, profile }: { items: RankedNewsItem[]; profile: UserProfile }) {
  if (items.length === 0) {
    return <div className="card text-sm text-slate-600">No hay noticias para mostrar.</div>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <NewsCard key={item.id} item={item} profile={profile} />
      ))}
    </div>
  );
}
