const days = [
  { label: "Mon", used: true },
  { label: "Tue", used: true },
  { label: "Wed", used: false },
  { label: "Thu", used: false },
  { label: "Fri", used: false },
];

export function RecordDemurrage() {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          A clock on every container.
        </h2>
        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          Terminals charge by the day and invoice in arrears. Ballast counts
          your free time per terminal tariff and alerts the whole team two
          days out.
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-4">
          <span className="type-display text-8xl text-signal">3</span>
          <span className="type-overline text-muted-foreground">
            free days left
            <br />
            Oakland OICT
          </span>
        </div>
        <div className="mt-8 flex gap-2" aria-hidden>
          {days.map((day) => (
            <div key={day.label} className="flex-1">
              <div
                className={`h-2 ${day.used ? "bg-border" : "bg-signal"}`}
              />
              <p className="type-overline mt-2 text-muted-foreground">{day.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-sm font-mono text-sm text-muted-foreground">
          Beyond Friday: $285/day. The dray is already booked.
        </p>
      </div>
    </div>
  );
}
