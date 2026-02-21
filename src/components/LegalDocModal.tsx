import { LegalDigestItem } from "@/lib/mock/legalDocs";

export function LegalDocModal({
  item,
  onClose
}: {
  item: LegalDigestItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-teal-700">Regulatory Guardian</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.dummyTitle}</h3>
            <p className="mt-1 text-xs text-slate-500">
              {item.source} · Deadline {item.deadline} · {item.pages} pages
            </p>
          </div>
          <button
            type="button"
            aria-label="Close legal summary modal"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Key points (ELI10)</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
            {item.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </div>

        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Action required</p>
          <p className="mt-1 text-sm text-amber-800">{item.requiredAction}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">Affected: {item.affectedAssets.join(", ")}</p>
          <a
            href={item.fullDocumentUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-teal-600 px-3 py-1.5 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
          >
            Open full document
          </a>
        </div>
      </div>
    </div>
  );
}
