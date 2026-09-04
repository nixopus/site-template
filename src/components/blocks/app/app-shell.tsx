import Link from "next/link";
import type { ReactNode } from "react";

const nav = [
  { label: "Shipments", href: "/app", active: true },
  { label: "Documents", href: "/app", active: false },
  { label: "Customs", href: "/app", active: false },
  { label: "Invoices", href: "/app", active: false },
  { label: "Settings", href: "/app", active: false },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full flex-col md:flex-row">
      <aside className="flex shrink-0 flex-col border-b border-sidebar-border bg-sidebar text-sidebar-foreground md:w-60 md:border-r md:border-b-0">
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-5">
          <Link href="/" className="type-overline text-sidebar-accent-foreground">
            Ballast<span className="text-sidebar-primary">*</span>
          </Link>
          <span className="type-overline text-sidebar-foreground/50">Console</span>
        </div>
        <nav aria-label="Console" className="flex flex-row gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-150 ease-manifest ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              }`}
            >
              <span
                aria-hidden
                className={`size-1.5 ${item.active ? "bg-sidebar-primary" : "bg-sidebar-border"}`}
              />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden border-t border-sidebar-border p-5 md:block">
          <p className="font-mono text-xs text-sidebar-foreground/70">june@atlasbicycle.co</p>
          <p className="type-overline mt-1 text-sidebar-foreground/40">Transpacific plan</p>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
