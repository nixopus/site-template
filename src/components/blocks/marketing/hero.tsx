import Link from "next/link";
import { Button } from "@/components/ui/button";

const proof = [
  { label: "Importers on board", value: "512" },
  { label: "Containers tracked", value: "14,208" },
  { label: "Demurrage avoided", value: "$1.9M" },
];

export function Hero() {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 pb-10 md:pb-14">
        <p className="type-overline text-muted-foreground">Freight operations</p>
        <p className="type-overline hidden text-muted-foreground sm:block">
          Manifest no. 0001
        </p>
      </div>
      <h1 className="type-display text-[clamp(2.5rem,6.2vw+1rem,6rem)]">
        Every container,{" "}
        <span className="underline decoration-signal decoration-[0.045em] underline-offset-[0.12em] sm:whitespace-nowrap">
          accounted for.
        </span>
      </h1>
      <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Ballast tracks every shipment from factory floor to warehouse door.
          Bookings, documents, customs, and the demurrage clock live in one
          ledger your whole team can read.
        </p>
        <div className="flex shrink-0 items-center gap-6">
          <Button asChild size="lg" className="px-6">
            <Link href="/app">Start tracking</Link>
          </Button>
          <Link
            href="/app"
            className="type-overline text-foreground transition-colors duration-150 ease-manifest hover:text-signal"
          >
            See a live shipment →
          </Link>
        </div>
      </div>
      <dl className="mt-14 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mt-20">
        {proof.map((item) => (
          <div key={item.label} className="py-5 sm:first:pl-0 sm:not-first:pl-8">
            <dt className="type-overline text-muted-foreground">{item.label}</dt>
            <dd className="mt-2 font-mono text-2xl text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
