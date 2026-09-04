const swatches = [
  { name: "background", className: "border border-border bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "primary", className: "bg-primary" },
  { name: "muted", className: "bg-muted" },
  { name: "muted-foreground", className: "bg-muted-foreground" },
  { name: "border", className: "bg-border" },
  { name: "signal", className: "bg-signal" },
  { name: "destructive", className: "bg-destructive" },
];

export function SwatchGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {swatches.map((swatch) => (
        <li key={swatch.name}>
          <div className={`h-16 ${swatch.className}`} />
          <p className="mt-2 font-mono text-xs text-muted-foreground">--{swatch.name}</p>
        </li>
      ))}
    </ul>
  );
}
