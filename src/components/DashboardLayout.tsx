import { ReactNode } from "react";

export function DashboardLayout({
  header,
  left,
  right,
  scrollable = false
}: {
  header: ReactNode;
  left: ReactNode;
  right: ReactNode;
  scrollable?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${
        scrollable
          ? "lg:h-[calc(100vh-2rem)] lg:overflow-y-auto lg:pr-1"
          : "lg:h-[calc(100vh-2rem)] lg:overflow-hidden"
      }`}
    >
      <div>{header}</div>
      <div className="grid gap-3 lg:flex-1 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">{left}</div>
        <div className="space-y-3 lg:col-span-2">{right}</div>
      </div>
    </div>
  );
}
