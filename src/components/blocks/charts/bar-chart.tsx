"use client";

import { useState } from "react";
import { type Datum, compact, formatValue, linear, niceTicks, numbersOf } from "./scale";
import { ChartTooltip } from "./chart-tooltip";
import { useWidth } from "./use-width";

type Props = {
  data: Datum[];
  x: string;
  y: string;
  label: string;
  height?: number;
  unit?: string;
  decimals?: number;
  /** Colour bars below zero with the destructive token (a loss), above with chart-1. */
  signed?: boolean;
};

const PAD = { top: 12, right: 8, bottom: 28, left: 48 };

// One measure across ordered categories or days; negative values hang below a zero line.
export function BarChart({ data, x, y, label, height = 240, unit = "", decimals = 0, signed = false }: Props) {
  const { ref, width } = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  if (data.length === 0) return <p className="py-10 text-center text-sm text-muted-foreground">No data for this period.</p>;

  const values = numbersOf(data, [y]);
  const ticks = niceTicks(Math.min(...values), Math.max(...values));
  const scale = linear([ticks[0], ticks[ticks.length - 1]], [height - PAD.bottom, PAD.top]);
  const band = (width - PAD.left - PAD.right) / data.length;
  const barWidth = Math.max(2, band - Math.min(8, band * 0.3));
  const labelEvery = Math.ceil(data.length / Math.max(2, Math.floor(width / 72)));

  return (
    <div ref={ref} className="relative w-full">
      <svg width={width} height={height} role="img" aria-label={label}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={width - PAD.right} y1={scale(t)} y2={scale(t)} className={t === 0 ? "stroke-muted-foreground/60" : "stroke-border"} />
            <text x={PAD.left - 8} y={scale(t)} dy="0.32em" textAnchor="end" className="fill-muted-foreground text-[11px]">{compact(t)}</text>
          </g>
        ))}
        {data.map((row, i) => {
          const v = typeof row[y] === "number" ? (row[y] as number) : null;
          const cx = PAD.left + band * i + band / 2;
          const top = v === null ? scale(0) : Math.min(scale(v), scale(0));
          const tone = signed && v !== null && v < 0 ? "fill-destructive" : "fill-chart-1";
          return (
            <g key={i} onPointerEnter={() => setActive(i)} onPointerLeave={() => setActive(null)}>
              <rect x={PAD.left + band * i} y={PAD.top} width={band} height={height - PAD.top - PAD.bottom} fill="transparent" />
              {v !== null && (
                <rect x={cx - barWidth / 2} y={top} width={barWidth} height={Math.max(1, Math.abs(scale(v) - scale(0)))} rx={Math.min(4, barWidth / 3)} className={`${tone} ${active === i ? "opacity-100" : "opacity-85"}`} />
              )}
              {i % labelEvery === 0 && (
                <text x={cx} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">{String(row[x])}</text>
              )}
            </g>
          );
        })}
      </svg>
      {active !== null && (
        <ChartTooltip
          left={PAD.left + band * active + band / 2}
          width={width}
          title={String(data[active][x])}
          rows={[{ label, value: formatValue(data[active][y] as number | null, decimals, unit), index: 0 }]}
        />
      )}
    </div>
  );
}
