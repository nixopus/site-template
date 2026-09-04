const documents = [
  { code: "MBL", name: "Master bill of lading", ref: "MBL-882310", status: "Filed" },
  { code: "CI", name: "Commercial invoice", ref: "INV-2209", status: "Filed" },
  { code: "PL", name: "Packing list", ref: "PL-2209", status: "Filed" },
  { code: "COO", name: "Certificate of origin", ref: "-", status: "Awaiting" },
  { code: "ISF", name: "Importer security filing", ref: "ISF-1104", status: "Filed" },
];

export function RecordDocuments() {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16">
      <ul className="order-2 divide-y divide-border border-y border-border md:order-1">
        {documents.map((doc) => (
          <li key={doc.code} className="flex items-baseline gap-4 py-3">
            <span className="w-12 shrink-0 font-mono text-xs font-medium text-foreground">
              {doc.code}
            </span>
            <span className="flex-1 text-sm text-foreground">{doc.name}</span>
            <span className="hidden font-mono text-xs text-muted-foreground sm:block">
              {doc.ref}
            </span>
            <span
              className={`type-overline w-20 text-right ${
                doc.status === "Awaiting" ? "text-signal" : "text-muted-foreground"
              }`}
            >
              {doc.status}
            </span>
          </li>
        ))}
      </ul>
      <div className="order-1 md:order-2">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          The paperwork files itself.
        </h2>
        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          Forward the booking confirmation; Ballast files the rest under the
          names your broker expects. One missing certificate is flagged in
          orange, not discovered at the terminal gate.
        </p>
      </div>
    </div>
  );
}
