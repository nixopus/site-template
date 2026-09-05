import { Marquee } from "@/components/blocks/artifacts/marquee";

const importers = [
  "Copperline Coffee",
  "Atlas Bicycle Co.",
  "Fernway Goods",
  "Harbor & Hide",
  "Mercantile Paper",
  "Bright + Loom",
];

/* The proof strip as a workload marquee: names keep moving the way cargo does.
   Pauses on hover; static under reduced motion. */
export function LogoStrip() {
  return (
    <div>
      <p className="type-overline text-muted-foreground">Kept moving by</p>
      <Marquee className="mt-6" duration={32}>
        {importers.map((name) => (
          <span key={name} className="flex items-center gap-12">
            <span className="font-heading text-lg font-bold tracking-tight whitespace-nowrap text-muted-foreground">
              {name}
            </span>
            <span aria-hidden className="reg-tick" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
