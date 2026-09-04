const fields = [
  { label: "Container", value: "MSKU 4839201" },
  { label: "Route", value: "Qingdao → Oakland" },
  { label: "Vessel", value: "MV Pacific Laurel" },
  { label: "ETA", value: "Sep 12, 06:00" },
  { label: "Free days", value: "3 remaining", signal: true },
];

export function ManifestStrip() {
  return (
    <div className="overflow-x-auto border-t border-border bg-muted">
      <dl className="flex min-w-max items-stretch divide-x divide-border">
        <div className="flex items-center px-6 py-4 md:px-12">
          <dt className="type-overline text-signal">Now tracking</dt>
        </div>
        {fields.map((field) => (
          <div key={field.label} className="px-6 py-4">
            <dt className="type-overline text-muted-foreground">{field.label}</dt>
            <dd
              className={`mt-1 font-mono text-sm ${
                field.signal ? "text-signal" : "text-foreground"
              }`}
            >
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
