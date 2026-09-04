import type { ReactNode } from "react";

type SpecimenProps = {
  title: string;
  note?: string;
  children: ReactNode;
};

export function Specimen({ title, note, children }: SpecimenProps) {
  return (
    <section className="border-t border-border py-10">
      <div className="flex items-baseline justify-between gap-4 pb-8">
        <h2 className="type-overline text-signal">{title}</h2>
        {note && <p className="type-overline text-muted-foreground">{note}</p>}
      </div>
      {children}
    </section>
  );
}
