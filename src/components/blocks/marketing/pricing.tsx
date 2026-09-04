import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Coastal",
    price: "$49",
    per: "/mo",
    line: "For the first forty boxes a year.",
    features: ["10 active containers", "Document filing", "Demurrage clock", "Email alerts"],
    featured: false,
  },
  {
    name: "Transpacific",
    price: "$190",
    per: "/mo",
    line: "For cargo that is always on the water.",
    features: [
      "Unlimited containers",
      "Duty estimates at booking",
      "Broker + team seats",
      "Rail and dray visibility",
      "Terminal tariff tables",
    ],
    featured: true,
  },
  {
    name: "Fleet",
    price: "Custom",
    per: "",
    line: "For teams that measure in TEUs.",
    features: ["Everything in Transpacific", "API access", "SSO", "A named lane analyst"],
    featured: false,
  },
];

export function Pricing() {
  return (
    <div className="grid divide-y divide-border border border-border md:grid-cols-3 md:divide-x md:divide-y-0">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            "flex flex-col p-8 md:p-10",
            tier.featured && "bg-primary text-primary-foreground"
          )}
        >
          <h3 className="type-overline">{tier.name}</h3>
          <p className="mt-6 font-mono text-4xl">
            {tier.price}
            <span className="text-sm">{tier.per}</span>
          </p>
          <p
            className={cn(
              "mt-3 text-sm",
              tier.featured ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {tier.line}
          </p>
          <ul className="mt-8 flex-1 space-y-3 text-sm">
            {tier.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span aria-hidden className="font-mono text-signal">
                  +
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            asChild
            variant={tier.featured ? "secondary" : "outline"}
            className="mt-10"
          >
            <Link href="/app">{tier.price === "Custom" ? "Talk to us" : "Choose " + tier.name}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
