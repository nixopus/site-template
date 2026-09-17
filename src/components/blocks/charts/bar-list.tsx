import { formatValue } from "./scale";

type Item = { label: string; value: number; note?: string };

// A ranked breakdown (share by source, product, region): label, bar, value in one row.
export function BarList({ items, unit = "", decimals = 0 }: { items: Item[]; unit?: string; decimals?: number }) {
  if (items.length === 0) return <p className="py-6 text-sm text-muted-foreground">Nothing recorded for this period.</p>;
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const max = Math.max(...sorted.map((item) => Math.abs(item.value)), 1);
  const total = sorted.reduce((sum, item) => sum + item.value, 0);

  return (
    <ul className="space-y-3">
      {sorted.map((item) => (
        <li key={item.label} className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-3 text-sm" title={item.note}>
          <span className="truncate text-foreground">{item.label}</span>
          <span className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
            <span className="block h-full rounded-full bg-chart-1" style={{ width: `${(Math.abs(item.value) / max) * 100}%` }} />
          </span>
          <span className="text-right tabular-nums text-muted-foreground">
            {formatValue(item.value, decimals, unit)}
            {total > 0 && <span className="ml-2 text-xs">{((item.value / total) * 100).toFixed(1)}%</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
