"use client";

import { useState } from "react";
import { type Datum, type Series, SERIES_STROKE, compact, formatValue, linear, niceTicks, numbersOf } from "./scale";
import { ChartTooltip } from "./chart-tooltip";
import { useWidth } from "./use-width";

type Props = {
  data: Datum[];
  x: string;
  series: Series[];
  height?: number;
  unit?: string;
  decimals?: number;
};

const PAD = { top: 12, right: 12, bottom: 28, left: 48 };

// Change over time on one axis. Hover anywhere for a crosshair and every series' value.
export function LineChart({ data, x, series, height = 240, unit = "", decimals = 0 }: Props) {
  const { ref, width } = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  if (data.length === 0) return <p className="py-10 text-center text-sm text-muted-foreground">No data for this period.</p>;

  const values = numbersOf(data, series.map((s) => s.key));
  const ticks = niceTicks(Math.min(...values), Math.max(...values));
  const y = linear([ticks[0], ticks[ticks.length - 1]], [height - PAD.bottom, PAD.top]);
  const px = linear([0, Math.max(1, data.length - 1)], [PAD.left, width - PAD.right]);
  const labelEvery = Math.ceil(data.length / Math.max(2, Math.floor(width / 72)));

  // A null value breaks the line instead of drawing through a day with no reading.
  const path = (key: string) => {
    let d = "";
    let drawing = false;
    data.forEach((row, i) => {
      const v = row[key];
      if (typeof v !== "number") return void (drawing = false);
      d += `${drawing ? "L" : "M"}${px(i)},${y(v)}`;
      drawing = true;
    });
    return d;
  };

  function onMove(event: React.PointerEvent<SVGRectElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left) / bounds.width;
    setActive(Math.round(ratio * (data.length - 1)));
  }

  return (
    <div ref={ref} className="relative w-full">
      <svg width={width} height={height} role="img" aria-label={series.map((s) => s.label).join(", ")}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} className={t === 0 ? "stroke-muted-foreground/60" : "stroke-border"} strokeWidth={1} />
            <text x={PAD.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted-foreground text-[11px]">{compact(t)}</text>
          </g>
        ))}
        {data.map((row, i) =>
          i % labelEvery === 0 ? (
            <text key={i} x={px(i)} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">{String(row[x])}</text>
          ) : null,
        )}
        {active !== null && <line x1={px(active)} x2={px(active)} y1={PAD.top} y2={height - PAD.bottom} className="stroke-muted-foreground/50" />}
        {series.map((s, i) => (
          <path key={s.key} d={path(s.key)} fill="none" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" className={SERIES_STROKE[i % SERIES_STROKE.length]} />
        ))}
        {active !== null &&
          series.map((s, i) =>
            typeof data[active][s.key] === "number" ? (
              <circle key={s.key} cx={px(active)} cy={y(data[active][s.key] as number)} r={4} strokeWidth={2} className={`fill-background ${SERIES_STROKE[i % SERIES_STROKE.length]}`} />
            ) : null,
          )}
        <rect x={PAD.left} y={0} width={Math.max(0, width - PAD.left - PAD.right)} height={height} fill="transparent" onPointerMove={onMove} onPointerLeave={() => setActive(null)} />
      </svg>
      {active !== null && (
        <ChartTooltip
          left={px(active)}
          width={width}
          title={String(data[active][x])}
          rows={series.map((s, i) => ({ label: s.label, value: formatValue(data[active][s.key] as number | null, decimals, unit), index: i }))}
        />
      )}
    </div>
  );
}
