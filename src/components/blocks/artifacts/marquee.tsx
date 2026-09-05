import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
};

/* CSS-keyframe phrase marquee: edge-faded, pauses on hover, frozen under
   reduced motion (chassis.css kill switch). Content renders twice for the
   loop; the copy is aria-hidden so nothing is read twice. */
export function Marquee({ children, reverse = false, duration = 40, className }: MarqueeProps) {
  return (
    <div className={cn("marquee edge-fade-x overflow-hidden", className)}>
      <div
        className={cn("animate-marquee flex w-max", reverse && "[animation-direction:reverse]")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12 pr-12">
          {children}
        </div>
      </div>
    </div>
  );
}
