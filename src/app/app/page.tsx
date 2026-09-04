import type { Metadata } from "next";
import { AppShell } from "@/components/blocks/app/app-shell";
import { ShipmentsTable } from "@/components/blocks/app/shipments-table";
import { StatRow } from "@/components/blocks/app/stat-row";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Shipments",
  description: "Live board of every container Ballast is tracking.",
};

export default function AppPage() {
  return (
    <AppShell>
      <header className="flex h-14 items-center justify-between border-b border-border px-6">
        <div className="flex items-baseline gap-3">
          <h1 className="font-heading text-lg font-bold tracking-tight">Shipments</h1>
          <p className="type-overline hidden text-muted-foreground sm:block">
            Board as of 06:00 PT
          </p>
        </div>
        <Button size="sm">New booking</Button>
      </header>
      <main className="flex-1">
        <StatRow />
        <ShipmentsTable />
        <p className="border-t border-border px-6 py-4 font-mono text-xs text-muted-foreground">
          7 shipments · 2 need attention · next arrival Sep 08, Seattle
        </p>
      </main>
    </AppShell>
  );
}
