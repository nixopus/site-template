import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title?: string;
  body?: string;
  action?: string;
};

export function EmptyState({
  title = "No containers on the board",
  body = "Forward a booking confirmation to intake@ballast.example and your first shipment appears here in about four minutes.",
  action = "Add a shipment",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center border border-dashed border-border px-8 py-16 text-center">
      <span aria-hidden className="reg-tick" />
      <h3 className="mt-6 font-heading text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{body}</p>
      <Button variant="outline" className="mt-8">
        {action}
      </Button>
    </div>
  );
}
