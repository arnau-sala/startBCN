import { ReactNode } from "react";

interface ListRowProps {
    icon?: ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    trailing?: ReactNode;
    onClick?: () => void;
    /** Render as an inset sunken row (default: true) */
    inset?: boolean;
    className?: string;
}

/**
 * N26-style list row: icon · title / subtitle · trailing value
 * Usage:
 *   <ListRow icon="📈" title="BTC" subtitle="Bitcoin" trailing="+3.1%" />
 */
export function ListRow({
    icon,
    title,
    subtitle,
    trailing,
    onClick,
    inset = true,
    className = ""
}: ListRowProps) {
    const base = `flex items-center gap-3 ${inset ? "row-inset" : ""} ${className}`;

    const inner = (
        <>
            {icon && (
                <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg"
                    style={{ background: "var(--accent-subtle)" }}
                    aria-hidden
                >
                    {icon}
                </span>
            )}
            <div className="min-w-0 flex-1">
                <p
                    className="truncate text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                >
                    {title}
                </p>
                {subtitle && (
                    <p className="mt-0.5 truncate text-xs" style={{ color: "var(--text-tertiary)" }}>
                        {subtitle}
                    </p>
                )}
            </div>
            {trailing && (
                <span className="shrink-0 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {trailing}
                </span>
            )}
        </>
    );

    if (onClick) {
        return (
            <button type="button" onClick={onClick} className={`w-full text-left ${base}`}>
                {inner}
            </button>
        );
    }
    return <div className={base}>{inner}</div>;
}
