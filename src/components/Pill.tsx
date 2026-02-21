type PillVariant = "accent" | "positive" | "negative" | "neutral";

const variantStyles: Record<PillVariant, string> = {
    accent: "bg-[var(--accent-subtle)]   text-[var(--accent-dark)]",
    positive: "bg-[var(--positive-bg)]     text-[var(--positive)]",
    negative: "bg-[var(--negative-bg)]     text-[var(--negative)]",
    neutral: "bg-[var(--surface-sunken)]  text-[var(--text-secondary)]"
};

interface PillProps {
    label: string;
    variant?: PillVariant;
    className?: string;
}

/**
 * N26-style Pill / Tag.
 * Usage:
 *   <Pill label="#crypto" />
 *   <Pill label="+3.1%" variant="positive" />
 */
export function Pill({ label, variant = "accent", className = "" }: PillProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${variantStyles[variant]} ${className}`}
        >
            {label}
        </span>
    );
}
