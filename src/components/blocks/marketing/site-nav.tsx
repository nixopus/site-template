import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/#tracking", label: "Tracking" },
  { href: "/#rates", label: "Rates" },
  { href: "/#questions", label: "FAQ" },
  { href: "/app", label: "Console" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between border-x border-border px-6 md:px-12"
      >
        <Link href="/" className="type-overline text-foreground">
          Ballast<span className="text-signal">*</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-overline text-muted-foreground transition-colors duration-150 ease-manifest hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button asChild size="sm">
          <Link href="/app">Start tracking</Link>
        </Button>
      </nav>
    </header>
  );
}
