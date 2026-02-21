import { DashboardNewsItem } from "@/lib/mock/news";

const fallbackBullets = [
  "Esta noticia resume un cambio de mercado que puede afectar a varias categorias de activos.",
  "La clave es entender si el movimiento es puntual o parte de una tendencia mas larga.",
  "Mira el contexto (tipos, resultados o regulacion) antes de reaccionar."
];

const eli10ById: Record<string, string[]> = {
  g1: [
    "El banco central no ha cambiado las reglas del juego todavia.",
    "Cuando pasa eso, los mercados se mueven con mas prudencia.",
    "Para ti significa: espera menos sorpresas positivas a corto plazo."
  ],
  g2: [
    "Bitcoin subio muy rapido y ahora corrige, como cuando corres y luego frenas.",
    "Muchos traders cerraron posiciones para reducir riesgo.",
    "La volatilidad alta implica movimientos bruscos en poco tiempo."
  ],
  p1: [
    "Las empresas de chips venden 'palas' para la fiebre del oro de la IA.",
    "Si siguen vendiendo mucho, sus ingresos suben y el mercado se anima.",
    "Pero si expectativas son demasiado altas, una pequena decepcion pesa mucho."
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
      <div className="w-full max-w-md rounded-2xl border border-[var(--n26-border)] bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--n26-teal-dark)]">ELI10</p>
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
