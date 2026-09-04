const stats = [
  { label: "On the water", value: "14", note: "across 4 lanes" },
  { label: "Arriving this week", value: "3", note: "Oakland · LA · Tacoma" },
  { label: "Demurrage risk", value: "2", note: "≤ 2 free days left", signal: true },
  { label: "Duty owed Q3", value: "$12,410", note: "estimated at booking" },
];

export function StatRow() {
  return (
    <dl className="grid grid-cols-2 divide-border border-b border-border max-md:divide-y md:grid-cols-4 md:divide-x">
      {stats.map((stat) => (
        <div key={stat.label} className="px-6 py-5">
          <dt className="type-overline text-muted-foreground">{stat.label}</dt>
          <dd
            className={`mt-2 font-mono text-3xl ${
              stat.signal ? "text-signal" : "text-foreground"
            }`}
          >
            {stat.value}
          </dd>
          <dd className="mt-1 text-xs text-muted-foreground">{stat.note}</dd>
        </div>
      ))}
    </dl>
  );
}
