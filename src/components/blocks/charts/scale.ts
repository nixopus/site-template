// Pure chart math shared by every chart block: nice ticks, linear scales, number display.

export type Datum = Record<string, string | number | null>;

export type Series = { key: string; label: string };

// Fixed categorical order: a series keeps its colour by position, never by rank.
export const SERIES_STROKE = ["stroke-chart-1", "stroke-chart-2", "stroke-chart-3", "stroke-chart-4", "stroke-chart-5"];
export const SERIES_FILL = ["fill-chart-1", "fill-chart-2", "fill-chart-3", "fill-chart-4", "fill-chart-5"];
export const SERIES_BG = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"];

export function niceTicks(min: number, max: number, count = 4): number[] {
  const lo = Math.min(0, min);
  const hi = max === lo ? lo + 1 : max;
  const raw = (hi - lo) / count;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= raw) ?? raw;
  const start = Math.floor(lo / step) * step;
  const ticks: number[] = [];
  for (let t = start; t < hi + step; t += step) ticks.push(Number(t.toFixed(10)));
  return ticks;
}

export function linear(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;
  return (value: number) => r0 + ((value - d0) / span) * (r1 - r0);
}

export function numbersOf(data: Datum[], keys: string[]): number[] {
  return data.flatMap((row) => keys.map((k) => row[k]).filter((v): v is number => typeof v === "number"));
}

export function formatValue(value: number | null | undefined, decimals = 0, unit = "", locale = "en-IN"): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "No data";
  const text = value.toLocaleString(locale, { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
  return unit ? `${text} ${unit}` : text;
}

export function compact(value: number, locale = "en-IN"): string {
  return value.toLocaleString(locale, { notation: "compact", maximumFractionDigits: 1 });
}
