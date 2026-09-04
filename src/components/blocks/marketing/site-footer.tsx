import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: ["Tracking", "Documents", "Demurrage", "Customs", "Rates"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Tariff library", "Port directory", "API docs", "Status"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 border-x border-border px-6 py-16 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-12">
        <div>
          <p className="type-overline text-foreground">
            Ballast<span className="text-signal">*</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Freight operations for small importers. Every container, every
            document, every free day — accounted for.
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="type-overline text-muted-foreground">{column.title}</p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-foreground transition-colors duration-150 ease-manifest hover:text-signal"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 border-x border-border px-6 py-6 font-mono text-xs text-muted-foreground md:flex-row md:justify-between md:px-12">
          <p>© 2026 Ballast — a fictional product demonstrating this template.</p>
          <p>Pier 9 · San Francisco, CA</p>
        </div>
      </div>
    </footer>
  );
}
