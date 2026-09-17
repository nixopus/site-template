import { SERIES_BG } from "./scale";

type Row = { label: string; value: string; index: number };

// Floating readout for the hovered point; flips to the left half past the midline.
export function ChartTooltip({ left, width, title, rows }: { left: number; width: number; title: string; rows: Row[] }) {
  const flip = left > width / 2;
  return (
    <div
      role="status"
      className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-md border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-float"
      style={flip ? { right: width - left + 12 } : { left: left + 12 }}
    >
      <p className="font-medium">{title}</p>
      <ul className="mt-1 space-y-0.5">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className={`inline-block size-2 rounded-full ${SERIES_BG[row.index % SERIES_BG.length]}`} />
              {row.label}
            </span>
            <span className="tabular-nums">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
