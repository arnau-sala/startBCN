import { ReactNode } from "react";

export function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-[var(--n26-border)] bg-white p-3.5 shadow-sm transition hover:shadow-md ${className}`}>
      {children}
    </section>
  );
}
