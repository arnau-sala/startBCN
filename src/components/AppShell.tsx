import { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] px-3 py-3 md:px-4 md:py-4 lg:h-screen lg:overflow-hidden">
      <main>{children}</main>
    </div>
  );
}
