import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* The manifest frame: two full-height rules bound the column; sections are
   numbered records separated by full-bleed rules with registration ticks. */

export function LedgerFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 border-x border-border">
      {children}
    </div>
  );
}

type LedgerSectionProps = {
  index?: string;
  code?: string;
  id?: string;
  children: ReactNode;
  className?: string;
  framed?: boolean;
};

export function LedgerSection({
  index,
  code,
  id,
  children,
  className,
  framed = true,
}: LedgerSectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-14", framed && "border-t border-border")}
    >
      {framed && (
        <>
          <span aria-hidden className="reg-tick absolute -top-[6px] -left-[6px]" />
          <span aria-hidden className="reg-tick absolute -top-[6px] -right-[6px]" />
        </>
      )}
      {index && (
        <header className="flex items-baseline gap-3 px-6 pt-8 md:px-12">
          <span className="type-overline text-signal">{index}</span>
          <span className="type-overline text-muted-foreground">/ {code}</span>
        </header>
      )}
      <div
        className={cn(
          index ? "px-6 pt-10 pb-14 md:px-12 md:pt-12 md:pb-20" : "px-6 py-14 md:px-12 md:py-20",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
