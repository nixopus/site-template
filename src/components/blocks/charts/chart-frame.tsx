import { SERIES_BG, type Series } from "./scale";

type Props = {
  title: string;
  note?: string;
  series?: Series[];
  /** A plain table of the same numbers: the accessible view and the exact-value view. */
  table?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

// Card around one chart: title, optional legend (two or more series), chart, table view.
export function ChartFrame({ title, note, series = [], table, actions, children }: Props) {
  return (
    <section className="rounded-lg border border-border bg-card p-4 text-card-foreground sm:p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
        </div>
        {actions}
      </header>
      {series.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {series.map((s, i) => (
            <li key={s.key} className="flex items-center gap-1.5">
              <span className={`inline-block size-2 rounded-full ${SERIES_BG[i % SERIES_BG.length]}`} />
              {s.label}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">{children}</div>
      {table && (
        <details className="mt-3 text-xs">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">View as table</summary>
          <div className="mt-2 max-h-72 overflow-auto">{table}</div>
        </details>
      )}
    </section>
  );
}
