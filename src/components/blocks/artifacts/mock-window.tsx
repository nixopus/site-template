import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MockWindowProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/* A product shot built from code: an app-window frame around any content.
   Depth comes from the site's --depth-float token; dots and corners follow
   the radius stance, so every direction skins it without touching this file. */
export function MockWindow({ title, children, className, contentClassName }: MockWindowProps) {
  return (
    <figure
      className={cn(
        "shadow-float overflow-hidden rounded-lg border border-border bg-card text-card-foreground",
        className
      )}
    >
      <div className="flex items-center gap-4 border-b border-border bg-muted px-4 py-2.5">
        <span aria-hidden className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-sm bg-border" />
          <span className="size-2 rounded-sm bg-border" />
          <span className="size-2 rounded-sm bg-border" />
        </span>
        {title && (
          <figcaption className="type-overline truncate text-muted-foreground">{title}</figcaption>
        )}
      </div>
      <div className={cn("p-4 md:p-6", contentClassName)}>{children}</div>
    </figure>
  );
}
