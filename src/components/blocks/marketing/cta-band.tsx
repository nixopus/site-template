import { Button as MovingBorderButton } from "@/components/ui/aceternity/moving-border";

/* The one continuously animated mark on the page: a signal spark tracing the
   CTA outline. A mark, not a fill; MotionConfig stills it under reduced motion. */
export function CtaBand() {
  return (
    <div className="bg-primary px-6 py-24 text-center text-primary-foreground md:px-12 md:py-32">
      <p className="type-overline text-primary-foreground/60">Final record</p>
      <h2 className="type-display mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,4.5vw+1rem,4.5rem)]">
        Put your freight in order.
      </h2>
      <MovingBorderButton
        as="a"
        href="/app"
        borderRadius="0rem"
        duration={4000}
        containerClassName="mx-auto mt-12 block"
        borderClassName="bg-[radial-gradient(var(--signal)_40%,transparent_60%)]"
        className="border border-border bg-background text-sm font-medium text-foreground"
        style={{ width: "12rem", height: "3rem" }}
      >
        Start tracking
      </MovingBorderButton>
    </div>
  );
}
