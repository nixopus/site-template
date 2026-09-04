const importers = [
  "Copperline Coffee",
  "Atlas Bicycle Co.",
  "Fernway Goods",
  "Harbor & Hide",
  "Mercantile Paper",
  "Bright + Loom",
];

export function LogoStrip() {
  return (
    <div>
      <p className="type-overline text-muted-foreground">Kept moving by</p>
      <ul className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-4 md:justify-between">
        {importers.map((name) => (
          <li
            key={name}
            className="font-heading text-lg font-bold tracking-tight text-muted-foreground"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
