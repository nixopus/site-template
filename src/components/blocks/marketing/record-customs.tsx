const lines = [
  { hts: "8712.00", item: "Bicycles, complete", rate: "11.0%", duty: "$4,180" },
  { hts: "4202.92", item: "Canvas panniers", rate: "6.3%", duty: "$310" },
  { hts: "8512.10", item: "Dynamo lighting sets", rate: "2.7%", duty: "$96" },
];

export function RecordCustoms() {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16">
      <table className="order-2 w-full self-start border-y border-border text-sm md:order-1">
        <thead>
          <tr className="border-b border-border">
            <th className="type-overline py-3 text-left text-muted-foreground">HTS</th>
            <th className="type-overline py-3 text-left text-muted-foreground">Line item</th>
            <th className="type-overline py-3 text-right text-muted-foreground">Rate</th>
            <th className="type-overline py-3 text-right text-muted-foreground">Duty</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {lines.map((line) => (
            <tr key={line.hts}>
              <td className="py-3 font-mono text-xs">{line.hts}</td>
              <td className="py-3">{line.item}</td>
              <td className="py-3 text-right font-mono text-xs">{line.rate}</td>
              <td className="py-3 text-right font-mono text-xs">{line.duty}</td>
            </tr>
          ))}
          <tr className="border-t border-border">
            <td className="py-3" colSpan={3}>
              <span className="type-overline text-foreground">Estimated at booking</span>
            </td>
            <td className="py-3 text-right font-mono text-sm font-medium text-signal">
              $4,586
            </td>
          </tr>
        </tbody>
      </table>
      <div className="order-1 md:order-2">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Duty, estimated before the broker calls.
        </h2>
        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          Ballast classifies your lines against the harmonized tariff at
          booking, so landed cost is a number you plan with — not a bill you
          absorb. Your broker gets a seat, the entry packet, and no Tuesday
          morning scavenger hunt.
        </p>
      </div>
    </div>
  );
}
