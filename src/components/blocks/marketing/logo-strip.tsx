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
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
      <p className="type-overline shrink-0 text-muted-foreground">
        Kept moving by
      </p>
      <ul className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
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
