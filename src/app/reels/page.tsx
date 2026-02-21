"use client";

import { FinTokFeed } from "@/components/FinTokFeed";
import Link from "next/link";

const N26_MINT = "#27DBB1";
const N26_CHARCOAL = "#363533";

export default function ReelsPage() {
  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: "var(--surface-page)" }}
    >
      {/* Header compacto para dejar más espacio al feed */}
      <header className="flex shrink-0 items-center justify-between border-b px-4 py-2" style={{ borderColor: "var(--border-subtle)" }}>
        <Link
          href="/"
          className="text-sm font-medium transition opacity-90 hover:opacity-100"
          style={{ color: N26_CHARCOAL }}
        >
          ← Home
        </Link>
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: N26_MINT }}
        >
          FinTok Reels
        </span>
        <span className="w-14" aria-hidden />
      </header>

      {/* Zona del feed: pantalla mucho más grande, centrada */}
      <main className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-2">
        <FinTokFeed fullScreen />
      </main>
    </div>
  );
}
