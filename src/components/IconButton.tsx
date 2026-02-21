import { ReactNode } from "react";

type IconButtonVariant = "ghost" | "outline" | "accent";

const variantCls: Record<IconButtonVariant, string> = {
    ghost: "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]",
    outline: "border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]",
    accent: "border border-[var(--accent-border)] text-[var(--accent-dark)] hover:bg-[var(--accent-subtle)]"
};

interface IconButtonProps {
    icon: ReactNode;
    label?: string;
    variant?: IconButtonVariant;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    ariaLabel?: string;
}

/**
 * N26-style small icon button.
 * Usage:
 *   <IconButton icon="✕" ariaLabel="Close" onClick={onClose} />
 *   <IconButton icon="⚙" label="Settings" variant="outline" />
 */
export function IconButton({
    icon,
    label,
    variant = "ghost",
    onClick,
    type = "button",
    className = "",
    ariaLabel
}: IconButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition ${variantCls[variant]} ${className}`}
        >
            <span aria-hidden>{icon}</span>
            {label && <span>{label}</span>}
        </button>
    );
}
