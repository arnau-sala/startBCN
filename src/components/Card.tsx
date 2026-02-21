import { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  /** Extra class names */
  className?: string;
  style?: CSSProperties;
  /**
   * flat   — no shadow, border only (for sub-cards inside another card)
   * noPad  — remove default padding (caller controls spacing)
   */
  variant?: "default" | "flat" | "noPad";
}

/**
 * N26-style surface card.
 * Uses semantic tokens from globals.css so colours stay in sync automatically.
 */
export function Card({ children, className = "", variant = "default", style }: CardProps) {
  const pad = variant === "noPad" ? "" : "p-5";
  const shadow = variant === "flat" ? "" : "shadow-[var(--shadow-card)]";

  return (
<<<<<<< HEAD
    <section className={`rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:shadow-md ${className}`}>
=======
    <section
      className={`rounded-[var(--radius-lg)] border bg-[var(--surface-raised)] ${pad} ${shadow} ${className}`}
      style={{ borderColor: "var(--border-subtle)", ...style }}
    >
>>>>>>> aitor
      {children}
    </section>
  );
}
