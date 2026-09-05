import { aceternityCatalog, aceternityNotes } from "./aceternity-catalog";
import { Specimen } from "./specimen";

const count = aceternityCatalog.reduce((n, group) => n + group.entries.length, 0);

/* The vendored inventory as a reading list: what exists, when to reach for it,
   how much restyling it owes the site's tokens. Live demos stay few on purpose. */
export function AceternityBoard() {
  return (
    <Specimen title="Aceternity inventory" note={`${count} components · ui/aceternity`}>
      <div className="flex flex-col gap-10">
        {aceternityCatalog.map((group) => (
          <div key={group.group}>
            <h3 className="type-overline text-signal">{group.group}</h3>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {group.entries.map((entry) => (
                <li
                  key={entry.name}
                  className="grid gap-x-4 gap-y-0.5 py-2 sm:grid-cols-[15rem_1fr_4.5rem]"
                >
                  <span className="font-mono text-xs text-foreground">{entry.name}</span>
                  <span className="text-sm text-muted-foreground">{entry.when}</span>
                  <span className="type-overline text-muted-foreground sm:text-right">
                    {entry.skin}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <ul className="flex flex-col gap-1.5">
          {aceternityNotes.map((note) => (
            <li key={note} className="font-mono text-xs text-muted-foreground">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </Specimen>
  );
}
