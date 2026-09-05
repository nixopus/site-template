import { cn } from "@/lib/utils";

export type ChatMessage = {
  from: string;
  initials: string;
  time: string;
  text: string;
  self?: boolean;
};

type ChatCardProps = {
  title?: string;
  messages: ChatMessage[];
  className?: string;
};

/* A small conversation as an object: initials avatars only, never face photos.
   For storytelling inside the site's own product context, not fabricated praise. */
export function ChatCard({ title, messages, className }: ChatCardProps) {
  return (
    <div
      className={cn(
        "shadow-float overflow-hidden rounded-lg border border-border bg-card",
        className
      )}
    >
      {title && (
        <p className="type-overline border-b border-border bg-muted px-4 py-2.5 text-muted-foreground">
          {title}
        </p>
      )}
      <ul className="flex flex-col gap-5 p-4 md:p-5">
        {messages.map((message) => (
          <li
            key={`${message.from}-${message.time}`}
            className={cn("flex gap-3", message.self && "flex-row-reverse")}
          >
            <span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-border bg-muted font-mono text-[10px] font-medium text-muted-foreground"
            >
              {message.initials}
            </span>
            <div className={cn("min-w-0", message.self && "text-right")}>
              <p className={cn("flex items-baseline gap-2", message.self && "flex-row-reverse")}>
                <span className="text-xs font-medium text-foreground">{message.from}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{message.time}</span>
              </p>
              <p
                className={cn(
                  "mt-1.5 inline-block rounded-md border border-border px-3 py-2 text-left text-sm leading-relaxed",
                  message.self
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                {message.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
