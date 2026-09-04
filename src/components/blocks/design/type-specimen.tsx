const rows = [
  { note: "Display / Archivo 800 wide / clamp 40–96", sample: "Manifest", className: "type-display text-[clamp(2.5rem,6.2vw+1rem,6rem)]" },
  { note: "H2 / Archivo 700 / 30–36", sample: "One timeline per box, gate to door.", className: "font-heading text-3xl font-bold tracking-tight md:text-4xl" },
  { note: "H3 / Archivo 700 / 20", sample: "A clock on every container.", className: "font-heading text-xl font-bold tracking-tight" },
  { note: "Body / Archivo 400 / 16 / 1.625", sample: "Carrier milestones, terminal feeds, and rail events reconciled into a single timeline.", className: "max-w-xl leading-relaxed" },
  { note: "Data / Plex Mono 400 / 14", sample: "MSKU 4839201 · QINGDAO → OAKLAND · ETA SEP 12", className: "font-mono text-sm" },
  { note: "Overline / Plex Mono 500 / 12 / +0.14em", sample: "01 / Tracking", className: "type-overline" },
];

export function TypeSpecimen() {
  return (
    <ul className="divide-y divide-border">
      {rows.map((row) => (
        <li key={row.note} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-8">
          <p className="font-mono text-xs text-muted-foreground">{row.note}</p>
          <p className={row.className}>{row.sample}</p>
        </li>
      ))}
    </ul>
  );
}
