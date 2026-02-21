"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/for-you", label: "For You" },
  { href: "/alerts", label: "Alerts & Trends" },
  { href: "/explain", label: "Explain" },
  { href: "/settings", label: "Settings / Profile" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 px-4 py-6 md:px-6">
      <aside className="card h-fit w-full max-w-xs">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">N26 Demo</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">AI Curator</h1>
        <p className="mt-1 text-sm text-slate-600">Financial News in your tone.</p>

        <nav className="mt-6 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-3 py-2 text-sm transition ${
                  active
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <p className="mt-8 text-xs text-slate-500">
          Informacion educativa,
          <br />
          no asesoramiento financiero.
        </p>
      </aside>

      <main className="w-full">{children}</main>
    </div>
  );
}
