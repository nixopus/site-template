const stages = [
  { date: "Sep 02", stage: "Factory gate, Huizhou", state: "done" },
  { date: "Sep 04", stage: "Origin port, Qingdao", state: "done" },
  { date: "Now", stage: "On water, Pacific crossing", state: "current" },
  { date: "Sep 12", stage: "Discharge, Oakland OICT", state: "next" },
  { date: "Sep 14", stage: "Rail, BNSF to Reno", state: "next" },
  { date: "Sep 16", stage: "Warehouse door", state: "next" },
];

export function RecordTracking() {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          One timeline per box, gate to door.
        </h2>
        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          Carrier milestones, terminal feeds, and rail events reconciled into a
          single timeline, not fourteen browser tabs. When a vessel misses its
          window, you know before your customer does.
        </p>
        <p className="type-overline mt-8 text-muted-foreground">
          98 carriers · 214 terminals · 6 rail networks
        </p>
      </div>
      <ol className="border-l border-border">
        {stages.map((item) => (
          <li key={item.stage} className="relative flex gap-5 pb-6 pl-6 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-1.5 -left-[4.5px] size-2 ${
                item.state === "current"
                  ? "bg-signal"
                  : item.state === "done"
                    ? "bg-foreground"
                    : "border border-border bg-background"
              }`}
            />
            <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
              {item.date}
            </span>
            <span
              className={`text-sm ${
                item.state === "current" ? "font-medium text-signal" : "text-foreground"
              }`}
            >
              {item.stage}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
