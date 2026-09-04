import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <div className="bg-primary px-6 py-24 text-center text-primary-foreground md:px-12 md:py-32">
      <p className="type-overline text-primary-foreground/60">Final record</p>
      <h2 className="type-display mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,4.5vw+1rem,4.5rem)]">
        Put your freight in order.
      </h2>
      <Button asChild variant="secondary" size="lg" className="mt-12 px-8">
        <Link href="/app">Start tracking</Link>
      </Button>
    </div>
  );
}
