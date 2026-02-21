import { ReactNode } from "react";

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    action?: ReactNode;
    onAction?: () => void;
    actionLabel?: string;
}

/**
 * N26-style section header.
 * Usage:
 *   <SectionHeader title="Global News" actionLabel="See all" onAction={() => {}} />
 */
export function SectionHeader({
    eyebrow,
    title,
    action,
    onAction,
    actionLabel = "See all"
}: SectionHeaderProps) {
    return (
        <div className="mb-4 flex items-end justify-between gap-3">
            <div>
                {eyebrow && <p className="eyebrow mb-0.5">{eyebrow}</p>}
                <h2 className="text-[17px] font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                    {title}
                </h2>
            </div>
            {action ?? (onAction ? (
                <button
                    type="button"
                    onClick={onAction}
                    className="n26-link shrink-0 text-xs"
                >
                    {actionLabel}
                </button>
            ) : null)}
        </div>
    );
}
