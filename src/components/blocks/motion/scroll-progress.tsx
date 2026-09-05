"use client";

import { useEffect, useRef } from "react";

/* Reading-position hairline pinned to the viewport top. rAF-throttled;
   position tracking, not animation, so it stays honest under reduced motion. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const fraction = max > 0 ? doc.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${fraction})`;
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="bg-signal fixed inset-x-0 top-0 z-50 h-px origin-left"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
