import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <div className="bg-primary px-6 py-20 text-center text-primary-foreground md:px-12 md:py-28">
      <p className="type-overline text-primary-foreground/60">Final record</p>
      <h2 className="type-display mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,4.5vw+1rem,4.5rem)]">
        Put your freight in order.
      </h2>
      <p className="mx-auto mt-6 max-w-md text-primary-foreground/70">
        One booking email is all it takes. Your first container is on the board
        in four minutes.
      </p>
      <Button asChild variant="secondary" size="lg" className="mt-10 px-8">
        <Link href="/app">Start tracking</Link>
      </Button>
    </div>
  );
}
