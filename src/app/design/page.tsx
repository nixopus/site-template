import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/blocks/app/empty-state";
import { SettingsForm } from "@/components/blocks/app/settings-form";
import { SignIn } from "@/components/blocks/app/sign-in";
import { StatRow } from "@/components/blocks/app/stat-row";
import { PrimitivesBoard } from "@/components/blocks/design/primitives-board";
import { Specimen } from "@/components/blocks/design/specimen";
import { SwatchGrid } from "@/components/blocks/design/swatch-grid";
import { TypeSpecimen } from "@/components/blocks/design/type-specimen";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Tokens, type roles, primitives, and blocks — the visual reference for authoring in this template.",
};

export default function DesignPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 border-x border-border px-6 py-16 md:px-12">
      <header className="pb-12">
        <p className="type-overline text-muted-foreground">Reference</p>
        <h1 className="type-display mt-4 text-[clamp(2rem,5vw+0.5rem,3.75rem)]">Design system</h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
          Everything on this page is styled through the semantic tokens in
          globals.css — the rules live in AGENTS.md, the brief in DESIGN.md.
          Change the tokens and every block follows.{" "}
          <Link href="/" className="text-foreground underline underline-offset-4 hover:text-signal">
            Back to the site
          </Link>
        </p>
      </header>
      <Specimen title="Tokens" note="hsl values in globals.css">
        <SwatchGrid />
      </Specimen>
      <Specimen title="Type" note="Archivo + IBM Plex Mono">
        <TypeSpecimen />
      </Specimen>
      <Specimen title="Primitives" note="components/ui">
        <PrimitivesBoard />
      </Specimen>
      <Specimen title="Stat row" note="blocks/app/stat-row">
        <div className="border border-border">
          <StatRow />
        </div>
      </Specimen>
      <Specimen title="Auth screen" note="blocks/app/sign-in">
        <div className="bg-muted px-6 py-12">
          <SignIn />
        </div>
      </Specimen>
      <Specimen title="Empty state" note="blocks/app/empty-state">
        <EmptyState />
      </Specimen>
      <Specimen title="Settings form" note="blocks/app/settings-form">
        <SettingsForm />
      </Specimen>
    </main>
  );
}
