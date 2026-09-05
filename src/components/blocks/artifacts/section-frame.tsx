import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionFrameProps = {
  label?: string;
  children: ReactNode;
  className?: string;
};

/* Section as a bounded card: a dashed rule frames the content, the label
   breaks the top rule like a folder tab. The alternative to full-bleed rules. */
export function SectionFrame({ label, children, className }: SectionFrameProps) {
  return (
    <section
      className={cn("relative rounded-lg border border-dashed border-border p-6 md:p-10", className)}
    >
      {label && (
        <span className="type-overline absolute -top-2 left-6 bg-background px-2 text-muted-foreground">
          {label}
        </span>
      )}
      {children}
    </section>
  );
}
