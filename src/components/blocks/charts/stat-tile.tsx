import { formatValue } from "./scale";

type Props = {
  label: string;
  value: number | null;
  unit?: string;
  decimals?: number;
  /** Change against the comparison period, in the same unit. */
  delta?: number | null;
  deltaLabel?: string;
  /** Whether a rise is good (receipts) or bad (losses); decides the delta's tone. */
  higherIsBetter?: boolean;
  note?: string;
};

// A headline number: when the figure IS the answer, it is a tile, not a chart.
export function StatTile({ label, value, unit = "", decimals = 0, delta, deltaLabel, higherIsBetter = true, note }: Props) {
  const change = typeof delta === "number" ? delta : 0;
  const hasDelta = change !== 0;
  const good = (change > 0) === higherIsBetter;
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 font-heading text-2xl tabular-nums tracking-tight sm:text-3xl">{formatValue(value, decimals, unit)}</p>
      {hasDelta && (
        <p className={`mt-1 text-xs tabular-nums ${good ? "text-positive" : "text-destructive"}`}>
          <span aria-hidden>{change > 0 ? "▲" : "▼"}</span> {formatValue(Math.abs(change), decimals, unit)}
          <span className="sr-only">{change > 0 ? " up" : " down"}</span>
          {deltaLabel && <span className="text-muted-foreground"> {deltaLabel}</span>}
        </p>
      )}
      {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}
