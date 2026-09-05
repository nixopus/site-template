import { cn } from "@/lib/utils";

type ImgSlotProps = {
  src?: string;
  alt?: string;
  caption?: string;
  label?: string;
  ratio?: string;
  className?: string;
};

/* A framed slot for the owner's photography. Until a real path arrives it
   renders an authored plate (hatch texture + crossed diagonals), never a
   stock photo. Caption reads as a record line under the frame. */
export function ImgSlot({
  src,
  alt = "",
  caption,
  label = "Image reserved",
  ratio = "3 / 2",
  className,
}: ImgSlotProps) {
  return (
    <figure className={className}>
      <div
        className="shadow-float relative overflow-hidden rounded-lg border border-border bg-muted"
        style={{ aspectRatio: ratio }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- owner-supplied path, dimensions unknown
          <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
        ) : (
          <>
            <svg aria-hidden className="size-full text-border">
              <defs>
                <pattern
                  id="img-slot-hatch"
                  width="7"
                  height="7"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#img-slot-hatch)" opacity="0.55" />
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
              <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="type-overline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-border bg-background px-2.5 py-1 text-muted-foreground">
              {label}
            </span>
          </>
        )}
      </div>
      {caption && (
        <figcaption className="type-overline mt-3 text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
